/* RIDGE RUNNER: hand-written reading questions (A–D). All texts are our own.
   Each text builds one reading skill at a time, at test level from step 1 (story extracts of about 80–150 words);
   eight per step, answer letters spread evenly within each step (each letter twice). */
const P = t => `<div class="passage">${t}</div>`;
/* ---------- The right word ---------- */
const GAP = s => `<p class="gapline">${s.replace("___", '<span class="blank">________</span>')}</p><p>Which word best fills the gap?</p>`;
H("word", 1, "rw1a", { stem: GAP("The detective ___ every page of the diary, searching for even the smallest clue."),
  opts: [["skimmed", "skimming is reading quickly for the gist, the opposite of searching for the smallest clue"], ["glimpsed", "a glimpse is a brief look"], ["scrutinised", null], ["surveyed", "surveying is looking over the whole of something, not studying every detail"]],
  body: "“Searching for even the smallest clue” needs a word for examining closely and carefully: scrutinised." });
H("word", 1, "rw1b", { stem: GAP("After weeks without rain, the once-mighty river had ___ to a thin, muddy trickle."),
  opts: [["flourished", "flourishing is growing strongly, the opposite"], ["dwindled", null], ["plummeted", "plummeting is a sudden fall, but this happened slowly over weeks"], ["condensed", "condensing is a gas turning into liquid, which isn't what happened"]],
  body: "Shrinking gradually over weeks, from mighty to a trickle: dwindled." });
H("word", 1, "rw1c", { stem: GAP("The audience sat ___ as the magician slowly lifted the cloth from the empty cage."),
  opts: [["restless", "restless means fidgety and impatient, not gripped"], ["drowsy", "drowsy is sleepy, not gripped by the trick"], ["oblivious", "oblivious means not noticing, but they are watching closely"], ["spellbound", null]],
  body: "A slow, tense reveal holds the audience completely still and fascinated: spellbound." });
H("word", 1, "rw1d", { stem: GAP("Although the storm had passed, the sea was still ___, with huge grey waves crashing over the breakwater."),
  opts: [["turbulent", null], ["placid", "placid means calm, the opposite of crashing waves"], ["stagnant", "stagnant water is still and stale"], ["shallow", "about depth, not the wild waves"]],
  body: "“Huge grey waves crashing” describes wild, churning water: turbulent." });
H("word", 1, "rw1e", { stem: GAP("Mia gave such a ___ answer that nobody could tell whether she had agreed to come or not."),
  opts: [["blunt", "a blunt answer is very direct, so everyone would know"], ["prompt", "prompt means quick, which doesn't explain the confusion"], ["vague", null], ["cheerful", "a cheerful answer could still be clear"]],
  body: "Nobody could tell what she meant, so the answer was unclear: vague." });
H("word", 1, "rw1f", { stem: GAP("The old sailor's tales were so ___ that many people refused to believe them."),
  opts: [["mundane", "mundane means dull and ordinary, which nobody would doubt"], ["far-fetched", null], ["accurate", "accurate stories are true, the opposite of unbelievable"], ["modest", "modest stories are low-key, not hard to believe"]],
  body: "People refused to believe them, so the stories must have been hard to believe: far-fetched." });
H("word", 1, "rw1g", { stem: GAP("The ___ smell of fresh bread drew a long queue of customers out onto the footpath."),
  opts: [["pungent", "pungent means sharp and strong, usually unpleasant"], ["faint", "a faint smell wouldn't draw a long queue"], ["stale", "stale doesn't fit fresh bread"], ["enticing", null]],
  body: "A smell that pulls customers in is attractive and tempting: enticing." });
H("word", 1, "rw1h", { stem: GAP("The new library was an ___ building of glass and steel that towered over the old shops around it."),
  opts: [["imposing", null], ["unassuming", "unassuming means modest and plain, not towering"], ["inviting", "inviting is about seeming friendly, not about towering size"], ["unsightly", "unsightly means ugly, but nothing in the sentence says it was ugly"]],
  body: "A huge glass-and-steel building that towers over its neighbours is grand and impressive: imposing. (The “an” before the gap also needs a word that starts with a vowel sound, and all four do, so only the meaning decides.)" });
H("word", 2, "rw2a", { stem: GAP("After a long argument, the two teams agreed to ___ their differences and work together."),
  opts: [["solve", "you solve a problem, but you don't “solve differences”"], ["mend", "you mend a friendship, but not “differences”"], ["settle", null], ["close", "you close a gap, but not “differences”"]],
  body: "The fixed partner is “settle your differences”: sort out a disagreement." });
H("word", 2, "rw2b", { stem: GAP("After a long meeting, the council finally ___ a decision about the new swimming pool."),
  opts: [["reached", null], ["arrived", "“arrived” needs “at”: arrived AT a decision"], ["got", "“got a decision” would mean received one from someone else"], ["did", "you don't “do” a decision"]],
  body: "You “reach a decision” (or “arrive at” one). Only “reached” fits without another word." });
H("word", 2, "rw2c", { stem: GAP("The grass fire spread so quickly that it was soon out of ___."),
  opts: [["order", "“out of order” means broken, like a lift"], ["reach", "“out of reach” means too far away to touch"], ["danger", "“out of danger” means safe, the opposite"], ["control", null]],
  body: "Something that can no longer be managed is “out of control”." });
H("word", 2, "rw2d", { stem: GAP("Please ___ close attention to the safety instructions before the ride begins."),
  opts: [["spend", "“spend” goes with time or money, not attention"], ["pay", null], ["take", "you take notice, but you PAY attention"], ["put", "“put attention” isn't used"]],
  body: "The fixed partner is “pay attention”." });
H("word", 2, "rw2e", { stem: GAP("The scientist's discovery shed new ___ on how dinosaurs might have moved."),
  opts: [["sight", "you catch sight of something; you don't shed it"], ["view", "you can take a new view, but you don't shed one"], ["light", null], ["glow", "close in meaning, but “shed glow” isn't the expression"]],
  body: "“Shed light on” means help explain. Only “light” goes with “shed … on”." });
H("word", 2, "rw2f", { stem: GAP("Mr Ito ___ his promise and was sitting in the front row for his daughter's concert."),
  opts: [["held", "you hold your breath or your nerve, not a promise"], ["saved", "you save money or time, not a promise"], ["kept", null], ["made", "making a promise is giving it; the sentence shows he carried it out"]],
  body: "Doing what you promised is “keeping” your promise. “Made” is the trap: he made it earlier, and this sentence shows him keeping it." });
H("word", 2, "rw2g", { stem: GAP("The climbers had a ___ escape when the rock face crumbled moments after they reached the ledge."),
  opts: [["thin", "close in meaning, but “a thin escape” isn't the expression"], ["slim", "“slim” goes with chance, not escape"], ["tight", "“tight” goes with squeeze, not escape"], ["narrow", null]],
  body: "Escaping danger only just in time is a “narrow escape”." });
H("word", 2, "rw2h", { stem: GAP("The council has ___ a ban on fireworks during the dry season."),
  opts: [["imposed", null], ["inflicted", "you inflict pain or damage, not a ban"], ["committed", "you commit a crime or a mistake"], ["dealt", "you deal a blow or cards, not a ban"]],
  body: "Rules and bans are “imposed”: put in place by someone with the power to do it." });
H("word", 3, "rw3a", { stem: GAP("Lily insisted ___ paying for everyone's ice cream."),
  opts: [["to", "“insisted to paying” breaks the sentence"], ["for", "“insisted for” isn't used"], ["at", "“insisted at” isn't used"], ["on", null]],
  body: "“Insist” takes “on”: insisted on paying." });
H("word", 3, "rw3b", { stem: GAP("The coach ___ us to keep our eyes on the ball."),
  opts: [["said", "“said us to” breaks the grammar"], ["told", null], ["spoke", "“spoke us” has no place for “to keep”"], ["talked", "“talked us to keep” isn't correct"]],
  body: "Only “told” can be followed by a person and then “to” + a verb: told us to keep." });
H("word", 3, "rw3c", { stem: GAP("The scientist was famous ___ her work on rainforest frogs."),
  opts: [["about", "we don't say “famous about”"], ["with", "“famous with” would mean popular with a group of people"], ["for", null], ["of", "“famous of” isn't used"]],
  body: "You are famous FOR something you did." });
H("word", 3, "rw3d", { stem: GAP("The teacher ___ the class that the excursion had been cancelled."),
  opts: [["informed", null], ["announced", "you announce something TO the class, not “announced the class”"], ["explained", "you explain TO someone"], ["said", "you say something TO someone"]],
  body: "Only “informed” can be followed straight away by the people and then “that…”." });
H("word", 3, "rw3e", { stem: GAP("The scientists were intent ___ finding the cause of the mysterious illness."),
  opts: [["to", "“intent to” is a noun phrase (“with intent to”), not what follows “were intent”"], ["for", "“intent for” isn't used"], ["at", "“intent at” isn't used"], ["on", null]],
  body: "Being determined to do something is being “intent on” it: intent on finding." });
H("word", 3, "rw3f", { stem: GAP("Ms Daly ___ that we bring a hat and a water bottle on the excursion."),
  opts: [["wanted", "“wanted that we bring” breaks the grammar: we say “wanted us to bring”"], ["suggested", null], ["told", "“told” needs a person first: “told us that …”"], ["let", "“let” needs a person and a plain verb: “let us bring”"]],
  body: "Only “suggested” can be followed straight away by “that we bring …”." });
H("word", 3, "rw3g", { stem: GAP("The firefighters were praised ___ their bravery during the bushfire."),
  opts: [["of", "“praised of” isn't used"], ["for", null], ["with", "“praised with” would mean the praise came along with something else"], ["about", "“praised about” isn't used"]],
  body: "You are praised FOR something you did." });
H("word", 3, "rw3h", { stem: GAP("Although he was furious, the coach refrained ___ shouting at the referee."),
  opts: [["from", null], ["to", "“refrained to” breaks the grammar"], ["of", "“refrained of” isn't used"], ["against", "“against” sounds right for holding back, but “refrain” takes “from”"]],
  body: "“Refrain” (hold yourself back) takes “from” + an -ing word: refrained from shouting." });
H("word", 4, "rw4a", { stem: `<p class="gapline">Ruby had expected the old house to be gloomy. Instead, the rooms were <span class="blank">________</span>, with sunlight pouring through tall windows onto white walls.</p><p>Which word best fills the gap?</p>`,
  opts: [["airy", null], ["dim", "dim is close to gloomy, but “Instead” says the rooms were the opposite"], ["cosy", "cosy suggests small and snug, not tall windows and pouring light"], ["musty", "musty is stale and old-smelling, which matches gloomy, not the sunlight"]],
  body: "“Instead” signals the opposite of gloomy, and the sunlight, tall windows and white walls describe light, open, fresh rooms: airy." });
H("word", 4, "rw4b", { stem: `<p class="gapline">The first time he tried, the pancake landed on the floor. The second time it stuck to the ceiling. By the tenth try, though, Sam had <span class="blank">________</span> the knack, and every pancake landed neatly back in the pan.</p><p>Which word best fills the gap?</p>`,
  opts: [["lost", "he never had it to lose; the passage shows him improving"], ["missed", "missing the knack is the opposite of “every pancake landed neatly”"], ["mastered", null], ["forgotten", "the story is about learning, not forgetting"]],
  body: "“Though” turns from the failures to success, and “every pancake landed neatly” shows he had learned the trick completely: mastered." });
H("word", 4, "rw4c", { stem: `<p class="gapline">Most of the class finished the puzzle in ten minutes. Arjun took nearly an hour, but he refused to give up, and his teacher praised his <span class="blank">________</span>.</p><p>Which word best fills the gap?</p>`,
  opts: [["speed", "he was the slowest, so speed would be the wrong thing to praise"], ["persistence", null], ["cleverness", "possible in general, but the passage stresses that he refused to give up"], ["luck", "nothing in the passage is about luck"]],
  body: "The clue is in the earlier part of the sentence: he took ages but “refused to give up”. That is persistence." });
H("word", 4, "rw4d", { stem: `<p class="gapline">Mia was sure the test would be easy, so she barely studied. When she read the first question, she realised she had been far too <span class="blank">________</span>.</p><p>Which word best fills the gap?</p>`,
  opts: [["careful", "barely studying is the opposite of careful"], ["nervous", "she was sure it would be easy, so she wasn't nervous before"], ["modest", "being sure of yourself is the opposite of modest"], ["confident", null]],
  body: "The clue is the sentence before: she was “sure the test would be easy” and “barely studied”. Her mistake was being too confident." });
H("word", 4, "rw4e", { stem: `<p class="gapline">Everyone had expected the visiting speaker to be dull. Yet her talk was so <span class="blank">________</span> that the whole hall burst into laughter again and again.</p><p>Which word best fills the gap?</p>`,
  opts: [["solemn", "solemn is serious, which matches “dull”, but “Yet” signals the opposite"], ["witty", null], ["lengthy", "a long talk wouldn't make the hall laugh"], ["informative", "it fits a talk, but it doesn't explain the laughter"]],
  body: "“Yet” turns away from “dull”, and “burst into laughter again and again” shows a clever, funny talk: witty." });
H("word", 4, "rw4f", { stem: `<p class="gapline">The garden had once been the pride of the street. Now, after years of neglect, it was <span class="blank">________</span> with weeds and broken pots.</p><p>Which word best fills the gap?</p>`,
  opts: [["adorned", "adorned means decorated, which is positive, but the garden has been neglected"], ["bordered", "a border is only round the edge; weeds after years of neglect fill everything"], ["overrun", null], ["planted", "planting is done on purpose; neglect means nobody was caring for it"]],
  body: "“Once the pride … Now, after years of neglect” sets up a contrast: weeds have spread everywhere. That is “overrun”." });
H("word", 4, "rw4g", { stem: `<p class="gapline">Toby is always the first to volunteer for anything. So when he sat silently at the back while the teacher asked for helpers, his friends were <span class="blank">________</span>.</p><p>Which word best fills the gap?</p>`,
  opts: [["unsurprised", "the first sentence says he ALWAYS volunteers, so this is the opposite of what they would expect"], ["puzzled", null], ["delighted", "nothing suggests his friends were happy he stayed quiet"], ["relieved", "relief would need a reason, such as not wanting him to help"]],
  body: "The first sentence sets up what is normal for Toby, and “So” shows the friends reacting to the change. Seeing him act out of character, they would be puzzled." });
H("word", 4, "rw4h", { stem: `<p class="gapline">The old letters had survived a house fire and a hundred years in a damp cellar. Nobody had read them for decades. When the museum finally received them, they were too <span class="blank">________</span> to be handled at all, so every page was photographed instead.</p><p>Which word best fills the gap?</p>`,
  opts: [["tattered", "tattered means ragged and torn at the edges; torn paper can still be handled with care"], ["weathered", "weathered means worn by time and weather, which fits their history but doesn't stop anyone touching them"], ["musty", "musty means smelling of damp, which fits the cellar, but a smell doesn't stop anyone handling paper"], ["brittle", null]],
  body: "All four words could describe old paper, so decide by the shade of meaning. “Too … to be handled at all” needs paper that would break if touched, and the first sentence explains why: fire dried it and damp weakened it. Paper so dry and hard that it snaps or crumbles is “brittle”." });
