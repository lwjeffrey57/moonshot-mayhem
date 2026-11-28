# Walk-ups: how they work, how they are shown, how they are skipped (port spec)

Asked for by the owner on 28 Nov, with the instruction to start building them in Unity. Code: `WALK`, `walkWant`, `startWalkup`, `endWalkup`, `plainWalk`, the intro part of `updateClip`, the `walkup` branch of `updateCamera`, and `pdHitter` (the Krakens' walk-ups when you pitch) in `index.html`. Clips: the `w_` family in `ely_clips.min.json` (`port/data/ASSETS.md`). Pictures: `port/look/phone_02_walkup_card`, `pc_02_*`, and the Kraken walk-up in the pitching set. Where this file and the code disagree, the code wins.

## What a walk-up is

A short scene, **3.4 seconds** (`WALK.dur`), every time a hitter comes to the plate: he does **his own routine** in the batter's box while **his card** comes up under him and NOW BATTING is called. It gives every player a personality, tells you who is up and how good he is, and it is where the game is funny. Then he settles into his stance and the at-bat starts.

## Who gets one, and when

- **Every hitter, every time up** (one walk-up per trip to the plate), when walk-ups are switched on. The setting is "Walk-ups: on / off (faster pace)", default on, remembered.
- **The man leading off a half-inning always gets one, whatever the setting.**
- Not in batting practice, the Derby or the Gauntlet.
- After the pitcher's own show on the mound (his Overdrive reveal, a pitching change) the at-bat just starts: never two scenes back to back for one hitter.
- **When you pitch, every Kraken hitter gets one too**, with the same shot and the same card.

## Which routine

- **Each Comet has his own:** Razor `w_milling`, Xenon `w_flair`, Vrel `w_drive`, Brickhouse `w_boxing`, Vanta `w_arrow`, Draak `w_macarena`, Zephra `w_bdance`, Crash `w_sad`, Gormak `w_salsa`.
- **The game always opens plain:** the first hitter of a game simply walks to the plate (`w_walkin`), or steps in, taps the plate and gets set (`w_stepup`), about half and half and never the same one twice running. "The silliness starts with the second hitter."
- **Surprises:** about 3% of the time a rare routine replaces his own: he trips on the way in, staggers, does a cartwheel, chips a golf shot with the bat, waves at the pitcher, drops for push-ups, squares up to fight, threatens, break-dances, backflips, lifts the bat like a barbell, throws a hurricane kick. **For a new player (first three games) the second hitter always brings one**, so nobody plays a whole game without seeing what this game is.
- **Krakens:** the first man of the half walks in plain; the rest bring a routine picked at random, never the same one twice running.
- Some routines are **walk-up only** and never used as celebrations: `w_milling`, `w_drive`, `w_golf`, `w_sad`, `w_drunk`.

## How it is shown

- **Where he stands:** in the batter's box, at his measured stance spot (`PORT_SPEC_CONTACT_FEEL.md`, "Where the hitter stands"). **Every routine is fitted to stay in the box:** when the clips are loaded, the game measures how far each one sits (or finishes) from his stance position and offsets it, so a dance does not wander onto the plate and the routine ends where the stance begins. He **stays facing the pitcher**, so it plays as a taunt.
- **The bat:** in his hands through the routine unless the routine does something with it (bat on the shoulder walking in, lifted like a barbell, flat on the ground for push-ups, low in one hand for the sad walk). Those cases are handled by name in the prototype (`upW`, `liftW`, `flatW`, `dnW`); in Unity author the bat's grip per routine so it never floats or clips.
- **The camera:** closer and lower than the batting camera, on the open side of the plate, framing the hitter from about the knees up with **clear space above his head for the call** and room under him for the card; the lens narrows a little for the shot and eases back out to the batting view as it ends. Mirrored for a left-handed hitter. (Exact numbers: the `walkup` branch of `updateCamera`.)
- **The card, under the hitter** (never over him, never under a thumb): his portrait on the left; "#27 · CF · BATS R"; his name; his overall in a tier gem (Bronze to Ruby), with the card's border in the tier's color; POWER / CONTACT / SPEED as letter grades with + and −; and a bottom line: "BATTING 3RD" plus his perk ("★ PROFESSIONAL HITTER") or his sponsor line ("A ZAPP COLA ATHLETE"). On a computer it also shows his day so far ("TODAY 1-2 · HR").
  - **About one time in twelve** the grades give way to a **DID YOU KNOW?** line about him (ten jokes each, never the same one twice running; all in `TRIVIA`).
  - **Card and portrait arrive together:** the first time a hitter comes up the card waits a beat for his portrait, never more than a second.
  - **Locked In:** if he is Locked In the card says so and LOCKED IN! · OVERDRIVE READY is called.
  - **A Kraken's card** is the same card with EYE in place of SPEED and a bottom line for **THE DUEL**: "ACE 80 vs ZLORP 81 · DEAD EVEN" (or YOUR EDGE / HIS EDGE), plus his perk.
- **The call:** NOW BATTING slides in above him. It never waits long: if the last play's call is still up two thirds of a second into the walk-up, that call steps aside.
- **Sound:** a small cheer for a Comet; when you pitch, the crowd hushes for a Kraken and a few boos follow.
- **The first walk-up says TAP TO SKIP** on the card (SWING TO SKIP on a computer).

## How it ends

At 3.4 s (or on a skip) the card goes, the camera returns to the batting view, and he **blends from the routine into his stance over about 0.2 s**; the pitcher starts his wind-up 1.5 s later. No pop, no frame of T-pose, no bat jumping between hands.

## Skipping: one tap, at once, with nothing broken

- **Any tap on the swing buttons or the screen ends the walk-up immediately** (any key on a computer; any touch or key when you pitch). No hold, no confirm, no minimum time beyond a 0.12 s guard so the tap that ended the last scene does not also end this one.
- **A skip is exactly the same as letting it finish:** it calls the same ending. The hitter is in his stance at his spot, the bat in both hands, the card gone, the camera home, the pitcher's 1.5 s timer started. **It never skips the at-bat, never eats the first swing** (the tap that skips is not also a swing at the pitch), never leaves the routine's pose, sound or camera running, and never double-fires.
- **If his body is not ready yet** (still loading), the picture never shows an empty box or a stand-in changing into him: the game holds on the last shot (or on your pitcher) and cuts to the walk-up the moment he is there. **A tap during that wait skips the wait and the walk-up together** and the at-bat starts.
- A pause during a walk-up freezes it; resume carries on.
- Things that used to go wrong in the prototype and must not come back: the retired hitter popping back into the box for a moment before the new man appeared; the card showing with no portrait; a skipped walk-up leaving the walk-up camera on; achievement plates covering the card (they wait).

## Building it in Unity (start now)

1. **Import the `w_` clips** onto the shared skeleton and, for each body and each routine, **measure the root offset** needed to keep it in the box and end at the stance (the prototype does this at load; in Unity bake it once in an editor tool).
2. **One walk-up scene object** in the flow state machine (`PORT_SPEC_FLOW.md`) with a single `End()` used by both the timer and the skip.
3. **The camera** as a Cinemachine shot blended to and from the batting camera.
4. **The card** from `port/ui/style.css` (`#walk`), laid out inside the safe area at every phone size, using the pre-rendered portraits (item 20).
5. **The picking rules** above as data (who has which routine, the plain opener, the surprise pool, never twice running).
6. Then the Krakens' walk-ups on the mound with THE DUEL line.

**Blend properly:** these are captured clips that the prototype stitches by hand. In Unity blend in and out, keep the feet planted, and keep the bat gripped.

## Tests

- Every Comet's routine stays inside the batter's box and ends within a few centimeters of his stance spot, right- and left-handed.
- A skip at 0.2 s, 1.0 s and 3.3 s leaves exactly the same state as no skip, and the next pitch comes 1.5 s later in every case.
- A tap that skips does not produce a swing or a practice cut.
- With a body deliberately delayed, no empty box and no stand-in is ever shown; a tap during the wait starts the at-bat.
- Walk-ups off: only leadoff men get one. On: every hitter, once per trip.
- The opener is always plain; the same routine never comes up twice running where the rules say so.
