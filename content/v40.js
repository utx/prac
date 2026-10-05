/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 40
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>In 1799, a dried animal skin arrived at the British Museum in London, sent from the young colony of New South Wales. It belonged to a creature unlike anything European scientists had ever examined: it had the bill of a duck, the fur of an otter, webbed feet and a broad, flat tail. {1}</p>
<p>George Shaw, the naturalist asked to describe it, was deeply suspicious. At the time, some traders were known to sell fake creatures made by skilfully stitching together parts of different animals. {2} He even took a pair of scissors to the skin, searching for the stitches that would expose the trick. He found none.</p>
<p>Shaw published a description of the animal, which he named <i>Platypus anatinus</i>, meaning “flat-footed and duck-like”. Yet the most astonishing discovery was still to come. For decades, scientists argued about how the platypus produced its young. {3} It was not until 1884 that a scientist working in Queensland confirmed that the platypus lays eggs, just as a bird or a reptile does, and yet feeds its babies on milk.</p>
<p>Today the platypus is known as one of the very few mammals in the world that lay eggs. The creature once dismissed as a fake has become one of Australia’s best-loved animals.</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "Shaw wondered whether this might be another clever fake.",
  "Others were sure it hatched from eggs, though no one had ever found any.",
  "No such animal, it seemed, could possibly exist.",
  "Some insisted that, like other furry animals, it must give birth to live young.",
  "Its eggs, when they were finally found, turned out to be about the size of a marble."
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
  title: "Too Strange to Be Real",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: two-way table ---- */
const CLUB_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th></th><th style="text-align:center">plays a sport</th><th style="text-align:center">doesn’t play a sport</th><th style="text-align:center">total</th></tr>
  <tr><th>learns an instrument</th><td style="text-align:center">?</td><td style="text-align:center">5</td><td style="text-align:center">12</td></tr>
  <tr><th>doesn’t learn an instrument</th><td style="text-align:center">?</td><td style="text-align:center">?</td><td style="text-align:center">?</td></tr>
  <tr><th>total</th><td style="text-align:center">15</td><td style="text-align:center">?</td><td style="text-align:center">28</td></tr>
</table></div>`;

/* ---- Thinking Skills Q3: fold and punch ---- */
// paper coordinates 0..1 (x to the right, y upwards); folded quarter is the top-right
const tri = (cx, cy, dir, s) => { // isosceles triangle pointing left (-1) or right (+1)
  const h = s * 0.9;
  return `<path d="M${cx + dir * h / 2} ${cy} L${cx - dir * h / 2} ${cy - s / 2} L${cx - dir * h / 2} ${cy + s / 2} Z" fill="#1b2a41"/>`;
};
const paper = (holes, size) => {
  const P = v => 4 + v * size;
  let g = `<rect x="4" y="4" width="${size}" height="${size}" fill="#fdf3e1" stroke="${INK}" stroke-width="1.6"/>`;
  holes.forEach(([x, y, d]) => g += tri(P(x), P(1 - y), d, size * 0.12));
  return `<svg viewBox="0 0 ${size + 8} ${size + 8}" width="${size + 8}" height="${size + 8}" role="img" aria-label="An unfolded square of paper with ${holes.length} triangle-shaped holes.">${g}</svg>`;
};
const FOLD_SVG = (() => {
  const s = 120;
  const box = (w, h, inner, label, aria) =>
    `<div style="display:flex;flex-direction:column;gap:4px;align-items:flex-start"><span style="font-size:13px;color:#55607a">${label}</span>
      <svg viewBox="0 0 ${w + 8} ${h + 8}" width="${w + 8}" height="${h + 8}" role="img" aria-label="${aria}">${inner}</svg></div>`;
  const step1 = `<rect x="4" y="4" width="${s}" height="${s}" fill="#fdf3e1" stroke="${INK}" stroke-width="1.6"/>
    <line x1="${4 + s / 2}" y1="4" x2="${4 + s / 2}" y2="${4 + s}" stroke="${INK}" stroke-dasharray="4 3"/>
    <path d="M${4 + s * 0.22} ${4 + s * 0.5} q${s * 0.28} -${s * 0.3} ${s * 0.56} 0" fill="none" stroke="#c0392b" stroke-width="2"/>
    <path d="M${4 + s * 0.78} ${4 + s * 0.5} l-9 -2 l5 -7 Z" fill="#c0392b"/>`;
  const step2 = `<rect x="4" y="4" width="${s / 2}" height="${s}" fill="#fdf3e1" stroke="${INK}" stroke-width="1.6"/>
    <line x1="4" y1="${4 + s / 2}" x2="${4 + s / 2}" y2="${4 + s / 2}" stroke="${INK}" stroke-dasharray="4 3"/>
    <path d="M${4 + s * 0.25} ${4 + s * 0.82} q${s * 0.22} -${s * 0.3} 0 -${s * 0.56}" fill="none" stroke="#c0392b" stroke-width="2"/>
    <path d="M${4 + s * 0.25} ${4 + s * 0.26} l-2 9 l7 -4 Z" fill="#c0392b"/>`;
  const q = s / 2;
  const step3 = `<rect x="4" y="4" width="${q}" height="${q}" fill="#fdf3e1" stroke="${INK}" stroke-width="1.6"/>
    <line x1="4" y1="4" x2="4" y2="${4 + q}" stroke="${INK}" stroke-width="4"/>
    <line x1="4" y1="${4 + q}" x2="${4 + q}" y2="${4 + q}" stroke="${INK}" stroke-width="4"/>
    ${tri(4 + q * 0.2, 4 + q * 0.4, 1, s * 0.12)}`;
  return `<div style="display:flex;flex-wrap:wrap;gap:16px 34px;align-items:flex-start">
    ${box(s, s, step1, "1. Fold left onto right", "A square of paper. The left half is folded over onto the right half.")}
    ${box(s / 2, s, step2, "2. Fold bottom up", "The folded paper, now a tall rectangle. The bottom half is folded up onto the top half.")}
    ${box(q, q, step3, "3. Punch a hole", "The folded paper, now a quarter of the size, with its folds along the left and bottom edges (shown thick). A triangle-shaped hole pointing right is punched near the left fold, in the upper part.")}
  </div><p style="margin:6px 0 0;font-size:14px;color:#55607a">In step 3, the thick edges are the folds.</p>`;
})();
// holes in full-paper coordinates [x, y, direction]
const FOLD_OPTS = [
  [[0.4, 0.8, 1], [0.6, 0.8, 1], [0.4, 0.2, 1], [0.6, 0.2, 1]],   // all point right (slid, not flipped)
  [[0.4, 0.8, 1], [0.6, 0.8, -1], [0.4, 0.2, 1], [0.6, 0.2, -1]], // point towards each other
  [[0.4, 0.8, -1], [0.6, 0.8, 1]],                                // only one fold undone
  [[0.4, 0.8, -1], [0.6, 0.8, 1], [0.4, 0.2, -1], [0.6, 0.2, 1]]  // correct: mirror images
].map(h => paper(h, 104));

/* ---- Maths Q2: stacked fractions ---- */
const frac = (n, d) => `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.15;margin:0 3px"><span style="border-bottom:1.5px solid currentColor;padding:0 3px">${n}</span><span style="padding:0 3px">${d}</span></span>`;

/* ---- Maths Q3: two rooms ---- */
const ROOMS_SVG = (() => {
  const u = 22, ox = 30, oy = 30;
  const L = { x: 0, y: 0, w: 4.4, h: 7 }, R = { x: 4.4, y: 2.2, w: 5.4, h: 5.4 };
  const r = (b, f) => `<rect x="${ox + b.x * u}" y="${oy + b.y * u}" width="${b.w * u}" height="${b.h * u}" fill="${f}" stroke="${INK}" stroke-width="2"/>`;
  let g = r(L, "#e7eef8") + r(R, "#fdf3e1");
  g += `<text x="${ox + 2.2 * u}" y="${oy + 3.5 * u + 5}" font-size="14" text-anchor="middle" fill="${INK}">40 m²</text>
        <text x="${ox + 7.1 * u}" y="${oy + 5 * u + 5}" font-size="14" text-anchor="middle" fill="${INK}">30 m²</text>`;
  // 5 m along the top of the left room
  g += `<line x1="${ox}" y1="${oy - 12}" x2="${ox + 4.4 * u}" y2="${oy - 12}" stroke="${INK}" stroke-width="1.2" marker-start="url(#ar)" marker-end="url(#ar)"/>
        <text x="${ox + 2.2 * u}" y="${oy - 18}" font-size="13" text-anchor="middle" fill="${INK}">5 m</text>`;
  // 3 m from the top of the left room down to the top of the right room
  g += `<line x1="${ox + 5.4 * u}" y1="${oy}" x2="${ox + 5.4 * u}" y2="${oy + 2.2 * u}" stroke="${INK}" stroke-width="1.2" marker-start="url(#ar)" marker-end="url(#ar)"/>
        <line x1="${ox + 4.4 * u}" y1="${oy}" x2="${ox + 5.8 * u}" y2="${oy}" stroke="${INK}" stroke-width="1" stroke-dasharray="3 3"/>
        <text x="${ox + 5.4 * u + 8}" y="${oy + 1.1 * u + 5}" font-size="13" fill="${INK}">3 m</text>`;
  // 6 m down the right side of the right room
  g += `<line x1="${ox + 9.8 * u + 14}" y1="${oy + 2.2 * u}" x2="${ox + 9.8 * u + 14}" y2="${oy + 7.6 * u}" stroke="${INK}" stroke-width="1.2" marker-start="url(#ar)" marker-end="url(#ar)"/>
        <text x="${ox + 9.8 * u + 20}" y="${oy + 4.9 * u + 5}" font-size="13" fill="${INK}">6 m</text>`;
  const W = ox + 9.8 * u + 56, H = oy + 7.6 * u + 12;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Plan of two rectangular rooms joined side by side. The left room has area 40 square metres and its top edge is 5 metres. The right room has area 30 square metres and its right side is 6 metres. The top of the right room is 3 metres below the top of the left room. Not to scale.">
    <defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="${INK}"/></marker></defs>${g}</svg>`;
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
        answer: 2,
        skill: "linking a sentence to what comes before and after",
        explain: `<p>The first paragraph lists the platypus’s odd mix of features. The next paragraph begins with Shaw being “deeply suspicious”. Sentence <b>C</b> links the two: the animal seemed too strange to be real, which is exactly why Shaw was suspicious.</p>
                  <p class="why-not">A can’t go here: “another clever fake” needs fakes to have been mentioned already, and they aren’t mentioned until the second paragraph. B and D are about how the platypus has its young, which hasn’t come up yet. E talks about “its eggs” long before anyone has discovered them.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 0,
        skill: "following a line of reasoning across a gap",
        explain: `<p>Just before the gap, we learn that traders sold fakes made by stitching animals together. Just after it, Shaw “even took a pair of scissors to the skin, searching for the stitches”. Sentence <b>A</b> joins them: Shaw wondered whether this was <b>another</b> clever fake. “Another” points back to the stitched fakes, and “He even…” builds on his suspicion.</p>
                  <p class="why-not">C is the trap: it also expresses doubt, so it seems to fit next to “searching for the stitches”. But C is needed at gap 1, and it doesn’t link to the stitched fakes the way “another clever fake” does. B, D and E are all about eggs and young, which belong in the third paragraph.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 3,
        skill: "using linking words and the order of events to place a sentence",
        explain: `<p>Before the gap: scientists “argued about how the platypus produced its young”. After the gap: in 1884 someone finally confirmed that it lays eggs. Sentence <b>D</b> gives one side of the argument: some insisted it must give birth to live young, like other furry animals. That sets up the surprise of the egg discovery.</p>
                  <p class="why-not">B is the trap: it is about the same argument, and it fits the topic perfectly. But it begins with “<b>Others</b>”, which only makes sense after a sentence about what <em>some</em> people thought, and the sentence before the gap doesn’t say that. E is wrong because of the order of events: eggs being “finally found” would come after the 1884 discovery, not before it.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Ms Rossi:</em> “Our school should plant trees around the playground, because it would make lunchtimes cooler for students in summer.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Ms Rossi’s claim?</p>`,
        options: ["The shade of a tree can make the ground beneath it much cooler on a hot day.",
                  "Planting trees would cost the school less than putting up shade sails.",
                  "Trees provide homes and food for many kinds of birds and insects.",
                  "Students are already told to wear a hat whenever they play outside in summer."],
        answer: 0,
        skill: "choosing the statement that supports a claim",
        explain: `<p>Ms Rossi’s reason is that trees would make lunchtimes <b>cooler</b>. To support it, we need something showing that trees really do cool things down. A does exactly that: tree shade makes the ground much cooler on a hot day.</p>
                  <p class="why-not">B is the trap: it makes trees sound like a good choice, but it is about <em>cost</em>, not about whether trees make the playground cooler. C is a true benefit of trees, but it is about wildlife. D is about hats, and if anything suggests the school already has a way of dealing with the heat.</p>`
      },
      {
        stem: `A class of 28 students filled in this table. Some of the numbers are missing.
               ${CLUB_TABLE}
               <p style="margin:10px 0 0">How many students <b>neither</b> play a sport <b>nor</b> learn an instrument?</p>`,
        options: ["1", "5", "8", "13"],
        answer: 2,
        skill: "completing a two-way table",
        explain: `<p>Fill in the table one step at a time.</p>
                  <p>• Instrument row: 12 in total and 5 don’t play a sport, so <b>7</b> learn an instrument <em>and</em> play a sport.<br>
                     • Sport column: 15 in total and 7 learn an instrument, so <b>8</b> play a sport but don’t learn an instrument.<br>
                     • No-instrument row: 28 − 12 = <b>16</b> students don’t learn an instrument. 8 of them play a sport, so 16 − 8 = <b>8</b> do neither.</p>
                  <p>Check: 7 + 5 + 8 + 8 = 28 ✓</p>
                  <p class="why-not">1 (A) is the trap: 28 − 12 − 15 = 1 takes away the instrument students and the sport students, but the 7 who do <em>both</em> have been taken away twice. 13 (D) is 28 − 15, everyone who doesn’t play a sport, including the 5 who learn an instrument. 5 (B) is the students who learn an instrument but don’t play a sport.</p>`
      },
      {
        stem: `A square of paper is folded twice and then a triangle-shaped hole is punched through all the layers.
               <div class="figure">${FOLD_SVG}</div>
               <p style="margin:10px 0 0">Which of these shows the paper when it is completely unfolded?</p>`,
        visualOptions: true,
        options: FOLD_OPTS,
        answer: 3,
        skill: "picturing folding and unfolding (holes are reflected in the folds)",
        explain: `<p>Unfold one fold at a time. Each fold acts like a <b>mirror</b>: the new hole appears on the other side of the fold line, the same distance away, and <b>flipped</b>.</p>
                  <p>• Undo fold 2 (the bottom edge): a second triangle appears in the bottom half, the same distance below the middle line. It still points right.<br>
                     • Undo fold 1 (the left edge): both triangles are copied onto the left half, flipped, so they point <b>left</b>.</p>
                  <p>So there are four holes. The two on the right point right, the two on the left point left, and each pair points <em>away</em> from the middle. That is <b>D</b>.</p>
                  <p class="why-not">A is the trap: it has four holes in the right places, but all pointing the same way, as if the holes were slid across instead of flipped. B flips them the wrong way, so they point towards each other. C forgets the second fold, so it has only two holes.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `In an open-water swimming race, Jess swam across the bay in 1 hour, 4 minutes and 9.62 seconds.
               <p style="margin:10px 0 0">How long is this in seconds, rounded to the nearest second?</p>`,
        options: ["310", "3610", "3849", "3850", "10409"],
        answer: 3,
        skill: "time: converting to seconds and rounding",
        explain: `<p>1 hour = 60 × 60 = <b>3600</b> seconds. 4 minutes = 4 × 60 = <b>240</b> seconds.</p>
                  <p>3600 + 240 + 9.62 = <b>3849.62</b> seconds.</p>
                  <p>Rounded to the nearest second: 0.62 is more than a half, so round up to <b>3850</b>.</p>
                  <p class="why-not">3849 (C) is the trap: it drops the 0.62 instead of rounding it. 3610 (B) forgets the 4 minutes. 310 (A) counts the hour as only 60 seconds. 10409 (E) just writes the digits of 1:04:09 side by side.</p>`
      },
      {
        stem: `What is the answer when you add these fractions correctly?
               <p style="margin:12px 0;font-size:20px">${frac("666666", "999999")} + ${frac("111111", "333333")} + ${frac("444444", "888888")}</p>`,
        options: [frac("1222221", "2222220"), frac("11", "20"), "1", `1<span style="display:inline-block;width:4px"></span>${frac("1", "2")}`, "2"],
        answer: 3,
        skill: "fractions: simplifying before adding (competition-style)",
        explain: `<p>Don’t add these as they are; simplify each fraction first by spotting the pattern.</p>
                  <p>• 666666 ÷ 999999: both are 111111 times something (6 and 9), so it is ${frac("6", "9")} = ${frac("2", "3")}.<br>
                     • 111111 ÷ 333333 is ${frac("1", "3")}.<br>
                     • 444444 ÷ 888888 is ${frac("4", "8")} = ${frac("1", "2")}.</p>
                  <p>${frac("2", "3")} + ${frac("1", "3")} + ${frac("1", "2")} = 1 + ${frac("1", "2")} = <b>1${frac("1", "2")}</b>.</p>
                  <p class="why-not">A is the trap: it adds the tops together and the bottoms together, which is never how fractions are added. B does the same with the first digits only (6 + 1 + 4 over 9 + 3 + 8). 1 (C) adds ${frac("2", "3")} and ${frac("1", "3")} but forgets the third fraction. 2 (E) treats ${frac("1", "2")} as a whole.</p>`
      },
      {
        stem: `The diagram shows the plan of two rooms that join together. Some lengths and the areas of the rooms are given. (The diagram is not drawn to scale.)
               <div class="figure">${ROOMS_SVG}</div>
               <p style="margin:10px 0 0">What is the perimeter of the combined shape?</p>`,
        options: ["36 m", "38 m", "43 m", "48 m", "70 m"],
        answer: 1,
        skill: "area and perimeter: finding missing sides, then the outline",
        explain: `<p><b>Find the missing sides.</b> The left room has area 40 m² and width 5 m, so its height is 40 ÷ 5 = <b>8 m</b>. The right room has area 30 m² and height 6 m, so its width is 30 ÷ 6 = <b>5 m</b>.</p>
                  <p><b>Find the shared wall.</b> The right room starts 3 m below the top of the left room and goes down 6 m, to 9 m. The left room ends at 8 m. So the rooms touch from 3 m down to 8 m: a shared wall of <b>5 m</b>.</p>
                  <p><b>Perimeter.</b> Left room: 2 × (5 + 8) = 26 m. Right room: 2 × (5 + 6) = 22 m. The shared wall is inside the shape, so take it away from <em>both</em> rooms: 26 + 22 − 5 − 5 = <b>38 m</b>.</p>
                  <p class="why-not">36 m (A) is the trap: it takes away the whole 6 m side of the right room twice, but only 5 m of it is shared, because the right room sticks out 1 m below the left room. 43 m (C) takes the shared wall away only once. 48 m (D) adds the two perimeters without taking anything away. 70 m (E) adds the two areas.</p>`
      }
    ]
  }
];
