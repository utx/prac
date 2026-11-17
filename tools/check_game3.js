#!/usr/bin/env node
/* Checks the battle game (prac3/index.html, built by tools/build_game3.py).
   1. Hand-written questions: unique ids, option counts (maths A–E, thinking and reading A–D, a sentence bank A–F),
      a known question type, an explanation that says why the traps are wrong, the correct option never the single
      longest, answer letters spread, "may" in every spot-the-mistake option, all five reading formats, and nothing
      copied from Crown Quest (game/content).
   2. Templates (generators.js): for many random seeds each one must give the right number of different options,
      a correct answer that this script works out again BY ITS OWN SEPARATE METHOD from the numbers in `data`,
      a picture drawn from those same numbers, the same question again for the same seed, and spread letters.
   3. In a real browser at desktop and phone width: a whole match is played and won, a miss costs health and gives
      no second go, knock-outs keep coins, the shop and items work, Fortnite time stops at the daily limit,
      progress survives a reload, practice mode saves nothing, and every question fits the screen.
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
vm.runInNewContext(`const INK = "#1b2a41"; const READING = [], THINKING = [], MATHS = [], GENS = [];\n${src}\n;Object.assign(OUT, { READING, THINKING, MATHS, GENS });`, { OUT: C, Math, Array, Number, String, Set, Object, console });
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
    if (q.options.length !== want || new Set(q.options.map(text)).size !== want) no(`seed ${seed}: needs ${want} different options (${q.options.map(text).join(" | ")})`);
    if (!(q.answer >= 0 && q.answer < want)) { no(`seed ${seed}: bad answer index`); continue; }
    if (/undefined|NaN|null|Infinity/.test(text(q.stem) + text(q.explain) + q.options.join())) no(`seed ${seed}: broken text`);
    if (!/why-not/.test(q.explain)) no(`the explanation must say why the traps are wrong`);
    longest(q, `template ${g.id} seed ${seed}`);
    const mine = SOLVE[g.id](q.data), shown = text(q.options[q.answer]);
    const same = typeof mine === "number" ? (g.id === "droplow" ? mine === q.answer : near(mine, num(shown))) : mine === shown;
    if (!same) no(`seed ${seed}: the marked answer is "${shown}" but working it out separately gives "${mine}"`);
    if (typeof mine === "number" && g.id !== "droplow" && q.options.filter(o => near(num(text(o)), mine)).length !== 1) no(`seed ${seed}: not exactly one correct option`);
    if (DRAWN[g.id] && !DRAWN[g.id](q.data, q.stem)) no(`seed ${seed}: the picture does not match the numbers`);
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
for (const n of ["island", "gun-pistol", "gun-shotgun", "gun-minigun", "medkit", "shieldpotion", "coins", "storm", "battlebus", "victory"]) need.add("prac3/art/" + n);
for (const n of ["crown3d", "chest0", "chest1", "chest2", "chest3", "chest4", "arena-forest", "arena-peaks", "arena-reef"]) need.add("prac2/art/" + n);
for (const n of need) if (!fs.existsSync(path.join(ROOT, n + ".webp"))) bad(`missing picture ${n}.webp`);

if (!/id="game3-practice" href="\.\.\/prac3\/index\.html\?admin=1"/.test(fs.readFileSync(path.join(ROOT, "pracadmin", "index.html"), "utf8"))) bad("the admin page has no Practice button for this game");

/* ---- 3. browser ---- */
const answerOf = (key, seed) => key.startsWith("g:") ? C.GENS.find(g => g.id === key.slice(2)).make(rng(Number(seed))).answer : HAND[key].answer;
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
    await overflow("lobby"); await shot("lobby");
    if (!(await page.$("#drop"))) bad(`${label}: no Drop in button for a new player`);
    await page.click("#drop");
    await overflow("island"); await shot("island");
    if ((await page.$$(".mk.foe.open")).length !== 3 || (await page.$$(".mk.foe.later")).length !== 5) bad(`${label}: circle 1 should have 3 opponents open and 5 waiting`);

    /* take one shot at the current opponent; right = answer correctly */
    const fire = async right => {
      if (await page.$("#shoot:not([disabled])")) await page.click("#shoot");
      await page.waitForSelector(".opt:not([disabled])");
      const { q, seed } = await page.$eval("#qcard", e => ({ q: e.dataset.q, seed: e.dataset.seed }));
      const ans = answerOf(q, seed), n = (await page.$$(".opt")).length;
      await overflow(q);
      await page.click(`.opt[data-i="${right ? ans : (ans + 1) % n}"]`);
      if (!(await page.$(right ? ".fb.good" : ".fb.miss"))) bad(`${label}: ${q} ${right ? "did not accept the correct answer" : "accepted a wrong answer"}`);
      if (await page.$(".opt:not([disabled])")) bad(`${label}: ${q} allowed a second go`);
      await overflow(q + " explanation");
      return q;
    };
    const next = () => page.click("#next");
    /* fight the open opponent number i until it is beaten */
    const beat = async () => {
      for (let n = 0; n < 12; n++) { await fire(true); const t = await page.$eval("#next", e => e.textContent); await next(); if (!/Next shot/.test(t)) return; }
      bad(`${label}: an opponent took more than 12 hits`);
    };
    const winMatch = async () => {
      if (await page.$("#drop")) await page.click("#drop");
      for (let n = 0; n < 8; n++) { await page.click(".mk.foe.open"); await beat(); }
    };

    /* a miss: health drops, the explanation shows, the same question is still there after a reload */
    await page.click(".mk.foe.open");
    await page.click("#enemy");
    const before = await page.$eval("#qcard", e => e.dataset.q + e.dataset.seed);
    if (!(await page.$("#back[disabled]"))) bad(`${label}: you can walk away from an unanswered question`);
    await page.reload();
    if (await page.$eval("#qcard", e => e.dataset.q + e.dataset.seed) !== before) bad(`${label}: reloading the page swapped the question`);
    await fire(false); await shot("miss");
    let st = await state();
    if (st.match.hp !== 80 || st.match.misses !== 1) bad(`${label}: a miss in circle 1 should cost 20 health (health ${st.match.hp})`);
    await next(); await fire(true); await shot("hit");
    st = await state();
    if (st.match.opps[st.match.cur].hp !== 35) bad(`${label}: a hit with the first gun should do 25 damage`);
    await next();
    /* med kit */
    await page.click("#usemed");
    st = await state();
    if (st.match.hp !== 100 || st.items.med !== 0) bad(`${label}: the med kit did not heal`);
    await beat();
    st = await state();
    if (st.coins !== 15) bad(`${label}: beating a circle 1 opponent should pay 15 coins, not ${st.coins}`);
    for (let n = 0; n < 2; n++) { await page.click(".mk.foe.open"); await beat(); }
    st = await state();
    if (st.match.stage !== 2 || !(await page.$(".banner"))) bad(`${label}: the storm did not close after circle 1`);
    await shot("circle2");
    for (let n = 0; n < 5; n++) { await page.click(".mk.foe.open"); if (n === 4) { await page.click("#shoot"); await shot("boss"); } await beat(); }
    st = await state();
    if (st.crowns !== 1 || st.match !== null || st.stats.wins !== 1) bad(`${label}: winning the match did not give a crown`);
    if (st.coins !== 3 * 15 + 2 * 25 + 2 * 35 + 80 + 50) bad(`${label}: coins after a win should be 295, not ${st.coins}`);
    const today = Object.values(st.time.days)[0];
    if (today !== 8 + 5) bad(`${label}: a win with one miss should earn 13 minutes, not ${today}`);
    if (!(await page.$("#result"))) bad(`${label}: no victory card`);
    await shot("victory"); await overflow("victory");
    /* shop: buy the shotgun, hits now do 35 */
    await page.click('[data-buy="shotgun"]');
    st = await state();
    if (st.gun !== "shotgun" || st.coins !== 45) bad(`${label}: buying the shotgun went wrong (coins ${st.coins})`);
    await page.click('[data-item="shield"]');
    /* a perfect match would earn 15 more, but the daily limit of 20 (set here) stops it at 20 */
    await page.click("#parents summary"); await page.fill("#cap", "20"); await page.click("#capsave");
    await winMatch();
    st = await state();
    if (Object.values(st.time.days)[0] !== 20) bad(`${label}: Fortnite time should stop at the daily limit (20), not ${Object.values(st.time.days)[0]}`);
    if (st.crowns !== 2) bad(`${label}: second win not counted`);
    await page.click("#parents summary"); await page.click('[data-used="15"]');
    st = await state();
    if (st.time.used !== 15 || Number(await page.$eval("#timecard", e => e.dataset.balance)) !== 5) bad(`${label}: recording time used went wrong`);
    await shot("grownups");
    /* knocked out: wrong answers until health runs out; coins and guns are kept */
    const coins = st.coins;
    await page.click("#drop"); await page.click(".mk.foe.open");
    for (let n = 0; n < 5; n++) { await fire(false); await next(); }
    st = await state();
    if (st.match !== null || st.stats.kos !== 1 || st.coins !== coins || st.gun !== "shotgun") bad(`${label}: a knock-out should end the match and keep coins and guns`);
    if (!/Knocked out/.test(await page.$eval("#result", e => e.textContent))) bad(`${label}: no knocked-out card`);
    await shot("knockedout");
    await page.reload();
    st = await state();
    if (st.crowns !== 2) bad(`${label}: progress was not kept after a reload`);
    if ((await page.$$(".tile.skin:not(.off)")).length !== 3) bad(`${label}: 2 crowns should unlock 3 outfits`);
    const broken = await page.$$eval("img", im => im.filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute("src")));
    if (broken.length) bad(`${label}: pictures did not load: ${broken}`);
    await overflow("lobby after play");
    errors.forEach(e => bad(`${label}: page error: ${e}`));
    await ctx.close();
  }

  /* practice mode (from the admin page): nothing saved, real progress untouched; and look at every question */
  for (const [label, width] of [["desktop", 1200], ["phone", 390]]) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(String(e)));
    await page.goto("file://" + PAGE);
    const real = JSON.stringify({ coins: 7, crowns: 1, guns: { pistol: 1 }, gun: "pistol", items: { med: 0, shield: 0 }, skin: "jonesy", q: {}, seq: 1, n: 1, match: null, last: null, time: { cap: 30, days: {}, used: 0 }, stats: { wins: 1, kos: 0 }, sound: true });
    await page.evaluate(s => { localStorage.setItem("prac3.v1", s); sessionStorage.setItem("prac.admin", "1"); }, real);
    await page.goto("file://" + PAGE + "?admin=1");
    if (!(await page.$("#practice-note"))) bad("practice mode: no practice note");
    await page.click("#drop"); await page.click('[data-jump="4"]'); await page.click(".mk.foe.open"); await page.click("#shoot");
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
  console.log("game3: PASS (content rules, templates re-solved, full matches played at desktop and phone width, practice mode)");
})().catch(e => { console.log("FAIL " + (e.stack || e)); process.exit(1); });
