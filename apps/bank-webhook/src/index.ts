import express, { Request, Response } from "express";

import prisma from "@repo/db/prisma";

const app = express();

app.use(express.json());


app.post("/hdfcWebhook", async (req, res) => {
  try {
    const paymentInformation = {
      token: req.body.token,
      userId: Number(req.body.user_identifier),
      amount: Number(req.body.amount),
    };

    const balance = await prisma.balance.findFirst({
      where: {
        userId: paymentInformation.userId,
      },
    });

    console.log("balance", balance);

    await prisma.$transaction(async (tx) => {
      await prisma.balance.update({
        where: {
          userId: paymentInformation.userId,
        },

        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      });

      await prisma.onRampTransactions.update({
        where: {
          token: paymentInformation.token,
        },

        data: {
          status: "Success",
        },
      });
    });

    res.json({
      success: true,
      message: "transaction reflected",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(3002);



