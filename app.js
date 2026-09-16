const listings = [
{ city: "Barcelona", bar: "Can Barça", address: "Carrer de Blai, 20", team: "FC Barcelona", competition: "LaLiga", kickoff: "2026-09-20T21:00:00+02:00", notes: "Pantalla gran" },
{ city: "Barcelona", bar: "The Sports Bar", address: "Carrer de Consell de Cent, 333", team: "Real Madrid", competition: "LaLiga", kickoff: "2026-09-20T21:00:00+02:00" },
{ city: "Girona", bar: "Bar del Riu", address: "Plaça de la Independència, 4", team: "Girona FC", competition: "LaLiga", kickoff: "2026-09-21T18:30:00+02:00" },
{ city: "València", bar: "Cafeteria Mestalla", address: "Avinguda de Suècia, 12", team: "Valencia CF", competition: "LaLiga", kickoff: "2026-09-21T16:15:00+02:00" }
];

const citySelect = document.getElementById("city");
const teamSelect = document.getElementById("team");
const list = document.getElementById("list");

[...new Set(listings.map(l => l.city))].sort().forEach(c => {
const o = document.createElement("option"); o.value = c; o.textContent = c; citySelect.appendChild(o);
});
[...new Set(listings.map(l => l.team))].sort().forEach(t => {
const o = document.createElement("option"); o.value = t; o.textContent = t; teamSelect.appendChild(o);
});

function formatKickoff(iso) {
return new Intl.DateTimeFormat("ca-ES", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function render() {
const city = citySelect.value, team = teamSelect.value;
const filtered = listings.filter(l => (!city || l.city === city) && (!team || l.team === team));
if (!filtered.length) { list.innerHTML = '<p class="empty">Cap resultat.</p>'; return; }
list.innerHTML = filtered.map(l => `
<article class="card">
<h2>${l.bar}</h2>
<div class="meta">${l.city} · ${l.address}<br>${l.team} · ${l.competition}<br>${formatKickoff(l.kickoff)}${l.notes ? "<br>" + l.notes : ""}</div>
<span class="tag">Horari</span>
</article>`).join("");
}
citySelect.onchange = teamSelect.onchange = render;
render();
