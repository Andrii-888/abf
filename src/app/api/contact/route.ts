import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/utils/validation/contact.schema";

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Валидация Zod
    const parsed = contactSchema.safeParse(json);

    // honeypot: не раскрываемся ботам
    if (
      !parsed.success &&
      parsed.error.flatten().fieldErrors.company?.[0] === "bot"
    ) {
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
      secure: process.env.SMTP_SECURE === "true", // 465 -> true (implicit TLS)
      authMethod: "LOGIN",
      auth: {
        user: mustEnv("SMTP_USER"),
        pass: mustEnv("SMTP_PASS"),
      },
      tls: { minVersion: "TLSv1.2" },
      // при отладке включи:
      // logger: true,
      // debug: true,
    });

    const site = process.env.SITE_NAME || "Website";
    const to = process.env.CONTACT_TO || mustEnv("SMTP_USER");
    const subject = `Запрос с сайта (${site})`;

    const html = renderHtml({ site, name, email: fromEmail, message });

    await transporter.sendMail({
      from: `"${site}" <${mustEnv("SMTP_USER")}>`, // отправитель = логин SMTP
      to,
      replyTo: fromEmail,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
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
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
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
      message
    )}</pre>
    <hr/>
    <p style="color:#666">Отправлено автоматически с ${escapeHtml(site)}</p>
  </div>
  `;
}
