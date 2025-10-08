"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-gray-50 text-gray-600"
    >
      <div className="mx-auto flex flex-col md:flex-row w-full max-w-6xl items-center justify-between px-4 py-6 text-sm gap-3">
        <p className="text-center md:text-left">{t("copyright", { year })}</p>

        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/legal/privacy" className="hover:underline">
            {t("links.privacy")}
          </Link>
          <Link href="/legal/terms" className="hover:underline">
            {t("links.terms")}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t("links.contact")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
