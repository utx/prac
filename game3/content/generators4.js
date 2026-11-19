/* ---------------------------------------------------------------
   STORM ISLAND: fourth set of templates (David, Nov 2026: a fresh question bank aimed tightly at the
   skills in the sample questions he shared). Each redraws itself with new numbers every time:
   balance-scale methods, a ruler on a map, chains of number sentences, the fraction closest to a
   whole number, regrouping place value, estimating change by rounding, packing cubes into shapes,
   water rising, odd/even rules, dot-grid areas, the tallest stack of turned blocks, hidden cards,
   a container with an unusual scale, undoing a number machine, chained swap rates, which layer the
   last item is in, bags with a mass limit, round-robin matches, giving to make equal, and matching
   shaded fractions of two differently cut squares.
   tools/check_game3.js works every answer out again by its own method.
   --------------------------------------------------------------- */
(() => {
  const { T, fig, opts, gen, blocks, frac, NAMES } = LIB;
  const B = s => `<b>${s}</b>`;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const sp = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const ord = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
  const mix = (R, list) => { const o = R.shuffle(list); return { options: o, answer: o.indexOf(list[0]) }; };

  /* ---------- which group is the last item in (David: "an important one, hit it from various angles") ---------- */
  const GROUPS = [["Maisy", "bricks", "brick", "layer", "lays", "building a wall one layer at a time"], ["Omar", "chairs", "chair", "row", "sets out", "setting out chairs in rows for a concert"],
    ["Pia", "eggs", "egg", "carton", "packs", "packing eggs into cartons"], ["Theo", "photos", "photo", "page", "sticks in", "filling an album page by page"],
    ["Isla", "seeds", "seed", "tray", "plants", "planting seeds in trays"], ["Leo", "cupcakes", "cupcake", "box", "packs", "packing cupcakes into boxes"]];
  gen("lastgroup", "maths", 2, "Number & place value", R => {
    const [who, items, item, grp, verb, doing] = R.pick(GROUPS), k = R.int(4, 9), m = R.int(3, 8), ask = R.pick(["which", "which", "more", "full"]);
    const r = ask === "more" ? R.int(1, k - 1) : R.chance(0.2) ? 0 : R.int(1, k - 1), N = m * k + r;
    const which = r ? m + 1 : m, rule = `${who} is ${doing}. Each ${grp} holds ${B(k)} ${items}, and she always fills one ${grp} before starting the next. She has ${B(N)} ${items} and uses them all.`.replace(/she always/, who === "Omar" || who === "Theo" || who === "Leo" ? "he always" : "she always");
    let o, stem, why, how;
    if (ask === "which") {
      o = opts(R, which, [m, r ? m + 2 : m + 1, r || m - 1, which - 1, k], ord);
      stem = `<p>${rule}</p><p>Which ${grp} is being filled when the last ${item} goes in?</p>`;
      how = `${N} ÷ ${k} = ${m} remainder ${r}. ${r ? `So ${m} ${grp}s are full and ${r} ${items} are left over. They go into the next ${grp}: the ${B(ord(which))}.` : `There is no remainder: the last ${item} exactly finishes the ${B(ord(m))} ${grp}, so there is no next ${grp}.`}`;
      why = r ? `${ord(m)} counts only the full ${grp}s, forgetting the ${r} left over still have to go somewhere. ${ord(r)} is the remainder, not a ${grp} number.` : `${ord(m + 1)} rounds up by habit, but with no remainder there is nothing to put in another ${grp}.`;
    } else if (ask === "full") {
      o = opts(R, m, [which === m ? m + 1 : which, r || m - 1, m - 1, k, m + 2]);
      stem = `<p>${rule}</p><p>How many ${grp}s are completely full?</p>`;
      how = `${N} ÷ ${k} = ${m} remainder ${r}: ${B(m)} full ${grp}s${r ? `, and ${r} ${items} in a ${grp} that isn’t full` : ""}.`;
      why = `${r ? `${m + 1} counts the part-filled ${grp} as full.` : ""} The remainder (${r}) is how many ${items} are left over, not how many ${grp}s.`;
    } else {
      o = opts(R, k - r, [r, k, m + 1, k - r + 1, k - r - 1]);
      stem = `<p>${rule}</p><p>When she has used them all, how many more ${items} would she need to fill the last ${grp}?</p>`.replace("When she", who === "Omar" || who === "Theo" || who === "Leo" ? "When he" : "When she").replace("would she", who === "Omar" || who === "Theo" || who === "Leo" ? "would he" : "would she");
      how = `${N} ÷ ${k} = ${m} remainder ${r}. The last ${grp} has ${r} ${items}, so it needs ${k} − ${r} = ${B(k - r)} more.`;
      why = `${r} is how many are already in the last ${grp}, not how many more it needs. ${ord(m + 1)} is which ${grp} it is.`;
    }
    return { ...o, data: { k, N, ask },
      stem, explain: `<p>${how}</p><p class="why-not">${why}</p>` };
  });

  /* ---------- chained swap rates (David: important) ---------- */
  const UNITS = [["squigs", "zots", "grozzles"], ["shells", "beads", "pearls"], ["acorns", "pinecones", "feathers"], ["buttons", "marbles", "stickers"], ["pebbles", "keys", "coins"]];
  gen("swaprate", "maths", 3, "Rates", R => {
    let a, b, c, d;
    do { a = R.int(2, 9); b = R.int(2, 6); c = R.int(2, 6); d = R.int(2, 9); } while (a === b || c === d || gcd(a, b) > 1 || gcd(c, d) > 1);
    const [A, Bn, C] = R.pick(UNITS), back = R.chance(0.35);
    let N, ans, mid, wrongs, stem, how;
    if (!back) {      // N of C → how many A?   N C = N·c/d B = N·c·a/(d·b) A
      const s = R.int(1, 2), t = (b / gcd(b, c)) * s; N = d * t; mid = t * c; ans = mid * a / b;
      wrongs = [mid, N * a / b, Math.round(N * d / c * a / b) === N * d / c * a / b ? N * d / c * a / b : null, N * a, ans / a * b].filter(x => x && Number.isInteger(x));
      stem = `<p>Children on an island trade with ${A}, ${Bn} and ${C}:</p><div class="box">${a} ${A} are worth ${b} ${Bn}<br>${c} ${Bn} are worth ${d} ${C}</div><p>How many ${A} are ${B(N + " " + C)} worth?</p>`;
      how = `Go through ${Bn}. ${N} ${C} is ${N / d} lots of ${d} ${C}, so it is worth ${N / d} × ${c} = ${B(mid + " " + Bn)}. ${mid} ${Bn} is ${mid / b} lots of ${b} ${Bn}, so it is worth ${mid / b} × ${a} = ${B(ans + " " + A)}.`;
    } else {          // X of A → how many C?   X A = X·b/a B = X·b·d/(a·c) C
      const s = R.int(1, 2), u = (c / gcd(b, c)) * s; N = a * u; mid = u * b; ans = mid * d / c;
      wrongs = [mid, N * d / c, N * b / a * c / d, N * d, ans + d].filter(x => x && Number.isInteger(x));
      stem = `<p>Children on an island trade with ${A}, ${Bn} and ${C}:</p><div class="box">${a} ${A} are worth ${b} ${Bn}<br>${c} ${Bn} are worth ${d} ${C}</div><p>How many ${C} are ${B(N + " " + A)} worth?</p>`;
      how = `Go through ${Bn}. ${N} ${A} is ${N / a} lots of ${a} ${A}, so it is worth ${N / a} × ${b} = ${B(mid + " " + Bn)}. ${mid} ${Bn} is ${mid / c} lots of ${c} ${Bn}, so it is worth ${mid / c} × ${d} = ${B(ans + " " + C)}.`;
    }
    const o = opts(R, ans, wrongs);
    return { ...o, data: { a, b, c, d, N, back },
      stem, explain: `<p>${how}</p><p class="why-not">${mid} is the answer in ${Bn}: one step short. Using only one of the rules, or turning a rule round (dividing where you should multiply), gives the other numbers. Always swap into the middle kind first.</p>` };
  });

  /* ---------- matching shaded fractions of two differently cut squares (David: important) ---------- */
  function cutSquare(kind, shaded, S = 150) {
    const o = 6, e = o + S, m = o + S / 2;
    const parts = {
      tri4: [[[o, o], [e, o], [m, m]], [[e, o], [e, e], [m, m]], [[e, e], [o, e], [m, m]], [[o, e], [o, o], [m, m]]],
      tri8: [[[o, o], [m, o], [m, m]], [[m, o], [e, o], [m, m]], [[e, o], [e, m], [m, m]], [[e, m], [e, e], [m, m]], [[e, e], [m, e], [m, m]], [[m, e], [o, e], [m, m]], [[o, e], [o, m], [m, m]], [[o, m], [o, o], [m, m]]],
      strip4: [0, 1, 2, 3].map(i => [[o + i * S / 4, o], [o + (i + 1) * S / 4, o], [o + (i + 1) * S / 4, e], [o + i * S / 4, e]]),
      strip8: [0, 1, 2, 3, 4, 5, 6, 7].map(i => [[o + i * S / 8, o], [o + (i + 1) * S / 8, o], [o + (i + 1) * S / 8, e], [o + i * S / 8, e]]),
      quad4: [[[o, o], [m, o], [m, m], [o, m]], [[m, o], [e, o], [e, m], [m, m]], [[m, m], [e, m], [e, e], [m, e]], [[o, m], [m, m], [m, e], [o, e]]],
    }[kind];
    const g = parts.map((p, i) => `<polygon class="part${shaded.includes(i) ? " on" : ""}" points="${p.map(q => q.join(",")).join(" ")}" fill="${shaded.includes(i) ? "#868e96" : "#fff"}" stroke="${INK}" stroke-width="2"/>`).join("");
    return { svg: g, n: parts.length };
  }
  function gridSquare(n, cells, S = 150) {
    const u = S / n; let g = "";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const on = cells.includes(y * n + x); g += `<rect class="cell${on ? " on" : ""}" x="${6 + x * u}" y="${6 + y * u}" width="${u}" height="${u}" fill="${on ? "#868e96" : "#fff"}" stroke="${INK}" stroke-width="1"/>`; }
    return g + `<rect x="6" y="6" width="${S}" height="${S}" fill="none" stroke="${INK}" stroke-width="3"/>`;
  }
  gen("shadematch", "maths", 3, "Fractions", R => {
    let n, kind, p, s, target, q;
    do {
      n = R.pick([4, 6, 8, 10]); kind = R.pick(["tri4", "tri8", "strip4", "strip8", "quad4"]); p = kind.endsWith("8") ? 8 : 4;
      s = R.int(1, p - 1); target = n * n * s / p; q = R.int(1, Math.max(1, Math.floor(target) - 2));
    } while (!Number.isInteger(target) || target - q < 2 || gcd(s, p) === p);
    const cells = R.shuffle([...Array(n * n).keys()]).slice(0, q), parts = R.shuffle([...Array(p).keys()]).slice(0, s);
    const Y = cutSquare(kind, parts), name = { tri4: "4 equal triangles", tri8: "8 equal triangles", strip4: "4 equal strips", strip8: "8 equal strips", quad4: "4 equal squares" }[kind];
    const pic = fig(`<svg viewBox="0 0 340 186" width="330" role="img" aria-label="Two identical squares. Square X is a ${n} by ${n} grid of small squares with ${q} shaded. Square Y is cut into ${name}, with ${s} shaded."><g>${gridSquare(n, cells)}</g><g transform="translate(176,0)">${Y.svg}</g>${T(81, 180, "square X", 'text-anchor="middle"')}${T(257, 180, "square Y", 'text-anchor="middle"')}</svg>`);
    const o = opts(R, target - q, [target, s, p - s, target - s, n * n - target - q, q]);
    return { ...o, data: { n, p, s, q },
      stem: `<p>Two identical squares. Square X is cut into ${B(n * n)} equal small squares. Square Y is cut into ${B(name)}. Some parts are shaded.</p>${pic}<p>How many ${B("more")} small squares must be shaded on X so that both squares have the same area shaded?</p>`,
      explain: `<p>On Y, ${s} of the ${p} equal parts are shaded: ${frac(s, p)} of the square. ${frac(s, p)} of ${n * n} small squares is ${n * n} ÷ ${p} × ${s} = ${target}.</p><p>X already has ${q} shaded, so it needs ${target} − ${q} = ${B(target - q)} more.</p><p class="why-not">${target} is how many squares should be shaded altogether, not how many more. ${s} just counts the shaded parts of Y, which are much bigger than X’s small squares.</p>` };
  });

  /* ---------- area on a dot grid from a reference shape ---------- */
  gen("dotarea", "maths", 2, "Area, perimeter & 3D", R => {
    let a, b, c, d; const u = R.pick([1, 2, 3, 4]);
    do { a = R.int(1, 3); b = R.int(1, 2); c = R.int(2, 4); d = R.int(3, 5); } while (a * b === c * d);
    const ref = a * b * u, ans = c * d * u, gx = 13, gy = 7, s = 24;
    let g = ""; for (let x = 0; x < gx; x++) for (let y = 0; y < gy; y++) g += `<circle cx="${14 + x * s}" cy="${14 + y * s}" r="2.6" fill="${INK}"/>`;
    const rect = (x, y, w, h, lbl) => `<rect class="shape" data-w="${w}" data-h="${h}" x="${14 + x * s}" y="${14 + y * s}" width="${w * s}" height="${h * s}" fill="rgba(77,171,247,.25)" stroke="#1c7ed6" stroke-width="3"/>` + T(14 + (x + w / 2) * s, 8 + y * s, lbl, 'text-anchor="middle" font-size="13" font-weight="700"');
    const pic = fig(`<svg viewBox="0 0 320 170" width="320" role="img" aria-label="A dot grid. Shape P is a rectangle ${a} gaps wide and ${b} gaps tall. Shape Q is a rectangle ${c} gaps wide and ${d} gaps tall.">${g}${rect(1, 1, a, b, "P")}${rect(6, 1, c, d, "Q")}</svg>`);
    const o = opts(R, ans, [(c + 1) * (d + 1) * u, c * d, 2 * (c + d) * u, (c + 1) * (d + 1), ans / u * ref]);
    return { ...o, data: { a, b, c, d, u }, stem: `<p>Shape P has an area of ${B(ref + " cm²")}.</p>${pic}<p>What is the area of shape Q?</p>`,
      explain: `<p>P covers ${a} × ${b} = ${a * b} grid square${a * b > 1 ? "s" : ""}, so one grid square is ${ref} ÷ ${a * b} = ${B(u + " cm²")}.</p><p>Q covers ${c} × ${d} = ${c * d} grid squares: ${c * d} × ${u} = ${B(ans + " cm²")}.</p><p class="why-not">Count the gaps between the dots, not the dots (that gives ${c + 1} × ${d + 1}). ${u === 1 ? "" : `${c * d} forgets that each grid square is ${u} cm², not 1 cm². `}Counting around the edge gives a perimeter, not an area.</p>` };
  });

  /* ---------- a container with an unusual scale (only the ends labelled) ---------- */
  gen("oddscale", "maths", 2, "Measurement & scales", R => {
    let m, n, j, L;
    do { m = R.pick([2, 4, 5, 25]); n = R.pick([8, 10, 12, 16, 20]); L = R.pick([2, 4, 5]); j = R.int(2, n - 1); } while (n % L || j % L === 0 || (m === 25 && n > 12));
    const top = m * n, level = m * j, H = 220, y = v => 236 - v * H / n;
    let g = `<rect x="70" y="14" width="80" height="226" fill="#fff" stroke="${INK}" stroke-width="2.5"/><rect x="72" y="${y(j)}" width="76" height="${238 - y(j)}" fill="#a5d8ff"/>`;
    for (let i = 0; i <= n; i++) { const big = i % L === 0; g += `<line class="tick" x1="${big ? 52 : 58}" x2="${big ? 74 : 68}" y1="${y(i)}" y2="${y(i)}" stroke="${INK}" stroke-width="${big ? 2.6 : 1.6}"/>`; }
    g += `<line x1="63" x2="63" y1="${y(n)}" y2="${y(0)}" stroke="${INK}" stroke-width="2"/>` + T(80, y(n) + 16, top + " mL", 'font-weight="700"') + T(80, y(0) - 4, "0", 'font-weight="700"');
    const pic = fig(`<svg viewBox="0 0 200 250" width="170" role="img" aria-label="A tall container with a scale from 0 at the bottom to ${top} mL at the top. Only 0 and ${top} mL are labelled. There are ${n} equal gaps between the marks, with a longer mark every ${L} gaps. The water reaches mark number ${j} above 0.">${g}</svg>`);
    const o = opts(R, level, [j, m * (j + 1), top - level, level + m, Math.round(j / n * 100) === j / n * 100 ? j / n * 100 : null].filter(Boolean), v => v + " mL");
    return { ...o, data: { m, n, j }, stem: `<p>This container has an unusual scale: only the bottom and the top are labelled.</p>${pic}<p>How much water is in it?</p>`,
      explain: `<p>From 0 to ${top} mL there are ${n} equal gaps, so each small gap is ${top} ÷ ${n} = ${m} mL (and each longer mark is ${L * m} mL more than the last).</p><p>The water is ${j} gaps up: ${j} × ${m} = ${B(level + " mL")}.</p><p class="why-not">${j} mL counts every mark as 1 mL. ${m * (j + 1)} mL counts the marks instead of the gaps between them. ${top - level} mL reads down from the top.</p>` };
  });

  /* ---------- a ruler on a map ---------- */
  gen("mapruler", "maths", 2, "Measurement & scales", R => {
    const s = R.pick([5, 10, 20, 25, 50]), p0 = R.pick([0, 0, 10, 20, 30]), cm = R.int(4, 13), p1 = p0 + cm * 10 + ([10, 20, 50].includes(s) ? R.pick([0, 0, 5]) : 0);
    const mm = p1 - p0, ans = mm / 10 * s, X = v => 20 + v * 2.2, len = 200;
    let g = `<rect x="14" y="70" width="${X(len) - 8}" height="40" rx="3" fill="#fff3bf" stroke="${INK}" stroke-width="2"/>`;
    for (let v = 0; v <= len; v += 5) { const big = v % 10 === 0; g += `<line x1="${X(v)}" x2="${X(v)}" y1="70" y2="${big ? 84 : 78}" stroke="${INK}" stroke-width="${big ? 1.6 : 1}"/>`; if (v % 20 === 0) g += T(X(v), 100, v, 'text-anchor="middle" font-size="10"'); }
    g += T(X(len) - 10, 120, "mm", 'font-size="11"');
    const mk = (v, lbl) => `<text x="${X(v)}" y="58" text-anchor="middle" font-size="20" font-weight="700" fill="#e03131">✕</text><line x1="${X(v)}" x2="${X(v)}" y1="60" y2="84" stroke="#e03131" stroke-width="1.5" stroke-dasharray="3 2"/>` + T(X(v), 30, lbl, 'text-anchor="middle" font-size="13" font-weight="700"');
    const [a, b] = R.pick([["Tree house", "Gate"], ["Ava’s tent", "Lake"], ["School", "Library"], ["Barn", "Well"]]);
    const pic = fig(`<svg viewBox="0 0 480 128" width="470" role="img" aria-label="A ruler marked in millimetres from 0 to 200 lies on a map. The ${a} is at the ${p0} mm mark and the ${b} is at the ${p1} mm mark.">${g}${mk(p0, a)}${mk(p1, b)}</svg>`);
    const o = opts(R, ans, [mm * s, p1 / 10 * s, mm / 10, mm, (cm + 1) * s].filter(x => x !== ans), v => sp(v) + " m");
    return { ...o, data: { s, p0, p1 }, stem: `<p>A ruler marked in ${B("millimetres")} is laid across a map. The map’s scale is ${B(`1 cm = ${s} m`)}.</p>${pic}<p>How far apart are the ${a} and the ${b} in real life?</p>`,
      explain: `<p>On the ruler the distance is ${p1} − ${p0} = ${mm} mm = ${mm / 10} cm. Each centimetre is ${s} m: ${mm / 10} × ${s} = ${B(sp(ans) + " m")}.</p><p class="why-not">${sp(mm * s)} m forgets to change millimetres into centimetres first (10 times too big).${p0 ? ` ${sp(p1 / 10 * s)} m reads only the second mark and forgets the ruler doesn’t start at the ${a}.` : ""}</p>` };
  });

  /* ---------- chains of number sentences sharing boxes ---------- */
  gen("numchain", "maths", 2, "Number & place value", R => {
    let a, b, c, d, f, e, g, h, ok;
    do {
      a = R.int(6, 30); b = R.int(4, 25); c = a + b; d = R.int(2, Math.min(15, c - 2)); e = c - d; f = R.pick([2, 3, 4, 5]); g = e * f; h = R.int(3, g - 2); ok = g - h > 0 && e > 1;
    } while (!ok);
    const back = R.chance(0.5), mid = R.chance(0.3);
    const ans = back ? a : mid ? e : g - h;
    const box = (v, hi) => `<span class="nb${hi ? " hi" + hi : ""}">${v}</span>`, Q = "▲";
    const A_ = back ? Q : a, C_ = back ? "?" : c, E_ = back ? "?" : mid ? Q : e, G_ = g, L_ = back || mid ? g - h : Q;
    const rows = [`${box(A_)} + ${box(b)} = ${box(C_, 1)}`, `${box(C_, 1)} − ${box(d)} = ${box(E_, 2)}`, `${box(E_, 2)} × ${box(f)} = ${box(G_, 3)}`, `${box(G_, 3)} − ${box(h)} = ${box(L_)}`];
    const stem = `<p>Each line is a correct number sentence. A number in a coloured box carries on into the next line${back ? " (each ? is a number you don’t know yet)" : ""}.</p><div class="box chain">${rows.join("<br>")}</div><p>What number does ${B(Q)} stand for?</p>`;
    const wrongs = back ? [c, c + b, g / f + d + b, e, a + d] : mid ? [c, g / f + 1, g, c + d, e + f] : [g, e, g + h, e * f + h, c * f - h];
    const o = opts(R, ans, wrongs);
    const S1 = back ? `Work backwards from the bottom: ${g - h} + ${h} = ${g}; ${g} ÷ ${f} = ${e}; ${e} + ${d} = ${c}; ${c} − ${b} = ${B(a)}.` : mid ? `${a} + ${b} = ${c}, then ${c} − ${d} = ${B(e)}. (Check: ${e} × ${f} = ${g}.)` : `${a} + ${b} = ${c}. ${c} − ${d} = ${e}. ${e} × ${f} = ${g}. ${g} − ${h} = ${B(g - h)}.`;
    return { ...o, data: { a, b, d, f, h, back, mid },
      stem,
      explain: `<p>Follow the chain one line at a time: each answer becomes the start of the next line.</p><p>${S1}</p><p class="why-not">Stopping one line early gives a number from the middle of the chain. ${back ? "Going backwards, use the opposite operation: × becomes ÷, + becomes −." : "Watch the operation change at each line."}</p>` };
  });

  /* ---------- the mixed number closest to a whole number ---------- */
  gen("closest", "maths", 2, "Fractions", R => {
    let w, list, d, best, far;
    do {
      w = R.int(2, 6); far = R.chance(0.25); const seen = new Set(); list = [];
      while (list.length < 5) { const den = R.pick([2, 3, 4, 5, 6, 8, 10]), num = R.int(1, den - 1); if (gcd(num, den) > 1) continue; const below = R.chance(0.5), v = below ? w - 1 + num / den : w + num / den, key = v.toFixed(6); if (seen.has(key)) continue; seen.add(key); list.push([below ? w - 1 : w, num, den, v]); }
      d = list.map(x => Math.abs(x[3] - w)); best = far ? Math.max(...d) : Math.min(...d);
    } while (d.filter(x => Math.abs(x - best) < 1e-9).length !== 1 || !list.some(x => x[0] === w - 1) || !list.some(x => x[0] === w));
    list.sort((p, q) => p[3] - q[3]);
    const dd = list.map(x => Math.abs(x[3] - w)), ans = dd.findIndex(x => Math.abs(x - best) < 1e-9);
    const show = x => `${x[0]} ${frac(x[1], x[2])}`;
    const gap = x => x[0] === w - 1 ? `${frac(x[2] - x[1], x[2])} below` : `${frac(x[1], x[2])} above`;
    return { options: list.map(show), answer: ans, data: { w, list: list.map(x => x.slice(0, 3)), far },
      stem: `<p>Which number is ${B(far ? "furthest from" : "closest to")} ${B(w)}?</p>`,
      explain: `<p>Find how far each one is from ${w}:</p><p>${list.map(x => `${show(x)} is ${gap(x)}`).join("<br>")}</p><p>The ${far ? "biggest" : "smallest"} gap is ${B(show(list[ans]))}.</p><p class="why-not">Look at the gap, not the size of the fraction: a number just below ${w} like ${w - 1} ${frac(7, 8)} is very close even though ${frac(7, 8)} is big. And compare gaps with different denominators carefully: ${frac(1, 3)} is bigger than ${frac(1, 4)}.</p>` };
  });

  /* ---------- regrouping place value ---------- */
  gen("regroup", "maths", 1, "Number & place value", R => {
    const th = R.int(2, 15), h = R.int(8, 25), t = R.int(8, 30), o = R.int(5, 25), ans = th * 1000 + h * 100 + t * 10 + o;
    const naive = th * 1000 + (h % 10) * 100 + (t % 10) * 10 + (o % 10), sum = th + h + t + o;
    const ox = opts(R, ans, [naive, ans - 100, ans + 900, ans - 10, sum * 100], sp, 5, 10);
    return { ...ox, data: { th, h, t, o }, stem: `<p>What number do you get if you add ${B(`${th} thousands, ${h} hundreds, ${t} tens and ${o} ones`)}?</p>`,
      explain: `<p>Change each part into its value and add: ${sp(th * 1000)} + ${sp(h * 100)} + ${t * 10} + ${o} = ${B(sp(ans))}.</p><p class="why-not">A place can only hold one digit, so ${h} hundreds is ${Math.floor(h / 10)} thousand${Math.floor(h / 10) > 1 ? "s" : ""} and ${h % 10} hundreds. ${sp(naive)} keeps only the last digit of each count and forgets to carry the extra across.</p>` };
  });

  /* ---------- estimating change by rounding each price first ---------- */
  gen("estchange", "maths", 2, "Money & best value", R => {
    let p, note, est;
    do { p = [0, 1, 2].map(() => R.int(1, 9) * 100 + R.pick([5, 15, 20, 35, 45, 55, 65, 80, 85, 95])); note = R.pick([2000, 2000, 5000]); est = p.reduce((s, x) => s + Math.round(x / 100) * 100, 0); } while (note - est < 100 || note - est > 4000);
    const exact = note - p.reduce((a, b) => a + b, 0), trunc = note - p.reduce((s, x) => s + Math.floor(x / 100) * 100, 0), roundTot = note - Math.round(p.reduce((a, b) => a + b, 0) / 100) * 100;
    const ans = (note - est) / 100, o = opts(R, ans, [trunc / 100, Math.round(exact / 100), roundTot / 100, est / 100, ans + 1], v => "$" + v);
    const tag = x => `<span class="nb">$${(x / 100).toFixed(2)}</span>`;
    return { ...o, data: { p, note }, stem: `<p>Zane has a ${B("$" + note / 100)} note. He buys three things: ${p.map(tag).join(" ")}</p><p>To estimate, he ${B("rounds each price to the nearest dollar")} and adds the rounded prices.</p><p>How much change does he ${B("estimate")} he will get?</p>`,
      explain: `<p>Round each price: ${p.map(x => `$${(x / 100).toFixed(2)} → $${Math.round(x / 100)}`).join(", ")}. Estimated total: $${est / 100}. Estimated change: $${note / 100} − $${est / 100} = ${B("$" + ans)}.</p><p class="why-not">$${trunc / 100} chops off the cents instead of rounding (so every price goes down). Rounding the exact total, or working out the exact change, isn’t the method he used. $${est / 100} is the total, not the change.</p>` };
  });

  /* ---------- packing the cubes from blocks into small shapes ---------- */
  const SHAPES = { 3: [[0, 0, 0], [1, 0, 0], [0, 0, 1]], 4: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [1, 0, 1]], 5: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1], [2, 0, 1]] };
  gen("cubepack", "maths", 2, "Area, perimeter & 3D", R => {
    let x, y, z, k, s, total;
    do { x = R.int(3, 6); y = R.int(2, 4); z = R.int(1, 2); k = R.int(1, 2); s = R.pick([3, 4, 5]); total = k * x * y * z; } while (total % s === 0 && R.chance(0.6) || total < 2 * s);
    const cells = []; for (let i = 0; i < x; i++) for (let j = 0; j < y; j++) for (let l = 0; l < z; l++) cells.push([i, j, l]);
    const ans = Math.floor(total / s), visible = x * y + (z > 1 ? x : 0);
    const o = opts(R, ans, [Math.ceil(total / s) === ans ? ans + 1 : Math.ceil(total / s), Math.floor(x * y * z / s), Math.floor(k * visible / s) === ans ? null : Math.floor(k * visible / s), total, Math.floor(total / (s - 1))].filter(Boolean));
    const one = fig(blocks(cells, { u: 22, aria: `A block of small cubes, ${x} long, ${y} deep and ${z} high.` }));
    return { ...o, data: { x, y, z, k, s }, stem: `<p>${R.pick(NAMES)} has ${k === 2 ? B("two") + " blocks like this" : "this block"}, made of identical small cubes:</p>${one}<p>The block${k === 2 ? "s are" : " is"} broken up and the cubes are used to make this shape:</p>${fig(blocks(SHAPES[s], { u: 26, aria: `A small shape made of ${s} cubes.` }))}<p>How many of these shapes can be made?</p>`,
      explain: `<p>${k === 2 ? "Each block" : "The block"} has ${x} × ${y} × ${z} = ${x * y * z} cubes${k === 2 ? `, so two blocks have ${total}` : ""}. Each shape uses ${s} cubes: ${total} ÷ ${s} = ${ans}${total % s ? ` remainder ${total % s}` : ""}. So ${B(ans)} shapes${total % s ? ` (the ${total % s} cubes left over aren’t enough for another)` : ""}.</p><p class="why-not">${z > 1 ? "Count the hidden layer too, not only the cubes you can see. " : ""}${k === 2 ? `${Math.floor(x * y * z / s)} uses only one block. ` : ""}You can’t round up: a part-shape doesn’t count.</p>` };
  });

  /* ---------- water rising as objects are dropped in ---------- */
  gen("waterrise", "maths", 2, "Measurement & scales", R => {
    const S = R.pick([100, 150, 200, 250, 300]), k = R.int(2, 4), r = R.pick([10, 15, 20, 25, 30]), L = S + k * r, m = R.int(2, 6), ans = L + m * r;
    const [who, thing] = R.pick([["Noah", "marbles"], ["Gia", "metal nuts"], ["Remy", "stones"], ["Suki", "identical blocks"]]);
    const o = opts(R, ans, [S + m * r, L + m * L / k, L + (k + m) * r, m * r, L + m * (L - S)].filter(v => Number.isInteger(v)), v => v + " mL", 5, 5);
    return { ...o, data: { S, k, L, m }, stem: `<p>${who} has a measuring jug with ${B(S + " mL")} of water. ${who} drops in ${B(k)} ${thing} and they sink. The water rises to ${B(L + " mL")}.</p><p>${who} then drops in ${B(m)} more of the same ${thing}. What is the new water level?</p>`,
      explain: `<p>${k} ${thing} raised the water ${L} − ${S} = ${L - S} mL, so one raises it ${r} mL. ${m} more raise it ${m} × ${r} = ${m * r} mL more: ${L} + ${m * r} = ${B(ans + " mL")}.</p><p class="why-not">${S + m * r} mL adds the rise to the starting level and forgets the first ${k} ${thing} are still in the jug. Treating ${L} mL as the rise for ${k} ${thing} forgets the water that was already there.</p>` };
  });

  /* ---------- an odd/even rule applied several times ---------- */
  const RULES = [["If the number is odd, add 1. If it is even, divide by 2.", x => x % 2 ? x + 1 : x / 2],
    ["If the number is odd, subtract 1. If it is even, divide by 2.", x => x % 2 ? x - 1 : x / 2],
    ["If the number is even, halve it. If it is odd, add 5.", x => x % 2 ? x + 5 : x / 2],
    ["If the number is a multiple of 3, divide it by 3. Otherwise, add 2.", x => x % 3 ? x + 2 : x / 3]];
  gen("rulesteps", "maths", 2, "Patterns & sequences", R => {
    let ri, x0, n, chain;
    do { ri = R.int(0, RULES.length - 1); x0 = R.int(21, 99); n = R.int(4, 6); chain = [x0]; for (let i = 0; i < n + 1; i++) chain.push(RULES[ri][1](chain[chain.length - 1])); } while (new Set(chain.slice(0, n + 1)).size < n + 1 || chain[n] < 1 || chain[n] === chain[n - 1] || chain[n] === chain[n + 1]);
    const ans = chain[n], o = opts(R, ans, [chain[n - 1], chain[n + 1], chain[n - 2], RULES[ri][1](ans) === ans + 1 ? null : ans + 1].filter(v => v > 0));
    return { ...o, data: { ri, x0, n }, stem: `<p>${R.pick(NAMES)} starts with ${B(x0)} and follows this instruction ${B(n + " times")}:</p><div class="box">${RULES[ri][0]}</div><p>What number does she have at the end?</p>`,
      explain: `<p>Check the rule again after every step:</p><p>${chain.slice(0, n + 1).join(" → ")}</p><p>After ${n} steps the number is ${B(ans)}.</p><p class="why-not">${chain[n - 1]} stops one step early and ${chain[n + 1]} goes one step too far. Count the arrows, not the numbers. Each time, check whether the new number is odd or even (or a multiple of 3) before choosing what to do.</p>` };
  });

  /* ---------- the tallest (or shortest) stack of turned blocks ---------- */
  gen("tallstack", "maths", 2, "Area, perimeter & 3D", R => {
    let dims, tall;
    do { dims = [0, 1, 2].map(() => [R.int(2, 9), R.int(2, 9), R.int(2, 9)]); tall = R.chance(0.7); } while (dims.some(d => new Set(d).size < 3));
    const ans = dims.reduce((s, d) => s + (tall ? Math.max(...d) : Math.min(...d)), 0), drawn = dims.reduce((s, d) => s + d[2], 0), all = dims.flat();
    const box3 = (d, x0) => { const [w, dp, h] = d, k = 6, W = w * k, D = dp * k * 0.5, Hh = h * k; const X = x0, Y = 150;
      return `<polygon points="${X},${Y} ${X + W},${Y} ${X + W},${Y - Hh} ${X},${Y - Hh}" fill="#ffe8cc" stroke="${INK}" stroke-width="2"/><polygon points="${X},${Y - Hh} ${X + D},${Y - Hh - D} ${X + W + D},${Y - Hh - D} ${X + W},${Y - Hh}" fill="#fff4e6" stroke="${INK}" stroke-width="2"/><polygon points="${X + W},${Y} ${X + W + D},${Y - D} ${X + W + D},${Y - Hh - D} ${X + W},${Y - Hh}" fill="#ffd8a8" stroke="${INK}" stroke-width="2"/>`
        + T(X + W / 2, Y + 16, w + " cm", 'text-anchor="middle" font-size="12"') + T(X + W + D + 4, Y - Hh / 2 - D / 2, h + " cm", 'font-size="12"') + T(X + W + D / 2 + 2, Y - D / 2 + 12, dp + " cm", 'font-size="12"'); };
    const pic = fig(`<svg viewBox="0 0 420 172" width="410" role="img" aria-label="Three blocks shaped like cuboids, not to scale. Block 1 is ${dims[0].join(" by ")} cm, block 2 is ${dims[1].join(" by ")} cm and block 3 is ${dims[2].join(" by ")} cm.">${box3(dims[0], 10)}${box3(dims[1], 150)}${box3(dims[2], 290)}</svg>`);
    const o = opts(R, ans, [drawn, dims.reduce((s, d) => s + [...d].sort((a, b) => a - b)[1], 0), 3 * (tall ? Math.max(...all) : Math.min(...all)), all.reduce((a, b) => a + b, 0)], v => v + " cm");
    return { ...o, data: { dims, tall }, stem: `<p>Three blocks (not drawn to scale):</p>${pic}<p>The blocks are stacked on top of each other to make a tower. Each block can be turned any way before it is stacked. What is the ${B(tall ? "tallest" : "shortest")} tower that can be made using all three?</p>`,
      explain: `<p>Each block can stand on any face, so use its ${tall ? "longest" : "shortest"} edge as its height: ${dims.map(d => tall ? Math.max(...d) : Math.min(...d)).join(" + ")} = ${B(ans + " cm")}.</p><p class="why-not">${drawn} cm just adds the heights as drawn. Using the ${tall ? "biggest" : "smallest"} number three times uses one block more than once. Adding every edge isn’t a height at all.</p>` };
  });

  /* ---------- two hidden cards with a known total ---------- */
  gen("hiddencards", "maths", 3, "Number & place value", R => {
    let known, T0, H, ask;
    do { known = [0, 1, 2, 3].map(() => R.int(1, 9)); H = R.int(5, 14); T0 = known.reduce((a, b) => a + b, 0) + H; ask = R.pick(["max", "max", "min", "pairs"]); } while ((ask === "min" && H % 2 === 0));
    const ans = ask === "max" ? H - 2 : ask === "min" ? 1 : Math.floor((H - 1) / 2);
    const wrongs = ask === "max" ? [H, H - 1, T0 - H, H - 3] : ask === "min" ? [0, 2, H - 2, H % 3 + 3] : [H - 1, H, Math.ceil((H - 1) / 2) + 1, H - 2];
    const o = opts(R, ans, wrongs);
    const cards = [known[0], "◆", known[1], known[2], "⬢", known[3]].map(c => `<span class="nb" style="min-width:34px;display:inline-block;text-align:center">${c}</span>`).join(" ");
    const q = ask === "max" ? `What is the ${B("largest")} possible difference between ◆ and ⬢?` : ask === "min" ? `What is the ${B("smallest")} possible difference between ◆ and ⬢?` : `◆ is ${B("smaller")} than ⬢. How many different pairs of numbers could they be?`;
    return { ...o, data: { known, H, ask }, stem: `<p>The six cards add up to ${B(T0)}. ◆ and ⬢ stand for two whole numbers that are ${B("greater than zero")}.</p><p style="font-size:20px">${cards}</p><p>${q}</p>`,
      explain: `<p>The four cards you can see add up to ${T0 - H}, so ◆ + ⬢ = ${T0} − ${T0 - H} = ${H}.</p><p>${ask === "max" ? `To make the difference as big as possible, make one as small as it can be (1): the other is ${H - 1}. Difference ${H - 1} − 1 = ${B(H - 2)}.` : ask === "min" ? `${H} is odd, so they can’t be equal. The closest they can be is ${(H - 1) / 2} and ${(H + 1) / 2}: difference ${B(1)}.` : `List them: ${Array.from({ length: Math.floor((H - 1) / 2) }, (_, i) => `${i + 1} and ${H - i - 1}`).join(", ")}. That is ${B(ans)} pairs.`}</p><p class="why-not">The numbers must be greater than zero, so 0 is not allowed${ask === "max" ? ` (that would give ${H})` : ""}.${ask === "pairs" ? " Pairs with ◆ bigger don’t count, because ◆ must be smaller; and ◆ can’t equal ⬢." : ""} ${H} is their total, not the answer.</p>` };
  });

  /* ---------- undoing a number machine, with a twist at the end ---------- */
  gen("undo", "maths", 2, "Number & place value", R => {
    let x, a, b, c, F, twist;
    do { x = R.int(11, 60); a = R.int(2, 9); b = R.pick([2, 3, 4, 5]); c = R.int(1, 20); F = (x + a) * b - c; twist = R.pick(["digits", "start", "double", "tens"]); } while (F < 20 || (twist === "tens" && x < 20));
    const digits = n => String(n).split("").reduce((s, d) => s + Number(d), 0);
    const tw = v => twist === "digits" ? digits(v) : twist === "start" ? v : twist === "double" ? 2 * v : Math.floor(v / 10);
    const fwd = (F - a) / b + c;   // undoing in the wrong order: −a ÷b +c
    const same = (F - c) * b - a;  // using the same operations
    const ans = tw(x), wrongs = [Number.isInteger(fwd) && fwd > 0 ? tw(Math.round(fwd)) : null, twist === "start" ? null : x, tw(Math.round((F + c) / b - a)), same > 0 ? tw(same) : null, tw(x + 1)].filter(v => v !== null && v > 0);
    const o = opts(R, ans, wrongs);
    const q = { digits: "What do you get if you add together the digits of the starting number?", start: "What was the starting number?", double: "What is double the starting number?", tens: "What is the tens digit of the starting number?" }[twist];
    return { ...o, data: { a, b, c, F, twist }, stem: `<p>${R.pick(NAMES)} follows these steps:</p><div class="box">Choose a starting number.<br>Add ${a}.<br>Multiply by ${b}.<br>Subtract ${c}.</div><p>The answer is ${B(F)}.</p><p>${q}</p>`,
      explain: `<p>Undo the steps in ${B("reverse order")}, doing the opposite each time: ${F} + ${c} = ${F + c}; ${F + c} ÷ ${b} = ${(F + c) / b}; ${(F + c) / b} − ${a} = ${x}. The starting number is ${x}${twist === "start" ? "" : `, so the answer is ${B(ans)}`}.</p><p class="why-not">Undoing in the original order, or doing the same operations again instead of the opposite ones, gives the wrong start.${twist === "start" ? "" : ` ${x} is the starting number itself, not what the question asks for.`}</p>` };
  });

  /* ---------- bags with a mass limit ---------- */
  gen("bagpack", "maths", 3, "Measurement & scales", R => {
    let n, g, Lk, per;
    do { n = R.int(12, 40); g = R.pick([150, 200, 250, 300, 350, 400, 450, 600]); Lk = R.pick([1, 1.5, 2, 2.5, 3]); per = Math.floor(Lk * 1000 / g); } while (per < 2 || per > 8 || n % per === 0 || Math.ceil(n * g / (Lk * 1000)) === Math.ceil(n / per));
    const ans = Math.ceil(n / per), split = Math.ceil(n * g / (Lk * 1000));
    const o = opts(R, ans, [split, Math.floor(n / per), per, ans + 1, Math.floor(n * g / (Lk * 1000))]);
    const what = R.pick(["boxes", "tins", "jars", "books"]);
    return { ...o, data: { n, g, Lk }, stem: `<p>${B(n)} ${what} are packed into bags. Each one has a mass of ${B(g + " g")}. Each bag can hold a mass of up to ${B(String(Lk).replace(".", ".") + " kg")}.</p><p>What is the smallest number of bags needed for all the ${what}?</p>`,
      explain: `<p>${Lk} kg = ${Lk * 1000} g. ${per} ${what} weigh ${per * g} g, but ${per + 1} would weigh ${(per + 1) * g} g, which is too much. So each bag takes ${per}.</p><p>${n} ÷ ${per} = ${Math.floor(n / per)} remainder ${n % per}: ${Math.floor(n / per)} full bags and one more for the last ${n % per}. That is ${B(ans)} bags.</p><p class="why-not">${split} divides the total mass (${n * g} g) by ${Lk * 1000} g, as if a ${what.slice(0, -1).replace(/xe$/, "x")} could be split between two bags. ${Math.floor(n / per)} forgets the last ${n % per}.</p>` };
  });

  /* ---------- round-robin matches, and cards where order matters ---------- */
  gen("roundrobin", "maths", 2, "Chance & counting", R => {
    const n = R.int(4, 9), ask = R.pick(["matches", "matches", "cards", "back"]), M = n * (n - 1) / 2;
    const ans = ask === "matches" ? M : ask === "cards" ? n * (n - 1) : n;
    const wrongs = ask === "matches" ? [n * (n - 1), n * n, M + n, n * (n - 1) / 2 - 1 + n === M ? null : (n - 1) * (n - 1)] : ask === "cards" ? [M, n * n, n * (n - 1) / 2 + n, (n - 1) * (n - 1)] : [n + 1, n - 1, M / 2, 2 * n];
    const o = opts(R, ans, wrongs.filter(v => v && Number.isInteger(v)));
    const stem = ask === "matches" ? `<p>${B(n)} children are in a table tennis competition. Each child plays ${B("every other child once")}.</p><p>How many matches are played altogether?</p>`
      : ask === "cards" ? `<p>${B(n)} friends each send a birthday card to ${B("every one")} of the others.</p><p>How many cards are sent altogether?</p>`
      : `<p>In a chess club, every player played every other player ${B("once")}. There were ${B(M)} games altogether.</p><p>How many players are in the club?</p>`;
    return { ...o, data: { n, ask }, stem,
      explain: ask === "cards" ? `<p>Each of the ${n} friends sends ${n - 1} cards: ${n} × ${n - 1} = ${B(ans)}. Here Ana-to-Ben and Ben-to-Ana are two different cards, so don’t halve.</p><p class="why-not">${M} halves, as for handshakes or matches. ${n * n} counts everyone sending a card to themselves.</p>`
        : `<p>The first player has ${n - 1} matches, the next ${n - 2} new ones, and so on: ${Array.from({ length: n - 1 }, (_, i) => n - 1 - i).join(" + ")} = ${M}.${ask === "back" ? ` So ${B(n)} players give ${M} games.` : ` That is ${B(M)} matches.`}</p><p class="why-not">${n} × ${n - 1} = ${n * (n - 1)} counts every match twice (once for each player), so halve it. ${n * n} counts players playing themselves.</p>` };
  });

  /* ---------- giving some away to make two amounts equal ---------- */
  gen("giveequal", "maths", 2, "Number & place value", R => {
    const [x, y] = R.shuffle(NAMES).slice(0, 2), g = R.int(4, 25), small = R.int(20, 120), big = small + 2 * g, tot = small + big, askBig = R.chance(0.6);
    const ans = askBig ? big : small, things = R.pick(["cards", "marbles", "stickers", "shells"]);
    const o = opts(R, ans, askBig ? [tot / 2 + g / 2 === Math.round(tot / 2 + g / 2) ? tot / 2 + g / 2 : null, small, tot / 2, (tot + g) / 2 === Math.round((tot + g) / 2) ? (tot + g) / 2 : null, big + g].filter(Boolean) : [big, tot / 2, small + g, small - g, tot / 2 - g / 2 === Math.round(tot / 2 - g / 2) ? tot / 2 - g / 2 : null].filter(v => v && v > 0));
    return { ...o, data: { g, tot, askBig }, stem: `<p>${x} and ${y} have ${B(tot)} ${things} altogether. If ${x} gave ${y} ${B(g)} ${things}, they would have the same number.</p><p>How many ${things} does ${askBig ? x : y} have now?</p>`,
      explain: `<p>Giving ${g} away makes them equal, so ${x} has ${g} + ${g} = ${2 * g} more than ${y} (${x} loses ${g} and ${y} gains ${g}).</p><p>Take the difference off the total and halve: (${tot} − ${2 * g}) ÷ 2 = ${small} for ${y}, and ${small} + ${2 * g} = ${big} for ${x}. The answer is ${B(ans)}.</p><p class="why-not">The difference is ${2 * g}, not ${g}: when ${x} gives ${g} away, the gap closes from both sides. ${tot / 2} is what each will have after the swap, not now.</p>` };
  });

  /* ---------- balance-scale methods ---------- */
  const COMBOS = [[1], [2], [3], [1, 2], [1, 3]], CL = c => c.length === 1 ? `method ${c[0]} only` : `methods ${c[0]} and ${c[1]} only`;
  gen("balance", "maths", 2, "Measurement & scales", R => {
    let left, right, D, truth, ms;
    do {
      left = [R.int(5, 20), R.int(5, 20)]; right = [R.int(10, 30)];
      D = left[0] + left[1] - right[0];
      truth = R.pick(COMBOS);
    } while (D === 0 || Math.abs(D) < 3 || Math.abs(D) > 15);
    const light = D > 0 ? "right" : "left", heavy = D > 0 ? "left" : "right", g = Math.abs(D);
    const make = ok => {
      const k = R.int(0, 2);
      if (ok) { const a = R.int(1, g - 1); return [[`Add ${g} kg on the ${light}.`, { [light]: g }], [`Add ${a} kg and ${g - a} kg on the ${light}.`, { [light]: g }], (() => { const x = R.int(2, 9); return [`Add ${x} kg on the ${heavy} and ${x + g} kg on the ${light}.`, { [heavy]: x, [light]: x + g }]; })()][k]; }
      const x = R.int(2, 9), y = g + R.pick([1, 2, 3]);
      return [[`Add ${g} kg on the ${heavy}.`, { [heavy]: g }], [`Add ${x} kg on the left and ${x} kg on the right.`, { left: x, right: x }], [`Add ${y} kg on the ${light}.`, { [light]: y }]][k];
    };
    ms = [1, 2, 3].map(i => make(truth.includes(i)));
    const o = { options: COMBOS.map(CL), answer: COMBOS.findIndex(c => c.join() === truth.join()) };
    const t = D > 0 ? 9 : -9, ly = 52 + t, ry = 52 - t;
    const hang = (cx, by, ws) => `<line x1="${cx}" y1="${by}" x2="${cx - 42}" y2="${by + 62}" stroke="#555" stroke-width="2"/><line x1="${cx}" y1="${by}" x2="${cx + 42}" y2="${by + 62}" stroke="#555" stroke-width="2"/><path d="M${cx - 50} ${by + 62} L${cx + 50} ${by + 62} L${cx + 40} ${by + 72} L${cx - 40} ${by + 72} Z" fill="#555"/>`
      + ws.map((w, k) => `<rect x="${cx - 22 * ws.length + k * 44 + 3}" y="${by + 32}" width="38" height="30" rx="4" fill="#ced4da" stroke="${INK}" stroke-width="1.5"/>` + T(cx - 22 * ws.length + k * 44 + 22, by + 52, w + " kg", 'text-anchor="middle" font-size="12" font-weight="700"')).join("");
    const pic = fig(`<svg viewBox="0 0 330 170" width="310" role="img" aria-label="A balance scale. The left pan holds ${left.join(" kg and ")} kg. The right pan holds ${right[0]} kg."><rect x="160" y="40" width="10" height="112" fill="#555"/><rect x="115" y="150" width="100" height="12" rx="4" fill="#555"/><line x1="70" y1="${ly}" x2="260" y2="${ry}" stroke="#555" stroke-width="7" stroke-linecap="round"/><circle cx="165" cy="52" r="7" fill="#555"/>${hang(70, ly, left)}${hang(260, ry, right)}</svg>`);
    return { ...o, data: { left, right, methods: ms.map(m => m[1]) },
      stem: `<p>These scales are not balanced.</p>${pic}<p>Which of these methods would make them balance?</p><div class="box">${ms.map((m, i) => `${i + 1}. ${m[0]}`).join("<br>")}</div>`,
      explain: `<p>The left side has ${left[0] + left[1]} kg and the right side ${right[0]} kg, so the ${light} side is ${g} kg lighter. A method works if it makes the ${light} side gain exactly ${g} kg more than the ${heavy} side.</p><p>${ms.map((m, i) => `${i + 1}: ${truth.includes(i + 1) ? "works" : "doesn’t work"}.`).join(" ")} So the answer is ${B(CL(truth))}.</p><p class="why-not">Adding the same amount to both sides doesn’t change the gap. Adding to the heavier side makes the gap bigger. Look at the gap, not the totals.</p>` };
  });
})();
