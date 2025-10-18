"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { useRouter } from "@/i18n/navigation";
import { LANGUAGES, Locale } from "@/config/languages";

export default function LanguagePage() {
  const t = useTranslations("language");
  const router = useRouter();
  const locale = useLocale() as Locale;

  const supported = useMemo(() => new Set<Locale>(routing.locales), []);

  const go = (code: Locale) => {
    // Всегда ведём на главную с выбранной локалью — даже если код совпадает с текущим
    router.push("/", { locale: code });
  };

  return (
    <main
      className="
        min-h-[100dvh]
        px-4 py-10
        text-gray-900
        bg-[radial-gradient(1200px_700px_at_20%_-10%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(1200px_700px_at_80%_-20%,rgba(59,130,246,0.12),transparent_60%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]
      "
    >
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-sm text-gray-600">{t("subtitle")}</p>
        </div>

        <div
          className="
            rounded-2xl border border-black/10
            bg-white/80 backdrop-blur-xl
            shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_18px_50px_-20px_rgba(16,185,129,0.15)]
            overflow-hidden
          "
        >
          <ul className="divide-y divide-black/5">
            {LANGUAGES.filter((l) => supported.has(l.code)).map((lang) => {
              const isActive = lang.code === locale;

              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => go(lang.code)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "w-full px-4 py-3 flex items-center gap-3 text-left transition",
                      isActive
                        ? "bg-emerald-50"
                        : "hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40",
                    ].join(" ")}
                  >
                    <span className="text-2xl leading-none select-none">{lang.flag}</span>

                    <div className="flex-1">
                      <div className="font-medium">{lang.label}</div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-500">
                        {lang.code}
                      </div>
                    </div>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300/50">
                        <Check className="h-3.5 w-3.5" />
                        {t("current")}
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-700/90">{t("select")}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
