// src/app/open/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../../messages/en/index";

export default function OpenLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
