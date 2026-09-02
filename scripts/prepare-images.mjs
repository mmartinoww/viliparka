/**
 * Converts the source photography (crawled from the legacy site) into sized WebP
 * assets under public/. Sources are 1-1.2 MB JPEGs straight off phone cameras, so
 * every output is capped and re-encoded.
 *
 * Run once after `npm install`:  npm run images
 */
import { mkdir, readdir, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, "../../../.crawl/img");
const OUT = resolve(here, "../public");

/** [sourceFile, outputPath, maxWidth] */
const jobs = [
  // --- Property & pool -----------------------------------------------------
  ["84177573_805773519849538_1923606222838169600_n.jpg", "property/pool-winter.webp", 1600],
  ["109808070_919420825151473_6091044779626840698_n.jpg", "property/pool-summer.webp", 1600],
  ["8edffa4a-369e-4d30-a579-8090275616b4.jpg", "property/aerial-winter.webp", 1800],
  ["c5cc547c-c12c-4539-9af9-ee83c4ecc2a2.jpg", "property/garden-aerial.webp", 1600],
  ["c6edae41-ad94-41ea-98e3-a5d93c3d3ca41.jpg", "property/garden-dusk.webp", 1400],
  ["444444.jpg", "property/garden-lawn.webp", 1400],
  ["1451333847_Untitled_Panorama2-copy.jpg", "property/rila-panorama.webp", 1800],

  // --- House 1 -------------------------------------------------------------
  ["1df2bfef-a9c5-472e-852c-13170e7e0b33.jpg", "houses/house-1-facade.webp", 1400],
  ["387799931_802734535195582_2955409850507348675_n.jpg", "houses/house-1-flowers.webp", 1400],
  ["386368776_802734561862246_1201509866828051772_n.jpg", "houses/house-1-veranda.webp", 1400],
  ["fbab8441-50ee-4ded-9dae-2220bae75341.jpg", "houses/house-1-bathroom.webp", 1200],
  ["c9166de1-5593-4212-8bc1-83007729c8ec.jpg", "houses/house-1-bedroom.webp", 1400],

  // --- House 2 -------------------------------------------------------------
  ["0.jpg", "houses/house-2-bedroom.webp", 1200],
  ["000.jpg", "houses/house-2-living.webp", 1200],
  ["00.jpg", "houses/house-2-bathroom.webp", 1200],

  // --- House 3 -------------------------------------------------------------
  ["f6e69780-4090-43dd-ad53-43753e58bbba.jpg", "houses/house-3-dining.webp", 1200],
  ["b8bc2629-8d55-4ebf-9941-8aad88ddfd281.jpg", "houses/house-3-bathroom.webp", 1200],

  // --- House 4 -------------------------------------------------------------
  ["111111.jpg", "houses/house-4-facade.webp", 1600],
  ["444.jpg", "houses/house-4-living.webp", 1400],
  ["4444444.jpg", "houses/house-4-kitchen.webp", 1400],
  ["44.jpg", "houses/house-4-bedroom.webp", 1400],
  ["44444444444.jpg", "houses/house-4-bedroom-2.webp", 1400],
  ["4b58dd87-2772-4d01-824e-7eab624d6bd6.jpg", "houses/house-4-bathroom.webp", 1200],

  // --- Surroundings --------------------------------------------------------
  ["1697651584_sap1.jpg", "around/geyser.webp", 1400],
  ["77.jpg", "around/seven-rila-lakes.webp", 1600],
  ["272455673_1556560821395858_8137292265380181109_n-1024x768.webp", "around/rila-monastery.webp", 1024],
  ["ed68a8.jpg", "around/rila-monastery-night.webp", 1100],
  ["316965138_685523136470900_5385253364349216558_n.jpg", "around/crater-lake.webp", 1600],
  ["_D0_A0_D0_B8_D0_BB_D1_81_D0_BA_D0_B8-_D0_B5_D0_B7_D0_B5_D1_80_D0_B0.jpg", "around/rila-lake-winter.webp", 1400]
];

/** Files copied verbatim (already small / need transparency). */
const copies = [
  ["0-removebg-preview.png", "identity/logo-parka.png"],
  ["favicon.png", "icons/icon-source.png"]
];

async function run() {
  const available = new Set(await readdir(SRC));
  let converted = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const [source, target, maxWidth] of jobs) {
    if (!available.has(source)) {
      console.warn(`  skip (missing source): ${source}`);
      continue;
    }
    const outPath = join(OUT, target);
    await mkdir(dirname(outPath), { recursive: true });

    const input = sharp(join(SRC, source), { failOn: "none" }).rotate();
    const { width } = await input.metadata();
    const info = await input
      .resize({ width: Math.min(width ?? maxWidth, maxWidth), withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(outPath);

    bytesOut += info.size;
    converted += 1;
    console.log(`  ${target}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }

  for (const [source, target] of copies) {
    if (!available.has(source)) continue;
    const outPath = join(OUT, target);
    await mkdir(dirname(outPath), { recursive: true });
    await copyFile(join(SRC, source), outPath);
    console.log(`  ${target}  (copied)`);
  }

  // Square social card cropped from the signature winter pool shot.
  if (available.has("84177573_805773519849538_1923606222838169600_n.jpg")) {
    const ogPath = join(OUT, "identity/og-image.jpg");
    await mkdir(dirname(ogPath), { recursive: true });
    await sharp(join(SRC, "84177573_805773519849538_1923606222838169600_n.jpg"))
      .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
      .jpeg({ quality: 82 })
      .toFile(ogPath);
    console.log("  identity/og-image.jpg  1200x630");
  }

  console.log(
    `\nDone: ${converted} images converted, ~${(bytesOut / 1024 / 1024).toFixed(1)} MB written.`
  );
  if (bytesIn) console.log(`Source size was ${(bytesIn / 1024 / 1024).toFixed(1)} MB.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
