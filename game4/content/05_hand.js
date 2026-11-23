/* RIDGE RUNNER: the helper for hand-written questions (loaded before the question files).
   H(track, rung, id, { passage, stem, opts: [[text, trap-or-null], ...], body })
   The option with null is the correct one; every other option names the real mistake behind it.
   The questions are finished in 90_finish.js once all are loaded (letters spread, explanation built). */
const HAND_RAW = [];
const H = (track, rung, id, q) => HAND_RAW.push({ track, rung, id, q });
