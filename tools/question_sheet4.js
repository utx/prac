#!/usr/bin/env node
/* Prints Ridge Runner's hand-written questions (and one example of each template) as plain text
   WITHOUT the answers, for an independent cold solve.  --key prints the answers instead.
   --only=REGEX limits it to matching ids.
   Usage: node tools/question_sheet4.js [--key] [--only=REGEX] */
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.join(__dirname, "..", "game4", "content");
const src = fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().map(f => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
const C = {}; vm.runInNewContext(`const INK = "#1b2a41"; const GENS = [], HAND = [];\n${src}\n;Object.assign(OUT, { GENS, HAND });`, { OUT: C, Math, Array, Object, Set, Map, Number, String });
const key = process.argv.includes("--key"), only = (process.argv.find(a => a.startsWith("--only=")) || "").slice(7);
const txt = h => String(h).replace(/<\/(p|li|tr|div)>/g, "\n").replace(/<br>/g, "\n").replace(/<td[^>]*>/g, " | ").replace(/<th[^>]*>/g, " | ").replace(/<sup>(\d+)<\/sup>⁄<sub>(\d+)<\/sub>/g, "$1/$2").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\n\s*\n+/g, "\n").trim();
const qs = [...C.HAND, ...C.GENS.filter(g => !/^t-space/.test(g.id)).map(g => { for (let s = 1; s < 50; s++) { const q = g.make(s * 31); if (q) return q; } }).filter(Boolean)]
  .filter(q => !only || new RegExp(only).test(q.id));
for (const q of qs) {
  if (key) { console.log(`${q.id}: ${"ABCDE"[q.answer]}`); continue; }
  console.log(`\n=== ${q.id} ===`);
  if (q.passage) console.log(txt(q.passage));
  console.log(txt(q.stem));
  q.options.forEach((o, i) => console.log(`${"ABCDE"[i]}. ${txt(o)}`));
}
