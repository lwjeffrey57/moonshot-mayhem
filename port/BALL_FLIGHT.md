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

**Luck is pinned in the cases.** The flight has three random moments: a 50/50 flip for a ball arriving within 0.4 m below the top of the wall, a 1.1% Moon hop on a bounce, and the direction and height of a kick off a bag. The cases were generated with every random draw returning 0.75 (so: the wall flip takes the not-under-0.5 branch, no Moon hop ever, a bag kick turns the positive way by 0.675 rad and pops up at 5.0). Feed the Unity flight a random source that always returns 0.75 for these tests. Test the three random behaviors separately, each forced on.

Run every row of `flight_cases.json` through the Unity flight and compare: home run or not, wall or not, foul or not (exact); distance and first landing point within about half a meter; times within about 0.05 s. Rows that differ point at a specific missing rule (pole, eye, tower, patio, alley), which the row's `tag` and flags will name.

## A ball that leaves the stadium flies as far as it really goes (owner, 28 Nov: important for feel)

A home run is never cut short, capped, or swallowed by a wall of seats. If it was hit 700 feet, the player watches it go 700 feet. This is a big part of why a moonshot feels like one.

**What the flight does** (`simulate()`; the Unity `BallFlight` already ports it):
- Inside the stands (up to 34 m behind the wall) a ball comes down among the fans: it lands, takes one short hop off the seats, and is somebody's souvenir.
- **Beyond the back row (more than 34 m behind the wall) there is nothing to stop it.** It has left the ballpark. It keeps flying on the same physics (one-sixth gravity is the Moon's; the drag is the same) until it **comes down on the Moon's surface**, then takes long, lazy, low-gravity bounces (each keeps 46% of its height and 70% of its speed) and rolls to a stop. `outT` is the moment it first touches down outside, `outD` how far from the plate.
- **The distance shown is where it first came down** (`outD`), not where it stopped rolling and not a projection. The live counter climbs to exactly that number.
- The only cap is 300 m behind the wall (about 1,300 ft from the plate), where the flight simply ends.
- On the patio in the Cove it bounces on the deck (up to four times); a hop that clears the back rail goes on into the lava.

**What the picture must do so it is seen**
- **600 ft and up is always followed the whole way** on the chase camera, out of the park and down onto the Moon, with the distance running up (see `PORT_SPEC_SHOW.md`, section 6). 385 ft and up usually is.
- **The shot lasts until the ball touches down and kicks up once** (0.75 s after it lands), then ends. Never cut while the ball is still in the air; never make the player wait for it to roll to a stop.
- **The world has to exist out there.** Beyond the stands the prototype has the Moon's surface, ridges, the lander and Apollo site, the dome, fuel tanks, the rocket pad, a satellite dish, and the Earth and stars: the ball flies over and lands among real things. In Unity the terrain must extend at least 450 m from the plate in every fair direction, with the ball's shadow and a dust kick where it lands.
- **Nothing may clip it out:** the prototype's camera sees 1,600 m with only a faint distance fade (it starts at 320 m). Set Unity's far clip, fog, level-of-detail and occlusion so a ball 400 m away, and the ground under it, are still drawn. The stadium must not pop out of view from behind the ball either.
- **The ball stays visible but small** the whole way (`max(1, distance × 0.05)`, the ball-size rule) with its trail, and its shadow on the ground tells you how high it is.
- **The camera stays above every roof, tower and ridge** and never passes through the stands on the way out.
- **Light towers and props are solid:** a ball that reaches one clangs off it and drops; the flight ends where it hits (still a home run, with its full distance).
- The special Overdrive shots (into orbit, the satellite, the saucer, the Apollo landing) are separate set pieces on top of this.

**Checks:** three homers from the phone on the chase camera: about 450 ft into the seats, about 650 ft out of the stadium, and one past 900 ft. For each: the ball is in view the whole way, it is seen landing, the counter's last number equals the call, and nothing pops in or out.

## A homer into the stands, the porch, the patio or the Cove: what is seen (owner, 28 Nov: important for the feel of hitting)

A home run does not vanish at the wall. It is seen **arriving somewhere**. The flight rules are in `simulate()` and already in the Unity `BallFlight`; this is what the picture and sound do with them (`step` in `index.html`).

**Where the seats are (so the ball lands on them, not in them):** behind the wall there is a ledge 1.5 m deep, then the lower deck rising at about 34° (two thirds of a meter up per meter back) to the back row 34 m behind the wall, where the facade stands 25 to 32 m high, then the upper deck to 54 m back and 48 m high. The ball comes down at **head height above the seats** (0.9 m above the deck surface), not at the concrete.

**Into the seats:**
1. **The moment it lands** (`seatB`): a spray of pale sparks off the seats (two bursts, warm white), a **thud** (the mitt sound) and a small vibration; the **distance appears beside the spot** (when the chase camera is not on).
2. **One short hop:** it kicks up off the seats (up to 6.5 m/s, keeping only 16% of its speed along the ground), and for a beat the ball is seen bouncing among the fans.
3. **Then somebody has it** (`seatT`, at most 0.85 s after it landed): the ball disappears with a last small puff. "Swallowed by the crowd: somebody up there has a souvenir."
4. All through a homer, **camera flashes sparkle** at random through the stands (three a frame), and fireworks burst over the bowl.

**The first row / the ledge:** a ball that only just clears lands on the ledge in front of row one and stops there: it does not drop down a gap between the wall and the seats. (This is also where a robbed homer is taken back.)

**The Cove patio (right field):** it is a **floor, not a crowd.** The ball bounces on the deck up to four times (each keeps 30% of its height and 36% of its speed). A hop that clears the back rail carries on down into the lava: **a Cove shot**, with a geyser of red-orange coolant, a zap, a vibration, the MELTDOWN achievement and the splash counter going up by one. A hop that does not clear comes back off the rail and dies on the deck.

**Off things:** the scoreboard, a foul pole (DOINK!), a light tower (clangs off the mast and drops), the batter's eye (caroms back onto the grass), the props beyond the wall (the flight ends where it hits). Each has its own sound and call, and it is still a home run with its distance.

**Out of the stadium:** see the section above.

**Rules:**
- The ball is **always seen reaching its landing spot** on whatever camera is up. If the camera is elsewhere (on the hitter admiring it), it cuts back in time or the landing is shown on the board.
- **The play ends at the landing**, not at the wall and not seconds later: into the seats it ends as the fan gets it; on the chase camera 0.75 s after it comes down.
- The crowd near the landing reacts (in Unity: fans standing and reaching toward it is a cheap, big improvement).
- Ball size and trail rules hold all the way into the seats.

**Checks from the phone:** a homer into the lower deck, one off the facade or into the upper deck, one onto the patio that stays, one into the lava, one just over the wall onto the ledge.

## Nothing the ball can hit is hollow: no clipping through objects, it bounces off them (owner's rule, restated 28 Nov)

**"NOTHING A HOMER CAN HIT IS HOLLOW."** A ball in flight never passes through a solid thing. If it reaches one, **it hits it, comes off it and drops.** This holds for everything the ball can reach, inside the park and beyond it. If an object outside the field of play has no hit box, give it one, cheaply.

**What is solid, and what the ball does there** (the first group is in `simulate()` and already in the Unity `BallFlight`; the second is the prototype's prop system, `propBoxes` / `propBounce` / `propReflect` in `index.html`):

| Thing | What happens |
|---|---|
| Outfield wall (three heights) | Caroms back into play; a liner off the tall walls is a wall ball, seen hitting and coming down |
| Batter's eye | Caroms back onto the grass, lands and hops; power surge |
| Foul poles | DOINK!, home run |
| Scoreboard | Off the board, home run, the board reacts |
| Seats, ledge, facade, upper deck | Lands at head height, one hop, a souvenir |
| Cove patio, back rail | Bounces on the deck; off the rail or over it into the lava |
| Light towers (mast and lamp bank) | Clangs off, drops; the lamp bank can be smashed |
| **Every prop beyond the fence:** the big board on its gantry, mission control, the soda can, the domes, the dishes, fuel tanks, the lander, the rocket on its pad | **Comes off the ironwork and drops** |
| The ground anywhere, inside or outside the park | Lands, bounces, rolls |
| Players | The ball goes to the glove, or off the man who wore it; never through a body |

**How the prototype does the props, cheaply (copy the idea):**
- **One simple box per prop, built once.** Each prop model gets an axis-aligned box from its own bounds, **drawn in to 84% of its width and depth** so nothing bounces off thin air at a corner. Nothing closer than 60 m to the plate counts (no stray boxes in the infield).
- **Tall thin things get two boxes:** a prop more than twice as tall as it is wide (a light tower) gets a **narrow box for the mast** (28% of the width, the lower two thirds) and a **full box for the head**, so a ball passing below the lamps is not turned back by empty air.
- **Checked only for a home run in flight, once per frame, for the ball only:** is the ball's position inside any box? A dozen boxes and one moving point. No physics engine, no rigid bodies, no mesh colliders, no per-triangle tests.
- **The bounce:** find the face the ball came in through (the least penetration), reflect the velocity off it and keep 34% of the speed (50% on later bounces), push the ball 0.35 m clear so it cannot stick, then let it fall under gravity, bouncing on the ground at 32%. At most six bounces.
- **Feedback at the hit:** a thud and a metallic tone, sparks, a small camera kick and a vibration, and the call **OFF THE IRONWORK!** (in the Derby it scores as a target).
- **The flight ends where it hits:** the ball comes off, drops for a beat, and the play is over 0.65 s later. The camera does not follow it down. **It is still a home run, with its full distance.**

**In Unity:**
- Keep it the same shape: a short list of simple primitive bounds (boxes, a capsule for a mast, a sphere for a dome) authored on each prop, tested against the ball's path in the flight code. **Do not turn on mesh colliders or the physics engine for this.** Sweep the ball from its last position to its current one so a fast ball cannot tunnel through a thin object in one frame.
- **The drawn object and its hit box must agree.** If a ball visibly passes through something or bounces off empty air, that is a bug. Add a debug view that draws the boxes.
- **Anything new you add to the world that a ball could reach gets a bound at the same time**, including the rest of the stadium as it is built (item 36): walls, facades, roofs, towers, boards, the grandstand.
- Cameras obey the same spirit: they never pass through stands, roofs or ridges.
- Cost: this is a handful of bounds checked against one point. If it shows up in the frame time at all, something is wrong.

**Tests:** fire homers at each prop, each face of the scoreboard, each light tower's mast and head, the batter's eye, both poles and the back rail; in every case the ball is deflected and never appears on the far side. A ball passing just below a tower's lamps and just beside a prop's corner is not deflected.
