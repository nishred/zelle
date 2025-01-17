"use server";

import { p2pTransferSchema } from "@repo/types/types";

import prisma from "@repo/db/prisma";
import { auth } from "../auth";

export async function createp2pTransfer(formData: FormData) {
  try {
    const session = await auth();

    console.log("p2p action triggered", formData);

    if (!session?.user) throw new Error("Please login");

    const p2pTransfer = p2pTransferSchema.parse({
      number: formData.get("number"),
      amount: formData.get("amount"),
    });

    const fromUser = await prisma.user.findFirst({
      where: {
        id: Number(session.user.id),
      },
    });

    const toUser = await prisma.user.findFirst({
      where: {
        number: p2pTransfer.number,
      },
    });

    if (!fromUser || !toUser) throw new Error("Wrong details");

    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUser.id)} FOR UPDATE`;

      //check for balance of from user
      const balance = await tx.balance.findFirst({
        where: {
          userId: fromUser.id,
        },
      });

      if (!balance) return;

      if (balance.amount < p2pTransfer.amount) {
        throw new Error("Insufficient balance");
        return;
      }

      console.log("confirm");

      //reduce balance

      await tx.balance.update({
        where: {
          userId: fromUser.id,
        },

        data: {
          amount: {
            decrement: p2pTransfer.amount,
          },
        },
      });

      console.log("reduce balance");

      //add balance to to user

      console.log(toUser);

      await tx.balance.update({
        where: {
          userId: toUser.id,
        },

        data: {
          amount: {
            increment: p2pTransfer.amount,
          },
        },
      });

      console.log("add balance");

      //update the p2p table

      await tx.p2pTransfer.create({
        data: {
          amount: p2pTransfer.amount,
          fromUserId: fromUser.id,
          toUserId: toUser.id,
          timeStamp: new Date(),
        },
      });
    });

    console.log("update p2p");

    return {
      success: true,
      message: "Transaction completed successfully",
    };
  } catch (err: any) {
    console.log(err);

    return {
      success: false,
      error: err.message,
    };
  }
}
