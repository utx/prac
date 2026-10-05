// Usage: node tools/check_tracking.js [screenshot-dir]
// End-to-end check of progress tracking, the completed flags on the menu, the
// PIN-protected admin page and practice (admin) mode. Serves the repo on a local
// port, drives Chromium with Playwright, and exits non-zero on any failure.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT = process.argv[2] || null;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".css": "text/css" };
let failures = 0;
const ok = (cond, msg) => { console.log((cond ? "PASS " : "FAIL ") + msg); if (!cond) failures++; };
const shot = async (p, name) => { if (OUT) await p.screenshot({ path: path.join(OUT, name), fullPage: true }); };

const server = http.createServer((req, res) => {
  let f = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
    res.end(data);
  });
});

async function answerAll(p, pick) {
  await p.click("#start");
  const ans = await p.evaluate(() => SECTIONS.map(s => s.questions.map(q => q.answer)));
  for (let s = 0; s < ans.length; s++) {
    for (let q = 0; q < ans[s].length; q++) await p.click(`.option[data-q="${q}"][data-o="${pick(s, q, ans[s][q])}"]`);
    await p.click("#submit");
    await p.click("#next");
  }
  return (await p.textContent(".final-score")).replace(/\s+/g, " ").trim();
}

(async () => {
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const B = `http://127.0.0.1:${server.address().port}`;
  const versions = fs.readdirSync(path.join(ROOT, "content")).map(f => (f.match(/^v(\d+)\.js$/) || [])[1]).filter(Boolean).map(Number).sort((a, b) => a - b);
  const [vA, vB, vC] = versions.slice(-3); // three most recent tests
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  p.on("dialog", d => d.accept());

  await p.goto(B + "/index.html");
  ok(await p.locator(".test.done").count() === 0, "fresh menu shows no completed tests");
  const cards = await p.locator(".test[data-v]").count();
  ok(cards === versions.length, `menu has one card per test (${cards})`);

  // Test vA: all right except Maths, with one changed answer in the first question.
  await p.goto(`${B}/tests/v${vA}/index.html`);
  const maths = await p.evaluate(() => SECTIONS.findIndex(s => s.id === "maths"));
  await p.click("#start");
  await p.click('.option[data-q="0"][data-o="0"]');
  const ans = await p.evaluate(() => SECTIONS.map(s => s.questions.map(q => q.answer)));
  for (let s = 0; s < ans.length; s++) {
    for (let q = 0; q < ans[s].length; q++) {
      const a = ans[s][q], n = await p.locator(`.option[data-q="${q}"]`).count();
      await p.click(`.option[data-q="${q}"][data-o="${s === maths ? (a + 1) % n : a}"]`);
    }
    await p.click("#submit");
    await p.click("#next");
  }
  const expected = ans.reduce((n, sec, i) => n + (i === maths ? 0 : sec.length), 0);
  const score = (await p.textContent(".final-score")).replace(/\s+/g, " ");
  ok(new RegExp(`${expected}\\s*out of`).test(score), `test ${vA} scores ${expected} as intended (${score.trim()})`);
  const st = await p.evaluate(() => JSON.parse(localStorage.getItem("prac.v1")));
  const a0 = st.attempts[0];
  ok(st.attempts.length === 1 && a0.finished && a0.total === expected, "attempt recorded with the right total");
  ok(a0.sections.flatMap(s => s.answers).length === ans.flat().length, "every answer recorded");
  ok(a0.sections[0].answers[0].changes === (ans[0][0] === 0 ? 0 : 1), "changed answer counted");
  ok(a0.sections.every(s => s.answers.every(x => typeof x.cat === "string" && x.cat)), "every answer has a question type");
  ok(st.flags[vA] && st.flags[vA].completed, `test ${vA} flagged completed`);

  await p.goto(B + "/index.html");
  ok(await p.locator(`.test.done[data-v="${vA}"]`).count() === 1, "menu shows the test as completed");
  ok(new RegExp(`${expected}/9`).test(await p.textContent(`.test[data-v="${vA}"] .done-tag`)), "completed tag shows the score");
  await p.click(`.test[data-v="${vB}"] .flag`);
  ok(await p.locator(`.test.done[data-v="${vB}"]`).count() === 1, "Mark as done works");
  ok(p.url().endsWith("/index.html"), "Mark as done does not open the test");
  await shot(p, "menu.png");
  await p.click(`.test[data-v="${vB}"] .flag`);
  ok(await p.locator(`.test.done[data-v="${vB}"]`).count() === 0, "Undo done works");
  await p.goto(`${B}/tests/v${vA}/index.html`);
  ok(await p.locator(".done-note").count() === 1, "completed note on the test's start page");

  await p.goto(`${B}/tests/v${vC}/index.html?admin=1`);
  ok(!(await p.evaluate(() => ADMIN)), "?admin alone does not switch on practice mode");

  await p.goto(B + "/pracadmin/index.html");
  ok(await p.locator("#pin").count() === 1, "admin page asks for the PIN");
  await p.fill("#pin", "1234");
  await p.click(".gate button");
  ok(/isn’t right/.test(await p.textContent("#err")), "wrong PIN rejected");
  await p.fill("#pin", "5366");
  await p.click(".gate button");
  await p.waitForSelector("h1:text('Progress')");
  ok(true, "correct PIN unlocks");
  const txt = (await p.textContent("main")).replace(/\s+/g, " ");
  ok(txt.includes(`1 / ${versions.length}`), "admin shows 1 test completed");
  ok(/Early signs|Focus here/.test(txt), "admin shows focus areas");
  ok(/Stretch questions/.test(txt) && /\d+ of \d+ right/.test(txt), "admin shows stretch-question results");
  await shot(p, "admin.png");

  const before = (await p.evaluate(() => JSON.parse(localStorage.getItem("prac.v1")))).attempts.length;
  await p.click(`a.btn.primary[href*="v${vC}/"]`);
  ok(await p.evaluate(() => ADMIN), "Practice link opens the test in practice mode");
  ok(await p.isVisible(".admin-badge"), "practice-mode badge visible");
  await answerAll(p, (s, q, a) => a);
  const after = await p.evaluate(() => JSON.parse(localStorage.getItem("prac.v1")));
  ok(after.attempts.length === before && !after.flags[vC], "practice-mode run not recorded or flagged");
  await p.click("#home-link");
  await p.waitForSelector("h1:text('Progress')");
  ok(true, "practice-mode header link returns to the admin page");

  const m = await b.newPage({ viewport: { width: 390, height: 800 } });
  m.on("pageerror", e => errs.push(e.message));
  await m.goto(B + "/index.html");
  await m.evaluate(s => localStorage.setItem("prac.v1", s), JSON.stringify(after));
  await m.reload();
  ok(await m.evaluate(() => document.documentElement.scrollWidth - innerWidth) <= 0, "menu has no sideways scroll on a phone");
  await m.evaluate(() => sessionStorage.setItem("prac.admin", "1"));
  await m.goto(B + "/pracadmin/index.html");
  ok(await m.evaluate(() => document.documentElement.scrollWidth - innerWidth) <= 0, "admin page has no sideways scroll on a phone");
  await shot(m, "admin_phone.png");

  ok(errs.length === 0, "no page errors" + (errs.length ? ": " + JSON.stringify(errs) : ""));
  await b.close();
  server.close();
  console.log(failures ? `FAIL (${failures})` : "PASS");
  process.exitCode = failures ? 1 : 0;
})().catch(e => { console.error(e); server.close(); process.exitCode = 1; });
