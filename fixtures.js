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
  "NFL": "New York",
  "UEFA Nations League": "Barcelona",
  "International friendly": "Barcelona",
};

// Confirmed matches published by bars (updated from their sites)
// Format: { date: "YYYY-MM-DD", home: "...", away: "...", bars: ["The George Payne"] }
const CONFIRMED_MATCHES = [
  { date: "2026-10-27", home: "Dortmund", away: "Wer. Bremen", bars: ["The George Payne"] },
  { date: "2026-10-27", home: "Fleetwood Town", away: "Arsenal", bars: ["The George Payne"] },
  { date: "2026-10-28", home: "Man City", away: "Brighton", bars: ["The George Payne"] },
  { date: "2026-10-28", home: "Celtic", away: "Dundee", bars: ["The George Payne"] },
  { date: "2026-10-28", home: "Liverpool", away: "Chelsea", bars: ["The George Payne"] },
  { date: "2026-10-29", home: "Everton", away: "Newcastle", bars: ["The George Payne"] },
  { date: "2026-10-30", home: "Villareal", away: "Espanyol", bars: ["The George Payne"] },
  // Add more as bars publish schedules
];

function getConfirmedBars(r) {
  const matches = CONFIRMED_MATCHES.filter(c => 
    c.date === r.date && 
    ((c.home.toLowerCase().includes(r.home.toLowerCase().slice(0, 6)) || r.home.toLowerCase().includes(c.home.toLowerCase().slice(0, 6))) &&
     (c.away.toLowerCase().includes(r.away.toLowerCase().slice(0, 6)) || r.away.toLowerCase().includes(c.away.toLowerCase().slice(0, 6))))
  );
  return matches.length ? matches[0].bars : [];
}

let rows = [];
const HIDE_LEAGUES = new Set(["Primeira Liga", "Eredivisie"]);
const sportEl = document.getElementById("fx-sport");
const leagueEl = document.getElementById("fx-league");
const teamEl = document.getElementById("fx-team");
const listEl = document.getElementById("fx-list");
const countEl = document.getElementById("fx-count");

function isUpcoming(r) {
  const now = new Date();
  const [y, m, d] = (r.date || "").split("-").map(Number);
  if (!y) return false;
  const [hh, mm] = (r.time || "23:59").split(":").map(Number);
  const kick = new Date(y, m - 1, d, hh || 0, mm || 0);
  return kick.getTime() >= now.getTime() - 2 * 60 * 60 * 1000;
}

function sameTeam(rowTeam, picked) {
  const a = (rowTeam || "").toLowerCase();
  const b = (picked || "").toLowerCase();
  if (!b) return true;
  if (a === b) return true;
  const barca = /bar[cç]a/;
  if (barca.test(b) && barca.test(a) && !/espanyol/.test(a)) return true;
  const madrid = /real madrid/;
  if (madrid.test(b) && madrid.test(a)) return true;
  return a.includes(b) || b.includes(a);
}

function filtered() {
  const s = sportEl.value;
  const l = leagueEl.value;
  const team = teamEl.value;
  return rows.filter((r) => {
    if (s && r.sport !== s) return false;
    if (l && r.league !== l) return false;
    if (!team) return true;
    return sameTeam(r.home, team) || sameTeam(r.away, team);
  });
}

function fillTeams() {
  const s = sportEl.value;
  const l = leagueEl.value;
  const names = new Set();
  rows.filter((r) => (!s || r.sport === s) && (!l || r.league === l) && r.sport === "football").forEach((r) => {
    names.add(r.home); names.add(r.away);
  });
  const keep = teamEl.value;
  const list = [...names].sort();
  teamEl.innerHTML = `<option value="">All teams</option>` + list.map((x) => `<option value="${x}">${x}</option>`).join("");
  if (list.includes(keep)) teamEl.value = keep;
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
    let city = CITY_FOR_LEAGUE[r.league] || "Barcelona";
    if (r.sport === "nfl" && /London/i.test(r.round || "")) city = "London";
    const sport = r.sport === "nfl" ? "nfl" : (r.sport === "rugby" ? "rugby" : (r.sport === "cricket" ? "cricket" : "football"));
    const href = `index.html?sport=${encodeURIComponent(sport)}&near=1`;
    const time = r.time ? r.time : "TBC";
    const score = Array.isArray(r.score) ? ` · ${r.score[0]}-${r.score[1]}` : "";
    const confirmed = getConfirmedBars(r);
    const badge = confirmed.length 
      ? `<div class="confirmed" style="margin-top:6px;font-size:0.85rem;color:#0a0;font-weight:600;">✓ Confirmed at ${confirmed.join(", ")}</div>` 
      : "";
    return `<article class="fx">
      <div class="when"><strong>${r.date}</strong>${time}${score}</div>
      <div>
        <div class="league">${r.sport} · ${r.league}${r.round ? " · " + r.round : ""}</div>
        <div class="teams">${r.home} — ${r.away}</div>
        ${badge}
      </div>
      <a href="${href}">Bars near me</a>
    </article>`;
  }).join("");
}

sportEl.addEventListener("change", () => { fillLeagues(); fillTeams(); render(); });
leagueEl.addEventListener("change", () => { fillTeams(); render(); });
teamEl.addEventListener("change", render);

const FALLBACK = [
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"12:30","home":"Chelsea","away":"Manchester United"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"15:00","home":"Newcastle United","away":"Everton"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"15:00","home":"Manchester City","away":"Brighton"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"17:30","home":"Tottenham","away":"Crystal Palace"},
  {"sport":"football","league":"LaLiga","date":"2026-11-01","time":"16:15","home":"Barcelona","away":"Real Madrid"},
  {"sport":"football","league":"LaLiga","date":"2026-11-01","time":"18:30","home":"Atletico Madrid","away":"Sevilla"},
  {"sport":"football","league":"Serie A","date":"2026-11-01","time":"18:00","home":"Inter","away":"Juventus"},
  {"sport":"football","league":"Bundesliga","date":"2026-11-01","time":"15:30","home":"Bayern Munich","away":"Borussia Dortmund"},
  {"sport":"football","league":"Ligue 1","date":"2026-11-01","time":"17:00","home":"PSG","away":"Marseille"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"21:00","home":"Arsenal","away":"Bayern Munich"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"21:00","home":"Real Madrid","away":"Liverpool"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-05","time":"21:00","home":"Barcelona","away":"Inter"}
];

async function loadFixtures() {
  try {
    const r = await fetch("/api/fixtures");
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data) && data.length) return data;
    }
  } catch (e) {}
  try {
    const r = await fetch("data/fixtures.json?t=" + Date.now());
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data) && data.length) return data;
    }
  } catch (e) {}
  return FALLBACK;
}

loadFixtures().then((data) => {
  rows = data.filter((r) => isUpcoming(r) && !HIDE_LEAGUES.has(r.league));
  const sports = [...new Set(rows.map((r) => r.sport))];
  sportEl.innerHTML = `<option value="">All sports</option>` + sports.map((s) => `<option value="${s}">${s}</option>`).join("");
  fillLeagues();
  fillTeams();
  render();
});
