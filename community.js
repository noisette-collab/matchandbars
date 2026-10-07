import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const sb = createClient(
  "https://tzhnxzeueirtiasqzxmj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aG54emV1ZWlydGlhc3F6eG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1OTM5MjAsImV4cCI6MjEwNjE2OTkyMH0.FvhtDABkjF3-XEH9VtHUvxLjG2iASSz7VJiegluj-og"
);

let session = null;

function esc(s) {
  return String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&", "<": "<", ">": ">", '"': """ }[c]));
}

async function refreshAuth() {
  const { data } = await sb.auth.getSession();
  session = data.session;
  const box = document.getElementById("auth-box");
  if (!box) return;
  if (session) {
    box.innerHTML = `<span class="auth-who">${esc(session.user.email)}</span> <button type="button" id="logout">Log out</button>`;
    document.getElementById("logout").onclick = async () => { await sb.auth.signOut(); location.reload(); };
  } else {
    box.innerHTML = `<button type="button" id="open-auth">Log in</button>`;
    document.getElementById("open-auth").onclick = openAuth;
  }
}

function openAuth() {
  const email = prompt("Email");
  if (!email) return;
  const password = prompt("Password (min 6). New email creates an account.");
  if (!password) return;
  sb.auth.signInWithPassword({ email, password }).then(async ({ error }) => {
    if (!error) { await refreshAuth(); window.mabRefreshComments && window.mabRefreshComments(); return; }
    const sign = await sb.auth.signUp({ email, password });
    alert(sign.error ? sign.error.message : "Account created. Check your email if confirmation is on, then log in.");
    await refreshAuth();
  });
}

async function loadComments(ids) {
  if (!ids.length) return { comments: [], ratings: [] };
  const [c, r] = await Promise.all([
    sb.from("comments").select("id,bar_id,body,created_at,user_id").in("bar_id", ids).order("created_at", { ascending: false }),
    sb.from("ratings").select("bar_id,stars,user_id").in("bar_id", ids),
  ]);
  return { comments: c.data || [], ratings: r.data || [] };
}

window.mabRefreshComments = async function () {
  const cards = [...document.querySelectorAll("[data-bar]")];
  const ids = cards.map((el) => el.dataset.bar);
  const { comments, ratings } = await loadComments(ids);
  cards.forEach((el) => {
    const id = el.dataset.bar;
    const mine = ratings.filter((x) => x.bar_id === id);
    const avg = mine.length ? (mine.reduce((s, x) => s + x.stars, 0) / mine.length).toFixed(1) : "–";
    const list = comments.filter((x) => x.bar_id === id).slice(0, 5)
      .map((x) => `<p class="cmt">${esc(x.body)}</p>`).join("") || `<p class="cmt muted">No comments yet.</p>`;
    const form = session
      ? `<form class="cform" data-id="${esc(id)}">
          <select name="stars"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
          <input name="body" maxlength="500" placeholder="How was the match here?" required />
          <button type="submit">Post</button>
        </form>`
      : `<p class="cmt muted">Log in to rate and comment.</p>`;
    el.innerHTML = `<div class="crate">${avg} ★ · ${mine.length}</div>${list}${form}`;
  });
  document.querySelectorAll(".cform").forEach((form) => {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const bar_id = form.dataset.id;
      const body = form.body.value.trim();
      const stars = Number(form.stars.value);
      const uid = session.user.id;
      const ins = await sb.from("comments").insert({ bar_id, user_id: uid, body });
      if (ins.error) { alert(ins.error.message); return; }
      await sb.from("ratings").upsert({ bar_id, user_id: uid, stars });
      form.body.value = "";
      window.mabRefreshComments();
    };
  });
};

sb.auth.onAuthStateChange(() => refreshAuth());
refreshAuth();
