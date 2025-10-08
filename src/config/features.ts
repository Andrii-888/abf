"use client";

import { ShieldCheck, Users, Coins, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";

export function useFeatures() {
  const t = useTranslations("home.features");

  return [
    {
      Icon: ShieldCheck,
      title: t("f1.title"),
      text: t("f1.text"),
      color: "text-[var(--color-crypto)]",
    },
    {
      Icon: Users,
      title: t("f2.title"),
      text: t("f2.text"),
      color: "text-[var(--color-gold)]",
    },
    {
      Icon: Coins,
      title: t("f3.title"),
      text: t("f3.text"),
      color: "text-[var(--color-fiat)]",
    },
    {
      Icon: Handshake,
      title: t("f4.title"),
      text: t("f4.text"),
      color: "text-[var(--color-crypto)]",
    },
  ];
}
