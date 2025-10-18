// src/seo/helpers.ts
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

/** Сформировать hreflang-альтернативы для конкретного под-пути */
export function languagesAlternates(pathSuffix = ""): Record<Locale | "x-default", string> {
  const suffix = pathSuffix === "" ? "" : `/${pathSuffix.replace(/^\/+/, "")}`;

  const map = {} as Record<Locale | "x-default", string>;
  for (const l of LOCALES) {
    map[l] = `/${l}${suffix}`;
  }
  map["x-default"] = `/en${suffix}`;
  return map;
}
