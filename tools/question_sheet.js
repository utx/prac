// Usage: node tools/question_sheet.js content/vNN.js [out.txt]
// Writes an answer-free plain-text copy of a test (passage, questions,
// options, pictures as their descriptions) for an independent cold solve.
// Never give the solver the content file itself: it contains the answers.
const fs = require("fs");
const [, , src, out] = process.argv;
const code = fs.readFileSync(src, "utf8");
globalThis.responses = null;
const o = new Function(code + ";return {SECTIONS, PASSAGE: typeof PASSAGE === 'undefined' ? null : PASSAGE};")();
globalThis.responses = o.SECTIONS.map(s => s.questions.map(() => null));
const strip = s => String(s)
  .replace(/<svg[^>]*aria-label="([^"]*)"[\s\S]*?<\/svg>/g, "[Picture: $1]")
  .replace(/<span style="display:inline-flex[^"]*"><span[^>]*>([\s\S]*?)<\/span><span[^>]*>([\s\S]*?)<\/span><\/span>/g, " $1/$2 ")
  .replace(/<span class="vn">(\d+)<\/span>/g, "\nVerse $1:\n")
  .replace(/<span class="line">([\s\S]*?)<\/span>/g, "$1\n")
  .replace(/<tr>/g, "\n").replace(/<\/t[dh]>/g, " | ")
  .replace(/<li>/g, "\n- ").replace(/<\/p>|<br>/g, "\n")
  .replace(/<[^>]*>/g, "").replace(/[ \t]+/g, " ").replace(/\n\s+/g, "\n").trim();
let txt = "";
if (o.PASSAGE) {
  const html = typeof o.PASSAGE.html === "function" ? o.PASSAGE.html() : o.PASSAGE.html;
  txt += `PASSAGE: ${o.PASSAGE.title}\n${strip(o.PASSAGE.note)}\n${strip(html)}\n`;
}
o.SECTIONS.forEach(s => {
  txt += `\n=== ${s.name} ===\n${s.intro}\n`;
  if (s.preamble) txt += strip(s.preamble) + "\n";
  s.questions.forEach((q, i) => {
    txt += `\nQ${i + 1}. ${strip(q.stem)}\n`;
    if (q.letterOptions) txt += `  (answer ${q.options.map((_, k) => "ABCDE"[k]).join(", ")})\n`;
    else q.options.forEach((x, k) => txt += `  ${"ABCDE"[k]}) ${strip(x)}\n`);
  });
});
txt += "\nNOTE: picture options are described by their accessibility labels. If a label is too vague to solve from, the test author must describe those pictures to the solver separately.\n";
if (out) fs.writeFileSync(out, txt); else process.stdout.write(txt);
