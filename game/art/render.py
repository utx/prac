"""Render Crown Quest's own 3D art with Blender (original models, built here from primitives).

    python render.py OUT_DIR [scene ...]
    scenes: crown forest peaks reef chest arena-forest arena-peaks arena-reef

Needs Blender's Python module (pip install bpy). Writes PNGs (transparent background, except
the boss arenas). game/art/pack.py then trims them and saves the WebP files in prac2/art/.
"""
import math, random, sys
import bpy
from mathutils import Vector

OUT = sys.argv[1]
WANT = sys.argv[2:] or ["crown", "forest", "peaks", "reef", "chest", "arena-forest", "arena-peaks", "arena-reef"]


# ---------- helpers ----------
def reset(w, h, samples=64, sky=(0.62, 0.72, 1.0), sky_strength=0.3, transparent=True):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    sc.render.film_transparent = transparent
    sc.render.resolution_x, sc.render.resolution_y = w, h
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"
    world = bpy.data.worlds.new("w")
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs[0].default_value = (*sky, 1)
    bg.inputs[1].default_value = sky_strength
    return sc


def mat(name, rgb, rough=0.75, metal=0.0, emit=0.0, alpha=1.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*rgb, 1)
        b.inputs["Emission Strength"].default_value = emit
    b.inputs["Alpha"].default_value = alpha
    return m


def put(obj, m):
    obj.data.materials.append(m)
    return obj


def cone(loc, r1, r2, depth, m, verts=7, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r1, radius2=r2, depth=depth, location=loc, rotation=rot)
    return put(bpy.context.object, m)


def cyl(loc, r, depth, m, verts=10, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc, rotation=rot)
    return put(bpy.context.object, m)


def ball(loc, r, m, sub=2, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=sub, radius=r, location=loc)
    o = put(bpy.context.object, m)
    o.scale = scale
    return o


def box(loc, size, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = put(bpy.context.object, m)
    o.scale = size
    return o


def torus(loc, R, r, m):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=40, minor_segments=8, location=loc)
    return put(bpy.context.object, m)


def jitter(obj, amount, rng, keep_top=None):
    for v in obj.data.vertices:
        if keep_top is not None and v.co.z > keep_top:
            continue
        v.co += Vector((rng.uniform(-1, 1), rng.uniform(-1, 1), rng.uniform(-1, 1))) * amount


def sun(rot, strength=3.5, color=(1, 0.96, 0.88)):
    d = bpy.data.lights.new("sun", "SUN")
    d.energy = strength
    d.color = color
    d.angle = math.radians(6)
    o = bpy.data.objects.new("sun", d)
    o.rotation_euler = rot
    bpy.context.collection.objects.link(o)


def area(loc, energy, color, size=4, target=(0, 0, 0)):
    d = bpy.data.lights.new("area", "AREA")
    d.energy = energy
    d.color = color
    d.size = size
    o = bpy.data.objects.new("area", d)
    o.location = loc
    bpy.context.collection.objects.link(o)
    o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()


def camera(loc, target, lens=50):
    d = bpy.data.cameras.new("cam")
    d.lens = lens
    o = bpy.data.objects.new("cam", d)
    o.location = loc
    bpy.context.collection.objects.link(o)
    o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    bpy.context.scene.camera = o


def render(name):
    bpy.context.scene.render.filepath = f"{OUT}/{name}.png"
    bpy.ops.render.render(write_still=True)
    print("rendered", name)


# ---------- shared models ----------
def tree(rng, x, y, s, trunk, greens, z=0.2):
    cyl((x, y, z + 0.3 * s), 0.13 * s, 0.6 * s, trunk, verts=6)
    g = rng.choice(greens)
    for k in range(3):
        c = cone((x, y, 0.55 * s + z + k * 0.5 * s), (0.75 - k * 0.17) * s, 0, 0.95 * s, g, verts=7, rot=(0, 0, rng.uniform(0, 1)))
        jitter(c, 0.03, rng)


def peak(rng, x, y, r, h, m, snow, z=0.15):
    c = cone((x, y, z + h / 2), r, 0.0, h, m, verts=6, rot=(0, 0, rng.uniform(0, 1)))
    jitter(c, 0.09, rng, keep_top=h / 2 - 0.2)
    cap = cone((x, y, z + h - h * 0.14), r * 0.3, 0.0, h * 0.29, snow, verts=6, rot=c.rotation_euler)
    jitter(cap, 0.03, rng, keep_top=h * 0.1)


def coral(rng, x, y, m, z=0.17, n=5, size=1.0):
    for k in range(n):
        a, lean = rng.uniform(0, 6.28), rng.uniform(0.15, 0.5)
        h = rng.uniform(0.6, 1.3) * size
        cyl((x + math.cos(a) * lean * h / 2, y + math.sin(a) * lean * h / 2, z + h / 2), 0.09 * size, h, m, verts=6,
            rot=(math.sin(a) * -lean, math.cos(a) * lean, 0))
        ball((x + math.cos(a) * lean * h, y + math.sin(a) * lean * h, z + 0.03 + h), 0.14 * size, m, sub=1)


def fish(x, y, z, a, col, s=1.0):
    m = mat("fish", col, rough=0.35, emit=0.3)
    ball((x, y, z), 0.26 * s, m, sub=2, scale=(1.5, 0.55, 0.9)).rotation_euler = (0, 0, a)
    cone((x - math.cos(a) * 0.45 * s, y - math.sin(a) * 0.45 * s, z), 0.22 * s, 0.02, 0.3 * s, m, verts=4, rot=(0, math.pi / 2, a))
    ball((x + math.cos(a) * 0.22 * s, y + math.sin(a) * 0.22 * s - 0.12 * s, z + 0.06 * s), 0.045 * s, mat("eye", (0.02, 0.02, 0.05)), sub=1)


def island(rng, top, side, radius=3.0):
    """A floating island: a flat top and a ragged rock underneath."""
    t = cyl((0, 0, 0), radius, 0.35, top, verts=11)
    jitter(t, 0.07, rng)
    r = cone((0, 0, -1.55), radius * 0.97, 0.25, 2.8, side, verts=11)
    jitter(r, 0.22, rng, keep_top=1.3)
    for i in range(5):                      # hanging rocks
        a = rng.uniform(0, 6.28)
        d = rng.uniform(0.3, 1.6)
        o = cone((math.cos(a) * d, math.sin(a) * d, -2.6 - rng.uniform(0, .5)), 0.35, 0.02, 1.1, side, verts=5, rot=(math.pi, 0, 0))
        jitter(o, 0.05, rng)


def island_view():
    sun((math.radians(50), 0, math.radians(35)), 2.4)
    area((-5, -4, 3), 220, (0.55, 0.45, 1.0))          # purple rim light, storm side
    area((4, -6, -3), 120, (1.0, 0.75, 0.4))           # warm bounce from below
    camera((0, -14.5, 7.4), (0, 0, -0.55), lens=58)


ROCK = (0.2, 0.15, 0.27)


# ---------- the crown ----------
def crown():
    reset(512, 512, 96)
    gold = mat("gold", (1.0, 0.72, 0.12), rough=0.22, metal=1.0)
    dark = mat("band", (0.75, 0.42, 0.05), rough=0.3, metal=1.0)
    gems = [mat("ruby", (0.95, 0.08, 0.2), 0.15, 0, 0.15), mat("sapph", (0.1, 0.4, 1.0), 0.15, 0, 0.15), mat("emer", (0.1, 0.85, 0.35), 0.15, 0, 0.15)]
    cyl((0, 0, 0), 1.5, 0.55, dark, verts=40)
    cyl((0, 0, 0.42), 1.42, 0.5, gold, verts=40)
    n = 5
    for i in range(n):
        a = i / n * 6.283 + math.pi / 2
        x, y = math.cos(a) * 1.3, math.sin(a) * 1.3
        cone((x, y, 1.2), 0.44, 0.0, 1.3, gold, verts=4, rot=(0, 0, a + math.pi / 4))
        ball((x, y, 1.95), 0.17, gems[(i + 1) % 3], sub=1)
        a2 = a + 6.283 / n / 2
        ball((math.cos(a2) * 1.52, math.sin(a2) * 1.52, 0.02), 0.2, gems[i % 3], sub=1)
    sun((math.radians(45), 0, math.radians(30)), 1.6)
    area((3, -4, 4), 260, (1, 0.95, 0.8))
    area((-4, -3, 1), 200, (0.6, 0.5, 1.0))
    area((0, -5, -2), 90, (1.0, 0.6, 0.3))
    camera((0, -8.2, 3.6), (0, 0, 0.75), lens=62)
    render("crown3d")


# ---------- the three world islands ----------
def forest():
    rng = random.Random(4)
    reset(720, 560)
    trunk = mat("trunk", (0.36, 0.2, 0.1))
    greens = [mat("g1", (0.08, 0.5, 0.2)), mat("g2", (0.12, 0.62, 0.28)), mat("g3", (0.05, 0.42, 0.26))]
    island(rng, mat("grass", (0.25, 0.72, 0.22)), mat("rock", ROCK))
    for x, y, s in [(-1.7, 0.9, 1.25), (-0.6, 1.6, 1.0), (1.5, 1.1, 1.35), (2.0, -0.3, 0.9), (-2.1, -0.6, 0.85), (0.5, 0.6, 1.6), (-0.9, -0.2, 0.7)]:
        tree(rng, x, y, s, trunk, greens)
    cyl((0.6, -1.5, 0.35), 0.5, 0.4, trunk, verts=8)                    # an open book on a stump
    page = mat("page", (1.0, 0.97, 0.85), emit=1.2)
    box((0.6, -1.5, 0.6), (1.15, 0.8, 0.06), mat("cover", (0.75, 0.12, 0.15)))
    box((0.33, -1.5, 0.68), (0.5, 0.7, 0.07), page, rot=(0, math.radians(-12), 0))
    box((0.87, -1.5, 0.68), (0.5, 0.7, 0.07), page, rot=(0, math.radians(12), 0))
    for x, y in [(-1.6, -1.6), (1.9, -1.4), (-0.4, -2.2)]:              # mushrooms
        cyl((x, y, 0.3), 0.07, 0.3, mat("stalk", (0.95, 0.92, 0.85)), verts=6)
        ball((x, y, 0.47), 0.2, mat("cap", (0.9, 0.15, 0.2)), sub=1, scale=(1, 1, 0.6))
    island_view()
    render("world-forest")


def peaks():
    rng = random.Random(9)
    reset(720, 560)
    stone = [mat("s1", (0.48, 0.4, 0.66)), mat("s2", (0.4, 0.34, 0.58)), mat("s3", (0.56, 0.48, 0.72))]
    snow = mat("snow", (0.97, 0.98, 1.0), rough=0.5)
    island(rng, mat("ground", (0.5, 0.42, 0.62)), mat("rock", ROCK))
    for (x, y, r, h), m in zip([(-1.2, 0.8, 1.4, 2.5), (0.9, 0.9, 1.6, 3.2), (1.6, -0.6, 1.0, 1.7), (-1.9, -0.7, 0.9, 1.4)], stone + [stone[0]]):
        peak(rng, x, y, r, h, m, snow)
    cyl((0.9, 0.9, 3.65), 0.03, 0.9, mat("pole", (0.2, 0.2, 0.25)), verts=6)       # flag on the highest peak
    box((1.18, 0.9, 3.92), (0.55, 0.03, 0.32), mat("flag", (1.0, 0.85, 0.1), emit=0.8))
    for (x, y, s), col in zip([(-0.2, -1.6, 0.55), (0.45, -1.9, 0.4), (-0.75, -2.0, 0.34)], [(0.2, 0.6, 1.0), (1.0, 0.45, 0.15), (0.3, 0.85, 0.4)]):
        box((x, y, 0.17 + s / 2), (s, s, s), mat("cube", col, rough=0.35), rot=(0, 0, rng.uniform(0, 1)))
    island_view()
    render("world-peaks")


CORALS = [(1.0, 0.35, 0.45), (1.0, 0.55, 0.15), (0.85, 0.3, 0.9), (1.0, 0.8, 0.25)]


def reef():
    rng = random.Random(12)
    reset(720, 560)
    island(rng, mat("sand", (0.95, 0.82, 0.55)), mat("rock", ROCK))
    cyl((0, 0, 0.75), 2.95, 1.15, mat("water", (0.1, 0.6, 0.95), rough=0.08, alpha=0.33), verts=11)
    for i, (x, y) in enumerate([(-1.6, 0.6), (1.4, 0.9), (0.2, -1.3), (-0.7, -0.4), (1.8, -0.7)]):
        coral(rng, x, y, mat("coral", CORALS[i % 4], rough=0.5, emit=0.9))
    for (x, y, z, a), col in zip([(-0.4, 0.5, 1.75, 0.3), (0.9, -0.2, 1.95, 2.8), (-1.3, -0.9, 1.7, 0.1)], [(1.0, 0.5, 0.05), (1.0, 0.85, 0.1), (0.2, 0.9, 0.8)]):
        fish(x, y, z, a, col)
    glass = mat("bubble", (0.85, 0.95, 1.0), rough=0.02, alpha=0.35)
    for i in range(7):
        ball((rng.uniform(-2, 2), rng.uniform(-1.8, 1), rng.uniform(1.5, 2.9)), rng.uniform(0.06, 0.15), glass, sub=2)
    island_view()
    render("world-reef")


# ---------- the treasure chest, at five stages from empty to overflowing ----------
def chest():
    COINS = [0, 16, 45, 90, 150]
    HEIGHT = [0, 0.1, 0.28, 0.5, 0.8]
    for level in range(5):
        rng = random.Random(21)
        reset(512, 512, 72)
        wood = mat("wood", (0.42, 0.2, 0.08), rough=0.6)
        wood2 = mat("wood2", (0.5, 0.25, 0.1), rough=0.6)
        gold = mat("gold", (1.0, 0.72, 0.12), rough=0.25, metal=1.0)
        dark = mat("inside", (0.05, 0.03, 0.03))
        coin = mat("coin", (1.0, 0.78, 0.15), rough=0.28, metal=1.0, emit=0.25 if level == 4 else 0.05)
        box((0, 0, 0.55), (2.2, 1.4, 1.1), wood)                                   # body
        box((0, 0, 1.085), (2.0, 1.2, 0.05), dark)                                 # the dark inside
        for x in (-0.75, 0.75):                                                     # gold bands
            box((x, 0, 0.55), (0.2, 1.44, 1.12), gold)
        for z in (0.06, 1.05):
            box((0, -0.01, z), (2.24, 1.44, 0.12), gold)
        box((0, -0.72, 0.72), (0.34, 0.08, 0.42), gold)                             # lock plate
        ball((0, -0.78, 0.7), 0.07, dark, sub=1)
        lid_rot = (math.radians(-100), 0, 0)                                        # lid, open and leaning back
        box((0, 1.068, 1.746), (2.2, 1.4, 0.5), wood2, rot=lid_rot)
        for x in (-0.75, 0.75):
            box((x, 1.068, 1.746), (0.2, 1.44, 0.52), gold, rot=lid_rot)
        box((0, 1.068, 1.746), (2.24, 1.44, 0.1), gold, rot=lid_rot)
        h = HEIGHT[level]
        for i in range(COINS[level]):                                               # the pile of coins
            x, y = rng.uniform(-0.92, 0.92), rng.uniform(-0.5, 0.5)
            top = h * (1 - (x / 1.25) ** 2) * (1 - (y / 0.9) ** 2)
            cyl((x, y, 1.13 + rng.uniform(0, 1) * top), 0.17, 0.045, coin, verts=12,
                rot=(rng.uniform(-0.5, 0.5), rng.uniform(-0.5, 0.5), rng.uniform(0, 3)))
        gems = [(0.95, 0.08, 0.2), (0.1, 0.4, 1.0), (0.1, 0.85, 0.35), (0.7, 0.2, 1.0)]
        for i in range([0, 0, 2, 4, 7][level]):
            x, y = rng.uniform(-0.8, 0.8), rng.uniform(-0.45, 0.35)
            ball((x, y, 1.16 + h * (1 - (x / 1.25) ** 2) * 0.95), 0.15, mat("gem", gems[i % 4], 0.12, 0, 0.4), sub=1)
        if level == 4:                                                              # overflowing: coins on the floor and a glow
            for i in range(16):
                a = rng.uniform(3.3, 6.1)
                d = rng.uniform(1.5, 2.3)
                cyl((math.cos(a) * d, math.sin(a) * d * 0.8, 0.03), 0.17, 0.045, coin, verts=12, rot=(0, 0, rng.uniform(0, 3)))
            area((0, -0.2, 3.2), 260, (1.0, 0.85, 0.3), size=1.5, target=(0, 0, 1))
            star = mat("spark", (1.0, 0.95, 0.6), emit=9)
            for x, y, z in [(-0.7, -0.3, 2.3), (0.6, 0.1, 2.6), (0.1, -0.5, 2.9), (-1.2, -0.9, 1.2), (1.3, -0.8, 1.5)]:
                ball((x, y, z), 0.06, star, sub=1)
        sun((math.radians(45), 0, math.radians(30)), 2.2)
        area((4, -5, 4), 300, (1, 0.95, 0.85))
        area((-5, -3, 2), 220, (0.6, 0.5, 1.0))
        camera((3.4, -6.6, 4.6), (0, 0.25, 1.05), lens=50)
        render(f"chest{level}")


# ---------- boss arenas: a wide backdrop with an empty glowing platform in the middle ----------
def arena_base(sky, ground, plat, glow):
    reset(1200, 400, 72, sky=sky, sky_strength=1.0, transparent=False)
    ground, plat, glow = mat("ground", ground), mat("plat", plat, rough=0.5), mat("glow", glow, emit=14)
    cyl((0, 6, -0.1), 30, 0.2, ground, verts=48)
    cyl((0, 0, 0.17), 2.3, 0.4, plat, verts=12)
    cyl((0, 0, 0.42), 1.9, 0.14, plat, verts=12)
    torus((0, 0, 0.5), 1.55, 0.07, glow)
    torus((0, 0, 0.38), 2.28, 0.05, glow)
    camera((0, -10.5, 2.3), (0, 0, 1.75), lens=30)


def arena_forest():
    rng = random.Random(31)
    arena_base((0.01, 0.05, 0.07), (0.06, 0.22, 0.12), (0.3, 0.32, 0.36), (0.3, 1.0, 0.5))
    trunk = mat("trunk", (0.3, 0.17, 0.09))
    greens = [mat("g1", (0.05, 0.36, 0.2)), mat("g2", (0.08, 0.46, 0.25)), mat("g3", (0.04, 0.3, 0.22))]
    for i in range(46):
        side = rng.choice((-1, 1))
        y = rng.uniform(-2, 16)
        x = side * rng.uniform(3.4 + max(0, y) * 0.12, 13)
        tree(rng, x, y, rng.uniform(1.6, 3.4), trunk, greens, z=0)
    for i in range(7):                                                              # a row of trees behind the platform
        tree(rng, -4.5 + i * 1.5 + rng.uniform(-.3, .3), rng.uniform(9, 12), rng.uniform(2.6, 4), trunk, greens, z=0)
    fly = mat("fly", (0.8, 1.0, 0.4), emit=30)
    for i in range(34):                                                             # fireflies
        ball((rng.uniform(-9, 9), rng.uniform(-3, 8), rng.uniform(0.5, 4.5)), 0.045, fly, sub=1)
    sun((math.radians(55), 0, math.radians(-30)), 0.7, (0.5, 0.7, 1.0))            # moonlight
    area((0, -1, 5), 500, (0.35, 1.0, 0.55), size=3)
    area((-8, -4, 3), 300, (0.2, 0.5, 1.0))
    area((8, -4, 3), 300, (0.6, 0.3, 1.0))
    render("arena-forest")


def arena_peaks():
    rng = random.Random(32)
    arena_base((0.07, 0.03, 0.16), (0.24, 0.2, 0.36), (0.34, 0.3, 0.44), (0.75, 0.4, 1.0))
    stone = [mat("s1", (0.36, 0.3, 0.52)), mat("s2", (0.3, 0.25, 0.46)), mat("s3", (0.42, 0.36, 0.58))]
    snow = mat("snow", (0.9, 0.92, 1.0), rough=0.5)
    for i in range(22):
        side = rng.choice((-1, 1))
        y = rng.uniform(1, 18)
        peak(rng, side * rng.uniform(4.2 + y * 0.15, 15), y, rng.uniform(1.5, 3.2), rng.uniform(3, 8.5), rng.choice(stone), snow, z=0)
    for i in range(5):
        peak(rng, -6 + i * 3 + rng.uniform(-.6, .6), rng.uniform(13, 17), rng.uniform(2.5, 3.5), rng.uniform(5, 9), rng.choice(stone), snow, z=0)
    for i in range(14):                                                             # broken rocks near the platform
        a = rng.uniform(0, 6.28)
        d = rng.uniform(2.8, 4.6)
        o = cone((math.cos(a) * d, math.sin(a) * d * 0.6, 0.25), rng.uniform(0.25, 0.5), 0.05, rng.uniform(0.4, 1.0), rng.choice(stone), verts=5)
        jitter(o, 0.07, rng)
    bolt = mat("bolt", (0.9, 0.85, 1.0), emit=40)                                   # two lightning bolts
    for bx in (-6.5, 7.2):
        x, z = bx, 9.0
        for k in range(6):
            dx = rng.uniform(-0.7, 0.7)
            box((x + dx / 2, 10, z - 0.6), (0.09, 0.09, 1.35), bolt, rot=(0, math.atan2(dx, 1.2), 0))
            x, z = x + dx, z - 1.2
    sun((math.radians(60), 0, math.radians(25)), 0.9, (0.7, 0.6, 1.0))
    area((0, -1, 5), 500, (0.8, 0.5, 1.0), size=3)
    area((-8, -4, 3), 350, (0.3, 0.4, 1.0))
    area((8, -3, 4), 350, (1.0, 0.5, 0.8))
    render("arena-peaks")


def arena_reef():
    rng = random.Random(33)
    arena_base((0.0, 0.07, 0.2), (0.25, 0.4, 0.5), (0.25, 0.36, 0.48), (0.2, 0.9, 1.0))
    for i in range(40):
        side = rng.choice((-1, 1))
        y = rng.uniform(-2, 14)
        coral(rng, side * rng.uniform(3.3 + max(0, y) * 0.1, 12), y, mat("coral", CORALS[i % 4], rough=0.5, emit=1.4), z=0, n=6, size=rng.uniform(1.4, 3.2))
    rockm = mat("rock", (0.12, 0.2, 0.32))
    for i in range(9):                                                              # dark rock walls of the trench
        side = -1 if i % 2 else 1
        o = cone((side * rng.uniform(9, 14), rng.uniform(6, 16), 3.5), rng.uniform(3, 5), 0.6, rng.uniform(7, 11), rockm, verts=6)
        jitter(o, 0.3, rng)
    cols = [(1.0, 0.5, 0.05), (1.0, 0.85, 0.1), (0.2, 0.9, 0.8), (1.0, 0.4, 0.6)]
    for i in range(12):
        side = rng.choice((-1, 1))
        fish(side * rng.uniform(3.2, 9), rng.uniform(-1, 7), rng.uniform(1.5, 5.5), 0 if side < 0 else math.pi, cols[i % 4], s=rng.uniform(0.9, 1.7))
    glass = mat("bubble", (0.8, 0.95, 1.0), rough=0.02, emit=0.6, alpha=0.5)
    for i in range(40):
        ball((rng.uniform(-10, 10), rng.uniform(-3, 8), rng.uniform(0.6, 6)), rng.uniform(0.05, 0.16), glass, sub=2)
    sun((math.radians(15), 0, 0), 1.0, (0.4, 0.8, 1.0))                             # light from the surface
    area((0, -1, 5), 500, (0.3, 0.9, 1.0), size=3)
    area((-8, -4, 3), 300, (0.2, 0.4, 1.0))
    area((8, -4, 3), 300, (0.2, 1.0, 0.8))
    render("arena-reef")


SCENES = {"crown": crown, "forest": forest, "peaks": peaks, "reef": reef, "chest": chest,
          "arena-forest": arena_forest, "arena-peaks": arena_peaks, "arena-reef": arena_reef}
for s in WANT:
    SCENES[s]()
