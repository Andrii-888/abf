"use client";

import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  title: string;
  text: string;
  color?: string;
};

export default function FeatureCard({ Icon, title, text, color }: Props) {
  return (
    <section
      className="
        rounded-2xl
        bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]
        p-[1px] shadow-md
      "
    >
      <div
        className="
          rounded-2xl bg-white/85 backdrop-blur
          px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6
          flex flex-col justify-start h-auto
        "
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-6 w-6 ${color}`} />
          <h3 className="text-sm sm:text-base font-semibold">{title}</h3>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-snug">
          {text}
        </p>
      </div>
    </section>
  );
}
