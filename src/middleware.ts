// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Локали проекта
const locales = ["en", "it", "ru", "de", "fr", "zh"] as const;
type Locale = (typeof locales)[number];
const DEFAULT_LOCALE: Locale = "en";

// Базовая мидлварь next-intl (всегда EN по умолчанию, без авто-детекции)
const intlMiddleware = createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
});

// Хелпер: есть ли префикс локали в пути
function extractLocalePrefix(pathname: string): { locale?: Locale; rest: string } {
  for (const l of locales) {
    if (pathname === `/${l}`) return { locale: l, rest: "/" };
    if (pathname.startsWith(`/${l}/`)) return { locale: l, rest: pathname.slice(1 + l.length) };
  }
  return { rest: pathname };
}

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const url = nextUrl.clone();

  // Пропускаем сервисные и статические пути (совпадает с matcher, но быстрый выход полезен)
  const pathname = url.pathname;
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    /\/.*\.[^/]+$/.test(pathname) // любой путь с точкой (файлы)
  ) {
    return NextResponse.next();
  }

  // Поддержка ручного переключения: ?lang=de|fr|it|ru|zh|en
  const qpLang = url.searchParams.get("lang") as Locale | null;
  if (qpLang && (locales as readonly string[]).includes(qpLang)) {
    const { locale: currentLocale, rest } = extractLocalePrefix(pathname);

    // Если уже на нужной локали И параметр lang единственное отличие — просто убираем его
    if (currentLocale === qpLang) {
      url.searchParams.delete("lang");
      return NextResponse.redirect(url);
    }

    // Строим новый путь с желаемой локалью, удаляя lang из query
    const cleanSearch = new URLSearchParams(url.searchParams);
    cleanSearch.delete("lang");

    url.pathname = `/${qpLang}${currentLocale ? rest : pathname}`.replace(/\/{2,}/g, "/");
    url.search = cleanSearch.toString() ? `?${cleanSearch.toString()}` : "";

    return NextResponse.redirect(url);
  }

  // Иначе — стандартная логика next-intl (defaultLocale=en, без авто-детекции)
  return intlMiddleware(req);
}

// Сужаем область действия мидлвари и исключаем всё "тяжёлое"
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
