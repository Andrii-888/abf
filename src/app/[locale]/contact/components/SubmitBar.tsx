// src/app/[locale]/contact/components/SubmitBar.tsx
"use client";

import clsx from "clsx";
import { Mail } from "lucide-react";

export function SubmitBar({
  disabled,
  state,
  text,
}: {
  disabled: boolean;
  state: string;
  text: string;
}) {
  return (
    <div className="flex justify-center lg:justify-end sticky bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] z-10 px-3 py-2">
      <button
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        data-state={disabled ? "submitting" : state}
        className={clsx("btn-main", disabled && "btn-main-disabled")}
      >
        <Mail className="btn-main-icon" />
        <span className="btn-main-text">{text}</span>
      </button>
    </div>
  );
}
