// src/app/[locale]/contact/components/SubmitBar.tsx
"use client";

import clsx from "clsx";

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
    <div
      className={clsx(
        "lg:flex lg:justify-end lg:static lg:bg-transparent lg:border-0 lg:p-0",
        "sticky bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] z-10 flex justify-center rounded-xl border border-transparent bg-transparent px-3 py-2",
        "backdrop-blur-none supports-[backdrop-filter]:bg-transparent",
      )}
    >
      <button
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        data-state={disabled ? "submitting" : state}
        className={clsx(
          "inline-flex min-w-[10rem] items-center justify-center rounded-xl border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity duration-150",
          "hover:opacity-90 active:opacity-80 disabled:opacity-60 focus:outline-none focus:ring-0",
        )}
      >
        {text}
      </button>
    </div>
  );
}
