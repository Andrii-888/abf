"use client";

import { useCallback, useMemo, useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isBusy = state === "submitting";

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((v) => ({ ...v, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
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

  async function validate(data: typeof values) {
    // 💡 Динамически грузим zod ТОЛЬКО при сабмите (не попадает в initial bundle)
    const { z } = await import("zod");

    const schema = z.object({
      name: z.string().min(2, "Name is too short"),
      email: z.string().email("Invalid email"),
      message: z.string().min(5, "Message is too short"),
    });

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as string;
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      throw fieldErrors;
    }
  }

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isBusy) return;

      setState("submitting");
      setErrors({});

      try {
        await validate(values);

        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error("Request failed");
        }

        setState("success");
        // по желанию — очистить поля после успешной отправки:
        // setValues({ name: '', email: '', message: '' });
      } catch (err) {
        if (err && typeof err === "object") {
          // Валидационные ошибки из validate()
          setErrors(err as Record<string, string>);
        } else {
          // Сетевые/прочие ошибки
          setErrors({ _form: "Something went wrong, please try again." });
        }
        setState("error");
      } finally {
        // лёгкая задержка — чтобы не "мигало"
        setTimeout(() => setState((s) => (s === "success" ? s : "idle")), 400);
      }
    },
    [isBusy, values],
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          className="w-full rounded-xl border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-400"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          disabled={isBusy}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-400"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          disabled={isBusy}
          placeholder="How can we help?"
          className="w-full rounded-xl border border-gray-300/70 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-gray-400"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {/* Form error */}
      {errors._form && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {errors._form}
        </div>
      )}

      <button
        type="submit"
        disabled={isBusy}
        className="inline-flex items-center justify-center rounded-xl border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {buttonText}
      </button>
    </form>
  );
}
