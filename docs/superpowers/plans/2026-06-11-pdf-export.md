# PDF Export (ES/EN) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `npm run pdf` genera `dist/kinetic-ai-transformation-es.pdf` y `-en.pdf` (A4 vertical, sin formulario HubSpot) desde el sitio actual, sin cambios visuales en la web.

**Architecture:** Puppeteer abre `index.html` por `file://`, inyecta `pdf.css` (overrides de print/paginación), y para EN reemplaza el contenido de cada `[data-i18n]` con `i18n/en.json` antes de `page.pdf()`. El español es el contenido del HTML; no hay duplicación de markup.

**Tech Stack:** Node ≥18 (ESM), Puppeteer. Sitio estático sin build previo.

**Spec:** `docs/superpowers/specs/2026-06-11-pdf-export-design.md`

**Verificación:** manual por inspección de los PDFs generados (sin infraestructura de tests en el proyecto, decisión del spec). Cada task termina verificando que la web no cambió y/o que el export corre.

---

### Task 0: Commit del trabajo de optimización pendiente

El working tree tiene cambios sin commitear (optimización previa de index.html/styles.css/app.js). Este plan modifica esos mismos archivos; hay que separar historias.

**Files:** ninguno nuevo.

- [ ] **Step 1: Commit de lo pendiente**

```bash
git add index.html styles.css app.js
git commit -m "Optimización: borra bloques comentados, unifica estilos inline en CSS, único loader HubSpot, limpia CSS/JS muerto"
```

- [ ] **Step 2: Verificar working tree limpio**

Run: `git status --short` → sin salida.

### Task 1: Scaffolding Node

**Files:**
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Crear `package.json`**

```json
{
  "name": "kinetic-onepager",
  "private": true,
  "type": "module",
  "scripts": {
    "pdf": "node scripts/export-pdf.mjs",
    "pdf:es": "node scripts/export-pdf.mjs es",
    "pdf:en": "node scripts/export-pdf.mjs en"
  }
}
```

- [ ] **Step 2: Crear `.gitignore`**

```
node_modules/
dist/
```

- [ ] **Step 3: Instalar Puppeteer**

Run: `npm install --save-dev puppeteer`
Expected: agrega `devDependencies.puppeteer` y `package-lock.json`; descarga Chromium (~150 MB, puede tardar).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "Scaffolding Node para export PDF (Puppeteer)"
```

### Task 2: Bloque `.pdf-only` de contacto

**Files:**
- Modify: `index.html` (sección `.cierre`, después del div `.hs-form-frame`)
- Modify: `styles.css` (junto a la regla `.hs-form-frame`)

- [ ] **Step 1: Agregar el bloque en `index.html`** inmediatamente después del `</div>` de `.hs-form-frame`:

```html
        <div class="pdf-only">
          <a class="cta" href="https://kinetic-corp.com">
            <span data-i18n="cierre.cta">Hablemos sobre tu transformación en IA</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <p class="pdf-contact">kinetic-corp.com</p>
        </div>
```

- [ ] **Step 2: Ocultarlo en la web** — en `styles.css`, después de la regla `.hs-form-frame`:

```css
/* Bloque visible solo en el export PDF (pdf.css lo muestra) */
.pdf-only {
  display: none;
}
.pdf-contact {
  margin-top: 16px;
  color: var(--txt-55);
  font-family: var(--display);
  font-size: 15px;
  letter-spacing: 0.04em;
}
```

- [ ] **Step 3: Verificar que la web no cambió** — abrir `index.html` en el navegador (o servir) y confirmar que el cierre se ve igual (form visible, sin CTA extra).

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Bloque de contacto .pdf-only oculto en web (solo export PDF)"
```

### Task 3: Atributos `data-i18n`

**Files:**
- Modify: `index.html`

Agregar `data-i18n="<clave>"` a cada elemento listado. El texto español queda como está. Dos casos especiales: (a) el CTA del hero envuelve su texto en un `<span>` nuevo para no pisar el `<svg>` al traducir; (b) en beneficios la clave va en el `<ul>` (el valor EN incluye los `<li>`).

- [ ] **Step 1: Aplicar los atributos según esta tabla**

| Elemento (ubicación) | Clave |
|---|---|
| `.hero h1` | `hero.title` |
| `.hero .sub` | `hero.sub` |
| Texto del `.hero .cta` → envolver en `<span data-i18n="hero.cta">` | `hero.cta` |
| `.problema .eyebrow` | `desafio.eyebrow` |
| `.problema h2.sec` | `desafio.title` |
| Los 5 `.risk p` en orden | `desafio.risk1` … `desafio.risk5` |
| `.servicios .eyebrow` | `framework.eyebrow` |
| `.servicios h2.sec` | `framework.title` |
| `.core-kicker` | `framework.coreKicker` |
| `.svc-scan .svc-verb` / `.svc-desc` | `framework.scanVerb` / `framework.scanDesc` |
| `.svc-governance .svc-verb` / `.svc-desc` | `framework.governanceVerb` / `framework.governanceDesc` |
| `.svc-training .svc-verb` / `.svc-desc` | `framework.trainingVerb` / `framework.trainingDesc` |
| `.svc-talent .svc-verb` / `.svc-desc` | `framework.talentVerb` / `framework.talentDesc` |
| `.svc-agentic .svc-verb` / `.svc-desc` | `framework.agenticVerb` / `framework.agenticDesc` |
| `.beneficios .eyebrow` | `beneficios.eyebrow` |
| `.beneficios h2.sec` | `beneficios.title` |
| `.bcard` 1/2/3 `h3` | `beneficios.card1Title` … `card3Title` |
| `.bcard` 1/2/3 `ul` | `beneficios.card1Items` … `card3Items` |
| `.diff .eyebrow` | `diferencial.eyebrow` |
| `.diff h2.sec` | `diferencial.title` |
| `.dcard` 1/2/3 `h3` | `diferencial.card1Title` … `card3Title` |
| `.dcard` 1/2/3 `p` | `diferencial.card1Text` … `card3Text` |
| `.cierre h2` | `cierre.title` |
| `.cierre p` (el párrafo, no `.pdf-contact`) | `cierre.sub` |
| span del CTA `.pdf-only` (ya creado en Task 2) | `cierre.cta` |

No traducir (sin atributo): eyebrow del hero ("Kinetic AI Transformation", marca), `.core-title` (marca + "AI-Powered" ya en inglés), `.svc-name` (AI Scan, AI Governance… ya en inglés), alts de logos, footer.

- [ ] **Step 2: Verificar conteo**

Run (PowerShell): `(Select-String -Path index.html -Pattern 'data-i18n' -AllMatches).Matches.Count`
Expected: `42` (41 de esta task + el `cierre.cta` que ya trajo la Task 2)

- [ ] **Step 3: Verificar que la web no cambió** — los atributos no afectan rendering; confirmar visualmente el hero (el único cambio estructural es el `<span>` del CTA, que no altera el flex).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Atributos data-i18n para export PDF en inglés"
```

### Task 4: Traducciones `i18n/en.json`

**Files:**
- Create: `i18n/en.json`

- [ ] **Step 1: Crear el archivo con este contenido exacto**

```json
{
  "meta.title": "Kinetic AI Transformation · Value Proposition",
  "meta.description": "Kinetic Corp's AI positioning strategy. Governance, talent, automation and intelligent agents to scale with security and measurable results.",
  "hero.title": "AI accelerates.<br />Strategy decides.<br /><span>Kinetic transforms.</span>",
  "hero.sub": "We turn traditional organizations into hybrid companies powered by Artificial Intelligence.",
  "hero.cta": "Let's talk about your AI transformation",
  "desafio.eyebrow": "The starting point",
  "desafio.title": "The challenge is no longer adopting AI.<br /><span class=\"hot\">It's governing it before it becomes a risk.</span>",
  "desafio.risk1": "Regulatory and compliance risks.",
  "desafio.risk2": "Uncontrolled use of AI tools.",
  "desafio.risk3": "Exposure of sensitive information.",
  "desafio.risk4": "Loss of competitiveness against AI-First companies.",
  "desafio.risk5": "Lack of talent prepared for hybrid environments.",
  "framework.eyebrow": "The framework",
  "framework.title": "We evolve your company toward an <span class=\"hot\">AI-Ready</span> model.",
  "framework.coreKicker": "Human + AI",
  "framework.scanVerb": "Discover",
  "framework.scanDesc": "We map real AI usage, detect risks and define high-impact opportunities.",
  "framework.governanceVerb": "Govern",
  "framework.governanceDesc": "Policies, decision frameworks, compliance and ethics for responsible adoption.",
  "framework.trainingVerb": "Train",
  "framework.trainingDesc": "Hands-on training for leaders and teams that need to operate in hybrid environments.",
  "framework.talentVerb": "Empower",
  "framework.talentDesc": "Access to specialists and capability assessment to build teams ready for the new era.",
  "framework.agenticVerb": "Scale",
  "framework.agenticDesc": "Design and implementation of intelligent agents and automations with measurable returns.",
  "beneficios.eyebrow": "Results",
  "beneficios.title": "From experimentation to <span class=\"hot\">business impact</span>",
  "beneficios.card1Title": "Operational Shielding",
  "beneficios.card1Items": "<li>Protection of critical information</li><li>Risk management</li><li>Compliance and traceability</li>",
  "beneficios.card2Title": "Exponential Productivity",
  "beneficios.card2Items": "<li>More agile processes</li><li>AI-augmented teams</li><li>Fewer repetitive tasks</li>",
  "beneficios.card3Title": "Competitive Advantage",
  "beneficios.card3Items": "<li>Faster execution</li><li>Lower operating costs</li><li>Better decision-making</li>",
  "diferencial.eyebrow": "The differentiator",
  "diferencial.title": "Why Kinetic?",
  "diferencial.card1Title": "Proven experience",
  "diferencial.card1Text": "We implement AI and automation solutions for global organizations across industries such as media, banking and government.",
  "diferencial.card2Title": "Proprietary methodology",
  "diferencial.card2Text": "Our <span class=\"hot-bold\">Hybrid Method</span> enables secure, scalable and auditable adoption.",
  "diferencial.card3Title": "International capability",
  "diferencial.card3Text": "Backed by a global network with presence in more than <span class=\"hot-bold\">170 countries</span>.",
  "cierre.title": "AI with purpose.<br /><span class=\"hot\">Results with impact.</span>",
  "cierre.sub": "We help organizations turn Artificial Intelligence into a real competitive advantage.",
  "cierre.cta": "Let's talk about your AI transformation"
}
```

- [ ] **Step 2: Validar JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('i18n/en.json','utf8')); console.log('JSON OK')"`
Expected: `JSON OK`

- [ ] **Step 3: Commit**

```bash
git add i18n/en.json
git commit -m "Traducciones EN para el export PDF"
```

### Task 5: `pdf.css`

**Files:**
- Create: `pdf.css`

- [ ] **Step 1: Crear el archivo**

```css
/* ============================================================
 * pdf.css — inyectado solo por scripts/export-pdf.mjs.
 * NO linkear desde index.html.
 * ============================================================ */

/* Fuera del PDF: form, hamburguesa, máscaras del marquee, duplicados del loop */
.nav-toggle,
.hs-form-frame,
.logos-fade-left,
.logos-fade-right,
.logo-item[aria-hidden="true"] {
  display: none !important;
}

/* Bloque de contacto exclusivo del PDF */
.pdf-only {
  display: block !important;
}

/* Congelar toda animación/transición */
*,
*::before,
*::after {
  animation: none !important;
  transition: none !important;
}
.reveal {
  opacity: 1 !important;
  transform: none !important;
}
.flow {
  opacity: 0 !important; /* puntos de flujo a mitad de camino se ven como glitch */
}

/* Nav estática: encabezado de la portada, no se repite por página */
.nav {
  position: static;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: none;
  box-shadow: none;
}

/* Hero = portada */
.hero {
  background-attachment: scroll; /* fixed se rompe en PDF */
  min-height: 88vh;
  padding-top: 60px;
  break-after: page;
}

/* Una sección por página; logos acompañan a la sección anterior */
section {
  break-before: page;
  padding: 48px 0;
}
.logos {
  break-before: auto;
  padding: 36px 0;
}

/* No cortar tarjetas ni el pentágono entre páginas */
.risk,
.bcard,
.dcard,
.svc-card,
.stage,
footer .wrap {
  break-inside: avoid;
}

/* Marquee → grilla estática centrada */
.logos-track {
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 32px 48px;
}
.logo-item {
  filter: grayscale(1) brightness(1.6) opacity(0.7);
}
```

- [ ] **Step 2: Verificar que la web no lo usa**

Run: `Select-String -Path index.html -Pattern 'pdf.css'`
Expected: sin resultados.

- [ ] **Step 3: Commit**

```bash
git add pdf.css
git commit -m "Estilos de paginación/print para el export PDF"
```

### Task 6: Script `scripts/export-pdf.mjs`

**Files:**
- Create: `scripts/export-pdf.mjs`

- [ ] **Step 1: Crear el script**

```js
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
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(pathToFileURL(path.join(root, "index.html")).href, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });
    await page.addStyleTag({ path: path.join(root, "pdf.css") });

    if (lang === "en") {
      const dict = JSON.parse(
        await readFile(path.join(root, "i18n", "en.json"), "utf8")
      );
      const missing = await page.evaluate((dict) => {
        const missing = [];
        document.documentElement.lang = "en";
        if (dict["meta.title"]) document.title = dict["meta.title"];
        const meta = document.querySelector('meta[name="description"]');
        if (meta && dict["meta.description"]) {
          meta.setAttribute("content", dict["meta.description"]);
        }
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

    const out = path.join(root, "dist", `kinetic-ai-transformation-${lang}.pdf`);
    await page.pdf({ path: out, format: "A4", printBackground: true, scale: 0.8 });
    console.log(`OK → ${path.relative(root, out)}`);
    await page.close();
  }
} finally {
  await browser.close();
}
```

- [ ] **Step 2: Primera corrida**

Run: `npm run pdf`
Expected:
```
OK → dist\kinetic-ai-transformation-es.pdf
OK → dist\kinetic-ai-transformation-en.pdf
```

- [ ] **Step 3: Commit**

```bash
git add scripts/export-pdf.mjs
git commit -m "Script Puppeteer de export a PDF (es/en)"
```

### Task 7: Verificación visual y ajustes de paginación

**Files:**
- Possibly modify: `pdf.css` (solo valores de paginación/espaciado)

- [ ] **Step 1: Inspeccionar ambos PDFs página por página** (con el tool Read sobre los PDF). Checklist:
  - Portada: nav arriba, H1/sub/CTA legibles sobre la foto de fondo.
  - Sin formulario HubSpot en todo el documento; bloque CTA + `kinetic-corp.com` presente en el cierre.
  - Pentágono completo en una sola página, 5 tarjetas legibles, sin tarjetas cortadas.
  - Grilla de logos sin duplicados, centrada.
  - EN: todos los textos traducidos (sin warnings de claves faltantes en consola), spans naranjas (`.hot`, `.hot-bold`) conservados.
  - Ninguna tarjeta `.risk`/`.bcard`/`.dcard` cortada entre páginas.

- [ ] **Step 2: Corregir defectos de paginación si los hay** (ajustar `min-height` del hero, `padding` de secciones o `break-*` en `pdf.css`) y regenerar con `npm run pdf` hasta pasar el checklist.

- [ ] **Step 3: Commit final (si hubo ajustes)**

```bash
git add pdf.css
git commit -m "Ajustes de paginación del export PDF"
```
