// src/app/[locale]/contact/components/FormAlerts.tsx
"use client";

export function FormAlerts({
  successText,
  formError,
}: {
  successText?: string;
  formError?: string;
}) {
  return (
    <>
      {successText ? (
        <div
          role="alert"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
        >
          {successText}
        </div>
      ) : null}

      {formError ? (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {formError}
        </div>
      ) : null}
    </>
  );
}
