import { z } from "zod";

export const paymentInformationSchema = z.object({
  userId: z.number().int(),
  amount: z.union([z.number(), z.string()]),
  token: z.string(),
});

export const onRampTransactionSchema = z
  .object({
    amount: z.coerce.number().int(),
    bank: z.string(),
  })
  .refine((data) => {
    return data.bank === "hdfc" || data.bank === "axis";
  });
