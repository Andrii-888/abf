"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Shield, FileText, Mail } from "lucide-react";

/** Чёткий SVG-флаг Швейцарии */
function SwissFlagIcon({ size = 18 }: { size?: number }) {
  const s = size;
  const crossW = s * 0.56;
  const crossT = s * 0.18;
  const cx = s / 2 - crossW / 2;
  const cy = s / 2 - crossT / 2;
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="0"
        y="0"
        width={s}
        height={s}
        rx={Math.max(2, s * 0.08)}
        fill="#D52B1E"
      />
      <rect
        x={cx + (crossW - crossT) / 2}
        y={s * 0.16}
        width={crossT}
        height={s * 0.68}
        fill="#fff"
      />
      <rect x={s * 0.16} y={cy} width={s * 0.68} height={crossT} fill="#fff" />
    </svg>
  );
}

export default function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-gray-50 text-gray-600"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm md:flex-row">
        {/* Копирайт */}
        <p className="flex items-center gap-2 text-center text-gray-500 md:text-left">
          <SwissFlagIcon />© {year} ABF. Все права защищены.
        </p>

        {/* Навигация: мобайл = иконки, десктоп = текст */}
        <nav aria-label="Footer" className="flex items-center gap-6">
          {/* Мобайл: иконки */}
          <div className="flex items-center justify-center gap-6 text-gray-600 md:hidden">
            <Link
              href="/legal/privacy"
              aria-label={t("links.privacy")}
              title={t("links.privacy")}
              className="hover:text-gray-900 transition-colors"
            >
              <Shield className="h-5 w-5" />
            </Link>
            <Link
              href="/legal/terms"
              aria-label={t("links.terms")}
              title={t("links.terms")}
              className="hover:text-gray-900 transition-colors"
            >
              <FileText className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              aria-label={t("links.contact")}
              title={t("links.contact")}
              className="hover:text-gray-900 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          {/* Десктоп: текстовые ссылки */}
          <div className="hidden gap-4 text-gray-600 md:flex">
            <Link href="/legal/privacy" className="hover:underline">
              {t("links.privacy")}
            </Link>
            <Link href="/legal/terms" className="hover:underline">
              {t("links.terms")}
            </Link>
            <Link href="/contact" className="hover:underline">
              {t("links.contact")}
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
