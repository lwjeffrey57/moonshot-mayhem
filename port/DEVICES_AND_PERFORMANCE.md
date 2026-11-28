# Devices and what we know about performance

From the owner and from the performance reports his own builds post (collection `perf` on the prototype's artifact; 50 reports held as of 28 Nov, builds 947 to 993). The owner's comments on the subject, by date, are in `port/15-performance-loading.md`.

## The devices

- **The owner tests on an iPhone 17 Pro Max.** (Not an XR. Any earlier note saying otherwise is wrong.) Screen 440 × 956 points at 3×, the biggest iPhone screen there is. Reports confirm it: every phone report is 440×956.
- **His computer is a MacBook Air M1, 8 GB**, playing at 1920 × 1080 in the Claude desktop app's built-in browser (Chromium / Electron) and in a normal browser tab.
- **Nothing else has been tested.** No small iPhone, no older iPhone, no iPad, no Android, no Windows.

## Smaller iPhones: a requirement for the UI

Everything in `port/look/phone_*` was laid out and judged on the largest phone. **The UI must also work on small iPhones**, checked in the Unity Game view and the iOS Simulator at these sizes (points):

| Phone | Points | Note |
|---|---|---|
| iPhone 17 Pro Max | 440 × 956 | the owner's phone, the reference |
| iPhone 17 / 16 / 15 | about 393–402 × 852–874 | the common size |
| iPhone 13 mini / 12 mini | 375 × 812 | narrowest with a notch |
| iPhone SE (3rd gen) | 375 × 667 | shortest; no notch, home button |

Rules to hold at every size:
- Both thumbs' controls fully on screen, clear of the safe areas (notch / Dynamic Island, home indicator), at least 44 points per touch target; the POWER button and the pitch dial stay big.
- Text and callouts never cover a player or a control. On a short screen (SE) there is far less room between the top bar and the controls: callouts shrink or move before they overlap.
- The strike zone, bat ring and ball stay the same size **in the park** (meters), not the same size in points.
- Lay out from anchors and safe areas, never from fixed pixel positions copied off the big phone.
- Send the owner a sheet of the main screens (batting, pitching, an event, walk-up card, pause, title) at all four sizes.

## What the browser build measured

Same phone and same Mac throughout, so this is a baseline for those two machines, not a survey.

**iPhone 17 Pro Max (23 reports, 56 minutes of play):**
- **56.5 frames a second on average, at full resolution** in every recent report; the 30-fps cap never engaged.
- **About 10% of frames take longer than 25 ms, in every part of the game, every build.** Nothing we changed moved it. Our conclusion: it is the browser's frame pacing on iPhone, not our load. Typical work per frame is only 2.5 to 4 ms. A native build should not have this; if Unity shows the same, look at frame pacing first, not at the scene.
- Scene size: about 107,000 to 416,000 triangles depending on the view. Batting views run about 320,000–355,000; pitching views about 155,000–195,000.
- Worst single frames 50–135 ms, mostly when a new body first appears (a Kraken's walk-up, a celebration). Three frames over 150 ms in 56 minutes.

**Mac (27 reports, 90 minutes):**
- **59.9 frames a second**, 0.1% of frames over 25 ms.
- Its weakness is rare long hitches: eight frames over 150 ms, of 200 to 650 ms, on a walk-up, the start of a ball in flight, a hit by pitch. They line up with a player body being built for the first time mid-play.

**What was wrong earlier and what fixed it (24–25 Nov, builds 645–649):**
- First-minute freezes of 200–450 ms while bodies loaded; the pitching view drawing 220,000–345,000 triangles and the game dropping resolution to about 0.78 to cope.
- Fixes that held: heavy model builds put in a queue and done one at a time at safe moments (never during a pitch or a swing); fielders hidden from the mound view; the next hitter's body fetched and dressed while the current one bats.
- Since then: no resolution drop anywhere, no freezes on the phone.

**Loading:** 15 bodies; each takes about 2–3.5 s to fetch and build in the browser (the three largest about 7 s). All files come from cache on a second visit. The title screen waits for the players before PLAY BALL.

## What this means for Unity

1. **Target 120 fps on the Pro Max** (decided), and decide a floor for older phones (60) with a quality setting that scales resolution and crowd detail, not gameplay.
2. **Never build or load a character mid-play.** Preload both rosters behind the title screen or a loading screen; the only hitches we ever had came from this.
3. **Budget:** the browser held 56 fps with 350,000 triangles and unlit materials. Unity can afford more, but measure on the phone, with the frame-time graph, not on the Mac.
4. **Memory:** the Mac has 8 GB and the editor is heavy; keep imports lean. Older iPhones have 3–4 GB: watch texture sizes (the browser build uses small JPEG textures, about 100–300 KB each).
5. **Heat and battery:** not measured in the browser. Measure a 15-minute session on the phone at 120 fps; offer a 60 fps setting.
6. **Keep the reporting idea:** a small frame-time recorder in development builds (average fps, share of slow frames, worst frames and what was on screen) so the owner's playtests keep producing numbers. Local only until there is a server (`port/SECURITY_AND_LAUNCH.md`).
