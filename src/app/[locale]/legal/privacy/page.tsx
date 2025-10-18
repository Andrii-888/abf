import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getPrivacyMeta } from "@/seo/meta";
import { languagesAlternates, ogLocale, normalizeLocale } from "@/seo/helpers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const meta = getPrivacyMeta(loc);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { languages: languagesAlternates("/legal/privacy") },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: ogLocale(loc),
      type: "article",
    },
  };
}

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
