// src/config/languages.ts
import { routing } from "@/i18n/routing";

// Берём тип локали прямо из списка доступных локалей
export type Locale = (typeof routing.locales)[number];

export type LangItem = {
  code: Locale;
  label: string;
  flag: string;
};

/**
 * Единый источник правды для страницы выбора языка и, при желании,
 * для селекторов в Header/Footer.
 */
export const LANGUAGES: LangItem[] = [
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
] as const;
