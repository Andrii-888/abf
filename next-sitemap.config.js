/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // создаст robots.txt автоматически
  sitemapSize: 7000, // стандартно: до 7k URL на файл

  exclude: [
    "/open", // dev/demo зона
    "/(.*)/language", // выбор языка — не индексируем
  ],

  alternateRefs: [
    { hrefLang: "en", href: `${siteUrl}/en` },
    { hrefLang: "de", href: `${siteUrl}/de` },
    { hrefLang: "fr", href: `${siteUrl}/fr` },
    { hrefLang: "it", href: `${siteUrl}/it` },
    { hrefLang: "ru", href: `${siteUrl}/ru` },
    { hrefLang: "zh-Hans", href: `${siteUrl}/zh` },
    { hrefLang: "x-default", href: `${siteUrl}/en` },
  ],

  // Генерация hreflang для всех страниц
  transform: async (config, path) => {
    if (path === "/") return null; // пропускаем корень без локали

    const segs = path.split("/").filter(Boolean);
    const rest = "/" + segs.slice(1).join("/");

    const alternateRefs = [
      { hrefLang: "en", href: `${siteUrl}/en${rest}` },
      { hrefLang: "de", href: `${siteUrl}/de${rest}` },
      { hrefLang: "fr", href: `${siteUrl}/fr${rest}` },
      { hrefLang: "it", href: `${siteUrl}/it${rest}` },
      { hrefLang: "ru", href: `${siteUrl}/ru${rest}` },
      { hrefLang: "zh-Hans", href: `${siteUrl}/zh${rest}` },
      { hrefLang: "x-default", href: `${siteUrl}/en${rest}` },
    ];

    return {
      loc: `${siteUrl}${path}`,
      changefreq: "weekly",
      priority: 0.8,
      alternateRefs,
    };
  },
};
