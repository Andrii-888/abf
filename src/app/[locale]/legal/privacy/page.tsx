"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-gray-800 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8">{t("title")}</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed text-base md:text-lg">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>
    </section>
  );
}
