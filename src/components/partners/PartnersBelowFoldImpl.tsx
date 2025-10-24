"use client";
import React from "react";

type Highlight = { title: string; desc: string };
export type SectionsProps = {
  partnerCategoriesTitle?: string;
  partnerCategories: Highlight[];
  howToTitle?: string;
  howTo: ({ n?: number } & Highlight)[];
};

export default function PartnersBelowFoldImpl({
  partnerCategoriesTitle,
  partnerCategories,
  howToTitle,
  howTo,
}: SectionsProps) {
  return (
    <>
      {/* Partner categories */}
      {!!partnerCategories?.length && (
        <section className="mb-10">
          {partnerCategoriesTitle && (
            <h2 className="text-lg font-semibold mb-4">{partnerCategoriesTitle}</h2>
          )}
          <div className="grid gap-4 sm:grid-cols-2 items-stretch auto-rows-fr">
            {partnerCategories.map((c, i) => (
              <div
                key={i}
                className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)]
                           via-[var(--color-crypto)] to-[var(--color-gold)]"
              >
                <div className="h-full rounded-2xl bg-white/85 backdrop-blur p-5 border border-slate-200/70">
                  <h3 className="text-base font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How to become a partner */}
      {!!howTo?.length && (
        <section className="mb-10">
          {howToTitle && <h2 className="text-lg font-semibold mb-4">{howToTitle}</h2>}
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr">
            {howTo.map((s, i) => (
              <li key={i} className="h-full">
                <div
                  className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)]
                               via-[var(--color-crypto)] to-[var(--color-gold)]"
                >
                  <div className="h-full rounded-2xl bg-white/85 backdrop-blur p-5 border border-slate-200/70 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full
                                       text-white text-xs font-semibold bg-[var(--color-crypto)]"
                      >
                        {s.n ?? i + 1}
                      </span>
                      {/* Иконку шага можно добавить при желании */}
                    </div>
                    <div className="mt-3 grow">
                      <h3 className="text-base font-semibold leading-tight">{s.title}</h3>
                      <p className="mt-2 text-sm text-slate-700">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </>
  );
}
