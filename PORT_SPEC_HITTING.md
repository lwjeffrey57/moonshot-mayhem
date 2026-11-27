# Hitting: what the player sees and does (port spec)

Written by the web-build session, which holds the owner's playtest feedback. The Unity build must match this, not approximate it. Where this file and `index.html` disagree, `index.html` wins: say so and ask.

Anything marked **(verify)** names where to read the exact value in `index.html`.

## Controls: PC

| Input | Action |
|---|---|
| Mouse move | Aim. The ring follows the pointer. |
| **Left click** | **POWER swing** |
| **Right click** | **CONTACT swing** (the browser menu is suppressed) |
| Space, Z or J | CONTACT swing |
| X or K | POWER swing |
| Shift (either) | Juice on/off; switches Overdrive on when it is ready |
| C | Next camera |
| Esc or P | Pause |
| Enter | Start from the title or game-over screen |
| G / Enter | GO on a baserunning offer |
| N / Esc | STAY on a baserunning offer |
| T | Call a steal, when one is on offer |
| Arrow keys or W A S D | Event (QTE) arrows; Space for a mash or stop-the-needle event |

There is no F key. Mouse sensitivity is a setting with six steps: 1, 1.2, 1.4, 1.7, 2, 2.4 (default the third). While batting the system pointer is hidden so there is one aiming mark, not two.

## Controls: phone (the lead device)

- Left thumb: an AIM stick, bottom-left. The ring springs back toward center when released **(verify: aim spring, about .72 over 80 ms)**.
- Right thumb: a large red **POWER** button bottom-right, a smaller green **CONTACT** button to its left, and a **JUICE** button above them showing the bars in hand.
- A touch that is not on the stick never moves or resets the aim.
- Nothing may sit under either thumb except these controls.

## What is on screen while batting

- The strike zone outline at the plate.
- The bat ring: a green CONTACT circle with a red POWER core inside it. Both move together with the aim. Their sizes come from the hitter's contact rating, the swing type, Juice, Overdrive, how far the pitch is off the plate, difficulty, and perks **(verify: `R=` in `tryContact`)**.
- A center marker inside the ring: none, dot, crosshair or small ring (a setting). Default on touch screens is the crosshair.
- The incoming ball, with a thin trail.
- A "rings off" setting hides the circles and leaves only the center marker; the zones still decide every swing.

## Feedback: every swing

Shown after contact, in a small panel (PC: left side; phone: placed so it never covers the hitter or the buttons):

- A one-word grade, exit velocity, launch angle, and the timing word.
- The contact word: SQUARED UP, GOOD WOOD, **CUE SHOT** (not "CUED IT"), BACKSPUN IT, TOPSPUN IT, GOT UNDER IT, TOPPED IT, OFF THE END, JAMMED. Jammed always means late and off the end always means early, so the word never contradicts the timing.
- A timing bar with a marker showing early or late.
- A small picture of where the barrel met the ball.
- The pitch name and speed.

## Feedback: swing and miss (owner's rules, all required)

1. **Every miss freezes the ring where the player had it** and marks where the ball actually crossed, for about 1.9 s. The player's center marker is shown at the middle of that frozen ring (the crosshair if they play with none).
2. The reason is said in words:
   - Ring was on the ball but the timing was off: **TOO EARLY!** or **TOO LATE!**, larger and in gold.
   - Timing off and ring off the ball: WAY EARLY / WAY LATE.
   - Timing fine, ring off the ball: BALL OUTSIDE THE GREEN RING (or RED CORE on a power swing).
3. The next pitch waits for that replay to finish.

## Feedback: taking a pitch

- A ball marker stays where the pitch crossed, with its speed and name beside it, for about 1.7 s. The zone outline stays up with it.

## Rules the owner tuned by hand (do not change)

- **A swing is never ignored.** A tap between pitches is a free practice cut. A tap up to 1.3 s after the ball is in the mitt still swings the bat and says WAY LATE. This includes strike three and ball four. It must never delay the next pitch.
- The swing connects .07 s after the tap.
- A hitter in Overdrive cannot be hit by a pitch.
- A late or early swing sends the ball to the opposite or pull field; inside pitches are pulled, outside ones go the other way **(verify: `phi=`)**.
- A well-struck ball headed for the corner side reaches the foul line about one time in five. Not in the Gauntlet.
- Hard-hit balls toward the tall walls in left and right sometimes become liners off the wall, at varying heights.
- Juice: a Juice swing costs one bar, hit or miss. A hit earns a bar, a homer two. A full meter becomes Overdrive.
- On ball four the batter leaves the box at once; only the runner going to first is shown.

## Not yet matched in Unity (as of its first hitting report)

- Mouse buttons are reversed and an F key was added. Fix both.
- Timing bar, contact picture, miss replay, TOO EARLY/TOO LATE, late-swing rule, pitch marker: confirm each or list it as not done.
