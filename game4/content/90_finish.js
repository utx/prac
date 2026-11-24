/* RIDGE RUNNER: finish the hand-written questions.
   Each step gets its own shuffle of answer letters, so no letter pattern repeats from step to step, while the
   answers inside a step are spread evenly: each letter at most ceil(n / 4) times, so exactly twice in a step of 8 (the
   target letter depends on each question's place in its step, not on where the answer was written). Options that must
   stay in order (Extract A–D, "X only / Y only / Both / Neither", plain numbers) keep their places. Then the explanation is built:
   the track's method + the body + why each trap is wrong. */
(() => {
  const fixedOrder = q => /^(Extract|Both|Neither|\w+ only$)/.test(q.opts[0][0]) || q.opts.some(o => /^(Both|Neither)/.test(o[0])) || q.opts.every(o => /^\d+$/.test(o[0]));
  const PERMS = [];
  const perm = (a, out = []) => { if (!a.length) PERMS.push(out); a.forEach((x, i) => perm([...a.slice(0, i), ...a.slice(i + 1)], [...out, x])); };
  perm([0, 1, 2, 3]);
  const steps = {};
  for (const r of HAND_RAW) (steps[r.track + "|" + r.rung] = steps[r.track + "|" + r.rung] || []).push(r);
  for (const [key, list] of Object.entries(steps)) {
    let h = 17; for (const c of key) h = (h * 131 + c.charCodeAt(0)) % 100003;
    const ans = r => r.q.opts.findIndex(o => o[1] === null);
    /* each letter is used at most ceil(n / 4) times in a step (exactly twice in a step of 8): fixed-order questions keep
       their letters, and the others fill the letters still free, round by round in this step's own shuffled order */
    const cap = Math.ceil(list.length / 4), free = [cap, cap, cap, cap];
    list.forEach(r => { if (fixedOrder(r.q)) free[ans(r)]--; });
    const slots = [];
    for (let round = 0; round < cap; round++) for (const a of PERMS[(h + round * 7) % 24]) if (free[a] > 0) { slots.push(a); free[a]--; }
    let next = 0;
    const target = list.map(r => fixedOrder(r.q) ? ans(r) : slots[next++]);
    list.forEach((r, i) => {
      let opts = r.q.opts;
      if (!fixedOrder(r.q)) { const a = ans(r), k = ((a - target[i]) % 4 + 4) % 4; opts = opts.slice(k).concat(opts.slice(0, k)); }
      const options = opts.map(o => o[0]), answer = opts.findIndex(o => o[1] === null), traps = {};
      opts.forEach((o, i) => { if (o[1] !== null) traps[i] = o[1]; });
      const method = TRACKS.find(t => t.id === r.track).method;
      HAND.push({ id: r.id, track: r.track, rung: r.rung, passage: r.q.passage || "", stem: r.q.stem, options, answer, traps, visual: !!r.q.visual,
        explain: `<p class="method"><b>Method:</b> ${method}</p><p>${r.q.body}</p>${LIB.whyNot({ options, traps })}` });
    });
  }
})();
