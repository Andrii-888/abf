// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  name: z.string().trim().min(2).max(80),
  fromEmail: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  company: z.string().optional(), // honeypot
});
type BodyInput = z.infer<typeof Body>;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function flattenZod(err: z.ZodError) {
  const flat = err.flatten().fieldErrors;
  const out: Record<string, string> = {};
  Object.keys(flat).forEach((k) => {
    const v = flat[k as keyof typeof flat]?.[0];
    if (v) out[k] = v;
  });
  return out;
}

async function sendViaSmtp(payload: BodyInput) {
  // honeypot: если поле-ловушка заполнено — “успешно”, но не шлём
  if (payload.company && payload.company.trim() !== "") {
    return { ok: true as const, skipped: "honeypot" };
  }

  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true"; // 465 → true, 587 → false
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const to = process.env.CONTACT_TO!;
  const from = process.env.MAIL_FROM || `Contact <${user}>`; // красивый “From”

  if (!host || !user || !pass || !to) {
    throw new Error("SMTP config missing: check SMTP_HOST/PORT/USER/PASS and CONTACT_TO");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure, // 465 — SSL, 587 — STARTTLS
    auth: { user, pass },
    requireTLS: !secure, // на 587 обычно нужен STARTTLS
    tls: { minVersion: "TLSv1.2" },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  // Проверка соединения/аутентификации
  try {
    await transporter.verify();
  } catch (e: unknown) {
    const err = e as { message?: string };
    throw new Error(`SMTP connection failed: ${err.message ?? "verify() error"}`);
  }

  const siteName = escapeHtml(process.env.SITE_NAME || "Website");

  const subject = `New contact message: ${payload.name}`;

  // --- HTML письмо с фиксированной подписью AlpineBridgeFinance ---
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.55; color:#111;">
      <h2 style="margin:0 0 12px;">${siteName} — Contact form</h2>

      <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(payload.fromEmail)}</p>
      <p style="margin:8px 0 4px;"><strong>Message:</strong></p>
      <pre style="margin:0; padding:10px 12px; background:#f7f7f8; border-radius:8px; white-space:pre-wrap;">${escapeHtml(
        payload.message,
      )}</pre>

      <hr style="border:none; border-top:1px solid #e6e6e6; margin:18px 0 12px;" />

      <div style="font-size:13px; color:#444;">
        <div><strong>AlpineBridgeFinance</strong></div>
        <div>CH - 6900 Lugano</div>
        <div><a href="mailto:info@alpinebf.com" style="color:#444; text-decoration:none;">info@alpinebf.com</a></div>
        <div><a href="https://www.alpinebf.com" target="_blank" rel="noopener" style="color:#444; text-decoration:none;">https://www.alpinebf.com</a></div>
      </div>
    </div>
  `;

  // --- Плейн-текст версия с той же подписью ---
  const text =
    `Site: ${process.env.SITE_NAME || "Website"}\n` +
    `Name: ${payload.name}\n` +
    `Email: ${payload.fromEmail}\n\n` +
    `${payload.message}\n\n` +
    `--\n` +
    `AlpineBridgeFinance\n` +
    `CH - 6900 Lugano\n` +
    `info@alpinebf.com\n` +
    `https://www.alpinebf.com`;

  // envelope.from = реальный аутентифицированный пользователь (Return-Path)
  const info = await transporter.sendMail({
    envelope: {
      from: user,
      to: to
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    },
    from,
    to,
    subject,
    html,
    text,
    replyTo: payload.fromEmail,
  });

  return { ok: true as const, provider: "smtp", id: info.messageId };
}

export async function POST(req: Request) {
  try {
    const json = (await req.json()) as Record<string, unknown>;
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: flattenZod(parsed.error) }, { status: 400 });
    }

    const result = await sendViaSmtp(parsed.data);
    return NextResponse.json({ ok: true, meta: result }, { status: 200 });
  } catch (e: unknown) {
    const err = e as { message?: string };
    // eslint-disable-next-line no-console
    console.error("contact api error:", err.message ?? e);
    return NextResponse.json(
      { ok: false, errors: { _form: err.message ?? "Email send failed" } },
      { status: 500 },
    );
  }
}
