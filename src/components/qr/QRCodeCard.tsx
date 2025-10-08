"use client";

import QRCode from "react-qr-code";

type Props = { url?: string };

export default function QrSimple({ url }: Props) {
  // Домен из .env (NEXT_PUBLIC_SITE_URL), без лишних пробелов
  const envUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();

  const isBrowser = typeof window !== "undefined";
  const isLocalhost =
    isBrowser &&
    /^(localhost|127\.0\.0\.1|::1)$/.test(window.location.hostname);

  // Приоритет: prop url > .env > window.origin (если не localhost)
  const value =
    url ||
    (envUrl ? envUrl : isBrowser && !isLocalhost ? window.location.origin : "");

  return (
    <div
      className="flex flex-col items-center order-1 lg:order-first mt-3 lg:mt-0 cursor-default"
      aria-label="QR code"
    >
      <div
        className="
          w-[62px] h-[62px]
          sm:w-[60px] sm:h-[60px]
          lg:w-[64px] lg:h-[64px]
          bg-white p-2 rounded-lg shadow-sm
        "
      >
        <QRCode
          value={value || "https://example.com"}
          level="M"
          style={{ width: "100%", height: "100%" }}
          bgColor="#ffffff"
          fgColor="#111827"
        />
      </div>

      <p className="mt-1 text-[11px] sm:text-[8px] font-medium text-slate-700">
        Install the App
      </p>
    </div>
  );
}
