#!/usr/bin/env python3
"""Build the battle game (Storm Island) at prac3/index.html.

game3/template.html is the engine (island map, storm circles, battles, shop, Fortnite time);
game3/content/*.js hold the questions: 00_lib.js (drawing helpers), generators.js (templates
that redraw themselves with new numbers) and reading.js, thinking.js, maths.js (hand-written).
Never hand-edit prac3/index.html: change the sources and run this (tools/build.py runs it too).

Usage:  python3 tools/build_game3.py
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    files = sorted((ROOT / "game3" / "content").glob("*.js"))   # 00_lib.js sorts first
    content = "\n".join(p.read_text(encoding="utf-8") for p in files)
    page = (ROOT / "game3" / "template.html").read_text(encoding="utf-8").replace("/*__CONTENT__*/", content)
    dest = ROOT / "prac3" / "index.html"
    dest.parent.mkdir(exist_ok=True)
    dest.write_text(page, encoding="utf-8")
    print("built", dest.relative_to(ROOT))


if __name__ == "__main__":
    main()
