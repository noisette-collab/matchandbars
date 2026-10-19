export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  try {
    const leagues = [
      { id: 4328, name: "Premier League", sport: "football" },
      { id: 4335, name: "LaLiga", sport: "football" },
      { id: 4332, name: "Serie A", sport: "football" },
      { id: 4331, name: "Bundesliga", sport: "football" },
      { id: 4334, name: "Ligue 1", sport: "football" },
      { id: 4480, name: "UEFA Champions League", sport: "football" },
    ];
    const out = [];
    for (const lg of leagues) {
      const r = await fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${lg.id}`);
      if (!r.ok) continue;
      const j = await r.json();
      for (const e of j.events || []) {
        out.push({
          sport: lg.sport,
          league: lg.name,
          round: e.intRound || "",
          date: (e.dateEvent || "").slice(0, 10),
          time: (e.strTime || "20:00").slice(0, 5),
          home: e.strHomeTeam || "",
          away: e.strAwayTeam || "",
          status: e.strStatus || "scheduled",
          score: e.intHomeScore != null ? `${e.intHomeScore}-${e.intAwayScore}` : null,
          source: "TheSportsDB",
        });
      }
    }
    out.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    res.status(200).json(out);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
