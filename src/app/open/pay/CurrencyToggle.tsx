// src/app/open/pay/CurrencyToggle.tsx
"use client";

import type { StableCurrency } from "./PayPageClient";

type CurrencyToggleProps = {
  currency: StableCurrency;
  onChangeCurrency: (c: StableCurrency) => void;
};

export default function CurrencyToggle({ currency, onChangeCurrency }: CurrencyToggleProps) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-medium text-gray-700">Currency</span>

      <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs">
        <button
          type="button"
          onClick={() => onChangeCurrency("USDT")}
          className={[
            "rounded-full px-3 py-1 transition",
            currency === "USDT"
              ? "bg-black text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-200",
          ].join(" ")}
        >
          USDT
        </button>

        <button
          type="button"
          onClick={() => onChangeCurrency("USDC")}
          className={[
            "rounded-full px-3 py-1 transition",
            currency === "USDC"
              ? "bg-black text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-200",
          ].join(" ")}
        >
          USDC
        </button>
      </div>
    </div>
  );
}
