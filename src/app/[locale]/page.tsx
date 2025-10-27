// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";
import IndustriesCarousel from "@/components/home/IndustriesCarousel.client";
import { languagesAlternates, ogLocale, normalizeLocale } from "@/seo/helpers";
import { getHomeMeta } from "@/seo/meta";

// ⬇️ минимально: читаем JSON индустрий и нормализуем
import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeIndustries } from "@/config/industries";

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

async function readIfExists(p: string) {
  try {
    return await fs.readFile(p, "utf-8");
  } catch {
    return null;
  }
}

// Загружаем блок industries из messages/<locale>/home.json (с fallback на en)
async function loadIndustriesDict(locale: string) {
  const root = process.cwd();
  const candidates = [
    path.join(root, "messages", locale, "home.json"),
    path.join(root, "src", "messages", locale, "home.json"),
    path.join(root, "messages", "en", "home.json"),
    path.join(root, "src", "messages", "en", "home.json"),
  ];
  for (const p of candidates) {
    const raw = await readIfExists(p);
    if (raw) {
      const parsed = JSON.parse(raw);
      const block = parsed?.industries ?? {};
      return {
        title: String(block?.title ?? "Industries we work with"),
        subtitle: String(
          block?.subtitle ?? "We cooperate with regulated partners across key verticals.",
        ),
        items: normalizeIndustries(block?.items ?? []),
      };
    }
  }
  return {
    title: "Industries we work with",
    subtitle: "We cooperate with regulated partners across key verticals.",
    items: normalizeIndustries([]),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const industries = await loadIndustriesDict(loc);

  return (
    <main className="relative min-h-[85vh] flex flex-col overflow-x-hidden items-center bg-gradient-page pt-14 md:pt-14 pb-16 md:pb-20">
      {/* Hero section */}
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <HeroLeft />
        <HeroRight />
      </div>

      {/* Industries Carousel section */}
      <div className="mt-14 w-full">
        <IndustriesCarousel
          speed={38}
          title={industries.title}
          subtitle={industries.subtitle}
          items={industries.items}
        />
      </div>
    </main>
  );
}
