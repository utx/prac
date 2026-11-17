/* ---------------------------------------------------------------
   STORM ISLAND: third set of reading passages (Nov 2026).
   Two are real public-domain classics, copied exactly from Project Gutenberg
   (via its GITenberg mirror on GitHub): L. M. Montgomery, "Anne of Green Gables"
   (1908, ebook #45) and A. B. "Banjo" Paterson, "Mulga Bill's Bicycle" (1896,
   in "Rio Grande's Last Race and Other Verses", ebook #304). The rest are original.
   --------------------------------------------------------------- */
(() => {
  const G = n => `<span data-g="${n}" class="gap">(${n}) ______</span>`;
  const gapQ = (id, n, options, answer, explain) => ({ id, gap: n, cat: "Vocabulary & idioms", stem: `<p>Which word fits <b>gap ${n}</b>?</p>`, options, answer, explain });
  const EX = ["Extract A", "Extract B", "Extract C", "Extract D"];
  const exQ = (id, cat, what, answer, explain) => ({ id, cat, stem: `<p>Which extract ${what}?</p>`, options: EX, answer, explain });

  /* ============ circle 1: cloze ============ */
  READING.push({
    id: "crystals", tier: 1, format: "cloze", title: "Seven Days",
    note: "Some words are missing from this piece about growing a crystal garden. Choose the word that fits each gap best.",
    html: `<p>The packet promised a sparkling crystal garden in just seven days. I followed the instructions to the ${G(1)}, dissolving the powder in hot water until not a single grain was left and pouring it gently over the little grey rocks in the tray.</p>
<p>Nothing happened on the first day, which I had been warned ${G(2)}. On the second morning, though, tiny ${G(3)} points had appeared on the tips of the rocks, like frost on a window.</p>
<p>By the fourth day the crystals were growing so ${G(4)} that I could see the difference between breakfast and dinner. I took a photograph every evening, and my little brother, who had ${G(5)} no interest at first, began to check on them before school.</p>
<p>On the seventh day the garden was finished, exactly as the packet had promised. Strangely, I felt almost ${G(6)}. Half the fun, it turned out, had been the waiting.</p>`,
    questions: [
      gapQ("r17a", 1, ["letter", "word", "point", "line"], 0, `<p>To follow instructions “<b>to the letter</b>” means exactly, every detail.</p><p class="why-not">“To the point” means short and relevant, which is about speaking, not following. “To the word” and “to the line” aren’t English phrases.</p>`),
      gapQ("r17b", 2, ["against", "for", "about", "with"], 2, `<p>You are <b>warned about</b> something that is going to happen: the packet warned that nothing would happen on day one.</p><p class="why-not">“Warned against” means told <i>not to do</i> something, which doesn’t fit. “Warned for” and “warned with” aren’t used this way.</p>`),
      gapQ("r17c", 3, ["glimpsing", "glancing", "glistening", "gleaning"], 2, `<p>Crystals catch the light: “tiny <b>glistening</b> points”, shiny like frost.</p><p class="why-not">The look-alikes are about people, not things that shine: you glimpse or glance at something with your eyes, and gleaning means gathering bits of information.</p>`),
      gapQ("r17d", 4, ["hastily", "rapidly", "eagerly", "hurriedly"], 1, `<p>The crystals grew <b>rapidly</b>: very fast. “Rapidly” describes the speed of something happening.</p><p class="why-not">“Hastily” and “hurriedly” mean doing something in a rush, as a person might, and “eagerly” means keenly. Crystals can’t be in a hurry or keen.</p>`),
      gapQ("r17e", 5, ["made", "put", "done", "shown"], 3, `<p>The set phrase is “<b>shown no interest</b>”: at first the brother didn’t seem interested at all.</p><p class="why-not">You can’t “make”, “do” or “put” interest in English.</p>`),
      gapQ("r17f", 6, ["relieved", "astonished", "triumphant", "disappointed"], 3, `<p>Read to the end: “Half the fun … had been the waiting.” Now the waiting is over, so the writer feels almost <b>disappointed</b>. “Strangely” tells us it is an unexpected feeling for someone whose garden worked.</p><p class="why-not">“Relieved” and “triumphant” would be the expected feelings, but “strangely” and the last sentence point the other way. Nothing surprising happened, so “astonished” doesn’t fit.</p>`),
    ],
  });

  /* ============ circle 1: missing sentences ============ */
  const CAT = [
    "Dogs, by contrast, are much less nimble.",
    "His photographs, taken one after another very quickly, showed what no eye could follow.",
    "A fall from a great height can still break legs or teeth.",
    "The front half of the body turns to match it.",
    "Cats are curious animals, and they do not always look before they leap.",
    "Kittens start to show it when they are about three or four weeks old.",
  ];
  const catQ = (id, n, answer, explain) => ({ id, gap: n, cat: "Sentence links", stem: `<p>Which sentence fits <b>gap ${n}</b>? (Each sentence is used once only, and one is not used at all.)</p>`, options: CAT, answer, explain });
  READING.push({
    id: "catfall", tier: 1, format: "missing sentences", title: "Four Paws Down", bank: true,
    note: "Five sentences have been taken out of this article. Choose the sentence that fits each gap. There is one extra sentence that is not needed.",
    html: `<p>Drop a cat from a low wall and it will almost always land neatly on all four paws. People wondered for centuries how cats manage it, and in 1894 a French scientist, Étienne-Jules Marey, finally found out with a camera. ${G(1)}</p>
<p>The pictures showed that a falling cat twists itself round in stages. First it turns its head to see which way is down. ${G(2)} Then the back half follows, swinging round until all four legs point at the ground. The whole movement takes a fraction of a second.</p>
<p>The trick is called the righting reflex. ${G(3)} By about seven weeks old, most of them have mastered it.</p>
<p>Landing on their feet does not mean that cats cannot be hurt. ${G(4)} Vets treat many cats every year that have slipped from balconies or windows, often while chasing a moth or a bird.</p>
<p>${G(5)} So if you have a curious cat, a screen on an upstairs window is a far better safety plan than trusting to luck.</p>`,
    questions: [
      catQ("r18a", 1, 1, `<p>Marey “found out with a camera”. The next sentence should say what the camera showed: <b>“His photographs … showed what no eye could follow.”</b> The paragraph after it begins “The pictures showed…”, which follows on.</p><p class="why-not">The sentence about dogs is on topic, but nothing before it is being compared.</p>`),
      catQ("r18b", 2, 3, `<p>First the head turns, and “Then the back half follows”. In between, the <b>front half</b> must turn: “The front half of the body turns to match it.” (“It” is the head.)</p><p class="why-not">Without this step the description jumps from the head straight to the back half.</p>`),
      catQ("r18c", 3, 5, `<p>“The righting reflex” is named, and the next sentence says “By about seven weeks old, most of <b>them</b> have mastered it”. “Them” needs a group to point back to: <b>kittens</b>.</p><p class="why-not">The sentence about dogs gives “them” the wrong animal: dogs don’t learn the righting reflex.</p>`),
      catQ("r18d", 4, 2, `<p>“Landing on their feet does not mean that cats cannot be hurt.” The gap gives an example of how they <b>can</b> be hurt: “A fall from a great height can still break legs or teeth.”</p><p class="why-not">The sentence about curious cats explains why they fall, which belongs at the start of the last paragraph, before “So”.</p>`),
      catQ("r18e", 5, 4, `<p>The last sentence begins “So”, giving advice. The gap must give the reason for it: cats <b>don’t always look before they leap</b>, so they can fall from windows.</p><p class="why-not">The sentence left over is the one about dogs: on topic, but it links to nothing in the article.</p>`),
    ],
  });

  /* ============ circle 2: poem (public-domain classic) ============ */
  READING.push({
    id: "mulga", tier: 2, format: "poem", title: "Mulga Bill’s Bicycle",
    note: "By A. B. “Banjo” Paterson, first published in 1896, when bicycles were new and exciting in Australia. “Blows” means boasts.",
    html: `<p class="poem">’Twas Mulga Bill, from Eaglehawk, that caught the cycling craze;
He turned away the good old horse that served him many days;
He dressed himself in cycling clothes, resplendent to be seen;
He hurried off to town and bought a shining new machine;
And as he wheeled it through the door, with air of lordly pride,
The grinning shop assistant said, ‘Excuse me, can you ride?’

‘See, here, young man,’ said Mulga Bill, ‘from Walgett to the sea,
From Conroy’s Gap to Castlereagh, there’s none can ride like me.
I’m good all round at everything, as everybody knows,
Although I’m not the one to talk — I HATE a man that blows.
But riding is my special gift, my chiefest, sole delight;
Just ask a wild duck can it swim, a wild cat can it fight.
There’s nothing clothed in hair or hide, or built of flesh or steel,
There’s nothing walks or jumps, or runs, on axle, hoof, or wheel,
But what I’ll sit, while hide will hold and girths and straps are tight:
I’ll ride this here two-wheeled concern right straight away at sight.’

’Twas Mulga Bill, from Eaglehawk, that sought his own abode,
That perched above the Dead Man’s Creek, beside the mountain road.
He turned the cycle down the hill and mounted for the fray,
But ere he’d gone a dozen yards it bolted clean away.
It left the track, and through the trees, just like a silver streak,
It whistled down the awful slope, towards the Dead Man’s Creek.

It shaved a stump by half an inch, it dodged a big white-box:
The very wallaroos in fright went scrambling up the rocks,
The wombats hiding in their caves dug deeper underground,
As Mulga Bill, as white as chalk, sat tight to every bound.
It struck a stone and gave a spring that cleared a fallen tree,
It raced beside a precipice as close as close could be;
And then as Mulga Bill let out one last despairing shriek
It made a leap of twenty feet into the Dead Man’s Creek.

’Twas Mulga Bill, from Eaglehawk, that slowly swam ashore:
He said, ‘I’ve had some narrer shaves and lively rides before;
I’ve rode a wild bull round a yard to win a five pound bet,
But this was the most awful ride that I’ve encountered yet.
I’ll give that two-wheeled outlaw best; it’s shaken all my nerve
To feel it whistle through the air and plunge and buck and swerve.
It’s safe at rest in Dead Man’s Creek, we’ll leave it lying still;
A horse’s back is good enough henceforth for Mulga Bill.’</p>`,
    questions: [
      { id: "r19a", cat: "Tone & attitude", stem: `<p>Mulga Bill says “<b>I’m not the one to talk — I HATE a man that blows</b>” (boasts). What makes this funny?</p>`,
        options: ["He says it in the middle of boasting about himself.", "He is frightened of the wind on the mountain road.", "He is cross with the shop assistant for grinning at him.", "He has never actually ridden a bicycle before."], answer: 0,
        explain: `<p>Every line around this one is a boast: “there’s none can ride like me”, “I’m good all round at everything”. Saying he hates boasters <b>while boasting</b> is the joke.</p><p class="why-not">“Blows” means boasts here, not wind. He doesn’t answer the grinning assistant crossly; he shows off. Whether he has ridden a bike before isn’t what makes this line funny.</p>` },
      { id: "r19b", cat: "Purpose of a detail", stem: `<p>Why does Mulga Bill say “<b>Just ask a wild duck can it swim, a wild cat can it fight</b>”?</p>`,
        options: ["To show how much he knows about wild animals", "To warn the assistant about animals on the road", "To suggest that asking if he can ride is a silly question", "To explain where and how he first learned to ride a horse"], answer: 2,
        explain: `<p>Of course a duck can swim and a wild cat can fight. Mulga Bill means his riding is just as obvious, so the assistant’s question is <b>silly</b>.</p><p class="why-not">The animals are a comparison, not real animals or a warning. He isn’t explaining anything about how he learned.</p>` },
      { id: "r19c", cat: "Comparisons & imagery", stem: `<p>In the fourth verse, the wallaroos scramble up the rocks and the wombats dig deeper underground. What do these lines add to the poem?</p>`,
        options: ["They show that the bush was full of dangerous animals.", "They explain why the bicycle swerved off the track.", "They show Mulga Bill stopping to look at the animals.", "They exaggerate how wild and frightening the ride was."], answer: 3,
        explain: `<p>Even the bush animals are terrified and hide: an <b>exaggeration</b> that makes the runaway ride seem wilder and funnier.</p><p class="why-not">The animals are frightened, not dangerous. The bike bolted because of the steep hill, not the animals, and Mulga Bill certainly doesn’t stop: he is “sat tight to every bound”.</p>` },
      { id: "r19d", cat: "Vocabulary & idioms", stem: `<p>At the end Mulga Bill says, “<b>I’ll give that two-wheeled outlaw best</b>.” What does he mean?</p>`,
        options: ["I admit that the bicycle has beaten me.", "I’ll give the bicycle to the best rider I know.", "I’ll catch the bicycle as if it were a bandit.", "I’ll ride it again once I’ve had a rest."], answer: 0,
        explain: `<p>To “give someone best” is an old way of saying they have won. He calls the bike an outlaw, as if it were a wild horse he couldn’t tame, and <b>admits defeat</b>.</p><p class="why-not">He leaves it “lying still” in the creek and goes back to horses, so he isn’t giving it away, chasing it or riding it again.</p>` },
      { id: "r19e", cat: "Character & structure", stem: `<p>How has Mulga Bill changed between the first verse and the last?</p>`,
        options: ["He has learned at last how to ride a bicycle properly.", "He has gone from boasting to admitting he was beaten.", "He has decided to sell his old horse after all.", "He has become frightened of riding horses."], answer: 1,
        explain: `<p>At the start he turns away his horse and boasts that “there’s none can ride like me”. At the end he admits it was “the most awful ride” and that a horse’s back is “good enough”: he has gone from <b>boasting to owning up</b>.</p><p class="why-not">He never learns to ride the bike. He goes back to his horse, so he isn’t selling it or afraid of it.</p>` },
    ],
  });

  /* ============ circle 2: four extracts ============ */
  READING.push({
    id: "shadows", tier: 2, format: "four extracts", title: "Shadows",
    note: "Read the four extracts about shadows. For each question, choose the extract that fits best.",
    html: `<div class="extract"><b class="tag">Extract A</b><p>The power went out on the second night of our camping trip, and with it went the lantern, the fan and my sister’s good mood. Dad found a torch, propped it on the esky and pointed it at the wall of the tent. Then his hands became a rabbit, a crocodile and a very bad eagle. By the time the power came back, nobody wanted the lights on.</p></div>
<div class="extract"><b class="tag">Extract B</b><p>A solar eclipse is a shadow on a giant scale. When the Moon passes exactly between the Sun and the Earth, its shadow races across the ground. Inside the darkest part, day turns to dusk for a few minutes, the air cools, and birds often fall silent as if night had come. A total eclipse is due to cross Australia in July 2028, passing right over Sydney.</p></div>
<div class="extract"><b class="tag">Extract C</b><p>Toby was certain that his shadow was copying him on purpose. When he waved, it waved. When he stamped, it stamped. One hot day he decided to run so fast it couldn’t keep up. He ran until the sun was high overhead, then stopped, panting, and looked down. The shadow had shrunk to a dark puddle under his feet. “Ha!” said Toby. “Too slow.”</p></div>
<div class="extract"><b class="tag">Extract D</b><p>Younger brothers and sisters spend years living in someone else’s shadow. Teachers say, “Your sister was brilliant at maths,” and coaches remember an older brother’s goals. It is meant kindly, but it makes a child feel like a copy. Every child deserves to be met as a beginner, not as the sequel to somebody else.</p></div>`,
    questions: [
      exQ("r20a", "Comparisons & imagery", "uses the word “shadow” for something that is not really a shadow", 3, `<p>In <b>Extract D</b>, “living in someone else’s shadow” is figurative: it means always being compared with an older brother or sister.</p><p class="why-not">The shadows in A, B and C are real ones, made by blocking light.</p>`),
      exQ("r20b", "Purpose of a detail", "describes animals behaving as if something had changed", 1, `<p>In <b>Extract B</b>, during an eclipse “birds often fall silent as if night had come”.</p><p class="why-not">The rabbit, crocodile and eagle in A are hand shadows, not real animals.</p>`),
      exQ("r20c", "Feelings & inference", "shows a character who misunderstands what is happening", 2, `<p>In <b>Extract C</b>, Toby thinks his shadow copies him “on purpose” and that he has outrun it. Really it is short because the sun is high overhead at midday.</p><p class="why-not">Dad in A and the writer of B understand exactly what shadows are.</p>`),
      exQ("r20d", "Feelings & inference", "describes turning a disappointment into something enjoyable", 0, `<p>In <b>Extract A</b>, the power cut spoils everyone’s mood, until Dad’s hand shadows make it so much fun that “nobody wanted the lights on”.</p><p class="why-not">Toby in C enjoys his “win”, but nothing disappointing happened first.</p>`),
      exQ("r20e", "Tone & attitude", "shows a character who believes he has won", 2, `<p>In <b>Extract C</b>, Toby looks down at his tiny shadow and says “Too slow”: he thinks he beat it in a race.</p><p class="why-not">Dad in A wins everyone over, but he doesn’t believe he has won a contest.</p>`),
    ],
  });

  /* ============ circle 3: story (public-domain classic) ============ */
  READING.push({
    id: "anne", tier: 3, format: "story", title: "Anne of Green Gables",
    note: "From Anne of Green Gables by L. M. Montgomery (1908). Anne Shirley, an orphan with red hair, has just started at the village school in Avonlea. Pupils wrote on small slates.",
    html: `<p>But it was not until the afternoon that things really began to happen.</p>
<p>Mr. Phillips was back in the corner explaining a problem in algebra to Prissy Andrews and the rest of the scholars were doing pretty much as they pleased eating green apples, whispering, drawing pictures on their slates, and driving crickets harnessed to strings, up and down aisle. Gilbert Blythe was trying to make Anne Shirley look at him and failing utterly, because Anne was at that moment totally oblivious not only to the very existence of Gilbert Blythe, but of every other scholar in Avonlea school itself. With her chin propped on her hands and her eyes fixed on the blue glimpse of the Lake of Shining Waters that the west window afforded, she was far away in a gorgeous dreamland hearing and seeing nothing save her own wonderful visions.</p>
<p>Gilbert Blythe wasn’t used to putting himself out to make a girl look at him and meeting with failure. She <i>should</i> look at him, that red-haired Shirley girl with the little pointed chin and the big eyes that weren’t like the eyes of any other girl in Avonlea school.</p>
<p>Gilbert reached across the aisle, picked up the end of Anne’s long red braid, held it out at arm’s length and said in a piercing whisper:</p>
<p>“Carrots! Carrots!”</p>
<p>Then Anne looked at him with a vengeance!</p>
<p>She did more than look. She sprang to her feet, her bright fancies fallen into cureless ruin. She flashed one indignant glance at Gilbert from eyes whose angry sparkle was swiftly quenched in equally angry tears.</p>
<p>“You mean, hateful boy!” she exclaimed passionately. “How dare you!”</p>
<p>And then—thwack! Anne had brought her slate down on Gilbert’s head and cracked it—slate not head—clear across.</p>
<p>Avonlea school always enjoyed a scene. This was an especially enjoyable one. Everybody said “Oh” in horrified delight. Diana gasped. Ruby Gillis, who was inclined to be hysterical, began to cry. Tommy Sloane let his team of crickets escape him altogether while he stared open-mouthed at the tableau.</p>`,
    questions: [
      { id: "r21a", cat: "Vocabulary & idioms", stem: `<p>Anne was “<b>totally oblivious</b>” to Gilbert and the other scholars. What does “oblivious” mean here?</p>`,
        options: ["annoyed by", "not aware of", "frightened of", "jealous of"], answer: 1,
        explain: `<p>Anne is daydreaming, “hearing and seeing nothing save her own wonderful visions”. She is <b>not aware of</b> anyone around her.</p><p class="why-not">She becomes annoyed only later, when Gilbert calls her “Carrots”. Nothing suggests she is frightened or jealous.</p>` },
      { id: "r21b", cat: "Purpose of a detail", stem: `<p>Why does the writer describe the other scholars eating green apples, whispering and racing crickets up the aisle?</p>`,
        options: ["To show that Avonlea was a cheerful and friendly school", "To show how little the teacher was watching the class", "To show that Anne was the only pupil doing her work", "To explain why Anne was staring out of the window"], answer: 1,
        explain: `<p>Mr Phillips is busy in the corner with one pupil, and everyone else is doing “pretty much as they pleased”. The detail shows <b>nobody is watching the class</b>, which is how Gilbert’s trick can happen.</p><p class="why-not">Anne isn’t working: she is daydreaming. The window detail comes from her own dreaminess, not from the others’ games.</p>` },
      { id: "r21c", cat: "Feelings & inference", stem: `<p>“She <b><i>should</i></b> look at him”. What does the word “should”, in italics, tell us about Gilbert?</p>`,
        options: ["He thinks Anne ought to be listening to Mr Phillips’s algebra lesson.", "He is worried that Anne might be feeling unwell.", "He feels he deserves her attention and is put out not to get it.", "He wants Anne to see the trick he played on Ruby."], answer: 2,
        explain: `<p>Gilbert “wasn’t used to … meeting with failure”. The stressed “should” shows he thinks <b>she ought to be noticing him</b>, and he is put out that she isn’t.</p><p class="why-not">He doesn’t care about the lesson: he is the one being a nuisance. Nothing suggests worry, and the trick on Ruby isn’t in this passage.</p>` },
      { id: "r21d", cat: "Vocabulary & idioms", stem: `<p>When Anne springs up, “her bright fancies [have] <b>fallen into cureless ruin</b>”. What does this mean?</p>`,
        options: ["She can no longer remember what the lake looks like.", "Her hopes of making friends at school are spoiled.", "She feels ill after eating too many green apples.", "Her lovely daydream has been completely destroyed."], answer: 3,
        explain: `<p>Her “bright fancies” are the “wonderful visions” she was lost in. “Cureless ruin” means wrecked beyond repair: Gilbert has <b>completely shattered her daydream</b>.</p><p class="why-not">It is her dream that is ruined, not her memory of the lake or her friendships. The green apples were eaten by the other scholars.</p>` },
      { id: "r21e", cat: "Tone & attitude", stem: `<p>Why does the writer add the words “<b>slate not head</b>”?</p>`,
        options: ["To reassure the reader, in a funny way, about what broke", "To show that Gilbert was badly hurt by the blow to his head", "To explain that slates in those days broke easily", "To show that Anne had missed Gilbert completely"], answer: 0,
        explain: `<p>“Cracked it … clear across” could sound as if Gilbert’s head was cracked. The quick aside puts it right with a joke: it was the <b>slate</b> that broke.</p><p class="why-not">The slate came down on his head, so she didn’t miss. The aside tells us he wasn’t badly hurt, and it isn’t about slates in general.</p>` },
      { id: "r21f", cat: "Feelings & inference", stem: `<p>“Everybody said ‘Oh’ in <b>horrified delight</b>.” What does this suggest about the other children?</p>`,
        options: ["They were afraid they would all be punished.", "They thought Anne should be sent home from school at once.", "They were shocked but secretly thrilled by the drama.", "They felt very sorry for Gilbert."], answer: 2,
        explain: `<p>“Avonlea school always enjoyed a scene.” The children are horrified, but they are also <b>delighted</b> to have something exciting to watch.</p><p class="why-not">“Delight” rules out real fear or pity. Nobody says Anne should be sent home: they are too busy staring.</p>` },
    ],
  });

  /* ============ circle 3: story ============ */
  READING.push({
    id: "baton", tier: 3, format: "story", title: "The Handover",
    note: "Read the story, then answer the questions.",
    html: `<p>Kiri had practised the handover forty times at lunchtime, until even Mr Lowe said she could stop. Left hand back, palm open, eyes forward. Don’t look. Never look.</p>
<p>On the day, the stands were full of parents in sunhats, and the grass smelt of sunscreen and cut clover. Kiri was third. She stood in the changeover box and shook out her hands, one, two, three, the way the big kids did on television.</p>
<p>Ollie came round the bend with his face screwed up, the baton held out in front of him like a torch. Kiri started to run. Left hand back. Palm open. Eyes forward.</p>
<p>She felt the baton touch her fingers, and then she didn’t feel it.</p>
<p>She looked. Of course she looked. It was rolling in a slow, silly circle on the track behind her, and by the time she had snatched it up, two blue shirts and a green one had gone past.</p>
<p>She ran the rest of her leg so hard that her ears rang. Tash, the last runner, took the baton cleanly and set off after the others, but there was too much track to make up. They came fourth out of four.</p>
<p>Afterwards Kiri sat under the gum tree with her shoes off and examined her laces with great interest.</p>
<p>Someone sat down beside her. It was Tash, holding out half an orange.</p>
<p>“Last year,” said Tash, “I dropped it in the final. In front of the whole district.” She bit into her own half. “My dad still has the video. He plays it every Christmas.”</p>
<p>Kiri looked at her. “Really?”</p>
<p>“Every Christmas,” said Tash gravely. “He says it’s his favourite bit.”</p>
<p>Kiri took the orange. After a while, she found that she was laughing.</p>`,
    questions: [
      { id: "r22a", cat: "Character & structure", stem: `<p>“<b>Left hand back, palm open, eyes forward. Don’t look. Never look.</b>” Why is this written as short commands?</p>`,
        options: ["It shows Mr Lowe shouting at Kiri during the race.", "It shows the instructions Kiri has drilled into herself.", "It shows that Kiri found Mr Lowe’s rules for the handover confusing.", "It shows that the race was just about to start."], answer: 1,
        explain: `<p>Kiri has practised forty times, and the same words come back during the race. They are the <b>rules she keeps repeating to herself</b>.</p><p class="why-not">Mr Lowe isn’t at the handover; the words are in Kiri’s head. They are short because they are well learned, not confusing, and they appear before the race as well as during it.</p>` },
      { id: "r22b", cat: "Purpose of a detail", stem: `<p>“<b>She felt the baton touch her fingers, and then she didn’t feel it.</b>” What does this sentence do?</p>`,
        options: ["It shows that Kiri’s hands were numb from shaking them.", "It shows that Ollie never really passed the baton across to her.", "It shows that Kiri had stopped concentrating.", "It lets us live the mistake the way Kiri did, all at once."], answer: 3,
        explain: `<p>The sentence doesn’t say “she dropped it”. Like Kiri, we only notice that something is wrong when the baton <b>isn’t there any more</b>. We experience the moment as she does.</p><p class="why-not">The baton did touch her fingers, so Ollie did pass it. Shaking her hands was a warm-up, and she was concentrating hard on the drill.</p>` },
      { id: "r22c", cat: "Feelings & inference", stem: `<p>“<b>She looked. Of course she looked.</b>” What do the words “of course” suggest?</p>`,
        options: ["Looking back for the baton is the right thing to do in a relay race.", "She wanted to see where the other runners were.", "After all that practice, she still did the one forbidden thing.", "Mr Lowe had told her to check behind her."], answer: 2,
        explain: `<p>Her one rule was “Don’t look. Never look.” “Of course” sounds like Kiri <b>blaming herself</b>: in the moment that mattered, she did exactly what she had trained not to do.</p><p class="why-not">The training says the opposite: never look. She looks for the baton, not the other runners, and Mr Lowe never told her to check behind her.</p>` },
      { id: "r22d", cat: "Feelings & inference", stem: `<p>After the race, Kiri “<b>examined her laces with great interest</b>”. Why?</p>`,
        options: ["Her laces had come undone while she was running her part of the race.", "She was avoiding everyone’s eyes because she felt ashamed.", "She was planning to buy new running shoes.", "She was bored waiting for the next race."], answer: 1,
        explain: `<p>Nobody finds laces that interesting. Staring at them is a way of <b>not looking at anyone</b>, because she feels she let her team down.</p><p class="why-not">Her shoes are off, so the laces are not the problem, and nothing mentions new shoes. She isn’t bored; she is upset.</p>` },
      { id: "r22e", cat: "Character & structure", stem: `<p>Why does Tash tell Kiri about the baton she dropped last year?</p>`,
        options: ["To show Kiri that a mistake like hers can be survived and laughed about", "To boast that she was fast enough to be picked for the district final last year", "To warn Kiri that her own mistake will be filmed too", "To blame herself for the team coming fourth"], answer: 0,
        explain: `<p>Tash shares a worse mistake, in a bigger race, that her family now laughs about. She is showing Kiri that this <b>can be survived, and even become funny</b>. It works: Kiri ends up laughing.</p><p class="why-not">Tash talks about dropping the baton, not about being good. Nothing says Kiri was filmed, and Tash ran cleanly, so she has nothing to blame herself for.</p>` },
      { id: "r22f", cat: "Tone & attitude", stem: `<p>“<b>‘Every Christmas,’ said Tash gravely. ‘He says it’s his favourite bit.’</b>” Why does Tash say this “gravely”?</p>`,
        options: ["She is still upset about losing the final.", "She is still angry with her dad for keeping the video of it.", "She is telling Kiri off for dropping the baton.", "She keeps a straight face to make the story funnier."], answer: 3,
        explain: `<p>A dad playing your worst moment every Christmas is funny, and saying it with a <b>serious face</b> makes it funnier. That is the joke that gets Kiri laughing.</p><p class="why-not">If Tash were upset or angry she wouldn’t be sharing her orange and cheering Kiri up. She never criticises Kiri.</p>` },
    ],
  });
})();
