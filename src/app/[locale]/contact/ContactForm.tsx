"use client";

import { usePathname } from "next/navigation";
import { useContactForm } from "./useContactForm";

export default function ContactForm() {
  const pathname = usePathname();
  const locale = pathname?.split("/")?.[1] || "ru";

  const { form, errors, loading, err, handleChange, handleSubmit } =
    useContactForm(locale);

  return (
    <div className="space-y-5 bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Форма обратной связи
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* honeypot */}
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Name */}
        <div>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-crypto ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            name="fromEmail"
            type="email"
            placeholder="Email"
            value={form.fromEmail}
            onChange={(e) => handleChange("fromEmail", e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-crypto ${
              errors.fromEmail ? "border-red-400" : "border-gray-300"
            }`}
            aria-invalid={!!errors.fromEmail}
          />
          {errors.fromEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.fromEmail}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-crypto ${
              errors.message ? "border-red-400" : "border-gray-300"
            }`}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => handleChange("consent", e.target.checked)}
            />
            <span>
              Я даю согласие на обработку персональных данных согласно{" "}
              <a
                className="underline"
                href={`/${locale}/privacy`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Политике конфиденциальности
              </a>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
          )}
        </div>

        {/* Общая ошибка */}
        {err && <p className="text-sm text-red-600">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-crypto text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition disabled:opacity-60"
        >
          {loading ? "Отправляем..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
