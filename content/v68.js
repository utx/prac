/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 68
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `My little brother Sam spent the whole drive to the caves asking whether there would be bats. By the time we reached the entrance, he was holding Mum’s hand so tightly that her fingers had turned white. Inside, the path wound down past dripping rock, and the air grew cool and damp. Then our guide stopped beside an underground creek and asked us to be completely silent. One by one, she switched off the lights. The darkness was so thick that I couldn’t see my own hand. For a few seconds, nobody breathed. Then, slowly, the ceiling above us began to glow with hundreds of tiny blue-green lights, as if someone had scattered a handful of stars across the rock. The guide whispered that they weren’t worms at all, but the young of a small fly, glowing to lure insects into sticky threads. I hardly heard her. I was watching Sam. He had let go of Mum’s hand, and he was pointing upwards with his mouth wide open. On the way out, he asked if we could come back tomorrow.`,
  `In many show caves, visitors are asked not to touch the rock formations. Some people think this rule is fussy. After all, what harm can one finger do to solid stone? The answer is: more than you might think. Our skin is covered in natural oils. When a finger touches a stalactite that is still growing, it leaves behind a thin, greasy film, and the dripping water can no longer add new crystal in that spot. Dirt from our hands also stains the gleaming white stone a dull brown. Cave guides call formations that are still growing “live”, and that is a good way to think of them. A stalagmite as tall as a child may have been growing for many thousands of years. It can be spoiled forever in a second by someone who just wanted to know what it felt like. The least we can do is keep our hands to ourselves.`,
  `“Just to the first bend,” Priya had promised, and the cave mouth had looked friendly enough in the afternoon sun. Now the bend was behind them, and the torch was flickering. Kai gave it a shake. The beam shrank to an orange thread, and then it was gone. The darkness rushed in from every side. Priya could feel the cave breathing cold air on the back of her neck, and somewhere deeper inside, water dripped, slow and patient, as if the cave were waiting to see what they would do. Kai’s hand found hers. “Priya?” His voice was very small. She made herself breathe slowly. They had come in with the trickling creek on their left, she remembered, so on the way out it must be on their right. “Hold on to my jumper,” she said, and she put her free hand on the wet rock wall. They followed the sound of the water until a grey smudge of light appeared ahead, and then the warm, ordinary afternoon. Kai didn’t let go of her jumper until they were back at the tent.`,
  `Limestone caves are carved out of solid rock, and the tool that carves them is rain. As rainwater soaks down through the soil, it picks up a gas called carbon dioxide, which turns it into a weak acid. This water seeps into cracks in the limestone and slowly dissolves the rock, widening the cracks into tunnels and caverns over many thousands of years. Once a cave has formed, the water starts to build instead. Each drop that hangs from the ceiling carries a tiny amount of dissolved rock. When it meets the cave air, it leaves a thin ring of crystal behind. Ring by ring, a hollow tube called a “straw” grows downwards, and many straws thicken into stalactites. Where the drops land on the floor, stalagmites grow upwards to meet them, and when the two join, they make a column. Many formations grow only about a centimetre in a hundred years. To remember which is which, think of the c in stalactite for ceiling and the g in stalagmite for ground.`
];
const PASSAGE = {
  title: "Caves",
  note: "Read the four extracts below about caves.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
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
    intro: "Read the four extracts about caves, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "Which extract’s main point is that an experience in the dark turned out to be wonderful rather than frightening?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 0,
        skill: "identifying the main idea of a text when feelings are shown, not stated",
        explain: `<p>Extract A never uses the words “frightened” or “wonderful”, but it shows both. At the start, Sam is nervous: he keeps asking about bats and holds Mum’s hand “so tightly that her fingers had turned white”. Then the lights go off, the darkness is total and “nobody breathed”. But instead of something scary, the ceiling fills with glow-worms “as if someone had scattered a handful of stars”. Sam lets go of Mum’s hand, points up with his mouth wide open, and asks to come back tomorrow. The whole extract builds to that change from fear to wonder.</p>
                  <p class="why-not">Extract C is the trap: it is also about being in a cave in the dark, and Kai is clearly frightened (“His voice was very small”). But the darkness never becomes wonderful: the point of C is that Priya stays calm and finds the way out, and the ending is relief at being back in the “warm, ordinary afternoon”. Extract B is about not touching cave formations, and Extract D explains how caves and their formations are made; neither describes an experience in the dark.</p>`
      },
      {
        stem: "In which extract is the cave described as if it were a living creature, to make it seem threatening?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 2,
        skill: "recognising personification and working out the feeling it creates",
        explain: `<p>In Extract C, the cave is given the actions of an animal: Priya feels “the cave breathing cold air on the back of her neck”, and the dripping water sounds “as if the cave were waiting to see what they would do”. A cave can’t breathe or wait, so the writer is treating it like a creature watching the children. Breath on your neck in the dark, from something waiting to see what you do, makes the cave feel threatening, and it builds the tension before Priya calms herself.</p>
                  <p class="why-not">Extract B is the trap: it really does describe the cave formations as alive (“Cave guides call formations that are still growing ‘live’”). But the writer does this to make readers want to protect them, not to make them seem threatening. Extract A has real living creatures in the cave (the glow-worms), and compares their light to stars, which makes the cave beautiful, not threatening. Extract D says formations “grow”, but that is a scientific fact about crystal building up, not a description of the cave as a creature.</p>`
      },
      {
        stem: "In which extract is a length of time mentioned mainly to make a careless action seem more serious?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 1,
        skill: "understanding why a writer includes a detail (a long span of time set against a moment)",
        explain: `<p>In Extract B, the writer says a stalagmite “may have been growing for many thousands of years” and then that it “can be spoiled forever in a second by someone who just wanted to know what it felt like”. Putting <b>thousands of years</b> next to <b>a second</b> shows how unequal the two are: one careless touch, done just out of curiosity, can undo something that took far longer than any human life to make. The length of time is there to make the reader feel how serious touching really is, which is the point of the whole opinion piece.</p>
                  <p class="why-not">Extract D is the trap: it also gives a length of time (“only about a centimetre in a hundred years”). But D uses it to explain how slowly formations grow, and nobody does anything careless in D. Extract C has an action that goes wrong (Kai shakes the torch and it goes out), but no length of time is used to make that seem serious. Extract A mentions “a few seconds” when nobody breathed, but that builds suspense in the dark; nobody is careless.</p>`
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
               <ol style="margin:8px 0 0">
                 <li>Every square is also a rectangle.</li>
                 <li>Every rhombus is also a square.</li>
                 <li>Every rectangle is also a parallelogram.</li>
               </ol>`,
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
