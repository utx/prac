// Usage: node tools/check_lengths.js tests/v33/index.html
// Flags any worded question whose correct option is the single longest option.
const fs = require("fs");
const f = process.argv[2];
const h = fs.readFileSync(f, "utf8");
const js = h.slice(h.indexOf("<script>") + 8, h.lastIndexOf("</script>"));
const stubEl = { textContent: "", innerHTML: "", classList: { add(){}, remove(){}, toggle(){} }, querySelectorAll: () => [], set onclick(_) {} };
const document = { getElementById: () => stubEl };
const window = { scrollTo(){} };
const SECTIONS = new Function("document", "window", "confirm", "setInterval", "clearInterval",
  js.replace(/showStart\(\);\s*$/m, "") + "\nreturn SECTIONS;")(document, window, () => true, () => 0, () => {});
const strip = s => String(s).replace(/<[^>]*>/g, "").trim();
let text = 0, longest = 0; const detail = [];
SECTIONS.forEach(s => s.questions.forEach((q, i) => {
  if (q.options.some(o => /<svg/.test(o)) || q.letterOptions) return;
  if (q.options.every(o => strip(o).length < 12)) return;
  text++;
  const lens = q.options.map(o => strip(o).length), max = Math.max(...lens);
  const isLongest = lens[q.answer] === max && lens.filter(l => l === max).length === 1;
  if (isLongest) longest++;
  detail.push(`${s.name.split(" ")[0]} Q${i + 1}:${isLongest ? "LONGEST" : "-"}`);
}));
console.log(`correct answer is the single longest option in ${longest} of ${text} worded questions |`, detail.join(" "));
process.exitCode = longest ? 1 : 0;
