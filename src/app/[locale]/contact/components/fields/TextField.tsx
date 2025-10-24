// src/app/[locale]/contact/components/fields/TextField.tsx
"use client";

import clsx from "clsx";
import * as React from "react";

type BaseProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "name" | "value" | "onChange" | "onBlur" | "children"
> &
  BaseProps;

export const TextField = React.forwardRef<HTMLInputElement, Props>(function TextField(
  { id, name, label, value, error, className, onChange, onBlur, ...rest },
  ref,
) {
  const errId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <input
        ref={ref} // ✅ принимает Ref<HTMLInputElement>
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={errId}
        className={clsx(
          "input-apple",
          error && "ring-1 ring-red-500 focus:ring-red-600 focus:outline-none",
          className,
        )}
        {...rest} 
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
