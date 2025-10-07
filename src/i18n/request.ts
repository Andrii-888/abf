import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  // ВАЖНО: дождаться промиса с локалью
  const req = await requestLocale;

  const locale = hasLocale(routing.locales, req)
    ? (req as string)
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
