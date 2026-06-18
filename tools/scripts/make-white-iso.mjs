// Procesa los sellos ISO (azul sobre relleno) a versiones blancas con fondo
// transparente (knockout). Las zonas oscuras/azules pasan a blanco opaco; las
// zonas claras (fondo, caja blanca, damero, texto positivo) pasan a transparente.
import puppeteer from "puppeteer";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

// toolsRoot: fuente color (assets/certs-src). repoRoot: salida blanca que usa
// la web (img/certs).
const toolsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(toolsRoot, "..");

const files = [
  { in: "assets/certs-src/iso-9001.png", out: "img/certs/iso-9001-white.png" },
  { in: "assets/certs-src/iso-20000.png", out: "img/certs/iso-20000-white.png" },
  { in: "assets/certs-src/iso-27001.png", out: "img/certs/iso-27001-white.png" },
];

const T_LO = 110; // luminancia <= -> blanco opaco
const T_HI = 175; // luminancia >= -> transparente

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto("about:blank");

for (const f of files) {
  const b64 = (await readFile(path.join(toolsRoot, f.in))).toString("base64");
  const src = `data:image/png;base64,${b64}`;
  const out = await page.evaluate(
    async (src, T_LO, T_HI) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, c.width, c.height);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i],
          g = d[i + 1],
          b = d[i + 2],
          a = d[i + 3];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        let alpha;
        if (lum <= T_LO) alpha = 255;
        else if (lum >= T_HI) alpha = 0;
        else alpha = Math.round((255 * (T_HI - lum)) / (T_HI - T_LO));
        alpha = Math.min(alpha, a); // respeta transparencia original
        d[i] = 255;
        d[i + 1] = 255;
        d[i + 2] = 255;
        d[i + 3] = alpha;
      }
      ctx.putImageData(id, 0, 0);
      return c.toDataURL("image/png");
    },
    src,
    T_LO,
    T_HI
  );
  await writeFile(path.join(repoRoot, f.out), Buffer.from(out.split(",")[1], "base64"));
  console.log("wrote", f.out);
}

await browser.close();
