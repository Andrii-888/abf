// src/app/[locale]/contact/components/ContactForm.tsx
"use client";

import { useContactForm } from "../useContactForm";
import { FormAlerts } from "./FormAlerts";
import { TextField } from "./fields/TextField";
import { TextareaField } from "./fields/TextareaField";
import { ConsentCheckbox } from "./fields/ConsentCheckbox";
import { SubmitBar } from "./SubmitBar";
import { ToastSent } from "./ToastSent";
import type { FormDict } from "../types";

export default function ContactForm({ dict }: { dict: FormDict }) {
  const {
    state,
    isBusy,
    values,
    errors,
    onChange,
    onBlur,
    onSubmit,
    onKeyDown,
    nameRef,
    emailRef,
    msgRef, // ← теперь используем
    MESSAGE_MAX,
    buttonText,
  } = useContactForm({
    validation: dict.validation,
    texts: {
      send: dict.buttons.send,
      sending: dict.buttons.sending,
      sent: dict.buttons.sent,
      retry: dict.buttons.retry,
      errorGeneric: dict.alerts.errorGeneric,
      errorNetwork: dict.alerts.errorNetwork,
    },
  });

  const liveStatus =
    state === "submitting"
      ? dict.a11y.statusSending
      : state === "success"
        ? dict.a11y.statusSuccess
        : state === "error"
          ? dict.a11y.statusError
          : "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      onKeyDown={onKeyDown}
      noValidate
      aria-busy={isBusy}
      className="space-y-6"
    >
      {/* sr-only live region */}
      <p className="sr-only" role="status" aria-live="polite">
        {liveStatus}
      </p>

      <FormAlerts
        successText={state === "success" ? dict.alerts.success : undefined}
        formError={errors._form}
      />

      <div className="grid w-full gap-4 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <TextField
            ref={nameRef}
            id="name"
            name="name"
            label={dict.labels.name}
            value={values.name}
            placeholder={dict.placeholders.name}
            disabled={isBusy}
            required
            autoComplete="name"
            inputMode="text"
            error={errors.name}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        <div className="lg:col-span-1">
          <TextField
            ref={emailRef}
            id="fromEmail"
            name="fromEmail"
            type="email"
            label={dict.labels.email}
            value={values.fromEmail}
            placeholder={dict.placeholders.email}
            disabled={isBusy}
            required
            autoComplete="email"
            inputMode="email"
            error={errors.fromEmail}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        <div className="lg:col-span-2">
          <TextareaField
            ref={msgRef}
            id="message"
            name="message"
            label={dict.labels.message}
            value={values.message}
            placeholder={dict.placeholders.message}
            disabled={isBusy}
            required
            rows={5}
            maxLength={MESSAGE_MAX}
            counterText={`${values.message.length}/${MESSAGE_MAX}`}
            error={errors.message}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        <div className="lg:col-span-2">
          <ConsentCheckbox
            label={dict.validation.consent.required}
            checked={values.consent}
            disabled={isBusy}
            error={errors.consent}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>

      {/* Блок отправки: запрещаем клик без согласия */}
      <SubmitBar disabled={isBusy || !values.consent} state={state} text={buttonText} />

      {/* Тост «Sent ✓» */}
      <ToastSent active={state === "success"} />
    </form>
  );
}
