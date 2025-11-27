// очень короткий пример, чтобы ты понимала идею
import type { Metadata } from "next";
import PresentationIntroAndMain from "@/components/presentation-section/PresentationIntroAndMain";
import PresentationFaq from "@/components/presentation-section/PresentationFaq";
import PresentationCta from "@/components/presentation-section/PresentationCta";

export const metadata: Metadata = {
  /* ... */
};

export default function PresentationPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="mx-auto mt-2 mb-6 w-full text-center text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
          In development
        </p>
        <PresentationIntroAndMain />
        <PresentationFaq />
        <PresentationCta />
      </div>
    </main>
  );
}
