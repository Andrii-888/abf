// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Поддерживаемые локали
const locales = ["en", "it", "ru", "de", "fr", "zh"] as const;
type Locale = (typeof locales)[number];
const LOCALES_SET = new Set<Locale>(locales as unknown as Locale[]);
const DEFAULT_LOCALE: Locale = "en";

// Базовая мидлварь next-intl (без авто-детекции)
const intlMiddleware = createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
});

// Быстрый фильтр путей, которые мидлварь не должна трогать
function shouldBypass(pathname: string) {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/_next")) return true;
  // favicon/robots/sitemap и любые статические файлы с расширением
  if (pathname === "/favicon.ico" || pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return true;
  }
  if (/\/.*\.[^/]+$/.test(pathname)) return true;
  return false;
}

// Разбираем префикс локали, возвращаем оставшийся путь С ведущим слешом
function extractLocalePrefix(pathname: string): { locale?: Locale; rest: string } {
  for (const l of locales) {
    if (pathname === `/${l}`) return { locale: l, rest: "/" };
    if (pathname.startsWith(`/${l}/`)) {
      const rest = pathname.slice(l.length + 1); // отрезаем "/<l>"
      return { locale: l, rest: rest.startsWith("/") ? rest : `/${rest}` };
    }
  }
  return { rest: pathname || "/" };
}

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const url = nextUrl.clone();
  const { pathname } = url;

  // 1) Пропускаем сервисные/статические пути
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  // 2) Ручное переключение локали через ?lang=
  const qpLang = url.searchParams.get("lang") as Locale | null;
  if (qpLang && LOCALES_SET.has(qpLang)) {
    const { locale: currentLocale, rest } = extractLocalePrefix(pathname);

    // Целевой путь (всегда с ведущим слешом), без параметра lang
    const cleanSearch = new URLSearchParams(url.searchParams);
    cleanSearch.delete("lang");

    const targetPath = currentLocale ? `/${qpLang}${rest}` : `/${qpLang}${pathname}`;
    url.pathname = targetPath.replace(/\/{2,}/g, "/");
    url.search = cleanSearch.toString() ? `?${cleanSearch.toString()}` : "";

    if (url.toString() !== nextUrl.toString()) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 3) Стандартная локализация next-intl для страниц
  return intlMiddleware(req);
}

// 🔒 Ограничиваем область срабатывания мидлвари:
// — только корень ("/"), чтобы проставить defaultLocale
// — и страницы с префиксами локалей ("/en/...","/ru/...", и т.д.)
// Никаких негативных lookahead’ов — меньше работы на Edge.
export const config = {
  matcher: ["/", "/(en|it|ru|de|fr|zh)/:path*"],
};
