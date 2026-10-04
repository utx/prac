# Practice test repo: working notes for Claude

David builds numbered practice tests ("Practice Test NN") here. One test per version, all reachable from `index.html`.

## Adding version NN
1. Write `content/vNN.js` (defines `passMode`, `INK`, the passage/diagram constants and `SECTIONS`; see `content/v33.js` for the shape) and `content/vNN.json` (version, date, reading title, reading_format, thinking/maths skill labels, sample_map).
2. `python3 tools/build.py`, which builds `tests/vNN/index.html` and regenerates `index.html`. Never hand-edit generated files.
3. `node tools/check_lengths.js tests/vNN/index.html` (must report 0 longest) and `node tools/check_render.js tests/vNN/index.html` (must PASS).
4. Run an independent cold solve (a separate agent that never sees the answers), fix what it finds, re-check, then commit and push.
5. Give David the list of each question mapped to the official sample-paper question(s) it relates to and the skill tested.

## Standards (from David)
- Format: Reading 3 questions (A–D), Thinking Skills 3 (A–D), Maths 3 (A–E). No timer. Never mention "OC" in the UI.
- All questions new each version; fresh questions testing the same skills as the samples, not reworded copies.
- Reading: approachable length (~250–350 words) but genuine OC-level questions (implication, purpose of a detail, structure, connotation) with partly-true distractors. Every reading topic must be new (check every `content/vNN.json` `reading`) and realistic for the real test. The story is never about football. Rotate formats: story extract, cloze, missing sentences, poem, four extracts.
- Thinking Skills pattern (from v33): Q1 critical thinking rotating spot-the-mistake / supports-the-claim / whose-reasoning (weighted to sample frequency; cycle the mistake patterns), Q2 table/timetable/arrangement, Q3 spatial or a second critical-thinking item. No "weakens the argument" items.
- Maths: Q1 is a quick-fire item (place value, time, money, measurement, scales, graphs); Q2–Q3 multi-step reasoning. At most one competition-style item.
- Every distractor comes from a principled mistake; the correct option is never the single longest; spread answer letters; "may" in every option of mistake questions; facts must be accurate; prefer visuals; verify every answer by computation.
- Never commit the official sample papers (copyright NSW Department of Education / Cambridge).
