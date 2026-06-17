import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requested = process.argv.slice(2);
const langs = requested.length ? requested : ["es", "en"];

for (const lang of langs) {
  if (!["es", "en"].includes(lang)) {
    console.error(`Idioma no soportado: ${lang} (usar "es" y/o "en")`);
    process.exit(1);
  }
}

const browser = await puppeteer.launch();
try {
  await mkdir(path.join(root, "dist"), { recursive: true });

  for (const lang of langs) {
    const page = await browser.newPage();
    // 1px ≈ 1pt → A4 portrait a 96dpi (794×1123) para captura coherente
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(path.join(root, "onepager.html")).href, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });

    if (lang === "en") {
      const dict = JSON.parse(
        await readFile(path.join(root, "i18n", "en.json"), "utf8")
      );
      const missing = await page.evaluate((dict) => {
        const missing = [];
        document.documentElement.lang = "en";
        if (dict["meta.title"]) document.title = dict["meta.title"];
        for (const el of document.querySelectorAll("[data-i18n]")) {
          const key = el.getAttribute("data-i18n");
          if (dict[key] === undefined) {
            missing.push(key);
            continue;
          }
          el.innerHTML = dict[key];
        }
        return missing;
      }, dict);
      for (const key of missing) {
        console.warn(`[en] clave faltante en en.json (queda en español): ${key}`);
      }
    }

    await page.evaluate(() => document.fonts.ready);

    const out = path.join(root, "dist", `kinetic-onepager-${lang}.pdf`);
    await page.pdf({
      path: out,
      format: "A4",
      landscape: false,
      printBackground: true,
      pageRanges: "1",
    });

    // PNG para verificación visual rápida
    const png = path.join(root, "dist", `kinetic-onepager-${lang}.png`);
    await page.screenshot({ path: png, fullPage: true });

    console.log(`OK → ${path.relative(root, out)}  (+ ${path.basename(png)})`);
    await page.close();
  }
} finally {
  await browser.close();
}
