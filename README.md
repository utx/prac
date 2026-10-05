# Practice Tests

Short practice papers, each with 3 reading, 3 thinking skills and 3 maths questions, and explanations after each section.

**Open `index.html`** (or the GitHub Pages site) and choose a test. The newest test is first.

## How it is organised

| Path | What it is |
|---|---|
| `index.html` | The menu page, with one button per test. **Generated**: don't edit by hand. |
| `tests/vNN/index.html` | Each finished test. **Generated**. |
| `content/vNN.js` | The questions, passage and diagrams for test NN. |
| `content/vNN.json` | Details shown on the menu (date, reading title) plus a record of the question types and sample-paper mapping. |
| `tools/template.html` | The shared page design that every test uses, including progress tracking. |
| `tools/admin.html` → `pracadmin/index.html` | The PIN-protected stats page (**generated** into `pracadmin/`). |
| `tools/build.py` | Builds every test and the menu page. |
| `tools/check_lengths.js` | Flags any question where the right answer is the longest option. |
| `tools/check.sh` | Builds, then runs both checks on the given tests (`tools/check.sh 40`). |
| `tools/check_tracking.js` | End-to-end check of progress tracking, completed flags, the admin PIN and practice mode. |
| `.github/workflows/check.yml` | Runs the build and all checks automatically on every pull request. |
| `tools/sync.js`, `tools/site_config.json` | Sends progress to the online database (Supabase) when configured. |
| `supabase/setup.sql` | One-time database setup (paste into Supabase's SQL editor). |
| `tools/progress.py` | Summarises online progress (uncompleted tests, weak areas) for the overnight job. |
| `.claude/skills/overnight/` | The nightly build procedure. |
| `tools/question_sheet.js` | Makes an answer-free text copy of a test for independent checking. |
| `.claude/skills/new-test/` | Step-by-step procedure Claude follows to build a new test. |
| `tools/check_render.js` | Answers every question at desktop and phone widths, checks 9/9, sideways scrolling and page errors. |

## Adding a new test

1. Add `content/vNN.js` and `content/vNN.json`.
2. Run `python3 tools/build.py`.
3. Run the checks:
   ```
   node tools/check_lengths.js tests/vNN/index.html
   node tools/check_render.js tests/vNN/index.html
   ```
4. Commit and push. The new test appears as a button on the menu page.

## Progress and stats

Finishing a test from the main page records the answers in that browser and marks the test as completed. The parent page at `pracadmin/` (PIN required) shows the stats and lets you open any test in practice mode, which records nothing. Once the online database is connected, progress is shared across devices and the admin page loads it after the PIN; until then it is stored per browser (Export/Import on the admin page moves it).

The official sample papers are copyright and are deliberately **not** stored here.
