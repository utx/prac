/* ---------------------------------------------------------------
   STORM ISLAND: shared drawing and option helpers for the question files.
   Loaded first (the files are joined in name order by tools/build_game3.py).
   --------------------------------------------------------------- */
const LIB = (() => {
  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" font-size="15" fill="${INK}" ${o}>${s}</text>`;
  const fig = (svg) => `<div class="figure">${svg}</div>`;
  const tbl = (head, rows, fill = []) => `<div class="figure"><table class="grid"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map((r, ri) => `<tr>${r.map((c, i) => i ? `<td${fill.some(f => f[0] === ri && f[1] === i) ? ' class="fill"' : ""}>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</table></div>`;
  const money = c => "$" + (c / 100).toFixed(2);
  const clock = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mm = m % 60; return `${h % 12 === 0 ? 12 : h % 12}:${String(mm).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };
  const dur = m => m < 60 ? `${m} minutes` : `${Math.floor(m / 60)} h ${m % 60 ? (m % 60) + " min" : ""}`.trim();
  const frac = (n, d) => `<sup>${n}</sup>⁄<sub>${d}</sub>`;

  /* a column graph: series = [{name, color, values}], gridlines every `step` up to `max` */
  function colGraph({ labels, series, max, step, ylabel, numbers = true, aria }) {
    const gw = series.length * 26 + 30, W = 70 + labels.length * gw, y = v => 205 - v * (170 / max);
    let g = "";
    for (let v = 0; v <= max; v += step) g += `<line x1="50" x2="${W - 10}" y1="${y(v)}" y2="${y(v)}" stroke="#c5ccd8" stroke-width="1"/>` + (numbers ? T(42, y(v) + 5, v, 'text-anchor="end"') : "");
    labels.forEach((n, i) => {
      const x0 = 66 + i * gw;
      series.forEach((s, k) => { g += `<rect x="${x0 + k * 26}" y="${y(s.values[i])}" width="24" height="${205 - y(s.values[i])}" fill="${s.color}" stroke="${INK}" stroke-width="1.5"/>`; });
      g += T(x0 + series.length * 13, 224, n, 'text-anchor="middle"');
    });
    g += `<line x1="50" x2="50" y1="${y(max)}" y2="205" stroke="${INK}" stroke-width="2"/><line x1="50" x2="${W - 10}" y1="205" y2="205" stroke="${INK}" stroke-width="2"/>`;
    g += `<text x="14" y="120" font-size="13" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">${ylabel}</text>`;
    if (series.length > 1) series.forEach((s, k) => { g += `<rect x="${60 + k * 110}" y="236" width="14" height="12" fill="${s.color}" stroke="${INK}"/>` + T(80 + k * 110, 247, s.name); });
    return fig(`<svg viewBox="0 0 ${W} ${series.length > 1 ? 256 : 238}" width="${W}" role="img" aria-label="${aria}">${g}</svg>`);
  }
  /* a picture graph: rows = [[label, symbols]] where symbols may end in .5; keyText is "" for a missing key */
  function pictGraph({ rows, keyText, color, aria }) {
    const sym = (x, y, half) => half ? `<path d="M${x + 13} ${y + 2}a13 13 0 0 0 0 26z" fill="${color}" stroke="${INK}" stroke-width="1.5"/>` : `<circle cx="${x + 13}" cy="${y + 15}" r="13" fill="${color}" stroke="${INK}" stroke-width="1.5"/>`;
    const wide = Math.max(...rows.map(r => Math.ceil(r[1]))), W = 118 + wide * 32 + 10;
    let g = "";
    rows.forEach(([d, n], i) => {
      const y = 10 + i * 40;
      g += T(98, y + 21, d, 'text-anchor="end"') + `<line x1="106" x2="106" y1="${y - 5}" y2="${y + 35}" stroke="${INK}" stroke-width="2"/>`;
      for (let k = 0; k < Math.floor(n); k++) g += sym(114 + k * 32, y);
      if (n % 1) g += sym(114 + Math.floor(n) * 32, y, true);
    });
    const ky = 14 + rows.length * 40;
    if (keyText) g += sym(114, ky) + T(148, ky + 21, "= " + keyText);
    return fig(`<svg viewBox="0 0 ${Math.max(W, 290)} ${ky + (keyText ? 36 : 0)}" width="${Math.max(W, 290)}" role="img" aria-label="${aria}">${g}</svg>`);
  }
  /* a dot plot of counts for the values first..first+n-1 */
  function dotPlot({ counts, first = 0, label, aria }) {
    const W = 60 + counts.length * 40, top = Math.max(...counts), base = 30 + top * 22;
    let g = `<line x1="20" x2="${W - 10}" y1="${base}" y2="${base}" stroke="${INK}" stroke-width="2"/>`;
    counts.forEach((c, v) => {
      const x = 45 + v * 40;
      g += `<line x1="${x}" x2="${x}" y1="${base}" y2="${base + 6}" stroke="${INK}" stroke-width="2"/>` + T(x, base + 22, first + v, 'text-anchor="middle"');
      for (let k = 0; k < c; k++) g += `<circle cx="${x}" cy="${base - 12 - k * 22}" r="8" fill="#ff8a65" stroke="${INK}" stroke-width="1.5"/>`;
    });
    g += T(W / 2, base + 42, label, 'text-anchor="middle"');
    return fig(`<svg viewBox="0 0 ${W} ${base + 50}" width="${W}" role="img" aria-label="${aria}">${g}</svg>`);
  }
  /* an upright container with a scale: labels every `major` up to `max`, `minor` small steps between labels, liquid at `level` */
  function jugSvg({ x = 0, max, major, minor, level, unit, color = "#f6c453", title = "" }) {
    const y = v => 240 - v * (200 / max), small = major / minor;
    let g = `<path d="M${x + 40} 30 L${x + 40} 242 Q${x + 40} 250 ${x + 48} 250 L${x + 132} 250 Q${x + 140} 250 ${x + 140} 242 L${x + 140} 30" fill="none" stroke="${INK}" stroke-width="3"/>`;
    g += `<rect x="${x + 42}" y="${y(level)}" width="96" height="${248 - y(level)}" fill="${color}" opacity=".75"/>`;
    for (let i = 0; i <= max / small + 1e-9; i++) {
      const v = i * small, big = i % minor === 0;
      g += `<line x1="${x + 40}" x2="${x + (big ? 66 : 54)}" y1="${y(v)}" y2="${y(v)}" stroke="${INK}" stroke-width="2"/>`;
      if (big && v) g += T(x + 71, y(v) + 5, v + (unit ? " " + unit : ""), 'font-size="13"');
    }
    if (title) g += T(x + 90, 18, title, 'text-anchor="middle" font-weight="700"');
    return g;
  }
  const jugAria = ({ max, major, minor, level, unit, title = "A container" }) => `${title}: the scale is labelled every ${major} ${unit} up to ${max} ${unit}, with ${minor - 1} small unlabelled mark${minor - 1 === 1 ? "" : "s"} between each pair of labels. The liquid reaches ${level % major === 0 ? "the " + level + " " + unit + " label" : "small mark number " + ((level % major) / (major / minor)) + " above the " + (level - level % major) + " " + unit + " label"}.`;

  /* random helpers on top of a seeded random-number function */
  const R = r => ({
    int: (a, b) => a + Math.floor(r() * (b - a + 1)),
    pick: a => a[Math.floor(r() * a.length)],
    shuffle: a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    chance: p => r() < p,
  });
  /* Number options in order of size. `wrongs` are the values real mistakes give, most tempting first: the first two are
     always used. The correct value is then steered to a random letter by choosing how many options sit below and above it,
     topping up with near misses (a `step` out) where there are not enough real mistakes on that side. */
  function opts(R, correct, wrongs, fmt = String, n = 5, step = 1) {
    const w = []; for (const x of wrongs) if (Number.isFinite(x) && x > 0 && x !== correct && !w.includes(x)) w.push(x);
    const must = w.slice(0, 2), room = Math.floor((correct - 1e-9) / step);            // how many near misses fit below
    const lo = w.filter(x => x < correct), hi = w.filter(x => x > correct);
    const tMin = must.filter(x => x < correct).length, tMax = Math.min(n - 1 - must.filter(x => x > correct).length, lo.length + room);
    const t = tMax >= tMin ? R.int(tMin, tMax) : tMin;
    const take = (list, need, dir) => { const out = list.slice(0, need); for (let k = 1; out.length < need && k < 60; k++) { const c = correct + dir * k * step; if (c > 0 && !out.includes(c) && !w.includes(c)) out.push(c); } return out; };
    const below = take(lo, t, -1), above = take(hi, n - 1 - below.length, 1);
    const vals = [...below, correct, ...above].sort((a, b) => a - b);
    return { options: vals.map(fmt), answer: vals.indexOf(correct) };
  }
  const gen = (id, kind, tier, cat, fn) => GENS.push({ id, kind, tier, cat, make: r => fn(R(r)) });
  const NAMES = ["Ava", "Ben", "Cleo", "Dev", "Esha", "Finn", "Gia", "Hugo", "Isla", "Jai", "Kira", "Leo", "Mila", "Noah", "Omar", "Pia", "Remy", "Suki", "Theo", "Uma", "Vera", "Will", "Yusuf", "Zoe"];
  return { T, fig, tbl, money, clock, dur, frac, colGraph, pictGraph, dotPlot, jugSvg, jugAria, R, opts, gen, NAMES };
})();
