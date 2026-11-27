# Modes: Gauntlet, Derby, Daily, practice

From the prototype's `index.html`. Bold = standing rule. See `README.md` in this folder.

- `L3249 zoneHit` **THE GAUNTLET'S THIRDS**: the zone split into inside / middle / away, with the third that suits the call lit up before the first pitch of each new call. Hidden everywhere else.
- `L5178 endGame` (a Daily Challenge has its own result screen)
- `L5362 toMenu` RESTART restarts what you were playing: the practice, the derby, the gauntlet or today's challenge, not a full game
- `L6743 dailySpec` (the boss day: the toughest hitter, and nothing gets through)
- `L6745 dailySpec` (already ahead: the goal becomes driving in a run, so no day is won before a pitch is thrown)
- `L6745 dailySpec` (and never a lead that one swing cannot reach)
- `L6746 dailySpec` Friday: go deep with Overdrive ready. Wednesday: a man on first and a run to make with your legs. (Defense and wild-card days use the batting set until they have their own.)
- `L6753 scnCheck` STREAK (groundwork; nothing shows it yet). A day counts when the daily is PLAYED, whatever the result. One freeze is earned every 7 days of streak (three held at most) and is spent by itself on a missed day, so one bad day never ends a long run. All dates are local YYYY-MM-DD.
- `L6771 streakPlay` ── HOME SCREEN, DAILY CHALLENGE, PROFILE ────────────────────────────────────────────────────────────────────────────────────────────
- `L6806 dailyTick` the play that settled it is allowed to finish: the homer lands, he rounds the bases, the strikeout gets its beat
- `L6812 dailyEnd` the day's full XP is paid once; a replay for more stars pays a little
- `L6814 dailyEnd` ── BATTING PRACTICE and HOME RUN DERBY: the batting game with the rules stripped away. No outs that end anything, no runners, no pitching half. Practice never ends (leave from the pause menu). The derby is ten outs: anything that is not a home run is an out. ──
- `L6819 derbyPick` **WEEKLY CHALLENGE** (first draft). One hitter and one pitcher, the same for everybody, changed every Friday. Three outs and you are done. Every fair hit scores (100 a base, a homer 400 plus its distance in feet) times your multiplier. The multiplier grows with every hit in a row (+0.5), every homer (+1 more) and every ball you lay off (+0.25), and goes back to 1 on an out. Every four hits the pitching moves up a difficulty, Rookie to Intergalactic.
- `L6832 modeStart` batting practice is the hitter and the pitcher: nobody shagging
- `L6832 modeStart` nobody in the field: it is the hitter, the pitcher and the fences
- `L6836 modePA` **THE DERBY IS SCORED**. Every home run is worth its distance in feet, and the things standing beyond the wall are targets: the bigger and nearer, the smaller the bonus; the smaller, higher and deeper, the bigger. Each has its own call.
- `L6841 derbyPitch` a swing that missed or went foul is an out; a pitch you let go costs nothing, and there is no count
- `L6853 modeEnd` ── THE GAUNTLET: before every pitch the game names a field and a kind of ball. Put it there and you score the call plus the distance in feet; put a fair ball anywhere else and you lose the call's value. Ten pitches to fill the meter; fill it early and the pitches you saved are a bonus. Each round asks for more and the pitching gets nastier. ──
