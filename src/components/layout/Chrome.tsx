"use client";

import { usePathname } from "@/i18n/navigation";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

/**
 * Обёртка хрома приложения.
 * Скрывает Header/Footer на /language (локалепрефикс уже убран next-intl usePathname)
 * и показывает на всех остальных страницах.
 */
export default function Chrome({ children }: { children: React.ReactNode }) {
  // next-intl возвращает pathname БЕЗ префикса локали (на /en/language -> "/language")
  const pathname = usePathname() || "/";

  const segments = pathname.split("/").filter(Boolean); // ['language'] | ['services'] | []
  const isLanguagePage = segments[0] === "language"; // ключевое отличие

  if (isLanguagePage) {
    // Никакого Header/Footer и без отступа
    return <>{children}</>;
  }

  // Обычный режим с хедером/футером
  return (
    <>
      <SiteHeader />
      <main className="pt-[56px] md:pt-[64px]">{children}</main>
      <SiteFooter />
    </>
  );
}
