/* ---------------------------------------------------------------
   STORM ISLAND: third set of templates (Nov 2026). Each redraws itself with new numbers.
   Maths: addition pyramids, adding hundreds of minutes to a time, dates counted back
   into the month before, sharing in a ratio, ways to make a total on two spinners.
   Thinking: a secret passed on at meetings, a robot's walk on a grid, a clock in a mirror.
   tools/check_game3.js works every answer out again by its own method.
   --------------------------------------------------------------- */
(() => {
  const { T, fig, tbl, clock, opts, gen, NAMES } = LIB;
  const B = s => `<b>${s}</b>`;
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const LEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  /* text options in a random order (the first is the correct one) */
  const mix = (R, list) => { const o = R.shuffle(list); return { options: o, answer: o.indexOf(list[0]) }; };
  const len = s => String(s).replace(/<[^>]*>/g, "").length;
  const singleLongest = (list, i) => { const l = list.map(len), top = Math.max(...l); return l[i] === top && l.filter(x => x === top).length === 1 && top > 12; };

  /* ---------- addition pyramid ---------- */
  gen("pyramid", "maths", 2, "Number & place value", R => {
    const a = R.int(2, 19), b = R.int(3, 24), c = R.int(2, 19), top = a + 2 * b + c;
    const brick = (x, y, s, hi) => `<rect x="${x}" y="${y}" width="70" height="40" fill="${hi ? "#ffe066" : "#fff"}" stroke="${INK}" stroke-width="2.5"/>` + T(x + 35, y + 27, s, 'text-anchor="middle" font-size="19" font-weight="700"');
    const pic = fig(`<svg viewBox="0 0 230 136" width="230" role="img" aria-label="An addition pyramid. Bottom row: ${a}, a missing number in a yellow brick, ${c}. Middle row: two empty bricks. Top brick: ${top}.">${brick(80, 6, top)}${brick(45, 48, "")}${brick(115, 48, "")}${brick(10, 90, a)}${brick(80, 90, "?", true)}${brick(150, 90, c)}</svg>`);
    const o = opts(R, b, [2 * b, top - a, top - c, a + c, b + 1]);
    return { ...o, data: { a, c, top },
      stem: `<p>In an addition pyramid, each brick is the ${B("sum")} of the two bricks under it.</p>${pic}<p>What number goes in the yellow brick?</p>`,
      explain: `<p>Call the yellow number ?. The middle bricks are ${a} + ? and ? + ${c}. The top is the two of them added: ${a} + ${c} + ? + ? = ${a + c} + two lots of ?.</p><p>So two lots of ? = ${top} − ${a + c} = ${2 * b}, and ? = ${B(b)}.</p><p>Check: the middle bricks are ${a + b} and ${b + c}, and ${a + b} + ${b + c} = ${top}.</p><p class="why-not">${2 * b} forgets that the yellow number is counted twice: it sits under both middle bricks. Taking just one corner from the top (${top - a} or ${top - c}) skips the middle row.</p>` };
  });

  /* ---------- hundreds of minutes added to a time ---------- */
  gen("clockadd", "maths", 2, "Time & timetables", R => {
    const start = R.int(84, 132) * 5; let N; do { N = R.int(26, 70) * 10; } while (N % 60 === 0 || N % 100 >= 60);
    const h = Math.floor(N / 60), m = N % 60, end = start + N;
    const asHours = start + Math.floor(N / 100) * 60 + N % 100;      // reads 500 as 5 hours 0 minutes
    const o = opts(R, end, [asHours, start + h * 60 - m, end + 60, end - 60, start + h * 60], clock, 5, 10);
    return { ...o, data: { start, N },
      stem: `<p>It is ${B(clock(start))}. What time will it be in ${B(N + " minutes")}?</p>`,
      explain: `<p>Change the minutes into hours: ${N} = ${h} × 60 + ${m}, so ${N} minutes is ${B(`${h} hours ${m} minutes`)}.</p><p>${clock(start)} + ${h} hours = ${clock(start + h * 60)}. Then ${m} more minutes = ${B(clock(end))}.</p><p class="why-not">${clock(asHours)} treats ${N} minutes as if 100 minutes made an hour. An hour has 60 minutes, so divide by 60. Taking the ${m} minutes away instead of adding them gives ${clock(start + h * 60 - m)}.</p>` };
  });

  /* ---------- counting back into the month before ---------- */
  gen("datesback", "maths", 2, "Time & timetables", R => {
    const mo = R.int(1, 11), d = R.int(2, 9), N = d + R.int(3, 15), prev = mo - 1, L = LEN[prev], ans = L - (N - d);
    const other = [28, 30, 31].filter(x => x !== L).map(x => x - (N - d));
    const o = opts(R, ans, [...other, ans + 1, ans - 1], x => `${x} ${MONTHS[prev]}`);
    const what = R.pick(["a parcel was posted", "a library book was borrowed", "a seed was planted", "a puppy came home"]);
    return { ...o, data: { mo, d, N },
      stem: `<p>Today is ${B(`${d} ${MONTHS[mo]}`)}, in a year that is ${B("not")} a leap year. Exactly ${B(N + " days ago")}, ${what}.</p><p>What was the date?</p>`,
      explain: `<p>Count back ${d} days to the last day of ${MONTHS[prev]}, which is ${B(`${L} ${MONTHS[prev]}`)} (${MONTHS[prev]} has ${L} days${prev === 1 ? " when it isn’t a leap year" : ""}). That uses ${d} of the ${N} days.</p><p>Count back the other ${N - d}: ${L} − ${N - d} = ${B(ans)}. So it was ${B(`${ans} ${MONTHS[prev]}`)}.</p><p class="why-not">The other dates give ${MONTHS[prev]} the wrong number of days (28, 30 or 31), or are one day out from counting today as one of the ${N} days.</p>` };
  });

  /* ---------- sharing in a ratio ---------- */
  gen("share", "maths", 3, "Rates", R => {
    let a, b; do { a = R.int(1, 4); b = R.int(2, 5); } while (a === b);
    const k = R.int(3, 9), tot = (a + b) * k;
    const [x, y, things] = R.pick([["red", "blue", "beads on a necklace"], ["white", "brown", "eggs in a basket"], ["green", "yellow", "tiles on a wall"], ["striped", "spotted", "socks in a drawer"]]);
    const o = opts(R, b * k, [a * k, tot / 2, tot - b, tot / b, k, b * k + k]);
    return { ...o, data: { a, b, tot },
      stem: `<p>For every ${B(a)} ${x} ${things.split(" ")[0]}, there ${b === 1 ? "is" : "are"} ${B(b)} ${y} ${b === 1 ? things.split(" ")[0].replace(/s$/, "") : things.split(" ")[0]}. There are ${B(tot)} ${things} altogether, all ${x} or ${y}.</p><p>How many are ${B(y)}?</p>`,
      explain: `<p>Each group has ${a} ${x} and ${b} ${y}: ${a + b} altogether. ${tot} ÷ ${a + b} = ${k} groups.</p><p>${k} groups × ${b} ${y} = ${B(b * k)}.</p><p>Check: ${a * k} ${x} + ${b * k} ${y} = ${tot}.</p><p class="why-not">${a * k} is how many are ${x}. ${tot / 2} shares them equally, ignoring the “for every”. Dividing by ${b} instead of ${a + b} forgets that each group also has ${a} ${x}.</p>` };
  });

  /* ---------- ways to make a total on two spinners ---------- */
  gen("spinways", "maths", 3, "Chance & counting", R => {
    let n, m, X, ways, pairs;
    do {
      n = R.int(3, 5); m = R.int(3, 5); X = R.int(4, n + m - 1);
      ways = 0; pairs = []; for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) if (i + j === X) { ways++; pairs.push(`${i} + ${j}`); }
    } while (ways < 2);
    const unordered = new Set(pairs.map(p => p.split(" + ").map(Number).sort((u, v) => u - v).join())).size;
    const o = opts(R, ways, [unordered, ways + 1, n + m - 1, ways - 1]);
    return { ...o, data: { n, m, X },
      stem: `<p>Spinner A is numbered ${B(`1 to ${n}`)} and spinner B is numbered ${B(`1 to ${m}`)}. Both are spun and the two numbers are added.</p><p>In how many different ways can the total be ${B(X)}? (A 1 on A with a 3 on B is a different way from a 3 on A with a 1 on B.)</p>`,
      explain: `<p>Go through spinner A’s numbers one at a time and see what B needs:</p><p>${pairs.join(", ")}.</p><p>That is ${B(ways)} ways.</p><p class="why-not">${unordered} counts pairs like 1 + 3 and 3 + 1 as the same, but they come from different spinners. Listing in order from spinner A stops you missing one or counting one twice.</p>` };
  });

  /* ---------- a secret passed on at meetings ---------- */
  gen("meet", "thinking", 2, "Tables & timetables", R => {
    let who, meets, ans, all, early;
    const run = (list, k) => { const s = new Set([0]); for (const [x, y] of list.slice(0, k)) if (s.has(x) || s.has(y)) { s.add(x); s.add(y); } return s.size; };
    do {
      who = R.shuffle(NAMES).slice(0, 6); meets = [];
      while (meets.length < 6) { const x = R.int(0, 5), y = R.int(0, 5); if (x !== y && !meets.some(p => (p[0] === x && p[1] === y) || (p[0] === y && p[1] === x))) meets.push([x, y]); }
      ans = run(meets, 6);
      const s = new Set([0]); let grew = true; while (grew) { grew = false; for (const [x, y] of meets) if ((s.has(x) || s.has(y)) && !(s.has(x) && s.has(y))) { s.add(x); s.add(y); grew = true; } }
      all = s.size; early = run(meets, 5);
    } while (ans < 2 || ans === all || ans === 6);
    const o = opts(R, ans, [all, early, ans + 1, ans - 1], String, 4);
    const ORD = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
    return { ...o, data: { meets },
      stem: `<p>At the start of the day, only ${B(who[0])} knows a secret. Whenever someone who knows it meets someone who doesn’t, they pass it on. The meetings happen in this order:</p>${tbl(["Meeting", "Who meets"], meets.map((p, i) => [ORD[i], `${who[p[0]]} and ${who[p[1]]}`]))}<p>How many of the six friends (${who.join(", ")}) know the secret at the end of the day, counting ${who[0]}?</p>`,
      explain: `<p>Go down the table in order, keeping a list of who knows. A meeting only passes the secret on if one of the two <i>already</i> knows it at that moment.</p><p>${(() => { const s = new Set([0]); return meets.map(([x, y], i) => { const had = s.has(x) || s.has(y); if (had) { s.add(x); s.add(y); } return `${ORD[i]}: ${who[x]} and ${who[y]}: ${had ? `now known by ${[...s].map(k => who[k]).join(", ")}` : "neither knows yet, so nothing is passed on"}.`; }).join("<br>"); })()}</p><p>So ${B(ans)} friends know it at the end.</p><p class="why-not">${all} ignores the order: someone who meets ${who[0]}’s group <i>before</i> they knew can’t have been told.${early !== ans ? ` ${early} stops one meeting early.` : ""}</p>` };
  });

  /* ---------- a robot's walk on a grid ---------- */
  const DIRS = ["north", "east", "south", "west"], DX = [0, 1, 0, -1], DY = [1, 0, -1, 0];
  const walk = (steps, flip, skipLast) => { let f = 0, x = 0, y = 0; steps.forEach((s, i) => { if (skipLast && i === steps.length - 1) return; f = (f + ((s.t === "right") !== flip ? 1 : 3)) % 4; x += DX[f] * s.n; y += DY[f] * s.n; }); return [x, y]; };
  const where = ([x, y]) => { if (!x && !y) return "Back where it started"; const p = []; if (y) p.push(`${Math.abs(y)} square${Math.abs(y) === 1 ? "" : "s"} ${y > 0 ? "north" : "south"}`); if (x) p.push(`${Math.abs(x)} square${Math.abs(x) === 1 ? "" : "s"} ${x > 0 ? "east" : "west"}`); return p.join(" and ") + " of the start"; };
  gen("robotwalk", "thinking", 3, "Spatial", R => {
    let steps, list;
    do {
      steps = Array.from({ length: R.int(3, 4) }, () => ({ t: R.pick(["left", "right"]), n: R.int(1, 5) }));
      const right = walk(steps, false, false), wrong = [walk(steps, true, false), walk(steps, false, true), [-right[0], -right[1]], [right[1], right[0]], [right[0], -right[1]], [-right[0], right[1]]];
      list = [where(right)]; for (const w of wrong) { const s = where(w); if (!list.includes(s) && list.length < 4) list.push(s); }
    } while (list.length < 4 || singleLongest(list, 0));
    const o = mix(R, list);
    let f = 0; const trail = steps.map(s => { f = (f + (s.t === "right" ? 1 : 3)) % 4; return `turn ${s.t} to face ${B(DIRS[f])}, go ${s.n}`; });
    return { ...o, data: { steps },
      stem: `<p>A robot stands on a grid, facing ${B("north")}. It follows these steps:</p><div class="box">${steps.map(s => `Turn ${s.t}, go forward ${s.n} square${s.n === 1 ? "" : "s"}.`).join("<br>")}</div><p>Where does the robot finish?</p>`,
      explain: `<p>Keep track of which way the robot faces after each turn: ${trail.join("; ")}.</p><p>Add up the north–south moves and the east–west moves separately. The robot ends ${B(list[0].replace(/^Back/, "back"))}.</p><p class="why-not">The usual slips: mixing up left and right (a right turn from north faces east), leaving out the last step, or adding moves that go in opposite directions instead of taking one from the other.</p>` };
  });

  /* ---------- a clock seen in a mirror ---------- */
  const hm = t => { t = ((t % 720) + 720) % 720; const h = Math.floor(t / 60); return `${h === 0 ? 12 : h}:${String(t % 60).padStart(2, "0")}`; };
  gen("mirrorclock", "thinking", 3, "Spatial", R => {
    let h, m; do { h = R.int(1, 10); m = R.pick([5, 10, 15, 20, 25, 35, 40, 45, 50, 55]); } while (Math.min(Math.abs(m * 6 - (h * 30 + m / 2)), 360 - Math.abs(m * 6 - (h * 30 + m / 2))) < 45);   // keep the hands well apart
    const seen = h * 60 + m, real = 720 - seen;
    const list = [hm(real)];
    for (const w of [(12 - h) * 60 + (60 - m), h * 60 + (60 - m), (12 - h) * 60 + m, (11 - h) * 60 + m]) { const s = hm(w); if (!list.includes(s) && list.length < 4) list.push(s); }
    const o = mix(R, list);
    const hands = (t, r) => { const a = (t % 60) * 6, b = (t % 720) / 2, pt = (deg, l) => [100 + l * Math.sin(deg * Math.PI / 180), 100 - l * Math.cos(deg * Math.PI / 180)]; const [mx, my] = pt(r ? -a : a, 70), [hx, hy] = pt(r ? -b : b, 45);
      let g = `<circle cx="100" cy="100" r="88" fill="#fff" stroke="${INK}" stroke-width="4"/>`; for (let k = 0; k < 12; k++) { const [x1, y1] = pt(k * 30, 80), [x2, y2] = pt(k * 30, k % 3 ? 74 : 68); g += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="${k % 3 ? 2 : 4}"/>`; }
      return g + `<line x1="100" y1="100" x2="${hx}" y2="${hy}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="100" x2="${mx}" y2="${my}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="100" r="6" fill="${INK}"/>`; };
    const pic = fig(`<svg viewBox="0 0 200 200" width="180" role="img" aria-label="The clock as it looks in the mirror. It has no numbers, only marks. The hands seem to show ${hm(seen)}.">${hands(real, true)}</svg>`);
    return { ...o, data: { h, m },
      stem: `<p>Kai looks at a clock in a mirror. The clock has no numbers, only marks, with 12 at the top. In the mirror it looks like this:</p>${pic}<p>The hands seem to show ${B(hm(seen))}. What is the ${B("real")} time?</p>`,
      explain: `<p>A mirror swaps left and right, so each hand is really the same distance from 12 on the <i>other</i> side.</p><p>The minute hand seems to be ${m} minutes after 12, so really it is ${m} minutes before 12: ${60 - m} minutes past. The hour hand seems a little past ${h}; really it is the same distance before ${12 - h}, so just after ${11 - h === 0 ? 12 : 11 - h}. The real time is ${B(hm(real))}.</p><p>Shortcut: the mirror time and the real time add up to 12:00. ${hm(seen)} + ${hm(real)} = 12:00.</p><p class="why-not">${hm((12 - h) * 60 + (60 - m))} flips both hands but forgets that the hour hand has gone back past ${12 - h}. Flipping only one of the hands gives the other times.</p>` };
  });
})();
