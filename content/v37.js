/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 37
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: poem ---- */
const STANZAS = [
  ["For months the sky was a lid of tin,", "the dam a cracked brown plate;", "the paddocks lay like an old dog’s coat,", "and the cattle stood by the gate."],
  ["Dad read the clouds the way some men", "read the paper, every day,", "and every day he folded them up", "and put them all away."],
  ["Then late one night the tin roof spoke:", "a tap, a tap, a drum,", "and the dry gums lifted their thirsty arms", "as if they’d heard it come."],
  ["Dad didn’t call or cheer or shout.", "He walked out to the yard", "and stood bareheaded in the dark", "while it rained, and rained down hard."],
  ["Mum held the door. She didn’t say", "he’d catch his death of cold.", "I watched him from the kitchen step;", "he looked a little less old."],
  ["Next morning, frogs were arguing", "in the ditch beside the shed,", "and the dam held a piece of the sky again,", "like the old days, Dad said."]
];
const PASSAGE = {
  title: "The Night the Rain Came Back",
  note: "Read the poem below, then answer the questions. The numbers show the verses.",
  html: `<div class="poem">${STANZAS.map((s, i) => `<div class="stanza"><span class="vn">${i + 1}</span>${s.map(l => `<span class="line">${l}</span>`).join("")}</div>`).join("")}</div>`
};

/* ---- Thinking Skills Q2: bus timetable ---- */
const BUS_TABLE = (() => {
  const rows = [["Hillside", "7:50", "8:10", "8:30", "8:50"],
                ["Park Street", "7:58", "—", "8:38", "8:58"],
                ["Library", "8:09", "8:27", "8:49", "9:09"],
                ["Town Centre", "8:20", "8:38", "9:00", "9:20"]];
  return `<div class="table-wrap"><table class="grid">
    <tr><th>stop</th><th>bus 1</th><th>bus 2</th><th>bus 3</th><th>bus 4</th></tr>
    ${rows.map(r => `<tr>${r.map((c, i) => i ? `<td style="text-align:center">${c}</td>` : `<td>${c}</td>`).join("")}</tr>`).join("")}
  </table></div>`;
})();

/* ---- Thinking Skills Q3: cube building ---- */
// heights[row][col]; row 0 = front, row 1 = back; col 0 = left (seen from the front)
const HEIGHTS = [[1, 2, 1], [3, 1, 2]];
const BUILDING_SVG = (() => {
  const s = 34, d = s * 0.5, ox = 30, base = 150;
  const P = (x, y, z) => [ox + x * s + y * d, base - z * s - y * d];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  const cube = (x, y, z) =>
    poly([P(x, y, z), P(x + 1, y, z), P(x + 1, y, z + 1), P(x, y, z + 1)], "#9fc3e6") +          // front
    poly([P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], "#6f9fcf") + // right
    poly([P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], "#d6e6f5");  // top
  let g = "";
  for (let y = 1; y >= 0; y--) for (let x = 0; x < 3; x++) for (let z = 0; z < HEIGHTS[y][x]; z++) g += cube(x, y, z);
  const [ax, ay] = P(1.5, 0, 0);
  g += `<line x1="${ax}" y1="${ay + 44}" x2="${ax}" y2="${ay + 12}" stroke="#c0392b" stroke-width="2.5"/>
        <path d="M${ax - 7} ${ay + 20} L${ax} ${ay + 8} L${ax + 7} ${ay + 20} Z" fill="#c0392b"/>
        <text x="${ax}" y="${ay + 60}" font-size="13" text-anchor="middle" fill="${INK}">front</text>`;
  return `<svg viewBox="0 0 190 220" width="190" height="220" role="img" aria-label="A building made of cubes standing on two rows of three stacks. The arrow points at the front.">${g}</svg>`;
})();
const PLAN_SVG = (() => {
  const c = 40, ox = 20, oy = 26;
  let g = `<text x="${ox + 1.5 * c}" y="16" font-size="12" text-anchor="middle" fill="#55607a">back</text>`;
  [1, 0].forEach((row, r) => HEIGHTS[row].forEach((h, k) => {
    g += `<rect x="${ox + k * c}" y="${oy + r * c}" width="${c}" height="${c}" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
          <text x="${ox + k * c + c / 2}" y="${oy + r * c + c / 2 + 7}" font-size="20" font-weight="700" text-anchor="middle" fill="${INK}">${h}</text>`;
  }));
  g += `<text x="${ox + 1.5 * c}" y="${oy + 2 * c + 18}" font-size="12" text-anchor="middle" fill="#55607a">front</text>`;
  return `<svg viewBox="0 0 160 ${oy + 2 * c + 26}" width="160" height="${oy + 2 * c + 26}" role="img" aria-label="Plan from above with the number of cubes in each stack. Back row, left to right: 3, 1, 2. Front row, left to right: 1, 2, 1.">${g}</svg>`;
})();
const frontView = cols => {
  const s = 24, W = cols.length * s + 20, H = 3 * s + 16;
  let g = `<line x1="4" y1="${H - 6}" x2="${W - 4}" y2="${H - 6}" stroke="${INK}" stroke-width="1.5"/>`;
  cols.forEach((h, k) => { for (let z = 0; z < h; z++) g += `<rect x="${10 + k * s}" y="${H - 6 - (z + 1) * s}" width="${s}" height="${s}" fill="#9fc3e6" stroke="${INK}" stroke-width="1.4"/>`; });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Stacks of squares with heights ${cols.join(", ")} from left to right.">${g}</svg>`;
};

/* ---- Maths Q2: square and rectangle ---- */
const SHAPES_SVG = `<svg viewBox="0 0 330 130" width="330" height="130" role="img" aria-label="A square labelled area 36 square centimetres, and a rectangle with its length labelled 8 centimetres. Not to scale.">
  <rect x="14" y="14" width="96" height="96" fill="#e7eef8" stroke="${INK}" stroke-width="2"/>
  <text x="62" y="58" font-size="13" text-anchor="middle" fill="${INK}">area</text>
  <text x="62" y="76" font-size="13" text-anchor="middle" fill="${INK}">36 cm²</text>
  <rect x="150" y="40" width="166" height="60" fill="#fdf3e1" stroke="${INK}" stroke-width="2"/>
  <text x="233" y="32" font-size="13" text-anchor="middle" fill="${INK}">8 cm</text>
  <text x="165" y="124" font-size="11" fill="#55607a">[not to scale]</text>
</svg>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the poem, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "In verse 2, Dad reads the clouds “the way some men / read the paper”, and every day he “folded them up / and put them all away”. What does this suggest about Dad?",
        options: ["He could tell what the weather would do better than anyone else.",
                  "He watched for rain each day but kept his worries quiet.",
                  "He had given up hope that the drought would ever end.",
                  "He was more interested in the news than in the weather."],
        answer: 1,
        skill: "interpreting a comparison to infer a character’s feelings",
        explain: `<p>People read the paper as a daily habit, so Dad checked the sky for rain <em>every</em> day. When no rain came, he “folded” the clouds up and “put them all away”, the way you put down a paper you’ve finished with. He didn’t talk about his disappointment; he just put it aside until the next day. Verse 4 shows how much he had been holding in.</p>
                  <p class="why-not">C is the trap: “put them all away” can sound like giving up, but someone who had given up would not keep reading the clouds “every day”. A takes “read the clouds” too far: the poem never says he was good at forecasting, only that he kept looking. D reads “the paper” literally, but the newspaper is only a comparison.</p>`
      },
      {
        stem: "In verse 5, why does Mum not say that Dad will “catch his death of cold”?",
        options: ["She was too surprised by the sudden storm to say anything.",
                  "She was cross with him for going out without his hat.",
                  "She wanted him to come back inside before the storm got worse.",
                  "She understood how much the rain meant to him."],
        answer: 3,
        skill: "inferring feelings that are shown rather than stated",
        explain: `<p>“You’ll catch your death of cold” is what people say to someone standing out in the rain. Mum has every reason to say it, but she doesn’t. She just holds the door and lets him stay out. After months of drought, she knows this rain is a huge relief to Dad, and she doesn’t want to spoil the moment.</p>
                  <p class="why-not">C is the trap: holding the door open <em>could</em> be a way of waiting for him, but if she wanted him inside she would have called him, which is exactly what she chooses not to do. B uses a real detail (“bareheaded”), but nothing shows Mum is cross. A doesn’t fit: Mum calmly holds the door, and the poem presents her silence as a choice (“She didn’t say”), not as being lost for words.</p>`
      },
      {
        stem: "In verse 6, the dam “held a piece of the sky again”. This suggests that",
        options: ["the dam had filled with water and reflected the sky.",
                  "grey clouds still hung low over the dam that morning.",
                  "the dam was as dull and grey as the drought sky had been.",
                  "rain was still falling from the sky into the dam."],
        answer: 0,
        skill: "interpreting an image and linking the end of a poem to its beginning",
        explain: `<p>Still water reflects what is above it, so a full dam shows a “piece of the sky” on its surface. The word “again” and Dad’s comment “like the old days” tell us this is how the dam used to look before the drought. In verse 1 the dam was “a cracked brown plate”, with no water at all. The ending answers the beginning.</p>
                  <p class="why-not">C is the trap: it links back to the “lid of tin” sky in verse 1, but the poem is showing a <em>change</em>, not more of the same. B and D take “sky” literally, but nothing in verse 6 mentions clouds or rain still falling; the morning is full of frogs, not storms.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Mr Hale:</em> “If you want to become a better speller, you should read a book you enjoy for twenty minutes every night.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Mr Hale’s claim?</p>`,
        options: ["Reading for fun helps children to relax before they go to sleep.",
                  "Many children who are good at spelling also enjoy reading.",
                  "Seeing a word again and again in books helps you remember its spelling.",
                  "The school library now lends out more books each week than it did last year."],
        answer: 2,
        skill: "choosing the statement that supports a claim",
        explain: `<p>Mr Hale says reading every night will make you a better speller. To support that, we need a reason why reading would <em>improve spelling</em>. C gives one: reading every night means seeing the same words again and again, and that helps you remember how they are spelt. It explains <em>how</em> reading leads to better spelling.</p>
                  <p class="why-not">B is the trap: it links spelling and reading, but it doesn’t show that reading <em>causes</em> better spelling. Maybe good spellers just find reading easier, so they enjoy it more. A is a true benefit of reading, but it is about sleep, not spelling. D is about how popular the library is.</p>`
      },
      {
        stem: `The timetable shows the morning buses on one route. A dash (—) means that bus does <b>not</b> stop there.
               ${BUS_TABLE}
               <ul class="facts">
                 <li>Priya always catches the bus at Park Street. It takes her <b>7 minutes</b> to walk from home to the Park Street stop.</li>
                 <li>Her book club at the library starts at <b>8:52</b>.</li>
                 <li>It takes her <b>5 minutes</b> to walk from the Library stop to the book club room.</li>
               </ul>
               <p style="margin:10px 0 0">What is the <b>latest</b> time Priya can leave home and still be on time for book club?</p>`,
        options: ["7:46", "7:51", "7:58", "8:31"],
        answer: 1,
        skill: "using a timetable with several conditions",
        explain: `<p>Work backwards from 8:52. Priya needs 5 minutes to walk from the Library stop, so her bus must reach the Library stop by <b>8:47</b>.</p>
                  <p>• Bus 3 reaches the Library at 8:49, too late ✗<br>
                     • Bus 2 reaches it at 8:27, but it doesn’t stop at Park Street ✗<br>
                     • Bus 1 leaves Park Street at <b>7:58</b> and reaches the Library at 8:09 ✓</p>
                  <p>She needs 7 minutes to walk to the stop: 7:58 − 7 minutes = <b>7:51</b>.</p>
                  <p class="why-not">8:31 (D) is the trap: it uses bus 3 because 8:49 is before 8:52, forgetting the 5-minute walk at the library. 7:58 (C) is when bus 1 leaves Park Street, so it forgets her walk to the stop. 7:46 (A) takes both walks away from 7:58, but the library walk happens after the bus, not before.</p>`
      },
      {
        stem: `A building is made from identical cubes. The plan shows how many cubes are in each stack.
               <div class="figure" style="display:flex;gap:28px;flex-wrap:wrap;align-items:flex-end">${BUILDING_SVG}${PLAN_SVG}</div>
               <p style="margin:10px 0 0">Which of these shows the building when you look at it from the <b>front</b>?</p>`,
        visualOptions: true,
        options: [frontView([2, 2, 3]), frontView([1, 2, 1]), frontView([3, 1, 2]), frontView([3, 2, 2])],
        answer: 3,
        skill: "working out the view of a 3D object from one side",
        explain: `<p>From the front, each column you see is as tall as the <b>tallest</b> stack in it, whether that stack is in the front row or the back row.</p>
                  <p>• Left: front 1, back 3, so you see <b>3</b>.<br>
                     • Middle: front 2, back 1, so you see <b>2</b>.<br>
                     • Right: front 1, back 2, so you see <b>2</b>.</p>
                  <p>That is 3, 2, 2 from left to right: <b>D</b>.</p>
                  <p class="why-not">C is the trap: it shows only the back row (3, 1, 2), but in the middle the front stack of 2 is taller than the back stack of 1, so you see 2 cubes there. B shows only the front row. A is the view from the <em>back</em>, where left and right swap.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Liam has a roll of tape that is <b>3 metres</b> long. He cuts off 4 pieces, each <b>45 cm</b> long.
               <p style="margin:10px 0 0">How much tape is left on the roll?</p>`,
        options: ["1 m 20 cm", "1 m 40 cm", "1 m 80 cm", "2 m 55 cm", "2 m 82 cm"],
        answer: 0,
        skill: "measurement: converting metres and centimetres",
        explain: `<p>3 m = <b>300 cm</b>.</p>
                  <p>4 pieces × 45 cm = <b>180 cm</b>.</p>
                  <p>300 − 180 = 120 cm = <b>1 m 20 cm</b>.</p>
                  <p class="why-not">1 m 80 cm (C) is the trap: that is the tape Liam cut <em>off</em>, not what is left. 2 m 55 cm (D) takes away only one piece. 1 m 40 cm (B) comes from 4 × 45 = 160 (forgetting to carry). 2 m 82 cm (E) treats 45 cm as 45 mm, so the four pieces make only 18 cm.</p>`
      },
      {
        stem: `A square and a rectangle have the <b>same perimeter</b>. The square has an area of 36 cm². The rectangle is 8 cm long.
               <div class="figure">${SHAPES_SVG}</div>
               <p style="margin:10px 0 0">What is the area of the rectangle?</p>`,
        options: ["24 cm²", "32 cm²", "36 cm²", "48 cm²", "64 cm²"],
        answer: 1,
        skill: "using area and perimeter together",
        explain: `<p>The square’s area is 36 cm², so each side is <b>6 cm</b> (6 × 6 = 36).</p>
                  <p>Its perimeter is 4 × 6 = <b>24 cm</b>, so the rectangle’s perimeter is also 24 cm.</p>
                  <p>Length + width is half the perimeter: 24 ÷ 2 = 12 cm. So the width is 12 − 8 = <b>4 cm</b>.</p>
                  <p>Area of the rectangle = 8 × 4 = <b>32 cm²</b>.</p>
                  <p class="why-not">36 cm² (C) is the trap: it assumes the same perimeter means the same area, which isn’t true. 64 cm² (E) takes 8 away from 24 only once (24 − 8 = 16, then 16 ÷ 2 = 8 for the width), forgetting there are two long sides. 48 cm² (D) uses the square’s side, 6 cm, as the width. 24 cm² (A) is the perimeter, not the area.</p>`
      },
      {
        stem: `A garden pond holds <b>150 litres</b> when it is full. It starts empty.
               <ul class="facts">
                 <li>At 3:00 pm, Hose A is turned on. It pours in <b>6 litres</b> every minute.</li>
                 <li>At 3:05 pm, Hose B is also turned on. It pours in <b>4 litres</b> every minute.</li>
                 <li>Both hoses then keep running until the pond is full.</li>
               </ul>
               <p style="margin:10px 0 0">At what time is the pond full?</p>`,
        options: ["3:12 pm", "3:15 pm", "3:17 pm", "3:20 pm", "3:25 pm"],
        answer: 2,
        skill: "rates: working in stages",
        explain: `<p><b>3:00 to 3:05:</b> only Hose A is on. 5 minutes × 6 litres = <b>30 litres</b>.</p>
                  <p>Still needed: 150 − 30 = <b>120 litres</b>.</p>
                  <p><b>From 3:05:</b> both hoses together pour 6 + 4 = <b>10 litres</b> a minute. 120 ÷ 10 = <b>12 minutes</b>.</p>
                  <p>3:05 pm + 12 minutes = <b>3:17 pm</b>.</p>
                  <p class="why-not">3:15 pm (B) is the trap: it treats both hoses as running from 3:00 (150 ÷ 10 = 15 minutes). 3:20 pm (D) adds the 5 minutes on top of those 15 minutes, forgetting that Hose A was already filling the pond. 3:12 pm (A) works out the 12 minutes but adds them to 3:00 instead of 3:05. 3:25 pm (E) is how long Hose A would take on its own (150 ÷ 6 = 25 minutes).</p>`
      }
    ]
  }
];
