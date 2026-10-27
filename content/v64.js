/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 64
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: poem (public domain: Robert Louis Stevenson, 1850–1894) ----
   "From a Railway Carriage", A Child's Garden of Verses (1885). Text extracted
   programmatically from Project Gutenberg eBook #136 (GitHub mirror). No changes. */
const STANZAS = [
  [
    "Faster than fairies, faster than witches,",
    "Bridges and houses, hedges and ditches;",
    "And charging along like troops in a battle",
    "All through the meadows the horses and cattle:",
    "All of the sights of the hill and the plain",
    "Fly as thick as driving rain;",
    "And ever again, in the wink of an eye,",
    "Painted stations whistle by."
  ],
  [
    "Here is a child who clambers and scrambles,",
    "All by himself and gathering brambles;",
    "Here is a tramp who stands and gazes;",
    "And here is the green for stringing the daisies!",
    "Here is a cart run away in the road",
    "Lumping along with man and load;",
    "And here is a mill, and there is a river:",
    "Each a glimpse and gone forever!"
  ]
];
const PASSAGE = {
  title: "From a Railway Carriage",
  note: "Read the poem below by Robert Louis Stevenson (from <i>A Child’s Garden of Verses</i>, 1885), then answer the questions. The numbers show the verses. <i>troops</i>: soldiers; <i>driving rain</i>: rain blown hard by the wind; <i>clambers</i>: climbs using hands and feet; <i>brambles</i>: prickly bushes such as blackberries; <i>tramp</i>: a homeless person who travels about on foot; <i>green</i>: a grassy field in a village; <i>stringing the daisies</i>: making daisy chains; <i>lumping</i>: moving heavily and clumsily; <i>mill</i>: a building where grain is ground into flour.",
  html: `<div class="poem">${STANZAS.map((s, i) => `<div class="stanza"><span class="vn">${i + 1}</span>${s.map(l => `<span class="line">${l}</span>`).join("")}</div>`).join("")}</div>`
};

/* ---- Thinking Skills Q3: clear cards with painted squares ---- */
const CARD1 = ["#..", ".#.", ".#."];
const CARD2 = [".##", "...", "..#"];
const cardSvg = (rows, label, c = 30) => {
  const o = 4, W = 3 * c + 2 * o;
  let g = "";
  rows.forEach((row, r) => [...row].forEach((ch, k) => {
    g += `<rect x="${o + k * c}" y="${o + r * c}" width="${c}" height="${c}" fill="${ch === "#" ? INK : "#eef6fb"}" stroke="#7d8da3" stroke-width="1.2"/>`;
  }));
  g += `<rect x="${o}" y="${o}" width="${3 * c}" height="${3 * c}" fill="none" stroke="${INK}" stroke-width="2.4"/>`;
  return `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" role="img" aria-label="${label}: a 3 by 3 grid; rows from top to bottom, # painted black, . clear: ${rows.join(" / ")}">${g}</svg>`;
};
const CARDS_ROW = `<div style="display:flex;flex-wrap:wrap;gap:12px 36px;justify-content:center">
  <figure style="margin:0;text-align:center">${cardSvg(CARD1, "Card 1", 36)}<figcaption style="font-size:14px">Card 1</figcaption></figure>
  <figure style="margin:0;text-align:center">${cardSvg(CARD2, "Card 2", 36)}<figcaption style="font-size:14px">Card 2</figcaption></figure>
</div>`;
const CARD_OPTS = [
  ["###", ".#.", ".##"],   // card 2 not turned
  ["#.#", "##.", ".#."],   // turned anticlockwise
  ["#..", ".##", "###"],   // correct: turned clockwise
  ["##.", ".#.", "##."]    // card 2 flipped over instead of turned
].map((rows, i) => cardSvg(rows, `Picture ${"ABCD"[i]}`));

/* ---- Maths Q1: column graph with unlabelled lines ---- */
const LAPS = [["Ana", 14], ["Ben", 22], ["Cy", 8], ["Dee", 18]];
const LAPS_SVG = (() => {
  const x0 = 50, y0 = 236, h = 210, max = 30, bw = 42, gap = 26;
  const Y = v => y0 - (v / max) * h, right = x0 + 4 * (bw + gap) + 10;
  let g = "";
  for (let v = 0; v <= max; v += 2) {
    const big = v % 10 === 0;
    g += `<line x1="${x0}" y1="${Y(v)}" x2="${right}" y2="${Y(v)}" stroke="${big ? "#9aa7b8" : "#dde2ea"}" stroke-width="1"/>`;
    if (big) g += `<text x="${x0 - 8}" y="${Y(v) + 5}" font-size="14" text-anchor="end" fill="${INK}">${v}</text>`;
  }
  LAPS.forEach(([name, v], i) => {
    const x = x0 + 16 + i * (bw + gap);
    g += `<rect x="${x}" y="${Y(v)}" width="${bw}" height="${y0 - Y(v)}" fill="#6f9fcf" stroke="${INK}" stroke-width="1.5"/>
          <text x="${x + bw / 2}" y="${y0 + 20}" font-size="14" text-anchor="middle" fill="${INK}">${name}</text>`;
  });
  g += `<line x1="${x0}" y1="${Y(max) - 6}" x2="${x0}" y2="${y0}" stroke="${INK}" stroke-width="2"/>
        <line x1="${x0}" y1="${y0}" x2="${right}" y2="${y0}" stroke="${INK}" stroke-width="2"/>
        <text x="15" y="${(Y(max) + y0) / 2}" font-size="13" text-anchor="middle" fill="${INK}" transform="rotate(-90 15 ${(Y(max) + y0) / 2})">number of laps</text>`;
  return `<svg viewBox="0 0 ${right + 8} ${y0 + 30}" width="${right + 8}" height="${y0 + 30}" style="max-width:100%;height:auto" role="img" aria-label="Column graph of laps swum by four children. The scale is labelled 0, 10, 20 and 30, with four unlabelled lines between each pair of labels. Ana reaches the second line above 10. Ben reaches the first line above 20. Cy reaches the fourth line above 0. Dee reaches the fourth line above 10.">${g}</svg>`;
})();

/* ---- Maths Q2: pentagonal prism (solid; hidden edges not shown) ---- */
const PRISM_SVG = (() => {
  const cx = 92, cy = 150, R = 72, o = [92, -56];
  const front = [...Array(5)].map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  const back = front.map(([x, y]) => [x + o[0], y + o[1]]);
  const f = pts => pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
  let g = "";
  for (let i = 0; i < 5; i++) {
    const j = (i + 1) % 5, mx = (front[i][0] + front[j][0]) / 2 - cx, my = (front[i][1] + front[j][1]) / 2 - cy;
    if (mx * o[0] + my * o[1] > 0) g += `<polygon points="${f([front[i], front[j], back[j], back[i]])}" fill="${i % 2 ? "#cfe0f2" : "#b4cde8"}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  }
  g += `<polygon points="${f(front)}" fill="#e6f0fa" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
  return `<svg viewBox="0 0 270 236" width="270" height="236" role="img" aria-label="A solid prism whose two ends are pentagons (5-sided shapes). The front pentagon faces you, and the prism stretches back and to the right, so you can see the front end and some of the rectangular side faces. The hidden edges at the back are not drawn.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the poem, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "In verse 1, the horses and cattle are “charging along like troops in a battle”. What does this comparison mainly suggest?",
        options: ["The animals only seem to be charging; it is really the speaker who is on the move.",
                  "The horses and cattle were frightened by the loud noise of the train and stampeded across the meadows.",
                  "The horses and cattle were fighting one another for space in the crowded meadows beside the line.",
                  "Soldiers on horseback were riding through the fields close beside the railway line."],
        answer: 0,
        skill: "interpreting a comparison (imagery) in a poem",
        explain: `<p>Troops charging in a battle rush forward at great speed. But the horses and cattle are in the meadows, probably standing still and grazing: it is the speaker, in the train, who is moving fast. From the carriage window, though, they seem to rush past, just as the “Bridges and houses, hedges and ditches” do and the “Painted stations whistle by”. The comparison shows how fast the train is going by making everything outside seem to charge past it.</p>
                  <p class="why-not">B is the trap: it explains the charging by inventing a reason (the animals were frightened by the train), but the poem never says the animals move at all. Stations don’t really whistle by either: it is all how things look from the train. C takes the word “battle” literally, as if the animals were fighting. D takes “troops” literally, as if there were real soldiers; the comparison only says the animals are <em>like</em> troops.</p>`
      },
      {
        stem: "Read this line from verse 2: “And here is the green for stringing the daisies!” What does it suggest about the speaker?",
        options: ["He is sad because he is not allowed to get off the train and play there.",
                  "He remembers a day when he made daisy chains on that very green.",
                  "He spots a perfect place to play and is delighted by it for a moment.",
                  "He is bored with the view and wishes the train would go even faster."],
        answer: 2,
        skill: "working out feelings shown rather than stated",
        explain: `<p>The speaker doesn’t say how he feels, but the line shows it. He calls it “the green for stringing the daisies”, as if this patch of grass were made for making daisy chains, which is just what a child would love to do. The exclamation mark shows his excitement. But the very next line moves straight on to a cart, because the train has already carried him past: “Each a glimpse and gone forever!” So he is delighted by the green, but only for a moment.</p>
                  <p class="why-not">A is the trap: the green does disappear at once, and it is easy to imagine a child being disappointed. But nothing in the poem says he is sad or wants to get off; the exclamation mark shows excitement, and he is just as excited by the next sight. B adds something the poem never mentions: there is no sign he has been there before. D is the opposite of the poem’s mood: everything flashes past “in the wink of an eye”, and he is eager to point out each new sight.</p>`
      },
      {
        stem: "In verse 2, the poet lists one sight after another: a child, a tramp, a green, a cart, a mill and a river. Why does he list them in this way?",
        options: ["To show how many different kinds of people and places there are in the country.",
                  "To make us feel the speed of the train without describing the train itself.",
                  "To show that the speaker is trying hard to remember every sight he passes.",
                  "To show that the speaker wishes the train would stop so he could join in."],
        answer: 1,
        skill: "understanding why a writer includes a detail (the effect of a list)",
        explain: `<p>Verse 2 never mentions the train, but we feel its speed. Each sight gets only a line or two, and many lines begin “Here is …” or “And here is …”, as if the speaker were pointing at each one as it flashes past the window. Before we can think about the tramp, we are at the green; before we can think about the green, a cart is lumping along the road. The quick change from one sight to the next is how fast the train is going, as the last line says: “Each a glimpse and gone forever!”</p>
                  <p class="why-not">A is the trap: the list really does include different people and places (a child, a tramp, a man with a cart, a mill, a river), but the poem is not about how varied the countryside is; each one is only a glimpse from a speeding train. C picks up on “gone forever”, but the speaker never tries to remember anything; he is excited by each new sight and lets it go. D picks up on the child gathering brambles and the green for daisy chains, but the speaker never says he wants to stop; the exclamation marks show he is enjoying the ride.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Jack’s drawer holds 12 loose socks: <b>6 black</b>, <b>4 grey</b> and <b>2 white</b>. It is dark, so he takes socks out without being able to see their colours.</p>
               <p class="quote"><em class="speaker">Mia:</em> “If Jack takes out 3 socks, he can be sure that at least two of them are the same colour.”</p>
               <p class="quote"><em class="speaker">Leo:</em> “If Jack takes out 10 socks, he can be sure that at least two of them are white.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Mia only", "Leo only", "Both Mia and Leo", "Neither of them"],
        answer: 3,
        skill: "deciding whose reasoning is correct (certainty: thinking about the worst case)",
        explain: `<p>“Sure” means it must happen even if Jack is as unlucky as possible. So check the <b>worst case</b> for each person.</p>
                  <p><b>Mia:</b> the unluckiest 3 socks are one of each colour: black, grey and white. Then no two are the same colour, so 3 socks are not enough to be sure (it takes 4). Mia is wrong.</p>
                  <p><b>Leo:</b> the unluckiest start is every sock that is <em>not</em> white: 6 black + 4 grey = 10 socks, with no white at all. To be sure of two white socks, Jack must take all 12. Leo is wrong.</p>
                  <p>Neither is correct, so the answer is <b>D</b>.</p>
                  <p class="why-not">C (both) is the trap: Mia’s 3 matches the 3 colours, and Leo’s 10 is exactly the number of socks that aren’t white, so both sound right. But 3 socks can be one of each colour, and after the 10 non-white socks Jack still needs 2 more. A (Mia only) and B (Leo only) each fall for one of those two traps.</p>`
      },
      {
        stem: `In a secret code, each letter is always changed into the same digit, and the code follows one more rule.
               <div class="table-wrap"><table class="grid">
                 <tr><th>Word</th><th style="text-align:center">Code</th></tr>
                 <tr><td>BEAT</td><td style="text-align:center">2 4 9 6</td></tr>
                 <tr><td>TUBE</td><td style="text-align:center">9 6 8 2</td></tr>
               </table></div>
               <p style="margin:10px 0 0">What is the code for <b>TUBA</b>?</p>`,
        options: ["2 8 6 4", "4 6 8 2", "4 8 6 2", "2 6 8 4"],
        answer: 1,
        skill: "working out a code with an extra rule from two examples",
        explain: `<p><b>Step 1: try reading the codes forwards.</b> BEAT would give T = 6, but TUBE would give T = 9. A letter always has the same digit, so the codes can’t be read forwards.</p>
                  <p><b>Step 2: try the codes backwards.</b> BEAT backwards is T A E B → 2 4 9 6, so T = 2, A = 4, E = 9, B = 6. TUBE backwards is E B U T → 9 6 8 2: E = 9 ✓, B = 6 ✓, U = 8, T = 2 ✓. Everything fits, so the extra rule is that the word is written <b>backwards</b>.</p>
                  <p><b>Step 3:</b> TUBA backwards is A B U T → <b>4 6 8 2</b>.</p>
                  <p class="why-not">2 8 6 4 (A) is the trap: it has the right digit for every letter but forgets the extra rule, so the word isn’t written backwards. 4 8 6 2 (C) writes the word backwards but mixes up U and B, whose digits 6 and 8 sit side by side in TUBE’s code. 2 6 8 4 (D) makes both mistakes.</p>`
      },
      {
        stem: `These two cards are made of clear plastic, with some squares painted black.
               <div class="figure">${CARDS_ROW}</div>
               <p style="margin:10px 0 0">Card 2 is given a <b>quarter turn clockwise</b> and then laid exactly on top of card 1. Which picture shows what you see?</p>`,
        visualOptions: true,
        options: CARD_OPTS,
        answer: 2,
        skill: "turning a pattern a quarter turn and combining it with another",
        explain: `<p><b>Step 1: turn card 2 a quarter turn clockwise.</b> The top row turns to become the right-hand column (read from top to bottom), and the bottom-right corner moves to the bottom-left corner. So card 2’s squares at the top-middle and top-right move to the middle-right and bottom-right, and its bottom-right square moves to the bottom-left.</p>
                  <p><b>Step 2: lay it on card 1.</b> Card 1 has the top-left, the centre and the bottom-middle. Together you see the top-left, the centre and middle-right, and the whole bottom row. That is picture <b>C</b>.</p>
                  <p class="why-not">A is the trap: it lays card 2 on top without turning it. B turns card 2 anticlockwise instead of clockwise. D flips card 2 over like a page instead of turning it, so its pattern becomes a mirror image.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `The graph shows how many laps four children swam.
               <div class="figure">${LAPS_SVG}</div>
               <p style="margin:10px 0 0">How many more laps did Ben swim than Cy?</p>`,
        options: ["7", "8", "14", "17", "30"],
        answer: 2,
        skill: "reading a column graph with unlabelled lines",
        explain: `<p>From 0 to 10 there are 5 equal steps (4 unlabelled lines in between), so each line is worth 10 ÷ 5 = <b>2 laps</b>.</p>
                  <p>Ben reaches the first line above 20: 20 + 2 = <b>22</b>. Cy reaches the fourth line above 0: 4 × 2 = <b>8</b>. So Ben swam 22 − 8 = <b>14</b> more laps.</p>
                  <p class="why-not">17 (D) is the trap: it counts each line as 1 lap, so Ben looks like 21 and Cy like 4. 7 (A) counts the 7 lines between the tops of the two columns but forgets that each line is worth 2. 8 (B) is how many laps Cy swam, not how many more Ben swam. 30 (E) adds the two children’s laps instead of finding the difference.</p>`
      },
      {
        stem: `Mia wants to build a skeleton model of this prism. She will use a straw for each edge and a small ball of modelling clay for each corner (vertex). Both ends of the prism are pentagons (5-sided shapes).
               <div class="figure">${PRISM_SVG}</div>
               <p style="margin:10px 0 0">How many straws and balls of clay will she need altogether?</p>`,
        options: ["25", "30", "32", "40", "45"],
        answer: 0,
        skill: "3D shapes: edges and vertices of a prism, including the hidden ones",
        explain: `<p><b>Straws (edges):</b> 5 round the front pentagon, 5 round the back pentagon and 5 joining the front to the back: 5 + 5 + 5 = <b>15</b>.</p>
                  <p><b>Clay balls (corners):</b> 5 at the front and 5 at the back: <b>10</b>.</p>
                  <p>Altogether 15 + 10 = <b>25</b>.</p>
                  <p class="why-not">30 (B) is the trap: it counts the edges joining front and back once for each rectangle beside them, but each of those edges is shared by two rectangles, so it is only one straw. 40 (D) counts the edges face by face (5 + 5 + 5 × 4 = 30 straws), so every edge is counted twice. 45 (E) gives every straw its own ball at each end (30 balls), but each corner joins three straws. 32 (C) adds the 7 faces too, though faces don’t need straws or clay.</p>`
      },
      {
        stem: `Coach Lee needs exactly 26 bottles of water for sports day. The shop sells water like this:
               <div class="table-wrap"><table class="grid">
                 <tr><th>single bottle</th><td style="text-align:center">$2</td></tr>
                 <tr><th>pack of 6 bottles</th><td style="text-align:center">$9</td></tr>
                 <tr><th>pack of 10 bottles</th><td style="text-align:center">$16</td></tr>
               </table></div>
               <p style="margin:10px 0 0">She buys exactly 26 bottles in the cheapest possible way. How much less does she pay than she would pay for 26 single bottles?</p>`,
        options: ["$7", "$8", "$10", "$11", "$12"],
        answer: 4,
        skill: "best value: comparing price per item and making an exact number",
        explain: `<p><b>Step 1: price per bottle.</b> Single: $2. Pack of 6: $9 ÷ 6 = <b>$1.50</b>. Pack of 10: $16 ÷ 10 = $1.60. The pack of 6 is the best value, even though the pack of 10 is bigger.</p>
                  <p><b>Step 2: make 26 with as many packs of 6 as possible.</b> 4 packs of 6 = 24 bottles for $36, and 2 single bottles for $4: <b>$40</b>. (Every other way costs more, for example 10 + 10 + 6 costs $41, and 10 + 6 + 6 + 4 singles costs $42.)</p>
                  <p><b>Step 3:</b> 26 single bottles cost 26 × $2 = $52, so she pays $52 − $40 = <b>$12</b> less.</p>
                  <p class="why-not">$11 (D) is the trap: it uses the biggest packs first (two packs of 10 and a pack of 6, $41), but the pack of 10 costs more per bottle. $8 (B) buys two packs of 10 and 6 single bottles ($44). $10 (C) buys one pack of 10, two packs of 6 and 4 single bottles ($42). $7 (A) buys 5 packs of 6 ($45), which is 30 bottles, not exactly 26.</p>`
      }
    ]
  }
];
