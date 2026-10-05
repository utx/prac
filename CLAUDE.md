# Practice test repo: working notes for Claude

David builds numbered practice tests ("Practice Test NN": v33, v34, …) here to prepare a Year 4 child for the NSW OC placement test. One test per version, each a new button on `index.html`. Work only in this repo (`utx/prac`); never create new repos.

## Adding version NN
Use the `new-test` skill (`.claude/skills/new-test/SKILL.md`): it is the full step-by-step procedure. Summary:
1. Before writing, compare every planned question against the official sample papers, using `calibration/sample_notes.md` (own-words notes on all three papers; the papers themselves are never in the repo, see Copyright). Attached papers, when available, are a bonus for closer calibration. Check the coverage record in every `content/vNN.json` so no skill, topic or format repeats too soon.
2. Write `content/vNN.js` (defines `passMode`, `INK`, the passage/diagram constants and `SECTIONS`; see `content/v33.js` for the shape) and `content/vNN.json` (version, date, reading title, reading_format, thinking/maths skill labels, sample_map, and `categories`: one question-type label per question, chosen from `CATEGORIES` in `tools/build.py`, which the stats page groups by).
3. `python3 tools/build.py`, which builds `tests/vNN/index.html` and regenerates `index.html`. Never hand-edit generated files.
4. `tools/check.sh NN` (runs the build, `check_lengths` (must report 0 longest) and `check_render` (must PASS)). `node tools/question_sheet.js content/vNN.js` makes the answer-free copy for the cold solve.
5. Verify every answer by computation, then run an independent cold solve (a separate agent that never sees the answers). Fix what it finds, re-check, then commit and push.
6. Finish by giving David a list of every question mapped to the sample-paper question(s) it most relates to, and the skill being tested.

## Format
- Reading 3 questions (A–D), Thinking Skills 3 (A–D), Maths 3 (A–E). No timer.
- Never mention "OC" in the page itself.

## Calibration
- Every question must be at genuine OC level and test a skill that appears in the samples.
- Write fresh questions that test the same skills as the samples, sometimes in a similar way, sometimes in an unexpected way. Never reword a sample question.
- Weight question types by how often they appear in the samples (frequencies below), favouring the skills that win the most marks.
- Each version, include new skills and also loop back to skills from earlier versions.

## Reading
Sample paper: story 6 Qs, cloze 8, poem 5, missing sentences 6, four extracts 8.
- Rotate formats. Over any 9 versions aim for about: cloze ×2, four extracts ×2, story ×2, missing sentences ×2, poem ×1.
- Passages stay approachable (about 250–350 words), but questions are genuinely OC-level: implication, why a detail is included, structure, comparisons, feelings shown rather than stated.
- Cloze uses upper-primary to adult vocabulary like the samples (e.g. culmination, teeming, scouring, remiss): near-synonyms, look-alike words and preposition collocations where only one fits. Avoid easy everyday idioms.
- Every few versions, use a real public-domain classic instead of an original text (author died more than 70 years ago, e.g. Grahame, Nesbit, Stevenson, Lawson). Copy the text exactly from a reliable source (Project Gutenberg via its GitHub mirrors) and credit author and year in the passage note.
- Wrong options must be partly true or built on a real detail from the text, never obviously wrong.
- Every reading topic must be new: check `reading` and `reading_topic` in every `content/vNN.json` **and** `content/used_topics_before_v33.md` (topics from the earlier tests made outside this repo) and the kind of topic the real test uses. The story is never about football.
- In four-extract sets, every extract should be the answer to at least one question where possible.

## Thinking Skills
Sample frequency across 90 questions: spatial 18%, spot the mistake 14%, tables/timetables/data 14%, supports the claim 13%, order/arrangement 12%, whose reasoning 11%, rules/codes/sets 9%, number problems 4%, must/cannot be true 3%.
- **Q1: always critical thinking.** Rotate spot the mistake → supports the claim → whose reasoning, with spot the mistake slightly more often.
  - Spot the mistake: cycle the patterns: ignoring another possible cause; judging from your own small group; treating something needed as a guarantee; an unfair comparison; treating "most" as "all"; reversing a rule. Every option contains "may".
  - Whose reasoning: cycle needed versus guaranteed; reversed rule; "most" leading to "probably"; certainty/worst case.
  - Supports the claim: the right answer backs the claim's reason; the wrong options are true but about something else.
- **Q2:** usually a table, timetable, data or arrangement question (more often tables/timetables).
- **Cover the whole question base.** Every few versions, use Q2 (or Q3) for a type the fixed slots would otherwise miss: rules/codes/sets, number problems, must/cannot be true, and question types next to the samples (for example odd one out, logic grids, sequences of shapes, balance scales, true/false statements from a diagram). Check the `thinking` labels and `categories` in recent `content/vNN.json` files so each type comes round regularly.
- **Q3:** spatial at sample-paper difficulty (one or two clear steps), or a second critical-thinking question. Spatial questions must not be harder than the sample versions.
- Never use "weakens the argument" questions (they don't appear in the samples).

## Maths
- **Q1:** a quick-fire question (under a minute), rotating: place value, time, money, measurement, reading a scale, reading a graph, simple word problem, missing number.
- **Q2 and Q3:** multi-step reasoning on sample-paper topics: fractions, patterns, area and perimeter, 3D shapes, chance statements, combinations, rates, best value, timetables, "which statements are correct" graph questions.
- At most one competition-style (Kangaroo-like) question per version.
- Cover the whole question base here too: every few versions, use Q2 or Q3 for a sample topic not seen recently or a nearby one (for example symmetry, angles, position and direction, mass, volume, number puzzles), checking the `maths` labels in recent `content/vNN.json` files.

## Stretch questions
- Every section of every version (Reading, Thinking Skills and Maths) has one stretch question pitched at the hardest third of the sample papers (around Q25–35). Usually make it Q3. Record it in `content/vNN.json` as `"stretch": {"reading": [2], "thinking": [2], "maths": [2]}` (zero-based question numbers), so the stats page can report it.
- A stretch question must need inference, not word-matching between question and text.

## Quality rules (every question)
- Every wrong option comes from a real mistake a child would make.
- The correct option is never the single longest.
- Spread the answer letters within each section.
- Facts must be accurate; check anything factual before using it.
- Use images and diagrams wherever they help, drawn clearly and not to scale where measuring would give the answer away.
- Explanations show the method and name why each trap is wrong.

## Progress tracking and admin
- Test pages record each attempt in the browser's localStorage (key `prac.v1`) and flag the test completed when it is finished. The index shows completed tests and has a "Mark as done" toggle.
- `pracadmin/` (built from `tools/admin.html`) is the PIN-protected stats page. Tests opened from it use `?admin=1` and record nothing. The PIN check is client-side only.
- Keep the template's tracking hooks working when changing `tools/template.html`; `node tools/check_tracking.js` checks them end to end.

## Question feedback (admin review)
- In practice mode, each checked question has **Approve** and **Send back for a redo** (with a comment). Saved online in the `reviews` table through `add_review(pin, …)`; the admin page lists what's waiting and what's been redone.
- Handle sent-back questions with the `redo` skill (`.claude/skills/redo/SKILL.md`): rebuild just those questions to full standard (or explain why not), one pull request, merge when green, then reply with `python3 tools/reviews.py done V SECTION Q "reply"`. The overnight run does any waiting redos first.

## Online progress (Supabase)
- `tools/sync.js` (injected into every page by `build.py`) sends progress events to Supabase when `tools/site_config.json` has a URL and publishable key; otherwise the site uses browser storage only. Database setup: `supabase/setup.sql`.
- The public key can only add events. The admin page reads through `admin_events(pin)` (PIN checked in the database); the menu reads `public_flags()`.
- `python3 tools/progress.py [--json]` summarises progress for Claude (needs `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in the environment settings). `python3 tools/configure_sync.py` fills `site_config.json` from `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.

## Overnight builds
- A routine runs the `overnight` skill (`.claude/skills/overnight/SKILL.md`) at about 1 am Sydney time: when fewer than 10 published tests are uncompleted it builds 4 new ones, opens one pull request and merges it once the checks are green (agreed by David).

## Automatic checks
- `.github/workflows/check.yml` runs on every pull request and push to `main`: build (validates question types and stretch tags), generated files up to date, `tools/check.sh` on every test, and `tools/check_tracking.js`. A red cross on a pull request must be fixed before merging.

## Copyright
Never commit the official sample papers (copyright NSW Department of Education / Cambridge).
