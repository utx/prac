/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 59
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `The ferry to Gull Island left at seven, and I was on board by a quarter to, gripping the rail. I was eight, and it was my first time going to stay with Nan on my own. Halfway across, the wind picked up. The swell lifted the ferry and let it drop, again and again, as if the sea were a horse trying to shake us off its back. My breakfast began to feel like a very bad idea. A deckhand in a yellow jacket gave me a ginger biscuit and told me to watch the horizon, not the water. I watched it so hard my eyes stung. Then, at last, the island slid out from behind the headland, and there at the end of the jetty was a small figure in a red cardigan, waving both arms above her head. I forgot all about my stomach.`,
  `Lord Howe Island lies in the Tasman Sea, about 600 kilometres off the coast of New South Wales. It is only about 10 kilometres long, yet in 1982 it was added to the World Heritage List because of its rare plants, birds and sea life. To protect it, only about 400 tourists may stay on the island at any one time. Roughly 20 kilometres away, Ball’s Pyramid rises more than 550 metres out of the ocean like a giant’s broken tooth. It has no beach and no harbour, and landing on it is extremely difficult. That turned out to matter. In 1918, rats came ashore on Lord Howe Island from a ship that had run aground, and within a few years the island’s giant stick insects had disappeared. For decades they were thought to be extinct. Then, in 2001, scientists who climbed Ball’s Pyramid found a small group of them living under a single bush.`,
  `Ruby had walked out to the sandbar to look for shells, and for a while the whole world was hers: wet sand, wide sky and the little island across the channel. She didn’t notice the water at first. It came in quietly, slipping around the edges of the sandbar like a cat creeping up on a bird, filling the hollows behind her before she thought to turn round. When she did, the channel she had splashed across in bare feet was a wide grey stretch of moving water. She could see Dad on the beach, very small, waving her in. Holding her bucket above her head, Ruby stepped in. The water reached her knees, then her waist, tugging at her legs, and she kept her eyes on Dad the whole way. When she finally staggered up the beach, she held out the bucket. “I didn’t drop a single shell,” she said, and her voice only wobbled a little.`,
  `There are plans to build a bridge to Wattle Island, so that visitors no longer have to wait for the ferry. People keep telling us islanders that we will be glad of it. I’m not so sure. Every evening, when the last ferry pulls away from the jetty at six o’clock, something changes. My neighbours stroll down to the water with their dogs. Nobody bothers to lock a door. Children ride their bikes down the middle of the only road, and their parents don’t even look up. A bridge would bring cars across at every hour of the day and night. It would be like taking the front door off your house so that guests never have to knock. If more visitors want to come, let’s run an extra ferry at weekends instead.`
];
const PASSAGE = {
  title: "Islands",
  note: "Read the four extracts below about islands.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q2: two-way table ---- */
const VCELL = v => `<td style="text-align:center">${v}</td>`;
const VOTE_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th></th><th style="text-align:center">zoo</th><th style="text-align:center">museum</th><th style="text-align:center">beach</th><th style="text-align:center">total</th></tr>
  <tr><th>Year 3</th>${VCELL(17)}${VCELL("?")}${VCELL(8)}${VCELL(36)}</tr>
  <tr><th>Year 4</th>${VCELL("?")}${VCELL("?")}${VCELL("?")}${VCELL(41)}</tr>
  <tr><th>total</th>${VCELL(30)}${VCELL("?")}${VCELL("?")}${VCELL(77)}</tr>
</table></div>`;

/* ---- Thinking Skills Q3: cube model (staircase, 3 rows deep) ---- */
const CUBES_SVG = (() => {
  const s = 40, d = s * 0.5, ox = 10, rows = 3, base = 3 * s + rows * d + 10;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#f2c48d") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#d9944a") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#fbe3c4");
  const HEIGHTS = [[1, 1, 1], [2, 2, 1], [3, 3, 2]]; // [front row, middle row, back row], left to right
  let g = "";
  for (let y = rows - 1; y >= 0; y--) for (let x = 0; x < 3; x++) for (let z = 0; z < HEIGHTS[y][x]; z++) g += cube(x, y, z);
  const W = ox + 3 * s + rows * d + 12, Hh = base + 8;
  return `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" role="img" aria-label="A model made of identical cubes on a base 3 cubes long and 3 cubes deep, with no gaps in the base. It rises like a staircase towards the back. Front row, left to right: stacks of 1, 1 and 1 cube. Middle row: stacks of 2, 2 and 1. Back row: stacks of 3, 3 and 2.">${g}</svg>`;
})();

/* ---- Maths Q2: line graph of a sunflower's height ---- */
const SUN_SVG = (() => {
  const data = [10, 20, 40, 70, 90, 110, 120];
  const ox = 52, top = 16, h = 224, step = 40, max = 140;
  const Y = v => top + h - (v / max) * h, X = i => ox + 22 + i * step;
  const W = X(data.length - 1) + 26;
  let g = "";
  for (let v = 0; v <= max; v += 10) {
    const lab = v % 20 === 0;
    g += `<line x1="${ox}" y1="${Y(v)}" x2="${W - 8}" y2="${Y(v)}" stroke="${lab ? "#9aa5b8" : "#dde2ea"}" stroke-width="1"/>`;
    if (lab) g += `<text x="${ox - 8}" y="${Y(v) + 5}" font-size="14" text-anchor="end" fill="${INK}">${v}</text>`;
  }
  g += `<line x1="${ox}" y1="${top}" x2="${ox}" y2="${top + h}" stroke="${INK}" stroke-width="1.5"/>`;
  g += `<polyline points="${data.map((v, i) => `${X(i)},${Y(v)}`).join(" ")}" fill="none" stroke="#2e8b57" stroke-width="2.5"/>`;
  data.forEach((v, i) => {
    g += `<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="#2e8b57"/>`;
    g += `<text x="${X(i)}" y="${top + h + 20}" font-size="14" text-anchor="middle" fill="${INK}">${i + 1}</text>`;
  });
  g += `<text x="${(ox + W) / 2}" y="${top + h + 40}" font-size="13" text-anchor="middle" fill="${INK}">week</text>`;
  g += `<text x="14" y="${top + h / 2}" font-size="13" text-anchor="middle" fill="${INK}" transform="rotate(-90 14 ${top + h / 2})">height (cm)</text>`;
  const Hh = top + h + 48;
  return `<svg viewBox="0 0 ${W} ${Hh}" width="${W}" height="${Hh}" role="img" aria-label="Line graph of a sunflower's height in centimetres at the end of weeks 1 to 7. The scale is labelled 0, 20, 40 and so on up to 140, with an unlabelled grid line halfway between each pair. Week 1: 10, week 2: 20, week 3: 40, week 4: 70, week 5: 90, week 6: 110, week 7: 120.">${g}</svg>`;
})();

/* ---- Maths Q3: number cards ---- */
const CARDS = `<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">${[1, 2, 3, 4].map(n => `<svg viewBox="0 0 54 70" width="54" height="70" role="img" aria-label="a card showing ${n}"><rect x="3" y="3" width="48" height="64" rx="7" fill="#fffdf6" stroke="${INK}" stroke-width="2"/><text x="27" y="46" font-size="30" font-weight="700" text-anchor="middle" fill="${INK}">${n}</text></svg>`).join("")}</div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about islands, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "In which extract does the writer show, without saying so directly, that being cut off from the mainland makes people feel safe and at ease?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 3,
        skill: "inferring feelings that are shown, not stated",
        explain: `<p>In Extract D, the writer never says “we feel safe” or “we feel relaxed”. Instead they show what happens once the last ferry leaves and the island is cut off for the night: neighbours “stroll” with their dogs, “Nobody bothers to lock a door”, and children ride “down the middle of the only road” while their parents “don’t even look up”. People who lock nothing and don’t worry about their children feel safe and at ease, and that is exactly what the writer fears a bridge would take away.</p>
                  <p class="why-not">Extract B is the trap: being cut off <em>did</em> keep something safe there, because the stick insects survived on hard-to-reach Ball’s Pyramid. But they are insects, not people, and B is a factual report that shows no one’s feelings. In Extract C, Ruby is cut off by the tide, and she feels the opposite of safe: she has to wade through deep water, and her voice “wobbled”. In Extract A the girl does feel better when she reaches the island, but that is because the rough crossing is over and Nan is waiting, not because the island is cut off.</p>`
      },
      {
        stem: "In which extract does the writer describe a place in order to explain how some creatures escaped a danger?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 1,
        skill: "understanding why a writer includes a detail",
        explain: `<p>Extract B describes Ball’s Pyramid: it “has no beach and no harbour, and landing on it is extremely difficult.” The very next words, “That turned out to matter”, tell you the description is there for a reason. The rats that wiped out the stick insects on Lord Howe Island could not get onto the steep rock, so a few insects survived there, under a single bush, until scientists found them in 2001.</p>
                  <p class="why-not">Extract C is the trap: it describes a dangerous place, and Ruby gets out of danger. But Ruby is not saved by the place: the sandbar and the rising tide are the danger, and she escapes by wading back to Dad. In Extract D, dogs are mentioned, but they are in no danger, and the island is described to show how the people live. Extract A describes a rough sea crossing, but no creatures escape anything.</p>`
      },
      {
        stem: "Which <b>two</b> extracts both use a comparison to make the sea seem like a living creature?",
        options: ["Extracts A and B", "Extracts B and D", "Extracts A and C", "Extracts C and D"],
        answer: 2,
        skill: "recognising comparisons and what they suggest",
        explain: `<p>Look for each comparison and ask what is being compared with what.</p>
                  <p><b>Extract A:</b> the swell lifts and drops the ferry “as if the sea were a horse trying to shake us off its back”. The sea is compared with a horse that wants to throw off its rider.<br>
                     <b>Extract C:</b> the water comes in “like a cat creeping up on a bird”, quietly surrounding Ruby before she notices, and later it is “tugging at her legs”. The sea is compared with a hunting cat.</p>
                  <p>In both, the sea seems alive, as if it were acting on purpose. So the answer is <b>A and C</b>.</p>
                  <p class="why-not">The traps are the other comparisons. Extract B compares Ball’s Pyramid with “a giant’s broken tooth”, but that comparison is about the shape of a rock, not the sea. Extract D compares a bridge with “taking the front door off your house”, which is about the island’s privacy, not the sea. So any pair that includes B or D is wrong, even though both of those extracts do contain a comparison.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Coach Dana:</em> “Our swimming club should move its training sessions from 6 am to 6 pm, because more of our members would come to training.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Coach Dana’s claim?</p>`,
        options: ["Most members who miss training say that nobody can drive them to the pool so early.",
                  "Members who come to training more often usually swim much faster times in their races.",
                  "The pool is much less crowded at 6 am than it is at 6 pm on most weekdays.",
                  "The coaches find it easier to plan the sessions when they are held in the evening."],
        answer: 0,
        skill: "choosing the statement that supports a claim (the reason must link the change to the result)",
        explain: `<p>The claim is that moving training from 6 am to 6 pm would make <b>more members come</b>. To support it, a statement must show that the early time is what keeps members away. A does: most members who miss training do so because nobody can drive them so early. At 6 pm that problem would be gone, so more of them could come.</p>
                  <p class="why-not">B is the trap: it is about coming to training, and it gives a good reason for members to come more often, but it says nothing about whether a 6 pm time would make them come. C is about the times, but it works the other way: a crowded pool at 6 pm is a reason <em>not</em> to move. D is about the evening time, but it is about the coaches’ planning, not about how many members would come.</p>`
      },
      {
        stem: `The Year 3 and Year 4 students each voted for one place to go on an excursion. Some numbers in the table are missing.
               ${VOTE_TABLE}
               <p style="margin:10px 0 0">The same number of Year 4 students voted for the museum as for the beach.</p>
               <p style="margin:6px 0 0">How many Year 4 students voted for the museum?</p>`,
        options: ["11", "12", "14", "28"],
        answer: 2,
        skill: "completing a two-way table, using a clue in words",
        explain: `<p><b>Step 1: Year 4 zoo.</b> 30 students voted for the zoo altogether, and 17 of them were in Year 3. So 30 − 17 = <b>13</b> Year 4 students voted for the zoo.</p>
                  <p><b>Step 2: the rest of Year 4.</b> There are 41 Year 4 students, so 41 − 13 = <b>28</b> voted for the museum or the beach.</p>
                  <p><b>Step 3: share equally.</b> The museum and the beach got the same number of Year 4 votes, so each got 28 ÷ 2 = <b>14</b>.</p>
                  <p>Check: 13 + 14 + 14 = 41 ✓. (Year 3’s museum votes are 36 − 17 − 8 = 11, so the museum got 11 + 14 = 25 altogether, the beach 8 + 14 = 22, and 30 + 25 + 22 = 77 ✓.)</p>
                  <p class="why-not">12 (B) is the trap: it takes the 17 Year 3 zoo votes away from the Year 4 total, (41 − 17) ÷ 2 = 12, instead of first working out how many <em>Year 4</em> students chose the zoo. 28 (D) is the museum and beach votes together, before sharing them equally. 11 (A) is the number of <em>Year 3</em> students who voted for the museum.</p>`
      },
      {
        stem: `This model is made of identical cubes. Its base is 3 cubes long and 3 cubes deep, with no gaps. Every cube sits on the table or on top of another cube.
               <div class="figure">${CUBES_SVG}</div>
               <p style="margin:10px 0 0">How many of the cubes <b>cannot</b> be seen in the picture?</p>`,
        options: ["4", "6", "7", "10"],
        answer: 1,
        skill: "counting cubes in a model, including the hidden ones",
        explain: `<p><b>Step 1: count all the cubes.</b> Every top you can see stands on a full stack, because there are no gaps. Front row: 1 + 1 + 1 = 3. Middle row: 2 + 2 + 1 = 5. Back row: 3 + 3 + 2 = 8. That makes <b>16 cubes</b>.</p>
                  <p><b>Step 2: count the cubes you can see.</b> Front row 3, middle row 3 (the top cube of each 2-stack, and the single cube on the right), back row 4 (the top cube of each 3-stack, and both cubes of the right-hand stack, whose side you can see). That makes <b>10</b>.</p>
                  <p><b>Step 3:</b> 16 − 10 = <b>6</b> hidden cubes: 2 under each of the two tall back stacks, and 1 under each of the two left-hand middle stacks.</p>
                  <p class="why-not">4 (A) is the trap: it finds the hidden cubes under the tall back stacks but forgets the two hiding under the middle row. 7 (C) also counts the bottom cube of the back right-hand stack as hidden, but its right side is showing. 10 (D) is the number of cubes you <em>can</em> see.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: "The number <b>47 375</b> has two 7s. What is the difference between the values of the two 7s?",
        options: ["0", "693", "6930", "6993", "7070"],
        answer: 2,
        skill: "place value: the value of a digit depends on its place",
        explain: `<p>The first 7 is in the <b>thousands</b> place, so it is worth <b>7000</b>. The second 7 is in the <b>tens</b> place, so it is worth <b>70</b>.</p>
                  <p>7000 − 70 = <b>6930</b>.</p>
                  <p class="why-not">0 (A) is the trap: it treats both digits as just “7”, but a digit’s value depends on its place. 6993 (D) reads the second 7 as 7 ones instead of 7 tens. 693 (B) moves both 7s one place too far right (700 − 7). 7070 (E) adds the two values instead of finding the difference.</p>`
      },
      {
        stem: `Lily measured her sunflower at the end of each week. The line graph shows its height.
               <div class="figure">${SUN_SVG}</div>
               <ol class="statements">
                 <li>The sunflower grew the most between week 3 and week 4.</li>
                 <li>In week 7 the sunflower was three times as tall as in week 3.</li>
                 <li>The sunflower grew 100 cm between week 2 and week 7.</li>
                 <li>The sunflower was taller than 1 metre in weeks 5, 6 and 7.</li>
               </ol>
               <p style="margin:8px 0 0">Which of these statements are correct?</p>`,
        options: ["statements 1 and 3 only", "statements 2 and 3 only", "statements 1, 3 and 4 only", "all four statements", "statements 1, 2 and 3 only"],
        answer: 4,
        skill: "reading a line graph with unlabelled grid lines to check statements",
        explain: `<p>Each unlabelled grid line is halfway between two labels, so it is worth 10 cm. The heights are: week 1 10, week 2 20, week 3 40, week 4 70, week 5 90, week 6 110, week 7 120 cm.</p>
                  <p><b>1:</b> the growth each week is 10, 20, <b>30</b>, 20, 20, 10 cm. The most is 30 cm, between week 3 and week 4 (the steepest part of the line) ✓<br>
                     <b>2:</b> 3 × 40 = 120, and week 7 is 120 cm ✓<br>
                     <b>3:</b> 120 − 20 = 100 cm ✓<br>
                     <b>4:</b> 1 metre is 100 cm. Weeks 6 and 7 are taller, but week 5 is only 90 cm ✗</p>
                  <p>So statements <b>1, 2 and 3 only</b>.</p>
                  <p class="why-not">D (all four) is the trap: in week 5 the point is on an unlabelled line just below 100, so it is 90 cm, less than 1 metre. A misses statement 2 by looking at how much the sunflower <em>grew</em> after week 3 (80 cm, twice 40) instead of how <em>tall</em> it was. B misses statement 1 by looking for where the line is highest rather than where it is steepest. C falls for both of those traps in statement 2 and statement 4.</p>`
      },
      {
        stem: `Zoe has these four number cards.
               <div class="figure">${CARDS}</div>
               <p style="margin:10px 0 0">She uses three of the cards to make a 3-digit number. How many <b>odd</b> 3-digit numbers can she make?</p>`,
        options: ["6", "12", "18", "24", "32"],
        answer: 1,
        skill: "counting combinations with a condition (each card used only once)",
        explain: `<p>An odd number ends in an odd digit, so the <b>last</b> card must be <b>1</b> or <b>3</b>. Choose that card first.</p>
                  <p><b>Ending in 1:</b> the first card can be 2, 3 or 4 (3 choices), then the middle card is one of the 2 cards left: 3 × 2 = <b>6</b> numbers (231, 241, 321, 341, 421, 431).<br>
                     <b>Ending in 3:</b> in the same way, 3 × 2 = <b>6</b> numbers (123, 143, 213, 243, 413, 423).</p>
                  <p>Altogether 6 + 6 = <b>12</b> odd numbers.</p>
                  <p class="why-not">6 (A) is the trap: it counts only the numbers ending in 1 (or only those ending in 3) and forgets the other odd card. 24 (D) counts every 3-digit number she can make, odd or even (4 × 3 × 2). 18 (C) forgets that a card used for the first digit can’t be used again for the middle digit (3 × 3 × 2). 32 (E) lets her use the same card more than once (4 × 4 × 2).</p>`
      }
    ]
  }
];
