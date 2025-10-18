"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Globe, TextAlignJustify, X } from "lucide-react";
import { NAV_LINKS } from "@/config/nav";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/routing";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  const hrefToKey: Record<string, string> = {
    "/": "home",
    "/services": "services",
    "/process": "process",
    "/partners": "partners",
    "/contact": "contact",
  };

  // Безопасный перевод
  const safeT = (key?: string) => {
    if (!key) return "";
    try {
      return t(key);
    } catch {
      return "";
    }
  };

  // Блокируем скролл при открытом меню + ESC закрывает
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = open ? "hidden" : prev || "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Закрываем меню при смене маршрута
  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header
        className="fixed top-0 left-0 z-[200] w-full h-14 md:h-16 border-b border-black/5 
                   bg-[linear-gradient(90deg,#f5f5f7cc,#f3f6ffcc,#f5f5f7cc)] backdrop-blur-md"
      >
        <div
          className="
            relative mx-auto flex h-full max-w-6xl items-center
            justify-between
            px-4 sm:px-6 md:px-8 lg:px-10
          "
        >
          {/* Логотип */}
          <Link
            href="/"
            aria-label="AlpineBridgeFinance — Home"
            className={`${open ? "hidden" : "flex"} md:flex items-center space-x-2`}
          >
            <Image
              src="/logo.png"
              alt="AlpineBridgeFinance"
              width={220}
              height={77}
              priority
              sizes="(min-width:1024px) 120px, (min-width:768px) 160px, (min-width:640px) 150px, 140px"
              className="h-12 sm:h-14 md:h-14 lg:h-10 w-auto"
            />
          </Link>

          {/* Меню (desktop) */}
          <nav className="pointer-events-none md:pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm text-gray-700 md:flex">
            {NAV_LINKS.map((i) => (
              <Link key={i.href} href={i.href} className="hover:text-gray-900 transition-colors">
                {safeT(hrefToKey[i.href]) || i.label}
              </Link>
            ))}
          </nav>

          {/* Правый блок */}
          <div className="flex items-center gap-2 relative z-[220] shrink-0">
            <Link
              href="/language"
              aria-label="Select language"
              className="inline-flex items-center justify-center rounded-md hover:bg-black/5 focus:outline-none h-9 w-9 sm:h-10 sm:w-10"
            >
              <Globe className="h-5 w-5 sm:h-5 sm:w-5 text-gray-800" />
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex md:hidden items-center justify-center p-2 text-gray-900 hover:opacity-80 focus:outline-none z-[300]"
            >
              <TextAlignJustify className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {open && (
        <div
          className="fixed inset-0 z-[260] md:hidden opacity-100 pointer-events-auto transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Фон */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f6f7fb_100%)] backdrop-blur-sm" />

          {/* Кнопка закрытия */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-4 z-[270] inline-flex items-center justify-center p-2 text-gray-900 hover:opacity-80 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Ссылки */}
          <nav className="relative z-[265] mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 text-2xl font-medium text-gray-800 md:text-3xl">
            {NAV_LINKS.map((i, idx) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-600 transition-colors"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                {safeT(hrefToKey[i.href]) || i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
