import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";
import fs from "fs/promises";
import path from "path";

function safeJsonParse(content: string, filePath: string) {
  try {
    // Защитимся от BOM
    const cleaned = content.replace(/^\uFEFF/, "");
    return JSON.parse(cleaned);
  } catch (e: any) {
    // Бросаем понятную ошибку: какой файл битый
    throw new Error(
      `✖ Invalid JSON in ${filePath}\n` +
        `Reason: ${e?.message || e}\n` +
        `Tip: проверь лишние запятые, кавычки и закрывающие скобки.`
    );
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // 1) Определяем локаль
  const req = await requestLocale;
  const locale = hasLocale(routing.locales, req)
    ? (req as string)
    : routing.defaultLocale;

  // 2) Путь к папке локали
  const messagesDir = path.join(process.cwd(), "messages", locale);

  // 3) Читаем все *.json (игнорим скрытые и не-json)
  let files: string[] = [];
  try {
    files = (await fs.readdir(messagesDir)).filter(
      (f) => f.endsWith(".json") && !f.startsWith(".")
    );
  } catch {
    throw new Error(`✖ Missing messages directory: ${messagesDir}`);
  }

  if (files.length === 0) {
    throw new Error(`✖ No JSON files found in ${messagesDir}`);
  }

  // 4) Сливаем все файлы в один объект сообщений
  const messagesList = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(messagesDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      if (content.trim() === "") {
        // Пустой файл — это ошибка: наполни хотя бы {}
        throw new Error(
          `✖ Empty JSON file: ${filePath}. Добавь {} или реальные ключи.`
        );
      }

      return safeJsonParse(content, filePath);
    })
  );

  const messages = Object.assign({}, ...messagesList);

  return { locale, messages };
});
