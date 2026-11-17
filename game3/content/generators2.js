/* ---------------------------------------------------------------
   STORM ISLAND: cube and solid-shape templates (Nov 2026, second question set).
   "How many faces of this cube" questions, drawn fresh each time:
   painted cubes, cube models on a plan, staircases, prisms and pyramids,
   nets (which face is opposite, which shape folds into a cube).
   tools/check_game3.js works every answer out again by its own method.
   --------------------------------------------------------------- */
(() => {
  const { T, fig, opts, gen, blocks, plan, towers } = LIB;
  const B = s => `<b>${s}</b>`;
  const sum = a => a.reduce((x, y) => x + y, 0);

  /* ---------- painted cube cut into small cubes ---------- */
  gen("paintcube", "maths", 3, "Area, perimeter & 3D", R => {
    let n, k;
    do { n = R.int(3, 5); k = R.int(0, 3); } while (n === 3 && k === 2);   // Crown Quest already asks 3 × 3 × 3 with two faces
    const m = n - 2, cnt = [m ** 3, 6 * m * m, 12 * m, 8];
    const words = ["no painted faces at all", "exactly one painted face", "exactly two painted faces", "exactly three painted faces"];
    const wrongs = [[(n - 1) ** 3, m * m, 6 * m * m, n * n], [6 * n * n, 4 * m * m, 6 * m, 12 * m], [12 * n, 24, 6 * m * m, 8], [6, 12 * m, 4, 24]][k];
    const cells = []; for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let z = 0; z < n; z++) cells.push([x, y, z]);
    const o = opts(R, cnt[k], wrongs);
    const where = [`hidden inside, in a ${m} × ${m} × ${m} block: ${m} × ${m} × ${m} = ${cnt[0]}`, `in the middle of each of the 6 faces, a ${m} × ${m} square: 6 × ${m * m} = ${cnt[1]}`,
      `along each of the 12 edges, between the corners: ${m} on each edge, 12 × ${m} = ${cnt[2]}`, `at the 8 corners: ${cnt[3]}`][k];
    return { ...o, data: { n, k },
      stem: `<p>A large cube is made of ${B(n ** 3)} small cubes, ${n} long, ${n} wide and ${n} high. The whole outside of the large cube is painted, and then it is taken apart.</p>${fig(blocks(cells, { u: n > 4 ? 22 : 26, aria: `A large cube made of small cubes, ${n} along each edge.` }))}<p>How many small cubes have ${B(words[k])}?</p>`,
      explain: `<p>Think about where each small cube sits. Corner cubes have 3 painted faces. Cubes along an edge, between two corners, have 2. Cubes in the middle of a face have 1. Cubes hidden inside have none.</p><p>The cubes asked for are ${where}. So the answer is ${B(cnt[k])}.</p><p>Check: ${cnt[3]} + ${cnt[2]} + ${cnt[1]} + ${cnt[0]} = ${n ** 3}, the number of small cubes.</p><p class="why-not">The usual slips: counting a whole edge (${n} cubes) instead of only the ${m} between the corners, counting a whole face (${n} × ${n}) instead of the ${m} × ${m} middle, or forgetting that a cube has 12 edges and 6 faces.</p>` };
  });

  /* ---------- a cube model standing on a plan ---------- */
  const faces = rows => {   // exposed faces of towers on a plan, counted side by side
    let top = 0, side = 0, n = 0;
    const H = (i, j) => (rows[i] && rows[i][j]) || 0;
    rows.forEach((r, i) => r.forEach((h, j) => { if (!h) return; n += h; top++; for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) side += Math.max(0, h - H(i + a, j + b)); }));
    return { n, top, side, all: 2 * top + side };
  };
  gen("stack", "maths", 3, "Area, perimeter & 3D", R => {
    let rows, f;
    do {
      rows = [0, 1].map(() => [0, 1, 2].map(() => R.int(0, 3)));
      f = faces(rows);
    } while (f.n < 5 || f.n > 9 || rows.flat().filter(h => !h).length > 1 || !rows[1].some(Boolean) || rows.flat().filter(h => h === 3).length > 2);
    const ask = R.pick(["paint", "hidden", "see"]);
    const correct = ask === "paint" ? f.all : ask === "hidden" ? 6 * f.n - f.all + f.top : f.all - f.top;
    const drawn = blocks(towers(rows), { u: 30, aria: `A model of cubes built on the plan.` });
    const inPicture = (drawn.match(/class="face"/g) || []).length;
    const q = { paint: `The whole outside of the model is painted, ${B("including the bottom")}. How many small square faces are painted?`,
      hidden: `How many faces of the small cubes are ${B("hidden")}, because they touch another cube or the table?`,
      see: `Mia walks all the way round the model and looks down on it from above. How many small square faces can she see altogether? (She can’t see the bottom.)` }[ask];
    const o = opts(R, correct, ask === "paint" ? [6 * f.n, f.all - f.top, inPicture, f.n * 4] : ask === "hidden" ? [6 * f.n - f.all, f.top, f.n, 6 * f.n - inPicture] : [inPicture, f.all, 6 * f.n, 5 * f.n]);
    return { ...o, data: { rows, ask },
      stem: `<p>Cubes are glued together on a table to make this model. The plan shows how many cubes are in each tower.</p><div class="figure" style="display:flex;gap:18px;align-items:center;justify-content:center;flex-wrap:wrap">${blocks(towers(rows), { u: 30, aria: `A model of ${f.n} cubes standing in towers. Seen from above, the back row of towers is ${rows[0].join(", ")} cubes tall and the front row is ${rows[1].join(", ")} cubes tall, from left to right.` })}${plan(rows)}</div><p>${q}</p>`,
      explain: `<p>Count the outside faces in groups. Tops: one for each tower, ${f.top}. Bottoms: also ${f.top}. Sides: go round every tower and count the squares that don’t touch a neighbouring tower: ${f.side}.</p><p>So the outside has ${f.top} + ${f.top} + ${f.side} = ${f.all} faces. ${ask === "paint" ? `All of them are painted: ${B(correct)}.` : ask === "see" ? `Mia can see all of them except the ${f.top} on the bottom: ${f.all} − ${f.top} = ${B(correct)}.` : `The ${f.n} cubes have 6 × ${f.n} = ${6 * f.n} faces altogether. ${f.all} are on the outside, but the ${f.top} on the bottom touch the table, so the hidden ones are ${6 * f.n} − ${f.all} + ${f.top} = ${B(correct)}.`}</p><p class="why-not">The picture only shows three sides of the model (${inPicture} faces): the back, the left side and the bottom are there too. ${6 * f.n} counts every face of every cube, even where two cubes are glued together.</p>` };
  });

  /* ---------- a staircase of cubes ---------- */
  gen("stairs", "maths", 2, "Area, perimeter & 3D", R => {
    const k = R.int(3, 5), d = R.int(1, 3), ask = R.pick(["cubes", "paint"]);
    const cubes = d * k * (k + 1) / 2, paint = k * (k + 1) + 4 * k * d;
    const cells = []; for (let x = 0; x < k; x++) for (let z = 0; z < k - x; z++) for (let y = 0; y < d; y++) cells.push([x, y, z]);
    const front = k * (k + 1) / 2;
    const o = ask === "cubes" ? opts(R, cubes, [front, k * k * d, front + (d - 1) * k, cubes + k]) : opts(R, paint, [6 * cubes, paint - k * d, front * 2 + 3 * k * d, paint - k * d - k * d]);
    return { ...o, data: { k, d, ask },
      stem: `<p>This staircase is made of cubes. It has ${B(k + " steps")}, and it is ${B(d === 1 ? "one cube deep" : d + " cubes deep")}: every step goes ${d === 1 ? "back just one cube" : `all the way back, ${d} cubes`}.</p>${fig(blocks(cells, { u: 26, aria: `A staircase of cubes with ${k} steps, ${d} cube${d > 1 ? "s" : ""} deep. The tallest column, on the left, is ${k} cubes high; each column to its right is one cube lower.` }))}<p>${ask === "cubes" ? `How many cubes are in the staircase?` : `The whole staircase is painted, ${B("including the bottom")}. How many small square faces are painted?`}</p>`,
      explain: ask === "cubes"
        ? `<p>Count one slice from the front: the columns are ${Array.from({ length: k }, (_, i) => k - i).join(" + ")} = ${front} cubes. There are ${d} slice${d > 1 ? "s" : ""} going back, so ${front} × ${d} = ${B(cubes)} cubes.</p><p class="why-not">${front} counts only the front slice${d > 1 ? " you can see" : ""}. ${k * k * d} would be a full block with no steps cut out.</p>`
        : `<p>Count the faces side by side. Front and back: ${front} + ${front} = ${2 * front}. Tops of the steps: ${k} × ${d} = ${k * d}. Bottom: ${k * d}. The tall left side: ${k} × ${d} = ${k * d}. The step edges on the right: one row of ${d} for each step, ${k * d}.</p><p>${2 * front} + ${k * d} + ${k * d} + ${k * d} + ${k * d} = ${B(paint)}.</p><p class="why-not">${6 * cubes} counts every face of every cube, even where cubes are glued together. ${paint - k * d} forgets the bottom.</p>` };
  });

  /* ---------- prisms and pyramids: faces, edges and corners ---------- */
  const BASE = { 3: ["triangular", "triangles"], 4: ["square", "squares"], 5: ["pentagonal", "pentagons"], 6: ["hexagonal", "hexagons"], 8: ["octagonal", "octagons"] };
  function solid(type, n) {
    const cx = 110, cy = 140, rx = 80, ry = 26, hgt = type === "prism" ? 90 : 110, a0 = Math.PI / 2 + Math.PI / n + 0.32;   // turned a little so no face is seen flat on
    const pt = (i, up) => [cx + rx * Math.cos(a0 + 2 * Math.PI * i / n), cy + ry * Math.sin(a0 + 2 * Math.PI * i / n) - up];
    const back = i => Math.sin(a0 + 2 * Math.PI * i / n) + Math.sin(a0 + 2 * Math.PI * (i + 1) / n) < -0.001;
    const line = (p, q, dash) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="${INK}" stroke-width="2" ${dash ? 'stroke-dasharray="5 4" opacity=".6"' : ""}/>`;
    let g = "";
    for (let i = 0; i < n; i++) g += line(pt(i, 0), pt(i + 1, 0), back(i));
    if (type === "prism") {
      for (let i = 0; i < n; i++) g += line(pt(i, hgt), pt(i + 1, hgt), false);
      for (let i = 0; i < n; i++) g += line(pt(i, 0), pt(i, hgt), back(i) && back((i + n - 1) % n));   // hidden only when both base edges beside it are at the back
    } else {
      const ap = [cx, cy - hgt];
      for (let i = 0; i < n; i++) g += line(pt(i, 0), ap, back(i) && back((i + n - 1) % n));
    }
    return `<svg viewBox="0 0 220 ${type === "prism" ? 180 : 180}" width="220" role="img" aria-label="${n === 8 ? "An" : "A"} ${BASE[n][0]} ${type}. Edges at the back are dashed.">${g}</svg>`;
  }
  gen("solidparts", "maths", 2, "Area, perimeter & 3D", R => {
    const n = R.pick([3, 4, 5, 6, 8]), type = R.pick(["prism", "pyramid"]), ask = R.pick(["faces", "edges", "corners"]);
    const P = { faces: n + 2, edges: 3 * n, corners: 2 * n }, Y = { faces: n + 1, edges: 2 * n, corners: n + 1 }, me = type === "prism" ? P : Y, other = type === "prism" ? Y : P;
    const correct = me[ask], wrongs = [other[ask], ...["faces", "edges", "corners"].filter(x => x !== ask).map(x => me[x]), ask === "faces" ? me.faces - 1 : ask === "edges" ? n : me.corners - n];
    const an = n === 8 ? "an" : "a", name = type === "prism" ? (n === 4 ? "a prism with square ends" : `${an} ${BASE[n][0]} prism`) : `${an} ${BASE[n][0]} pyramid`;
    const o = opts(R, correct, wrongs);
    const how = type === "prism"
      ? { faces: `two ends (both ${BASE[n][1]}) plus one rectangle for each of the ${n} sides of an end: ${n} + 2 = ${B(correct)}`, edges: `${n} round the bottom end, ${n} round the top end and ${n} joining them: ${n} × 3 = ${B(correct)}`, corners: `${n} on the bottom end and ${n} on the top end: ${n} × 2 = ${B(correct)}` }[ask]
      : { faces: `one base (a ${BASE[n][0].replace("al", "")} shape with ${n} sides) plus one triangle for each side of the base: ${n} + 1 = ${B(correct)}`.replace("a square shape", "a square").replace("a triangular shape", "a triangle"), edges: `${n} round the base and ${n} going up to the point: ${n} × 2 = ${B(correct)}`, corners: `${n} round the base and 1 at the point: ${n} + 1 = ${B(correct)}` }[ask];
    return { ...o, data: { n, type, ask },
      stem: `<p>This solid is ${B(name)}.</p>${fig(solid(type, n))}<p>How many ${B(ask)} does it have?${ask === "corners" ? " (Corners are also called vertices.)" : ""}</p>`,
      explain: `<p>Count it in parts. ${name[0].toUpperCase() + name.slice(1)} has ${how}.</p><p class="why-not">${other[ask]} is the number for a ${type === "prism" ? "pyramid" : "prism"} with the same ${type === "prism" ? "ends" : "base"}. Mixing up faces, edges and corners gives the other numbers. Remember the dashed edges at the back: they count too.</p>` };
  });

  /* ---------- nets of a cube ---------- */
  const K = cs => cs.map(c => c.join(",")).sort().join(";");
  const norm = cs => { const x0 = Math.min(...cs.map(c => c[0])), y0 = Math.min(...cs.map(c => c[1])); return cs.map(([x, y]) => [x - x0, y - y0]); };
  const canon = cs => { let best = null; for (let r = 0; r < 8; r++) { const t = norm(cs.map(([x, y]) => { let p = r & 4 ? [-x, y] : [x, y]; for (let i = 0; i < (r & 3); i++) p = [-p[1], p[0]]; return p; })); const k = K(t); if (best === null || k < best) best = k; } return best; };
  /* fold a net: each square gets the direction its face points once folded (the first square is the bottom) */
  function fold(cells) {
    const at = new Map(cells.map((c, i) => [c.join(","), i])), fr = [{ N: [0, 0, -1], E: [1, 0, 0], S: [0, 1, 0] }], neg = v => v.map(a => -a), q = [0];
    while (q.length) {
      const i = q.shift(), f = fr[i], [x, y] = cells[i];
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const j = at.get(`${x + dx},${y + dy}`);
        if (j === undefined || fr[j]) continue;
        fr[j] = dx === 1 ? { N: f.E, E: neg(f.N), S: f.S } : dx === -1 ? { N: neg(f.E), E: f.N, S: f.S } : dy === 1 ? { N: f.S, E: f.E, S: neg(f.N) } : { N: neg(f.S), E: f.E, S: f.N };
        q.push(j);
      }
    }
    return fr.map(f => f.N.join(","));
  }
  const folds = cs => new Set(fold(cs)).size === 6;
  const SHAPES = (() => {   // every shape of 6 squares joined edge to edge
    let polys = new Map([["0,0", [[0, 0]]]]);
    for (let n = 1; n < 6; n++) {
      const nx = new Map();
      for (const cs of polys.values()) for (const [x, y] of cs) for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (cs.some(d => d[0] === x + a && d[1] === y + b)) continue;
        const ncs = norm([...cs, [x + a, y + b]]); nx.set(K(ncs), ncs);
      }
      polys = nx;
    }
    const all = [...polys.values()].filter(cs => { const w = Math.max(...cs.map(c => c[0])) + 1, h = Math.max(...cs.map(c => c[1])) + 1; return (w <= 4 && h <= 3) || (w <= 3 && h <= 4) || (w === 5 && h === 2); });
    return { good: all.filter(folds), bad: all.filter(cs => !folds(cs)) };
  })();
  const netSvg = (cells, labels = null, u = 32) => {
    const w = Math.max(...cells.map(c => c[0])) + 1, h = Math.max(...cells.map(c => c[1])) + 1;
    const g = cells.map(([x, y], i) => `<rect x="${3 + x * u}" y="${3 + y * u}" width="${u}" height="${u}" fill="${labels ? "#fff3c4" : "#c9e8ff"}" stroke="${INK}" stroke-width="2"/>` + (labels ? `<text x="${3 + x * u + u / 2}" y="${3 + y * u + u / 2 + 7}" font-size="20" font-weight="700" text-anchor="middle" fill="${INK}">${labels[i]}</text>` : "")).join("");
    const rows = Array.from({ length: h }, (_, y) => `Row ${y + 1}: ` + Array.from({ length: w }, (_, x) => { const i = cells.findIndex(c => c[0] === x && c[1] === y); return i < 0 ? "empty" : labels ? labels[i] : "square"; }).join(", ")).join(". ");
    return `<svg viewBox="0 0 ${w * u + 6} ${h * u + 6}" width="${w * u + 6}" height="${h * u + 6}" role="img" aria-label="A shape of six squares on a grid ${w} wide and ${h} tall. ${rows}.">${g}</svg>`;
  };
  gen("netopp", "thinking", 1, "Spatial", R => {
    const cells = R.pick(SHAPES.good), labels = R.shuffle(["A", "B", "C", "D", "E", "F"]), f = fold(cells);
    const i = R.int(0, 5), opp = f.findIndex(v => v === f[i].split(",").map(a => String(-Number(a) || 0)).join(","));
    const others = R.shuffle([0, 1, 2, 3, 4, 5].filter(j => j !== i && j !== opp)).slice(0, 3);
    const set = R.shuffle([opp, ...others]), options = set.map(j => labels[j]);
    return { options, answer: set.indexOf(opp), data: { cells, labels, ask: labels[i] },
      stem: `<p>This net is folded up to make a cube.</p>${fig(netSvg(cells, labels))}<p>Which letter ends up on the face ${B("opposite")} ${B(labels[i])}?</p>`,
      explain: `<p>Fold it in your head, one flap at a time: keep ${labels[i]} on the table as the bottom and fold the squares next to it up to make the walls. The face that ends up on top, ${B(labels[opp])}, is opposite ${labels[i]}.</p><p>A quick check: two squares in a straight line with exactly one square between them are always opposite.</p><p class="why-not">A face that touches ${labels[i]} in the net, even at a corner, can’t be opposite it: once folded it is one of the four walls next to ${labels[i]}.</p>` };
  });
  gen("isnet", "thinking", 2, "Spatial", R => {
    const good = R.pick(SHAPES.good), seen = new Set([canon(good)]), bad = [];
    while (bad.length < 3) { const b = R.pick(SHAPES.bad), c = canon(b); if (!seen.has(c)) { seen.add(c); bad.push(b); } }
    const list = R.shuffle([good, ...bad]);
    return { visual: true, options: list.map(cs => netSvg(cs)), answer: list.indexOf(good), data: { list },
      stem: `<p>Each shape is made of six squares. Only one of them can be folded along the lines to make a closed cube.</p><p>Which one?</p>`,
      explain: `<p>Fold each shape in your head: pick one square as the bottom and fold the squares around it up into walls. In the shapes that don’t work, two squares land on the same side of the cube and one side is left open.</p><p>Warning signs: four squares in a 2 by 2 block, five squares in a row, or a row of four with two squares sticking out on the same side.</p><p class="why-not">A shape with six squares has the right number of faces, but that isn’t enough: they also have to be arranged so that no two of them overlap when folded.</p>` };
  });
})();
