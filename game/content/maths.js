/* ---------------------------------------------------------------
   CROWN QUEST: Number Reef (maths). Five options (A–E) per question.
   Levels climb from warm-up to the hardest third of the sample papers.
   --------------------------------------------------------------- */
(() => {
  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" font-size="15" fill="${INK}" ${o}>${s}</text>`;

  /* L2 Q1: a measuring jug, labelled every 100 mL with one unlabelled mark between */
  const JUG = (() => {
    const y = v => 230 - v * 0.4;                      // 0 mL at y=230, 500 mL at y=30
    let g = `<path d="M70 20 L70 232 Q70 240 78 240 L182 240 Q190 240 190 232 L190 20" fill="none" stroke="${INK}" stroke-width="3"/>`;
    g += `<rect x="72" y="${y(350)}" width="116" height="${238 - y(350)}" fill="#f6c453" opacity=".75"/>`;
    for (let v = 0; v <= 500; v += 50) {
      const big = v % 100 === 0;
      g += `<line x1="70" x2="${big ? 98 : 86}" y1="${y(v)}" y2="${y(v)}" stroke="${INK}" stroke-width="2"/>`;
      if (big && v) g += T(104, y(v) + 5, v + " mL");
    }
    return `<div class="figure"><svg viewBox="0 0 260 250" width="240" height="231" role="img" aria-label="A measuring jug. Marks are labelled 100 mL, 200 mL, 300 mL, 400 mL and 500 mL, with one small unlabelled mark halfway between each pair of labels. The juice reaches the small mark between 300 mL and 400 mL.">${g}</svg></div>`;
  })();

  /* Boss Q2: column graph of books read */
  const GRAPH = (() => {
    const data = [["Ava", 8], ["Ben", 5], ["Cy", 11], ["Dee", 6], ["Eli", 10]];
    const y = v => 210 - v * 15;
    let g = "";
    for (let v = 0; v <= 12; v += 2) g += `<line x1="50" x2="330" y1="${y(v)}" y2="${y(v)}" stroke="#c5ccd8" stroke-width="1"/>` + T(42, y(v) + 5, v, 'text-anchor="end"');
    data.forEach(([n, v], i) => {
      const x = 68 + i * 54;
      g += `<rect x="${x}" y="${y(v)}" width="34" height="${210 - y(v)}" fill="#4dabf7" stroke="${INK}" stroke-width="1.5"/>` + T(x + 17, 230, n, 'text-anchor="middle"');
    });
    g += `<line x1="50" x2="50" y1="${y(12)}" y2="210" stroke="${INK}" stroke-width="2"/><line x1="50" x2="330" y1="210" y2="210" stroke="${INK}" stroke-width="2"/>`;
    g += `<text x="14" y="120" font-size="14" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">Books read</text>`;
    return `<div class="figure"><svg viewBox="0 0 340 240" width="340" height="240" role="img" aria-label="A column graph of books read. The scale is marked 0, 2, 4, 6, 8, 10, 12. Ava's column reaches 8. Ben's column is halfway between 4 and 6. Cy's column is halfway between 10 and 12. Dee's column reaches 6. Eli's column reaches 10.">${g}</svg></div>`;
  })();

  /* Boss Q3: a 3 × 3 × 3 cube drawn from one corner */
  const CUBE = (() => {
    const u = 30, dx = 15, dy = 12, ox = 30, oy = 60;
    let g = "";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      g += `<rect x="${ox + c * u}" y="${oy + r * u}" width="${u}" height="${u}" fill="#ff8a65" stroke="${INK}" stroke-width="1.5"/>`;                                            // front
      const tx = ox + c * u + (2 - r) * dx, ty = oy - (2 - r) * dy;
      g += `<polygon points="${tx},${ty} ${tx + u},${ty} ${tx + u + dx},${ty - dy} ${tx + dx},${ty - dy}" fill="#ffb39b" stroke="${INK}" stroke-width="1.5"/>`;                    // top
      const sx = ox + 3 * u + c * dx, sy = oy + r * u - c * dy;
      g += `<polygon points="${sx},${sy} ${sx + dx},${sy - dy} ${sx + dx},${sy - dy + u} ${sx},${sy + u}" fill="#e0664a" stroke="${INK}" stroke-width="1.5"/>`;                    // side
    }
    return `<div class="figure"><svg viewBox="0 0 190 160" width="190" height="160" role="img" aria-label="A large cube made of 27 small cubes, 3 small cubes long, 3 wide and 3 high.">${g}</svg></div>`;
  })();

  const tbl = (head, rows) => `<div class="figure"><table class="grid"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map((c, i) => i ? `<td>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</table></div>`;

  /* M1: picture graph */
  const book = (x, y, half) => `<rect x="${x}" y="${y}" width="${half ? 13 : 26}" height="30" rx="2" fill="#4dabf7" stroke="${INK}" stroke-width="1.5"/>` + (half ? "" : `<line x1="${x + 6}" x2="${x + 6}" y1="${y}" y2="${y + 30}" stroke="${INK}" stroke-width="1.5"/>`);
  const PICT = (() => {
    const rows = [["Monday", 3], ["Tuesday", 4.5], ["Wednesday", 2], ["Thursday", 3.5]];
    let g = "";
    rows.forEach(([d, n], i) => {
      const y = 12 + i * 42;
      g += T(92, y + 21, d, 'text-anchor="end"') + `<line x1="100" x2="100" y1="${y - 6}" y2="${y + 36}" stroke="${INK}" stroke-width="2"/>`;
      for (let k = 0; k < Math.floor(n); k++) g += book(110 + k * 32, y);
      if (n % 1) g += book(110 + Math.floor(n) * 32, y, true);
    });
    g += book(110, 186) + T(144, 207, "= 4 books");
    return `<div class="figure"><svg viewBox="0 0 290 224" width="290" role="img" aria-label="A picture graph of books borrowed. Monday: 3 book symbols. Tuesday: 4 and a half symbols. Wednesday: 2 symbols. Thursday: 3 and a half symbols. Key: one symbol = 4 books.">${g}</svg></div>`;
  })();

  /* M2: dot plot */
  const DOTS = (() => {
    const counts = [1, 3, 5, 4, 4, 2, 1];
    let g = `<line x1="20" x2="300" y1="130" y2="130" stroke="${INK}" stroke-width="2"/>`;
    counts.forEach((c, v) => {
      const x = 40 + v * 40;
      g += `<line x1="${x}" x2="${x}" y1="130" y2="136" stroke="${INK}" stroke-width="2"/>` + T(x, 152, v, 'text-anchor="middle"');
      for (let k = 0; k < c; k++) g += `<circle cx="${x}" cy="${118 - k * 22}" r="8" fill="#ff8a65" stroke="${INK}" stroke-width="1.5"/>`;
    });
    g += T(160, 172, "Goals scored", 'text-anchor="middle"');
    return `<div class="figure"><svg viewBox="0 0 320 180" width="320" role="img" aria-label="A dot plot. Each dot is one child. 0 goals: 1 dot. 1 goal: 3 dots. 2 goals: 5 dots. 3 goals: 4 dots. 4 goals: 4 dots. 5 goals: 2 dots. 6 goals: 1 dot.">${g}</svg></div>`;
  })();

  /* L2 Q3: the rectangle, not to scale */
  const RECT = `<div class="figure"><svg viewBox="0 0 260 130" width="260" role="img" aria-label="A rectangle. The long side is labelled 8 cm. The short side is labelled with a question mark. The diagram is not to scale."><rect x="40" y="20" width="170" height="70" fill="#dff0d8" stroke="${INK}" stroke-width="2.4"/>${T(125, 14, "8 cm", 'text-anchor="middle" font-weight="700"')}${T(218, 60, "?", 'font-weight="700"')}<text x="125" y="112" font-size="13" text-anchor="middle" fill="#55607a">not to scale</text></svg></div>`;

  /* a column graph: series = [{name, color, values}], gridlines every `step` up to `max` */
  function colGraph({ labels, series, max, step, ylabel, numbers = true, aria }) {
    const W = 70 + labels.length * (series.length * 26 + 30), H = 250, y = v => 205 - v * (170 / max);
    let g = "";
    for (let v = 0; v <= max; v += step) g += `<line x1="50" x2="${W - 10}" y1="${y(v)}" y2="${y(v)}" stroke="#c5ccd8" stroke-width="1"/>` + (numbers ? T(42, y(v) + 5, v, 'text-anchor="end"') : "");
    labels.forEach((n, i) => {
      const x0 = 66 + i * (series.length * 26 + 30);
      series.forEach((s, k) => { g += `<rect x="${x0 + k * 26}" y="${y(s.values[i])}" width="24" height="${205 - y(s.values[i])}" fill="${s.color}" stroke="${INK}" stroke-width="1.5"/>`; });
      g += T(x0 + series.length * 13, 224, n, 'text-anchor="middle"');
    });
    g += `<line x1="50" x2="50" y1="${y(max)}" y2="205" stroke="${INK}" stroke-width="2"/><line x1="50" x2="${W - 10}" y1="205" y2="205" stroke="${INK}" stroke-width="2"/>`;
    g += `<text x="14" y="120" font-size="13" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">${ylabel}</text>`;
    if (series.length > 1) series.forEach((s, k) => { g += `<rect x="${60 + k * 110}" y="236" width="14" height="12" fill="${s.color}" stroke="${INK}"/>` + T(80 + k * 110, 247, s.name); });
    return `<div class="figure"><svg viewBox="0 0 ${W} ${H + (series.length > 1 ? 6 : -12)}" width="${W}" role="img" aria-label="${aria}">${g}</svg></div>`;
  }

  /* L4 (Chart Cove) Q1: cupcakes sold */
  const CUPCAKES = colGraph({ labels: ["Mon", "Tue", "Wed"], max: 30, step: 10, ylabel: "Cupcakes sold",
    series: [{ name: "", color: "#f783ac", values: [15, 25, 10] }],
    aria: "A column graph of cupcakes sold. The scale goes 0, 10, 20, 30. Monday's column is halfway between 10 and 20. Tuesday's column is halfway between 20 and 30. Wednesday's column reaches 10." });
  /* L4 Q2: shells, scale missing */
  const SHELLS = colGraph({ labels: ["Aki", "Bo"], max: 10, step: 1, ylabel: "Shells collected", numbers: false,
    series: [{ name: "", color: "#63e6be", values: [6, 9] }],
    aria: "A column graph with no numbers on its scale. There are evenly spaced lines across the graph. Aki's column reaches the 6th line above the bottom. Bo's column reaches the 9th line." });
  /* L4 Q3: two rain gauges with different scales */
  function gauge(x, title, labels, gaps, level, top) {
    const y = v => 190 - v * (150 / top), unit = (labels[1] - labels[0]) / gaps;
    let g = `<path d="M${x} 30 L${x} 192 Q${x} 198 ${x + 6} 198 L${x + 54} 198 Q${x + 60} 198 ${x + 60} 192 L${x + 60} 30" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
    g += `<rect x="${x + 2}" y="${y(level)}" width="56" height="${196 - y(level)}" fill="#74c0fc" opacity=".8"/>`;
    for (let v = 0; v <= top + 0.01; v += unit) {
      const big = labels.includes(Math.round(v));
      g += `<line x1="${x}" x2="${x + (big ? 22 : 12)}" y1="${y(v)}" y2="${y(v)}" stroke="${INK}" stroke-width="1.8"/>` + (big ? T(x + 66, y(v) + 5, Math.round(v) + " mm") : "");
    }
    return g + T(x + 30, 218, title, 'text-anchor="middle" font-weight="700"');
  }
  const GAUGES = `<div class="figure"><svg viewBox="0 0 330 226" width="330" role="img" aria-label="Two rain gauges. Monday's gauge is labelled 0, 10, 20 and 30 millimetres, with four small marks between each pair of labels. Its water reaches the third small mark above 10. Tuesday's gauge is labelled 0, 20 and 40 millimetres, with three small marks between each pair of labels. Its water reaches the third small mark above 20.">${gauge(20, "Monday", [0, 10, 20, 30], 5, 16, 30)}${gauge(190, "Tuesday", [0, 20, 40], 4, 35, 40)}</svg></div>`;

  /* ---- Shape Shoals (level 3): four shape-and-space diagrams ---- */
  /* Q1: a pattern to finish so that the dashed line is a line of symmetry. Cells are [row, col] on a 4 by 6 grid. */
  const SYM = (() => {
    const u = 34, shaded = [[0, 0], [1, 1], [1, 2], [2, 0], [3, 2], [0, 5], [1, 3]];
    let g = "";
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++)
      g += `<rect x="${10 + c * u}" y="${10 + r * u}" width="${u}" height="${u}" fill="${shaded.some(s => s[0] === r && s[1] === c) ? "#4dabf7" : "#fff"}" stroke="${INK}" stroke-width="1.5"/>`;
    g += `<line x1="${10 + 3 * u}" x2="${10 + 3 * u}" y1="2" y2="${18 + 4 * u}" stroke="#e03131" stroke-width="3" stroke-dasharray="7 5"/>`;
    return `<div class="figure"><svg viewBox="0 0 ${20 + 6 * u} ${20 + 4 * u}" width="${20 + 6 * u}" role="img" aria-label="A grid 6 squares wide and 4 squares high, with a dashed line down the middle (3 columns on each side). Shaded on the left: top row, 1st column; second row, 2nd and 3rd columns; third row, 1st column; bottom row, 3rd column. Shaded on the right: top row, 6th column; second row, 4th column.">${g}</svg></div>`;
  })();
  /* Q2: a T-shape; six square corners and two "inside-out" corners */
  const TEE = `<div class="figure"><svg viewBox="0 0 220 190" width="220" role="img" aria-label="A shape like a capital T, made of a wide bar across the top and a narrower stem going down from its middle. It has eight corners: the four corners of the top bar's ends, the two corners at the bottom of the stem, and two corners where the stem meets the bar."><polygon points="20,20 200,20 200,70 135,70 135,170 85,170 85,70 20,70" fill="#ffe7a3" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/></svg></div>`;
  /* Q3: a park map. Places sit where lines cross: [across, up] */
  const PARK = (() => {
    const u = 36, ox = 30, oy = 20, X = c => ox + c * u, Y = r => oy + (5 - r) * u;
    const places = [["Tree", 4, 1], ["Well", 2, 3], ["Shed", 6, 3], ["Pond", 2, 4], ["Bench", 4, 4], ["Gate", 0, 1]];
    let g = "";
    for (let c = 0; c <= 7; c++) g += `<line x1="${X(c)}" x2="${X(c)}" y1="${Y(5)}" y2="${Y(0)}" stroke="#aab3c2" stroke-width="1.5"/>`;
    for (let r = 0; r <= 5; r++) g += `<line x1="${X(0)}" x2="${X(7)}" y1="${Y(r)}" y2="${Y(r)}" stroke="#aab3c2" stroke-width="1.5"/>`;
    places.forEach(([n, c, r]) => { g += `<circle cx="${X(c)}" cy="${Y(r)}" r="6" fill="#e03131" stroke="${INK}" stroke-width="1.5"/>` + T(X(c) + 9, Y(r) - 8, n, 'font-weight="700"'); });
    g += `<line x1="${X(7) + 34}" x2="${X(7) + 34}" y1="78" y2="30" stroke="${INK}" stroke-width="2.5"/><polygon points="${X(7) + 34},20 ${X(7) + 27},34 ${X(7) + 41},34" fill="${INK}"/>` + T(X(7) + 34, 96, "N", 'text-anchor="middle" font-weight="700"');
    return `<div class="figure"><svg viewBox="0 0 ${X(7) + 60} ${Y(0) + 16}" width="${X(7) + 60}" role="img" aria-label="A map on a square grid with north at the top. Positions are given as squares across from the left edge and squares up from the bottom edge. Tree: 4 across, 1 up. Well: 2 across, 3 up. Shed: 6 across, 3 up. Pond: 2 across, 4 up. Bench: 4 across, 4 up. Gate: 0 across, 1 up.">${g}</svg></div>`;
  })();
  /* Q4: an L-shaped garden, not to scale (real sizes 10 by 7, with a 6 by 4 corner missing) */
  const ELL = `<div class="figure"><svg viewBox="0 0 280 200" width="280" role="img" aria-label="An L-shaped garden. Every corner is a right angle. The bottom side is 10 m. The left side is 7 m. The top side, which only goes part of the way across, is 4 m. The short side on the right is 3 m. Two sides, the ones that make the step in the L, have no lengths marked. Not to scale."><polygon points="40,20 120,20 120,100 240,100 240,160 40,160" fill="#dff0d8" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>${T(140, 180, "10 m", 'text-anchor="middle" font-weight="700"')}${T(32, 95, "7 m", 'text-anchor="end" font-weight="700"')}${T(80, 14, "4 m", 'text-anchor="middle" font-weight="700"')}${T(248, 135, "3 m", 'font-weight="700"')}<text x="140" y="197" font-size="12" text-anchor="middle" fill="#55607a">not to scale</text></svg></div>`;

  const BEADS = seq => `<div class="figure" style="font-size:24px;letter-spacing:2px">${seq} …</div>`;

  WORLDS.push({
    id: "maths", name: "Number Reef", icon: "🌊", color: "#0b6fa4", crown: "Coral Crown",
    blurb: "Dive deeper with every level. Leviathan guards the Coral Crown at the bottom of the reef.",
    boss: { name: "Leviathan", emoji: "🐟", img: "leviathan", taunt: "Call me fishman. Nobody in this reef does sums as fast as me!", defeat: "Leviathan sinks back into the deep, blowing bubbles of respect." },
    levels: [
      {
        id: "m1", name: "Shallow Waters",
        questions: [
          { id: "m1e", cat: "Graphs & data",
          stem: `<p>The picture graph shows how many books a class borrowed each day.</p>${PICT}<p>How many <b>more</b> books were borrowed on <b>Tuesday</b> than on <b>Wednesday</b>?</p>`,
          options: ["2", "3", "8", "10", "18"], answer: 3,
          hint: `Check the key first: one picture is not one book. What is <b>half</b> a picture worth?`,
          explain: `<p>Each picture is 4 books, so half a picture is 2. Tuesday: 4 × 4 + 2 = 18. Wednesday: 2 × 4 = 8. Difference: 18 − 8 = <b>10</b>.</p><p class="why-not">2 and 3 count pictures instead of books. 8 ignores the half picture. 18 is Tuesday’s total, not the difference.</p>` },
          { id: "m1b", cat: "Time & timetables",
            stem: `<p>A film starts at <b>10:45 am</b> and runs for <b>1 hour 30 minutes</b>. What time does it finish?</p>`,
            options: ["11:15 am", "11:45 am", "12:15 pm", "12:45 pm", "1:15 pm"], answer: 2,
            hint: `Add the hour first, then the 30 minutes. 15 of those minutes take you up to the next o'clock.`,
            explain: `<p>10:45 am + 1 hour = 11:45 am. Then 30 minutes more: 15 minutes reaches 12:00, and the other 15 gives <b>12:15 pm</b>.</p><p class="why-not">11:45 am adds only the hour, and 11:15 am adds only the 30 minutes. 12:45 pm adds 2 hours.</p>` },
          { id: "m1c", cat: "Money & best value",
            stem: `<p>Zoe buys a drink for <b>$2.60</b> and a sandwich for <b>$4.75</b>. She pays with a <b>$10</b> note. How much change does she get?</p>`,
            options: ["$2.35", "$2.65", "$3.35", "$3.65", "$7.35"], answer: 1,
            hint: `Two steps: first find the total cost, then take it away from $10.`,
            explain: `<p>Total: $2.60 + $4.75 = $7.35. Change: $10.00 − $7.35 = <b>$2.65</b>.</p><p class="why-not">$7.35 is what she spent, not her change. $3.65 forgets that the cents add up to more than a dollar ($6.35 instead of $7.35).</p>` },
          { id: "m1d", cat: "Number & place value",
            stem: `<p>What number goes in the box?</p><p class="gapline" style="text-align:center">57 + ☐ = 100 − 15</p>`,
            options: ["28", "38", "43", "72", "85"], answer: 0,
            hint: `The equals sign means both sides are worth the same. Work out the right-hand side first.`,
            explain: `<p>The right side is 100 − 15 = 85. So 57 + ☐ = 85, and ☐ = 85 − 57 = <b>28</b>.</p><p class="why-not">85 is the value of the right side, not the box. 43 is 100 − 57, which forgets to take away the 15. 72 is 57 + 15. 38 is a slip in the subtraction.</p>` },
        ],
      },
      {
        id: "m2", name: "Coral Maze",
        questions: [
          { id: "m2a", cat: "Measurement & scales",
            stem: `<p>The jug shows how much juice Ali has.</p>${JUG}<p>He pours <b>100 mL</b> into a glass. How much juice is left in the jug?</p>`,
            options: ["210 mL", "250 mL", "300 mL", "350 mL", "450 mL"], answer: 1,
            hint: `The small mark has no label. It is exactly halfway between 300 mL and 400 mL, so what is it worth?`,
            explain: `<p>The small mark is halfway between 300 and 400, so the jug holds 350 mL. After pouring out 100 mL: 350 − 100 = <b>250 mL</b>.</p><p class="why-not">350 mL is what was in the jug before pouring. 210 mL reads the small mark as 310. 450 mL adds instead of taking away.</p>` },
          { id: "m2b", cat: "Fractions",
            stem: `<p>A pizza is cut into <b>8 equal slices</b>. Tom eats 2 slices. Mia eats <b>one quarter</b> of the whole pizza. What fraction of the pizza is left?</p>`,
            options: ["<sup>1</sup>⁄<sub>8</sub>", "<sup>1</sup>⁄<sub>4</sub>", "<sup>3</sup>⁄<sub>8</sub>", "<sup>1</sup>⁄<sub>2</sub>", "<sup>5</sup>⁄<sub>8</sub>"], answer: 3,
            hint: `How many of the 8 slices make one quarter of the pizza? It isn't one slice.`,
            explain: `<p>One quarter of 8 slices is 2 slices. So 2 + 2 = 4 slices are eaten and 4 are left. 4 out of 8 is <b>one half</b>.</p><p class="why-not"><sup>5</sup>⁄<sub>8</sub> treats “one quarter” as one slice. <sup>1</sup>⁄<sub>4</sub> is how much each child ate, not what is left.</p>` },
          { id: "m2c", cat: "Area, perimeter & 3D",
            stem: `<p>This rectangle has a <b>perimeter of 26 cm</b>. Its long sides are each <b>8 cm</b>.</p>${RECT}<p>What is its <b>area</b>?</p>`,
            options: ["18 cm²", "26 cm²", "40 cm²", "80 cm²", "208 cm²"], answer: 2,
            hint: `First find a short side. The two long sides use up 16 cm of the perimeter, and what is left is shared by <b>two</b> short sides.`,
            explain: `<p>The two long sides: 8 + 8 = 16 cm. That leaves 26 − 16 = 10 cm for two short sides, so each is 5 cm. Area = 8 × 5 = <b>40 cm²</b>.</p><p class="why-not">80 cm² forgets to halve the 10 cm (8 × 10). 18 is 26 − 8, and 208 is 26 × 8: both mix up perimeter and side lengths.</p>` },
          { id: "m2d", cat: "Patterns & sequences",
            stem: `<p>Beads on a string repeat in this pattern:</p>${BEADS("🔴🔴🔵🟢🔴🔴🔵🟢🔴🔴🔵🟢")}<p>How many of the <b>first 22 beads</b> are <b>red</b>?</p>`,
            options: ["8", "9", "10", "11", "12"], answer: 4,
            hint: `The pattern repeats every 4 beads, with 2 reds in each block. How many whole blocks fit into 22, and which beads are left over?`,
            explain: `<p>Each block of 4 beads (red, red, blue, green) has 2 reds. 22 = 5 blocks (20 beads) + 2 more beads. The 5 blocks have 10 reds, and the next 2 beads are red, red. 10 + 2 = <b>12</b>.</p><p class="why-not">10 counts only the whole blocks and forgets the 2 beads left over. 11 counts just one of them.</p>` },
        ],
      },
      {
        id: "m6", name: "Shape Shoals",
        questions: [
          { id: "m6a", cat: "Area, perimeter & 3D",
            stem: `<p>Some squares of this grid are shaded. The red dashed line must become a <b>line of symmetry</b>: each side must be a mirror image of the other.</p>${SYM}<p>What is the <b>smallest</b> number of <b>extra</b> squares that must be shaded?</p>`,
            options: ["2", "3", "4", "5", "7"], answer: 1,
            hint: `Take each shaded square in turn and find its mirror partner: the same row, and the same number of squares from the dashed line on the other side. Is the partner shaded already?`,
            explain: `<p>Every shaded square needs a partner the same distance from the line. The left side has 5 shaded squares, so the right side needs 5. Two of those partners are shaded already (top row at the far right, and second row next to the line). That leaves <b>3</b> to shade: second row, third row and bottom row.</p><p class="why-not">5 forgets that two partners are already shaded. 7 is the number of squares shaded at the start. 2 is the number already done, not the number still needed.</p>` },
          { id: "m6b", cat: "Area, perimeter & 3D",
            stem: `<p>The corner of a page fits exactly into a right angle.</p>${TEE}<p>Imagine the shape is a flat tray. At how many of its corners would a page corner fit exactly <b>inside</b> the tray?</p>`,
            options: ["2", "4", "6", "8", "10"], answer: 2,
            hint: `Go round the shape corner by corner, staying <b>inside</b> it. At two of the corners the inside opens out wide, so a page corner would not fit snugly there.`,
            explain: `<p>The shape has 8 corners. At 6 of them (the four ends of the top bar and the two at the bottom of the stem) a page corner fits snugly inside: these are right angles. At the 2 corners where the stem meets the bar, the <em>inside</em> of the shape wraps round the corner: that angle is three square corners, not one. So <b>6</b> are right angles.</p><p class="why-not">8 counts every corner, including the two where the right angle is on the outside. 4 counts only the top bar. 2 counts only the corners that are different.</p>` },
          { id: "m6c", cat: "Measurement & scales",
            stem: `<p>The map shows a park. Each square is one step, and north is at the top.</p>${PARK}<p>Ravi starts at the <b>Tree</b>. He walks <b>3 steps north</b>, <b>2 steps east</b>, <b>1 step south</b> and then <b>4 steps west</b>. Where does he finish?</p>`,
            options: ["Bench", "Gate", "Pond", "Shed", "Well"], answer: 4,
            hint: `Trace each move with your finger from where the last one ended. East is to the right and west is to the left; north is up the page.`,
            explain: `<p>From the Tree, 3 north takes him level with the Bench. 2 east moves him right, 1 south brings him down a row, and 4 west takes him back past the Tree's column to 2 squares left of it. He is 2 rows above the Tree and 2 columns to its left: the <b>Well</b>.</p><p class="why-not">The Shed is where he ends up if he forgets the last move west. The Pond is where he would be without the step south. The Bench is where he is after the first move only. The Gate is 4 steps west of the Tree, ignoring everything else.</p>` },
          { id: "m6d", cat: "Area, perimeter & 3D",
            stem: `<p>The diagram shows an L-shaped garden. Every corner is a right angle. Two of the sides have no length marked.</p>${ELL}<p>What is the <b>perimeter</b> of the garden?</p>`,
            options: ["24 m", "28 m", "30 m", "34 m", "70 m"], answer: 3,
            hint: `Find the two missing sides first. The top side and the missing flat side together stretch as far as the bottom side. The same idea works for the upright sides.`,
            explain: `<p>The two flat sides on top must add up to the bottom side: 4 + ? = 10, so the missing flat side is 6 m. The two upright sides on the right must add up to the left side: 3 + ? = 7, so the missing upright side is 4 m. Perimeter: 10 + 7 + 4 + 3 + 6 + 4 = <b>34 m</b>.</p><p class="why-not">24 m adds only the four sides that are marked. 28 m and 30 m find only one of the missing sides. 70 m multiplies 10 by 7, which is neither the perimeter nor the area of this shape.</p>` },
        ],
      },
      {
        id: "m3", name: "Kelp Canyon",
        questions: [
          { id: "m3a", cat: "Money & best value",
            stem: `<p>A shop sells pencils three ways:</p><ul style="margin:0 0 10px"><li>one pencil for <b>80c</b></li><li>a pack of 4 for <b>$3.00</b></li><li>a pack of 10 for <b>$7.00</b></li></ul><p>What is the <b>least</b> Ravi can pay for <b>exactly 12</b> pencils?</p>`,
            options: ["$8.60", "$9.00", "$9.20", "$9.60", "$10.00"], answer: 0,
            hint: `Three packs of 4 looks neat, but is it the cheapest? Try each way of making 12 and compare.`,
            explain: `<p>Ways to make 12: a pack of 10 + 2 singles = $7.00 + $1.60 = <b>$8.60</b>; three packs of 4 = $9.00; two packs of 4 + 4 singles = $9.20; 12 singles = $9.60. The cheapest is $8.60.</p><p class="why-not">$9.00 is the tidy answer (three packs of 4), but the pack of 10 is better value per pencil. $10.00 buys both packs, which is 14 pencils, not 12.</p>` },
          { id: "m3b", cat: "Chance & counting",
            stem: `<p>A bag holds <b>5 red</b>, <b>3 blue</b> and <b>2 green</b> marbles. Kim takes one without looking.</p><div class="box">1. A red marble is more likely than a marble that is not red.<br>2. Green is the least likely colour.<br>3. It is impossible to take a yellow marble.</div><p>Which statements are correct?</p>`,
            options: ["1 only", "2 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], answer: 3,
            hint: `For statement 1, count the marbles that are <b>not</b> red: blue and green together.`,
            explain: `<p>Statement 1: there are 5 red and 3 + 2 = 5 not red, so they are <b>equally</b> likely. Not correct. Statement 2: green has the fewest marbles (2), so it is least likely. Correct. Statement 3: there are no yellow marbles, so it is impossible. Correct. So <b>2 and 3 only</b>.</p><p class="why-not">Statement 1 is the trap: red is the most likely <em>colour</em>, but it is not more likely than all the other marbles put together.</p>` },
          { id: "m3e", cat: "Graphs & data",
          stem: `<p>Twenty children each took 6 shots at goal. The dot plot shows how many goals each child scored.</p>${DOTS}<p>How many children scored <b>more than 3</b> goals?</p>`,
          options: ["4", "7", "9", "11", "13"], answer: 1,
          hint: `“More than 3” does <b>not</b> include 3. Which columns of dots count?`,
          explain: `<p>More than 3 means 4, 5 or 6 goals. Count those dots: 4 + 2 + 1 = <b>7</b>.</p><p class="why-not">11 includes the children who scored exactly 3. 4 counts only one column. 9 is the number who scored fewer than 3, and 13 is the number who scored 3 or fewer.</p>` },
          { id: "m3d", cat: "Time & timetables",
            stem: `<p>Today is <b>Wednesday</b>. What day of the week will it be in <b>40 days</b>?</p>`,
            options: ["Thursday", "Friday", "Saturday", "Sunday", "Monday"], answer: 4,
            hint: `Every 7 days you land on Wednesday again. How many whole weeks are in 40 days, and how many days are left over?`,
            explain: `<p>40 = 5 weeks (35 days) + 5 days. After 35 days it is Wednesday again. Five more days: Thursday, Friday, Saturday, Sunday, <b>Monday</b>.</p><p class="why-not">Sunday counts Wednesday itself as the first of the 5 days. Friday comes from 40 ÷ 7 ≈ 5 with the wrong leftover (2 instead of 5).</p>` },
        ],
      },
      {
        id: "m5", name: "Chart Cove",
        questions: [
          { id: "m5a", cat: "Graphs & data",
            stem: `<p>A school stall wants to sell <b>80 cupcakes</b> in four days. The graph shows the first three days.</p>${CUPCAKES}<p>How many cupcakes must the stall sell on <b>Thursday</b> to reach its target?</p>`,
            options: ["20", "30", "35", "40", "50"], answer: 1,
            hint: `Two of the columns stop <b>halfway</b> between two lines. The lines go up in 10s, so what is halfway worth?`,
            explain: `<p>Monday 15, Tuesday 25, Wednesday 10: that is 50 sold so far. To reach 80 they need 80 − 50 = <b>30</b>.</p><p class="why-not">50 is the number already sold. 40 reads the halfway columns down to 10 and 20. 20 reads them up to 20 and 30. 35 misreads just one of them.</p>` },
          { id: "m5b", cat: "Graphs & data",
            stem: `<p>Aki and Bo collected shells. The numbers have been left off the graph’s scale, but the lines are evenly spaced and start at 0.</p>${SHELLS}<p>Together they collected <b>60 shells</b>. How many did <b>Bo</b> collect?</p>`,
            options: ["9", "24", "30", "36", "45"], answer: 3,
            hint: `Count how many lines each column reaches. How many lines is that altogether, and how many shells must one line be worth?`,
            explain: `<p>Aki’s column reaches 6 lines and Bo’s reaches 9: 15 lines for 60 shells, so each line is 60 ÷ 15 = 4 shells. Bo collected 9 × 4 = <b>36</b>.</p><p class="why-not">9 treats each line as 1 shell. 24 is Aki’s number. 30 just halves the total, but the columns are not the same height. 45 guesses that each line is worth 5.</p>` },
          { id: "m5c", cat: "Measurement & scales",
            stem: `<p>The two gauges show how much rain fell on Monday and on Tuesday. <b>Their scales are different.</b></p>${GAUGES}<p>How much <b>more</b> rain fell on Tuesday than on Monday?</p>`,
            options: ["10 mm", "17 mm", "19 mm", "22 mm", "51 mm"], answer: 2,
            hint: `Work out what one small mark is worth on <b>each</b> gauge separately. They are not the same.`,
            explain: `<p>Monday’s gauge has 5 gaps for every 10 mm, so each small mark is 2 mm: the water is at 10 + 3 × 2 = 16 mm. Tuesday’s has 4 gaps for every 20 mm, so each mark is 5 mm: 20 + 3 × 5 = 35 mm. Difference: 35 − 16 = <b>19 mm</b>.</p><p class="why-not">10 mm comes from using the same value for the marks on both gauges. 51 mm adds instead of subtracting. 22 mm reads Monday’s marks as 1 mm each.</p>` },
          { id: "m5d", cat: "Graphs & data",
            stem: `<p>The table shows a netball competition so far. A win earns <b>3 points</b>, a draw earns <b>1 point</b> and a loss earns none.</p>${tbl(["Team", "Played", "Won", "Drawn", "Lost"], [["Reds", 8, 5, 1, 2], ["Blues", 8, 4, 4, 0], ["Greens", 7, 4, 1, 2], ["Golds", 8, 2, 3, 3]])}<div class="box">1. The Reds have more points than the Blues.<br>2. The Blues have not lost a game.<br>3. If the Greens win their next game, they will have as many points as the Reds have now.</div><p>Which statements are correct?</p>`,
            options: ["1 only", "2 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], answer: 3,
            hint: `Work out each team’s points first: wins × 3, plus draws. More wins doesn’t always mean more points.`,
            explain: `<p>Points: Reds 5 × 3 + 1 = 16. Blues 4 × 3 + 4 = 16. Greens 4 × 3 + 1 = 13. Statement 1: 16 and 16 are equal, so not correct. Statement 2: the Blues’ “Lost” column is 0, correct. Statement 3: 13 + 3 = 16, the same as the Reds, correct. So <b>2 and 3 only</b>.</p><p class="why-not">Statement 1 looks right because the Reds have more wins, but the Blues’ four draws make up the difference.</p>` },
        ],
      },
      {
        id: "m4", name: "The Deep Trench",
        questions: [
          { id: "m4a", cat: "Number & place value",
            stem: `<p>Lena thinks of a number. She <b>doubles</b> it, <b>subtracts 6</b>, then <b>divides by 4</b>. Her answer is <b>5</b>. What number did she start with?</p>`,
            options: ["1", "7", "13", "26", "52"], answer: 2,
            hint: `Work backwards from 5, undoing each step in reverse order. The opposite of “divide by 4” is “multiply by 4”.`,
            explain: `<p>Work backwards: 5 × 4 = 20. Undo “subtract 6”: 20 + 6 = 26. Undo “double”: 26 ÷ 2 = <b>13</b>. Check: 13 → 26 → 20 → 5. ✓</p><p class="why-not">26 stops one step early (it forgets to undo the doubling). 7 subtracts 6 again instead of adding it back. 1 does the steps forwards starting from 5.</p>` },
          { id: "m4e", cat: "Time & timetables",
          stem: `<p>Three buses run from the Station to the Beach.</p>${tbl(["", "Bus 1", "Bus 2", "Bus 3"], [["Station", "9:10", "9:40", "10:20"], ["Market", "9:28", "9:58", "10:38"], ["Beach", "9:55", "10:25", "11:05"]])}<p>Zara takes Bus 1 and gets off at the Market. Her shopping takes <b>40 minutes</b>. Then she catches the next bus she can. What time does she reach the Beach?</p>`,
          options: ["10:08 am", "10:25 am", "10:35 am", "10:38 am", "11:05 am"], answer: 4,
          hint: `Work out when her shopping finishes. Has Bus 2 already left the Market by then?`,
          explain: `<p>She reaches the Market at 9:28 and finishes shopping at 9:28 + 40 minutes = 10:08. Bus 2 left the Market at 9:58, so she has missed it. Bus 3 leaves at 10:38 and reaches the Beach at <b>11:05 am</b>.</p><p class="why-not">10:25 is when Bus 2 arrives, but she was still shopping when it left. 10:38 is when Bus 3 <em>leaves</em> the Market. 10:08 is when her shopping ends. 10:35 adds 40 minutes to Bus 1’s arrival at the Beach.</p>` },
          { id: "m4c", cat: "Area, perimeter & 3D",
            stem: `<p>A <b>square</b> paddock has sides <b>12 m</b> long. A farmer puts a fence post at <b>every corner</b>, and then more posts so that the posts are <b>3 m apart</b> all the way round. How many posts does she use?</p>`,
            options: ["16", "17", "20", "24", "48"], answer: 0,
            hint: `Each side has 5 posts, but be careful: a corner post belongs to <b>two</b> sides. Don't count it twice.`,
            explain: `<p>The distance all the way round is 4 × 12 = 48 m. Going round a closed shape, there is one post for every 3 m gap: 48 ÷ 3 = <b>16</b>.</p><p class="why-not">20 counts 5 posts on each side (5 × 4), which counts every corner post twice. 17 adds an extra end post, which is right for a straight fence but not for a loop. 48 is the distance round.</p>` },
          { id: "m4d", cat: "Rates",
            stem: `<p>Sam folds <b>4 paper boats every 10 minutes</b>. Lee folds <b>3 paper boats every 5 minutes</b>. Working at the same time, how long do they take to fold <b>70 boats</b> altogether?</p>`,
            options: ["50 minutes", "1 hour 10 minutes", "1 hour 40 minutes", "2 hours 30 minutes", "2 hours 55 minutes"], answer: 1,
            hint: `Their times are different (10 minutes and 5 minutes). How many boats does <b>Lee</b> fold in 10 minutes?`,
            explain: `<p>Use the same amount of time for both. In 10 minutes Sam folds 4 and Lee folds 3 + 3 = 6, so together they fold 10 boats every 10 minutes. 70 boats take <b>70 minutes = 1 hour 10 minutes</b>.</p><p class="why-not">1 hour 40 minutes adds 4 + 3 = 7 boats every 10 minutes, forgetting that Lee's 3 boats take only 5 minutes. 2 hours 55 minutes is Sam working alone.</p>` },
        ],
      },
      {
        id: "mb", name: "Leviathan", boss: true,
        questions: [
          { id: "mba", cat: "Fractions",
            stem: `<p>Mia spent <b>one third</b> of her money on a book. Then she spent <b>half of what was left</b> on a game. She now has <b>$12</b>. How much money did she start with?</p>`,
            options: ["$18", "$24", "$36", "$48", "$72"], answer: 2,
            hint: `Work backwards. The game cost half of what she had after the book, so the $12 she has left is the <b>other</b> half.`,
            explain: `<p>Work backwards. After the game she has $12, which is half of what she had after the book, so after the book she had $24. That $24 is the two thirds left after spending one third, so one third is $12 and the whole is <b>$36</b>. Check: $36 − $12 = $24, then half of $24 is $12. ✓</p><p class="why-not">$72 multiplies 12 × 2 × 3, treating $24 as one third instead of two thirds. $24 stops one step early.</p>` },
          { id: "mbb", cat: "Graphs & data",
            stem: `<p>The graph shows how many books five children read last term.</p>${GRAPH}<div class="box">1. Cy read exactly twice as many books as Ben.<br>2. Ava and Ben together read fewer books than Dee and Eli together.<br>3. Three of the children read more than 8 books.</div><p>Which statements are correct?</p>`,
            options: ["2 only", "3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], answer: 0,
            hint: `The lines go up in 2s, so a column that stops <b>halfway</b> between two lines is an odd number. Read Ben and Cy carefully.`,
            explain: `<p>Read the columns: Ava 8, Ben 5, Cy 11, Dee 6, Eli 10. Statement 1: twice 5 is 10, but Cy read 11. Not correct. Statement 2: 8 + 5 = 13 and 6 + 10 = 16, and 13 is fewer than 16. Correct. Statement 3: only Cy (11) and Eli (10) read <b>more than</b> 8; Ava read exactly 8. Not correct. So <b>2 only</b>.</p><p class="why-not">Statement 1 looks right if you read Cy's column as 12 or Ben's as 6. Statement 3 looks right if you count Ava, but 8 is not more than 8.</p>` },
          { id: "mbc", cat: "Area, perimeter & 3D",
            stem: `<p>This large cube is made of <b>27 small cubes</b>. The whole outside of the large cube is painted red, and then it is pulled apart.</p>${CUBE}<p>How many small cubes have <b>exactly two</b> red faces?</p>`,
            options: ["8", "12", "18", "24", "26"], answer: 1,
            hint: `Corner cubes have three painted faces. Look for the cubes in the <b>middle of each edge</b> of the large cube. How many edges does a cube have?`,
            explain: `<p>A small cube has exactly two red faces when it sits in the middle of an <b>edge</b> of the large cube (not at a corner). A cube has 12 edges, and each edge has one middle cube: <b>12</b>.</p><p class="why-not">8 is the number of corner cubes, which have three red faces. 26 is every cube with any paint at all (only the one in the very centre has none). 24 counts two cubes on every edge.</p>` },
          { id: "mbd", cat: "Number & place value",
            stem: `<p>Using each of the digits <b>2</b>, <b>6</b> and <b>9</b> exactly once, Noah makes the <b>largest</b> possible 3-digit number and the <b>smallest</b> possible 3-digit number. What is the <b>difference</b> between them?</p>`,
            options: ["603", "683", "687", "693", "707"], answer: 3,
            hint: `Largest: biggest digit first. Smallest: smallest digit first. Then subtract carefully, because the ones need a trade (2 − 9 can't be done).`,
            explain: `<p>Largest: 962. Smallest: 269. 962 − 269: take away 262 to get 700, then 7 more: <b>693</b>.</p><p class="why-not">707 takes the smaller digit from the larger in every column (9 − 2, 6 − 6, 9 − 2) instead of trading. 683 and 603 are slips in the trading.</p>` },
          { id: "mbe", cat: "Money & best value",
            stem: `<p><b>3 pens and 2 rulers</b> cost <b>$9.50</b>.<br><b>1 pen and 2 rulers</b> cost <b>$5.50</b>.</p><p>How much do <b>1 pen and 1 ruler</b> cost together?</p>`,
            options: ["$1.75", "$2.00", "$2.75", "$3.00", "$3.75"], answer: 4,
            hint: `Compare the two lines. The rulers are the same in both, so the extra $4.00 pays for the 2 extra pens.`,
            explain: `<p>The first lot has 2 more pens and costs $9.50 − $5.50 = $4.00 more, so one pen is $2.00. Then 1 pen + 2 rulers = $5.50 means 2 rulers cost $3.50, so one ruler is $1.75. Together: $2.00 + $1.75 = <b>$3.75</b>.</p><p class="why-not">$2.00 is the pen alone and $1.75 is the ruler alone: both stop before answering the question. $2.75 just halves $5.50.</p>` },
        ],
      },
    ],
  });
})();
