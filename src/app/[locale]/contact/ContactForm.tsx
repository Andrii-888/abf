"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { contactSchema } from "@/utils/validation/contact.schema";

type State = "idle" | "submitting" | "success" | "error";
const MESSAGE_MAX = 1000;

export default function ContactForm() {
  const router = useRouter();

  const [state, setState] = useState<State>("idle");
  const [values, setValues] = useState({
    name: "",
    fromEmail: "",
    message: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isBusy = state === "submitting";

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
      if (errors[name]) {
        const { [name]: _omit, ...rest } = errors;
        setErrors(rest);
      }
    },
    [errors],
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

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isBusy) return;

      setState("submitting");
      setErrors({});

      // 1) Клиентская валидация той же схемой
      const parsed = contactSchema.safeParse(values);
      if (!parsed.success) {
        const flat = parsed.error.flatten().fieldErrors;
        // Типобезопасно преобразуем в Record<string, string>
        const fieldErrors: Record<string, string> = {};
        (Object.keys(flat) as Array<keyof typeof flat>).forEach((key) => {
          const msg = flat[key]?.[0];
          if (msg) fieldErrors[String(key)] = msg;
        });
        setErrors(fieldErrors);
        setState("error");
        return;
      }

      // 2) Отправка на API
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
          const normalized: Record<string, string> = {};
          Object.entries(incoming).forEach(([k, v]) => {
            normalized[k] = Array.isArray(v) ? (v[0] ?? "Invalid") : (v ?? "Invalid");
          });
          setErrors(
            Object.keys(normalized).length
              ? normalized
              : { _form: "Something went wrong, please try again." },
          );
          setState("error");
          return;
        }

        setState("success");
        router.push("/contact/sent");
      } catch {
        setErrors({ _form: "Network error, please try again." });
        setState("error");
      }
    },
    [isBusy, values, router],
  );

  return (
    <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="space-y-4">
      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={values.company}
          onChange={onChange}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={onChange}
          disabled={isBusy}
          placeholder="Your name"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="input-apple"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email (fromEmail) */}
      <div>
        <label htmlFor="fromEmail" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="fromEmail"
          name="fromEmail"
          type="email"
          value={values.fromEmail}
          onChange={onChange}
          disabled={isBusy}
          placeholder="you@example.com"
          autoComplete="email"
          required
          aria-invalid={!!errors.fromEmail}
          aria-describedby={errors.fromEmail ? "fromEmail-error" : undefined}
          className="input-apple"
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
            Message
          </label>
          <span className="text-[11px] text-gray-500">
            {values.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          disabled={isBusy}
          placeholder="How can we help?"
          maxLength={MESSAGE_MAX}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="input-apple resize-none"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Form error */}
      {errors._form && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
        >
          {errors._form}
        </div>
      )}

      <button
        type="submit"
        disabled={isBusy}
        className="inline-flex min-w-[10rem] items-center justify-center rounded-xl border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {buttonText}
      </button>
    </form>
  );
}
