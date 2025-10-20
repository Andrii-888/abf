// src/app/[locale]/contact/page.tsx
import "server-only";
export const runtime = "nodejs";

import dynamic from "next/dynamic";
import { promises as fs } from "node:fs";
import path from "node:path";
import ContactInfo from "./ContactInfo";

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

const ContactForm = dynamic(() => import("./ContactForm"), {
  loading: () => <div className="text-sm text-gray-500">Loading form…</div>,
});

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await loadContactDict(locale || "en");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:py-14">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight lg:text-3xl">{dict.page.title}</h1>
      {/* Чтобы не дублировать смысл с левым блоком на десктопе, показываем подзаголовок только на мобиле */}
      <p className="mb-6 text-sm text-gray-600 lg:hidden">{dict.page.subtitle}</p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Левая колонка — контактная информация */}
        <div className="rounded-2xl border border-gray-200/60 p-5 shadow-sm">
          <ContactInfo dict={dict.info} />
        </div>

        {/* Правая колонка — форма обратной связи (якорь для CTA) */}
        <div id="feedback" className="rounded-2xl border border-gray-200/60 p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">{dict.page.feedbackTitle}</h2>
          {/* Если хочешь, чтобы справа текст был только на мобиле, раскомментируй строку ниже:
              <p className="mb-5 text-sm text-gray-600 lg:hidden">{dict.page.feedbackSubtitle}</p>
            Или если хочешь показывать везде — используй без lg:hidden:
              <p className="mb-5 text-sm text-gray-600">{dict.page.feedbackSubtitle}</p>
          */}

          {/* Передаём форменные строки как пропсы — без клиентского i18n */}
          <ContactForm dict={dict.form} />
        </div>
      </div>
    </section>
  );
}
