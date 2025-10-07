import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import getRequestConfig from "@/i18n/request";
import SiteHeader from "@/components/layout/SiteHeader";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // В Next 15 params типизирован как Promise<T> | undefined
  params?: Promise<{ locale?: string }>;
}) {
  // Распаковываем params (в деве часто объект, в проде — Promise)
  const resolved = (await (params ?? Promise.resolve({ locale: "en" }))) || {
    locale: "en",
  };
  const locale = typeof resolved.locale === "string" ? resolved.locale : "en";

  setRequestLocale(locale);

  const { messages } = await getRequestConfig({
    requestLocale: Promise.resolve(locale),
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteHeader />
      {/* отступ под фиксированный header */}
      <div className="pt-14 md:pt-16">{children}</div>
    </NextIntlClientProvider>
  );
}
