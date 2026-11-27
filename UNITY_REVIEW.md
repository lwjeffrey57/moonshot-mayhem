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

### Decide and tell the owner

11. `Application.targetFrameRate = 60`. The iPhone screen is 120 Hz and the prototype's biggest complaint was uneven frame pacing in the browser. Say whether you intend 60 or 120 on device and why. Do not leave it as an accident.
12. Mouse aim maps the pointer straight onto the plate plane. The prototype has a six-step sensitivity setting (1, 1.2, 1.4, 1.7, 2, 2.4) and hides the system pointer while batting. Note it as not ported, or port it.

### Tests to add

13. Controls: a test that left click produces a power swing and right click a contact swing.
14. Late swing: a tap .5 s after the pitch is caught produces a swing and a WAY LATE read-out and does not change the count or delay the next pitch.
15. Rhythm: wind-up length and the earliest live-swing moment match the prototype's numbers.

### Reminder

The capitalized comments in `index.html` are the owner's requirements. Before the next system, list the ones that apply and confirm each. The web session will write `PORT_SPEC_<SYSTEM>.md` for each system before you start it; wait for it.
