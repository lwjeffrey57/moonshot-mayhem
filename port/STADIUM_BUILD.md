# Building the rest of the stadium in Unity

From the owner, 28 Nov: start building out the rest of the park (the other walls, the stands and everything round them). This file is the brief. Numbers are from `index.html` (`port/code/02-ball-flight-and-park.js`, the `ribbon` / stadium section); the pictures are `port/look/stadium_*` and the two phone reference screenshots. Prototype coordinates: plate at the origin, center field toward −z, right field +x; `phi` is the angle from dead center (negative = left field), `r` the distance from the plate.

## The look to aim for: bare-minimum PS2-era graphics, if the phone can afford even that

The owner's target is modest on purpose: **early-2000s console sports game** (the Slugfest era he keeps pointing at), not a modern showcase. Performance comes first, always.

- **Low-poly, clean shapes, readable from the batter's box.** Big simple forms, flat or gently shaded surfaces, painted detail in textures rather than geometry.
- **Lighting:** baked or painted, plus at most one real light on the players and one soft shadow under each player and the ball. Vertex or lightmap lighting on the stadium. No real-time global illumination, no screen-space effects beyond a light bloom on neon and flames if it is free.
- **Textures small** (256–1024), a handful of atlases, mip-mapped. Unlit or simple lit shaders (URP Simple Lit / Unlit). Every material saved as an asset so nothing is stripped on device (item 22).
- **Budget:** the browser held 56 fps with about 350,000 triangles on screen and unlit materials. Target 120 fps on the Pro Max and 60 on older phones; measure on the phone after each piece is added and report the number. If a piece costs frames, simplify it before adding the next.
- **Style, not realism:** the park is a neon-lit dome-era ballpark on the Moon. Night, floodlights, glowing boards, the Earth overhead.

## What is fixed and what is free

- **Fixed (gameplay depends on it):** the fence line, every wall height, the warning track, the batter's eye, the seating slopes the ball lands on, the Cove patio and rail, the light towers' positions, foul poles. `BallFlight` already collides with these; **what is drawn must be where the ball hits.**
- **Free:** how they look. The owner already prefers Unity's right-field wall look to the prototype's. Propose looks; do not move collision.

## Build order (send a phone screenshot from the hitter's camera after each)

1. **The ground** (regolith with craters, the chalk, the dirt cut-outs, the warning track): `port/VISUALS_AND_FILES.md`, field markings.
2. **The outfield wall, all the way round, pole to pole.**
   - **Fence line:** `r = 99 + 23 × cos(2 × phi)` meters: 99 m (325 ft) down each line, 122 m (400 ft) to dead center. Right of center it is **two straight walls, not a curve** ("Triples Alley"): out from center to a deep corner in right-center at 420 ft, where the brick Arcade begins, and from there dead straight to the right-field pole (verify `ALLEY_R` and `fenceR` in the code).
   - **Heights:** 3.4 m (`WALL_H`) in general. **The Porch** in left field, from the pole round to left-center (to 27.5° left of center): **11.6 m (38 ft)**; a ball has to clear all of it. **The Arcade** in right field, from about 10° right of center to the pole: **8.6 m**.
   - **On the wall:** green distance pads with the five markers and evenly spaced ad panels between them (sponsor names are in `port/data/STRINGS.md`), padding, a painted pool of floodlight every 30 m.
   - **Foul poles** at each line, tall, yellow.
3. **The batter's eye** in dead center (item 32) and **the big scoreboard** above it (line score normally; big moments take it over: HOME RUN / 455 FT).
4. **The outfield stands: one low bowl.** A 1.5 m ledge behind the wall, then seats rising from 0.3 m above the wall top to 25 m high at 34 m back (about two thirds of a meter up per meter back). **The outfield has no upper deck** (it was switched off so the crater rim, the rocket, the Earth and the stars stand clear above the bowl and the place reads as the Moon at a glance). The rim carries lights, dish antennas turned toward Earth and whip masts with blinking beacons. No flags: there is no wind.
5. **The halo board** on the facade at the back of the bowl (next section).
6. **The Cove** in right field (10° to 45° right of center): on top of the Arcade wall a deep standing deck, 30 m front to back: the first 6.5 m a short bank of seats climbing 2.3 m, then an open patio to a back rail, and beyond the rail an **open lava vent** (the reservoir a Cove shot splashes into, with its counter). Brick arches on its face ("ZAPP COLA COVE").
7. **The grandstand behind the plate and down both lines, pole to pole:** lower deck, a cross-walkway, an upper deck, a cantilevered roof with a white fascia and a line of lamps under the lip, press level. This is what the pitching camera and the home-run cameras see. The decks down the foul lines stay even though the outfield's upper deck is off.
8. **The four light towers** beyond the stands at 24° and 58° either side of center, 66 m behind the fence: masts about 79 m tall with a bank of lamps on top (to 95 m), soft bloom and a thin flare. They are solid: a ball can hit them, and one lamp bank can be smashed.
9. **Ribbon boards** down both lines: a crawling LED strip of jokes and sponsor lines.
10. **Beyond the park:** the Moon's surface out to at least 450 m, pale rounded crater-rim hills on the horizon, the lander and Apollo site, the dome, fuel tanks, the Comets rocket on its pad beyond left field (it lifts off on some homers), the satellite dish, the Earth and a star field that travel with the camera.
11. **Dugouts, on-deck circles, bullpens, the catcher and umpire**, then set dressing.

## The halo board

A **band of LED screen 7 m tall running the whole way round the back of the outfield bowl, pole to pole**, on the facade 30 m behind the wall between 25 m and 32 m up. It is the park's voice: it always says something about what is happening right now. Code: `HALO` in `index.html`.

- **One message at a time, repeated four times round the band** (so every seat and every camera sees it), in the italic display face, glowing in its color on a dark ground, with a colored rule along top and bottom and faint scan lines. It **scrolls sideways**: slowly when idle, twice as fast for a play, nearly four times as fast when hyped.
- **Which message, highest first:** walk-off; into orbit; grand slam; no-doubter; home run (and through the trot); a brawl; a pitching change; a strikeout of your hitter; a Showdown (both in Overdrive); your Overdrive; the pitcher's Overdrive; a base hit; full count; two strikes; runners in scoring position ("RALLY TIME"); otherwise **idle**.
- **Idle** rotates every 9 seconds through ten sets of lines: league lore, deadpan corporate-dystopia announcements ("YOUR SEAT. YOUR DEBT. YOUR TEAM.") and sponsor slogans, never the same pair twice running. All the lines are in the code and `port/data/STRINGS.md`.
- **Earned messages stick:** a hit stays 6 s, a strikeout 5, a homer or no-doubter 7, a grand slam 8, a pitching change 5, a walk-off 12, "so the board is felt, not flickered". A hyped message can interrupt a calm one.
- **Hype** (homers, slams, orbit, Overdrive, Showdown, a fight, a walk-off, pitcher Overdrive): the whole band pulses brighter and dimmer about twice a second, smoothly, **never a hard strobe**.
- **Each mode has its own colors** (`THEME`): gold on dark amber for homers, ice blue for Overdrive and strikeouts, red for danger and fights, green for a base hit.
- In Unity: one emissive strip mesh with a scrolling texture; draw the message to a small render texture or swap pre-made textures, and scroll by UV offset (moving a texture costs nothing). It should cast a little colored light on the crowd below if that is cheap. Respect the "reduce flashing" setting.

## The fans: an upgrade worth exploring (part of why we moved to Unity)

**Today:** the crowd is painted. Each bank of seats is one textured surface of bright block-colored fans in neat rows, cut into sections by dark aisles and a cross-walkway, with a see-through layer of painted floodlight over it. Near the plate, rows of fans in bubble helmets (it is the Moon) are close enough to read. Camera flashes sparkle during homers. One number, `crowdE` (0 to 1), says how excited the park is. It costs almost nothing and it looks flat.

**What the owner wants:** something better, **without hurting performance**. If it has to start small, what we have is acceptable for now. Explore in this order and stop at the first level the phone cannot hold at full frame rate:

1. **Painted crowd, done well (baseline, nearly free):** the same idea in Unity, with a shader that makes the colors shimmer and the rows bob with `crowdE`, and brighter waves rolling round on big moments.
2. **Instanced card fans in the nearest sections:** a few thousand flat cut-out fans (two triangles each, a small atlas of 8 to 16 people in bubble helmets and team colors), drawn with GPU instancing, animated in the vertex shader: idle sway, stand up, arms up, jump, all driven by `crowdE` plus a per-fan random. Far sections stay painted. This is the PS2-era look done properly and is probably the sweet spot.
3. **Low-poly 3D fans in the first few rows behind the plate and on the Cove deck** (under 100 triangles each, instanced, three or four body types), because the pitching camera and the walk-up camera look right at them.
4. **Reactions with meaning:** the section a homer lands in stands and reaches for the ball; the wave; everyone up for a walk-off; heads following a fly ball; boos (arms down, thumbs down) for the Krakens.

For each level report: what it looks like (a phone screenshot from the hitter's camera and from the mound), triangles and draw calls added, and the frame rate on the phone. Let the owner pick.

Rules that do not bend: nothing bright or moving inside the batter's eye window; the crowd never competes with the ball for attention during a pitch (calm while the pitch is in the air, loud after contact); no real people, teams or logos.

## The playing surface: a place for Unity to shine (owner, 28 Nov)

The owner wants the field's surface textured properly in Unity, **ideally better than the prototype's.** If you need a starting point, use what we have; the goal is to beat it.

**What the prototype's surface is** (one shader, `groundMat` in `index.html`; `paintField` for the layout):
- **It is the Moon, not grass and clay.** The whole playing surface is regolith: pale gray dust. "Moon dust, not clay." There is no green anywhere near the plate, on purpose: the green CONTACT ring must never sit on a green background.
- **Two field-wide maps:** a color map (the layout: lighter dust for the infield skin, base paths, mound and warning track; a darker rolled "mare basalt" for the outfield; mowing-style stripes at 45° in two directions; worn patches where fielders stand and round the bases; shade at the foot of the walls; a long evening shadow from the third-base stands) and a mask of where the "dirt" cut-outs are.
- **Close-up detail tiled on top:** fine grain, pebbles and small raised-rim craters.
- **A real lunar surface on top of that:** a photographed-style color map and normal map (`moon_d.jpg`, `moon_n.jpg` in the repo root, about 300 KB each), tiled every 64 m and mirrored tile to tile so there is no seam, **lit from the side like the players are**, with a soft sheen where the floodlights glance off the dust toward the camera.
- **Craters and boot prints:** pocked all over: about 110 small ones round the infield skin, 90 inside the diamond, 50 in foul ground, 45 in the shallow outfield, a couple of dozen big ones placed by hand where the batter's camera sees them, more out by the track.
- **Chalk:** white lines about 40 cm wide wherever the surface type changes, plus the regulation plate area (see the field-markings section of `port/VISUALS_AND_FILES.md`).
- **Kept clear:** no crater, pattern or line may cross **the lane from the plate out past the mound**, the bags or the plate area. The surface is kept faint and plain there, because that lane sits behind the strike zone and the bat ring.

**What to keep:**
- Gray lunar regolith with craters; the dirt cut-out layout and the chalk; the clear lane behind the strike zone; nothing green under the bat ring; the surface stays calm enough that a white ball and its shadow read on it everywhere.

**Where to do better (propose, with phone screenshots and the frame rate):**
- **Real relief from the hitter's low camera:** normal-mapped craters and ripples that catch the floodlights, a few modelled crater rims and rocks outside the playing lines, parallax or simple height blending if it is cheap.
- **Dust that behaves like dust:** scuffed and darker where players stand and run, cleat marks at the plate and on the base paths, drag-mat patterns on the skin, a puff where a ball lands or a runner slides, footprints that linger (it is the Moon: nothing blows them away).
- **Lit like a night game:** baked pools of light from the four towers, soft player and ball shadows, the Earth's cool light from above, the warm glow of the Cove lava on right field, the halo board's color spilling onto the track.
- **A cleaner blend** between skin, base paths, mound and outfield (a splat map or decals instead of one painted picture), sharp chalk at any distance, and detail that holds from the plate camera, the mound camera and the aerial shots alike (two or three detail scales, not one).
- **Variety over the field** so it does not tile visibly: large-scale tone variation, a few unique landmarks.

**Constraints:** PS2-era budget, one or two materials for the whole field, small textures, no cost that shows on the phone. The collision surface is flat (plus the mound): relief is visual only, so bounces and rolls match the flight rules exactly.

## The scoreboard: how it works (and a place to improve) (owner, 28 Nov)

Code: `sbDraw`, `scoreboard`, `sbTick`, the board's mesh, and `vbDraw` (the second board) in `index.html`.

**The big board.** A video board 48 m wide and 18 m tall, standing on four legs **above the batter's eye, set 22 m to the right of dead center** (so on a phone it is not hidden behind the hitter's card), 39 m up, 13 m behind the fence, tilted to face the plate. A **wing on each side in club colors** (KRAKENS / KEPLER on the left in teal, COMETS / TRANQUILITY on the right in orange) makes it read as one long board across right-center. A dark bezel with a glowing edge and a soft blue halo behind it.

**What it normally shows (the line score), redrawn only when something changes:**
- Two team rows: **KRAKENS** (teal) and **COMETS** (orange) with the runs in a dark box at the right. **The side that is batting has a white outline and a white arrow**, and its score is lit yellow.
- **The inning** as a big number in a glowing cyan ring.
- **Balls, strikes and outs as lamps:** three green for balls, two yellow for strikes, two red for outs.
- **The man at the plate** along the bottom: his portrait with his number tucked in the corner, his name, and his line.
- A deep-space face with a faint star-burst and scan lines behind it all.

**Big moments take it over.** `scoreboard(big, small)` replaces the whole face for **4.5 seconds** with one huge gold word and a second line in a cyan-edged box, then the line score comes back by itself. For example: PLAY BALL at the start; **HOME RUN** with the distance ("455 FT", or "PROJ. 523 FT" off the board or a pole); INNING 2 with the score; KRAKENS +2; the game's name on the title screen.

**It reacts physically:** a ball can hit it (SCOREBOARD!, a home run, it shorts out and the park takes a surge); it flickers in a power surge; near the end of the aerial home-run shots it takes a surge as part of the show.

**The second board, in left** (50 m square-ish, 36° left of center, 52 m behind the fence, 27 m up): **the man at the plate.** NOW BATTING, his big portrait in a colored frame, his name, and his day so far. When you pitch it shows the Kraken at the plate under KEPLER KRAKENS, in teal.

**Rules:** the board always agrees with the HUD (same score, count, outs, same hitter, same distance as the call). Nothing on it flashes hard. It never sits behind the HUD's card on a phone.

**Where Unity can do better (propose):** real video-board behaviour: animated transitions between the line score and a big moment, a replay-style freeze of the swing, the hitter's portrait animating in, pitch speed and type after each pitch, a strike-zone plot of the at-bat, the distance counting up in step with the HUD's counter, crowd prompts (MAKE SOME NOISE) tied to the crowd's excitement, sponsor bumpers between innings; LED pixel shading up close; light from the board spilling onto the stands and the top of the batter's eye. Cheap to do as a render texture or a few swapped textures on an emissive surface.

## The sky and what stands behind the stadium (start filling it in; a place for Unity to shine)

The owner wants the skybox and the backdrop started now. **Use our assets as reference; aim higher.** Reference files in the prototype repo root: `stars.jpg`, `sky.jpg` / `sky_m.jpg`, `earth.png`, `moon_d.jpg`, `moon_n.jpg`; the props `lander.txt`, `dome.txt`, `ufo.txt`, `soda.txt`, `fuel.txt`, `mc.txt` (mission control), `sat.txt`, `dish.txt`, `rocket.txt`, `tower.txt`, `vboard.txt` (base64 FBX: `base64 -d -i x.txt -o x.fbx`). Pictures: `port/look/stadium_*` and both phone reference screenshots.

**What ours is:**
- **A black sky full of stars. No atmosphere:** nothing hazes with distance; only a faint fade on far-off stands. The stars and the Earth are "infinitely far away": they travel with the camera and never slide against the stadium.
- **The Earth**, large, hanging in the sky above center field: the signature of the place. It is what a ball "left orbit" toward.
- **A red cracked planet** low in the sky to the right (see `port/look/stadium_10`).
- **The lunar surface beyond the park** in every direction: the same gray regolith running out past the walls, cratered.
- **Crater-rim ridges on the horizon:** pale, rounded lunar hills, bright moon-white at the crest fading to gray at the foot (the look the owner prefers), with soft swells of light and shade, a brighter crest line and a faint warm wash at their feet from the park's lights.
- **A small Moon base round the park:** the lander and the Apollo site, the dome, mission control, fuel tanks, a satellite dish, a giant soda can, the Comets **rocket on its pad beyond left field** (it lifts off on some homers), interceptors that fly over, a saucer.
- **The light towers** standing over it all, and the glow of the stadium against the black.
- The outfield has no upper deck precisely so that all of this stands clear above the bowl "and the place reads as the Moon at a glance".

**What to keep:** black starry sky, no atmosphere; the big Earth over center; pale rounded ridges; the base and the rocket; the park glowing in the dark. Nothing bright or busy **behind the pitcher from the hitter's camera** (the batter's eye covers that window). Every object a ball can reach is solid (the no-clipping rule).

**Where to do better (propose, with phone screenshots and frame rate):**
- A proper star field with depth (a few bright stars, the band of the Milky Way), sharp at 3× on the phone.
- An Earth with real detail: slow rotation, a lit limb and a dark side, city lights, a thin glow at the edge. It is far away: one textured sphere or a card.
- Ridges and crater walls as low-poly silhouettes in two or three layers for depth, lit hard from one side with long shadows (the Sun is low), plus a few landmark peaks.
- The Moon base as a small living place: blinking beacons, a rover crawling, lights in windows, an antenna turning, the rocket venting before it lifts off.
- The stadium's own glow: light spilling up from the bowl, beams from the towers visible in the dust kicked up by the crowd.
- Day-of-game variety later (the Earth's phase, a passing ship) without changing gameplay.

**Constraints:** PS2-era budget; a skybox plus a handful of far cards and low-poly pieces; draw distance out to at least 450 m of real ground for long homers, then silhouettes; nothing that moves or flashes inside the batter's eye window; measure on the phone.
