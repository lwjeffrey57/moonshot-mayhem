# Moonshot Mayhem: Unity port handoff

Paste this as the first message of a Claude Code session opened on the Mac in the `moonshot-unity` folder.

**First thing to do with this note:** save its contents as `CLAUDE.md` in the root of the `moonshot-unity` folder, so every future session here starts with it loaded. Keep that file up to date as decisions are made.

## Who and what

- The owner is a former ballplayer with no game-dev background. Explain in plain words, use ballplayer language, American spelling, and keep reports short and honest about what was and was not verified.
- Moonshot Mayhem is an original arcade baseball game. The playable prototype is one HTML file (three.js) in the GitHub repo `lwjeffrey57/moonshot-mayhem` (`index.html`, about 7,000 long lines). That prototype is the design reference. It keeps being tuned in a separate cloud session; do not edit it from here.
- This Unity project (`moonshot-unity`, Unity 6.6, Universal 3D, local, no source control yet) is where the real game gets built.

## Hard rules

- Never write any API key into a file, commit, or setting. The owner once pasted a Tripo key in chat; it must not appear anywhere.
- The owner's email is private. Do not send it to any outside service.
- Ask before deleting anything or doing anything hard to undo.
- Phone (iPhone) is the lead device; run on the Mac daily so PC never falls behind.
- Pace of play matters: everything skippable, nothing that makes the player wait.
- Text and callouts must never cover players or controls.

## First session goals, in order

1. Look at the project and report what is there (Unity version, render pipeline, packages, whether `com.unity.pipeline` / Unity CLI is installed and usable from the terminal).
2. Work out how you will drive the editor: the Unity CLI with the pipeline package, or a free open-source MCP bridge. Recommend one and say why. Do not install paid tools.
3. Set up git properly for a Unity project (Unity ignore list, large-file handling for art) and ask the owner before creating a GitHub repo.
4. Do not start porting gameplay until the owner says go.

## Port plan (already agreed)

- Build ONE shared core (hitting, pitching, defense, baserunning, QTE events) and make every mode a thin rule set on top, so a core change applies everywhere.
- Order: hitting first, then pitching, then defense and baserunning events, then Play Ball on top. Other modes (Gauntlet, Derby, later a cup mode, multiplayer) are built once, here, after that.
- Feel transfers as rules and numbers taken from the prototype: timing windows, exit speed, launch and spray angles, pitch speed/break/control effects, stamina, Juice economy, QTE lengths, perk effects. Read them from `index.html` in the repo rather than guessing.
- Animations: the prototype stitches phone-captured clips by hand. Rebuild that properly here (blending, reaching a hand to the ball, retargeting). Known gaps to capture later: ground ball into a throw, outfield crow hop and throw, short-arm infield throw, a tag at the bag, a runner called safe.
- Store version later needs: accounts and a server, purchases, replacement audio (current audio is not cleared for release).

## Machine

- MacBook Air M1 2020, 8 GB RAM, about 85 GB free disk. Keep the project lean; avoid huge imports without asking.

## Parity with the prototype (added after the hitting port)

The owner has playtested the prototype exhaustively. Every piece of his feedback is already built into `index.html`: the numbers are the tuning, and the capitalized comments beside them (several hundred, e.g. `/* A SWING IS NEVER IGNORED ... */`) record what he asked for and why. Treat those comments as requirements, not history.

The goal is that he never has to re-find a problem he already found once.

1. **Port behavior, not just formulas.** For each system, list the rules stated in the prototype's capitalized comments for that area and confirm each one in Unity. Report any you skipped, by name.
2. **Test against the prototype, not against your reading of it.** Prefer recorded input/output cases produced by the running prototype (the web session can generate them into this repo as JSON) over re-deriving numbers by hand.
3. **Never "improve" a tuned number.** If something in the prototype looks wrong, ask; it was probably tuned on purpose.
4. **Say what cannot be machine-checked** (input latency, camera feel, animation timing) so his playtesting is spent only there.
5. When the prototype changes, the web session notes it in the repo history; re-read the affected area before building on it.

## The full record: `port/` (added 2026-11-27)

The `port/` folder in the prototype repo holds every comment from `index.html`, sorted into 16 files by system (about 1,800 entries). Each entry is a detail that was built, tuned or ruled on during the owner's playtesting. Bold entries are standing rules.

Before porting any system: read its `port/NN-*.md` file end to end, plus the matching `PORT_SPEC_*.md` if one exists, and list back which bold rules you implemented and which you did not. `port/README.md` is the index. The folder is regenerated when the prototype changes, so pull before each system.

## Start here (updated 2026-11-27, late)

Read `port/HOW_TO_USE.md` before anything else. It explains what every file in `port/` is for, the routine to follow for each system, why this is a mobile-first build, and that the prototype is a living reference that will keep changing, not a finished design to freeze. Then `port/IMPROVE.md` for what should be better in Unity, and `port/LOOK.md` with its pictures.

The private `owner/` folder in the Unity project (delivered by the owner, never to be made public) holds his 874 messages, the day-by-day conversation, `PRODUCT.md` (mobile first, retention, monetization) and the full strategy doc. Read `owner/README.md`, then `owner/OWNER_MESSAGES_ONLY.md` in full, then `owner/PRODUCT.md`.
