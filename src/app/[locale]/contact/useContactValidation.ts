// src/app/[locale]/contact/hooks/useContactValidation.ts
"use client";

import { useCallback, useMemo } from "react";
import { makeContactSchema, type ValidationMessages } from "@/utils/validation/contact.schema";

/** Переэкспорт, чтобы другие модули импортировали тип из одного места */
export type { ValidationMessages } from "@/utils/validation/contact.schema";

/** Имена поддерживаемых полей формы (точечно валидируем только их) */
export type FieldName = "name" | "fromEmail" | "message";

/** Словарь ошибок по ключам полей/формы */
export type Errors = Record<string, string>;

export function useContactValidation(validation: ValidationMessages) {
  // Общая схема (локализованные сообщения)
  const schema = useMemo(() => makeContactSchema(validation), [validation]);

  // Узкие схемы для точечной валидации отдельных полей
  const fieldSchemas = useMemo(() => {
    const Name = schema.pick({ name: true });
    const Email = schema.pick({ fromEmail: true });
    const Message = schema.pick({ message: true });
    // Отдельная "форменная" схема — ТОЛЬКО текстовые поля (без consent)
    const Form = schema.pick({ name: true, fromEmail: true, message: true });
    return { Name, Email, Message, Form };
  }, [schema]);

  /** Проверка одного поля — возвращает строку ошибки или "" */
  const validateField = useCallback(
    (name: FieldName, value: string): string => {
      try {
        switch (name) {
          case "name": {
            const r = fieldSchemas.Name.safeParse({ name: value });
            return r.success ? "" : (r.error.flatten().fieldErrors.name?.[0] ?? "Invalid");
          }
          case "fromEmail": {
            const r = fieldSchemas.Email.safeParse({ fromEmail: value });
            return r.success ? "" : (r.error.flatten().fieldErrors.fromEmail?.[0] ?? "Invalid");
          }
          case "message": {
            const r = fieldSchemas.Message.safeParse({ message: value });
            return r.success ? "" : (r.error.flatten().fieldErrors.message?.[0] ?? "Invalid");
          }
          default:
            return "";
        }
      } catch {
        return "";
      }
    },
    [fieldSchemas],
  );

  /** Полная проверка всех полей формы (company — honeypot допускается) */
  const validateAll = useCallback(
    (vals: { name: string; fromEmail: string; message: string; company?: string }): Errors => {
      // ВАЖНО: используем Form (только текстовые поля), даже если в общей схеме есть consent
      const parsed = fieldSchemas.Form.safeParse(vals);
      if (parsed.success) return {};
      const flat = parsed.error.flatten().fieldErrors;
      const next: Errors = {};
      (Object.keys(flat) as Array<keyof typeof flat>).forEach((key) => {
        const msg = flat[key]?.[0];
        if (msg) next[String(key)] = msg;
      });
      return next;
    },
    [fieldSchemas],
  );

  return {
    // schema можно оставить для отладки/расширений, но валидация опирается на под-схемы
    schema,
    validateField,
    validateAll,
  };
}
