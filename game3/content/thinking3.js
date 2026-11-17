/* ---------------------------------------------------------------
   STORM ISLAND: third set of thinking questions (Nov 2026). Four options (A–D).
   New kinds of question: a secret passed on at meetings, tiles turned and flipped,
   counting triangles, a moving-dot picture pattern, the view from the front,
   a round table, a Venn diagram, a timetable with limits.
   tier 1–3 = storm circle 1–3; tier 4 = the boss.
   --------------------------------------------------------------- */
(() => {
  const { tbl, fig, T, blocks, plan, towers } = LIB;
  const WHO = (a, b) => [`${a} only`, `${b} only`, `Both ${a} and ${b}`, `Neither ${a} nor ${b}`];

  /* a 3 × 3 tile of letters */
  const TILE = (() => {
    const L = ["A", "B", "C", "D", "E", "F", "G", "H", "I"], u = 46;
    let g = `<rect x="8" y="8" width="${3 * u}" height="${3 * u}" fill="#fff3bf" stroke="${INK}" stroke-width="3"/>`;
    for (let k = 1; k < 3; k++) g += `<line x1="${8 + k * u}" x2="${8 + k * u}" y1="8" y2="${8 + 3 * u}" stroke="${INK}" stroke-width="1.5"/><line y1="${8 + k * u}" y2="${8 + k * u}" x1="8" x2="${8 + 3 * u}" stroke="${INK}" stroke-width="1.5"/>`;
    L.forEach((l, i) => { g += T(8 + (i % 3) * u + u / 2, 8 + Math.floor(i / 3) * u + u / 2 + 8, l, 'text-anchor="middle" font-size="22" font-weight="700"'); });
    return fig(`<svg viewBox="0 0 ${3 * u + 16} ${3 * u + 16}" width="160" role="img" aria-label="A square tile with three rows of letters. Top row: A, B, C. Middle row: D, E, F. Bottom row: G, H, I.">${g}</svg>`);
  })();

  /* a big triangle with two lines from the top corner down to the base */
  const TRI = fig(`<svg viewBox="0 0 300 220" width="280" role="img" aria-label="A large triangle. From its top corner, two straight lines go down to the bottom side, splitting the triangle into three thin triangles side by side."><polygon points="150,14 20,204 280,204" fill="#d0ebff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><line x1="150" y1="14" x2="110" y2="204" stroke="${INK}" stroke-width="3"/><line x1="150" y1="14" x2="196" y2="204" stroke="${INK}" stroke-width="3"/></svg>`);

  /* a square with a dot in one corner and a line through the middle */
  const DOT = [[16, 16], [64, 16], [64, 64], [16, 64]];
  const sq = (c, a, w = 80) => { const r = 26, rad = a * Math.PI / 180, dx = Math.sin(rad) * r, dy = -Math.cos(rad) * r;
    return `<svg viewBox="0 0 80 80" width="${w}" role="img" aria-label="A square with a dot in the ${["top left", "top right", "bottom right", "bottom left"][c]} corner and a line through the middle that is ${{ 0: "upright", 45: "sloping up to the right", 90: "flat", 135: "sloping down to the right" }[a % 180]}."><rect x="4" y="4" width="72" height="72" fill="#fff" stroke="${INK}" stroke-width="3"/><line x1="${40 - dx}" y1="${40 - dy}" x2="${40 + dx}" y2="${40 + dy}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><circle cx="${DOT[c][0]}" cy="${DOT[c][1]}" r="8" fill="#e5484d" stroke="${INK}" stroke-width="2"/></svg>`; };
  const SEQ = `<div class="figure" style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap">${[0, 1, 2, 3].map(i => sq(i, 45 * i, 70)).join("")}<b style="font-size:28px">?</b></div>`;

  /* front views drawn as columns of squares */
  const front = (h, label) => { const u = 22, W = h.length * u + 8, H = 3 * u + 8; let g = `<line x1="2" x2="${W - 2}" y1="${H - 4}" y2="${H - 4}" stroke="${INK}" stroke-width="2"/>`;
    h.forEach((c, x) => { for (let k = 0; k < c; k++) g += `<rect x="${4 + x * u}" y="${H - 4 - (k + 1) * u}" width="${u}" height="${u}" fill="#c9d6f2" stroke="${INK}" stroke-width="1.5"/>`; });
    return `<svg viewBox="0 0 ${W} ${H}" width="${W * 1.6}" role="img" aria-label="${label}: columns of squares ${h.join(", ")} high, from left to right.">${g}</svg>`; };
  const ROWS = [[1, 3, 1], [2, 1, 0], [3, 1, 2]];

  /* a Venn diagram */
  const VENN = fig(`<svg viewBox="0 0 330 200" width="320" role="img" aria-label="A rectangle labelled Class 4R. Inside it are two overlapping circles, Plays sport and Plays music. 7 is in the sport circle only, 4 is in the overlap, 6 is in the music circle only, and 3 is inside the rectangle but outside both circles."><rect x="4" y="4" width="322" height="192" rx="8" fill="#fff" stroke="${INK}" stroke-width="2.5"/>${T(14, 26, "Class 4R", 'font-weight="700"')}<circle cx="125" cy="112" r="68" fill="#4dabf7" fill-opacity=".35" stroke="${INK}" stroke-width="2.5"/><circle cx="205" cy="112" r="68" fill="#ffa94d" fill-opacity=".35" stroke="${INK}" stroke-width="2.5"/>${T(85, 40, "Plays sport", 'font-size="14" font-weight="700" text-anchor="middle"')}${T(248, 40, "Plays music", 'font-size="14" font-weight="700" text-anchor="middle"')}${T(95, 120, "7", 'font-size="24" font-weight="700" text-anchor="middle"')}${T(165, 120, "4", 'font-size="24" font-weight="700" text-anchor="middle"')}${T(235, 120, "6", 'font-size="24" font-weight="700" text-anchor="middle"')}${T(302, 180, "3", 'font-size="24" font-weight="700" text-anchor="middle"')}</svg>`);

  THINKING.push(
    /* ===================== circle 1 ===================== */
    { id: "v101", tier: 1, cat: "Supports the claim",
      stem: `<div class="box">Mrs Lane: “The school should open the library for half an hour before the bell. Then more children will read every day.”</div><p>Which statement, if true, best supports Mrs Lane’s claim?</p>`,
      options: ["The library has just bought a lot of new books.", "Children who read every day get better at spelling.", "Many children arrive early and have nothing to do until the bell.", "The librarian is happy to come in half an hour early every school day."], answer: 2,
      explain: `<p>The claim says opening early will lead to <i>more reading</i>. That only works if there are children who would use the time. If <b>many arrive early with nothing to do</b>, an open library gives them somewhere to read.</p><p class="why-not">New books would be there whatever time the library opens. Better spelling is what reading leads to, not a reason more children will read. The librarian being willing makes the plan possible, but doesn’t show children will come.</p>` },
    { id: "v102", tier: 1, cat: "Spot the mistake",
      stem: `<div class="box">Leo asked the three other children at his lunch table about the new canteen menu. All three said they love it.<br>Leo: “So everyone at our school loves the new menu.”</div><p>Which one of these shows the mistake Leo has made?</p>`,
      options: ["Leo may not have tried the new menu himself yet.", "Children at other tables may not feel the same way.", "The canteen may change the menu again next term.", "The three children may have bought lunch from home."], answer: 1,
      explain: `<p>Leo has judged the <b>whole school</b> from <b>three children</b> at his own table. His friends may like the same things as him; children at other tables may not.</p><p class="why-not">Whether Leo has tried it, or the menu changes later, doesn’t touch his reasoning. And the three children said they love it, so where their lunch came from today doesn’t matter.</p>` },
    { id: "v103", tier: 1, cat: "Tables & timetables",
      stem: `<p>At the start of the day, only <b>Ana</b> knows a secret. Whenever someone who knows it meets someone who doesn’t, they pass it on. The meetings happen in this order:</p>${tbl(["Meeting", "Who meets"], [["First", "Ana and Ben"], ["Second", "Cal and Dee"], ["Third", "Ben and Cal"], ["Fourth", "Eli and Ana"], ["Fifth", "Dee and Fay"]])}<p>Who does <b>not</b> know the secret at the end of the day?</p>`,
      options: ["Fay only", "Dee and Fay", "Cal, Dee and Fay", "Nobody: they all know it"], answer: 1,
      explain: `<p>Go through the meetings in order, keeping a list of who knows:</p><p>First: Ana tells Ben (Ana, Ben). Second: Cal and Dee meet, but <b>neither knows yet</b>. Third: Ben tells Cal. Fourth: Ana tells Eli. Fifth: Dee and Fay meet, but Dee still doesn’t know.</p><p>So <b>Dee and Fay</b> never hear it.</p><p class="why-not">“Fay only” forgets that Dee met Cal <i>before</i> Cal knew. “Cal, Dee and Fay” misses that Ben told Cal at the third meeting. “Nobody” ignores the order completely.</p>` },
    { id: "v104", tier: 1, cat: "Spatial",
      stem: `<p>This tile is turned a <b>quarter turn clockwise</b> (the way a clock’s hands move).</p>${TILE}<p>Which letter is now in the <b>top left</b> corner?</p>`,
      options: ["A", "C", "G", "I"], answer: 2,
      explain: `<p>In a quarter turn clockwise, the left side swings up to become the top. So the left column, G-D-A from bottom to top, becomes the new top row from left to right: <b>G</b>, D, A.</p><p>Check with a corner: A was top left and moves round to top right; G was bottom left and moves up to top left.</p><p class="why-not">C would come to the top left after a quarter turn the other way (anticlockwise). I would be there after a half turn. A is where it started.</p>` },
    { id: "v105", tier: 1, cat: "Spatial",
      stem: `<p>How many triangles of any size can you find in this picture?</p>${TRI}`,
      options: ["3", "4", "5", "6"], answer: 3,
      explain: `<p>Count by size. There are <b>3</b> small triangles, <b>2</b> made of two small ones side by side, and <b>1</b> big one made of all three: 3 + 2 + 1 = <b>6</b>.</p><p>Another way: every triangle uses the bottom side and two of the four lines from the top corner. There are 6 ways to choose two of four lines.</p><p class="why-not">3 counts only the small ones, and 4 adds just the big one. 5 misses one of the middle-sized pairs.</p>` },
    { id: "v106", tier: 1, cat: "Order & arrangement",
      stem: `<p>Five runners finished a race, one after another.</p><div class="box">Gus finished before Hal but after Ivy.<br>Jo finished straight after Hal.<br>Kim finished last.</div><p>Who came <b>second</b>?</p>`,
      options: ["Ivy", "Gus", "Hal", "Jo"], answer: 1,
      explain: `<p>Ivy is before Gus, and Gus is before Hal: Ivy, Gus, Hal. Jo comes straight after Hal, and Kim is last: Ivy, <b>Gus</b>, Hal, Jo, Kim.</p><p class="why-not">Ivy came first. Hal and Jo came third and fourth. Reading the names in the order the clues mention them (Gus first) gives the wrong order.</p>` },
    { id: "v107", tier: 1, cat: "Must or cannot be true",
      stem: `<p>A bag holds 10 marbles. <b>4</b> of them are red and the rest are blue. Jay takes out <b>5</b> marbles without looking.</p><p>Which one of these <b>cannot</b> be true?</p>`,
      options: ["All five of Jay’s marbles are red.", "None of Jay’s marbles are red.", "Four of Jay’s marbles are red.", "Jay has more red marbles than blue."], answer: 0,
      explain: `<p>There are only 4 red marbles in the bag, so Jay <b>can’t</b> have 5 red ones.</p><p class="why-not">There are 6 blue marbles, so all 5 could be blue (no red). He could take all 4 red ones and one blue. 3 red and 2 blue gives more red than blue. All of those can happen.</p>` },

    /* ===================== circle 2 ===================== */
    { id: "v201", tier: 2, cat: "Whose reasoning",
      stem: `<div class="box">Most of the shells on Sandy Bay beach are white. Lia picks up one shell from the beach without looking.</div><p>Ana: “Lia’s shell is probably white.”</p><p>Ben: “Lia’s shell must be white.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Ana", "Ben"), answer: 0,
      explain: `<p>“Most” means more than half, so a shell picked at random is <b>probably</b> white: <b>Ana</b> is right.</p><p class="why-not">“Most” is not “all”. Some shells on the beach are other colours, and Lia could have picked one of them, so Ben can’t say it <i>must</i> be white.</p>` },
    { id: "v202", tier: 2, cat: "Spot the mistake",
      stem: `<div class="box">To get a merit award in the maths challenge, you need a score of at least 80.<br>Rani scored 92.<br>Rani: “So I am definitely getting a merit award.”</div><p>Which one of these shows the mistake Rani has made?</p>`,
      options: ["Other children in the challenge may have scored even more than 92.", "A score of 80 may not be all you need for a merit award.", "Rani may have found some of the questions easy.", "The maths challenge may be harder next year."], answer: 1,
      explain: `<p>The rule says 80 is <b>needed</b>. It doesn’t say 80 is <i>enough</i>. There may be other conditions too, such as handing in the work on time. Rani has treated something needed as a <b>guarantee</b>.</p><p class="why-not">Other scores don’t matter unless awards are limited, which the rule doesn’t say. How easy the questions were and next year’s challenge don’t affect her reasoning.</p>` },
    { id: "v203", tier: 2, cat: "Supports the claim",
      stem: `<div class="box">Ranger Bo: “Bread is bad for ducks. We should put up signs at the pond asking people not to feed them bread. Then far fewer ducks will be fed bread.”</div><p>Which statement, if true, best supports Ranger Bo’s claim?</p>`,
      options: ["Some visitors to the pond feed the ducks seeds instead of bread.", "Ducks also eat water plants, seeds and insects.", "Most people who feed ducks bread don’t know it harms them.", "Many families visit the pond on the weekend."], answer: 2,
      explain: `<p>The claim is that <b>signs</b> will stop people feeding bread. That will only work if people would change once they knew. If <b>most of them don’t know it harms ducks</b>, a sign telling them should make a big difference.</p><p class="why-not">Visitors who already feed seeds won’t change. What else ducks eat, and how busy the pond is, don’t show that the signs will change what people do.</p>` },
    { id: "v204", tier: 2, cat: "Tables & timetables",
      stem: `<p>Zara wants to do all three after-school activities, each on a <b>different</b> day.</p>${tbl(["", "Monday", "Tuesday", "Wednesday", "Thursday"], [["Swimming", "4:00–5:00", "–", "4:30–5:30", "–"], ["Art", "–", "3:30–4:30", "4:00–5:00", "3:30–4:30"], ["Chess", "3:30–4:30", "4:00–5:00", "–", "–"]])}<p>She also has a piano lesson every <b>Monday from 4:00 to 4:45</b>.</p><p>On which day will Zara do art?</p>`,
      options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 3,
      explain: `<p>Start with Monday: swimming and chess both clash with piano, so Zara does nothing on Monday.</p><p>Then <b>swimming</b> must be on Wednesday, its only other day. <b>Chess</b> must be on Tuesday, its only other day. That leaves <b>art</b> on <b>Thursday</b>.</p><p class="why-not">Art does run on Tuesday and Wednesday, but those days are needed for chess and swimming. Start with the activity that has the fewest choices. Art never runs on Monday.</p>` },
    { id: "v205", tier: 2, cat: "Rules & codes", visual: true,
      stem: `<p>These pictures follow a pattern.</p>${SEQ}<p>Which picture comes next?</p>`,
      options: [sq(1, 0), sq(0, 45), sq(0, 0), sq(3, 135)], answer: 2,
      explain: `<p>Two things change. The red dot moves <b>one corner clockwise</b> each time: top left, top right, bottom right, bottom left. Next it goes back to the <b>top left</b>.</p><p>The line turns an eighth of a turn clockwise each time: upright, sloping, flat, sloping the other way. One more eighth turn makes it <b>upright</b> again.</p><p class="why-not">The picture with the dot top right moves it one corner too far. The one with the line sloping up to the right has the dot right but the line wrong. The last one just copies the fourth picture.</p>` },
    { id: "v206", tier: 2, cat: "Tables & timetables",
      stem: `<p>Entry prices at a swimming pool:</p>${tbl(["Ticket", "Price"], [["Adult", "$8"], ["Child", "$5"], ["Family pass: 2 adults and up to 3 children", "$22"]])}<p>What is the <b>cheapest</b> way for 2 adults and <b>4 children</b> to get in?</p>`,
      options: ["$22", "$27", "$36", "$44"], answer: 1,
      explain: `<p>A family pass covers 2 adults and 3 children for $22. The 4th child needs a child ticket: $22 + $5 = <b>$27</b>.</p><p>Check the other ways: all single tickets cost 2 × $8 + 4 × $5 = $36, and two family passes cost $44. $27 is cheapest.</p><p class="why-not">$22 forgets the fourth child. $36 ignores the family pass, and $44 buys two passes when one child ticket is enough.</p>` },
    { id: "v207", tier: 2, cat: "Number problems",
      stem: `<p>Five friends each send a birthday card to <b>every one</b> of the other four.</p><p>How many cards are sent altogether?</p>`,
      options: ["10", "16", "20", "25"], answer: 2,
      explain: `<p>Each of the 5 friends sends 4 cards: 5 × 4 = <b>20</b>.</p><p class="why-not">10 would be right for handshakes, where one handshake is shared by two people. But Ana sending a card to Ben and Ben sending one to Ana are <i>two</i> cards. 25 counts each friend sending a card to themselves too, and 16 is 4 × 4.</p>` },

    /* ===================== circle 3 ===================== */
    { id: "v301", tier: 3, cat: "Whose reasoning",
      stem: `<div class="box">To borrow books from the town library you must have a library card. Cards are only given to people who live in the town.</div><p>Ana: “Zoe lives in the town, so she can borrow books from the library.”</p><p>Ben: “Yan borrowed a book from the library, so he must live in the town.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Ana", "Ben"), answer: 1,
      explain: `<p>Follow the rules back from Yan: he borrowed a book, so he has a card; he has a card, so he lives in the town. <b>Ben</b> is right.</p><p class="why-not">Living in the town is <b>needed</b> for a card, but it doesn’t give you one. Zoe may never have got a card, so Ana can’t say she can borrow books.</p>` },
    { id: "v302", tier: 3, cat: "Spot the mistake",
      stem: `<div class="box">For the school fete, class 4A raised $120 and class 4B raised $90.<br>Theo: “That shows the children in 4A tried harder than the children in 4B.”</div><p>Which one of these shows the mistake Theo has made?</p>`,
      options: ["4A may have many more children than 4B.", "The weather may have been sunny on the day of the fete.", "4B may raise more money at next year’s fete.", "Both classes may have wanted to buy sports gear."], answer: 0,
      explain: `<p>Theo compares the two totals as if the classes were the same size. If 4A has <b>many more children</b>, it could raise more even if each child tried less hard. It isn’t a fair comparison.</p><p class="why-not">The weather was the same for both classes, and next year or what they want to buy doesn’t change this year’s comparison.</p>` },
    { id: "v303", tier: 3, cat: "Supports the claim",
      stem: `<div class="box">Mr Bell: “Children should get a two-minute break to stand and stretch every half hour. Then they will make fewer careless mistakes in their work.”</div><p>Which statement, if true, best supports Mr Bell’s claim?</p>`,
      options: ["Most children enjoy getting up and moving around.", "Children who make fewer mistakes usually get better marks.", "Stretching every day helps children to grow up strong and healthy.", "Children who sit still for a long time find it harder to focus."], answer: 3,
      explain: `<p>Mr Bell links breaks to <b>fewer careless mistakes</b>. Careless mistakes come from losing focus. If sitting still for a long time makes it <b>harder to focus</b>, regular breaks should help.</p><p class="why-not">Enjoying it isn’t about mistakes. Better marks are what fewer mistakes lead to, not why breaks cause fewer mistakes. Health is a different benefit.</p>` },
    { id: "v304", tier: 3, cat: "Order & arrangement",
      stem: `<p>Six friends sit around a round table, evenly spaced: Ana, Ben, Cal, Dee, Eve and Fin.</p><div class="box">Ana sits directly opposite Ben.<br>Dee sits next to Ben and next to Cal.<br>Fin sits next to Ana but not next to Cal.</div><p>Who sits directly opposite Cal?</p>`,
      options: ["Ben", "Dee", "Eve", "Fin"], answer: 2,
      explain: `<p>Put Ana at the top and Ben at the bottom. Dee is next to Ben, on one side; Cal is next to Dee, so Cal is next to Ana on that same side.</p><p>Fin is next to Ana but not next to Cal, so Fin is on Ana’s other side. Eve takes the last seat, next to Ben. Going round: Ana, Cal, Dee, Ben, <b>Eve</b>, Fin. Cal and Eve are directly opposite.</p><p class="why-not">Dee is next to Cal, not opposite. Ben is opposite Ana. Fin is opposite Dee. (If you put Dee on Ben’s other side, everything flips, but Eve is still opposite Cal.)</p>` },
    { id: "v305", tier: 3, cat: "Spatial", visual: true,
      stem: `<p>Towers of cubes stand on a board. The plan shows how many cubes are in each tower.</p>${plan(ROWS)}${fig(blocks(towers(ROWS), { u: 28, aria: "The towers of cubes on the board, drawn from the front and a little to the side." }))}<p>Which picture shows what you see when you look at the towers from the <b>front</b>?</p>`,
      options: [front([3, 1, 2], "Option A"), front([3, 3, 2], "Option B"), front([2, 3, 3], "Option C"), front([1, 3, 1], "Option D")], answer: 1,
      explain: `<p>From the front, each column shows its <b>tallest</b> tower, because shorter towers hide behind it. Left column: towers 1, 2 and 3, tallest 3. Middle: 3, 1 and 1, tallest 3. Right: 1, 0 and 2, tallest 2. So the view is <b>3, 3, 2</b>.</p><p class="why-not">The first picture (3, 1, 2) shows only the front row, forgetting the tall tower behind. The third (2, 3, 3) is the view from the back, which is a mirror image. The last (1, 3, 1) shows only the back row.</p>` },
    { id: "v307", tier: 3, cat: "Number problems",
      stem: `<p>A snail is at the bottom of a well that is <b>10 metres</b> deep. Every day it climbs <b>3 m</b> up, and every night it slides <b>2 m</b> back down.</p><p>On which day does the snail reach the top?</p>`,
      options: ["Day 5", "Day 7", "Day 8", "Day 10"], answer: 2,
      explain: `<p>Each whole day and night, the snail gains 1 m. After 7 days and nights it is 7 m up. On <b>day 8</b> it climbs 3 m, from 7 m to 10 m, and reaches the top before it can slide back.</p><p class="why-not">Day 10 counts 1 m every day and forgets that the last climb doesn’t slip back. Day 5 divides 10 by 2. Day 7 stops one day early: after day 7’s climb the snail is only at 9 m.</p>` },
    { id: "v308", tier: 3, cat: "Rules & codes",
      stem: `<p>In a secret code, a word is written <b>backwards</b>, and then every vowel is changed to the <b>next vowel</b>:</p><div class="box">a → e &nbsp; e → i &nbsp; i → o &nbsp; o → u &nbsp; u → a</div><p>For example, STORM is written MRUTS.</p><p>How is <b>CLOUD</b> written in the code?</p>`,
      options: ["DAULC", "DUOLC", "CLUAD", "DAOLC"], answer: 0,
      explain: `<p>Backwards, CLOUD is D-U-O-L-C. Now change the vowels: U becomes A and O becomes U. That gives <b>DAULC</b>.</p><p class="why-not">DUOLC is only written backwards, and CLUAD only has its vowels changed. DAOLC changes the U but forgets the O.</p>` },
    { id: "v309", tier: 3, cat: "Tables & timetables",
      stem: `<p>The diagram shows the children in class 4R.</p>${VENN}<div class="box">1. 11 children play sport.<br>2. More children play music than play sport.<br>3. There are 20 children in the class.</div><p>Which statements are true?</p>`,
      options: ["1 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"], answer: 1,
      explain: `<p>1. Sport: 7 + 4 = 11. <b>True</b> (the 4 in the middle play both).</p><p>2. Music: 6 + 4 = 10, fewer than 11. False.</p><p>3. 7 + 4 + 6 + 3 = 20. <b>True</b>: the 3 outside the circles are in the class too.</p><p class="why-not">“1 only” forgets the 3 children outside both circles (7 + 4 + 6 = 17). Statement 2 looks true if you compare 6 with 7 and forget the 4 in the middle belong to both circles.</p>` },
    { id: "v310", tier: 3, cat: "Spatial",
      stem: `<p>Look at the letter tile below. It is turned a <b>quarter turn clockwise</b>, and then <b>flipped over from left to right</b>, like turning the page of a book.</p>${TILE}<p>Where does the letter <b>C</b> end up?</p>`,
      options: ["Top left", "Top right", "Bottom left", "Bottom right"], answer: 2,
      explain: `<p>Follow the corner C. A quarter turn clockwise takes the top right corner to the <b>bottom right</b>. Flipping from left to right swaps left and right, so it ends in the <b>bottom left</b>.</p><p class="why-not">Bottom right is where C is after the turn only, forgetting the flip. Top left is where the flip alone would take it. Top right is where it started.</p>` },

    /* ===================== boss ===================== */
    { id: "v401", tier: 4, cat: "Must or cannot be true",
      stem: `<div class="box">At camp, every child who went canoeing also went swimming.<br>Nobody who went swimming went on the cave walk.<br>Rosa went on the cave walk.</div><p>Which one of these <b>must</b> be true?</p>`,
      options: ["Rosa went swimming.", "Rosa did not go canoeing.", "Everyone who went swimming also went canoeing.", "Rosa went canoeing but not swimming."], answer: 1,
      explain: `<p>Rosa went on the cave walk, so she <b>didn’t swim</b>. Everyone who canoed also swam, so she <b>can’t have canoed</b> either.</p><p class="why-not">Rosa can’t have gone swimming. The first rule doesn’t work backwards: some swimmers may never have canoed. And nobody canoed without swimming.</p>` },
    { id: "v402", tier: 4, cat: "Spatial",
      stem: `<p>A robot stands on a grid, facing <b>north</b>. It follows these steps:</p><div class="box">Turn right, go forward 3 squares.<br>Turn left, go forward 2 squares.<br>Turn left, go forward 5 squares.<br>Turn left, go forward 2 squares.</div><p>Where does the robot finish?</p>`,
      options: ["Back where it started", "2 squares east of the start", "2 squares west of the start", "8 squares west of the start"], answer: 2,
      explain: `<p>Track the direction after each turn. Right from north is <b>east</b>: 3 east. Left from east is <b>north</b>: 2 north. Left from north is <b>west</b>: 5 west, so 2 west of the start. Left from west is <b>south</b>: 2 south, back level with the start.</p><p>It ends <b>2 squares west</b> of where it started.</p><p class="why-not">East comes from treating the 5 squares west as east. 8 west adds the 3 and the 5 instead of taking 3 from 5. “Back where it started” notices the north and south cancel but forgets the east and west don’t.</p>` },
    { id: "v403", tier: 4, cat: "Number problems",
      stem: `<div class="box">3 apples and 1 pear weigh 500 g.<br>1 apple and 1 pear weigh 260 g.</div><p>All the apples weigh the same. How much does the <b>pear</b> weigh?</p>`,
      options: ["20 g", "120 g", "140 g", "240 g"], answer: 2,
      explain: `<p>Compare the two lines. The first has <b>2 more apples</b> and weighs 500 − 260 = 240 g more. So 2 apples weigh 240 g and one apple weighs 120 g.</p><p>Then 1 apple and 1 pear = 260 g, so the pear weighs 260 − 120 = <b>140 g</b>.</p><p class="why-not">120 g is the apple, not the pear, and 240 g is two apples. 20 g treats the 240 g difference as one apple, forgetting the first line has <i>two</i> more apples.</p>` },
    { id: "v404", tier: 4, cat: "Whose reasoning",
      stem: `<div class="box">Every member of the school choir is also in the band.<br>Some members of the band play the drums.</div><p>Ana: “So some members of the choir play the drums.”</p><p>Ben: “So anyone who is not in the band cannot be in the choir.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Ana", "Ben"), answer: 1,
      explain: `<p>Every choir member is in the band. So if you’re <b>not</b> in the band, you can’t be in the choir: <b>Ben</b> is right.</p><p class="why-not">The drummers are “some members of the band”, but they might all be band members who aren’t in the choir. Nothing says any choir member plays the drums, so Ana goes too far.</p>` },
    { id: "v405", tier: 4, cat: "Spot the mistake",
      stem: `<div class="box">This year the school started giving out free fruit at recess. This year’s maths test results are the best the school has ever had.<br>Ms Grey: “The free fruit must have made the children better at maths.”</div><p>Which one of these shows the mistake Ms Grey has made?</p>`,
      options: ["This year’s maths test may have been easier than last year’s.", "Some children may not have liked the fruit that was given out at recess.", "Other schools may also give out free fruit at recess.", "Fruit may be cheaper to buy in some months of the year."], answer: 0,
      explain: `<p>Two things happened in the same year, but that doesn’t mean one caused the other. Ms Grey has ignored <b>another possible cause</b>: an easier test would also give better results.</p><p class="why-not">Some children not liking the fruit doesn’t explain the results either way. Other schools and the price of fruit don’t say anything about why this school’s results went up.</p>` },
  );
})();
