/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 36
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: four extracts on one theme ---- */
const EXTRACTS = [
  `Long before mechanical clocks were invented, people used the sun to tell the time. A sundial is simply a pointer that casts a shadow. As the sun moves across the sky, the shadow creeps around marks on a dial. Sundials were used in ancient Egypt thousands of years ago. They had one obvious weakness, however: at night, or whenever clouds covered the sun, they were useless. For those times, people used water clocks, which measured time by how much water had dripped out of a container.`,
  `Your body has a clock of its own. Even without a watch, it tells you when to feel sleepy and when to feel wide awake, following a cycle that lasts roughly twenty-four hours. Daylight helps to keep this clock set correctly. When people fly halfway around the world, their body clock can be left many hours behind or ahead of the clock on the wall. This is called jet lag, and it can take several days for the body to catch up.`,
  `Mum said she would be back in ten minutes. Ivy sat on the bench outside the shop and watched the long hand on the big clock above the door. It crawled. She counted the cars going past. She counted the cracks in the footpath. She retied both of her shoelaces, slowly, twice. When she was certain that at least half an hour had gone by, she looked up at the clock again. Mum had been gone for six minutes.`,
  `Not everyone divides the year into spring, summer, autumn and winter. In Kakadu, in northern Australia, the Aboriginal traditional owners recognise six seasons rather than four, and none of them can be marked in advance on a chart. Instead, each season arrives when its signs appear: a change in the wind, the first storms, certain plants flowering or animals behaving in particular ways. In some years a season comes early; in others it comes late. This knowledge has been passed down for many generations.`
];
const PASSAGE = {
  title: "Keeping Time",
  note: "Read the four extracts below about time.",
  html: EXTRACTS.map((t, i) => `<div class="extract"><h4>Extract ${"ABCD"[i]}</h4><p>${t}</p></div>`).join("")
};

/* ---- Thinking Skills Q2: sprinkler timeline ---- */
const SPRINKLERS = [["front lawn", 0, 60], ["vegie patch", 30, 90], ["back lawn", 60, 120], ["flower bed", 105, 150]];
const SPRINKLER_SVG = (() => {
  const lx = 104, px = 2.0, top = 10, rowH = 34, W = lx + 180 * px + 20;
  let g = "";
  for (let m = 0; m <= 180; m += 15) {
    const x = lx + m * px, major = m % 60 === 0;
    g += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + 4 * rowH}" stroke="${major ? "#9aa6bb" : "#dde2ea"}" stroke-width="1"/>`;
    if (m % 30 === 0) g += `<text x="${x}" y="${top + 4 * rowH + 18}" font-size="12" text-anchor="middle" fill="${INK}">${6 + Math.floor(m / 60)}:${m % 60 === 0 ? "00" : "30"}</text>`;
  }
  SPRINKLERS.forEach(([name, a, b], i) => {
    const y = top + i * rowH;
    g += `<text x="${lx - 8}" y="${y + rowH / 2 + 5}" font-size="13" text-anchor="end" fill="${INK}">${name}</text>
          <rect x="${lx + a * px}" y="${y + 8}" width="${(b - a) * px}" height="${rowH - 16}" rx="3" fill="#4a8fd1" stroke="${INK}" stroke-width="1.2"/>`;
  });
  g += `<text x="${lx + 90 * px}" y="${top + 4 * rowH + 36}" font-size="12" text-anchor="middle" fill="#55607a">time (am) — each small gap is 15 minutes</text>`;
  return `<svg viewBox="0 0 ${W} ${top + 4 * rowH + 44}" width="${W}" height="${top + 4 * rowH + 44}" style="max-width:100%;height:auto" role="img" aria-label="A timeline from 6:00 to 9:00 am with grid lines every 15 minutes. Front lawn sprinkler on from 6:00 to 7:00. Vegie patch from 6:30 to 7:30. Back lawn from 7:00 to 8:00. Flower bed from 7:45 to 8:30.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: table seen from above ---- */
const TABLE_SVG = (() => {
  const ox = 70, oy = 50, s = 180, c = s / 3;
  const cell = (r, k) => [ox + k * c + c / 2, oy + r * c + c / 2];
  let g = `<rect x="${ox}" y="${oy}" width="${s}" height="${s}" rx="6" fill="#f3e3c7" stroke="${INK}" stroke-width="2"/>`;
  const [bx, by] = cell(0, 0); // book: north-west
  g += `<rect x="${bx - 20}" y="${by - 14}" width="40" height="28" rx="2" fill="#5b7db1" stroke="${INK}" stroke-width="1.5"/><line x1="${bx}" y1="${by - 14}" x2="${bx}" y2="${by + 14}" stroke="#fff" stroke-width="1.5"/>
        <text x="${bx}" y="${by + 30}" font-size="12" text-anchor="middle" fill="${INK}">book</text>`;
  const [cx, cy] = cell(1, 1); // cup: centre
  g += `<circle cx="${cx}" cy="${cy}" r="13" fill="#fff" stroke="${INK}" stroke-width="2"/><path d="M${cx + 13} ${cy - 5} q10 5 0 10" fill="none" stroke="${INK}" stroke-width="2"/>
        <text x="${cx}" y="${cy + 30}" font-size="12" text-anchor="middle" fill="${INK}">cup</text>`;
  const [qx, qy] = cell(2, 1); // ball: south-middle
  g += `<circle cx="${qx}" cy="${qy}" r="14" fill="#e0a43a" stroke="${INK}" stroke-width="2"/><path d="M${qx - 14} ${qy} q14 -8 28 0" fill="none" stroke="${INK}" stroke-width="1.2"/>
        <text x="${qx + 26}" y="${qy + 5}" font-size="12" fill="${INK}">ball</text>`;
  const seat = (x, y, name) => `<text x="${x}" y="${y}" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">${name}</text>`;
  g += seat(ox + s / 2, oy - 14, "Anna") + seat(ox + s + 34, oy + s / 2 + 5, "Ben") + seat(ox + s / 2, oy + s + 26, "Cleo") + seat(ox - 34, oy + s / 2 + 5, "Dev");
  g += `<g transform="translate(${ox + s + 30} ${oy - 30})"><line x1="0" y1="18" x2="0" y2="0" stroke="${INK}" stroke-width="2"/><path d="M-5 6 L0 -2 L5 6 Z" fill="${INK}"/><text x="0" y="32" font-size="11" text-anchor="middle" fill="${INK}">N</text></g>`;
  return `<svg viewBox="0 0 ${ox + s + 80} ${oy + s + 40}" width="${ox + s + 80}" height="${oy + s + 40}" role="img" aria-label="A square table seen from above. Anna sits on the north side, Ben on the east side, Cleo on the south side and Dev on the west side, each facing the table. A book is in the north-west corner of the table, a cup is in the centre, and a ball is in the middle of the south edge.">${g}</svg>`;
})();

/* ---- Maths Q1: thermometer ---- */
const THERMO_SVG = (() => {
  const x = 60, top = 14, h = 220, per = h / 40; // 0..40 degrees
  let g = `<rect x="${x - 9}" y="${top - 6}" width="18" height="${h + 12}" rx="9" fill="#fff" stroke="${INK}" stroke-width="2"/>
           <circle cx="${x}" cy="${top + h + 20}" r="16" fill="#d9534f" stroke="${INK}" stroke-width="2"/>
           <rect x="${x - 4}" y="${top + h - 26 * per}" width="8" height="${26 * per + 14}" fill="#d9534f"/>`;
  for (let d = 0; d <= 40; d += 2) {
    const y = top + h - d * per, major = d % 10 === 0;
    g += `<line x1="${x + 10}" y1="${y}" x2="${x + (major ? 26 : 18)}" y2="${y}" stroke="${INK}" stroke-width="${major ? 1.8 : 1}"/>`;
    if (major) g += `<text x="${x + 32}" y="${y + 5}" font-size="13" fill="${INK}">${d}</text>`;
  }
  g += `<text x="${x - 44}" y="${top + 5}" font-size="13" fill="#55607a">°C</text>`;
  return `<svg viewBox="0 0 140 ${top + h + 44}" width="140" height="${top + h + 44}" role="img" aria-label="A thermometer marked 0, 10, 20, 30 and 40 degrees Celsius, with four small marks between each pair of labels. The red liquid reaches the third small mark above 20.">${g}</svg>`;
})();

/* ---- Maths Q3: picture graph ---- */
const BOOKS = [["Monday", 3.5], ["Tuesday", 5], ["Wednesday", 3], ["Thursday", 4], ["Friday", 6]];
const PICTO_SVG = (() => {
  const lx = 96, w = 28, gap = 6, rowH = 36;
  const book = (x, y, half) => half
    ? `<rect x="${x}" y="${y}" width="${w / 2}" height="24" fill="#5b7db1" stroke="${INK}" stroke-width="1.2"/>`
    : `<rect x="${x}" y="${y}" width="${w}" height="24" rx="2" fill="#5b7db1" stroke="${INK}" stroke-width="1.2"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + 24}" stroke="#fff" stroke-width="1.2"/>`;
  let g = "";
  BOOKS.forEach(([day, n], i) => {
    const y = 8 + i * rowH;
    g += `<text x="${lx - 10}" y="${y + 17}" font-size="13" text-anchor="end" fill="${INK}">${day}</text>`;
    for (let k = 0; k < Math.floor(n); k++) g += book(lx + k * (w + gap), y, false);
    if (n % 1) g += book(lx + Math.floor(n) * (w + gap), y, true);
  });
  const ky = 8 + BOOKS.length * rowH + 10;
  g += `<g transform="translate(${lx} ${ky})">${book(0, 0, false)}<text x="${w + 10}" y="17" font-size="13" fill="${INK}">= 4 books</text></g>`;
  const W = lx + 6 * (w + gap) + 10;
  return `<svg viewBox="0 0 ${W} ${ky + 32}" width="${W}" height="${ky + 32}" role="img" aria-label="A picture graph of books read by a class. Monday: three and a half symbols. Tuesday: five. Wednesday: three. Thursday: four. Friday: six. Key: one symbol stands for 4 books.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the four extracts about time. For each question, choose the extract (A, B, C or D) which best answers it.",
    questions: [
      {
        stem: "In which extract does someone find that time seemed to pass much more slowly than it really did?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 2,
        skill: "inferring a character’s experience",
        explain: `<p>In Extract C, Ivy fills the time with every small task she can think of and is “certain that at least half an hour had gone by”. The clock shows only six minutes. Waiting made the time feel far longer than it was.</p>
                  <p class="why-not">Extract B is the trap: jet lag leaves your body clock out of step with the real time, but that is about being hours ahead or behind, not time <em>feeling</em> slow. Extracts A and D are about ways of measuring time.</p>`
      },
      {
        stem: "Which extract explains why one way of measuring time was not enough on its own?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 0,
        skill: "inferring the purpose of a detail",
        explain: `<p>Extract A says sundials “had one obvious weakness”: they were useless at night or when clouds covered the sun. That is why people <em>also</em> used water clocks “for those times”. So the sundial was not enough on its own.</p>
                  <p class="why-not">Extract B is the trap: the body clock needs daylight to stay set, and it can be thrown out by jet lag, but the extract never says a second way of measuring time was needed. Extract D describes a different way of dividing the year, not one method failing. Extract C has a clock that works perfectly; it is Ivy’s feeling that is wrong.</p>`
      },
      {
        stem: "Which extract suggests that writing down in advance the day something will happen each year would not always work?",
        letterOptions: true,
        options: ["Extract A", "Extract B", "Extract C", "Extract D"],
        answer: 3,
        skill: "matching an idea to the extract that supports it (careful reading)",
        explain: `<p>In Extract D, each Kakadu season begins when its signs appear (the wind changes, storms arrive, plants flower), and “in some years a season comes early; in others it comes late”. The seasons “can’t be marked in advance on a chart”, so if you wrote down the day each season should start, you would often be wrong. The signs in nature are the real guide.</p>
                  <p class="why-not">B is the trap: it says the body clock can be out of step with “the clock on the wall”, so something is a poor guide there too. But that is about hours on a clock after a long flight, not about something that happens once a year, and the problem is the body, not the clock. A is about sundials failing at night, and in C the clock is right and Ivy’s feeling is wrong.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `For a food drive, Class 4R collected 120 cans and Class 4M collected 90 cans.
               <p class="quote"><em class="speaker">The principal:</em> “Class 4R collected more cans, so the students in 4R must have tried harder than the students in 4M.”</p>
               <p style="margin:10px 0 0">Which one of the following sentences shows the mistake the principal has made?</p>`,
        options: ["The cans collected by both classes may go to the same charity.",
                  "Class 4M may have collected more cans this year than it did last year.",
                  "Some students in Class 4R may really enjoy helping charities.",
                  "Class 4R may have a lot more students than Class 4M."],
        answer: 3,
        skill: "spotting a mistake: an unfair comparison",
        explain: `<p>The principal compares the two <em>totals</em>, but that is only fair if the classes are the same size. If 4R has 30 students and 4M has 18, then 4R collected 4 cans each and 4M collected 5 cans each, so 4M’s students actually collected more per person. D shows the mistake.</p>
                  <p class="why-not">B is the trap: it is about how hard 4M tried, but it compares 4M with its own past, not with 4R, so it doesn’t show why the comparison between the classes is unfair. C, if anything, supports the principal. A doesn’t affect how hard either class tried.</p>`
      },
      {
        stem: `The chart shows when four garden sprinklers were turned on one morning.
               <div class="figure">${SPRINKLER_SVG}</div>
               <p style="margin:10px 0 0">What was the <b>longest continuous</b> time that more than one sprinkler was on?</p>`,
        options: ["30 minutes", "1 hour", "1 hour 15 minutes", "2 hours"],
        answer: 1,
        skill: "reading a timeline and finding overlaps",
        explain: `<p>Look for times when two or more bars overlap:</p>
                  <p>• 6:30 to 7:00: front lawn and vegie patch.<br>
                     • 7:00 to 7:30: vegie patch and back lawn. This follows straight on, so from <b>6:30 to 7:30</b> there are always at least two sprinklers on. That is <b>1 hour</b>.<br>
                     • 7:30 to 7:45: only the back lawn is on, which breaks the run.<br>
                     • 7:45 to 8:00: back lawn and flower bed, only 15 minutes.</p>
                  <p class="why-not">1 hour 15 minutes (C) is the trap: it adds up <em>all</em> the overlapping times, but 7:30 to 7:45 breaks them into two separate periods. 30 minutes (A) looks at only one pair of sprinklers. 2 hours (D) is the time from 6:00 to 8:00, when at least one sprinkler was on.</p>`
      },
      {
        stem: `Four friends sit around a square table. This is the view from above.
               <div class="figure">${TABLE_SVG}</div>
               <p class="quote" style="margin-top:6px">“The ball is the closest thing to me. The cup is straight behind the ball, and the book is over on my left.”</p>
               <p style="margin:10px 0 0">Which friend said this?</p>`,
        options: ["Anna", "Ben", "Cleo", "Dev"],
        answer: 2,
        skill: "picturing a view from someone else’s position",
        explain: `<p>Imagine sitting in each seat, facing the middle of the table.</p>
                  <p><b>Cleo</b> sits on the south side, facing north. The ball is right in front of her, the cup is straight behind it in the centre, and the book is in the far corner on her <b>left</b> ✓</p>
                  <p class="why-not">Dev is the trap: from Dev’s seat the book <em>is</em> on his left, but the closest thing to him is the cup in the middle, not the ball. Anna sees the ball furthest away and the book on her right. Ben has the ball on his left.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `What temperature does this thermometer show?
               <div class="figure">${THERMO_SVG}</div>`,
        options: ["20 °C", "23 °C", "24 °C", "26 °C", "27.5 °C"],
        answer: 3,
        skill: "reading a scale with unlabelled marks",
        explain: `<p>Between 20 and 30 there are 4 small marks, which split the gap into 5 equal steps. 10 ÷ 5 = <b>2 °C</b> per step.</p>
                  <p>The red liquid reaches the 3rd small mark above 20: 20 + 3 × 2 = <b>26 °C</b>.</p>
                  <p class="why-not">23 °C (B) is the trap: it counts each small mark as 1 degree. 27.5 °C (E) splits the 10 degrees into 4 steps instead of 5. 24 °C (C) counts only 2 steps above 20 instead of 3. 20 °C (A) just reads the label below the liquid.</p>`
      },
      {
        stem: `A shop sells muesli bars in three ways:
               <ul class="facts">
                 <li>single bars: $1.10 each</li>
                 <li>packs of 6 bars: $5.40 a pack</li>
                 <li>packs of 10 bars: $8.50 a pack</li>
               </ul>
               <p style="margin:10px 0 0">Zoe needs <b>exactly</b> 12 bars. What is the lowest price she can pay?</p>`,
        options: ["$10.20", "$10.70", "$10.80", "$12.00", "$13.20"],
        answer: 1,
        skill: "finding the cheapest combination",
        explain: `<p>Find all the ways to make exactly 12 bars, and the cost of each:</p>
                  <p>• one 10-pack + 2 singles: $8.50 + $2.20 = <b>$10.70</b><br>
                     • two 6-packs: $5.40 + $5.40 = $10.80<br>
                     • one 6-pack + 6 singles: $5.40 + $6.60 = $12.00<br>
                     • 12 singles: 12 × $1.10 = $13.20</p>
                  <p>The cheapest is <b>$10.70</b>, just 10 cents less than two 6-packs.</p>
                  <p class="why-not">$10.80 (C) is the trap: two 6-packs make 12 exactly with no singles, so it looks cheapest, but it isn't. $10.20 (A) works out 12 bars at the 10-pack price of 85 cents each, but you can't buy 12 bars at that price. $12.00 (D) and $13.20 (E) are the other combinations.</p>`
      },
      {
        stem: `The picture graph shows how many books a class read each day.
               <div class="figure">${PICTO_SVG}</div>
               <ol style="margin:8px 0 0;padding-left:22px">
                 <li>Twice as many books were read on Friday as on Wednesday.</li>
                 <li>The class read 86 books altogether.</li>
                 <li>On Friday the class read 2 more books than on Thursday.</li>
               </ol>
               <p style="margin:8px 0 0">Which of these statements is/are correct?</p>`,
        options: ["statement 1 only", "statement 2 only", "statements 1 and 2 only", "statements 2 and 3 only", "statements 1, 2 and 3"],
        answer: 2,
        skill: "reading a picture graph with a key (including half symbols)",
        explain: `<p>Each whole symbol is 4 books, so a half symbol is 2 books.</p>
                  <p>Monday 14, Tuesday 20, Wednesday 12, Thursday 16, Friday 24.</p>
                  <p><b>1:</b> 24 is twice 12 ✓<br>
                     <b>2:</b> 14 + 20 + 12 + 16 + 24 = 86 ✓<br>
                     <b>3:</b> Friday has 2 more <em>symbols</em> than Thursday, but that is 2 × 4 = 8 more books, not 2 ✗</p>
                  <p class="why-not">E is the trap: statement 3 is true if you count symbols instead of books. A total of 84 or 88 (from ignoring the half symbol or counting it as a whole) would make statement 2 look wrong.</p>`
      }
    ]
  }
];
