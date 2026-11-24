#!/usr/bin/env node
/* Checks the platform game (prac4/index.html, built by tools/build_game4.py).
   1. Content: 15 skill tracks with 4 steps each, every step has questions; sample references only by number;
      hand-written questions have unique ids, 4 options, a trap named for every wrong option, a why-not paragraph,
      the correct option never the single longest, and the four answers in each step on different letters.
   2. Templates: 300 seeds each; every answer is worked out again HERE by a separate method from `data`
      (or from the picture itself for the spatial ones); options are all different; every wrong option names a trap.
   3. In a real browser: all 64 levels can be finished (the hero's own physics, no double jump); a level is played
      from the map through the briefing, kit, platform, nest and scope (body shot, headshot, ducking a glint), clearing
      it unlocks the next and survives a reload; losing offers one retry then a new briefing; a boss is beaten;
      practice mode (admin) unlocks everything, shows the coach sidebar with sample references and saves nothing;
      every hand-written question fits a phone screen.
   Usage: node tools/check_game4.js [screenshot-dir] */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "prac4", "index.html");
const shots = process.argv[2];
let fail = 0;
const bad = m => { fail++; if (fail < 80) console.log("FAIL " + m); };
const text = h => String(h).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

/* ---- load the content as the page does ---- */
const dir = path.join(ROOT, "game4", "content");
const src = fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().map(f => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
const C = {};
vm.runInNewContext(`const INK = "#1b2a41"; const GENS = [], HAND = [];\n${src}\n;Object.assign(OUT, { GENS, HAND, TRACKS });`, { OUT: C, Math, Array, Number, String, Set, Object, Map, console });
const { GENS, HAND, TRACKS } = C;

/* ---- 1. tracks and hand-written questions ---- */
const build = fs.readFileSync(path.join(ROOT, "tools", "build.py"), "utf8");
const cats = sec => JSON.parse(build.match(new RegExp(`"${sec}": (\\[[^\\]]*\\])`, "s"))[1].replace(/\s+/g, " "));
const CATS = { reading: cats("reading"), thinking: cats("thinking"), maths: cats("maths") };
if (TRACKS.length !== 15) bad(`expected 15 tracks, found ${TRACKS.length}`);
for (const t of TRACKS) {
  if (t.rungs.length !== 4) bad(`${t.id}: needs 4 steps`);
  if (!CATS[t.subject] || !CATS[t.subject].includes(t.cat)) bad(`${t.id}: unknown question type "${t.cat}"`);
  if (!t.samples.length) bad(`${t.id}: no sample-paper references`);
  for (const s of t.samples) { if (!/^PT[1-3]/.test(s.ref) && !/^Last question/.test(s.ref)) bad(`${t.id}: sample reference "${s.ref}" must cite a paper by number`); if (!s.rungs.every(r => r >= 1 && r <= 4)) bad(`${t.id}: bad step in ${s.ref}`); }
  for (let r = 1; r <= 4; r++) {
    const g = GENS.filter(x => x.track === t.id && x.rung === r).length, h = HAND.filter(x => x.track === t.id && x.rung === r).length;
    if (!g && h < 4) bad(`${t.id} step ${r}: needs a template or at least 4 hand-written questions (has ${h})`);
    if (!t.samples.some(s => s.rungs.includes(r))) bad(`${t.id} step ${r}: no sample question is linked to this step`);
  }
}
const ids = new Set();
for (const q of HAND) {
  const w = q.id;
  if (ids.has(q.id)) bad(`duplicate id ${q.id}`); ids.add(q.id);
  if (q.options.length !== 4) bad(`${w}: thinking and reading questions need 4 options`);
  if (new Set(q.options).size !== q.options.length) bad(`${w}: two options are the same`);
  if (!(q.answer >= 0 && q.answer < 4)) bad(`${w}: needs exactly one correct option`);
  if (q.options.some((o, i) => i !== q.answer && !q.traps[i])) bad(`${w}: every wrong option needs its trap`);
  if (!/why-not/.test(q.explain)) bad(`${w}: the explanation must say why the traps are wrong`);
  if (TRACKS.find(t => t.id === q.track).cat === "Spot the mistake" && !q.options.every(o => /\bmay\b/.test(o))) bad(`${w}: every spot-the-mistake option needs "may"`);
  const len = q.options.map(o => text(o).length), top = Math.max(...len);
  if (!/^(Extract|Both|Neither|\w+ only$)/.test(q.options[0]) && len[q.answer] === top && len.filter(l => l === top).length === 1 && top > 12) bad(`${w}: the correct option is the single longest`);
  if (/football/i.test(q.passage + q.stem)) bad(`${w}: no football`);
}
for (const t of TRACKS) for (let r = 1; r <= 4; r++) {
  const qs = HAND.filter(q => q.track === t.id && q.rung === r); if (!qs.length) continue;
  const n = {}; qs.forEach(q => n[q.answer] = (n[q.answer] || 0) + 1);
  if (Math.max(...Object.values(n)) > Math.ceil(qs.length / 4) + 0) bad(`${t.id} step ${r}: answer letters not spread ${JSON.stringify(n)}`);
}
const page = fs.existsSync(PAGE) ? fs.readFileSync(PAGE, "utf8") : "";
if (!page) bad("prac4/index.html is missing: run python3 tools/build_game4.py");
if (/\bOC\b/.test(page)) bad('the page must never mention "OC"');
if (/setInterval/.test(page)) bad("no clocks: the game runs on animation frames");
/* nothing copied from the other games' questions */
{
  const old = new Set();
  const WORLDS = []; for (const f of ["reading", "thinking", "maths"]) vm.runInNewContext(fs.readFileSync(path.join(ROOT, "game", "content", f + ".js"), "utf8"), { INK: "#000", WORLDS, Math, Array });
  for (const wd of WORLDS) for (const lv of wd.levels) for (const q of lv.questions) old.add(text(q.stem).toLowerCase());
  for (const q of HAND) if (old.has(text(q.stem).toLowerCase()) && text(q.stem).length > 60) bad(`${q.id}: copied from Crown Quest`);
}

/* ---- 2. templates, re-solved independently ---- */
const num = o => { const t = text(o).replace(/[$,]/g, ""); const m = t.match(/-?\d+(\.\d+)?/); return m ? +m[0] : NaN; };
const fracVal = o => { const m = String(o).match(/<sup>(\d+)<\/sup>⁄<sub>(\d+)<\/sub>/); return m ? +m[1] / +m[2] : NaN; };
const clockS = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mm = m % 60; return `${h % 12 === 0 ? 12 : h % 12}:${String(mm).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const sum = a => a.reduce((x, y) => x + y, 0);
const perms = a => a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p]));
/* clue sentences read back into rules (a different reading from the generator's own) */
function clueRule(s) {
  let m;
  const at = (p, x) => p.indexOf(x);
  if ((m = s.match(/^(\w+) is somewhere to the left of (\w+)\.$/))) return p => at(p, m[1]) < at(p, m[2]);
  if ((m = s.match(/^(\w+) is just to the left of (\w+)\.$/))) return p => at(p, m[2]) === at(p, m[1]) + 1;
  if ((m = s.match(/^(\w+) is next to (\w+)\.$/))) return p => Math.abs(at(p, m[1]) - at(p, m[2])) === 1;
  if ((m = s.match(/^(\w+) is not next to (\w+)\.$/))) return p => Math.abs(at(p, m[1]) - at(p, m[2])) > 1;
  if ((m = s.match(/^(\w+) is at one end\.$/))) return p => [0, p.length - 1].includes(at(p, m[1]));
  if ((m = s.match(/^(\w+) is not at either end\.$/))) return p => ![0, p.length - 1].includes(at(p, m[1]));
  if ((m = s.match(/^(\w+) finished ahead of (\w+)\.$/))) return p => at(p, m[1]) < at(p, m[2]);
  if ((m = s.match(/^(\w+) finished two places behind (\w+)\.$/))) return p => at(p, m[1]) === at(p, m[2]) + 2;
  if ((m = s.match(/^(\w+) finished just before (\w+)\.$/))) return p => at(p, m[2]) === at(p, m[1]) + 1;
  if ((m = s.match(/^(\w+) was not last\.$/))) return p => at(p, m[1]) !== p.length - 1;
  if ((m = s.match(/^(\w+) did not win\.$/))) return p => at(p, m[1]) !== 0;
  if ((m = s.match(/^(\w+) is in place (\d)\.$/))) return p => at(p, m[1]) === +m[2] - 1;
  throw new Error("unknown clue: " + s);
}
/* cube nets folded with 3D frames (not the generator's rolling method) */
function foldNormals(net) {
  const k = (r, c) => r + "," + c, has = new Set(net.map(x => k(...x))), F = {};
  const neg = v => v.map(x => -x);
  F[k(...net[0])] = { u: [1, 0, 0], v: [0, 1, 0], n: [0, 0, -1] };
  const st = [net[0]];
  while (st.length) {
    const [r, c] = st.pop(), f = F[k(r, c)];
    const nb = [[r, c + 1, { n: f.u, u: neg(f.n), v: f.v }], [r, c - 1, { n: neg(f.u), u: f.n, v: f.v }], [r + 1, c, { n: f.v, u: f.u, v: neg(f.n) }], [r - 1, c, { n: neg(f.v), u: f.u, v: f.n }]];
    for (const [rr, cc, g] of nb) if (has.has(k(rr, cc)) && !F[k(rr, cc)]) { F[k(rr, cc)] = g; st.push([rr, cc]); }
  }
  return net.map(x => F[k(...x)].n.join(","));
}
const cellsOf = (svg, colour) => { const out = []; const re = new RegExp(`<rect x="([\\d.]+)" y="([\\d.]+)" width="20" height="20" fill="${colour}"`, "g"); let m; while ((m = re.exec(svg))) out.push([Math.round((+m[2] - 4) / 20), Math.round((+m[1] - 4) / 20)]); return out; };
const norm = cs => { const r0 = Math.min(...cs.map(c => c[0])), c0 = Math.min(...cs.map(c => c[1])); return cs.map(([r, c]) => [r - r0, c - c0]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(x => x.join(",")).join(";"); };
const rot = cs => cs.map(([r, c]) => [c, -r]);
const SOLVE = {
  "m-frac-1": (d, q) => ({ value: d.k / d.n, by: "frac" }),
  "m-frac-2": d => d.total * d.n / d.d,
  "m-frac-3": d => Math.abs(d.n * d.a / d.b - d.s),
  "m-frac-4": d => d.form === "whole" ? d.k * d.b1 * d.a / d.b - d.k : d.form === "rest" ? d.T0 * (1 - 1 / d.p) * (1 - 1 / d.q) : (d.n + d.add) * d.a / d.b - d.s,
  "m-data-1": d => d.form === "column" ? d.vals[d.i] - d.vals[d.j] : (d.a + d.b) * d.k,
  "m-data-2": d => sum(d.v.map(r => r[d.asked])),
  "m-data-3": d => d.form === "chain" ? d.v[d.rA][d.cB] : d.syms[d.i] * d.total / sum(d.syms),
  "m-data-4": d => {
    const L = ["Ana", "Ben", "Caz", "Dom", "Eli"], v = n => d.vals[L.indexOf(n)];
    let n = 0;
    for (const s of d.st) { let m, ok;
      if ((m = s.match(/^(\w+) has twice as many as (\w+)\.$/))) ok = v(m[1]) === 2 * v(m[2]);
      else if ((m = s.match(/^(\w+) and (\w+) together have more than (\w+)\.$/))) ok = v(m[1]) + v(m[2]) > v(m[3]);
      else if ((m = s.match(/most and the fewest is (\d+)\.$/))) ok = Math.max(...d.vals) - Math.min(...d.vals) === +m[1];
      else if ((m = s.match(/^Altogether there are (\d+) /))) ok = sum(d.vals) === +m[1];
      else throw new Error("unknown statement " + s);
      if (ok) n++; }
    return { text: ["None of them", "1", "2", "3", "All 4"][n] };
  },
  "m-time-1": d => d.blocks ? (d.blocks[2][2] - d.blocks[2][1]) + (d.blocks[4][2] - d.blocks[4][1]) : d.b - d.a,
  "m-time-2": d => ({ text: clockS(d.start + d.M) }),
  "m-time-3": d => { const bus = d.buses.find(b => b[1] >= d.arr); return d.form === "arrive" ? { text: clockS(bus[3]) } : bus[1] - d.arr; },
  "m-time-4": d => { if (d.form === "day") return { text: DAYS[(d.d0 + d.n) % 7] }; const t = new Date(2025, d.m, d.d); t.setDate(t.getDate() - d.n); return { text: `${t.getDate()} ${MON[t.getMonth()]}` }; },
  "m-scale-1": d => d.v,
  "m-scale-2": d => d.form === "g" ? 500 - d.have : d.form === "mL" ? d.L * 1000 - d.have : d.m * 100 - d.cut,
  "m-scale-3": d => Math.abs(d.A[1] - d.B[1]),
  "m-scale-4": d => d.form === "ends" ? d.top * d.k / d.n : (d.b - d.a) * d.per,
  "m-back-1": d => d.form === "plus" ? d.b - d.c - d.a : d.form === "times" ? (d.b + d.c) / d.a : d.start + d.on - d.end,
  "m-back-2": d => d.plus ? (d.out - d.b) / d.a : (d.out + d.b) / d.a,
  "m-back-3": d => d.form === "sd" ? (d.askBig ? (d.S + d.D) / 2 : (d.S - d.D) / 2) : (d.p + d.q + d.r) / 2 - [d.q, d.r, d.p][d.ask],
  "m-back-4": d => d.E !== undefined ? (d.order ? 2 * d.E + d.a : 2 * (d.E + d.a)) : d.N - d.r + d.q + d.p,
  "m-shape-1": d => 2 * (d.W + d.H),
  "m-shape-2": d => d.W * d.H - d.w * d.h,
  "m-shape-3": d => d.form === "count" ? sum(d.hs) : d.hs.length * Math.max(...d.hs) - sum(d.hs),
  "m-shape-4": d => d.form === "posts" ? 2 * (d.L + d.W) / d.s : d.laps * 2 * (d.a + d.b) + [d.a, d.b, d.a, d.b].slice(0, d.extra).reduce((x, y) => x + y, 0),
  "t-order-1": d => { const rules = d.clues.map(clueRule), sols = perms(d.ppl).filter(p => rules.every(f => f(p))), mids = [...new Set(sols.map(p => p[1]))]; return mids.length === 1 ? { text: mids[0] } : { error: "middle not fixed" }; },
  "t-order-2": d => { const rules = d.clues.map(clueRule), sols = perms(d.ppl).filter(p => rules.every(f => f(p))), at = [...new Set(sols.map(p => p[d.ask]))]; return at.length === 1 ? { text: at[0] } : { error: "place not fixed" }; },
  "t-order-3": d => { const rules = d.clues.map(clueRule), sols = perms(d.ppl).filter(p => rules.every(f => f(p))), at = [...new Set(sols.map(p => p[d.ask]))]; return at.length === 1 ? { text: at[0] } : { error: "place not fixed" }; },
  "t-order-4": (d, q) => { const rules = d.clues.map(clueRule), sols = perms(d.ppl).filter(p => rules.every(f => f(p)));
    const good = q.options.filter(o => { const f = clueRule(text(o)); return d.askMust ? sols.every(f) : !sols.some(f); });
    return good.length === 1 ? { text: text(good[0]) } : { error: `${good.length} options fit` }; },
  "t-space-1": (d, q) => { const want = norm(rot(d.cells));   /* rot: (r, c) → (c, −r) is a clockwise quarter turn on screen */
    /* the shape and the dot: check the dot too */
    const dotOf = o => { const m = o.match(/<circle cx="([\d.]+)" cy="([\d.]+)"/); return m ? [Math.round((+m[2] - 14) / 20), Math.round((+m[1] - 14) / 20)] : null; };
    const target = rot([...d.cells, d.dot]), tn = target.slice(0, -1), td = target[target.length - 1];
    const r0 = Math.min(...tn.map(c => c[0])), c0 = Math.min(...tn.map(c => c[1])), want2 = [td[0] - r0, td[1] - c0].join(",");
    const ok = q.options.filter(o => norm(cellsOf(o, "#5c8dd6")) === want && (dotOf(o) || []).join(",") === want2);
    return ok.length === 1 ? { opt: q.options.indexOf(ok[0]) } : { error: `${ok.length} options match a clockwise quarter turn` }; },
  "t-space-2": (d, q) => { const rs = [d.cells]; for (let i = 0; i < 3; i++) rs.push(rot(rs[i])); const keys = new Set(rs.map(norm));
    const odd = q.options.map((o, i) => [i, norm(cellsOf(o, "#2f9e44"))]).filter(x => !keys.has(x[1])); return odd.length === 1 ? { opt: odd[0][0] } : { error: `${odd.length} tiles are not turned copies` }; },
  "t-space-3": (d, q) => { const n = foldNormals(d.net), opp = n.map(x => x.split(",").map(v => -v).join(",")), i = n.indexOf(opp[d.ask]); return { text: d.letters[i] }; },
  "t-space-4": (d, q) => { const at = (r, c) => d.h[r * 3 + c], front = [0, 1, 2].map(c => Math.max(at(0, c), at(1, c), at(2, c)));
    const sky = o => { const cols = [0, 0, 0]; const re = /<rect x="([\d.]+)" y="[\d.]+" width="18"/g; let m; while ((m = re.exec(o))) cols[Math.round((+m[1] - 6) / 18)]++; return cols.join(","); };
    const ok = q.options.map((o, i) => [i, sky(o)]).filter(x => x[1] === front.join(",")); return ok.length === 1 ? { opt: ok[0][0] } : { error: `${ok.length} views match the front` }; }
};
for (const g of GENS) {
  if (!SOLVE[g.id]) { bad(`${g.id}: no separate working in SOLVE`); continue; }
  let made = 0; const letters = {};
  for (let seed = 1; seed <= 300; seed++) {
    let q; try { q = g.make(seed); } catch (e) { bad(`${g.id} seed ${seed}: ${e.message}`); break; }
    if (!q) continue; made++;
    const w = `${g.id} seed ${seed}`, want = g.track === "order" || g.track === "space" ? 4 : 5;
    if (q.options.length !== want) { bad(`${w}: needs ${want} options`); continue; }
    if (new Set(q.options).size !== want) bad(`${w}: two options are the same`);
    if (q.options.some((o, i) => i !== q.answer && !q.traps[i])) bad(`${w}: a wrong option has no trap`);
    if (/NaN|undefined|Infinity/.test(q.stem + q.options.join("") + q.explain)) bad(`${w}: NaN or undefined in the text`);
    if (!/why-not/.test(q.explain)) bad(`${w}: no why-not paragraph`);
    if (JSON.stringify(g.make(seed).options) !== JSON.stringify(q.options)) bad(`${w}: not the same question for the same seed`);
    letters[q.answer] = (letters[q.answer] || 0) + 1;
    let s; try { s = SOLVE[g.id](q.data, q); } catch (e) { bad(`${w}: SOLVE failed: ${e.message}`); continue; }
    if (s && s.error) { bad(`${w}: ${s.error}`); continue; }
    let idx;
    if (s && s.opt !== undefined) idx = [s.opt];
    else if (s && s.text !== undefined) idx = q.options.map((o, i) => text(o) === s.text ? i : -1).filter(i => i >= 0);
    else if (s && s.by === "frac") idx = q.options.map((o, i) => Math.abs(fracVal(o) - s.value) < 1e-9 ? i : -1).filter(i => i >= 0);
    else idx = q.options.map((o, i) => Math.abs(num(o) - s) < 1e-9 ? i : -1).filter(i => i >= 0);
    if (idx.length !== 1) bad(`${w}: ${idx.length} options match the separate working (${JSON.stringify(s)}) ${JSON.stringify(q.options.map(text))}`);
    else if (idx[0] !== q.answer) bad(`${w}: the separate working gives ${"ABCDE"[idx[0]]} but the answer is ${"ABCDE"[q.answer]}`);
  }
  if (made < 60) bad(`${g.id}: only ${made} of 300 seeds make a question`);
  if (Object.keys(letters).length < 3) bad(`${g.id}: the answer is always on the same one or two letters ${JSON.stringify(letters)}`);
}
console.log(`content: ${TRACKS.length} tracks, ${HAND.length} hand-written questions, ${GENS.length} templates`);

/* ---- 3. in a browser ---- */
(async () => {
  let chromium; try { ({ chromium } = require("playwright")); } catch (e) { bad("playwright is not installed"); return finish(); }
  const browser = await chromium.launch();
  const url = "file://" + PAGE;
  const errs = [];
  const open = async (vp, q = "") => { const p = await browser.newPage({ viewport: vp }); p.on("pageerror", e => errs.push(e.message)); p.on("console", m => { if (m.type() === "error" && !/ERR_FAILED|fonts\.g/.test(m.text())) errs.push(m.text()); }); await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort()); await p.goto(url + q); return p; };
  const p = await open({ width: 1280, height: 800 });
  /* every level can be finished */
  const stuck = await p.evaluate(() => __rr.LEVELS.filter(L => !__rr.PF.reach({ world: L.world, boss: !!L.boss, seed: L.seed }).ok).map(L => L.id));
  if (stuck.length) bad(`levels that can't be finished: ${stuck.join(", ")}`);
  /* every level has its sniper nests (2 in worlds 1–2, 3 in worlds 3–4), each with a laser gate after it */
  const nestBad = await p.evaluate(() => __rr.LEVELS.filter(L => !L.boss).filter(L => { const G = __rr.PF.gen({ world: L.world, boss: false, seed: L.seed }), n = G.ents.filter(e => e.t === "nest").length, g = G.ents.filter(e => e.t === "gate").length; return n !== (L.world <= 2 ? 2 : 3) || g !== n; }).map(L => L.id));
  if (nestBad.length) bad(`levels without the right number of nests and gates: ${nestBad.join(", ")}`);
  const nodes = await p.$$eval(".node", n => n.length), locked = await p.$$eval(".node.lock", n => n.length);
  if (nodes !== 16 || locked !== 15) bad(`world 1 should show 16 levels with only the first open (shows ${nodes}, ${locked} locked)`);
  /* play level 1 from the map */
  await p.click('.node[data-l="1-frac"]'); await p.click("#btn-go");
  const n1 = await p.evaluate(() => __rr.B().qs.length); if (n1 !== 4) bad(`a briefing should have 4 questions (has ${n1})`);
  const climb = await p.evaluate(() => __rr.B().qs.map(q => q.track + ":" + q.rung).join(","));
  if (climb !== "frac:1,frac:2,frac:3,frac:4") bad(`a briefing should climb through one skill's steps 1 to 4 (got ${climb})`);
  /* no repeats while unseen questions are left, even when a briefing is left early */
  const pr = await open({ width: 1280, height: 800 });
  const rep = await pr.evaluate(() => { const got = []; for (let k = 0; k < 4; k++) { __rr.startBrief("1-flaw"); got.push(...__rr.B().qs.map(q => q.id)); } return got.length - new Set(got).size; });
  await pr.evaluate(() => localStorage.clear()); await pr.close();
  if (rep) bad(`four briefings of the same skill (each left after the first question) repeated ${rep} question(s) while unseen ones were left`);
  /* every level of every world climbs easy to hard, on its own skill */
  const climbs = await p.evaluate(() => { const out = []; for (const L of __rr.LEVELS) { const qs = __rr.briefing(L), steps = qs.map(q => q.rung); if (steps.some((r, i) => i && r < steps[i - 1]) || (!L.boss && (qs.length !== 4 || qs.some(q => q.track !== L.track)))) out.push(L.id); } return out; });
  if (climbs.length) bad(`briefings that don't climb easy to hard: ${climbs.join(", ")}`);
  for (let i = 0; i < 4; i++) { await p.evaluate(i => { const B = __rr.B(), q = B.qs[B.i]; __rr.answer(i < 2 ? q.answer : (q.answer + 1) % q.options.length); }, i); if (!(await p.isVisible("#explain"))) bad("the explanation should show after answering"); await p.click("#btn-next"); }
  const kit = await p.evaluate(() => __rr.B().kit), want = await p.evaluate(() => __rr.kitFor(2, 4, false));
  if (JSON.stringify(kit) !== JSON.stringify(want)) bad("the kit should follow the briefing score");
  if (shots) await p.screenshot({ path: path.join(shots, "rr-kit.png") });
  await p.click("#btn-play"); await p.waitForTimeout(400);
  const st0 = await p.evaluate(() => __rr.PF.hook.state());
  if (!st0 || st0.hearts !== kit.hearts || st0.ammo !== kit.ammo || st0.rounds !== kit.rounds) bad("the level should start with the kit from the briefing");
  /* real keys move the hero */
  await p.keyboard.down("ArrowRight"); await p.waitForTimeout(500); await p.keyboard.up("ArrowRight");
  const st1 = await p.evaluate(() => __rr.PF.hook.state()); if (!(st1.x > st0.x + 20)) bad("the right arrow should move the hero");
  await p.keyboard.press("Space"); await p.waitForTimeout(120); const st2 = await p.evaluate(() => __rr.PF.hook.state()); if (!(st2.y < st1.y - 4)) bad("space should jump");
  /* the nest and the scope */
  await p.evaluate(() => { const n = __rr.PF.hook.nests()[0]; __rr.PF.hook.teleport(Math.floor(n.x / 16)); }); await p.waitForTimeout(200);
  await p.keyboard.press("KeyE"); await p.waitForTimeout(150);
  if (!(await p.evaluate(() => __rr.PF.hook.state().scope))) bad("E at a nest should open the scope");
  const before = await p.evaluate(() => __rr.PF.hook.nests()[0].alive);
  await p.evaluate(() => __rr.PF.hook.aimAt(0, "head")); await p.evaluate(() => __rr.PF.hook.fire()); await p.waitForTimeout(100);
  const fx = await p.evaluate(() => __rr.PF.hook.fx());
  if (!fx.includes("mark-head") || !fx.includes("pop") || !fx.includes("helmet")) bad(`a headshot should show a red hit marker, pop-up words and a flying helmet (${fx.join(", ")})`);
  if (shots) { await p.waitForTimeout(150); await p.screenshot({ path: path.join(shots, "rr-hit.png") }); }
  const after = await p.evaluate(() => __rr.PF.hook.nests()[0].alive); if (after !== before - 1) bad(`a shot on a sentry should knock it out (${before} → ${after})`);
  if (shots) await p.screenshot({ path: path.join(shots, "rr-scope.png") });
  /* gold bullets: every level has more than enough for its sentries, and grabbing one adds a sniper round */
  const short = await p.evaluate(() => __rr.LEVELS.filter(L => !L.boss).filter(L => { const G = __rr.PF.gen({ world: L.world, boss: false, seed: L.seed }); const sentries = (L.world === 1 ? 2 : L.world === 4 ? 4 : 3) * G.ents.filter(e => e.t === "nest").length; return G.ents.filter(e => e.t === "ammo").length < sentries + 3; }).map(L => L.id));
  if (short.length) bad(`levels without enough gold bullets for their sentries: ${short.join(", ")}`);
  { await p.evaluate(() => __rr.PF.hook.exitScope()); const r0 = await p.evaluate(() => __rr.PF.hook.state().rounds);
    await p.evaluate(() => __rr.PF.hook.grab()); await p.waitForTimeout(150);
    const r1 = await p.evaluate(() => __rr.PF.hook.state().rounds); if (r1 !== r0 + 1) bad(`grabbing a gold bullet should add a sniper round (${r0} → ${r1})`);
    await p.evaluate(() => { const n = __rr.PF.hook.nests()[0]; __rr.PF.hook.teleport(Math.floor(n.x / 16)); }); await p.waitForTimeout(150); await p.keyboard.press("KeyE"); await p.waitForTimeout(100); }
  /* moving enemies of several kinds from world 1, and two treasure chests in every normal level */
  const kinds = await p.evaluate(() => { const k = new Set(); for (const L of __rr.LEVELS.filter(L => L.world === 1 && !L.boss)) __rr.PF.gen({ world: 1, boss: false, seed: L.seed }).ents.forEach(e => k.add(e.t)); return [...k]; });
  for (const t of ["walker", "hopper", "roller", "drone"]) if (!kinds.includes(t)) bad(`world 1 should have ${t} enemies`);
  const noChest = await p.evaluate(() => __rr.LEVELS.filter(L => !L.boss && __rr.PF.gen({ world: L.world, boss: false, seed: L.seed }).ents.filter(e => e.t === "chest").length !== 2).map(L => L.id));
  if (noChest.length) bad(`levels without two treasure chests: ${noChest.join(", ")}`);
  /* a chest: the game pauses, a right answer opens it and gives loot, the level carries on */
  { await p.evaluate(() => __rr.PF.hook.exitScope());
    const k0 = await p.evaluate(() => __rr.PF.hook.kit());
    await p.evaluate(() => __rr.PF.hook.toChest()); await p.waitForTimeout(250);
    if (!(await p.isVisible("#chest")) || !(await p.evaluate(() => __rr.PF.hook.paused()))) bad("touching a chest should pause the level and ask a question");
    if (shots) await p.screenshot({ path: path.join(shots, "rr-chest.png") });
    await p.evaluate(() => __rr.chestAnswer(__rr.chest().answer)); await p.waitForTimeout(100);
    if (!(await p.isVisible("#chest .loot"))) bad("a right answer should reveal the loot");
    if (shots) await p.screenshot({ path: path.join(shots, "rr-loot.png") });
    await p.keyboard.press("Enter"); await p.waitForTimeout(150);
    const k1 = await p.evaluate(() => __rr.PF.hook.kit());
    if (await p.isVisible("#chest")) bad("Enter should close the chest"); if (await p.evaluate(() => __rr.PF.hook.paused())) bad("the level should carry on after the chest");
    if (JSON.stringify(k0) === JSON.stringify(k1)) bad("the loot should change the kit");
    if ((await p.evaluate(() => __rr.PF.hook.chests()))[0] !== "open") bad("the chest should stay open");
    await p.evaluate(() => __rr.PF.hook.toChest()); await p.waitForTimeout(250);
    await p.evaluate(() => __rr.chestAnswer((__rr.chest().answer + 1) % 4)); await p.waitForTimeout(80);
    if (await p.isVisible("#chest .loot")) bad("a wrong answer should leave the chest locked");
    await p.evaluate(() => __rr.closeChest()); await p.waitForTimeout(80);
    if ((await p.evaluate(() => __rr.PF.hook.chests()))[1] !== "locked") bad("a wrongly answered chest should stay locked");
    await p.evaluate(() => { const n = __rr.PF.hook.nests()[0]; __rr.PF.hook.teleport(Math.floor(n.x / 16)); }); await p.waitForTimeout(150); await p.keyboard.press("KeyE"); await p.waitForTimeout(100); }
  /* the gate after the nest stays shut (it blocks the hero) until the ridge is clear */
  if ((await p.evaluate(() => __rr.PF.hook.gates()[0].open))) bad("the laser gate should start shut");
  await p.keyboard.press("KeyE"); await p.waitForTimeout(150);
  if (!(await p.evaluate(() => __rr.PF.hook.nests()[0].card))) bad("E should show the ridge report");
  if (shots) await p.screenshot({ path: path.join(shots, "rr-report.png") });
  await p.waitForTimeout(500); await p.keyboard.press("KeyE"); await p.waitForTimeout(100);
  if (await p.evaluate(() => __rr.PF.hook.state().scope)) bad("E again should leave the scope");
  await p.evaluate(() => __rr.PF.hook.teleport(__rr.PF.hook.gates()[0].col - 3)); await p.keyboard.down("ArrowRight"); await p.waitForTimeout(900); await p.keyboard.up("ArrowRight");
  const gx = await p.evaluate(() => __rr.PF.hook.state().x), gcol = await p.evaluate(() => __rr.PF.hook.gates()[0].col);
  if (gx > gcol * 16) bad("a shut laser gate should block the way");
  await p.evaluate(() => { const n = __rr.PF.hook.nests()[0]; __rr.PF.hook.teleport(Math.floor(n.x / 16)); }); await p.waitForTimeout(150); await p.keyboard.press("KeyE"); await p.waitForTimeout(100);
  /* out of rounds: a supply drop comes (never stuck) */
  await p.evaluate(() => __rr.PF.hook.setRounds(0)); await p.waitForTimeout(5800);
  if (!((await p.evaluate(() => __rr.PF.hook.state().rounds)) > 0)) bad("running out of sniper rounds at a nest should bring a supply drop");
  /* score attack: knocked-out sentries are replaced, the gate opens at the minimum, and the score keeps climbing */
  for (let k = 0; k < 12 && !(await p.evaluate(() => __rr.PF.hook.nests()[0].gate)); k++) { await p.evaluate(() => { __rr.PF.hook.aimAt(0, "head"); __rr.PF.hook.fire(); }); await p.waitForTimeout(700); }
  if (!(await p.evaluate(() => __rr.PF.hook.gates()[0].open))) bad("knocking out the minimum should open the laser gate");
  await p.waitForTimeout(1600);
  if (!((await p.evaluate(() => __rr.PF.hook.nests()[0].alive)) > 0)) bad("knocked-out sentries should be replaced by new ones");
  const sc0 = await p.evaluate(() => __rr.PF.hook.nests()[0].score);
  await p.evaluate(() => { __rr.PF.hook.aimAt(0, "head"); __rr.PF.hook.fire(); }); await p.waitForTimeout(150);
  if (!((await p.evaluate(() => __rr.PF.hook.nests()[0].score)) > sc0)) bad("shots after the gate opens should keep adding to the score");
  await p.evaluate(() => __rr.PF.hook.setRounds(0)); await p.waitForTimeout(700);
  if (!(await p.evaluate(() => __rr.PF.hook.nests()[0].card))) bad("running out of rounds after the gate opens should show the ridge report");
  /* any key closes the report (J here), and an empty rifle can't reopen an open ridge */
  await p.waitForTimeout(500); await p.keyboard.press("KeyJ"); await p.waitForTimeout(150);
  if (await p.evaluate(() => __rr.PF.hook.state().scope)) bad("any key (J) should close the ridge report");
  await p.keyboard.press("KeyE"); await p.waitForTimeout(150);
  if (await p.evaluate(() => __rr.PF.hook.state().scope)) bad("with no rounds left, an open ridge shouldn't show its report again");
  await p.waitForTimeout(800);
  /* reach the flag */
  await p.evaluate(() => __rr.PF.hook.exitScope());
  await p.evaluate(() => __rr.PF.hook.teleport(__rr.PF.hook.state().cols - 5)); await p.waitForTimeout(1600);
  if (!(await p.isVisible("#scr-result"))) bad("reaching the flag should finish the level");
  const rec = await p.evaluate(() => __rr.S().levels["1-frac"]); if (!rec || !rec.cleared || rec.stars !== 1) bad("clearing with 2/4 should save 1 star");
  await p.reload(); const open2 = await p.$$eval(".node.lock", n => n.length); if (open2 !== 14) bad("after a reload level 2 should be open");
  /* ducking a glint and the shells */
  await p.evaluate(() => __rr.startBrief("2-flaw"));
  for (let i = 0; i < 4; i++) { await p.evaluate(() => { const B = __rr.B(); __rr.answer(B.qs[B.i].answer); }); await p.click("#btn-next"); }
  await p.click("#btn-play"); await p.waitForTimeout(300);
  await p.evaluate(() => { const n = __rr.PF.hook.nests()[0]; __rr.PF.hook.teleport(Math.floor(n.x / 16)); }); await p.waitForTimeout(150); await p.keyboard.press("KeyE"); await p.waitForTimeout(100);
  const hp0 = await p.evaluate(() => __rr.PF.hook.state().hearts);
  await p.keyboard.down("KeyK"); await p.waitForTimeout(3500); await p.keyboard.up("KeyK");
  const hp1 = await p.evaluate(() => __rr.PF.hook.state().hearts); if (hp1 !== hp0) bad("holding K (duck) should dodge every sniper shot");
  /* a sentry that aims fires a bullet you can see; standing up costs a heart, shooting it first stops the shot */
  { await p.evaluate(() => { __rr.PF.hook.hurt = __rr.PF.hook.hurt; __rr.PF.hook.forceAim(); });
    let seen = 0; for (let k = 0; k < 40 && !seen; k++) { await p.waitForTimeout(80); seen = await p.evaluate(() => __rr.PF.hook.incoming()); }
    if (!seen) bad("an aiming sentry should fire a bullet you can see coming");
    const h0 = await p.evaluate(() => __rr.PF.hook.state().hearts + __rr.PF.hook.state().shield);
    for (let k = 0; k < 30 && (await p.evaluate(() => __rr.PF.hook.incoming())); k++) await p.waitForTimeout(60);
    const h1 = await p.evaluate(() => __rr.PF.hook.state().hearts + __rr.PF.hook.state().shield);
    if (h1 !== h0 - 1) bad(`a bullet that arrives while standing should cost a heart or the shield (${h0} → ${h1})`);
    if (shots) await p.screenshot({ path: path.join(shots, "rr-ouch.png") });
    /* the other sentries are held still for this one, so only the sentry we shoot could fire */
    await p.evaluate(() => { __rr.PF.hook.quiet(); __rr.PF.hook.forceAim(); }); await p.waitForTimeout(100);
    await p.evaluate(() => { __rr.PF.hook.aimAt(0, "body"); __rr.PF.hook.fire(); __rr.PF.hook.quiet(); }); await p.waitForTimeout(1500);
    if (await p.evaluate(() => __rr.PF.hook.incoming())) bad("shooting an aiming sentry first should stop its shot"); }
  await p.evaluate(() => __rr.PF.hook.aimAt(0, "body")); await p.evaluate(() => __rr.PF.hook.fire()); await p.waitForTimeout(80);
  /* losing: one retry with the same kit, then a new briefing */
  await p.evaluate(() => __rr.PF.hook.lose()); await p.waitForTimeout(900);
  if (!(await p.isVisible("#btn-retry"))) bad("losing should offer a retry with the same kit");
  await p.click("#btn-retry"); await p.waitForTimeout(300); await p.evaluate(() => __rr.PF.hook.lose()); await p.waitForTimeout(900);
  if (await p.isVisible("#btn-retry")) bad("only one retry per briefing"); if (!(await p.isVisible("#btn-rebrief"))) bad("a new briefing should be offered");
  /* a boss */
  await p.evaluate(() => __rr.startBrief("1-boss"));
  if ((await p.evaluate(() => __rr.B().qs.length)) !== 6) bad("a boss briefing has 6 questions");
  const subs = await p.evaluate(() => __rr.B().qs.map(q => __rr.TRACKS.find(t => t.id === q.track).subject).sort().join(","));
  if (subs !== "maths,maths,reading,reading,thinking,thinking") bad(`a boss briefing mixes 2 of each subject (${subs})`);
  const bossSteps = await p.evaluate(() => __rr.B().qs.map(q => q.rung).join(","));
  if (bossSteps !== "1,2,3,3,4,4") bad(`a boss briefing should climb 1, 2, 3, 3, 4, 4 (got ${bossSteps})`);
  for (let i = 0; i < 6; i++) { await p.evaluate(() => { const B = __rr.B(); __rr.answer(B.qs[B.i].answer); }); await p.click("#btn-next"); }
  await p.click("#btn-play"); await p.waitForTimeout(300);
  await p.evaluate(() => { const n = __rr.PF.hook.nests().find(x => x.boss); __rr.PF.hook.teleport(Math.floor(n.x / 16)); }); await p.waitForTimeout(250);
  if (!(await p.evaluate(() => __rr.PF.hook.state().scope))) bad("reaching the boss nest should open the scope");
  for (let k = 0; k < 10 && !(await p.isVisible("#scr-result")); k++) { await p.evaluate(() => { __rr.PF.hook.aimAt(0, "head"); __rr.PF.hook.fire(); }); await p.waitForTimeout(250); }
  await p.waitForTimeout(1200);
  if (!(await p.evaluate(() => (__rr.S().levels["1-boss"] || {}).cleared))) bad("three headshots should beat the world 1 boss");
  /* practice mode: everything open, coach notes, nothing saved */
  const saved = await p.evaluate(() => localStorage.getItem("prac4.v1"));
  await p.evaluate(() => sessionStorage.setItem("prac.admin", "1"));
  await p.goto(url + "?admin=1");
  if ((await p.$$eval(".node.lock", n => n.length)) !== 0) bad("practice mode should open every level");
  if (!(await p.isVisible("#coach"))) bad("practice mode should show the coach sidebar");
  await p.click('.tab[data-w="3"]'); await p.click('.node[data-l="3-frac"]');
  if (!/PT1 Maths Q4/.test(await p.textContent("#coach-body"))) bad("the coach notes should list the sample questions");
  await p.click("#btn-go");
  const coach = await p.textContent("#coach-body");
  for (const w of ["Sample questions it builds toward", "The underlying skill", "How this step builds it", "Traps in this question"]) if (!coach.includes(w)) bad(`coach notes should include "${w}"`);
  if (shots) await p.screenshot({ path: path.join(shots, "rr-coach.png"), fullPage: true });
  for (let i = 0; i < 4; i++) { await p.evaluate(() => { const B = __rr.B(); __rr.answer(B.qs[B.i].answer); }); await p.click("#btn-next"); }
  await p.click("#btn-play"); await p.waitForTimeout(200); await p.click("#adm-win"); await p.waitForTimeout(1300);
  if ((await p.evaluate(() => localStorage.getItem("prac4.v1"))) !== saved) bad("practice mode must not save progress");
  await p.goto(url + "?admin=1"); await p.evaluate(() => sessionStorage.removeItem("prac.admin")); await p.goto(url + "?admin=1");
  if (await p.isVisible("#coach")) bad("?admin=1 without the PIN should not show coach notes");
  /* on a monitor (laptop 1366 × 768, with and without the coach sidebar) the options and the Next button
     show without scrolling, for every hand-written question and some of every template */
  for (const [admin, vp] of [[false, { width: 1366, height: 768 }], [true, { width: 1366, height: 768 }], [false, { width: 1920, height: 1080 }]]) {
    const pg = await open(vp);
    if (admin) { await pg.evaluate(() => sessionStorage.setItem("prac.admin", "1")); await pg.goto(url + "?admin=1"); }
    const off = await pg.evaluate(() => {
      const out = [], qs = [...HAND, ...GENS.flatMap(g => [1, 2].map(s => g.make(s * 23)).filter(Boolean))];
      for (const q of qs) {
        __rr.preview(q); window.scrollTo(0, 0);
        const opts = [...document.querySelectorAll("#scr-brief .opt")], lastOpt = opts[opts.length - 1].getBoundingClientRect();
        __rr.answer(q.answer);
        const nx = document.querySelector("#btn-next").getBoundingClientRect();
        if (lastOpt.bottom > innerHeight || nx.bottom > innerHeight) out.push(`${q.id} (${Math.round(Math.max(lastOpt.bottom, nx.bottom))}px)`);
      }
      return out;
    });
    if (off.length) bad(`at ${vp.width}×${vp.height}${admin ? " with the coach sidebar" : ""} these need scrolling to reach the options or Next: ${off.slice(0, 6).join(", ")}${off.length > 6 ? ` … (${off.length})` : ""}`);
    if (shots && vp.width === 1366 && admin) { await pg.evaluate(() => { __rr.preview(HAND.find(q => q.id === "ri4a")); __rr.answer(0); }); await pg.screenshot({ path: path.join(shots, "rr-monitor.png") }); }
    await pg.close();
  }
  /* the keyboard answers and moves on */
  { const pg = await open({ width: 1366, height: 768 });
    await pg.evaluate(() => __rr.startBrief("1-frac")); const i0 = await pg.evaluate(() => __rr.B().i);
    await pg.keyboard.press("b"); await pg.keyboard.press("Enter");
    if ((await pg.evaluate(() => __rr.B().i)) !== i0 + 1 || (await pg.evaluate(() => __rr.B().res[0])) === undefined) bad("keys A–E should answer and Enter should go to the next question");
    await pg.close(); }
  /* every hand-written question (and some of every template) fits a phone screen */
  const ph = await open({ width: 390, height: 800 });
  const wide = await ph.evaluate(() => {
    const out = [], qs = [...HAND, ...GENS.flatMap(g => [1, 2, 3].map(s => g.make(s * 17)).filter(Boolean))];
    for (const q of qs) {
      __rr.preview(q);
      const card = document.querySelector("#scr-brief .qcard");
      if (document.documentElement.scrollWidth > innerWidth + 1 || card.scrollWidth > card.clientWidth + 1) out.push(q.id);
    }
    return out;
  });
  if (wide.length) bad(`too wide for a phone: ${wide.slice(0, 8).join(", ")}${wide.length > 8 ? " …" : ""}`);
  if (shots) { await ph.evaluate(() => __rr.preview(HAND.find(q => q.id === "rs2a"))); await ph.screenshot({ path: path.join(shots, "rr-phone.png"), fullPage: true }); }
  await browser.close();
  if (errs.length) bad("page errors: " + [...new Set(errs)].slice(0, 5).join(" | "));
  finish();
})();
function finish() { console.log(fail ? `${fail} problem(s)` : "Ridge Runner: all checks passed"); process.exit(fail ? 1 : 0); }
