// src/app/[locale]/contact/useDebouncedFieldValidation.ts
"use client";

import { useEffect, useRef } from "react";
import type { Errors } from "./useContactValidation";

type Field = "name" | "fromEmail" | "message";

/**
 * Хук для мягкой (debounce) валидации полей после blur.
 * Использование:
 *   const debounce = useDebouncedFieldValidation(validateField, setErrors, 250);
 *   if (touched[name]) debounce.schedule(name as Field, value);
 */
export function useDebouncedFieldValidation(
  validateField: (name: Field, value: string) => string,
  setErrors: (updater: (prev: Errors) => Errors) => void,
  delay = 250,
) {
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout> | undefined>>({});

  function schedule(name: Field, value: string) {
    const prev = timersRef.current[name];
    if (prev) clearTimeout(prev);

    timersRef.current[name] = setTimeout(() => {
      const msg = validateField(name, value);
      setErrors((prevErrs) => {
        const next = { ...prevErrs };
        if (msg) next[name] = msg;
        else delete next[name];
        return next;
      });
    }, delay);
  }

  function cancelAll() {
    Object.values(timersRef.current).forEach((t) => t && clearTimeout(t));
    timersRef.current = {};
  }

  // авто-очистка при размонтировании
  useEffect(() => cancelAll, []);

  return { schedule, cancelAll };
}
