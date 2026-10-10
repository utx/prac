---
name: redo
description: Handle questions David sent back from the admin page ("Send back for a redo" with a comment). Lists them, rebuilds just those questions to the full new-test standard (or explains why no change is needed), publishes them in one pull request, merges once the checks are green, then replies to each comment so David sees it on the admin page. Use when David asks to "do the redos" / "check the feedback", when his "Do redos now" routine starts a run, and at the start of every overnight run.
---

# Redo sent-back questions

David reviews questions in practice mode (`pracadmin` → Practice) and either approves them or sends them back with a comment. This skill handles the sent-back ones. Standards come from `CLAUDE.md`; the build-and-check steps are the ones in `.claude/skills/new-test/SKILL.md`.

## 1. List

`python3 tools/reviews.py --json` → questions whose latest review is a redo (`version`, `section`, `q` zero-based, `question` 1-based, `comment`, `history`).
- Exit code 2: the database isn't reachable or the reviews table hasn't been created (`supabase/setup.sql` needs running again). Report it and stop this skill; it never blocks anything else.
- Empty list: nothing to do.

## 2. Decide, question by question

Read the comment, the question in `content/vNN.js` (stem, options, answer, explanation, diagram) and its `content/vNN.json` entries. Then:
- **Change it** when the comment points to a real problem or a preference David has stated (too easy/hard, ambiguous, two defensible answers, a factual slip, an unclear picture, wording, wants a different skill). Change only what the comment needs, but the result must meet every quality rule: OC level, wrong options from real mistakes, correct option never the single longest, facts checked, explanation names each trap. Keep the answer letter unless the fix needs a new one (then keep the section's letters spread).
- If the comment implies a rule for all future tests (e.g. "spatial questions should be harder"), also update `CLAUDE.md` / the skills so it sticks, and say so in the reply.
- **Don't change it** only if the comment rests on a misunderstanding (for example the answer is right and the explanation already shows why). The reply must then explain clearly and kindly, with the working.
- A comment starting "Difficulty: make it a bit harder/easier" (from the quick buttons) means one notch: keep the skill and format, add or remove one step or make the main trap more or less tempting. "Much harder/easier" means a clearly different level (for harder: a stretch-level step or a less obvious method; for easier: one clear step). Any extra words after it are further instructions.
- A redo that changes the question type or skill: update `categories`, the `thinking`/`maths` labels and `sample_map` in `content/vNN.json`; keep the stretch question in Q3.

## 3. Check

For every changed test: verify the answer(s) by computation, `tools/check.sh NN` (0 longest, PASS) and look at the screenshots. Then a cold solve limited to the changed questions (new-test skill step 4 prompt, naming the questions to check, with the reviewer's concern added: "the previous version was criticised for: <comment>; say whether that is now fixed"). Fix and repeat until clean.

## 4. Publish

One pull request for all redos: title `Redo: Test NN Section Qn[, …]`; the body lists each comment and what changed. Wait for the `check` run, fix if red, merge when green (David agreed to self-merging), then check that the "pages build and deployment" run for the merge succeeded (step 4 of Publish in the overnight skill). In the overnight run, put the redos in that night's pull request if one is being opened.

## 5. Reply

Only after the merge, for each question:
`python3 tools/reviews.py done V SECTION Q "<reply>"` (Q 1-based). The reply is one or two plain sentences David will read on the admin page next to his comment: what changed (or why nothing did), and that it is live (for a test held for review, `"status": "review"`: that it is updated and waiting for his approval on the admin page; it stays held after a redo). Then tell David in chat which questions were redone and that they show under "Recently redone" on the admin page.
