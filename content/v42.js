/* ---------------------------------------------------------------
   TEST CONTENT — Practice Test 42
   --------------------------------------------------------------- */

let passMode = "answer";
const INK = "#1b2a41";

/* ---- Reading: story extract (public domain: E. Nesbit, 1906; text from Project Gutenberg #1874) ---- */
const PARAS = [
  "Perhaps Peter had not rightly calculated the number of minutes it would take the 11.29 to get from the station to the place where they were, or perhaps the train was late. Anyway, it seemed a very long time that they waited.",
  "Phyllis grew impatient. “I expect the watch is wrong, and the train’s gone by,” said she.",
  "Peter relaxed the heroic attitude he had chosen to show off his two flags. And Bobbie began to feel sick with suspense.",
  "It seemed to her that they had been standing there for hours and hours, holding those silly little red flannel flags that no one would ever notice. The train wouldn’t care. It would go rushing by them and tear round the corner and go crashing into that awful mound. And everyone would be killed. Her hands grew very cold and trembled so that she could hardly hold the flag. And then came the distant rumble and hum of the metals, and a puff of white steam showed far away along the stretch of line.",
  "“Stand firm,” said Peter, “and wave like mad! When it gets to that big furze bush step back, but go on waving! Don’t stand <em>on</em> the line, Bobbie!”",
  "The train came rattling along very, very fast.",
  "“They don’t see us! They won’t see us! It’s all no good!” cried Bobbie.",
  "The two little flags on the line swayed as the nearing train shook and loosened the heaps of loose stones that held them up. One of them slowly leaned over and fell on the line. Bobbie jumped forward and caught it up, and waved it; her hands did not tremble now.",
  "It seemed that the train came on as fast as ever. It was very near now.",
  "“Keep off the line, you silly cuckoo!” said Peter, fiercely.",
  "“It’s no good,” Bobbie said again.",
  "“Stand back!” cried Peter, suddenly, and he dragged Phyllis back by the arm.",
  "But Bobbie cried, “Not yet, not yet!” and waved her two flags right over the line. The front of the engine looked black and enormous. Its voice was loud and harsh.",
  "“Oh, stop, stop, stop!” cried Bobbie. No one heard her. At least Peter and Phyllis didn’t, for the oncoming rush of the train covered the sound of her voice with a mountain of sound. But afterwards she used to wonder whether the engine itself had not heard her. It seemed almost as though it had—for it slackened swiftly, slackened and stopped, not twenty yards from the place where Bobbie’s two flags waved over the line. She saw the great black engine stop dead, but somehow she could not stop waving the flags."
];
const PASSAGE = {
  title: "Saviours of the Train",
  note: "This extract is from <i>The Railway Children</i> (1906) by E. Nesbit. Bobbie, Peter and Phyllis have seen a landslide block the railway line just round a bend, and the 11.29 train is due. They have torn up their red flannel petticoats to make six little flags. Read the extract, then answer the questions.",
  html: PARAS.map(p => `<p>${p}</p>`).join("")
};

/* ---- Thinking Skills Q2: round table ---- */
const TABLE_SVG = (() => {
  const cx = 110, cy = 100, R = 52, rc = 80;
  let g = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#f3e3c7" stroke="${INK}" stroke-width="2"/>`;
  for (let k = 0; k < 6; k++) {
    const a = (k * 60 - 90) * Math.PI / 180, x = cx + rc * Math.cos(a), y = cy + rc * Math.sin(a);
    g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="#fff" stroke="${INK}" stroke-width="1.8"/>`;
  }
  return `<svg viewBox="0 0 220 200" width="220" height="200" role="img" aria-label="A round table seen from above with six chairs spaced evenly around it.">${g}</svg>`;
})();

/* ---- Thinking Skills Q3: cube net with symbols ---- */
// each symbol is drawn in a 1 by 1 square, then stretched onto a face
const SYM = {
  circle: `<circle cx=".5" cy=".5" r=".25" fill="${INK}"/>`,
  ring: `<circle cx=".5" cy=".5" r=".25" fill="none" stroke="${INK}" stroke-width=".09"/>`,
  plus: `<rect x=".43" y=".2" width=".14" height=".6" fill="${INK}"/><rect x=".2" y=".43" width=".6" height=".14" fill="${INK}"/>`,
  cross: `<rect x=".08" y=".08" width=".84" height=".84" fill="#e8796e"/>`,
  square: `<rect x=".3" y=".3" width=".4" height=".4" fill="#2f7d4f"/>`,
  dots: [[.3, .3], [.7, .3], [.3, .7], [.7, .7]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".09" fill="${INK}"/>`).join("")
};
const SYM_NAME = { circle: "a black dot", ring: "a ring", plus: "a plus sign", cross: "red shading over the whole face", square: "a small green square", dots: "four small dots" };
const NET = [[0, 0, "circle"], [0, 1, "ring"], [1, 1, "plus"], [1, 2, "square"], [1, 3, "cross"], [2, 3, "dots"]];
const NET_SVG = (() => {
  const u = 46, o = 4;
  let g = "";
  NET.forEach(([r, c, s]) => {
    const x = o + c * u, y = o + r * u;
    g += `<rect x="${x}" y="${y}" width="${u}" height="${u}" fill="#fff" stroke="${INK}" stroke-width="2"/><g transform="matrix(${u} 0 0 ${u} ${x} ${y})">${SYM[s]}</g>`;
  });
  return `<svg viewBox="0 0 ${4 * u + 2 * o} ${3 * u + 2 * o}" width="${4 * u + 2 * o}" height="${3 * u + 2 * o}" role="img" aria-label="A net of six squares. Top row: ${SYM_NAME.circle}, then ${SYM_NAME.ring} to its right. Middle row, starting under the ring: ${SYM_NAME.plus}, ${SYM_NAME.square}, ${SYM_NAME.cross}. Bottom row: ${SYM_NAME.dots}, under the red face.">${g}</svg>`;
})();
function cubeSvg([top, left, right], letter) {
  const a = 46, k = a * Math.cos(Math.PI / 6), cx = 6 + k, y0 = 6;
  const T = [cx, y0], Rt = [cx + k, y0 + a / 2], Fr = [cx, y0 + a], Lf = [cx - k, y0 + a / 2];
  const face = (o, u, v, s, fill) =>
    `<polygon points="${[o, [o[0] + u[0], o[1] + u[1]], [o[0] + u[0] + v[0], o[1] + u[1] + v[1]], [o[0] + v[0], o[1] + v[1]]].map(p => p.join(",")).join(" ")}" fill="${fill}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
     <g transform="matrix(${u[0]} ${u[1]} ${v[0]} ${v[1]} ${o[0]} ${o[1]})">${SYM[s]}</g>`;
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const g = face(Lf, sub(T, Lf), sub(Fr, Lf), top, "#ffffff") +
            face(Lf, sub(Fr, Lf), [0, a], left, "#eef1f6") +
            face(Fr, sub(Rt, Fr), [0, a], right, "#dfe4ec");
  const W = 2 * k + 12, H = 2 * a + 12;
  return `<svg viewBox="0 0 ${W.toFixed(1)} ${H}" width="${W.toFixed(1)}" height="${H}" role="img" aria-label="Cube ${letter}: top face ${SYM_NAME[top]}, front-left face ${SYM_NAME[left]}, front-right face ${SYM_NAME[right]}.">${g}</svg>`;
}
const CUBE_OPTS = [["ring", "plus", "square"], ["circle", "dots", "ring"], ["plus", "cross", "circle"], ["square", "ring", "circle"]]
  .map((f, i) => cubeSvg(f, "ABCD"[i]));

/* ---- Maths Q2: juice prices ---- */
const JUICE_TABLE = `<div class="table-wrap"><table class="grid">
  <tr><th>bottle</th><th>price</th></tr>
  ${[["500 mL", "$2.40"], ["750 mL", "$3.30"], ["1 L", "$4.50"], ["1.5 L", "$6.30"], ["3 L", "$13.00"]].map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}
</table></div>`;

/* ---- Maths Q3: tile pattern ---- */
const TILES_SVG = (() => {
  const c = 19;
  return `<div style="display:flex;flex-wrap:wrap;gap:12px 30px;align-items:flex-end">${[1, 2, 3].map(n => {
    const m = n + 2;
    let g = "";
    for (let r = 0; r < m; r++) for (let k = 0; k < m; k++) {
      const border = r === 0 || k === 0 || r === m - 1 || k === m - 1;
      g += `<rect x="${2 + k * c}" y="${2 + r * c}" width="${c}" height="${c}" fill="${border ? "#8d99ae" : "#fff"}" stroke="${INK}" stroke-width="1"/>`;
    }
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><svg viewBox="0 0 ${m * c + 4} ${m * c + 4}" width="${m * c + 4}" height="${m * c + 4}" role="img" aria-label="Pattern ${n}: ${n * n} white tile${n > 1 ? "s" : ""} in a ${n} by ${n} square, with a border of ${4 * n + 4} grey tiles all the way round.">${g}</svg><span style="font-size:14px">Pattern ${n}</span></div>`;
  }).join("")}</div>`;
})();

const SECTIONS = [
  {
    id: "reading",
    name: "Reading",
    passage: PASSAGE,
    intro: "Read the extract, then choose the best answer (A, B, C or D) for each question.",
    questions: [
      {
        stem: "“Peter relaxed the heroic attitude he had chosen to show off his two flags.” This suggests that Peter",
        options: ["had arms that were growing too tired to keep holding his two flags up high.",
                  "had given up all hope that the train would ever come along the line.",
                  "had been posing like a hero, and let the pose slip as the wait went on.",
                  "was annoyed that the girls had been given more of the flags than he had."],
        answer: 2,
        skill: "working out the meaning of a phrase from context",
        explain: `<p>Here an “attitude” is a way of standing, a pose. Peter had <em>chosen</em> a heroic pose “to show off his two flags”, so he was partly enjoying looking like a hero. As the wait dragged on, he let the pose drop. The writer is gently teasing him.</p>
                  <p class="why-not">B is the trap: it is Phyllis, not Peter, who thinks “the train’s gone by”. Peter only relaxes his pose; a moment later he is shouting “Stand firm … and wave like mad!”. A reads “relaxed” too literally: nothing says his arms were tired. D is wrong, because Peter has two flags and each girl has only one.</p>`
      },
      {
        stem: "At first Bobbie’s hands “trembled so that she could hardly hold the flag”, but later “her hands did not tremble now”. What does this change show?",
        options: ["Once there was something she had to do, Bobbie’s fear gave way to determination.",
                  "Bobbie had become certain, by this time, that the driver had seen the waving flags.",
                  "Peter’s order to “stand firm” had made Bobbie feel calm and sure of herself again.",
                  "Bobbie was no longer frightened of the train at all."],
        answer: 0,
        skill: "inferring feelings that are shown, not stated",
        explain: `<p>Bobbie’s hands shake while she can only stand and wait and imagine the crash. They stop shaking at the moment a flag falls and she has to <em>act</em>: she “jumped forward and caught it up, and waved it”. Having something to do pushes her fear aside and makes her determined.</p>
                  <p class="why-not">B is the trap: just before this, Bobbie cries “They don’t see us! They won’t see us!”, so she is not sure at all. C uses a real detail (Peter does say “Stand firm”), but straight after it Bobbie cries “It’s all no good!”, so his words haven’t calmed her. D goes too far: she is still crying “Oh, stop, stop, stop!” as the engine looms.</p>`
      },
      {
        stem: "Why does the writer end the extract with Bobbie unable to stop waving the flags, even though the engine has stopped?",
        options: ["To show that Bobbie wanted the passengers to see who had really saved them.",
                  "To show that Bobbie still believed, as she had said, that it was “all no good”.",
                  "To show that Bobbie was afraid the train might start again and crash into the mound.",
                  "To show how fear and effort had gripped her, even once the danger was over."],
        answer: 3,
        skill: "understanding why a writer includes a detail (feelings shown through actions)",
        explain: `<p>The key word is “<b>somehow</b>”: Bobbie doesn’t <em>decide</em> to keep waving; she simply can’t stop. She has been so frightened, and has concentrated so hard on stopping the train, that her body carries on even after she has seen it “stop dead”. The detail shows how much strain she has been under, without the writer having to say so.</p>
                  <p class="why-not">A is the trap: it is Peter who wanted credit (“because it was my idea”, his “heroic attitude”), not Bobbie, and she isn’t choosing to wave at all. B can’t be right, because she has just seen the engine stop. C gives her a reason for waving, but “somehow” tells us there was no reason: she couldn’t help it.</p>`
      }
    ]
  },
  {
    id: "thinking",
    name: "Thinking Skills",
    intro: "Choose the one correct answer (A, B, C or D).",
    questions: [
      {
        stem: `<p class="quote" style="margin-top:0">To be picked for the zone swimming team, a swimmer <b>must</b> swim 50 metres in under 40 seconds at the school carnival.</p>
               <p class="quote"><em class="speaker">Zoe:</em> “Lily swam 50 metres in 36 seconds at the carnival, so she will be picked for the zone team.”</p>
               <p class="quote"><em class="speaker">Hamish:</em> “Tom took 42 seconds to swim 50 metres at the carnival, so he will not be picked for the zone team.”</p>
               <p style="margin:10px 0 0">If the information in the first box is true, whose reasoning is correct?</p>`,
        options: ["Zoe only", "Hamish only", "Both Zoe and Hamish", "Neither Zoe nor Hamish"],
        answer: 1,
        skill: "deciding whose reasoning is correct (needed versus guaranteed)",
        explain: `<p>The rule says a time under 40 seconds is <b>needed</b> to be picked. It does not say that every swimmer who does it <em>will</em> be picked: there might be more fast swimmers than places, or other things the coaches look at.</p>
                  <p><b>Zoe</b> treats the time as a guarantee. Lily has done what is needed, but that doesn’t mean she will be picked. Zoe is not correct.</p>
                  <p><b>Hamish</b> is correct. Tom’s 42 seconds is not under 40, so he hasn’t done what is needed, and he can’t be picked.</p>
                  <p class="why-not">C is the trap: Zoe’s reasoning sounds like the rule, but “must” only tells you who <em>can’t</em> be picked, not who will be. D catches students who think Hamish is making the same mistake. He isn’t: missing something that is needed really does rule Tom out.</p>`
      },
      {
        stem: `Six friends, Amy, Ben, Cara, Dan, Eve and Finn, sit around this round table. Everyone faces the middle of the table.
               <div class="figure">${TABLE_SVG}</div>
               <ul class="facts">
                 <li>Amy sits directly opposite Ben.</li>
                 <li>Cara sits immediately on Amy’s left.</li>
                 <li>Dan sits next to Ben, but not next to Cara.</li>
                 <li>Eve does not sit next to Amy.</li>
               </ul>
               <p style="margin:10px 0 0">Who sits immediately on <b>Cara’s</b> left?</p>`,
        options: ["Amy", "Dan", "Finn", "Eve"],
        answer: 3,
        skill: "using clues to work out an arrangement around a table",
        explain: `<p>Picture the table as a clock face. Put Amy at 6 o’clock, so Ben, opposite her, is at 12 o’clock.</p>
                  <p>Amy faces the middle (towards 12 o’clock), so her left hand points towards 9 o’clock. Cara is immediately on Amy’s left: <b>8 o’clock</b>.</p>
                  <p>Dan is next to Ben, so at 10 or 2 o’clock. 10 o’clock is next to Cara, so Dan is at <b>2 o’clock</b>.</p>
                  <p>That leaves 10 o’clock and 4 o’clock for Eve and Finn. 4 o’clock is next to Amy, so Eve is at <b>10 o’clock</b> and Finn at 4 o’clock.</p>
                  <p>Cara sits at 8 o’clock facing the middle, so her left is towards 10 o’clock: <b>Eve</b>.</p>
                  <p class="why-not">Amy (A) is the trap: she is on Cara’s <em>right</em>. Mixing up left and right (or using left and right as you look at the picture, instead of as Cara sees it) gives Amy. Dan (B) comes from forgetting that Dan is not next to Cara. Finn (C) comes from forgetting that Eve is not next to Amy, which lets Eve and Finn swap.</p>`
      },
      {
        stem: `This net is folded to make a cube.
               <div class="figure">${NET_SVG}</div>
               <p style="margin:10px 0 0">Which cube could it make?</p>`,
        visualOptions: true,
        options: CUBE_OPTS,
        answer: 0,
        skill: "picturing which faces of a net end up opposite each other",
        explain: `<p>Two faces that end up <b>opposite</b> each other can never be seen together. Find the opposite pairs by folding in your head, keeping the green square still:</p>
                  <p>• The plus and the red face fold over on either side of the green square, so they face each other: they are opposite (they have one square between them in a straight line).<br>
                     • The ring (attached to the plus) and the four dots (attached to the red face) fold round to fill the two walls that are left, so they face each other too: opposite.<br>
                     • The black dot is the last face. It closes the cube on the far side from the green square, so those two are opposite.</p>
                  <p>Opposite pairs: plus and red face, ring and four dots, black dot and green square.</p>
                  <p><b>A</b> shows the ring, the plus and the green square. No two of these are opposite, and they meet at one corner in this order ✓</p>
                  <p class="why-not">B is the trap: the ring and the four dots are far apart on the net and not in a straight line, so they don’t look like an opposite pair, but folding shows that they are. C shows the plus and the red face together, and D shows the black dot and the green square together, which are opposite pairs too.</p>`
      }
    ]
  },
  {
    id: "maths",
    name: "Mathematical Reasoning",
    intro: "Choose the one correct answer (A, B, C, D or E). No calculators.",
    questions: [
      {
        stem: `Mr Lee buys 9 boxes of pencils with 12 pencils in each box. He gives 4 pencils to each of the 23 students in his class.
               <p style="margin:10px 0 0">How many pencils does he have left?</p>`,
        options: ["16", "26", "85", "92", "104"],
        answer: 0,
        skill: "a two-step word problem: multiply, multiply, then subtract",
        explain: `<p>Pencils bought: 9 × 12 = <b>108</b>.</p>
                  <p>Pencils given out: 4 × 23 = 4 × 20 + 4 × 3 = 80 + 12 = <b>92</b>.</p>
                  <p>Pencils left: 108 − 92 = <b>16</b>.</p>
                  <p class="why-not">26 (B) is the trap: it works out 4 × 23 as 82 by forgetting to carry the 1 from 4 × 3 = 12. 92 (D) is the number given out, not the number left. 85 (C) gives each student only 1 pencil. 104 (E) takes away only 4 pencils.</p>`
      },
      {
        stem: `A shop sells the same juice in five bottle sizes.
               ${JUICE_TABLE}
               <p style="margin:10px 0 0">Which bottle is the best value for money?</p>`,
        options: ["500 mL for $2.40", "750 mL for $3.30", "1 L for $4.50", "1.5 L for $6.30", "3 L for $13.00"],
        answer: 3,
        skill: "best value: comparing prices for the same amount",
        explain: `<p>Compare the cost of the <b>same amount</b> of juice. Every size fits exactly into 3 litres:</p>
                  <p>• 500 mL: 6 bottles × $2.40 = $14.40<br>
                     • 750 mL: 4 × $3.30 = $13.20<br>
                     • 1 litre: 3 × $4.50 = $13.50<br>
                     • 1.5 litres: 2 × $6.30 = <b>$12.60</b><br>
                     • 3 litres: $13.00</p>
                  <p>The 1.5-litre bottle gives 3 litres for the least money, so it is the best value.</p>
                  <p class="why-not">The 3-litre bottle (E) is the trap: the biggest size is often the best value, but not here. It costs 40 cents more for 3 litres than two 1.5-litre bottles. The 500 mL bottle (A) has the lowest price but is the worst value. The 750 mL and 1-litre bottles (B and C) are in between.</p>`
      },
      {
        stem: `Each pattern is a square of white tiles with a border of grey tiles around it.
               <div class="figure">${TILES_SVG}</div>
               <p style="margin:10px 0 0">The pattern continues in the same way. In <b>Pattern 20</b>, how many more white tiles are there than grey tiles?</p>`,
        options: ["312", "316", "320", "324", "400"],
        answer: 1,
        skill: "finding a rule for a growing pattern and using it for a later term",
        explain: `<p>Look at how each pattern is built. Pattern 3 has a 3 by 3 square of white tiles. Its grey border has 3 tiles along each of the 4 sides, plus 1 in each of the 4 corners: 4 × 3 + 4 = 16 grey tiles. (Check Pattern 1: 4 × 1 + 4 = 8 ✓)</p>
                  <p>So Pattern 20 has:</p>
                  <p>• white tiles: 20 × 20 = <b>400</b><br>
                     • grey tiles: 4 × 20 + 4 = <b>84</b></p>
                  <p>400 − 84 = <b>316</b> more white tiles than grey.</p>
                  <p class="why-not">320 (C) is the trap: it forgets the 4 corner tiles and uses 80 grey tiles. 312 (A) counts each corner twice, using 4 sides of 22 tiles = 88. 324 (D) takes the corners away (76 grey tiles) instead of adding them. 400 (E) is just the number of white tiles.</p>`
      }
    ]
  }
];
