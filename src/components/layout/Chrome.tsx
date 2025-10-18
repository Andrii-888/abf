"use client";

import { usePathname } from "@/i18n/routing";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

/**
 * Обёртка хрома приложения.
 * На /language и /{locale}/language скрывает Header/Footer. На остальных — sticky footer.
 */
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  // пример: "/en/language" -> ["en","language"], "/language" -> ["language"]
  const isLanguagePage = segments[0] === "language" || segments[1] === "language";

  if (isLanguagePage) {
    // Без хедера/футера (например, селектор языка)
    return <>{children}</>;
  }

  // Sticky footer + отступ под фиксированный хедер (h-14 / md:h-16)
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-14 md:pt-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
