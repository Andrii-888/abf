// src/app/[locale]/process/page.tsx
import "server-only";
export const runtime = "nodejs";

import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
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

// безопасное чтение файла
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
    // fallback на английский
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
  const dict = await loadDict(locale || "en");

  const icons = [Phone, ClipboardList, ShieldCheck, Handshake, RefreshCcw, BadgeCheck] as const;

  // стабильные URL для 6 карточек (страницы создадим позже)
  const slugs = [
    "request", // 1. Создание заявки
    "confirmation", // 2. Подтверждение
    "kyc", // 3. Верификация (KYC)
    "office-visit", // 4. Визит в офис
    "exchange", // 5. Обмен
    "payout", // 6. Получение средств
  ] as const;

  return (
    <div className="w-full bg-page-light">
      <div className="mx-auto max-w-6xl px-4 py-2">
        {/* Заголовок */}
        <header className="mb-10 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] bg-clip-text text-transparent">
            {dict.title}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {dict.subtitle}
          </p>
        </header>

        {/* Карточки шагов */}
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr">
          {dict.steps.map((s, idx) => {
            const Icon = icons[idx] ?? BadgeCheck;
            const n = idx + 1;
            const slug = slugs[idx]!;
            const href = `/${locale}/process/${slug}`;

            return (
              <li key={n} className="h-full">
                {/* Вся карточка кликабельна */}
                <Link
                  href={href}
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-crypto)] rounded-2xl"
                  aria-label={`Подробнее о шаге: ${s.title}`}
                >
                  {/* Градиентная рамка */}
                  <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] shadow-md transition-transform duration-200 group-hover:translate-y-[1px]">
                    {/* Контейнер карточки — единый стиль */}
                    <div className="card-clean h-full p-5 flex flex-col">
                      {/* Верхний блок */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-semibold bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]">
                          {n}
                        </span>
                        <Icon className="h-5 w-5 text-[var(--color-gold)] opacity-90" />
                      </div>

                      {/* Текст карточки */}
                      <div className="mt-3 grow">
                        <h3 className="text-base font-semibold leading-tight text-slate-800">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                      </div>

                      {/* Нижняя подпись (подсказка-CTA) */}
                      <div className="mt-4 text-xs font-medium text-slate-500 opacity-80">
                        {dict.ctaHint}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Подпись под блоком */}
        <div className="mt-14 text-center text-slate-600 text-sm max-w-2xl mx-auto">
          {dict.footnote}
        </div>
      </div>
    </div>
  );
}
