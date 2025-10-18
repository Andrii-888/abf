// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false, // выключаем автоопределение из cookie/браузера
});

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Принудительно ведём с / → /en
  if (pathname === "/") {
    const url = new URL("/en", origin);
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", "en", { path: "/" });
    return res;
  }

  // Всё остальное — через next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/", "/(en|it|de|fr|ru|zh)/:path*"],
};
