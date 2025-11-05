"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = { durationMs?: number };

export default function SplashScreen({ durationMs = 3500 }: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHidden(true), durationMs);
    return () => clearTimeout(id);
  }, [durationMs]);

  return (
    <div
      aria-hidden={hidden}
      className={[
        "splash-root", // ✅ класс для prefers-reduced-motion (описан в globals.css)
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-white",
        "bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(212,175,55,0.08)_0%,transparent_60%),radial-gradient(900px_500px_at_80%_120%,rgba(192,57,43,0.06)_0%,transparent_60%)]",
        "transition-opacity duration-700",
        hidden ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center select-none">
        <Image
          src="/logo.png"
          alt="Alpine Bridge Finance"
          width={128}
          height={128}
          priority
          className="drop-shadow-sm"
        />
        <h1 className="brand-gradient-title">Alpine Bridge Finance</h1>
      </div>
    </div>
  );
}
