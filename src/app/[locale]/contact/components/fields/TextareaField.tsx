// src/app/[locale]/contact/components/fields/TextareaField.tsx
"use client";

import * as React from "react";
import clsx from "clsx";

type BaseProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  counterText?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

type Props = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "name" | "value" | "onChange" | "onBlur" | "children"
> &
  BaseProps;

export const TextareaField = React.forwardRef<HTMLTextAreaElement, Props>(function TextareaField(
  { id, name, label, value, error, counterText, className, onChange, onBlur, ...rest },
  ref,
) {
  const errId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <textarea
        ref={ref} // ✅ корректный ref
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={clsx(
          "input-apple min-h-[120px]",
          error && "ring-1 ring-red-500 focus:ring-red-600 focus:outline-none",
          className,
        )}
        {...rest} 
      />

      <div className="mt-1 flex items-center justify-between min-h-[1.25rem]">
        <span
          id={errId}
          aria-live="polite"
          className={clsx("text-xs", error ? "text-red-600" : "text-transparent")}
        >
          {error || "•"}
        </span>
        {counterText && <span className="text-xs text-gray-500">{counterText}</span>}
      </div>
    </div>
  );
});
