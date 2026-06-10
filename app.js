/* ============================================================
 * Kinetic Corp · One Pager IA 2026
 * Bilingual content model + render + language toggle
 * ============================================================ */

const CONTENT = {
  es: {
    meta: {
      title: "Kinetic Corp · Estrategia IA 2026",
      desc: "Kinetic Corp — Estrategia de posicionamiento IA 2026. Donde la IA entra en producción.",
    },
    hero: {
      kicker: "Estrategia de posicionamiento IA · 2026",
      title: 'La IA acelera.<br>La estrategia <span class="brand-text">decide</span>.<br>Kinetic lidera.',
    },
    problem: {
      kicker: "El punto de partida",
      title: 'Tu organización <span class="brand-text">ya está</span> usando IA.',
      stat: '40<span class="dash">–</span>70<span class="pct">%</span>',
      statDesc: "de los colaboradores ya usa herramientas de IA generativa.",
      cards: [
        { t: "No sabés quién usa qué", d: "Ni con qué datos corporativos, ni bajo qué reglas." },
        { t: "Riesgo real sin control", d: "Filtración de datos, alucinaciones, sesgos no detectados." },
        { t: "Productividad individual", d: "El beneficio se queda en el empleado, no escala a la empresa." },
      ],
      closing: "El directorio ya está preguntando. La ventana para liderar la respuesta es ahora.",
    },
    market: {
      kicker: "Mercado Córdoba",
      title: "La oportunidad está acá.",
      leftTitle: "El mercado disponible",
      left: [
        "Empresas medianas con presión digital sin equipo IA propio",
        "Sector financiero y cooperativas bajo exigencia regulatoria",
        "Sector público (ERSEP, EPEC, municipios) en modernización",
        "Industria y agro con necesidad de automatización crítica",
        "Software houses locales que quieren incorporar IA",
      ],
      rightTitle: "El punto dulce de Kinetic",
      right: [
        { t: "Big 4", d: "Lejanas, ciclos 6–12 meses, tickets inalcanzables" },
        { t: "Startups IA locales", d: "Talento técnico sin metodología ni respaldo" },
        { t: "Agencias digitales", d: "Marketing, no transformación real de procesos" },
        { t: "Kinetic Corp", d: "Cercanía + metodología + Andersen + casos reales", winner: true },
      ],
    },
    portfolio: {
      kicker: "Arquitectura de portafolio",
      title: 'Una marca. <span class="brand-text">Tres productos.</span> Sin ruido.',
      todayLabel: "Hoy",
      chips: ["Kinetic Training", "Kinetic Software", "Kinetic Technology", "Kinetic Talent", "Kinetic Consulting"],
      todayCaption: "5 submarcas compitiendo por la atención del mismo cliente.",
      proposalLabel: "Propuesta · Kinetic Corp — IA aplicada",
      products: [
        { n: "01", t: "Kinetic AI Scan", d: "Diagnóstico · 4–6 semanas" },
        { n: "02", t: "Kinetic AI Agent", d: "Construcción · 6–10 semanas" },
        { n: "03", t: "Kinetic AI Governance", d: "Gobierno recurrente · Servicio continuo" },
      ],
      footnote: "Kinetic Training se mantiene como marca independiente (e-commerce B2B de formación).",
    },
    scan: {
      num: "01",
      kicker: "Producto",
      title: "Kinetic AI Scan",
      subtitle: "Diagnóstico de madurez IA · Proyecto cerrado · 4–6 semanas",
      q: "¿Qué resuelve?",
      desc: "Sabés que tu organización ya usa IA — no sabés bien cómo, ni cuánto riesgo genera, ni por dónde empezar a ordenarlo.",
      points: [
        "Inventario real de uso de IA",
        "Scoring de madurez (datos, talento, procesos)",
        "Roadmap priorizado con quick wins",
        "Informe ejecutivo firmable para Directorio",
      ],
      cardTitle: "Ficha del producto",
      kv: [
        { k: "Duración", v: "4–6 semanas" },
        { k: "Rol", v: "Puerta de entrada al ecosistema" },
      ],
    },
    agent: {
      num: "02",
      kicker: "Producto",
      title: "Kinetic AI Agent",
      subtitle: "Construcción de agentes IA a medida · 6–10 semanas",
      tracks: [
        {
          tag: "Track Pyme",
          sub: "Empresas 20–250 empleados",
          items: ["Scope máximo 10 semanas", "Cliente acepta ser caso testigo", "Activos reutilizables"],
        },
        {
          tag: "Track Enterprise",
          sub: "Corporaciones +500 empleados",
          highlight: true,
          items: ["Build–Operate–Transfer · 8–14 semanas", "Modelo Build + Run mensual", "Integración core · ISO 42001 · SLA"],
        },
      ],
      quote: "“No es una demo. Está funcionando en producción.”",
      quoteSub: "El diferencial que cierra ventas en Córdoba.",
    },
    governance: {
      num: "03",
      kicker: "Producto",
      title: "Kinetic AI Governance",
      subtitle: "ISO/IEC 42001 · Gobierno mensual recurrente",
      cards: [
        { t: "Estructura de Gobierno", d: "Políticas, procedimientos, comité IA. ISO 42001." },
        { t: "Auditorías Recurrentes", d: "Monitoreo de sesgos, observabilidad LLM, DLP." },
        { t: "Dictamen Firmable", d: "Evidencia formal para reguladores y directorios." },
      ],
      whyTitle: "¿Por qué ahora?",
      why: [
        "EU AI Act exige evidencia de gobierno",
        "BCRA y CNV amplían exigencias regulatorias",
        "Directorios preguntan: ¿qué pasa si un agente comete un error?",
        "Certificadoras ISO 42001 reportan demanda 3x mayor vs 2024",
      ],
      cardTitle: "Ficha del producto",
      kv: [{ k: "Upgrade", v: "Desde AI Scan o AI Agent" }],
      note: "Andersen Consulting: el respaldo que ningún competidor local puede replicar.",
    },
    journey: {
      kicker: "Customer journey",
      title: 'Un cliente, un journey, <span class="brand-text">tres momentos</span>.',
      durLabel: "Duración",
      steps: [
        { n: "01", t: "AI Scan", sub: "Saber dónde estoy", q: "“Necesito entender mi situación”", dur: "4–6 sem" },
        { n: "02", t: "AI Agent", sub: "Tener algo funcionando", q: "“Quiero un caso concreto”", dur: "6–10 sem", highlight: true },
        { n: "03", t: "AI Governance", sub: "Hacerlo sostenible", q: "“Necesito estar cubierto”", dur: "Recurrente" },
      ],
      closing: "El AI Scan justifica el AI Agent. El AI Agent genera la evidencia que justifica el AI Governance.",
    },
    plan: {
      kicker: "Roadmap",
      title: 'Plan de trabajo — <span class="brand-text">4 semanas</span>.',
      subtitle: "Posicionamiento · Demanda · Portfolio · Marca",
      colA: "Pos / Port",
      colB: "Demanda",
      weeks: [
        { w: "S1", t: "Cimientos", a: ["Propuesta de valor IA validada", "3 productos con naming final", "Brief de marca IA"], b: ["Benchmark Córdoba (top 10)", "Audiencias con trigger"] },
        { w: "S2", t: "Materiales", a: ["Deck para directorio", "1-pager por producto", "Web IA actualizada"], b: ["Scripts de venta x audiencia", "Email sequence x producto"] },
        { w: "S3", t: "Activación", a: ["Lanzamiento interno", "Training de pitch", "CRM configurado"], b: ["Primeros 3 AI Scans propuestos", "Activación canal Andersen"] },
        { w: "S4", t: "Revisión", a: ["Review de KPIs", "Ajustes de mensaje", "Plan mes 2 y Q3"], b: ["Dashboard demanda activo", "Primer caso éxito documentado"] },
      ],
    },
    lanes: {
      kicker: "Líneas de acción",
      title: 'Los <span class="brand-text">4 carriles</span> de trabajo.',
      items: [
        { l: "A", t: "Posicionamiento", w: "Semana 1–2", items: ["Propuesta de valor IA validada", "Benchmark competitivo Córdoba", "Messaging matrix por audiencia"] },
        { l: "B", t: "Generación de Demanda", w: "Semana 2–3", items: ["Scripts de venta por producto", "Email sequences x audiencia", "Pipeline calificado con AI Scan"] },
        { l: "C", t: "Portfolio", w: "Semana 2–4", items: ["1-pager x producto", "Deck comercial (versión cliente)", "Ficha técnica por producto"] },
        { l: "D", t: "Marca", w: "Semana 1–3", items: ["Arquitectura de marca consolidada", "Web IA actualizada", "Guía de tono y mensajes IA"] },
      ],
    },
    steps: {
      kicker: "Decisión",
      title: 'Próximos <span class="brand-text">pasos</span>.',
      subtitle: "Esta semana · Esta reunión · Esta decisión",
      actions: [
        { n: "01", t: "Validar los 3 productos", d: "¿AI Scan, AI Agent y AI Governance son los correctos? Este onepager es el punto de partida.", r: "Director Externo + Nuria", p: "Esta reunión", highlight: true },
        { n: "02", t: "Confirmar naming final", d: "Los nombres propuestos son simples y vendibles. Confirmar antes de usarlos en materiales públicos.", r: "Directorio Kinetic", p: "Semana 1" },
        { n: "03", t: "Listar 5 clientes piloto", d: "Identificar 5 empresas de Córdoba para los primeros AI Scan con relación activa.", r: "Equipo Comercial", p: "Semana 1–2" },
        { n: "04", t: "Activar canal Andersen", d: "Comunicar internamente la propuesta IA a la red Andersen para activar referencias.", r: "Director Externo", p: "Semana 2" },
      ],
    },
    closing: {
      title: 'Donde la IA<br>entra en <span class="brand-text">producción</span>.',
      meta: ["kinetic-corp.com", "A member of Andersen Consulting", "Córdoba, Argentina"],
    },
    footer: {
      left: "Kinetic Corp · Creating Value",
      right: "A member of Andersen Consulting · Córdoba, Argentina",
    },
  },

  en: {
    meta: {
      title: "Kinetic Corp · AI Strategy 2026",
      desc: "Kinetic Corp — AI positioning strategy 2026. Where AI goes into production.",
    },
    hero: {
      kicker: "AI positioning strategy · 2026",
      title: 'AI accelerates.<br>Strategy <span class="brand-text">decides</span>.<br>Kinetic leads.',
    },
    problem: {
      kicker: "The starting point",
      title: 'Your organization <span class="brand-text">is already</span> using AI.',
      stat: '40<span class="dash">–</span>70<span class="pct">%</span>',
      statDesc: "of employees already use generative AI tools.",
      cards: [
        { t: "You don't know who uses what", d: "Nor with which corporate data, nor under what rules." },
        { t: "Real risk, no control", d: "Data leaks, hallucinations, undetected bias." },
        { t: "Individual productivity", d: "The benefit stays with the employee, it doesn't scale to the company." },
      ],
      closing: "The board is already asking. The window to lead the answer is now.",
    },
    market: {
      kicker: "Córdoba market",
      title: "The opportunity is right here.",
      leftTitle: "The addressable market",
      left: [
        "Mid-sized companies under digital pressure with no in-house AI team",
        "Financial sector and cooperatives under regulatory demands",
        "Public sector (ERSEP, EPEC, municipalities) modernizing",
        "Industry and agribusiness needing critical automation",
        "Local software houses looking to add AI",
      ],
      rightTitle: "Kinetic's sweet spot",
      right: [
        { t: "Big 4", d: "Distant, 6–12 month cycles, out-of-reach budgets" },
        { t: "Local AI startups", d: "Technical talent without methodology or backing" },
        { t: "Digital agencies", d: "Marketing, not real process transformation" },
        { t: "Kinetic Corp", d: "Proximity + methodology + Andersen + real cases", winner: true },
      ],
    },
    portfolio: {
      kicker: "Portfolio architecture",
      title: 'One brand. <span class="brand-text">Three products.</span> No noise.',
      todayLabel: "Today",
      chips: ["Kinetic Training", "Kinetic Software", "Kinetic Technology", "Kinetic Talent", "Kinetic Consulting"],
      todayCaption: "5 sub-brands competing for the same client's attention.",
      proposalLabel: "Proposal · Kinetic Corp — Applied AI",
      products: [
        { n: "01", t: "Kinetic AI Scan", d: "Diagnostic · 4–6 weeks" },
        { n: "02", t: "Kinetic AI Agent", d: "Build · 6–10 weeks" },
        { n: "03", t: "Kinetic AI Governance", d: "Recurring governance · Ongoing service" },
      ],
      footnote: "Kinetic Training remains an independent brand (B2B training e-commerce).",
    },
    scan: {
      num: "01",
      kicker: "Product",
      title: "Kinetic AI Scan",
      subtitle: "AI maturity diagnostic · Fixed-scope project · 4–6 weeks",
      q: "What does it solve?",
      desc: "You know your organization already uses AI — but not exactly how, how much risk it creates, or where to start getting it in order.",
      points: [
        "A real inventory of AI usage",
        "Maturity scoring (data, talent, processes)",
        "Prioritized roadmap with quick wins",
        "Signable executive report for the Board",
      ],
      cardTitle: "Product overview",
      kv: [
        { k: "Duration", v: "4–6 weeks" },
        { k: "Role", v: "Entry point to the ecosystem" },
      ],
    },
    agent: {
      num: "02",
      kicker: "Product",
      title: "Kinetic AI Agent",
      subtitle: "Custom AI agents, built to order · 6–10 weeks",
      tracks: [
        {
          tag: "SME Track",
          sub: "Companies with 20–250 employees",
          items: ["Scope capped at 10 weeks", "Client agrees to be a reference case", "Reusable assets"],
        },
        {
          tag: "Enterprise Track",
          sub: "Corporations with 500+ employees",
          highlight: true,
          items: ["Build–Operate–Transfer · 8–14 weeks", "Build + monthly Run model", "Core integration · ISO 42001 · SLA"],
        },
      ],
      quote: "“It's not a demo. It's running in production.”",
      quoteSub: "The differentiator that closes deals in Córdoba.",
    },
    governance: {
      num: "03",
      kicker: "Product",
      title: "Kinetic AI Governance",
      subtitle: "ISO/IEC 42001 · Recurring monthly governance",
      cards: [
        { t: "Governance Structure", d: "Policies, procedures, AI committee. ISO 42001." },
        { t: "Recurring Audits", d: "Bias monitoring, LLM observability, DLP." },
        { t: "Signable Opinion", d: "Formal evidence for regulators and boards." },
      ],
      whyTitle: "Why now?",
      why: [
        "The EU AI Act requires evidence of governance",
        "BCRA and CNV are expanding regulatory requirements",
        "Boards are asking: what happens if an agent makes a mistake?",
        "ISO 42001 certifiers report 3x more demand vs 2024",
      ],
      cardTitle: "Product overview",
      kv: [{ k: "Upgrade", v: "From AI Scan or AI Agent" }],
      note: "Andersen Consulting: the backing no local competitor can replicate.",
    },
    journey: {
      kicker: "Customer journey",
      title: 'One client, one journey, <span class="brand-text">three moments</span>.',
      durLabel: "Duration",
      steps: [
        { n: "01", t: "AI Scan", sub: "Know where I stand", q: "“I need to understand my situation”", dur: "4–6 wks" },
        { n: "02", t: "AI Agent", sub: "Have something working", q: "“I want a concrete case”", dur: "6–10 wks", highlight: true },
        { n: "03", t: "AI Governance", sub: "Make it sustainable", q: "“I need to be covered”", dur: "Ongoing" },
      ],
      closing: "AI Scan justifies AI Agent. AI Agent generates the evidence that justifies AI Governance.",
    },
    plan: {
      kicker: "Roadmap",
      title: 'Work plan — <span class="brand-text">4 weeks</span>.',
      subtitle: "Positioning · Demand · Portfolio · Brand",
      colA: "Pos / Port",
      colB: "Demand",
      weeks: [
        { w: "W1", t: "Foundations", a: ["Validated AI value proposition", "3 products with final naming", "AI brand brief"], b: ["Córdoba benchmark (top 10)", "Audiences with triggers"] },
        { w: "W2", t: "Materials", a: ["Board deck", "1-pager per product", "Updated AI website"], b: ["Sales scripts per audience", "Email sequence per product"] },
        { w: "W3", t: "Activation", a: ["Internal launch", "Pitch training", "CRM configured"], b: ["First 3 AI Scans proposed", "Andersen channel activation"] },
        { w: "W4", t: "Review", a: ["KPI review", "Messaging adjustments", "Month 2 & Q3 plan"], b: ["Active demand dashboard", "First success case documented"] },
      ],
    },
    lanes: {
      kicker: "Action lines",
      title: 'The <span class="brand-text">4 workstreams</span>.',
      items: [
        { l: "A", t: "Positioning", w: "Week 1–2", items: ["Validated AI value proposition", "Córdoba competitive benchmark", "Messaging matrix per audience"] },
        { l: "B", t: "Demand Generation", w: "Week 2–3", items: ["Sales scripts per product", "Email sequences per audience", "Qualified pipeline via AI Scan"] },
        { l: "C", t: "Portfolio", w: "Week 2–4", items: ["1-pager per product", "Commercial deck (client version)", "Tech sheet per product"] },
        { l: "D", t: "Brand", w: "Week 1–3", items: ["Consolidated brand architecture", "Updated AI website", "AI tone & messaging guide"] },
      ],
    },
    steps: {
      kicker: "Decision",
      title: 'Next <span class="brand-text">steps</span>.',
      subtitle: "This week · This meeting · This decision",
      actions: [
        { n: "01", t: "Validate the 3 products", d: "Are AI Scan, AI Agent and AI Governance the right ones? This onepager is the starting point.", r: "External Director + Nuria", p: "This meeting", highlight: true },
        { n: "02", t: "Confirm final naming", d: "The proposed names are simple and sellable. Confirm before using them in public materials.", r: "Kinetic Board", p: "Week 1" },
        { n: "03", t: "List 5 pilot clients", d: "Identify 5 Córdoba companies for the first AI Scans with an active relationship.", r: "Sales Team", p: "Week 1–2" },
        { n: "04", t: "Activate the Andersen channel", d: "Internally communicate the AI proposal to the Andersen network to activate referrals.", r: "External Director", p: "Week 2" },
      ],
    },
    closing: {
      title: 'Where AI<br>goes into <span class="brand-text">production</span>.',
      meta: ["kinetic-corp.com", "A member of Andersen Consulting", "Córdoba, Argentina"],
    },
    footer: {
      left: "Kinetic Corp · Creating Value",
      right: "A member of Andersen Consulting · Córdoba, Argentina",
    },
  },
};

/* ------------------------------------------------------------------
 * Render helpers
 * ---------------------------------------------------------------- */
const arrowList = (items) =>
  `<ul class="list">${items.map((t) => `<li><span class="mark">→</span><span>${t}</span></li>`).join("")}</ul>`;

const dotList = (items) =>
  `<ul class="list">${items.map((t) => `<li><span class="mark">●</span><span>${t}</span></li>`).join("")}</ul>`;

const dashList = (items) =>
  `<ul class="dash-list">${items.map((t) => `<li>— ${t}</li>`).join("")}</ul>`;

const kvBlock = (rows) =>
  `<div class="kv">${rows.map((r) => `<div class="kv-row"><span class="k">${r.k}</span><span class="v">${r.v}</span></div>`).join("")}</div>`;

/* ------------------------------------------------------------------
 * Section builders
 * ---------------------------------------------------------------- */
function build(c) {
  return [
    // 1 — Hero
    `<section class="section hero" id="inicio">
      <div class="rings"></div>
      <div class="container">
        <p class="kicker">${c.hero.kicker}</p>
        <h1 class="display-xl">${c.hero.title}</h1>
      </div>
    </section>`,

    // 2 — Problema
    `<section class="section">
      <div class="container">
        <p class="kicker">${c.problem.kicker}</p>
        <h2 class="display" style="max-width:16ch">${c.problem.title}</h2>
        <div class="problem-grid">
          <div class="bigstat">
            <div class="bigstat-num">${c.problem.stat}</div>
            <p class="lead">${c.problem.statDesc}</p>
          </div>
          <div class="stack">
            ${c.problem.cards.map((card) => `<div class="card-soft accent-left"><h3>${card.t}</h3><p>${card.d}</p></div>`).join("")}
          </div>
        </div>
        <p class="closing-line">${c.problem.closing}</p>
      </div>
    </section>`,

    // 3 — Mercado / oportunidad
    `<section class="section">
      <div class="container">
        <div class="section-head">
          <p class="kicker">${c.market.kicker}</p>
          <h2 class="display">${c.market.title}</h2>
        </div>
        <div class="split">
          <div>
            <h3 class="col-title">${c.market.leftTitle}</h3>
            ${arrowList(c.market.left)}
          </div>
          <div>
            <h3 class="col-title">${c.market.rightTitle}</h3>
            <div class="grid cols-2">
              ${c.market.right
                .map(
                  (card) =>
                    `<div class="${card.winner ? "card winner" : "card-soft"}"><h3>${card.t}${
                      card.winner ? ' <span class="brand-text">✓</span>' : ""
                    }</h3><p>${card.d}</p></div>`
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </section>`,

    // 4 — Una marca, tres productos
    `<section class="section">
      <div class="container">
        <div class="section-head">
          <p class="kicker">${c.portfolio.kicker}</p>
          <h2 class="display">${c.portfolio.title}</h2>
        </div>
        <div class="evo">
          <div>
            <p class="eyebrow" style="color:var(--ink-40);margin-bottom:16px">${c.portfolio.todayLabel}</p>
            <div class="card-soft">
              <div class="chips">${c.portfolio.chips.map((b) => `<span class="chip">${b}</span>`).join("")}</div>
              <p style="margin-top:20px;color:var(--ink-55)">${c.portfolio.todayCaption}</p>
            </div>
          </div>
          <div class="evo-arrow">→</div>
          <div>
            <p class="eyebrow brand-text" style="margin-bottom:16px">${c.portfolio.proposalLabel}</p>
            <div class="product-list">
              ${c.portfolio.products
                .map(
                  (p) =>
                    `<div class="card product-row"><span class="num">${p.n}</span><div><h3>${p.t}</h3><p>${p.d}</p></div></div>`
                )
                .join("")}
            </div>
          </div>
        </div>
        <p class="footnote">${c.portfolio.footnote}</p>
      </div>
    </section>`,

    // 5 — AI Scan
    productSection(c.scan, [
      `<div>
        <h3 class="col-title">${c.scan.q}</h3>
        <p class="lead" style="margin-bottom:24px">${c.scan.desc}</p>
        <div class="grid cols-2">
          ${c.scan.points.map((t) => `<div class="point"><span class="mark">●</span><span>${t}</span></div>`).join("")}
        </div>
      </div>`,
      `<div class="card">
        <p class="kicker" style="margin-bottom:18px">${c.scan.cardTitle}</p>
        ${kvBlock(c.scan.kv)}
      </div>`,
    ]),

    // 6 — AI Agent
    `<section class="section">
      <div class="container">
        ${productHead(c.agent)}
        <div class="grid cols-2" style="margin-top:clamp(32px,5vw,48px)">
          ${c.agent.tracks
            .map(
              (tr) =>
                `<div class="${tr.highlight ? "card" : "card-soft"}">
                  <p class="kicker" style="margin-bottom:10px">${tr.tag}</p>
                  <h3 style="margin-bottom:18px">${tr.sub}</h3>
                  ${arrowList(tr.items)}
                </div>`
            )
            .join("")}
        </div>
        <p class="closing-line center" style="max-width:none;margin-top:clamp(32px,5vw,48px)">${c.agent.quote}
          <span style="display:block;margin-top:8px;font-style:normal;color:var(--ink-55);font-size:0.7em">${c.agent.quoteSub}</span>
        </p>
      </div>
    </section>`,

    // 7 — AI Governance
    `<section class="section">
      <div class="container">
        ${productHead(c.governance)}
        <div class="grid cols-3" style="margin:clamp(32px,5vw,48px) 0">
          ${c.governance.cards.map((card) => `<div class="card-soft accent-top"><h3>${card.t}</h3><p>${card.d}</p></div>`).join("")}
        </div>
        <div class="split">
          <div>
            <p class="kicker" style="margin-bottom:16px">${c.governance.whyTitle}</p>
            ${dotList(c.governance.why)}
          </div>
          <div class="card">
            <p class="kicker" style="margin-bottom:18px">${c.governance.cardTitle}</p>
            ${kvBlock(c.governance.kv)}
            <p class="note">${c.governance.note}</p>
          </div>
        </div>
      </div>
    </section>`,

    // 8 — Journey
    `<section class="section">
      <div class="container">
        <div class="section-head">
          <p class="kicker">${c.journey.kicker}</p>
          <h2 class="display">${c.journey.title}</h2>
        </div>
        <div class="grid cols-3">
          ${c.journey.steps
            .map(
              (s) =>
                `<div class="${s.highlight ? "card" : "card-soft"}">
                  <div class="step-head"><span class="num">${s.n}</span><h3>${s.t}</h3></div>
                  <p class="h-sub" style="font-size:clamp(18px,2.2vw,24px)">${s.sub}</p>
                  <p class="quote">${s.q}</p>
                  <div class="kv-row" style="border-top:1px solid var(--hair);border-bottom:0"><span class="k">${c.journey.durLabel}</span><span class="v">${s.dur}</span></div>
                </div>`
            )
            .join("")}
        </div>
        <p class="closing-line center" style="max-width:none">${c.journey.closing}</p>
      </div>
    </section>`,

    // 9 — Plan 4 semanas
    `<section class="section">
      <div class="container">
        <div class="section-head">
          <p class="kicker">${c.plan.kicker}</p>
          <h2 class="display">${c.plan.title}</h2>
          <p class="lead">${c.plan.subtitle}</p>
        </div>
        <div class="grid cols-2">
          ${c.plan.weeks
            .map(
              (w) =>
                `<div class="card-soft accent-top">
                  <div class="week-head"><span class="num">${w.w}</span><h3 class="h-sub">${w.t}</h3></div>
                  <div class="week-cols">
                    <div><p class="mini-label">${c.plan.colA}</p>${dashList(w.a)}</div>
                    <div><p class="mini-label">${c.plan.colB}</p>${dashList(w.b)}</div>
                  </div>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`,

    // 10 — 4 carriles
    `<section class="section">
      <div class="container">
        <div class="section-head">
          <p class="kicker">${c.lanes.kicker}</p>
          <h2 class="display">${c.lanes.title}</h2>
        </div>
        <div class="grid cols-2">
          ${c.lanes.items
            .map(
              (l) =>
                `<div class="card-soft lane">
                  <span class="num">${l.l}</span>
                  <div style="flex:1">
                    <div class="lane-head"><h3 class="h-sub">${l.t}</h3><span class="pill">${l.w}</span></div>
                    ${arrowList(l.items)}
                  </div>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`,

    // 11 — Próximos pasos
    `<section class="section">
      <div class="container">
        <div class="section-head">
          <p class="kicker">${c.steps.kicker}</p>
          <h2 class="display">${c.steps.title}</h2>
          <p class="lead">${c.steps.subtitle}</p>
        </div>
        <div class="stack">
          ${c.steps.actions
            .map(
              (a) =>
                `<div class="${a.highlight ? "card" : "card-soft"} action">
                  <span class="num">${a.n}</span>
                  <div class="action-body"><h3>${a.t}</h3><p>${a.d}</p></div>
                  <div class="action-meta"><span class="who">${a.r}</span><span class="pill">${a.p}</span></div>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`,

    // 12 — Cierre
    `<section class="section closing">
      <div class="rings"></div>
      <div class="container">
        <img class="closing-mark" src="favicon-corp.png" alt="Kinetic Corp" />
        <h2 class="display-xl">${c.closing.title}</h2>
        <div class="closing-meta">
          ${c.closing.meta.map((m, i) => `${i ? '<span class="sep"></span>' : ""}<span>${m}</span>`).join("")}
        </div>
      </div>
    </section>`,
  ].join("");
}

function productHead(p) {
  return `<div>
    <div class="product-head"><span class="num">${p.num}</span>
      <div><p class="kicker" style="margin-bottom:6px">${p.kicker}</p><h2 class="display">${p.title}</h2></div>
    </div>
    <p class="lead">${p.subtitle}</p>
  </div>`;
}

function productSection(p, cols) {
  return `<section class="section">
    <div class="container">
      ${productHead(p)}
      <div class="split" style="margin-top:clamp(32px,5vw,48px)">${cols.join("")}</div>
    </div>
  </section>`;
}

/* ------------------------------------------------------------------
 * Render + language toggle
 * ---------------------------------------------------------------- */
let lang = localStorage.getItem("kinetic-lang") || "es";
if (!CONTENT[lang]) lang = "es";

function render() {
  const c = CONTENT[lang];
  document.documentElement.lang = lang;
  document.title = c.meta.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", c.meta.desc);

  document.getElementById("app").innerHTML = build(c);
  document.getElementById("footer").innerHTML =
    `<span>${c.footer.left}</span><span>${c.footer.right}</span>`;

  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  observeSections();
}

function setLang(next) {
  if (next === lang || !CONTENT[next]) return;
  lang = next;
  localStorage.setItem("kinetic-lang", lang);
  render();
}

/* reveal on scroll */
let io;
function observeSections() {
  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".section").forEach((s) => io.observe(s));
}

document.querySelectorAll(".lang-toggle button").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

render();
