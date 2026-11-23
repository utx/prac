/* RIDGE RUNNER: hand-written reading questions (A–D). All texts are our own.
   Short texts build one reading skill at a time; four per step, answer letters spread within each step. */
const P = t => `<div class="passage">${t}</div>`;
/* ---------- Reading between the lines ---------- */
H("infer", 1, "ri1a", { passage: P(`<p>Hana stood at the end of the diving board for a long time. She looked down at the water, then back at the ladder. When her coach called her name, she wiped her hands on her towel for the third time.</p>`),
  stem: `<p>How does Hana feel?</p>`,
  opts: [["Excited and eager to dive", "the long wait could look like excitement, but she keeps looking back at the ladder, as if thinking of climbing down"],
    ["Nervous about diving", null],
    ["Bored of waiting for her turn", "it is already her turn; she is the one making the wait"],
    ["Annoyed with her coach", "nothing she does is aimed at the coach"]],
  body: "The writer never says “nervous”. She SHOWS it: Hana waits, looks back at the ladder (a way out) and keeps wiping her hands (sweaty palms)." });
H("infer", 1, "ri1b", { passage: P(`<p>When the parcel arrived, Mr Okafor did not open it. He turned it over twice, read the postmark from his old village, and set it carefully on the mantelpiece beside the photograph of his brother. Then he sat down and looked at it for a long while.</p>`),
  stem: `<p>What do Mr Okafor's actions show?</p>`,
  opts: [["He is worried that the parcel is broken.", "he handles it carefully, but there's no sign he thinks it is damaged"],
    ["He doesn't like receiving parcels.", "the opposite: he treats it as precious"],
    ["He has forgotten who sent it.", "he reads the postmark and places it by his brother's photo, so he seems to know"],
    ["The parcel means a great deal to him.", null]],
  body: "He doesn't rush to open it; he places it carefully next to a family photo and just looks at it. Those actions show the parcel matters deeply to him." });
H("infer", 1, "ri1c", { passage: P(`<p>Tom slid his report card across the kitchen table without a word and stared at the salt shaker. When Mum began to smile, he let out a breath he hadn't known he was holding.</p>`),
  stem: `<p>How does Tom feel when Mum smiles?</p>`,
  opts: [["Relieved", null],
    ["Proud of every mark", "nothing shows pride; he couldn't even look at her"],
    ["Unconcerned about what Mum thinks", "he was holding his breath, so he cared a lot"],
    ["Cross that Mum is smiling", "letting out a held breath shows release, not anger"]],
  body: "Holding his breath and staring at the salt shaker show worry; letting the breath out when she smiles shows relief." });
H("infer", 1, "ri1d", { passage: P(`<p>The new girl ate her lunch on the bench by the library. Each time a group of laughing children went past, she looked up, half-raised her hand, and then pretended to search her lunch box for something.</p>`),
  stem: `<p>What is the girl feeling?</p>`,
  opts: [["She would rather be on her own.", "she half-raises her hand, so part of her wants to join in"],
    ["She has lost something in her lunch box.", "she only PRETENDS to search; it covers her shyness"],
    ["She wants to join in but feels too shy.", null],
    ["She is upset with the other children.", "nothing suggests she blames them"]],
  body: "The half-raised hand shows she wants to join in; pretending to search her lunch box hides that she lost her nerve." });
H("infer", 2, "ri2a", { passage: P(`<p>The old fishing boat had been painted many times. Under the chipped blue you could see patches of green, and under the green, a faded red.</p>`),
  stem: `<p>Why does the writer mention the colours under the blue paint?</p>`,
  opts: [["To show the boat has been badly looked after and left to fall apart", "the chips are real, but the layers show it was repainted again and again, which is care"],
    ["To show the owner's favourite colour is blue", "the boat has been three colours, so this doesn't follow"],
    ["To suggest the boat has had a long life with many repaintings", null],
    ["To suggest the boat is dangerous to sail", "nothing about paint layers points to danger"]],
  body: "Each layer is an older coat of paint. The detail tells us the boat is old and has been looked after over many years." });
H("infer", 2, "ri2b", { passage: P(`<p>Before the race, Rafi tied and retied his shoelaces four times, though they were already tight.</p>`),
  stem: `<p>Why does the writer include this detail?</p>`,
  opts: [["To show that Rafi is anxious about the race", null],
    ["To show that Rafi's shoes are new", "nothing says the shoes are new"],
    ["To show that the laces keep coming undone", "the laces were already tight, so that isn't the reason"],
    ["To show that Rafi is wasting time on purpose", "there's no hint he is trying to delay the race"]],
  body: "Retying laces that are already tight is something people do when they are nervous. The detail shows his feelings without naming them." });
H("infer", 2, "ri2c", { passage: P(`<p>For forty years the farmer filled his weather diary with neat lines about rainfall, frosts and the price of wool. On the page for the day his daughter was born, beside the date, he had drawn a small star: the only drawing in the whole book.</p>`),
  stem: `<p>Why does the writer mention the star?</p>`,
  opts: [["To show the farmer enjoyed drawing", "it is the ONLY drawing in forty years, so he didn't draw often"],
    ["To show the sky was clear that night", "the star is drawn in a book, not seen in the sky"],
    ["To show he was careless with his records", "his book is neat; the star is the one exception"],
    ["To show how special that day was to him", null]],
  body: "A man who wrote only plain facts for forty years broke his habit once. That one star shows how much his daughter's birth meant to him." });
H("infer", 2, "ri2d", { passage: P(`<p>Grandma kept the key to the garden shed on a long red ribbon. “Because I lose everything small,” she said, “and I have never once lost this.”</p>`),
  stem: `<p>Why does the writer mention the ribbon?</p>`,
  opts: [["It shows that red is Grandma's favourite colour.", "the colour isn't the point; the length and brightness make the key easy to find"],
    ["It explains how Grandma stops herself losing the key.", null],
    ["It shows the shed is full of valuable things.", "nothing tells us what is in the shed"],
    ["It shows that Grandma never loses anything, however small it is.", "she says she loses everything small; the ribbon is why this key is different"]],
  body: "Grandma tells us she loses small things; the long ribbon makes the key big and easy to spot, which is why she never loses it." });
H("infer", 3, "ri3a", { passage: P(`<p>The puppy bulldozed through the flower bed.</p>`),
  stem: `<p>What does the word “bulldozed” suggest about the puppy?</p>`,
  opts: [["It moved slowly and carefully.", "the opposite of what a bulldozer does"],
    ["It was driving a small machine.", "the word is used as a comparison, not literally"],
    ["It was trying to dig a hole to bury something in the garden.", "bulldozers push things over; the word isn't about digging"],
    ["It pushed through clumsily, flattening the flowers.", null]],
  body: "A bulldozer pushes everything flat in its way. Using that word for a puppy makes us see it charging through and squashing the flowers." });
H("infer", 3, "ri3b", { passage: P(`<p>“Of course you can borrow my new pencils,” said Lucy, pushing the tin towards Max with two fingers, as if it might bite.</p>`),
  stem: `<p>What does “as if it might bite” suggest about Lucy?</p>`,
  opts: [["She thinks the tin is dangerous.", "taken literally; the comparison is about her feelings"],
    ["She doesn't really want to lend the pencils.", null],
    ["She is very generous and happy to share her things.", "her words say yes, but her actions say she is unwilling"],
    ["She is frightened of Max.", "she is reluctant about the pencils, not scared of Max"]],
  body: "She says “of course”, but she pushes the tin away as little as possible, like something unpleasant. The comparison shows she is unwilling." });
H("infer", 3, "ri3c", { passage: P(`<p>On wet afternoons the old library was a cave of whispers.</p>`),
  stem: `<p>What does the writer suggest by calling the library “a cave of whispers”?</p>`,
  opts: [["It was underground and damp.", "taking “cave” literally; the library isn't underground"],
    ["People went there to tell secrets.", "whispering here is about keeping quiet, not secrets"],
    ["It was dim, hushed and quiet.", null],
    ["It was frightening to go into.", "caves can be scary, but nothing else suggests fear"]],
  body: "A cave is dim and echoing; whispers are hushed. Together they paint a quiet, shadowy, peaceful room on a rainy day." });
H("infer", 3, "ri3d", { passage: P(`<p>Dad looked at the blackened toast on his plate. “Lovely,” he said flatly.</p>`),
  stem: `<p>What does the word “flatly” tell us?</p>`,
  opts: [["He doesn't really think the toast is lovely.", null],
    ["He thinks the toast is delicious, just the way he likes it.", "that is what the word “lovely” says, but “flatly” tells us he doesn't mean it"],
    ["He said it very loudly.", "flatly means without feeling, not loudly"],
    ["He is too tired to speak.", "he does speak; the word describes HOW"]],
  body: "“Flatly” means with no feeling in the voice. Saying “lovely” flatly about burnt toast shows he means the opposite." });
H("infer", 4, "ri4a", { passage: P(`<p>My first day at drama club went like this. I arrived early, which was good. I sat in the director's chair, which was bad. I opened my folder and found my sister's maths homework instead of my script, which was worse.</p><p>The director, a tall woman with a pencil behind each ear, peered at me over her glasses. “Interesting choice,” she said. Twenty actors turned to look.</p><p>I read the maths homework aloud as my lines for the whole rehearsal. Nobody asked me to. Nobody asked me to stop, either. At the end the director said I had “a lot of nerve”, and I still don't know whether that was good.</p>`),
  stem: `<p>What is the main effect of the way the writer lists what went wrong (“which was good … bad … worse”)?</p>`,
  opts: [["It turns an embarrassing day into a funny story by building up each disaster.", null],
    ["It shows the writer is angry with his sister.", "the sister's homework is mentioned, but there's no anger in the telling"],
    ["It explains how to get ready for a rehearsal.", "it is a story, not instructions"],
    ["It shows that the director was unkind and embarrassed him in front of all the other actors.", "her “interesting choice” is dry humour, and she lets him carry on"]],
  body: "Each step is worse than the one before, and the writer tells it calmly: the pattern builds to a punchline. Read the whole passage: it is a comic memory, not a complaint." });
H("infer", 4, "ri4b", { passage: P(`<p>The tall ones arrive while the sky is still grey. They bang their wooden tables open and tip out ice that slides and squeaks. I keep to my place on top of the stacked crates, where the boards are still warm from the lamp.</p><p>Soon the silver fish are laid out in rows, and the smell climbs up to me like a song. The tall one in the green apron pretends not to see me. Every morning he drops one small fish by the back wheel of his cart, and every morning he looks the other way while I take it. Neither of us has ever mentioned it.</p>`),
  stem: `<p>Who is telling this?</p>`,
  opts: [["A fish seller setting up a stall", "the fish seller is “the tall one in the green apron”, someone the narrator watches"],
    ["A child visiting the market", "a child wouldn't call people “the tall ones” or sit on the crates waiting for a fish"],
    ["A cat that lives at the market", null],
    ["A bird watching from above", "the narrator sits on the crates and takes the fish from beside a cart wheel, on the ground"]],
  body: "Put the clues together: people are “the tall ones”, the narrator sits on warm crates, loves the smell of fish and secretly takes one each day. Only a market cat fits all of them." });
H("infer", 4, "ri4c", { passage: P(`<p>Aunt Rosa never threw anything away. A broken umbrella became a frame for her beans. Odd socks became puppets for the twins. When the kitchen clock stopped, she took it apart on a sheet of newspaper, laid every tiny wheel in order, and had it ticking again before dinner.</p><p>“Things aren't finished just because they're broken,” she said. The neighbours laughed at her garden of old bathtubs planted with herbs, until the summer the shops ran out of basil and half the street came knocking at her gate.</p>`),
  stem: `<p>Which word best describes Aunt Rosa as she is shown in the whole passage?</p>`,
  opts: [["Stubborn", "she keeps things, but the passage shows her cleverness in using them, not refusing to change"],
    ["Resourceful", null],
    ["Untidy", "the bathtub garden might look odd, but she lays the clock wheels out “in order”"],
    ["Lonely", "half the street comes to her gate; nothing suggests loneliness"]],
  body: "Every example shows her finding a clever new use for something broken, and in the end her neighbours need her. That is resourceful." });
H("infer", 4, "ri4d", { passage: P(`<p>“Chess is boring,” I told Grandpa. He just set up the board.</p><p>For the first ten games I lost so quickly that I barely had time to sit down. Then Grandpa showed me how to protect my king with a wall of pawns and to wait, a little at a time, for him to make a mistake. In the eleventh game I trapped his queen. I could feel my heart thumping, as if it wanted to jump out and do a lap of the park.</p><p>We stayed at the park table until the light went orange. On the walk home Grandpa asked what I thought now.</p><p>“Chess is boring,” I said, grinning, and he laughed so hard he had to sit down on the kerb.</p>`),
  stem: `<p>Why does the writer say “Chess is boring” again at the end?</p>`,
  opts: [["Because the writer still thinks chess is boring", "the grin, the long afternoon and Grandpa's laughter show the opposite"],
    ["To show that the writer was tired and grumpy after the long day at the park", "nothing about the words or the grin suggests tiredness"],
    ["To show that Grandpa did not enjoy the games", "Grandpa laughs; he enjoyed the day too"],
    ["As a joke: by now the writer loves chess, and Grandpa knows it", null]],
  body: "The same words mean the opposite at the end. The grin and Grandpa's laughter show it is a shared joke: the writer's mind has completely changed." });

/* ---------- The right word ---------- */
const GAP = s => `<p class="gapline">${s.replace("___", '<span class="blank">________</span>')}</p><p>Which word best fills the gap?</p>`;
H("word", 1, "rw1a", { stem: GAP("After the long, hot hike, the children ___ their water bottles in a few seconds."),
  opts: [["sipped", "sipping is slow, small drinks; “in a few seconds” needs the opposite"], ["drained", null], ["tasted", "tasting is just a little; they were thirsty and finished them"], ["poured", "pouring is tipping out, not drinking"]],
  body: "“In a few seconds” after a hot hike means they drank everything fast: drained." });
H("word", 1, "rw1b", { stem: GAP("The tiny kitten ___ in the corner of the shed, shaking with fright."),
  opts: [["lounged", "lounging is lying lazily and relaxed, not frightened"], ["sprawled", "sprawling is stretched out loosely, not afraid"], ["strutted", "strutting is walking proudly"], ["cowered", null]],
  body: "“Shaking with fright” needs a word for crouching down in fear: cowered." });
H("word", 1, "rw1c", { stem: GAP("The museum guard ___ at the boy who was reaching out to touch the painting."),
  opts: [["glared", null], ["glanced", "a glance is a quick look, with no warning in it"], ["peeked", "peeking is looking secretly"], ["gazed", "gazing is a long, dreamy look"]],
  body: "A guard stopping someone touching a painting would give an angry, warning look: glared." });
H("word", 1, "rw1d", { stem: GAP("Our victory was ___: we won every game by a large margin."),
  opts: [["narrow", "a narrow win is a close one, the opposite of a large margin"], ["lucky", "winning every game easily doesn't suggest luck"], ["decisive", null], ["modest", "modest means small, which doesn't match a large margin"]],
  body: "Winning every game by a lot is a clear, convincing victory: decisive." });
H("word", 2, "rw2a", { stem: GAP("Mum told us to ___ our steps to the last place we had seen the keys."),
  opts: [["follow", "we don't say “follow our steps” for going back the way we came"], ["return", "“return our steps” isn't the fixed phrase"], ["retrace", null], ["reverse", "“reverse” goes with a car, not with steps"]],
  body: "The fixed expression is “retrace your steps”: go back the same way." });
H("word", 2, "rw2b", { stem: GAP("The firefighters ___ the alarm as soon as they saw smoke coming from the roof."),
  opts: [["raised", null], ["lifted", "close in meaning, but we never say “lifted the alarm”"], ["increased", "that would mean making an alarm louder or bigger"], ["grew", "grow doesn't go with alarm at all"]],
  body: "“Raise the alarm” is the fixed expression for warning people of danger." });
H("word", 2, "rw2c", { stem: GAP("It was a ___ of luck that we found Gran's ring in the sand."),
  opts: [["hit", "“a hit” can be a success, but not “a hit of luck”"], ["blow", "a blow is a shock or a setback, the opposite"], ["strike", "“strike” doesn't partner with luck"], ["stroke", null]],
  body: "The fixed partner is “a stroke of luck”. Only one word goes with “of luck”." });
H("word", 2, "rw2d", { stem: GAP("The lost hikers were overjoyed when they caught ___ of the rescue helicopter."),
  opts: [["a look", "you “take” a look; you don't “catch” one"], ["a glimpse", null], ["a view", "you “get” or “have” a view"], ["a sight", "we say “catch sight of”, with no “a”"]],
  body: "The partners are “catch a glimpse of” (or “catch sight of”, without “a”)." });
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

/* ---------- Linking sentences ---------- */
H("link", 1, "rl1a", { passage: P(`<p>Honeybees tell each other where to find flowers by dancing. This is called the waggle dance.</p>`),
  stem: `<p>What does “This” refer to?</p>`,
  opts: [["The flowers", "flowers don't dance; “This” points to the whole idea before it"], ["The way the bees dance to show where flowers are", null], ["The honeybees themselves, wherever in the world they live", "the waggle dance is something bees DO, not the bees themselves"], ["The hive", "the hive isn't mentioned at all"]],
  body: "“This” points back to the whole idea of the sentence before: bees dancing to show where flowers are." });
H("link", 1, "rl1b", { passage: P(`<p>My grandparents moved to the coast when they retired. There, they bought a small boat and learned to sail.</p>`),
  stem: `<p>What does “There” refer to?</p>`,
  opts: [["The boat", "they bought the boat there, so “there” must be a place"], ["The sailing club", "no sailing club is mentioned"], ["Their old house", "they had moved away from it"], ["The coast", null]],
  body: "“There” points back to a place in the sentence before: the coast." });
H("link", 1, "rl1c", { passage: P(`<p>Explorers once believed that a huge southern land must exist to balance the lands in the north. They searched for it for hundreds of years.</p>`),
  stem: `<p>Who does “They” refer to?</p>`,
  opts: [["The explorers", null], ["The lands in the north", "lands can't search"], ["The huge southern land", "that is “it”, the thing they searched for"], ["People today", "the passage is about long ago"]],
  body: "“They” must be people who could search: the explorers. The southern land is “it”." });
H("link", 1, "rl1d", { passage: P(`<p>Penguins cannot fly, but such birds are not helpless: they are among the best swimmers in the ocean.</p>`),
  stem: `<p>What does “such birds” mean here?</p>`,
  opts: [["All birds that live near the sea", "the sentence is about one kind of bird, not all sea birds"], ["Birds that are helpless", "the sentence says they are NOT helpless"], ["Birds that cannot fly", null], ["The fastest penguins", "nothing singles out fast ones"]],
  body: "“Such” points back to what was just said about them: birds that cannot fly." });
const NEXT = `<p>Which sentence would best come next?</p>`;
H("link", 2, "rl2a", { passage: P(`<p>Some animals use tools. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Animals need food and water to survive.", "true, but it doesn't follow on from tools"], ["Tools can be dangerous if they are used carelessly.", "about tools in general, not animals using them"], ["Sea otters, for example, crack open shells with stones.", null], ["Many of the tools that people use every day are made of metal or plastic.", "this drifts away to people's tools"]],
  body: "A general statement (some animals use tools) is usually followed by an example. “For example” and the otter's stone fit exactly." });
H("link", 2, "rl2b", { passage: P(`<p>Many inventions came about by accident. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["The microwave oven was invented after a scientist noticed a chocolate bar melting near a machine.", null], ["Inventors often work very long hours in busy laboratories filled with expensive and complicated equipment.", "on the topic of inventors, but not an accident"], ["Some inventions are very expensive to buy.", "about cost, not about accidents"], ["Accidents can happen at home as well as at work.", "shares the word “accident” but changes the subject"]],
  body: "The first sentence makes a general claim; the next should give an example of an accidental invention." });
H("link", 2, "rl2c", { passage: P(`<p>Our cat has a strange habit. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Cats can sleep for up to sixteen hours a day, often in the sunniest spot they can find.", "a fact about all cats, not OUR cat's habit"], ["Most people in our street own a pet.", "about other people, not the habit"], ["Cats were kept as pets in ancient Egypt.", "history, not the habit"], ["Every morning she drinks from the bathroom tap instead of her bowl.", null]],
  body: "“A strange habit” needs to be explained next: what the habit is." });
H("link", 2, "rl2d", { passage: P(`<p>The bridge had to be closed for repairs. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Bridges are found all over the world.", "too general; doesn't explain the closure"], ["Cracks had been found in two of its supports.", null], ["The river below is popular for fishing.", "about the river, not the repairs"], ["Some bridges can lift up to let ships pass underneath.", "about other bridges"]],
  body: "After saying the bridge was closed, the text should give the reason: the cracks." });
const SIG = `<p>Which word or phrase best fills the gap?</p>`;
H("link", 3, "rl3a", { passage: P(`<p>The forecast promised sunshine all day. <span class="blank">________</span>, it rained all afternoon.</p>`), stem: SIG,
  opts: [["Therefore", "“therefore” means “because of that”, but sunshine doesn't cause rain"], ["Also", "“also” adds a similar idea, but rain is the opposite of what was promised"], ["For example", "rain isn't an example of sunshine"], ["Instead", null]],
  body: "The second sentence is the opposite of what was expected, so the link must show contrast: Instead." });
H("link", 3, "rl3b", { passage: P(`<p>Kangaroos find it very hard to move backwards. <span class="blank">________</span>, they nearly always move forwards.</p>`), stem: SIG,
  opts: [["However", "“however” signals a contrast, but the second idea follows from the first"], ["As a result", null], ["In contrast", "this would need two opposite ideas"], ["Even so", "“even so” means despite that, which doesn't fit"]],
  body: "Moving forwards is a RESULT of finding backwards hard, so the link is “As a result”." });
H("link", 3, "rl3c", { passage: P(`<p>Many people think owls are especially wise. <span class="blank">________</span> they are no cleverer than most other birds.</p>`), stem: SIG,
  opts: [["Because", "“because” would introduce a reason for the first idea"], ["So", "“so” would show a result"], ["In fact,", null], ["For this reason,", "the second idea isn't caused by the first"]],
  body: "The second sentence corrects a common belief. “In fact,” signals that correction." });
H("link", 3, "rl3d", { passage: P(`<p>The cake sank in the middle and was burnt at the edges. <span class="blank">________</span> the whole family asked for a second slice.</p>`), stem: SIG,
  opts: [["Even so,", null], ["As a result,", "a burnt, sunken cake wouldn't CAUSE people to want more"], ["For example,", "asking for more isn't an example of the cake sinking"], ["Instead,", "“instead” would need a replaced action"]],
  body: "Despite the problems, they still wanted more: a contrast against expectations. “Even so” fits." });
const FILL = `<p>Which sentence best fills the gap?</p>`;
H("link", 4, "rl4a", { passage: P(`<p>The leafy sea dragon is a relative of the seahorse that lives off the southern coast of Australia. <span class="blank">________</span> These flaps are not used for swimming at all; they simply help it hide among the seaweed.</p>`), stem: FILL,
  opts: [["Its body is covered in leaf-shaped flaps of skin.", null], ["It swims very slowly using tiny, almost see-through fins.", "on topic, but then “These flaps” would point to nothing"], ["Seahorses are also found in many other oceans.", "this leaves “These flaps” with nothing to refer to"], ["Divers travel from far away to see it.", "doesn't introduce any flaps"]],
  body: "The sentence after the gap says “These flaps”, so the gap must introduce the flaps." });
H("link", 4, "rl4b", { passage: P(`<p>Making paper by hand takes patience. First, old paper is torn into scraps and soaked overnight. <span class="blank">________</span> The pulp is then spread thinly on a screen and left to dry.</p>`), stem: FILL,
  opts: [["Paper was first made in China about two thousand years ago, using tree bark and old rags.", "interesting, but it breaks the step-by-step order"], ["This makes it much stronger than paper from the shop.", "“This” has nothing sensible to point to, and the pulp still hasn't been made"], ["Next, the soggy scraps are mashed until they become a thick pulp.", null], ["Some people add flower petals for colour.", "it could fit somewhere, but “The pulp” after the gap still needs the pulp to be made first"]],
  body: "“The pulp” after the gap must have been mentioned already, and the steps go in order (First … Next … then). Only one sentence makes the pulp." });
H("link", 4, "rl4c", { passage: P(`<p>Some birds travel astonishing distances. <span class="blank">________</span> That is like flying to the Moon and back about three times.</p>`), stem: FILL,
  opts: [["Many birds fly north or south when the weather turns cold, often travelling in large flocks.", "on topic, but “That” after the gap needs a distance to compare"], ["Over its lifetime, an Arctic tern may fly around two and a half million kilometres.", null], ["Terns are seabirds with sharp, pointed wings.", "no distance for “That” to point to"], ["Scientists track birds using tiny tags on their legs.", "no distance to compare with the Moon"]],
  body: "“That is like flying to the Moon and back” needs a huge distance just before it." });
H("link", 4, "rl4d", { passage: P(`<p>Long ago, sailors had no reliable way of telling the exact time at sea, which made it very hard to work out where they were. <span class="blank">________</span> His clocks kept good time even on a rolling ship.</p>`), stem: FILL,
  opts: [["Ships today use satellites to find their position.", "on topic, but “His clocks” would have no “he” to refer to"], ["The sea can be very rough in winter.", "no person for “His” to point to"], ["This problem was finally solved by building bigger and faster ships with much taller sails.", "“This problem” fits, but bigger ships don't tell the time and there's still no “he”"], ["In the 1700s, a carpenter named John Harrison set out to solve the problem.", null]],
  body: "“His clocks” needs a man to be named just before. Only one sentence introduces him." });

/* ---------- Same idea, different words ---------- */
const MEANS = s => `<p>Which sentence means the same as:</p><p class="quote">“${s}”</p>`;
H("same", 1, "rs1a", { stem: MEANS("Hardly anyone came to the meeting."),
  opts: [["The meeting was hard to find.", "shares the word “hard”, but not the meaning"], ["Very few people came to the meeting.", null], ["People worked hard at the meeting.", "again “hard”, but a different idea"], ["Everyone came late to the meeting that day.", "“hardly anyone” means few, not late"]],
  body: "“Hardly anyone” means almost nobody: very few people." });
H("same", 1, "rs1b", { stem: MEANS("The plan was abandoned before it had properly begun."),
  opts: [["The plan was left somewhere and lost.", "takes “abandoned” too literally"], ["The plan began properly after a while.", "the opposite"], ["The plan was finished before anyone else had even started theirs.", "abandoned means given up, not finished"], ["They gave up on the plan almost at the start.", null]],
  body: "Abandoned = given up on; before it had properly begun = near the start." });
H("same", 1, "rs1c", { stem: MEANS("Not one of the runners managed to beat the record."),
  opts: [["Every runner was slower than the record.", null], ["Only one runner beat the record.", "“not one” means none, not one only"], ["The runners did not try to beat the record.", "they may have tried; they didn't manage"], ["The record was set by one of the runners.", "nothing says who set the record"]],
  body: "If not one beat the record, every runner was slower than it." });
H("same", 1, "rs1d", { stem: MEANS("Her kindness did not go unnoticed."),
  opts: [["Nobody noticed that she was kind.", "the two “not” words cancel out, so this is the opposite"], ["She was kind without being noticed.", "the opposite again"], ["People noticed how kind she was.", null], ["She noticed that other people were kind.", "turns the meaning around"]],
  body: "“Did not go unnoticed” has two negatives that cancel: people DID notice." });
const BREAD = `<div class="extracts"><p><b>Extract A</b> Every Saturday my grandfather baked bread before anyone else was awake. By the time I came downstairs the whole house smelled warm and golden, and there would be a crust waiting for me on the bench, still too hot to hold.</p>
<p><b>Extract B</b> Yeast is a tiny living thing. When it is mixed with flour and water, it feeds on the sugars and gives off bubbles of gas. The bubbles are trapped in the stretchy dough, which is why the loaf grows.</p>
<p><b>Extract C</b> Sliced bread from the supermarket is convenient, but it cannot compare with a loaf from a local baker. Buying from small bakeries keeps an old craft alive and gives a town its heart.</p>
<p><b>Extract D</b> In ancient Egypt, bread was so important that the workers who built the pyramids were partly paid in loaves. Archaeologists have even found the remains of large bakeries near the building sites.</p></div>`;
const EX = ["Extract A", "Extract B", "Extract C", "Extract D"];
const ext = (track, rung, id, passage, q, right, why, body) => H(track, rung, id, { passage, stem: `<p>${q}</p>`, opts: EX.map((x, i) => [x, i === right ? null : why[i]]), body });
ext("same", 2, "rs2a", BREAD, "Which extract argues that people should buy from a particular kind of shop?", 2,
  ["Grandfather bakes at home; no one is told where to shop", "this explains how bread rises", "", "this is history, not advice"], "Extract C says a local baker's loaf is better and that buying from small bakeries matters. That is an argument for a kind of shop.");
ext("same", 2, "rs2b", BREAD, "Which extract describes something done very early in the day?", 0,
  ["", "no time of day is mentioned", "no time of day is mentioned", "the workers' time of day isn't mentioned"], "“Before anyone else was awake” means very early in the day, though the words “early” or “morning” never appear.");
ext("same", 2, "rs2c", BREAD, "Which extract mentions bread being used in place of money?", 3,
  ["the crust is a treat, not a payment", "this is about yeast", "this mentions buying bread, which is the opposite: money used to get bread", ""], "Workers “paid in loaves” were given bread instead of money.");
ext("same", 2, "rs2d", BREAD, "Which extract explains why something gets bigger?", 1,
  ["the bread is described, but not why it grows", "", "this is an opinion, not an explanation", "the bakeries were large, but nothing explains growth"], "Extract B explains that gas bubbles trapped in the dough make the loaf grow. “Gets bigger” = grows/rises.");
const RAIN = `<div class="extracts"><p><b>Extract A</b> If you are caught outside in a thunderstorm, stay away from tall trees and open fields. Crouch down low, keep your feet together and wait until thirty minutes after the last thunder before you move on.</p>
<p><b>Extract B</b> The rain arrived like a crowd of tiny drummers on the tin roof, and the dry garden seemed to sigh and stretch.</p>
<p><b>Extract C</b> Rainy days are the best days of the year. Nothing beats a good book, a blanket and the sound of rain on the window, and anyone who says otherwise has simply never tried it.</p>
<p><b>Extract D</b> Tully, in Queensland, is often called Australia's wettest town: it receives about four metres of rain in an average year, more than ten times as much as some towns in the dry centre of the country.</p></div>`;
ext("same", 3, "rs3a", RAIN, "Which extract uses numbers to make a comparison?", 3,
  ["“thirty minutes” is a number, but it's an instruction, not a comparison", "no numbers here", "no numbers here", ""], "Extract D compares Tully's rainfall with towns in the centre: “more than ten times as much”.");
ext("same", 3, "rs3b", RAIN, "Which extract uses figurative language to describe a sound?", 1,
  ["it describes what to do, plainly", "", "the sound of rain is mentioned, but plainly, with no comparison", "it uses facts, not figurative language"], "“Like a crowd of tiny drummers” compares the sound of rain to drumming: figurative language.");
ext("same", 3, "rs3c", RAIN, "Which extract presents a personal opinion as if no one could disagree with it?", 2,
  ["this is advice, not an opinion", "this describes a scene; it doesn't argue", "", "this states facts"], "“The best days of the year … anyone who says otherwise has simply never tried it” is an opinion stated as if it were beyond argument.");
ext("same", 3, "rs3d", RAIN, "Which extract tells the reader what to do?", 0,
  ["", "it describes; it gives no advice", "it says what the writer likes, not what the reader should do", "it gives facts"], "Extract A gives instructions: stay away, crouch down, keep your feet together, wait.");
const MOVE = `<div class="extracts"><p><b>Extract A</b> On my first day at the new school, a girl with a gap in her teeth handed me half her orange without saying a word. I never learned her name, but I remember the taste of that orange better than anything I was taught that week.</p>
<p><b>Extract B</b> Grandad says that when his family arrived in the street in 1965, the neighbours watched from behind their curtains for a month before anyone said hello. “We were the most interesting thing in the street,” he jokes, “but not interesting enough to talk to.”</p>
<p><b>Extract C</b> The flat was smaller than our old house, and from my bedroom I could see only the brick wall of the next building. I told myself I didn't mind, and stuck a poster of the sea over the glass.</p>
<p><b>Extract D</b> My aunt moves house every two or three years for her job. “You learn to travel light,” she says, “and to leave a few boxes unpacked for as long as you can. Then saying goodbye isn't so hard.”</p></div>`;
ext("same", 4, "rs4a", MOVE, "Which extract suggests that a small act of kindness can be remembered for a long time?", 0,
  ["", "the neighbours were curious, not kind", "no one is kind to the writer here", "the aunt's advice isn't about kindness"], "A stranger's half an orange is a small kindness, and the writer still remembers it better than the lessons.");
ext("same", 4, "rs4b", MOVE, "Which extract suggests that the writer was trying to hide a disappointment?", 2,
  ["the writer is grateful, not disappointed", "this is about Grandad's family, told as a joke", "", "the aunt protects her feelings, but she isn't hiding a disappointment"], "“I told myself I didn't mind” and covering the window with a poster of the sea suggest the writer DID mind about the view.");
ext("same", 4, "rs4c", MOVE, "Which extract suggests that people were curious about some new arrivals but kept their distance?", 1,
  ["the girl comes up to the writer straight away", "", "no neighbours appear here", "the aunt is the one who keeps her distance, from places"], "Watching from behind curtains shows curiosity; taking a month to say hello shows they kept their distance.");
ext("same", 4, "rs4d", MOVE, "Which extract suggests someone has found a way to protect herself from feeling sad?", 3,
  ["this is about a happy memory", "Grandad jokes about it, but this isn't about protecting himself from sadness", "the writer covers the window, but the question is about a habit that makes goodbyes easier", ""], "The aunt leaves boxes unpacked so that “saying goodbye isn't so hard”: a way to protect herself from sadness.");
