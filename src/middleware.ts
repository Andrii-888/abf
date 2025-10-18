// src/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // перечисли только реально используемые локали
  locales: ["en", "it", "ru", "de", "fr", "zh"],
  defaultLocale: "en",
  localeDetection: true,
});

// Сужаем область действия мидлвари и исключаем всё "тяжёлое"
// - не трогаем api, _next, статические файлы и любые пути с точкой (assets)
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
