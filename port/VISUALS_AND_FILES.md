# The look: what to keep, what you are free to improve, and where every visual file is

From the owner, 28 Nov: he really likes the stadium design, its features and the overall design of the level. He also knows this is not the final version. **He is open to visual improvements, especially now that the game is in Unity.** The prototype is a strong foundation, not a ceiling.

## What is fixed and what is open

**Keep (these are the design):**
- The park's layout and dimensions: wall distances and heights, the tall walls in the corners, the patio, the cove, the batter's eye, the light towers, the Moon setting. Ball flight and fielding depend on them (`BALL_FLIGHT.md`, `PORT_SPEC_FIELDING.md`).
- The park's features and their character: the Moon surface, the Earth in the sky, the lander, dome, UFO, rocket, fuel tanks, satellite dish, the scoreboard and ribbon boards, the arcade and porch.
- The colors and fonts of the HUD, and everything in the owner's rules about text never covering players or controls.
- Ball size and look consistent across views.

**Open (bring ideas):**
- Lighting, shadows, materials, sky, crowd, post-processing, surface detail, the quality of every model and texture, the scoreboard content, effects.
- `UNITY_OPPORTUNITIES.md` already lists what the browser could not do. Treat that as a starting list, not the limit.

**How to propose a visual change:** show a before and after picture on the phone, say what it costs in frame rate, and ask. One at a time. Never change the layout or a gameplay-relevant size without asking.

## Where the visual files are

Everything is in the prototype repo (`lwjeffrey57/moonshot-mayhem`, branch `main`). Nothing visual lives only in the cloud session.

| What | Where | Notes |
|---|---|---|
| Models (players, park props, bat, glove) | repo root, `*.txt` | FBX stored as base64 text. `base64 -d -i name.txt -o name.fbx`. Full list with sizes in `port/data/ASSETS.md`. |
| Textures | repo root, `*_d*.jpg` (color), `*_n*.jpg` (normal), `*_s.jpg`, `moon_d/n.jpg`, `earth.png`, `stars.jpg`, `sky.jpg` | Listed in `port/data/ASSETS.md`. |
| Animation clips | repo root, `ely_clips.min.json`, `clips.json` | Names, lengths and what each is for in `port/data/ASSETS.md`. |
| The park itself | built in code, not a model file | `port/code/02-ball-flight-and-park.js` holds the geometry and dimensions; `port/LOOK.md` "The ballpark" describes it; `port/look/stadium_*` shows it from many angles. |
| Reference pictures | `port/look/` (about 80) | `phone_*`, `pc_*`, `stadium_*`, `phone_screen_*`, `phone_strip_*`. Index at the end of `port/LOOK.md`. |
| HUD style | `port/ui/style.css`, `port/ui/markup.html` | Exact colors, sizes, fonts. |
| Trails and effects | `port/TRAILS_AND_EFFECTS.md` | Definitions and code. |
| Button and badge art | drawn in code as SVG inside `index.html` | Search `pdBallSvg`, `badge`, `#jbtn` in `index.html`. |

About 117 MB in all. Per the owner's rule, tell him the size before pushing more models or textures into the Unity repo.

If something you need is not in this table, say so in `REVIEW_REPLIES.md` and the web session will find it or capture it.

## Player portraits and card art (owner, 28 Nov)

- **Portraits must look good, and must cost nothing while playing (owner, 28 Nov).** They are the face of every card, the walk-up, the squad screen and the scoreboard, so they matter for presentation before launch. They must never slow the game.
  - **The look:** the player facing the camera, head level and square to the lens, eyes visible, evenly lit by a proper three-point setup (key, fill, rim), shoulders in frame, a clean studio backdrop in the club's colors. Sharp at every size it is shown, on a 3× phone screen. No stretched low-resolution pictures, no faces looking at their feet, no blown-out or muddy faces. Same framing and lighting for every player so the cards look like a set.
  - **What went wrong in the prototype, so it is not repeated:** portraits were photographed in the middle of a game, at 160 pixels, in whatever pose and light the player happened to be in, then brightened afterwards. They came out looking down, blocky and blotchy. BUILD 994 and 997 fixed it (head lifted square to the camera, shot at 768 pixels with studio lights, kept at 384): see `faceShot` in `index.html`.
  - **In Unity: make them ahead of time, not during play.** Render every portrait once in the editor from a fixed portrait pose, camera and light rig, and ship them as image files (about 512 pixels square, compressed). At run time a portrait is just a picture: no extra cameras, no render textures, no cost per frame. Write the render as a one-command editor tool so a new player, a new uniform or a new look regenerates the whole set in one go.
  - **Check:** a sheet of every Comet and every Kraken at the size the squad screen shows them, and at the small size on the walk-up card, sent to the owner.
- **Card art later (not started, the owner's idea):** head shots are fine for now, but the cards should become proper baseball-card pictures: a player mid-swing, mid-pitch or mid-throw, with the **background matching the card's jewel tier** (Bronze, Silver, Gold, Diamond, Ruby) for rarer cards. Proposed workflow, for the owner to approve before anyone builds it:
  1. Pose each model in Unity from a real clip frame (swing contact, release point, throw) under a fixed three-point light rig, and render it large on a transparent background. This keeps every player on-model.
  2. Make the backgrounds and frames per tier as separate layers (these can be drawn or made with an image generator, since they contain no player).
  3. Composite pose + tier background + frame + name plate in a small script, so a new player or a new tier is one command.
  4. Only use an image generator on the player himself if the owner wants a painted look, and then check every result against the model: generators drift off-model and can produce art that resembles real players or brands, which must be avoided for release.

## The field markings: what is right today, exactly (owner, 28 Nov)

The owner likes how the field is marked and wants it carried over. Prototype coordinates: home plate's front edge center at the origin, pitcher toward −z, first base toward +x; meters. `APEX` = 0.216 is the back point of the plate, where the foul lines meet. Code: `paintField` and the `home` texture in `index.html` (also in `port/code/02-ball-flight-and-park.js`). Pictures: `port/look/stadium_*`.

**Home plate area (regulation):**
- **Plate:** white five-sided, 0.44 m wide, thin dark outline: corners (−.22, −.22), (.22, −.22), (.22, 0), (0, .22), (−.22, 0).
- **Batter's boxes:** two, 4 ft × 6 ft (1.219 × 1.828 m), inside line 6 in off the plate (0.368 m from the center line, outside line at 1.587 m), centered on the plate front to back (±0.914 m). **4 in chalk** (0.10 m), square corners.
- **Catcher's box:** lines from the back corners of the batter's boxes area at x = ±0.546 m running back to 2.44 m behind the plate's back point, closed across the back.
- **Foul lines are not chalked inside the batter's boxes:** each picks up at the front outside corner of the box and runs out from there.
- All of this sits in a dirt circle of radius 3.1 m (the markings are clipped to 4.15 m).

**Foul lines:** from the plate's back point at 45° each way, all the way to the wall (drawn to 99 m), chalk off-white (#e9e9e2), about 12 cm wide. **The line is fair:** a ball touching any part of the chalk is fair (`LINE_TOL`).

**The infield:**
- **Bases:** first (19.4, −19.4), second (0, −38.8), third (−19.4, −19.4): a 27.4 m (90 ft) square.
- **Infield skin (dirt):** a circle of radius 29 m centered on the mound (0, −18.4), cut off behind the plate by the two lines from (0, 2.2) through (±62, −59.8).
- **The grass diamond inside it:** corners (0, −1.5), (17.9, −19.4), (0, −37.3), (−17.9, −19.4), leaving dirt base paths about 1.5 m wide round the outside of it.
- **Mound:** dirt circle of radius 2.74 m (18 ft across) at (0, −18.4), a smooth dome 0.25 m high, with a white rubber 0.61 × 0.15 m on top.
- **Edges are chalked:** wherever dirt meets grass (infield skin, base paths, mound, warning track) there is a white line about 40 cm wide, "the way the old dome parks painted them on the carpet." This is a look the owner chose; keep it.
- Mowing pattern: two directions crossing at 45°, stripes 5.2 m wide. Worn patches where the fielders stand and round each base.

**Warning track:** dirt, from 4.6 m inside the wall to the wall, following the wall's curve all the way round, chalked on its inside edge.

**Rule that sits on top of all of it:** nothing may cross the strike zone or the bat ring. The surface pattern is kept faint in the lane from the plate past the mound, behind the strike zone.

## The bases: an area to improve (owner, 28 Nov)

In the prototype the three bases are plain white boxes, 0.42 m square and 9 cm tall, turned 45°. The owner's notes: **they look like low-poly squares, and players' feet and bodies clip through them** during celebrations on the bag.

For Unity:
- Model a real base: 15 in square (0.381 m), 3 to 5 in tall, soft rounded top and beveled edges, a slightly off-white canvas material with stitching and scuffs, sitting in a small worn dirt patch. First and third sit **inside** the foul line with their outside edges on it; second is centered on its point.
- **No clipping:** feet plant on top of the bag or beside it, never through it. Use foot IK against the base's collider in every clip that happens at a bag (celebrations at second and third, slides, tags, the stretch at first), and place the clip's root so the body is beside the bag, not inside it.
- Home plate is flush with the ground and has the same rule: no feet sinking into it.
- Check with close-up pictures of each celebration at second and third, and the slide and tag clips when they exist.
