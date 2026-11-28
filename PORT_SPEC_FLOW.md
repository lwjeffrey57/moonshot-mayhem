# The flow between scenes: what plays after what, and what a tap skips (port spec)

Asked for by the owner on 28 Nov. His rule above all others here: **pace of play. Everything is skippable quickly, there are no dead waits, and when a play is over with nothing to show, the game goes straight to the next thing.**

The states are in `index.html` as `S.state` (batting) and `PD.ph` (pitching). The code wins where this file and the code disagree. Timings marked (verify) are in `port/TIMING.md` or the named function.

## Batting: the chain

```
walk-up  ->  ready  ->  wind-up  ->  pitch  ->  [swing]  ->  result or flight
flight   ->  (events / offers)  ->  call  ->  celebration or reaction  ->  next
```

| After this | Comes this | Notes |
|---|---|---|
| **A new hitter** | His **walk-up**: his own routine, his card under him (number, name, PWR / CON / SPD grades, tier gem, his spot in the order and perk), NOW BATTING. | The leadoff man of every half always gets one. Others get one when walk-ups are on. **Any tap or swing skips it at once.** If his body is still loading, a tap skips the wait and the walk-up. |
| Walk-up | **Ready**, then the pitcher's wind-up after `PACE.newBatter` 2.9 s (2.1 s between pitches to the same hitter). | A tap between pitches is a free practice cut; the pitcher waits for it to finish (no quick pitches). |
| Ball or strike, at-bat goes on | Back to ready. | Pitch marker stays about 1.7 s; a miss replay about 1.9 s. Neither delays the next pitch beyond that. |
| **Strikeout** | The hitter's beaten reaction (`d_` clip), camera on him until `DEF_CUT` 1.6 s, then a cut to the **pitcher's taunt**, 3.5 s in all (`DEFEAT`). Then the next hitter. | First strikeout of a game gets a wild taunt. Skippable by tap (verify: `doSwing` during `S.kOut`). |
| **Walk** | The batter leaves the box at once; only the runner going to first is shown. | |
| **Hit by pitch** | He goes down, gets up, limps to first; sometimes he charges the mound: **the brawl**, then the result. | First homer of a game is always answered: the next man wears the first pitch. |
| **Ball in play: out** | The fielders act it out, the call is made in the field where the play was, then next. | **No celebration: straight on.** |
| **Ball in play: hit** | The ball is shown coming down; the throw in; a **GO / STAY** offer if there is a base to take; then next hitter. | Offers time out on their own (default is stay). |
| **Home run** | Flight on its chosen camera, **horn the instant it clears**, the show (lasers, flyover, rocket, fireworks), call with distance, then **the trot** and his **celebration at the plate**, then next. | **A tap during the flight ends it there (after 0.45 s). A tap during the trot or the celebration skips it.** In practice, the Derby and the Gauntlet there is no celebration at all. |
| **Third out** | INNING n card, then the Krakens' half. | |
| **Krakens' half** | LET ME PITCH / KEEP HITTING. Declined: the half is rolled and summarised on one card. | |
| **Kraken pitcher knocked out** (3+ runs off him, or a 50% change opening the third; at most two a game; never an arm that has already pitched) | He trudges off (KNOCKED OUT OF THE GAME! and five other calls), a cut to the mound for the new arm with his card, then the hitter comes up as usual. | Skippable. |
| **Kraken pitcher reaches Overdrive** | His Overdrive tag rides above him; the first time, a one-card explainer that a tap closes. | The explainer must never trap the player. |
| **Your hitter reaches Overdrive / Locked In** | LOCKED IN! on his walk-up; flames on the HUD. | |
| **Game over** | Walk-off ends it at once ("nobody else needs to bat"). Then the result screen. | |

## Pitching: the chain

```
YOU'RE ON THE MOUND (first trip, 2.7 s)  ->  hitter's walk-up  ->  aim  ->  power  ->  release
->  flight  ->  result  ->  (event)  ->  celebration  ->  next hitter's walk-up
```

- **First trip to the mound** in a game: cut to your pitcher clapping into his glove, his card under the call, 2.7 s. **A new arm you bring in gets the same entrance** (NOW PITCHING). When the picture comes back, the strike zone and the hitter's hot and cold squares are up from the first pitch.
- **Every Kraken hitter gets a walk-up** with his card under him (same card as your own hitters: number, name, grades, tier gem, and THE DUEL line saying who has the edge). **Any touch or key skips it at once.** The box is never empty: if his body is not loaded, the picture holds on the mound and cuts to him the moment he is there.
- **Strikeout:** the controls leave the screen and your pitcher celebrates; then **straight to the next man's walk-up, never a flash of the mound with an empty box in between.**
- **Ball in play:** seen from the mound for half a second, then the field; the call where the play was; a defensive event if one is on; then next.
- **Events at a bag:** runner coming, then behind the thrower for the inputs, then the throw, then the bag for the catch and one call. A lost event is held about 0.8 s longer so the call is read.
- **Three hitters or three outs** ends the half.

## Rules that apply to every transition

1. **If there is nothing to show, do not show nothing.** Play over and no celebration: go straight to the next hitter's walk-up.
2. **A tap always moves things along.** Walk-ups, homer flights, trots, celebrations, the pitcher-change scene, explainers. Never a scene that must be sat through, except the short Locked In moment (under a second).
3. **A swing is never ignored** and a skip tap is never eaten by the next scene (0.12 s guard).
4. **Never cut a play before its call.** Long flies are seen landing; a throw is seen arriving.
5. **Text sits above heads, never across a player or under a thumb.**
6. **Achievement plates wait their turn:** never over an event's inputs or a hitter's reaction close-up (see `port/ACHIEVEMENTS.md`).
7. **Variety:** walk-ups, taunts, celebrations and home-run cameras are never the same twice running (`PORT_SPEC_SHOW.md`).

## What to build and check

- One state machine in the shared core that owns these transitions, with every hold time a named constant from `port/TIMING.md`.
- A "skip" input handled in one place, tested for every scene above.
- A test that walks a full game with a tap on every scene and never gets stuck, and another with no taps that never waits longer than the listed holds.
