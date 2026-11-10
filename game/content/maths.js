/* ---------------------------------------------------------------
   CROWN QUEST: Number Reef (maths). Five options (A–E) per question.
   Levels climb from warm-up to the hardest third of the sample papers.
   --------------------------------------------------------------- */
(() => {
  const T = (x, y, s, o = "") => `<text x="${x}" y="${y}" font-size="15" fill="${INK}" ${o}>${s}</text>`;

  /* L2 Q1: a measuring jug, labelled every 100 mL with one unlabelled mark between */
  const JUG = (() => {
    const y = v => 230 - v * 0.4;                      // 0 mL at y=230, 500 mL at y=30
    let g = `<path d="M70 20 L70 232 Q70 240 78 240 L182 240 Q190 240 190 232 L190 20" fill="none" stroke="${INK}" stroke-width="3"/>`;
    g += `<rect x="72" y="${y(350)}" width="116" height="${238 - y(350)}" fill="#f6c453" opacity=".75"/>`;
    for (let v = 0; v <= 500; v += 50) {
      const big = v % 100 === 0;
      g += `<line x1="70" x2="${big ? 98 : 86}" y1="${y(v)}" y2="${y(v)}" stroke="${INK}" stroke-width="2"/>`;
      if (big && v) g += T(104, y(v) + 5, v + " mL");
    }
    return `<div class="figure"><svg viewBox="0 0 260 250" width="240" height="231" role="img" aria-label="A measuring jug. Marks are labelled 100 mL, 200 mL, 300 mL, 400 mL and 500 mL, with one small unlabelled mark halfway between each pair of labels. The juice reaches the small mark between 300 mL and 400 mL.">${g}</svg></div>`;
  })();

  /* Boss Q2: column graph of books read */
  const GRAPH = (() => {
    const data = [["Ava", 8], ["Ben", 5], ["Cy", 11], ["Dee", 6], ["Eli", 10]];
    const y = v => 210 - v * 15;
    let g = "";
    for (let v = 0; v <= 12; v += 2) g += `<line x1="50" x2="330" y1="${y(v)}" y2="${y(v)}" stroke="#c5ccd8" stroke-width="1"/>` + T(42, y(v) + 5, v, 'text-anchor="end"');
    data.forEach(([n, v], i) => {
      const x = 68 + i * 54;
      g += `<rect x="${x}" y="${y(v)}" width="34" height="${210 - y(v)}" fill="#4dabf7" stroke="${INK}" stroke-width="1.5"/>` + T(x + 17, 230, n, 'text-anchor="middle"');
    });
    g += `<line x1="50" x2="50" y1="${y(12)}" y2="210" stroke="${INK}" stroke-width="2"/><line x1="50" x2="330" y1="210" y2="210" stroke="${INK}" stroke-width="2"/>`;
    g += `<text x="14" y="120" font-size="14" fill="${INK}" text-anchor="middle" transform="rotate(-90 14 120)">Books read</text>`;
    return `<div class="figure"><svg viewBox="0 0 340 240" width="340" height="240" role="img" aria-label="A column graph of books read. The scale is marked 0, 2, 4, 6, 8, 10, 12. Ava's column reaches 8. Ben's column is halfway between 4 and 6. Cy's column is halfway between 10 and 12. Dee's column reaches 6. Eli's column reaches 10.">${g}</svg></div>`;
  })();

  /* Boss Q3: a 3 × 3 × 3 cube drawn from one corner */
  const CUBE = (() => {
    const u = 30, dx = 15, dy = 12, ox = 30, oy = 60;
    let g = "";
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      g += `<rect x="${ox + c * u}" y="${oy + r * u}" width="${u}" height="${u}" fill="#ff8a65" stroke="${INK}" stroke-width="1.5"/>`;                                            // front
      const tx = ox + c * u + (2 - r) * dx, ty = oy - (2 - r) * dy;
      g += `<polygon points="${tx},${ty} ${tx + u},${ty} ${tx + u + dx},${ty - dy} ${tx + dx},${ty - dy}" fill="#ffb39b" stroke="${INK}" stroke-width="1.5"/>`;                    // top
      const sx = ox + 3 * u + c * dx, sy = oy + r * u - c * dy;
      g += `<polygon points="${sx},${sy} ${sx + dx},${sy - dy} ${sx + dx},${sy - dy + u} ${sx},${sy + u}" fill="#e0664a" stroke="${INK}" stroke-width="1.5"/>`;                    // side
    }
    return `<div class="figure"><svg viewBox="0 0 190 160" width="190" height="160" role="img" aria-label="A large cube made of 27 small cubes, 3 small cubes long, 3 wide and 3 high.">${g}</svg></div>`;
  })();

  const BEADS = seq => `<div class="figure" style="font-size:24px;letter-spacing:2px">${seq} …</div>`;

  WORLDS.push({
    id: "maths", name: "Number Reef", icon: "🌊", color: "#0b6fa4", crown: "Coral Crown",
    blurb: "Dive deeper with every level. Leviathan guards the Coral Crown at the bottom of the reef.",
    boss: { name: "Leviathan", emoji: "🐟", img: "leviathan", taunt: "Call me fishman. Nobody in this reef does sums as fast as me!", defeat: "Leviathan sinks back into the deep, blowing bubbles of respect." },
    levels: [
      {
        id: "m1", name: "Shallow Waters",
        questions: [
          { id: "m1a", cat: "Number & place value",
            stem: `<p>Which number is <b>300 more</b> than 4,850?</p>`,
            options: ["4,853", "4,880", "5,050", "5,150", "7,850"], answer: 3,
            hint: `300 is 3 <b>hundreds</b>. Count on in hundreds from 4,850: 4,950, then … (watch what happens when you pass 5,000).`,
            explain: `<p>Add 3 hundreds: 4,850 → 4,950 → 5,050 → <b>5,150</b>.</p><p class="why-not">4,880 adds 3 tens and 4,853 adds 3 ones. 7,850 adds 3 thousands. 5,050 stops one hundred too soon.</p>` },
          { id: "m1b", cat: "Time & timetables",
            stem: `<p>A film starts at <b>10:45 am</b> and runs for <b>1 hour 30 minutes</b>. What time does it finish?</p>`,
            options: ["11:15 am", "11:45 am", "12:15 pm", "12:45 pm", "1:15 pm"], answer: 2,
            hint: `Add the hour first, then the 30 minutes. 15 of those minutes take you up to the next o'clock.`,
            explain: `<p>10:45 am + 1 hour = 11:45 am. Then 30 minutes more: 15 minutes reaches 12:00, and the other 15 gives <b>12:15 pm</b>.</p><p class="why-not">11:45 am adds only the hour, and 11:15 am adds only the 30 minutes. 12:45 pm adds 2 hours.</p>` },
          { id: "m1c", cat: "Money & best value",
            stem: `<p>Zoe buys a drink for <b>$2.60</b> and a sandwich for <b>$4.75</b>. She pays with a <b>$10</b> note. How much change does she get?</p>`,
            options: ["$2.35", "$2.65", "$3.35", "$3.65", "$7.35"], answer: 1,
            hint: `Two steps: first find the total cost, then take it away from $10.`,
            explain: `<p>Total: $2.60 + $4.75 = $7.35. Change: $10.00 − $7.35 = <b>$2.65</b>.</p><p class="why-not">$7.35 is what she spent, not her change. $3.65 forgets that the cents add up to more than a dollar ($6.35 instead of $7.35).</p>` },
          { id: "m1d", cat: "Number & place value",
            stem: `<p>What number goes in the box?</p><p class="gapline" style="text-align:center">57 + ☐ = 100 − 15</p>`,
            options: ["28", "38", "43", "72", "85"], answer: 0,
            hint: `The equals sign means both sides are worth the same. Work out the right-hand side first.`,
            explain: `<p>The right side is 100 − 15 = 85. So 57 + ☐ = 85, and ☐ = 85 − 57 = <b>28</b>.</p><p class="why-not">85 is the value of the right side, not the box. 43 is 100 − 57, which forgets to take away the 15. 72 is 57 + 15. 38 is a slip in the subtraction.</p>` },
        ],
      },
      {
        id: "m2", name: "Coral Maze",
        questions: [
          { id: "m2a", cat: "Measurement & scales",
            stem: `<p>The jug shows how much juice Ali has.</p>${JUG}<p>He pours <b>100 mL</b> into a glass. How much juice is left in the jug?</p>`,
            options: ["210 mL", "250 mL", "300 mL", "350 mL", "450 mL"], answer: 1,
            hint: `The small mark has no label. It is exactly halfway between 300 mL and 400 mL, so what is it worth?`,
            explain: `<p>The small mark is halfway between 300 and 400, so the jug holds 350 mL. After pouring out 100 mL: 350 − 100 = <b>250 mL</b>.</p><p class="why-not">350 mL is what was in the jug before pouring. 210 mL reads the small mark as 310. 450 mL adds instead of taking away.</p>` },
          { id: "m2b", cat: "Fractions",
            stem: `<p>A pizza is cut into <b>8 equal slices</b>. Tom eats 2 slices. Mia eats <b>one quarter</b> of the whole pizza. What fraction of the pizza is left?</p>`,
            options: ["<sup>1</sup>⁄<sub>8</sub>", "<sup>1</sup>⁄<sub>4</sub>", "<sup>3</sup>⁄<sub>8</sub>", "<sup>1</sup>⁄<sub>2</sub>", "<sup>5</sup>⁄<sub>8</sub>"], answer: 3,
            hint: `How many of the 8 slices make one quarter of the pizza? It isn't one slice.`,
            explain: `<p>One quarter of 8 slices is 2 slices. So 2 + 2 = 4 slices are eaten and 4 are left. 4 out of 8 is <b>one half</b>.</p><p class="why-not"><sup>5</sup>⁄<sub>8</sub> treats “one quarter” as one slice. <sup>1</sup>⁄<sub>4</sub> is how much each child ate, not what is left.</p>` },
          { id: "m2c", cat: "Area, perimeter & 3D",
            stem: `<p>A rectangle has a <b>perimeter of 26 cm</b>. Its long sides are each <b>8 cm</b>. What is its <b>area</b>?</p>`,
            options: ["18 cm²", "26 cm²", "40 cm²", "80 cm²", "208 cm²"], answer: 2,
            hint: `First find a short side. The two long sides use up 16 cm of the perimeter, and what is left is shared by <b>two</b> short sides.`,
            explain: `<p>The two long sides: 8 + 8 = 16 cm. That leaves 26 − 16 = 10 cm for two short sides, so each is 5 cm. Area = 8 × 5 = <b>40 cm²</b>.</p><p class="why-not">80 cm² forgets to halve the 10 cm (8 × 10). 18 is 26 − 8, and 208 is 26 × 8: both mix up perimeter and side lengths.</p>` },
          { id: "m2d", cat: "Patterns & sequences",
            stem: `<p>Beads on a string repeat in this pattern:</p>${BEADS("🔴🔴🔵🟢🔴🔴🔵🟢🔴🔴🔵🟢")}<p>How many of the <b>first 22 beads</b> are <b>red</b>?</p>`,
            options: ["8", "9", "10", "11", "12"], answer: 4,
            hint: `The pattern repeats every 4 beads, with 2 reds in each block. How many whole blocks fit into 22, and which beads are left over?`,
            explain: `<p>Each block of 4 beads (red, red, blue, green) has 2 reds. 22 = 5 blocks (20 beads) + 2 more beads. The 5 blocks have 10 reds, and the next 2 beads are red, red. 10 + 2 = <b>12</b>.</p><p class="why-not">10 counts only the whole blocks and forgets the 2 beads left over. 11 counts just one of them.</p>` },
        ],
      },
      {
        id: "m3", name: "Kelp Canyon",
        questions: [
          { id: "m3a", cat: "Money & best value",
            stem: `<p>A shop sells pencils three ways:</p><ul style="margin:0 0 10px"><li>one pencil for <b>80c</b></li><li>a pack of 4 for <b>$3.00</b></li><li>a pack of 10 for <b>$7.00</b></li></ul><p>What is the <b>least</b> Ravi can pay for <b>exactly 12</b> pencils?</p>`,
            options: ["$8.60", "$9.00", "$9.20", "$9.60", "$10.00"], answer: 0,
            hint: `Three packs of 4 looks neat, but is it the cheapest? Try each way of making 12 and compare.`,
            explain: `<p>Ways to make 12: a pack of 10 + 2 singles = $7.00 + $1.60 = <b>$8.60</b>; three packs of 4 = $9.00; two packs of 4 + 4 singles = $9.20; 12 singles = $9.60. The cheapest is $8.60.</p><p class="why-not">$9.00 is the tidy answer (three packs of 4), but the pack of 10 is better value per pencil. $10.00 buys both packs, which is 14 pencils, not 12.</p>` },
          { id: "m3b", cat: "Chance & counting",
            stem: `<p>A bag holds <b>5 red</b>, <b>3 blue</b> and <b>2 green</b> marbles. Kim takes one without looking.</p><div class="box">1. A red marble is more likely than a marble that is not red.<br>2. Green is the least likely colour.<br>3. It is impossible to take a yellow marble.</div><p>Which statements are correct?</p>`,
            options: ["1 only", "2 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], answer: 3,
            hint: `For statement 1, count the marbles that are <b>not</b> red: blue and green together.`,
            explain: `<p>Statement 1: there are 5 red and 3 + 2 = 5 not red, so they are <b>equally</b> likely. Not correct. Statement 2: green has the fewest marbles (2), so it is least likely. Correct. Statement 3: there are no yellow marbles, so it is impossible. Correct. So <b>2 and 3 only</b>.</p><p class="why-not">Statement 1 is the trap: red is the most likely <em>colour</em>, but it is not more likely than all the other marbles put together.</p>` },
          { id: "m3c", cat: "Rates",
            stem: `<p>A machine prints <b>45 posters in 3 minutes</b>. Printing at the same speed, how many posters does it print in <b>8 minutes</b>?</p>`,
            options: ["53", "90", "120", "135", "360"], answer: 2,
            hint: `Find how many posters it prints in <b>one</b> minute first.`,
            explain: `<p>In one minute: 45 ÷ 3 = 15 posters. In 8 minutes: 15 × 8 = <b>120</b>.</p><p class="why-not">360 is 45 × 8, which treats 45 as the number for one minute. 135 is 45 × 3. 53 just adds 45 and 8.</p>` },
          { id: "m3d", cat: "Time & timetables",
            stem: `<p>Today is <b>Wednesday</b>. What day of the week will it be in <b>40 days</b>?</p>`,
            options: ["Thursday", "Friday", "Saturday", "Sunday", "Monday"], answer: 4,
            hint: `Every 7 days you land on Wednesday again. How many whole weeks are in 40 days, and how many days are left over?`,
            explain: `<p>40 = 5 weeks (35 days) + 5 days. After 35 days it is Wednesday again. Five more days: Thursday, Friday, Saturday, Sunday, <b>Monday</b>.</p><p class="why-not">Sunday counts Wednesday itself as the first of the 5 days. Friday comes from 40 ÷ 7 ≈ 5 with the wrong leftover (2 instead of 5).</p>` },
        ],
      },
      {
        id: "m4", name: "The Deep Trench",
        questions: [
          { id: "m4a", cat: "Number & place value",
            stem: `<p>Lena thinks of a number. She <b>doubles</b> it, <b>subtracts 6</b>, then <b>divides by 4</b>. Her answer is <b>5</b>. What number did she start with?</p>`,
            options: ["1", "7", "13", "26", "52"], answer: 2,
            hint: `Work backwards from 5, undoing each step in reverse order. The opposite of “divide by 4” is “multiply by 4”.`,
            explain: `<p>Work backwards: 5 × 4 = 20. Undo “subtract 6”: 20 + 6 = 26. Undo “double”: 26 ÷ 2 = <b>13</b>. Check: 13 → 26 → 20 → 5. ✓</p><p class="why-not">26 stops one step early (it forgets to undo the doubling). 7 subtracts 6 again instead of adding it back. 1 does the steps forwards starting from 5.</p>` },
          { id: "m4b", cat: "Number & place value",
            stem: `<p>Two numbers <b>add up to 50</b>. One is <b>14 more</b> than the other. What is the <b>larger</b> number?</p>`,
            options: ["18", "25", "28", "32", "36"], answer: 3,
            hint: `Take the extra 14 away from 50 first. What is left is shared equally between the two numbers.`,
            explain: `<p>50 − 14 = 36, and 36 ÷ 2 = 18. So the smaller number is 18 and the larger is 18 + 14 = <b>32</b>. Check: 18 + 32 = 50. ✓</p><p class="why-not">18 is the smaller number, not the one asked for. 36 is 50 − 14 without halving. 25 is half of 50, which ignores the difference.</p>` },
          { id: "m4c", cat: "Area, perimeter & 3D",
            stem: `<p>A <b>square</b> paddock has sides <b>12 m</b> long. A farmer puts a fence post at <b>every corner</b>, and then more posts so that the posts are <b>3 m apart</b> all the way round. How many posts does she use?</p>`,
            options: ["16", "17", "20", "24", "48"], answer: 0,
            hint: `Each side has 5 posts, but be careful: a corner post belongs to <b>two</b> sides. Don't count it twice.`,
            explain: `<p>The distance all the way round is 4 × 12 = 48 m. Going round a closed shape, there is one post for every 3 m gap: 48 ÷ 3 = <b>16</b>.</p><p class="why-not">20 counts 5 posts on each side (5 × 4), which counts every corner post twice. 17 adds an extra end post, which is right for a straight fence but not for a loop. 48 is the distance round.</p>` },
          { id: "m4d", cat: "Rates",
            stem: `<p>Sam folds <b>4 paper boats every 10 minutes</b>. Lee folds <b>3 paper boats every 5 minutes</b>. Working at the same time, how long do they take to fold <b>70 boats</b> altogether?</p>`,
            options: ["50 minutes", "1 hour 10 minutes", "1 hour 40 minutes", "2 hours 30 minutes", "2 hours 55 minutes"], answer: 1,
            hint: `Their times are different (10 minutes and 5 minutes). How many boats does <b>Lee</b> fold in 10 minutes?`,
            explain: `<p>Use the same amount of time for both. In 10 minutes Sam folds 4 and Lee folds 3 + 3 = 6, so together they fold 10 boats every 10 minutes. 70 boats take <b>70 minutes = 1 hour 10 minutes</b>.</p><p class="why-not">1 hour 40 minutes adds 4 + 3 = 7 boats every 10 minutes, forgetting that Lee's 3 boats take only 5 minutes. 2 hours 55 minutes is Sam working alone.</p>` },
        ],
      },
      {
        id: "mb", name: "Leviathan", boss: true,
        questions: [
          { id: "mba", cat: "Fractions",
            stem: `<p>Mia spent <b>one third</b> of her money on a book. Then she spent <b>half of what was left</b> on a game. She now has <b>$12</b>. How much money did she start with?</p>`,
            options: ["$18", "$24", "$36", "$48", "$72"], answer: 2,
            hint: `Work backwards. The game cost half of what she had after the book, so the $12 she has left is the <b>other</b> half.`,
            explain: `<p>Work backwards. After the game she has $12, which is half of what she had after the book, so after the book she had $24. That $24 is the two thirds left after spending one third, so one third is $12 and the whole is <b>$36</b>. Check: $36 − $12 = $24, then half of $24 is $12. ✓</p><p class="why-not">$72 multiplies 12 × 2 × 3, treating $24 as one third instead of two thirds. $24 stops one step early.</p>` },
          { id: "mbb", cat: "Graphs & data",
            stem: `<p>The graph shows how many books five children read last term.</p>${GRAPH}<div class="box">1. Cy read exactly twice as many books as Ben.<br>2. Ava and Ben together read fewer books than Dee and Eli together.<br>3. Three of the children read more than 8 books.</div><p>Which statements are correct?</p>`,
            options: ["2 only", "3 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"], answer: 0,
            hint: `The lines go up in 2s, so a column that stops <b>halfway</b> between two lines is an odd number. Read Ben and Cy carefully.`,
            explain: `<p>Read the columns: Ava 8, Ben 5, Cy 11, Dee 6, Eli 10. Statement 1: twice 5 is 10, but Cy read 11. Not correct. Statement 2: 8 + 5 = 13 and 6 + 10 = 16, and 13 is fewer than 16. Correct. Statement 3: only Cy (11) and Eli (10) read <b>more than</b> 8; Ava read exactly 8. Not correct. So <b>2 only</b>.</p><p class="why-not">Statement 1 looks right if you read Cy's column as 12 or Ben's as 6. Statement 3 looks right if you count Ava, but 8 is not more than 8.</p>` },
          { id: "mbc", cat: "Area, perimeter & 3D",
            stem: `<p>This large cube is made of <b>27 small cubes</b>. The whole outside of the large cube is painted red, and then it is pulled apart.</p>${CUBE}<p>How many small cubes have <b>exactly two</b> red faces?</p>`,
            options: ["8", "12", "18", "24", "26"], answer: 1,
            hint: `Corner cubes have three painted faces. Look for the cubes in the <b>middle of each edge</b> of the large cube. How many edges does a cube have?`,
            explain: `<p>A small cube has exactly two red faces when it sits in the middle of an <b>edge</b> of the large cube (not at a corner). A cube has 12 edges, and each edge has one middle cube: <b>12</b>.</p><p class="why-not">8 is the number of corner cubes, which have three red faces. 26 is every cube with any paint at all (only the one in the very centre has none). 24 counts two cubes on every edge.</p>` },
          { id: "mbd", cat: "Number & place value",
            stem: `<p>Using each of the digits <b>2</b>, <b>6</b> and <b>9</b> exactly once, Noah makes the <b>largest</b> possible 3-digit number and the <b>smallest</b> possible 3-digit number. What is the <b>difference</b> between them?</p>`,
            options: ["603", "683", "687", "693", "707"], answer: 3,
            hint: `Largest: biggest digit first. Smallest: smallest digit first. Then subtract carefully, because the ones need a trade (2 − 9 can't be done).`,
            explain: `<p>Largest: 962. Smallest: 269. 962 − 269: take away 262 to get 700, then 7 more: <b>693</b>.</p><p class="why-not">707 takes the smaller digit from the larger in every column (9 − 2, 6 − 6, 9 − 2) instead of trading. 683 and 603 are slips in the trading.</p>` },
          { id: "mbe", cat: "Money & best value",
            stem: `<p><b>3 pens and 2 rulers</b> cost <b>$9.50</b>.<br><b>1 pen and 2 rulers</b> cost <b>$5.50</b>.</p><p>How much do <b>1 pen and 1 ruler</b> cost together?</p>`,
            options: ["$1.75", "$2.00", "$2.75", "$3.00", "$3.75"], answer: 4,
            hint: `Compare the two lines. The rulers are the same in both, so the extra $4.00 pays for the 2 extra pens.`,
            explain: `<p>The first lot has 2 more pens and costs $9.50 − $5.50 = $4.00 more, so one pen is $2.00. Then 1 pen + 2 rulers = $5.50 means 2 rulers cost $3.50, so one ruler is $1.75. Together: $2.00 + $1.75 = <b>$3.75</b>.</p><p class="why-not">$2.00 is the pen alone and $1.75 is the ruler alone: both stop before answering the question. $2.75 just halves $5.50.</p>` },
        ],
      },
    ],
  });
})();
