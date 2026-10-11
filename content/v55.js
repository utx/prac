/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 55
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: poem (public domain: William Wordsworth, 1770–1850) ----
   The revised text first published in 1815 (the 1807 first version had no
   "Continuous as the stars" verse). Text extracted programmatically from
   Project Gutenberg eBook #12383 (The Poetical Works of William Wordsworth,
   ed. William Knight, Vol. III, 1896). Only changes: the line numbers and
   footnote markers are removed, and the double hyphen "--" is shown as a dash. */
const STANZAS = [
  [
    "I wandered lonely as a cloud",
    "That floats on high o'er vales and hills,",
    "When all at once I saw a crowd,",
    "A host, of golden daffodils;",
    "Beside the lake, beneath the trees,",
    "Fluttering and dancing in the breeze."
  ],
  [
    "Continuous as the stars that shine",
    "And twinkle on the milky way,",
    "They stretched in never-ending line",
    "Along the margin of a bay:",
    "Ten thousand saw I at a glance,",
    "Tossing their heads in sprightly dance."
  ],
  [
    "The waves beside them danced; but they",
    "Out-did the sparkling waves in glee:",
    "A poet could not but be gay,",
    "In such a jocund company:",
    "I gazed—and gazed—but little thought",
    "What wealth the show to me had brought:"
  ],
  [
    "For oft, when on my couch I lie",
    "In vacant or in pensive mood,",
    "They flash upon that inward eye",
    "Which is the bliss of solitude;",
    "And then my heart with pleasure fills,",
    "And dances with the daffodils."
  ]
];
const PASSAGE = {
  title: "I Wandered Lonely as a Cloud",
  note: "Read the poem below by William Wordsworth (written in 1804; this is his revised version, first published in 1815), then answer the questions. The numbers show the verses. <i>o’er</i>: over; <i>host</i>: a very large crowd; <i>margin</i>: edge; <i>sprightly</i>: lively; <i>gay</i>: (here) cheerful; <i>jocund</i>: merry; <i>oft</i>: often; <i>couch</i>: a sofa or bed; <i>vacant</i>: with an empty mind; <i>pensive</i>: thoughtful; <i>solitude</i>: being alone.",
  html: `<div class="poem">${STANZAS.map((s, i) => `<div class="stanza"><span class="vn">${i + 1}</span>${s.map(l => `<span class="line">${l}</span>`).join("")}</div>`).join("")}</div>`
};

/* ---- Thinking Skills Q2: number wheel (supplied by David; redrawn) ---- */
const WHEEL_NUMS = ["3", "4", "5", "6", "7", "12", "20", "30", "42", "??"];
const WHEEL_SVG = (() => {
  const cx = 150, cy = 150, r = 98, rl = 124;
  const pt = (i, rad) => {
    const a = (-90 + 36 * i) * Math.PI / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  let g = `<defs><marker id="wh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${INK}"/></marker></defs>`;
  for (let i = 0; i < 5; i++) {
    const [x1, y1] = pt(i, r), [x2, y2] = pt(i + 5, r);
    g += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="2" marker-start="url(#wh)" marker-end="url(#wh)"/>`;
  }
  g += `<circle cx="${cx}" cy="${cy}" r="7" fill="#e9a23b" stroke="${INK}" stroke-width="1.5"/>`;
  WHEEL_NUMS.forEach((n, i) => {
    const [x, y] = pt(i, rl);
    const q = n === "??";
    g += `<text x="${x.toFixed(1)}" y="${(y + 7).toFixed(1)}" font-size="21" font-weight="700" text-anchor="middle" fill="${q ? "#c0392b" : INK}">${n}</text>`;
  });
  return `<svg viewBox="0 0 300 300" width="280" height="280" style="max-width:100%;height:auto" role="img" aria-label="A wheel of ten arrows going out from the centre, like spokes. They make five straight lines through the centre, so each number is at the opposite end of a straight line from another number. Going clockwise from the top, the numbers are 3, 4, 5, 6, 7, 12, 20, 30, 42 and ??. So 3 is opposite 12, 4 is opposite 20, 5 is opposite 30, 6 is opposite 42 and 7 is opposite ??.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: cube model views ---- */
// Plan: rows from back to front, columns left to right; number = cubes in that stack.
const PLAN_OK = [[1, 0, 1], [0, 3, 2], [2, 1, 0]];
const viewSvg = (heights, labels, title) => {
  const c = 30, W = 150, o = (W - heights.length * c) / 2, top = 18, H = top + 3 * c + 22;
  let g = `<text x="${W / 2}" y="13" font-size="13" text-anchor="middle" fill="${INK}" font-weight="700">${title}</text>`;
  heights.forEach((h, k) => {
    for (let j = 0; j < h; j++) g += `<rect x="${o + k * c}" y="${top + (2 - j) * c}" width="${c}" height="${c}" fill="#6f9fcf" stroke="${INK}" stroke-width="1.6"/>`;
  });
  g += `<line x1="${o - 6}" y1="${top + 3 * c}" x2="${W - o + 6}" y2="${top + 3 * c}" stroke="${INK}" stroke-width="2"/>`;
  if (labels) {
    g += `<text x="${o}" y="${top + 3 * c + 16}" font-size="12" fill="#55607a">${labels[0]}</text>
          <text x="${W - o}" y="${top + 3 * c + 16}" font-size="12" text-anchor="end" fill="#55607a">${labels[1]}</text>`;
  }
  return { g, W, H };
};
const VIEWS_SVG = (() => {
  const f = viewSvg([2, 3, 2], ["left", "right"], "From the front");
  const s = viewSvg([2, 3, 1], ["front", "back"], "From the right side");
  return `<div style="display:flex;flex-wrap:wrap;gap:14px 40px;align-items:flex-end;justify-content:center">
    <svg viewBox="0 0 ${f.W} ${f.H}" width="${f.W * 1.3}" height="${f.H * 1.3}" role="img" aria-label="The model seen from the front: three columns of cubes. From left to right they are 2, 3 and 2 cubes high.">${f.g}</svg>
    <svg viewBox="0 0 ${s.W} ${s.H}" width="${s.W * 1.3}" height="${s.H * 1.3}" role="img" aria-label="The model seen from the right side: three columns of cubes. The front of the model is on the left of this view and the back is on the right. From front to back they are 2, 3 and 1 cubes high.">${s.g}</svg>
  </div>`;
})();
const planGrid = (rows, label) => {
  const c = 34, o = 6;
  let g = "";
  rows.forEach((row, r) => row.forEach((n, k) => {
    g += `<rect x="${o + k * c}" y="${o + r * c}" width="${c}" height="${c}" fill="${n ? "#dce8f5" : "#fff"}" stroke="${n ? INK : "#c3ccd8"}" stroke-width="${n ? 1.6 : 1}"/>`;
    if (n) g += `<text x="${o + k * c + c / 2}" y="${o + r * c + c / 2 + 7}" font-size="19" font-weight="700" text-anchor="middle" fill="${INK}">${n}</text>`;
  }));
  g += `<text x="${o + 1.5 * c}" y="${o + 3 * c + 16}" font-size="12" text-anchor="middle" fill="#55607a">front</text>`;
  const W = 3 * c + 2 * o, H = 3 * c + o + 22;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}">${g}</svg>`;
};
const PLAN_OPTS = [
  [[2, 0, 1], [0, 3, 2], [1, 1, 0]],   // matches the front view; side view back to front
  PLAN_OK,                             // correct
  [[1, 0, 1], [0, 2, 3], [2, 1, 0]],   // matches the side view only
  [[1, 0, 1], [0, 2, 2], [2, 3, 0]]    // matches the front view only (tallest stack in the front row)
].map((rows, i) => planGrid(rows, `Picture ${"ABCD"[i]}: top view, front at the bottom. Rows from back to front, number of cubes in each stack (0 = no cubes): ${rows.map(r => r.join(" ")).join(" / ")}`));

/* ---- Maths Q1: column graph ---- */
const BOOKS = [["4J", 30], ["4K", 35], ["4L", 20], ["4M", 10]];
const GRAPH_SVG = (() => {
  const x0 = 52, y0 = 230, h = 200, top = y0 - h, max = 40, bw = 44, gap = 26;
  const yOf = v => y0 - (v / max) * h;
  let g = "";
  for (let v = 0; v <= max; v += 5) {
    const big = v % 20 === 0;
    g += `<line x1="${x0}" y1="${yOf(v)}" x2="${x0 + 4 * (bw + gap) + 10}" y2="${yOf(v)}" stroke="${big ? "#9aa7b8" : "#d5dce6"}" stroke-width="1"/>`;
    if (big) g += `<text x="${x0 - 8}" y="${yOf(v) + 5}" font-size="14" text-anchor="end" fill="${INK}">${v}</text>`;
  }
  BOOKS.forEach(([name, v], i) => {
    const x = x0 + 16 + i * (bw + gap);
    g += `<rect x="${x}" y="${yOf(v)}" width="${bw}" height="${y0 - yOf(v)}" fill="#6f9fcf" stroke="${INK}" stroke-width="1.5"/>
          <text x="${x + bw / 2}" y="${y0 + 20}" font-size="14" text-anchor="middle" fill="${INK}">${name}</text>`;
  });
  g += `<line x1="${x0}" y1="${top - 6}" x2="${x0}" y2="${y0}" stroke="${INK}" stroke-width="2"/>
        <line x1="${x0}" y1="${y0}" x2="${x0 + 4 * (bw + gap) + 10}" y2="${y0}" stroke="${INK}" stroke-width="2"/>
        <text x="16" y="${(top + y0) / 2}" font-size="13" text-anchor="middle" fill="${INK}" transform="rotate(-90 16 ${(top + y0) / 2})">number of books</text>
        <text x="${x0 + 2 * (bw + gap) + 5}" y="${y0 + 42}" font-size="13" text-anchor="middle" fill="${INK}">class</text>`;
  return `<svg viewBox="0 0 340 282" width="340" height="282" style="max-width:100%;height:auto" role="img" aria-label="Column graph of books read by four classes. The scale is labelled 0, 20 and 40, with three unlabelled lines between each pair of labels. 4J reaches the second line above 20. 4K reaches the third line above 20. 4L reaches 20. 4M reaches the second line above 0.">${g}</svg>`;
})();

/* ---- Maths Q2: fraction of a square ---- */
const FRAC_SVG = (() => {
  const o = 10, s = 200, q = s / 2, sh = "#2f5e95";
  let g = `<rect x="${o}" y="${o}" width="${q}" height="${q}" fill="${sh}"/>`;                         // top-left quarter, shaded
  g += `<rect x="${o + q + q / 2}" y="${o}" width="${q / 2}" height="${q / 2}" fill="${sh}"/>`;         // one small square, top right
  g += `<path d="M${o} ${o + q} L${o} ${o + s} L${o + q} ${o + s} Z" fill="${sh}"/>`;                  // triangle, bottom left
  g += `<line x1="${o + q}" y1="${o}" x2="${o + q}" y2="${o + s}" stroke="${INK}" stroke-width="2"/>
        <line x1="${o}" y1="${o + q}" x2="${o + s}" y2="${o + q}" stroke="${INK}" stroke-width="2"/>
        <line x1="${o + q + q / 2}" y1="${o}" x2="${o + q + q / 2}" y2="${o + q}" stroke="${INK}" stroke-width="1.5"/>
        <line x1="${o + q}" y1="${o + q / 2}" x2="${o + s}" y2="${o + q / 2}" stroke="${INK}" stroke-width="1.5"/>
        <line x1="${o}" y1="${o + q}" x2="${o + q}" y2="${o + s}" stroke="${INK}" stroke-width="1.5"/>
        <rect x="${o}" y="${o}" width="${s}" height="${s}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  return `<svg viewBox="0 0 220 220" width="220" height="220" role="img" aria-label="A large square split into four equal quarters. The top-left quarter is all shaded. The top-right quarter is split into four equal small squares, and the top-right small square is shaded. The bottom-left quarter is split by a diagonal into two equal triangles, and the triangle in its bottom-left corner is shaded. The bottom-right quarter is not shaded.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the poem, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "In verse 2, the daffodils are “Continuous as the stars that shine / And twinkle on the milky way”. What does this comparison mainly suggest about the daffodils?",
        options: ["They were growing high up on a hill, so they seemed close to the sky.",
                  "They were small and far away, so the speaker could hardly see them.",
                  "They sparkled and shone even more brightly than the waves of the lake beside them.",
                  "There were so many, in such a long line, that they seemed to go on for ever."],
        answer: 3,
        skill: "interpreting a comparison (imagery) in a poem",
        explain: `<p>The Milky Way is a band of countless stars stretching right across the night sky. The very next lines explain the comparison: the daffodils “stretched in never-ending line / Along the margin of a bay” and there were “Ten thousand” of them. So, like the stars, they were so many and stretched so far that they seemed endless.</p>
                  <p class="why-not">C is the trap: the waves do sparkle, but that is in verse 3, and it is the daffodils’ <em>glee</em> (their lively dancing) that outdoes the waves, not their brightness; it is not what the star comparison is about. A takes the comparison literally and borrows “on high” from verse 1, which describes the cloud, not the flowers; the daffodils are “Beside the lake”. B picks up that stars are small and distant, but the speaker saw ten thousand “at a glance”, so he could see them very well.</p>`
      },
      {
        stem: "The poem begins with the speaker wandering “lonely as a cloud”. In verse 3 he says, “A poet could not but be gay, / In such a jocund company”. What do these lines suggest?",
        options: ["He felt shy because there were so many other people walking beside the lake that day.",
                  "He could not help being cheered up, as if the daffodils were merry friends.",
                  "He was trying hard to look cheerful, although he still felt lonely inside.",
                  "He wished he could write a poem as cheerful as the dancing waves were."],
        answer: 1,
        skill: "working out feelings shown rather than stated",
        explain: `<p>“Could not but be gay” means <em>could not help being cheerful</em>, and the “jocund company” is the merry crowd of daffodils (and dancing waves) around him. The poem began with him “lonely”; now the flowers are described like cheerful friends whose happiness he catches. So his loneliness has turned into delight.</p>
                  <p class="why-not">A is the trap: it reads “company” as a group of people, but the only crowd in the poem is the “crowd” of daffodils, and he is not shy but delighted. C misreads “could not but”: it means he couldn’t help it, not that he was pretending. D picks up the word “poet” and the dancing waves, but the lines are about how the scene made him feel, not about wanting to write.</p>`
      },
      {
        stem: "In verse 3, the speaker says that when he saw the daffodils he “little thought / What wealth the show to me had brought”. What does the last verse show this “wealth” to be?",
        options: ["The money that such a large field of daffodils would be worth if they were picked and sold.",
                  "The time he now spends alone lying on his couch, resting and thinking about nothing at all.",
                  "A memory that comes back to him whenever he is alone and fills him with happiness again.",
                  "The friends he made by the lake, who keep him company whenever he is feeling lonely."],
        answer: 2,
        skill: "understanding the main idea of a whole poem (linking two verses)",
        explain: `<p>At the time, he “little thought” (hardly realised) what the sight had given him. Verse 4 shows what it was: long afterwards, lying on his couch with an empty or thoughtful mind, the daffodils “flash upon that inward eye” (he sees them again in his memory) and his heart “with pleasure fills, / And dances with the daffodils”. So the “wealth” is not money but a happy memory he can enjoy again and again. Even being alone, which made him “lonely” at the start, has become “the bliss of solitude”.</p>
                  <p class="why-not">A is the trap: it takes “wealth” literally, but nothing in the poem is about money or picking flowers; the word is used to show how valuable the memory is. B uses real details from verse 4 (his couch, his “vacant” mood), but those are just when the memory comes back; the empty-minded moments are not the treasure. D turns the “jocund company” of verse 3 into real people; his only company was the daffodils, and later he is alone.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Mr Patel:</em> “Our canteen should move the fruit bowl to the front of the counter, next to where students wait in line, so that students buy more fruit.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, most strongly supports Mr Patel’s claim?</p>`,
        options: ["Students often add one more thing that they can see and reach while they wait in line.",
                  "Fruit is much healthier for students than the chips and biscuits that the canteen also sells.",
                  "Students who buy fruit at the canteen also tend to drink more water during the day.",
                  "There is more space at the front of the counter than there is at the back of the canteen."],
        answer: 0,
        skill: "choosing the statement that best supports a claim",
        explain: `<p>Mr Patel’s claim has two parts: <b>move the fruit next to the line</b> → <b>students buy more fruit</b>. The best support must link the two. A does: if students often add something they can see and reach while waiting, then fruit placed right beside the line is likely to be bought more often.</p>
                  <p class="why-not">B is the trap: it is true and it is about fruit, but it only says why buying fruit would be <em>good</em>; it doesn’t show that moving the fruit would make students buy more of it. C is about students who already buy fruit, and drinking water, not about where the fruit is placed. D shows the move would be easy, but having room for the bowl doesn’t make anyone buy fruit.</p>`
      },
      {
        stem: `Look at the numbers at the ends of the arrows on this wheel.
               <div class="figure">${WHEEL_SVG}</div>
               <p style="margin:10px 0 0">Which number should replace <b>??</b></p>`,
        options: ["49", "54", "56", "63"],
        answer: 2,
        skill: "finding the rule that links numbers in a diagram (supplied by David)",
        explain: `<p>Each straight line goes through the centre, so look at the two numbers at the ends of the same line:</p>
                  <p>3 and 12 &nbsp; 4 and 20 &nbsp; 5 and 30 &nbsp; 6 and 42 &nbsp; 7 and ??</p>
                  <p>Each big number is the small number times the next number: 3 × 4 = 12, 4 × 5 = 20, 5 × 6 = 30, 6 × 7 = 42. So ?? = 7 × 8 = <b>56</b>.</p>
                  <p>(Check another way: 12, 20, 30, 42 go up by 8, 10, 12, so the next jump is 14, and 42 + 14 = 56.)</p>
                  <p class="why-not">49 (A) is the trap: it multiplies 7 by itself, but every pair uses the number and the <em>next</em> number (3 × 4, not 3 × 3). 54 (B) adds 12 again, repeating the last jump instead of seeing that the jumps grow by 2 each time. 63 (D) works out 7 × 9, jumping one number too far.</p>`
      },
      {
        stem: `A model is made of cubes standing on a 3 by 3 square grid. Here is what it looks like from the front and from the right side.
               <div class="figure">${VIEWS_SVG}</div>
               <p style="margin:10px 0 0">Each picture below shows the grid from above, with the front at the bottom. The numbers show how many cubes are stacked on each square. Which one could be the model?</p>`,
        visualOptions: true,
        options: PLAN_OPTS,
        answer: 1,
        skill: "matching a top view (with stack heights) to front and side views",
        explain: `<p>From any side you see only the <b>tallest stack</b> in each line of squares.</p>
                  <p><b>Front view</b> (left, middle, right columns): tallest stacks must be 2, 3, 2.<br>
                  <b>Right-side view</b> (front, middle, back rows): tallest stacks must be 2, 3, 1. The front of the model is on the <em>left</em> of this view.</p>
                  <p>Picture B: columns have tallest stacks 2, 3, 2 ✓; the front row has tallest 2, the middle row 3 and the back row 1 ✓. So <b>B</b> could be the model.</p>
                  <p class="why-not">A is the trap: its columns match the front view, but its rows from front to back are 1, 3, 2, which is the side view read the wrong way round (front and back swapped). C matches the side view, but its columns are 2, 2, 3, so from the front the tallest stack would be on the right. D matches the front view, but its tallest stack (3) is in the front row, so from the side you would see 3, 2, 1.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `The graph shows how many books four classes read in a read-a-thon.
               <div class="figure">${GRAPH_SVG}</div>
               <p style="margin:10px 0 0">How many more books did class 4K read than class 4M?</p>`,
        options: ["5", "21", "25", "35", "45"],
        answer: 2,
        skill: "reading a column graph with unlabelled lines",
        explain: `<p>The labels go up in 20s, and there are 4 equal steps between 0 and 20, so each line is worth 20 ÷ 4 = <b>5</b> books.</p>
                  <p>4K reaches the third line above 20: 20 + 15 = <b>35</b>. 4M reaches the second line above 0: <b>10</b>. So 4K read 35 − 10 = <b>25</b> more.</p>
                  <p class="why-not">21 (B) is the trap: it reads each unlabelled line as 1 book, so 4K looks like 23 and 4M like 2. 5 (A) counts the 5 lines between the tops of the two columns but forgets each line is worth 5 books. 35 (D) is how many 4K read, not how many more. 45 (E) adds the two classes instead of finding the difference.</p>`
      },
      {
        stem: `What fraction of this square is shaded?
               <div class="figure">${FRAC_SVG}</div>`,
        options: ["3/16", "1/4", "5/16", "3/8", "7/16"],
        answer: 4,
        skill: "fractions: shaded parts of different sizes (using sixteenths)",
        explain: `<p>Change every piece into sixteenths of the big square. Each quarter is 4/16.</p>
                  <ul>
                    <li>The whole top-left quarter: <b>4/16</b>.</li>
                    <li>One small square in the top-right quarter (a quarter of a quarter): <b>1/16</b>.</li>
                    <li>One triangle in the bottom-left quarter (half of a quarter): <b>2/16</b>.</li>
                  </ul>
                  <p>Altogether 4/16 + 1/16 + 2/16 = <b>7/16</b>.</p>
                  <p class="why-not">3/8 (D) is the trap: it counts pieces (3 shaded out of 8 pieces), but the pieces are different sizes. 5/16 (C) forgets the shaded triangle. 1/4 (B) counts only the fully shaded quarter. 3/16 (A) counts the 3 shaded pieces as if each one were a sixteenth.</p>`
      },
      {
        stem: `Ruby catches the 8:34 am train. The train trip takes 47 minutes. Then she changes to a bus at the station.
               <p style="margin:10px 0 0">Buses leave the station every 25 minutes. The first bus of the day leaves at 6:50 am.</p>
               <p style="margin:10px 0 0">How long does Ruby wait at the station for the next bus?</p>`,
        options: ["9 minutes", "19 minutes", "21 minutes", "24 minutes", "25 minutes"],
        answer: 3,
        skill: "time: arrival time, then the next departure from a repeating timetable",
        explain: `<p><b>Step 1, when Ruby arrives:</b> 8:34 + 26 minutes = 9:00, and 21 more minutes makes 47, so she arrives at <b>9:21 am</b>.</p>
                  <p><b>Step 2, the bus times:</b> count on in 25s from 6:50: 7:15, 7:40, 8:05, 8:30, 8:55, 9:20, <b>9:45</b>. She just misses the 9:20 bus, so the next one is at 9:45.</p>
                  <p><b>Step 3:</b> from 9:21 to 9:45 is <b>24 minutes</b>.</p>
                  <p class="why-not">19 minutes (B) is the trap: it assumes the buses leave at the same minutes every hour (:15 and :40, like 7:15 and 7:40), so it picks a 9:40 bus. But 25-minute gaps don’t fit evenly into an hour, so the minutes change. 21 minutes (C) uses 8:34, when the train leaves, instead of when it arrives (the next bus after 8:34 is 8:55). 9 minutes (A) counts in 25s from 7:00 instead of 6:50 (9:05, 9:30). 25 minutes (E) assumes she always waits the full gap between buses.</p>`
      }
    ]
  }
];
