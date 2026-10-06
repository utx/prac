/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 41
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `When a honeybee finds a rich patch of flowers, she flies home and passes on the news. On the upright wall of honeycomb, in the darkness of the hive, she performs the waggle dance. She runs forward in a short straight line, waggling her body from side to side, then loops round and runs the line again, tracing a figure of eight. The direction of the straight run, compared with straight up, shows the direction of the flowers compared with the sun. The longer each waggle run lasts, the further away the flowers are. Other bees crowd close, follow her movements and then fly off to find the flowers. The Austrian scientist Karl von Frisch spent years watching marked bees before he cracked this code, and in 1973 he shared a Nobel Prize for his discoveries.`,
  `<i>Saturday 14 December.</i> Thirty-two degrees by eleven o’clock. I opened the hives at midday, when most of the workers are out among the flowers and fewer are at home to object. Even so, the hum rose to an angry whine the moment the lid came off, and two bees found the gap between my glove and my sleeve. Under the veil the air was stifling, sweat ran into my eyes, and I could do nothing about it. Then I lifted out the last frame, heavy and sealed with pale wax, and forgot all of it. Twelve full frames. My wrist is swollen to twice its size tonight, and I would do it all again tomorrow.`,
  `Mia had only bent down to smell the lavender. Something hot jabbed the back of her hand, and she yelped and shook it so hard that her bracelet flew into the garden bed. “Hold still,” said Grandpa, and with one quick flick of his thumbnail he scraped away a tiny black splinter. On the path lay the bee, curled up and barely moving. “She won’t survive that,” Grandpa said quietly. “A honeybee’s sting has tiny hooks, so it stays stuck in your skin and tears away from her body. She thought you were going to squash her.” Mia looked at the bee for a long time. Her hand was still throbbing, but somehow she didn’t feel like crying any more.`,
  `Not every bee can sting. Australia is home to more than 1,500 kinds of native bee, and some of the smallest are the stingless bees of the group called <i>Tetragonula</i>. Each one is black and only about four millimetres long. They live in colonies of thousands, often in hollow trees, and store their honey in little pots made of wax mixed with plant resin. Aboriginal people have long gathered this honey, known as sugarbag. A hive gives only about a kilogram of honey a year, so it is precious. These bees are far from helpless, though. If a beetle invades the nest, the guards bite it and smear it with sticky resin until it is stuck fast. On cool mornings the whole colony stays at home until the day warms up.`
];
const PASSAGE = {
  title: "Busy Bees",
  note: "Read the four extracts below about bees.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q2: cinema timetable ---- */
const FILMS = [["Penguin Parade", "1:30 pm, 2:50 pm", "2 h 10 min"], ["Robo Pals", "2:30 pm, 4:00 pm", "1 h 35 min"],
               ["Ocean Quest", "3:00 pm", "2 h 15 min"], ["The Runaway Kite", "3:30 pm", "1 h 40 min"]];
const FILM_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th>film</th><th>starts at</th><th>running time</th></tr>
  ${FILMS.map(r => `<tr>${r.map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}
</table></div>`;

/* ---- Thinking Skills Q3: transparent cards ---- */
const cardSvg = (cells, label, size = 24) => {
  const o = 5, n = 4;
  let g = `<rect x="${o - 3}" y="${o - 3}" width="${n * size + 6}" height="${n * size + 6}" rx="5" fill="#eef6fc" stroke="#7aa6cf" stroke-width="1.5"/>`;
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const on = cells.some(([R, C]) => R === r && C === c);
    g += `<rect x="${o + c * size}" y="${o + r * size}" width="${size}" height="${size}" fill="${on ? "#2f5e95" : "none"}" stroke="#9fb6cf" stroke-width="1"/>`;
  }
  const W = n * size + 2 * o;
  return `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" role="img" aria-label="${label}">${g}</svg>`;
};
const gridText = cells => [0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => cells.some(([R, C]) => R === r && C === c) ? "#" : ".").join("")).join(" / ");
const CARD1 = [[0, 0], [1, 0], [1, 2], [3, 3]];
const CARD2 = [[0, 1], [0, 3], [2, 3], [3, 1]];
const CARDS_SVG = `<div style="display:flex;flex-wrap:wrap;gap:12px 34px;align-items:flex-start">
  ${[["Card 1", CARD1], ["Card 2", CARD2]].map(([name, cells]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><b>${name}</b>${cardSvg(cells, `${name}: a clear 4 by 4 card. Shaded squares, row by row from the top (# shaded, . clear): ${gridText(cells)}.`, 30)}</div>`).join("")}
</div>`;
const CARD_OPTS = [
  [[0, 0], [0, 1], [0, 3], [1, 0], [1, 2], [2, 3], [3, 1], [3, 3]],   // card 2 not turned over
  [[0, 0], [0, 1], [1, 0], [1, 2], [1, 3], [3, 1], [3, 3]],           // card 2 turned upside down
  [[0, 1], [0, 3], [1, 1], [1, 3], [2, 3], [3, 0], [3, 1]],           // card 1 turned over instead
  [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [3, 2], [3, 3]]            // correct
].map((cells, i) => cardSvg(cells, `Picture ${"ABCD"[i]}: shaded squares row by row from the top: ${gridText(cells)}.`));

/* ---- Maths Q3: house-shaped solid ---- */
const HOUSE_SVG = (() => {
  const s = 96, h = 50, dx = 64, dy = 40, ox = 12, oy = 12 + h + dy + s;
  const P = (x, y, z) => [ox + x + y * dx / s, oy - z - y * dy / s];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => P(...p).join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  let g = "";
  g += poly([[0, 0, s], [s / 2, 0, s + h], [s / 2, s, s + h], [0, s, s]], "#c9d9ec");                 // left roof slope
  g += poly([[0, 0, 0], [s, 0, 0], [s, 0, s], [s / 2, 0, s + h], [0, 0, s]], "#f3e3c7");             // front pentagon
  g += poly([[s, 0, 0], [s, s, 0], [s, s, s], [s, 0, s]], "#e2c99c");                                // right wall
  g += poly([[s / 2, 0, s + h], [s, 0, s], [s, s, s], [s / 2, s, s + h]], "#9fbbe0");                 // right roof slope
  const W = ox + s + dx + 12, H = oy + 10;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A solid shaped like a house: a triangular prism sits on top of a cube, like a roof. The front is a single flat pentagon-shaped face, made of a square with a triangle on top. Hidden edges at the back and underneath are not shown.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about bees. For each question, choose the extract (A, B, C or D) which best answers it.",
    questions: [
      {
        stem: "In which extract does someone show that a hard and unpleasant job is worth it to them?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 1,
        skill: "inferring a writer’s attitude from what they say and do",
        explain: `<p>In Extract B, the beekeeper describes heat, angry bees, two stings, a stifling veil and sweat in the eyes. But lifting out the last heavy frame of honey makes them forget “all of it”, and they finish: “I would do it all again tomorrow.” The reward outweighs the discomfort.</p>
                  <p class="why-not">Extract A is the trap: von Frisch worked for years and was rewarded with a Nobel Prize, but the extract never says the work was unpleasant. Extract C has pain (Mia is stung), but Mia isn’t doing a job, and she never says it was worth it. Extract D describes bees, not a person’s feelings.</p>`
      },
      {
        stem: "Which extract suggests that a creature without one kind of weapon can still protect its home?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 3,
        skill: "recognising an idea expressed in different words",
        explain: `<p>Extract D begins “Not every bee can sting”: <i>Tetragonula</i> bees have no working sting. But they are “far from helpless”. When a beetle invades the nest, the guards bite it and glue it in place with sticky resin. They lack one weapon (a sting) but still defend their home.</p>
                  <p class="why-not">Extract C is the trap: the bee defends herself, but she uses her sting, so she <em>has</em> that weapon, and she is in a garden, not at home. Extract B shows bees defending their hive, but again with stings. Extract A is about sharing news of food, not defence.</p>`
      },
      {
        stem: "Which extract suggests that a message about the very same place would have to be given differently in the morning and in the afternoon?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 0,
        skill: "drawing an inference by combining a detail with general knowledge",
        explain: `<p>In Extract A, the waggle dance shows the direction of the flowers <b>compared with the sun</b>. But the sun doesn’t stay still: it moves across the sky during the day. So to point other bees to the same patch of flowers, a bee would have to dance in a different direction in the afternoon from the morning. The extract never says this; you have to work it out.</p>
                  <p class="why-not">Extract D is the trap: it mentions mornings, but it describes the bees changing what they <em>do</em> (staying home until it warms up), not a message changing. Extract B mentions a time of day (midday) and an angry hum, but the hum is about the beekeeper opening the hive, not about a place. Extract C has no message about a place.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `The school canteen is thinking about selling sushi. Priya asked her four best friends whether they would buy it, and all four said yes.
               <p class="quote"><em class="speaker">Priya:</em> “Nearly everyone at our school would buy sushi from the canteen.”</p>
               <p style="margin:10px 0 0">Which one of the following sentences shows the mistake Priya has made?</p>`,
        options: ["Sushi may cost the canteen more to make than the sandwiches it already sells.",
                  "Some students at the school may like salmon sushi better than tuna sushi.",
                  "Priya’s four friends may not like the same foods as most other students.",
                  "Priya’s friends may buy sushi every single time the canteen has it."],
        answer: 2,
        skill: "spotting a mistake: judging from your own small group",
        explain: `<p>Priya has asked only four people, and they are her best friends, who may well share her tastes. She then claims that “nearly everyone” at the school would buy sushi. Her small group may not be like the rest of the school. C shows the mistake.</p>
                  <p class="why-not">D is the trap: it is about Priya’s friends and sushi, but it actually <em>supports</em> what they told her rather than showing a gap in her reasoning. A is about cost, which has nothing to do with whether students would buy it. B is about which sushi students prefer, which doesn’t affect whether they would buy sushi at all.</p>`
      },
      {
        stem: `Sam’s swimming lesson finishes at 2:15 pm. It takes 20 minutes to get from the pool to the cinema. Sam must be home by 5:30 pm, and the trip home from the cinema takes 25 minutes.
               ${FILM_TABLE}
               <p style="margin:10px 0 0">Which film can Sam see from start to finish?</p>`,
        options: ["Penguin Parade", "Robo Pals", "Ocean Quest", "The Runaway Kite"],
        answer: 0,
        skill: "using a timetable with conditions at both ends",
        explain: `<p>Sam can reach the cinema at 2:15 + 20 minutes = <b>2:35 pm</b>. To be home by 5:30, Sam must leave the cinema by 5:30 − 25 minutes = <b>5:05 pm</b>. So the film must start at 2:35 or later and finish by 5:05.</p>
                  <p>• Penguin Parade at 2:50 finishes at 2:50 + 2 h 10 min = <b>5:00 pm</b> ✓<br>
                     • Robo Pals at 2:30 starts before Sam arrives, and at 4:00 it finishes at 5:35 ✗<br>
                     • Ocean Quest finishes at 5:15 ✗<br>
                     • The Runaway Kite finishes at 5:10 ✗</p>
                  <p class="why-not">The Runaway Kite (D) is the trap: it finishes at 5:10, which looks fine for a 5:30 deadline, but with the 25-minute trip home Sam would arrive at 5:35. Ocean Quest (C) also forgets the trip home. Robo Pals (B) forgets the 20 minutes to get from the pool: the 2:30 session starts before Sam can get there.</p>`
      },
      {
        stem: `Card 1 and Card 2 are made of clear plastic with some squares shaded.
               <div class="figure">${CARDS_SVG}</div>
               <p style="margin:10px 0 0">Card 2 is turned over from left to right, like turning the page of a book. Then it is laid exactly on top of Card 1.</p>
               <p style="margin:6px 0 0">Which picture shows what you would see?</p>`,
        visualOptions: true,
        options: CARD_OPTS,
        answer: 3,
        skill: "picturing a reflection, then combining two patterns",
        explain: `<p><b>Step 1: turn Card 2 over.</b> Turning a card over from left to right is like looking at it in a mirror: each shaded square swaps sides, so a square in the first column moves to the last column, and one in the second column moves to the third. The rows stay the same. Turned over, Card 2 has shaded squares in these places:<br>
                     top row: 1st and 3rd squares; third row: 1st square; bottom row: 3rd square.</p>
                  <p><b>Step 2: lay it on Card 1.</b> Every square that is shaded on either card shows. The turned-over Card 2 adds the top-left square (already shaded on Card 1), the third square in the top row, the first square in the third row, and the third square in the bottom row. That is <b>D</b>.</p>
                  <p class="why-not">A is the trap: it lays Card 2 on top without turning it over. C turns Card 1 over instead of Card 2, which gives the mirror image of the right answer. B turns Card 2 upside down (top to bottom) instead of left to right.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: "Which of these is the <b>greatest</b> number?",
        options: ["4 thousands, 18 hundreds and 9 tens", "58 hundreds and 95 ones", "5 thousands and 893 ones", "5 thousands, 7 hundreds and 196 ones", "579 tens and 107 ones"],
        answer: 4,
        skill: "place value: renaming numbers in different units",
        explain: `<p>Write each one as an ordinary number:</p>
                  <p>A: 4000 + 1800 + 90 = 5890<br>
                     B: 5800 + 95 = 5895<br>
                     C: 5000 + 893 = 5893<br>
                     D: 5000 + 700 + 196 = 5896<br>
                     E: 5790 + 107 = <b>5897</b></p>
                  <p>The greatest is <b>E</b>, only 1 more than D.</p>
                  <p class="why-not">D is the trap: at 5896 it is only 1 less than E, so if you skip working out E properly (or misread “579 tens” as just 579), D looks greatest. E looks small because it starts with “579”, but 579 tens is 5790, and the 107 ones carry it past all the others. A looks smallest because of the “4 thousands”, but 18 hundreds is 1800, so it is 5890. B and C are 5895 and 5893.</p>`
      },
      {
        stem: `A café’s lunch deal is one main and one drink.
               <ul class="facts">
                 <li>mains: pie, wrap, sushi</li>
                 <li>drinks: water, juice, milk, smoothie, lemonade</li>
               </ul>
               <p style="margin:10px 0 0">The sushi can only be ordered with water. How many different lunch deals are possible?</p>`,
        options: ["8", "11", "14", "15", "16"],
        answer: 1,
        skill: "counting combinations with a restriction",
        explain: `<p>Count the deals for each main:</p>
                  <p>• pie: any of the 5 drinks, so 5 deals<br>
                     • wrap: 5 deals<br>
                     • sushi: only water, so 1 deal</p>
                  <p>Total: 5 + 5 + 1 = <b>11</b>.</p>
                  <p class="why-not">15 (D) is the trap: 3 mains × 5 drinks ignores the rule about sushi. 14 (C) reads the rule backwards, as if sushi could have any drink <em>except</em> water (5 + 5 + 4). 16 (E) adds the sushi-and-water deal on top of the 15, but it was already counted. 8 (A) adds 3 + 5 instead of matching every main with every drink.</p>`
      },
      {
        stem: `Pip glues a triangular prism on top of a cube to make this solid. The front of the solid is <b>one</b> flat face shaped like a pentagon, and so is the back.
               <div class="figure">${HOUSE_SVG}</div>
               <p style="margin:10px 0 0">How many edges does the solid have altogether? (Count the hidden ones too.)</p>`,
        options: ["12", "13", "15", "17", "21"],
        answer: 2,
        skill: "counting the edges of a solid made by joining two solids",
        explain: `<p>Count the edges in groups:</p>
                  <p>• around the bottom: <b>4</b><br>
                     • the upright edges of the walls: <b>4</b><br>
                     • along the tops of the two side walls, where the roof starts: <b>2</b><br>
                     • the sloping edges of the roof, two at the front and two at the back: <b>4</b><br>
                     • the ridge along the top: <b>1</b></p>
                  <p>4 + 4 + 2 + 4 + 1 = <b>15</b>. (Check: the solid has 7 faces and 10 corners, and 10 + 7 − 15 = 2, as it should be for any solid like this.)</p>
                  <p class="why-not">17 (D) is the trap: it counts the line between the square and the triangle at the front and at the back. But the front is one flat face, so there is no edge there; the same goes for the back. 21 (E) just adds the cube’s 12 edges and the prism’s 9. 13 (B) takes the 4 shared edges away from both shapes, so they disappear completely. 12 (A) counts only the cube.</p>`
      }
    ]
  }
];
