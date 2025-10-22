// src/app/api/contact/route.ts
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  fromEmail?: string;
  message?: string;
  company?: string; // honeypot
};

const bool = (v?: string | null) => String(v).toLowerCase() === "true";
const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

// простейший in-memory rate limit (для одного инстанса)
const WINDOW_MS = 60_000;
const LIMIT = 5;
const ipMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  // IP
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = ipHeader
    ? ipHeader.split(",")[0].trim()
    : process.env.NODE_ENV === "development"
      ? "127.0.0.1"
      : "unknown";

  // rate-limit
  const now = Date.now();
  const slot = ipMap.get(ip);
  if (!slot || slot.resetAt < now) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    slot.count++;
    if (slot.count > LIMIT) {
      return json({ ok: false, errors: { _form: "Too many requests. Try again later." } }, 429);
    }
  }

  // body
  let body: Payload = {};
  try {
    body = (await req.json()) as Payload;
  } catch {
    return json({ ok: false, errors: { _form: "Invalid JSON" } }, 400);
  }

  // honeypot
  if (body.company && body.company.trim().length > 0) {
    return json({ ok: false, errors: { _form: "Spam detected" } }, 400);
  }

  // валидация
  const errors: Record<string, string> = {};
  if (!body.name || body.name.trim().length < 2) errors.name = "Invalid name";
  if (!body.fromEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.fromEmail))
    errors.fromEmail = "Invalid email";
  if (!body.message || body.message.trim().length < 3) errors.message = "Message is too short";
  if (Object.keys(errors).length) return json({ ok: false, errors }, 400);

  // SMTP
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = bool(process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false"));
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const site = process.env.SITE_NAME ?? "Website";
  const to = process.env.CONTACT_TO ?? user;

  if (!host || !user || !pass) {
    return json({ ok: false, errors: { _form: "Email transport not configured" } }, 500);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure, // 465 → SSL, 587 → STARTTLS
    auth: { user, pass },
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const subject = `[${site}] New contact message`;
  const text = [
    `📨 New contact form submission from ${site}`,
    ``,
    `Name: ${body.name}`,
    `Email: ${body.fromEmail}`,
    `IP: ${ip}`,
    ``,
    `Message:`,
    body.message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `${site} <${user}>`,
      to,
      replyTo: body.fromEmail,
      subject,
      text,
    });
    return json({ ok: true }, 200);
  } catch {
    return json({ ok: false, errors: { _form: "Email send failed" } }, 500);
  }
}
