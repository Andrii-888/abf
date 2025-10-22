// src/app/[locale]/contact/useContactForm.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useContactValidation, type Errors } from "./useContactValidation";
import { submitContact } from "./useSubmitContact";
import { useDebouncedFieldValidation } from "./useDebouncedFieldValidation";
import { useMessageCountTone } from "./useMessageCountTone";

export type FormState = "idle" | "submitting" | "success" | "error";
export const MESSAGE_MAX = 1000;

/** Имена текстовых полей формы */
type TextFieldName = "name" | "fromEmail" | "message";
/** Все валидируемые поля формы */
type FieldName = TextFieldName | "consent";

const isTextFieldName = (n: string): n is TextFieldName =>
  n === "name" || n === "fromEmail" || n === "message";

const isFieldName = (n: string): n is FieldName => isTextFieldName(n) || n === "consent";

type Values = {
  name: string;
  fromEmail: string;
  message: string;
  company: string; // honeypot, не вводится руками
  consent: boolean;
};

type UseContactFormOpts = {
  validation: Parameters<typeof useContactValidation>[0];
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

  // Валидация (ожидаем строго FieldName/TextFieldName)
  const { validateField, validateAll } = useContactValidation(opts.validation);

  // Состояние формы
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<Values>({
    name: "",
    fromEmail: "",
    message: "",
    company: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const isBusy = state === "submitting";

  // Refs для автофокуса
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);

  // Debounced-валидация только для текстовых полей
  const debounce = useDebouncedFieldValidation(validateField, (updater) => setErrors(updater), 250);

  // onChange — поддержка input/textarea/checkbox без any
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";

      if (isCheckbox && name === "consent") {
        const checked = (e.target as HTMLInputElement).checked;
        setValues((v) => ({ ...v, consent: checked }));
      } else if (isTextFieldName(name)) {
        const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
        // Обновляем соответствующее поле без any
        setValues((v) =>
          name === "name"
            ? { ...v, name: value }
            : name === "fromEmail"
              ? { ...v, fromEmail: value }
              : { ...v, message: value },
        );
      }

      // Сбрасываем form-level ошибку при вводе
      if (errors._form) {
        const { _form: _omit, ...rest } = errors;
        setErrors(rest);
      }

      // Если поле было уже тронуто — валидируем
      if (touched[name as FieldName]) {
        if (isCheckbox && name === "consent") {
          const msg = validateField(
            "consent" as Parameters<typeof validateField>[0],
            String((e.target as HTMLInputElement).checked),
          );

          setErrors((prev) => {
            const next = { ...prev };
            if (msg) next.consent = msg;
            else delete next.consent;
            return next;
          });
        } else if (isTextFieldName(name)) {
          const value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
          debounce.schedule(name, value);
        }
      }

      // Любое изменение после success возвращает форму в idle
      if (state === "success") setState("idle");
    },
    [errors, touched, state, debounce, validateField],
  );

  // onBlur — строгая проверка, без any
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";

      // помечаем поле как touched
      if (isFieldName(name)) {
        setTouched((t) => ({ ...t, [name]: true }));
      }

      let field: FieldName | null = null;
      let valueForCheck = "";

      if (isCheckbox && name === "consent") {
        field = "consent";
        valueForCheck = String((e.target as HTMLInputElement).checked);
      } else if (isTextFieldName(name)) {
        field = name;
        valueForCheck = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
      }

      if (field) {
        const msg = validateField(field as Parameters<typeof validateField>[0], valueForCheck);

        setErrors((prev) => {
          const next = { ...prev };
          if (msg) next[field!] = msg;
          else delete next[field!];
          return next;
        });
      }
    },
    [validateField],
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") e.currentTarget.requestSubmit?.();
  }, []);

  // Подпись на кнопке
  const buttonText =
    state === "success"
      ? t.sent
      : state === "error"
        ? t.retry
        : state === "submitting"
          ? t.sending
          : t.send;

  // Сабмит — через вынесенную функцию
  const onSubmit = useCallback(async () => {
    if (isBusy) return;
    await submitContact({
      values,
      setValues,
      setTouched,
      setErrors,
      setState,
      validateAll,
      autoFocusOnError,
      t: { errorGeneric: t.errorGeneric, errorNetwork: t.errorNetwork },
      nameRef,
      emailRef,
      msgRef,
    });
  }, [
    isBusy,
    values,
    setValues,
    setTouched,
    setErrors,
    setState,
    validateAll,
    autoFocusOnError,
    t.errorGeneric,
    t.errorNetwork,
  ]);

  // Тон для счётчика символов
  const messageCountTone = useMessageCountTone(values.message, MESSAGE_MAX);

  // Автовозврат в idle после успешной отправки (через 4 сек)
  useEffect(() => {
    if (state === "success") {
      const id = setTimeout(() => setState("idle"), 4000);
      return () => clearTimeout(id);
    }
  }, [state]);

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
