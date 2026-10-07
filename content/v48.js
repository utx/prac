/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 48
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>Last spring I volunteered to help my uncle’s club with something slightly mad: setting up 12,000 dominoes in one enormous chain in our local community hall, and then knocking them all down. The club’s record was 10,000, and this year they wanted to beat it.</p>
<p>Setting up took four whole days. A domino weighs almost nothing, but placing thousands of them by hand is {1} work, because each one has to stand at just the right distance from the one before. Too close, and it won’t fall properly; too far, and it won’t reach the next one at all. By the end of the first day, my knees were red and my fingers were sore.</p>
<p>Every thousand dominoes or so, we left a small gap, so that an accident could only knock down one section. On the second afternoon, that idea saved us. Someone’s sleeve brushed a single domino, and we watched with {2} breath as row after row went clattering down … until the clattering stopped dead at the gap. We had lost nine hundred dominoes, not nine thousand.</p>
<p>On the last morning, we filled in the gaps, one careful domino at a time. Then the youngest volunteer, a girl of six, gave the first domino a gentle push. For about four minutes the hall was filled with a sound like rain on a tin roof. Everyone was so {3} on the twisting, tumbling line that nobody spoke or moved until the very last domino tipped over. Then the whole hall erupted.</p>
<p>Four days of work, gone in four minutes. People sometimes ask me whether that seems a waste. It doesn’t. I would do it all again tomorrow.</p>`;

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
  title: "Four Days, Four Minutes",
  note: "Read the text below and decide which answer best fits each gap.",
  html: clozeHtml
};

/* ---- Thinking Skills Q2: turned or flipped shapes ---- */
const shapeSvg = (cells, c, fill, label) => {
  const w = Math.max(...cells.map(([, k]) => k)) + 1, h = Math.max(...cells.map(([r]) => r)) + 1;
  const g = cells.map(([r, k]) => `<rect x="${2 + k * c}" y="${2 + r * c}" width="${c}" height="${c}" fill="${fill}" stroke="${INK}" stroke-width="1.4"/>`).join("");
  return `<svg viewBox="0 0 ${w * c + 4} ${h * c + 4}" width="${w * c + 4}" height="${h * c + 4}" role="img" aria-label="${label}">${g}</svg>`;
};
const BASE_CELLS = [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1]];
const BASE_SVG = shapeSvg(BASE_CELLS, 30, "#8cc7b4", "The shape: top row, middle and right squares; middle row, left and middle squares; bottom row, middle square.");
const CAND = [
  // 1: half turn (correct)
  [[[0, 1], [1, 1], [1, 2], [2, 0], [2, 1]], "Top row: middle. Middle row: middle and right. Bottom row: left and middle."],
  // 2: flipped left to right
  [[[0, 0], [0, 1], [1, 1], [1, 2], [2, 1]], "Top row: left and middle. Middle row: middle and right. Bottom row: middle."],
  // 3: flipped, then turned
  [[[0, 1], [1, 0], [1, 1], [2, 1], [2, 2]], "Top row: middle. Middle row: left and middle. Bottom row: middle and right."],
  // 4: quarter turn clockwise (correct)
  [[[0, 1], [1, 0], [1, 1], [1, 2], [2, 2]], "Top row: middle. Middle row: left, middle and right. Bottom row: right."],
  // 5: quarter turn anticlockwise (correct)
  [[[0, 0], [1, 0], [1, 1], [1, 2], [2, 1]], "Top row: left. Middle row: left, middle and right. Bottom row: middle."],
  // 6: flipped, then turned
  [[[0, 1], [1, 0], [1, 1], [1, 2], [2, 0]], "Top row: middle. Middle row: left, middle and right. Bottom row: left."]
];
const CAND_SVG = `<div style="display:flex;flex-wrap:wrap;gap:14px 26px;align-items:flex-start">${CAND.map(([cells, lab], i) =>
  `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><b>${i + 1}</b>${shapeSvg(cells, 24, "#f2c58a", `Shape ${i + 1}. ${lab}`)}</div>`).join("")}</div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["painstaking", "strenuous", "haphazard", "effortless"],
        answer: 0,
        skill: "choosing between words close in meaning, using the reason the writer gives",
        explain: `<p><b>Painstaking</b> work needs great care and attention to detail. The sentence explains <em>why</em> the work is hard: “because each one has to stand at just the right distance from the one before”. That is about care and precision, which is exactly what “painstaking” means.</p>
                  <p class="why-not">“Strenuous” is the trap: it also describes hard work, and the writer’s knees and fingers are sore. But strenuous work needs a lot of physical strength or effort, like digging, and the writer has just told us that “a domino weighs almost nothing”. The word “but” shows the work is hard for a different reason. “Haphazard” means careless and without a plan, the opposite of placing each domino at just the right distance. “Effortless” can’t be right when it takes four days and leaves sore fingers.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["baited", "abated", "bated", "belated"],
        answer: 2,
        skill: "a fixed expression, choosing between look-alike and sound-alike words",
        explain: `<p>To watch <b>with bated breath</b> means to watch anxiously, almost holding your breath, to see what will happen. It fits perfectly: the volunteers are watching to see whether the falling dominoes will stop at the gap. (“Bated” is an old word meaning held back or lessened.)</p>
                  <p class="why-not">“Baited” is the trap: it sounds exactly the same, but it means having bait on it, like a baited hook or trap for catching fish or animals. “Abated” is related to “bated” (it means died down, as in “the storm abated”), but the fixed expression is always “bated breath”. “Belated” looks similar but means late (a belated birthday card).</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["eager", "intent", "absorbed", "attentive"],
        answer: 1,
        skill: "choosing the word that goes with the following preposition (“on”) and fits the meaning",
        explain: `<p>Two things must fit. The meaning: everyone was concentrating so hard on the falling line that nobody spoke or moved. And the little word after the gap: “so ___ <b>on</b>”. <b>Intent on</b> means giving all your attention to something, and it is the only option that is followed by “on”.</p>
                  <p class="why-not">“Absorbed” is the trap: its meaning is very close (deeply interested), but you are absorbed <em>in</em> something, never absorbed <em>on</em> it. “Attentive” also means paying attention, but it goes with “to” (attentive to the teacher). “Eager” means keen for something to happen, and it goes with “to” or “for”; the crowd isn’t waiting for something to happen here, because the dominoes are already falling.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">To be picked for the school swimming team, a student must swim 50 metres in under one minute at the trials.</p>
               <p class="quote"><em class="speaker">Sam:</em> “I swam 50 metres in 55 seconds at the trials, so I will definitely be picked for the team.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Sam has made?</p>`,
        options: ["Sam may be able to swim 50 metres even faster on the day of the swimming carnival.",
                  "Some students may find swimming 50 metres much harder than Sam does.",
                  "The swimming team may train before school on two mornings a week.",
                  "More students may swim under one minute than there are places in the team."],
        answer: 3,
        skill: "spotting a mistake: treating something needed as a guarantee",
        explain: `<p>The rule says what a student <b>must</b> do to have a chance: swimming under one minute is <em>needed</em>. It doesn’t say that everyone who does it <em>will</em> be picked. If more students swim under a minute than there are places, some of them will miss out, and Sam could be one of them. D shows his mistake.</p>
                  <p class="why-not">A is the trap: it is about Sam’s swimming, but if anything it makes him sound even more likely to be picked, so it doesn’t show what is wrong with his reasoning. B is about other students finding it hard, which also makes Sam sound more likely to get in. C is about what happens after the team is picked, not about whether Sam will be in it.</p>`
      },
      {
        stem: `Look at this shape.
               <div class="figure">${BASE_SVG}</div>
               <div class="figure">${CAND_SVG}</div>
               <p style="margin:10px 0 0">How many of the numbered shapes are the same as the shape above, just <b>turned</b> (not flipped over)?</p>`,
        options: ["2", "3", "4", "6"],
        answer: 1,
        skill: "telling turned shapes from flipped (mirror-image) shapes",
        explain: `<p>Look for a clear feature and follow it as the shape turns. In the shape above, the long middle column has an extra square sticking out on the <b>left</b> of its middle, and an extra square on the <b>right</b> at the top end. Turning keeps that pattern; flipping swaps it.</p>
                  <p>• Shape 1 is the shape turned upside down (a half turn) ✓<br>
                     • Shape 4 is a quarter turn clockwise ✓<br>
                     • Shape 5 is a quarter turn anticlockwise ✓<br>
                     • Shapes 2, 3 and 6 are mirror images: whichever way you turn them, the two extra squares end up on the wrong sides ✗</p>
                  <p>So <b>3</b> shapes are just turned.</p>
                  <p class="why-not">6 (D) is the trap: all six shapes are made of the same five squares, so they all look alike, but three of them can only be made by flipping the shape over. 2 (A) misses shape 1, the half turn, which is the easiest to overlook because it looks so different when upside down. 4 (C) counts one of the mirror images as well (shape 2 is the shape flipped from left to right, which looks very close to the original).</p>`
      },
      {
        stem: `Five friends, Ava, Ben, Cal, Dee and Eli, arrived at a party one at a time.
               <ul class="facts">
                 <li>Ben arrived before Dee.</li>
                 <li>Dee arrived before Ava.</li>
                 <li>Ava and Cal arrived one straight after the other (in either order).</li>
                 <li>Eli was neither the first nor the last to arrive.</li>
               </ul>
               <p style="margin:10px 0 0">Which one of these extra facts would tell you the exact order in which all five friends arrived?</p>`,
        options: ["Ben arrived before everyone else.",
                  "Eli was the third friend to arrive.",
                  "Cal arrived straight after Dee.",
                  "Ava arrived earlier than Cal did."],
        answer: 2,
        skill: "working out every order that fits the clues, then the clue that leaves only one",
        explain: `<p>Ben, Dee and Ava must come in that order, and Cal is right next to Ava, so Ava and Cal fill two neighbouring places somewhere after Dee. Eli can’t be first, and Dee and Ava come after Ben, so Ben must be first. Eli can’t be last either, so Ava and Cal take the last two places. That leaves exactly <b>four</b> possible orders:</p>
                  <p>• Ben, Dee, Eli, Ava, Cal<br>
                     • Ben, Dee, Eli, Cal, Ava<br>
                     • Ben, Eli, Dee, Ava, Cal<br>
                     • Ben, Eli, Dee, <b>Cal</b>, Ava</p>
                  <p>Only the last order has Cal straight after Dee, so C fixes the order: <b>Ben, Eli, Dee, Cal, Ava</b>.</p>
                  <p class="why-not">A is the trap: it is true, but Ben is first in all four orders already, so it tells you nothing new. B leaves two orders (Ben, Dee, Eli, then Ava and Cal either way round). D also leaves two orders (Ava before Cal in the first and third).</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `It takes a robot 5 minutes to put together 2 bikes.
               <p style="margin:10px 0 0">At this rate, how many bikes can the robot put together in 1 hour?</p>`,
        options: ["12", "24", "30", "120", "150"],
        answer: 1,
        skill: "rates: scaling up from a small amount of time",
        explain: `<p>1 hour = 60 minutes. There are 60 ÷ 5 = <b>12</b> lots of 5 minutes in an hour.</p>
                  <p>The robot builds 2 bikes in each 5 minutes, so in an hour it builds 12 × 2 = <b>24</b> bikes.</p>
                  <p class="why-not">12 (A) is the trap: it is the number of 5-minute blocks, but each block makes 2 bikes, not 1. 30 (C) divides 60 by 2, which would mean one bike every 2 minutes. 120 (D) multiplies 60 by 2, which would mean 2 bikes every minute. 150 (E) works out that each bike takes 2½ minutes but then multiplies 60 × 2½ instead of dividing.</p>`
      },
      {
        stem: `A number sequence starts at <b>11</b>. Each number after that is made from the number before it using this rule:
               <ul class="facts">
                 <li>If the number is <b>even</b>, halve it.</li>
                 <li>If the number is <b>odd</b>, add 5.</li>
               </ul>
               <p style="margin:10px 0 0">What is the <b>26th</b> number in the sequence?</p>`,
        options: ["3", "4", "6", "8", "16"],
        answer: 0,
        skill: "patterns: finding where a sequence starts to repeat, then using the repeat",
        explain: `<p>Write out the first few numbers:</p>
                  <p>11, 16, 8, 4, 2, 1, 6, 3, 8, 4, 2, 1, 6, 3, …</p>
                  <p>After 3 comes 8 again, so from the <b>3rd</b> number the block <b>8, 4, 2, 1, 6, 3</b> repeats. The first two numbers (11 and 16) never come back.</p>
                  <p>From the 3rd number to the 26th number there are 26 − 2 = <b>24</b> numbers, which is exactly 4 blocks of 6. So the 26th number is the <b>last</b> number in a block: <b>3</b>.</p>
                  <p class="why-not">16 (E) is the trap: it assumes the whole sequence repeats from the very start (11, 16, 8, 4, 2, 1, 11, …), but 1 is odd, so the next number is 6, not 11. 4 (B) uses 26 ÷ 6 = 4 remainder 2 and takes the 2nd number of the block, forgetting that the block doesn’t start until the 3rd number. 8 (D) gets the 24 right but treats “no remainder” as the first number of a block instead of the last. 6 (C) is the 25th number.</p>`
      },
      {
        stem: `A car-park machine takes only <b>20c</b> and <b>50c</b> coins, and it does not give change. Tom must pay exactly <b>$2.10</b>.
               <p style="margin:10px 0 0">He has plenty of both kinds of coin and wants to use up as <b>many</b> coins as he can. What is the largest number of coins he can use?</p>`,
        options: ["5", "6", "8", "9", "10"],
        answer: 3,
        skill: "money: making an exact amount when only some coins are allowed",
        explain: `<p>To use as many coins as possible, Tom wants as many 20c coins as he can.</p>
                  <p>• All 20c coins won’t work: ten 20c coins make $2.00, and 10c is left that no coin can make.<br>
                     • Any number of 20c coins makes a whole number of 20s, so the 50c coins must make up the odd 10c: Tom needs an <b>odd</b> number of 50c coins (one 50c coin makes 50c, which leaves $1.60).<br>
                     • $1.60 ÷ 20c = <b>8</b> twenty-cent coins.</p>
                  <p>So Tom uses 1 fifty-cent coin and 8 twenty-cent coins: <b>9</b> coins. Check: 50c + 8 × 20c = 50c + $1.60 = $2.10 ✓</p>
                  <p class="why-not">10 (E) is the trap: $2.10 ÷ 20c is 10 with 10c left over, and that 10c can’t be paid, because the machine takes no 10c coins and gives no change. 8 (C) counts only the 20c coins and forgets the 50c coin. 6 (B) is the <em>fewest</em> coins (three 50c coins and three 20c coins). 5 (A) uses four 50c coins and one 20c coin, which makes $2.20, not $2.10.</p>`
      }
    ]
  }
];
