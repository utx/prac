/* ---------------------------------------------------------------
   CROWN QUEST: draft alternates from the Nov 2026 audit against the sample papers.
   NOT in the game yet (tools/build_game.py only reads game/content/). David is reviewing
   them; before any go in, verify by computation and run the independent cold solve.
   Same question shape as game/content/*.js.
   --------------------------------------------------------------- */
const ALT = (() => {
  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" font-size="14" fill="${INK}" ${o}>${s}</text>`;
  const tbl = (head, rows) => `<div class="figure"><table class="grid"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map((c, i) => i ? `<td>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</table></div>`;

  /* a column graph: series = [{name, color, values}], gridlines every `step` up to `max` */
  function colGraph({ labels, series, max, step, ylabel, numbers = true, aria }) {
    const W = 70 + labels.length * (series.length * 26 + 30), H = 250, y = v => 205 - v * (170 / max);
    let g = "";
    for (let v = 0; v <= max; v += step) g += `<line x1="50" x2="${W - 10}" y1="${y(v)}" y2="${y(v)}" stroke="#c5ccd8" stroke-width="1"/>` + (numbers ? T(42, y(v) + 5, v, 'text-anchor="end"') : "");
    labels.forEach((n, i) => {
      const x0 = 66 + i * (series.length * 26 + 30);
      series.forEach((s, k) => { g += `<rect x="${x0 + k * 26}" y="${y(s.values[i])}" width="24" height="${205 - y(s.values[i])}" fill="${s.color}" stroke="${INK}" stroke-width="1.5"/>`; });
      g += T(x0 + series.length * 13, 224, n, 'text-anchor="middle"');
    });
    g += `<line x1="50" x2="50" y1="${y(max)}" y2="205" stroke="${INK}" stroke-width="2"/><line x1="50" x2="${W - 10}" y1="205" y2="205" stroke="${INK}" stroke-width="2"/>`;
    g += `<text x="14" y="120" font-size="13" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">${ylabel}</text>`;
    if (series.length > 1) series.forEach((s, k) => { g += `<rect x="${60 + k * 110}" y="236" width="14" height="12" fill="${s.color}" stroke="${INK}"/>` + T(80 + k * 110, 247, s.name); });
    return `<div class="figure"><svg viewBox="0 0 ${W} ${H + (series.length > 1 ? 6 : -12)}" width="${W}" role="img" aria-label="${aria}">${g}</svg></div>`;
  }

  /* T1: two classes' votes */
  const VOTES = colGraph({ labels: ["Swimming", "Soccer", "Chess", "Art"], max: 10, step: 2, ylabel: "Votes",
    series: [{ name: "Class 4K", color: "#4dabf7", values: [9, 6, 4, 7] }, { name: "Class 4M", color: "#ffa94d", values: [5, 8, 4, 10] }],
    aria: "A column graph with two columns for each activity, one for Class 4K and one for Class 4M. The scale goes 0, 2, 4, 6, 8, 10. Swimming: 4K halfway between 8 and 10, 4M halfway between 4 and 6. Soccer: 4K 6, 4M 8. Chess: 4K 4, 4M 4. Art: 4K halfway between 6 and 8, 4M 10." });

  /* M1: picture graph */
  const book = (x, y, half) => `<rect x="${x}" y="${y}" width="${half ? 13 : 26}" height="30" rx="2" fill="#4dabf7" stroke="${INK}" stroke-width="1.5"/>` + (half ? "" : `<line x1="${x + 6}" x2="${x + 6}" y1="${y}" y2="${y + 30}" stroke="${INK}" stroke-width="1.5"/>`);
  const PICT = (() => {
    const rows = [["Monday", 3], ["Tuesday", 4.5], ["Wednesday", 2], ["Thursday", 3.5]];
    let g = "";
    rows.forEach(([d, n], i) => {
      const y = 12 + i * 42;
      g += T(92, y + 21, d, 'text-anchor="end"') + `<line x1="100" x2="100" y1="${y - 6}" y2="${y + 36}" stroke="${INK}" stroke-width="2"/>`;
      for (let k = 0; k < Math.floor(n); k++) g += book(110 + k * 32, y);
      if (n % 1) g += book(110 + Math.floor(n) * 32, y, true);
    });
    g += book(110, 186) + T(144, 207, "= 4 books");
    return `<div class="figure"><svg viewBox="0 0 290 224" width="290" role="img" aria-label="A picture graph of books borrowed. Monday: 3 book symbols. Tuesday: 4 and a half symbols. Wednesday: 2 symbols. Thursday: 3 and a half symbols. Key: one symbol = 4 books.">${g}</svg></div>`;
  })();

  /* M2: dot plot */
  const DOTS = (() => {
    const counts = [1, 3, 5, 4, 4, 2, 1];
    let g = `<line x1="20" x2="300" y1="130" y2="130" stroke="${INK}" stroke-width="2"/>`;
    counts.forEach((c, v) => {
      const x = 40 + v * 40;
      g += `<line x1="${x}" x2="${x}" y1="130" y2="136" stroke="${INK}" stroke-width="2"/>` + T(x, 152, v, 'text-anchor="middle"');
      for (let k = 0; k < c; k++) g += `<circle cx="${x}" cy="${118 - k * 22}" r="8" fill="#ff8a65" stroke="${INK}" stroke-width="1.5"/>`;
    });
    g += T(160, 172, "Goals scored", 'text-anchor="middle"');
    return `<div class="figure"><svg viewBox="0 0 320 180" width="320" role="img" aria-label="A dot plot. Each dot is one child. 0 goals: 1 dot. 1 goal: 3 dots. 2 goals: 5 dots. 3 goals: 4 dots. 4 goals: 4 dots. 5 goals: 2 dots. 6 goals: 1 dot.">${g}</svg></div>`;
  })();

  /* M4: a model of cubes, drawn from the front, above and to the right. heights[depth][col], depth 0 = front row */
  function blocks(heights, aria) {
    const u = 34, dx = 16, dy = 13, D = heights.length, C = heights[0].length, top = Math.max(...heights.flat());
    const ox = 12, oy = 20 + top * u + (D - 1) * dy;
    let g = "";
    for (let d = D - 1; d >= 0; d--) for (let c = 0; c < C; c++) for (let z = 0; z < heights[d][c]; z++) {
      const x = ox + c * u + d * dx, y = oy - (z + 1) * u - d * dy;
      g += `<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="#ffd166" stroke="${INK}" stroke-width="1.5"/>`
        + `<polygon points="${x},${y} ${x + u},${y} ${x + u + dx},${y - dy} ${x + dx},${y - dy}" fill="#ffe7a3" stroke="${INK}" stroke-width="1.5"/>`
        + `<polygon points="${x + u},${y} ${x + u + dx},${y - dy} ${x + u + dx},${y - dy + u} ${x + u},${y + u}" fill="#e0a93b" stroke="${INK}" stroke-width="1.5"/>`;
    }
    const W = ox * 2 + C * u + D * dx, H = oy + 12;
    return `<div class="figure"><svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="${aria}">${g}</svg></div>`;
  }
  const MODEL = blocks([[1, 1, 1], [3, 2, 1]], "A model made of cubes, two rows deep and three columns wide. The front row is one cube high all the way along. In the back row the left stack is three cubes high, the middle stack is two cubes high and the right stack is one cube high.");

  /* improve m2c: the rectangle, not to scale */
  const RECT = `<div class="figure"><svg viewBox="0 0 260 130" width="260" role="img" aria-label="A rectangle. The long side is labelled 8 cm. The short side is labelled with a question mark. The diagram is not to scale."><rect x="40" y="20" width="170" height="70" fill="#dff0d8" stroke="${INK}" stroke-width="2.4"/>${T(125, 14, "8 cm", 'text-anchor="middle" font-weight="700"')}${T(218, 60, "?", 'font-weight="700"')}<text x="125" y="112" font-size="13" text-anchor="middle" fill="#55607a">not to scale</text></svg></div>`;

  /* Chart Cove 1: cupcakes sold */
  const CUPCAKES = colGraph({ labels: ["Mon", "Tue", "Wed"], max: 30, step: 10, ylabel: "Cupcakes sold",
    series: [{ name: "", color: "#f783ac", values: [15, 25, 10] }],
    aria: "A column graph of cupcakes sold. The scale goes 0, 10, 20, 30. Monday's column is halfway between 10 and 20. Tuesday's column is halfway between 20 and 30. Wednesday's column reaches 10." });
  /* Chart Cove 2: shells, scale missing */
  const SHELLS = colGraph({ labels: ["Aki", "Bo"], max: 10, step: 1, ylabel: "Shells collected", numbers: false,
    series: [{ name: "", color: "#63e6be", values: [6, 9] }],
    aria: "A column graph with no numbers on its scale. There are evenly spaced lines across the graph. Aki's column reaches the 6th line above the bottom. Bo's column reaches the 9th line." });
  /* Chart Cove 3: two rain gauges with different scales */
  function gauge(x, title, labels, gaps, level, top) {
    const y = v => 190 - v * (150 / top), unit = (labels[1] - labels[0]) / gaps;
    let g = `<path d="M${x} 30 L${x} 192 Q${x} 198 ${x + 6} 198 L${x + 54} 198 Q${x + 60} 198 ${x + 60} 192 L${x + 60} 30" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
    g += `<rect x="${x + 2}" y="${y(level)}" width="56" height="${196 - y(level)}" fill="#74c0fc" opacity=".8"/>`;
    for (let v = 0; v <= top + 0.01; v += unit) {
      const big = labels.includes(Math.round(v));
      g += `<line x1="${x}" x2="${x + (big ? 22 : 12)}" y1="${y(v)}" y2="${y(v)}" stroke="${INK}" stroke-width="1.8"/>` + (big ? T(x + 66, y(v) + 5, Math.round(v) + " mm") : "");
    }
    return g + T(x + 30, 218, title, 'text-anchor="middle" font-weight="700"');
  }
  const GAUGES = `<div class="figure"><svg viewBox="0 0 330 226" width="330" role="img" aria-label="Two rain gauges. Monday's gauge is labelled 0, 10, 20 and 30 millimetres, with four small marks between each pair of labels. Its water reaches the third small mark above 10. Tuesday's gauge is labelled 0, 20 and 40 millimetres, with three small marks between each pair of labels. Its water reaches the third small mark above 20.">${gauge(20, "Monday", [0, 10, 20, 30], 5, 16, 30)}${gauge(190, "Tuesday", [0, 20, 40], 4, 35, 40)}</svg></div>`;

  const gap = n => `<b class="gapn">(${n}) ______</b>`;
  const FOSSIL = {
    title: "Fossil Beach",
    note: "Choose the word that fits each gap best.",
    html: `<p>I had always assumed that fossils belonged in museums, safely behind glass. So when my aunt, who is a geologist, ${gap(1)} that we spend Saturday searching for them on a windswept beach, I was doubtful.</p>
<p>For the first hour my doubts seemed entirely ${gap(2)}: every promising stone turned out to be just a stone. Then my aunt handed me a grey pebble that hardly ${gap(3)} from the thousands around it, except for a faint spiral on one side. “Ammonite,” she said. “About 180 million years old.”</p>
<p>I turned it over and over in my hand. After that I refused to leave the foot of the cliff until it was almost dark. By the time we caught the last bus home, I was a complete ${gap(4)}.</p>`,
  };
  const WOMBAT = {
    title: "The Animal That Makes Cubes",
    note: "Four sentences have been removed from the text. Choose the sentence (A–E) that fits each gap. One sentence is not needed.",
    html: `<p>Most animals are not fussy about the shape of their droppings. The bare-nosed wombat is the exception: it is the only animal in the world known to produce cubes. <b class="gapn">(1) …………</b> A single wombat can leave between eighty and a hundred of them in one night.</p>
<p>Wombats are short-sighted, and they find their way mostly by smell. They use their droppings as signposts, placing them on top of rocks, logs and small rises where other wombats cannot miss them. <b class="gapn">(2) …………</b> A round pellet would simply roll off.</p>
<p>For a long time, nobody could explain how a soft, round tube like an intestine could make something with flat sides and corners. Some people guessed that the wombat squeezed the cubes into shape as they left its body. <b class="gapn">(3) …………</b> When scientists finally looked inside, they found that the cubes are formed much earlier, in the last part of the intestine.</p>
<p>The secret is in the intestine’s walls. Some sections are stiff and others are stretchy. <b class="gapn">(4) …………</b> Over several days, this uneven squeezing slowly shapes the drying material into blocks with flat faces.</p>
<div class="box"><b>A</b> That turned out to be wrong.<br><b>B</b> Each one is about two centimetres across, roughly the size of a dice.<br><b>C</b> Wombats also dig long burrows, which they defend against intruders.<br><b>D</b> This is where the unusual shape proves its worth.<br><b>E</b> As the waste passes through, the stiff parts and the stretchy parts press on it with different strength.</div>`,
  };
  const LETTERS5 = ["A", "B", "C", "D", "E"];

  return {
    /* ---------- replacements: key = the id of the question (or level) being replaced ---------- */
    replaceLevel: {
      r1: {
        why: "A real cloze is a passage, not four separate sentences: some gaps can only be settled by reading on. Vocabulary is lifted to the level of the sample cloze.",
        name: "Word Glade", passage: FOSSIL,
        questions: [
          { id: "r1e", cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap 1</b>?</p>`,
            options: ["offered", "proposed", "invited", "persuaded"], answer: 1,
            hint: `Look at the words straight after the gap: “<b>that we spend</b> Saturday …”. Only one of these verbs can be followed by “that we …”.`,
            explain: `<p>You <b>propose that</b> someone does something. “My aunt proposed that we spend Saturday …” is the only one that fits the grammar.</p><p class="why-not">You offer <em>to do</em> something, you invite someone <em>to</em> something, and you persuade <em>someone</em> to do something. None of them can be followed by “that we spend”.</p>` },
          { id: "r1f", cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap 2</b>?</p>`,
            options: ["qualified", "satisfied", "justified", "classified"], answer: 2,
            hint: `Was the writer right to be doubtful at this point? Read what comes after the colon.`,
            explain: `<p>Doubts that turn out to have a good reason behind them are <b>justified</b>. Every stone was just a stone, so the doubts seemed right.</p><p class="why-not">The other words look alike but mean different things: <em>qualified</em> (trained or limited), <em>satisfied</em> (pleased, or fulfilled) and <em>classified</em> (sorted into groups).</p>` },
          { id: "r1g", cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap 3</b>?</p>`,
            options: ["differed", "separated", "contrasted", "disagreed"], answer: 0,
            hint: `The next word is “<b>from</b>”, and the pebble is being compared with other pebbles. Which verb means “was unlike” and takes “from”?`,
            explain: `<p>One thing <b>differs from</b> another. The pebble “hardly differed from” the rest: it looked almost the same.</p><p class="why-not">Things contrast <em>with</em> each other and people disagree <em>with</em> each other. “Separated from” would mean it had been moved apart, which makes no sense with “hardly”.</p>` },
          { id: "r1h", cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap 4</b>?</p>`,
            options: ["expert", "stranger", "critic", "convert"], answer: 3,
            hint: `Compare how the writer felt at the start (“I was doubtful”) with how they behave at the end. What do you call someone who has completely changed their mind?`,
            explain: `<p>A <b>convert</b> is someone who has been won over to a new belief or interest. The writer began doubtful and ended up refusing to leave the cliff: a complete change of heart. You need the whole passage to see it.</p><p class="why-not"><em>Expert</em> is tempting, but one afternoon and one fossil don’t make an expert. A <em>critic</em> is the opposite of how the writer now feels.</p>` },
        ],
      },
    },
    replace: {
      t1a: { why: "The tick table is below test level and the game needs chart reading. This is a two-series column graph, with values that fall between the gridlines.",
        q: { id: "t1e", cat: "Tables & timetables",
          stem: `<p>Two classes voted for their favourite lunchtime activity. Every child had one vote.</p>${VOTES}<p>For which activity is the <b>difference</b> between the two classes’ votes the <b>greatest</b>?</p>`,
          options: ["Swimming", "Soccer", "Chess", "Art"], answer: 0,
          hint: `Don’t look for the tallest column. For each activity, find the <b>gap</b> between its two columns. A column that stops halfway between two lines is an odd number.`,
          explain: `<p>Read each pair and subtract. Swimming: 9 and 5, difference <b>4</b>. Soccer: 6 and 8, difference 2. Chess: 4 and 4, difference 0. Art: 7 and 10, difference 3. The greatest difference is for <b>Swimming</b>.</p><p class="why-not">Art has the tallest column and the most votes altogether, but the question asks about the difference. Chess is where the classes are the same.</p>` } },
      t2d: { why: "Supports-the-claim is 13% of the sample thinking papers but only 1 of the game’s 21, while number problems are over-represented.",
        q: { id: "t2e", cat: "Supports the claim",
          stem: `<p class="box">Ms Tran, the librarian: “We should move the reading corner away from the library door. Then children will be able to concentrate on their books for longer.”</p><p>Which statement, if true, best supports Ms Tran’s claim?</p>`,
          options: ["Children who read for longer usually finish more books each term.",
                    "The spot beside the door gets the best sunlight in the afternoon.",
                    "Children in the reading corner look up every time the door opens.",
                    "Most children say the reading corner is their favourite part of the library."], answer: 2,
          hint: `The claim is: <b>away from the door → concentrate for longer</b>. Which statement shows the door is what breaks their concentration?`,
          explain: `<p>Moving the corner only helps if the <b>door</b> is the problem. If children look up every time it opens, then being further from it should mean fewer interruptions and longer concentration.</p><p class="why-not">Reading for longer being good for you explains why the goal matters, not why moving would achieve it. Good sunlight is a reason to <em>stay</em> by the door. Being the favourite spot says nothing about concentrating.</p>` } },
      m1a: { why: "Adding hundreds is a plain sum. The samples open with quick reading-a-display questions, and the game had no picture graph.",
        q: { id: "m1e", cat: "Graphs & data",
          stem: `<p>The picture graph shows how many books a class borrowed each day.</p>${PICT}<p>How many <b>more</b> books were borrowed on <b>Tuesday</b> than on <b>Wednesday</b>?</p>`,
          options: ["2", "3", "8", "10", "18"], answer: 3,
          hint: `Check the key first: one picture is not one book. What is <b>half</b> a picture worth?`,
          explain: `<p>Each picture is 4 books, so half a picture is 2. Tuesday: 4 × 4 + 2 = 18. Wednesday: 2 × 4 = 8. Difference: 18 − 8 = <b>10</b>.</p><p class="why-not">2 and 3 count pictures instead of books. 8 ignores the half picture. 18 is Tuesday’s total, not the difference.</p>` } },
      m3c: { why: "The unit-rate question is routine school arithmetic. A dot plot (in the samples, absent from the game) tests careful reading of “more than”.",
        q: { id: "m3e", cat: "Graphs & data",
          stem: `<p>Twenty children each took 6 shots at goal. The dot plot shows how many goals each child scored.</p>${DOTS}<p>How many children scored <b>more than 3</b> goals?</p>`,
          options: ["4", "7", "9", "11", "13"], answer: 1,
          hint: `“More than 3” does <b>not</b> include 3. Which columns of dots count?`,
          explain: `<p>More than 3 means 4, 5 or 6 goals. Count those dots: 4 + 2 + 1 = <b>7</b>.</p><p class="why-not">11 includes the children who scored exactly 3. 4 counts only one column. 9 is the number who scored fewer than 3, and 13 is the number who scored 3 or fewer.</p>` } },
      m4b: { why: "Sum-and-difference repeats the skill of the boss’s two-prices question. The samples include timetable questions and the game had none.",
        q: { id: "m4e", cat: "Time & timetables",
          stem: `<p>Three buses run from the Station to the Beach.</p>${tbl(["", "Bus 1", "Bus 2", "Bus 3"], [["Station", "9:10", "9:40", "10:20"], ["Market", "9:28", "9:58", "10:38"], ["Beach", "9:55", "10:25", "11:05"]])}<p>Zara takes Bus 1 and gets off at the Market. Her shopping takes <b>40 minutes</b>. Then she catches the next bus she can. What time does she reach the Beach?</p>`,
          options: ["10:08 am", "10:25 am", "10:35 am", "10:38 am", "11:05 am"], answer: 4,
          hint: `Work out when her shopping finishes. Has Bus 2 already left the Market by then?`,
          explain: `<p>She reaches the Market at 9:28 and finishes shopping at 9:28 + 40 minutes = 10:08. Bus 2 left the Market at 9:58, so she has missed it. Bus 3 leaves at 10:38 and reaches the Beach at <b>11:05 am</b>.</p><p class="why-not">10:25 is when Bus 2 arrives, but she was still shopping when it left. 10:38 is when Bus 3 <em>leaves</em> the Market. 10:08 is when her shopping ends. 10:35 adds 40 minutes to Bus 1’s arrival at the Beach.</p>` } },
      mbc: { why: "The painted 3 × 3 × 3 cube is a competition classic and harder than the samples’ cube questions. This is the sample skill: counting cubes you can’t see.",
        q: { id: "mbf", cat: "Area, perimeter & 3D",
          stem: `<p>Dev builds this model on a table. Every cube rests on the table or on another cube. There are no gaps inside.</p>${MODEL}<p>How many cubes are in the model?</p>`,
          options: ["6", "7", "8", "9", "12"], answer: 3,
          hint: `Some cubes are hidden behind or underneath others. Count stack by stack: how tall is each of the six stacks?`,
          explain: `<p>Count each stack. Front row: 1 + 1 + 1 = 3. Back row: 3 + 2 + 1 = 6. Altogether 3 + 6 = <b>9</b>.</p><p class="why-not">Smaller answers miss cubes hidden behind the front row (the bottom cubes of the back stacks). 12 imagines a full block two layers high.</p>` } },
    },
    improve: {
      m2c: { why: "Same question, with the diagram a real paper would give (marked not to scale).",
        stem: `<p>This rectangle has a <b>perimeter of 26 cm</b>. Its long sides are each <b>8 cm</b>.</p>${RECT}<p>What is its <b>area</b>?</p>` },
    },
    /* ---------- two new levels ---------- */
    newLevels: [
      { world: "maths", after: "m3", id: "m5", name: "Chart Cove",
        why: "The sample maths papers have 2–3 graph questions and 3–5 more that read a scale, thermometer or timetable, out of 35. The game had one graph and one jug. These four cover the missing kinds.",
        questions: [
          { id: "m5a", cat: "Graphs & data",
            stem: `<p>A school stall wants to sell <b>80 cupcakes</b> in four days. The graph shows the first three days.</p>${CUPCAKES}<p>How many cupcakes must the stall sell on <b>Thursday</b> to reach its target?</p>`,
            options: ["20", "30", "36", "40", "50"], answer: 1,
            hint: `Two of the columns stop <b>halfway</b> between two lines. The lines go up in 10s, so what is halfway worth?`,
            explain: `<p>Monday 15, Tuesday 25, Wednesday 10: that is 50 sold so far. To reach 80 they need 80 − 50 = <b>30</b>.</p><p class="why-not">50 is the number already sold. 40 reads the halfway columns down to 10 and 20. 20 reads them up to 20 and 30.</p>` },
          { id: "m5b", cat: "Graphs & data",
            stem: `<p>Aki and Bo collected shells. The numbers have been left off the graph’s scale, but the lines are evenly spaced and start at 0.</p>${SHELLS}<p>Together they collected <b>60 shells</b>. How many did <b>Bo</b> collect?</p>`,
            options: ["9", "24", "30", "32", "36"], answer: 4,
            hint: `Count how many lines each column reaches. How many lines is that altogether, and how many shells must one line be worth?`,
            explain: `<p>Aki’s column reaches 6 lines and Bo’s reaches 9: 15 lines for 60 shells, so each line is 60 ÷ 15 = 4 shells. Bo collected 9 × 4 = <b>36</b>.</p><p class="why-not">9 treats each line as 1 shell. 24 is Aki’s number. 30 just halves the total, but the columns are not the same height.</p>` },
          { id: "m5c", cat: "Measurement & scales",
            stem: `<p>The two gauges show how much rain fell on Monday and on Tuesday. <b>Their scales are different.</b></p>${GAUGES}<p>How much <b>more</b> rain fell on Tuesday than on Monday?</p>`,
            options: ["10 mm", "17 mm", "19 mm", "22 mm", "51 mm"], answer: 2,
            hint: `Work out what one small mark is worth on <b>each</b> gauge separately. They are not the same.`,
            explain: `<p>Monday’s gauge has 5 gaps for every 10 mm, so each small mark is 2 mm: the water is at 10 + 3 × 2 = 16 mm. Tuesday’s has 4 gaps for every 20 mm, so each mark is 5 mm: 20 + 3 × 5 = 35 mm. Difference: 35 − 16 = <b>19 mm</b>.</p><p class="why-not">10 mm comes from using the same value for the marks on both gauges. 51 mm adds instead of subtracting. 22 mm reads Monday’s marks as 1 mm each.</p>` },
          { id: "m5d", cat: "Graphs & data",
            stem: `<p>The table shows a netball competition so far. A win earns <b>3 points</b>, a draw earns <b>1 point</b> and a loss earns none.</p>${tbl(["Team", "Played", "Won", "Drawn", "Lost"], [["Reds", 8, 5, 1, 2], ["Blues", 8, 4, 4, 0], ["Greens", 7, 4, 1, 2], ["Golds", 8, 2, 3, 3]])}<div class="box">1. The Reds have more points than the Blues.<br>2. The Blues have not lost a game.<br>3. If the Greens win their next game, they will have as many points as the Reds.</div><p>Which statements are correct?</p>`,
            options: ["1 only", "2 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], answer: 3,
            hint: `Work out each team’s points first: wins × 3, plus draws. More wins doesn’t always mean more points.`,
            explain: `<p>Points: Reds 5 × 3 + 1 = 16. Blues 4 × 3 + 4 = 16. Greens 4 × 3 + 1 = 13. Statement 1: 16 and 16 are equal, so not correct. Statement 2: the Blues’ “Lost” column is 0, correct. Statement 3: 13 + 3 = 16, the same as the Reds, correct. So <b>2 and 3 only</b>.</p><p class="why-not">Statement 1 looks right because the Reds have more wins, but the Blues’ four draws make up the difference.</p>` },
        ] },
      { world: "reading", after: "r4", id: "r5", name: "The Missing Lines", passage: WOMBAT, five: true,
        why: "Missing sentences are 6 of the 33 questions in every sample reading paper, and the game had none. Each gap turns on a different clue: a reference word, a general point before its example, a correction, and an explanation.",
        questions: [
          { id: "r5a", cat: "Sentence links", stem: `<p>Which sentence fits <b>gap 1</b>?</p>`, options: LETTERS5, answer: 1,
            hint: `The sentence after the gap says “a hundred of <b>them</b>”. The missing sentence must also be about the cubes themselves.`,
            explain: `<p><b>B</b>. “Each one” points back to the cubes just mentioned and tells us their size; the next sentence carries on with how many “of them” there are.</p><p class="why-not">A (“That turned out to be wrong”) would cancel the fact just given, but the text carries on as if it is true. C changes the subject to burrows.</p>` },
          { id: "r5b", cat: "Sentence links", stem: `<p>Which sentence fits <b>gap 2</b>?</p>`, options: LETTERS5, answer: 3,
            hint: `Read the sentence after the gap: “A round pellet would simply roll off.” What idea is that an example of?`,
            explain: `<p><b>D</b>. The droppings are placed on top of rocks and logs. “This is where the unusual shape proves its worth” makes the general point, and “A round pellet would simply roll off” is the proof: cubes stay put.</p><p class="why-not">B is also about the droppings, but their size doesn’t explain why a round one would roll off. E is about the intestine, which hasn’t been mentioned yet.</p>` },
          { id: "r5c", cat: "Sentence links", stem: `<p>Which sentence fits <b>gap 3</b>?</p>`, options: LETTERS5, answer: 0,
            hint: `Before the gap: what “some people guessed”. After it: what scientists “finally” found. What usually comes between a guess and the real answer?`,
            explain: `<p><b>A</b>. “That” points back to the guess (cubes squeezed into shape on the way out). The next sentence gives the real answer: they are formed “much earlier”. A short correction joins the two.</p><p class="why-not">E explains how the cubes are really made, which belongs after we are told about the stiff and stretchy sections. D is about the shape being useful, not about how it is made.</p>` },
          { id: "r5d", cat: "Sentence links", stem: `<p>Which sentence fits <b>gap 4</b>?</p>`, options: LETTERS5, answer: 4,
            hint: `The sentence after the gap mentions “<b>this uneven squeezing</b>”. Which sentence describes squeezing that is uneven?`,
            explain: `<p><b>E</b>. The stiff parts and stretchy parts “press on it with different strength”: that is the “uneven squeezing” the last sentence refers to.</p><p class="why-not">C is the sentence that is never used: it is about wombats, but nothing around any gap is about burrows. D’s “unusual shape” has already been dealt with in the second paragraph.</p>` },
        ] },
    ],
  };
})();
if (typeof module !== "undefined") module.exports = ALT;
