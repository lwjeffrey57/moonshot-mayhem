# Achievements

Asked for by the owner on 28 Nov. The full list with every name, description and icon is the `BADGES` table in `port/data/TABLES.md` (148 of them as of BUILD 993). This file is how they work.

## How they work

- **Earned once, kept on the device** (`mm_badges3`). The count shows on the title screen: "Achievements: n / 148", which opens the trophy case.
- **The plate:** a pill that drops in under the top bar: icon, ACHIEVEMENT UNLOCKED (or just ACHIEVEMENT when it has been earned before), the name, and what it took. Up for 3 s, with a short rising chime and a buzz.
- **A feat already in the case can still be called once per game** (so a 500-footer always gets its moment), except a few that only ever show the first time (first hit, charging the mound, career milestones).
- **One at a time, in a queue.** A plate that cannot be shown within 9 s of the feat is dropped (it is still in the case): **it never turns up batters later.**
- **Never over an event's inputs** (the arrows need the whole picture), never across a hitter's strikeout reaction close-up, never on the title screen. They do show during the orbit shot.
- **Some double as the call:** the first time a feat happens its name is the big callout instead of GONE!.
- **Earned on a menu** (daily challenge, levels, invites): they go straight into the case and the screen itself lists them; no plate.
- **While the player pitches, only pitching achievements count:** a Kraken homer off the scoreboard is not yours. The pitching set: MAX POWER, striking out the side, the plunk, a pickoff, painting, three perfect releases (dialed) and five (machine), tunnelling, gas, an immaculate inning, buckling a hitter, can of corn, cannon, gunned down, web gem.
- **Not in practice, the Derby or the Gauntlet** for the game-total ones (those modes have their own).

## Families (see the table for all of them)

- **Firsts:** first hit, first homer, first strikeout thrown.
- **Distance:** 450, 500, 550, 600, 650 ft, and career feet.
- **One game:** hat trick, seven and ten homers, ten / fifteen / twenty hits, fifteen to thirty runs, hits in a row, a five, eight or ten-run inning.
- **The park:** off the scoreboard, the batter's eye, a light tower, the lava cove, into orbit, the satellite, the saucer, the Apollo site.
- **Juice and Overdrive:** a homer in Overdrive, off a Juice pitch, off a pitcher in Overdrive; two and all four Overdrive shows in a game.
- **Style:** the bat flip, charging the mound, winning a brawl, wearing one.
- **Running and defense:** sends, steals, gunned down, web gems, robbing one.
- **Perks:** a perk comes through; four in one game.
- **Modes:** Derby and Gauntlet scores and rounds.
- **Career:** games played, career homers and runs, levels 5 to 50.
- **Daily challenge and streaks:** first daily, a win, three stars, the boss, 3 / 7 / 30 / 100-day streaks, earning a freeze.
- **Invites:** joined with a code; 1, 3, 5, 10 friends joined (needs accounts: later).

## Future (not built)

- Nothing more is coded. The owner's notes point at: achievements for the cup mode and multiplayer when those exist, per-player achievements (each Comet's own), and Game Center achievements on iPhone mirroring these.
- **For Unity:** keep the list as data (id, name, description, icon, where it is earned), one function to award, the same queue rules, and map each to a Game Center achievement when the store build happens. Awards that will ever matter for leaderboards or rewards must be checked on a server (`port/SECURITY_AND_LAUNCH.md`).
