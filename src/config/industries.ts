// src/config/industries.ts
import {
  Landmark,
  Building2,
  Car,
  Briefcase,
  Scale,
  Coins,
  ShieldCheck,
  Banknote,
} from "lucide-react";

export const iconMap = {
  Landmark,
  Building2,
  Car,
  Briefcase,
  Scale,
  Coins,
  ShieldCheck,
  Banknote,
};

// ✅ добавлено поле href для ссылки на сайт партнёра
export type Industry = {
  id: string;
  title: string;
  desc: string;
  icon?: keyof typeof iconMap;
  tag?: string;
  href?: string; // ← новое поле
};

/**
 * Нормализует входящий JSON из переводов или API в Industry[]
 */
export function normalizeIndustries(jsonItems: Array<Partial<Industry>> | undefined): Industry[] {
  return (jsonItems ?? []).map((it) => {
    const iconKey = (it?.icon ?? "Landmark") as keyof typeof iconMap;
    const validIcon = iconKey in iconMap ? iconKey : "Landmark";

    return {
      id: String(it?.id ?? cryptoRandom()),
      title: String(it?.title ?? ""),
      desc: String(it?.desc ?? ""),
      icon: validIcon,
      tag: it?.tag ? String(it.tag) : undefined,
      href: it?.href ? String(it.href) : undefined, // ← добавлено
    };
  });
}

/**
 * Короткий ID без зависимостей
 */
function cryptoRandom(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Базовый набор индустрий (английская версия по умолчанию)
 */
export const defaultIndustries: Industry[] = [
  {
    id: "banks",
    title: "Banks & EMIs",
    desc: "On/Off-ramp with Swiss/EEA institutions.",
    icon: "Landmark",
    tag: "Fiat",
    href: "https://example-bank.com", // ← добавлен сайт
  },
  {
    id: "auto",
    title: "Auto Dealers",
    desc: "Crypto→Fiat settlements for vehicles.",
    icon: "Car",
    tag: "Retail",
    href: "https://example-auto.com",
  },
  {
    id: "realestate",
    title: "Real Estate",
    desc: "Structured payments for property.",
    icon: "Building2",
    tag: "Assets",
    href: "https://example-realestate.com",
  },
  {
    id: "family",
    title: "Family Offices",
    desc: "Tailored scenarios under compliance.",
    icon: "Briefcase",
    tag: "Wealth",
    href: "https://example-familyoffice.com",
  },
  {
    id: "law",
    title: "Law Firms",
    desc: "KYC/AML aligned escrow & docs.",
    icon: "Scale",
    tag: "Legal",
    href: "https://example-law.com",
  },
  {
    id: "metals",
    title: "Precious Metals",
    desc: "Crypto settlement for bullion.",
    icon: "Coins",
    tag: "Gold",
    href: "https://example-metals.com",
  },
  {
    id: "exch",
    title: "Exchanges",
    desc: "Liquidity routing & operations.",
    icon: "ShieldCheck",
    tag: "Ops",
    href: "https://example-exchange.com",
  },
];
