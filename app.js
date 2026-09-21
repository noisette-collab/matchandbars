const I18N = {
  en: {
    navDir: "Directory",
    navOwners: "Got a bar?",
    kicker: "Barcelona · beta",
    title: "Which bar is showing the match?",
    lead: "We connect fans with venues that screen football. This first version lists bars that already appear in public guides. Always confirm the fixture with the venue before you go.",
    searchPh: "Search by bar, neighbourhood or tag…",
    searchBtn: "Search",
    disclaimer: "Listings are not an official TV schedule. Broadcast rights change and not every bar shows every competition.",
    dirTitle: "Bars in Barcelona",
    count: (n) => `${n} venues`,
    all: "All",
    maps: "Open in Maps",
    source: "Public source",
    ownTitle: "Do you run a bar that shows football?",
    ownLead: "Join for free. When the dashboard is ready you can list which matches you show and fans will find you on match day.",
    ownLabel: "Bar name",
    ownPh: "Name, neighbourhood, WhatsApp",
    ownBtn: "Send interest",
    footer: "Initial data compiled from public sources (Time Out, local guides). Always check with the venue.",
  },
  es: {
    navDir: "Directorio",
    navOwners: "¿Tienes un bar?",
    kicker: "Barcelona · beta",
    title: "¿En qué bar ponen el partido?",
    lead: "Conectamos aficionados con locales que retransmiten fútbol. Esta primera versión recoge bares que ya salen en guías públicas. Confirma siempre el partido con el local antes de ir.",
    searchPh: "Busca por bar, barrio o etiqueta…",
    searchBtn: "Buscar",
    disclaimer: "Las fichas no son una programación oficial. Los derechos de TV cambian y no todos los bares ponen todas las competiciones.",
    dirTitle: "Bares en Barcelona",
    count: (n) => `${n} locales`,
    all: "Todos",
    maps: "Abrir en Maps",
    source: "Fuente pública",
    ownTitle: "¿Tienes un bar y pones fútbol?",
    ownLead: "Apúntate gratis. Cuando tengamos el panel podrás indicar qué partidos pones y los aficionados te encontrarán el día del partido.",
    ownLabel: "Nombre del bar",
    ownPh: "Nombre, barrio, WhatsApp",
    ownBtn: "Enviar interés",
    footer: "Datos iniciales compilados de fuentes públicas (Time Out, guías locales). Verifica siempre con el local.",
  },
  zh: {
    navDir: "目录",
    navOwners: "我有酒吧",
    kicker: "巴塞罗那 · 测试版",
    title: "哪家酒吧在转播这场比赛？",
    lead: "我们把球迷和转播足球的酒吧连在一起。第一版收录已出现在公开指南里的场所。出发前请务必向店家确认当天转播的比赛。",
    searchPh: "按酒吧、街区或标签搜索…",
    searchBtn: "搜索",
    disclaimer: "列表不是官方转播表。转播版权会变，不是每家酒吧都播所有赛事。",
    dirTitle: "巴塞罗那的酒吧",
    count: (n) => `${n} 家`,
    all: "全部",
    maps: "在地图中打开",
    source: "公开来源",
    ownTitle: "你的酒吧转播足球吗？",
    ownLead: "免费登记。后台就绪后你可以标出转播哪些比赛，球迷比赛日就能找到你。",
    ownLabel: "酒吧名称",
    ownPh: "店名、街区、WhatsApp",
    ownBtn: "提交意向",
    footer: "初始数据来自公开来源（Time Out、本地指南）。请始终向店家核实。",
  },
};

const BAR_I18N = {
  en: {
    "ovella-negra-poblenou": {
      tags: ["giant screens", "large venue", "table football"],
      bestFor: "Big-atmosphere matches",
      notes: "Warehouse of about 2,000 m². Regularly listed in Time Out and local guides. Reservations are not always available.",
      source: "Time Out Barcelona / local guides",
    },
    "ovella-negra-raval": {
      tags: ["screens", "groups"],
      bestFor: "Matches in the centre",
      notes: "Sister venue, also cited as a place to watch games. Confirm screens and hours on the day.",
      source: "Local guides",
    },
    "michael-collins": {
      tags: ["giant screen", "Irish pub", "food"],
      bestFor: "Broad sports schedule and a sit-down meal",
      notes: "Time Out highlights its sports TV schedule and large screen. Check their own calendar.",
      source: "Time Out Barcelona",
    },
    belushis: {
      tags: ["projectors", "touristy", "international"],
      bestFor: "International sports and mixed groups",
      notes: "Presents itself as a home of international sport: several projectors and TVs. More tourist-facing.",
      source: "Time Out Barcelona / venue site",
    },
    "george-payne": {
      tags: ["projector", "many screens", "groups"],
      bestFor: "Champions League and large groups",
      notes: "Guides cite a projector plus multiple HD screens. Top fixtures may need a booking or minimum spend — confirm first.",
      source: "Barcelona Urbana / Yelp",
    },
    "wild-rover": {
      tags: ["Premier League", "screens", "pub"],
      bestFor: "Premier League and UFC",
      notes: "Often recommended for Premier League. Smaller on cup finals; arrive early.",
      source: "Local guides",
    },
    flahertys: {
      tags: ["projectors", "Irish pub"],
      bestFor: "World Cup and international fixtures",
      notes: "World Cup 2026 guides list several projectors and TVs. Confirm opening hours on match day.",
      source: "Barcelona Life / Yelp",
    },
    cocovail: {
      tags: ["craft beer", "screens", "food"],
      bestFor: "Match plus craft beer",
      notes: "Yelp and guides highlight football and food. Less of a tourist-pub feel.",
      source: "Yelp",
    },
    "sports-bar-ample": {
      tags: ["giant screen", "pizza", "food"],
      bestFor: "Dinner and a match",
      notes: "Guides place it in the Gothic Quarter with TVs and a large screen. Check they are showing your competition that day.",
      source: "Barcelona Urbana / Salir.com",
    },
    "old-irish-pub": {
      tags: ["many TVs", "upstairs room"],
      bestFor: "World Cup and international fans",
      notes: "World Cup guides mention many HD screens and an extra room. Confirm on the venue site.",
      source: "Barcelona Life",
    },
    prorroga: {
      tags: ["neighbourhood bar", "screen"],
      bestFor: "A local Gràcia atmosphere",
      notes: "Appears on sports-bar lists. Less touristy. Call ahead for quieter fixtures.",
      source: "Yelp",
    },
    futballarium: {
      tags: ["football-themed", "near Camp Nou"],
      bestFor: "Barça match days in Les Corts",
      notes: "Football-themed venue. Confirm hours and which competitions they show — not every bar has every league.",
      source: "Yelp / public listings",
    },
  },
  es: {
    "ovella-negra-poblenou": {
      tags: ["pantallas gigantes", "aforo grande", "futbolín"],
      bestFor: "Partidos con ambiente y mucha gente",
      notes: "Nave de unos 2.000 m². Sale a menudo en Time Out y guías locales. No siempre acepta reservas.",
      source: "Time Out Barcelona / guías locales",
    },
    "ovella-negra-raval": {
      tags: ["pantallas", "grupos"],
      bestFor: "Partidos en el centro",
      notes: "Local hermano, también citado para ver partidos. Confirma horario y pantalla el mismo día.",
      source: "Guías locales",
    },
    "michael-collins": {
      tags: ["pantalla gigante", "pub irlandés", "comida"],
      bestFor: "Programación deportiva amplia y comer con calma",
      notes: "Time Out lo destaca por la programación televisada y la pantalla grande. Consulta su calendario.",
      source: "Time Out Barcelona",
    },
    belushis: {
      tags: ["proyectores", "turístico", "internacional"],
      bestFor: "Deportes internacionales y grupos mixtos",
      notes: "Se presenta como casa de los deportes internacionales: varios proyectores y TVs. Ambiente más turístico.",
      source: "Time Out Barcelona / web del local",
    },
    "george-payne": {
      tags: ["proyector", "muchas pantallas", "grupos"],
      bestFor: "Champions y grupos grandes",
      notes: "Las guías hablan de proyector y varias pantallas HD. En partidos top a veces piden reserva o consumo mínimo.",
      source: "Barcelona Urbana / Yelp",
    },
    "wild-rover": {
      tags: ["Premier League", "pantallas", "pub"],
      bestFor: "Premier League y UFC",
      notes: "Suele recomendarse para Premier. Más justo en finales; llega pronto.",
      source: "Guías locales",
    },
    flahertys: {
      tags: ["proyectores", "pub irlandés"],
      bestFor: "Mundial y partidos internacionales",
      notes: "Guías del Mundial 2026 lo listan con varios proyectores y TVs. Confirma apertura el día del partido.",
      source: "Barcelona Life / Yelp",
    },
    cocovail: {
      tags: ["cerveza artesana", "pantallas", "comida"],
      bestFor: "Partido y cerveza artesana",
      notes: "Yelp y guías lo destacan para ver fútbol y comer. Menos ambiente de pub turístico.",
      source: "Yelp",
    },
    "sports-bar-ample": {
      tags: ["pantalla gigante", "pizza", "comida"],
      bestFor: "Cenar y ver el partido",
      notes: "Las guías lo sitúan en el Gótico con TVs y pantalla grande. Verifica si ponen tu competición ese día.",
      source: "Barcelona Urbana / Salir.com",
    },
    "old-irish-pub": {
      tags: ["muchas TVs", "sala de arriba"],
      bestFor: "Mundial y aficiones internacionales",
      notes: "Guías del Mundial hablan de muchas pantallas HD y una sala extra. Confirma en su web.",
      source: "Barcelona Life",
    },
    prorroga: {
      tags: ["bar de barrio", "pantalla"],
      bestFor: "Ambiente de barrio en Gràcia",
      notes: "Aparece en listas de sports bars. Menos turístico. Llama antes en partidos discretos.",
      source: "Yelp",
    },
    futballarium: {
      tags: ["temático", "cerca del Camp Nou"],
      bestFor: "Días de Barça en Les Corts",
      notes: "Local temático de fútbol. Confirma horarios y qué ligas ponen.",
      source: "Yelp / fichas públicas",
    },
  },
  zh: {
    "ovella-negra-poblenou": {
      tags: ["超大屏幕", "场地大", "桌上足球"],
      bestFor: "气氛热烈、人多的比赛",
      notes: "约 2,000 平方米的旧厂房。常出现在 Time Out 和本地指南。不一定接受预订。",
      source: "Time Out Barcelona / 本地指南",
    },
    "ovella-negra-raval": {
      tags: ["屏幕", "适合聚会"],
      bestFor: "在市中心看球",
      notes: "同一品牌的另一家店。请当天确认屏幕和营业时间。",
      source: "本地指南",
    },
    "michael-collins": {
      tags: ["大屏", "爱尔兰酒吧", "餐食"],
      bestFor: "赛事多、适合坐下吃饭",
      notes: "Time Out 提到体育转播和大屏幕。请查看店家自己的赛程。",
      source: "Time Out Barcelona",
    },
    belushis: {
      tags: ["投影", "游客多", "国际赛事"],
      bestFor: "国际赛事和混合客群",
      notes: "自称国际体育之家，有多台投影和电视。游客更多。",
      source: "Time Out Barcelona / 店家网站",
    },
    "george-payne": {
      tags: ["投影", "多屏幕", "团体"],
      bestFor: "欧冠和大型团体",
      notes: "指南提到投影加多块高清屏。热门场次可能要预订或最低消费。",
      source: "Barcelona Urbana / Yelp",
    },
    "wild-rover": {
      tags: ["英超", "屏幕", "酒吧"],
      bestFor: "英超和 UFC",
      notes: "常被推荐看英超。决赛日会挤，建议早到。",
      source: "本地指南",
    },
    flahertys: {
      tags: ["投影", "爱尔兰酒吧"],
      bestFor: "世界杯和国际比赛",
      notes: "2026 世界杯指南列出多台投影和电视。比赛日请确认营业。",
      source: "Barcelona Life / Yelp",
    },
    cocovail: {
      tags: ["精酿啤酒", "屏幕", "餐食"],
      bestFor: "看球加精酿",
      notes: "Yelp 和指南强调看球和食物。游客酒吧感更弱。",
      source: "Yelp",
    },
    "sports-bar-ample": {
      tags: ["大屏", "披萨", "餐食"],
      bestFor: "吃饭看球",
      notes: "指南将其放在哥特区，有电视和大屏。请确认当天转播你要的赛事。",
      source: "Barcelona Urbana / Salir.com",
    },
    "old-irish-pub": {
      tags: ["多台电视", "楼上包间"],
      bestFor: "世界杯和国际球迷",
      notes: "世界杯指南提到多块高清屏和额外房间。请到店家网站确认。",
      source: "Barcelona Life",
    },
    prorroga: {
      tags: ["街区酒吧", "屏幕"],
      bestFor: "格拉西亚街区氛围",
      notes: "出现在体育酒吧名单。游客较少。冷门场次建议先打电话。",
      source: "Yelp",
    },
    futballarium: {
      tags: ["足球主题", "靠近诺坎普"],
      bestFor: "巴萨比赛日（Les Corts）",
      notes: "足球主题店。请确认营业时间和转播的联赛。",
      source: "Yelp / 公开信息",
    },
  },
};

const grid = document.getElementById("grid");
const count = document.getElementById("count");
const q = document.getElementById("q");
const filtersEl = document.getElementById("filters");

let bars = [];
let zone = null;
let lang = localStorage.getItem("mab-lang") || detectLang();

function detectLang() {
  const n = (navigator.language || "en").toLowerCase();
  if (n.startsWith("zh")) return "zh";
  if (n.startsWith("es")) return "es";
  return "en";
}

function t() {
  return I18N[lang] || I18N.en;
}

function barCopy(id) {
  return (BAR_I18N[lang] && BAR_I18N[lang][id]) || BAR_I18N.en[id] || {};
}

function applyStatic() {
  const dict = t();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (typeof dict[key] === "string") el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });
  document.querySelectorAll(".langs button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  document.title =
    lang === "es"
      ? "Match & Bars — Dónde ver el partido"
      : lang === "zh"
      ? "Match & Bars — 去哪家酒吧看球"
      : "Match & Bars — Where to watch the match";
}

async function load() {
  const res = await fetch("data/bars.json");
  bars = await res.json();
  applyStatic();
  renderFilters();
  render();
}

function zones() {
  return [null, ...Array.from(new Set(bars.map((b) => b.zone)))];
}

function renderFilters() {
  filtersEl.innerHTML = "";
  zones().forEach((z) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (z === zone ? " active" : "");
    btn.textContent = z === null ? t().all : z;
    btn.onclick = () => {
      zone = z;
      renderFilters();
      render();
    };
    filtersEl.appendChild(btn);
  });
}

function filtered() {
  const term = (q.value || "").trim().toLowerCase();
  return bars.filter((b) => {
    const copy = barCopy(b.id);
    const zoneOk = zone === null || b.zone === zone;
    if (!zoneOk) return false;
    if (!term) return true;
    const blob = [b.name, b.zone, b.address, copy.bestFor, ...(copy.tags || [])]
      .join(" ")
      .toLowerCase();
    return blob.includes(term);
  });
}

function render() {
  const list = filtered();
  const dict = t();
  count.textContent = dict.count(list.length);
  grid.innerHTML = list
    .map((b) => {
      const copy = barCopy(b.id);
      return `
      <article class="card">
        <h3>${b.name}</h3>
        <div class="meta">${b.zone} · ${b.address}</div>
        <div class="tags">${(copy.tags || []).map((x) => `<span class="tag">${x}</span>`).join("")}</div>
        <p class="notes"><strong>${copy.bestFor}.</strong> ${copy.notes}</p>
        <div class="source">${dict.source}: ${copy.source}</div>
        <a class="maps" href="${b.maps}" target="_blank" rel="noopener">${dict.maps}</a>
      </article>`;
    })
    .join("");
}

function setLang(next) {
  lang = next;
  localStorage.setItem("mab-lang", lang);
  applyStatic();
  renderFilters();
  render();
}

document.querySelectorAll(".langs button").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});
q.addEventListener("input", render);

load();
