"use server";
import prisma from "@repo/db/prisma";

import { auth } from "../auth";

export async function getRecentTransactions() {
  try {
    const session = await auth();

    if (!session?.user) throw new Error("Please login");

    const transactions = await prisma.onRampTransactions.findMany({
      where: {
        userId: Number(session.user.id),
      },

      orderBy: {
        startTime: "desc",
      },

      take: 3,
    });

    return transactions;
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}
