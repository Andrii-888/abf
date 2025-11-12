"use client";

import { MapPin, Copy, Clock, Globe, ExternalLink, IdCard } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import Toast from "@/components/ui/Toast";
import { useState } from "react";

type InfoDict = {
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

export default function ContactInfo({ dict }: { dict: InfoDict }) {
  // Email
  const email = "info@alpinebf.com";
  const subject = encodeURIComponent(dict.emailSubject);
  const mailto = `mailto:${email}?subject=${subject}`;

  // WhatsApp
  const phonePretty = "+41 76 475 74 08";
  const phoneRaw = "41764757408";
  const waText = encodeURIComponent(dict.waText);
  const waLink = `https://wa.me/${phoneRaw}?text=${waText}`;

  // Telegram
  const tgHandle = "alpinebf";
  const tgLink = `https://t.me/${tgHandle}`;

  // Карта
  const mapsLink =
    "https://www.google.com/maps/search/?api=1&query=Lugano%2C+Ticino%2C+Switzerland";

  // vCard
  const vcardHref = "/contact.vcf";

  const [toastOpen, setToastOpen] = useState(false);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToastOpen(true);
    } catch (err) {
      console.warn("Clipboard copy failed:", err);
    }
  }

  return (
    <div className="space-y-6">
      {/* Лид */}
      <p className="text-center text-base sm:text-lg text-gray-600">{dict.lead}</p>

      {/* Контакты */}
      <div className="flex flex-col items-center gap-4">
        {/* Email */}
        <div className="flex items-center gap-2">
          <a
            href={mailto}
            className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
            title={email}
          >
            {/* Красный конверт (в стиле Infomaniak) */}
            <FaEnvelope className="w-5 h-5 text-[#F04438]" />
            <span>{email}</span>
          </a>
          <button
            type="button"
            onClick={() => copy(email)}
            className="inline-flex items-center justify-center p-1.5 rounded text-gray-400 hover:text-gray-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            aria-label={dict.copyEmail}
            title={dict.copyEmail}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-800 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
            title={`${dict.whatsapp}: ${phonePretty}`}
          >
            <FaWhatsapp
              className="w-6 h-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
              color="#25D366"
            />
            <span>
              {dict.whatsapp}: {phonePretty}
            </span>
          </a>
          <button
            type="button"
            onClick={() => copy(phonePretty)}
            className="inline-flex items-center justify-center p-1.5 rounded text-gray-400 hover:text-gray-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            aria-label={dict.copyNumber}
            title={dict.copyNumber}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Telegram */}
        <div className="flex items-center gap-2">
          <a
            href={tgLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-800 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
            title={`${dict.telegram}: @${tgHandle}`}
          >
            <FaTelegramPlane
              className="w-6 h-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
              color="#229ED9"
              aria-hidden
            />
            <span>
              {dict.telegram}: @{tgHandle}
            </span>
          </a>
          <button
            type="button"
            onClick={() => copy(`@${tgHandle}`)}
            className="inline-flex items-center justify-center p-1.5 rounded text-gray-400 hover:text-gray-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            aria-label={dict.copyHandle}
            title={dict.copyHandle}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {/* Address */}
        <div className="flex items-center gap-3 text-gray-800">
          <MapPin className="w-5 h-5 text-[#F04438]" />
          <span>{dict.address}</span>
        </div>
      </div>

      {/* Разделитель */}
      <hr className="border-t border-black/10" />

      {/* Инфоблоки */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Часы работы */}
        <div className="rounded-xl border border-black/10 bg-white/90 p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4 text-[#007AFF]" />
            Office hours
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Mon–Fri <b>09:00–18:00</b>
            <br />
            Sat–Sun <span className="text-gray-500">Closed</span>
          </p>
        </div>

        {/* Время ответа */}
        <div className="rounded-xl border border-black/10 bg-white/90 p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <FaEnvelope className="w-4 h-4 text-[#F04438]" />
            Response time
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Email / Telegram — <b>within 24h</b>
            <br />
            WhatsApp — <b>asap</b> (business hours)
          </p>
        </div>

        {/* Языки */}
        <div className="rounded-xl border border-black/10 bg-white/90 p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Globe className="w-4 h-4 text-[#007AFF]" />
            Languages
          </div>
          <p className="mt-2 text-sm text-gray-700">EN · IT · RU · DE · FR · ZH</p>
        </div>
      </div>

      {/* Быстрые ссылки */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#007AFF] hover:text-[#005FCC] transition"
        >
          <ExternalLink className="w-4 h-4" />
          Open on map
        </a>

        <span className="text-black/20">•</span>

        <a
          href={vcardHref}
          download
          className="inline-flex items-center gap-2 text-sm text-[#007AFF] hover:text-[#005FCC] transition"
        >
          <IdCard className="w-4 h-4" />
          Save contact (.vcf)
        </a>
      </div>

      {/* Toast */}
      <Toast
        open={toastOpen}
        message={dict.toastCopied}
        onClose={() => setToastOpen(false)}
        position="bottom-right"
      />
    </div>
  );
}
