/* ---------------------------------------------------------------
   CROWN QUEST: Puzzle Peaks (thinking skills). Four options (A–D).
   --------------------------------------------------------------- */
(() => {
  const tbl = (head, rows) => `<div class="figure"><table class="grid"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map((c, i) => i ? `<td>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</table></div>`;

  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" font-size="14" fill="${INK}" ${o}>${s}</text>`;

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

  /* L1 Q1: two classes' votes */
  const VOTES = colGraph({ labels: ["Swimming", "Soccer", "Chess", "Art"], max: 10, step: 2, ylabel: "Votes",
    series: [{ name: "Class 4K", color: "#4dabf7", values: [9, 6, 4, 7] }, { name: "Class 4M", color: "#ffa94d", values: [5, 8, 4, 10] }],
    aria: "A column graph with two columns for each activity, one for Class 4K and one for Class 4M. The scale goes 0, 2, 4, 6, 8, 10. Swimming: 4K halfway between 8 and 10, 4M halfway between 4 and 6. Soccer: 4K 6, 4M 8. Chess: 4K 4, 4M 4. Art: 4K halfway between 6 and 8, 4M 10." });

  /* L1 Q4: an L-shaped tile turned a quarter turn. Cells are [row, col] in a 3 × 3 grid. */
  const L = [[0, 0], [1, 0], [2, 0], [2, 1]];
  const norm = cells => { const r0 = Math.min(...cells.map(c => c[0])), c0 = Math.min(...cells.map(c => c[1])); return cells.map(([r, c]) => [r - r0, c - c0]); };
  const cw = cells => norm(cells.map(([r, c]) => [c, 2 - r]));
  const mirror = cells => norm(cells.map(([r, c]) => [r, 2 - c]));
  const TILE_DESC = {
    start: "three squares in a column with one more square to the right of the bottom square, like a capital L",
    cw: "three squares in a row with one more square below the left-hand square",
    ccw: "three squares in a row with one more square above the right-hand square",
    half: "three squares in a column with one more square to the left of the top square",
    flip: "three squares in a column with one more square to the left of the bottom square, like a capital J",
  };
  const tile = (cells, desc, u = 26) => {
    const W = 3 * u + 6, g = cells.map(([r, c]) => `<rect x="${3 + c * u}" y="${3 + r * u}" width="${u}" height="${u}" fill="#b9e3c6" stroke="${INK}" stroke-width="2"/>`).join("");
    return `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" role="img" aria-label="A tile made of four squares: ${desc}.">${g}</svg>`;
  };
  const TILE = { start: norm(L), cw: cw(L), half: cw(cw(L)), ccw: cw(cw(cw(L))), flip: mirror(L) };

  /* L3 Q4: the net of a dice (a cross) */
  const NET = (() => {
    const u = 40, cell = (r, c, n) => `<rect x="${4 + c * u}" y="${4 + r * u}" width="${u}" height="${u}" fill="#fff3c4" stroke="${INK}" stroke-width="2"/><text x="${4 + c * u + u / 2}" y="${4 + r * u + u / 2 + 7}" font-size="21" font-weight="700" text-anchor="middle" fill="${INK}">${n}</text>`;
    const g = cell(0, 1, 1) + cell(1, 0, 2) + cell(1, 1, 3) + cell(1, 2, 4) + cell(1, 3, 5) + cell(2, 1, 6);
    return `<div class="figure"><svg viewBox="0 0 168 128" width="168" height="128" role="img" aria-label="A net of six squares in the shape of a cross. The middle row has four squares numbered 2, 3, 4, 5 from left to right. Square 1 is above square 3 and square 6 is below square 3.">${g}</svg></div>`;
  })();

  /* L4 Q4: block towers seen from above, and four possible front views */
  const PLAN = `<div class="figure"><table class="grid" style="font-weight:700"><tr><td>1</td><td>3</td><td>2</td></tr><tr><td>2</td><td>1</td><td>1</td></tr></table><div style="font-size:14px;font-weight:700;letter-spacing:2px">▲ FRONT ▲</div></div>`;
  const view = h => {
    const u = 22, H = 4 * u + 6;
    const g = h.map((n, c) => Array.from({ length: n }, (_, k) => `<rect x="${3 + c * u}" y="${H - 3 - (k + 1) * u}" width="${u}" height="${u}" fill="#c9d6f2" stroke="${INK}" stroke-width="2"/>`).join("")).join("");
    return `<svg viewBox="0 0 ${3 * u + 6} ${H}" width="${3 * u + 6}" height="${H}" role="img" aria-label="Three columns of squares side by side. From left to right they are ${h.join(", ")} squares tall.">${g}</svg>`;
  };

  /* Boss Q4: stickers table */
  const STICK = rows => tbl(["", "Mon", "Tue", "Wed", "Total"], rows);
  const F = s => `<b style="background:#fdf0dc;padding:0 4px">${s}</b>`;

  WORLDS.push({
    id: "thinking", name: "Puzzle Peaks", icon: "⛰️", color: "#7a4bb5", crown: "Summit Crown",
    blurb: "Climb through tables, codes, shapes and tricky arguments. Raven waits at the summit.",
    boss: { name: "Raven", emoji: "🦅", img: "raven", taunt: "Who dares to out-think me? My riddles have no easy answers.", defeat: "Raven folds his dark wings. “Wise… very wise,” he says, and vanishes into the storm." },
    levels: [
      {
        id: "t1", name: "Foothills",
        questions: [
          { id: "t1e", cat: "Tables & timetables",
          stem: `<p>Two classes voted for their favourite lunchtime activity. Every child had one vote.</p>${VOTES}<p>For which activity is the <b>difference</b> between the two classes’ votes the <b>greatest</b>?</p>`,
          options: ["Swimming", "Soccer", "Chess", "Art"], answer: 0,
          hint: `Don’t look for the tallest column. For each activity, find the <b>gap</b> between its two columns. A column that stops halfway between two lines is an odd number.`,
          explain: `<p>Read each pair and subtract. Swimming: 9 and 5, difference <b>4</b>. Soccer: 6 and 8, difference 2. Chess: 4 and 4, difference 0. Art: 7 and 10, difference 3. The greatest difference is for <b>Swimming</b>.</p><p class="why-not">Art has the tallest column and the most votes altogether, but the question asks about the difference. Chess is where the classes are the same.</p>` },
          { id: "t1b", cat: "Order & arrangement",
            stem: `<p>Four children ran a race.</p><div class="box">Kai finished before Lena.<br>Mo finished after Lena.<br>Nia finished before Kai.</div><p>Who came <b>third</b>?</p>`,
            options: ["Kai", "Lena", "Mo", "Nia"], answer: 1,
            hint: `Write the names in a line as you read each clue. Start with Kai and Lena, then fit Mo and Nia around them.`,
            explain: `<p>Kai is before Lena. Mo is after Lena, so the order so far is Kai, Lena, Mo. Nia is before Kai, so the full order is Nia, Kai, <b>Lena</b>, Mo. Lena came third.</p><p class="why-not">Mo came last, not third. Kai is third only if you forget that Nia finished ahead of him.</p>` },
          { id: "t1c", cat: "Rules & codes",
            stem: `<p>In a secret code, each letter is swapped for the <b>next</b> letter of the alphabet. So <b>CAT</b> is written as <b>DBU</b>.</p><p>Which word is written in the code as <b>TVO</b>?</p>`,
            options: ["UWP", "TUN", "SUN", "RUM"], answer: 2,
            hint: `TVO is already in code. To get back to the real word, go one letter <b>backwards</b> each time.`,
            explain: `<p>To decode, go back one letter: T → S, V → U, O → N. The word is <b>SUN</b>.</p><p class="why-not">UWP goes forwards again, which codes the word a second time instead of decoding it. TUN and RUM change only some letters by one step.</p>` },
          { id: "t1d", cat: "Spatial", visual: true,
            stem: `<p>This tile is given a <b>quarter turn clockwise</b> (the way a clock's hands move). It is <b>not</b> flipped over.</p><div class="figure">${tile(TILE.start, TILE_DESC.start, 30)}</div><p>What does it look like now?</p>`,
            options: [tile(TILE.cw, TILE_DESC.cw), tile(TILE.half, TILE_DESC.half), tile(TILE.flip, TILE_DESC.flip), tile(TILE.ccw, TILE_DESC.ccw)], answer: 0,
            hint: `Follow the tall part of the L. After a quarter turn clockwise, the part that pointed <b>up</b> points to the <b>right</b>, so the tile lies on its side.`,
            explain: `<p>In a quarter turn clockwise, whatever was at the top moves to the right and whatever was on the right moves to the bottom. The tall column becomes a row lying on its side, and the little foot that stuck out to the right at the bottom now hangs <b>down from the left-hand end</b>.</p><p class="why-not">The row with a square sticking <b>up</b> at the right-hand end is a quarter turn the other way (anticlockwise). The upside-down L is a half turn. The J shape is the tile flipped over, which a turn can never do.</p>` },
        ],
      },
      {
        id: "t2", name: "Misty Trail",
        questions: [
          { id: "t2a", cat: "Spot the mistake",
            stem: `<p class="box">Tia: “All four of my best friends say mango is their favourite ice-cream flavour. So mango must be the favourite flavour of the children at our school.”</p><p>Which one of these shows the mistake Tia has made?</p>`,
            options: ["Mango ice-cream may cost more than the other flavours at the shop.",
                      "Tia may like a different flavour of ice-cream from her four friends.",
                      "Tia's four friends may not like the same things as the rest of the school.",
                      "Tia's friends may also enjoy other flavours, such as chocolate, vanilla or strawberry."], answer: 2,
            hint: `Tia asked four friends, but she is talking about the <b>whole school</b>. Is that a fair jump?`,
            explain: `<p>Tia judges hundreds of children from a tiny group of four, and they are her own friends, who may well share her tastes. The rest of the school could be quite different. That is the mistake: <b>her four friends may not be like everyone else</b>.</p><p class="why-not">The cost of mango ice-cream and Tia's own favourite have nothing to do with what the school prefers. Her friends enjoying other flavours too doesn't change that mango is their favourite.</p>` },
          { id: "t2b", cat: "Supports the claim",
            stem: `<p class="box">Coach Rivera: “We should hold training in the morning instead of the afternoon. That way, the players won't get so worn out by the heat.”</p><p>Which statement, if true, best supports the coach's claim?</p>`,
            options: ["It is much cooler at the ground in the morning than in the afternoon.",
                      "Players who are worn out make more mistakes with the ball.",
                      "Most of the players say that they really enjoy coming to training.",
                      "The ground is free for the team to use in the morning and in the afternoon."], answer: 0,
            hint: `The claim is: <b>morning training → less worn out by heat</b>. Look for the fact that links mornings to heat.`,
            explain: `<p>The coach says moving to the morning will mean less heat. That only works if mornings really are cooler, and <b>the first statement says exactly that</b>.</p><p class="why-not">Tired players making mistakes explains why tiredness matters, but not why mornings would help. Enjoying training and the ground being free are true but say nothing about heat.</p>` },
          { id: "t2c", cat: "Tables & timetables",
            stem: `<p>In the long jump, each child has two jumps. Only each child's <b>best</b> jump counts.</p>${tbl(["", "Jump 1", "Jump 2"], [["Ari", "3.3 m", "3.2 m"], ["Bea", "3.5 m", "3.4 m"], ["Col", "3.7 m", "2.9 m"], ["Dan", "2.8 m", "3.6 m"]])}<p>Who came <b>second</b>?</p>`,
            options: ["Ari", "Bea", "Col", "Dan"], answer: 3,
            hint: `For each child, keep only the bigger of the two jumps and ignore the other. Then put those four numbers in order.`,
            explain: `<p>Best jumps: Ari 3.3, Bea 3.5, Col 3.7, Dan 3.6. In order: Col 3.7, <b>Dan 3.6</b>, Bea 3.5, Ari 3.3. Dan came second.</p><p class="why-not">Bea is second if you look only at Jump 1, or only at Jump 2. Col is second if you add each child's two jumps together, but only the best jump counts.</p>` },
          { id: "t2e", cat: "Supports the claim",
          stem: `<p class="box">Ms Tran, the librarian: “We should move the reading corner away from the library door. Then children will be able to concentrate on their books for longer.”</p><p>Which statement, if true, best supports Ms Tran’s claim?</p>`,
          options: ["Children who read for longer usually finish more books each term.",
                    "The spot beside the door gets the best sunlight in the afternoon.",
                    "Children in the reading corner look up every time the door opens.",
                    "Most children say the reading corner is their favourite part of the library."], answer: 2,
          hint: `The claim is: <b>away from the door → concentrate for longer</b>. Which statement shows the door is what breaks their concentration?`,
          explain: `<p>Moving the corner only helps if the <b>door</b> is the problem. If children look up every time it opens, then being further from it should mean fewer interruptions and longer concentration.</p><p class="why-not">Reading for longer being good for you explains why the goal matters, not why moving would achieve it. Good sunlight is a reason to <em>stay</em> by the door. Being the favourite spot says nothing about concentrating.</p>` },
        ],
      },
      {
        id: "t3", name: "Rocky Ridge",
        questions: [
          { id: "t3a", cat: "Whose reasoning",
            stem: `<p class="box">Pool rule: <b>Only</b> children who can swim 50 metres are allowed in the deep pool. The rule is always followed.</p><p><b>Ana:</b> “Ben is in the deep pool, so he must be able to swim 50 metres.”<br><b>Cal:</b> “Dee can swim 50 metres, so she must be in the deep pool.”</p><p>Whose reasoning is correct?</p>`,
            options: ["Ana only", "Cal only", "Both Ana and Cal", "Neither Ana nor Cal"], answer: 0,
            hint: `Being able to swim 50 metres means you are <b>allowed</b> in. Does it mean you <b>have</b> to be in?`,
            explain: `<p>The rule says who is allowed in. Ben is in the deep pool, so he must have passed the test: Ana is right. But Dee being <b>allowed</b> in doesn't mean she <b>is</b> in. She might be in the shallow pool, or at home. Cal has turned the rule around. So <b>Ana only</b>.</p><p class="why-not">Cal's mistake is treating something you <em>need</em> (swimming 50 metres) as something that <em>makes it happen</em>.</p>` },
          { id: "t3b", cat: "Spot the mistake",
            stem: `<p class="box">On Monday a school put up “Walk, don't run” posters in the playground. That week, fewer children fell over than the week before.<br><br>Mr Lee: “That proves the posters worked.”</p><p>Which one of these shows the mistake Mr Lee has made?</p>`,
            options: ["Something else may have changed that week, such as rain keeping children inside.",
                      "Running may be more fun than walking for most children.",
                      "The posters may have taken a long time to design and print.",
                      "Children may also fall over at home or at the park, where there are no posters at all."], answer: 0,
            hint: `Two things happened in the same week. Does that prove one <b>caused</b> the other? What else could explain fewer falls?`,
            explain: `<p>Fewer falls came after the posters, but that doesn't prove the posters were the reason. <b>Something else could have caused it</b>: a wet week with everyone indoors, a year group away on camp, and so on. Mr Lee has ignored other possible causes.</p><p class="why-not">How long the posters took to make and whether running is fun don't affect his argument. Falls at home or at the park aren't what the school counted.</p>` },
          { id: "t3c", cat: "Order & arrangement",
            stem: `<p>Four friends sit in a row of four seats, numbered 1 to 4 from left to right.</p><div class="box">Ravi sits in seat 4.<br>Quin sits in the seat just to the left of Pia.<br>Sol does not sit next to Ravi.</div><p>Who sits in <b>seat 2</b>?</p>`,
            options: ["Pia", "Quin", "Ravi", "Sol"], answer: 1,
            hint: `Ravi takes seat 4, so the others share seats 1, 2 and 3. Which of those seats is next to Ravi? Sol can't sit there.`,
            explain: `<p>Ravi is in seat 4. Seat 3 is next to Ravi, so Sol can't be there. Quin and Pia must sit side by side, so they need two seats together: if Sol took seat 2, they would be split. So Sol is in seat 1, then <b>Quin in seat 2</b> and Pia in seat 3.</p><p class="why-not">Pia in seat 2 would put Quin in seat 1 and Sol in seat 3, next to Ravi, which the last clue rules out.</p>` },
          { id: "t3d", cat: "Spatial",
            stem: `<p>This net is folded to make a dice.</p>${NET}<p>Which number ends up on the face <b>opposite 3</b>?</p>`,
            options: ["1", "2", "4", "5"], answer: 3,
            hint: `Squares that touch each other on the net become <b>neighbours</b> on the dice, never opposites. In a straight row of squares, the opposite face is <b>two squares along</b>.`,
            explain: `<p>Imagine wrapping the row 2, 3, 4, 5 around like a belt. Faces two squares apart in the belt end up opposite each other: 2 is opposite 4, and <b>3 is opposite 5</b>. Squares 1 and 6 fold in to become the top and bottom.</p><p class="why-not">1, 2 and 4 all touch square 3 on the net, so they share an edge with it on the dice and can't be opposite it.</p>` },
        ],
      },
      {
        id: "t4", name: "Storm Summit",
        questions: [
          { id: "t4a", cat: "Whose reasoning",
            stem: `<p class="box">A drawer holds <b>5 red</b>, <b>4 blue</b> and <b>2 yellow</b> socks, all mixed up. It is dark, so nobody can see the colours.</p><p><b>Eva:</b> “If I take out 6 socks, I am certain to get at least one red sock.”<br><b>Finn:</b> “If I take out 4 socks, I am certain to get two socks of the same colour.”</p><p>Whose reasoning is correct?</p>`,
            options: ["Eva only", "Finn only", "Both Eva and Finn", "Neither Eva nor Finn"], answer: 1,
            hint: `“Certain” means it must work even with the <b>worst luck possible</b>. For Eva, how many socks are <b>not</b> red?`,
            explain: `<p>Think of the worst luck. Eva: there are 4 + 2 = 6 socks that are not red, so her 6 socks could all be blue and yellow. She is not certain (she would need 7). Finn: there are only 3 colours, so the worst he can do with 3 socks is one of each colour, and the 4th sock must match one of them. He is certain. So <b>Finn only</b>.</p><p class="why-not">Eva's claim feels safe because red is the most common colour, but “likely” is not the same as “certain”.</p>` },
          { id: "t4b", cat: "Must or cannot be true",
            stem: `<p>One of three children broke a vase. Each of them says one thing.</p><div class="box"><b>Amy:</b> “Ben broke it.”<br><b>Ben:</b> “I didn't break it.”<br><b>Cat:</b> “I didn't break it.”</div><p><b>Exactly one</b> of these three statements is true. Who broke the vase?</p>`,
            options: ["Amy", "Ben", "Cat", "It is impossible to tell"], answer: 2,
            hint: `Test each child in turn. Pretend Amy broke it and count how many of the three statements would be true. Then try Ben, then Cat.`,
            explain: `<p>Test each child. If <b>Amy</b> broke it: Amy's statement is false, Ben's is true, Cat's is true (two true). If <b>Ben</b> broke it: Amy's is true, Ben's is false, Cat's is true (two true). If <b>Cat</b> broke it: Amy's is false, Ben's is true, Cat's is false (exactly one true ✓). So <b>Cat</b> broke the vase.</p><p class="why-not">Ben is the tempting answer because Amy names him, but then both Amy and Cat would be telling the truth, and only one statement can be true.</p>` },
          { id: "t4c", cat: "Number problems",
            stem: `<p>One fruit cup needs <b>3 strawberries</b>, <b>2 kiwi slices</b> and <b>5 grapes</b>.</p><p>Sam has 20 strawberries, 15 kiwi slices and 28 grapes. What is the <b>largest</b> number of complete fruit cups he can make?</p>`,
            options: ["5", "6", "7", "18"], answer: 0,
            hint: `Work out how many cups each fruit could make by itself. The fruit that <b>runs out first</b> decides the answer.`,
            explain: `<p>Strawberries: 20 ÷ 3 = 6 cups (2 left over). Kiwi slices: 15 ÷ 2 = 7 cups (1 left over). Grapes: 28 ÷ 5 = 5 cups (3 left over). The grapes run out first, so he can make only <b>5</b> complete cups.</p><p class="why-not">6 and 7 are how many cups the strawberries or kiwi slices could make, but there aren't enough grapes for those. 18 adds the three numbers together.</p>` },
          { id: "t4d", cat: "Spatial", visual: true,
            stem: `<p>Towers of cubes stand on a 3 by 2 grid. This plan shows the grid from <b>above</b>. Each number tells you how many cubes are stacked on that square.</p>${PLAN}<p>What do the towers look like from the <b>front</b>?</p>`,
            options: [view([2, 1, 1]), view([1, 3, 2]), view([3, 4, 3]), view([2, 3, 2])], answer: 3,
            hint: `From the front you look along each column, and you see the <b>tallest</b> tower in it. A tall tower at the back still shows above a short one in front.`,
            explain: `<p>Take each column of the plan and find its tallest tower. Left column: 1 and 2 → 2. Middle column: 3 and 1 → 3. Right column: 2 and 1 → 2. The front view is <b>2, 3, 2</b>.</p><p class="why-not">2, 1, 1 shows only the front row and forgets that the taller towers behind can be seen over the top. 1, 3, 2 shows only the back row. 3, 4, 3 adds the two towers in each column.</p>` },
        ],
      },
      {
        id: "tb", name: "Raven", boss: true,
        questions: [
          { id: "tba", cat: "Whose reasoning",
            stem: `<p class="box"><b>Most</b> of the children in Class 4K walk to school.</p><p><b>Uma:</b> “Leo is in Class 4K, so he must walk to school.”<br><b>Vik:</b> “Zara walks to school, so she is probably in Class 4K.”</p><p>Whose reasoning is correct?</p>`,
            options: ["Uma only", "Vik only", "Both Uma and Vik", "Neither Uma nor Vik"], answer: 3,
            hint: `Look hard at two words: “most” and “must”. And for Vik: the fact is about children <b>in 4K</b>. Does it say anything about all the children who walk?`,
            explain: `<p>“Most” is not “all”, so Leo <em>probably</em> walks, but Uma is wrong to say he <b>must</b>. Vik has turned the fact around: it tells us about children in 4K, not about children who walk. Hundreds of children from other classes may walk too, so Zara could be in any class. <b>Neither</b> is correct.</p><p class="why-not">Uma would be right if she had said “probably”. Vik sounds careful because he says “probably”, but his conclusion goes in the wrong direction.</p>` },
          { id: "tbb", cat: "Spot the mistake",
            stem: `<p class="box">This season the Hawks won 12 games and the Eagles won 9 games.<br><br>Tom: “The Hawks won more games, so they are clearly the better team.”</p><p>Which one of these shows the mistake Tom has made?</p>`,
            options: ["The Hawks may have played more games than the Eagles.",
                      "The Eagles may have scored plenty of goals in the games that they lost.",
                      "The two teams may train on different days of the week.",
                      "Some of the Hawks' players may have missed a game or two because of injuries."], answer: 0,
            hint: `Is comparing 12 wins with 9 wins fair? What else would you need to know about each team's season?`,
            explain: `<p>Wins can only be compared fairly if both teams played the same number of games. If the Hawks won 12 out of 20 and the Eagles won 9 out of 10, the Eagles did far better. Tom's comparison may be unfair because <b>the Hawks may have played more games</b>.</p><p class="why-not">Goals scored in losses don't change who won. Training days don't matter. Injured Hawks players would make their 12 wins more impressive, not less.</p>` },
          { id: "tbf", cat: "Order & arrangement",
            stem: `<p>Five friends stand one behind another in a queue.</p><div class="box">Ivy is at the front.<br>Gus is directly in front of Hana.<br>Hana is directly in front of Fay.<br>Eli is somewhere behind Fay.</div><p>Who is in the <b>middle</b> of the queue?</p>`,
            options: ["Eli", "Fay", "Gus", "Hana"], answer: 3,
            hint: `Two of the clues say “<b>directly</b> in front of”. Join them up: they make a block of three friends who must stand together. Where can that block go?`,
            explain: `<p>Gus is directly in front of Hana, and Hana is directly in front of Fay, so Gus, Hana, Fay stand together in that order. Ivy is at the front, so the block takes places 2–4 or places 3–5. Eli has to be behind Fay, so there must be a place left after her: the block is in places 2–4 and Eli is last. The queue is Ivy, Gus, <b>Hana</b>, Fay, Eli, and Hana is in the middle.</p><p class="why-not">Gus is in the middle only if you count from Gus instead of from Ivy at the front. Fay is in the middle if the block is pushed to the back, but then Eli would have nowhere to stand behind her.</p>` },
          { id: "tbd", cat: "Tables & timetables",
            stem: `<p>Three friends collected stickers on Monday, Tuesday and Wednesday. Some of the numbers are missing from the table.</p>${STICK([["Zed", 6, 9, "?", 22], ["Yan", 8, "?", 5, "?"], ["Xia", 4, 7, 9, 20], ["Total", 18, 26, 21, "?"]])}<p>How many stickers did <b>Yan</b> collect <b>altogether</b>?</p>`,
            options: ["10", "23", "26", "65"], answer: 1,
            hint: `Find a row or column with only <b>one</b> number missing. Yan's row has two gaps, so don't start there. Try the <b>Tuesday</b> column.`,
            explain: `<p>Find a row or column with only <b>one</b> number missing. Total − the numbers you know = the missing number. Fill it in, then look again: a new row or column may now have only one gap.</p><p><b>① Tuesday column</b>: only Yan is missing. 26 − 9 − 7 = <b>10</b>.</p><p><b>② Yan's row</b>: now only the total is missing. 8 + 10 + 5 = <b>23</b>.</p>${STICK([["Zed", 6, 9, 7, 22], ["Yan", 8, F("① 10"), 5, F("② 23")], ["Xia", 4, 7, 9, 20], ["Total", 18, 26, 21, 65]])}<p class="why-not">10 is the first number you find (Yan's Tuesday), not the answer to the question. 26 is the Tuesday total. 65 is the grand total for all three friends.</p>` },
          { id: "tbe", cat: "Spatial",
            stem: `<p>Four towns lie on a flat plain.</p><div class="box">Bay is 3 km <b>north</b> of Ash.<br>Cove is 3 km <b>east</b> of Bay.<br>Dune is 6 km <b>south</b> of Cove.</div><p>In which direction is <b>Dune from Ash</b>?</p>`,
            options: ["South-east", "South-west", "North-east", "North-west"], answer: 0,
            hint: `Sketch it: put Ash in the middle of your page, with north at the top. Dune is 6 km south of Cove, which is further than the 3 km you went north.`,
            explain: `<p>Start at Ash. Go 3 km north to Bay, then 3 km east to Cove. Now go 6 km south: the first 3 km bring you level with Ash, and the next 3 km take you below it. Dune is 3 km east and 3 km south of Ash, which is <b>south-east</b>.</p><p class="why-not">North-east is where Cove is from Ash: it forgets the last move. North-west is the direction of Ash from Dune, which is the question backwards.</p>` },
        ],
      },
    ],
  });
})();
