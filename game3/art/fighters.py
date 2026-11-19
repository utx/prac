"""Render Storm Island's arena fighters with Blender: our own chunky cartoon characters
(not copies of anyone's), built from rounded primitives on a simple joint skeleton and
posed frame by frame.

    python fighters.py OUT_DIR [name ...]
    names: hero-common hero-rare hero-epic hero-legendary ranger knight robot king

Needs Blender's Python module (pip install bpy, Python 3.11). Writes OUT_DIR/NAME/NN.png
(192 x 256, transparent). game3/art/pack_fighters.py then packs each into one sprite sheet
in prac3/art/fighter-NAME.webp. The order of the frames is ANIMS below; game3/arena.js uses
the same order.
"""
import math, sys, os
import bpy
from mathutils import Vector

OUT = sys.argv[1]
W, H = 192, 256
CAM_Z, ORTHO = 1.30, 3.3          # camera centre height and how many units fit top to bottom
ANIMS = [("idle", 4), ("run", 8), ("jump", 3), ("shoot", 3), ("hit", 2), ("build", 3), ("heal", 4), ("dance", 8), ("knocked", 4), ("ko", 1),
         # emotes (David, Nov 2026): classic everyday dance moves, not any game's own dances
         ("robot", 6), ("runman", 6), ("disco", 6), ("jacks", 6), ("spin", 6)]


def lin(hexcol):
    v = [int(hexcol[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in v)


LOOKS = {
    "hero-common": dict(type="hoodie", main="#8a94a6", dark="#4a5160", trim="#ffe81a", skin="#f2c39b", glass="#7fd7ff", gun="#2b2f3a"),
    "hero-rare": dict(type="hoodie", main="#2f8fff", dark="#1b4f94", trim="#ffe81a", skin="#f2c39b", glass="#a8ecff", gun="#2b2f3a"),
    "hero-epic": dict(type="hoodie", main="#a34dff", dark="#5b2a94", trim="#ffe81a", skin="#d99a6c", glass="#7fd7ff", gun="#2b2f3a"),
    "hero-legendary": dict(type="hoodie", main="#ffb21a", dark="#a8650a", trim="#ffffff", skin="#f2c39b", glass="#2f8fff", gun="#2b2f3a"),
    "ranger": dict(type="ranger", main="#2e9e5b", dark="#1d5e38", trim="#e3c16f", skin="#d99a6c", glass="#10151f", gun="#5b3a1e"),
    "knight": dict(type="knight", main="#8b5cd6", dark="#4b2a85", trim="#ffd43b", skin="#f0c49c", glass="#22d3ee", gun="#3a3f52"),
    "robot": dict(type="robot", main="#3b8fd6", dark="#1f4f80", trim="#ff922b", skin="#c9d3e0", glass="#ff3b3b", gun="#3a3f52"),
    "king": dict(type="king", main="#b8322a", dark="#6e1f17", trim="#ffd700", skin="#e0a77f", glass="#5c3a21", gun="#2a2a2a", cape="#5b1a7a"),
}


# ---------- scene ----------
def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    MATS.clear()
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    sc.cycles.device = "CPU"
    sc.cycles.samples = 20
    sc.cycles.use_denoising = True
    sc.render.film_transparent = True
    sc.render.resolution_x, sc.render.resolution_y = W, H
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGBA"
    sc.view_settings.view_transform = "Standard"
    sc.view_settings.look = "None"
    world = bpy.data.worlds.new("w"); sc.world = world; world.use_nodes = True
    bg = world.node_tree.nodes["Background"]; bg.inputs[0].default_value = (0.75, 0.8, 1.0, 1); bg.inputs[1].default_value = 0.55
    # cartoon outline
    sc.render.use_freestyle = True
    sc.render.line_thickness_mode = "ABSOLUTE"
    sc.render.line_thickness = 1.6
    ls = bpy.context.view_layer.freestyle_settings.linesets[0]
    ls.select_by_visibility = True; ls.select_by_edge_types = True
    ls.select_silhouette = True; ls.select_border = True; ls.select_crease = False
    if ls.linestyle is None: ls.linestyle = bpy.data.linestyles.new("ink")
    ls.linestyle.color = (0.03, 0.04, 0.09); ls.linestyle.thickness = 1.6
    # camera: side on, looking along +Y, orthographic
    cam = bpy.data.cameras.new("cam"); cam.type = "ORTHO"; cam.ortho_scale = ORTHO
    co = bpy.data.objects.new("cam", cam); sc.collection.objects.link(co); sc.camera = co
    co.location = (0.18, -10, CAM_Z); co.rotation_euler = (math.radians(90), 0, 0)
    # lights: warm key from the front-top, cool rim from behind, soft fill
    for name, loc, energy, col in [("key", (4, -6, 6), 4.0, (1, 0.96, 0.9)), ("rim", (-5, 4, 4), 5.0, (0.75, 0.85, 1)), ("fill", (2, -8, 1), 1.2, (0.9, 0.9, 1))]:
        L = bpy.data.lights.new(name, "SUN"); L.energy = energy; L.color = col
        o = bpy.data.objects.new(name, L); sc.collection.objects.link(o)
        o.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    return sc


MATS = {}
def mat(hexcol, rough=0.5, metal=0.0, emit=0.0):
    key = (hexcol, rough, metal, emit)
    if key in MATS: return MATS[key]
    m = bpy.data.materials.new(hexcol); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = (*lin(hexcol), 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*lin(hexcol), 1); b.inputs["Emission Strength"].default_value = emit
    MATS[key] = m
    return m


def link(o, parent):
    bpy.context.view_layer.update()
    if parent is not None:
        mw = o.matrix_world.copy(); o.parent = parent; o.matrix_world = mw
    return o


def joint(name, loc, parent=None):
    e = bpy.data.objects.new(name, None); bpy.context.scene.collection.objects.link(e)
    e.location = loc
    if parent is not None:
        bpy.context.view_layer.update()
        e.parent = parent; e.location = Vector(loc) - parent.matrix_world.translation
    return e


def blob(loc, size, m, parent=None, round_=0.35, subd=2, rot=(0, 0, 0)):
    """A rounded box: bevelled cube smoothed by subdivision."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bv = o.modifiers.new("b", "BEVEL"); bv.width = min(size) * round_ * 0.5; bv.segments = 2
    sd = o.modifiers.new("s", "SUBSURF"); sd.levels = subd; sd.render_levels = subd
    bpy.ops.object.shade_smooth()
    o.data.materials.append(m)
    return link(o, parent)


def ball(loc, r, m, parent=None, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=24, ring_count=14)
    o = bpy.context.object; o.scale = scale; bpy.ops.object.shade_smooth()
    o.data.materials.append(m)
    return link(o, parent)


def tube(loc, r, depth, m, parent=None, rot=(0, 0, 0), verts=16):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object; bpy.ops.object.shade_smooth(); o.data.materials.append(m)
    return link(o, parent)


def cone(loc, r1, r2, depth, m, parent=None, rot=(0, 0, 0), verts=16):
    bpy.ops.mesh.primitive_cone_add(radius1=r1, radius2=r2, depth=depth, location=loc, rotation=rot, vertices=verts)
    o = bpy.context.object; bpy.ops.object.shade_smooth(); o.data.materials.append(m)
    return link(o, parent)


# ---------- the character ----------
def build(L):
    t = L["type"]
    main, dark, trim, skin, glass, gunm = (mat(L["main"]), mat(L["dark"]), mat(L["trim"], 0.35, 0.3 if t in ("knight", "king") else 0), mat(L["skin"], 0.6),
                                           mat(L["glass"], 0.15, 0, 1.5 if t in ("knight", "robot") else 0.2), mat(L["gun"], 0.35, 0.4))
    boot = mat("#22252e", 0.6)
    metal = t in ("robot",)
    J = {}
    J["root"] = joint("root", (0, 0, 0))
    J["hips"] = joint("hips", (0, 0, 1.0), J["root"])
    J["spine"] = joint("spine", (0, 0, 1.05), J["hips"])
    J["neck"] = joint("neck", (0, 0, 1.62), J["spine"])
    for side, y in (("L", 0.13), ("R", -0.13)):
        J["hip" + side] = joint("hip" + side, (0, y, 0.98), J["hips"])
        J["knee" + side] = joint("knee" + side, (0, y, 0.52), J["hip" + side])
    for side, y in (("L", 0.29), ("R", -0.29)):
        J["sh" + side] = joint("sh" + side, (0, y, 1.52), J["spine"])
        J["el" + side] = joint("el" + side, (0, y, 1.20), J["sh" + side])
    body = dark if t != "robot" else main
    # hips and legs
    blob((0, 0, 0.98), (0.40, 0.40, 0.24), dark, J["hips"])
    for side, y in (("L", 0.13), ("R", -0.13)):
        blob((0, y, 0.75), (0.21, 0.21, 0.46), body if t != "king" else dark, J["hip" + side])
        blob((0, y, 0.30), (0.19, 0.19, 0.44), dark if t != "robot" else main, J["knee" + side])
        if metal: ball((0, y, 0.52), 0.11, trim, J["knee" + side])
        blob((0.07, y, 0.07), (0.34, 0.21, 0.15), boot if not metal else mat(L["dark"]), J["knee" + side])
    # torso
    blob((0, 0, 1.33), (0.56, 0.48, 0.62), main, J["spine"])
    if t == "hoodie":
        blob((0.22, 0, 1.22), (0.06, 0.26, 0.20), dark, J["spine"])                # pocket
        blob((0.0, 0, 1.08), (0.50, 0.44, 0.08), trim, J["spine"])                  # waistband
        blob((-0.29, 0, 1.36), (0.20, 0.36, 0.46), dark, J["spine"])                # backpack
        blob((-0.37, 0, 1.36), (0.06, 0.20, 0.22), trim, J["spine"])
    if t == "ranger":
        blob((0.0, 0, 1.12), (0.50, 0.44, 0.07), mat("#6b4423"), J["spine"])         # belt
        blob((-0.25, 0, 1.0), (0.08, 0.50, 1.05), dark, J["spine"], round_=0.2)    # cloak
        blob((0.2, 0.1, 1.45), (0.05, 0.10, 0.45), mat("#6b4423"), J["spine"], rot=(0.6, 0, 0))  # strap
    if t == "knight":
        blob((0.24, 0, 1.36), (0.04, 0.30, 0.36), trim, J["spine"])                 # chest plate emblem
        blob((0.0, 0, 1.08), (0.52, 0.46, 0.08), trim, J["spine"])
    if t == "robot":
        blob((0.24, 0, 1.36), (0.04, 0.24, 0.22), mat("#10151f", 0.2), J["spine"])  # chest screen
        ball((0.27, -0.05, 1.38), 0.035, glass, J["spine"]); ball((0.27, 0.05, 1.38), 0.035, mat(L["trim"], 0.3, 0, 1.2), J["spine"])
    if t == "king":
        blob((0.0, 0, 1.08), (0.52, 0.46, 0.10), trim, J["spine"])
        blob((0.24, 0, 1.38), (0.04, 0.16, 0.30), trim, J["spine"])
        blob((-0.27, 0, 0.95), (0.07, 0.62, 1.25), mat(L["cape"]), J["spine"], round_=0.2)   # cape
    # arms
    for side, y in (("L", 0.29), ("R", -0.29)):
        blob((0, y, 1.37), (0.20, 0.20, 0.36), main if t != "robot" else mat(L["skin"], 0.3, 0.6), J["sh" + side])
        if t in ("knight", "king"): ball((0, y, 1.52), 0.15, trim, J["sh" + side], scale=(1, 1, 0.8))
        if metal: ball((0, y, 1.52), 0.1, trim, J["sh" + side])
        blob((0, y, 1.05), (0.18, 0.18, 0.32), (main if t == "hoodie" else dark) if t != "robot" else main, J["el" + side])
        ball((0, y, 0.86), 0.105, skin if t in ("hoodie",) else (mat("#3a2a1e") if t == "ranger" else trim if t == "king" else dark if t == "knight" else mat(L["skin"], 0.3, 0.6)), J["el" + side])
    # a med kit in the left hand (shown only while healing)
    kit = [blob((0.0, 0.29, 0.74), (0.26, 0.12, 0.20), mat("#f8f9fa", 0.4), J["elL"], round_=0.3),
           blob((0.0, 0.22, 0.74), (0.14, 0.02, 0.05), mat("#e03131", 0.4), J["elL"], round_=0.1),
           blob((0.0, 0.22, 0.74), (0.05, 0.02, 0.14), mat("#e03131", 0.4), J["elL"], round_=0.1)]
    J["kit"] = kit
    # the gun, in the right hand, along the forearm
    g = J["elR"]
    J["gun"] = [blob((0.0, -0.29, 0.66), (0.13, 0.11, 0.40), gunm, g, round_=0.2),
                tube((0.0, -0.29, 0.40), 0.035, 0.14, mat("#111318", 0.3, 0.6), g),
                blob((-0.08, -0.29, 0.74), (0.10, 0.09, 0.16), gunm, g, round_=0.2),               # grip
                blob((0.05, -0.29, 0.62), (0.03, 0.115, 0.24), trim, g, round_=0.3)]               # stripe
    # head
    hc = (0.03, 0, 1.86)
    if t == "robot":
        blob(hc, (0.48, 0.46, 0.42), mat(L["skin"], 0.25, 0.7), J["neck"])
        blob((0.25, 0, 1.86), (0.04, 0.38, 0.26), mat("#10151f", 0.15), J["neck"])
        ball((0.275, -0.08, 1.88), 0.045, glass, J["neck"]); ball((0.275, 0.08, 1.88), 0.045, glass, J["neck"])
        tube((0.0, 0, 2.13), 0.018, 0.16, mat("#868e96", 0.3, 0.8), J["neck"]); ball((0.0, 0, 2.22), 0.05, mat(L["trim"], 0.3, 0, 1.0), J["neck"])
        ball((0.03, -0.25, 1.86), 0.06, trim, J["neck"]); ball((0.03, 0.25, 1.86), 0.06, trim, J["neck"])
    else:
        ball(hc, 0.27, skin, J["neck"], scale=(1, 0.95, 1.02))
        eye = mat("#10151f", 0.2)
        if t == "hoodie":
            ball((-0.04, 0, 1.90), 0.30, main, J["neck"], scale=(1, 1, 1.04))           # hood (the face pokes out of the front)
            ball(hc, 0.27, skin, J["neck"], scale=(1.12, 0.92, 1.0))
            blob((0.27, 0, 1.92), (0.08, 0.40, 0.11), glass, J["neck"], round_=0.5)    # goggles
            blob((0.0, 0, 1.92), (0.56, 0.58, 0.04), dark, J["neck"], round_=0.5)      # strap
            blob((0.28, 0, 1.76), (0.03, 0.10, 0.025), mat("#b5654a"), J["neck"])      # smile
        if t == "ranger":
            ball((-0.03, 0, 1.90), 0.31, main, J["neck"], scale=(1, 1, 1.06))
            cone((-0.12, 0, 2.17), 0.16, 0.0, 0.22, main, J["neck"], rot=(0, -0.7, 0))
            ball(hc, 0.27, skin, J["neck"], scale=(1.12, 0.9, 1.0))
            blob((0.24, 0, 1.76), (0.12, 0.44, 0.16), dark, J["neck"], round_=0.5)     # scarf over the mouth
            ball((0.28, -0.08, 1.92), 0.035, eye, J["neck"]); ball((0.28, 0.08, 1.92), 0.035, eye, J["neck"])
        if t == "knight":
            ball(hc, 0.30, main, J["neck"], scale=(1.05, 1, 1.05))                    # helmet
            blob((0.29, 0, 1.88), (0.05, 0.36, 0.07), glass, J["neck"])                # glowing visor slit
            blob((0.0, 0, 2.12), (0.36, 0.06, 0.10), trim, J["neck"], round_=0.5)       # crest
            blob((0.0, 0, 1.70), (0.50, 0.50, 0.05), trim, J["neck"], round_=0.5)
        if t == "king":
            ball((0.28, -0.08, 1.92), 0.032, eye, J["neck"]); ball((0.28, 0.08, 1.92), 0.032, eye, J["neck"])
            blob((0.22, 0, 1.70), (0.16, 0.42, 0.24), glass, J["neck"], round_=0.5)     # beard
            blob((0.26, 0, 1.82), (0.05, 0.22, 0.05), glass, J["neck"], round_=0.5)     # moustache
            tube((0.02, 0, 2.10), 0.24, 0.14, trim, J["neck"])                          # crown
            for k in range(6):
                a = k * math.pi / 3
                cone((0.02 + 0.2 * math.cos(a), 0.2 * math.sin(a), 2.24), 0.06, 0.0, 0.14, trim, J["neck"])
            ball((0.24, 0, 2.11), 0.04, mat("#e03131", 0.2, 0, 0.6), J["neck"])
    J["root"].rotation_euler = (0, 0, math.radians(-22))      # turn a little towards the camera
    if t == "king":
        J["root"].scale = (1.08, 1.08, 1.08)
    return J


# ---------- poses: forward swing in degrees (+ = towards the front) ----------
def centre(J):
    """Lying poses: slide the body so it sits in the middle of the frame, resting on the ground."""
    bpy.context.view_layer.update()
    xs, zs = [], []
    for o in bpy.context.scene.objects:
        if o.type == "MESH" and not o.hide_render:
            for c in o.bound_box:
                w = o.matrix_world @ Vector(c); xs.append(w.x); zs.append(w.z)
    J["root"].location.x += 0.18 - (min(xs) + max(xs)) / 2
    J["root"].location.z -= min(zs) - 0.02


def pose(J, p, base_rot=-22):
    def swing(name, deg):
        J[name].rotation_euler[1] = -math.radians(deg)
    for k in ("spine", "neck", "hipL", "hipR", "kneeL", "kneeR", "shL", "shR", "elL", "elR"):
        J[k].rotation_euler = (0, 0, 0)
    J["hips"].rotation_euler = (0, 0, 0)
    J["root"].location = (0, 0, p.get("up", 0))
    J["root"].rotation_euler = (0, -math.radians(p.get("lay", 0)), math.radians(base_rot + p.get("turn", 0)))
    swing("spine", p.get("lean", 0)); swing("neck", p.get("nod", 0))
    for k in ("hipL", "hipR", "shL", "shR"):
        swing(k, p.get(k, 0))
    for k in ("kneeL", "kneeR"):
        swing(k, -abs(p.get(k, 0)))            # knees only bend backwards
    for k in ("elL", "elR"):
        swing(k, abs(p.get(k, 0)))             # elbows only bend forwards
    J["hips"].rotation_euler[0] = math.radians(p.get("sway", 0))
    J["shL"].rotation_euler[0] = math.radians(p.get("liftL", 0)); J["shR"].rotation_euler[0] = -math.radians(p.get("liftR", 0))
    J["hipL"].rotation_euler[0] = math.radians(p.get("spread", 0)); J["hipR"].rotation_euler[0] = -math.radians(p.get("spread", 0))
    for o in J["kit"]: o.hide_render = not p.get("kit")
    for o in J["gun"]: o.hide_render = bool(p.get("emote"))      # the gun is put away while dancing
    if p.get("lay"): centre(J)


AIM = dict(shR=88, elR=0, shL=70, elL=30)


def frames():
    out = []
    for i in range(4):                                     # idle: breathing, gun ready
        b = math.sin(i / 4 * 2 * math.pi)
        out.append(dict(AIM, up=0.01 * b, lean=2 + 1.5 * b, kneeL=6 + 2 * b, kneeR=6 + 2 * b, hipL=4, hipR=-2, shR=80 + 2 * b, shL=64 + 2 * b))
    for i in range(8):                                     # run
        a = i / 8 * 2 * math.pi
        out.append(dict(AIM, up=0.04 * abs(math.sin(a)), lean=10, hipL=38 * math.sin(a), hipR=-38 * math.sin(a),
                        kneeL=10 + 45 * max(0, -math.sin(a + 0.6)), kneeR=10 + 45 * max(0, math.sin(a + 0.6)), shR=84, shL=60 + 10 * math.sin(a), nod=-4))
    out.append(dict(AIM, up=0.05, lean=6, hipL=40, kneeL=70, hipR=10, kneeR=40))          # jump: up
    out.append(dict(AIM, up=0.1, lean=4, hipL=55, kneeL=85, hipR=35, kneeR=80))           # apex, tucked
    out.append(dict(AIM, up=0.05, lean=0, hipL=10, kneeL=20, hipR=-10, kneeR=10))         # falling, legs reaching down
    for i, k in enumerate((10, 4, 0)):                     # shoot: recoil
        out.append(dict(AIM, lean=-k * 0.4, shR=90 + k, shL=72 + k, kneeL=8, kneeR=8, hipL=8, hipR=-4))
    out.append(dict(lean=-18, nod=-14, shR=40, elR=40, shL=20, elL=30, hipL=10, hipR=-12, kneeL=12, kneeR=6))  # hit
    out.append(dict(lean=-8, nod=-6, shR=60, elR=20, shL=40, elL=30, hipL=6, hipR=-6, kneeL=8, kneeR=6))
    for i in range(3):                                     # build: the free hand slams a wall up
        out.append(dict(shR=30, elR=50, shL=[60, 130, 95][i], elL=[60, 10, 0][i], lean=[0, 6, 10][i], hipL=8, kneeL=10, kneeR=6))
    for i in range(4):                                     # heal: kneeling, patching up
        b = math.sin(i / 4 * 2 * math.pi)
        out.append(dict(kit=True, up=-0.28, lean=18, nod=12 + 3 * b, hipL=80, kneeL=90, hipR=-20, kneeR=110, shL=40 + 6 * b, elL=60, shR=30 - 4 * b, elR=70))
    for i in range(8):                                     # dance: our own little shuffle
        a = i / 8 * 2 * math.pi
        out.append(dict(up=0.03 * abs(math.sin(2 * a)), sway=8 * math.sin(a), lean=4, shL=160 if i % 4 < 2 else 20, liftL=20, elL=30, shR=20 if i % 4 < 2 else 160, liftR=20, elR=30,
                        hipL=20 * math.sin(a), hipR=-20 * math.sin(a), kneeL=20 * max(0, math.sin(a)), kneeR=20 * max(0, -math.sin(a)), nod=6 * math.sin(2 * a)))
    for i in range(4):                                     # knocked: down on the ground, crawling
        a = i / 4 * 2 * math.pi
        out.append(dict(lay=84, up=0.22, nod=-60, shL=150 + 20 * math.sin(a), elL=20, shR=150 - 20 * math.sin(a), elR=20, hipL=15 * math.sin(a), hipR=-15 * math.sin(a), kneeL=30, kneeR=30))
    out.append(dict(lay=-88, up=0.25, nod=10, shL=170, shR=150, hipL=5, hipR=-8))          # ko: flat on the back
    # ---- emotes: everyday dance moves ----
    robot = [dict(shL=90, elL=90), dict(shL=90, elL=0), dict(shL=90, elL=0, shR=90, elR=0), dict(shR=90, elR=90), dict(shR=90, elR=0), dict(nod=-12)]
    for i, r in enumerate(robot):                          # The Robot: stiff, jerky arms and a tilted head
        out.append(dict(r, lean=0, kneeL=4, kneeR=4, nod=r.get("nod", 8 if i % 2 else -6), turn=-10 if i < 3 else 10))
    for i in range(6):                                     # Running Man: legs slide on the spot, arms pump
        a = i / 6 * 2 * math.pi
        out.append(dict(up=0.04 * abs(math.sin(a)), lean=8, hipL=35 * math.sin(a), hipR=-35 * math.sin(a), kneeL=10 + 50 * max(0, math.sin(a)), kneeR=10 + 50 * max(0, -math.sin(a)),
                        shL=-30 * math.sin(a) + 20, elL=90, shR=30 * math.sin(a) + 20, elR=90, nod=4))
    for i in range(6):                                     # Disco Point: one finger up high, then down across
        up = i % 3 != 2
        out.append(dict(shR=160 if up else -10, liftR=25 if up else -15, elR=0, shL=20, elL=95, liftL=20, sway=10 if i < 3 else -10, hipL=10 if up else -5, kneeL=12, kneeR=4, nod=-10 if up else 10, up=0.02))
    for i in range(6):                                     # Star Jumps: arms and legs out, then in
        k = abs(math.sin(i / 6 * math.pi * 2))
        out.append(dict(up=0.14 * k, liftL=15 + 150 * k, liftR=15 + 150 * k, spread=4 + 22 * k, kneeL=8, kneeR=8, nod=-6 * k))
    for i in range(6):                                     # Spin and Pose: a full turn with arms out
        out.append(dict(turn=i * 60, liftL=80, liftR=80, up=0.04, kneeL=10, kneeR=10, nod=-5))
    start = {}; k = 0
    for name, n in ANIMS: start[name] = (k, n); k += n
    for name in ("dance", "robot", "runman", "disco", "jacks", "spin"):
        a, n = start[name]
        for f in out[a:a + n]: f["emote"] = True
    assert len(out) == sum(n for _, n in ANIMS), len(out)
    return out


def main():
    names = sys.argv[2:] or list(LOOKS)
    for name in names:
        sc = reset()
        J = build(LOOKS[name])
        d = os.path.join(OUT, name); os.makedirs(d, exist_ok=True)
        only = [int(x) for x in os.environ.get("ONLY", "").split(",") if x]   # e.g. ONLY=0,4,15 for a quick look
        for i, p in enumerate(frames()):
            if only and i not in only: continue
            pose(J, p)
            sc.render.filepath = os.path.join(d, f"{i:02d}.png")
            bpy.ops.render.render(write_still=True)
        print("rendered", name, flush=True)


main()
