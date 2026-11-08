/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 68
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze (6 gaps, ½ mark each) ---- */
const CLOZE_TEXT = `
<p>Our guide, Lena, called it the Letterbox, and the moment I saw it I understood why. It was a slot in the rock barely taller than a school bag, and the only way through was to lie flat on my stomach, stretch my arms out in front of me and wriggle. For a moment I seriously thought about waiting outside with the backpacks.</p>
<p>Then Lena slid in head first, and I followed the soles of her boots. The rock pressed cold against my back, and the passage was so {1} that I couldn’t even lift my head to look ahead. It was only three body-lengths long, though it felt more like thirty.</p>
<p>On the other side, I stood up in a chamber so beautiful that I forgot to be scared. The ceiling was {2} with hundreds of thin, glassy straws, hanging like streamers at a party, and in the far corner a column taller than a house rose from the floor to the roof. Standing at its foot, we were completely {3}. Lena told us that each straw grows only a tiny amount every year, and that the oil from a single fingertip can stop it growing where it was touched. It took all my willpower to {4} the urge to reach up and touch one.</p>
<p>Before we left the chamber, Lena asked us to switch off our headlamps. The darkness was instant and complete, and the silence was so {5} that I could hear the people beside me breathing. Somewhere far away, a single drop of water fell.</p>
<p>Back outside in the dazzling afternoon, the others were chattering about lunch, but I kept glancing back at the dark mouth of the cave. On the drive there I had been dreading the Letterbox. Now, to my surprise, I was almost {6} to leave the cave behind.</p>`;

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
  title: "The Letterbox",
  note: "Read the text below and decide which answer best fits each gap. (A <i>straw</i> is a thin, hollow tube of mineral crystal that grows down from a cave ceiling, one drip at a time.)",
  html: clozeHtml
};

/* ---- Thinking Skills Q2: Venn diagram (instrument / sports team) ---- */
function vennSvg(only1, both, only2, outside, label) {
  const t = (x, y, s, size = 22, w = 700) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" text-anchor="middle" fill="${INK}">${s}</text>`;
  const g = `<rect x="4" y="4" width="312" height="214" rx="8" fill="#fff" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="124" cy="122" r="78" fill="#cfe3f5" fill-opacity=".75" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="196" cy="122" r="78" fill="#f6d3a8" fill-opacity=".75" stroke="${INK}" stroke-width="2"/>` +
    t(100, 32, "Instrument", 15, 600) + t(222, 32, "Sports team", 15, 600) +
    t(90, 130, only1) + t(160, 130, both) + t(230, 130, only2) + t(292, 206, outside, 18);
  return `<svg viewBox="0 0 320 222" width="320" height="222" role="img" aria-label="${label}">${g}</svg>`;
}
const VENN = vennSvg("?", "?", "?", "5", "A Venn diagram inside a box for the whole class. One circle is labelled Instrument and the other Sports team; the circles overlap. The three parts of the circles each show a question mark. Outside both circles, in the corner of the box, is the number 5.");
const VENN_DONE = vennSvg("11", "6", "8", "5", "The completed Venn diagram: 11 play an instrument only, 6 do both, 8 are in a sports team only, and 5 do neither.");

/* ---- Maths Q1: digit cards ---- */
const CARD = d => `<span style="display:inline-block;width:38px;height:48px;line-height:48px;margin:0 4px;border:2px solid ${INK};border-radius:6px;background:#fff;text-align:center;font-size:24px;font-weight:700">${d}</span>`;
const CARDS = `<div style="text-align:center;margin:10px 0" role="img" aria-label="Five digit cards: 6, 0, 3, 8 and 1.">${[6, 0, 3, 8, 1].map(CARD).join("")}</div>`;

/* ---- Maths Q2 explanation: a square, a rhombus that isn't a square, and a rectangle ---- */
const SHAPES_SVG = (() => {
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  const rt = (x, y, dx, dy) => `<polyline points="${x + dx},${y} ${x + dx},${y + dy} ${x},${y + dy}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
  const t = (x, y, s) => `<text x="${x}" y="${y}" font-size="14" text-anchor="middle" fill="${INK}">${s}</text>`;
  const sq = poly([[10, 20], [80, 20], [80, 90], [10, 90]], "#cfe3f5") + rt(10, 20, 12, 12) + rt(68, 78, 12, 12) + t(45, 112, "square");
  const rh = poly([[108, 90], [178, 90], [213, 29], [143, 29]], "#f6d3a8") + t(160, 112, "rhombus");
  const re = poly([[245, 35], [375, 35], [375, 90], [245, 90]], "#dff0d8") + rt(245, 35, 12, 12) + rt(363, 78, 12, 12) + t(310, 112, "rectangle");
  return `<svg viewBox="0 0 385 120" width="385" height="120" role="img" aria-label="Three shapes: a square with right angles marked; a rhombus with four equal sides but slanting, with no right angles; and a long rectangle with right angles marked.">${sq}${rh}${re}</svg>`;
})();

/* ---- Maths Q3: five bags of marbles ---- */
const BAGS = [["A", 5, 9], ["B", 8, 15], ["C", 4, 6], ["D", 1, 2], ["E", 6, 8]];
const BC = v => `<td style="text-align:center">${v}</td>`;
const BAG_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th>Bag</th>${BAGS.map(b => `<th style="text-align:center">${b[0]}</th>`).join("")}</tr>
  <tr><th>Red marbles</th>${BAGS.map(b => BC(b[1])).join("")}</tr>
  <tr><th>Blue marbles</th>${BAGS.map(b => BC(b[2])).join("")}</tr>
</table></div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    points: 0.5,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap. Each gap is worth half a mark.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["crammed", "compact", "cramped", "crumpled"],
        answer: 2,
        skill: "choosing between look-alike words: which one fits the meaning and the grammar",
        explain: `<p>The writer is lying flat in a slot “barely taller than a school bag”, with the rock pressing on their back and no room even to lift their head. A space that is uncomfortably small for the person in it is <b>cramped</b>.</p>
                  <p class="why-not">“Crammed” is the trap: it looks and sounds almost the same, and it is also about a tight fit. But “crammed” means stuffed full <em>of things</em> (“a cupboard crammed with toys”), and it needs “with” to say what fills it. The passage isn’t full of anything; it is just too small. “Compact” means small and neatly fitted together, which is a good thing (“a compact car”), not a squeeze you can’t lift your head in. “Crumpled” means crushed into creases, like a used tissue; rock doesn’t crumple.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["festooned", "littered", "plastered", "cluttered"],
        answer: 0,
        skill: "choosing between words close in meaning: which one matches the picture and the feeling in the text",
        explain: `<p>Two clues decide it. The straws are <em>hanging</em> “like streamers at a party”, and the chamber is “so beautiful that I forgot to be scared”. <b>Festooned</b> means decorated with things hanging in loops or strings, like streamers or bunting, so it matches both the picture and the delight.</p>
                  <p class="why-not">“Littered” is the trap: it picks up the idea of a party, but “littered with” means messily scattered over a surface, like rubbish on the floor <em>after</em> a party. It is untidy, and the writer thinks the chamber is beautiful. “Cluttered” is also untidy (too many things in the way). “Plastered” means thickly covered and stuck flat, like posters on a wall, but the straws hang down from the ceiling.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["shrunk", "belittled", "stunted", "dwarfed"],
        answer: 3,
        skill: "choosing between words close in meaning: being made to look small by something much bigger",
        explain: `<p>The column is “taller than a house”, and the group is standing right at its foot. Next to something so huge, the people look tiny. To be <b>dwarfed</b> by something is to be made to look small because the thing beside you is so much bigger.</p>
                  <p class="why-not">All four words are about being small. “Belittled” is the trap: it looks as if it means “made little”, but it means made to feel unimportant by unkind words (“She belittled my drawing”). “Shrunk” means actually became smaller, and the people did not change size. “Stunted” means stopped from growing properly, like a plant without enough light.</p>`
      },
      {
        stem: "Which word best fits <b>gap 4</b>?",
        options: ["refrain", "resist", "desist", "abstain"],
        answer: 1,
        skill: "choosing between words close in meaning, using the grammar of the words that follow (“the urge”)",
        explain: `<p>The writer badly wants to touch a straw but knows that it would harm it, so the writer has to fight the wish. You <b>resist</b> an urge: “resist” takes the urge straight after it, with no little word in between (“resist the temptation”, “resist the urge”).</p>
                  <p class="why-not">“Refrain” is the trap: it means just the right thing (to stop yourself doing something), but it needs “from”: “refrain <em>from</em> touching”. You can’t “refrain the urge”. “Desist” (stop doing something) and “abstain” (choose not to do or have something) also need “from”, so they don’t fit before “the urge” either.</p>`
      },
      {
        stem: "Which word best fits <b>gap 5</b>?",
        options: ["profound", "profuse", "proficient", "prolific"],
        answer: 0,
        skill: "choosing between look-alike words: which one fits the meaning (“a profound silence”)",
        explain: `<p>With every light off, the cave is so quiet that the writer can hear people breathing and a single far-off drop of water. A silence that deep and complete is a <b>profound</b> silence: profound means very deep or very great.</p>
                  <p class="why-not">The other three words begin the same way, which is the trap. “Profuse” means pouring out in large amounts (“profuse apologies”, “profuse bleeding”), the opposite of silence. “Prolific” means producing a lot (“a prolific writer”). “Proficient” means skilled at something (“a proficient swimmer”). None of them describes how deep a silence is.</p>`
      },
      {
        stem: "Which word best fits <b>gap 6</b>?",
        options: ["relieved", "impatient", "loath", "jubilant"],
        answer: 2,
        skill: "choosing a word from the meaning of the whole text: a change of feeling shown, not stated",
        explain: `<p>Track the writer’s feelings through the whole text. At the start the writer nearly stays outside, and on the drive there was “dreading the Letterbox”. But in the chamber the writer “forgot to be scared”, and at the end, while the others chatter about lunch, keeps “glancing back at the dark mouth of the cave”. People look back at a place they don’t want to leave. “To my surprise” and “almost” fit too: after all that dread, it is surprising to find you don’t want to go. <b>Loath</b> means unwilling (“loath to leave”), so the writer is almost unwilling to leave the cave behind. (Don’t mix it up with <i>loathe</i>, with an e, which means to hate.)</p>
                  <p class="why-not">“Relieved” is the trap: it follows on from “dreading”, and “almost relieved” sounds natural. But being relieved to escape something you dreaded would be no surprise at all, and someone who is glad to get away doesn’t keep glancing back. “Impatient” (keen to leave quickly) fits the others, who are thinking about lunch, not the writer. “Jubilant” means overjoyed, so “almost jubilant to leave” is an even stronger version of relieved: the opposite of glancing back at the cave.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Lily is in the school chess club. She asked the other eight members which school subject they like best, and seven of them said maths.</p>
               <p class="quote"><em class="speaker">Lily:</em> “Maths must be the favourite subject of most students at our school.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Lily has made?</p>`,
        options: ["Students who join a chess club may like maths more than most other students do.",
                  "Maths lessons at Lily’s school may be more fun than maths lessons at other schools.",
                  "Lily may like maths best herself, even though she did not count her own answer.",
                  "Some students at the school may not have a favourite subject at all."],
        answer: 0,
        skill: "spotting a mistake: judging a whole school from your own small group",
        explain: `<p>Lily asked only the members of the chess club, and then made a claim about <em>most students at the school</em>. That only works if the chess club is like the rest of the school. But children who choose to join a chess club may well be the kind who enjoy maths, so their answers could be very different from everyone else’s. A shows the mistake: the group she asked may like maths more than most students do.</p>
                  <p class="why-not">B is the trap: it is about maths at Lily’s school, so it sounds relevant. But if maths lessons there really were more fun, that would make Lily’s claim <em>more</em> likely to be true, so it doesn’t show what is wrong with her reasoning. C is about Lily’s own favourite, but she didn’t count herself, so it doesn’t affect her result. D is about students with no favourite, which doesn’t touch the problem of who she asked.</p>`
      },
      {
        stem: `There are <b>30</b> children in Class 4K. <b>17</b> of them play a musical instrument, and <b>14</b> of them play in a sports team. <b>5</b> children do neither.
               <div class="figure">${VENN}</div>
               <p style="margin:10px 0 0">How many children play an instrument <b>and</b> play in a sports team?</p>`,
        options: ["1", "6", "11", "25"],
        answer: 1,
        skill: "sets: using a Venn diagram to find the overlap from the totals",
        explain: `<p><b>Step 1: who is inside the circles?</b> 5 of the 30 children do neither, so 30 − 5 = <b>25</b> children are somewhere inside the two circles.</p>
                  <p><b>Step 2: who has been counted twice?</b> 17 instrument players + 14 sports players = <b>31</b>. That is more than 25 because the children who do both were counted once in each circle. 31 − 25 = <b>6</b> children do both.</p>
                  <div class="figure">${VENN_DONE}</div>
                  <p>Check: instrument only 17 − 6 = 11, sports team only 14 − 6 = 8, and 11 + 6 + 8 + 5 = 30 ✓</p>
                  <p class="why-not">1 (A) is the trap: it does 17 + 14 − 30 and forgets the 5 children who are outside both circles. 11 (C) is the number who play an instrument <em>only</em>, a different part of the diagram. 25 (D) is the number who do at least one of the two, not both.</p>`
      },
      {
        stem: `<p class="quote" style="margin-top:0">At Hillside School, only students who have been in the school band for <b>at least two years</b> can be chosen to play a solo at the end-of-year concert.</p>
               <p class="quote"><em class="speaker">Hamish:</em> “Priya only joined the band this year, so she can’t be chosen to play a solo.”</p>
               <p class="quote"><em class="speaker">Leila:</em> “Ben has been chosen to play a solo, so he must have been in the band for at least two years.”</p>
               <p style="margin:10px 0 0">If the information in the box is true, whose reasoning is correct?</p>`,
        options: ["Hamish only", "Leila only", "Both Hamish and Leila", "Neither Hamish nor Leila"],
        answer: 2,
        skill: "whose reasoning is correct: a needed condition used safely in both directions",
        explain: `<p>The rule says that being in the band for at least two years is <b>needed</b> to be chosen. It doesn’t say it is enough.</p>
                  <p><b>Hamish:</b> Priya has been in the band for less than a year, so she doesn’t have what is needed. She can’t be chosen ✓</p>
                  <p><b>Leila:</b> Ben <em>has</em> been chosen. Only students with at least two years can be chosen, so Ben must be one of them ✓</p>
                  <p>Both are correct, so the answer is C.</p>
                  <p class="why-not">A (Hamish only) is the trap: Leila’s sentence starts from the solo and works back to the two years, so it looks like the rule turned round. But the rule turned round would be “Ben has been in the band for three years, so he <b>will</b> be chosen”, which is wrong, because two years is needed, not a guarantee. Leila does the opposite: she starts from someone who was chosen, and that is safe. B (Leila only) wrongly thinks Priya might still be chosen if she plays very well, but the rule allows no exceptions. D (neither) would only be right if both had used the rule the wrong way round.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Ava has five digit cards.
               ${CARDS}
               <p style="margin:10px 0 0">She uses all five cards to make the <b>smallest</b> possible 5-digit number. What number does she make?</p>`,
        options: ["01 368", "10 368", "10 386", "13 068", "86 310"],
        answer: 1,
        skill: "place value: the smallest 5-digit number from digit cards that include a zero",
        explain: `<p>To make a number as small as possible, put the smallest digits in the places worth the most. But a 5-digit number can’t start with 0 (“01 368” is really the 4-digit number 1368).</p>
                  <p>So the ten-thousands place gets the smallest digit that isn’t 0: <b>1</b>. Then the 0 goes straight after it, in the thousands place, and the rest follow from smallest to largest: 3, 6, 8. The number is <b>10 368</b>.</p>
                  <p class="why-not">01 368 (A) is the trap: it puts the 0 first, so it isn’t a 5-digit number at all. 13 068 (D) starts with 1 but then puts the 3 before the 0, as if the 0 had to wait until later. 10 386 (C) puts the last two digits the wrong way round. 86 310 (E) is the largest number, not the smallest.</p>`
      },
      {
        stem: `Which of these statements is/are correct?
               <p style="margin:6px 0 0">1 &nbsp;Every square is also a rectangle.<br>
                  2 &nbsp;Every rhombus is also a square.<br>
                  3 &nbsp;Every rectangle is also a parallelogram.</p>`,
        options: ["1 only", "3 only", "1 and 3", "2 and 3", "1, 2 and 3"],
        answer: 2,
        skill: "2D shapes: which statements about squares, rhombuses and rectangles are correct (question bank, supplied by David)",
        explain: `<div class="figure">${SHAPES_SVG}</div>
                  <p><b>Statement 1 is correct.</b> A rectangle is any four-sided shape with four right angles. A square has four right angles, so it is a rectangle (a special one whose sides are all equal).</p>
                  <p><b>Statement 2 is wrong.</b> A rhombus has four equal sides, but its angles don’t have to be right angles. The rhombus in the picture is a “pushed-over” square: equal sides, slanting corners, so it is not a square.</p>
                  <p><b>Statement 3 is correct.</b> A parallelogram has two pairs of opposite sides that are parallel. A rectangle’s opposite sides are parallel, so it is a parallelogram.</p>
                  <p class="why-not">B (3 only) is the trap: it thinks a square can’t be a rectangle because its sides are all equal, but a rectangle only needs four right angles; its sides don’t have to be different. E (1, 2 and 3) thinks a rhombus is just a tilted square. D (2 and 3) mixes up which shape is the special case: every square is a rhombus, but not every rhombus is a square. A (1 only) forgets that a rectangle is a parallelogram.</p>`
      },
      {
        stem: `Noah will choose one of these bags and take one marble from it without looking. He wants a <b>red</b> marble.
               ${BAG_TABLE}
               <p style="margin:10px 0 0">Which bag gives him the <b>best</b> chance of taking a red marble?</p>`,
        options: ["Bag A", "Bag B", "Bag C", "Bag D", "Bag E"],
        answer: 4,
        skill: "chance: comparing the chance of red in bags with different totals (fractions), not just the number of reds",
        explain: `<p>The chance depends on how many red marbles there are <b>compared with the blue ones</b>, not on the number of red marbles alone. A good way to compare: how many blue marbles are there <b>for each red one</b>? The fewer blue marbles for each red, the better the chance.</p>
                  <p>• Bag A: 9 blue for 5 red, almost 2 blue for each red.<br>
                     • Bag B: 15 blue for 8 red, almost 2 blue for each red.<br>
                     • Bag C: 6 blue for 4 red, 1½ blue for each red.<br>
                     • Bag D: 2 blue for 1 red, exactly 2 blue for each red.<br>
                     • Bag E: 8 blue for 6 red, which is 4 blue for every 3 red, only 1⅓ blue for each red.</p>
                  <p>Bag E has the fewest blue marbles for each red one, so it gives the best chance. As fractions: E is <sup>6</sup>&frasl;<sub>14</sub> = <sup>3</sup>&frasl;<sub>7</sub> and C is <sup>4</sup>&frasl;<sub>10</sub> = <sup>2</sup>&frasl;<sub>5</sub>; with the same bottom number, <sup>15</sup>&frasl;<sub>35</sub> is more than <sup>14</sup>&frasl;<sub>35</sub>, so E beats C.</p>
                  <p class="why-not">Bag B (B) is the trap: it has the most red marbles, but it also has far more blue ones, so a red is less likely there than in E. Bag D (D) has the fewest blue marbles and only 1 more blue than red, but it has just 1 red out of 3: 2 blue for every red is the worst of all. Bag C (C) is close, and only loses to E when the fractions are compared carefully. Bag A (A) has the same number of marbles as Bag E (14) but one red fewer, so it must be worse than E.</p>`
      }
    ]
  }
];
