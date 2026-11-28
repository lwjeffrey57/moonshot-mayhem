# Moonshot Mayhem (web build)

Original arcade baseball game in one file: `index.html` (three.js r128). This repo is the playable prototype and the design reference for the Unity port. The Unity project lives separately on the owner's Mac; see `UNITY_HANDOFF.md`.

## The owner

Former ballplayer, no game-dev background. Plain words, ballplayer lingo, American spelling. Short, honest reports: say what was verified and what was not. He sends many small requests, often mid-work, and plays on iPhone and PC. He is often on an older cached build: remind him to reload and check the build tag bottom-right.

## Every change

1. Edit `index.html` only with exact, count-checked replacements. Do not break anything; do not disturb the hitting feel.
2. Bump `BUILD n` in the `#bld` tag.
3. Syntax-check the main script (`node --check`) and run the regression checks before shipping.
4. Commit and push to `main`.
5. Publish to the same artifact: https://claude.ai/artifact/W9JdkjsPVHRpAd5bLwbHHJ
6. **Always pass it on to the Unity chat without being asked** (owner's standing instruction, 28 Nov): every fix or rule change made here gets a numbered item at the top of `UNITY_REVIEW.md` (what changed, why, where in the code), pushed with the build. He should never have to say "make sure the other Claude knows".
7. Report briefly. For each request, also say whether it belongs here (rules, numbers, feedback) or should wait for Unity (animation polish, screens, saves, networking).

## Design rules

- Mobile first (iPhone), PC too.
- Pace of play: everything skippable quickly, no dead waits.
- Text and callouts never cover players or controls.
- A player who wins an event must never get the wrong result or the wrong call.
- Avoid "I've seen everything": variety in ball paths, cameras, callouts.
- Ball size and look stay consistent across views.

## Never

- Never write any API key into a file, commit or artifact. A Tripo key was once pasted in chat and must not appear anywhere.
- The owner's email is private; never send it to an outside service.
- Ask before deleting or anything hard to undo.

## Performance reports

Players' builds post reports to the artifact database, collection `perf`. A scheduled task checks them about every four hours: summarize what is new, keep the newest 40 when it grows past 60, and only make low-risk fixes unattended.

## Known limits

- iPhone shows a steady share of slow frames from browser frame pacing; not fixable in this build.
- Stitched animations here are placeholders; real polish happens in Unity.
