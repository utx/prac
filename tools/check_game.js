#!/usr/bin/env node
/* Checks the adventure game (prac2/index.html, built by tools/build_game.py).
   1. Content rules: unique ids, option counts (maths A–E, others A–D), a hint and an
      explanation for every question, a known question type, the correct option never
      the single longest, answer letters spread within each level (no letter more than twice), no "OC" on the page.
   2. In a real browser at desktop and phone width: the map draws, levels lock and
      unlock by the star rules, a wrong answer gives a hint and a second go, every
      question of every level renders without errors or sideways scrolling, a boss can
      be beaten, and progress survives a reload.
   Usage: node tools/check_game.js [screenshot-dir] */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "prac2", "index.html");
const shots = process.argv[2];
let fail = 0;
const bad = m => { fail++; console.log("FAIL " + m); };

/* ---- 1. content ---- */
const INK = "#1b2a41", WORLDS = [];
for (const f of ["reading", "thinking", "maths"]) vm.runInNewContext(fs.readFileSync(path.join(ROOT, "game", "content", f + ".js"), "utf8"), { INK, WORLDS, Math, Array });
const build = fs.readFileSync(path.join(ROOT, "tools", "build.py"), "utf8");
const cats = sec => JSON.parse(build.match(new RegExp(`"${sec}": (\\[[^\\]]*\\])`, "s"))[1].replace(/\s+/g, " "));
const CATS = { reading: cats("reading"), thinking: cats("thinking"), maths: cats("maths") };
const text = h => String(h).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const ids = new Set();
let nq = 0;
for (const w of WORLDS) {
  const want = w.id === "maths" ? 5 : 4;
  if (!w.levels[w.levels.length - 1].boss || w.levels.filter(l => l.boss).length !== 1) bad(`${w.id}: the last level (only) must be the boss`);
  for (const lv of w.levels) {
    if (ids.has(lv.id)) bad(`duplicate level id ${lv.id}`); ids.add(lv.id);
    if (lv.questions.length !== (lv.boss ? 5 : 4)) bad(`${lv.id}: expected ${lv.boss ? 5 : 4} questions`);
    const letters = {};
    for (const q of lv.questions) {
      nq++;
      if (ids.has(q.id)) bad(`duplicate question id ${q.id}`); ids.add(q.id);
      if (q.options.length !== want) bad(`${q.id}: needs ${want} options`);
      if (!(q.answer >= 0 && q.answer < q.options.length)) bad(`${q.id}: bad answer index`);
      if (!text(q.hint) || !text(q.explain) || !text(q.stem)) bad(`${q.id}: needs a stem, a hint and an explanation`);
      if (!CATS[w.id].includes(q.cat)) bad(`${q.id}: unknown question type "${q.cat}"`);
      if (!/why-not/.test(q.explain)) bad(`${q.id}: the explanation must say why the traps are wrong`);
      if (!q.visual && !/ only$/.test(q.options[0])) {   // "X only / Y only / Both / Neither" is a fixed set
        const len = q.options.map(o => text(o).length), top = Math.max(...len);
        if (len[q.answer] === top && len.filter(l => l === top).length === 1 && top > 12) bad(`${q.id}: the correct option is the single longest`);
      }
      letters[q.answer] = (letters[q.answer] || 0) + 1;
    }
    if (Math.max(...Object.values(letters)) > 2) bad(`${lv.id}: answer letters are not spread (${JSON.stringify(letters)})`);
  }
}
const html = fs.readFileSync(PAGE, "utf8");
if (/\bOC\b/.test(html)) bad('the page mentions "OC"');
console.log(`content: ${WORLDS.length} worlds, ${nq} questions checked`);

/* ---- 2. browser ---- */
(async () => {
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  for (const [label, width, height] of [["desktop", 1200, 900], ["phone", 390, 800]]) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(String(e)));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    page.on("dialog", d => d.accept());
    await page.goto("file://" + PAGE);
    const overflow = async where => { const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); if (o > 1) bad(`${label}: sideways scrolling (${o}px) at ${where}`); };
    const locked = () => page.$$eval(".node.locked", n => n.map(x => x.dataset.l));
    await overflow("map");
    const l = await locked();
    if (l.length !== 12 || l.includes("r1") || l.includes("m1") || l.includes("t1")) bad(`${label}: a new player should have only level 1 of each world open (locked: ${l})`);
    if (shots) await page.screenshot({ path: path.join(shots, `game-map-${label}.png`), fullPage: true });

    /* play one level; mode "right" answers correctly, "hint" gets each one wrong once first */
    const playLevel = async (lv, mode) => {
      await page.click(`.node[data-l="${lv.id}"]`);
      for (let i = 0; i < lv.questions.length; i++) {
        const q = lv.questions[i];
        await page.waitForSelector(".opt");
        if ((await page.$$(".opt")).length !== q.options.length) bad(`${label}: ${q.id} shows the wrong number of options`);
        await overflow(q.id);
        if (shots && (label === "phone" || q.visual || lv.boss) && (i === 0 || q.visual || /svg|table/.test(q.stem))) await page.screenshot({ path: path.join(shots, `game-${q.id}-${label}.png`), fullPage: true });
        if (mode === "hint") {
          await page.click(`.opt[data-i="${(q.answer + 1) % q.options.length}"]`);
          if (!(await page.$(".fb.hint"))) bad(`${label}: ${q.id} gave no hint after a wrong answer`);
          if (await page.$("#next")) bad(`${label}: ${q.id} did not allow a second go`);
        }
        await page.click(`.opt[data-i="${q.answer}"]`);
        if (!(await page.$(".fb.good"))) bad(`${label}: ${q.id} did not accept the correct answer`);
        await overflow(q.id + " explanation");
        await page.click("#next");
      }
      await page.waitForSelector(".result");
      const stars = (await page.$$(".result .stars .on")).length;
      await page.click("#map");
      return stars;
    };
    const first = WORLDS[0];
    let s = await playLevel(first.levels[0], "hint");
    if (s !== 1) bad(`${label}: every question right on the second go should give 1 star, not ${s}`);
    if (!(await locked()).includes(first.levels[1].id)) bad(`${label}: level 2 opened with only 1 star`);
    if (!(await page.$("#cave"))) bad(`${label}: missed questions did not open the Comeback Cave`);
    for (const w of WORLDS) {
      for (const lv of w.levels) {
        if ((await locked()).includes(lv.id)) bad(`${label}: ${lv.id} is still locked after 3 stars on the levels before it`);
        s = await playLevel(lv, "right");
        if (s !== 3) bad(`${label}: ${lv.id} all right first time should give 3 stars, not ${s}`);
      }
    }
    if ((await locked()).length) bad(`${label}: levels still locked at the end`);
    const st = await page.evaluate(() => JSON.parse(localStorage.getItem("prac2.v1")));
    if (!st.badges.all || !st.badges.boss_maths || !st.badges.three) bad(`${label}: badges were not awarded (${Object.keys(st.badges)})`);
    await page.reload();
    if ((await page.$$(".node.boss.beaten")).length !== 3) bad(`${label}: progress was not kept after a reload`);
    await overflow("finished map");
    if (shots) await page.screenshot({ path: path.join(shots, `game-done-${label}.png`), fullPage: true });
    errors.forEach(e => bad(`${label}: page error: ${e}`));
    await ctx.close();
  }
  /* practice mode (from the admin page): everything open, nothing saved, real progress untouched */
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
    const page = await ctx.newPage();
    await page.goto("file://" + PAGE);
    await page.evaluate(() => { localStorage.setItem("prac2.v1", JSON.stringify({ levels: {}, q: {}, xp: 7, badges: {}, days: [], sound: true })); sessionStorage.setItem("prac.admin", "1"); });
    await page.goto("file://" + PAGE + "?admin=1");
    if (!(await page.$("#practice-note"))) bad("practice mode: no practice note");
    if ((await page.$$(".node.locked")).length) bad("practice mode: levels are locked");
    const boss = WORLDS[2].levels[4];
    await page.click(`.node[data-l="${boss.id}"]`);
    for (const q of boss.questions) { await page.click(`.opt[data-i="${q.answer}"]`); await page.click("#next"); }
    await page.waitForSelector(".result");
    const kept = JSON.parse(await page.evaluate(() => localStorage.getItem("prac2.v1")));
    if (kept.xp !== 7 || Object.keys(kept.levels).length) bad("practice mode changed the saved progress");
    await page.goto("file://" + PAGE + "?admin=1");
    if (await page.$(".node.boss.beaten")) bad("practice mode kept progress after a reload");
    await page.evaluate(() => sessionStorage.removeItem("prac.admin"));
    await page.goto("file://" + PAGE + "?admin=1");
    if (await page.$("#practice-note")) bad("practice mode opened without the admin PIN");
    if (!fs.readFileSync(path.join(ROOT, "pracadmin", "index.html"), "utf8").includes("prac2/index.html?admin=1")) bad("the admin page has no practice link to the game");
    await ctx.close();
  }
  await browser.close();
  console.log(fail ? `GAME CHECK FAILED (${fail})` : "GAME CHECK PASS");
  process.exit(fail ? 1 : 0);
})();
