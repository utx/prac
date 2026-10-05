#!/usr/bin/env python3
"""Question feedback from the admin page: list questions sent back for a redo, and reply to them.

Uses the same environment variables as progress.py (SUPABASE_URL, SUPABASE_SERVICE_KEY).

Usage:
  python3 tools/reviews.py                 questions waiting for a redo (human-readable)
  python3 tools/reviews.py --json          the same, machine-readable (used by the redo skill)
  python3 tools/reviews.py --all           every review row
  python3 tools/reviews.py done V SECTION Q "reply to David"
                                           mark a redo as handled (SECTION: reading, thinking or maths;
                                           Q: question number 1-3 as shown on the page)

A question is waiting when its latest row is 'redo'. Approving it again, or a 'done' reply, closes it.
Exit code 2 if the database can't be reached or isn't configured.
"""
import json, sys, urllib.request

from progress import config

SECTIONS = ("reading", "thinking", "maths")


def request(url, key, method="GET", body=None):
    headers = {"apikey": key, "Accept": "application/json", "Content-Type": "application/json"}
    if key.startswith("eyJ"):
        headers["Authorization"] = "Bearer " + key
    if method == "POST":
        headers["Prefer"] = "return=minimal"
    req = urllib.request.Request(url, method=method, headers=headers, data=json.dumps(body).encode() if body is not None else None)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            return json.loads(raw) if raw else None
    except Exception as e:  # network policy, wrong key, table not created yet …
        print(f"reviews.py: {method} failed: {e}", file=sys.stderr)
        sys.exit(2)


def rows(url, key):
    return request(f"{url}/rest/v1/reviews?select=*&order=id", key)


def waiting(all_rows):
    by_q = {}
    for r in all_rows:
        by_q.setdefault((r["version"], r["section"], r["q"]), []).append(r)
    out = []
    for (v, sec, q), hist in sorted(by_q.items()):
        last = hist[-1]
        if last["kind"] == "redo":
            out.append({"version": v, "section": sec, "q": q, "question": q + 1, "comment": last["comment"], "at": last["at"],
                        "history": [{"kind": h["kind"], "comment": h["comment"], "at": h["at"]} for h in hist]})
    return out


def main():
    url, key = config()
    args = sys.argv[1:]
    if args[:1] == ["done"]:
        if len(args) != 5 or args[2] not in SECTIONS or not args[3].isdigit() or not args[4].strip():
            print(__doc__, file=sys.stderr)
            sys.exit(1)
        v, sec, q, reply = int(args[1]), args[2], int(args[3]) - 1, args[4].strip()
        request(f"{url}/rest/v1/reviews", key, "POST", {"version": v, "section": sec, "q": q, "kind": "done", "comment": reply})
        print(f"Replied to Test {v} {sec} Q{q + 1}.")
        return
    all_rows = rows(url, key)
    if "--all" in args:
        print(json.dumps(all_rows, indent=2))
        return
    w = waiting(all_rows)
    if "--json" in args:
        print(json.dumps(w, indent=2))
        return
    if not w:
        print("No questions waiting for a redo.")
    for r in w:
        print(f"Test {r['version']} {r['section']} Q{r['question']} (sent {r['at'][:10]}): {r['comment']}")


if __name__ == "__main__":
    main()
