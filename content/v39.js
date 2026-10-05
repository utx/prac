/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 39
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>Every summer holidays, Gran takes me rock pooling on the beach near her house. We always check the tide times first, because the best time to go is at low tide, when the sea has pulled back and left the rock shelf high and {1}.</p>
<p>Gran has one rule: look with your eyes, not your hands. Many of the creatures in rock pools are delicate, and a few, like the blue-ringed octopus, are dangerous to touch. So we crouch at the edge of each pool and wait for the water to go still. At first there never seems to be anything there. Then a crab edges out from under a ledge, a snail starts to slide across a rock, and the whole pool slowly comes to life.</p>
<p>Last summer, something bright orange {2} my eye at the bottom of a deep pool. It was a sea star, as big as my hand, clinging to the rock. While I was watching it, a tiny octopus {3} itself into a crack no wider than a pencil. One second it was there, and the next it had simply vanished.</p>
<p>We stayed so long that the waves began to creep back over the rocks and splash our shoes. Gran laughed and said we had completely lost track of time, which is what she says every year.</p>`;

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
  title: "Low Tide",
  note: "Read the text below and decide which answer best fits each gap.",
  html: clozeHtml
};

/* ---- Thinking Skills Q3: folding string ---- */
const STRING_SVG = (() => {
  const L = 320, x0 = 24, q = L / 4, sp = 12;
  const rope = (x, y, len) => `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/>`;
  const bend = (x, y, right) => `<path d="M${x} ${y} a${sp / 2} ${sp / 2} 0 0 ${right ? 1 : 0} 0 ${sp}" fill="none" stroke="#c0392b" stroke-width="5"/>`;
  const label = (y, t) => `<text x="${x0 - 10}" y="${y}" font-size="14" fill="${INK}">${t}</text>`;
  let g = label(18, "1. A piece of string") + rope(x0, 38, L);
  g += label(76, "2. Folded in half") + rope(x0, 96, L / 2) + rope(x0, 96 + sp, L / 2) + bend(x0 + L / 2, 96, true);
  const y3 = 166;
  g += label(146, "3. Folded in half again, then cut");
  [0, 1, 2, 3].forEach(i => g += rope(x0, y3 + i * sp, q));
  g += bend(x0 + q, y3, true) + bend(x0 + q, y3 + 2 * sp, true) + bend(x0, y3 + sp, false);
  const cx = x0 + q / 2;
  g += `<line x1="${cx}" y1="${y3 - 14}" x2="${cx}" y2="${y3 + 3 * sp + 14}" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4"/>
        <text x="${cx + 10}" y="${y3 + 3 * sp + 30}" font-size="13" fill="#55607a">cut here</text>`;
  return `<svg viewBox="0 0 ${x0 + L + 20} ${y3 + 3 * sp + 40}" width="${x0 + L + 20}" height="${y3 + 3 * sp + 40}" role="img" aria-label="Step 1: a straight piece of string. Step 2: the string folded in half, making two layers. Step 3: folded in half again, making four layers, with a dashed line showing one straight cut across the middle of the folded bundle.">${g}</svg>`;
})();

/* ---- Maths Q3: sequence boxes ---- */
const SEQ_HTML = `<div class="hrow">${["?", "?", "11", "?", "29"].map((v, i) =>
  `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div style="width:52px;height:46px;border:1.5px solid ${INK};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;background:${v === "?" ? "#fff" : "#fdf3e1"}">${v}</div><small style="color:#55607a">${["1st", "2nd", "3rd", "4th", "5th"][i]}</small></div>`).join("")}</div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["bare", "dry", "empty", "clear"],
        answer: 1,
        skill: "completing a fixed expression",
        explain: `<p>“High and <b>dry</b>” is a fixed expression for something left out of the water, like a boat when the tide goes out. At low tide, the sea has pulled back and left the rock shelf out of the water.</p>
                  <p class="why-not">“Bare” is the trap: the rocks really would be bare at low tide, so it makes sense on its own, but the expression is always “high and dry”. “Empty” and “clear” don’t make the expression either.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["grabbed", "held", "took", "caught"],
        answer: 3,
        skill: "completing a fixed expression",
        explain: `<p>When something suddenly makes you notice it, it “<b>catches</b> your eye”. The orange sea star stood out at the bottom of the pool, so it caught the writer’s eye.</p>
                  <p class="why-not">“Grabbed” is the trap: something can “grab your <em>attention</em>”, but with “eye” the expression is “caught my eye”. “Held my eye” and “took my eye” are not used to mean noticing something.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["squeezed", "squashed", "pinched", "crushed"],
        answer: 0,
        skill: "choosing between words with similar meanings",
        explain: `<p>To <b>squeeze</b> yourself into a small space means to push your body through a tight gap. Octopuses have no bones, so they really can fit through very narrow openings. It slipped out of sight into the crack.</p>
                  <p class="why-not">“Squashed” is the trap: it is close in meaning, but squashing something flattens or damages it, and the octopus wasn’t hurt. “Crushed” is even stronger. “Pinched” means nipping something tightly between your fingers, which an octopus can’t do to itself.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">At Hilltop School, <b>every</b> student who gets a perfect score in the weekly spelling test gets a gold star sticker.</p>
               <p class="quote"><em class="speaker">Kai:</em> “Lily got a gold star sticker this week, so she must have got a perfect score in the spelling test.”</p>
               <p class="quote"><em class="speaker">Noor:</em> “Sam didn’t get a gold star sticker this week, so he can’t have got a perfect score in the spelling test.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Kai only", "Noor only", "Both Kai and Noor", "Neither Kai nor Noor"],
        answer: 1,
        skill: "deciding whose reasoning is correct (a rule turned around)",
        explain: `<p>The rule says: perfect score → gold star. It does <em>not</em> say that a perfect score is the <b>only</b> way to get a gold star.</p>
                  <p><b>Kai</b> turns the rule around (gold star → perfect score). Lily might have got her sticker for something else, such as good behaviour or a great story. Kai is not correct.</p>
                  <p><b>Noor</b> is correct. If Sam had got a perfect score, the rule says he <em>would</em> have got a gold star. He didn’t get one, so he can’t have got a perfect score.</p>
                  <p class="why-not">C is the trap: Kai’s reasoning sounds like the rule, but it runs the rule backwards. D catches students who think Noor is also turning the rule around. She isn’t: she starts from “no sticker” and works back, which the rule allows.</p>`
      },
      {
        stem: `Five friends, Ava, Ben, Cy, Dina and Eli, ran in a cross-country race. There were no ties.
               <ul class="facts">
                 <li>Cy finished ahead of Dina, and Dina finished ahead of Ben.</li>
                 <li>Eli finished straight after Ava.</li>
                 <li>Ben did not come last.</li>
               </ul>
               <p style="margin:10px 0 0">Who came <b>fourth</b>?</p>`,
        options: ["Ben", "Dina", "Eli", "Ava"],
        answer: 3,
        skill: "using clues to work out an order",
        explain: `<p>Ava and Eli finish one after the other, so they take up two places next to each other. Cy, Dina and Ben fill the other three places, in that order.</p>
                  <p>Ben isn’t last, so place 5 must be taken by Ava or Eli. Eli comes straight after Ava, so Eli is <b>5th</b> and Ava is <b>4th</b>. That leaves places 1, 2 and 3 for Cy, Dina and Ben, in that order.</p>
                  <p>The order is Cy, Dina, Ben, Ava, Eli. <b>Ava</b> came fourth.</p>
                  <p class="why-not">Eli (C) is the trap: if you forget that Ben wasn’t last, the order Cy, Dina, Ava, Eli, Ben fits the other clues and puts Eli 4th. Dina (B) comes from Cy, Ava, Eli, Dina, Ben, which makes the same mistake. Ben (A) can’t be 4th, because then Ava and Eli would have to be split up.</p>`
      },
      {
        stem: `Josh folds a piece of string in half, and then in half again. Then he makes <b>one</b> straight cut across the middle of the folded string.
               <div class="figure">${STRING_SVG}</div>
               <p style="margin:10px 0 0">How many pieces of string does he have now?</p>`,
        options: ["3", "4", "5", "8"],
        answer: 2,
        skill: "picturing folding and unfolding",
        explain: `<p>Folding in half twice makes <b>4 layers</b> of string. One cut goes through every layer, so it makes <b>4 cuts</b> in the string.</p>
                  <p>Unfold it: the string has been cut in 4 places along its length. A string cut in 4 places falls into <b>5 pieces</b> (two short end pieces and three longer pieces in between, which were held together by the folds).</p>
                  <p class="why-not">4 (B) is the trap: there are 4 cuts, but cutting in 4 places makes one more piece than the number of cuts. 8 (D) counts 2 pieces for each of the 4 layers, forgetting that the folds join some of those pieces together. 3 (A) only allows for one fold.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `What number goes in the box to make this true?
               <p style="margin:12px 0;font-size:22px;font-weight:700;letter-spacing:.03em">▢ − 38 = 47 + 19</p>`,
        options: ["28", "66", "85", "94", "104"],
        answer: 4,
        skill: "the equals sign: finding a missing number",
        explain: `<p>The equals sign means both sides have the same value. The right side is 47 + 19 = <b>66</b>.</p>
                  <p>So ▢ − 38 = 66. The missing number is 38 more than 66: 66 + 38 = <b>104</b>.</p>
                  <p class="why-not">66 (B) is the trap: it works out the right side but stops before finding the box. 28 (A) subtracts 38 from 66 instead of adding it. 85 (C) adds 47 and 38 and ignores the 19. 94 (D) comes from 47 + 19 = 56 (forgetting to carry), then 56 + 38.</p>`
      },
      {
        stem: `A ferry leaves the wharf for the first time each day at <b>6:40 am</b>. After that, a ferry leaves every <b>35 minutes</b>. The trip across the river takes <b>18 minutes</b>.
               <p style="margin:10px 0 0">Sam gets to the wharf at <b>9:12 am</b> and catches the next ferry. What time does he reach the other side?</p>`,
        options: ["9:30 am", "9:35 am", "9:53 am", "9:58 am", "10:28 am"],
        answer: 2,
        skill: "time: working with a repeating timetable",
        explain: `<p>List the departures, adding 35 minutes each time:</p>
                  <p>6:40 → 7:15 → 7:50 → 8:25 → 9:00 → <b>9:35</b> → 10:10 …</p>
                  <p>Sam arrives at 9:12, just after the 9:00 ferry has gone, so he catches the <b>9:35</b> ferry.</p>
                  <p>9:35 + 18 minutes = <b>9:53 am</b>.</p>
                  <p class="why-not">9:58 am (D) is the trap: it assumes ferries leave at 40 minutes past every hour, like the first one, and adds 18 to 9:40. 9:30 am (A) adds 18 minutes to 9:12, as if a ferry were waiting. 9:35 am (B) is when the ferry leaves, not when it arrives. 10:28 am (E) misses the 9:35 ferry and uses the 10:10 one.</p>`
      },
      {
        stem: `In this sequence, each number after the first two is the <b>sum of the two numbers just before it</b>.
               ${SEQ_HTML}
               <p style="margin:10px 0 0">What is the <b>1st</b> number?</p>`,
        options: ["2", "4", "7", "9", "18"],
        answer: 1,
        skill: "number patterns: working backwards from a rule",
        explain: `<p>Work backwards, one step at a time.</p>
                  <p>• 5th = 3rd + 4th, so 29 = 11 + 4th. The 4th number is 29 − 11 = <b>18</b>.<br>
                     • 4th = 2nd + 3rd, so 18 = 2nd + 11. The 2nd number is 18 − 11 = <b>7</b>.<br>
                     • 3rd = 1st + 2nd, so 11 = 1st + 7. The 1st number is 11 − 7 = <b>4</b>.</p>
                  <p>Check: 4, 7, 11, 18, 29 ✓</p>
                  <p class="why-not">2 (A) is the trap: it guesses the 4th number is halfway between 11 and 29 (that is 20), as if the numbers went up by the same amount each time. That gives 2nd = 9 and 1st = 2, but then 11 + 20 = 31, not 29. 7 (C) is the 2nd number and 18 (E) is the 4th; 9 (D) is the 2nd number from the “halfway” mistake.</p>`
      }
    ]
  }
];
