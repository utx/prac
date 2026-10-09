/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 46
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: poem (public domain: Emily Dickinson, first published 1891) ----
   Text extracted programmatically from Project Gutenberg eBook #12242
   (Poems: Three Series, Complete), Second Series, poem XXIII "In the Garden".
   Only change: the double hyphen "--" is shown as a dash. */
const STANZAS = [
  [
    "A bird came down the walk:",
    "He did not know I saw;",
    "He bit an angle-worm in halves",
    "And ate the fellow, raw."
  ],
  [
    "And then he drank a dew",
    "From a convenient grass,",
    "And then hopped sidewise to the wall",
    "To let a beetle pass."
  ],
  [
    "He glanced with rapid eyes",
    "That hurried all abroad, —",
    "They looked like frightened beads, I thought;",
    "He stirred his velvet head"
  ],
  [
    "Like one in danger; cautious,",
    "I offered him a crumb,",
    "And he unrolled his feathers",
    "And rowed him softer home"
  ],
  [
    "Than oars divide the ocean,",
    "Too silver for a seam,",
    "Or butterflies, off banks of noon,",
    "Leap, plashless, as they swim."
  ]
];
const PASSAGE = {
  title: "In the Garden",
  note: "Read the poem below by Emily Dickinson (written in the 1860s, first published in 1891), then answer the questions. The numbers show the verses. <i>walk</i>: a garden path; <i>angle-worm</i>: an earthworm; <i>sidewise</i>: sideways; <i>abroad</i>: all around; <i>plashless</i>: without a splash.",
  html: `<div class="poem">${STANZAS.map((s, i) => `<div class="stanza"><span class="vn">${i + 1}</span>${s.map(l => `<span class="line">${l}</span>`).join("")}</div>`).join("")}</div>`
};

/* ---- Thinking Skills Q3: reflection in a mirror line ---- */
const MIR_DARK = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]];
const MIR_LIGHT = [[0, 2], [2, 3]];
const has = (cells, r, c) => cells.some(([R, C]) => R === r && C === c);
const gridRows = (dark, light) => [0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => has(dark, r, c) ? "#" : has(light, r, c) ? "o" : ".").join("")).join(" / ");
const tileGrid = (dark, light, size, ox, oy) => {
  let g = "";
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const fill = has(dark, r, c) ? "#2f5e95" : has(light, r, c) ? "#f2b84b" : "#fff";
    g += `<rect x="${ox + c * size}" y="${oy + r * size}" width="${size}" height="${size}" fill="${fill}" stroke="#8fa3bb" stroke-width="1"/>`;
  }
  return g + `<rect x="${ox}" y="${oy}" width="${4 * size}" height="${4 * size}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
};
const MIRROR_SVG = (() => {
  const s = 30, ox = 8, oy = 8, mx = ox + 4 * s + 18, my = oy + 4 * s + 18;
  let g = tileGrid(MIR_DARK, MIR_LIGHT, s, ox, oy);
  g += `<line x1="${mx}" y1="2" x2="${mx}" y2="${oy + 4 * s + 6}" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 5"/>
        <text x="${mx + 8}" y="${oy + 2 * s - 4}" font-size="13" fill="#c0392b">mirror</text>
        <text x="${mx + 8}" y="${oy + 2 * s + 12}" font-size="13" fill="#c0392b">line 1</text>
        <line x1="2" y1="${my}" x2="${ox + 4 * s + 6}" y2="${my}" stroke="#1f7a4d" stroke-width="2.5" stroke-dasharray="7 5"/>
        <text x="${ox}" y="${my + 18}" font-size="13" fill="#1f7a4d">mirror line 2</text>`;
  return `<svg viewBox="0 0 ${mx + 60} ${my + 26}" width="${mx + 60}" height="${my + 26}" role="img" aria-label="A 4 by 4 pattern of blue (#) and yellow (o) squares. Dashed mirror line 1 goes up and down a little way to its right. Dashed mirror line 2 goes across a little way below it. Rows from the top: ${gridRows(MIR_DARK, MIR_LIGHT)}">${g}</svg>`;
})();
const mirrorLR = cells => cells.map(([r, c]) => [r, 3 - c]);
const flipTB = cells => cells.map(([r, c]) => [3 - r, c]);
const halfTurn = cells => cells.map(([r, c]) => [3 - r, 3 - c]);
const MIRROR_OPTS = [
  [halfTurn(MIR_DARK), halfTurn(MIR_LIGHT)],   // correct: two reflections = a half turn
  [MIR_DARK, MIR_LIGHT],                       // thinks two flips cancel out
  [mirrorLR(MIR_DARK), mirrorLR(MIR_LIGHT)],   // only mirror line 1
  [flipTB(MIR_DARK), flipTB(MIR_LIGHT)]        // only mirror line 2
].map(([d, l], i) => `<svg viewBox="0 0 108 108" width="108" height="108" role="img" aria-label="Picture ${"ABCD"[i]}: rows from the top (# blue, o yellow, . white): ${gridRows(d, l)}">${tileGrid(d, l, 24, 6, 6)}</svg>`);

/* ---- Maths Q1: milk crate (supplied by David; redrawn) ---- */
const CRATE_SVG = (() => {
  let g = `<path d="M70 30 Q110 4 150 30" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  for (let i = 0; i < 3; i++) {
    const x = 42 + i * 52;
    g += `<rect x="${x + 8}" y="34" width="14" height="14" rx="3" fill="#2f6fb5" stroke="${INK}" stroke-width="1.2"/>
          <path d="M${x} 104 L${x} 60 Q${x} 48 ${x + 10} 46 L${x + 20} 46 Q${x + 30} 48 ${x + 30} 60 L${x + 30} 104 Z" fill="#fbfdff" stroke="${INK}" stroke-width="1.6"/>`;
  }
  g += `<rect x="30" y="66" width="164" height="54" rx="4" fill="#e9a23b" stroke="${INK}" stroke-width="2.5"/>`;
  for (let i = 1; i < 6; i++) g += `<line x1="${30 + i * 164 / 6}" y1="70" x2="${30 + i * 164 / 6}" y2="116" stroke="#b9741d" stroke-width="2"/>`;
  g += `<line x1="34" y1="93" x2="190" y2="93" stroke="#b9741d" stroke-width="2"/>`;
  return `<svg viewBox="0 0 224 128" width="224" height="128" role="img" aria-label="An orange milk crate with a handle. It holds 6 milk bottles: 3 can be seen at the front and 3 more are behind them.">${g}</svg>`;
})();

/* ---- Maths Q2: two lines of symmetry ---- */
const SYM_GIVEN = [[0, 2], [1, 1], [1, 2], [2, 0], [1, 3]];
const SYM_SVG = (() => {
  const c = 30, o = 10, n = 6;
  let g = "";
  for (let r = 0; r < n; r++) for (let k = 0; k < n; k++)
    g += `<rect x="${o + k * c}" y="${o + r * c}" width="${c}" height="${c}" fill="${has(SYM_GIVEN, r, k) ? "#2f5e95" : "#fff"}" stroke="#a9b6c7" stroke-width="1"/>`;
  const mid = o + 3 * c;
  g += `<line x1="${mid}" y1="${o - 8}" x2="${mid}" y2="${o + n * c + 8}" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 5"/>
        <line x1="${o - 8}" y1="${mid}" x2="${o + n * c + 8}" y2="${mid}" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  const W = 2 * o + n * c;
  const rows = [0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3, 4, 5].map(k => has(SYM_GIVEN, r, k) ? "#" : ".").join("")).join(" / ");
  return `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" role="img" aria-label="A 6 by 6 grid with 5 shaded squares and two dashed lines through the middle, one going across and one going down. Rows from the top (# shaded): ${rows}.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the poem, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "In verse 1, the bird eats a worm raw. In verse 2, it “hopped sidewise to the wall / To let a beetle pass.” Putting these two details side by side suggests that the bird",
        options: ["was afraid that the beetle might attack it.",
                  "was saving the beetle to eat after the worm.",
                  "could seem polite, even though it had just eaten a worm raw.",
                  "had finished its meal and was getting ready to fly back home."],
        answer: 2,
        skill: "understanding why a detail is included (contrast)",
        explain: `<p>In verse 1 the bird bites a worm in half and eats it raw. Then, in verse 2, it steps aside “To let a beetle pass”, like a polite person making way on a footpath. Putting the two side by side shows a surprising contrast: the same bird can be fierce one moment and seem well-mannered the next.</p>
                  <p class="why-not">A is the trap: it borrows from verses 3 and 4, where the bird looks “frightened” and “Like one in danger”, but that comes later and is about everything around it (and the watching speaker), not the beetle; a tiny beetle is no threat to a bird that has just eaten a worm. B is a guess based on the worm; the poem gives the reason for the hop (“To let a beetle pass”), and it isn’t food. D is built on the ending, but the bird doesn’t fly home until verse 4, and only after the speaker offers it a crumb; in verse 2 it is still busy drinking dew and hopping about.</p>`
      },
      {
        stem: "In verses 4 and 5, the bird’s flight home is compared with oars moving through the ocean and with butterflies that leap “plashless”. What do these comparisons suggest about the flight?",
        options: ["It was so smooth and quiet that it seemed to leave no trace.",
                  "It was slow and heavy, like a rowing boat pushing through waves.",
                  "It carried the bird away over the sea to its nest near the ocean.",
                  "It was clumsy and splashy compared with the butterflies’ flight."],
        answer: 0,
        skill: "interpreting comparisons (imagery) in a poem",
        explain: `<p>The bird “rowed him softer home / Than oars divide the ocean”: its wings moved through the air even more gently than oars through water. It was “Too silver for a seam”, so smooth that no join or mark was left behind, and like butterflies that leap “plashless”, without a splash. All the comparisons point to a flight that was smooth, silent and left no trace.</p>
                  <p class="why-not">B is the trap: the poem does mention oars, but it says the bird was <em>softer</em> than oars, not slow and heavy like a boat. C takes the comparison literally; the ocean is only something the flight is compared with, and the bird is in a garden. D turns “plashless” upside down: the butterflies make no splash, and neither does the bird.</p>`
      },
      {
        stem: "Which best describes the speaker’s attitude to the bird across the <b>whole</b> poem?",
        options: ["Disgusted by how it treats the worm, but sorry when it flies away.",
                  "Wary of it at first, then amused by how quickly it rushes away from the crumb.",
                  "Delighted by it, but disappointed that it flew off without eating the crumb.",
                  "Fascinated: watching closely and seeing beauty even in how it leaves."],
        answer: 3,
        skill: "working out a speaker’s attitude from the whole poem",
        explain: `<p>The speaker watches without being seen and notices tiny details: the worm bitten “in halves”, the drop of dew, eyes like “frightened beads”, a “velvet head”. Even when the bird flies off, the speaker isn’t upset. Instead, the last six lines, the most beautiful part of the poem, are spent marvelling at how gently it flew. That is fascination.</p>
                  <p class="why-not">B is the trap: “cautious” describes how gently the speaker offers the crumb (so as not to scare the bird), not wariness of the bird; it is the bird that seems “Like one in danger”. And the speaker isn’t amused by the bird rushing off: the flight is described as soft and graceful, “too silver for a seam”, not as funny. C starts well (the speaker is delighted), but nothing shows disappointment: the poem ends by marvelling at the flight, not regretting the uneaten crumb. A is wrong too: the bird eats the worm “raw”, but the speaker reports it plainly, even with a joke (“the fellow”), not with disgust, and the ending is full of wonder, not sorrow.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `At Riverside Pool, everyone who swims in the deep lane <b>must</b> wear a red wristband.
               <p class="quote"><em class="speaker">Lucy:</em> “Omar is wearing a red wristband, so he must be swimming in the deep lane.”</p>
               <p style="margin:10px 0 0">Which one of the following sentences shows the mistake Lucy has made?</p>`,
        options: ["Omar may be a stronger swimmer than most of the other people at the pool.",
                  "People who are not swimming in the deep lane may also wear red wristbands.",
                  "Some swimmers in the deep lane may have lost their wristbands in the water.",
                  "The pool may give blue wristbands to the people swimming in the shallow lanes."],
        answer: 1,
        skill: "spotting a mistake: reversing a rule",
        explain: `<p>The rule only works one way: <b>deep lane → red wristband</b>. It does not say that <em>only</em> deep-lane swimmers wear red wristbands. Red wristbands might also be worn for the water slide, the diving board or anything else. So seeing a red wristband doesn’t prove Omar is in the deep lane. Lucy has turned the rule around, and B shows the gap.</p>
                  <p class="why-not">D is the trap: it is about wristbands and lanes, but if shallow-lane swimmers wear blue, that would make Lucy <em>more</em> likely to be right, not show her mistake. A also seems to back her up. C is about deep-lane swimmers without wristbands, which has nothing to do with whether a red wristband means the deep lane.</p>`
      },
      {
        stem: `At Hilltop Camp:
               <ul class="facts">
                 <li>Every child who went canoeing had passed the swimming test.</li>
                 <li>Every child who passed the swimming test was given a blue cap.</li>
                 <li>Ruby was <b>not</b> given a blue cap.</li>
               </ul>
               <p style="margin:10px 0 0">If all of these are true, which one of the following <b>must</b> also be true?</p>`,
        options: ["Ruby did not try the swimming test.",
                  "Ruby is not able to swim.",
                  "Every child with a blue cap went canoeing.",
                  "Ruby did not go canoeing."],
        answer: 3,
        skill: "deciding what must be true from strict rules (working back along a chain)",
        explain: `<p>Follow the chain: canoeing → passed the test → blue cap.</p>
                  <p>Ruby has <b>no</b> blue cap, so she can’t have passed the test (everyone who passed got one). And if she didn’t pass the test, she can’t have gone canoeing (everyone who went canoeing had passed). So Ruby did <b>not</b> go canoeing: D.</p>
                  <p class="why-not">A is the trap: we know Ruby didn’t <em>pass</em> the test, but she may have tried it and failed. B goes even further: she might be a good swimmer who never took the test. C turns the second rule around: the rules say canoeists have caps, not that everyone with a cap went canoeing.</p>`
      },
      {
        stem: `This pattern is reflected in mirror line 1. Then that reflection is reflected in mirror line 2.
               <div class="figure">${MIRROR_SVG}</div>
               <p style="margin:10px 0 0">Which picture shows the pattern after <b>both</b> reflections?</p>`,
        visualOptions: true,
        options: MIRROR_OPTS,
        answer: 0,
        skill: "two reflections in a row: an up-and-down mirror, then an across mirror",
        explain: `<p>Do one reflection at a time.</p>
                  <p><b>Step 1, mirror line 1 (up and down):</b> each square stays in the same row, but left and right swap, so read each row backwards: # . o . → . o . #, # # . . → . . # #, . # . o → o . # ., and . # # . stays . # # .</p>
                  <p><b>Step 2, mirror line 2 (across):</b> now each square stays in the same column, but top and bottom swap, so the rows from step 1 come in the reverse order: <b>. # # . / o . # . / . . # # / . o . #</b> (top to bottom).</p>
                  <p>That is <b>A</b>. (Two reflections in mirrors that cross at a right angle always give the same result as a half turn.)</p>
                  <p class="why-not">B is the trap: it assumes the second reflection undoes the first, so the pattern ends up as it started. That only happens when you reflect twice in the <em>same</em> direction; here the mirrors go different ways. C stops after mirror line 1. D does only mirror line 2 (top and bottom swapped, but left and right never swapped).</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Mike uses crates to deliver milk for a dairy farm. Each crate holds at most 6 bottles.
               <div class="figure">${CRATE_SVG}</div>
               <p style="margin:10px 0 0">Mike needs to deliver 50 bottles of milk in one trip. At least how many crates does Mike need if all the bottles need to be in crates?</p>`,
        options: ["2", "8", "9", "44", "300"],
        answer: 2,
        skill: "word problem: division with a remainder, rounding up (supplied by David)",
        explain: `<p>50 ÷ 6 = 8 remainder 2. Eight full crates hold 8 × 6 = 48 bottles, and that leaves <b>2</b> bottles. They still need a crate, so Mike needs 8 + 1 = <b>9</b> crates.</p>
                  <p class="why-not">8 (B) is the trap: it ignores the remainder, which leaves 2 bottles without a crate. 2 (A) gives the remainder as the answer. 44 (D) works out 50 − 6, and 300 (E) works out 50 × 6.</p>`
      },
      {
        stem: `Some squares on this grid are shaded. More squares are to be shaded so that <b>both</b> dashed lines are lines of symmetry of the pattern.
               <div class="figure">${SYM_SVG}</div>
               <p style="margin:10px 0 0">What is the smallest number of extra squares that must be shaded?</p>`,
        options: ["3", "4", "7", "11", "12"],
        answer: 3,
        skill: "line symmetry: completing a pattern with two lines of symmetry",
        explain: `<p>The two lines split the grid into four corner quarters. With both lines of symmetry, every quarter must be a mirror copy of the top-left quarter, which has <b>4</b> shaded squares. So the finished pattern has 4 × 4 = <b>16</b> shaded squares.</p>
                  <p>5 squares are shaded already: 4 in the top-left quarter and 1 in the top-right quarter, which is already in a correct place (it mirrors the square just left of the up-and-down line). So 16 − 5 = <b>11</b> extra squares are needed.</p>
                  <p>(Check, quarter by quarter: top right needs 3 more, bottom left all 4 and bottom right all 4: 3 + 4 + 4 = 11.)</p>
                  <p class="why-not">12 (E) is the trap: it shades 4 squares in each of the other three quarters, forgetting that one of them is shaded already. 7 (C) reflects the top-left quarter across each line but forgets the bottom-right quarter, which needs both reflections. 3 (A) uses only the up-and-down line and 4 (B) only the across line, so the pattern would have just one line of symmetry.</p>`
      },
      {
        stem: `Today is <b>Wednesday 10 June</b>. Grandma’s birthday was exactly <b>60 days ago</b>.
               <p style="margin:10px 0 0">On what day and date was Grandma’s birthday?</p>`,
        options: ["Saturday 10 April", "Saturday 11 April", "Sunday 11 April", "Sunday 12 April", "Sunday 9 August"],
        answer: 1,
        skill: "calendar: counting back days across months and finding the day of the week",
        explain: `<p><b>The day:</b> 60 days is 8 weeks and 4 days (8 × 7 = 56). Going back 8 whole weeks from a Wednesday lands on a Wednesday again; then go back 4 more days: Tuesday, Monday, Sunday, <b>Saturday</b>.</p>
                  <p><b>The date:</b> going back 10 days from 10 June reaches 31 May. May has 31 days, so going back 31 more days reaches 30 April (41 days so far). That leaves 60 − 41 = 19 days: 30 April − 19 days = <b>11 April</b>.</p>
                  <p>So the birthday was <b>Saturday 11 April</b>.</p>
                  <p class="why-not">Saturday 10 April (A) is the trap: it treats 60 days as exactly two months, but May has 31 days, not 30. Sunday 11 April (C) counts the 4 extra days <em>forwards</em> from Wednesday. Sunday 12 April (D) counts today as one of the 60 days, so it only goes back 59. Sunday 9 August (E) counts 60 days forwards instead of back.</p>`
      }
    ]
  }
];
