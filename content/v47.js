/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 47
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: narrative ---- */
const PARAS = [
  `Every Saturday, Gran’s stall at the Riverside Market sold the same things: herbs in tin cans, succulents in chipped teacups, and tomato seedlings with their names written on ice-block sticks. Nell’s job was to wrap the pots in newspaper and say, “Thank you, come again.”`,
  `“I’m just popping over to the bakery for some change,” Gran said at ten o’clock. “Five minutes. You’ll be fine.”`,
  `Nell nodded. She straightened the ice-block sticks so that they stood in a perfect line. Then she straightened them again.`,
  `The man arrived at minute three. He was carrying one of Gran’s teacups, and in it was something brown and floppy that had once been a plant.`,
  `“I bought this here last Saturday,” he said, putting it down hard enough to make the tin cans rattle. “It’s dead. I want my eight dollars back.”`,
  `Nell looked across the road at the bakery. There was a long queue and no sign of Gran.`,
  `She pressed one finger into the soil. It was so wet that water oozed up around her fingernail. Gran said it at least once every Saturday: succulents like to be forgotten.`,
  `“Have you been watering it every day?” Nell asked. Her voice came out smaller than she had planned, so she asked again.`,
  `“Every single morning,” said the man. “I look after my plants.”`,
  `Nell’s hand moved towards the money tin, then stopped. Instead, she chose the plumpest succulent and held it out.`,
  `“You can swap it for this one,” she said. “But it only wants a drink once a fortnight. It likes to be left alone.” She wrote ONCE A FORTNIGHT on an ice-block stick and pushed it into the soil.`,
  `The man stared at the stick. Then, to Nell’s surprise, he laughed. “Left alone,” he said. “Just like my teenagers.” He tucked the teacup under his arm and walked off.`,
  `When Gran came back, Nell was wrapping a pot of basil for a woman with a pram.`,
  `“Any trouble?” Gran asked.`,
  `“Not really,” said Nell. Then she turned to the woman and said, “Thank you, come again,” loud enough for the next stall to hear.`
];
const PASSAGE = {
  title: "Back in Five Minutes",
  note: "Read the story below, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: pool lane booking sheet ---- */
const SLOTS = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];
const BOOKED = [ // 1 = booked, lanes 1 to 5
  [1, 0, 0, 1, 1],
  [0, 1, 1, 0, 1],
  [0, 1, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0],
  [1, 0, 0, 0, 0]
];
const POOL_TABLE = `<div class="table-wrap"><table class="grid" style="font-size:15px">
  <tr><th rowspan="2" style="vertical-align:bottom">start time</th><th colspan="5" style="text-align:center">lane</th></tr>
  <tr>${[1, 2, 3, 4, 5].map(l => `<th style="text-align:center;padding:5px 10px">${l}</th>`).join("")}</tr>
  ${SLOTS.map((t, r) => `<tr><td>${t} am</td>${BOOKED[r].map(b => b
    ? `<td style="text-align:center;background:#c9d3e3;padding:5px 10px" aria-label="booked">✗</td>`
    : `<td style="text-align:center;padding:5px 10px" aria-label="free"></td>`).join("")}</tr>`).join("")}
</table></div>
<p style="margin:6px 0 0;font-size:15px"><span style="display:inline-block;padding:0 8px;background:#c9d3e3;border:1px solid ${INK}">✗</span> = booked &nbsp;&nbsp; empty = free</p>`;

/* ---- Thinking Skills Q3: camp map ---- */
const CAMP_SVG = (() => {
  const c = 40, ox = 34, oy = 26, n = 6;
  const X = x => ox + x * c, Y = y => oy + (n - y) * c;
  let g = "";
  for (let i = 0; i <= n; i++) {
    g += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(n)}" stroke="#c3cad6" stroke-width="1"/>`;
    g += `<line x1="${X(0)}" y1="${Y(i)}" x2="${X(n)}" y2="${Y(i)}" stroke="#c3cad6" stroke-width="1"/>`;
  }
  const places = [["Hut", 4, 6, "#b5651d", "above"], ["Lake", 1, 2, "#3b82c4", "below"], ["Flagpole", 6, 0, "#c0392b", "below"],
                  ["Tents", 1, 5, "#3f8f5a", "above"], ["Woodpile", 5, 4, "#7a5a3a", "right"]];
  places.forEach(([name, x, y, col, side]) => {
    g += `<circle cx="${X(x)}" cy="${Y(y)}" r="6.5" fill="${col}" stroke="${INK}" stroke-width="1.3"/>`;
    const tx = side === "right" ? X(x) + 10 : X(x), ty = side === "above" ? Y(y) - 11 : side === "below" ? Y(y) + 21 : Y(y) + 5;
    g += `<text x="${tx}" y="${ty}" font-size="14" font-weight="600" text-anchor="${side === "right" ? "start" : "middle"}" fill="${INK}" paint-order="stroke" stroke="#fff" stroke-width="4">${name}</text>`;
  });
  // compass rose
  const cx = X(n) + 42, cy = Y(n) + 40;
  g += `<line x1="${cx}" y1="${cy + 22}" x2="${cx}" y2="${cy - 22}" stroke="${INK}" stroke-width="2"/>
        <polygon points="${cx},${cy - 30} ${cx - 6},${cy - 18} ${cx + 6},${cy - 18}" fill="${INK}"/>
        <line x1="${cx - 22}" y1="${cy}" x2="${cx + 22}" y2="${cy}" stroke="${INK}" stroke-width="1.2"/>
        <text x="${cx}" y="${cy - 35}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">N</text>`;
  const W = X(n) + 66, H = Y(0) + 34;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto" role="img" aria-label="A camp map drawn on a square grid with north at the top. Counting grid lines from the bottom-left corner, the Hut is 4 across and 6 up, the Lake is 1 across and 2 up, the Flagpole is 6 across and 0 up, the Tents are 1 across and 5 up, and the Woodpile is 5 across and 4 up.">${g}</svg>`;
})();

/* ---- Maths Q1: picture graph of eggs ---- */
const EGGS = [["Monday", 3.5], ["Tuesday", 5], ["Wednesday", 2.5], ["Thursday", 4]];
const eggIcon = (cx, cy, half) => half
  ? `<path d="M${cx} ${cy - 13} A10 13 0 0 0 ${cx} ${cy + 13} Z" fill="#f3e2c0" stroke="${INK}" stroke-width="1.3"/>`
  : `<ellipse cx="${cx}" cy="${cy}" rx="10" ry="13" fill="#f3e2c0" stroke="${INK}" stroke-width="1.3"/>`;
const EGG_SVG = (() => {
  const lx = 96, rowH = 36, top = 8;
  let g = "";
  EGGS.forEach(([d, v], i) => {
    const cy = top + 18 + i * rowH;
    g += `<text x="${lx - 12}" y="${cy + 5}" font-size="14" text-anchor="end" fill="${INK}">${d}</text>`;
    for (let k = 0; k < Math.ceil(v); k++) g += eggIcon(lx + 14 + k * 28, cy, v - k === 0.5);
  });
  g += `<line x1="${lx}" y1="${top}" x2="${lx}" y2="${top + EGGS.length * rowH}" stroke="${INK}" stroke-width="1.4"/>`;
  const ky = top + EGGS.length * rowH + 26;
  g += eggIcon(lx + 14, ky, false) + `<text x="${lx + 32}" y="${ky + 5}" font-size="14" fill="${INK}">= 6 eggs</text>`;
  const W = lx + 14 + 5 * 28 + 10, H = ky + 20;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Picture graph of eggs collected. Key: one egg picture stands for 6 eggs. Monday: 3 and a half egg pictures. Tuesday: 5 egg pictures. Wednesday: 2 and a half egg pictures. Thursday: 4 egg pictures.">${g}</svg>`;
})();

/* ---- Maths Q2: twelve squares (supplied by David) ---- */
const SQUARES_SVG = (() => {
  const c = 40, ox = 22, oy = 22;
  let g = "";
  for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++)
    g += `<rect x="${ox + k * c}" y="${oy + r * c}" width="${c}" height="${c}" fill="#dbe7f6" stroke="${INK}" stroke-width="1.4"/>`;
  g += `<rect x="${ox}" y="${oy}" width="${4 * c}" height="${3 * c}" fill="none" stroke="${INK}" stroke-width="2.6"/>`;
  const lab = (t, x, y) => `<text x="${x}" y="${y}" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">${t}</text>`;
  g += lab("A", ox - 11, oy - 6) + lab("B", ox + 4 * c + 11, oy - 6) + lab("C", ox + 4 * c + 11, oy + 3 * c + 17) + lab("D", ox - 11, oy + 3 * c + 17);
  const W = 2 * ox + 4 * c, H = 2 * oy + 3 * c;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Rectangle ABCD made of 12 equal squares in 3 rows and 4 columns. A is the top-left corner, B the top-right, C the bottom-right and D the bottom-left.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the story, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "After Gran leaves, Nell straightens the ice-block sticks into a perfect line, “Then she straightened them again.” This detail suggests that Nell",
        options: ["wanted the stall to look perfect when Gran came back.",
                  "had nothing else to do, because no customers had come yet.",
                  "took great pride in every job that Gran gave her to do.",
                  "was nervous about being left in charge on her own."],
        answer: 3,
        skill: "working out a feeling that is shown, not stated",
        explain: `<p>The sticks were already in a perfect line, so straightening them a second time does nothing useful. People fiddle with things like this when they are anxious and need something to do with their hands. Gran’s words just before, “Five minutes. You’ll be fine”, also hint that Nell is worried about being left alone, and later her voice comes out “smaller than she had planned”.</p>
                  <p class="why-not">A is the trap: Nell does make the stall neat, but it was already perfect after the first time, so the second straightening isn’t about how the stall looks. B uses a real detail (the man hasn’t arrived yet), but being bored doesn’t explain why she redoes a job that is already done. C has no support: her real jobs are wrapping pots and saying “Thank you, come again”, and the sticks aren’t one of them.</p>`
      },
      {
        stem: "Why does Nell ask the man whether he has been watering the plant every day?",
        options: ["She thinks the plant was already sick when Gran sold it to him.",
                  "She suspects the plant died from too much water, not too little.",
                  "She wants to keep him talking until Gran gets back from the bakery.",
                  "She needs to know how often to water the new plant she gives him."],
        answer: 1,
        skill: "inference: linking two clues to explain a character’s question",
        explain: `<p>Two clues come just before her question. The soil is “so wet that water oozed up”, and Nell remembers Gran’s saying that “succulents like to be forgotten”, which means they need very little water. Putting these together, Nell suspects the man has drowned the plant. His answer, “Every single morning”, proves her right.</p>
                  <p class="why-not">C is the trap: Nell does look for Gran, but the question comes straight after she feels the soaking soil and remembers Gran’s saying, so it is about the plant, not about passing time. A is the opposite of what she suspects: the wet soil points to the man’s watering, not to a sick plant. D mixes up the order: Nell already knows how often succulents need water (she writes ONCE A FORTNIGHT on the stick), and she asks before she has decided to give him a new plant.</p>`
      },
      {
        stem: "The words “Thank you, come again” appear near the start of the story and again in the very last line. What does the way they are used at the end suggest the whole story is mainly about?",
        options: ["Nell learning that customers are not always right, so she must speak up to them.",
                  "Nell being relieved that Gran never found out about the man and his dead plant.",
                  "Nell growing more confident after she sorts out a problem all by herself.",
                  "Nell learning to copy the polite way that Gran always speaks to customers."],
        answer: 2,
        skill: "main idea: what a change between the opening and the ending shows about the whole story",
        explain: `<p>The same words frame the story. At the start, saying “Thank you, come again” is just Nell’s job, and once Gran leaves she is anxious: she straightens the sticks twice, looks for Gran, and her voice comes out “smaller than she had planned”. In the middle she works out what killed the plant using Gran’s saying and finds a fair answer of her own. At the end she says the same words loudly, for everyone to hear. The change in <em>how</em> she says them shows the story is about Nell growing in confidence by solving a problem on her own.</p>
                  <p class="why-not">B is the trap: Nell does answer “Not really” when Gran asks, but nothing suggests she is hiding anything or relieved; she says it calmly, then speaks up loudly, which is confidence, not relief. A is too strong: Nell doesn’t argue with the man or tell him he is wrong; she helps him, and he goes off laughing. D uses a real detail (saying the words is the job Gran gave her), but the story never shows her copying Gran; what changes is how sure of herself she sounds, not her manners.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `At Wattle Park School, the only drinking taps are inside the main building, a long walk from the oval.
               <p class="quote"><em class="speaker">The principal:</em> “We should put a drinking fountain next to the oval, so that students drink more water during sport.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports the principal’s claim?</p>`,
        options: ["Most students say they would rather drink cold water than warm water on a hot day.",
                  "A fountain next to the oval would cost less to put in than a new one inside the hall.",
                  "Students drink far more often when water is close by than when they must walk to it.",
                  "Students who play a lot of sport are usually fitter than students who play very little."],
        answer: 2,
        skill: "choosing the statement that supports a claim (the missing link)",
        explain: `<p>The principal’s claim has a reason built into it: a fountain <em>next to the oval</em> will make students drink <em>more</em>. The statement that supports it must show that having water close by changes how much students drink. C does exactly that: students drink far more often when water is close, and at the moment the taps are a long walk away.</p>
                  <p class="why-not">B is the trap: it is a good reason to choose the oval over the hall if the school is buying a fountain anyway, but it is about cost and says nothing about whether students will drink more. A is about what kind of water students like, not about whether a nearby fountain makes them drink more. D is about sport and fitness in general and never mentions drinking at all.</p>`
      },
      {
        stem: `The sheet shows which lanes at the pool are already booked on Saturday morning. Each booking lasts 30 minutes.
               ${POOL_TABLE}
               <p style="margin:10px 0 0">A swimming club needs <b>two lanes next to each other</b> for <b>one whole hour</b>. What is the <b>earliest</b> time the club can start?</p>`,
        options: ["9:00 am", "8:00 am", "8:30 am", "9:30 am"],
        answer: 0,
        skill: "reading a booking sheet with two conditions at once",
        explain: `<p>One hour is two 30-minute slots in a row, so the club needs the <b>same two neighbouring lanes</b> free in one row <em>and</em> the row below it. Check each start time:</p>
                  <p>• 8:00: lanes 2 and 3 are free, but both are booked at 8:30 ✗<br>
                     • 8:30: only lanes 1 and 4 are free, and they aren’t next to each other ✗<br>
                     • 9:00: lanes 3 and 4 are free at 9:00 <em>and</em> at 9:30 ✓</p>
                  <p>So the earliest start is <b>9:00 am</b>.</p>
                  <p class="why-not">8:00 am (B) is the trap: lanes 2 and 3 are free and next to each other, but only for 30 minutes, not a whole hour. 8:30 am (C) finds two lanes free for the whole hour (lanes 1 and 4) but forgets they must be next to each other. 9:30 am (D) does work (lanes 2 and 3 are free at 9:30 and 10:00), but it isn’t the earliest.</p>`
      },
      {
        stem: `The map shows a camp, with north at the top.
               <div class="figure">${CAMP_SVG}</div>
               <p style="margin:10px 0 0">The campfire is on a grid point that is <b>directly south</b> of the Hut and <b>directly east</b> of the Lake.</p>
               <p style="margin:6px 0 0">In which direction must you walk from the <b>Flagpole</b> to go straight to the campfire?</p>`,
        options: ["north-east", "north-west", "south-east", "south-west"],
        answer: 1,
        skill: "compass directions: placing a point from two clues, then finding a direction",
        explain: `<p><b>Step 1: find the campfire.</b> Directly south of the Hut means straight down from the Hut, on the same up-and-down line. Directly east of the Lake means straight to the right of the Lake, on the same side-to-side line. The Hut is 4 squares across from the left edge and the Lake is 2 squares up from the bottom, so the two lines cross at the grid point <b>4 across and 2 up</b>.</p>
                  <p><b>Step 2: go from the Flagpole.</b> The Flagpole is in the bottom-right corner. To reach the campfire you go 2 squares up (north) and 2 squares left (west) at the same time, so you walk <b>north-west</b>.</p>
                  <p class="why-not">South-east (C) is the trap: it is the direction from the campfire <em>to</em> the Flagpole, which is the question turned round. North-east (A) mixes up east and west (the campfire is to the left of the Flagpole, which is west). South-west (D) gets west right but forgets the campfire is higher up the map than the Flagpole, so you must also go north.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `The picture graph shows how many eggs were collected from a farm’s hens each day.
               <div class="figure">${EGG_SVG}</div>
               <p style="margin:10px 0 0">How many more eggs were collected on Tuesday than on Wednesday?</p>`,
        options: ["3", "12", "15", "18", "30"],
        answer: 2,
        skill: "reading a picture graph with a key and half pictures",
        explain: `<p>Each whole egg stands for 6 eggs, so half an egg stands for 3.</p>
                  <p>Tuesday has 5 pictures: 5 × 6 = <b>30</b> eggs. Wednesday has 2½ pictures: 2 × 6 + 3 = <b>15</b> eggs.</p>
                  <p>30 − 15 = <b>15</b>.</p>
                  <p class="why-not">18 (D) is the trap: it ignores Wednesday’s half egg, so it uses 5 − 2 = 3 pictures. 12 (B) counts the half egg as a whole one (5 − 3 = 2 pictures). 3 (A) counts the difference in whole pictures and forgets that each picture stands for 6 eggs. 30 (E) is Tuesday’s total, not the difference.</p>`
      },
      {
        stem: `Twelve squares are arranged in three rows and four columns to form rectangle ABCD.
               <div class="figure">${SQUARES_SVG}</div>
               <p style="margin:10px 0 0">The perimeter of each square is 8 cm. What is the perimeter of rectangle ABCD?</p>`,
        options: ["112 cm", "96 cm", "80 cm", "48 cm", "28 cm"],
        answer: 4,
        skill: "perimeter: finding a side from a perimeter, then the perimeter of a larger shape",
        explain: `<p>A square has 4 equal sides, so each square has sides of 8 ÷ 4 = <b>2 cm</b>.</p>
                  <p>The rectangle is 4 squares long and 3 squares high: 4 × 2 = <b>8 cm</b> by 3 × 2 = <b>6 cm</b>.</p>
                  <p>Perimeter = 8 + 6 + 8 + 6 = <b>28 cm</b>.</p>
                  <p class="why-not">96 cm (B) is the trap: it adds up the perimeters of all 12 squares (12 × 8), but the inside edges are not part of the rectangle’s perimeter. 80 cm (C) adds the perimeters of the 10 squares around the edge, which still counts their inside edges. 112 cm (A) uses 8 cm as the <em>side</em> of each square instead of its perimeter. 48 cm (D) multiplies 8 × 6, which is the rectangle’s area in square centimetres, not its perimeter.</p>`
      },
      {
        stem: `Twelve counters numbered 1 to 12 are in a bag. Jo takes out counter <b>12</b> and keeps it. Sam then takes one counter from the bag without looking.
               <ol style="margin:8px 0 0;padding-left:22px">
                 <li>Sam is more likely to take an odd number than an even number.</li>
                 <li>Sam is just as likely to take a number greater than 8 as a number less than 4.</li>
                 <li>Sam is more likely to take an even number than a number less than 6.</li>
               </ol>
               <p style="margin:8px 0 0">Which of these statements is/are correct?</p>`,
        options: ["statements 1 and 2 only", "statement 1 only", "statement 2 only", "statement 3 only", "all of statements 1, 2 and 3"],
        answer: 0,
        skill: "chance: comparing how likely events are after something has changed",
        explain: `<p>Only the 11 counters numbered <b>1 to 11</b> are left in the bag, so count from those.</p>
                  <p><b>1:</b> odd numbers 1, 3, 5, 7, 9, 11 (6 of them); even numbers 2, 4, 6, 8, 10 (5). 6 is more than 5 ✓<br>
                     <b>2:</b> greater than 8: 9, 10, 11 (3). Less than 4: 1, 2, 3 (3). Equal ✓<br>
                     <b>3:</b> even: 5 (as above). Less than 6: 1, 2, 3, 4, 5 (5). Equal, so “more likely” is wrong ✗</p>
                  <p>Statements <b>1 and 2</b> only.</p>
                  <p class="why-not">D (statement 3 only) is the trap: it forgets that counter 12 has gone. With all 12 counters, odd and even would be equal (6 each), there would be 4 numbers greater than 8, and 6 even numbers against 5 less than 6. E counts 12 among the even numbers in statement 3 only. B treats “greater than 8” as including 8 (8, 9, 10, 11), which makes statement 2 look wrong. C assumes odd and even are always equally likely, without counting.</p>`
      }
    ]
  }
];
