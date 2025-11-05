"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import ClickShield from "../ClickShield";
import QRCodeCard from "../qr/QRCodeCard";
import { Mail } from "lucide-react";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://alpinebridgefinance.vercel.app"
).trim();

export default function HeroLeft() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <div className="flex flex-col items-start gap-5 max-w-lg mt-[1rem] sm:mt-[-4rem]">
      {/* Brand */}
      <h1 className="brand-gradient-title">AlpineBridgeFinance</h1>

      {/* Slogan */}
      <p className="text-base sm:text-lg md:text-xl text-gray-900">{t("slogan")}</p>

      {/* Short description */}
      <p className="text-sm sm:text-base leading-relaxed text-gray-600">
        {t("desc1")}
        <br className="hidden sm:block" />
        {t("desc2")}
      </p>

      {/* Quick value bullets */}
      <ul className="mt-1 space-y-2 text-sm sm:text-base text-gray-900">
        {[t("bullets.b1"), t("bullets.b2"), t("bullets.b3"), t("bullets.b4")].map((tItem, idx) => (
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
      <div className="mt-3 w-full flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center">
        <Link href={`/${locale}/contact`} className="btn-main group">
          <Mail className="h-4 w-4 text-[#007AFF] transition group-hover:scale-110" />
          <span className="text-[#007AFF] group-hover:text-[#005FCC]">{t("ctaPrimary")}</span>
        </Link>

        {/* QR-код виден только на десктопе */}
        <div className="hidden lg:flex mt-3 sm:mt-0 justify-center sm:justify-start sm:pl-12">
          <ClickShield selector="#qr-zone" />
          <div id="qr-zone" className="relative inline-block select-none [&_a]:pointer-events-none">
            <QRCodeCard url={SITE_URL} />
          </div>
        </div>
      </div>
    </div>
  );
}
