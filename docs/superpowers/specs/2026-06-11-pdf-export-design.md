# Export del sitio a PDF (ES/EN) — Diseño

**Fecha:** 2026-06-11
**Estado:** Aprobado

## Objetivo

Generar un PDF tipo documento (A4 vertical) del one-pager de Kinetic AI Transformation, exportable en español e inglés, sin el formulario de contacto de HubSpot. La web publicada no cambia visualmente.

## Decisiones tomadas

- **Formato:** A4 vertical, estilo documento/brochure. Hero como portada; cada sección en su propia página.
- **Generación:** script Node con Puppeteer (`npm run pdf`). Sin servidor: carga `index.html` por `file://`.
- **i18n:** atributos `data-i18n="clave"` en el HTML (sin impacto visual) + `i18n/en.json` con las traducciones. El español es el contenido del HTML; el inglés se aplica reemplazando el contenido de cada `[data-i18n]` antes de imprimir.
- **Traducción EN:** redactada por Claude (tono corporativo/marketing), a revisar por el usuario en `i18n/en.json`.
- **Cierre sin formulario:** el PDF muestra en su lugar un bloque `.pdf-only` con CTA de contacto (kinetic-corp.com). Ese bloque vive en `index.html` oculto con `display: none` en la web.

## Archivos

| Archivo | Rol |
|---|---|
| `package.json` (nuevo) | Dependencia `puppeteer`; scripts `pdf` (ambos idiomas), `pdf:es`, `pdf:en` |
| `scripts/export-pdf.mjs` (nuevo) | Script de export |
| `pdf.css` (nuevo) | Overrides inyectados solo durante el export; nunca linkeado desde `index.html` |
| `i18n/en.json` (nuevo) | Traducciones EN; los valores admiten HTML (`<br>`, `<span class="hot">`) |
| `dist/` (generado) | `kinetic-ai-transformation-es.pdf` y `kinetic-ai-transformation-en.pdf` |
| `.gitignore` (nuevo) | `node_modules/`, `dist/` |
| `index.html` (modificado) | + atributos `data-i18n`; + bloque `.pdf-only` en `.cierre` |
| `styles.css` (modificado) | + regla `.pdf-only { display: none; }` |

## Flujo del script

1. Lanzar Chromium headless con viewport desktop.
2. `page.goto(pathToFileURL('index.html'))`, esperar `networkidle` (Google Fonts).
3. Inyectar `pdf.css` con `addStyleTag`.
4. Si idioma = EN: leer `i18n/en.json` y en `page.evaluate` reemplazar `innerHTML` de cada `[data-i18n]`, más `<html lang="en">` y `<title>`.
5. Esperar `document.fonts.ready`.
6. `page.pdf({ format: 'A4', printBackground: true, scale: 0.8, path })`.

**Por qué `scale: 0.8`:** el ancho útil de A4 a escala 1 es ~794px CSS, que caería en el breakpoint móvil (≤860px) y colapsaría el pentágono a lista. Con 0.8 el ancho efectivo es ~990px: se conserva el layout desktop y el pentágono entra completo en una página.

## Reglas de `pdf.css`

- Ocultar: `.hs-form-frame` (el form de HubSpot renderiza dentro de ese contenedor), `.nav-toggle`.
- Mostrar: `.pdf-only`.
- `.nav` pasa de `position: fixed` a estática (encabezado de la portada, no se repite por página).
- Animaciones congeladas: `animation: none` en flows/orbit/marquee/core-pulse; `.reveal` forzado visible (`opacity: 1; transform: none`).
- Marquee de logos → grilla `flex-wrap` centrada; duplicados del loop ocultos vía `.logo-item[aria-hidden="true"] { display: none }`.
- `background-attachment: fixed` → `scroll` en `.hero`.
- Paginación: `.hero` portada a página completa; cada `section` con `break-before: page`; `.risk`, `.bcard`, `.dcard`, `.svc-card` con `break-inside: avoid`.

## Convención de claves i18n

Claves planas con prefijo de sección: `hero.title`, `hero.sub`, `hero.cta`, `desafio.title`, `desafio.risk1`…`risk5`, `framework.*`, `beneficios.*`, `diferencial.*`, `cierre.*`, `meta.title`, `meta.description`. Alcance: todo texto visible del sitio (~40 claves). Los `alt` de logos de clientes no se traducen (nombres propios).

## Manejo de errores

- Sin conexión: las fuentes caen al fallback (`system-ui`) y el form HubSpot no carga (está oculto igual). El export no falla.
- Clave faltante en `en.json`: el script avisa por consola (warning con la clave) y deja el texto en español, no aborta.

## Verificación

Manual: generar ambos PDFs, revisar página por página (saltos, pentágono completo, grilla de logos, ausencia del form, bloque de contacto presente, textos EN correctos). Sin tests automatizados: el proyecto no tiene infraestructura de tests y validar un PDF renderizado requiere inspección visual.

## Fuera de alcance

- Versión EN de la web pública (los `data-i18n` quedan como base si se quiere a futuro).
- Formato presentación 16:9 / variantes apaisadas.
- Header/footer con numeración de páginas en el PDF.
