"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { contactSchema } from "@/utils/validation/contact.schema";

export type FormState = "idle" | "submitting" | "success" | "error";
export const MESSAGE_MAX = 1000;

type Values = {
  name: string;
  fromEmail: string;
  message: string;
  company: string; // honeypot
};

type Errors = Record<string, string>;

function validateAll(values: Values): Errors {
  const parsed = contactSchema.safeParse(values);
  if (parsed.success) return {};
  const flat = parsed.error.flatten().fieldErrors;
  const next: Errors = {};
  (Object.keys(flat) as Array<keyof typeof flat>).forEach((key) => {
    const msg = flat[key]?.[0];
    if (msg) next[String(key)] = msg;
  });
  return next;
}

export function useContactForm() {
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
    const Name = contactSchema.pick({ name: true });
    const Email = contactSchema.pick({ fromEmail: true });
    const Message = contactSchema.pick({ message: true });
    return { Name, Email, Message };
  }, []);

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
    if (state === "success") return "Sent ✓";
    if (state === "error") return "Try again";
    if (state === "submitting") return "Sending…";
    return "Send message";
  }, [state]);

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
      setErrors({ _form: "Something went wrong. Please try again." });
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
        setErrors(
          Object.keys(normalized).length
            ? normalized
            : { _form: "Something went wrong. Please try again." },
        );
        setState("error");
        return;
      }

      // Успех
      setValues({ name: "", fromEmail: "", message: "", company: "" });
      setTouched({});
      setState("success");
    } catch {
      setErrors({ _form: "Network error. Please try again." });
      setState("error");
    }
  }, [isBusy, values]);

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
