'use client';

import QRCode from 'react-qr-code';

type Props = { url?: string };

export default function QrSimple({ url }: Props) {
  // URL из .env
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();

  // Итоговый адрес QR — на /open
  const qrTarget = url
    ? url
    : baseUrl
    ? `${baseUrl}/open`
    : 'https://abf-blfh.vercel.app/open';

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
          hover:scale-105 transition-transform
        "
      >
        <QRCode
          value={qrTarget}
          level="M"
          style={{ width: '100%', height: '100%' }}
          bgColor="#ffffff"
          fgColor="#111827"
        />
      </div>

      <p className="mt-1 text-[11px] sm:text-[8px] font-medium text-slate-700">
        Open on mobile
      </p>
    </div>
  );
}
