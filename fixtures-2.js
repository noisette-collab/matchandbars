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
  "UEFA Champions League": "Barcelona",
  "Test": "London",
  "ODI": "London",
  "T20I": "London",
};

// Confirmed matches published by bars (updated from their sites)
// Format: { date: "YYYY-MM-DD", home: "...", away: "...", bars: ["The George Payne"] }
const CONFIRMED_MATCHES = [
  { date: "2026-10-31", home: "Chelsea", away: "Manchester United", bars: ["The George Payne"] },
  { date: "2026-10-31", home: "Manchester City", away: "Brighton", bars: ["The George Payne"] },
  { date: "2026-11-01", home: "Barcelona", away: "Alaves", bars: ["The George Payne"] },
  { date: "2026-11-01", home: "Racing Santander", away: "Real Madrid", bars: ["The George Payne"] },
  { date: "2026-11-04", home: "Arsenal", away: "Bayern Munich", bars: ["The George Payne"] },
  { date: "2026-11-04", home: "Real Madrid", away: "Liverpool", bars: ["The George Payne"] },
  { date: "2026-11-01", home: "Baltimore Ravens", away: "Buffalo Bills", bars: ["The George Payne"] },
  { date: "2026-11-01", home: "Kansas City Chiefs", away: "Denver Broncos", bars: ["The George Payne"] },
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
    if (r.sport === "nfl" && /Madrid/i.test(r.round || "")) city = "Madrid";
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
  // Premier League – Matchweek 9
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"13:30","home":"Chelsea","away":"Manchester United"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"16:00","home":"Bournemouth","away":"Leeds United"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"16:00","home":"Brentford","away":"Nottingham Forest"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"16:00","home":"Coventry City","away":"Sunderland"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"16:00","home":"Hull City","away":"Ipswich Town"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"16:00","home":"Manchester City","away":"Brighton"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"18:30","home":"Tottenham","away":"Crystal Palace"},
  {"sport":"football","league":"Premier League","date":"2026-10-31","time":"21:00","home":"Aston Villa","away":"Fulham"},
  {"sport":"football","league":"Premier League","date":"2026-11-01","time":"17:30","home":"Liverpool","away":"Arsenal"},
  {"sport":"football","league":"Premier League","date":"2026-11-02","time":"21:00","home":"Newcastle United","away":"Everton"},

  // LaLiga
  {"sport":"football","league":"LaLiga","date":"2026-10-30","time":"21:00","home":"Villarreal","away":"Espanyol"},
  {"sport":"football","league":"LaLiga","date":"2026-10-31","time":"14:00","home":"Levante","away":"Atletico Madrid"},
  {"sport":"football","league":"LaLiga","date":"2026-10-31","time":"16:15","home":"Rayo Vallecano","away":"Celta Vigo"},
  {"sport":"football","league":"LaLiga","date":"2026-10-31","time":"18:30","home":"Real Betis","away":"Malaga"},
  {"sport":"football","league":"LaLiga","date":"2026-10-31","time":"21:00","home":"Barcelona","away":"Alaves"},
  {"sport":"football","league":"LaLiga","date":"2026-11-01","time":"14:00","home":"Getafe","away":"Sevilla"},
  {"sport":"football","league":"LaLiga","date":"2026-11-01","time":"16:15","home":"Racing Santander","away":"Real Madrid"},
  {"sport":"football","league":"LaLiga","date":"2026-11-01","time":"18:30","home":"Elche","away":"Valencia"},
  {"sport":"football","league":"LaLiga","date":"2026-11-01","time":"21:00","home":"Athletic Club","away":"Real Sociedad"},
  {"sport":"football","league":"LaLiga","date":"2026-11-02","time":"21:00","home":"Deportivo La Coruna","away":"Osasuna"},
  {"sport":"football","league":"LaLiga","date":"2026-11-08","time":"21:00","home":"Atletico Madrid","away":"Barcelona"},

  // UEFA Champions League – Matchday 4
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-03","time":"18:45","home":"Atletico Madrid","away":"Bayern Munich"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-03","time":"21:00","home":"Barcelona","away":"Aston Villa"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-03","time":"21:00","home":"Manchester United","away":"Roma"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-03","time":"21:00","home":"Villarreal","away":"PSG"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"18:45","home":"AEK Athens","away":"Real Madrid"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"18:45","home":"Fenerbahce","away":"Liverpool"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"21:00","home":"Borussia Dortmund","away":"Real Betis"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"21:00","home":"RB Leipzig","away":"Manchester City"},
  {"sport":"football","league":"UEFA Champions League","date":"2026-11-04","time":"21:00","home":"Slavia Prague","away":"Arsenal"},

  // Serie A / Bundesliga / Ligue 1 samples
  {"sport":"football","league":"Serie A","date":"2026-11-01","time":"18:00","home":"Inter","away":"Juventus"},
  {"sport":"football","league":"Bundesliga","date":"2026-11-01","time":"15:30","home":"Bayern Munich","away":"Borussia Dortmund"},
  {"sport":"football","league":"Ligue 1","date":"2026-11-01","time":"17:00","home":"PSG","away":"Marseille"},

  // NFL Week 8 (times approx CEST)
  {"sport":"nfl","league":"NFL","date":"2026-10-29","time":"02:15","home":"Carolina Panthers","away":"Green Bay Packers","round":"Thursday Night"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Baltimore Ravens","away":"Buffalo Bills"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Tennessee Titans","away":"Cincinnati Bengals"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Arizona Cardinals","away":"Dallas Cowboys"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Minnesota Vikings","away":"Detroit Lions"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Indianapolis Colts","away":"Jacksonville Jaguars"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Las Vegas Raiders","away":"New York Jets"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Cleveland Browns","away":"Pittsburgh Steelers"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"19:00","home":"Atlanta Falcons","away":"Tampa Bay Buccaneers"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"22:05","home":"Los Angeles Chargers","away":"Los Angeles Rams"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"22:25","home":"Kansas City Chiefs","away":"Denver Broncos"},
  {"sport":"nfl","league":"NFL","date":"2026-11-01","time":"22:25","home":"New England Patriots","away":"Miami Dolphins"},
  {"sport":"nfl","league":"NFL","date":"2026-11-02","time":"02:20","home":"Philadelphia Eagles","away":"Washington Commanders","round":"Sunday Night"},
  {"sport":"nfl","league":"NFL","date":"2026-11-02","time":"02:15","home":"Chicago Bears","away":"Seattle Seahawks","round":"Monday Night"},

  // NFL Week 9 sample (international in Madrid)
  {"sport":"nfl","league":"NFL","date":"2026-11-08","time":"15:30","home":"Cincinnati Bengals","away":"Atlanta Falcons","round":"Madrid"},

  // Cricket
  {"sport":"cricket","league":"Test","date":"2026-11-09","time":"10:00","home":"Pakistan","away":"Sri Lanka","round":"1st Test Rawalpindi"},
  {"sport":"cricket","league":"ODI","date":"2026-11-12","time":"03:30","home":"Australia","away":"England","round":"1st ODI Perth"},
  {"sport":"cricket","league":"ODI","date":"2026-11-15","time":"03:30","home":"Australia","away":"England","round":"2nd ODI Adelaide"},
  {"sport":"cricket","league":"T20I","date":"2026-11-21","time":"08:15","home":"Australia","away":"England","round":"1st T20I MCG"},
  {"sport":"cricket","league":"Test","date":"2026-11-17","time":"10:00","home":"Pakistan","away":"Sri Lanka","round":"2nd Test Lahore"},
  {"sport":"cricket","league":"T20I","date":"2026-11-22","time":"14:00","home":"India A","away":"Pakistan A","round":"Asia Cup Rising Stars"},
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
