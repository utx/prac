#!/usr/bin/env python3
"""Write tools/site_config.json from environment variables, so keys never go through chat.

  SUPABASE_URL              e.g. https://xxxx.supabase.co
  SUPABASE_PUBLISHABLE_KEY  the publishable (or legacy anon) key — this one is public by design:
                            it is embedded in the site and can only ADD progress records.

Prints "unchanged", "updated" or "missing". Run `python3 tools/build.py` afterwards if updated.
"""
import json, os, pathlib, re, sys
p = pathlib.Path(__file__).resolve().parent / "site_config.json"
url, key = os.environ.get("SUPABASE_URL", "").strip().rstrip("/"), os.environ.get("SUPABASE_PUBLISHABLE_KEY", "").strip()
url = re.sub(r"/rest/v1$", "", url)  # accept the API URL as well as the project URL
if not url or not key:
    print("missing"); sys.exit(0)
if key.startswith("sb_secret_") or "service_role" in key:
    sys.exit("SUPABASE_PUBLISHABLE_KEY looks like a SECRET key. Use the publishable/anon key for the site.")
cur = json.loads(p.read_text())
new = {"supabase_url": url, "supabase_publishable_key": key}
if cur == new:
    print("unchanged")
else:
    p.write_text(json.dumps(new, indent=2) + "\n"); print("updated")
