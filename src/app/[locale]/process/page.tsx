// src/app/[locale]/process/page.tsx
import "server-only";
export const runtime = "nodejs";

import { promises as fs } from "node:fs";
import path from "node:path";
import { Phone, ClipboardList, ShieldCheck, Handshake, BadgeCheck, RefreshCcw } from "lucide-react";

import { makePageMetadata } from "@/seo/factory";
import { getProcessMeta } from "@/seo/meta";
export const generateMetadata = makePageMetadata("/process", getProcessMeta);

type Dict = {
  title: string;
  subtitle: string;
  ctaHint: string;
  footnote: string;
  steps: { title: string; desc: string }[];
};

// безопасное чтение
async function readIfExists(p: string) {
  try {
    return await fs.readFile(p, "utf-8");
  } catch {
    return null;
  }
}

// загрузка словаря
async function loadDict(locale: string): Promise<Dict> {
  const root = process.cwd();
  const candidates = [
    path.join(root, "messages", locale, "process.json"),
    path.join(root, "src", "messages", locale, "process.json"),
    // fallback на английский (дефолтный язык)
    path.join(root, "messages", "en", "process.json"),
    path.join(root, "src", "messages", "en", "process.json"),
  ];

  for (const p of candidates) {
    const raw = await readIfExists(p);
    if (raw) return JSON.parse(raw) as Dict;
  }

  throw new Error("Не найден файл process.json в папке messages/<locale>.");
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await loadDict(locale || "en"); // ← теперь fallback = EN

  const icons = [Phone, ClipboardList, ShieldCheck, Handshake, RefreshCcw, BadgeCheck] as const;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Заголовок */}
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] bg-clip-text text-transparent">
          {dict.title}
        </h1>
        <p className="mt-3 text-slate-700 text-sm sm:text-base max-w-2xl mx-auto">
          {dict.subtitle}
        </p>
      </header>

      {/* Карточки */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr">
        {dict.steps.map((s, idx) => {
          const Icon = icons[idx] ?? BadgeCheck;
          const n = idx + 1;
          return (
            <li key={n} className="group h-full">
              {/* Градиентный кант */}
              <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] shadow-lg transition-transform duration-200 group-hover:translate-y-[1px]">
                {/* Внутренний контейнер */}
                <div className="h-full rounded-2xl bg-white/85 backdrop-blur p-5 border border-slate-200/70 flex flex-col">
                  {/* Верхний блок (номер + иконка + текст) */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-semibold bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]">
                      {n}
                    </span>
                    <Icon className="h-5 w-5 text-[var(--color-gold)] opacity-90" />
                  </div>

                  {/* Текстовый блок растягиваем, чтобы уравнять высоту */}
                  <div className="mt-3 grow">
                    <h3 className="text-base font-semibold leading-tight">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{s.desc}</p>
                  </div>

                  {/* Футер всегда внизу */}
                  <div className="mt-4 text-xs font-medium text-slate-600 opacity-80">
                    {dict.ctaHint}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Подпись */}
      <div className="mt-12 text-center text-slate-700 text-sm max-w-2xl mx-auto">
        {dict.footnote}
      </div>
    </div>
  );
}
