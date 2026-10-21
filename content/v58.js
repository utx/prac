/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 58
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>On 12 June 1817, a 32-year-old forestry official named Karl Drais set off from the German city of Mannheim on a machine of his own design. {1} Instead, Drais sat on a small seat between the wheels and pushed himself along with his feet, first one and then the other, like someone running while sitting down.</p>
<p>Drais called his invention a <i>Laufmaschine</i>, German for “running machine”. That day he rode to a coaching inn and back, a round trip of about 14 kilometres, in roughly an hour. {2} Before long, newspapers were writing about the machine, and it had picked up a string of nicknames. In England it became known as the “hobby horse” or the “dandy horse”.</p>
<p>But why would anyone want a horse with wheels instead of legs? Some historians think the answer begins with a volcano. In 1815, Mount Tambora, in what is now Indonesia, erupted so violently that its ash and gases dimmed the sunlight around the world. In Europe, 1816 became known as “the year without a summer”. Crops failed, food for animals ran short, and many horses died or were killed because their owners could not feed them. {3}</p>
<p>The running machine was only a craze for a short time, and it was decades before anyone fitted pedals to a two-wheeler. But the next time you see a small child scooting along on a balance bike, pushing with both feet, you will know they are riding something very like the first bicycle of all.</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "It had a wooden frame, two wheels set one behind the other and a handlebar for steering, but no pedals.",
  "A “horse” that never needed to be fed must have seemed like a very good idea.",
  "Within a few years, riders were being banned from footpaths in several countries, because they went too fast for the people walking there.",
  "That may not sound like much today, but it was far quicker than walking the same distance.",
  "This proves that Drais built his machine because so many horses had died."
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
  title: "The Bicycle With No Pedals",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q3: reflection of a two-colour shape in a mirror line ---- */
const BLUE = "#5b8fd1", ORANGE = "#f2a541";
// the shape, on a grid 8 squares wide and 4 tall; the mirror line is the middle line (x = 4)
const SHAPE = [[0, 0, BLUE], [1, 0, BLUE], [1, 1, BLUE], [1, 2, ORANGE], [2, 2, ORANGE]];
const cellsDesc = cells => cells.map(([c, r, col]) => `${col === BLUE ? "blue" : "orange"} in column ${c + 1}, row ${r + 1}`).join("; ");
function gridSvg(cols, cells, mirrorAt, label, s = 30) {
  const o = 4, W = cols * s + 2 * o, H = 4 * s + 2 * o;
  let g = "";
  cells.forEach(([c, r, col]) => { g += `<rect x="${o + c * s}" y="${o + r * s}" width="${s}" height="${s}" fill="${col}"/>`; });
  for (let k = 0; k <= cols; k++) g += `<line x1="${o + k * s}" y1="${o}" x2="${o + k * s}" y2="${o + 4 * s}" stroke="#9aa6b8" stroke-width="1"/>`;
  for (let k = 0; k <= 4; k++) g += `<line x1="${o}" y1="${o + k * s}" x2="${o + cols * s}" y2="${o + k * s}" stroke="#9aa6b8" stroke-width="1"/>`;
  cells.forEach(([c, r]) => { g += `<rect x="${o + c * s}" y="${o + r * s}" width="${s}" height="${s}" fill="none" stroke="${INK}" stroke-width="1.6"/>`; });
  g += `<line x1="${o + mirrorAt * s}" y1="${o - 4}" x2="${o + mirrorAt * s}" y2="${o + 4 * s + 4}" stroke="#c0392b" stroke-width="3.5" stroke-dasharray="7 4"/>`;
  return `<svg viewBox="0 0 ${W} ${H + 4}" width="${W}" height="${H + 4}" role="img" aria-label="${label}">${g}</svg>`;
}
const MIRROR_SVG = gridSvg(8, SHAPE, 4,
  `A grid 8 squares wide and 4 squares tall, with a dashed red mirror line running down the middle, after column 4. On the left of the mirror line is a shape made of shaded squares: ${cellsDesc(SHAPE)} (rows counted from the top). The right half of the grid is empty.`);
// options show only the right half of the grid (columns 5 to 8 become columns 1 to 4), mirror line on the left edge
const OPT_CELLS = [
  // A: slid across without flipping
  [[0, 0, BLUE], [1, 0, BLUE], [1, 1, BLUE], [1, 2, ORANGE], [2, 2, ORANGE]],
  // B: turned upside down (half turn) instead of flipped
  [[3, 3, BLUE], [2, 3, BLUE], [2, 2, BLUE], [2, 1, ORANGE], [1, 1, ORANGE]],
  // C: flipped, but pushed up against the mirror line
  [[2, 0, BLUE], [1, 0, BLUE], [1, 1, BLUE], [1, 2, ORANGE], [0, 2, ORANGE]],
  // D: correct reflection
  [[3, 0, BLUE], [2, 0, BLUE], [2, 1, BLUE], [2, 2, ORANGE], [1, 2, ORANGE]]
];
const MIRROR_OPTS = OPT_CELLS.map((cells, i) => gridSvg(4, cells, 0,
  `Option ${"ABCD"[i]}: the right-hand half of the grid, 4 squares wide, with the mirror line along its left edge. Shaded squares, counting columns from the mirror line and rows from the top: ${cellsDesc(cells)}.`, 26));

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
        answer: 0,
        skill: "using a reference word (“It”) and a linking word (“Instead”) to place a sentence",
        explain: `<p>Look at both sides of the gap. Before it, Drais sets off on “a machine of his own design”, but we aren’t told what it was like. After it comes “<b>Instead</b>, Drais … pushed himself along with his feet”. “Instead” means “in place of something just mentioned”, so the missing sentence must mention something the machine did <em>not</em> have. Sentence <b>A</b> does both jobs: “It” points back to the machine, and it ends with “but <b>no pedals</b>”, so “Instead, … pushed himself along with his feet” follows perfectly.</p>
                  <p class="why-not">B is the trap: it calls the machine a “horse”, and the machine is a kind of horse with wheels. But nothing about feeding horses has been mentioned yet; that comes in the third paragraph with the volcano. B also gives “Instead” nothing to replace. D begins with “That”, which would have to point back to a distance or a time, and none has been given yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 3,
        skill: "using a reference word (“That”) and the order of events to place a sentence",
        explain: `<p>Just before the gap, we learn how far Drais rode (about 14 kilometres) and how long it took (roughly an hour). Sentence <b>D</b> begins “<b>That</b> may not sound like much today”: “That” points back to the ride, and the sentence explains why it was impressive in 1817. It also leads naturally into the next sentence: because the machine was so much quicker than walking, “before long, newspapers were writing about the machine”.</p>
                  <p class="why-not">C is the trap: it is about the running machine and it is true. But it is in the wrong place in the story. The next sentence says that “before long” newspapers began writing about the machine and it picked up nicknames, which is the start of its fame. Riders being banned “within a few years” belongs <em>after</em> the machine became popular, not before. E (“This proves …”) has nothing to point back to here: no horses have been mentioned.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 1,
        skill: "choosing the sentence that explains why a detail (the volcano) belongs in the article",
        explain: `<p>The third paragraph starts with a question: “why would anyone want a horse with wheels instead of legs?” It then tells us about the volcano, the cold year, and the horses that died because there wasn’t enough food for them. But the volcano seems a long way from Drais’s machine, so the paragraph needs one more sentence to join the two and answer its own question. Sentence <b>B</b> does this. The “horse” in quotation marks is the running machine, and a “horse” that never needed to be fed would solve exactly the problem the paragraph has just described.</p>
                  <p class="why-not">E is the trap: it also links the dead horses to the machine, and “This” can point back to the last sentence. But E says the volcano story “proves” why Drais built his machine. The article is careful to say only that “<b>some historians think</b>” this, which means it is an idea, not a proven fact. C is about riders being banned, which has nothing to do with the volcano or the horses, and it would break the paragraph’s answer to its own question.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Every student going on the Year 4 camp must bring a sleeping bag to school on Monday morning.</p>
               <p class="quote"><em class="speaker">Mia:</em> “Tom has brought a sleeping bag to school this Monday morning, so he must be going on the Year 4 camp.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Mia has made?</p>`,
        options: ["Tom may have forgotten to pack a torch, which he may need at the camp.",
                  "Some students going on the camp may have borrowed a sleeping bag from a friend.",
                  "Students who are not going on the camp may also have a reason to bring a sleeping bag.",
                  "The camp may provide pillows and blankets, so students may not need to bring much else for sleeping."],
        answer: 2,
        skill: "spotting a mistake: reversing a rule",
        explain: `<p>The rule goes one way: <b>if</b> a student is going on camp, <b>then</b> they bring a sleeping bag. Mia has turned it round: “Tom has a sleeping bag, so he is going on camp.” But the rule says nothing about students who are <em>not</em> going on camp. Tom might be going to a sleepover after school, or bringing it for a friend. C shows the mistake: other students may also have a reason to bring a sleeping bag.</p>
                  <p class="why-not">B is the trap: it is about sleeping bags and the camp, but it is about where campers got their sleeping bags, which doesn’t change whether Tom is a camper. A is about what Tom might forget, which assumes he is going and doesn’t touch Mia’s reasoning. D is about what the camp provides, which has nothing to do with whether a sleeping bag shows that Tom is going.</p>`
      },
      {
        stem: `Tilly counts the ducks and sheep in a paddock. She counts <b>15 heads</b> and <b>42 legs</b> altogether.
               <p style="margin:10px 0 0">How many sheep are in the paddock?</p>`,
        options: ["6", "7", "9", "12"],
        answer: 0,
        skill: "number problem: heads and legs (two animals with different numbers of legs)",
        explain: `<p>Every animal has 1 head, so there are 15 animals. Imagine first that all 15 were ducks: that would be 15 × 2 = <b>30 legs</b>.</p>
                  <p>But there are 42 legs, which is 42 − 30 = <b>12 legs</b> more. Each sheep has 2 more legs than a duck, so there are 12 ÷ 2 = <b>6 sheep</b> (and 9 ducks).</p>
                  <p>Check: 6 sheep × 4 = 24 legs, 9 ducks × 2 = 18 legs, 24 + 18 = 42 ✓ and 6 + 9 = 15 heads ✓</p>
                  <p class="why-not">12 (D) is the trap: it finds the 12 extra legs but forgets that each sheep adds 2 extra legs, not 1. 9 (C) is the number of ducks, not sheep. 7 (B) adds a duck’s and a sheep’s legs to get 6 and divides 42 by 6, which only works if there are the same number of ducks and sheep.</p>`
      },
      {
        stem: `The shape is reflected in the dashed mirror line.
               <div class="figure">${MIRROR_SVG}</div>
               <p style="margin:10px 0 0">Each answer shows the right-hand half of the grid, with the mirror line on its left edge. Which one shows the reflection?</p>`,
        visualOptions: true,
        options: MIRROR_OPTS,
        answer: 3,
        skill: "reflecting a two-colour shape in a mirror line: flipping it and keeping each square’s distance from the line",
        explain: `<p>In a reflection, every square moves straight across the mirror line and ends up the <b>same distance</b> from the line on the other side. Rows stay the same; only the distance from the line is mirrored.</p>
                  <p>• The orange square nearest the line is 1 square away from it (there is one empty column between them), so its reflection is 1 square away on the other side.<br>
                     • The top-left blue square is the furthest from the line, 4 squares away, so its reflection is right at the far edge.<br>
                     The shape comes out flipped like a mirror image: the blue square that was furthest left is now furthest right, and the orange pair is nearest the line, with one empty column between it and the line. That is <b>D</b>.</p>
                  <p class="why-not">C is the trap: it is flipped the right way, but it has been pushed right up against the mirror line. The original shape doesn’t touch the line, so its reflection can’t either. A has been slid across without flipping, so it still faces the same way as the original. B has been turned upside down (a half turn): the blue part has moved to the bottom, but a reflection in an upright mirror line never moves squares up or down.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `What number goes in the box?
               <p style="margin:12px 0 0;font-size:1.25em;text-align:center">□ − 27 = 84 − 39</p>`,
        options: ["18", "45", "57", "72", "96"],
        answer: 3,
        skill: "missing number: making both sides of the equals sign the same value",
        explain: `<p>The equals sign means both sides have the same value. Work out the right side first: 84 − 39 = <b>45</b>.</p>
                  <p>So □ − 27 = 45. The box must be 27 more than 45: 45 + 27 = <b>72</b>.</p>
                  <p>Check: 72 − 27 = 45 ✓</p>
                  <p class="why-not">45 (B) is the trap: it is the value of the right-hand side, not the number in the box. 18 (A) takes 27 away from 45 instead of adding it back. 57 (C) does 84 − 27 and ignores the 39. 96 (E) notices that 27 is 12 less than 39 but moves the 84 the wrong way: taking away less means the starting number must be 12 <em>smaller</em>, not bigger (84 − 12 = 72).</p>`
      },
      {
        stem: `What is the value of
               <p style="margin:12px 0 0;font-size:1.15em;text-align:center">(1 × 44) + (3 × 44) + (5 × 44) + (7 × 44) + (9 × 44)?</p>`,
        options: ["1100", "1056", "1004", "220", "69"],
        answer: 0,
        skill: "clever calculation: grouping lots of the same number (supplied by David)",
        explain: `<p>Every bracket is some lots of 44, so add up the lots first:</p>
                  <p>1 + 3 + 5 + 7 + 9 = <b>25</b> lots of 44.</p>
                  <p>25 × 44: four 25s make 100, and 44 is 11 fours, so 25 × 44 = 11 × 100 = <b>1100</b>.</p>
                  <p>(Working out each bracket also gives 44 + 132 + 220 + 308 + 396 = 1100, but it takes much longer.)</p>
                  <p class="why-not">1056 (B) is the trap: it adds 1 + 3 + 5 + 7 + 9 wrongly as 24, and 24 × 44 = 1056. 1004 (C) works out 25 × 40 = 1000 but then adds just 4, instead of 25 × 4 = 100. 220 (D) counts the 5 brackets instead of adding the numbers in them: 5 × 44. 69 (E) adds 25 and 44 instead of multiplying.</p>`
      },
      {
        stem: `Grandma picked some lemons from her tree. She gave <b>one third</b> of them to her neighbour. Then she used <b>one quarter</b> of the lemons she had left to make lemonade.
               <p style="margin:10px 0 0">She now has <b>24</b> lemons. How many lemons did she pick?</p>`,
        options: ["30", "32", "36", "40", "48"],
        answer: 4,
        skill: "fractions: working backwards through two steps, each a fraction of a different whole",
        explain: `<p>Work backwards, one step at a time.</p>
                  <p><b>Undo the lemonade.</b> She used one quarter of what she had left, so the 24 lemons are the other <b>three quarters</b>. One quarter is 24 ÷ 3 = 8, so before the lemonade she had 4 × 8 = <b>32</b>.</p>
                  <p><b>Undo the neighbour.</b> She gave away one third, so the 32 lemons are the other <b>two thirds</b>. One third is 32 ÷ 2 = 16, so she picked 3 × 16 = <b>48</b>.</p>
                  <p>Check: 48 − 16 = 32, then a quarter of 32 is 8, and 32 − 8 = 24 ✓</p>
                  <p class="why-not">40 (D) is the trap: it adds back a quarter of 24 (24 + 6 = 30) and then a third of 30 (30 + 10 = 40). But the quarter was a quarter of the bigger amount she had before, not of the 24 left. 30 (A) makes the same mistake and stops after one step. 32 (B) undoes the lemonade correctly but forgets the neighbour. 36 (C) undoes only the neighbour’s third, as if 24 were two thirds of the lemons she picked.</p>`
      }
    ]
  }
];
