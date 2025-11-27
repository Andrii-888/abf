// src/app/[locale]/page.tsx
import type { Metadata } from "next";
import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";
import IndustriesCarousel from "@/components/home/IndustriesCarousel.client";
import { normalizeLocale, buildPageMetadata } from "@/seo/helpers";
import { getHomeMeta } from "@/seo/meta";

// ⬇️ минимально: читаем JSON индустрий и нормализуем
import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeIndustries } from "@/config/industries";

// 🔹 новый блок-презентация для интернет-магазинов
import PresentationSection from "@/components/presentation-section";

// Next 15: params — асинхронные
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const meta = getHomeMeta(loc);

  // ✅ canonical + hreflang (с доменом), OG/Twitter, robots — через helper
  return buildPageMetadata(meta, loc, "/");
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
    if (!raw) continue;

    // защищаемся от потенциально битого JSON
    try {
      const parsed = JSON.parse(raw);
      const block = parsed?.industries ?? {};
      return {
        title: String(block?.title ?? "Industries we work with"),
        items: normalizeIndustries(block?.items ?? []),
      };
    } catch {
      // если JSON битый — пробуем следующий кандидат
      continue;
    }
  }

  return {
    title: "Industries we work with",
    items: normalizeIndustries([]),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = normalizeLocale(locale);
  const industries = await loadIndustriesDict(loc);

  return (
    <main className="relative flex min-h-[85vh] flex-col items-center overflow-x-hidden bg-page-light pt-6 pb-16 md:pt-14 md:pb-20">
      {/* Hero section */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
        <HeroLeft />
        <HeroRight />
      </div>

      {/* Industries Carousel section */}
      <div className="mt-4 w-full sm:mt-8">
        <IndustriesCarousel speed={38} title={industries.title} items={industries.items} />
      </div>

      {/* Presentation section — блок для владельцев интернет-магазинов */}
      <div className="mt-10 w-full">
        <PresentationSection />
      </div>
    </main>
  );
}
