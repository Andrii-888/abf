"use client";

import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-start">
        Наши контакты
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
