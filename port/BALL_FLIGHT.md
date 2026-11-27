# Ball flight: everything about how a batted ball behaves

Why this matters to the owner: he wants balls to be able to land anywhere on the field and out of it, as long as contact, exit speed and launch angle justify it, so the player never feels "I've seen every ball path." Variety here is a design requirement, not decoration.

Sources, in order of authority:
1. `index.html`: `simulate()` (the flight), `tryContact()` (what comes off the bat), `judge0()` (what the fielders make of it).
2. `port/code/02-ball-flight-and-park.js` and `port/code/01-hitting.js`: those same functions, one statement per line.
3. `port/02-ball-flight-and-park.md`: every rule and note about flight and the park.
4. `port/data/flight_cases.json`: 1,428 flights computed by the prototype. **The Unity flight must reproduce these.**

## The physics, in plain terms

- Fixed step of 1/120 s. Gravity 9.8 (times a per-ball gravity scale, see below). Air drag is quadratic: each step the velocity is multiplied by (1 − 0.0042 × speed × dt).
- Spin has two parts. **Side spin** curves the ball left or right (hooks and slices); it comes from the spray angle plus luck. **Lift** is backspin (positive: carries) or topspin (negative: dives); it comes from where the barrel met the ball.
- The ball bounces and then rolls; a chopper's first bounce is deliberately a big one.
- The ball is recorded as a list of points 120 times a second. Everything else (cameras, fielders, callouts) reads that list. Nothing about a flight is decided while it is in the air.

## What comes off the bat (from `tryContact`)

- **Launch angle** = a base (25° power, 11° contact) + where the barrel met the ball (under it goes up, on top goes down) + pitch height + luck. Clamped −20° to 62°.
- **Spray angle** = timing (early pulls, late goes the other way) + pitch location (inside pulls) + barrel offset + luck. A tipped ball gets ±50° more.
- **Exit speed** = a base (47 m/s power, 37 contact) × contact quality × the hitter's power × Juice (×1.22) × Overdrive (×1.14) × a little luck.
- **Chasing** a pitch off the plate costs speed and bends launch and spray toward where the pitch was.

## The kinds of ball (each one is named on the result line)

| Kind | When | What it does |
|---|---|---|
| Pop-up | Got under it, or badly mistimed, or tipped | 68–81° up, 27–33 m/s |
| **BLOOP** | Weak or tipped contact, sometimes | 28–38° at 22.5–27 m/s: drops in front of the outfield |
| **CHOPPER** | Hit on top, low launch, sometimes | Beaten into the ground at −34° to −48°, one big bounce |
| **LOW-GRAVITY POCKET** | Rare (3%) on a well-hit fly | Gravity ×0.55: it just keeps hanging |
| **Down the line** | Well-struck toward the corner side, 1 in 5 | Hooks or slices to within a few degrees of the foul line |
| **Wall ropes** | Well-struck toward a tall wall | A hard low liner that bangs off the wall, at varying heights up it |
| **TOPSPIN SINKER** | Topspun and well hit | Leaves on a line at 9–18°, then dives |
| **BACKSPIN CARRY** | Strong backspin, launch over 14° | Carries further than its speed suggests |
| **TAPE-MEASURE SHOT** | Barreled power swing, 10% (30% with Juice) | Speed ×1.14, gravity ×0.8: out of the stadium |
| **MOONSHOT** | A tape-measure with Juice or Overdrive, sometimes | Faster again with gravity down to about half: lands on the Moon up to about 1,134 ft away |
| Show shots | Rare, big hitters | Orbit, satellite, saucer, the Apollo site, a light tower: scripted camera pieces on top of a real flight |

## The park the ball flies in

- Fence distance 99 + 23·cos(2φ) m, with a straight triples-alley wall in right. Standard wall 3.4 m; the Porch in left 11.6 m; the Arcade in right 8.6 m. See `LOOK.md` for pictures.
- **Off a wall:** the outward part of the velocity is reversed (×1.35 of it removed) and the whole thing damped to 70%; the ball stays where it hit. Tall-wall hits are tagged OFF THE PORCH / OFF THE ARCADE.
- **Foul poles:** a ball within a narrow band of the line above the wall hits the pole or its screen and is a home run (OFF THE FOUL POLE), with a clang and a drop.
- **Batter's eye:** a slanted solid panel behind center; a homer into it caroms up and back toward the field.
- **Light towers:** four solid masts beyond the fence; a homer that reaches one clangs off and drops, and the chase camera stops short to watch.
- **Seats:** a homer comes down among the fans at seat height and takes a short hop (under a second). On the right-field patio it bounces up to four times and can go off the back rail.
- **The cove:** balls into the lava beyond right field are always followed in by the camera.
- **Out of the park:** beyond the back row there is nothing; the ball comes down on the Moon and kicks up once.
- **Distance called** is where the ball would have come down had nothing stopped it (so a ball off the batter's eye or a tower still gets its true distance).

## What the fielders do with it (summary; see `05-defense-fielders`)

- Each flight is judged once, at contact: out, hit (and how many bases), foul, home run, or a special play (dive, rob at the wall, misplay).
- A wall ball comes to the outfielder's glove over the last half second; it never teleports.
- A homer that only just clears a reachable part of the wall can be robbed; when the player is pitching, that becomes a ROB HIM! event.

## How it should look

- The ball is always the clearest thing on screen: white with red seams, true size up close, scaled up gently with distance so it never vanishes (about 5% of camera distance).
- A thin flame ribbon trails it, hotter and longer on hard contact and Juice, tapering to nothing. It never hides the ball.
- A yellow ring on the ground marks where a ball in the air will come down.
- Home runs are followed by one of several cameras (chase, blimp, aerial show, admire). See the strips in `port/look/`.

## Testing the port

Run every row of `flight_cases.json` through the Unity flight and compare: home run or not, wall or not, foul or not (exact); distance and first landing point within about half a meter; times within about 0.05 s. Rows that differ point at a specific missing rule (pole, eye, tower, patio, alley), which the row's `tag` and flags will name.
