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

/* ---- Thinking Skills Q3: two pieces, which shape can they make (turning only) ---- */
// shapes are drawn on a square grid from rows of "#" (filled) and "." (empty)
const PIECE_L = ["#.", "#.", "##"], PIECE_T = ["###", ".#."];
const L_FILL = "#f2a65a", T_FILL = "#5fb3a8", SHAPE_FILL = "#dfe6f0";
function gridSvg(rows, label, fillAt) {
  const u = 26, o = 3, W = rows[0].length, H = rows.length;
  let g = "";
  rows.forEach((r, y) => [...r].forEach((c, x) => {
    if (c !== ".") g += `<rect x="${o + x * u}" y="${o + y * u}" width="${u}" height="${u}" fill="${fillAt(c)}" stroke="${INK}" stroke-width="1.6"/>`;
  }));
  return `<svg viewBox="0 0 ${W * u + 2 * o} ${H * u + 2 * o}" width="${W * u + 2 * o}" height="${H * u + 2 * o}" role="img" aria-label="${label}">${g}</svg>`;
}
const PIECES_SVG = `<div style="display:flex;flex-wrap:wrap;gap:28px;align-items:flex-end;justify-content:center">
  <div style="text-align:center">${gridSvg(PIECE_L, "Piece 1: an L shape of four squares, a column of three squares with one more square to the right of the bottom square.", () => L_FILL)}<div>Piece 1</div></div>
  <div style="text-align:center">${gridSvg(PIECE_T, "Piece 2: a T shape of four squares, a row of three squares with one more square below the middle square.", () => T_FILL)}<div>Piece 2</div></div></div>`;
const SHAPE_OPTS = [
  [["###.", ".###", ".##."], "Shape A, three rows: a row of 3 on the left; a row of 3 on the right; then 2 squares under the second and third places."],
  [["##..", "####", "#.#."], "Shape B, three rows: 2 squares on the left; a row of 4; then squares under the first and third squares."],
  [["###.", "###.", "..##"], "Shape C, three rows: a row of 3; a row of 3; then 2 squares under the third and fourth places."],
  [["..##", "####", "##.."], "Shape D, three rows: 2 squares on the right; a row of 4; 2 squares on the left."]
].map(([rows, label]) => gridSvg(rows, label, () => SHAPE_FILL));
// shape A split into the two pieces (for the explanation): L = piece 1, T = piece 2
const SHAPE_A_SPLIT = gridSvg(["LLT.", ".LTT", ".LT."], "Shape A split into the two pieces: the L, turned upside down, fills the first two squares of the top row and the second column; the T, turned onto its side so that it points right, fills the third column and the last square of the middle row.", c => c === "L" ? L_FILL : T_FILL);

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
        stem: `Lily has these two pieces.
               <div class="figure">${PIECES_SVG}</div>
               <p style="margin:10px 0 0">She puts them together, without any gaps or overlaps, to make a new shape. She may <b>turn</b> the pieces round, but she must <b>not flip them over</b>.</p>
               <p style="margin:10px 0 0">Which shape could she make?</p>`,
        visualOptions: true,
        options: SHAPE_OPTS,
        answer: 0,
        skill: "fitting two pieces into a shape by turning them in your head (and spotting when a piece would have to be flipped)",
        explain: `<p>Every shape has 8 squares, the same as the two pieces together (4 + 4), so counting squares doesn’t help. Look for a place only one piece can go, then check what is left.</p>
                  <p><b>A</b>: the square at the far right of the middle row only touches one other square, so it has to be the T’s point (an L there would cut squares off). The T, turned so it points right, fills the third column and that square. What is left is the first two squares of the top row and the second column below them: that is the L turned upside down (a half turn). Both pieces are only turned, so A works ✓</p>
                  <div class="figure">${SHAPE_A_SPLIT}</div>
                  <p class="why-not">B is the trap: the square sticking out under the third square can only be covered by the T (pointing down), and what is left is an L shape facing the wrong way: its short foot points left instead of right. Lily would have to <b>flip</b> the L over, which isn’t allowed. C: the two squares at the bottom right can only be covered by the L standing up the right-hand side, and that leaves a 2 by 2 square, which the T can’t fill. D: wherever the T goes, it cuts off single squares in the corners, so the L can’t cover what is left.</p>`
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
