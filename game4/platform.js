/* ---------------------------------------------------------------
   RIDGE RUNNER: the platform level and the sniper nests (our own pixel art, drawn in code).
   PF.start({canvas, level, kit, practice, onEnd}) runs one level; PF.gen(level) builds its map;
   PF.reach(level) checks with the hero's own physics that the goal can be reached.
   Runs on animation frames; there is no clock or countdown anywhere.
   --------------------------------------------------------------- */
const PF = (() => {
  const TS = 16, ROWS = 17, VW = 480, VH = 270;
  const ARENA_W = 30, ARENA_FLOOR = 12, LEDGES = [[7, 11], [18, 22]];
  /* physics (pixels per frame at 60 frames a second) */
  const PH = { acc: 0.35, air: 0.25, max: 2.0, fric: 0.72, grav: 0.32, fall: 6, jump: -6.2, dbl: -5.4, spring: -9.0, cut: -2.2, coyote: 6, buffer: 6, w: 10, h: 14 };
  const THEMES = [
    { name: "Bronze Canyon", sky: ["#f6c28b", "#f9e3c0"], far: "#d9915a", mid: "#b8673e", top: "#e8a33d", dirt: "#9c5a32", dirt2: "#874a27", block: "#c97a3e", deco: "cactus" },
    { name: "Silver Cliffs", sky: ["#8fb8de", "#dceaf6"], far: "#9aa9bd", mid: "#7586a0", top: "#d7e3ef", dirt: "#5f6f86", dirt2: "#526178", block: "#8a9bb5", deco: "pine" },
    { name: "Gold Forest", sky: ["#141b3a", "#2c3a6b"], far: "#22304f", mid: "#1b2a3a", top: "#3f8f4a", dirt: "#3b2f2a", dirt2: "#2f2521", block: "#6b5a3a", deco: "tree" },
    { name: "Storm Fortress", sky: ["#2a1840", "#5b3b7a"], far: "#3d2a57", mid: "#2b1d40", top: "#9a7fc4", dirt: "#3a3046", dirt2: "#2e2638", block: "#6d5a86", deco: "spire" }];

  /* ---------------- level generation (seeded) ---------------- */
  function rng(seed) { let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function gen(L) {
    const r = rng(L.seed), int = (a, b) => a + Math.floor(r() * (b - a + 1)), w = L.world;
    const len = L.boss ? 56 + 8 * w : 96 + 18 * w;
    const map = [...Array(ROWS)].map(() => []), ents = [];
    let x = 0, gh = 12;
    const ground = (c, h) => { for (let y = 0; y < ROWS; y++) map[y][c] = y >= h ? 1 : 0; };
    const air = c => { for (let y = 0; y < ROWS; y++) map[y][c] = 0; };
    /* the ground enemies, mixed from world 1: crawler bots, hopper bots and spiky rollers */
    const foe = (c) => { const k = r(), t = k < 0.4 ? "walker" : k < 0.7 ? "hopper" : "roller"; ents.push({ t, x: c * TS, y: gh * TS - 10, y0: gh * TS - 10 }); };
    const flat = (n, opt = {}) => { for (let i = 0; i < n; i++) ground(x + i, gh); if (opt.walker && n >= 5) foe(x + Math.floor(n / 2)); if (opt.coins) for (let i = 1; i < n - 1; i += 2) ents.push({ t: "coin", x: (x + i) * TS + 4, y: (gh - 2) * TS + 4 }); x += n; };
    const maxGap = 3, maxStep = w >= 3 ? 3 : 2, walkerP = 0.45 + 0.1 * w;
    /* the trickier pieces (David, Nov 2026: the start "seems too basic … let's start with some challenge") */
    const reachCells = [];
    const piece = name => {
      if (name === "mover") {                       /* a pit too wide to jump: ride the moving platform across */
        const g = int(5, 6 + (w >= 3 ? 1 : 0)); for (let i = 0; i < g; i++) air(x + i);
        ents.push({ t: "mover", x: x * TS, y: gh * TS, wd: 3 * TS, x0: x * TS, x1: (x + g - 3) * TS, v: 0.7 + 0.1 * w });
        for (let i = 0; i < g; i++) reachCells.push([x + i, gh]);
        ents.push({ t: "coin", x: (x + 1) * TS + 4, y: (gh - 2) * TS }, { t: "ammo", x: (x + g - 2) * TS + 4, y: (gh - 3) * TS });
        x += g; flat(int(3, 4));
      } else if (name === "crumble") {              /* a bridge that falls away if you stop on it */
        const g = int(4, 5 + (w >= 2 ? 1 : 0)); for (let i = 0; i < g; i++) { air(x + i); map[gh][x + i] = 6; }
        for (let i = 1; i < g; i += 2) ents.push({ t: "coin", x: (x + i) * TS + 4, y: (gh - 2) * TS });
        x += g; flat(int(3, 4));
      } else if (name === "spring") {               /* a cliff too high to jump: bounce off the spring pad */
        if (gh - 5 < 6) { flat(3); return piece("stones"); }
        flat(2); map[gh][x] = 5; for (let y = gh + 1; y < ROWS; y++) map[y][x] = 1; for (let y = 0; y < gh; y++) map[y][x] = 0; x++;
        flat(2); gh -= 5; ents.push({ t: "ammo", x: x * TS + 4, y: (gh - 2) * TS }); flat(int(4, 6), { coins: true });
      } else if (name === "stones") {               /* stepping stones over a spike pit */
        const n = int(3, 3 + (w >= 2 ? 1 : 0)); flat(1);
        for (let p = 0; p < n; p++) { for (let i = 0; i < 3; i++) { ground(x + i, gh); map[gh - 1][x + i] = 3; } map[gh - 3][x + 1] = 2; ents.push({ t: p === n - 1 ? "ammo" : "coin", x: (x + 1) * TS + 4, y: (gh - 5) * TS }); x += 3; }
        flat(int(3, 4));
      } else if (name === "tiers") {                /* a choice: the high road (blocks, bullets) or the low road (bots) */
        const x0 = x; flat(11, { walker: true });
        map[gh - 2][x0 + 1] = 2; for (let i = 3; i <= 9; i++) map[gh - 4][x0 + i] = 2;
        for (let i = 4; i <= 8; i += 2) ents.push({ t: i === 6 ? "ammo" : "coin", x: (x0 + i) * TS + 4, y: (gh - 6) * TS });
        flat(2);
      }
    };
    flat(6);
    ents.push({ t: "check", x: 2 * TS, y: gh * TS });
    /* the opening challenge: every stage starts with a moving platform and a crumbling bridge (boss runs too) */
    piece("mover"); piece("crumble");
    let chests = 0, sinceCheck = 0, nests = 0, wantNests = L.boss ? 0 : w <= 2 ? 2 : 3, sinceNest = 0;
    while (x < len - 14) {
      const k = r();
      if (sinceCheck > 30) { flat(4); ents.push({ t: "check", x: (x - 2) * TS, y: gh * TS }); sinceCheck = 0; continue; }
      if (nests < wantNests && x >= Math.round((len - 14) * (nests + 0.8) / (wantNests + 0.6))) {
        ents.push({ t: "sign", x: (x - 5) * TS, y: gh * TS, nest: nests }); ents.push({ t: "ammo", x: (x - 2) * TS + 4, y: (gh - 4) * TS }); flat(3); ents.push({ t: "nest", x: (x) * TS, y: gh * TS, id: nests }); flat(4); ground(x, gh); for (let y = 0; y < gh; y++) map[y][x] = 4; ents.push({ t: "gate", x: x * TS, y: gh * TS, col: x, nest: nests }); x++; flat(3); nests++; sinceNest = 0; sinceCheck += 8; continue;
      }
      if (!L.boss && chests < 2 && x >= Math.round(len * (chests ? 0.68 : 0.3))) { flat(2); ents.push({ t: "chest", x: x * TS + 2, y: gh * TS - 12 }); flat(4); chests++; continue; }
      if (k < 0.06) flat(int(4, 6), { walker: r() < walkerP, coins: r() < 0.5 });
      else if (k < 0.18) {                                            /* a gap with coins over it */
        const g = int(2, maxGap); for (let i = 0; i < g; i++) air(x + i);
        for (let i = 0; i < g; i++) ents.push({ t: i === Math.floor(g / 2) ? "ammo" : "coin", x: (x + i) * TS + 4, y: (gh - 3) * TS });   /* a bullet at the top of the jump */
        x += g; flat(int(3, 5));
      } else if (k < 0.26) {                                          /* a step up or down */
        const d = int(1, maxStep) * (r() < 0.5 ? -1 : 1); gh = Math.max(8, Math.min(14, gh + d)); flat(int(4, 6), { walker: r() < walkerP * 0.6 });
      } else if (k < 0.36) {                                /* floating blocks over a pit */
        const top = gh, n = int(2, 3); let px = x;
        for (let i = 0; i < 2; i++) air(px++);
        for (let p = 0; p < n; p++) {
          const h = Math.max(7, Math.min(13, top - int(0, 2))), wid = int(2, 3);
          for (let i = 0; i < wid; i++) { air(px + i); map[h][px + i] = 2; }
          ents.push({ t: p === n - 1 ? "ammo" : "coin", x: (px + 1) * TS + 4, y: (h - 2) * TS + 4 });
          px += wid; const g = int(1, 2); for (let i = 0; i < g; i++) air(px++);
        }
        x = px; flat(int(3, 5));
      } else if (k < 0.43) {                                         /* spikes on the ground */
        flat(2); const s = int(1, w === 1 ? 2 : 3); for (let i = 0; i < s; i++) { ground(x + i, gh); map[gh - 1][x + i] = 3; } x += s; flat(int(3, 4));
      } else if (k < 0.52) {                                         /* a run of narrow pillars */
        let h = gh; const n = int(3, 3 + w);
        for (let p = 0; p < n; p++) {
          const g = int(1, 2); for (let i = 0; i < g; i++) air(x++);
          h = Math.max(8, Math.min(14, h + int(-maxStep, Math.min(2, maxStep)))); const wid = w >= 3 ? 1 : int(1, 2);
          for (let i = 0; i < wid; i++) ground(x + i, h);
          if (r() < 0.6) ents.push({ t: p === n - 1 || r() < 0.3 ? "ammo" : "coin", x: x * TS + 4, y: (h - 2) * TS + 4 });
          x += wid;
        }
        air(x++); gh = h; flat(int(3, 4));
      } else if (k < 0.60) {                                         /* a drone patrol (and a swooper from world 2) */
        flat(int(5, 7)); ents.push({ t: "drone", x: (x - 3) * TS, y: (gh - 3) * TS, y0: (gh - 3) * TS });
        if (w >= 2 && r() < 0.6) ents.push({ t: "swooper", x: (x - 1) * TS, y: (gh - 6) * TS, y0: (gh - 6) * TS, x0: (x - 1) * TS });
      } else if (k < 0.66) { flat(int(6, 8), { walker: true, coins: true }); ents.push({ t: "ammo", x: (x - 4) * TS + 4, y: (gh - 3) * TS }); if (w >= 2) foe(x - 2);
        ents.push({ t: "ammo", high: true, x: (x - 6) * TS + 4, y: (gh - 6) * TS });             /* only a double jump reaches this one */ }
      else if (k < 0.74) piece("mover");
      else if (k < 0.81) piece("crumble");
      else if (k < 0.88) piece("spring");
      else if (k < 0.94) piece("stones");
      else piece("tiers");
      sinceCheck += 6; sinceNest += 6;
    }
    if (L.boss) {
      /* the boss arena: a flat floor one screen wide, a ledge on each side to hide on when the boss rolls */
      flat(4); ents.push({ t: "check", x: (x - 2) * TS, y: gh * TS }); flat(3);
      while (gh !== ARENA_FLOOR) { gh += Math.sign(ARENA_FLOOR - gh); flat(3); }
      flat(3); ents.push({ t: "arena", x: x * TS, y: gh * TS, col: x });
      for (let i = 0; i < ARENA_W; i++) ground(x + i, gh);
      for (const [a, b] of LEDGES) for (let i = a; i <= b; i++) map[gh - 3][x + i] = 2;
      x += ARENA_W; flat(1);
    }
    else { flat(12); ents.push({ t: "goal", x: (x - 5) * TS, y: gh * TS }); }
    ents.push({ t: "crate", x: 5 * TS, y: 12 * TS - 12 });                // a small blaster crate near the start
    { const sentries = L.boss ? 0 : (w === 1 ? 2 : w === 4 ? 4 : 3) * nests, have = () => ents.filter(e => e.t === "ammo").length;
      const coins = ents.filter(e => e.t === "coin"); for (let i = 0; have() < sentries + 3 && i < coins.length; i += 3) coins[i].t = "ammo";
      for (let c = 12; have() < sentries + 3 && c < x - 12; c += 5) { let r0 = 0; while (r0 < ROWS && map[r0][c] !== 1) r0++; if (r0 < ROWS && map[r0 - 1][c] === 0 && !ents.some(e => Math.abs(e.x - c * TS) < 20 && e.t !== "coin")) ents.push({ t: "ammo", x: c * TS + 4, y: (r0 - 3) * TS }); } }
    const cols = x;
    for (let y = 0; y < ROWS; y++) for (let c = 0; c < cols; c++) map[y][c] = map[y][c] || 0;
    /* hearts: one spare in the middle of longer levels */
    const mid = ents.filter(e => e.t === "check")[1]; if (mid) ents.push({ t: "heart", x: mid.x + 24, y: mid.y - 40 });
    return { map, ents, cols, theme: THEMES[w - 1], world: w, reachCells };
  }
  const solidAt = (G, c, r) => { if (c < 0) return true; if (c >= G.cols) return true; if (r < 0) return false; if (r >= ROWS) return false; const t = G.map[r][c]; return t === 1 || t === 2 || t === 5 || (t === 6 && !(G.broken && G.broken[c + "," + r])) || (t === 4 && !G.open && !(G.gateOpen && G.gateOpen[c])); };
  const spikeAt = (G, c, r) => c >= 0 && c < G.cols && r >= 0 && r < ROWS && G.map[r][c] === 3;

  /* one physics step for a body {x, y, vx, vy, ground} with input {dir, jump (held), jumpPressed} */
  function step(G, b, inp) {
    const a = b.ground ? PH.acc : PH.air;
    if (inp.dir) b.vx = Math.max(-PH.max, Math.min(PH.max, b.vx + inp.dir * a)); else { b.vx *= b.ground ? PH.fric : 0.92; if (Math.abs(b.vx) < 0.05) b.vx = 0; }
    if (b.ground) b.coy = PH.coyote; else b.coy = Math.max(0, (b.coy || 0) - 1);
    if (inp.jumpPressed) b.buf = PH.buffer; else b.buf = Math.max(0, (b.buf || 0) - 1);
    if (b.buf > 0 && b.coy > 0) { b.vy = PH.jump; b.coy = 0; b.buf = 0; b.ground = false; b.jumped = true; }
    else if (inp.jumpPressed && !b.ground && b.boots && !b.usedDbl) { b.vy = PH.dbl; b.usedDbl = true; b.buf = 0; b.dbl = 10; }
    if (!inp.jump && b.vy < PH.cut && !b.spring) b.vy = PH.cut;
    if (b.vy >= 0) b.spring = false;
    b.vy = Math.min(PH.fall, b.vy + PH.grav);
    /* move x */
    b.x += b.vx;
    const top = Math.floor(b.y / TS), bot = Math.floor((b.y + PH.h - 1) / TS);
    if (b.vx > 0) { const c = Math.floor((b.x + PH.w - 1) / TS); for (let r = top; r <= bot; r++) if (solidAt(G, c, r)) { b.x = c * TS - PH.w; b.vx = 0; break; } }
    else if (b.vx < 0) { const c = Math.floor(b.x / TS); for (let r = top; r <= bot; r++) if (solidAt(G, c, r)) { b.x = (c + 1) * TS; b.vx = 0; break; } }
    /* move y */
    b.y += b.vy; b.ground = false;
    const l = Math.floor(b.x / TS), rr = Math.floor((b.x + PH.w - 1) / TS);
    if (b.vy > 0) { const r = Math.floor((b.y + PH.h) / TS); for (let c = l; c <= rr; c++) if (solidAt(G, c, r) && r < ROWS) { b.y = r * TS - PH.h; b.vy = 0; b.ground = true; b.usedDbl = false;
      if (G.map[r][c] === 5) { b.vy = PH.spring; b.ground = false; b.spring = true; b.bounced = true; } break; } }
    else if (b.vy < 0) { const r = Math.floor(b.y / TS); for (let c = l; c <= rr; c++) if (solidAt(G, c, r)) { b.y = (r + 1) * TS; b.vy = 0; break; } }
    b.onSpike = false;
    for (let c = l; c <= rr; c++) { const r = Math.floor((b.y + PH.h - 4) / TS); if (spikeAt(G, c, r)) b.onSpike = true; }
  }

  /* ---------------- can the goal be reached? (uses the same physics, no double jump) ---------------- */
  function reach(L) {
    const G = gen(L); G.open = true; for (const [c, rr] of G.reachCells) G.map[rr][c] = 2; const  goal = G.ents.find(e => e.t === "goal" || e.t === "arena");
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
    if (!S) return;
    if (S.scope && (S.scope.nest.sentries.card || S.scope.intro)) { if (down && e.code === "Space") S.anyKey = true; if (e.code === "Space" || keyMap[e.code]) e.preventDefault(); if (!down && keyMap[e.code]) KEYS[keyMap[e.code]] = false; return; }   /* a key let go while a card is up still counts as let go */   /* SPACE closes the ridge report */
    const k = keyMap[e.code]; if (!k) return;
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
      bolts: [], shells: [], scope: null, over: false, fire: [], invincible: !!opts.invincible, got: 0, streak: 0, flash: 0, hfx: [], stop: 0, shake: 0, incoming: [], snipe: { score: 0, ko: 0, head: 0, shots: 0, hits: 0, best: 0, first: 0 }, arena: null, boss: null, waves: [], orbs: [], strikes: [], pops: [] };
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
    const lv = opts.level;
    if (lv.boss) { msg(`${G.theme.name}: ${(lv.bossName || "the boss")} waits at the end`, 160); msg("Run to the arena!", 200, "#ffd43b"); }
    else { msg(G.theme.name + (lv.stages > 1 ? `, stage ${lv.stage + 1} of ${lv.stages}: reach the flag` : ": reach the flag"), 160); msg("Grab the gold bullets: every one is a sniper round!", 200, "#ffd43b"); }
  }
  function stop() { if (S && S.opts.onCard) S.opts.onCard(null); cancelAnimationFrame(raf); removeEventListener("keydown", kd); removeEventListener("keyup", ku); for (const k in KEYS) KEYS[k] = false; S = null; }
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
    const res = { win, coins: S.coins, lost: S.lost, hearts: S.hearts, got: S.got, totalAmmo: S.totalAmmo, snipe: snipeTotals() };
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
    return { list, rocks, ranges, n, wind: w >= 3 ? [-2, -1, 1, 2][(nest.id + w) % 4] : 0, min: boss ? 1 : w === 1 ? 2 : 3,
      stat: { ko: 0, head: 0, shots: 0, hits: 0, streak: 0, best: 0, first: 0, score: 0, veh: 0 }, respawn: [], gate: false, card: null, chutes: [], veh: null, vehOff: boss || !!window.__noVeh };
  }
  /* a fresh sentry drops in at a rock nobody is using */
  function spawnSentry(ss) {
    const used = ss.list.filter(q => q.alive).map(q => q.at), free = ss.rocks.filter(r => !used.includes(r)), at = (free.length ? free : ss.rocks)[Math.floor(Math.random() * (free.length || ss.rocks.length))];
    ss.list.push({ at, side: Math.random() < .5 ? -1 : 1, x: at, tx: at, state: "hide", st: 0, hp: 1, alive: true, range: ss.ranges[Math.floor(Math.random() * ss.ranges.length)], boss: false, rocks: ss.rocks, hold: 30 + Math.random() * 40 });
  }
  /* ---------- vehicles at the nests (our own pixel art): planes drop paratroopers, helicopters zoom in and fire,
     tanks roll up behind the rocks and shell you. Each one down counts as a knockout and scores big. ---------- */
  const VEH = { plane: { hp: 2, pts: 200, name: "PLANE DOWN!" }, heli: { hp: 3, pts: 400, name: "CHOPPER DOWN!" }, tank: { hp: 4, pts: 300, name: "TANK DOWN!" } };
  const vehKinds = w => w === 1 ? ["plane", "heli"] : ["plane", "heli", "tank"];
  function spawnVeh(ss, kind) {
    const w = S.G.world, dir = Math.random() < .5 ? 1 : -1, k = kind || vehKinds(w)[Math.floor(Math.random() * vehKinds(w).length)], x = dir > 0 ? -50 : VW + 50;
    const v = { k, dir, x, hp: VEH[k].hp, st: 0, flash: 0 };
    if (k === "plane") { v.y = 46 + Math.random() * 18; v.vx = dir * (1.5 + 0.15 * w); v.drops = [0, 1, 2].slice(0, w >= 3 ? 2 : 1).map(() => 110 + Math.random() * 260); }
    if (k === "heli") { v.y = 96 + Math.random() * 24; v.hx = 120 + Math.random() * 240; v.state = "in"; }
    if (k === "tank") { v.y = FAR - 2; v.hx = 100 + Math.random() * 280; v.state = "in"; v.shots = 0; }
    ss.veh = v; msg({ plane: "A PLANE! Shoot the paratroopers before they land", heli: "CHOPPER INCOMING! Shoot it before it fires", tank: "A TANK! Hit the hatch on top for double damage" }[k], 110, "#ffd43b"); beep(180, .2, "sawtooth", .04);
  }
  function vehTick(ss) {
    const w = S.G.world;
    if (!ss.veh && !ss.vehOff) { if (ss.vt === undefined) ss.vt = 200 + Math.floor(Math.random() * 160); if (--ss.vt <= 0) { spawnVeh(ss); ss.vt = 420 - 40 * w + Math.floor(Math.random() * 220); } }
    const v = ss.veh;
    if (v) {
      v.st++; if (v.flash > 0) v.flash--;
      if (v.dead) { v.vy = (v.vy || 0) + 0.15; v.y += v.vy; v.x += v.dir * 0.8; v.rot = (v.rot || 0) + 0.08 * v.dir; if (S.t % 4 === 0) burst(v.x, v.y, "#495057", 3); if (v.y > FAR + 10 || (v.k === "tank" && v.st > 60)) { burst(v.x, FAR - 4, "#ff922b", 20); S.shake = 8; ss.veh = null; } }
      else if (v.k === "plane") {
        v.x += v.vx; v.drops = v.drops.filter(dx => { if ((v.dir > 0 && v.x >= dx) || (v.dir < 0 && v.x <= dx)) { ss.chutes.push({ x: v.x, y: v.y + 8, t: 0 }); beep(600, .05, "triangle"); return false; } return true; });
        if (v.x < -60 || v.x > VW + 60) ss.veh = null;
      } else if (v.k === "heli") {
        if (v.state === "in") { v.x += v.dir * 3.2; if ((v.dir > 0 && v.x >= v.hx) || (v.dir < 0 && v.x <= v.hx)) { v.state = "hover"; v.st = 0; } }
        else if (v.state === "hover") { v.y += Math.sin(v.st / 12) * 0.3; const aimAt = 50, fireAt = aimAt + 95 - 10 * w; v.aim = v.st >= aimAt && v.st < fireAt;
          if (v.st === fireAt) { S.incoming.push({ x0: v.x - v.dir * 14, y0: v.y + 4, t: 0, dur: Math.max(26, 44 - 4 * w) }); beep(240, .08, "sawtooth"); S.hfx.push({ k: "muzzle", x: v.x - v.dir * 6, y: v.y, t: 0 }); }
          if (v.st > fireAt + 40) { v.state = "out"; v.aim = false; } }
        else { v.x += v.dir * 4; v.y -= 0.6; if (v.x < -60 || v.x > VW + 60) ss.veh = null; }
      } else if (v.k === "tank") {
        if (v.state === "in") { v.x += v.dir * (0.6 + 0.1 * w); if ((v.dir > 0 && v.x >= v.hx) || (v.dir < 0 && v.x <= v.hx)) { v.state = "fire"; v.st = 0; } }
        else if (v.state === "fire") { const at = 70 + 110 * v.shots; v.aim = v.st >= at - 60 && v.st < at;
          if (v.st === at) { v.shots++; S.incoming.push({ x0: v.x, y0: v.y - 14, t: 0, dur: Math.max(28, 48 - 4 * w) }); beep(70, .3, "sawtooth", .07); S.shake = 6; S.hfx.push({ k: "muzzle", x: v.x + 12, y: v.y - 16, t: 0 }); }
          if (v.shots >= 2 && v.st > at + 50) { v.state = "out"; v.aim = false; v.dir = -v.dir; } }
        else { v.x += v.dir * 1.2; if (v.x < -60 || v.x > VW + 60) ss.veh = null; }
      }
    }
    /* paratroopers drift down; one that lands becomes a sentry behind the nearest rock */
    for (const c of ss.chutes) { c.t++; c.y += 0.45 + 0.05 * w; c.x += Math.sin(c.t / 30) * 0.3;
      if (c.y >= FAR - 26) { c.gone = true; const at = ss.rocks.slice().sort((a, b) => Math.abs(a - c.x) - Math.abs(b - c.x))[0]; ss.list.push({ at, side: c.x < at ? -1 : 1, x: c.x, tx: at + (c.x < at ? -36 : 36), state: "run", st: 0, hp: 1, alive: true, range: ss.ranges[0], boss: false, rocks: ss.rocks, hold: 40 }); msg("A paratrooper landed: one more sentry!", 70, "#ffb3b3"); } }
    ss.chutes = ss.chutes.filter(c => !c.gone);
  }
  /* a shot at a vehicle or paratrooper (they are close: no bullet drop, but wind still counts) */
  function vehHit(ss, x, y) {
    const st = ss.stat, v = ss.veh;
    for (const c of ss.chutes) if (x > c.x - 9 && x < c.x + 9 && y > c.y - 22 && y < c.y + 14) {
      c.gone = true; const pts = 150 + (st.streak >= 2 ? 25 * (st.streak + 1) : 0); st.hits++; st.streak++; st.best = Math.max(st.best, st.streak); st.ko++; st.veh = (st.veh || 0) + 1; st.score += pts; S.coins += 2;
      burst(c.x, c.y, "#ffd43b", 14); S.hfx.push({ k: "mark", x, y, head: false, t: 0 }, { k: "pop", x: c.x, y: c.y - 30, text: "SKY SHOT!", sub: `+${pts}`, c: "#74c0fc", t: 0 }); S.stop = 6; S.shake = 6; beep(988, .07, "triangle", .06); beep(1319, .12, "triangle", .05);
      ss.chutes = ss.chutes.filter(q => !q.gone); return true;
    }
    if (!v || v.dead) return false;
    const box = v.k === "plane" ? [v.x - 24, v.y - 8, v.x + 24, v.y + 8] : v.k === "heli" ? [v.x - 20, v.y - 12, v.x + 20, v.y + 10] : [v.x - 22, v.y - 27, v.x + 22, v.y];
    if (!(x > box[0] && x < box[2] && y > box[1] && y < box[3])) return false;
    const hatch = v.k === "tank" && y < v.y - 16 && Math.abs(x - v.x) < 7, dmg = hatch ? 2 : 1;
    v.hp -= dmg; v.flash = 8; st.hits++; st.streak++; st.best = Math.max(st.best, st.streak); S.coins += 1;
    let pts = hatch ? 100 : 50;
    if (v.aim) { pts += 50; st.first++; v.aim = false; if (v.k === "heli") { v.state = "out"; } S.hfx.push({ k: "pop", x: v.x, y: v.y - 40, text: "SHOT FIRST! +50", c: "#8ce99a", t: -4 }); }
    if (v.hp <= 0) { v.dead = true; v.st = 0; pts += VEH[v.k].pts; st.ko++; st.veh = (st.veh || 0) + 1; S.coins += 5; S.hfx.push({ k: "pop", x: v.x, y: v.y - 26, text: VEH[v.k].name, c: "#9be15d", t: -6 }); beep(110, .4, "sawtooth", .07); S.shake = 14; burst(v.x, v.y, "#ff922b", 24); }
    st.score += pts;
    S.hfx.push({ k: "mark", x, y, head: hatch, t: 0 }, { k: "pop", x: v.x, y: v.y - 14, text: hatch ? "HATCH HIT! x2" : "HIT!", sub: `+${pts}`, c: hatch ? "#ff4d4d" : "#fff", t: 0 });
    burst(x, y, "#ffd43b", 10); S.stop = 5; S.shake = Math.max(S.shake, 6); beep(784, .07, "triangle", .06);
    return true;
  }
  function drawVeh(ctx, ss, layer) {
    const v = ss.veh, f = v && v.flash > 0 && v.flash % 4 < 2, C = c => f ? "#fff" : c;
    if (layer === "ground" && v && v.k === "tank") {
      ctx.save(); ctx.translate(Math.round(v.x), Math.round(v.y)); if (v.dead) ctx.rotate(v.rot || 0); ctx.scale(v.dir, 1);
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(-23, -11, 46, 11); ctx.fillStyle = C("#3d4a2a"); ctx.fillRect(-22, -10, 44, 9);
      ctx.fillStyle = "#212529"; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-17 + i * 7, -4, 3, 0, 7); ctx.fill(); }
      ctx.fillStyle = C("#5c6b3a"); ctx.fillRect(-20, -16, 40, 7); ctx.fillStyle = C("#6b7d44"); ctx.fillRect(-10, -22, 20, 7);
      ctx.fillStyle = C("#4b5a30"); ctx.fillRect(8, -20, 18, 3); ctx.fillStyle = C("#ffd43b"); ctx.fillRect(-4, -25, 8, 3);   /* barrel and hatch */
      ctx.restore();
      if (v.aim) { ctx.fillStyle = S.t % 8 < 4 ? "#ff3b3b" : "#ffd43b"; ctx.fillRect(v.x + v.dir * 26 - 2, v.y - 21, 4, 4); }
      return;
    }
    if (layer !== "sky") return;
    for (const c of ss.chutes) {
      const x = Math.round(c.x), y = Math.round(c.y);
      ctx.fillStyle = "#1b1b2f"; ctx.beginPath(); ctx.arc(x, y - 14, 11, Math.PI, 0); ctx.fill();
      for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? "#fff" : "#ff6b6b"; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.arc(x, y - 14, 10, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); ctx.fill(); }
      ctx.strokeStyle = "#ced4da"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - 10, y - 14); ctx.lineTo(x, y); ctx.moveTo(x + 10, y - 14); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 4, y - 1, 8, 13); ctx.fillStyle = "#2b8a3e"; ctx.fillRect(x - 3, y + 3, 6, 8); ctx.fillStyle = "#495057"; ctx.fillRect(x - 3, y, 6, 3);
    }
    if (!v || v.k === "tank") return;
    ctx.save(); ctx.translate(Math.round(v.x), Math.round(v.y)); if (v.dead) ctx.rotate(v.rot || 0); ctx.scale(v.dir, 1);
    if (v.k === "plane") {
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(-25, -6, 50, 12); ctx.fillStyle = C("#7a8a96"); ctx.fillRect(-24, -5, 46, 10); ctx.fillStyle = C("#9aa9b5"); ctx.fillRect(-24, -5, 46, 3);
      ctx.fillStyle = C("#5b6b78"); ctx.fillRect(-6, -2, 18, 4); ctx.fillRect(-26, -14, 8, 10); ctx.fillStyle = C("#e03131"); ctx.fillRect(-25, -13, 6, 3);
      ctx.fillStyle = "#74c0fc"; ctx.fillRect(16, -3, 5, 3); ctx.fillStyle = "#adb5bd"; const p = S.t % 4 < 2; ctx.fillRect(24, p ? -9 : -2, 2, p ? 18 : 4);
    } else {
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(-16, -9, 30, 17); ctx.fillStyle = C("#3b5a3a"); ctx.fillRect(-15, -8, 28, 15); ctx.fillStyle = "#74c0fc"; ctx.fillRect(4, -6, 8, 7);
      ctx.fillStyle = C("#2f4a2f"); ctx.fillRect(-34, -5, 20, 4); ctx.fillStyle = "#adb5bd"; ctx.fillRect(-36, -9 + (S.t % 4 < 2 ? 0 : 3), 3, 9);
      ctx.fillStyle = "#495057"; ctx.fillRect(-12, 8, 22, 2); ctx.fillRect(-9, 6, 2, 3); ctx.fillRect(5, 6, 2, 3);
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(-1, -13, 3, 4); const rw = 14 + 12 * Math.abs(Math.sin(S.t / 2)); ctx.fillStyle = "#ced4da"; ctx.fillRect(-rw, -14, rw * 2, 2);
    }
    ctx.restore();
    if (v.aim && !v.dead) { const f2 = 2 + 2 * Math.abs(Math.sin(S.t / 3)); ctx.fillStyle = "#ff2b2b"; ctx.fillRect(v.x + v.dir * 14 - f2 * 2, v.y, f2 * 4, 2); ctx.fillRect(v.x + v.dir * 14 - 1, v.y + 1 - f2 * 2, 2, f2 * 4); }
  }
  /* the page draws the gear card and the ridge report over the canvas (modern cards with the item art); the canvas only dims */
  const cardOut = (kind, data) => { if (S && S.opts.onCard) S.opts.onCard(kind, data); };
  function gearInfo(sc) {
    const ss = sc.nest.sentries, w = S.G.world, k = S.kit;
    return { nest: sc.nest.id + 1, world: w, rounds: S.rounds, min: ss.min, steady: !!k.steady, hearts: S.hearts, shield: !!S.shield, boots: !!k.boots, wind: w >= 3 ? ss.wind : null, dots: w >= 2,
      threats: vehKinds(w) };
  }
  function dimOnly(ctx, t, n) { ctx.fillStyle = `rgba(5,8,20,${0.6 * Math.min(1, t / n)})`; ctx.fillRect(0, 0, VW, VH); }
  /* the gear card before the shooting starts: what the briefing earned, and what each thing does */
  function drawIntro(ctx, sc) {
    if (S.opts.onCard) { sc.intro.t++; return dimOnly(ctx, sc.intro.t, 10); }
    const it = sc.intro, ss = sc.nest.sentries, w = S.G.world, k = S.kit; it.t++; const g = Math.min(1, it.t / 10);
    ctx.fillStyle = `rgba(5,8,20,${0.85 * g})`; ctx.fillRect(0, 0, VW, VH);
    ctx.save(); ctx.translate(VW / 2, VH / 2); ctx.scale(0.7 + 0.3 * g, 0.7 + 0.3 * g); ctx.translate(-VW / 2, -VH / 2);
    ctx.fillStyle = "#1b1b2f"; ctx.fillRect(26, 8, 428, 254); ctx.fillStyle = "#24305e"; ctx.fillRect(30, 12, 420, 246); ctx.fillStyle = "#ffd43b"; ctx.fillRect(30, 12, 420, 20);
    txt(ctx, `SNIPER NEST ${sc.nest.id + 1}: YOUR GEAR`, VW / 2, 26, 11, "#1b1b2f");
    const rows = [
      ["◎", `SNIPER ROUNDS: ${S.rounds}`, true, `One shot each. Knock out ${ss.min} to open the gate, then keep going for a high score.`],
      ["〰", `STEADY SCOPE: ${k.steady ? "ON" : "OFF"}`, k.steady, k.steady ? "Your crosshair sways half as much: easier to hit." : "Big sway. Get half the briefing right to earn it."],
      ["❤", `HEARTS: ${S.hearts}${S.shield ? " + SHIELD" : ""}`, true, "Each enemy shot that hits costs one. Hold K to duck when you see a red glint."],
      ["⤒", `BOOTS: ${k.boots ? "ON" : "OFF"}`, k.boots, k.boots ? "A second jump in mid-air on the way to the next nest." : "Get ¾ of the briefing right for double-jump boots."]];
    if (w >= 2) rows.push(["⋮", "DROP DOTS", true, "Far targets: aim 1 dot high for 200 m, 2 dots for 300 m."]);
    if (w >= 3) rows.push(["≋", `WIND: ${ss.wind > 0 ? "→".repeat(ss.wind) : "←".repeat(-ss.wind)}`, true, "Aim against the wind, one green dot per arrow."]);
    rows.forEach(([ic, h, on, d], i) => { const y = 50 + i * 26, show = it.t > 6 + i * 5; if (!show) return;
      txt(ctx, ic, 48, y + 4, 12, on ? "#ffd43b" : "#868e96", "left"); txt(ctx, h, 66, y, 10, on ? "#8ce99a" : "#adb5bd", "left"); txt(ctx, d, 66, y + 12, 8, "#dee2e6", "left"); });
    const threats = ["SENTRIES"].concat(vehKinds(w).map(v => ({ plane: "PLANES + PARATROOPERS", heli: "HELICOPTERS", tank: "TANKS" }[v])));
    if (it.t > 40) txt(ctx, `WATCH OUT FOR: ${threats.join(" · ")}`, VW / 2, 50 + rows.length * 26 + 4, 8, "#ffa8a8");
    if (it.t > 20) txt(ctx, "Press SPACE to start shooting", VW / 2, 250, 10, S.t % 40 < 26 ? "#fff" : "#868e96");
    ctx.restore();
  }
  function enterNest(n) {
    if (S.rounds <= 0 && n.sentries.gate && !n.boss) { msg("Out of sniper rounds: grab gold bullets, then come back for a higher score", 140, "#ffd43b"); return; }
    n.sentries.card = null;
    for (const k in KEYS) KEYS[k] = false;
    S.scope = { nest: n, x: 240, y: 150, cd: 0, duck: false, flash: 0, fx: 0, fy: 0, supply: 0, intro: !n.boss && !n.briefed && !window.__noIntro ? { t: 0 } : null };
    n.briefed = true;
    if (S.scope.intro) cardOut("gear", gearInfo(S.scope));
    S.msgs = [];                                                        // the platform's messages would clutter the scope
    msg(n.boss ? "BOSS: the Warden is on the far ridge!" : `SCORE ATTACK! Knock out ${n.sentries.min} to open the gate, then as many as your rounds allow`, 160, "#ffe066");
    if (S.kit.steady && !S.tipSteady) { S.tipSteady = true; msg("STEADY SCOPE: half the sway, from your briefing", 140, "#8ce99a"); }
    beep(500, .08, "triangle");
  }
  const sway = () => { const a = S.kit.steady ? 2.5 : 5.5; return [S.scope.x + a * Math.sin(S.t / 23), S.scope.y + a * 0.8 * Math.sin(S.t / 31 + 1)]; };
  const FAR = 200, RW = 26, RH = 22;
  const inRock = (sc, x, y) => sc.nest.sentries.rocks.some(r => y <= FAR + 4 && ((x - r) / RW) ** 2 + ((y - FAR) / RH) ** 2 < 1);
  const sBox = s => { const k = s.boss ? 1.5 : 1, h = 30 * k; const up = s.state === "hide" ? 0 : s.state === "peek" ? 0.55 : 1; return { l: s.x - 7 * k, r: s.x + 7 * k, top: FAR - h * up, head: FAR - h * up + 10 * k, bot: FAR, vis: up > 0 }; };
  function scopeFire() {
    const sc = S.scope; if (sc.cd > 0) return;
    if (S.rounds <= 0) { msg("Out of sniper rounds", 60, "#ffb3b3"); beep(90, .1); return; }
    S.rounds--; sc.cd = 32; sc.flash = 6; beep(150, .1); beep(90, .08, "sawtooth"); const st = sc.nest.sentries.stat; st.shots++;
    const [ax, ay] = sway(), w = sc.nest.sentries.wind;
    /* where the shot lands: the closest visible sentry's range decides the drop */
    let tgt = null, bd = 1e9;
    for (const s of sc.nest.sentries.list) if (s.alive) { const d = Math.abs(s.x - ax); if (d < bd) { bd = d; tgt = s; } }
    const drop = tgt ? (tgt.range / 100 - 1) * 8 : 0;
    if (vehHit(sc.nest.sentries, ax + w * 8, ay)) { sc.fx = ax + w * 8; sc.fy = ay; return; }
    const x = ax + w * 8, y = ay + drop; sc.fx = x; sc.fy = y;
    if (inRock(sc, x, y)) { burst(x, y, "#c8c0b0"); msg("ROCK!", 30, "#ffd8a8"); st.streak = 0; return; }
    for (const s of sc.nest.sentries.list) {
      if (!s.alive) continue; const b = sBox(s); if (!b.vis) continue;
      if (x >= b.l - 2 && x <= b.r + 2 && y >= b.top - 2 && y <= b.bot) {
        const head = y <= b.head, dir = x < s.x ? 1 : -1; s.hp -= head ? 2 : 1; S.coins += head ? 3 : 1;
        st.hits++; st.streak++; st.best = Math.max(st.best, st.streak);
        let pts = 0;
        if (s.state === "aim") { S.coins += 2; st.first++; pts += 50; S.hfx.push({ k: "pop", x: s.x, y: b.top - 46, text: "SHOT FIRST! +50", c: "#8ce99a", t: -4 }); }
        burst(x, y, head ? "#ff3b3b" : "#ffd43b", head ? 18 : 12);
        const willKo = s.hp <= 0;
        pts += willKo ? (head ? 250 : 100) : 50; if (st.streak >= 3) pts += 25 * st.streak; st.score += pts;
        if (willKo && !s.boss) { st.ko++; if (head) st.head++; } else if (head) st.head++;
        S.hfx.push({ k: "mark", x, y, head, t: 0 }, { k: "pop", x: s.x, y: b.top - 12, text: head ? "HEADSHOT!" : "HIT!", sub: `+${pts}${st.streak >= 3 ? ` (STREAK x${st.streak})` : ""}`, c: head ? "#ff4d4d" : "#ffffff", t: 0 });
        if (head) S.hfx.push({ k: "ring", x, y, t: 0 }, { k: "helmet", x: s.x, y: b.top, vx: dir * 1.4, vy: -3.2, t: 0, boss: s.boss });
        S.stop = head ? 9 : 6; S.shake = head ? 10 : 6; s.flash = 9;
        beep(head ? 1175 : 784, .07, "triangle", .06); beep(head ? 1760 : 1046, head ? .16 : .1, "triangle", .05);
        if (s.hp <= 0) { s.alive = false; s.state = "ko"; s.koT = 0; s.koDir = dir; s.koHead = head; S.hfx.push({ k: "pop", x: s.x, y: b.top - 30, text: s.boss ? "THE WARDEN IS DOWN!" : "SENTRY DOWN!", c: "#9be15d", t: -10 }); }
        else { s.hideIn = 10; }
        const ss = sc.nest.sentries;
        if (sc.nest.boss && !ss.list.some(q => q.alive)) { msg("BOSS DEFEATED!", 120, "#9be15d"); st.ko = 1; ss.card = cardFor(ss); setTimeout(() => { if (S) { S.scope = null; end(true); } }, 900); }
        else if (!sc.nest.boss && s.hp <= 0) {
          ss.respawn.push(70 + Math.floor(Math.random() * 50));
          if (!ss.gate && st.ko >= ss.min) { ss.gate = true; const g = S.ents.find(e => e.t === "gate" && e.nest === sc.nest.id); if (g) S.G.gateOpen[g.col] = true; S.hfx.push({ k: "pop", x: VW / 2, y: 80, text: "GATE OPEN! NOW GO FOR A HIGH SCORE", c: "#9be15d", t: -8 }); beep(392, .1, "triangle"); beep(587, .15, "triangle"); }
        }
        return;
      }
    }
    st.streak = 0; burst(x, Math.min(y, FAR + 30), "#c9b48a", 5); S.hfx.push({ k: "miss", x, y: Math.min(y, FAR + 20), t: 0 }); msg(y > ay + 1 || x !== ax ? "MISS: check the dots" : "MISS", 40);
  }
  function scopeTick() {
    const sc = S.scope, w = S.G.world;
    if (sc.intro) { const go = S.anyKey; S.anyKey = false; for (const k in KEYS) if (k.endsWith("P")) KEYS[k] = false; if (go && sc.intro.t > 12) { sc.intro = null; cardOut(null); for (const k in KEYS) KEYS[k] = false; beep(660, .08, "triangle"); } return; }   /* the gear card: nothing moves */
    { const ss = sc.nest.sentries;                                             /* the ridge report: wait for SPACE, nothing else moves */
      if (ss.card && !sc.nest.boss) { const any = S.anyKey; S.anyKey = false; for (const k in KEYS) if (k.endsWith("P")) KEYS[k] = false; if (any && ss.card.t > 20) { closeCard(); for (const k in KEYS) KEYS[k] = false; } return; } }
    for (const b of S.incoming) {                                              /* bullets flying at you */
      b.t++;
      if (b.t === b.dur) {
        if (sc.duck) { msg("WHOOSH! Ducked just in time", 60, "#9be15d"); beep(900, .05, "triangle"); S.hfx.push({ k: "whoosh", t: 0 }); }
        else { const h0 = S.hearts; hurt("Sniped! When a bullet comes, hold K to duck"); S.hfx.push({ k: "ouch", t: 0, lost: S.hearts < h0 }); S.shake = 12; }
      }
    }
    S.incoming = S.incoming.filter(b => b.t < b.dur);
    sc.duck = !!KEYS.duck;
    if (!sc.duck) {
      const v = 2.4; if (KEYS.left) sc.x -= v; if (KEYS.right) sc.x += v; if (KEYS.up || KEYS.jump) sc.y -= v; if (KEYS.down) sc.y += v;
      sc.x = Math.max(16, Math.min(VW - 16, sc.x)); sc.y = Math.max(24, Math.min(VH - 30, sc.y));
      if (pressed("fire")) scopeFire();
    }
    const ss = sc.nest.sentries;
    if (pressed("leave") || pressed("use")) { if (sc.nest.boss) { S.scope = null; return; } ss.card = cardFor(ss); return; }
    ss.respawn = ss.respawn.map(t => t - 1); while (ss.respawn.length && ss.respawn[0] <= 0) { ss.respawn.shift(); spawnSentry(ss); }
    ss.list = ss.list.filter(q => q.alive || (q.koT || 0) < 100);
    if (!sc.nest.boss) vehTick(ss);
    /* out of rounds: the report card once the gate is open, a supply drop if not (never stuck) */
    if (!sc.nest.boss && S.rounds <= 0 && sc.cd === 0 && !S.incoming.length && ss.gate) { ss.card = cardFor(ss); return; }
    if (sc.cd > 0) sc.cd--; if (sc.flash > 0) sc.flash--;
    if (S.rounds <= 0 && (sc.nest.boss || !ss.gate)) { if (++sc.supply === 300) { S.rounds += 2; msg("Supply drop: +2 sniper rounds (gather bullets to skip the wait)", 120, "#9be15d"); sc.supply = 0; } else if (sc.supply === 1) msg("Out of rounds: a supply drop is on its way…", 120, "#ffd43b"); }
    for (const s of sc.nest.sentries.list) {
      if (!s.alive) continue;
      s.st++;
      const glint = (s.boss ? 70 : 95) - 10 * w;
      if (s.state === "aim") {
        if (s.st >= glint + 25) {                                              /* the shot: a bullet you can see coming */
          const b = sBox(s); S.incoming.push({ x0: s.x - 16, y0: b.top + 9, t: 0, dur: Math.max(24, 46 - 5 * w - (s.boss ? 6 : 0)) });
          beep(220, .08, "sawtooth"); S.hfx.push({ k: "muzzle", x: s.x, y: b.top + 6, t: 0 });
          s.state = "hide"; s.st = 0; s.hold = 60 + Math.random() * 60; s.x = s.at;
        }
        continue;
      }
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
    if (!S || S.over || S.paused) return;
    S.t++;
    if (S.scope) {
      S.hfx.forEach(f => { f.t++; if (f.k === "helmet") { f.x += f.vx; f.y += f.vy; f.vy += 0.25; } }); S.hfx = S.hfx.filter(f => f.t < (f.k === "pop" ? 70 : f.k === "helmet" ? 60 : f.k === "ouch" ? 50 : 26));
      for (const q of S.scope.nest.sentries.list) { if (q.flash > 0) q.flash--; if (q.koT !== undefined) q.koT++; if (q.hideIn > 0 && --q.hideIn === 0 && q.alive) { q.state = "hide"; q.st = 0; q.hold = 30; q.x = q.at; } }
      if (S.shake > 0) S.shake--;
      if (S.stop > 0) { S.stop--; return; }                                               /* the freeze-frame on a hit */
      scopeTick(); S.parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .15; p.d--; }); S.parts = S.parts.filter(p => p.d > 0); S.msgs.forEach(m => m.d--); S.msgs = S.msgs.filter(m => m.d > 0); return; }
    const P = S.P, G = S.G;
    if (S.shake > 0) S.shake--;
    const dir = (KEYS.right ? 1 : 0) - (KEYS.left ? 1 : 0); if (dir) P.face = dir;
    const jp = pressed("jump") || pressed("up");
    /* moving platforms: they move first, and carry the hero standing on them */
    for (const e of S.ents) if (e.t === "mover") { e.dx = e.v; e.x += e.v; if (e.x <= e.x0 || e.x >= e.x1) { e.x = Math.max(e.x0, Math.min(e.x1, e.x)); e.v = -e.v; } }
    if (P.onMover) P.x += P.onMover.dx;
    const footY = P.y + PH.h;
    step(G, P, { dir, jump: KEYS.jump || KEYS.up, jumpPressed: jp });
    P.onMover = null;
    if (P.vy >= 0) for (const e of S.ents) if (e.t === "mover" && P.x + PH.w > e.x + 1 && P.x < e.x + e.wd - 1 && footY <= e.y + 2 && P.y + PH.h >= e.y) { P.y = e.y - PH.h; P.vy = 0; P.ground = true; P.usedDbl = false; P.onMover = e; break; }
    if (P.bounced) { P.bounced = false; beep(330, .06, "triangle"); beep(660, .1, "triangle"); burst(P.x + 5, P.y + 14, "#ffd43b", 8); if (!S.tipSpring) { S.tipSpring = true; msg("SPRING PAD! Hold → to land on the ledge", 90, "#ffd43b"); } }
    /* crumbling blocks: stand on one too long and it falls away (it comes back later) */
    G.broken = G.broken || {}; G.crumbT = G.crumbT || {};
    if (P.ground && !P.onMover) { const rB = Math.floor((P.y + PH.h) / TS); for (let c = Math.floor(P.x / TS); c <= Math.floor((P.x + PH.w - 1) / TS); c++) if (rB < ROWS && G.map[rB][c] === 6 && !G.broken[c + "," + rB]) {
      const key = c + "," + rB; G.crumbT[key] = (G.crumbT[key] || 0) + 1; if (G.crumbT[key] === 1 && !S.tipCrumble) { S.tipCrumble = true; msg("CRUMBLING BRIDGE! Keep running", 80, "#ffb3b3"); }
      if (G.crumbT[key] > 24) { G.broken[key] = 240; G.crumbT[key] = 0; burst(c * TS + 8, rB * TS + 4, "#a0522d", 10); beep(120, .1, "sawtooth"); } } }
    for (const key in G.broken) if (--G.broken[key] <= 0) { const [c, rB] = key.split(",").map(Number); if (P.x + PH.w > c * TS && P.x < c * TS + TS && P.y + PH.h > rB * TS && P.y < rB * TS + TS) G.broken[key] = 20; else { delete G.broken[key]; G.crumbT[key] = 0; } }
    if (jp && P.jumped) { beep(420, .05); P.jumped = false; }
    if (P.dbl > 0) { P.dbl--; if (P.dbl === 9) { burst(P.x + 5, P.y + 14, "#9fe7ff", 6); beep(620, .05); if (!S.tipBoots) { S.tipBoots = true; msg("BOOTS: a second jump in mid-air!", 80, "#b197fc"); } } }
    if (!S.tipStart && S.t === 200) { S.tipStart = true; const k = S.kit; msg(`Your kit: ${S.hearts} hearts${k.shield ? ", a shield" : ""}${k.boots ? ", double-jump boots" : ""}${k.steady ? ", a steady scope" : ""}, ${S.ammo} blaster shots, ${S.rounds} sniper rounds`, 200, "#9fe7ff"); }
    if (P.inv > 0) P.inv--;
    /* the boss arena: once inside, its walls close and the camera holds still */
    if (!S.arena) { const a = S.ents.find(e => e.t === "arena"); if (a && P.x > a.x + 2 * TS) startArena(a); }
    if (S.arena) { const A = S.arena; if (P.x < A.L + 10) { P.x = A.L + 10; P.vx = Math.max(0, P.vx); } if (P.x > A.R - 10 - PH.w) { P.x = A.R - 10 - PH.w; P.vx = Math.min(0, P.vx); } bossTick(); if (!S || S.over) return; }
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
    for (const b of S.bolts) { b.x += b.vx; b.d--; if (solidAt(G, Math.floor(b.x / TS), Math.floor(b.y / TS))) b.d = 0; if (S.boss && b.d > 0 && boltBoss(b)) b.d = 0;
      for (const e of S.ents) if (e.alive && FOES.includes(e.t) && Math.abs(b.x - (e.x + 6)) < 9 && Math.abs(b.y - (e.y + 5)) < 9) { e.alive = false; b.d = 0; burst(e.x + 6, e.y + 5, "#ffd43b"); S.coins++; beep(300, .06); dropAmmo(e); } }
    S.bolts = S.bolts.filter(b => b.d > 0);
    /* entities */
    for (const e of S.ents) {
      if (!e.alive) continue;
      if (e.fall < 0) { e.fall = Math.min(0, e.fall + 5); e.y = e.y0 + e.fall; if (!e.fall) { burst(e.x + 6, e.y + 10, "#ced4da", 8); beep(160, .06); } continue; }
      if (e.t === "walker") {
        const nx = e.x + e.vx, c = Math.floor((e.vx < 0 ? nx : nx + 12) / TS), r = Math.floor((e.y + 10) / TS);
        if (solidAt(G, c, Math.floor((e.y + 4) / TS)) || !solidAt(G, c, r)) e.vx = -e.vx; else e.x = nx;
      }
      if (e.t === "drone") { e.ph += 0.05; e.x += Math.sin(e.ph * 0.6) * 0.8; e.y = e.y0 + Math.sin(e.ph) * 14; }
      if (e.t === "roller") {                                                  /* rolls fast, turns at edges and walls */
        if (!e.vr) e.vr = -(1.0 + 0.2 * S.G.world); const nx = e.x + e.vr, c = Math.floor((e.vr < 0 ? nx : nx + 12) / TS), rr = Math.floor((e.y + 10) / TS);
        if (solidAt(G, c, Math.floor((e.y + 4) / TS)) || !solidAt(G, c, rr)) e.vr = -e.vr; else e.x = nx; e.spin = (e.spin || 0) + e.vr * 0.3;
      }
      if (e.t === "hopper") {                                                  /* waits, then leaps towards you */
        e.st = (e.st || 0) + 1; const near = Math.abs(P.x - e.x) < 170;
        if (e.air) { e.vy += 0.3; e.x += e.vx; e.y += e.vy; const c = Math.floor((e.x + 6) / TS), rr = Math.floor((e.y + 10) / TS); if (e.vy > 0 && solidAt(G, c, rr)) { e.y = rr * TS - 10; e.air = false; e.st = 0; } if (solidAt(G, Math.floor((e.x + (e.vx > 0 ? 12 : 0)) / TS), Math.floor((e.y + 4) / TS))) e.vx = -e.vx; if (e.y > ROWS * TS) e.alive = false; }
        else if (near && e.st > 70 - 6 * S.G.world) { const d = Math.sign(P.x - e.x) || -1, c2 = Math.floor((e.x + 6 + d * 40) / TS); if (solidAt(G, c2, Math.floor((e.y + 14) / TS)) || solidAt(G, c2, Math.floor((e.y + 30) / TS))) { e.air = true; e.vy = -5; e.vx = d * 1.3; } else e.st = 40; }
      }
      if (e.t === "swooper") {                                                 /* hovers, dives when you pass below, climbs back */
        if (!e.mode) e.mode = "hover";
        if (e.mode === "hover") { e.ph += 0.04; e.x = e.x0 + Math.sin(e.ph) * 30; e.y = e.y0 + Math.sin(e.ph * 2) * 4; if (Math.abs(P.x - e.x) < 50 && P.y > e.y) { e.mode = "dive"; e.tx = P.x; e.ty = P.y; } }
        else if (e.mode === "dive") { const dx = e.tx - e.x, dy = e.ty - e.y, d = Math.hypot(dx, dy); if (d < 4) e.mode = "back"; else { e.x += dx / d * 2.6; e.y += dy / d * 2.6; } }
        else { const dx = e.x0 - e.x, dy = e.y0 - e.y, d = Math.hypot(dx, dy); if (d < 3) e.mode = "hover"; else { e.x += dx / d * 1.4; e.y += dy / d * 1.4; } }
      }
      const hitP = (w, h) => P.x < e.x + w && P.x + PH.w > e.x && P.y < e.y + h && P.y + PH.h > e.y;
      if (FOES.includes(e.t)) {
        if (hitP(12, 10)) {
          if (e.t !== "roller" && P.vy > 0.5 && P.y + PH.h - e.y < 9) { e.alive = false; P.vy = -4.5; burst(e.x + 6, e.y + 4, "#ffd43b"); S.coins++; beep(660, .06); msg("STOMP!", 30); dropAmmo(e); }
          else hurt({ walker: "Bumped by a crawler bot", drone: "Zapped by a drone", hopper: "A hopper bot landed on you", roller: "Spiky roller! Jump over it or blast it", swooper: "A swooper dived on you" }[e.t]);
        }
      } else if (e.t === "chest" && !e.opened && hitP(14, 12)) {
        e.opened = "asking"; S.paused = true; for (const k in KEYS) KEYS[k] = false;
        beep(660, .08, "triangle"); beep(880, .1, "triangle");
        const api = {
          open: lootKey => { if (!S) return null; e.opened = "open"; return Object.assign({ key: lootKey }, LOOT[lootKey], giveLoot(lootKey)); },
          lock: () => { if (S) { e.opened = "locked"; msg("The lock holds", 60, "#ffb3b3"); } },
          resume: () => { if (S) { S.paused = false; for (const k in KEYS) KEYS[k] = false; } } };
        if (S.opts.onChest) S.opts.onChest({ world: S.G.world, pick: pickLoot(), boss: !!e.boss }, api); else { api.lock(); api.resume(); }
      } else if (e.t === "coin" && hitP(8, 8)) { e.alive = false; S.coins++; beep(980, .04, "triangle", .03); }
      else if (e.t === "heart" && hitP(10, 10)) { e.alive = false; S.hearts = Math.min(6, S.hearts + 1); msg("+1 heart", 50, "#ff8787"); beep(760, .1, "triangle"); }
      else if (e.t === "ammo" && hitP(8, 12)) {
        e.alive = false; if (e.high) msg("A high bullet: the boots paid off!", 70, "#b197fc"); S.rounds++; S.got++; S.streak++; S.flash = 40; burst(e.x + 3, e.y + 4, "#ffd43b", 10); beep(880, .05, "triangle"); beep(1320, .07, "triangle");
        msg("+1 SNIPER ROUND", 50, "#ffd43b");
        if (S.streak % 3 === 0) { S.rounds++; msg(`BULLET STREAK x${S.streak}: +1 BONUS ROUND`, 80, "#ffa94d"); beep(1568, .12, "triangle"); }
      }
      else if (e.t === "crate" && hitP(12, 12)) { e.alive = false; const n = S.arena ? 5 : 3; S.ammo += n; msg(`+${n} blaster ammo`, 50, "#ffd43b"); beep(500, .06); }
      else if (e.t === "check" && !e.on && Math.abs(P.x - e.x) < 12) { e.on = true; S.check = { x: e.x + 2, y: e.y - PH.h }; msg("Checkpoint", 40, "#9be15d"); beep(540, .07, "triangle"); }
      else if (e.t === "gate" && !G.gateOpen[e.col] && Math.abs(P.x + PH.w - e.x) < 3 && S.t % 90 === 0) msg("Laser gate locked: clear the sentries from the nest (▼ / E)", 90, "#ffb3b3");
      else if (e.t === "goal" && Math.abs(P.x - e.x) < 12) { e.alive = false; msg("LEVEL CLEAR!", 120, "#9be15d"); beep(523, .1, "triangle"); beep(784, .2, "triangle"); end(true); return; }
    }
    /* shells from sentries left standing: they cover the stretch after their nest */
    for (const n of S.ents.filter(e => e.t === "nest" && !e.boss)) {
      const alive = n.sentries.gate ? 0 : n.sentries.list.filter(s => s.alive).length;
      if (!alive || S.P.inv > 0 || P.x < n.x - 6 * TS || P.x > n.x + 30 * TS) continue;
      n.shellT = (n.shellT || 0) + alive;
      if (n.shellT > 170) { n.shellT = 0; S.shells.push({ x: P.x + 5 + P.vx * 30, y: groundBelow(P.x + 5 + P.vx * 30), d: 70 }); }
    }
    for (const sh of S.shells) { sh.d--; if (sh.d === 0) { burst(sh.x, sh.y, "#ff922b", 14); beep(80, .2, "sawtooth"); if (Math.abs(P.x + 5 - sh.x) < 16 && Math.abs(P.y + PH.h - sh.y) < 24) hurt("Hit by a shell: clear the nest to stop them"); } }
    S.shells = S.shells.filter(s => s.d > 0);
    S.parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .15; p.d--; }); S.parts = S.parts.filter(p => p.d > 0);
    S.msgs.forEach(m => m.d--); S.msgs = S.msgs.filter(m => m.d > 0);
    S.cam = S.arena ? S.arena.L : Math.max(0, Math.min(G.cols * TS - VW, P.x - VW * 0.4));
  }
  const FOES = ["walker", "drone", "hopper", "roller", "swooper"];
  /* ---------- the boss: a giant golem in an arena one screen wide (our own design, drawn in code) ----------
     Classic-platformer rules: learn its moves, dodge them, and hit it when it is open.
     Stomp → a shockwave runs along the floor both ways (jump it), then its chest core glows open for a moment.
     Throw → fireballs lobbed at you. Roll → it curls into a ball and rolls to the far wall (get up on a ledge);
     it slams the wall and is dazed: its head is low enough to stomp (3 damage) and its core is open (blaster, 1 each).
     Each third of its health lost: it roars and a power crate falls (a bonus question for loot). */
  const BOSSES = [
    { name: "RUSTJAW", body: "#8c4a2f", dark: "#5c2e1c", light: "#c9733f", metal: "#868e96", eye: "#ffd43b", core: "#ff922b", crest: "horns" },
    { name: "FROSTGEAR", body: "#4d6f99", dark: "#2f4566", light: "#9cc3e8", metal: "#d0dbe8", eye: "#7fe3ff", core: "#99e9f2", crest: "icicles" },
    { name: "THORNBARK", body: "#5a4630", dark: "#3a2c1d", light: "#82a04a", metal: "#4b5d34", eye: "#a9e34b", core: "#d8f5a2", crest: "branches" },
    { name: "THE STORM WARDEN", body: "#4b2f6b", dark: "#2b1b40", light: "#9775fa", metal: "#ced4da", eye: "#ffec99", core: "#f3d9fa", crest: "bolt" }];
  const BW = 64, BH = 104;
  function startArena(a) {
    const w = S.G.world, info = BOSSES[w - 1], max = 8 + 3 * w;
    S.arena = { L: a.x, R: a.x + ARENA_W * TS, floor: a.y };
    S.boss = { x: a.x + ARENA_W * TS - BW - 40, drop: -260, vy: 0, hp: max, max, phase: 1, state: "intro", st: 0, face: -1, flash: 0, lift: 0, core: false, ball: false, spin: 0, sink: 0, cyc: 0, info, hint: 0 };
    S.waves = []; S.orbs = []; S.strikes = []; S.pops = []; S.supplyT = 0;
    S.check = { x: a.x + 3 * TS, y: a.y - PH.h };
    S.msgs = []; msg(`BOSS: ${info.name}!`, 150, "#ff6b6b"); beep(110, .4, "sawtooth", .06);
  }
  const bossCycle = (B, w) => B.phase === 1 ? ["stomp", "roll"] : B.phase === 2 ? (w === 4 ? ["stomp", "throw", "storm", "roll"] : ["stomp", "throw", "roll"]) : (w >= 2 ? ["throw", "stomp", "minions", "roll"] : ["throw", "stomp", "roll"]);
  const bossBox = B => { const kneel = B.state === "stun" || B.state === "rise", top = S.arena.floor - B.lift - (B.ball ? 40 : kneel ? 44 : BH); return { l: B.x + 4, r: B.x + BW - 4, top, bot: S.arena.floor - B.lift + (B.ball ? 0 : 0), kneel }; };
  function bossDamage(n, how) {
    const B = S.boss; if (!B || B.hp <= 0 || B.state === "roar" || B.state === "intro") return;
    B.hp = Math.max(0, B.hp - n); B.flash = 12; S.shake = Math.max(S.shake, n > 1 ? 10 : 4);
    S.pops.push({ x: B.x + BW / 2, y: bossBox(B).top - 6, text: n > 1 ? `STOMP! -${n}` : `-${n}`, c: n > 1 ? "#ffd43b" : "#fff", t: 0 });
    beep(n > 1 ? 180 : 320, .1, "square", .05); burst(B.x + BW / 2, bossBox(B).top + 20, B.info.core, n > 1 ? 18 : 8);
    if (B.hp <= 0) { B.state = "dying"; B.st = 0; B.ball = false; B.core = false; S.waves = []; S.orbs = []; S.strikes = []; S.ents.forEach(e => { if (FOES.includes(e.t)) e.alive = false; }); msg(`${B.info.name} IS FINISHED!`, 160, "#9be15d"); return; }
    const third = B.max / 3, phase = B.hp <= third ? 3 : B.hp <= 2 * third ? 2 : 1;
    if (phase > B.phase) { B.phase = phase; B.state = "roar"; B.st = 0; B.ball = false; B.core = false; B.lift = 0; powerCrate(); }
    else if (how === "stomp") { B.state = "rise"; B.st = 0; }
  }
  /* a power crate falls into the middle of the arena (a bonus question for loot), and blaster ammo on the side */
  function powerCrate() {
    const A = S.arena, c = (A.L + A.R) / 2 - 7;
    S.ents.push({ t: "chest", boss: true, x: c, y: A.floor - 12, y0: A.floor - 12, fall: -220, alive: true, i: S.ents.length, ph: 0 });
    dropCrate();
    msg(`${S.boss.info.name} ROARS! A POWER CRATE FALLS: answer its question for loot`, 170, "#ffd43b");
  }
  function dropCrate() { const A = S.arena, x = S.P.x < (A.L + A.R) / 2 ? A.L + 2 * TS : A.R - 3 * TS; S.ents.push({ t: "crate", x, y: A.floor - 12, y0: A.floor - 12, fall: -200, alive: true, i: S.ents.length, ph: 0 }); }
  function bossTick() {
    const B = S.boss, A = S.arena, P = S.P, w = S.G.world, fy = A.floor;
    B.st++; if (B.flash > 0) B.flash--;
    const toward = Math.sign(P.x + 5 - (B.x + BW / 2)) || -1;
    switch (B.state) {
      case "intro": B.vy += 0.5; B.drop = Math.min(0, B.drop + B.vy); if (B.drop === 0 && B.st > 5) { S.shake = 24; beep(70, .4, "sawtooth", .07); burst(B.x + BW / 2, fy, "#ced4da", 24); B.state = "roar0"; B.st = 0; } break;
      case "roar0": if (B.st === 1) msg(B.info.name + " ROARS!", 90, "#ff6b6b"); if (B.st > 70) { B.state = "idle"; B.st = 0; } break;
      case "roar": if (B.st === 1) { S.shake = 30; beep(90, .5, "sawtooth", .07); } if (B.st > 90) { B.state = "idle"; B.st = 0; } break;
      case "idle": {
        B.face = toward; const nx = B.x + toward * (0.35 + 0.1 * B.phase);
        if (Math.abs(P.x + 5 - (B.x + BW / 2)) > 50 && nx > A.L + 8 && nx + BW < A.R - 8) B.x = nx;
        if (B.st > 80 - 12 * B.phase - 4 * w) { const cyc = bossCycle(B, w); B.state = cyc[B.cyc++ % cyc.length]; B.st = 0; }
        break; }
      case "stomp":
        if (B.st <= 36) B.lift = Math.round(14 * Math.sin(B.st / 36 * Math.PI / 2));
        if (B.st === 37) { B.lift = 0; S.shake = 16; beep(70, .3, "sawtooth", .07); const v = 2.0 + 0.25 * w + 0.35 * (B.phase - 1); S.waves.push({ x: B.x + 6, dir: -1, v }, { x: B.x + BW - 6, dir: 1, v }); burst(B.x + BW / 2, fy, "#ced4da", 16); if (!S.tipWave) { S.tipWave = true; msg("SHOCKWAVE! Jump over it", 90, "#ffd43b"); } }
        if (B.st > 50) { B.state = "vent"; B.st = 0; B.ventFor = 80 - 6 * w; }
        break;
      case "vent": B.core = true; if (B.st === 2 && !S.tipCore) { S.tipCore = true; msg("Its core is glowing: BLAST IT (J)!", 100, "#ffd43b"); } if (B.st > B.ventFor) { B.core = false; B.state = "idle"; B.st = 0; } break;
      case "throw": {
        const n = 1 + B.phase + (w >= 3 ? 1 : 0);
        B.face = toward;
        if (B.st > 26 && (B.st - 26) % 20 === 0 && (B.st - 26) / 20 <= n) {
          const x0 = B.x + (B.face > 0 ? BW : 0), y0 = fy - BH - 6, T = 52 - 3 * w, tx = P.x + 5 + (Math.random() - 0.5) * 50 + P.vx * 20, ty = fy - 4, g = 0.2;
          S.orbs.push({ x: x0, y: y0, vx: (tx - x0) / T, vy: (ty - y0 - 0.5 * g * T * T) / T, g }); beep(240, .08, "triangle");
        }
        if (B.st > 26 + 20 * (n + 1)) { B.state = "vent"; B.st = 0; B.ventFor = 55 - 5 * w; }
        break; }
      case "roll":
        if (B.st === 1) { B.dir = B.x + BW / 2 > (A.L + A.R) / 2 ? -1 : 1; msg("IT'S CURLING UP: GET ON A LEDGE!", 90, "#ff6b6b"); beep(200, .2, "sawtooth"); }
        if (B.st > 30) B.ball = true;
        if (B.st > 62 - 3 * w) {
          B.x += B.dir * (3.0 + 0.35 * w + 0.4 * (B.phase - 1)); B.spin += B.dir * 0.25;
          if (B.x <= A.L + 22 || B.x + BW >= A.R - 22) { B.x = Math.max(A.L + 22, Math.min(A.R - 22 - BW, B.x)); B.ball = false; S.shake = 26; beep(60, .5, "sawtooth", .08); burst(B.dir < 0 ? A.L + 4 : A.R - 4, fy - 30, "#ced4da", 26); B.state = "stun"; B.st = 0; B.face = -B.dir; B.core = true; msg("IT'S DAZED: STOMP ITS HEAD or BLAST THE CORE!", 110, "#9be15d"); }
        }
        break;
      case "stun": B.core = true; if (B.st > 170 - 15 * w) { B.state = "rise"; B.st = 0; } break;
      case "rise": B.core = false; if (B.st > 22) { B.state = "idle"; B.st = 0; } break;
      case "minions": if (B.st === 10) { for (const fx of [A.L + 5 * TS, A.R - 6 * TS]) S.ents.push({ t: "hopper", x: fx, y: fy - 10 - 160, y0: fy - 10, air: true, vy: 0, vx: 0, alive: true, i: S.ents.length, ph: 0 }); msg("It calls in hopper bots!", 70, "#ffb3b3"); } if (B.st > 40) { B.state = "idle"; B.st = 0; } break;
      case "storm":
        if (B.st === 1) { S.strikes = [-60, 0, 60].map(d => ({ x: Math.max(A.L + 10, Math.min(A.R - 10, P.x + 5 + d)), t: 0 })); msg("Lightning marks: MOVE!", 70, "#ffec99"); }
        if (B.st > 80) { B.state = "vent"; B.st = 0; B.ventFor = 40; }
        break;
      case "dying": B.sink = Math.min(70, B.st * 0.45); S.shake = 6; if (B.st % 8 === 0) { burst(B.x + Math.random() * BW, fy - Math.random() * BH, B.st % 16 ? "#ffd43b" : B.info.core, 12); beep(80 + Math.random() * 200, .08, "square", .05); }
        if (B.st === 170) { msg("BOSS DEFEATED!", 120, "#9be15d"); beep(523, .12, "triangle"); beep(784, .3, "triangle"); }
        if (B.st > 190) { end(true); return; }
        break;
    }
    if (B.state === "dying" || B.state === "intro") return;
    /* hazards */
    for (const v of S.waves) { v.x += v.dir * v.v; if (P.ground && Math.abs(P.y + PH.h - fy) < 2 && Math.abs(P.x + 5 - v.x) < 8) hurt("The shockwave got you: JUMP over it"); }
    S.waves = S.waves.filter(v => v.x > A.L && v.x < A.R);
    for (const o of S.orbs) { o.x += o.vx; o.y += o.vy; o.vy += o.g; if (Math.abs(o.x - (P.x + 5)) < 8 && Math.abs(o.y - (P.y + 7)) < 10) { o.dead = true; hurt("Hit by a fireball"); } if (o.y >= fy - 3) { o.dead = true; burst(o.x, fy - 3, B.info.core, 10); beep(150, .08, "sawtooth"); } }
    S.orbs = S.orbs.filter(o => !o.dead);
    for (const k of S.strikes) { k.t++; if (k.t === 55) { S.shake = 8; beep(1200, .1, "sawtooth"); if (Math.abs(P.x + 5 - k.x) < 13) hurt("Struck by lightning"); } }
    S.strikes = S.strikes.filter(k => k.t < 70);
    /* touching the boss: a stomp on its head when it is dazed, otherwise it hurts */
    const b = bossBox(B), over = P.x + PH.w > b.l && P.x < b.r && P.y + PH.h > b.top && P.y < b.bot;
    if (over) {
      const onHead = b.kneel && B.state === "stun" && P.vy > 0.5 && P.y + PH.h - b.top < 14 && P.x + PH.w > B.x + 6 && P.x < B.x + BW - 6;
      if (onHead) { P.vy = -6.5; P.y = b.top - PH.h; bossDamage(3, "stomp"); }
      else if (P.inv === 0 && !S.invincible) { hurt(B.ball ? "Flattened by the rolling boss: get on a ledge!" : "You ran into the boss"); P.vx = (P.x + 5 < B.x + BW / 2 ? -1 : 1) * 3; P.vy = -3.5; }
    }
    /* never stuck: when the blaster is empty, ammo crates keep falling */
    if (S.ammo <= 0 && !S.ents.some(e => e.t === "crate" && e.alive)) { if (++S.supplyT > 300) { S.supplyT = 0; dropCrate(); msg("A crate of blaster ammo drops in", 80, "#ffd43b"); } } else S.supplyT = 0;
  }
  /* a blaster bolt reaching the boss: damage when the core glows, a clang when it is shut */
  function boltBoss(bt) {
    const B = S.boss; if (!B || B.hp <= 0 || B.state === "intro" || B.state === "dying") return false;
    const b = bossBox(B); if (!(bt.x > b.l && bt.x < b.r && bt.y > b.top && bt.y < b.bot)) return false;
    const coreTop = b.kneel ? S.arena.floor - 50 : S.arena.floor - B.lift - 80, coreBot = b.kneel ? S.arena.floor - 2 : S.arena.floor - B.lift - 36;
    if (B.core && bt.y >= coreTop && bt.y <= coreBot) bossDamage(1, "bolt");
    else { burst(bt.x, bt.y, "#ced4da", 4); beep(1400, .03, "square", .02); if (++B.hint % 4 === 1) msg(B.core ? "Aim for the glowing core: jump, or shoot from a ledge" : "CLANG! Wait for the core to glow", 70, "#ced4da"); }
    return true;
  }
  function drawBoss(ctx, ox) {
    const B = S.boss, A = S.arena, fy = A.floor, k = B.info, w = S.G.world;
    const fl = B.flash > 0 && B.flash % 4 < 2, C = c => fl ? "#ffffff" : c;
    const bx = Math.round(B.x) + ox, by = fy + Math.round(B.drop) - B.lift + Math.round(B.sink);
    const R = (x, y, ww, hh, c) => { ctx.fillStyle = C(c); ctx.fillRect(bx + x, by + y, ww, hh); };
    ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.fillRect(bx - 6, fy - 3, BW + 12, 4);
    if (B.ball) {
      const cx = bx + 32, cy = fy - 20, rr = 21;
      ctx.fillStyle = C("#1b1b2f"); ctx.beginPath(); ctx.arc(cx, cy, rr + 2, 0, 7); ctx.fill();
      ctx.fillStyle = C(k.body); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fill();
      ctx.strokeStyle = C(k.dark); ctx.lineWidth = 3; for (let i = 0; i < 4; i++) { const a = B.spin + i * Math.PI / 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); ctx.stroke(); }
      ctx.fillStyle = C(k.metal); for (let i = 0; i < 8; i++) { const a = B.spin + i * Math.PI / 4; ctx.fillRect(Math.round(cx + Math.cos(a) * (rr + 3)) - 2, Math.round(cy + Math.sin(a) * (rr + 3)) - 2, 4, 4); }
      ctx.fillStyle = C(k.eye); ctx.fillRect(cx - 4, cy - 3, 8, 4);
      return;
    }
    if (w >= 3) { const g = ctx.createRadialGradient(bx + 32, by - 60, 10, bx + 32, by - 60, 90); g.addColorStop(0, "rgba(255,255,255,.22)"); g.addColorStop(1, "rgba(255,255,255,0)"); ctx.fillStyle = g; ctx.fillRect(bx - 60, by - 160, BW + 120, 170); }   /* a backlight on the night worlds */
    const kneel = B.state === "stun" || B.state === "rise", dy = kneel ? 40 : 0, raise = B.state === "throw" && B.st > 10;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, VW, fy); ctx.clip();          /* sinking to its knees: the floor hides the legs */
    /* legs and feet */
    if (kneel) { R(4, -14, 24, 14, k.dark); R(36, -14, 24, 14, k.dark); }
    else { R(8, -30, 18, 30, k.dark); R(38, -30, 18, 30, k.dark); R(4, -8, 26, 8, "#1b1b2f"); R(34, -8, 26, 8, "#1b1b2f"); R(10, -28, 14, 3, k.body); R(40, -28, 14, 3, k.body); }
    /* torso */
    R(0, -80 + dy, 64, 54, "#1b1b2f"); R(2, -78 + dy, 60, 50, k.body); R(2, -78 + dy, 60, 6, k.light); R(2, -34 + dy, 60, 6, k.dark);
    for (let i = 0; i < 4; i++) R(6 + i * 16, -76 + dy, 3, 3, k.metal);
    /* the core: glowing and pulsing when open, a shut grate when not */
    const cx = 32, cy = -56 + dy;
    if (B.core) { const pul = 2 + Math.round(2 * Math.sin(S.t / 3)); ctx.fillStyle = fl ? "#fff" : `rgba(255,255,255,.35)`; ctx.beginPath(); ctx.arc(bx + cx, by + cy, 14 + pul, 0, 7); ctx.fill(); R(cx - 11, cy - 11, 22, 22, "#1b1b2f"); R(cx - 9, cy - 9, 18, 18, k.core); R(cx - 4, cy - 4, 8, 8, "#fff"); }
    else { R(cx - 11, cy - 11, 22, 22, "#1b1b2f"); R(cx - 9, cy - 9, 18, 18, k.metal); for (let i = 0; i < 3; i++) R(cx - 9, cy - 6 + i * 6, 18, 2, k.dark); }
    /* shoulders and arms */
    R(-10, -84 + dy, 20, 18, "#1b1b2f"); R(-9, -83 + dy, 18, 16, k.metal); R(54, -84 + dy, 20, 18, "#1b1b2f"); R(55, -83 + dy, 18, 16, k.metal);
    R(-3, -80 + dy, 3, 3, k.dark); R(64, -80 + dy, 3, 3, k.dark);
    R(-6, -66 + dy, 12, 38, k.body); R(-9, -30 + dy, 18, 14, k.dark);
    const throwSide = B.face > 0;
    if (raise && throwSide) { R(58, -118 + dy, 12, 40, k.body); R(55, -130 + dy, 18, 14, k.dark); ctx.fillStyle = C(k.core); ctx.beginPath(); ctx.arc(bx + 64, by - 136 + dy, 6 + Math.abs(Math.sin(S.t / 4)) * 2, 0, 7); ctx.fill(); }
    else R(58, -66 + dy, 12, 38, k.body);
    if (!(raise && throwSide)) R(55, -30 + dy, 18, 14, k.dark);
    if (raise && !throwSide) { R(-6, -118 + dy, 12, 40, k.body); R(-9, -130 + dy, 18, 14, k.dark); ctx.fillStyle = C(k.core); ctx.beginPath(); ctx.arc(bx, by - 136 + dy, 6 + Math.abs(Math.sin(S.t / 4)) * 2, 0, 7); ctx.fill(); }
    /* head: a heavy helm with one wide glowing visor; the glow follows you. Dazed, it slumps forward onto its chest */
    const hdy = kneel ? dy + 22 : dy, hx = kneel ? B.face * 22 : 0;
    { const R0 = R; const R2 = (x, y, ww, hh, c) => R0(x + hx, y + hdy, ww, hh, c); drawHead(R2, kneel); }
    ctx.restore();
    /* dazed: spinning stars over the head */
    if (B.state === "stun") for (let i = 0; i < 3; i++) { const a = S.t / 9 + i * 2.1, sx = bx + 32 + hx + Math.cos(a) * 20, sy = by - 92 + hdy + Math.sin(a) * 4; ctx.fillStyle = "#ffd43b"; ctx.fillRect(sx - 1, sy - 4, 3, 8); ctx.fillRect(sx - 4, sy - 1, 8, 3); }
    /* telegraphs */
    if (B.state === "roll" && B.st <= 30) { R(-2, -84 + dy, 68, 4, "#ff6b6b"); txt(ctx, "!", bx + 32, by - 120, 18, "#ff3b3b"); }
    if (B.state === "stomp" && B.st < 37) txt(ctx, "▼", bx + 32, by - 116, 12, "#ffd43b");
  }
  function drawHead(R, kneel) {
    const B = S.boss, k = B.info, dy = 0;
    R(14, -106 + dy, 36, 28, "#1b1b2f"); R(16, -104 + dy, 32, 24, k.body); R(16, -104 + dy, 32, 6, k.dark);
    R(20, -95 + dy, 24, 7, "#1b1b2f"); const px = Math.max(0, Math.min(16, Math.round(8 + 8 * Math.sign(S.P.x - B.x - 32)))); R(21, -94 + dy, 22, 5, kneel ? "#495057" : k.eye); R(21 + px, -94 + dy, 6, 5, kneel ? "#868e96" : "#fff");
    R(20, -84 + dy, 24, 5, k.dark); for (let i = 0; i < 5; i++) R(22 + i * 5, -84 + dy, 2, 2, k.metal);
    if (k.crest === "horns") { R(10, -114 + dy, 6, 12, k.light); R(6, -120 + dy, 6, 8, k.light); R(48, -114 + dy, 6, 12, k.light); R(52, -120 + dy, 6, 8, k.light); }
    if (k.crest === "icicles") for (let i = 0; i < 5; i++) R(18 + i * 6, -112 - (i % 2) * 6 + dy, 4, 8 + (i % 2) * 6, k.light);
    if (k.crest === "branches") { R(18, -116 + dy, 3, 12, k.dark); R(12, -120 + dy, 10, 4, k.light); R(43, -116 + dy, 3, 12, k.dark); R(42, -122 + dy, 12, 4, k.light); R(30, -114 + dy, 4, 10, k.light); }
    if (k.crest === "bolt") { R(28, -124 + dy, 6, 8, k.eye); R(24, -118 + dy, 6, 6, k.eye); R(30, -114 + dy, 6, 8, k.eye); }
  }
  function drawArena(ctx, ox) {
    const A = S.arena, fy = A.floor, k = S.boss.info;
    /* pillars that close the arena */
    for (const px of [A.L, A.R - 10]) { ctx.fillStyle = "#1b1b2f"; ctx.fillRect(px + ox - 1, 0, 12, fy); ctx.fillStyle = k.dark; ctx.fillRect(px + ox, 0, 10, fy); ctx.fillStyle = k.light; for (let y = 8; y < fy; y += 24) ctx.fillRect(px + ox + 2, y, 6, 3); }
    for (const v of S.waves) { const x = Math.round(v.x) + ox; ctx.fillStyle = "#ced4da"; ctx.fillRect(x - 6, fy - 6, 12, 6); ctx.fillStyle = "#fff"; ctx.fillRect(x - 3, fy - 11, 6, 5); ctx.fillStyle = "rgba(206,212,218,.5)"; ctx.fillRect(x - 6 - v.dir * 10, fy - 3, 10, 3); }
    for (const o of S.orbs) { const x = Math.round(o.x) + ox, y = Math.round(o.y); ctx.fillStyle = "#1b1b2f"; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); ctx.fillStyle = k.core; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.fillRect(x - 1, y - 2, 3, 3); }
    for (const s of S.strikes) { const x = Math.round(s.x) + ox; if (s.t < 55) { ctx.fillStyle = s.t % 10 < 5 ? "#ffec99" : "#ff6b6b"; ctx.fillRect(x - 12, fy - 2, 24, 2); txt(ctx, "⚡", x, fy - 8, 10, "#ffec99"); } else { ctx.fillStyle = "rgba(255,236,153,.9)"; for (let y = 0; y < fy; y += 12) ctx.fillRect(x - 3 + ((y / 12) % 2) * 4, y, 4, 12); } }
  }
  function bossBar(ctx) {
    const B = S.boss; if (!B || B.state === "intro" && B.drop < -100) return;
    const w = 220, x = (VW - w) / 2, y = 22;
    ctx.fillStyle = "rgba(10,12,30,.7)"; ctx.fillRect(x - 4, y - 2, w + 8, 20);
    txt(ctx, B.info.name, VW / 2, y + 8, 8, "#fff");
    ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x, y + 11, w, 6); ctx.fillStyle = "#e03131"; ctx.fillRect(x, y + 11, Math.round(w * B.hp / B.max), 6);
    ctx.fillStyle = "#fff"; for (const f of [1 / 3, 2 / 3]) ctx.fillRect(x + Math.round(w * f), y + 11, 1, 6);
    for (const p of S.pops) { p.t++; txt(ctx, p.text, p.x + Math.round(S.camOx || 0), p.y - p.t * 0.6, 12, p.c); } S.pops = S.pops.filter(p => p.t < 50);
  }

  /* chest loot: something useful that you don't already have, most useful first */
  const LOOT = {
    med: { name: "Med kit", icon: "❤", what: "+1 heart" }, shield: { name: "Shield", icon: "◆", what: "blocks the next hit" },
    ammo: { name: "Sniper ammo box", icon: "◎", what: "+3 sniper rounds" }, boots: { name: "Double-jump boots", icon: "⤒", what: "press jump again in mid-air (for the rest of this level)" },
    steady: { name: "Steady scope", icon: "〰", what: "half the scope sway (for the rest of this level)" }, blaster: { name: "Blaster pack", icon: "✦", what: "+6 blaster shots" } };
  function pickLoot() {
    const k = S.kit, list = [];
    if (!k.boots) list.push("boots"); if (!S.shield) list.push("shield"); if (S.hearts < 4) list.push("med"); if (!k.steady) list.push("steady");
    list.push("ammo", "med", "blaster");
    return list[Math.floor(Math.random() * Math.min(3, list.length))];
  }
  function giveLoot(key) {
    const L = LOOT[key], before = { med: S.hearts, ammo: S.rounds, blaster: S.ammo }[key];
    if (key === "med") S.hearts = Math.min(8, S.hearts + 1); if (key === "shield") S.shield = 1; if (key === "ammo") S.rounds += 3; if (key === "blaster") S.ammo += 6;
    if (key === "boots") { S.kit.boots = true; S.P.boots = true; } if (key === "steady") S.kit.steady = true;
    msg(`${L.icon} ${L.name}: ${L.what}`, 140, "#ffd43b"); beep(784, .1, "triangle"); beep(1175, .15, "triangle"); burst(S.P.x + 5, S.P.y, "#ffd43b", 16);
    return { before, after: { med: S.hearts, ammo: S.rounds, blaster: S.ammo }[key] };
  }
  /* the ridge report: how this nest went, and whether it is a best */
  function cardFor(ss) {
    const st = ss.stat, acc = st.shots ? Math.round(100 * st.hits / st.shots) : 0;
    const ridgeBest = S.opts.bestRidge || 0, isBest = st.score > ridgeBest && st.score > 0;
    if (isBest) { S.newRidgeBest = st.score; beep(523, .1, "triangle"); beep(659, .1, "triangle"); beep(1046, .25, "triangle"); }
    const m = mood(Object.assign({}, st, { acc, gate: ss.gate, min: ss.min }));
    const c = Object.assign({}, st, { acc, isBest, ridgeBest, t: 0, mood: m, gate: ss.gate, min: ss.min, roast: pickOne(ROASTS[m]) });
    cardOut("report", c);
    return c;
  }
  function closeCard() { const ss = S.scope.nest.sentries; S.scope = null; ss.card = null; cardOut(null); if (!ss.gate) msg("The gate is still shut: come back with more rounds", 120, "#ffb3b3"); }
  /* the level's sniper totals, added up from every nest once at the end (so nothing is counted twice) */
  function snipeTotals() {
    const t = { score: 0, ko: 0, head: 0, shots: 0, hits: 0, best: 0, first: 0, ridgeMax: 0 };
    for (const n of S.ents.filter(e => e.t === "nest")) { const st = n.sentries.stat; for (const k of ["score", "ko", "head", "shots", "hits", "first", "veh"]) t[k] = (t[k] || 0) + (st[k] || 0); t.best = Math.max(t.best, st.best); t.ridgeMax = Math.max(t.ridgeMax, st.score); }
    return t;
  }
  /* the commentator: a playful roast after every ridge, whether it went badly or well */
  const ROASTS = {
    none: ["You didn't fire a single shot. Very peaceful. Very strange.", "Zero shots. Are you a sniper or a bird-watcher?", "The rifle wants to know if it did something wrong."],
    zero: ["Zero hits! The sentries are still laughing. Were you aiming at the clouds?", "Not one hit. The rocks say thanks for leaving them alone.", "Your bullets went on a holiday. Nobody knows where.", "Missed them all! Even the sentries felt sorry for you."],
    shut: ["The gate's still shut and the sentries are doing a happy dance.", "Not enough knockouts to open the gate. The sentries say 'nice try, kiddo'."],
    bad: ["That aim was so wobbly the scope got seasick.", "You hit more rocks than a landslide does.", "The sentries asked if you were shooting with your eyes shut.", "Some hits! Mostly misses. The misses are winning."],
    ok: ["Half hits, half misses. Perfectly... medium.", "Not bad! Not great either. A solid 'meh' from the sentries.", "Some of your shots hit. The others are still flying somewhere."],
    good: ["Okay, okay, you're good. Don't let it go to your head (your bullets did).", "Sharp shooting! The sentries want a rematch. And a hug.", "Nice! Your teacher would give that a sticker. A small one."],
    veh: ["You knocked things out of the SKY. The pilots would like a word.", "Planes, choppers, tanks... is there anything you won't shoot?", "That tank had a very bad day. You're welcome, sentries."],
    heads: ["So many headshots the sentries are ordering bigger helmets.", "Headshot after headshot. The helmet shop is sold out."],
    perfect: ["Every shot hit! Did you bribe the sentries?", "100% accuracy. Now try being this accurate with your spelling.", "Perfect aim. The sentries have filed a complaint. It was ignored."] };
  const pickOne = a => a[Math.floor(Math.random() * a.length)];
  /* which kind of roast fits (the page shows a matching emoji) */
  function mood(st) {
    if (!st.shots) return "none";
    if (!st.hits) return "zero";
    if (st.gate === false && st.ko < st.min) return "shut";
    if (st.acc >= 100 && st.hits >= 3) return "perfect";
    if ((st.veh || 0) >= 2) return "veh";
    if (st.head >= 3 && st.head >= st.ko / 2) return "heads";
    return st.acc < 35 ? "bad" : st.acc < 65 ? "ok" : "good";
  }
  function roast(st) { return pickOne(ROASTS[mood(st)]); }
  /* wrapped, centred text on the canvas */
  function wrap(ctx, s, cx, y, w, size, c) {
    ctx.font = `bold ${size}px "Courier New", monospace`; const words = s.split(" "), lines = []; let line = "";
    for (const wd of words) { const t2 = line ? line + " " + wd : wd; if (ctx.measureText(t2).width > w && line) { lines.push(line); line = wd; } else line = t2; }
    lines.push(line); lines.slice(0, 2).forEach((l, i) => txt(ctx, l, cx, y + i * (size + 2) - (lines.length > 1 ? 5 : 0), size, c));
  }
  function drawCard(ctx, c) {
    if (S.opts.onCard) { c.t++; return dimOnly(ctx, c.t, 12); }
    c.t++; const g = Math.min(1, c.t / 12);
    ctx.fillStyle = `rgba(5,8,20,${0.8 * g})`; ctx.fillRect(0, 0, VW, VH);
    ctx.save(); ctx.translate(VW / 2, VH / 2); ctx.scale(0.6 + 0.4 * g, 0.6 + 0.4 * g); ctx.translate(-VW / 2, -VH / 2);
    ctx.fillStyle = "#1b1b2f"; ctx.fillRect(86, 34, 308, 206); ctx.fillStyle = "#2c335c"; ctx.fillRect(90, 38, 300, 198); ctx.fillStyle = "#ffd43b"; ctx.fillRect(90, 38, 300, 22);
    txt(ctx, "RIDGE REPORT", VW / 2, 54, 12, "#1b1b2f");
    const rows = [["KNOCKED OUT", c.ko], ["HEADSHOTS", c.head], ["VEHICLES + SKY SHOTS", c.veh || 0], ["SHOT FIRST", c.first], ["ACCURACY", c.acc + "%"], ["BEST STREAK", c.best]];
    rows.forEach(([k, v], i) => { const show = c.t > 10 + i * 7; if (!show) return; txt(ctx, k, 110, 72 + i * 12, 9, "#ced4da", "left"); txt(ctx, String(v), 370, 72 + i * 12, 10, "#fff", "right"); });
    if (c.t > 56) { txt(ctx, "SCORE", 110, 150, 11, "#ffd43b", "left"); txt(ctx, String(Math.min(c.score, Math.round(c.score * (c.t - 56) / 20))), 370, 152, 15, "#ffd43b", "right"); }
    if (c.t > 66) { if (c.isBest) txt(ctx, c.t % 20 < 12 ? "NEW HIGH SCORE!" : "", VW / 2, 168, 12, "#ff922b"); else txt(ctx, `BEST ON THIS LEVEL: ${c.ridgeBest}`, VW / 2, 167, 8, "#adb5bd"); }
    /* the commentator has something to say (playfully) */
    if (c.t > 76) { const g2 = Math.min(1, (c.t - 76) / 8); ctx.globalAlpha = g2; ctx.fillStyle = "#ffd43b"; ctx.fillRect(100, 176, 280, 40); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(102, 178, 276, 36);
      wrap(ctx, c.roast, VW / 2, 192, 260, 10, "#fff3bf"); ctx.globalAlpha = 1; }
    if (c.t > 20) txt(ctx, "Press SPACE to carry on", VW / 2, 230, 9, S.t % 40 < 26 ? "#fff" : "#868e96");
    ctx.restore();
  }
  /* every second beaten bot drops a bullet (the drop is decided by the bot, so it is the same each play) */
  function dropAmmo(e) { if (e.i % 2) return; const x = e.x + 3; S.ents.push({ t: "ammo", x, y: groundBelow(x) - 12, alive: true, i: S.ents.length, ph: 0 }); S.totalAmmo++; msg("It dropped a bullet!", 50, "#ffd43b"); }
  const groundBelow = x => { const c = Math.floor(x / TS); for (let r = 0; r < ROWS; r++) if (solidAt(S.G, c, r)) return r * TS; return ROWS * TS; };

  /* ---------- drawing ---------- */
  function draw() {
    if (!S) return; const { ctx, G } = S, th = G.theme;
    if (S.scope) return drawScope();
    ctx.save(); if (S.shake > 0) ctx.translate(Math.round((Math.random() - .5) * S.shake), Math.round((Math.random() - .5) * S.shake));
    const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    if (G.world === 3) { ctx.fillStyle = "#f8f3d0"; ctx.fillRect(390, 30, 18, 18); ctx.fillStyle = th.sky[0]; ctx.fillRect(396, 28, 14, 14); for (let i = 0; i < 30; i++) { ctx.fillStyle = "#fff"; ctx.fillRect((i * 97 + 13) % VW, (i * 53) % 120, 1, 1); } }
    if (G.world === 4 && S.t % 240 < 4) { ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(0, 0, VW, VH); }
    const hills = (col, par, h, amp, f) => { ctx.fillStyle = col; for (let x = 0; x < VW; x += 4) { const wx = x + S.cam * par; const y = h + Math.round(amp * Math.sin(wx / f) + amp * 0.5 * Math.sin(wx / (f * 0.37))); ctx.fillRect(x, y, 4, VH - y); } };
    hills(th.far, 0.2, 150, 26, 70); hills(th.mid, 0.45, 190, 18, 45);
    const c0 = Math.floor(S.cam / TS), c1 = c0 + Math.ceil(VW / TS) + 1, ox = -Math.round(S.cam);
    for (let c = c0; c <= c1 && c < G.cols; c++) for (let r = 0; r < ROWS; r++) {
      const t = G.map[r][c], x = c * TS + ox, y = r * TS;
      if (t === 1) { const top = r === 0 || (G.map[r - 1][c] !== 1 && G.map[r - 1][c] !== 5); ctx.fillStyle = (c + r) % 2 ? th.dirt : th.dirt2; ctx.fillRect(x, y, TS, TS); if (top) { ctx.fillStyle = th.top; ctx.fillRect(x, y, TS, 4); ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(x, y + 4, TS, 1); } ctx.fillStyle = "rgba(0,0,0,.12)"; ctx.fillRect(x + 3 + (c * 7 + r * 3) % 9, y + 7, 2, 2); }
      else if (t === 2) { ctx.fillStyle = th.block; ctx.fillRect(x, y, TS, TS); ctx.fillStyle = "rgba(255,255,255,.25)"; ctx.fillRect(x, y, TS, 2); ctx.fillStyle = "rgba(0,0,0,.3)"; ctx.fillRect(x, y + TS - 2, TS, 2); ctx.fillRect(x + 7, y + 2, 2, TS - 4); }
      else if (t === 5) { ctx.fillStyle = (c + r) % 2 ? th.dirt : th.dirt2; ctx.fillRect(x, y, TS, TS); ctx.fillStyle = th.top; ctx.fillRect(x, y, TS, 2); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 1, y + 1, TS - 2, 6); ctx.fillStyle = "#ff6b6b"; ctx.fillRect(x + 2, y + 2, TS - 4, 4); ctx.fillStyle = "#ced4da"; for (let k = 0; k < 3; k++) ctx.fillRect(x + 3 + k * 4, y + 6, 2, 4); }
      else if (t === 6) { const key = c + "," + r; if (!(G.broken && G.broken[key])) { const sh = G.crumbT && G.crumbT[key] > 8 ? Math.round((Math.random() - .5) * 2) : 0; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + sh, y, TS, 7); ctx.fillStyle = "#b08050"; ctx.fillRect(x + 1 + sh, y + 1, TS - 2, 5); ctx.fillStyle = "#7a5230"; ctx.fillRect(x + 5 + sh, y + 1, 1, 5); ctx.fillRect(x + 10 + sh, y + 3, 1, 3); ctx.fillStyle = "#5a3a22"; ctx.fillRect(x + 3, y + 7, 2, 5); ctx.fillRect(x + 11, y + 7, 2, 5); } }
      else if (t === 3) { ctx.fillStyle = "#d3d9e3"; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x + k * 4, y + TS); ctx.lineTo(x + k * 4 + 2, y + 6); ctx.lineTo(x + k * 4 + 4, y + TS); ctx.fill(); } }
    }
    for (const e of S.ents) {
      if (!e.alive) continue; const x = Math.round(e.x) + ox, y = Math.round(e.y);
      if (x < -40 || x > VW + 40) continue;
      if (e.t === "mover") { const w2 = e.wd; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1, w2 + 2, 9); ctx.fillStyle = th.block; ctx.fillRect(x, y, w2, 7); ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(x, y, w2, 2); ctx.fillStyle = "#ffd43b"; for (let k = 4; k < w2 - 4; k += 8) ctx.fillRect(x + k, y + 3, 4, 2); continue; }
      if (e.t === "coin") { const w = 2 + Math.abs(Math.round(3 * Math.sin(S.t / 8 + e.i))); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 4 - w, y, w * 2, 8); ctx.fillStyle = "#e67700"; ctx.fillRect(x + 4 - w, y + 7, w * 2, 1); }
      else if (e.t === "walker") { const f = Math.floor(S.t / 8) % 2; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1, 14, 10); ctx.fillStyle = "#8a6a4a"; ctx.fillRect(x, y, 12, 8); ctx.fillStyle = "#b08a62"; ctx.fillRect(x + 1, y, 10, 2); ctx.fillStyle = "#fff"; ctx.fillRect(x + (e.vx < 0 ? 2 : 7), y + 3, 3, 3); ctx.fillStyle = "#e03131"; ctx.fillRect(x + (e.vx < 0 ? 3 : 8), y + 4, 1, 1); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 1 + f * 2, y + 8, 3, 2); ctx.fillRect(x + 8 - f * 2, y + 8, 3, 2); }
      else if (e.t === "hopper") { const sq = e.air ? 0 : Math.max(0, 3 - Math.floor((70 - (e.st || 0)) / 8)); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1 + sq, 14, 11 - sq); ctx.fillStyle = "#2f9e44"; ctx.fillRect(x, y + sq, 12, 9 - sq); ctx.fillStyle = "#8ce99a"; ctx.fillRect(x + 1, y + sq, 10, 2); ctx.fillStyle = "#fff"; ctx.fillRect(x + 2, y + 2 + sq, 3, 3); ctx.fillRect(x + 7, y + 2 + sq, 3, 3); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 3, y + 3 + sq, 1, 1); ctx.fillRect(x + 8, y + 3 + sq, 1, 1); ctx.fillRect(x, y + 9, 4, 1); ctx.fillRect(x + 8, y + 9, 4, 1); }
      else if (e.t === "roller") { const a = e.spin || 0; ctx.fillStyle = "#1b1b2f"; ctx.beginPath(); ctx.arc(x + 6, y + 5, 6.5, 0, 7); ctx.fill(); ctx.fillStyle = "#868e96"; ctx.beginPath(); ctx.arc(x + 6, y + 5, 5, 0, 7); ctx.fill(); ctx.fillStyle = "#e9ecef"; for (let i = 0; i < 6; i++) { const an = a + i * Math.PI / 3; ctx.fillRect(Math.round(x + 6 + Math.cos(an) * 7) - 1, Math.round(y + 5 + Math.sin(an) * 7) - 1, 2, 2); } ctx.fillStyle = "#e03131"; ctx.fillRect(x + 5, y + 4, 2, 2); }
      else if (e.t === "swooper") { const f = S.t % 10 < 5, dive = e.mode === "dive"; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 2, y + 2, 9, 6); ctx.fillStyle = "#5f3dc4"; ctx.fillRect(x + 3, y + 3, 7, 4); ctx.fillStyle = "#b197fc"; if (dive) { ctx.fillRect(x, y, 3, 3); ctx.fillRect(x + 10, y, 3, 3); } else { ctx.fillRect(x - 3, f ? y : y + 4, 5, 2); ctx.fillRect(x + 11, f ? y : y + 4, 5, 2); } ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 5, y + 7, 3, 2); ctx.fillStyle = "#fff"; ctx.fillRect(x + 4, y + 4, 1, 1); ctx.fillRect(x + 8, y + 4, 1, 1); }
      else if (e.t === "chest") { const open = e.opened === "open", locked = e.opened === "locked", bob = e.opened ? 0 : Math.round(Math.sin(S.t / 10)); ctx.fillStyle = `rgba(255,212,59,${e.opened ? 0 : 0.3 + 0.2 * Math.sin(S.t / 7)})`; ctx.fillRect(x - 3, y - 4 + bob, 20, 18); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1 + bob, 16, 13); ctx.fillStyle = locked ? "#495057" : "#a0522d"; ctx.fillRect(x, y + 4 + bob, 14, 7); ctx.fillStyle = locked ? "#6c757d" : "#c97a3e"; ctx.fillRect(x, open ? y - 4 : y + bob, 14, 4); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 6, y + 3 + bob, 2, 3); if (open) { ctx.fillStyle = "#fff3bf"; ctx.fillRect(x + 3, y + 1, 8, 3); } if (!e.opened && Math.abs(S.P.x - e.x) < 60) txt(ctx, e.boss ? "POWER CRATE!" : "TREASURE!", x + 7, y - 10, 7, "#ffd43b"); }
      else if (e.t === "drone") { const f = S.t % 6 < 3; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y + 2, 14, 7); ctx.fillStyle = "#c92a2a"; ctx.fillRect(x, y + 3, 12, 5); ctx.fillStyle = "#ffec99"; ctx.fillRect(x + 5, y + 4, 2, 2); ctx.fillStyle = "#adb5bd"; ctx.fillRect(f ? x - 2 : x, y, f ? 6 : 3, 1); ctx.fillRect(f ? x + 8 : x + 10, y, f ? 6 : 3, 1); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 1, y + 1, 1, 2); ctx.fillRect(x + 10, y + 1, 1, 2); }
      else if (e.t === "heart") { ctx.fillStyle = "#ff6b6b"; ctx.fillRect(x + 1, y + 2, 3, 3); ctx.fillRect(x + 6, y + 2, 3, 3); ctx.fillRect(x, y + 3, 10, 3); ctx.fillRect(x + 2, y + 6, 6, 2); ctx.fillRect(x + 4, y + 8, 2, 1); }
      else if (e.t === "ammo") { if (e.high) { ctx.fillStyle = "rgba(177,151,252,.35)"; ctx.fillRect(x - 5, y - 5, 17, 21); }
        const b = Math.round(2 * Math.sin(S.t / 9 + e.i)), gl = 0.35 + 0.25 * Math.sin(S.t / 6 + e.i); ctx.fillStyle = `rgba(255,212,59,${gl})`; ctx.fillRect(x - 3, y - 3 + b, 13, 17); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x, y - 1 + b, 7, 12); ctx.fillStyle = "#e8a33d"; ctx.fillRect(x + 1, y + 4 + b, 5, 6); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 1, y + 4 + b, 2, 6); ctx.fillStyle = "#adb5bd"; ctx.fillRect(x + 2, y + b, 3, 4); ctx.fillStyle = "#e9ecef"; ctx.fillRect(x + 2, y + b, 1, 3); }
      else if (e.t === "sign") { const n = S.ents.find(q => q.t === "nest" && q.id === e.nest), left = n && !n.sentries.gate ? n.sentries.min : 0; ctx.fillStyle = "#5a3a22"; ctx.fillRect(x + 10, y - 20, 3, 20); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 15, y - 44, 54, 25); ctx.fillStyle = left ? "#ffd43b" : "#8ce99a"; ctx.fillRect(x - 14, y - 43, 52, 23); txt(ctx, left ? "SNIPER NEST" : "GATE OPEN", x + 12, y - 34, 7, "#1b1b2f"); if (left) txt(ctx, `${left} KO FOR GATE`, x + 12, y - 24, 7, "#c92a2a"); }
      else if (e.t === "crate") { ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, y - 1, 14, 14); ctx.fillStyle = "#c97a3e"; ctx.fillRect(x, y, 12, 12); ctx.fillStyle = "#ffd43b"; ctx.fillRect(x + 3, y + 4, 6, 4); }
      else if (e.t === "check") { ctx.fillStyle = "#5a3a22"; ctx.fillRect(x, y - 30, 2, 30); ctx.fillStyle = e.on ? "#40c057" : "#adb5bd"; ctx.fillRect(x + 2, y - 30, 12, 8); }
      else if (e.t === "gate") { if (!S.G.gateOpen[e.col]) { ctx.fillStyle = "#495057"; ctx.fillRect(x - 2, 0, 20, 6); ctx.fillRect(x - 2, y - 4, 20, 4); for (let k = 0; k < 3; k++) { ctx.fillStyle = (S.t + k * 5) % 14 < 7 ? "#ff3b3b" : "#ff8787"; ctx.fillRect(x + 2 + k * 5, 6, 2, y - 10); } } else { ctx.fillStyle = "#495057"; ctx.fillRect(x - 2, y - 4, 20, 4); } }
      else if (e.t === "goal") { ctx.fillStyle = "#e9ecef"; ctx.fillRect(x, y - 64, 3, 64); const wv = Math.round(2 * Math.sin(S.t / 6)); ctx.fillStyle = "#ff7a29"; ctx.fillRect(x + 3, y - 64 + wv, 20, 12); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x + 10, y - 60 + wv, 6, 4); }
      else if (e.t === "nest") {
        const clear = e.sentries.gate || !!e.sentries.card;
        ctx.fillStyle = "#5a3a22"; ctx.fillRect(x - 10, y - 34, 3, 34); ctx.fillRect(x + 9, y - 34, 3, 34); ctx.fillStyle = "#7a4a2a"; ctx.fillRect(x - 12, y - 36, 26, 5); ctx.fillStyle = e.boss ? "#e03131" : clear ? "#40c057" : "#ffd43b"; ctx.fillRect(x - 6, y - 46, 14, 9);
        ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 2, y - 44, 6, 2);
        if (Math.abs(S.P.x - e.x) < 22 && !clear) { ctx.fillStyle = "rgba(0,0,0,.65)"; ctx.fillRect(x - 46, y - 64, 94, 13); txt(ctx, "▼ / E: use the scope", x + 1, y - 54, 8, "#fff"); }
      }
    }
    if (S.arena) { drawArena(ctx, ox); drawBoss(ctx, ox); }
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
    ctx.restore();
    S.camOx = ox; hud(); if (S.boss) bossBar(ctx); messages();
  }
  function txt(ctx, s, x, y, size = 10, c = "#fff", align = "center") { ctx.font = `bold ${size}px "Courier New", monospace`; ctx.textAlign = align; ctx.fillStyle = "#1b1b2f"; ctx.fillText(s, x + 1, y + 1); ctx.fillStyle = c; ctx.fillText(s, x, y); }
  const need0 = () => S.ents.some(e => e.t === "nest" && !e.boss && e.x > S.P.x - 40 && e.x - S.P.x < 22 * TS && !e.sentries.gate);
  function hud() {
    const ctx = S.ctx; ctx.fillStyle = "rgba(10,12,30,.55)"; ctx.fillRect(0, 0, VW, 18);
    for (let i = 0; i < S.hearts; i++) { const x = 6 + i * 12; ctx.fillStyle = "#ff6b6b"; ctx.fillRect(x + 1, 5, 3, 3); ctx.fillRect(x + 5, 5, 3, 3); ctx.fillRect(x, 6, 9, 3); ctx.fillRect(x + 2, 9, 5, 2); ctx.fillRect(x + 4, 11, 1, 1); }
    let x = 6 + Math.max(S.hearts, 1) * 12 + 6;
    if (S.shield) { txt(ctx, "◆SHIELD", x, 13, 9, "#9fe7ff", "left"); x += 56; }
    txt(ctx, `BLASTER ${S.ammo}`, x, 13, 9, "#9fe7ff", "left"); x += 76;
    if (S.flash > 0) { S.flash--; ctx.fillStyle = `rgba(255,212,59,${S.flash / 60})`; ctx.fillRect(x - 4, 1, need0() ? 118 : 74, 16); }
    const near = S.ents.find(e => e.t === "nest" && !e.boss && e.x > S.P.x - 40 && e.x - S.P.x < 22 * TS && !e.sentries.gate), need = near ? near.sentries.min - near.sentries.stat.ko : 0;
    txt(ctx, `SNIPER ${S.rounds}${need ? ` · NEED ${need}` : ""}`, x, 13, 9, need && S.rounds < need ? "#ff8787" : "#ffd43b", "left"); x += need ? 118 : 74;
    if (S.streak % 3) { txt(ctx, "▮".repeat(S.streak % 3) + "▯".repeat(3 - S.streak % 3), x - 4, 13, 9, "#ffa94d", "left"); x += 30; }
    if (S.kit.boots) { txt(ctx, "BOOTS", x, 13, 9, "#b197fc", "left"); x += 44; }
    if (S.kit.steady) { txt(ctx, "STEADY", x, 13, 9, "#8ce99a", "left"); }
    txt(ctx, `● ${S.coins}`, VW - 8, 13, 9, "#ffd43b", "right");
  }
  function messages() { S.msgs.slice(-2).forEach((m, i) => txt(S.ctx, m.t, VW / 2, 44 + i * 16, 11, m.c)); }
  function drawScope() {
    const { ctx } = S, sc = S.scope, w = S.G.world, th = S.G.theme;
    ctx.save(); if (S.shake > 0) ctx.translate(Math.round((Math.random() - .5) * S.shake), Math.round((Math.random() - .5) * S.shake));
    const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    ctx.fillStyle = th.far; for (let x = 0; x < VW; x += 4) { const y = 120 + Math.round(16 * Math.sin(x / 40) + 8 * Math.sin(x / 13)); ctx.fillRect(x, y, 4, VH); }
    ctx.fillStyle = th.top; ctx.fillRect(0, FAR - 6, VW, 4); ctx.fillStyle = th.dirt; ctx.fillRect(0, FAR - 2, VW, VH);
    for (const s of sc.nest.sentries.list) {
      if (!s.alive && s.state !== "ko") continue; const b = sBox(s); if (!b.vis && s.state !== "ko") continue;
      const k = s.boss ? 1.5 : 1;
      if (s.state === "ko") {
        const a = Math.min(1, (s.koT || 0) / 16) * Math.PI / 2 * (s.koDir || 1), h = 30 * k, wd = 14 * k;
        ctx.save(); ctx.translate(s.x, FAR); ctx.rotate(a);
        ctx.fillStyle = "#1b1b2f"; ctx.fillRect(-wd / 2 - 1, -h - 1, wd + 2, h + 1);
        ctx.fillStyle = s.boss ? "#7048e8" : "#2b8a3e"; ctx.fillRect(-wd / 2, -h + 10 * k, wd, h - 10 * k);
        if (!s.koHead) { ctx.fillStyle = s.boss ? "#ffd43b" : "#495057"; ctx.fillRect(-wd / 2, -h, wd, 10 * k); }
        else { ctx.fillStyle = "#f2c8a0"; ctx.fillRect(-wd / 2 + 2, -h + 2, wd - 4, 8 * k); }
        ctx.restore();
        const kt = s.koT || 0;
        if (kt > 14 && kt < 80) for (let i = 0; i < 3; i++) { const an = kt / 8 + i * 2.1, sx = s.x + (s.koDir || 1) * 20 * k + Math.cos(an) * 9, sy = FAR - 12 + Math.sin(an) * 3; ctx.fillStyle = "#ffd43b"; ctx.fillRect(sx - 1, sy - 3, 2, 6); ctx.fillRect(sx - 3, sy - 1, 6, 2); }
        continue;
      }
      ctx.fillStyle = "#1b1b2f"; ctx.fillRect(b.l - 1, b.top - 1, b.r - b.l + 2, b.bot - b.top + 1);
      ctx.fillStyle = s.boss ? "#7048e8" : "#2b8a3e"; ctx.fillRect(b.l, b.head, b.r - b.l, b.bot - b.head);
      ctx.fillStyle = s.boss ? "#ffd43b" : "#495057"; ctx.fillRect(b.l, b.top, b.r - b.l, b.head - b.top);
      ctx.fillStyle = "#ff6b6b"; ctx.fillRect(b.l + 2, b.top + 4 * k, b.r - b.l - 4, 2 * k);
      if (s.flash > 0) { ctx.fillStyle = `rgba(255,255,255,${s.flash / 9})`; ctx.fillRect(b.l - 1, b.top - 1, b.r - b.l + 2, b.bot - b.top + 1); }
      if (s.boss) { ctx.fillStyle = "#ffd43b"; ctx.fillRect(b.l + 1, b.top - 4, 3, 4); ctx.fillRect(s.x - 1, b.top - 6, 3, 6); ctx.fillRect(b.r - 4, b.top - 4, 3, 4); }
      if (s.state === "aim") {
        const gl = (s.boss ? 70 : 95) - 10 * S.G.world, left = Math.max(0, 1 - s.st / (gl + 25)), f = 3 + 2 * Math.abs(Math.sin(S.t / 4));
        ctx.fillStyle = "#343a40"; ctx.fillRect(s.x - 16, b.top + 7, 14, 3);
        ctx.fillStyle = "#ff2b2b"; ctx.fillRect(s.x - 16 - f * 2, b.top + 8, f * 4, 2); ctx.fillRect(s.x - 17, b.top + 8 - f * 2, 2, f * 4);
        ctx.strokeStyle = `rgba(255,59,59,${0.5 + 0.5 * (1 - left)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(s.x - 16, b.top + 9, 6 + 26 * left, 0, 7); ctx.stroke();
      }
    }
    drawVeh(ctx, sc.nest.sentries, "ground");
    for (const r of sc.nest.sentries.rocks) { ctx.fillStyle = "#6f6a63"; ctx.beginPath(); ctx.ellipse(r, FAR + 2, RW, RH, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = "#8d877e"; ctx.beginPath(); ctx.ellipse(r - 5, FAR - 3, RW - 9, RH - 8, 0, Math.PI, 0); ctx.fill(); }
    drawVeh(ctx, sc.nest.sentries, "sky");
    ctx.fillStyle = "#3b2f25"; ctx.fillRect(0, 244, VW, VH - 244);
    S.parts.forEach(p => { ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2); });
    drawIncoming(ctx, sc.duck);
    if (sc.duck) {
      ctx.fillStyle = "rgba(5,8,20,.35)"; ctx.fillRect(0, 0, VW, VH);
      for (let i = 0; i < 9; i++) { const x = i * 56 - 10; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(x - 1, 149, 60, 34); ctx.fillStyle = i % 2 ? "#a68a5b" : "#b89a68"; ctx.fillRect(x, 150, 58, 16); ctx.fillStyle = i % 2 ? "#b89a68" : "#a68a5b"; ctx.fillRect(x + 28, 166, 58, 16); }
      ctx.fillStyle = "#6b5a3a"; ctx.fillRect(0, 182, VW, VH - 182);
      txt(ctx, "DUCKING behind the sandbags (let go of K to aim)", VW / 2, 215, 10, "#fff3bf");
    }
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
    hitFx(ctx);
    ctx.restore();
    if (sc.nest.sentries.card) { drawCard(ctx, sc.nest.sentries.card); return; }
    if (sc.intro) { drawIntro(ctx, sc); return; }
    const wind = sc.nest.sentries.wind;
    ctx.fillStyle = "rgba(10,12,30,.7)"; ctx.fillRect(0, 0, VW, 18);
    txt(ctx, `SNIPER ${S.rounds}`, 8, 13, 9, "#ffd43b", "left");
    const ouch = S.hfx.find(f => f.k === "ouch" && f.lost);
    for (let i = 0; i < S.hearts; i++) { ctx.fillStyle = "#ff6b6b"; ctx.fillRect(90 + i * 10, 6, 7, 6); }
    if (ouch) { const t = ouch.t; ctx.fillStyle = `rgba(255,107,107,${1 - t / 50})`; ctx.fillRect(90 + S.hearts * 10 + Math.min(t, 20) * 0.3, 6 + t * 0.8, 7, 6); }
    if (S.shield) txt(ctx, "◆", 160, 13, 9, "#9fe7ff", "left");
    const sst = sc.nest.sentries.stat, need = Math.max(0, sc.nest.sentries.min - sst.ko);
    txt(ctx, sc.nest.boss ? `WARDEN ${"■".repeat(Math.max(0, sc.nest.sentries.list[0].hp))}` : `KO ${sst.ko}${sst.head ? ` · HEAD ${sst.head}` : ""} · SCORE ${sst.score}${need ? ` · GATE: ${need} MORE` : " · GATE ✓"}`, VW / 2, 13, 9, "#fff");
    if (wind) txt(ctx, `WIND ${wind > 0 ? "→".repeat(wind) : "←".repeat(-wind)} ${Math.abs(wind)}: aim ${Math.abs(wind)} dot${Math.abs(wind) > 1 ? "s" : ""} ${wind > 0 ? "LEFT" : "RIGHT"}`, VW - 8, 13, 9, "#8ce99a", "right");
    const glint = sc.nest.sentries.list.some(s => s.alive && s.state === "aim");
    if (glint && !sc.duck && !S.incoming.length) txt(ctx, "RED GLINT: SHOOT THEM FIRST, OR GET READY TO DUCK (K)", VW / 2, 36, 10, "#ff6b6b");
    txt(ctx, "J fire · K duck · E leave", VW / 2, VH - 8, 9, "#ced4da");
    messages();
  }
  /* the hit effects: a hit marker (an X of four strokes round the impact), a burst ring on a headshot,
     a flying helmet, a puff for a miss, and big pop-up words that grow in, float up and fade */
  /* a bullet coming at you: a bright tracer that grows as it gets closer; over your head if you duck */
  function drawIncoming(ctx, duck) {
    for (const b of S.incoming) {
      const p = b.t / b.dur, tx = VW / 2, ty = duck ? 110 : VH / 2 + 30, x = b.x0 + (tx - b.x0) * p, y = b.y0 + (ty - b.y0) * p, r = 2 + 10 * p * p, q = Math.max(0, p - 0.25);
      ctx.strokeStyle = `rgba(255,170,60,${0.3 + 0.5 * p})`; ctx.lineWidth = Math.max(1, r * 0.6); ctx.beginPath(); ctx.moveTo(b.x0 + (tx - b.x0) * q, b.y0 + (ty - b.y0) * q); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = "#fff3bf"; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.fillStyle = "#ff922b"; ctx.beginPath(); ctx.arc(x, y, r * 0.6, 0, 7); ctx.fill();
      if (!duck && p > 0.3) txt(ctx, "INCOMING! HOLD K TO DUCK", VW / 2, 60, 13, S.t % 10 < 5 ? "#ff6b6b" : "#fff");
    }
  }
  function hitFx(ctx) {
    for (const f of S.hfx) {
      if (f.k === "muzzle") { const a = 1 - f.t / 26; ctx.fillStyle = `rgba(255,212,59,${a})`; ctx.beginPath(); ctx.arc(f.x - 18, f.y + 3, Math.max(1, 6 - f.t * 0.15), 0, 7); ctx.fill(); continue; }
      if (f.k === "whoosh") { const a = 1 - f.t / 26; ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 2; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(VW / 2 - 60 + f.t * 6, 100 + i * 8); ctx.lineTo(VW / 2 - 20 + f.t * 6, 100 + i * 8); ctx.stroke(); } continue; }
      if (f.k === "ouch") {
        const a = 1 - f.t / 50; ctx.fillStyle = f.lost ? `rgba(255,0,0,${0.45 * a})` : `rgba(80,180,255,${0.35 * a})`; ctx.fillRect(0, 0, VW, VH);
        ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 2; const cx = VW / 2 + 30, cy = VH / 2 + 20;
        for (const [dx, dy] of [[40, -30], [-50, -10], [20, 45], [-30, 35], [55, 15]]) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + dx * 0.5, cy + dy * 0.6); ctx.lineTo(cx + dx, cy + dy); ctx.stroke(); }
        if (f.lost) { const g = f.t < 6 ? 1.6 - f.t * 0.1 : 1; txt(ctx, "-1 HEART", VW / 2, VH / 2 - 10 - Math.min(f.t, 30) * 0.6, Math.round(20 * g), "#ff6b6b"); }
        else txt(ctx, "SHIELD BLOCKED IT", VW / 2, VH / 2 - 10, 14, "#9fe7ff");
        continue;
      }
      if (f.k === "mark") {
        const p = Math.min(1, f.t / 4), g = 4 + 8 * p, L = 7, a = f.t < 14 ? 1 : 1 - (f.t - 14) / 12;
        ctx.strokeStyle = `rgba(${f.head ? "255,59,59" : "255,255,255"},${a})`; ctx.lineWidth = f.head ? 3 : 2;
        for (const [dx, dy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) { ctx.beginPath(); ctx.moveTo(f.x + dx * g, f.y + dy * g); ctx.lineTo(f.x + dx * (g + L), f.y + dy * (g + L)); ctx.stroke(); }
      } else if (f.k === "ring") {
        const r = 6 + f.t * 2.2, a = 1 - f.t / 26; ctx.strokeStyle = `rgba(255,212,59,${a})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, 7); ctx.stroke();
      } else if (f.k === "helmet") {
        ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.t * 0.35); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(-8, -5, 16, 10); ctx.fillStyle = f.boss ? "#ffd43b" : "#495057"; ctx.fillRect(-7, -4, 14, 8); ctx.fillStyle = "#ff6b6b"; ctx.fillRect(-5, 0, 10, 2); ctx.restore();
      } else if (f.k === "miss") {
        const a = 1 - f.t / 26; ctx.fillStyle = `rgba(201,180,138,${a})`; for (let i = 0; i < 5; i++) ctx.fillRect(f.x - 6 + i * 3, f.y - f.t * 0.4 - (i % 2) * 3, 3, 3);
      } else if (f.k === "pop" && f.t >= 0) {
        const grow = f.t < 6 ? 1.8 - f.t * 0.13 : 1, a = f.t < 50 ? 1 : 1 - (f.t - 50) / 20, y = f.y - Math.min(f.t, 40) * 0.5;
        ctx.globalAlpha = Math.max(0, a); txt(ctx, f.text, Math.max(70, Math.min(VW - 70, f.x)), Math.max(40, y), Math.round(15 * grow), f.c); if (f.sub) txt(ctx, f.sub, Math.max(70, Math.min(VW - 70, f.x)), Math.max(40, y) + 14, 9, "#ffd43b"); ctx.globalAlpha = 1;
      }
    }
  }
  /* test hooks: used only by tools/check_game4.js */
  const hook = {
    state: () => S && { x: S.P.x, y: S.P.y, hearts: S.hearts, ammo: S.ammo, rounds: S.rounds, coins: S.coins, scope: !!S.scope, sy: S.scope ? S.scope.y : null, over: S.over, cols: S.G.cols, shield: S.shield, check: S.check },
    teleport: (col) => { if (!S) return; const c = Math.max(0, Math.min(S.G.cols - 1, col)); let r = 0; while (r < ROWS && !solidAt(S.G, c, r)) r++; S.P.x = c * TS + 3; S.P.y = r * TS - PH.h; S.P.vx = S.P.vy = 0; },
    nests: () => S ? S.ents.filter(e => e.t === "nest").map(e => ({ x: e.x, boss: !!e.boss, alive: e.sentries.list.filter(s => s.alive).length, ko: e.sentries.stat.ko, score: e.sentries.stat.score, min: e.sentries.min, gate: e.sentries.gate, card: !!e.sentries.card })) : [],
    snipe: () => S && snipeTotals(),
    quiet: () => { if (!S || !S.scope) return; const ss = S.scope.nest.sentries; ss.respawn = []; S.incoming = []; ss.list.forEach((q, i) => { if (i && q.alive) { q.state = "hide"; q.st = 0; q.hold = 99999; } }); },
    exitScope: () => { if (S && S.scope) { S.scope.nest.sentries.card = null; S.scope = null; cardOut(null); } },
    gates: () => S ? S.ents.filter(e => e.t === "gate").map(e => ({ col: e.col, nest: e.nest, open: !!S.G.gateOpen[e.col] })) : [],
    setRounds: n => { if (S) S.rounds = n; },
    fx: () => S ? S.hfx.map(f => f.k + (f.head ? "-head" : "")) : [],
    toChest: () => { if (!S) return false; const c = S.ents.find(e => e.t === "chest" && !e.opened); if (!c) return false; S.P.x = c.x; S.P.y = c.y - 4; S.P.vx = S.P.vy = 0; return true; },
    chests: () => S ? S.ents.filter(e => e.t === "chest").map(e => e.opened || "closed") : [], paused: () => !!(S && S.paused),
    incoming: () => S ? S.incoming.length : 0,
    forceAim: () => { if (!S || !S.scope) return; const s = S.scope.nest.sentries.list.find(q => q.alive); if (s) { s.x = s.at + s.side * (s.boss ? 42 : 36); s.state = "aim"; s.st = 0; s.hold = 9999; } },
    kit: () => S && Object.assign({}, S.kit, { boots: !!S.P.boots, shield: S.shield, hearts: S.hearts, rounds: S.rounds, ammo: S.ammo }),
    ammo: () => S ? S.ents.filter(e => e.t === "ammo" && e.alive).map(e => ({ x: e.x, y: e.y })) : [],
    grab: () => { if (!S) return; const a = S.ents.find(e => e.t === "ammo" && e.alive); if (a) { S.P.x = a.x - 1; S.P.y = a.y - 2; S.P.vx = S.P.vy = 0; } },
    aimAt: (i, part = "body") => { if (!S || !S.scope) return false; const s = S.scope.nest.sentries.list.filter(q => q.alive)[i || 0]; if (!s) return false; s.state = "peek"; s.st = 0; s.hold = 9999; s.hideIn = 0; s.x = s.at + s.side * (s.boss ? 42 : 36); S.stop = 0; const b = sBox(s), drop = (s.range / 100 - 1) * 8, w = S.scope.nest.sentries.wind, a = S.kit.steady ? 2.5 : 5.5; const tx = s.x - w * 8, ty = (part === "head" ? (b.top + b.head) / 2 : (b.head + b.bot) / 2) - drop; S.scope.x = tx - a * Math.sin((S.t + 1) / 23); S.scope.y = ty - a * 0.8 * Math.sin((S.t + 1) / 31 + 1); S.scope.cd = 0; return true; },
    fire: () => { if (S && S.scope) { S.scope.cd = 0; KEYS.fireP = true; } else if (S) KEYS.fireP = true; },
    key: (k, down) => { if (S && S.scope && (S.scope.nest.sentries.card || S.scope.intro)) { if (down && k === "jump") S.anyKey = true; if (!down) KEYS[k] = false; return; } KEYS[k] = down; if (down) KEYS[k + "P"] = true; },
    tap: () => { if (S && S.scope && (S.scope.nest.sentries.card || S.scope.intro)) S.anyKey = true; },
    /* the boss */
    toArena: () => { if (!S) return false; const a = S.ents.find(e => e.t === "arena"); if (!a) return false; S.P.x = a.x + 4 * TS; S.P.y = a.y - PH.h; S.P.vx = S.P.vy = 0; return true; },
    boss: () => S && S.boss && { hp: S.boss.hp, max: S.boss.max, phase: S.boss.phase, state: S.boss.state, core: S.boss.core, ball: S.boss.ball, x: S.boss.x, name: S.boss.info.name, waves: S.waves.length, orbs: S.orbs.length },
    /* the new platform pieces */
    pieces: () => S && { movers: S.ents.filter(e => e.t === "mover").map(e => ({ x: e.x, y: e.y, wd: e.wd })), springs: (() => { const o = []; for (let r = 0; r < ROWS; r++) for (let c = 0; c < S.G.cols; c++) if (S.G.map[r][c] === 5) o.push([c, r]); return o; })(), crumbles: (() => { const o = []; for (let r = 0; r < ROWS; r++) for (let c = 0; c < S.G.cols; c++) if (S.G.map[r][c] === 6) o.push([c, r, !!(S.G.broken && S.G.broken[c + "," + r])]); return o; })() },
    place: (x, y) => { if (!S) return; S.P.x = x; S.P.y = y; S.P.vx = S.P.vy = 0; S.P.onMover = null; },
    /* nests: the gear card and the vehicles */
    intro: () => !!(S && S.scope && S.scope.intro),
    spawnVeh: k => { if (S && S.scope) { const ss = S.scope.nest.sentries; spawnVeh(ss, k); if (k === "plane") ss.veh.drops = [VW / 2]; } },
    vehicles: () => S && S.scope && { veh: S.scope.nest.sentries.veh && { k: S.scope.nest.sentries.veh.k, hp: S.scope.nest.sentries.veh.hp, dead: !!S.scope.nest.sentries.veh.dead, x: S.scope.nest.sentries.veh.x, y: S.scope.nest.sentries.veh.y, state: S.scope.nest.sentries.veh.state }, chutes: S.scope.nest.sentries.chutes.map(c => ({ x: c.x, y: c.y })), stat: Object.assign({}, S.scope.nest.sentries.stat) },
    vehOff: on => { if (S && S.scope) S.scope.nest.sentries.vehOff = on; },
    aimPoint: (x, y) => { if (!S || !S.scope) return; const w = S.scope.nest.sentries.wind, a = S.kit.steady ? 2.5 : 5.5; S.stop = 0; S.scope.x = x - w * 8 - a * Math.sin((S.t + 1) / 23); S.scope.y = y - a * 0.8 * Math.sin((S.t + 1) / 31 + 1); S.scope.cd = 0; },
    bossDo: st => { if (S && S.boss) { S.boss.state = st; S.boss.st = 0; } },
    bossHp: n => { if (S && S.boss) S.boss.hp = n; },
    stompBoss: () => { if (!S || !S.boss) return; const B = S.boss, b = bossBox(B); S.P.x = B.x + BW / 2 - PH.w / 2; S.P.y = b.top - PH.h - 4; S.P.vy = 2; S.P.vx = 0; },
    shootCore: () => { if (!S || !S.boss) return; const B = S.boss, b = bossBox(B); S.P.x = B.x - 40; S.P.face = 1; S.P.cd = 0; S.ammo = Math.max(S.ammo, 1); S.bolts.push({ x: B.x - 6, y: b.kneel ? S.arena.floor - 20 : S.arena.floor - 56, vx: 5, d: 20 }); },
    hurt: () => S && hurt("test"), win: () => S && end(true), lose: () => { if (S) { S.hearts = 1; S.shield = 0; S.P.inv = 0; hurt("test"); } }
  };
  /* ---------------- the title screen (all our own pixel art, drawn in code) ----------------
     A sunset canyon scrolls past; the hero runs and leaps over spiky rollers grabbing gold bullets; a giant golem
     watches from the far ridge with a glowing eye, lit by lightning; the RIDGE RUNNER letters slam in one by one. */
  const FONT = { R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"], I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"], G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"], U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"] };
  let T = null;
  function title(opts) {
    titleStop();
    const cv = opts.canvas, ctx = cv.getContext("2d"); cv.width = VW; cv.height = VH; ctx.imageSmoothingEnabled = false;
    T = { ctx, t: 0, cam: 0, P: { y: 0, vy: 0, ground: true }, rollers: [], bullets: [], sparks: [], got: 0, shake: 0, flash: 0, bolt: 0, raf: 0, sound: opts.sound, go: 0, onGo: opts.onGo };
    const words = [["RIDGE", 34], ["RUNNER", 96]], B = 7;
    T.letters = []; let k = 0;
    for (const [w, y] of words) { const wd = w.length * (5 * B + B) - B; w.split("").forEach((c, i) => T.letters.push({ c, x: Math.round((VW - wd) / 2) + i * (6 * B), y, at: 20 + k++ * 9 })); }
    T.B = B;
    let last = performance.now(), acc = 0;
    const loop = now => { acc += Math.min(100, now - last); last = now; while (acc >= 1000 / 60) { titleTick(); acc -= 1000 / 60; } if (!T) return; titleDraw(); T.raf = requestAnimationFrame(loop); };
    T.raf = requestAnimationFrame(loop);
  }
  function titleStop() { if (T) cancelAnimationFrame(T.raf); T = null; }
  function titleBeep(f, d, type = "square", v = 0.05, delay = 0) {
    if (!T || !T.sound) return;
    try { const A = T.ac || (T.ac = new (window.AudioContext || window.webkitAudioContext)()); const o = A.createOscillator(), g = A.createGain(), t0 = A.currentTime + delay; o.type = type; o.frequency.value = f; g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d); o.connect(g); g.connect(A.destination); o.start(t0); o.stop(t0 + d + 0.02); } catch (e) {}
  }
  /* press start: a rising fanfare, a white flash, then the map */
  function titleGo() {
    if (!T || T.go) return; T.go = 1; T.shake = 10;
    [523, 659, 784, 1047].forEach((f, i) => titleBeep(f, .16, "square", .05, i * 0.09)); titleBeep(1568, .5, "triangle", .06, 0.38);
  }
  const GROUND = 232;
  function titleTick() {
    const S2 = T; S2.t++; const t = S2.t;
    S2.cam += 2.2;
    if (S2.shake > 0) S2.shake--; if (S2.flash > 0) S2.flash--;
    /* the letters slam in: a thud and sparks as each one lands */
    for (const L of S2.letters) if (t === L.at + 14) { S2.shake = Math.max(S2.shake, 5); for (let i = 0; i < 10; i++) S2.sparks.push({ x: L.x + Math.random() * 35, y: L.y + 49, vx: (Math.random() - .5) * 3, vy: -Math.random() * 3, d: 30, c: i % 2 ? "#ffd43b" : "#fff" }); }
    if (t === S2.letters[S2.letters.length - 1].at + 30) { S2.flash = 16; S2.shake = 14; }
    /* lightning now and then: the golem on the ridge lights up */
    if (t > 120 && t % 260 === 0) { S2.bolt = 18; S2.flash = Math.max(S2.flash, 8); }
    if (S2.bolt > 0) S2.bolt--;
    /* the hero: a jump whenever a roller comes close */
    const P = S2.P, hx = 120;
    if (t % 90 === 30) S2.rollers.push({ x: VW + 20, spin: 0 });
    if (t % 40 === 10) S2.bullets.push({ x: VW + 10, y: GROUND - 40 - (t % 80 ? 0 : 26), alive: true });
    for (const r of S2.rollers) { r.x -= 3.4; r.spin -= 0.3; }
    S2.rollers = S2.rollers.filter(r => r.x > -30);
    for (const b of S2.bullets) b.x -= 2.2;
    S2.bullets = S2.bullets.filter(b => b.x > -20);
    if (P.ground && S2.rollers.some(r => r.x - hx > 6 && r.x - hx < 40)) { P.vy = -6.6; P.ground = false; }
    if (!P.ground) { P.vy += 0.32; P.y += P.vy; if (P.y >= 0) { P.y = 0; P.vy = 0; P.ground = true; } }
    for (const b of S2.bullets) if (b.alive && Math.abs(b.x - (hx + 5)) < 9 && Math.abs(b.y - (GROUND - 14 + P.y + 6)) < 14) { b.alive = false; S2.got++; for (let i = 0; i < 6; i++) S2.sparks.push({ x: b.x, y: b.y, vx: (Math.random() - .5) * 3, vy: -Math.random() * 2.5, d: 24, c: "#ffd43b" }); }
    S2.sparks.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.d--; }); S2.sparks = S2.sparks.filter(p => p.d > 0);
    if (S2.go && ++S2.go > 46) { const cb = S2.onGo; titleStop(); cb && cb(); }
  }
  function letter(ctx, L, B, y, t) {
    const g = FONT[L.c];
    g.forEach((row, r) => [...row].forEach((on, c) => { if (on !== "1") return; ctx.fillStyle = "#3b1d08"; ctx.fillRect(L.x + c * B + 4, y + r * B + 4, B, B); }));        /* the deep shadow */
    g.forEach((row, r) => [...row].forEach((on, c) => { if (on !== "1") return; ctx.fillStyle = "#1b1b2f"; ctx.fillRect(L.x + c * B - 1, y + r * B - 1, B + 2, B + 2); }));  /* the outline */
    g.forEach((row, r) => [...row].forEach((on, c) => {
      if (on !== "1") return; const x = L.x + c * B, yy = y + r * B;
      ctx.fillStyle = ["#fff3bf", "#ffe066", "#ffd43b", "#fcc419", "#fab005", "#f59f00", "#e67700"][r]; ctx.fillRect(x, yy, B, B);
      ctx.fillStyle = "rgba(255,255,255,.55)"; ctx.fillRect(x, yy, B, 1); ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.fillRect(x, yy + B - 1, B, 1);
      const sw = (t * 3) % 420 - 60; if (Math.abs(x + yy * 0.6 - sw) < 9) { ctx.fillStyle = "rgba(255,255,255,.75)"; ctx.fillRect(x, yy, B, B); }   /* a shine sweeps across */
    }));
  }
  function titleDraw() {
    const { ctx, t } = T;
    ctx.save(); if (T.shake) ctx.translate(Math.round((Math.random() - .5) * T.shake), Math.round((Math.random() - .5) * T.shake));
    /* sky: a sunset with stars coming out */
    const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, "#1b1440"); g.addColorStop(0.45, "#6b2f6b"); g.addColorStop(0.75, "#f0743a"); g.addColorStop(1, "#ffc36b");
    ctx.fillStyle = g; ctx.fillRect(-10, -10, VW + 20, VH + 20);
    for (let i = 0; i < 46; i++) { const x = (i * 97 + 13) % VW, y = (i * 53) % 110, tw = Math.sin(t / 14 + i) > 0.6; ctx.fillStyle = tw ? "#fff" : "rgba(255,255,255,.5)"; ctx.fillRect(x, y, tw ? 2 : 1, tw ? 2 : 1); }
    ctx.fillStyle = "rgba(255,214,120,.35)"; ctx.beginPath(); ctx.arc(70, 176, 46, 0, 7); ctx.fill(); ctx.fillStyle = "#ffd8a8"; ctx.beginPath(); ctx.arc(70, 176, 32, 0, 7); ctx.fill();
    for (let i = 0; i < 4; i++) { ctx.fillStyle = "#f0743a"; ctx.fillRect(30, 168 + i * 8, 80, 2); }
    const hills = (col, par, h, amp, f) => { ctx.fillStyle = col; for (let x = 0; x < VW; x += 3) { const wx = x + T.cam * par; const y = h + Math.round(amp * Math.sin(wx / f) + amp * 0.5 * Math.sin(wx / (f * 0.37))); ctx.fillRect(x, y, 3, VH - y); } };
    hills("#4a2552", 0.15, 150, 22, 80);
    /* the giant on the far ridge: a dark golem whose eye glows; lightning shows it for a moment */
    { const bx = 428, by = 204, lit = T.bolt > 0, c = lit ? "#7a64a0" : "#2b1638", d = lit ? "#5a4680" : "#211030", e = 0.6 + 0.4 * Math.sin(t / 10), sway = Math.round(2 * Math.sin(t / 40));
      const R = (x, y, w, h, col) => { ctx.fillStyle = col; ctx.fillRect(bx + x, by + y + (y < -40 ? sway : 0), w, h); };
      R(-30, -44, 24, 44, d); R(6, -44, 24, 44, d);                                   /* legs */
      R(-44, -120, 88, 80, c); R(-44, -120, 88, 8, lit ? "#9775fa" : "#3a2050");     /* torso */
      R(-64, -128, 30, 24, d); R(34, -128, 30, 24, d);                                 /* shoulders */
      R(-62, -106, 18, 62, c); R(44, -106, 18, 62, c); R(-66, -48, 26, 20, d); R(40, -48, 26, 20, d);   /* arms and fists */
      R(-24, -160, 48, 40, c); R(-24, -160, 48, 8, d);                                 /* head */
      R(-32, -176, 8, 22, d); R(-38, -184, 8, 12, d); R(24, -176, 8, 22, d); R(30, -184, 8, 12, d);   /* horns */
      ctx.fillStyle = `rgba(255,${120 + 80 * e | 0},60,${0.22 * e})`; ctx.beginPath(); ctx.ellipse(bx, by - 142 + sway, 26, 9, 0, 0, 7); ctx.fill();
      R(-17, -146, 34, 8, "#1b1b2f"); R(-15, -145, 30, 6, `rgb(255,${180 + 60 * e | 0},80)`);   /* the visor eye */
      ctx.fillStyle = `rgba(255,146,43,${0.25 * e})`; ctx.beginPath(); ctx.arc(bx, by - 82 + sway, 20, 0, 7); ctx.fill();
      R(-10, -92, 20, 20, "#1b1b2f"); R(-8, -90, 16, 16, lit ? "#ffd43b" : `rgba(255,146,43,${0.55 + 0.45 * e})`); }  /* the core */
    if (T.bolt > 10) { ctx.strokeStyle = "#fff9db"; ctx.lineWidth = 3; ctx.beginPath(); let x = 300 + (t % 7) * 9, y = 0; ctx.moveTo(x, y); while (y < 120) { x += (Math.random() - .5) * 26; y += 14; ctx.lineTo(x, y); } ctx.stroke(); }
    hills("#2e1a3a", 0.4, 196, 14, 50);
    /* a sniper glint on the ridge */
    if (t % 150 < 20) { const f = 2 + 2 * Math.abs(Math.sin(t / 3)); ctx.fillStyle = "#ff3b3b"; ctx.fillRect(196 - f * 2, 180, f * 4, 2); ctx.fillRect(195, 179 - f * 2, 2, f * 4); }
    /* the ground, scrolling */
    const th = THEMES[0];
    for (let x = -((T.cam * 1) % TS); x < VW; x += TS) for (let y = GROUND; y < VH; y += TS) { const c = Math.floor((x + T.cam) / TS); ctx.fillStyle = (c + y / TS) % 2 ? th.dirt : th.dirt2; ctx.fillRect(Math.round(x), y, TS, TS); }
    ctx.fillStyle = th.top; ctx.fillRect(0, GROUND, VW, 4); ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.fillRect(0, GROUND + 4, VW, 1);
    for (let i = 0; i < 4; i++) { const x = ((i * 140 - T.cam) % 560 + 560) % 560 - 40; ctx.fillStyle = "#2f6b3a"; ctx.fillRect(x, GROUND - 22, 6, 22); ctx.fillRect(x - 6, GROUND - 16, 6, 3); ctx.fillRect(x - 6, GROUND - 16, 3, 8); ctx.fillRect(x + 6, GROUND - 13, 6, 3); ctx.fillRect(x + 9, GROUND - 13, 3, 8); }
    /* gold bullets and spiky rollers */
    for (const b of T.bullets) if (b.alive) { const bb = Math.round(2 * Math.sin(t / 8 + b.x)); ctx.fillStyle = "rgba(255,212,59,.4)"; ctx.fillRect(b.x - 3, b.y - 3 + bb, 13, 17); ctx.fillStyle = "#1b1b2f"; ctx.fillRect(b.x, b.y - 1 + bb, 7, 12); ctx.fillStyle = "#e8a33d"; ctx.fillRect(b.x + 1, b.y + 4 + bb, 5, 6); ctx.fillStyle = "#ffd43b"; ctx.fillRect(b.x + 1, b.y + 4 + bb, 2, 6); ctx.fillStyle = "#e9ecef"; ctx.fillRect(b.x + 2, b.y + bb, 3, 4); }
    for (const r of T.rollers) { const x = r.x, y = GROUND - 11; ctx.fillStyle = "#1b1b2f"; ctx.beginPath(); ctx.arc(x + 6, y + 5, 6.5, 0, 7); ctx.fill(); ctx.fillStyle = "#868e96"; ctx.beginPath(); ctx.arc(x + 6, y + 5, 5, 0, 7); ctx.fill(); ctx.fillStyle = "#e9ecef"; for (let i = 0; i < 6; i++) { const an = r.spin + i * Math.PI / 3; ctx.fillRect(Math.round(x + 6 + Math.cos(an) * 7) - 1, Math.round(y + 5 + Math.sin(an) * 7) - 1, 2, 2); } ctx.fillStyle = "#e03131"; ctx.fillRect(x + 5, y + 4, 2, 2); }
    /* the hero, twice the size, running */
    { const P = T.P, legs = !P.ground ? "jump" : Math.floor(t / 5) % 2 ? "run1" : "run2", img = sprite("hero-" + legs, HERO.concat(LEGS[legs]), false);
      ctx.drawImage(img, 120 - 6, Math.round(GROUND - 32 + P.y), 24, 32);
      if (P.ground && t % 6 < 3) { ctx.fillStyle = "rgba(255,230,180,.6)"; ctx.fillRect(112, GROUND - 3, 4, 3); } }
    T.sparks.forEach(p => { ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x), Math.round(p.y), 2, 2); });
    /* the title: each letter drops in and bounces */
    for (const L of T.letters) {
      const dt = t - L.at; if (dt < 0) continue;
      const y = dt < 14 ? L.y - 140 * (1 - dt / 14) ** 2 : dt < 22 ? L.y - Math.round(6 * Math.sin((dt - 14) / 8 * Math.PI)) : L.y + Math.round(1.5 * Math.sin(t / 20 + L.x / 30));
      letter(ctx, L, T.B, y, t);
    }
    const done = t > T.letters[T.letters.length - 1].at + 30;
    if (done) {
      txt(ctx, "ANSWER  ·  GEAR UP  ·  RUN", VW / 2, 164, 10, "#fff3bf");
      if (!T.go ? t % 50 < 34 : t % 6 < 3) { ctx.fillStyle = "rgba(10,8,30,.6)"; ctx.fillRect(VW / 2 - 98, 180, 196, 22); txt(ctx, "PRESS SPACE TO START", VW / 2, 195, 11, "#ffffff"); }
      if (T.got) txt(ctx, `◎ ${T.got}`, VW - 14, 16, 10, "#ffd43b", "right");
    }
    ctx.restore();
    if (T.flash) { ctx.fillStyle = `rgba(255,255,255,${T.flash / 16})`; ctx.fillRect(0, 0, VW, VH); }
    if (T.go) { ctx.fillStyle = `rgba(255,255,255,${Math.min(1, T.go / 30)})`; ctx.fillRect(0, 0, VW, VH); }
  }
  return { start, stop, gen, reach, step, hook, THEMES, LOOT, roast, mood, title, titleGo, titleStop, titleState: () => T && { t: T.t, go: T.go, got: T.got } };
})();
