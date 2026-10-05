#!/usr/bin/env python3
"""Build every practice test and the index page.

For each content/vNN.js (+ content/vNN.json metadata):
  - tests/vNN/index.html is assembled from tools/template.html
Then index.html is regenerated with one button per test, newest first, and
pracadmin/index.html (the PIN-protected stats page) is rebuilt from
tools/admin.html.

Usage:  python3 tools/build.py
"""
import datetime, html, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE = (ROOT / "tools" / "template.html").read_text(encoding="utf-8")
ADMIN_TEMPLATE = (ROOT / "tools" / "admin.html").read_text(encoding="utf-8")

# Question types used for the stats page. Every question in content/vNN.json
# "categories" must use one of these labels.
CATEGORIES = {
    "reading": ["Purpose of a detail", "Comparisons & imagery", "Feelings & inference",
                "Character & structure", "Main idea", "Vocabulary & idioms", "Sentence links"],
    "thinking": ["Spot the mistake", "Supports the claim", "Whose reasoning", "Must or cannot be true",
                 "Tables & timetables", "Order & arrangement", "Rules & codes", "Spatial", "Number problems"],
    "maths": ["Number & place value", "Time & timetables", "Money & best value", "Measurement & scales",
              "Graphs & data", "Fractions", "Patterns & sequences", "Area, perimeter & 3D",
              "Chance & counting", "Rates"],
}


def check_categories(n, meta):
    cats = meta.get("categories")
    if not cats:
        print(f"WARNING v{n}: no 'categories' in content/v{n}.json, so its questions won't appear in the stats by type")
        return
    for sec, labels in cats.items():
        for i, lab in enumerate(labels):
            if lab not in CATEGORIES.get(sec, []):
                raise SystemExit(f"v{n} {sec} Q{i + 1}: unknown category {lab!r} (see CATEGORIES in tools/build.py)")


def versions():
    out = []
    for js in sorted((ROOT / "content").glob("v*.js")):
        m = re.fullmatch(r"v(\d+)", js.stem)
        if not m:
            continue
        n = int(m.group(1))
        meta_path = js.with_suffix(".json")
        meta = json.loads(meta_path.read_text(encoding="utf-8")) if meta_path.exists() else {}
        meta.setdefault("version", n)
        out.append((n, js, meta))
    return sorted(out, key=lambda t: t[0])


def page_meta(n, meta):
    return {"version": n, "reading_format": meta.get("reading_format", ""), "categories": meta.get("categories", {})}


def build_test(n, js, meta):
    content = js.read_text(encoding="utf-8")
    meta_js = "const TEST_META = " + json.dumps(page_meta(n, meta), ensure_ascii=False) + ";"
    page = TEMPLATE.replace("{{N}}", str(n)).replace("/*__CONTENT__*/", content).replace("/*__META__*/", meta_js)
    dest = ROOT / "tests" / f"v{n}" / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(page, encoding="utf-8")
    return dest


def card(n, meta):
    e = html.escape
    reading = e(meta.get("reading", ""))
    date = meta.get("date", "")
    try:
        d = datetime.date.fromisoformat(date)
        date = f"{d.day} {d.strftime('%B %Y')}"
    except ValueError:
        pass
    date = e(date)
    return f'''      <div class="test" data-v="{n}">
        <a class="cover" href="tests/v{n}/index.html" aria-label="Open Test {n}"></a>
        <span class="num">Test {n}</span>
        <span class="meta">{date}</span>
        <span class="done-tag" hidden>✓ Completed</span>
        <span class="reading">{reading}</span>
        <span class="mix">3 reading · 3 thinking skills · 3 maths</span>
        <span class="row"><span class="go">Start →</span><button type="button" class="flag">Mark as done</button></span>
      </div>'''


def build_admin(vs):
    tests = [{"version": n, "reading": meta.get("reading", ""), "reading_format": meta.get("reading_format", ""),
              "categories": meta.get("categories", {})} for n, _, meta in vs]
    page = ADMIN_TEMPLATE.replace("/*__TESTS__*/", "const TESTS = " + json.dumps(tests, ensure_ascii=False) + ";\n"
                                  + "const CATEGORIES = " + json.dumps(CATEGORIES, ensure_ascii=False) + ";")
    dest = ROOT / "pracadmin" / "index.html"
    dest.parent.mkdir(exist_ok=True)
    dest.write_text(page, encoding="utf-8")


def build_index(vs):
    cards = "\n".join(card(n, meta) for n, _, meta in reversed(vs))
    page = INDEX.replace("{{CARDS}}", cards).replace("{{COUNT}}", str(len(vs)))
    (ROOT / "index.html").write_text(page, encoding="utf-8")


INDEX = """<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Practice Tests</title>
<style>
  :root {
    --ink: #1b2a41; --ink-soft: #55627a; --line: #d8dde6; --paper: #ffffff;
    --field: #f3f5f8; --pitch: #2e7d4f; --pitch-deep: #23603c; --chip: #eef2f8;
    --done: #1e7a4f; --done-bg: #e3f3ea; --done-card: #f6faf7; --done-line: #b9dcc7;
  }
  :root[data-theme="dark"] { --ink: #e8ecf3; --ink-soft: #a9b3c4; --line: #33405a; --paper: #1d2638; --field: #141b29; --chip: #26324a; --done: #7fd3a6; --done-bg: #1f3a2d; --done-card: #18261f; --done-line: #2f5a43; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) { --ink: #e8ecf3; --ink-soft: #a9b3c4; --line: #33405a; --paper: #1d2638; --field: #141b29; --chip: #26324a; --done: #7fd3a6; --done-bg: #1f3a2d; --done-card: #18261f; --done-line: #2f5a43; }
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; background: var(--field); color: var(--ink);
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-size: 17px; line-height: 1.5; }
  header { background: #1b2a41; color: #fff; }
  .bar { max-width: 960px; margin: 0 auto; padding: 14px 24px; font-weight: 600; }
  main { max-width: 960px; margin: 28px auto 80px; padding: 0 24px; }
  h1 { font-size: 28px; margin: 0 0 6px; }
  .lead { color: var(--ink-soft); margin: 0 0 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .test { position: relative; display: flex; flex-direction: column; gap: 6px; background: var(--paper); border: 1px solid var(--line);
    border-radius: 10px; padding: 18px 18px 16px; color: var(--ink); text-decoration: none;
    transition: border-color .12s, transform .12s; }
  .test:hover, .test:focus-within { border-color: var(--pitch); transform: translateY(-1px); }
  .test:first-child { border: 2px solid var(--pitch); }
  .test a.cover { position: absolute; inset: 0; border-radius: 10px; z-index: 1; }
  .test a.cover:focus-visible { outline: 3px solid #b8860b; outline-offset: 2px; }
  .test .row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; }
  .test .flag { position: relative; z-index: 2; background: none; border: 1px solid var(--line); color: var(--ink-soft);
    border-radius: 6px; padding: 5px 10px; font: inherit; font-size: 13px; cursor: pointer; }
  .test .flag:hover { border-color: var(--ink-soft); color: var(--ink); }
  .done-tag { align-self: flex-start; background: var(--done-bg); color: var(--done); font-weight: 700; font-size: 14px;
    border-radius: 4px; padding: 2px 8px; }
  .test.done { background: var(--done-card); border-color: var(--done-line); }
  .test.done:first-child { border-color: var(--done); }
  .test.done .go { background: var(--ink-soft); }
  .test.done .num { color: var(--ink-soft); }
  .num { font-size: 22px; font-weight: 700; }
  .meta { color: var(--ink-soft); font-size: 14px; }
  .reading { font-size: 15px; }
  .mix { color: var(--ink-soft); font-size: 13px; margin-bottom: 8px; }
  .go { margin-top: auto; align-self: flex-start; background: var(--pitch); color: #fff; font-weight: 600;
    border-radius: 6px; padding: 7px 14px; font-size: 15px; }
  a.test:hover .go { background: var(--pitch-deep); }
  @media (max-width: 520px) { main { padding: 0 16px; } .bar { padding: 12px 16px; } }
</style>
</head>
<body>
<header><div class="bar">Practice Tests</div></header>
<main>
  <h1>Choose a test</h1>
  <p class="lead">Each test has three reading, three thinking skills and three maths questions, with explanations at the end of each section. The newest test is first. <span id="progress"></span></p>
  <div class="grid">
{{CARDS}}
  </div>
</main>
<script>
(() => {
  const KEY = "prac.v1";
  const load = () => {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.attempts)) return Object.assign({ flags: {} }, s); }
    catch (e) {}
    return { attempts: [], flags: {} };
  };
  const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };
  function paint() {
    const st = load();
    const cards = document.querySelectorAll(".test[data-v]");
    let done = 0;
    cards.forEach(card => {
      const v = card.dataset.v, f = st.flags[v], isDone = !!(f && f.completed);
      const firstFinished = st.attempts.filter(a => String(a.v) === v && a.finished).sort((a, b) => a.finished < b.finished ? -1 : 1)[0];
      card.classList.toggle("done", isDone);
      const tag = card.querySelector(".done-tag");
      tag.hidden = !isDone;
      if (isDone) {
        done++;
        const d = new Date(f.at);
        tag.textContent = "✓ Completed" + (isNaN(d) ? "" : " " + d.toLocaleDateString("en-AU", { day: "numeric", month: "short" }))
          + (firstFinished && typeof firstFinished.total === "number" ? " · " + firstFinished.total + "/9" : "");
      }
      card.querySelector(".go").textContent = isDone ? "Open again →" : "Start →";
      const btn = card.querySelector(".flag");
      btn.textContent = isDone ? "Undo done" : "Mark as done";
      btn.onclick = e => {
        e.preventDefault(); e.stopPropagation();
        const s = load();
        if (isDone) delete s.flags[v]; else s.flags[v] = { completed: true, at: new Date().toISOString(), manual: true };
        save(s); paint();
      };
    });
    document.getElementById("progress").textContent = done ? `${done} of ${cards.length} completed.` : "";
  }
  paint();
  window.addEventListener("pageshow", paint);
})();
</script>
</body>
</html>
"""


if __name__ == "__main__":
    vs = versions()
    for n, js, meta in vs:
        check_categories(n, meta)
        print("built", build_test(n, js, meta).relative_to(ROOT))
    build_index(vs)
    build_admin(vs)
    print("built pracadmin/index.html")
    print(f"index.html: {len(vs)} test(s)")
