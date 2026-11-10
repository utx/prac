"""Render Crown Quest's own 3D art with Blender (original models, built here from primitives).

    python render.py OUT_DIR [scene ...]      scenes: crown forest peaks reef

Needs Blender's Python module (pip install bpy) and Pillow. Writes PNGs with a transparent
background; tools are in game/art/, the finished WebP files live in prac2/art/.
"""
import math, random, sys
import bpy
from mathutils import Vector

OUT = sys.argv[1]
WANT = sys.argv[2:] or ["crown", "forest", "peaks", "reef"]


# ---------- helpers ----------
def reset(w, h, samples=64):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = samples
    sc.cycles.use_denoising = True
    sc.render.film_transparent = True
    sc.render.resolution_x, sc.render.resolution_y = w, h
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"
    world = bpy.data.worlds.new("w")
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs[0].default_value = (0.62, 0.72, 1.0, 1)
    bg.inputs[1].default_value = 0.3
    return sc


def mat(name, rgb, rough=0.75, metal=0.0, emit=0.0, alpha=1.0, transmission=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*rgb, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*rgb, 1)
        b.inputs["Emission Strength"].default_value = emit
    if transmission:
        b.inputs["Transmission Weight"].default_value = transmission
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


def area(loc, energy, color, size=4):
    d = bpy.data.lights.new("area", "AREA")
    d.energy = energy
    d.color = color
    d.size = size
    o = bpy.data.objects.new("area", d)
    o.location = loc
    bpy.context.collection.objects.link(o)
    o.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()


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


# ---------- scenes ----------
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
        cone((x, y, 1.2), 0.44, 0.0, 1.3, gold, verts=4, rot=(0, 0, a + math.pi / 4)).scale = (1, 1, 1)
        ball((x, y, 1.95), 0.17, gems[(i + 1) % 3], sub=1)
        a2 = a + 6.283 / n / 2
        ball((math.cos(a2) * 1.52, math.sin(a2) * 1.52, 0.02), 0.2, gems[i % 3], sub=1)
    sun((math.radians(45), 0, math.radians(30)), 1.6)
    area((3, -4, 4), 260, (1, 0.95, 0.8))
    area((-4, -3, 1), 200, (0.6, 0.5, 1.0))
    area((0, -5, -2), 90, (1.0, 0.6, 0.3))
    camera((0, -8.2, 3.6), (0, 0, 0.75), lens=62)
    render("crown3d")


def forest():
    rng = random.Random(4)
    reset(720, 560)
    grass = mat("grass", (0.25, 0.72, 0.22))
    rock = mat("rock", (0.2, 0.15, 0.27))
    trunk = mat("trunk", (0.36, 0.2, 0.1))
    greens = [mat("g1", (0.08, 0.5, 0.2)), mat("g2", (0.12, 0.62, 0.28)), mat("g3", (0.05, 0.42, 0.26))]
    island(rng, grass, rock)
    spots = [(-1.7, 0.9, 1.25), (-0.6, 1.6, 1.0), (1.5, 1.1, 1.35), (2.0, -0.3, 0.9), (-2.1, -0.6, 0.85), (0.5, 0.6, 1.6), (-0.9, -0.2, 0.7)]
    for x, y, s in spots:
        cyl((x, y, 0.2 + 0.3 * s), 0.13 * s, 0.6 * s, trunk, verts=6)
        g = rng.choice(greens)
        for k in range(3):
            c = cone((x, y, 0.55 * s + 0.2 + k * 0.5 * s), (0.75 - k * 0.17) * s, 0, 0.95 * s, g, verts=7, rot=(0, 0, rng.uniform(0, 1)))
            jitter(c, 0.03, rng)
    # an open book on a tree stump, glowing
    cyl((0.6, -1.5, 0.35), 0.5, 0.4, trunk, verts=8)
    page = mat("page", (1.0, 0.97, 0.85), emit=1.2)
    cover = mat("cover", (0.75, 0.12, 0.15))
    box((0.6, -1.5, 0.6), (1.15, 0.8, 0.06), cover)
    box((0.33, -1.5, 0.68), (0.5, 0.7, 0.07), page, rot=(0, math.radians(-12), 0))
    box((0.87, -1.5, 0.68), (0.5, 0.7, 0.07), page, rot=(0, math.radians(12), 0))
    for x, y in [(-1.6, -1.6), (1.9, -1.4), (-0.4, -2.2)]:      # mushrooms
        cyl((x, y, 0.3), 0.07, 0.3, mat("stalk", (0.95, 0.92, 0.85)), verts=6)
        ball((x, y, 0.47), 0.2, mat("cap", (0.9, 0.15, 0.2)), sub=1, scale=(1, 1, 0.6))
    island_view()
    render("world-forest")


def peaks():
    rng = random.Random(9)
    reset(720, 560)
    ground = mat("ground", (0.5, 0.42, 0.62))
    rock = mat("rock", (0.2, 0.15, 0.27))
    stone = [mat("s1", (0.48, 0.4, 0.66)), mat("s2", (0.4, 0.34, 0.58)), mat("s3", (0.56, 0.48, 0.72))]
    snow = mat("snow", (0.97, 0.98, 1.0), rough=0.5)
    island(rng, ground, rock)
    for (x, y, r, h), m in zip([(-1.2, 0.8, 1.4, 2.5), (0.9, 0.9, 1.6, 3.2), (1.6, -0.6, 1.0, 1.7), (-1.9, -0.7, 0.9, 1.4)], stone + [stone[0]]):
        c = cone((x, y, 0.15 + h / 2), r, 0.0, h, m, verts=6, rot=(0, 0, rng.uniform(0, 1)))
        jitter(c, 0.09, rng, keep_top=h / 2 - 0.2)
        cap = cone((x, y, 0.15 + h - h * 0.14), r * 0.3, 0.0, h * 0.29, snow, verts=6, rot=c.rotation_euler)
        jitter(cap, 0.03, rng, keep_top=h * 0.1)
    # flag on the highest peak
    cyl((0.9, 0.9, 3.65), 0.03, 0.9, mat("pole", (0.2, 0.2, 0.25)), verts=6)
    box((1.18, 0.9, 3.92), (0.55, 0.03, 0.32), mat("flag", (1.0, 0.85, 0.1), emit=0.8))
    # puzzle cubes at the foot
    for (x, y, s), col in zip([(-0.2, -1.6, 0.55), (0.45, -1.9, 0.4), (-0.75, -2.0, 0.34)], [(0.2, 0.6, 1.0), (1.0, 0.45, 0.15), (0.3, 0.85, 0.4)]):
        box((x, y, 0.17 + s / 2), (s, s, s), mat("cube", col, rough=0.35), rot=(0, 0, rng.uniform(0, 1)))
    island_view()
    render("world-peaks")


def reef():
    rng = random.Random(12)
    reset(720, 560)
    sand = mat("sand", (0.95, 0.82, 0.55))
    rock = mat("rock", (0.2, 0.15, 0.27))
    island(rng, sand, rock)
    water = mat("water", (0.1, 0.6, 0.95), rough=0.08, alpha=0.33)
    w = cyl((0, 0, 0.75), 2.95, 1.15, water, verts=11)
    corals = [(1.0, 0.35, 0.45), (1.0, 0.55, 0.15), (0.85, 0.3, 0.9), (1.0, 0.8, 0.25)]
    for i, (x, y) in enumerate([(-1.6, 0.6), (1.4, 0.9), (0.2, -1.3), (-0.7, -0.4), (1.8, -0.7)]):
        m = mat("coral", corals[i % 4], rough=0.5, emit=0.9)
        for k in range(5):
            a, lean = rng.uniform(0, 6.28), rng.uniform(0.15, 0.5)
            h = rng.uniform(0.6, 1.3)
            o = cyl((x + math.cos(a) * lean * h / 2, y + math.sin(a) * lean * h / 2, 0.17 + h / 2), 0.09, h, m, verts=6,
                    rot=(math.sin(a) * -lean, math.cos(a) * lean, 0))
            ball((x + math.cos(a) * lean * h, y + math.sin(a) * lean * h, 0.2 + h), 0.14, m, sub=1)
    for (x, y, z, a), col in zip([(-0.4, 0.5, 1.75, 0.3), (0.9, -0.2, 1.95, 2.8), (-1.3, -0.9, 1.7, 0.1)], [(1.0, 0.5, 0.05), (1.0, 0.85, 0.1), (0.2, 0.9, 0.8)]):
        m = mat("fish", col, rough=0.35, emit=0.3)
        ball((x, y, z), 0.26, m, sub=2, scale=(1.5, 0.55, 0.9)).rotation_euler = (0, 0, a)
        cone((x - math.cos(a) * 0.45, y - math.sin(a) * 0.45, z), 0.22, 0.02, 0.3, m, verts=4, rot=(0, math.pi / 2, a))
        ball((x + math.cos(a) * 0.22, y + math.sin(a) * 0.22 - 0.12, z + 0.06), 0.045, mat("eye", (0.02, 0.02, 0.05)), sub=1)
    glass = mat("bubble", (0.85, 0.95, 1.0), rough=0.02, alpha=0.35)
    for i in range(7):
        ball((rng.uniform(-2, 2), rng.uniform(-1.8, 1), rng.uniform(1.5, 2.9)), rng.uniform(0.06, 0.15), glass, sub=2)
    island_view()
    render("world-reef")


SCENES = {"crown": crown, "forest": forest, "peaks": peaks, "reef": reef}
for s in WANT:
    SCENES[s]()
