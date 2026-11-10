#!/usr/bin/env python3
"""Build the adventure game (Crown Quest) at prac2/index.html.

game/template.html is the engine (map, levels, bosses, stars, saved progress);
game/content/*.js hold the questions, one file per world. Never hand-edit
prac2/index.html: change the sources and run this (tools/build.py runs it too).

Usage:  python3 tools/build_game.py
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ORDER = ["reading", "thinking", "maths"]   # the order of the worlds on the map


def main():
    src = ROOT / "game" / "content"
    files = [src / f"{n}.js" for n in ORDER] + sorted(p for p in src.glob("*.js") if p.stem not in ORDER)
    content = "\n".join(p.read_text(encoding="utf-8") for p in files)
    page = (ROOT / "game" / "template.html").read_text(encoding="utf-8").replace("/*__CONTENT__*/", content)
    dest = ROOT / "prac2" / "index.html"
    dest.parent.mkdir(exist_ok=True)
    dest.write_text(page, encoding="utf-8")
    print("built", dest.relative_to(ROOT))


if __name__ == "__main__":
    main()
