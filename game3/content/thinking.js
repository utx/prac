/* ---------------------------------------------------------------
   STORM ISLAND: thinking questions (hand-written). Four options (A–D).
   tier 1–3 = storm circle 1–3; tier 4 = the boss (hardest third of the sample papers).
   --------------------------------------------------------------- */
(() => {
  const { tbl, fig } = LIB;
  const WHO = (a, b) => [`${a} only`, `${b} only`, `Both ${a} and ${b}`, `Neither ${a} nor ${b}`];

  /* a five-square tile (a 2 × 2 block with one extra square), turned or flipped. Cells are [row, col]. */
  const norm = c => { const r0 = Math.min(...c.map(x => x[0])), c0 = Math.min(...c.map(x => x[1])); return c.map(([r, k]) => [r - r0, k - c0]); };
  const turn = c => norm(c.map(([r, k]) => [k, -r]));            // a quarter turn clockwise
  const flip = c => norm(c.map(([r, k]) => [r, -k]));            // turned over (mirror image)
  const P = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0]];
  const tile = cells => {
    const u = 24, W = 3 * u + 6, has = (r, k) => cells.some(c => c[0] === r && c[1] === k);
    const desc = "A tile of five squares on a 3 by 3 grid. " + [0, 1, 2].map(r => `Row ${r + 1}: ${[0, 1, 2].map(k => has(r, k) ? "square" : "empty").join(", ")}`).join(". ") + ".";
    return `<svg viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" role="img" aria-label="${desc}">${cells.map(([r, k]) => `<rect x="${3 + k * u}" y="${3 + r * u}" width="${u}" height="${u}" fill="#b9e3c6" stroke="${INK}" stroke-width="2"/>`).join("")}</svg>`;
  };
  const PTILE = fig(tile(P));

  /* towers of cubes seen from above, and a view of them from one side */
  const PLAN = `<div class="figure"><div style="display:inline-flex;align-items:center;gap:10px"><div><table class="grid" style="font-weight:700;margin:0"><tr><td>1</td><td>3</td><td>1</td></tr><tr><td>2</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>2</td></tr></table><div style="font-size:14px;font-weight:700;letter-spacing:2px;margin-top:4px">▲ FRONT ▲</div></div><div style="font-size:14px;font-weight:700;text-align:left">◀ Mia stands here,<br>on the right-hand side,<br>looking at the towers</div></div></div>`;
  const view = h => {
    const u = 22, H = 3 * u + 6;
    return `<svg viewBox="0 0 ${3 * u + 6} ${H}" width="${3 * u + 6}" height="${H}" role="img" aria-label="Three columns of squares side by side. From left to right they are ${h.join(", ")} squares tall.">${h.map((n, c) => Array.from({ length: n }, (_, k) => `<rect x="${3 + c * u}" y="${H - 3 - (k + 1) * u}" width="${u}" height="${u}" fill="#c9d6f2" stroke="${INK}" stroke-width="2"/>`).join("")).join("")}</svg>`;
  };

  THINKING.push(
    /* ===================== circle 1 ===================== */
    { id: "t101", tier: 1, cat: "Supports the claim",
      stem: `<div class="box">Ranger Kim: “Visitors should keep to the marked track through the sand dunes. That way the dune plants will have a chance to grow back.”</div><p>Which statement, if true, best supports Ranger Kim’s claim?</p>`,
      options: ["The marked track has the best view of the sea.", "Dune plants help to hold the sand in place during storms.", "Dune plants are easily crushed when people walk on them.", "Most visitors already carry a map that shows the track."], answer: 2,
      explain: `<p>The claim joins two things: staying on the track, and the plants growing back. The best support explains the link. If plants are <b>crushed by feet</b>, then keeping feet on the track is what lets them grow.</p><p class="why-not">The view and the maps are about the track, not the plants. The fact about storms tells us why the plants matter, but not why staying on the track helps them.</p>` },
    { id: "t102", tier: 1, cat: "Spot the mistake",
      stem: `<div class="box">Sam’s mum has a red tag on her keys. In the park, Sam finds a bunch of keys with a red tag.<br>Sam: “These must be Mum’s keys.”</div><p>Which one of these shows the mistake Sam has made?</p>`,
      options: ["Other people’s keys may have a red tag too.", "Sam’s mum may have more than one bunch of keys.", "The keys may have been in the park for a long time.", "Red may not be Sam’s mum’s favourite colour."], answer: 0,
      explain: `<p>Sam has matched just <b>one thing</b>: the red tag. That would only prove the keys are Mum’s if nobody else had a red tag, and Sam doesn’t know that.</p><p class="why-not">How many bunches Mum owns, how long the keys have been there and which colour she likes best don’t show what is wrong with jumping from “red tag” to “Mum’s keys”.</p>` },
    { id: "t103", tier: 1, cat: "Order & arrangement",
      stem: `<p>Three jars stand in a row on a shelf: jam, honey and pickles.</p><p>The jam is somewhere to the left of the honey.<br>The pickles are not next to the jam.</p><p>Which jar is in the middle?</p>`,
      options: ["the jam", "the honey", "the pickles", "It is impossible to tell."], answer: 1,
      explain: `<p>The pickles are not next to the jam, so those two must be at the two ends, with the <b>honey</b> between them. The jam is left of the honey, so the row is jam, honey, pickles.</p><p class="why-not">If the jam or the pickles were in the middle, the pickles would be right next to the jam. There is only one row that fits, so it is possible to tell.</p>` },
    { id: "t104", tier: 1, cat: "Rules & codes",
      stem: `<p>Mika only eats sandwiches that have <b>cheese</b> in them but <b>no tomato</b>.</p>${tbl(["Sandwich", "Fillings"], [["1", "cheese, ham"], ["2", "cheese, tomato"], ["3", "egg, lettuce"], ["4", "cheese, lettuce, tomato"], ["5", "cheese, cucumber"]])}<p>How many of these sandwiches will Mika eat?</p>`,
      options: ["1", "2", "3", "4"], answer: 1,
      explain: `<p>Both parts of the rule must be true. Sandwiches 1 and 5 have cheese and no tomato, so Mika eats <b>2</b>.</p><p class="why-not">Four sandwiches have cheese, but two of those also have tomato. Three sandwiches have no tomato, but one of those (egg and lettuce) has no cheese.</p>` },
    { id: "t105", tier: 1, cat: "Number problems",
      stem: `<p>Leo feeds his lizard every <b>second</b> day. He feeds it on a Monday, then on the Wednesday, and so on.</p><p>On which day of the week does Leo feed the lizard for the <b>fifth</b> time?</p>`,
      options: ["Friday", "Saturday", "Sunday", "Tuesday"], answer: 3,
      explain: `<p>List the feeds: 1st Monday, 2nd Wednesday, 3rd Friday, 4th Sunday, 5th <b>Tuesday</b>.</p><p class="why-not">Sunday is the fourth feed: the Monday counts as the first feed, not as number zero. Friday is the third. Saturday is never a feeding day in that week.</p>` },
    { id: "t106", tier: 1, cat: "Tables & timetables",
      stem: `<p>The table shows four children’s marks out of 20 in two spelling tests.</p>${tbl(["", "Test 1", "Test 2"], [["Ana", 12, 17], ["Bo", 15, 19], ["Cy", 9, 16], ["Di", 18, 20]])}<p>Who <b>improved</b> the most from Test 1 to Test 2?</p>`,
      options: ["Ana", "Bo", "Cy", "Di"], answer: 2,
      explain: `<p>Improvement is the gain, Test 2 take away Test 1. Ana +5, Bo +4, <b>Cy +7</b>, Di +2.</p><p class="why-not">Di has the highest marks in both tests but gained the least. The question asks who went up the most, not who scored the most.</p>` },
    { id: "t107", tier: 1, cat: "Must or cannot be true",
      stem: `<div class="box">Every child in the Dolphins swimming group can swim 25 metres.<br>Nadia is in the Dolphins.<br>Omar can swim 25 metres.</div><p>Which one of these <b>must</b> be true?</p>`,
      options: ["Nadia can swim 25 metres.", "Omar is in the Dolphins.", "Nadia is a faster swimmer than Omar.", "Only Dolphins can swim 25 metres."], answer: 0,
      explain: `<p>Every Dolphin can swim 25 metres and Nadia is a Dolphin, so <b>Nadia can swim 25 metres</b>.</p><p class="why-not">Omar can swim 25 metres, but the rule never says that <i>only</i> Dolphins can, so he might be in another group. Nothing is said about speed.</p>` },
    { id: "t108", tier: 1, cat: "Spatial",
      stem: `<p>Jo stands facing <b>north</b>. She makes a quarter turn to her right. Then she makes a half turn.</p><p>Which way is Jo facing now?</p>`,
      options: ["north", "east", "south", "west"], answer: 3,
      explain: `<p>A quarter turn to the right from north takes Jo to east. A half turn then points her the opposite way: <b>west</b>.</p><p class="why-not">East is where she faces after only the first turn. South would need just one more quarter turn, not a half turn.</p>` },

    /* ===================== circle 2 ===================== */
    { id: "t201", tier: 2, cat: "Spot the mistake",
      stem: `<div class="box">To enter the art prize, a painting must be handed in by Friday. Zane handed his painting in on Wednesday.<br>Zane: “I got mine in early, so I am sure to win a prize.”</div><p>Which one of these shows the mistake Zane has made?</p>`,
      options: ["Zane may have painted more quickly than the other children.", "Being on time may only let Zane’s painting into the contest.", "The judges may not look at any of the paintings until the following week.", "Some children may hand in their paintings on Thursday."], answer: 1,
      explain: `<p>Being on time is <b>needed</b> to enter, but it does not <b>guarantee</b> a prize. Every painting handed in by Friday is in the same position.</p><p class="why-not">How fast Zane painted, when the judging happens and when other children hand theirs in don’t explain why “on time” is not the same as “winner”.</p>` },
    { id: "t202", tier: 2, cat: "Supports the claim",
      stem: `<div class="box">Mr Diaz, the caretaker: “We should put a second bin beside the oval. Then less rubbish will be left on the grass.”</div><p>Which statement, if true, best supports Mr Diaz’s claim?</p>`,
      options: ["Three different classes use the oval for games every lunchtime.", "Rubbish left on the grass attracts ibises.", "The school already has a bin near the canteen.", "Children say the only bin is too far away from the oval."], answer: 3,
      explain: `<p>The claim needs a reason why a bin <i>beside the oval</i> would cut the rubbish. If children drop rubbish because the bin is <b>too far away</b>, a nearer bin fixes exactly that.</p><p class="why-not">How many classes use the oval and what the rubbish attracts show that rubbish is a problem, not that a second bin would solve it. A bin near the canteen is the far-away bin already there.</p>` },
    { id: "t203", tier: 2, cat: "Whose reasoning",
      stem: `<div class="box">Most of the apples in a box are green. The rest are red.</div><p>Priya: “If I take an apple from the box without looking, it will probably be green.”</p><p>Quentin: “The apple on the teacher’s desk is green, so it probably came from this box.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Priya", "Quentin"), answer: 0,
      explain: `<p>“Most apples in the box are green” tells us about apples <i>from the box</i>. So an apple taken from it is probably green: <b>Priya</b> is right.</p><p class="why-not">Quentin turns it round. We are told nothing about where green apples usually come from. There could be thousands of green apples that were never in this box.</p>` },
    { id: "t205", tier: 2, cat: "Order & arrangement",
      stem: `<p>Four boats finished a race, one after another.</p><p>The red boat finished before the blue boat but after the green boat.<br>The yellow boat finished after the red boat.<br>The blue boat was not last.</p><p>Which boat came <b>third</b>?</p>`,
      options: ["the red boat", "the yellow boat", "the blue boat", "the green boat"], answer: 2,
      explain: `<p>Green is before red, and red is before both blue and yellow, so the race starts green, red. Blue was not last, so blue is third and yellow is fourth: green, red, <b>blue</b>, yellow.</p><p class="why-not">Yellow is tempting because it is the last boat mentioned, but the final clue pushes yellow to the back. Red and green are fixed in second and first place.</p>` },
    { id: "t206", tier: 2, cat: "Rules & codes",
      stem: `<p>In a word game, each letter is worth points:</p>${tbl(["A", "E", "T", "M", "S"], [["1", "2", "3", "4", "5"]]).replace("<th>1</th>", "<td>1</td>")}<p>A word’s score is the total of its letters. So <b>TEAM</b> scores 3 + 2 + 1 + 4 = 10.</p><p>Which of these words scores the most?</p>`,
      options: ["MATES", "TASTE", "STEAM", "MESS"], answer: 3,
      explain: `<p>Add each word: MATES = 4 + 1 + 3 + 2 + 5 = 15. TASTE = 3 + 1 + 5 + 3 + 2 = 14. STEAM = 15. <b>MESS</b> = 4 + 2 + 5 + 5 = 16.</p><p class="why-not">The longer words look as if they should win, but MESS has two letters worth 5. MATES and STEAM use the same five letters, so they tie on 15.</p>` },
    { id: "t207", tier: 2, cat: "Tables & timetables",
      stem: `<p>The table shows how many stickers two children have.</p>${tbl(["", "Animal", "Space", "Sport"], [["Ivy", 6, 5, 4], ["Jon", 7, 2, 8]])}<p>Ivy gives Jon <b>3 space</b> stickers. Jon gives Ivy <b>2 sport</b> stickers.</p><p>After the swap, how many <b>more</b> stickers does Jon have than Ivy?</p>`,
      options: ["2", "3", "4", "8"], answer: 2,
      explain: `<p>Before: Ivy 6 + 5 + 4 = 15 and Jon 7 + 2 + 8 = 17.</p><p>After: Ivy 15 − 3 + 2 = 14 and Jon 17 + 3 − 2 = 18. Jon has <b>4</b> more.</p><p class="why-not">2 is the gap before the swap. 3 changes only one child’s total: every sticker that moves makes one pile smaller <i>and</i> the other bigger. 8 stops after Ivy’s gift and forgets the stickers Jon gives back.</p>` },
    { id: "t208", tier: 2, cat: "Number problems",
      stem: `<p>A dentist sees patients from <b>9:00 am</b> until <b>5:00 pm</b>, with a lunch break from 12:30 pm to 1:30 pm.</p><p>Every check-up takes exactly 30 minutes, and there are no gaps between them.</p><p>How many check-ups can the dentist do in one day?</p>`,
      options: ["7", "14", "15", "16"], answer: 1,
      explain: `<p>Morning: 9:00 to 12:30 is 3½ hours = 7 check-ups. Afternoon: 1:30 to 5:00 is 3½ hours = 7 check-ups. Altogether <b>14</b>.</p><p class="why-not">16 forgets the lunch break (8 hours of check-ups). 15 takes off only half an hour for lunch. 7 is just the morning.</p>` },
    { id: "t209", tier: 2, cat: "Must or cannot be true",
      stem: `<p>Asha is taller than Ben, and Ben is taller than Col.</p><p>The three friends stand on a staircase, each on a different step. Now the tops of their heads are exactly level.</p><p>Which one of these <b>cannot</b> be true?</p>`,
      options: ["Ben is on a higher step than Col.", "Asha is on the lowest step.", "Col is on the highest step.", "Ben is on a step between the other two."], answer: 0,
      explain: `<p>For the heads to be level, the shortest person needs the most help from the stairs. So Col is highest, Ben is in between and Asha is lowest.</p><p>That makes “<b>Ben is on a higher step than Col</b>” impossible: Ben is taller, so on a higher step his head would be above Col’s.</p><p class="why-not">The other three statements describe exactly how they must be standing.</p>` },
    { id: "t210", tier: 2, cat: "Spatial", visual: true,
      stem: `<p>Here is a tile made of five squares.</p>${PTILE}<p>Three of the tiles below are this tile <b>turned round</b>. One has been <b>flipped over</b>, so it is a mirror image.</p><p>Which tile has been flipped over?</p>`,
      options: [tile(flip(turn(P))), tile(turn(P)), tile(turn(turn(P))), tile(turn(turn(turn(P))))], answer: 0,
      explain: `<p>Turn the first tile in your head, a quarter turn at a time. Going clockwise round the block of four, the extra square always sits just <i>after</i> the same corner. Three of the tiles keep that pattern.</p><p>In the <b>first tile (A)</b> the extra square is on the other side of the block. No amount of turning does that: the tile must have been flipped over.</p><p class="why-not">The other three are the tile after a quarter turn, a half turn and a three-quarter turn.</p>` },

    /* ===================== circle 3 ===================== */
    { id: "t301", tier: 3, cat: "Whose reasoning",
      stem: `<div class="box">A rule in a board game: “If you roll a six, you get another turn.” The rule is always followed.</div><p>Ed: “Fay got another turn, so she must have rolled a six.”</p><p>Gus: “Hana did not get another turn, so she cannot have rolled a six.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Ed", "Gus"), answer: 1,
      explain: `<p>The rule says what happens <i>after a six</i>. If Hana had rolled a six she would have had another turn. She didn’t, so she didn’t roll one: <b>Gus</b> is right.</p><p class="why-not">Ed runs the rule backwards. The rule does not say a six is the <i>only</i> way to get another turn. Fay might have landed on a bonus square.</p>` },
    { id: "t302", tier: 3, cat: "Spot the mistake",
      stem: `<div class="box">A survey found that most children at Hillside School like the new playground.<br>Mia: “My cousin goes to Hillside, so she likes the new playground.”</div><p>Which one of these shows the mistake Mia has made?</p>`,
      options: ["The survey may have been done before the playground was finished.", "Mia may not have seen the new playground herself.", "Children at other schools may like their playgrounds more.", "Mia’s cousin may be one of the children who do not like it."], answer: 3,
      explain: `<p>“Most” is not “all”. Some Hillside children do not like the playground, and Mia’s <b>cousin could be one of them</b>. Mia can only say her cousin <i>probably</i> likes it.</p><p class="why-not">The timing of the survey, whether Mia has seen the playground and what other schools think don’t explain what is wrong with going from “most children” to “this child”.</p>` },
    { id: "t303", tier: 3, cat: "Supports the claim",
      stem: `<div class="box">Dr Osei: “High schools should start lessons an hour later in the morning. Then students would learn more in their first lesson of the day.”</div><p>Which statement, if true, best supports Dr Osei’s claim?</p>`,
      options: ["Students who are still sleepy take in less of what they are taught.", "Many high school students say they would like a later start.", "Teenagers tend to go to bed later than younger children do.", "Students who learn more in the mornings usually go on to get better marks."], answer: 0,
      explain: `<p>The claim needs a link from “starting later” to “learning more”. If <b>sleepy students take in less</b>, then a later start (more sleep) means more is learned.</p><p class="why-not">What students would like is not about learning. Going to bed later explains why they are tired, but stops before learning. Better marks is about what happens <i>after</i> learning more, not what causes it.</p>` },
    { id: "t304", tier: 3, cat: "Spatial", visual: true,
      stem: `<p>Towers of cubes stand on a 3 by 3 board. This plan shows the board from <b>above</b>. Each number tells you how many cubes are in that tower.</p>${PLAN}<p>What does Mia see?</p>`,
      options: [view([2, 3, 2]), view([3, 2, 2]), view([2, 2, 3]), view([2, 1, 1])], answer: 2,
      explain: `<p>From the side, Mia sees one column for each <i>row</i> of the plan, and each column is as tall as the tallest tower in that row. Front row: 2. Middle row: 2. Back row: 3.</p><p>Standing on the right-hand side, the front of the board is on Mia’s left, so she sees <b>2, 2, 3</b> from left to right (C).</p><p class="why-not">2, 3, 2 is the view from the front. 3, 2, 2 is the view from the opposite side. 2, 1, 1 is only the nearest line of towers: taller towers behind them still show over the top.</p>` },
    { id: "t305", tier: 3, cat: "Rules & codes",
      stem: `<p>A coach must choose <b>three</b> of these five swimmers for a relay: Ada, Bo, Cy, Di and Eli.</p><div class="box">Ada and Bo will not swim in the same team.<br>If Cy is chosen, Di must be chosen too.<br>Eli must be chosen.</div><p>Which team can the coach choose?</p>`,
      options: ["Bo, Di and Eli", "Ada, Bo and Eli", "Ada, Cy and Eli", "Bo, Cy and Di"], answer: 0,
      explain: `<p>Test each team against all three rules. <b>Bo, Di and Eli</b>: Ada and Bo are not together, Cy is not chosen so the second rule does not matter, and Eli is in. It works.</p><p class="why-not">Ada, Bo and Eli puts Ada and Bo together. Ada, Cy and Eli has Cy without Di. Bo, Cy and Di leaves out Eli.</p>` },
    { id: "t306", tier: 3, cat: "Tables & timetables",
      stem: `<p>Four garden lamps are on timers.</p>${tbl(["Lamp", "Switches on", "Switches off"], [["A", "5:00 pm", "8:30 pm"], ["B", "6:15 pm", "9:00 pm"], ["C", "7:00 pm", "7:45 pm"], ["D", "8:00 pm", "10:00 pm"]])}<p>For how long altogether are <b>three</b> lamps on at the same time?</p>`,
      options: ["30 minutes", "45 minutes", "1 hour 15 minutes", "2 hours 15 minutes"], answer: 2,
      explain: `<p>A and B are both on from 6:15 to 8:30. During that time C joins them from 7:00 to 7:45 (45 minutes), and D joins them from 8:00 until A goes off at 8:30 (30 minutes).</p><p>45 + 30 = <b>1 hour 15 minutes</b>. (C and D are never on together, so there are never four.)</p><p class="why-not">45 minutes and 30 minutes are each only one of the two stretches. 2 hours 15 minutes is how long A and B are on together, which is only two lamps.</p>` },
    { id: "t307", tier: 3, cat: "Must or cannot be true",
      stem: `<div class="box">In a hockey league, a team wins a game only if it scores more goals than the other team. If the two teams score the same, the game is a draw.<br>Last Saturday the Otters scored no goals.</div><p>Which one of these <b>must</b> be true?</p>`,
      options: ["The Otters lost on Saturday.", "The other team scored at least one goal.", "The Otters have not won a game this season.", "The Otters did not win on Saturday."], answer: 3,
      explain: `<p>To win you must score more than the other team, and nobody can score fewer than zero. So with no goals <b>the Otters did not win</b>.</p><p class="why-not">They need not have lost: if the other team also scored nothing, it was a 0–0 draw. That is also why the other team need not have scored. One Saturday tells us nothing about the rest of the season.</p>` },
    { id: "t308", tier: 3, cat: "Number problems",
      stem: `<p>There are <b>24</b> children in a class. <b>15</b> play soccer and <b>12</b> play netball. <b>2</b> children play neither sport.</p><p>How many children play <b>both</b> soccer and netball?</p>`,
      options: ["3", "5", "7", "10"], answer: 1,
      explain: `<p>24 − 2 = 22 children play at least one sport. But 15 + 12 = 27, which is 5 too many. The extra 5 are the children who were counted twice, once for each sport: <b>5</b> play both.</p><p>Check: 10 soccer only + 5 both + 7 netball only + 2 neither = 24.</p><p class="why-not">3 is just 15 − 12. 7 is the number who play netball only, and 10 is the number who play soccer only.</p>` },

    /* ===================== the boss ===================== */
    { id: "t401", tier: 4, cat: "Whose reasoning",
      stem: `<div class="box">A bag holds 6 lemon, 4 mint and 3 berry lollies. They are all wrapped the same, so nobody can tell them apart.</div><p>Pia: “If I take out 4 lollies, I am certain to get at least two of the same flavour.”</p><p>Raj: “If I take out 8 lollies, I am certain to get at least one berry.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Pia", "Raj"), answer: 0,
      explain: `<p>To be <i>certain</i>, think of the unluckiest case. There are only 3 flavours, so the first 3 lollies could all be different, but the 4th must match one of them. <b>Pia</b> is right.</p><p class="why-not">Raj is wrong: there are 6 + 4 = 10 lollies that are not berry, so his 8 could all be lemon and mint. He would need 11 to be certain.</p>` },
    { id: "t402", tier: 4, cat: "Spot the mistake",
      stem: `<div class="box">After recess, the door of the class hamster’s cage was found open. Only Ivy and Jack were in the room during recess.<br>Ivy: “I didn’t open it, so Jack must have.”</div><p>Which one of these shows the mistake Ivy has made?</p>`,
      options: ["Jack may like the hamster more than Ivy does.", "Ivy may have been in the room for much longer than Jack was.", "The hamster may not have left its cage.", "The door may not have been latched properly before recess."], answer: 3,
      explain: `<p>Ivy thinks there are only two possibilities: she opened it, or Jack did. There is a third: <b>nobody opened it at recess</b>. A door that was not latched could have swung open by itself.</p><p class="why-not">Who likes the hamster, who was in the room longer and whether the hamster got out don’t point to anything wrong with her “me or Jack” thinking.</p>` },
    { id: "t403", tier: 4, cat: "Number problems",
      stem: `<p>A class of <b>20</b> children voted for a mascot: an owl, a fox or a frog. Every child voted for exactly <b>two</b> of the three animals.</p><p>The owl got 14 votes and the fox got 15 votes.</p><p>How many votes did the frog get?</p>`,
      options: ["9", "11", "20", "29"], answer: 1,
      explain: `<p>20 children with 2 votes each makes 40 votes altogether. The owl and the fox took 14 + 15 = 29 of them, so the frog got 40 − 29 = <b>11</b>.</p><p class="why-not">29 is the owl’s and fox’s votes, not the frog’s. 20 is the number of children, and each of them had two votes, not one. 9 comes from taking 29 away from the wrong total.</p>` },
    { id: "t404", tier: 4, cat: "Spatial",
      stem: `<p>On a dice, the numbers on opposite faces always add up to <b>7</b>.</p><p>A dice sits on a table with <b>1 on top</b>, <b>2 facing you</b> and <b>3 on the right-hand side</b>.</p><p>You tip the dice over once to the <b>right</b>, so the top face becomes the right-hand face. Then you tip it once <b>towards you</b>, so the top face becomes the face that looks at you.</p><p>Which number is on top now?</p>`,
      options: ["2", "4", "5", "6"], answer: 2,
      explain: `<p>Start: top 1, bottom 6, front 2, back 5, right 3, left 4.</p><p>Tip to the right: the left face comes up, so the top is 4 (front and back stay as 2 and 5).</p><p>Tip towards you: the back face comes up, so the top is <b>5</b>.</p><p class="why-not">4 stops after the first tip. 6 is opposite the 1 you started with, but the bottom never comes straight to the top in one tip. 2 is the face that started at the front; after the second tip it is underneath.</p>` },
    { id: "t405", tier: 4, cat: "Order & arrangement",
      stem: `<p>Five shelves are numbered 1 (bottom) to 5 (top). Each holds one thing: a globe, a clock, a vase, a lamp and a trophy.</p><div class="box">The trophy is on shelf 3.<br>The lamp is on the shelf directly above the globe.<br>The clock is higher than the vase.<br>The vase is not on the bottom shelf.</div><p>What is on shelf <b>4</b>?</p>`,
      options: ["the clock", "the lamp", "the globe", "the vase"], answer: 3,
      explain: `<p>With the trophy on 3, the globe and lamp (one directly above the other) must be on 1 and 2, or on 4 and 5.</p><p>If they were on 4 and 5, the vase and clock would be on 1 and 2. The vase can’t be on 1, so it would be on 2 with the clock below it. But the clock must be higher. That fails.</p><p>So the globe is on 1 and the lamp on 2. The vase and clock take 4 and 5 with the clock higher: the <b>vase</b> is on 4.</p><p class="why-not">The clock is on 5, the lamp on 2 and the globe on 1.</p>` },
    { id: "t406", tier: 4, cat: "Whose reasoning",
      stem: `<div class="box">The canteen sells soup <b>only</b> on days when the temperature at 9 am is below 15 degrees. On every such day, it does sell soup.</div><p>Wes: “The canteen is selling soup today, so it was below 15 degrees at 9 am.”</p><p>Xan: “It was 20 degrees at 9 am today, so there will be no soup at the canteen.”</p><p>Whose reasoning is correct?</p>`,
      options: WHO("Wes", "Xan"), answer: 2,
      explain: `<p>“Only on days below 15 degrees” means soup is never sold on a warmer day. So if soup is on sale it must have been below 15 (Wes), and on a 20-degree morning there can be no soup (Xan). <b>Both</b> are right.</p><p class="why-not">Many rules only work in one direction, which is why “only one of them” is tempting. Here the word “only” makes Wes’s and Xan’s statements two ways of saying the same thing.</p>` },
    { id: "t407", tier: 4, cat: "Supports the claim",
      stem: `<div class="box">Councillor Abara: “We should plant shady trees along the footpaths of Main Street. Then more people will walk to the shops in summer instead of driving.”</div><p>Which statement, if true, best supports the councillor’s claim?</p>`,
      options: ["Streets lined with trees look more attractive to visitors.", "Many people say Main Street is too hot to walk along in summer.", "Parking spaces near the shops are very hard to find during summer.", "People who walk to the shops tend to visit more of them."], answer: 1,
      explain: `<p>The claim is that <i>shade</i> will get people walking. That only works if <b>heat is what stops them now</b>. If people say the street is too hot to walk along, shady trees remove the reason they drive.</p><p class="why-not">Looking attractive is a different benefit of trees. Scarce parking is a reason to walk that has nothing to do with trees. More shop visits is a result of walking, not a reason that trees would cause it.</p>` },
  );
})();
