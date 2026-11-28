# Everything decided in the prototype, by system

**Start with [`HOW_TO_USE.md`](HOW_TO_USE.md).** Then [`IMPROVE.md`](IMPROVE.md) (what we want better in Unity), [`UNITY_OPPORTUNITIES.md`](UNITY_OPPORTUNITIES.md) (what the engine lets us do that the browser could not), [`TRAILS_AND_EFFECTS.md`](TRAILS_AND_EFFECTS.md) (every trail, marker and impact effect), [`TIMING.md`](TIMING.md) (how long everything takes and what changes it) and [`BALL_FLIGHT.md`](BALL_FLIGHT.md).

Pulled automatically from every comment in `index.html` at the time of writing. Each line is something that was built, tuned or ruled on during playtesting, in the words written next to the code that does it. **Bold** lines are standing rules (written in capitals in the code). `L` is the line in `index.html`; the name after it is the function it sits in. Where a line here and the code disagree, the code wins.

Use: before porting a system, read its file end to end and treat every bold line as a requirement.

- [`01-hitting.md`](01-hitting.md): Hitting: swing, contact, timing, feedback (206 entries)
- [`02-ball-flight-and-park.md`](02-ball-flight-and-park.md): Ball flight and the ballpark (139 entries)
- [`03-cpu-pitching.md`](03-cpu-pitching.md): Pitching against you (the CPU pitcher) (59 entries)
- [`04-you-pitch.md`](04-you-pitch.md): You pitch (pitching duel) (274 entries)
- [`05-defense-fielders.md`](05-defense-fielders.md): Defense and fielders (102 entries)
- [`06-events-qte.md`](06-events-qte.md): Events (QTEs), baserunning offers, steals (98 entries)
- [`07-baserunning.md`](07-baserunning.md): Runners, trots, celebrations (72 entries)
- [`08-brawl-hbp.md`](08-brawl-hbp.md): Hit by pitch and brawls (40 entries)
- [`09-juice-overdrive.md`](09-juice-overdrive.md): Juice, Overdrive, Locked In (41 entries)
- [`10-perks-players.md`](10-perks-players.md): Players, ratings, perks, cards (38 entries)
- [`11-cameras.md`](11-cameras.md): Cameras (80 entries)
- [`12-hud-callouts.md`](12-hud-callouts.md): HUD, callouts, layout rules (102 entries)
- [`13-modes.md`](13-modes.md): Modes: Gauntlet, Derby, Daily, practice (18 entries)
- [`14-audio.md`](14-audio.md): Audio (63 entries)
- [`15-performance-loading.md`](15-performance-loading.md): Performance, loading, memory (85 entries)
- [`16-stadium-and-other.md`](16-stadium-and-other.md): Stadium, presentation and everything else (415 entries)
- [`HISTORY.md`](HISTORY.md): every change shipped, oldest first (917 entries)
- [`LOOK.md`](LOOK.md) and `look/`: what everything looks like. 55 photographs of the running prototype (phone, PC and the stadium) with the camera positions, colors, fonts and field dimensions behind them. **Read this before building any screen, camera or scenery.**
- [`data/TABLES.md`](data/TABLES.md): every data table, copied verbatim: rosters, ratings, pitches, perks, difficulty tiers, event definitions, callout lists, badges, cameras (94 tables).
- [`data/STRINGS.md`](data/STRINGS.md): every word the game says, grouped by where it is shown (about 1,400 lines of text).
- [`data/ASSETS.md`](data/ASSETS.md): every model, texture, sound and animation clip, with clip lengths. Models are base64 FBX and convert straight to files Unity imports.
- [`ui/style.css`](ui/style.css) and [`ui/markup.html`](ui/markup.html): the complete stylesheet and page markup, verbatim: exact sizes, positions, colors and animations of every HUD element and menu.
- In the repo root: `PORT_SPEC_HITTING.md` (requirements for hitting), `PORT_SPEC_PITCHING.md` (requirements for pitching), `PORT_SPEC_FIELDING.md` (requirements for fielding judgment), `PORT_SPEC_FLOW.md` (what plays after what, and what a tap skips), `port/ACHIEVEMENTS.md` (how achievements are awarded and shown), `PORT_SPEC_SHOW.md` (crowd, home-run show, horn, cameras, celebrations and taunts, glove fit), `port/SECURITY_AND_LAUNCH.md` (hard requirement: secrets, servers, store and legal), `port/VISUALS_AND_FILES.md` (what look is fixed, what is open to improve, where every visual file is), `PORT_SPEC_DIFFICULTY_AND_CONTACT_ZONES.md` (the seven tiers and exactly how the green ring, red core and middle-middle work), `PORT_SPEC_CONTACT_FEEL.md` (everything that makes hitting feel right: effects, read-outs, callouts, crowd, swing, bat, delivery, sound), `UNITY_REVIEW.md` (what to fix), `BACKLOG.md` (ideas and open items), `CREDITS.md` (where assets came from and their terms).

## Order to read in

1. The owner record (private, delivered separately): who he is and how he talks.
2. `LOOK.md` and the pictures.
3. The numbered file for the system you are about to build, end to end.
4. `data/TABLES.md` and `data/STRINGS.md` for that system's tables and wording.
5. `index.html` for anything still unclear. It is the final word.
- [`code/`](code/): the prototype's own functions, sorted by system and reformatted one statement per line (208 functions).
- [`data/SOUNDS.md`](data/SOUNDS.md): which sound fires at which moment.
- [`data/flight_cases.json`](data/flight_cases.json): 1,428 ball flights computed by the prototype, for testing the Unity flight.
