/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 50
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `The swing bridge across the river at my grandparents’ farm was nothing more than a row of narrow planks hung from two wire ropes, and it shivered if anyone so much as breathed on it. I was seven. My cousins raced across as if it were a footpath, and the whole thing bucked and swayed beneath them while I gripped the wire at the start. Between the planks I could see brown water hurrying past, a long way below. My big brother, Tom, stepped on behind me. “One more plank,” he said, every time I stopped. “Just one more.” It took me ten minutes to reach the other bank. Ten minutes after that, I was asking Tom if we could go back across, just so I could do it again.`,
  `When the Sydney Harbour Bridge opened on 19 March 1932, it gave the city something it had always lacked: a quick way across the harbour without catching a ferry. Its single steel arch had been built out from both shores at once, and the two halves finally met in the middle in August 1930. From the time it opened, trains, trams, cars and people on foot all crossed it. Sydneysiders nicknamed it “the Coathanger” because of its shape. Keeping its steel painted, to stop rust, is a job that never really ends. Since 1998, visitors have been able to put on special suits and climb to the top of the arch, 134 metres above the water. And every New Year’s Eve, fireworks are set off from the bridge while huge crowds watch from all around the harbour.`,
  `“I’m not waiting for anyone,” Ivy told the old man with the dog. “I’m just watching the trains.” She had been watching them from the footbridge for nearly an hour. Each time one slid into the station below, she leaned over the rail and studied every door as it opened. Each time the doors closed again, she shrugged and looked carefully at her shoes. The 5:42 was late. When it finally hissed to a stop, a tall girl with a huge orange backpack stepped off and looked up. Ivy gave a small, careless wave and walked, without hurrying, to the top of the steps. Only when she was halfway down did she start to run.`,
  `Every school morning, children from the east side of Millbrook take the long way round. They walk down to the old road bridge, squeeze along its narrow footpath beside the trucks and then climb back up the other side of the creek. It takes them twenty minutes. A footbridge from the end of Wattle Street would take them straight across in two. Some councillors say a footbridge would cost too much, and that the road bridge has done its job perfectly well for sixty years. But that bridge was built for cars, not for children carrying heavy schoolbags. A footbridge would mean safer walks, fewer cars at the school gate and, I suspect, a lot more people strolling by the creek on summer evenings. It is time the council stopped talking and started building.`
];
const PASSAGE = {
  title: "Getting to the Other Side",
  note: "Read the four extracts below about bridges.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q2: side view of a cube model ---- */
// HEIGHTS[y][x]; y = 0 is the front row, x = 0 is the left (seen from the front)
const HEIGHTS = [[1, 0, 1], [2, 1, 0], [3, 1, 2]];
const MODEL_SVG = (() => {
  const s = 42, d = s * 0.6, ox = 14, top = 3 * s + 3 * d + 12, base = top;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const pts = a => a.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
  const poly = (a, fill) => `<polygon points="${pts(a)}" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#9fc3e6") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#6f9fcf") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#d6e6f5");
  let g = "";
  const L = (a, b) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#8d9bb0" stroke-width="1.3"/>`;
  for (let y = 0; y <= 3; y++) g += L(P(0, y, 0), P(3, y, 0));
  for (let x = 0; x <= 3; x++) g += L(P(x, 0, 0), P(x, 3, 0));
  for (let y = 2; y >= 0; y--) for (let x = 0; x < 3; x++) for (let z = 0; z < HEIGHTS[y][x]; z++) g += cube(x, y, z);
  // arrow on the right, pointing left at the right-hand side of the model
  const [a1x, a1y] = P(4.8, 1.5, 0), [a2x] = P(3.45, 1.5, 0);
  g += `<line x1="${a1x.toFixed(1)}" y1="${a1y.toFixed(1)}" x2="${(a2x + 10).toFixed(1)}" y2="${a1y.toFixed(1)}" stroke="#c0392b" stroke-width="4"/>
        <path d="M${(a2x + 18).toFixed(1)} ${(a1y - 10).toFixed(1)} L${a2x.toFixed(1)} ${a1y.toFixed(1)} L${(a2x + 18).toFixed(1)} ${(a1y + 10).toFixed(1)} Z" fill="#c0392b"/>`;
  const [fx, fy] = P(1.5, 0, 0);
  g += `<text x="${fx.toFixed(1)}" y="${(fy + 22).toFixed(1)}" font-size="14" text-anchor="middle" fill="${INK}">front</text>`;
  const W = Math.ceil(a1x + 8), H = Math.ceil(fy + 30);
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A model made of 11 cubes standing on a 3 by 3 floor grid. Front row, left to right: a stack of 1, an empty place, a stack of 1. Middle row: a stack of 2, a stack of 1, an empty place. Back row: a stack of 3, a stack of 1, a stack of 2. A red arrow on the right-hand side points at the model from the right.">${g}</svg>`;
})();
const sideView = (cols, label) => {
  const s = 24, W = cols.length * s + 20, H = 3 * s + 16;
  let g = `<line x1="4" y1="${H - 6}" x2="${W - 4}" y2="${H - 6}" stroke="${INK}" stroke-width="1.5"/>`;
  cols.forEach((h, k) => { for (let z = 0; z < h; z++) g += `<rect x="${10 + k * s}" y="${H - 6 - (z + 1) * s}" width="${s}" height="${s}" fill="#9fc3e6" stroke="${INK}" stroke-width="1.4"/>`; });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}">${g}</svg>`;
};
const VIEW_OPTS = [
  [3, 1, 2],   // the view from the front
  [3, 2, 1],   // mirror image (the view from the left)
  [1, 2, 3],   // correct: the view from the right
  [1, 0, 2]    // only the stacks nearest the arrow (right-hand column)
].map((cols, i) => sideView(cols, `Picture ${"ABCD"[i]}: columns of squares with heights ${cols.join(", ")} from left to right.`));

/* ---- Maths Q2: a clear box being filled with centimetre cubes ---- */
const BOX_SVG = (() => {
  const L = 6, Wd = 4, Ht = 3, s = 30, d = s * 0.6, ox = 10, base = Ht * s + Wd * d + 12;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const pts = a => a.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ");
  const poly = (a, fill, extra = "") => `<polygon points="${pts(a)}" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round" ${extra}/>`;
  const edge = (a, b) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#4a6a8a" stroke-width="2"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#f4c27a") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#e0a24c") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#fbe0b5");
  // inside walls of the clear box: floor, back wall, left wall
  let g = `<polygon points="${pts([P(0, 0, 0), P(L, 0, 0), P(L, Wd, 0), P(0, Wd, 0)])}" fill="#e6eef6"/>
           <polygon points="${pts([P(0, Wd, 0), P(L, Wd, 0), P(L, Wd, Ht), P(0, Wd, Ht)])}" fill="#f1f6fb"/>
           <polygon points="${pts([P(0, 0, 0), P(0, Wd, 0), P(0, Wd, Ht), P(0, 0, Ht)])}" fill="#edf3f9"/>`;
  g += edge(P(0, Wd, 0), P(L, Wd, 0)) + edge(P(0, 0, 0), P(0, Wd, 0)) + edge(P(0, Wd, 0), P(0, Wd, Ht));
  const cubes = [];
  for (let x = 0; x < L; x++) cubes.push([x, 0, 0]);              // row along the front
  for (let y = 1; y < Wd; y++) cubes.push([L - 1, y, 0]);         // row along the right side
  for (let z = 1; z < Ht; z++) cubes.push([L - 1, 0, z]);         // stack in the front right corner
  cubes.sort((a, b) => b[1] - a[1] || a[0] - b[0] || a[2] - b[2]).forEach(c => g += cube(...c));
  // the box's outer edges, drawn on top so the box looks clear
  [[P(0, 0, 0), P(L, 0, 0)], [P(0, 0, Ht), P(L, 0, Ht)], [P(0, 0, 0), P(0, 0, Ht)], [P(L, 0, 0), P(L, 0, Ht)],
   [P(L, 0, 0), P(L, Wd, 0)], [P(L, 0, Ht), P(L, Wd, Ht)], [P(L, Wd, 0), P(L, Wd, Ht)],
   [P(0, Wd, Ht), P(L, Wd, Ht)], [P(0, 0, Ht), P(0, Wd, Ht)]].forEach(([a, b]) => g += edge(a, b));
  const W = Math.ceil(ox + L * s + Wd * d + 10), H = base + 10;
  return `<svg viewBox="0 0 ${W} ${H.toFixed(0)}" width="${W}" height="${H.toFixed(0)}" role="img" aria-label="A clear box with no lid, drawn in 3D. Inside it are 11 centimetre cubes: a row of 6 cubes along the front, which exactly fills the length of the box; a row of cubes along the right-hand side, which together with the front corner cube makes 4 cubes and exactly fills the width; and a stack in the front right corner, which is 3 cubes high and exactly reaches the top of the box.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about bridges. For each question, choose the extract (A, B, C or D) which best answers it.",
    questions: [
      {
        stem: "In which extract does someone come to enjoy the very thing that frightened them?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 0,
        skill: "inferring feelings that are shown, not stated",
        explain: `<p>Extract A never uses the words “scared” or “frightened”, but the details show it: the writer “gripped the wire at the start”, kept stopping, and needed Tom to coax them on, one plank at a time. Yet ten minutes after reaching the other side, the writer wants to cross again “just so I could do it again”. The thing that frightened them has become something they enjoy.</p>
                  <p class="why-not">Extract D is the trap: the children squeeze past trucks on a narrow footpath, which sounds frightening, but nobody comes to enjoy it; the writer wants it changed. In Extract C, Ivy is nervous and excited while she waits, but she is not afraid of anything. Extract B mentions climbing 134 metres above the water, but says nothing about anyone being frightened.</p>`
      },
      {
        stem: "Which extract suggests that someone is trying to hide how much something matters to them?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 2,
        skill: "inferring a hidden feeling from actions that don’t match words",
        explain: `<p>In Extract C, Ivy says she is “not waiting for anyone”, but her actions give her away. She has been on the footbridge for nearly an hour, she studies every train door, and each time she is disappointed she “shrugged and looked carefully at her shoes”. When the girl finally arrives, Ivy gives only “a small, careless wave” and walks “without hurrying”, but once she thinks no one can see her face, she runs. She is pretending not to care, when the arrival really matters to her a great deal.</p>
                  <p class="why-not">Extract A is the trap: the writer is clearly struggling on the bridge, but is not hiding it; gripping the wire and stopping at every plank show the fear openly. In Extract D the writer says plainly how much the footbridge matters (“It is time the council stopped talking”). Extract B gives facts and feelings belong to no one in it.</p>`
      },
      {
        stem: "Which extract suggests that something made to solve an everyday problem has become far more than that to a great many people?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 1,
        skill: "identifying the main idea of a text expressed in different words",
        explain: `<p>Extract B starts with the everyday problem the bridge solved: getting across the harbour without catching a ferry. The rest of the extract shows what it has come to mean since. People gave it a fond nickname (“the Coathanger”), visitors pay to climb it, and every New Year’s Eve it is the centre of the fireworks while huge crowds watch. None of these has anything to do with getting across the harbour. The extract never says “the bridge means more to people now”: you have to work it out from the details.</p>
                  <p class="why-not">Extract D is the trap: its footbridge would solve an everyday problem, and the writer hopes it would bring people “strolling by the creek” too. But that footbridge hasn’t even been built, so it can’t have become anything yet; the writer only “suspect[s]” it would. Extract A shows a bridge becoming fun for one child, on one afternoon, not for a great many people. In Extract C the footbridge is just the place where Ivy waits.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Two classes ran cake stalls to raise money for the school library. The Year 5 stall was open <b>all day on Saturday</b> and raised <b>$300</b>. The Year 6 stall was open for <b>one hour on Sunday morning</b> and raised <b>$150</b>.</p>
               <p class="quote"><em class="speaker">Ella (Year 5):</em> “Our stall raised twice as much money as the Year 6 stall, so our cakes must have been more popular.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Ella has made?</p>`,
        options: ["The Year 5 students may have spent many hours baking their cakes the night before.",
                  "The money raised by both of the stalls may be spent on new books for the school library.",
                  "Some of the money Year 6 raised may have come from selling drinks, not cakes.",
                  "In the much shorter time it was open, the Year 6 stall may have sold cakes faster."],
        answer: 3,
        skill: "spotting the mistake (an unfair comparison: different amounts of time)",
        explain: `<p>Ella compares the <b>totals</b>, but the two stalls were not open for the same length of time. Year 6 raised $150 in just one hour. Year 5 was open all day, perhaps eight hours or more, so it may have raised much less than $150 in each hour. Compared fairly, Year 6’s cakes may have sold faster, which means they may have been <em>more</em> popular, not less. D points out this mistake.</p>
                  <p class="why-not">C is the trap: it is about the money Year 6 raised, so it seems to question the comparison. But if some of Year 6’s money came from drinks, Year 6 sold even <em>fewer</em> cakes, which would back Ella up rather than show her mistake. A is about how hard Year 5 worked, which says nothing about how popular the cakes were. B is about what the money will be spent on, which has nothing to do with Ella’s conclusion.</p>`
      },
      {
        stem: `This model is made of <b>11</b> cubes standing on a floor grid.
               <div class="figure">${MODEL_SVG}</div>
               <p style="margin:10px 0 0">Which picture shows what you would see if you looked at the model from the direction of the <b>arrow</b>?</p>`,
        visualOptions: true,
        options: VIEW_OPTS,
        answer: 2,
        skill: "the side view of a cube model from a given direction",
        explain: `<p><b>Step 1: which way round?</b> Stand where the arrow is and look at the model. The <b>front</b> row is now on your <b>left</b> and the back row is on your right.</p>
                  <p><b>Step 2: how tall is each column?</b> From this side, each column of the view shows the <em>tallest</em> stack in one row (front to back) of the model; shorter stacks are hidden behind it.<br>
                     • Front row (stacks 1, 0, 1): tallest is <b>1</b>.<br>
                     • Middle row (stacks 2, 1, 0): tallest is <b>2</b>.<br>
                     • Back row (stacks 3, 1, 2): tallest is <b>3</b>.</p>
                  <p>So from left to right the view is 1, 2, 3. That is <b>C</b>.</p>
                  <p class="why-not">B is the trap: it has the right heights but the wrong way round (3, 2, 1), with the front row on the right. That is the view from the <em>left</em>-hand side of the model. A is the view from the front (3, 1, 2). D shows only the stacks closest to the arrow (the right-hand column: 1, 0, 2), but taller stacks further away can still be seen above and behind them, and nothing in this view would look like a gap.</p>`
      },
      {
        stem: `Anthony, Babul, Carl, and Dilly ran in a race. Only one of them received a medal. Only one of the four children did not tell the truth.
               <p class="quote"><em class="speaker">Anthony</em> says, “Babul didn’t receive a medal.”</p>
               <p class="quote"><em class="speaker">Babul</em> says, “Dilly received a medal.”</p>
               <p class="quote"><em class="speaker">Carl</em> says, “I received a medal.”</p>
               <p class="quote"><em class="speaker">Dilly</em> says, “I didn’t receive a medal.”</p>
               <p style="margin:10px 0 0">Who did not tell the truth?</p>`,
        options: ["Anthony", "Babul", "Carl", "Dilly"],
        answer: 1,
        skill: "logic: finding the one false statement by testing each case (supplied by David)",
        explain: `<p>Try each runner as the medal winner, and count how many statements would be false. Only one case can have exactly <b>one</b> false statement.</p>
                  <div class="table-wrap"><table class="grid">
                    <tr><th>If the medal went to …</th><th style="text-align:center">Anthony</th><th style="text-align:center">Babul</th><th style="text-align:center">Carl</th><th style="text-align:center">Dilly</th><th style="text-align:center">false statements</th></tr>
                    <tr><th>Anthony</th><td style="text-align:center">true</td><td style="text-align:center">false</td><td style="text-align:center">false</td><td style="text-align:center">true</td><td style="text-align:center">2 ✗</td></tr>
                    <tr><th>Babul</th><td style="text-align:center">false</td><td style="text-align:center">false</td><td style="text-align:center">false</td><td style="text-align:center">true</td><td style="text-align:center">3 ✗</td></tr>
                    <tr><th>Carl</th><td style="text-align:center">true</td><td style="text-align:center"><b>false</b></td><td style="text-align:center">true</td><td style="text-align:center">true</td><td style="text-align:center"><b>1 ✓</b></td></tr>
                    <tr><th>Dilly</th><td style="text-align:center">true</td><td style="text-align:center">true</td><td style="text-align:center">false</td><td style="text-align:center">false</td><td style="text-align:center">2 ✗</td></tr>
                  </table></div>
                  <p>Only “Carl won the medal” gives exactly one false statement, and that statement is Babul’s. So <b>Babul</b> did not tell the truth.</p>
                  <p>A quicker way: Babul says Dilly won, and Dilly says she didn’t, so one of those two must be lying. That means everyone else, Anthony and Carl, told the truth. Carl’s true statement says Carl won, so Dilly didn’t win, and Babul is the one who lied.</p>
                  <p class="why-not">D (Dilly) is the trap: Babul and Dilly contradict each other, so one of them must be lying, and it is easy to pick the wrong one. If Dilly were lying, Dilly would have won, and then Carl’s statement would be false too: two liars. C (Carl) is tempting because “I received a medal” sounds like boasting, but if Carl were lying, Babul’s and Dilly’s statements would still clash, so there would be two liars. A (Anthony) would mean Babul won, which makes three statements false.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `A car’s odometer shows how many kilometres the car has travelled altogether. Today, Dad’s car shows <b>40 205 km</b>.
               <p style="margin:10px 0 0">What did it show <b>1000 km</b> earlier?</p>`,
        options: ["30 205 km", "39 205 km", "40 105 km", "40 195 km", "41 205 km"],
        answer: 1,
        skill: "place value: taking away 1000 when the thousands digit is 0",
        explain: `<p>Taking away 1000 changes the <b>thousands</b> digit. In 40 205 the thousands digit is 0, so regroup: 40 thousands = 39 thousands + 1 thousand. Take the 1 thousand away and 39 thousands are left; the hundreds, tens and ones (205) do not change.</p>
                  <p>40 205 − 1000 = <b>39 205 km</b>. Check: 39 205 + 1000 = 40 205 ✓</p>
                  <p class="why-not">30 205 (A) is the trap: with no thousand to take away, it takes 1 from the ten-thousands digit instead, which takes away 10 000. 40 105 (C) takes 1 from the hundreds digit (100 less). 40 195 (D) takes away 10. 41 205 (E) adds 1000 instead of taking it away; “earlier” means the car had travelled less.</p>`
      },
      {
        stem: `Leo is filling a clear box with centimetre cubes. So far he has put in a row of cubes along the front, a row along the right-hand side and a stack in the front right corner, as shown. Each row and the stack fit the inside of the box exactly.
               <div class="figure">${BOX_SVG}</div>
               <p style="margin:10px 0 0">How many cubes will be in the box when it is completely full?</p>`,
        options: ["11", "13", "24", "61", "72"],
        answer: 4,
        skill: "volume: working out a box’s inside measurements from the cubes, then filling it in layers",
        explain: `<p><b>Step 1: the inside measurements.</b> The front row has 6 cubes, so the box is 6 cubes long. The side row is 4 cubes deep (counting the corner cube). The corner stack is 3 cubes high.</p>
                  <p><b>Step 2: fill it in layers.</b> One layer covering the floor is 6 rows of 4, or 6 × 4 = <b>24</b> cubes. The box is 3 layers high: 24 × 3 = <b>72</b> cubes.</p>
                  <p class="why-not">24 (C) is the trap: it fills the bottom layer but forgets that the box is 3 layers high. 61 (D) answers a different question: 72 − 11 is how many <em>more</em> cubes Leo needs. 13 (B) adds the three measurements (6 + 4 + 3) instead of multiplying. 11 (A) counts the cubes already in the box.</p>`
      },
      {
        stem: `Ruby and Tom collected <b>50</b> shells altogether at the beach. If Tom gave Ruby <b>6</b> of his shells, they would both have the same number.
               <p style="margin:10px 0 0">How many shells did Ruby collect?</p>`,
        options: ["19", "22", "25", "31", "38"],
        answer: 0,
        skill: "sum and difference: finding two numbers from their total and a hidden difference",
        explain: `<p><b>Step 1: find the difference.</b> When Tom gives 6 shells away, he goes down by 6 and Ruby goes up by 6. They end up equal, so Tom must have started with 6 + 6 = <b>12</b> more than Ruby.</p>
                  <p><b>Step 2: sum and difference.</b> Take the extra 12 away from the total: 50 − 12 = 38. Now the rest can be shared equally: 38 ÷ 2 = <b>19</b>. Ruby collected 19 and Tom collected 19 + 12 = 31.</p>
                  <p>Check: 19 + 31 = 50 ✓. After the swap: Ruby 19 + 6 = 25 and Tom 31 − 6 = 25 ✓.</p>
                  <p class="why-not">22 (B) is the trap: it thinks Tom has only 6 more than Ruby, forgetting that the swap changes <em>both</em> numbers, and works out (50 − 6) ÷ 2. 25 (C) is how many each would have <em>after</em> the swap. 31 (D) is Tom’s number, not Ruby’s. 38 (E) takes away the difference but forgets to share what is left between the two.</p>`
      }
    ]
  }
];
