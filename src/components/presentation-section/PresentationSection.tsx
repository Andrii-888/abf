"use client";

import Image from "next/image";
import Link from "next/link";
import presentationImg from "./assets/presentation.png";

export default function PresentationSection() {
  return (
    <section className="w-full bg-white py-20" aria-label="Highlight cards">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* 🔹 Бейдж “In development” */}
        <p className="mx-auto mt-2 mb-6 w-full text-center text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
          In development
        </p>

        {/* Карточка с фирменными цветами ABF */}
        <div
          className="
            grid items-center gap-10 rounded-3xl border 
            bg-white/90 
            p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] 
            md:p-10 lg:grid-cols-2
            bg-gradient-to-br
            from-[#d4af3733]
            via-[#1abc9c22]
            to-[#c0392b22]
          "
        >
          {/* Левая колонка — текст */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
              FOR ONLINE STORES & DIGITAL BUSINESSES
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
              Help online stores accept crypto payments safely
            </h2>

            <p className="text-base leading-relaxed text-gray-700">
              I work with a Swiss-licensed partner to help merchants accept stablecoins (USDT /
              USDC) from international clients. You don&apos;t need to become a crypto exchange or
              manage wallets yourself – I take care of the setup, coordination and ongoing support.
            </p>

            <ul className="space-y-3 text-sm text-gray-800 lg:list-inside list-none">
              <li>• Extra payment method in USDT (TRC-20) and USDC (BEP-20)</li>
              <li>• No custody of client assets on your side</li>
              <li>• Suitable for Shopify, WooCommerce and custom websites</li>
              <li>• Alignment with Swiss standards through our regulated partner</li>
            </ul>

            <p className="text-xs text-gray-600">
              Ideal for e-commerce, digital services, bookings and businesses working with clients
              in Europe, Switzerland and abroad.
            </p>

            <div
              className="
    flex flex-col items-center gap-3 
    lg:flex-row lg:items-center
  "
            >
              {/* 🔵 Кнопка: открыть презентацию */}
              <Link
                href="/en/presentation"
                className="
      inline-flex justify-center rounded-full bg-black 
      px-6 py-3 text-sm font-medium text-white shadow 
      hover:bg-gray-900 w-full lg:w-auto
    "
              >
                Open detailed presentation
              </Link>

              {/* 🟦 Новая кнопка: демо интеграция */}
              <a
                href="https://crypto-pay-iota.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="
      inline-flex justify-center rounded-full border border-gray-700 
      px-6 py-3 text-sm font-medium text-gray-800 
      hover:bg-gray-100 w-full lg:w-auto
    "
              >
                Try Crypto Pay Demo →
              </a>
            </div>
          </div>

          {/* Правая колонка — изображение */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <Image
                src={presentationImg}
                alt="Crypto payment integration presentation"
                className="h-auto w-full rounded-3xl shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
