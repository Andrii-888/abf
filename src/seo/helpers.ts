// src/seo/helpers.ts
import type { Metadata } from "next";

// --- БАЗА (как у тебя было) ---
export const LOCALES = ["en", "de", "fr", "it", "ru", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

/** Приводим locale к базовой: "en-US" → "en" */
export function normalizeLocale(locale?: string): Locale {
  const base = (locale ?? "").split("-")[0] as Locale;
  return (LOCALES.includes(base) ? base : "en") as Locale;
}

export function ogLocale(locale: Locale): string {
  switch (locale) {
    case "de":
      return "de_CH";
    case "fr":
      return "fr_CH";
    case "it":
      return "it_CH";
    case "ru":
      return "ru_RU";
    case "zh":
      return "zh_CN";
    default:
      return "en_US";
  }
}

/** Относительные hreflang (если нужно внутри сайта) */
export function languagesAlternates(pathSuffix = ""): Record<Locale | "x-default", string> {
  const suffix = pathSuffix === "" ? "" : `/${pathSuffix.replace(/^\/+/, "")}`;
  const map = {} as Record<Locale | "x-default", string>;
  for (const l of LOCALES) map[l] = `/${l}${suffix}`;
  map["x-default"] = `/en${suffix}`;
  return map;
}

export const DOMAIN = "https://www.alpinebf.com";

/** Абсолютный URL для страницы с доменом */
export function pageUrl(locale: Locale, path: string = "/"): string {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${DOMAIN}/${locale}${cleaned === "/" ? "" : cleaned}`;
}

/** hreflang-карты в абсолютных URL — лучше для поисковиков */
export function hreflangMap(path: string = "/"): Record<Locale | "x-default", string> {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  const map = {} as Record<Locale | "x-default", string>;
  for (const l of LOCALES) map[l] = `${DOMAIN}/${l}${cleaned === "/" ? "" : cleaned}`;
  map["x-default"] = `${DOMAIN}/en${cleaned === "/" ? "" : cleaned}`;
  return map;
}

/** Сборщик Metadata из {title, description} */
export function buildPageMetadata(
  meta: { title: string; description: string },
  locale: Locale,
  path: string = "/",
  opts?: {
    ogImage?: string;
    noindex?: boolean;
    keywords?: string[];
  },
): Metadata {
  const url = pageUrl(locale, path);
  const ogImage = opts?.ogImage ?? "/og.png";
  const noindex = opts?.noindex ?? false;

  return {
    metadataBase: new URL(DOMAIN),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: hreflangMap(path),
    },
    openGraph: {
      type: "website",
      url,
      title: meta.title,
      description: meta.description,
      siteName: "Alpine Bridge Finance",
      images: [{ url: ogImage }],
      locale: ogLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
    keywords: opts?.keywords ?? [
      "crypto exchange",
      "cambio cripto",
      "échange crypto",
      "крипто обмен",
      "Lugano",
      "Switzerland",
      "CHF",
      "EUR",
      "USD",
      "USDT",
      "BTC",
      "ETH",
    ],
  };
}
