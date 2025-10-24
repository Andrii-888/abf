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
    msgRef,
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

      {/* 🔒 Honeypot: скрыто от пользователя, но доступно для ботов */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label>
          Company
          <input
            type="text"
            name="company" /* сервер ждёт поле `company` */
            tabIndex={-1}
            autoComplete="off"
            inputMode="none"
            aria-hidden="true"
            value={values.company}
            onChange={onChange}
            onBlur={onBlur}
          />
        </label>
      </div>

      <div className="grid w-full gap-4 lg:grid-cols-2">
        {/* Name */}
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
            autoCapitalize="words"
            enterKeyHint="next"
            error={errors.name}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        {/* Email (fromEmail — важно для API) */}
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
            autoCapitalize="none"
            enterKeyHint="next"
            error={errors.fromEmail}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        {/* Message */}
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
            autoComplete="off"
            enterKeyHint="send"
            error={errors.message}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>

        {/* Consent */}
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

      <SubmitBar disabled={isBusy || !values.consent} state={state} text={buttonText} />
      <button type="submit" className="hidden" aria-hidden="true" />
      <ToastSent active={state === "success"} />
    </form>
  );
}
