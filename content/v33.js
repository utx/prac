/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 33
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: story extract (public domain: Kenneth Grahame, 1908) ---- */
const PARAS = [
  "The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat. Something up above was calling him imperiously, and he made for the steep little tunnel which answered in his case to the gravelled carriage-drive owned by animals whose residences are nearer to the sun and air. So he scraped and scratched and scrabbled and scrooged and then he scrooged again and scrabbled and scratched and scraped, working busily with his little paws and muttering to himself, ‘Up we go! Up we go!’ till at last, pop! his snout came out into the sunlight, and he found himself rolling in the warm grass of a great meadow.",
  "‘This is fine!’ he said to himself. ‘This is better than whitewashing!’ The sunshine struck hot on his fur, soft breezes caressed his heated brow, and after the seclusion of the cellarage he had lived in so long the carol of happy birds fell on his dulled hearing almost like a shout. Jumping off all his four legs at once, in the joy of living and the delight of spring without its cleaning, he pursued his way across the meadow till he reached the hedge on the further side.",
  "‘Hold up!’ said an elderly rabbit at the gap. ‘Sixpence for the privilege of passing by the private road!’ He was bowled over in an instant by the impatient and contemptuous Mole, who trotted along the side of the hedge chaffing the other rabbits as they peeped hurriedly from their holes to see what the row was about. ‘Onion-sauce! Onion-sauce!’ he remarked jeeringly, and was gone before they could think of a thoroughly satisfactory reply. Then they all started grumbling at each other. ‘How <em>stupid</em> you are! Why didn’t you tell him—’ ‘Well, why didn’t <em>you</em> say—’ ‘You might have reminded him—’ and so on, in the usual way; but, of course, it was then much too late, as is always the case."
];
const PASSAGE = {
  title: "The River Bank",
  note: "Read the extract below from <i>The Wind in the Willows</i> (1908) by Kenneth Grahame, then answer the questions.",
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
    intro: "Read the extract, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "The writer says that spring filled Mole’s house with “its spirit of divine discontent and longing”. This suggests that spring made Mole feel",
        options: ["unhappy that his little house was still so dirty.",
                  "restless, and eager for something beyond his home.",
                  "tired and sore after a long and busy morning of hard work.",
                  "annoyed with the animals who lived above him."],
        answer: 1,
        skill: "working out the meaning of a phrase from context",
        explain: `<p><b>Discontent</b> means not being satisfied, and <b>longing</b> means wanting something badly. Spring makes Mole dissatisfied with staying inside, and makes him want something else. The very next thing he does is fling down his brush and bolt out of the house, because “something up above was calling him”.</p>
                  <p class="why-not">A is the trap: Mole <em>is</em> cleaning, so dirt seems relevant, but the discontent comes from spring outside, not from the dust, and he leaves the cleaning unfinished. C is true (he has “an aching back and weary arms”), but that isn’t what this phrase describes. Nothing suggests he is annoyed with other animals (D).</p>`
      },
      {
        stem: "Mole “scraped and scratched and scrabbled and scrooged”, and then the writer repeats the same words in reverse order. Why does the writer do this?",
        options: ["To show that Mole kept getting lost and turning back.",
                  "To copy the sound of rain falling on the ground above.",
                  "To show that Mole was muttering these words to himself.",
                  "To show how long and hard Mole had to dig to get out."],
        answer: 3,
        skill: "understanding why a writer repeats words",
        explain: `<p>Saying the four digging words, and then saying them all again backwards, makes the sentence itself long and hard work to read, just like the digging. It shows Mole digging on and on, “working busily” until at last, “pop!”, he breaks through into the sunlight.</p>
                  <p class="why-not">A is the trap: reversing the words might suggest going backwards, but Mole goes steadily <em>up</em> (“Up we go!”) and comes out in the meadow; he never gets lost. C uses a real detail (he is muttering), but what he mutters is “Up we go!”, not the digging words. There is no rain in the extract (B); it is a sunny spring day.</p>`
      },
      {
        stem: "After Mole has gone, the rabbits grumble at each other “in the usual way; but, of course, it was then much too late, as is always the case.” What is the writer doing here?",
        options: ["Gently making fun of how people blame each other once it is too late.",
                  "Warning readers that it is foolish to stand up to a bully like Mole.",
                  "Showing that the rabbits were clever but much too slow to act.",
                  "Feeling sorry for the rabbits, who had been treated unfairly by Mole."],
        answer: 0,
        skill: "recognising a writer’s tone and attitude",
        explain: `<p>The rabbits only work out what they <em>should</em> have said once Mole has gone, and then they blame each other: “Why didn’t you tell him—”, “Why didn’t <em>you</em> say—”. The words “in the usual way” and “as is always the case” show the writer is smiling at something everyone recognises: people often argue about what they should have done after the chance has passed. The tone is amused, not serious.</p>
                  <p class="why-not">D is the trap: Mole <em>was</em> rude to the rabbits (he bowled one over and jeered at them), so feeling sorry for them seems reasonable. But the writer’s words poke fun at the rabbits’ squabbling rather than sympathising with them. B doesn’t fit, because nobody stands up to Mole. C is half right (they were too slow), but nothing suggests they were clever; they couldn’t think of a “satisfactory reply”.</p>`
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
