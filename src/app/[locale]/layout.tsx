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
  // --- 1. Извлекаем локаль из параметров URL (или по умолчанию "en")
  const resolved = (await (params ?? Promise.resolve({ locale: "en" }))) || {
    locale: "en",
  };

  const locale =
    typeof resolved.locale === "string" && resolved.locale.trim() !== ""
      ? resolved.locale
      : "en";

  // --- 2. Устанавливаем текущую локаль для SSR
  setRequestLocale(locale);

  // --- 3. Загружаем переводы из messages/{locale}.json
  let messages;
  try {
    const config = await getRequestConfig({
      requestLocale: Promise.resolve(locale),
    });
    messages = config.messages;
  } catch (error) {
    console.warn(
      `⚠️ Missing translation for locale "${locale}", fallback → en`
    );
    const fallback = await getRequestConfig({
      requestLocale: Promise.resolve("en"),
    });
    messages = fallback.messages;
  }

  // --- 4. Возвращаем разметку
  return (
    <html lang={locale} translate="no">
      <body>
        <NextIntlClientProvider
          key={locale} // 🔑 фикс гидрации при смене языка
          locale={locale}
          messages={messages}
        >
          <Chrome>{children}</Chrome>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
