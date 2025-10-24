// src/app/[locale]/contact/useContactForm.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useContactValidation } from "./useContactValidation";
import type { ValidationMessages } from "./useContactValidation";
import { submitContact } from "./useSubmitContact";
import { useMessageCountTone } from "./useMessageCountTone";

export type FormState = "idle" | "submitting" | "success" | "error";
export const MESSAGE_MAX = 1000;

/** Текстовые поля формы */
type TextFieldName = "name" | "fromEmail" | "message";
/** Все поля, которые мы помечаем touched */
type FieldName = TextFieldName | "consent";

const isTextFieldName = (n: string): n is TextFieldName =>
  n === "name" || n === "fromEmail" || n === "message";

const isFieldName = (n: string): n is FieldName => isTextFieldName(n) || n === "consent";

/** Значения формы */
export type Values = {
  name: string;
  fromEmail: string;
  message: string;
  company: string; // honeypot
  consent: boolean;
};

/** Карта ошибок — просто строковые сообщения по ключу поля */
type ErrorMap = Record<string, string>;

type UseContactFormOpts = {
  validation: ValidationMessages; // consent уже включён в тип
  texts?: {
    send: string;
    sending: string;
    sent: string;
    retry: string;
    errorGeneric: string;
    errorNetwork: string;
  };
  autoFocusOnError?: boolean;
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
  const autoFocusOnError = opts.autoFocusOnError ?? true;

  // Валидация текстовых полей (name/fromEmail/message)
  const { validateField, validateAll } = useContactValidation(opts.validation);

  // Состояния формы
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<Values>({
    name: "",
    fromEmail: "",
    message: "",
    company: "",
    consent: false,
  });
  const [errors, setErrors] = useState<ErrorMap>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const isBusy = state === "submitting";

  // Refs для автофокуса после ошибок
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);

  // Простая локальная валидация consent (без validateField)
  const validateConsentNow = useCallback(
    (checked: boolean): string | undefined =>
      checked ? undefined : opts.validation.consent.required,
    [opts.validation.consent.required],
  );

  // onChange
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      const { name } = target;

      // consent (checkbox)
      if (
        "type" in target &&
        (target as HTMLInputElement).type === "checkbox" &&
        name === "consent"
      ) {
        const checked = (target as HTMLInputElement).checked;
        setValues((v) => ({ ...v, consent: checked }));

        // если уже трогали — валидируем сразу локально
        if (touched.consent) {
          const msg = validateConsentNow(checked);
          setErrors((prev) => {
            const next = { ...prev };
            if (msg) next.consent = msg;
            else delete next.consent;
            return next;
          });
        }
      }

      // текстовые поля
      if (isTextFieldName(name)) {
        const val = (target as HTMLInputElement | HTMLTextAreaElement).value;
        setValues((v) =>
          name === "name"
            ? { ...v, name: val }
            : name === "fromEmail"
              ? { ...v, fromEmail: val }
              : { ...v, message: val },
        );
      }

      // сбрасываем form-level ошибку
      if (errors._form) {
        const { _form: _omit, ...rest } = errors;
        setErrors(rest);
      }

      // любое изменение после success → idle
      if (state === "success") setState("idle");
    },
    [errors, state, touched.consent, validateConsentNow],
  );

  // onBlur — отмечаем touched и валидируем текущее поле
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      const { name } = target;

      if (isFieldName(name)) setTouched((t) => ({ ...t, [name]: true }));

      // consent локально
      if (
        "type" in target &&
        (target as HTMLInputElement).type === "checkbox" &&
        name === "consent"
      ) {
        const checked = (target as HTMLInputElement).checked;
        const msg = validateConsentNow(checked);
        setErrors((prev) => {
          const next = { ...prev };
          if (msg) next.consent = msg;
          else delete next.consent;
          return next;
        });
        return;
      }

      // текстовые поля через validateField
      if (isTextFieldName(name)) {
        const val = (target as HTMLInputElement | HTMLTextAreaElement).value;
        const msg = validateField(name, val);
        setErrors((prev) => {
          const next = { ...prev };
          if (msg) next[name] = msg;
          else delete next[name];
          return next;
        });
      }
    },
    [validateField, validateConsentNow],
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") e.currentTarget.requestSubmit?.();
  }, []);

  // Текст кнопки
  const buttonText =
    state === "success"
      ? t.sent
      : state === "error"
        ? t.retry
        : state === "submitting"
          ? t.sending
          : t.send;

  // Отправка
  const onSubmit = useCallback(async () => {
    if (isBusy) return;

    // Проверяем consent перед отправкой
    const consentErr = validateConsentNow(values.consent);
    if (consentErr) {
      setErrors((prev) => ({ ...prev, consent: consentErr }));
      setState("error");
      return;
    }

    await submitContact({
      values,
      setValues,
      setTouched,
      setErrors,
      setState,
      validateAll,
      autoFocusOnError,
      t: {
        errorGeneric: t.errorGeneric,
        errorNetwork: t.errorNetwork,
      },
      nameRef,
      emailRef,
      msgRef,
    });
  }, [
    isBusy,
    values,
    validateAll,
    autoFocusOnError,
    t.errorGeneric,
    t.errorNetwork,
    nameRef,
    emailRef,
    msgRef,
    validateConsentNow,
  ]);

  // Тон для счётчика символов
  const messageCountTone = useMessageCountTone(values.message, MESSAGE_MAX);

  // Автовозврат в idle после success
  useEffect(() => {
    if (state === "success") {
      const id = setTimeout(() => setState("idle"), 4000);
      return () => clearTimeout(id);
    }
  }, [state]);

  return {
    state,
    isBusy,
    buttonText,
    values,
    setValues,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onKeyDown,
    nameRef,
    emailRef,
    msgRef,
    messageCountTone,
    MESSAGE_MAX,
  };
}
