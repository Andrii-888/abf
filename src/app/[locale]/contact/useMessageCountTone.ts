// src/app/[locale]/contact/useMessageCountTone.ts
"use client";

/**
 * Возвращает "neutral" | "warn" | "danger" в зависимости от доли заполнения.
 * Порогы: >80% → warn, >95% → danger.
 */
export function useMessageCountTone(message: string, max = 1000) {
  const len = message.length;
  if (len > max * 0.95) return "danger" as const;
  if (len > max * 0.8) return "warn" as const;
  return "neutral" as const;
}
