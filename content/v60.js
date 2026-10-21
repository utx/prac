/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 60
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: narrative (original) ---- */
const PARAS = [
  `The ball came off Nina’s bat with a crack, and she knew straight away it was her best shot all summer. It sailed clean over the side fence. Then came a second sound, smaller and sadder: a kind of crunch.`,
  `Nina stood very still. Then she climbed onto the wheelie bin and looked over.`,
  `Mr Petrakis’s garden gnome lay on its side among the tomato plants. Its fishing rod had snapped off, and a crack ran right through its red hat. Mr Petrakis hardly ever spoke to anyone in the street; he just nodded and went inside. His car was gone. Nobody had seen.`,
  `Nina climbed down. She put the bat back in the shed very carefully, as though it might go off again. Then she went inside and watched a whole cooking show without being able to say afterwards what anyone had cooked.`,
  `At five o’clock she heard his car. Through the kitchen window she watched him walk slowly up his path, stop, and bend down. He stayed bent over for a long time. Then he picked up the gnome in both hands and carried it inside, the way you might carry a sleeping cat.`,
  `His wife had painted that gnome, Mum had told her once, the summer before she died.`,
  `At dinner Nina pushed her peas from one side of the plate to the other. “You’re quiet tonight,” said Mum. Nina said she was tired.`,
  `At seven o’clock she knocked on Mr Petrakis’s door, her pocket-money tin under her arm. When the door opened, the speech she had practised went straight out of her head. “It was me,” was all she managed. “The ball. I’m sorry.”`,
  `Mr Petrakis looked at her for a long moment. Then he opened the door wider. “I have glue,” he said, “but my hands shake these days. Yours, I think, do not.”`,
  `They spent the rest of the evening at his kitchen table, fitting the pieces together, and he told her about every one of them.`
];
const PASSAGE = {
  title: "The Gnome",
  note: "Read the story below, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: sequence of tiles (arrow turns, dots repeat) ---- */
const ARROW_DEG = { up: 0, right: 90, down: 180, left: 270 };
const seqTile = (dir, dots, label, size = 70) => {
  const cx = 35, cy = 31;
  let g = `<rect x="3" y="3" width="64" height="64" rx="6" fill="#fffdf6" stroke="${INK}" stroke-width="2"/>`;
  g += `<g transform="rotate(${ARROW_DEG[dir]} ${cx} ${cy})"><line x1="${cx}" y1="${cy + 16}" x2="${cx}" y2="${cy - 10}" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/><path d="M${cx - 9} ${cy - 6} L${cx} ${cy - 19} L${cx + 9} ${cy - 6} Z" fill="#c0392b"/></g>`;
  for (let k = 0; k < dots; k++) g += `<circle cx="${35 + (k - (dots - 1) / 2) * 14}" cy="58" r="4.5" fill="#2f5e95"/>`;
  return `<svg viewBox="0 0 70 70" width="${size}" height="${size}" role="img" aria-label="${label}: arrow pointing ${dir}, ${dots} dot${dots > 1 ? "s" : ""}">${g}</svg>`;
};
const SEQ = [["up", 1], ["right", 2], ["down", 3], ["left", 1], ["up", 2]];
const SEQ_HTML = `<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center">${SEQ.map(([d, n], i) => seqTile(d, n, `Tile ${i + 1}`)).join("")}<svg viewBox="0 0 70 70" width="70" height="70" role="img" aria-label="Tile 6: a question mark"><rect x="3" y="3" width="64" height="64" rx="6" fill="#f1f4f8" stroke="${INK}" stroke-width="2" stroke-dasharray="6 4"/><text x="35" y="47" font-size="34" font-weight="700" text-anchor="middle" fill="${INK}">?</text></svg></div>`;
const SEQ_OPTS = [["left", 3], ["right", 3], ["right", 1], ["up", 3]].map(([d, n], i) => seqTile(d, n, `Picture ${"ABCD"[i]}`, 76));

/* ---- Thinking Skills Q3: jigsaw square with a gap ---- */
const HOLE = [[1, 2], [1, 3], [2, 2], [2, 3], [3, 2]];
const inHole = (r, c) => HOLE.some(([R, C]) => R === r && C === c);
const BOARD_SVG = (() => {
  const s = 40, o = 8;
  let g = "";
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    if (!inHole(r, c)) g += `<rect x="${o + c * s}" y="${o + r * s}" width="${s}" height="${s}" fill="#8fb8de" stroke="#5f86ad" stroke-width="1"/>`;
  }
  // dashed outline of the gap
  const edges = [];
  HOLE.forEach(([r, c]) => {
    if (!inHole(r - 1, c)) edges.push([c, r, c + 1, r]);
    if (!inHole(r + 1, c)) edges.push([c, r + 1, c + 1, r + 1]);
    if (!inHole(r, c - 1)) edges.push([c, r, c, r + 1]);
    if (!inHole(r, c + 1)) edges.push([c + 1, r, c + 1, r + 1]);
  });
  g += edges.map(([x1, y1, x2, y2]) => `<line x1="${o + x1 * s}" y1="${o + y1 * s}" x2="${o + x2 * s}" y2="${o + y2 * s}" stroke="${INK}" stroke-width="1.6" stroke-dasharray="5 4"/>`).join("");
  g += `<rect x="${o}" y="${o}" width="${4 * s}" height="${4 * s}" fill="none" stroke="${INK}" stroke-width="2.2"/>`;
  const S = 4 * s + 2 * o;
  return `<svg viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="A square made of 4 by 4 small squares. Five squares are missing, leaving a gap: in the second and third rows, the two right-hand squares are missing (a 2 by 2 block on the right edge), and in the bottom row the third square from the left is missing, just below the left half of that block.">${g}</svg>`;
})();
const pieceSvg = (cells, label, desc) => {
  const s = 26, o = 5;
  const R = Math.max(...cells.map(p => p[0])) + 1, C = Math.max(...cells.map(p => p[1])) + 1;
  const g = cells.map(([r, c]) => `<rect x="${o + c * s}" y="${o + r * s}" width="${s}" height="${s}" fill="#f2b84b" stroke="${INK}" stroke-width="1.4"/>`).join("");
  const W = 3 * s + 2 * o, H = 3 * s + 2 * o, dx = (W - (C * s + 2 * o)) / 2, dy = (H - (R * s + 2 * o)) / 2;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}: ${desc}"><g transform="translate(${dx} ${dy})">${g}</g></svg>`;
};
const PIECES = [
  [[[0, 1], [0, 2], [1, 0], [1, 1], [1, 2]], "top row . # #, bottom row # # # (5 squares)"],
  [[[0, 0], [0, 1], [0, 2], [1, 0], [1, 2]], "top row # # #, bottom row # . # (5 squares)"],
  [[[0, 0], [0, 1], [0, 2], [1, 1], [1, 2]], "top row # # #, bottom row . # # (5 squares)"],
  [[[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]], "top row # # #, bottom row # # # (6 squares)"]
].map(([cells, d], i) => pieceSvg(cells, `Piece ${"ABCD"[i]}`, d));

/* ---- Maths Q3: train and bus timetables ---- */
const tc = v => `<td style="text-align:center;white-space:nowrap">${v}</td>`;
const TIMETABLES = `<div style="display:flex;flex-wrap:wrap;gap:12px 22px;justify-content:center;align-items:flex-start">
  <div class="table-wrap"><table class="grid">
    <tr><th colspan="3" style="text-align:center">Train</th></tr>
    <tr><th>Hillside</th>${tc("8:35")}${tc("9:05")}</tr>
    <tr><th>Central</th>${tc("9:02")}${tc("9:32")}</tr>
    <tr><td colspan="3" style="text-align:center;font-size:14px">then every 30 minutes</td></tr>
  </table></div>
  <div class="table-wrap"><table class="grid">
    <tr><th colspan="4" style="text-align:center">Bus</th></tr>
    <tr><th>Central</th>${tc("9:05")}${tc("9:20")}${tc("9:35")}</tr>
    <tr><th>Zoo</th>${tc("9:19")}${tc("9:34")}${tc("9:49")}</tr>
    <tr><td colspan="4" style="text-align:center;font-size:14px">then every 15 minutes</td></tr>
  </table></div>
</div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the story, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "Nina watches a whole cooking show “without being able to say afterwards what anyone had cooked”. This suggests that she",
        options: ["thought the cooking show was dull and wished something better was on.",
                  "could not stop thinking about the broken gnome and what she should do.",
                  "was pretending to be busy so that Mum would not ask her any questions.",
                  "was so tired after playing cricket that she kept dozing off on the couch."],
        answer: 1,
        skill: "working out feelings shown rather than stated",
        explain: `<p>If you watch a whole show and can’t remember a single thing in it, your mind was somewhere else. Nina has just broken the gnome and nobody saw. The story never says “she felt guilty”, but this detail shows that she can’t think about anything else.</p>
                  <p class="why-not">D is the trap: Nina does tell Mum she is “tired”, but that is at dinner, and it is an excuse to explain why she is quiet; nothing shows her dozing off. C uses a real idea from the story (Nina does keep the secret from Mum), but Mum isn’t there while she watches TV, and the detail is about what Nina can’t remember, not about looking busy. A takes the detail at face value: she isn’t bored by the show, she just isn’t really watching it.</p>`
      },
      {
        stem: "Why does the writer include the detail that Mr Petrakis’s wife “had painted that gnome … the summer before she died”?",
        options: ["To explain why Mr Petrakis kept the gnome among his tomato plants.",
                  "To show that Mum often told Nina stories about the people next door.",
                  "To show why the gnome meant so much, so Nina’s choice is harder.",
                  "To suggest Mr Petrakis would be too upset to forgive the person who broke it."],
        answer: 2,
        skill: "understanding why a writer includes a detail",
        explain: `<p>Just before this, Mr Petrakis bends over the broken gnome “for a long time” and carries it inside like “a sleeping cat”. Then the writer tells us why: it was painted by his wife, who has died, so it is a precious reminder of her. Placed here, the detail makes the reader feel how much Nina has broken, and it makes owning up both harder (he is sure to be hurt) and more important.</p>
                  <p class="why-not">D is the trap: the detail does show that he will be very upset, but it doesn’t show that he can’t forgive, and in fact he does forgive Nina at the end. A is about where the gnome was kept, which the detail doesn’t explain. B picks up the words “Mum had told her once”, but the story mentions Mum telling her only this one thing; the point is the gnome, not Mum’s habits.</p>`
      },
      {
        stem: "Mr Petrakis “hardly ever spoke to anyone”, yet at the end he spends the evening telling Nina about every piece of the gnome. What does this suggest the story is mostly about?",
        options: ["Owning up to a mistake can lead to something good, like a new friendship.",
                  "Old people living alone usually want to be left alone by their neighbours.",
                  "Playing cricket close to other people’s gardens always ends in some trouble.",
                  "It is wiser to keep quiet about an accident if nobody saw it happen at all."],
        answer: 0,
        skill: "understanding the main idea from how a story ends (inference)",
        explain: `<p>At the start, Mr Petrakis keeps to himself: he “just nodded and went inside”. Nina could have kept quiet, because “Nobody had seen”. Instead she owns up, and the ending is not about punishment at all. He invites her in, trusts her steady hands with the glue, and talks to her all evening about every piece of the gnome his wife painted. Owning up hasn’t just mended the gnome; it has started a friendship between two people who barely knew each other. That is the main idea: <b>A</b>.</p>
                  <p class="why-not">D is the trap: it uses the real detail “Nobody had seen”, but the story shows the opposite: keeping quiet makes Nina miserable, and owning up makes things better. B takes the early detail about Mr Petrakis keeping to himself and turns it into a rule, but the ending shows he is glad of Nina’s company. C turns one accident into “always”; the story is about what Nina does after the accident, not about where to play cricket.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Bean seeds will not sprout unless they get water.</p>
               <p class="quote"><em class="speaker">Leo:</em> “I’ve watered my bean seeds every day this week, so they will definitely sprout.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Leo has made?</p>`,
        options: ["Some kinds of bean seed may sprout much more quickly than other kinds do.",
                  "Leo’s sister may have planted her bean seeds a whole week before he did.",
                  "Bean plants may need plenty of sunshine once their first leaves grow.",
                  "Seeds may need other things as well as water, such as warmth, to sprout."],
        answer: 3,
        skill: "spotting the mistake (treating something needed as a guarantee)",
        explain: `<p>The rule says water is <b>needed</b>: without it, bean seeds won’t sprout. It does not say that water is <b>enough</b>. Leo has treated something needed as a guarantee. If the seeds also need something else, such as warmth, then watering them every day still can’t promise that they will sprout. D shows this gap.</p>
                  <p class="why-not">C is the trap: it names another thing a bean plant needs, sunshine, so it looks like the same idea. But it is about what the plant needs <em>after</em> its leaves grow, so it says nothing about whether the seeds will sprout in the first place. A is about how <em>quickly</em> seeds sprout, not whether Leo’s will. B is about his sister’s seeds, which tell us nothing about his.</p>`
      },
      {
        stem: `These tiles follow a pattern.
               <div class="figure">${SEQ_HTML}</div>
               <p style="margin:10px 0 0">Which picture should be <b>Tile 6</b>?</p>`,
        visualOptions: true,
        options: SEQ_OPTS,
        answer: 1,
        skill: "rules in a sequence of shapes: two things changing with different repeats",
        explain: `<p>Two things change, and each has its own repeat.</p>
                  <p><b>The arrow</b> makes a quarter turn clockwise each time: up, right, down, left, then up again. After up (Tile 5) comes <b>right</b>.<br>
                     <b>The dots</b> go 1, 2, 3, then start again: 1, 2, 3, 1, 2, … After 2 dots (Tile 5) comes <b>3 dots</b>.</p>
                  <p>So Tile 6 has an arrow pointing right and 3 dots: <b>B</b>.</p>
                  <p class="why-not">C is the trap: it gets the arrow right but starts the dots again at 1, as if they repeated every 4 tiles like the arrow does. A gets the dots right but turns the arrow the wrong way (anticlockwise) from up. D gets the dots right but leaves the arrow where it was in Tile 5, forgetting that it turns every time.</p>`
      },
      {
        stem: `Five small squares are missing from this square. Which piece fills the gap exactly? The piece may be <b>turned</b>, but it may <b>not</b> be flipped over.
               <div class="figure">${BOARD_SVG}</div>`,
        visualOptions: true,
        options: PIECES,
        answer: 2,
        skill: "jigsaw: which piece fills a gap when it is turned (not flipped)",
        explain: `<p>The gap has <b>5</b> squares: a 2 by 2 block on the right edge, with one more square sticking down below the <b>left</b> half of the block.</p>
                  <p>Piece C is a row of 3 with 2 squares under the right-hand end, so it is a 2 by 2 block with one extra square sticking out to the <b>left</b> of its <b>top</b> row. Turn it a quarter turn anticlockwise: the extra square swings round to sit <b>below the left</b> half of the block, which is exactly the shape of the gap.</p>
                  <p class="why-not">A is the trap: it is the right size and nearly the right shape, but it is a mirror image. Its extra square sticks out to the left of the <em>bottom</em> row, so turning it puts the extra square below the <em>right</em> half of the block. It would fit only if it were flipped over, which isn’t allowed. B has 5 squares, but it has a gap in the middle of its bottom row, so it is a different shape. D has 6 squares, one too many.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: "A bus arrived in Dubbo at <b>14:05</b> (24-hour time). The trip took <b>2 hours 50 minutes</b>. At what time did the bus leave?",
        options: ["11:15 am", "11:55 am", "1:15 pm", "4:55 pm", "11:15 pm"],
        answer: 0,
        skill: "time: 24-hour time and counting back hours and minutes",
        explain: `<p>14:05 is 2:05 pm. Count back 2 hours: <b>12:05 pm</b>. Then count back 50 minutes: 5 minutes takes you to 12:00, and 45 more takes you to <b>11:15 am</b>.</p>
                  <p class="why-not">11:55 am (B) is the trap: it subtracts as if an hour had 100 minutes (1405 − 250 = 1155). 4:55 pm (D) adds the trip time instead of taking it away. 1:15 pm (C) takes away only the 50 minutes and forgets the 2 hours. 11:15 pm (E) gets the numbers right but the wrong half of the day: the bus left before midday.</p>`
      },
      {
        stem: "Innkeeper Irina wants to buy some muffins for her guests. The bakery sells single muffins for <b>$3</b> each and packages of <b>6</b> muffins for <b>$10</b> per package. What is the greatest number of muffins that Irina can buy for <b>$49</b>?",
        options: ["16", "24", "27", "29", "30"],
        answer: 2,
        skill: "best value: getting the most for a fixed amount of money (supplied by David)",
        explain: `<p><b>Step 1: which is better value?</b> A package gives 6 muffins for $10. Six single muffins would cost 6 × $3 = $18. So packages are much better value: buy as many as you can.</p>
                  <p><b>Step 2:</b> 4 packages cost $40 and give 24 muffins. (5 packages would cost $50, too much.)</p>
                  <p><b>Step 3: spend what is left.</b> $49 − $40 = $9, which buys 9 ÷ 3 = 3 single muffins.</p>
                  <p>24 + 3 = <b>27</b> muffins, costing exactly $49. Check another mix: 3 packages ($30) and 6 singles ($18) cost $48 but give only 24 muffins.</p>
                  <p class="why-not">24 (B) is the trap: it buys the 4 packages but forgets to spend the $9 left over. 30 (E) buys 5 packages, but they cost $50, more than $49. 29 (D) works out $49 as 4.9 packages and 4.9 × 6 ≈ 29, as if part of a package could be bought. 16 (A) buys only single muffins ($49 ÷ 3 = 16, remainder $1).</p>`
      },
      {
        stem: `Sam is going to the zoo. He reaches Hillside station at <b>8:45 am</b> and catches the first train he can to Central. At Central it takes him <b>12 minutes</b> to walk from the train to the bus stop, and he catches the first bus he can to the zoo.
               <div class="figure">${TIMETABLES}</div>
               <p style="margin:10px 0 0">All the times are in the morning. How long is it from when Sam reaches Hillside station until he arrives at the zoo?</p>`,
        options: ["49 minutes", "59 minutes", "1 hour 4 minutes", "1 hour 19 minutes", "1 hour 59 minutes"],
        answer: 3,
        skill: "timetables: connecting a train and a bus, then elapsed time",
        explain: `<p><b>Step 1: the train.</b> Sam reaches Hillside at 8:45, so he has missed the 8:35 train. He catches the <b>9:05</b>, which reaches Central at <b>9:32</b>.</p>
                  <p><b>Step 2: the walk.</b> 9:32 + 12 minutes = <b>9:44</b> at the bus stop.</p>
                  <p><b>Step 3: the bus.</b> Buses leave Central every 15 minutes: 9:05, 9:20, 9:35, <b>9:50</b>, … The 9:35 has gone, so he catches the 9:50, which arrives at the zoo 14 minutes later, at <b>10:04</b>.</p>
                  <p><b>Step 4: how long?</b> 8:45 to 9:45 is 1 hour, and 9:45 to 10:04 is 19 minutes: <b>1 hour 19 minutes</b>.</p>
                  <p class="why-not">1 hour 4 minutes (C) is the trap: it forgets the 12-minute walk, so Sam seems to catch the 9:35 bus straight off the train. 49 minutes (A) puts Sam on the 8:35 train, which had already left. 59 minutes (B) measures from when the train left (9:05) instead of from when Sam reached the station. 1 hour 59 minutes (E) subtracts the times as if an hour had 100 minutes (1004 − 845 = 159).</p>`
      }
    ]
  }
];
