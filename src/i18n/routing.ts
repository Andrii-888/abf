import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "it", "de", "fr", "ru", "zh"],
  defaultLocale: "en",
  // localePrefix: "always", // если нужно префиксировать и defaultLocale
});

// Экспорт локализованных навигационных хелперов
export const { Link, redirect, useRouter, usePathname } =
  createNavigation(routing);
