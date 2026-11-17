/* ---------------------------------------------------------------
   STORM ISLAND: maths questions (hand-written). Five options (A–E).
   These cover the topics the self-redrawing templates (generators.js) do not:
   place value, turns and angles, mass, chance, combinations, symmetry, 3D shapes,
   sequences, coins, fractions on a number line, dates, and the boss questions.
   tier 1–3 = storm circle 1–3; tier 4 = the boss.
   --------------------------------------------------------------- */
(() => {
  const { T, fig, frac } = LIB;

  /* m201: a spinner with eight equal sections */
  const SPINNER = (() => {
    const cols = ["#e5484d", "#4dabf7", "#e5484d", "#51cf66", "#ffd43b", "#4dabf7", "#e5484d", "#51cf66"], names = { "#e5484d": "R", "#4dabf7": "B", "#51cf66": "G", "#ffd43b": "Y" };
    let g = "";
    cols.forEach((c, i) => {
      const a0 = i * Math.PI / 4 - Math.PI / 2, a1 = a0 + Math.PI / 4, am = (a0 + a1) / 2, p = a => `${(100 + 80 * Math.cos(a)).toFixed(1)} ${(100 + 80 * Math.sin(a)).toFixed(1)}`;
      g += `<path d="M100 100L${p(a0)}A80 80 0 0 1 ${p(a1)}Z" fill="${c}" stroke="${INK}" stroke-width="2"/>` + T((100 + 52 * Math.cos(am)).toFixed(1), (105 + 52 * Math.sin(am)).toFixed(1), names[c], 'text-anchor="middle" font-weight="700"');
    });
    g += `<path d="M100 100L128 62" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="100" cy="100" r="7" fill="${INK}"/>`;
    return fig(`<svg viewBox="0 0 200 200" width="200" role="img" aria-label="A spinner divided into eight equal sections: three red (R), two blue (B), two green (G) and one yellow (Y).">${g}</svg>`);
  })();

  /* m203: five capital letters drawn with straight strokes */
  const LETTERS = (() => {
    const L = { A: "M6 54L24 6L42 54M13 36H35", H: "M8 6V54M40 6V54M8 30H40", N: "M8 54V6L40 54V6", T: "M6 6H42M24 6V54", Z: "M8 6H40L8 54H40" };
    return k => `<svg viewBox="0 0 48 60" width="48" height="60" role="img" aria-label="The capital letter ${k}"><path d="${L[k]}" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="square" stroke-linejoin="miter"/></svg>`;
  })();

  /* m303: six square tiles in a 2 by 3 rectangle */
  const TILES = fig(`<svg viewBox="0 0 200 140" width="200" role="img" aria-label="Six identical square tiles joined edge to edge to make a rectangle that is three tiles long and two tiles wide.">${[0, 1, 2].map(c => [0, 1].map(r => `<rect x="${16 + c * 56}" y="${10 + r * 56}" width="56" height="56" fill="#ffe8b3" stroke="${INK}" stroke-width="2.2"/>`).join("")).join("")}</svg>`);

  /* m403: a rectangle with a square cut from one corner */
  const NOTCH = fig(`<svg viewBox="-16 0 316 200" width="316" role="img" aria-label="A rectangle 12 cm long and 8 cm wide. A small square with sides of 3 cm has been cut out of its top right corner. Not to scale."><path d="M40 30H200V75H250V160H40Z" fill="#dff0d8" stroke="${INK}" stroke-width="2.4"/><path d="M200 30H250V75" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"/>${T(145, 180, "12 cm", 'text-anchor="middle" font-weight="700"')}${T(32, 100, "8 cm", 'text-anchor="end" font-weight="700"')}${T(225, 22, "3 cm", 'text-anchor="middle" font-weight="700"')}${T(256, 56, "3 cm", 'font-weight="700"')}<text x="150" y="197" font-size="13" text-anchor="middle" fill="#55607a">not to scale</text></svg>`);

  MATHS.push(
    /* ===================== circle 1 ===================== */
    { id: "m101", tier: 1, cat: "Number & place value",
      stem: `<p>What is <b>4 052 − 300</b>?</p>`,
      options: ["3 752", "3 952", "4 022", "4 049", "4 352"], answer: 0,
      explain: `<p>300 is 3 hundreds, but 4 052 has no hundreds to take them from. So break a thousand into 10 hundreds: 4 052 is 40 hundreds and 52. Then 40 hundreds − 3 hundreds = 37 hundreds, which gives <b>3 752</b>.</p><p class="why-not">4 022 takes away 30 and 4 049 takes away 3: the 3 is in the wrong place. 4 352 adds instead of subtracting. 3 952 trades the thousand but takes away only one hundred.</p>` },
    { id: "m102", tier: 1, cat: "Fractions",
      stem: `<p>A block of chocolate has <b>20</b> squares. Ned eats <b>one quarter</b> of the block. Then his mum eats <b>3</b> squares.</p><p>How many squares are left?</p>`,
      options: ["10", "12", "13", "15", "17"], answer: 1,
      explain: `<p>One quarter of 20 is 20 ÷ 4 = 5 squares. After Ned: 20 − 5 = 15. After Mum: 15 − 3 = <b>12</b>.</p><p class="why-not">15 forgets Mum’s squares and 17 forgets Ned’s. 13 treats “one quarter” as 4 squares. A quarter means the block is split into 4 equal parts, and each part is 5 squares.</p>` },
    { id: "m103", tier: 1, cat: "Measurement & scales",
      stem: `<p>The minute hand of a clock turns from <b>2:00 pm</b> to <b>2:45 pm</b>.</p><p>How many <b>right angles</b> does the minute hand turn through?</p>`,
      options: ["1", "2", "3", "4", "9"], answer: 2,
      explain: `<p>A full turn of the minute hand takes 60 minutes and is 4 right angles. So every 15 minutes is one right angle (a quarter turn). 45 minutes is 3 lots of 15: <b>3</b> right angles.</p><p class="why-not">4 would be a whole hour. 9 is the number the hand points to at the end, not the amount of turning.</p>` },
    { id: "m104", tier: 1, cat: "Measurement & scales",
      stem: `<p>A bag holds <b>350 g</b> of rice.</p><p>How much more rice is needed to make exactly <b>one and a half kilograms</b>?</p>`,
      options: ["150 g", "650 g", "850 g", "1 150 g", "1 850 g"], answer: 3,
      explain: `<p>One kilogram is 1 000 g, so one and a half kilograms is 1 500 g. 1 500 − 350 = <b>1 150 g</b>.</p><p class="why-not">650 g only reaches one kilogram and 150 g only reaches half a kilogram. 1 850 g adds the 350 g instead of taking it away.</p>` },

    /* ===================== circle 2 ===================== */
    { id: "m201", tier: 2, cat: "Chance & counting",
      stem: `<p>This spinner has eight equal sections.</p>${SPINNER}<p>Here are three statements about one spin.</p><div class="box">1. Red is the most likely colour.<br>2. Landing on blue is just as likely as landing on green.<br>3. It is impossible for the spinner to land on yellow.</div><p>Which statements are <b>correct</b>?</p>`,
      options: ["1 only", "2 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"], answer: 2,
      explain: `<p>Count the sections: red 3, blue 2, green 2, yellow 1.</p><p>1 is correct: red has the most sections. 2 is correct: blue and green have 2 each. 3 is wrong: yellow is the <i>least likely</i> colour, but it has a section, so it can happen.</p><p>So the answer is <b>1 and 2 only</b>.</p><p class="why-not">“Unlikely” is not the same as “impossible”. Impossible would mean no yellow section at all.</p>` },
    { id: "m202", tier: 2, cat: "Chance & counting",
      stem: `<p>A lunch deal lets you pick <b>one</b> sandwich, <b>one</b> drink and <b>one</b> piece of fruit.</p><p>There are 4 kinds of sandwich, 3 kinds of drink and 2 kinds of fruit.</p><p>How many different lunches can be made?</p>`,
      options: ["9", "12", "14", "24", "48"], answer: 3,
      explain: `<p>Each sandwich can go with each of the 3 drinks: 4 × 3 = 12 pairs. Each pair can go with either fruit: 12 × 2 = <b>24</b>.</p><p class="why-not">9 adds the numbers instead of multiplying. 12 forgets the fruit. 14 multiplies the first two and then adds the fruit.</p>` },
    { id: "m203", tier: 2, cat: "Area, perimeter & 3D", visual: true,
      stem: `<p>A line of symmetry splits a shape into two halves that are mirror images of each other.</p><p>Which of these letters has exactly <b>two</b> lines of symmetry?</p>`,
      options: ["A", "H", "N", "T", "Z"].map(k => LETTERS(k)), answer: 1,
      explain: `<p>The letter <b>H</b> can be folded in half top to bottom, and also left to right. That is two lines of symmetry.</p><p class="why-not">A and T each have only one (a line straight down the middle). N and Z have none: they look the same after a half turn, but turning is not folding. Fold either of them and the halves do not match.</p>` },
    { id: "m204", tier: 2, cat: "Patterns & sequences",
      stem: `<p>In a number pattern, each number is found by <b>doubling</b> the number before it and then <b>subtracting 4</b>.</p><p>The <b>fourth</b> number in the pattern is 36.</p><p>What is the <b>first</b> number?</p>`,
      options: ["8", "10", "12", "20", "68"], answer: 0,
      explain: `<p>Work backwards: undo “subtract 4” by adding 4, then undo “double” by halving.</p><p>Third number: (36 + 4) ÷ 2 = 20. Second: (20 + 4) ÷ 2 = 12. First: (12 + 4) ÷ 2 = <b>8</b>.</p><p>Check forwards: 8, 12, 20, 36.</p><p class="why-not">20 and 12 stop too early (they are the third and second numbers). 68 goes forwards from 36 instead of backwards.</p>` },
    { id: "m205", tier: 2, cat: "Area, perimeter & 3D",
      stem: `<p>A solid shape has <b>5 faces</b>: one square and four triangles. The four triangles meet at a point.</p><p>How many <b>edges</b> does the shape have?</p>`,
      options: ["5", "6", "8", "12", "16"], answer: 2,
      explain: `<p>The shape is a square-based pyramid. The square base has 4 edges, and 4 more edges run from the corners of the base up to the point: 4 + 4 = <b>8</b>.</p><p class="why-not">5 is the number of faces (and also the number of corners). 16 counts 4 edges for the square and 3 for every triangle, but each edge is shared by two faces, so that counts every edge twice. 12 counts the triangles’ edges only.</p>` },

    /* ===================== circle 3 ===================== */
    { id: "m301", tier: 3, cat: "Money & best value",
      stem: `<p>Ella has only <b>20c</b> and <b>50c</b> coins in her purse. She has <b>9 coins</b> altogether, and they are worth exactly <b>$3.00</b>.</p><p>How many 50c coins does Ella have?</p>`,
      options: ["3", "4", "5", "6", "7"], answer: 1,
      explain: `<p>Suppose all 9 coins were 20c: that is $1.80, which is $1.20 short. Each time a 20c coin is swapped for a 50c coin, the total goes up by 30c. $1.20 ÷ 30c = 4 swaps, so there are <b>4</b> fifty-cent coins.</p><p>Check: 4 × 50c = $2.00 and 5 × 20c = $1.00, which makes $3.00 with 9 coins.</p><p class="why-not">5 is the number of 20c coins. 6 fifty-cent coins already make $3.00, but that is only 6 coins, not 9.</p>` },
    { id: "m302", tier: 3, cat: "Fractions",
      stem: `<p>A frog sits at <b>0</b> on a number line. Every jump takes it exactly ${frac(3, 4)} of a unit forward.</p><p>How many jumps does the frog need to get <b>past 5</b>?</p>`,
      options: ["5", "6", "7", "8", "9"], answer: 2,
      explain: `<p>Four jumps make 4 × ${frac(3, 4)} = 3 whole units. Six jumps make 4${frac(1, 2)}, which is not there yet. The seventh jump lands on 5${frac(1, 4)}: <b>7</b> jumps.</p><p class="why-not">6 jumps only reach 4${frac(1, 2)}. 5 treats every jump as a whole unit. 8 is one jump more than is needed.</p>` },
    { id: "m303", tier: 3, cat: "Area, perimeter & 3D",
      stem: `<p>Six identical square tiles are joined to make this rectangle. The perimeter of <b>one tile</b> is <b>20 cm</b>.</p>${TILES}<p>What is the perimeter of the rectangle?</p>`,
      options: ["25 cm", "30 cm", "50 cm", "120 cm", "150 cm"], answer: 2,
      explain: `<p>A square has 4 equal sides, so each tile’s side is 20 ÷ 4 = 5 cm. The rectangle is 3 tiles long (15 cm) and 2 tiles wide (10 cm).</p><p>Perimeter: 15 + 10 + 15 + 10 = <b>50 cm</b>.</p><p class="why-not">120 cm is 6 × 20: it counts the sides where tiles touch, and those are inside the rectangle, not on its edge. 150 is the area in square centimetres. 25 cm adds only two of the four sides.</p>` },
    { id: "m304", tier: 3, cat: "Time & timetables",
      stem: `<p>School camp starts on <b>9 March</b>. Permission notes must be handed in exactly <b>three weeks</b> before camp starts.</p><p>It is not a leap year, so February has 28 days.</p><p>On what date must the notes be handed in?</p>`,
      options: ["15 February", "16 February", "17 February", "18 February", "19 February"], answer: 1,
      explain: `<p>Three weeks is 21 days. Going back 9 days from 9 March reaches the last day of February (28 February). There are 21 − 9 = 12 more days to go back: 28 − 12 = <b>16 February</b>.</p><p>Check: 16 February + 12 days = 28 February, + 9 more days = 9 March.</p><p class="why-not">17 February would be right in a leap year. 18 and 19 February come from giving February 30 or 31 days.</p>` },
    { id: "m305", tier: 3, cat: "Measurement & scales",
      stem: `<p>A full jar of honey weighs <b>900 g</b>. When exactly <b>half</b> of the honey has been used, the jar and the honey left in it weigh <b>550 g</b>.</p><p>How much does the empty jar weigh?</p>`,
      options: ["200 g", "350 g", "450 g", "550 g", "700 g"], answer: 0,
      explain: `<p>The weight dropped by 900 − 550 = 350 g, and that was half the honey. So all the honey weighs 700 g, and the jar weighs 900 − 700 = <b>200 g</b>.</p><p class="why-not">350 g is half the honey and 700 g is all the honey: both stop before finding the jar. 450 g just halves 900, as if the jar were made of honey too.</p>` },

    /* ===================== the boss ===================== */
    { id: "m401", tier: 4, cat: "Rates",
      stem: `<p>At a fair, prizes are swapped for tickets.</p><div class="box">4 blue tickets are worth the same as 6 red tickets.<br>9 red tickets are worth the same as 2 gold tickets.</div><p>How many <b>blue</b> tickets are worth the same as <b>4 gold</b> tickets?</p>`,
      options: ["12", "16", "18", "24", "27"], answer: 0,
      explain: `<p>Go through red. 2 gold = 9 red, so 4 gold = 18 red.</p><p>6 red = 4 blue, and 18 red is 3 lots of 6 red, so it is worth 3 × 4 = <b>12</b> blue.</p><p class="why-not">18 stops at red tickets. 27 turns red into blue the wrong way round (18 red is worth fewer blue tickets, not more). 16 and 24 come from multiplying the numbers in the box without matching up the colours.</p>` },
    { id: "m402", tier: 4, cat: "Number & place value",
      stem: `<p>Ana is <b>4 years older</b> than Ben. Ben is <b>twice as old</b> as Cara. The three children’s ages add up to <b>34</b>.</p><p>How old is Ana?</p>`,
      options: ["10", "12", "16", "18", "20"], answer: 2,
      explain: `<p>Think of Cara’s age as one block. Ben is two blocks, and Ana is two blocks and 4. Together that is five blocks and 4, which equals 34. So five blocks = 30 and one block = 6.</p><p>Cara is 6, Ben is 12 and Ana is 12 + 4 = <b>16</b>. Check: 6 + 12 + 16 = 34.</p><p class="why-not">12 is Ben’s age: one step short. 10 adds the 4 to Cara’s age instead of Ben’s. 18 and 20 do not give three ages that add up to 34.</p>` },
    { id: "m403", tier: 4, cat: "Area, perimeter & 3D",
      stem: `<p>A rectangle is 12 cm long and 8 cm wide. A square with sides of 3 cm is cut out of one corner.</p>${NOTCH}<p>What is the <b>perimeter</b> of the shape that is left?</p>`,
      options: ["37 cm", "40 cm", "43 cm", "46 cm", "49 cm"], answer: 1,
      explain: `<p>The rectangle’s perimeter was 12 + 8 + 12 + 8 = 40 cm. Cutting out the corner removes 3 cm from the top edge and 3 cm from the side edge, but it adds two new 3 cm edges inside the notch. What is taken away is put straight back: the perimeter is still <b>40 cm</b>.</p><p>Go round to check: 12 + 5 + 3 + 3 + 9 + 8 = 40.</p><p class="why-not">46 cm adds the two new edges without taking off the two that were lost. 37 cm thinks a smaller shape must have a smaller perimeter. Cutting a corner changes the area (it is now 96 − 9 = 87 cm²), not the distance round.</p>` },
    { id: "m404", tier: 4, cat: "Money & best value",
      stem: `<p>Zed starts saving on a <b>Monday</b>. He puts <b>$2.00</b> in his money box that day. Every day after that he puts in <b>50c more</b> than he did the day before.</p><p>On which day does the total in his money box first become <b>more than $15</b>?</p>`,
      options: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], answer: 3,
      explain: `<p>Keep a running total. Monday $2.00 (total $2.00). Tuesday $2.50 (total $4.50). Wednesday $3.00 (total $7.50). Thursday $3.50 (total $11.00). Friday $4.00 (total $15.00). Saturday $4.50 (total $19.50).</p><p>On Friday the total is exactly $15, which is not <i>more than</i> $15. It first passes $15 on <b>Saturday</b>.</p><p class="why-not">Friday is the trap: “more than $15” does not include $15 itself. The earlier days come from adding $2 every day and forgetting the amounts grow.</p>` },
  );
})();
