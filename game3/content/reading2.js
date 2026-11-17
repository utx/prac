/* ---------------------------------------------------------------
   STORM ISLAND: second set of reading passages (Nov 2026), all original.
   cloze ×2, story ×2, missing sentences, poem, four extracts ×2.
   tier 1–3 = storm circle 1–3.
   --------------------------------------------------------------- */
(() => {
  const G = n => `<span data-g="${n}" class="gap">(${n}) ______</span>`;
  const gapQ = (id, n, options, answer, explain) => ({ id, gap: n, cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap ${n}</b>?</p>`, options, answer, explain });
  const EX = ["Extract A", "Extract B", "Extract C", "Extract D"];
  const exQ = (id, cat, what, answer, explain) => ({ id, cat, stem: `<p>Which extract ${what}?</p>`, options: EX, answer, explain });

  /* ============ circle 1: cloze ============ */
  READING.push({
    id: "kayak", tier: 1, format: "cloze", title: "First Strokes",
    note: "Some words are missing from this piece about a first kayaking lesson. Choose the word that fits each gap best.",
    html: `<p>The kayak looked far too narrow to hold a person, let alone a nervous one. Our instructor, Bree, assured us that capsizing on a lake this calm was almost unheard ${G(1)}, which did little to settle my stomach.</p>
<p>Getting in was an ordeal in ${G(2)}. I lowered myself from the jetty with all the grace of a sack of potatoes, and the boat lurched so violently that Bree had to grab the rope. Once I was seated, though, it steadied, and she showed us how to ${G(3)} the paddle: one blade dips in on the left, then the other on the right, in a steady rhythm like a slow clock.</p>
<p>For the first ten minutes I went mostly in circles. My left arm, it seemed, was a good deal stronger than my right, and the kayak ${G(4)} its nose towards the bank every time I stopped concentrating.</p>
<p>Gradually, however, the strokes began to feel less like a battle and more like a conversation with the water. By the time we reached the far end of the lake, I was gliding past reeds and ducks with what I hoped was an ${G(5)} of calm.</p>
<p>On the way back, a gust of wind sent a small wave over the front of the kayak and straight into my lap. An hour earlier, that would have been the ${G(6)} of my worst fears. Instead, I laughed, shook the water off my hands and kept paddling.</p>`,
    questions: [
      gapQ("r9a", 1, ["of", "for", "about", "from"], 0, `<p>“<b>Unheard of</b>” is a fixed phrase meaning “almost never happens”.</p><p class="why-not">You can hear <i>about</i> or <i>from</i> someone, but the set phrase is only ever “unheard of”. “Unheard for” is not English.</p>`),
      gapQ("r9b", 2, ["turn", "itself", "short", "part"], 1, `<p>“An ordeal <b>in itself</b>” means that this one step was already a big struggle, before the paddling even began.</p><p class="why-not">“In turn”, “in short” and “in part” are real phrases, but they mean “one after another”, “to sum up” and “partly”, which don’t fit here.</p>`),
      gapQ("r9c", 3, ["store", "carry", "wield", "lift"], 2, `<p>The rest of the sentence explains how to <i>use</i> the paddle, stroke by stroke. To <b>wield</b> something is to hold and use a tool with skill.</p><p class="why-not">“Store”, “carry” and “lift” are all things you can do with a paddle, but they are about putting it away or moving it, not paddling with it.</p>`),
      gapQ("r9d", 4, ["drifted", "leaned", "swerved", "swung"], 3, `<p>The gap is followed by “its nose”: the word must be able to take an object. The kayak <b>swung</b> its nose towards the bank.</p><p class="why-not">A boat can drift, lean or swerve towards the bank, but it can’t “drift its nose” or “swerve its nose”. Those words don’t take an object.</p>`),
      gapQ("r9e", 5, ["air", "ounce", "echo", "order"], 0, `<p>“An <b>air</b> of calm” means looking calm on the outside. The writer only “hoped” they looked calm, which fits.</p><p class="why-not">“An ounce of calm” would mean only a tiny bit of calm, the opposite of gliding along smoothly. “An echo of calm” and “an order of calm” don’t make sense.</p>`),
      gapQ("r9f", 6, ["reason", "realisation", "recollection", "reminder"], 1, `<p>Think about the whole passage. The writer started out terrified of tipping over and getting wet. A wave in the lap would once have been their worst fears coming true: the <b>realisation</b> of their worst fears.</p><p class="why-not">You have a reason <i>for</i> a fear, not “of” it. A recollection or a reminder of a fear would be a memory of it, not the fear actually happening.</p>`),
    ],
  });

  /* ============ circle 1: story ============ */
  READING.push({
    id: "dumplings", tier: 1, format: "story", title: "The Recipe Card",
    note: "Read the story, then answer the questions.",
    html: `<p>The card lived in the kitchen drawer, under the takeaway menus. Its corners were as soft as felt, and Po Po’s handwriting sloped across it like a row of birds leaning into the wind. Halfway down, a brown splash had swallowed two whole lines.</p>
<p>“Dumplings,” said Lin, holding it up. “For Mum’s birthday. I can do it.”</p>
<p>Dad looked at the card, then at the kitchen, which he had cleaned that morning. “Of course you can,” he said, in the voice he used at the dentist.</p>
<p>The dough was easy. The filling was not. Where the splash began, the card said “one spoon of” and then nothing at all. Lin stared at it for a long time. Then she shut her eyes and tried to remember Po Po’s kitchen: the steam on the window, the radio muttering, the small dish of dark sauce that always stood by the chopping board.</p>
<p>“Soy sauce,” she said. “And something else. Something that smelt like toasted nuts.”</p>
<p>Dad suggested pepper. Lin shook her head. She opened the spice cupboard and unscrewed the lids one at a time, sniffing, until she found it at the very back: a bottle of sesame oil with a faded label in Po Po’s writing.</p>
<p>The first dumplings came out lopsided, like boats that had lost an argument with a wave. By the twentieth, Lin’s fingers had found the folds on their own.</p>
<p>At dinner Mum bit into one and went very still. She put her chopsticks down.</p>
<p>“Is it too salty?” Lin asked.</p>
<p>Mum shook her head. She didn’t seem able to say anything, so she reached across the table and squeezed Lin’s hand instead.</p>
<p>Later, while Dad washed up, Lin took a pencil and, in her own careful printing, filled in the two missing lines.</p>`,
    questions: [
      { id: "r10a", cat: "Purpose of a detail", stem: `<p>The card’s corners were “<b>as soft as felt</b>”. What does this detail suggest?</p>`,
        options: ["It had been made out of cloth.", "Lin was holding it far too tightly.", "It had been used many times over the years.", "It had been left out in the rain on the back step."], answer: 2,
        explain: `<p>Card goes soft at the corners when it has been picked up and handled again and again. The detail tells us the recipe was <b>used many times</b>, so it mattered to the family.</p><p class="why-not">“As soft as felt” is a comparison: the card isn’t made of cloth. The brown splash shows one spill, not rain, and Lin has only just picked it up.</p>` },
      { id: "r10b", cat: "Feelings & inference", stem: `<p>Dad says “Of course you can” “<b>in the voice he used at the dentist</b>”. What does this show?</p>`,
        options: ["He was annoyed about the mess she would make.", "He was trying to sound braver than he felt.", "He did not hear what Lin had asked him.", "He was speaking quietly so Mum would not hear."], answer: 1,
        explain: `<p>At the dentist people put on a calm, cheerful voice to hide that they are worried. Dad glances at his clean kitchen and says yes, but he is <b>hiding his worry</b>.</p><p class="why-not">He is a little worried about the mess, but he isn’t annoyed: he still says yes. He clearly heard her, and nothing suggests he is whispering.</p>` },
      { id: "r10c", cat: "Character & structure", stem: `<p>How does Lin work out what was in the missing lines?</p>`,
        options: ["She remembers Po Po’s kitchen and hunts for the smell.", "She follows Dad’s suggestion about the pepper.", "She reads the label on the bottle of sesame oil.", "She works it out from the shape and colour of the brown splash."], answer: 0,
        explain: `<p>Lin shuts her eyes and <b>remembers</b> the sauce and the smell of Po Po’s cooking, then sniffs each jar until she finds the one that matches.</p><p class="why-not">She turns down Dad’s pepper. She only sees the label after she has found the right smell. The splash hides the words; it doesn’t give them away.</p>` },
      { id: "r10d", cat: "Comparisons & imagery", stem: `<p>The first dumplings were “<b>like boats that had lost an argument with a wave</b>”. What does this comparison suggest?</p>`,
        options: ["They were sinking in the boiling water.", "They were bent and knocked out of shape.", "They were too big to fit in the pot.", "They floated to the top when they were cooked."], answer: 1,
        explain: `<p>A boat that has “lost” to a wave has been battered and tipped over. The first dumplings were <b>lopsided and out of shape</b>, and the funny comparison shows Lin isn’t upset about it.</p><p class="why-not">The comparison is about their shape, not about water: nothing is sinking or floating, and nothing is said about their size.</p>` },
      { id: "r10e", cat: "Character & structure", stem: `<p>At the end, Lin fills in the two missing lines “<b>in her own careful printing</b>”. What does this show?</p>`,
        options: ["She wants to correct Po Po’s mistakes.", "She is practising her handwriting for school.", "She plans to give the card to Mum as a birthday present.", "She now knows the recipe and is keeping it alive."], answer: 3,
        explain: `<p>Lin has rediscovered the lost part of the recipe, and Mum’s reaction shows how much it means. By writing it in, <b>she keeps the family recipe going</b> for the future, in her own hand beside Po Po’s.</p><p class="why-not">The lines weren’t mistakes: they had been splashed away. Nothing mentions school, and the card goes back to being used, not given away.</p>` },
    ],
  });

  /* ============ circle 1: missing sentences ============ */
  const ECH = [
    "About ten days later, the egg hatches.",
    "Instead, an echidna has a long, sticky tongue.",
    "It is one of only two kinds of mammal in the world that lay eggs.",
    "Many people mistake the echidna for a porcupine.",
    "Spines, as you can imagine, are not something a mother wants in her pouch.",
    "Underneath them grows a coat of ordinary fur, which keeps the animal warm.",
  ];
  const echQ = (id, n, answer, explain) => ({ id, gap: n, cat: "Sentence links", stem: `<p>Which sentence fits <b>gap ${n}</b>? (Each sentence is used once only, and one is not used at all.)</p>`, options: ECH, answer, explain });
  READING.push({
    id: "echidna", tier: 1, format: "missing sentences", title: "Spines, Eggs and a Very Long Tongue", bank: true,
    note: "Five sentences have been taken out of this article. Choose the sentence that fits each gap. There is one extra sentence that is not needed.",
    html: `<p>Australia is full of strange animals, but the short-beaked echidna may be the strangest of all. It looks like a cross between a hedgehog and an anteater, yet it is closely related to neither. ${G(1)} The only other member of that very small club is the platypus.</p>
<p>An echidna’s spines are actually hairs, thickened and hardened over millions of years. ${G(2)} When it is frightened, an echidna does not run away. It digs straight down into the soil, leaving only a patch of spiky back showing, and clings on so tightly that a hungry fox can do nothing but give up.</p>
<p>Echidnas have no teeth, and they do not need any. ${G(3)} It flicks in and out of an ant nest, collecting ants and termites, which the echidna then crushes between hard pads in its mouth.</p>
<p>Raising a family is just as unusual. The female lays a single soft egg, about the size of a grape, and rolls it into a pouch on her belly. ${G(4)} The baby, which is called a puggle, is pink, blind and no bigger than a jelly bean. It stays in the pouch, drinking milk, until its spines begin to grow.</p>
<p>${G(5)} At that point the mother digs a burrow, tucks the puggle inside and goes off to feed, returning only every few days.</p>`,
    questions: [
      echQ("r11a", 1, 2, `<p>The next sentence talks about “that very small club” and says its only other member is the platypus. The gap must name the club: <b>mammals that lay eggs</b>.</p><p class="why-not">The porcupine sentence is about the right animal, but it gives no “club” for the platypus to belong to.</p>`),
      echQ("r11b", 2, 5, `<p>The sentence before says the spines are really hairs. “<b>Underneath them</b>” points back to the spines and adds more about the echidna’s coat.</p><p class="why-not">“Spines … are not something a mother wants in her pouch” is about spines too, but it belongs with the baby, not here: there is no pouch yet in this paragraph.</p>`),
      echQ("r11c", 3, 1, `<p>“They do not need any [teeth].” The next word must say what it uses <b>instead</b>, and the sentence after the gap begins “It flicks in and out”: “It” is the tongue.</p><p class="why-not">No other sentence explains what “It” is, or what the echidna eats with.</p>`),
      echQ("r11d", 4, 0, `<p>The egg has just gone into the pouch, and the next sentence introduces “The baby”. In between, the egg must hatch: “<b>About ten days later, the egg hatches.</b>”</p><p class="why-not">Without this sentence, a baby would suddenly appear from nowhere.</p>`),
      echQ("r11e", 5, 4, `<p>The puggle stays in the pouch until its spines grow, and the next sentence says “At that point” the mother puts it in a burrow. The joke about <b>spines in a pouch</b> explains why: that point is when the spines arrive.</p><p class="why-not">The sentence left over, about people mistaking the echidna for a porcupine, is on topic but has nothing to link it to any gap.</p>`),
    ],
  });

  /* ============ circle 2: poem ============ */
  READING.push({
    id: "puddle", tier: 2, format: "poem", title: "Puddle",
    note: "Read the poem, then answer the questions.",
    html: `<p class="poem">The storm has gone, but left a piece of sky
set like a small blue window in the road.
Clouds walk across it slowly, upside down,
and a gull goes flying underneath the ground.

The puddle holds the whole tall world quite still:
the lamp post, leaning, and the gutter’s edge,
the red front door of number twenty-three,
my face, surprised, looking up at me.

Then Billy’s boots come thundering down the hill.
The sky breaks into fifty shaking parts,
the lamp post wobbles like a jelly mould,
and number twenty-three goes swimming off.

I wait. The pieces wander, find their places,
the edges knit together, smooth and slow,
and quietly, as if nothing had happened,
the puddle puts the sky back where it goes.</p>`,
    questions: [
      { id: "r12a", cat: "Comparisons & imagery", stem: `<p>What is the “<b>small blue window in the road</b>”?</p>`,
        options: ["a drain cover in the middle of the road", "the sky reflected in the puddle", "a piece of broken glass on the street", "a patch of blue paint on the road"], answer: 1,
        explain: `<p>The storm has “left a piece of sky” in the road. A puddle on a clear day <b>reflects the blue sky</b>, so it looks like a window you could see through.</p><p class="why-not">The poem is about the puddle all the way through. Nothing mentions a drain, glass or paint: “window” is a comparison.</p>` },
      { id: "r12b", cat: "Purpose of a detail", stem: `<p>Why does the poet say “a gull goes flying <b>underneath the ground</b>”?</p>`,
        options: ["The gull is diving into a drain.", "The gull is flying very low over the road after the storm.", "The gull’s reflection appears below the puddle’s surface.", "The gull is hiding from the storm."], answer: 2,
        explain: `<p>In a reflection, things in the sky appear <i>down</i> in the puddle. The gull’s <b>reflection</b> seems to fly below the road. That is also why the clouds walk “upside down”.</p><p class="why-not">A gull flying low would still be above the ground, and the storm is over. Nothing suggests a drain.</p>` },
      { id: "r12c", cat: "Character & structure", stem: `<p>In the second verse, where is the speaker and what are they doing?</p>`,
        options: ["Standing at the red door of number twenty-three", "Lying on the road, looking up at the sky", "Watching the street from an upstairs window", "Looking down into the puddle at the reflections"], answer: 3,
        explain: `<p>Everything in this verse is seen <i>in</i> the puddle, ending with “my face … looking up at me”. The speaker is <b>bending over the puddle</b>, seeing their own reflection look back.</p><p class="why-not">The red door is one of the reflections, not where the speaker stands. Their face looks <i>up</i> from the puddle, so they are looking down, not lying on the road or watching from a window.</p>` },
      { id: "r12d", cat: "Comparisons & imagery", stem: `<p>“<b>the lamp post wobbles like a jelly mould, / and number twenty-three goes swimming off</b>”. What is happening?</p>`,
        options: ["Billy’s splash makes the reflections shake and slide.", "Billy knocks over the lamp post as he runs.", "The storm starts again and floods the street.", "Billy’s heavy boots shake the houses all along the street."], answer: 0,
        explain: `<p>Billy runs through the puddle and the water ripples. The <b>reflections</b> of the lamp post and the house shake and slide about. The real ones don’t move at all.</p><p class="why-not">These lines are still about what the puddle shows. A splash can’t knock down a lamp post or shake a house, and the storm has gone.</p>` },
      { id: "r12e", cat: "Main idea", stem: `<p>What does the last verse suggest about the puddle?</p>`,
        options: ["It dries up once the sun comes out.", "It is angry with Billy for splashing through it so hard.", "It shows a different sky from before.", "It calmly mends itself, as if nothing happened."], answer: 3,
        explain: `<p>The pieces “find their places”, the edges “knit together”, and the puddle puts the sky back “quietly, as if nothing had happened”. The puddle <b>calmly repairs</b> the picture.</p><p class="why-not">The puddle is given human actions, but they are calm, not angry. It puts the same sky back “where it goes”, and nothing dries up.</p>` },
    ],
  });

  /* ============ circle 2: four extracts ============ */
  READING.push({
    id: "gardens", tier: 2, format: "four extracts", title: "Gardens",
    note: "Read the four extracts about gardens. For each question, choose the extract that fits best.",
    html: `<div class="extract"><b class="tag">Extract A</b><p>My grandfather talked to his tomatoes. Every evening he walked along the row with the hose, telling each plant about his day, and every evening I hid behind the shed in case the neighbours heard. He said the plants liked the company. I said plants couldn’t hear. He just smiled and kept watering. He has been gone four years now, and my own tomatoes are doing well this summer. I have not told anyone why I go out to water them so late, when the street is quiet.</p></div>
<div class="extract"><b class="tag">Extract B</b><p>A healthy garden depends on workers that no one ever sees. Earthworms tunnel through the soil, letting in air and water, and they drag fallen leaves underground, where the leaves rot and feed the plants. A worm has no lungs; it breathes through its damp skin, which may be why worms come up when heavy rain fills their tunnels. The naturalist Charles Darwin was so impressed by worms that he studied them for many years, and his very last book, published in 1881, was about them.</p></div>
<div class="extract"><b class="tag">Extract C</b><p>Every child in the class had planted a bean in a paper cup. By the second week, the windowsill was a forest of green shoots. Only Nora’s cup showed bare, brown soil. She watered it every morning anyway, and when Jack asked if she had forgotten to put a bean in, she said, “It’s thinking.” On the last day of term, when everyone else was carrying their plants home, a pale green loop pushed up through the soil, as if it had just remembered something.</p></div>
<div class="extract"><b class="tag">Extract D</b><p>Every primary school should give up a strip of its playground to a vegetable garden. Children who grow carrots tend to eat them; children who only see carrots on a plate often push them aside. A garden also teaches what no worksheet can: that some things cannot be hurried, and that looking after something is a job you do every day, not only when you feel like it. The cost is small. A few raised beds, some seeds and a tap are all it takes.</p></div>`,
    questions: [
      exQ("r13a", "Feelings & inference", "shows someone now doing something they were once embarrassed by", 0, `<p>In <b>Extract A</b> the writer used to hide behind the shed when Grandfather talked to his plants. Now they water their own tomatoes “so late, when the street is quiet”, and won’t say why: they have started talking to them too.</p><p class="why-not">Nora in C does something odd, but she is never embarrassed by it. B and D explain and argue.</p>`),
      exQ("r13b", "Main idea", "suggests that unseen helpers matter more than they look", 1, `<p><b>Extract B</b> begins: “A healthy garden depends on workers that no one ever sees”, and shows how earthworms feed and loosen the soil.</p><p class="why-not">Extract D lists what a garden teaches, but it isn’t about hidden helpers.</p>`),
      exQ("r13c", "Feelings & inference", "shows patience being rewarded at the very last moment", 2, `<p>In <b>Extract C</b>, Nora waters her bare cup every day, and on the last day of term her bean finally comes up.</p><p class="why-not">Extract D <i>says</i> that some things can’t be hurried, but it doesn’t show it happening. In A the tomatoes are simply doing well.</p>`),
      exQ("r13d", "Tone & attitude", "tries to persuade the reader that something should change", 3, `<p><b>Extract D</b> argues that “every primary school should” make a vegetable garden, and answers the worry about cost.</p><p class="why-not">The other extracts describe or explain; none of them asks the reader to change anything.</p>`),
      exQ("r13e", "Purpose of a detail", "suggests why a creature appears after heavy rain", 1, `<p><b>Extract B</b>: a worm breathes through its skin, “which may be why worms come up when heavy rain fills their tunnels”.</p><p class="why-not">Nobody in A or C mentions rain or creatures, and D is about vegetables.</p>`),
    ],
  });

  /* ============ circle 2: cloze ============ */
  READING.push({
    id: "snailfilm", tier: 2, format: "cloze", title: "Forty-One Seconds",
    note: "Some words are missing from this piece about making a short animated film. Choose the word that fits each gap best.",
    html: `<p>Our film lasts exactly forty-one seconds. It took us three weekends to make.</p>
<p>The idea seemed simple enough. My friend Arjun and I would model a plasticine snail, photograph it, move it a ${G(1)} distance, photograph it again, and repeat. When the photos were played quickly one after another, the snail would appear to crawl across the table.</p>
<p>What we had failed to take into ${G(2)} was how many photographs that would need. Every second of film uses twelve pictures, so forty-one seconds meant almost five hundred of them, and for each one the snail had to be nudged, the lamp checked and the camera kept perfectly still.</p>
<p>Disaster struck on the second Saturday. Arjun’s little sister, who found our project ${G(3)}, decided that the snail needed a hat. She pressed a blob of yellow plasticine onto its shell and squashed it flat. Forty pictures’ worth of careful work was ruined, and Arjun was so cross that he could barely bring himself ${G(4)} speak to her.</p>
<p>In the end, though, we ${G(5)} the hat into the story. Halfway across the table the snail now stops, a gust of wind blows its hat off, and it spends the rest of the film chasing it.</p>
<p>At the school film night, the audience laughed loudest at that part. Arjun’s sister, sitting in the front row, looked ${G(6)} pleased with herself.</p>`,
    questions: [
      gapQ("r14a", 1, ["minute", "trivial", "scanty", "feeble"], 0, `<p>“Minute” (said my-NEWT) means <b>very small</b>: the snail is moved a tiny distance each time.</p><p class="why-not">“Trivial” means unimportant, not small in size. “Scanty” means not enough, and “feeble” means weak: neither describes a distance.</p>`),
      gapQ("r14b", 2, ["mind", "account", "notice", "regard"], 1, `<p>To “<b>take into account</b>” is a fixed phrase meaning to think about something when you plan.</p><p class="why-not">You can “bear in mind”, “take notice of” or “have regard for” something, but only “account” follows “take into”.</p>`),
      gapQ("r14c", 3, ["irritable", "irrelevant", "irresistible", "irreversible"], 2, `<p>She couldn’t keep her hands off it: she found the project <b>irresistible</b>.</p><p class="why-not">These words look alike. “Irritable” describes a grumpy person, not a project. “Irrelevant” would mean it didn’t matter to her, yet she joined in. “Irreversible” means it can’t be undone.</p>`),
      gapQ("r14d", 4, ["to", "for", "at", "so"], 0, `<p>The phrase is “<b>bring yourself to</b> do something”: Arjun could barely bring himself to speak.</p><p class="why-not">“Bring himself for”, “at” or “so speak” are not English.</p>`),
      gapQ("r14e", 5, ["tied", "folded", "wove", "painted"], 2, `<p>To <b>weave</b> something into a story is to make it part of the plot. They turned the accident into the best scene.</p><p class="why-not">You can tie, fold or paint a real hat, but none of those words means making it part of a story.</p>`),
      gapQ("r14f", 6, ["barely", "thoroughly", "sorely", "hardly"], 1, `<p>Read the whole passage: her hat caused the disaster, but it became the scene the audience loved most. No wonder she looked <b>thoroughly</b> (completely) pleased with herself.</p><p class="why-not">“Barely” and “hardly” would mean she was not pleased, which misses the point of the ending. “Sorely” goes with words like “tempted” or “missed”, not “pleased”.</p>`),
    ],
  });

  /* ============ circle 3: story ============ */
  READING.push({
    id: "wrongbus", tier: 3, format: "story", title: "The Wrong Bus",
    note: "Read the story, then answer the questions.",
    html: `<p>Theo had caught the 412 home from school by himself every day for two weeks, and he had begun to feel that he was rather good at it. So he did not look up from his book when the bus pulled away, and he did not notice, for several stops, that the shops outside were the wrong shops.</p>
<p>When he did notice, the feeling arrived all at once, the way cold water does.</p>
<p>He pressed the bell. He got off. The bus sighed and drove away, and Theo stood on a footpath he had never seen, holding a book about a boy who sailed around the world alone.</p>
<p>His phone had nine per cent battery. He looked at it, then put it back in his pocket, because Mum was at work and the word “lost” felt too heavy to type.</p>
<p>There was a bus shelter across the road, and in it sat an old man with a tartan shopping trolley. Theo crossed, read the timetable twice without understanding it, and sat down at the far end of the bench.</p>
<p>“The 412 goes the other way from this side,” said the old man, not looking at him. “People always think it’s this side.”</p>
<p>“I know,” said Theo, who had not known.</p>
<p>The old man nodded slowly, as if that were a very reasonable answer. “Course you do. Next one’s in eleven minutes. From over there.” He pointed across the road with his chin.</p>
<p>Theo thanked him and crossed back. He waited eleven minutes. He did not open his book.</p>
<p>When the right bus came, he chose a seat by the window and watched every shop go past, naming them under his breath, as if they might change their minds and become different shops.</p>
<p>At home, Mum asked how his day had been.</p>
<p>“Fine,” said Theo. Then, after a moment: “I learnt something about buses.”</p>`,
    questions: [
      { id: "r15a", cat: "Comparisons & imagery", stem: `<p>When Theo notices, “the feeling arrived all at once, <b>the way cold water does</b>”. What does this comparison suggest?</p>`,
        options: ["He was cold because a window was open.", "He slowly began to feel a little worried.", "He felt a sudden shock as he realised.", "He was excited about exploring somewhere new."], answer: 2,
        explain: `<p>Cold water doesn’t creep up on you: it hits you all at once and takes your breath away. Theo’s realisation is a <b>sudden shock</b>.</p><p class="why-not">The cold is only a comparison. “All at once” is the opposite of slowly, and nothing about getting lost excites him.</p>` },
      { id: "r15b", cat: "Feelings & inference", stem: `<p>Why does Theo put his phone away without messaging his mum?</p>`,
        options: ["His battery was much too low to send Mum a message.", "Admitting he was lost felt like too big a thing.", "Mum had told him never to text her at work.", "He had already worked out the way home."], answer: 1,
        explain: `<p>“The word ‘lost’ felt too heavy to type.” Saying he is lost would make it real, and would mean <b>admitting</b> his mistake.</p><p class="why-not">Nine per cent battery is enough for a short message, so that isn’t the reason. Nothing says Mum forbids texts, and he doesn’t yet know the way: he can’t even read the timetable.</p>` },
      { id: "r15c", cat: "Character & structure", stem: `<p>“<b>‘I know,’ said Theo, who had not known.</b>” What does this show about Theo?</p>`,
        options: ["He doesn’t want to look as if he needs help.", "He has caught a bus from this very stop many times before.", "He is being rude to the old man on purpose.", "He hasn’t understood what the old man said."], answer: 0,
        explain: `<p>Theo pretends he already knew because he is embarrassed: he <b>doesn’t want to look lost</b> or in need of help.</p><p class="why-not">He has never seen this footpath before. He thanks the old man later, so he isn’t being rude, and he understands well enough to cross the road.</p>` },
      { id: "r15d", cat: "Feelings & inference", stem: `<p>The old man nods “<b>as if that were a very reasonable answer</b>” and says “Course you do.” What is he doing?</p>`,
        options: ["He truly believes that Theo knew the way.", "He is quietly making fun of Theo for getting lost.", "He is going along with Theo to spare his pride.", "He wants Theo to leave him in peace."], answer: 2,
        explain: `<p>The old man can see that Theo didn’t know, but he <b>plays along kindly</b> so Theo doesn’t feel silly, and still tells him exactly where to go.</p><p class="why-not">“As if” shows he doesn’t really believe it. He isn’t mocking (he helps), and he is the one who starts the conversation.</p>` },
      { id: "r15e", cat: "Purpose of a detail", stem: `<p>On the right bus, Theo names every shop “<b>as if they might change their minds and become different shops</b>”. Why?</p>`,
        options: ["He is learning all of the shop names for a school project.", "He is checking carefully, no longer so sure of himself.", "He is bored because he has finished his book.", "He wants to prove to the old man he knew the way."], answer: 1,
        explain: `<p>At the start Theo was so sure of himself that he read his book and missed the wrong shops. Now he <b>checks every one</b>, and the joke about shops changing their minds shows how little he trusts himself after the scare.</p><p class="why-not">He hasn’t finished his book: he “did not open” it. The old man has gone, and nothing mentions a project.</p>` },
      { id: "r15f", cat: "Character & structure", stem: `<p>The story ends: “<b>‘Fine,’ said Theo. Then, after a moment: ‘I learnt something about buses.’</b>” What does this ending suggest?</p>`,
        options: ["He wants to keep the whole day a secret.", "He enjoyed a science lesson about transport.", "He wants Mum to drive him to school from now on.", "He is ready to admit a little of what happened."], answer: 3,
        explain: `<p>“Fine” hides the scare, but “after a moment” he adds a small hint. He is <b>ready to share a little</b>, in his own way, now that it is over.</p><p class="why-not">He doesn’t keep it all secret, because he drops the hint. “Something about buses” refers to his own mistake, not a lesson, and nothing suggests he wants to stop catching the bus.</p>` },
    ],
  });

  /* ============ circle 3: four extracts ============ */
  READING.push({
    id: "messages", tier: 3, format: "four extracts", title: "Messages",
    note: "Read the four extracts about sending messages. For each question, choose the extract that fits best.",
    html: `<div class="extract"><b class="tag">Extract A</b><p>For three years I wrote to a girl in Finland whom I never met. Her letters came on thin blue paper, and each one took nearly a month to arrive, so that by the time I read about her new kitten, the kitten was probably a cat. I didn’t mind. I kept every letter in a shoebox and reread them while I waited for the next. I think I knew her better, in the end, than some of the people I saw every day.</p></div>
<div class="extract"><b class="tag">Extract B</b><p>Long before telephones, people trusted messages to pigeons. A homing pigeon taken far from its loft will fly straight back to it, and a note tied to its leg travels too. Scientists still argue about exactly how the birds find their way; the sun and the Earth’s magnetism probably both play a part. In 1918, during the First World War, a pigeon named Cher Ami carried a message from a group of trapped soldiers to their own side. The bird was badly wounded on the way, but the message got through, and around two hundred soldiers were rescued.</p></div>
<div class="extract"><b class="tag">Extract C</b><p>Sami wrote the note on the back of a shopping list: his name, his town and the words “Please write back.” He pushed it into an empty juice bottle and threw it as far as he could from the end of the jetty. Then he forgot about it, the way you forget about most things when you are eight. Six years later, a letter arrived from a fisherman on the other side of the bay, with a photo of a muddy bottle and the words: “Sorry it took so long.”</p></div>
<div class="extract"><b class="tag">Extract D</b><p>A text message takes three seconds to send and about as long to forget. A handwritten thank-you card is a different thing altogether. Someone had to choose it, find a pen, think about what to say and walk to a letterbox. That effort is part of the message. It says “you were worth my time” before the reader has even opened the envelope. We should send fewer texts and more cards, especially to the people who matter most.</p></div>`,
    questions: [
      exQ("r16a", "Main idea", "suggests that waiting for a message made it more precious", 0, `<p>In <b>Extract A</b> each letter took a month, and the writer reread old ones “while I waited for the next”: the slowness made the letters treasured.</p><p class="why-not">In C the reply takes six years, but Sami had forgotten about it, so he wasn’t waiting. D is about effort, not waiting.</p>`),
      exQ("r16b", "Purpose of a detail", "describes a message that got through in spite of an injury", 1, `<p>In <b>Extract B</b>, the pigeon “was badly wounded on the way, but the message got through”.</p><p class="why-not">Nobody is hurt in the other extracts. The bottle in C is only muddy.</p>`),
      exQ("r16c", "Main idea", "mentions something that experts still cannot fully explain", 1, `<p><b>Extract B</b>: “Scientists still argue about exactly how the birds find their way.”</p><p class="why-not">The other extracts contain surprises, but nothing that experts are puzzling over.</p>`),
      exQ("r16d", "Tone & attitude", "argues that the trouble taken over a message is part of what it says", 3, `<p><b>Extract D</b>: “That effort is part of the message. It says ‘you were worth my time’.”</p><p class="why-not">Extract A shows letters being treasured, but it doesn’t argue anything about effort, and it doesn’t try to persuade the reader.</p>`),
      exQ("r16e", "Feelings & inference", "describes a reply that the sender had stopped expecting", 2, `<p>In <b>Extract C</b>, Sami forgot about his bottle, and the reply came six years later from a stranger.</p><p class="why-not">The writer of A expects every letter: they are waiting for the next one.</p>`),
    ],
  });
})();
