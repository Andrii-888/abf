import "server-only";
export const runtime = "nodejs";

import { promises as fs } from "node:fs";
import path from "node:path";
import Link from "next/link";
import {
  Handshake,
  ShieldCheck,
  Building2,
  BadgeCheck,
  Banknote,
  UserPlus,
  Mail,
} from "lucide-react";

type Dict = {
  title: string;
  subtitle: string;
  highlights: { title: string; desc: string; icon?: string }[];
  partnerCategories: { title: string; desc: string }[];
  howTo: { n?: number; title: string; desc: string }[];
  cta: { title: string; buttonText: string; contactNote?: string };
  legalNote?: string;
};

async function readIfExists(p: string) {
  try {
    return await fs.readFile(p, "utf-8");
  } catch {
    return null;
  }
}

async function loadDict(locale: string): Promise<Dict> {
  const root = process.cwd();
  const candidates = [
    path.join(root, "messages", locale, "partners.json"),
    path.join(root, "src", "messages", locale, "partners.json"),
    path.join(root, "messages", "en", "partners.json"),
    path.join(root, "src", "messages", "en", "partners.json"),
  ];
  for (const p of candidates) {
    const raw = await readIfExists(p);
    if (raw) return JSON.parse(raw) as Dict;
  }
  throw new Error("Не найден partners.json в messages/<locale>.");
}

const iconMap = {
  Handshake,
  ShieldCheck,
  Building2,
  BadgeCheck,
  Banknote,
  UserPlus,
  Mail,
} as const;

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await loadDict(locale || "en");

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

      {/* Ключевые преимущества */}
      {dict.highlights?.length > 0 && (
        <section className="mb-10">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr">
            {dict.highlights.map((h, i) => {
              const Icon =
                iconMap[(h.icon as keyof typeof iconMap) ?? "BadgeCheck"];
              return (
                <li key={i} className="h-full">
                  <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] shadow-lg">
                    <div className="h-full rounded-2xl bg-white/85 backdrop-blur p-5 border border-slate-200/70 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-semibold bg-[var(--color-crypto)]">
                          {i + 1}
                        </span>
                        <Icon className="h-5 w-5 text-[var(--color-gold)] opacity-90" />
                      </div>
                      <div className="mt-3 grow">
                        <h3 className="text-base font-semibold leading-tight">
                          {h.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-700">{h.desc}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* Кого ищем / категории партнёров */}
      {dict.partnerCategories?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Категории партнёров</h2>
          <div className="grid gap-4 sm:grid-cols-2 items-stretch auto-rows-fr">
            {dict.partnerCategories.map((c, i) => (
              <div
                key={i}
                className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]"
              >
                <div className="h-full rounded-2xl bg-white/85 backdrop-blur p-5 border border-slate-200/70">
                  <h3 className="text-base font-semibold leading-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Как стать партнёром */}
      {dict.howTo?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Как стать партнёром</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch auto-rows-fr">
            {dict.howTo.map((s, i) => (
              <li key={i} className="h-full">
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)]">
                  <div className="h-full rounded-2xl bg-white/85 backdrop-blur p-5 border border-slate-200/70 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-xs font-semibold bg-[var(--color-crypto)]">
                        {s.n ?? i + 1}
                      </span>
                      <UserPlus className="h-5 w-5 text-[var(--color-gold)] opacity-90" />
                    </div>
                    <div className="mt-3 grow">
                      <h3 className="text-base font-semibold leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-700">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* CTA */}
      <section className="text-center mt-14">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-5">
          {dict.cta.title}
        </h3>

        <div className="flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-3
              rounded-xl
              text-sm sm:text-base font-medium
              text-white
              bg-[var(--color-crypto)]
              hover:bg-emerald-700
              shadow-sm
              hover:shadow-md
              transition-all duration-300
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-crypto)] focus:ring-offset-1
            "
          >
            <Mail className="h-5 w-5 text-white opacity-90" />
            <span>{dict.cta.buttonText}</span>
          </Link>
        </div>

        {dict.cta.contactNote && (
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            {dict.cta.contactNote}
          </p>
        )}
      </section>

      {/* Юр. примечание */}
      {dict.legalNote && (
        <div className="mt-10 text-center text-slate-600 text-xs max-w-3xl mx-auto">
          {dict.legalNote}
        </div>
      )}
    </div>
  );
}
