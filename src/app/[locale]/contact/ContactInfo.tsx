"use client";

import { Mail, MapPin, Copy } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import Toast from "@/components/ui/Toast";
import { useState } from "react";

export default function ContactInfo() {
  const email = "info.alpinebf@mail.ch";

  // WhatsApp
  const phonePretty = "+41 76 475 74 08";
  const phoneRaw = "41764757408";
  const waText = encodeURIComponent(
    "Hello! I'd like to get in touch (partnership / compliance / support).",
  );
  const waLink = `https://wa.me/${phoneRaw}?text=${waText}`;

  // Telegram
  const tgHandle = "andrii_tsq";
  const tgLink = `https://t.me/${tgHandle}`;

  // Email
  const subject = encodeURIComponent("Запрос с сайта (AlpineBF)");
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
      <p className="text-lg text-gray-600">
        Get in touch with our team for partnership, compliance, or client support inquiries.
      </p>

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
          aria-label="Copy email"
          title="Copy email"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* WhatsApp (иконка — фирменный зелёный) */}
      <div className="flex items-center gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-800 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          title={`WhatsApp: ${phonePretty}`}
        >
          <FaWhatsapp
            className="w-6 h-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
            // фирменный #25D366
            color="#25D366"
            aria-hidden
          />
          <span>WhatsApp: {phonePretty}</span>
        </a>
        <button
          type="button"
          onClick={() => copy(phonePretty)}
          className="inline-flex items-center justify-center p-1.5 rounded text-gray-400 hover:text-gray-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          aria-label="Copy WhatsApp number"
          title="Copy number"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Telegram (иконка — фирменный голубой) */}
      <div className="flex items-center gap-2">
        <a
          href={tgLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-800 hover:text-gray-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
          title={`Telegram: @${tgHandle}`}
        >
          <FaTelegramPlane
            className="w-6 h-6 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
            // фирменный #229ED9
            color="#229ED9"
            aria-hidden
          />
          <span>Telegram: @{tgHandle}</span>
        </a>
        <button
          type="button"
          onClick={() => copy(`@${tgHandle}`)}
          className="inline-flex items-center justify-center p-1.5 rounded text-gray-400 hover:text-gray-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          aria-label="Copy Telegram handle"
          title="Copy handle"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Address */}
      <div className="flex items-center gap-3 text-gray-800">
        <MapPin className="w-5 h-5" />
        <span>Lugano, Ticino, Switzerland</span>
      </div>

      <Toast
        open={toastOpen}
        message="Copied!"
        onClose={() => setToastOpen(false)}
        position="bottom-right"
      />
    </div>
  );
}
