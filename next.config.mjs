// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Отключаем встроенный ESLint при билде Next.js
    // (линт выполняется отдельно через `npm run lint`)
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
