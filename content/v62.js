/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 62
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>When the Antarctic winter begins, almost every animal that can leave the frozen coast does so. Whales swim north to warmer waters, and most seabirds fly away too. {1} Waddling, and sometimes sliding along on their bellies, they trek for days across the frozen sea to the place where they will raise their chicks.</p>
<p>In May or early June, each female lays a single egg. Almost at once, she passes it to her mate and walks back to the sea to feed, because making the egg has left her very hungry. Now the father’s work begins. He balances the egg on top of his feet and tucks it under a warm flap of feathery skin on his belly. {2} For about two months, through the coldest, darkest part of the year, he stands guard over it and eats nothing at all.</p>
<p>Out on the ice, the temperature can drop to −40 °C, and fierce winds howl across the colony. To survive, thousands of fathers crowd together in a tight huddle. The birds in the middle are snug and sheltered, but those on the outside take the full force of the wind. {3} Slowly, the birds on the windy edge shuffle round to the sheltered side, while others move out to take their place, and every father gets his turn in the warm middle.</p>
<p>The chick hatches in July or August, and at about the same time the mother returns, her stomach full of fish and squid. Out of thousands of birds that look exactly alike, she finds her mate by his call. Then, at last, it is the father’s turn to make the long walk to the sea. By now he may have lost almost half his weight, and he has not eaten for about four months.</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "A father left in the wind for too long would use up the fat he needs to last the winter.",
  "Emperor penguins, however, set off in the opposite direction.",
  "They can dive deeper than any other bird, to more than 500 metres.",
  "If it touched the ice for even a short time, the chick growing inside could freeze.",
  "This is the warmest place in the colony, so the fathers who reach it stay there until spring."
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
  title: "Fathers on the Ice",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: three balance scales ---- */
// heavy = the parcel on the lower pan; each scale is its own small SVG so they wrap on a phone
function scaleSvg(left, right, heavy, n) {
  const cx = 80, py = 36, tilt = heavy === left ? 1 : -1;          // tilt 1 = left pan lower
  const dy = 14 * tilt, lx = cx - 52, rx = cx + 52;
  const ly = 40 + dy, ry = 40 - dy;
  const box = (x, y, t) => `<rect x="${x - 17}" y="${y - 30}" width="34" height="28" rx="3" fill="#f2c48d" stroke="${INK}" stroke-width="1.6"/>` +
    `<text x="${x}" y="${y - 10}" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">${t}</text>`;
  const g = `<polygon points="${cx},${py + 4} ${cx - 16},118 ${cx + 16},118" fill="#9aa6b8" stroke="${INK}" stroke-width="1.4"/>` +
    `<line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>` +
    `<circle cx="${cx}" cy="40" r="4" fill="${INK}"/>` +
    `<line x1="${lx - 22}" y1="${ly + 16}" x2="${lx + 22}" y2="${ly + 16}" stroke="${INK}" stroke-width="3"/>` +
    `<line x1="${lx}" y1="${ly}" x2="${lx}" y2="${ly + 16}" stroke="${INK}" stroke-width="1.6"/>` +
    `<line x1="${rx - 22}" y1="${ry + 16}" x2="${rx + 22}" y2="${ry + 16}" stroke="${INK}" stroke-width="3"/>` +
    `<line x1="${rx}" y1="${ry}" x2="${rx}" y2="${ry + 16}" stroke="${INK}" stroke-width="1.6"/>` +
    box(lx, ly + 15, left) + box(rx, ry + 15, right) +
    `<text x="${cx}" y="138" font-size="13" text-anchor="middle" fill="${INK}">Scale ${n}</text>`;
  const light = heavy === left ? right : left;
  return `<svg viewBox="0 0 160 144" width="160" height="144" role="img" aria-label="Scale ${n}: parcel ${left} on the left pan and parcel ${right} on the right pan. The pan with ${heavy} is lower, so ${heavy} is heavier than ${light}.">${g}</svg>`;
}
const SCALES = `<div style="display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center">${scaleSvg("K", "L", "K", 1)}${scaleSvg("L", "M", "M", 2)}${scaleSvg("N", "K", "K", 3)}</div>`;

/* ---- Thinking Skills Q3: a part-built cube model ---- */
// heights[row][column]: row 0 = front, row 2 = back; column 0 = left
const HEIGHTS = [[2, 1, 0], [3, 1, 0], [3, 2, 1]];
const MODEL_SVG = (() => {
  const s = 56, d = s * 0.5, ox = 10, rows = 3, base = 3 * s + rows * d + 10;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill, sw = 1.6, col = INK) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${col}" stroke-width="${sw}" stroke-linejoin="round"/>`;
  let g = "";
  // the 3 by 3 floor
  for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++)
    g += poly([P(x, y, 0), P(x + 1, y, 0), P(x + 1, y + 1, 0), P(x, y + 1, 0)], "#eef1f6", 1, "#8a96aa");
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#f2c48d") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#d9944a") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#fbe3c4");
  for (let y = rows - 1; y >= 0; y--) for (let x = 0; x < 3; x++) for (let z = 0; z < HEIGHTS[y][x]; z++) g += cube(x, y, z);
  const W = ox + 3 * s + rows * d + 12, Hh = base + 8;
  return `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" role="img" aria-label="A model made of identical cubes on a square floor 3 squares by 3 squares, drawn from the front-right so you can see the front, the top and the right-hand side. Stack heights, left to right: back row 3, 2 and 1 cubes; middle row 3, 1 and 0 cubes; front row 2, 1 and 0 cubes. The two empty floor squares are at the right-hand end of the middle and front rows.">${g}</svg>`;
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
        skill: "using a contrast word (“however”) and a reference word (“they”) to place a sentence",
        explain: `<p>Before the gap, the text tells us what <em>other</em> animals do when winter comes: they leave. After the gap, “they trek for days across the frozen sea” to raise their chicks, which is going <em>towards</em> the cold, not away from it. So the missing sentence must name the penguins and show that they are different. Sentence <b>B</b> does both: “<b>however</b>” signals the contrast with the whales and seabirds, and “Emperor penguins” gives the next sentence’s “they” someone to point back to.</p>
                  <p class="why-not">C is the trap: it is a true fact about emperor penguins and it starts with “They”. But straight after “most seabirds fly away too”, “They” would mean the seabirds, and a fact about diving doesn’t lead into the long walk across the ice. Nothing in the text has told us yet that the penguins stay, so without B the next sentence wouldn’t make sense. E (“This is the warmest place …”) has nothing to point back to here.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 3,
        skill: "using a reference word (“it”) and a reason that explains the sentence before",
        explain: `<p>Just before the gap, the father balances the egg on his feet and tucks it under a flap of skin. The reader may wonder why he goes to so much trouble. Sentence <b>D</b> gives the reason: “<b>it</b>” points back to the egg, and if the egg touched the ice, “the chick growing inside could freeze”. The next sentence then carries on with the egg (“he stands guard over <b>it</b>”).</p>
                  <p class="why-not">E is the trap: the flap of skin is warm, so “This is the warmest place” seems to follow. But E goes on to talk about “the fathers who reach it” staying “until spring”, which is about a place in the colony that fathers move to, not an egg on one father’s feet. A is about fathers standing on the outside of a huddle, and no huddle has been mentioned yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 0,
        skill: "choosing the sentence that explains why a detail (the birds taking turns) matters, linking it to an earlier part of the text",
        explain: `<p>Before the gap, the birds on the outside “take the full force of the wind”. After it, the birds take turns: the ones on the windy edge shuffle round so that “every father gets his turn in the warm middle”. The missing sentence must explain <b>why</b> taking turns matters so much. Sentence <b>A</b> does, and it links back to the second paragraph: the fathers eat “nothing at all” for about two months, so the only fuel they have is the fat stored in their bodies. Standing in the wind would burn it up too fast, and a father who ran out could not last the winter.</p>
                  <p class="why-not">E is the trap: “This” can point back to the snug, sheltered middle, and the middle really is the warmest place. But E says the fathers who reach it “stay there until spring”, which is the opposite of the next sentence, where everyone takes a turn and keeps moving. C is a true fact about emperor penguins, but diving has nothing to do with surviving the wind on the ice, and the fathers are not swimming at all during these months.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Tom tested two brands of sunflower seeds. He planted 10 <b>Sunny Days</b> seeds in the vegetable patch, which gets sun all day. He planted 10 <b>Golden Giant</b> seeds in the corner beside the shed, which is in shade for most of the day. Nine of the Sunny Days seeds grew into healthy plants, but only four of the Golden Giant seeds did.</p>
               <p class="quote"><em class="speaker">Tom:</em> “Sunny Days seeds are better than Golden Giant seeds.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Tom has made?</p>`,
        options: ["Golden Giant seeds may cost more than Sunny Days seeds at the garden shop.",
                  "Sunflowers may need plenty of water as well as sunshine, so Tom may need to water both patches.",
                  "The Golden Giant seeds may have grown just as well if they had been planted in the sunny patch.",
                  "Some of the Sunny Days plants may grow much taller than others in the vegetable patch."],
        answer: 2,
        skill: "spotting a mistake: an unfair comparison (the two brands were not grown in the same conditions)",
        explain: `<p>To compare two brands of seeds fairly, everything else must be the same, so that the only difference is the brand. But Tom gave the Sunny Days seeds the sunny patch and put the Golden Giant seeds in the shade. Sunflowers need lots of sun, so the shady corner alone could explain why fewer Golden Giant seeds grew. C shows the mistake: the Golden Giant seeds may have done just as well if they had had the same sunny spot.</p>
                  <p class="why-not">B is the trap: it is about what sunflowers need to grow, which sounds close to the problem. But it talks about water, which nobody says was different, and it gives Tom advice for the future instead of showing what was wrong with his comparison. A is about price, which has nothing to do with which seeds grow better. D is about some Sunny Days plants being taller than others, which doesn’t touch the comparison between the two brands.</p>`
      },
      {
        stem: `Four parcels, <b>K</b>, <b>L</b>, <b>M</b> and <b>N</b>, were weighed two at a time on balance scales. The pictures show the results. The heavier parcel always makes its pan go down.
               <div class="figure">${SCALES}</div>
               <p style="margin:10px 0 0">Which one of these statements <b>must</b> be true?</p>`,
        options: ["The heaviest parcel is either K or M.",
                  "Parcel M is heavier than all the other parcels.",
                  "Parcel N is lighter than all the other parcels.",
                  "Parcel L is heavier than parcel N."],
        answer: 0,
        skill: "must be true: combining the results of three balance scales, and seeing what is still unknown",
        explain: `<p>Write down what each scale tells us: <b>K is heavier than L</b> (scale 1), <b>M is heavier than L</b> (scale 2) and <b>K is heavier than N</b> (scale 3).</p>
                  <p><b>Who can’t be the heaviest?</b> L is lighter than K, so L can’t be the heaviest. N is lighter than K, so N can’t be the heaviest either. That leaves only K or M. So A <b>must</b> be true.</p>
                  <p class="why-not">B is the trap: M won its weighing, so it feels like the winner. But M was only weighed against L. M and K were never weighed against each other, so K could be heavier than M. C: N lost its weighing, but so did L, and N and L were never compared, so L could be the lightest. D: L and N were never weighed against each other, so we can’t tell which is heavier. B, C and D <em>could</em> be true, but none of them <em>must</em> be.</p>`
      },
      {
        stem: `This model is made of identical cubes standing on a square floor 3 squares long and 3 squares wide. There are no gaps under any cube: every cube sits on the floor or on top of another cube.
               <div class="figure">${MODEL_SVG}</div>
               <p style="margin:10px 0 0">How many <b>more</b> cubes are needed to turn the model into a solid cube that is 3 cubes long, 3 cubes wide and 3 cubes high?</p>`,
        options: ["18", "14", "13", "8"],
        answer: 1,
        skill: "cube model: working out the height of every stack, including cubes you can’t see, then finding what is missing",
        explain: `<p>A solid 3 × 3 × 3 cube needs 3 × 3 × 3 = <b>27</b> cubes.</p>
                  <p><b>Step 1: count the model stack by stack.</b> You can see the top of every stack, so count how high each one is (the cubes underneath are hidden, but they must be there, because there are no gaps).<br>
                     • Back row: 3 + 2 + 1 = 6<br>
                     • Middle row: 3 + 1 + 0 = 4<br>
                     • Front row: 2 + 1 + 0 = 3<br>
                     The model has 6 + 4 + 3 = <b>13</b> cubes.</p>
                  <p><b>Step 2: what is missing?</b> 27 − 13 = <b>14</b> cubes. (Check stack by stack: back row 0 + 1 + 2 = 3, middle row 0 + 2 + 3 = 5, front row 1 + 2 + 3 = 6, and 3 + 5 + 6 = 14 ✓)</p>
                  <p class="why-not">18 (A) is the trap: it counts only the 9 cubes you can see (27 − 9 = 18) and forgets the cubes hidden underneath the taller stacks, which must be there because there are no gaps. 13 (C) is the number of cubes already in the model, not the number still needed. 8 (D) fills every stack up to 3 but forgets the two empty floor squares on the right, which each need a whole stack of 3 cubes.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `A bag holds <b>2 kg</b> of flour. Dad uses <b>350 g</b> of it to make bread and <b>475 g</b> to make pancakes.
               <p style="margin:10px 0 0">How much flour is left in the bag?</p>`,
        options: ["1 kg 175 g", "1 kg 225 g", "1 kg 525 g", "1 kg 650 g", "2 kg 825 g"],
        answer: 0,
        skill: "mass: changing kilograms to grams, then two subtractions",
        explain: `<p>2 kg = <b>2000 g</b>. Dad uses 350 g + 475 g = <b>825 g</b> altogether.</p>
                  <p>2000 g − 825 g = <b>1175 g</b> = <b>1 kg 175 g</b>.</p>
                  <p class="why-not">1 kg 225 g (B) is the trap: it adds 350 + 475 without carrying (getting 775 g instead of 825 g). 1 kg 525 g (C) only takes away the 475 g for pancakes and forgets the bread. 1 kg 650 g (D) only takes away the 350 g for bread and forgets the pancakes. 2 kg 825 g (E) adds the flour Dad used instead of taking it away.</p>`
      },
      {
        stem: `Ivy had <b>72</b> stickers. She gave <b>one third</b> of them to her brother. Then she gave <b>three eighths</b> of the stickers she had <b>left</b> to her friend Kim.
               <p style="margin:10px 0 0">How many stickers does Ivy have now?</p>`,
        options: ["18", "21", "24", "30", "48"],
        answer: 3,
        skill: "fractions: a fraction of a collection, then a fraction of what is left",
        explain: `<p><b>Step 1: her brother.</b> <sup>1</sup>&frasl;<sub>3</sub> of 72 = 72 ÷ 3 = <b>24</b>. Ivy has 72 − 24 = <b>48</b> left.</p>
                  <p><b>Step 2: Kim.</b> <sup>3</sup>&frasl;<sub>8</sub> of 48: 48 ÷ 8 = 6, and 6 × 3 = <b>18</b>. Ivy has 48 − 18 = <b>30</b> left.</p>
                  <p class="why-not">21 (B) is the trap: it works out <sup>3</sup>&frasl;<sub>8</sub> of all 72 stickers (27) instead of <sup>3</sup>&frasl;<sub>8</sub> of the 48 that were left, then takes away 24 and 27. 48 (E) stops after the brother and forgets Kim. 24 (C) is how many her brother got. 18 (A) is how many Kim got, not how many Ivy has.</p>`
      },
      {
        stem: `In a biscuit factory, <b>Machine A</b> packs <b>8</b> boxes of biscuits every minute. <b>Machine B</b> packs <b>12</b> boxes every minute.
               <p style="margin:10px 0 0">Machine A starts packing at <b>9:00 am</b>. Machine B starts packing at <b>9:05 am</b>. Both machines keep packing without stopping.</p>
               <p style="margin:10px 0 0">After Machine B starts, at what time will the two machines have packed the <b>same number</b> of boxes?</p>`,
        options: ["9:09 am", "9:10 am", "9:15 am", "9:20 am", "9:45 am"],
        answer: 2,
        skill: "rates: one machine catching up with another that started earlier",
        explain: `<p><b>Step 1: the head start.</b> By 9:05 am, Machine A has packed 5 × 8 = <b>40</b> boxes, and Machine B has packed none.</p>
                  <p><b>Step 2: catching up.</b> From 9:05 am, B packs 12 − 8 = <b>4</b> more boxes than A every minute. To make up 40 boxes it needs 40 ÷ 4 = <b>10 minutes</b>. 9:05 am + 10 minutes = <b>9:15 am</b>.</p>
                  <p>Check at 9:15 am: A has run 15 minutes, 15 × 8 = 120 boxes. B has run 10 minutes, 10 × 12 = 120 boxes ✓</p>
                  <p class="why-not">9:10 am (B) is the trap: it thinks B needs as long to catch up as A’s head start (5 minutes), but B only gains 4 boxes a minute. 9:20 am (D) works out that A will have run for 15 minutes but adds the 15 minutes to B’s start time. 9:45 am (E) treats the head start of 40 boxes as 40 minutes. 9:09 am (A) treats the 4 boxes gained each minute as 4 minutes.</p>`
      }
    ]
  }
];
