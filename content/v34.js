/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 34
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>The first time Dad suggested geocaching, I rolled my eyes and told him that a treasure hunt using a phone app sounded like something for little kids. Three years and more than two hundred finds later, I have well and truly {1} my words.</p>
<p>Geocaching began in 2000, and there are now millions of hidden containers, called caches, tucked away all over the world. The app shows you roughly where one is, but the last few metres are up to you. A cache might be a film canister wedged inside a hollow log, or a magnetic box stuck to the back of a sign. Some are hidden in such plain view that you can walk past them a dozen times before the penny {2}.</p>
<p>Inside every cache is a logbook to sign, and sometimes small trinkets to swap. The rule is simple: if you take something, leave something of equal or greater value.</p>
<p>The hardest part is not being spotted. Geocachers call people who don’t play “muggles”, and searching a bus shelter while someone is waiting for a bus takes nerves of steel. More than once, I have had to pretend I was tying my shoelace.</p>
<p>But the best thing about geocaching has nothing to do with treasure. It has taken us to waterfalls, lookouts and laneways we would never have {3} upon otherwise. In a way, the containers are just an excuse to explore.</p>`;

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
  title: "Hidden in Plain Sight",
  note: "Read the text below and decide which answer best fits each gap.",
  html: clozeHtml
};

/* ---- Thinking Skills Q2: long jump table ---- */
const JUMPS = [["Ana", 312, 298, 305], ["Ben", 290, 318, 301], ["Chi", 309, 309, 311], ["Dev", 315, 280, 299], ["Eli", 305, 314, 308]];
const JUMP_TABLE = (() => {
  const th = t => `<th style="border-bottom:2px solid ${INK};padding:5px 12px;text-align:center">${t}</th>`;
  const td = t => `<td style="border-bottom:1px solid #d5dbe5;padding:5px 12px;text-align:center">${t}</td>`;
  return `<table style="border-collapse:collapse;margin:10px 0 4px;font-size:0.95em">
    <tr>${th("child")}${th("jump 1")}${th("jump 2")}${th("jump 3")}</tr>
    ${JUMPS.map(r => `<tr>${r.map(td).join("")}</tr>`).join("")}
  </table>`;
})();

/* ---- Thinking Skills Q3: dice nets ---- */
const NETS = {
  cross: [[0, 1, 3], [1, 0, 1], [1, 1, 2], [1, 2, 5], [1, 3, 6], [2, 1, 4]],
  stair: [[0, 0, 1], [0, 1, 2], [1, 1, 3], [1, 2, 6], [2, 2, 4], [2, 3, 5]],
  twoRow: [[0, 0, 2], [0, 1, 1], [0, 2, 5], [1, 2, 6], [1, 3, 4], [1, 4, 3]],
  valid: [[0, 0, 5], [1, 0, 1], [1, 1, 3], [1, 2, 6], [1, 3, 4], [2, 3, 2]]
};
function netSvg(cells, label) {
  const u = 26, R = Math.max(...cells.map(c => c[0])) + 1, C = Math.max(...cells.map(c => c[1])) + 1;
  const W = 5 * u + 6, H = 3 * u + 6, ox = (W - C * u) / 2, oy = (H - R * u) / 2;
  let g = "";
  cells.forEach(([r, c, n]) => g += `<rect x="${ox + c * u}" y="${oy + r * u}" width="${u}" height="${u}" fill="#fff" stroke="${INK}" stroke-width="1.8"/>
    <text x="${ox + c * u + u / 2}" y="${oy + r * u + u / 2 + 6}" font-size="17" font-weight="700" text-anchor="middle" fill="${INK}">${n}</text>`);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}">${g}</svg>`;
}
const NET_OPTS = [
  netSvg(NETS.cross, "Net A: a cross. Middle row 1, 2, 5, 6. 3 above the 2 and 4 below the 2."),
  netSvg(NETS.stair, "Net B: a staircase. Top row 1, 2. Middle row 3, 6. Bottom row 4, 5, each row shifted one square right."),
  netSvg(NETS.twoRow, "Net C: two rows of three. Top row 2, 1, 5. Bottom row 6, 4, 3, starting under the 5."),
  netSvg(NETS.valid, "Net D: a row of four squares 1, 3, 6, 4, with 5 above the 1 and 2 below the 4.")
];

/* ---- Maths Q2: number cards ---- */
const CARD_NUMS = [2, 3, 3, 5, 6, 6, 6, 8, 9, 10];
const NUM_CARDS_SVG = (() => {
  let g = "";
  CARD_NUMS.forEach((d, i) => {
    const x = (i % 5) * 46, y = Math.floor(i / 5) * 58;
    g += `<rect x="${x}" y="${y}" width="38" height="50" rx="6" fill="#fff8e6" stroke="${INK}" stroke-width="1.8"/>
          <text x="${x + 19}" y="${y + 33}" font-size="21" font-weight="700" text-anchor="middle" fill="${INK}">${d}</text>`;
  });
  return `<svg viewBox="-2 -2 226 112" width="226" height="112" role="img" aria-label="Ten number cards: 2, 3, 3, 5, 6, 6, 6, 8, 9 and 10.">${g}</svg>`;
})();

/* ---- Maths Q3: matchstick pattern ---- */
const MATCH_SVG = (() => {
  const s = 34, gap = 40, stick = (x1, y1, x2, y2) => { const dx = Math.sign(x2 - x1) * 4, dy = Math.sign(y2 - y1) * 4;
    return `<line x1="${x1 + dx}" y1="${y1 + dy}" x2="${x2 - dx}" y2="${y2 - dy}" stroke="#c9852b" stroke-width="4.5" stroke-linecap="round"/>`; };
  let g = "", x0 = 26;
  [1, 2, 3].forEach(n => {
    for (let k = 0; k <= n; k++) g += stick(x0 + k * s, 50, x0 + k * s, 50 - s);
    for (let k = 0; k < n; k++) { g += stick(x0 + k * s, 50 - s, x0 + (k + 1) * s, 50 - s); g += stick(x0 + k * s, 50, x0 + (k + 1) * s, 50); }
    g += `<text x="${x0 + n * s / 2}" y="76" font-size="13" text-anchor="middle" fill="${INK}">Pattern ${n}</text>`;
    x0 += n * s + gap;
  });
  return `<svg viewBox="0 6 ${x0 - gap + 26} 78" width="${Math.round((x0 - gap + 26) * 1.35)}" height="${Math.round(78 * 1.35)}" role="img" aria-label="Matchstick patterns. Pattern 1 is one square made of 4 matchsticks. Pattern 2 is two squares in a row made of 7 matchsticks. Pattern 3 is three squares in a row made of 10 matchsticks.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["bitten", "tasted", "eaten", "chewed"],
        answer: 2,
        skill: "completing an idiom",
        explain: `<p>To <b>eat your words</b> means to admit that something you said was wrong. The writer once told Dad that geocaching was for little kids, but after hundreds of finds they clearly love it, so they have “eaten their words”.</p>
                  <p class="why-not">“Bitten” is the trap: “bite your tongue” is a real expression, but it means stopping yourself from saying something, not admitting you were wrong. “Chewed” is close too (“chew something over” means think about it), but it doesn’t go with “words” in this way. “Tasted” makes no sense here.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["drops", "falls", "sinks", "lands"],
        answer: 0,
        skill: "completing a fixed expression",
        explain: `<p>“The penny <b>drops</b>” means that someone finally understands or notices something. Here, you walk past a cache many times before you suddenly realise it was right in front of you.</p>
                  <p class="why-not">“Falls” is the trap: it means almost the same as “drops”, but the expression only works with “drops”. Nobody says “the penny falls”. “Sinks” and “lands” are also movements downward, but neither makes the expression.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["tripped", "slipped", "clambered", "stumbled"],
        answer: 3,
        skill: "choosing the word that goes with “upon”",
        explain: `<p>To <b>stumble upon</b> something means to find it by chance. That is exactly the point of the paragraph: geocaching led the family to places they would never have found otherwise.</p>
                  <p class="why-not">“Tripped” is the trap: it is close in meaning to “stumbled”, but you trip <em>over</em> something, and “tripped upon” doesn’t mean finding something by chance. “Slipped” doesn’t go with “upon” either. “Clambered” means climbed with difficulty.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Mr Lim:</em> “Students should walk or ride to school whenever they can, because it helps them arrive ready to learn.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Mr Lim’s claim?</p>`,
        options: ["Students who are active before school tend to concentrate better in their first lessons.",
                  "There is much less traffic outside the school gate in the mornings when more students walk or ride.",
                  "Students who walk or ride usually arrive at school earlier than students who are driven.",
                  "Walking or riding to school costs families less than driving every day."],
        answer: 0,
        skill: "choosing the evidence that supports a claim",
        explain: `<p>Mr Lim’s <em>reason</em> is that walking or riding helps students “arrive ready to learn”. A links being active before school with concentrating better in class, which is exactly what “ready to learn” means.</p>
                  <p class="why-not">C is the trap: it is about students <em>arriving</em>, but arriving earlier doesn’t mean arriving <em>ready to learn</em>. B (less traffic) and D (cost) are real benefits of walking and riding, but they are different reasons from the one Mr Lim gives.</p>`
      },
      {
        stem: `In a long jump competition, each child had three jumps. Only each child’s <b>longest</b> jump counted. The table shows every jump, in centimetres.
               ${JUMP_TABLE}
               <p style="margin:10px 0 0">Who came <b>second</b>?</p>`,
        options: ["Ana", "Chi", "Dev", "Eli"],
        answer: 2,
        skill: "reading a table using a rule",
        explain: `<p>Find each child’s longest jump: Ana 312, Ben <b>318</b>, Chi 311, Dev <b>315</b>, Eli 314.</p>
                  <p>Ben came first with 318, and <b>Dev</b> came second with 315.</p>
                  <p class="why-not">B (Chi) is the trap: Chi’s three jumps add up to the most (929 cm), but only the longest jump counts. D (Eli) has the second-highest total. A (Ana) is second if you only look at the first jumps.</p>`
      },
      {
        stem: `On a normal dice, the numbers on opposite faces always add up to 7 (1 and 6, 2 and 5, 3 and 4).
               <p style="margin:10px 0 0">Which net folds up to make a normal dice?</p>`,
        visualOptions: true,
        options: NET_OPTS,
        answer: 3,
        skill: "picturing which faces of a net end up opposite",
        explain: `<p>When a net is folded, two squares end up opposite each other if they are <b>two apart in a straight line</b> (with one square between them). Check each net:</p>
                  <p><b>D:</b> in the row 1, 3, 6, 4, the pairs two apart are 1 and 6, and 3 and 4. The 5 and the 2 are on opposite sides of the row and fold onto opposite faces. All three pairs add to 7 ✓</p>
                  <p class="why-not"><b>A</b> is the trap: 1 and 6 are at the two <em>ends</em> of the row, which looks right, but squares at the ends of a row of four end up next to each other, not opposite. In the row 1, 2, 5, 6, the opposite pairs are 1 and 5, and 2 and 6. <b>B</b> gets 1 and 6 opposite, but its other pairs are 2 and 4, and 3 and 5. <b>C</b> gets 2 and 5 opposite, but pairs 1 with 4 and 3 with 6.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Pens cost $1.35 each. Mia buys 4 pens and pays with a $10 note.
               <p style="margin:10px 0 0">How much change should she get?</p>`,
        options: ["$4.60", "$5.40", "$5.60", "$6.00", "$8.65"],
        answer: 0,
        skill: "money: multiplying, then finding change",
        explain: `<p>4 pens cost 4 × $1.35. Split it up: 4 × $1 = $4 and 4 × 35c = $1.40, so 4 pens cost <b>$5.40</b>.</p>
                  <p>Change: $10 − $5.40 = <b>$4.60</b>.</p>
                  <p class="why-not">$5.40 (B) is the trap: it is what the pens cost, not the change. $5.60 (C) works out 4 × 35c as 40c, forgetting to carry the extra dollar, so the pens seem to cost $4.40. $6.00 (D) rounds each pen down to $1. $8.65 (E) is the change for just one pen.</p>`
      },
      {
        stem: `These ten number cards are put in a bag. One card is picked without looking.
               <div class="figure">${NUM_CARDS_SVG}</div>
               <ol style="margin:8px 0 0;padding-left:22px">
                 <li>Picking an even number is more likely than picking an odd number.</li>
                 <li>Picking a 6 is just as likely as picking a number less than 5.</li>
                 <li>It is certain that the card picked will show a number less than 10.</li>
               </ol>
               <p style="margin:8px 0 0">Which of these statements is/are correct?</p>`,
        options: ["statement 1 only", "statement 2 only", "statements 1 and 2 only", "statements 1 and 3 only", "statements 1, 2 and 3"],
        answer: 2,
        skill: "chance: counting outcomes, including repeated cards",
        explain: `<p><b>1:</b> the even cards are 2, 6, 6, 6, 8 and 10, which is 6 cards. The odd cards are 3, 3, 5 and 9, which is 4 cards. Even is more likely ✓</p>
                  <p><b>2:</b> there are three 6s, and three cards less than 5 (2, 3 and 3). They are equally likely ✓</p>
                  <p><b>3:</b> one card shows 10, and 10 is <em>not</em> less than 10. So it isn’t certain ✗</p>
                  <p class="why-not">E is the trap: statement 3 feels true because almost every card is small, but “certain” means it must happen every time, and the 10 card stops that. Counting each number only once (forgetting the repeated 3s and 6s) can make statements 1 and 2 look wrong.</p>`
      },
      {
        stem: `Here are the first three patterns in a sequence made from matchsticks.
               <div class="figure">${MATCH_SVG}</div>
               <p style="margin:10px 0 0">How many matchsticks are needed for Pattern 20?</p>`,
        options: ["60", "61", "62", "64", "80"],
        answer: 1,
        skill: "finding the rule for a growing pattern",
        explain: `<p>Pattern 1 uses 4 matchsticks, and each new square adds <b>3</b> more (it shares one side with the square before). So the patterns go 4, 7, 10, 13, …</p>
                  <p>Pattern 20 is the first square plus 19 more squares: 4 + 19 × 3 = 4 + 57 = <b>61</b>. (Or: 3 for every square, plus the 1 starting stick: 3 × 20 + 1 = 61.)</p>
                  <p class="why-not">62 (C) is the trap: Pattern 10 uses 31 matchsticks, but doubling it counts the shared starting stick twice. 80 (E) uses 4 matchsticks for every square, forgetting that they share sides. 60 (A) forgets the very first stick. 64 (D) adds 20 lots of 3 to Pattern 1, which is one square too many.</p>`
      }
    ]
  }
];
