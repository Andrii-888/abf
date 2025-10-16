"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Shield, FileText, Mail } from "lucide-react";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  // fallback для отсутствующих переводов
  const copyright =
    t?.("copyright", { year }) ||
    `© ${year} Alpine Bridge Finance. All rights reserved.`;

  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-gray-50 text-gray-600"
    >
      <div className="mx-auto flex flex-col md:flex-row w-full max-w-6xl items-center justify-between px-4 py-6 text-sm gap-4">
        {/* Copyright */}
        <p className="text-center md:text-left text-gray-500">{copyright}</p>

        {/* Навигация — адаптивная */}
        <nav aria-label="Footer" className="flex items-center gap-6">
          {/* --- Мобильная версия: иконки --- */}
          <div className="flex md:hidden items-center justify-center gap-6 text-gray-600">
            <Link
              href="/legal/privacy"
              aria-label={t("links.privacy")}
              title={t("links.privacy")}
              className="hover:text-gray-900 transition-colors"
            >
              <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            <Link
              href="/legal/terms"
              aria-label={t("links.terms")}
              title={t("links.terms")}
              className="hover:text-gray-900 transition-colors"
            >
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>

            <Link
              href="/contact"
              aria-label={t("links.contact")}
              title={t("links.contact")}
              className="hover:text-gray-900 transition-colors"
            >
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </Link>
          </div>

          {/* --- Десктопная версия: текстовые ссылки --- */}
          <div className="hidden md:flex gap-4 text-gray-600">
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
