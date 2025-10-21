"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeContactSchema, type ValidationMessages } from "@/utils/validation/contact.schema";

export type FormState = "idle" | "submitting" | "success" | "error";
export const MESSAGE_MAX = 1000;

type Values = {
  name: string;
  fromEmail: string;
  message: string;
  company: string; // honeypot
};

type Errors = Record<string, string>;

type UseContactFormOpts = {
  /** Переводы сообщений валидации для текущей локали (из contact.json -> form.validation) */
  validation: ValidationMessages;
  /** Тексты для кнопки и общих ошибок (из contact.json -> form.buttons + form.alerts) */
  texts?: {
    send: string;
    sending: string;
    sent: string;
    retry: string;
    errorGeneric: string;
    errorNetwork: string;
  };
};

export function useContactForm(opts: UseContactFormOpts) {
  const t = {
    send: opts.texts?.send ?? "Send message",
    sending: opts.texts?.sending ?? "Sending…",
    sent: opts.texts?.sent ?? "Sent ✓",
    retry: opts.texts?.retry ?? "Try again",
    errorGeneric: opts.texts?.errorGeneric ?? "Something went wrong. Please try again.",
    errorNetwork: opts.texts?.errorNetwork ?? "Network error. Please try again.",
  };

  // Схема с локализованными сообщениями
  const schema = useMemo(() => makeContactSchema(opts.validation), [opts.validation]);

  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<Values>({
    name: "",
    fromEmail: "",
    message: "",
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const isBusy = state === "submitting";

  // refs для автофокуса на первом невалидном поле
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);

  // Полевые схемы для точечной валидации
  const fieldSchemas = useMemo(() => {
    const Name = schema.pick({ name: true });
    const Email = schema.pick({ fromEmail: true });
    const Message = schema.pick({ message: true });
    return { Name, Email, Message };
  }, [schema]);

  const validateField = useCallback(
    (name: keyof Values, value: string): string => {
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

  const validateAll = useCallback(
    (vals: Values): Errors => {
      const parsed = schema.safeParse(vals);
      if (parsed.success) return {};
      const flat = parsed.error.flatten().fieldErrors;
      const next: Errors = {};
      (Object.keys(flat) as Array<keyof typeof flat>).forEach((key) => {
        const msg = flat[key]?.[0];
        if (msg) next[String(key)] = msg;
      });
      return next;
    },
    [schema],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));

      if (errors._form) {
        const { _form: _omit, ...rest } = errors;
        setErrors(rest);
      }
      if (touched[name]) {
        const msg = validateField(name as keyof Values, value);
        setErrors((prev) => {
          const next = { ...prev };
          if (msg) next[name] = msg;
          else delete next[name];
          return next;
        });
      }
      if (state === "success") setState("idle");
    },
    [errors, touched, state, validateField],
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((t) => ({ ...t, [name]: true }));
      const msg = validateField(name as keyof Values, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (msg) next[name] = msg;
        else delete next[name];
        return next;
      });
    },
    [validateField],
  );

  const buttonText = useMemo(() => {
    if (state === "success") return t.sent;
    if (state === "error") return t.retry;
    if (state === "submitting") return t.sending;
    return t.send;
  }, [state, t.send, t.sending, t.sent, t.retry]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") e.currentTarget.requestSubmit?.();
  }, []);

  const focusFirstInvalid = useCallback(() => {
    if (errors.name) {
      nameRef.current?.focus();
      return;
    }
    if (errors.fromEmail) {
      emailRef.current?.focus();
      return;
    }
    if (errors.message) {
      msgRef.current?.focus();
    }
  }, [errors]);

  useEffect(() => {
    if (state === "error") {
      const id = setTimeout(focusFirstInvalid, 0);
      return () => clearTimeout(id);
    }
  }, [state, focusFirstInvalid]);

  const messageCountTone = useMemo<"neutral" | "warn" | "danger">(() => {
    const len = values.message.length;
    if (len > MESSAGE_MAX * 0.95) return "danger";
    if (len > MESSAGE_MAX * 0.8) return "warn";
    return "neutral";
  }, [values.message.length]);

  const onSubmit = useCallback(async () => {
    if (isBusy) return;

    setState("submitting");
    setErrors({});

    // Полная клиентская валидация
    const fieldErrors = validateAll(values);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      setState("error");
      return;
    }

    // honeypot
    if (values.company) {
      setErrors({ _form: t.errorGeneric });
      setState("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { ok?: boolean; errors?: Record<string, string[] | string> } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data?.ok) {
        const incoming = (data?.errors ?? {}) as Record<string, string[] | string>;
        const normalized: Errors = {};
        Object.entries(incoming).forEach(([k, v]) => {
          normalized[k] = Array.isArray(v) ? (v[0] ?? "Invalid") : (v ?? "Invalid");
        });
        setErrors(Object.keys(normalized).length ? normalized : { _form: t.errorGeneric });
        setState("error");
        return;
      }

      // Успех
      setValues({ name: "", fromEmail: "", message: "", company: "" });
      setTouched({});
      setState("success");
    } catch {
      setErrors({ _form: t.errorNetwork });
      setState("error");
    }
  }, [isBusy, values, validateAll, t.errorGeneric, t.errorNetwork]);

  return {
    // state
    state,
    isBusy,
    buttonText,

    // values & errors
    values,
    setValues,
    errors,

    // handlers
    onChange,
    onBlur,
    onSubmit,
    onKeyDown,

    // refs
    nameRef,
    emailRef,
    msgRef,

    // UI helpers
    messageCountTone,
    MESSAGE_MAX,
  };
}
