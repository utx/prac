// Usage: node tools/check_render.js tests/v33/index.html [screenshot-dir]
// Answers every question correctly at desktop and phone widths, checks the
// score is 9 out of 9, checks for sideways overflow on phones and page errors,
// and saves screenshots. Needs Playwright (npm i -g playwright).
const path = require("path");
const { chromium } = require("playwright");
const file = path.resolve(process.argv[2]);
const out = process.argv[3] || ".";
(async () => {
  const b = await chromium.launch();
  const errs = [];
  let ok = true;
  for (const w of [1200, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    p.on("pageerror", e => errs.push(e.message));
    await p.goto("file://" + file);
    if (await p.evaluate(() => TEST_META.status === "review")) {
      // held for review: the student page only says "not ready yet", so open it as the admin page does
      await p.evaluate(() => sessionStorage.setItem("prac.admin", "1"));
      await p.goto("file://" + file + "?admin=1");
    }
    await p.click("#start");
    const answers = await p.evaluate(() => SECTIONS.map(s => s.questions.map(q => q.answer)));
    for (let s = 0; s < answers.length; s++) {
      for (let q = 0; q < answers[s].length; q++) await p.click(`.option[data-q="${q}"][data-o="${answers[s][q]}"]`);
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ov > 0) { ok = false; console.log(`overflow at ${w}px in section ${s}: ${ov}px`); }
      await p.screenshot({ path: path.join(out, `s${s}_${w}.png`), fullPage: true });
      await p.click("#submit");
      await p.click("#next");
    }
    const score = await p.textContent(".final-score");
    console.log(w + "px:", score.trim());
    if (!/9\s*out of\s*9/.test(score)) ok = false;
  }
  if (errs.length) { ok = false; console.log("page errors:", errs); }
  console.log(ok ? "PASS" : "FAIL");
  process.exitCode = ok ? 0 : 1;
  await b.close();
})();
