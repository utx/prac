/* RIDGE RUNNER: hand-written thinking questions (A–D). Four per step; answer letters spread within each step. */
const MIS = n => `Which statement shows the mistake ${n} has made?`;
/* ---------- Spot the mistake ---------- */
H("flaw", 1, "tf1a", { stem: `<p>Kit says: “My cousin adopted a puppy from Seaview Animal Rescue, and it was already perfectly trained. So every dog from Seaview Animal Rescue must be well trained.”</p><p>${MIS("Kit")}</p>`,
  opts: [["Seaview Animal Rescue may charge less than other shelters do.", "true or not, the price says nothing about whether the dogs are trained"],
    ["His cousin's puppy may have been one of the few trained dogs at the rescue.", null],
    ["Kit may not want a puppy of his own.", "what Kit wants has nothing to do with his reasoning"],
    ["Some families may prefer to buy a dog from a breeder instead of from a shelter.", "this is about other families' choices, not about the gap in Kit's reasoning"]],
  body: "Kit takes ONE example (his cousin's puppy) as proof about EVERY dog at the rescue. One example can't prove that: the puppy may have been unusual." });
H("flaw", 1, "tf1b", { stem: `<p>Priya says: “Everyone in my chess club thinks the school day should start later. So most students at our school must want a later start.”</p><p>${MIS("Priya")}</p>`,
  opts: [["Starting later may mean finishing later in the afternoon.", "a true effect of starting later, but it doesn't show the gap in Priya's reasoning"],
    ["Some teachers may also want the school day to start later.", "this would agree with Priya; it doesn't show her mistake"],
    ["Priya may be tired in the mornings because she goes to bed late on school nights.", "this is about Priya, not about how she reached her conclusion"],
    ["The chess club may not think the same way as the rest of the school.", null]],
  body: "Priya judges the whole school from her own small group. A chess club is only a few students, and they may not be typical of everyone else." });
H("flaw", 1, "tf1c", { stem: `<p>Leo says: “I've walked along this beach every Saturday morning for a year and I have never seen a dolphin. So dolphins never come to this beach.”</p><p>${MIS("Leo")}</p>`,
  opts: [["Dolphins may visit the beach at times when Leo is not there.", null],
    ["Leo may enjoy looking for shells more than looking for dolphins.", "what Leo enjoys doesn't show why his conclusion might be wrong"],
    ["Other beaches nearby may have far more visitors on Saturday mornings than this beach does.", "the number of visitors at other beaches has nothing to do with whether dolphins come here"],
    ["Dolphins may be harder to spot than seals are.", "comparing dolphins with seals doesn't touch Leo's reasoning"]],
  body: "Leo goes only on Saturday mornings. Not seeing something at the times HE is there doesn't prove it never happens. Dolphins could come on other days or at other times." });
H("flaw", 1, "tf1d", { stem: `<p>Whoever ate the last muffin left crumbs on a blue plate. Ava had her lunch on a blue plate today.</p><p>Max says: “So Ava must have eaten the last muffin.”</p><p>${MIS("Max")}</p>`,
  opts: [["Ava may have been very hungry at lunchtime.", "this would make Max's idea seem MORE likely; it doesn't show his mistake"],
    ["The muffins may have been bought at the bakery on the corner that morning.", "where the muffins came from doesn't matter to the reasoning"],
    ["Other people in the house may also have used blue plates today.", null],
    ["The last muffin may have been the biggest one in the box.", "the size of the muffin has nothing to do with who ate it"]],
  body: "Max treats one matching detail (a blue plate) as proof. If other people also used blue plates, the crumbs could be theirs." });
H("flaw", 2, "tf2a", { stem: `<p>To join the swim squad you must be able to swim 200 metres without stopping.</p><p>Mai says: “I can swim 200 metres without stopping, so I will get into the swim squad.”</p><p>${MIS("Mai")}</p>`,
  opts: [["Mai may have learned to swim when she was very young.", "when she learned doesn't change the reasoning"],
    ["The swim squad may train early in the morning before school.", "a fact about training times, not about Mai's mistake"],
    ["Mai may also need to pass other tests, such as a timed race, to get in.", null],
    ["Swimming 200 metres without stopping may be much harder than it sounds to most people.", "Mai can already do it, so this doesn't matter"]],
  body: "Swimming 200 m is NEEDED, but that doesn't mean it is ENOUGH. There may be other things the squad also needs." });
H("flaw", 2, "tf2b", { stem: `<p>Jack says: “Most of the apples on Grandpa's tree are sweet. So this apple I've just picked will definitely be sweet.”</p><p>${MIS("Jack")}</p>`,
  opts: [["This apple may be one of the few on the tree that are not sweet.", null],
    ["Grandpa's tree may grow more apples than he can eat.", "true or not, this doesn't touch Jack's reasoning"],
    ["Some people may prefer sour apples for cooking.", "what other people like is beside the point"],
    ["Apples bought from shops may be less sweet than apples picked straight from the tree.", "this compares shop apples, which Jack isn't talking about"]],
  body: "“Most” is not “all”. Most apples being sweet only makes this one PROBABLY sweet, not definitely." });
H("flaw", 2, "tf2c", { stem: `<p>Ruby says: “Plants need sunlight to grow. Our tomato plant gets lots of sunlight, so it is sure to grow well.”</p><p>${MIS("Ruby")}</p>`,
  opts: [["Tomato plants may grow taller in some years than in others.", "this doesn't show what Ruby has assumed"],
    ["Our garden may also have a lemon tree that gets plenty of sunlight.", "the lemon tree has nothing to do with Ruby's reasoning"],
    ["Some plants may need less sunlight than tomato plants do.", "other plants' needs don't show her mistake"],
    ["The plant may also need enough water and good soil to grow well.", null]],
  body: "Sunlight is NEEDED, but it isn't a GUARANTEE. The plant also needs other things, like water and good soil." });
H("flaw", 2, "tf2d", { stem: `<p>Most children at the holiday camp chose the canoe trip.</p><p>Tom's mum says: “Tom went to the camp, so he must have gone on the canoe trip.”</p><p>${MIS("Tom's mum")}</p>`,
  opts: [["The canoe trip may have cost more than the other activities.", "the cost doesn't show the gap in the reasoning"],
    ["Tom may have been one of the children who chose a different activity.", null],
    ["Canoeing may be more fun on a warm day than on a cold one.", "true perhaps, but nothing to do with the reasoning"],
    ["Some children may have wanted to try two or even three activities at the camp.", "this is about what children wanted, not about Tom's choice"]],
  body: "“Most” chose the canoe trip, so some didn't. Tom might be one of them." });
H("flaw", 3, "tf3a", { stem: `<p>This season the Owls played 20 netball games and scored 300 goals. The Hawks played 10 games and scored 200 goals.</p><p>Coach Lee says: “The Owls scored more goals, so they are better at scoring than the Hawks.”</p><p>${MIS("Coach Lee")}</p>`,
  opts: [["The Hawks may have let in more goals than the Owls did this season.", "this is about defending, not scoring, so it doesn't touch the comparison"],
    ["The Owls may have scored more goals in the second half of the season than in the first.", "true or not, it doesn't show what is unfair about comparing the two teams"],
    ["Scoring 300 goals may be a club record for the Owls.", "a record would make the Owls sound better: it agrees with the coach instead of showing the gap"],
    ["The Owls may have scored more only because they played twice as many games.", null]],
  body: "The comparison isn't fair: the Owls played twice as many games. Per game the Owls scored 300 ÷ 20 = 15 and the Hawks 200 ÷ 10 = 20, so the Hawks actually scored more each game." });
H("flaw", 3, "tf3b", { stem: `<p>New hand-washing posters went up in our school in October. Since then, fewer children have had colds.</p><p>Ms Tan says: “The posters have stopped children catching colds.”</p><p>${MIS("Ms Tan")}</p>`,
  opts: [["Some children may still forget to wash their hands after lunch.", "the posters could still have helped even if some children forget, so this doesn't show the gap"],
    ["Fewer children may have been away sick since October.", "this just repeats that there are fewer colds; it doesn't question why"],
    ["The posters may be put up in the other schools in our area next year as well.", "about the future, not about the reasoning"],
    ["Colds may have dropped simply because the weather has got warmer.", null]],
  body: "Ms Tan ignores another possible cause. In Australia, October to summer is when the weather warms up, and colds usually become less common anyway." });
H("flaw", 3, "tf3c", { stem: `<p>Jess grew two bean plants. Plant A was on a sunny windowsill and got plant food every week. Plant B was in a dark corner and got no plant food. Plant A grew much taller.</p><p>Jess says: “Plant food makes beans grow taller.”</p><p>${MIS("Jess")}</p>`,
  opts: [["Plant food may help some kinds of plants more than others.", "true about plant food, but it doesn't show what went wrong in Jess's test"],
    ["Jess may have given both plants the same amount of water each day.", "this would make the test FAIRER in one way; it doesn't show the problem"],
    ["Plant B may have grown more leaves than Plant A, even though it was shorter.", "a detail about leaves doesn't touch Jess's conclusion about height"],
    ["Plant A may have grown taller because of the sunlight, not the plant food.", null]],
  body: "The test wasn't fair: TWO things were different (plant food AND sunlight). Jess can't tell which one made plant A taller." });
H("flaw", 3, "tf3d", { stem: `<p>Shop P sold 300 ice creams on a Saturday. Shop Q sold 200 ice creams on the following Monday.</p><p>Mr Ford says: “Shop P's ice creams must be more popular than Shop Q's.”</p><p>${MIS("Mr Ford")}</p>`,
  opts: [["Shop P may also sell more cold drinks and snacks than Shop Q does on most days.", "about drinks, not about the unfair comparison of ice creams"],
    ["Shop Q's ice creams may be just as tasty as Shop P's.", "this only disagrees with Mr Ford; it doesn't show the mistake in HOW he compared"],
    ["Both shops may be open for the same number of hours each day.", "this would make the comparison fairer in one way; it doesn't show the problem"],
    ["Shop P may have sold more because Saturdays are busier than Mondays.", null]],
  body: "The comparison is unfair: the two shops were compared on different days. A Saturday is usually much busier than a Monday." });
H("flaw", 4, "tf4a", { stem: `<p>On every school day, the crossing guard is at the school gate.</p><p>Zac says: “The crossing guard is at the gate, so today must be a school day.”</p><p>${MIS("Zac")}</p>`,
  opts: [["The crossing guard may sometimes be late on school days.", "even if she is late sometimes, it doesn't show that Zac used the rule backwards"],
    ["There may be many more cars parked outside the school on school days than at weekends.", "true perhaps, but it doesn't touch Zac's reasoning"],
    ["Zac may have seen children in school uniform walking past the gate.", "this would SUPPORT Zac's idea that it is a school day"],
    ["The crossing guard may also be at the gate on some days that are not school days.", null]],
  body: "Zac turns the rule back to front. The rule says school day → guard at the gate. It doesn't say guard at the gate → school day. She could be there on other days too, for example for a weekend sports day." });
H("flaw", 4, "tf4b", { stem: `<p>Olivia says: “Either Dad took the car keys or Mum took them. Dad says he didn't, so Mum must have them.”</p><p>${MIS("Olivia")}</p>`,
  opts: [["Mum may have driven the car more often than Dad this week.", "this makes Olivia's guess seem more likely; it doesn't show the gap"],
    ["Mum may not remember where she put the keys.", "this assumes Mum has them, which is exactly what Olivia hasn't shown"],
    ["Dad may be telling the truth when he says he didn't take them.", "Olivia already believes Dad; this agrees with her"],
    ["Someone else, such as Grandma, may have taken the keys.", null]],
  body: "Olivia assumes there are only two possibilities. If someone else could have taken them, ruling out Dad doesn't prove it was Mum." });
H("flaw", 4, "tf4c", { stem: `<p>The Comets lost their game on Saturday. Two of their best players were sick.</p><p>The captain says: “We lost because two players were sick, so it can't have been because we hadn't practised enough.”</p><p>${MIS("the captain")}</p>`,
  opts: [["The two sick players may be the team's best shooters.", "this backs up the captain's first reason; it doesn't show the mistake"],
    ["Teams with two sick players may lose far more often than teams that have everyone fit and well.", "this also backs up the captain's first reason"],
    ["The other team may also have had one of its best players missing from that game.", "this questions the first reason, but the mistake is ruling out a SECOND reason"],
    ["There may have been more than one reason, such as missing players and little practice.", null]],
  body: "The captain assumes one cause rules out another. Things often happen for more than one reason at once." });
H("flaw", 4, "tf4d", { stem: `<p>Everyone who wins the art prize has a painting in the school art show.</p><p>Ruby has a painting in the school art show. Her friend says: “So Ruby must have won the art prize!”</p><p>${MIS("Ruby's friend")}</p>`,
  opts: [["Ruby may have won the art prize in an earlier year.", "an earlier year has nothing to do with this year's reasoning"],
    ["The prize-winning painting may hang in the middle of the show.", "where it hangs doesn't show the friend's mistake"],
    ["Only a few of the children in the school may have entered paintings for the art prize.", "even with few entries, being in the show still doesn't prove Ruby won"],
    ["Many children may have paintings in the show without having won the prize.", null]],
  body: "The rule is prize → painting in the show. Ruby's friend uses it backwards (painting in the show → prize). Lots of children can have paintings in the show without winning." });

/* ---------- Supports the claim ---------- */
const SUP = n => `Which statement best supports ${n}'s claim?`;
H("claim", 1, "tc1a", { stem: `<p>Ms Reyes: “Our class should plant a vegetable garden so that we learn where our food comes from.”</p><p>${SUP("Ms Reyes")}</p>`,
  opts: [["Vegetable gardens need watering every day in summer.", "true about gardens, but it doesn't show they teach where food comes from (and it is a reason against)"],
    ["Many supermarkets sell vegetables grown on big farms in other countries far away.", "about supermarkets, not about learning from a garden"],
    ["Growing vegetables shows children how food grows from a seed into a meal.", null],
    ["Our class won the poster prize last term.", "nothing to do with the garden or the goal"]],
  body: "The claim is “do X (plant a garden) so that Y (we learn where food comes from)”. Only one option links the garden to learning where food comes from." });
H("claim", 1, "tc1b", { stem: `<p>Coach Sam: “We should warm up before every training session so that fewer players get injured.”</p><p>${SUP("Coach Sam")}</p>`,
  opts: [["Muscles that have been warmed up are less likely to be strained.", null],
    ["Most of the team say they enjoy training on Saturday mornings more than weekdays.", "about enjoying training, not about injuries"],
    ["A good warm-up takes about ten minutes.", "a fact about warm-ups, but it doesn't link them to fewer injuries"],
    ["Injuries can stop players from training for weeks.", "this shows injuries are bad (Y), but not that warming up prevents them"]],
  body: "X = warm up, Y = fewer injuries. The answer has to show that warming up leads to fewer injuries." });
H("claim", 1, "tc1c", { stem: `<p>A council worker: “We should put more bins in the park so that there is less litter.”</p><p>${SUP("the council worker")}</p>`,
  opts: [["The park is busiest on weekends and in the school holidays, especially in summer.", "about when the park is busy, not about bins"],
    ["Litter in parks can harm birds and fish.", "this shows litter is bad (Y) but not that bins reduce it"],
    ["New bins cost money to buy and to empty.", "a reason against, not a support"],
    ["People are more likely to put rubbish in a bin when one is close by.", null]],
  body: "X = more bins, Y = less litter. Only one option shows that having bins nearby leads to less litter." });
H("claim", 1, "tc1d", { stem: `<p>Grandpa: “You should read a book before bed so that you fall asleep more easily.”</p><p>${SUP("Grandpa")}</p>`,
  opts: [["The library has hundreds of books for children.", "about where to get books, not about sleep"],
    ["Reading helps the mind slow down and relax, which makes sleep come more easily.", null],
    ["Children need about ten hours of sleep every night.", "about sleep (Y) only; it doesn't involve reading"],
    ["Some people like to read on a tablet or a phone instead of holding a paper book.", "about how people read, not about falling asleep"]],
  body: "X = read before bed, Y = fall asleep more easily. The answer must connect reading to falling asleep." });
H("claim", 2, "tc2a", { stem: `<p>The principal: “Our school should start a walking bus, where parents walk a group of children to school at a set time, so that fewer children are late.”</p><p>${SUP("the principal")}</p>`,
  opts: [["Walking to school is good exercise for children.", "true about walking (X), but it supports a different goal (health), not being on time"],
    ["The walking bus leaves at a set time, so children who join it arrive before the bell.", null],
    ["Children who are late miss the start of the first lesson and have to sign in at the office.", "this shows being late is a problem (Y) but doesn't involve the walking bus"],
    ["Some parents drive their children to school.", "nothing links this to being on time"]],
  body: "Two options are true but only about one half: walking (X) or being late (Y). Only one links the walking bus to arriving on time." });
H("claim", 2, "tc2b", { stem: `<p>Mia: “We should take a shopping list to the supermarket so that we spend less money.”</p><p>${SUP("Mia")}</p>`,
  opts: [["A shopping list can be written on a phone.", "true about lists (X), but it doesn't show they save money"],
    ["Supermarket prices go up a little every year, especially for fruit and vegetables.", "about prices, not about using a list"],
    ["Some families shop only once a week.", "about how often people shop"],
    ["People with a list tend to buy only what they need, not extra things they see.", null]],
  body: "X = take a list, Y = spend less. The answer must show that a list leads to spending less: you buy only what's on it." });
H("claim", 2, "tc2c", { stem: `<p>A librarian: “The library should stay open until 8 pm so that more adults who work during the day can borrow books.”</p><p>${SUP("the librarian")}</p>`,
  opts: [["Many adults who work during the day finish after the library closes at 5 pm.", null],
    ["Adults who read often say that it helps them relax.", "about reading being good for adults, not about opening later"],
    ["The library also lends DVDs and board games.", "true, but it doesn't link opening later to more borrowing"],
    ["Staying open later would cost the library more money in electricity and staff wages.", "a reason against the claim"]],
  body: "X = open later, Y = more working adults borrow books. The link: those adults can't come before 5 pm now." });
H("claim", 2, "tc2d", { stem: `<p>Dad: “We should hang the bird feeder outside the kitchen window so that we can watch the birds.”</p><p>${SUP("Dad")}</p>`,
  opts: [["Birds eat more seed in winter than in summer.", "about how much birds eat, not about watching them"],
    ["A bird feeder should be cleaned every week.", "about looking after a feeder, not where it goes"],
    ["From the window we can see the feeder clearly without scaring the birds.", null],
    ["Watching birds is a popular hobby in Australia, and many people keep a notebook of sightings.", "about watching birds in general (Y), but not about this window"]],
  body: "X = hang it by the window, Y = watch the birds. Only one option links that place to watching." });
H("claim", 3, "tc3a", { stem: `<p>Coach Ana: “Our runners should eat breakfast before every race so that they run faster.”</p><p>${SUP("Coach Ana")}</p>`,
  opts: [["Runners who win races often say they ate a good breakfast that morning.", "this only shows winners and breakfast go together; they might win for other reasons"],
    ["Runners who eat a big, heavy meal just before a race can get a stomach ache and run slowly.", "this works AGAINST eating before a race"],
    ["Breakfast is often called the most important meal of the day.", "a general saying about breakfast; it doesn't link breakfast to running faster"],
    ["Breakfast gives the body energy, and runners with more energy can keep up their speed.", null]],
  body: "Only one option explains HOW breakfast (X) leads to running faster (Y). Watch for options that just show two things happening together." });
H("claim", 3, "tc3b", { stem: `<p>A teacher: “We should paint our classroom in bright, warm colours so that the children feel more cheerful.”</p><p>${SUP("the teacher")}</p>`,
  opts: [["Children enjoy choosing the paint colours for their own classroom.", "this is about enjoying the choice, not about how the colours make them feel"],
    ["Cheerful children are more likely to enjoy coming to school.", "this is what happens AFTER children are cheerful; it doesn't show colours make them cheerful"],
    ["Schools that have just been painted often have happier students than schools that haven't.", "this shows two things go together, and it is about new paint, not bright colours"],
    ["People report feeling more cheerful in rooms painted in bright, warm colours.", null]],
  body: "X = bright colours, Y = more cheerful children. One option links them directly." });
H("claim", 3, "tc3c", { stem: `<p>Dad: “We should get a dog so that our family goes walking more.”</p><p>${SUP("Dad")}</p>`,
  opts: [["Families who walk a lot are often the ones who already own dogs, cats or other pets.", "this shows walking and pets go together, but walkers may choose pets, not the other way round"],
    ["Walking together is a good way for families to talk and catch up.", "this is a good result of walking (Y), but it doesn't involve the dog"],
    ["Some dog breeds are happy with only a short walk each day.", "this works slightly AGAINST the claim"],
    ["A dog needs a walk every day, so someone in the family would have to take it out.", null]],
  body: "The link must show that having a dog CAUSES more walking. “Go together” is not the same as “because”." });
H("claim", 3, "tc3d", { stem: `<p>A council member: “We should build a bike path to the beach so that fewer cars are parked there.”</p><p>${SUP("the council member")}</p>`,
  opts: [["People who ride bikes are often fitter and healthier than people who drive to the beach.", "this supports a different goal (health), not fewer cars"],
    ["The beach car park is full on hot summer days.", "this describes the problem (Y) but doesn't involve the bike path"],
    ["Bike paths in other towns are popular with tourists.", "popular elsewhere doesn't show that local people would leave their cars at home"],
    ["People who could ride safely to the beach would leave their cars at home.", null]],
  body: "X = a bike path, Y = fewer parked cars. Only one option links the path to people leaving their cars behind." });
H("claim", 4, "tc4a", { stem: `<p>A parent: “The canteen should sell water instead of fizzy drinks so that children's teeth stay healthy.”</p><p>${SUP("the parent")}</p>`,
  opts: [["Children who drink a lot of water are often healthier overall.", "close, but it is about health in general, not teeth, and only shows two things go together"],
    ["Dentists say that sugar in many foods can harm teeth.", "true about teeth, but it doesn't show that swapping the canteen's DRINKS helps"],
    ["Many children at the school say they would happily drink water with their lunch instead.", "this shows the plan could work, not that it would keep teeth healthy"],
    ["Fizzy drinks contain sugar and acid that damage teeth, but water does not.", null]],
  body: "Several options sound helpful, but only one shows that swapping fizzy drinks for water (X) protects teeth (Y)." });
H("claim", 4, "tc4b", { stem: `<p>The club leader: “Our club should meet on Saturday mornings instead of Tuesday evenings so that more members come.”</p><p>${SUP("the club leader")}</p>`,
  opts: [["Saturday meetings would let the club use the big hall.", "a different benefit, not more members coming"],
    ["More members coming would mean the club could take on bigger and more ambitious projects together.", "this is what happens AFTER more members come; it doesn't show Saturday brings them"],
    ["Most members say Saturday is their favourite day of the week.", "liking a day is not the same as being free to come"],
    ["Many members have sport or homework on Tuesday evenings but are free on Saturday mornings.", null]],
  body: "X = move to Saturday, Y = more members come. The link: members are busy on Tuesdays but free on Saturdays." });
H("claim", 4, "tc4c", { stem: `<p>Lena: “Students should be allowed to listen to quiet music while they do maths so that they concentrate better.”</p><p>${SUP("Lena")}</p>`,
  opts: [["Most students say they enjoy listening to music.", "enjoying music isn't the same as concentrating better"],
    ["Students who listen to music at home often finish their homework faster.", "this only shows two things go together, at home, and finishing fast isn't concentrating better"],
    ["Some teachers already play quiet music in the morning while students come into the classroom and unpack their bags.", "about music in class, but it doesn't show music helps students concentrate on maths"],
    ["In a trial, students working with quiet music made fewer careless mistakes than students working in silence.", null]],
  body: "Only one option compares students with and without quiet music and shows better concentration (fewer careless mistakes)." });
H("claim", 4, "tc4d", { stem: `<p>A librarian: “We should display the newest books just inside the front door so that more children borrow them.”</p><p>${SUP("the librarian")}</p>`,
  opts: [["Children who borrow more books from the library often become stronger and more confident readers over time.", "a good result of borrowing, but it doesn't show the display leads to more borrowing"],
    ["New books often have the brightest, most eye-catching covers.", "true about new books, but it doesn't say WHERE they should go"],
    ["Last year the library bought more new books than ever before.", "about buying books, not about children borrowing them"],
    ["Children often choose a book they see as soon as they walk in rather than searching the shelves.", null]],
  body: "X = display new books by the door, Y = more children borrow them. The link: children pick what they see first." });

/* ---------- Rules and reasoning ---------- */
H("rule", 1, "tr1a", { stem: `<p>At Hilltop School, every child in the choir sings at the Friday assembly. Omar is in the choir.</p><p>Which of these <b>must</b> be true?</p>`,
  opts: [["Everyone who sings at the Friday assembly is in the choir.", "this turns the rule around; others might sing at assembly too"],
    ["Omar sings at the Friday assembly.", null],
    ["Omar does not sing at any other assembly.", "the rule says nothing about other assemblies"],
    ["Most children at Hilltop School are in the choir.", "the rule doesn't tell us how many are in the choir"]],
  body: "The rule is an arrow: in the choir → sings on Friday. Omar is in the choir, so go forwards along the arrow: he sings on Friday." });
H("rule", 1, "tr1b", { stem: `<p>If the pool is open, the flag on its gate is green. Today the flag is <b>not</b> green.</p><p>Which of these <b>must</b> be true?</p>`,
  opts: [["The pool is closed every day this week.", "we only know about today"],
    ["If the flag is green, the pool is open.", "this turns the rule around; the rule doesn't say it"],
    ["The flag is red today.", "the flag might be another colour, or not there at all"],
    ["The pool is not open today.", null]],
  body: "Open → green flag. If the pool were open today, the flag would be green. It isn't, so the pool can't be open." });
H("rule", 1, "tr1c", { stem: `<p>Every bus on the Red Line stops at the museum. Bus 12 is on the Red Line.</p><p>Which of these <b>cannot</b> be true?</p>`,
  opts: [["Bus 12 does not stop at the museum.", null],
    ["Bus 12 also stops at the zoo.", "the rule doesn't stop Red Line buses going to other places too, so this could be true"],
    ["Some buses that stop at the museum are not on the Red Line.", "the rule only talks about Red Line buses; other buses could stop there too"],
    ["Bus 7 stops at the museum.", "we know nothing about Bus 7, so this could be true"]],
  body: "Red Line → stops at the museum. Bus 12 is on the Red Line, so it MUST stop at the museum. The statement that says it doesn't cannot be true." });
H("rule", 1, "tr1d", { stem: `<p>Anyone who scores 10 out of 10 in the spelling quiz gets a gold star. Ella did <b>not</b> get a gold star.</p><p>Which of these <b>must</b> be true?</p>`,
  opts: [["Ella scored 9 out of 10.", "too exact: she might have scored any number below 10"],
    ["Ella will get a gold star next time.", "nothing tells us about next time"],
    ["Ella did not score 10 out of 10.", null],
    ["Only children who score 10 out of 10 get gold stars.", "the rule doesn't say gold stars can't be given for anything else"]],
  body: "10 out of 10 → gold star. If Ella had scored 10, she would have a star. She has none, so she didn't score 10." });
H("rule", 2, "tr2a", { stem: `<p>Only children who have returned a permission note can go on the excursion. Kai has returned his note.</p><p>Which of these is correct?</p>`,
  opts: [["Kai will definitely go on the excursion.", "the note is NEEDED but not a promise: he might be sick, or need to pay too"],
    ["Kai cannot go on the excursion.", "he has done what is needed, so nothing rules him out"],
    ["Kai has done something he needs, but that alone does not make it certain he will go.", null],
    ["Everyone who returned a permission note has already paid for the excursion and packed their lunch.", "nothing in the rule mentions paying"]],
  body: "“Only children with a note” means the note is NEEDED. Needed isn't the same as guaranteed." });
H("rule", 2, "tr2b", { stem: `<p>You must be at least 140 cm tall to go on the Thunder ride. Lena is 145 cm tall.</p><p>Which of these <b>must</b> be true?</p>`,
  opts: [["Lena is tall enough for the Thunder ride.", null],
    ["Lena will go on the Thunder ride.", "being tall enough is needed, but she might not want to go or might not have a ticket"],
    ["Everyone taller than 140 cm enjoys the Thunder ride.", "the rule says nothing about enjoying it"],
    ["Lena's younger brother is too short for the ride.", "we know nothing about her brother"]],
  body: "The height rule tells us who is ALLOWED, not who will go. Lena meets the height rule, and that's all we know." });
H("rule", 2, "tr2c", { stem: `<p>To play in the final, a team must first win its semi-final. The Rockets are playing in the final.</p><p>Which of these <b>must</b> be true?</p>`,
  opts: [["The Rockets will win the final.", "being in the final doesn't mean winning it"],
    ["The Rockets have never lost a game.", "they might have lost earlier games"],
    ["The Rockets won the final last year.", "nothing tells us about last year"],
    ["The Rockets won their semi-final.", null]],
  body: "Winning a semi-final is NEEDED to be in the final. The Rockets are in the final, so they must have won their semi-final." });
H("rule", 2, "tr2d", { stem: `<p>Seeds need water to sprout. Ivy watered her seeds every day.</p><p>Which of these is correct?</p>`,
  opts: [["Ivy's seeds will certainly sprout.", "water is needed but not a guarantee; the seeds might be old, or need warmth too"],
    ["Ivy gave her seeds something they need, but they may still not sprout.", null],
    ["Seeds that are watered every single day always grow into tall, healthy plants by the end of summer.", "far more than the rule says"],
    ["Ivy's seeds did not need any sunlight.", "the rule says nothing about sunlight either way"]],
  body: "A need is not a promise. Water is needed; it doesn't make sprouting certain." });
const WHOSE = (a, b) => [[`${a} only`], [`${b} only`], [`Both ${a} and ${b}`], [`Neither ${a} nor ${b}`]];
const whose = (track, rung, id, a, b, rule, sa, sb, right, why, body) => {
  const o = WHOSE(a, b).map((x, i) => [x[0], i === right ? null : why[i]]);
  H(track, rung, id, { stem: `<div class="box">${rule}</div><p><b>${a}:</b> “${sa}”</p><p><b>${b}:</b> “${sb}”</p><p>If the information in the box is true, whose reasoning is correct?</p>`, opts: o, body });
};
whose("rule", 3, "tr3a", "Ruby", "Dev", "Every child who plays in the school band must practise on Monday afternoons.",
  "Sam practises on Monday afternoons, so he must play in the band.", "Nina plays in the band, so she must practise on Tuesday afternoons too.", 3,
  ["Ruby turns the rule around: other children could practise on Mondays without being in the band", "Dev adds Tuesdays, which the rule never mentions", "both of them go beyond the rule", ""],
  "Ruby uses the rule backwards (practises on Monday → in the band). Dev invents a second practice day. Neither is correct.");
whose("rule", 3, "tr3b", "Zara", "Noah", "At the fair, every child who finishes the maze gets a sticker.",
  "Liam has a sticker, so he must have finished the maze.", "Ava didn't get a sticker, so she didn't finish the maze.", 1,
  ["Zara uses the rule backwards: stickers might be given for other things too", "", "Zara's reasoning is not correct", "Noah's reasoning IS correct"],
  "Zara goes backwards along the arrow (sticker → maze), which isn't allowed. Noah is right: if Ava had finished, she would have a sticker.");
whose("rule", 3, "tr3c", "Kim", "Tom", "Only students who have a library card can borrow e-books.",
  "Leo borrowed an e-book, so he must have a library card.", "Mia has no library card, so she can't borrow e-books.", 2,
  ["Tom is correct too", "Kim is correct too", "", "both of them are correct"],
  "“Only students with a card” means a card is NEEDED. Kim: Leo borrowed one, so he must have the card he needed. Tom: Mia doesn't have what is needed, so she can't. Both are correct.");
whose("rule", 3, "tr3d", "Ella", "Finn", "If the fire alarm rings, everyone must leave the building.",
  "The alarm rang this morning, so everyone had to leave the building.", "Everyone left the building at lunchtime, so the alarm must have rung.", 0,
  ["", "Finn uses the rule backwards: everyone might leave at lunchtime for other reasons", "Finn's reasoning is not correct", "Ella's reasoning IS correct"],
  "Ella goes forwards along the arrow (alarm → leave). Finn goes backwards (leave → alarm), and people can leave for lots of other reasons.");
H("rule", 4, "tr4a", { stem: `<p>Most of the cats at the animal shelter are more than five years old. Bella is a cat at the shelter.</p><p>Which of these is the best conclusion?</p>`,
  opts: [["Bella is probably more than five years old.", null],
    ["Bella is definitely more than five years old.", "“most” only gives “probably”: Bella could be one of the younger cats"],
    ["Bella is more likely to be younger than five years old.", "the opposite: most cats there are older, so older is more likely"],
    ["Every cat at the shelter is more than five years old.", "“most” is not “every”"]],
  body: "“Most” lets you say “probably”, never “definitely”." });
H("rule", 4, "tr4b", { stem: `<p>A bag holds 4 red, 3 blue and 2 green marbles. Without looking, Jai takes marbles out one at a time.</p><p>What is the smallest number he must take to be <b>certain</b> of having two marbles of the same colour?</p>`,
  opts: [["2", "two marbles could be different colours"],
    ["3", "three could be one of each colour"],
    ["4", null],
    ["5", "four is already enough to be certain"]],
  body: "Think of the worst case. The first three could all be different: one red, one blue, one green. The fourth must match one of them. So 4." });
whose("rule", 4, "tr4c", "Lucy", "Jai", "Most children in class 4K walk to school.",
  "Max walks to school, so he is probably in 4K.", "Pia is in 4K, so she probably walks to school.", 1,
  ["Lucy turns it around: lots of children in other classes walk too", "", "Lucy's reasoning is not correct", "Jai's reasoning IS correct"],
  "Jai uses “most” the right way: in 4K → probably walks. Lucy goes backwards (walks → probably in 4K), but walkers could come from any class.");
H("rule", 4, "tr4d", { stem: `<p>A drawer holds 5 black socks and 5 white socks, all mixed up. The room is dark.</p><p>How many socks must Ben take out to be <b>certain</b> of getting two <b>black</b> socks?</p>`,
  opts: [["2", "two socks could both be white"],
    ["3", "three is enough for a matching pair of SOME colour, but they could be white"],
    ["6", "after all 5 white socks, one more gives only one black sock"],
    ["7", null]],
  body: "Worst case: the first 5 socks are all white. Then he needs 2 more to be sure of two black: 5 + 2 = 7." });
