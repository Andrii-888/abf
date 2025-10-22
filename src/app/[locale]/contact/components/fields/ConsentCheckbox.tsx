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
    <div>
      <label className="flex items-start gap-2 text-sm">
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
            "mt-[2px] h-4 w-4 rounded border border-gray-400 text-gray-900 focus:ring-0 focus-visible:outline-none active:ring-0 transition-colors",
            error && "border-red-500",
          )}
        />
        <span className={clsx(disabled && "opacity-60")}>{label}</span>
      </label>

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
