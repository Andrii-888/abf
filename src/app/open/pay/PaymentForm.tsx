"use client";

import type { StableCurrency } from "./PayPageClient";
import TextField from "./TextField";
import CurrencyToggle from "./CurrencyToggle";

type FieldErrors = {
  amount?: string;
  email?: string;
  txHash?: string;
};

type PaymentFormProps = {
  currency: StableCurrency;
  amount: string;
  name: string;
  email: string;
  txHash: string;
  errors: FieldErrors;
  successMessage?: string | null;
  onChangeCurrency: (currency: StableCurrency) => void;
  onChangeAmount: (value: string) => void;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeTxHash: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

// allow only digits and a single dot, also replace comma with dot
function normalizeAmountInput(raw: string): string {
  const withDot = raw.replace(",", ".");
  const onlyDigits = withDot.replace(/[^0-9.]/g, "");
  const parts = onlyDigits.split(".");
  if (parts.length <= 2) return onlyDigits;
  return `${parts[0]}.${parts.slice(1).join("")}`;
}

export default function PaymentForm({
  currency,
  amount,
  name,
  email,
  txHash,
  errors,
  successMessage,
  onChangeCurrency,
  onChangeAmount,
  onChangeName,
  onChangeEmail,
  onChangeTxHash,
  onSubmit,
}: PaymentFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 text-sm text-gray-800">
      <h2 className="text-sm font-semibold text-gray-900">Payment details</h2>
      <p className="mb-1 text-xs text-gray-500">
        Use this form to pay for consulting, integration and transaction support services in USDT or
        USDC. The exact amount should be agreed in advance. Please make sure you send the payment on
        the correct network (for example Ethereum, Tron, etc.) confirmed beforehand.
      </p>

      {successMessage && (
        <div className="mb-1 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 shadow-sm">
          {successMessage}
        </div>
      )}

      {/* amount */}
      <TextField
        label="Amount (USDT / USDC)"
        value={amount}
        onChange={(v) => onChangeAmount(normalizeAmountInput(v))}
        placeholder="Enter amount"
        inputMode="decimal"
        fieldError={errors.amount}
        helper="Enter the agreed amount as a positive number, e.g. 150 or 120.5"
      />

      {/* currency */}
      <CurrencyToggle currency={currency} onChangeCurrency={onChangeCurrency} />

      {/* name + email */}
      <div className="grid gap-3 md:grid-cols-2">
        <TextField
          label="Name (optional)"
          value={name}
          onChange={onChangeName}
          placeholder="Your name"
          autoComplete="off"
          helper="Optional, helps us match your payment"
        />
        <TextField
          label="Email"
          value={email}
          onChange={onChangeEmail}
          placeholder="you@example.com"
          type="email"
          autoComplete="off"
          fieldError={errors.email}
          helper="We will use this email to confirm your payment or ask questions if needed"
        />
      </div>

      {/* hash */}
      <TextField
        label="Transaction hash"
        value={txHash}
        onChange={onChangeTxHash}
        placeholder="0x..."
        autoComplete="off"
        fieldError={errors.txHash}
        helper="Paste the full transaction hash from your wallet or block explorer"
      />

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-900 md:text-sm"
      >
        {successMessage ? "Payment details sent" : "I have sent the payment"}
      </button>
    </form>
  );
}
