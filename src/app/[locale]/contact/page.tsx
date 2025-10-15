"use client";

import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-start">
        Наши контакты
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Контактная информация */}
        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            Get in touch with our team for partnership, compliance, or client
            support inquiries.
          </p>

          {/* Email (ссылка mailto) */}
          <a
            href="mailto:info.alpinebf@gmx.ch?subject=Inquiry%20from%20website"
            className="flex items-center gap-3 text-crypto hover:text-emerald-600 transition"
            aria-label="Send email to info.alpinebf@gmx.ch"
          >
            <Mail className="w-5 h-5" />
            <span>info.alpinebf@gmx.ch</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/41764757408"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-crypto hover:text-emerald-600 transition"
            aria-label="Open WhatsApp chat"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>WhatsApp: +41 76 475 74 08</span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/AlpineBridgeFinance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gold hover:text-yellow-500 transition"
            aria-label="Open Telegram"
          >
            <FaTelegramPlane className="w-5 h-5" />
            <span>Telegram: +41 76 475 74 08</span>
          </a>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MapPin className="text-fiat w-5 h-5" />
            <span>Lugano, Ticino, Switzerland</span>
          </div>
        </div>

        {/* Форма обратной связи */}
        <div className="space-y-5 bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Форма обратной связи
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-crypto"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-crypto"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-crypto"
            />
            <button
              type="submit"
              className="bg-crypto text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
