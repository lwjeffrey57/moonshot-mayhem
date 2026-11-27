# How to use all of this (read first)

You are building the real Moonshot Mayhem in Unity. A separate session (the "web session") built the prototype with the owner over two weeks and about 990 builds, and holds the full history. This folder is that history made usable. You cannot hold all of it in mind at once, so use it the way described here.

## What you are and are not building

- **The prototype is a design reference, not a finished game and not a spec to freeze.** The decision to move to Unity was made so the game could grow: better animation, more modes, accounts, a store version. Expect the design to keep changing. The prototype is still being tuned every day; pull before each piece of work.
- **What must carry over exactly:** how it plays and reads. Rules, numbers, timing, controls, wording, layout, camera framing. The owner tuned these by hand over hundreds of playtests and should never have to find the same problem twice.
- **What should get better in Unity:** animation (the prototype stitches clips by hand), art quality, performance, and everything that needs an app: saves, accounts, purchases, real audio.
- **What is placeholder in the prototype:** character art, stitched animations, the recorded sounds (not cleared for release), and the IMGUI-style test rigs you have built so far.

## Mobile first, and why

The iPhone is the lead device. Build and judge everything there first; the Mac/PC build follows from the same project.

- **That is where the players are.** Every competitor the owner studied (MLB The Show Mobile, MLB Pro Spirit, Baseball 9, Baseball Clash, Super Hit Baseball) is a phone game. Their sessions are one to three innings, a few minutes long.
- **The game is designed around a phone session:** a three-inning game, a 90-second Daily Challenge, everything skippable, a daily habit loop.
- **The phone is the hard constraint.** Small screen, two thumbs, no hover, limited memory, and a player holding it in portrait. A layout or control that works on the phone carries to PC; the reverse does not.
- **It is how the owner plays and tests.** He judges feel on his iPhone.
- **It is why this port exists.** The browser prototype hit a ceiling on iPhone (uneven frame pacing and memory limits it could not fix). A native build removes it.

What this means in practice: portrait first; controls sized and placed for thumbs (see `LOOK.md`); nothing under a thumb that is not a control; text large enough to read at arm's length; never cover the players; every wait skippable; target a steady frame rate on a four-year-old iPhone before adding effects.

## What is in this folder

| File | Use it for |
|---|---|
| `LOOK.md` + `look/` (about 75 images) | What anything looks like. Open the picture before building a screen, camera or scene. |
| `01`–`16` `*.md` | The rules for a system, in the words written next to the code. Bold = standing rule. |
| `code/NN-*.js` | The prototype's own functions for that system, readable. The final word on behavior short of `index.html` itself. |
| `data/TABLES.md` | Every table: rosters, ratings, pitches, perks, tiers, events, badges, cameras. Copy, never retype. |
| `data/STRINGS.md` | Every word shown to the player. Use exactly. |
| `data/SOUNDS.md` | Which sound fires at which moment. |
| `data/ASSETS.md` | Models (base64 FBX, decode and import), textures, clips and their lengths. |
| `data/flight_cases.json` | 1,428 ball flights from the prototype to test your flight against. |
| `ui/style.css`, `ui/markup.html` | Exact sizes, positions, colors and animations of every HUD element and menu. |
| `BALL_FLIGHT.md` | How a batted ball behaves and why variety matters. |
| `HISTORY.md` | Every change shipped, oldest first. Use it to see what was tried and reversed. |
| Root: `PORT_SPEC_*.md` | Requirements for a system, written by the web session before you start it. |
| Root: `UNITY_REVIEW.md` | Your current fix list. Latest review on top. |
| Private, in the Unity project's `owner/` folder | The owner's 874 messages, the day-by-day conversation, the strategy doc (daily loop, campaign, monetization, competitor research) and the sound audit. Never copy these anywhere public. |

## The routine for each system

1. **Pull** the prototype repo.
2. **Read** that system's `NN-*.md` end to end, its `code/NN-*.js`, and its `PORT_SPEC_*.md` if one exists. Look at the pictures that show it.
3. **Search** the owner record for the system's words (`grep -ri "late swing" owner/`) to learn why a rule exists before touching it.
4. **List** the bold rules you will implement and any you will not, before writing code. Send that list to the owner.
5. **Build** the shared core first (no scene code), then the thinnest possible scene around it. Copy tables from `data/TABLES.md`.
6. **Test against the prototype:** numbers from the code, flights from `flight_cases.json`, wording from `STRINGS.md`, layout against the pictures.
7. **Report** in plain words: what matches, what does not yet, what you could not check. Push. The web session will review your code and add to `UNITY_REVIEW.md`.
8. **Do not start the next system** until the review list is cleared or the owner says go.

## Rules of the house

- Never "improve" a tuned number or reword a callout. If something looks wrong, ask; it was probably deliberate.
- A player who wins an event must never get the wrong result or the wrong call, in picture, text or sound.
- A swing is never ignored. Pace of play comes first. Text never covers players or controls. The ball looks the same size and style everywhere.
- Variety is a requirement: ball paths, cameras, callouts and celebrations should not repeat predictably.
- When the record and the code disagree, the code wins. When you and the record disagree, the record wins.
- Never put any key in a file. The owner's email is private. Ask before deleting.

## How to find things fast

- A rule about X: `grep -rn "X" port/*.md`.
- The exact behavior: open `port/code/NN-*.js`, find the function, read it.
- A number: `data/TABLES.md` or the function. Line references (`L1234`) point into `index.html`.
- What a screen looks like: `ls port/look | grep <word>`.
- Why something is the way it is: `grep -ri "<word>" owner/` then read the surrounding conversation in that day's file.
- What changed recently: `git log --oneline -30` in the prototype repo.

## Talking to the owner

Former ballplayer, no game-dev background, playing on an iPhone and a Mac. Plain words, baseball language, American spelling. Short, honest reports: what you verified and what you did not. He is tired of repeating himself; when unsure, search the record before asking. One clear question at a time, with your recommendation.
