"""Make the island's land map for Storm Island (game3/content/01_land.js).

The other 99 players, the opponents and the supply drops must stand on land, not in the sea.
This reads prac3/art/island.webp (Epic's map picture), splits it into a 40 x 40 grid and marks
each square 1 (land) or 0 (sea or cloud). Run it again only if the map picture changes:

    python3 game3/art/landmask.py        (needs Pillow)
"""
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[2]
N = 40
im = Image.open(ROOT / "prac3" / "art" / "island.webp").convert("RGB").resize((N * 8, N * 8))
px = im.load()


def land(r, g, b):
    if r > 200 and g > 200 and b > 200:     # clouds
        return False
    return b < r + 25                       # sea and shallows are much bluer than red


rows = []
for gy in range(N):
    row = ""
    for gx in range(N):
        cells = [land(*px[gx * 8 + i, gy * 8 + j]) for i in range(8) for j in range(8)]
        row += "1" if sum(cells) >= 0.75 * len(cells) else "0"
    rows.append(row)
js = ("/* STORM ISLAND: where the land is on the map picture, made by game3/art/landmask.py (do not edit by hand).\n"
      "   40 x 40 squares, each 2.5% of the map; 1 = land. */\nconst LAND = [\n" + ",\n".join(f'  "{r}"' for r in rows) + "\n];\n")
(ROOT / "game3" / "content" / "01_land.js").write_text(js, encoding="utf-8")
print("land squares:", sum(r.count("1") for r in rows), "of", N * N)
