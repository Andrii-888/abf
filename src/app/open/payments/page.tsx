// src/app/open/payments/page.tsx

import NextLink from "next/link";

export default function OpenPaymentsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        {/* HERO */}
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-2">
            ALPINEBRIDGEFINANCE · SWITZERLAND
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Crypto payments for online stores and service businesses
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            This page presents how your e-commerce or service company can accept cryptocurrency
            payments (USDT, USDC, BTC, ETH) in a clear, compliant and client-friendly way, with
            settlement in CHF or EUR via Swiss-regulated partners.
          </p>
        </header>

        {/* 3 ключевых преимущества */}
        <section className="grid gap-6 md:grid-cols-3 mb-14">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-5">
            <h2 className="text-sm font-semibold mb-2">Global clients, local settlement</h2>
            <p className="text-xs text-gray-600">
              Your clients pay in crypto from anywhere in the world. You receive clean funds in
              crypto or as a bank transfer in CHF/EUR.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-5">
            <h2 className="text-sm font-semibold mb-2">Swiss-level compliance</h2>
            <p className="text-xs text-gray-600">
              Transactions are processed together with Swiss financial intermediaries following
              AML/KYC standards.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-5">
            <h2 className="text-sm font-semibold mb-2">Simple integration</h2>
            <p className="text-xs text-gray-600">
              We connect your website or store with a payment flow that looks familiar to your
              clients and is easy for your team to operate.
            </p>
          </div>
        </section>

        {/* Двухколоночный блок: для кого и как работает */}
        <section className="grid gap-10 md:grid-cols-2 mb-16">
          <div>
            <h2 className="text-lg font-semibold mb-3">How it works for your business</h2>
            <ol className="space-y-3 text-sm text-gray-700">
              <li>
                <span className="font-semibold">1. Onboarding.</span> We briefly verify your company
                and use-case (KYC/KYB).
              </li>
              <li>
                <span className="font-semibold">2. Integration.</span> We add a “Pay with crypto”
                option to your checkout or payment link flow.
              </li>
              <li>
                <span className="font-semibold">3. Client pays in crypto.</span> The client chooses
                USDT/BTC/ETH and confirms the transaction.
              </li>
              <li>
                <span className="font-semibold">4. Settlement.</span> You receive either crypto or a
                bank transfer in CHF/EUR, together with a clear transaction report.
              </li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">What your client sees</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Clear payment amount and selected currency</li>
              <li>• Wallet address and QR-code (one-time use)</li>
              <li>• Timer for on-chain confirmation</li>
              <li>• Status update: “waiting / confirmed / completed”</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              The visual part of this flow will be demonstrated directly on this page step by step.
            </p>
          </div>
        </section>

        {/* CTA-блок */}
        <section className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-5 md:px-6 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-sm md:text-base font-semibold mb-1">
                Interested in crypto payments for your store?
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                We can prepare a scenario specifically for your business and show how the payment
                flow will look for your clients.
              </p>
            </div>
            <NextLink
              href="/en/contact"
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Book a call
            </NextLink>
          </div>
        </section>

        <p className="mt-8 text-[11px] leading-relaxed text-gray-500 max-w-3xl">
          This page is designed as a presentation and technical base for a crypto payment solution
          under development. It does not process real payments and should not be used for
          transferring client funds. All operational flows will be implemented together with
          regulated Swiss partners.
        </p>
      </section>
    </main>
  );
}
