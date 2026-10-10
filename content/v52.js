/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 52
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>Sourdough bread doesn’t use yeast from a packet. Instead, it rises thanks to a “starter”: a jar of flour and water in which wild yeasts live. Before I could bake anything, I had to grow one. Dad, who had {1} to sharing the kitchen bench with “a jar of grey goo”, asked every single day when it would be gone.</p>
<p>Every morning I tipped half of the starter away and stirred in fresh flour and water. For the first few days it lay {2} in its jar, flat, grey and silent, and I began to fear that I had killed it. Then, on the fifth morning, I found that it had doubled in size overnight. It was full of bubbles and smelt faintly of apples and vinegar. It was alive.</p>
<p>On Saturday I mixed some of the starter with flour, water and salt. Every half an hour I stretched the sticky dough and folded it over on itself, until it felt smooth and springy. Then it spent the night in the fridge, rising slowly in a basket lined with a floured tea towel.</p>
<p>On Sunday morning I baked it in a heavy pot, in the hottest oven I was allowed to use. When it came out, the loaf was tall and golden-brown, and as it cooled, its crust crackled softly, as if it were whispering. The recipe said to wait a whole hour before cutting it. It was the longest hour of my life.</p>
<p>The first slice was chewy and tangy, with a crust that shattered when I bit into it. Even Dad was {3}: he ate one slice without a word, then quietly cut himself another.</p>`;

function clozeHtml() {
  const si = SECTIONS.findIndex(s => s.id === "reading");
  let t = CLOZE_TEXT;
  SECTIONS[si].questions.forEach((q, i) => {
    const chosen = responses[si][i];
    let fill;
    if (passMode === "review") fill = `<span class="gap filled correct">(${i + 1}) ${q.options[q.answer]}</span>`;
    else if (chosen !== null) fill = `<span class="gap filled">(${i + 1}) ${q.options[chosen]}</span>`;
    else fill = `<span class="gap">(${i + 1}) ……</span>`;
    t = t.replace(`{${i + 1}}`, fill);
  });
  return t;
}
const PASSAGE = {
  title: "The Jar on the Bench",
  note: "Read the text below and decide which answer best fits each gap.",
  html: clozeHtml
};

/* ---- Thinking Skills Q2: shapes sorted in a Venn diagram ---- */
const VENN_SHAPES = [
  // [number, points, scale, x, y, right-angle vertices, description]
  [1, [[20, 0], [40, 24], [20, 64], [0, 24]], 0.85, 40, 90, [], "a kite"],
  [4, [[0, 0], [44, 0], [60, 26], [16, 26]], 0.8, 30, 190, [], "a slanting parallelogram (not a rectangle)"],
  [2, [[0, 0], [0, 40], [40, 40]], 0.9, 132, 100, [1], "a right-angled triangle with two equal sides"],
  [3, [[0, 0], [16, 0], [16, 24], [40, 24], [40, 40], [0, 40]], 0.9, 132, 186, [0, 1, 3, 4, 5], "an L shape with arms of equal length"],
  [5, [[0, 0], [26, 0], [44, 32], [0, 32]], 0.8, 222, 110, [0, 3], "a trapezium with two right angles"],
  [6, [[0, 0], [0, 30], [46, 30]], 0.8, 220, 190, [1], "a right-angled triangle with three different sides"],
  [7, [[0, 30], [52, 30], [14, 0]], 0.7, 26, 262, [], "a triangle with three different sides and no right angle"]
];
const VENN_SVG = (() => {
  let g = `<rect x="4" y="4" width="292" height="292" rx="6" fill="#fbfcfe" stroke="${INK}" stroke-width="1.6"/>
    <circle cx="112" cy="170" r="98" fill="#e6f0fa" fill-opacity=".7" stroke="${INK}" stroke-width="1.8"/>
    <circle cx="188" cy="170" r="98" fill="#fbeadf" fill-opacity=".7" stroke="${INK}" stroke-width="1.8"/>
    <circle cx="112" cy="170" r="98" fill="none" stroke="${INK}" stroke-width="1.8"/>
    <text x="84" y="44" font-size="13" text-anchor="middle" fill="${INK}" font-weight="600">has a line of symmetry</text>
    <text x="230" y="44" font-size="13" text-anchor="middle" fill="${INK}" font-weight="600">has a right angle</text>`;
  VENN_SHAPES.forEach(([n, pts, s, x, y, rights]) => {
    const P = pts.map(([a, b]) => [x + a * s, y + b * s]);
    g += `<polygon points="${P.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}" fill="#ffffff" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>`;
    rights.forEach(i => {
      const b = P[i], a = P[(i + P.length - 1) % P.length], c = P[(i + 1) % P.length];
      const unit = (p, q) => { const d = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / d * 6, (q[1] - p[1]) / d * 6]; };
      const u = unit(b, a), v = unit(b, c);
      g += `<polyline points="${[b[0] + u[0], b[1] + u[1]]} ${[b[0] + u[0] + v[0], b[1] + u[1] + v[1]]} ${[b[0] + v[0], b[1] + v[1]]}" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
    });
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    const [lx, ly, la] = n === 7 ? [Math.max(...xs) + 7, (Math.min(...ys) + Math.max(...ys)) / 2 + 5, "start"]
                                 : [(Math.min(...xs) + Math.max(...xs)) / 2, Math.max(...ys) + 17, "middle"];
    g += `<text x="${lx}" y="${ly}" font-size="15" font-weight="700" text-anchor="${la}" fill="#b5462f" stroke="#ffffff" stroke-width="3" paint-order="stroke">${n}</text>`;
  });
  const desc = VENN_SHAPES.map(([n, , , , , , d]) => `shape ${n} is ${d}`).join("; ");
  return `<svg viewBox="0 0 300 300" width="300" height="300" role="img" aria-label="A Venn diagram with two overlapping circles: left circle 'has a line of symmetry', right circle 'has a right angle'. Left circle only: shapes 1 and 4. Overlap: shapes 2 and 3. Right circle only: shapes 5 and 6. Outside both circles: shape 7. Right angles are marked. ${desc}.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: compass ---- */
const COMPASS_SVG = (() => {
  const c = 70;
  let g = `<circle cx="${c}" cy="${c}" r="46" fill="#f4f6fa" stroke="${INK}" stroke-width="1.6"/>`;
  [["N", 0, -60], ["E", 60, 0], ["S", 0, 60], ["W", -60, 0]].forEach(([t, dx, dy]) => {
    g += `<text x="${c + dx}" y="${c + dy + 5}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">${t}</text>`;
  });
  g += `<line x1="${c}" y1="${c - 46}" x2="${c}" y2="${c + 46}" stroke="#c3cad6" stroke-width="1"/><line x1="${c - 46}" y1="${c}" x2="${c + 46}" y2="${c}" stroke="#c3cad6" stroke-width="1"/>`;
  g += `<circle cx="${c}" cy="${c}" r="9" fill="#f2c14e" stroke="${INK}" stroke-width="1.6"/>`;
  g += `<path d="M${c} ${c - 34} L${c - 8} ${c - 18} L${c + 8} ${c - 18} Z" fill="${INK}"/><line x1="${c}" y1="${c - 9}" x2="${c}" y2="${c - 19}" stroke="${INK}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 140 140" width="140" height="140" role="img" aria-label="A compass showing north at the top, east on the right, south at the bottom and west on the left. Kai stands in the middle, with an arrow showing that he is facing north.">${g}</svg>`;
})();

/* ---- Maths Q3: balance scales with fruit ---- */
const FRUIT = {
  apple: (x, y) => `<circle cx="${x}" cy="${y - 10}" r="10" fill="#d0453a" stroke="${INK}" stroke-width="1.5"/><line x1="${x}" y1="${y - 20}" x2="${x + 2}" y2="${y - 25}" stroke="${INK}" stroke-width="1.6"/>`,
  orange: (x, y) => `<circle cx="${x}" cy="${y - 12}" r="12" fill="#f39c33" stroke="${INK}" stroke-width="1.5"/><circle cx="${x}" cy="${y - 20}" r="1.6" fill="${INK}"/>`,
  pineapple: (x, y) => `<ellipse cx="${x}" cy="${y - 17}" rx="12" ry="17" fill="#e2b34a" stroke="${INK}" stroke-width="1.5"/><path d="M${x - 7} ${y - 22} L${x + 7} ${y - 10} M${x + 7} ${y - 22} L${x - 7} ${y - 10}" stroke="#9a6d1c" stroke-width="1.2"/><path d="M${x} ${y - 33} L${x - 8} ${y - 46} L${x - 2} ${y - 36} L${x} ${y - 50} L${x + 2} ${y - 36} L${x + 8} ${y - 46} Z" fill="#3f9a4a" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`
};
function fruitScale(left, right, label) {
  const pan = (items, cx) => items.map((k, n) => FRUIT[k](cx + (n - (items.length - 1) / 2) * 24, 74)).join("");
  const words = items => ["pineapple", "orange", "apple"].map(k => [k, items.filter(x => x === k).length]).filter(e => e[1])
    .map(([k, c]) => `${c} ${k}${c > 1 ? "s" : ""}`).join(" and ");
  const g = `<polygon points="130,82 117,120 143,120" fill="#d9dee7" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
    <line x1="18" y1="82" x2="242" y2="82" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <line x1="10" y1="74" x2="110" y2="74" stroke="${INK}" stroke-width="2.4"/><line x1="150" y1="74" x2="250" y2="74" stroke="${INK}" stroke-width="2.4"/>
    <line x1="60" y1="74" x2="60" y2="82" stroke="${INK}" stroke-width="2"/><line x1="200" y1="74" x2="200" y2="82" stroke="${INK}" stroke-width="2"/>
    ${pan(left, 60)}${pan(right, 200)}`;
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><svg viewBox="0 0 260 124" width="260" height="124" role="img"
    aria-label="${label}: a balanced scale with ${words(left)} on the left and ${words(right)} on the right.">${g}</svg><span style="font-size:14px">${label}</span></div>`;
}
const FRUIT_KEY = `<div style="display:flex;flex-wrap:wrap;gap:6px 22px;justify-content:center;font-size:14px;align-items:center">${["apple", "orange", "pineapple"].map(k =>
  `<span style="display:inline-flex;align-items:center;gap:6px"><svg viewBox="-16 -54 32 56" width="22" height="38" aria-hidden="true">${FRUIT[k](0, 0)}</svg>${k}</span>`).join("")}</div>`;
const FRUIT_SCALES = `<div style="display:flex;flex-wrap:wrap;gap:10px 24px;justify-content:center">${fruitScale(["pineapple"], ["orange", "orange", "apple"], "Scale 1")}${fruitScale(["orange", "apple"], ["apple", "apple", "apple", "apple"], "Scale 2")}</div>${FRUIT_KEY}`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["rejected", "projected", "dejected", "objected"],
        answer: 3,
        skill: "choosing between look-alike words, using the little word that follows (“to”)",
        explain: `<p>Dad didn’t want the jar on the bench: he kept asking “when it would be gone”. To <b>object to</b> something means to say you are against it, and “objected” is the only word here that can be followed by “to sharing”.</p>
                  <p class="why-not">“Rejected” is the trap: its meaning is close (Dad didn’t want the jar), but you reject something, never reject <em>to</em> something, so “had rejected to sharing” doesn’t work. “Dejected” is a describing word meaning sad and low, so “Dad, who had dejected” makes no sense. “Projected” means thrown or shone forward (like a film on a screen), or worked out ahead of time, which has nothing to do with Dad’s complaints.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["extinct", "dormant", "obsolete", "defunct"],
        answer: 1,
        skill: "choosing between words close in meaning, using what happens later in the text",
        explain: `<p><b>Dormant</b> means alive but inactive, as if asleep, and able to wake up later (like a seed in winter or a volcano that hasn’t erupted for years). The starter looked lifeless, but on the fifth morning it had doubled in size: “It was alive.” So it had only been dormant.</p>
                  <p class="why-not">“Extinct” is the trap: the writer feared the starter was dead, but extinct means gone for ever (and is used for whole kinds of animals or plants, or for volcanoes that will never erupt again), and the starter came back to life. “Defunct” also means dead or no longer working, so it is wrong for the same reason. “Obsolete” means out of date and no longer used, like an old machine, which isn’t what the writer means at all.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["unmoved", "subdued", "converted", "unimpressed"],
        answer: 2,
        skill: "choosing a word from what a character’s actions show (inference)",
        explain: `<p>Look at the word “<b>Even</b>”: it tells us that Dad, the person who complained about the starter all week, has now changed his mind like everyone else. His actions prove it: after one slice he “quietly cut himself another”. To be <b>converted</b> is to be won over to something you used to be against.</p>
                  <p class="why-not">“Unimpressed” is the trap: it fits how Dad felt at the start, and he eats “without a word”, but “Even Dad was …” only makes sense if he has changed, and nobody cuts a second slice of bread they don’t like. “Unmoved” means not affected at all, which is wrong for the same reason. “Subdued” means quiet and low in spirits; Dad is quiet, but cutting another slice shows he is enjoying the bread, not feeling down.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">At the start of Term 2, the school library began playing quiet music at lunchtime. During Term 2, about twice as many students went to the library at lunchtime as in Term 1.</p>
               <p class="quote"><em class="speaker">Jess:</em> “The music is what has brought so many more students into the library.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Jess has made?</p>`,
        options: ["The colder weather in Term 2 may have kept more students indoors at lunchtime.",
                  "Some of the students who come to the library may not enjoy the music very much.",
                  "The library may decide to keep on playing quiet music at lunchtime in Term 3 as well.",
                  "Students who read in the library at lunchtime may do better in their weekly spelling tests."],
        answer: 0,
        skill: "spotting a mistake: ignoring another possible cause",
        explain: `<p>Jess sees two things happen at the same time (the music started, and more students came) and decides that one caused the other. But something else changed between Term 1 and Term 2 as well: the weather. Term 2 runs into winter, and colder weather could have kept students indoors and sent more of them to the library, music or no music. A shows the mistake: Jess has ignored another possible cause.</p>
                  <p class="why-not">B is the trap: it sounds like a point against Jess, but even if some students don’t enjoy the music, it could still be what brought the others in, so it doesn’t show the gap in her reasoning. C is about what might happen next term, not about why more students came this term. D is about a benefit of reading in the library, which has nothing to do with whether the music caused the change.</p>`
      },
      {
        stem: `Seven shapes have been sorted into this diagram. Right angles are marked with a small square.
               <div class="figure">${VENN_SVG}</div>
               <p style="margin:10px 0 0">One shape has been put in the wrong place. Which shape is it?</p>`,
        options: ["Shape 2", "Shape 3", "Shape 4", "Shape 5"],
        answer: 2,
        skill: "checking where items belong in a Venn diagram, using two rules",
        explain: `<p>Check each shape against both rules: does it have a line of symmetry (can it be folded so the two halves match)? Does it have a right angle?</p>
                  <p>• Shape 4, the slanting parallelogram, has <b>no</b> line of symmetry. Fold it along any line, across the middle, down the middle or corner to corner, and the halves don’t match. It has no right angles either, so it belongs <b>outside both circles</b>, next to shape 7. It is in the wrong place.</p>
                  <p>• The other shapes are all in the right place. Shape 2 can be folded in half along a slanting line from its right angle. Shape 3, the L, can be folded along a slanting line through its corner, because its two arms are the same length. Shape 5, the trapezium, has right angles but no line of symmetry, because its slanting side doesn’t match its upright side.</p>
                  <p class="why-not">Shape 2 (A) and shape 3 (B) are the traps: their lines of symmetry are slanting, so they are easy to miss, and then they look as if they don’t belong in the left circle. Shape 4 (C) is easy to overlook, because many people think a parallelogram has a line of symmetry like a rectangle does. Shape 5 (D) is chosen by people who think every trapezium has a line of symmetry; only some do, and this one doesn’t.</p>`
      },
      {
        stem: `Kai is standing in a field, facing <b>north</b>.
               <div class="figure">${COMPASS_SVG}</div>
               <p style="margin:10px 0 0">“Turn left” and “turn right” always mean a <b>quarter turn</b>. Which set of instructions would leave Kai facing <b>east</b>?</p>`,
        options: ["Turn right, then turn right again.",
                  "Turn left three times.",
                  "Make a half turn, then turn right.",
                  "Make a three-quarter turn to the right."],
        answer: 1,
        skill: "following a sequence of turns, keeping track of which way left and right point",
        explain: `<p>Follow each set of instructions one turn at a time. Remember that “right” and “left” depend on which way Kai is facing at that moment.</p>
                  <p>• A: north → turn right → east → turn right → <b>south</b> ✗<br>
                     • B: north → turn left → west → turn left → south → turn left → <b>east</b> ✓<br>
                     • C: north → half turn → south. Facing south, Kai’s right hand points west, so turning right → <b>west</b> ✗<br>
                     • D: a three-quarter turn to the right goes north → east → south → <b>west</b> ✗</p>
                  <p>Three quarter turns to the left end in the same place as one quarter turn to the right, so B leaves Kai facing east.</p>
                  <p class="why-not">C is the trap: it treats “right” as always meaning east, as it does on a map. But after the half turn, Kai is facing south, and his right is then west. A catches the same idea: if “right” always meant east, two right turns would still leave Kai facing east, but the second turn takes him on from east to south. D mixes up a three-quarter turn with a quarter turn; one quarter turn to the right would give east, but three of them go on round to west.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Mia buys a book for <b>$8.95</b>, a pencil case for <b>$4.50</b> and a ruler for <b>$1.75</b>. She pays with a <b>$20</b> note.
               <p style="margin:10px 0 0">How much change should she get?</p>`,
        options: ["$4.80", "$5.20", "$5.80", "$6.55", "$15.20"],
        answer: 0,
        skill: "money: adding several prices, then finding change",
        explain: `<p>Add the prices: $8.95 + $4.50 = $13.45, then $13.45 + $1.75 = <b>$15.20</b>.</p>
                  <p>Count on from $15.20 to $20: 80 cents makes $16, then $4 makes $20. Change = <b>$4.80</b>.</p>
                  <p class="why-not">$5.80 (C) is the trap: it works out 20 − 15 = 5 and then 100 − 20 = 80 cents, but forgets that one of the dollars was used to make those cents, so $5.80 is a dollar too much. $5.20 (B) takes away the dollars and just keeps the 20 cents. $6.55 (D) forgets the ruler. $15.20 (E) is what Mia spends, not her change.</p>`
      },
      {
        stem: `A table tennis club has <b>7 players</b>. Each player plays every other player <b>twice</b>.
               <p style="margin:10px 0 0">How many games are played altogether?</p>`,
        options: ["12", "14", "21", "42", "84"],
        answer: 3,
        skill: "counting combinations: every pair plays twice, without double counting",
        explain: `<p>First count the <b>pairs</b> of players. The first player can be paired with 6 others, the second with 5 new ones, then 4, 3, 2, 1:</p>
                  <p>6 + 5 + 4 + 3 + 2 + 1 = <b>21</b> pairs.</p>
                  <p>Each pair plays twice, so there are 21 × 2 = <b>42</b> games.</p>
                  <p>(Another way: each of the 7 players plays 6 opponents twice, which is 12 games each, and 7 × 12 = 84. But every game has two players, so each game has been counted twice: 84 ÷ 2 = 42.)</p>
                  <p class="why-not">21 (C) is the trap: it counts every pair but forgets that each pair plays twice. 84 (E) counts every game from both players’ point of view, so each game is counted twice. 12 (A) is the number of games for just one player. 14 (B) gives each of the 7 players only 2 games.</p>`
      },
      {
        stem: `Both scales balance. All the apples weigh the same, and all the oranges weigh the same.
               <div class="figure">${FRUIT_SCALES}</div>
               <p style="margin:10px 0 0">One apple weighs <b>120 g</b>. How much does the pineapple weigh?</p>`,
        options: ["480 g", "720 g", "840 g", "960 g", "1080 g"],
        answer: 2,
        skill: "balance scales: removing the same from both sides, then swapping equal weights",
        explain: `<p><b>Scale 2:</b> 1 orange and 1 apple balance 4 apples. Take one apple off each side and the scale still balances: <b>1 orange weighs the same as 3 apples</b>.</p>
                  <p><b>Scale 1:</b> the pineapple balances 2 oranges and 1 apple. Swap each orange for 3 apples: 3 + 3 + 1 = <b>7 apples</b>.</p>
                  <p>So the pineapple weighs 7 × 120 g = <b>840 g</b>.</p>
                  <p class="why-not">1080 g (E) is the trap: it forgets to take the apple off the left side of Scale 2, so it thinks an orange weighs 4 apples (4 + 4 + 1 = 9 apples). 960 g (D) doubles Scale 2 to get 2 oranges and 2 apples = 8 apples, but the pineapple’s scale has only 1 apple with the oranges, not 2. 720 g (B) swaps the oranges correctly but forgets the apple on Scale 1 (6 apples). 480 g (A) just uses the 4 apples shown on Scale 2.</p>`
      }
    ]
  }
];
