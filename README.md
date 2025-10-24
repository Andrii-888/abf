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
.
├── eslint.config.mjs
├── messages
│ ├── de
│ │ ├── contact.json
│ │ ├── footer.json
│ │ ├── header.json
│ │ ├── home.json
│ │ ├── index.ts
│ │ ├── language.json
│ │ ├── nav.json
│ │ ├── partners.json
│ │ ├── privacy.json
│ │ ├── process.json
│ │ ├── services.json
│ │ └── terms.json
│ ├── en
│ │ ├── contact.json
│ │ ├── footer.json
│ │ ├── header.json
│ │ ├── home.json
│ │ ├── index.ts
│ │ ├── language.json
│ │ ├── nav.json
│ │ ├── partners.json
│ │ ├── privacy.json
│ │ ├── process.json
│ │ ├── services.json
│ │ └── terms.json
│ ├── fr
│ │ ├── contact.json
│ │ ├── footer.json
│ │ ├── header.json
│ │ ├── home.json
│ │ ├── index.ts
│ │ ├── language.json
│ │ ├── nav.json
│ │ ├── partners.json
│ │ ├── privacy.json
│ │ ├── process.json
│ │ ├── services.json
│ │ └── terms.json
│ ├── it
│ │ ├── contact.json
│ │ ├── footer.json
│ │ ├── header.json
│ │ ├── home.json
│ │ ├── index.ts
│ │ ├── language.json
│ │ ├── nav.json
│ │ ├── partners.json
│ │ ├── privacy.json
│ │ ├── process.json
│ │ ├── services.json
│ │ └── terms.json
│ ├── ru
│ │ ├── contact.json
│ │ ├── footer.json
│ │ ├── header.json
│ │ ├── home.json
│ │ ├── index.ts
│ │ ├── language.json
│ │ ├── nav.json
│ │ ├── partners.json
│ │ ├── privacy.json
│ │ ├── process.json
│ │ ├── services.json
│ │ └── terms.json
│ └── zh
│ ├── contact.json
│ ├── footer.json
│ ├── header.json
│ ├── home.json
│ ├── index.ts
│ ├── language.json
│ ├── nav.json
│ ├── partners.json
│ ├── privacy.json
│ ├── process.json
│ ├── services.json
│ └── terms.json
├── next-env.d.ts
├── next-sitemap.config.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│ ├── favicon.ico
│ ├── images
│ │ └── showcase
│ ├── logo.png
│ ├── og.png
│ ├── robots.txt
│ └── sitemap.xml
├── README.md
├── scripts
│ └── generate-og.mjs
├── src
│ ├── app
│ │ ├── [locale]
│ │ ├── api
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── open
│ │ └── page.tsx
│ ├── components
│ │ ├── ClickShield.tsx
│ │ ├── home
│ │ ├── layout
│ │ ├── qr
│ │ └── ui
│ ├── config
│ │ ├── features.ts
│ │ ├── languages.ts
│ │ └── nav.ts
│ ├── i18n
│ │ ├── navigation.ts
│ │ ├── request.ts
│ │ └── routing.ts
│ ├── middleware.ts
│ ├── seo
│ │ ├── factory.ts
│ │ ├── helpers.ts
│ │ └── meta.ts
│ └── utils
│ └── validation
├── tsconfig.json
└── tsconfig.tsbuildinfo

27 directories, 102 files

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
////////////////////////////////////////////////////////////
Категория Компания Сайт
🇨🇭 Крипто-лицензия Mt Pelerin SA mtpelerin.com

🇨🇭 SRO VQF Bity SA bity.com

🇨🇭 FINMA licensed Bitcoin Suisse AG bitcoinsuisse.com

🇨🇭 Crypto-bank Sygnum Bank AG sygnum.com

🇨🇭 Финтех-провайдер SwissBorg SA swissborg.com

tree -L 3 ./src/app/\[locale\]/contact
