// src/app/[locale]/contact/components/fields/TextareaField.tsx
"use client";

import clsx from "clsx";
import React, { forwardRef, type ForwardedRef } from "react";

type Props = {
  id: string;
  name: string;
  label: string;

  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;

  // Покажем счётчик символов справа от label (например "123/1000")
  counterText?: string;

  error?: string;

  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export const TextareaField = forwardRef(function TextareaField(
  {
    id,
    name,
    label,
    value,
    placeholder,
    disabled,
    required,
    rows = 5,
    maxLength,
    counterText,
    error,
    onChange,
    onBlur,
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const errId = `${id}-error`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="mb-1 block text-sm font-medium">
          {label}
        </label>
        {counterText ? <span className="text-[11px] text-gray-500">{counterText}</span> : null}
      </div>

      <textarea
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={clsx(
          "input-apple resize-none",
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
