#!/usr/bin/env python3
"""Decide which held tests to release to the student menu, and whether to build new ones.

New tests can be held for David's review: `"status": "review"` in content/vNN.json keeps a test
off the student menu (it shows only on the admin page). A held test is approved when every one
of its questions has 'approve' as its latest review (Approve / Approve test on the admin page).

Rules (agreed with David, Oct 2026):
  1. When fewer than TARGET published tests are uncompleted, release approved held tests,
     oldest first, until TARGET are uncompleted again (any extra approved tests stay in reserve).
  2. Then, if still fewer than TARGET are uncompleted: build BATCH new tests and publish them directly.
  3. Otherwise build BATCH new tests for review, but only while fewer than REVIEW_CAP held tests
     are still unapproved.

Uses the same environment variables as progress.py (SUPABASE_URL, SUPABASE_SERVICE_KEY).

Usage:
  python3 tools/release.py           the plan, human-readable
  python3 tools/release.py --json    the plan, machine-readable (used by the nightly routine and the overnight skill)
  python3 tools/release.py --apply   release the tests the plan names (edits content/vNN.json; then run tools/build.py)

Exit code 2 if the database can't be reached or isn't configured.
"""
import datetime, json, sys, zoneinfo

from progress import ROOT, config, fetch_events, summarise, test_versions
from reviews import SECTIONS, rows

TARGET, REVIEW_CAP, BATCH = 10, 4, 4


def held_tests(review_rows):
    """Every held test with its approval state, oldest first."""
    latest = {}
    for r in review_rows:  # rows come in id order, so the last one per question wins
        latest[(r["version"], r["section"], r["q"])] = r["kind"]
    out = []
    for v, meta in test_versions().items():
        if meta.get("status") != "review":
            continue
        qs = [(sec, q) for sec in SECTIONS for q in range(len(meta.get("categories", {}).get(sec, [])))]
        kinds = [latest.get((v, sec, q)) for sec, q in qs]
        approved = sum(k == "approve" for k in kinds)
        out.append({"version": v, "reading": meta.get("reading", ""), "questions": len(qs), "approved_questions": approved,
                    "waiting_redo": sum(k == "redo" for k in kinds), "approved": bool(qs) and approved == len(qs)})
    return out


def plan(summary, held):
    uncompleted = summary["uncompleted_count"]
    approved = [t["version"] for t in held if t["approved"]]
    release = approved[:max(0, TARGET - uncompleted)]
    after = uncompleted + len(release)
    unapproved = [t["version"] for t in held if not t["approved"]]
    if after < TARGET:
        build, why = "publish", f"only {after} uncompleted after releases (fewer than {TARGET}), so new tests go straight to the menu"
    elif len(unapproved) < REVIEW_CAP:
        build, why = "review", f"{after} uncompleted; {len(unapproved)} held test(s) unapproved (fewer than {REVIEW_CAP}), so build more for review"
    else:
        build, why = "none", f"{after} uncompleted and {len(unapproved)} held tests still waiting for David's approval"
    return {"uncompleted_count": uncompleted, "uncompleted_tests": summary["uncompleted_tests"], "held": held,
            "release": release, "uncompleted_after_release": after, "approved_in_reserve": approved[len(release):],
            "unapproved_held": unapproved, "build": build, "build_count": BATCH if build != "none" else 0, "why": why}


def apply(p):
    today = datetime.datetime.now(zoneinfo.ZoneInfo("Australia/Sydney")).date().isoformat()
    for v in p["release"]:
        path = ROOT / "content" / f"v{v}.json"
        meta = json.loads(path.read_text(encoding="utf-8"))
        meta["status"], meta["released"] = "published", today
        path.write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print(f"released Test {v}")
    if not p["release"]:
        print("nothing to release")


def main():
    url, key = config()
    p = plan(summarise(fetch_events(url, key)), held_tests(rows(url, key)))
    if "--apply" in sys.argv:
        apply(p)
    elif "--json" in sys.argv:
        print(json.dumps(p, indent=2))
    else:
        print(f"Uncompleted on the menu: {p['uncompleted_count']}  {p['uncompleted_tests']}")
        for t in p["held"]:
            state = "approved" if t["approved"] else f"{t['approved_questions']}/{t['questions']} approved" + (f", {t['waiting_redo']} waiting for a redo" if t["waiting_redo"] else "")
            print(f"  held: Test {t['version']} ({state})")
        print(f"Release now: {', '.join(f'Test {v}' for v in p['release']) or 'none'}")
        print(f"Build: {p['build']} ({p['why']})")


if __name__ == "__main__":
    main()
