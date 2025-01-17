"use server";

import prisma from "@repo/db/prisma";


import { onRampTransactionSchema } from "@repo/types/types";

import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export async function createOnRampTransaction(formData: FormData) {
  try {

    const token = Math.random().toString();

    const transactionData = onRampTransactionSchema.parse({
      amount: Number(formData.get("amount")) * 100,
      bank: formData.get("bank"),
    });

    const session = await auth();

    if (!session?.user) throw new Error("Please login");

    await prisma.onRampTransactions.create({
      data: {
        amount: transactionData.amount,
        userId: Number(session.user.id),
        provider: transactionData.bank,
        startTime: new Date(),
        token,
        status: "Processing",
      },
    });


    revalidatePath("/transfer")

    return {
      success: true,
      message: "form has been handled successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}

