// src/app/[locale]/contact/page.tsx
import "server-only";
export const runtime = "nodejs";

import { promises as fs } from "node:fs";
import path from "node:path";
import ContactInfo from "./ContactInfo";
import ContactForm from "./components/ContactForm";

type ContactDict = {
  page: {
    title: string;
    subtitle: string;
    feedbackTitle: string;
    feedbackSubtitle: string;
  };
  form: {
    labels: { name: string; email: string; message: string };
    placeholders: { name: string; email: string; message: string };
    buttons: { send: string; sending: string; sent: string; retry: string };
    alerts: { success: string; errorGeneric: string; errorNetwork: string };
    a11y: { statusSending: string; statusSuccess: string; statusError: string };
    validation: {
      name: { min: string; max: string };
      fromEmail: { email: string };
      message: { min: string; max: string };
      consent: { required: string };
    };
  };
  info: {
    lead: string;
    whatsapp: string;
    telegram: string;
    copyEmail: string;
    copyNumber: string;
    copyHandle: string;
    address: string;
    toastCopied: string;
    waText: string;
    emailSubject: string;
  };
};

async function readIfExists(p: string) {
  try {
    return await fs.readFile(p, "utf-8");
  } catch {
    return null;
  }
}

async function loadContactDict(locale: string): Promise<ContactDict> {
  const root = process.cwd();
  const candidates = [
    path.join(root, "messages", locale, "contact.json"),
    path.join(root, "src", "messages", locale, "contact.json"),
    path.join(root, "messages", "en", "contact.json"),
    path.join(root, "src", "messages", "en", "contact.json"),
  ];
  for (const p of candidates) {
    const raw = await readIfExists(p);
    if (raw) return JSON.parse(raw) as ContactDict;
  }
  throw new Error("Не найден contact.json в messages/<locale>.");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await loadContactDict(locale || "en");

  return (
    <main className="w-full bg-page-light overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16">
        {/* Заголовок */}
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] bg-clip-text text-transparent">
            {dict.page.title}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {dict.page.subtitle}
          </p>
        </header>

        {/* Контент */}
        <section className="grid w-full gap-5 sm:gap-6 lg:grid-cols-2 items-stretch content-stretch">
          {/* Левая колонка — контакты */}
          <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
            <div className="card-clean h-full p-6 sm:p-7 flex flex-col">
              <ContactInfo dict={dict.info} />
            </div>
          </div>

          {/* Правая колонка — форма */}
          <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[var(--color-fiat)] via-[var(--color-crypto)] to-[var(--color-gold)] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
            <div className="card-clean h-full p-6 sm:p-7 flex flex-col">
              <h2 className="!mt-0 mb-2 text-lg font-semibold">{dict.page.feedbackTitle}</h2>
              {/* при желании: <p className="mb-4 text-sm text-slate-600">{dict.page.feedbackSubtitle}</p> */}
              <ContactForm dict={dict.form} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
