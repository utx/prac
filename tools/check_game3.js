#!/usr/bin/env node
/* Checks the battle game (prac3/index.html, built by tools/build_game3.py).
   1. Hand-written questions: unique ids, option counts (maths A–E, thinking and reading A–D, a sentence bank A–F),
      a known question type, an explanation that says why the traps are wrong, the correct option never the single
      longest, answer letters spread, "may" in every spot-the-mistake option, all five reading formats, and nothing
      copied from Crown Quest (game/content).
   2. Templates (generators.js): for many random seeds each one must give the right number of different options,
      a correct answer that this script works out again BY ITS OWN SEPARATE METHOD from the numbers in `data`,
      a picture drawn from those same numbers, the same question again for the same seed, and spread letters.
   3. In a real browser at desktop and phone width: three whole matches are played (the Battle Bus and landing, the
      players-left count and feed, one opponent of each kind per circle, misses, hits and headshots, the opponents' moves
      and their counters, chests and loot, 15 + 20 + 25 minutes for the three circles, the daily limit, the shop, being
      eliminated), progress survives a reload, 200 match layouts are checked (circles inside each other, everyone on
      land), practice mode saves nothing and tests the bush, the arena's keys and on-screen buttons (shots, headshots, walls, the boogie bomb, dodging a grenade), and every question fits the screen.
   Usage: node tools/check_game3.js [screenshot-dir] */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "prac3", "index.html");
const shots = process.argv[2];
const SEEDS = 400;
let fail = 0;
const bad = m => { fail++; if (fail < 60) console.log("FAIL " + m); };

/* ---- load the content exactly as the page does ---- */
const dir = path.join(ROOT, "game3", "content");
const src = fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().map(f => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
const C = { INK: "#1b2a41", READING: [], THINKING: [], MATHS: [], GENS: [] };
vm.runInNewContext(`const INK = "#1b2a41"; const READING = [], THINKING = [], MATHS = [], GENS = [];\n${src}\n;Object.assign(OUT, { READING, THINKING, MATHS, GENS, LAND });`, { OUT: C, Math, Array, Number, String, Set, Object, console });
const build = fs.readFileSync(path.join(ROOT, "tools", "build.py"), "utf8");
const cats = sec => JSON.parse(build.match(new RegExp(`"${sec}": (\\[[^\\]]*\\])`, "s"))[1].replace(/\s+/g, " "));
const CATS = { reading: cats("reading"), thinking: cats("thinking"), maths: cats("maths") };
const text = h => String(h).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const rng = seed => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const sum = a => a.reduce((x, y) => x + y, 0);

/* ---- 1. hand-written questions ---- */
const ids = new Set(), HAND = {};
const longest = (q, where) => {
  if (q.visual || /( only|^Extract A)$/.test(q.options[0])) return;
  const len = q.options.map(o => text(o).length), top = Math.max(...len);
  if (len[q.answer] === top && len.filter(l => l === top).length === 1 && top > 12) bad(`${where}: the correct option is the single longest`);
};
function checkQ(q, kind, want, where) {
  if (ids.has(q.id)) bad(`duplicate id ${q.id}`); ids.add(q.id); HAND[q.id] = q;
  if (q.options.length !== want) bad(`${where}: needs ${want} options`);
  if (new Set(q.options).size !== q.options.length) bad(`${where}: two options are the same`);
  if (!(q.answer >= 0 && q.answer < q.options.length)) bad(`${where}: bad answer index`);
  if (!text(q.stem) || !text(q.explain)) bad(`${where}: needs a stem and an explanation`);
  if (!CATS[kind].includes(q.cat)) bad(`${where}: unknown question type "${q.cat}"`);
  if (!/why-not/.test(q.explain)) bad(`${where}: the explanation must say why the traps are wrong`);
  if (q.cat === "Spot the mistake" && !q.options.every(o => /\bmay\b/.test(o))) bad(`${where}: every spot-the-mistake option needs "may"`);
  if (/extra clue|fourth clue/i.test(q.stem)) bad(`${where}: "which extra clue fixes the order" questions are not used in the games`);
  if (/\bfold/i.test(text(q.stem)) && kind === "thinking") bad(`${where}: no paper-folding questions`);
}
const spread = (list, where, cap) => { const n = {}; list.forEach(q => n[q.answer] = (n[q.answer] || 0) + 1); if (Math.max(...Object.values(n)) > cap) bad(`${where}: answer letters are not spread (${JSON.stringify(n)})`); };
for (const [kind, list, want] of [["thinking", C.THINKING, 4], ["maths", C.MATHS, 5]]) {
  for (const q of list) { checkQ(q, kind, want, q.id); longest(q, q.id); if (![1, 2, 3, 4].includes(q.tier)) bad(`${q.id}: tier must be 1 to 4`); }
  for (const t of [1, 2, 3, 4]) { const qs = list.filter(q => q.tier === t); if (qs.length < 4) bad(`${kind}: circle ${t} needs at least 4 hand-written questions`); spread(qs, `${kind} circle ${t}`, Math.ceil(qs.length / 3)); }
}
const formats = new Set();
for (const p of C.READING) {
  if (ids.has("p:" + p.id)) bad(`duplicate passage ${p.id}`); ids.add("p:" + p.id);
  formats.add(p.format);
  if (![1, 2, 3].includes(p.tier)) bad(`${p.id}: tier must be 1 to 3`);
  if (p.questions.length < 5) bad(`${p.id}: a passage needs at least 5 questions (an opponent can take 4 hits, plus misses)`);
  for (const q of p.questions) {
    checkQ(q, "reading", p.bank ? 6 : 4, q.id);
    if (!p.bank) longest(q, q.id);
    if (q.gap && !p.html.includes(`data-g="${q.gap}" class="gap"`)) bad(`${q.id}: the passage has no gap ${q.gap}`);
  }
  spread(p.questions, p.id, 2);
  if (/football/i.test(p.html)) bad(`${p.id}: reading passages are never about football`);
}
for (const f of ["cloze", "story", "poem", "missing sentences", "four extracts"]) if (!formats.has(f)) bad(`no reading passage in the "${f}" format`);
for (const t of [1, 2, 3]) if (C.READING.filter(p => p.tier === t).length < 2) bad(`reading: circle ${t} needs at least 2 passages`);
/* nothing copied from Crown Quest */
{
  const WORLDS = [];
  for (const f of ["reading", "thinking", "maths"]) vm.runInNewContext(fs.readFileSync(path.join(ROOT, "game", "content", f + ".js"), "utf8"), { INK: C.INK, WORLDS, Math, Array });
  const old = new Set(); for (const w of WORLDS) for (const lv of w.levels) for (const q of lv.questions) old.add(text(q.stem).toLowerCase());
  for (const q of Object.values(HAND)) if (text(q.stem).length > 40 && old.has(text(q.stem).toLowerCase())) bad(`${q.id}: same question as one in Crown Quest`);
}
{ const stems = new Map(); for (const q of Object.values(HAND)) { const k = text(q.stem).toLowerCase(); if (k.length > 40 && !q.gap) { if (stems.has(k)) bad(`${q.id}: same question as ${stems.get(k)}`); stems.set(k, q.id); } } }
const nHand = Object.keys(HAND).length;
console.log(`hand-written: ${C.READING.length} passages, ${nHand} questions (${C.READING.reduce((a, p) => a + p.questions.length, 0)} reading, ${C.THINKING.length} thinking, ${C.MATHS.length} maths)`);

/* ---- 2. templates: this script's own working for every one ---- */
const clock = m => { const h = Math.floor(m / 60) % 24, mm = m % 60; return `${((h + 11) % 12) + 1}:${mm < 10 ? "0" : ""}${mm} ${h >= 12 ? "pm" : "am"}`; };
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const num = s => Number(String(s).replace(/[^0-9.]/g, ""));
const brute = f => { const hits = []; for (let x = 1; x <= 2000; x++) if (f(x)) hits.push(x); return hits.length === 1 ? hits[0] : NaN; };
/* fill in a table of sums: lines = [[cells that add up], total cell], each cell a key into `v` (null = unknown) */
function solveLines(v, lines) {
  for (let again = true; again;) {
    again = false;
    for (const [cells, tot] of lines) {
      const all = [...cells, tot], unk = all.filter(k => v[k] === null);
      if (unk.length !== 1) continue;
      v[unk[0]] = unk[0] === tot ? sum(cells.map(k => v[k])) : v[tot] - sum(cells.filter(k => k !== unk[0]).map(k => v[k]));
      again = true;
    }
  }
  return v;
}
/* cube helpers for the checks: faces of a cube model, and a dice rolled over a net (a different method from the game's folding) */
function vox(cells) {
  const has = new Set(cells.map(c => c.join(","))); let out = 0, floor = 0, seen = 0;
  for (const [x, y, z] of cells) for (const [a, b, c] of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) if (!has.has(`${x + a},${y + b},${z + c}`)) { out++; if (c === -1 && z === 0) floor++; if ((a === 1) || (b === -1) || (c === 1)) seen++; }
  return { n: cells.length, out, floor, seen };
}
function roll(cells) {   // the bottom slot of a dice rolled square by square over the net
  const at = new Map(cells.map((c, i) => [c.join(","), i])), slot = [], q = [[0, { B: "b", T: "t", N: "n", S: "s", E: "e", W: "w" }]]; slot[0] = "b";
  while (q.length) {
    const [i, d] = q.shift(), [x, y] = cells[i];
    for (const [dx, dy, nd] of [[1, 0, { B: d.E, E: d.T, T: d.W, W: d.B, N: d.N, S: d.S }], [-1, 0, { B: d.W, W: d.T, T: d.E, E: d.B, N: d.N, S: d.S }], [0, 1, { B: d.S, S: d.T, T: d.N, N: d.B, E: d.E, W: d.W }], [0, -1, { B: d.N, N: d.T, T: d.S, S: d.B, E: d.E, W: d.W }]]) {
      const j = at.get(`${x + dx},${y + dy}`);
      if (j === undefined || slot[j]) continue;
      slot[j] = nd.B; q.push([j, nd]);
    }
  }
  return slot;
}
const SOLVE = {
  pict: d => (d.rows[d.a][1] - d.rows[d.b][1]) * d.key,
  jug: d => d.level - d.p,
  endtime: d => clock(d.start + 60 * d.h + d.m),
  change: d => (d.note - sum(d.prices)) / 100,
  missing: d => brute(x => d.form === 1 ? d.a + x === d.b - d.c : d.form === 2 ? x - d.a === d.b + d.c : d.b - x === d.a + d.c),
  bar: d => d.values[d.pick[0]] + d.values[d.pick[1]] - d.values[d.pick[2]],
  dot: d => { let n = 0; d.counts.forEach((c, v) => { if (d.type === "more than" ? v > d.k : d.type === "fewer than" ? v < d.k : v >= d.k) n += c; }); return n; },
  bus: d => { const b = d.times.find(t => t[d.s] >= d.arrive); return b[d.d] - d.arrive; },
  rectperim: d => brute(p => p % 2 === 0 && (p / 2 - d.w) * d.w === d.A),
  towers: d => { const top = Math.max(...d.grid); let n = 0; for (const g of d.grid) for (let k = g; k < top; k++) n++; return n; },
  pattern: d => { let n = 0; for (let i = 0; i < d.N; i++) if (d.block[i % d.block.length] === d.target) n++; return n; },
  unitprice: d => { const u = d.offers.map(o => o[1] / o[0]), m = Math.min(...u); return u.filter(x => x === m).length === 1 ? `${d.offers[u.indexOf(m)][0]} for $${(d.offers[u.indexOf(m)][1] / 100).toFixed(2)}` : "tie"; },
  daysago: d => { let x = d.day; for (let i = 0; i < d.N; i++) x = (x + 6) % 7; return DAYS[x]; },
  gridperim: d => { const on = new Set(); d.heights.forEach((h, x) => { for (let y = 0; y < h; y++) on.add(x + "," + y); }); let p = 0; for (const c of on) { const [x, y] = c.split(",").map(Number); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!on.has((x + dx) + "," + (y + dy))) p++; } return p; },
  recipe: d => brute(x => x * d.b === d.c * d.a),
  twojugs: d => d.total ? d.A.level + d.B.level : Math.abs(d.A.level - d.B.level),
  pictkey: d => d.total / sum(d.rows.map(r => r[1])) * d.rows[d.x][1],
  backwards: d => brute(x => (x + d.a) * d.m - d.c === d.r),
  sumdiff: d => { for (let s = 1; s < d.S; s++) if (d.S - s - s === d.D) return d.askBig ? d.S - s : s; return NaN; },
  tworates: d => { let n = 0; for (let t = 1; t <= d.T; t++) { if (t % d.p === 0) n += d.a; if (t % d.q === 0) n += d.b; } return n; },
  statements: d => { const v = d.values, [a, b, c] = d.st, t = [v[a.x] === a.k * v[a.y], v[b.p] + v[b.q] > v[b.r] + v[b.s], sum(v) > c.n], on = [1, 2, 3].filter(i => t[i - 1]); return on.length === 3 ? "1, 2 and 3" : on.length === 2 ? `${on[0]} and ${on[1]} only` : `${on[0]} only`; },
  lshape: d => { let n = 0; for (let x = 0; x < d.W; x++) for (let y = 0; y < d.H; y++) if (x < d.top || y < d.right) n++; return n; },
  fracleft: d => { const rest = d.N - d.N / d.a; return rest - rest / d.b; },
  freeday: d => { const b = d.busy.map(r => r.slice()); b[d.cancel[1]][d.cancel[0]] = false; const free = b.map((r, i) => r.some(Boolean) ? -1 : i).filter(i => i >= 0); return free.length === 1 ? DAYS[free[0]] : "not unique"; },
  shiftcode: d => [...d.word].map(ch => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(ch) + d.s) % 26]).join(""),
  droplow: d => { const best = d.scores.map(r => r.slice().sort((a, b) => b - a)[0] + r.slice().sort((a, b) => b - a)[1]), m = Math.max(...best); return best.filter(x => x === m).length === 1 ? best.indexOf(m) : -1; },
  totals2: d => { const v = {}, lines = []; d.cells.forEach((r, i) => { r.forEach((x, j) => v[`${i},${j}`] = x); lines.push([[0, 1, 2].map(j => `${i},${j}`), `${i},3`]); }); d.colTotals.forEach((t, j) => { v["c" + j] = t; lines.push([[0, 1, 2].map(i => `${i},${j}`), "c" + j]); }); return solveLines(v, lines)[d.ask.join(",")]; },
  totals3: d => { const v = { g: d.grand }, lines = []; d.cells.forEach((r, i) => { r.forEach((x, j) => v[`${i},${j}`] = x); lines.push([[0, 1, 2].map(j => `${i},${j}`), `${i},3`]); }); lines.push([d.cells.map((_, i) => `${i},3`), "g"]); return solveLines(v, lines)[d.ask.join(",")]; },
  tabletotal: d => { const t = d.rows.map(r => r[0] + r[1]), m = Math.max(...t); return t.filter(x => x === m).length === 1 ? DAYS[t.indexOf(m)] : "tie"; },
  /* cube templates: count everything one small cube at a time */
  paintcube: d => { let c = 0; for (let x = 0; x < d.n; x++) for (let y = 0; y < d.n; y++) for (let z = 0; z < d.n; z++) if ([x, y, z].reduce((a, v) => a + (v === 0) + (v === d.n - 1), 0) === d.k) c++; return c; },
  stack: d => { const v = vox(d.rows.flatMap((r, i) => r.flatMap((h, x) => Array.from({ length: h }, (_, z) => [x, d.rows.length - 1 - i, z])))); return d.ask === "paint" ? v.out : d.ask === "see" ? v.out - v.floor : 6 * v.n - v.out + v.floor; },
  stairs: d => { const c = []; for (let x = 0; x < d.k; x++) for (let z = 0; z < d.k - x; z++) for (let y = 0; y < d.d; y++) c.push([x, y, z]); const v = vox(c); return d.ask === "cubes" ? v.n : v.out; },
  solidparts: d => {
    const n = d.n, V = [], E = [];
    if (d.type === "prism") { for (let i = 0; i < 2 * n; i++) V.push(i); for (let i = 0; i < n; i++) E.push([i, (i + 1) % n], [n + i, n + (i + 1) % n], [i, n + i]); return { faces: n + 2, edges: E.length, corners: V.length }[d.ask]; }
    for (let i = 0; i <= n; i++) V.push(i); for (let i = 0; i < n; i++) E.push([i, (i + 1) % n], [i, n]); return { faces: n + 1, edges: E.length, corners: V.length }[d.ask];
  },
  netopp: d => { const s = roll(d.cells); if (new Set(s).size !== 6) return "not a net"; const i = d.labels.indexOf(d.ask), o = { b: "t", t: "b", n: "s", s: "n", e: "w", w: "e" }[s[i]]; return d.labels[s.indexOf(o)]; },
  isnet: d => { const ok = d.list.map(c => new Set(roll(c)).size === 6); return ok.filter(Boolean).length === 1 ? ok.indexOf(true) : -1; },
  /* third set (generators3.js) */
  pyramid: d => brute(x => (d.a + x) + (x + d.c) === d.top),
  clockadd: d => clock(d.start + d.N),
  datesback: d => { const t = new Date(2027, d.mo, d.d); t.setDate(t.getDate() - d.N); return `${t.getDate()} ${t.toLocaleString("en-AU", { month: "long" })}`; },
  share: d => { for (let k = 1; k < 100; k++) if ((d.a + d.b) * k === d.tot) return d.b * k; },
  spinways: d => { let w = 0; for (let i = 1; i <= d.n; i++) for (let j = 1; j <= d.m; j++) if (i + j === d.X) w++; return w; },
  meet: d => { const k = new Set([0]); d.meets.forEach(([x, y]) => { if (k.has(x) || k.has(y)) { k.add(x); k.add(y); } }); return k.size; },
  robotwalk: d => { let vx = 0, vy = 1, x = 0, y = 0; for (const s of d.steps) { [vx, vy] = s.t === "right" ? [vy, -vx] : [-vy, vx]; x += vx * s.n; y += vy * s.n; }
    const sq = n => `${Math.abs(n)} square${Math.abs(n) === 1 ? "" : "s"}`; const p = [y > 0 ? sq(y) + " north" : y < 0 ? sq(y) + " south" : "", x > 0 ? sq(x) + " east" : x < 0 ? sq(x) + " west" : ""].filter(Boolean);
    return p.length ? p.join(" and ") + " of the start" : "Back where it started"; },
  mirrorclock: d => { const t = 12 * 60 - (d.h * 60 + d.m), h = Math.floor(t / 60); return `${h}:${String(t % 60).padStart(2, "0")}`; },
  sessions: d => { let n = 0; for (let w = 1; w <= d.W; w++) for (let k = 0; k < d.d; k++) if (w !== 2) n++; return n - 1; },
};
/* is the picture drawn from the same numbers? (heights of columns, dots, symbols, liquid levels, table cells) */
const rects = (stem, w) => [...stem.matchAll(new RegExp(`<rect x="[\\d.]+" y="([\\d.]+)" width="${w}" height="([\\d.]+)"`, "g"))].map(m => [Number(m[1]), Number(m[2])]);
const near = (a, b) => Math.abs(a - b) < 0.01;
const DRAWN = {
  bar: (d, s) => { const r = rects(s, 24); return r.length === 4 && r.every((x, i) => near(x[1], d.values[i] * 170 / (5 * d.step))); },
  statements: (d, s) => { const r = rects(s, 24); return r.length === 5 && r.every((x, i) => near(x[1], d.values[i] * 170 / 12)); },
  dot: (d, s) => (s.match(/<circle/g) || []).length === sum(d.counts),
  pict: (d, s) => (s.match(/<circle/g) || []).length === sum(d.rows.map(r => Math.floor(r[1]))) + 1 && (s.match(/<path d="M[\d.]+ [\d.]+a13/g) || []).length === d.rows.filter(r => r[1] % 1).length,
  pictkey: (d, s) => (s.match(/<circle/g) || []).length === sum(d.rows.map(r => Math.floor(r[1]))) && (s.match(/<path d="M[\d.]+ [\d.]+a13/g) || []).length === d.rows.filter(r => r[1] % 1).length,
  jug: (d, s) => { const r = rects(s, 96); return r.length === 1 && near(r[0][0], 240 - d.level * 200 / (d.major * 5)); },
  twojugs: (d, s) => { const r = rects(s, 96); return r.length === 2 && near(r[0][0], 240 - d.A.level * 200 / (d.A.major * 4)) && near(r[1][0], 240 - d.B.level * 200 / (d.B.major * 4)); },
  gridperim: (d, s) => rects(s, 28).length === sum(d.heights),
  towers: (d, s) => text(s).includes(d.grid.join("")) || d.grid.every(g => s.includes(`<td>${g}</td>`)),
  bus: (d, s) => d.times.every(b => b.every(t => s.includes(clock(t)))),
  paintcube: (d, s) => (s.match(/class="face"/g) || []).length === 3 * d.n * d.n,
  stack: (d, s) => { const c = d.rows.flatMap((r, i) => r.flatMap((h, x) => Array.from({ length: h }, (_, z) => [x, d.rows.length - 1 - i, z]))); return (s.match(/class="face"/g) || []).length === vox(c).seen && (s.match(/<td>\d+<\/td>/g) || []).map(num).join() === d.rows.flat().join(); },
  stairs: (d, s) => { const c = []; for (let x = 0; x < d.k; x++) for (let z = 0; z < d.k - x; z++) for (let y = 0; y < d.d; y++) c.push([x, y, z]); return (s.match(/class="face"/g) || []).length === vox(c).seen; },
  netopp: (d, s) => (s.match(/<rect/g) || []).length === 6 && d.labels.every(l => s.includes(`>${l}</text>`)),
  pyramid: (d, s) => [d.a, d.c, d.top].every(v => s.includes(`>${v}</text>`)) && s.includes(">?</text>"),
  mirrorclock: (d, s) => s.includes("seem to show " + d.h + ":" + String(d.m).padStart(2, "0")),
  tabletotal: (d, s) => (s.match(/<td>\d+<\/td>/g) || []).map(num).join() === d.rows.flat().join(),
  droplow: (d, s) => (s.match(/<td>\d+<\/td>/g) || []).map(num).join() === d.scores.flat().join(),
  totals2: (d, s) => (s.match(/<td>(\d+|\?)<\/td>/g) || []).map(x => /\?/.test(x) ? null : num(x)).join() === [...d.cells.flat(), ...d.colTotals].join(),
  totals3: (d, s) => (s.match(/<td>(\d+|\?)<\/td>/g) || []).map(x => /\?/.test(x) ? null : num(x)).join() === [...d.cells.flat(), d.grand].join(),
};
let nGen = 0;
for (const g of C.GENS) {
  const want = g.kind === "maths" ? 5 : 4, letters = {};
  let errs = 0;
  const no = m => { if (errs++ < 2) bad(`template ${g.id}: ${m}`); };
  if (!SOLVE[g.id]) { bad(`template ${g.id}: tools/check_game3.js has no separate working for it`); continue; }
  if (!CATS[g.kind].includes(g.cat)) bad(`template ${g.id}: unknown question type "${g.cat}"`);
  for (let seed = 1; seed <= SEEDS; seed++) {
    let q; try { q = g.make(rng(seed * 7919)); } catch (e) { no(`seed ${seed} crashed: ${e.message}`); continue; }
    nGen++;
    if (q.options.length !== want || new Set(q.options.map(o => q.visual ? o : text(o))).size !== want) no(`seed ${seed}: needs ${want} different options (${q.options.map(text).join(" | ")})`);
    if (!(q.answer >= 0 && q.answer < want)) { no(`seed ${seed}: bad answer index`); continue; }
    if (/undefined|NaN|null|Infinity/.test(text(q.stem) + text(q.explain) + q.options.join())) no(`seed ${seed}: broken text`);
    if (!/why-not/.test(q.explain)) no(`the explanation must say why the traps are wrong`);
    longest(q, `template ${g.id} seed ${seed}`);
    const mine = SOLVE[g.id](q.data), shown = text(q.options[q.answer]);
    const same = typeof mine === "number" ? (["droplow", "isnet"].includes(g.id) ? mine === q.answer : near(mine, num(shown))) : mine === shown;
    if (!same) no(`seed ${seed}: the marked answer is "${shown}" but working it out separately gives "${mine}"`);
    if (typeof mine === "number" && !["droplow", "isnet"].includes(g.id) && q.options.filter(o => near(num(text(o)), mine)).length !== 1) no(`seed ${seed}: not exactly one correct option`);
    if (DRAWN[g.id] && !DRAWN[g.id](q.data, q.stem)) no(`seed ${seed}: the picture does not match the numbers`);
    if (g.id === "isnet" && !q.options.every(o => (o.match(/<rect/g) || []).length === 6)) no(`seed ${seed}: every shape must have six squares`);
    const again = g.make(rng(seed * 7919));
    if (again.stem !== q.stem || again.answer !== q.answer) no(`seed ${seed}: the same seed gave a different question`);
    letters[q.answer] = (letters[q.answer] || 0) + 1;
  }
  if (Math.max(...Object.values(letters)) > SEEDS * 0.6 || Object.keys(letters).length < 2) bad(`template ${g.id}: the answer is nearly always the same letter (${JSON.stringify(letters)})`);
}
for (const t of [1, 2, 3]) if (C.GENS.filter(g => g.kind === "maths" && g.tier === t).length < 4) bad(`maths circle ${t} needs at least 4 templates`);
{
  const m = [...C.MATHS, ...C.GENS.filter(g => g.kind === "maths")], data = m.filter(q => ["Graphs & data", "Measurement & scales", "Time & timetables"].includes(q.cat) && (!q.stem || /<svg|<table/.test(q.stem)) && (q.make ? DRAWN[q.id] : true));
  if (data.length * 5 < m.length) bad(`graphs, tables and scales are only ${data.length} of ${m.length} maths questions (need 1 in 5)`);
  if (m.filter(q => q.cat === "Area, perimeter & 3D").length < 4) bad("maths needs more shape and space questions");
}
console.log(`templates: ${C.GENS.length} (${C.GENS.filter(g => g.kind === "maths").length} maths, ${C.GENS.filter(g => g.kind === "thinking").length} thinking), ${nGen} generated questions re-solved and checked`);

const html = fs.readFileSync(PAGE, "utf8");
if (/\bOC\b/.test(html)) bad('the page mentions "OC"');
if (!/not endorsed by Epic/.test(html)) bad("the Epic fan-content notice is missing");
if (/setTimeout|setInterval|countdown|timer/i.test(html.replace(/on timers|timetable/gi, ""))) bad("the game must not use timers or speed modes");
for (const m of html.matchAll(/["`(](?:art\/)?([a-z0-9-]+)\.webp/g)) void m;
const need = new Set([...html.matchAll(/\[\s*"([a-z0-9]+)",\s*"[A-Z][^"]*"(?:,\s*"#[0-9a-f]{6}",\s*\d+,\s*(P2|"art\/"))?\s*\]/g)].map(m => (m[2] === "P2" ? "prac2/art/" : "prac3/art/") + m[1]));
for (const n of ["island", "gun-pistol", "gun-shotgun", "gun-minigun", "medkit", "shieldpotion", "coins", "storm", "battlebus", "victory", "chest", "llama", "chugjug", "grenade", "boogie", "slurp", "bush"]) need.add("prac3/art/" + n);
for (const n of ["crown3d", "chest0", "chest1", "chest2", "chest3", "chest4", "arena-forest", "arena-peaks", "arena-reef"]) need.add("prac2/art/" + n);
for (const n of need) if (!fs.existsSync(path.join(ROOT, n + ".webp"))) bad(`missing picture ${n}.webp`);

if (!/id="game3-practice" href="\.\.\/prac3\/index\.html\?admin=1"/.test(fs.readFileSync(path.join(ROOT, "pracadmin", "index.html"), "utf8"))) bad("the admin page has no Practice button for this game");

/* ---- 3. browser ---- */
const answerOf = (key, seed) => key.startsWith("g:") ? C.GENS.find(g => g.id === key.slice(2)).make(rng(Number(seed))).answer : HAND[key].answer;
const R = { 1: 75, 2: 38, 3: 26, 4: 15 }, STAGE_HP = { 1: 100, 2: 125, 3: 150, 4: 200 }, MISS = { 1: 15, 2: 20, 3: 25, 4: 30 }, SHOT = { pistol: 5, shotgun: 6, minigun: 7 };
const landAt = (x, y) => { const gx = Math.floor(x / 2.5), gy = Math.floor(y / 2.5); return gx >= 0 && gy >= 0 && gx < 40 && gy < 40 && C.LAND[gy][gx] === "1"; };
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const aliveOf = M => 1 + M.opps.filter(o => !o.dead).length + M.bots.filter(b => b.a).length;
/* a whole match's layout: circles inside each other, everyone on land and inside their circle, opponents apart */
function checkLayout(M, where, GAP) {
  const c = M.circles;
  for (const s of [1, 2, 3]) if (dist(c[s + 1], c[s]) + R[s + 1] > R[s] + 0.01) bad(`${where}: circle ${s + 1} is not inside circle ${s}`);
  for (const s of [1, 2, 3, 4]) {
    const os = M.opps.filter(o => o.stage === s);
    if (os.length !== (s === 4 ? 1 : 3)) bad(`${where}: circle ${s} needs ${s === 4 ? "one boss" : "three opponents"}`);
    if (s < 4 && new Set(os.map(o => o.kind)).size !== 3) bad(`${where}: circle ${s} needs one reading, one thinking and one maths opponent`);
    for (const o of os) {
      if (!landAt(o.x, o.y)) bad(`${where}: ${o.name} stands in the sea`);
      if (dist([o.x, o.y], c[s]) > R[s]) bad(`${where}: ${o.name} is outside circle ${s}`);
    }
    for (const a of os) for (const b of os) if (a !== b && dist([a.x, a.y], [b.x, b.y]) < GAP[s] - 0.01) bad(`${where}: two circle ${s} opponents stand on top of each other`);
    const sp = M.supply[s];
    if (sp && os.some(o => dist([o.x, o.y], sp) < GAP[s] - 0.01)) bad(`${where}: the circle ${s} supply drop is on top of an opponent`);
    if (!sp || !landAt(sp[0], sp[1]) || dist(sp, c[s]) > R[s]) bad(`${where}: the circle ${s} supply drop is in the wrong place`);
  }
  if (M.bots.length !== 89 || M.bots.some(b => !landAt(b.x, b.y))) bad(`${where}: there must be 89 other players, all on land`);
  if (aliveOf(M) !== 100) bad(`${where}: a match must start with 100 players`);
}
(async () => {
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  for (const [label, width, height] of [["desktop", 1200, 900], ["phone", 390, 800]]) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(String(e)));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    page.on("dialog", d => d.accept());
    await page.goto("file://" + PAGE);
    const overflow = async where => { const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); if (o > 1) bad(`${label}: sideways scrolling (${o}px) at ${where}`); };
    const state = () => page.evaluate(() => JSON.parse(localStorage.getItem("prac3.v1")));
    const shot = async name => { if (shots) await page.screenshot({ path: path.join(shots, `game3-${name}-${label}.png`), fullPage: true }); };
    const cur = async () => { const st = await state(); return st.match && st.match.cur !== null ? st.match.opps[st.match.cur] : null; };
    let chests = 0, rounds = 0, loot = 0, headshots = 0;

    /* take one shot from the idle battle screen; checks the damage, including headshots */
    const fire = async right => {
      if (!(await page.$("#qcard .opt:not([disabled])"))) await page.click("#shoot");
      await page.waitForSelector("#qcard .opt:not([disabled])");
      const before = await state(), o0 = before.match.opps[before.match.cur];
      const { q, seed } = await page.$eval("#qcard", e => ({ q: e.dataset.q, seed: e.dataset.seed }));
      const ans = answerOf(q, seed), n = (await page.$$("#qcard .opt")).length;
      await overflow(q);
      await page.click(`#qcard .opt[data-i="${right ? ans : (ans + 1) % n}"]`);
      if (!(await page.$(right ? ".fb.good" : ".fb.miss"))) bad(`${label}: ${q} ${right ? "did not accept the correct answer" : "accepted a wrong answer"}`);
      if (await page.$("#qcard .opt:not([disabled])")) bad(`${label}: ${q} allowed a second go`);
      if (!(await page.$("#back[disabled]"))) bad(`${label}: you can walk away before pressing Next`);
      const after = await state(), o1 = after.match.opps[after.match.cur];
      if (right) {
        /* a right answer loads the gun (thinking and maths) or knocks off one bar (reading); the damage comes in the arena */
        const rd = o0.kind === "reading" && !o0.boss, want = rd ? o0.hp - 1 : o0.hp;
        if (o1.hp !== want) bad(`${label}: a right answer should ${rd ? "knock off one bar" : "only load the gun"} (${o0.hp} → ${o1.hp})`);
        if (rd && o1.hp === 0 && o1.dead) bad(`${label}: the last reading bar should leave the opponent knocked, to finish in the showdown`);
      } else {
        const want = before.match.bush ? 0 : Math.min(MISS[o0.stage], before.match.hp + before.match.shield), lost = before.match.hp + before.match.shield - after.match.hp - after.match.shield;
        if (lost !== want) bad(`${label}: a miss in circle ${o0.stage} should cost ${want}, not ${lost}`);
      }
      await overflow(q + " explanation");
      return q;
    };
    /* press Next and deal with what follows: chests (answered right only when asked) and the opponent's moves (beaten) */
    const settle = async (opt = {}) => {
      for (let n = 0; n < 12; n++) {
        if (await page.$("#next")) { await page.click("#next"); continue; }
        if (await page.$("#chestopen")) {
          chests++;
          if (chests === 1) { await page.click("#chestleave"); continue; }   // the first chest is left, the second opened with a right answer
          const wantLoot = chests === 2;
          await page.click("#chestopen");
          await page.waitForSelector("#qcard .opt:not([disabled])");
          const { q, seed } = await page.$eval("#qcard", e => ({ q: e.dataset.q, seed: e.dataset.seed }));
          const o = await cur(), kind = q.startsWith("g:") ? C.GENS.find(g => g.id === q.slice(2)).kind : HAND[q].kind || (C.THINKING.includes(HAND[q]) ? "thinking" : C.MATHS.includes(HAND[q]) ? "maths" : "reading");
          if (kind === "reading" || (!o.boss && kind === o.kind)) bad(`${label}: a chest asked a ${kind} question during a ${o.kind} fight`);
          const ans = answerOf(q, seed), n2 = (await page.$$("#qcard .opt")).length;
          await page.click(`#qcard .opt[data-i="${wantLoot ? ans : (ans + 1) % n2}"]`);
          if (wantLoot) {
            loot++;
            if (!(await page.$("#loot"))) bad(`${label}: a right chest answer gave no loot`);
            else {
              const lt = await page.$eval("#loot", e => e.textContent), inView = await page.$eval("#loot", e => { const r = e.getBoundingClientRect(); return r.top < window.innerHeight && r.bottom > 0; });
              if (!/You got/.test(lt) || !/You now have|→|already carry/.test(lt)) bad(`${label}: the loot reveal should say what you got and what changed (${lt.slice(0, 120)})`);
              if (!inView) bad(`${label}: the loot reveal is off the screen`);
            }
            await shot("loot");
          } else if (await page.$("#loot")) bad(`${label}: a wrong chest answer gave loot`);
          continue;
        }
        if (await page.$("#pix")) {
          rounds++;
          if (!(await page.$("#back[disabled]"))) bad(`${label}: you can walk away in the middle of a round`);
          const b = await state(), bo = b.match.opps[b.match.cur], r = bo.round, A = await page.evaluate(() => window.__arena.get());
          if (!A || A.kind !== r.kind || A.ammo !== r.ammo) bad(`${label}: the arena did not start with the loaded round (${JSON.stringify(r)} / ${JSON.stringify(A)})`);
          const heads = opt.heads || (rounds % 3 === 0 ? 1 : 0);
          await page.evaluate(h => window.__arena.sim(h), heads);
          await page.waitForSelector("#roundover");
          const a = await state(), ao = a.match.opps[a.match.cur], stats = await page.$eval("#roundover", e => ({ hits: Number(e.dataset.hits), heads: Number(e.dataset.heads) }));
          if (r.kind === "fight") {
            const want = Math.max(0, bo.hp - SHOT[b.gun] * (r.ammo + Math.min(heads, r.ammo)));
            if (ao.hp !== want && !(want === 0 && ao.dead)) bad(`${label}: ${r.ammo} hits (${heads} headshot) should leave ${want} health, not ${ao.hp}`);
            if (stats.heads) headshots += stats.heads;
          } else if (r.kind === "finish") { if (!ao.dead) bad(`${label}: a knocked reading opponent was not finished off`); }
          else if (ao.hp !== bo.hp || ao.dead) bad(`${label}: a reading showdown changed the bars (${bo.hp} → ${ao.hp})`);
          else if (a.match.shield !== Math.min(50, b.match.shield + 3 * (r.ammo - Math.min(heads, r.ammo)) + 6 * Math.min(heads, r.ammo))) bad(`${label}: showdown hits should charge your shield`);
          if (bo.kind === "reading" && !bo.boss && bo.hp > 0 && r.ammo !== Math.max(2, 2 * (bo.passRight || 0))) bad(`${label}: a reading showdown should load 2 shots for every right answer`);
          if (bo.kind === "reading" && !bo.boss && bo.queue.length) bad(`${label}: a reading showdown came before the passage was finished`);
          continue;
        }
        break;
      }
    };
    const beat = async () => {
      let shots = 0, rd = null;
      for (let n = 0; n < 40; n++) {
        if (await page.$("#island")) {
          /* a reading opponent needs one right answer for every question on its passage (David, Nov 2026) */
          if (rd && rd.fresh && shots !== rd.len) bad(`${label}: a reading fight took ${shots} right answers, not the ${rd.len} questions on its passage`);
          return;
        }
        const o = await cur();
        await fire(true); shots++;
        if (shots === 1 && o.kind === "reading") { const o2 = await cur(); rd = { fresh: o.shots === 0, len: C.READING.find(p => p.id === o2.pid).questions.length }; }
        await settle();
      }
      bad(`${label}: an opponent took more than 40 questions`);
    };
    const clearCircle = async () => {
      const s0 = (await state()).match.stage;
      for (let n = 0; n < 4; n++) {
        const st = await state();
        if (!st.match || st.match.stage !== s0) return;
        await page.$eval(".mk.foe.open", e => e.click()); await beat();   // two names on the map can overlap a little; either opens a fight
      }
      bad(`${label}: circle ${s0} did not clear`);
    };
    const land = async () => {
      const box = await page.$eval("#island", e => { const r = e.getBoundingClientRect(); return [r.width, r.height]; });
      let p = [50, 50]; for (let d = 0; !landAt(p[0], p[1]); d++) p = [50 + (d % 9) - 4, 50 + Math.floor(d / 9) - 4];
      p = [Math.floor(p[0] / 2.5) * 2.5 + 1.25, Math.floor(p[1] / 2.5) * 2.5 + 1.25];
      await page.click("#island", { position: { x: box[0] * p[0] / 100, y: box[1] * p[1] / 100 } });
      return p;
    };

    await overflow("lobby"); await shot("lobby");
    if (!(await page.$("#drop"))) bad(`${label}: no Drop in button for a new player`);
    await page.click("#drop");
    let st = await state();
    if (st.match.phase !== "bus" || !(await page.$("#jump"))) bad(`${label}: Drop in should put you on the Battle Bus`);
    await shot("bus"); await overflow("bus");
    const spot = await land();
    st = await state();
    if (st.match.phase !== "play" || dist(st.match.me, spot) > 2.5) bad(`${label}: you did not land where you tapped`);
    if (Number(await page.$eval("#alive", e => e.dataset.n)) !== aliveOf(st.match) || aliveOf(st.match) > 96) bad(`${label}: the players-left count is wrong after landing`);
    if ((await page.$$("#feed .fe")).length < 3) bad(`${label}: no elimination feed after landing`);
    if ((await page.$$(".mk.foe.open")).length !== 3 || await page.$(".mk.boss")) bad(`${label}: circle 1 should show its 3 opponents and not the boss`);
    if ((await page.$$(".botdot")).length !== st.match.bots.filter(b => b.a).length) bad(`${label}: the map should show every other player still in the game`);
    await overflow("island"); await shot("island");

    /* circle 1, first opponent: a miss (2 shots), a hit (5 shots), a med kit */
    for (let n = 0; n < 3; n++) { await (await page.$$(".mk.foe.open"))[n].click(); const o = await cur(); if (o.kind !== "reading") break; await page.click("#back"); }
    await fire(false); await shot("miss");
    await page.click("#next");
    { const A = await page.evaluate(() => window.__arena && window.__arena.get()); if (!A || A.ammo !== 2 || A.walls !== 1) bad(`${label}: a wrong answer should load 2 shots and 1 wall (${JSON.stringify(A)})`); }
    if (await page.$("#chestopen")) bad(`${label}: a miss should not lead to a chest`);
    await shot("round");
    await settle();
    await fire(true); await shot("hit");
    await page.click("#next");
    { const A = await page.evaluate(() => window.__arena && window.__arena.get()); if (!A || A.ammo !== 5 || A.walls !== 3) bad(`${label}: a right answer should load 5 shots and 3 walls (${JSON.stringify(A)})`); }
    await settle();
    if (st.match.hp < 100 && st.items.med) { await page.click("#usemed"); const s2 = await state(); if (s2.match.hp !== Math.min(100, st.match.hp + 50) || s2.items.med !== 0) bad(`${label}: the med kit did not heal`); }
    await beat();
    await clearCircle();   // the other two
    st = await state();
    if (st.match.stage !== 2 || !(await page.$(".banner"))) bad(`${label}: the storm did not close after circle 1`);
    if (Object.values(st.time.days)[0] !== 15) bad(`${label}: clearing circle 1 should earn 15 minutes, not ${Object.values(st.time.days)[0]}`);
    /* the storm leaves exactly 50, 20 and 2 players; a chest or move finished straight after can knock out one or two more */
    const stormLeft = (M, n) => M.feed.some(f => f.t === `The storm is closing. ${n} players left`) && aliveOf(M) <= n;
    if (!stormLeft(st.match, 50)) bad(`${label}: the storm should leave 50 players after circle 1 (${aliveOf(st.match)} left)`);
    if (st.match.bots.some(b => b.a && dist([b.x, b.y], st.match.circles[2]) > R[2])) bad(`${label}: players were left outside the circle`);
    if ((await page.$$(".mk.foe.open")).length !== 3) bad(`${label}: circle 2 should show 3 new opponents`);
    await shot("circle2");
    await clearCircle();
    st = await state();
    if (Object.values(st.time.days)[0] !== 35 || !stormLeft(st.match, 20)) bad(`${label}: after circle 2: 35 minutes and 20 players expected (${Object.values(st.time.days)[0]} minutes, ${aliveOf(st.match)} players)`);
    await clearCircle();
    st = await state();
    if (Object.values(st.time.days)[0] !== 60) bad(`${label}: reaching the boss should earn the full 60 minutes, not ${Object.values(st.time.days)[0]}`);
    if (aliveOf(st.match) !== 2 || (await page.$$(".mk.foe.open.boss")).length !== 1) bad(`${label}: only you and the boss should be left`);
    await shot("bossmap");
    await page.click(".mk.foe.open"); await page.click("#shoot"); await shot("boss");
    const bq = await page.$eval("#qcard", e => ({ q: e.dataset.q, seed: e.dataset.seed }));
    await page.click(`#qcard .opt[data-i="${answerOf(bq.q, bq.seed)}"]`); await settle(); await beat();
    st = await state();
    if (st.crowns !== 1 || st.match !== null || st.stats.wins !== 1) bad(`${label}: winning the match did not give a crown`);
    if (!/Victory Royale/.test(await page.$eval("#result", e => e.textContent))) bad(`${label}: no Victory Royale card`);
    if (st.coins !== 3 * 15 + 3 * 25 + 3 * 35 + 80 + 50 + st.stats.lootCoins) bad(`${label}: coins after a win should be ${355 + st.stats.lootCoins}, not ${st.coins}`);
    if (Object.values(st.time.days)[0] !== 60) bad(`${label}: the boss should not add Fortnite time beyond the hour`);
    if (!chests || !rounds || !loot || !headshots) bad(`${label}: a whole match should include chests, rounds, loot and headshots (${chests}, ${rounds}, ${loot}, ${headshots})`);
    await shot("victory"); await overflow("victory");

    /* shop, then a second match with a raised daily limit (70): circle 1 only adds 10 */
    const coins = st.coins;
    await page.click('[data-buy="shotgun"]');
    st = await state();
    if (st.gun !== "shotgun" || st.coins !== coins - 250) bad(`${label}: buying the shotgun went wrong`);
    await page.click("#parents summary"); await page.fill("#cap", "70"); await page.click("#capsave");
    await page.click("#drop"); await page.click("#jump");
    await clearCircle();
    st = await state();
    if (Object.values(st.time.days)[0] !== 70 || !st.time.capSet) bad(`${label}: Fortnite time should stop at the daily limit (70), not ${Object.values(st.time.days)[0]}`);
    await clearCircle(); await clearCircle(); await page.click(".mk.foe.open"); await beat();
    st = await state();
    if (st.crowns !== 2) bad(`${label}: second win not counted`);
    await page.click("#parents summary"); await page.click('[data-used="15"]');
    st = await state();
    if (st.time.used !== 15 || Number(await page.$eval("#timecard", e => e.dataset.balance)) !== 55) bad(`${label}: recording time used went wrong`);
    await shot("grownups");

    /* eliminated: wrong answers until health runs out; coins, guns and minutes earned are kept */
    const keep = st.coins;
    await page.click("#drop"); await page.click("#jump"); await page.click(".mk.foe.open");
    for (let n = 0; n < 15 && !(await page.$("#result")); n++) { await fire(false); await settle(); }   // misses of 15 knock out 100 health (the arena never can; showdown hits add a little shield)
    st = await state();
    if (st.match !== null || st.stats.kos !== 1 || st.coins !== keep || st.gun !== "shotgun") bad(`${label}: being eliminated should end the match and keep coins and guns`);
    if (!/Eliminated![\s\S]*#\d+ of 100/.test(await page.$eval("#result", e => e.textContent))) bad(`${label}: no eliminated card with a placing`);
    await shot("eliminated");
    await page.reload();
    st = await state();
    if (st.crowns !== 2) bad(`${label}: progress was not kept after a reload`);
    if ((await page.$$(".tile.skin:not(.off)")).length !== 3) bad(`${label}: 2 crowns should unlock 3 outfits`);
    const broken = await page.$$eval("img", im => im.filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute("src")));
    if (broken.length) bad(`${label}: pictures did not load: ${broken}`);
    await overflow("lobby after play");
    errors.forEach(e => bad(`${label}: page error: ${e}`));
    console.log(`${label}: 3 matches played (${chests} chests, ${rounds} arena rounds, ${headshots} headshots)`);
    await ctx.close();
  }

  /* practice mode (from the admin page): nothing saved, real progress untouched; layouts; bush and boogie bomb; every question */
  for (const [label, width] of [["desktop", 1200], ["phone", 390]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(String(e)));
    await page.goto("file://" + PAGE);
    const real = JSON.stringify({ coins: 7, crowns: 1, guns: { pistol: 1 }, gun: "pistol", items: { med: 0, shield: 0, boogie: 0, bush: 0 }, skin: "jonesy", q: {}, seq: 1, n: 1, match: null, last: null, time: { cap: 60, capSet: true, days: {}, used: 0 }, stats: { wins: 1, kos: 0, elims: 0, lootCoins: 0 }, sound: true });
    await page.evaluate(s => { localStorage.setItem("prac3.v1", s); sessionStorage.setItem("prac.admin", "1"); }, real);
    await page.goto("file://" + PAGE + "?admin=1");
    if (!(await page.$("#practice-note"))) bad("practice mode: no practice note");
    if (label === "desktop") {
      const { ms, GAP } = await page.evaluate(() => ({ ms: Array.from({ length: 200 }, () => window.__debug.newMatch()), GAP: window.__debug.GAP }));
      ms.forEach((M, i) => checkLayout(M, `match layout ${i}`, GAP));
    }
    const S = () => page.evaluate(() => JSON.parse(JSON.stringify(window.__debug.state())));
    await page.click("#drop"); await page.click("#jump");
    for (let n = 0; n < 3; n++) { await (await page.$$(".mk.foe.open"))[n].click(); const m = (await S()).match; if (m.opps[m.cur].kind !== "reading") break; await page.click("#back"); }
    await page.click("#usebush");
    let s = await S();
    if (!s.match.bush || s.items.bush !== 2) bad("practice mode: the bush did not hide you");
    await page.click("#shoot");
    let k = await page.$eval("#qcard", e => ({ q: e.dataset.q, seed: e.dataset.seed }));
    await page.click(`#qcard .opt[data-i="${(answerOf(k.q, k.seed) + 1) % (await page.$$("#qcard .opt")).length}"]`);
    s = await S();
    if (s.match.hp !== 100 || s.match.bush) bad("practice mode: a miss from a bush should cost nothing and use up the bush");
    await page.click("#next"); await page.evaluate(() => window.__arena.sim(0)); await page.waitForSelector("#roundover"); await page.click("#next");
    if (await page.$("#chestopen")) await page.click("#chestleave");
    await page.waitForSelector("#qcard .opt:not([disabled])");
    k = await page.$eval("#qcard", e => ({ q: e.dataset.q, seed: e.dataset.seed }));
    await page.click(`#qcard .opt[data-i="${answerOf(k.q, k.seed)}"]`); await page.click("#next");
    /* the arena itself, played with the keys (desktop) or the on-screen buttons (phone), one frame at a time */
    await page.waitForSelector("#pix");
    const A = (f, ...a) => page.evaluate(([f, a]) => window.__arena[f](...a), [f, a]);
    const foeHp = async () => { const m = (await S()).match; return m.opps[m.cur].hp; };
    const press = async key => {
      if (label === "desktop") { await page.keyboard.down(key); await A("step", 1); await page.keyboard.up(key); }
      else { const pad = `[data-pad="${{ j: "shoot", k: "build", b: "boogie", ArrowUp: "jump" }[key]}"]`; await page.dispatchEvent(pad, "pointerdown"); await A("step", 1); await page.dispatchEvent(pad, "pointerup"); }
    };
    await A("manual", true); await A("step", 80); await A("foe", "hold");
    const hp0 = await foeHp();
    await A("phase", false); await press("j"); await A("step", 40);
    let g = await A("get");
    if (g.stats.hits !== 1 || g.stats.heads !== 0 || (await foeHp()) !== hp0 - 5) bad(`practice ${label}: a body shot should hit for 5 (${JSON.stringify(g.stats)}, ${hp0} → ${await foeHp()})`);
    await A("phase", true); await press("j"); await A("step", 40);
    g = await A("get");
    if (g.stats.heads !== 1 || (await foeHp()) !== hp0 - 15) bad(`practice ${label}: a shot while the crosshair is on the head should be a headshot for 10 (${JSON.stringify(g.stats)})`);
    await press("k"); g = await A("get");
    if (!g.wallsUp.some(w => w.who === "p") || g.walls !== 2) bad(`practice ${label}: K should build a wall`);
    await A("foe", "aim"); await A("step", 100); g = await A("get");
    if (!g.stats.blocked || g.stats.taken) bad(`practice ${label}: the wall should block the opponent's shot (${JSON.stringify(g.stats)})`);
    await A("walls"); await page.evaluate(() => { const M = window.__debug.state().match; M.hp = 3; M.shield = 0; });
    await A("foe", "aim"); await A("step", 100); s = await S();
    if (s.match.hp !== 1) bad(`practice ${label}: the arena should never knock you out (health ${s.match.hp})`);
    await page.evaluate(() => { window.__debug.state().match.hp = 100; });
    await press("b"); g = await A("get"); s = await S();
    if (g.F.state !== "dance" || s.items.boogie !== 2) bad(`practice ${label}: B should throw a Boogie Bomb`);
    await A("foe", "throw"); await A("step", 130); g = await A("get");
    const hit = g.stats.taken;
    if (!hit) bad(`practice ${label}: standing on a grenade should hurt`);
    await A("foe", "throw");
    for (let n = 0; n < 200; n++) { await A("step", 1); g = await A("get"); if (g.nades.length && g.nades[0].fuse > 0 && g.nades[0].fuse <= 10) break; }
    await press("ArrowUp"); await A("step", 40); g = await A("get");
    if (g.stats.taken !== hit || !g.stats.dodged) bad(`practice ${label}: jumping should dodge the grenade (${JSON.stringify(g.stats)})`);
    await A("foe", "hold"); await A("walls"); await A("step", 40); await A("phase", false);
    for (let n = 0; n < 3; n++) { await A("phase", false); await press("j"); await A("step", 30); }   // aim each time: above the head is a miss
    const last = await A("get");
    await A("step", 120);
    if (!(await page.$("#roundover")) || await page.$eval("#roundover", e => e.dataset.hits) !== "5") bad(`practice ${label}: the round should end when the shots run out, with 5 hits (${JSON.stringify(last)})`);
    await page.click("#back");
    await page.click('[data-jump="4"]'); await page.click(".mk.foe.open"); await page.click("#shoot");
    if (!(await page.$(".opt"))) bad("practice mode: could not jump to the boss");
    const refs = [...Object.keys(HAND).map(id => ({ t: "h", id })), ...C.GENS.flatMap(g => [11, 222, 3333].map(seed => ({ t: "g", id: g.id, seed })))];
    for (const ref of refs) {
      await page.evaluate(r => window.__preview(r), ref);
      const q = ref.t === "g" ? C.GENS.find(g => g.id === ref.id).make(rng(ref.seed)) : HAND[ref.id];
      if ((await page.$$(".opt")).length !== q.options.length) bad(`${label}: ${ref.id} shows the wrong number of options`);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (o > 1) bad(`${label}: sideways scrolling (${o}px) at ${ref.id}`);
      const clipped = await page.$$eval(".figure", f => f.filter(e => e.scrollWidth > e.clientWidth + 1 && !e.querySelector("table")).length);
      if (clipped) bad(`${label}: a picture in ${ref.id} is wider than the screen`);
      if (ref.t === "h" && q.gap && !(await page.$(".gap.cur"))) bad(`${label}: ${ref.id} does not highlight its gap`);
      if (shots && (ref.t === "g" ? ref.seed === 11 : /svg|table/.test(q.stem + q.options.join("")) || /^r\d[a]$/.test(ref.id))) await page.screenshot({ path: path.join(shots, `game3-q-${ref.id}-${label}.png`), fullPage: true });
    }
    if (await page.evaluate(() => localStorage.getItem("prac3.v1")) !== real) bad("practice mode changed the saved progress");
    errors.forEach(e => bad(`practice ${label}: page error: ${e}`));
    await ctx.close();
  }
  await browser.close();
  if (fail) { console.log(`\ngame3: ${fail} problem(s)`); process.exit(1); }
  console.log("game3: PASS (content rules, templates re-solved, match layouts, three whole matches at desktop and phone width, practice mode)");
})().catch(e => { console.log("FAIL " + (e.stack || e)); process.exit(1); });
