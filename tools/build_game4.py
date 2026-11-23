#!/usr/bin/env python3
"""Build the platform game (Ridge Runner) at prac4/index.html.

game4/template.html is the page (map, briefing, kit, results, the admin coach sidebar);
game4/platform.js is the platform level and the sniper nests (pixel art drawn in code);
game4/content/*.js hold the skill tracks (10_tracks.js), the templates (20_maths.js, 21_thinking_gen.js)
and the hand-written questions (30_thinking.js, 40_reading.js), joined in name order.
Never hand-edit prac4/index.html: change the sources and run this (tools/build.py runs it too).

Usage:  python3 tools/build_game4.py
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent


def main():
    files = sorted((ROOT / "game4" / "content").glob("*.js"))
    content = "\n".join(p.read_text(encoding="utf-8") for p in files)
    page = (ROOT / "game4" / "template.html").read_text(encoding="utf-8")
    page = page.replace("/*__CONTENT__*/", content).replace("/*__PLATFORM__*/", (ROOT / "game4" / "platform.js").read_text(encoding="utf-8"))
    dest = ROOT / "prac4" / "index.html"
    dest.parent.mkdir(exist_ok=True)
    dest.write_text(page, encoding="utf-8")
    print("built", dest.relative_to(ROOT))


if __name__ == "__main__":
    main()
