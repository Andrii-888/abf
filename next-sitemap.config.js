/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Локали и страницы
const LOCALES = ["en", "de", "fr", "it", "ru", "zh"];
const PATHS = [
  "/", // главная
  "/services",
  "/process",
  "/partners",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
];

// Сформировать hreflang-альтернативы для относительного пути (без локали)
function makeAlternates(rest) {
  const href = (l) => `${siteUrl}/${l}${rest}`;
  return [
    { hreflang: "en", href: href("en") },
    { hreflang: "de", href: href("de") },
    { hreflang: "fr", href: href("fr") },
    { hreflang: "it", href: href("it") },
    { hreflang: "ru", href: href("ru") },
    { hreflang: "zh-Hans", href: href("zh") },
    { hreflang: "x-default", href: href("en") },
  ];
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // один файл карты (удобнее)
  generateIndexSitemap: false,
  sitemapSize: 7000,

  // исключаем корень без локали и страницу выбора языка
  exclude: ["/", "/open", "/(.*)/language"],

  // Автогенерация для найденных роутов (пропускаем корень без локали)
  transform: async (config, path) => {
    if (path === "/") return null;

    const segs = path.split("/").filter(Boolean);
    // rest = часть пути без первой секции (локали)
    const rest = "/" + segs.slice(1).join("/"); // '/' либо '/services' и т.п.
    const normalizedRest = rest === "/" ? "" : rest;

    return {
      loc: `${siteUrl}${path}`,
      changefreq: "weekly",
      priority: 0.8,
      alternateRefs: makeAlternates(normalizedRest),
    };
  },

  // Явно добавляем все локали для всех страниц
  additionalPaths: async () => {
    const entries = [];

    for (const rest of PATHS) {
      const normalizedRest = rest === "/" ? "" : rest;

      for (const l of LOCALES) {
        entries.push({
          loc: `${siteUrl}/${l}${normalizedRest}`,
          changefreq: "weekly",
          priority: rest === "/" ? 0.9 : 0.8,
          alternateRefs: makeAlternates(normalizedRest),
        });
      }
    }

    return entries;
  },
};
