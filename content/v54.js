/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 54
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `Dad had been promising us the view for weeks. “From the top of Kosciuszko,” he kept saying, “you can see half of New South Wales.” We rode the chairlift up from Thredbo, then walked the long metal path across the tops, my little sister Jess counting her steps out loud until she lost track somewhere past nine hundred. It was early summer, but patches of snow still lay beside the track, and we stopped to pelt each other with it. Then the cloud came down. By the time we reached the summit, we could barely see the marker at the very top, let alone half of New South Wales. Dad stood there, peering hopefully into the whiteness. Jess pulled her beanie down over her ears and announced that it was the best view she had ever seen. Then all four of us started laughing, and somehow we couldn’t stop.`,
  `At 2228 metres, Mount Kosciuszko is the highest mountain on mainland Australia. It was named in 1840 by the Polish explorer Paul Strzelecki, after Tadeusz Kościuszko, a Polish hero who had fought for freedom. Compared with the world’s great peaks, it is gentle: the usual routes to the top have no cliffs to scale, and every summer thousands of people of all ages walk there. In winter, though, it is a different place. Snow covers the range, blizzards can blow in quickly, and walkers need proper equipment and experience. The summit area is also home to rare alpine plants, some of them found nowhere else in the world. To protect them from thousands of boots, much of the track from the top of the Thredbo chairlift is a raised metal walkway.`,
  `Two hundred metres below the summit, Mira stopped. The wind had changed. Cloud was pouring over the ridge like milk spilling from a jug, and the rocks ahead were already disappearing into it. Somewhere up there, so close now, was the top she had dreamed about for three years. Behind her, Uncle Sam said nothing. He didn’t need to. They had agreed on the rule that morning: if the weather turns, we turn. Mira looked up at the ridge for a long moment. Then she tightened the straps of her pack, swung round and started down without a word. Only once, at the bottom of the steep section, did she let herself look back. “Next year,” she said quietly, to nobody in particular, and kept walking.`,
  `Some people want to build a chairlift to the top of Mount Tarrin, so that “everyone can enjoy the view”. I understand why. The track is steep, and on a hot day the climb takes most people two hours. But I have watched people reach that summit. They flop down on the rocks, red-faced and puffing, and then they look out over the valley and grin as if they own every tree in it. A chairlift would be like handing someone the last page of a mystery novel: they would find out how it ends, but they would miss the story that makes the ending worth reaching. Let’s spend the money on a better track instead, with handrails on the steep parts and benches along the way, so that more people can make the climb themselves.`
];
const PASSAGE = {
  title: "Reaching the Top",
  note: "Read the four extracts below about mountains.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q3: a hexagon cut along two dashed lines ---- */
const HEX_SVG = (() => {
  const R = 92, cx = 120, cy = 108;
  const V = [...Array(6)].map((_, k) => {
    const a = -Math.PI / 2 + k * Math.PI / 3;   // V0 at the top, then clockwise
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const f = p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
  const M34 = mid(V[3], V[4]), M50 = mid(V[5], V[0]);
  let g = `<polygon points="${V.map(f).join(" ")}" fill="#d9ecf7" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  const dash = (p, q) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="#c0392b" stroke-width="2.6" stroke-dasharray="9 6"/>`;
  g += dash(V[0], V[2]) + dash(M34, M50);
  // small ticks showing the midpoints of the two sides
  const tick = (p, q) => {
    const m = mid(p, q), dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy), nx = -dy / L * 7, ny = dx / L * 7;
    const t = (a, b) => `<line x1="${(a[0] - nx / 2).toFixed(1)}" y1="${(a[1] - ny / 2).toFixed(1)}" x2="${(a[0] + nx / 2).toFixed(1)}" y2="${(a[1] + ny / 2).toFixed(1)}" stroke="${INK}" stroke-width="2"/>`;
    return t(mid(p, m)) + t(mid(m, q));
  };
  g += tick(V[3], V[4]) + tick(V[5], V[0]);
  const W = 240, H = 216;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A regular hexagon with a corner at the top. Two dashed cutting lines are drawn. The first joins the top corner to the lower-right corner, cutting off the upper-right corner. The second joins the middle of the lower-left side to the middle of the upper-left side, cutting off the left-hand corner. Small marks show that each of these two sides is cut exactly in half. The two dashed lines do not touch each other.">${g}</svg>`;
})();

/* ---- Maths Q1: kitchen scale with unlabelled marks ---- */
const SCALE_SVG = (() => {
  const x0 = 30, step = 20, W = x0 * 2 + 15 * step, y = 58;
  let g = "";
  for (let k = 0; k <= 15; k += 5) g += `<text x="${x0 + k * step}" y="${y - 30}" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">${k / 5 * 200}</text>`;
  g += `<rect x="${x0 - 14}" y="${y - 22}" width="${15 * step + 28}" height="40" rx="6" fill="#f7f2e6" stroke="${INK}" stroke-width="1.6"/>`;
  g += `<line x1="${x0}" y1="${y + 8}" x2="${x0 + 15 * step}" y2="${y + 8}" stroke="${INK}" stroke-width="1.6"/>`;
  for (let k = 0; k <= 15; k++) {
    const x = x0 + k * step, big = k % 5 === 0;
    g += `<line x1="${x}" y1="${y + 8}" x2="${x}" y2="${y + 8 - (big ? 22 : 12)}" stroke="${INK}" stroke-width="${big ? 2.2 : 1.5}"/>`;
  }
  const px = x0 + 8 * step;
  g += `<path d="M${px} ${y + 10} L${px - 8} ${y + 26} L${px + 8} ${y + 26} Z" fill="#c0392b"/><line x1="${px}" y1="${y + 26}" x2="${px}" y2="${y + 40}" stroke="#c0392b" stroke-width="3"/>`;
  g += `<text x="${x0 + 15 * step}" y="${y + 36}" font-size="12" text-anchor="end" fill="${INK}">grams</text>`;
  const H = y + 44;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A straight kitchen scale marked in grams. Long marks are labelled 0, 200, 400 and 600. Between each pair of labelled marks there are 4 shorter, unlabelled marks, equally spaced. A red pointer points at the third short mark after 200.">${g}</svg>`;
})();

/* ---- Maths Q2: Carter's ride (supplied by David; diagram redrawn) ---- */
const RIDE_SVG = (() => {
  const x0 = 30, u = 30, W = x0 * 2 + 10 * u, y = 46;
  let g = `<line x1="${x0}" y1="${y}" x2="${x0 + 10 * u}" y2="${y}" stroke="${INK}" stroke-width="3"/>`;
  for (let k = 0; k <= 10; k++) g += `<line x1="${x0 + k * u}" y1="${y - 5}" x2="${x0 + k * u}" y2="${y + 5}" stroke="${INK}" stroke-width="1.4"/>`;
  const lab = (k, top, bot, col) => `<circle cx="${x0 + k * u}" cy="${y}" r="5.5" fill="${col}" stroke="${INK}" stroke-width="1.4"/>` +
    `<text x="${x0 + k * u}" y="${y - 14}" font-size="13" font-weight="700" text-anchor="middle" fill="${INK}">${top}</text>` +
    `<text x="${x0 + k * u}" y="${y + 24}" font-size="13" text-anchor="middle" fill="${INK}">${bot}</text>`;
  g += lab(0, "Home", "0 km", "#ffffff") + lab(10, "School", "10 km", "#ffffff") + lab(7, "turned back", "7 km", "#f2b45a");
  const H = y + 34;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A straight line from Home at 0 km to School at 10 km, with a small mark for every kilometre. A point at 7 km is labelled turned back. The library is not marked.">${g}</svg>`;
})();

/* ---- Maths Q3: repeating pattern of shapes in a grid ---- */
const SHAPES = ["circle", "triangle", "square", "star", "heart"];
const shape = (name, cx, cy, r) => {
  if (name === "circle") return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#5b8fd1" stroke="${INK}" stroke-width="1.4"/>`;
  if (name === "triangle") return `<path d="M${cx} ${cy - r} L${cx + r} ${cy + r * 0.8} L${cx - r} ${cy + r * 0.8} Z" fill="#7cc47f" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  if (name === "square") return `<rect x="${cx - r * 0.85}" y="${cy - r * 0.85}" width="${r * 1.7}" height="${r * 1.7}" fill="#e9a23b" stroke="${INK}" stroke-width="1.4"/>`;
  if (name === "star") {
    let p = [];
    for (let k = 0; k < 10; k++) {
      const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r * 1.05;
      p.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
    }
    return `<polygon points="${p.join(" ")}" fill="#f3d23c" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round"/>`;
  }
  return `<path d="M${cx} ${cy + r} C${cx - r * 1.6} ${cy - r * 0.2} ${cx - r * 0.7} ${cy - r * 1.4} ${cx} ${cy - r * 0.45} C${cx + r * 0.7} ${cy - r * 1.4} ${cx + r * 1.6} ${cy - r * 0.2} ${cx} ${cy + r} Z" fill="#d9534f" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
};
const GRID_SVG = (() => {
  const c = 40, ox = 66, oy = 26, cols = 6, rows = 3, W = ox + cols * c + 12, H = oy + rows * c + 40;
  let g = "";
  for (let k = 0; k < cols; k++) g += `<text x="${ox + k * c + c / 2}" y="${oy - 8}" font-size="12" text-anchor="middle" fill="${INK}">col ${k + 1}</text>`;
  for (let r = 0; r < rows; r++) {
    g += `<text x="${ox - 8}" y="${oy + r * c + c / 2 + 4}" font-size="12" text-anchor="end" fill="${INK}">row ${r + 1}</text>`;
    for (let k = 0; k < cols; k++) {
      const x = ox + k * c, y = oy + r * c;
      g += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="#ffffff" stroke="${INK}" stroke-width="1.3"/>`;
      g += shape(SHAPES[(r * cols + k) % 5], x + c / 2, y + c / 2, 12);
    }
  }
  g += `<text x="${ox + cols * c / 2}" y="${oy + rows * c + 26}" font-size="20" text-anchor="middle" fill="${INK}">⋮</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A grid 6 squares wide. Rows 1 to 3 are shown, and dots show that it carries on downwards. Row 1, columns 1 to 6: circle, triangle, square, star, heart, circle. Row 2: triangle, square, star, heart, circle, triangle. Row 3: square, star, heart, circle, triangle, square.">${g}</svg>`;
})();
const shapeOpt = name => `<svg viewBox="0 0 44 44" width="44" height="44" role="img" aria-label="a ${name}">${shape(name, 22, 22, 15)}</svg>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about mountains. For each question, choose the extract (A, B, C or D) which best answers it.",
    questions: [
      {
        stem: "Which extract is <b>mainly</b> about a disappointment that turns into a happy memory?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 0,
        skill: "identifying the main idea of a text",
        explain: `<p>Extract A builds up to a promise (“you can see half of New South Wales”) and then breaks it: the cloud comes down and at the summit they can barely see the marker. That is the disappointment. But the extract ends with Jess joking that it was “the best view she had ever seen” and the whole family laughing until they “couldn’t stop”. The writer is looking back on the day, and what stayed with them is the fun, not the missing view.</p>
                  <p class="why-not">Extract C is the trap: Mira is badly disappointed when cloud stops her climb, but the extract doesn’t turn it into a happy memory. She walks away quietly, already thinking of “Next year”. In Extract D the climbers are tired but happy, and nobody is disappointed. Extract B is a factual description of the mountain.</p>`
      },
      {
        stem: "In which extract does someone make a sensible choice, even though it costs them something they badly want?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 2,
        skill: "inferring feelings that are shown, not stated",
        explain: `<p>In Extract C, Mira has “dreamed about” the summit “for three years”, and it is now only two hundred metres away. But the weather has turned, and the safe rule is to turn back, so she does. The extract never says “she was upset”: it shows it. She stares up at the ridge “for a long moment”, walks down “without a word”, lets herself look back only once, and says “Next year” quietly. Giving up the summit costs her a great deal, but she still makes the sensible choice.</p>
                  <p class="why-not">Extract D is the trap: the writer makes a sensible-sounding choice (a better track instead of a chairlift), but it costs the writer nothing they badly want. In Extract A the cloud spoils the view, but nobody chooses to give anything up; the weather simply takes it away. Extract B mentions sensible things (proper equipment in winter, a walkway to protect the plants), but no one in it gives up something they long for.</p>`
      },
      {
        stem: "Which extract uses a comparison to suggest that a shortcut can take away the very thing that makes an experience worthwhile?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 3,
        skill: "understanding what a comparison suggests",
        explain: `<p>Extract D compares riding a chairlift to the top with being handed “the last page of a mystery novel”. You would find out the ending, but you would “miss the story that makes the ending worth reaching”. The comparison suggests that the climb is like the story: it is what makes reaching the top special. Earlier, the description of people flopping down “red-faced and puffing” and then grinning “as if they own every tree” shows the same thing: the hard climb is what makes the view feel so good. A chairlift would be a shortcut that skips it.</p>
                  <p class="why-not">Extract C is the trap: it has a striking comparison too (cloud pouring over the ridge “like milk spilling from a jug”), but that comparison describes the weather, and nobody in C takes a shortcut. Extract A is tempting because the family do take a shortcut, the chairlift, but their day is still a happy one, and there is no comparison about it. Extract B mentions the chairlift and the walkway, but it gives facts and makes no comparison about shortcuts.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">Hillview School is starting one new lunchtime club. Max asked the six friends he plays handball with every lunchtime which club they would join. Five of them said they would join a handball club.</p>
               <p class="quote"><em class="speaker">Max:</em> “So a handball club would be the most popular new club in the whole school.”</p>
               <p style="margin:10px 0 0">Which one of these sentences shows the mistake Max has made?</p>`,
        options: ["Max’s friends may already play handball every lunchtime without needing a club.",
                  "The friends Max asked may like handball far more than most students at the school do.",
                  "A handball club may need a teacher to watch over it every single lunchtime.",
                  "One of the five friends who said yes may change their mind and not join the club after all."],
        answer: 1,
        skill: "spotting the mistake (judging from your own small group)",
        explain: `<p>Max asked only the six friends he plays handball with every day. Of course they like handball: that is why they play it together. They are not like the rest of the school, so their answers can’t tell him what the <em>whole school</em> would choose. Most students may prefer chess, art or a choir. B points out this mistake.</p>
                  <p class="why-not">D is the trap: it is about the friends Max asked, so it seems to question his evidence. But even if one friend changed their mind, four out of six would still choose handball, and the real problem would remain: he asked the wrong group. A suggests a handball club may not be needed, which says nothing about how popular it would be. C is about organising the club, which also has nothing to do with how popular it would be.</p>`
      },
      {
        stem: `Five friends, Ana, Ben, Dev, Eli and Tom, sit in a row of five seats at the cinema. The seats are numbered 1 to 5 from left to right, and “to the right” means towards seat 5.
               <ul style="margin:10px 0 0;padding-left:22px">
                 <li>Eli sits in one of the end seats.</li>
                 <li>Ben sits next to Eli.</li>
                 <li>Ana sits directly to the right of Dev.</li>
                 <li>Ben sits two seats to the right of Ana.</li>
               </ul>
               <p style="margin:10px 0 0">Who sits in seat 3?</p>`,
        options: ["Ana", "Ben", "Dev", "Tom"],
        answer: 3,
        skill: "ordering people in a row from clues (one clue only works once another is placed)",
        explain: `<p><b>Step 1: Eli and Ben.</b> Eli is in seat 1 or seat 5, and Ben is next to Eli. Ben is two seats to the right of Ana, so Ben can’t be in seat 2 (Ana would need a seat 0). So Eli is in <b>seat 5</b> and Ben is in <b>seat 4</b>.</p>
                  <p><b>Step 2: Ana.</b> Ben is two seats to the right of Ana, so Ana is in <b>seat 2</b>.</p>
                  <p><b>Step 3: Dev.</b> Ana is directly to the right of Dev, so Dev is in <b>seat 1</b>.</p>
                  <p>The only seat left, seat 3, is <b>Tom</b>’s. The row is Dev, Ana, Tom, Ben, Eli. Check every clue: Eli at the end ✓, Ben next to Eli ✓, Ana directly right of Dev ✓, Ben two seats right of Ana ✓.</p>
                  <p class="why-not">C (Dev) is the trap: it comes from putting Eli in seat 1 and Ben in seat 2 and then working the last clue the wrong way (Ana two seats to the right of Ben), which gives Eli, Ben, Dev, Ana, Tom. A (Ana) counts Ana’s own seat when moving “two seats to the right”, which puts Ana in seat 3 and Ben straight next to her. B (Ben) is next to Eli at the end of the row, in seat 4, not in the middle.</p>`
      },
      {
        stem: `Kim has a hexagon cut from card. She cuts it along the <b>two dashed lines</b>. One line joins two corners. The other joins the middles of two sides.
               <div class="figure">${HEX_SVG}</div>
               <p style="margin:10px 0 0">How many sides does each of the three pieces have?</p>`,
        options: ["3 sides, 4 sides and 5 sides", "3 sides, 4 sides and 4 sides", "3 sides, 3 sides and 5 sides", "3 sides, 4 sides and 6 sides"],
        answer: 0,
        skill: "the shapes made by straight cuts: counting the corners of each piece",
        explain: `<p>Count the <b>corners</b> of each piece. A corner of the hexagon stays a corner, and every place where a cut meets the edge in the middle of a side makes a <b>new</b> corner.</p>
                  <p><b>Piece 1 (top right):</b> the cut from corner to corner cuts off one corner of the hexagon. Its corners are the two ends of the cut and the corner it cuts off: <b>3 sides</b> (a triangle).</p>
                  <p><b>Piece 2 (left):</b> the other cut starts and ends in the middle of a side. This piece has the left two corners of the hexagon plus the two ends of the cut: <b>4 sides</b>.</p>
                  <p><b>Piece 3 (the big piece):</b> its corners are the top corner, the lower-right corner, the bottom corner, and the two ends of the second cut: <b>5 sides</b>.</p>
                  <p>So the pieces have 3, 4 and 5 sides: <b>A</b>.</p>
                  <p class="why-not">B is the trap: it counts the big piece as having 4 sides, forgetting that the two ends of the second cut both make new corners on it. C counts the left-hand piece as a triangle, as if the second cut went through a corner. D thinks the big piece still has the hexagon’s 6 sides, but two of its corners (and part of two sides) were cut away.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Mum puts some flour on this kitchen scale.
               <div class="figure">${SCALE_SVG}</div>
               <p style="margin:10px 0 0">How much flour is on the scale?</p>`,
        options: ["203 g", "230 g", "320 g", "350 g", "360 g"],
        answer: 2,
        skill: "reading a scale with unlabelled marks",
        explain: `<p><b>Step 1: what is each small step worth?</b> From 0 to 200 there are 4 short marks, which split the space into <b>5</b> equal steps. 200 ÷ 5 = <b>40 g</b> per step.</p>
                  <p><b>Step 2: read the pointer.</b> It is 3 steps past 200: 200 + 3 × 40 = <b>320 g</b>.</p>
                  <p class="why-not">350 g (D) is the trap: it sees 4 short marks and thinks they make 4 steps, so each step is 200 ÷ 4 = 50 g. But 4 marks split the space into 5 steps. 360 g (E) counts the long 200 mark as the first step, so it counts 4 steps of 40. 230 g (B) counts each small mark as 10 g, and 203 g (A) counts each one as 1 g.</p>`
      },
      {
        stem: `Carter’s school is 10 km away from his home. The library is on his way from home to school. This morning, Carter biked to school from his home. After biking 7 km, he realised that he forgot to stop at the library. He biked back to the library right away, and then he biked straight to school. He biked a total of 16 km during this trip.
               <div class="figure">${RIDE_SVG}</div>
               <p style="margin:10px 0 0">How far is the library from Carter’s home?</p>`,
        options: ["3 km", "4 km", "6 km", "7 km", "9 km"],
        answer: 1,
        skill: "distance on a line: working out an extra stretch that was ridden twice (supplied by David)",
        explain: `<p><b>Step 1: the extra distance.</b> Going straight to school would have been 10 km, but Carter biked 16 km. So he biked 16 − 10 = <b>6 km</b> extra.</p>
                  <p><b>Step 2: why the extra?</b> The stretch between the library and the 7 km point was ridden <b>three</b> times: forwards, back to the library, then forwards again. Riding it once is part of the normal 10 km, so the extra 6 km is that stretch ridden <b>twice</b>. The stretch is 6 ÷ 2 = <b>3 km</b>.</p>
                  <p><b>Step 3: find the library.</b> He turned back at 7 km and rode back 3 km, so the library is 7 − 3 = <b>4 km</b> from home.</p>
                  <p>Check: 7 km out + 3 km back + 6 km from the library (at 4 km) to school (at 10 km) = 16 km ✓</p>
                  <p class="why-not">3 km (A) is the trap: it is how far Carter biked <em>back</em>, from the turning point to the library, not how far the library is from home. 6 km (C) is the extra distance, but that extra was ridden twice. 7 km (D) is where Carter turned back, not where the library is. 9 km (E) is 16 − 7, the distance he biked after turning back.</p>`
      },
      {
        stem: `A grid is 6 squares wide. Shapes are placed in it in this repeating order: circle, triangle, square, star, heart. They fill row 1 from left to right, then row 2, then row 3, and so on.
               <div class="figure">${GRID_SVG}</div>
               <p style="margin:10px 0 0">Which shape will be in <b>row 8, column 3</b>?</p>`,
        visualOptions: true,
        options: SHAPES.map(shapeOpt),
        answer: 4,
        skill: "repeating pattern in a grid: finding the place in the order, then using the repeat",
        explain: `<p><b>Step 1: which place in the order?</b> Rows 1 to 7 are full before row 8 starts: 7 × 6 = 42 shapes. Row 8, column 3 is 3 more: shape number <b>45</b>.</p>
                  <p><b>Step 2: use the repeat.</b> The pattern repeats every 5 shapes, and 45 = 9 × 5 exactly. So shape 45 is the <b>last</b> shape of a repeat: the <b>heart</b> (E).</p>
                  <p>Check with the picture: row 1 ends with shape 6, so shapes 5, 10, 15 … are hearts. Shape 15 is row 3, column 3, and it is a heart ✓</p>
                  <p class="why-not">A (circle) is the trap: it counts 8 full rows (8 × 6 = 48) instead of 7, getting shape 51, which starts a new repeat. B (triangle) forgets to add the columns, stopping at shape 42 at the end of row 7. C (square) thinks every row is the same as row 1, but each row starts one shape later. D (star) multiplies the row by the column (8 × 3 = 24).</p>`
      }
    ]
  }
];
