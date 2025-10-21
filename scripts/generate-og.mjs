// scripts/generate-og.mjs
import { promises as fs } from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const ROOT = process.cwd();
const OUT_PNG = path.join(ROOT, "public", "og.png");
const LOGO = path.join(ROOT, "public", "logo.png");

// OG size
const width = 1200;
const height = 630;

// inline logo
const logoBuf = await fs.readFile(LOGO);
const logoDataUri = `data:image/png;base64,${logoBuf.toString("base64")}`;

// === Fonts: use non-variable Noto Sans TTF ===
const FONT_REGULAR = path.join(ROOT, "public", "fonts", "NotoSans-Regular.ttf");
const FONT_BOLD = path.join(ROOT, "public", "fonts", "NotoSans-Bold.ttf");

const fontRegular = await fs.readFile(FONT_REGULAR).catch(() => {
  throw new Error(`Font not found: ${FONT_REGULAR}`);
});
const fontBold = await fs.readFile(FONT_BOLD).catch(() => {
  throw new Error(`Font not found: ${FONT_BOLD}`);
});

// Layout
const jsx = {
  type: "div",
  props: {
    style: {
      width,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#ffffff",
    },
    children: {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 24,
        },
        children: [
          {
            type: "img",
            props: {
              src: logoDataUri,
              width: 160,
              height: 160,
              style: { display: "block", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.12))" },
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontFamily: "Noto Sans",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: -0.5,
                display: "flex",
                gap: 12,
                textShadow: "0 3px 6px rgba(0,0,0,0.15)", // мягкая глубокая тень
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: { color: "#d4af37" }, // Gold — Alpine
                    children: "Alpine",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { color: "#1abc9c" }, // Emerald — Bridge
                    children: "Bridge",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { color: "#c0392b" }, // Wine — Finance
                    children: "Finance",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
};

// Render to SVG -> PNG
const svg = await satori(jsx, {
  width,
  height,
  fonts: [
    { name: "Noto Sans", data: fontRegular, weight: 400, style: "normal" },
    { name: "Noto Sans", data: fontBold, weight: 700, style: "normal" },
  ],
});

const png = new Resvg(svg, { background: "transparent", fitTo: { mode: "width", value: width } })
  .render()
  .asPng();

await fs.writeFile(OUT_PNG, png);
console.log(`✅ OG image generated: ${path.relative(ROOT, OUT_PNG)} (${width}x${height})`);
