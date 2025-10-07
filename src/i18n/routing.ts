import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it", "de", "fr", "ru", "zh"],
  defaultLocale: "en",
});
