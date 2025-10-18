import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTermsMeta } from "@/seo/meta";
import { languagesAlternates, ogLocale, normalizeLocale } from "@/seo/helpers";

// Next 15: params — асинхронные
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = normalizeLocale(locale); // ← приводим к типу Locale
  const meta = getTermsMeta(loc); // ← берём тексты

  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: languagesAlternates("/legal/terms") },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: ogLocale(loc), // ← теперь тип OK
      type: "article",
    },
  };
}

export default function TermsPage() {
  const t = useTranslations("terms");

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
