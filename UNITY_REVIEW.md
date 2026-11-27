# Unity review (latest on top)

Written by the web-build session after reading the Unity repo's code. The owner will tell the Unity session: "Pull the prototype repo and do everything in the latest review." Do each numbered item, then reply with done / not done / question per item. Do not build new features until the list is cleared or the owner says otherwise.

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
