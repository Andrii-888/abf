"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ClientRedirectOnReload({
  homePath,
  disableLocaleGuard = false,
  excludePrefixes = [],
}: {
  homePath: string;
  disableLocaleGuard?: boolean;
  excludePrefixes?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const ranOnce = useRef(false); // не даём эффекту запускаться повторно

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    if (typeof window === "undefined") return;

    // ❌ исключаем некоторые страницы (напр. /[locale]/language)
    const isExcluded = excludePrefixes.some((p) => {
      const norm = p.endsWith("/") ? p.slice(0, -1) : p;
      return pathname === norm || pathname.startsWith(norm + "/");
    });
    if (isExcluded) return;

    // 🛡️ если guard включён — не трогаем локализованные пути
    if (!disableLocaleGuard) {
      const isLocalized = /^\/(en|it|de|fr|ru|zh)(\/|$)/.test(pathname);
      if (isLocalized) return;
    }

    // Реальный reload?
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const wasReload = nav?.type === "reload";

    const alreadyHome = pathname === homePath || pathname === `${homePath}/`;

    if (wasReload && !alreadyHome) {
      router.push(homePath);
    }
    // ВАЖНО: без pathname/router в зависимостях — эффект не перезапускается при навигации
  }, [homePath, disableLocaleGuard, excludePrefixes]);

  return null;
}
