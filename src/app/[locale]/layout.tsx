import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import getRequestConfig from "@/i18n/request";
import SiteHeader from "@/components/layout/SiteHeader";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  setRequestLocale(locale);

  const { messages } = await getRequestConfig({
    requestLocale: Promise.resolve(locale),
  });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteHeader />
      {/* отступ под фиксированный header: h-14 md:h-16 */}
      <div className="pt-14 md:pt-16">{children}</div>
    </NextIntlClientProvider>
  );
}
