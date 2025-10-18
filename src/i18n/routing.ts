// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "it", "de", "fr", "ru", "zh"],
  defaultLocale: "en",
  localePrefix: "always", // ← принудительно используем /en
});

export const { Link, redirect, useRouter, usePathname } = createNavigation(routing);
