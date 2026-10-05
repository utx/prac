/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 43
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>Last winter, Dad and I drove for hours along empty country roads to camp beside a national park that has been named a Dark Sky Park. That means there are hardly any lights for kilometres around, so the night sky looks much as it did hundreds of years ago, before towns and cities lit up the dark.</p>
<p>We put up our tent before sunset and ate dinner while the sky faded from orange to deep blue. Dad had packed a torch that shines red light, because red light does not spoil your night vision the way white light does. He explained that our eyes need at least twenty minutes to adjust to darkness, and that one glance at a bright screen can undo all that waiting.</p>
<p>At first I could see only a scattering of stars. But as my eyes grew {1} to the dark, more and more appeared, until there seemed to be no black gaps left between them. Then Dad pointed out a pale, misty band stretching right across the sky. “That’s the Milky Way,” he said. “It’s our own galaxy, and we’re looking at it from the inside.”</p>
<p>It was the night of a meteor shower, so every few minutes a meteor {2} across the sky and was gone in the blink of an eye. Dad told me that many shooting stars are made by specks of dust no bigger than a grain of sand, burning up as they plunge into the air high above us. I found that very hard to believe.</p>
<p>Lying on my back in the cold grass, beneath a sky that seemed to go on for ever, I felt utterly {3}. Strangely, it was one of the best feelings I have ever had.</p>`;

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
  title: "Under a Dark Sky",
  note: "Read the text below and decide which answer best fits each gap.",
  html: clozeHtml
};

/* ---- Thinking Skills Q3: cube model ---- */
const CUBES_SVG = (() => {
  const s = 44, d = s * 0.5, ox = 12, base = 3 * s + 2 * d + 10;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#a9c4e6") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#6f95c7") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#dbe7f6");
  const HEIGHTS = [[2, 1, 1], [3, 3, 2]]; // [front row, back row], left to right
  let g = "";
  for (let y = 1; y >= 0; y--) for (let x = 0; x < 3; x++) for (let z = 0; z < HEIGHTS[y][x]; z++) g += cube(x, y, z);
  const W = ox + 3 * s + d + 12, Hh = base + 8;
  return `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" role="img" aria-label="A model made of identical cubes on a base 3 cubes long and 2 cubes deep. Back row, left to right: stacks of 3, 3 and 2 cubes. Front row, left to right: stacks of 2, 1 and 1 cubes.">${g}</svg>`;
})();

/* ---- Maths Q2: line graph ---- */
const TEMP_SVG = (() => {
  const data = [["6 am", 4], ["8 am", 6], ["10 am", 12], ["12 pm", 16], ["2 pm", 18], ["4 pm", 14], ["6 pm", 8]];
  const ox = 50, top = 16, h = 220, step = 40, max = 20;
  const Y = v => top + h - (v / max) * h, X = i => ox + 20 + i * step;
  const W = X(data.length - 1) + 30;
  let g = "";
  for (let v = 0; v <= max; v += 2) {
    const lab = v % 4 === 0;
    g += `<line x1="${ox}" y1="${Y(v)}" x2="${W - 10}" y2="${Y(v)}" stroke="${lab ? "#9aa5b8" : "#d5dbe5"}" stroke-width="1"/>`;
    if (lab) g += `<text x="${ox - 8}" y="${Y(v) + 5}" font-size="15" text-anchor="end" fill="${INK}">${v}</text>`;
  }
  g += `<line x1="${ox}" y1="${top}" x2="${ox}" y2="${top + h}" stroke="${INK}" stroke-width="1.5"/>`;
  g += `<polyline points="${data.map((d, i) => `${X(i)},${Y(d[1])}`).join(" ")}" fill="none" stroke="#c0392b" stroke-width="2.5"/>`;
  data.forEach((d, i) => {
    g += `<circle cx="${X(i)}" cy="${Y(d[1])}" r="4" fill="#c0392b"/>`;
    g += `<text x="${X(i)}" y="${top + h + 20}" font-size="13" text-anchor="middle" fill="${INK}">${d[0]}</text>`;
  });
  g += `<text x="14" y="${top + h / 2}" font-size="13" text-anchor="middle" fill="${INK}" transform="rotate(-90 14 ${top + h / 2})">temperature (°C)</text>`;
  return `<svg viewBox="0 0 ${W} ${top + h + 32}" width="${W}" height="${top + h + 32}" role="img" aria-label="Line graph of the temperature every 2 hours from 6 am to 6 pm. The scale is labelled 0, 4, 8, 12, 16 and 20 degrees, with an unlabelled grid line halfway between each pair. 6 am 4, 8 am 6, 10 am 12, 12 pm 16, 2 pm 18, 4 pm 14, 6 pm 8.">${g}</svg>`;
})();

/* ---- Maths Q3: tilted square on a grid ---- */
const TILT_SVG = (() => {
  const c = 36, o = 6, n = 6;
  const pt = ([x, y]) => `${o + x * c},${o + (n - y) * c}`;
  let g = `<polygon points="${[[0, 2], [4, 0], [6, 4], [2, 6]].map(pt).join(" ")}" fill="#f2b8a2" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
  for (let i = 0; i <= n; i++) {
    g += `<line x1="${o + i * c}" y1="${o}" x2="${o + i * c}" y2="${o + n * c}" stroke="#8a96ab" stroke-width="1"/>`;
    g += `<line x1="${o}" y1="${o + i * c}" x2="${o + n * c}" y2="${o + i * c}" stroke="#8a96ab" stroke-width="1"/>`;
  }
  g += `<polygon points="${[[0, 2], [4, 0], [6, 4], [2, 6]].map(pt).join(" ")}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
  const S = 2 * o + n * c;
  return `<svg viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="A 6 by 6 grid of 1 centimetre squares. A tilted shaded square has its corners on the edges of the grid: on the left edge 2 squares up from the bottom, on the bottom edge 4 squares from the left, on the right edge 4 squares up from the bottom, and on the top edge 2 squares from the left.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["accustomed", "acquainted", "customary", "habitual"],
        answer: 0,
        skill: "choosing between words that look alike, and the word that goes with “to”",
        explain: `<p>To grow <b>accustomed to</b> something means to get used to it. As your eyes get used to the dark, you see more and more stars.</p>
                  <p class="why-not">“Acquainted” is the trap: it is close in meaning (you can become acquainted with a place or a person), but it goes with “with”, not “to”, and it means getting to know something, not getting used to it. “Customary” looks like “accustomed” but means usual or traditional (a customary greeting); eyes can’t be customary. “Habitual” means done out of habit, and you can’t grow habitual <em>to</em> anything.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["strayed", "strode", "streaked", "straggled"],
        answer: 2,
        skill: "choosing between words with similar sounds but different meanings",
        explain: `<p>Something that <b>streaks</b> across the sky moves very fast in a thin line, like a flash. The meteor was “gone in the blink of an eye”, so it must have moved very quickly.</p>
                  <p class="why-not">“Strayed” is the trap: it means wandered away from where it should be, so it sounds possible for something moving through the sky. But straying is slow and aimless, and this meteor vanished in an instant. “Strode” means walked with long steps, which a meteor can’t do, and “straggled” means lagged slowly behind a group.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["indifferent", "insignificant", "insufficient", "indestructible"],
        answer: 1,
        skill: "using clues across two sentences to infer a feeling (harder vocabulary)",
        explain: `<p>Two clues work together. First, she is lying under “a sky that seemed to go on for ever”: next to something that huge, a person feels tiny and unimportant. Second, “Strangely” tells you the word names a feeling that is usually <em>unpleasant</em>, yet this time it was “one of the best feelings” she has had. Feeling <b>insignificant</b> (small and unimportant) fits both clues: normally that would feel bad, but under the stars it filled her with wonder.</p>
                  <p class="why-not">“Indestructible” is the trap: it is a wonderful feeling, so it seems to fit “best feelings”, but then nothing would be strange about enjoying it, and a never-ending sky makes you feel small, not mighty. “Insufficient” looks and sounds similar, but it means <em>not enough</em> (insufficient food), which describes an amount, not a feeling. “Indifferent” means not caring, but someone who didn’t care wouldn’t call it one of the best feelings ever.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">A survey at Banksia Primary School found that <b>most</b> of the students in Year 4 walk to school.</p>
               <p class="quote"><em class="speaker">Leo:</em> “Mia is in Year 4 at Banksia Primary, so she must walk to school.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Leo has made?</p>`,
        options: ["Mia may live closer to the school than most of the other students in her class do.",
                  "Some students in other years at Banksia Primary may also walk to school.",
                  "Walking to school may be healthier for students than being driven there.",
                  "Mia may be one of the Year 4 students who do not walk to school."],
        answer: 3,
        skill: "spotting the mistake in someone’s reasoning (treating “most” as “all”)",
        explain: `<p>The survey says <b>most</b> Year 4 students walk, not <b>all</b> of them. So some Year 4 students get to school another way. Leo treats “most” as if it meant “every”. Mia could be one of the students who don’t walk, so D shows his mistake.</p>
                  <p class="why-not">B is the trap: it is probably true, but it is about students in <em>other</em> years, which tells us nothing about Mia. A would, if anything, make Leo’s conclusion more likely, so it doesn’t show a mistake. C is about whether walking is healthy, which has nothing to do with how Mia gets to school.</p>`
      },
      {
        stem: `In a secret code, each word is changed in two steps:
               <ul class="facts">
                 <li><b>Step 1:</b> every vowel is changed to the next vowel in this list: A → E, E → I, I → O, O → U, U → A. Other letters stay the same.</li>
                 <li><b>Step 2:</b> the whole word is written backwards.</li>
               </ul>
               <p style="margin:10px 0 0">For example, SUN is written as NAS.</p>
               <p style="margin:10px 0 0">How is <b>PLANET</b> written in this code?</p>`,
        options: ["PLENIT", "TINELP", "TENALP", "TANULP"],
        answer: 1,
        skill: "following the rules of a code (two steps)",
        explain: `<p><b>Step 1:</b> PLANET has two vowels. A → E and E → I, so PLANET becomes PLENIT.</p>
                  <p><b>Step 2:</b> write PLENIT backwards: <b>TINELP</b>.</p>
                  <p>Check with the example: SUN → U becomes A → SAN → backwards → NAS ✓</p>
                  <p class="why-not">PLENIT (A) is the trap: it does step 1 correctly but forgets step 2. TENALP (C) writes the word backwards but forgets to change the vowels. TANULP (D) moves each vowel to the one <em>before</em> it in the list (A → U, E → A) instead of the one after.</p>`
      },
      {
        stem: `This model is made of identical cubes. It stands on a base 3 cubes long and 2 cubes deep. There are no gaps: every cube sits on the table or on top of another cube.
               <div class="figure">${CUBES_SVG}</div>
               <p style="margin:10px 0 0">How many more cubes are needed to turn the model into a solid block 3 cubes long, 2 cubes deep and 3 cubes high?</p>`,
        options: ["3", "4", "6", "9"],
        answer: 2,
        skill: "counting cubes in a model, including the hidden ones",
        explain: `<p><b>Count the cubes in each stack</b>, using the top of each stack and the fact that there are no gaps underneath.</p>
                  <p>Back row (left to right): 3, 3, 2. Front row: 2, 1, 1. That is 8 + 4 = <b>12 cubes</b>, including 3 you can’t see (two behind the front-left stack and one behind the front-middle stack).</p>
                  <p>A solid block 3 long, 2 deep and 3 high has 3 × 2 × 3 = <b>18 cubes</b>. So 18 − 12 = <b>6</b> more are needed.</p>
                  <p class="why-not">9 (D) is the trap: it counts only the 9 cubes you can see, forgetting the hidden cubes that hold up the back stacks. 4 (B) fills only the gaps in the top layer and forgets that the front-middle and front-right stacks also need a cube in the middle layer. 3 (A) is the number of hidden cubes, not the number still needed.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Ella buys <b>3</b> notebooks that cost <b>$2.45</b> each and <b>1</b> ruler that costs <b>$1.80</b>.
               <p style="margin:10px 0 0">How much does she spend altogether?</p>`,
        options: ["$4.25", "$8.15", "$9.15", "$9.30", "$12.75"],
        answer: 2,
        skill: "money: multiplying and adding amounts",
        explain: `<p>3 notebooks: 3 × $2.45. 3 × $2 = $6 and 3 × 45c = 135c = $1.35, so 3 notebooks cost <b>$7.35</b>.</p>
                  <p>Add the ruler: $7.35 + $1.80 = <b>$9.15</b>.</p>
                  <p class="why-not">$8.15 (B) is the trap: 3 × 45c is 135c, which is $1.35, and forgetting to carry the dollar gives $6.35 for the notebooks. $4.25 (A) adds one notebook and the ruler, forgetting to multiply by 3. $9.30 (D) rounds each notebook to $2.50 first. $12.75 (E) multiplies the ruler by 3 as well.</p>`
      },
      {
        stem: `The line graph shows the temperature at a weather station every 2 hours on one day.
               <div class="figure">${TEMP_SVG}</div>
               <ol style="margin:8px 0 0;padding-left:22px">
                 <li>The temperature rose by 12 °C between 6 am and 12 pm.</li>
                 <li>The temperature rose by the same amount between 8 am and 10 am as between 10 am and 12 pm.</li>
                 <li>The highest temperature shown was 14 °C more than the lowest.</li>
               </ol>
               <p style="margin:8px 0 0">Which of these statements is/are correct?</p>`,
        options: ["statement 1 only", "statement 3 only", "statements 1 and 2 only", "statements 2 and 3 only", "statements 1 and 3 only"],
        answer: 4,
        skill: "reading a line graph with unlabelled grid lines",
        explain: `<p>Each grid line is <b>2 °C</b> (there is one unlabelled line between each pair of labels, which are 4 apart).</p>
                  <p>Readings: 6 am 4, 8 am 6, 10 am 12, 12 pm 16, 2 pm 18, 4 pm 14, 6 pm 8.</p>
                  <p><b>1:</b> 16 − 4 = 12 ✓<br>
                     <b>2:</b> 8 am to 10 am: 12 − 6 = 6. 10 am to 12 pm: 16 − 12 = 4. Not the same ✗<br>
                     <b>3:</b> highest 18 (2 pm), lowest 4 (6 am): 18 − 4 = 14 ✓</p>
                  <p class="why-not">C is the trap: both parts of the line in statement 2 slope upwards and look similar, but the first one climbs 3 grid lines and the second only 2. D makes the same mistake about statement 2 and also rejects statement 1, which happens if you read the 12 pm point as 14 instead of 16. A and B each miss one of the two correct statements, usually from reading a point on an unlabelled grid line wrongly.</p>`
      },
      {
        stem: `The grid is made of squares that measure <b>1 cm</b> by <b>1 cm</b>. A shaded square is drawn with its corners on the edges of the grid.
               <div class="figure">${TILT_SVG}</div>
               <p style="margin:10px 0 0">What is the area of the shaded square?</p>`,
        options: ["20 cm²", "24 cm²", "28 cm²", "32 cm²", "36 cm²"],
        answer: 0,
        skill: "area: finding a tilted shape by taking away the parts outside it",
        explain: `<p>The shaded square is hard to count directly, so find the area of the <b>whole grid</b> and take away the four white corners.</p>
                  <p>• Whole grid: 6 × 6 = <b>36 cm²</b>.<br>
                     • Each white corner is a right-angled triangle with sides of 4 cm and 2 cm along the grid. It is half of a 4 × 2 rectangle: half of 8 = <b>4 cm²</b>.<br>
                     • Four corners: 4 × 4 = 16 cm².</p>
                  <p>Shaded square: 36 − 16 = <b>20 cm²</b>.</p>
                  <p class="why-not">28 cm² (C) is the trap: it counts every square that is shaded even a little, so the part-shaded squares along the edges are counted as whole ones. 24 cm² (B) works out each corner triangle as (4 + 2) ÷ 2 = 3 instead of 4 × 2 ÷ 2. 32 cm² (D) takes away only one corner triangle. 36 cm² (E) is the whole grid.</p>`
      }
    ]
  }
];
