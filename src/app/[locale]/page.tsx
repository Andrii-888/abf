// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";
import { languagesAlternates, ogLocale, normalizeLocale } from "@/seo/helpers";
import { getHomeMeta } from "@/seo/meta";

// Next 15: params — асинхронные
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const meta = getHomeMeta(loc);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${loc}`,
      languages: languagesAlternates(""),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${loc}`,
      locale: ogLocale(loc),
      siteName: "Alpine Bridge Finance",
      type: "website",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og.png"],
    },
  };
}

export default function HomePage() {
  return (
    <main className="relative min-h-[85vh] flex items-center bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(26,188,156,0.12)_45%,rgba(212,175,55,0.18)_100%),linear-gradient(#ffffff,#ffffff)] pt-14 md:pt-14 pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <HeroLeft />
        <HeroRight />
      </div>
    </main>
  );
}
