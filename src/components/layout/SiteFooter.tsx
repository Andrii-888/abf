"use client";

import { useTranslations, useMessages } from "next-intl";
import { Shield, FileText, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";

/** SVG-флаг Швейцарии */
function SwissFlagIcon({ size = 18 }: { size?: number }) {
  const s = size;
  const crossW = s * 0.56;
  const crossT = s * 0.18;
  const cx = s / 2 - crossW / 2;
  const cy = s / 2 - crossT / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} aria-hidden="true" className="shrink-0">
      <rect width={s} height={s} rx={Math.max(2, s * 0.08)} fill="#D52B1E" />
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

type FooterMsgs = {
  copyright?: string;
  links?: {
    privacy?: string;
    terms?: string;
    contact?: string;
  };
};

export default function SiteFooter() {
  // 👇 хуки вызываем всегда, без условий/внутренних функций
  const t = useTranslations("footer");
  const messages = (useMessages() ?? {}) as Record<string, unknown>;
  const footerMsgs = (messages["footer"] ?? undefined) as FooterMsgs | undefined;

  const year = String(new Date().getFullYear());

  // 🔒 безопасный копирайт
  let copyright = `© ${year} ABF. All rights reserved.`;
  if (footerMsgs?.copyright) {
    const raw = footerMsgs.copyright;
    copyright = raw.includes("{year}") ? raw.replace("{year}", year) : raw;
  } else {
    try {
      copyright = t("copyright", { year });
    } catch {
      // остаётся дефолт на EN
    }
  }

  // 🔒 безопасные подписи ссылок
  let labels = {
    privacy: footerMsgs?.links?.privacy ?? "Privacy Policy",
    terms: footerMsgs?.links?.terms ?? "Terms of Use",
    contact: footerMsgs?.links?.contact ?? "Contact",
  };
  try {
    labels = {
      privacy: t("links.privacy"),
      terms: t("links.terms"),
      contact: t("links.contact"),
    };
  } catch {
    // оставляем из footerMsgs/дефолты
  }

  return (
    <footer role="contentinfo" className="border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm md:flex-row">
        {/* Копирайт */}
        <p className="flex items-center gap-2 text-center text-gray-500 md:text-left">
          <SwissFlagIcon />
          {copyright}
        </p>

        {/* Навигация: мобайл = иконки, десктоп = текст */}
        <nav className="flex items-center gap-6">
          {/* Мобайл: иконки */}
          <div className="flex items-center justify-center gap-6 text-gray-600 md:hidden">
            <Link href="/legal/privacy" aria-label={labels.privacy} title={labels.privacy}>
              <Shield className="h-5 w-5" />
            </Link>
            <Link href="/legal/terms" aria-label={labels.terms} title={labels.terms}>
              <FileText className="h-5 w-5" />
            </Link>
            <Link href="/contact" aria-label={labels.contact} title={labels.contact}>
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          {/* Десктоп: текстовые ссылки */}
          <div className="hidden gap-4 text-gray-600 md:flex">
            <Link href="/legal/privacy" className="hover:underline">
              {labels.privacy}
            </Link>
            <Link href="/legal/terms" className="hover:underline">
              {labels.terms}
            </Link>
            <Link href="/contact" className="hover:underline">
              {labels.contact}
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
