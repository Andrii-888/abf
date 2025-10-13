# ABF — Fintech Platform (Next.js + TypeScript + i18n)

This is a [Next.js](https://nextjs.org) multilingual fintech platform powered by [`next-intl`](https://next-intl-docs.vercel.app) for internationalization, Tailwind CSS for UI, and TypeScript for type safety.

---

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open http://localhost:3000
to see the result.

🧩 Project Overview
Stack Description
Framework Next.js 15 (App Router)

Language TypeScript 5.9

Styling Tailwind CSS v4

i18n next-intl v4

Deployment Vercel Platform

Node version ≥ 18.18 (LTS 20 recommended)

🌍 Localization

Supported locales:

en (default), it, de, fr, ru, zh

URL structure:
Each page is automatically prefixed with a locale — for example:

/en/services /it/services /fr/services

All translation files live in:

messages/<locale>/\*.json

Each folder contains JSON dictionaries: home.json, services.json, footer.json, etc.
They are combined via an index.ts file exporting all translations per locale.

📂 Project Structure
abf/
├─ messages/
│ ├─ en/
│ │ ├─ home.json
│ │ ├─ services.json
│ │ └─ ...
│ ├─ it/
│ ├─ de/
│ ├─ fr/
│ ├─ ru/
│ └─ zh/
│
├─ public/ # Static files (logos, icons, etc.)
├─ src/
│ ├─ app/
│ │ ├─ layout.tsx # Root layout with <html>/<body>
│ │ └─ [locale]/
│ │ ├─ layout.tsx # Locale provider (NextIntlClientProvider + Chrome)
│ │ ├─ page.tsx # Home
│ │ ├─ services/page.tsx
│ │ ├─ contact/page.tsx
│ │ └─ ...
│ │
│ ├─ components/
│ │ ├─ layout/
│ │ │ ├─ SiteHeader.tsx
│ │ │ └─ SiteFooter.tsx
│ │ ├─ home/
│ │ └─ ui/
│ │
│ ├─ config/
│ │ └─ nav.ts
│ │
│ ├─ i18n/
│ │ ├─ routing.ts
│ │ ├─ request.ts
│ │ └─ navigation.ts
│ │
│ └─ styles/
│ └─ globals.css
│
├─ src/middleware.ts # Locale redirect / → /en
├─ next.config.mjs # next-intl plugin
├─ package.json
└─ tsconfig.json

🧱 Development Commands
Command Description
npm run dev Start local dev server
npm run lint Run ESLint
npm run type-check Run TypeScript check (tsc --noEmit)
npm run build Build production bundle
npm run predeploy Run all checks before deployment
vercel --prod Deploy to production (Vercel)
💡 Notes

Before deployment, always run:

npm run predeploy

to catch type or lint errors early.

Each new language must contain its own index.ts in messages/<locale>/
importing and exporting all .json files.

Root layout must include <html> and <body> — required by Next 15.

🌐 Deployment

Deploy directly to Vercel:

vercel --prod

After build success, you’ll receive a production URL like:

https://abf-yourproject.vercel.app

📘 Learn More

Next.js Docs

next-intl Docs

Tailwind CSS Docs

Vercel Deployment Guide
