// src/app/api/payments/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const notifyEmail = process.env.PAYMENTS_NOTIFY_EMAIL;
const fromEmail = process.env.PAYMENTS_FROM_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Схема данных, которые мы ждём с фронта
const paymentSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  currency: z.enum(["USDT", "USDC"]),
  name: z.string().optional().nullable(),
  email: z.string().email("Invalid email"),
  txHash: z.string().min(10, "Tx hash is too short"),
});

export async function POST(req: Request) {
  try {
    // 1. Парсим JSON из запроса
    const json = await req.json();
    const parsed = paymentSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { amount, currency, name, email, txHash } = parsed.data;

    // 2. Проверяем, что Email API настроен
    if (!resend || !notifyEmail || !fromEmail) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email service is not configured. Please set RESEND_API_KEY, PAYMENTS_NOTIFY_EMAIL and PAYMENTS_FROM_EMAIL on the server.",
        },
        { status: 500 },
      );
    }

    // 3. Готовим письмо
    const subject = `New stablecoin payment: ${amount} ${currency}`;
    const textBody = [
      "New payment details received from stablecoin payment form:",
      "",
      `Amount:   ${amount} ${currency}`,
      `Client:   ${name && name.trim() !== "" ? name : "not specified"}`,
      `Email:    ${email}`,
      "",
      `Tx hash:  ${txHash}`,
      "",
      "Please verify the transaction on the blockchain and in your wallet.",
    ].join("\n");

    // 4. Отправляем письмо через Resend
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject,
      text: textBody,
    });

    // 5. Возвращаем успех на фронт
    return NextResponse.json(
      {
        ok: true,
        id: emailResult?.data?.id ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Payment notification error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error while sending notification",
      },
      { status: 500 },
    );
  }
}
