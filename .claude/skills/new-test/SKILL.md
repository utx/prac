---
name: new-test
description: Build the next numbered practice test(s) (vNN) end to end — plan against the rotation and used topics, write content, verify every answer, run the checks and an independent cold solve, fix, then open a pull request and report the sample-paper mapping. Use whenever David asks to "make the next test", "make N tests", or gives questions to turn into a test. Also use when rewriting a section of an existing test.
---

# Building a practice test

Follow every step, in order. `CLAUDE.md` holds the standards (format, calibration, rotation, quality rules, stretch rule); this skill is the procedure. If the two ever disagree, `CLAUDE.md` wins — and tell David.

Default batch size is **1–2 tests per run** (3 at most). Each test gets its own cold solve.

## 0. Before writing anything

1. **Sync.** `git fetch origin && git checkout -B claude/<branch> origin/main` (use the session's designated branch name). Never stack on a merged pull request.
2. **Calibration source.** Read `calibration/sample_notes.md` (our own-words notes on all three official papers: formats, question-type maps by question number, difficulty climb, trap patterns). That is enough for routine tests. If David has attached the papers in this session, also read the relevant sections for a closer match. Never commit the papers.
3. **Next version number.** `ls content/` → highest `vNN.js` + 1.
4. **Rotation.** Read every `content/vNN.json` (`reading_format`, `thinking`, `maths`, `categories`, `stretch`) and work out what comes next:
   - Reading format: aim over any 9 versions for cloze ×2, four extracts ×2, story ×2, missing sentences ×2, poem ×1. Every few versions use a public-domain classic.
   - Thinking Q1: rotate spot the mistake → supports the claim → whose reasoning (spot the mistake slightly more often); cycle the sub-patterns listed in `CLAUDE.md`, choosing one not used recently.
   - Thinking Q2: table / timetable / data / arrangement, varied from the last few.
   - Thinking Q3: spatial type not used recently (look at the `thinking` labels).
   - Maths Q1: next item in the quick-fire rotation; Q2–Q3: a new topic plus a loop-back.
5. **Topic check.** The Reading topic must not appear in any `content/vNN.json` (`reading`, `reading_topic`) **or** in `content/used_topics_before_v33.md`. Until David confirms that list is complete, **tell David the planned Reading topic(s) in one line and wait for an OK before writing.**
6. **Supplied questions.** If David supplies questions, use them as given (they are his). Check every answer, write explanations, redraw diagrams (not to scale where measuring would give the answer away), and note "supplied by David" in the `vNN.json` labels. Ask the source only if it isn't clear they're his own.

## 1. Write the content

- `content/vNN.js`: copy the shape of the most recent test of the same Reading format (cloze: v39; missing sentences: v40; story: v38; four extracts: v36; poem/classic: v37; classic story: v33). Diagrams are inline SVG with a meaningful `aria-label`; anything wide must wrap on a 390px phone (split into separate small SVGs in a flex-wrap row).
- Each question: `stem`, `options`, `answer` (zero-based), `skill`, `explain` (method, then a `why-not` paragraph naming why each trap is wrong — name the main trap first).
- Every section's **Q3 is the stretch question** (hardest third of the samples; must need inference, not word-matching).
- Public-domain classics: download from the Project Gutenberg GitHub mirror (`https://raw.githubusercontent.com/GITenberg/<Title>_<id>/master/<id>.txt`; gutenberg.org itself is blocked here), extract the passage **programmatically** so it is exact, and credit author and year in the passage note.
- `content/vNN.json`: version, date, reading, reading_format, reading_topic, thinking[3], maths[3], sample_map (each question → the sample question numbers it relates to, "— stretch" on Q3s), categories (labels from `CATEGORIES` in `tools/build.py`), stretch `{"reading":[2],"thinking":[2],"maths":[2]}`.

## 2. Verify answers by computation

Write a short Python check for every Maths and Thinking Skills answer (arithmetic, brute-force logic orders, tilings, folds, timetables). Every distractor should equal the result of a named mistake — compute those too. Any mismatch: fix before going on.

## 3. Build and check

```
tools/check.sh NN
```
Both must pass: `check_lengths` reports 0 longest, `check_render` reports PASS at both widths. Then **look at the screenshots** (`$TMPDIR/prac-shots/s0|s1|s2_1200.png` and `_390.png`) for clipped labels, overlaps, tiny diagrams on phone, or a diagram that is accidentally to scale.

## 4. Independent cold solve

1. `node tools/question_sheet.js content/vNN.js "$SCRATCH/vNN_questions.txt"` (answer-free copy).
2. If picture options have generic labels, append plain-text descriptions of each picture option to the sheet (e.g. grids as `#.# / ###`).
3. Spawn a general-purpose agent with this prompt (fill in the path):

   > Independent checker for a children's practice test (Year 4, NSW selective-test prep: Reading, Thinking Skills, Maths). Read ONLY `<sheet path>`. Do NOT open anything under the repo (it contains the answer keys) or any other file. For each question give: your answer and brief working; confidence; and any problem — more than one defensible answer, no correct answer, ambiguity (including how a diagram could be read), factual errors (check every fact), a distractor arguably also right, or a correct answer that stands out superficially. Each section's Q3 is meant to be a stretch question at the hardest end of the real test: say whether it is hard but fair and needs inference rather than word-matching. Be critical and concise.

4. Fix **everything** real it finds (ambiguity, a too-easy stretch, a fact, a risky distractor). If a finding is an artefact of the text copy, check the rendered page and say so. After substantive fixes, re-run step 3 and a second cold solve on the changed questions. Repeat until clean.

## 5. Publish

1. `git add -A && git commit` with a message summarising each section (end with the attribution lines from the session's system reminder).
2. `git push -u origin <branch>`.
3. Check whether the previous pull request from this branch is merged; open a new pull request to `main` (use the GitHub MCP tools). Body: what each section contains, the checks run and what the cold solve found/fixed.

## 6. Report to David

Reply with, per test:
- the pull-request link and that merging publishes it,
- a table: question → answer letter → skill tested → related sample question(s) (mark the stretch questions),
- what the checks and cold solve caught and what was fixed,
- the rotation status (what comes next), and anything needing his decision.

Keep it short; no file paths he doesn't need.
