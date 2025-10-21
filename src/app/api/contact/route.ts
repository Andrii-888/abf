import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { makeContactSchema, type ValidationMessages } from "@/utils/validation/contact.schema";

// === Создаём схему с дефолтными текстами ошибок (для API) ===
const defaultValidation: ValidationMessages = {
  name: { min: "Name is too short", max: "Name is too long" },
  fromEmail: { email: "Invalid e-mail" },
  message: { min: "Message is too short", max: "Message is too long (up to 2000 characters)" },
  consent: { required: "Consent is required" },
};

const schema = makeContactSchema(defaultValidation);

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Валидация через Zod
    const parsed = schema.safeParse(json);

    // honeypot: не раскрываемся ботам
    if (!parsed.success && parsed.error.flatten().fieldErrors.company?.[0] === "bot") {
      return NextResponse.json({ ok: true });
    }

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const { name, fromEmail, message } = parsed.data;

    // === SMTP mail.ch ===
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.mail.ch",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true", // 465 → true
      authMethod: "LOGIN",
      auth: {
        user: mustEnv("SMTP_USER"),
        pass: mustEnv("SMTP_PASS"),
      },
      tls: { minVersion: "TLSv1.2" },
      // logger: true,
      // debug: true,
    });

    const site = process.env.SITE_NAME || "Website";
    const to = process.env.CONTACT_TO || mustEnv("SMTP_USER");
    const subject = `Запрос с сайта (${site})`;
    const html = renderHtml({ site, name, email: fromEmail, message });

    await transporter.sendMail({
      from: `"${site}" <${mustEnv("SMTP_USER")}>`,
      to,
      replyTo: fromEmail,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mailer error:", err);
    return new NextResponse("Mailer error", { status: 500 });
  }
}

/* === helpers === */

function mustEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}

function escapeHtml(str: string) {
  return String(str).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderHtml({
  site,
  name,
  email,
  message,
}: {
  site: string;
  name: string;
  email: string;
  message: string;
}) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6">
    <h2 style="margin:0 0 12px 0">Новый запрос с сайта</h2>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Сообщение:</strong></p>
    <pre style="white-space:pre-wrap;background:#f7f7f7;padding:12px;border-radius:8px">${escapeHtml(
      message,
    )}</pre>
    <hr/>
    <p style="color:#666">Отправлено автоматически с ${escapeHtml(site)}</p>
  </div>
  `;
}
