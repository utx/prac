/* ---------------------------------------------------------------
   STORM ISLAND: second set of maths questions (Nov 2026). Five options (A–E).
   tier 1–3 = storm circle 1–3; tier 4 = the boss.
   --------------------------------------------------------------- */
(() => {
  const { fig, blocks, frac, T, tbl, colGraph } = LIB;
  const THERMO = (() => {
    const y = v => 230 - v * 5;
    let g = `<rect x="60" y="20" width="22" height="220" rx="11" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle cx="71" cy="248" r="16" fill="#e5484d" stroke="${INK}" stroke-width="2.5"/><rect x="66" y="${y(26)}" width="10" height="${248 - y(26)}" fill="#e5484d"/>`;
    for (let v = 0; v <= 40; v += 2) { const big = v % 10 === 0; g += `<line x1="82" x2="${big ? 100 : 92}" y1="${y(v)}" y2="${y(v)}" stroke="${INK}" stroke-width="2"/>`; if (big) g += T(106, y(v) + 5, v + " °C"); }
    return fig(`<svg viewBox="0 0 180 272" width="170" role="img" aria-label="A thermometer marked 0, 10, 20, 30 and 40 °C, with four small marks between each pair of labels. The red liquid reaches the third small mark above 20 °C.">${g}</svg>`);
  })();
  const LINE = (() => {
    const times = ["6 am", "9 am", "12 pm", "3 pm", "6 pm"], temps = [8, 14, 22, 24, 18], X = i => 70 + i * 64, Y = v => 220 - v * 7.5;
    let g = "";
    for (let v = 0; v <= 26; v += 2) g += `<line x1="56" x2="340" y1="${Y(v)}" y2="${Y(v)}" stroke="#c5ccd8" stroke-width="1"/>` + (v % 4 === 0 ? T(48, Y(v) + 5, v, 'text-anchor="end"') : "");
    g += `<line x1="56" x2="56" y1="${Y(26)}" y2="220" stroke="${INK}" stroke-width="2"/><line x1="56" x2="340" y1="220" y2="220" stroke="${INK}" stroke-width="2"/>`;
    g += `<polyline points="${temps.map((t, i) => `${X(i)},${Y(t)}`).join(" ")}" fill="none" stroke="#e5484d" stroke-width="3"/>` + temps.map((t, i) => `<circle cx="${X(i)}" cy="${Y(t)}" r="5" fill="#e5484d" stroke="${INK}" stroke-width="1.5"/>`).join("");
    times.forEach((t, i) => { g += T(X(i), 240, t, 'text-anchor="middle"'); });
    g += `<text x="14" y="120" font-size="13" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">Temperature (°C)</text>`;
    return fig(`<svg viewBox="0 0 350 250" width="350" role="img" aria-label="A line graph of the temperature during one day. The scale has a line every 2 degrees, labelled every 4. 6 am: 8 degrees. 9 am: 14 degrees. 12 pm: 22 degrees. 3 pm: 24 degrees. 6 pm: 18 degrees.">${g}</svg>`);
  })();
  const box = (X, Y, Z, opt) => { const c = []; for (let x = 0; x < X; x++) for (let y = 0; y < Y; y++) for (let z = 0; z < Z; z++) c.push([x, y, z]); return fig(blocks(c, opt)); };

  MATHS.push(
    /* ===================== circle 1 ===================== */
    { id: "n101", tier: 1, cat: "Number & place value",
      stem: `<p>Which number is <b>300 less</b> than <b>5 105</b>?</p>`,
      options: ["2 105", "4 805", "4 905", "5 075", "5 405"], answer: 1,
      explain: `<p>Take 3 hundreds from 5 105. There is only 1 hundred, so swap a thousand for 10 hundreds: 5 105 is 4 thousands, 11 hundreds and 5. Take away 3 hundreds: 4 thousands, 8 hundreds and 5 = <b>4 805</b>.</p><p class="why-not">5 075 takes away 30 and 2 105 takes away 3 000. 5 405 adds. 4 905 takes away only 200.</p>` },
    { id: "n102", tier: 1, cat: "Money & best value",
      stem: `<p>Mia buys <b>3 apples</b> at <b>65c each</b>. She pays with a <b>$5 note</b>.</p><p>How much change does she get?</p>`,
      options: ["$1.95", "$3.05", "$3.15", "$3.95", "$4.35"], answer: 1,
      explain: `<p>3 × 65c = $1.95. Change: $5.00 − $1.95 = <b>$3.05</b>.</p><p class="why-not">$1.95 is what she spent. $4.35 is the change for one apple. $3.15 and $3.95 come from slips when taking away the cents.</p>` },
    { id: "n103", tier: 1, cat: "Area, perimeter & 3D",
      stem: `<p>Sam builds a solid cube that is <b>3 small cubes</b> long, 3 wide and 3 high.</p>${box(3, 3, 3, { u: 34, aria: "A large cube made of small cubes, 3 along each edge." })}<p>How many small cubes does he use?</p>`,
      options: ["9", "18", "27", "36", "81"], answer: 2,
      explain: `<p>Each layer is 3 × 3 = 9 cubes, and there are 3 layers: 9 × 3 = <b>27</b>.</p><p class="why-not">9 is just one layer. 18 is two layers. Counting only the faces you can see in the picture misses the cubes hidden inside and at the back.</p>` },
    { id: "n104", tier: 1, cat: "Time & timetables",
      stem: `<p>A cake goes into the oven at <b>3:45 pm</b> and needs <b>50 minutes</b>.</p><p>When should it come out?</p>`,
      options: ["4:15 pm", "4:25 pm", "4:35 pm", "4:45 pm", "5:35 pm"], answer: 2,
      explain: `<p>15 minutes takes it to 4:00 pm, and the other 35 minutes takes it to <b>4:35 pm</b>.</p><p class="why-not">4:45 pm adds an hour instead of 50 minutes. 5:35 pm adds an extra hour. 4:25 pm and 4:15 pm come from counting the minutes to the hour wrongly.</p>` },

    { id: "n105", tier: 1, cat: "Measurement & scales",
      stem: `<p>What temperature does this thermometer show?</p>${THERMO}`,
      options: ["21 °C", "23 °C", "24 °C", "26 °C", "30 °C"], answer: 3,
      explain: `<p>From one label to the next is 10 degrees, split into 5 equal steps, so each small mark is 10 ÷ 5 = 2 degrees. The liquid is 3 marks above 20: 20 + 3 × 2 = <b>26 °C</b>.</p><p class="why-not">23 °C counts each small mark as 1 degree. 24 °C counts only two marks, and 30 °C is the next label up.</p>` },

    /* ===================== circle 2 ===================== */
    { id: "n201", tier: 2, cat: "Fractions",
      stem: `<p>A box holds <b>24 pencils</b>. One third of them are red and one quarter are blue. The rest are green.</p><p>How many pencils are green?</p>`,
      options: ["7", "10", "12", "14", "17"], answer: 1,
      explain: `<p>Red: 24 ÷ 3 = 8. Blue: 24 ÷ 4 = 6. Green: 24 − 8 − 6 = <b>10</b>.</p><p class="why-not">12 takes the rest as half. 17 subtracts 3 and 4 instead of the fractions of 24. 14 forgets one of the colours.</p>` },
    { id: "n202", tier: 2, cat: "Area, perimeter & 3D",
      stem: `<p>A square-based pyramid is glued on top of a cube so that the pyramid’s base fits exactly over the top of the cube.</p><p>How many <b>faces</b> does the new solid have?</p>`,
      options: ["8", "9", "10", "11", "12"], answer: 1,
      explain: `<p>The cube has 6 faces and the pyramid has 5. When they are glued, the top of the cube and the base of the pyramid are hidden inside: 6 + 5 − 2 = <b>9</b>.</p><p>Check by counting: the cube’s bottom and 4 sides, plus the pyramid’s 4 triangles, is 9.</p><p class="why-not">11 just adds the two solids. 10 takes away only one of the glued faces, but both are hidden.</p>` },
    { id: "n203", tier: 2, cat: "Chance & counting",
      stem: `<p>A bag holds <b>4 red</b>, <b>4 blue</b> and <b>2 green</b> counters. Lee takes one without looking.</p><div class="box">1. Red and blue are equally likely.<br>2. Green is more likely than blue.<br>3. It is impossible to take a yellow counter.</div><p>Which statements are <b>correct</b>?</p>`,
      options: ["1 only", "3 only", "1 and 2 only", "1 and 3 only", "1, 2 and 3"], answer: 3,
      explain: `<p>1 is correct: there are 4 red and 4 blue. 2 is wrong: there are fewer green (2) than blue (4), so green is less likely. 3 is correct: there are no yellow counters. So <b>1 and 3 only</b>.</p><p class="why-not">Statement 2 has the comparison the wrong way round, so any answer that includes 2 is wrong.</p>` },
    { id: "n204", tier: 2, cat: "Patterns & sequences",
      stem: `<p>Matchsticks are used to make a row of squares. One square needs 4 matchsticks, two squares in a row need 7, and three need 10.</p><p>How many matchsticks are needed for a row of <b>12 squares</b>?</p>`,
      options: ["34", "36", "37", "40", "48"], answer: 2,
      explain: `<p>The first square needs 4 matchsticks. Every square after that shares a side with the one before, so it needs only 3 more: 4 + 11 × 3 = <b>37</b>.</p><p class="why-not">48 = 12 × 4 forgets that the squares share sides. 36 = 12 × 3 forgets the extra matchstick at the start.</p>` },
    { id: "n205", tier: 2, cat: "Measurement & scales",
      stem: `<p>What is the angle between the hour hand and the minute hand of a clock at exactly <b>4:00</b>?</p>`,
      options: ["90°", "100°", "120°", "140°", "160°"], answer: 2,
      explain: `<p>A full turn is 360° and the 12 numbers split it into 12 equal parts of 30°. At 4:00 the hands point at 12 and 4, four parts apart: 4 × 30° = <b>120°</b>.</p><p class="why-not">90° is a quarter turn (3:00). 100° and 140° come from using 25° or 35° for each step between numbers.</p>` },

    { id: "n206", tier: 2, cat: "Graphs & data",
      stem: colGraph({ labels: ["Mar", "Apr", "May", "Jun"], series: [{ name: "", color: "#69db7c", values: [15, 10, 25, 20] }], max: 30, step: 5, ylabel: "Books read",
        aria: "A column graph of books read each month. The scale goes 0, 5, 10, 15, 20, 25, 30. March reaches 15, April 10, May 25 and June 20." }) + `<p>How many more books were read in the <b>two busiest</b> months together than in the <b>two quietest</b> months together?</p>`,
      options: ["5", "10", "15", "20", "45"], answer: 3,
      explain: `<p>Read each column: March 15, April 10, May 25, June 20. Busiest two: May and June, 25 + 20 = 45. Quietest two: March and April, 15 + 10 = 25. Difference: 45 − 25 = <b>20</b>.</p><p class="why-not">45 stops after adding the busiest months. 15 compares only the busiest and quietest single months (25 − 10).</p>` },
    { id: "n207", tier: 2, cat: "Time & timetables",
      stem: `<p>Ferries run from City Wharf to Palm Isle.</p>${tbl(["", "Ferry 1", "Ferry 2", "Ferry 3", "Ferry 4"], [["City Wharf", "9:15 am", "10:05 am", "10:45 am", "11:25 am"], ["Palm Isle", "9:50 am", "10:40 am", "11:20 am", "12:00 pm"]])}<p>Zoe reaches City Wharf at <b>10:20 am</b> and takes the next ferry. How long is it from when she reaches the wharf until she arrives at Palm Isle?</p>`,
      options: ["1 hour", "25 minutes", "35 minutes", "55 minutes", "1 hour 20 minutes"], answer: 0,
      explain: `<p>Ferry 2 left at 10:05, before Zoe arrived. The next is Ferry 3 at 10:45, which reaches Palm Isle at 11:20. From 10:20 to 11:20 is <b>1 hour</b> (25 minutes waiting and 35 minutes on the ferry).</p><p class="why-not">35 minutes is only the trip and 25 minutes only the wait. 1 hour 20 minutes would mean taking Ferry 4.</p>` },

    /* ===================== circle 3 ===================== */
    { id: "n301", tier: 3, cat: "Area, perimeter & 3D",
      stem: `<p>The six faces of a cube have a total area of <b>54 cm²</b>.</p><p>How long is one edge of the cube?</p>`,
      options: ["3 cm", "4.5 cm", "6 cm", "9 cm", "27 cm"], answer: 0,
      explain: `<p>The 6 faces are equal squares, so one face is 54 ÷ 6 = 9 cm². A square of 9 cm² has sides of <b>3 cm</b>, because 3 × 3 = 9.</p><p class="why-not">9 cm is the area of one face, not its side. 4.5 cm halves the area instead of finding the square root. 27 cm halves 54.</p>` },
    { id: "n302", tier: 3, cat: "Rates",
      stem: `<p>Three taps, all running together, fill a tub in <b>12 minutes</b>.</p><p>How long would <b>four</b> taps, running at the same rate, take to fill it?</p>`,
      options: ["8 minutes", "9 minutes", "11 minutes", "13 minutes", "16 minutes"], answer: 1,
      explain: `<p>One tap alone would take 3 × 12 = 36 minutes. Four taps share the job: 36 ÷ 4 = <b>9 minutes</b>.</p><p class="why-not">16 minutes thinks more taps take longer. 13 and 11 just add or take away one minute for one tap.</p>` },
    { id: "n303", tier: 3, cat: "Number & place value",
      stem: `<p>Three numbers in a row (like 5, 6, 7) add up to <b>72</b>.</p><p>What is the <b>largest</b> of the three?</p>`,
      options: ["23", "24", "25", "26", "36"], answer: 2,
      explain: `<p>The middle number is 72 ÷ 3 = 24, so the numbers are 23, 24 and 25. The largest is <b>25</b>.</p><p class="why-not">24 is the middle number and 23 the smallest. 36 is half of 72, which would be two numbers, not three.</p>` },
    { id: "n304", tier: 3, cat: "Chance & counting",
      stem: `<p>At a bike shop you choose one bike, one helmet and one bell. There are <b>3 bikes</b>, <b>2 helmets</b> and <b>5 bells</b>.</p><p>How many different sets can you choose?</p>`,
      options: ["10", "11", "15", "30", "60"], answer: 3,
      explain: `<p>Each bike can go with either helmet: 3 × 2 = 6 pairs. Each pair can go with any of 5 bells: 6 × 5 = <b>30</b>.</p><p class="why-not">11 adds instead of multiplying. 15 forgets the helmets, and 10 forgets the bikes.</p>` },
    { id: "n305", tier: 3, cat: "Money & best value",
      stem: `<p>The same juice is sold in five sizes.</p><p>Which is the <b>cheapest for each litre</b>?</p>`,
      options: ["250 mL for $0.65", "500 mL for $1.30", "1 L for $2.40", "2 L for $4.60", "3 L for $6.60"], answer: 4,
      explain: `<p>Work out the price of 1 litre each time. 250 mL × 4: $2.60. 500 mL × 2: $2.60. 1 L: $2.40. 2 L ÷ 2: $2.30. 3 L ÷ 3: $2.20. The cheapest is <b>3 L for $6.60</b>.</p><p class="why-not">The 250 mL bottle has the smallest price tag, but you get very little juice. A bigger size isn’t always better value, so you have to work each one out.</p>` },

    { id: "n306", tier: 3, cat: "Graphs & data",
      stem: `<p>The graph shows the temperature on one day.</p>${LINE}<p>Between which two times <b>next to each other</b> did the temperature rise the most?</p>`,
      options: ["6 am and 9 am", "9 am and 12 pm", "12 pm and 3 pm", "3 pm and 6 pm", "It rose the same each time"], answer: 1,
      explain: `<p>Read each point (the lines are 2 degrees apart): 8, 14, 22, 24, 18. The rises are 6 (6 am to 9 am), 8 (9 am to 12 pm) and 2 (12 pm to 3 pm), and then it falls. The biggest rise is <b>between 9 am and 12 pm</b>.</p><p class="why-not">The highest temperature is at 3 pm, but the rise into it is only 2. Between 3 pm and 6 pm the temperature goes down.</p>` },

    /* ===================== the boss ===================== */
    { id: "n401", tier: 4, cat: "Area, perimeter & 3D",
      stem: `<p>A block is made of small cubes: <b>5 long</b>, <b>3 wide</b> and <b>4 high</b>. The whole outside is painted, and then the block is taken apart.</p>${box(5, 3, 4, { u: 26, aria: "A block of small cubes, 5 long, 3 wide and 4 high." })}<p>How many small cubes have <b>no paint at all</b>?</p>`,
      options: ["2", "6", "12", "24", "60"], answer: 1,
      explain: `<p>The unpainted cubes are hidden inside, one layer in from every face. Take one cube off each end of every direction: 5 − 2 = 3 long, 3 − 2 = 1 wide, 4 − 2 = 2 high. That hidden block has 3 × 1 × 2 = <b>6</b> cubes.</p><p class="why-not">60 is every cube. 12 and 24 only take one layer off one side of each direction instead of both.</p>` },
    { id: "n402", tier: 4, cat: "Fractions",
      stem: `<p>Ava spent <b>one quarter</b> of her money on a book and then <b>$6</b> on lunch. She now has exactly <b>half</b> of her money left.</p><p>How much did she start with?</p>`,
      options: ["$12", "$18", "$24", "$32", "$48"], answer: 2,
      explain: `<p>She spent half of her money altogether: one quarter on the book and $6 on lunch. So the $6 must be the other quarter. One quarter is $6, so she started with 4 × $6 = <b>$24</b>.</p><p>Check: $24 − $6 (book) − $6 (lunch) = $12, which is half of $24.</p><p class="why-not">$12 is what she has left. $48 treats $6 as one eighth.</p>` },
    { id: "n403", tier: 4, cat: "Time & timetables",
      stem: `<p>In a year that is <b>not</b> a leap year, what date is exactly <b>100 days after 1 January</b>?</p>`,
      options: ["9 April", "10 April", "11 April", "12 April", "10 May"], answer: 2,
      explain: `<p>Count the days. 31 January is 30 days after 1 January. 28 February is 30 + 28 = 58 days after. 31 March is 58 + 31 = 89 days after. 11 more days reaches <b>11 April</b>.</p><p class="why-not">10 April counts 1 January itself as the first day. 12 April counts the days in February as 29 or 30. 10 May is a month too far.</p>` },
    { id: "n404", tier: 4, cat: "Measurement & scales",
      stem: `<p>On a map, <b>1 cm</b> stands for <b>250 m</b>. Two towns are <b>6.4 cm</b> apart on the map.</p><p>How far apart are they really?</p>`,
      options: ["160 m", "250 m", "640 m", "1.6 km", "16 km"], answer: 3,
      explain: `<p>6 cm is 6 × 250 = 1 500 m, and 0.4 cm is 0.4 × 250 = 100 m. Altogether 1 600 m = <b>1.6 km</b>.</p><p class="why-not">640 m treats every centimetre as 100 m. 16 km is ten times too big, and 160 m is ten times too small.</p>` },
    { id: "n405", tier: 4, cat: "Graphs & data",
      stem: colGraph({ labels: ["Chess", "Drama", "Art"], series: [{ name: "Boys", color: "#4dabf7", values: [8, 4, 6] }, { name: "Girls", color: "#ffa94d", values: [6, 10, 9] }], max: 12, step: 2, ylabel: "Children",
        aria: "A column graph with two columns for each club, boys and girls. The scale goes up in 2s to 12. Chess: boys 8, girls 6. Drama: boys 4, girls 10. Art: boys 6, girls halfway between 8 and 10." }) + `<p>The graph shows how many boys and girls are in three clubs. Nobody is in more than one club.</p><p>Altogether, how many more girls than boys are in the clubs?</p>`,
      options: ["7", "3", "5", "9", "25"], answer: 0,
      explain: `<p>Girls: 6 + 10 + 9 = 25. Boys: 8 + 4 + 6 = 18. Difference: 25 − 18 = <b>7</b>. (The girls’ Art column stops halfway between 8 and 10, so it is 9.)</p><p class="why-not">25 is the number of girls, not the difference. Reading the Art column as 8 or 10 gives 6 or 8. Comparing only one club gives a different answer again.</p>` },
  );
})();
