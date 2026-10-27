/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 63
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `On the last day of our holiday, Dad finally agreed to climb the lighthouse with me. From the caravan park it had looked as small and white as a sugar cube, perched on the end of the headland, but up close it was enormous. Inside, the stairs wound round and round, and I counted them out loud until my little sister begged me to stop. By the top, my legs were trembling. Then the guide opened a narrow door onto the balcony, and the wind almost shoved me back inside. Far below, the people on the beach looked as small as ants, and the waves were just a white thread stitched along the sand. Suddenly Dad grabbed my arm and pointed out to sea: a whale’s spout, then another, then a dark tail lifting out of the water. I forgot all about my legs. On the way down, I didn’t count the stairs once.`,
  `Cape Byron Lighthouse stands high on the cliffs at Cape Byron in northern New South Wales, the most easterly point of the Australian mainland. It was first lit in December 1901, and its light is the most powerful of any lighthouse in Australia. At the top of the tower sits a huge lens, made in France from hundreds of pieces of glass, which gathers the light into strong beams that sweep across the sea. For almost ninety years, keepers lived beside the tower with their families. Every night, one of them had to stay awake to check that the light kept turning and never went out, whatever the weather. In 1989 the light was made automatic, and the last keepers left. Today it still shines every night, but nobody has to climb the stairs to look after it, and the keepers’ cottages are rented to holiday-makers. Each winter and spring, visitors gather near the lighthouse to watch humpback whales swimming past the cape.`,
  `By midnight the storm was screaming round the tower, and rain struck the lantern-room windows in handfuls. Tom Hale climbed the stairs for the fourth time that night. He topped up the oil, wiped a smear from the glass and watched the beam swing out over the black water. Then he saw it. Far beyond the reef, a single yellow light rose and sank, rose and sank, flickering like a match that someone was trying to keep alight in the wind. A ship, and she was much too close to the rocks. There was nothing Tom could do but keep the beam turning. He stood with both hands pressed flat against the cold window, as if he could push the ship away himself. For a long time the little light seemed to stay exactly where it was. Then, slowly, it began to slide south, away from the reef, until the darkness hid it. Tom let out a breath he hadn’t known he was holding. Then he went downstairs and wrote in the logbook: <i>Gale from the east. Light burning all night.</i>`,
  `Today almost every ship carries GPS, which shows the captain exactly where the ship is, day and night. So some people say that our old lighthouses have had their day and should no longer be looked after. I could not disagree more. Machines break down. A ship whose power fails in a storm, or whose screen suddenly goes blank, still has the oldest guide of all: a light on a headland, shining where it has shone for a hundred years. And even if no captain ever needed one again, our lighthouses would still be worth keeping. They were built by hand on wild, lonely cliffs, long before there were roads to carry the stone, and they tell the story of how this coast was settled. Pulling them down would be like tearing the first pages out of a history book. Let’s keep them standing, and keep their lights burning.`
];
const PASSAGE = {
  title: "Lighthouses",
  note: "Read the four extracts below about lighthouses.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q2: quiz scores table ---- */
const QC = v => `<td style="text-align:center">${v}</td>`;
const QUIZ_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th rowspan="2"></th><th colspan="3" style="text-align:center">Round</th><th rowspan="2" style="text-align:center">Total</th></tr>
  <tr><th style="text-align:center">1</th><th style="text-align:center">2</th><th style="text-align:center">3</th></tr>
  <tr><th>Owls</th>${QC(8)}${QC(5)}${QC(7)}${QC(20)}</tr>
  <tr><th>Foxes</th>${QC(6)}${QC("?")}${QC("?")}${QC(22)}</tr>
  <tr><th>Bats</th>${QC(7)}${QC(7)}${QC("?")}${QC(18)}</tr>
  <tr><th>Wolves</th>${QC(9)}${QC(8)}${QC(6)}${QC(23)}</tr>
  <tr><th>Total</th>${QC(30)}${QC("?")}${QC(26)}${QC("?")}</tr>
</table></div>`;

/* ---- Thinking Skills Q3: the same cube in three positions ----
   Faces (checked by computer, all three views come from one real cube):
   heart opposite square, star opposite cross, triangle opposite circle.
   Each view lists the symbol on the top, front and right faces and the
   direction (x right, y back, z up) that the top of that symbol points. */
const SYMBOLS = (() => {
  const circle = [...Array(28)].map((_, i) => [0.72 * Math.cos(i * Math.PI / 14), 0.72 * Math.sin(i * Math.PI / 14)]);
  const star = [...Array(10)].map((_, i) => { const r = i % 2 ? 0.36 : 0.86, a = Math.PI / 2 + i * Math.PI / 5; return [r * Math.cos(a), r * Math.sin(a) - 0.06]; });
  const heart = [...Array(40)].map((_, i) => { const t = i * 2 * Math.PI / 40; return [16 * Math.sin(t) ** 3 / 19, (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 19 + 0.12]; });
  const w = 0.24, L = 0.8;
  const cross = [[-w, L], [w, L], [w, w], [L, w], [L, -w], [w, -w], [w, -L], [-w, -L], [-w, -w], [-L, -w], [-L, w], [-w, w]];
  return { circle, star, heart, cross, triangle: [[0, 0.8], [0.78, -0.62], [-0.78, -0.62]], square: [[-0.64, -0.64], [0.64, -0.64], [0.64, 0.64], [-0.64, 0.64]] };
})();
const CUBE_VIEWS = [
  { top: ["star", [0, 1, 0]], front: ["heart", [0, 0, 1]], right: ["triangle", [0, 0, 1]] },
  { top: ["star", [-1, 0, 0]], front: ["circle", [0, 0, 1]], right: ["heart", [0, 0, 1]] },
  { top: ["heart", [-1, 0, 0]], front: ["circle", [-1, 0, 0]], right: ["cross", [0, 0, 1]] }
];
const cubeSvg = (view, k) => {
  const s = 84, d = s * 0.62, ox = 8, base = s + d + 10;
  const P = ([x, y, z]) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill, sw = 1.8) => `<polygon points="${pts.map(p => P(p).map(v => v.toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const FACES = {
    top: { n: [0, 0, 1], quad: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], fill: "#fdf0dc" },
    front: { n: [0, -1, 0], quad: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1]], fill: "#f6d3a8" },
    right: { n: [1, 0, 0], quad: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], fill: "#e3a965" }
  };
  let g = "";
  for (const f of ["front", "right", "top"]) {
    const F = FACES[f], [sym, up] = view[f];
    g += poly(F.quad, F.fill, 2.2);
    const r = cross3(up, F.n), c = F.n.map(v => 0.5 + 0.5 * v);
    const pts = SYMBOLS[sym].map(([a, b]) => c.map((cv, i) => cv + 0.36 * (a * r[i] + b * up[i])));
    g += poly(pts, INK, 0.6);
  }
  const W = ox + s + d + 10, H = base + 8;
  const say = f => `${view[f][0]} on the ${f}`;
  return `<figure style="margin:0;text-align:center"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="View ${k + 1}: the cube shows the ${say("top")}, the ${say("front")} and the ${say("right")} face.">${g}</svg><figcaption style="font-size:14px">View ${k + 1}</figcaption></figure>`;
};
const CUBES_ROW = `<div style="display:flex;flex-wrap:wrap;gap:12px 22px;justify-content:center;align-items:flex-end">${CUBE_VIEWS.map(cubeSvg).join("")}</div>`;

/* ---- Maths Q1: thermometer ---- */
const THERMO_SVG = (() => {
  const x = 70, top = 40, per = 6, max = 40, bottom = top + max * per, level = 26;
  const Y = v => bottom - v * per;
  let g = `<rect x="${x - 9}" y="${top - 12}" width="18" height="${bottom - top + 14}" rx="9" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  g += `<rect x="${x - 4}" y="${Y(level)}" width="8" height="${bottom - Y(level) + 6}" fill="#d64541"/>`;
  g += `<circle cx="${x}" cy="${bottom + 18}" r="15" fill="#d64541" stroke="${INK}" stroke-width="2"/>`;
  g += `<rect x="${x - 3.5}" y="${bottom - 6}" width="7" height="14" fill="#d64541"/>`;
  for (let v = 0; v <= max; v += 2) {
    const big = v % 10 === 0;
    g += `<line x1="${x + 10}" y1="${Y(v)}" x2="${x + (big ? 32 : 22)}" y2="${Y(v)}" stroke="${INK}" stroke-width="${big ? 2 : 1.3}"/>`;
    if (big) g += `<text x="${x + 38}" y="${Y(v) + 5}" font-size="15" fill="${INK}">${v}</text>`;
  }
  g += `<text x="${x + 14}" y="${top - 18}" font-size="14" fill="${INK}">°C</text>`;
  return `<svg viewBox="0 0 150 ${bottom + 40}" width="150" height="${bottom + 40}" role="img" aria-label="A thermometer marked in degrees Celsius. Only 0, 10, 20, 30 and 40 are labelled. Between each pair of labels there are 4 small unlabelled marks, making 5 equal steps. The red liquid reaches the third small mark above 20.">${g}</svg>`;
})();

/* ---- Maths Q2: four identical rectangles round a square hole (supplied by David; redrawn, not to scale) ---- */
const PINWHEEL_SVG = (() => {
  const o = 34, S = 220, L = 152, w = S - L; // drawn proportions only: not to scale
  const R = (x, y, ww, hh, fill) => `<rect x="${o + x}" y="${o + y}" width="${ww}" height="${hh}" fill="${fill}" stroke="${INK}" stroke-width="2"/>`;
  let g = R(0, 0, L, w, "#cfe3f5") + R(L, 0, w, L, "#f6d3a8") + R(w, L, L, w, "#cfe3f5") + R(0, w, w, L, "#f6d3a8");
  g += `<rect x="${o + w}" y="${o + w}" width="${L - w}" height="${L - w}" fill="#fff" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4 3"/>`;
  g += `<rect x="${o}" y="${o}" width="${S}" height="${S}" fill="none" stroke="${INK}" stroke-width="3"/>`;
  g += `<line x1="${o}" y1="${o - 14}" x2="${o + S}" y2="${o - 14}" stroke="${INK}" stroke-width="1.3"/>
        <line x1="${o}" y1="${o - 20}" x2="${o}" y2="${o - 8}" stroke="${INK}" stroke-width="1.3"/>
        <line x1="${o + S}" y1="${o - 20}" x2="${o + S}" y2="${o - 8}" stroke="${INK}" stroke-width="1.3"/>
        <rect x="${o + S / 2 - 26}" y="${o - 24}" width="52" height="18" fill="#fff"/>
        <text x="${o + S / 2}" y="${o - 9}" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">19 cm</text>
        <text x="${o + S / 2}" y="${o + S + 26}" font-size="13" text-anchor="middle" fill="#55607a">not to scale</text>`;
  return `<svg viewBox="0 0 ${S + 2 * o} ${S + o + 34}" width="${S + 2 * o}" height="${S + o + 34}" role="img" aria-label="A large square with its side marked 19 centimetres. Inside it, four identical long, thin rectangles go round the edge like a pinwheel: one along the top, one down the right side, one along the bottom and one up the left side. Each rectangle's end butts against the side of the next one. They leave a small square hole in the middle. The rectangles' lengths and widths are not marked. The picture is not to scale.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about lighthouses, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "Which extract’s main point is that something can still be valuable even though a newer invention now does most of its job?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 3,
        skill: "identifying the main idea of a text",
        explain: `<p>Extract D begins with the newer invention: GPS “shows the captain exactly where the ship is”, which used to be the lighthouse’s job. The whole extract then argues that lighthouses still matter: GPS can fail (“Machines break down”), and even if no ship ever needed them, they would be worth keeping for their history (“like tearing the first pages out of a history book”). That argument is the main point of the extract.</p>
                  <p class="why-not">Extract B is the trap: something new did take over a job there, because the light “was made automatic” in 1989. But the job it took over was the <em>keepers’</em> job, and B doesn’t argue that the keepers are still valuable: it simply reports the lighthouse’s history and what it is like today. Extract A is about a family climbing a lighthouse and spotting whales; nothing has replaced anything. Extract C is about a keeper doing his job in a storm, before any newer invention appears.</p>`
      },
      {
        stem: "In which extract does the writer describe something a person once had to do every night, so that readers can see how much has changed?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 1,
        skill: "understanding why a writer includes a detail",
        explain: `<p>Extract B explains that for almost ninety years “Every night, one of them had to stay awake to check that the light kept turning and never went out, whatever the weather.” Straight after this, the writer tells us that in 1989 the light became automatic and that today “nobody has to climb the stairs to look after it”. The detail about the keepers’ nightly job is there to make the change stand out: a hard job that someone once did every night is now done by no one at all.</p>
                  <p class="why-not">Extract C is the trap: Tom Hale really does do a keeper’s night-time job, climbing the stairs, topping up the oil and keeping the beam turning. But C is a story set in the keeper’s own time, and it never compares that time with today, so it doesn’t show any change. Extract D does talk about a change (ships now carry GPS), but it never describes a job anyone had to do every night. In Extract A the stairs are climbed once, on holiday, not every night.</p>`
      },
      {
        stem: "In which extract does the writer use a comparison to suggest that something seen far away was in danger?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 2,
        skill: "working out what a comparison suggests",
        explain: `<p>In Extract C, Tom sees a ship’s light “Far beyond the reef”, and it is “flickering like a match that someone was trying to keep alight in the wind”. A match flame in the wind is tiny and could go out at any moment. The comparison makes the far-off ship seem small, weak and close to being lost, and the next sentence confirms it: “she was much too close to the rocks.”</p>
                  <p class="why-not">Extract A is the trap: it also has comparisons for things seen far away. From the caravan park the lighthouse looks “as small and white as a sugar cube”, and from the top the people on the beach look “as small as ants”. But these comparisons only show how small things look from a distance or a height: nobody in A is in any danger. Extract D has a comparison (“like tearing the first pages out of a history book”), but it is about pulling down lighthouses, not about something seen far away. Extract B gives facts and uses no comparison of this kind.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Ms Nguyen:</em> “Our school should plant shady trees around the playground, so that more students play outside at lunchtime in summer.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Ms Nguyen’s claim?</p>`,
        options: ["Many students who stay indoors at lunchtime in summer say the playground is too hot.",
                  "Trees give homes to birds and help to keep the air around a school cleaner and cooler.",
                  "Students who play outside at lunchtime often concentrate better in class in the afternoon.",
                  "Most parents at the school say they would like their children to spend more time outdoors."],
        answer: 0,
        skill: "choosing the statement that supports a claim (the reason must link the change to the result)",
        explain: `<p>The claim has two parts: <b>plant shady trees</b> → <b>more students play outside in summer</b>. To support it, a statement must show that a lack of shade is what keeps students indoors. A does: many students who stay in say the playground is too hot. Shade from trees would deal with exactly that problem, so more of them would be likely to go out.</p>
                  <p class="why-not">B is the trap: it is about the trees, and it even says they keep the air cooler, but it is about birds and the air <em>around the school</em>; it says nothing about whether students would choose to play outside. C is about students playing outside, but it gives a reason why that is <em>good</em>, not a reason why trees would make it happen. D shows that parents want more outdoor time, but not that shade would make the students go out.</p>`
      },
      {
        stem: `Four teams played a quiz with three rounds. Some of the scores in the table are missing.
               ${QUIZ_TABLE}
               <p style="margin:10px 0 0">How many points did the Foxes score in <b>Round 2</b>?</p>`,
        options: ["3", "4", "7", "9"],
        answer: 2,
        skill: "finding missing values in a table from row and column totals",
        explain: `<p>The Foxes’ row has two missing scores, so first find one of them. Round 3 has a total, but the Bats’ Round 3 score is missing too, so start with the Bats.</p>
                  <p><b>Step 1: Bats, Round 3.</b> The Bats scored 18 altogether: 18 − 7 − 7 = <b>4</b>.</p>
                  <p><b>Step 2: Foxes, Round 3.</b> Round 3’s total is 26: 26 − 7 − 4 − 6 = <b>9</b>.</p>
                  <p><b>Step 3: Foxes, Round 2.</b> The Foxes scored 22 altogether: 22 − 6 − 9 = <b>7</b>.</p>
                  <p>Check: Round 2’s total is 5 + 7 + 7 + 8 = 27, and 30 + 27 + 26 = 83 = 20 + 22 + 18 + 23 ✓.</p>
                  <p class="why-not">3 (A) is the trap: it skips Step 1 and treats the Bats’ missing score as 0, so the Foxes’ Round 3 looks like 26 − 7 − 6 = 13, leaving 22 − 6 − 13 = 3. 9 (D) is the Foxes’ score in Round 3, not Round 2. 4 (B) is the Bats’ Round 3 score: the first missing number found, not the one asked for.</p>`
      },
      {
        stem: `Here is the same cube shown in three different positions. Each of its six faces has a different symbol.
               <div class="figure">${CUBES_ROW}</div>
               <p style="margin:10px 0 0">Which symbol is on the face <b>opposite</b> the heart?</p>`,
        options: ["the circle", "the square", "the cross", "the triangle"],
        answer: 1,
        skill: "working out opposite faces of a cube from several views",
        explain: `<p>Faces that you can see together in one view are next to each other, so they can’t be opposite. The heart is in all three views, so collect every symbol that appears beside it.</p>
                  <p><b>View 1:</b> star and triangle. <b>View 2:</b> star and circle. <b>View 3:</b> circle and cross.</p>
                  <p>So the star, triangle, circle and cross are all next to the heart. A cube face has only four neighbours, and the one face left over is opposite. The only symbol never seen with the heart is the <b>square</b>, so the square is opposite the heart.</p>
                  <p class="why-not">The cross (C) is the trap: using only views 1 and 2, both the cross and the square are still possible, and view 3 is needed to show that the cross is next to the heart. The triangle (D) comes from using only views 2 and 3, where the triangle never appears; view 1 shows it beside the heart. The circle (A) comes from looking at view 1 only.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `In the morning the temperature was 17 °C. This thermometer shows the temperature in the afternoon.
               <div class="figure">${THERMO_SVG}</div>
               <p style="margin:10px 0 0">How many degrees warmer was it in the afternoon than in the morning?</p>`,
        options: ["6", "9", "11", "26", "43"],
        answer: 1,
        skill: "reading a scale with unlabelled marks, then finding a difference",
        explain: `<p>From 20 to 30 there are 5 equal steps (4 small marks in between), so each step is 10 ÷ 5 = <b>2 degrees</b>.</p>
                  <p>The liquid reaches the 3rd small mark above 20: 20 + 3 × 2 = <b>26 °C</b>. Then 26 − 17 = <b>9</b> degrees warmer.</p>
                  <p class="why-not">6 (A) is the trap: it counts each small mark as 1 degree, so the reading looks like 23 and 23 − 17 = 6. 11 (C) counts the line at 20 as the first mark, reading 28 instead of 26. 26 (D) is the afternoon temperature, not how much warmer it was. 43 (E) adds the two temperatures instead of finding the difference.</p>`
      },
      {
        stem: `Four identical rectangles are fitted together to make this square, leaving a small square hole in the middle. The side of the big square is 19 cm.
               <div class="figure">${PINWHEEL_SVG}</div>
               <p style="margin:10px 0 0">What is the perimeter of one of the rectangles?</p>`,
        options: ["76 cm", "19 cm", "361 cm", "57 cm", "38 cm"],
        answer: 4,
        skill: "perimeter: seeing that a length plus a width makes the side of the square (competition-style, supplied by David)",
        explain: `<p>You don’t need to know how long or how wide the rectangles are. Look along the top of the big square: it is made of the top rectangle’s <b>long side</b> and then the <b>short end</b> of the right-hand rectangle. So</p>
                  <p style="text-align:center"><b>one length + one width = 19 cm</b>.</p>
                  <p>A rectangle’s perimeter is length + width + length + width = 2 × (length + width) = 2 × 19 = <b>38 cm</b>.</p>
                  <p>(Any sizes work: rectangles 15 cm by 4 cm, or 12 cm by 7 cm, both have a perimeter of 38 cm.)</p>
                  <p class="why-not">19 cm (B) is the trap: it finds that length + width = 19 but forgets that a rectangle has two lengths and two widths. 76 cm (A) is the perimeter of the whole big square (4 × 19), not of one rectangle. 57 cm (D) adds only three of the big square’s sides (3 × 19). 361 cm (C) is 19 × 19, the area of the big square, not a perimeter.</p>`
      },
      {
        stem: `The school canteen sells a meal deal. You choose <b>one</b> main, <b>one</b> drink and <b>one</b> dessert.
               <div class="table-wrap"><table class="grid">
                 <tr><th>Mains</th><td>burger, wrap, pasta, sushi</td></tr>
                 <tr><th>Drinks</th><td>water, juice, milk, slushie</td></tr>
                 <tr><th>Desserts</th><td>ice cream, fruit cup</td></tr>
               </table></div>
               <p style="margin:10px 0 0">There are two rules:</p>
               <ul><li>you can’t choose the <b>slushie</b> and the <b>ice cream</b> in the same meal deal;</li>
               <li>you can’t choose the <b>wrap</b> and the <b>ice cream</b> in the same meal deal.</li></ul>
               <p style="margin:6px 0 0">How many different meal deals can you choose?</p>`,
        options: ["16", "24", "25", "28", "32"],
        answer: 2,
        skill: "counting combinations of three choices with two pairings not allowed (one deal breaks both rules)",
        explain: `<p><b>Step 1: without the rule.</b> Each of the 4 mains can go with each of the 4 drinks and each of the 2 desserts: 4 × 4 × 2 = <b>32</b> meal deals.</p>
                  <p><b>Step 2: deals that break the first rule.</b> A slushie with an ice cream can still have any of the 4 mains: <b>4</b> deals.</p>
                  <p><b>Step 3: deals that break the second rule.</b> A wrap with an ice cream can still have any of the 4 drinks: <b>4</b> deals.</p>
                  <p><b>Step 4: don’t count a deal twice.</b> Wrap + slushie + ice cream breaks <em>both</em> rules, so it is in both lists. The deals that break a rule are 4 + 4 − 1 = <b>7</b>, not 8.</p>
                  <p>32 − 7 = <b>25</b>.</p>
                  <p>(Check another way: every fruit-cup deal is fine: 4 × 4 = 16. Ice-cream deals can’t have the wrap or the slushie: 3 mains × 3 drinks = 9. And 16 + 9 = 25 ✓.)</p>
                  <p class="why-not">24 (B) is the trap: it takes away 4 + 4 = 8, counting the wrap + slushie + ice cream deal twice. 28 (D) uses only the first rule. 32 (E) ignores both rules. 16 (A) counts only the fruit-cup deals, forgetting that ice cream is still allowed with the other mains and drinks.</p>`
      }
    ]
  }
];
