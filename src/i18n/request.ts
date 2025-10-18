// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

type Messages = Record<string, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  // 1) Безопасно извлекаем строковую локаль
  const req = await requestLocale;
  const maybe = typeof req === "string" ? req : undefined;

  // 2) Валидируем локаль по списку поддерживаемых
  const locale = maybe && hasLocale(routing.locales, maybe) ? maybe : routing.defaultLocale;

  // 3) Лоадер messages/<locale>/index.{ts,js}
  const load = async (loc: string): Promise<Messages> => {
    const mod = await import(`../../messages/${loc}/index`);
    return (mod as { default: Messages }).default;
  };

  // 4) Пытаемся загрузить нужную локаль, иначе — en
  let messages: Messages;
  try {
    messages = await load(locale);
  } catch {
    messages = await load("en");
  }

  return { locale, messages };
});
