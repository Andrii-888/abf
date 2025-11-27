// src/app/open/pay/payValidation.ts
import { z } from "zod";

export const payFormSchema = z.object({
  amount: z
    .string()
    .nonempty("Amount is required.")
    .transform((v) => v.replace(",", "."))
    .refine(
      (v) => {
        const n = Number(v);
        return Number.isFinite(n) && n > 0;
      },
      { message: "Enter a positive amount (e.g. 120.5)." },
    ),
  currency: z.enum(["USDT", "USDC"]),
  name: z.string().optional().or(z.literal("")),
  email: z.string().nonempty("Email is required.").email("Please enter a valid email address."),
  txHash: z
    .string()
    .nonempty("Transaction hash is required.")
    .min(10, "Transaction hash looks too short. Please paste the full hash."),
});

export type PayFormValues = z.infer<typeof payFormSchema>;

export type PayFormErrors = Partial<{
  amount: string;
  currency: string;
  name: string;
  email: string;
  txHash: string;
}>;

export function validatePayForm(values: PayFormValues): {
  isValid: boolean;
  errors: PayFormErrors;
} {
  const result = payFormSchema.safeParse(values);

  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors: PayFormErrors = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof PayFormValues | undefined;
    if (!field) continue;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { isValid: false, errors };
}
