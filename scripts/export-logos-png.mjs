import { readdir, mkdir, readFile } from "node:fs/promises";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logosDir = join(__dirname, "..", "img", "logos");
const outDir = join(__dirname, "..", "img", "logos-pptx");
const HEIGHT = 256; // alto de salida en px (el ancho se ajusta solo)

await mkdir(outDir, { recursive: true });
const files = (await readdir(logosDir)).filter((f) =>
  [".svg", ".png"].includes(extname(f).toLowerCase())
);

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 600, deviceScaleFactor: 1 });

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const mime = ext === ".svg" ? "image/svg+xml" : "image/png";
  const data = await readFile(join(logosDir, file));
  const src = `data:${mime};base64,${data.toString("base64")}`;
  await page.setContent(
    `<!doctype html><html><body style="margin:0">
      <img id="logo" src="${src}"
        style="height:${HEIGHT}px;width:auto;display:block;filter:brightness(0) invert(1)" />
    </body></html>`
  );
  await page.waitForSelector("#logo");
  try {
    await page.waitForFunction(
      () => {
        const img = document.getElementById("logo");
        return img.complete && img.naturalWidth > 0;
      },
      { timeout: 10000 }
    );
    const el = await page.$("#logo");
    const out = join(outDir, basename(file, extname(file)) + ".png");
    await el.screenshot({ path: out, omitBackground: true });
    console.log("OK", out);
  } catch (err) {
    console.error("FALLO", file, "-", err.message);
  }
}

await browser.close();
