# What the game looks like

Photographs of the running prototype, with the numbers behind them. The pictures are the requirement: when a description here and a picture disagree, the picture wins; when a picture and `index.html` disagree, the code wins.

All the images are in `port/look/` (about 75). `phone_*` is a 414×800 phone in portrait (the lead device). `pc_*` is 1280×720. `stadium_*` is the park from a free camera with the HUD hidden.

Coordinates below are the prototype's: meters, home plate at (0,0,0), center field toward **negative z**, right field toward positive x, y up. Flip z for Unity.

## The feel in one paragraph

A night game on the Moon. Black star field, a huge Earth hanging beyond center field, gray cratered regolith for a playing surface with white chalk lines. A full, steep bowl of stands packed with small bright multicolored fans, wrapped by a ribbon board of neon text. Chunky blue-and-orange lunar-base hardware beyond the fences. Arcade-loud lettering: italic, heavy, outlined in near-black, in hot orange, gold and cool cyan. Everything reads at a glance on a phone.

## Fonts and core colors

- Display lettering (callouts, buttons, names): **Russo One**, italic, heavy dark outline. Fallback Arial Black / Impact.
- HUD text (labels, small print): **Saira Condensed** 500/700/800.
- Navy panel: `#10122a`. Near-black outline: `#05060f`.
- Contact green: `#3ddc6a` ring, fill at about 26% opacity. On-time flash green: `#39ff6a`.
- Power red: `#ff4d2e` ring, fill at about 40%.
- Timing ring yellow: `#ffe53b`. Gold accent: `#ffd23b`.
- Juice pitch blue: `#1432d8`. Cyan info text: about `#58d6ff`.
- Scene fog: color `#06060c`, from 320 m to 1500 m. Lights: a hemisphere light (`#dde4ff` sky, `#4a4a55` ground, 0.85) and two warm directional lights (`#fff1dc` 0.8, `#ffc890` 0.45).

## Batting view

Pictures: `phone_03_batting_ready_default_view`, `pc_03_batting_ready_default_view`, and one per camera: `*_04_camera_STRIKE_ZONE_default`, `_CLASSIC`, `_OFF_CENTER`, `_HIGH`, `_FAR`.

| Camera | Position | Looks at |
|---|---|---|
| **STRIKE ZONE (default)** | (0, 1.3, 2.9) | (0, .95, -18) |
| CLASSIC | (-.15, 1.85, 4.5) | (.3, 1, -18) |
| OFF-CENTER | (1.9, 1.8, 5.7) | (-1.6, 1, -12) |
| HIGH | (0, 3.4, 6.2) | (0, .7, -18) |
| FAR | (0, 2.6, 8.2) | (0, 1, -18) |

- Field of view: 2·atan(tan(31°)/aspect), clamped to 42–68 degrees, so a tall phone sees the same width of field as a wide monitor.
- The hitter stands large on the left edge of the frame, seen from behind and slightly to the side, bat cocked. He must never be covered by text.
- Strike zone: x −.28 to .28, y .5 to 1.15, drawn as a white outline on a dark translucent pane.
- The bat ring sits on the zone: a filled green circle with a filled red core, and the center marker (crosshair by default on touch).
- Pitcher on the mound at about z −18.4; fielders visible behind him; scoreboard and Earth above.
- When a callout is up, the name of the camera (e.g. "CAMERA: STRIKE ZONE") shows briefly in cyan on a change.

## Phone HUD layout (see `phone_03…`)

- **Top-left:** score bug. Inning with an up/down arrow, the two team codes and runs, then count and outs.
- **Top-center:** two Juice meters stacked, each a rounded bar with four segments, labeled BATTER and PITCHER. The batter's is blue, the pitcher's orange.
- **Top-right:** a small diamond showing runners, then a yellow PAUSE pill and a dark SOUND pill beneath it.
- **Right, mid-height:** the hitter's card: number, position, handedness, name, rating badge, and three letter grades (PWR, CON, SPD) in color.
- **Bottom-left:** the AIM stick: a dark circle with a gold rim and a ridged gray thumb pad, labeled AIM.
- **Bottom-right:** **POWER**, a large red circle (about 128 px, up to 32% of screen width). **CONTACT**, a smaller green circle (about 90 px) below-left of it. **JUICE**, an orange flame button with the bars in hand as a ×N badge, above them.
- Build tag in tiny type bottom-right.

## PC HUD layout (see `pc_03…`)

- Score bug top-left with the game logo tile; Juice meters top-center; diamond and pause top-right; hitter card right of center.
- **Left edge, stacked:** key legend pills: POWER · CLICK, CONTACT · R-CLICK, JUICE · SHIFT, CAMERA · C, PAUSE · ESC. The JUICE pill glows orange when lit.
- No on-screen swing buttons or stick.

## The pitch coming in (see `*_05_pitch_in_flight_timing_circle`)

- A yellow ring at the spot where the pitch will cross, closing onto a small bright baseball marker. It turns green at the on-time moment.
- The ball itself is small, white with red seams, with a thin tapering trail. It is never hidden by its own trail.

## Swing and miss (see `*_06_swing_and_miss_replay`)

- Big white italic **WHIFF!** with a dark outline, a navy plate under it with the count ("STRIKE ONE · 0-1").
- The reason in the swing's color beneath ("BALL OUTSIDE THE GREEN RING"), then the timing bar (EARLY … LATE) and the pitch line.
- In the zone: a ball marker where it crossed with the speed and pitch name beside it; the frozen green ring where the player had it, with the crosshair at its center.
- PC adds a speed box top-left ("74 MPH").

## Ball in play (see `*_07_ball_in_play_feedback_panel`, `*_08_ball_in_play_later`)

- A gold pill at top-left with the grade and exit speed ("BARRELED · 109 MPH") and a second with the distance running up in feet.
- The call in large orange italic ("PERFECT!", "OUTTA HERE!") with the timing and contact words under it in gold ("ON TIME · SQUARED UP").
- The timing bar with a small rocket marker, and the barrel picture, then the pitch line.
- The camera follows the ball; the ribbon board switches to a scrolling message (NO DOUBTER).

## Callouts (see `phone_09_callout_after_losing_a_brawl`, `pc_09_after_a_brawl`)

- One big line in italic display type, tilted slightly, with a small navy sub-plate under it.
- Achievement toasts: a dark rounded pill with a gold rim, an icon tile, "ACHIEVEMENT UNLOCKED", the name and a one-line description. Top-center, never over a player.

## Title screen and walk-up (see `phone_01_title_screen`, `phone_02_walkup_card`)

- Title: the logo (MOONSHOT in gold italic over MAYHEM on an orange slab, a baseball with a moon behind), a flaming PLAY BALL button, a tips panel, then small outlined setting pills.
- Walk-up: "PLAY BALL!" in gold across the top, the hitter full-figure, and a wide card across the lower third with his portrait, number, name, badge, grades and a perk line.

## Pitching view (see `*_10` to `*_13`)

- Camera behind and to the throwing side of your pitcher, who stands large in the foreground; the hitter, catcher and the zone are small in the distance.
- The zone shows nine squares tinted red (hot) and blue (cold) for the hitter.
- The hitter's card sits top-left as a slim bar: name, badge, PWR / CON / EYE grades.
- **Phone:** AIM stick bottom-left; a green PITCH dial with the selected pitch as a baseball-styled button beside it (abbreviation and speed, e.g. "FB 101"); the other pitches as smaller baseballs fanned around; JUICE flame button above; a small red DRILL HIM button.
- **`_11`:** selecting a breaking ball draws its predicted path to the target.
- **`_12`:** the power meter ring around the target while the bar fills.
- **`_13`:** the release: a timing ring closing on the target, with the green TAP! prompt; the pitcher mid-delivery.
- A one-line hint in orange at the bottom ("JUICE READY · TAP FOR A NASTIER PITCH").

## Defensive events (see `*_14_event_throw_him_out_inputs`, `*_15_event_out_at_the_bag`)

- `_14`: from behind the fielder, cocked to throw, the base and runner beyond him. The event name in gold italic at the top, the arrow sequence in rounded tiles under it with the current one ringed in gold, and a green timer bar. On a phone a four-way arrow pad fills the bottom.
- `_15`: at the bag, the fielder reaching for the throw, the call ("OUT!", "GUNNED DOWN!") in large cyan italic with a sub-plate.

## The ballpark (see `stadium_*`)

Dimensions (from `fenceR`, `wallH` and the scene build):

- Bases 27.43 m apart (bags at ±19.4 on the diagonals, second base at z −38.8). Mound at about z −18.4.
- Fence distance from the plate: 99 + 23·cos(2φ) meters across fair territory (φ = 0 is dead center), so about 122 m (400 ft) to center and about 99 m (325–330 ft) down the lines. Painted distance markers on the wall: 330, 379, 400, 420.
- **Right field has a triples alley:** the wall cuts in on a straight line (radius 128 m at an angle of 10°), leaving a deep 420 corner in right-center.
- Wall heights: standard 3.4 m. **Left field: "The Porch"**, a tall green wall 11.6 m high from the line to about φ = −.48 (see `stadium_03`). **Right field: "The Arcade"**, 8.6 m, a brick arcade of arches with a seating bank and patio on top (see `stadium_04`).
- **Zapp Cola Cove** beyond right field: a pool of glowing lava with a "COVE SHOTS" counter board on the arcade and a "ZAPP COLA COVE" sign (see `stadium_09`).
- **Center field:** a dark blue batter's-eye screen with a cyan frame directly behind the wall (`stadium_17`), a tall pole-mounted scoreboard to its right at x = 22, about 39 m up (`stadium_05`), and a large ring-shaped "halo" board in right-center.
- **Scoreboard face:** team names and runs on the left (KRAKENS on dark, COMETS highlighted orange), a ring with the inning in the middle, the current hitter with portrait, name and grades along the bottom, team name banners on the side panels.
- **Beyond the fence:** four light towers on lattice masts about 79 m tall at φ = ±24° and ±58°, each with a bank of lamps; blue-and-orange lunar modules, a striped rocket, a giant soda can, a satellite dish, a domed habitat, a flying-saucer and a checkered tower (`stadium_08`).
- **Stands:** a continuous steep bowl around the whole park, navy structure, filled with tiny fans in saturated mixed colors; a neon ribbon board runs the full circuit with scrolling text (KEPLER KRAKENS, LUNAR LEAGUE BASEBALL, TRANQUILITY COMETS, SEA OF TRANQUILITY, ONE-SIXTH GRAVITY, SIX TIMES THE DISTANCE, MOONSHOT PARK). Dugouts are low navy boxes along each line (`stadium_14`).
- **Playing surface:** pale gray Moon regolith with dark craters of many sizes, white foul lines and batter's boxes, white bases, a pale mound (`stadium_06` from directly above, `stadium_07` from the side).
- **Sky:** black with stars, the Earth large and blue beyond center, a red cracked planet low to the right, gray lunar ridges on the horizon (`stadium_10`).

## Characters

- Hitters wear dark armored exo-suits with glowing orange seams and a bat that leaves a gold arc when swung. Fielders are slimmer figures in team colors with name tags floating over them on PC. Your pitcher in the pitching view is a plain dark track-suit figure with a brown glove. These are placeholders for final art, but the scale and framing in the pictures are right.

## Menus and screens (phone)

- `phone_screen_11_squad_batters`: MY SQUAD. Nine player cards laid out on a diamond at their positions, each a portrait with a rating badge; BATTERS / PITCHERS tabs at the top; a bullpen strip of small cards along the bottom; a two-tab bar (SQUAD, HOME) at the very bottom.
- `phone_screen_12_squad_pitchers`: the pitching staff as a grid of jersey-number cards (gold for the starter, blue and gray for the rest), each with a badge.
- `phone_screen_19_player_card`: a single card enlarged: team strip, position, big jersey number, name, role, the pitch ratings in a row, the perk line, and YOUR STARTER / CLOSE buttons.
- `phone_screen_13_profile`: PROFILE. Name field, level and XP, a week strip, then stat tiles (games, runs, hits, homers, longest, best game, wins, streaks, derby and gauntlet bests) and buttons to Achievements and Celebrations.
- `phone_screen_14_celebrations`: a three-column grid of celebration names with the level each unlocks at.
- `phone_screen_20_achievements`: a gold career home-run-distance bar at the top, then a scrolling list of achievements with icon, name and description.
- `phone_screen_15_settings`: the title screen with its settings pills (walk-ups, aim sensitivity, ring marker, show speed, bat rings, difficulty, sound, organ, vibration, achievements, reset).
- `phone_screen_16_invite_a_friend`: BRING A FRIEND. The invite code in large type, a yellow SHARE YOUR CODE button, reward tiers, a code box with REDEEM.
- `phone_screen_24_pause_menu`: PAUSED with a column of white slab buttons (RESUME highlighted yellow, SKIP TO PITCHING, SETTINGS, RESTART GAME, QUIT TO MAIN MENU).
- `phone_screen_25_pause_settings`: the in-game settings list (camera, sensitivity, ring marker, bat rings, difficulty, how to play, how to pitch, sound, organ, vibration, field shadows, show speed).
- `phone_screen_10_now_batting_walkup`, `phone_screen_17_daily_challenge_start`: the walk-up, and the start of a Daily Challenge with its goal chip ("DAILY: GO DEEP") and situation line.

Menu styling throughout: deep navy background, gold italic headings, white slab buttons with a hard black offset shadow, thin cyan or white outlines on secondary pills.

## Camera moves on a home run (five frames each, about one second apart, left to right)

- `phone_strip_homer_trail`: **the chase camera.** Rides just behind and above the ball, looking where it is going, with the distance running up in big numbers above the ball and the flame trail streaming back. It follows the ball out of the park and down. Used on most long homers.
- `phone_strip_homer_sky`: **the blimp cut.** Jumps straight off the bat to high above the park; the ball stays small and a flame streak draws its flight across the field into the seats. For no-doubters that stay in the building.
- `phone_strip_homer_aerial`: **the aerial show.** Stays on the hitter for the swing and follow-through, then goes up over the stadium with lasers and fireworks.
- `phone_strip_homer_admire`: **the admire shot.** Stays on the hitter, low, from the pitcher's side: he holds his finish, watches it and drops the bat, with the call ("PLAKATA!", "OUTTA HERE!") above; then it cuts to the ball arriving beyond the wall.

In all of them the top-left pills keep showing grade, exit speed and the distance counting up, and any tap ends the shot.

## The picture list

See `port/look/`. File names say what each one shows.
