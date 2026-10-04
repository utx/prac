#!/usr/bin/env python3
"""Build every practice test and the index page.

For each content/vNN.js (+ content/vNN.json metadata):
  - tests/vNN/index.html is assembled from tools/template.html
Then index.html is regenerated with one button per test, newest first.

Usage:  python3 tools/build.py
"""
import datetime, html, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEMPLATE = (ROOT / "tools" / "template.html").read_text(encoding="utf-8")


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


def build_test(n, js):
    content = js.read_text(encoding="utf-8")
    page = TEMPLATE.replace("{{N}}", str(n)).replace("/*__CONTENT__*/", content)
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
    return f'''      <a class="test" href="tests/v{n}/index.html">
        <span class="num">Test {n}</span>
        <span class="meta">{date}</span>
        <span class="reading">{reading}</span>
        <span class="mix">3 reading · 3 thinking skills · 3 maths</span>
        <span class="go">Start →</span>
      </a>'''


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
  }
  :root[data-theme="dark"] { --ink: #e8ecf3; --ink-soft: #a9b3c4; --line: #33405a; --paper: #1d2638; --field: #141b29; --chip: #26324a; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) { --ink: #e8ecf3; --ink-soft: #a9b3c4; --line: #33405a; --paper: #1d2638; --field: #141b29; --chip: #26324a; }
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
  a.test { display: flex; flex-direction: column; gap: 6px; background: var(--paper); border: 1px solid var(--line);
    border-radius: 10px; padding: 18px 18px 16px; color: var(--ink); text-decoration: none;
    transition: border-color .12s, transform .12s; }
  a.test:hover, a.test:focus-visible { border-color: var(--pitch); transform: translateY(-1px); outline: none; }
  a.test:first-child { border: 2px solid var(--pitch); }
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
  <p class="lead">Each test has three reading, three thinking skills and three maths questions, with explanations at the end of each section. The newest test is first.</p>
  <div class="grid">
{{CARDS}}
  </div>
</main>
</body>
</html>
"""


if __name__ == "__main__":
    vs = versions()
    for n, js, _ in vs:
        print("built", build_test(n, js).relative_to(ROOT))
    build_index(vs)
    print(f"index.html: {len(vs)} test(s)")
