"use client";

import clsx from "clsx";
import { iconMap, defaultIndustries, type Industry } from "@/config/industries";

export default function IndustriesCarousel({
  items = defaultIndustries,
  className,
  title = "Industries we work with",
  subtitle = "We cooperate with regulated partners across key verticals.",
  speed = 36,
}: {
  items?: Industry[];
  className?: string;
  title?: string;
  subtitle?: string;
  speed?: number;
}) {
  const track = [...items, ...items];

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  return (
    <section className={clsx("w-full overflow-x-hidden", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>

        <div className="relative overflow-hidden" style={maskStyle}>
          <div
            className="abf-track flex w-max gap-4 will-change-transform"
            style={{ animation: `abf-scroll ${speed}s linear infinite` }}
          >
            {track.map((it, i) => {
              const Icon = it.icon ? iconMap[it.icon] : iconMap.Landmark;
              const isClone = i >= items.length;
              return (
                <div
                  key={`${it.id}-${i}`}
                  className="shrink-0"
                  style={{ width: "clamp(260px, 45vw, 380px)" }}
                  aria-hidden={isClone ? true : undefined}
                >
                  <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat,#e5e7eb)] via-[var(--color-crypto,#e5e7eb)] to-[var(--color-gold,#e5e7eb)]">
                    <div className="h-full rounded-2xl bg-white/90 backdrop-blur p-4 sm:p-5 border border-slate-200/70">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/90 text-white">
                            <Icon className="h-4 w-4" />
                          </span>
                          <h3 className="text-base font-semibold">{it.title}</h3>
                        </div>
                        {it.tag && (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                            {it.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-700">{it.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
            @keyframes abf-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .abf-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .abf-track { animation: none !important; } }
          `}</style>
        </div>
      </div>
    </section>
  );
}
