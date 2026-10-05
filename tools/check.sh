#!/usr/bin/env bash
# Usage: tools/check.sh NN [NN ...]   (no arguments = every test)
# Rebuilds everything, then runs the length and render checks on the given tests.
set -e -o pipefail
cd "$(dirname "$0")/.."
python3 tools/build.py
shots="${TMPDIR:-/tmp}/prac-shots"; mkdir -p "$shots"
versions=("$@")
if [ ${#versions[@]} -eq 0 ]; then
  versions=($(ls content | sed -n 's/^v\([0-9]*\)\.js$/\1/p' | sort -n))
fi
fail=0
for v in "${versions[@]}"; do
  echo "== Test $v"
  node tools/check_lengths.js "tests/v$v/index.html" || fail=1
  node tools/check_render.js "tests/v$v/index.html" "$shots" | tail -3 || fail=1
done
echo "screenshots: $shots"
exit $fail
