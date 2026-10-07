/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 45
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `I was nine the summer Uncle Ross took me up to the headland with his red box kite. Up there the wind came straight off the sea with nothing to stop it, and the grass lay as flat as combed hair. He launched the kite and pushed the reel into my hands before I could say no. At once the string went tight, and the kite leapt and plunged above us like a dog that has spotted a cat at the far end of its lead. My arms ached. My heels skidded on the turf. Uncle Ross stood well back, between me and the edge, hands in his pockets, whistling. I remember thinking that if I let go, the kite would reach Alice Springs by teatime. I didn’t let go. When at last we wound it in, my palms were striped red, and I couldn’t stop grinning.`,
  `Sailors have always needed to know how strong the wind is. In 1805, Francis Beaufort, an officer in Britain’s Royal Navy, wrote down a scale for doing exactly that. It used no gadgets and no numbers read off a dial. Instead, each level described what the wind did to the sails of a warship, from force 0, a flat calm, to force 12, a hurricane that no sail could stand up to. Many years later, the scale was given descriptions for people on land as well. At force 0, smoke rises straight up. At force 6, umbrellas become hard to use. By force 8, a gale, twigs snap off trees and walking into the wind is a struggle. More than two hundred years on, many weather services still use Beaufort’s numbers, especially in forecasts for ships.`,
  `By noon the wind had simply stopped. The sail of the <i>Petrel</i> hung from the mast like a wet towel on a hook, and the bay lay so flat that Josh could see a second, upside-down boat beneath them. “We could start the motor,” he said, for the third time. Dad didn’t answer. He was leaning back with his hat over his eyes and one hand on the tiller, as if they had all the time in the world. Josh flicked a crumb over the side and watched it sit there. Then he counted the gulls on the jetty: still eleven. Far out, where the sea met the sky, a dark line began to spread across the water. Dad lifted his hat. “Here she comes,” he said, and smiled.`,
  `Ask anyone who has moved to Gale Point and they will tell you about the wind: the doors that slam, the washing that ends up two streets away, the hats that are never seen again. For years, we said sorry for it. Visitors were warned to pack a jumper even in January, and the local paper ran cartoons of residents sailing over the rooftops. Then, twelve years ago, the first turbines went up on the ridge above the town. Today forty of them turn there, slow and white, like the propellers of a fleet of planes that never takes off. Our school sports teams now call themselves the Gale Point Gusts, and the council has painted a turbine on the welcome sign. It is time the rest of the country stopped laughing at our wind and started copying us.`
];
const PASSAGE = {
  title: "Which Way the Wind Blows",
  note: "Read the four extracts below about the wind.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q2: marbles in a jar (supplied by David; redrawn) ---- */
const JAR_SVG = (() => {
  const cols = { b: "#2f6fb5", g: "#3f9a4a", y: "#f2c230", r: "#d0453a" };
  // 30 marbles: 11 blue, 8 green, 6 yellow, 5 red, mixed up
  const seq = "bgbybrgbybgrbygyrbgbyrgbbygrbg".split("");
  let g = `<path d="M40 30 L40 46 Q22 60 22 86 L22 196 Q22 214 40 214 L160 214 Q178 214 178 196 L178 86 Q178 60 160 46 L160 30 Z" fill="#eef5fb" stroke="${INK}" stroke-width="2.5"/>
           <rect x="34" y="18" width="132" height="14" rx="4" fill="#b8c6d6" stroke="${INK}" stroke-width="2"/>`;
  seq.forEach((c, i) => {
    const row = Math.floor(i / 6), col = i % 6;
    const x = 44 + col * 22.4 + (row % 2 ? 6 : 0), y = 200 - row * 22;
    g += `<circle cx="${x}" cy="${y}" r="10" fill="${cols[c]}" stroke="${INK}" stroke-width="1.2"/>`;
  });
  return `<svg viewBox="0 0 200 228" width="170" height="194" role="img" aria-label="A glass jar full of mixed-up marbles: blue, green, yellow and red.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: plan view of a cube model ---- */
// heights[y][x]; y = 0 is the front row, x = 0 is the left (seen from the front)
const BLOCKS = [[1, 0, 1], [2, 1, 0], [0, 2, 0]];
const MODEL_SVG = (() => {
  const s = 46, d = s * 0.62, ox = 16, base = 2 * s + 3 * d + 14;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#9fc3e6") +
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#6f9fcf") +
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#d6e6f5");
  // faint floor grid so the empty places can be seen
  let g = "";
  for (let y = 0; y <= 3; y++) g += `<line x1="${P(0, y, 0)[0]}" y1="${P(0, y, 0)[1]}" x2="${P(3, y, 0)[0]}" y2="${P(3, y, 0)[1]}" stroke="#8d9bb0" stroke-width="1.3"/>`;
  for (let x = 0; x <= 3; x++) g += `<line x1="${P(x, 0, 0)[0]}" y1="${P(x, 0, 0)[1]}" x2="${P(x, 3, 0)[0]}" y2="${P(x, 3, 0)[1]}" stroke="#8d9bb0" stroke-width="1.3"/>`;
  for (let y = 2; y >= 0; y--) for (let x = 0; x < 3; x++) for (let z = 0; z < BLOCKS[y][x]; z++) g += cube(x, y, z);
  const [ax, ay] = P(1.5, 0, 0);
  g += `<line x1="${ax}" y1="${ay + 40}" x2="${ax}" y2="${ay + 12}" stroke="#c0392b" stroke-width="2.5"/>
        <path d="M${ax - 7} ${ay + 20} L${ax} ${ay + 8} L${ax + 7} ${ay + 20} Z" fill="#c0392b"/>
        <text x="${ax}" y="${ay + 56}" font-size="13" text-anchor="middle" fill="${INK}">front</text>`;
  const W = ox + 3 * s + 3 * d + 12, H = base + 62;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A model made of 7 cubes standing on a 3 by 3 floor grid. Front row, left to right: a stack of 1, an empty place, a stack of 1. Middle row: a stack of 2, a stack of 1, an empty place. Back row: an empty place, a stack of 2, an empty place. The arrow points at the front.">${g}</svg>`;
})();
const planView = (rows, label) => {
  const c = 30, o = 6;
  let g = "";
  rows.forEach((row, r) => row.split("").forEach((ch, k) => {
    g += `<rect x="${o + k * c}" y="${o + r * c}" width="${c}" height="${c}" fill="${ch === "#" ? "#6f9fcf" : "#fff"}" stroke="${ch === "#" ? INK : "#c3ccd8"}" stroke-width="${ch === "#" ? 1.6 : 1}"/>`;
  }));
  g += `<text x="${o + 1.5 * c}" y="${o + 3 * c + 16}" font-size="12" text-anchor="middle" fill="#55607a">front</text>`;
  const W = 3 * c + 2 * o, H = 3 * c + o + 22;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label}">${g}</svg>`;
};
const PLAN_OPTS = [
  ["#.#", "##.", ".#."],
  ["##.", ".##", "#.."],
  [".#.", ".##", "#.#"],
  [".#.", "##.", "#.#"]
].map((rows, i) => planView(rows, `Picture ${"ABCD"[i]}: view from above with the front at the bottom. Rows from back to front (# a cube, . empty): ${rows.join(" / ")}.`));

/* ---- Maths Q1: measuring jug ---- */
const JUG_SVG = (() => {
  const top = 30, bot = 230, x0 = 60, x1 = 170, H = bot - top;   // 0 mL at bot, 1 L at top
  const yOf = ml => bot - (ml / 1000) * H;
  const level = yOf(800);
  let g = `<rect x="${x0}" y="${level}" width="${x1 - x0}" height="${bot - level}" fill="#bfe0f5"/>
           <path d="M${x0} ${top - 12} L${x0} ${bot} L${x1} ${bot} L${x1} ${top - 12}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
           <path d="M${x1} ${top + 10} Q${x1 + 34} ${top + 14} ${x1 + 34} ${top + 60} Q${x1 + 34} ${top + 112} ${x1} ${top + 116}" fill="none" stroke="${INK}" stroke-width="3"/>
           <line x1="${x0}" y1="${level}" x2="${x1}" y2="${level}" stroke="#2f6fb5" stroke-width="2"/>`;
  for (let ml = 0; ml <= 1000; ml += 100) {
    const big = ml % 500 === 0, y = yOf(ml);
    g += `<line x1="${x0}" y1="${y}" x2="${x0 + (big ? 26 : 14)}" y2="${y}" stroke="${INK}" stroke-width="${big ? 2 : 1.5}"/>`;
    if (big && ml > 0) g += `<text x="${x0 - 8}" y="${y + 5}" font-size="14" text-anchor="end" fill="${INK}">${ml === 1000 ? "1 L" : "500 mL"}</text>`;
  }
  return `<svg viewBox="0 0 230 250" width="230" height="250" role="img" aria-label="A measuring jug. The scale is labelled 500 mL halfway up and 1 L at the top. There are 4 unlabelled marks between the bottom and 500 mL, and 4 unlabelled marks between 500 mL and 1 L. The water reaches the third mark above 500 mL.">${g}</svg>`;
})();

/* ---- Maths Q2: number line in thirds ---- */
const NUMLINE_SVG = (() => {
  const x0 = 18, step = 26, y = 46, n = 12;
  let g = `<line x1="${x0 - 8}" y1="${y}" x2="${x0 + n * step + 12}" y2="${y}" stroke="${INK}" stroke-width="2"/>
           <path d="M${x0 + n * step + 12} ${y - 5} L${x0 + n * step + 20} ${y} L${x0 + n * step + 12} ${y + 5} Z" fill="${INK}"/>`;
  for (let i = 0; i <= n; i++) {
    const x = x0 + i * step, big = i % 6 === 0;
    g += `<line x1="${x}" y1="${y - (big ? 10 : 6)}" x2="${x}" y2="${y + (big ? 10 : 6)}" stroke="${INK}" stroke-width="${big ? 2 : 1.5}"/>`;
    if (big) g += `<text x="${x}" y="${y + 28}" font-size="18" text-anchor="middle" fill="${INK}">${i / 3}</text>`;
  }
  const ax = x0 + step;
  g += `<circle cx="${ax}" cy="${y}" r="5" fill="#c0392b"/><text x="${ax}" y="${y - 16}" font-size="18" font-weight="700" text-anchor="middle" fill="#c0392b">A</text>`;
  return `<svg viewBox="0 0 360 90" width="360" height="90" role="img" aria-label="A number line labelled 0, 2 and 4. The space from 0 to 2 has 6 equal parts, and so does the space from 2 to 4. Point A is at the first mark after 0.">${g}</svg>`;
})();

/* ---- Maths Q3: pets on the scales ---- */
const scaleSvg = (label, reading) => `<svg viewBox="0 0 132 112" width="132" height="112" role="img" aria-label="Scales showing ${label}: ${reading}.">
  <rect x="10" y="40" width="112" height="14" rx="4" fill="#c9d6e6" stroke="${INK}" stroke-width="2"/>
  <path d="M30 54 L22 92 L110 92 L102 54 Z" fill="#eef2f7" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
  <rect x="42" y="62" width="48" height="20" rx="3" fill="#1f3550"/>
  <text x="66" y="77" font-size="14" font-weight="700" text-anchor="middle" fill="#9ff0b8">${reading}</text>
  <text x="66" y="28" font-size="14" text-anchor="middle" fill="${INK}">${label}</text>
</svg>`;
const PET_SCALES = `<div style="display:flex;flex-wrap:wrap;gap:10px 18px">${scaleSvg("cat + dog", "11 kg")}${scaleSvg("dog + rabbit", "9 kg")}${scaleSvg("cat + rabbit", "6 kg")}</div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about the wind. For each question, choose the extract (A, B, C or D) which best answers it.",
    questions: [
      {
        stem: "Which extract is <b>mainly</b> about a way of telling how strong something invisible is by looking at what it does?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 1,
        skill: "identifying the main idea of a text expressed in different words",
        explain: `<p>You can’t see the wind, but you can see what it does. The whole of Extract B is about Beaufort’s scale, which judges the wind’s strength by its effects: what it does to a ship’s sails, to smoke, to umbrellas and to trees. It uses “no gadgets and no numbers read off a dial”, only what can be seen happening.</p>
                  <p class="why-not">Extract C is the trap: the “dark line” spreading across the water shows the wind coming, but that is one detail at the end. The extract is mainly about a becalmed boat and an impatient boy. Extract A shows how strong the wind is through the kite, but it is mainly about the writer’s memory of flying it. Extract D is about a town’s feelings about its wind.</p>`
      },
      {
        stem: "Which extract suggests that people have come to see a nuisance as something to be proud of?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 3,
        skill: "inferring a change in attitude from details",
        explain: `<p>In Extract D, the wind used to be a nuisance (slamming doors, lost washing and hats), and the town “said sorry for it”. Now the sports teams are named after the wind and the council has put a turbine on the welcome sign. You don’t put something on your welcome sign unless you are proud of it. The word “proud” is never used; the details show it.</p>
                  <p class="why-not">Extract A is the trap: the writer’s aching arms and red palms turn into a grin, but that is one person enjoying a hard moment, not people changing their minds about a nuisance. In Extract C the calm is a nuisance to Josh, but nobody becomes proud of it. Extract B describes a scale, not anyone’s feelings.</p>`
      },
      {
        stem: "Which extract uses a comparison to suggest that something was pulling hard to break free?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 0,
        skill: "interpreting figurative language (a simile)",
        explain: `<p>In Extract A, the kite “leapt and plunged … like a dog that has spotted a cat at the far end of its lead”. A dog that has seen a cat strains and lunges to get away, so the comparison suggests the kite was tugging hard to escape, which is why the writer’s arms ached and heels skidded. The extract never says “pulling” or “break free”: you have to work out what the comparison means.</p>
                  <p class="why-not">Extract C is the trap: it has a comparison too (the sail hung “like a wet towel on a hook”), but it suggests the opposite, something limp and still. Extract D compares the turbines to propellers on planes that never take off, which suggests they turn but stay put, not that they are straining. Extract B uses no comparisons.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><b>Most</b> of the children who go to Ridgeway Swimming Club can swim 100 metres without stopping.</p>
               <p class="quote"><em class="speaker">Ava:</em> “Leo goes to Ridgeway Swimming Club, so he can probably swim 100 metres without stopping.”</p>
               <p class="quote"><em class="speaker">Ben:</em> “Kira can swim 100 metres without stopping, so she probably goes to Ridgeway Swimming Club.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Ava only", "Ben only", "Both Ava and Ben", "Neither Ava nor Ben"],
        answer: 0,
        skill: "deciding whose reasoning is correct (“most” leading to “probably”)",
        explain: `<p>The box tells us about the children <b>at the club</b>: most of them can swim 100 metres.</p>
                  <p><b>Ava</b> is correct. Leo is one of the club’s children, and most of them can swim 100 metres, so it is likely (though not certain) that he can. That is exactly what “probably” means.</p>
                  <p><b>Ben</b> turns the fact around. The box says nothing about all the children who can swim 100 metres. Thousands of children who have never been near Ridgeway can swim that far, so being able to do it doesn’t make it likely that Kira goes to the club.</p>
                  <p class="why-not">C is the trap: Ben’s sentence uses the same words as Ava’s, just the other way round, so it sounds just as good. D catches students who think “most” is never enough to say anything; but “most” is exactly enough for “probably”, as long as you go in the right direction.</p>`
      },
      {
        stem: `A jar has <b>11 blue</b>, <b>8 green</b>, <b>6 yellow</b> and <b>5 red</b> marbles.
               <div class="figure">${JAR_SVG}</div>
               <p style="margin:10px 0 0">Without looking, what is the fewest marbles you need to take to be sure you have two different colours?</p>`,
        options: ["6", "11", "12", "26"],
        answer: 2,
        skill: "number problem: the worst case, to be sure (supplied by David)",
        explain: `<p>“To be sure” means it must work even if you are as unlucky as possible. The unluckiest thing that can happen is that you keep taking marbles of the <b>same</b> colour for as long as you can.</p>
                  <p>The biggest group is blue, with 11 marbles. So the first 11 marbles could all be blue. Then there are no blue marbles left, so the <b>12th</b> marble must be a different colour. 11 + 1 = <b>12</b>.</p>
                  <p class="why-not">11 (B) is the trap: it finds the worst case but forgets the extra marble that makes the second colour. 6 (A) is one more than the <em>smallest</em> group (5 red + 1), but the unlucky run could be blue, and 6 blues in a row is quite possible. 26 (D) answers a different question: 11 + 8 + 6 + 1 is the number you need to be sure of getting a <em>red</em> marble.</p>`
      },
      {
        stem: `This model is made of 7 identical cubes standing on a floor grid.
               <div class="figure">${MODEL_SVG}</div>
               <p style="margin:10px 0 0">Which picture shows the model when you look at it from <b>directly above</b>? In each picture the front is at the bottom.</p>`,
        visualOptions: true,
        options: PLAN_OPTS,
        answer: 3,
        skill: "working out the top (plan) view of a 3D cube model",
        explain: `<p>From directly above you see one square for every place on the floor that has at least one cube on it. How tall the stack is doesn’t matter.</p>
                  <p>Work row by row, keeping left as left:</p>
                  <p>• back row: only the middle place has a cube: <b>. # .</b><br>
                     • middle row: left and middle: <b># # .</b><br>
                     • front row (at the bottom): left and right: <b># . #</b></p>
                  <p>That is <b>D</b>.</p>
                  <p class="why-not">A is the trap: it has the right rows but puts the front row at the top, as if you were standing at the back. C swaps left and right. B is the right shape given a quarter turn, so the front of the model is no longer at the bottom.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `How much water is in this jug?
               <div class="figure">${JUG_SVG}</div>`,
        options: ["503 mL", "530 mL", "650 mL", "700 mL", "800 mL"],
        answer: 4,
        skill: "reading a scale with unlabelled marks",
        explain: `<p>From 500 mL to 1 L is 500 mL. There are 4 small marks in between, which split it into <b>5</b> equal spaces. 500 ÷ 5 = <b>100 mL</b> per space.</p>
                  <p>The water reaches the 3rd mark above 500 mL: 500 + 3 × 100 = <b>800 mL</b>.</p>
                  <p class="why-not">650 mL (C) is the trap: it counts 4 marks and guesses they go up in 50s (500 + 3 × 50). 700 mL (D) counts the 500 mL line as the first mark, so it only goes up 2 spaces. 530 mL (B) treats each mark as 10 mL, and 503 mL (A) treats each mark as 1 mL.</p>`
      },
      {
        stem: `Pip starts at point A on this number line. He makes <b>4 jumps</b> to the right, and each jump is <b>2/3</b> long.
               <div class="figure">${NUMLINE_SVG}</div>
               <p style="margin:10px 0 0">Where does Pip land?</p>`,
        options: ["2 2/3", "3", "3 1/3", "3 2/3", "4 1/3"],
        answer: 1,
        skill: "fractions on a number line: working out the marks, then fraction jumps",
        explain: `<p>From 0 to 2 there are 6 equal spaces, so each space is 2 ÷ 6 = <b>1/3</b>. Point A is one space after 0, so A is at <b>1/3</b>.</p>
                  <p>Each jump of 2/3 is two spaces. 4 jumps = 4 × 2 = 8 spaces = <b>8/3</b>.</p>
                  <p>1/3 + 8/3 = 9/3 = <b>3</b>. (Check by counting: 1/3 → 1 → 1 2/3 → 2 1/3 → 3.)</p>
                  <p class="why-not">2 2/3 (A) is the trap: it works out the 4 jumps (8/3) but starts from 0 instead of from A. 3 1/3 (C) reads A as 2/3 by counting the mark at 0 as the first mark. 3 2/3 (D) makes 5 jumps instead of 4. 4 1/3 (E) uses the 3 at the bottom of 2/3 as the number of spaces in each jump, so every jump is 1 whole.</p>`
      },
      {
        stem: `At the vet’s, three pets are weighed two at a time.
               <div class="figure">${PET_SCALES}</div>
               <p style="margin:10px 0 0">How much does the dog weigh?</p>`,
        options: ["4 kg", "5 1/2 kg", "7 kg", "13 kg", "26 kg"],
        answer: 2,
        skill: "mass: finding single masses from masses weighed in pairs",
        explain: `<p>Add the three readings: 11 + 9 + 6 = <b>26 kg</b>. Every pet has been on the scales <b>twice</b>, so 26 kg is double the weight of all three pets.</p>
                  <p>All three pets together: 26 ÷ 2 = <b>13 kg</b>.</p>
                  <p>The cat and the rabbit together weigh 6 kg, so the dog weighs 13 − 6 = <b>7 kg</b>.</p>
                  <p>Check: the cat is 13 − 9 = 4 kg and the rabbit is 13 − 11 = 2 kg. 4 + 7 = 11 ✓, 7 + 2 = 9 ✓, 4 + 2 = 6 ✓.</p>
                  <p class="why-not">5 1/2 kg (B) is the trap: it halves the cat-and-dog reading, as if the two pets weighed the same. 13 kg (D) is the weight of all three pets; you still have to take away the cat and the rabbit. 26 kg (E) forgets that each pet was weighed twice. 4 kg (A) takes away the wrong pair (13 − 9), which gives the cat.</p>`
      }
    ]
  }
];
