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

10. **Prototype changes in BUILD 992–993 to copy.** (a) Pitcher letter grades use their own scale straight from the ratings (`PGR` / `pgv` in `index.html`): VELO S 97+, A 90, B 85, C 80, D 75; CONTROL S 93+, A 85, B 77, C 69, D 60; BREAK S 88+, A 80, B 72, C 64, D 56. Six more test arms were added to `STAFF`. (b) A pitcher who has pitched and been replaced cannot return in that game; the Krakens never reuse an arm either. (c) After a mid-at-bat pitching change the strike zone and hot/cold squares must be up from the new arm's first pitch. (d) Your own Juice pitches are drawn and thrown along their real paths (zig-zag zigs, corkscrew coils, knuckler dances five times as far, riser comes in at the knees and jumps), each previewed inside an edge of its own color; `pitchPos` has a second wobble envelope used only when `pt.wk` is set (your pitches), so batting is unchanged. (e) A ball off the batter's eye comes back into the field, lands and hops (it used to hang in the air); the eye's power surge plays every time. `simulate()` changed for flights with `eyeT` only, after the carom: re-check those rows of `flight_cases.json` against the code, the file has not been regenerated. (f) The only error on a routine grounder is now the ball eating the infielder up (`tr.offF`, he goes down, ERROR · ATE HIM UP, the ball goes through to the next man). BAD THROW and PULLED HIM OFF THE BAG are both gone until a wild throw is animated (BUILD 995). (g) Portraits always face the camera, head level (BUILD 994).

11. **`PORT_SPEC_FLOW.md` (new) and `port/ACHIEVEMENTS.md` (new).** The flow file is what plays after what (walk-ups, strikeout reaction and taunt, home-run trot and celebration, pitcher changes for both sides, pitcher Overdrive, your entrance on the mound), that a tap skips every one of them, and the owner's rule that a play with nothing to show goes straight to the next hitter's walk-up. The achievements file is how the 149 achievements are awarded, queued and shown, and what is still to come. Build both as data plus one small system each.

12. **Ruling on your crosshair question (item 4).** You are right and the spec was loose; it is corrected. Squared-up is 30% × `mid` of the radius of the zone for the swing used (6.4 cm across on a power swing, 12.8 cm on a contact swing at Pro); the crosshair is drawn at one size (7.5 cm at Pro). **Update: the owner has decided (BUILD 996).** Draw the crosshair (and the small-ring marker) exactly the size of the power swing's squared-up circle: diameter = 2 × `SQR()` × the red core's drawn radius, so it follows Juice, Overdrive, the hitter and the tier. The judged sizes do not change. See `markDom` in `index.html`. Good catch on the stalled wait step and on turning off Unity's hardware statistics.

13. **`port/HAPTICS.md` (new): vibration on iPhone.** The owner wants the iPhone's real haptics (Core Haptics: intensity and sharpness, taps and short rumbles), not a plain buzz. Nothing has ever been felt on his phone, because an iPhone browser cannot vibrate, so the prototype's `buzz()` calls only tell you which moments matter. Build the native bridge, one `Feel(event, q)` entry point, the Full / Light / Off setting and a test screen that plays each haptic by name, then wire contact, the mitt, the homer and the release, and hand it to him to tune before doing the rest. The file now carries the owner's must-have list, how long each kind lasts, how the crowd shake (`rumble`) works and why, and his hard rule that a rumble stops the instant a scene is skipped. This replaces the vibration lines in the contact-feel spec. No paid packages; ask before adding any third-party one.

14. **Where the hitter stands in the box.** New section at the end of `PORT_SPEC_CONTACT_FEEL.md`: stand each body where his own swing puts the sweet spot of the bat over the middle of the plate (level with the plate, 0.5 to 1.5 m off it), then back him off until his feet are at least 0.52 m from the plate's center line; mirror for a lefty. Per body, per swing clip, measured, not placed by eye. Top-down pictures of every body in the stance and at contact, please.

15. **Field markings and bases.** Two new sections at the end of `port/VISUALS_AND_FILES.md`: the exact layout of everything the owner says is right today (plate, regulation batter's and catcher's boxes with 4 in chalk, foul lines that do not run through the boxes, infield skin, grass diamond, mound, warning track, the white edge lines), and the bases as an area to improve (real rounded bags instead of white boxes, and no feet or bodies clipping through them in any clip at a bag).

16. **`port/DEVICES_AND_PERFORMANCE.md` (new).** The owner tests on an **iPhone 17 Pro Max** (not an XR) and a MacBook Air M1; nothing else has been tried. The UI must also hold on small iPhones (down to the SE, 375 × 667 points): send him the main screens at four sizes. The file also has everything the browser build measured on his phone and Mac (frame rates, the steady 10% of slow frames that is the browser's pacing, the hitches that came from building bodies mid-play and what fixed them) and what it means for Unity. Correct your `CLAUDE.md` if it names a different phone.

17. **Reply to your delivery / swing / bat report (28 Nov).** Good round. Four rulings:
   - **Crosshair: it does change.** You read item 12 before the owner decided. Pull again: draw the crosshair (and the small-ring marker) exactly the size of the power swing's squared-up circle (item 12's update, BUILD 996, `markDom`).
   - **Top hand on the bat:** both hands on the handle in the stance, the load, and the swing **through contact**, with no clipping. After contact, and in walk-ups, celebrations and routines, follow the clip: if the clip takes a hand off (a one-handed finish, bat on the shoulder, pointing the bat) let it come off. That is what the prototype's 34 cm rule was for. Forcing the arm to the handle when the clip has the hand far away will stretch the arm. Send stills of the follow-through and of two walk-up routines both ways and let the owner pick.
   - **Stride long and low at contact:** check your port before blaming the clip. The prototype plays these clips with **rotation tracks only, plus the hips' position track** (every other position track is dropped), on a body scaled to the park by `fitDriver`. If you are applying position tracks on other bones, or the hips' position in the clip's units (centimeters) without the body's scale, he will sink and stride too far. Compare your contact frame with `port/look/` side by side.
   - **Order from here, for the owner's first phone playtest:** items 9 and 10 (the prototype fixes, mostly small), then item 1 (callouts, distance counter) and item 5 (shock ring out of the hand), then item 13 (haptics bridge and test screen), then 14 to 16. Flow and achievements (item 11) after that.

18. **Prototype changes in BUILD 997–999 to copy.** (a) Portraits are photographed large with their own studio lights (see the portraits note in `port/VISUALS_AND_FILES.md`). (b) During any event at a bag the crowd is held up from the moment the runner breaks until the call; it must never go quiet. (c) After an event every runner is standing on his bag: nobody strolls back from his lead when the picture returns. (d) Breaking up a double play is called BROKE IT UP! · NO DOUBLE PLAY · SAFE AT FIRST (won) or DOUBLE PLAY! · TWO FOR ONE (lost), not a bare SAFE! / OUT!. (e) The flames on the Juice meters are a moving strip clipped to the fill, so they never freeze; in Unity make them a cheap shader or sprite animation that always runs while the bar has anything in it.

19. **`flight_cases.json` is regenerated (BUILD 999), as you asked.** Still 1,428 rows, luck pinned at 0.75. Only batter's-eye rows changed: 22 rows have `offEye` true, 19 of them differ from the old file (after the carom), and every other row is identical. New field `eyeDistanceM` is the distance shown for a homer off the eye. Row 692 keeps its `unstable` flag. Re-copy the file and put the 22 back in the test. Thank you for setting them aside rather than loosening the test.

20. **Player portraits must look good and cost nothing in play.** The portraits section of `port/VISUALS_AND_FILES.md` is rewritten: the look the owner wants (facing the camera, level, evenly lit, sharp, all framed alike), what went wrong in the prototype, and the rule for Unity: render them once in the editor with a one-command tool and ship them as images, never photograph players during a game. Not urgent for the first phone playtest; required before launch. Send him a sheet of every Comet and Kraken when it is done.

21. **`port/NOTIFICATIONS.md` (new): push notifications, a must before launch, nothing to build now.** Every notification the game might need (daily challenge, streaks, come-back nudges, friends, events, service notices) with example wording, and the rules: local ones first, ask permission at the right moment, opt-in by category, frequency caps and quiet hours, cancel anything no longer true, care with children. The list is a set of proposals for the owner to approve. **He wants the streak and its reminders modelled on Duolingo's:** the file has a table of what that app does, why it works and how each piece maps to this game (tiny daily bar, streak shown everywhere, a reminder at his usual time plus one last-chance reminder, freezes, earning a lost streak back, a character's voice, backing off when ignored, milestone cards, a home-screen widget), and where not to copy it (no guilt aimed at kids, nothing about a streak for sale). For now only keep the core's events easy to subscribe to.

22. **First iPhone build (owner's screenshot, 28 Nov, iPhone 17 Pro Max): what the web session sees in it.** The game runs, the HUD fonts and the zone look right, and it got to 0-2 on a real phone. These need fixing before the next install, most urgent first:
   - **The field is solid magenta and the sky is black.** Magenta is Unity's missing-shader color: the ground material's shader is not in the build. This is almost always a material made in code with `Shader.Find(...)`, which works in the editor and returns nothing on a device because the shader was stripped. Use materials saved as assets (or serialized references), or add the shaders to Always Included Shaders, and check every `Shader.Find` and `new Material(...)` in `Sandbox/`. Look for the same cause behind the missing sky and park.
   - **The Development Console is full of red errors**, and they look like "Can't add component because class 'CapsuleCollider' doesn't exist". That is engine code stripping removing the physics classes: `GameObject.CreatePrimitive` (the gray capsule fielders) needs collider classes that nothing references, so they are stripped from the iPhone build. Stop using `CreatePrimitive` for stand-ins (build the mesh without a collider), or keep the classes with a `link.xml` / a direct reference. Read the device log from Xcode and clear every error; do not ship a build that opens with a console of red.
   - **No sound on the phone.** Check in this order: (1) the phone's silent switch / Action button and volume: by default a Unity game is muted by the silent switch, so ask the owner first; (2) the device log for audio errors; (3) that there is an AudioListener in the scene and the clips really are in the build (anything loaded by name must be under `Resources` or referenced, the same stripping problem as the shaders); (4) that audio is not started before the first touch in a way iOS blocks. Decide with the owner whether the game should play sound with the silent switch on (most games do not).
   - **The top of the HUD is under the Dynamic Island** (the black bar at the top of the screen), and the bottom is close to the home indicator. Lay out every HUD from `Screen.safeArea`, on every phone size. This is already a rule in `port/DEVICES_AND_PERFORMANCE.md`; it is not met yet. Re-check after rotating and on the small sizes.
   - **Overlaps:** the STRIKE TWO! call runs under the SOUND ON button; the JUICE button overlaps POWER; the development console sits under the AIM pad and CONTACT. Text and callouts never cover a control (owner's rule).
   - **Framing:** the hitter is cut off at the left edge and the pitcher is tiny compared with `port/look/phone_03`. Match the prototype's phone framing (camera position and the field-of-view rule in `PORT_SPEC_HITTING.md`), then compare side by side with that picture.
   - **Before each device build from now on:** run it once in the editor with the iPhone Pro Max Game view, read the Xcode device log after install, and send the owner a screenshot from the phone itself, not only from the editor. The editor hides exactly these three problems (stripped shaders, stripped classes, safe areas).

23. **Side by side: the prototype on the owner's iPhone against your first iPhone build.** The reference is `port/look/phone_reference_batting_build999_on_owner_iphone.png` (BUILD 999, his iPhone 17 Pro Max, first pitch of a game). The game area in it starts below the Claude app's own bar; in a native build the same layout must start below the Dynamic Island (item 22). Measurements are fractions of the game area. Everything below is "the Unity build does not match yet":

   **The world (nothing of it is there yet)**
   - Moon surface with craters and the lit dust; the plate, both batter's boxes and the foul lines in normal 10 cm chalk. Your build has a flat pink ground and two foul lines drawn about a meter wide across the bottom of the screen.
   - The outfield wall with its ads and distance markers, the crowd in the stands, the big scoreboard (showing PLAY BALL), the ribbon boards, the Cove on the right, the ridge and the Earth in the sky. Yours is a black sky and a yellow line.
   - Fielders standing at their positions in their own bodies.

   **Camera and framing**
   - The hitter is big in the left foreground: head near 0.52 of the height, body down past the knees, about a third of the screen wide, bat up and visible. Yours shows only an arm at the edge.
   - The foot of the outfield wall sits at about 0.55 of the height (yours: about 0.48, so the camera is tilted or placed differently). The strike zone's center is at 0.65 of the height and 0.50 of the width; the zone is 0.28 of the width. The pitcher stands directly above the zone with his feet at the zone's top edge. Home plate shows at the bottom center, between the AIM pad and CONTACT.
   - Use the STRIKE ZONE camera and the field-of-view rule from `PORT_SPEC_HITTING.md` exactly, then overlay your screenshot on the reference and nudge until the wall line, zone and pitcher coincide.

   **HUD: same places, not yet the same look** (`port/ui/style.css` has every color, border and shadow)
   - **Scorebug:** an inning row with a small green arrow and "1ST" (no "BOT"), then KRA and COM rows on dark navy with the score right-aligned, then a black row with the count in white ("0-0") and outs in yellow as "O: 0". A light border and drop shadow round the whole thing. Remove the "PRO · EASY" label from the play screen (keep it as a debug toggle).
   - **Juice meters:** a pill with a thick outline (yellow glow on the batter's), three divider ticks making four bars, a **flame fill** (blue for the batter, orange-red for the pitcher) that is always moving, "JUICE" in the italic display face with a dark outline, and BATTER / PITCHER captions in yellow italics. Yours are flat color pills.
   - **Diamond:** a fan-shaped field (green wedge with a white outline and a dirt infield), bases as round dots that light up, home as a red dot. Yours is a plain square.
   - **PAUSE / SOUND ON:** yellow pill and dark pill with heavy dark outlines and a hard drop shadow; the pause mark is two bars.
   - **Buttons:** glossy, with a thick dark ring, a highlight on top and a hard shadow underneath; label in white with a black outline. POWER is the biggest (bottom right), CONTACT smaller at bottom center-right, JUICE above POWER **with clear space between them** (yours overlap), burning with flames, and a red "×3" badge on its top-right corner for the bars in hand.
   - **AIM pad:** a dark translucent disc with a **yellow ring**, a silver knob with concentric rings, "AIM" above it. Yours is a purple disc with a gray knob.
   - **Strike zone:** a white frame with nothing else in it while batting (no grid lines: the nine squares belong to pitching only), green ring with a soft green fill, red core with a red fill, small white crosshair. Colors as in the reference.
   - **The hitter's card** at the start of an at-bat: number, position and hand ("#27 · CF · BATS R"), name, rating badge with tier gem, and PWR / CON / SPD letter grades. It is missing.
   - **Callouts** (STRIKE TWO!) go in the clear band between the top bar and the pitcher's head, never under a button.
   - A small build tag bottom-right ("B999" there): add one, so the owner can always tell which build he is holding.

   **The swing's follow-through looks wrong to the owner** ("kinda funky"). Compare with `setupClip` / `updateClip`: the swing is the `hit` clip played from the load point `tL` (0.22 s before contact) so that the contact frame `tC` lands exactly when the ball arrives, **then on to `tE` = contact + 0.6 s and no further**, then blended back to the stance (or into running on a ball in play). The clip is 2.97 s long: if you play past `tE`, or hold the last frame, or keep the top hand pinned to the handle after contact, the finish will look odd. Send him three stills (contact, contact + 0.3 s, contact + 0.6 s) next to the same three from the prototype.

   **Order:** item 22 first (shaders, errors, sound, safe area), then the camera, then the HUD look, then the world. Send a phone screenshot after each step so progress is judged on the device.

24. **The ball's size on screen.** New section at the end of `PORT_SPEC_CONTACT_FEEL.md`. The owner's rule: the ball never looks too big and is recognisably the same ball in every view. The prototype draws it true size up close and enlarges it only enough to stay visible at distance (batted ball `max(1, distance × 0.05)`, throws smaller, the overhead homer view a small ball with a flame trail). One function for the scale, used everywhere; one picture per view from the phone.

25. **The baseball in the strike zone (the pitch-location target) does not look like ours.** Reference: `port/look/phone_reference_timing_circle_build999_on_owner_iphone.png` (the owner's phone, pitch on its way). Compare with your build:
   - **Ours is a small, real-looking baseball:** soft off-white leather with a little shading, thin red stitching, and drawn slightly see-through so it never blots out the zone behind it. **Yours is a flat white disc with a thick black outline and heavy red seams.** It reads as a sticker, and the black edge makes it look bigger and heavier than it is.
   - **Ours sits inside a thin white ring.** That ring is the target itself (radius 0.068 m, `PT_R`, drawn as a ring from 84% to 100% of that radius, white at 95%): it is what the yellow timing ring closes onto. The baseball is inside it and a little smaller than it. No black outline anywhere, no halo, no glow.
   - **The yellow timing ring** is a clean ring in #ffe53b, about 14% of its radius thick, closing steadily onto the white ring; it flashes green at the on-time moment and keeps shrinking after (smaller than the target means late).
   - **Size:** the white target ring is 13.6 cm across against a zone 43 cm wide, so just under a third of the zone's width at Pro. On harder tiers it is drawn smaller, in step with the smaller middle-middle.
   - **The strike zone while batting has no grid** (still showing in your build); the nine squares are for pitching.
   - Same ball rule as item 24: it must look like the same baseball as the one in flight, not a different icon.
   - Also seen in this build's screenshot: a HAPTICS test button sitting on the pitcher's Juice bar and a GO PITCH button where SOUND ON belongs. Keep debug buttons off the play screen (a hidden gesture or a debug menu), and keep SOUND ON where it is in the prototype. The hitter's card is in, which is good; it still needs his position and the rating badge with its tier gem.

26. **The ball in the zone and the crosshair both get smaller as the game gets harder.** The owner wants this understood as one idea: the harder the tier, the smaller the things you aim with.
   - **The baseball drawn in the zone (the pitch-location target):** its radius is `clamp(0.068 × 0.62 × ring^0.7, 0.022, 0.05)` meters, where `ring` is the tier's ring value **including the big-inning ramp** (`DFX().ring`). Rookie 4.7 cm, **Pro 4.2 cm**, All-Star 3.6, Legend 3.2, Moonshot 2.7, Galactic 2.4, Intergalactic 2.2 (radius). **The thin white target ring round it stays 6.8 cm** at every tier, because the yellow timing ring closes onto that and timing must read the same.
   - **The crosshair** is the power swing's squared-up circle (item 12 update): diameter 2 × 0.3 × `mid` × the red core's radius. For an average hitter, no Juice: Rookie 10.2 cm, **Pro 6.4 cm**, All-Star 3.3, Legend 2.1, Moonshot 1.3, Galactic 0.9, Intergalactic 0.6. It grows with Juice, Overdrive and the easy first at-bat.
   - **A floor so it can always be seen:** the prototype never draws the crosshair under 9 px on screen (BUILD 1000; it was 15 px, which on a phone was already bigger than the Pro target, so it never shrank on the harder tiers). In Unity use a floor in points that keeps it visible on a 3× screen, and tell the owner what you chose. Measured on the phone layout: Rookie 21 px, Pro 13 px, Legend and above at the 9 px floor.
   - Tests: the ball radius and crosshair diameter for all seven tiers, and both again at 4 and 6 runs into a big inning.

27. **Batted-ball trails: the owner calls them very important to how hitting feels.** They are specified in `port/TRAILS_AND_EFFECTS.md` ("How a trail is made", "Batted-ball trail colors", and the verbatim code at the end). Port them exactly before inventing anything, and check them on the phone. The points that matter:
   - **The trail says how well you hit it, the instant it leaves the bat.** Ordinary contact: a whisper of gray smoke (one faint layer, 60% strength, living 0.12–0.22 s). A barreled power swing (quality above 0.75): a **gold** flame. A Juice swing: **orange** flame. An Overdrive swing: **electric blue** flame. The color is chosen once, at contact.
   - **A hot trail is two layers:** a cooler tail in the trail's color pushed toward red-orange that lingers 0.45–0.8 s, and a bright near-white core on every second point that dies in 0.1–0.2 s. That is what makes it taper like a flame instead of ballooning.
   - **Thin, and never hiding the ball.** Small glowing additive particles laid end to end along the path with a little jitter: about 0.13 m each, every 0.05 m, close to the camera; about 0.55 m each, every 0.16 m, beyond about 9 m. The ball stays the clearest thing on screen. Your first rig failed this with a trail as wide as the ball.
   - **It stops when the play is dead** (caught, or called), and it keeps the same color for the whole flight on every camera, including the chase camera. From the blimp view the ball stays small and a doubled orange flame traces the flight.
   - The contact burst and sparks use the same color family as the trail.
   - The reference the owner had in mind was the trail in the old Slugfest games.
   - Send him a short clip or four stills from the phone: weak contact, a gold barrel, a Juice swing, an Overdrive homer.

28. **The pause menu does not come up on the phone build** (the owner: pause works, the menu does not). The prototype's pause screen, in order: PAUSED, **RESUME**, **CHANGE PITCHER** (only while pitching), **SKIP TO PITCHING** (only while batting, playtest aid), **SETTINGS**, **RESTART GAME**, **QUIT TO MAIN MENU**, then a **CAMERA** cycle button, **HOW TO PLAY** and **HOW TO PITCH**. The settings screen's exact contents are in `port/ui/markup.html` (take the list from there, not from memory), plus the new vibration setting from `port/HAPTICS.md`. The game clock stops while paused, and any rumble must stop too. Layout and wording are in `port/ui/markup.html` and `port/look/phone_screen_*`. Likely cause of yours: the menu's canvas or objects are missing from the device build, or drawn outside the safe area / behind the HUD; check the device log.

29. **A ball that leaves the stadium is shown flying as far as it really goes.** New section at the end of `port/BALL_FLIGHT.md`; the owner calls it important for feel. The flight already continues past the back row, lands on the Moon, bounces and rolls (your `BallFlight` has it). The work is in the picture: follow 600 ft and up all the way on the chase camera until it touches down and kicks up once; build the world out to at least 450 m so it flies over and lands on something; set far clip, fog and level of detail so the ball and the ground under it are never clipped; keep the ball small but visible with its trail and shadow; the counter ends on exactly the distance in the call. Three phone captures: about 450, 650 and 900+ ft.

30. **The pitcher on the phone build only throws fastballs. He must mix his pitches, each with the timing circle on its own clock.** Code: `choosePitch()` in `index.html` (`port/code/03-cpu-pitching.js`), tables `PITCHES` and `ARS`. Check first whether you are stuck in one of the two cases that are fastballs on purpose: **the easy first at-bat** (leadoff man, first inning, a player's first three games: fastball only, in the zone, slower, 30% of normal break) and **the Derby** (batting-practice fastballs). Your screenshot said PRO · EASY, so the "new player" switch may be stuck on, or games played is never counted. Outside those cases:
   - **Which pitch:** drawn at random from **this pitcher's own arsenal** (`ARS`: MAC fastball / slider / curve / change; CARLOS fastball / sinker / splitter; LEE fastball / curve / change / screwball; BRAXX fastball / cutter / sweeper / knuckle curve; MALGOR fastball / slider / eephus), weighted by each pitch's `w` (fastball 4, most others 2, screwball and eephus 1). So a four-pitch arm throws a fastball about four times in ten, never ten in ten.
   - **Juice pitches:** none to the first three hitters of a game. The fourth hitter is guaranteed the game's first one within his first two pitches. After that, when the pitcher's meter has at least a bar, each pitch has a `38% + 4% per Comets run (up to 10)` chance of being a Juice pitch (any non-Overdrive one). In Overdrive every pitch is a Juice pitch, including the three Overdrive-only ones. His meter is only charged after the pitch has been seen, so the bar does not give it away.
   - **Where:** 64% in the zone; the first hitter of every game sees only strikes; behind 2-0 he comes into the zone 85% of the time and at 3-0 98%; otherwise 10 to 26 cm off one edge. A left-hander's pitches break the other way.
   - **How fast and how much it moves:** each pitch has its own flight time (`dur`: fastball 0.64 s, slider 0.74, change 0.95, curve 0.86, eephus 1.22 ...) × the inning (1, 0.93, 0.86) × the tier × a little luck (0.97–1.03); its break × luck (0.8–1.15) × the tier's break; its own hump (`arc`) and late-break sharpness (`k`).
   - **The timing circle is tied to that pitch's own flight time, not to a fixed clock.** It appears at 22% of the flight (42% on a Juice pitch) and closes at a steady speed onto the target, reaching it 0.07 s (the swing time) before the ball arrives: ring radius = lerp(0.42, 0.068, t) with `t = (u + 0.07 / dur − 0.22) / 0.78`, `u` = fraction of the flight done. So on a change-up the ring visibly closes slower than on a fastball, and tapping as it closes is on time for every pitch. Your core already has `Pitches.cs` and `Feedback.cs` for this: make sure the rig feeds them the pitch that was actually chosen and its real `dur`.
   - **The path:** every pitch finishes exactly at its target spot; break and hump only change what it does on the way (`pitchPos`). A curve should loop and drop, a slider dart late, a change-up float and die.
   - After each pitch the name and speed show by the marker (and JUICE PITCH! · NAME for those).
   - Tests: over 2,000 pitches from each arm with luck unpinned, the share of each pitch type matches the weights; no Juice pitch to the first three hitters; the ring reaches the target 0.07 s before arrival for every pitch type.

31. **The swing: no delay, a proper swing and miss, late swings that never slow the game.** New section at the end of `PORT_SPEC_CONTACT_FEEL.md`, from the owner's rules. The swing starts on finger-down and the bat is at contact 0.07 s later from whatever pose he is in; a miss hands over to the captured swing-and-miss clip at its own contact frame, stops at the follow-through, holds a beat and resets by 1.05 s (sooner if a pitch is coming); a take is animated (check swing on a close pitch); and a tap up to 1.3 s after the mitt still swings and says WAY LATE without changing the call or delaying the next pitch. Measure finger-to-contact on the phone.

32. **The batter's eye is missing. Build it, centered in dead center field, straight behind the mound as the hitter sees it.** The owner's ruling on the walls: **he likes how your right-field wall looks and is happy for it to differ from the prototype; keep it.** The batter's eye is not optional: it is the dark backdrop the hitter picks the ball up against, and the flight rules already bounce balls off it. Code: "batter's eye in dead center" in `index.html`; pictures `port/look/stadium_*` and both phone reference screenshots (it is the dark panel behind the pitcher, under the scoreboard).
   - **Where:** spans 8° either side of dead center (16° in all), following the wall's curve. Its lower edge is 3.2 m behind the wall and 1.25 m above the wall top (wall height `WALL_H` = 3.4 m, so 4.65 m up); its upper edge is 10.9 m behind the wall and 20.25 m high. So it is a **panel leaning back**, about 17 m tall along its slope, standing behind and above the top of the wall, not cutting into it. A dark plinth fills the gap from the wall top to its foot: no seats or fans under it.
   - **What collides** (already in your `BallFlight`): the solid slanted wall from 1.3 m to 9 m behind the fence within those 8°, height at distance d of `WALL_H + (d − 1.3) × 2.026`. A ball that hits it caroms back into the field, lands and hops (BUILD 993), the homer's distance is where it hit, and the eye takes its **power surge** every time. Make the drawn panel and the collision surface the same surface.
   - **The look:** a dark solar array: near-black blue (#070b1c) with a faint blue grid of panels and a low glassy sheen, **kept dark on purpose so a white ball shows against it.** A dark metal frame with a glowing cyan inner edge (#3ad6ff), corner beacons, and a soft pool of its glow on the wall top. The big scoreboard stands above it.
   - **Nothing bright behind the pitch:** from the STRIKE ZONE camera the eye must fill the background behind the pitcher's release and the strike zone. No ads, crowd, lights or moving things inside that window. The pitcher's Overdrive tag sits on it, just over his head.
   - Check from the hitter's camera on the phone: the pitcher, the release point and the top of the zone are all against the dark panel.

33. **Homers into the stands, the patio and the Cove.** New section at the end of `port/BALL_FLIGHT.md`; the owner calls it important for the feel of hitting. A homer is seen arriving somewhere: it lands at head height above the seats with a spray and a thud, takes one short hop among the fans, and then somebody has it (within 0.85 s); the distance shows beside the spot; flashes sparkle through the stands. The patio is a floor it bounces on; over the rail it goes into the lava with a geyser. Five phone captures listed there.

34. **Start building the other cameras now, as each becomes possible.** They are all in `PORT_SPEC_SHOW.md` sections 3 and 6 and `port/code/11-cameras.js`. Order: (1) the **chase camera with the feet counter** for long homers; (2) the **blimp view** (small ball, flame trail) for no-doubters that stay in the building; (3) the **five aerial shots** (straight down over the mound, the blimp circling, behind the rocket, the crane rising behind the plate, riding high above the ball), never the same one twice running, with the lasers and fireworks timed to them; (4) the admire and show shots on the hitter; (5) the trot and plate celebration; then the walk-up, strikeout and event cameras. Keep the rules: variety, the camera above every roof and ridge, and each choice made at contact from the flight that is already known.

35. **Everything is skippable with one tap, and it is easy. Match how it works in the prototype** (`doSwing` in `index.html`; `PORT_SPEC_FLOW.md`). There is no skip button to find: **any tap on the swing buttons or the screen skips whatever scene is playing**, at once:
   - a **walk-up** (yours or a Kraken's): any tap or key ends it; if his body is still loading, the tap skips the wait too;
   - a **home run in flight**, on any camera (chase, aerial, orbit, saucer): a tap ends it there and then, from 0.45 s after contact (nothing on screen says so: "it is there for the player who has seen enough");
   - the **trot**, the **celebration at the plate**, the celebration on a base, a **hit by pitch**, the run to first after it, the **brawl**, the pitcher-change scene and the explainers: one tap each;
   - the only thing a tap cannot cut is the Locked In moment (under a second).
   - **Guards so a skip is never an accident and never eaten:** a tap within 0.12 s of a scene starting is ignored; the tap that skips never also swings the bat at the next pitch; a skip never cancels the result (the run still scores, the achievement still drops, the distance is still recorded).
   - The first walk-up says TAP TO SKIP on the card; after that nothing needs to say it.
   - Test: a full game tapping constantly never gets stuck, never loses a result, and takes well under half the time of a game with no taps.

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
