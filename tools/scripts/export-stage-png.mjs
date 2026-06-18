import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

// toolsRoot: pdf.css y salida dist. repoRoot: web (index.html, i18n).
const toolsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(toolsRoot, "..");
const requested = process.argv.slice(2);
const langs = requested.length ? requested : ["es"];

for (const lang of langs) {
  if (!["es", "en"].includes(lang)) {
    console.error(`Idioma no soportado: ${lang} (usar "es" y/o "en")`);
    process.exit(1);
  }
}

const browser = await puppeteer.launch();
try {
  await mkdir(path.join(toolsRoot, "dist"), { recursive: true });

  for (const lang of langs) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 990, deviceScaleFactor: 4 });
    await page.goto(pathToFileURL(path.join(repoRoot, "index.html")).href, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });
    await page.addStyleTag({ path: path.join(toolsRoot, "pdf.css") });
    // Tarjetas con el mismo color pero sólido: su rgba al 75% dejaría
    // traslúcido el texto blanco sobre slides claras.
    await page.addStyleTag({
      content: `
        .svc-card {
          background: rgb(18, 18, 21) !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
      `,
    });

    if (lang === "en") {
      const dict = JSON.parse(
        await readFile(path.join(repoRoot, "i18n", "en.json"), "utf8")
      );
      await page.evaluate((dict) => {
        for (const el of document.querySelectorAll("[data-i18n]")) {
          const key = el.getAttribute("data-i18n");
          if (dict[key] !== undefined) el.innerHTML = dict[key];
        }
      }, dict);
    }

    await page.evaluate(() => document.fonts.ready);

    // Las tarjetas sobresalen de .stage: capturar la unión de todos sus hijos
    const PAD = 16;
    const clip = await page.evaluate((pad) => {
      const stage = document.querySelector(".stage");
      let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
      for (const el of [stage, ...stage.querySelectorAll("*")]) {
        const box = el.getBoundingClientRect();
        if (!box.width && !box.height) continue;
        l = Math.min(l, box.left);
        t = Math.min(t, box.top);
        r = Math.max(r, box.right);
        b = Math.max(b, box.bottom);
      }
      return {
        x: l - pad + window.scrollX,
        y: t + window.scrollY, // sin pad arriba: el título de la sección queda justo encima
        width: r - l + pad * 2,
        height: b - t + pad,
      };
    }, PAD);

    // Transparencia por doble captura (negro/blanco) en vez de omitBackground:
    // Chromium satura el alfa de glows, sombras y trazos semitransparentes
    // cuando renderiza directo sobre lienzo transparente.
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.id = "bg-swap";
      document.head.appendChild(style);
    });
    const captureOn = async (color) => {
      await page.evaluate((color) => {
        document.getElementById("bg-swap").textContent =
          `html, body, .servicios { background: ${color} !important; }`;
      }, color);
      return await page.screenshot({ clip, encoding: "base64" });
    };
    const onBlack = await captureOn("#000");
    const onWhite = await captureOn("#fff");

    // Recuperar color y alfa reales: alpha = 1 - (blanco - negro) / 255;
    // color = negro / alpha. Se resuelve en un canvas dentro del navegador.
    const dataUrl = await page.evaluate(
      async (b64Black, b64White) => {
        const load = (b64) =>
          new Promise((res, rej) => {
            const img = new Image();
            img.onload = () => res(img);
            img.onerror = rej;
            img.src = "data:image/png;base64," + b64;
          });
        const [black, white] = await Promise.all([load(b64Black), load(b64White)]);
        const canvas = document.createElement("canvas");
        canvas.width = black.width;
        canvas.height = black.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(black, 0, 0);
        const dataB = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(white, 0, 0);
        const dataW = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const out = ctx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < dataB.data.length; i += 4) {
          const aR = 255 - (dataW.data[i] - dataB.data[i]);
          const aG = 255 - (dataW.data[i + 1] - dataB.data[i + 1]);
          const aB = 255 - (dataW.data[i + 2] - dataB.data[i + 2]);
          const a = Math.max(0, Math.min(255, (aR + aG + aB) / 3));
          out.data[i + 3] = a;
          if (a > 0) {
            out.data[i] = Math.min(255, (dataB.data[i] * 255) / a);
            out.data[i + 1] = Math.min(255, (dataB.data[i + 1] * 255) / a);
            out.data[i + 2] = Math.min(255, (dataB.data[i + 2] * 255) / a);
          }
        }
        ctx.putImageData(out, 0, 0);
        return canvas.toDataURL("image/png");
      },
      onBlack,
      onWhite
    );

    const out = path.join(toolsRoot, "dist", `grafico-ai-ready-${lang}.png`);
    await writeFile(out, Buffer.from(dataUrl.split(",")[1], "base64"));
    console.log(`OK → ${path.relative(toolsRoot, out)}`);
    await page.close();
  }
} finally {
  await browser.close();
}
