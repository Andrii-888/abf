// src/app/[locale]/contact/page.tsx
// Server Component — без "use client"
import dynamic from "next/dynamic";
import ContactInfo from "./ContactInfo";

// Форма должна быть Client Component (внутри ContactForm.tsx поставь 'use client' в самом верху)
const ContactForm = dynamic(() => import("./ContactForm"), {
  loading: () => <div className="text-sm text-gray-500">Loading form…</div>,
  // В Server Components нельзя указывать ssr:false
});

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 lg:py-14">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight lg:text-3xl">Contact</h1>

      {/* На мобильных сначала контакты, затем форма; на десктопе — контакты слева, форма справа */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Левая колонка — инфо-блок (server) */}
        <div className="rounded-2xl border border-gray-200/60 p-5 shadow-sm">
          <ContactInfo />
        </div>

        {/* Правая колонка — форма (client-only через 'use client' в файле формы) */}
        <div className="rounded-2xl border border-gray-200/60 p-5 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
