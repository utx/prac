/* ---------- the arena: a short side-on showdown after each answer (David, Nov 2026) ----------
   Questions are the ammo: a right answer loads 5 shots and 3 walls, a wrong one 2 shots and 1 wall
   (and the opponent has already shot back). A whole reading passage loads one bigger round.
   Keys: ← → (or A D) move, ↑ / W / Space jump, J (or X) shoot, K (or C) build a wall, B boogie bomb.
   The crosshair sweeps up and down the opponent: fire while it is red, on the head, for a headshot (double).
   The opponent strafes, jumps your shots, builds, aims (a red line: jump or build), throws grenades
   (move or jump) and stops to heal (hit them to interrupt). Its shots are small and can never knock you
   out: only wrong answers can. The fighters are our own pixel drawings. No clock of any kind. */
const ARENA = (() => {
  const W = 480, H = 270, GROUND = 236, GRAV = 0.34;
  const KEYS = {}, MAP = { ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right", ArrowUp: "jump", w: "jump", W: "jump", " ": "jump",
    ArrowDown: "down", s: "down", S: "down", j: "shoot", J: "shoot", x: "shoot", X: "shoot", k: "build", K: "build", c: "build", C: "build", b: "boogie", B: "boogie" };
  const shade = (hex, f) => { const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f)); return "#" + c.map(v => v.toString(16).padStart(2, "0")).join(""); };
  /* our own fighter designs, one per kind of opponent */
  const LOOK = {
    reading: { type: "hood", main: "#2e9e5b", trim: "#e3c16f", skin: "#d99a6c", cape: "#1d5e38", gun: "#5b3a1e" },
    thinking: { type: "helmet", main: "#8b5cd6", trim: "#ffd43b", skin: "#f0c49c", visor: "#22d3ee", gun: "#3a3f52" },
    maths: { type: "bot", main: "#3b8fd6", trim: "#ff922b", skin: "#b9c6d6", eye: "#ff4d4d", gun: "#3a3f52" },
    boss: { type: "king", main: "#b8322a", trim: "#ffd700", skin: "#e0a77f", cape: "#5b1a7a", gun: "#2a2a2a" },
  };
  const heroLook = c => ({ type: "hoodie", main: c, trim: "#ffe81a", skin: "#f2c39b", visor: "#7fd7ff", gun: "#2b2f3a" });
  let R = null, acc = 0, last = 0;
  /* our own 3D fighters, rendered in Blender (game3/art/fighters.py) and packed 8 x 5 into one sheet each */
  const FRAME = { w: 144, h: 192, cols: 8, fx: 62, fy: 172, body: 122 };
  const ANIM = { idle: [0, 4], run: [4, 8], jump: [12, 3], shoot: [15, 3], hit: [18, 2], build: [20, 3], heal: [23, 4], dance: [27, 8], knocked: [35, 4], ko: [39, 1],
    robot: [40, 6], runman: [46, 6], disco: [52, 6], jacks: [58, 6], spin: [64, 6] };
  /* emotes (David, Nov 2026): classic everyday dance moves; keys 1 to 5, or E for a random one */
  const EMOTES = [{ id: "robot", name: "The Robot" }, { id: "runman", name: "Running Man" }, { id: "disco", name: "Disco Point" }, { id: "jacks", name: "Star Jumps" }, { id: "spin", name: "Spin & Pose" }];
  const SPRITE = { reading: "ranger", thinking: "knight", maths: "robot", boss: "king" };
  const HERO = { "#8a94a6": "hero-common", "#2f8fff": "hero-rare", "#a34dff": "hero-epic", "#ffb21a": "hero-legendary" };
  const IMG = {};
  const img = src => { if (!IMG[src]) { const im = new Image(); im.src = src; IMG[src] = im; } return IMG[src]; };
  const ready = im => im && im.complete && im.naturalWidth > 0;
  function frameOf(f) {
    let a = "idle", k = 0;
    if (f.state === "ko") a = "ko";
    else if (f.state === "knocked") { a = "knocked"; k = Math.floor(f.t / 12); }
    else if (f.state === "dance") { a = "dance"; k = Math.floor(f.t / 6); }
    else if (f.state === "emote" || f.emoteT > 0) { a = f.emote; k = Math.floor(f.t / 7); }
    else if (f.state === "heal") { a = "heal"; k = Math.floor(f.t / 12); }
    else if (f.hitT > 0) { a = "hit"; k = f.hitT > 7 ? 0 : 1; }
    else if (!f.ground) { a = "jump"; k = f.vy < -2 ? 0 : f.vy < 2 ? 1 : 2; }
    else if (f.buildT > 0) { a = "build"; k = 2 - Math.min(2, Math.floor(f.buildT / 6)); }
    else if (f.recoil > 0) { a = "shoot"; k = f.recoil > 4 ? 0 : f.recoil > 2 ? 1 : 2; }
    else if (Math.abs(f.vx) > 0.2) { a = "run"; k = Math.floor(f.t / 4); }
    else k = Math.floor(f.t / 14);
    const [start, n] = ANIM[a];
    return start + (k % n);
  }
  function sprite(ctx, f) {
    const sh = img(`art/fighter-${f.sheet}.webp`);
    if (!ready(sh)) return false;
    const i = frameOf(f), sx = (i % FRAME.cols) * FRAME.w, sy = Math.floor(i / FRAME.cols) * FRAME.h, k = 48 * f.scale / FRAME.body;
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(f.x, (f.gy || GROUND) + 1, 22 * f.scale, 4 * f.scale, 0, 0, 7); ctx.fill();   // shadow
    ctx.translate(Math.round(f.x), Math.round(f.y)); if (f.dir < 0) ctx.scale(-1, 1);
    if (f.flash > 0 && f.flash % 4 < 2) ctx.filter = "brightness(2.2)";
    ctx.drawImage(sh, sx, sy, FRAME.w, FRAME.h, -FRAME.fx * k, -FRAME.fy * k, FRAME.w * k, FRAME.h * k);
    ctx.restore();
    if (f.muzzle > 0) { const mx = f.x + f.dir * 27 * f.scale, my = f.y - 34 * f.scale; ctx.fillStyle = "#fff3a0"; ctx.beginPath(); ctx.arc(mx, my, 5 + f.muzzle, 0, 7); ctx.fill(); ctx.fillStyle = "#ffb703"; ctx.beginPath(); ctx.arc(mx + f.dir * 4, my, 3 + f.muzzle / 2, 0, 7); ctx.fill(); }
    return true;
  }

  /* ---------- drawing ---------- */
  function rect(ctx, f, x, y, w, h, col) {   // sprite pixels, feet at (0,0), x mirrored when facing left
    const u = 2 * f.scale, X = f.dir > 0 ? x : -(x + w);
    ctx.fillStyle = col; ctx.fillRect(Math.round(f.x + X * u), Math.round(f.y + y * u), Math.ceil(w * u), Math.ceil(h * u));
  }
  function fighter(ctx, f) {
    if (sprite(ctx, f)) return;          // the pixel drawing below is only a fallback while the pictures load
    const L = f.look, p = (x, y, w, h, c) => rect(ctx, f, x, y, w, h, c), dark = shade(L.main, -0.4), light = shade(L.main, 0.35), t = f.t;
    if (f.flash > 0 && f.flash % 4 < 2) { ctx.globalAlpha = 0.45; }
    if (f.state === "ko" || f.state === "knocked") {          // lying down / crawling
      const o = f.state === "knocked" ? Math.floor(t / 16) % 2 : 0;
      p(-12, -6 - o, 16, 6, L.main); p(4, -7 - o, 7, 7, L.skin); p(-16, -4, 5, 4, dark); if (L.type !== "bot") p(4, -8 - o, 7, 2, L.type === "king" ? L.trim : dark);
      ctx.globalAlpha = 1; return;
    }
    const air = !f.ground, run = Math.abs(f.vx) > 0.2 && f.ground, step = run ? Math.floor(t / 6) % 2 : 0;
    const bob = !run && !air && f.state !== "dance" ? Math.floor(t / 24) % 2 : 0, dance = f.state === "dance" ? Math.floor(t / 10) % 4 : -1;
    if (L.cape) p(-6, -16 + bob, 4, 12 - bob, L.cape);
    if (L.type === "hoodie") p(-7, -15 + bob, 3, 7, dark);                       // backpack
    /* legs and boots */
    const lA = air ? -2 : step ? -1 : 0, lB = air ? 0 : step ? 0 : -1;
    p(-4, -8 + (lA < 0 ? -1 : 0), 3, 7, dark); p(1, -8 + (lB < 0 ? -1 : 0), 3, 7, dark);
    p(-5 + (step ? -1 : 0), -2 + (lA < 0 ? -1 : 0), 4, 2, "#1c1c24"); p(1 + (step ? 1 : 0), -2 + (lB < 0 ? -1 : 0), 4, 2, "#1c1c24");
    /* body */
    p(-5, -16 + bob, 10, 9, L.main); p(-5, -9 + bob, 10, 1, L.trim);
    if (L.type === "hoodie") { p(-1, -15 + bob, 2, 5, light); }
    if (L.type === "helmet" || L.type === "king") { p(-5, -16 + bob, 10, 2, light); }
    if (L.type === "bot") { p(-2, -14 + bob, 4, 3, L.trim); }
    /* arms: a dance waves them, healing holds a kit, otherwise the gun points forward */
    if (dance >= 0) {
      const up = dance % 2 === 0; p(-8, up ? -22 + bob : -14, 3, 7, L.main); p(5, up ? -14 : -22 + bob, 3, 7, L.main);
    } else if (f.state === "heal") {
      p(3, -13 + bob, 5, 3, L.main); p(6, -15 + bob, 5, 5, "#f8f9fa"); p(8, -14 + bob, 1, 3, "#e03131"); p(7, -13 + bob, 3, 1, "#e03131");
    } else {
      const kick = f.recoil > 0 ? -1 : 0;
      p(-7, -14 + bob, 3, 6, dark); p(3 + kick, -13 + bob, 6, 3, L.main); p(8 + kick, -14 + bob, 7, 3, L.gun); p(9 + kick, -11 + bob, 2, 2, L.gun);
      if (f.muzzle > 0) { p(15 + kick, -15 + bob, 3, 5, "#fff3a0"); p(18 + kick, -14 + bob, 2, 3, "#ffb703"); }
    }
    /* head */
    const hy = -24 + bob;
    if (L.type === "bot") {
      p(-4, hy, 9, 8, L.skin); p(-4, hy, 9, 2, shade(L.skin, 0.4)); p(-3, hy + 3, 7, 3, "#10151f"); p(0, hy + 4, 2, 1, L.eye); p(3, hy + 4, 1, 1, L.eye);
      p(0, hy - 3, 1, 3, "#868e96"); p(-1, hy - 4, 3, 1, L.trim);
    } else {
      p(-4, hy + 1, 8, 7, L.skin);
      if (L.type === "hood") { p(-5, hy - 1, 10, 3, L.main); p(-5, hy, 3, 8, L.main); p(3, hy + 3, 2, 1, "#10151f"); p(0, hy + 3, 1, 1, "#10151f"); p(-1, hy + 6, 4, 1, shade(L.skin, -0.25)); }
      if (L.type === "helmet") { p(-5, hy - 1, 10, 4, L.main); p(-5, hy - 1, 3, 9, L.main); p(-1, hy + 3, 6, 2, L.visor); p(-1, hy - 1, 2, 2, L.trim); }
      if (L.type === "hoodie") { p(-5, hy - 1, 9, 3, L.main); p(-5, hy, 3, 7, L.main); p(-1, hy + 2, 6, 2, L.visor); p(-1, hy + 2, 6, 1, shade(L.visor, 0.5)); p(0, hy + 6, 3, 1, "#b5654a"); }
      if (L.type === "king") { p(-4, hy - 1, 8, 2, "#5c3a21"); p(-4, hy - 4, 8, 3, L.trim); p(-4, hy - 5, 1, 1, L.trim); p(-1, hy - 5, 2, 1, L.trim); p(3, hy - 5, 1, 1, L.trim); p(-1, hy - 3, 2, 1, "#e03131");
        p(1, hy + 3, 1, 1, "#10151f"); p(3, hy + 3, 1, 1, "#10151f"); p(-1, hy + 6, 5, 2, "#5c3a21"); }
    }
    ctx.globalAlpha = 1;
  }
  const box = f => { const h = 48 * f.scale * (f.state === "heal" ? 0.8 : f.state === "knocked" || f.state === "ko" ? 0.4 : 1), w = 11 * f.scale * (f.state === "knocked" || f.state === "ko" ? 2.2 : 1); return { l: f.x - w, r: f.x + w, top: f.y - h, bot: f.y, head: f.y - h + Math.min(13 * f.scale, h * 0.35), h }; };

  function scene(ctx) {
    const bd = img(`../prac2/art/${R.bg}.webp`);
    if (ready(bd)) {
      const sc = H / bd.naturalHeight, w = bd.naturalWidth * sc;
      ctx.drawImage(bd, (W - w) / 2, 0, w, H);
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(13,19,48,.35)"); g.addColorStop(0.25, "rgba(13,19,48,0)"); g.addColorStop(1, "rgba(13,19,48,.25)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      for (let y = 0; y < H; y += 6) { const w2 = 14 + Math.round(6 * Math.sin(y / 14 + R.t / 18)); ctx.fillStyle = y % 12 ? "rgba(150,70,255,.5)" : "rgba(200,140,255,.55)"; ctx.fillRect(W - w2, y, w2, 6); }
      return;
    }
    const sky = { reading: ["#0f4c5c", "#5fb49c"], thinking: ["#3c1a6e", "#c86bba"], maths: ["#0b3d6b", "#47b5e6"], boss: ["#3a0d18", "#b33a3a"] }[R.k];
    const g = ctx.createLinearGradient(0, 0, 0, GROUND); g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(255,255,255,.7)"; for (let i = 0; i < 18; i++) { const x = (i * 97 + R.t * 0.05 * (1 + i % 3)) % W, y = (i * 53) % 120; ctx.fillRect(Math.round(x), y, 2, 2); }
    ctx.fillStyle = shade(sky[0], 0.15);                                                     // far hills, in big pixel steps
    for (let x = 0; x < W; x += 8) { const h = 40 + Math.round(18 * Math.sin(x / 47) + 10 * Math.sin(x / 19)); ctx.fillRect(x, GROUND - h, 8, h); }
    ctx.fillStyle = shade(sky[1], -0.35);
    for (let x = 0; x < W; x += 8) { const h = 18 + Math.round(10 * Math.sin(x / 31 + 2)); ctx.fillRect(x, GROUND - h, 8, h); }
    /* the storm wall creeping in at the right edge */
    for (let y = 0; y < GROUND; y += 6) { const w = 16 + Math.round(6 * Math.sin(y / 14 + R.t / 18)); ctx.fillStyle = y % 12 ? "rgba(150,70,255,.55)" : "rgba(200,140,255,.6)"; ctx.fillRect(W - w, y, w, 6); }
    /* ground */
    ctx.fillStyle = { reading: "#3f8f3a", thinking: "#6a5a8a", maths: "#d6b46b", boss: "#5a3a3a" }[R.k]; ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = "rgba(0,0,0,.18)"; for (let x = 0; x < W; x += 16) ctx.fillRect(x + ((x / 16) % 2) * 8, GROUND + 6, 8, 4);
    ctx.fillStyle = "rgba(255,255,255,.18)"; ctx.fillRect(0, GROUND, W, 2);
  }
  function wallDraw(ctx, w) {
    const x = Math.round(w.x - 6), top = GROUND - 76;
    ctx.fillStyle = "#a8692f"; ctx.fillRect(x, top, 12, 76);
    ctx.fillStyle = "#7a4a1f"; for (let y = top + 10; y < GROUND; y += 12) ctx.fillRect(x, y, 12, 2); ctx.fillRect(x + 5, top, 2, 76);
    if (w.hp < 3) { ctx.fillStyle = "#2b1a0c"; ctx.fillRect(x + 2, top + 14, 3, 8); ctx.fillRect(x + 7, top + 34, 3, 6); }
    if (w.hp < 2) { ctx.fillRect(x + 1, top + 4, 4, 4); ctx.fillRect(x + 6, top + 22, 4, 10); }
    ctx.strokeStyle = "#2b1a0c"; ctx.lineWidth = 2; ctx.strokeRect(x, top, 12, 76);
  }
  function text(ctx, s, x, y, size, col, align = "center") {
    ctx.font = `900 ${size}px "Arial Black", Impact, monospace`; ctx.textAlign = align; ctx.lineWidth = Math.max(3, size / 4); ctx.strokeStyle = "#0d1330";
    ctx.strokeText(s, x, y); ctx.fillStyle = col; ctx.fillText(s, x, y);
  }
  function hud(ctx) {
    const M = S.match, o = R.o;
    const barAt = (x, y, w, v, max, col) => { ctx.fillStyle = "#0d1330"; ctx.fillRect(x - 2, y - 2, w + 4, 12); ctx.fillStyle = "#3a3f52"; ctx.fillRect(x, y, w, 8); ctx.fillStyle = col; ctx.fillRect(x, y, Math.round(w * Math.max(0, v) / max), 8); };
    text(ctx, "YOU", 10, 16, 11, "#fff", "left");
    barAt(10, 22, 120, M.hp, MAXHP, "#40c057"); if (M.shield > 0) barAt(10, 34, 120 * MAXSH / MAXHP, M.shield, MAXSH, "#4dabf7");
    for (let i = 0; i < Math.min(R.ammo, 12); i++) { ctx.fillStyle = "#ffd43b"; ctx.fillRect(12 + i * 9, 48, 5, 9); ctx.fillStyle = "#e67700"; ctx.fillRect(12 + i * 9, 48, 5, 3); }
    if (R.kind === "finish") text(ctx, "∞", 14, 58, 12, "#ffd43b", "left");
    if (R.mode === "gun") for (let i = 0; i < R.walls; i++) { ctx.fillStyle = "#a8692f"; ctx.fillRect(12 + i * 12, 62, 9, 9); ctx.fillStyle = "#7a4a1f"; ctx.fillRect(12 + i * 12, 66, 9, 1); }
    text(ctx, o.name.toUpperCase().slice(0, 20), W - 10, 16, 11, "#fff", "right");
    if (o.kind === "reading" && !o.boss) {
      if (R.kind === "finish" || o.dead) text(ctx, o.dead ? "ELIMINATED" : "KNOCKED!", W - 10, 34, 12, "#ff6b6b", "right");
      else { for (let i = 0; i < o.max; i++) { ctx.fillStyle = "#0d1330"; ctx.fillRect(W - 12 - (o.max - i) * 16, 22, 14, 10); ctx.fillStyle = i < o.hp ? "#ff6b6b" : "#3a3f52"; ctx.fillRect(W - 11 - (o.max - i) * 16, 23, 12, 8); }
        text(ctx, "Hits give you shield", W - 10, 46, 9, "#9fe7ff", "right"); }
    } else barAt(W - 130, 22, 120, o.hp, o.max, "#ff6b6b");
  }
  function draw() {
    const cv = document.getElementById("pix"); if (!cv || !R) return;
    const ctx = cv.getContext("2d"); ctx.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    ctx.save(); if (R.shake > 0) ctx.translate(Math.round((Math.random() - 0.5) * R.shake), Math.round((Math.random() - 0.5) * R.shake));
    if (R.mode !== "gun") {
      MODE_FN[R.mode].draw(ctx);
      R.floats.forEach(f => text(ctx, f.s, f.x, f.y, f.size, f.c));
      ctx.restore(); hud(ctx);
      if (R.banner) text(ctx, R.banner.s, W / 2, 120, R.banner.size || 34, R.banner.c || "#ffe81a");
      if (R.t < 260 && !R.banner) text(ctx, MODES[R.mode].help, W / 2, H - 10, 10, "#fff");
      return;
    }
    scene(ctx);
    R.wallsUp.forEach(w => wallDraw(ctx, w));
    /* the opponent's aim line */
    const F = R.F, P = R.P;
    if (F.state === "aim") { const a = F.st / F.aimLen; ctx.strokeStyle = `rgba(255,40,40,${0.35 + 0.5 * a})`; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(F.x - 27 * F.scale, F.y - 34 * F.scale); ctx.lineTo(0, F.lockY); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, "!", F.x, F.y - 58 * F.scale, 18, "#ff4d4d"); }
    if (F.state === "throw") text(ctx, "!", F.x, F.y - 58 * F.scale, 18, "#ffa94d");
    R.nades.forEach(g => { ctx.fillStyle = "#2f3b2f"; ctx.fillRect(Math.round(g.x - 4), Math.round(g.y - 4), 8, 8); ctx.fillStyle = g.fuse > 0 && g.fuse % 8 < 4 ? "#ff4d4d" : "#9be15d"; ctx.fillRect(Math.round(g.x - 1), Math.round(g.y - 6), 3, 3); });
    fighter(ctx, P); fighter(ctx, F);
    if (F.state === "dance" || F.state === "emote") text(ctx, "♪", F.x + 18, F.y - 60 * F.scale - (R.t % 30) / 3, 16, "#ff8cc6");
    if (P.emoteT > 0) text(ctx, "♪", P.x - 18, P.y - 60 * P.scale - (R.t % 30) / 3, 16, "#ff8cc6");
    if (F.state === "heal") { const k = F.st / 100; ctx.fillStyle = "#0d1330"; ctx.fillRect(F.x - 20, F.y - 64 * F.scale, 40, 6); ctx.fillStyle = "#69db7c"; ctx.fillRect(F.x - 19, F.y - 63 * F.scale, Math.round(38 * k), 4); }
    R.bullets.forEach(b => { ctx.fillStyle = b.who === "p" ? (b.head ? "#ffe066" : "#fff3bf") : "#ff8787"; ctx.fillRect(Math.round(b.x - 4), Math.round(b.y - 1), 8, 3); });
    R.parts.forEach(q => { ctx.fillStyle = q.c; ctx.fillRect(Math.round(q.x), Math.round(q.y), q.s, q.s); });
    /* the crosshair: it sweeps up and down; red means it is on the head */
    if (R.ammo > 0 || R.kind === "finish") if (!["ko"].includes(F.state)) {
      const y = aimY(), head = inHead(y), c = head ? "#ff3b3b" : "#ffffff", x = F.x;
      ctx.strokeStyle = "#0d1330"; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.stroke();
      ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.stroke();
      ctx.fillStyle = c; ctx.fillRect(x - 13, y - 1, 6, 2); ctx.fillRect(x + 7, y - 1, 6, 2); ctx.fillRect(x - 1, y - 13, 2, 6); ctx.fillRect(x - 1, y + 7, 2, 6);
    }
    R.floats.forEach(f => text(ctx, f.s, f.x, f.y, f.size, f.c));
    ctx.restore();
    hud(ctx);
    if (R.banner) text(ctx, R.banner.s, W / 2, 120, R.banner.size || 34, R.banner.c || "#ffe81a");
    if (R.t < 260 && !R.banner) text(ctx, "← → move   ↑ jump   J shoot   K build   1–5 dance" + (S.items.boogie ? "   B boogie" : ""), W / 2, H - 10, 10, "#fff");
  }

  /* ---------- the fight ---------- */
  const SWEEP = 100;
  function aimY() { const b = box(R.F), top = b.top - 12, span = b.h + 12; return top + span * (1 + Math.sin(R.phase)) / 2; }
  function inHead(y) { const b = box(R.F); return y >= b.top && y <= b.head; }
  const shotDmg = () => Math.round(gun().dmg / 5);
  const fireGap = () => ({ pistol: 18, shotgun: 26, minigun: 9 }[S.gun] || 18);
  function float(s, x, y, c, size = 14) { R.floats.push({ s, x, y, c, size, life: 60 }); }
  function burst(x, y, c, n = 8, sp = 2.5) { for (let i = 0; i < n; i++) R.parts.push({ x, y, vx: (Math.random() - 0.5) * sp * 2, vy: -Math.random() * sp * 1.6, life: 22 + rnd(14), c, s: 2 + rnd(2) }); }
  function meHurt(d, x, y) {
    const M = S.match; d = Math.min(d, M.hp + M.shield - 1);     // the arena can hurt, but never knock you out: only wrong answers can
    if (d <= 0) { float("0", x, y, "#fff"); return; }
    const sh = Math.min(M.shield, d); M.shield -= sh; M.hp -= d - sh; R.stats.taken += d;
    if (sh) float("−" + sh, x - 8, y, "#74c0fc"); if (d - sh) float("−" + (d - sh), x + 8, y - 10, "#ff6b6b");
    R.P.flash = 24; R.P.hitT = 14; beep([[220, .08, "sawtooth"]]);
  }
  function hitFoe(head, x, y) {
    const o = R.o, F = R.F, st = R.stats;
    st.hits++; if (head) st.heads++;
    F.flash = 16; F.hitT = 14; F.vx += 2.2; burst(x, y, head ? "#ffe066" : "#ffffff", head ? 14 : 8); if (head) R.shake = 8;
    if (F.state === "heal") { F.state = "move"; F.st = 0; F.cd = 40; float("INTERRUPTED!", F.x, F.y - 80, "#69db7c", 12); }
    if (R.kind === "finish") { o.hp = 0; float("ELIMINATED!", F.x, F.y - 70, "#ffe066", 16); return down(); }
    if (R.kind === "skirm") {                                     // reading: the bars come only from right answers; hits charge your shield
      const add = Math.min(MAXSH - S.match.shield, head ? 6 : 3); S.match.shield += add; st.siphon += add;
      float(head ? "HEADSHOT!" : "HIT!", F.x, F.y - 70, head ? "#ffe066" : "#fff", head ? 16 : 13); if (add) float("+" + add + " shield", R.P.x, R.P.y - 70, "#74c0fc", 11);
      beep(head ? SND.head : SND.hit); return;
    }
    const d = shotDmg() * (head ? 2 : 1); st.dmg += Math.min(d, o.hp); o.hp = Math.max(0, o.hp - d);
    float((head ? "HEADSHOT " : "") + d, F.x + (head ? 0 : rnd(16) - 8), (head ? F.y - 80 : F.y - 60), head ? "#ffe066" : "#ffffff", head ? 18 : 15);
    beep(head ? SND.head : SND.hit);
    if (o.hp <= 0) down();
  }
  function down() {
    const o = R.o; foeDown(o); R.F.state = "ko"; R.F.vx = 3; R.koAt = R.t; R.P.state = "dance"; R.shake = 12; R.banner = { s: o.boss ? "VICTORY!" : "ELIMINATED!", size: 32 };
    burst(R.F.x, R.F.y - 30, "#ffe066", 30, 4); beep(SND.win);
  }
  function shoot() {
    const P = R.P, F = R.F;
    if (P.cd > 0 || (R.ammo <= 0 && R.kind !== "finish") || F.state === "ko") return;
    if (R.kind !== "finish") R.ammo--;
    R.stats.shots++; P.cd = fireGap(); P.muzzle = 5; P.recoil = 6;
    const sx = P.x + 27 * P.scale, sy = P.y - 34 * P.scale, ty = aimY(), head = inHead(ty), dx = F.x - sx, dy = ty - sy, n = Math.hypot(dx, dy) || 1;
    R.bullets.push({ who: "p", x: sx, y: sy, vx: 10 * dx / n, vy: 10 * dy / n, head });
    beep([[S.gun === "shotgun" ? 180 : 520, .04, "square"]]);
  }
  function build(who) {
    const isP = who === "p", f = isP ? R.P : R.F;
    if (isP ? R.walls <= 0 : R.foeWalls <= 0) return;
    if (R.wallsUp.some(w => w.who === who)) return;
    const x = isP ? f.x + 34 : f.x - 30 * f.scale;
    if (isP && x > R.F.x - 30) return;
    if (isP) R.walls--; else R.foeWalls--;
    f.buildT = 18; R.wallsUp.push({ who, x, hp: 3 }); burst(x, GROUND - 30, "#c98a4b", 10); beep([[330, .05], [440, .05]]);
  }
  function emote(f, which) {
    const i = which === "r" ? rnd(EMOTES.length) : Math.max(0, Math.min(EMOTES.length - 1, which - 1));
    f.emote = EMOTES[i].id; f.emoteT = 150; f.t = 0;
    float(EMOTES[i].name + "!", f.x, f.y - 92 * f.scale / 1.75, "#ff8cc6", 13); beep([[659, .07], [784, .07], [988, .1]]);
  }
  function boogie() {
    const F = R.F;
    if (!S.items.boogie || F.state === "dance" || F.state === "ko" || R.kind === "finish") return;
    S.items.boogie--; F.state = "dance"; F.st = 180; F.vx = 0; float("BOOGIE!", F.x, F.y - 80, "#ff8cc6", 16); beep([[523, .08], [659, .08], [784, .08], [659, .08]]);
  }
  function foeThink() {
    const F = R.F, P = R.P, s = R.o.stage, o = R.o;
    if (F.state === "ko") return;
    if (F.state === "hold") { F.vx = 0; return; }   // only used by the checks
    if (F.state === "knocked") { F.vx = F.x < 440 ? 0.25 : 0; return; }
    if (F.state === "dance") { F.vx = 0; if (--F.st <= 0) { F.state = "move"; F.cd = 30; } return; }
    if (F.state === "emote") { F.vx = 0; if (++F.st >= 110) { F.state = "move"; F.cd = 40; } return; }
    if (F.state === "heal") { F.vx = 0; if (++F.st >= 100) { const h = Math.min(10, o.max - o.hp); o.hp += h; F.state = "move"; F.cd = 60; float("+" + h, F.x, F.y - 70, "#69db7c", 15); } return; }
    if (F.state === "aim") {
      F.vx = 0; if (++F.st >= F.aimLen) {
        F.state = "move"; F.cd = 90 - 10 * s + rnd(60); F.muzzle = 5;
        const sx = F.x - 27 * F.scale, sy = F.y - 34 * F.scale, n = Math.hypot(sx - P.x, sy - F.lockY) || 1;
        R.bullets.push({ who: "f", x: sx, y: sy, vx: -8 * (sx - P.x) / n, vy: -8 * (sy - F.lockY) / n }); beep([[300, .05, "square"]]);
      } return;
    }
    if (F.state === "throw") {
      F.vx = 0; if (++F.st >= 22) {
        const sx = F.x - 10, sy = F.y - 40 * F.scale, tx = P.x + (Math.random() - 0.5) * 30, fly = 40;
        R.nades.push({ x: sx, y: sy, vx: (tx - sx) / fly, vy: (GROUND - 4 - sy) / fly - GRAV * fly / 2, fuse: -1 });
        F.state = "move"; F.cd = 90 - 10 * s + rnd(60);
      } return;
    }
    /* moving: strafe, dodge incoming shots, build when under fire, then pick the next move */
    if (Math.abs(F.x - F.tx) < 4) F.tx = 250 + rnd(200);
    F.vx = Math.sign(F.tx - F.x) * (1 + 0.15 * s);
    const incoming = R.bullets.some(b => b.who === "p" && b.x > F.x - 150 && b.x < F.x);
    if (incoming && F.ground && Math.random() < 0.012 * s) { F.vy = -6.2; F.ground = false; }
    if (incoming && Math.random() < 0.006 * s) build("f");
    if (--F.cd <= 0) {
      const r = Math.random(), canHeal = o.kind !== "reading" && !o.boss ? o.hp < o.max : o.boss && o.hp < o.max;
      if (r < 0.45) { F.state = "aim"; F.st = 0; F.aimLen = 60 - 6 * s; F.lockY = P.y - 26 * P.scale; }
      else if (r < 0.72) { F.state = "throw"; F.st = 0; }
      else if (r < 0.86 && canHeal && R.kind === "fight") { F.state = "heal"; F.st = 0; }
      else if (r < 0.96) { const e = EMOTES[rnd(EMOTES.length)]; F.state = "emote"; F.emote = e.id; F.st = 0; F.t = 0; float(e.name + "!", F.x, F.y - 92 * F.scale / 1.75, "#ff8cc6", 13); }   // a taunt: a free shot for you
      else F.cd = 40;
    }
  }
  function physics(f) {
    f.vy += GRAV; f.x += f.vx; f.y += f.vy;
    if (f.y >= GROUND) { f.y = GROUND; f.vy = 0; f.ground = true; }
    f.t++; if (f.flash > 0) f.flash--; if (f.hitT > 0) f.hitT--; if (f.buildT > 0) f.buildT--; if (f.cd > 0 && f === R.P) f.cd--; if (f.muzzle > 0) f.muzzle--; if (f.recoil > 0) f.recoil--;
  }
  function tick() {
    const P = R.P, F = R.F, M = S.match, s = R.o.stage;
    R.t++; R.phase += 2 * Math.PI / SWEEP; if (R.shake > 0) R.shake -= 0.5;
    if (R.banner && R.banner.until && R.t >= R.banner.until) R.banner = R.banner.s === "READY?" ? { s: "FIGHT!", size: 38, until: 75 } : null;
    const live = R.t > 70 && F.state !== "ko";
    if (R.mode !== "gun") {
      const busy = MODE_FN[R.mode].tick(live);
      R.parts.forEach(q => { q.x += q.vx; q.y += q.vy; q.vy += 0.15; q.life--; }); R.parts = R.parts.filter(q => q.life > 0);
      R.floats.forEach(f => { f.y -= 0.6; f.life--; }); R.floats = R.floats.filter(f => f.life > 0);
      return roundEnd(busy);
    }
    /* you */
    P.vx = 0;
    if (live) {
      if (KEYS.emote) { if (P.ground) emote(P, KEYS.emote); KEYS.emote = false; }
      if (P.emoteT > 0 && (KEYS.left || KEYS.right || KEYS.jump || KEYS.shoot || KEYS.build)) P.emoteT = 0;   // moving or shooting stops the dance
      if (P.emoteT > 0) P.emoteT--;
      else {
        if (KEYS.left) P.vx = -2.4; if (KEYS.right) P.vx = 2.4;
        if (KEYS.jump && P.ground) { P.vy = -6.8; P.ground = false; }
        if (KEYS.shoot) shoot();
        if (KEYS.build) { build("p"); KEYS.build = false; }
      }
      if (KEYS.boogie) { boogie(); KEYS.boogie = false; }
    }
    physics(P); P.x = Math.max(30, Math.min(P.x, F.x - 120));
    const myWall = R.wallsUp.find(w => w.who === "p"); if (myWall && P.x > myWall.x - 18) P.x = myWall.x - 18;
    /* the opponent */
    if (live) foeThink(); else if (F.state !== "ko") F.vx = 0;
    if (F.state === "ko") F.vx *= 0.9;
    physics(F); F.x = Math.max(P.x + 120, Math.min(F.x, 444));
    /* bullets */
    for (const b of R.bullets) {
      b.x += b.vx; b.y += b.vy;
      const w = R.wallsUp.find(w => w.who !== b.who && Math.abs(b.x - w.x) < 7 && b.y > GROUND - 76);
      if (w) { b.dead = true; w.hp--; burst(b.x, b.y, "#c98a4b", 5); if (w.who === "p") { R.stats.blocked++; float("BLOCKED", w.x, GROUND - 84, "#ffd8a8", 10); } continue; }
      if (b.who === "p") {
        const bx = box(F);
        if (F.state !== "ko" && b.x >= bx.l && b.x <= bx.r + 10 && b.y >= bx.top - 2 && b.y <= bx.bot) { b.dead = true; hitFoe(b.head && b.y <= bx.head + 3, b.x, b.y); }
      } else {
        const bx = box(P);
        if (b.x >= bx.l - 6 && b.x <= bx.r && b.y >= bx.top && b.y <= bx.bot) { b.dead = true; meHurt(3 + s, P.x, P.y - 80); }
      }
      if (b.x < -10 || b.x > W + 10 || b.y > GROUND + 4 || b.y < -40) { if (b.who === "p" && !b.dead) R.stats.missed++; b.dead = true; }
    }
    R.bullets = R.bullets.filter(b => !b.dead);
    R.wallsUp = R.wallsUp.filter(w => { if (w.hp <= 0) burst(w.x, GROUND - 30, "#a8692f", 14, 3); return w.hp > 0; });
    /* grenades: fly, sit fizzing, then blow up (jump or move away) */
    nadeTick();
    R.parts.forEach(q => { q.x += q.vx; q.y += q.vy; q.vy += 0.15; q.life--; }); R.parts = R.parts.filter(q => q.life > 0);
    R.floats.forEach(f => { f.y -= 0.6; f.life--; }); R.floats = R.floats.filter(f => f.life > 0);
    KEYS.shoot = KEYS.shoot && KEYS.hold;
    roundEnd(R.bullets.some(b => b.who === "p"));
  }
  /* the round ends when your shots are used up (or the opponent is down) */
  function roundEnd(busy) {
    if (!R) return;
    if (R.F.state === "ko") { if (R.t - R.koAt > 110) finish(); }
    else if (outOfShots() && !busy) { R.outAt = R.outAt || R.t; if (R.t - R.outAt === 1) R.banner = { s: "RELOAD!", size: 30, c: "#fff", until: R.t + 60 }; if (R.t - R.outAt > 50) finish(); }
  }
  function frame(ts) {
    if (!R) return;
    if (!R.manual) { acc += Math.min(100, ts - (last || ts)); last = ts; while (acc >= 1000 / 60 && R && !R.done) { tick(); acc -= 1000 / 60; } }
    if (!R) return;
    draw(); R.raf = requestAnimationFrame(frame);
  }
  function finish() {
    if (!R || R.done) return;
    const out = Object.assign({}, R.stats, { kind: R.kind, killed: R.o.dead, mode: R.mode }), cb = R.onEnd;
    R.done = true; cancelAnimationFrame(R.raf); unhook(); R = null;
    cb(out);
  }
  /* ---------- the other kinds of round (David, Nov 2026: "a sometimes alternative to the current battle") ----------
     Same ammo (a right answer loads 5, a wrong one 2), same damage per hit (double for the best hit), same
     reading showdowns and finishes, the same 1-health floor, and still no clock: a round ends when the shots run out.
     Each opponent has one kind of round (o.mode, chosen when the match is made), so the keys are learnt once.
     Everything drawn here (rocks, quad bikes, the ridge) is our own simple drawing. */
  const MODES = {
    gun: { name: "Gunfight", head: "headshot", help: "← → move   ↑ jump   J shoot   K build   1–5 dance",
      keys: "<kbd>←</kbd><kbd>→</kbd> move &nbsp; <kbd>↑</kbd> jump &nbsp; <kbd>J</kbd> shoot &nbsp; <kbd>K</kbd> build a wall &nbsp; <kbd>1</kbd>–<kbd>5</kbd> or <kbd>E</kbd> dance",
      tip: n => `The crosshair sweeps up and down. Shoot when it turns <b style="color:#e03131">red</b> over the head for a <b>headshot</b>: double damage. A red line means ${n} is aiming: jump or build. A grenade? Move or jump clear.`,
      pads: [["left", "◀"], ["right", "▶"], ["jump", "▲ Jump"], ["build", "🧱 Build", "padb"], ["shoot", "🔫 Shoot", "pads-shoot"], ["emote", "🕺 Dance"]] },
    snipe: { name: "Sniper Ridge", head: "headshot", help: "← → ↑ ↓ move the scope   J fire   hold K to duck",
      keys: "<kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> move the scope &nbsp; <kbd>J</kbd> fire &nbsp; hold <kbd>K</kbd> to duck",
      tip: n => `${n} runs between the rocks far below. Fire when the scope is on them: the crosshair turns <b style="color:#e03131">red</b> on the head for a <b>headshot</b>: double damage. Rocks stop your shots, but a head peeking over a rock can still be hit. A red glint means ${n} is aiming at you: hold <kbd>K</kbd> to duck.`,
      pads: [["left", "◀"], ["right", "▶"], ["jump", "▲"], ["down", "▼"], ["duck", "🪨 Duck", "padb"], ["shoot", "🎯 Fire", "pads-shoot"]] },
    lob: { name: "Grenade Lob", head: "direct hit", help: "← → move   ↑ ↓ aim   hold J, let go to throw",
      keys: "<kbd>←</kbd><kbd>→</kbd> move &nbsp; <kbd>↑</kbd><kbd>↓</kbd> aim &nbsp; hold <kbd>J</kbd> and let go to throw",
      tip: n => `${n} is hiding behind a wall. Aim with <kbd>↑</kbd><kbd>↓</kbd>, hold <kbd>J</kbd> to power up and let go to throw: lob it over the wall. Landing right on ${n} is a <b>direct hit</b>: double damage. A grenade on the wall only breaks the wall. Grenades coming back? Move out of the way.`,
      pads: [["left", "◀"], ["right", "▶"], ["jump", "▲ Aim"], ["down", "▼ Aim"], ["shoot", "💣 Hold, let go", "pads-shoot"]] },
    quad: { name: "Quad Chase", head: "bullseye ram", help: "↑ ↓ steer   J nitro ram",
      keys: "<kbd>↑</kbd><kbd>↓</kbd> steer &nbsp; <kbd>J</kbd> nitro ram",
      tip: n => `Chase ${n} down the track. Line up behind them and press <kbd>J</kbd> for a burst of nitro to ram them. Dead centre is a <b>bullseye ram</b>: double damage. Watch out for rocks and barrels: they spin you out. ${n} may swerve when you boost.`,
      pads: [["jump", "▲ Steer"], ["down", "▼ Steer"], ["shoot", "🔥 Nitro", "pads-shoot"]] },
  };
  let FORCE = null;   // only the checks set this
  const modeOf = o => FORCE || (o && o.mode) || "gun";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const tickOf = f => { f.t++; if (f.flash > 0) f.flash--; if (f.hitT > 0) f.hitT--; if (f.muzzle > 0) f.muzzle--; if (f.recoil > 0) f.recoil--; if (f.buildT > 0) f.buildT--; };
  function nadeTick() {   // the opponent's grenades: fly, sit fizzing, then blow up (move or jump clear)
    const P = R.P, s = R.o.stage;
    for (const g of R.nades) {
      if (g.fuse < 0) { g.vy += GRAV; g.x += g.vx; g.y += g.vy; if (g.y >= GROUND - 4) { g.y = GROUND - 4; g.fuse = 28; } }
      else if (--g.fuse <= 0) {
        g.dead = true; R.shake = 10; burst(g.x, g.y, "#ffa94d", 24, 3.5); burst(g.x, g.y, "#ffe066", 12, 2.5); beep([[90, .25, "sawtooth"]]);
        R.wallsUp.forEach(w => { if (Math.abs(w.x - g.x) < 46 && (R.mode === "gun" || w.who === "p")) w.hp = 0; });
        if (Math.abs(P.x - g.x) < 46 && P.y > GROUND - 20) meHurt(5 + s, P.x, P.y - 60); else if (Math.abs(P.x - g.x) < 70) { R.stats.dodged++; float("DODGED!", P.x, P.y - 70, "#9be15d", 11); }
      }
    }
    R.nades = R.nades.filter(g => !g.dead);
  }
  function foeNade() {   // the opponent lobs a grenade at you
    const F = R.F, P = R.P, sx = F.x - 10, sy = F.y - 40 * F.scale, tx = P.x + (Math.random() - 0.5) * 30, fly = 40;
    R.nades.push({ x: sx, y: sy, vx: (tx - sx) / fly, vy: (GROUND - 4 - sy) / fly - GRAV * fly / 2, fuse: -1 });
  }
  function foeEmote(F) { const e = EMOTES[rnd(EMOTES.length)]; F.state = "emote"; F.emote = e.id; F.st = 0; F.t = 0; float(e.name + "!", F.x, F.y - 92 * F.scale / 1.75, "#ff8cc6", 13); }
  const outOfShots = () => R.kind !== "finish" && R.ammo <= 0;
  const canFire = () => (R.ammo > 0 || R.kind === "finish") && R.F.state !== "ko";
  const useShot = () => { if (R.kind !== "finish") R.ammo--; R.stats.shots++; };

  /* ----- Sniper Ridge: you're on a ridge with a scope; the opponent runs between rocks far below ----- */
  const FAR = 196, ROCKS = [120, 240, 360], ROCK_W = 50, ROCK_H = 38;
  const inRock = (x, y) => ROCKS.some(r => y <= FAR + 6 && ((x - r) / (ROCK_W / 2)) ** 2 + ((y - FAR) / ROCK_H) ** 2 < 1);
  const sway = () => [R.sn.x + 5 * Math.sin(R.t / 23), R.sn.y + 4 * Math.sin(R.t / 31 + 1)];
  function snInit() {
    R.sn = { x: 240, y: 140, cd: 0, duck: false, flashT: 0, fx: 0, fy: 0 };
    Object.assign(R.F, { scale: 1, y: FAR, gy: FAR, x: R.kind === "finish" ? 290 : ROCKS[1], tx: ROCKS[1], hold: 80, stopAt: null });
    if (R.kind !== "finish") R.F.state = "hide";
  }
  function snFire() {
    const sn = R.sn, F = R.F;
    if (sn.cd > 0 || !canFire()) return;
    useShot(); sn.cd = 34; sn.flashT = 6; R.shake = 4;
    const [x, y] = sway(); sn.fx = x; sn.fy = y; beep([[140, .09, "square"], [90, .05]]);
    const b = box(F);
    if (inRock(x, y)) { R.stats.missed++; burst(x, y, "#c8c0b0", 9); float("ROCK!", x, y - 12, "#ffd8a8", 11); return; }
    if (x >= b.l - 3 && x <= b.r + 3 && y >= b.top - 3 && y <= b.bot) return hitFoe(y <= b.head + 1, x, y);
    R.stats.missed++; burst(x, Math.min(y, FAR + 40), "#c9b48a", 6); float("MISS", x, y - 12, "#fff", 11);
  }
  function snFoe(live) {
    const F = R.F, s = R.o.stage, sn = R.sn;
    if (F.state === "ko") { F.vx *= 0.9; return; }
    if (!live || F.state === "hold") { F.vx = 0; return; }
    if (F.state === "knocked") { F.vx = F.x < 440 ? 0.15 : 0; F.dir = 1; return; }
    if (F.state === "emote") { F.vx = 0; if (++F.st >= 110) { F.state = "run"; F.tx = ROCKS.reduce((a, r) => Math.abs(r - F.x) < Math.abs(a - F.x) ? r : a); } return; }
    if (F.state === "aim") {
      F.vx = 0; F.dir = -1;
      if (++F.st >= 75 - 7 * s) {
        F.muzzle = 6; beep([[300, .06, "square"]]);
        if (sn.duck) { R.stats.dodged++; float("DUCKED!", W / 2, 150, "#9be15d", 14); } else meHurt(3 + s, W / 2, 160);
        F.state = "hide"; F.st = 0; F.hold = 50 + rnd(60);
      }
      return;
    }
    if (F.state === "hide" || F.state === "look") {
      F.vx = 0;
      if (++F.st >= F.hold) {
        const r = Math.random();
        if (F.state === "hide" && R.t > 140 && r < 0.2 + 0.05 * s) { F.state = "aim"; F.st = 0; }
        else if (F.state === "look" && r < 0.3) foeEmote(F);                       // a taunt in the open: a free shot for you
        else {
          const others = ROCKS.filter(x => Math.abs(x - F.x) > 20);
          F.tx = others[rnd(others.length)]; F.state = "run"; F.st = 0;
          F.stopAt = Math.random() < 0.55 ? Math.round((F.x + F.tx) / 2) : null;    // sometimes stops halfway to look around
        }
      }
      return;
    }
    if (F.state === "run") {
      const sp = 1.1 + 0.25 * s; F.vx = Math.sign(F.tx - F.x) * sp; F.dir = F.vx > 0 ? 1 : -1;
      if (F.stopAt !== null && Math.abs(F.x - F.stopAt) <= sp) { F.stopAt = null; F.state = "look"; F.st = 0; F.hold = 55 + rnd(40) - 6 * s; F.vx = 0; }
      else if (Math.abs(F.x - F.tx) <= sp) { F.x = F.tx; F.vx = 0; F.state = "hide"; F.st = 0; F.hold = 60 + rnd(70); }
      return;
    }
    F.state = "hide"; F.st = 0; F.hold = 40;
  }
  function snTick(live) {
    const sn = R.sn, F = R.F;
    sn.duck = live && !!KEYS.build;
    if (live && !sn.duck) {
      const v = 2.6;
      if (KEYS.left) sn.x -= v; if (KEYS.right) sn.x += v; if (KEYS.jump) sn.y -= v; if (KEYS.down) sn.y += v;
      sn.x = clamp(sn.x, 16, W - 16); sn.y = clamp(sn.y, 60, H - 20);
      if (KEYS.shoot) snFire();
    }
    if (sn.cd > 0) sn.cd--; if (sn.flashT > 0) sn.flashT--;
    snFoe(live); F.x = clamp(F.x + F.vx, 60, 450); tickOf(F); tickOf(R.P);
    KEYS.shoot = KEYS.shoot && KEYS.hold;
    return sn.cd > 12;
  }
  function rockDraw(ctx, x) {
    ctx.fillStyle = "#6f6a63"; ctx.beginPath(); ctx.ellipse(x, FAR + 2, ROCK_W / 2, ROCK_H, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#8d877e"; ctx.beginPath(); ctx.ellipse(x - 6, FAR - 4, ROCK_W / 2 - 10, ROCK_H - 10, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#5a554f"; ctx.fillRect(x - ROCK_W / 2, FAR, ROCK_W, 4);
    ctx.strokeStyle = "#2b2824"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, FAR + 2, ROCK_W / 2, ROCK_H, 0, Math.PI, 0); ctx.stroke();
  }
  function snDraw(ctx) {
    const F = R.F, sn = R.sn, [x, y] = sway();
    scene(ctx);
    const g = ctx.createLinearGradient(0, FAR - 30, 0, H); g.addColorStop(0, "rgba(74,110,58,0)"); g.addColorStop(0.18, "rgba(74,110,58,.92)"); g.addColorStop(1, "rgba(52,80,40,.96)");
    ctx.fillStyle = g; ctx.fillRect(0, FAR - 30, W, H);                                   // the field far below
    fighter(ctx, F);
    ROCKS.forEach(r => rockDraw(ctx, r));
    ctx.fillStyle = "#3b2f25"; ctx.beginPath(); ctx.moveTo(0, H);                        // our ridge in front
    for (let i = 0; i <= 24; i++) ctx.lineTo(i * W / 24, 248 + 6 * Math.sin(i * 1.7) + (i % 3) * 2); ctx.lineTo(W, H); ctx.fill();
    ctx.fillStyle = "#4f6b2f"; for (let i = 0; i < 18; i++) ctx.fillRect(i * 28 + 6, 244 + 5 * Math.sin(i * 1.7), 3, 6);
    R.parts.forEach(q => { ctx.fillStyle = q.c; ctx.fillRect(Math.round(q.x), Math.round(q.y), q.s, q.s); });
    if (sn.duck) {
      ctx.fillStyle = "rgba(5,8,20,.9)"; ctx.fillRect(0, 0, W, H); text(ctx, "DUCKING…", W / 2, H / 2, 20, "#9fe7ff");
    } else {
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.arc(x, y, 62, 0, Math.PI * 2, true); ctx.fillStyle = "rgba(5,8,20,.8)"; ctx.fill("evenodd"); ctx.restore();
      const b = box(F), head = F.state !== "ko" && !inRock(x, y) && x >= b.l - 3 && x <= b.r + 3 && y >= b.top - 3 && y <= b.head + 1, c = head ? "#ff3b3b" : "#e9f7ff";
      ctx.strokeStyle = "#0d1330"; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(x, y, 62, 0, 7); ctx.stroke();
      ctx.strokeStyle = "#5c677d"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 62, 0, 7); ctx.stroke();
      ctx.fillStyle = c; ctx.fillRect(x - 58, y - 0.75, 50, 1.5); ctx.fillRect(x + 8, y - 0.75, 50, 1.5); ctx.fillRect(x - 0.75, y - 58, 1.5, 50); ctx.fillRect(x - 0.75, y + 8, 1.5, 50);
      ctx.beginPath(); ctx.arc(x, y, 2, 0, 7); ctx.fill();
      if (sn.flashT > 0) { ctx.fillStyle = `rgba(255,243,160,${sn.flashT / 7})`; ctx.beginPath(); ctx.arc(sn.fx, sn.fy, 10 - sn.flashT, 0, 7); ctx.fill(); }
      if (sn.cd > 0) text(ctx, "RELOADING", x, y + 80, 10, "#ffd43b");
    }
    if (F.state === "aim") {                                                                // the glint: duck!
      const k = 4 + 3 * Math.abs(Math.sin(R.t / 4)), gx = F.x - 4, gy = F.y - 40;
      ctx.fillStyle = "#ff2b2b"; ctx.beginPath(); ctx.moveTo(gx - k * 2, gy); ctx.lineTo(gx, gy - k / 2); ctx.lineTo(gx + k * 2, gy); ctx.lineTo(gx, gy + k / 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(gx, gy - k * 2); ctx.lineTo(gx + k / 2, gy); ctx.lineTo(gx, gy + k * 2); ctx.lineTo(gx - k / 2, gy); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(gx, gy, 2, 0, 7); ctx.fill();
      text(ctx, "HOLD K: DUCK!", W / 2, 76, 13, "#ff6b6b");
    }
    if (F.state === "emote") text(ctx, "♪", F.x + 12, F.y - 56 - (R.t % 30) / 3, 14, "#ff8cc6");
  }

  /* ----- Grenade Lob: side-on again, but you lob grenades over the opponent's wall ----- */
  const hand = () => [R.P.x + 16, R.P.y - 72];
  function lbInit() {
    R.lb = { ang: 50, pow: 0, pdir: 1, charging: false, g: null };
    R.P.x = 80; R.F.x = 392; R.F.tx = 392; R.F.cd = 150;
    if (R.kind !== "finish") R.wallsUp.push({ who: "f", x: 300, hp: 3 });
  }
  function lbLand(v, a) {   // where a throw would come down (for the opponent's dodge and the checks)
    let [x, y] = hand(), vx = v * Math.cos(a), vy = -v * Math.sin(a);
    for (let i = 0; i < 400; i++) { vy += GRAV; x += vx; y += vy; if (R.wallsUp.some(w => Math.abs(x - w.x) < 8 && y > GROUND - 76)) return { x, wall: true }; if (y >= GROUND - 3) return { x, wall: false }; }
    return { x, wall: false };
  }
  const lbSpeed = p => 4.5 + 7 * p;
  function lbThrow() {
    const lb = R.lb, P = R.P, F = R.F, v = lbSpeed(lb.pow), a = lb.ang * Math.PI / 180, [sx, sy] = hand();
    useShot(); lb.g = { x: sx, y: sy, vx: v * Math.cos(a), vy: -v * Math.sin(a), r: 0 };
    P.recoil = 6; lb.pow = 0; lb.pdir = 1; beep([[260, .05], [200, .05]]);
    const land = lbLand(v, a);   /* the opponent may see it coming and run */
    if (F.state === "move" && !land.wall && Math.abs(land.x - F.x) < 40 && Math.random() < 0.15 + 0.1 * R.o.stage) { F.tx = clamp(F.x + (F.x > 400 ? -90 : 90), 330, 444); float("!", F.x, F.y - 90, "#ffa94d", 16); }
  }
  function lbBoom(g, w) {
    const F = R.F; R.lb.g = null; R.shake = 8;
    burst(g.x, g.y, "#ffa94d", 22, 3.4); burst(g.x, g.y, "#ffe066", 10, 2.4); beep([[110, .2, "sawtooth"]]);
    if (w) { w.hp -= 2; R.stats.missed++; float(w.hp > 0 ? "WALL HIT" : "WALL DOWN!", w.x, GROUND - 90, "#ffd8a8", 11); return; }
    if (F.state === "ko") return;
    const dx = Math.abs(g.x - F.x), cover = R.wallsUp.some(v => v.hp > 0 && (v.x - g.x) * (v.x - F.x) < 0);
    if (!cover && dx < 16) return hitFoe(true, F.x, F.y - 40);
    if (!cover && dx < 44) return hitFoe(false, F.x, F.y - 40);
    R.stats.missed++; float("MISS", g.x, g.y - 20, "#fff", 11);
  }
  function lbFoe(live) {
    const F = R.F, s = R.o.stage, o = R.o;
    if (F.state === "ko") { F.vx *= 0.9; return; }
    if (!live || F.state === "hold") { F.vx = 0; return; }
    if (F.state === "knocked") { F.vx = F.x < 440 ? 0.25 : 0; return; }
    if (F.state === "dance") { F.vx = 0; if (--F.st <= 0) { F.state = "move"; F.cd = 30; } return; }
    if (F.state === "emote") { F.vx = 0; if (++F.st >= 110) { F.state = "move"; F.cd = 40; } return; }
    if (F.state === "throw") { F.vx = 0; F.dir = -1; if (++F.st >= 22) { foeNade(); F.state = "move"; F.cd = 150 - 15 * s + rnd(60); } return; }
    const w = R.wallsUp.find(v => v.who === "f");
    if (Math.abs(F.x - F.tx) < 3) F.tx = Math.random() < 0.4 && w ? w.x + 26 : 330 + rnd(114);
    F.vx = Math.sign(F.tx - F.x) * (0.9 + 0.15 * s); F.dir = -1;
    if (!w && R.foeWalls > 0 && Math.random() < 0.004 * s) { build("f"); }
    if (--F.cd <= 0) { const r = Math.random(); if (r < 0.6) { F.state = "throw"; F.st = 0; } else if (r < 0.85) foeEmote(F); else F.cd = 50; if (F.state !== "move") F.vx = 0; }
  }
  function lbTick(live) {
    const lb = R.lb, P = R.P, F = R.F;
    P.vx = 0;
    if (live) {
      if (KEYS.left) P.vx = -2; if (KEYS.right) P.vx = 2;
      if (KEYS.jump) lb.ang = Math.min(80, lb.ang + 0.8); if (KEYS.down) lb.ang = Math.max(15, lb.ang - 0.8);
      if (!lb.g && canFire() && KEYS.hold) { lb.charging = true; lb.pow += 0.02 * lb.pdir; if (lb.pow >= 1) { lb.pow = 1; lb.pdir = -1; } if (lb.pow <= 0) { lb.pow = 0; lb.pdir = 1; } }
      else if (lb.charging) { lb.charging = false; lbThrow(); }
    }
    physics(P); P.x = clamp(P.x, 30, 210);
    lbFoe(live); physics(F); F.x = clamp(F.x, 318, 444);
    const fw = R.wallsUp.find(v => v.who === "f"); if (fw && F.x < fw.x + 18) F.x = fw.x + 18;
    if (lb.g) {
      const g = lb.g; g.vy += GRAV; g.x += g.vx; g.y += g.vy; g.r += 0.3;
      const w = R.wallsUp.find(v => Math.abs(g.x - v.x) < 8 && g.y > GROUND - 76);
      if (w || g.y >= GROUND - 3) lbBoom(g, w); else if (g.x > W + 30) { lb.g = null; R.stats.missed++; }
    }
    nadeTick();
    R.wallsUp = R.wallsUp.filter(v => { if (v.hp <= 0) burst(v.x, GROUND - 30, "#a8692f", 14, 3); return v.hp > 0; });
    KEYS.shoot = false;
    return !!lb.g || lb.charging;
  }
  function lbDraw(ctx) {
    const lb = R.lb, P = R.P, F = R.F;
    scene(ctx);
    R.wallsUp.forEach(v => wallDraw(ctx, v));
    if (!lb.g && canFire() && R.t > 70) {                    // the start of the arc, as a dotted guide
      const v = lbSpeed(lb.charging ? lb.pow : 0.5), a = lb.ang * Math.PI / 180;
      let [x, y] = hand(), vx = v * Math.cos(a), vy = -v * Math.sin(a);
      ctx.fillStyle = lb.charging ? "rgba(255,232,26,.95)" : "rgba(255,255,255,.7)";
      for (let i = 0; i < 42; i++) { vy += GRAV; x += vx; y += vy; if (i % 3 === 2) { ctx.globalAlpha = 1 - i / 42; ctx.fillRect(Math.round(x - 1.5), Math.round(y - 1.5), 3, 3); } }
      ctx.globalAlpha = 1;
    }
    R.nades.forEach(g => { ctx.fillStyle = "#2f3b2f"; ctx.fillRect(Math.round(g.x - 4), Math.round(g.y - 4), 8, 8); ctx.fillStyle = g.fuse > 0 && g.fuse % 8 < 4 ? "#ff4d4d" : "#9be15d"; ctx.fillRect(Math.round(g.x - 1), Math.round(g.y - 6), 3, 3); });
    fighter(ctx, P); fighter(ctx, F);
    if (lb.g) { const g = lb.g; ctx.save(); ctx.translate(g.x, g.y); ctx.rotate(g.r); ctx.fillStyle = "#3d5a3d"; ctx.beginPath(); ctx.arc(0, 0, 5, 0, 7); ctx.fill(); ctx.fillStyle = "#c8d6a8"; ctx.fillRect(-1.5, -8, 3, 4); ctx.fillStyle = R.t % 8 < 4 ? "#ff4d4d" : "#ffe066"; ctx.fillRect(-1, -9, 2, 2); ctx.restore(); }
    if (lb.charging) {                                         // the power bar
      const bx = P.x - 40, by = P.y - 96; ctx.fillStyle = "#0d1330"; ctx.fillRect(bx - 2, by - 2, 10, 64); ctx.fillStyle = "#3a3f52"; ctx.fillRect(bx, by, 6, 60);
      const gr = ctx.createLinearGradient(0, by + 60, 0, by); gr.addColorStop(0, "#69db7c"); gr.addColorStop(0.6, "#ffd43b"); gr.addColorStop(1, "#ff6b6b"); ctx.fillStyle = gr; ctx.fillRect(bx, by + 60 - 60 * lb.pow, 6, 60 * lb.pow);
    }
    if (F.state === "throw") text(ctx, "!", F.x, F.y - 58 * F.scale, 18, "#ffa94d");
    if (F.state === "dance" || F.state === "emote") text(ctx, "♪", F.x + 18, F.y - 60 * F.scale - (R.t % 30) / 3, 16, "#ff8cc6");
    R.parts.forEach(q => { ctx.fillStyle = q.c; ctx.fillRect(Math.round(q.x), Math.round(q.y), q.s, q.s); });
  }

  /* ----- Quad Chase: a dirt track seen from above; steer in line and ram with nitro ----- */
  const LANES = [104, 160, 216], ROAD = [76, 244], BASE = 90;
  function qdInit() {
    R.qd = { scroll: 0, boost: false, back: false, v: 0, spin: 0, obs: [], next: 120 };
    Object.assign(R.P, { x: BASE, y: 160 });
    Object.assign(R.F, { x: 360, y: LANES[rnd(3)], cd: 90, rot: 0 }); R.F.ty = R.F.y;
  }
  function qdTick(live) {
    const q = R.qd, P = R.P, F = R.F, s = R.o.stage, speed = F.state === "knocked" ? 3 : 5;
    q.scroll += speed;
    if (live && q.spin <= 0) { if (KEYS.jump) P.y -= 2.4; if (KEYS.down) P.y += 2.4; }
    P.y = clamp(P.y, ROAD[0] + 14, ROAD[1] - 14);
    if (live && KEYS.shoot && !q.boost && !q.back && q.spin <= 0 && canFire()) {
      useShot(); q.boost = true; q.v = 7.5; beep([[180, .05, "sawtooth"], [360, .12, "sawtooth"]]);
      if (F.state === "move" && Math.random() < 0.12 + 0.1 * s) { const far = LANES.filter(l => Math.abs(l - P.y) >= 50); F.ty = far[rnd(far.length)]; float("SWERVE!", F.x, F.y - 26, "#ffa94d", 11); }
    }
    KEYS.shoot = false;
    if (q.boost) {
      P.x += q.v; q.v = Math.max(4.5, q.v - 0.04); burst(P.x - 26, P.y, "#ffb703", 1, 1.2);
      if (P.x >= F.x - 46) {
        const dy = Math.abs(P.y - F.y); q.boost = false; q.back = true;
        if (dy < 26 && F.state !== "ko") { R.shake = 8; P.x -= 12; F.x += 16; F.flash = 16; burst(F.x - 22, F.y, "#ffe066", 12, 3); hitFoe(dy < 9, F.x - 20, F.y); }
        else { R.stats.missed++; float("MISSED!", P.x + 20, P.y - 24, "#fff", 11); }
      }
    } else if (q.back) { P.x -= 2.5; if (P.x <= BASE) { P.x = BASE; q.back = false; } }
    /* the opponent weaves, swerves round rocks, sometimes stops weaving to taunt */
    if (F.state === "ko") { F.x += 1.6; F.rot += 0.25; }
    else {
      if (live && F.state === "move" && --F.cd <= 0) { if (Math.random() < 0.12) foeEmote(F); else { F.ty = LANES[rnd(3)]; F.cd = 70 + rnd(80) - 8 * s; } }
      if (F.state === "emote" && ++F.st >= 110) { F.state = "move"; F.cd = 40; }
      if (F.state === "move") for (const o of q.obs) if (o.x - F.x > 0 && o.x - F.x < 90 && Math.abs(o.y - F.ty) < 24) F.ty = LANES.reduce((a, l) => Math.abs(l - o.y) > Math.abs(a - o.y) ? l : a);
      const ms = 1.4 + 0.3 * s; if (F.state !== "hold") F.y += clamp(F.ty - F.y, -ms, ms);
      if (F.state !== "hold") F.x += (360 + 22 * Math.sin(R.t / 60) - F.x) * 0.03;
      if (F.state === "knocked" && R.t % 6 === 0) burst(F.x - 20, F.y, "#868e96", 2, 0.8);
    }
    /* rocks and barrels come down the track */
    if (live && R.kind !== "finish" && --q.next <= 0 && F.state !== "ko") { q.obs.push({ x: W + 20, y: LANES[rnd(3)] + rnd(16) - 8, kind: rnd(2) ? "rock" : "barrel" }); q.next = 100 + rnd(70) - 10 * s; }
    for (const o of q.obs) {
      o.x -= speed;
      if (!o.hit && Math.abs(o.x - P.x) < 26 && Math.abs(o.y - P.y) < 20) {
        o.hit = true; q.spin = 40; R.shake = 6; burst(o.x, o.y, o.kind === "rock" ? "#9a948b" : "#e8590c", 10, 2.5); float("SPIN OUT!", P.x, P.y - 26, "#ffa94d", 12);
        if (q.boost) { q.boost = false; q.back = true; R.stats.missed++; }
        meHurt(2 + s, P.x, P.y - 40);
      }
    }
    q.obs = q.obs.filter(o => o.x > -30 && !(o.hit && o.x < P.x - 40));
    if (q.spin > 0) q.spin--;
    if (live && R.t % 3 === 0) { burst(P.x - 24, P.y + (rnd(2) ? 9 : -9), "#d9b07a", 1, 0.6); if (F.state !== "ko") burst(F.x - 24, F.y + (rnd(2) ? 9 : -9), "#d9b07a", 1, 0.6); }
    R.parts.forEach(p => { p.x -= speed * 0.6; });
    tickOf(P); tickOf(F);
    return q.boost || q.back;
  }
  function quadDraw(ctx, x, y, main, trim, helmet, visor, rot, flash, nitro, stand) {
    ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot);
    ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.beginPath(); ctx.ellipse(2, 4, 26, 16, 0, 0, 7); ctx.fill();
    if (nitro) { ctx.fillStyle = "#ffb703"; ctx.beginPath(); ctx.moveTo(-22, -4); ctx.lineTo(-38 - Math.random() * 10, 0); ctx.lineTo(-22, 4); ctx.fill(); ctx.fillStyle = "#fff3bf"; ctx.beginPath(); ctx.moveTo(-22, -2); ctx.lineTo(-30, 0); ctx.lineTo(-22, 2); ctx.fill(); }
    ctx.fillStyle = "#1c1c24"; for (const [wx, wy] of [[-14, -14], [-14, 14], [14, -14], [14, 14]]) ctx.fillRect(wx - 7, wy - 4, 14, 8);
    ctx.fillStyle = "#3a3f52"; ctx.fillRect(-16, -11, 32, 22);
    ctx.fillStyle = flash > 0 && flash % 4 < 2 ? "#fff" : main; ctx.beginPath(); ctx.roundRect(-20, -10, 40, 20, 6); ctx.fill();
    ctx.fillStyle = trim; ctx.beginPath(); ctx.roundRect(10, -12, 12, 24, 5); ctx.fill(); ctx.fillRect(-21, -6, 5, 12);
    ctx.strokeStyle = "#0d1330"; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-20, -10, 40, 20, 6); ctx.stroke();
    ctx.strokeStyle = "#adb5bd"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(8, -11); ctx.lineTo(8, 11); ctx.stroke();
    const r = stand ? 9 : 7;
    ctx.fillStyle = shade(main, -0.35); ctx.beginPath(); ctx.ellipse(-3, 0, 6, 9, 0, 0, 7); ctx.fill();
    ctx.fillStyle = helmet; ctx.beginPath(); ctx.arc(-2, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = "#0d1330"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = visor; ctx.fillRect(1, -4, 4, 8);
    ctx.restore();
  }
  function qdDraw(ctx) {
    const q = R.qd, P = R.P, F = R.F, k = R.k;
    const grass = { reading: "#3f8f3a", thinking: "#5d7a3a", maths: "#4f9a5a", boss: "#5a6b33" }[k] || "#3f8f3a";
    ctx.fillStyle = grass; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,.08)"; for (let i = 0; i < 40; i++) { const x = ((i * 53 - q.scroll * 0.9) % (W + 40) + W + 40) % (W + 40) - 20; ctx.fillRect(x, (i * 37) % ROAD[0], 6, 3); ctx.fillRect(x + 11, ROAD[1] + 4 + (i * 13) % (H - ROAD[1] - 6), 6, 3); }
    for (let i = 0; i < 9; i++) {                                                     // trees along both sides
      const x = ((i * 70 - q.scroll) % (W + 70) + W + 70) % (W + 70) - 35;
      ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.beginPath(); ctx.arc(x + 4, 40 + (i % 2) * 10, 17, 0, 7); ctx.fill();
      ctx.fillStyle = shade(grass, -0.3); ctx.beginPath(); ctx.arc(x, 36 + (i % 2) * 10, 16, 0, 7); ctx.fill();
      ctx.fillStyle = shade(grass, 0.15); ctx.beginPath(); ctx.arc(x - 4, 32 + (i % 2) * 10, 7, 0, 7); ctx.fill();
      const x2 = ((i * 70 + 35 - q.scroll) % (W + 70) + W + 70) % (W + 70) - 35;
      ctx.fillStyle = shade(grass, -0.3); ctx.beginPath(); ctx.arc(x2, 262, 13, 0, 7); ctx.fill();
    }
    ctx.fillStyle = "#b98a52"; ctx.fillRect(0, ROAD[0], W, ROAD[1] - ROAD[0]);
    ctx.fillStyle = "#a3763f"; ctx.fillRect(0, ROAD[0], W, 4); ctx.fillRect(0, ROAD[1] - 4, W, 4);
    ctx.fillStyle = "rgba(255,255,255,.55)"; for (const ly of [132, 188]) for (let x = -(q.scroll % 40); x < W; x += 40) ctx.fillRect(x, ly - 1, 20, 3);
    ctx.fillStyle = "rgba(90,60,30,.25)"; for (let x = -(q.scroll * 1.0 % 24); x < W; x += 24) for (const ly of LANES) { ctx.fillRect(x, ly - 10, 10, 2); ctx.fillRect(x + 6, ly + 9, 10, 2); }
    for (const o of q.obs) {
      if (o.kind === "rock") { ctx.fillStyle = "#7d776f"; ctx.beginPath(); ctx.ellipse(o.x, o.y, 15, 12, 0.3, 0, 7); ctx.fill(); ctx.fillStyle = "#a19a90"; ctx.beginPath(); ctx.ellipse(o.x - 4, o.y - 3, 7, 5, 0.3, 0, 7); ctx.fill(); ctx.strokeStyle = "#2b2824"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(o.x, o.y, 15, 12, 0.3, 0, 7); ctx.stroke(); }
      else { ctx.fillStyle = "#d9480f"; ctx.beginPath(); ctx.arc(o.x, o.y, 12, 0, 7); ctx.fill(); ctx.strokeStyle = "#0d1330"; ctx.lineWidth = 2; ctx.stroke(); ctx.strokeStyle = "#ffa94d"; ctx.beginPath(); ctx.arc(o.x, o.y, 7, 0, 7); ctx.stroke(); ctx.fillStyle = "#ffe066"; ctx.fillRect(o.x - 2, o.y - 2, 4, 4); }
    }
    if (canFire() && !q.boost && !q.back && R.t > 70 && F.state !== "ko") {         // the line you'd ram along
      const dy = Math.abs(P.y - F.y), c = dy < 9 ? "rgba(255,212,59,.85)" : dy < 26 ? "rgba(105,219,124,.75)" : "rgba(255,255,255,.35)";
      ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(P.x + 26, P.y); ctx.lineTo(F.x - 30, P.y); ctx.stroke(); ctx.setLineDash([]);
      if (dy < 9) text(ctx, "BULLSEYE!", (P.x + F.x) / 2, P.y - 10, 10, "#ffd43b"); else if (dy < 26) text(ctx, "LINED UP", (P.x + F.x) / 2, P.y - 10, 9, "#b2f2bb");
    }
    R.parts.forEach(p => { ctx.fillStyle = p.c; ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s); });
    const fl = R.F.look, hl = R.P.look;
    quadDraw(ctx, F.x, F.y, fl.main, fl.trim, fl.trim, fl.visor || fl.eye || "#22d3ee", F.state === "ko" ? F.rot : Math.sin(R.t / 9) * 0.04, F.flash, false, F.state === "emote");
    quadDraw(ctx, P.x, P.y, hl.main, hl.trim, hl.main, hl.visor, q.spin > 0 ? q.spin * 0.45 : 0, P.flash, q.boost, false);
    if (F.state === "emote") text(ctx, "♪", F.x + 16, F.y - 18 - (R.t % 30) / 3, 14, "#ff8cc6");
    if (F.state === "knocked") text(ctx, "KNOCKED", F.x, F.y - 24, 10, "#ff6b6b");
  }
  const MODE_FN = { snipe: { init: snInit, tick: snTick, draw: snDraw }, lob: { init: lbInit, tick: lbTick, draw: lbDraw }, quad: { init: qdInit, tick: qdTick, draw: qdDraw } };

  /* ---------- keys and buttons ---------- */
  function onKey(e) {
    if (R && e.type === "keydown" && /^[1-5eE]$/.test(e.key)) { e.preventDefault(); KEYS.emote = /[eE]/.test(e.key) ? "r" : Number(e.key); return; }
    const k = MAP[e.key]; if (!k || !R) return;
    e.preventDefault();
    if (e.type === "keydown") { if (k === "shoot") { KEYS.shoot = true; KEYS.hold = true; } else KEYS[k] = true; }
    else { if (k === "shoot") KEYS.hold = false; else KEYS[k] = false; }
  }
  function hook() { window.addEventListener("keydown", onKey); window.addEventListener("keyup", onKey); if (document.activeElement) document.activeElement.blur(); }
  function unhook() { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKey); for (const k in KEYS) KEYS[k] = false; }
  function pads() {
    document.querySelectorAll("[data-pad]").forEach(b => {
      const k = b.dataset.pad, on = e => { e.preventDefault(); if (k === "shoot") { KEYS.shoot = true; KEYS.hold = true; } else if (k === "emote") KEYS.emote = "r"; else if (k === "duck") KEYS.build = true; else KEYS[k] = true; },
        off = e => { e.preventDefault(); if (k === "shoot") KEYS.hold = false; else if (k === "duck") KEYS.build = false; else if (k !== "build" && k !== "boogie" && k !== "emote") KEYS[k] = false; };
      b.addEventListener("pointerdown", on); b.addEventListener("pointerup", off); b.addEventListener("pointerleave", off);
    });
  }
  /* ---------- start a round ---------- */
  function start(o, round, onEnd) {
    if (R) { cancelAnimationFrame(R.raf); unhook(); }
    const k = o.boss ? "boss" : o.kind, sc = o.boss ? 2.1 : 1.75;
    const bg = o.boss ? ["arena-peaks", "arena-reef", "arena-forest"][S.n % 3] : { reading: "arena-forest", thinking: "arena-peaks", maths: "arena-reef" }[o.kind];
    R = { o, k, bg, kind: round.kind, ammo: round.kind === "finish" ? 0 : round.ammo, walls: round.walls, foeWalls: 1 + Math.min(2, o.stage - 1), onEnd, t: 0, phase: Math.PI * 0.2,
      P: { x: 90, y: GROUND, vx: 0, vy: 0, ground: true, dir: 1, scale: 1.75, look: heroLook(skin()[2]), sheet: HERO[skin()[2]] || "hero-common", hitT: 0, buildT: 0, t: 0, flash: 0, cd: 0, muzzle: 0, recoil: 0, state: "move" },
      F: { x: 360, y: GROUND, vx: 0, vy: 0, ground: true, dir: -1, scale: sc, look: LOOK[k], sheet: SPRITE[k], hitT: 0, buildT: 0, t: 0, flash: 0, cd: 80, muzzle: 0, recoil: 0, state: round.kind === "finish" ? "knocked" : "move", tx: 380, st: 0, aimLen: 50, lockY: 0 },
      bullets: [], nades: [], wallsUp: [], parts: [], floats: [], banner: { s: round.kind === "finish" ? "FINISH THEM!" : "READY?", size: 30, c: "#fff", until: 40 },
      shake: 0, stats: { shots: 0, hits: 0, heads: 0, dmg: 0, missed: 0, taken: 0, blocked: 0, dodged: 0, siphon: 0 }, manual: false, done: false, mode: modeOf(o) };
    if (R.mode !== "gun") MODE_FN[R.mode].init();
    acc = 0; last = 0; hook(); pads();
    R.raf = requestAnimationFrame(frame);
  }
  const running = () => !!R;
  /* for tools/check_game3.js only (the browser is driven by Playwright): step frames by hand, read the state, or play a round out instantly */
  if (navigator.webdriver) window.__arena = {
    on: () => !!R, manual: on => { if (R) R.manual = on; }, step: n => { for (let i = 0; i < n && R && !R.done; i++) { tick(); } if (R) draw(); },
    get: () => R && { sprites: ready(img(`art/fighter-${R.P.sheet}.webp`)) && ready(img(`art/fighter-${R.F.sheet}.webp`)) && ready(img(`../prac2/art/${R.bg}.webp`)), kind: R.kind, ammo: R.ammo, walls: R.walls, t: R.t, P: { x: R.P.x, y: R.P.y, emote: R.P.emoteT > 0 ? R.P.emote : null }, F: { x: R.F.x, y: R.F.y, state: R.F.state, emote: R.F.state === "emote" ? R.F.emote : null }, wallsUp: R.wallsUp.map(w => ({ who: w.who, hp: w.hp })), stats: Object.assign({}, R.stats), head: inHead(aimY()), bullets: R.bullets.length, nades: R.nades.map(g => ({ x: g.x, fuse: g.fuse })) },
    walls: () => { if (R) R.wallsUp = []; },
    force: m => { FORCE = m; },
    mode: () => R && { mode: R.mode, sn: R.sn && Object.assign({}, R.sn, { aim: sway() }), lb: R.lb && { ang: R.lb.ang, pow: R.lb.pow, charging: R.lb.charging, g: !!R.lb.g }, qd: R.qd && { boost: R.qd.boost, back: R.qd.back, spin: R.qd.spin, obs: R.qd.obs.length }, F: { x: R.F.x, y: R.F.y, state: R.F.state }, P: { x: R.P.x, y: R.P.y } },
    /* Sniper Ridge: put the swaying scope on the opponent's body or head, or on a rock */
    scope: where => { if (!R || !R.sn) return; const b = box(R.F), t = where === "head" ? [R.F.x, (b.top + b.head) / 2] : where === "rock" ? [ROCKS[0], FAR - 12] : [R.F.x, (b.head + b.bot) / 2], dx = 5 * Math.sin((R.t + 1) / 23), dy = 4 * Math.sin((R.t + 1) / 31 + 1); R.sn.x = t[0] - dx; R.sn.y = t[1] - dy; },
    /* Grenade Lob: set the angle and say how many frames to hold J so the throw lands on the opponent */
    lobHold: ang => { if (!R || !R.lb) return 0; R.lb.ang = ang; let best = 0, bd = 1e9; for (let n = 1; n <= 50; n++) { const l = lbLand(lbSpeed(0.02 * n), ang * Math.PI / 180); const d = l.wall ? 1e8 : Math.abs(l.x - R.F.x); if (d < bd) { bd = d; best = n; } } return best; },
    /* Quad Chase: clear the track and put you in a lane */
    lane: y => { if (!R || !R.qd) return; R.qd.obs = []; R.qd.next = 1e9; R.P.y = y; },
    wall: x => { if (R) R.wallsUp.push({ who: "f", x, hp: 3 }); },
    phase: head => { if (!R) return; const b = box(R.F), ok = []; for (let i = 0; i < SWEEP; i++) { R.phase = 2 * Math.PI * i / SWEEP; const y = aimY(); if (head ? inHead(y) : y > b.head + 8 && y < b.bot - 8) ok.push(i); } R.phase = 2 * Math.PI * ok[Math.floor(ok.length / 2)] / SWEEP; },
    foe: (state, extra = {}) => { if (!R) return; Object.assign(R.F, { state, st: 0, vx: 0, cd: 9999 }, extra); if (state === "aim") { R.F.aimLen = 40; R.F.lockY = R.P.y - 26 * R.P.scale; } },
    sim: (heads = 0) => { if (!R) return; while (R && !R.done) { if (R.F.state === "ko") { finish(); break; } if (R.kind !== "finish" && R.ammo <= 0) { finish(); break; } if (R.kind !== "finish") R.ammo--; R.stats.shots++; hitFoe(R.stats.heads < heads, R.F.x, R.F.y - 30); } },
  };
  const preload = () => { Object.values(SPRITE).concat(Object.values(HERO)).forEach(n => img(`art/fighter-${n}.webp`)); ["arena-forest", "arena-peaks", "arena-reef"].forEach(n => img(`../prac2/art/${n}.webp`)); };
  return { start, running, LOOK, preload, MODES, modeOf, SHEETS: [...Object.values(SPRITE), ...new Set(Object.values(HERO))] };
})();
