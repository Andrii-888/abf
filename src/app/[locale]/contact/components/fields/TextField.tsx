// src/app/[locale]/contact/components/fields/TextField.tsx
"use client";

import clsx from "clsx";
import React, { forwardRef, type ForwardedRef } from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  type?: React.HTMLInputTypeAttribute; // "text" | "email" | "tel" | ...
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  error?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField = forwardRef(function TextField(
  {
    id,
    name,
    label,
    value,
    type = "text",
    placeholder,
    disabled,
    required,
    autoComplete,
    inputMode,
    error,
    onChange,
    onBlur,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const errId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={clsx(
          "input-apple",
          error && "ring-1 ring-red-500 focus:ring-red-600 focus:outline-none",
        )}
      />

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
});
