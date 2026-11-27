# What we want to be better in Unity

The prototype is where the game was found. It is not where it ends. This is the list of what the owner wants improved, added or finally done properly, gathered from the whole record. Nothing here is permission to change how the game plays; it is where to aim the extra quality Unity makes possible. See `BACKLOG.md` in the repo root for the older running list.

## The owner's own ranking of the weakest areas (27 Nov)

1. **Cameras and animations for the fielding events, especially plays at the bag.** He wants a proper "ready to make the tag" fielder, a real tag, and a runner who visibly slides in safe or is put out. The boxer's stance and jab that used to stand in for these are gone, but what replaced them (the ready crouch and a first-baseman's stretch at every base) is a stopgap.
2. **The fielder fielding the ball and shuffling into a throw.** Currently a ready crouch, a faked shuffle and one overhand throw for everything.
3. **A consistent baseball.** Same size and look everywhere; it was up to 1.6× too big in close-ups until build 977.
4. **Pitching and defense should feel as good as hitting.** Hitting is the part he calls fun. Pitching got its Juice loop, stamina, ratings and release feedback late; defense is mostly events.

## Animation (the single biggest upgrade Unity offers)

The prototype plays one clip at a time and fakes the rest: bodies are slid and turned by code, a hop is a bob, the ball is pinned to a wrist. Rebuild with proper blending, foot planting, hands reaching to the ball, and retargeting across bodies.

Clips still missing, to be captured by the owner (shoot square to the throwing direction, whole body in frame):
- Ground ball into a throw, one take: charge, field out front, two shuffles, throw.
- Outfield crow hop into a full throw with follow-through.
- A short-arm infield throw for bang-bang plays.
- A tag at the bag: receive the throw, swipe down.
- A runner called safe: slide in, pop up or signal.
- A batter catching a pitch bare-handed in Overdrive (seen in the old Slugfest games; the owner wants it eventually).

Known problems with clips we have: the captured throw strides about 33° off the model's forward (corrected in code); one of the two dives had its catch moment after the hand was on the ground (corrected); the "catch" clip is a catcher's squat and must never be used for a fielder.

## Feel and fairness (carry these standards up, do not lower them)

- Every outcome must match what the player did: picture, words and the umpire's voice.
- Every miss explains itself. Every swing produces a swing.
- Lost events should be shown clearly, with what they cost, not skipped past. A real "he's safe" moment is wanted.
- Every event should feel like a climax: lead-in, freeze for the inputs, payoff.
- Throws should look like seeds: flat, small ball, smoke and sometimes flame.
- Variety everywhere: ball paths to every part of the park, several home-run cameras, callouts that do not repeat.

## Performance and devices

- The browser build on iPhone showed 10–13% long frames from browser frame pacing on a 120 Hz screen and ran close to its memory limit. A native build should hold a steady frame rate; decide 60 or 120 on purpose.
- Keep load time short and never show an empty batter's box while a body loads.
- Target a 2020-era iPhone and an 8 GB M1 Mac.

## Things that need an app and do not exist yet

- Saves that survive a reinstall, accounts, and one account across phone and PC.
- A server: leaderboards, the invite rewards, eventually head-to-head and ranked play.
- Purchases and (optional, rewarded-only) ads. See the strategy doc in the private owner record for the model and the lines not to cross.
- Notifications for the daily streak.
- Replacement audio: every recorded sound is a placeholder (see the sound audit in the owner record).

## Modes and systems designed but not built

- **Lunar League Cup:** the campaign as a tournament run with stops between rounds. Designed in the strategy doc; three open questions there.
- **Player cards, packs and an unlock loop,** including legendary players. Ideas only.
- **In-game currency.** Undecided.
- **A batting cage** reachable from the title screen. Recommended by the competitor research; practice mode exists.
- **Season mode and leaderboards** (phases 2 and 3 in the strategy doc).
- **Commentary** in the spirit of the old Slugfest broadcasts. Idea only.

## Open questions waiting on the owner

- Gauntlet timing feedback: what should it tell the player?
- Should the other big props beyond the fence stop a home run the way the light towers now do?
- Keep, rename or remove the four test relievers (Wild Thing, Soft Toss, One Trick, Mop-Up)?
- Is "drained after one inning" the real stamina rule or a placeholder?
- Enforce or drop "cannot steal or stretch a hit" on Brickhouse's card?
- Bring back the hitter's reaction after being robbed?
- Pricing and ad questions in the strategy doc.

## Built late and barely playtested (treat as provisional)

Everything from build 963 on, shipped 27 Nov: throw lead-ins and crow hop, throw trails, the dive and wall-leap fixes, the blimp home-run camera, rob-the-homer event, light-tower caroms, the pitching Juice loop, per-pitcher stamina and the change-pitcher chip, pitcher grades, control-driven timing, brawls when you drill a hitter, the two new perks (Scouting Report, Sign Stealer), the test relievers. Port them, but expect the owner to change them.
