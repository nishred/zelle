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


export const p2pTransferSchema = z.object({

  number: z.string().length(10),
  amount: z.coerce.number().int().transform((value) => value*100)

})  
