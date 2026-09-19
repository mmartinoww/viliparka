/**
 * Download images from live todorica.com via Playwright.
 * Run: npm run crawl-todorica  (or node scripts/crawl-todorica.mjs)
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const imgDir = resolve(here, "../../todorica-gh/research/img");
const researchDir = resolve(here, "../../todorica-gh/research");

const pages = [
  ["home", "https://www.todorica.com/"],
  ["about", "https://www.todorica.com/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE/%D0%B7%D0%B0-%D1%82%D0%BE%D0%B4%C3%B2%D1%80%D0%B8%D1%86%D0%B0"],
  ["rooms", "https://www.todorica.com/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE/%D1%81%D1%82%D0%B0%D0%B8-%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D0%BD%D1%8F%D0%B2%D0%B0%D0%BD%D0%B5"],
  ["mehana", "https://www.todorica.com/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE/%D0%BC%D0%B5%D1%85%D0%B0%D0%BD%D0%B0-%D0%B8-%D1%82%D0%B5%D1%80%D0%B0%D1%81%D0%B0"],
  ["prices", "https://www.todorica.com/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE/%D1%86%D0%B5%D0%BD%D0%B8-%D0%B8-%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F"],
  ["contact", "https://www.todorica.com/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B8"],
  ["around", "https://www.todorica.com/%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE/%D0%BE%D0%BA%D0%BE%D0%BB%D0%BE-%D1%82%D0%BE%D0%B4%C3%B2%D1%80%D0%B8%D1%86%D0%B0"]
];

await mkdir(imgDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "bg-BG" });
const seen = new Map();
const manifest = [];

for (const [slug, url] of pages) {
  const page = await ctx.newPage();
  page.on("response", async (res) => {
    const u = res.url();
    if (!u.includes("googleusercontent.com") || res.status() !== 200) return;
    const key = u.split("=")[0];
    if (seen.has(key)) {
      seen.get(key).pages.add(slug);
      return;
    }
    try {
      const buf = await res.body();
      if (buf.length < 5000) return;
      const hash = createHash("sha1").update(key).digest("hex").slice(0, 12);
      const file = `pw-${hash}.jpg`;
      await writeFile(join(imgDir, file), buf);
      seen.set(key, { file, url: u, bytes: buf.length, pages: new Set([slug]) });
      manifest.push({ file, url: u, bytes: buf.length, pages: [slug] });
      console.log(`OK ${file} from ${slug}`);
    } catch {
      /* skip */
    }
  });

  console.log(`Loading ${slug}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 300));
    }
  });
  await page.waitForTimeout(2000);
  await page.close();
}

for (const entry of manifest) {
  const key = entry.url.split("=")[0];
  entry.pages = [...seen.get(key).pages];
}

await writeFile(join(researchDir, "images-playwright.json"), JSON.stringify(manifest, null, 2));
console.log(`\nPlaywright downloaded ${manifest.length} images → ${imgDir}`);
await browser.close();
