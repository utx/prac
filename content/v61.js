/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 61
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: cloze passage ---- */
const CLOZE_TEXT = `
<p>When Mr Hale handed out the music for our first school concert, I turned to the second page and my heart sank. Halfway down was a run of quick notes that climbed high up the E string and then tumbled back down again: bars 52 to 60. For the first week, every attempt ended in a tangle of squeaks and scratches, and I was so cross that I nearly threw my bow across the room. I even wondered whether I could just pretend to play that part, moving my bow silently above the strings so that nobody would notice.</p>
<p>But Mrs Okafor, my violin teacher, was {1} on making me learn it properly. “Slowly,” she kept saying. “Your fingers have to learn to walk before they can run.” So every evening I played those nine bars at half speed, then a little faster, then a little faster again, until I could play them with my eyes shut.</p>
<p>On the night of the concert, the corridor behind the stage was crammed with nervous musicians. Someone’s cello case bumped my elbow. My hands were damp, my mouth was dry, and all I could think about was bar 52.</p>
<p>Then we walked out under the lights, Mr Hale raised his baton, and we began. Strangely, once we started playing, my nerves began to {2}. The music was so familiar that my fingers seemed to know where to go on their own. Bar 52 arrived, and before I had time to panic, it was gone. The run I had dreaded for six weeks had lasted about ten seconds.</p>
<p>I had expected to feel relieved when the last note faded. Instead, as the applause rolled around the hall, I felt something much closer to {3}. I wanted to walk straight back out and play the whole thing again.</p>`;

function clozeHtml() {
  const si = SECTIONS.findIndex(s => s.id === "reading");
  let t = CLOZE_TEXT;
  SECTIONS[si].questions.forEach((q, i) => {
    const chosen = responses[si][i];
    let fill;
    if (passMode === "review") fill = `<span class="gap filled correct">(${i + 1}) ${q.options[q.answer]}</span>`;
    else if (chosen !== null) fill = `<span class="gap filled">(${i + 1}) ${q.options[chosen]}</span>`;
    else fill = `<span class="gap">(${i + 1}) ……</span>`;
    t = t.replace(`{${i + 1}}`, fill);
  });
  return t;
}
const PASSAGE = {
  title: "Bars 52 to 60",
  note: "Read the text below and decide which answer best fits each gap. (A <i>bar</i> is a short section of a piece of music.)",
  html: clozeHtml
};

/* ---- Thinking Skills Q2: holiday program timetable ---- */
const td = s => `<td style="text-align:center">${s}</td>`;
const PROGRAM_ROWS = [
  ["Monday", "9:00 – 10:30 am", "10:00 – 11:30 am"],
  ["Tuesday", "9:30 – 11:00 am", "11:00 am – 12:30 pm"],
  ["Wednesday", "1:00 – 2:30 pm", "no class"],
  ["Thursday", "11:30 am – 1:00 pm", "1:15 – 2:45 pm"],
  ["Friday", "10:30 am – 12:00 pm", "9:00 – 10:15 am"]
];
const PROGRAM_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th colspan="3" style="text-align:center">Holiday program</th></tr>
  <tr><th>Day</th><th style="text-align:center">Robotics<br><span style="font-weight:400">(Hall)</span></th><th style="text-align:center">Pottery<br><span style="font-weight:400">(Art room)</span></th></tr>
  ${PROGRAM_ROWS.map(([d, ...c]) => `<tr><td>${d}</td>${c.map(td).join("")}</tr>`).join("")}
</table></div>`;

/* ---- Thinking Skills Q3: park map with north pointing to the right ---- */
const MAP_SVG = (() => {
  const u = 50, ox = 30, oy = 30, cols = 5, rows = 4;           // dots at x = 0..5, y = 0..4 (y counted up from the bottom)
  const X = x => ox + x * u, Y = y => oy + (rows - y) * u;
  let g = "";
  for (let x = 0; x <= cols; x++) g += `<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(rows)}" stroke="#c9b48a" stroke-width="5" stroke-linecap="round"/>`;
  for (let y = 0; y <= rows; y++) g += `<line x1="${X(0)}" y1="${Y(y)}" x2="${X(cols)}" y2="${Y(y)}" stroke="#c9b48a" stroke-width="5" stroke-linecap="round"/>`;
  for (let x = 0; x <= cols; x++) for (let y = 0; y <= rows; y++) g += `<circle cx="${X(x)}" cy="${Y(y)}" r="3.5" fill="${INK}"/>`;
  const place = (x, y, name, col, dy = -12) =>
    `<circle cx="${X(x)}" cy="${Y(y)}" r="8" fill="${col}" stroke="${INK}" stroke-width="1.6"/>` +
    `<text x="${X(x)}" y="${Y(y) + dy}" font-size="13" font-weight="700" text-anchor="middle" fill="${INK}" paint-order="stroke" stroke="#ffffff" stroke-width="4">${name}</text>`;
  g += place(2, 2, "Gate", "#ffffff");
  g += place(4, 1, "Pond", "#7fb3e6");
  g += place(3, 4, "Café", "#f2b45a");
  g += place(4, 3, "Fountain", "#7fc4a0");
  g += place(3, 1, "Swings", "#e8796e", 24);
  g += place(0, 4, "Toilets", "#d6c7ef");
  // north arrow pointing to the right
  const ax = X(cols) + 34, ay = Y(2);
  g += `<line x1="${ax - 18}" y1="${ay}" x2="${ax + 14}" y2="${ay}" stroke="${INK}" stroke-width="3"/>` +
       `<polygon points="${ax + 24},${ay} ${ax + 10},${ay - 8} ${ax + 10},${ay + 8}" fill="${INK}"/>` +
       `<text x="${ax + 4}" y="${ay - 14}" font-size="16" font-weight="700" text-anchor="middle" fill="${INK}">N</text>`;
  const W = ax + 34, H = Y(0) + 34;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A map of paths in a park: 6 straight paths going up the page and 5 going across, crossing at dots. An arrow labelled N points to the RIGHT of the page, so north is to the right. Counting dots from the left (1 to 6) and from the bottom (1 to 5): the Gate is at dot 3 across, 3 up. The Pond is 5 across, 2 up. The Café is 4 across, 5 up. The Fountain is 5 across, 4 up. The Swings are 4 across, 2 up. The Toilets are 1 across, 5 up.">${g}</svg>`;
})();

/* ---- Maths Q2: repeating tile path ---- */
const TILE_COL = { R: "#e8796e", B: "#5b8fd1", Y: "#f3d23c" };
const tileStrip = (start, bracket, more) => {
  const seq = "RRBYYY", s = 30, gap = 3, ox = 4, top = 26;
  let g = "";
  [...seq].forEach((c, i) => {
    const x = ox + i * (s + gap);
    g += `<rect x="${x}" y="${top}" width="${s}" height="${s}" fill="${TILE_COL[c]}" stroke="${INK}" stroke-width="1.4"/>` +
         `<text x="${x + s / 2}" y="${top + s / 2 + 5}" font-size="14" font-weight="700" text-anchor="middle" fill="${INK}">${c}</text>` +
         `<text x="${x + s / 2}" y="${top + s + 17}" font-size="13" text-anchor="middle" fill="${INK}">${start + i}</text>`;
  });
  const x2 = ox + 6 * (s + gap) - gap;
  if (bracket) g += `<path d="M${ox} ${top - 6} V${top - 12} H${x2} V${top - 6}" fill="none" stroke="${INK}" stroke-width="1.6"/>` +
       `<text x="${(ox + x2) / 2}" y="${top - 16}" font-size="13" text-anchor="middle" fill="${INK}">this block of 6 repeats</text>`;
  if (more) g += `<text x="${x2 + 6}" y="${top + s / 2 + 5}" font-size="18" font-weight="700" fill="${INK}">…</text>`;
  const W = x2 + (more ? 28 : 6), H = top + s + 24;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Tiles ${start} to ${start + 5}: red, red, blue, yellow, yellow, yellow.${bracket ? " A bracket over them says this block of 6 repeats." : " Dots show that the path carries on."}">${g}</svg>`;
};
const TILES_SVG = `<div style="display:flex;flex-wrap:wrap;gap:4px 6px;justify-content:center;align-items:flex-end">${tileStrip(1, true, false)}${tileStrip(7, false, true)}</div>`;

/* ---- Maths Q3 explanation: number line of Ruby's ride (shown only in the answer) ---- */
const RIDE_LINE = (() => {
  const x0 = 26, u = 20, y = 30, W = x0 * 2 + 15 * u;
  const X = k => x0 + k * u;
  let g = `<line x1="${X(0)}" y1="${y}" x2="${X(15)}" y2="${y}" stroke="${INK}" stroke-width="2.5"/>`;
  for (let k = 0; k <= 15; k++) g += `<line x1="${X(k)}" y1="${y - 4}" x2="${X(k)}" y2="${y + 4}" stroke="${INK}" stroke-width="1.2"/>`;
  const lab = (k, top, col) => `<circle cx="${X(k)}" cy="${y}" r="5" fill="${col}" stroke="${INK}" stroke-width="1.3"/>` +
    `<text x="${X(k)}" y="${y - 12}" font-size="12" font-weight="700" text-anchor="middle" fill="${INK}">${top}</text>` +
    `<text x="${X(k)}" y="${y + 19}" font-size="11" text-anchor="middle" fill="${INK}">${k}</text>`;
  g += lab(0, "House", "#fff") + lab(6, "Shop", "#f2b45a") + lab(15, "Beach", "#fff");
  g += `<text x="${X(9)}" y="${y + 19}" font-size="11" text-anchor="middle" fill="${INK}">9</text><text x="${X(13)}" y="${y + 19}" font-size="11" text-anchor="middle" fill="${INK}">13</text>`;
  // the route, one leg per row
  const legs = [[0, 9, "9 km"], [9, 6, "3 km"], [6, 13, "7 km"], [13, 6, "7 km"], [6, 15, "9 km"]];
  const arrows = ["#2e6fb5", "#c0392b", "#2e6fb5", "#c0392b", "#2e6fb5"];
  legs.forEach(([a, b, t], i) => {
    const yy = y + 38 + i * 20, dir = b > a ? 1 : -1;
    g += `<line x1="${X(a)}" y1="${yy}" x2="${X(b) - dir * 7}" y2="${yy}" stroke="${arrows[i]}" stroke-width="2.4"/>` +
         `<polygon points="${X(b)},${yy} ${X(b) - dir * 8},${yy - 5} ${X(b) - dir * 8},${yy + 5}" fill="${arrows[i]}"/>` +
         `<text x="${(X(a) + X(b)) / 2}" y="${yy - 4}" font-size="11" text-anchor="middle" fill="${INK}">${t}</text>`;
  });
  const H = y + 38 + 5 * 20;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Number line from 0 to 15 km: House at 0, Shop at 6, first turn at 9, second turn at 13, Beach at 15. Ruby's ride drawn as five arrows: 0 to 9 (9 km), back from 9 to 6 (3 km), 6 to 13 (7 km), back from 13 to 6 (7 km), then 6 to 15 (9 km). Total 35 km.">${g}</svg>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the text, then decide which answer (A, B, C or D) best fits each gap.",
    questions: [
      {
        stem: "Which word best fits <b>gap 1</b>?",
        options: ["eager", "anxious", "intent", "devoted"],
        answer: 2,
        skill: "choosing between words close in meaning, using the little word that follows (“on”)",
        explain: `<p>The writer wanted to give up on the hard part, or just pretend to play it. Mrs Okafor was firmly determined that the writer would learn it properly. To be <b>intent on</b> doing something means to be fixed and determined about it, and “intent” is the only word here that is followed by “on”.</p>
                  <p class="why-not">“Eager” is the trap: it is close in meaning (keen to do something), but you are eager <em>to</em> do something or eager <em>for</em> something, never “eager on”. “Anxious” is followed by “about” or “to” (“anxious about the concert”), and it means worried, which doesn’t fit a teacher who is calmly in charge. “Devoted” is followed by “to” (“devoted to her students”), so “devoted on making me learn” doesn’t work.</p>`
      },
      {
        stem: "Which word best fits <b>gap 2</b>?",
        options: ["subside", "subdue", "succumb", "subsist"],
        answer: 0,
        skill: "choosing between look-alike words: which one fits the meaning and the grammar",
        explain: `<p>Backstage the writer was very nervous, but once the playing began the music felt familiar and the writer stopped panicking. When a feeling, a storm or a noise slowly dies down, it <b>subsides</b>. “My nerves began to subside” means the nervousness began to fade.</p>
                  <p class="why-not">“Subdue” is the trap: it looks similar and is about calming things down, but you subdue <em>something</em> (“I tried to subdue my nerves”). The nerves can’t “begin to subdue” on their own, because the word needs something after it. “Succumb” means to give in, and it is followed by “to” (“succumb to the cold”), so the sentence would be unfinished. “Subsist” means to stay alive on very little (“they subsisted on bread and water”), which has nothing to do with nerves.</p>`
      },
      {
        stem: "Which word best fits <b>gap 3</b>?",
        options: ["exasperation", "trepidation", "resignation", "exhilaration"],
        answer: 3,
        skill: "choosing a word from the meaning of the whole text: a feeling shown, not stated",
        explain: `<p>The writer expected to feel <em>relieved</em> (glad that something is over). “Instead” tells us the feeling was different, and the next sentence shows what it was: “I wanted to walk straight back out and play the whole thing again.” Someone who can’t wait to do it again feels thrilled and full of excitement. That feeling is <b>exhilaration</b>.</p>
                  <p class="why-not">Each wrong word is a feeling from <em>earlier</em> in the text. “Trepidation” (nervous fear about what is coming) is the trap: it is exactly how the writer felt backstage, with damp hands and a dry mouth. But by the end there is nothing left to fear, and nobody nervous wants to go straight back out. “Exasperation” (feeling very annoyed) fits the first week, when the writer nearly threw the bow across the room. “Resignation” (accepting that something bad can’t be changed) fits the moment the writer thought about just pretending to play.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0"><b>Most</b> of the students who walk to Kingsley Primary School live less than 1 kilometre from the school.</p>
               <p class="quote"><em class="speaker">Ruby:</em> “Sienna lives less than 1 kilometre from Kingsley Primary School, so she probably walks to school.”</p>
               <p class="quote"><em class="speaker">Dan:</em> “Leo walks to Kingsley Primary School, so he probably lives less than 1 kilometre from the school.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Ruby only", "Dan only", "Both Ruby and Dan", "Neither Ruby nor Dan"],
        answer: 1,
        skill: "deciding whose reasoning is correct (“most” leading to “probably”, and which way round it works)",
        explain: `<p>The box is about one group: the students who <b>walk</b>. It tells us that most of <em>them</em> live close to the school.</p>
                  <p><b>Dan</b> is correct. Leo is one of the walkers, and most walkers live less than 1 km away, so it is likely (though not certain) that Leo does too. That is what “probably” means.</p>
                  <p><b>Ruby</b> has turned the box around. It tells us nothing about the students who live close: we don’t know how many of <em>them</em> walk. For example, 20 students might walk, and 15 of them live close. But if another 100 students live close and all come by car, then most of the students who live close <em>don’t</em> walk. So living close doesn’t make it likely that Sienna walks.</p>
                  <p class="why-not">C (both) is the trap: Ruby’s sentence sounds like common sense, and it uses the same facts as Dan’s, just the other way round. But the box only works in one direction. A (Ruby only) is for students who mix up which group the box is talking about. D (neither) is for students who think “most” is never enough to say anything; but “most” is exactly enough for “probably”, as long as you start from the group the box describes.</p>`
      },
      {
        stem: `The table shows the activities at a holiday program.
               ${PROGRAM_TABLE}
               <p style="margin:10px 0 0">Zara wants to do <b>Robotics</b> and <b>Pottery</b> on the same day.</p>
               <ul style="margin:6px 0 0">
                 <li>Between the two activities she needs at least <b>15 minutes</b> to wash her hands and walk from one room to the other.</li>
                 <li>She must leave the program by <b>2:30 pm</b>.</li>
               </ul>
               <p style="margin:10px 0 0">On which day can Zara do both activities?</p>`,
        options: ["Monday", "Tuesday", "Thursday", "Friday"],
        answer: 3,
        skill: "using a timetable with two conditions at once (a gap between sessions and a finishing time)",
        explain: `<p>Check each day against <b>both</b> conditions. Remember the activities can come in either order.</p>
                  <p>• <b>Monday:</b> Robotics runs until 10:30 am, but Pottery starts at 10:00 am. They overlap ✗<br>
                     • <b>Tuesday:</b> Robotics ends at 11:00 am and Pottery starts at 11:00 am. There is no time at all to wash up and walk ✗<br>
                     • <b>Wednesday:</b> no Pottery class ✗<br>
                     • <b>Thursday:</b> Robotics ends at 1:00 pm, and Pottery starts at 1:15 pm, which is a 15-minute gap ✓. But Pottery finishes at 2:45 pm, after Zara must leave ✗<br>
                     • <b>Friday:</b> this time Pottery comes first. It ends at 10:15 am and Robotics starts at 10:30 am: a 15-minute gap ✓. Robotics ends at 12:00 pm, well before 2:30 pm ✓</p>
                  <p>So the answer is <b>Friday</b> (D).</p>
                  <p class="why-not">Thursday (C) is the trap: it has the 15-minute gap, so it looks right if you forget to check the finishing time. Tuesday (B) has the classes one straight after the other, which forgets the 15 minutes Zara needs. Monday (A) is chosen by looking only at the starting times (Robotics starts first, then Pottery) without seeing that Robotics is still going when Pottery begins.</p>`
      },
      {
        stem: `This map shows the paths in a park. The paths cross at the dots. Look carefully at the arrow that shows <b>north</b>.
               <div class="figure">${MAP_SVG}</div>
               <p style="margin:10px 0 0">Kim starts at the <b>Gate</b>. She follows the paths, and a “block” is the distance from one dot to the next.</p>
               <p class="quote" style="margin:10px 0 0">Walk 2 blocks west. Then walk 2 blocks north. Then walk 3 blocks east.</p>
               <p style="margin:10px 0 0">Where does Kim finish?</p>`,
        options: ["at the Pond", "at the Café", "at the Fountain", "at the Swings"],
        answer: 0,
        skill: "compass directions on a map where north is not at the top: working out east, south and west from the north arrow",
        explain: `<p><b>Step 1: work out the directions on this map.</b> North points to the <b>right</b> of the page. South is the opposite way, to the <b>left</b>. Turning a quarter turn clockwise from north gives east, so east points <b>down</b> the page, and west points <b>up</b> the page. (Check on an ordinary compass: N at the top, E to its right. Turn the whole compass so that N points right, and E ends up pointing down.)</p>
                  <p><b>Step 2: follow the walk from the Gate.</b><br>
                     • 2 blocks west: 2 dots <b>up</b> the page.<br>
                     • 2 blocks north: 2 dots to the <b>right</b>.<br>
                     • 3 blocks east: 3 dots <b>down</b> the page.<br>
                     Kim finishes 2 dots to the right of the Gate and 1 dot lower: at the <b>Pond</b>.</p>
                  <p class="why-not">The Café (B) is the trap: it is where you end up if you use the usual directions, with north at the top of the page, and ignore the arrow. The Fountain (C) uses north correctly but turns the compass the wrong way, so east goes up the page and west goes down. The Swings (D) uses the right directions but counts the dot Kim starts on as the first block each time, so every walk is one block short.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `At a fun park, it costs <b>$4.50</b> to get in. After that, each ride on the dodgem cars costs <b>$1.20</b>.
               <p style="margin:10px 0 0">Zoe has <b>$15</b>. What is the greatest number of dodgem rides she can have?</p>`,
        options: ["87", "13", "12", "9", "8"],
        answer: 4,
        skill: "money: how many items you can buy with what is left after a fixed cost",
        explain: `<p><b>Step 1: pay to get in.</b> $15 − $4.50 = <b>$10.50</b> left for rides.</p>
                  <p><b>Step 2: count the rides.</b> 8 rides cost 8 × $1.20 = $9.60, which is less than $10.50 ✓. 9 rides would cost $10.80, which is too much ✗. So Zoe can have <b>8</b> rides (with 90c left over).</p>
                  <p class="why-not">12 (C) is the trap: it shares all $15 between the rides ($15 ÷ $1.20 = 12 and a bit) and forgets that Zoe must pay $4.50 to get in first. 13 (B) makes the same mistake and then rounds up. 9 (D) works out that $10.50 is enough for “8 and a bit” rides and rounds up, but Zoe can’t pay for part of a ride. 87 (A) treats $1.20 as 12 cents.</p>`
      },
      {
        stem: `Tiles are laid along a long, straight path in a repeating pattern. The first 12 tiles are shown, with their numbers. (R = red, B = blue, Y = yellow.)
               <div class="figure">${TILES_SVG}</div>
               <p style="margin:10px 0 0">What is the number of the tile that is the <b>20th yellow</b> tile?</p>`,
        options: ["38", "40", "41", "42", "120"],
        answer: 2,
        skill: "repeating pattern: using the repeating block to find where a later item is",
        explain: `<p>Each block of 6 tiles (red, red, blue, yellow, yellow, yellow) has <b>3 yellow</b> tiles, and they are the 4th, 5th and 6th tiles of the block.</p>
                  <p><b>Step 1: how many whole blocks?</b> 6 blocks hold 6 × 3 = 18 yellow tiles, and they use 6 × 6 = <b>36</b> tiles.</p>
                  <p><b>Step 2: the next block.</b> The 19th and 20th yellow tiles are the first two yellows in block 7. Block 7 is tiles 37 to 42: 37 red, 38 red, 39 blue, <b>40 yellow</b> (the 19th yellow), <b>41 yellow</b> (the 20th yellow).</p>
                  <p>So the 20th yellow tile is tile <b>41</b>. Check with the picture: the 2nd yellow is tile 5, and 5 + 6 × 6 = 41 ✓</p>
                  <p class="why-not">40 (B) is the trap: it is true that half the tiles are yellow, so 20 × 2 seems sensible. But the yellows are not every second tile: they are bunched together at the end of each block, and tile 40 is only the 19th yellow. 42 (D) rounds up to 7 whole blocks (7 × 6), but tile 42 is the 21st yellow. 38 (A) adds 2 to the 36 tiles and forgets that each block starts with red, red, blue. 120 (E) gives every yellow tile a whole block of its own (20 × 6).</p>`
      },
      {
        stem: `Ruby rode her bike along a straight <b>15 km</b> path from her house to the beach. The shop is on the path, <b>6 km</b> from her house.
               <p style="margin:10px 0 0">She rode past the shop. Then she remembered that she needed sunscreen, so she turned round, rode back to the shop and bought some. Then she rode on towards the beach.</p>
               <p style="margin:10px 0 0">When she was <b>2 km from the beach</b>, she realised she had left her hat at the shop. She turned round again, rode back to the shop to get her hat, and then rode all the way to the beach.</p>
               <p style="margin:10px 0 0">Altogether, Ruby rode <b>35 km</b>. How far past the shop was Ruby when she turned back the <b>first</b> time?</p>`,
        options: ["2 km", "3 km", "6 km", "9 km", "10 km"],
        answer: 1,
        skill: "distance on a line with two turn-backs and no diagram: finding the extra distance, then the stretch ridden twice (supplied by David: follow-up 2 to Carter’s trip)",
        explain: `<p>Sketch a number line: House at 0 km, Shop at 6 km, Beach at 15 km.</p>
                  <p><b>Step 1: the extra distance.</b> Riding straight to the beach is 15 km, but Ruby rode 35 km. So she rode 35 − 15 = <b>20 km</b> extra.</p>
                  <p><b>Step 2: the second turn-back.</b> 2 km from the beach is at 13 km. From the shop (6 km) to there is 13 − 6 = 7 km. Ruby rode that stretch three times (forwards, back, forwards again). Once is part of the normal 15 km, so the extra is 7 × 2 = <b>14 km</b>.</p>
                  <p><b>Step 3: the first turn-back.</b> That leaves 20 − 14 = <b>6 km</b> extra for the first turn-back. That stretch past the shop was also ridden twice extra, so it is 6 ÷ 2 = <b>3 km</b>.</p>
                  <div class="figure">${RIDE_LINE}</div>
                  <p>Check: 9 + 3 + 7 + 7 + 9 = 35 km ✓</p>
                  <p class="why-not">6 km (C) is the trap: it is the extra distance from the first turn-back, but that stretch was ridden there and back, so it must be halved. 2 km (A) divides the 6 km by 3, because the stretch was ridden three times, but one of those rides is part of the normal 15 km. 9 km (D) is how far from her <em>house</em> Ruby turned back (6 + 3), not how far past the shop. 10 km (E) forgets the second turn-back and halves all 20 km of extra riding.</p>`
      }
    ]
  }
];
