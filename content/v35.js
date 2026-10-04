/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 35
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>In the 1780s, two brothers named Joseph and Étienne Montgolfier, whose family ran a paper-making business in southern France, became fascinated by flight. According to one story, Joseph noticed that scraps of paper and cloth drifted upwards above a fire. {1} The brothers began to experiment, building bigger and bigger bags of cloth lined with paper.</p>
<p>In June 1783, they filled a huge balloon with hot air from a fire of straw and wool, and watched it rise high above their town. News of the flight spread quickly, and soon the King of France wanted to see a balloon for himself. But there was a problem. Nobody knew whether a living creature could survive so high above the ground. {2}</p>
<p>So, on 19 September 1783, at the palace of Versailles, a sheep, a duck and a rooster were placed in a basket beneath a brightly painted balloon. A huge crowd watched as it rose into the sky. About eight minutes later, it came down gently in a forest a few kilometres away. {3} The experiment showed that the air high above the ground was safe to breathe.</p>
<p>Two months later, two men climbed aboard a Montgolfier balloon in Paris and became the first people ever to fly freely through the sky. The age of flight had begun, thanks partly to three very surprised farm animals.</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "Rather than risk a human life, they decided to send animals up first.",
  "When people rushed over to the basket, they found all three animals alive.",
  "Some people worried that the animals might be harmed by the heat of the fire.",
  "He wondered whether a big enough bag of hot air could lift a load into the sky.",
  "Everyone in the crowd held their breath as the basket slowly began to rise."
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
  title: "Passengers of the Sky",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: lockers ---- */
const LOCKERS_SVG = (() => {
  let g = "";
  for (let i = 0; i < 5; i++) {
    const x = 6 + i * 58;
    g += `<rect x="${x}" y="6" width="50" height="86" rx="3" fill="#dfe6f1" stroke="${INK}" stroke-width="2"/>
          <line x1="${x + 10}" y1="20" x2="${x + 40}" y2="20" stroke="${INK}" stroke-width="1.5"/>
          <line x1="${x + 10}" y1="26" x2="${x + 40}" y2="26" stroke="${INK}" stroke-width="1.5"/>
          <circle cx="${x + 40}" cy="54" r="3" fill="${INK}"/>
          <text x="${x + 25}" y="80" font-size="17" font-weight="700" text-anchor="middle" fill="${INK}">${i + 1}</text>`;
  }
  return `<svg viewBox="0 0 298 98" width="298" height="98" role="img" aria-label="A row of five lockers numbered 1 to 5 from left to right.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: wall tiles ---- */
/* base design: dark triangle in the top-left corner, dot near the middle of the bottom edge */
function tile(rot, dot, size, label) {
  const s = size;
  const dots = { bottom: [0.5, 0.8], right: [0.8, 0.5], top: [0.5, 0.2], centre: [0.5, 0.5] };
  const [dx, dy] = dots[dot];
  const inner = `<rect x="0" y="0" width="${s}" height="${s}" fill="#fff" stroke="${INK}" stroke-width="2"/>
    <polygon points="0,0 ${0.48 * s},0 0,${0.48 * s}" fill="#2f4f7f"/>
    <circle cx="${dx * s}" cy="${dy * s}" r="${0.09 * s}" fill="#d9534f"/>`;
  return `<g transform="rotate(${rot} ${s / 2} ${s / 2})">${inner}</g>`;
}
const WALL_SVG = (() => {
  const s = 64, rots = [[90, 180], [270, 90]];
  let g = "";
  rots.forEach((row, r) => row.forEach((rot, c) => g += `<g transform="translate(${c * s + 3} ${r * s + 3})">${tile(rot, "bottom", s)}</g>`));
  return `<svg viewBox="0 0 ${2 * s + 6} ${2 * s + 6}" width="${2 * s + 6}" height="${2 * s + 6}" role="img" aria-label="A section of wall made of four square tiles. Each tile has a dark triangle in one corner and a red dot near the middle of one edge. Top left: triangle in the top-right corner, dot near the left edge. Top right: triangle in the bottom-right corner, dot near the top edge. Bottom left: triangle in the bottom-left corner, dot near the right edge. Bottom right: triangle in the top-right corner, dot near the left edge.">${g}</svg>`;
})();
const tileOpt = (dot, label) => `<svg viewBox="0 0 70 70" width="70" height="70" role="img" aria-label="${label}"><g transform="translate(3 3)">${tile(0, dot, 64)}</g></svg>`;
const TILE_OPTS = [
  tileOpt("right", "Tile A: triangle in the top-left corner, dot near the middle of the right edge"),
  tileOpt("top", "Tile B: triangle in the top-left corner, dot near the middle of the top edge"),
  tileOpt("bottom", "Tile C: triangle in the top-left corner, dot near the middle of the bottom edge"),
  tileOpt("centre", "Tile D: triangle in the top-left corner, dot in the centre")
];

/* ---- Maths Q3: smoothie menu ---- */
const MENU_HTML = `<div style="display:inline-block;border:2px solid ${INK};border-radius:8px;padding:10px 18px;margin:10px 0 4px;background:#fffdf6">
  <div style="font-weight:700;margin-bottom:6px">Smoothie bar</div>
  <div>Choose <b>2 different</b> fruits:</div>
  <div>mango · banana · strawberry · pineapple · kiwi</div>
</div>`;

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
        answer: 3,
        skill: "linking a sentence to what comes before and after",
        explain: `<p>Before the gap, Joseph notices paper and cloth drifting up above a fire. After it, the brothers start building bigger and bigger bags. Sentence <b>D</b> connects the two: Joseph wonders whether a big enough bag of hot air could lift a load. That idea is what leads to the experiments. “He” points back to Joseph.</p>
                  <p class="why-not">C doesn’t fit, because it talks about “the animals” before any animals have been mentioned. A belongs later, once the problem of sending up a living creature has been raised.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 0,
        skill: "following cause and effect across a gap",
        explain: `<p>The paragraph ends with a problem: nobody knew whether a living creature could survive so high up. The next paragraph begins “<b>So</b>, … a sheep, a duck and a rooster were placed in a basket”. Sentence <b>A</b> links the problem to that solution: rather than risk a person, they would send animals first. “So” only makes sense if this decision comes just before it.</p>
                  <p class="why-not">C is the trap: it is about the danger of flying, so it seems to belong next to “Nobody knew whether a living creature could survive”. But it talks about “the animals” as if the decision to send animals had already been made. The decision itself is missing, and without it “So, … a sheep, a duck and a rooster” doesn’t follow. E is about the basket rising, but at this point there is no basket and no animals yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 1,
        skill: "choosing a sentence that fits what follows",
        explain: `<p>The sentence after the gap says the experiment showed the air up high was “safe to breathe”. That can only be known if the animals came down alive. Sentence <b>B</b> gives exactly that: all three animals were found alive.</p>
                  <p class="why-not">E is the trap: it is about the flight, and a crowd is watching. But by gap 3 the balloon has already risen and <em>landed</em>, so a sentence about it slowly beginning to rise is in the wrong place in time. E would only fit before “A huge crowd watched as it rose into the sky”.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<div style="border:2px solid #1b2a41;border-radius:6px;padding:10px 14px;margin:0 0 12px">In a quiz, each team plays 4 rounds. In each round a team scores a whole number of points from 0 to 10. A team that scores 30 points or more altogether wins a certificate.<br>After 2 rounds, the Owls have 12 points and the Hawks have 9 points.</div>
               <p class="quote"><em class="speaker">Lena:</em> “The Hawks can still win a certificate if they do really well in the last two rounds.”</p>
               <p class="quote"><em class="speaker">Omar:</em> “To win a certificate, the Owls will need at least 8 points in <b>each</b> of the last two rounds.”</p>
               <p style="margin:10px 0 0">If the information in the box is true, whose reasoning is correct?</p>`,
        options: ["Lena only", "Omar only", "Both Lena and Omar", "Neither Lena nor Omar"],
        answer: 1,
        skill: "deciding whose reasoning is correct (what is possible and what is certain)",
        explain: `<p><b>Lena</b> is not correct. The Hawks need 30 − 9 = 21 more points, but the most they can score in two rounds is 10 + 10 = 20. Even a perfect finish leaves them on 29.</p>
                  <p><b>Omar</b> is correct. The Owls need 30 − 12 = 18 more points from two rounds. Each round is worth at most 10, so if they scored 7 or less in one round, they would need 11 or more in the other, which is impossible. So they need at least 8 in <em>each</em> round (for example 8 + 10, 9 + 9 or 10 + 8).</p>
                  <p class="why-not">C is the trap: Lena’s claim sounds hopeful and possible, but checking the biggest possible score shows it can’t happen. D catches students who think Omar is wrong because the Owls could score, say, 10 and then a smaller number. Try it: 10 + 7 is only 17, which isn’t enough.</p>`
      },
      {
        stem: `Five friends each have one of these lockers.
               <div class="figure">${LOCKERS_SVG}</div>
               <ul class="facts">
                 <li>Cara’s locker is at one end of the row.</li>
                 <li>Ava’s locker number is two more than Dan’s.</li>
                 <li>Eve’s locker is not next to Ava’s.</li>
                 <li>Eve’s locker is not at either end of the row.</li>
               </ul>
               <p style="margin:10px 0 0">The fifth friend is Ben. Whose locker is number <b>4</b>?</p>`,
        options: ["Ava", "Dan", "Eve", "Ben"],
        answer: 3,
        skill: "using clues to work out an arrangement",
        explain: `<p>Start with the clue that gives the fewest choices. Ava is two more than Dan, so (Dan, Ava) is (1, 3), (2, 4) or (3, 5). Eve must be in 2, 3 or 4, and not next to Ava.</p>
                  <p>• If Dan is 1 and Ava is 3, Eve can’t be 2 or 4 (next to Ava) or 3 (taken). No room for Eve ✗<br>
                     • If Dan is 2 and Ava is 4, Eve can’t be 3 (next to Ava), 2 or 4 (taken). No room ✗<br>
                     • If Dan is 3 and Ava is 5, Eve can’t be 4 (next to Ava), so Eve is 2. Cara must be at an end, so Cara is 1. Ben gets the last locker: <b>4</b> ✓</p>
                  <p>The order is Cara, Eve, Dan, Ben, Ava.</p>
                  <p class="why-not">A (Ava) is the trap: locker 4 is one of Ava’s possible places, but then Eve has nowhere to go. Ben isn’t mentioned in any clue, which tempts students to rule him out, but he simply gets the locker that is left over.</p>`
      },
      {
        stem: `A wall is covered with identical square tiles, but some tiles were <b>rotated</b> (turned) before they were put on the wall. No tile was flipped over. Here is a section of the wall made of four whole tiles:
               <div class="figure">${WALL_SVG}</div>
               <p style="margin:10px 0 0">Which of these could be the design on each tile?</p>`,
        visualOptions: true,
        options: TILE_OPTS,
        answer: 2,
        skill: "telling turns from reflections",
        explain: `<p>Take any wall tile and turn it in your head until its triangle is in the top-left corner, like the answer tiles.</p>
                  <p>The top-left wall tile has its triangle top right and its dot near the left edge. Give it a quarter turn <b>anticlockwise</b>: the triangle moves to the top left, and the dot moves to the <b>bottom</b> edge. That is tile <b>C</b>. Every other wall tile turns into C in the same way (the top-right one needs a half turn, the bottom-left one a quarter turn clockwise).</p>
                  <p class="why-not">A is the trap: it looks almost the same as C, but it is C’s <em>mirror image</em> (flipped over), not a turn. No amount of turning makes A’s dot land where the wall tiles’ dots are. In B the dot is next to the triangle, and in D it is in the centre, and no wall tile looks like that.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Mia’s swimming lesson starts at 3:45 pm and lasts for 50 minutes. Her mum arrives to pick her up at 4:50 pm.
               <p style="margin:10px 0 0">How long does Mia wait after her lesson finishes?</p>`,
        options: ["65 minutes", "55 minutes", "50 minutes", "15 minutes", "5 minutes"],
        answer: 3,
        skill: "time: adding on, then finding a difference",
        explain: `<p>3:45 pm + 50 minutes: 15 minutes takes it to 4:00, and 35 more makes <b>4:35 pm</b>.</p>
                  <p>From 4:35 to 4:50 is <b>15 minutes</b>.</p>
                  <p class="why-not">5 minutes (E) is the trap: it adds 50 minutes as if it were an hour (3:45 → 4:45). 65 minutes (A) is the whole time from the start of the lesson to pick-up. 55 minutes (B) subtracts the times like ordinary numbers (450 − 345 = 105, as if an hour had 100 minutes) and then takes away 50. 50 minutes (C) is just the length of the lesson.</p>`
      },
      {
        stem: `Leo has a chocolate bar made of 24 equal squares. He gives <b>one-third</b> of the bar to his sister. Then he eats <b>one-quarter</b> of what is left. Finally, he shares the rest equally between himself and two friends.
               <p style="margin:10px 0 0">How many squares does each of the three get in the end?</p>`,
        options: ["3", "4", "6", "8", "12"],
        answer: 1,
        skill: "fractions of a quantity, step by step",
        explain: `<p>One-third of 24 is 8, so Leo gives away 8 and has 24 − 8 = <b>16</b> left.</p>
                  <p>One-quarter of what is left is ¼ of 16 = 4. He eats 4, leaving 16 − 4 = <b>12</b>.</p>
                  <p>He shares 12 equally between three people (himself and two friends): 12 ÷ 3 = <b>4</b> each.</p>
                  <p class="why-not">6 (C) is the trap: it shares 12 between only the two friends and forgets Leo himself. 12 (E) stops before the sharing. 3 (A) shares between four people, wrongly counting his sister again. 8 (D) is his sister’s share.</p>`
      },
      {
        stem: `At a smoothie bar, each smoothie is made from two different fruits.
               ${MENU_HTML}
               <p style="margin:10px 0 0">A mango and banana smoothie is the same as a banana and mango smoothie. How many different smoothies can be made?</p>`,
        options: ["4", "5", "10", "20", "25"],
        answer: 2,
        skill: "counting pairs without double-counting",
        explain: `<p>Work through the fruits in order, pairing each one only with the fruits <em>after</em> it, so no pair is counted twice:</p>
                  <p>mango with banana, strawberry, pineapple or kiwi: <b>4</b><br>
                     banana with strawberry, pineapple or kiwi: <b>3</b> (banana + mango is already counted)<br>
                     strawberry with pineapple or kiwi: <b>2</b><br>
                     pineapple with kiwi: <b>1</b></p>
                  <p>4 + 3 + 2 + 1 = <b>10</b> different smoothies.</p>
                  <p class="why-not">20 (D) is the trap: it pairs each of the 5 fruits with the 4 others (5 × 4), which counts every smoothie twice, since mango + banana and banana + mango are the same. 25 (E) also allows the same fruit twice. 4 (A) is just how many partners one fruit has, and 5 (B) is the number of fruits.</p>`
      }
    ]
  }
];
