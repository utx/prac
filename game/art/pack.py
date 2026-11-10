"""Trim the PNGs from render.py and save them as small WebP files in prac2/art/.

    python pack.py RENDER_DIR        (needs Pillow)
"""
import pathlib, sys
from PIL import Image

SRC = pathlib.Path(sys.argv[1])
DEST = pathlib.Path(__file__).resolve().parents[2] / "prac2" / "art"


def save(im, name, quality=86):
    im.save(DEST / f"{name}.webp", "WEBP", quality=quality, method=6)
    print(name, im.size, (DEST / f"{name}.webp").stat().st_size)


def trimmed(name, box):
    im = Image.open(SRC / f"{name}.png").convert("RGBA")
    im = im.crop(im.getbbox())
    im.thumbnail(box, Image.LANCZOS)
    return im


if (SRC / "crown3d.png").exists():
    save(trimmed("crown3d", (200, 200)), "crown3d")
for n in ("world-forest", "world-peaks", "world-reef"):
    if (SRC / f"{n}.png").exists():
        save(trimmed(n, (420, 420)), n)

# The five chests share one crop box, so the chest doesn't jump about as it fills.
chests = [Image.open(SRC / f"chest{i}.png").convert("RGBA") for i in range(5) if (SRC / f"chest{i}.png").exists()]
if len(chests) == 5:
    boxes = [c.getbbox() for c in chests]
    box = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
    for i, c in enumerate(chests):
        c = c.crop(box)
        c.thumbnail((300, 300), Image.LANCZOS)
        save(c, f"chest{i}")

for n in ("arena-forest", "arena-peaks", "arena-reef"):
    if (SRC / f"{n}.png").exists():
        save(Image.open(SRC / f"{n}.png").convert("RGB"), n, quality=80)
