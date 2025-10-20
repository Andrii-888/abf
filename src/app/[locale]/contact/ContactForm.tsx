// src/app/[locale]/contact/ContactForm.tsx
"use client";

import { useContactForm } from "./useContactForm";
import clsx from "clsx";

type FormDict = {
  labels: { name: string; email: string; message: string };
  placeholders: { name: string; email: string; message: string };
  buttons: { send: string; sending: string; sent: string; retry: string };
  alerts: { success: string; errorGeneric: string; errorNetwork: string };
  a11y: { statusSending: string; statusSuccess: string; statusError: string };
};

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
    messageCountTone,
    MESSAGE_MAX,
  } = useContactForm();

  const btnText =
    state === "success"
      ? dict.buttons.sent
      : state === "error"
        ? dict.buttons.retry
        : state === "submitting"
          ? dict.buttons.sending
          : dict.buttons.send;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      onKeyDown={onKeyDown}
      noValidate
      className="space-y-4"
    >
      {/* sr-only live region */}
      <p className="sr-only" role="status" aria-live="polite">
        {state === "submitting" && dict.a11y.statusSending}
        {state === "success" && dict.a11y.statusSuccess}
        {state === "error" && dict.a11y.statusError}
      </p>

      {/* success banner */}
      {state === "success" && (
        <div
          role="alert"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
        >
          {dict.alerts.success}
        </div>
      )}

      {/* form error */}
      {errors._form && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {errors._form || dict.alerts.errorGeneric}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          {dict.labels.name}
        </label>
        <input
          ref={nameRef}
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isBusy}
          placeholder={dict.placeholders.name}
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={clsx(
            "input-apple",
            errors.name && "ring-1 ring-red-500 focus:ring-red-600 focus:outline-none",
          )}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="fromEmail" className="mb-1 block text-sm font-medium">
          {dict.labels.email}
        </label>
        <input
          ref={emailRef}
          id="fromEmail"
          name="fromEmail"
          type="email"
          value={values.fromEmail}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isBusy}
          placeholder={dict.placeholders.email}
          autoComplete="email"
          required
          aria-invalid={!!errors.fromEmail}
          aria-describedby={errors.fromEmail ? "fromEmail-error" : undefined}
          className={clsx(
            "input-apple",
            errors.fromEmail && "ring-1 ring-red-500 focus:ring-red-600 focus:outline-none",
          )}
        />
        {errors.fromEmail && (
          <p id="fromEmail-error" className="mt-1 text-xs text-red-600">
            {errors.fromEmail}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="message" className="mb-1 block text-sm font-medium">
            {dict.labels.message}
          </label>
          <span
            className={clsx(
              "text-[11px]",
              messageCountTone === "neutral" && "text-gray-500",
              messageCountTone === "warn" && "text-amber-600",
              messageCountTone === "danger" && "text-red-600",
            )}
          >
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          ref={msgRef}
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isBusy}
          placeholder={dict.placeholders.message}
          maxLength={MESSAGE_MAX}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={clsx(
            "input-apple resize-none",
            errors.message && "ring-1 ring-red-500 focus:ring-red-600 focus:outline-none",
          )}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className={clsx(
          "inline-flex min-w-[10rem] items-center justify-center rounded-xl border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition",
          "hover:opacity-90 disabled:opacity-60",
        )}
      >
        {btnText}
      </button>
    </form>
  );
}
