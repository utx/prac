/* ---------------------------------------------------------------
   RIDGE RUNNER: thinking templates (A–D): Clues and order, and Shapes in space.
   Order questions are solved by trying every arrangement, so a clue set is only used when the
   question has exactly one answer. Spatial questions are drawn from the same cells they are worked out from.
   --------------------------------------------------------------- */
(() => {
const { gen, shuffleOpts, whyNot, svg, T, cellsSvg, NAMES } = LIB;
const M = (track) => TRACKS.find(t => t.id === track).method;
const ex = (track, body, o) => `<p class="method"><b>Method:</b> ${M(track)}</p>${body}${whyNot(o)}`;

/* ---------- Clues and order ---------- */
const perms = a => a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p]));
/* clue kinds. pos = arrangement (array of names, index 0 = left / first) */
const where = (p, x) => p.indexOf(x);
const CLUES = {
  leftOf: (a, b) => ({ t: `${a} is somewhere to the left of ${b}.`, ok: p => where(p, a) < where(p, b) }),
  nextTo: (a, b) => ({ t: `${a} is next to ${b}.`, ok: p => Math.abs(where(p, a) - where(p, b)) === 1 }),
  notNext: (a, b) => ({ t: `${a} is not next to ${b}.`, ok: p => Math.abs(where(p, a) - where(p, b)) !== 1 }),
  end: (a) => ({ t: `${a} is at one end.`, ok: p => where(p, a) === 0 || where(p, a) === p.length - 1 }),
  notEnd: (a) => ({ t: `${a} is not at either end.`, ok: p => where(p, a) !== 0 && where(p, a) !== p.length - 1 }),
  justLeft: (a, b) => ({ t: `${a} is just to the left of ${b}.`, ok: p => where(p, b) - where(p, a) === 1 }),
  /* race words (index 0 = first place) */
  beat: (a, b) => ({ t: `${a} finished ahead of ${b}.`, ok: p => where(p, a) < where(p, b) }),
  twoBehind: (a, b) => ({ t: `${a} finished two places behind ${b}.`, ok: p => where(p, a) - where(p, b) === 2 }),
  justBefore: (a, b) => ({ t: `${a} finished just before ${b}.`, ok: p => where(p, b) - where(p, a) === 1 }),
  notLast: (a) => ({ t: `${a} was not last.`, ok: p => where(p, a) !== p.length - 1 }),
  notFirst: (a) => ({ t: `${a} did not win.`, ok: p => where(p, a) !== 0 })
};
/* add true clues one at a time until the asked place has only one possible person */
function buildClues(R, truth, kinds, askIdx, minClues, maxClues) {
  const names = truth.slice(), all = perms(names);
  for (let attempt = 0; attempt < 60; attempt++) {
    const clues = [];
    let sols = all;
    for (let k = 0; k < 40 && clues.length < maxClues; k++) {
      const kind = R.pick(kinds), a = R.pick(names), b = R.pick(names.filter(x => x !== a));
      const c = CLUES[kind](a, b);
      if (!c.ok(truth) || clues.some(x => x.t === c.t)) continue;
      const next = sols.filter(c.ok);
      if (next.length === sols.length) continue;                 // the clue must tell us something new
      clues.push(c); sols = next;
      const at = new Set(sols.map(p => p[askIdx]));
      if (at.size === 1 && clues.length >= minClues) return { clues, sols };
    }
  }
  return null;
}
const PLACES = ["first", "second", "third", "fourth", "fifth"];
gen("t-order-1", "order", 1, R => {
  const ppl = R.shuffle(NAMES).slice(0, 3), truth = R.shuffle(ppl);
  const b = buildClues(R, truth, ["leftOf", "end", "notEnd", "nextTo", "justLeft"], 1, 2, 2);
  if (!b) return null;
  const ctx = R.pick(["stand in a row for a photo", "sit on a bench", "line up at the canteen"]);
  const o = shuffleOpts(R, truth[1], [...ppl.filter(x => x !== truth[1]).map(x => [x, `${x} fits one clue but not both: try each name in the middle`]), ["More than one person could be in the middle", "the two clues together leave only one person for the middle"]]);
  return { form: "three", stem: `<p>${ppl.join(", ").replace(/, ([^,]*)$/, " and $1")} ${ctx}, from left to right.</p><ul class="clues">${b.clues.map(c => `<li>${c.t}</li>`).join("")}</ul><p>Who is in the <b>middle</b>?</p>`, ...o, data: { ppl, clues: b.clues.map(c => c.t), truth },
    explain: ex("order", `<p>Three boxes: ☐ ☐ ☐. Try each person in the middle and test both clues. Only <b>${truth[1]}</b> works: ${truth.join(" – ")}${b.sols.length > 1 ? " (the two ends can swap, but the middle is fixed)" : ""}.</p>`, o) };
});
gen("t-order-2", "order", 2, R => {
  const ppl = R.shuffle(NAMES).slice(0, 4), truth = R.shuffle(ppl), ask = R.int(0, 3);
  const b = buildClues(R, truth, ["leftOf", "nextTo", "notNext", "end", "notEnd", "justLeft"], ask, 3, 4);
  if (!b) return null;
  const what = R.pick([["lockers in a row", "has the locker"], ["seats at a counter", "sits in the seat"], ["bikes in a rack", "parked in the space"]]);
  const almost = perms(ppl).filter(p => b.clues.filter(c => c.ok(p)).length === b.clues.length - 1).map(p => p[ask]).filter(x => x !== truth[ask]);
  const wrongs = ppl.filter(x => x !== truth[ask]).map(x => [x, almost.includes(x) ? `${x} fits every clue but one: check them all` : `${x} cannot be ${PLACES[ask]}: it breaks a clue`]);
  const o = shuffleOpts(R, truth[ask], wrongs);
  return { form: "four", stem: `<p>Four friends, ${ppl.slice(0, 3).join(", ")} and ${ppl[3]}, have ${what[0]}, numbered 1 to 4 from left to right.</p><ul class="clues">${b.clues.map(c => `<li>${c.t}</li>`).join("")}</ul><p>Who ${what[1]} in place <b>${ask + 1}</b>?</p>`, ...o, data: { ppl, clues: b.clues.map(c => c.t), ask },
    explain: ex("order", `<p>Draw four boxes. Start with the surest clue and test the possibilities. The arrangement${b.sols.length > 1 ? "s that fit" : " that fits"}: ${b.sols.map(p => p.join(" – ")).join(" or ")}. In place ${ask + 1}: <b>${truth[ask]}</b>.</p>`, o) };
});
gen("t-order-3", "order", 3, R => {
  const ppl = R.shuffle(NAMES).slice(0, 5), truth = R.shuffle(ppl), ask = R.int(1, 3);
  const b = buildClues(R, truth, ["beat", "twoBehind", "justBefore", "notLast", "notFirst", "twoBehind"], ask, 3, 5);
  if (!b || !b.clues.some(c => /two places/.test(c.t))) return null;
  const wrongs = R.shuffle(ppl.filter(x => x !== truth[ask])).slice(0, 3).map(x => [x, `${x} can't finish ${PLACES[ask]} once every clue is used`]);
  const o = shuffleOpts(R, truth[ask], wrongs);
  return { form: "race", stem: `<p>Five runners, ${ppl.slice(0, 4).join(", ")} and ${ppl[4]}, ran a race. There were no ties.</p><ul class="clues">${b.clues.map(c => `<li>${c.t}</li>`).join("")}</ul><p>Who finished <b>${PLACES[ask]}</b>?</p>`, ...o, data: { ppl, clues: b.clues.map(c => c.t), ask },
    explain: ex("order", `<p>Write places 1st to 5th. "Two places behind" fixes a gap of one runner between two people; place that pair, then use the other clues. ${b.sols.length === 1 ? "The only order that fits" : "The orders that fit"}: ${b.sols.map(p => p.join(", ")).join(" or ")}. ${PLACES[ask][0].toUpperCase() + PLACES[ask].slice(1)}: <b>${truth[ask]}</b>.</p>`, o) };
});
gen("t-order-4", "order", 4, R => {
  const ppl = R.shuffle(NAMES).slice(0, 5), truth = R.shuffle(ppl), all = perms(ppl);
  const kinds = ["leftOf", "nextTo", "notNext", "end", "notEnd", "justLeft"];
  let clues = [], sols = all;
  for (let k = 0; k < 60 && (sols.length > 4 || clues.length < 3); k++) {
    const kind = R.pick(kinds), a = R.pick(ppl), b2 = R.pick(ppl.filter(x => x !== a)), c = CLUES[kind](a, b2);
    if (!c.ok(truth) || clues.some(x => x.t === c.t)) continue;
    const next = sols.filter(c.ok); if (next.length === sols.length || next.length < 2) continue;
    clues.push(c); sols = next;
  }
  if (sols.length < 2 || sols.length > 4 || clues.length > 5) return null;
  /* candidate statements */
  const st = [];
  for (const a of ppl) for (const b2 of ppl) if (a !== b2) { st.push(CLUES.nextTo(a, b2)); st.push(CLUES.leftOf(a, b2)); }
  for (const a of ppl) { st.push(CLUES.end(a)); for (let i = 0; i < 5; i++) st.push({ t: `${a} is in place ${i + 1}.`, ok: p => p.indexOf(a) === i }); }
  /* test level: the answer must need the clues working together. A statement that one clue (or any two) already
     settles is too easy (David, Nov 2026: "Kira is next to Yusuf" when a clue said "Yusuf is next to Kira") */
  const fresh = st.filter(s => !clues.some(c => c.t === s.t));
  const subsets = [];
  clues.forEach((c, i) => { subsets.push([c]); clues.forEach((d, j) => { if (j > i) subsets.push([c, d]); }); });
  const settledBy = (s, want) => subsets.some(sub => { const left = all.filter(p => sub.every(c => c.ok(p))); return left.every(p => s.ok(p) === want); });
  const must = fresh.filter(s => sols.every(s.ok) && !settledBy(s, true)), some = fresh.filter(s => sols.some(s.ok) && !sols.every(s.ok));
  const askMust = R.chance(0.6);
  if (askMust) {
    if (!must.length || some.length < 3) return null;
    const right = R.pick(must), wr = R.shuffle(some).slice(0, 3).map(s => [s.t, "true in one arrangement that fits, but not in every one"]);
    const o = shuffleOpts(R, right.t, wr);
    return { form: "must", stem: `<p>Five friends, ${ppl.slice(0, 4).join(", ")} and ${ppl[4]}, sit in a row of five seats, numbered 1 to 5 from left to right.</p><ul class="clues">${clues.map(c => `<li>${c.t}</li>`).join("")}</ul><p>Which of these <b>must</b> be true?</p>`, ...o, data: { ppl, clues: clues.map(c => c.t), askMust },
      explain: ex("order", `<p>The clues allow ${sols.length} arrangements: ${sols.map(p => p.join(" – ")).join("; ")}. "Must be true" means true in ALL of them: <b>${right.t}</b></p>`, o) };
  }
  const never = fresh.filter(s => !sols.some(s.ok) && !/place/.test(s.t) && !settledBy(s, false));
  if (!never.length || some.length < 3) return null;
  const right = R.pick(never), wr = R.shuffle(some).slice(0, 3).map(s => [s.t, "this is true in at least one arrangement that fits, so it CAN be true"]);
  const o = shuffleOpts(R, right.t, wr);
  return { form: "cannot", stem: `<p>Five friends, ${ppl.slice(0, 4).join(", ")} and ${ppl[4]}, sit in a row of five seats, numbered 1 to 5 from left to right.</p><ul class="clues">${clues.map(c => `<li>${c.t}</li>`).join("")}</ul><p>Which of these <b>cannot</b> be true?</p>`, ...o, data: { ppl, clues: clues.map(c => c.t), askMust },
    explain: ex("order", `<p>The clues allow ${sols.length} arrangements: ${sols.map(p => p.join(" – ")).join("; ")}. "Cannot be true" means true in NONE of them: <b>${right.t}</b></p>`, o) };
});

/* ---------- Shapes in space ---------- */
const norm = cells => { const r0 = Math.min(...cells.map(c => c[0])), c0 = Math.min(...cells.map(c => c[1])); return cells.map(([r, c]) => [r - r0, c - c0]).sort((a, b) => a[0] - b[0] || a[1] - b[1]); };
const key = cells => norm(cells).map(c => c.join(",")).join(";");
const rotCW = cells => cells.map(([r, c]) => [c, 3 - r]);
const flipH = cells => cells.map(([r, c]) => [r, 3 - c]);
/* a random connected shape of n cells in a 4 × 4 grid, with a dot on one cell so it can be followed */
function polyo(R, n) {
  const cells = [[R.int(0, 3), R.int(0, 3)]];
  for (let k = 0; k < 200 && cells.length < n; k++) {
    const [r, c] = R.pick(cells), [dr, dc] = R.pick([[0, 1], [1, 0], [0, -1], [-1, 0]]), nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < 4 && nc >= 0 && nc < 4 && !cells.some(x => x[0] === nr && x[1] === nc)) cells.push([nr, nc]);
  }
  return cells;
}
/* move a shape (and its dot) so it sits at the top left of the 4 × 4 grid */
const place = (cells, dot) => { const r0 = Math.min(...cells.map(c => c[0])), c0 = Math.min(...cells.map(c => c[1])); return { cells: cells.map(([r, c]) => [r - r0, c - c0]), dot: [dot[0] - r0, dot[1] - c0] }; };
const draw = (cells, dot, colour) => { const p = place(cells, dot); return cellsSvg(p.cells, 20, colour, p.dot); };
const shapeKey = (cells, dot) => { const p = place(cells, dot); return key(p.cells) + "|" + p.dot.join(","); };
gen("t-space-1", "space", 1, R => {
  const n = R.int(4, 5), cells = polyo(R, n); if (cells.length < n) return null;
  const dot = R.pick(cells);
  const turn = (cs, d, k) => { for (let i = 0; i < k; i++) { cs = rotCW(cs); d = rotCW([d])[0]; } return [cs, d]; };
  const [cw, dcw] = turn(cells, dot, 1), [h, dh] = turn(cells, dot, 2), [ccw, dccw] = turn(cells, dot, 3), fl = flipH(cells), dfl = flipH([dot])[0];
  const ks = [shapeKey(cw, dcw), shapeKey(ccw, dccw), shapeKey(h, dh), shapeKey(fl, dfl)];
  if (new Set(ks).size < 4 || ks.includes(shapeKey(cells, dot))) return null;
  const o = shuffleOpts(R, draw(cw, dcw, "#5c8dd6"), [[draw(ccw, dccw, "#5c8dd6"), "a quarter turn the other way (anticlockwise)"], [draw(h, dh, "#5c8dd6"), "a half turn"], [draw(fl, dfl, "#5c8dd6"), "a flip (mirror image), not a turn"]]);
  return { form: "quarter turn", visual: true, stem: `<p>This shape is given a <b>quarter turn clockwise</b> (like a clock's hand moving from 12 to 3).</p><div class="figure">${draw(cells, dot, "#e8a33d")}</div><p>Which picture shows the shape after the turn?</p>`, ...o, data: { cells, dot },
    explain: ex("space", `<p>Follow the dot. Turning clockwise, a square that was at the top moves to the right side, and a square on the right moves to the bottom. Only one picture has the dot where the turn puts it AND the shape the same way round.</p>`, o) };
});
gen("t-space-2", "space", 2, R => {
  const n = R.int(4, 6), cells = polyo(R, n); if (cells.length < n) return null;
  const rots = [cells]; for (let i = 0; i < 3; i++) rots.push(rotCW(rots[i]));
  const fl = flipH(cells), flRots = [fl]; for (let i = 0; i < 3; i++) flRots.push(rotCW(flRots[i]));
  const rk = new Set(rots.map(key)), fk = flRots.map(key);
  if (rk.size < 4 || fk.some(k => rk.has(k))) return null;                 // the shape must look different flipped
  const pick3 = R.shuffle([0, 1, 2, 3]).slice(0, 3), odd = R.int(0, 3);
  const dr = cs => cellsSvg(norm(cs), 20, "#2f9e44");
  const o = shuffleOpts(R, dr(flRots[odd]), pick3.map(i => [dr(rots[i]), "this is the same tile turned round: try turning it in your head"]));
  return { form: "odd one flipped", visual: true, stem: `<p>Three of these tiles are the same tile, just turned round. One has been <b>flipped over</b>.</p><p>Which one is flipped?</p>`, ...o, data: { cells, odd },
    explain: ex("space", `<p>Pick one feature, like the end that sticks out, and see which side of it the rest of the tile is on. Turning keeps that the same; flipping swaps left and right. Three tiles keep it, so the one that doesn't is flipped.</p>`, o) };
});
/* cube nets: [row, col] cells; folding = rolling a cube over the net */
const NETS = [[[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]], [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 3]], [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 2]],
  [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, 3]], [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]], [[0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2], [2, 3]], [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0]]];
function fold(net) {
  /* each cube face: which direction it faces. start: the first square is the bottom. Rolling moves faces round. */
  const faceOf = {}, cube = { D: 0, U: 1, N: 2, S: 3, E: 4, W: 5 };   // physical face ids
  const roll = (c, dir) => {
    const n = Object.assign({}, c);
    if (dir === "E") { n.D = c.E; n.W = c.D; n.U = c.W; n.E = c.U; }
    if (dir === "W") { n.D = c.W; n.E = c.D; n.U = c.E; n.W = c.U; }
    if (dir === "S") { n.D = c.S; n.N = c.D; n.U = c.N; n.S = c.U; }
    if (dir === "N") { n.D = c.N; n.S = c.D; n.U = c.S; n.N = c.U; }
    return n;
  };
  const k = (r, c) => r + "," + c, inNet = new Set(net.map(x => k(...x)));
  const st = [[net[0], cube]]; faceOf[k(...net[0])] = cube.D;
  while (st.length) {
    const [[r, c], cb] = st.pop();
    for (const [dr, dc, d] of [[0, 1, "E"], [0, -1, "W"], [1, 0, "S"], [-1, 0, "N"]]) {
      const kk = k(r + dr, c + dc); if (!inNet.has(kk) || kk in faceOf) continue;
      const nc = roll(cb, d); faceOf[kk] = nc.D; st.push([[r + dr, c + dc], nc]);
    }
  }
  return net.map(x => faceOf[k(...x)]);
}
const OPP = [1, 0, 3, 2, 5, 4];
gen("t-space-3", "space", 3, R => {
  const net = R.pick(NETS), faces = fold(net);
  if (new Set(faces).size !== 6) return null;
  const letters = R.shuffle(["A", "B", "C", "D", "E", "F"]), lab = i => letters[i];
  const ask = R.int(0, 5), oppIdx = faces.indexOf(OPP[faces[ask]]);
  const adjNet = net.map((x, i) => i).filter(i => i !== ask && Math.abs(net[i][0] - net[ask][0]) + Math.abs(net[i][1] - net[ask][1]) === 1);
  const others = [0, 1, 2, 3, 4, 5].filter(i => i !== ask && i !== oppIdx);
  const ordered = [...adjNet.filter(i => i !== oppIdx), ...others.filter(i => !adjNet.includes(i))].slice(0, 3);
  const o = shuffleOpts(R, lab(oppIdx), ordered.map(i => [lab(i), adjNet.includes(i) ? `${lab(i)} touches ${lab(ask)} in the net, so it is next to it on the cube` : `${lab(i)} ends up next to ${lab(ask)} once the net is folded`]));
  const s = 44; let g = "";
  net.forEach(([r, c], i) => { g += `<rect x="${6 + c * s}" y="${6 + r * s}" width="${s}" height="${s}" fill="${i === ask ? "#ffe8a3" : "#fff"}" stroke="${INK}" stroke-width="2"/>` + T(6 + c * s + s / 2, 6 + r * s + s / 2 + 7, lab(i), 'text-anchor="middle" font-size="20" font-weight="700"'); });
  return { form: "net", stem: `<p>This net is folded to make a cube.</p>${svg(12 + 4 * s, 12 + 3 * s, g, "a cube net with a letter on each square")}<p>Which letter is on the face <b>opposite</b> ${lab(ask)}?</p>`, ...o, data: { net, letters, ask },
    explain: ex("space", `<p>Squares two apart in a straight line of three are opposite. Faces that touch ${lab(ask)} in the net are next to it on the cube, so they can't be opposite. Fold it in your head, keeping ${lab(ask)} as the bottom: the face that ends up on top is <b>${lab(oppIdx)}</b>.</p>`, o) };
});
gen("t-space-4", "space", 4, R => {
  const rows = 3, cols = 3, h = [...Array(9)].map(() => R.int(0, 3));
  if (h.filter(x => x).length < 6) return null;
  const at = (r, c) => h[r * cols + c];
  const front = [0, 1, 2].map(c => Math.max(at(0, c), at(1, c), at(2, c)));         // seen from the bottom edge of the plan
  const back = front.slice().reverse();
  const right = [2, 1, 0].map(r => Math.max(...[0, 1, 2].map(c => at(r, c))));       // seen from the right: front row on the left
  const sums = [0, 1, 2].map(c => at(0, c) + at(1, c) + at(2, c));
  const ks = [front, back, right, sums].map(x => x.join(","));
  if (new Set(ks).size < 4 || Math.max(...sums) > 6) return null;
  const sky = v => { const s = 18; let g = ""; v.forEach((n, i) => { for (let k = 0; k < n; k++) g += `<rect x="${6 + i * s}" y="${6 + (6 - 1 - k) * s}" width="${s}" height="${s}" fill="#9fb7dd" stroke="${INK}" stroke-width="1.5"/>`; }); g += `<line x1="2" x2="${10 + 3 * s}" y1="${6 + 6 * s}" y2="${6 + 6 * s}" stroke="${INK}" stroke-width="2"/>`; return `<svg viewBox="0 0 ${14 + 3 * s} ${12 + 6 * s}" width="${14 + 3 * s}" role="img" aria-label="a view of stacks of cubes">${g}</svg>`; };
  const o = shuffleOpts(R, sky(front), [[sky(back), "the view from the back: left and right are swapped"], [sky(right), "the view from the side"], [sky(sums), "added up each column of the plan; from the front you only see the TALLEST stack in each column"]]);
  const s = 44; let g = "";
  h.forEach((v, i) => { const x = 30 + (i % 3) * s, y = 6 + Math.floor(i / 3) * s; g += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${v ? "#eef3fb" : "#fff"}" stroke="${INK}" stroke-width="2"/>` + (v ? T(x + s / 2, y + s / 2 + 7, v, 'text-anchor="middle" font-size="20" font-weight="700"') : ""); });
  g += T(30 + 1.5 * s, 3 * s + 34, "FRONT ↑", 'text-anchor="middle" font-weight="700"');
  return { form: "front view", visual: true, stem: `<p>This plan shows stacks of cubes seen from above. Each number is how many cubes are in that stack (a blank square has none).</p>${svg(60 + 3 * s, 3 * s + 44, g, "a plan of stacks of cubes")}<p>Which picture shows the model seen from the <b>front</b>?</p>`, ...o, data: { h },
    explain: ex("space", `<p>From the front you see each column (left, middle, right) as one stack: the TALLEST stack in that column hides the ones behind it. Left column: ${[0, 1, 2].map(r => at(r, 0)).join(", ")} → ${front[0]}. Middle: ${[0, 1, 2].map(r => at(r, 1)).join(", ")} → ${front[1]}. Right: ${[0, 1, 2].map(r => at(r, 2)).join(", ")} → ${front[2]}. So the view is ${front.join(", ")} cubes tall.</p>`, o) };
});
})();
