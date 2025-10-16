import { z } from "zod";

/**
 * Схема валидации формы контактов (клиент + сервер).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Слишком короткое имя")
    .max(80, "Слишком длинное имя"),
  fromEmail: z.string().trim().email("Некорректный e-mail"),
  message: z
    .string()
    .trim()
    .min(10, "Сообщение слишком короткое")
    .max(2000, "Слишком длинное сообщение (до 2000 символов)"),
  // было: z.literal(true, { errorMap: ... }) — так нельзя
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: "Нужно согласие на обработку данных",
    }),
  // honeypot: поле должно быть пустым; если не пустое — "bot"
  company: z
    .string()
    .optional()
    .refine((v) => !v || v.trim() === "", { message: "bot" }),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

/** Преобразование ошибок Zod в плоский словарь для state */
export function zodErrorsToRecord(err: z.ZodError): Record<string, string> {
  const flat = err.flatten().fieldErrors;
  const out: Record<string, string> = {};
  for (const key in flat) {
    const first = flat[key as keyof typeof flat]?.[0];
    if (first) out[key] = first;
  }
  return out;
}
