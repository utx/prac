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
    j: "shoot", J: "shoot", x: "shoot", X: "shoot", k: "build", K: "build", c: "build", C: "build", b: "boogie", B: "boogie" };
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
  const EMOTES = [["robot", "The Robot"], ["runman", "Running Man"], ["disco", "Disco Point"], ["jacks", "Star Jumps"], ["spin", "Spin & Pose"]];
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
    ctx.fillStyle = "rgba(0,0,0,.28)"; ctx.beginPath(); ctx.ellipse(f.x, GROUND + 1, 22 * f.scale, 4 * f.scale, 0, 0, 7); ctx.fill();   // shadow
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
    for (let i = 0; i < R.walls; i++) { ctx.fillStyle = "#a8692f"; ctx.fillRect(12 + i * 12, 62, 9, 9); ctx.fillStyle = "#7a4a1f"; ctx.fillRect(12 + i * 12, 66, 9, 1); }
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
    f.emote = EMOTES[i][0]; f.emoteT = 150; f.t = 0;
    float(EMOTES[i][1] + "!", f.x, f.y - 92 * f.scale / 1.75, "#ff8cc6", 13); beep([[659, .07], [784, .07], [988, .1]]);
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
      else if (r < 0.96) { const e = EMOTES[rnd(EMOTES.length)]; F.state = "emote"; F.emote = e[0]; F.st = 0; F.t = 0; float(e[1] + "!", F.x, F.y - 92 * F.scale / 1.75, "#ff8cc6", 13); }   // a taunt: a free shot for you
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
    for (const g of R.nades) {
      if (g.fuse < 0) { g.vy += GRAV; g.x += g.vx; g.y += g.vy; if (g.y >= GROUND - 4) { g.y = GROUND - 4; g.fuse = 28; } }
      else if (--g.fuse <= 0) {
        g.dead = true; R.shake = 10; burst(g.x, g.y, "#ffa94d", 24, 3.5); burst(g.x, g.y, "#ffe066", 12, 2.5); beep([[90, .25, "sawtooth"]]);
        R.wallsUp.forEach(w => { if (Math.abs(w.x - g.x) < 46) w.hp = 0; });
        if (Math.abs(P.x - g.x) < 46 && P.y > GROUND - 20) meHurt(5 + s, P.x, P.y - 60); else if (Math.abs(P.x - g.x) < 70) { R.stats.dodged++; float("DODGED!", P.x, P.y - 70, "#9be15d", 11); }
      }
    }
    R.nades = R.nades.filter(g => !g.dead);
    R.parts.forEach(q => { q.x += q.vx; q.y += q.vy; q.vy += 0.15; q.life--; }); R.parts = R.parts.filter(q => q.life > 0);
    R.floats.forEach(f => { f.y -= 0.6; f.life--; }); R.floats = R.floats.filter(f => f.life > 0);
    KEYS.shoot = KEYS.shoot && KEYS.hold;
    /* the round ends when your shots are used up (or the opponent is down) */
    if (F.state === "ko") { if (R.t - R.koAt > 110) finish(); }
    else if (R.kind !== "finish" && R.ammo <= 0 && !R.bullets.some(b => b.who === "p")) { R.outAt = R.outAt || R.t; if (R.t - R.outAt === 1) R.banner = { s: "RELOAD!", size: 30, c: "#fff", until: R.t + 60 }; if (R.t - R.outAt > 50) finish(); }
  }
  function frame(ts) {
    if (!R) return;
    if (!R.manual) { acc += Math.min(100, ts - (last || ts)); last = ts; while (acc >= 1000 / 60 && R && !R.done) { tick(); acc -= 1000 / 60; } }
    if (!R) return;
    draw(); R.raf = requestAnimationFrame(frame);
  }
  function finish() {
    if (!R || R.done) return;
    const out = Object.assign({}, R.stats, { kind: R.kind, killed: R.o.dead }), cb = R.onEnd;
    R.done = true; cancelAnimationFrame(R.raf); unhook(); R = null;
    cb(out);
  }
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
      const k = b.dataset.pad, on = e => { e.preventDefault(); if (k === "shoot") { KEYS.shoot = true; KEYS.hold = true; } else if (k === "emote") KEYS.emote = "r"; else KEYS[k] = true; }, off = e => { e.preventDefault(); if (k === "shoot") KEYS.hold = false; else if (k !== "build" && k !== "boogie" && k !== "emote") KEYS[k] = false; };
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
      shake: 0, stats: { shots: 0, hits: 0, heads: 0, dmg: 0, missed: 0, taken: 0, blocked: 0, dodged: 0, siphon: 0 }, manual: false, done: false };
    acc = 0; last = 0; hook(); pads();
    R.raf = requestAnimationFrame(frame);
  }
  const running = () => !!R;
  /* for tools/check_game3.js only (the browser is driven by Playwright): step frames by hand, read the state, or play a round out instantly */
  if (navigator.webdriver) window.__arena = {
    on: () => !!R, manual: on => { if (R) R.manual = on; }, step: n => { for (let i = 0; i < n && R && !R.done; i++) { tick(); } if (R) draw(); },
    get: () => R && { sprites: ready(img(`art/fighter-${R.P.sheet}.webp`)) && ready(img(`art/fighter-${R.F.sheet}.webp`)) && ready(img(`../prac2/art/${R.bg}.webp`)), kind: R.kind, ammo: R.ammo, walls: R.walls, t: R.t, P: { x: R.P.x, y: R.P.y, emote: R.P.emoteT > 0 ? R.P.emote : null }, F: { x: R.F.x, y: R.F.y, state: R.F.state, emote: R.F.state === "emote" ? R.F.emote : null }, wallsUp: R.wallsUp.map(w => ({ who: w.who, hp: w.hp })), stats: Object.assign({}, R.stats), head: inHead(aimY()), bullets: R.bullets.length, nades: R.nades.map(g => ({ x: g.x, fuse: g.fuse })) },
    walls: () => { if (R) R.wallsUp = []; },
    phase: head => { if (!R) return; const b = box(R.F), ok = []; for (let i = 0; i < SWEEP; i++) { R.phase = 2 * Math.PI * i / SWEEP; const y = aimY(); if (head ? inHead(y) : y > b.head + 8 && y < b.bot - 8) ok.push(i); } R.phase = 2 * Math.PI * ok[Math.floor(ok.length / 2)] / SWEEP; },
    foe: (state, extra = {}) => { if (!R) return; Object.assign(R.F, { state, st: 0, vx: 0, cd: 9999 }, extra); if (state === "aim") { R.F.aimLen = 40; R.F.lockY = R.P.y - 26 * R.P.scale; } },
    sim: (heads = 0) => { if (!R) return; while (R && !R.done) { if (R.F.state === "ko") { finish(); break; } if (R.kind !== "finish" && R.ammo <= 0) { finish(); break; } if (R.kind !== "finish") R.ammo--; R.stats.shots++; hitFoe(R.stats.heads < heads, R.F.x, R.F.y - 30); } },
  };
  const preload = () => { Object.values(SPRITE).concat(Object.values(HERO)).forEach(n => img(`art/fighter-${n}.webp`)); ["arena-forest", "arena-peaks", "arena-reef"].forEach(n => img(`../prac2/art/${n}.webp`)); };
  return { start, running, LOOK, preload, SHEETS: [...Object.values(SPRITE), ...new Set(Object.values(HERO))] };
})();
