// Exporta los 5 chips de servicio del gráfico AI-READY (.stage en index.html)
// como PNG individuales de 256x256 con fondo transparente. Cada chip es el
// recuadro redondeado .svc-ic tal cual se ve: fondo naranja translúcido, borde
// y el icono de trazo. Los SVG se extraen en runtime desde index.html para no
// duplicar el markup y quedar siempre en sync con el diseño.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Selector de cada nodo del orbit -> nombre de archivo de salida.
const ICONS = [
  { sel: ".svc-scan", name: "ai-scan" },
  { sel: ".svc-governance", name: "ai-governance" },
  { sel: ".svc-training", name: "ai-training" },
  { sel: ".svc-talent", name: "ai-talent" },
  { sel: ".svc-agentic", name: "agentic-ai" },
];

// El chip original mide 32px (icono 16px). Lo renderizamos a 64px CSS con
// deviceScaleFactor 4 -> salida 256x256. stroke-width va en unidades del
// viewBox (0 0 24), así que es independiente de la escala y se mantiene fiel.
const CHIP = 64;
const ICON = 32;
const RADIUS = CHIP * (9 / 32);
const BORDER = CHIP * (1 / 32);

const browser = await puppeteer.launch();
try {
  await mkdir(path.join(root, "dist", "icons"), { recursive: true });

  // 1) Levantar index.html y extraer el markup interno de cada icono.
  const src = await browser.newPage();
  await src.goto(pathToFileURL(path.join(root, "index.html")).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  const svgs = await src.evaluate((icons) => {
    const out = {};
    for (const { sel } of icons) {
      const svg = document.querySelector(`${sel} .svc-ic svg`);
      out[sel] = svg ? svg.innerHTML : null;
    }
    return out;
  }, ICONS);
  await src.close();

  const missing = ICONS.filter((i) => !svgs[i.sel]);
  if (missing.length) {
    throw new Error(
      `No se encontró el SVG de: ${missing.map((m) => m.sel).join(", ")}`
    );
  }

  // 2) Renderizar cada chip aislado y exportarlo con alfa real.
  const page = await browser.newPage();
  await page.setViewport({ width: CHIP, height: CHIP, deviceScaleFactor: 4 });

  for (const { sel, name } of ICONS) {
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      html, body { margin: 0; padding: 0; }
      #bg { width: ${CHIP}px; height: ${CHIP}px; }
      .svc-ic {
        width: ${CHIP}px; height: ${CHIP}px;
        border-radius: ${RADIUS}px;
        background: rgba(255, 102, 0, 0.1);
        border: ${BORDER}px solid rgba(255, 102, 0, 0.22);
        display: flex; align-items: center; justify-content: center;
        box-sizing: border-box;
      }
      .svc-ic svg {
        width: ${ICON}px; height: ${ICON}px;
        stroke: #FF8A33; stroke-width: 1.8; fill: none;
        stroke-linecap: round; stroke-linejoin: round;
      }
    </style></head><body><div id="bg"><div class="svc-ic">
      <svg viewBox="0 0 24 24">${svgs[sel]}</svg>
    </div></div></body></html>`;
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Transparencia por doble captura (negro/blanco): Chromium satura el alfa
    // de fondos y bordes semitransparentes al renderizar sobre lienzo vacío.
    const captureOn = async (color) => {
      await page.evaluate((c) => {
        document.getElementById("bg").style.background = c;
      }, color);
      return await page.screenshot({
        clip: { x: 0, y: 0, width: CHIP, height: CHIP },
        encoding: "base64",
      });
    };
    const onBlack = await captureOn("#000");
    const onWhite = await captureOn("#fff");

    // Recuperar color y alfa reales: alpha = 1 - (blanco - negro)/255;
    // color = negro / alpha. Se resuelve en un canvas del navegador.
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

    const out = path.join(root, "dist", "icons", `chip-${name}.png`);
    await writeFile(out, Buffer.from(dataUrl.split(",")[1], "base64"));
    console.log(`OK → ${path.relative(root, out)}`);
  }
  await page.close();
} finally {
  await browser.close();
}
