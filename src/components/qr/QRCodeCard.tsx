"use client";

import QRCode from "react-qr-code";

type Props = { url?: string };

export default function QrSimple({ url }: Props) {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  const qrTarget =
    url || (baseUrl ? `${baseUrl}/open` : "https://abf-blfh.vercel.app/open");

  return (
    <div
      className="flex flex-col items-center order-1 lg:order-first mt-3 lg:mt-0 cursor-default"
      aria-label="QR code"
    >
      <div
        className="
          w-[95px] h-[95px]           /* увеличено для настольных экранов */
          sm:w-[75px] sm:h-[75px]     /* мобильный — чуть меньше */
          bg-white p-2 rounded-xl shadow-md border border-gray-100
          hover:scale-105 transition-transform duration-300
        "
      >
        <QRCode
          value={qrTarget}
          level="M"
          style={{ width: "100%", height: "100%" }}
          bgColor="#ffffff"
          fgColor="#111827"
        />
      </div>

      <p className="mt-2 text-[10px] sm:text-[9px] font-medium text-slate-600">
        Open on mobile
      </p>
    </div>
  );
}
