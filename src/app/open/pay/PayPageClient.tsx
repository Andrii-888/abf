"use client";

import { useEffect, useMemo, useState } from "react";
import PaymentForm from "./PaymentForm";
import WalletPanel from "./WalletPanel";
import BackToHome from "@/components/BackToHome";
import { validatePayForm } from "./payValidation";

export type StableCurrency = "USDT" | "USDC";

// In a real project, set these in .env:
// NEXT_PUBLIC_USDT_ADDRESS=0x...
// NEXT_PUBLIC_USDC_ADDRESS=0x...
const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_ADDRESS ?? "0xYOUR_USDT_ADDRESS";
const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS ?? "0xYOUR_USDC_ADDRESS";

type FieldErrors = {
  amount?: string;
  email?: string;
  txHash?: string;
};

export default function PayPageClient() {
  const [currency, setCurrency] = useState<StableCurrency>("USDT");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [txHash, setTxHash] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activeAddress = useMemo(
    () => (currency === "USDT" ? USDT_ADDRESS : USDC_ADDRESS),
    [currency],
  );

  // 🔁 If the user RELOADS /open/pay — redirect to /en
  useEffect(() => {
    if (typeof window === "undefined") return;

    const navEntries = performance.getEntriesByType("navigation") as
      | PerformanceNavigationTiming[]
      | undefined;

    const navType = navEntries && navEntries[0]?.type;
    if (navType === "reload") {
      window.location.href = "/en";
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSuccessMessage(null);
    setErrors({});

    const { isValid, errors } = validatePayForm({
      amount,
      currency,
      name,
      email,
      txHash,
    });

    if (!isValid) {
      setErrors({
        amount: errors.amount,
        email: errors.email,
        txHash: errors.txHash,
      });
      return;
    }

    // UI only: simulate submit
    setSuccessMessage(
      "We have received your payment details. We will review the transaction and contact you by email.",
    );
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16 md:py-20">
        {/* 🔙 back to home */}
        <BackToHome />

        {/* 🟡 badge "in development" */}
        <p className="mx-auto mt-2 mb-6 w-full text-center text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
          In development
        </p>

        {/* Header / intro */}
        <header className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            ALPINEBRIDGEFINANCE · SWITZERLAND
          </p>
          <h1 className="mb-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Pay for services in stablecoins
          </h1>
          <p className="mx-auto max-w-xl text-sm text-gray-600 md:text-base">
            Use this page to pay for consulting, integration and transaction support services
            directly in stablecoins (USDT or USDC). Please enter the agreed amount, choose the
            currency, send the payment from your wallet and paste the transaction hash so that we
            can confirm the transfer.
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-6 shadow-sm md:px-6 md:py-7">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
            {/* Left column — form */}
            <PaymentForm
              currency={currency}
              amount={amount}
              name={name}
              email={email}
              txHash={txHash}
              errors={errors}
              successMessage={successMessage}
              onChangeCurrency={(val) => {
                setCurrency(val);
                if (successMessage) setSuccessMessage(null);
              }}
              onChangeAmount={(val) => {
                setAmount(val);
                clearFieldError("amount");
              }}
              onChangeName={(val) => {
                setName(val);
              }}
              onChangeEmail={(val) => {
                setEmail(val);
                clearFieldError("email");
              }}
              onChangeTxHash={(val) => {
                setTxHash(val);
                clearFieldError("txHash");
              }}
              onSubmit={handleSubmit}
            />

            {/* Right column — address + QR */}
            <WalletPanel currency={currency} address={activeAddress} />
          </div>
        </div>

        {/* Legal notice */}
        <p className="mt-5 text-center text-[11px] leading-relaxed text-gray-500 md:text-xs">
          This payment page is only for paying my professional fees (consulting, technical
          integration and transaction support). I do not store, manage, exchange or forward client
          assets on behalf of third parties. All operations with client funds related to real
          transactions are carried out exclusively through licensed Swiss financial partners in
          accordance with local regulation.
        </p>
      </section>
    </main>
  );
}
