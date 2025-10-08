import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import getRequestConfig from "@/i18n/request";
import Chrome from "@/components/layout/Chrome";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  // 👇 Распаковываем locale
  const resolved = (await (params ?? Promise.resolve({ locale: "en" }))) || {
    locale: "en",
  };
  const locale = typeof resolved.locale === "string" ? resolved.locale : "en";

  // 👇 Фиксируем locale для next-intl
  setRequestLocale(locale);

  // 👇 Загружаем переводы
  const { messages } = await getRequestConfig({
    requestLocale: Promise.resolve(locale),
  });

  // 👇 Оборачиваем всё в Chrome
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Chrome>{children}</Chrome>
    </NextIntlClientProvider>
  );
}
