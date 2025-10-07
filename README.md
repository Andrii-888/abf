This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ABF — Fintech Platform (Next.js + i18n)

Короткий, практичный план: сначала создаём каркас, затем подключаем i18n (только Header), тестируем, коммитим, деплоим. Работаем **по одному шагу**.

---

## 0) Предпосылки

- **Node.js**: рекомендуется ≥ **18.18** (лучше LTS 20.x). Если сейчас 18.17.1 — можно временно оставить, но лучше обновить позже.
- **Пакеты**: Next.js 15 (App Router), TypeScript, Tailwind, **next-intl v4**.
- **Репозиторий**: GitHub, деплой — Vercel.

---

## 1) Технологии и цели

- **Next.js (App Router)** — современная файловая маршрутизация, Layout/Segment.
- **TypeScript** — строгая типизация.
- **Tailwind CSS** — быстрые стили.
- **next-intl** — мультиязычие (SSR/SSG).
- **Локали**: `en` (дефолт), `it`, `de`, `fr`, `ru`, `zh`.
- **URL-префиксы локалей**: `/en`, `/it`, ... (SEO-дружественно).

---

## 2) Целевая структура проекта

```
abf/
├─ messages/                      # словари переводов (по одному JSON на язык)
│  ├─ en.json
│  ├─ it.json
│  ├─ de.json
│  ├─ fr.json
│  ├─ ru.json
│  └─ zh.json
├─ public/                        # статика (иконки, логотипы)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx               # КОРНЕВОЙ layout: единственные <html>/<body>, импорт globals.css
│  │  └─ [locale]/                # сегмент локали в URL
│  │     ├─ layout.tsx            # локальный провайдер i18n + общий каркас (Header, позже Footer)
│  │     ├─ page.tsx              # главная (Home)
│  │     ├─ language/page.tsx     # выбор языка (сохраняет текущий маршрут)
│  │     ├─ services/page.tsx
│  │     ├─ process/page.tsx
│  │     ├─ compliance/page.tsx
│  │     ├─ partners/page.tsx
│  │     └─ contact/page.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ SiteHeader.tsx        # шапка: лого, навигация, иконка языков
│  │  │  └─ (Footer.tsx позже)
│  │  ├─ home/
│  │  │  ├─ HeroSection.tsx       # блок 1 главной (позже)
│  │  │  └─ InfoSection.tsx       # блок 2 главной (позже)
│  │  └─ ui/                       # атомарные компоненты (опционально)
│  ├─ config/
│  │  └─ nav.ts                    # список ссылок навигации (href/label)
│  ├─ i18n/
│  │  ├─ routing.ts                # locales + defaultLocale
│  │  ├─ request.ts                # загрузка словаря по локали (SSR)
│  │  └─ navigation.ts             # Link/useRouter/usePathname с учётом локали
│  └─ styles/
│     └─ globals.css               # Tailwind + глобальные стили
├─ src/middleware.ts               # редирект / → /en и обработка префиксов локалей
├─ next.config.mjs                 # плагин next-intl, ссылка на src/i18n/request.ts
├─ package.json
└─ tsconfig.json

---

