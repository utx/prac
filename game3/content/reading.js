/* ---------------------------------------------------------------
   STORM ISLAND: reading passages (hand-written, all original). Four options (A–D),
   except the missing-sentences passage, where the bank of six sentences is the
   option set for every gap. A reading opponent shows one passage and asks several
   of its questions. tier 1–3 = storm circle 1–3.
   All five reading formats are here: cloze ×2, story ×2, missing sentences, poem, four extracts ×2.
   --------------------------------------------------------------- */
(() => {
  const G = n => `<span data-g="${n}" class="gap">(${n}) ______</span>`;
  const gapQ = (id, n, options, answer, explain) => ({ id, gap: n, cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap ${n}</b>?</p>`, options, answer, explain });
  const EX = ["Extract A", "Extract B", "Extract C", "Extract D"];

  /* ============ circle 1: cloze ============ */
  READING.push({
    id: "wheel", tier: 1, format: "cloze", title: "At the Wheel",
    note: "Some words are missing from this piece about a first pottery lesson. Choose the word that fits each gap best.",
    html: `<p>I had watched potters at work on television and privately decided that it looked easy. A lump of clay, a spinning wheel, a pair of wet hands: within seconds a bowl would ${G(1)} as if by magic. So when my uncle offered me a lesson in his studio, I accepted without ${G(2)}.</p>
<p>My confidence ${G(3)} about a minute. The clay must sit in the exact centre of the wheel, and mine would not. It wobbled, lurched sideways and finally flew off, landing on the floor with a slap. My uncle said nothing. He simply handed me another lump.</p>
<p>By the fourth attempt I had learned to keep my elbows tucked in and my hands still, letting the wheel do the work. Slowly, a wall of clay began to rise between my fingers. I was so ${G(4)} in watching it grow that I forgot to breathe. Then I pressed a fraction too hard, and the whole thing folded in on itself like a tired balloon.</p>
<p>I expected to feel ${G(5)}. Instead I found myself laughing, and reaching for the clay again. The bowl I finally took home is thick, lopsided and far from perfect, yet I would not ${G(6)} it for the finest one in my uncle’s shop.</p>`,
    questions: [
      gapQ("r1a", 1, ["arrive", "emerge", "happen", "result"], 1, `<p>A bowl slowly appears out of a shapeless lump, so it would <b>emerge</b>: come into view out of something.</p><p class="why-not">A bowl does not “arrive” (it was never travelling) or “happen” (events happen, objects don’t). “Result” would need more words, such as “result from the spinning”.</p>`),
      gapQ("r1b", 2, ["exception", "permission", "interruption", "hesitation"], 3, `<p>To accept “without <b>hesitation</b>” is to say yes at once, without stopping to think. It fits a writer who is sure the job will be easy.</p><p class="why-not">“Without exception” means “every single one”. “Without permission” and “without interruption” are real phrases, but nobody is giving permission or interrupting here.</p>`),
      gapQ("r1c", 3, ["lasted", "stayed", "kept", "continued"], 0, `<p>Something that goes on for a length of time <b>lasts</b> that long: “My confidence lasted about a minute.”</p><p class="why-not">“Stayed” and “kept” need something after them (stayed high, kept going). “Continued” would need “for”: “continued for about a minute”.</p>`),
      gapQ("r1d", 4, ["fascinated", "attracted", "absorbed", "delighted"], 2, `<p>The clue is the little word “in”. You are <b>absorbed in</b> something when it takes all your attention.</p><p class="why-not">The others take different words after them: fascinated <i>by</i>, attracted <i>to</i>, delighted <i>with</i> or <i>by</i>.</p>`),
      gapQ("r1e", 5, ["crushed", "thrilled", "relieved", "amused"], 0, `<p>Read on: “Instead I found myself laughing.” The word “instead” tells us the gap is the opposite of laughing. After watching the bowl collapse, the writer expected to feel <b>crushed</b> (bitterly disappointed).</p><p class="why-not">“Thrilled”, “relieved” and “amused” are all happy feelings, so “instead” would make no sense after them. “Crushed” also echoes what has just happened to the clay.</p>`),
      gapQ("r1f", 6, ["alter", "replace", "convert", "swap"], 3, `<p>You <b>swap</b> one thing <i>for</i> another. The writer means the wobbly bowl is worth more to them than a perfect one.</p><p class="why-not">You replace something <i>with</i> another and convert something <i>into</i> another, so “for” does not fit them. “Alter” means to change a thing a little, not to exchange it.</p>`),
    ],
  });

  /* ============ circle 1: story ============ */
  READING.push({
    id: "biscuit", tier: 1, format: "story", title: "Biscuit",
    note: "Read the story, then answer the questions.",
    html: `<p>The dog arrived in the middle of a thunderstorm, which Mum said was typical of uninvited guests. He was small, the colour of toast, and so wet that he seemed to be made mostly of ears. Arlo found him shivering under the carport and carried him inside wrapped in a beach towel.</p>
<p>“One night,” said Mum. “He belongs to somebody.”</p>
<p>By the third day the dog had a name, Biscuit, a bed made from a washing basket, and a habit of sleeping across Arlo’s feet. Arlo had also put up posters, because Mum made him. He drew them himself. The dog in his drawing was rather larger and fiercer than Biscuit, and the phone number was written in the smallest writing Arlo could manage.</p>
<p>On Saturday the phone rang anyway.</p>
<p>The woman who came to the door was older than Arlo’s grandmother and leaned on a stick. Before she could say a word, Biscuit shot between Arlo’s ankles, skidded on the tiles and flung himself at her knees, making a noise Arlo had never heard from him: a high, wobbling song.</p>
<p>“Pepper,” the woman said. That was all. She lowered herself onto the front step, not seeming to notice that it was still damp, and the dog climbed into her lap as if he were pouring himself into a bowl.</p>
<p>Arlo looked at his own feet. They felt strangely light.</p>
<p>“He likes his ears rubbed,” he said at last. “Sort of backwards. And he’s scared of the vacuum cleaner.”</p>
<p>“He always was,” said the woman, and she smiled at Arlo for the first time. “You’ve looked after him beautifully. I can see that.” She glanced at the washing basket in the hall, then back at him. “I’m only two streets away, you know. Pepper needs walking every afternoon, and my legs aren’t what they were.”</p>
<p>Arlo went to find the lead before she had finished the sentence.</p>`,
    questions: [
      { id: "r2a", cat: "Purpose of a detail", stem: `<p>On Arlo’s posters the dog was “<b>larger and fiercer than Biscuit</b>” and the phone number was in “<b>the smallest writing Arlo could manage</b>”. What do these details show?</p>`,
        options: ["Arlo was not very good at drawing dogs.", "Arlo did not really want the owner to ring.", "Arlo wanted to finish the posters quickly.", "Arlo thought a fierce dog would be noticed."], answer: 1,
        explain: `<p>A picture that doesn’t look like the dog and a number that is hard to read make a poster that is unlikely to work. Arlo did as he was told, but in a way that gave him the best chance of keeping Biscuit: <b>he didn’t want the owner to ring</b>.</p><p class="why-not">The tiny phone number can’t be explained by bad drawing or by hurrying: he made it small on purpose (“the smallest … he could manage”). Wanting the poster noticed is the opposite of what he was up to.</p>` },
      { id: "r2b", cat: "Vocabulary & idioms", stem: `<p>“On Saturday the phone rang <b>anyway</b>.” What does the word “anyway” tell us?</p>`,
        options: ["The telephone often rang on Saturdays.", "Mum had telephoned the owner herself.", "Arlo had been hoping all week that it would ring.", "The call came in spite of what Arlo had done."], answer: 3,
        explain: `<p>“Anyway” means “even so”. Arlo had made the posters as unhelpful as he could, and the owner still found the dog: the call came <b>in spite of</b> what he had done.</p><p class="why-not">Nothing says Mum rang anyone or that Saturdays were busy. Arlo was hoping for the opposite: that the phone would stay silent.</p>` },
      { id: "r2c", cat: "Feelings & inference", stem: `<p>“Arlo looked at his own feet. <b>They felt strangely light.</b>” Why does the writer tell us this?</p>`,
        options: ["Arlo is relieved that the dog has found its owner.", "Arlo has been standing still for too long.", "Arlo already misses the dog that slept on them.", "Arlo wants to run after the old woman."], answer: 2,
        explain: `<p>Earlier we were told the dog had “a habit of sleeping across Arlo’s feet”. Now the dog is in someone else’s lap, and Arlo notices the weight that is gone. The writer shows us he <b>already misses the dog</b> without saying so.</p><p class="why-not">Arlo is not relieved: he tried to stop this happening. The woman has not gone anywhere, so there is nobody to run after.</p>` },
      { id: "r2d", cat: "Comparisons & imagery", stem: `<p>The dog climbed into the woman’s lap “<b>as if he were pouring himself into a bowl</b>”. What does this comparison suggest?</p>`,
        options: ["He settled there easily, as if he belonged.", "He was still dripping wet from the thunderstorm.", "He was hungry and hoping to be fed.", "He was too heavy for her to hold."], answer: 0,
        explain: `<p>Something poured into a bowl flows in and fills the space exactly. The dog fits her lap in the same easy, complete way: this is <b>where he belongs</b>.</p><p class="why-not">The storm was days ago, so he is not wet. The bowl is only a comparison: there is no food in the scene. Nothing suggests he is a burden to her.</p>` },
      { id: "r2e", cat: "Character & structure", stem: `<p>The story ends: “Arlo went to find the lead <b>before she had finished the sentence</b>.” What does this ending show?</p>`,
        options: ["Arlo wanted the woman to leave as quickly as possible.", "Arlo was doing only what Mum expected.", "Arlo wanted to prove the dog was his.", "Arlo understood her offer and leapt at it."], answer: 3,
        explain: `<p>The woman never actually asks. She mentions that she lives close, that the dog needs walking and that her legs are weak, and lets Arlo work it out. He does so at once, and fetching the lead is his “yes”: he <b>understood the offer and leapt at it</b>.</p><p class="why-not">He is not sending her away: the lead is for walks he will be taking. Mum plays no part in this moment, and Arlo has already accepted that the dog is hers by telling her how to look after him.</p>` },
    ],
  });

  /* ============ circle 1: missing sentences ============ */
  const BOWER_BANK = [
    "Although it is built from sticks, the bower is not a nest, and no eggs are ever laid in it.",
    "They steal the brightest pieces and carry them home to their own displays.",
    "This is why the female builds her nest high in a tree.",
    "He is not fussy about where the colour comes from.",
    "Another is that it matches the colour of the bird himself.",
    "The female studies the whole performance closely before making up her mind.",
  ];
  const bowerQ = (id, n, answer, explain) => ({ id, gap: n, cat: "Sentence links", stem: `<p>Which sentence fits <b>gap ${n}</b>? (Each sentence is used once only, and one is not used at all.)</p>`, options: BOWER_BANK, answer, explain });
  READING.push({
    id: "bower", tier: 1, format: "missing sentences", title: "The Bird That Collects Blue", bank: true,
    note: "Five sentences have been taken out of this article. Choose the sentence that fits each gap. There is one extra sentence that is not needed.",
    html: `<p>In the forests of eastern Australia lives a bird with an unusual hobby. The male satin bowerbird is a collector, and what he collects is anything blue. ${G(1)} Bottle tops, pegs, drinking straws, pen lids and parrot feathers are all carried off and arranged with great care.</p>
<p>The treasures are laid out in front of his bower, which he builds on the forest floor from hundreds of thin sticks. It has two curved walls standing side by side, with a narrow path between them. ${G(2)} It is more like a stage, built for one purpose only: to impress a visiting female.</p>
<p>When a female arrives, she steps into the path between the walls and watches. The male picks up his best blue objects one at a time, puffs out his feathers and dances, buzzing and whirring like a faulty machine. ${G(3)} If she is not impressed, she simply flies off to inspect the bower of a rival.</p>
<p>Competition between neighbours is fierce. A male with a fine collection must guard it, because other males will raid his bower the moment he leaves. ${G(4)} Some go further and wreck the walls as well, so the owner returns to a pile of sticks.</p>
<p>Nobody is certain why blue is the favourite colour. One idea is that blue things are rare in the forest, so a large collection proves that its owner is clever and hard-working. ${G(5)} Not every male is blue, though. A young male is green and brown, and needs about seven years to grow the glossy blue-black feathers of an adult. Until then he practises, building clumsy bowers that fall down and watching the older birds to see how it is done.</p>`,
    questions: [
      bowerQ("r3a", 1, 3, `<p>The sentence after the gap lists things from very different places: bottle tops, pegs, straws, feathers. That list is the proof of “<b>He is not fussy about where the colour comes from.</b>” “The colour” points back to “anything blue”.</p><p class="why-not">The sentences about the bower, the female and the thieves have nothing to refer to yet: none of them has been mentioned.</p>`),
      bowerQ("r3b", 2, 0, `<p>The walls and the path have just been described, and the next sentence says “It is more like a stage”. More like a stage than what? The missing sentence must say what the bower is <i>not</i>: “<b>Although it is built from sticks, the bower is not a nest…</b>”</p><p class="why-not">“This is why the female builds her nest high in a tree” is about nests too, but nothing before the gap gives a reason, and the “It” that follows would then mean her nest, not the bower.</p>`),
      bowerQ("r3c", 3, 5, `<p>The male has just danced, and the next sentence begins “If she is not impressed”. In between, we need the female judging him: “<b>The female studies the whole performance closely before making up her mind.</b>” “The whole performance” points back to the dance.</p><p class="why-not">The sentence about stealing starts with “They”, but only one male and one female are in this paragraph.</p>`),
      bowerQ("r3d", 4, 1, `<p>“Other males will raid his bower” needs to be followed by what the raiders do. “<b>They steal the brightest pieces…</b>” does that (“They” = the other males), and the next sentence builds on it: “Some go further and wreck the walls <i>as well</i>.”</p><p class="why-not">“As well” only makes sense if stealing has just been mentioned, so no other sentence can go here.</p>`),
      bowerQ("r3e", 5, 4, `<p>“<i>One</i> idea is…” sets up a second idea. “<b>Another is that it matches the colour of the bird himself</b>” supplies it, and leads on to “Not every male is blue, though.”</p><p class="why-not">The sentence left over is “This is why the female builds her nest high in a tree.” It is on the right subject, but nowhere in the article is there a reason for it to follow.</p>`),
    ],
  });

  /* ============ circle 2: poem ============ */
  READING.push({
    id: "scarecrow", tier: 2, format: "poem", title: "Scarecrow",
    note: "Read the poem, then answer the questions.",
    html: `<p class="poem">All summer he has held his arms out wide
as though the field were something he had caught.
His coat belonged to someone’s grandfather;
his hat has never had a single thought.

The crows were frightened for about a day.
Now two of them are sitting on his sleeve,
discussing, in their scratchy way, the weather,
and whether it is time for them to leave.

He does not mind. He has a painted smile
that rain has pulled a little to one side,
and when the wheat is cut and carted off
he goes on guarding nothing, satisfied.

The farmer will forget him until spring.
The frost will stitch white buttons on his chest.
And all the winter long, with patient arms,
he’ll welcome every bird that wants a rest.</p>`,
    questions: [
      { id: "r4a", cat: "Comparisons & imagery", stem: `<p>The scarecrow holds his arms out “<b>as though the field were something he had caught</b>”. What does this make him seem like?</p>`,
        options: ["someone proudly showing off a prize", "someone waving his arms for help", "someone chasing the birds away", "someone who is just about to fall over"], answer: 0,
        explain: `<p>People spread their arms wide to show how big their catch was. The poet pretends the scarecrow’s stiff, outstretched arms are doing the same thing, as if the whole field were <b>his prize</b>.</p><p class="why-not">He is not waving or chasing: he has held the same pose “all summer”. Nothing suggests he is falling.</p>` },
      { id: "r4b", cat: "Purpose of a detail", stem: `<p>Why does the poet say that the scarecrow’s hat “<b>has never had a single thought</b>”?</p>`,
        options: ["to show that the hat is brand new", "to suggest the grandfather was forgetful", "to remind us there is no real head inside it", "to show the scarecrow is bored out in the field"], answer: 2,
        explain: `<p>A hat sits on a head, and a head has thoughts. This hat never has, because there is <b>no real head under it</b>: only straw. It is a gentle joke that reminds us the scarecrow is not alive.</p><p class="why-not">The coat, not the hat, came from a grandfather, and old clothes are not “brand new”. A scarecrow with no thoughts cannot be bored.</p>` },
      { id: "r4c", cat: "Feelings & inference", stem: `<p>In the second verse, two crows sit on the scarecrow’s sleeve “<b>discussing … the weather</b>”. What does this show?</p>`,
        options: ["The crows are planning to steal the wheat.", "The crows are completely at ease with him.", "The crows feel sorry for the scarecrow.", "A storm is on its way to the farm."], answer: 1,
        explain: `<p>Chatting about the weather is what you do when you are relaxed. The crows were “frightened for about a day”, and now they use him as a seat: they are <b>completely at ease</b>.</p><p class="why-not">They are talking about leaving, not stealing. The poem gives the crows no pity for him, and “the weather” is just small talk, not a warning of a storm.</p>` },
      { id: "r4d", cat: "Comparisons & imagery", stem: `<p>“<b>The frost will stitch white buttons on his chest.</b>” What is the poet describing?</p>`,
        options: ["The farmer will mend the old coat during the winter.", "Snow will bury the scarecrow completely.", "Someone will dress him in a new shirt.", "Small white patches of frost will form on him."], answer: 3,
        explain: `<p>Frost can’t sew. The poet imagines it as a tailor, and the “white buttons” are the <b>small round patches of frost</b> that will appear on the front of his coat.</p><p class="why-not">The farmer “will forget him until spring”, so nobody is mending or dressing him. Buttons are small spots, not a covering of snow.</p>` },
      { id: "r4e", cat: "Main idea", stem: `<p>Think about the whole poem. By the end, what has the scarecrow become?</p>`,
        options: ["a failure that the farmer is ashamed of", "a frightening figure once winter arrives", "the opposite of what he was made to be", "a lonely figure who longs to leave the field"], answer: 2,
        explain: `<p>A scarecrow is made to scare birds away. This one frightens them “for about a day”, and the poem ends with him <i>welcoming</i> “every bird that wants a rest”. He has become <b>the opposite of what he was made to be</b>, and “he does not mind”.</p><p class="why-not">The farmer forgets him, which is not the same as being ashamed. He never becomes frightening again, and “patient arms” and a smile do not suggest longing to leave.</p>` },
    ],
  });

  /* ============ circle 2: four extracts ============ */
  const exQ = (id, cat, what, answer, explain) => ({ id, cat, stem: `<p>Which extract ${what}?</p>`, options: EX, answer, explain });
  READING.push({
    id: "trees", tier: 2, format: "four extracts", title: "Trees",
    note: "Read the four extracts about trees. For each question, choose the extract that fits best.",
    html: `<div class="extract"><b class="tag">Extract A</b><p>The mulberry tree in our backyard was older than the house, and my sisters and I treated it as an extra room. Each of us had her own branch. Mine was the third one up, worn smooth where I sat, and from it I could see over three fences to the railway line. In November we came down with purple hands, purple mouths and purple school shirts, and my mother would sigh and reach for the lemon juice. When the tree came down in a storm, years later, we stood about on the lawn as though someone had died. In a way, someone had.</p></div>
<div class="extract"><b class="tag">Extract B</b><p>A tree keeps a diary, although it has to be cut open before anyone can read it. In places with warm and cold seasons, a tree lays down a new layer of wood beneath its bark every year, and in a sawn trunk these layers show up as rings. Counting them gives the tree’s age. Their width tells a longer story: a broad ring records a year of good rain, while a narrow one marks a year of drought. Scientists no longer need to fell a tree to study it. They drill out a core of wood no thicker than a pencil, and the tree goes on growing.</p></div>
<div class="extract"><b class="tag">Extract C</b><p>“Twenty-nine, thirty. Ready or not!” Somewhere below, Dominic began crashing through the garden. Wren pressed herself against the trunk of the fig and tried to breathe more quietly. She had never climbed this high. The ground looked a long way down, and rather hard. Dominic checked the shed, the water tank and the wheelie bins. He stood directly beneath her, hands on hips, and announced to nobody that she must have gone home. Wren grinned. Then she looked for the branch she had used to get up, and found that, from above, every branch looked exactly the same.</p></div>
<div class="extract"><b class="tag">Extract D</b><p>The council plans to remove the plane trees from Station Street because their roots are lifting the footpath. I would ask the councillors to walk down that street at noon in January before they vote. Under the trees it is cool enough to stop and talk; beyond them, the pavement shimmers. A cracked footpath can be repaired in a week. A sixty-year-old tree cannot be replaced in a lifetime. By all means fix the path. But let us mend what is broken without destroying what is not.</p></div>`,
    questions: [
      exQ("r5a", "Feelings & inference", "shows somebody whose success leads straight to a new problem", 2, `<p>In <b>Extract C</b> Wren hides so well that Dominic gives up. She grins, and then finds she cannot tell which branch leads down. Winning the game is what has left her stuck.</p><p class="why-not">In D the problem (the footpath) has not been solved yet. The storm in A is a loss, not something caused by a success. B describes a method, not a person in trouble.</p>`),
      exQ("r5b", "Comparisons & imagery", "compares a natural thing to a written record", 1, `<p><b>Extract B</b> begins “A tree keeps a diary” and carries the idea on: the rings can be “read” and they “tell a longer story”. The rings are being compared to writing.</p><p class="why-not">Extract A compares the tree to “an extra room”, which is a place, not a record. C and D describe their trees plainly.</p>`),
      exQ("r5c", "Tone & attitude", "describes a loss that was felt like the loss of a person", 0, `<p>In <b>Extract A</b>, when the mulberry falls the family stands about “as though someone had died. In a way, someone had.” The tree had been part of the family.</p><p class="why-not">The writer of D fears losing trees, but they are still standing, and the argument is about shade, not grief. Nothing is lost in B or C.</p>`),
      exQ("r5d", "Main idea", "argues that one thing can be fixed without ruining another", 3, `<p><b>Extract D</b> ends: “let us mend what is broken without destroying what is not.” The writer wants the footpath repaired <i>and</i> the trees kept.</p><p class="why-not">Extract B also mentions not harming a tree, but it is explaining what scientists do, not arguing for what should be done.</p>`),
      exQ("r5e", "Purpose of a detail", "explains how something is now studied without being destroyed", 1, `<p><b>Extract B</b>: “Scientists no longer need to fell a tree to study it. They drill out a core of wood no thicker than a pencil, and the tree goes on growing.”</p><p class="why-not">Extract D is about saving trees too, but it is about a street, not about studying anything. A and C are a memory and a story.</p>`),
    ],
  });

  /* ============ circle 2: cloze ============ */
  READING.push({
    id: "stamps", tier: 2, format: "cloze", title: "The Stamp Album",
    note: "Some words are missing from this piece. Choose the word that fits each gap best.",
    html: `<p>When my grandfather died he left me his stamp album, a fat green book that smelled of dust and peppermints. I am ${G(1)} to say that I was not at all grateful. I was eleven, and I had been hoping for his telescope.</p>
<p>For months the album sat ${G(2)} on my shelf. Then, one wet Sunday, with nothing better to do, I opened it. Every page was ruled in pencil, and every stamp sat squarely in its place above a line of tiny, careful handwriting: the country, the year, and often a note about how he had ${G(3)} it. “Swapped with a sailor, 1958.” “From Aunt Vera’s letter, the one with the bad news.”</p>
<p>I had assumed that a collection was simply a heap of things. This was a life, sorted and labelled. I turned the pages more and more slowly, ${G(4)} to reach the end.</p>
<p>On the last page there were six empty squares, and a line in his handwriting that I have never forgotten: “For whoever comes next.” I went out the following Saturday and bought my first stamp. It was a common one, worth almost nothing, but I ruled the line beneath it as ${G(5)} as I could.</p>`,
    questions: [
      gapQ("r6a", 1, ["ashamed", "embarrassing", "guilty", "shy"], 0, `<p>“I am <b>ashamed</b> to say” is the set phrase for admitting something you are not proud of.</p><p class="why-not">“Embarrassing” describes a thing, not a person’s feeling: the writer would be <i>embarrassed</i>. “Guilty” and “shy” are not followed by “to say”.</p>`),
      gapQ("r6b", 2, ["unaware", "unharmed", "untouched", "unknown"], 2, `<p>Nobody opened the album for months: it sat <b>untouched</b>.</p><p class="why-not">“Unaware” describes a person who does not know something, not a book. “Unharmed” would mean something had threatened it. “Unknown” is wrong because the writer knew exactly where it was.</p>`),
      gapQ("r6c", 3, ["required", "acquired", "inquired", "achieved"], 1, `<p>To <b>acquire</b> something is to come to own it. The notes say how each stamp was got: swapped, or taken from a letter.</p><p class="why-not">The look-alikes mean different things: “required” is needed and “inquired” is asked. You achieve a goal, not an object.</p>`),
      gapQ("r6d", 4, ["impatient", "resistant", "incapable", "reluctant"], 3, `<p>The writer turns the pages “more and more slowly”. You slow down when you do not want something to finish: <b>reluctant</b> to reach the end.</p><p class="why-not">“Impatient to reach the end” is good English, but an impatient reader speeds up. “Resistant” is followed by “to” and a thing (resistant to change), and “incapable” by “of”.</p>`),
      gapQ("r6e", 5, ["quickly", "carefully", "cheaply", "boldly"], 1, `<p>Look back at how the grandfather worked: every page “ruled in pencil”, with “tiny, careful handwriting”. The writer has taken up his place (“whoever comes next”) and copies his way of doing things: as <b>carefully</b> as possible.</p><p class="why-not">The stamp was cheap, but a line can’t be ruled “cheaply”. “Quickly” and “boldly” are the opposite of the patient, exact work the album has taught the writer to admire.</p>`),
    ],
  });

  /* ============ circle 3: story ============ */
  READING.push({
    id: "volcano", tier: 3, format: "story", title: "The Science Fair",
    note: "Read the story, then answer the questions.",
    html: `<p>Hamid had built the volcano over three weekends, and it was magnificent. It stood knee-high on its plywood base, with papier-mâché ridges, a crater ringed in orange paint, and a tiny village of matchbox houses that he privately looked forward to destroying.</p>
<p>At the next table, Clementine Park had a row of bean plants in jam jars and a poster with a great deal of writing on it. Hamid had glanced at it once, in the way you might glance at a bus timetable for a town you never intend to visit.</p>
<p>The judges reached him at half past two. There were three of them, with clipboards.</p>
<p>“Whenever you’re ready,” said the tallest.</p>
<p>Hamid tipped in the vinegar. For one glorious second the crater hissed. Then a single orange bubble rose to the rim, considered the view, and sank. Nothing else happened. The matchbox village stood unharmed in the sunshine.</p>
<p>“Ah,” said the tallest judge, and wrote something short.</p>
<p>Hamid kept his eyes on the plywood. He was aware of his ears, which seemed to have grown.</p>
<p>“Is it the bicarb?” said a voice. Clementine was leaning over from her table, frowning at the crater the way a mechanic frowns at an engine. “If it gets damp it goes flat. Mine’s new. I used it for the soil test.” She was already holding out a paper cup.</p>
<p>The judges had moved on to her beans and were waiting, pens raised. Clementine did not appear to have noticed.</p>
<p>Hamid looked at the cup, and at the long poster she had clearly written herself, every line of it, and at the judges standing in front of an empty chair.</p>
<p>“They’re waiting for you,” he said.</p>
<p>“They can wait a minute,” said Clementine. “Go on. Two spoonfuls.”</p>
<p>The eruption, when it came, was everything he had hoped for. Orange foam swallowed the village whole. But the judges had their backs to it, and Hamid found that he did not much mind. He was reading, from the top, a poster about beans.</p>`,
    questions: [
      { id: "r7a", cat: "Comparisons & imagery", stem: `<p>Hamid glanced at Clementine’s poster “<b>in the way you might glance at a bus timetable for a town you never intend to visit</b>”. What does this tell us?</p>`,
        options: ["He found the poster too hard to understand.", "He thought her project had nothing to do with him.", "He was planning to read it properly later that day.", "He was worried that it was better than his."], answer: 1,
        explain: `<p>A timetable for a town you will never visit is of no use to you, so you barely look. Hamid gives the poster the same quick, uninterested glance: he thinks her project <b>has nothing to do with him</b>.</p><p class="why-not">He doesn’t read enough of it to find it hard, and “never intend to visit” rules out coming back later. He thinks his volcano is “magnificent”, so he isn’t worried.</p>` },
      { id: "r7b", cat: "Tone & attitude", stem: `<p>“Then a single orange bubble rose to the rim, <b>considered the view</b>, and sank.” Why does the writer describe the bubble like this?</p>`,
        options: ["to show that the eruption was just beginning", "to suggest that Hamid was not watching closely", "to show the vinegar was the wrong colour", "to make the failure seem slow and rather comic"], answer: 3,
        explain: `<p>The bubble is described like a person strolling up for a look and wandering off. After three weekends of work, one unhurried bubble is all Hamid gets. The joke makes the moment <b>slow and comic</b>, and shows just how little happened.</p><p class="why-not">The next sentence is “Nothing else happened”, so nothing is beginning. Hamid is watching every second. The colour of the bubble is not what goes wrong.</p>` },
      { id: "r7c", cat: "Feelings & inference", stem: `<p>“He was aware of his ears, <b>which seemed to have grown</b>.” What is Hamid feeling?</p>`,
        options: ["hot with embarrassment", "angry with Clementine", "proud of having tried", "eager to hear the judges"], answer: 0,
        explain: `<p>When you are embarrassed your ears burn and feel huge, as if everyone must be staring at them. Hamid won’t look up (“kept his eyes on the plywood”): he is <b>hot with embarrassment</b>.</p><p class="why-not">Clementine has not spoken yet, so he can’t be angry with her. He is hiding from the judges, not straining to hear them, and there is no pride in this moment.</p>` },
      { id: "r7d", cat: "Purpose of a detail", stem: `<p>The writer tells us that the judges “<b>were waiting, pens raised</b>” at Clementine’s table and that she “<b>did not appear to have noticed</b>”. Why are these details included?</p>`,
        options: ["to show that the judges were impatient people", "to show that Clementine was nervous about being judged", "to show that helping Hamid might cost her something", "to show that she did not care about her own project"], answer: 2,
        explain: `<p>Her own judging has begun and she is not there, because she is busy with his crater. The detail shows that her help is not free: <b>it could cost her</b> marks. That is what makes it generous.</p><p class="why-not">She did the soil test and wrote the whole poster herself, so she plainly cares about her project. Nothing shows nerves, and the judges are simply waiting, not complaining.</p>` },
      { id: "r7e", cat: "Character & structure", stem: `<p>At the end, the judges miss the eruption, yet Hamid “<b>did not much mind. He was reading, from the top, a poster about beans.</b>” What has changed in Hamid?</p>`,
        options: ["He has decided that volcanoes are childish.", "He has stopped caring about science altogether.", "He now thinks Clementine’s work deserves his attention.", "He wants to copy her idea for next year’s science fair."], answer: 2,
        explain: `<p>At the start he gave her poster one bored glance. Now he reads it “from the top”: all of it, properly. Her kindness has made him see her, and her work, as <b>worth his attention</b>, and that matters more to him than being watched by the judges.</p><p class="why-not">The eruption “was everything he had hoped for”, so he still loves his volcano. Reading a science poster is the opposite of giving up on science, and nothing suggests copying.</p>` },
    ],
  });

  /* ============ circle 3: four extracts ============ */
  READING.push({
    id: "snow", tier: 3, format: "four extracts", title: "Snow",
    note: "Read the four extracts about snow. For each question, choose the extract that fits best.",
    html: `<div class="extract"><b class="tag">Extract A</b><p>I grew up in Darwin, where winter means a dry breeze and a cardigan you never quite need. So when my aunt in Canada pulled back the curtains on my first morning there, I did not at first understand what I was looking at. The street had been rubbed out. Cars had become soft white loaves, and the fence wore a tall hat on every post. What struck me most was the quiet. I had expected snow to be cold. Nobody had warned me that it would also turn the volume of the whole world down.</p></div>
<div class="extract"><b class="tag">Extract B</b><p>Every snowflake begins as a speck of dust high in a cloud. Water vapour freezes onto it, forming a tiny six-sided crystal, and as the crystal tumbles through the cloud its six arms grow. Because all six pass through the same patches of colder, warmer, wetter and drier air, they grow in the same way, which is why a snowflake looks so perfectly balanced. No two flakes take quite the same path, however. This is the reason usually given for the old saying that no two snowflakes are alike. In 1885 an American farmer named Wilson Bentley became the first person to photograph a single snow crystal, and he went on to capture more than five thousand of them.</p></div>
<div class="extract"><b class="tag">Extract C</b><p>The sled had belonged to Per’s father, and to his grandfather before that, and it showed. One runner was held on with wire. “It’s faster than it looks,” Per said, which was what his father always said. Ingrid, who owned a new plastic one in a shade called Arctic Lime, was kind enough not to reply. They dragged both sleds to the top of Miller’s Hill. Halfway down, the plastic sled hit a buried root and stopped dead. The old one did not so much as shudder. It carried Per on, past the gate, past the frozen trough, and very nearly into the next farm.</p></div>
<div class="extract"><b class="tag">Extract D</b><p>Our ski resorts now make much of their own snow, pumping water uphill and spraying it from cannons whenever the weather lets them down. I understand why. A resort without snow is a car park with a view, and whole towns depend on the visitors. But each machine swallows water and electricity in quantities that ought to trouble us, particularly in a dry country. If winters are growing shorter, the honest response is to ask what else these mountains might offer, in every season, rather than to keep painting the slopes white and hoping nobody looks too closely.</p></div>`,
    questions: [
      exQ("r8a", "Main idea", "describes something that proved to be better than it looked", 2, `<p>In <b>Extract C</b> the old sled is held together with wire, and the new plastic one looks far smarter. On the hill it is the old sled that sails on “very nearly into the next farm”.</p><p class="why-not">In A the snow is a surprise, but the writer never thought it looked poor. D argues that artificial snow is <i>worse</i> than it looks, which is the reverse.</p>`),
      exQ("r8b", "Purpose of a detail", "explains why something has such a regular shape", 1, `<p><b>Extract B</b> gives the reason for a snowflake’s balance: all six arms pass through the same air, so “they grow in the same way, which is why a snowflake looks so perfectly balanced”.</p><p class="why-not">Extract A describes shapes too (loaves, hats), but only to show what the street looked like. It doesn’t explain anything.</p>`),
      exQ("r8c", "Feelings & inference", "describes being struck by something the writer had not been told to expect", 0, `<p>In <b>Extract A</b> the writer “had expected snow to be cold”, but “Nobody had warned me” about the quiet. The silence is the surprise.</p><p class="why-not">In C the sled’s speed is exactly what Per said it would be. B and D explain and argue: neither describes a surprise.</p>`),
      exQ("r8d", "Tone & attitude", "suggests that people are avoiding an uncomfortable truth", 3, `<p><b>Extract D</b> calls for “the honest response” and accuses resorts of “painting the slopes white and hoping nobody looks too closely”. The writer thinks they would rather cover up shorter winters than face them.</p><p class="why-not">Ingrid in C keeps quiet about the sled, but that is politeness to a friend, and she turns out to be wrong. No truth is being hidden in A or B.</p>`),
      exQ("r8e", "Feelings & inference", "shows one person choosing not to hurt another’s feelings", 2, `<p>In <b>Extract C</b>, when Per claims his battered sled is fast, Ingrid “was kind enough not to reply”. She doesn’t believe him, and she keeps that to herself.</p><p class="why-not">The writer of D says “I understand why”, but that is being fair in an argument, not sparing someone’s feelings. The aunt in A simply opens the curtains.</p>`),
    ],
  });
})();
