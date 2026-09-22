const I18N = {
  en: {
    navDir: "Directory", navFix: "Fixtures", navOwners: "Got a bar?",
    title: "Which bar is showing the match?",
    lead: "Find sports bars for football, rugby and cricket in 11 cities. Listings come from public guides. Always confirm the fixture with the venue.",
    searchPh: "Search by name or neighbourhood…", searchBtn: "Search",
    disclaimer: "Not an official TV schedule. Rights change; not every bar shows every sport.",
    dirTitle: "Directory", count: (n) => `${n} venues`, all: "All sports",
    maps: "Open in Maps", source: "Public source", nearBtn: "Use my location",
    ownTitle: "Do you run a bar?", ownLead: "Email us. Phase 2 will let venues claim their listing.",
    ownLabel: "Bar name", ownPh: "Name, city, WhatsApp", ownBtn: "Send",
    footer: "Public-source listings. Always check with the venue.",
  },
  es: {
    navDir: "Directorio", navFix: "Partidos", navOwners: "¿Tienes un bar?",
    title: "¿En qué bar ponen el partido?",
    lead: "Bares para ver fútbol, rugby y cricket en 11 ciudades. Datos de guías públicas. Confirma siempre con el local.",
    searchPh: "Busca por nombre o barrio…", searchBtn: "Buscar",
    disclaimer: "No es una programación oficial. Los derechos cambian.",
    dirTitle: "Directorio", count: (n) => `${n} locales`, all: "Todos los deportes",
    maps: "Abrir en Maps", source: "Fuente pública", nearBtn: "Usar mi ubicación",
    ownTitle: "¿Tienes un bar?", ownLead: "Escríbenos. En la fase 2 el local podrá validar su ficha.",
    ownLabel: "Nombre del bar", ownPh: "Nombre, ciudad, WhatsApp", ownBtn: "Enviar",
    footer: "Datos de fuentes públicas. Verifica con el local.",
  },
  zh: {
    navDir: "目录", navFix: "赛程", navOwners: "我有酒吧",
    title: "哪家酒吧在转播比赛？",
    lead: "11 座城市的足球、橄榄球与板球酒吧。来自公开指南。请向店家确认当日赛事。",
    searchPh: "按店名或街区搜索…", searchBtn: "搜索",
    disclaimer: "非官方转播表。版权会变。",
    dirTitle: "目录", count: (n) => `${n} 家`, all: "全部运动",
    maps: "打开地图", source: "公开来源", nearBtn: "使用我的位置",
    ownTitle: "你开酒吧吗？", ownLead: "先发邮件。第二阶段店家可以认领页面。",
    ownLabel: "店名", ownPh: "店名、城市、WhatsApp", ownBtn: "发送",
    footer: "公开来源。请向店家核实。",
  },
};

const CITY_CENTERS = {
  Barcelona: [41.387, 2.168],
  London: [51.507, -0.127],
  Paris: [48.857, 2.351],
  Madrid: [40.417, -3.703],
  Berlin: [52.52, 13.405],
  Rome: [41.903, 12.496],
  Amsterdam: [52.373, 4.89],
  Dublin: [53.35, -6.26],
  Munich: [48.137, 11.576],
  Lisbon: [38.722, -9.139],
  "New York": [40.758, -73.985],
};

let bars = [];
let city = "Barcelona";
let sport = "";
let lang = localStorage.getItem("mab-lang") || "en";
let map, markers = [];

const $ = (id) => document.getElementById(id);
const t = () => I18N[lang] || I18N.en;

function applyStatic() {
  const d = t();
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (typeof d[el.dataset.i18n] === "string") el.textContent = d[el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    if (d[el.dataset.i18nPlaceholder]) el.placeholder = d[el.dataset.i18nPlaceholder];
  });
  document.querySelectorAll(".langs button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
}

function cities() {
  return [...new Set(bars.map((b) => b.city))].sort();
}

function fillSelects() {
  const cityEl = $("city");
  const sportEl = $("sport");
  cityEl.innerHTML = cities().map((c) => `<option value="${c}">${c}</option>`).join("");
  cityEl.value = city;
  const sports = [...new Set(bars.flatMap((b) => b.sports || []))];
  sportEl.innerHTML = `<option value="">${t().all}</option>` + sports.map((s) => `<option value="${s}">${s}</option>`).join("");
  sportEl.value = sport;
}

function filtered() {
  const q = ($("q").value || "").trim().toLowerCase();
  return bars.filter((b) => {
    if (city && b.city !== city) return false;
    if (sport && !(b.sports || []).includes(sport)) return false;
    if (!q) return true;
    return [b.name, b.zone, b.address, ...(b.sports || [])].join(" ").toLowerCase().includes(q);
  });
}

function render() {
  const list = filtered();
  $("count").textContent = t().count(list.length);
  $("dir-title").textContent = city;
  $("grid").innerHTML = list.map((b) => `
    <article class="card">
      <h3>${b.name}</h3>
      <div class="meta">${b.city} · ${b.zone} · ${b.address}</div>
      <div class="tags">${(b.sports || []).map((s) => `<span class="tag">${s}</span>`).join("")}</div>
      <p class="notes">${b.notes || ""}</p>
      <div class="source">${t().source}: ${b.source || ""}</div>
      <a class="maps" href="${b.maps}" target="_blank" rel="noopener">${t().maps}</a>
    </article>`).join("");
  syncMap(list);
}

function initMap() {
  const c = CITY_CENTERS[city] || [41.39, 2.17];
  map = L.map("map").setView(c, 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);
}

function syncMap(list) {
  if (!map) return;
  markers.forEach((m) => map.removeLayer(m));
  markers = [];
  list.forEach((b) => {
    if (b.lat == null) return;
    const m = L.marker([b.lat, b.lng]).addTo(map);
    m.bindPopup(`<strong>${b.name}</strong><br>${b.zone}<br>${(b.sports || []).join(", ")}`);
    markers.push(m);
  });
  const c = CITY_CENTERS[city];
  if (c) map.setView(c, 12);
  setTimeout(() => map.invalidateSize(), 200);
}

function nearestCity(lat, lng) {
  let best = city, bestD = Infinity;
  Object.entries(CITY_CENTERS).forEach(([name, [clat, clng]]) => {
    const d = (lat - clat) ** 2 + (lng - clng) ** 2;
    if (d < bestD) { bestD = d; best = name; }
  });
  return best;
}

async function load() {
  bars = await (await fetch("data/bars.json")).json();
  applyStatic();
  fillSelects();
  initMap();
  render();
}

$("city").addEventListener("change", () => { city = $("city").value; render(); });
$("sport").addEventListener("change", () => { sport = $("sport").value; render(); });
$("search-form").addEventListener("submit", (e) => { e.preventDefault(); render(); });
$("q").addEventListener("input", render);
$("near-btn").addEventListener("click", () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition((pos) => {
    city = nearestCity(pos.coords.latitude, pos.coords.longitude);
    $("city").value = city;
    render();
    L.circleMarker([pos.coords.latitude, pos.coords.longitude], {
      radius: 8, color: "#c8f54a", fillColor: "#c8f54a", fillOpacity: 0.8,
    }).addTo(map).bindPopup("You");
    map.setView([pos.coords.latitude, pos.coords.longitude], 13);
  });
});
document.querySelectorAll(".langs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    lang = btn.dataset.lang;
    localStorage.setItem("mab-lang", lang);
    applyStatic();
    fillSelects();
    render();
  });
});

load();
