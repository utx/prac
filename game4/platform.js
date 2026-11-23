/* ---------------------------------------------------------------
   RIDGE RUNNER: the platform level and the sniper nests (our own pixel art, drawn in code).
   PF.start({canvas, level, kit, practice, onEnd}) runs one level; PF.gen(level) builds its map;
   PF.reach(level) checks with the hero's own physics that the goal can be reached.
   Runs on animation frames; there is no clock or countdown anywhere.
   --------------------------------------------------------------- */
const PF = (() => {
  const TS = 16, ROWS = 17, VW = 480, VH = 270;
  /* physics (pixels per frame at 60 frames a second) */
  const PH = { acc: 0.35, air: 0.25, max: 2.0, fric: 0.72, grav: 0.32, fall: 6, jump: -6.2, dbl: -5.4, cut: -2.2, coyote: 6, buffer: 6, w: 10, h: 14 };
  const THEMES = [
    { name: "Bronze Canyon", sky: ["#f6c28b", "#f9e3c0"], far: "#d9915a", mid: "#b8673e", top: "#e8a33d", dirt: "#9c5a32", dirt2: "#874a27", block: "#c97a3e", deco: "cactus" },
    { name: "Silver Cliffs", sky: ["#8fb8de", "#dceaf6"], far: "#9aa9bd", mid: "#7586a0", top: "#d7e3ef", dirt: "#5f6f86", dirt2: "#526178", block: "#8a9bb5", deco: "pine" },
    { name: "Gold Forest", sky: ["#141b3a", "#2c3a6b"], far: "#22304f", mid: "#1b2a3a", top: "#3f8f4a", dirt: "#3b2f2a", dirt2: "#2f2521", block: "#6b5a3a", deco: "tree" },
    { name: "Storm Fortress", sky: ["#2a1840", "#5b3b7a"], far: "#3d2a57", mid: "#2b1d40", top: "#9a7fc4", dirt: "#3a3046", dirt2: "#2e2638", block: "#6d5a86", deco: "spire" }];

  /* ---------------- level generation (seeded) ---------------- */
  function rng(seed) { let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function gen(L) {
    const r = rng(L.seed), int = (a, b) => a + Math.floor(r() * (b - a + 1)), w = L.world;
    const len = L.boss ? 80 + 10 * w : 96 + 18 * w;
    const map = [...Array(ROWS)].map(() => []), ents = [];
    let x = 0, gh = 12;
    const ground = (c, h) => { for (let y = 0; y < ROWS; y++) map[y][c] = y >= h ? 1 : 0; };
    const air = c => { for (let y = 0; y < ROWS; y++) map[y][c] = 0; };
    const flat = (n, opt = {}) => { for (let i = 0; i < n; i++) ground(x + i, gh); if (opt.walker && n >= 5) ents.push({ t: "walker", x: (x + Math.floor(n / 2)) * TS, y: gh * TS - 10 }); if (opt.coins) for (let i = 1; i < n - 1; i += 2) ents.push({ t: "coin", x: (x + i) * TS + 4, y: (gh - 2) * TS + 4 }); x += n; };
    const maxGap = 3, maxStep = w >= 3 ? 3 : 2, walkerP = 0.45 + 0.1 * w;
    flat(8);
    ents.push({ t: "check", x: 2 * TS, y: gh * TS });
    let sinceCheck = 0, nests = 0, wantNests = L.boss ? 0 : w <= 2 ? 2 : 3, sinceNest = 0;
    while (x < len - 14) {
      const k = r();
      if (sinceCheck > 30) { flat(4); ents.push({ t: "check", x: (x - 2) * TS, y: gh * TS }); sinceCheck = 0; continue; }
      if (nests < wantNests && x >= Math.round((len - 14) * (nests + 0.8) / (wantNests + 0.6))) {
        ents.push({ t: "sign", x: (x - 5) * TS, y: gh * TS, nest: nests }); ents.push({ t: "ammo", x: (x - 2) * TS + 4, y: (gh - 4) * TS }); flat(3); ents.push({ t: "nest", x: (x) * TS, y: gh * TS, id: nests }); flat(4); ground(x, gh); for (let y = 0; y < gh; y++) map[y][x] = 4; ents.push({ t: "gate", x: x * TS, y: gh * TS, col: x, nest: nests }); x++; flat(3); nests++; sinceNest = 0; sinceCheck += 8; continue;
      }
      let used = 0;
      if (k < 0.16) { flat(int(5, 8), { walker: r() < walkerP, coins: r() < 0.5 }); }
      else if (k < 0.34) {                                            /* a gap with coins over it */
        const g = int(2, maxGap); for (let i = 0; i < g; i++) air(x + i);
        for (let i = 0; i < g; i++) ents.push({ t: i === Math.floor(g / 2) ? "ammo" : "coin", x: (x + i) * TS + 4, y: (gh - 3) * TS });   /* a bullet at the top of the jump */
        x += g; flat(int(3, 5));
      } else if (k < 0.46) {                                          /* a step up or down */
        const d = int(1, maxStep) * (r() < 0.5 ? -1 : 1); gh = Math.max(8, Math.min(14, gh + d)); flat(int(4, 6), { walker: r() < walkerP * 0.6 });
      } else if (k < 0.58) {                                /* floating blocks over a pit */
        const top = gh, n = int(2, 3); let px = x;
        for (let i = 0; i < 2; i++) air(px++);
        for (let p = 0; p < n; p++) {
          const h = Math.max(7, Math.min(13, top - int(0, 2))), wid = int(2, 3);
          for (let i = 0; i < wid; i++) { air(px + i); map[h][px + i] = 2; }
          ents.push({ t: p === n - 1 ? "ammo" : "coin", x: (px + 1) * TS + 4, y: (h - 2) * TS + 4 });
          px += wid; const g = int(1, 2); for (let i = 0; i < g; i++) air(px++);
        }
        x = px; flat(int(3, 5));
      } else if (k < 0.68) {                                         /* spikes on the ground */
        flat(2); const s = int(1, w === 1 ? 2 : 3); for (let i = 0; i < s; i++) { ground(x + i, gh); map[gh - 1][x + i] = 3; } x += s; flat(int(3, 4));
      } else if (k < 0.8) {                                          /* a run of narrow pillars */
        let h = gh; const n = int(3, 3 + w);
        for (let p = 0; p < n; p++) {
          const g = int(1, 2); for (let i = 0; i < g; i++) air(x++);
          h = Math.max(8, Math.min(14, h + int(-maxStep, Math.min(2, maxStep)))); const wid = w >= 3 ? 1 : int(1, 2);
          for (let i = 0; i < wid; i++) ground(x + i, h);
          if (r() < 0.6) ents.push({ t: p === n - 1 || r() < 0.3 ? "ammo" : "coin", x: x * TS + 4, y: (h - 2) * TS + 4 });
          x += wid;
        }
        air(x++); gh = h; flat(int(3, 4));
      } else if (k < 0.9 && w >= 2) {                                /* a drone patrol */
        flat(int(5, 7)); ents.push({ t: "drone", x: (x - 3) * TS, y: (gh - 3) * TS, y0: (gh - 3) * TS });
      } else { flat(int(6, 8), { walker: true, coins: true }); ents.push({ t: "ammo", x: (x - 4) * TS + 4, y: (gh - 3) * TS }); if (w >= 2) ents.push({ t: "walker", x: (x - 2) * TS, y: gh * TS - 10 }); }
      sinceCheck += 6; sinceNest += 6;
    }
    if (L.boss) { flat(4); ents.push({ t: "check", x: (x - 2) * TS, y: gh * TS }); flat(4); ents.push({ t: "nest", x: x * TS, y: gh * TS, id: 9, boss: true }); flat(10); }
    else { flat(12); ents.push({ t: "goal", x: (x - 5) * TS, y: gh * TS }); }
    ents.push({ t: "crate", x: 5 * TS, y: 12 * TS - 12 });                // a small blaster crate near the start
    { const sentries = L.boss ? 0 : (w === 1 ? 2 : w === 4 ? 4 : 3) * nests, have = () => ents.filter(e => e.t === "ammo").length;
      const coins = ents.filter(e => e.t === "coin"); for (let i = 0; have() < sentries + 3 && i < coins.length; i += 3) coins[i].t = "ammo";
      for (let c = 12; have() < sentries + 3 && c < x - 12; c += 5) { let r0 = 0; while (r0 < ROWS && map[r0][c] !== 1) r0++; if (r0 < ROWS && map[r0 - 1][c] === 0 && !ents.some(e => Math.abs(e.x - c * TS) < 20 && e.t !== "coin")) ents.push({ t: "ammo", x: c * TS + 4, y: (r0 - 3) * TS }); } }
    const cols = x;
    for (let y = 0; y < ROWS; y++) for (let c = 0; c < cols; c++) map[y][c] = map[y][c] || 0;
    /* hearts: one spare in the middle of longer levels */
    const mid = ents.filter(e => e.t === "check")[1]; if (mid) ents.push({ t: "heart", x: mid.x + 24, y: mid.y - 40 });
    return { map, ents, cols, theme: THEMES[w - 1], world: w };
  }
  const solidAt = (G, c, r) => { if (c < 0) return true; if (c >= G.cols) return true; if (r < 0) return false; if (r >= ROWS) return false; const t = G.map[r][c]; return t === 1 || t === 2 || (t === 4 && !G.open && !(G.gateOpen && G.gateOpen[c])); };
  const spikeAt = (G, c, r) => c >= 0 && c < G.cols && r >= 0 && r < ROWS && G.map[r][c] === 3;

  /* one physics step for a body {x, y, vx, vy, ground} with input {dir, jump (held), jumpPressed} */
  function step(G, b, inp) {
    const a = b.ground ? PH.acc : PH.air;
    if (inp.dir) b.vx = Math.max(-PH.max, Math.min(PH.max, b.vx + inp.dir * a)); else { b.vx *= b.ground ? PH.fric : 0.92; if (Math.abs(b.vx) < 0.05) b.vx = 0; }
    if (b.ground) b.coy = PH.coyote; else b.coy = Math.max(0, (b.coy || 0) - 1);
    if (inp.jumpPressed) b.buf = PH.buffer; else b.buf = Math.max(0, (b.buf || 0) - 1);
    if (b.buf > 0 && b.coy > 0) { b.vy = PH.jump; b.coy = 0; b.buf = 0; b.ground = false; b.jumped = true; }
    else if (inp.jumpPressed && !b.ground && b.boots && !b.usedDbl) { b.vy = PH.dbl; b.usedDbl = true; b.buf = 0; b.dbl = 10; }
    if (!inp.jump && b.vy < PH.cut) b.vy = PH.cut;
    b.vy = Math.min(PH.fall, b.vy + PH.grav);
    /* move x */
    b.x += b.vx;
    const top = Math.floor(b.y / TS), bot = Math.floor((b.y + PH.h - 1) / TS);
    if (b.vx > 0) { const c = Math.floor((b.x + PH.w - 1) / TS); for (let r = top; r <= bot; r++) if (solidAt(G, c, r)) { b.x = c * TS - PH.w; b.vx = 0; break; } }
    else if (b.vx < 0) { const c = Math.floor(b.x / TS); for (let r = top; r <= bot; r++) if (solidAt(G, c, r)) { b.x = (c + 1) * TS; b.vx = 0; break; } }
    /* move y */
    b.y += b.vy; b.ground = false;
    const l = Math.floor(b.x / TS), rr = Math.floor((b.x + PH.w - 1) / TS);
    if (b.vy > 0) { const r = Math.floor((b.y + PH.h) / TS); for (let c = l; c <= rr; c++) if (solidAt(G, c, r) && r < ROWS) { b.y = r * TS - PH.h; b.vy = 0; b.ground = true; b.usedDbl = false; break; } }
    else if (b.vy < 0) { const r = Math.floor(b.y / TS); for (let c = l; c <= rr; c++) if (solidAt(G, c, r)) { b.y = (r + 1) * TS; b.vy = 0; break; } }
    b.onSpike = false;
    for (let c = l; c <= rr; c++) { const r = Math.floor((b.y + PH.h - 4) / TS); if (spikeAt(G, c, r)) b.onSpike = true; }
  }

  /* ---------------- can the goal be reached? (uses the same physics, no double jump) ---------------- */
  function reach(L) {
    const G = gen(L); G.open = true; const  goal = G.ents.find(e => e.t === "goal" || e.boss);
    const gx = Math.floor(goal.x / TS);
    const startC = 2, stand = new Map(), queue = [];
    const groundRow = c => { for (let r = 0; r < ROWS; r++) if (solidAt(G, c, r)) return r; return -1; };
    const add = (x, y) => { const c = Math.floor((x + PH.w / 2) / TS), k = c + "," + Math.round(y); if (!stand.has(k)) { stand.set(k, [x, y]); queue.push([x, y]); } };
    add(startC * TS + 3, groundRow(startC) * TS - PH.h);
    const tries = [];
    for (const dir of [1, -1]) for (const hold of [0, 3, 7, 11, 16, 99]) for (const run of [0, 1]) for (const stopAt of [999, 20, 12]) tries.push([dir, hold, run, stopAt]);
    let best = 0;
    while (queue.length && stand.size < 4000) {
      const [sx, sy] = queue.shift();
      best = Math.max(best, Math.floor((sx + PH.w / 2) / TS));
      if (best >= gx) break;
      for (const [dir, hold, run, stopAt] of tries) {
        const b = { x: sx, y: sy, vx: run ? dir * PH.max : 0, vy: 0, ground: true };
        let left = false;
        for (let f = 0; f < 140; f++) {
          step(G, b, { dir: f < stopAt ? dir : 0, jump: hold > 0 && f < hold, jumpPressed: hold > 0 && f === 0 });
          if (b.onSpike || b.y > ROWS * TS) break;
          if (!b.ground) left = true;
          if (left && b.ground) { add(b.x, b.y); break; }
          if (hold === 0 && b.ground && f > 10) { add(b.x, b.y); break; }
        }
      }
    }
    return { ok: best >= gx, best, goal: gx, cols: G.cols };
  }

  /* ---------------- pixel art ---------------- */
  const HERO = ["....kkkkk...", "...khhhhhk..", "..khhhhhhhk.", "..kgggggghk.", "..kgwgwgggk.", "..kssssssk..", "...kssssk...", "..krrrrrrk..", ".kjjrrjjjjk.", ".kjjjjjjjjk.", ".ksjjjjjjsk.", "..kjjjjjjk..", "..kppppppk.."];
  const LEGS = { idle: ["..kppkkppk..", "..kbbk.kbbk.", "..kkk...kkk."], run1: ["..kpk..kppk.", ".kbbk...kbbk", ".kkk.....kkk"], run2: ["...kppkpk...", "...kbbkbbk..", "...kkkkkk..."], jump: [".kbbppppbbk.", ".kkk....kkk.", "............"] };
  const PAL = { k: "#1b1b2f", h: "#7a4a2a", g: "#7fd6ff", w: "#ffffff", s: "#f2c8a0", r: "#ff7a29", j: "#1f9e89", p: "#34405a", b: "#5a3a22" };
  const sprites = {};
  function sprite(name, rows, flip) {
    const k = name + (flip ? "L" : "R"); if (sprites[k]) return sprites[k];
    const c = document.createElement("canvas"); c.width = rows[0].length; c.height = rows.length; const x = c.getContext("2d");
    rows.forEach((row, y) => [...row].forEach((ch, i) => { if (PAL[ch]) { x.fillStyle = PAL[ch]; x.fillRect(flip ? row.length - 1 - i : i, y, 1, 1); } }));
    return sprites[k] = c;
  }

  /* ---------------- the running game ---------------- */
  let S = null, raf = 0;
  const KEYS = {};
  const keyMap = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right", ArrowUp: "up", KeyW: "up", Space: "jump", ArrowDown: "down", KeyS: "down", KeyE: "use", KeyJ: "fire", KeyX: "fire", KeyK: "duck", KeyC: "duck", Escape: "leave", KeyQ: "leave" };
  function onKey(e, down) {
    if (!S) return; const k = keyMap[e.code]; if (!k) return;
    e.preventDefault();
    if (down && !KEYS[k]) KEYS[k + "P"] = true;
    KEYS[k] = down;
  }
  const kd = e => onKey(e, true), ku = e => onKey(e, false);
  function beep(f, d = 0.06, type = "square", v = 0.04) {
    if (!S || !S.sound) return;
    try { const A = S.ac || (S.ac = new (window.AudioContext || window.webkitAudioContext)()); const o = A.createOscillator(), g = A.createGain(); o.type = type; o.frequency.value = f; g.gain.value = v; o.connect(g); g.connect(A.destination); o.start(); g.gain.exponentialRampToValueAtTime(0.0001, A.currentTime + d); o.stop(A.currentTime + d + 0.02); } catch (e) {}
  }
  function start(opts) {
    stop();
    const G = gen(opts.level), cv = opts.canvas, ctx = cv.getContext("2d");
    cv.width = VW; cv.height = VH; ctx.imageSmoothingEnabled = false;
    const first = G.ents.find(e => e.t === "check");
    S = { G, cv, ctx, opts, kit: Object.assign({}, opts.kit), sound: opts.sound !== false, t: 0, cam: 0, coins: 0, lost: 0, msgs: [], parts: [],
      P: { x: first.x + 3, y: first.y - PH.h, vx: 0, vy: 0, ground: false, face: 1, inv: 0, boots: opts.kit.boots, cd: 0 },
      check: { x: first.x + 3, y: first.y - PH.h }, hearts: opts.kit.hearts, shield: opts.kit.shield ? 1 : 0, ammo: opts.kit.ammo, rounds: opts.kit.rounds,
      ents: G.ents.map((e, i) => Object.assign({ i, alive: true, vx: e.t === "walker" ? -(0.45 + 0.15 * opts.level.world) : 0, ph: i * 1.7 }, e)),
      bolts: [], shells: [], scope: null, over: false, fire: [], invincible: !!opts.invincible, got: 0, streak: 0, flash: 0 };
    S.totalAmmo = S.ents.filter(e => e.t === "ammo").length;
    S.ents.filter(e => e.t === "nest").forEach(e => { e.sentries = makeSentries(e); });
    G.gateOpen = {};
    addEventListener("keydown", kd); addEventListener("keyup", ku);
    let last = performance.now(), acc = 0;
    const loop = now => {
      acc += Math.min(100, now - last); last = now;
      while (acc >= 1000 / 60) { tick(); acc -= 1000 / 60; }
      draw(); if (S && !S.over) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    msg(G.theme.name + (opts.level.boss ? ": the boss waits at the end" : ": reach the flag"), 160); msg("Grab the gold bullets: every one is a sniper round!", 200, "#ffd43b");
  }
  function stop() { cancelAnimationFrame(raf); removeEventListener("keydown", kd); removeEventListener("keyup", ku); for (const k in KEYS) KEYS[k] = false; S = null; }
  const msg = (t, d = 90, c = "#fff") => S.msgs.push({ t, d, c });
  const burst = (x, y, c, n = 8) => { for (let i = 0; i < n; i++) S.parts.push({ x, y, vx: (Math.random() - .5) * 3, vy: -Math.random() * 3, d: 30, c }); };
  function hurt(why) {
    if (S.P.inv > 0 || S.invincible) return;
    if (S.shield) { S.shield = 0; S.P.inv = 90; msg("Shield saved you!", 80, "#9fe7ff"); beep(600, .1, "triangle"); return; }
    S.hearts--; S.lost++; S.P.inv = 100; if (S.streak) msg("Bullet streak lost", 50, "#ffb3b3"); S.streak = 0; beep(140, .15); msg(why, 70, "#ffb3b3");
    if (S.hearts <= 0) end(false);
  }
  function end(win) {
    if (S.over) return; S.over = true;
    const res = { win, coins: S.coins, lost: S.lost, hearts: S.hearts, got: S.got, totalAmmo: S.totalAmmo };
    setTimeout(() => { const cb = S && S.opts.onEnd; stop(); cb && cb(res); }, win ? 900 : 700);
    draw();
  }
  const pressed = k => { const v = KEYS[k + "P"]; KEYS[k + "P"] = false; return v; };

  /* ---------- the sniper nest ---------- */
  function makeSentries(nest) {
    const w = S ? S.G.world : 1, boss = !!nest.boss;
    const rocks = w >= 3 ? [80, 190, 300, 410] : [110, 240, 370];
    const n = boss ? 1 : w === 1 ? 2 : w === 4 ? 4 : 3;
    const ranges = w === 1 ? [100] : [100, 200, 300];
    const list = [];
    for (let i = 0; i < n; i++) list.push({ at: rocks[i % rocks.length], side: i % 2 ? -1 : 1, x: rocks[i % rocks.length], tx: rocks[i % rocks.length], state: "hide", st: 40 + i * 50, hp: boss ? 6 : 1, alive: true, range: boss ? 300 : ranges[(i + nest.id) % ranges.length], boss, rocks, hold: 60 + i * 40 });
    return { list, rocks, wind: w >= 3 ? [-2, -1, 1, 2][(nest.id + w) % 4] : 0 };
  }
  function enterNest(n) {
    const alive = n.sentries.list.filter(s => s.alive);
    if (!alive.length) { msg("This nest is clear", 60); return; }
    S.scope = { nest: n, x: 240, y: 150, cd: 0, duck: false, flash: 0, fx: 0, fy: 0, supply: 0 };
    msg(n.boss ? "BOSS: the Warden is on the far ridge!" : "Scope up: knock out the sentries on the far ridge", 140, "#ffe066");
    beep(500, .08, "triangle");
  }
  const sway = () => { const a = S.kit.steady ? 2.5 : 5.5; return [S.scope.x + a * Math.sin(S.t / 23), S.scope.y + a * 0.8 * Math.sin(S.t / 31 + 1)]; };
  const FAR = 200, RW = 26, RH = 22;
  const inRock = (sc, x, y) => sc.nest.sentries.rocks.some(r => y <= FAR + 4 && ((x - r) / RW) ** 2 + ((y - FAR) / RH) ** 2 < 1);
  const sBox = s => { const k = s.boss ? 1.5 : 1, h = 30 * k; const up = s.state === "hide" ? 0 : s.state === "peek" ? 0.55 : 1; return { l: s.x - 7 * k, r: s.x + 7 * k, top: FAR - h * up, head: FAR - h * up + 10 * k, bot: FAR, vis: up > 0 }; };
  function scopeFire() {
    const sc = S.scope; if (sc.cd > 0) return;
    if (S.rounds <= 0) { msg("Out of sniper rounds", 60, "#ffb3b3"); beep(90, .1); return; }
    S.rounds--; sc.cd = 32; sc.flash = 6; beep(150, .1); beep(90, .08, "sawtooth");
    const [ax, ay] = sway(), w = sc.nest.sentries.wind;
    /* where the shot lands: the closest visible sentry's range decides the drop */
    let tgt = null, bd = 1e9;
    for (const s of sc.nest.sentries.list) if (s.alive) { const d = Math.abs(s.x - ax); if (d < bd) { bd = d; tgt = s; } }
    const drop = tgt ? (tgt.range / 100 - 1) * 8 : 0;
    const x = ax + w * 8, y = ay + drop; sc.fx = x; sc.fy = y;
    if (inRock(sc, x, y)) { burst(x, y, "#c8c0b0"); msg("ROCK!", 30, "#ffd8a8"); return; }
    for (const s of sc.nest.sentries.list) {
      if (!s.alive) continue; const b = sBox(s); if (!b.vis) continue;
      if (x >= b.l - 2 && x <= b.r + 2 && y >= b.top - 2 && y <= b.bot) {
        const head = y <= b.head; s.hp -= head ? 2 : 1; burst(x, y, "#ff6b6b", 10); beep(head ? 880 : 520, .08, "triangle");
        msg(head ? "HEADSHOT!" : "HIT!", 50, head ? "#ff6b6b" : "#fff"); S.coins += head ? 3 : 1;
        if (s.hp <= 0) { s.alive = false; s.state = "ko"; msg(s.boss ? "The Warden is down!" : "Sentry down!", 70, "#9be15d"); }
        else { s.state = "hide"; s.st = 0; s.hold = 30; s.x = s.at; }
        if (!sc.nest.sentries.list.some(q => q.alive)) { msg(sc.nest.boss ? "BOSS DEFEATED!" : "Ridge clear!", 120, "#9be15d"); if (sc.nest.boss) { S.scope = null; end(true); } else { const g = S.ents.find(e => e.t === "gate" && e.nest === sc.nest.id); if (g) { S.G.gateOpen[g.col] = true; msg("The laser gate is open!", 120, "#9be15d"); beep(392, .1, "triangle"); beep(587, .15, "triangle"); } setTimeout(() => { if (S && S.scope) S.scope = null; }, 600); } }
        return;
      }
    }
    burst(x, Math.min(y, FAR + 30), "#c9b48a", 5); msg(y > ay + 1 || x !== ax ? "MISS: check the dots" : "MISS", 40);
  }
  function scopeTick() {
    const sc = S.scope, w = S.G.world;
    sc.duck = !!KEYS.duck;
    if (!sc.duck) {
      const v = 2.4; if (KEYS.left) sc.x -= v; if (KEYS.right) sc.x += v; if (KEYS.up || KEYS.jump) sc.y -= v; if (KEYS.down) sc.y += v;
      sc.x = Math.max(16, Math.min(VW - 16, sc.x)); sc.y = Math.max(60, Math.min(VH - 30, sc.y));
      if (pressed("fire")) scopeFire();
    }
    if (pressed("leave") || pressed("use")) { S.scope = null; msg(sc.nest.sentries.list.some(s => s.alive) ? "Careful: the sentries left standing will shell the path" : "", 120, "#ffd43b"); return; }
    if (sc.cd > 0) sc.cd--; if (sc.flash > 0) sc.flash--;
    if (S.rounds <= 0 && sc.nest.sentries.list.some(s => s.alive)) { if (++sc.supply === 300) { S.rounds += 2; msg("Supply drop: +2 sniper rounds (gather bullets to skip the wait)", 120, "#9be15d"); sc.supply = 0; } else if (sc.supply === 1) msg("Out of rounds: a supply drop is on its way…", 120, "#ffd43b"); }
    for (const s of sc.nest.sentries.list) {
      if (!s.alive) continue;
      s.st++;
      const glint = (s.boss ? 70 : 95) - 10 * w;
      if (s.state === "aim") { if (s.st >= glint) { if (sc.duck) { msg("DUCKED!", 40, "#9be15d"); beep(700, .05, "triangle"); } else hurt("Sniped! Hold K to duck when you see the glint"); s.state = "hide"; s.st = 0; s.hold = 50 + Math.random() * 60; s.x = s.at; } continue; }
      if (s.state === "run") { const sp = 0.6 + 0.25 * w + (s.boss ? 0.3 : 0); s.x += Math.sign(s.tx - s.x) * sp; if (Math.abs(s.tx - s.x) <= sp) { s.x = s.tx; s.state = "peek"; s.st = 0; s.hold = 50 + Math.random() * 50 - 5 * w; } continue; }
      const out = () => { s.x = s.at + s.side * (s.boss ? 42 : 36); };
      if (s.st < s.hold) continue;
      const r = Math.random();
      if (s.state === "hide") { s.side = Math.random() < 0.5 ? -1 : 1; out(); if (r < (s.boss ? 0.45 : 0.25) + 0.05 * w) { s.state = "aim"; s.st = 0; } else { s.state = "peek"; s.st = 0; s.hold = 70 + Math.random() * 60 - 8 * w; } }
      else if (s.state === "peek") { if (r < 0.2 + 0.1 * w) { const o = s.rocks.filter(x => x !== s.at); s.at = o[Math.floor(Math.random() * o.length)]; s.tx = s.at + s.side * (s.boss ? 42 : 36); s.state = "run"; s.st = 0; } else { s.state = "hide"; s.st = 0; s.hold = 40 + Math.random() * 60; s.x = s.at; } }
    }
  }

  /* ---------- the main tick ---------- */
  function tick() {
    if (!S || S.over) return;
    S.t++;
    if (S.scope) { scopeTick(); S.parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .15; p.d--; }); S.parts = S.parts.filter(p => p.d > 0); S.msgs.forEach(m => m.d--); S.msgs = S.msgs.filter(m => m.d > 0); return; }
    const P = S.P, G = S.G;
    const dir = (KEYS.right ? 1 : 0) - (KEYS.left ? 1 : 0); if (dir) P.face = dir;
    const jp = pressed("jump") || pressed("up");
    step(G, P, { dir, jump: KEYS.jump || KEYS.up, jumpPressed: jp });
    if (jp && P.jumped) { beep(420, .05); P.jumped = false; }
    if (P.dbl > 0) { P.dbl--; if (P.dbl === 9) { burst(P.x + 5, P.y + 14, "#9fe7ff", 6); beep(620, .05); } }
    if (P.inv > 0) P.inv--;
    if (P.onSpike) hurt("Ouch! Spikes");
    if (P.y > ROWS * TS + 20) { hurt("You fell!"); if (S && !S.over) { P.x = S.check.x; P.y = S.check.y; P.vx = P.vy = 0; } }
    /* shooting the blaster */
    if (P.cd > 0) P.cd--;
    if (pressed("fire")) { if (S.ammo > 0 && P.cd === 0) { S.ammo--; P.cd = 12; S.bolts.push({ x: P.x + (P.face > 0 ? 10 : -2), y: P.y + 6, vx: 5 * P.face, d: 45 }); beep(880, .03); } else if (S.ammo <= 0) msg("No blaster ammo: jump on enemies instead", 50); }
    /* using a nest */
    const nest = S.ents.find(e => e.t === "nest" && Math.abs(e.x - P.x) < 22 && Math.abs(e.y - (P.y + PH.h)) < 20);
    if (nest && (pressed("use") || pressed("down"))) enterNest(nest);
    if (nest && nest.boss && !nest.seen) { nest.seen = true; enterNest(nest); }
    /* bolts */
    for (const b of S.bolts) { b.x += b.vx; b.d--; if (solidAt(G, Math.floor(b.x / TS), Math.floor(b.y / TS))) b.d = 0;
      for (const e of S.ents) if (e.alive && (e.t === "walker" || e.t === "drone") && Math.abs(b.x - (e.x + 6)) < 9 && Math.abs(b.y - (e.y + 5)) < 9) { e.alive = false; b.d = 0; burst(e.x + 6, e.y + 5, "#ffd43b"); S.coins++; beep(300, .06); dropAmmo(e); } }
    S.bolts = S.bolts.filter(b => b.d > 0);
    /* entities */
    for (const e of S.ents) {
      if (!e.alive) continue;
      if (e.t === "walker") {
        const nx = e.x + e.vx, c = Math.floor((e.vx < 0 ? nx : nx + 12) / TS), r = Math.floor((e.y + 10) / TS);
        if (solidAt(G, c, Math.floor((e.y + 4) / TS)) || !solidAt(G, c, r)) e.vx = -e.vx; else e.x = nx;
      }
      if (e.t === "drone") { e.ph += 0.05; e.x += Math.sin(e.ph * 0.6) * 0.8; e.y = e.y0 + Math.sin(e.ph) * 14; }
      const hitP = (w, h) => P.x < e.x + w && P.x + PH.w > e.x && P.y < e.y + h && P.y + PH.h > e.y;
      if (e.t === "walker" || e.t === "drone") {
        if (hitP(12, 10)) {
          if (P.vy > 0.5 && P.y + PH.h - e.y < 9) { e.alive = false; P.vy = -4.5; burst(e.x + 6, e.y + 4, "#ffd43b"); S.coins++; beep(660, .06); msg("STOMP!", 30); dropAmmo(e); }
          else hurt(e.t === "walker" ? "Bumped by a crawler bot" : "Zapped by a drone");
        }
      } else if (e.t === "coin" && hitP(8, 8)) { e.alive = false; S.coins++; beep(980, .04, "triangle", .03); }
      else if (e.t === "heart" && hitP(10, 10)) { e.alive = false; S.hearts = Math.min(6, S.hearts + 1); msg("+1 heart", 50, "#ff8787"); beep(760, .1, "triangle"); }
      else if (e.t === "ammo" && hitP(8, 12)) {
        e.alive = false; S.rounds++; S.got++; S.streak++; S.flash = 40; burst(e.x + 3, e.y + 4, "#ffd43b", 10); beep(880, .05, "triangle"); beep(1320, .07, "triangle");
        msg("+1 SNIPER ROUND", 50, "#ffd43b");
        if (S.streak % 3 === 0) { S.rounds++; msg(`BULLET STREAK x${S.streak}: +1 BONUS ROUND`, 80, "#ffa94d"); beep(1568, .12, "triangle"); }
      }
      else if (e.t === "crate" && hitP(12, 12)) { e.alive = false; S.ammo += 3; msg("+3 blaster ammo", 50, "#ffd43b"); beep(500, .06); }
      else if (e.t === "check" && !e.on && Math.abs(P.x - e.x) < 12) { e.on = true; S.check = { x: e.x + 2, y: e.y - PH.h }; msg("Checkpoint", 40, "#9be15d"); beep(540, .07, "triangle"); }
      else if (e.t === "gate" && !G.gateOpen[e.col] && Math.abs(P.x + PH.w - e.x) < 3 && S.t % 90 === 0) msg("Laser gate locked: clear the sentries from the nest (▼ / E)", 90, "#ffb3b3");
      else if (e.t === "goal" && Math.abs(P.x - e.x) < 12) { e.alive = false; msg("LEVEL CLEAR!", 120, "#9be15d"); beep(523, .1, "triangle"); beep(784, .2, "triangle"); end(true); return; }
    }
    /* shells from sentries left standing: they cover the stretch after their nest */
    for (const n of S.ents.filter(e => e.t === "nest" && !e.boss)) {
      const alive = n.sentries.list.filter(s => s.alive).length;
      if (!alive || S.P.inv > 0 || P.x < n.x - 6 * TS || P.x > n.x + 30 * TS) continue;
      n.shellT = (n.shellT || 0) + alive;
      if (n.shellT > 170) { n.shellT = 0; S.shells.push({ x: P.x + 5 + P.vx * 30, y: groundBelow(P.x + 5 + P.vx * 30), d: 70 }); }
    }
    for (const sh of S.shells) { sh.d--; if (sh.d === 0) { burst(sh.x, sh.y, "#ff922b", 14); beep(80, .2, "sawtooth"); if (Math.abs(P.x + 5 - sh.x) < 16 && Math.abs(P.y + PH.h - sh.y) < 24) hurt("Hit by a shell: clear the nest to stop them"); } }
    S.shells = S.shells.filter(s => s.d > 0);
    S.parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .15; p.d--; }); S.parts = S.parts.filter(p => p.d > 0);
    S.msgs.forEach(m => m.d--); S.msgs = S.msgs.filter(m => m.d > 0);
    S.cam = Math.max(0, Math.min(G.cols * TS - VW, P.x - VW * 0.4));
  }
  /* every second beaten bot drops a bullet (the drop is decided by the bot, so it is the same each play) */
  function dropAmmo(e) { if (e.i % 2) return; const x = e.x + 3; S.ents.push({ t: "ammo", x, y: groundBelow(x) - 12, alive: true, i: S.ents.length, ph: 0 }); S.totalAmmo++; msg("It dropped a bullet!", 50, "#ffd43b"); }
  const groundBelow = x => { const c = Math.floor(x / TS); for (let r = 0; r < ROWS; r++) if (solidAt(S.G, c, r)) return r * TS; return ROWS * TS; };

  /* ---------- drawing ---------- */
  function draw() {
    if (!S) return; const { ctx, G } = S, th = G.theme;
    if (S.scope) return drawScope();
    const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    if (G.world === 3) { ctx.fillStyle = "#f8f3d0"; ctx.fillRect(390, 30, 18, 18); ctx.fillStyle = th.sky[0]; ctx.fillRect(396, 28, 14, 14); for (let i = 0; i < 30; i++) { ctx.fillStyle = "#fff"; ctx.fillRect((i * 97 + 13) % VW, (i * 53) % 120, 1, 1); } }
    if (G.world === 4 && S.t % 240 < 4) { ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(0, 0, VW, VH); }
    const hills = (col, par, h, amp, f) => { ctx.fillStyle = col; for (let x = 0; x < VW; x += 4) { const wx = x + S.cam * par; const y = h + Math.round(amp * Math.sin(wx / f) + amp * 0.5 * Math.sin(wx / (f * 0.37))); ctx.fillRect(x, y, 4, VH - y); } };
    hills(th.far, 0.2, 150, 26, 70); hills(th.mid, 0.45, 190, 18, 45);
    const c0 = Math.floor(S.cam / TS), c1 = c0 + Math.ceil(VW / TS) + 1, ox = -Math.round(S.cam);
    for (let c = c0; c <= c1 && c < G.cols; c++) for (let r = 0; r < ROWS; r++) {
      const t = G.map[r][c], x = c * TS + ox, y = r * TS;
      if (t === 1) { const top = r === 0 || G.map[r - 1][c] !== 1; ctx.fillStyle = (c + r) % 2 ? th.dirt : th.dirt2; ctx.fillRect(x, y, TS, TS); if (top) { ctx.fillStyle = th.top; ctx.fillRect(x, y, TS, 4); ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(x, y + 4, TS, 1); } ctx.fillStyle = "rgba(0,0,0,.12)"; ctx.fillRect(x + 3 + (c * 7 + r * 3) % 9, y + 7, 2, 2); }
      else if (t === 2) { ctx.fillStyle = th.block; ctx.fillRect(x, y, TS, TS); ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fillRect(x, y, TS, 2); ctx.fillStyle = "rgba(0,0,0,.3)"; ctx.fillRect(x, y + TS - 2, TS, 2); ctx.fillRect(x + 7, y + 2, 2, TS - 4); }
      else if (t === 3) { ctx.fillStyle = "#d3d9e3"; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + k * 4, y + TS); ctx.lineTo(x + k * 4 + 2, y + 6); ctx.lineTo(x + k * 4 + 4, y + TS); ctx.fill(); } }
    }
    for (const e of S.ents) {
      if (!e.alive) continue; const x = Math.round(e.x) + ox, y = Math.round(e.y);
      if (x < -40 || x > VW + 40) continue;
      if (e.t === "coin") { const w = 2 + Math.abs(Math.round(3 * Math.sin(S.t / 8 + e.i))); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 4 - w, y, w * 2, 8); ctx.fillStyle = "#e67700"; ctx.fillRect(x + 4 - w, y + 7, w * 2, 1); }
      else if (e.t === "walker") { const f = Math.floor(S.t / 8) % 2; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1, 14, 10); ctx.fillStyle = "#8a6a4a"; ctx.fillRect(x, y, 12, 8); ctx.fillStyle = "#b08a62"; ctx.fillRect(x + 1, y, 10, 2); ctx.fillStyle = "#fff"; ctx.fillRect(x + (e.vx < 0 ? 2 : 7), y + 3, 3, 3); ctx.fillStyle = "#e03131"; ctx.fillRect(x + (e.vx < 0 ? 3 : 8), y + 4, 1, 1); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 1 + f * 2, y + 8, 3, 2); ctx.fillRect(x + 8 - f * 2, y + 8, 3, 2); }
      else if (e.t === "drone") { const f = S.t % 6 < 3; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y + 2, 14, 7); ctx.fillStyle = "#c92a2a"; ctx.fillRect(x, y + 3, 12, 5); ctx.fillStyle = "#ffec99"; ctx.fillRect(x + 5, y + 4, 2, 2); ctx.fillStyle = "#adb5bd"; ctx.fillRect(f ? x - 2 : x, y, f ? 6 : 3, 1); ctx.fillRect(f ? x + 8 : x + 10, y, f ? 6 : 3, 1); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 1, y + 1, 1, 2); ctx.fillRect(x + 10, y + 1, 1, 2); }
      else if (e.t === "heart") { ctx.fillStyle = "#ff6b6b"; ctx.fillRect(x + 1, y + 2, 3, 3); ctx.fillRect(x + 6, y + 2, 3, 3); ctx.fillRect(x, y + 3, 10, 3); ctx.fillRect(x + 2, y + 6, 6, 2); ctx.fillRect(x + 4, y + 8, 2, 1); }
      else if (e.t === "ammo") { const b = Math.round(2 * Math.sin(S.t / 9 + e.i)), gl = 0.35 + 0.25 * Math.sin(S.t / 6 + e.i); ctx.fillStyle = `rgba(255,212,59,${gl})`; ctx.fillRect(x - 3, y - 3 + b, 13, 17); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x, y - 1 + b, 7, 12); ctx.fillStyle = "#e8a33d"; ctx.fillRect(x + 1, y + 4 + b, 5, 6); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 1, y + 4 + b, 2, 6); ctx.fillStyle = "#adb5bd"; ctx.fillRect(x + 2, y + b, 3, 4); ctx.fillStyle = "#e9ecef"; ctx.fillRect(x + 2, y + b, 1, 3); }
      else if (e.t === "sign") { const n = S.ents.find(q => q.t === "nest" && q.id === e.nest), left = n ? n.sentries.list.filter(s => s.alive).length : 0; ctx.fillStyle = "#5a3a22"; ctx.fillRect(x + 10, y - 20, 3, 20); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 15, y - 44, 54, 25); ctx.fillStyle = left ? "#ffd43b" : "#8ce99a"; ctx.fillRect(x - 14, y - 43, 52, 23); txt(ctx, left ? "NEST AHEAD" : "RIDGE CLEAR", x + 12, y - 34, 7, "#1b1b2f"); if (left) txt(ctx, `${left} SENTRIES`, x + 12, y - 24, 7, "#c92a2a"); }
      else if (e.t === "crate") { ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1, 14, 14); ctx.fillStyle = "#c97a3e"; ctx.fillRect(x, y, 12, 12); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 3, y + 4, 6, 4); }
      else if (e.t === "check") { ctx.fillStyle = "#5a3a22"; ctx.fillRect(x, y - 30, 2, 30); ctx.fillStyle = e.on ? "#40c057" : "#adb5bd"; ctx.fillRect(x + 2, y - 30, 12, 8); }
      else if (e.t === "gate") { if (!S.G.gateOpen[e.col]) { ctx.fillStyle = "#495057"; ctx.fillRect(x - 2, 0, 20, 6); ctx.fillRect(x - 2, y - 4, 20, 4); for (let k = 0; k < 3; k++) { ctx.fillStyle = (S.t + k * 5) % 14 < 7 ? "#ff3b3b" : "#ff8787"; ctx.fillRect(x + 2 + k * 5, 6, 2, y - 10); } } else { ctx.fillStyle = "#495057"; ctx.fillRect(x - 2, y - 4, 20, 4); } }
      else if (e.t === "goal") { ctx.fillStyle = "#e9ecef"; ctx.fillRect(x, y - 64, 3, 64); const wv = Math.round(2 * Math.sin(S.t / 6)); ctx.fillStyle = "#ff7a29"; ctx.fillRect(x + 3, y - 64 + wv, 20, 12); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 10, y - 60 + wv, 6, 4); }
      else if (e.t === "nest") {
        const clear = !e.sentries.list.some(s => s.alive);
        ctx.fillStyle = "#5a3a22"; ctx.fillRect(x - 10, y - 34, 3, 34); ctx.fillRect(x + 9, y - 34, 3, 34); ctx.fillStyle = "#7a4a2a"; ctx.fillRect(x - 12, y - 36, 26, 5); ctx.fillStyle = e.boss ? "#e03131" : clear ? "#40c057" : "#ffd43b"; ctx.fillRect(x - 6, y - 46, 14, 9);
        ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 2, y - 44, 6, 2);
        if (Math.abs(S.P.x - e.x) < 22 && !clear) { ctx.fillStyle = "rgba(0,0,0,.65)"; ctx.fillRect(x - 46, y - 64, 94, 13); txt(ctx, "▼ / E: use the scope", x + 1, y - 54, 8, "#fff"); }
      }
    }
    for (const sh of S.shells) { const x = sh.x + ox; ctx.fillStyle = sh.d % 10 < 5 ? "#ff3b3b" : "#ffd43b"; ctx.fillRect(x - 8, sh.y - 2, 16, 2); ctx.fillRect(x - 1, sh.y - 10, 2, 8); }
    for (const b of S.bolts) { ctx.fillStyle = "#9fe7ff"; ctx.fillRect(Math.round(b.x) + ox, Math.round(b.y), 6, 2); }
    const P = S.P;
    if (!(P.inv > 0 && S.t % 6 < 3)) {
      const legs = !P.ground ? "jump" : Math.abs(P.vx) > 0.3 ? (Math.floor(S.t / 6) % 2 ? "run1" : "run2") : "idle";
      const img = sprite("hero-" + legs, HERO.concat(LEGS[legs]), P.face < 0);
      ctx.drawImage(img, Math.round(P.x) + ox - 1, Math.round(P.y) - 2);
      if (S.shield) { ctx.strokeStyle = "rgba(159,231,255,.8)"; ctx.strokeRect(Math.round(P.x) + ox - 3, Math.round(P.y) - 4, 16, 20); }
    }
    S.parts.forEach(p => { ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x) + ox, Math.round(p.y), 2, 2); });
    hud(); messages();
  }
  function txt(ctx, s, x, y, size = 10, c = "#fff", align = "center") { ctx.font = `bold ${size}px "Courier New", monospace`; ctx.textAlign = align; ctx.fillStyle = "#1b1b2f"; ctx.fillText(s, x + 1, y + 1); ctx.fillStyle = c; ctx.fillText(s, x, y); }
  const need0 = () => S.ents.some(e => e.t === "nest" && !e.boss && e.x > S.P.x - 40 && e.x - S.P.x < 22 * TS && e.sentries.list.some(q => q.alive));
  function hud() {
    const ctx = S.ctx; ctx.fillStyle = "rgba(10,12,30,.55)"; ctx.fillRect(0, 0, VW, 18);
    for (let i = 0; i < S.hearts; i++) { const x = 6 + i * 12; ctx.fillStyle = "#ff6b6b"; ctx.fillRect(x + 1, 5, 3, 3); ctx.fillRect(x + 5, 5, 3, 3); ctx.fillRect(x, 6, 9, 3); ctx.fillRect(x + 2, 9, 5, 2); ctx.fillRect(x + 4, 11, 1, 1); }
    let x = 6 + Math.max(S.hearts, 1) * 12 + 6;
    if (S.shield) { txt(ctx, "◆SHIELD", x, 13, 9, "#9fe7ff", "left"); x += 56; }
    txt(ctx, `BLASTER ${S.ammo}`, x, 13, 9, "#9fe7ff", "left"); x += 76;
    if (S.flash > 0) { S.flash--; ctx.fillStyle = `rgba(255,212,59,${S.flash / 60})`; ctx.fillRect(x - 4, 1, need0() ? 118 : 74, 16); }
    const near = S.ents.find(e => e.t === "nest" && !e.boss && e.x > S.P.x - 40 && e.x - S.P.x < 22 * TS && e.sentries.list.some(q => q.alive)), need = near ? near.sentries.list.filter(q => q.alive).length : 0;
    txt(ctx, `SNIPER ${S.rounds}${need ? ` · NEED ${need}` : ""}`, x, 13, 9, need && S.rounds < need ? "#ff8787" : "#ffd43b", "left"); x += need ? 118 : 74;
    if (S.streak % 3) { txt(ctx, "▮".repeat(S.streak % 3) + "▯".repeat(3 - S.streak % 3), x - 4, 13, 9, "#ffa94d", "left"); x += 30; }
    if (S.kit.boots) { txt(ctx, "BOOTS", x, 13, 9, "#b197fc", "left"); x += 44; }
    if (S.kit.steady) { txt(ctx, "STEADY", x, 13, 9, "#8ce99a", "left"); }
    txt(ctx, `● ${S.coins}`, VW - 8, 13, 9, "#ffd43b", "right");
  }
  function messages() { S.msgs.slice(-2).forEach((m, i) => txt(S.ctx, m.t, VW / 2, 44 + i * 16, 11, m.c)); }
  function drawScope() {
    const { ctx } = S, sc = S.scope, w = S.G.world, th = S.G.theme;
    const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    ctx.fillStyle = th.far; for (let x = 0; x < VW; x += 4) { const y = 120 + Math.round(16 * Math.sin(x / 40) + 8 * Math.sin(x / 13)); ctx.fillRect(x, y, 4, VH); }
    ctx.fillStyle = th.top; ctx.fillRect(0, FAR - 6, VW, 4); ctx.fillStyle = th.dirt; ctx.fillRect(0, FAR - 2, VW, VH);
    for (const s of sc.nest.sentries.list) {
      if (!s.alive && s.state !== "ko") continue; const b = sBox(s); if (!b.vis && s.state !== "ko") continue;
      const k = s.boss ? 1.5 : 1;
      if (s.state === "ko") { ctx.fillStyle = "#495057"; ctx.fillRect(s.x - 10 * k, FAR - 5, 20 * k, 5); continue; }
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(b.l - 1, b.top - 1, b.r - b.l + 2, b.bot - b.top + 1);
      ctx.fillStyle = s.boss ? "#7048e8" : "#2b8a3e"; ctx.fillRect(b.l, b.head, b.r - b.l, b.bot - b.head);
      ctx.fillStyle = s.boss ? "#ffd43b" : "#495057"; ctx.fillRect(b.l, b.top, b.r - b.l, b.head - b.top);
      ctx.fillStyle = "#ff6b6b"; ctx.fillRect(b.l + 2, b.top + 4 * k, b.r - b.l - 4, 2 * k);
      if (s.boss) { ctx.fillStyle = "#ffd43b"; ctx.fillRect(b.l + 1, b.top - 4, 3, 4); ctx.fillRect(s.x - 1, b.top - 6, 3, 6); ctx.fillRect(b.r - 4, b.top - 4, 3, 4); }
      if (s.state === "aim") { const f = 3 + 2 * Math.abs(Math.sin(S.t / 4)); ctx.fillStyle = "#ff2b2b"; ctx.fillRect(s.x - f * 2, b.top + 6, f * 4, 2); ctx.fillRect(s.x - 1, b.top + 6 - f * 2, 2, f * 4); }
    }
    for (const r of sc.nest.sentries.rocks) { ctx.fillStyle = "#6f6a63"; ctx.beginPath(); ctx.ellipse(r, FAR + 2, RW, RH, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = "#8d877e"; ctx.beginPath(); ctx.ellipse(r - 5, FAR - 3, RW - 9, RH - 8, 0, Math.PI, 0); ctx.fill(); }
    ctx.fillStyle = "#3b2f25"; ctx.fillRect(0, 244, VW, VH - 244);
    S.parts.forEach(p => { ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2); });
    if (sc.duck) { ctx.fillStyle = "rgba(5,8,20,.92)"; ctx.fillRect(0, 0, VW, VH); txt(ctx, "DUCKING…", VW / 2, VH / 2, 16, "#9fe7ff"); }
    else {
      const [x, y] = sway(), R = 64;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, VW, VH); ctx.arc(x, y, R, 0, Math.PI * 2, true); ctx.fillStyle = "rgba(5,8,20,.82)"; ctx.fill("evenodd"); ctx.restore();
      ctx.strokeStyle = "#0d1330"; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.stroke();
      ctx.fillStyle = "#e9f7ff"; ctx.fillRect(x - R + 4, y, R - 10, 1); ctx.fillRect(x + 6, y, R - 10, 1); ctx.fillRect(x, y - R + 4, 1, R - 10); ctx.fillRect(x, y + 6, 1, R - 10);
      if (w >= 2) for (let d = 1; d <= 3; d++) { ctx.fillStyle = "#ffd43b"; ctx.fillRect(x - 1, y + d * 8 - 1, 3, 3); }     /* drop dots below the centre */
      if (w >= 3) for (let d = 1; d <= 2; d++) { ctx.fillStyle = "#8ce99a"; ctx.fillRect(x - d * 8 - 1, y - 1, 3, 3); ctx.fillRect(x + d * 8 - 1, y - 1, 3, 3); }   /* wind dots */
      ctx.fillStyle = "#ff3b3b"; ctx.fillRect(x - 1, y - 1, 2, 2);
      if (sc.flash > 0) { ctx.fillStyle = `rgba(255,243,160,${sc.flash / 7})`; ctx.beginPath(); ctx.arc(sc.fx, sc.fy, 9 - sc.flash, 0, 7); ctx.fill(); }
      /* the rangefinder reads the closest visible sentry */
      const near = sc.nest.sentries.list.filter(s => s.alive && sBox(s).vis).sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x))[0];
      if (w >= 2 && near && Math.abs(near.x - x) < 50) { const d = near.range / 100 - 1; txt(ctx, `RANGE ${near.range} m: ${d ? `aim ${d} dot${d > 1 ? "s" : ""} HIGH` : "aim dead on"}`, x, y - R - 6, 9, "#ffd43b"); }
      if (sc.cd > 0) txt(ctx, "RELOADING", x, y + R + 12, 9, "#ffd43b");
    }
    const wind = sc.nest.sentries.wind;
    ctx.fillStyle = "rgba(10,12,30,.7)"; ctx.fillRect(0, 0, VW, 18);
    txt(ctx, `SNIPER ${S.rounds}`, 8, 13, 9, "#ffd43b", "left");
    for (let i = 0; i < S.hearts; i++) { ctx.fillStyle = "#ff6b6b"; ctx.fillRect(90 + i * 10, 6, 7, 6); }
    if (S.shield) txt(ctx, "◆", 160, 13, 9, "#9fe7ff", "left");
    const left = sc.nest.sentries.list.filter(s => s.alive).length;
    txt(ctx, sc.nest.boss ? `WARDEN ${"■".repeat(Math.max(0, sc.nest.sentries.list[0].hp))}` : `SENTRIES ${left}`, VW / 2, 13, 9, "#fff");
    if (wind) txt(ctx, `WIND ${wind > 0 ? "→".repeat(wind) : "←".repeat(-wind)} ${Math.abs(wind)}: aim ${Math.abs(wind)} dot${Math.abs(wind) > 1 ? "s" : ""} ${wind > 0 ? "LEFT" : "RIGHT"}`, VW - 8, 13, 9, "#8ce99a", "right");
    const glint = sc.nest.sentries.list.some(s => s.alive && s.state === "aim");
    if (glint && !sc.duck) txt(ctx, "RED GLINT! HOLD K TO DUCK", VW / 2, 36, 11, "#ff6b6b");
    txt(ctx, "J fire · K duck · E leave", VW / 2, VH - 8, 9, "#ced4da");
    messages();
  }
  /* test hooks: used only by tools/check_game4.js */
  const hook = {
    state: () => S && { x: S.P.x, y: S.P.y, hearts: S.hearts, ammo: S.ammo, rounds: S.rounds, coins: S.coins, scope: !!S.scope, over: S.over, cols: S.G.cols, shield: S.shield, check: S.check },
    teleport: (col) => { if (!S) return; const c = Math.max(0, Math.min(S.G.cols - 1, col)); let r = 0; while (r < ROWS && !solidAt(S.G, c, r)) r++; S.P.x = c * TS + 3; S.P.y = r * TS - PH.h; S.P.vx = S.P.vy = 0; },
    nests: () => S ? S.ents.filter(e => e.t === "nest").map(e => ({ x: e.x, boss: !!e.boss, alive: e.sentries.list.filter(s => s.alive).length })) : [],
    gates: () => S ? S.ents.filter(e => e.t === "gate").map(e => ({ col: e.col, nest: e.nest, open: !!S.G.gateOpen[e.col] })) : [],
    setRounds: n => { if (S) S.rounds = n; },
    ammo: () => S ? S.ents.filter(e => e.t === "ammo" && e.alive).map(e => ({ x: e.x, y: e.y })) : [],
    grab: () => { if (!S) return; const a = S.ents.find(e => e.t === "ammo" && e.alive); if (a) { S.P.x = a.x - 1; S.P.y = a.y - 2; S.P.vx = S.P.vy = 0; } },
    aimAt: (i, part = "body") => { if (!S || !S.scope) return false; const s = S.scope.nest.sentries.list.filter(q => q.alive)[i || 0]; if (!s) return false; s.state = "peek"; s.st = 0; s.hold = 9999; s.x = s.at + s.side * (s.boss ? 42 : 36); const b = sBox(s), drop = (s.range / 100 - 1) * 8, w = S.scope.nest.sentries.wind, a = S.kit.steady ? 2.5 : 5.5; const tx = s.x - w * 8, ty = (part === "head" ? (b.top + b.head) / 2 : (b.head + b.bot) / 2) - drop; S.scope.x = tx - a * Math.sin((S.t + 1) / 23); S.scope.y = ty - a * 0.8 * Math.sin((S.t + 1) / 31 + 1); S.scope.cd = 0; return true; },
    fire: () => { if (S && S.scope) { S.scope.cd = 0; KEYS.fireP = true; } else if (S) KEYS.fireP = true; },
    key: (k, down) => { KEYS[k] = down; if (down) KEYS[k + "P"] = true; },
    hurt: () => S && hurt("test"), win: () => S && end(true), lose: () => { if (S) { S.hearts = 1; S.shield = 0; S.P.inv = 0; hurt("test"); } }
  };
  return { start, stop, gen, reach, step, hook, THEMES };
})();
