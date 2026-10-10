/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 51
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: story extract (public domain: Frances Hodgson Burnett, 1911; text from Project Gutenberg #113) ---- */
const PARAS = [
  "She walked away, slowly thinking. She had begun to like the garden just as she had begun to like the robin and Dickon and Martha’s mother. She was beginning to like Martha, too. That seemed a good many people to like—when you were not used to liking. She thought of the robin as one of the people. She went to her walk outside the long, ivy-covered wall over which she could see the tree-tops; and the second time she walked up and down the most interesting and exciting thing happened to her, and it was all through Ben Weatherstaff’s robin.",
  "She heard a chirp and a twitter, and when she looked at the bare flower-bed at her left side there he was hopping about and pretending to peck things out of the earth to persuade her that he had not followed her. But she knew he had followed her and the surprise so filled her with delight that she almost trembled a little.",
  "“You do remember me!” she cried out. “You do! You are prettier than anything else in the world!”",
  "…",
  "The flower-bed was not quite bare. It was bare of flowers because the perennial plants had been cut down for their winter rest, but there were tall shrubs and low ones which grew together at the back of the bed, and as the robin hopped about under them she saw him hop over a small pile of freshly turned up earth. He stopped on it to look for a worm. The earth had been turned up because a dog had been trying to dig up a mole and he had scratched quite a deep hole.",
  "Mary looked at it, not really knowing why the hole was there, and as she looked she saw something almost buried in the newly-turned soil. It was something like a ring of rusty iron or brass and when the robin flew up into a tree nearby she put out her hand and picked the ring up. It was more than a ring, however; it was an old key which looked as if it had been buried a long time.",
  "Mistress Mary stood up and looked at it with an almost frightened face as it hung from her finger.",
  "“Perhaps it has been buried for ten years,” she said in a whisper. “Perhaps it is the key to the garden!”"
];
const PASSAGE = {
  title: "The Key to the Garden",
  note: "This extract is from <i>The Secret Garden</i> (1911) by Frances Hodgson Burnett. Mary Lennox, a lonely and bad-tempered ten-year-old, has come to live in her uncle’s big house on the Yorkshire moors. She has heard that her uncle, Mr Craven, locked one of the walled gardens ten years ago and buried the key, and that nobody has been inside it since. Martha is a maid at the house, and Dickon is Martha’s brother, whom Mary has heard about but not yet met. Ben Weatherstaff is the old gardener. The writer sometimes calls Mary “Mistress Mary”, from the rhyme “Mistress Mary, quite contrary”, which other children once sang to tease her. Where you see … some paragraphs have been left out. Read the extract, then answer the questions.",
  html: PARAS.map(p => p === "…" ? `<p style="text-align:center">…</p>` : `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: lemonade stall column graph (two series) ---- */
const STALLS = [["Ana", 15, 4], ["Ben", 2, 11], ["Cara", 13, 7], ["Dev", 10, 9]];
const STALL_GRAPH = (() => {
  const x0 = 36, yb = 238, u = 13, top = yb - 16 * u, gw = 58, cw = 20;
  const SMALL = "#9cc9e6", LARGE = "#1f5f8b";
  let g = "";
  for (let v = 0; v <= 16; v++) {
    const y = yb - v * u;
    g += `<line x1="${x0}" y1="${y}" x2="${x0 + 4 * gw + 8}" y2="${y}" stroke="${v % 2 ? "#e3e7ee" : "#c3cad6"}" stroke-width="1"/>`;
    if (v % 2 === 0) g += `<text x="${x0 - 7}" y="${y + 4}" font-size="13" text-anchor="end" fill="${INK}">${v}</text>`;
  }
  STALLS.forEach(([name, s, l], i) => {
    const gx = x0 + 10 + i * gw;
    g += `<rect x="${gx}" y="${yb - s * u}" width="${cw}" height="${s * u}" fill="${SMALL}" stroke="${INK}" stroke-width="1.2"/>`;
    g += `<rect x="${gx + cw + 2}" y="${yb - l * u}" width="${cw}" height="${l * u}" fill="${LARGE}" stroke="${INK}" stroke-width="1.2"/>`;
    g += `<text x="${gx + cw + 1}" y="${yb + 19}" font-size="14" text-anchor="middle" fill="${INK}">${name}</text>`;
  });
  g += `<line x1="${x0}" y1="${top - 4}" x2="${x0}" y2="${yb}" stroke="${INK}" stroke-width="1.6"/><line x1="${x0}" y1="${yb}" x2="${x0 + 4 * gw + 8}" y2="${yb}" stroke="${INK}" stroke-width="1.6"/>`;
  g += `<text x="11" y="${(top + yb) / 2}" font-size="12" text-anchor="middle" fill="${INK}" transform="rotate(-90 11 ${(top + yb) / 2})">number of cups sold</text>`;
  g += `<rect x="${x0 + 6}" y="4" width="14" height="14" fill="${SMALL}" stroke="${INK}"/><text x="${x0 + 25}" y="16" font-size="14" fill="${INK}">small cups</text>`;
  g += `<rect x="${x0 + 124}" y="4" width="14" height="14" fill="${LARGE}" stroke="${INK}"/><text x="${x0 + 143}" y="16" font-size="14" fill="${INK}">large cups</text>`;
  const W = x0 + 4 * gw + 12;
  return `<svg viewBox="0 0 ${W} ${yb + 28}" width="${W}" height="${yb + 28}" role="img" aria-label="Column graph of cups sold, with a small-cup column and a large-cup column for each child. Ana: 15 small, 4 large. Ben: 2 small, 11 large. Cara: 13 small, 7 large. Dev: 10 small, 9 large. The scale goes up in ones, labelled every 2.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: cube net with symbols ---- */
// each symbol is drawn in a 1 by 1 square, then stretched onto a face
const SYM = {
  target: `<circle cx=".5" cy=".5" r=".3" fill="none" stroke="#c0392b" stroke-width=".08"/><circle cx=".5" cy=".5" r=".11" fill="#c0392b"/>`,
  xcross: `<path d="M.24 .24 L.76 .76 M.76 .24 L.24 .76" stroke="${INK}" stroke-width=".12" stroke-linecap="round"/>`,
  spot: `<circle cx=".5" cy=".5" r=".27" fill="#2f6fb5"/>`,
  star: `<polygon points=".5,.12 .6,.4 .88,.5 .6,.6 .5,.88 .4,.6 .12,.5 .4,.4" fill="#e0a526" stroke="${INK}" stroke-width=".03"/>`,
  dots5: [[.27, .27], [.73, .27], [.5, .5], [.27, .73], [.73, .73]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".09" fill="${INK}"/>`).join(""),
  hollow: `<rect x=".25" y=".25" width=".5" height=".5" fill="none" stroke="#2f7d4f" stroke-width=".1"/>`
};
const SYM_NAME = { target: "a red target", xcross: "a black X", spot: "a blue spot", star: "a yellow star", dots5: "five dots", hollow: "a green square outline" };
const NET = [[0, 0, "target"], [1, 0, "xcross"], [1, 1, "spot"], [1, 2, "star"], [1, 3, "dots5"], [2, 2, "hollow"]];
const NET_SVG = (() => {
  const u = 50, o = 4;
  let g = "";
  NET.forEach(([r, c, s]) => {
    const x = o + c * u, y = o + r * u;
    g += `<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="#fff" stroke="${INK}" stroke-width="2"/><g transform="matrix(${u} 0 0 ${u} ${x} ${y})">${SYM[s]}</g>`;
  });
  return `<svg viewBox="0 0 ${4 * u + 2 * o} ${3 * u + 2 * o}" width="${4 * u + 2 * o}" height="${3 * u + 2 * o}" role="img" aria-label="A net of six squares. Middle row of four, from left to right: ${SYM_NAME.xcross}, ${SYM_NAME.spot}, ${SYM_NAME.star}, ${SYM_NAME.dots5}. Above the X: ${SYM_NAME.target}. Below the star: ${SYM_NAME.hollow}.">${g}</svg>`;
})();
function cubeSvg([top, left, right], letter) {
  const a = 46, k = a * Math.cos(Math.PI / 6), cx = 6 + k, y0 = 6;
  const T = [cx, y0], Rt = [cx + k, y0 + a / 2], Fr = [cx, y0 + a], Lf = [cx - k, y0 + a / 2];
  const face = (o, u, v, s, fill) =>
    `<polygon points="${[o, [o[0] + u[0], o[1] + u[1]], [o[0] + u[0] + v[0], o[1] + u[1] + v[1]], [o[0] + v[0], o[1] + v[1]]].map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
     <g transform="matrix(${u[0]} ${u[1]} ${v[0]} ${v[1]} ${o[0]} ${o[1]})">${SYM[s]}</g>`;
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const g = face(Lf, sub(T, Lf), sub(Fr, Lf), top, "#ffffff") +
            face(Lf, sub(Fr, Lf), [0, a], left, "#eef1f6") +
            face(Fr, sub(Rt, Fr), [0, a], right, "#dfe4ec");
  const W = 2 * k + 12, H = 2 * a + 12;
  return `<svg viewBox="0 0 ${W.toFixed(1)} ${H}" width="${W.toFixed(1)}" height="${H}" role="img" aria-label="Cube ${letter}: top face ${SYM_NAME[top]}, front-left face ${SYM_NAME[left]}, front-right face ${SYM_NAME[right]}.">${g}</svg>`;
}
const CUBE_OPTS = [["target", "xcross", "spot"], ["target", "xcross", "hollow"], ["spot", "xcross", "star"], ["target", "spot", "xcross"]]
  .map((f, i) => cubeSvg(f, "ABCD"[i]));

/* ---- Maths Q2: dot plot of pets ---- */
const PETS = [5, 8, 6, 3, 0, 2];
const PET_PLOT = (() => {
  const x0 = 24, step = 42, yb = 182, d = 20;
  let g = `<line x1="${x0 - 18}" y1="${yb}" x2="${x0 + 5 * step + 18}" y2="${yb}" stroke="${INK}" stroke-width="1.8"/>`;
  PETS.forEach((n, v) => {
    const x = x0 + v * step;
    g += `<line x1="${x}" y1="${yb}" x2="${x}" y2="${yb + 6}" stroke="${INK}" stroke-width="1.6"/><text x="${x}" y="${yb + 22}" font-size="15" text-anchor="middle" fill="${INK}">${v}</text>`;
    for (let k = 0; k < n; k++) g += `<circle cx="${x}" cy="${yb - 12 - k * d}" r="8.5" fill="#e07a5f" stroke="${INK}" stroke-width="1.2"/>`;
  });
  g += `<text x="${x0 + 2.5 * step}" y="${yb + 42}" font-size="13" text-anchor="middle" fill="${INK}">number of pets</text>`;
  const W = x0 + 5 * step + 24;
  return `<svg viewBox="0 0 ${W} ${yb + 50}" width="${W}" height="${yb + 50}" role="img" aria-label="Dot plot. Each dot is one student. 0 pets: 5 dots. 1 pet: 8 dots. 2 pets: 6 dots. 3 pets: 3 dots. 4 pets: no dots. 5 pets: 2 dots.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the extract, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "What is the main point of the <b>first paragraph</b> of the extract?",
        options: ["Mary has decided that the robin is the only friend she will ever need.",
                  "Mary feels lonely, because hardly anyone she has met seems to like her.",
                  "Mary, who is not used to liking anyone, is starting to care about others.",
                  "Mary is much more interested in the walled garden than in any of the people."],
        answer: 2,
        skill: "finding the main point of a paragraph",
        explain: `<p>Most of the paragraph is about one change in Mary. She has “begun to like” the garden, the robin, Dickon and Martha’s mother, and she is “beginning to like Martha, too”. The writer adds that this “seemed a good many people to like—when you were not used to liking”. So the main point is that Mary, who has not liked people before, is starting to care about others.</p>
                  <p class="why-not">B is the trap: it is about liking and loneliness, but it turns the paragraph round. The paragraph is about Mary liking other people, not about whether they like her. D uses a real detail (the garden is the first thing she has begun to like), but it is only one item in a list, and the paragraph says nothing about the garden mattering more than people. A is wrong because the robin is just one of several people and things she has come to like.</p>`
      },
      {
        stem: "The robin is described as “pretending to peck things out of the earth to persuade her that he had not followed her”. Why does the writer describe the robin in this way?",
        options: ["To show that Mary sees the robin as a person, with thoughts and tricks of his own.",
                  "To show that the robin was hungry and was only searching the earth for worms.",
                  "To show that the robin was shy and did not want Mary to come any closer to him.",
                  "To explain how the hole in the flower-bed, where the key was lying, came to be dug."],
        answer: 0,
        skill: "understanding why a writer includes a detail",
        explain: `<p>Birds don’t really “pretend” or try to “persuade” anyone: those are things people do. The writer describes the robin as if he has a plan of his own because this is how <em>Mary</em> sees him. The first paragraph tells us “She thought of the robin as one of the people”, and here she is sure he is only pretending (“she knew he had followed her”).</p>
                  <p class="why-not">B is the trap: later the robin really does stop “to look for a worm”, but here the writer says he is only <em>pretending</em> to peck, and that he really followed Mary. C is the opposite of what happens: Mary is delighted that he has come to her, and he hops about close by. D mixes up two details: the robin hops over the pile of earth, but the hole was dug by “a dog … trying to dig up a mole”.</p>`
      },
      {
        stem: "Mary looks at the key “with an almost frightened face” and speaks “in a whisper”. What do these details suggest about how she feels?",
        options: ["She is scared that she will be punished, because the key belongs to Mr Craven.",
                  "She is disappointed, because the key is so old and rusty that it might not work.",
                  "She is nervous that the robin will fly away now that she has moved so close to him.",
                  "She is so amazed by what the key might be that she hardly dares to believe it."],
        answer: 3,
        skill: "inferring feelings that are shown, not stated",
        explain: `<p>Mary has heard that the garden was locked ten years ago and its key buried. Now she finds an old key “which looked as if it had been buried a long time”, and she starts to put the two together: “Perhaps it has been buried for ten years … Perhaps it is the key to the garden!” Her “almost frightened” face and her whisper show how huge this moment feels. It is something she has wished for, and it seems almost too wonderful to be true, so she speaks quietly, as if a loud voice might break the spell.</p>
                  <p class="why-not">A is the trap: “frightened” makes it sound like fear of getting into trouble, but nothing in the extract suggests she is worried about being caught, and her words are full of hope, not worry. B uses a real detail (the key is “rusty”), but Mary isn’t thinking about whether it works; its age is what excites her, because it fits the ten years. C is wrong because the robin had already flown “up into a tree nearby” before she picked up the key.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><em class="speaker">Mr Patel:</em> “Our school should put a lock-up bike rack just inside the front gate, so that more students ride their bikes to school.”</p>
               <p style="margin:10px 0 0">Which one of these statements, if true, best supports Mr Patel’s claim?</p>`,
        options: ["Riding a bike to school is good exercise, and it helps students to stay fit and healthy every day.",
                  "Many students say that they would ride to school if they had a safe place to leave their bikes.",
                  "Most of the students who already ride their bikes to school live quite close to the school.",
                  "If more students rode their bikes to school, there would be fewer cars at the gate each morning."],
        answer: 1,
        skill: "choosing the statement that supports a claim (the link between the action and the goal)",
        explain: `<p>Mr Patel’s claim has two parts: the <b>action</b> (put in a lock-up bike rack) and the <b>goal</b> (more students ride to school). The best support shows that the action will lead to the goal. B does exactly that: if many students would ride once they had a safe place to leave their bikes, then a lock-up rack should mean more students ride.</p>
                  <p class="why-not">A is the trap: it is true and it is about riding bikes, but it gives a reason why riding is good, not a reason why a bike rack would make more students do it. D is also a good thing that could follow, but it is about what happens <em>after</em> more students ride, not about whether the rack will make them ride. C is about which students ride already; it says nothing about the bike rack.</p>`
      },
      {
        stem: `Four children ran lemonade stalls at the school fair. <b>Small cups cost $1</b> and <b>large cups cost $2</b>. The graph shows how many cups of each size each child sold.
               <div class="figure">${STALL_GRAPH}</div>
               <p style="margin:10px 0 0">Which child took the <b>most money</b>?</p>`,
        options: ["Ana", "Ben", "Cara", "Dev"],
        answer: 3,
        skill: "reading two sets of columns on a graph and combining them with prices",
        explain: `<p>Read both columns for each child. Each small cup brings in $1 and each large cup brings in $2, so <b>money = small cups + 2 × large cups</b>.</p>
                  <p>• Ana: 15 + 2 × 4 = 15 + 8 = <b>$23</b><br>
                     • Ben: 2 + 2 × 11 = 2 + 22 = <b>$24</b><br>
                     • Cara: 13 + 2 × 7 = 13 + 14 = <b>$27</b><br>
                     • Dev: 10 + 2 × 9 = 10 + 18 = <b>$28</b></p>
                  <p>Dev took the most money, $28.</p>
                  <p class="why-not">Cara (C) is the trap: she sold the most cups altogether (13 + 7 = 20), but a lot of them were $1 cups, so the number of cups is not the same as the money. Ana (A) has the tallest column on the graph, but it is a column of $1 cups. Ben (B) sold the most $2 cups, but he sold hardly any small cups.</p>`
      },
      {
        stem: `This net is folded to make a cube.
               <div class="figure">${NET_SVG}</div>
               <p style="margin:10px 0 0">Which cube could it make?</p>`,
        visualOptions: true,
        options: CUBE_OPTS,
        answer: 0,
        skill: "picturing which faces of a net end up opposite each other, and which way round they meet",
        explain: `<p>Two faces that end up <b>opposite</b> each other can never be seen together. First find the opposite pairs:</p>
                  <p>• The four squares in the middle row fold round into a ring, like the four walls of a room. In a ring of four, faces with one square between them end up opposite: the <b>X and the star</b> are opposite, and so are the <b>blue spot and the five dots</b>.<br>
                     • The target (above the X) and the square outline (below the star) fold over to close the two open ends of the ring, the roof and the floor, so the <b>target and the square outline</b> are opposite.</p>
                  <p><b>A</b> shows the target, the X and the blue spot. No two of these are opposite. Now check which way round they go: on the net, the target is joined to the top of the X, and the blue spot is joined to the right of the X. Hold the X facing you and fold: the target goes on top and the blue spot goes on the right, exactly as in A ✓</p>
                  <p class="why-not">B is the trap: the target and the square outline are far apart on the net and in different rows, so they don’t look like a pair, but they close the two ends of the ring, so they are opposite and can’t be seen together. C shows the X and the star together, which are an opposite pair too. D is the hardest trap: it shows the same three faces as A, but the blue spot and the X have swapped sides. With the target on top, the X must be on the left of the blue spot (as on the net), so D is a mirror image and no way of turning the cube can make it.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `An overnight train leaves at <b>8:35 pm</b> and arrives at <b>7:10 am</b> the next morning.
               <p style="margin:10px 0 0">How long is the train trip?</p>`,
        options: ["1 hour 25 minutes", "3 hours 25 minutes", "7 hours 10 minutes", "10 hours 25 minutes", "10 hours 35 minutes"],
        answer: 4,
        skill: "time: working out elapsed time across midnight",
        explain: `<p>Count on in easy steps:</p>
                  <p>• 8:35 pm to 9:00 pm = <b>25 minutes</b><br>
                     • 9:00 pm to 7:00 am = <b>10 hours</b> (3 hours to midnight, then 7 hours to 7 am)<br>
                     • 7:00 am to 7:10 am = <b>10 minutes</b></p>
                  <p>Total: 10 hours + 25 minutes + 10 minutes = <b>10 hours 35 minutes</b>.</p>
                  <p class="why-not">10 hours 25 minutes (D) is the trap: it forgets the last 10 minutes after 7:00 am. 1 hour 25 minutes (A) just takes 7:10 away from 8:35, as if both times were on the same day. 3 hours 25 minutes (B) only counts up to midnight, and 7 hours 10 minutes (C) only counts the part after midnight.</p>`
      },
      {
        stem: `The dot plot shows how many pets each student in Class 4R has. Each dot is one student.
               <div class="figure">${PET_PLOT}</div>
               <p style="margin:10px 0 4px">Here are four statements.</p>
               <ol class="facts">
                 <li>3 more students have 1 pet than have no pets.</li>
                 <li>Half of the students in the class have 2 or more pets.</li>
                 <li>The students in the class have 24 pets altogether.</li>
                 <li>No student has exactly 4 pets, but some students have more than 4.</li>
               </ol>
               <p style="margin:10px 0 0">Which statements are correct?</p>`,
        options: ["1 only", "1 and 2 only", "1 and 4 only", "1, 3 and 4 only", "1, 2 and 4 only"],
        answer: 2,
        skill: "reading a dot plot and checking statements about it",
        explain: `<p>Count the dots: 5 students have 0 pets, 8 have 1, 6 have 2, 3 have 3, none have 4 and 2 have 5. That is 5 + 8 + 6 + 3 + 0 + 2 = <b>24 students</b>.</p>
                  <p>• Statement 1: 8 − 5 = 3 ✓<br>
                     • Statement 2: 2 or more pets: 6 + 3 + 0 + 2 = 11 students. Half of 24 is 12, so this is <b>not</b> correct ✗<br>
                     • Statement 3: 24 is the number of <em>students</em> (dots), not pets. Pets: 8 × 1 + 6 × 2 + 3 × 3 + 2 × 5 = 8 + 12 + 9 + 10 = <b>39</b> ✗<br>
                     • Statement 4: the column for 4 is empty, and 2 students have 5 pets ✓</p>
                  <p>So statements <b>1 and 4 only</b> are correct.</p>
                  <p class="why-not">1, 3 and 4 (D) is the trap: it counts the dots and treats 24 as the number of pets, but a student with 3 pets is still only one dot. 1, 2 and 4 (E) is a counting slip: 11 students is close to half, but half of 24 is 12. 1 only (A) misses statement 4, perhaps thinking the empty column at 4 means nobody has more than 3. 1 and 2 only (B) makes both of those mistakes.</p>`
      },
      {
        stem: `Working on his own, Grandpa takes <b>40 minutes</b> to rake up all the leaves in the backyard. Working on her own, Ruby takes <b>120 minutes</b> to rake up all the leaves in the same backyard.
               <p style="margin:10px 0 0">If they rake together, each working at their own speed, how many minutes will it take them to rake up all the leaves?</p>`,
        options: ["20", "30", "40", "80", "160"],
        answer: 1,
        skill: "rates: two people working together",
        explain: `<p>Think about how much each person rakes in the same amount of time. 120 minutes is a good time to choose, because both 40 and 120 go into it.</p>
                  <p>• In 120 minutes, Grandpa could rake 120 ÷ 40 = <b>3 backyards</b>.<br>
                     • In 120 minutes, Ruby rakes <b>1 backyard</b>.<br>
                     • Together, in 120 minutes they could rake 3 + 1 = <b>4 backyards</b>.</p>
                  <p>So one backyard takes them 120 ÷ 4 = <b>30 minutes</b>. (Check: in 30 minutes Grandpa rakes ¾ of the leaves and Ruby rakes ¼, which makes the whole backyard ✓)</p>
                  <p class="why-not">40 (C) is the trap: it thinks working together can’t be quicker than Grandpa on his own, but Ruby’s help means Grandpa has fewer leaves to rake. 20 (A) halves Grandpa’s time, which would only be right if Ruby raked as fast as Grandpa. 80 (D) takes the average of the two times, and 160 (E) adds them, but working together should take <em>less</em> time than either person alone.</p>`
      }
    ]
  }
];
