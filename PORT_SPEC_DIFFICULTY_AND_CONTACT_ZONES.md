# Difficulty tiers and how the contact zones work (port spec)

The owner asked that this be understood exactly, because it is the heart of how hitting plays. The numbers are from `tryContact()`, `DIFF`, `DFX()`, `SQR`, `PFT` and `easyAB` in `index.html`. Where this file and the code disagree, the code wins.

## The idea in the owner's words

Firm contact can be made **as long as the ball is inside the contact zone for the swing you chose and you time it up well.** The **best** contact comes from hitting it **"middle-middle": the middle of the crosshair on the ball, in the middle of the red power circle,** on time.

So there are two separate questions on every swing, and both must be answered well:
1. **Where:** was the ball inside the zone, and how close to its center?
2. **When:** how close to the perfect moment was the swing?

## The two zones

The bat ring the player moves is two circles with one center:

- **The green CONTACT ring** (outer, large). It is the zone for a **CONTACT** swing.
- **The red POWER core** (inner, small). It is the zone for a **POWER** swing.

**Each swing uses only its own zone.** A contact swing needs the ball inside the green ring. A power swing needs the ball inside the red core; being inside the green but outside the red is a miss on a power swing ("BALL OUTSIDE THE RED CORE").

What each swing trades:

| | CONTACT swing | POWER swing |
|---|---|---|
| Zone | Green ring: radius 0.17 m × 1.25 at Pro | Red core: radius 0.17 m × 0.63 at Pro (about half) |
| Timing window | × 1.2 (forgiving) | × 0.85 (tight) |
| Base exit speed | 37 m/s | 47 m/s |
| Base launch angle | 11° (line drives, grounders) | 25° (in the air) |
| What it is for | Putting it in play, two-strike hitting, moving runners | Driving it, home runs |

## Inside the zone: three bands

Let `d` be the distance from the ring's center to the ball, and `R` the radius of the zone for the swing used.

| Where the ball is | Result |
|---|---|
| `d ≤ R` | **Contact.** Aim quality = `1 − 0.6 × (d/R)²`: 1.00 dead center, 0.95 at 30% out, 0.85 halfway, 0.71 at 70%, 0.40 at the edge. |
| `R < d ≤ 1.3 R` | **Tipped.** Aim quality drops to 0.15 and the ball sprays up to ±50°. Foul tips, weak contact, the occasional bloop. |
| `d > 1.3 R` | **Miss.** The frozen ring and the ball marker show why. |

So contact anywhere in the zone is real contact, and it gets steadily better toward the middle. That is the "firm contact as long as it is in the zone" rule.

## Timing

Timing is measured in window units (`n`): 0 is perfect, negative early, positive late.

- Timing quality = `1 − 0.75 × |n|^1.6`: 1.00 perfect, 0.93 at 0.22, 0.79 at 0.45, 0.58 at 0.7, 0.25 at 1.0.
- Contact is still possible out to `|n| = 1.4`; beyond that it is a miss on timing (TOO EARLY! / TOO LATE! if the ring was on the ball).
- Early pulls the ball, late sends it the other way (36° per unit).

## Quality, and what it buys

**Contact quality `q` = timing quality × aim quality × (1 − 0.8 × chase).**

- Exit speed scales from 50% to 100% of the swing's base with `q`.
- The grade pill: under .35 WEAK, under .6 OKAY, under .85 SOLID, above BARRELED.
- The freeze, shake, lens kick, flash, sparks, the crack of the bat and the crowd all scale with `q`.

## Middle-middle: squared up and PERFECT

- **SQUARED UP** = the ball within the inner **30% of the radius of the zone for the swing used** (× the tier's `mid`): the red core's radius on a power swing, the green ring's on a contact swing.
- **On time** = `|n|` within **0.22** (× the tier's `mid`).
- **PERFECT** = on time AND squared up AND not chasing AND quality above .8. It gets the gold PERFECT! call and the rocket on the timing bar.
- **The crosshair stands for middle-middle, approximately.** Correction (28 Nov, found by the Unity session): squared-up is 30% of the radius of the zone for the swing used, so at Pro it is a circle 6.4 cm across on a power swing and 12.8 cm across on a contact swing, while the crosshair is drawn one size, 7.5 cm across at Pro, shrinking with the tier's `mid`. So the crosshair is a close guide to the power swing's squared-up circle, not an exact outline of either. **Ruling: copy the prototype's numbers exactly (judged sizes and the drawn 7.5 cm). Do not resize the crosshair.** Whether to draw it at exactly the power swing's 6.4 cm is the owner's call and has been put to him.
- A barreled power swing in this band is where the special balls come from: the crushed callouts, tape-measure shots and the show shots.

This is why the owner says the best contact is the middle of the crosshair in the middle of the red circle: on a power swing, dead center of the red core is maximum aim quality in the high-exit-speed swing.

## What changes the size of the zones

Zone radius = `0.17 m × hitter's contact rating × swing factor × Juice factor × (1 − 0.3 × chase) × tier ring × easy-at-bat × perks`.

- **Swing factor:** contact 1.25; power 0.63 (0.8 with Juice).
- **Juice:** × 1.2. **Overdrive:** contact × 1.55, power × 1.85 (the red core grows most; it used to be bigger still and "swallowed the whole strike zone").
- **Chasing** a pitch off the plate shrinks the zone by up to 30% and cuts quality and exit speed.
- **The hitter's contact rating** scales it directly (about 0.85 to 1.15).
- **Perks:** Razor's ring is 15% bigger with two strikes; Vrel's sweet spot is 18% bigger low and 12% smaller up; Xenon's is 22% bigger on pitches out of the zone; plus each hitter's second and third perks (`PERKS`, `PERKS2`, `PERKS3`).

The timing window = `0.118 s × (power 0.85 | contact 1.2) × (Juice 1.35 | Overdrive 1.85) × tier ring × easy-at-bat × (0.52 against a Juice pitch, 0.8 in Overdrive)`.

## The seven difficulty tiers

**PRO is the default** and is "the game as it has always been". The setting is on the title screen and in the pause settings, and it is remembered.

Each tier changes four things: `ring` (zone size and timing window together), `dur` (pitch flight time), `mid` (how small middle-middle is), `brk` (how much everything breaks).

| Tier | Contact ring | Power core | Contact + Juice | Power + Juice | Contact Overdrive | Power Overdrive | Middle-middle (of the ring) | Perfect timing | Fastball | Break |
|---|---|---|---|---|---|---|---|---|---|---|
| ROOKIE | 25.1 cm | 12.6 cm | 30.1 cm | 19.3 cm | 38.9 cm | 29.7 cm | inner 41% | within 0.297 units | 0.70 s | ×1 |
| PRO (default) | 21.3 cm | 10.7 cm | 25.5 cm | 16.3 cm | 32.9 cm | 25.2 cm | inner 30% | within 0.220 units | 0.64 s | ×1 |
| ALL-STAR | 17.0 cm | 8.6 cm | 20.4 cm | 13.1 cm | 26.4 cm | 20.1 cm | inner 20% | within 0.143 units | 0.58 s | ×1.08 |
| LEGEND | 14.0 cm | 7.1 cm | 16.8 cm | 10.8 cm | 21.7 cm | 16.6 cm | inner 15% | within 0.110 units | 0.54 s | ×1.2 |
| MOONSHOT | 11.5 cm | 5.8 cm | 13.8 cm | 8.8 cm | 17.8 cm | 13.6 cm | inner 11% | within 0.084 units | 0.50 s | ×1.32 |
| GALACTIC | 9.6 cm | 4.8 cm | 11.5 cm | 7.3 cm | 14.8 cm | 11.3 cm | inner 9% | within 0.066 units | 0.46 s | ×1.45 |
| INTERGALACTIC | 8.1 cm | 4.1 cm | 9.7 cm | 6.2 cm | 12.5 cm | 9.6 cm | inner 7% | within 0.053 units | 0.43 s | ×1.58 |

(Radii are for an average hitter, contact rating 1.0, on a pitch in the zone. Timing windows per tier in milliseconds are in `port/TIMING.md`.)

- **ROOKIE:** bigger rings, a wider timing window, slower pitches, a larger middle-middle.
- **ALL-STAR and up** add break.
- **MOONSHOT** "is meant to be beaten by very few." **GALACTIC** and **INTERGALACTIC** go past it.
- The pitch-location baseball in the timing circle is also drawn smaller on harder tiers, in step with the smaller target.

## Difficulty that moves during a game

- **A big inning gets harder to keep going.** Once the Comets have four runs in an inning the pitching bears down, more with every run after that (up to six steps): zones and timing window × `max(0.62, 1 − 0.065 h)`, pitch time × `max(0.8, 1 − 0.032 h)`, middle-middle × `max(0.55, 1 − 0.075 h)`, break × `(1 + 0.05 h)`. That inning only. "Hits in a rout stay earned, and the inning ends."
- **The first at-bat is easy for a new player:** the leadoff hitter of the first inning in a player's first three games gets zones and timing × 1.3.
- **Pitches get quicker by inning:** × 0.93 in the 2nd, × 0.86 in the 3rd.
- **In the Gauntlet** the same ramp is driven by the round number.
- None of the in-game ramp applies while the player is pitching.

## A "rings off" setting

The player can hide both circles and play with only the center marker. The zones still decide every swing, and the miss replay still shows them.

## What the Unity build has (as of `bb3f3d6`, from its own notes)

- All seven tiers with PRO as the default, the zone and window formulas, the three bands, quality, squared-up and perfect: **ported and tested.**
- **Not ported yet:** the big-inning ramp, the easy first at-bat, the Gauntlet ramp. Port them with the rest of the hitting loop.
- **Check on the device:** that the drawn green ring and red core are exactly the radii above for the current hitter, swing type, Juice state and tier, and that the crosshair is exactly middle-middle. If the drawn zone and the judged zone ever differ, the game feels unfair, which is the owner's hardest rule.

## Tests to keep

- A power swing with the ball inside the green ring but outside the red core is a miss.
- Aim quality at d/R = 0, 0.5 and 1.0 is 1.00, 0.85 and 0.40; tipped beyond R; miss beyond 1.3 R.
- Squared-up radius and perfect-timing width for every tier.
- Zone radius for contact, power, Juice and Overdrive at every tier (the table above).
- The ramp at 4, 6 and 9 runs in an inning; the easy first at-bat.
