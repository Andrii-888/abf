// src/app/[locale]/contact/useSubmitContact.ts
"use client";

import type { Dispatch, SetStateAction, RefObject } from "react";
import type { FormState } from "./useContactForm";

// Совпадает по ключам с формой, но локально объявляем,
// чтобы не плодить импортов типов
type Values = {
  name: string;
  fromEmail: string;
  message: string;
  company: string; // honeypot
  consent: boolean;
};

// Совместимо с useContactForm: Partial<Record<FieldName, boolean>>
type Touched = Partial<Record<"name" | "fromEmail" | "message" | "consent", boolean>>;

// validateAll ожидает минимум эти поля:
type MinimalForValidation = {
  name: string;
  fromEmail: string;
  message: string;
  company?: string;
};

type SubmitContactArgs = {
  values: Values;
  setValues: Dispatch<SetStateAction<Values>>;
  setTouched: Dispatch<SetStateAction<Touched>>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;
  setState: Dispatch<SetStateAction<FormState>>;
  validateAll: (values: MinimalForValidation) => Record<string, string>;
  autoFocusOnError: boolean;
  t: { errorGeneric: string; errorNetwork: string };
  // допускаем null внутри RefObject, чтобы совпасть с useRef<HTMLInputElement | null>(null)
  nameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  msgRef: RefObject<HTMLTextAreaElement | null>;
};

type ApiResponse = {
  ok?: boolean;
  errors?: Record<string, string>;
};

function isStringRecord(x: unknown): x is Record<string, string> {
  if (typeof x !== "object" || x === null) return false;
  for (const v of Object.values(x as Record<string, unknown>)) {
    if (typeof v !== "string") return false;
  }
  return true;
}

/**
 * Универсальная функция отправки формы контакта.
 * Используется внутри useContactForm().
 */
export async function submitContact({
  values,
  setValues,
  setTouched,
  setErrors,
  setState,
  validateAll,
  autoFocusOnError,
  t,
  nameRef,
  emailRef,
  msgRef,
}: SubmitContactArgs): Promise<void> {
  // очистить ошибки и показать "submitting"
  setErrors({});
  setState("submitting");

  try {
    // 1) полная валидация перед сабмитом (валидируем только текстовые поля)
    const validationErrors = validateAll({
      name: values.name,
      fromEmail: values.fromEmail,
      message: values.message,
      company: values.company || undefined,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setState("error");

      if (autoFocusOnError) {
        if (validationErrors.name) nameRef.current?.focus();
        else if (validationErrors.fromEmail) emailRef.current?.focus();
        else if (validationErrors.message) msgRef.current?.focus();
      }
      return;
    }

    // 2) запрос к API (важно: абсолютный путь)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        fromEmail: values.fromEmail,
        message: values.message,
        company: values.company ?? "",
      }),
    });

    // Парсим ответ без any
    let data: ApiResponse = {};
    try {
      const raw: unknown = await res.json();
      if (typeof raw === "object" && raw !== null) {
        const maybe = raw as { ok?: unknown; errors?: unknown };
        data = {
          ok: typeof maybe.ok === "boolean" ? maybe.ok : undefined,
          errors: isStringRecord(maybe.errors) ? maybe.errors : undefined,
        };
      }
    } catch {
      data = {};
    }

    if (!res.ok || !data?.ok) {
      setState("error");
      setErrors(data?.errors ?? { _form: t.errorGeneric });
      return;
    }

    // 3) успех: очистить форму
    setState("success");
    setValues({
      name: "",
      fromEmail: "",
      message: "",
      company: "",
      consent: false,
    });
    setTouched({});
  } catch {
    // eslint-disable-next-line no-console
    console.error("Contact form submit failed");
    setState("error");
    setErrors({ _form: t.errorNetwork });
  }
}
