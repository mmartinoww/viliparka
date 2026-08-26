import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3311";
const OUT = ".screenshots";

const settle = async (page) => {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
};

/** Screenshot the element that owns a given selector, padded to full width. */
const shootSection = async (page, selector, file) => {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await el.screenshot({ path: `${OUT}/${file}.png` });
  console.log(file);
};

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 940 },
    locale: "bg-BG",
    reducedMotion: "reduce"
  });

  // --- Home, section by section (Bulgarian, since locale is bg-BG) ---
  const home = await ctx.newPage();
  await home.goto(BASE + "/", { waitUntil: "networkidle" });
  await home.waitForTimeout(900);
  await home.screenshot({ path: `${OUT}/01-hero.png` });
  console.log("01-hero");
  await settle(home);
  await shootSection(home, "section[aria-labelledby='about-heading']", "02-about");
  await shootSection(home, "#houses", "03-houses");
  await shootSection(home, "#pool", "04-pool");
  await shootSection(home, "section[aria-labelledby='amenities-heading']", "05-amenities");
  await shootSection(home, "section[aria-labelledby='around-heading']", "06-around");
  await shootSection(home, "section[aria-labelledby='faq-heading']", "07-faq");
  await shootSection(home, "section[aria-labelledby='cta-heading']", "08-cta");
  await shootSection(home, ".site-footer", "09-footer");

  // Pinned header state
  await home.mouse.wheel(0, 1500);
  await home.waitForTimeout(800);
  await home.screenshot({ path: `${OUT}/10-header-pinned.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });
  console.log("10-header-pinned");

  await home.close();

  // --- English ---
  const enPage = await ctx.newPage();
  await enPage.goto(BASE + "/", { waitUntil: "networkidle" });
  await enPage.locator(".site-header__actions .lang-switch__option").nth(1).click();
  await enPage.waitForTimeout(900);
  await enPage.screenshot({ path: `${OUT}/11-hero-en.png` });
  console.log("11-hero-en");
  await enPage.close();

  // --- House page ---
  const house = await ctx.newPage();
  await house.goto(BASE + "/vili/kashta-4/", { waitUntil: "networkidle" });
  await house.waitForTimeout(900);
  await house.screenshot({ path: `${OUT}/12-house-hero.png` });
  await settle(house);
  await shootSection(house, "section[aria-labelledby='house-detail-heading']", "13-house-detail");
  await shootSection(house, "section[aria-labelledby='house-gallery-heading']", "14-house-gallery");
  await shootSection(house, "section[aria-labelledby='other-houses-heading']", "15-house-nav");
  await house.close();

  // --- Around page ---
  const around = await ctx.newPage();
  await around.goto(BASE + "/zabelezhitelnosti/", { waitUntil: "networkidle" });
  await around.waitForTimeout(900);
  await around.screenshot({ path: `${OUT}/16-around-hero.png` });
  await settle(around);
  await shootSection(around, ".around-block", "17-around-block");
  await around.close();

  // --- Gallery page ---
  const gallery = await ctx.newPage();
  await gallery.goto(BASE + "/galeriya/", { waitUntil: "networkidle" });
  await settle(gallery);
  await gallery.evaluate(() => window.scrollTo(0, 700));
  await gallery.waitForTimeout(600);
  await gallery.screenshot({ path: `${OUT}/18-gallery.png` });
  console.log("18-gallery");
  await gallery.locator(".gallery-tile").first().click();
  await gallery.waitForTimeout(800);
  await gallery.screenshot({ path: `${OUT}/19-lightbox.png` });
  console.log("19-lightbox");
  await gallery.close();

  // --- Mobile ---
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "bg-BG",
    reducedMotion: "reduce"
  });
  const m = await mobile.newPage();
  await m.goto(BASE + "/", { waitUntil: "networkidle" });
  await m.waitForTimeout(800);
  await m.screenshot({ path: `${OUT}/20-mobile-hero.png` });
  await m.locator(".site-header__menuToggle").click();
  await m.waitForTimeout(800);
  await m.screenshot({ path: `${OUT}/21-mobile-menu.png` });
  console.log("mobile");
  await m.close();

  await browser.close();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
