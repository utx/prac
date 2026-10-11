/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 53
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>Walk through a damp forest in south-eastern Australia on a winter morning and you might hear a kookaburra laughing, a whipbird cracking its whip and a rosella chattering, all within a minute and all from the same clump of ferns. {1} This shy brown bird is one of the finest mimics in the animal world, and Australians are so fond of it that it appears on the ten-cent coin.</p>
<p>Only the male lyrebird has the famous tail. It is made of sixteen feathers, and the two long outer ones curve like the frame of a lyre, an ancient stringed instrument, which is how the bird got its name. In winter, each male scratches up several low mounds of bare earth around his patch of forest. {2} Then he swings his tail forward over his head, so that its fine silvery feathers hang around him like a shimmering veil, and he begins to sing and dance.</p>
<p>Most of his song is borrowed. As well as his own loud calls, a male copies the calls of a dozen or more other kinds of birds, and he copies them so well that even experienced birdwatchers can be fooled. Young males spend years practising. A few lyrebirds that live near people have gone even further, copying car alarms, camera shutters and chainsaws. Scientists think that a female listens closely, and that a male who performs many sounds, and performs them well, is more likely to win her. {3}</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "So when a whole forest seems to be singing at once, it may really be just one bird, putting on the show of his life.",
  "Creep closer, though, and you may find only one bird, scratching about among the dead leaves: a lyrebird.",
  "There he sings the calls of all three birds, one after the other.",
  "Each of these is a stage, and when a female comes near, he climbs onto one of them.",
  "This means that the male who knows the most sounds is always the one a female chooses."
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
  title: "The Forest’s Greatest Copycat",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: long-jump results ---- */
const cj = s => `<td style="text-align:center;white-space:nowrap">${s}</td>`;
const jumpRow = (name, a, b, c) => `<tr><th>${name}</th>${cj(a)}${cj(b)}${cj(c)}</tr>`;
const JUMP_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th>name</th><th style="text-align:center">jump 1</th><th style="text-align:center">jump 2</th><th style="text-align:center">jump 3</th></tr>
  ${jumpRow("Ava", "285 cm", "310 cm", "250 cm")}
  ${jumpRow("Ben", "330 cm", "foul", "240 cm")}
  ${jumpRow("Cara", "300 cm", "295 cm", "270 cm")}
  ${jumpRow("Dev", "290 cm", "288 cm", "292 cm")}
</table></div>`;

/* ---- Thinking Skills Q3: objects on a table, seen from one side ---- */
// Objects on a 4 × 4 table grid: [column, row] with row 0 at the top (Ana's side).
const TABLE_OBJS = [
  { name: "vase", at: [0, 0] },
  { name: "box", at: [3, 1] },
  { name: "cone", at: [2, 2] },
  { name: "ball", at: [1, 3] }
];
const topIcon = (name, cx, cy) => {
  if (name === "vase") return `<circle cx="${cx}" cy="${cy}" r="12" fill="#5b8fd1" stroke="${INK}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="5" fill="#ffffff" stroke="${INK}" stroke-width="1.2"/>`;
  if (name === "box") return `<rect x="${cx - 12}" y="${cy - 12}" width="24" height="24" fill="#e9a23b" stroke="${INK}" stroke-width="1.6"/>`;
  if (name === "cone") return `<circle cx="${cx}" cy="${cy}" r="12" fill="#7cc47f" stroke="${INK}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="2.5" fill="${INK}"/>`;
  return `<circle cx="${cx}" cy="${cy}" r="11" fill="#d9534f" stroke="${INK}" stroke-width="1.6"/>`;
};
const TOP_SVG = (() => {
  const c = 54, o = 58, n = 4, W = n * c + 2 * o, H = n * c + 2 * o;
  let g = `<rect x="${o}" y="${o}" width="${n * c}" height="${n * c}" rx="6" fill="#f6ead6" stroke="${INK}" stroke-width="2.2"/>`;
  for (let k = 1; k < n; k++) {
    g += `<line x1="${o + k * c}" y1="${o}" x2="${o + k * c}" y2="${o + n * c}" stroke="#d8c6a8" stroke-width="1"/>`;
    g += `<line x1="${o}" y1="${o + k * c}" x2="${o + n * c}" y2="${o + k * c}" stroke="#d8c6a8" stroke-width="1"/>`;
  }
  TABLE_OBJS.forEach(({ name, at: [x, y] }) => {
    const cx = o + x * c + c / 2, cy = o + y * c + c / 2 - 7;
    g += topIcon(name, cx, cy) + `<text x="${cx}" y="${cy + 25}" font-size="12" text-anchor="middle" fill="${INK}">${name}</text>`;
  });
  const mid = o + n * c / 2;
  const seat = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#cfd8e3" stroke="${INK}" stroke-width="1.4"/>`;
  g += seat(mid - 24, o - 30, 48, 18) + `<text x="${mid}" y="${o - 36}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">Ana</text>`;
  g += seat(o + n * c + 12, mid - 24, 18, 48) + `<text x="${o + n * c + 21}" y="${mid + 44}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">Ben</text>`;
  g += seat(mid - 24, o + n * c + 12, 48, 18) + `<text x="${mid}" y="${o + n * c + 50}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">Cal</text>`;
  g += seat(o - 30, mid - 24, 18, 48) + `<text x="${o - 21}" y="${mid + 44}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">Dee</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A square table seen from above, with Ana sitting at the top side, Ben at the right side, Cal at the bottom side and Dee at the left side. On the table, imagined as a 4 by 4 grid: a vase in the top-left square; a box in the right-hand column, second row from the top; a cone in the third column from the left, third row; a ball in the second column from the left, bottom row.">${g}</svg>`;
})();
const sideIcon = (name, x, base) => {
  if (name === "vase") return `<path d="M${x - 9} ${base - 70} h18 v8 q14 10 14 34 q0 28 -14 28 h-18 q-14 0 -14 -28 q0 -24 14 -34 z" fill="#5b8fd1" stroke="${INK}" stroke-width="1.6"/>`;
  if (name === "box") return `<rect x="${x - 19}" y="${base - 38}" width="38" height="38" fill="#e9a23b" stroke="${INK}" stroke-width="1.6"/>`;
  if (name === "cone") return `<path d="M${x - 18} ${base} L${x} ${base - 52} L${x + 18} ${base} Z" fill="#7cc47f" stroke="${INK}" stroke-width="1.6"/>`;
  return `<circle cx="${x}" cy="${base - 17}" r="17" fill="#d9534f" stroke="${INK}" stroke-width="1.6"/>`;
};
const VIEW_SVG = (() => {
  const order = ["vase", "box", "cone", "ball"], step = 66, W = order.length * step + 20, base = 86, H = 112;
  let g = `<line x1="4" y1="${base}" x2="${W - 4}" y2="${base}" stroke="${INK}" stroke-width="2"/>`;
  order.forEach((n, i) => {
    const x = 10 + step / 2 + i * step;
    g += sideIcon(n, x, base) + `<text x="${x}" y="${base + 20}" font-size="13" text-anchor="middle" fill="${INK}">${n}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="The view: from left to right, the vase, the box, the cone and the ball, standing in a row.">${g}</svg>`;
})();

/* ---- Maths Q3: a sail on 1 cm grid paper ---- */
const SAIL_SVG = (() => {
  const s = 40, o = 14, Wc = 5, Hc = 4, W = Wc * s + 2 * o, H = Hc * s + 2 * o;
  let g = "";
  for (let k = 0; k <= Wc; k++) g += `<line x1="${o + k * s}" y1="${o}" x2="${o + k * s}" y2="${o + Hc * s}" stroke="#b9c4d2" stroke-width="1"/>`;
  for (let k = 0; k <= Hc; k++) g += `<line x1="${o}" y1="${o + k * s}" x2="${o + Wc * s}" y2="${o + k * s}" stroke="#b9c4d2" stroke-width="1"/>`;
  const P = (x, y) => `${o + x * s},${o + y * s}`;
  g += `<polygon points="${P(0, 4)} ${P(5, 4)} ${P(2, 0)}" fill="#f2b45a" fill-opacity="0.85" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A shaded triangle drawn on centimetre grid paper that is 5 squares wide and 4 squares tall. The bottom side of the triangle runs along the bottom grid line for 5 squares. The top corner is on the top grid line, 2 squares in from the left end of the bottom side. The two slanting sides cut across many squares.">${g}</svg>`;
})();

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
        answer: 1,
        skill: "using a reference word (“This shy brown bird”) to place a sentence",
        explain: `<p>After the gap comes “<b>This shy brown bird</b> is one of the finest mimics …”. “This bird” must point back to <em>one</em> bird that has just been named. The sentence before the gap names three different birds, so “this bird” can’t point to any of them. Sentence <b>B</b> fills the hole: it says that only one bird is really there and names it, “a lyrebird”. It also explains the puzzle in the first sentence: how three birds could be calling from the same clump of ferns.</p>
                  <p class="why-not">C is the trap: “There” seems to point to the clump of ferns, and “all three birds” follows on from the kookaburra, whipbird and rosella. But “he” has no one to point back to, and C still leaves “This shy brown bird” with no bird to refer to. E has nothing for “This” to point back to and talks about females choosing before the article has even mentioned them.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 3,
        skill: "following a sequence: what the mounds are for, then what happens next",
        explain: `<p>Before the gap, the male scratches up several low mounds of earth. After it: “<b>Then</b> he swings his tail forward … and he <b>begins</b> to sing and dance.” Sentence <b>D</b> fits between them. “<b>Each of these</b>” points back to the mounds and tells us what they are for (a stage), and “he climbs onto one of them” is the step that comes just before “Then he swings his tail forward”. It also brings in the female, who explains why he is putting on a show at all.</p>
                  <p class="why-not">C is the trap: “There” could point to the mounds, and singing does belong in this part of the article. But C has him already singing the calls, and the next sentence says he only <em>begins</em> to sing after swinging his tail forward, so the order breaks. “All three birds” also points back to the first paragraph, where it no longer makes sense. E can’t go here: “This means …” has nothing to sum up, because no sounds or choosing have been mentioned yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>, the last sentence of the article?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 0,
        skill: "choosing an ending that sums up the main idea and links back to the start",
        explain: `<p>The last sentence should round off the <b>whole</b> article. The article begins with what sounds like several birds singing from one clump of ferns, and goes on to show that it is really one male lyrebird, copying sounds and performing to win a female. Sentence <b>A</b> brings all of this together. “A whole forest … singing at once” takes us back to the opening, “just one bird” is the surprise the article explains, and “the show of his life” sums up the mound, the tail, the dance and the borrowed songs, all put on for a female.</p>
                  <p class="why-not">E is the trap: it follows straight on from the sentence about females choosing, and “This means” sounds like a conclusion. But it says more than the article does. Scientists only <em>think</em> a good performer is <em>more likely</em> to win a female; E turns that into “always”. E also sums up only the last sentence, not the whole article. C would have the bird singing the three calls from the first paragraph again, and “There” would have no place to point to.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">At the school science fair, a project can win a prize <b>only if</b> it includes a poster.</p>
               <p class="quote"><em class="speaker">Nina:</em> “Leo’s project does not include a poster, so it can’t have won a prize.”</p>
               <p class="quote"><em class="speaker">Sam:</em> “Ava’s project won a prize, so it must include a poster.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Nina only", "Sam only", "Both Nina and Sam", "Neither Nina nor Sam"],
        answer: 2,
        skill: "deciding whose reasoning is correct (an “only if” rule used in both safe directions)",
        explain: `<p>“A project can win a prize <b>only if</b> it includes a poster” means a poster is <b>needed</b> to win. It does <em>not</em> mean a poster is enough to win.</p>
                  <p><b>Nina:</b> Leo’s project has no poster. A poster is needed, so Leo’s project can’t have won. Nina is correct.</p>
                  <p><b>Sam:</b> Ava’s project won. Every winning project must have the thing that is needed, so Ava’s project must include a poster. Sam is correct.</p>
                  <p>Both are correct, so the answer is <b>C</b>.</p>
                  <p class="why-not">A (Nina only) is the trap: Sam’s sentence starts from the prize and works back to the poster, so it looks like the rule turned around. But turning the rule around would be “Ava’s project has a poster, so it must have won a prize”. That would be wrong, because many projects with posters may not win. Sam goes the safe way: a winner must have what is needed. B (Sam only) is for students who think a project without a poster might still win somehow, but “only if” rules that out. D is for students who think both have reversed the rule.</p>`
      },
      {
        stem: `Four children each had three jumps in a long-jump competition.
               ${JUMP_TABLE}
               <p style="margin:10px 0 0">A child’s score is the total of their <b>two longest</b> jumps. A foul does not count. If two children have the same score, the one with the <b>longest single jump</b> of the two wins.</p>
               <p style="margin:10px 0 0">Who won the competition?</p>`,
        options: ["Ava", "Ben", "Cara", "Dev"],
        answer: 0,
        skill: "using a results table with a scoring rule and a tie-break",
        explain: `<p><b>Step 1: each child’s two longest jumps.</b></p>
                  <p>Ava: 310 + 285 = <b>595</b> cm. Ben: 330 + 240 = <b>570</b> cm (the foul doesn’t count, so these are his only two jumps). Cara: 300 + 295 = <b>595</b> cm. Dev: 292 + 290 = <b>582</b> cm.</p>
                  <p><b>Step 2: the tie-break.</b> Ava and Cara are tied on 595. Ava’s longest jump is 310 cm and Cara’s is 300 cm, so <b>Ava</b> wins.</p>
                  <p class="why-not">C (Cara) is the trap: she ties with Ava, and her three jumps add up to more than Ava’s (865 cm against 845 cm), but the rule breaks a tie with the longest single jump, not the total of all three. B (Ben) has the longest single jump of all (330 cm), but the score uses two jumps, and his second-best is only 240 cm. D (Dev) has the biggest total of all three jumps (870 cm), but only the two longest jumps count.</p>`
      },
      {
        stem: `Ana, Ben, Cal and Dee sit at a square table, one on each side. This is the table seen from above.
               <div class="figure">${TOP_SVG}</div>
               <p style="margin:10px 0 0">One of the children sees the objects on the table in this order from left to right:</p>
               <div class="figure">${VIEW_SVG}</div>
               <p style="margin:10px 0 0">Which child is it?</p>`,
        options: ["Ana", "Ben", "Cal", "Dee"],
        answer: 3,
        skill: "working out which viewpoint gives a view: left and right from another side of a table",
        explain: `<p>Imagine sitting in each child’s place and facing the middle of the table. Objects nearer your <b>left hand</b> appear on the left of your view.</p>
                  <p><b>Dee</b> sits on the left side of the plan, facing right. Her left hand points to the <b>top</b> of the plan (Ana’s side) and her right hand to the bottom (Cal’s side). So she sees the objects in order from the top row of the plan to the bottom row: vase (top row), box (second row), cone (third row), ball (bottom row). That matches the view, so the answer is <b>D</b>.</p>
                  <p>Check the others: Cal (bottom side, facing up) sees vase, ball, cone, box. Ana (top side, facing down) sees box, cone, ball, vase. Ben (right side, facing left) sees ball, cone, box, vase.</p>
                  <p class="why-not">B (Ben) is the trap: Ben also sees the objects in top-to-bottom order of the plan, but he faces the other way, so for him the order is reversed, ball first and vase last. C (Cal) is tempting because Cal also sees the vase on his far left, but after that he sees the ball, not the box. A (Ana) is what you get if you read the plan from right to left along the rows.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `A fence is made of <b>12</b> panels joined end to end in a straight line. Each panel is <b>2 m 40 cm</b> long.
               <p style="margin:10px 0 0">How long is the fence?</p>`,
        options: ["24 m 40 cm", "24 m 48 cm", "24 m 80 cm", "28 m 8 cm", "28 m 80 cm"],
        answer: 4,
        skill: "length: multiplying metres and centimetres, then converting",
        explain: `<p><b>Step 1: multiply each part.</b> 12 × 2 m = 24 m, and 12 × 40 cm = 480 cm.</p>
                  <p><b>Step 2: convert.</b> 480 cm = 4 m 80 cm (100 cm make 1 m). So the fence is 24 m + 4 m 80 cm = <b>28 m 80 cm</b>.</p>
                  <p>Or in centimetres: 2 m 40 cm = 240 cm, and 12 × 240 = 2880 cm = 28 m 80 cm.</p>
                  <p class="why-not">28 m 8 cm (D) is the trap: it writes 480 cm as 4 m 8 cm, but 480 cm is 4 m and <em>80</em> cm. 24 m 80 cm (C) works out 480 cm but keeps only the 80 cm, losing the 4 m. 24 m 48 cm (B) treats 2 m 40 cm as 2.04 m. 24 m 40 cm (A) multiplies only the metres and adds the 40 cm once.</p>`
      },
      {
        stem: `Peyton was supposed to add 4 to the number on the board and then multiply the result by 3. Instead, Peyton added 3 to the number on the board and then multiplied the result by 4. Peyton got an answer of 48.
               <p style="margin:10px 0 0">What answer would Peyton get if he solved the problem correctly?</p>`,
        options: ["9", "36", "39", "45", "48"],
        answer: 2,
        skill: "working backwards with inverse operations, then working forwards (supplied by David)",
        explain: `<p><b>Step 1: work backwards from Peyton’s answer</b> to find the number on the board. Peyton’s last step was “multiply by 4”, so undo it: 48 ÷ 4 = 12. Before that he added 3, so undo that: 12 − 3 = <b>9</b>. The number on the board is 9.</p>
                  <p><b>Step 2: do the problem correctly.</b> Add 4: 9 + 4 = 13. Multiply by 3: 13 × 3 = <b>39</b>.</p>
                  <p>Check Peyton’s way: (9 + 3) × 4 = 12 × 4 = 48 ✓</p>
                  <p class="why-not">36 (B) is the trap: it undoes the “× 4” to get 12 and then does “× 3”, but it never finds the number on the board, so the “+ 3” is not undone and the “+ 4” is never added. 9 (A) stops at the number on the board. 45 (D) takes the 3 away from 48 without undoing the multiplying first. 48 (E) thinks it makes no difference, but adding 4 then multiplying by 3 is not the same as adding 3 then multiplying by 4.</p>`
      },
      {
        stem: `A sail is drawn on centimetre grid paper. Each small square is 1 cm by 1 cm.
               <div class="figure">${SAIL_SVG}</div>
               <p style="margin:10px 0 0">What is the area of the shaded sail?</p>`,
        options: ["5 cm²", "10 cm²", "15 cm²", "16 cm²", "20 cm²"],
        answer: 1,
        skill: "area of a triangle on a grid by splitting it into halves of rectangles",
        explain: `<p>Most squares are cut by the slanting sides, so counting squares is hard. Instead, draw a line straight up from the bottom to the top corner. It splits the sail into two triangles, and each one is <b>half of a rectangle</b>.</p>
                  <p><b>Left triangle:</b> it is half of a rectangle 2 squares wide and 4 tall. That rectangle is 2 × 4 = 8 cm², so the triangle is <b>4 cm²</b>.</p>
                  <p><b>Right triangle:</b> it is half of a rectangle 3 squares wide and 4 tall: 3 × 4 = 12 cm², so the triangle is <b>6 cm²</b>.</p>
                  <p>Area of the sail = 4 + 6 = <b>10 cm²</b>. (It is also half of the whole 5 × 4 rectangle: 20 ÷ 2 = 10.)</p>
                  <p class="why-not">20 cm² (E) is the trap: it is the whole 5 × 4 rectangle around the sail, forgetting that the sail fills only half of it. 16 cm² (D) halves only one of the two rectangles (4 + 12). 15 cm² (C) counts every square that is shaded at all as a whole square, even the ones that are only partly shaded. 5 cm² (A) counts only the squares that are completely shaded.</p>`
      }
    ]
  }
];
