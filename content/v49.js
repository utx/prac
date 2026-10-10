/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 49
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>Next time you walk past a clump of moss on an old brick wall, you might like to give it a respectful nod. {1} These creatures are called tardigrades. Most of them are less than half a millimetre long, so you need a microscope to see one properly. When you do, you will find a plump little body, eight stubby legs tipped with tiny claws and a slow, lumbering walk. It is no wonder that people call them “water bears”.</p>
<p>Water bears need a thin film of water around their bodies to move about and feed, so damp moss suits them well. But moss often dries out in hot weather, and when it does, a water bear does something remarkable. It pulls in its head and legs, loses almost all the water in its body and shrivels into a dry little barrel that scientists call a “tun”. {2} It can stay like this for years. Add a few drops of water, and within hours it may plump up, stretch out its legs and wander off as if nothing had happened.</p>
<p>A tun can put up with much more than dry weather. In laboratories, tuns have been frozen to temperatures colder than anywhere on Earth, heated to temperatures that would cook most animals, and blasted with radiation hundreds of times stronger than a dose that would kill a person. Then, in September 2007, scientists put them to the ultimate test. Tuns were sent into orbit on an uncrewed Russian spacecraft called FOTON-M3, as part of an experiment cheekily named TARDIS (short for “Tardigrades In Space”). For ten days they were exposed to space itself: no air at all and, for some of them, the full glare of the Sun. Back on Earth, the scientists added water. Many of the water bears came back to life, and some even went on to have young.</p>
<p>{3}</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "Who would have guessed that a scruffy clump of moss could be home to such a remarkable traveller?",
  "Living in it, quite possibly, are hundreds of tiny animals that can survive things that would kill almost anything else.",
  "This shows that a tun can stay alive in dry moss for many years.",
  "In this state it does not eat or move, and its body almost completely shuts down.",
  "So the space trip proved that water bears can survive absolutely anything."
];
function articleHtml() {
  const si = SECTIONS.findIndex(s => s.id === "reading");
  let t = ARTICLE_TEXT;
  SECTIONS[si].questions.forEach((q, i) => {
    const chosen = responses[si][i];
    let fill;
    if (passMode === "review") fill = `<span class="gap filled correct">(${i + 1}) ${SENTENCES[q.answer]}</span>`;
    else if (chosen !== null) fill = `<span class="gap filled">(${i + 1}) ${SENTENCES[chosen]}</span>`;
    else fill = `<span class="gap">(${i + 1}) …………</span>`;
    t = t.replace(`{${i + 1}}`, fill);
  });
  return t;
}
const PASSAGE = {
  title: "The Toughest Animal You’ve Never Seen",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: zoo keeper talks ---- */
const c_ = s => `<td style="text-align:center;white-space:nowrap">${s}</td>`;
const zooRow = (name, am, pm, len) => `<tr><th>${name}</th>${c_(am)}${c_(pm)}${c_(len)}</tr>`;
const ZOO_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th>talk</th><th style="text-align:center">first<br>talk</th><th style="text-align:center">second<br>talk</th><th style="text-align:center">minutes<br>long</th></tr>
  ${zooRow("Seals", "10:30 am", "1:00 pm", "20")}
  ${zooRow("Lions", "10:45 am", "2:15 pm", "15")}
  ${zooRow("Penguins", "11:00 am", "2:00 pm", "15")}
  ${zooRow("Reptiles", "11:15 am", "1:30 pm", "30")}
  ${zooRow("Giraffes", "12:00 pm", "3:00 pm", "15")}
</table></div>`;

/* ---- Thinking Skills Q3: squares in a grid with a missing corner ---- */
const SQUARES_SVG = (() => {
  const c = 46, o = 8;
  let g = "";
  for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) {
    if (r === 0 && k === 3) continue;   // top-right square is missing
    g += `<rect x="${o + k * c}" y="${o + r * c}" width="${c}" height="${c}" fill="#fdf3e1" stroke="${INK}" stroke-width="2.2"/>`;
  }
  const W = 4 * c + 2 * o, H = 3 * c + 2 * o;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A shape made of 11 small squares of the same size: a grid of 3 rows and 4 columns with the top-right square missing. All the lines of the grid are drawn.">${g}</svg>`;
})();

/* ---- Maths Q3: painted 4 × 4 × 4 cube (supplied by David; redrawn) ---- */
const PAINTED_SVG = (() => {
  const n = 4, s = 34, d = s * 0.6, ox = 10, base = n * s + n * d + 10;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>`;
  let g = "";
  for (let x = 0; x < n; x++) for (let z = 0; z < n; z++)       // front face
    g += poly([P(x, 0, z), P(x + 1, 0, z), P(x + 1, 0, z + 1), P(x, 0, z + 1)], "#3f82d6");
  for (let y = 0; y < n; y++) for (let z = 0; z < n; z++)       // right face
    g += poly([P(n, y, z), P(n, y + 1, z), P(n, y + 1, z + 1), P(n, y, z + 1)], "#2a5fa8");
  for (let x = 0; x < n; x++) for (let y = 0; y < n; y++)       // top face
    g += poly([P(x, y, n), P(x + 1, y, n), P(x + 1, y + 1, n), P(x, y + 1, n)], "#7fb0ee");
  const W = ox + n * s + n * d + 10, H = base + 10;
  return `<svg viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" width="${W.toFixed(0)}" height="${H.toFixed(0)}" role="img" aria-label="A large cube made of small cubes, 4 along each edge, drawn in 3D. The front, the right side and the top can be seen, and all of them are painted blue.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Choose the sentence (A, B, C, D or E) that best fits each gap. There are two sentences you won’t use.",
    preamble: `<div class="choice-list"><ol>${SENTENCES.map((t, i) =>
      `<li><span class="letter">${SENT_LETTERS[i]}</span><span>${t}</span></li>`).join("")}</ol></div>`,
    questions: [
      {
        stem: "Which sentence best fits <b>gap 1</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 1,
        skill: "using a reference word (“These creatures”) to place a sentence",
        explain: `<p>After the gap comes “<b>These creatures</b> are called tardigrades.” “These creatures” must point back to some creatures that have just been mentioned, but the sentence before the gap is only about moss. Sentence <b>B</b> brings in the creatures (“hundreds of tiny animals”), and “it” in B means the clump of moss. B also explains the odd advice to give the moss a “respectful nod”: something living in it is astonishingly tough.</p>
                  <p class="why-not">A is the trap: it mentions a clump of moss and something living in it, so it seems to follow on. But “such a remarkable traveller” points back to a traveller we have already read about, and nobody has travelled anywhere yet: the space trip comes at the end. A also talks about one traveller, while “These creatures” needs more than one. E names no creatures for “These creatures” to point back to, and its “space trip” hasn’t happened yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 3,
        skill: "following a description across a gap (“In this state … like this”)",
        explain: `<p>Before the gap, the water bear shrivels into a dry barrel called a tun. After it: “It can stay <b>like this</b> for years. Add a few drops of water …” Sentence <b>D</b> fits between them. “<b>In this state</b>” points back to the tun, and D describes it more fully (no eating, no moving, its body almost shut down). Then “It can stay like this” means stay shut down as a tun, which makes sense.</p>
                  <p class="why-not">C is the trap: it uses the word “tun” and talks about staying alive in dry moss for years, which is what this paragraph is about. But “This shows” has nothing before it to show anything yet, and it would just repeat “for years” from the next sentence. E talks about a space trip that hasn’t been described yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>, the last sentence of the article?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 0,
        skill: "choosing an ending that sums up the main idea and links back to the start",
        explain: `<p>The last sentence should round off the <b>whole</b> article, not just the last paragraph. The article’s main idea is that a tiny creature living in something as ordinary as moss is amazingly tough. Sentence <b>A</b> does this. The “scruffy clump of moss” takes us back to the moss on the wall in the first sentence. “Such a remarkable traveller” sums up the water bears’ trip into space, which has just been described, even though A never uses the word “space”.</p>
                  <p class="why-not">E is the trap: it follows straight on from the space trip and sounds like a strong ending. But it says more than the article does. Only <i>many</i> of the water bears came back to life, and only <i>some</i> faced the full glare of the Sun, so the trip did not prove that they can survive absolutely anything. E also leaves out the moss, so it doesn’t round off the whole article. C sounds like a conclusion too (“This shows that …”), but “This” would point back to the space experiment, which showed nothing about living in dry moss for years: C sums up paragraph 2, not the whole article. B can’t go here because “it” would have nothing to point back to.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">A lucky-dip box holds 12 prizes: <b>5 yo-yos</b>, <b>4 whistles</b> and <b>3 bouncy balls</b>. All the prizes are wrapped in the same paper, so you can’t tell which is which. Ruby takes some prizes without looking.</p>
               <p class="quote"><em class="speaker">Sam:</em> “If Ruby takes 4 prizes, she can be sure that at least two of them will be the same kind.”</p>
               <p class="quote"><em class="speaker">Leah:</em> “If Ruby takes 9 prizes, she can be sure that at least two of them will be yo-yos.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Sam only", "Leah only", "Both Sam and Leah", "Neither Sam nor Leah"],
        answer: 2,
        skill: "deciding whose reasoning is correct (certainty: thinking about the worst case)",
        explain: `<p>“Sure” means it must happen even if Ruby is as unlucky as possible. So check the <b>worst case</b> for each person.</p>
                  <p><b>Sam:</b> the unluckiest start is one of each kind: a yo-yo, a whistle and a ball. There are only 3 kinds, so the 4th prize <em>must</em> match one of them. Sam is correct.</p>
                  <p><b>Leah:</b> the unluckiest start is every prize that is <em>not</em> a yo-yo: 4 whistles + 3 balls = 7 prizes. After that, only yo-yos are left, so prizes 8 and 9 are both yo-yos. With 9 prizes, Ruby must have at least two yo-yos. Leah is correct.</p>
                  <p>Both are correct, so the answer is <b>C</b>.</p>
                  <p class="why-not">B (Leah only) is the trap: 4 seems far too few out of 12, and some students use the biggest group (5 yo-yos + 1 = 6), which is the rule for getting two <em>different</em> kinds, not two the same. A (Sam only) catches students who think you would have to take all 12 prizes to be sure about one particular kind; but once all 7 other prizes are gone, only yo-yos are left. D is for students who think you can never be sure of anything without looking.</p>`
      },
      {
        stem: `Riverside Zoo has keeper talks at these times.
               ${ZOO_TABLE}
               <p style="margin:10px 0 0">It takes <b>10 minutes</b> to walk from the zoo entrance to any talk, and <b>10 minutes</b> to walk from one talk to another.</p>
               <p style="margin:10px 0 0">Mia wants to see the <b>seals</b>, <b>penguins</b> and <b>reptiles</b> talks, each from start to finish. What is the latest time she can arrive at the zoo entrance?</p>`,
        options: ["11:05 am", "11:15 am", "12:50 pm", "1:00 pm"],
        answer: 0,
        skill: "using a timetable with walking times and talk lengths",
        explain: `<p><b>Try the afternoon only.</b> Seals 1:00–1:20, walk 10 minutes, reptiles 1:30–2:00 (just in time). Then she needs 10 minutes to walk to the penguins, so she gets there at 2:10, but the penguin talk started at 2:00. The afternoon alone doesn’t work, so one talk must be in the morning.</p>
                  <p><b>Make the morning talk as late as possible.</b> The latest morning talk is the reptiles at 11:15 am (until 11:45). Then: seals 1:00–1:20, walk to the penguins by 1:30, penguins at 2:00. That works.</p>
                  <p>Her first talk starts at 11:15 am, and she needs 10 minutes to walk there from the entrance: 11:15 − 10 minutes = <b>11:05 am</b>.</p>
                  <p class="why-not">1:00 pm (D) is the trap: without the walking times, seals at 1:00, reptiles at 1:30 and penguins at 2:00 seem to fit one after another. 12:50 pm (C) remembers the walk from the entrance but forgets that the reptile talk lasts 30 minutes, so it seems to finish in time for the walk to the penguins. 11:15 am (B) finds the right plan but forgets the 10-minute walk from the entrance to the first talk.</p>`
      },
      {
        stem: `How many squares of <b>any size</b> can be found in this shape?
               <div class="figure">${SQUARES_SVG}</div>`,
        options: ["16", "17", "18", "20"],
        answer: 1,
        skill: "counting squares of every size, including overlapping ones",
        explain: `<p>Count the squares one size at a time.</p>
                  <p><b>Small squares (1 by 1):</b> 3 rows of 4 would be 12, but one is missing, so <b>11</b>.</p>
                  <p><b>2 by 2 squares:</b> in a full 3-by-4 grid, a 2-by-2 square can start in 3 places along each row and 2 places down, which makes 6. One of them would use the missing top-right square, so there are <b>5</b>. Several of them overlap each other.</p>
                  <p><b>3 by 3 squares:</b> one uses the three left-hand columns; the other would need the missing square. So there is <b>1</b>.</p>
                  <p>11 + 5 + 1 = <b>17</b>.</p>
                  <p class="why-not">16 (A) is the trap: it counts the small and 2-by-2 squares correctly but misses the big 3-by-3 square. 18 (C) counts both 3-by-3 squares, but the right-hand one would need the missing square. 20 (D) counts the squares in a full 3-by-4 grid (12 + 6 + 2) and forgets that one square is missing.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `What number goes in the box to make this true?
               <p style="margin:12px 0;font-size:22px;font-weight:700;letter-spacing:.03em">45 − 17 = ▢ ÷ 3</p>`,
        options: ["25", "28", "31", "84", "96"],
        answer: 3,
        skill: "the equals sign: both sides have the same value",
        explain: `<p>The equals sign means both sides have the same value. The left side is 45 − 17 = <b>28</b>.</p>
                  <p>So ▢ ÷ 3 = 28. The missing number is the number that gives 28 when it is divided by 3: 28 × 3 = <b>84</b>. Check: 84 ÷ 3 = 28 ✓</p>
                  <p class="why-not">28 (B) is the trap: it treats “=” as “the answer comes next” and writes the answer to 45 − 17 in the box, ignoring the “÷ 3”. 25 (A) takes 3 away from 28, and 31 (C) adds 3, instead of multiplying. 96 (E) works out 45 − 17 as 32 by taking the smaller digit from the larger one in each column (7 − 5 = 2), then multiplies 32 by 3.</p>`
      },
      {
        stem: `At a party, a large pizza is cut into <b>12</b> equal slices. The children eat <b>1/4</b> of the pizza. Then the adults eat <b>2/3</b> of the slices that are left.
               <p style="margin:10px 0 0">What fraction of the whole pizza is left over?</p>`,
        options: ["1/12", "1/4", "1/3", "3/4", "11/12"],
        answer: 1,
        skill: "fractions: a fraction of what is left, then a fraction of the whole",
        explain: `<p><b>Children:</b> 1/4 of 12 slices = 3 slices. That leaves 12 − 3 = <b>9</b> slices.</p>
                  <p><b>Adults:</b> 2/3 of the 9 slices that are left = 6 slices. That leaves 9 − 6 = <b>3</b> slices.</p>
                  <p>3 slices out of 12 is 3/12 = <b>1/4</b> of the whole pizza.</p>
                  <p class="why-not">1/12 (A) is the trap: it takes 2/3 of the <em>whole</em> pizza (8 slices) for the adults, instead of 2/3 of what was left, which leaves 12 − 3 − 8 = 1 slice. 1/3 (C) is 3 slices out of the 9 that were left, but the question asks for a fraction of the whole pizza. 3/4 (D) forgets the adults (it is also the fraction that was eaten). 11/12 (E) adds up the slices eaten when the adults take 2/3 of the whole pizza (3 + 8).</p>`
      },
      {
        stem: `Sixty-four small white cubes of the same size are glued together to form a large cube.
               <div class="figure">${PAINTED_SVG}</div>
               <p style="margin:10px 0 0">After painting all six sides of the large cube blue, how many small cubes have <b>exactly 2</b> blue sides?</p>`,
        options: ["8", "12", "24", "48", "56"],
        answer: 2,
        skill: "3D: which small cubes in a painted cube have exactly two painted sides (supplied by David)",
        explain: `<p>A small cube gets one blue side for every outside face of the large cube it touches. A cube with <b>2</b> blue sides is on an <b>edge</b> of the large cube, but not at a corner (corner cubes touch 3 faces).</p>
                  <p>Each edge has 4 small cubes. The 2 at the ends are corners, so each edge has <b>2</b> cubes with exactly 2 blue sides. A cube has <b>12</b> edges, so there are 12 × 2 = <b>24</b>.</p>
                  <p>Full count: 8 corner cubes have 3 blue sides, 24 have 2, 24 have 1 (the middle 2 × 2 on each of the 6 faces) and 8 have none (the hidden 2 × 2 × 2 block inside). 8 + 24 + 24 + 8 = 64 ✓. So 24 cubes also have exactly <b>1</b> blue side: if you mixed up “1 side” and “2 sides” you would still get 24, but for the wrong reason.</p>
                  <p class="why-not">48 (D) is the trap: it counts all 4 cubes on every edge (12 × 4), including the corner cubes, which have 3 blue sides (and each corner is shared by 3 edges, so it gets counted more than once). 12 (B) counts one cube per edge. 8 (A) is the number of corner cubes (3 blue sides), or of hidden cubes (none). 56 (E) is every cube with any blue paint at all (64 − 8).</p>`
      }
    ]
  }
];
