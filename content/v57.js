/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 57
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>On the first day of the holidays, my aunt handed me three small beanbags and made a promise: “By the time school goes back, you’ll be juggling.” I laughed. I could barely catch one beanbag, let alone keep three of them in the air at once.</p>
<p>She showed me a pattern called the “cascade”. You throw the first beanbag in a gentle arc from one hand to the other. Just as it reaches the top of its arc, you throw the second one back the other way, underneath it. Then comes the third, and so on, with each hand throwing and catching in turn. Written down, it sounds simple. In my hands, it was chaos.</p>
<p>For the first week, the beanbags spent more time on the carpet than in the air. I would throw two, panic, and fling the third one at the ceiling. After a few days of endless drops, my enthusiasm had begun to {1}.</p>
<p>I was close to giving up, but my aunt urged me to {2} with it. She suggested that I practise standing over my bed. That way, every dropped beanbag would land on the quilt instead of rolling under the desk, and I wouldn’t spend half my time crawling about on my hands and knees. It worked. Soon I was practising for an hour at a time.</p>
<p>Slowly, the drops grew fewer. Five catches became ten, and ten became fifteen. Then, on the last Sunday of the holidays, I counted twenty catches in a row before a beanbag finally thudded onto the quilt. When I looked up, my aunt was leaning in the doorway. She didn’t say a word. She just gave me a slow, {3} smile.</p>`;

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
  title: "Three Beanbags",
  note: "Read the text below and decide which answer best fits each gap.",
  html: clozeHtml
};

/* ---- Thinking Skills Q2: bus and ferry timetables ---- */
const tc = s => `<td style="text-align:center;white-space:nowrap">${s}</td>`;
const timetable = (title, a, b, rows) => `<div class="table-wrap"><table class="grid">
  <tr><th colspan="2" style="text-align:center">${title}</th></tr>
  <tr><th style="text-align:center">${a}</th><th style="text-align:center">${b}</th></tr>
  ${rows.map(([x, y]) => `<tr>${tc(x)}${tc(y)}</tr>`).join("")}
</table></div>`;
const TRIP_TABLES = `<div style="display:flex;flex-wrap:wrap;gap:12px 28px;justify-content:center;align-items:flex-start">
  ${timetable("Bus", "leaves Hillview", "arrives at the wharf",
    [["9:20 am", "9:45 am"], ["9:35 am", "10:00 am"], ["9:50 am", "10:15 am"], ["10:05 am", "10:30 am"], ["10:20 am", "10:45 am"], ["10:35 am", "11:00 am"]])}
  ${timetable("Ferry", "leaves the wharf", "arrives at Seal Island",
    [["9:00 am", "9:50 am"], ["9:45 am", "10:35 am"], ["10:30 am", "11:20 am"], ["11:15 am", "12:05 pm"]])}
</div>`;

/* ---- Thinking Skills Q3: which net makes this cube ---- */
// each symbol is drawn in a 1 by 1 square, then stretched onto a face
const SYM = {
  circle: `<circle cx=".5" cy=".5" r=".25" fill="${INK}"/>`,
  ring: `<circle cx=".5" cy=".5" r=".25" fill="none" stroke="${INK}" stroke-width=".09"/>`,
  plus: `<rect x=".43" y=".2" width=".14" height=".6" fill="${INK}"/><rect x=".2" y=".43" width=".6" height=".14" fill="${INK}"/>`,
  cross: `<rect x=".08" y=".08" width=".84" height=".84" fill="#e8796e"/>`,
  square: `<rect x=".3" y=".3" width=".4" height=".4" fill="#2f7d4f"/>`,
  dots: [[.3, .3], [.7, .3], [.3, .7], [.7, .7]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".09" fill="${INK}"/>`).join("")
};
const SYM_NAME = { circle: "a black dot", ring: "a ring", plus: "a plus sign", cross: "red shading", square: "a small green square", dots: "four small dots" };
function cubeSvg([top, left, right]) {
  const a = 52, k = a * Math.cos(Math.PI / 6), cx = 6 + k, y0 = 6;
  const T = [cx, y0], Rt = [cx + k, y0 + a / 2], Fr = [cx, y0 + a], Lf = [cx - k, y0 + a / 2];
  const face = (o, u, v, s, fill) =>
    `<polygon points="${[o, [o[0] + u[0], o[1] + u[1]], [o[0] + u[0] + v[0], o[1] + u[1] + v[1]], [o[0] + v[0], o[1] + v[1]]].map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
     <g transform="matrix(${u[0]} ${u[1]} ${v[0]} ${v[1]} ${o[0]} ${o[1]})">${SYM[s]}</g>`;
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const g = face(Lf, sub(T, Lf), sub(Fr, Lf), top, "#ffffff") +
            face(Lf, sub(Fr, Lf), [0, a], left, "#eef1f6") +
            face(Fr, sub(Rt, Fr), [0, a], right, "#dfe4ec");
  const W = 2 * k + 12, H = 2 * a + 12;
  return `<svg viewBox="0 0 ${W.toFixed(1)} ${H}" width="${W.toFixed(1)}" height="${H}" role="img" aria-label="A cube: top face ${SYM_NAME[top]}, front-left face ${SYM_NAME[left]}, front-right face ${SYM_NAME[right]}.">${g}</svg>`;
}
const CUBE_SHOWN = cubeSvg(["plus", "ring", "dots"]);
// [row, column, symbol]; rows go down the page
const NETS = [
  { cells: [[0, 1, "plus"], [1, 0, "ring"], [1, 1, "dots"], [1, 2, "circle"], [1, 3, "square"], [2, 1, "cross"]],
    desc: "Top row: a plus sign in the second column. Middle row, four squares: a ring, four dots (under the plus sign), a black dot, a green square. Bottom row: red shading in the second column, under the four dots." },
  { cells: [[0, 0, "dots"], [0, 1, "ring"], [0, 2, "square"], [1, 2, "circle"], [1, 3, "plus"], [1, 4, "cross"]],
    desc: "Top row, three squares: four dots, a ring, a green square. Bottom row, three squares starting under the green square: a black dot, a plus sign, red shading." },
  { cells: [[0, 0, "cross"], [1, 0, "plus"], [1, 1, "square"], [1, 2, "dots"], [1, 3, "ring"], [2, 3, "circle"]],
    desc: "Top row: red shading in the first column. Middle row, four squares: a plus sign (under the red shading), a green square, four dots, a ring. Bottom row: a black dot in the fourth column, under the ring." },
  { cells: [[0, 0, "square"], [0, 1, "ring"], [1, 1, "plus"], [1, 2, "circle"], [2, 2, "dots"], [2, 3, "cross"]],
    desc: "A staircase of three rows of two squares. Top row: a green square, a ring. Middle row, starting under the ring: a plus sign, a black dot. Bottom row, starting under the black dot: four dots, red shading." }
];
function netSvg({ cells, desc }, letter) {
  const u = 30, o = 3;
  const cols = Math.max(...cells.map(c => c[1])) + 1, rows = Math.max(...cells.map(c => c[0])) + 1;
  let g = "";
  cells.forEach(([r, c, s]) => {
    const x = o + c * u, y = o + r * u;
    g += `<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="#fff" stroke="${INK}" stroke-width="1.8"/><g transform="matrix(${u} 0 0 ${u} ${x} ${y})">${SYM[s]}</g>`;
  });
  const W = cols * u + 2 * o, H = rows * u + 2 * o;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Net ${letter}. ${desc}">${g}</svg>`;
}
const NET_OPTS = NETS.map((n, i) => netSvg(n, "ABCD"[i]));

/* ---- Maths Q2: the ride to the waterfall (supplied by David: follow-up to Carter's trip) ---- */
const PATH_SVG = (() => {
  const x0 = 34, u = 25, W = x0 * 2 + 12 * u, y = 46;
  let g = `<line x1="${x0}" y1="${y}" x2="${x0 + 12 * u}" y2="${y}" stroke="${INK}" stroke-width="3"/>`;
  for (let k = 0; k <= 12; k++) g += `<line x1="${x0 + k * u}" y1="${y - 5}" x2="${x0 + k * u}" y2="${y + 5}" stroke="${INK}" stroke-width="1.4"/>`;
  const lab = (k, top, bot, col) => `<circle cx="${x0 + k * u}" cy="${y}" r="5.5" fill="${col}" stroke="${INK}" stroke-width="1.4"/>` +
    `<text x="${x0 + k * u}" y="${y - 14}" font-size="13" font-weight="700" text-anchor="middle" fill="${INK}">${top}</text>` +
    `<text x="${x0 + k * u}" y="${y + 24}" font-size="13" text-anchor="middle" fill="${INK}">${bot}</text>`;
  g += lab(0, "Campsite", "0 km", "#ffffff") + lab(12, "Waterfall", "12 km", "#ffffff") + lab(5, "Picnic hut", "5 km", "#f2b45a");
  const H = y + 34;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A straight bike path from the Campsite at 0 km to the Waterfall at 12 km, with a small mark for every kilometre. The Picnic hut is marked at 5 km. The place where Noah turned back is not marked.">${g}</svg>`;
})();

/* ---- Maths Q3: perimeter of a stepped garden bed (not to scale) ---- */
const STEP_SVG = (() => {
  // drawn deliberately NOT to scale: [x, y] in drawing units (y down)
  const P = [[20, 210], [320, 210], [320, 165], [215, 165], [215, 95], [110, 95], [110, 30], [20, 30]];
  let g = `<polygon points="${P.map(p => p.join(",")).join(" ")}" fill="#dff0d8" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  const t = (x, y, s, a = "middle") => `<text x="${x}" y="${y}" font-size="15" font-weight="700" text-anchor="${a}" fill="${INK}">${s}</text>`;
  g += t(170, 232, "15 m") + t(14, 125, "10 m", "end") + t(65, 22, "4 m") + t(162, 87, "5 m") + t(328, 193, "3 m", "start");
  return `<svg viewBox="-30 0 400 245" width="360" height="221" role="img" aria-label="A garden bed shaped like a staircase, with every corner a right angle. The bottom side is 15 m and the left side is 10 m. Going along the top from the left: a 4 m side, then a step down, then a 5 m side, then another step down, then a side with no length marked, then down the right-hand side, which is 3 m. The two step-down sides and the lowest top side are not marked. The diagram is not drawn to scale.">${g}</svg>`;
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
        options: ["wean", "waive", "wane", "wan"],
        answer: 2,
        skill: "choosing between look-alike words: which one fits the meaning and the grammar",
        explain: `<p>After “a few days of endless drops”, the writer was losing interest. Enthusiasm that slowly shrinks or fades is said to <b>wane</b> (like the moon, which wanes as it grows thinner). “My enthusiasm had begun to wane” means it was fading away.</p>
                  <p class="why-not">“Wean” is the trap: it looks and sounds close, but to wean means to get a baby or young animal used to food other than milk, or to help someone slowly give up a habit (“wean yourself off sweets”). Enthusiasm can’t “begin to wean”. “Waive” means to give up a right or let someone off a rule (“the school waived the fee”), and it needs something after it, so “begun to waive” is unfinished. “Wan” is a describing word meaning pale and tired-looking (“a wan face”); it isn’t a doing word, so “begun to wan” makes no sense.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["persevere", "endure", "resume", "insist"],
        answer: 0,
        skill: "choosing between words close in meaning, using the little word that follows (“with”)",
        explain: `<p>The writer was about to give up, so the aunt wanted the writer to keep going even though it was hard. To <b>persevere with</b> something means to keep trying at it in spite of difficulties, and “persevere” is the only word here that can be followed by “with it”.</p>
                  <p class="why-not">“Endure” is the trap: it is close in meaning (to put up with something hard, like endless drops), but you endure something, never “endure <em>with</em>” it, so “urged me to endure with it” doesn’t work. “Resume” means to start again after a pause; you resume something (“resume practising”), not resume <em>with</em> it, and the writer hadn’t stopped yet. “Insist” is followed by “on”, not “with” (“insist on practising”), and it means to demand something firmly, which doesn’t fit what the aunt wants the writer to do.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["grudging", "knowledgeable", "bewildered", "knowing"],
        answer: 3,
        skill: "choosing a word from the meaning of the whole text: linking the ending back to the beginning",
        explain: `<p>Go back to the first paragraph. The aunt promised: “By the time school goes back, you’ll be juggling.” Now, on the last Sunday of the holidays, her promise has come true, just as she said it would. A <b>knowing</b> smile is the smile of someone who knew all along what would happen. She doesn’t need to say a word: the smile says “I told you so”.</p>
                  <p class="why-not">“Knowledgeable” is the trap: it looks like “knowing” and the aunt clearly knows a lot about juggling. But knowledgeable describes a <em>person</em> who knows a lot (“a knowledgeable guide”); a smile can’t be knowledgeable. “Bewildered” means puzzled and confused, the opposite of how someone feels when their own prediction comes true; it might describe the writer at the start, who laughed at the promise. “Grudging” means given unwillingly, as if she didn’t want to admit something, but the aunt wanted the writer to succeed and helped make it happen.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">To be picked for the zone swimming team, a swimmer must swim 50 metres in under 45 seconds at the school carnival.</p>
               <p class="quote"><em class="speaker">Ruby:</em> “Jack swam 50 metres in 41 seconds at the carnival, so he will be picked for the zone team.”</p>
               <p class="quote"><em class="speaker">Omar:</em> “Ella took 48 seconds to swim 50 metres at the carnival, so she won’t be picked for the zone team.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Ruby only", "Omar only", "Both Ruby and Omar", "Neither Ruby nor Omar"],
        answer: 1,
        skill: "deciding whose reasoning is correct: something needed is not a guarantee",
        explain: `<p>The rule says a time under 45 seconds is <b>needed</b> to be picked. It does not say that every swimmer with a time under 45 seconds <em>will</em> be picked.</p>
                  <p><b>Ruby:</b> Jack has what is needed, but that doesn’t guarantee a place. The team might only take the fastest few swimmers, and many children may have swum under 45 seconds. Ruby is not correct.</p>
                  <p><b>Omar:</b> Ella took 48 seconds, so she doesn’t have what is needed. She can’t be picked. Omar is correct.</p>
                  <p>So the answer is <b>B</b>, Omar only.</p>
                  <p class="why-not">C (both) is the trap: Ruby’s reasoning sounds just as sure as Omar’s, but she has treated something needed as if it were enough. A (Ruby only) is for students who think that Ella could still get in some other way, but the rule says <em>must</em>. D (neither) is for students who think Omar has turned the rule around; he hasn’t: he uses it the safe way, from not having what is needed.</p>`
      },
      {
        stem: `Ava is going from Hillview to Seal Island. She will catch a bus to the wharf, then a ferry to the island.
               ${TRIP_TABLES}
               <p style="margin:10px 0 0">Ava must be on Seal Island by <b>11:30 am</b>. After she gets off the bus, it takes her <b>10 minutes</b> to walk to the ferry and buy her ticket.</p>
               <p style="margin:10px 0 0">What is the <b>latest</b> bus Ava can catch from Hillview?</p>`,
        options: ["10:35 am", "10:20 am", "10:05 am", "9:50 am"],
        answer: 3,
        skill: "working backwards through two timetables with a connection time",
        explain: `<p><b>Step 1: the ferry.</b> Work backwards from 11:30 am. The 11:15 am ferry arrives at 12:05 pm, too late. The <b>10:30 am</b> ferry arrives at 11:20 am, in time. So Ava needs the 10:30 am ferry.</p>
                  <p><b>Step 2: the walk.</b> She needs 10 minutes after the bus to reach the ferry, so her bus must <b>arrive</b> at the wharf by 10:20 am.</p>
                  <p><b>Step 3: the bus.</b> The bus arriving at 10:15 am is the latest one that arrives by 10:20 am. It leaves Hillview at <b>9:50 am</b>.</p>
                  <p class="why-not">10:05 am (C) is the trap: that bus arrives at 10:30 am, exactly when the ferry leaves, which forgets the 10 minutes Ava needs to walk and buy her ticket. 10:20 am (B) uses the time the bus <em>leaves</em> Hillview instead of the time it arrives at the wharf. 10:35 am (A) picks the 11:15 am ferry because it leaves before 11:30 am, but Ava has to <em>be on the island</em> by then, and that ferry doesn’t arrive until 12:05 pm.</p>`
      },
      {
        stem: `This is a cube.
               <div class="figure">${CUBE_SHOWN}</div>
               <p style="margin:10px 0 0">Which net could be folded to make this cube?</p>`,
        visualOptions: true,
        options: NET_OPTS,
        answer: 0,
        skill: "finding opposite faces on a net: faces that are opposite can never be seen together",
        explain: `<p>The cube shows the plus sign, the ring and the four dots all at once, so on the right net <b>none of these three can be opposite each other</b>. A quick way to find opposite faces on a net: two squares in a straight line with <b>one square between them</b> are opposite. When two opposite pairs are found, the last two faces left over must be the third pair.</p>
                  <p><b>Net A:</b> in the long row, the ring and the black dot are opposite, and so are the four dots and the green square. In the upright column, the plus sign and the red shading are opposite. So the plus, ring and four dots are never opposite each other ✓ Fold it to check the way round: with the four dots at the front, the plus sign folds up to make the top and the ring folds back to make the left side, exactly as on the cube.</p>
                  <p class="why-not">B is the trap: the plus sign and the ring are far apart and not in a line, so they don’t look opposite. But the four dots and the green square are opposite (one square between them in the top row), and so are the black dot and the red shading (bottom row). The two faces left over, the ring and the plus sign, must be opposite, so they can’t both be seen. C is the easiest to rule out: the plus sign and the four dots are in a straight line with the green square between them, so they are opposite. D is a staircase: fold it with the plus sign on the table, and the ring folds up at the back while the four dots (joined below the black dot, which folds up on the right) fold round to the front. So the ring and the four dots are opposite.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Lena reads <b>15 pages</b> on each school day, Monday to Friday. On Saturday and on Sunday she reads <b>25 pages</b> each day.
               <p style="margin:10px 0 0">How many pages does Lena read in one whole week?</p>`,
        options: ["40", "100", "105", "115", "125"],
        answer: 4,
        skill: "simple word problem: two different daily amounts across a week",
        explain: `<p>School days: 5 × 15 = <b>75</b> pages. Weekend: 2 × 25 = <b>50</b> pages.</p>
                  <p>Whole week: 75 + 50 = <b>125</b> pages.</p>
                  <p class="why-not">100 (B) is the trap: it counts the weekend as one day of 25 pages, but Lena reads 25 pages on Saturday <em>and</em> on Sunday. 115 (D) counts 6 school days. 105 (C) uses 15 pages for all 7 days. 40 (A) just adds 15 and 25.</p>`
      },
      {
        stem: `Noah and his mum rode their bikes along a straight 12 km bike path from the campsite to the waterfall. The picnic hut is on the path, 5 km from the campsite.
               <div class="figure">${PATH_SVG}</div>
               <p style="margin:10px 0 0">They meant to stop at the picnic hut to fill their water bottles, but they rode straight past it. When they realised, they rode back to the hut, filled their bottles, and then rode on to the waterfall. Altogether they rode <b>18 km</b>.</p>
               <p style="margin:10px 0 0">How far past the picnic hut did they turn back?</p>`,
        options: ["2 km", "3 km", "6 km", "8 km", "13 km"],
        answer: 1,
        skill: "distance on a line: the extra stretch is ridden twice (supplied by David: follow-up to Carter’s trip)",
        explain: `<p><b>Step 1: the extra distance.</b> Riding straight to the waterfall would have been 12 km, but they rode 18 km. So they rode 18 − 12 = <b>6 km</b> extra.</p>
                  <p><b>Step 2: why the extra?</b> The stretch between the hut and the turning point was ridden <b>three</b> times: past the hut, back to the hut, and forwards again. Riding it once is part of the normal 12 km, so the extra 6 km is that stretch ridden <b>twice</b>: 6 ÷ 2 = <b>3 km</b>.</p>
                  <p>Check: they turned back at 5 + 3 = 8 km. 8 km out + 3 km back to the hut + 7 km from the hut to the waterfall = 18 km ✓</p>
                  <p class="why-not">6 km (C) is the trap: it is the extra distance, but that extra stretch was ridden twice, so it must be halved. 2 km (A) divides the 6 km by 3, because the stretch was ridden three times, but one of those three rides is part of the normal 12 km. 8 km (D) is how far from the <em>campsite</em> they turned back, not how far past the hut. 13 km (E) is 18 − 5, which doesn’t stand for any part of the ride.</p>`
      },
      {
        stem: `This garden bed has a stepped shape. Every corner is a right angle. Some side lengths are not marked, and the diagram is <b>not drawn to scale</b>.
               <div class="figure">${STEP_SVG}</div>
               <p style="margin:10px 0 0">What is the perimeter of the garden bed?</p>`,
        options: ["37 m", "43 m", "50 m", "53 m", "59 m"],
        answer: 2,
        skill: "perimeter of a stepped shape with unmarked sides: moving the steps to make a rectangle",
        explain: `<p>Three sides are not marked, and the two step-down sides can’t be worked out one at a time. But you don’t need them separately.</p>
                  <p><b>Across:</b> the three top sides (4 m, 5 m and the unmarked one) together stretch across the whole width of the bed, so they add up to the bottom side: <b>15 m</b>. (The unmarked one is 15 − 4 − 5 = 6 m.)</p>
                  <p><b>Up and down:</b> the three upright sides on the right (the two steps and the 3 m side) together go all the way from the bottom to the top, so they add up to the left side: <b>10 m</b>.</p>
                  <p>Perimeter = 15 + 15 + 10 + 10 = <b>50 m</b>. It is the same as the perimeter of a 15 m by 10 m rectangle, as if the steps were pushed out to the corner.</p>
                  <p class="why-not">37 m (A) is the trap: it adds only the five marked sides (15 + 10 + 4 + 5 + 3) and leaves out the three unmarked ones. 43 m (B) finds the unmarked 6 m top side but forgets the two step-down sides. 53 m (D) counts the right-hand uprights as 10 m and then adds the 3 m side again, although it is already part of the 10 m. 59 m (E) makes the same double-count across the top, adding the 4 m and 5 m again on top of the 15 m.</p>`
      }
    ]
  }
];
