/* ---------------------------------------------------------------
   RIDGE RUNNER: maths templates (A–E). Each redraws itself with new numbers and a new context
   from a seed. gen(id, track, rung, fn). `data` holds the numbers so tools/check_game4.js can
   work the answer out again by its own method. Wrong options come from real mistakes, most tempting first.
   --------------------------------------------------------------- */
(() => {
const { gen, opts, spread, frac, fracT, money, clock, gcd, whyNot, gridSvg, pieSvg, countersSvg, colGraph, pictGraph, scaleSvg, jugSvg, tbl, svg, T, NAMES } = LIB;
const M = (track) => TRACKS.find(t => t.id === track).method;
const ex = (track, body, o) => `<p class="method"><b>Method:</b> ${M(track)}</p>${body}${whyNot(o)}`;
const fr = v => { /* a value written as n/d (from a [n,d] pair stored on the value) */ return v; };

/* ---------- Fractions of a whole ---------- */
/* fraction options: items [[n, d, why]]; deduped by value, sorted small to large */
function fracOpts(R, cn, cd, wrongs) {
  const items = wrongs.filter(w => w[0] > 0 && w[1] > 0).map(([n, d, why]) => ({ v: n / d, t: frac(n, d), why }));
  for (const [n, d] of [[cn + 1, cd], [cn - 1, cd], [cn, cd + 1], [cn, cd - 1], [cn + 2, cd], [cn - 2, cd], [cn, cd + 2]]) if (n > 0 && d > 1 && n !== d) items.push({ v: n / d, t: frac(n, d), why: "miscounted the parts" });
  return spread(R, { v: cn / cd, t: frac(cn, cd) }, items, 5);
}
gen("m-frac-1", "frac", 1, R => {
  const form = R.pick(["grid", "pie", "set"]);
  let n, rows = 0, cols = 0;
  if (form === "grid") { [rows, cols] = R.pick([[2, 4], [2, 6], [3, 4], [2, 5], [3, 6], [4, 4], [2, 8], [3, 5]]); n = rows * cols; }
  else if (form === "pie") n = R.pick([6, 8, 10, 12]);
  else n = R.pick([6, 8, 9, 10, 12, 15, 16]);
  let k; do { k = R.int(2, n - 2); } while (gcd(k, n) < 2 || 2 * k === n);
  const g = gcd(k, n), sn = k / g, sd = n / g;
  const cells = R.shuffle([...Array(n).keys()]).slice(0, k);
  const pic = form === "grid" ? gridSvg(rows, cols, cells) : form === "pie" ? pieSvg(n, k) : countersSvg(n, k, n > 10 ? 8 : n);
  const what = form === "grid" ? "of the shape is shaded" : form === "pie" ? "of the circle is shaded" : "of the counters are shaded";
  const o = fracOpts(R, sn, sd, [[k, n - k, "compared the shaded part with the unshaded part instead of with the whole"], [n - k, n, "gave the unshaded part"], [sn, n, "simplified only the top number"], [k, sd, "simplified only the bottom number"]]);
  return { form, stem: `${form === "set" ? `Here are ${n} counters.` : `The ${form === "grid" ? "shape" : "circle"} below is cut into ${n} equal parts.`}${pic}<p>What fraction ${what}? Give the simplest name.</p>`,
    ...o, data: { n, k },
    explain: ex("frac", `<p>${k} of the ${n} equal parts are shaded, so the fraction is ${frac(k, n)}. Both numbers can be divided by ${g}: ${k} ÷ ${g} = ${sn} and ${n} ÷ ${g} = ${sd}, so the simplest name is <b>${frac(sn, sd)}</b>.</p>`, o) };
});
gen("m-frac-2", "frac", 2, R => {
  const d = R.pick([3, 4, 5, 6, 8, 10]); let n; do { n = R.int(2, d - 1); } while (gcd(n, d) !== 1);
  const ctx = R.pick(["marbles", "money", "minutes", "ribbon", "class"]);
  let total, unitTxt, say, fmt = String, q;
  if (ctx === "marbles") { total = d * R.int(3, 9); q = `A jar holds ${total} marbles. ${frac(n, d)} of them are blue. How many marbles are blue?`; }
  else if (ctx === "money") { total = d * R.int(2, 12) * 5; fmt = v => "$" + v; q = `${R.pick(NAMES)} had $${total}. She spent ${frac(n, d)} of it on a new game. How much did the game cost?`; }
  else if (ctx === "minutes") { const opt = [60, 90, 120].filter(t => t % d === 0); total = R.pick(opt.length ? opt : [60 * d]); fmt = v => v + " minutes"; q = `A film lasts ${total} minutes. ${R.pick(NAMES)} has watched ${frac(n, d)} of it. How many minutes has he watched?`; }
  else if (ctx === "ribbon") { const opt = [100, 200, 300, 400].filter(t => t % d === 0); total = R.pick(opt.length ? opt : [100 * d]); fmt = v => v + " cm"; q = `A ribbon is ${total / 100} m long. ${frac(n, d)} of it is cut off. How many centimetres are cut off?`; }
  else { total = d * R.int(4, 8); q = `There are ${total} children in a class. ${frac(n, d)} of them walk to school. How many children walk to school?`; }
  const unit = total / d, correct = unit * n;
  const o = opts(R, correct, [[unit, `found one part (${total} ÷ ${d}) but forgot to multiply by ${n}`], [total - correct, "found the part that is NOT asked for (what is left)"], [total - unit, "took one part away from the whole"], [total / n, `divided by the top number ${n}`]], fmt, 5, Math.max(1, unit));
  return { form: ctx, stem: `<p>${q}</p>${ctx === "ribbon" ? "<p class=\"note\">1 m = 100 cm</p>" : ""}`, ...o, data: { total, n, d },
    explain: ex("frac", `<p>One part: ${total} ÷ ${d} = ${unit}. ${n} parts: ${unit} × ${n} = <b>${fmt(correct)}</b>.</p>`, o) };
});
gen("m-frac-3", "frac", 3, R => {
  const ctx = R.pick(["grid", "grid", "class", "tray"]);
  let n, rows, cols;
  const pickFrac = n => { const fs = []; for (const b of [2, 3, 4, 5, 6, 8]) if (n % b === 0) for (let a = 1; a < b; a++) if (gcd(a, b) === 1) fs.push([a, b]); return R.pick(fs); };
  if (ctx === "grid") { [rows, cols] = R.pick([[2, 6], [3, 4], [2, 8], [3, 6], [4, 4], [2, 10], [4, 5]]); n = rows * cols; }
  else n = ctx === "class" ? R.pick([24, 28, 30, 32]) : R.pick([12, 16, 20, 24]);
  let a, b, target; do { [a, b] = pickFrac(n); target = n / b * a; } while (target < 3 || target === n);
  const fewer = ctx === "grid" && R.chance(0.3);
  let sh = fewer ? R.int(target + 1, Math.min(n - 1, target + 6)) : R.int(1, Math.max(1, target - 2));
  if (sh === target) sh = Math.max(1, target - 1);
  const s = sh, real = fewer ? s - target : target - s;
  let stem;
  if (ctx === "grid") stem = `<p>The shape below is made of ${n} equal squares.</p>${gridSvg(rows, cols, [...Array(s).keys()], 30)}<p>How many ${fewer ? "shaded squares must be rubbed out (made white)" : "<b>more</b> squares must be shaded"} so that exactly ${frac(a, b)} of the shape is shaded?</p>`;
  else if (ctx === "class") stem = `<p>There are ${n} children in a class. ${s} of them have finished their project.</p><p>How many <b>more</b> children must finish so that ${frac(a, b)} of the class has finished?</p>`;
  else stem = `<p>A tray holds ${n} cupcakes. ${s} of them have been iced.</p><p>How many <b>more</b> cupcakes must be iced so that ${frac(a, b)} of the tray is iced?</p>`;
  const o = opts(R, real, [[target, `gave the target (${frac(a, b)} of ${n} = ${target}) and forgot those already ${ctx === "grid" ? "shaded" : "done"}`], [a, `used the top number ${a} as the answer`], [n - target, "found how many are NOT in the fraction"], [n / b, `found one part (${n} ÷ ${b}) only`], [fewer ? n - s : 0, "counted the white squares"]], String, 5);
  return { form: ctx + (fewer ? "-fewer" : ""), stem, ...o, data: { n, a, b, s, fewer },
    explain: ex("frac", `<p>Target: ${n} ÷ ${b} × ${a} = ${target}. ${s} ${s === 1 ? "is" : "are"} already ${ctx === "grid" ? "shaded" : "done"}, so ${fewer ? `${s} − ${target}` : `${target} − ${s}`} = <b>${real}</b>.</p>`, o) };
});
gen("m-frac-4", "frac", 4, R => {
  const form = R.pick(["whole", "rest", "grow"]);
  if (form === "whole") {
    const b1 = R.pick([2, 3, 4]), k = R.int(2, 6), whole = k * b1;
    const fs = []; for (const b of [2, 3, 4, 6]) if (whole % b === 0) for (let a = 1; a < b; a++) if (gcd(a, b) === 1 && whole / b * a > k) fs.push([a, b]);
    if (!fs.length) return null;
    const [a, b] = R.pick(fs), target = whole / b * a, correct = target - k, name = R.pick(NAMES);
    const o = opts(R, correct, [[target, "gave the target and forgot the squares already shaded"], [whole, "gave the whole shape"], [whole - target, "found how many stay white"], [k * a, `multiplied the shaded squares by ${a}`]]);
    return { form, stem: `<p>${name} has shaded ${k} squares of a shape made of equal squares. These ${k} squares are ${frac(1, b1)} of the shape.</p><p>How many <b>more</b> squares must ${name} shade so that ${frac(a, b)} of the shape is shaded?</p>`, ...o, data: { form, k, b1, a, b },
      explain: ex("frac", `<p>The whole is hidden. ${k} squares are ${frac(1, b1)}, so the whole shape is ${k} × ${b1} = ${whole} squares. Target: ${whole} ÷ ${b} × ${a} = ${target}. Already shaded: ${k}. ${target} − ${k} = <b>${correct}</b>.</p>`, o) };
  }
  if (form === "rest") {
    const p = R.pick([3, 4, 5]), q = R.pick([2, 3, 4]), T0 = p * q * R.int(2, 6) * (R.chance(.5) ? 1 : 2), name = R.pick(NAMES);
    const first = T0 / p, rest = T0 - first, second = rest / q, left = rest - second;
    const o = opts(R, left, [[T0 - first - T0 / q, `took ${frac(1, q)} of the WHOLE amount, not of what was left`], [rest, "stopped after the first step"], [second, "gave the second amount spent, not what was left"], [first, "gave the first amount spent"]], v => "$" + v);
    return { form, stem: `<p>${name} had $${T0}. She spent ${frac(1, p)} of her money on a book. Then she spent ${frac(1, q)} of the money she had <b>left</b> on lunch.</p><p>How much money does she have now?</p>`, ...o, data: { form, T0, p, q },
      explain: ex("frac", `<p>Book: ${frac(1, p)} of $${T0} = $${first}. Left: $${T0} − $${first} = $${rest}. The second fraction is of what is LEFT: ${frac(1, q)} of $${rest} = $${second}. Now: $${rest} − $${second} = <b>$${left}</b>.</p>`, o) };
  }
  const [rows, cols] = R.pick([[2, 4], [2, 5], [3, 4], [2, 6]]), n = rows * cols;
  const add = R.pick([2, 4, 6]), nw = n + add, b = R.pick([2, 4].filter(x => nw % x === 0).concat(nw % 3 === 0 ? [3] : [])), a = b === 4 ? R.pick([1, 3]) : b === 3 ? R.pick([1, 2]) : 1;
  const target = nw / b * a, s = R.int(1, Math.max(1, Math.min(target - 1, n - 1)));
  if (target - s <= 0) return null;
  const correct = target - s, old = n / b * a;
  const o = opts(R, correct, [[Number.isInteger(old) ? old - s : 0, "used the old shape (before the squares were added)"], [target, "gave the target and forgot the squares already shaded"], [nw - target, "found how many stay white"], [add, "gave the number of squares added"]]);
  return { form, stem: `<p>This shape is made of ${n} equal squares. ${s} ${s === 1 ? "is" : "are"} shaded.</p>${gridSvg(rows, cols, [...Array(s).keys()], 30)}<p>${add} more white squares of the same size are added to the shape. How many <b>more</b> squares must now be shaded so that exactly ${frac(a, b)} of the new shape is shaded?</p>`, ...o, data: { form, n, add, s, a, b },
    explain: ex("frac", `<p>The whole changed: ${n} + ${add} = ${nw} squares. Target: ${nw} ÷ ${b} × ${a} = ${target}. Already shaded: ${s}. ${target} − ${s} = <b>${correct}</b>.</p>`, o) };
});

/* ---------- Graphs, tables and totals ---------- */
gen("m-data-1", "data", 1, R => {
  if (R.chance(0.55)) {
    const s = R.pick([2, 5, 10]), max = s * 10, labels = R.pick([["Mon", "Tue", "Wed", "Thu", "Fri"], ["Ari", "Bo", "Cy", "Di", "Ed"], ["Red", "Blue", "Green", "Gold", "Pink"]]);
    const thing = R.pick(["books borrowed", "laps swum", "cans collected", "tickets sold"]);
    const vals = labels.map(() => s * R.int(1, 10));
    const i = R.int(0, 4), j = (i + R.int(1, 4)) % 5;
    vals[i] = s * R.int(4, 10); vals[j] = s * R.int(1, vals[i] / s - 2);
    const d = vals[i] - vals[j];
    const o = opts(R, d, [[d / s, `counted each gridline as 1 instead of ${s}`], [vals[i], `gave ${labels[i]}'s amount, not the difference`], [vals[i] + vals[j], "added the two bars instead of finding the difference"], [vals[j], `gave ${labels[j]}'s amount`]], String, 5, s);
    return { form: "column", stem: `<p>The graph shows the number of ${thing}.</p>${colGraph(labels, vals, max, s, thing)}<p>How many more ${thing} for <b>${labels[i]}</b> than for <b>${labels[j]}</b>?</p>`, ...o, data: { form: "column", vals, i, j },
      explain: `<p class="method"><b>Method:</b> Read the scale first: what is each gridline worth?</p><p>The gridlines go up in ${s}s. ${labels[i]}: ${vals[i]}. ${labels[j]}: ${vals[j]}. ${vals[i]} − ${vals[j]} = <b>${d}</b>.</p>${whyNot(o)}` };
  }
  const k = R.pick([2, 4, 6, 10]), names = R.pick([["Apples", "Pears", "Plums", "Figs"], ["Kites", "Yo-yos", "Balls", "Dolls"], ["Lions", "Bears", "Seals", "Owls"]]);
  const rows = names.map(nm => [nm, R.int(2, 12) / 2]);
  const i = R.int(0, 3), j = (i + R.int(1, 3)) % 4;
  if (rows[i][1] % 1 + rows[j][1] % 1 === 0) rows[i][1] += 0.5;
  const tot = (rows[i][1] + rows[j][1]) * k, sym = rows[i][1] + rows[j][1];
  const o = opts(R, tot, [[sym, "counted the symbols instead of using the key"], [Math.ceil(rows[i][1]) * k + Math.ceil(rows[j][1]) * k, "counted a half symbol as a whole one"], [rows[i][1] * k, `gave only ${names[i]}`], [(rows[i][1] + rows[j][1]) * k / 2, "used half the key for every symbol"]], String, 5, k / 2);
  return { form: "picture", stem: `<p>The picture graph shows how many were sold at a stall.</p>${pictGraph(rows, `= ${k} sold`)}<p>How many <b>${names[i]}</b> and <b>${names[j]}</b> were sold altogether?</p>`, ...o, data: { form: "picture", k, a: rows[i][1], b: rows[j][1] },
    explain: `<p class="method"><b>Method:</b> Read the key first: what is one symbol worth, and half a symbol?</p><p>One symbol = ${k}, so half a symbol = ${k / 2}. ${names[i]}: ${rows[i][1]} × ${k} = ${rows[i][1] * k}. ${names[j]}: ${rows[j][1]} × ${k} = ${rows[j][1] * k}. Total: <b>${tot}</b>.</p>${whyNot(o)}` };
});
const CTX = [["books read", ["Mia", "Tom", "Lily"], ["Term 1", "Term 2", "Term 3"], 2, 14],
  ["dollars raised at a stall", ["Cakes", "Drinks", "Toys"], ["Fri", "Sat", "Sun"], 5, 40],
  ["pets in each class", ["4A", "4B", "4C"], ["Dogs", "Cats", "Fish"], 1, 12],
  ["fruit sold", ["Apples", "Bananas", "Kiwis"], ["Mon", "Tue", "Wed"], 3, 25],
  ["goals scored", ["Hawks", "Owls", "Kites"], ["Game 1", "Game 2", "Game 3"], 1, 9]];
const fillTable = (rows, cols, v, show) => rows.map((r, ri) => [r, ...cols.map((c, ci) => show(ri, ci) ? v[ri][ci] : ""), v[ri].reduce((a, b) => a + b, 0)]);
gen("m-data-2", "data", 2, R => {
  const [thing, rows, cols, lo, hi] = R.pick(CTX);
  const v = rows.map(() => cols.map(() => R.int(lo, hi)));
  const asked = R.int(0, 2), gaps = [R.int(0, 2), R.int(0, 2), R.int(0, 2)];
  const rStar = R.int(0, 2); gaps[rStar] = asked;
  for (let r = 0; r < 3; r++) if (r !== rStar && gaps[r] === asked) gaps[r] = (asked + 1 + R.int(0, 1)) % 3;
  const rowT = v.map(r => r.reduce((a, b) => a + b, 0)), colT = [0, 1, 2].map(c => v.reduce((a, r) => a + r[c], 0));
  const body = fillTable(rows, cols, v, (ri, ci) => gaps[ri] !== ci);
  body.push(["Total", ...colT.map((t, c) => c === asked ? "?" : t), rowT.reduce((a, b) => a + b, 0)]);
  const g = v[rStar][asked], knownC = colT[asked] - g, knownRow = rowT[rStar] - g;
  const other = [0, 1, 2].find(r => r !== rStar);
  const o = opts(R, colT[asked], [[knownC, "left the gap out and added only the numbers shown"], [knownC + rowT[rStar] + knownRow, "added the row total to the numbers instead of taking them away"], [g, "answered with the missing number, not the column total"], [knownC + v[other][gaps[other]], "took the missing number from the wrong row"]]);
  const done = rows.map((r, ri) => [r, ...cols.map((c, ci) => ri === rStar && ci === asked ? `<b>①&nbsp;${v[ri][ci]}</b>` : v[ri][ci]), rowT[ri]]);
  return { form: thing, stem: `<p>The table shows ${thing}. Some numbers are missing.</p>${tbl(["", ...cols, "Total"], body, { lastRow: true })}<p>What is the total for <b>${cols[asked]}</b>?</p>`, ...o, data: { v, gaps, asked },
    explain: ex("data", `<p>${cols[asked]} has one gap, in the ${rows[rStar]} row. That row has only one number missing: ${rowT[rStar]} − ${knownRow} = <b>① ${g}</b>.</p>${tbl(["", ...cols, "Total"], done)}<p>${cols[asked]}: ${v.map(r => r[asked]).join(" + ")} = <b>${colT[asked]}</b>. Check: the row totals (${rowT.join(" + ")}) and the column totals (${colT.join(" + ")}) both make the same grand total, ${rowT.reduce((a, b) => a + b, 0)}.</p>`, o) };
});
gen("m-data-3", "data", 3, R => {
  if (R.chance(0.6)) {
    const [thing, rows, cols, lo, hi] = R.pick(CTX);
    const v = rows.map(() => cols.map(() => R.int(lo, hi)));
    const rA = R.int(0, 2), cA = R.int(0, 2), cB = (cA + 1 + R.int(0, 1)) % 3;
    const rowT = v.map(r => r.reduce((a, b) => a + b, 0)), colT = [0, 1, 2].map(c => v.reduce((a, r) => a + r[c], 0));
    const hide = (ri, ci) => ri === rA && (ci === cA || ci === cB);
    const body = fillTable(rows, cols, v, (ri, ci) => !hide(ri, ci));
    body.push(["Total", ...colT.map((t, c) => c === cB ? "" : t), ""]);
    const A = v[rA][cA], B = v[rA][cB], restRow = rowT[rA] - A - B;
    const o = opts(R, B, [[A, "answered with the first number found (stopped one step early)"], [A + B, "found the two missing numbers together and stopped"], [rowT[rA] + restRow - A, "added the known number instead of taking it away"], [colT[cA] - A, "took the column total from the wrong column"]]);
    const done = rows.map((r, ri) => [r, ...cols.map((c, ci) => ri === rA && ci === cA ? `<b>①&nbsp;${v[ri][ci]}</b>` : ri === rA && ci === cB ? `<b>②&nbsp;${v[ri][ci]}</b>` : v[ri][ci]), rowT[ri]]);
    return { form: "chain " + thing, stem: `<p>The table shows ${thing}. Some numbers are missing.</p>${tbl(["", ...cols, "Total"], body, { lastRow: true })}<p>What number belongs in the <b>${rows[rA]}</b> row under <b>${cols[cB]}</b>?</p>`, ...o, data: { form: "chain", v, rA, cA, cB },
      explain: ex("data", `<p>The ${rows[rA]} row has two gaps, so start somewhere else. The ${cols[cA]} column has only one: ${colT[cA]} − ${colT[cA] - A} = <b>① ${A}</b>. Now the ${rows[rA]} row has only one gap: ${rowT[rA]} − ${A} − ${restRow} = <b>② ${B}</b>.</p>${tbl(["", ...cols, "Total"], done)}`, o) };
  }
  const k = R.pick([3, 4, 5, 6]), names = R.pick([["Kai", "Rosa", "Ned", "Jo"], ["Oak", "Pine", "Gum", "Elm"]]), what = names[0] === "Kai" ? "shells collected" : "trees planted";
  const rows = names.map(nm => [nm, R.int(2, 7)]);
  const total = rows.reduce((a, r) => a + r[1], 0) * k, i = R.int(0, 3);
  const o = opts(R, rows[i][1] * k, [[rows[i][1], "counted the symbols and forgot to find the key"], [total / rows.length, "shared the total out equally"], [k, "gave the key (one symbol) instead"], [rows[i][1] * (k + 1), "used the wrong key"]]);
  return { form: "missing key", stem: `<p>The picture graph shows ${what}. The key is missing. Altogether ${total} were ${what.split(" ")[1]}.</p>${pictGraph(rows, "= ?")}<p>How many did <b>${names[i]}</b> ${what.includes("shells") ? "collect" : "plant"}?</p>`, ...o, data: { form: "key", syms: rows.map(r => r[1]), total, i },
    explain: `<p class="method"><b>Method:</b> Work out the key first: total ÷ number of symbols.</p><p>There are ${rows.reduce((a, r) => a + r[1], 0)} symbols for ${total}, so one symbol = ${total} ÷ ${rows.reduce((a, r) => a + r[1], 0)} = ${k}. ${names[i]}: ${rows[i][1]} × ${k} = <b>${rows[i][1] * k}</b>.</p>${whyNot(o)}` };
});
gen("m-data-4", "data", 4, R => {
  const s = R.pick([2, 5, 10]), labels = ["Ana", "Ben", "Caz", "Dom", "Eli"], vals = labels.map(() => s * R.int(1, 9));
  const thing = R.pick(["points scored", "pages read", "stickers"]);
  const st = [], trueSet = [];
  const add = (txt, ok) => { st.push(txt); trueSet.push(ok); };
  const want = () => R.chance(0.5);
  /* 1. double */
  { const w = want(), j = vals.findIndex(v => v <= 4 * s) >= 0 ? R.pick(vals.map((v, k) => v <= 4 * s ? k : -1).filter(k => k >= 0)) : 0, i = (j + R.int(1, 4)) % 5;
    vals[i] = w ? 2 * vals[j] : 2 * vals[j] + R.pick([-s, s]);
    if (vals[i] <= 0) vals[i] = 2 * vals[j] + s;
    add(`${labels[i]} has twice as many as ${labels[j]}.`, vals[i] === 2 * vals[j]); }
  /* 2. together more than */
  { let i, j, k; do { i = R.int(0, 4); j = R.int(0, 4); k = R.int(0, 4); } while (new Set([i, j, k]).size < 3); add(`${labels[i]} and ${labels[j]} together have more than ${labels[k]}.`, vals[i] + vals[j] > vals[k]); }
  /* 3. difference between most and least */
  { const d = Math.max(...vals) - Math.min(...vals), shown = want() ? d : d + R.pick([-s, s]); add(`The difference between the most and the fewest is ${shown}.`, shown === d); }
  /* 4. total */
  { const t = vals.reduce((a, b) => a + b, 0), shown = want() ? t : t + R.pick([-s, s]); add(`Altogether there are ${shown} ${thing}.`, shown === t); }
  const n = trueSet.filter(Boolean).length;
  const names = ["None of them", "1", "2", "3", "All 4"];
  const traps = {}; for (let c = 0; c <= 4; c++) if (c !== n) traps[c] = c < n ? "missed a statement that is true: check each one on its own" : "counted a statement that is almost right as true";
  const o = { options: names, answer: n, traps };
  return { form: "statements", stem: `<p>The graph shows the ${thing} of five friends.</p>${colGraph(labels, vals, s * 10, s, thing)}<ol class="sts">${st.map(x => `<li>${x}</li>`).join("")}</ol><p>How many of these statements are correct?</p>`, ...o, data: { vals, st, trueSet },
    explain: `<p class="method"><b>Method:</b> Read every bar first (the gridlines go up in ${s}s), then check each statement on its own.</p><p>${labels.map((l, i) => `${l} ${vals[i]}`).join(", ")}.</p><ol class="sts">${st.map((x, i) => `<li>${x} <b>${trueSet[i] ? "✓ correct" : "✗ not correct"}</b></li>`).join("")}</ol><p>So <b>${names[n]}</b> ${n === 1 ? "is" : "are"} correct.</p>${whyNot(o)}` };
});

/* ---------- Time and timetables ---------- */
gen("m-time-1", "time", 1, R => {
  if (R.chance(0.55)) {
    const h1 = R.int(7, 10), m1 = R.pick([35, 40, 45, 50, 55]), h2 = h1 + R.int(1, 2), m2 = R.pick([5, 10, 15, 20, 25].filter(m => m < m1));
    const a = h1 * 60 + m1, b = h2 * 60 + m2, d = b - a;
    const what = R.pick(["The swimming carnival", "The bus trip", "The school play"]);
    const o = opts(R, d, [[(h2 * 100 + m2) - (h1 * 100 + m1), "treated an hour as 100 minutes (took the times away like ordinary numbers)"], [(h2 - h1) * 60 + (m1 - m2), "took the smaller minutes from the larger ones"], [(60 - m1) + m2, "forgot the whole hours in between"], [(h2 - h1) * 60, "counted only whole hours"]], v => v + " minutes", 5, 5);
    return { form: "two times", stem: `<p>${what} started at ${clock(a)} and finished at ${clock(b)}.</p><p>How long did it last?</p>`, ...o, data: { a, b },
      explain: ex("time", `<p>${clock(a)} → ${clock((h1 + 1) * 60)} is ${60 - m1} minutes. ${h2 - h1 - 1 ? `Then ${h2 - h1 - 1} whole hour = 60 minutes to ${clock(h2 * 60)}. ` : ""}Then ${m2} minutes to ${clock(b)}. ${60 - m1}${h2 - h1 - 1 ? " + 60" : ""} + ${m2} = <b>${d} minutes</b>.</p>`, o) };
  }
  let t = 8 * 60 + R.pick([30, 40, 45]); const subj = R.shuffle(["music", "maths", "art", "science", "sport", "library"]);
  const blocks = [];
  for (let i = 0; i < 5; i++) { const len = i === 2 ? R.pick([15, 20, 25]) : i === 4 ? R.pick([45, 50, 55]) : R.pick([40, 45, 50, 55, 65, 70]); blocks.push([i === 2 ? "break" : i === 4 ? "lunch" : subj[i], t, t + len]); t += len; }
  const d = (blocks[2][2] - blocks[2][1]) + (blocks[4][2] - blocks[4][1]);
  const hund = x => Math.floor(x / 60) * 100 + x % 60;
  const wrongHund = (hund(blocks[2][2]) - hund(blocks[2][1])) + (hund(blocks[4][2]) - hund(blocks[4][1]));
  const o = opts(R, d, [[wrongHund, "treated an hour as 100 minutes"], [blocks[4][2] - blocks[2][1], "counted from the start of break to the end of lunch, including the lesson between"], [blocks[4][2] - blocks[4][1], "counted lunch only"], [d + 10, "a slip counting on across the hour"]], v => v + " minutes", 5, 5);
  const W = 520, x = i => 20 + i * 96;
  let g = ""; blocks.forEach((b, i) => { g += `<rect x="${x(i)}" y="40" width="96" height="56" fill="${i === 2 || i === 4 ? "#c4cad6" : "#fff"}" stroke="${INK}" stroke-width="2"/>` + T(x(i) + 48, 73, b[0], 'text-anchor="middle"') + T(x(i), 30, clock(b[1]).replace(" ", ""), 'text-anchor="middle" font-size="12"'); });
  g += T(x(5), 30, clock(blocks[4][2]).replace(" ", ""), 'text-anchor="middle" font-size="12"');
  return { form: "timetable strip", stem: `<p>Here is part of a school day.</p>${svg(W, 104, g, "a timetable strip")}<p>How many minutes are spent on break and lunch altogether?</p>`, ...o, data: { blocks },
    explain: ex("time", `<p>Break: ${clock(blocks[2][1])} to ${clock(blocks[2][2])} = ${blocks[2][2] - blocks[2][1]} minutes. Lunch: ${clock(blocks[4][1])} to ${clock(blocks[4][2])} = ${blocks[4][2] - blocks[4][1]} minutes. Total <b>${d} minutes</b>.</p>`, o) };
});
gen("m-time-2", "time", 2, R => {
  const start = R.int(14, 46) * 15 + R.pick([0, 5]);
  let M; do { M = R.int(13, 59) * 10 + R.pick([0, 5]); } while (M % 60 === 0 || M % 100 >= 60 || Math.floor(M / 100) * 60 + M % 100 === M);
  const end = start + M, h = Math.floor(M / 60), mm = M % 60;
  const what = R.pick(["A long car trip", "A bushwalk", "A cooking class", "A sleepover movie marathon"]);
  const o = opts(R, end, [[start + Math.floor(M / 100) * 60 + M % 100, `read ${M} minutes as ${Math.floor(M / 100)} h ${M % 100} min`], [end >= 720 ? end - 720 : end + 720, "got am and pm mixed up"], [end - 60, "counted one hour too few"], [end + 60, "counted one hour too many"]], clock, 5, 5);
  return { form: "add minutes", stem: `<p>${what} starts at ${clock(start)} and lasts <b>${M} minutes</b>.</p><p>At what time does it finish?</p>`, ...o, data: { start, M },
    explain: ex("time", `<p>${M} minutes = ${h} hours and ${mm} minutes (${h} × 60 = ${h * 60}, ${M} − ${h * 60} = ${mm}). ${clock(start)} + ${h} h = ${clock(start + h * 60)}, then + ${mm} min = <b>${clock(end)}</b>.</p>`, o) };
});
gen("m-time-3", "time", 3, R => {
  const stops = ["Park Rd", "Mill St", "Town Hall", "Beach"], gap = [R.pick([8, 10, 12]), R.pick([12, 15, 18]), R.pick([9, 11, 14])];
  const first = 7 * 60 + R.pick([0, 5, 10, 15]), every = R.pick([20, 25, 30]);
  const buses = [0, 1, 2, 3].map(k => { let t = first + k * every; return stops.map((s, i) => i ? (t += gap[i - 1]) : t); });
  const body = stops.map((s, i) => [s, ...buses.map(b => clock(b[i]).replace(" am", ""))]);
  const arr = buses[1][1] + R.int(1, every - 2), name = R.pick(NAMES);
  const nb = buses.findIndex(b => b[1] >= arr), bus = buses[nb];
  const form = R.pick(["arrive", "wait"]);
  if (form === "arrive") {
    const o = opts(R, bus[3], [[buses[nb - 1][3], "chose the bus that had already left Mill St"], [bus[2], "read the Town Hall row instead of the Beach row"], [nb + 1 < 4 ? buses[nb + 1][3] : bus[3] + every, "waited for the bus after the next one"], [arr + gap[1] + gap[2], "added the travel time to the moment he reached the stop"]], clock, 5, 1);
    return { form, stem: `<p>The timetable shows morning buses (all times am).</p>${tbl(["Stop", "Bus 1", "Bus 2", "Bus 3", "Bus 4"], body)}<p>${name} reaches the Mill St stop at ${clock(arr)} and catches the next bus. When does he get to the Beach?</p>`, ...o, data: { buses, arr, form },
      explain: ex("time", `<p>Buses leave Mill St at ${buses.map(b => clock(b[1])).join(", ")}. The ${clock(buses[nb - 1][1])} bus has already gone at ${clock(arr)}, so he catches the ${clock(bus[1])} bus. Go down that column to the Beach row: <b>${clock(bus[3])}</b>.</p>`, o) };
  }
  const w = bus[1] - arr;
  const o = opts(R, w, [[bus[3] - arr, "measured to when the bus reaches the Beach, not when it comes"], [arr - buses[nb - 1][1], "measured back to the bus that had already gone"], [every, "gave the time between buses"], [bus[2] - arr, "used the Town Hall row"]], v => v + " minutes", 5, 1);
  return { form, stem: `<p>The timetable shows morning buses (all times am).</p>${tbl(["Stop", "Bus 1", "Bus 2", "Bus 3", "Bus 4"], body)}<p>${name} reaches the Mill St stop at ${clock(arr)}. How long must he wait for the next bus?</p>`, ...o, data: { buses, arr, form },
    explain: ex("time", `<p>Buses leave Mill St at ${buses.map(b => clock(b[1])).join(", ")}. After ${clock(arr)} the next one is at ${clock(bus[1])}. ${clock(arr)} → ${clock(bus[1])} = <b>${w} minutes</b>.</p>`, o) };
});
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS = [["January", 31], ["February", 28], ["March", 31], ["April", 30], ["May", 31], ["June", 30], ["July", 31], ["August", 31], ["September", 30], ["October", 31], ["November", 30], ["December", 31]];
gen("m-time-4", "time", 4, R => {
  if (R.chance(0.5)) {
    const d0 = R.int(0, 6); let n; do { n = R.int(18, 75); } while (n % 7 === 0);
    const ans = (d0 + n) % 7;
    const cand = [[(d0 + n - 1) % 7, "counted the starting day as day 1 (one day early)"], [(d0 + n + 1) % 7, "counted one day too many"], [(n) % 7, "counted from Monday instead of the starting day"], [(d0 + n % 7 + 7 - 2) % 7, "a slip in counting on"]];
    const list = [ans]; const traps = {};
    for (const [v, why] of cand) if (!list.includes(v) && list.length < 5) { list.push(v); traps[v] = why; }
    for (let k = 2; list.length < 5; k++) { const v = (ans + k) % 7; if (!list.includes(v)) { list.push(v); traps[v] = "a slip in counting on"; } }
    list.sort((a, b) => a - b);
    const o = { options: list.map(v => DAYS[v]), answer: list.indexOf(ans), traps: Object.fromEntries(list.map((v, i) => [i, traps[v]]).filter(x => x[1])) };
    return { form: "day of week", stem: `<p>Today is <b>${DAYS[d0]}</b>. A parcel will arrive in ${n} days.</p><p>On what day of the week will it arrive?</p>`, ...o, data: { form: "day", d0, n },
      explain: `<p class="method"><b>Method:</b> Jump in whole weeks first: every 7 days is the same day again.</p><p>${n} = ${Math.floor(n / 7)} × 7 + ${n % 7}. After ${Math.floor(n / 7) * 7} days it is ${DAYS[d0]} again; ${n % 7} more days is <b>${DAYS[ans]}</b>.</p>${whyNot(o)}` };
  }
  const m = R.int(2, 11), [mName] = MONTHS[m], [pName, pLen] = MONTHS[m - 1];
  const d = R.int(3, 15); let n; do { n = R.int(d + 3, d + 24); } while (n - d >= pLen);
  const ans = pLen - (n - d), wrongLen = pLen === 31 ? 30 : 31;
  if (ans < 3 || ans > pLen - 2) return null;
  const items = [[ans, null]];
  for (const [v, why] of [[wrongLen - (n - d), `gave ${pName} ${wrongLen} days instead of ${pLen}`], [ans + 1, "counted the starting day as one of the days (one day out)"], [ans - 1, "went back one day too many"], [ans + 2, "a slip counting back"], [ans - 2, "a slip counting back"]])
    if (v >= 1 && v <= 31 && !items.some(x => x[0] === v) && items.length < 5) items.push([v, why]);
  items.sort((a, b) => a[0] - b[0]);
  const o = { options: items.map(x => `${x[0]} ${pName}`), answer: items.findIndex(x => x[1] === null), traps: Object.fromEntries(items.map((x, i) => [i, x[1]]).filter(x => x[1])) };
  return { form: "date before", stem: `<p>A school concert is on <b>${d} ${mName}</b>. Tickets went on sale ${n} days before the concert.</p><p>On what date did tickets go on sale?</p>`, ...o, data: { form: "date", m, d, n },
    explain: `<p class="method"><b>Method:</b> Count back to the end of the month before, then use how many days that month has.</p><p>Going back ${d} days from ${d} ${mName} takes you to ${pLen} ${pName}, the last day of ${pName}. That leaves ${n} − ${d} = ${n - d} more days to go back: ${pLen} − ${n - d} = <b>${ans} ${pName}</b>.</p>${whyNot(o)}` };
});

/* ---------- Scales and measures ---------- */
gen("m-scale-1", "scale", 1, R => {
  if (R.chance(0.5)) {
    const step = R.pick([2, 5, 10, 25]), small = R.pick([2, 4, 5]), big = 4, label = step * small;
    const a = R.pick([0, label * R.int(1, 3)]), b = a + label * big;
    let i; do { i = R.int(1, big * small - 1); } while (i % small === 0);
    const v = a + i * step, lab = a + Math.floor(i / small) * label, extra = i % small;
    const o = opts(R, v, [[lab + extra, `counted each small mark as 1 instead of ${step}`], [Math.round(v / label) * label, "read the nearest label"], [lab + extra * step * 2, "counted each small mark as twice its value"], [lab + extra * 10, "counted each small mark as 10"]], String, 5, step);
    return { form: "number line", stem: `<p>What number is the arrow pointing to?</p>${scaleSvg(a, b, big, small, v)}`, ...o, data: { a, b, big, small, v },
      explain: ex("scale", `<p>Between two labels (${label} apart) there are ${small} spaces, so one small mark = ${label} ÷ ${small} = ${step}. The arrow is ${extra} marks past ${lab}: ${lab} + ${extra} × ${step} = <b>${v}</b>.</p>`, o) };
  }
  const top = R.pick([500, 1000, 2000]), big = top === 500 ? 5 : top === 1000 ? 5 : 4, small = R.pick([2, 4, 5].filter(s => (top / big) % s === 0));
  const per = top / big / small; let i; do { i = R.int(1, big * small - 1); } while (i % small === 0);
  const v = i * per, lab = Math.floor(i / small) * (top / big), extra = i % small;
  const o = opts(R, v, [[lab + extra, `counted each small mark as 1 mL instead of ${per} mL`], [Math.round(v / (top / big)) * (top / big), "read the nearest label"], [lab + extra * 10, "counted each small mark as 10 mL"], [top - v, "found the empty part"]], v => v + " mL", 5, per);
  return { form: "jug", stem: `<p>How much water is in the jug?</p>${jugSvg(top, big, small, v)}`, ...o, data: { top, big, small, v },
    explain: ex("scale", `<p>Labels are ${top / big} mL apart with ${small} spaces between, so one mark = ${top / big} ÷ ${small} = ${per} mL. The water is ${extra} marks above ${lab}: ${lab} + ${extra} × ${per} = <b>${v} mL</b>.</p>`, o) };
});
gen("m-scale-2", "scale", 2, R => {
  const form = R.pick(["g", "mL", "cm"]);
  if (form === "g") {
    const have = R.int(5, 45) * 10 - R.pick([0, 5]), want = 500, need = want - have;
    const o = opts(R, need, [[1000 - have, "used 1 kilogram (1000 g) instead of half a kilogram"], [want - Math.round(have / 10), "mixed up the units (treated the grams as tens)"], [have + want, "added instead of finding the difference"], [100 - have % 100, "only made it up to the next hundred"]], v => v + " g", 5, 5);
    return { form, stem: `<p>A bowl has <b>${have} g</b> of flour in it. A recipe needs <b>half a kilogram</b> of flour.</p><p>How many more grams are needed?</p><p class="note">1 kg = 1000 g</p>`, ...o, data: { form, have },
      explain: ex("scale", `<p>Half a kilogram = 1000 g ÷ 2 = 500 g. 500 − ${have} = <b>${need} g</b>.</p>`, o) };
  }
  if (form === "mL") {
    const L = R.pick([1.5, 2, 2.5]), have = R.int(3, 13) * 50 + R.pick([0, 25]), need = L * 1000 - have;
    const o = opts(R, need, [[1000 - have, "used 1 litre instead of " + L + " litres"], [L * 100 - have > 0 ? L * 100 - have : 0, "used 100 mL in a litre instead of 1000"], [have, "gave the amount already in the bottle"], [need + 500, "a slip changing litres to millilitres"]], v => v + " mL", 5, 25);
    return { form, stem: `<p>A bottle holds <b>${L} litres</b> when full. It has <b>${have} mL</b> of water in it.</p><p>How much more water will fill it?</p><p class="note">1 L = 1000 mL</p>`, ...o, data: { form, L, have },
      explain: ex("scale", `<p>${L} L = ${L * 1000} mL. ${L * 1000} − ${have} = <b>${need} mL</b>.</p>`, o) };
  }
  const m = R.pick([2, 3]), cut = R.int(31, 95), left = m * 100 - cut;
  const o = opts(R, left, [[100 - cut, `used 100 cm for ${m} m`], [m * 100 + cut, "added instead of taking away"], [m * 10 - cut > 0 ? m * 10 - cut : 0, "used 10 cm in a metre"], [cut, "gave the piece cut off"]], v => v + " cm", 5, 1);
  return { form, stem: `<p>A rope is <b>${m} m</b> long. ${R.pick(NAMES)} cuts off <b>${cut} cm</b>.</p><p>How long is the rope now, in centimetres?</p><p class="note">1 m = 100 cm</p>`, ...o, data: { form, m, cut },
    explain: ex("scale", `<p>${m} m = ${m * 100} cm. ${m * 100} − ${cut} = <b>${left} cm</b>.</p>`, o) };
});
gen("m-scale-3", "scale", 3, R => {
  const s1 = R.pick([2, 5]), s2 = s1 === 2 ? R.pick([5, 10]) : R.pick([2, 10]);
  const make = (s) => { const small = 5, label = s * small, a = 0, b = label * 4; let i; do { i = R.int(1, 19); } while (i % small === 0); return { a, b, small, v: i * s, s, label, i }; };
  let A, B; do { A = make(s1); B = make(s2); } while (A.v === B.v);
  const hi = A.v > B.v ? A : B, lo = A.v > B.v ? B : A, d = hi.v - lo.v;
  const wrongA = A.i * s2, wrongB = B.i * s1;
  const o = opts(R, d, [[Math.abs(A.v - wrongB), "read both scales as if they had the same marks"], [hi.v, "gave one reading, not the difference"], [Math.abs(A.i - B.i), "found the difference in marks, not in degrees"], [hi.v + lo.v, "added the two readings"]], v => v + " °C", 5, 1);
  return { form: "two thermometers", stem: `<p>Two thermometers are marked differently.</p><p><b>Thermometer P</b></p>${scaleSvg(A.a, A.b, 4, 5, A.v, "°")}<p><b>Thermometer Q</b></p>${scaleSvg(B.a, B.b, 4, 5, B.v, "°")}<p>How many degrees warmer is the higher reading than the lower one?</p>`, ...o, data: { A: [A.label, A.v], B: [B.label, B.v] },
    explain: ex("scale", `<p>P: labels ${A.label}° apart with 5 spaces, so a mark is ${A.s}°; it reads ${A.v}°. Q: labels ${B.label}° apart, so a mark is ${B.s}°; it reads ${B.v}°. ${hi.v} − ${lo.v} = <b>${d} °C</b>.</p>`, o) };
});
gen("m-scale-4", "scale", 4, R => {
  if (R.chance(0.5)) {
    const n = R.pick([4, 5, 6, 8, 10]), top = n * R.pick([50, 100, 150, 200, 250]), k = R.int(1, n - 1), v = top / n * k;
    if (v === top / 2 && R.chance(.5)) return null;
    const o = opts(R, v, [[k * 100, "counted each mark as 100 mL"], [top - v, "gave how much more would fill it"], [top / (n - 1) * k, `counted ${n - 1} spaces instead of ${n}`], [top / 2, "guessed half way"]], v => v + " mL", 5, top / n);
    return { form: "ends only", stem: `<p>This container is marked only at the bottom (0 mL) and the top (${top} mL). The marks between are equally spaced.</p>${jugSvg(top, 1, n, v, "mL", false)}<p>How much liquid is in the container?</p>`, ...o, data: { form: "ends", n, top, k },
      explain: ex("scale", `<p>There are ${n} equal spaces from 0 to ${top} mL, so each space is ${top} ÷ ${n} = ${top / n} mL. The liquid reaches ${k} spaces: ${k} × ${top / n} = <b>${v} mL</b>.</p>`, o) };
  }
  const per = R.pick([2, 5, 10, 20]), a = R.int(1, 4) + R.pick([0, 0.5]), b = a + R.int(3, 8) + R.pick([0, 0.5]), cm = b - a, km = cm * per;
  if (!Number.isInteger(km)) return null;
  let g = `<line x1="20" x2="460" y1="70" y2="70" stroke="${INK}" stroke-width="2"/>`;
  const px = t => 20 + t * 40;
  for (let i = 0; i <= 110; i++) { const t = i / 10; if (px(t) > 460) break; g += `<line x1="${px(t)}" x2="${px(t)}" y1="70" y2="${i % 10 === 0 ? 86 : i % 5 === 0 ? 81 : 76}" stroke="${INK}" stroke-width="${i % 10 === 0 ? 1.6 : 0.8}"/>`; if (i % 10 === 0) g += T(px(t), 102, t, 'text-anchor="middle" font-size="12"'); }
  g += `<circle cx="${px(a)}" cy="40" r="6" fill="#d9480f" stroke="${INK}"/>` + T(px(a), 28, "Camp", 'text-anchor="middle"') + `<circle cx="${px(b)}" cy="40" r="6" fill="#2b8a3e" stroke="${INK}"/>` + T(px(b), 28, "Lake", 'text-anchor="middle"') + `<line x1="${px(a)}" x2="${px(b)}" y1="40" y2="40" stroke="${INK}" stroke-dasharray="4 3"/>` + T(468, 84, "cm", 'font-size="12"');
  const o = opts(R, km, [[b * per, "read the Lake's position on the ruler and forgot the Camp is not at 0"], [cm, "found the distance on the map but forgot to use the scale"], [(cm * 10) * per / 10 + per, "a slip reading the millimetre marks"], [a * per + b * per, "added the two positions"]], v => v + " km", 5, per / 2);
  return { form: "map scale", stem: `<p>A ruler is laid on a map. On this map <b>1 cm stands for ${per} km</b>.</p>${svg(480, 112, g, "a ruler under two places on a map")}<p>How far is it, in real life, from the Camp to the Lake in a straight line?</p>`, ...o, data: { form: "map", a, b, per },
    explain: ex("scale", `<p>Camp is at ${a} cm and the Lake at ${b} cm, so on the map they are ${b} − ${a} = ${cm} cm apart. Each cm is ${per} km: ${cm} × ${per} = <b>${km} km</b>.</p>`, o) };
});

/* ---------- Working backwards ---------- */
gen("m-back-1", "back", 1, R => {
  const form = R.pick(["plus", "times", "bus"]);
  if (form === "plus") {
    const a = R.int(12, 48), x = R.int(5, 39), c = R.int(4, 19), b = a + x + c;
    const o = opts(R, x, [[b - c, "gave the answer to the right-hand side"], [b - a, `left out the − ${c}`], [b - c + a, `added ${a} instead of taking it away`], [x + 2 * c, "a slip balancing the two sides"]]);
    return { form, stem: `<p>What number goes in the box?</p><p class="big">${a} + ☐ = ${b} − ${c}</p>`, ...o, data: { form, a, b, c },
      explain: `<p class="method"><b>Method:</b> The = sign means both sides are the same. Work out the side you can, then undo.</p><p>${b} − ${c} = ${b - c}. So ${a} + ☐ = ${b - c}, and ☐ = ${b - c} − ${a} = <b>${x}</b>.</p>${whyNot(o)}` };
  }
  if (form === "times") {
    const a = R.int(3, 9), x = R.int(3, 12), c = R.int(3, 20), b = a * x - c;
    if (b <= 0) return null;
    const o = opts(R, x, [[b + c, "gave the answer to the right-hand side"], [b + c - a, `took ${a} away instead of dividing by it`], [(b + c) * a, `multiplied by ${a} instead of dividing`], [x + 1, "a slip in the times table"]]);
    return { form, stem: `<p>What number goes in the box?</p><p class="big">☐ × ${a} = ${b} + ${c}</p>`, ...o, data: { form, a, b, c },
      explain: `<p class="method"><b>Method:</b> The = sign means both sides are the same. Work out the side you can, then undo.</p><p>${b} + ${c} = ${b + c}. ☐ × ${a} = ${b + c}, so ☐ = ${b + c} ÷ ${a} = <b>${x}</b>.</p>${whyNot(o)}` };
  }
  const start = R.int(30, 80), on = R.int(6, 25), off = R.int(on + 3, on + 30), end = start - off + on;
  const what = R.pick([["people on a train", "got off", "got on", "station"], ["books in a book box", "were borrowed", "were returned", "lunchtime"], ["birds on a fence", "flew away", "landed", "noise"]]);
  const o = opts(R, off, [[start - end, `forgot the ${on} that ${what[2]}`], [start - end - on, `took the ${on} away instead of adding them back`], [on, `gave the number that ${what[2]}`], [end - on, "gave the number before the last change"]]);
  return { form, stem: `<p>There were ${start} ${what[0]}. Some ${what[1]} and ${on} ${what[2]}. Then there were ${end}.</p><p>How many ${what[1]}?</p>`, ...o, data: { form, start, on, end },
    explain: `<p class="method"><b>Method:</b> ${M("back")}</p><p>Undo the last step: before the ${on} ${what[2]} there were ${end} − ${on} = ${end - on}. So the number that ${what[1]} is ${start} − ${end - on} = <b>${off}</b>.</p>${whyNot(o)}` };
});
gen("m-back-2", "back", 2, R => {
  const x = R.int(4, 25), a = R.int(2, 6), plus = R.chance(.5), b = R.int(3, 20);
  const out = plus ? a * x + b : a * x - b;
  if (out <= 0) return null;
  const story = R.chance(.5);
  const wrongOrder = plus ? out / a - b : out / a + b;
  const o = opts(R, x, [[wrongOrder, "undid the steps in the wrong order"], [plus ? out - b : out + b, "undid only the last step"], [a * out + (plus ? b : -b), "went forwards through the machine instead of backwards"], [Math.round(out / a), "undid only the first step"]]);
  const steps = `× ${a}, then ${plus ? "+" : "−"} ${b}`;
  const stem = story ? `<p>${R.pick(NAMES)} thinks of a number. She multiplies it by ${a}, then ${plus ? "adds" : "takes away"} ${b}. Her answer is ${out}.</p><p>What number did she think of?</p>`
    : `<p>A number goes into this machine.</p><p class="big">☐ → × ${a} → ${plus ? "+" : "−"} ${b} → ${out}</p><p>What number went in?</p>`;
  return { form: story ? "story" : "machine", stem, ...o, data: { x, a, b, plus, out },
    explain: ex("back", `<p>The machine did ${steps}. Undo from the end: ${out} ${plus ? "−" : "+"} ${b} = ${plus ? out - b : out + b}, then ÷ ${a} = <b>${x}</b>. Check: ${x} × ${a} = ${a * x}, ${plus ? "+" : "−"} ${b} = ${out}. ✓</p>`, o) };
});
gen("m-back-3", "back", 3, R => {
  if (R.chance(0.5)) {
    const small = R.int(8, 60), D = R.int(4, 30), big = small + D, S = small + big, askBig = R.chance(.6);
    const ans = askBig ? big : small;
    const o = opts(R, ans, [[S / 2, "just halved the total"], [askBig ? small : big, `gave the ${askBig ? "smaller" : "larger"} number`], [S - D, "took the difference away but forgot to halve"], [S + D, "added the difference but forgot to halve"]], String, 5, 1);
    const ctx = R.pick([["Two brothers have", "marbles"], ["Two classes collected", "cans"], ["Two jars hold", "jellybeans"]]);
    return { form: "sum and difference", stem: `<p>${ctx[0]} ${S} ${ctx[1]} altogether. One has ${D} more than the other.</p><p>How many does the one with <b>${askBig ? "more" : "fewer"}</b> have?</p>`, ...o, data: { form: "sd", S, D, askBig },
      explain: ex("back", `<p>Take the extra ${D} away: ${S} − ${D} = ${S - D}. Now both are equal: ${S - D} ÷ 2 = ${small} (the smaller). The larger is ${small} + ${D} = ${big}. So the answer is <b>${ans}</b>.</p>`, o) };
  }
  const A = R.int(3, 20), B = R.int(3, 20), C = R.int(3, 20);
  if (new Set([A, B, C]).size < 3) return null;
  const p = A + B, q = B + C, r = A + C, tot = A + B + C, items = R.pick([["box", "bag", "tin"], ["cat", "dog", "rabbit"]]);
  const ask = R.int(0, 2), ans = [A, B, C][ask];
  const o = opts(R, ans, [[p + q + r, "added the three weighings and stopped (each thing was counted twice)"], [tot, "gave all three together"], [[p, q, r][ask === 1 ? 0 : ask === 2 ? 1 : 0] / 2, "halved one weighing"], [tot - [A, B, C][ask], "gave the other two together"]], v => v + " kg", 5, 1);
  return { form: "weighed in pairs", stem: `<p>A ${items[0]} and a ${items[1]} together weigh ${p} kg. The ${items[1]} and a ${items[2]} together weigh ${q} kg. The ${items[0]} and the ${items[2]} together weigh ${r} kg.</p><p>How much does the <b>${items[ask]}</b> weigh?</p>`, ...o, data: { form: "pairs", p, q, r, ask },
    explain: ex("back", `<p>Add the three weighings: ${p} + ${q} + ${r} = ${p + q + r}. Each thing was weighed twice, so all three together weigh ${p + q + r} ÷ 2 = ${tot} kg. The ${items[ask]} = ${tot} − (the other two, ${tot - ans}) = <b>${ans} kg</b>.</p>`, o) };
});
gen("m-back-4", "back", 4, R => {
  if (R.chance(0.5)) {
    const order = R.chance(.5), name = R.pick(NAMES), E = R.int(5, 30), a = R.int(3, 15);
    let X, stem, ow, why;
    if (order) { X = 2 * E + a; stem = `${name} had some money. She spent $${a} on a drink, then spent half of what was left on a book. She had $${E} left.`; ow = 2 * (E + a); }
    else { X = 2 * (E + a); stem = `${name} had some money. She spent half of it on a book, then spent $${a} on a drink. She had $${E} left.`; ow = 2 * E + a; }
    const o = opts(R, X, [[ow, "undid the steps in the wrong order"], [E + a, "forgot to undo the half"], [2 * E, `forgot the $${a}`], [E + a + 2 * E, "a slip undoing the steps"]], v => "$" + v);
    return { form: "spending story", stem: `<p>${stem}</p><p>How much money did she have at the start?</p>`, ...o, data: { order, E, a },
      explain: ex("back", order ? `<p>Last step: she spent half of what was left and had $${E}, so before the book she had $${E} × 2 = $${2 * E}. First step: before the drink she had $${2 * E} + $${a} = <b>$${X}</b>.</p>` : `<p>Last step: she spent $${a} and had $${E}, so before the drink she had $${E + a}. First step: that was half, so at the start she had $${E + a} × 2 = <b>$${X}</b>.</p>`, o) };
  }
  const names = R.shuffle(NAMES).slice(0, 4), p = R.int(2, 6), q = R.int(2, 6), r = R.int(2, 7), N = R.int(15, 40);
  const C = N - r, B = C + q, A = B + p;
  const o = opts(R, A, [[N + r + q + p, "added every difference, even where the person is younger"], [N - r - q + p, "went the wrong way at one step"], [N + r - q + p, "went the wrong way at one step"], [B, `gave ${names[1]}'s age, one step early`]], v => v + " years");
  return { form: "age chain", stem: `<p>${names[0]} is ${p} years older than ${names[1]}. ${names[2]} is ${q} years younger than ${names[1]}. ${names[3]} is ${r} years older than ${names[2]}. ${names[3]} is ${N}.</p><p>How old is ${names[0]}?</p>`, ...o, data: { p, q, r, N },
    explain: ex("back", `<p>Start with the age you know and walk along the chain. ${names[3]} is ${N}, and ${r} years older than ${names[2]}, so ${names[2]} is ${N} − ${r} = ${C}. ${names[2]} is ${q} years younger than ${names[1]}, so ${names[1]} is ${C} + ${q} = ${B}. ${names[0]} is ${p} older: ${B} + ${p} = <b>${A}</b>.</p>`, o) };
});

/* ---------- Shape, area and space ---------- */
const lShape = (W, H, w, h, labels, scale = 18) => {
  /* an L: a W × H rectangle with a w × h corner cut from the top right. labels: which sides to label */
  const s = scale, X = x => 40 + x * s, Y = y => 30 + y * s;
  const pts = [[0, 0], [W - w, 0], [W - w, h], [W, h], [W, H], [0, H]];
  let g = `<path d="M${pts.map(p => X(p[0]) + " " + Y(p[1])).join("L")}Z" fill="#e6eefb" stroke="${INK}" stroke-width="2.5"/>`;
  const L = { top: [(W - w) / 2, -0.6, W - w], step: [W - w + 0.3, h / 2 + 0.2, h, "start"], ledge: [W - w / 2, h - 0.6, w], right: [W + 0.3, (h + H) / 2 + 0.2, H - h, "start"], bottom: [W / 2, H + 1.1, W], left: [-0.3, H / 2 + 0.2, H, "end"] };
  for (const k of labels) { const [x, y, v, a] = L[k]; g += T(X(x), Y(y), v + " cm", `text-anchor="${a || "middle"}"`); }
  return svg(X(W) + 70, Y(H) + 34, g, "an L-shaped figure with some sides labelled") + `<p class="note">Not drawn to scale. All corners are right angles.</p>`;
};
gen("m-shape-1", "shape", 1, R => {
  const W = R.int(6, 14), H = R.int(5, 12), w = R.int(2, W - 3), h = R.int(2, H - 3);
  const labels = ["bottom", "left", "ledge", "step"];
  const per = 2 * (W + H), shown = W + H + w + h;
  const o = opts(R, per, [[shown, "added only the sides with numbers"], [W * H - w * h, "found the area, not the perimeter"], [per - (H - h), "missed one of the two unlabelled sides"], [W * H, "found the area of the whole rectangle"]], v => v + " cm");
  return { form: "L-shape", stem: `<p>What is the perimeter of this shape?</p>${lShape(W, H, w, h, labels)}`, ...o, data: { W, H, w, h },
    explain: ex("shape", `<p>The two missing sides: the top is ${W} − ${w} = ${W - w} cm, and the right side is ${H} − ${h} = ${H - h} cm. All the way round: ${W - w} + ${h} + ${w} + ${H - h} + ${W} + ${H} = <b>${per} cm</b>. (Shortcut: the horizontal sides make ${W} twice and the vertical sides ${H} twice.)</p>`, o) };
});
gen("m-shape-2", "shape", 2, R => {
  const W = R.int(6, 12), H = R.int(5, 10), w = R.int(2, W - 3), h = R.int(2, H - 3);
  const area = W * H - w * h;
  const o = opts(R, area, [[2 * (W + H), "found the perimeter"], [W * H, "forgot to take away the missing corner"], [W * H + w * h, "added the corner instead of taking it away"], [W * (H - h) + (W - w) * H, "split it into two rectangles that overlap and counted the overlap twice"]], v => v + " cm²");
  return { form: "L-shape area", stem: `<p>What is the area of this shape?</p>${lShape(W, H, w, h, ["bottom", "left", "ledge", "step", "top", "right"])}`, ...o, data: { W, H, w, h },
    explain: ex("shape", `<p>Think of the whole ${W} × ${H} rectangle (${W * H} cm²) with a ${w} × ${h} corner missing (${w * h} cm²). ${W * H} − ${w * h} = <b>${area} cm²</b>. Or split it: ${W - w} × ${h} + ${W} × ${H - h} = ${(W - w) * h} + ${W * (H - h)} = ${area}.</p>`, o) };
});
gen("m-shape-3", "shape", 3, R => {
  const [r, c] = R.pick([[2, 3], [3, 3], [2, 4], [3, 4]]), hs = [...Array(r * c)].map(() => R.int(1, 4));
  const mx = Math.max(...hs), tot = hs.reduce((a, b) => a + b, 0);
  if (tot === r * c * mx) return null;
  const form = R.pick(["more", "count"]);
  let g = ""; const s = 46;
  hs.forEach((v, i) => { const x = 10 + (i % c) * s, y = 10 + Math.floor(i / c) * s; g += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#eef3fb" stroke="${INK}" stroke-width="2"/>` + T(x + s / 2, y + s / 2 + 6, v, 'text-anchor="middle" font-size="20" font-weight="700"'); });
  const pic = svg(20 + c * s, 20 + r * s, g, "a plan of a cube model with the number of cubes in each stack");
  if (form === "count") {
    const o = opts(R, tot, [[r * c, "counted the squares on the plan, not the cubes"], [mx * r * c, "used the tallest stack for every square"], [hs.filter(x => x === mx).length * mx, "counted only the tallest stacks"], [tot - hs[0], "missed a stack"]]);
    return { form, stem: `<p>This plan shows a model made of cubes, seen from above. The number in each square is how many cubes are stacked there.</p>${pic}<p>How many cubes are in the model?</p>`, ...o, data: { hs, form },
      explain: ex("shape", `<p>Add the stacks row by row: ${hs.join(" + ")} = <b>${tot}</b>.</p>`, o) };
  }
  const need = r * c * mx - tot;
  const o = opts(R, need, [[r * c * mx, "gave the number of cubes in the finished box"], [tot, "gave the cubes already there"], [r * c * mx - r * c, "took away one cube for each square instead of the cubes there"], [hs.filter(x => x < mx).length, "counted the short stacks, not the cubes they need"]]);
  return { form, stem: `<p>This plan shows a model made of cubes, seen from above. The number in each square is how many cubes are stacked there.</p>${pic}<p>How many more cubes are needed to make it into a solid box ${mx} cubes tall, with the same base?</p>`, ...o, data: { hs, form },
    explain: ex("shape", `<p>The finished box: ${r} × ${c} squares, ${mx} tall = ${r * c * mx} cubes. Already there: ${hs.join(" + ")} = ${tot}. Needed: ${r * c * mx} − ${tot} = <b>${need}</b>.</p>`, o) };
});
gen("m-shape-4", "shape", 4, R => {
  if (R.chance(0.55)) {
    const s = R.pick([2, 3, 4, 5]), L = s * R.int(3, 8), W = s * R.int(2, 6), posts = 2 * (L + W) / s;
    const o = opts(R, posts, [[posts + 4, "added an extra post at each corner (the corners were already counted)"], [posts + 1, "added one, as if it were a straight line"], [L / s + W / s, "went only half way round"], [L / s + 1 + W / s + 1, "went half way round and added the ends"]]);
    return { form: "fence posts", stem: `<p>A rectangular garden is ${L} m long and ${W} m wide. A fence goes all the way round it with a post at every corner and a post every ${s} m.</p><p>How many posts are there?</p>`, ...o, data: { form: "posts", L, W, s },
      explain: ex("shape", `<p>Perimeter: 2 × (${L} + ${W}) = ${2 * (L + W)} m. Round a closed shape there are as many posts as gaps: ${2 * (L + W)} ÷ ${s} = <b>${posts}</b>.</p>`, o) };
  }
  const a = R.int(3, 9), b = R.int(2, 7), laps = R.int(2, 5), extra = R.int(1, 3), P = 2 * (a + b);
  const sides = [a, b, a, b].slice(0, extra).reduce((x, y) => x + y, 0), ans = laps * P + sides;
  const o = opts(R, ans, [[laps * P, "forgot the extra sides"], [(laps + 1) * P, "counted the extra sides as another full lap"], [laps * (a + b) + sides, "used only half the perimeter for each lap"], [laps * P + extra, "counted the extra sides as 1 m each"]], v => v + " m");
  return { form: "laps", stem: `<p>A path goes round a rectangle that is ${a} m long and ${b} m wide. ${R.pick(NAMES)} starts at a corner and walks along a ${a} m side first. He walks right round the rectangle ${laps} times, then along ${extra} more side${extra > 1 ? "s" : ""}, always in the same direction.</p><p>How far does he walk?</p>`, ...o, data: { form: "laps", a, b, laps, extra },
    explain: ex("shape", `<p>One lap: ${a} + ${b} + ${a} + ${b} = ${P} m. ${laps} laps: ${laps} × ${P} = ${laps * P} m. Then ${extra} more side${extra > 1 ? "s" : ""} starting with a ${a} m side: ${[a, b, a, b].slice(0, extra).join(" + ")} = ${sides} m. Total <b>${ans} m</b>.</p>`, o) };
});
})();
