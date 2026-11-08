/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 65
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: narrative (original) ---- */
const PARAS = [
  `Mia had drawn the tree house eleven times before Grandpa let her pick up a saw. In every drawing the walls were dead straight, the window was a perfect square, and a rope ladder hung exactly in the middle of the door.`,
  `“Measure twice, cut once,” Grandpa said, handing her the tape measure. Mia measured three times. She wrote the number on the board in pencil and underlined it twice.`,
  `Grandpa sat on an upturned bucket under the gum tree, drinking tea from his old thermos. He watched her mark the first floorboard. He watched her line up the saw. He opened his mouth once, then took another sip of tea instead.`,
  `The board was too short. When Mia lifted it into place, it stopped a whole hand’s width from the far branch. She had measured from the wrong end of the tape.`,
  `Mia threw the tape measure into the grass. Her face went hot. “You saw,” she said. “You saw, and you didn’t say anything.”`,
  `“I did,” said Grandpa. He screwed the lid back on his thermos, taking his time over it. Then he walked to the shed and came back with a little wooden stool. One of its legs was shorter than the others, and it rocked when he set it down.`,
  `“First thing I ever made,” he said. “My father watched me cut that leg. Never said a word.” He sat on the stool, rocking gently. “I’ve never measured from the wrong end since.”`,
  `Mia looked at the stool for a long time. Then she fetched the tape measure out of the grass, hooked its metal end over the edge of the next board, and checked which end said zero.`,
  `By the end of the afternoon the floor was down. The short board went in too, by the doorway, where Grandpa said it would make a good step. The tree house never did look much like the drawings. But whenever friends came to visit, the first thing Mia showed them was the step.`
];
const PASSAGE = {
  title: "The Tree House",
  note: "Read the story below, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: books read (totals table, step 1) ---- */
const BC = (v, extra = "") => `<td style="text-align:center${extra}">${v}</td>`;
const GAP = BC("?", ";font-weight:700;color:#c0392b");
const booksTable = (filled) => {
  const f = (n, mark) => filled ? BC(`<b>${n}</b> <span style="color:#c0392b">${mark}</span>`, ";background:#fff4d6") : GAP;
  return `<div class="table-wrap"><table class="grid">
  <tr><th rowspan="2"></th><th colspan="3" style="text-align:center">Books read</th><th rowspan="2" style="text-align:center">Total</th></tr>
  <tr><th style="text-align:center">Week 1</th><th style="text-align:center">Week 2</th><th style="text-align:center">Week 3</th></tr>
  <tr><th>Isla</th>${BC(4)}${f(5, "①")}${BC(3)}${BC(12)}</tr>
  <tr><th>Noah</th>${BC(2)}${BC(6)}${BC(5)}${f(13, "③")}</tr>
  <tr><th>Zain</th>${f(2, "②")}${BC(3)}${BC(5)}${BC(10)}</tr>
  <tr><th>Total</th>${BC(8)}${BC(14)}${f(13, "④")}${filled ? BC(`<b>35</b> <span style="color:#c0392b">⑤</span>`, ";background:#e3f2e1") : GAP}</tr>
</table></div>`;
};

/* ---- Thinking Skills Q3 explanation: one straight cut across a square ---- */
const cutSquare = (x1, y1, x2, y2, caption) => {
  const s = 92, W = 150, o = (W - s) / 2, t = 8;
  const X = v => o + v * s, Y = v => t + v * s;
  const [c1, c2] = caption.split(" | ");
  return `<svg viewBox="0 0 ${W} ${s + t + 42}" width="${W}" height="${s + t + 42}" role="img" aria-label="A square cut with one straight line, ${c1} The pieces have ${c2} sides.">
    <rect x="${o}" y="${t}" width="${s}" height="${s}" fill="#fdf0dc" stroke="${INK}" stroke-width="2"/>
    <line x1="${X(x1)}" y1="${Y(y1)}" x2="${X(x2)}" y2="${Y(y2)}" stroke="#c0392b" stroke-width="2.6" stroke-dasharray="7 4"/>
    <circle cx="${X(x1)}" cy="${Y(y1)}" r="3.5" fill="#c0392b"/><circle cx="${X(x2)}" cy="${Y(y2)}" r="3.5" fill="#c0392b"/>
    <text x="${W / 2}" y="${s + t + 18}" font-size="12.5" text-anchor="middle" fill="${INK}">${c1}</text>
    <text x="${W / 2}" y="${s + t + 34}" font-size="12.5" font-weight="700" text-anchor="middle" fill="${INK}">${c2}</text>
  </svg>`;
};
const CUTS_HTML = `<div style="display:flex;flex-wrap:wrap;gap:10px 14px;justify-content:center">
  ${cutSquare(0, 0, 1, 1, "corner to corner: | 3 and 3")}
  ${cutSquare(0, 0, 1, 0.55, "corner to a side: | 3 and 4")}
  ${cutSquare(0.45, 0, 1, 0.5, "side to the next side: | 3 and 5")}
  ${cutSquare(0.3, 0, 0.65, 1, "side to opposite side: | 4 and 4")}
</div>`;
const SQUARE_SVG = `<svg viewBox="0 0 150 150" width="150" height="150" role="img" aria-label="A square piece of paper.">
  <rect x="20" y="20" width="110" height="110" fill="#fdf0dc" stroke="${INK}" stroke-width="2.2"/>
</svg>`;

/* ---- Maths Q2 explanation: the three shapes ---- */
const tick = (x1, y1, x2, y2, n = 1) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  const nx = -dy / L * 6, ny = dx / L * 6, ux = dx / L * 4, uy = dy / L * 4;
  let g = "";
  for (let k = 0; k < n; k++) {
    const sx = mx + (k - (n - 1) / 2) * ux, sy = my + (k - (n - 1) / 2) * uy;
    g += `<line x1="${(sx - nx).toFixed(1)}" y1="${(sy - ny).toFixed(1)}" x2="${(sx + nx).toFixed(1)}" y2="${(sy + ny).toFixed(1)}" stroke="${INK}" stroke-width="1.6"/>`;
  }
  return g;
};
const shapeSvg = (pts, ticks, caption, fill) => {
  const poly = `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  const t = ticks.map(([i, n]) => tick(...pts[i], ...pts[(i + 1) % pts.length], n)).join("");
  return `<svg viewBox="0 0 150 128" width="150" height="128" role="img" aria-label="${caption}">${poly}${t}<text x="75" y="122" font-size="13" font-weight="700" text-anchor="middle" fill="${INK}">${caption.split(":")[0]}</text></svg>`;
};
const SHAPES_HTML = `<div style="display:flex;flex-wrap:wrap;gap:8px 14px;justify-content:center">
  ${shapeSvg([[16, 90], [88, 90], [130.7, 32], [58.7, 32]], [[0, 1], [1, 1], [2, 1], [3, 1]], "Rhombus: four equal sides, opposite sides parallel", "#dbe9f7")}
  ${shapeSvg([[12, 30], [138, 30], [138, 86], [12, 86]], [[0, 1], [1, 2], [2, 1], [3, 2]], "Rectangle: long sides equal, short sides equal, but sides next to each other are not equal", "#fdf0dc")}
  ${shapeSvg([[75, 8], [112, 40], [75, 104], [38, 40]], [[0, 1], [1, 2], [2, 2], [3, 1]], "Kite: two pairs of equal sides next to each other", "#e3f2e1")}
</div>`;

/* ---- Maths Q3: spinner with a half, a quarter and two eighths ---- */
const SPINNER_SVG = (() => {
  const cx = 110, cy = 110, r = 92;
  const pt = deg => [cx + r * Math.cos(deg * Math.PI / 180), cy - r * Math.sin(deg * Math.PI / 180)];
  const sector = (a1, a2, fill) => {
    const [x1, y1] = pt(a1), [x2, y2] = pt(a2), large = a2 - a1 > 180 ? 1 : 0;
    return `<path d="M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${fill}" stroke="${INK}" stroke-width="2"/>`;
  };
  const lab = (deg, rr, n) => {
    const x = cx + rr * Math.cos(deg * Math.PI / 180), y = cy - rr * Math.sin(deg * Math.PI / 180);
    return `<text x="${x.toFixed(1)}" y="${(y + 9).toFixed(1)}" font-size="26" font-weight="700" text-anchor="middle" fill="${INK}">${n}</text>`;
  };
  let g = sector(90, 270, "#f6d3a8") + sector(0, 90, "#bcd8f2") + sector(-45, 0, "#c9e7c3") + sector(-90, -45, "#f3c6d6");
  g += lab(180, 50, 1) + lab(45, 52, 2) + lab(-22.5, 62, 3) + lab(-67.5, 62, 4);
  g += `<line x1="${cx}" y1="${cy}" x2="${cx - 30}" y2="${cy - 52}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="${INK}"/>`;
  return `<svg viewBox="0 0 220 220" width="220" height="220" role="img" aria-label="A spinner. The whole left half is labelled 1. The top-right quarter is labelled 2. The bottom-right quarter is split into two equal parts, labelled 3 and 4.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the story, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "While Mia lines up the saw, Grandpa “opened his mouth once, then took another sip of tea instead.” This suggests that Grandpa",
        options: ["was enjoying his tea too much to pay close attention to Mia.",
                  "had seen a mistake coming but let Mia find it for herself.",
                  "was about to warn Mia that the saw was too dangerous for her.",
                  "wanted to praise Mia for measuring the board three times instead of twice."],
        answer: 1,
        skill: "working out what a character is thinking from what he does (shown, not stated)",
        explain: `<p>Grandpa starts to speak, then stops himself. A moment later we find out why: the board is too short, because Mia measured from the wrong end of the tape. When Mia says “You saw,” he answers “I did.” So he had noticed the mistake, and he chose to say nothing so that Mia would find it herself, just as his own father once did with him.</p>
                  <p class="why-not">D is the trap: Mia really did measure three times, so praise might seem natural. But praise is nothing to hold back, and later Grandpa admits that he had seen something wrong. C uses a real detail (Mia is lining up the saw), but nothing suggests he thinks the saw is dangerous: he “let her pick up a saw” in the first place. A gets it the wrong way round: he “watched her mark” and “watched her line up the saw”, so he was paying very close attention.</p>`
      },
      {
        stem: "Why does the writer include the little wooden stool with one short leg?",
        options: ["To show that Grandpa was not very good at woodwork when he was a boy.",
                  "To explain where Grandpa sits while he watches Mia building the floor.",
                  "To show that Grandpa has kept everything his father ever made for him.",
                  "To explain why Grandpa kept quiet when he saw Mia’s mistake coming."],
        answer: 3,
        skill: "understanding why a writer includes a detail",
        explain: `<p>The stool arrives just after Mia’s angry outburst. Grandpa made it as a boy and cut one leg too short, just as Mia has cut her board too short. He says, “I’ve never measured from the wrong end since.” His father watched him make the mistake and “never said a word”, and the mistake taught him a lesson for life. So the stool explains why Grandpa kept quiet when he saw Mia’s mistake coming: he was doing what his father did, so that she would learn the same way. Straight afterwards Mia checks “which end said zero”, so she has learnt it too.</p>
                  <p class="why-not">A is the trap: the short leg does show that young Grandpa made a mistake, but the point of the stool is what the mistake taught him, not that he was bad at woodwork. B mixes up the details: Grandpa sits on an upturned bucket while he watches; he only sits on the stool to show it to Mia. C gets the story the wrong way round: Grandpa made the stool himself while his father watched, and nothing tells us what else he has kept.</p>`
      },
      {
        stem: "Which of these best describes the main idea of the story?",
        options: ["Being allowed to make a mistake can teach more than being warned.",
                  "Mia learns that measuring three times is better than measuring twice.",
                  "Grandpa teaches Mia to measure by telling her about his own childhood.",
                  "Mia’s anger with Grandpa spoils the day they had planned together."],
        answer: 0,
        skill: "working out the main idea of a whole story (inference across the story)",
        explain: `<p>Follow how the story is built. Mia wants everything perfect. Grandpa sees her mistake coming and stays silent. She makes it, gets angry, and then learns from it: she checks which end of the tape says zero. Grandpa’s stool shows the same thing happened to him. At the end, the short board, her mistake, becomes the part of the tree house she is proudest of. Every part of the story points to one idea: being allowed to make your own mistake can teach you more than being warned. That is <b>A</b>.</p>
                  <p class="why-not">C is the trap: Grandpa does tell a story about his childhood, but that is only one part, and Mia learns from her own mistake, not from being told how to measure. B is built on a real detail (Mia measured three times), but measuring three times didn’t help her: she still measured from the wrong end. D picks up Mia’s anger, but it passes quickly: “By the end of the afternoon the floor was down”, and she ends up proud of the step.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">At the start of Term 3, Ms Rossi’s class began doing ten minutes of stretching every morning. In Term 3, the class’s spelling test scores were much higher than they had been in Term 2.</p>
               <p class="quote"><em class="speaker">Ms Rossi:</em> “The morning stretching must have made everyone better at spelling.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Ms Rossi has made?</p>`,
        options: ["Some students in the class may not enjoy stretching first thing in the morning.",
                  "Stretching may help students feel more awake at the start of a school day.",
                  "The spelling words in Term 3 may have been easier than the Term 2 words.",
                  "Other classes in the school may also want to start their day by stretching."],
        answer: 2,
        skill: "spotting the mistake (ignoring another possible cause)",
        explain: `<p>Two things changed in Term 3: the class started stretching, and the spelling scores went up. Ms Rossi decides that the first change caused the second. But something else could have caused the higher scores. If the Term 3 spelling words were easier, the scores could have gone up even without any stretching. C shows this gap: she has ignored another possible cause.</p>
                  <p class="why-not">B is the trap: it is about the stretching and the school mornings, so it seems to be about her reasoning. But it actually <em>supports</em> Ms Rossi (feeling awake might help), so it doesn’t show a mistake. A is about whether students enjoy stretching, which says nothing about spelling scores. D is about other classes, which tells us nothing about why this class’s scores went up.</p>`
      },
      {
        stem: `Three children kept a record of the books they read in a three-week reading challenge. Some numbers in the table are missing.
               <div class="figure">${booksTable(false)}</div>
               <p style="margin:10px 0 0">How many books did the three children read <b>altogether</b> in the three weeks?</p>`,
        options: ["35", "70", "22", "13"],
        answer: 0,
        skill: "finding missing numbers in a table from row and column totals (totals table, step 1: one gap in each row or column)",
        explain: `<p><b>The method:</b> Find a row or column with only <b>one</b> number missing. Total − the numbers you know = the missing number. Fill it in, then look again: a new row or column may now have only one gap. (If the missing number is a total, add up that row or column instead.)</p>
                  <p>① <b>Isla’s row</b> has one gap: 12 − 4 − 3 = <b>5</b> (Week 2).<br>
                     ② <b>Zain’s row</b> has one gap: 10 − 3 − 5 = <b>2</b> (Week 1).<br>
                     ③ <b>Noah’s row</b>: only his total is missing, so add it up: 2 + 6 + 5 = <b>13</b>.<br>
                     ④ <b>The Week 3 column</b>: only its total is missing: 3 + 5 + 5 = <b>13</b>.<br>
                     ⑤ The grand total, in the bottom-right corner.</p>
                  <div class="figure">${booksTable(true)}</div>
                  <p><b>The grand total can be found two ways, and both must agree:</b><br>
                     adding the <b>children’s totals</b> (the Total column): 12 + 13 + 10 = <b>35</b><br>
                     adding the <b>weeks’ totals</b> (the Total row): 8 + 14 + 13 = <b>35</b> ✓<br>
                     Both add up every book in the table once, just grouped in a different way.</p>
                  <p class="why-not">22 (C) is the trap: it adds up only the totals that are shown, 12 + 10 (or 8 + 14), as if the “?” were 0, and leaves Noah (or Week 3) out. The gaps have to be filled first. 70 (B) adds the children’s totals <em>and</em> the weeks’ totals together (35 + 35), so every book is counted twice: the Total row and the Total column are two ways of adding the same books, not two different lots. 13 (D) stops one step early: it is Noah’s total (and the Week 3 total), a number found on the way, not the total for all three children.</p>`
      },
      {
        stem: `Lena has a square piece of paper. She makes <b>one straight cut</b> right across it, from one edge to another, so that it falls into two pieces.
               <div class="figure">${SQUARE_SVG}</div>
               <p style="margin:10px 0 0">Which pair of pieces can she <b>not</b> get?</p>`,
        options: ["a 3-sided piece and a 4-sided piece",
                  "a 3-sided piece and a 5-sided piece",
                  "two 4-sided pieces",
                  "a 4-sided piece and a 5-sided piece"],
        answer: 3,
        skill: "straight cuts: which pairs of pieces one straight cut across a square can make",
        explain: `<p>Count the <b>corners</b> of the pieces. Each end of the cut is a corner of <b>both</b> pieces. Each of the square’s 4 corners goes to one piece (unless the cut goes right through it).</p>
                  <p>Try the four kinds of cut:</p>
                  <div class="figure">${CUTS_HTML}</div>
                  <p>So 3 and 4 (A), 3 and 5 (B) and 4 and 4 (C) are all possible.</p>
                  <p>Now 4 and 5. Each piece gets the 2 ends of the cut, so a 4-sided piece needs 2 of the square’s corners and a 5-sided piece needs 3. That is 5 corners, but a square has only 4. So a 4-sided piece and a 5-sided piece <b>can’t</b> be made: <b>D</b>.</p>
                  <p class="why-not">B is the trap: it seems impossible to get a piece with <em>more</em> sides than the square, but cutting off one corner (from one side to the next side) leaves a 5-sided piece and a small triangle. A comes from thinking a cut must go corner to corner or side to side, but a cut from a corner to the middle of a side gives a triangle and a 4-sided piece. C comes from forgetting the simplest cut, straight across from one side to the opposite side.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: "The school play started at <b>6:45 pm</b>. It had two acts, each lasting <b>55 minutes</b>, with a <b>20-minute</b> break between them. At what time did the play finish?",
        options: ["8:00 pm", "8:15 pm", "8:35 pm", "8:55 pm", "9:15 pm"],
        answer: 3,
        skill: "time: finishing time from a start time and several lengths of time",
        explain: `<p>Add the parts in order.</p>
                  <p>Act 1: 6:45 + 55 minutes = <b>7:40 pm</b>.<br>
                     Break: 7:40 + 20 minutes = <b>8:00 pm</b>.<br>
                     Act 2: 8:00 + 55 minutes = <b>8:55 pm</b>.</p>
                  <p>(Or: 55 + 20 + 55 = 130 minutes = 2 hours 10 minutes, and 6:45 + 2 h 10 min = 8:55 pm.)</p>
                  <p class="why-not">8:35 pm (C) is the trap: it adds the two acts but forgets the break. 8:00 pm (A) stops after the break and forgets the second act. 8:15 pm (B) writes 130 minutes as “1 hour 30 minutes”, as if an hour had 100 minutes. 9:15 pm (E) counts the 20-minute break twice.</p>`
      },
      {
        stem: `Which of these statements is/are correct?
               <p style="margin:10px 0 0">1 &nbsp;All rhombuses are parallelograms.<br>
                  2 &nbsp;All rectangles are kites.<br>
                  3 &nbsp;All quadrilaterals are squares.</p>`,
        options: ["none of them", "1 only", "2 only", "1 and 2", "1 and 3"],
        answer: 1,
        skill: "classifying quadrilaterals: which statements are correct (supplied by David)",
        explain: `<p>Check each statement against what each shape needs.</p>
                  <div class="figure">${SHAPES_HTML}</div>
                  <p><b>1 is correct.</b> A rhombus has four equal sides, and its opposite sides are parallel, which is all a parallelogram needs. A rhombus is a parallelogram with all its sides equal.</p>
                  <p><b>2 is wrong.</b> A kite has two pairs of equal sides <em>next to each other</em>. In a long, thin rectangle, the sides next to each other are a long side and a short side, so they aren’t equal. (Only a square is both a rectangle and a kite.)</p>
                  <p><b>3 is wrong.</b> A quadrilateral is any shape with four straight sides, and most are not squares. It is the right way round only as “All squares are quadrilaterals.”</p>
                  <p>So the answer is <b>1 only</b> (B).</p>
                  <p class="why-not">“1 and 2” (D) is the trap: a square is a rectangle and also a kite, so it is easy to think every rectangle is a kite. A long, thin rectangle shows it isn’t. “1 and 3” (E) reads statement 3 the wrong way round. “None of them” (A) comes from thinking a rhombus is just a tilted square and not a parallelogram. “2 only” (C) makes both of these mistakes.</p>`
      },
      {
        stem: `The pointer on this spinner is equally likely to stop anywhere on it.
               <div class="figure">${SPINNER_SVG}</div>
               <p style="margin:10px 0 0">Which of these statements is/are correct?</p>
               <p style="margin:6px 0 0">1 &nbsp;Spinning a 1 is as likely as <b>not</b> spinning a 1.<br>
                  2 &nbsp;Spinning a 2 is twice as likely as spinning a 3.<br>
                  3 &nbsp;Spinning an even number is as likely as spinning an odd number.</p>`,
        options: ["1 only", "2 only", "3 only", "1 and 3", "1 and 2"],
        answer: 4,
        skill: "chance: which statements are correct when the parts of a spinner are different sizes",
        explain: `<p>The chance of each number depends on <b>how much of the spinner</b> it covers, not on how many parts there are. Write each part as a fraction of the whole spinner:</p>
                  <p>1 → <b>half</b> = 4 eighths &nbsp; 2 → <b>a quarter</b> = 2 eighths &nbsp; 3 → <b>1 eighth</b> &nbsp; 4 → <b>1 eighth</b></p>
                  <p><b>1 is correct.</b> Not spinning a 1 means spinning a 2, 3 or 4, and those together cover 2 + 1 + 1 = 4 eighths, the other half. So a 1 is just as likely as not a 1.</p>
                  <p><b>2 is correct.</b> 2 covers 2 eighths and 3 covers 1 eighth, so a 2 is twice as likely.</p>
                  <p><b>3 is wrong.</b> Even numbers (2 and 4) cover 2 + 1 = 3 eighths. Odd numbers (1 and 3) cover 4 + 1 = 5 eighths. An odd number is more likely.</p>
                  <p>So the answer is <b>1 and 2</b> (E).</p>
                  <p class="why-not">“3 only” (C) is the trap: it counts the parts as if they were all the same size. Then there are two even parts and two odd parts (so 3 looks right), 1 has one part against three (so 1 looks wrong), and 2 and 3 have one part each (so 2 looks wrong). “1 and 3” (D) uses the sizes for statement 1 but goes back to counting parts for statement 3. “1 only” (A) and “2 only” (B) each miss one of the two correct statements.</p>`
      }
    ]
  }
];
