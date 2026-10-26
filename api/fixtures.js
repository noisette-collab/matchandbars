export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
  try {
    const leagues = [
      { id: 4328, name: "Premier League", sport: "football", season: "2025-2026" },
      { id: 4335, name: "LaLiga", sport: "football", season: "2025-2026" },
      { id: 4332, name: "Serie A", sport: "football", season: "2025-2026" },
      { id: 4331, name: "Bundesliga", sport: "football", season: "2025-2026" },
      { id: 4334, name: "Ligue 1", sport: "football", season: "2025-2026" },
      { id: 4480, name: "UEFA Champions League", sport: "football", season: "2025-2026" },
    ];
    const today = new Date().toISOString().slice(0, 10);
    const out = [];
    for (const lg of leagues) {
      try {
        const r = await fetch(`https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=${lg.id}&s=${lg.season}`, { next: { revalidate: 1800 } });
        if (!r.ok) continue;
        const j = await r.json();
        for (const e of j.events || []) {
          const date = (e.dateEvent || "").slice(0, 10);
          if (!date || date < today) continue;
          out.push({
            sport: lg.sport,
            league: lg.name,
            round: e.intRound || "",
            date,
            time: (e.strTime || "20:00").slice(0, 5),
            home: e.strHomeTeam || "",
            away: e.strAwayTeam || "",
            status: e.strStatus || "scheduled",
            score: e.intHomeScore != null ? `${e.intHomeScore}-${e.intAwayScore}` : null,
            source: "TheSportsDB",
          });
        }
      } catch (_) {}
    }
    out.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    if (out.length) {
      res.status(200).json(out.slice(0, 100));
      return;
    }
    // Fallback empty but valid
    res.status(200).json([]);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
