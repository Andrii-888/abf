"use client";

import { useTranslations } from "next-intl";
import ClickShield from "../ClickShield";
import QRCodeCard from "../qr/QRCodeCard";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://alpinebridgefinance.vercel.app"
).trim();

export default function HeroLeft() {
  const t = useTranslations("home.hero");

  return (
    <div className="flex flex-col items-start gap-5 max-w-lg mt-[1rem] sm:mt-[-4rem]">
      {/* Brand */}
      <h1
        className="
    block mx-auto
    text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.18]
    pb-1
    bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]
    bg-clip-text text-transparent [-webkit-text-fill-color:transparent]

    text-center                        /* центр по умолчанию (мобилка) */
    sm:mt-6                            /* отступ сверху для планшета */
    md:w-full md:text-center md:mt-10  /* по центру на десктопе + чуть больше отступ */
  "
      >
        AlpineBridgeFinance
      </h1>

      {/* Slogan */}
      <p className="text-base sm:text-lg md:text-xl text-gray-900">
        {t("slogan")}
      </p>

      {/* Short description */}
      <p className="text-sm sm:text-base leading-relaxed text-gray-600">
        {t("desc1")}
        <br className="hidden sm:block" />
        {t("desc2")}
      </p>

      {/* Quick value bullets */}
      <ul className="mt-1 space-y-2 text-sm sm:text-base text-gray-900">
        {[
          t("bullets.b1"),
          t("bullets.b2"),
          t("bullets.b3"),
          t("bullets.b4"),
        ].map((tItem, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span
              className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-crypto)]"
              aria-hidden
            />
            <span>{tItem}</span>
          </li>
        ))}
      </ul>

      {/* CTA + QR */}
      <div className="mt-3 w-full flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <a
          href="#consult"
          className="block w-full sm:w-[260px] text-center rounded-xl px-5 py-3 text-sm sm:text-base font-medium
                 bg-[var(--color-crypto)] text-white transition-transform duration-200 active:scale-[0.98]
                 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0
                 focus-visible:ring-[var(--color-crypto)]"
        >
          {t("ctaPrimary")}
        </a>

        <div className="mt-3 sm:mt-0 flex justify-center sm:justify-start sm:pl-12">
          <ClickShield selector="#qr-zone" />
          <div
            id="qr-zone"
            className="relative inline-block select-none [&_a]:pointer-events-none"
          >
            <QRCodeCard url={SITE_URL} />
          </div>
        </div>
      </div>
    </div>
  );
}
