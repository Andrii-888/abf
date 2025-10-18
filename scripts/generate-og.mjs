// scripts/generate-og.mjs
import fs from "node:fs/promises";
import sharp from "sharp";
import path from "node:path";

const ROOT = process.cwd();
const IN = path.join(ROOT, "public", "logo.png"); // исходник
const OUT = path.join(ROOT, "public", "og.png"); // результат 1200x630

const WIDTH = 1200;
const HEIGHT = 630;

// 1) SVG-фон (градиент + рамка) — рендерим в PNG
const bgSvg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#EAF8F4"/>
      <stop offset="100%" stop-color="#F7F0D8"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <!-- мягкое пятно -->
  <ellipse cx="930" cy="110" rx="420" ry="220" fill="#1ABC9C" opacity="0.13"/>
  <ellipse cx="260" cy="560" rx="420" ry="220" fill="#D4AF37" opacity="0.16"/>
  <!-- тонкая рамка -->
  <rect x="10" y="10" width="${WIDTH - 20}" height="${
  HEIGHT - 20
}" fill="none" stroke="#E2E8F0" stroke-width="2" rx="24"/>
</svg>
`;

async function main() {
  // Проверим, что логотип существует
  try {
    await fs.access(IN);
  } catch {
    console.error(
      "❌ Не найден public/logo.png — положи логотип сюда и повтори."
    );
    process.exit(1);
  }

  // 2) Сгенерим фон
  const bgPng = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  // 3) Подготовим логотип (впишем в 720×300, чтобы красиво влезал)
  const logoBuf = await sharp(IN)
    .resize({
      width: 720,
      height: 300,
      fit: "inside",
      withoutEnlargement: true,
    })
    .png()
    .toBuffer();

  // 4) Текстовый оверлей через SVG (название + подзаголовок)
  const title = "Alpine Bridge Finance";
  const subtitle = "Crypto • Fiat • Gold — Switzerland";
  const textSvg = `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .title { font: 700 54px/1.1 Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; fill: #0f172a; }
      .sub   { font: 500 28px/1.3 Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; fill: #334155; }
    </style>
    <text x="600" y="415" text-anchor="middle" class="title">${title}</text>
    <text x="600" y="458" text-anchor="middle" class="sub">${subtitle}</text>
  </svg>`;

  const textBuf = await sharp(Buffer.from(textSvg)).png().toBuffer();

  // 5) Склеим слои: фон → логотип по центру → текст
  const composed = await sharp(bgPng)
    .composite([
      {
        input: logoBuf,
        top: Math.round((HEIGHT - 300) / 2) - 50,
        left: Math.round((WIDTH - 720) / 2),
      }, // логотип немного выше центра
      { input: textBuf, top: 0, left: 0 },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // 6) Сохраним
  await fs.writeFile(OUT, composed);
  console.log(`✅ OG image saved: ${OUT} (1200x630)`);
}

main().catch((e) => {
  console.error("❌ Ошибка генерации OG:", e);
  process.exit(1);
});
