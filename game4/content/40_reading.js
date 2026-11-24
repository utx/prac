/* RIDGE RUNNER: hand-written reading questions (A–D). All texts are our own.
   Each text builds one reading skill at a time, at test level from step 1 (story extracts of about 80–150 words);
   eight per step, answer letters spread evenly within each step (each letter twice). */
const P = t => `<div class="passage">${t}</div>`;
/* ---------- Reading between the lines ---------- */
H("infer", 1, "ri1a", { passage: P(`<p>The high ropes course began with a ladder that ran straight up the trunk of a gum tree. Callum let the two boys behind him go first. “You go,” he said. “I'm still fixing my harness.” He had already checked the buckles three times.</p><p>When the instructor clipped him onto the safety line, Callum kept his eyes on the bark in front of his nose and counted the rungs under his breath. Halfway up, a magpie warbled somewhere above him. He did not look up to see where it was.</p>`),
  stem: `<p>Which of these best describes how Callum feels as he begins the climb?</p>`,
  opts: [["He is excited and can't wait to reach the top.", "he lets the others go first, which is the opposite of being eager"],
    ["He is annoyed that the other boys pushed in front of him.", "nobody pushes in: Callum TELLS them to go first"],
    ["He is frightened of the height but trying not to show it.", null],
    ["He is more interested in the birds than in the climb.", "he hears the magpie but doesn't even look up"]],
  body: "The writer never says “scared”, but SHOWS it: Callum makes an excuse to go last, checks his buckles again and again, and won't look anywhere but the bark in front of him." });
H("infer", 1, "ri1b", { passage: P(`<p>Aunt Fen had knitted the jumper herself. It was mustard yellow, with a brown reindeer across the front whose antlers did not quite match.</p><p>“Do you love it?” she asked, her hands clasped under her chin.</p><p>Mei held it up and smiled so widely that her cheeks ached. “It's so … warm,” she said.</p><p>Later, when Aunt Fen had gone home, Mei folded the jumper very neatly and pushed it to the back of her bottom drawer, under her swimming costume. Then, after a moment, she took it out again and laid it on top.</p>`),
  stem: `<p>What does the passage suggest about Mei?</p>`,
  opts: [["She loves the jumper and wants to keep it safe.", "she folds it neatly, but she hides it at the back of a drawer at first"],
    ["She dislikes the jumper but cares about her aunt's feelings.", null],
    ["She is planning to give the jumper away to someone else in her family.", "nothing suggests that; she keeps it in her own drawer"],
    ["She is upset that her aunt has gone home.", "the passage is about the jumper; nothing shows she misses her aunt"]],
  body: "The forced smile and the pause before “warm” show she doesn't like it. Taking it out again and putting it on top shows she feels bad about hiding a present her aunt made with love." });
H("infer", 1, "ri1c", { passage: P(`<p>“You'll be fine,” said Mum, pulling on her coat. “We're only next door, and the number's on the fridge.”</p><p>When the front door closed, Arlo stood very still in the hallway. His cousin Bea, who was four, looked up at him and waited.</p><p>Arlo cleared his throat. “Right,” he said, in a deep voice that didn't sound like his own. “Bath, story, bed.” He read the list on the fridge twice, although he had written it himself that afternoon. Then he checked that the back door was locked, and checked it again.</p>`),
  stem: `<p>How does Arlo feel about looking after Bea?</p>`,
  opts: [["He is cross that Mum has left him on his own.", "he stands still, but nothing he does is aimed at Mum"],
    ["He is confident because he has done it many times before.", "he writes a list and checks it twice, which doesn't fit someone who has done it often"],
    ["He is bored and wants Bea to go to bed quickly.", "“Bath, story, bed” is his plan, not a sign of boredom"],
    ["He is unsure of himself but trying to sound in charge.", null]],
  body: "The deep voice that “didn't sound like his own” shows he is putting on a grown-up act; reading the list twice and checking the lock twice show how nervous he really is." });
H("infer", 1, "ri1d", { passage: P(`<p>When the judge announced that the other school had won the debate, Priya clapped along with everyone else. She shook hands with the other team and told their captain that her final speech had been brilliant.</p><p>On the bus home, Priya sat by the window and said she was fine, thanks, just tired. But when her friend offered her half a chocolate bar, she shook her head, and for the rest of the trip she watched the paddocks go past without really seeing any of them.</p>`),
  stem: `<p>How does Priya really feel after the debate?</p>`,
  opts: [["Disappointed, though she hides it", null],
    ["Pleased that the better team won", "she praises the other captain politely, but her actions on the bus show she is far from pleased"],
    ["Simply tired, as she tells her friend", "that is what she SAYS; the writer shows something else"],
    ["Angry with the judge for being unfair", "nothing she does is aimed at the judge"]],
  body: "She does all the polite things, but turning down chocolate and staring out without “really seeing” anything show she is quietly disappointed." });
H("infer", 1, "ri1e", { passage: P(`<p>Jack's little sister won the art prize for her painting of a whale. At assembly, everyone clapped as she walked up to the stage, and Mum took eleven photos. Jack clapped too.</p><p>At home, he said that the whale's tail was a bit wonky, really, and that the judges probably felt sorry for the little kids. That night, though, when he thought nobody was looking, he stood in front of the painting on the fridge for a long time. Then he straightened it, very carefully, so that it hung exactly level.</p>`),
  stem: `<p>What does the last part of the passage suggest about Jack?</p>`,
  opts: [["He still thinks the painting is not very good.", "that is what he said earlier; what he does when alone shows something different"],
    ["He is secretly proud of his sister.", null],
    ["He wants to paint a whale of his own.", "nothing suggests he wants to paint"],
    ["He is worried the painting will fall off the fridge.", "takes the straightening too literally"]],
  body: "In front of others Jack picks at the painting, but alone he gazes at it and carefully straightens it. His private actions show pride he won't say out loud." });
H("infer", 1, "ri1f", { passage: P(`<p>Lucia saw the balloons tied to Ana's chair before she even reached the classroom door, and her stomach dropped. She had circled the date on her calendar weeks ago. Then the circle had disappeared under a pile of homework.</p><p>All morning Lucia smiled whenever Ana looked her way, and talked a little too much about the weekend. At lunch she slipped away to the library, tore a page from the back of her exercise book, and spent the whole break drawing, folding and writing in her neatest letters.</p>`),
  stem: `<p>Why does Lucia go to the library at lunch?</p>`,
  opts: [["To finish the homework she had not done", "homework is mentioned, but only as the reason she lost track of the date"],
    ["To keep away from Ana because the two of them have had an argument", "she smiles at Ana all morning; there's no sign of an argument"],
    ["To make a birthday card because she forgot Ana's birthday", null],
    ["To find a book to give Ana as a present", "she uses a page from her own exercise book, not a library book"]],
  body: "The balloons, her stomach dropping and the date lost under homework show she forgot Ana's birthday. Drawing, folding and writing neatly show she is making a card to make up for it." });
H("infer", 1, "ri1g", { passage: P(`<p>Mr Bellamy washed the old blue ute one last time on the morning it was sold. He even cleaned the hubcaps with a toothbrush.</p><p>When the young couple came to collect it, he showed them how the passenger door needed a bump with your hip to close, and where the spare key was hidden under the mat. He took their money without counting it. Then he stood at the end of the driveway, his hand half-raised, until the ute had turned the corner and the sound of its engine had faded away.</p>`),
  stem: `<p>How does Mr Bellamy feel about selling the ute?</p>`,
  opts: [["Glad to be rid of a car with a door that sticks", "the sticking door is a real detail, but he explains it fondly, like a habit of an old friend"],
    ["Worried that the couple have not paid him enough", "he doesn't even count the money"],
    ["Proud of how much money he has made", "the money hardly seems to matter to him"],
    ["Sad to see it go, because it means a lot to him", null]],
  body: "He cleans it with great care, hands over its little secrets, ignores the money and watches until it is out of sight and sound. Every action shows how much the ute meant to him." });
H("infer", 1, "ri1h", { passage: P(`<p>At nine o'clock Zara's friends were still giggling over a board game, but Zara had gone quiet. She said she was just going to get a glass of water, and then stood for a long time in the dark kitchen, looking at the phone on the wall. Twice she picked it up. Twice she put it down again.</p><p>When she came back, she laughed at a joke a moment after everyone else did, and for the rest of the night she held her pillow tightly against her chest.</p>`),
  stem: `<p>What is Zara most likely feeling?</p>`,
  opts: [["Homesick, but not wanting to admit it", null],
    ["Thirsty, so she goes for a drink of water", "the water is only her excuse: she spends the time looking at the phone"],
    ["Left out because her friends won't let her play", "nobody leaves her out; she is the one who goes quiet"],
    ["Bored, because she doesn't like board games", "laughing late shows her mind is elsewhere, not that she is bored by the game"]],
  body: "She makes an excuse to leave, nearly phones home twice but stops herself, and clutches her pillow. She wants to go home but doesn't want the others to know." });
H("infer", 2, "ri2a", { passage: P(`<p>Grandpa's workshop smelled of sawdust and oil. Every tool hung on the pegboard wall inside its own outline, drawn in black marker, so that a missing hammer left a hammer-shaped gap.</p><p>Only one outline had stood empty for as long as I could remember: the shape of a small saw. “Lent it to your father in 1998,” Grandpa said, every time I asked. “He'll bring it back one day.”</p><p>On my tenth birthday, Dad finally found the saw at the back of our garage. Grandpa hung it up without a word, but he whistled all afternoon.</p>`),
  stem: `<p>Why does the writer describe the outlines drawn on the wall?</p>`,
  opts: [["To show that Grandpa had too many tools to remember", "the outlines show exactly where each tool goes, the opposite of forgetting"],
    ["To set up the gap that shows the saw is still missing", null],
    ["To show that Grandpa was fussy and hard to please", "the outlines show he is orderly, but he is patient about the saw for years, not hard to please"],
    ["To show that Grandpa enjoyed drawing far more than doing woodwork", "takes the drawing too literally"]],
  body: "The outlines mean any missing tool leaves a gap you can see. That sets up the saw-shaped gap, which has been waiting for years, and makes its return feel special." });
H("infer", 2, "ri2b", { passage: P(`<p>Tomasz arrived in the middle of term with a pencil case that still had its shop label on. At recess he stood beside the bubblers and read the notices on the wall, one after another, as if each one was very interesting.</p><p>On Thursday, Ms Ruiz asked who could help her carry some books, and his hand went up before she had finished the question. By Friday afternoon he was teaching three boys a card trick, and nobody remembered that he had ever stood alone by the bubblers.</p>`),
  stem: `<p>Why does the writer say Tomasz read the notices “as if each one was very interesting”?</p>`,
  opts: [["To show that he was a keen reader who loved learning", "takes it literally; the words “as if” suggest he wasn't really interested"],
    ["To show that the notices at this school were unusually interesting ones", "again too literal: the point is about Tomasz, not the notices"],
    ["To explain how Tomasz learned his card trick", "the card trick comes later and has nothing to do with the notices"],
    ["To suggest he was pretending to be busy because he was alone", null]],
  body: "“As if” tells us he only looked interested. Reading notice after notice alone at recess is something a new student does to look busy when he has no friends yet." });
H("infer", 2, "ri2c", { passage: P(`<p>When Ms Adeyemi's class moved into the old building, every desk had a lid that lifted up. Inside Nikhil's, someone had scratched “R.T. 1974” into the wood, and underneath, in different handwriting, “J.T. 1999”.</p><p>At dinner, Nikhil wondered aloud who R.T. might have been, and whether J.T. had sat at the same desk. His father put down his fork.</p><p>“Robert Tan,” he said slowly. “My father. He went to that school.” He was quiet for a moment. “And J.T. is me.”</p>`),
  stem: `<p>Why does the writer include the detail that Nikhil's father “put down his fork”?</p>`,
  opts: [["To show that Nikhil's question has suddenly stopped him in surprise", null],
    ["To show that he has finished his dinner", "takes the action literally; it marks a sudden pause"],
    ["To show that he is about to tell Nikhil off for scratching the desk", "Nikhil didn't scratch it, and his father answers gently"],
    ["To show that he doesn't want to talk about his school days", "he does talk about them, and tells Nikhil something important"]],
  body: "Putting down the fork mid-meal shows the question has stopped him in his tracks: he has recognised the initials. The slow answer and the silence that follows show it moves him." });
H("infer", 2, "ri2d", { passage: P(`<p>The lifeguard tower on North Beach is painted the same bright yellow as the lifeguards' shirts. Each morning, before the first swimmers arrive, the lifeguards push two red-and-yellow flags into the sand.</p><p>They move the flags several times a day. Visitors sometimes grumble about having to walk further along the beach to swim between them. But the flags are not put there at random. They mark the part of the beach where the lifeguards have checked the water for rips, the strong currents that can drag a swimmer out to sea, and where they can watch every swimmer at once.</p>`),
  stem: `<p>Why does the writer mention that visitors “grumble”?</p>`,
  opts: [["To show that the lifeguards are unfriendly to visitors", "the visitors grumble, not the lifeguards, and nothing unfriendly happens"],
    ["To suggest that the flags are moved for no good reason", "the writer says the opposite: they are “not put there at random”"],
    ["To set up the reason the flags are placed where they are", null],
    ["To show that the beach is far too crowded for anyone to swim safely", "nothing in the passage mentions crowds"]],
  body: "The writer raises the complaint (“Why walk further?”) and then answers it with “But …”: the flags mark the safe, watched water. The grumble is there so the explanation can follow." });
H("infer", 2, "ri2e", { passage: P(`<p>The clock on the town hall stopped at twenty past four on the afternoon of the great flood, when brown water rose all the way to the hall's front steps.</p><p>The water went down after three days. The mud was scraped from the shops, and the council could easily have had the clock repaired. Instead, they left its hands exactly where they were. Every year on the anniversary, people gather on the steps beneath it with candles, and someone reads out the names of the streets that went under water.</p>`),
  stem: `<p>Why did the council leave the clock's hands where they were?</p>`,
  opts: [["Because the clock was too badly damaged to repair", "the passage says it could “easily” have been repaired"],
    ["Because the council could not afford a repair", "the passage says it could “easily” have been fixed; money isn't mentioned"],
    ["To show people exactly what time the yearly gathering starts", "the gathering is on the anniversary; nothing says it starts at twenty past four"],
    ["So the clock would help the town remember the flood", null]],
  body: "A clock frozen at the moment of the flood, with a yearly gathering beneath it, works as a memorial. The detail that it “could easily” have been fixed shows the choice was on purpose." });
H("infer", 2, "ri2f", { passage: P(`<p>For eight months, Hamish dropped every coin he earned into a jar labelled GUITAR. He mowed lawns, washed Mrs Pike's car and once spent a whole Saturday pulling weeds for two dollars an hour.</p><p>When his little brother's bike was stolen from outside the shops, Hamish was quiet all through dinner. The next morning the jar on his shelf was empty, and in the garage stood a second-hand bike with a big red bow on the handlebars. The label on the jar had been carefully peeled off.</p>`),
  stem: `<p>Why does the writer mention that Hamish once weeded “for two dollars an hour”?</p>`,
  opts: [["To show that Mrs Pike did not pay him fairly", "the weeding wasn't for Mrs Pike, and the point isn't who paid"],
    ["To suggest that Hamish was not very good at gardening jobs", "low pay doesn't mean he weeded badly"],
    ["To show how hard he worked for the money he gave up", null],
    ["To explain why guitars cost so much money", "the price of guitars is never mentioned"]],
  body: "A whole Saturday for very little money shows how slowly and painfully the savings grew. That makes it mean more when he spends all of it on his brother's bike." });
H("infer", 2, "ri2g", { passage: P(`<p>Each winter, humpback whales swim thousands of kilometres north from the icy waters of Antarctica to the warm seas off the coast of Queensland, where many of their calves are born.</p><p>For most of the journey the mothers eat almost nothing. They live off the thick layer of blubber they built up over summer. A newborn calf drinks large amounts of very rich milk and grows quickly, while its mother grows thinner. By the time they head south again in spring, the calf has built up a layer of blubber of its own for the cold Antarctic water.</p>`),
  stem: `<p>Why does the writer mention that the mother “grows thinner”?</p>`,
  opts: [["To suggest that she is sick after the long journey", "nothing suggests illness; thinning is the normal cost of feeding a calf"],
    ["To show that she feeds her calf from her own body", null],
    ["To show that humpback whales don't like eating in warm water", "the passage doesn't say why they don't eat; it says what they live on instead"],
    ["To explain why the whales leave Antarctica in winter", "the thinning happens after they arrive, so it doesn't explain why they leave"]],
  body: "The mother hardly eats, yet makes rich milk. Placing “grows thinner” right beside the calf growing quickly shows that the calf's growth comes from her blubber." });
H("infer", 2, "ri2h", { passage: P(`<p>In the final of the 800 metres, Leila was in second place with one lap to go. Ahead of her, the girl in the lead clipped the edge of the track and fell hard.</p><p>Leila slowed. For a moment she seemed to look past the fallen runner to the finish line, where her whole class was shouting her name. Then she stopped, held out her hand and pulled the other girl to her feet. They crossed the line together, last and second-last.</p><p>Leila's coach, who had trained her all year for this race, was the first to start clapping.</p>`),
  stem: `<p>Why does the writer say that Leila “seemed to look past the fallen runner to the finish line”?</p>`,
  opts: [["To show that she was checking how far she still had left to run to finish", "too literal: the look is about a choice, not a distance"],
    ["To show that she did not notice the girl had fallen", "she slows down because of the fall, so she did notice"],
    ["To show that her class wanted her to stop and help", "her class was cheering her on to the finish, not asking her to stop"],
    ["To show she was tempted to keep running before choosing to help", null]],
  body: "The look towards the finish line, with her class shouting, shows the win she is giving up. That moment of temptation makes her choice to stop more powerful." });
H("infer", 3, "ri3a", { passage: P(`<p>The puppy bulldozed through the flower bed.</p>`),
  stem: `<p>What does the word “bulldozed” suggest about the puppy?</p>`,
  opts: [["It ran in quickly but stepped neatly between the flowers.", "keeps the speed but misses the damage a bulldozer does"],
    ["It was very strong and heavy for a puppy.", "takes the bulldozer too literally; the word is about how it moved through"],
    ["It was trying to dig a hole to bury something in the garden.", "bulldozers push things flat; the word isn't about digging"],
    ["It pushed through clumsily, flattening the flowers.", null]],
  body: "A bulldozer pushes everything flat in its way. Using that word for a puppy makes us see it charging through and squashing the flowers." });
H("infer", 3, "ri3b", { passage: P(`<p>“Of course you can borrow my new pencils,” said Lucy, pushing the tin towards Max with two fingers, as if it might bite.</p>`),
  stem: `<p>What does “as if it might bite” suggest about Lucy?</p>`,
  opts: [["She thinks the tin is dangerous.", "taken literally; the comparison is about her feelings"],
    ["She doesn't really want to lend the pencils.", null],
    ["She is proud of how new and shiny the pencils are.", "the pencils ARE new, but the comparison shows unwillingness, not pride"],
    ["She is frightened of Max.", "she is reluctant about the pencils, not scared of Max"]],
  body: "She says “of course”, but she pushes the tin away as little as possible, like something unpleasant. The comparison shows she is unwilling." });
H("infer", 3, "ri3c", { passage: P(`<p>On wet afternoons the old library was a cave of whispers.</p>`),
  stem: `<p>What does the writer suggest by calling the library “a cave of whispers”?</p>`,
  opts: [["It was cold and damp because of the rain.", "uses the real detail (wet afternoons) but takes “cave” literally"],
    ["People went there to tell secrets.", "whispering here is about keeping quiet, not secrets"],
    ["It was dim, hushed and quiet.", null],
    ["It was frightening to go into.", "caves can be scary, but nothing else suggests fear"]],
  body: "A cave is dim and echoing; whispers are hushed. Together they paint a quiet, shadowy, peaceful room on a rainy day." });
H("infer", 3, "ri3d", { passage: P(`<p>Dad looked at the blackened toast on his plate. “Lovely,” he said flatly.</p>`),
  stem: `<p>What does the word “flatly” tell us?</p>`,
  opts: [["He doesn't really think the toast is lovely.", null],
    ["He thinks the toast is delicious, just the way he likes it.", "that is what the word “lovely” says, but “flatly” tells us he doesn't mean it"],
    ["He is trying hard to sound cheerful.", "the opposite: a flat voice has no cheer in it at all"],
    ["He is too tired to say much.", "he does speak; the word describes HOW, with no feeling"]],
  body: "“Flatly” means with no feeling in the voice. Saying “lovely” flatly about burnt toast shows he means the opposite." });
H("infer", 3, "ri3e", { passage: P(`<p>The old car coughed twice, shuddered and fell silent. Dad patted the steering wheel. “Come on, old girl,” he whispered. “Just one more trip.”</p>`),
  stem: `<p>What do the words “Come on, old girl” suggest about Dad?</p>`,
  opts: [["He is whispering so that he doesn't wake his passengers.", "takes the whisper literally: no passengers are mentioned, and he is speaking TO the car"],
    ["He is fond of the car and treats it like a person.", null],
    ["He is calling the car old because he is annoyed with it.", "“old girl” sounds like a complaint, but he pats the wheel and coaxes it gently"],
    ["He is calm because he knows the car always starts in the end.", "“Just one more trip” is a plea: he isn't sure it will start at all"]],
  body: "Patting the wheel and coaxing it in a whisper, Dad speaks to the car like an old friend. “Old girl” is a fond nickname, not a complaint." });
H("infer", 3, "ri3f", { passage: P(`<p>All night the wind sharpened its teeth on the iron roof, and none of us slept.</p>`),
  stem: `<p>What does “sharpened its teeth on the iron roof” suggest about the wind?</p>`,
  opts: [["It had cut the roof so that its edges were sharp.", "takes the image literally"],
    ["An animal was scratching about on the roof.", "teeth belong to animals, but here the words describe the wind"],
    ["It was harsh and noisy, scraping at the roof.", null],
    ["It was soft and soothing, helping everyone in the house to sleep.", "the opposite: “none of us slept”"]],
  body: "The wind is pictured as a beast grinding its teeth: a harsh, scraping, frightening sound that kept everyone awake." });
H("infer", 3, "ri3g", { passage: P(`<p>When the principal walked in, the noisy classroom wilted into silence.</p>`),
  stem: `<p>What does the word “wilted” suggest about the class?</p>`,
  opts: [["The students suddenly felt unwell.", "takes “wilted” too literally, as if the students were sick plants"],
    ["The class's lively mood drooped as their nerve failed.", null],
    ["The silence came instantly and all at once, like flicking a switch.", "wilting is a drooping, not a snap"],
    ["The students grew hot and sleepy in the warm room.", "plants wilt in heat, but nothing here is about the temperature"]],
  body: "A wilting plant droops and loses its life. The class's noise and energy sag the same way when the principal appears." });
H("infer", 3, "ri3h", { passage: P(`<p>“What a lovely surprise,” said Mrs Vance, when she found the class's pet mice loose in the staffroom. Her smile did not reach her eyes.</p>`),
  stem: `<p>What does “her smile did not reach her eyes” suggest?</p>`,
  opts: [["She was only pretending to be pleased.", null],
    ["She was pleased, but too surprised to show it fully.", "a real surprise would show in the eyes too; her words are polite cover"],
    ["She was trying hard not to laugh at the mice.", "holding back a laugh would make the eyes smile, not stay cold"],
    ["She was glad the lost mice had been found safely.", "this believes her words, but the cold eyes show she doesn't mean them"]],
  body: "A real smile lights up the eyes as well as the mouth. Hers stayed on her mouth only, so “What a lovely surprise” is polite, not sincere." });
H("infer", 4, "ri4a", { passage: P(`<p>My first day at drama club went like this. I arrived early, which was good. I sat in the director's chair, which was bad. I opened my folder and found my sister's maths homework instead of my script, which was worse.</p><p>The director, a tall woman with a pencil behind each ear, peered at me over her glasses. “Interesting choice,” she said. Twenty actors turned to look.</p><p>I read the maths homework aloud as my lines for the whole rehearsal. Nobody asked me to. Nobody asked me to stop, either. At the end the director said I had “a lot of nerve”, and I still don't know whether that was good.</p>`),
  stem: `<p>What is the main effect of the way the writer lists what happened (“which was good … bad … worse”)?</p>`,
  opts: [["It turns an embarrassing day into a funny story by building up each disaster.", null],
    ["It shows that the writer was nervous all through the rehearsal.", "the day was awkward, but the calm, step-by-step telling is comic, not nervous"],
    ["It shows that each problem was the writer's sister's fault.", "only one problem involves the sister's homework, and no one is blamed"],
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
    ["Old-fashioned", "she uses old things, but the point is the clever new uses she finds for them"]],
  body: "Every example shows her finding a clever new use for something broken, and in the end her neighbours need her. That is resourceful." });
H("infer", 4, "ri4d", { passage: P(`<p>“Chess is boring,” I told Grandpa. He just set up the board.</p><p>For the first ten games I lost so quickly that I barely had time to sit down. Then Grandpa showed me how to protect my king with a wall of pawns and to wait, a little at a time, for him to make a mistake. In the eleventh game I trapped his queen. I could feel my heart thumping, as if it wanted to jump out and do a lap of the park.</p><p>We stayed at the park table until the light went orange. On the walk home Grandpa asked what I thought now.</p><p>“Chess is boring,” I said, grinning, and he laughed so hard he had to sit down on the kerb.</p>`),
  stem: `<p>Why does the writer say “Chess is boring” again at the end?</p>`,
  opts: [["Because the writer still thinks chess is boring", "the grin, the long afternoon and Grandpa's laughter show the opposite"],
    ["To show the writer is embarrassed about losing the first ten games", "the early losses are real, but the writer is grinning, not embarrassed"],
    ["To tease Grandpa because the writer won every game after that", "the writer trapped his queen once; nothing says every game was won"],
    ["As a joke: by now the writer loves chess, and Grandpa knows it", null]],
  body: "The same words mean the opposite at the end. The grin and Grandpa's laughter show it is a shared joke: the writer's mind has completely changed." });
H("infer", 4, "ri4e", { passage: P(`<p>Every summer the small ones come and sit in my shade with their lunch boxes. They carve their names into my skin, which tickles, and every autumn I drop my leaves on them so that they shriek and throw them at one another.</p><p>Some of the small ones grow tall and stop coming. Years later a few come back with small ones of their own and point at the old names, which have stretched wider as I have grown.</p><p>Last spring a man with a clipboard tied a red ribbon around my middle and frowned up at my branches. The small ones have not stopped crying since.</p>`),
  stem: `<p>What has most likely happened at the end of the passage?</p>`,
  opts: [["The tree has won a prize for being the oldest in the school.", "a ribbon can mean a prize, but the frown and the crying don't fit"],
    ["The children are crying because the leaves are falling on them.", "the leaves fall in autumn and make them shriek with fun, not cry"],
    ["The tree is to be cut down, and the children are upset.", null],
    ["The man is measuring the tree to see how much it has grown.", "he has a clipboard, but measuring wouldn't make the children cry"]],
  body: "The narrator is a tree in a schoolyard (shade, carved names, falling leaves). A man frowning at it and tying on a ribbon, then children who can't stop crying, together suggest the tree is to be cut down." });
H("infer", 4, "ri4f", { passage: P(`<p>Gran said the bus would come at eight. Eight o'clock came, and so did the rain. Gran said it would come at half past. Half past came, and so did a man selling umbrellas. Gran said it would surely come by nine. Nine o'clock came, and so did Grandad, in his old white car, with a thermos of hot chocolate and a look on his face that said he had heard all about this bus before.</p>`),
  stem: `<p>What is the main effect of the pattern “Gran said … came, and so did …”?</p>`,
  opts: [["It shows that Gran is always right about the bus.", "the opposite: every time she names a time, the bus doesn't come"],
    ["It shows that the weather grew worse every half hour.", "the rain only arrives once; the other arrivals are a seller and Grandad"],
    ["It builds a joke in which everything turns up except the bus.", null],
    ["It shows that the narrator is frightened of waiting in the dark.", "nothing suggests fear; the tone is comic"]],
  body: "Each round repeats the same shape and adds a new arrival that isn't the bus. The pattern builds to a punchline, and Grandad's look adds one more joke: this happens every time." });
H("infer", 4, "ri4g", { passage: P(`<p>Uncle Theo arrived for Christmas with no presents and a suitcase full of jokes. He taught the twins to whistle with two fingers, which Mum did not thank him for. He burnt the pudding, set it alight anyway and called it “a special recipe”.</p><p>When the power went out on Boxing Day, it was Uncle Theo who found the candles, told ghost stories until even Grandpa jumped, and lay on the floor making shadow animals on the ceiling. He left on the twenty-seventh, as suddenly as he had come, and the house felt too quiet for a week.</p>`),
  stem: `<p>Which word best describes Uncle Theo as he is shown in the whole passage?</p>`,
  opts: [["Careless", "he burns the pudding, but the whole passage shows him making fun out of everything"],
    ["Mean", "he brings no presents, but he gives everyone a great deal of fun"],
    ["Brave", "he takes charge in the blackout, but nothing he does is dangerous"],
    ["Fun-loving", null]],
  body: "Jokes, whistling lessons, a flaming pudding, ghost stories and shadow animals: every example is about fun, and the quiet house after he leaves shows how much life he brought." });
H("infer", 4, "ri4h", { passage: P(`<p>Imagine walking up a window and across the ceiling, upside down, without a drop of glue. Geckos do it every night.</p><p>The secret is on their toes, which are covered in millions of tiny hairs, each one splitting into even tinier tips. The tips get so close to a surface that a very weak pulling force acts between them. On its own, each pull is far too small to notice, but millions of them together are strong enough to hold up the gecko. To let go, the gecko simply peels its toes off, the way you would peel off a sticky label.</p>`),
  stem: `<p>Why does the writer compare the gecko's toes to “a sticky label” at the end?</p>`,
  opts: [["To help the reader picture how a gecko lets go of a surface", null],
    ["To show that a gecko's feet are covered in glue", "the passage says “without a drop of glue”"],
    ["To suggest that a gecko's toes are as flat and smooth as a label", "the toes are covered in millions of tiny hairs, so they are not smooth"],
    ["To suggest that a gecko's grip, like a label's, works only once", "nothing says the grip wears out: geckos climb every night"]],
  body: "The writer explains a hard idea with something familiar: just as a label comes away when peeled from one edge, the gecko peels its toes off rather than pulling straight away." });
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
/* ---------- Linking sentences ---------- */
H("link", 1, "rl1a", { passage: P(`<p>Coral reefs are built by tiny animals called coral polyps. Each polyp builds a hard skeleton of limestone around its soft body. When it dies, the skeleton remains, and new polyps grow on top. Over thousands of years, the skeletons pile up into a reef.</p>`),
  stem: `<p>In “When it dies”, what does “it” refer to?</p>`,
  opts: [["The limestone skeleton", "this is the nearest noun, but the skeleton “remains”, so it isn't the thing that dies"], ["The coral reef", "the reef is still being built; it isn't what dies"], ["A coral polyp", null], ["The sea", "the sea isn't mentioned, and it can't die"]],
  body: "Read on: “When it dies, the skeleton remains”. So “it” must be something living that HAS a skeleton: the polyp." });
H("link", 1, "rl1b", { passage: P(`<p>Mum's old car and Dad's new one were both parked in the driveway. The former had a dent in one door and a faded sticker on the back window; the latter still smelled of the showroom.</p>`),
  stem: `<p>What does “The former” refer to?</p>`,
  opts: [["Dad's new car", "that is “the latter”: the second one mentioned"], ["Mum's old car", null], ["The driveway", "a driveway doesn't have doors or windows"], ["The door with the dent", "the dented door belongs to “the former”, so it can't be the former itself"]],
  body: "“The former” means the first of two things just mentioned, and “the latter” means the second. Mum's old car came first." });
H("link", 1, "rl1c", { passage: P(`<p>Some people believe that bats are blind. This is not true: bats can see, and many kinds also use echoes to find their way in the dark.</p>`),
  stem: `<p>What does “This” refer to?</p>`,
  opts: [["The fact that bats can see", "that is what the writer says IS true; “This” is what is not true"], ["Bats using echoes to find their way", "that comes after “This”, and the writer says it is true"], ["The people who believe it", "people can't be “not true”"], ["The idea that bats are blind", null]],
  body: "“This is not true” points back to the belief in the sentence before: that bats are blind." });
H("link", 1, "rl1d", { passage: P(`<p>Lena's grandmother taught her to sew, and her great-aunt taught her to knit. Years later, she still uses both skills every winter.</p>`),
  stem: `<p>Who does “she” refer to?</p>`,
  opts: [["Lena", null], ["Lena's great-aunt", "she is the nearest woman mentioned, but she only knew how to knit"], ["Lena's grandmother", "she taught sewing, not knitting"], ["Both of the older women", "“she” means one person, and only one person learned BOTH skills"]],
  body: "“Both skills” is the clue: only Lena learned to sew AND to knit." });
H("link", 1, "rl1e", { passage: P(`<p>Tom begged his parents to let him stay up to watch the eclipse. They said no at first, but when he promised to do his chores before dinner, they finally agreed to it.</p>`),
  stem: `<p>In “they finally agreed to it”, what does “it” refer to?</p>`,
  opts: [["Tom doing his chores before dinner", "the chores are the nearest idea, but they are Tom's promise, not what his parents agreed to"], ["The eclipse", "you can't agree to an eclipse"], ["Tom staying up late", null], ["Dinner", "dinner isn't something they were asked about"]],
  body: "What did Tom ask for? To stay up for the eclipse. That is what his parents first refused and then agreed to." });
H("link", 1, "rl1f", { passage: P(`<p>Emus, cassowaries and kiwis are all birds that cannot fly, but only the first two are found in the wild in Australia.</p>`),
  stem: `<p>Which birds does “the first two” refer to?</p>`,
  opts: [["Cassowaries and kiwis", "these are the LAST two in the list"], ["Emus and kiwis", "these are the first and the third"], ["All birds that cannot fly", "“the first two” picks out two birds from the list"], ["Emus and cassowaries", null]],
  body: "Count along the list: emus (1), cassowaries (2), kiwis (3). The first two are emus and cassowaries; kiwis live in New Zealand." });
H("link", 1, "rl1g", { passage: P(`<p>Our class wrote to the council asking for a pedestrian crossing outside the school. Three weeks later a reply arrived, together with a map of the street. It said that work would begin in the spring.</p>`),
  stem: `<p>What does “It” refer to?</p>`,
  opts: [["The map", "the map is the nearest noun, but a map shows places; it doesn't say when work will begin"], ["The reply", null], ["The crossing", "a crossing can't say anything"], ["The council", "the council sent the reply, but the thing that arrived and “said” this is the reply itself"]],
  body: "Something that “said” work would begin must contain words: the reply to the class's letter." });
H("link", 1, "rl1h", { passage: P(`<p>In 1969, hundreds of millions of people watched on television as astronauts walked on the Moon. Many of them still remember exactly where they were at that moment.</p>`),
  stem: `<p>Who does “them” refer to?</p>`,
  opts: [["The astronauts", "they are the nearest people, but they walked on the Moon; it is the viewers who remember where they were watching"], ["People today", "the sentence is about people who were alive in 1969"], ["The people who watched on television", null], ["The people who made the television show", "they aren't mentioned"]],
  body: "“Many of them still remember where they were” only makes sense for the viewers at home, who were in many different places." });
const NEXT = `<p>Which sentence would best come next?</p>`;
H("link", 2, "rl2a", { passage: P(`<p>Camels are remarkably well suited to life in the desert. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Camels were brought to Australia in the 1800s to carry goods across the outback.", "true and about camels, but it doesn't show how they suit the desert"],
    ["Their broad, padded feet stop them sinking into soft sand.", null],
    ["Deserts can be freezing at night, even when the days are hot.", "about deserts, not about camels"],
    ["Some tourists ride camels along the beach at Broome.", "about camel rides, not about desert life"]],
  body: "A general claim (camels suit the desert) should be followed by an example or a reason. Their feet are one." });
H("link", 2, "rl2b", { passage: P(`<p>Not every invention is a success. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["The telephone was invented in the 1870s and changed the way the whole world talks.", "this is a famous success, the opposite of what the first sentence leads into"],
    ["Inventors often fill notebooks with drawings and ideas.", "about inventors, not about inventions that failed"],
    ["Many new gadgets are forgotten within a year because nobody buys them.", null],
    ["Some inventions are thought up by children.", "about who invents, not about failure"]],
  body: "“Not every invention is a success” leads into examples of failures: gadgets nobody buys." });
H("link", 2, "rl2c", { passage: P(`<p>Our town's library is much more than a place to borrow books. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Books can be borrowed for up to three weeks at a time.", "this is about borrowing books, the very thing the first sentence says it is MORE than"],
    ["The library was built in 1952 and still has its original red tiled roof.", "history and looks, not what else it offers"],
    ["Many people now prefer to buy their books online.", "about buying books, not about the library"],
    ["It also runs homework clubs, lends out cake tins and shows films.", null]],
  body: "“Much more than a place to borrow books” needs to be followed by the other things it offers." });
H("link", 2, "rl2d", { passage: P(`<p>The school concert had to be moved to the following week. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["A storm had damaged the roof of the hall the night before.", null],
    ["The concert will include songs from every class in the school.", "about the concert, but not why it was moved"],
    ["Concerts are a good way for parents to see what students have learned.", "about concerts in general"],
    ["Tickets will cost five dollars for adults.", "about tickets, not the change of date"]],
  body: "After saying the concert was moved, the text should give the reason: storm damage to the hall." });
H("link", 2, "rl2e", { passage: P(`<p>Ice is lighter than the same amount of liquid water. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Water boils at 100 degrees Celsius at sea level.", "a true fact about water, but it doesn't follow on from ice being lighter"],
    ["That is why ice cubes float in a drink.", null],
    ["Ice-skating is a popular sport in cold countries.", "about ice, but not about it being lighter"],
    ["Glaciers move very slowly down mountains.", "about ice, but it doesn't follow on"]],
  body: "The first sentence gives a fact; the next gives its result. “That is why” points back to it: lighter things float." });
H("link", 2, "rl2f", { passage: P(`<p>Grandpa is a man of very few words. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["He loves telling long stories about his years in the navy.", "the opposite: long stories don't fit a man of few words"],
    ["He grew up on a dairy farm near Bega.", "about Grandpa, but not about how little he says"],
    ["When I showed him my report, he just nodded and tapped one mark.", null],
    ["Many grandparents enjoy spending lots of time with their grandchildren after school.", "about grandparents in general"]],
  body: "A statement about someone's character is usually followed by an example. A nod and a tap, with no words, shows a man of few words." });
H("link", 2, "rl2g", { passage: P(`<p>Some animals change colour with the seasons to match their surroundings. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Colours can be warm, like red, or cool, like blue.", "about colours, not animals"],
    ["Many small animals are hunted by bigger ones.", "it explains why hiding helps, but it isn't the example the sentence leads into"],
    ["Red foxes were brought to Australia from England in the 1800s for hunting.", "shares the word “fox” with the right answer, but it doesn't follow on"],
    ["The Arctic fox, for example, is white in winter and brown in summer.", null]],
  body: "A general statement is followed by an example: “for example” and the Arctic fox's changing coat fit exactly." });
H("link", 2, "rl2h", { passage: P(`<p>Finishing the jigsaw puzzle took far longer than we had planned. <span class="blank">________</span></p>`), stem: NEXT,
  opts: [["Half the pieces were plain blue sky, all looking the same.", null],
    ["Jigsaws are a good way to pass a rainy afternoon.", "about jigsaws in general, not why this one was slow"],
    ["Jigsaw puzzles were first made in England more than two hundred years ago.", "history, not a reason"],
    ["My sister prefers board games to puzzles.", "about the sister's taste, not the puzzle"]],
  body: "After saying it took longer than planned, the next sentence should explain why: pieces that all look alike." });
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
H("link", 3, "rl3e", { passage: P(`<p>The sunflower seeds were planted in poor, rocky soil. <span class="blank">________</span>, they grew into the tallest sunflowers in the street.</p>`), stem: SIG,
  opts: [["Consequently", "“consequently” means “because of that”, but poor soil wouldn't CAUSE tall flowers"], ["Similarly", "“similarly” adds a matching idea, but the second idea is a surprise"], ["Nevertheless", null], ["For instance", "tall sunflowers aren't an example of poor soil"]],
  body: "Poor soil would make you expect weak plants; instead they grew tallest. A surprising result despite the first idea needs “Nevertheless”." });
H("link", 3, "rl3f", { passage: P(`<p>Lions usually hunt at night. <span class="blank">________</span>, cheetahs do most of their hunting during the day.</p>`), stem: SIG,
  opts: [["Therefore", "“therefore” shows a result, but lions hunting at night doesn't cause cheetahs to hunt by day"], ["In contrast", null], ["For example", "cheetahs aren't an example of lions"], ["As a result", "this shows a result, which doesn't fit two separate facts"]],
  body: "Two animals are being set against each other: night and day. The link must show contrast: “In contrast”." });
H("link", 3, "rl3g", { passage: P(`<p>A fallen tree was blocking the main road. <span class="blank">________</span>, the bus had to take a much longer route.</p>`), stem: SIG,
  opts: [["On the other hand", "this sets up a contrast, but the second idea follows from the first"], ["Nevertheless", "“nevertheless” means “despite that”, but the longer route happened BECAUSE of the tree"], ["In other words", "the second sentence doesn't say the same thing again"], ["Consequently", null]],
  body: "The blocked road caused the longer route. A link that shows a result is needed: “Consequently”." });
H("link", 3, "rl3h", { passage: P(`<p>Tasmanian devils look fierce and make terrifying screeches at night. <span class="blank">________</span>, they are shy animals that usually keep away from people.</p>`), stem: SIG,
  opts: [["However", null], ["Therefore", "“therefore” shows a result, but looking fierce doesn't make them shy"], ["Furthermore", "“furthermore” adds a similar idea, but shy is the opposite of fierce"], ["Because of this", "their shyness isn't caused by how they look"]],
  body: "Fierce looks, but shy behaviour: two ideas that pull against each other need a contrast word: “However”." });
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
H("link", 4, "rl4e", { passage: P(`<p>Saturn is the sixth planet from the Sun. <span class="blank">________</span> They are made of billions of pieces of ice and rock, some as small as grains of sand and others as big as houses.</p>`), stem: FILL,
  opts: [["It is a giant planet made mostly of gas.", "on topic, but then “They” would have nothing to point to"],
    ["Its many moons travel around it at different speeds.", "“They” could point to the moons, but moons are not as small as grains of sand"],
    ["It is best known for its bright, wide rings.", null],
    ["People have been studying it through telescopes for centuries.", "people aren't made of ice and rock"]],
  body: "“They” after the gap needs something plural that is made of pieces of ice and rock, some tiny, some huge. Only Saturn's rings fit." });
H("link", 4, "rl4f", { passage: P(`<p>Starting a compost heap is easy. First, lay down some twigs to let air in at the bottom. <span class="blank">________</span> Keep adding layers like this, and turn the whole heap with a garden fork every few weeks.</p>`), stem: FILL,
  opts: [["Compost helps plants grow strong and healthy.", "on topic, but it breaks the step-by-step instructions"],
    ["Next, add a layer of kitchen scraps.", null],
    ["Turn the heap with a fork to let in more air.", "turning comes at the end, and “Keep adding layers like this” still needs a layer first"],
    ["Soon worms will arrive to help break everything down.", "worms don't come before the heap has been built"]],
  body: "The steps go in order (First … Next … Keep adding), and “layers like this” needs a layer to have been described just before it. Only the kitchen-scraps sentence does both." });
H("link", 4, "rl4g", { passage: P(`<p>In 1928, a scientist named Alexander Fleming came back from a holiday to find mould growing on one of his dishes of germs. <span class="blank">________</span> This was the first step towards penicillin, a medicine that has since saved millions of lives.</p>`), stem: FILL,
  opts: [["Fleming worked at a hospital in London.", "true, but working in London isn't a “first step” towards a medicine"],
    ["Mould often grows on old bread and fruit.", "on topic, but mould on bread isn't the discovery that “This” points to"],
    ["Penicillin is still given to patients by doctors all over the world today.", "it jumps ahead to penicillin before the discovery has been described"],
    ["He saw that the germs near the mould had died.", null]],
  body: "“This was the first step” needs a discovery just before it. Seeing that the mould killed the germs around it is that discovery." });
H("link", 4, "rl4h", { passage: P(`<p>Ms Okoro's class wanted to raise money for a new school garden. <span class="blank">________</span> By the end of term they had sold more than three hundred of them, and the garden was paid for.</p>`), stem: FILL,
  opts: [["So they made bookmarks from pressed flowers.", null],
    ["A garden gives students a peaceful place to learn and relax outside in the fresh air.", "on topic, but “sold three hundred of them” would have nothing to point to"],
    ["First, they asked the principal for permission.", "a sensible step, but you can't sell three hundred principals"],
    ["Many parents offered to help dig the garden beds.", "“them” can't be the parents: nobody sells parents"]],
  body: "“Sold more than three hundred of them” needs something to sell, mentioned just before. Only the bookmarks sentence gives one." });
/* ---------- Same idea, different words ---------- */
const MEANS = s => `<p>Which sentence means the same as:</p><p class="quote">“${s}”</p>`;
H("same", 1, "rs1a", { stem: MEANS("The new rule was met with widespread disapproval."),
  opts: [["The new rule was approved by many people.", "shares the word “approv(al)”, but “disapproval” is the opposite"],
    ["The new rule was spread widely so that everyone knew it.", "shares “wide” and “spread”, but not the meaning"],
    ["Many people did not like the new rule.", null],
    ["A few people did not like the new rule.", "“widespread” means many people, not a few"]],
  body: "Widespread = across many people; disapproval = not liking it. So many people disliked the rule." });
H("same", 1, "rs1b", { stem: MEANS("Few of the guests stayed until the end of the party."),
  opts: [["Most of the guests left before the party ended.", null],
    ["A few guests left early, but most stayed until the end.", "“few” (without “a”) means hardly any stayed, the opposite"],
    ["The party ended early because only a few guests came.", "shares “few”, but it is about how many came, not how many stayed"],
    ["Not one of the guests stayed until the end of the party.", "too strong: “few” means some stayed, just not many"]],
  body: "“Few stayed” means hardly any stayed, so most left before the end." });
H("same", 1, "rs1c", { stem: MEANS("It was not until the rain stopped that the match could begin."),
  opts: [["The match stopped as soon as the rain began.", "this swaps stopping and starting around"],
    ["The match began even though it was still raining.", "the opposite: the match had to wait for the rain to stop"],
    ["The match could begin only after the rain had stopped.", null],
    ["The rain stopped because the match was about to begin.", "this turns the cause around"]],
  body: "“Not until X … could Y” means Y had to wait for X: the match began only once the rain stopped." });
H("same", 1, "rs1d", { stem: MEANS("Hardly had we sat down when the phone rang."),
  opts: [["We could hardly sit down because the phone kept ringing.", "shares “hardly” and “sat down”, but not the meaning"],
    ["We sat down a long time after the phone rang.", "the opposite order and timing"],
    ["The phone rang, so we sat down to answer it.", "swaps the order and adds a reason"],
    ["The phone rang almost as soon as we sat down.", null]],
  body: "“Hardly had we … when …” means the second thing happened straight after the first." });
H("same", 1, "rs1e", { stem: MEANS("Her explanation was anything but clear."),
  opts: [["Her explanation was very confusing.", null],
    ["Her explanation made everything clear.", "“anything but” means “not at all”, so this is the opposite"],
    ["Her explanation was clearer than anything else.", "misreads “anything but” as a comparison"],
    ["She could explain anything clearly.", "shares the words, but not the meaning"]],
  body: "“Anything but clear” means not clear at all, so it was confusing." });
H("same", 1, "rs1f", { stem: MEANS("The team's victory was by no means certain."),
  opts: [["The team was certain to win by a large margin.", "“by no means” is the opposite of certain"],
    ["It was far from sure that the team would win.", null],
    ["The team won, but only by a few points.", "shares the word “by”, but it is about the score"],
    ["There was no way at all that the team could win.", "too strong: not certain doesn't mean impossible"]],
  body: "“By no means certain” means not at all sure: they might well lose, though they might also win." });
H("same", 1, "rs1g", { stem: MEANS("Tom is no less talented than his older brother."),
  opts: [["Tom is less talented than his older brother.", "this ignores the word “no”"],
    ["Tom has no talent, unlike his older brother.", "misreads “no less” as “no talent”"],
    ["Tom is at least as talented as his older brother.", null],
    ["Tom's older brother is much more talented than he is.", "the opposite"]],
  body: "“No less talented than” means not less: just as talented, or more." });
H("same", 1, "rs1h", { stem: MEANS("The museum is seldom crowded on weekday mornings."),
  opts: [["The museum is always crowded on weekday mornings.", "“seldom” means hardly ever, the opposite of always"],
    ["The museum is closed on most weekday mornings.", "not crowded doesn't mean closed"],
    ["The museum is crowded on weekday mornings, but not at weekends.", "this says the opposite about weekday mornings, and weekends aren't mentioned"],
    ["On weekday mornings there are rarely many people at the museum.", null]],
  body: "“Seldom” means rarely, so on weekday mornings the museum is hardly ever busy." });
const SHOES = `<div class="extracts"><p><b>Extract A</b> When I was six I was given a pair of red sandals with a buckle shaped like a daisy. I refused to take them off, even in the bath, and in the end Mum gave up and let me wear them to bed for a week.</p>
<p><b>Extract B</b> The oldest known leather shoe was found in a cave in Armenia in 2008. It is about 5500 years old and was stuffed with grass, perhaps to keep its shape, or perhaps to keep its owner's foot warm.</p>
<p><b>Extract C</b> Schools should let students wear runners every day. Stiff black school shoes pinch and rub, and a child who is limping by lunchtime will not enjoy sport, or anything else.</p>
<p><b>Extract D</b> The cobbler held the boot up to the window and frowned at the hole in its sole. “Walked a long way in this,” he said. The traveller only nodded, and counted his last few coins onto the counter.</p></div>`;
const EX = ["Extract A", "Extract B", "Extract C", "Extract D"];
const ext = (track, rung, id, passage, q, right, why, body) => H(track, rung, id, { passage, stem: `<p>${q}</p>`, opts: EX.map((x, i) => [x, i === right ? null : why[i]]), body });
ext("same", 2, "rs2a", SHOES, "Which extract describes something being worn in places where you would not expect it?", 0,
  ["", "the shoe was FOUND in a cave, not worn there", "runners at school is what the writer wants, and it isn't surprising", "the boot has been worn on a long walk, which is just what boots are for"],
  "Sandals in the bath and in bed are not where anyone expects shoes to be worn.");
ext("same", 2, "rs2b", SHOES, "Which extract suggests that someone has very little money left?", 3,
  ["no money is mentioned", "no money is mentioned", "the writer talks about school shoes, not money", ""],
  "Counting out his “last few coins” shows the traveller has almost no money left, though the word “poor” is never used.");
ext("same", 2, "rs2c", SHOES, "Which extract admits that the reason for something is not known for certain?", 1,
  ["Mum's reason for giving up is clear: the child refused", "", "the writer is sure about why runners are better", "the hole has an obvious cause: walking a long way"],
  "“Perhaps … or perhaps …” shows nobody knows for sure why the shoe was stuffed with grass.");
ext("same", 2, "rs2d", SHOES, "Which extract argues that a change would make people more comfortable?", 2,
  ["the child chooses her own shoes; nothing is argued", "this gives facts about the past", "", "the traveller's boot needs mending, but nobody argues for a change"],
  "Extract C argues for a change (runners every day) because school shoes “pinch and rub”: runners would be more comfortable.");
const SAND = `<div class="extracts"><p><b>Extract A</b> Every summer, Dad and I build a sandcastle where the waves can reach it, and then we sit and wait. When I was little I used to cry when the sea knocked it down. Now, waiting for the first wave is my favourite part.</p>
<p><b>Extract B</b> Not all sand is the same. The pale sand on many Australian beaches is mostly tiny grains of quartz, but some beaches in Hawaii are black, because their sand is made from volcanic rock.</p>
<p><b>Extract C</b> To make a sand timer, pour dry sand into a small plastic bottle until it is a third full. Tape a second bottle to it, neck to neck, with a piece of card between them that has a small hole in the middle.</p>
<p><b>Extract D</b> Cars should be banned from our beaches. Their tyres crush the eggs of shorebirds that nest in the sand, and families should not have to keep watch for four-wheel drives while their children play.</p></div>`;
ext("same", 2, "rs2e", SAND, "Which extract explains why something is a particular colour?", 1,
  ["the sandcastle's colour is never mentioned", "", "the instructions don't mention colour", "the extract is about cars and birds, not colour"],
  "Extract B explains that some Hawaiian sand is black “because” it is made from volcanic rock.");
ext("same", 2, "rs2f", SAND, "Which extract describes how the writer's feelings have changed?", 0,
  ["", "this is all facts, with no feelings", "instructions, with no feelings", "the writer has strong feelings, but they don't change"],
  "“I used to cry … Now, waiting for the first wave is my favourite part”: the writer's feelings have changed completely.");
ext("same", 2, "rs2g", SAND, "Which extract is written so that the reader could follow it at home?", 2,
  ["the sandcastle is described, but the reader isn't told how to build one", "it tells you what sand is made of; there is nothing to do", "", "it says what the government should do, not something a reader can follow"],
  "Extract C is a set of instructions (pour, tape) for making a sand timer: something a reader can follow at home.");
ext("same", 2, "rs2h", SAND, "Which extract mentions a danger to wildlife?", 3,
  ["the waves knock down a sandcastle, not an animal", "no animals are mentioned", "no animals are mentioned", ""],
  "Extract D says tyres “crush the eggs of shorebirds”.");
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
const MOON = `<div class="extracts"><p><b>Extract A</b> The moon hung over the paddock like a lantern someone had forgotten to take inside, and the sheep's shadows stretched long and blue across the grass.</p>
<p><b>Extract B</b> The Moon is about 384 000 kilometres from Earth. If you could drive there at 100 kilometres an hour without ever stopping, the trip would take about 160 days.</p>
<p><b>Extract C</b> Why do we spend billions of dollars sending rockets to the Moon when there are so many problems to fix here on Earth? Surely that money would do more good in our hospitals and schools.</p>
<p><b>Extract D</b> Monday: half moon. Tuesday: a little fatter. Wednesday: cloudy, saw nothing. Thursday: nearly round. I'm drawing it every night for my science project, and Mum says bedtime is still eight o'clock, full moon or not.</p></div>`;
ext("same", 3, "rs3e", MOON, "Which extract uses a comparison to describe how something looks?", 0,
  ["", "it compares the Moon's distance with a car trip, which is about how far, not how it looks", "it compares spending on rockets with hospitals, not how anything looks", "the moon is described plainly (“a little fatter”), with no comparison"],
  "“Like a lantern someone had forgotten to take inside” compares the moon's look to a lantern.");
ext("same", 3, "rs3f", MOON, "Which extract uses a calculation to help the reader imagine a distance?", 1,
  ["it describes long shadows, not a distance", "", "it mentions money, not distance", "it records the moon's shape, not its distance"],
  "Extract B turns 384 000 km into a car trip: 384 000 ÷ 100 = 3840 hours, about 160 days. The calculation makes the distance easier to imagine.");
ext("same", 3, "rs3g", MOON, "Which extract asks a question that it does not expect the reader to answer?", 2,
  ["there is no question", "there is no question", "", "there is no question; it is a list of notes"],
  "Extract C opens with “Why do we spend …?” and then gives its own answer. The question is there to make a point, not to be answered.");
ext("same", 3, "rs3h", MOON, "Which extract records how something changes over several days?", 3,
  ["it describes one night only", "it gives one fixed distance, not a change", "it argues about money, not changes", ""],
  "Extract D is a diary of the moon's shape from Monday to Thursday.");
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
const LOST = `<div class="extracts"><p><b>Extract A</b> For years after Grandpa died, Gran kept his reading glasses on the bedside table, folded, as if he might need them in the morning. She dusted carefully around them every Sunday.</p>
<p><b>Extract B</b> When I lost my bus pass, I searched my bag four times, then my pockets, then my bag again. By the time I found it inside my lunch box, the bus had gone, and so had my temper.</p>
<p><b>Extract C</b> The council's lost-property office holds more than two thousand umbrellas. “People will spend twenty minutes describing a watch,” says the manager, “but hardly anyone ever comes back for an umbrella.”</p>
<p><b>Extract D</b> Mira told everyone that the bracelet didn't matter. It was only plastic, she said. But every afternoon that week she walked home the long way, past the park, with her eyes on the grass.</p></div>`;
ext("same", 4, "rs4e", LOST, "Which extract suggests that someone has not let go of a person who has gone?", 0,
  ["", "this is about a lost bus pass, not a person", "nobody here is missing a person", "Mira misses a bracelet, not a person"],
  "Gran keeps Grandpa's glasses ready “as if he might need them in the morning” and dusts AROUND them for years: she hasn't let go of him.");
ext("same", 4, "rs4f", LOST, "Which extract suggests that people don't bother much about cheap things they lose?", 2,
  ["the glasses are kept for love, not because of their price", "the writer searches hard for the pass", "", "Mira says the bracelet was cheap, but she keeps searching for it"],
  "Thousands of umbrellas are never collected, while people describe a watch at length: they don't bother with cheaper things.");
ext("same", 4, "rs4g", LOST, "Which extract suggests that someone is pretending not to care about a loss?", 3,
  ["Gran doesn't pretend: she openly keeps the glasses", "the writer openly loses their temper", "the people who leave umbrellas really don't care", ""],
  "Mira SAYS the bracelet doesn't matter, but she searches the grass every afternoon. Her actions show she does care.");
ext("same", 4, "rs4h", LOST, "Which extract suggests that someone ended up frustrated and cross?", 1,
  ["Gran is quietly sad, not cross", "", "the manager sounds amused, not cross", "Mira is quietly searching, not cross"],
  "“The bus had gone, and so had my temper”: the writer lost both the bus and their patience.");
