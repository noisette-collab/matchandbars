const CITY_FOR_LEAGUE = {
  "Premier League": "London",
  "LaLiga": "Madrid",
  "Serie A": "Rome",
  "Bundesliga": "Berlin",
  "Ligue 1": "Paris",
  "Eredivisie": "Amsterdam",
  "Primeira Liga": "Lisbon",
  "Premiership Rugby": "London",
  "United Rugby Championship": "Dublin",
  "Top 14": "Paris",
  "County Championship": "London",
};

let rows = [];
const sportEl = document.getElementById("fx-sport");
const leagueEl = document.getElementById("fx-league");
const listEl = document.getElementById("fx-list");
const countEl = document.getElementById("fx-count");

function filtered() {
  const s = sportEl.value;
  const l = leagueEl.value;
  return rows.filter((r) => (!s || r.sport === s) && (!l || r.league === l));
}

function fillLeagues() {
  const s = sportEl.value;
  const leagues = [...new Set(rows.filter((r) => !s || r.sport === s).map((r) => r.league))].sort();
  const keep = leagueEl.value;
  leagueEl.innerHTML = `<option value="">All leagues</option>` + leagues.map((x) => `<option value="${x}">${x}</option>`).join("");
  if (leagues.includes(keep)) leagueEl.value = keep;
}

function render() {
  const list = filtered();
  countEl.textContent = `${list.length} matches`;
  listEl.innerHTML = list.map((r) => {
    const city = CITY_FOR_LEAGUE[r.league] || "Barcelona";
    const time = r.time ? r.time : "TBC";
    const score = Array.isArray(r.score) ? ` · ${r.score[0]}-${r.score[1]}` : "";
    return `<article class="fx">
      <div class="when"><strong>${r.date}</strong>${time}${score}</div>
      <div>
        <div class="league">${r.sport} · ${r.league}${r.round ? " · " + r.round : ""}</div>
        <div class="teams">${r.home} — ${r.away}</div>
      </div>
      <a href="index.html">Bars in ${city}</a>
    </article>`;
  }).join("");
}

sportEl.addEventListener("change", () => { fillLeagues(); render(); });
leagueEl.addEventListener("change", render);

fetch("data/fixtures.json")
  .then((r) => r.json())
  .then((data) => {
    rows = data;
    const sports = [...new Set(rows.map((r) => r.sport))];
    sportEl.innerHTML = `<option value="">All sports</option>` + sports.map((s) => `<option value="${s}">${s}</option>`).join("");
    fillLeagues();
    render();
  });
