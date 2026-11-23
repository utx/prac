/* ---------------------------------------------------------------
   RIDGE RUNNER: shared helpers for the question files.
   The files in game4/content are joined in name order by tools/build_game4.py,
   so this one loads first. Everything drawn here is our own simple SVG.
   --------------------------------------------------------------- */
const LIB = (() => {
  /* a seeded random source: the same seed always gives the same question */
  function R(seed) {
    let a = (seed >>> 0) || 1;
    const f = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const int = (lo, hi) => lo + Math.floor(f() * (hi - lo + 1));
    const pick = arr => arr[Math.floor(f() * arr.length)];
    const shuffle = arr => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(f() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
    return { f, int, pick, shuffle, chance: p => f() < p };
  }
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const frac = (n, d) => `<span class="fr"><sup>${n}</sup>⁄<sub>${d}</sub></span>`;
  const fracT = (n, d) => `${n}/${d}`;                          // plain text, for the coach notes
  const money = c => "$" + (c % 100 ? (c / 100).toFixed(2) : String(c / 100));
  const clock = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mm = m % 60; return `${h % 12 === 0 ? 12 : h % 12}:${String(mm).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };
  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" font-size="14" fill="${INK}" ${o}>${s}</text>`;
  const svg = (w, h, inner, aria, cls = "") => `<div class="figure ${cls}"><svg viewBox="0 0 ${w} ${h}" width="${w}" role="img" aria-label="${aria}">${inner}</svg></div>`;
  const tbl = (head, rows, opt = {}) => `<div class="figure"><table class="grid">${head ? `<tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>` : ""}${rows.map((r, ri) => `<tr>${r.map((c, i) => (i === 0 || (opt.lastRow && ri === rows.length - 1)) ? `<th>${c}</th>` : `<td${c === "?" || c === "" ? ' class="gap"' : ""}>${c === "" ? "&nbsp;" : c}</td>`).join("")}</tr>`).join("")}</table></div>`;

  /* The core option picker. items = [{v, t, why}] (v: a number used to sort and compare, t: what is shown),
     most tempting first. Keeps the two most tempting traps, then chooses how many options sit below the
     correct one at random, so the answer letter spreads. Returns null if there aren't enough options. */
  function spread(R, correct, items, n) {
    const w = [];
    for (const x of items) if (Number.isFinite(x.v) && Math.abs(x.v - correct.v) > 1e-9 && x.t !== correct.t && !w.some(y => Math.abs(y.v - x.v) < 1e-9 || y.t === x.t)) w.push(x);
    const must = w.slice(0, 2), rest = w.slice(2);
    const below = rest.filter(x => x.v < correct.v), above = rest.filter(x => x.v > correct.v);
    const mLo = must.filter(x => x.v < correct.v), mHi = must.filter(x => x.v > correct.v);
    const tMin = Math.max(mLo.length, n - 1 - mHi.length - above.length), tMax = Math.min(n - 1 - mHi.length, mLo.length + below.length);
    if (tMax < tMin) return null;
    const t = R.int(tMin, tMax);
    const lo = [...mLo, ...below].slice(0, t), hi = [...mHi, ...above].slice(0, n - 1 - t);
    const all = [...lo, correct, ...hi].sort((a, b) => a.v - b.v), traps = {};
    all.forEach((x, i) => { if (x !== correct) traps[i] = x.why; });
    return { options: all.map(x => x.t), answer: all.indexOf(correct), traps };
  }
  /* Number options for maths (A–E). wrongs = [[value, "the mistake behind it"], ...], most tempting first.
     Near misses (a step either side) are added as spares so the correct answer can land on any letter. */
  function opts(R, correct, wrongs, fmt = String, n = 5, step = 1) {
    const items = [];
    for (const [v, why] of wrongs) if (Number.isFinite(v) && (!Number.isInteger(correct) || Number.isInteger(v)) && v > 0) items.push({ v, t: fmt(v), why });
    for (let k = 1; k <= 6; k++) for (const v of [correct + k * step, correct - k * step]) if (v > 0) items.push({ v, t: fmt(v), why: "a slip in the working (a near miss)" });
    return spread(R, { v: correct, t: fmt(correct) }, items, n);
  }
  /* Word or picture options (thinking A–D): items = [[html, why]], shuffled so the answer can be any letter. */
  function shuffleOpts(R, correct, wrongs) {
    const all = R.shuffle([[correct, null], ...wrongs]);
    const traps = {}; all.forEach((x, i) => { if (x[1]) traps[i] = x[1]; });
    return { options: all.map(x => x[0]), answer: all.findIndex(x => x[1] === null), traps };
  }
  /* a list of "why each trap is wrong" lines for an explanation */
  const whyNot = (o) => `<p class="why-not"><b>Why not the others?</b> ${Object.entries(o.traps).map(([i, t]) => `<b>${"ABCDE"[i]}</b> (${o.options[i].replace(/<[^>]*>/g, "")}): ${t}.`).join(" ")}</p>`;

  /* --- drawing helpers --- */
  /* a grid of squares with some shaded (cells = list of shaded indexes, row by row) */
  function gridSvg(rows, cols, shaded, size = 34, aria = "") {
    let g = "";
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const on = shaded.includes(r * cols + c);
      g += `<rect x="${6 + c * size}" y="${6 + r * size}" width="${size}" height="${size}" fill="${on ? "#7c8aa5" : "#fff"}" stroke="${INK}" stroke-width="2"/>`;
    }
    return svg(12 + cols * size, 12 + rows * size, g, aria || `a grid of ${rows * cols} squares with ${shaded.length} shaded`);
  }
  /* a circle cut into d equal slices with k shaded */
  function pieSvg(d, k) {
    let g = "";
    for (let i = 0; i < d; i++) {
      const a0 = -Math.PI / 2 + i * 2 * Math.PI / d, a1 = a0 + 2 * Math.PI / d, x0 = 80 + 70 * Math.cos(a0), y0 = 80 + 70 * Math.sin(a0), x1 = 80 + 70 * Math.cos(a1), y1 = 80 + 70 * Math.sin(a1);
      g += `<path d="M80 80L${x0.toFixed(1)} ${y0.toFixed(1)}A70 70 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z" fill="${i < k ? "#7c8aa5" : "#fff"}" stroke="${INK}" stroke-width="2"/>`;
    }
    return svg(160, 160, g, `a circle cut into ${d} equal slices with ${k} shaded`);
  }
  /* a row of counters, k of them dark */
  function countersSvg(n, k, perRow = 8) {
    let g = ""; const rows = Math.ceil(n / perRow);
    for (let i = 0; i < n; i++) g += `<circle cx="${24 + (i % perRow) * 36}" cy="${24 + Math.floor(i / perRow) * 36}" r="14" fill="${i < k ? "#7c8aa5" : "#fff"}" stroke="${INK}" stroke-width="2"/>`;
    return svg(12 + Math.min(n, perRow) * 36, 12 + rows * 36, g, `${n} counters, ${k} of them shaded`);
  }
  /* a column graph: values with gridlines every `step` up to `max` */
  function colGraph(labels, values, max, step, ylabel, colour = "#5c8dd6") {
    const gw = 56, W = 70 + labels.length * gw, y = v => 205 - v * (170 / max);
    let g = "";
    for (let v = 0; v <= max; v += step) g += `<line x1="50" x2="${W - 10}" y1="${y(v)}" y2="${y(v)}" stroke="#c5ccd8"/>` + T(42, y(v) + 5, v, 'text-anchor="end"');
    labels.forEach((n, i) => { const x0 = 64 + i * gw; g += `<rect x="${x0}" y="${y(values[i])}" width="34" height="${205 - y(values[i])}" fill="${colour}" stroke="${INK}" stroke-width="1.5"/>` + T(x0 + 17, 224, n, 'text-anchor="middle"'); });
    g += `<line x1="50" x2="50" y1="${y(max)}" y2="205" stroke="${INK}" stroke-width="2"/><line x1="50" x2="${W - 10}" y1="205" y2="205" stroke="${INK}" stroke-width="2"/>`;
    g += `<text x="14" y="120" font-size="13" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">${ylabel}</text>`;
    return svg(W, 236, g, `a column graph of ${ylabel}`);
  }
  /* a picture graph: rows = [[label, symbols]] (symbols may end in .5) */
  function pictGraph(rows, keyText) {
    const wide = Math.max(...rows.map(r => Math.ceil(r[1]))), W = 118 + wide * 32 + 10;
    const sym = (x, y, half) => half ? `<path d="M${x + 13} ${y + 2}a13 13 0 0 0 0 26z" fill="#e8a33d" stroke="${INK}" stroke-width="1.5"/>` : `<circle cx="${x + 13}" cy="${y + 15}" r="13" fill="#e8a33d" stroke="${INK}" stroke-width="1.5"/>`;
    let g = "";
    rows.forEach(([d, n], i) => {
      const y = 10 + i * 40;
      g += T(98, y + 21, d, 'text-anchor="end"') + `<line x1="106" x2="106" y1="${y - 5}" y2="${y + 35}" stroke="${INK}" stroke-width="2"/>`;
      for (let k = 0; k < Math.floor(n); k++) g += sym(114 + k * 32, y);
      if (n % 1) g += sym(114 + Math.floor(n) * 32, y, true);
    });
    const ky = 14 + rows.length * 40;
    g += sym(10, ky) + T(46, ky + 20, keyText);
    return svg(Math.max(W, 260), ky + 40, g, "a picture graph");
  }
  /* a straight scale (ruler, number line, thermometer laid flat): from a to b, `big` labelled marks,
     `small` equal spaces between labels, an arrow at value v */
  function scaleSvg(a, b, big, small, v, unit = "") {
    const W = 460, x0 = 30, x1 = 430, px = t => x0 + (t - a) / (b - a) * (x1 - x0);
    let g = `<line x1="${x0}" x2="${x1}" y1="60" y2="60" stroke="${INK}" stroke-width="2"/>`;
    const n = big * small;
    for (let i = 0; i <= n; i++) {
      const t = a + (b - a) * i / n, x = px(t), lab = i % small === 0;
      g += `<line x1="${x}" x2="${x}" y1="60" y2="${lab ? 76 : 69}" stroke="${INK}" stroke-width="${lab ? 2 : 1.4}"/>`;
      if (lab) g += T(x, 94, (Math.round(t * 100) / 100) + unit, 'text-anchor="middle"');
    }
    g += `<path d="M${px(v)} 56 l-7 -16 h14z" fill="#d9480f" stroke="${INK}"/>`;
    return svg(W, 104, g, `a scale from ${a} to ${b}${unit} with an arrow`);
  }
  /* a jug (container) drawn upright, labelled marks from 0 to top, water at v */
  function jugSvg(top, big, small, v, unit = "mL", labelAll = true) {
    const H = 200, y0 = 220, py = t => y0 - t / top * H;
    let g = `<path d="M60 20 v200 h100 v-200" fill="none" stroke="${INK}" stroke-width="3"/>`;
    g += `<rect x="61.5" y="${py(v)}" width="97" height="${y0 - py(v)}" fill="#9fd0f0"/>`;
    const n = big * small;
    for (let i = 0; i <= n; i++) {
      const t = top * i / n, y = py(t), lab = i % small === 0;
      g += `<line x1="160" x2="${lab ? 176 : 168}" y1="${y}" y2="${y}" stroke="${INK}" stroke-width="${lab ? 2 : 1.4}"/>`;
      if (lab && (labelAll || i === 0 || i === n)) g += T(182, y + 5, Math.round(t) + " " + unit);
    }
    return svg(260, 236, g, `a jug marked up to ${top} ${unit}`);
  }
  /* a plain shape drawn on a grid from a list of cells (for turns and flips) */
  function cellsSvg(cells, size = 18, colour = "#5c8dd6", dot = null) {
    const n = 4; let g = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) g += `<rect x="${4 + c * size}" y="${4 + r * size}" width="${size}" height="${size}" fill="#fff" stroke="#d3d9e3"/>`;
    for (const [r, c] of cells) g += `<rect x="${4 + c * size}" y="${4 + r * size}" width="${size}" height="${size}" fill="${colour}" stroke="${INK}" stroke-width="1.5"/>`;
    if (dot) g += `<circle cx="${4 + dot[1] * size + size / 2}" cy="${4 + dot[0] * size + size / 2}" r="${size / 4}" fill="#fff" stroke="${INK}"/>`;
    return `<svg viewBox="0 0 ${8 + n * size} ${8 + n * size}" width="${8 + n * size}" role="img" aria-label="a shape on a grid">${g}</svg>`;
  }
  const NAMES = ["Ava", "Ben", "Cleo", "Dev", "Esha", "Finn", "Gia", "Hugo", "Isla", "Jai", "Kira", "Leo", "Mila", "Noah", "Omar", "Pia", "Remy", "Suki", "Theo", "Uma", "Vera", "Will", "Yusuf", "Zoe"];
  /* a template: gen(id, track, rung, fn(R) -> {stem, options, answer, traps, explain, data, form}) */
  const gen = (id, track, rung, fn) => GENS.push({ id, track, rung, make: seed => { const q = fn(R(seed)); return q && q.options && q.answer >= 0 ? Object.assign({ id: id + "#" + seed, gen: id, track, rung, seed }, q) : null; } });
  return { R, gcd, frac, fracT, money, clock, T, svg, tbl, spread, opts, shuffleOpts, whyNot, gridSvg, pieSvg, countersSvg, colGraph, pictGraph, scaleSvg, jugSvg, cellsSvg, NAMES, gen };
})();
