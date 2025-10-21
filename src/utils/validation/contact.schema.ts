import { z } from "zod";

/**
 * Тип переводов сообщений валидации (из contact.json)
 */
export type ValidationMessages = {
  name: { min: string; max: string };
  fromEmail: { email: string };
  message: { min: string; max: string };
  consent: { required: string };
};

/**
 * Фабрика схемы — создаёт contactSchema с сообщениями текущего языка
 */
export function makeContactSchema(msg: ValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, msg.name.min).max(80, msg.name.max),
    fromEmail: z.string().trim().email(msg.fromEmail.email),
    message: z.string().trim().min(10, msg.message.min).max(2000, msg.message.max),
    consent: z.boolean().refine((v) => v === true, { message: msg.consent.required }),
    company: z
      .string()
      .optional()
      .refine((v) => !v || v.trim() === "", { message: "bot" }), // honeypot
  });
}

/**
 * Тип данных формы для автокомплита
 */
export type ContactFormInput = z.infer<ReturnType<typeof makeContactSchema>>;

/**
 * Преобразование ошибок Zod в плоский объект для React state
 */
export function zodErrorsToRecord(err: z.ZodError): Record<string, string> {
  const flat = err.flatten().fieldErrors;
  const out: Record<string, string> = {};
  for (const key in flat) {
    const first = flat[key as keyof typeof flat]?.[0];
    if (first) out[key] = first;
  }
  return out;
}
