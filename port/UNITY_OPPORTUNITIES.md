# What Unity lets us do that the browser could not

The prototype was built inside one web page. Many of its choices were workarounds for that, not design decisions. This file says where those limits were and what to do with the freedom of a real engine.

**The guardrail:** use this freedom on how the game looks, sounds, moves and runs. Do not use it to change how the game plays. Rules, numbers, timing, controls, wording and camera framing stay as the prototype has them until the owner says otherwise. When an improvement would change feel even slightly (a smoother blend that shifts when the bat arrives, a camera that eases where the prototype cuts), show the owner both and let him pick.

Propose before you build anything large. One line: what, why it is better, what it costs in time and frame rate.

## Animation (the biggest win)

**The browser limit:** one clip played at a time, with code sliding and turning the body. No blending between clips, no foot planting, no hands reaching to a target. The crow hop is a body bobbing; the ball in the pitcher's hand is pinned near a wrist; the throw is one overhand clip turned 33° to point at the base.

**In Unity:**
- Blend between clips so a fielder flows from fielding into a shuffle into a throw, and a hitter from stance to swing to follow-through, without pops.
- Blend by direction and distance: one throw that adapts to a short flip or a long outfield throw; a run that leans into turns.
- Reach hands and feet to targets: the glove actually meets the ball on a dive, a wall leap or a stretch at the bag; the ball sits in the pitcher's fingers; feet stay planted.
- Aim the upper body: shoulders and head track the base being thrown to and the ball in flight.
- Retarget one captured clip across every body, so new characters cost nothing in animation.
- Layer reactions: a flinch on a close pitch, a head turn to watch a homer, a stagger when plunked, on top of whatever else is playing.
- Root motion from the clips themselves instead of code-driven sliding.

Keep the timings the events depend on (when the ball leaves the hand, when the glove closes) at the prototype's values; make everything between them look better.

## Cameras

**The browser limit:** every camera is a hand-written position each frame. Cuts are instant; moves are simple lerps; there is no depth of field and no per-shot lens.

**In Unity** (Cinemachine is already installed):
- Author each shot once as a virtual camera and blend or cut between them; the home-run cameras (chase, blimp, aerial show, admire), the behind-the-thrower event shot and the play at the bag become reusable shots.
- Proper follow and framing: keep the ball and the fielder both in frame on a chase; never let a wall or the stands come between camera and subject.
- Impact: a short camera shake and a field-of-view kick on contact and on a perfect release already exist as numbers; give them real noise profiles.
- Depth of field and a slight slow-motion on the freeze-frame of an event, so the "climax" moment the owner wants reads instantly.
- Replays: because a flight is fully decided at contact, a homer or a great catch can be replayed from a second angle for free. Skippable, and only if it does not hurt pace.

Camera positions and the default STRIKE ZONE batting view are requirements; see `LOOK.md`.

## The ball and effects

**The browser limit:** a few thousand camera-facing particles shared by everything, drawn one way.

**In Unity:**
- A proper trail: a thin tapering ribbon for smoke and a separate flame for hard contact and Juice, each pitch type's signature (zig-zag, corkscrew, double helix) as its own effect. The ball stays the clearest thing on screen.
- Contact: sparks, a shock ring and a dust kick sized by contact quality; a distinct look for PERFECT, for Juice and for Overdrive.
- Real seams and spin on the ball so pitch types can be read by rotation.
- Ground effects: dust where a ball lands or a fielder dives, scuff marks, a skid on a slide.
- Fireworks, lasers and the scoreboard power surge as authored sequences instead of timers.
- Lava in the cove that glows, bubbles and splashes when a ball goes in.

## The ballpark and lighting

**The browser limit:** flat, mostly unlit materials with painted-on textures; fans are colored boxes; no real shadows on a phone; the look had to hold at a reduced resolution.

**In Unity (URP):**
- Baked lighting for the stadium so it looks lit at night for almost no frame cost; real light from the four towers; the batter's eye, scoreboard and ribbon boards as emissive surfaces that light their surroundings.
- One dynamic shadow under each player and the ball (the ball's shadow matters for reading fly balls).
- A crowd that reacts: thousands of instanced fans that stand, wave and jump with the game's excitement value, at almost no cost.
- A sharper Moon surface with normal-mapped craters; a proper sky with the Earth and stars.
- Video-style scoreboard and ribbon board content driven by game state (they already show the right text; make them feel alive).
- Light post-processing: bloom on the neon and the flame, a touch of color grading. Keep it subtle on the phone and measure the cost.

The layout and dimensions of the park are requirements; see `LOOK.md` and `BALL_FLIGHT.md`.

## Characters

**The browser limit:** every body is a download of a few megabytes built at run time; only one hitter body is loaded at a time and it swaps between at-bats; memory was the reason for late-game crashes on iPhone.

**In Unity:**
- All bodies ready at once with shared skeletons, compressed textures and levels of detail, so the box is never empty and nobody pops in.
- Real faces, uniforms and team colors per player; gloves and bats as proper attachments.
- Player cards generated from the same models, which supports the card and pack ideas if the owner goes that way.

## Controls and feel

**The browser limit:** touch input arrives through the browser a frame or two late; vibration is unavailable in iOS browsers; the game could not hold a steady frame rate on a 120 Hz iPhone.

**In Unity:**
- Native touch with lower latency. Re-check the timing windows by feel on a phone once they are ported; the numbers were tuned through the browser's delay, so a perfect swing may land slightly differently. If it does, tell the owner; do not quietly retune.
- Real haptics: a sharp tap on contact scaled by quality, a heavier thud for a homer, a light tick as the timing ring closes, a buzz on a missed event. The prototype already calls for vibration at every one of these moments (search `buzz(` in the code); on iPhone it never fired.
- Controller support on PC and, later, on phone.
- A steady frame rate. Decide 60 or 120 on purpose and hold it.

## Sound

**The browser limit:** a handful of recorded clips (placeholders, not cleared for release) plus tones synthesized on the fly; no mixing, no positioning.

**In Unity:**
- Replace every recorded sound with owned or licensed audio (see the sound audit in the private owner record).
- A mixer with ducking, so the crack of the bat and the umpire cut through the crowd.
- A crowd that swells with the excitement value the game already tracks, layered instead of one loop.
- Positioned sound: the pop of the mitt at the plate, a ball off the wall out in left.
- Room for commentary lines in the spirit of the old broadcasts, if the owner wants them.

## Screens and menus

**The browser limit:** everything is one web page; menus are stacked overlays; text is drawn by the browser.

**In Unity:**
- Screens that transition instead of appearing; cards that flip; rewards that animate in.
- Safe-area handling for every iPhone, and layouts that adapt between portrait phone and wide PC from one design.
- Crisp text at any size. Keep the fonts (Russo One, Saira Condensed), the colors and the exact wording.
- The rule stands: text never covers a player or a control.

## Things that were impossible and are now just work

- **Saves that last** and follow the player across devices.
- **Accounts, a server, leaderboards, the invite rewards made real.**
- **Head-to-head and ranked play.** Flights and events are decided from inputs and a seed, which is a good base for it.
- **Purchases and optional rewarded ads,** within the lines in the strategy doc.
- **Notifications** for the daily streak.
- **Offline play** with everything bundled: no downloads mid-game.
- **Crash and performance reporting** from real devices, replacing the prototype's home-made report.

## Engineering habits Unity makes easy (use them)

- Keep the shared core free of scene code, as the hitting port already does, with luck passed in. That keeps it testable and is what makes replays and online play possible later.
- Put every tuned number in data assets the owner can read, not scattered through code.
- Tests that run the prototype's recorded cases (`data/flight_cases.json`) on every change.
- Pool the ball, effects and callouts; load art on demand; measure on the phone before and after anything visual.

## How to bring an idea to the owner

1. Say what it is in one plain sentence.
2. Show it next to the prototype's version (a picture or a short clip).
3. Say what it costs: time, and frame rate on the phone.
4. Say whether it changes feel. If it might, default to the prototype's behavior and offer the new one as an option.

He wants the game to look and move far better than the prototype. He does not want to re-tune what he already tuned.
