/* ---------------------------------------------------------------
   STORM ISLAND: fourth set of maths questions (Nov 2026, David's refresh: "tightly focussed to target
   skills to pass the test"). Heaviest on the skills he marked as important: the families of
   four-sided shapes, remainders in context (which group the last one is in), matching shaded fractions
   of differently cut shapes, and chained swap rates. Five options (A–E). tier 1–3 = storm circle; 4 = boss.
   --------------------------------------------------------------- */
(() => {
  const { fig, frac, T, tbl, colGraph, pictGraph, dotPlot, jugSvg, jugAria } = LIB;
  const B = s => `<b>${s}</b>`;
  const ST = ["1 only", "2 only", "3 only", "1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"];
  const pick = (...i) => i.map(k => ST[k]);

  /* ---------- pictures ---------- */
  const poly = (pts, fill = "#d0ebff") => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const SHAPES6 = (() => {
    const s = [[[10, 20], [70, 20], [70, 80], [10, 80]], [[10, 30], [90, 30], [90, 70], [10, 70]], [[40, 10], [75, 50], [40, 90], [5, 50]], [[25, 25], [95, 25], [75, 75], [5, 75]], [[45, 10], [75, 35], [45, 90], [15, 35]], [[10, 25], [80, 15], [65, 80], [20, 70]]];
    return fig(`<svg viewBox="0 0 600 130" width="560" role="img" aria-label="Six four-sided shapes labelled A to F. A is a square. B is a long rectangle. C is a rhombus standing on one corner, with all sides equal and no right angles. D is a slanted parallelogram with no right angles and unequal neighbouring sides. E is a kite: two short equal sides at the top and two long equal sides at the bottom. F is an uneven four-sided shape with no equal sides and no parallel sides.">${s.map((p, i) => `<g transform="translate(${i * 100},0)">${poly(p)}${T(50, 122, "ABCDEF"[i], 'text-anchor="middle" font-weight="700"')}</g>`).join("")}</svg>`);
  })();
  const UNEQUAL = fig(`<svg viewBox="0 0 170 170" width="160" role="img" aria-label="A square cut into four pieces. The left half is one piece and is not shaded. The top right quarter is shaded. The bottom right quarter is cut into two equal tall pieces; the left one of these is shaded and the right one is not.">${poly([[5, 5], [85, 5], [85, 165], [5, 165]], "#fff")}${poly([[85, 5], [165, 5], [165, 85], [85, 85]], "#868e96")}${poly([[85, 85], [125, 85], [125, 165], [85, 165]], "#868e96")}${poly([[125, 85], [165, 85], [165, 165], [125, 165]], "#fff")}</svg>`);
  const HALFGRID = (() => {
    const u = 38, full = [[0, 0], [1, 0], [2, 2], [3, 3]], half = [[3, 0, "tl"], [0, 2, "br"], [1, 3, "tr"], [2, 1, "bl"]];
    let g = "";
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) g += `<rect x="${5 + x * u}" y="${5 + y * u}" width="${u}" height="${u}" fill="${full.some(f => f[0] === x && f[1] === y) ? "#868e96" : "#fff"}" stroke="${INK}" stroke-width="1.5"/>`;
    for (const [x, y, c] of half) { const X = 5 + x * u, Y = 5 + y * u, P = { tl: [[X, Y], [X + u, Y], [X, Y + u]], tr: [[X, Y], [X + u, Y], [X + u, Y + u]], br: [[X + u, Y], [X + u, Y + u], [X, Y + u]], bl: [[X, Y], [X + u, Y + u], [X, Y + u]] }[c]; g += `<polygon points="${P.map(p => p.join(",")).join(" ")}" fill="#868e96" stroke="${INK}" stroke-width="1.5"/>`; }
    return fig(`<svg viewBox="0 0 162 162" width="160" role="img" aria-label="A 4 by 4 grid of equal squares. 4 whole squares are shaded, and 4 more squares each have exactly half shaded, cut corner to corner into a triangle.">${g}<rect x="5" y="5" width="152" height="152" fill="none" stroke="${INK}" stroke-width="3"/></svg>`);
  })();
  const HEX = (() => {
    const c = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos(Math.PI / 3 * i - Math.PI / 2), cy + r * Math.sin(Math.PI / 3 * i - Math.PI / 2)].map(v => +v.toFixed(1)));
    const A = c(80, 80, 70), Bp = c(250, 80, 70);
    let g = "";
    for (let i = 0; i < 6; i++) g += poly([[80, 80], A[i], A[(i + 1) % 6]], i < 4 ? "#868e96" : "#fff");
    for (let i = 0; i < 3; i++) g += poly([[250, 80], Bp[2 * i], Bp[2 * i + 1], Bp[(2 * i + 2) % 6]], "#fff");
    return fig(`<svg viewBox="0 0 330 165" width="320" role="img" aria-label="Two identical regular hexagons. The first is cut into 6 equal triangles from the centre, and 4 of them are shaded. The second is cut into 3 equal rhombuses, and none is shaded.">${g}</svg>`);
  })();
  const sq = (inner, lbl) => `<svg viewBox="0 0 110 110" width="104" role="img" aria-label="${lbl}">${inner}<rect x="5" y="5" width="100" height="100" fill="none" stroke="${INK}" stroke-width="3"/></svg>`;
  const grid4 = (on, lbl) => { let g = ""; for (let i = 0; i < 16; i++) g += `<rect x="${5 + (i % 4) * 25}" y="${5 + Math.floor(i / 4) * 25}" width="25" height="25" fill="${on.includes(i) ? "#868e96" : "#fff"}" stroke="${INK}" stroke-width="1.2"/>`; return sq(g, lbl); };
  const strips = (n, k, lbl) => sq(Array.from({ length: n }, (_, i) => `<rect x="${5 + i * 100 / n}" y="5" width="${100 / n}" height="100" fill="${i < k ? "#868e96" : "#fff"}" stroke="${INK}" stroke-width="1.5"/>`).join(""), lbl);
  const tri8 = (k, lbl) => { const o = 5, e = 105, m = 55, P = [[[o, o], [m, o]], [[m, o], [e, o]], [[e, o], [e, m]], [[e, m], [e, e]], [[e, e], [m, e]], [[m, e], [o, e]], [[o, e], [o, m]], [[o, m], [o, o]]]; return sq(P.map((p, i) => poly([[m, m], ...p], i < k ? "#868e96" : "#fff")).join(""), lbl); };
  const CYL = { max: 60, major: 20, minor: 5, level: 32, unit: "mL" };
  const DIAL = (() => {
    const cx = 130, cy = 130, r = 105, ang = g => Math.PI - g / 1000 * Math.PI;
    let s = `<path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
    for (let g = 0; g <= 1000; g += 50) { const a = ang(g), big = g % 200 === 0, r2 = r - (big ? 16 : 9); s += `<line x1="${cx + r * Math.cos(a)}" y1="${cy - r * Math.sin(a)}" x2="${cx + r2 * Math.cos(a)}" y2="${cy - r2 * Math.sin(a)}" stroke="${INK}" stroke-width="${big ? 2.5 : 1.5}"/>`; if (big) s += T(cx + (r - 32) * Math.cos(a), cy - (r - 32) * Math.sin(a) + 5, g, 'text-anchor="middle" font-size="12" font-weight="700"'); }
    const a = ang(650); s += `<line x1="${cx}" y1="${cy}" x2="${cx + (r - 12) * Math.cos(a)}" y2="${cy - (r - 12) * Math.sin(a)}" stroke="#e03131" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="${INK}"/>` + T(cx, cy - 30, "grams", 'text-anchor="middle" font-size="12"');
    return fig(`<svg viewBox="0 0 260 145" width="260" role="img" aria-label="A kitchen scale dial from 0 to 1000 grams. Labels are at 0, 200, 400, 600, 800 and 1000 grams, with three small marks between each pair of labels. The red pointer is on the first small mark after 600.">${s}</svg>`);
  })();
  const TANK = (() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"], v = [60, 45, 45, 70, 50], X = i => 70 + i * 62, Y = w => 210 - w * 2.4;
    let g = ""; for (let w = 0; w <= 80; w += 10) g += `<line x1="56" x2="330" y1="${Y(w)}" y2="${Y(w)}" stroke="#c5ccd8"/>` + (w % 20 === 0 ? T(48, Y(w) + 5, w, 'text-anchor="end"') : "");
    g += `<polyline points="${v.map((w, i) => `${X(i)},${Y(w)}`).join(" ")}" fill="none" stroke="#1c7ed6" stroke-width="3"/>` + v.map((w, i) => `<circle cx="${X(i)}" cy="${Y(w)}" r="5" fill="#1c7ed6" stroke="${INK}"/>`).join("") + days.map((d, i) => T(X(i), 230, d, 'text-anchor="middle"')).join("");
    g += `<line x1="56" x2="56" y1="${Y(80)}" y2="210" stroke="${INK}" stroke-width="2"/><line x1="56" x2="330" y1="210" y2="210" stroke="${INK}" stroke-width="2"/><text x="14" y="120" font-size="13" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">Water (litres)</text>`;
    return fig(`<svg viewBox="0 0 340 240" width="340" role="img" aria-label="A line graph of the water in a tank at 5 pm each day. The scale has a line every 10 litres, labelled every 20. Monday 60, Tuesday 45, Wednesday 45, Thursday 70, Friday 50 litres.">${g}</svg>`);
  })();
  const BOOKS = colGraph({ labels: ["Mon", "Tue", "Wed", "Thu"], series: [{ name: "", color: "#69db7c", values: [25, 35, 15, 30] }], max: 40, step: 5, ylabel: "Books borrowed", numbers: false,
    aria: "A column graph of books borrowed from a library. The scale has a line every 5 books, labelled every 10. Monday 25, Tuesday 35, Wednesday 15, Thursday 30." })
    .replace("</svg>", [0, 10, 20, 30, 40].map(v => T(42, 205 - v * 170 / 40 + 5, v, 'text-anchor="end"')).join("") + "</svg>");

  MATHS.push(
    /* ===================== circle 1 ===================== */
    { id: "x101", tier: 1, cat: "Area, perimeter & 3D", stem: `<p>Which of these shapes ${B("always")} has four right angles?</p>`,
      options: ["Rhombus", "Kite", "Rectangle", "Parallelogram", "Quadrilateral"], answer: 2,
      explain: `<p>A ${B("rectangle")} is a four-sided shape with four right angles: that is what makes it a rectangle.</p><p class="why-not">A rhombus and a parallelogram only have right angles when they happen to be a square or a rectangle; usually they are slanted. A kite and a general quadrilateral needn’t have any right angles.</p>` },
    { id: "x114", tier: 1, cat: "Area, perimeter & 3D", stem: `<p>Which one of these statements is ${B("true")}?</p>`,
      options: ["A square is a special kind of rhombus.", "A rhombus always has a right angle.", "A rectangle always has four equal sides.", "A kite has two pairs of parallel sides.", "A parallelogram has no equal sides."], answer: 0,
      explain: `<p>A rhombus has four equal sides. A square has four equal sides too (and right angles as well), so ${B("every square is a rhombus")}: a special one.</p><p class="why-not">A rhombus is usually slanted, with no right angles. A rectangle’s sides are usually two long and two short. A kite usually has no parallel sides. A parallelogram’s opposite sides are equal.</p>` },
    { id: "x208", tier: 1, cat: "Number & place value", stem: `<p>A baker puts ${B("50")} muffins on trays. Each tray holds ${B("6")} muffins, and she fills one tray before starting the next.</p><p>Which is right?</p>`,
      options: ["7 full trays, 8 left over", "8 full trays, 2 left over", "8 full trays, 1 left over", "9 full trays, 4 short", "9 full trays, 0 left over"], answer: 1,
      explain: `<p>6 × 8 = 48, and 50 − 48 = 2. So ${B("8 full trays")} and ${B("2 muffins")} on a ninth tray that isn’t full.</p><p class="why-not">7 full trays would leave 8 muffins, enough to fill another tray. 9 full trays would need 54 muffins.</p>` },
    { id: "x307", tier: 1, cat: "Fractions", stem: `<p>Exactly ${frac(1, 3)} of the squares on a grid are shaded. ${B("8")} squares are shaded.</p><p>How many squares are on the grid altogether?</p>`,
      options: ["8", "11", "16", "24", "32"], answer: 3,
      explain: `<p>${frac(1, 3)} of the grid is 8 squares, so the whole grid is 3 × 8 = ${B("24")} squares.</p><p class="why-not">11 is 8 + 3. 16 doubles the 8, as if 8 were half. 32 treats 8 as a quarter.</p>` },
    { id: "x501", tier: 1, cat: "Measurement & scales", stem: `<p>Ruby needs exactly ${B("50 mL")} of water.</p>${fig(`<svg viewBox="0 0 200 262" width="180" role="img" aria-label="${jugAria({ ...CYL, title: "A measuring cylinder" })}">${jugSvg(CYL)}</svg>`)}<p>How much more water must she add?</p>`,
      options: ["15 mL", "18 mL", "24 mL", "28 mL", "32 mL"], answer: 1,
      explain: `<p>From 20 to 40 there are 5 small gaps, so each gap is 20 ÷ 5 = 4 mL. The water is 3 gaps above 20: 20 + 12 = 32 mL. She needs 50 − 32 = ${B("18 mL")} more.</p><p class="why-not">32 mL is how much is there now, not how much more. Counting each gap as 2 mL gives 26 mL and then 24 mL more; counting each as 5 mL gives 35 mL and 15 mL more.</p>` },
    { id: "x508", tier: 1, cat: "Time & timetables", stem: `<p>Part of a train timetable:</p>${tbl(["Station", "Time"], [["Parkside", "8:47 am"], ["Riverbend", "9:20 am"], ["Coastal", "10:15 am"]])}<p>How long does the train take from ${B("Parkside")} to ${B("Coastal")}?</p>`,
      options: ["58 min", "1 h 8 min", "1 h 18 min", "1 h 22 min", "1 h 28 min"], answer: 4,
      explain: `<p>8:47 to 9:00 is 13 minutes. 9:00 to 10:00 is 1 hour. 10:00 to 10:15 is 15 minutes. Total: ${B("1 h 28 min")}.</p><p class="why-not">1 h 68 min, 1 h 32 min and 1 h 22 min come from subtracting the times as ordinary numbers (1015 − 847), as if an hour had 100 minutes. Count up in friendly steps instead.</p>` },

    /* ===================== circle 2 ===================== */
    { id: "x103", tier: 2, cat: "Area, perimeter & 3D", stem: `<p>A four-sided shape has ${B("all four sides the same length")}. Which of these ${B("must")} be true?</p>`,
      options: ["It is a square.", "It has four right angles.", "Its opposite sides are parallel.", "Its diagonals are equal in length.", "It has exactly two lines of symmetry."], answer: 2,
      explain: `<p>Four equal sides make a ${B("rhombus")} (a square is one kind). Every rhombus is a parallelogram, so its ${B("opposite sides are parallel")}.</p><p class="why-not">It could be a slanted rhombus, so it needn’t be a square, have right angles or have equal diagonals. A square has four lines of symmetry, so “exactly two” isn’t certain either.</p>` },
    { id: "x104", tier: 2, cat: "Area, perimeter & 3D", stem: `<p>Ned says: “${B("All parallelograms are rectangles.")}”</p><p>Which shape shows that Ned is wrong?</p>`,
      options: ["A rhombus with no right angles", "A square", "A rectangle", "A kite with no parallel sides at all", "A cube"], answer: 0,
      explain: `<p>To show “all parallelograms are rectangles” is false, you need ${B("a parallelogram that is not a rectangle")}. A rhombus with no right angles has opposite sides parallel but no right angles: it does the job.</p><p class="why-not">A square and a rectangle are parallelograms that ARE rectangles, so they agree with Ned. A kite with no parallel sides isn’t a parallelogram, so it says nothing about them. A cube isn’t a flat shape.</p>` },
    { id: "x105", tier: 2, cat: "Area, perimeter & 3D", stem: `<div class="box">1. All rhombuses are kites.<br>2. All kites are rhombuses.<br>3. Some rectangles are rhombuses.</div><p>Which statements are correct?</p>`,
      options: pick(0, 1, 5, 6, 4), answer: 4,
      explain: `<p>1. A kite has two pairs of equal sides next to each other. A rhombus has all four sides equal, so it has that too: ${B("true")}.</p><p>2. A kite’s two pairs can be different lengths, so most kites are not rhombuses: false.</p><p>3. A square is both a rectangle and a rhombus, so ${B("some")} rectangles are rhombuses: ${B("true")}.</p><p class="why-not">Statement 2 runs statement 1 backwards. “Some” only needs one example, and the square is one.</p>` },
    { id: "x108", tier: 2, cat: "Area, perimeter & 3D", stem: `<p>Shapes are sorted into two overlapping circles: one for shapes with ${B("four equal sides")} and one for shapes with ${B("four right angles")}.</p><p>Where does a ${B("rhombus that is not a square")} go?</p>`,
      options: ["Only in “four equal sides”", "Only in “four right angles”", "In the overlap of both circles", "Outside both circles", "It could go in either circle"], answer: 0,
      explain: `<p>A rhombus has four equal sides. A rhombus that isn’t a square has no right angles. So it belongs ${B("only in the “four equal sides” circle")}.</p><p class="why-not">The overlap is for shapes with both: that is only the square. Rectangles that aren’t squares go only in “four right angles”.</p>` },
    { id: "x110", tier: 2, cat: "Area, perimeter & 3D", stem: `<p>Which shape is a rectangle, a rhombus and a kite, all at the same time?</p>`,
      options: ["A square", "Any rhombus", "Any parallelogram", "Any rectangle", "No shape can be all three"], answer: 0,
      explain: `<p>A ${B("square")} has four right angles (a rectangle), four equal sides (a rhombus), and two pairs of equal sides next to each other (a kite).</p><p class="why-not">Most rhombuses have no right angles, most rectangles don’t have four equal sides, and most parallelograms are neither.</p>` },
    { id: "x111", tier: 2, cat: "Area, perimeter & 3D", stem: `<p>A shape has two pairs of equal sides that are ${B("next to each other")}, not opposite. It has ${B("only one")} pair of equal angles.</p><p>What is it?</p>`,
      options: ["Rectangle", "Rhombus", "Square", "Parallelogram", "Kite"], answer: 4,
      explain: `<p>Equal sides next to each other, two short and two long, make a ${B("kite")}. A kite has one pair of equal angles, where the long and short sides meet.</p><p class="why-not">A rectangle and a parallelogram have their equal sides opposite each other. A rhombus and a square have all four sides equal, and two pairs of equal angles.</p>` },
    { id: "x112", tier: 2, cat: "Area, perimeter & 3D", stem: `<div class="box">1. All cubes are rectangular prisms.<br>2. All rectangular prisms are cubes.<br>3. A square-based pyramid is a prism.</div><p>Which statements are correct?</p>`,
      options: pick(0, 1, 2, 3, 4), answer: 0,
      explain: `<p>1. A cube is a rectangular prism whose faces are all squares: ${B("true")}.</p><p>2. A box like a shoebox is a rectangular prism but not a cube: false.</p><p>3. A prism has the same shape all the way through, with two matching ends. A pyramid comes to a point: false.</p><p class="why-not">Statement 2 is statement 1 run backwards. A square-based pyramid has a square base, but that doesn’t make it a prism.</p>` },
    { id: "x201", tier: 2, cat: "Number & place value", stem: `<p>Children sit in rows of ${B("8")}. The 1st child sits in row 1, seat 1, and the rows fill up in order.</p><p>Where does the ${B("30th")} child sit?</p>`,
      options: ["Row 3, seat 6", "Row 4, seat 2", "Row 4, seat 8", "Row 4, seat 6", "Row 5, seat 6"], answer: 3,
      explain: `<p>30 ÷ 8 = 3 remainder 6. Three rows are full (24 children), and the 30th child is the 6th in the next row: ${B("row 4, seat 6")}.</p><p class="why-not">Row 3, seat 6 forgets that three full rows means the child is in the 4th. Seat 2 counts the seats left in the row instead of the seat taken.</p>` },
    { id: "x202", tier: 2, cat: "Time & timetables", stem: `<p>A school camp lasts ${B("45 days")}. Day 1 is the first day of week 1.</p><p>In which week of the camp is ${B("day 45")}?</p>`,
      options: ["3rd week", "5th week", "6th week", "7th week", "8th week"], answer: 3,
      explain: `<p>45 ÷ 7 = 6 remainder 3. Six whole weeks take you to day 42, and day 45 is the 3rd day of the ${B("7th week")}.</p><p class="why-not">The 6th week counts only full weeks. The 3rd week mixes up the remainder (day 3 of the week) with the week number.</p>` },
    { id: "x205", tier: 2, cat: "Patterns & sequences", stem: `<p>Beads are threaded in this repeating pattern:</p><div class="box" style="font-size:20px">red, red, blue, yellow, green, red, red, blue, yellow, green, …</div><p>What colour is the ${B("63rd")} bead?</p>`,
      options: ["red", "blue", "yellow", "green", "you can’t tell"], answer: 1,
      explain: `<p>The pattern repeats every 5 beads. 63 ÷ 5 = 12 remainder 3. After 12 full repeats (60 beads), the 63rd is the 3rd in the pattern: ${B("blue")}.</p><p class="why-not">Red would be right for remainders 1 or 2 (or 0 would be green, the last bead). Yellow is one too far.</p>` },
    { id: "x206", tier: 2, cat: "Number & place value", stem: `<p>A car ferry can carry ${B("45")} cars on each trip. ${B("200")} cars are waiting.</p><p>What is the smallest number of trips needed to take all the cars?</p>`,
      options: ["4", "5", "6", "20", "45"], answer: 1,
      explain: `<p>4 trips carry 180 cars, leaving 20. One more trip is needed for them: ${B("5")}.</p><p class="why-not">4 leaves 20 cars behind. 20 is how many cars are on the last trip, not the number of trips.</p>` },
    { id: "x304", tier: 2, cat: "Fractions", stem: `<p>Two identical hexagons are cut up in different ways.</p>${HEX}<p>How many rhombuses must be shaded on the second hexagon so that both have the same area shaded?</p>`,
      options: ["1", "2", "3", "4", "6"], answer: 1,
      explain: `<p>4 of the 6 equal triangles are shaded: ${frac(4, 6)} = ${frac(2, 3)} of the hexagon. Each rhombus is ${frac(1, 3)} of the hexagon (it is two triangles), so shade ${B("2")} rhombuses.</p><p class="why-not">4 copies the number of shaded triangles, but a rhombus is twice as big as a triangle.</p>` },
    { id: "x401", tier: 2, cat: "Rates", stem: `<p>On a balance:</p><div class="box">3 apples balance 2 pears.<br>4 pears balance 1 melon.</div><p>How many apples balance ${B("2 melons")}?</p>`,
      options: ["6", "8", "12", "16", "24"], answer: 2,
      explain: `<p>2 melons balance 2 × 4 = 8 pears. 8 pears is 4 lots of 2 pears, which balance 4 lots of 3 apples: ${B("12 apples")}.</p><p class="why-not">8 stops at pears. 6 uses one melon’s worth of pears the wrong way round. 16 and 24 multiply numbers that don’t belong together.</p>` },
    { id: "x406", tier: 2, cat: "Rates", stem: `<div class="box">2 cups of flour make 10 pancakes.<br>For every 2 cups of flour you need 3 eggs.</div><p>How many eggs are needed for ${B("30 pancakes")}?</p>`,
      options: ["6", "9", "12", "15", "18"], answer: 1,
      explain: `<p>30 pancakes is 3 lots of 10, so it needs 3 × 2 = 6 cups of flour. 6 cups is 3 lots of 2 cups, so it needs 3 × 3 = ${B("9 eggs")}.</p><p class="why-not">6 is the cups of flour, not eggs. 15 and 18 skip the flour step and mix the numbers.</p>` },
    { id: "x502", tier: 2, cat: "Graphs & data", stem: `<p>The graph shows how many books were borrowed from a library.</p>${BOOKS}<p>How many more books were borrowed on the busiest day than on the quietest day?</p>`,
      options: ["5", "10", "15", "20", "35"], answer: 3,
      explain: `<p>The scale has a line every 5. The busiest day is Tuesday (35) and the quietest is Wednesday (15): 35 − 15 = ${B("20")}.</p><p class="why-not">35 is the busiest day itself. 10 or 5 compare days next to each other, or read the lines as 1 or 2 each.</p>` },
    { id: "x503", tier: 2, cat: "Time & timetables", stem: `<p>Bus times:</p>${tbl(["Stop", "Bus 1", "Bus 2", "Bus 3"], [["Town Hall", "7:50", "8:20", "8:50"], ["Park Street", "8:04", "8:34", "9:04"], ["School", "8:15", "8:45", "9:15"]])}<p>Kai gets to the Park Street stop at ${B("8:10 am")}. When will he get to school?</p>`,
      options: ["8:15 am", "8:34 am", "8:45 am", "9:04 am", "9:15 am"], answer: 2,
      explain: `<p>The 8:04 bus has already gone. The next bus from Park Street is at 8:34, and it reaches school at ${B("8:45 am")}.</p><p class="why-not">8:15 am is Bus 1, which left Park Street before he arrived. 8:34 am is when he gets on, not when he arrives.</p>` },

    { id: "x509", tier: 2, cat: "Graphs & data", stem: `<p>The dot plot shows how many goals a team scored in each of its games.</p>${dotPlot({ counts: [3, 5, 4, 2, 1], first: 0, label: "Goals in a game", aria: "A dot plot of goals scored in each game. 0 goals: 3 dots. 1 goal: 5 dots. 2 goals: 4 dots. 3 goals: 2 dots. 4 goals: 1 dot." })}<p>In how many games did the team score ${B("more than 2")} goals?</p>`,
      options: ["2", "3", "4", "5", "7"], answer: 1,
      explain: `<p>Each dot is one game. More than 2 goals means 3 or 4 goals: 2 + 1 = ${B("3")} games.</p><p class="why-not">7 includes the games with exactly 2 goals (“more than 2” doesn’t include 2). 2 counts only the games with 3 goals.</p>` },

    /* ===================== circle 3 ===================== */
    { id: "x106", tier: 3, cat: "Area, perimeter & 3D", stem: `<p>Mia’s shape has opposite sides parallel and four right angles, but it is ${B("not")} a square.</p><p>What must it have?</p>`,
      options: ["Four equal sides", "Two longer sides and two shorter sides", "Diagonals that cross each other at right angles", "Exactly one line of symmetry", "No lines of symmetry"], answer: 1,
      explain: `<p>Four right angles make it a rectangle, and a rectangle that isn’t a square has ${B("two longer and two shorter sides")}.</p><p class="why-not">Four equal sides would make it a square. A rectangle’s diagonals only cross at right angles when it is a square. A rectangle that isn’t a square has two lines of symmetry.</p>` },
    { id: "x107", tier: 3, cat: "Area, perimeter & 3D", stem: `${SHAPES6}<p>How many of these shapes are ${B("parallelograms")} (two pairs of parallel sides)?</p>`,
      options: ["1", "2", "3", "4", "5"], answer: 3,
      explain: `<p>A parallelogram has two pairs of parallel sides. The square (A), the rectangle (B), the rhombus (C) and the slanted parallelogram (D) all do: ${B("4")} shapes.</p><p class="why-not">1 counts only the shape that looks like the usual slanted picture. The kite (E) and the uneven shape (F) have no parallel sides.</p>` },
    { id: "x113", tier: 3, cat: "Area, perimeter & 3D", stem: `<p>Shape S has opposite sides equal and parallel, and its two diagonals are the ${B("same length")}.</p><p>What could S be?</p>`,
      options: ["Square only", "Rectangle or square only", "Only a rhombus or a square", "Any parallelogram", "A kite"], answer: 1,
      explain: `<p>Opposite sides equal and parallel make a parallelogram. The parallelograms with equal diagonals are the ones with right angles: ${B("rectangles, including squares")}.</p><p class="why-not">A rhombus that isn’t a square has one long and one short diagonal. Most parallelograms don’t have equal diagonals. A kite doesn’t have opposite sides parallel.</p>` },
    { id: "x203", tier: 3, cat: "Number & place value", stem: `<p>Ava builds a wall in layers of ${B("7")} bricks, finishing each layer before she starts the next. When she lays her last brick she is working on the ${B("5th")} layer, and it isn’t finished.</p><p>How many bricks could she have had?</p>`,
      options: ["21", "28", "30", "36", "42"], answer: 2,
      explain: `<p>Four full layers use 28 bricks. To be part-way through the 5th layer she needs more than 28 but fewer than 35: of these, only ${B("30")} works.</p><p class="why-not">28 would finish exactly at the end of the 4th layer. 36 would reach the 6th layer. 21 and 42 are 3 and 6 full layers.</p>` },
    { id: "x204", tier: 3, cat: "Number & place value", stem: `<p>A tower’s ${B("bottom layer")} uses ${B("10")} blocks. ${B("Every layer above")} it uses ${B("6")} blocks. Each layer is finished before the next one starts.</p><p>With ${B("38")} blocks, which layer is being built when the last block goes on?</p>`,
      options: ["3rd", "4th", "5th", "6th", "7th"], answer: 3,
      explain: `<p>The bottom layer uses 10, leaving 28. 28 ÷ 6 = 4 remainder 4: four more full layers (layers 2 to 5) and 4 blocks on the next. That is the ${B("6th")} layer.</p><p class="why-not">The 5th forgets to count the bottom layer as a layer. The 7th divides all 38 by 6, as if the bottom layer had 6 too.</p>` },
    { id: "x207", tier: 3, cat: "Number & place value", stem: `<p>Ava and Ben each have ${B("50")} cups. Ava stacks them in piles of ${B("6")}; Ben stacks his in piles of ${B("9")}. Each finishes one pile before starting the next.</p><p>Who has more cups in their last, unfinished pile, and how many more?</p>`,
      options: ["Ava, 2 more", "Ben, 3 more", "Ben, 5 more", "They are the same", "Ava, 3 more"], answer: 1,
      explain: `<p>Ava: 50 ÷ 6 = 8 remainder 2, so 2 cups in her last pile. Ben: 50 ÷ 9 = 5 remainder 5, so 5 cups. ${B("Ben, by 3")}.</p><p class="why-not">“Ben, 5 more” gives Ben’s pile, not the difference. Ava has more full piles, but the question is about the unfinished pile.</p>` },
    { id: "x301", tier: 3, cat: "Fractions", stem: `<p>This square is cut into pieces that are ${B("not")} all the same size.</p>${UNEQUAL}<p>What fraction of the square is shaded?</p>`,
      options: [frac(1, 3), frac(3, 8), frac(2, 5), frac(1, 2), frac(3, 4)], answer: 1,
      explain: `<p>The top right piece is a quarter = ${frac(2, 8)}. The small shaded piece is half of a quarter = ${frac(1, 8)}. Together: ${frac(2, 8)} + ${frac(1, 8)} = ${B(frac(3, 8))}.</p><p class="why-not">${frac(1, 2)} counts 2 shaded pieces out of 4, but the pieces are different sizes, so you can’t just count them.</p>` },
    { id: "x302", tier: 3, cat: "Fractions", stem: `<p>A big square has sides of ${B("8 cm")}, and ${frac(1, 2)} of it is shaded. A small square has sides of ${B("4 cm")}, and ${frac(3, 4)} of it is shaded.</p><p>Which has the bigger shaded area, and by how much?</p>`,
      options: ["The big square, by 20 cm²", "The small square, by 4 cm²", "They are the same", "The big square, by 12 cm²", "The small square, by 20 cm²"], answer: 0,
      explain: `<p>Big: 8 × 8 = 64 cm², half is 32 cm². Small: 4 × 4 = 16 cm², three quarters is 12 cm². The ${B("big square, by 20 cm²")}.</p><p class="why-not">${frac(3, 4)} is a bigger fraction than ${frac(1, 2)}, but it is a fraction of a much smaller square. Always find the actual areas.</p>` },
    { id: "x303", tier: 3, cat: "Fractions", stem: `${HALFGRID}<p>What fraction of the whole grid is shaded?</p>`,
      options: [frac(1, 4), frac(3, 8), frac(1, 2), frac(5, 8), frac(3, 4)], answer: 1,
      explain: `<p>4 whole squares, plus 4 half squares (= 2 whole squares), make 6 of the 16 squares: ${frac(6, 16)} = ${B(frac(3, 8))}.</p><p class="why-not">${frac(1, 2)} counts each half square as a whole one (8 of 16). ${frac(1, 4)} forgets the half squares.</p>` },
    { id: "x306", tier: 3, cat: "Fractions", visual: true, stem: `<p>Which picture has exactly ${B(frac(3, 8))} shaded?</p>`,
      options: [strips(4, 3, "A square cut into 4 equal strips with 3 shaded."), tri8(5, "A square cut into 8 equal triangles with 5 shaded."), grid4([0, 5, 10], "A 4 by 4 grid with 3 squares shaded."), grid4([0, 1, 4, 6, 9, 15], "A 4 by 4 grid with 6 squares shaded."), tri8(4, "A square cut into 8 equal triangles with 4 shaded.")], answer: 3,
      explain: `<p>${frac(3, 8)} = ${frac(6, 16)}. The ${B("4 by 4 grid with 6 squares shaded")} has ${frac(6, 16)}.</p><p class="why-not">The strips show ${frac(3, 4)}. The triangles show ${frac(5, 8)} and ${frac(4, 8)}. The grid with only 3 squares shaded shows ${frac(3, 16)}: the top number matches, but sixteenths are smaller than eighths.</p>` },
    { id: "x402", tier: 3, cat: "Rates", stem: `<div class="box">5 zots are worth 2 blips.<br>3 blips are worth 4 cogs.</div><p>Which is worth more: ${B("10 zots")} or ${B("6 cogs")}?</p>`,
      options: ["10 zots are worth more", "They are worth the same", "6 cogs are worth more", "You can’t tell from the rules", "10 zots are worth twice as much"], answer: 2,
      explain: `<p>Change both into blips. 10 zots = 2 × 2 = 4 blips. 6 cogs: 4 cogs = 3 blips, so 2 cogs = 1½ blips and 6 cogs = 4½ blips. ${B("6 cogs are worth more")}.</p><p class="why-not">10 is a bigger number than 6, but zots and cogs are worth different amounts. Compare them in the same unit.</p>` },
    { id: "x403", tier: 3, cat: "Rates", stem: `<div class="box">2 red tickets can be swapped for 5 blue tickets.<br>A ride costs 3 blue tickets.</div><p>Ana has ${B("8 red tickets")}. She swaps them all and goes on as many rides as she can.</p><p>Which is right?</p>`,
      options: ["6 rides, 2 blue tickets left", "5 rides, 1 blue ticket left", "6 rides, no tickets left", "2 rides, 2 red tickets left", "8 rides, 2 blue tickets left"], answer: 0,
      explain: `<p>8 red tickets is 4 lots of 2, so she gets 4 × 5 = 20 blue tickets. 20 ÷ 3 = 6 remainder 2: ${B("6 rides, with 2 blue tickets left")}.</p><p class="why-not">8 rides spends red tickets as if they were blue. “No tickets left” forgets the remainder.</p>` },
    { id: "x504", tier: 3, cat: "Graphs & data", stem: `<p>Children voted for a team colour.</p>${pictGraph({ rows: [["Red", 3.5], ["Blue", 5], ["Green", 2.5], ["Yellow", 4]], keyText: "4 children", color: "#ffa94d", aria: "A picture graph. Each circle stands for 4 children and a half circle for 2. Red: 3 and a half circles. Blue: 5 circles. Green: 2 and a half circles. Yellow: 4 circles." })}<p>How many more children chose blue than green?</p>`,
      options: ["2½", "5", "8", "10", "20"], answer: 3,
      explain: `<p>Blue: 5 × 4 = 20. Green: 2½ × 4 = 10. 20 − 10 = ${B("10")}.</p><p class="why-not">2½ counts the circles, not the children. 5 counts the half circle as a whole one and forgets the key. 20 is blue on its own.</p>` },
    { id: "x505", tier: 3, cat: "Measurement & scales", stem: `<p>Flour is on a kitchen scale.</p>${DIAL}<p>The recipe needs ${B("1 kg")} of flour. How much more flour is needed?</p>`,
      options: ["150 g", "250 g", "350 g", "450 g", "650 g"], answer: 2,
      explain: `<p>Between labels 200 g apart there are 4 small gaps, so each is 50 g. The pointer is one gap past 600: 650 g. 1 kg = 1 000 g, so 1 000 − 650 = ${B("350 g")}.</p><p class="why-not">650 g is how much is there, not how much more. 450 g or 250 g come from reading each small mark as 100 g or 25 g.</p>` },
    { id: "x506", tier: 3, cat: "Graphs & data", stem: `<p>Points scored by three teams:</p>${tbl(["Team", "Game 1", "Game 2", "Game 3"], [["Ants", 12, 15, 9], ["Bees", 14, 10, 13], ["Crows", 8, 16, 11]])}<div class="box">1. The Bees scored the most points altogether.<br>2. The Crows had the highest score in a single game.<br>3. The Ants scored the most in Game 1.</div><p>Which statements are correct?</p>`,
      options: pick(0, 1, 3, 4, 5), answer: 2,
      explain: `<p>1. Ants 36, Bees 37, Crows 35: the Bees, ${B("true")}. 2. The highest single score is 16, by the Crows: ${B("true")}. 3. In Game 1 the Bees scored 14, more than the Ants’ 12: false. So ${B("1 and 2 only")}.</p><p class="why-not">Statement 3 is tempting because the Ants are first in the table, not because they won Game 1. The Crows had the best single game but the lowest total.</p>` },

    /* ===================== boss ===================== */
    { id: "x109", tier: 4, cat: "Area, perimeter & 3D", stem: `<div class="box">1. Every quadrilateral with four right angles is a rectangle.<br>2. A quadrilateral whose diagonals cross at right angles must be a square.<br>3. A quadrilateral with four equal sides and one right angle must be a square.</div><p>Which statements are correct?</p>`,
      options: pick(0, 1, 2, 4, 6), answer: 3,
      explain: `<p>1. Four right angles is exactly what a rectangle is: ${B("true")}.</p><p>2. A rhombus and a kite also have diagonals that cross at right angles: false.</p><p>3. Four equal sides is a rhombus. If one angle is a right angle, the angles next to it must be too, so all four are: a square, ${B("true")}.</p><p class="why-not">Statement 2 needs only one shape that isn’t a square to be false, and a kite is one.</p>` },
    { id: "x209", tier: 4, cat: "Number & place value", stem: `<p>A book has chapters that are each ${B("14 pages")} long. Mia starts at page 1 and reads exactly ${B("9 pages")} every day.</p><p>Which chapter is she reading when she finishes on ${B("day 7")}?</p>`,
      options: ["4th", "5th", "6th", "7th", "9th"], answer: 1,
      explain: `<p>After 7 days she has read 7 × 9 = 63 pages, so she stops on page 63. 63 ÷ 14 = 4 remainder 7: four whole chapters (56 pages) and 7 pages into the next, the ${B("5th")}.</p><p class="why-not">The 4th counts only finished chapters. The 7th mixes up the day with the chapter.</p>` },
    { id: "x210", tier: 4, cat: "Number & place value", stem: `<p>Each layer of a wall has ${B("6")} bricks. Maisy finishes the ${B("4th")} layer exactly, then lays ${B("9")} more bricks.</p><p>Which layer is she working on now, and how many more bricks does it need?</p>`,
      options: ["5th layer, 3 more", "6th layer, 3 more", "6th layer, 9 more", "5th layer, 1 more", "7th layer, 3 more"], answer: 1,
      explain: `<p>9 more bricks: 6 finish the 5th layer and 3 go on the 6th. The ${B("6th layer")} has 3 of its 6 bricks, so it needs ${B("3 more")}.</p><p class="why-not">The 5th layer forgets that the first 6 of the 9 bricks already finish it.</p>` },
    { id: "x305", tier: 4, cat: "Fractions", stem: `<p>A rectangle is a grid of ${B("3 rows of 8")} small squares. ${B("9")} of them are shaded.</p><p>How many more squares must be shaded so that ${B(frac(5, 8))} of the rectangle is shaded?</p>`,
      options: ["3", "5", "6", "9", "15"], answer: 2,
      explain: `<p>The grid has 3 × 8 = 24 squares. ${frac(1, 8)} of 24 is 3, so ${frac(5, 8)} is 15. 9 are shaded, so ${B("6")} more.</p><p class="why-not">15 is how many should be shaded altogether. 5 uses the top of the fraction as a number of squares.</p>` },
    { id: "x404", tier: 4, cat: "Rates", stem: `<div class="box">4 shells are worth 3 beads.<br>6 beads are worth 5 feathers.<br>10 feathers are worth 1 crown.</div><p>How many shells is ${B("1 crown")} worth?</p>`,
      options: ["9", "10", "12", "16", "20"], answer: 3,
      explain: `<p>1 crown = 10 feathers = 2 lots of 5 feathers = 2 × 6 = 12 beads = 4 lots of 3 beads = 4 × 4 = ${B("16 shells")}.</p><p class="why-not">12 stops at beads and 10 stops at feathers. Every rule must be used, one step at a time.</p>` },
    { id: "x405", tier: 4, cat: "Rates", stem: `<div class="box">2 A are worth 3 B.<br>3 B are worth 4 C.</div><p>Which of these must also be true?</p>`,
      options: ["1 A is worth 1 C", "1 A is worth 2 C", "3 A are worth 4 C", "2 A are worth 3 C", "4 A are worth 3 C"], answer: 1,
      explain: `<p>2 A and 4 C are both worth 3 B, so 2 A = 4 C. Halve both: ${B("1 A = 2 C")}.</p><p class="why-not">“3 A = 4 C” and “2 A = 3 C” copy numbers from the rules without following them. An A is worth more than a C, so 4 A can’t equal 3 C.</p>` },
    { id: "x507", tier: 4, cat: "Graphs & data", stem: `<p>The graph shows the water in a tank each day.</p>${TANK}<div class="box">1. The tank had the most water on Thursday.<br>2. The amount did not change from Tuesday to Wednesday.<br>3. The biggest drop was from Monday to Tuesday.</div><p>Which statements are correct?</p>`,
      options: pick(0, 3, 5, 4, 6), answer: 1,
      explain: `<p>1. Thursday is highest (70 L): ${B("true")}. 2. Tuesday and Wednesday are both 45 L: ${B("true")}. 3. Monday to Tuesday dropped 15 L, but Thursday to Friday dropped 20 L: false. So ${B("1 and 2 only")}.</p><p class="why-not">The Monday to Tuesday drop is the first one you see, but the steeper line from Thursday to Friday is bigger.</p>` },
  );
})();
