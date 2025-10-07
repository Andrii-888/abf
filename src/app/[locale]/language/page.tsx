"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguagePage() {
  const t = useTranslations("language");
  const pathname = usePathname(); // например: /en/services или /ru

  const parts = pathname.split("/").filter(Boolean); // ['en','services'] | ['ru']
  const currentLocale = parts[0] ?? routing.defaultLocale;
  const rest = parts.slice(1).join("/"); // "services" | ""

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="text-gray-600">{t("subtitle")}</p>

      <ul className="grid gap-3 sm:grid-cols-2">
        {routing.locales.map((l) => {
          const href = `/${l}${rest ? `/${rest}` : ""}`;
          const isCurrent = l === currentLocale;
          return (
            <li key={l}>
              <Link
                href={href}
                aria-current={isCurrent ? "true" : undefined}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-black/5 ${
                  isCurrent ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <span>{t(`list.${l}`)}</span>
                {isCurrent && (
                  <span className="text-xs text-gray-500">{t("current")}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
