/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 67
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>If you set out to invent the strangest animal you could, you might end up with something like an octopus. It has eight arms, three hearts and blue blood. Apart from a hard beak, shaped rather like a parrot’s, its body has no bones at all. {1} Aquarium keepers know this only too well. Octopuses have squeezed out through tiny gaps around the lids of their tanks, and one in New Zealand is said to have escaped across the floor at night and down a drainpipe that led to the sea.</p>
<p>Those eight arms are even more surprising. An octopus has about 500 million nerve cells, which carry messages around its body, and roughly two thirds of them are in its arms rather than in its head. {2} An arm can feel its way into a crack in the rocks and taste whatever it touches with its suckers, while the octopus’s eyes are busy watching something else.</p>
<p>An octopus can also vanish in plain sight. Its skin is packed with thousands of tiny sacs of colour, each one ringed by muscles that can stretch it wide to show its colour. In less than a second, an octopus can flush dark red, fade to sandy white or copy the speckles of the rock it is resting on. It can even raise little bumps and spikes on its skin, so that it looks as rough as coral or as frilly as seaweed.</p>
<p>For all their cleverness, most octopuses live for only a year or two. A mother octopus lays her eggs in a rocky den and guards them for weeks or even months, cleaning them and blowing fresh water over them. She does not leave the den even to eat, and soon after her babies hatch, she dies. {3} This puzzles many scientists. In most other clever animals, such as chimpanzees, dolphins and crows, the young stay with their parents for a long time and learn by watching them.</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "Two of them pump blood through its gills, and the third sends it round the rest of the body.",
  "Because of this, each arm can do a great deal on its own, without waiting for orders from the brain.",
  "So a young octopus has nobody to copy: everything it knows, it must work out for itself.",
  "This means that if it can push its beak through a gap, the rest of its soft body can usually follow.",
  "One of the biggest kinds, the giant Pacific octopus, can live for three to five years."
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
  title: "Eight Arms, Three Hearts",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: bags of fruit sold at a stall (totals table, step 2: a two-step chain) ---- */
const FC = (v, style = "") => `<td style="text-align:center;${style}">${v}</td>`;
const FH = v => `<th style="text-align:center">${v}</th>`;
const fruitTable = rows => `<div class="table-wrap"><table class="grid">
  <tr><th></th>${FH("Fri")}${FH("Sat")}${FH("Sun")}${FH("Total")}</tr>
  ${rows.map(([name, ...cells]) => `<tr><th>${name}</th>${cells.map(c => Array.isArray(c) ? FC(c[0], c[1]) : FC(c)).join("")}</tr>`).join("")}
</table></div>`;
const FRUIT_TABLE = fruitTable([
  ["Apples", 14, 20, "?", 52],
  ["Pears", 9, 11, 12, 32],
  ["Mangoes", 7, 12, "?", "?"],
  ["Total", 30, 43, 41, "?"]
]);
const FOUND = "background:#fdf0dc;font-weight:700";
const CHECKED = "color:#55607a;font-style:italic";
const FRUIT_DONE = fruitTable([
  ["Apples", 14, 20, ["① 18", FOUND], 52],
  ["Pears", 9, 11, 12, 32],
  ["Mangoes", 7, 12, ["② 11", FOUND], ["30", CHECKED]],
  ["Total", 30, 43, 41, ["114", CHECKED]]
]);

/* ---- Thinking Skills Q3: which net can't make an open box ---- */
// [row, column] of each square; checked by computer (rolling a cube over the net)
const BOX_NETS = [
  { cells: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]],
    desc: "A T shape: a row of three squares along the top, with two more squares going down from the middle one." },
  { cells: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]],
    desc: "A staircase: one square at the top left; under it, a row of two squares; under the second of those, another row of two squares." },
  { cells: [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]],
    desc: "A U shape: a row of three squares along the bottom, with one square sticking up from each end." },
  { cells: [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]],
    desc: "A row of two squares along the top; under the second of them starts a row of three squares going to the right." }
];
function boxNetSvg({ cells, desc }, letter) {
  const u = 34, o = 3;
  const cols = Math.max(...cells.map(c => c[1])) + 1, rows = Math.max(...cells.map(c => c[0])) + 1;
  const g = cells.map(([r, c]) => `<rect x="${o + c * u}" y="${o + r * u}" width="${u}" height="${u}" fill="#dbe9f6" stroke="${INK}" stroke-width="2"/>`).join("");
  const W = cols * u + 2 * o, H = rows * u + 2 * o;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Net ${letter}, five squares. ${desc}">${g}</svg>`;
}
const BOX_NET_OPTS = BOX_NETS.map((n, i) => boxNetSvg(n, "ABCD"[i]));

/* ---- Maths Q2: a U-shaped garden bed (not to scale) ---- */
const U_SVG = (() => {
  // drawn deliberately NOT to scale: real sizes 12 m by 7 m, notch 4 m wide and 4 m deep
  const P = [[30, 40], [150, 40], [150, 120], [215, 120], [215, 40], [300, 40], [300, 200], [30, 200]];
  let g = `<polygon points="${P.map(p => p.join(",")).join(" ")}" fill="#dff0d8" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  const t = (x, y, s, a = "middle") => `<text x="${x}" y="${y}" font-size="18" font-weight="700" text-anchor="${a}" fill="${INK}">${s}</text>`;
  g += t(165, 224, "12 m") + t(22, 126, "7 m", "end") + t(308, 126, "7 m", "start") + t(90, 32, "5 m") + t(258, 32, "3 m") + t(144, 86, "4 m", "end");
  g += `<text x="165" y="244" font-size="14" text-anchor="middle" fill="#55607a">not to scale</text>`;
  return `<svg viewBox="-20 0 368 250" width="350" height="238" role="img" aria-label="A garden bed shaped like a letter U, with every corner a right angle. The bottom side is 12 m and the left and right sides are each 7 m. Along the top, the left part is 5 m and the right part is 3 m. Between them a rectangular gap is cut down into the bed; the left side of the gap is marked 4 m deep. The width of the gap is not marked. The diagram is not drawn to scale.">${g}</svg>`;
})();

/* ---- Maths Q3: a magic square ---- */
const MC = (v, shade) => `<td style="width:46px;height:46px;text-align:center;font-size:20px;font-weight:700;padding:0;${shade ? "background:#f6d3a8" : ""}">${v}</td>`;
const magic = rows => `<div class="table-wrap"><table class="grid" style="margin:10px auto 0">${rows.map(r => `<tr>${r.map(c => Array.isArray(c) ? MC(c[0], true) : MC(c)).join("")}</tr>`).join("")}</table></div>`;
const MAGIC = magic([[6, "", ""], ["", 7, ["?"]], ["", 3, 8]]);
const MAGIC_DONE = magic([[6, "<span style='font-weight:400'>①</span> 11", "<span style='font-weight:400'>②</span> 4"], ["5", 7, ["③ 9"]], ["10", 3, 8]]);

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
        answer: 3,
        skill: "using a reference word (“this”) and a consequence of the sentence before to place a sentence",
        explain: `<p>Just before the gap, we learn that apart from its beak, an octopus has <b>no bones at all</b>. Just after it, “Aquarium keepers know <b>this</b> only too well”, and then come octopuses squeezing out through tiny gaps. So the missing sentence must explain what having no bones lets an octopus do, and it must be something that aquarium keepers would know about. Sentence <b>D</b> does both: with no bones, only the hard beak can get stuck, so if the beak fits through a gap, the soft body can follow. The keepers’ “this” then points back to D, and the escapes are examples of it.</p>
                  <p class="why-not">A is the trap: it is a true fact about the three hearts mentioned two sentences earlier. But “Two of <b>them</b>” would have to point back to the nearest plural, the bones, which the octopus doesn’t have, and aquarium keepers don’t “know this only too well” because of how blood flows. B (“Because of this, each arm can do a great deal on its own …”) is about the arms working without orders from the brain, which has nothing to do with escaping through gaps; it belongs with the nerve cells in the next paragraph. C and E are about young octopuses and how long octopuses live, which come at the end.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 1,
        skill: "using a linking phrase (“Because of this”) and seeing that the next sentence is an example",
        explain: `<p>Before the gap, we learn something surprising: two thirds of an octopus’s nerve cells are in its <b>arms</b>, not its head. After the gap comes an example of an arm working by itself: it feels its way into a crack and tastes things “while the octopus’s eyes are busy watching something else”. Sentence <b>B</b> joins the two: “<b>Because of this</b>” points back to the nerve cells, and “each arm can do a great deal on its own” is the general idea that the next sentence gives an example of.</p>
                  <p class="why-not">C is the trap: “everything it knows, it must work out for itself” sounds like an arm doing things on its own. But C is about “a young octopus” with “nobody to copy”, and nothing in this paragraph is about young octopuses or parents. D begins “This means that if it can push its beak through a gap …”, but this paragraph is about nerve cells, not gaps. A’s “Two of them” would point back to the nerve cells, and there are millions of those, not three.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 2,
        skill: "choosing the sentence that explains why a detail (the mother dying when her babies hatch) matters, linking it to the sentences after the gap",
        explain: `<p>Before the gap, the mother octopus dies soon after her babies hatch. After the gap, “<b>This</b> puzzles many scientists”, because in other clever animals “the young stay with their parents for a long time and learn by watching them”. The missing sentence must turn the mother’s death into something puzzling. Sentence <b>C</b> does: if the mother dies as her babies hatch, a young octopus “has nobody to copy”, so all its cleverness has to come from working things out alone. That is what scientists find puzzling, and the last sentence explains why, by comparing octopuses with animals whose young learn from their parents.</p>
                  <p class="why-not">E is the trap: it is about how long octopuses live, which is what this paragraph began with, so it feels as if it belongs here. But after the mother’s death it would interrupt the story of the eggs, and a long life isn’t puzzling: “This puzzles many scientists” would make no sense, and the last sentence about the young learning from their parents wouldn’t follow. (E would only fit straight after “most octopuses live for only a year or two”, and there is no gap there.) B’s “Because of this, each arm can do a great deal on its own” can’t follow the mother dying. D is about squeezing through gaps, from the first paragraph.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Mr Okafor:</em> “Our school should start a walking bus, where a parent walks a group of students to school along a set route each morning. That way, more of our students will walk to school instead of being driven.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Mr Okafor’s claim?</p>`,
        options: ["Students who walk to school often arrive more awake and ready to learn than students who are driven.",
                  "The road outside the school gate is crowded with cars every morning before the bell.",
                  "Walking buses are popular in many countries, and some have been running for years.",
                  "Many parents who drive their children say they would let them walk if an adult went too."],
        answer: 3,
        skill: "choosing the statement that supports a claim (the reason must link the change to the result)",
        explain: `<p>The claim has two parts: <b>start a walking bus</b> → <b>more students walk instead of being driven</b>. To support it, a statement must show that a walking bus would change what families actually do. D does: many parents who drive say they would let their children walk if an adult went with them, and a walking bus gives them exactly that, a parent walking with the group.</p>
                  <p class="why-not">A is the trap: it is about walking to school, and it gives a real reason why walking is <em>good</em>. But it doesn’t show that a walking bus would make more students walk. B describes a problem (crowded roads) that more walking might help, but it gives no reason to think a walking bus would get students out of the cars. C is about walking buses, but being popular elsewhere doesn’t show that they get more students walking, or that it would work at this school.</p>`
      },
      {
        stem: `Mia’s family sells bags of fruit at a market stall on Friday (Fri), Saturday (Sat) and Sunday (Sun). The table shows how many bags of each fruit they sold. Some of the numbers are missing.
               ${FRUIT_TABLE}
               <p style="margin:10px 0 0">How many bags of <b>mangoes</b> did they sell on <b>Sunday</b>?</p>`,
        options: ["9", "11", "18", "29"],
        answer: 1,
        skill: "totals table: a two-step chain, where filling one gap opens up another",
        explain: `<p>Find a row or column with only <b>one</b> number missing. Total − the numbers you know = the missing number. Fill it in, then look again: a new row or column may now have only one gap.</p>
                  <p>The Mangoes row has two gaps (Sunday and the total), and so does the Sunday column (Apples and Mangoes), so neither of them can be the start.</p>
                  <p><b>① Apples row</b>: only Sunday is missing. 52 − 14 − 20 = <b>18</b>.</p>
                  <p><b>② Sunday column</b>: now only the mangoes are missing. 41 − 18 − 12 = <b>11</b>.</p>
                  ${FRUIT_DONE}
                  <p>Check: the Mangoes total is 7 + 12 + 11 = 30. Adding the row totals, 52 + 32 + 30 = 114, and adding the column totals, 30 + 43 + 41 = 114, the same grand total ✓</p>
                  <p class="why-not">18 (C) is the trap: it is the first number found (the apples sold on Sunday), not the mangoes. 29 (D) stops one step early: it does 41 − 12 for the Sunday column and treats the missing apples as 0. 9 (A) takes a number from the wrong column: it uses the 20 apples sold on <em>Saturday</em> instead of the 18 sold on Sunday (41 − 20 − 12 = 9).</p>`
      },
      {
        stem: `Ella wants to make an <b>open box</b> (a cube with no lid) by folding a shape made of five squares along its lines.
               <p style="margin:10px 0 0">Which one of these shapes can <b>not</b> be folded to make an open box?</p>`,
        visualOptions: true,
        options: BOX_NET_OPTS,
        answer: 2,
        skill: "nets of an open box: picking a bottom square and folding the others up into the four sides",
        explain: `<p>For each shape, choose one square to be the <b>bottom</b> of the box and fold the others up. An open box needs a bottom and <b>four different sides</b>: front, back, left and right. If two squares land on the same side, the shape won’t work.</p>
                  <p><b>C:</b> make the middle square of the bottom row the bottom of the box. The squares on each side of it fold up to make the left and right sides. The two squares sticking up are joined to the <em>top</em> edges of those sides, so both of them fold round to make the <b>back</b>. They land on top of each other, and nothing makes the front. So C can’t make an open box, whichever square you choose as the bottom.</p>
                  <p class="why-not">B is the trap: a staircase doesn’t look like a box. But use the middle square as the bottom: the square on its left folds up to make the left side, the top-left square (joined to that side) folds round to make the back, the square below the bottom makes the front, and the last square (joined to the front) folds round to make the right side. Four different sides ✓. A (the T): use the square where the stem meets the top row as the bottom; the square below makes the front, the middle of the top row makes the back, and the two ends fold round to the left and right ✓. D: use the second square of the top row as the bottom; the square to its left makes the left side, the square below makes the front, the next one (joined to the front) folds round to the right side, and the last one folds round again to make the back ✓.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `In a class of <b>24</b> students, exactly <b>half</b> like maths. Of those who like maths, <b>one third</b> also play chess.
               <p style="margin:10px 0 0">How many students like maths <b>and</b> play chess?</p>`,
        options: ["16", "12", "8", "6", "4"],
        answer: 4,
        skill: "fractions: a fraction of a fraction of a group (supplied by David)",
        explain: `<p><b>Step 1:</b> half of 24 = 24 ÷ 2 = <b>12</b> students like maths.</p>
                  <p><b>Step 2:</b> one third <em>of those 12</em> = 12 ÷ 3 = <b>4</b> students like maths and play chess.</p>
                  <p class="why-not">8 (C) is the trap: it takes one third of the whole class (24 ÷ 3), skipping the words “of those who like maths”. 12 (B) stops after the first step: it is everyone who likes maths, not just the chess players. 6 (D) halves twice (24 ÷ 2 ÷ 2) instead of finding a third. 16 (A) is 24 − 8, the students left over after taking away a third of the class.</p>`
      },
      {
        stem: `This garden bed is shaped like a letter U. Every corner is a right angle.
               <div class="figure">${U_SVG}</div>
               <p style="margin:10px 0 0">What is the area of the garden bed?</p>`,
        options: ["46 m²", "68 m²", "72 m²", "84 m²", "92 m²"],
        answer: 1,
        skill: "area of a composite shape: finding an unmarked side, then a whole rectangle minus a cut-out (or adding parts)",
        explain: `<p><b>Step 1: the width of the gap.</b> The bottom side is 12 m. Along the top, 5 m + the gap + 3 m must also make 12 m, so the gap is 12 − 5 − 3 = <b>4 m</b> wide.</p>
                  <p><b>Step 2: whole rectangle minus the gap.</b> If the gap were filled in, the bed would be a rectangle 12 m by 7 m: 12 × 7 = <b>84 m²</b>. The gap is 4 m wide and 4 m deep: 4 × 4 = <b>16 m²</b>. So the area is 84 − 16 = <b>68 m²</b>.</p>
                  <p>(Check by adding parts: the left arm 5 × 7 = 35, the right arm 3 × 7 = 21, and the strip under the gap 4 wide and 7 − 4 = 3 deep, 4 × 3 = 12. 35 + 21 + 12 = 68 ✓)</p>
                  <p class="why-not">72 m² (C) is the trap: it takes the gap to be 3 m wide, because the 3 m label is right next to it (84 − 3 × 4 = 72). 84 m² (D) forgets to take the gap away. 92 m² (E) adds the two arms (35 + 21) and the whole 12 m bottom strip (12 × 3 = 36), counting the bottom corners of both arms twice. 46 m² (A) is the perimeter (the distance all the way round, in metres), not the area.</p>`
      },
      {
        stem: `In this square, the three numbers in <b>every row</b>, <b>every column</b> and <b>both diagonals</b> add up to the same total.
               ${MAGIC}
               <p style="margin:10px 0 0">What number goes in the shaded square?</p>`,
        options: ["3", "4", "9", "11", "13"],
        answer: 2,
        skill: "number puzzle: finding the total from the one complete line, then a chain of missing numbers",
        explain: `<p><b>Step 1: find the total.</b> Only one line has all three numbers: the diagonal 6, 7, 8. So every line adds up to 6 + 7 + 8 = <b>21</b>.</p>
                  <p><b>Step 2: find a line with only one gap.</b> The middle column has 7 and 3: ① 21 − 7 − 3 = <b>11</b> at the top.</p>
                  <p><b>Step 3:</b> the top row now has only one gap: ② 21 − 6 − 11 = <b>4</b>.</p>
                  <p><b>Step 4:</b> the right-hand column now has only one gap, the shaded square: ③ 21 − 4 − 8 = <b>9</b>.</p>
                  ${MAGIC_DONE}
                  <p>Check: the middle row is 5 + 7 + 9 = 21 and the other diagonal is 4 + 7 + 10 = 21 ✓</p>
                  <p class="why-not">4 (B) is the trap: it is the number found just before the shaded one, so it stops one step early. 11 (D) is the first number found. 13 (E) does 21 − 8 for the right-hand column and forgets that the top of that column is missing too. 3 (A) assumes the total is 15 (as in a square using 1 to 9), but here the total has to come from the complete diagonal: with 15, the top would be 5, the top right 4 and the shaded square 3.</p>`
      }
    ]
  }
];
