// src/app/layout.tsx
import "./globals.css";

// определяем базовый URL (prod → из ENV, иначе локальный)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata = {
  metadataBase: new URL(siteUrl), // ← главное: база для OG/Twitter

  title: "AlpineBridgeFinance",
  description:
    "Swiss platform connecting crypto, fiat, and gold with full compliance, professional guidance, and partner network.",

  icons: {
    icon: [
      { url: "/favicon.ico?v=4", sizes: "any" },
      { url: "/favicon-32.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png?v=4", type: "image/png", sizes: "16x16" },
    ],
    apple: { url: "/apple-touch-icon.png?v=4" },
  },

  openGraph: {
    title: "AlpineBridgeFinance",
    description:
      "Your trusted Swiss bridge between crypto, fiat, and gold — secure, transparent, and compliant.",
    url: "/", // будет резолвиться относительно metadataBase
    siteName: "AlpineBridgeFinance",
    images: ["/og.png"], // положи /public/og.png (1200×630)
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AlpineBridgeFinance",
    description:
      "Your trusted bridge between crypto, fiat, and gold — secure Swiss-compliant exchanges.",
    images: ["/og.png"], // тот же файл можно использовать
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <head>
        {/* дублируем фавиконки для надёжности и сброса кэша */}
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-32.png?v=4" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16.png?v=4" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=4" />
      </head>
      <body>{children}</body>
    </html>
  );
}
