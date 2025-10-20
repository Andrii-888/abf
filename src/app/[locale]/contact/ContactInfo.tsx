"use client";

import { Mail, MapPin, Copy } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
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
  const email = "info.alpinebf@mail.ch";

  // WhatsApp
  const phonePretty = "+41 76 475 74 08";
  const phoneRaw = "41764757408";
  const waText = encodeURIComponent(dict.waText);
  const waLink = `https://wa.me/${phoneRaw}?text=${waText}`;

  // Telegram
  const tgHandle = "andrii_tsq";
  const tgLink = `https://t.me/${tgHandle}`;

  // Email
  const subject = encodeURIComponent(dict.emailSubject);
  const mailto = `mailto:${email}?subject=${subject}`;

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
      <p className="text-lg text-gray-600">{dict.lead}</p>

      {/* Email */}
      <div className="flex items-center gap-2">
        <a
          href={mailto}
          className="flex items-center gap-2 text-gray-800 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          title={email}
        >
          <Mail className="w-5 h-5" />
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
            aria-hidden
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
        <MapPin className="w-5 h-5" />
        <span>{dict.address}</span>
      </div>

      <Toast
        open={toastOpen}
        message={dict.toastCopied}
        onClose={() => setToastOpen(false)}
        position="bottom-right"
      />
    </div>
  );
}
