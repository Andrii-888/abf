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
andrei@MacBookAir abf % tree -L 3 src

src
├── app
│ ├── [locale]
│ │ ├── contact
│ │ ├── language
│ │ ├── layout.tsx
│ │ ├── legal
│ │ ├── page.tsx
│ │ ├── partners
│ │ ├── process
│ │ └── services
│ ├── api
│ │ └── contact
│ ├── globals.css
│ ├── layout.tsx
│ ├── open
│ │ ├── layout.tsx
│ │ └── page.tsx
│ └── page.tsx
├── components
│ ├── ClickShield.tsx
│ ├── home
│ │ ├── FeatureCard.tsx
│ │ ├── HeroLeft.tsx
│ │ ├── HeroRight.tsx
│ │ ├── IndustriesCarousel.client.tsx
│ │ └── IndustriesCarouselImpl.tsx
│ ├── layout
│ │ ├── Chrome.tsx
│ │ ├── SiteFooter.tsx
│ │ └── SiteHeader.tsx
│ ├── partners
│ │ ├── PartnersBelowFold.client.tsx
│ │ └── PartnersBelowFoldImpl.tsx
│ ├── qr
│ │ └── QRCodeCard.tsx
│ ├── splashscreen
│ │ └── SplashScreen.tsx
│ └── ui
│ └── Toast.tsx
├── config
│ ├── features.ts
│ ├── industries.ts
│ ├── languages.ts
│ └── nav.ts
├── i18n
│ ├── navigation.ts
│ ├── request.ts
│ └── routing.ts
├── middleware.ts
├── seo
│ ├── factory.ts
│ ├── helpers.ts
│ └── meta.ts
└── utils
└── validation
└── contact.schema.ts

24 directories, 33 files

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

✅ Что мы уже сделали (готово на 100%)

1. Создали полноценную страницу оплаты /open/pay

Работает на Next.js 15, современный UI

На английском, с корректным дизайном

Поддержка USDT / USDC

2. Реализовали переходы и защиту

Добавили стрелку “Назад”

Вставили и настроили баннер “In development”

Сделали автоматический редирект на /en при обновлении, чтобы пользователь не видел “construction mode”

3. Выделили логику в отдельные файлы

PayPageClient.tsx — основная страница

PaymentForm.tsx — форма

TextField.tsx — универсальный UI-инпут

CurrencyToggle.tsx

payValidation.ts — валидация

WalletPanel.tsx

Проект стал читаемым, структурированным и масштабируемым.

4. Настроили UX-поведение как у топовых бирж

Фокус синий, как у Apple

Ошибки выводятся под полем, красным цветом

Никаких «красных рамок» вокруг инпутов (чистый стиль)

Ввод в Amount: только цифры + одна точка, запятая → точка

Все ошибки очищаются, когда пользователь меняет поле

5. Реализовали Wallet-панель

Адрес кошелька

Укороченный вариант адреса

QR-код

Динамический адрес в зависимости от валюты

6. Готова логика успешной отправки данных

Если форма корректна → показываем зелёный статус

Текст центрируется и адаптируется

Нет дублей сообщений, всё чисто

⭐ Итого:

Страница /open/pay уже выглядит и работает как профессиональный криптоплатёжный модуль, полностью совместимый с UX топовых бирж (Binance, Kraken, Coinbase).

🔜 Что нужно сделать дальше (план работ)

Это — то, что превратит модуль из демо в реальный платёжный инструмент.

1. Добавить реальную отправку данных на email / CRM

Сейчас у нас только UI, без backend.

Нужно:

Вариант A — через email (быстро)

Создать /api/pay-notify

Использовать Nodemailer (ты уже установил)

Отправлять:

сумма

валюта

txHash

email клиента

имя

Вариант B — интеграция с CRM / Google Sheets / Notion

Webhook

Автоматическая запись транзакций

2. Защитить адрес доставки USDT/USDC

Чтобы невозможно было подменить адрес кошелька:

Рендерить адрес только сервером

Перенести addresses в server-side модуль (например /open/pay/serverWallet.ts)

Запретить их появление в bundle клиентской стороны

(Сейчас адресы берутся из .env.public, их можно увидеть в браузере.)

3. Добавить проверку транзакции через блокчейн

Варианты:

🔹 Basic (быстро)

Проверяем через API той сети (например Etherscan / PolygonScan / BSCScan):

валидный ли хеш

USD value

совпадает ли адрес получателя

совпадает ли сумма

🔹 Pro (лучший вариант)

Подключение Web3 (ethers.js или viem)

Проверка:

статус “success”

от кого → кому

сумма

токен

4. Добавить AML-механизм (минимальный)

Перед подтверждением платежа:

Сбор email

По необходимости запрос KYC (твой ID + скан)

Минимальный набор процедур

Это требуется по швейцарскому закону, если платежи становятся регулярными.

5. Добавить подтверждение заказа

После успешной проверки транзакции:

Письмо клиенту Payment received

Письмо тебе New payment received

Можно подключить:

SendGrid

Mailgun

Gmail API

6. Добавить страницу “Thank you / Order confirmed”

После успешной оплаты:

/open/pay/success?orderId=XXXX

7. UI улучшения (по желанию)

Анимации (Framer Motion)

Skeleton loading

Модальное окно вместо статуса («We received your payment»)

🚀 Хочешь — идём по этому списку шаг за шагом

Могу предложить оптимальный порядок:

Шаг 1 — API route /api/pay-notify

(чтобы получать реальные транзакции)

Шаг 2 — Перенос адресов USDT/USDC на сервер

(безопасность)

Шаг 3 — Проверка транзакции через блокчейн

(профессиональный уровень)

Шаг 4 — Приветственные письма / CRM

(удобство работы)
