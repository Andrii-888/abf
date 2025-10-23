/* eslint-env node */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Отключаем встроенный ESLint при билде Next.js
    // (линт выполняется отдельно через `npm run lint`)
    ignoreDuringBuilds: true,
  },

  // 💡 Включаем лёгкие оптимизации сборки
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default withNextIntl(nextConfig);
