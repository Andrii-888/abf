// src/app/open/pay/TextField.tsx
"use client";

import type { InputHTMLAttributes } from "react";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
  fieldError?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export default function TextField({
  label,
  value,
  onChange,
  helper,
  fieldError,
  ...inputProps
}: TextFieldProps) {
  const hasError = Boolean(fieldError);

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700">{label}</label>

      <input
        {...inputProps}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full rounded-xl bg-white px-3 py-2 text-sm outline-none transition focus:ring-1",

          hasError
            ? "!border-red-600 !text-red-700 !ring-red-600 !focus:border-red-700 !focus:ring-red-700 placeholder-red-400"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
        ].join(" ")}
      />

      <p className={`text-[11px] font-medium ${hasError ? "!text-red-600" : "text-gray-500"}`}>
        {hasError ? fieldError : helper}
      </p>
    </div>
  );
}
