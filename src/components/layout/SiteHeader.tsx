"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Globe, TextAlignJustify, X } from "lucide-react";
import { NAV_LINKS } from "@/config/nav";
import { Link, usePathname } from "@/i18n/navigation";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  const hrefToKey: Record<string, string> = {
    "/": "home",
    "/services": "services",
    "/process": "process",
    "/compliance": "compliance",
    "/partners": "partners",
    "/contact": "contact",
  };

  // 👇 безопасный перевод: если ключа нет — не бросаем ошибку
  const safeT = (key?: string) => {
    if (!key) return "";
    try {
      return t(key);
    } catch {
      return "";
    }
  };

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

  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname, open]);

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full h-14 md:h-16 border-b border-black/5 
                   bg-[linear-gradient(90deg,#f5f5f7cc,#f3f6ffcc,#f5f5f7cc)] backdrop-blur-md"
      >
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-4">
          <Link
            href="/"
            aria-label="AlpineBridgeFinance — Home"
            className={`${
              open ? "hidden" : "flex"
            } md:flex items-center space-x-2`}
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

          {/* Desktop menu */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm text-gray-700 md:flex">
            {NAV_LINKS.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="hover:text-gray-900 transition-colors"
              >
                {safeT(hrefToKey[i.href]) || i.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 pr-3 sm:pr-4">
            <Link
              href="/language"
              aria-label="Select language"
              className="inline-flex items-center justify-center rounded-md hover:bg-black/5 focus:outline-none h-9 w-9 sm:h-10 sm:w-10"
            >
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
            </Link>

            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex md:hidden items-center justify-center p-2 text-gray-900 hover:opacity-70 focus:outline-none"
            >
              <TextAlignJustify className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f6f7fb_100%)] backdrop-blur-sm" />

        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-3 z-20 inline-flex items-center justify-center p-2 text-gray-900 hover:opacity-70 focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>

        <nav
          className={`relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 text-2xl font-medium text-gray-800 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          } md:text-3xl`}
        >
          {NAV_LINKS.map((i, idx) => (
            <Link
              key={i.href}
              href={i.href}
              onClick={() => setOpen(false)}
              className="hover:text-gray-600 transition-colors"
              style={{ transitionDelay: open ? `${idx * 40}ms` : "0ms" }}
            >
              {safeT(hrefToKey[i.href]) || i.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
