import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const req = await requestLocale;
  const locale = hasLocale(routing.locales, req)
    ? (req as string)
    : routing.defaultLocale;

  // функция загрузки индекса локали (без .ts!)
  const load = async (loc: string) =>
    (await import(`../../messages/${loc}`)).default; // ← важное изменение

  let messages: Record<string, unknown>;
  try {
    messages = await load(locale);
  } catch {
    messages = await load("en");
  }

  return { locale, messages };
});
