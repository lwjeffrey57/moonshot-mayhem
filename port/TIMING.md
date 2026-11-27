# Timing: how long everything takes, and what changes it

The owner's feel for this game is a feel for time: how long a fastball takes, how long he has to decide, how long a ball hangs before it is gone. These are the prototype's real numbers. The tables are computed from its code and from its own flight simulation, not estimated. Where a value is marked **(read code)** the exact expression is in the function named.

Pace of play is a standing rule: nothing below may get longer in Unity without the owner agreeing, and every wait must stay skippable.

## Pitches thrown at you: time from release to the plate

Base seconds for each pitch (`dur` in the PITCHES table), and what that is at each difficulty tier in the first inning. The speed shown on screen is a display number: `round(18.4 / seconds × 2.237 × 1.52)`; it reads like real-world mph but is about 1.5× the literal speed over 18.4 m.

| Pitch | Juice/OD | Base s | ROOKIE | PRO | ALL-STAR | LEGEND | MOONSHOT | GALACTIC | INTERGALACTIC |
|---|---|---|---|---|---|---|---|---|---|
| FASTBALL |  | 0.64 | 0.70 s (89) | 0.64 s (98) | 0.58 s (109) | 0.54 s (116) | 0.50 s (125) | 0.46 s (136) | 0.43 s (146) |
| CURVEBALL |  | 0.86 | 0.95 s (66) | 0.86 s (73) | 0.77 s (81) | 0.72 s (87) | 0.67 s (93) | 0.62 s (101) | 0.58 s (109) |
| SLIDER |  | 0.74 | 0.81 s (77) | 0.74 s (85) | 0.67 s (94) | 0.62 s (101) | 0.58 s (108) | 0.53 s (117) | 0.50 s (126) |
| CHANGEUP |  | 0.95 | 1.04 s (60) | 0.95 s (66) | 0.85 s (73) | 0.80 s (78) | 0.74 s (84) | 0.68 s (91) | 0.64 s (98) |
| SCREWBALL |  | 0.8 | 0.88 s (71) | 0.80 s (78) | 0.72 s (87) | 0.67 s (93) | 0.62 s (100) | 0.58 s (109) | 0.54 s (117) |
| METEOR | Juice | 0.5 | 0.55 s (114) | 0.50 s (125) | 0.45 s (139) | 0.42 s (149) | 0.39 s (160) | 0.36 s (174) | 0.34 s (187) |
| ZIG-ZAG | Juice | 0.92 | 1.01 s (62) | 0.92 s (68) | 0.83 s (76) | 0.77 s (81) | 0.72 s (87) | 0.66 s (94) | 0.62 s (101) |
| CORKSCREW | Juice | 0.9 | 0.99 s (63) | 0.90 s (70) | 0.81 s (77) | 0.76 s (83) | 0.70 s (89) | 0.65 s (97) | 0.60 s (104) |
| FREEZE FRAME | Juice | 0.9 | 0.99 s (63) | 0.90 s (70) | 0.81 s (77) | 0.76 s (83) | 0.70 s (89) | 0.65 s (97) | 0.60 s (104) |
| DOUBLE TROUBLE | Juice | 0.8 | 0.88 s (71) | 0.80 s (78) | 0.72 s (87) | 0.67 s (93) | 0.62 s (100) | 0.58 s (109) | 0.54 s (117) |
| RISER | Juice | 0.62 | 0.68 s (92) | 0.62 s (101) | 0.56 s (112) | 0.52 s (120) | 0.48 s (129) | 0.45 s (140) | 0.42 s (151) |
| GEAR SHIFT | Juice | 0.92 | 1.01 s (62) | 0.92 s (68) | 0.83 s (76) | 0.77 s (81) | 0.72 s (87) | 0.66 s (94) | 0.62 s (101) |
| BOOMERANG | Juice | 0.95 | 1.04 s (60) | 0.95 s (66) | 0.85 s (73) | 0.80 s (78) | 0.74 s (84) | 0.68 s (91) | 0.64 s (98) |
| KNUCKLER | Juice | 0.98 | 1.08 s (58) | 0.98 s (64) | 0.88 s (71) | 0.82 s (76) | 0.76 s (82) | 0.71 s (89) | 0.66 s (95) |
| SKY DROP | Juice | 1.08 | 1.19 s (53) | 1.08 s (58) | 0.97 s (64) | 0.91 s (69) | 0.84 s (74) | 0.78 s (80) | 0.72 s (86) |
| SUPERNOVA | Overdrive | 0.44 | 0.48 s (129) | 0.44 s (142) | 0.40 s (158) | 0.37 s (169) | 0.34 s (182) | 0.32 s (197) | 0.29 s (212) |
| GHOST BALL | Overdrive | 0.82 | 0.90 s (69) | 0.82 s (76) | 0.74 s (85) | 0.69 s (91) | 0.64 s (98) | 0.59 s (106) | 0.55 s (114) |
| BLACK HOLE | Overdrive | 0.98 | 1.08 s (58) | 0.98 s (64) | 0.88 s (71) | 0.82 s (76) | 0.76 s (82) | 0.71 s (89) | 0.66 s (95) |
| SINKER |  | 0.67 | 0.74 s (85) | 0.67 s (93) | 0.60 s (104) | 0.56 s (111) | 0.52 s (120) | 0.48 s (130) | 0.45 s (139) |
| CUTTER |  | 0.68 | 0.75 s (84) | 0.68 s (92) | 0.61 s (102) | 0.57 s (110) | 0.53 s (118) | 0.49 s (128) | 0.46 s (137) |
| SPLITTER |  | 0.76 | 0.84 s (75) | 0.76 s (82) | 0.68 s (91) | 0.64 s (98) | 0.59 s (106) | 0.55 s (114) | 0.51 s (123) |
| SWEEPER |  | 0.8 | 0.88 s (71) | 0.80 s (78) | 0.72 s (87) | 0.67 s (93) | 0.62 s (100) | 0.58 s (109) | 0.54 s (117) |
| KNUCKLE CURVE |  | 0.82 | 0.90 s (69) | 0.82 s (76) | 0.74 s (85) | 0.69 s (91) | 0.64 s (98) | 0.59 s (106) | 0.55 s (114) |
| EEPHUS |  | 1.22 | 1.34 s (47) | 1.22 s (51) | 1.10 s (57) | 1.02 s (61) | 0.95 s (66) | 0.88 s (71) | 0.82 s (77) |

What changes it, multiplied together:
- **Difficulty** (the table above): ROOKIE ×1.10 slower … INTERGALACTIC ×0.67.
- **Inning:** ×1.00 in the 1st, ×0.93 in the 2nd, ×0.86 in the 3rd. Everything gets quicker as the game goes on.
- **The pitcher's own speed factor** (`sp` in `choosePitch`: his heat and Overdrive).
- **Luck:** a few percent either way per pitch.
- A pitch's shape (`arc`, `brk`, wobble, warp) changes its path, and for FREEZE FRAME and GEAR SHIFT its pacing along the path, but not its total time.

## The swing: how big the timing window is

Window in milliseconds either side of perfect that still counts as "1.0 timing unit" (contact is possible out to 1.4 units; perfect is inside 0.22 × the tier's `mid`). Base .118 s × (power .85, contact 1.2) × Juice 1.35 or Overdrive 1.85 × the tier's ring × (against a Juice pitch .52, or .8 in Overdrive).

| Tier | Contact | Power | Contact+Juice | Power+Juice | Contact OD | Power OD |
|---|---|---|---|---|---|---|
| ROOKIE | ±167 | ±118 | ±226 | ±160 | ±309 | ±219 |
| PRO | ±142 | ±100 | ±191 | ±135 | ±262 | ±186 |
| ALL-STAR | ±113 | ±80 | ±153 | ±108 | ±210 | ±148 |
| LEGEND | ±93 | ±66 | ±126 | ±89 | ±173 | ±122 |
| MOONSHOT | ±76 | ±54 | ±103 | ±73 | ±141 | ±100 |
| GALACTIC | ±64 | ±45 | ±86 | ±61 | ±118 | ±83 |
| INTERGALACTIC | ±54 | ±38 | ±73 | ±51 | ±100 | ±71 |
## Batted balls: how long things take

Computed by the prototype (`data/flight_cases.json`), no spin, hit from the plate. Exit speed in m/s (mph = ×2.237). "HR over at" is the moment it clears the wall, with the distance called; "off the wall at" is a ball that reaches the wall on the fly; otherwise where and when it first comes down, and when it then rolls to the wall if it does.

### Dead center (400 ft, standard 3.4 m wall)

| Exit speed | Launch 10° | Launch 20° | Launch 30° | Launch 40° |
|---|---|---|---|---|
| 26 m/s (58 mph) | lands 1.1 s, 85 ft | lands 1.9 s, 136 ft | lands 2.6 s, 171 ft | lands 3.3 s, 187 ft |
| 30 m/s (67 mph) | lands 1.2 s, 108 ft | lands 2.1 s, 173 ft | lands 3.0 s, 217 ft | lands 3.7 s, 236 ft |
| 34 m/s (76 mph) | lands 1.3 s, 132 ft | lands 2.3 s, 212 ft | lands 3.3 s, 264 ft | lands 4.1 s, 286 ft |
| 38 m/s (85 mph) | lands 1.4 s, 159 ft | lands 2.6 s, 253 ft | lands 3.6 s, 312 ft; rolls to the wall at 5.3 s | lands 4.5 s, 336 ft; rolls to the wall at 6.0 s |
| 42 m/s (94 mph) | lands 1.6 s, 186 ft | lands 2.8 s, 295 ft; rolls to the wall at 4.6 s | lands 3.9 s, 361 ft; rolls to the wall at 4.6 s | lands 4.9 s, 387 ft; rolls to the wall at 5.2 s |
| 46 m/s (103 mph) | lands 1.7 s, 215 ft | lands 3.0 s, 338 ft; rolls to the wall at 3.9 s | off the wall at 4.1 s | **HR** over at 4.7 s, 437 ft |
| 50 m/s (112 mph) | lands 1.8 s, 244 ft; rolls to the wall at 4.1 s | lands 3.2 s, 381 ft; rolls to the wall at 3.5 s | **HR** over at 3.8 s, 459 ft | **HR** over at 4.3 s, 485 ft |
| 54 m/s (121 mph) | lands 1.9 s, 275 ft; rolls to the wall at 3.4 s | **HR** over at 3.2 s, 412 ft | **HR** over at 3.5 s, 506 ft | **HR** over at 4.0 s, 508 ft |
| 58 m/s (130 mph) | lands 2.0 s, 305 ft; rolls to the wall at 3.0 s | **HR** over at 3.0 s, 466 ft | **HR** over at 3.3 s, 509 ft | **HR** over at 3.8 s, 541 ft |
| 62 m/s (139 mph) | lands 2.1 s, 337 ft; rolls to the wall at 2.8 s | **HR** over at 2.8 s, 508 ft | **HR** over at 3.0 s, 537 ft | **HR** over at 3.5 s, 623 ft |

### Left field, 30° (toward the Porch, 11.6 m wall)

| Exit speed | Launch 10° | Launch 20° | Launch 30° | Launch 40° |
|---|---|---|---|---|
| 26 m/s (58 mph) | lands 1.1 s, 85 ft | lands 1.9 s, 136 ft | lands 2.6 s, 171 ft | lands 3.3 s, 187 ft |
| 30 m/s (67 mph) | lands 1.2 s, 108 ft | lands 2.1 s, 173 ft | lands 3.0 s, 217 ft | lands 3.7 s, 236 ft |
| 34 m/s (76 mph) | lands 1.3 s, 132 ft | lands 2.3 s, 212 ft | lands 3.3 s, 264 ft; rolls to the wall at 5.5 s | lands 4.1 s, 286 ft; rolls to the wall at 6.0 s |
| 38 m/s (85 mph) | lands 1.4 s, 159 ft | lands 2.6 s, 253 ft; rolls to the wall at 4.7 s | lands 3.6 s, 312 ft; rolls to the wall at 4.5 s | lands 4.5 s, 336 ft; rolls to the wall at 5.1 s |
| 42 m/s (94 mph) | lands 1.6 s, 186 ft | lands 2.8 s, 295 ft; rolls to the wall at 3.8 s | lands 3.9 s, 361 ft; rolls to the wall at 3.9 s | off the wall at 4.5 s |
| 46 m/s (103 mph) | lands 1.7 s, 215 ft; rolls to the wall at 4.0 s | lands 3.0 s, 338 ft; rolls to the wall at 3.4 s | off the wall at 3.6 s | **HR** over at 4.1 s, 426 ft |
| 50 m/s (112 mph) | lands 1.8 s, 244 ft; rolls to the wall at 3.3 s | off the wall at 3.0 s | **HR** over at 3.3 s, 435 ft | **HR** over at 3.8 s, 461 ft |
| 54 m/s (121 mph) | lands 1.9 s, 275 ft; rolls to the wall at 2.9 s | off the wall at 2.8 s | **HR** over at 3.1 s, 464 ft | **HR** over at 3.5 s, 495 ft |
| 58 m/s (130 mph) | lands 2.0 s, 305 ft; rolls to the wall at 2.6 s | **HR** over at 2.6 s, 430 ft | **HR** over at 2.9 s, 492 ft | **HR** over at 3.3 s, 579 ft |
| 62 m/s (139 mph) | lands 2.1 s, 337 ft; rolls to the wall at 2.4 s | **HR** over at 2.4 s, 449 ft | **HR** over at 2.7 s, 597 ft | **HR** over at 3.1 s, 623 ft |

### Right field, 30° (toward the Arcade, 8.6 m wall, and the cove)

| Exit speed | Launch 10° | Launch 20° | Launch 30° | Launch 40° |
|---|---|---|---|---|
| 26 m/s (58 mph) | lands 1.1 s, 85 ft | lands 1.9 s, 136 ft | lands 2.6 s, 171 ft | lands 3.3 s, 187 ft |
| 30 m/s (67 mph) | lands 1.2 s, 108 ft | lands 2.1 s, 173 ft | lands 3.0 s, 217 ft | lands 3.7 s, 236 ft |
| 34 m/s (76 mph) | lands 1.3 s, 132 ft | lands 2.3 s, 212 ft | lands 3.3 s, 264 ft; rolls to the wall at 4.9 s | lands 4.1 s, 286 ft; rolls to the wall at 5.5 s |
| 38 m/s (85 mph) | lands 1.4 s, 159 ft | lands 2.6 s, 253 ft; rolls to the wall at 4.1 s | lands 3.6 s, 312 ft; rolls to the wall at 4.2 s | lands 4.5 s, 336 ft; rolls to the wall at 4.7 s |
| 42 m/s (94 mph) | lands 1.6 s, 186 ft; rolls to the wall at 4.7 s | lands 2.8 s, 295 ft; rolls to the wall at 3.5 s | off the wall at 3.7 s | **HR** over at 4.2 s, 377 ft |
| 46 m/s (103 mph) | lands 1.7 s, 215 ft; rolls to the wall at 3.8 s | lands 3.0 s, 338 ft; rolls to the wall at 3.1 s | **HR** over at 3.4 s, 388 ft | **HR** over at 3.9 s, 440 ft |
| 50 m/s (112 mph) | lands 1.8 s, 244 ft; rolls to the wall at 3.0 s | off the wall at 2.8 s | **HR** over at 3.1 s, 447 ft | **HR** over at 3.6 s, 485 ft |
| 54 m/s (121 mph) | lands 1.9 s, 275 ft; rolls to the wall at 2.6 s | **HR** over at 2.6 s, 380 ft | **HR** over at 2.9 s, 506 ft | **HR** over at 3.3 s, 533 ft |
| 58 m/s (130 mph) | lands 2.0 s, 305 ft; rolls to the wall at 2.4 s | **HR** over at 2.4 s, 426 ft | **HR** over at 2.7 s, 552 ft | **HR** over at 3.1 s, 579 ft |
| 62 m/s (139 mph) | lands 2.1 s, 337 ft; rolls to the wall at 2.2 s | **HR** over at 2.3 s, 426 ft | **HR** over at 2.5 s, 597 ft | **HR** over at 2.9 s, 623 ft |

Ground balls and low liners (launch at or below about 5°) reach an infielder about 27–40 m away in roughly 0.7–1.3 s at these speeds; see the cases with launchDeg −15 to 5 in the JSON.

What changes it: exit speed and launch angle most of all; backspin (lift) adds carry and hang time and topspin takes it away; a low-gravity pocket (gravity ×0.55) or a tape-measure shot (×0.8) hangs far longer; the wall is furthest and lowest in center, nearer and much taller in left (the Porch) and right (the Arcade); the right-field wall cuts in along the triples alley.

## The rhythm of an at-bat

| Moment | Time | Notes |
|---|---|---|
| Between pitches, same hitter | about 2.1 s | `PACE.samePitch` |
| Before a new hitter's first pitch | about 2.9 s | `PACE.newBatter`, plus his walk-up |
| "Ready" before the wind-up | 1.15 s | Waits for a practice cut or a miss replay to finish |
| Wind-up | 1.0 s | A swing is live from 0.55 s in; before that a tap is a free practice cut |
| Pitch in flight | 0.34–1.08 s | The table above |
| Timing circle appears | 22% into the flight | 42% for a Juice pitch, so there is less time to read it |
| Bat arrives after the tap | 0.07 s | `SW_T`. The timing circle runs this far ahead so "tap as it closes" is on time |
| Late-swing window | 1.3 s after the ball is caught | The bat still swings and says WAY LATE |
| Miss replay (frozen ring) | 1.9 s | The next pitch waits for it |
| Ball marker after a take | 1.7 s | |
| Freeze on contact | 0.045–0.25 s | Grows with contact quality, power and Juice **(read code: `hitstop`)** |
| Slow motion on a crushed ball | 0.55 s | Power or Juice, quality above 0.7 |
| Walk-up | 3.4 s | Skippable after 0.35 s |
| Strikeout reaction | 3.5 s | Camera on the hitter for 1.6 s, then the pitcher's taunt |
| Home-run trot | 5.85 s | Celebration starts at 3.05 s. A tap ends any homer shot after 0.45 s |
| Aerial show on a homer | held 5.2 s | Skippable |
| Seat hop after a homer lands | up to 0.85 s | |
| Celebration at a base after an extra-base hit | until tapped or it ends | Skippable after 0.25 s |
| Locked In moment | 0.9 s | Not skipped by the tap that cut the homer shot |
| Pitching change | 2.7 s | First tap skips the walk-off, second skips the new arm |

## Hit by pitch and brawls

| Moment | Time |
|---|---|
| Hitter goes down and gets up | about 3.0 s, then the result unless he charges |
| He decides to charge | at 5.0 s |
| The charge to the mound | 1.7 s |
| Each exchange of blows | 1.2 s, three of them |
| Hold on the winner | 2.3 s |

## When you pitch

| Moment | Time | What changes it |
|---|---|---|
| Power meter fills to the top | 0.85 s, then falls for 0.7 s, gives up at 1.15 s | Control: ×1.38 faster at 40 control, ×0.88 at 95+. Green from 80% of the way up |
| Release timing ring closes | about 0.78–0.98 s per pitch type | Control: ×0.72 at 50 control or below, ×1.06 at 95+ |
| Release window | ±20 ms to ±56 ms | Control (curve); Juice ×1.6, Overdrive ×2; stamina narrows it to 60% when gassed |
| Ball leaves the hand | 1.0 s into the delivery | The delivery keeps moving through both taps; no pause at the top |
| Your pitch in flight | base time × 0.8 × speed factor | Speed factor = (1.075 − 0.105 × power) × 0.97 if perfect × (1.526 − 0.62 × velo/100) × (1 + 0.16 × tiredness) × 0.9 for Juice. A meatball is ×1.06 slower |
| Ring lingers after release | 0.75 s | So the grade can be read |
| After the result | 1.25 s (1.9 s if the ring is still up) | Then the next pitch |
| Stamina | drops about 3–6% a pitch | More for hard pitches and Juice; below 45% the arm fades; whoever finishes a half is down to 20% |

## Events (QTEs)

| Moment | Time | Notes |
|---|---|---|
| "He's going!" heads-up | 1.15 s | 1.5 s for a steal against you; none for your own steal |
| Lead-in (runner coming, fielder fields and shuffles or hops) | 1.5 s | Fielding 0.7 s, then the shuffles |
| Time to enter the arrows | (0.38 × number of arrows + 1.0) ÷ difficulty^0.8 seconds | +1.2 s the first time a player ever sees one. A wrong arrow costs 0.3 s |
| Stop-the-needle | 3.6 s | The needle speeds up 13% each time it turns |
| Mash | 3.1 s | The bar leaks, so you cannot stop |
| Throw after the inputs | ball leaves 0.56 s later, cut to the bag 0.34 s after that | |
| At the bag | ball arrives at 0.42 s; scene holds 2.4 s | 3.2 s when you lose it on defense, so the call is read |
| Dive / rob / snag during a live ball | starts 0.55 s before the catch, in slow motion at about 6% speed | 3.2 s to stop the needle, 2.6 s to mash |
| Go or stay offer | 1.7 s (2.6 s the first time) | No answer is a no; then about 1.2 s to watch the throw come in |
| Steal: runner breaks, catcher throws | 1.12 s, then the play at the bag | |

## Fielders and throws

- Throws travel at 42 m/s; a throw is never shown shorter than 0.3 s or longer than 1.3 s.
- The ball leaves the hand 0.77 s after the throw starts (the clip runs at 1.3×, release at 1.0 s of clip time).
- A fielder's range is his reach plus speed × (hang time − reaction time); the pitcher's are 0.6 m, 3.5 m/s and 0.55 s, and each position has its own **(read code: the fielder table)**.
- A homer can only be robbed if it hangs at least 4.2 s and only just clears a reachable wall.
- A wall ball is drawn to the outfielder over the last 0.55 s before he has it.
- Runners: speed scales with the hitter's speed rating (0.75× to 1.2×) **(read code: `updateRunners`)**.

## Why some of these are what they are

- The wind-up is long enough to settle and short enough not to drag; the owner built his timing on it, which is why the first Unity rig (0.55 s) felt wrong.
- The timing circle shows later on a Juice pitch on purpose: less time to read it is the difficulty.
- Lost defensive events hold longer than won ones because the owner found the outcome confusing when it cut away.
- The go/stay window was shortened for pace; a slow decision is treated as "stay".
- Everything a player has already seen is skippable quickly; the things that explain a result (the miss replay, the call at the bag) are not cut short by the game itself.
