"""Pack the fighter frames rendered by game3/art/fighters.py into one sprite sheet each.

    python pack_fighters.py RENDER_DIR

Each sheet (prac3/art/fighter-NAME.webp) is 8 frames across and 9 down (70 frames), every frame 144 x 192,
in the order of ANIMS in fighters.py. game3/arena.js reads them in that order; the feet of a
standing fighter sit at (62, 172) in its frame.
"""
import os, sys
from PIL import Image

SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FW, FH, COLS, N = 144, 192, 8, 70
NAMES = ["hero-common", "hero-rare", "hero-epic", "hero-legendary", "ranger", "knight", "robot", "king"]

for name in NAMES:
    sheet = Image.new("RGBA", (FW * COLS, FH * ((N + COLS - 1) // COLS)), (0, 0, 0, 0))
    for i in range(N):
        im = Image.open(os.path.join(SRC, name, f"{i:02d}.png")).convert("RGBA").resize((FW, FH), Image.LANCZOS)
        sheet.alpha_composite(im, ((i % COLS) * FW, (i // COLS) * FH))
    out = os.path.join(ROOT, "prac3", "art", f"fighter-{name}.webp")
    sheet.save(out, "WEBP", quality=82, method=6)
    print(out, os.path.getsize(out) // 1024, "KB")
