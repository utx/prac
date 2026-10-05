/* ---- online progress sync (Supabase). Injected into every page by tools/build.py ----
   SYNC_CONFIG comes from tools/site_config.json. With no URL/key set, everything here
   is a no-op and the site works from browser storage alone. Events that can't be sent
   (offline, server down) wait in localStorage and are retried on the next page load. */
const SYNC_OUTBOX = "prac.outbox";
const syncOn = () => !!(SYNC_CONFIG.supabase_url && SYNC_CONFIG.supabase_publishable_key);
function syncHeaders() {
  const k = SYNC_CONFIG.supabase_publishable_key;
  const h = { "apikey": k, "Content-Type": "application/json" };
  if (/^eyJ/.test(k)) h["Authorization"] = "Bearer " + k; // legacy anon JWT keys
  return h;
}
function syncReadOutbox() { try { return JSON.parse(localStorage.getItem(SYNC_OUTBOX)) || []; } catch (e) { return []; } }
function syncWriteOutbox(q) { try { localStorage.setItem(SYNC_OUTBOX, JSON.stringify(q.slice(-500))); } catch (e) {} }
async function syncSend(rows) {
  const r = await fetch(SYNC_CONFIG.supabase_url.replace(/\/$/, "") + "/rest/v1/events", {
    method: "POST", headers: Object.assign(syncHeaders(), { "Prefer": "return=minimal" }),
    body: JSON.stringify(rows), keepalive: true
  });
  if (!r.ok) throw new Error("sync " + r.status);
}
let syncBusy = false, syncAgain = false;
async function syncFlush() {
  if (!syncOn()) return;
  if (syncBusy) { syncAgain = true; return; }
  syncBusy = true;
  try {
    do {
      syncAgain = false;
      const q = syncReadOutbox();
      if (!q.length) break;
      await syncSend(q);
      syncWriteOutbox(syncReadOutbox().slice(q.length)); // keep anything added while sending
    } while (syncAgain);
  } catch (e) { /* offline or server error: rows stay queued */ }
  finally { syncBusy = false; }
}
function syncPost(kind, version, attemptId, payload) {
  if (!syncOn()) return;
  const row = { kind, version: Number(version), attempt_id: attemptId || null, payload: payload || {}, at: new Date().toISOString() };
  syncWriteOutbox(syncReadOutbox().concat([row]));
  syncFlush();
}
async function syncRpc(name, args) {
  const r = await fetch(SYNC_CONFIG.supabase_url.replace(/\/$/, "") + "/rest/v1/rpc/" + name, {
    method: "POST", headers: syncHeaders(), body: JSON.stringify(args || {})
  });
  if (!r.ok) throw new Error(name + " " + r.status);
  return r.json();
}
/* Merge remote state into a local store ({attempts, flags}). Flags: latest timestamp wins. */
function syncMergeFlags(store, rows) {
  rows.forEach(f => {
    const cur = store.flags[f.version];
    const newer = f.at && (!cur || !cur.at || Date.parse(f.at) > Date.parse(cur.at));
    if (newer) store.flags[f.version] = { completed: !!f.completed, at: f.at, total: f.first_total };
    else if (cur && f.first_total != null && cur.total == null) cur.total = f.first_total;
  });
  return store;
}
function syncMergeEvents(store, events) {
  const byId = {};
  store.attempts.forEach(a => byId[a.id] = a);
  const flagRows = {};
  events.forEach(e => {
    const p = e.payload || {};
    if (e.kind === "section" || e.kind === "finish") {
      const a = byId[e.attempt_id] || (byId[e.attempt_id] = { id: e.attempt_id, v: e.version, started: p.started || e.at, finished: null, sections: [] });
      if (e.kind === "section" && p.section && p.index != null && !a.sections[p.index]) a.sections[p.index] = p.section;
      if (e.kind === "finish") { a.finished = a.finished || p.finished || e.at; if (p.total != null) a.total = p.total; }
    }
    if (e.kind !== "section" && (!flagRows[e.version] || Date.parse(e.at) >= Date.parse(flagRows[e.version].at)))
      flagRows[e.version] = { version: e.version, completed: e.kind !== "unflag", at: e.at };
  });
  store.attempts = Object.values(byId);
  return syncMergeFlags(store, Object.values(flagRows));
}
if (typeof window !== "undefined" && typeof localStorage !== "undefined") { try { syncFlush(); } catch (e) {} }
/* One-time upload of progress recorded in this browser before the online database was connected. */
function syncBackfill() {
  if (!syncOn()) return;
  try {
    if (localStorage.getItem("prac.backfilled")) return;
    const st = JSON.parse(localStorage.getItem("prac.v1") || "null");
    const rows = [];
    if (st && Array.isArray(st.attempts)) {
      st.attempts.forEach(a => {
        (a.sections || []).forEach((s, i) => { if (s) rows.push({ kind: "section", version: Number(a.v), attempt_id: a.id, at: a.started, payload: { started: a.started, index: i, section: s, backfill: true } }); });
        if (a.finished) rows.push({ kind: "finish", version: Number(a.v), attempt_id: a.id, at: a.finished, payload: { started: a.started, finished: a.finished, total: a.total, backfill: true } });
      });
      Object.entries(st.flags || {}).forEach(([v, f]) => {
        if (f && f.at && (f.manual || !f.completed)) rows.push({ kind: f.completed ? "flag" : "unflag", version: Number(v), attempt_id: null, at: f.at, payload: { backfill: true } });
      });
    }
    localStorage.setItem("prac.backfilled", new Date().toISOString());
    if (rows.length) { syncWriteOutbox(syncReadOutbox().concat(rows)); syncFlush(); }
  } catch (e) {}
}
if (typeof window !== "undefined" && typeof localStorage !== "undefined") { try { syncBackfill(); } catch (e) {} }
