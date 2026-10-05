/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 38
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: narrative ---- */
const PARAS = [
  `The box with the new bookcase in it was taller than Ruby, and it said SOME ASSEMBLY REQUIRED in cheerful red letters, as if that were good news.`,
  `“I’ll do it,” Ruby said. “By myself.”`,
  `Dad looked at the box, then at Ruby, then at the instruction booklet, which was as thick as a comic. “Don’t you want this?” he asked, holding it out.`,
  `“Instructions are for people who don’t know what they’re doing.”`,
  `Dad put the booklet on the kitchen bench, face up, and went to make a cup of tea. He took a very long time making it.`,
  `Ruby tipped everything out onto the carpet. There were boards with holes, boards without holes, a bag of wooden pegs, a bag of silver screws, and a small bent tool shaped like a question mark. She sorted the pieces into piles, the way she had seen people do on cooking shows. Then she began.`,
  `By lunchtime, she had built something. It stood up, mostly. The shelves sloped gently towards the window, like a ramp for marbles, and one side was smooth and white while the other was rough and brown.`,
  `“Interesting,” said Dad, from the doorway.`,
  `Ruby didn’t answer. She was looking at the carpet, where three silver screws and two pegs lay in a neat little row, <b>like children who hadn’t been picked for a team</b>.`,
  `She walked into the kitchen. The booklet was still on the bench, exactly where Dad had left it. Ruby opened it to the first page. A cartoon man was smiling and holding up the bent tool. <i>Step 1</i>, it said. <i>Check that you have all the parts.</i>`,
  `“Dad,” she called, without looking up. “Can you hold the side while I undo it?”`,
  `Dad put down his cup, <b>which had been empty for an hour</b>.`
];
const PASSAGE = {
  title: "Some Assembly Required",
  note: "Read the story below, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: carnival results table ---- */
const CARNIVAL = [["running", 20, 25, 30], ["swimming", 25, 20, 15], ["relay", 30, 25, 10], ["tug-of-war", 10, 20, 25]];
const CARNIVAL_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th>event</th><th style="text-align:center">Red</th><th style="text-align:center">Blue</th><th style="text-align:center">Gold</th></tr>
  ${CARNIVAL.map(r => `<tr><td>${r[0]}</td>${r.slice(1).map(v => `<td style="text-align:center">${v}</td>`).join("")}</tr>`).join("")}
</table></div>`;

/* ---- Thinking Skills Q3: puzzle board ---- */
const PLACED = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [2, 0]];
const BOARD_SVG = (() => {
  const c = 34, o = 6;
  let g = "";
  for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) {
    const placed = PLACED.some(([pr, pk]) => pr === r && pk === k);
    g += `<rect x="${o + k * c}" y="${o + r * c}" width="${c}" height="${c}" fill="${placed ? "#5b7db1" : "#fff"}" stroke="${placed ? INK : "#9aa6bb"}" stroke-width="${placed ? 1 : 1}" ${placed ? "" : 'stroke-dasharray="3 3"'}/>`;
  }
  g += `<rect x="${o}" y="${o}" width="${4 * c}" height="${4 * c}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  return `<svg viewBox="0 0 ${4 * c + 12} ${4 * c + 12}" width="${4 * c + 12}" height="${4 * c + 12}" role="img" aria-label="A 4 by 4 board. One piece already fills the top-left: 3 squares in the top row, 2 in the second row and 1 in the third row. The empty gap is a staircase of 10 squares: 1 in the top row, 2 in the second, 3 in the third and all 4 in the bottom row.">${g}</svg>`;
})();
// five numbered pieces (Y, L, T, W, U), each made of 5 squares
const PIECES = [
  [[0, 1], [1, 0], [1, 1], [2, 1], [3, 1]],
  [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]],
  [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]],
  [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]],
  [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]]
];
const PIECES_SVG = `<div style="display:flex;flex-wrap:wrap;gap:14px 26px;align-items:flex-start">${PIECES.map((p, i) => {
  const c = 24, w = Math.max(...p.map(([, k]) => k)) + 1, h = Math.max(...p.map(([r]) => r)) + 1;
  const g = p.map(([r, k]) => `<rect x="${2 + k * c}" y="${2 + r * c}" width="${c}" height="${c}" fill="#9fc3e6" stroke="${INK}" stroke-width="1.3"/>`).join("");
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><b>${i + 1}</b><svg viewBox="0 0 ${w * c + 4} ${h * c + 4}" width="${w * c + 4}" height="${h * c + 4}" role="img" aria-label="Piece ${i + 1}, made of 5 squares.">${g}</svg></div>`;
}).join("")}</div>`;

/* ---- Maths Q1: column graph ---- */
const CAKES = [["Mon", 12], ["Tue", 20], ["Wed", 16], ["Thu", 8], ["Fri", 28]];
const CAKE_SVG = (() => {
  const lx = 44, top = 12, per = 6, h = 32 * per, bw = 34, gap = 22;
  let g = "";
  for (let v = 0; v <= 32; v += 4) {
    const y = top + h - v * per;
    g += `<line x1="${lx}" y1="${y}" x2="${lx + CAKES.length * (bw + gap) + 6}" y2="${y}" stroke="${v % 8 === 0 ? "#9aa6bb" : "#dde2ea"}" stroke-width="1"/>`;
    if (v % 8 === 0) g += `<text x="${lx - 8}" y="${y + 4}" font-size="12" text-anchor="end" fill="${INK}">${v}</text>`;
  }
  CAKES.forEach(([d, v], i) => {
    const x = lx + 14 + i * (bw + gap);
    g += `<rect x="${x}" y="${top + h - v * per}" width="${bw}" height="${v * per}" fill="#e0a43a" stroke="${INK}" stroke-width="1.2"/>
          <text x="${x + bw / 2}" y="${top + h + 18}" font-size="12" text-anchor="middle" fill="${INK}">${d}</text>`;
  });
  g += `<line x1="${lx}" y1="${top}" x2="${lx}" y2="${top + h}" stroke="${INK}" stroke-width="1.5"/><line x1="${lx}" y1="${top + h}" x2="${lx + CAKES.length * (bw + gap) + 6}" y2="${top + h}" stroke="${INK}" stroke-width="1.5"/>
        <text x="12" y="${top + h / 2}" font-size="12" text-anchor="middle" fill="#55607a" transform="rotate(-90 12 ${top + h / 2})">cupcakes sold</text>`;
  const W = lx + CAKES.length * (bw + gap) + 12;
  return `<svg viewBox="0 0 ${W} ${top + h + 28}" width="${W}" height="${top + h + 28}" role="img" aria-label="Column graph of cupcakes sold. The scale is labelled 0, 8, 16, 24 and 32, with an unlabelled grid line halfway between each pair. Monday 12, Tuesday 20, Wednesday 16, Thursday 8, Friday 28.">${g}</svg>`;
})();

/* ---- Maths Q2: painted block ---- */
const BLOCK_SVG = (() => {
  const s = 30, d = s * 0.5, ox = 10, base = 108;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#e9a0a0") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#c96b6b") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#f5cfcf");
  let g = "";
  for (let y = 2; y >= 0; y--) for (let x = 0; x < 4; x++) for (let z = 0; z < 2; z++) g += cube(x, y, z);
  return `<svg viewBox="0 0 ${ox + 4 * s + 3 * d + 10} ${base + 8}" width="${ox + 4 * s + 3 * d + 10}" height="${base + 8}" role="img" aria-label="A block 4 cubes long, 3 cubes deep and 2 cubes high, made of 24 small cubes.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the story, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "Why does the writer tell us, at the very end, that Dad’s cup “had been empty for an hour”?",
        options: ["To show that Dad had been too busy with his tea to notice Ruby.",
                  "To suggest that Dad was annoyed at how long Ruby was taking.",
                  "To show that Dad had stayed close by, ready for Ruby to ask.",
                  "To suggest that Dad had forgotten all about the bookcase."],
        answer: 2,
        skill: "understanding why a writer includes a detail",
        explain: `<p>If the cup had been empty for an hour, Dad wasn’t really drinking tea at all. He was staying nearby, pretending to be busy, so he would be there when Ruby needed him. This fits with the earlier hint that he “took a very long time making it”, and with him leaving the booklet face up on the bench where she would find it.</p>
                  <p class="why-not">A is the trap: Dad looks busy with his tea, but the empty cup shows that was just an excuse, and he clearly <em>did</em> notice (“Interesting,” he says from the doorway). Nothing suggests he was annoyed (B). D can’t be right, because he came to look at the bookcase.</p>`
      },
      {
        stem: "The writer says the left-over screws and pegs lay “like children who hadn’t been picked for a team”. This suggests that the pieces",
        options: ["had been left out but were meant to be used.",
                  "were too small and weak to be useful in a bookcase.",
                  "had been lined up so that Ruby could count them easily.",
                  "had rolled under the carpet and been lost for hours."],
        answer: 0,
        skill: "interpreting a comparison",
        explain: `<p>Children who aren’t picked for a team are left standing on the side, even though they came to play. In the same way, the screws and pegs were <em>supposed</em> to be part of the bookcase but were left out. That is why the bookcase leans, and why Ruby finally opens the instructions.</p>
                  <p class="why-not">C is the trap: it uses a real detail (“a neat little row”), but the comparison is about being <em>left out</em>, not about counting. The leaning shelves and Ruby undoing her work show these pieces were needed. D has no support: the pieces are lying on the carpet in plain view. B has no support in the story.</p>`
      },
      {
        stem: "The story ends before we find out whether Ruby builds the bookcase properly. What is the most likely reason the writer ends it here?",
        options: ["The writer wants readers to decide whether instructions are worth reading.",
                  "The bookcase cannot be fixed, and the writer wants to avoid a sad ending.",
                  "Dad is about to take over and finish the whole job on his own.",
                  "The change that matters most, Ruby asking for help, has already happened."],
        answer: 3,
        skill: "understanding why a story ends where it does (structure)",
        explain: `<p>The story is really about Ruby, not the bookcase. It begins with her refusing help (“By myself”, “Instructions are for people who don’t know what they’re doing”) and ends with her reading Step 1 and asking, “Can you hold the side while I undo it?” Once she has changed, the story has done its job, so the writer stops there. Whether the bookcase ends up straight doesn’t matter.</p>
                  <p class="why-not">A is the trap: instructions are a big part of the story, but the writer has already shown what happens without them, and Ruby has clearly decided to use them, so readers aren’t left to decide. B has no support: Ruby is going to “undo it” and start again. C misreads the last lines: Ruby asks Dad only to <em>hold the side</em>, so she is still doing the job herself.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `This term, the school library started playing quiet music at lunchtime. Since then, students have borrowed many more books than before.
               <p class="quote"><em class="speaker">The librarian:</em> “The music must be making students want to read more.”</p>
               <p style="margin:10px 0 0">Which one of the following sentences shows the mistake the librarian has made?</p>`,
        options: ["Some students may not enjoy the kind of music that is played.",
                  "The library may also have started a reading competition.",
                  "Many students may say that they enjoy the lunchtime music.",
                  "Other schools may also play music in their libraries at lunchtime."],
        answer: 1,
        skill: "spotting a mistake: ignoring another possible cause",
        explain: `<p>The librarian sees two things happen at the same time (music starts, borrowing goes up) and decides the first <em>caused</em> the second. But something else that changed this term could explain the extra borrowing. A reading competition would do exactly that. B shows the mistake.</p>
                  <p class="why-not">C is the trap: it is about the music, and if anything it <em>supports</em> the librarian, so it doesn’t show a mistake. Enjoying the music doesn’t point to any other reason for the extra borrowing. A is about a few students and doesn’t explain why borrowing went up overall. D tells us nothing about why borrowing rose at this school.</p>`
      },
      {
        stem: `Three school houses, Red, Blue and Gold, scored these points in the four events at a sports carnival.
               ${CARNIVAL_TABLE}
               <p style="margin:10px 0 0">The house with the most points altogether wins the carnival. Which house won?</p>`,
        options: ["Red", "Gold", "Blue", "Red and Gold tied"],
        answer: 2,
        skill: "reading a table and combining the data",
        explain: `<p>Add up each house’s points:</p>
                  <p>• Red: 20 + 25 + 30 + 10 = <b>85</b><br>
                     • Blue: 25 + 20 + 25 + 20 = <b>90</b><br>
                     • Gold: 30 + 15 + 10 + 25 = <b>80</b></p>
                  <p><b>Blue</b> has the most points, even though it didn’t win a single event.</p>
                  <p class="why-not">D is the trap: Red and Gold each <em>won</em> two events (Red won swimming and the relay, Gold won running and tug-of-war), but the carnival is decided by total points, not by events won. A and B pick a house with a top score in one event.</p>`
      },
      {
        stem: `One piece is already in place on a square board. Two of the numbered pieces below will fill the gap exactly, with no overlaps.
               <div class="figure">${BOARD_SVG}</div>
               <div class="figure">${PIECES_SVG}</div>
               <p style="margin:10px 0 0">Pieces can be turned around or flipped over. Which <b>two</b> pieces fill the gap?</p>`,
        options: ["1 and 4", "2 and 3", "1 and 5", "2 and 4"],
        answer: 3,
        skill: "fitting two shapes into a gap (turning and flipping in your head)",
        explain: `<p>Every piece has 5 squares and the gap has 10, so counting squares doesn’t help. A good place to start is the <b>bottom row</b>, which is 4 squares long. Pieces 1 and 2 both have a straight line of 4, so try each one there.</p>
                  <p>Piece <b>2</b> works: lay it along the bottom row with its extra square pointing up at the right-hand end. What is left is a staircase: 1 square at the top right, then 2, then 2. That is exactly piece <b>4</b>, turned so the steps go down to the left. (You can also stand piece 2 up the right-hand side instead; the same staircase is left over, so the answer is still 2 and 4.)</p>
                  <p class="why-not">A (1 and 4) is the trap: piece 4 really is a staircase, like the gap, so it is tempting. But put piece 1 along the bottom row and its extra square pokes up into the second row from the bottom. The 5 squares left over then either make a 2 × 2 block with one extra square (not piece 4 or any other piece) or leave one square cut off on its own. B and C don’t work either: whichever way you place pieces 3 or 5, you are always left with squares that the other piece can’t cover.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `The graph shows how many cupcakes a school stall sold each day.
               <div class="figure">${CAKE_SVG}</div>
               <p style="margin:10px 0 0">How many more cupcakes were sold on Friday than on Monday?</p>`,
        options: ["4", "8", "16", "28", "40"],
        answer: 2,
        skill: "reading a column graph with unlabelled grid lines",
        explain: `<p>The labels go up in 8s, and there is one grid line halfway between each pair, so each grid line is worth <b>4</b>.</p>
                  <p>Friday’s column reaches 28 (halfway between 24 and 32). Monday’s reaches 12 (halfway between 8 and 16).</p>
                  <p>28 − 12 = <b>16</b>.</p>
                  <p class="why-not">4 (A) is the trap: Friday is 4 grid lines higher than Monday, but each line is worth 4 cupcakes, not 1. 8 (B) counts each grid line as 2. 28 (D) is Friday on its own, and 40 (E) adds the two days instead of finding the difference.</p>`
      },
      {
        stem: `A block is made from 24 small cubes, as shown. The whole outside of the block, <b>including the bottom</b>, is painted red.
               <div class="figure">${BLOCK_SVG}</div>
               <p style="margin:10px 0 0">The block is then taken apart. How many of the small cubes have red paint on <b>exactly one</b> face?</p>`,
        options: ["0", "4", "8", "12", "16"],
        answer: 1,
        skill: "visualising the faces of cubes in a 3D shape",
        explain: `<p>The block is only 2 cubes high, so <b>every</b> small cube is in either the top layer or the bottom layer. Every cube has at least one painted face (its top or its bottom), so there are no unpainted cubes inside.</p>
                  <p>A cube has <em>exactly one</em> painted face only if it isn’t on any of the four sides. In each layer (4 × 3), the cubes that don’t touch a side are the 2 in the middle of the middle row. That is 2 in the top layer and 2 in the bottom layer: <b>4</b> cubes.</p>
                  <p class="why-not">0 (A) is the trap: in a bigger block the middle cubes are hidden inside with no paint, but this block is only 2 high, so the middle cubes still have a painted top or bottom. 8 (C) is the number of corner cubes (3 painted faces). 12 (D) is the number with exactly 2 painted faces. 16 (E) is 24 − 8, every cube that isn’t a corner.</p>`
      },
      {
        stem: `Mia has read <b>two-fifths</b> of her book. She still has <b>90 pages</b> left to read.
               <p style="margin:10px 0 0">How many pages are in the whole book?</p>`,
        options: ["36", "60", "126", "150", "225"],
        answer: 3,
        skill: "fractions: finding the whole from a part",
        explain: `<p>Mia has read 2 of the 5 equal parts, so the 90 pages she has <em>left</em> are the other <b>3 parts</b>.</p>
                  <p>One part = 90 ÷ 3 = <b>30 pages</b>.</p>
                  <p>The whole book is 5 parts: 5 × 30 = <b>150 pages</b>.</p>
                  <p class="why-not">225 (E) is the trap: it treats the 90 pages as the two-fifths, but two-fifths is what she has already <em>read</em>. 60 (B) is the number of pages she has read (2 × 30), not the whole book. 36 (A) is two-fifths of 90, and 126 (C) adds that to 90.</p>`
      }
    ]
  }
];
