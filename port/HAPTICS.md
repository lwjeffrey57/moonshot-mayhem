# Vibration (haptics): iPhone first

From the owner, 28 Nov. The web build could never do this: an iPhone's browser has no vibration at all, so every `buzz()` call in the prototype is silent on his phone and **none of it has ever been felt or tuned.** Treat this as new design work, with the prototype's `buzz()` calls only as a list of *which moments* deserve one. He wants the iPhone's good haptics used properly. Android comes later; keep it in mind.

## What the iPhone can do (use this, not a plain buzz)

- **Core Haptics** plays two kinds of event, each with an **intensity** (how strong) and a **sharpness** (dull thud to crisp tick): a **transient** (one tap) and a **continuous** (a rumble with a length that can swell or fade). They can be sequenced into patterns and synced to sound.
- The simple system taps (light / medium / heavy / rigid / soft impact, selection tick, success / warning / error) are fine for menus and buttons.
- Unity has no built-in access to this. It needs a small native iOS plugin (a thin Swift bridge is enough) or a free open-source haptics package. **Do not buy one; ask before adding any third-party package** (security rule).
- Works on iPhone 8 and later. Honors the phone's own "System Haptics" switch. Does nothing while the phone is recording audio. No effect on iPad.

## Design rules

1. **Haptics follow the same quality number as everything else.** One function, `Feel(event, q)`, called from the same place that fires the freeze, shake and sound, so they can never drift apart.
2. **Contact is the star.** A weak tip should be a faint tick; a barreled power swing should be the strongest, crispest hit in the game. Nothing else may be as strong as a perfect-perfect homer.
3. **Sharp for wood and leather, dull for bodies and ground.** Bat on ball and ball in mitt: high sharpness. A hit by pitch, a dive, a collision, a ball off the wall: low sharpness, more weight.
4. **Rumbles are rare and short:** the crowd swell on a no-doubter, the rocket, the brawl. Never a constant buzz.
5. **Inputs get a tick, results get a hit.** Every button press is a light tick so it is never in doubt the touch was taken; the outcome is what is felt strongly.
6. **Never punish the hands.** No haptic on a swing and miss beyond the swing's own light whoosh tick. Losing should feel empty, not buzzy.
7. **A setting:** Vibration Full / Light / Off, default Full. Off must be truly off. Reduce in low power mode.
8. **Measure on the phone.** Nothing here has been felt. Build a test screen that plays each one by name so the owner can tune them in one sitting.

## The owner's list (28 Nov): these must vibrate

1. **Squared-up hits.** The signature one.
2. **Every input in an event (QTE):** each arrow, each mash tap, the needle stop, the buttons.
3. **Catches made on defense.**
4. **Getting hit by a pitch** while batting.
5. **Every blow in a brawl.** The brawl clips are roughly synced today; fire the haptic from the same moment as the blow's sound and flash (`brawlTick`), not from the animation, so it lands with what is heard. Re-time when the brawl is rebuilt.
6. **Pitching: MAX power**, and **a perfect release** on the timing circle.
7. **Special moments when the crowd is going nuts and the picture is shaking:** a rumble that follows the crowd shake (below), for as long as it shakes.
8. **Plays at a bag:** the tag going on a runner you throw out; and as the runner, the slide, kick or punch that gets you in safe.

**Hard rule from the owner: if a scene is skipped by a tap, the vibration stops at that instant.** Any continuous rumble must be owned by the scene that started it and cancelled when that scene ends, is skipped, the game is paused, the app goes to the background, or a new game starts. Never a phone still buzzing after the picture has moved on. (The prototype had the same class of bug with the camera: skipping mid-homer left it shaking on the mound until `shake` and `rumble` were zeroed in `pdStart`.)

## The crowd shake (the prototype's `rumble`), and how haptics ride on it

The owner asked that this be understood: what it is, when, and why.

- **What it is:** "the whole picture trembles, like a broadcast camera on a deck that 50,000 people are jumping on: the frame shakes, not the stands." It is a camera tremble, separate from the sharp `shake` kick at contact. One number, `rumble`, 0 to about 1.5.
- **How it works:** each frame, after the camera is aimed (or aiming would undo it), the camera is rolled and tilted by small fast sine wobbles: roll `(sin 47t + sin 71.3t) × 0.007`, tilt `(sin 53.7t + sin 83.1t) × 0.0045`, turn `sin 61.3t × 0.0035`, all × `rumble` × the effects setting. Then `rumble` decays: `rumble *= e^(−3.5 × dt)` (it halves about every 0.2 s), so it dies away on its own unless something keeps setting it.
- **When it is set:**
  - **The crowd at its very loudest:** while the roar is at the top of its range, `rumble` is held at 1 every frame (`roarTick`). This is the "crowd going nuts" shake: big homers, grand slams, the walk-off.
  - **The walk-off** (1, with fireworks), **a light tower smashed** (1), **the satellite hit** (1), **the saucer** (0.6).
  - **Brawl blows:** `0.7 + 0.4 × blows landed`, so each hits harder; the knockout sets 1.
  - **Collisions at a bag:** 1.3 when the kick or the tag lands; 1 when a fielder or runner is sent flying.
- **Why:** it sells size. The sharp kick says "the bat hit the ball"; the tremble says "the building is shaking." It is what makes the biggest moments feel bigger than a normal homer.
- **Settings:** scaled by the effects level; with "reduce" on it is much smaller. Zeroed when you go to the mound, on a new game and on quitting.
- **In Unity:** use a Cinemachine noise profile driven by the same number, and **drive the continuous haptic from the same number**: while `rumble` > 0.05, play a continuous haptic with intensity `0.25 + 0.5 × min(1, rumble)` and low sharpness (0.15); update it a few times a second; stop it the moment `rumble` falls below the line or the scene ends. One source, so the hands and the picture can never disagree, and the stop-on-skip rule comes for free.

## How long each one lasts (starting values to tune)

A haptic should be as short as the thing it represents. The ear and hand read anything within about 20 ms of the picture as "together", so fire haptics on the same frame as the sound.

| Kind | Length | Use for |
|---|---|---|
| Tick | about 10 ms, one transient | Button presses, each event input, pitch selection |
| Hit | one transient, felt as 20–40 ms | Bat on ball, ball in mitt, a catch, a tag, a punch |
| Double | two transients 50–70 ms apart | Squared-up contact, MAX power, perfect release |
| Thud | 60–120 ms continuous, dull | Hit by pitch, a body hitting the ground, ball off the wall |
| Swell | 0.3–0.6 s continuous, fading | No-doubter, strikeout thrown, winning an event |
| Rumble | as long as the crowd shake, capped at 3 s per burst | Crowd going nuts, rocket, flyover |

Match the contact freeze: the game freezes for a few hundredths of a second on good contact (longer for better contact). The contact haptic fires at the start of the freeze and its echo lands as time resumes, so the hands feel the "stick" and the release.

## The contact scale: how hard it is hit is how hard it is felt (owner, 28 Nov, after his first phone session)

His note after feeling the first build: **no-doubt homers and crushed balls can be much stronger and more pronounced, and there must be a clear scale from weak contact up to those.** A player should be able to tell what he did with his eyes shut. Use the full range of the phone: the bottom of the scale barely there, the top unmistakable. If two neighbouring steps feel alike, widen the gap.

The step comes from what the game already knows at contact: the quality `q`, the swing type, whether the big callout fired, and whether the flight is a home run. Starting values (intensity and sharpness 0 to 1); "echo" is a second softer tap; "swell" is a continuous rumble that fades.

| Step | When | Haptic |
|---|---|---|
| 0. Tipped / foul tip | ball outside the zone, grazed | one faint tick: 0.15, sharp 0.9 |
| 1. Weak | q under 0.35 | one tap 0.3, sharp 0.4 (dull, a little sting) |
| 2. Okay | q 0.35 to 0.6 | one tap 0.45, sharp 0.55 |
| 3. Solid | q 0.6 to 0.85 | one tap 0.65, sharp 0.7 |
| 4. Barreled | q 0.85 and up | tap 0.85, sharp 0.85, plus an echo 0.4 at 60 ms |
| 5. **Crushed** | a barreled POWER swing (the CRUSHED! / SMOKED! / TOMAHAWKED! / TURNED ON! callouts), or any Juice swing barreled | tap **1.0**, sharp 1.0; echo 0.6 at 50 ms; then a swell 0.5 for 0.25 s |
| 6. **No-doubter** | a homer the game treats as a no-doubter (the bat flip / admire shots, or 440 ft and up) | everything in step 5, with the swell 0.7 for 0.5 s, and **the hit lands at the start of the contact freeze and the swell runs through the slow motion** |
| 7. **Tape measure / Overdrive bomb** | 500 ft and up, or any Overdrive homer | step 6 with two hits 40 ms apart at 1.0 (a "double crack"), the swell 0.9 for 0.8 s, then the crowd rumble takes over as the roar builds |

Rules for the scale:
- **Monotonic:** a better-struck ball never feels weaker than a worse one. Power swings sit a little above contact swings at the same quality (+0.1 intensity) because they are the heavier swing.
- **Jammed and off the end** keep their own feel on top of the step: dull and stinging (sharpness down to 0.2) however hard they were hit.
- **The top steps are rare on purpose,** so they stay special: nothing else in the game reaches intensity 1.0 with a long swell.
- **Then the homer itself:** the wall-clearing pattern and the crowd rumble (below) follow, so a no-doubter is felt three times: at the bat, as it clears, and as the park shakes.
- Light setting: scale every intensity by about 0.6 but keep the steps distinct. Off is off.
- **Test screen:** add these eight as a row the owner can tap in order, weakest to strongest, so the ladder can be felt in ten seconds and tuned.

## The first set (starting values, all to be tuned by the owner on the phone)

Intensity and sharpness are 0 to 1.

| Moment | Haptic |
|---|---|
| **Bat on ball** | Transient. Intensity `0.25 + 0.75 q`, sharpness `0.5 + 0.5 q`. Power swing +0.1 intensity. |
| Barreled (q > .85) | The contact hit, then a second softer one 60 ms later (the "ring" in the hands). |
| **PERFECT / no-doubter** | Contact hit at full, then a 0.4 s continuous swell at 0.5 fading out. |
| Tipped / foul tip | One faint tick (0.2, sharpness 0.9). |
| Jammed / off the end | Dull transient (0.5, sharpness 0.2): it should sting. |
| Swing and miss | A light whoosh tick at the swing (0.15), nothing after. |
| **Home run clears the wall** | Three rising transients, then a 0.6 s rumble with the horn. |
| Grand slam, flyover, rocket | A longer rumble (1 s), swelling. |
| Ball off the wall / batter's eye / a prop | One heavy dull transient at impact. |
| Ball in the catcher's mitt (taking a pitch) | A crisp light tick; heavier for a Juice pitch. |
| Called strike three against you | One dull medium thud. |
| **Hit by pitch** | Heavy dull transient, then two fading ones. |
| Brawl blows | A transient per blow, each harder; the knockout the hardest plus a short rumble. |
| Juice on / off | A light rigid tick. **Overdrive lights:** two quick rising taps. |
| Overdrive heartbeat (if kept) | A soft double tap in time with the sound, very light. |
| **Pitching: power set** | A tick whose strength is the power stopped at; MAX is a crisp double. |
| **Pitching: release** | Perfect: crisp strong transient plus a soft echo. Good: medium. Mistimed: one dull weak thud. |
| Strikeout thrown | Two crisp taps and a short swell. |
| **Event (QTE) arrows** | A light tick per correct arrow, rising in sharpness; a dull double for a wrong one. Won: crisp triple. Lost: one dull thud. |
| Needle stop / mash | Mash: a light tick per tap. Needle on gold: the success pattern, stronger. |
| **Catch made on defense** | Crisp medium hit as the ball goes in the glove; a diving catch or a rob adds a dull thud for the body landing and a short swell. |
| **Tag on the runner (you threw him out)** | Hit when the tag goes on, sharpness 0.7. |
| **Safe as the runner: slide / kick / punch / truck the catcher** | Slide: a 0.25 s low rumble that ends in a hit at the bag. Kick, punch or truck: one heavy dull hit on contact, then a soft echo. |
| GO / STAY offer appears | One light tick. |
| Achievement plate | The system "success" tap. |
| Menu buttons | The system selection tick. |

The prototype's own `buzz()` patterns (durations in ms, for reference on which moments it marked) are throughout `index.html`; 51 functions call it, including `tryContact`, `finishPlay`, `addRuns`, `pdThrow`, `qteKey`, `qteDone`, `brawlTick`, `hbpStart`, `lampSmash`, `bdgShow`.

## Android (later)

- Keep `Feel(event, q)` as the only entry point, with the iPhone patterns behind it. Android gets its own table: newer phones can vary strength (`VibrationEffect` with amplitudes, and richer "primitives" on some models); many cheap ones only buzz on and off. Design three tiers: rich, amplitude-only, on/off, and test on at least one cheap phone.
- Game controllers (PC, later): map the same events to controller rumble.

## What to build first

1. The native bridge and `Feel()` with the setting.
2. The test screen that plays each row by name.
3. Contact, mitt, homer and release wired in. Hand it to the owner to tune before wiring the rest.
