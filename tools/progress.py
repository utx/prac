#!/usr/bin/env python3
"""Read practice progress from Supabase and summarise it.

Needs two environment variables (set in the Claude Code environment settings, never in the repo):
  SUPABASE_URL          e.g. https://xxxx.supabase.co   (falls back to tools/site_config.json)
  SUPABASE_SERVICE_KEY  the project's secret / service_role key (read access)

Usage:
  python3 tools/progress.py            human-readable summary
  python3 tools/progress.py --json     machine-readable summary (used by the overnight job)

Exit code 2 if the database can't be reached or isn't configured.
"""
import json, os, pathlib, re, sys, urllib.request
from collections import defaultdict
from datetime import datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent


def config():
    url = os.environ.get("SUPABASE_URL") or json.loads((ROOT / "tools" / "site_config.json").read_text())["supabase_url"]
    key = os.environ.get("SUPABASE_SERVICE_KEY", "")
    if not url or not key:
        print("progress.py: SUPABASE_URL / SUPABASE_SERVICE_KEY not set", file=sys.stderr)
        sys.exit(2)
    return url.rstrip("/"), key


def fetch_events(url, key):
    headers = {"apikey": key, "Accept": "application/json"}
    if key.startswith("eyJ"):
        headers["Authorization"] = "Bearer " + key
    rows, start, page = [], 0, 1000
    while True:
        req = urllib.request.Request(f"{url}/rest/v1/events?select=*&order=id", headers={**headers, "Range": f"{start}-{start + page - 1}"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                batch = json.loads(r.read())
        except Exception as e:  # network policy, wrong key, project paused …
            print(f"progress.py: could not read events: {e}", file=sys.stderr)
            sys.exit(2)
        rows += batch
        if len(batch) < page:
            return rows
        start += page


def ts(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def summarise(events):
    versions = sorted(int(m.group(1)) for f in (ROOT / "content").glob("v*.js") if (m := re.fullmatch(r"v(\d+)", f.stem)))
    attempts, flags = {}, {}
    for e in events:
        p = e.get("payload") or {}
        v = e["version"]
        if e["kind"] in ("section", "finish"):
            a = attempts.setdefault(e["attempt_id"], {"v": v, "started": p.get("started") or e["at"], "finished": None, "sections": {}, "total": None})
            if e["kind"] == "section" and p.get("section") is not None:
                a["sections"].setdefault(p.get("index"), p["section"])
            else:
                a["finished"] = a["finished"] or e["at"]
                a["total"] = p.get("total", a["total"])
        if e["kind"] != "section":
            if v not in flags or ts(e["at"]) >= ts(flags[v]["at"]):
                flags[v] = {"completed": e["kind"] != "unflag", "at": e["at"]}

    first = {}
    for a in sorted(attempts.values(), key=lambda a: a["started"]):
        if a["sections"]:
            first.setdefault(a["v"], a)

    by_cat, by_sec, stretch = defaultdict(lambda: [0, 0]), defaultdict(lambda: [0, 0]), [0, 0]
    for a in first.values():
        for s in a["sections"].values():
            for x in s.get("answers", []):
                ok = 1 if x.get("correct") else 0
                for bucket in (by_cat[(s["id"], x.get("cat") or "Other")], by_sec[s["id"]]):
                    bucket[0] += ok
                    bucket[1] += 1
                if x.get("stretch"):
                    stretch[0] += ok
                    stretch[1] += 1

    completed = [v for v in versions if flags.get(v, {}).get("completed")]
    pct = lambda c, n: round(100 * c / n) if n else None
    return {
        "published_tests": versions,
        "completed_tests": completed,
        "uncompleted_tests": [v for v in versions if v not in completed],
        "uncompleted_count": len(versions) - len(completed),
        "first_attempt_scores": {v: a["total"] for v, a in sorted(first.items()) if a["finished"]},
        "by_section": {k: {"right": c, "of": n, "pct": pct(c, n)} for k, (c, n) in by_sec.items()},
        "by_type": sorted(({"section": k[0], "type": k[1], "right": c, "of": n, "pct": pct(c, n)} for k, (c, n) in by_cat.items()),
                          key=lambda r: (r["pct"] if r["pct"] is not None else 101, -r["of"])),
        "stretch": {"right": stretch[0], "of": stretch[1], "pct": pct(*stretch)},
        "events": len(events),
    }


def main():
    url, key = config()
    s = summarise(fetch_events(url, key))
    if "--json" in sys.argv:
        print(json.dumps(s, indent=2))
        return
    print(f"Published tests: {len(s['published_tests'])} (v{s['published_tests'][0]}–v{s['published_tests'][-1]})")
    print(f"Completed: {len(s['completed_tests'])}   Uncompleted: {s['uncompleted_count']}  {s['uncompleted_tests']}")
    print("First-attempt scores:", ", ".join(f"T{v} {t}/9" for v, t in s["first_attempt_scores"].items()) or "none yet")
    for sec, r in s["by_section"].items():
        print(f"  {sec:9} {r['right']}/{r['of']} ({r['pct']}%)")
    print("Weakest question types (at least 2 answered):")
    for r in [r for r in s["by_type"] if r["of"] >= 2][:6]:
        print(f"  {r['type']} ({r['section']}): {r['right']}/{r['of']} ({r['pct']}%)")
    st = s["stretch"]
    print(f"Stretch questions: {st['right']}/{st['of']}" + (f" ({st['pct']}%)" if st["of"] else ""))


if __name__ == "__main__":
    main()
