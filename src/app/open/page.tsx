"use client";

import { useEffect } from "react";

const TARGET_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://abf-blfh.vercel.app";

export default function OpenApp() {
  useEffect(() => {
    // мгновенный редирект на основной сайт
    window.location.replace(TARGET_URL);
  }, []);

  // фолбэк, если JS тормозит/выключен
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Opening…</h1>
      <a className="rounded-xl px-4 py-2 shadow border" href={TARGET_URL}>
        Go to site
      </a>
    </main>
  );
}
