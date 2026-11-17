/* ---------------------------------------------------------------
   STORM ISLAND: question templates that redraw themselves with new numbers.
   Each template takes a seeded random source and returns
   { stem, options, answer, explain, data }. `data` holds the numbers the
   picture was drawn from; tools/check_game3.js re-solves every question from
   `data` with its own separate working, over many seeds.
   Maths templates have five options (A–E); thinking templates have four.
   --------------------------------------------------------------- */
(() => {
  const { T, fig, tbl, money, clock, colGraph, pictGraph, dotPlot, jugSvg, jugAria, opts, gen, NAMES } = LIB;
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const B = s => `<b>${s}</b>`;
  const sum = a => a.reduce((x, y) => x + y, 0);
  const list = a => a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
  const sy = n => n === 0.5 ? "half a symbol" : Number.isInteger(n) ? `${n} symbol${n === 1 ? "" : "s"}` : `${Math.floor(n)} and a half symbols`;

  /* ================= MATHS, circle 1 ================= */

  gen("pict", "maths", 1, "Graphs & data", R => {
    const c = R.pick([
      { intro: "The picture graph shows how many books a library lent each day.", rows: ["Mon", "Tue", "Wed", "Thu"], item: "books", verb: "were lent on", col: "#4dabf7" },
      { intro: "The picture graph shows how many ice creams a kiosk sold each day.", rows: ["Fri", "Sat", "Sun", "Mon"], item: "ice creams", verb: "were sold on", col: "#f783ac" },
      { intro: "The picture graph shows how many trees each class planted.", rows: ["Class 4A", "Class 4B", "Class 4C", "Class 4D"], item: "trees", verb: "were planted by", col: "#51cf66" },
      { intro: "The picture graph shows how many shells each child collected.", rows: ["Mai", "Otis", "Priya", "Sam"], item: "shells", verb: "were collected by", col: "#ffa94d" },
    ]);
    const key = R.pick([2, 4, 6, 10, 20]);
    let h, i, j;
    do { h = R.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4); [i, j] = R.shuffle([0, 1, 2, 3]); if (h[i] < h[j]) [i, j] = [j, i]; } while ((h[i] % 2 === 0 && h[j] % 2 === 0) || h[i] - h[j] < 2);
    const rows = c.rows.map((n, k) => [n, h[k] / 2]), a = rows[i][1], b = rows[j][1], correct = (a - b) * key;
    const o = opts(R, correct, [Math.ceil(a - b), a * key, (Math.ceil(a) - Math.ceil(b)) * key, (a + b) * key], String, 5, key / 2);
    return { ...o, data: { rows, key, a: i, b: j },
      stem: `<p>${c.intro}</p>${pictGraph({ rows, keyText: `${key} ${c.item}`, color: c.col, aria: `A picture graph. ${rows.map(r => `${r[0]}: ${sy(r[1])}`).join(". ")}. Key: one whole symbol = ${key} ${c.item}.` })}<p>How many ${B("more")} ${c.item} ${c.verb} ${B(rows[i][0])} than ${B(rows[j][0])}?</p>`,
      explain: `<p>One symbol stands for ${key} ${c.item}, so half a symbol stands for ${key / 2}.</p><p>${rows[i][0]}: ${sy(a)} = ${a * key}. ${rows[j][0]}: ${sy(b)} = ${b * key}. The difference is ${a * key} − ${b * key} = ${B(correct)}.</p><p class="why-not">Counting the symbols without using the key gives a number that is far too small. Counting a half symbol as a whole one, or giving only ${rows[i][0]}’s amount (${a * key}), are the other common slips.</p>` };
  });

  gen("jug", "maths", 1, "Measurement & scales", R => {
    const [major, minor] = R.pick([[100, 2], [100, 4], [200, 4], [100, 5], [200, 2], [500, 5]]), small = major / minor, max = major * 5;
    const base = major * R.int(2, 4), t = R.int(1, minor - 1), level = base + t * small;
    const p = R.pick([small, 2 * small, major, major + small].filter(v => v < level - small));
    const who = R.pick(NAMES), liquid = R.pick(["juice", "milk", "water", "soup"]);
    const o = opts(R, level - p, [level, base + t * 10 - p, base - p, base + major - p, level + p], v => v + " mL", 5, small);
    const spec = { max, major, minor, level, unit: "mL", color: liquid === "milk" ? "#dfe7f5" : liquid === "water" ? "#8fd3ff" : "#f6c453" };
    return { ...o, data: { major, minor, level, p },
      stem: `<p>The jug shows how much ${liquid} ${who} has.</p>${fig(`<svg viewBox="0 0 200 262" width="200" role="img" aria-label="${jugAria({ ...spec, title: "A measuring jug" })}">${jugSvg(spec)}</svg>`)}<p>${who} pours out ${B(p + " mL")}. How much ${liquid} is left in the jug?</p>`,
      explain: `<p>From one label to the next is ${major} mL, split into ${minor} equal steps, so each small step is ${major} ÷ ${minor} = ${small} mL.</p><p>The ${liquid} is ${t} small step${t === 1 ? "" : "s"} above ${base} mL: ${base} + ${t * small} = ${level} mL. After pouring: ${level} − ${p} = ${B(level - p + " mL")}.</p><p class="why-not">${level} mL is the amount before pouring. Reading only the nearest label (${base} or ${base + major}), or counting each small mark as 10 mL when it is not, gives the other wrong answers.</p>` };
  });

  gen("endtime", "maths", 1, "Time & timetables", R => {
    const c = R.pick([["A film", "starts", "runs for", "finish"], ["A train", "leaves", "travels for", "arrive"], ["A swimming carnival", "starts", "lasts", "finish"], ["A bushwalk", "starts", "takes", "end"]]);
    const sm = R.pick([30, 35, 40, 45, 50, 55]), start = R.int(8, 16) * 60 + sm, h = R.int(1, 2), m = R.pick([15, 20, 25, 30, 35, 40, 45, 50].filter(v => v + sm >= 65));
    const correct = start + h * 60 + m;
    const o = opts(R, correct, [correct - 60, start + m, start + h * 60, correct + 60], clock, 5, 10);
    return { ...o, data: { start, h, m },
      stem: `<p>${c[0]} ${c[1]} at ${B(clock(start))} and ${c[2]} ${B(`${h} hour${h > 1 ? "s" : ""} ${m} minutes`)}.</p><p>What time does it ${c[3]}?</p>`,
      explain: `<p>Add the hours first: ${clock(start)} + ${h} hour${h > 1 ? "s" : ""} = ${clock(start + h * 60)}.</p><p>Then the minutes: ${60 - sm} minutes takes you to ${clock(start + h * 60 + 60 - sm)}, and the other ${m - (60 - sm)} minutes makes ${B(clock(correct))}.</p><p class="why-not">${clock(correct - 60)} forgets that the minutes go past the hour. ${clock(start + m)} forgets the hour${h > 1 ? "s" : ""}, and ${clock(start + h * 60)} forgets the minutes.</p>` };
  });

  gen("change", "maths", 1, "Money & best value", R => {
    const shop = R.pick([["a pen", "a ruler", "a notebook"], ["a drink", "a muffin", "an apple"], ["a comic", "a sticker sheet", "a bookmark"], ["a bun", "a juice", "a yoghurt"]]);
    const n = R.int(2, 3), who = R.pick(NAMES);
    let prices, total, note;
    do { prices = Array.from({ length: n }, () => R.int(24, 139) * 5); total = sum(prices); note = total < 900 ? 1000 : 2000; } while (total > 1800 || prices.some(p => p % 100 === 0) || total % 100 === 0);
    const correct = note - total;
    const o = opts(R, correct, [total, correct + 100, note - prices[0], correct + 10, note - total + prices[n - 1]], money, 5, 5);
    return { ...o, data: { prices, note },
      stem: `<p>${who} buys ${list(prices.map((p, k) => `${shop[k]} for ${B(money(p))}`))}.</p><p>${who} pays with a ${B("$" + note / 100 + " note")}. How much change does ${who} get?</p>`,
      explain: `<p>Add the prices: ${prices.map(money).join(" + ")} = ${money(total)}.</p><p>Change: ${money(note)} − ${money(total)} = ${B(money(correct))}.</p><p class="why-not">${money(total)} is what was spent, not the change. ${money(correct + 100)} comes from a slip when taking away the dollars, and ${money(note - prices[0])} leaves out part of the shopping.</p>` };
  });

  gen("missing", "maths", 1, "Number & place value", R => {
    const form = R.int(1, 3), a = R.int(12, 48), c = R.int(6, 25);
    let b, correct, line, wrongs, how;
    if (form === 1) { b = a + c + R.int(11, 40); correct = b - c - a; line = `${a} + ☐ = ${b} − ${c}`; wrongs = [b - a, b - c, b - c + a, b + c - a]; how = `The right-hand side is ${b} − ${c} = ${b - c}. So ${a} + ☐ = ${b - c}, and ☐ = ${b - c} − ${a} = ${B(correct)}.`; }
    else if (form === 2) { b = R.int(20, 60); correct = a + b + c; line = `☐ − ${a} = ${b} + ${c}`; wrongs = [b + c - a, b + c, a + b, correct + 10]; how = `The right-hand side is ${b} + ${c} = ${b + c}. So ☐ − ${a} = ${b + c}, and ☐ = ${b + c} + ${a} = ${B(correct)}.`; }
    else { b = a + c + R.int(11, 40); correct = b - a - c; line = `${b} − ☐ = ${a} + ${c}`; wrongs = [a + c, b + a + c, b - a, b - c]; how = `The right-hand side is ${a} + ${c} = ${a + c}. So ${b} − ☐ = ${a + c}, and ☐ = ${b} − ${a + c} = ${B(correct)}.`; }
    const o = opts(R, correct, wrongs);
    return { ...o, data: { form, a, b, c },
      stem: `<p>What number goes in the box to make this true?</p><p style="text-align:center;font-size:22px;font-weight:700">${line}</p>`,
      explain: `<p>Both sides of the equals sign must be worth the same. ${how}</p><p class="why-not">The other answers come from working out only one side, or from adding where you should subtract (or the other way round). Check by putting your number back in the box.</p>` };
  });

  gen("bar", "maths", 1, "Graphs & data", R => {
    const c = R.pick([
      { labels: ["Red", "Blue", "Green", "Gold"], y: "House points", q: (a, b, d) => `How many more points do ${B(a)} and ${B(b)} have ${B("together")} than ${B(d)}?`, col: "#ffa94d" },
      { labels: ["Apple", "Pear", "Plum", "Fig"], y: "Trees in the orchard", q: (a, b, d) => `How many more ${B(a.toLowerCase())} and ${B(b.toLowerCase())} trees are there ${B("altogether")} than ${B(d.toLowerCase())} trees?`, col: "#69db7c" },
      { labels: ["Bus", "Car", "Bike", "Train"], y: "Children", q: (a, b, d) => `How many more children travel by ${B(a.toLowerCase())} or ${B(b.toLowerCase())} than by ${B(d.toLowerCase())}?`, col: "#4dabf7" },
    ]);
    const step = R.pick([2, 10, 20]);
    let v, i, j, k;
    do { v = Array.from({ length: 4 }, () => R.int(2, 10) * step / 2); [i, j, k] = R.shuffle([0, 1, 2, 3]); } while (new Set(v).size < 4 || v[i] + v[j] - v[k] < step || (v[i] % step === 0 && v[j] % step === 0 && v[k] % step === 0));
    const correct = v[i] + v[j] - v[k], fl = x => x - x % step;
    const o = opts(R, correct, [v[i] + v[j], Math.abs(v[i] - v[k]), fl(v[i]) + fl(v[j]) - fl(v[k]), v[i] + v[j] + v[k]], String, 5, step / 2);
    const say = x => x % step === 0 ? `reaches ${x}` : `is halfway between ${x - step / 2} and ${x + step / 2}`;
    return { ...o, data: { labels: c.labels, values: v, step, pick: [i, j, k] },
      stem: colGraph({ labels: c.labels, series: [{ name: "", color: c.col, values: v }], max: 5 * step, step, ylabel: c.y, aria: `A column graph. The scale goes up in steps of ${step} to ${5 * step}. ${c.labels.map((l, n) => `${l} ${say(v[n])}`).join(". ")}.` }) + `<p>${c.q(c.labels[i], c.labels[j], c.labels[k])}</p>`,
      explain: `<p>The lines go up in ${step}s, so a column that stops halfway between two lines is ${step / 2} more than the lower line.</p><p>${c.labels[i]} = ${v[i]}, ${c.labels[j]} = ${v[j]}, ${c.labels[k]} = ${v[k]}. Together ${v[i]} + ${v[j]} = ${v[i] + v[j]}, and ${v[i] + v[j]} − ${v[k]} = ${B(correct)}.</p><p class="why-not">${v[i] + v[j]} is only the first step: the question asks how many <i>more</i>. Reading a halfway column as if it stopped on the line below gives a different wrong answer.</p>` };
  });

  gen("tabletotal", "maths", 1, "Graphs & data", R => {
    const c = R.pick([{ what: "how many fiction and non-fiction books a library lent each day", cols: ["Fiction", "Non-fiction"], q: "On which day did the library lend the most books altogether?" }, { what: "how many adults and children visited a museum each day", cols: ["Adults", "Children"], q: "On which day did the museum have the most visitors altogether?" }, { what: "how many hot and cold drinks a kiosk sold each day", cols: ["Hot drinks", "Cold drinks"], q: "On which day did the kiosk sell the most drinks altogether?" }]);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let v, tot, best, big;
    do { v = days.map(() => [R.int(12, 58), R.int(12, 58)]); tot = v.map(r => r[0] + r[1]); best = tot.indexOf(Math.max(...tot)); big = Math.max(...v.flat()); } while (tot.filter(t => t === tot[best]).length > 1 || v[best].includes(big) || tot.slice().sort((a, b) => b - a)[0] - tot.slice().sort((a, b) => b - a)[1] > 9);
    const top = v.findIndex(r => r.includes(big));
    return { options: days, answer: best, data: { rows: v },
      stem: `<p>The table shows ${c.what}.</p>${tbl(["", ...c.cols], days.map((d, i) => [d, ...v[i]]))}<p>${c.q}</p>`,
      explain: `<p>Add the two numbers in each row: ${days.map((d, i) => `${d} ${v[i][0]} + ${v[i][1]} = ${tot[i]}`).join(", ")}.</p><p>The biggest total is ${B(days[best])} with ${tot[best]}.</p><p class="why-not">${days[top]} has the biggest single number in the table (${big}), but its other number is small, so its total is only ${tot[top]}. “Altogether” means both columns must be added.</p>` };
  });

  /* ================= MATHS, circle 2 ================= */

  gen("dot", "maths", 2, "Graphs & data", R => {
    const c = R.pick([["goals scored in a shoot-out", "Goals scored", "scored"], ["books read in the holidays", "Books read", "read"], ["pets at home", "Number of pets", "have"], ["laps swum at the carnival", "Laps swum", "swam"]]);
    let counts; do { counts = Array.from({ length: 7 }, () => R.int(0, 5)); } while (sum(counts) < 14 || sum(counts) > 24 || counts.filter(x => x === 0).length > 1);
    const k = R.int(2, 4), type = R.pick(["more than", "fewer than", "at least"]);
    const cnt = f => sum(counts.filter((_, v) => f(v)));
    const correct = type === "more than" ? cnt(v => v > k) : type === "fewer than" ? cnt(v => v < k) : cnt(v => v >= k);
    const slip = type === "more than" ? cnt(v => v >= k) : type === "fewer than" ? cnt(v => v <= k) : cnt(v => v > k);
    const cols = type === "more than" ? 6 - k : type === "fewer than" ? k : 7 - k;
    const o = opts(R, correct, [slip, counts[k], sum(counts) - correct, cols]);
    const which = type === "more than" ? `${k + 1} or more` : type === "fewer than" ? `${k - 1} or fewer` : `${k} or more`;
    return { ...o, data: { counts, type, k },
      stem: `<p>Some children were asked about ${c[0]}. Each dot is one child.</p>${dotPlot({ counts, label: c[1], aria: `A dot plot. ${counts.map((n, v) => `${v}: ${n} dot${n === 1 ? "" : "s"}`).join(". ")}.` })}<p>How many children ${c[2]} ${B(type + " " + k)}?</p>`,
      explain: `<p>“${type[0].toUpperCase() + type.slice(1)} ${k}” means ${which}. Count the dots above those numbers only: ${counts.map((n, v) => [n, v]).filter(([n, v]) => type === "more than" ? v > k : type === "fewer than" ? v < k : v >= k).map(([n]) => n).join(" + ")} = ${B(correct)}.</p><p class="why-not">${slip} ${type === "at least" ? "leaves out" : "wrongly includes"} the dots above ${k} itself. ${counts[k]} is only the dots above ${k}. ${cols} counts the numbers along the bottom, not the children.</p>` };
  });

  gen("bus", "maths", 2, "Time & timetables", R => {
    const stops = R.pick([["Wharf", "Market", "Library", "Zoo"], ["Station", "Pool", "Museum", "Beach"], ["Depot", "School", "Park", "Harbour"]]);
    const gaps = [R.int(7, 14), R.int(9, 18), R.int(11, 19)], t0 = R.int(8, 14) * 60 + R.pick([5, 10, 15, 20, 35, 40]);
    const offs = [0, R.int(5, 8) * 5, 0]; offs[2] = offs[1] + R.int(6, 9) * 5;
    const times = offs.map(o => { const r = [t0 + o]; gaps.forEach(g => r.push(r[r.length - 1] + g)); return r; });
    const s = R.int(0, 1), d = R.int(s + 1, 3), missed = R.int(0, 1), who = R.pick(NAMES);
    const arrive = times[missed][s] + R.int(2, 9), next = missed + 1;
    const correct = times[next][d] - arrive, ride = times[next][d] - times[next][s], wait = times[next][s] - arrive;
    const o = opts(R, correct, [ride, wait, times[missed][d] - arrive, correct + (times[next][s] - times[missed][s])], v => v + " minutes", 5, 5);
    return { ...o, data: { times, s, d, arrive },
      stem: `<p>Three buses run along the same route.</p>${tbl(["", "Bus 1", "Bus 2", "Bus 3"], stops.map((n, r) => [n, ...times.map(b => clock(b[r]))]))}<p>${who} gets to the ${B(stops[s])} stop at ${B(clock(arrive))} and takes the next bus to the ${B(stops[d])}.</p><p>How long is it from the moment ${who} reaches the stop until ${who} gets off at the ${stops[d]}?</p>`,
      explain: `<p>Bus ${missed + 1} left the ${stops[s]} at ${clock(times[missed][s])}, before ${who} arrived. The next one is Bus ${next + 1} at ${clock(times[next][s])}, which reaches the ${stops[d]} at ${clock(times[next][d])}.</p><p>From ${clock(arrive)} to ${clock(times[next][d])} is ${wait} minutes of waiting + ${ride} minutes on the bus = ${B(correct + " minutes")}.</p><p class="why-not">${ride} minutes is only the bus ride and ${wait} minutes is only the wait. Using Bus ${missed + 1} is no good: it had already gone.</p>` };
  });

  gen("rectperim", "maths", 2, "Area, perimeter & 3D", R => {
    const w = R.int(3, 8), l = R.int(w + 2, 12), A = w * l, thing = R.pick(["rug", "garden bed", "poster", "tabletop"]), u = thing === "garden bed" ? "m" : "cm";
    const o = opts(R, 2 * (w + l), [l, w + l, 4 * l, 2 * l + w, A + w], v => `${v} ${u}`);
    return { ...o, data: { A, w },
      stem: `<p>A rectangular ${thing} has an area of ${B(`${A} ${u}²`)}. One of its sides is ${B(`${w} ${u}`)} long.</p>${fig(`<svg viewBox="0 0 260 130" width="260" role="img" aria-label="A rectangle. One short side is labelled ${w} ${u}. The inside is labelled Area = ${A} square ${u}. The long side is not labelled. Not to scale."><rect x="50" y="18" width="170" height="78" fill="#dff0d8" stroke="${INK}" stroke-width="2.4"/>${T(135, 62, `Area = ${A} ${u}²`, 'text-anchor="middle" font-weight="700"')}${T(42, 62, `${w} ${u}`, 'text-anchor="end" font-weight="700"')}<text x="135" y="118" font-size="13" text-anchor="middle" fill="#55607a">not to scale</text></svg>`)}<p>What is the ${B("perimeter")} of the ${thing}?</p>`,
      explain: `<p>Area = length × width, so the other side is ${A} ÷ ${w} = ${l} ${u}.</p><p>The perimeter is the distance all the way round: ${l} + ${w} + ${l} + ${w} = ${B(`${2 * (w + l)} ${u}`)}.</p><p class="why-not">${l} ${u} is only the missing side. ${w + l} ${u} adds just two of the four sides, and ${4 * l} ${u} treats the shape as a square.</p>` };
  });

  gen("towers", "maths", 2, "Area, perimeter & 3D", R => {
    let g; do { g = Array.from({ length: 9 }, () => R.int(1, 5)); } while (new Set(g).size < 3 || g.filter(x => x === Math.max(...g)).length > 2);
    const mx = Math.max(...g), correct = sum(g.map(x => mx - x));
    const o = opts(R, correct, [sum(g), 9 * mx, g.filter(x => x < mx).length, mx - Math.min(...g)]);
    const rows = [0, 1, 2].map(r => g.slice(r * 3, r * 3 + 3));
    return { ...o, data: { grid: g },
      stem: `<p>${R.pick(NAMES)} builds nine towers of cubes on a 3 by 3 board. The plan shows the board from above. Each number tells you how many cubes are in that tower.</p><div class="figure"><table class="grid" style="font-weight:700">${rows.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join("")}</tr>`).join("")}</table></div><p>How many ${B("more")} cubes are needed to make ${B("every")} tower as tall as the tallest one?</p>`,
      explain: `<p>The tallest tower has ${mx} cubes. For each tower, work out how many it is short: ${rows.map(r => r.map(x => mx - x).join(", ")).join(" | ")}.</p><p>Add them up: ${B(correct)} more cubes.</p><p class="why-not">${sum(g)} is the number of cubes already there, and ${9 * mx} is how many there will be at the end (${9 * mx} − ${sum(g)} = ${correct}). ${g.filter(x => x < mx).length} is the number of short towers, not the number of cubes they need.</p>` };
  });

  gen("pattern", "maths", 2, "Patterns & sequences", R => {
    const S = R.shuffle(["🔺", "🟦", "🟡", "⭐"]), block = R.pick([[0, 1, 0, 2], [0, 0, 1, 2, 1], [0, 1, 2, 0, 2], [0, 1, 1, 0, 2], [0, 2, 0, 1]]).map(i => S[i]);
    const L = block.length, target = block[0], per = block.filter(x => x === target).length;
    const full = R.int(4, 7), rem = R.int(1, L - 1), N = full * L + rem, extra = block.slice(0, rem).filter(x => x === target).length;
    const correct = full * per + extra;
    const o = opts(R, correct, [full * per, (full + 1) * per, full, N - correct]);
    return { ...o, data: { block, N, target },
      stem: `<p>These shapes repeat in the same order for ever:</p><p style="font-size:24px;letter-spacing:2px;text-align:center">${block.join("")}${block.join("")}${block.join("")} …</p><p>How many of the ${B("first " + N)} shapes are ${target}?</p>`,
      explain: `<p>The repeating block is ${block.join("")}: ${L} shapes, with ${per} ${target} in it.</p><p>${N} ÷ ${L} = ${full} whole blocks with ${rem} shape${rem === 1 ? "" : "s"} left over. The whole blocks give ${full} × ${per} = ${full * per}. The leftover ${block.slice(0, rem).join("")} ${extra ? `add${rem === 1 ? "s" : ""} ${extra} more` : "add none"}: ${B(correct)}.</p><p class="why-not">${full * per} forgets the leftover shapes at the end${extra ? "" : " (here they add nothing, so check them anyway)"}. ${(full + 1) * per} counts a whole extra block that is not finished. ${full} is the number of blocks, not the number of ${target}.</p>` };
  });

  gen("unitprice", "maths", 2, "Money & best value", R => {
    const item = R.pick([["muesli bars", "bar"], ["pencils", "pencil"], ["bread rolls", "roll"], ["tennis balls", "ball"]]);
    let off, best, text;
    do {
      const ns = R.shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 5).sort((a, b) => a - b), us = R.shuffle([45, 50, 55, 60, 65, 70, 75, 80, 85, 90]).slice(0, 5);
      off = ns.map((n, i) => [n, n * us[i]]);
      best = off.findIndex(o => o[1] / o[0] === Math.min(...us));
      text = off.map(o => `${o[0]} for ${money(o[1])}`);
    } while (best === 4 || off[best][1] === Math.min(...off.map(o => o[1])) || (text.filter(t => t.length === text[best].length).length === 1 && text[best].length === Math.max(...text.map(t => t.length))));
    return { options: text, answer: best, data: { offers: off },
      stem: `<p>Five shops sell the same ${item[0]} in packs of different sizes.</p><p>Which pack has the ${B(`lowest price for each ${item[1]}`)}?</p>`,
      explain: `<p>Divide each price by the number of ${item[0]} to find the price of one:</p><p>${off.map(o => `${o[0]} for ${money(o[1])} → ${o[1] / o[0]}c each`).join("<br>")}</p><p>The lowest is ${B(text[best])}, at ${off[best][1] / off[best][0]}c each.</p><p class="why-not">The pack with the smallest price tag is not the best value: it just has fewer ${item[0]} in it. The biggest pack is not always the cheapest for each ${item[1]} either. You have to divide.</p>` };
  });

  gen("daysago", "maths", 2, "Time & timetables", R => {
    const d = R.int(0, 6), N = R.pick([23, 25, 26, 30, 31, 33, 37, 38, 40, 44, 45, 47, 50, 52, 54, 58, 60]), back = ((d - N) % 7 + 7) % 7, fwd = (d + N) % 7;
    const set = [back]; for (const x of [fwd, d, (back + 1) % 7, (back + 6) % 7, (back + 2) % 7, (back + 5) % 7]) if (!set.includes(x) && set.length < 5) set.push(x);
    set.sort((a, b) => a - b);
    const what = R.pick(["a school camp ended", "a kitten was born", "the swimming term began", "a tooth fell out"]);
    return { options: set.map(x => DAYS[x]), answer: set.indexOf(back), data: { day: d, N },
      stem: `<p>Today is ${B(DAYS[d])}. Exactly ${B(N + " days ago")}, ${what}.</p><p>What day of the week was that?</p>`,
      explain: `<p>Every 7 days is the same day of the week. ${N} = ${Math.floor(N / 7)} × 7 + ${N % 7}, so ${Math.floor(N / 7) * 7} days ago was also a ${DAYS[d]}.</p><p>Now count back the other ${N % 7} day${N % 7 === 1 ? "" : "s"} from ${DAYS[d]}: ${B(DAYS[back])}.</p><p class="why-not">${DAYS[fwd]} comes from counting forwards instead of back. ${DAYS[d]} would be right only if ${N} were a multiple of 7. The other days are one step out, from counting today as the first day.</p>` };
  });

  gen("gridperim", "maths", 2, "Area, perimeter & 3D", R => {
    let h; do { h = Array.from({ length: R.int(4, 5) }, () => R.int(1, 4)); } while (new Set(h).size < 3 || !h.some((x, i) => i > 0 && i < h.length - 1 && x < h[i - 1] && x < h[i + 1]));
    const n = h.length, mx = Math.max(...h), correct = 2 * n + h[0] + h[n - 1] + sum(h.slice(1).map((x, i) => Math.abs(x - h[i])));
    const u = 28, W = n * u + 20, H = mx * u + 20;
    let g = ""; h.forEach((c, x) => { for (let k = 0; k < c; k++) g += `<rect x="${10 + x * u}" y="${H - 10 - (k + 1) * u}" width="${u}" height="${u}" fill="#c9d6f2" stroke="${INK}" stroke-width="1.5"/>`; });
    const o = opts(R, correct, [sum(h), 2 * (n + mx), correct - 2, correct + 2, correct + 4], v => v + " cm");
    return { ...o, data: { heights: h },
      stem: `<p>This shape is made of small squares. Each small square has sides ${B("1 cm")} long.</p>${fig(`<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="A shape made of columns of small squares standing side by side on a flat base. From left to right the columns are ${h.join(", ")} squares tall.">${g}</svg>`)}<p>What is the ${B("perimeter")} of the whole shape?</p>`,
      explain: `<p>The perimeter is the distance round the outside. Go round the edge and count 1 cm for each side of a small square you pass.</p><p>Along the bottom: ${n}. Along the tops: ${n}. Up and down the sides and steps: ${correct - 2 * n}. Altogether ${B(correct + " cm")}.</p><p class="why-not">${sum(h)} is the number of squares (the area), not the distance round. ${2 * (n + mx)} cm is the perimeter of a plain rectangle drawn round the shape: it misses the extra up-and-down edges inside the dip.</p>` };
  });

  gen("recipe", "maths", 2, "Rates", R => {
    const c = R.pick([["cups of flour", "muffins", "A baker uses"], ["scoops of seed", "budgies", "A bird keeper needs"], ["tins of paint", "fence panels", "A painter uses"], ["bags of soil", "flower pots", "A gardener uses"]]);
    const u = R.int(3, 6), a = R.int(2, 4), b = a * u; let x; do { x = R.int(5, 9); } while (x === a || x === 2 * a);
    const cc = x * u;
    const o = opts(R, x, [cc - b + a, u, cc - b, Math.round(cc / a)]);
    return { ...o, data: { a, b, c: cc },
      stem: `<p>${c[2]} ${B(`${a} ${c[0]}`)} for every ${B(`${b} ${c[1]}`)}.</p><p>At the same rate, how many ${c[0]} are needed for ${B(`${cc} ${c[1]}`)}?</p>`,
      explain: `<p>First find what one ${c[0].replace(/s? of/, " of")} does: ${b} ÷ ${a} = ${u} ${c[1]}.</p><p>Then ${cc} ÷ ${u} = ${B(x)} ${c[0]}.</p><p class="why-not">${cc - b + a} comes from adding: “${cc - b} more ${c[1]}, so ${cc - b} more ${c[0].split(" ")[0]}”. A rate works by multiplying and dividing, not by adding. ${u} is the number of ${c[1]} for one ${c[0].replace(/s? of.*/, "")}, which is only the first step.</p>` };
  });

  /* ================= MATHS, circle 3 (and the boss) ================= */

  gen("twojugs", "maths", 3, "Measurement & scales", R => {
    const [sa, sb] = R.shuffle([[100, 4], [50, 5], [100, 5], [200, 4], [100, 2], [20, 4]]).slice(0, 2);
    const mk = ([major, minor], title, color) => { const base = major * R.int(1, 3), t = R.int(1, minor - 1); return { max: major * 4, major, minor, level: base + t * (major / minor), unit: "mL", title, color, base, t }; };
    let A, Bj; do { A = mk(sa, "Flask A", "#8fd3ff"); Bj = mk(sb, "Flask B", "#f6c453"); } while (A.level === Bj.level);
    const total = R.chance(.6), big = A.level > Bj.level ? A : Bj, sm = big === A ? Bj : A;
    const correct = total ? A.level + Bj.level : big.level - sm.level;
    const mis = (j, small) => j.base + j.t * small, sA = A.major / A.minor, sB = Bj.major / Bj.minor;
    const other = total ? big.level - sm.level : A.level + Bj.level;
    const o = opts(R, correct, [total ? A.level + mis(Bj, sA) : Math.abs(A.level - mis(Bj, sA)), total ? mis(A, sB) + Bj.level : Math.abs(mis(A, sB) - Bj.level), total ? A.base + Bj.base : Math.abs(A.base - Bj.base), other], v => v + " mL", 5, Math.min(sA, sB));
    return { ...o, data: { A: { major: A.major, minor: A.minor, level: A.level }, B: { major: Bj.major, minor: Bj.minor, level: Bj.level }, total },
      stem: `<p>Two flasks hold coloured water. Look carefully: their scales are ${B("different")}.</p>${fig(`<svg viewBox="0 0 360 262" width="360" role="img" aria-label="${jugAria(A)} ${jugAria(Bj)}">${jugSvg(A)}${jugSvg({ ...Bj, x: 175 })}</svg>`)}<p>${total ? `All the water from both flasks is poured into one bucket. How much water is in the bucket?` : `How much ${B("more")} water is in Flask ${big === A ? "A" : "B"} than in Flask ${big === A ? "B" : "A"}?`}</p>`,
      explain: `<p>Work out each small step separately. Flask A: ${A.major} ÷ ${A.minor} = ${sA} mL a step, so it holds ${A.base} + ${A.t} × ${sA} = ${A.level} mL. Flask B: ${Bj.major} ÷ ${Bj.minor} = ${sB} mL a step, so it holds ${Bj.base} + ${Bj.t} × ${sB} = ${Bj.level} mL.</p><p>${total ? `${A.level} + ${Bj.level}` : `${big.level} − ${sm.level}`} = ${B(correct + " mL")}.</p><p class="why-not">The trap is using one flask’s step size for both. Reading only the labels and ignoring the small marks is the other slip. ${other} mL answers the wrong question (${total ? "the difference, not the total" : "the total, not the difference"}).</p>` };
  });

  gen("pictkey", "maths", 3, "Graphs & data", R => {
    const c = R.pick([{ rows: ["Kai", "Lena", "Moss", "Nell"], item: "stickers", say: "The four friends have", col: "#b197fc" }, { rows: ["North", "South", "East", "West"], item: "tickets", say: "The four gates sold", col: "#ffa94d" }, { rows: ["Mon", "Tue", "Wed", "Thu"], item: "pies", say: "Over the four days the bakery sold", col: "#e8a05b" }]);
    const key = R.pick([4, 6, 8, 10, 20]);
    let h, x; do { h = R.shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4); x = R.int(0, 3); } while (sum(h) % 2 || h.every(v => v % 2 === 0) || h[x] === 2);
    const rows = c.rows.map((n, i) => [n, h[i] / 2]), syms = sum(h) / 2, total = syms * key, correct = rows[x][1] * key;
    const o = opts(R, correct, [total / 4, key, Math.ceil(rows[x][1]) * key, total - correct, Math.ceil(rows[x][1])].filter(Number.isInteger), String, 5, key / 2);
    return { ...o, data: { rows, total, x },
      stem: `<p>The key has been torn off this picture graph. Every whole symbol stands for the same number of ${c.item}.</p>${pictGraph({ rows, keyText: "", color: c.col, aria: `A picture graph with no key. ${rows.map(r => `${r[0]}: ${sy(r[1])}`).join(". ")}.` })}<p>${c.say} ${B(`${total} ${c.item}`)} altogether.</p><p>How many ${c.item} does the row for ${B(rows[x][0])} show?</p>`,
      explain: `<p>Count all the symbols: ${rows.map(r => r[1]).join(" + ")} = ${syms}. They stand for ${total} ${c.item}, so one whole symbol is ${total} ÷ ${syms} = ${key}.</p><p>${rows[x][0]} has ${sy(rows[x][1])}: ${rows[x][1]} × ${key} = ${B(correct)}.</p><p class="why-not">${key} is the value of one symbol: one step too early. Sharing ${total} equally among the four rows ignores the picture. Counting a half symbol as a whole one makes the answer too big.</p>` };
  });

  gen("backwards", "maths", 3, "Number & place value", R => {
    const a = R.int(3, 9), m = R.int(2, 5), c = R.int(2, 12), x = R.int(4, 15), r = (x + a) * m - c, who = R.pick(NAMES);
    const o = opts(R, x, [(r + a) * m - c, x + a, (r + c) % m === 0 && (r + c - a) > 0 ? r + c - a : -1, Number.isInteger(r / m) ? r / m + c - a : -1, r + c]);
    return { ...o, data: { a, m, c, r },
      stem: `<p>${who} thinks of a number, ${B("adds " + a)}, ${B("multiplies the result by " + m)} and then ${B("subtracts " + c)}.</p><p>The answer is ${B(r)}. What number did ${who} start with?</p>`,
      explain: `<p>Work backwards, undoing each step in reverse order.</p><p>Undo “subtract ${c}”: ${r} + ${c} = ${r + c}. Undo “multiply by ${m}”: ${r + c} ÷ ${m} = ${x + a}. Undo “add ${a}”: ${x + a} − ${a} = ${B(x)}.</p><p>Check: (${x} + ${a}) × ${m} − ${c} = ${r}.</p><p class="why-not">${x + a} stops one step early. ${(r + a) * m - c} does the steps forwards starting from ${r} instead of undoing them.</p>` };
  });

  gen("sumdiff", "maths", 3, "Number & place value", R => {
    const c = R.pick([["marbles", "have", "does", "have", "has"], ["trading cards", "have", "does", "have", "has"], ["points", "scored", "did", "score", "scored"], ["laps", "ran", "did", "run", "ran"]]), [p, q] = R.shuffle(NAMES).slice(0, 2);
    const small = R.int(9, 30), D = 2 * R.int(2, 8), S = 2 * small + D, big = small + D, askBig = R.chance(.5), correct = askBig ? big : small;
    const o = opts(R, correct, [S / 2, askBig ? small : big, S - D, S / 2 + D, S / 2 - D].filter(Number.isInteger));
    return { ...o, data: { S, D, askBig },
      stem: `<p>Together ${p} and ${q} ${c[1]} ${B(`${S} ${c[0]}`)}. ${p} ${c[4]} ${B(D + " more")} than ${q}.</p><p>How many ${c[0]} ${c[2]} ${askBig ? p : q} ${c[3]}?</p>`,
      explain: `<p>Take away the extra ${D} first: ${S} − ${D} = ${S - D}. That is two equal shares, so ${q}’s number is ${S - D} ÷ 2 = ${small} and ${p}’s is ${small} + ${D} = ${big}.</p><p>Check: ${big} + ${small} = ${S}, and ${big} − ${small} = ${D}. The answer is ${B(correct)}.</p><p class="why-not">${S / 2} just halves the total, which would make them equal. ${askBig ? small : big} is the other child’s number. ${S - D} stops before sharing into two.</p>` };
  });

  gen("tworates", "maths", 3, "Rates", R => {
    const [p, q] = R.pick([[5, 10], [10, 15], [4, 6], [6, 9], [10, 20], [5, 15]]), a = R.int(2, 6), b = R.int(3, 9), c = R.pick([["printers", "pages", "prints"], ["bakers", "pies", "makes"], ["machines", "badges", "makes"], ["taps", "litres", "pours"]]);
    const lcm = [p, q].reduce((x, y) => { let g = x, h = y; while (h) [g, h] = [h, g % h]; return x * y / g; }), T = lcm * R.int(2, 4);
    const correct = T / p * a + T / q * b;
    const o = opts(R, correct, [(a + b) * T / p, (a + b) * T / q, T / p * a, a + b, Number.isInteger(T / (p + q)) ? (a + b) * T / (p + q) : -1]);
    const one = c[0].slice(0, -1), cap = one[0].toUpperCase() + one.slice(1);
    return { ...o, data: { a, p, b, q, T },
      stem: `<p>${cap} A ${c[2]} ${B(`${a} ${c[1]} every ${p} minutes`)}. ${cap} B ${c[2]} ${B(`${b} ${c[1]} every ${q} minutes`)}.</p><p>Both start together and keep going at the same rate. How many ${c[1]} do they ${c[2] === "pours" ? "pour" : c[2] === "prints" ? "print" : "make"} altogether in ${B(T + " minutes")}?</p>`,
      explain: `<p>Work each one out for the whole ${T} minutes. A: ${T} ÷ ${p} = ${T / p} lots of ${a} = ${T / p * a}. B: ${T} ÷ ${q} = ${T / q} lots of ${b} = ${T / q * b}.</p><p>Altogether ${T / p * a} + ${T / q * b} = ${B(correct)} ${c[1]}.</p><p class="why-not">You can’t add ${a} and ${b} and use one time, because the two times (${p} and ${q} minutes) are different: that gives ${(a + b) * T / p} or ${(a + b) * T / q}. ${T / p * a} counts only ${one} A.</p>` };
  });

  gen("statements", "maths", 3, "Graphs & data", R => {
    const c = R.pick([{ labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], y: "Pies sold", n: "pies", v: "sold", col: "#e8a05b" }, { labels: ["Ali", "Bea", "Cam", "Dot", "Eve"], y: "Laps swum", n: "laps", v: "swam", col: "#4dabf7" }, { labels: ["Ash", "Bay", "Elm", "Oak", "Fir"], y: "Nests counted", n: "nests", v: "had", col: "#69db7c" }]);
    const NAMESETS = ["1 only", "2 only", "3 only", "1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"], label = t => t[0] && t[1] && t[2] ? "1, 2 and 3" : t.filter(Boolean).length === 2 ? `${t[0] ? 1 : 2} and ${t[2] ? 3 : 2} only` : `${t.indexOf(true) + 1} only`;
    let v, st, truth;
    for (;;) {
      v = Array.from({ length: 5 }, () => R.int(2, 12));
      const [x, y] = R.shuffle([0, 1, 2, 3, 4]), [p, q, r, s] = R.shuffle([0, 1, 2, 3, 4]), tot = sum(v), n = tot + R.pick([-6, -4, -2, 2, 4]), k = R.pick([2, 3]);
      st = [{ t: "times", x, y, k }, { t: "pairs", p, q, r, s }, { t: "total", n }];
      truth = [v[x] === k * v[y], v[p] + v[q] > v[r] + v[s], tot > n];
      if (new Set(v).size >= 4 && truth.some(Boolean) && v[x] > v[y] && Math.abs(v[x] - k * v[y]) <= 2 && v[p] + v[q] !== v[r] + v[s] && Math.abs(v[p] + v[q] - v[r] - v[s]) <= 4) break;
    }
    const L = c.labels;
    const text = [`The column for ${L[st[0].x]} shows exactly ${st[0].k === 2 ? "twice" : "three times"} as many ${c.n} as the column for ${L[st[0].y]}.`,
      `${L[st[1].p]} and ${L[st[1].q]} together show more ${c.n} than ${L[st[1].r]} and ${L[st[1].s]} together.`,
      `The five columns show more than ${st[2].n} ${c.n} altogether.`];
    const right = label(truth), others = R.shuffle(NAMESETS.filter(n => n !== right)).slice(0, 4), options = NAMESETS.filter(n => n === right || others.includes(n));
    const why = [`${L[st[0].x]} = ${v[st[0].x]} and ${L[st[0].y]} = ${v[st[0].y]}; ${st[0].k} × ${v[st[0].y]} = ${st[0].k * v[st[0].y]}`, `${v[st[1].p]} + ${v[st[1].q]} = ${v[st[1].p] + v[st[1].q]} and ${v[st[1].r]} + ${v[st[1].s]} = ${v[st[1].r] + v[st[1].s]}`, `the total is ${v.join(" + ")} = ${sum(v)}`];
    return { options, answer: options.indexOf(right), data: { values: v, st },
      stem: colGraph({ labels: L, series: [{ name: "", color: c.col, values: v }], max: 12, step: 2, ylabel: c.y, aria: `A column graph. The scale goes 0, 2, 4, 6, 8, 10, 12. ${L.map((l, i) => `${l} ${v[i] % 2 ? "is halfway between " + (v[i] - 1) + " and " + (v[i] + 1) : "reaches " + v[i]}`).join(". ")}.` }) + `<p>Here are three statements about the graph.</p><div class="box">${text.map((t, i) => `${i + 1}. ${t}`).join("<br>")}</div><p>Which statements are ${B("correct")}?</p>`,
      explain: `<p>Read each column first (a column halfway between two lines is the odd number in between): ${L.map((l, i) => `${l} ${v[i]}`).join(", ")}.</p><p>${truth.map((t, i) => `Statement ${i + 1} is ${B(t ? "correct" : "wrong")}: ${why[i]}.`).join("<br>")}</p><p>So the answer is ${B(right)}.</p><p class="why-not">Each statement has to be tested with the real numbers. “About twice” is not “exactly twice”, and a total that is close to ${st[2].n} must still be added up carefully.</p>` };
  });

  gen("lshape", "maths", 3, "Area, perimeter & 3D", R => {
    const W = R.int(7, 12), H = R.int(6, 10), a = R.int(2, W - 3), b = R.int(2, H - 3), top = W - a, right = H - b, correct = W * H - a * b, thing = R.pick(["playground", "courtyard", "vegetable patch", "hall floor"]);
    const o = opts(R, correct, [W * H, top * H + W * right, top * right, 2 * (W + H), W + H + top + right], v => v + " m²");
    const sx = 190 / 12, X = v => 40 + v * sx, Y = v => 150 - v * (120 / 10);
    return { ...o, data: { W, H, top, right },
      stem: `<p>The plan shows an L-shaped ${thing}. Every corner is a right angle.</p>${fig(`<svg viewBox="0 0 300 190" width="300" role="img" aria-label="An L-shaped plan with six sides. The bottom side is ${W} m and the left side is ${H} m. The top side is ${top} m and the right side is ${right} m. The two sides of the step cut out of the top right corner are not labelled. Not to scale."><path d="M${X(0)} ${Y(0)}H${X(11)}V${Y(4.5)}H${X(6.5)}V${Y(9)}H${X(0)}Z" fill="#dff0d8" stroke="${INK}" stroke-width="2.4"/>${T(X(5.5), Y(0) + 18, W + " m", 'text-anchor="middle" font-weight="700"')}${T(X(0) - 6, Y(4.5) + 5, H + " m", 'text-anchor="end" font-weight="700"')}${T(X(3.2), Y(9) - 6, top + " m", 'text-anchor="middle" font-weight="700"')}${T(X(11) + 6, Y(2.2) + 5, right + " m", 'font-weight="700"')}<text x="150" y="186" font-size="13" text-anchor="middle" fill="#55607a">not to scale</text></svg>`)}<p>What is the ${B("area")} of the ${thing}?</p>`,
      explain: `<p>Split the L into two rectangles with a line straight down from the inside corner. The left part is ${top} m wide and ${H} m tall: ${top} × ${H} = ${top * H}. The right part is ${W} − ${top} = ${a} m wide and ${right} m tall: ${a} × ${right} = ${a * right}.</p><p>${top * H} + ${a * right} = ${B(correct + " m²")}. (Or take the missing corner from the full rectangle: ${W} × ${H} − ${a} × ${b} = ${correct}.)</p><p class="why-not">${W * H} m² is the full rectangle with nothing cut out. ${top * H + W * right} m² counts the overlapping part twice. ${2 * (W + H)} is the perimeter, not the area.</p>` };
  });

  gen("fracleft", "maths", 3, "Fractions", R => {
    const a = R.int(3, 5), b = R.int(2, 4), k = R.int(1, 4), N = a * b * k * (a * b * k < 12 ? 2 : 1), who = R.pick(NAMES), c = R.pick(["stickers", "grapes", "marbles", "football cards"]);
    const g1 = N / a, rest = N - g1, g2 = rest / b, correct = rest - g2, [f1, f2] = R.shuffle(["a cousin", "a neighbour", "a friend", "a brother"]).slice(0, 2);
    const o = opts(R, correct, [N - g1 - N / b, rest, g2, g1 + g2, g1].filter(Number.isInteger));
    const fr = d => d === 2 ? "one half" : d === 3 ? "one third" : d === 4 ? "one quarter" : "one fifth";
    return { ...o, data: { N, a, b },
      stem: `<p>${who} has ${B(`${N} ${c}`)}. ${who} gives ${B(fr(a))} of them to ${f1}, and then gives ${B(fr(b) + " of what is left")} to ${f2}.</p><p>How many ${c} does ${who} have now?</p>`,
      explain: `<p>First gift: ${N} ÷ ${a} = ${g1}, leaving ${N} − ${g1} = ${rest}.</p><p>Second gift: ${fr(b)} of <i>what is left</i> is ${rest} ÷ ${b} = ${g2}, leaving ${rest} − ${g2} = ${B(correct)}.</p><p class="why-not">${rest} stops after the first gift. ${g2} is the second gift, not what ${who} keeps. ${Number.isInteger(N / b) ? `${N - g1 - N / b} takes ${fr(b)} of all ${N} instead of ${fr(b)} of the ${rest} left.` : `Taking ${fr(b)} of all ${N}, instead of the ${rest} left, is the other trap.`}</p>` };
  });

  /* ================= THINKING (four options) ================= */

  gen("freeday", "thinking", 1, "Tables & timetables", R => {
    const kids = R.shuffle(NAMES).slice(0, 4), acts = R.shuffle(["Swimming", "Chess", "Dance", "Soccer", "Choir", "Drama", "Tennis", "Art", "Judo", "Band"]);
    const days = [0, 1, 2, 3, 4], [dc, d1, ...rest] = R.shuffle(days), X = R.int(0, 3), other = R.pick([0, 1, 2, 3].filter(k => k !== X));
    const busy = days.map(() => [false, false, false, false]);
    busy[dc][X] = true; busy[d1][other] = true;
    rest.forEach((d, i) => R.shuffle([0, 1, 2, 3]).slice(0, i === 2 ? 3 : 2).forEach(k => busy[d][k] = true));
    const act = kids.map((_, k) => acts[k]), short = DAYS.slice(0, 5);
    const set = [dc, d1, ...R.shuffle(rest).slice(0, 2)].sort((x, y) => x - y);
    return { options: set.map(d => short[d]), answer: set.indexOf(dc), data: { busy, cancel: [X, dc] },
      stem: `<p>The table shows the days when four friends have an after-school activity.</p>${tbl(["", "Mon", "Tue", "Wed", "Thu", "Fri"], kids.map((n, k) => [n, ...days.map(d => busy[d][k] ? act[k] : "–")]))}<p>This week, ${B(`${kids[X]}’s ${act[X].toLowerCase()} on ${short[dc]} has been cancelled`)}.</p><p>On which day this week can ${B("all four")} friends meet after school?</p>`,
      explain: `<p>Go down each day’s column and look for a day with no activities at all. In the table as printed, every day has at least one.</p><p>Now use the extra fact: on ${short[dc]} the only activity is ${kids[X]}’s ${act[X].toLowerCase()}, and it is cancelled. So ${B(short[dc])} is free for everyone.</p><p class="why-not">${short[d1]} also has just one activity, but it is ${kids[other]}’s, and that one is still on. The other days have two or more friends busy.</p>` };
  });

  gen("shiftcode", "thinking", 1, "Rules & codes", R => {
    const s = R.int(2, 3), word = R.pick(["PLAY", "MAZE", "ROXY", "JUMP", "FIZZ", "KITE", "WAVY", "LYNX", "ZERO", "BOXY", "COZY", "YARD", "HAZY", "STORM", "WHIZ"]);
    const enc = (w, k) => [...w].map(ch => String.fromCharCode((ch.charCodeAt(0) - 65 + k + 26) % 26 + 65)).join("");
    const right = enc(word, s), i = R.int(1, word.length - 1), part = right.slice(0, i) + word[i] + right.slice(i + 1);
    const nowrap = [...word].map(ch => { const c = ch.charCodeAt(0) - 65 + s; return c > 25 ? ch : String.fromCharCode(c + 65); }).join("");
    const set = [right]; for (const w of [enc(word, -s), nowrap, enc(word, s === 2 ? 3 : 2), part, enc(word, 1)]) if (!set.includes(w) && set.length < 4) set.push(w);
    const options = R.shuffle(set);
    return { options, answer: options.indexOf(right), data: { word, s },
      stem: `<p>In a secret code, each letter is swapped for the letter ${B(`${s === 2 ? "two" : "three"} places later`)} in the alphabet. After Z the alphabet starts again at A.</p><p>So ${B("CAB")} is written as ${B(enc("CAB", s))}.</p><p>How is ${B(word)} written in the code?</p>`,
      explain: `<p>Move each letter ${s} places on, one letter at a time: ${[...word].map(ch => `${ch} → ${enc(ch, s)}`).join(", ")}.</p><p>${word} becomes ${B(right)}.</p><p class="why-not">${enc(word, -s)} moves the letters backwards instead of forwards. Watch the letters near the end of the alphabet: after Z you carry on from A. A code word with one letter left unchanged, or moved the wrong number of places, is also wrong.</p>` };
  });

  gen("droplow", "thinking", 2, "Tables & timetables", R => {
    const names = R.shuffle(NAMES).slice(0, 4), c = R.pick([["a spelling contest", "round", "points"], ["a diving contest", "dive", "points"], ["a quiz", "round", "marks"]]);
    let sc, best, tot;
    for (;;) {
      sc = names.map(() => [R.int(3, 10), R.int(3, 10), R.int(3, 10)]);
      best = sc.map(r => sum(r) - Math.min(...r)); tot = sc.map(sum);
      const w = best.indexOf(Math.max(...best)), t = tot.indexOf(Math.max(...tot));
      if (best.filter(x => x === best[w]).length === 1 && tot.filter(x => x === tot[t]).length === 1 && w !== t) break;
    }
    const w = best.indexOf(Math.max(...best)), t = tot.indexOf(Math.max(...tot));
    const cap = c[1][0].toUpperCase() + c[1].slice(1);
    return { options: names, answer: w, data: { scores: sc },
      stem: `<p>Four children took part in ${c[0]} with three ${c[1]}s. Each child’s ${B(`lowest ${c[1]} does not count`)}. The winner is the child with the highest total from the other two ${c[1]}s.</p>${tbl(["", `${cap} 1`, `${cap} 2`, `${cap} 3`], names.map((n, i) => [n, ...sc[i]]))}<p>Who won?</p>`,
      explain: `<p>For each child, cross out the lowest ${c[1]} and add the other two:</p><p>${names.map((n, i) => `${n}: ${sc[i].slice().sort((x, y) => y - x).slice(0, 2).join(" + ")} = ${best[i]}`).join("<br>")}</p><p>The highest is ${B(names[w])} with ${best[w]}.</p><p class="why-not">${names[t]} has the biggest total when all three ${c[1]}s are added (${tot[t]}), but the rule throws one ${c[1]} away. Having the single best ${c[1]} is not enough either: two ${c[1]}s count.</p>` };
  });

  /* tables with totals: the same method and the same words every time */
  const METHOD = `<p>Find a row or column with only <b>one</b> number missing. Total − the numbers you know = the missing number. Fill it in, then look again: a new row or column may now have only one gap.</p>`;
  const CIRC = ["①", "②", "③"];
  gen("totals2", "thinking", 2, "Tables & timetables", R => {
    const c = R.pick([{ rows: ["Mon", "Tue", "Wed"], cols: R.shuffle(NAMES).slice(0, 3), what: "how many pages three children read on three days" }, { rows: ["Week 1", "Week 2", "Week 3"], cols: ["Cans", "Bottles", "Boxes"], what: "what a class recycled over three weeks" }, { rows: ["Red team", "Blue team", "Gold team"], cols: ["Run", "Swim", "Jump"], what: "the points three teams won in three events" }]);
    let v, r1, r2, r3, c1;
    do { v = [0, 1, 2].map(() => [0, 1, 2].map(() => R.int(3, 15))); [r1, r2, r3] = R.shuffle([0, 1, 2]); c1 = R.int(0, 2); } while (v[r1][c1] === v[r2][c1]);
    const rt = v.map(sum), ct = [0, 1, 2].map(j => v[0][j] + v[1][j] + v[2][j]), g1 = v[r1][c1], g2 = v[r2][c1];
    const cells = v.map((row, i) => [...row.map((x, j) => (j === c1 && (i === r1 || i === r2)) ? null : x), i === r2 ? null : rt[i]]);
    const show = (fillIn) => tbl(["", ...c.cols, "Total"], [...cells.map((row, i) => [c.rows[i], ...row.map((x, j) => x !== null ? x : fillIn ? (j === 3 ? `③ ${rt[i]}` : i === r1 ? `① ${g1}` : `② ${g2}`) : "?")]), ["Total", ...ct, ""]], fillIn ? [[r1, c1 + 1], [r2, c1 + 1], [r2, 4]] : []);
    const c2 = (c1 + 1) % 3, wrongRow = ct[c1] - v[r3][c1] - v[r1][c2];
    const o = opts(R, g2, [g1, g1 + g2, wrongRow, ct[c1]], String, 4);
    return { ...o, data: { cells, colTotals: ct, ask: [r2, c1] },
      stem: `<p>The table shows ${c.what}. Some of the numbers are missing.</p>${show(false)}<p>What number belongs in the ${B(c.rows[r2])} row under ${B(c.cols[c1])}?</p>`,
      explain: `${METHOD}<p>① The ${c.rows[r1]} row has one gap: ${rt[r1]} − ${cells[r1].slice(0, 3).filter(x => x !== null).join(" − ")} = ${g1}.<br>② Now the ${c.cols[c1]} column has only one gap: ${ct[c1]} − ${g1} − ${v[r3][c1]} = ${B(g2)}.<br>③ (The ${c.rows[r2]} total could now be filled in too: ${rt[r2]}.)</p>${show(true)}<p class="why-not">${g1} is the first number you find, but it sits in the ${c.rows[r1]} row, not the one asked for. ${g1 + g2} comes from taking away only the number that was printed in the column and stopping. ${ct[c1]} is the column’s total, not a missing number.</p>` };
  });

  gen("totals3", "thinking", 3, "Tables & timetables", R => {
    const c = R.pick([{ rows: ["Class 4A", "Class 4B", "Class 4C", "Class 4D"], cols: ["Cats", "Dogs", "Fish"], what: "the pets owned by the children in four classes", all: "pets" }, { rows: ["Friday", "Saturday", "Sunday", "Monday"], cols: ["Apples", "Pears", "Plums"], what: "the boxes of fruit a stall sold over four days", all: "boxes" }, { rows: ["North", "South", "East", "West"], cols: ["Gold", "Silver", "Bronze"], what: "the medals four houses won at a carnival", all: "medals" }]);
    const v = [0, 1, 2, 3].map(() => [0, 1, 2].map(() => R.int(4, 16))), rt = v.map(sum), grand = sum(rt), r = R.int(0, 3), j = R.int(0, 2), g = v[r][j];
    const known = sum(v[r]) - g;
    const cells = v.map((row, i) => [...row.map((x, k) => i === r && k === j ? null : x), i === r ? null : rt[i]]);
    const show = fillIn => tbl(["", ...c.cols, "Total"], [...cells.map((row, i) => [c.rows[i], ...row.map((x, k) => x !== null ? x : fillIn ? (k === 3 ? `① ${rt[r]}` : `② ${g}`) : "?")]), ["All " + c.all, "", "", "", grand]], fillIn ? [[r, 4], [r, j + 1]] : []);
    const others = rt.filter((_, i) => i !== r);
    const o = opts(R, g, [rt[r], known, rt[r] + others[2] - known], String, 4);
    return { ...o, data: { cells, grand, ask: [r, j] },
      stem: `<p>The table shows ${c.what}. Two numbers are missing, and the bottom row shows only the grand total.</p>${show(false)}<p>What number belongs in the ${B(c.rows[r])} row under ${B(c.cols[j])}?</p>`,
      explain: `${METHOD}<p>The ${c.rows[r]} row has <i>two</i> gaps, so start somewhere else. The Total column has only one gap, and its total is the grand total.</p><p>① ${c.rows[r]} total: ${grand} − ${others.join(" − ")} = ${rt[r]}.<br>② Now the ${c.rows[r]} row has one gap: ${rt[r]} − ${v[r].filter((_, k) => k !== j).join(" − ")} = ${B(g)}.</p>${show(true)}<p class="why-not">${rt[r]} is the row’s total: one step too early. ${known} is just the two numbers already printed in the row, added together. Leaving one of the other row totals out of the subtraction gives a number that is too big.</p>` };
  });

  gen("sessions", "thinking", 2, "Number problems", R => {
    const club = R.pick(["Chess club", "The choir", "Robotics club", "The running group"]), ds = R.pick([["Tuesday", "Thursday"], ["Monday", "Wednesday", "Friday"], ["Monday", "Thursday"], ["Tuesday", "Wednesday", "Friday"]]), d = ds.length, W = R.int(8, 11), wk = R.int(3, W - 2);
    const hol = ds[d - 1], correct = d * W - d - 1;
    const o = opts(R, correct, [d * W, d * W - d, d * W - 1, d * W - 2, d * (W - 1) - d], String, 4);
    return { ...o, data: { d, W },
      stem: `<p>${club} meets every ${ds.slice(0, -1).join(", ")} and ${hol} during a term of ${B(W + " weeks")}.</p><p>There were no meetings at all in week ${wk} because of camp. In a different week, one ${hol} was a public holiday, so that meeting was missed too.</p><p>How many meetings were held in the term?</p>`,
      explain: `<p>A normal term would have ${d} × ${W} = ${d * W} meetings.</p><p>Camp week takes away ${d}, and the holiday takes away 1 more: ${d * W} − ${d} − 1 = ${B(correct)}.</p><p class="why-not">${d * W} ignores both changes. ${d * W - d} forgets the public holiday, and ${d * W - 1} forgets camp week. Camp week cancels ${d} meetings, not one.</p>` };
  });
})();
