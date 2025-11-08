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

/** Брендовый HTML-шаблон письма администратору */
function buildAdminHtml(params: { site: string; name: string; email: string; message: string }) {
  const { site, name, email, message } = params;

  // фирменные цвета ABF
  const gold = "#d4af37";
  const emerald = "#1abc9c";
  const wine = "#c0392b";

  return `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f7f8;padding:24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,0.06);overflow:hidden">
          <!-- header -->
          <tr>
            <td style="padding:20px 24px;background:linear-gradient(135deg, ${gold}, ${emerald});color:#111;font-weight:600">
              <div style="font-size:16px;letter-spacing:0.3px">Alpine Bridge Finance</div>
              <div style="font-size:13px;opacity:.8">${escapeHtml(site)} — Contact form</div>
            </td>
          </tr>

          <!-- body -->
          <tr>
            <td style="padding:24px">
              <div style="font-size:18px;font-weight:600;margin-bottom:12px;color:#111">New message from website</div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;color:#111">
                <tr>
                  <td style="width:120px;color:#555;padding:6px 0">Name:</td>
                  <td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td>
                </tr>
                <tr>
                  <td style="color:#555;padding:6px 0">Email:</td>
                  <td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}" style="color:${wine};text-decoration:none">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="color:#555;padding:10px 0;vertical-align:top">Message:</td>
                  <td style="padding:10px 0">
                    <div style="border-left:3px solid #eee;padding-left:12px;white-space:pre-wrap;line-height:1.6">
                      ${escapeHtml(message)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="padding:16px 24px;background:#fafafa;border-top:1px solid #eee;color:#666;font-size:12px">
              Sent securely via SMTP (Infomaniak). Replying to this email will reach the sender.
            </td>
          </tr>
        </table>

        <div style="font-size:11px;color:#9aa1a6;margin-top:12px">© ${new Date().getFullYear()} Alpine Bridge Finance, Lugano</div>
      </td>
    </tr>
  </table>
  `;
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

  // Явная проверка соединения/аутентификации — даст понятную ошибку
  try {
    await transporter.verify();
  } catch (e: unknown) {
    const err = e as { message?: string };
    throw new Error(`SMTP connection failed: ${err.message ?? "verify() error"}`);
  }

  const subject = `ABF • Contact: ${payload.name}`;
  const html = buildAdminHtml({
    site: process.env.SITE_NAME || "Website",
    name: payload.name,
    email: payload.fromEmail,
    message: payload.message,
  });
  const text =
    `Site: ${process.env.SITE_NAME || "Website"}\n` +
    `Name: ${payload.name}\nEmail: ${payload.fromEmail}\n\n${payload.message}`;

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
