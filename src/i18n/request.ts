import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { hasLocale } from "next-intl";
import fs from "fs/promises";
import path from "path";

type Messages = Record<string, unknown>;
type Ctx = { requestLocale: Promise<string | undefined> };

function safeJsonParse(content: string, filePath: string): Messages {
  try {
    const cleaned = content.replace(/^\uFEFF/, "");
    const parsed = JSON.parse(cleaned) as unknown;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      throw new Error("Root JSON value must be an object");
    }
    return parsed as Messages;
  } catch (e: unknown) {
    const reason = e instanceof Error ? e.message : String(e);
    throw new Error(
      `✖ Invalid JSON in ${filePath}\nReason: ${reason}\nTip: проверь лишние запятые, кавычки и закрывающие скобки.`
    );
  }
}

export default getRequestConfig(async ({ requestLocale }: Ctx) => {
  const req = await requestLocale; // string | undefined
  const locale: string = hasLocale(routing.locales, req)
    ? (req as string)
    : routing.defaultLocale;

  const messagesDir = path.join(process.cwd(), "messages", locale);

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

  const messagesList: Messages[] = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(messagesDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      if (content.trim() === "") {
        throw new Error(
          `✖ Empty JSON file: ${filePath}. Добавь {} или реальные ключи.`
        );
      }

      return safeJsonParse(content, filePath);
    })
  );

  const messages: Messages = messagesList.reduce<Messages>(
    (acc, cur) => Object.assign(acc, cur),
    {}
  );

  return { locale, messages };
});
