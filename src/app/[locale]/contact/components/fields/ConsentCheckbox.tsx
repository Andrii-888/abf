// src/app/[locale]/contact/components/fields/ConsentCheckbox.tsx
"use client";

import clsx from "clsx";
import React from "react";

type Props = {
  id?: string;
  name?: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export function ConsentCheckbox({
  id = "consent",
  name = "consent",
  label,
  checked,
  disabled,
  error,
  onChange,
  onBlur,
}: Props) {
  const errId = `${id}-error`;

  return (
    <div className="select-none">
      <label
        htmlFor={id}
        className={clsx(
          "flex items-start gap-2 text-sm",
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        )}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={errId}
          className={clsx(
            // базовый вид
            "mt-[2px] h-5 w-5 rounded border border-slate-300 bg-white",
            // фирменный синий чек (поддерживается в современных браузерах)
            "accent-[#007AFF]",
            // focus-кольцо в фирменном стиле
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]/40 focus-visible:ring-offset-2",
            // состояния
            disabled && "border-slate-200 accent-slate-300",
            error && "border-red-500 focus-visible:ring-red-300",
          )}
        />
        <span className="leading-5">
          {label}
          {/* скрытая для зрения пометка, полезно для скринридеров */}
          <span className="sr-only"> — required</span>
        </span>
      </label>

      {/* helper / ошибка */}
      <span
        id={errId}
        aria-live="polite"
        className={clsx(
          "mt-1 block min-h-[1.25rem] text-xs",
          error ? "text-red-600" : "text-transparent",
        )}
      >
        {error || "•"}
      </span>
    </div>
  );
}
