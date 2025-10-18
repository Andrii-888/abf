"use client";

import { Mail, MapPin, Copy } from "lucide-react";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import Toast from "@/components/ui/Toast";
import { useState } from "react";

export default function ContactInfo() {
  const email = "info.alpinebf@mail.ch";
  const subject = encodeURIComponent("Запрос с сайта (AlpineBF)");
  const mailto = `mailto:${email}?subject=${subject}`;
  const [toastOpen, setToastOpen] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
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
          className="flex items-center gap-2 text-crypto hover:text-emerald-600 transition"
        >
          <Mail className="w-5 h-5" />
          <span>{email}</span>
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="text-gray-400 hover:text-crypto transition"
          aria-label="Copy email"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/41764757408"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-crypto hover:text-emerald-600 transition"
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
      >
        <FaTelegramPlane className="w-5 h-5" />
        <span>Telegram: +41 76 475 74 08</span>
      </a>

      {/* Address */}
      <div className="flex items-center gap-3">
        <MapPin className="text-fiat w-5 h-5" />
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
