import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, "..", "assets", "icons-pptx");
const SIZE = 512; // px de salida (transparente)

const files = (await readdir(iconsDir)).filter((f) => f.endsWith(".svg"));

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 });

for (const file of files) {
  const svg = await readFile(join(iconsDir, file), "utf8");
  const html = `<!doctype html><html><body style="margin:0">
    <div style="width:${SIZE}px;height:${SIZE}px;display:flex;align-items:center;justify-content:center">
      ${svg.replace(/width="\d+" height="\d+"/, `width="${SIZE}" height="${SIZE}"`)}
    </div></body></html>`;
  await page.setContent(html);
  const out = join(iconsDir, file.replace(/\.svg$/, ".png"));
  await page.screenshot({ path: out, omitBackground: true });
  console.log("OK", out);
}

await browser.close();
