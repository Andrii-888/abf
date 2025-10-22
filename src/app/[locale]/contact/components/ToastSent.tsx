// src/app/[locale]/contact/components/ToastSent.tsx
"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export function ToastSent({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 z-50 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 shadow-lg transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      role="alert"
      aria-live="polite"
    >
      ✅ Message sent successfully!
    </div>
  );
}
