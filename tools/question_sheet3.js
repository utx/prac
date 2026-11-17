#!/usr/bin/env node
/* Prints an answer-free sheet of every hand-written Storm Island question (game3/content), for the cold solve:
   a separate solver who never sees the answers works through it. Pictures are replaced by their descriptions.
   Usage: node tools/question_sheet3.js > sheet.md        (add --key to print the answer key instead,
   and --only=REGEX to print only the questions whose id matches) */
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.join(__dirname, "..", "game3", "content");
const src = fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().map(f => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
const C = {};
vm.runInNewContext(`const INK = "#1b2a41"; const READING = [], THINKING = [], MATHS = [], GENS = [];\n${src}\n;Object.assign(OUT, { READING, THINKING, MATHS });`, { OUT: C, Math, Array, Number, String, Set, Object });
const txt = h => String(h).replace(/<svg[^>]*aria-label="([^"]*)"[^>]*>.*?<\/svg>/gs, " [PICTURE: $1] ").replace(/<\/(p|div|tr|h\d)>|<br>/g, "\n").replace(/<\/t[dh]>/g, " | ").replace(/<sup>(\d+)<\/sup>⁄<sub>(\d+)<\/sub>/g, "$1/$2").replace(/<[^>]*>/g, "").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
const L = "ABCDEF", key = process.argv.includes("--key"), out = [];
/* --only=REGEX limits the sheet to questions whose id matches, e.g. --only='^(u|n)' for the second set */
const only = (process.argv.find(a => a.startsWith("--only=")) || "").slice(7), keep = q => !only || new RegExp(only).test(q.id);
const one = q => !keep(q) ? null : key ? out.push(`${q.id}: ${L[q.answer]}`) : out.push(`### ${q.id}\n${txt(q.stem)}\n${q.options.map((o, i) => `${L[i]}. ${txt(o)}`).join("\n")}\n`);
for (const p of C.READING) { if (!p.questions.some(keep)) continue; if (!key) out.push(`\n## READING PASSAGE "${p.title}" (${p.format})\n${p.note}\n\n${txt(p.html)}\n`); p.questions.forEach(one); }
if (!key) out.push("\n## THINKING\n"); C.THINKING.forEach(one);
if (!key) out.push("\n## MATHS\n"); C.MATHS.forEach(one);
console.log(out.join("\n"));
