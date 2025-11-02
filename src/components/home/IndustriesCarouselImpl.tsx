"use client";

import { useEffect, useMemo, useRef, useCallback, type CSSProperties } from "react";
import clsx from "clsx";
import { iconMap, defaultIndustries, type Industry } from "@/config/industries";

type Props = {
  items?: Industry[];
  className?: string;
  title?: string;
  speed?: number;
  pauseMs?: number;
};

export default function IndustriesCarouselImpl({
  items = defaultIndustries,
  className,
  title = "Industries we work with",
  speed = 36,
  pauseMs = 1200,
}: Props) {
  const track = useMemo(() => [...items, ...items], [items]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pauseTimerRef = useRef<number | null>(null);

  const maskStyle: CSSProperties = {
    WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  };

  const pauseTrack = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.animationPlayState = "paused";
    if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(
      () => {
        el.style.animationPlayState = "running";
        pauseTimerRef.current = null;
      },
      Math.max(200, pauseMs),
    );
  }, [pauseMs]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const onCardEnter = useCallback(() => {
    pauseTrack();
  }, [pauseTrack]);

  return (
    <section className={clsx("w-full overflow-x-hidden", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 -mt-4 sm:mt-0">
          <h2 className="text-xl font-semibold tracking-tight text-center sm:text-left sm:text-2xl">
            {title}
          </h2>
        </div>

        <div className="relative overflow-hidden" style={maskStyle}>
          <div
            ref={trackRef}
            className="abf-track flex w-max gap-4 will-change-transform items-stretch"
            style={{ animation: `abf-scroll ${speed}s linear infinite` }}
          >
            {track.map((it, i) => {
              const Icon = it.icon ? iconMap[it.icon] : iconMap.Landmark;
              const isClone = i >= items.length;

              // Контент карточки (без обёртки)
              const Card = (
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat,#e5e7eb)] via-[var(--color-crypto,#e5e7eb)] to-[var(--color-gold,#e5e7eb)]">
                  <div className="flex h-full min-h-[200px] flex-col rounded-2xl bg-white/90 backdrop-blur p-3 sm:p-4 border border-slate-200/70">
                    {/* Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900/90 text-white">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <h3 className="text-base font-semibold">{it.title}</h3>
                      </div>
                      {it.tag ? (
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                          {it.tag}
                        </span>
                      ) : (
                        <span className="invisible rounded-full border px-2 py-0.5 text-[11px]">
                          .
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <p className="text-sm text-slate-700 line-clamp-3">{it.desc}</p>

                    {/* Footer */}
                    <div className="mt-auto pt-3">
                      {it.href ? (
                        <span className="inline-flex items-center gap-1 text-sm underline decoration-slate-300 underline-offset-4 group-hover:decoration-slate-700">
                          Visit partner →
                        </span>
                      ) : (
                        <span className="invisible inline-block text-sm">Visit partner →</span>
                      )}
                    </div>
                  </div>
                </div>
              );

              return (
                <div
                  key={`${it.id}-${i}`}
                  className="shrink-0"
                  style={{ width: "clamp(260px, 45vw, 380px)" }}
                  aria-hidden={isClone ? true : undefined}
                >
                  {it.href ? (
                    <a
                      href={it.href}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      aria-label={`${it.title} — open partner website`}
                      onMouseEnter={onCardEnter}
                      onFocus={onCardEnter}
                      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-2xl"
                    >
                      {Card}
                    </a>
                  ) : (
                    <div
                      onMouseEnter={onCardEnter}
                      onFocus={onCardEnter}
                      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-2xl"
                    >
                      {Card}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <style>{`
            @keyframes abf-scroll { 
              from { transform: translateX(0); } 
              to { transform: translateX(-50%); } 
            }
            @media (prefers-reduced-motion: reduce) {
              .abf-track { animation: none !important; }
            }
            .line-clamp-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
