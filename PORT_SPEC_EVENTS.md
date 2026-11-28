# Events: the GO / STAY offers and the quick-time plays (port spec)

Promised since Review 3. Asked for again by the owner on 28 Nov ("the advance / no system and how the QTE plays work"). Code: `QTE_MOVES`, `goOffer`, `qteRisk`, `goTap`, `goStay`, `qteStart`, `qteShow`, `qteKey`, `qteDone`, `qteTick`, `cqSetup`, `cqStart`, `cqEnd`, `stealKind` in `index.html` (`port/code/06-events-qte.js`, `07-baserunning.js`). Comments by system: `port/06-events-qte.md`, `port/07-baserunning.md`. Pictures: `port/look/*_14_*`, `*_15_*` and the `phone_strip_*` sequences. Where this file and the code disagree, the code wins.

The owner's phrase for these: **"all of our QTEs should feel like climax moments."** And his hardest rule applies most here: **a player who wins an event never gets the wrong result or the wrong call.**

## Part 1. The advance offer: GO or STAY

**When it comes up (you are batting):** after a hit, or a deep fly that is caught, leaves one of your runners with a base he could try for:

| Offer | Situation |
|---|---|
| GO FOR TWO (`stretch2`) | Your hitter singles and could stretch it |
| GO FOR THREE (`stretch3`) | A double he could stretch |
| FIRST TO THIRD (`adv3`) | A single with a man on first |
| SEND HIM HOME (`plate`) | A hit with a man who could score |
| TAG UP to third / to second (`tag3`, `tag2`) | A fly caught more than 70 m out, fewer than two out |

**What the player sees:** a big green **GO** button bottom center (its label names the play) and a smaller **STAY** button, placed clear of the swing buttons. Under GO, the **odds**: "70% SAFE · GOOD ODDS", "50% · TOSS-UP" or "30% · LONG SHOT", and the button is tinted green, yellow or red to match.

**The odds are real.** One number, the difficulty `D` (0.55 easy to 1.6 very hard), is worked out from the play (`qteRisk`): how deep the ball was fielded (deeper is easier), which base (third and home are longer throws; left field is the short throw to third), and the runner's speed. The percentage shown is `92 − (D − 0.55) × 59`, clamped 25 to 92 and rounded to 5. The same `D` then sets how hard the event is. Nothing is rolled behind the player's back.

**Deciding:**
- The offer is up for **1.7 s** (2.6 s for a player who has never taken one). **No answer is a NO**: he holds, and the game moves on. Pace of play.
- **The outfielder holds the ball while you decide.** No throw is shown until you send him, hold him, or the offer runs out; then the throw is shown before the cut, so the play reads.
- **STAY** (or time out): the runner holds; the throw comes in; next hitter.
- **GO**: the event starts (Part 2).
- PC: G or Enter = GO, N or Esc = STAY.
- While an offer is up the picture stays on the field, the ball and the runners, so the decision can be read (no cutaways).

**The steal** is the other thing the player can call: with a man on first and second open, or on second with third open, fewer than two out, a **STEAL** button is up while the pitcher gets set and right through his wind-up until the ball leaves his hand (T on PC). One try per hitter. Press it and he goes on the pitcher's move: the jump is shown from up the line, then the throw down from behind the catcher, then the event at the bag. If the hitter swings and misses for strike three, the steal still goes. Not during a Showdown.

**Automatic ones:** a routine grounder with nobody on can become **BEAT IT OUT** (a race to first); a double-play grounder with a man on first can become **BREAK UP THE PLAY** (the take-out kick). These start without an offer.

**How often:** events are rationed so they stay special: at most about three a game on offense from the player's own sends once he has seen one (`qteOK`), and each defensive kind is rolled (30–45%). In playtest builds each kind is guaranteed once so the owner sees them all (`PLAY_NEWEST_FIRST`).

## Part 2. How an event plays

Every event has the same four beats. The whole thing takes 5 to 8 seconds.

1. **Heads-up (1.15 s; 1.5 s for a steal against you; almost none for your own steal, which has already been shown):** the call goes up big (HE'S GOING FOR TWO!, BREAK UP THE PLAY!, HE'S STEALING!) and the runner is seen from in front, coming. The crowd rises and **stays up until the call** (it must never go quiet).
2. **The approach (about 1.5 s):** the runner closes on the bag from 9.5 m to 2.6 m, seen from the side on the infield side of the line. On defense with a throw to make, the picture instead goes **behind the man with the ball**: he fields it, takes his steps toward the base (an infielder two quick shuffles; an outfielder one long crow hop), and **freezes cocked** for the inputs.
3. **The inputs** (one of three kinds, below), against a draining clock.
4. **The pay-off (2.4 s; 3.2 s when you lose on defense, so what it cost is read):** on defense the throw is seen leaving his hand with a trail, the picture cuts to the bag when the ball is most of the way there, and **the play is settled once, when the ball arrives** (never on a clock started earlier). Then the collision or the race, the umpire, the big call, the crowd.

Afterwards every runner is standing on his bag, the men who stepped out of the close-up are put back, and the game goes on (next hitter on offense; back to the mound on defense).

### The three kinds of input

The kind is picked at the start: arrows by default; once the player has seen an event, about a third are the mash and about four in ten are the needle. Some events are always arrows (MAKE THE PLAY).

**Arrows (a code to punch in)**
- A row of 4 to 8 arrows (each event has its own code, in `QTE_MOVES`); press them in order. On a phone a **d-pad takes the place of the AIM pad**: a touch anywhere on it counts as the direction it lies from the middle, so there are no dead gaps. On PC, arrow keys or WASD.
- **The arrows shown are always the arrows wanted** (redraw the row whenever the code changes).
- **A good bet is a shorter code:** when `D` is under 0.85 the last two arrows are dropped.
- **The clock:** `(0.38 s × arrows + 1.0 s) ÷ D^0.8`, plus 1.2 s the first time ever. So an even-odds six-arrow code allows about 3.3 s.
- **A right arrow** dings a step higher each time, with a tick in the hands. **A wrong arrow costs 0.3 s off the clock**, shakes the row, and **keeps your progress**.
- All in before the clock: won. Clock out: lost.

**The mash (hammer it)**
- A bar to fill by tapping anywhere (Space on PC). Each tap adds `1 / (15 × D^0.7)`; the bar leaks 11% a second so you cannot stop. 3.1 s (4.3 the first time). Full: won.

**The needle (one press)**
- A needle sweeps back and forth across a bar, a little faster each time it turns. **One press stops it.**
- **Green band = safe**; its width is the odds (wide on a good bet, narrow on a long shot). A thin **gold strip**, set well away from the green, is the gamble: **safe and two bars of Juice** (PERFECT JUMP). Anything else: out.
- **Judged where you saw it:** the press is scored against where the needle was drawn when the finger landed (the touch's own timestamp, less one frame of display), and the needle is put back there so the picture agrees. A hair of grace at the edges. 3.6 s.

### Winning and losing

- **Offense, won:** he slides in feet first (about six times in ten) or goes in with a flying kick; at the plate he can lower his shoulder and run the catcher over. The fielder is sent flying, the ball comes loose. SAFE!, +1 bar of Juice (+2 on gold).
- **Offense, lost:** the tag is on him and he goes back off his feet. OUT!
- **Defense, won:** the throw beats him, the tag is on, he is out. GUNNED DOWN! / OUT AT THE PLATE! / CAUGHT STEALING!, +1 bar for your pitcher.
- **Defense, lost:** he comes in hard, your fielder goes flying, he has the base. SAFE!, and it is held a beat longer.
- **Races with no collision** (to first: BEAT IT OUT, MAKE THE PLAY): he runs **through** the bag at full speed, the first baseman stretches for the throw; when he is out he is a clear step short as the ball goes into the mitt.
- **The umpire, the lettering, the achievement and the scoreboard all say the same thing**, and they say what happened to the **runner**: winning on defense means OUT.

### The list

**You are running (offense):**
| Event | Bag | Won | Lost |
|---|---|---|---|
| GOING FOR TWO / THREE | 2nd / 3rd | safe, takes the base | out |
| FIRST TO THIRD | 3rd | safe at third | out |
| SEND HIM HOME | plate | run scores | out at the plate |
| TAG UP | 2nd / 3rd | safe | out |
| STEAL SECOND / THIRD | 2nd / 3rd | stolen base | caught stealing |
| BEAT IT OUT | 1st | infield single | out |
| BREAK UP THE PLAY | 2nd | BROKE IT UP! no double play, safe at first | DOUBLE PLAY! |

**You are in the field (while you pitch):**
| Event | Call | Won | Lost |
|---|---|---|---|
| MAKE THE PLAY (a routine grounder is yours to finish; shown as THROW HIM OUT! unless it is your own pitcher's comebacker) | THROW HIM OUT! | ground out | E · BOOTED IT, safe |
| MAKE THE CATCH (a liner right at an infielder) | SCREAMER! | WHAT A GRAB! line out | OFF HIS CHEST! base hit, he goes down |
| THROW HIM OUT at second / third (he stretches a hit) | HE'S GOING FOR TWO / THREE! | GUNNED DOWN! | he takes the base |
| FIRST TO THIRD against you | HE'S GOING TO THIRD! | out at third | first to third |
| CUT HIM DOWN at the plate | HE'S COMING HOME! | OUT AT THE PLATE!, the run comes off the board | the run scores |
| GUN HIM DOWN on a tag-up | HE'S TAGGING UP! | out at the plate | he tags and scores |
| THROW HIM OUT stealing | HE'S STEALING! | CAUGHT STEALING! | stolen base |

A throw from the outfield is called THROW HIM OUT!, HOSE HIM! or GUN HIM DOWN! in turn.

**In-flight events (while the ball is still in the air, you pitching):** a ball right on the edge of being caught becomes yours for a moment: **DIVE FOR IT!**, **ROB HIM!** (offered every time a homer is low enough for your outfielder to get a glove on), **SNAG IT!** (a rocket at an infielder). The flight hangs in slow motion (time runs at 6%), and it is one press on the needle (3.2 s) or a mash (2.6 s). Made: MADE THE PLAY!. Missed: the play becomes what it would have been (GOT BY HIM!, OVER HIS GLOVE!, JUST OUT OF REACH), said in the big lettering with what it cost.

### Rules that hold for all of them

- Text and the input row never cover the runner, the fielder or the bag; on a phone the shot is framed so the thrower and the base sit in the clear band between the prompts and the pad.
- Achievement plates wait until it is over.
- No pitching controls or strike zone on screen during a play at a bag.
- The models used for the close-up stand in for the real fielders, who step out of the picture and are put back after. **Never a catcher's crouch on a fielder.**
- A tap can skip the heads-up, never the result.
- Tags and a wild throw are animation gaps to fill by capture (see the owner's notes in the chat record): until then the first baseman's stretch stands in at every bag.

### Tests

- For each event and each input kind: win and lose, checking outs, bases, runs and the call. In particular a **slow** win (inputs taking 2 to 3 seconds) gives the same single result as a fast one.
- The odds shown equal the formula for a spread of plays; a short code when `D` < 0.85.
- An unanswered offer is a STAY after 1.7 s and costs nothing.
- The needle is scored at the press's own timestamp.
