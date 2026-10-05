---
name: overnight
description: Nightly unattended run (fired by the 1 am Sydney routine). Checks online progress; if fewer than 10 published tests are uncompleted, builds 4 new tests to the full new-test standard, opens one pull request, waits for the automatic checks and merges it. Also finishes the online-progress setup when the environment provides the keys.
---

# Overnight build

Unattended: **never wait for or ask David anything.** If something blocks, stop safely and say what blocked in the final message (it becomes the routine's notification). David has agreed that this job merges its own pull request once every check is green, and that a Reading topic repeating one from tests 1–32 is acceptable.

## 0. Setup and safety

1. Work in the `utx/prac` checkout. `git fetch origin && git checkout -B claude/overnight-$(TZ=Australia/Sydney date +%F) origin/main`.
2. **Finish online-progress setup if needed:** `python3 tools/configure_sync.py`. If it prints `updated`: run `python3 tools/build.py`, `tools/check.sh`, commit (`Connect the site to the online progress database`), and include it in tonight's pull request (or, if no tests are needed tonight, open and merge a pull request just for it, waiting for the green check).
3. **Leftovers:** list open pull requests whose title starts with `Overnight:`. If one exists, do not build more. Drive it to green (read the failing check's log, fix, push; never skip a check) and merge it, then stop.

## 1. Decide

`python3 tools/progress.py --json`
- Exit code 2 (database not configured or unreachable): **stop**. Report the error line. Never build blind.
- `uncompleted_count >= 10`: **stop**. Report "nothing to build" with the count.
- Otherwise build **4** new tests, numbered from the highest existing `content/vNN.js` + 1.

## 2. Plan all 4 first (in this session, before any writing)

Read `CLAUDE.md`, `.claude/skills/new-test/SKILL.md`, `calibration/sample_notes.md`, every `content/vNN.json` and `content/used_topics_before_v33.md`. Then write one plan table covering all 4 tests:
- Reading format for each, continuing the rotation (over any 9: cloze ×2, four extracts ×2, story ×2, missing sentences ×2, poem ×1), with **one** public-domain classic among the 4 if none of the last 4 versions used one.
- A different, new Reading topic for each (none used before, none repeated within the batch).
- Thinking Q1 type and sub-pattern, Q2 type, Q3 spatial type; Maths Q1 quick-fire type and Q2/Q3 topics — continuing the rotations, with no two tests in the batch identical.
- **Use the progress data:** give the weakest question types from `by_type` (at least 2 answered, lowest %) extra appearances across the batch, and keep stretch questions in every section.
- The answer letter for every question, spread within each section and across the batch.

## 3. Build in parallel

Spawn 2 general-purpose subagents with `isolation: "worktree"`, each building **2** of the planned tests. Give each its rows of the plan table, the exact version numbers, and these instructions:
- Follow `.claude/skills/new-test/SKILL.md` steps 1–3 (write `content/vNN.js` and `.json`, verify every answer by computation, `tools/check.sh NN`, look at the screenshots).
- Commit **only** `content/vNN.js` and `content/vNN.json` on a branch named `overnight-part-<k>`; do not commit generated files; do not push or open pull requests.
- Report the branch name and any concerns.

## 4. Integrate and cold-solve

1. Merge every part branch into the overnight branch; `python3 tools/build.py`; `tools/check.sh` (all tests) and `node tools/check_tracking.js` must pass.
2. For each new test, `node tools/question_sheet.js content/vNN.js <scratch>/vNN.txt` and run one cold-solve subagent per test (prompt in the new-test skill, step 4), in parallel.
3. Fix every real finding; re-run the checks and a second cold solve on changed questions until clean.

## 5. Publish

1. Commit, push, open **one** pull request titled `Overnight: Practice Tests NN–MM`, body = per-test summary (formats, topics, skills, what the cold solves fixed).
2. Wait for the `check` run on the pull request to finish (re-read its status every few minutes; it takes about a minute). If red: read the log, fix, push, repeat.
3. When green and mergeable: merge it (merge commit).

## 6. Final message (the routine's notification)

Short: how many tests were built and merged (with the link), the uncompleted count before and after, the weakest areas the batch targeted, and anything that went wrong.
