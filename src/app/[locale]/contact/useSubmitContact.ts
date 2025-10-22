// src/app/[locale]/contact/useSubmitContact.ts
"use client";

import type { MutableRefObject } from "react";
import type { Errors } from "./useContactValidation";

export type SubmitDeps = {
  values: {
    name: string;
    fromEmail: string;
    message: string;
    company: string;
    consent: boolean;
  };
  setValues: (v: SubmitDeps["values"]) => void;
  setTouched: (t: Record<string, boolean>) => void;
  setErrors: (e: Errors) => void;
  setState: (s: "idle" | "submitting" | "success" | "error") => void;
  validateAll: (vals: SubmitDeps["values"]) => Errors;
  autoFocusOnError: boolean;
  t: { errorGeneric: string; errorNetwork: string };
  nameRef: MutableRefObject<HTMLInputElement | null>;
  emailRef: MutableRefObject<HTMLInputElement | null>;
  msgRef: MutableRefObject<HTMLTextAreaElement | null>;
};

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
}: SubmitDeps) {
  setState("submitting");
  setErrors({});

  // honeypot
  if (values.company) {
    setErrors({ _form: "Spam detected." });
    setState("error");
    return;
  }

  // client validation
  const fieldErrors = validateAll(values);
  if (Object.keys(fieldErrors).length) {
    setErrors(fieldErrors);
    setState("error");
    if (autoFocusOnError) {
      if (fieldErrors.name && nameRef.current) nameRef.current.focus();
      else if (fieldErrors.fromEmail && emailRef.current) emailRef.current.focus();
      else if (fieldErrors.message && msgRef.current) msgRef.current.focus();
    }
    return;
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      const normalized: Errors = {};
      const incoming = (data?.errors ?? {}) as Record<string, string>;
      for (const [k, v] of Object.entries(incoming)) normalized[k] = v || "Invalid";

      normalized._form ||= t.errorGeneric;
      setErrors(normalized);
      setState("error");

      if (autoFocusOnError) {
        if (normalized.name && nameRef.current) nameRef.current.focus();
        else if (normalized.fromEmail && emailRef.current) emailRef.current.focus();
        else if (normalized.message && msgRef.current) msgRef.current.focus();
      }
      return;
    }

    // success — clear fields
    setValues({
      name: "",
      fromEmail: "",
      message: "",
      company: "",
      consent: false,
    });
    setTouched({});
    setState("success");
  } catch {
    setErrors({ _form: t.errorNetwork });
    setState("error");
  }
}
