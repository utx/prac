/* ---------------------------------------------------------------
   CROWN QUEST: Story Forest (reading). Four options (A–D).
   All passages are original and written for this game.
   --------------------------------------------------------------- */
(() => {
  const gap = s => `<p class="gapline">${s.replace("___", '<span class="gapw">&nbsp;</span>')}</p><p>Which word fits the gap best?</p>`;
  const EXTRACTS = ["Extract A", "Extract B", "Extract C", "Extract D"];

  const OVERDUE = {
    title: "Overdue",
    html: `<p>Priya found it on Saturday, wedged behind the couch cushions with a sock and two biscuit crumbs for company: <em>The Atlas of Deep-Sea Creatures</em>. The library stamp inside said it was due back on 3 March. Three years ago.</p>
<p>She did the sum twice. Twenty cents a day, for more than a thousand days. Her money box rattled thinly when she shook it.</p>
<p>On Monday she walked to the library the long way, past the bakery and twice around the fountain. At the desk she slid the book across with one finger, as though it might bite, and placed her money box beside it.</p>
<p>Mr Abbas turned the book over. He opened it to the stamp and his eyebrows rose. Then he opened it somewhere in the middle, where a page had been read so often that its corner had gone as soft as cloth.</p>
<p>“The anglerfish page,” he said. “It was my favourite too.”</p>
<p>He pushed the money box back towards her. “We stopped charging fines last year,” he said. “But our new book about volcanoes is looking for a good home for three weeks. Interested?”</p>`,
  };

  const POEM = {
    title: "Crossing",
    html: `<p class="poem">After the rain the path is a river of light,
and here comes the snail,
carrying his house like a sailor
who will not leave his ship.

He does not hurry.
He writes his name behind him
in one long silver line
that only the morning can read.

A blackbird tilts its head.
A bicycle hisses past.
The snail pulls in his horns, waits,
and puts them out again:

two small questions
asked of the enormous air.

By noon the path is dry,
the silver letters gone,
and under the ivy, safe at home
(he was never anywhere else),
the snail is fast asleep.</p>`,
  };

  const MAPS = {
    title: "Finding the Way",
    note: "Read the four extracts. For each question, choose the extract it describes.",
    html: `<div class="extract"><b class="tag">Extract A</b>Dad refused to use the phone. He spread the map over the bonnet of the car like a tablecloth, pinned its corners with his keys and my drink bottle, and ran a finger along a thin red line. “Forty minutes,” he said. Two hours later we were eating our sandwiches beside a paddock gate that was, according to the map, a town. I have never been so happily lost.</div>
<div class="extract"><b class="tag">Extract B</b>The map had been drawn in brown ink on the back of a seed packet. Wren turned it one way, then the other. A cross, a wobbly line, three trees. “It's Grandad's garden,” said Oli. “It could be anywhere,” said Wren, but she was already pulling on her boots.</div>
<div class="extract"><b class="tag">Extract C</b>For most of history, mapmakers had to guess at what they had not seen. Coastlines were sketched from sailors' reports, and the blank spaces were often filled with pictures of imagined beasts rather than left empty. Only when surveyors began carefully measuring the land itself, in the 1700s, did maps become accurate enough to trust with your life.</div>
<div class="extract"><b class="tag">Extract D</b>Children should still learn to read a paper map. A screen shows you only the next turn. A map shows you the whole country around it, so that you understand where you are and not merely where to go. Batteries run flat. Signals vanish in the hills. A map asks for nothing but a little patience.</div>`,
  };

  const PROMPTER = {
    title: "The Prompter",
    html: `<p>For six weeks Tamsin had sat on a stool in the wings with the script on her knees, and for six weeks nobody had needed her. That was the job of a prompter: to know every line of the play and never say one.</p>
<p>On the night, the hall was full. Through a gap in the curtain she could see Joel, as the old king, striding about in his cardboard crown. He was magnificent. He was also, she noticed, gripping his sceptre the way you grip the railing of a boat.</p>
<p>“And so,” boomed Joel, “I say to you all …”</p>
<p>The silence that followed was only three seconds long. Tamsin counted them. In the front row a programme rustled.</p>
<p>She did not look at the script. “A kingdom is not a thing you own,” she breathed, just loudly enough.</p>
<p>“A kingdom,” Joel thundered, as if he had merely paused to let the thought ripen, “is not a thing you own!”</p>
<p>Afterwards the cast took four bows. Parents stamped. Joel was lifted onto somebody's shoulders, crown and all. Tamsin stacked the stools.</p>
<p>She was switching off the lamp when the crown appeared round the edge of the curtain, with Joel under it. He held out a paper cup of lemonade, a little spilt.</p>
<p>“Three seconds,” he said. “It felt like the whole of Year 4.”</p>
<p>“It was a good pause,” said Tamsin. “Very royal.”</p>
<p>He laughed, set the cup on her stool, and went. Tamsin drank it slowly. It was warm and far too sweet, and she could not remember tasting anything better.</p>`,
  };

  WORLDS.push({
    id: "reading", name: "Story Forest", icon: "🌲", color: "#2e7d4f", crown: "Leaf Crown",
    blurb: "Words, poems and stories hide their secrets here. Inkwing the dragon guards the Leaf Crown.",
    boss: { name: "Inkwing the Dragon", emoji: "🐉", taunt: "Anyone can read the words. Can you read what hides between them?", defeat: "Inkwing curls up around a book, purring smoke. The forest is yours." },
    levels: [
      {
        id: "r1", name: "Word Glade",
        questions: [
          { id: "r1a", cat: "Vocabulary & idioms",
            stem: gap("After a week of heavy rain, the river finally ___ its banks and flooded the paddocks."),
            options: ["tore", "burst", "split", "cracked"], answer: 1,
            hint: `Think about water pushing harder and harder until it suddenly escapes, like a balloon filled too full.`,
            explain: `<p>A river that overflows is said to <b>burst its banks</b>. The words go together as a pair: the water presses until it suddenly breaks out.</p><p class="why-not">Tore, split and cracked all mean something breaking, but they describe solid things such as cloth, wood or glass. We don't use them with a river's banks.</p>` },
          { id: "r1b", cat: "Vocabulary & idioms",
            stem: gap("Over thousands of years, camels have ___ to life in the desert."),
            options: ["adopted", "admitted", "adapted", "attracted"], answer: 2,
            hint: `Two of these words look almost the same. One means “taken in as your own”; the other means “changed to suit a place”.`,
            explain: `<p>To <b>adapt</b> to something is to change so that you suit it. Camels have adapted to the desert: they can go a long time without water.</p><p class="why-not"><em>Adopted</em> looks very similar, but it means to take something as your own (you adopt a pet). <em>Admitted</em> means owned up or let in, and <em>attracted</em> means drew towards.</p>` },
          { id: "r1c", cat: "Vocabulary & idioms",
            stem: gap("The mayor ___ a short speech before she cut the ribbon."),
            options: ["told", "spoke", "said", "delivered"], answer: 3,
            hint: `Three of these are about talking but don't sit next to “a speech”. Try each one aloud: “she ___ a speech”.`,
            explain: `<p>You <b>deliver</b> a speech (or give or make one). It is a fixed pair of words.</p><p class="why-not">You tell a story, speak <em>to</em> someone and say a word, but you don't “tell”, “speak” or “say” a speech.</p>` },
          { id: "r1d", cat: "Vocabulary & idioms",
            stem: gap("With its engine dead, the little boat was at the ___ of the waves."),
            options: ["mercy", "power", "force", "anger"], answer: 0,
            hint: `The boat is helpless: the waves can do what they like with it. Which word completes the saying “at the ___ of”?`,
            explain: `<p>To be <b>at the mercy of</b> something means to be helpless against it. Without its engine, the boat can't fight the waves.</p><p class="why-not">Power, force and anger all suit stormy waves, but “at the power of” and “at the force of” are not expressions in English.</p>` },
        ],
      },
      {
        id: "r2", name: "Whispering Path", passage: OVERDUE,
        questions: [
          { id: "r2a", cat: "Purpose of a detail",
            stem: `<p>The writer says Priya's money box “<b>rattled thinly</b>”. What does this detail tell us?</p>`,
            options: ["The money box was made of thin metal.", "Priya shook it too gently to hear it properly.", "It held far too little to pay the fine.", "Priya had already spent her money on books."], answer: 2,
            hint: `Read the sentence just before it. Priya has worked out a very big sum. Now think what a nearly empty money box sounds like.`,
            explain: `<p>Twenty cents a day for over a thousand days is more than two hundred dollars. A money box that rattles “thinly” has only a few coins in it. The writer puts the two side by side to show that <b>Priya can't possibly pay</b>.</p><p class="why-not">“Thinly” describes the sound of a few coins, not the metal. Nothing says she shook it gently or had spent her money on books.</p>` },
          { id: "r2b", cat: "Feelings & inference",
            stem: `<p>Priya walks to the library “<b>the long way, past the bakery and twice around the fountain</b>”. Why?</p>`,
            options: ["She is putting off the moment when she must own up.", "She wants to buy something from the bakery first.", "She has forgotten the quickest way to the library.", "She enjoys looking at the fountain on her way to school."], answer: 0,
            hint: `Nobody needs to walk around a fountain <b>twice</b> to get somewhere. How is she feeling about arriving?`,
            explain: `<p>Going the long way, and circling the fountain twice, is what people do when they dread arriving. Priya is nervous about handing the book back, so <b>she is putting it off</b>. The writer shows her feelings through what she does.</p><p class="why-not">She passes the bakery but doesn't go in. She isn't lost: she chooses the long way. Nothing suggests she is on her way to school.</p>` },
          { id: "r2c", cat: "Purpose of a detail",
            stem: `<p>Why does the writer mention that one page's corner had gone “<b>as soft as cloth</b>”?</p>`,
            options: ["To show that the book was old and badly made.", "To show that the book had been loved, not just lost.", "To explain why the library had bought a new book.", "To suggest that Priya had damaged the book on purpose."], answer: 1,
            hint: `How does a paper corner become soft? Think about what Priya must have done with that page, again and again.`,
            explain: `<p>A corner goes soft when a page is turned again and again. The detail shows that Priya didn't simply forget the book: she read it, especially that page, many times. <b>It had been loved.</b> That is what Mr Abbas notices.</p><p class="why-not">The softness comes from reading, not from poor quality or deliberate damage. The new book is about volcanoes; it doesn't replace this one.</p>` },
          { id: "r2d", cat: "Character & structure",
            stem: `<p>What do Mr Abbas's last words, about the volcano book, show about him?</p>`,
            options: ["He has forgotten that Priya kept a book for three years.", "He trusts Priya and wants her to keep on borrowing.", "He thinks Priya ought to read about something other than fish.", "He wants Priya to pay for the new book instead of the fine."], answer: 1,
            hint: `Priya expects to be in trouble. Instead he offers her another book, and says “for three weeks” with a smile in it. What is he telling her?`,
            explain: `<p>Priya has just returned a book three years late, yet Mr Abbas offers her another one. He recognises a real reader (the anglerfish page was his favourite too). The gentle joke in “for three weeks” shows he hasn't forgotten, but <b>he trusts her and wants her to keep borrowing</b>.</p><p class="why-not">He hasn't forgotten: “three weeks” is a friendly reminder. He pushes her money back, so he isn't asking her to pay for anything.</p>` },
        ],
      },
      {
        id: "r3", name: "Poet's Hollow", passage: POEM,
        questions: [
          { id: "r3a", cat: "Comparisons & imagery",
            stem: `<p>In the first verse, what is the snail compared to?</p>`,
            options: ["a river that shines after the rain", "a house that has been left empty", "a ship that is sailing slowly away", "a sailor who stays with his ship"], answer: 3,
            hint: `Find the word “like” in the first verse. What comes straight after it?`,
            explain: `<p>The poet says the snail carries his house “like <b>a sailor who will not leave his ship</b>”. The snail is the sailor and the shell is the ship he never leaves.</p><p class="why-not">The “river of light” is the wet path, not the snail. The ship stands for the shell, and nothing in the poem is sailing away or left empty.</p>` },
          { id: "r3b", cat: "Comparisons & imagery",
            stem: `<p>“He writes his name behind him / in one long silver line”. What is the “silver line”?</p>`,
            options: ["a scratch that the shell makes on the ground", "a streak of sunlight across the wet path", "the shiny trail the snail leaves as it moves", "a crack in the path where rain has collected"], answer: 2,
            hint: `The line is <b>behind</b> him and he makes it himself. What do snails leave wherever they have been?`,
            explain: `<p>A snail leaves a shiny trail of slime that glints silver in the light. The poet imagines it as <b>writing</b>: the snail signing his name on the path.</p><p class="why-not">Sunlight and puddles are on the path, but the snail doesn't make them. A shell doesn't drag along the ground and scratch it.</p>` },
          { id: "r3c", cat: "Feelings & inference",
            stem: `<p>The snail's horns are called “<b>two small questions / asked of the enormous air</b>”. What does this suggest?</p>`,
            options: ["The snail is lost and is looking for the way home.", "The snail is carefully testing whether it is safe to go on.", "The blackbird and the bicycle are wondering about the snail.", "The poet is not sure what kind of animal this is."], answer: 1,
            hint: `Look at what has just happened: a bird, a bicycle, horns pulled in, a wait. Why would the horns come out slowly again?`,
            explain: `<p>After the blackbird and the bicycle, the snail pulls in his horns and waits. When he puts them out again, it is as if he is asking, “Is it safe now?” The words “small” and “enormous” show how tiny he is in a big, risky world. <b>He is testing whether it is safe.</b></p><p class="why-not">He isn't lost: he reaches the ivy. The “questions” belong to the snail's horns, not to the bird, the bicycle or the poet.</p>` },
          { id: "r3d", cat: "Purpose of a detail",
            stem: `<p>In the last verse the poet says the snail is “safe at home / <b>(he was never anywhere else)</b>”. Why does the poet add the words in brackets?</p>`,
            options: ["Because the snail only dreamed of crossing the path.", "Because the snail sleeps under the same ivy every day.", "Because the snail carries his home with him.", "Because the poet did not see where the snail had been."], answer: 2,
            hint: `Go back to the first verse. What was the snail carrying the whole way across the path?`,
            explain: `<p>The first verse told us the snail carries his house on his back. So however far he travels, he is always “at home”. The brackets are a small joke that sends us back to the beginning: <b>his home goes wherever he goes</b>.</p><p class="why-not">The crossing was real: the path dried and the silver trail faded. The poem doesn't say he always sleeps under this ivy, and the poet watched the whole journey.</p>` },
        ],
      },
      {
        id: "r4", name: "Four Lanterns", passage: MAPS,
        questions: [
          { id: "r4a", cat: "Feelings & inference",
            stem: `<p>Which extract shows a person whose <b>actions do not match her words</b>?</p>`,
            options: EXTRACTS, answer: 1,
            hint: `Look for someone who <b>says</b> one thing (a doubt) while <b>doing</b> another (getting ready).`,
            explain: `<p>In <b>Extract B</b>, Wren says, “It could be anywhere,” which sounds as if she thinks the search is hopeless. But she is “already pulling on her boots”: she can't wait to start looking.</p><p class="why-not">In Extract A, Dad does exactly what he says (he refuses the phone and uses the map), even though it goes wrong.</p>` },
          { id: "r4b", cat: "Main idea",
            stem: `<p>Which extract argues that <b>knowing your route</b> is not the same as <b>understanding your surroundings</b>?</p>`,
            options: EXTRACTS, answer: 3,
            hint: `Find the extract that compares two ways of finding your way, and says what one of them leaves out.`,
            explain: `<p><b>Extract D</b> says a screen “shows you only the next turn”, while a map lets you “understand where you are and not merely where to go”. That is the difference between following a route and understanding the land around you.</p><p class="why-not">Extract A also has a phone and a map, but it tells a funny story; it doesn't argue a point.</p>` },
          { id: "r4c", cat: "Tone & attitude",
            stem: `<p>Which extract describes <b>something going wrong that the writer ended up enjoying</b>?</p>`,
            options: EXTRACTS, answer: 0,
            hint: `Look for two words side by side that don't usually belong together: one for a feeling, one for a problem.`,
            explain: `<p>In <b>Extract A</b>, a forty-minute drive turns into two hours and the “town” is a paddock gate. Yet the writer ends, “I have never been so <b>happily lost</b>.” The trip went wrong and became a favourite memory.</p><p class="why-not">Extract C describes mistakes on old maps, but nobody is enjoying them. In Extract B, nothing has gone wrong yet.</p>` },
          { id: "r4d", cat: "Main idea",
            stem: `<p>Which extract explains how something <b>became more reliable over time</b>?</p>`,
            options: EXTRACTS, answer: 2,
            hint: `“Over time” means the extract must tell us about a <b>before</b> and an <b>after</b>.`,
            explain: `<p><b>Extract C</b> starts with mapmakers who “had to guess” and ends with maps “accurate enough to trust with your life”, once surveyors began measuring the land. That is something becoming more reliable.</p><p class="why-not">Extract D says maps can be relied on (no batteries, no signal), but it doesn't describe them changing over time.</p>` },
        ],
      },
      {
        id: "rb", name: "Inkwing the Dragon", boss: true, passage: PROMPTER,
        questions: [
          { id: "rba", cat: "Comparisons & imagery",
            stem: `<p>Joel is “gripping his sceptre <b>the way you grip the railing of a boat</b>”. What does this comparison tell us?</p>`,
            options: ["The sceptre was heavy and awkward to hold.", "Joel was pretending that the stage was a ship.", "Joel was far more nervous than he looked.", "Joel felt ill from walking about so much."], answer: 2,
            hint: `When do people hold a boat's railing tightly? Now look at the sentence before: “He was magnificent. He was <b>also</b> …”`,
            explain: `<p>You grip a boat's railing hard when you feel unsteady and are afraid of falling. From the hall Joel looks “magnificent”, but Tamsin, close by, sees his tight grip. Under the booming voice, <b>he is nervous</b>. It also prepares us for the moment he forgets his line.</p><p class="why-not">The comparison is about how tightly he holds on, not the sceptre's weight. There is no ship in the play, and nothing says he feels ill.</p>` },
          { id: "rbb", cat: "Purpose of a detail",
            stem: `<p>Why does the writer include the short sentence “<b>She did not look at the script.</b>”?</p>`,
            options: ["To show how completely Tamsin knew the play.", "To show that it was too dark in the wings to read.", "To suggest that Tamsin had lost her place.", "To hint that she made the line up herself."], answer: 0,
            hint: `Remember what the first paragraph says a prompter's job is: “to know every line …”`,
            explain: `<p>The script is on her knees, but she doesn't need it. After six weeks of sitting unnoticed, <b>she knows every line by heart</b>, and the right words come at once. The sentence shows how well she has done a job nobody has seen.</p><p class="why-not">She has a lamp, so it isn't too dark. Joel repeats her line and the play carries on, so it was the real line, not one she invented or guessed at.</p>` },
          { id: "rbc", cat: "Feelings & inference",
            stem: `<p>Joel says his line “<b>as if he had merely paused to let the thought ripen</b>”. What does this suggest?</p>`,
            options: ["He had planned the long pause before the show.", "He was cross with Tamsin for interrupting him.", "He was speaking slowly so that he would not forget again.", "He made the silence seem like part of his acting."], answer: 3,
            hint: `Notice “as if”. It tells you what the pause <b>looked like</b> to the audience, not what really happened.`,
            explain: `<p>Fruit ripens when it is given time. Joel carries on as though he had stopped on purpose to let his words sink in. “As if” tells us it wasn't true, but the audience would never know: <b>he turned the silence into part of his performance</b>.</p><p class="why-not">The pause wasn't planned: he had forgotten the line and felt it “like the whole of Year 4”. He “thundered” the line, which isn't slow or cross.</p>` },
          { id: "rbd", cat: "Character & structure",
            stem: `<p>At the end, Joel brings Tamsin a cup of lemonade and says, “Three seconds.” What is he really doing?</p>`,
            options: ["Asking her to keep his mistake a secret.", "Thanking her, without saying so directly.", "Complaining that she took too long to help.", "Boasting about how well he covered it up."], answer: 1,
            hint: `He leaves the cheering crowd to find the one person who was stacking stools. He never says “thank you”. Does he need to?`,
            explain: `<p>Joel leaves his own celebration to find Tamsin, brings her a drink, and admits how frightening those three seconds were. He never uses the words, but everything he does says <b>thank you</b>: he knows who saved him.</p><p class="why-not">He doesn't ask her for anything, so he isn't asking for secrecy. He admits how long it felt, which is the opposite of boasting, and he laughs with her rather than complaining.</p>` },
          { id: "rbe", cat: "Feelings & inference",
            stem: `<p>The lemonade is “warm and far too sweet”, yet Tamsin “could not remember tasting anything better”. Why?</p>`,
            options: ["She was thirsty after sitting in the hot wings all night.", "She was relieved that the play was finally over.", "She was hardly ever allowed sweet drinks at home.", "It meant that someone had noticed what she did."], answer: 3,
            hint: `The drink itself isn't nice, so the reason can't be the taste. Think about the whole story: who has noticed Tamsin until now?`,
            explain: `<p>All night, and for six weeks before, nobody needed or noticed Tamsin. While the cast took four bows, she stacked stools. The lemonade isn't good lemonade; it tastes wonderful because of what it stands for: <b>someone saw what she did and valued it</b>.</p><p class="why-not">The story never mentions thirst, heat or rules at home, and a warm, too-sweet drink wouldn't be the best thing for thirst. Relief that the play is over wouldn't make this one cup special.</p>` },
        ],
      },
    ],
  });
})();
