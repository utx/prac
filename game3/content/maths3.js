/* ---------------------------------------------------------------
   STORM ISLAND: third set of maths questions (Nov 2026). Five options (A–E).
   New kinds of question: rounding, a number line, fewest coins, an addition pyramid,
   missing digits, shapes by their properties, a mirror line on a map grid, a pie chart,
   a turn in degrees, a temperature table, digit swaps, perimeter versus area and more.
   tier 1–3 = storm circle 1–3; tier 4 = the boss.
   --------------------------------------------------------------- */
(() => {
  const { fig, frac, T, tbl, colGraph } = LIB;

  const NUMLINE = (() => {
    const X = v => 30 + (v - 200) * 2.8;
    let g = `<line x1="20" x2="330" y1="60" y2="60" stroke="${INK}" stroke-width="2.5"/>`;
    for (let v = 200; v <= 300; v += 20) { const big = v % 100 === 0; g += `<line x1="${X(v)}" x2="${X(v)}" y1="${big ? 46 : 52}" y2="${big ? 74 : 68}" stroke="${INK}" stroke-width="2.5"/>`; if (big) g += T(X(v), 96, v, 'text-anchor="middle" font-weight="700"'); }
    g += `<path d="M${X(260)} 14 L${X(260)} 44 M${X(260) - 7} 35 L${X(260)} 46 L${X(260) + 7} 35" fill="none" stroke="#e5484d" stroke-width="3.5" stroke-linecap="round"/>`;
    return fig(`<svg viewBox="0 0 350 106" width="340" role="img" aria-label="A number line from 200 to 300. Between 200 and 300 there are four small unlabelled marks, evenly spaced. An arrow points to the third small mark after 200.">${g}</svg>`);
  })();

  const PYR = (() => {
    const b = (x, y, s, hi) => `<rect x="${x}" y="${y}" width="70" height="40" fill="${hi ? "#ffe066" : "#fff"}" stroke="${INK}" stroke-width="2.5"/>` + T(x + 35, y + 27, s, 'text-anchor="middle" font-size="19" font-weight="700"');
    return fig(`<svg viewBox="0 0 230 136" width="230" role="img" aria-label="An addition pyramid. Bottom row: 4, a missing number in a yellow brick, 7. Middle row: two empty bricks. Top brick: 31.">${b(80, 6, "31")}${b(45, 48, "")}${b(115, 48, "")}${b(10, 90, "4")}${b(80, 90, "?", true)}${b(150, 90, "7")}</svg>`);
  })();

  const PIE = (() => {
    const cx = 110, cy = 110, r = 92, pt = a => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    const seg = (a, b, c) => { const [x1, y1] = pt(a), [x2, y2] = pt(b); return `<path d="M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 ${b - a > 180 ? 1 : 0} 1 ${x2} ${y2} Z" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`; };
    const lab = (a, s) => { const [x, y] = [cx + 56 * Math.sin(a * Math.PI / 180), cy - 56 * Math.cos(a * Math.PI / 180)]; return T(x, y + 5, s, 'text-anchor="middle" font-size="14" font-weight="700"'); };
    return fig(`<svg viewBox="0 0 220 220" width="220" role="img" aria-label="A pie chart cut into four parts. Soccer takes half of the circle. Swimming takes a quarter. Tennis and Dance each take an eighth.">${seg(0, 180, "#69db7c")}${seg(180, 270, "#4dabf7")}${seg(270, 315, "#ffa94d")}${seg(315, 360, "#f783ac")}${lab(90, "Soccer")}${lab(225, "Swimming")}${lab(292, "Tennis")}${lab(338, "Dance")}</svg>`);
  })();

  const MAP = (() => {
    const u = 34, cols = "ABCDEF";
    let g = "";
    for (let c = 0; c < 6; c++) { g += T(40 + c * u + u / 2, 22, cols[c], 'text-anchor="middle" font-weight="700"'); for (let r = 0; r < 5; r++) g += `<rect x="${40 + c * u}" y="${30 + r * u}" width="${u}" height="${u}" fill="#e7f5ff" stroke="#8aa0b8" stroke-width="1.2"/>`; }
    for (let r = 0; r < 5; r++) g += T(26, 30 + r * u + u / 2 + 5, r + 1, 'text-anchor="middle" font-weight="700"');
    g += `<line x1="${40 + 3 * u}" x2="${40 + 3 * u}" y1="24" y2="${36 + 5 * u}" stroke="#e5484d" stroke-width="4" stroke-dasharray="8 5"/>`;
    g += T(40 + 1 * u + u / 2, 30 + 3 * u + u / 2 + 7, "★", 'text-anchor="middle" font-size="22" fill="#f08c00"');
    return fig(`<svg viewBox="0 0 260 210" width="260" role="img" aria-label="A map grid with columns A to F and rows 1 to 5. A dashed red mirror line runs down between columns C and D. A star is in square B4.">${g}</svg>`);
  })();

  const BOX = fig(`<svg viewBox="0 0 230 150" width="230" role="img" aria-label="A closed box shaped like a cuboid. The front face has an area of 12 square centimetres, the top face 20 square centimetres and the side face 15 square centimetres."><polygon points="20,60 150,60 150,140 20,140" fill="#ffe8cc" stroke="${INK}" stroke-width="2.5"/><polygon points="20,60 70,20 200,20 150,60" fill="#fff4e6" stroke="${INK}" stroke-width="2.5"/><polygon points="150,60 200,20 200,100 150,140" fill="#ffd8a8" stroke="${INK}" stroke-width="2.5"/>${T(85, 106, "12 cm²", 'text-anchor="middle" font-weight="700"')}${T(110, 45, "20 cm²", 'text-anchor="middle" font-weight="700"')}${T(176, 86, "15", 'text-anchor="middle" font-weight="700"')}${T(176, 102, "cm²", 'text-anchor="middle" font-size="12" font-weight="700"')}</svg>`);


  const SCALE = (() => {
    const X = g => 24 + g * 0.15;
    let s = `<rect x="14" y="30" width="322" height="46" rx="6" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
    for (let g = 0; g <= 2000; g += 100) { const big = g % 500 === 0; s += `<line x1="${X(g)}" x2="${X(g)}" y1="30" y2="${big ? 56 : 46}" stroke="${INK}" stroke-width="${big ? 2.5 : 1.8}"/>`; if (big) s += T(X(g), 72, g === 0 ? "0" : g % 1000 === 0 ? g / 1000 + " kg" : g >= 1000 ? "1.5 kg" : "500 g", 'text-anchor="middle" font-size="13" font-weight="700"'); }
    s += `<path d="M${X(1300)} 4 L${X(1300)} 40 M${X(1300) - 7} 31 L${X(1300)} 42 L${X(1300) + 7} 31" fill="none" stroke="#e5484d" stroke-width="3.5" stroke-linecap="round"/>`;
    return fig(`<svg viewBox="0 0 350 84" width="340" role="img" aria-label="The scale of a kitchen scale, from 0 to 2 kg. It is labelled 0, 500 g, 1 kg, 1.5 kg and 2 kg, with four small marks between each pair of labels. The red pointer is at the third small mark after 1 kg.">${s}</svg>`);
  })();
  const RULER = (() => {
    const X = c => 20 + c * 30;
    let s = `<rect x="10" y="50" width="330" height="42" fill="#fff3bf" stroke="${INK}" stroke-width="2"/>`;
    for (let mm = 0; mm <= 105; mm++) { const cm = mm % 10 === 0, half = mm % 5 === 0; s += `<line x1="${X(mm / 10)}" x2="${X(mm / 10)}" y1="50" y2="${cm ? 66 : half ? 61 : 56}" stroke="${INK}" stroke-width="${cm ? 1.8 : 0.9}"/>`; if (cm) s += T(X(mm / 10), 84, mm / 10, 'text-anchor="middle" font-size="13"'); }
    s += `<rect x="${X(2)}" y="18" width="${X(8.5) - X(2) - 18}" height="22" fill="#ffa94d" stroke="${INK}" stroke-width="2"/><polygon points="${X(8.5) - 18},18 ${X(8.5)},29 ${X(8.5) - 18},40" fill="#ffe8cc" stroke="${INK}" stroke-width="2"/><line x1="${X(2)}" x2="${X(2)}" y1="12" y2="50" stroke="#e5484d" stroke-width="1.5" stroke-dasharray="3 3"/><line x1="${X(8.5)}" x2="${X(8.5)}" y1="12" y2="50" stroke="#e5484d" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    return fig(`<svg viewBox="0 0 350 98" width="340" role="img" aria-label="A pencil lying above a ruler marked in centimetres and millimetres, from 0 to 10 cm. The flat end of the pencil is at 2 cm and its point is at the halfway mark between 8 and 9 cm.">${s}</svg>`);
  })();
  const TALLY = (() => {
    const rows = [["Red", 13], ["Blue", 17], ["Green", 9], ["Yellow", 11]];
    const tally = (c, y) => { let g = "", x = 100; for (let k = 0; k < Math.floor(c / 5); k++) { for (let j = 0; j < 4; j++) g += `<line x1="${x + j * 8}" x2="${x + j * 8}" y1="${y - 14}" y2="${y + 10}" stroke="${INK}" stroke-width="2.5"/>`; g += `<line x1="${x - 4}" x2="${x + 28}" y1="${y + 6}" y2="${y - 10}" stroke="${INK}" stroke-width="2.5"/>`; x += 46; } for (let j = 0; j < c % 5; j++) g += `<line x1="${x + j * 8}" x2="${x + j * 8}" y1="${y - 14}" y2="${y + 10}" stroke="${INK}" stroke-width="2.5"/>`; return g; };
    let g = ""; rows.forEach(([n, c], i) => { const y = 30 + i * 38; g += T(12, y + 5, n, 'font-weight="700"') + tally(c, y) + `<line x1="6" x2="294" y1="${y + 19}" y2="${y + 19}" stroke="#c5ccd8"/>`; });
    return fig(`<svg viewBox="0 0 300 172" width="300" role="img" aria-label="A tally chart of favourite colours. Red: two bundles of five and 3 more strokes. Blue: three bundles of five and 2 more. Green: one bundle of five and 4 more. Yellow: two bundles of five and 1 more.">${g}</svg>`);
  })();

  MATHS.push(
    /* ===================== circle 1 ===================== */
    { id: "w101", tier: 1, cat: "Number & place value",
      stem: `<p>Which number rounds to <b>4 500</b> when it is rounded to the nearest hundred?</p>`,
      options: ["4 405", "4 449", "4 549", "4 551", "4 650"], answer: 2,
      explain: `<p>Numbers from 4 450 up to 4 549 round to 4 500. <b>4 549</b> is in that range: its tens digit is 4, so it rounds <i>down</i> to 4 500.</p><p class="why-not">4 551 has 5 tens, so it rounds up to 4 600. 4 449 and 4 405 round down to 4 400. 4 650 rounds to 4 700. Look at the tens digit, not the ones.</p>` },
    { id: "w102", tier: 1, cat: "Measurement & scales",
      stem: `<p>What number is the arrow pointing to?</p>${NUMLINE}`,
      options: ["203", "230", "250", "260", "280"], answer: 3,
      explain: `<p>From 200 to 300 is 100. The four small marks split it into <b>5</b> equal jumps, so each jump is 100 ÷ 5 = 20. The arrow is at the third mark: 200 + 3 × 20 = <b>260</b>.</p><p class="why-not">230 counts each jump as 10, and 203 as 1. 250 guesses “about halfway”. 280 counts four jumps.</p>` },
    { id: "w103", tier: 1, cat: "Money & best value",
      stem: `<p>Australian coins are 5c, 10c, 20c, 50c, $1 and $2.</p><p>What is the <b>fewest</b> coins you need to pay exactly <b>$3.85</b>?</p>`,
      options: ["4", "5", "6", "7", "8"], answer: 2,
      explain: `<p>Use the biggest coin you can each time: $2 (leaves $1.85), $1 (85c), 50c (35c), 20c (15c), 10c (5c), 5c. That is <b>6</b> coins.</p><p class="why-not">5 or 4 coins can’t make the 85c part: it needs 50c, 20c, 10c and 5c. 7 or 8 come from using two 20c coins or two $1 coins instead of a bigger one.</p>` },
    { id: "w104", tier: 1, cat: "Time & timetables",
      stem: `<p>Part of a train timetable:</p>${tbl(["Station", "Time"], [["Hillview", "9:47 am"], ["Oak Park", "10:20 am"], ["Kingsford", "10:51 am"], ["Bay Road", "11:12 am"]])}<p>How many minutes does the train take from <b>Hillview</b> to <b>Bay Road</b>?</p>`,
      options: ["65 minutes", "75 minutes", "85 minutes", "95 minutes", "165 minutes"], answer: 2,
      explain: `<p>Count up in friendly steps: 9:47 to 10:00 is 13 minutes. 10:00 to 11:00 is 60 minutes. 11:00 to 11:12 is 12 minutes. 13 + 60 + 12 = <b>85 minutes</b>.</p><p class="why-not">165 comes from 1112 − 947, treating the times as ordinary numbers: but an hour has 60 minutes, not 100. 75 and 95 are 10 out, from slips in the first step.</p>` },
    { id: "w105", tier: 1, cat: "Graphs & data",
      stem: `<p>All <b>24</b> children in a class chose their favourite sport. The pie chart shows the results.</p>${PIE}<p>How many children chose <b>tennis</b>?</p>`,
      options: ["2", "3", "4", "6", "8"], answer: 1,
      explain: `<p>Tennis is <b>one eighth</b> of the circle: half of a quarter. One eighth of 24 is 24 ÷ 8 = <b>3</b>.</p><p class="why-not">6 is a quarter of 24 (swimming). 4 is a sixth, from counting the 4 parts and then guessing. 2 and 8 come from dividing by 12 or 3.</p>` },
    { id: "w106", tier: 1, cat: "Number & place value",
      stem: `<p>Which is the <b>best estimate</b> for 398 × 5?</p>`,
      options: ["200", "1 500", "1 600", "2 000", "20 000"], answer: 3,
      explain: `<p>398 is very close to 400. 400 × 5 = <b>2 000</b>, so 398 × 5 is just under 2 000. (It is exactly 1 990.)</p><p class="why-not">20 000 has one zero too many, and 200 one too few. 1 500 rounds 398 down to 300, and 1 600 multiplies 400 by 4 instead of 5.</p>` },
    { id: "w107", tier: 1, cat: "Number & place value",
      stem: `<p><b>96</b> children are going on an excursion. Each minibus can carry <b>14</b> children.</p><p>What is the smallest number of minibuses needed?</p>`,
      options: ["6", "7", "8", "14", "82"], answer: 1,
      explain: `<p>6 buses carry 6 × 14 = 84 children: 12 are left over. They need one more bus, so <b>7</b>.</p><p class="why-not">6 leaves 12 children behind. 8 is one bus too many (7 × 14 = 98 is already enough). 82 is 96 − 14, a take-away instead of a share.</p>` },
    { id: "w108", tier: 1, cat: "Measurement & scales",
      stem: `<p>Lena faces <b>east</b>. She turns <b>270°</b> clockwise.</p><p>Which way is she facing now?</p>`,
      options: ["North", "South", "East", "West", "North-east"], answer: 0,
      explain: `<p>270° is three quarter turns (3 × 90°). Clockwise from east: south, west, <b>north</b>.</p><p class="why-not">South is one quarter turn, and west is two. Turning 270° anticlockwise would give south. North-east is only half a quarter turn from either.</p>` },

    { id: "w109", tier: 1, cat: "Measurement & scales",
      stem: `<p>Some flour is put on a kitchen scale. How much does it weigh?</p>${SCALE}`,
      options: ["1 030 g", "1 060 g", "1 150 g", "1 200 g", "1 300 g"], answer: 4,
      explain: `<p>From 1 kg (1 000 g) to 1.5 kg (1 500 g) is 500 g. The four small marks split it into <b>5</b> equal steps of 100 g. The pointer is at the third mark: 1 000 + 3 × 100 = <b>1 300 g</b>.</p><p class="why-not">1 030 g counts each step as 10 g, 1 060 g as 20 g, and 1 150 g as 50 g. 1 200 g counts only two steps.</p>` },
    { id: "w110", tier: 1, cat: "Measurement & scales",
      stem: `<p>How long is the pencil?</p>${RULER}`,
      options: ["55 mm", "65 mm", "75 mm", "85 mm", "105 mm"], answer: 1,
      explain: `<p>The pencil does not start at 0. It goes from 2 cm to 8 cm 5 mm. From 2 cm to 8 cm is 6 cm = 60 mm, plus the 5 mm: <b>65 mm</b>.</p><p class="why-not">85 mm reads where the point is and forgets that the pencil starts at 2 cm, not 0. 75 mm counts from the 1 cm mark. 55 mm takes the 5 mm away instead of adding it.</p>` },
    /* ===================== circle 2 ===================== */
    { id: "w201", tier: 2, cat: "Number & place value",
      stem: `<p>In an addition pyramid, each brick is the <b>sum</b> of the two bricks under it.</p>${PYR}<p>What number goes in the yellow brick?</p>`,
      options: ["6", "8", "9", "10", "20"], answer: 3,
      explain: `<p>Call the yellow number ?. The middle bricks are 4 + ? and ? + 7. The top is (4 + ?) + (? + 7) = 11 + ? + ?.</p><p>So 11 + two lots of ? = 31. Two lots of ? = 20, and ? = <b>10</b>.</p><p>Check: middle bricks 14 and 17, and 14 + 17 = 31.</p><p class="why-not">20 is 31 − 11, forgetting that the yellow number is counted twice (it is under both middle bricks). 8 and 9 come from guessing the middle bricks instead of working them out.</p>` },
    { id: "w202", tier: 2, cat: "Number & place value",
      stem: `<p>Two digits are missing from this subtraction.</p><div class="box" style="font-size:22px;letter-spacing:4px;text-align:center">7 ▢ 2 − 3 8 △ = 3 4 6</div><p>Which digits are missing?</p>`,
      options: ["▢ = 2, △ = 6", "▢ = 3, △ = 4", "▢ = 3, △ = 6", "▢ = 4, △ = 6", "▢ = 3, △ = 8"], answer: 2,
      explain: `<p>Turn it round: 7▢2 = 346 + 38△. The ones must end in 2: 6 + △ ends in 2, so △ = <b>6</b>. Then 346 + 386 = 732, so ▢ = <b>3</b>.</p><p>Check: 732 − 386 = 346.</p><p class="why-not">△ = 4 comes from 6 − 2 = 4, taking the small digit from the big one. ▢ = 2 forgets the ten carried across from the ones. △ = 8 copies the 8.</p>` },
    { id: "w203", tier: 2, cat: "Area, perimeter & 3D",
      stem: `<p>A shape has <b>4 sides</b> that are all the <b>same length</b>, but it has <b>no right angles</b>.</p><p>What is the shape?</p>`,
      options: ["Rhombus", "Square", "Rectangle", "Trapezium", "Kite"], answer: 0,
      explain: `<p>Four equal sides make it a square or a <b>rhombus</b>. A square has four right angles, so this one, with none, is a rhombus: a “pushed over” square.</p><p class="why-not">A rectangle has right angles and its sides are usually not all equal. A kite has two pairs of equal sides next to each other, and a trapezium has one pair of parallel sides; neither needs four equal sides.</p>` },
    { id: "w204", tier: 2, cat: "Number & place value",
      stem: `<p>Two numbers add up to <b>50</b>. One of them is <b>4 times</b> the other.</p><p>What is the <b>difference</b> between the two numbers?</p>`,
      options: ["4", "10", "12.5", "25", "30"], answer: 4,
      explain: `<p>Think of the small number as 1 part and the big one as 4 parts: 5 parts make 50, so 1 part is 10. The numbers are 10 and 40, and the difference is 40 − 10 = <b>30</b>.</p><p class="why-not">10 is the smaller number, not the difference. 12.5 is 50 ÷ 4, forgetting there are 5 parts. 25 halves 50, and 4 is just the “times” number.</p>` },
    { id: "w205", tier: 2, cat: "Measurement & scales",
      stem: `<p>A goods lift can carry at most <b>400 kg</b>. A worker who weighs <b>80 kg</b> rides with the boxes. Each box weighs <b>35 kg</b>.</p><p>What is the greatest number of boxes the lift can take?</p>`,
      options: ["8", "9", "10", "11", "12"], answer: 1,
      explain: `<p>The worker uses 80 kg, leaving 400 − 80 = 320 kg for boxes. 9 boxes weigh 315 kg; 10 would weigh 350 kg, too much. So <b>9</b>.</p><p class="why-not">11 forgets the worker (400 ÷ 35 is just over 11). 10 rounds 320 ÷ 35 = 9.1… up, but you can’t take part of a box over the limit.</p>` },
    { id: "w206", tier: 2, cat: "Rates",
      stem: `<p>A pancake recipe uses <b>3 eggs</b> for every <b>2 cups</b> of flour.</p><p>How many cups of flour are needed with <b>12 eggs</b>?</p>`,
      options: ["6", "8", "11", "13", "18"], answer: 1,
      explain: `<p>12 eggs is 4 lots of 3 eggs (12 ÷ 3 = 4). So you need 4 lots of 2 cups: 4 × 2 = <b>8</b> cups.</p><p class="why-not">18 swaps the eggs and the cups (12 ÷ 2 × 3). 11 adds instead: 12 − 3 + 2. 6 halves the 12. 13 is 12 + 3 − 2.</p>` },
    { id: "w207", tier: 2, cat: "Time & timetables",
      stem: `<p>It is <b>10:40 am</b>. What time will it be in <b>500 minutes</b>?</p>`,
      options: ["3:40 pm", "6:20 pm", "6:40 pm", "7:00 pm", "7:20 pm"], answer: 3,
      explain: `<p>500 minutes = 8 × 60 + 20 = <b>8 hours 20 minutes</b>. 10:40 am + 8 hours = 6:40 pm. Then 20 more minutes = <b>7:00 pm</b>.</p><p class="why-not">3:40 pm treats 500 minutes as 5 hours. 6:40 pm forgets the last 20 minutes, and 6:20 pm takes them away instead of adding. 7:20 pm adds 20 minutes too many.</p>` },
    { id: "w208", tier: 2, cat: "Time & timetables",
      stem: `<p>Today is <b>4 March</b> in a year that is <b>not</b> a leap year.</p><p>What was the date <b>10 days ago</b>?</p>`,
      options: ["21 February", "22 February", "23 February", "24 February", "25 February"], answer: 1,
      explain: `<p>Count back 4 days to 28 February (February has 28 days when it isn’t a leap year). That is 4 of the 10. Count back the other 6: 27, 26, 25, 24, 23, <b>22 February</b>.</p><p class="why-not">24 February gives February 30 days, and 25 February 31 days. 23 or 21 February are one day out from counting today as one of the 10.</p>` },
    { id: "w209", tier: 2, cat: "Area, perimeter & 3D",
      stem: `<p>The dashed red line is a <b>mirror line</b>.</p>${MAP}<p>In which square is the reflection of the star?</p>`,
      options: ["B4", "D4", "E3", "E4", "F4"], answer: 3,
      explain: `<p>The star in B4 is <b>2 squares</b> to the left of the mirror line (C is between). Its reflection is 2 squares to the right: D, then <b>E</b>. It stays in the same row, so <b>E4</b>.</p><p class="why-not">D4 puts the reflection right next to the line, 1 square away instead of 2. F4 goes 3 squares. E3 moves the row as well: a mirror line going up and down doesn’t change the row. B4 is where the star already is.</p>` },
    { id: "w210", tier: 2, cat: "Money & best value",
      stem: `<p>Yoghurts cost <b>95c</b> each, or <b>$5.40</b> for a pack of 6.</p><p>How much do you save by buying <b>12</b> yoghurts in packs instead of one at a time?</p>`,
      options: ["30c", "55c", "60c", "$1.20", "$5.40"], answer: 2,
      explain: `<p>12 singles: 12 × 95c = $11.40. Two packs: 2 × $5.40 = $10.80. Saving: $11.40 − $10.80 = <b>60c</b>.</p><p class="why-not">30c is the saving on just one pack of 6. 55c is 95c − 40c, a mix-up. $1.20 doubles the saving twice. $5.40 is the price of a pack, not a saving.</p>` },
    { id: "w211", tier: 2, cat: "Measurement & scales",
      stem: `<p>A water tank holds <b>24 litres</b>. Mo fills it using a jug that holds <b>750 mL</b>.</p><p>How many full jugs does it take?</p>`,
      options: ["18", "30", "32", "36", "320"], answer: 2,
      explain: `<p>24 litres = 24 000 mL. Each 3 L is 4 jugs (4 × 750 mL = 3 000 mL). 24 L is 8 lots of 3 L, so 8 × 4 = <b>32</b> jugs.</p><p class="why-not">18 is 24 × ¾, multiplying instead of dividing. 320 loses a zero (24 000 ÷ 75). 30 and 36 come from rounding 750 mL to “about 1 litre” or to 700 mL and guessing.</p>` },
    { id: "w212", tier: 2, cat: "Graphs & data",
      stem: `<p>The table shows the lowest and highest temperatures on five school days.</p>${tbl(["", "Mon", "Tue", "Wed", "Thu", "Fri"], [["Lowest (°C)", 12, 8, 15, 5, 11], ["Highest (°C)", 21, 20, 24, 14, 22]])}<p>On which day was the <b>difference</b> between the lowest and highest temperature the <b>greatest</b>?</p>`,
      options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], answer: 1,
      explain: `<p>Find each difference: Mon 21 − 12 = 9. Tue 20 − 8 = <b>12</b>. Wed 24 − 15 = 9. Thu 14 − 5 = 9. Fri 22 − 11 = 11. Tuesday has the biggest.</p><p class="why-not">Wednesday has the highest temperature, and Thursday the lowest, but neither has the biggest gap. Friday is close, at 11.</p>` },

    { id: "w213", tier: 2, cat: "Graphs & data",
      stem: `<p>Every child in a class chose their favourite colour. The tally chart shows the results.</p>${TALLY}<p>How many children are in the class?</p>`,
      options: ["36", "40", "44", "48", "50"], answer: 4,
      explain: `<p>Each bundle (four strokes with one across) is <b>5</b>. Red 5 + 5 + 3 = 13. Blue 5 + 5 + 5 + 2 = 17. Green 5 + 4 = 9. Yellow 5 + 5 + 1 = 11. Total 13 + 17 + 9 + 11 = <b>50</b>.</p><p class="why-not">40 counts only the 8 bundles and forgets the single strokes. 36 counts each bundle as 4 (missing the stroke across). 44 and 48 are slips in adding.</p>` },
    /* ===================== circle 3 ===================== */
    { id: "w301", tier: 3, cat: "Fractions",
      stem: `<p>${frac(3, 5)} of a number is <b>24</b>.</p><p>What is ${frac(3, 4)} of the same number?</p>`,
      options: ["18", "20", "30", "32", "40"], answer: 2,
      explain: `<p>${frac(3, 5)} is 24, so ${frac(1, 5)} is 24 ÷ 3 = 8, and the whole number is 5 × 8 = 40.</p><p>Then ${frac(1, 4)} of 40 is 10, and ${frac(3, 4)} is 3 × 10 = <b>30</b>.</p><p class="why-not">40 is the whole number, one step short. 18 takes ${frac(3, 4)} of 24 instead of the whole number. 32 is ${frac(4, 5)} of 40.</p>` },
    { id: "w302", tier: 3, cat: "Rates",
      stem: `<p>Ava reads <b>12 pages every 10 minutes</b>. Ben reads <b>9 pages every 6 minutes</b>.</p><p>In <b>one hour</b>, how many more pages does Ben read than Ava?</p>`,
      options: ["3", "9", "12", "18", "90"], answer: 3,
      explain: `<p>One hour is 60 minutes. Ava: 60 ÷ 10 = 6 lots of 12 = 72 pages. Ben: 60 ÷ 6 = 10 lots of 9 = 90 pages. Ben reads 90 − 72 = <b>18</b> more.</p><p class="why-not">3 compares the 12 and 9 pages, ignoring the different times. That even makes Ava look faster! 90 is how many Ben reads, not the difference.</p>` },
    { id: "w303", tier: 3, cat: "Chance & counting",
      stem: `<p>Two spinners are each numbered <b>1, 2 and 3</b>, with equal sections. Both are spun and the two numbers are <b>added</b>.</p><p>Which total is the <b>most likely</b>?</p>`,
      options: ["2", "3", "4", "5", "6"], answer: 2,
      explain: `<p>List all 9 ways (first spinner + second):</p><p>1+1 = 2; 1+2, 2+1 = 3; 1+3, 2+2, 3+1 = 4; 2+3, 3+2 = 5; 3+3 = 6.</p><p>Total <b>4</b> can be made in 3 ways, more than any other.</p><p class="why-not">6 is the biggest total but can only be made one way (3 + 3). 3 and 5 can each be made 2 ways. 2 is as unlikely as 6.</p>` },
    { id: "w304", tier: 3, cat: "Area, perimeter & 3D",
      stem: `<p>A rectangle is 8 cm long and 5 cm wide. Its length is made <b>3 cm longer</b> and its width is made <b>3 cm shorter</b>.</p><p>What happens to its perimeter and its area?</p>`,
      options: ["Both stay the same", "Perimeter stays the same; area gets smaller", "Perimeter stays the same; area gets bigger", "Perimeter gets bigger; area stays the same", "The perimeter and the area both get smaller"], answer: 1,
      explain: `<p>Before: perimeter 8 + 5 + 8 + 5 = 26 cm, area 8 × 5 = 40 cm².</p><p>After: 11 cm by 2 cm. Perimeter 11 + 2 + 11 + 2 = 26 cm (the same), area 11 × 2 = 22 cm² (<b>smaller</b>).</p><p class="why-not">Adding 3 and taking 3 cancels out for the perimeter, but not for the area. A long thin rectangle covers less space than a squarer one with the same perimeter.</p>` },
    { id: "w305", tier: 3, cat: "Patterns & sequences",
      stem: `<p>This pattern keeps repeating:</p><div class="box" style="font-size:26px;letter-spacing:6px;text-align:center"><span style="color:#f08c00">★</span><span style="color:#1c7ed6">●●</span><span style="color:#2f9e44">▲</span> <span style="color:#f08c00">★</span><span style="color:#1c7ed6">●●</span><span style="color:#2f9e44">▲</span> <span style="color:#f08c00">★</span><span style="color:#1c7ed6">●●</span><span style="color:#2f9e44">▲</span> …</div><p>How many <span style="color:#1c7ed6">●</span> are there in the first <b>50</b> shapes?</p>`,
      options: ["12", "13", "24", "25", "26"], answer: 3,
      explain: `<p>The repeating block ★●●▲ has 4 shapes, with 2 circles. 50 ÷ 4 = 12 blocks (48 shapes) with 2 left over.</p><p>12 blocks have 12 × 2 = 24 circles. The 2 extra shapes are ★ and ●: one more circle. Total <b>25</b>.</p><p class="why-not">24 forgets the 2 shapes left over. 26 counts both leftovers as circles, but the block starts with a star. 12 and 13 count the blocks, not the circles.</p>` },
    { id: "w306", tier: 3, cat: "Number & place value",
      stem: `<p>I am a two-digit number. My digits add up to <b>11</b>. If you swap my digits, the new number is <b>27 more</b> than me.</p><p>What number am I?</p>`,
      options: ["29", "38", "47", "56", "74"], answer: 2,
      explain: `<p>The swapped number is bigger, so my ones digit is bigger than my tens digit. Try the numbers whose digits add to 11: 29 → 92 (63 more). 38 → 83 (45 more). <b>47 → 74</b> (27 more). ✓</p><p class="why-not">74 is the swapped number, not me (swapping 74 gives 47, which is smaller). 56 → 65 is only 9 more, and 38 and 29 give too big a jump.</p>` },
    { id: "w307", tier: 3, cat: "Fractions",
      stem: `<p>Which fraction is <b>closest</b> to one half?</p>`,
      options: [frac(1, 5), frac(2, 5), frac(5, 8), frac(7, 10), frac(3, 4)], answer: 1,
      explain: `<p>Compare each with a half of the same size pieces:</p><p>${frac(2, 5)}: a half is ${frac(2.5, 5)}, so it is half a fifth away = ${frac(1, 10)}. ${frac(5, 8)}: a half is ${frac(4, 8)}, so it is ${frac(1, 8)} away. ${frac(7, 10)} is ${frac(2, 10)} away, ${frac(3, 4)} is ${frac(1, 4)} away, ${frac(1, 5)} is ${frac(3, 10)} away.</p><p>${frac(1, 10)} is the smallest gap, so <b>${frac(2, 5)}</b> is closest.</p><p class="why-not">${frac(5, 8)} is very close too: just 1 eighth over. But an eighth is bigger than a tenth.</p>` },
    { id: "w308", tier: 3, cat: "Graphs & data",
      stem: `<p>Four classes collected cans for recycling.</p>${colGraph({ labels: ["4A", "4B", "4C", "4D"], series: [{ name: "", color: "#4dabf7", values: [70, 110, 90, 45] }], max: 120, step: 10, ylabel: "Cans", numbers: false, aria: "A column graph of cans collected by four classes. The scale has a line every 10 cans, but only 0, 40, 80 and 120 are labelled. 4A: 70. 4B: 110. 4C: 90. 4D: 45, halfway between two lines." }).replace("</svg>", [0, 40, 80, 120].map(v => T(42, 205 - v * 170 / 120 + 5, v, 'text-anchor="end"')).join("") + "</svg>")}<p>The scale has a line for every <b>10</b> cans. How many <b>more</b> cans did 4B collect than 4D?</p>`,
      options: ["55", "60", "65", "70", "75"], answer: 2,
      explain: `<p>4B reaches 110. 4D is halfway between 40 and 50, so 45. The difference is 110 − 45 = <b>65</b>.</p><p class="why-not">60 and 70 read 4D as 50 or 40. 55 and 75 read 4B one line out.</p>` },

    { id: "w309", tier: 3, cat: "Time & timetables",
      stem: `<p>Films at the cinema on Saturday:</p>${tbl(["Film", "Starts", "Length"], [["Dino Dash", "1:45 pm", "1 h 50 min"], ["Space Pups", "2:15 pm", "2 h 5 min"], ["Robo Race", "2:40 pm", "2 h 25 min"], ["Ocean Song", "3:15 pm", "1 h 50 min"]])}<p>Mia gets to the cinema at <b>2:00 pm</b> and must leave by <b>5:00 pm</b>. Which film can she see from start to finish?</p>`,
      options: ["Dino Dash", "Space Pups", "Robo Race", "Ocean Song", "None of them"], answer: 1,
      explain: `<p>Work out when each one ends. Dino Dash starts at 1:45 pm, before Mia arrives. Space Pups: 2:15 pm + 2 h 5 min = <b>4:20 pm</b>, in time. Robo Race: 2:40 pm + 2 h 25 min = 5:05 pm, too late. Ocean Song: 3:15 pm + 1 h 50 min = 5:05 pm, too late.</p><p>So the answer is <b>Space Pups</b>.</p><p class="why-not">Ocean Song is the shortest film she could get to, but it starts late, so it finishes after 5:00. Robo Race also ends 5 minutes too late. Dino Dash would be over by 3:35, but it starts before she gets there.</p>` },
    /* ===================== boss ===================== */
    { id: "w401", tier: 4, cat: "Area, perimeter & 3D",
      stem: `<p>The faces of a closed box have these areas: <b>12 cm²</b>, <b>15 cm²</b> and <b>20 cm²</b>. Every length is a whole number of centimetres.</p>${BOX}<p>What is the <b>volume</b> of the box?</p>`,
      options: ["47 cm³", "60 cm³", "94 cm³", "120 cm³", "3 600 cm³"], answer: 1,
      explain: `<p>Find three edges that make all three areas: 12 = 3 × 4, 15 = 3 × 5, 20 = 4 × 5. So the edges are 3 cm, 4 cm and 5 cm, and the volume is 3 × 4 × 5 = <b>60 cm³</b>.</p><p class="why-not">47 adds the areas, and 94 is the whole surface area (each face appears twice). 3 600 multiplies the three areas. 120 doubles the volume.</p>` },
    { id: "w402", tier: 4, cat: "Fractions",
      stem: `<p>What number is exactly <b>halfway</b> between ${frac(1, 4)} and ${frac(1, 2)}?</p>`,
      options: [frac(1, 8), frac(1, 3), frac(3, 8), frac(3, 6), frac(3, 4)], answer: 2,
      explain: `<p>Use eighths: ${frac(1, 4)} = ${frac(2, 8)} and ${frac(1, 2)} = ${frac(4, 8)}. Halfway between 2 eighths and 4 eighths is <b>${frac(3, 8)}</b>.</p><p class="why-not">${frac(1, 3)} comes from “between 4 and 2 is 3”, using the bottom numbers. ${frac(1, 8)} is half the <i>gap</i> (${frac(1, 4)} ÷ 2), not the point halfway along. ${frac(3, 4)} adds the two fractions. ${frac(3, 6)} is a half.</p>` },
    { id: "w403", tier: 4, cat: "Rates",
      stem: `<p><b>4 painters</b> take <b>4 hours</b> to paint <b>4 fences</b>. All the painters work at the same speed, and all the fences are the same.</p><p>How long would <b>8 painters</b> take to paint <b>8 fences</b>?</p>`,
      options: ["30 minutes", "1 hour", "2 hours", "4 hours", "8 hours"], answer: 3,
      explain: `<p>4 painters paint 4 fences in 4 hours, so each painter paints <b>one fence in 4 hours</b>. With 8 painters each doing one of the 8 fences, the job still takes <b>4 hours</b>.</p><p class="why-not">8 hours doubles the time because the fences doubled, forgetting the painters doubled too. 2 hours halves it for the painters but forgets the extra fences. 30 minutes and 1 hour shrink the time, as if more fences made the job quicker.</p>` },
    { id: "w404", tier: 4, cat: "Rates",
      stem: `<p>A train travels <b>20 km every 15 minutes</b>. It leaves at <b>9:40 am</b> for a town <b>140 km</b> away.</p><p>When does it arrive?</p>`,
      options: ["9:55 am", "10:45 am", "11:05 am", "11:25 am", "4:40 pm"], answer: 3,
      explain: `<p>140 km is 7 lots of 20 km, so the trip takes 7 × 15 = 105 minutes = <b>1 hour 45 minutes</b>.</p><p>9:40 am + 1 hour = 10:40 am. Then 45 more minutes: 10:40 → 11:00 is 20, and 25 more makes <b>11:25 am</b>.</p><p class="why-not">10:45 am reads 105 minutes as 1 hour 5 minutes. 4:40 pm thinks each 20 km takes an hour. 9:55 am adds just one 15-minute step, and 11:05 am adds 1 hour 25 minutes.</p>` },
  );
})();
