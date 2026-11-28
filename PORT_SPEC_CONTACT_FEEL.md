# The feel of contact: everything that makes hitting satisfying (port spec)

The owner calls hitting the best part of the game. This is every single thing the prototype does around a swing, a hit and a miss, small things included, so none of it is lost. He is about to judge the Unity build by hand on his iPhone; anything missing here will read to him as "it does not feel like our game."

Authority: `tryContact()` from the line `// ── the payoff` onward, and the per-frame code named below. Readable copies: `port/code/01-hitting.js`, `port/code/15-bat-swing-pitcher-sound.js`, `port/code/14-audio.js`. Pictures: `phone_07_ball_in_play_feedback_panel`, the `phone_strip_homer_*` strips.

Status column: what the web session found in the Unity repo at commit `bb3f3d6` by searching the code. **Have** = found. **Missing** = not found. Confirm each yourself.

## At the instant of contact

| # | What | Exact rule | Status |
|---|---|---|---|
| 1 | **Freeze** (hit-stop) | `(.045 + .14 × q × (power ? 1 : .6) + (Juice ? .06 : 0))` seconds, halved in reduce-motion. The whole game holds for that long. | Have |
| 2 | **Camera shake** | `(.05 + .3 × q × (power ? 1 : .5) + (Juice ? .2 : 0))`. Each frame the camera's x and y jitter by up to that value; it decays by `exp(−7 × dt)`. | Have |
| 3 | **Lens kick** | Field of view jumps by `4 + 10 × q` degrees and decays by `exp(−5 × dt)`. | Have |
| 4 | **Slow motion** | On a power or Juice swing with q above .7: 0.55 s, time scale easing from 0.22 back to 1 over the last 0.35 s. | Have |
| 5 | **White flash** | Full-screen white at opacity `.25 + .6 × q`, snapping on and fading over 0.35 s. | Have |
| 6 | **Shock ring** | At the contact point, growing from .06 to `.06 + (.3 + .8q) × .9` over 0.3 s while fading from 90% to nothing. | Have |
| 7 | **Sparks** | A burst at the contact point: `14 + 60q` particles, speed `4 + 9q`, life 0.5 s, gravity 6. Color: pale gold normally, orange with Juice, blue in Overdrive. | Have (confirm count and color) |
| 8 | **The crack of the bat** | `SND.crack(q, power or Juice)`: synthesized, harder and brighter with quality. With Juice or Overdrive an electric `SND.zap()` on top. | **Missing: no sound at all** |
| 9 | **The crush** | The recorded `crush` sound on a Juice or Overdrive ball in play, and on a homer of 420 ft or more or any admire shot. | **Missing** |
| 10 | **The no-doubter crack** | The recorded `nodoubt` sound laid over it when the camera stays on the hitter: "you hear it is gone before you see it." | **Missing** |
| 11 | **Vibration** | A 35 ms buzz on a BARRELED ball; other patterns on misses, events and homers (search `buzz(`). It never fired on iPhone in the browser; in Unity it finally can. | **Missing** |
| 12 | **Rumble** | A separate slow tremble of the whole picture (rotations of a few thousandths of a radian at mixed frequencies, decaying by `exp(−3.5 × dt)`), "like a broadcast camera on a deck that 50,000 people are jumping on". Used on big homers, brawl blows and plays at the bag. | **Missing** |

`q` is contact quality, 0 to 1.

## The read-out (what tells him how he hit it)

| # | What | Rule | Status |
|---|---|---|---|
| 13 | **Grade pill** | WEAK, OKAY, SOLID, BARRELED by quality (under .35, under .6, under .85, above), or POPPED UP, CHASED, TIPPED. On a phone the exit speed is appended ("BARRELED · 109 MPH"). Colored by grade. | Have (confirm the pill and colors) |
| 14 | **Exit speed** | `round(v × 2.237 × 1.02)` mph. | Have |
| 15 | **Distance counter** | For a homer, or any ball in the air landing 250 ft or more: a second pill counting up from 0 FT as the ball travels, reaching its number where the ball first comes down. | **Missing** |
| 16 | **Timing word** | ON TIME, A HAIR EARLY / EARLY, A HAIR LATE / LATE (beyond 0.7 units drops the "a hair"). Green when on time, red when far off. | Have |
| 17 | **Contact word** | SQUARED UP, GOOD WOOD, CUE SHOT, BACKSPUN IT, TOPSPUN IT, GOT UNDER IT, TOPPED IT, OFF THE END, JAMMED; CHASED when he chased. | Have |
| 18 | **Barrel picture** | The ball against the barrel with a red dot for the sweet spot, offset by where he met it. | Have |
| 19 | **Timing bar and the rocket** | The EARLY–LATE bar with a marker. The marker becomes a **rocket** only for perfect-perfect (on time, squared up, smoked); an Overdrive homer always gets the rocket, burning blue. | Have the bar; **rocket missing** |
| 20 | **The line under the callout** | "ON TIME · SQUARED UP" in gold when perfect, white otherwise, orange for a special, red when chased, gray when weak. It sits directly under the big callout. | Confirm colors |

## The big callout (the owner: "the best thing about the swing is the callout")

One per ball, never the same twice running, chosen in this order:

| # | When | Words | Status |
|---|---|---|---|
| 21 | A high pitch hammered down on a line (launch −6° to 15°, 44 m/s or more) | **TOMAHAWKED!** | **Missing** |
| 22 | An inside pitch pulled hard (quality above .68, 40 m/s, pulled more than 14°) | **TURNED ON!** | **Missing** |
| 23 | On time, squared up, no chase, and either a homer or crushed on a power swing | **PERFECT!** (in its own gold style) | Have the word; confirm the rule |
| 24 | A no-doubter where the camera stays on the hitter | One of: NO DOUBTER!, SEE YA!, CRANKED!, ABSOLUTE TANK!, MOONSHOT!, ABSOLUTE NUKE!, ABSOLUTE BOMB!, LIFT OFF!, PIMPED IT! (waits a second so the bat flip is seen first), GONE FOREVER!, DINGER!, ADIOS PELOTA!, PLAKATA!, BARRELED!, BACKSPIN ROCKET!, BACKSPIN LASER!, BACKSPIN MISSILE! | **Missing** |
| 25 | A power swing with quality above .82 | CRUSHED!, SMOKED!, TATTOOED!, OBLITERATED!, MASHED!, GOT ALL OF IT!, TORCHED!; **SAT ON IT!** added only when it was not a fastball | **Missing** |
| 26 | Hit hard (95 mph or more) with Juice, or a power swing above .75 | Low (under 16°): ROPED!, SCORCHED!, LASER!, FROZEN ROPE!, STUNG IT!, STROKED!, LINEA! Otherwise: DRIVEN!, WELL STRUCK!, JUMPED ON IT!, STUNG IT!, CRANKED!, STROKED!, BELTED! Up for under a second, high on the screen. | **Missing** |
| 27 | Style | Big italic display type, tilted, hot orange with Juice; it never covers the hitter. On a low line drive the read-out is quicker (`qk`). | Confirm |

## The crowd

| # | What | Rule | Status |
|---|---|---|---|
| 28 | A roar on every ball in play | `roar(.28 + .34q + (.2 if crushed), .22)` | **Missing** |
| 29 | A crowd layer that lasts exactly as long as the play | "so the park cannot go quiet while the ball is live" | **Missing** |
| 30 | Bigger for homers, biggest for the earned ones | Orbit shots, grand slams, 500 ft and up, Overdrive homers of 450+, the homer that takes the lead in the last inning | **Missing** |
| 31 | The constant bed, claps, organ stings between pitches, the vendor, boos on a plunk | See `port/data/SOUNDS.md` | **Missing** |

## The swing itself

| # | What | Rule | Status |
|---|---|---|---|
| 32 | **The swing sound** | A whoosh on every swing, one of four recorded swings. | **Missing** |
| 33 | **The swing animation** | A motion-captured swing drives the hitter; the upper body leans so the barrel meets the height that was aimed at (`th = clamp((aim.y − y0)/.9, −.45, .45)`). | **Missing: the hitter is a still pose** |
| 34 | **The bat's gold arc** | The bat leaves a bright arc through the swing. | **Missing** |
| 35 | **Check swing** | On a close pitch he does not swing at, he starts his hands, checks, and brings the bat back. | **Missing** |
| 36 | **The stance and the waggle** | Each hitter has his own stance; some keep the barrel moving while they wait, tipping it toward the pitcher and back. It stops the instant he swings. | **Missing** |
| 37 | **After contact** | He follows through and runs, or on a no-doubter holds his finish, watches it and drops or flips the bat. | **Missing** |

## The bat in his hands (the owner asked for this specifically)

Use **the prototype's bat model** (`bat.txt` in the prototype repo: base64 FBX, re-oriented so the knob sits at the hands and the barrel runs up +Y), not a stand-in.

How the prototype holds it (`clipBat`, `gripIK`, `setupClip` in `port/code/15-bat-swing-pitcher-sound.js`):
- **The bat rides the bottom hand.** Its knob is at that hand and its direction comes from the clip.
- **The top hand is brought to the handle** with two-bone arm IK, just above the bottom hand, so both hands are on the bat on every body.
- The fingers use a curled grip pose.
- On a body whose hands sit oddly the bat is carried more upright in the stance and eases into the swing's own line as he starts.
- A left-handed hitter is the mirror image: body and bat flipped across the plate.

**The requirement:** both hands visibly on the handle through stance, swing and follow-through, the knob below the bottom hand, and **the bat never passing through the hands, wrists or forearms.** In Unity do it properly: parent the bat to the bottom hand with a grip offset per body, and use IK to place the top hand on a grip point on the handle. Check it from the batting camera and from the side on every hitter body.

## The pitcher's delivery (the owner asked for this specifically)

The pitcher must go through his motion before the ball comes out. A ball appearing from a still figure is not acceptable.

- The wind-up is 1.0 s. The prototype plays the pitcher's `pitch` clip (in `clips.json`) so that the hand reaches its release point as the pitch state begins; the ball starts **at his hand's actual position** at that instant (`updatePitcher`, and `pitch.rel` taken from the hand bone).
- The ball is in his hand, visible, until release.
- Left-handed pitchers are mirrored; their stuff breaks the other way.
- After release he follows through and resets for the next one.
- Between pitches he has small reactions and, after a strikeout, a taunt.

For this pass: play the delivery clip on the pitcher timed to the 1.0 s wind-up, with the ball leaving from his hand. Blending and polish later.

## Around the at-bat (small things he will notice)

| # | What | Status |
|---|---|---|
| 38 | The mitt pop when a pitch is taken, then the umpire's call a beat later (240 ms looking, 60 ms swinging) | **Missing (sound)** |
| 39 | The umpire's voice: strike, strike three, ball, out, safe, play ball | **Missing** |
| 40 | The foul-ball sound | **Missing** |
| 41 | The ball's shadow on the ground and the landing ring | Have |
| 42 | The fire trail by swing type (gray smoke, gold, orange, blue) | Have |
| 43 | The home-run cameras (chase with the distance in big numbers, blimp, aerial show, admire) | **Missing** |
| 44 | Fireworks, lasers and the scoreboard surge on big homers | **Missing** |
| 45 | The settings that scale all of this: an effects strength (`FX`) and a reduce-motion switch (`REDUCE`) | **Missing** |

## Sound: add all of it now

The owner wants sound for his playtest. Bring over **everything**; clearing rights is a later job he will do with you before launch.

- **Recorded sounds:** all 42 files in `sfx/` in the prototype repo. Copy them in as they are.
- **Synthesized sounds:** the `SND` table and the `tone` / `noise` helpers (in `port/code/15-…` and `port/code/14-audio.js`) build the crack of the bat, zaps, whooshes, the mitt, thuds, the timing ding and many more from oscillators and filtered noise. Port them as generated clips or a small synth, matching frequencies, durations and envelopes.
- **When each plays:** `port/data/SOUNDS.md` lists every sound call by the function it fires from. `port/14-audio.md` has the rules (crowd logic, organ, what never overlaps).
- Mark every recorded file as a placeholder in the project so none ships by accident.

## Order for this pass

1. Sound: the crack, the swing, the mitt and umpire, the crowd roar on contact, then the rest.
2. The pitcher's delivery with the ball from his hand.
3. The hitter's swing with the real bat held correctly in both hands.
4. The big callouts (21–27), the distance counter, the rocket.
5. Vibration and rumble.
6. Then the home-run cameras.

Report per numbered item: done, not done, or different, and what you could not check without a phone.

## Where the hitter stands in the box (added 28 Nov at the owner's request)

Not too far up, back, in or out. The prototype does not place a hitter by hand; it **measures each body and stands him where his swing puts the barrel over the plate**, then keeps his feet in the box. Do the same, per body and per swing clip. Prototype coordinates below (plate at the origin, pitcher toward −z, a right-handed hitter stands at −x; mirror x for a lefty). Code: `setupClip` in `port/code/15-bat-swing-pitcher-sound.js`.

1. **Find the contact frame of his swing:** the frame where the bat points straight out over the plate at hitting height (barrel below 1.25 m, pointing most directly across).
2. **Slide him so the sweet spot of the bat (0.62 m up the bat from the knob) is over the middle of the plate at that frame.** That fixes both directions at once:
   - **In and out** (x): limited to between 0.5 m and 1.5 m off the center of the plate.
   - **Up and back** (z): limited to between 0.10 m toward the catcher and 0.12 m toward the pitcher of the plate's center. **He always stands level with the plate, never up at the front of the box and never back by the catcher.**
3. **Keep his feet in the box:** measure his feet and toes in the stance and at contact; if the foot nearest the plate is closer than **0.52 m** from the plate's center line (`BOX_EDGE`), move him away from the plate by the difference. Feet never touch the plate or the inside chalk.
4. **Left-handed hitters** are the same thing mirrored across the plate.
5. **The box itself** (painted on the dirt, regulation): two boxes 4 ft by 6 ft (1.22 m × 1.83 m), their inside lines 6 in off the plate (0.368 m from its center line), centered on the plate front to back (0.914 m each way), 4 in chalk.
6. **He stays put.** The stance, the load, the swing and the follow-through are all played from that one spot; only walk-ups, celebrations, brawls and plays on the bases move him, and afterwards he is put back exactly.

**Checks:** for every body, a top-down screenshot in the stance and at contact, both hands: both feet inside the chalk, the barrel over the plate at contact, the hitter level with the plate. Send them to the owner with the bat-grip pictures.
