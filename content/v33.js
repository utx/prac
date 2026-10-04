/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 33
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: narrative ---- */
const PARAS = [
  `When Mr Okafor handed out the instruments, Wren held her breath. The trumpets went to Leo and Sami. The drums went to the Fitzgerald twins, who had been drumming on desks since kindergarten. Then Mr Okafor reached into the box and pulled out a small, bent piece of silver on a string.`,
  `“Triangle,” he said, and smiled <b>as if he were giving her a present</b>.`,
  `For three weeks Wren sat at the end of the back row and counted. In “Sea Song” she had to wait one hundred and twelve bars before her single note. She counted bars the way other people count sheep, and some afternoons she very nearly fell asleep doing it. Once she lost count completely and played her note into a silence so long and empty that Leo turned around to stare.`,
  `“It’s not a real instrument,” she told her mother. “Anyone could play it. A goldfish could play it.”`,
  `On the night of the concert, the hall was hot and crowded. The trumpets were loud and a little wrong. Wren counted. Ninety-nine, a hundred. Her hands were damp. At a hundred and ten, Mr Okafor looked straight at her over the top of his glasses, <b>the way a pilot might check a single dial before landing</b>. She lifted the beater.`,
  `The note rang out, thin and bright, and hung over the hall until it faded into nothing. For a moment nobody clapped. Then everybody did.`,
  `Afterwards, a woman Wren had never seen before stopped her by the door. “The little bell at the end,” she said. “That was the best part.”`,
  `Wren didn’t correct her.`
];
const PASSAGE = {
  title: "The Triangle",
  note: "Read the story below, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: workshop table ---- */
const WORKSHOP_TABLE = `<table style="border-collapse:collapse;margin:10px 0 4px;font-size:0.95em">
  <tr><th style="text-align:left;border-bottom:2px solid ${INK};padding:4px 18px 4px 4px">workshop</th><th style="text-align:left;border-bottom:2px solid ${INK};padding:4px">days available</th></tr>
  ${[["pottery", "Monday, Thursday"], ["robotics", "Tuesday, Friday"], ["drama", "Monday, Friday"], ["cooking", "Wednesday, Thursday"], ["puppets", "Wednesday, Thursday"]]
    .map(([w, d]) => `<tr><td style="padding:4px 18px 4px 4px;border-bottom:1px solid #d5dbe5">${w}</td><td style="padding:4px;border-bottom:1px solid #d5dbe5">${d}</td></tr>`).join("")}
</table>`;

/* ---- Maths Q3: place value chart ---- */
const PV_TABLE = `<table style="border-collapse:collapse;margin:10px 0 4px;text-align:center;font-size:0.95em;max-width:100%">
  <tr>${["thousands", "hundreds", "tens", "ones"].map(h => `<th style="border:1.5px solid ${INK};padding:5px 7px;background:#eef2f8;font-weight:600;font-size:0.85em">${h}</th>`).join("")}</tr>
  <tr>${["12", "15", "9", "23"].map(v => `<td style="border:1.5px solid ${INK};padding:7px 7px;font-weight:700;font-size:1.15em">${v}</td>`).join("")}</tr>
</table>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the story, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "Why does the writer say that Mr Okafor smiled “as if he were giving her a present”?",
        options: ["To show that Mr Okafor was teasing Wren about her tiny instrument.",
                  "To suggest that Mr Okafor saw more value in the triangle than Wren did.",
                  "To show that the triangle was brand new and had been bought specially for the concert.",
                  "To suggest that Wren was delighted to be chosen to play the triangle."],
        answer: 1,
        skill: "understanding why a writer includes a detail",
        explain: `<p>People smile like that when they think they are giving something good. Mr Okafor seems to believe the triangle is a worthwhile part to play. Wren clearly doesn’t agree yet: she later says “It’s not a real instrument.” The detail sets up the gap between how he sees the triangle and how she does, and the ending proves him right.</p>
                  <p class="why-not">D is the trap: it takes the “present” at face value. But Wren “held her breath” hoping for something better, and she complains about the triangle afterwards, so she wasn’t delighted. A has no support, because nothing suggests he is mocking her. C reads the comparison too literally: the triangle is old and “bent”, not new.</p>`
      },
      {
        stem: "The writer says Mr Okafor looked at Wren “the way a pilot might check a single dial before landing”. This comparison suggests that",
        options: ["Mr Okafor was worried because the concert was going badly.",
                  "Mr Okafor wanted the concert to be over as quickly as possible.",
                  "Wren had often played her note too early in rehearsals.",
                  "Wren’s single note was something important he was relying on."],
        answer: 3,
        skill: "interpreting a comparison",
        explain: `<p>A pilot checks a dial before landing because that one reading really matters at a key moment. By comparing his look to this, the writer shows that Wren’s one small note was important, and that Mr Okafor was counting on her at exactly the right moment, near the end of the song.</p>
                  <p class="why-not">A is the trap: the trumpets were “a little wrong”, so things weren’t perfect, but the comparison is about one important check, not about worry. B misreads “landing” as simply wanting it over. C is partly based on the story: Wren once lost count. But she played <em>late</em> into a long silence, not early, and the comparison is about this moment, not rehearsals.</p>`
      },
      {
        stem: "Why does Wren not correct the woman at the end of the story?",
        options: ["She was too shy to argue with a grown-up she had never met.",
                  "She still thought the triangle was not a real instrument, so its name didn’t matter.",
                  "She was too pleased that her part had mattered to care what it was called.",
                  "She thought the woman was secretly making fun of how she had played."],
        answer: 2,
        skill: "inferring a character’s feelings from what they don’t do",
        explain: `<p>The woman calls the triangle a “little bell”, the wrong name, but says Wren’s note was “the best part”. Earlier, Wren thought the triangle didn’t matter. Now everybody has clapped and a stranger has praised her note. Wren lets the mistake go because the praise is what matters to her now. The short final line shows her quiet pride.</p>
                  <p class="why-not">B is the trap: it echoes Wren’s earlier words (“It’s not a real instrument”), but her feelings have changed by the end of the story. A has no support, because nothing shows Wren as shy. D is the opposite of what happens: the woman is sincere and everybody clapped.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `A sign at the theme park says: “To ride the Thunder Loop, you must be at least 130 cm tall.”
               <p style="margin:10px 0 0">Ella measures herself and finds she is 135 cm tall.</p>
               <p class="quote"><em class="speaker">Ella:</em> “Great! That means I’m sure to be allowed on the Thunder Loop.”</p>
               <p style="margin:10px 0 0">Which one of the following sentences shows the mistake Ella has made?</p>`,
        options: ["Ella may feel too scared to ride the Thunder Loop when she sees it up close.",
                  "The queue for the Thunder Loop may be very long on the day Ella visits.",
                  "Some of the other riders may be much taller than Ella is.",
                  "There may be other rules for the Thunder Loop, such as a minimum age."],
        answer: 3,
        skill: "spotting a mistake: something needed is not a guarantee",
        explain: `<p>The sign gives one thing you <em>need</em> to ride: being at least 130 cm tall. It doesn’t say that being tall enough is <em>all</em> you need. There could be other rules too, such as an age limit or needing an adult with you. D shows Ella’s mistake: she has treated one requirement as a guarantee.</p>
                  <p class="why-not">A is the trap: Ella might well be scared, but that is about whether she <em>wants</em> to ride, not whether she is <em>allowed</em>. B is about waiting, not being allowed. C is true of many rides but doesn’t matter, because Ella only needs to reach 130 cm.</p>`
      },
      {
        stem: `A holiday program offers these workshops:
               ${WORKSHOP_TABLE}
               <p style="margin:10px 0 0">Zara will go to the program on Monday, Tuesday and Friday. She will do one workshop each day, and all three workshops will be different.</p>
               <p style="margin:8px 0 0">Which workshop will Zara do on <b>Monday</b>?</p>`,
        options: ["drama", "pottery", "robotics", "It cannot be worked out"],
        answer: 1,
        skill: "using a table and conditions together",
        explain: `<p>Start with the day that has the fewest choices. On <b>Tuesday</b>, the only workshop running is robotics, so Zara must do robotics on Tuesday.</p>
                  <p>On <b>Friday</b>, the choices are robotics and drama. She has already done robotics, and all three must be different, so Friday is drama.</p>
                  <p>On <b>Monday</b>, the choices are pottery and drama. Drama is taken, so Monday is <b>pottery</b>.</p>
                  <p class="why-not">A (drama) is the trap: drama does run on Monday, and it is a tempting first pick. But then Friday would have to be robotics again, which breaks the “all different” rule. C (robotics) isn’t on Monday at all. D catches students who ignore the “all different” rule: without it, Monday could be drama or pottery, but with it there is only one answer.</p>`
      },
      {
        stem: `In a Year 4 class, most of the students play a sport on the weekend. Most of the students in the same class have a pet. (“Most” means more than half.)
               <p class="quote"><em class="speaker">Ari:</em> “So at least one student in the class must play a weekend sport <b>and</b> have a pet.”</p>
               <p class="quote"><em class="speaker">Bea:</em> “So most of the students who play a weekend sport must also have a pet.”</p>
               <p style="margin:10px 0 0">If the information is true, whose reasoning is correct?</p>`,
        options: ["Ari only", "Bea only", "Both Ari and Bea", "Neither Ari nor Bea"],
        answer: 0,
        skill: "deciding whose reasoning is correct",
        explain: `<p><b>Ari</b> is correct. More than half the class plays sport, and more than half has a pet. Two groups that are each more than half of the class can’t fit into the class without overlapping, so at least one student must be in both.</p>
                  <p><b>Bea</b> is not correct. Imagine 10 students: 6 play sport and 6 have a pet. They could overlap by just 2 students. Then only 2 of the 6 sport players have a pet, which is not most of them.</p>
                  <p class="why-not">C is the trap: Bea’s idea sounds like it follows, but “most” of the class doesn’t tell us how the two groups overlap. D catches students who don’t see why Ari must be right. Try it with real numbers: two groups of 6 in a class of 10 must share at least 2 students.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `A theatre has 14 seats in each row. Tickets are numbered in order: tickets 1 to 14 are for seats 1 to 14 in row A, tickets 15 to 28 are for seats 1 to 14 in row B, and so on.
               <p style="margin:10px 0 0">Ticket number 100 is for which seat?</p>`,
        options: ["row G, seat 2", "row H, seat 2", "row G, seat 14", "row I, seat 2", "row H, seat 1"],
        answer: 1,
        skill: "division with a remainder: what the remainder means",
        explain: `<p>100 ÷ 14 = 7 remainder 2. So 7 full rows are used up (rows A to G hold tickets 1 to 98), and 2 more tickets go into the next row.</p>
                  <p>The 8th row is <b>row H</b>, and ticket 100 is the 2nd seat in it: <b>row H, seat 2</b>.</p>
                  <p class="why-not">A is the trap: 7 full rows ends at row G, but the leftover 2 tickets spill into the <em>next</em> row. C, row G seat 14, is ticket 98. D counts one row too many: the 8th row is H, not I. E is one seat out: ticket 99 is row H, seat 1, so ticket 100 is the next seat.</p>`
      },
      {
        stem: `<p style="margin:0;font-size:1.15em">125 − <span style="display:inline-block;width:26px;height:22px;border:2px solid ${INK};vertical-align:-4px"></span> = 48 + 39</p>
               <p style="margin:10px 0 0">What number goes in the box?</p>`,
        options: ["38", "48", "77", "87", "212"],
        answer: 0,
        skill: "the equals sign means both sides are the same",
        explain: `<p>The equals sign means both sides have the same value. The right side is 48 + 39 = <b>87</b>. So 125 − ■ must also equal 87.</p>
                  <p>125 − 87 = <b>38</b>. Check: 125 − 38 = 87 ✓</p>
                  <p class="why-not">87 (D) is the trap: it is the value of the right side, not the missing number. 77 (C) works out 125 − 48 and ignores the + 39, treating “=” as “the answer comes next”. 212 (E) adds 125 and 87 instead of subtracting. 48 (B) just copies a number.</p>`
      },
      {
        stem: `What number is shown in this place value chart?
               ${PV_TABLE}`,
        options: ["12 613", "13 513", "13 593", "13 613", "1 215 923"],
        answer: 3,
        skill: "place value: regrouping (renaming) numbers",
        explain: `<p>Find the value of each column, then add:</p>
                  <p>12 thousands = 12 000<br>15 hundreds = 1500<br>9 tens = 90<br>23 ones = 23</p>
                  <p>12 000 + 1500 + 90 + 23 = <b>13 613</b>.</p>
                  <p>Or regroup: 23 ones = 2 tens and 3 ones, so there are 11 tens = 1 hundred and 1 ten. That makes 16 hundreds = 1 thousand and 6 hundreds, so 13 thousands. Altogether 13 613.</p>
                  <p class="why-not">1 215 923 (E) is the trap: it writes the numbers side by side. 12 613 (A) forgets that 15 hundreds includes a thousand. 13 513 (B) forgets that 11 tens includes a hundred. 13 593 (C) forgets that 23 ones includes 2 tens.</p>`
      }
    ]
  }
];
