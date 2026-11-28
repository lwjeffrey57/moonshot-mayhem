# Unity review (latest on top)

Written by the web-build session after reading the Unity repo's code. The owner will tell the Unity session: "Pull the prototype repo and do everything in the latest review." Do each numbered item, then reply with done / not done / question per item. Do not build new features until the list is cleared or the owner says otherwise.

---

## Review 5: the feel of batting, sound, the delivery and the bat (28 Nov, from the owner)

The owner is rested and about to play on his iPhone. Before he does, he asked for three things. Do these ahead of any more pitching work.

1. **`PORT_SPEC_CONTACT_FEEL.md` (new).** Forty-five numbered items: everything the prototype does around a swing, a hit and a miss. The status column is what the web session found by searching your code at `bb3f3d6`: the freeze, shake, lens kick, slow motion, flash, shock ring and sparks are there; **sound, vibration, rumble, the big callouts, the distance counter, the rocket, the swing animation and the home-run cameras are not.** Work through it in the order at the bottom of that file and answer per item.
2. **Sound: add all of it now.** All 42 recorded files from the prototype's `sfx/` folder, and the synthesized ones from the `SND` table. He will do the rights audit with you before launch; for now he wants to hear the game. About 3 MB of audio: you have his OK to push it.
3. **The pitcher goes through his delivery before the ball is thrown,** with the ball leaving from his hand. And **use the prototype's bat model, held correctly in both hands with no clipping through hands or wrists.** Both are spelled out in the feel spec. New readable code for these is in `port/code/15-bat-swing-pitcher-sound.js` (`clipBat`, `gripIK`, `setupClip`, `updateClip`, `updateBatter`, `updatePitcher`, `SND`).

4. **`PORT_SPEC_DIFFICULTY_AND_CONTACT_ZONES.md` (new).** The owner wants this understood exactly: the seven tiers with PRO as the default; each swing uses only its own zone (green ring for CONTACT, red core for POWER); firm contact anywhere inside the zone when timed up; the best contact is middle-middle, the middle of the crosshair on the ball in the middle of the red core, on time. Your core already matches the formulas. Still to port: the big-inning ramp, the easy first at-bat, the Gauntlet ramp. On the device, confirm the drawn zones are exactly the judged zones.

5. **The shock ring (the white circle that bursts outward on a great result).** The owner asked about it by name. Batting: you have it at the contact point (item 6 of the contact-feel spec); confirm on the phone that it is clearly seen and grows with contact quality. Pitching: not built yet by your own notes. Build it now with the mound work: on a perfect release the timing ring bursts gold, and the same freeze, flash, shock ring and sparks fire at his fingertips, smaller than at the plate; a good release gets a hint, a mistimed one nothing; the full camera kick is for perfect-perfect only (`PORT_SPEC_PITCHING.md` "Reading the release", `port/TRAILS_AND_EFFECTS.md` line 93, and where `pdTick` sets off the freeze, `flash` and `shock` at `pt.rel` in `index.html`).

6. **`port/VISUALS_AND_FILES.md` (new).** The owner likes the stadium, its features and the level design, and is open to visual improvements now that this is Unity. The file says what is fixed (layout, dimensions, features), what is open (lighting, materials, crowd, sky, effects, model quality), how to propose a change, and where every model, texture, clip and reference picture is. Reply with anything you need that is not there.

7. **`port/SECURITY_AND_LAUNCH.md` (new). Hard requirement from the owner.** Read it, copy its rules into your `CLAUDE.md`, set up a secret scan now and scan the history once, list every third-party package and every network call the project makes today, and add a "Security" line to your reports whenever work touches accounts, network, purchases, saves or a new package.

8. **`PORT_SPEC_SHOW.md` (new).** Asked for by name: every crowd reaction after every kind of play; everything that happens on a home run in order (horn the instant it clears and never for the visitors, flyover, rocket, lasers, fireworks, scoreboard); every camera; every celebration and taunt with the rules for which plays when; and gloves that fit, on the correct hand. Reply per section: have / will do with the sound pass / question.

9. **Two prototype changes to copy (BUILD 990–991).** (a) A throw event on defense is settled once, when the ball reaches the bag, never on a clock started when the inputs came up; the arrows drawn are always the arrows wanted. Build the events that way from the start. (b) A homer off the batter's eye now shows its TRUE distance (how far it went before it hit), not the projected one, and is no longer labelled PROJECTED. `simulate()` returns a new field `eyeD`; `dist` is unchanged, so `flight_cases.json` still matches. `judge0` returns `eyeD` as the homer's distance when the eye was hit. Scoreboard and foul-pole hits still say PROJECTED.

10. **Prototype changes in BUILD 992–993 to copy.** (a) Pitcher letter grades use their own scale straight from the ratings (`PGR` / `pgv` in `index.html`): VELO S 97+, A 90, B 85, C 80, D 75; CONTROL S 93+, A 85, B 77, C 69, D 60; BREAK S 88+, A 80, B 72, C 64, D 56. Six more test arms were added to `STAFF`. (b) A pitcher who has pitched and been replaced cannot return in that game; the Krakens never reuse an arm either. (c) After a mid-at-bat pitching change the strike zone and hot/cold squares must be up from the new arm's first pitch. (d) Your own Juice pitches are drawn and thrown along their real paths (zig-zag zigs, corkscrew coils, knuckler dances five times as far, riser comes in at the knees and jumps), each previewed inside an edge of its own color; `pitchPos` has a second wobble envelope used only when `pt.wk` is set (your pitches), so batting is unchanged. (e) A ball off the batter's eye comes back into the field, lands and hops (it used to hang in the air); the eye's power surge plays every time. `simulate()` changed for flights with `eyeT` only, after the carom: re-check those rows of `flight_cases.json` against the code, the file has not been regenerated. (f) The grounder error is now: half the time the ball eats the infielder up (`tr.offF`, he goes down, ERROR · ATE HIM UP, the ball goes through to the next man), otherwise ERROR · BAD THROW. PULLED HIM OFF THE BAG is gone.

11. **`PORT_SPEC_FLOW.md` (new) and `port/ACHIEVEMENTS.md` (new).** The flow file is what plays after what (walk-ups, strikeout reaction and taunt, home-run trot and celebration, pitcher changes for both sides, pitcher Overdrive, your entrance on the mound), that a tap skips every one of them, and the owner's rule that a play with nothing to show goes straight to the next hitter's walk-up. The achievements file is how the 149 achievements are awarded, queued and shown, and what is still to come. Build both as data plus one small system each.

This is animation work arriving earlier than planned. That is the owner's call: a still hitter and a ball from nowhere will not feel like his game. Keep it simple (play the clips, attach the bat, IK the top hand); polish later.

---

## Review 4: fielding judgment and the three-inning game (28 Nov)

**Your mix matches the prototype exactly.** I ran the same 1,428 flights through the prototype's own `judge` with luck pinned at 0.75 and an average runner: 682 outs, 275 singles, 144 doubles, 317 homers, 10 fouls, 0 triples. Identical to yours.

For a finer check, the prototype's outs by label on that set: GROUND OUT 298, FLY OUT 161, LINE OUT 101, POP OUT 99, SNAGGED BY THE PITCHER 23. With a burner (speed 1.15): 633 outs, 316 singles, 151 doubles, 1 triple, 317 homers, 10 fouls. Compare both if you have not.

- **No triples is correct for this set.** Triples are rare by design: an average runner needs 11.6 s to third against the relay. They come from fast hitters and balls that rattle around the triples alley. Do not loosen anything.
- **The Krakens batting only twice** is how the prototype works; matching it is right. It is flagged for the owner as a design question (should the visitors bat three times?). Do not change it.
- **The 20-second Overdrive wait** is as coded: it is only that long for a player who has never pressed it.

**Next: pitching, on the owner's go.** Build the core rules with tests first (the three inputs and their grading, the meatball, ratings, what the hitter does with the pitch, stamina, the pitcher's own Juice, Scouting Report, Drill Him to the plunk), then the thinnest rig around it, laid out from the pitching pictures. Read `port/code/04-you-pitch.js` and look at `*_10` to `*_13` and the pitch-delivery strip first. Where a ball is put in play, use the fielding judgment you just built. Leave events, walk-ups, celebrations, the brawl, the guide and sound for later. Report what could not be checked without hands on a phone.

---

## Review 3: commits `43b5990`..`e851460` (28 Nov)

Checked against the prototype: a taken ball does earn a bar (`GOOD EYE! · +JUICE`), and the only pitch speed factor in `choosePitch` is the inning one, as you found. 55 tests noted. Not re-read line by line this pass.

**Your question: fielders' out-or-hit rules before pitching? Yes.**

- Do the fielding judgment next, ahead of pitching. Without it a ball in play is never an out, the hitting loop is not a game, the Juice meter overpays, and pitching will need the same rules for what happens when a hitter puts your pitch in play.
- Scope: rules only, no animation. Port `judge0()` and what it depends on (`port/code/02-ball-flight-and-park.js`, `port/05-defense-fielders.md`): which fielder gets it, out or hit, how many bases, ground out versus fly out versus line out, the dive and its miss, the rob at the wall, the misplay, infield hits and the batter's speed, foul outs. Fielders can be gray stand-ins that move to the ball.
- Then the result calls and their holds, runners advancing, outs and innings, so three innings of batting can be played start to finish.
- The defensive events (the QTEs) stay out until `PORT_SPEC_EVENTS.md` is written. Where the prototype would hand the player an event, take the result the code would roll without one.
- A written spec for this (`PORT_SPEC_FIELDING.md`) is coming from the web session. `judge0` is self-contained and you read code well: start from the code now and reconcile with the spec when it lands.

**Models:** pushing the two bodies and three textures (about 4 MB) is fine.

**Pitching plan:** your will-build / in-part / can't-yet split is right. Read `port/code/04-you-pitch.js` and the pitching pictures before building. Pitching starts after fielding judgment, on the owner's go.

---

## Review 2: second pass at commit `c3a6b58` (27 Nov, night)

Read: `REVIEW_REPLIES.md`, and the new and changed files. This is strong work. Answers first, then what is next.

**Your two questions**

- **Normal pitch trail while batting:** you are right and my trails file was wrong. The code only trails pitches that carry a color (Juice and Overdrive pitches). An ordinary pitch has no trail in the batting view. `port/TRAILS_AND_EFFECTS.md` is corrected. (Your own pitch from the mound does always have one: white, gold on a perfect release, or the Juice pitch's color.)
- **Flight row 692:** agreed. It is an engine-precision edge on the 45-degree line. It is now marked `unstable: true` in the file with a note; keep skipping it.

**Your guesses, with the real values**

- **Landing ring size:** radius goes from 5 m at contact down to 1.4 m as the ball arrives, linearly with time (`lerp(1.4, 5, 1 − t/landingTime)`), ring thickness one fifth of the radius. Shown for fly balls and liners hanging longer than 0.45 s and for every ball that will be caught in the air; not for home runs; never after the catch. Now written into `TRAILS_AND_EFFECTS.md`.
- **Camera shake:** each frame the camera's x and y are jittered by a random amount up to the shake value, which decays by `exp(−7 × dt)`.

**Fine as you did them:** 120 Hz on device; double precision in the flight; pinning luck at 0.75; following the code over my notes wherever they differed. Keep doing that and keep telling me.

**On pushing the fonts and the flight-case file without asking:** the owner's rule is about large art, audio and builds. Small text and font files are fine. No change needed.

**Open items carried from your own list (not blockers):** the blimp-shot flame, throw trails, real seams and spin by pitch type, DOUBLE TROUBLE's decoy ball, the inning speed-up (×0.93, ×0.86), the pitcher's speed factor, the taunt's extra 0.75 s, OFF-CENTER mirroring for a left-handed hitter, the 17 px minimum gap on the timing bar, `shotTOff`. Do these when the system they belong to arrives.

**What is next**

1. The owner plays the rig by hand on the Mac and then on his iPhone. His verdict on feel outranks every test. Setting up the iPhone build is his call.
2. `PORT_SPEC_PITCHING.md` is in the prototype repo now. Read it with `port/04-you-pitch.md` and `port/TIMING.md`, list the bold rules you will and will not implement, and wait for his go before building.
3. Still missing from hitting, in the order they matter for feel: a hitter and a pitcher on screen (even gray stand-ins change how the pitch reads), the Juice economy and Overdrive, card perks, wall ropes and the opposite-field slice, the show shots.

---

## Answers to the Unity session's questions (27 Nov, late)

- **Where a touch can aim from:** you are right, follow the code. A touch anywhere on the field that is not a button starts the aim drag; the stick is the picture of it; on release the ring springs back to center. `PORT_SPEC_HITTING.md` is corrected. The "only on the stick" rule is for pitching.
- **Luck in the flight cases:** you are right, the file's claim was wrong. `data/flight_cases.json` has been regenerated with every random draw pinned to 0.75, and its header and `port/BALL_FLIGHT.md` now say exactly what that pins. Use a random source that always returns 0.75 for those tests.
- **Per-result holds after a pitch:** your reading of the code (ball 0.95 s, called strike 1.05 s, swing and miss 1.3 s plus 0.75 s on a taunt, foul 1.0 s) is the authority; `TIMING.md` gave only the round figure. Build to the code.
- **Corner strikes:** the owner's ruling (26 Nov) is that a pitch touching any part of the zone is a strike. Match the prototype's edge rule (`zoneHit`), not the ball's center.
- **Juice pitch trails now, behind a test switch:** yes.
- **A real portrait HUD as part of item 22:** yes. Layout and the two fonts matter now; art can stay gray.
- **Your build order** (fix the misses; items 22–25; then poles, seats, batter's eye, towers, patio and cove against the flight cases) is approved by the web session. The owner gives the go.

---

## Review 1: hitting port at commit `92aca80` (2026-11-27)

### What is right (leave alone)

`Core/Hitting/Contact.cs`, `Core/Difficulty.cs` and the constants in `BallFlight.cs` were compared line by line with `tryContact()`, `DIFF` and `simulate()` in the prototype. Timing window, ring size, chase, quality, launch, spray, exit speed, pop-ups, bloops, choppers, low-gravity pocket, down-the-line, topspin/backspin, tape-measure, the miss reasons (TOO EARLY / TOO LATE / WAY EARLY / WAY LATE / outside the ring), CUE SHOT, the zone and aim limits, drag and gravity all match. Good work. Keep the core as it is.

Every problem below is in `Sandbox/BattingPractice.cs`: controls, rhythm and feedback. Read `PORT_SPEC_HITTING.md` in this repo first; it is the requirement for all of it.

### Must fix

1. **Mouse buttons are reversed.** Prototype: left click = POWER, right click = CONTACT. Also suppress the context menu on right click.
2. **Keys.** Remove F. Contact = Space, Z, J. Power = X, K. Juice = either Shift. Pause = Esc or P. Camera = C (can be a stub).
3. **A swing is never ignored.** Right now a tap in Ready, Windup or Result does nothing or skips. Required:
   - Ready, or the first .55 s of the wind-up: a free practice cut (bat swings, no cost, no result).
   - Up to 1.3 s after the ball is in the mitt: the bat still comes through and the read-out says WAY LATE. The call that was made stands. It must never delay the next pitch.
   - This means **a tap must not skip the Result state.** Skipping is for ball flights and cut-scenes only.
4. **Pitch rhythm.** The rig uses Ready .7 s and Windup .55 s. The prototype's wind-up is 1.0 s, and the swing is live from .55 s into it. The gap between pitches is about 2.1 s for the same hitter. Match these; a hitter's timing is built on this rhythm. (`PACE`, `readyDur`, `windupT0` in the prototype.)
5. **Swing and miss replay.** On any miss, freeze the ring where the player had it and mark where the ball crossed, for about 1.9 s, with the player's center marker at the ring's center. The next pitch waits for it. TOO EARLY! / TOO LATE! are shown larger and in gold; the other miss lines in the swing's color.
6. **Taking a pitch.** Leave a ball marker where it crossed, with speed and pitch name beside it, for about 1.7 s. "took it" is not prototype wording; remove it.
7. **The white "Middle" circle is not in the prototype.** Replace it with the center marker: none, dot, crosshair or small ring, as a setting. Default crosshair on touch.
8. **Phone controls.**
   - POWER is the large button, bottom-right. CONTACT is smaller, to its left. JUICE sits above them. They are currently equal squares.
   - Aim is a stick, bottom-left, that springs back toward center on release. The rig uses a free drag across 60% of the screen with no spring. A touch that is not on the stick must never move the aim.
9. **Timing read-out.** Replace "NN ms early/late" as the main feedback with the prototype's: the timing word plus a timing bar with a marker. Milliseconds can stay as a small debug line.
10. **Contact feedback panel.** Grade word, exit velocity, launch angle, timing word, contact word, and the small picture of where the barrel met the ball. Placed so it never covers the hitter, the zone or the buttons.

### Added after the owner's first look at the rig (same priority as "Must fix")

16. **Default camera is wrong.** The prototype's default batting view is STRIKE ZONE, not CLASSIC: position (0, 1.3, 2.9), looking at (0, .95, -18) in prototype coordinates (flip z for Unity). The five views are CLASSIC, STRIKE ZONE, OFF-CENTER, HIGH, FAR (`CAMS` in the prototype); C cycles them. Field of view: 2*atan(tan(31 deg)/aspect), clamped 42 to 68.
17. **The timing circle is missing. This is the core of the hitting feel.** While the pitch is in flight (from 22% of the way in; 42% for a Juice pitch) a yellow ring sits at the spot where the pitch will cross and closes at a steady speed onto a target of radius .068. It runs ahead by the swing time (.07 s) so "tap when it finishes closing" is exactly on time. It flashes green at that moment, then keeps shrinking: smaller than the target means late. Read `pring` / `ptarget` in the prototype's pitch tick.
18. **The pitch-location marker is missing.** The target at that spot is a small baseball (bright, no halo), the same size as the ball marker left behind after a take.
19. **The rings are not filled.** CONTACT is a green ring (0x3ddc6a) with a soft green fill at about 26% opacity. POWER is a red ring (0xff4d2e) with a red fill at about 40%, reading as a hot core inside the bat ring.
20. **The ball cannot be seen.** The trail is as wide as the ball and bright white, so it hides it. The prototype's pitch trail is a thin flame ribbon that tapers; the ball itself is always the brightest, clearest thing. Make the trail much thinner than the ball and fading, and keep the ball its true size on the way in.
21. **Center marker default is the crosshair** (item 7). The owner called this out specifically.

22. **Look at the pictures.** `port/LOOK.md` and the 55 images in `port/look/` show the batting view from every camera, the HUD on phone and PC, the timing circle, the miss replay, the hit feedback, the pitching view, the events and the whole ballpark, with the numbers behind them. The gray-box rig should be laid out to match `phone_03_batting_ready_default_view.jpg` and `pc_03_batting_ready_default_view.jpg`: same camera, same control positions and sizes, same ring. Art can stay gray; framing and layout may not differ.

23. **The ball marker after a taken pitch is a must** (owner, 27 Nov). A small bright baseball stays where the pitch crossed for about 1.7 s with the speed and pitch name beside it and the zone outline kept up. See `port/look/*_06b_took_a_pitch_*` and `port/TRAILS_AND_EFFECTS.md`.
24. **Trails.** Read `port/TRAILS_AND_EFFECTS.md` and match it: thin, tapering, never hiding the ball; colors by swing type; each Juice pitch its own color and shape.

25. **Timing.** `port/TIMING.md` lists how long everything takes and what changes it. Match the at-bat rhythm table exactly (wind-up 1.0 s, swing live from 0.55 s, about 2.1 s between pitches) and the pitch flight times per tier.

### Decide and tell the owner

11. `Application.targetFrameRate = 60`. The iPhone screen is 120 Hz and the prototype's biggest complaint was uneven frame pacing in the browser. Say whether you intend 60 or 120 on device and why. Do not leave it as an accident.
12. Mouse aim maps the pointer straight onto the plate plane. The prototype has a six-step sensitivity setting (1, 1.2, 1.4, 1.7, 2, 2.4) and hides the system pointer while batting. Note it as not ported, or port it.

### Tests to add

13. Controls: a test that left click produces a power swing and right click a contact swing.
14. Late swing: a tap .5 s after the pitch is caught produces a swing and a WAY LATE read-out and does not change the count or delay the next pitch.
15. Rhythm: wind-up length and the earliest live-swing moment match the prototype's numbers.

### Reminder

The capitalized comments in `index.html` are the owner's requirements. Before the next system, list the ones that apply and confirm each. The web session will write `PORT_SPEC_<SYSTEM>.md` for each system before you start it; wait for it.
