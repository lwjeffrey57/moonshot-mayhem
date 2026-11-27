# Moonshot Mayhem: Unity port handoff

Paste this as the first message of a Claude Code session opened on the Mac in the `moonshot-unity` folder.

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
