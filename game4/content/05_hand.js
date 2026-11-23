/* RIDGE RUNNER: the helper for hand-written questions (loaded before the question files).
   H(track, rung, id, { passage, stem, opts: [[text, trap-or-null], ...], body })
   The option with null is the correct one; every other option names the real mistake behind it.
   The explanation = the track's method + body + why each trap is wrong. */
const H = (track, rung, id, q) => {
  const options = q.opts.map(o => o[0]), answer = q.opts.findIndex(o => o[1] === null), traps = {};
  q.opts.forEach((o, i) => { if (o[1] !== null) traps[i] = o[1]; });
  const o = { options, traps };
  const method = TRACKS.find(t => t.id === track).method;
  HAND.push({ id, track, rung, passage: q.passage || "", stem: q.stem, options, answer, traps, visual: !!q.visual,
    explain: `<p class="method"><b>Method:</b> ${method}</p><p>${q.body}</p>${LIB.whyNot(o)}` });
};
