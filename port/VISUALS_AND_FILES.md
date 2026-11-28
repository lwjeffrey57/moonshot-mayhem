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

- **Portraits now (rule):** every portrait shows the player **facing the camera, head level, evenly lit.** The prototype takes each head shot in the game: the head is lifted square to the lens for the photograph, the player alone is rendered on a studio backdrop, and each shot is brightened to the same average level (`faceShot` in `index.html`). In Unity, render portraits offline from a fixed portrait pose and light rig and ship them as images; do not photograph mid-animation.
- **Card art later (not started, the owner's idea):** head shots are fine for now, but the cards should become proper baseball-card pictures: a player mid-swing, mid-pitch or mid-throw, with the **background matching the card's jewel tier** (Bronze, Silver, Gold, Diamond, Ruby) for rarer cards. Proposed workflow, for the owner to approve before anyone builds it:
  1. Pose each model in Unity from a real clip frame (swing contact, release point, throw) under a fixed three-point light rig, and render it large on a transparent background. This keeps every player on-model.
  2. Make the backgrounds and frames per tier as separate layers (these can be drawn or made with an image generator, since they contain no player).
  3. Composite pose + tier background + frame + name plate in a small script, so a new player or a new tier is one command.
  4. Only use an image generator on the player himself if the owner wants a painted look, and then check every result against the model: generators drift off-model and can produce art that resembles real players or brands, which must be avoided for release.
