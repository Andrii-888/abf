"use client";
import { useEffect } from "react";

/**
 * Глобально перехватывает клики/тапы в capture-фазе
 * и отменяет их, если target находится внутри элемента,
 * совпадающего с CSS-селектором `selector`.
 */
export default function ClickShield({ selector }: { selector: string }) {
  useEffect(() => {
    const stopIfInside = (e: Event) => {
      const root = document.querySelector(selector);
      if (!root) return;

      const target = e.target as Node | null;
      if (target && root.contains(target)) {
        e.preventDefault();

        // Безопасный вызов без ts-комментариев:
        const ev = e as unknown as {
          stopImmediatePropagation?: () => void;
          stopPropagation: () => void;
        };
        if (typeof ev.stopImmediatePropagation === "function") {
          ev.stopImmediatePropagation();
        }
        ev.stopPropagation();
      }
    };

    // capture: true → ловим событие раньше любых родителей/next/link
    document.addEventListener("click", stopIfInside, true);
    document.addEventListener("pointerdown", stopIfInside, true);
    document.addEventListener("touchstart", stopIfInside, true);

    return () => {
      document.removeEventListener("click", stopIfInside, true);
      document.removeEventListener("pointerdown", stopIfInside, true);
      document.removeEventListener("touchstart", stopIfInside, true);
    };
  }, [selector]);

  return null;
}
