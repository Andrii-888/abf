"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  contactSchema,
  type ContactFormInput,
  zodErrorsToRecord,
} from "@/utils/validation/contact.schema";

/**
 * Хук управляет состоянием формы, валидацией (Zod) и отправкой на /api/contact.
 * Используй его внутри ContactForm.tsx
 */
export function useContactForm(locale: string) {
  const router = useRouter();

  const [form, setForm] = useState<ContactFormInput>({
    name: "",
    fromEmail: "",
    message: "",
    consent: false,
    company: "", // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function handleChange<K extends keyof ContactFormInput>(
    key: K,
    value: ContactFormInput[K]
  ) {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key as string])
      setErrors((e) => ({ ...e, [key as string]: undefined as any }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    // Валидация Zod
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(zodErrorsToRecord(parsed.error));
      return;
    }
    const data = parsed.data;

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push(`/${locale}/contact/sent`);
    } catch (e: any) {
      setErr(e?.message || "Ошибка отправки. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    errors,
    loading,
    err,
    handleChange,
    handleSubmit,
  };
}
