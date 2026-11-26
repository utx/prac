/* RIDGE RUNNER: the cloze passages (A–D). All texts are our own.
   David, Nov 2026: "make the cloze questions proper passages with several gaps". Each passage has four gaps that climb
   like the skill's four steps: gap 1 = shades of meaning, gap 2 = word partners, gap 3 = grammar fit, gap 4 = a clue
   from the rest of the passage. A stage's briefing is one whole passage, gap 1 to gap 4 (briefing() in the template);
   bosses and chests can ask one gap. Gaps already answered are shown filled in, the one being asked is highlighted.
   Eight passages, so eight questions per step (each answer letter twice per step, spread by 90_finish.js). */
const P = t => `<div class="passage">${t}</div>`;
/* CLOZE(grp, title, text, gaps): text marks the gaps [1] … [4]; gaps[k] = { opts: [[word, trap-or-null] x4], body } */
const CLOZE = (grp, title, text, gaps) => {
  const right = gaps.map(g => g.opts.find(o => o[1] === null)[0]);
  gaps.forEach((g, i) => {
    const k = i + 1;
    const shown = text.replace(/\[(\d)\]/g, (m, n) => { n = +n;
      if (n < k) return `<b class="filled">(${n}) ${right[n - 1]}</b>`;
      if (n === k) return `<span class="blank cur">(${n}) ________</span>`;
      return `<span class="blank">(${n}) ______</span>`; });
    H("word", k, `${grp}-${k}`, { grp, passage: P(`<p class="ptitle"><b>${title}</b></p><p>${shown}</p>`),
      stem: `<p>Which word best fills gap <b>${k}</b>?</p>`, opts: g.opts, body: g.body });
  });
};

CLOZE("cz1", "The last keeper",
  "For forty years, Mr Hale had climbed the hundred and twelve steps of Cape Wren lighthouse at dusk. Tonight would be the last time: from tomorrow, a machine would switch the lamp on by itself. He polished the great lens [1], lingering over every pane of glass as if he did not want to finish. Below him the sea heaved and foamed, and a few gulls [2] shelter among the rocks, waiting [3] the storm to pass. When the lamp finally blazed into life, Mr Hale did not go down. He stood beside it for a long time, watching its beam sweep across the water. He had always grumbled that the job was lonely, but now that it was ending, the thought left him strangely [4].",
  [{ opts: [["unhurriedly", null], ["hastily", "hastily means in a rush, but he lingers as if he does not want to finish"], ["briskly", "briskly means quick and energetic, which clashes with lingering"], ["absent-mindedly", "absent-mindedly means without thinking; his lingering is deliberate, not careless"]],
     body: "The clue is in the same sentence: he lingers over every pane 'as if he did not want to finish'. <b>Unhurriedly</b> means slowly, taking his time." },
   { opts: [["took", null], ["made", "you make a shelter (build one), but you do not 'make shelter'"], ["held", "held goes with breath or ground, not with shelter"], ["kept", "kept goes with watch or quiet (keep watch), not with shelter"]],
     body: "Shelter's partner word is <b>take</b>: to take shelter means to find a safe place out of the weather." },
   { opts: [["for", null], ["until", "'waiting until' needs a whole clause after it (waiting until the storm passed), not 'the storm to pass'"], ["while", "'while' must be followed by a whole clause, such as 'while the storm passed'"], ["since", "'since' must be followed by a whole clause, such as 'since the storm began'"]],
     body: "Only <b>for</b> fits the pattern 'wait for something to happen': waiting for the storm to pass." },
   { opts: [["hollow", null], ["relieved", "he did grumble that the job was lonely, but 'but now that it was ending' turns against that, and he lingers instead of going down"], ["proud", "nothing in the passage is about pride or something he has achieved"], ["cheerful", "cheerful clashes with the way he lingers by the lamp, not wanting to finish"]],
     body: "Use the whole passage: he lingers over the lens, does not go down, and stands watching the beam. 'But now that it was ending' contrasts with his old grumbling: he is sad to leave, so the thought leaves him <b>hollow</b> (empty and sad)." }]);

CLOZE("cz2", "Opening the hive",
  "On the first warm morning of spring, Nana Rose lifted the lid of the hive [1], careful not to jolt the frames inside. Thousands of bees crawled over the golden comb, and the air was [2] with a low, steady hum. I had expected them to pour out in a fury, but they seemed far too [3] in their work to notice us. Nana pointed out the queen, longer than the others and surrounded by her attendants. By the time we eased the lid back on, my fear had [4], and I was already begging to come again next week.",
  [{ opts: [["delicately", null], ["abruptly", "abruptly means suddenly: the kind of movement that would jolt the frames"], ["forcefully", "forcefully means with strength, the opposite of being careful"], ["hurriedly", "hurriedly means rushing, but careful lifting is slow"]],
     body: "The clue comes straight after the gap: 'careful not to jolt the frames'. <b>Delicately</b> means gently and with great care." },
   { opts: [["alive", null], ["lively", "lively looks similar, but it describes a person or a party; the partnership is 'alive with'"], ["living", "living means not dead, and 'living with' means sharing a home"], ["awake", "awake means not asleep; air cannot be awake"]],
     body: "<b>Alive with</b> is a word partnership meaning full of movement or sound: the air was alive with a hum." },
   { opts: [["absorbed", null], ["intent", "intent goes with 'on' (intent on their work), not 'in'"], ["devoted", "devoted goes with 'to' (devoted to their work), not 'in'"], ["accustomed", "accustomed goes with 'to' and means used to something"]],
     body: "Check the word that follows the gap: 'in their work'. Only <b>absorbed</b> takes 'in': absorbed in their work means so busy that they notice nothing else." },
   { opts: [["evaporated", null], ["intensified", "intensified means grew stronger, but at the end she is begging to come back"], ["returned", "returned would mean the fear had gone and come back; nothing in the passage shows that"], ["hardened", "hardened means set firm: a fear that stays, not one that has gone"]],
     body: "Use the whole passage: she 'had expected' the bees to pour out in a fury, they ignored her, and at the end she is begging to come again. Her fear has disappeared: it has <b>evaporated</b>." }]);

CLOZE("cz3", "The raft",
  "Mia and her brother spent the whole holiday building a raft from old barrels and planks. Their first attempt sank within seconds, leaving Mia soaked and [1]. Undeterred, they lashed the barrels more tightly and added a third at the front. On launch day, the whole street held its [2] as Mia pushed off with a long pole. To everyone's surprise, the raft glided steadily downstream, as level as a kitchen table. Her brother cheered from the bank, but Mia kept her eyes on the water ahead. After the first disaster she was taking no chances, and she would not allow herself [3] yet. Only when the raft bumped safely against the sandbank at the bend did she finally [4].",
  [{ opts: [["crestfallen", null], ["elated", "elated means overjoyed: not how you feel when your raft sinks"], ["indifferent", "indifferent means not caring, but 'undeterred' shows they cared and tried again"], ["triumphant", "triumphant is the feeling of winning, not of sinking"]],
     body: "The raft has just sunk within seconds. <b>Crestfallen</b> means disappointed and downcast, which is how she would feel." },
   { opts: [["breath", null], ["breathe", "breathe looks alike, but it is the verb; 'held its' needs the noun, breath"], ["air", "air has the right idea, but the partnership is 'hold your breath', not 'hold your air'"], ["pulse", "you take or feel a pulse; you cannot hold it"]],
     body: "<b>Held its breath</b> is the word partnership: the whole street waited tensely, not breathing." },
   { opts: [["to grin", null], ["grinning", "'allow herself grinning' breaks the sentence: allow takes 'to' + a verb"], ["grin", "'allow herself grin' is missing the 'to'"], ["grinned", "grinned is the past tense and cannot follow 'allow herself'"]],
     body: "The pattern is 'allow yourself <b>to</b> do something', so only <b>to grin</b> fits after 'allow herself'." },
   { opts: [["relax", null], ["relent", "relent means give in after refusing; she was not refusing anything"], ["despair", "despair means lose hope, but the raft has just reached safety"], ["hesitate", "she has been careful the whole way, so 'finally hesitate' makes no sense once she is safe"]],
     body: "Use the whole passage: after the first disaster she takes no chances, keeps her eyes ahead and will not even grin. Only when the raft is safe does she <b>relax</b>." }]);

CLOZE("cz4", "The clockmaker",
  "Mr Petrov's shop was so crammed with clocks that it was hard to find a bare patch of wall. Every hour, dozens of them chimed at once, a [1] that made new customers jump. Mr Petrov sat hunched over his bench, peering through a magnifying glass and coaxing tiny cogs back into place with tweezers. He [2] great pride in his work and refused to be rushed. 'A clock mended in a hurry,' he liked to say, 'is a clock that will soon need mending again.' When I asked him how he could bear the noise, he looked puzzled, as if the question had never [3] to him. To him, the chiming was not noise at all. When every clock struck the hour together, it was the sound of everything working [4].",
  [{ opts: [["din", null], ["melody", "a melody is a tune; it would not make people jump"], ["murmur", "a murmur is soft and low, but dozens of clocks chiming at once is loud"], ["whisper", "a whisper is far too quiet to make anyone jump"]],
     body: "Dozens of clocks chimed at once and made customers jump: a <b>din</b> is a loud, confused noise." },
   { opts: [["took", null], ["gave", "you can give praise, but pride does not partner with give"], ["made", "made does not partner with pride"], ["held", "held does not partner with pride in this way"]],
     body: "Pride's partner word is <b>take</b>: to take pride in your work means to be pleased with it and do it carefully." },
   { opts: [["occurred", null], ["struck", "struck fits 'had never struck him', but not with 'to him'"], ["crossed", "crossed needs 'his mind' (had never crossed his mind), not 'to him'"], ["suggested", "'had never suggested to him' does not make sense: a question cannot suggest"]],
     body: "Only <b>occurred</b> takes 'to him': the question had never occurred to him (come into his mind)." },
   { opts: [["perfectly", null], ["loudly", "the chimes are loud, but the passage says that to him they were not noise at all"], ["slowly", "he works slowly, but the clocks striking together are not slow"], ["separately", "they strike the hour together, not separately"]],
     body: "Use the whole passage: he takes great care, refuses to be rushed, and to him the chiming is not noise. When every clock strikes the hour together, they all show the right time: everything is working <b>perfectly</b>." }]);

CLOZE("cz5", "Waiting for a platypus",
  "Dad woke me before sunrise and we [1] down to the creek. He had promised me a platypus, but he warned me that they are shy and easily disturbed. We sat on a log without a sound, so still that a wren hopped within [2] reach of us. For a long time nothing happened except the slow brightening of the sky. Then a line of bubbles appeared near the far bank, and a small brown shape [3] to the surface, as smooth as a wet stone. It floated for a moment, then I shifted my foot on the log, and in a flash it curled under and was gone. Dad just smiled. The platypus had proved to be exactly as [4] as he had warned.",
  [{ opts: [["tiptoed", null], ["ambled", "ambled means walked slowly and easily, but it says nothing about keeping quiet for a shy animal"], ["hurried", "hurried means moved quickly, which is noisy and careless near a shy animal"], ["trudged", "trudged means walked heavily and wearily, which would disturb a shy animal"]],
     body: "The next sentence gives the clue: platypuses are 'shy and easily disturbed'. <b>Tiptoed</b> means walked quietly and carefully." },
   { opts: [["arm's", null], ["hand's", "'within hand's reach' is not the phrase"], ["finger's", "'within finger's reach' is not the phrase"], ["leg's", "'within leg's reach' is not the phrase"]],
     body: "<b>Within arm's reach</b> is a fixed phrase meaning close enough to touch." },
   { opts: [["rose", null], ["surfaced", "surfaced already means came to the surface, so 'surfaced to the surface' says it twice"], ["arrived", "you arrive at a place, not 'to' it"], ["appeared", "you appear at or on something; 'appeared to the surface' breaks the sentence"]],
     body: "Only <b>rose</b> fits with 'to the surface': the shape rose to the surface." },
   { opts: [["timid", null], ["fierce", "'as he had warned' sounds like danger, but Dad warned that platypuses are shy, not fierce"], ["slippery", "it was 'as smooth as a wet stone', but that is how it looked, not what Dad warned about"], ["sleepy", "Dad never said it would be sleepy, and it vanished in a flash"]],
     body: "Go back to the start of the passage: Dad 'warned me that they are shy and easily disturbed'. One small movement of a foot and it was gone, so it was exactly as <b>timid</b> (shy and easily frightened) as he had warned." }]);

CLOZE("cz6", "Robot rescue",
  "Our robot was meant to carry a ping-pong ball through a maze and drop it into a cup. In practice it had worked perfectly, but on competition day it [1] at the first corner and refused to move. While the judges waited, Arjun set to [2], insisting [3] checking every wire himself. At last he found the problem: a loose battery clip. He fixed it, set the robot back at the start and pressed the switch. This time it rolled smoothly through the maze, and the ball dropped neatly into the cup. We did not win, because the judges took points off for the [4]. Even so, as we packed up, Arjun looked as pleased as if we had.",
  [{ opts: [["stalled", null], ["slowed", "slowed means went more slowly, but the robot stopped completely"], ["hesitated", "hesitated means paused for a moment and then went on, but it refused to move at all"], ["skidded", "skidded means slid out of control, but it did not move"]],
     body: "It 'refused to move': <b>stalled</b> means stopped working and came to a halt." },
   { opts: [["work", null], ["job", "'set to job' is not a phrase"], ["task", "'set to task' is not a phrase without 'the'"], ["labour", "'set to labour' is not the phrase used"]],
     body: "<b>Set to work</b> is a word partnership meaning started working hard straight away." },
   { opts: [["on", null], ["in", "insist goes with 'on', not 'in'"], ["to", "'insisting to checking' breaks the sentence"], ["for", "insist does not take 'for'"]],
     body: "The verb insist takes <b>on</b>: insisting on checking every wire." },
   { opts: [["delay", null], ["speed", "the robot was not too fast: in the end it rolled smoothly through the maze"], ["noise", "nothing in the passage mentions noise"], ["shortcut", "it went through the maze and dropped the ball in the cup; no shortcut is mentioned"]],
     body: "Use the whole passage: the robot stalled and 'the judges waited' while Arjun checked every wire. The only thing that went wrong was the time this took: the <b>delay</b>." }]);

CLOZE("cz7", "The kite",
  "Last September I flew a kite I had made myself from bamboo and an old shopping bag. It was not the most [1] kite on the beach, but it climbed higher than I had dared to hope. I was so proud that I began to take the wind for [2]. Then, without warning, it changed direction. My kite lurched sideways, and for a terrible moment I could not stop it [3] towards a family's picnic rug. I hauled on the string with all my strength, and it swooped up again, missing their sandwiches by a whisker. The family clapped, and my face burned with [4]. From then on I kept a firm grip and watched the sky like a sailor.",
  [{ opts: [["elegant", null], ["effective", "'but it climbed higher than I had dared to hope' shows it flew well, so it did not lack effectiveness"], ["powerful", "it climbed high, so power is not what it lacked"], ["successful", "it was successful, so 'not the most successful … but it climbed higher' makes no sense"]],
     body: "'But' sets up a contrast: it was made from an old shopping bag (not much to look at) but it flew well. <b>Elegant</b> (graceful, stylish) is about looks, so it is the only one that contrasts." },
   { opts: [["granted", null], ["given", "'take for given' is not the phrase"], ["guaranteed", "'take for guaranteed' is not the phrase, even though the meaning is close"], ["certain", "you can take something 'as certain', but not 'for certain' after take"]],
     body: "<b>Take for granted</b> is a fixed phrase meaning expect something to always be there without thinking about it." },
   { opts: [["diving", null], ["to dive", "'stop it to dive' would mean stop it so that it could dive"], ["dive", "'stop it dive' is missing a word"], ["dived", "dived is the past tense and cannot follow 'stop it'"]],
     body: "The pattern is 'stop something <b>doing</b> something', so only <b>diving</b> fits: I could not stop it diving towards the rug." },
   { opts: [["shame", null], ["pride", "the family clapped, but his kite had nearly crashed into their picnic: nothing to be proud of"], ["joy", "being clapped for can feel good, but he had nearly ruined their picnic"], ["fury", "nobody had done anything to him: the mistake was his own"]],
     body: "On its own, the sentence could fit pride or joy, because the family clapped. The rest of the passage decides: he had taken the wind for granted and his kite nearly crashed into their picnic. The clapping makes it worse, so his face burned with <b>shame</b> (embarrassment)." }]);

CLOZE("cz8", "The corn maze",
  "The sign at the entrance promised that the corn maze would take 'about twenty minutes'. An hour later, Leo and I were still [1] between walls of green stalks far taller than us. Leo wanted to keep turning left, but I [2] to differ. I was convinced [3] the exit lay near the tractor we could hear in the next field, so in the end we followed the sound. Ten minutes later we stumbled out, scratched and dusty, right beside the ticket booth. My [4] had been right after all. The woman there glanced at her watch and smiled. 'About twenty minutes,' she said, and I still cannot decide whether she was teasing us.",
  [{ opts: [["wandering", null], ["strolling", "strolling means walking for pleasure, but they are lost after an hour"], ["sauntering", "sauntering means walking in a slow, relaxed way, not being lost"], ["parading", "parading means walking to show off"]],
     body: "An hour later they are 'still' inside: <b>wandering</b> means moving around without knowing where you are going." },
   { opts: [["begged", null], ["asked", "'asked to differ' is not the phrase"], ["pleaded", "'pleaded to differ' is not the phrase"], ["requested", "'requested to differ' is not the phrase"]],
     body: "<b>I beg to differ</b> is a fixed, polite way of saying 'I disagree'." },
   { opts: [["that", null], ["what", "'convinced what the exit lay' breaks the sentence"], ["which", "'convinced which the exit lay' breaks the sentence"], ["of", "'convinced of' needs a noun after it, such as 'convinced of the way out'"]],
     body: "After 'convinced', a whole idea needs <b>that</b>: I was convinced that the exit lay near the tractor." },
   { opts: [["hunch", null], ["sign", "the sign promised about twenty minutes and they took over an hour, so the sign was not right"], ["map", "no map is mentioned: they found the way by following the sound of the tractor"], ["compass", "no compass is mentioned: they followed the sound of the tractor"]],
     body: "Use the whole passage: Leo wanted to keep turning left, but the writer 'was convinced' the exit was near the tractor, without being able to prove it. They followed that idea and came out at the exit. A feeling you trust without proof is a <b>hunch</b>." }]);
