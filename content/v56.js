/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 56
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: narrative (original) ---- */
const PARAS = [
  `It had taken Tess three weeks to talk Mum into it: one night in the old tent at the bottom of the backyard, just Tess and her little brother, Ollie. “Seven-year-olds don’t get scared,” Ollie had announced, so in the end Mum said yes, as long as Tess was in charge.`,
  `At first it was brilliant. They ate crackers by torchlight and made shadow rabbits on the tent wall. Then Ollie fell asleep in the middle of a sentence, the torch began to fade, and the backyard turned into somewhere Tess had never been before.`,
  `Something scraped slowly along the fence. Something else thudded onto the roof of the shed. Then a low, rasping growl came from the direction of the lemon tree.`,
  `Tess lay very still. The back door was only twenty steps away; she counted them in her head, and then she counted them again. She realised she was holding her breath, and let it out slowly, so that Ollie wouldn’t hear.`,
  `The growl came again. Ollie’s eyes opened. “Tess,” he whispered, “what’s that?”`,
  `For one moment Tess wanted to grab his hand and run. Instead she heard herself say, in Mum’s most ordinary voice, “That’s just the possum. He lives in the lemon tree. He’s grumpy because we’re camping in his garden.”`,
  `“Does he have a name?”`,
  `“Gerald,” said Tess, who had never heard of him until that second.`,
  `Ollie giggled and burrowed down into his sleeping bag. “Night, Gerald,” he called. Within a minute he was snoring.`,
  `Tess lay awake a long time, listening. The scraping, she decided, was the wind dragging the passionfruit vine along the fence. The thud on the shed might have been a falling lemon. And the growl? Well, Gerald could have that one.`,
  `In the morning, Mum found them both fast asleep, Tess’s arm flung across her brother as if she were holding the tent down.`,
  `“So,” Mum said, “how was it?”`,
  `“Easy,” said Tess, yawning. “Ollie wasn’t scared at all.”`
];
const PASSAGE = {
  title: "Gerald",
  note: "Read the story below, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q3: quarter turn of a tile ---- */
const TILE_DARK = [[0, 0], [0, 1], [1, 0], [2, 2], [3, 2], [3, 3]];
const TILE_LIGHT = [[0, 3], [2, 0]];
const has = (cells, r, c) => cells.some(([R, C]) => R === r && C === c);
const gridRows = (dark, light) => [0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => has(dark, r, c) ? "#" : has(light, r, c) ? "o" : ".").join("")).join(" / ");
const tileGrid = (dark, light, size, ox, oy) => {
  let g = "";
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const fill = has(dark, r, c) ? "#2f5e95" : has(light, r, c) ? "#f2b84b" : "#fff";
    g += `<rect x="${ox + c * size}" y="${oy + r * size}" width="${size}" height="${size}" fill="${fill}" stroke="#8fa3bb" stroke-width="1"/>`;
  }
  return g + `<rect x="${ox}" y="${oy}" width="${4 * size}" height="${4 * size}" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
};
const TILE_SVG = (() => {
  const s = 30, ox = 8, oy = 8;
  let g = tileGrid(TILE_DARK, TILE_LIGHT, s, ox, oy);
  // a curved arrow showing a quarter turn clockwise
  g += `<defs><marker id="ta" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#c0392b"/></marker></defs>
        <path d="M150 30 A 44 44 0 0 1 194 74" fill="none" stroke="#c0392b" stroke-width="3" marker-end="url(#ta)"/>
        <text x="172" y="112" font-size="13" text-anchor="middle" fill="#c0392b">quarter turn</text>
        <text x="172" y="128" font-size="13" text-anchor="middle" fill="#c0392b">clockwise</text>`;
  return `<svg viewBox="0 0 226 140" width="226" height="140" role="img" aria-label="A 4 by 4 tile of blue (#), yellow (o) and white (.) squares, with a red arrow showing a quarter turn clockwise. Rows from the top: ${gridRows(TILE_DARK, TILE_LIGHT)}">${g}</svg>`;
})();
const cw = cells => cells.map(([r, c]) => [c, 3 - r]);
const acw = cells => cells.map(([r, c]) => [3 - c, r]);
const flipLR = cells => cells.map(([r, c]) => [r, 3 - c]);
const half = cells => cells.map(([r, c]) => [3 - r, 3 - c]);
const TILE_OPTS = [
  [acw(TILE_DARK), acw(TILE_LIGHT)],        // quarter turn the wrong way
  [flipLR(TILE_DARK), flipLR(TILE_LIGHT)],  // mirror image
  [cw(TILE_DARK), cw(TILE_LIGHT)],          // correct
  [half(TILE_DARK), half(TILE_LIGHT)]       // half turn
].map(([d, l], i) => `<svg viewBox="0 0 108 108" width="108" height="108" role="img" aria-label="Picture ${"ABCD"[i]}: rows from the top (# blue, o yellow, . white): ${gridRows(d, l)}">${tileGrid(d, l, 24, 6, 6)}</svg>`);

/* ---- Maths Q2: sprinkler jumps ---- */
const JUMP_SVG = (() => {
  const cx = 40, cy = 200, R = 170;
  const p = deg => [cx + R * Math.cos(-deg * Math.PI / 180), cy + R * Math.sin(-deg * Math.PI / 180)];
  const [x30, y30] = p(30), [x60, y60] = p(60);
  let g = `<path d="M${cx} ${cy} L${cx + R} ${cy} A ${R} ${R} 0 0 0 ${x30.toFixed(1)} ${y30.toFixed(1)} Z" fill="#cfe3f6"/>
           <line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="${INK}" stroke-width="3"/>
           <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - R}" stroke="${INK}" stroke-width="3"/>
           <line x1="${cx}" y1="${cy}" x2="${x30.toFixed(1)}" y2="${y30.toFixed(1)}" stroke="${INK}" stroke-width="2" stroke-dasharray="7 5"/>
           <line x1="${cx}" y1="${cy}" x2="${x60.toFixed(1)}" y2="${y60.toFixed(1)}" stroke="${INK}" stroke-width="2" stroke-dasharray="7 5"/>
           <rect x="${cx}" y="${cy - 16}" width="16" height="16" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
  const [lx, ly] = p(15).map((v, i) => i ? cy + (v - cy) * 0.68 : cx + (v - cx) * 0.68);
  g += `<text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">1 jump</text>`;
  return `<svg viewBox="0 0 220 214" width="220" height="214" role="img" aria-label="A right angle (marked with a small square in the corner). Two dashed lines from the corner split it into three equal angles. The bottom one of the three is shaded and labelled 1 jump.">${g}</svg>`;
})();

/* ---- Maths Q3: three jars of marbles ---- */
const jarSvg = (name, red, blue) => {
  const balls = [...Array(red).fill("#d64545"), ...Array(blue).fill("#2f6fb5")];
  let g = `<path d="M18 30 L18 128 Q18 140 30 140 L90 140 Q102 140 102 128 L102 30" fill="#f4f8fc" stroke="${INK}" stroke-width="2.5"/>
           <rect x="12" y="20" width="96" height="12" rx="3" fill="#c9d6e6" stroke="${INK}" stroke-width="2"/>`;
  balls.forEach((col, i) => {
    const x = 36 + (i % 4) * 16, y = 128 - Math.floor(i / 4) * 17;
    g += `<circle cx="${x}" cy="${y}" r="7.5" fill="${col}" stroke="${INK}" stroke-width="1"/>`;
  });
  g += `<text x="60" y="162" font-size="15" font-weight="700" text-anchor="middle" fill="${INK}">Jar ${name}</text>
        <text x="60" y="180" font-size="13" text-anchor="middle" fill="${INK}">${red} red, ${blue} blue</text>`;
  return `<svg viewBox="0 0 120 186" width="120" height="186" role="img" aria-label="Jar ${name}: ${red} red marbles and ${blue} blue marbles.">${g}</svg>`;
};
const JARS = `<div style="display:flex;flex-wrap:wrap;gap:10px 18px;justify-content:center">${jarSvg("P", 3, 1)}${jarSvg("Q", 5, 3)}${jarSvg("R", 2, 2)}</div>`;

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the story, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "Tess counts the steps to the back door “and then she counted them again”, and she lets her breath out slowly “so that Ollie wouldn’t hear”. These details suggest that Tess",
        options: ["was working out how long it would take her to fetch Mum from inside.",
                  "was annoyed that Ollie had gone to sleep and left her awake on her own.",
                  "was frightened, but did not want her little brother to know it.",
                  "was cold and wanted to go back inside to sleep in her own warm bed."],
        answer: 2,
        skill: "working out feelings shown rather than stated",
        explain: `<p>Nobody counts the steps to safety twice unless they are thinking about running for it, and Tess has been holding her breath without noticing. Both show she is frightened. But she breathes out slowly “so that Ollie wouldn’t hear”: she is hiding her fear from her little brother.</p>
                  <p class="why-not">A is the trap: she does count the steps to the door, but she never plans to fetch Mum; counting them twice shows nerves, not planning. B uses a real detail (Ollie falls asleep first), but nothing shows she is annoyed, and she is careful not to wake him. D invents a reason: the story never mentions the cold; it is the noises that keep her awake.</p>`
      },
      {
        stem: "Why does the writer include the detail that Tess “had never heard of him until that second”?",
        options: ["To show that Tess made up Gerald on the spot so that the noise would seem friendly to Ollie.",
                  "To show that Tess had not been listening when Mum told her about the possum in the lemon tree.",
                  "To show that Tess did not know which animals lived in her own backyard and was confused.",
                  "To show that Ollie knew more about the animals in the garden than his older sister did."],
        answer: 0,
        skill: "understanding why a writer includes a detail",
        explain: `<p>Tess has no idea what the growl is. When Ollie wakes up scared, she instantly invents a friendly, grumpy possum and gives him a silly name, “Gerald”. The detail tells us she made it all up that very second, to turn a scary noise into something funny for Ollie, and it works: “Ollie giggled”.</p>
                  <p class="why-not">B is the trap: it takes the words literally, as if there really were a possum that Mum had mentioned; nothing in the story says so. C is partly true (Tess doesn’t know what made the noise), but she isn’t confused; she is thinking quickly. D gets it the wrong way round: it is Ollie who asks for the name, and Tess who supplies it.</p>`
      },
      {
        stem: "At the end, Tess tells Mum the night was “Easy” and that “Ollie wasn’t scared at all.” What does this ending suggest?",
        options: ["Ollie was right at the start when he said that seven-year-olds don’t get scared.",
                  "Tess is hiding her own fear, though it was her quick thinking that kept Ollie calm.",
                  "Tess is boasting to Mum because she wants to camp out in the backyard every weekend from now on.",
                  "Tess is disappointed that nothing exciting happened, because the night was so easy and quiet."],
        answer: 1,
        skill: "understanding a character from the whole story (what the ending reveals)",
        explain: `<p>We know the night was <em>not</em> easy for Tess: she counted the steps to the door twice, held her breath, wanted to run, and “lay awake a long time”. Ollie wasn’t scared only because Tess invented Gerald. So when she says “Easy” and gives Ollie the credit, the reader sees what Mum can’t: Tess was the frightened one, she kept it to herself, and her calm story is what made the night work. The arm “holding the tent down” shows she was still looking after him even in her sleep.</p>
                  <p class="why-not">A is the trap: it takes Ollie’s boast at face value, but he only stopped being scared after Tess explained the noise; he asked “what’s that?” in a whisper. C is not supported: Tess doesn’t ask for anything, and her one word, “Easy”, is not boasting; it hides how hard the night was. D gets the night wrong: plenty happened (the scraping, the thud, the growl), and it was anything but quiet for Tess.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">At the Saturday market in Bayside, <b>most</b> of the strawberries come from Hill Farm. Hill Farm never uses sprays on its strawberries.</p>
               <p class="quote"><em class="speaker">Jack:</em> “I bought these strawberries at the Bayside market, so they must have been grown without sprays.”</p>
               <p style="margin:10px 0 0">Which one of the following sentences shows the mistake Jack has made?</p>`,
        options: ["Jack may have washed the strawberries carefully before he ate them.",
                  "Hill Farm may also sell its strawberries at markets in other towns.",
                  "Strawberries grown without sprays may cost more than other strawberries.",
                  "Some of the strawberries at the market may come from a different farm."],
        answer: 3,
        skill: "spotting a mistake: treating “most” as “all”",
        explain: `<p>The facts say <b>most</b> of the market’s strawberries come from Hill Farm, not <b>all</b> of them. So some come from other farms, and those farms may use sprays. Jack’s strawberries could be some of those. He has treated “most” as if it meant “all”, and D shows the gap.</p>
                  <p class="why-not">B is the trap: it is about Hill Farm and markets, but where else Hill Farm sells its fruit doesn’t matter; what matters is whether every strawberry at <em>this</em> market comes from Hill Farm. A is about what Jack did after buying them, which can’t change how they were grown. C is about price, which has nothing to do with whether Jack’s strawberries were sprayed.</p>`
      },
      {
        stem: `On camp, Aria, Ben and Cleo each did a different activity (canoeing, archery or climbing) and each wore a different coloured hat (red, yellow or green).
               <ul class="facts">
                 <li>The child in the red hat went canoeing.</li>
                 <li>Aria did not go canoeing.</li>
                 <li>Ben wore the green hat.</li>
               </ul>
               <p style="margin:10px 0 0">Which one of these statements <b>must</b> be true?</p>`,
        options: ["Aria did archery.",
                  "Aria wore the yellow hat.",
                  "The child in the green hat did archery.",
                  "Cleo wore the yellow hat."],
        answer: 1,
        skill: "logic grid: deciding what must be true when some things are still unknown",
        explain: `<p>Ben wore green, so he didn’t wear red, so he didn’t go canoeing (the canoeist wore red). Aria didn’t go canoeing either. So <b>Cleo</b> went canoeing, and she wore the <b>red</b> hat.</p>
                  <p>Ben has green and Cleo has red, so Aria must have worn the <b>yellow</b> hat: B.</p>
                  <p>But nothing tells us who did archery and who went climbing: Aria and Ben could have done them either way round.</p>
                  <table class="grid" style="font-size:15px"><tr><th></th><th>Aria</th><th>Ben</th><th>Cleo</th></tr>
                  <tr><td>hat</td><td>yellow</td><td>green</td><td>red</td></tr>
                  <tr><td>activity</td><td>archery or climbing</td><td>the other one</td><td>canoeing</td></tr></table>
                  <p class="why-not">A and C are the traps: each <em>could</em> be true (A if Aria did archery, C if Ben did), but neither <em>must</em> be, because the clues never decide between archery and climbing. D can’t be true: Cleo went canoeing, so she wore red.</p>`
      },
      {
        stem: `This tile is given a <b>quarter turn clockwise</b>.
               <div class="figure">${TILE_SVG}</div>
               <p style="margin:10px 0 0">Which picture shows the tile after the turn?</p>`,
        visualOptions: true,
        options: TILE_OPTS,
        answer: 2,
        skill: "rotation: a quarter turn clockwise (not a flip)",
        explain: `<p>In a quarter turn clockwise, the <b>top row</b> swings round to become the <b>right-hand column</b>, reading from top to bottom, and the <b>left-hand column</b> becomes the <b>top row</b>, reading from right to left.</p>
                  <p>Top row # # . o → right-hand column (top to bottom): blue, blue, white, yellow.<br>
                     Left-hand column (top to bottom) # # o . → top row (right to left): blue, blue, yellow, white, so the top row reads . o # #.</p>
                  <p>Only <b>C</b> has both. (Check one square: the yellow square in the top-right corner moves to the bottom-right corner.)</p>
                  <p class="why-not">A is the trap: it is a quarter turn the other way (anticlockwise); there the top row ends up as the left-hand column. B is a mirror image: the tile has been flipped over left to right, not turned. D is a half turn (two quarter turns).</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: "Rick skip-counts by 7s, starting at 7. Nick skip-counts by 9s, starting at 9. What is the only 2-digit number that Rick and Nick will both say?",
        options: ["16", "56", "63", "72", "126"],
        answer: 2,
        skill: "common multiples (supplied by David)",
        explain: `<p>Rick says 7, 14, 21, 28, 35, 42, 49, 56, <b>63</b>, 70, … Nick says 9, 18, 27, 36, 45, 54, <b>63</b>, 72, … The first number both say is <b>63</b> (7 × 9 = 63).</p>
                  <p>The next number they both say is 63 + 63 = 126, which has 3 digits, so 63 is the only 2-digit one.</p>
                  <p class="why-not">56 (B) is the trap: it is in Rick’s list (7 × 8), but Nick jumps from 54 to 63 and never says it. 72 (D) is in Nick’s list (9 × 8) but not Rick’s (Rick goes 70, 77). 126 (E) is a number they both say, but it has 3 digits. 16 (A) adds 7 and 9 instead of finding a number in both lists.</p>`
      },
      {
        stem: `A garden sprinkler turns in equal jumps. The picture shows a right angle and the size of <b>one jump</b>.
               <div class="figure">${JUMP_SVG}</div>
               <p style="margin:10px 0 0">How many jumps does the sprinkler make to turn through <b>2 full turns</b>?</p>`,
        options: ["6", "8", "12", "24", "32"],
        answer: 3,
        skill: "angles: equal turns that make a right angle and full turns",
        explain: `<p>The dashed lines split the right angle into <b>3</b> equal jumps.</p>
                  <p>A full turn is <b>4</b> right angles, so one full turn takes 4 × 3 = 12 jumps. Two full turns take 2 × 12 = <b>24</b> jumps.</p>
                  <p class="why-not">32 (E) is the trap: it counts the 4 lines in the picture instead of the 3 spaces between them, so it uses 4 jumps for each right angle (4 × 4 × 2 = 32). 12 (C) is only one full turn. 8 (B) counts the right angles in 2 full turns but forgets each right angle has 3 jumps. 6 (A) treats each full turn as if it were just one right angle (2 × 3).</p>`
      },
      {
        stem: `Three jars hold red and blue marbles. One marble is taken from a jar without looking.
               <div class="figure">${JARS}</div>
               <ol class="statements">
                 <li>Taking a red marble is more likely from Jar Q than from Jar P.</li>
                 <li>From Jar R, taking a red marble is just as likely as taking a blue one.</li>
                 <li>Taking a blue marble is more likely from Jar Q than from Jar R.</li>
                 <li>Taking a red marble is more likely from Jar P than from Jar R.</li>
               </ol>
               <p style="margin:8px 0 0">Which of these statements are correct?</p>`,
        options: ["statements 2 and 4 only", "statement 2 only", "statements 2, 3 and 4 only", "statements 1, 2 and 4 only", "all four statements"],
        answer: 0,
        skill: "chance: comparing how likely events are when the totals are different",
        explain: `<p>Compare the <b>fraction</b> of each jar that is red or blue, not just how many there are.</p>
                  <p>Jar P: 3 red out of 4 = 6/8 red, 1/4 = 2/8 blue. &nbsp; Jar Q: 5/8 red, 3/8 blue. &nbsp; Jar R: 2 out of 4 = 4/8 red, 4/8 blue.</p>
                  <p><b>1:</b> red from Q is 5/8, red from P is 6/8. Q is <em>less</em> likely ✗<br>
                     <b>2:</b> R has 2 red and 2 blue, so they are equally likely ✓<br>
                     <b>3:</b> blue from Q is 3/8, blue from R is 4/8. Q is <em>less</em> likely ✗<br>
                     <b>4:</b> red from P is 6/8, red from R is 4/8 ✓</p>
                  <p>So statements <b>2 and 4 only</b>.</p>
                  <p class="why-not">E (all four) is the trap: it compares the <em>number</em> of marbles. Jar Q has more red marbles than Jar P (5 against 3) and more blue marbles than Jar R (3 against 2), but it also has more marbles altogether, so each colour is a smaller share of the jar. C gets statement 1 right but still counts blue marbles in statement 3. D gets statement 3 right but still counts red marbles in statement 1. B trusts only statement 2, the one about a single jar, as if jars holding different numbers of marbles can’t be compared; they can, using fractions (3 out of 4 red in Jar P is more than 2 out of 4 in Jar R).</p>`
      }
    ]
  }
];
