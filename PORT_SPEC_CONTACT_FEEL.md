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

## The ball's size on screen (added 28 Nov at the owner's request)

**Rule: the ball never looks too big, and it looks like the same ball in every view.** The owner has rejected oversized balls more than once ("looks like a popup" on the overhead homer camera). A real baseball is 3.7 cm in radius (`BALL_R`); far from the camera that is less than a pixel, so the prototype enlarges the ball **only as much as it takes to stay visible**, and no more. Scale 1 is true size.

| Where | Ball scale | Why |
|---|---|---|
| **The pitch coming in while batting** | **1 (true size)**, with a thin trail that never hides it | It is close; this is the size the strike call is judged on |
| **A batted ball in flight** | `max(1, distance from camera × 0.05)` | Stays about the same small size on screen however far it goes, never smaller than true size |
| **The overhead "blimp" view of a homer** (camera more than 90 m away) | `max(1, distance × 0.062)`, plus a flame trail | The owner wanted a **small ball with a trail**, not a big ball |
| **Shows where the ball is very far off** (orbit, light tower) | `max(1, distance × 0.075)` | Only for those shots |
| **A fielder's throw** | `max(1, distance × 0.036)`: smaller than a batted ball | "A seed, not a lob" |
| **Your own pitch leaving the hand (pitching view)** | 0.62; 0.56 while it sits in his hand | "A smaller ball out of your pitcher's hand: it reads as quicker" |
| **A ball your hitter put in play, seen from the mound** | `max(1, distance × 0.04)` | |
| **Events at a bag (throws, the catch)** | 1.05 | The same ball as everywhere else, in a close-up |
| **Where a pitch crossed (the marker after a take or a miss)** | drawn at the ball's **true size** against the zone | So one that nicks the edge is seen nicking it |

Rules that go with the table:
- **Reset the scale** when the view changes. The prototype once left a pitch drawn at the blown-up size of the last ball in flight.
- **Size steps must not pop:** when the camera cuts, the ball's on-screen size should be about what it was.
- **The shadow** under a ball in flight grows a little with height (it is how a fly ball is read), and is small under a pitch.
- **Trails and glow never make the ball look bigger** than the table; thin, tapering, behind it.
- In Unity do this with one function that returns the ball's scale from the current view and the camera distance, used everywhere the ball is drawn, with these numbers as the starting point. Check each view on the phone and send the owner one picture per view.

## The swing: no delay, a proper swing and miss, and late swings that never slow the game (added 28 Nov at the owner's request)

Code: `doSwing`, the swing block in `step`, and the `swing` / `whiff` / `idle` modes of `updateClip` (`port/code/15-bat-swing-pitcher-sound.js`).

### No implied input delay

- **The swing starts on the frame the finger lands** (touch down / button down, never on release, never after a wind-up animation). On a phone it is read on `touchstart`.
- **The bat reaches contact 0.07 s after the tap** (`SW_T`), always. The animation is not played from its start: **wherever the hitter's swing clip is at the tap, it is driven to the contact frame over those 0.07 s** (`C.t = lerp(where it was, tC, t / 0.07)`). Because he has already loaded during the wind-up (the clip sits at the load point `tL`, 0.22 s of clip before contact), this looks like a quick, real swing, not a pop.
- **Contact is judged at that same moment** (`tryContact` at tap + 0.07 s), and the timing circle runs 0.07 s ahead so that tapping as it closes is exactly on time. Animation never decides timing; the tap does.
- **Nothing between the tap and the swing:** no button animation that must finish, no blend that eats frames, no waiting for a previous clip. If the hitter is mid-practice-cut or mid-take, the new swing takes over at once.
- In Unity: read the touch's own timestamp, and measure the whole chain on the phone at 120 Hz (finger down to bat at contact). If the device adds latency, shorten the chain, do not lengthen the judged time. Never copy the browser's offsets blindly.

### A proper swing and miss

- **A miss has its own captured clip** (`strike`, the swing-and-miss take). The first 0.07 s are the same whip to contact as any swing; then, if it was a miss, the picture **hands over to the miss clip at its own contact frame** (`tCs`), so the bat is seen going through where the ball was not.
- **The miss stops at the follow-through.** The captured clip goes on into a stagger and extra steps; those are never shown. He finishes the swing (the clip runs on for 0.45 s at 1.1× and then eases to a stop over about 0.25 s more: `WHIFF_CUT`), **holds the finish for a beat** (the whole thing is over at 1.05 s, `WHIFF_HOLD`), and flows back to his stance.
- **It gives way at once to the next pitch:** if a new pitch is on its way after 0.6 s, he is back in his stance for it.
- The swing's whoosh plays on every swing; the miss gets the miss replay (frozen ring, ball marker, TOO EARLY! / TOO LATE!) from the feedback rules.
- A swing that connects instead plays on through the follow-through to contact + 0.6 s at 1.1× and blends back (item 23).

### Taking a pitch is also animated (so a take never looks like a dead hitter)

- He stays loaded and watches it into the mitt. On a pitch just off the plate (within 24 cm of the zone but not a strike) **his hands start, he checks the swing and brings the bat back** (0.66 s). On a strike he lets go, or a ball far out of the zone, he freezes for half a second: it locked him up. Then he relaxes into his stance.

### A swing is never ignored, however late, and it never slows the game

- **Between pitches** a tap is a **free practice cut**: the bat comes through, no cost. The pitcher waits for a practice cut to finish before starting (no quick pitches), which is at most 0.55 s.
- **After the ball is already in the mitt, for 1.3 s** (`LATE_T`), a tap **still swings the bat** and the read-out says **WAY LATE**. This includes strike three and ball four ("the ones where it stings most"). **The call that was made stands.** The window is long on purpose: against Overdrive heat a hitter can be absurdly late and must still see his swing.
- **A late cut never holds the game up:** it is flagged as late, the pitcher does **not** wait for it, the next pitch's timer is not pushed back, and the miss replay rules do not apply to it. Pace of play wins.
- A swing during the first 0.55 s of the pitcher's wind-up is also a practice cut, so an early nervous tap does not waste the real swing.

### Tests

- Tap to contact frame is 0.07 s from every starting pose (stance, loaded, mid-take, mid-practice-cut).
- A miss shows the miss clip and is back in the stance by 1.05 s, or by the next pitch if sooner.
- A tap at 0.2, 0.8 and 1.25 s after the mitt on a take, a strike three and a ball four: the bat swings, WAY LATE shows, the call and the next pitch's start time are unchanged. A tap at 1.4 s is a practice cut.
