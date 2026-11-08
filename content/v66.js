/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 66
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>My aunt can fold a paper crane in under a minute. I know, because the first time I watched her, I timed her: fifty-two seconds from a flat square of paper to a bird with its wings spread and its neck curving upwards. She made it look so {1} that I assumed it must be easy.</p>
<p>It was not. My first crane took me forty minutes and looked like a squashed tissue. The second was worse. The instructions seemed to be written in a secret language of valley folds, mountain folds, squash folds and petal folds. A valley fold, I eventually worked out, makes a dip like the letter V, and a mountain fold makes a peak, but knowing that did not stop my creases from wandering. By the fifth crane I was so frustrated that I was tempted to {2} to scissors and sticky tape.</p>
<p>“Everyone’s first crane looks like that,” said Aunt Mei, smoothing out my crumpled attempt. “Paper remembers every fold, so be gentle and be exact.” Then she told me about an old Japanese belief: anyone who folds a thousand paper cranes will be granted a wish.</p>
<p>That was three months ago. I have now folded sixty-four cranes, and they hang on strings above my bed, getting neater from one end of the row to the other. At this rate my thousandth crane is years away, but I have stopped counting. Each evening I fold one crane slowly, pressing every crease flat with my thumbnail, and that quiet ten minutes has become the best part of my day. I am beginning to suspect that the folding itself is the real {3}.</p>`;

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
  title: "A Thousand Cranes",
  note: "Read the text below and decide which answer best fits each gap. (<i>Origami</i> is the Japanese art of folding paper into shapes.)",
  html: clozeHtml
};

/* ---- Thinking Skills Q3: objects on a table, seen from one side ---- */
const OBJ_COL = { bottle: "#7fc4a0", ball: "#e8796e", box: "#c99a5b", cone: "#f2b45a" };
const OBJ_POS = { bottle: [0, 2], ball: [1, 0], box: [2, 3], cone: [3, 1] };   // [row from top, column from left]
const TABLE_SVG = (() => {
  const u = 52, ox = 14, oy = 14, n = 4;
  let g = `<rect x="${ox}" y="${oy}" width="${n * u}" height="${n * u}" rx="6" fill="#f7efe1" stroke="${INK}" stroke-width="2.4"/>`;
  Object.entries(OBJ_POS).forEach(([name, [r, c]]) => {
    const cx = ox + c * u + u / 2, cy = oy + r * u + u / 2 - 5, col = OBJ_COL[name];
    if (name === "box") g += `<rect x="${cx - 14}" y="${cy - 14}" width="28" height="28" fill="${col}" stroke="${INK}" stroke-width="1.6"/>`;
    else if (name === "bottle") g += `<circle cx="${cx}" cy="${cy}" r="12" fill="${col}" stroke="${INK}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="5" fill="#ffffff" stroke="${INK}" stroke-width="1.4"/>`;
    else if (name === "cone") g += `<circle cx="${cx}" cy="${cy}" r="13" fill="${col}" stroke="${INK}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="2.5" fill="${INK}"/>`;
    else g += `<circle cx="${cx}" cy="${cy}" r="12" fill="${col}" stroke="${INK}" stroke-width="1.6"/>`;
    g += `<text x="${cx}" y="${cy + 27}" font-size="12" font-weight="700" text-anchor="middle" fill="${INK}">${name}</text>`;
  });
  const ax = ox + n * u, ay = oy + 2 * u;
  g += `<line x1="${ax + 62}" y1="${ay}" x2="${ax + 16}" y2="${ay}" stroke="#c0392b" stroke-width="3"/><polygon points="${ax + 6},${ay} ${ax + 18},${ay - 7} ${ax + 18},${ay + 7}" fill="#c0392b"/>`;
  g += `<text x="${ax + 44}" y="${ay - 12}" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">Sam</text>`;
  const W = ax + 72, H = oy * 2 + n * u;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A view from above of a square table with four objects. From the top of the picture to the bottom, the objects are: the bottle (third column from the left), the ball (first column), the box (fourth column) and the cone (second column). Sam stands at the right-hand edge of the table, looking across it towards the left.">${g}</svg>`;
})();
const sideObj = (name, x, base) => {
  const col = OBJ_COL[name];
  if (name === "bottle") return `<rect x="${x - 11}" y="${base - 46}" width="22" height="46" rx="4" fill="${col}" stroke="${INK}" stroke-width="1.6"/><rect x="${x - 5}" y="${base - 60}" width="10" height="15" fill="${col}" stroke="${INK}" stroke-width="1.6"/>`;
  if (name === "ball") return `<circle cx="${x}" cy="${base - 14}" r="14" fill="${col}" stroke="${INK}" stroke-width="1.6"/>`;
  if (name === "box") return `<rect x="${x - 15}" y="${base - 30}" width="30" height="30" fill="${col}" stroke="${INK}" stroke-width="1.6"/><line x1="${x - 15}" y1="${base - 23}" x2="${x + 15}" y2="${base - 23}" stroke="${INK}" stroke-width="1.2"/>`;
  return `<polygon points="${x - 15},${base} ${x + 15},${base} ${x},${base - 40}" fill="${col}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><line x1="${x - 8}" y1="${base - 16}" x2="${x + 8}" y2="${base - 16}" stroke="#ffffff" stroke-width="3"/>`;
};
const sideView = (order, label) => {
  const W = 184, base = 72, step = 42, x0 = 29;
  let g = `<line x1="4" y1="${base}" x2="${W - 4}" y2="${base}" stroke="${INK}" stroke-width="3"/>`;
  order.forEach((name, i) => { g += sideObj(name, x0 + i * step, base); });
  return `<svg viewBox="0 0 ${W} ${base + 8}" width="${Math.round(W * 0.7)}" height="${Math.round((base + 8) * 0.7)}" role="img" aria-label="${label}: from left to right, ${order.join(", ")}">${g}</svg>`;
};
const VIEW_ORDERS = [
  ["cone", "box", "ball", "bottle"],
  ["bottle", "ball", "box", "cone"],
  ["ball", "cone", "bottle", "box"],
  ["box", "bottle", "cone", "ball"]
];
const VIEW_OPTS = VIEW_ORDERS.map((o, i) => sideView(o, `Picture ${"ABCD"[i]}`));

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["tireless", "endless", "effortless", "restless"],
        answer: 2,
        skill: "choosing between look-alike words: which one fits the meaning",
        explain: `<p>Aunt Mei folds a whole crane in fifty-two seconds, and the writer “assumed it must be easy”. Something that looks easy, as if it needs no effort at all, looks <b>effortless</b>.</p>
                  <p class="why-not">“Tireless” is the trap: it is close in meaning (never getting tired), but it describes a <em>person</em> who keeps going (“a tireless worker”), not how a task looks, and it wouldn’t make anyone think the task was easy. “Endless” means going on and on, but the crane took less than a minute. “Restless” means unable to keep still, which has nothing to do with how easy the folding looks.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["resort", "recourse", "rely", "refer"],
        answer: 0,
        skill: "choosing between look-alike words, using the grammar and the little word that follows (“to”)",
        explain: `<p>Origami is done by folding only. The writer was so frustrated that giving up on folding and using scissors and tape instead seemed tempting, even though it would be cheating. To <b>resort to</b> something means to turn to it because nothing else has worked.</p>
                  <p class="why-not">“Recourse” is the trap: it looks almost the same and has a similar meaning, but it is a noun (“I had no recourse but to…”), so it can’t follow “tempted to”. “Rely” is followed by “on”, not “to” (“rely on scissors”). “Refer to” means to mention or look something up (“refer to the instructions”), which doesn’t fit using scissors.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["wish", "chore", "obstacle", "reward"],
        answer: 3,
        skill: "choosing a word from the meaning of the whole text: an attitude shown, not stated",
        explain: `<p>Follow how the writer’s feelings change. At first the writer was aiming for the wish at the end: a thousand cranes. Now the writer has “stopped counting”, folds slowly, and the ten minutes of folding have become “the best part of my day”. So the folding is no longer just a way to get the wish; it is the good thing in itself. The folding itself is the real <b>reward</b>.</p>
                  <p class="why-not">Each wrong word fits an <em>earlier</em> part of the text, or the wrong way of seeing it. “Chore” (a dull job you have to do) is the trap: the writer does fold one crane every evening, like a regular job. But nobody calls a chore “the best part of my day”. “Wish” picks up a word from earlier in the text, but the wish is what Aunt Mei’s story promises at the <em>end</em>, after a thousand cranes; the writer is saying the folding itself has become the good part, not that the folding is a wish. “Obstacle” (something in the way) treats the folding as what stands between her and the wish, which is how a reader might expect the writer to feel, but the writer has stopped counting and no longer sees the folding that way.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">The deadline to complete the Geography homework was last Friday. Anyone who didn’t complete it on time will have to stay behind after school tomorrow to finish it off.</p>
               <p class="quote"><em class="speaker">Kalinda:</em> “I know Abby didn’t complete the homework on time, so she’ll definitely be staying behind tomorrow.”</p>
               <p class="quote"><em class="speaker">Keira:</em> “Lottie has to stay behind tomorrow, so she must have failed to complete the homework on time too!”</p>
               <p style="margin:10px 0 0">If the information in the box is true, whose reasoning is correct?</p>`,
        options: ["Keira only", "Kalinda only", "Both Kalinda and Keira", "Neither Kalinda nor Keira"],
        answer: 1,
        skill: "deciding whose reasoning is correct (a rule used the right way round and reversed) (supplied by David)",
        explain: `<p>The rule goes one way: <b>didn’t complete the homework on time → stays behind tomorrow</b>.</p>
                  <p><b>Kalinda</b> is correct. Abby didn’t complete the homework on time, so the rule says she must stay behind.</p>
                  <p><b>Keira</b> has turned the rule round. The box says that everyone who missed the deadline stays behind, but it doesn’t say that <em>only</em> they stay behind. Lottie could be staying behind for a different reason: a detention, a music lesson, or another subject’s homework. So we can’t be sure that she missed the deadline.</p>
                  <p class="why-not">“Both” (C) is the trap: Keira sounds just as sure as Kalinda and uses the same rule, but she uses it backwards, from staying behind to missing the deadline. “Keira only” (A) mixes up which way the rule works. “Neither” (D) is for students who think nobody can be certain; but Kalinda can be, because she uses the rule exactly the way it is written.</p>`
      },
      {
        stem: `Rosa is 3 years older than her brother Leo. In 4 years’ time, their ages will add up to 25.
               <p style="margin:10px 0 0">How old is <b>Leo now</b>?</p>`,
        options: ["11", "10", "9", "7"],
        answer: 3,
        skill: "number problem: two conditions at once (a difference in ages and a total in the future)",
        explain: `<p><b>Step 1: go back to now.</b> In 4 years, <em>both</em> children will be 4 years older, so their total will have grown by 4 + 4 = 8. Now their ages add up to 25 − 8 = <b>17</b>.</p>
                  <p><b>Step 2: use the difference.</b> Rosa is 3 years older. Take the 3 away and share the rest equally: 17 − 3 = 14, and 14 ÷ 2 = 7. So Leo is <b>7</b> and Rosa is 10.</p>
                  <p>Check: in 4 years Leo will be 11 and Rosa 14, and 11 + 14 = 25 ✓. Rosa is 3 years older ✓.</p>
                  <p class="why-not">9 (C) is the trap: it takes 4 years off the total only once, as if only one of the children got older: 25 − 4 = 21, then (21 − 3) ÷ 2 = 9. Check it: Leo 9 and Rosa 12 make 13 and 16 in 4 years, which add up to 29, not 25. 11 (A) forgets to go back to now: it is Leo’s age <em>in 4 years</em>. 10 (B) is Rosa’s age now, not Leo’s.</p>`
      },
      {
        stem: `This picture shows a table seen from <b>above</b>. Sam stands at the right-hand edge of the table, where the arrow is, and looks straight across the table.
               <div class="figure">${TABLE_SVG}</div>
               <p style="margin:10px 0 0">Which picture shows what Sam sees, from his left to his right?</p>`,
        visualOptions: true,
        options: VIEW_OPTS,
        answer: 0,
        skill: "views: what a person on one side of a table sees, from left to right",
        explain: `<p><b>Step 1: work out Sam’s left and right.</b> Sam is at the right-hand edge, facing towards the left of the page. Turn the page a quarter turn clockwise, so that Sam is at the bottom looking up: what was the <b>bottom</b> of the picture is now on his left, and what was the <b>top</b> is now on his right. (Or think of a map: someone facing west has south on their left and north on their right.)</p>
                  <p><b>Step 2: order the objects.</b> So, from his left to his right, Sam sees the objects in order from the <b>bottom</b> of the picture to the <b>top</b>: cone, box, ball, bottle. That is <b>A</b>. How far each object is from Sam doesn’t change the order, and no object hides another, because they are all in different rows.</p>
                  <p class="why-not">B is the trap: it has the right objects in the right line-up, but with left and right swapped (top of the picture to the bottom). It is what someone at the <em>opposite</em> (left-hand) edge of the table would see. C reads the objects from left to right across the page (ball, cone, bottle, box), which is what someone at the <em>bottom</em> edge would see, not Sam. D is the view from the top edge of the table.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `What number goes in the box?
               <p style="margin:10px 0 0;font-size:1.25em;text-align:center">☐ ÷ 3 + 8 = 4 × 5</p>`,
        options: ["4", "12", "36", "52", "84"],
        answer: 2,
        skill: "missing number: undoing two operations in the right order, with the equals sign meaning “the same as”",
        explain: `<p>The right-hand side is 4 × 5 = <b>20</b>. So ☐ ÷ 3 + 8 = 20.</p>
                  <p>Undo the steps in reverse order. The last thing done was “+ 8”, so take 8 away first: 20 − 8 = <b>12</b>. That means ☐ ÷ 3 = 12, so ☐ = 12 × 3 = <b>36</b>.</p>
                  <p>Check: 36 ÷ 3 = 12, and 12 + 8 = 20 = 4 × 5 ✓</p>
                  <p class="why-not">52 (D) is the trap: it undoes the steps in the wrong order, multiplying by 3 first and then taking 8 away (20 × 3 − 8 = 52). Check: 52 ÷ 3 isn’t even a whole number. 12 (B) stops one step early: it is ☐ ÷ 3, not ☐. 4 (A) divides by 3 instead of multiplying (12 ÷ 3). 84 (E) adds 8 instead of taking it away ((20 + 8) × 3).</p>`
      },
      {
        stem: `A jug holds <b>2 litres</b> when it is full. It has <b>650 mL</b> of water in it. Mia pours in <b>3 cups</b> of water, and each cup holds <b>250 mL</b>.
               <p style="margin:10px 0 0">How much <b>more</b> water does Mia need to fill the jug?</p>`,
        options: ["600 mL", "1100 mL", "1250 mL", "1350 mL", "1400 mL"],
        answer: 0,
        skill: "capacity: litres and millilitres, two steps",
        explain: `<p><b>Step 1: same units.</b> 2 litres = <b>2000 mL</b>.</p>
                  <p><b>Step 2: how much is in the jug now?</b> 3 cups × 250 mL = 750 mL. With the 650 mL already there: 650 + 750 = <b>1400 mL</b>.</p>
                  <p><b>Step 3: how much more?</b> 2000 − 1400 = <b>600 mL</b>.</p>
                  <p class="why-not">1400 mL (E) is the trap: it is how much water is in the jug, not how much <em>more</em> is needed. 1350 mL (D) forgets the 3 cups Mia poured in (2000 − 650). 1250 mL (C) forgets the 650 mL that was already in the jug (2000 − 750). 1100 mL (B) counts only one cup of 250 mL instead of three.</p>`
      },
      {
        stem: `Sam has:
               <ul style="margin:6px 0 0">
                 <li>3 T-shirts: <b>red</b>, <b>blue</b> and <b>green</b></li>
                 <li>3 pairs of shorts: <b>red</b>, <b>blue</b> and <b>black</b></li>
                 <li>2 caps: <b>red</b> and <b>blue</b></li>
               </ul>
               <p style="margin:10px 0 0">An outfit is one T-shirt, one pair of shorts and one cap. Sam never wears two things of the same colour at once.</p>
               <p style="margin:10px 0 0">How many different outfits can Sam wear?</p>`,
        options: ["18", "14", "7", "6", "2"],
        answer: 3,
        skill: "combinations with a condition: counting outfits with no two items the same colour",
        explain: `<p>Start with the cap, because it is the item with the fewest choices, then list what can go with it.</p>
                  <p><b>Red cap:</b> the T-shirt can’t be red, so blue or green. The shorts can’t be red, so blue or black. And the T-shirt and shorts can’t both be blue:<br>
                     blue T-shirt + black shorts, green T-shirt + blue shorts, green T-shirt + black shorts → <b>3</b> outfits.</p>
                  <p><b>Blue cap:</b> the T-shirt can be red or green; the shorts can be red or black; and they can’t both be red:<br>
                     red T-shirt + black shorts, green T-shirt + red shorts, green T-shirt + black shorts → <b>3</b> outfits.</p>
                  <p>3 + 3 = <b>6</b> outfits.</p>
                  <p class="why-not">14 (B) is the trap: it checks that the T-shirt and shorts are different colours (7 pairs) and then doubles for the 2 caps, forgetting that the cap mustn’t match either of them. 18 (A) ignores the colour rule altogether (3 × 3 × 2). 7 (C) counts the T-shirt and shorts pairs and forgets the caps. 2 (E) takes away every clash from the 18 separately (16 clashes), but an all-red or all-blue outfit has three clashes and has been taken away three times.</p>`
      }
    ]
  }
];
