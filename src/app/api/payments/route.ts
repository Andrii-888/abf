// src/app/api/payments/route.ts
import { NextResponse } from "next/server";

type PaymentPayload = {
  amount?: number | string;
  currency?: string;
  name?: string;
  email?: string;
  txHash?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PaymentPayload;

    // Здесь пока только приём данных и простой ответ.
    // Никаких сторонних библиотек (resend и т.п.), чтобы не ломать билд.
    console.log("Received payment payload:", body);

    return NextResponse.json(
      {
        ok: true,
        message: "Payment payload received (demo endpoint).",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /api/payments:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request payload",
      },
      { status: 400 },
    );
  }
}
