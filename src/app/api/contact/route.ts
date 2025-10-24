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
  // honeypot: если заполнено — удача, но не отправляем
  if (payload.company && payload.company.trim() !== "") {
    return { ok: true as const, skipped: "honeypot" };
  }

  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true"; // 465 → true, 587 → false
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const to = process.env.CONTACT_TO!;
  const from = process.env.MAIL_FROM || `Contact <${user}>`;

  if (!host || !user || !pass || !to) {
    throw new Error("SMTP config missing: check SMTP_HOST/PORT/USER/PASS and CONTACT_TO");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure, // 465 — true (SSL), 587 — false (STARTTLS)
    auth: { user, pass },
    // Иногда провайдеры требуют явного TLS
    tls: { minVersion: "TLSv1.2" },
  });

  const subject = `New contact message: ${payload.name}`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5;">
      <h2>${escapeHtml(process.env.SITE_NAME || "Website")} — Contact form</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.fromEmail)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap">${escapeHtml(payload.message)}</pre>
    </div>
  `;
  const text = `Site: ${process.env.SITE_NAME || "Website"}\nName: ${payload.name}\nEmail: ${payload.fromEmail}\n\n${payload.message}`;

  const info = await transporter.sendMail({
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
    const json = (await req.json()) as unknown;
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: flattenZod(parsed.error) }, { status: 400 });
    }

    const result = await sendViaSmtp(parsed.data);
    return NextResponse.json({ ok: true, meta: result }, { status: 200 });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("contact api error:", e);
    return NextResponse.json(
      { ok: false, errors: { _form: "Email send failed" } },
      { status: 500 },
    );
  }
}
