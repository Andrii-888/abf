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
  const { locale } = await params; // ⬅️ обязателен await в Next 15
  const dict = await loadContactDict(locale || "en");

  return (
    <section className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-10 lg:py-14">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight lg:text-3xl">{dict.page.title}</h1>
      {/* Подзаголовок только на мобильных, чтобы не дублировать левый блок */}
      <p className="mb-6 text-sm text-gray-600 lg:hidden">{dict.page.subtitle}</p>

      <div className="grid w-full gap-6 overflow-hidden sm:gap-8 lg:grid-cols-2">
        {/* Левая колонка — контакты */}
        <div className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-200/60 p-5 shadow-sm">
          <ContactInfo dict={dict.info} />
        </div>

        {/* Правая колонка — форма */}
        <div
          id="feedback"
          className="w-full max-w-full overflow-hidden rounded-2xl border border-gray-200/60 p-5 shadow-sm"
        >
          <h2 className="mb-3 text-lg font-semibold">{dict.page.feedbackTitle}</h2>
          {/* Если надо показывать подзаголовок везде — сними lg:hidden */}
          {/* <p className="mb-5 text-sm text-gray-600">{dict.page.feedbackSubtitle}</p> */}
          <ContactForm dict={dict.form} />
        </div>
      </div>
    </section>
  );
}
