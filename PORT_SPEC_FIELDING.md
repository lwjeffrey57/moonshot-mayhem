# Fielding judgment: what happens to a ball in play (port spec)

Written by the web-build session. Scope for this pass: **rules only, no animation.** Who gets to the ball, out or hit, how many bases, and the call. Gray stand-in fielders that move to the ball are enough. The defensive events (QTEs) are out of scope until `PORT_SPEC_EVENTS.md`.

Authority: `judge0()` in `index.html` (readable copy in `port/code/02-ball-flight-and-park.js`). This file is the map and the owner's intent; the code is the numbers. Where they disagree, the code wins: say so.

Read with: `port/05-defense-fielders.md`, `port/02-ball-flight-and-park.md`, `port/TIMING.md`, `port/BALL_FLIGHT.md`, and `FIELD` and `KRAKENS` in `port/data/TABLES.md`.

Coordinates here are the prototype's (center field toward negative z). Flip z for Unity.

## Why this comes before pitching

Without it every fair ball is a hit: no outs, no innings, and the Juice meter overpays. Pitching uses the same judgment for what happens when a hitter puts your pitch in play.

## The principle

**A ball in play is judged once, at contact, from its whole recorded flight.** Nothing is decided while the ball is in the air. The fielders then act out the result. This is what keeps the picture and the call from ever disagreeing, which is one of the owner's hard rules.

## The fielders

Seven position players plus the pitcher. Home spots (x, z): 1B (16, −23), 2B (9, −34), SS (−10, −34), 3B (−16, −23), LF (−36, −71), CF (0, −90), RF (36, −71). Pitcher at (0, −17.2).

Each has three numbers:

| | Speed (m/s) | Reaction (s) | Reach (m) |
|---|---|---|---|
| Infielder | 5.2 × range | 0.32 × jump | 1.0 × √range |
| Outfielder | 5.6 × range | 0.60 × jump | 1.2 × √range |
| Pitcher | 3.5 | 0.55 | 0.6 |

`range` and `jump` are per player in `KRAKENS` (for example Xandu 1.12 and 0.92; Zlorp 0.94 and 1.05), so some fielders really are better than others.

**The one rule of range:** a fielder can reach a point on the ball's path if its distance from his home spot is no more than `reach + speed × (time the ball gets there − his reaction time)`. Everything below is this test applied along the flight, with the adjustments named.

## The order of judgment

1. **Home run.** It is gone, unless it can be robbed: no special tag, not off the batter's eye, cleared the wall by less than 1.5 m, hung at least 4.2 s, the nearest outfielder can cover the ground (10 m plus 1.6 × his speed × the hang time), and a 30% roll. Then it is **ROBBED AT THE WALL**, caught standing 1.6 m in front of the wall.
2. **Ground-rule double.** Two bases. If the nearest outfielder could have been under it, it is charged to him as a **misplay** with an error tag (LOST IT IN THE LIGHTS, MISJUDGED IT, OFF HIS CHEST, CLANKED IT) and he is shown arriving and wearing it: "it reads as a mistake by the fielder and never as the game forgetting to catch it."
3. **Rolled foul short of the bag.** Fair only if an infielder got to it first.
4. **Foul ball.** A foul fly that stays in the park (in front of the backstop, inside the side walls, in the air at least 1.2 s) can be caught for a **FOUL OUT**. Otherwise the nearest man gives it a courtesy run.
5. **Caught in the air.** Walk the flight; the first fielder who can reach a point where the ball is low enough (2.2 m × his scale) has it.
   - **Named by how it came off the bat, not by who caught it:** under 20° launch is a **LINE OUT** wherever it is caught; otherwise **FLY OUT** to an outfielder, **POP OUT** to an infielder, **SNAGGED BY THE PITCHER**.
   - **A ball headed for the wall burns the outfield:** if it will reach the wall on the fly in under 4.2 s nobody catches it, unless a man is camped under it with 0.7 s to spare.
   - **A ball that hangs gets run down:** past 3.2 s an outfielder's range grows, up to 55% more by 4.6 s.
   - **The pitcher only handles what comes straight back at him** (within 1.5 s), and about two times in three it gets through the box.
   - **Now and then a rocket eats an infielder up:** a hard liner right at him (on him within 1.7 s) goes off him 60% of the time and he goes down. **In Overdrive no infielder ever handles one**, and a liner right at an outfielder flattens him too.
   - Once a ball has come off the wall it is a live ball, not a catch.
6. **Ground balls.** The infielder who reaches it fields it, takes a beat to set, and throws to first. **The throw has to beat the runner:** quicker hitters, and left-handed hitters (a step closer), get there sooner. Beaten throw: infield hit.
   - **A routine grounder is not always an out:** about one in twelve (8.5%) the throw sails or pulls the first baseman off the bag: the ball eats him up: it takes a bad hop, he goes down, **ERROR · ATE HIM UP**, and the ball goes on through to whoever is behind him. (Changed 28 Nov: no bad throws and no PULLED HIM OFF THE BAG until a wild throw is properly animated. The owner likes a wild throw as a way to lose a THROW HIM OUT event later, shown as a truly errant throw with the fielder leaping and missing; that needs a capture.)
7. **Hits to the outfield.** **Extra bases are a race** between the runner and the fielder picking the ball up, setting, and throwing to the bag. An average runner needs about 8.2 s to reach second and 11.6 s to reach third, scaled by his speed. A ball fielded cleanly in front of an outfielder is a single. **Off the wall is at least a double.** A carom takes longer to pick up.
   - A ball that gets past the outfielder is **chased, not met**: it arrives first and he gets to it half a second or more behind it. He never runs a bee-line to where it will end up as if he knew; he goes to the landing spot first.
   - The ball is shown coming down (and caroming) **before** the call. Long flies must not be cut off in mid-air.

## The dive and the wall leap (decide now, animate later)

- A ball just out of ordinary range can be a **diving catch**; the dive can also miss, and then the ball gets by him. The decision is part of judgment; the animation is not needed yet. **(verify: the dive block in `judge0` and the `dive` object)**
- When the player is pitching, the closest of these calls are offered to him as events (DIVE FOR IT, ROB HIM, SNAG IT). Until events exist, take the roll the code makes without one.

## What the play looks like and when it ends

- The play is over the moment it is called. The flight is held at the catch, so the ball is never seen carrying on past the man who caught it.
- A wall ball is drawn to the outfielder's glove over the last 0.55 s; it never teleports.
- After a hit to the outfield the fielder throws it in (42 m/s, flat, small ball). When the batter-runner is offered GO / STAY, the outfielder holds the ball until the choice is made or times out, and the throw is shown before the cut.
- **The call is made out in the field, where the play was.**
- A landing ring marks where a ball in the air will be caught (see `TRAILS_AND_EFFECTS.md`).

## Calls and words

Use the prototype's wording exactly (`port/data/STRINGS.md`): OUT!, CAN OF CORN! (a routine fly he is camped under), WHAT A CATCH! (a dive), ROBBED HIM! / ROBBED!, SNARED IT!, DOUBLE PLAY!, GROUND OUT, FLY OUT, LINE OUT, POP OUT, FOUL OUT, the error tags above, and for hits the base count with its tag (OFF THE PORCH, OFF THE ARCADE, TOO HOT TO HANDLE, and so on).

## Runners, outs, innings (needed to play three innings)

- Runners advance on hits by the base count; force plays and a double play on a ground ball with a man on first **(verify: the `dp` handling where the result is applied)**.
- A fly out with a runner on can offer TAG UP? / NO, STAY to the player (an event; skip the offer for now and hold the runner).
- Three outs end the half. A game is three innings. A walk-off ends it at once.
- Juice: a hit earns a bar, a homer two; an out earns nothing.

## The owner's rules that apply here

- The picture always matches the call.
- An error must look like an error.
- No fielder ever goes into or through a wall.
- Fairness: a rob or a dive must look possible. The landing ring sits under the fielder on a rob.
- Variety: outs come as cans of corn, liners, dives, robs, grounders, bad throws. Do not let it collapse into one kind of out.

## Tests to write

- The range rule for each fielder type, using `KRAKENS` values.
- Launch under 20° caught anywhere is a LINE OUT.
- A ball reaching the wall on the fly in under 4.2 s is never caught unless a man is camped with 0.7 s to spare.
- Hang-time range growth between 3.2 s and 4.6 s.
- Off the wall is at least a double; the 8.2 s and 11.6 s races scaled by speed.
- The 8.5% bad-throw error with luck pinned both ways.
- In Overdrive, a liner at an infielder always goes through.
- Run the 1,428 flight cases through the judgment with luck pinned and record the mix of outs, singles, doubles, triples and homers; send it to the web session to compare with the prototype's own mix.

## Not in this pass

Animation of any of it; the defensive events; throws as shown pictures; the brawl; sound. Those come with their own specs.

## Errors and the Moon hop, in one place (added 28 Nov at the owner's request)

Your `Judgment` port already produces most of these outcomes. This section is so the **system** is understood: what an error is in this game, when each kind happens, and above all how it is **shown**. The owner's rule: **an error must look like an error. The picture says "error" before the words do,** and it must never look like the game forgot to make a play.

### What counts as an error

"A ball a fielder should have handled and didn't is scored as his error." There are no silent misplays and no errors that are only text. There are **no bad throws** (removed 28 Nov until a wild throw is animated). Every error is a fielder **wearing the ball and going down**.

| Kind | When | Tag |
|---|---|---|
| **A routine grounder eats him up** | A grounder that would have been an out at first: about one in twelve (8.5%) takes a bad hop and catches the infielder flush | ERROR · ATE HIM UP |
| **A rocket at an infielder** | A hard liner right at him: on him within 1.7 s, between ankle and head height, within about 3 m of where he can reach: 60% of the time it goes off him | ERROR · ATE HIM UP |
| **Overdrive** | While the hitter is in Overdrive **no infielder ever handles one**: liner or grounder, the first man it reaches wears it. A liner right at an outfielder flattens him too | ERROR · ATE HIM UP |
| **A comebacker off the pitcher** | The pitcher only handles what comes straight back within 1.5 s, and about two times in three it gets through; when it reaches him and he does not handle it, it goes off him into the outfield | ERROR · OFF THE PITCHER |
| **An outfielder's misplay** | A ball that bounces over the wall (a ground-rule double) when the nearest outfielder could have been under it (within 2.5 m of getting there): it comes down on him and he goes over | ERROR · LOST IT IN THE LIGHTS / MISJUDGED IT / OFF HIS CHEST / CLANKED IT (one at random) |
| **Your own, when you pitch** | Losing MAKE THE PLAY or MAKE THE CATCH | E · BOOTED IT / OFF HIS CHEST! |

### How an error is shown (all of these, every time)

1. **He gets in front of it first.** The fielder breaks from his position to the spot the ball crosses, so it really does hit him. (He used to stand at his position and fall over while the ball went by yards away.)
2. **It hits him and he goes down** (the knocked-down clip), a beat before it would have been fielded, and **he stays down** while the play goes on.
3. **Impact feedback:** a thud and a boom, a low tone, sparks at the spot, a white flash, a camera kick, a vibration, and the crowd's sharp reaction.
4. **The ball goes on through** on its real path for whoever is behind him: the next fielder chases it down and the runners advance by the normal race. Nothing is teleported.
5. **A cut to the man who wore it,** low, from the plate side, for up to 2.5 s (never while a GO / STAY offer is up: then the picture stays on the field).
6. **The call names it:** the hit is announced with the ERROR tag ("SINGLE · ERROR · ATE HIM UP"). The ATE HIM UP achievement the first time.
7. For the game's count it is a ball in play that the batter reaches on: runners, Juice and the hit streak are handled exactly as the result says (verify against `finishPlay` when you wire scoring).

### The Moon hop

A bad hop off the Moon's surface: rare, funny, and the reason a sure out sometimes is not.

- **When:** on any of a fair ball's **first three bounces**, while it is still moving faster than 8 m/s along the ground, there is a **1.1% chance per bounce** (not on the big first bounce of a chopper, not on a ball already tagged as something else, not on a foul).
- **What it does:** the ball **kicks sideways by 14° to 32°** (0.25 to 0.55 rad, either way) and **jumps 60% higher** than a normal bounce. The flight continues from there under the normal rules. It is part of `simulate()`, so the recorded path is the real one and the fielders are judged against it.
- **Only called when it mattered:** the tag MOON HOP! is kept **only if the play ends as a hit.** "A bad hop is only called when it beat the fielder: if he still made the play, nobody mentions it."
- **How it is shown:** a small yellow **MOON HOP!** call that pops in just above the ball at the moment of the hop and rides with it for about 1.3 s (tilted, outlined, kept on screen), with a tick in the hands; then the result is announced with the tag ("SINGLE · MOON HOP!"). The MOON HOP achievement for a hit on one.
- **Its cousin, OFF THE BAG:** a ground ball that passes within 36 cm of first, second or third kicks off the bag: it turns 17° to 46° either way and pops up at 3.5 to 5.5 m/s. Same idea, tagged OFF THE BAG.
- **In the flight cases** luck is pinned so a Moon hop never happens and a bag kick always goes one way; test the hop separately with luck forced.

### Why they exist (so nobody tunes them out)

Variety and fairness. The owner wants outs to come as cans of corn, liners, dives, robs and grounders, and hits to come with stories. An error or a hop turns a routine out into a moment, the hitter is rewarded for hard contact (rockets eat fielders up), and Overdrive feels unstoppable. They are rare on purpose. Do not raise or lower the rates; ask.

### Tests

- The 8.5% grounder error and the 60% rocket rule with luck forced both ways; in Overdrive a ball at an infielder always goes through.
- An error is always a hit in the result and always carries an ERROR tag; the fielder named is the one shown going down, and he was moved to the ball's path before it arrived.
- The Moon hop at exactly 1.1% per eligible bounce over a large sample; the turn and the 1.6× jump; the tag dropped when the play is an out.
- No BAD THROW and no PULLED HIM OFF THE BAG anywhere.
