/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 44
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: missing sentences ---- */
const ARTICLE_TEXT = `
<p>In 1941, a Swiss engineer named George de Mestral came home from a trip in the Alps with his dog. Both of them were covered in burrs, the prickly seed cases of the burdock plant. {1} De Mestral, however, wanted to know why they clung on so stubbornly.</p>
<p>He put one of the burrs under a microscope to take a closer look. {2} These hooks grabbed onto anything with tiny loops in it, such as the threads of his clothes, and tangled themselves in his dog’s fur. That gave him an idea. Perhaps two strips of fabric, one covered in hooks and the other in loops, could be pressed together to make a fastener that could be pulled apart and closed again.</p>
<p>Turning the idea into a product was far from easy. With the help of a weaver, he made his first strips from cotton, but the cotton wore out too quickly. {3} After years of experiments, he found the answer: nylon, a strong thread made by people rather than by plants or animals. In 1951 he applied for a patent, the official right to be the only one to make and sell his invention.</p>
<p>He named it Velcro, joining parts of two French words: <em>velours</em>, meaning velvet, and <em>crochet</em>, meaning hook. Today hook-and-loop fasteners hold together everything from children’s shoes to hospital equipment, and astronauts have used them to stop objects floating away in space. Not bad for an idea that began with a few annoying seeds.</p>`;

const SENT_LETTERS = ["A", "B", "C", "D", "E"];
const SENTENCES = [
  "Burdock grows wild in many parts of Europe and Asia.",
  "Each burr was covered in hundreds of tiny spikes, and the end of every spike was bent into a hook.",
  "The tiny hooks had to stay curved, even after the strips had been pulled apart thousands of times.",
  "Most people would simply have pulled them off and thrown them away.",
  "Nylon had been invented in the 1930s, and it was already being used to make toothbrushes and stockings."
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
  title: "Stuck on an Idea",
  note: "Three sentences have been removed from the text below. Choose the sentence that fits each gap. There are two extra sentences you do not need to use.",
  html: articleHtml
};

/* ---- Thinking Skills Q2: bike hire prices ---- */
const BIKE_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th></th><th style="text-align:center">1 hour</th><th style="text-align:center">half day<br><small>(up to 4 hours)</small></th><th style="text-align:center">full day</th></tr>
  <tr><th>adult bike</th><td style="text-align:center">$12</td><td style="text-align:center">$30</td><td style="text-align:center">$45</td></tr>
  <tr><th>child bike</th><td style="text-align:center">$8</td><td style="text-align:center">$20</td><td style="text-align:center">$30</td></tr>
  <tr><th>family pass<br><small>(2 adults and up to 2 children)</small></th><td style="text-align:center">–</td><td style="text-align:center">–</td><td style="text-align:center">$100</td></tr>
</table></div>`;

/* ---- Thinking Skills Q3: turned shape ---- */
const shapeSvg = (cells, c, fill, label) => {
  const w = Math.max(...cells.map(p => p[0])) + 1, h = Math.max(...cells.map(p => p[1])) + 1;
  let g = "";
  cells.forEach(([x, y]) => g += `<rect x="${4 + x * c}" y="${4 + y * c}" width="${c}" height="${c}" fill="${fill}" stroke="${INK}" stroke-width="1.6"/>`);
  return `<svg viewBox="0 0 ${w * c + 8} ${h * c + 8}" width="${w * c + 8}" height="${h * c + 8}" role="img" aria-label="${label}">${g}</svg>`;
};
// cells as [column, row], rows counted downwards
const F_SHAPE = shapeSvg([[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]], 34, "#8fb7e0",
  "A shape made of five squares. Top row: squares in the middle and right columns. Middle row: squares in the left and middle columns. Bottom row: a square in the middle column only.");
const TURN_OPTS = [
  // A: flipped left-right
  shapeSvg([[0, 0], [1, 0], [1, 1], [2, 1], [1, 2]], 26, "#f2c58a", "Top row: left and middle. Middle row: middle and right. Bottom row: middle."),
  // B: turned a quarter turn (correct)
  shapeSvg([[1, 0], [0, 1], [1, 1], [2, 1], [2, 2]], 26, "#f2c58a", "Top row: middle. Middle row: left, middle and right. Bottom row: right."),
  // C: flipped, then turned
  shapeSvg([[1, 0], [0, 1], [1, 1], [2, 1], [0, 2]], 26, "#f2c58a", "Top row: middle. Middle row: left, middle and right. Bottom row: left."),
  // D: flipped upside down
  shapeSvg([[1, 0], [0, 1], [1, 1], [1, 2], [2, 2]], 26, "#f2c58a", "Top row: middle. Middle row: left and middle. Bottom row: middle and right.")
];

/* ---- Maths Q2: spinner ---- */
const SPINNER_SVG = (() => {
  const r = 110, cx = 130, cy = 130;
  // sectors clockwise from the top: [degrees, colour name, fill]
  const parts = [[90, "blue", "#7fa8d8"], [45, "red", "#e58b84"], [45, "green", "#8cc79a"], [45, "red", "#e58b84"],
                 [45, "yellow", "#f3d36b"], [45, "green", "#8cc79a"], [45, "red", "#e58b84"]];
  const pt = (deg, rr) => [cx + rr * Math.sin(deg * Math.PI / 180), cy - rr * Math.cos(deg * Math.PI / 180)];
  let g = "", a = 0;
  parts.forEach(([deg, name, fill]) => {
    const [x1, y1] = pt(a, r), [x2, y2] = pt(a + deg, r);
    g += `<path d="M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${fill}" stroke="${INK}" stroke-width="1.6"/>`;
    const [lx, ly] = pt(a + deg / 2, r * 0.66);
    g += `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" font-size="14" text-anchor="middle" fill="${INK}">${name}</text>`;
    a += deg;
  });
  for (let t = 0; t < 360; t += 45) {
    const [x1, y1] = pt(t, r), [x2, y2] = pt(t, r + 9);
    g += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="2"/>`;
  }
  g += `<line x1="${cx}" y1="${cy}" x2="${cx + 14}" y2="${cy + 40}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="6" fill="${INK}"/>`;
  return `<svg viewBox="0 0 260 260" width="260" height="260" role="img" aria-label="A spinner with marks around its edge every eighth of a turn. Going clockwise from the top: blue covers a quarter of the spinner (two eighths), then red one eighth, green one eighth, red one eighth, yellow one eighth, green one eighth and red one eighth.">${g}</svg>`;
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
        answer: 3,
        skill: "using a contrast word to place a sentence",
        explain: `<p>After the gap comes “De Mestral, <b>however</b>, wanted to know why they clung on so stubbornly.” “However” shows a contrast, so the sentence before it must say what <em>other</em> people would do. Sentence <b>D</b> does this: most people would just pull the burrs off and throw them away, but de Mestral was curious. In D, “them” means the burrs.</p>
                  <p class="why-not">A is the trap: it is about burdock, which has just been mentioned, so it seems to follow on. But it gives no contrast for “however”, and after A the word “they” in the next sentence would seem to mean the countries of Europe and Asia. B describes what he saw under the microscope, which hasn’t happened yet.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 2</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 1,
        skill: "using a reference word (“These hooks”) to place a sentence",
        explain: `<p>Before the gap, de Mestral looks at a burr under a microscope. After it: “<b>These hooks</b> grabbed onto anything with tiny loops.” “These hooks” must point back to hooks that have just been mentioned. Sentence <b>B</b> is the only sentence that tells us what he saw: spikes with ends bent into hooks.</p>
                  <p class="why-not">C is the trap: it mentions “tiny hooks”, so it seems to lead into “These hooks”. But it talks about strips being pulled apart, and he hasn’t even had the idea for a fastener made of strips yet at this point. A is about where burdock grows, not about what the microscope showed, and doesn’t mention hooks at all.</p>`
      },
      {
        stem: "Which sentence best fits <b>gap 3</b>?",
        letterOptions: true,
        options: ["A", "B", "C", "D", "E"],
        answer: 2,
        skill: "following a problem and its solution across a gap",
        explain: `<p>Before the gap there is a <b>problem</b>: the cotton wore out too quickly. After it: “After years of experiments, he found <b>the answer</b>: nylon.” “The answer” only makes sense if something before it sets a question or a need. Sentence <b>C</b> does: it sets a challenge, because the hooks had to stay curved after being pulled apart thousands of times. Put that next to the clue before the gap: cotton “wore out”, so its hooks must have lost their shape. Nylon, “a strong thread”, is the answer to that challenge, even though C never names a material.</p>
                  <p class="why-not">E is the trap: the paragraph ends with nylon, so a sentence about nylon seems to belong here. But look at how the next sentence brings nylon in: “he found the answer: nylon, a strong thread made by people”. It explains what nylon is, which a writer only does the <em>first</em> time something is mentioned. If E came first, nylon would already be known, and E sets up no problem for “the answer” to solve. A is about where burdock grows, which has nothing to do with the cotton wearing out. D and B belong to the start of the story, when he first finds the burrs.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Tom:</em> “We should plant our tomato seedlings in the sunny corner of the garden, so that they produce more tomatoes.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Tom’s claim?</p>`,
        options: ["Tomato plants produce more fruit when they get at least six hours of sunlight a day.",
                  "The sunny corner of the garden is right next to the tap, so the seedlings would be easy to water.",
                  "Tomatoes are one of the most popular plants that people grow in their own gardens.",
                  "The shady part of the garden is already full of herbs that Tom’s family planted last year."],
        answer: 0,
        skill: "choosing the statement that supports a claim",
        explain: `<p>Tom’s reason for choosing the sunny corner is that the plants would produce <b>more tomatoes</b> there. To support the claim, we need a link between sunshine and the number of tomatoes. A gives exactly that link: more sunlight means more fruit.</p>
                  <p class="why-not">B is the trap: it is a real advantage of the sunny corner, but it is about how <em>easy</em> watering would be, not about how many tomatoes the plants will grow. C is about tomatoes in general, not about where to plant them. D gives a reason not to use the shady part, but it says nothing about getting more tomatoes.</p>`
      },
      {
        stem: `A shop hires out bikes. These are its prices.
               ${BIKE_TABLE}
               <p style="margin:10px 0 0">A half day can be made longer by paying the 1-hour price for each extra hour.</p>
               <p style="margin:10px 0 0">Two adults and one child each want a bike for <b>5 hours</b>. What is the lowest price they can pay altogether?</p>`,
        options: ["$70", "$80", "$100", "$112"],
        answer: 2,
        skill: "using a price table to find the cheapest way to pay",
        explain: `<p>5 hours is more than a half day (up to 4 hours), so compare the ways each person could pay:</p>
                  <p>• Adult: 5 × $12 = $60 by the hour, $45 for a full day, or a half day + 1 extra hour = $30 + $12 = <b>$42</b>.<br>
                     • Child: 5 × $8 = $40 by the hour, $30 for a full day, or $20 + $8 = <b>$28</b>.</p>
                  <p>Paying separately, the cheapest is $42 + $42 + $28 = $112.</p>
                  <p>But the <b>family pass</b> is for 2 adults and <em>up to</em> 2 children, so it covers this family too, for the whole day: <b>$100</b>. That is cheaper.</p>
                  <p class="why-not">$112 (D) is the trap: it finds the cheapest way for each person, but misses the family pass, perhaps thinking it needs two children. $80 (B) uses half-day prices, forgetting that a half day only covers 4 of the 5 hours. $70 (A) finds the best price for one adult and the child but leaves out the second adult.</p>`
      },
      {
        stem: `Here is a shape made of five squares.
               <div class="figure">${F_SHAPE}</div>
               <p style="margin:10px 0 0">The shape is <b>turned</b> (it is not flipped over). Which of these could be the turned shape?</p>`,
        visualOptions: true,
        options: TURN_OPTS,
        answer: 1,
        skill: "telling a turned shape from a flipped (mirror-image) shape",
        explain: `<p>Turn the shape a quarter turn clockwise. The long column of three squares (the middle column) becomes a row of three across the middle. The square sticking out on the left (middle row) moves to the top. The square at the top right moves to the bottom right. That is <b>B</b>.</p>
                  <p class="why-not">C is the trap: it has the same row of three, with one square above the middle and one below an end, so it looks like a turned shape, but the bottom square is at the wrong end. It is the mirror image of B, which you can only make by flipping the shape over. A is the original flipped left to right, and D is the original flipped upside down.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `A water cooler holds <b>4.5 L</b> of water. During the day, <b>12</b> cups are filled from it. Each cup holds <b>275 mL</b>.
               <p style="margin:10px 0 0">How much water is left in the cooler?</p>`,
        options: ["750 mL", "1.2 L", "1.5 L", "3.3 L", "7.8 L"],
        answer: 1,
        skill: "capacity: litres and millilitres in two steps",
        explain: `<p>1 L = 1000 mL, so 4.5 L = <b>4500 mL</b>.</p>
                  <p>12 cups × 275 mL: 4 cups hold 1100 mL, so 12 cups hold 3 × 1100 = <b>3300 mL</b>.</p>
                  <p>4500 − 3300 = 1200 mL = <b>1.2 L</b>.</p>
                  <p class="why-not">750 mL (A) is the trap: it reads 4.5 L as “4 litres and 50 mL” (4050 mL), but 0.5 L is half a litre, which is 500 mL. 1.5 L (C) rounds each cup to 250 mL. 3.3 L (D) is the water poured out, not the water left. 7.8 L (E) adds instead of taking away.</p>`
      },
      {
        stem: `The marks around the edge of this spinner split it into eighths.
               <div class="figure">${SPINNER_SVG}</div>
               <p style="margin:10px 0 0">Ivy spins the arrow <b>40</b> times. About how many times should she expect it to land on <b>red or yellow</b>?</p>`,
        options: ["10", "15", "20", "23", "25"],
        answer: 2,
        skill: "chance: expected results when the parts are different sizes",
        explain: `<p>Count the <b>eighths</b>, not the parts: red covers 3 eighths and yellow 1 eighth, so red or yellow covers 4 eighths, which is half the spinner.</p>
                  <p>Half of 40 spins = <b>20</b>.</p>
                  <p class="why-not">23 (D) is the trap: there are 7 coloured parts and 4 of them are red or yellow, so 4 out of 7 of 40 is about 23. But the parts are not all the same size: blue’s part is twice as big as the others. 15 (B) counts red only (3 eighths of 40) and forgets yellow. 25 (E) is the number of times it should land on anything <em>except</em> red (5 eighths of 40). 10 (A) treats the 4 colours as equally likely, 1 in 4 each.</p>`
      },
      {
        stem: `Sam reads <b>12 pages every 10 minutes</b>. He has <b>90 pages</b> left in his book and wants to finish them at exactly <b>8:00 pm</b>.
               <p style="margin:10px 0 0">He will take a <b>15-minute break</b> after every 30 pages he reads (but not after the last page).</p>
               <p style="margin:10px 0 0">What is the latest time he can start reading?</p>`,
        options: ["5:42 pm", "6:00 pm", "6:10 pm", "6:15 pm", "6:45 pm"],
        answer: 3,
        skill: "rates and time: working backwards from a finishing time",
        explain: `<p><b>Reading time.</b> 12 pages take 10 minutes, so 6 pages take 5 minutes. 90 pages = 15 lots of 6 pages, which take 15 × 5 = <b>75 minutes</b>.</p>
                  <p><b>Breaks.</b> He reads 30 pages, break, 30 pages, break, 30 pages, then finishes. That is only <b>2 breaks</b>: 2 × 15 = 30 minutes.</p>
                  <p><b>Total:</b> 75 + 30 = 105 minutes = 1 hour 45 minutes. Work back from 8:00 pm: 8:00 − 1 hour = 7:00, then − 45 minutes = <b>6:15 pm</b>.</p>
                  <p class="why-not">6:00 pm (B) is the trap: 90 ÷ 30 = 3, but there is no break after the last 30 pages, so there are 2 breaks, not 3. (Reading 1 page a minute with 2 breaks also gives 6:00.) 6:10 pm (C) rounds 90 ÷ 12 = 7½ up to 8 lots of 10 minutes. 5:42 pm (A) swaps the rate to 10 pages every 12 minutes. 6:45 pm (E) forgets the breaks.</p>`
      }
    ]
  }
];
