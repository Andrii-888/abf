"use client";

import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function BackToHome() {
  return (
    <div className="mb-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
        <span className="underline-offset-2 hover:underline">Back to home</span>
      </Link>
    </div>
  );
}
