# Pitching (you pitch): what the player sees and does (port spec)

Written by the web-build session. The Unity build must match this. Where this file and `index.html` disagree, the code wins: say so and ask. Anything marked **(verify)** names where to read the exact value.

Read with: `port/04-you-pitch.md` (274 entries, read all of it), `port/code/04-you-pitch.js`, `port/TIMING.md` ("When you pitch"), `port/TRAILS_AND_EFFECTS.md`, the pitching pictures in `port/look/` (`*_10` to `*_13`, `phone_strip_pitch_delivery`, `phone_strip_you_strike_him_out`, `phone_strip_you_drill_him_brawl`), and `STAFF`, `PITCHES`, `PPT`, `PDESC`, `ARS`, `KBAT`, `KCALL` in `port/data/TABLES.md`.

Status: the owner calls pitching less finished than hitting. Much of it was built or retuned on the last day (see "Provisional" at the end). Port it faithfully; expect him to change it.

## When you pitch

- A game is three innings. In the Krakens' half, the player is asked to pitch (**LET ME PITCH** / **KEEP HITTING**). If he declines, the half is rolled by the computer.
- A pitching half is **three hitters or three outs**, whichever comes first, then back to batting.
- Daily and scenario challenges can start straight on the mound with outs and runners set.
- The first trip to the mound in a game opens on your pitcher clapping into his glove with **YOU'RE ON THE MOUND!** before the first hitter walks up. A new arm brought in gets the same entrance with his card.
- Each Kraken hitter gets a short walk-up and his name. **There is always a man in the box**, and it stays empty only until the new man is in his own body (never the retired hitter popping back).

## The view

- Camera behind your pitcher and to his throwing side. He is large in the foreground; the hitter, catcher and zone are small in the distance.
- **The ball is in his throwing hand** from the stretch through the wind-up to release, small, at the base of his fingers.
- The strike zone is drawn at the plate on a dark pane with a solid white frame (hairlines vanish on a phone) and nine squares: **red where the hitter is hot, blue where he is cold.**
- The hitter's card is a slim bar: name, rating badge, PWR / CON / EYE grades.
- The scorebug and diamond show the Krakens' at-bat (count, outs, runners).
- The Juice meter is **the pitcher's own**: one bar the first time you pitch, carried between pitching halves, never mixed with the hitters' meter (theirs is put away and handed back).

## Controls: phone

- **Left thumb: the AIM stick.** It works like the batting stick: push and the target moves that way; let go and the cap springs back. **The stick is held, not set:** how far the thumb is pushed is where the target sits; letting go before the pitch is started sends it back to that pitch's home spot. Once the release ring is closing the spot is locked.
- **A stray thumb does nothing.** With the stick held, a touch anywhere that is not a button neither moves the target nor lets it spring home. (This is the owner's rule about a missed right-thumb tap.)
- **Letting go as you start the pitch is not a mistake:** if the thumb came off within the last 0.4 s before the pitch was started, or any time after, the pitch goes where it was aimed.
- **Right side: the pitch wheel.** A green **PITCH** dial with the selected pitch as a baseball-styled button beside it (abbreviation and speed, e.g. "FB 101"), the other pitches as smaller baseballs fanned around it. Tap a pitch to select it. On a phone nothing is chosen until the player chooses it, every pitch.
- **JUICE** button above the wheel (flame art, the bars in hand as ×N). **DRILL HIM** small and red.
- Layout rule from the owner: wheel left of the Juice button, Juice with room around it; left thumb pad placed like the batting one.

## Controls: PC

- **Mouse aims** directly on the zone (no stick). **Mouse wheel** steps through the pitches, one notch one pitch (held to about nine steps a second on a free-spinning wheel or trackpad). **Keys 1–4** pick a pitch; **arrow keys** also step.
- **Click, Space or Enter** starts the pitch and makes each tap. **Shift or J** is Juice / Overdrive. **D** drills the hitter. **Esc / P** pauses.
- The same wheel, the same PITCH / TAP! dial and the same guide as on a phone.

## Throwing a pitch: three inputs, one motion

1. **Pick and aim.**
   - **Every pitch has its own home in the zone** where it ends up if the stick is left alone: curve low, slider low and away, change-up down and in, heater up. Picking a different pitch jumps the target there.
   - **The movement arc:** while choosing and aiming, a line shows the path from the hand to the target. A breaking ball is drawn the way broadcast trackers draw it: climbing over the top of the zone, cresting, falling off the table into the spot.
   - **Lean on the break:** push the stick the way a breaking pitch already moves and it breaks up to 70% more; pull against it and it flattens to 40%. The line bends or straightens as you move. A fastball is not changed.
   - A baseball sits in the target, spinning the way this pitch spins.
2. **Power.** Press PITCH. A ring swells out from the target to the outer line and back; stop it at the top for everything he has. **Hold for power** also works: press and hold, let go as it reaches the line. It turns green in the max window (from 80% of the way up). **TAP!** shows a beat ahead.
3. **Release.** A timing ring closes from the outside in onto the target. Tap as it meets the circle. **TAP!** shows a beat ahead here too.

**The delivery never pauses.** Once power is set he keeps moving: he comes down out of the leg kick and strides, arriving at release just as the ring meets the circle, so the tap and the ball leaving his hand are the same moment.

**Once PITCH is pressed the path line goes;** only the rings are left to watch.

## Reading the release

- **It is either perfect or it is not.** Perfect is one green ring exactly on the target. Anything else leaves a clear gap: still big means early, small means late. Green perfect, white good, red way off.
- The ring **stays where you stopped it** for 0.75 s, then gets out of the way.
- **Where it crossed:** a baseball at the ball's real size against the zone, so one that nicks the edge is seen nicking it.
- **A perfect release pays off:** the ring bursts gold, a rising chord, the crowd reacts, a gold streak behind the ball, and the fingertip impact (freeze, flash, shock ring, sparks). **The full camera kick is for perfect-perfect only** (full power and perfect release).
- **A bad release is punished:** usually a **MEATBALL**, flat and down the middle (the target slides to the middle the instant it is released); otherwise it drifts up and over the plate.
- Taps are **judged where the thumb saw it**: timed from when the finger actually landed, compensating for display delay. In Unity re-measure this on a device; do not copy the browser's offsets blindly **(verify: `pdTap`)**.

## Ratings: what makes pitchers feel different

Every pitch of every pitcher has three ratings (see `STAFF`): **velocity, control, break**.

- **Velocity** sets how fast it gets there and the speed on the button. A 76 fastball reads about 93, a 100 about 108.
- **Break** sets how far the path bends, in the preview and in flight.
- **Control** sets the release window (±20 ms at 40 to ±56 ms at 95+), how fast the release ring closes (up to 28% faster when low), how fast the power meter runs (up to 38% faster when low) and how far a miss scatters.
- Each pitcher's card shows VELO / CONTROL / BREAK letter grades (best fastball; average control; average break), the same grades in the bullpen list and on his entrance card.
- **The stuff counts when it is hit:** a weak pitch that gets hit is hit up to 30% harder; a top one up to 14% softer.
- **Honest results:** how well the pitch was thrown (release, power, location) decides most of what happens to it. Hot and cold squares mean it, but nothing is certain either way. Nasty stuff just off the plate gets swung at. Throw the same pitch to the same spot and hitters start sitting on it.

## Stamina and the bullpen

- Each pitch costs stamina (more for hard pitches and Juice). **Every arm has its own tank.**
- **A tired arm has less of everything:** below 45% it fades in; at empty the break is 45% flatter (the preview shows it), the ball about 14% slower, a miss scatters nearly twice as far, the release window narrows, and contact against him is 30% harder.
- **Whoever finishes a half comes off it drained** (down to 20%). Placeholder rule, by the owner's own words "for right now".
- **GASSED · CHANGE PITCHER?** A yellow chip appears before each hitter while he is drained; one tap opens the bullpen; ignoring it costs nothing. It stops appearing after three uses.
- The bullpen is reached from the pause menu (CHANGE PITCHER) and the squad screen. The staff is five arms plus four deliberately uneven test arms (see `STAFF`; the owner has not decided whether the test arms stay).

## Juice and Overdrive on the mound

- **Juice on:** the normal pitches give way to that pitcher's Juice pitches (his `jz` list). With the meter full (**Overdrive**) the three wildest join them, on a nine-pitch wheel, and they are free.
- **Cost:** one bar per Juice pitch, every time.
- **Earn:** a strikeout is a bar; any other out half a bar (a double play, a full one); a strike on a perfectly timed normal pitch a quarter bar; a won defensive event a bar. A Juice pitch earns nothing for being a strike. A plunk pays a bar; winning the brawl that follows fills the meter.
- **Look:** on the mound Juice is blue (#1432d8): preview path heavier and blue, perfect ring and power ring blue, speed read-out blue. Each Juice pitch has its own trail color and shape (`TRAILS_AND_EFFECTS.md`). The release window is 1.6× wider with Juice, 2× in Overdrive.
- **The Juice nudge:** at the start of each at-bat and with two strikes, a bar in the tank is pointed out once; it stops after it has been used on that batter.
- A hint line under the wheel says what the pitch in your hand does (`PDESC`), or what Juice costs.

## Perks

- Each pitcher has a named perk (see `STAFF.pk`).
- **Scouting Report** (Ace, Doc): ahead 0-2, a pulsing gold target marks the hitter's weak spot; put the pitch on it and it counts as far colder than any cold square.

## Drilling a hitter

- **DRILL HIM** once per hitter: the pitch hits him, he takes his base, the next batter is rattled, and you earn a bar.
- The first drill of a game always brings him charging the mound; after that three times in ten. It is the same brawl as when you are the one hit. Win: the next batter is rattled and your meter fills to Overdrive. Lose: **LOST THE BRAWL!**, nobody is rattled.

## What happens to the pitch

- Calls: strike calls by reason (`KCALL`: frozen, painted, swinging, gas, buckled), **PAINTED** on the edge, **GOT HIM TO CHASE**, balls, fouls (a foul is shown landing foul, then back to the mound).
- **The punchout:** on a strikeout the controls leave the screen while your pitcher celebrates on the mound; the second strikeout of a half gets a "you're dealing" call.
- Balls in play are shown out in the field and **the call is made where the play was**; the flight is held at the catch so the ball never carries on past the man who caught it.
- **He can take you deep:** a hung pitch squared up is sometimes a tape-measure shot onto the Moon.
- The player gets the defensive events from here: MAKE THE PLAY (a grounder to finish), MAKE THE CATCH (a liner at an infielder, and always a comebacker at your own pitcher), DIVE FOR IT, ROB HIM, HE GETS GREEDY, FIRST TO THIRD, THE PLAY AT THE PLATE, HE'S STEALING. Those get their own spec (`PORT_SPEC_EVENTS.md`, to come).

## Leaving the mound cleanly

Restarting or quitting while pitching must put everything back: batting controls live, aim reset, the hitter's squares gone, the pitching HUD hidden. The prototype had a bug here that survived restarts; do not reproduce it.

## The guide

A first-time pitching guide runs like the batting one: the game is held, everything is blacked out except the zone and the controls, and each control is shown at work. Nothing has to be done; a tap anywhere is NEXT.

## Provisional (built or retuned 27 Nov, barely playtested)

The Juice earn loop, per-pitcher stamina, drained-after-an-inning, the change-pitcher chip, pitcher letter grades in the bullpen, control driving ring speed and the power meter, the wider velocity spread, weak stuff hit harder, tired arms fading further, the ball in the hand, the fingertip impact on a perfect release, brawls on a drill, Scouting Report, the four test arms.

## Tests to write

- Release window, ring time and power-meter speed against control (the table in `TIMING.md`).
- Pitch flight time against velocity, power, Juice and tiredness.
- Juice: every earn and spend above, including that a Juice strike earns nothing.
- Stamina: separate tanks; drained after a half; the fade below 45%.
- A stray touch with the stick held changes nothing; letting go within 0.4 s of starting the pitch keeps the aim.
- Restart and quit from the mound leave batting fully working.
