# Achievements

Asked for by the owner on 28 Nov. The full list with every name, description and icon is the `BADGES` table in `port/data/TABLES.md` (149 of them as of BUILD 993). This file is how they work.

## How they work

- **Earned once, kept on the device** (`mm_badges3`). The count shows on the title screen: "Achievements: n / 149", which opens the trophy case.
- **The plate:** a pill that drops in under the top bar: icon, ACHIEVEMENT UNLOCKED (or just ACHIEVEMENT when it has been earned before), the name, and what it took. Up for 3 s, with a short rising chime and a buzz.
- **A feat already in the case can still be called once per game** (so a 500-footer always gets its moment), except a few that only ever show the first time (first hit, charging the mound, career milestones).
- **One at a time, in a queue.** A plate that cannot be shown within 9 s of the feat is dropped (it is still in the case): **it never turns up batters later.**
- **Never over an event's inputs** (the arrows need the whole picture), never across a hitter's strikeout reaction close-up, never on the title screen. They do show during the orbit shot.
- **Some double as the call:** the first time a feat happens its name is the big callout instead of GONE!.
- **Earned on a menu** (daily challenge, levels, invites): they go straight into the case and the screen itself lists them; no plate.
- **While the player pitches, only pitching achievements count:** a Kraken homer off the scoreboard is not yours. The pitching set (`PITCH_BADGES`): MAX POWER, SAT THEM DOWN, MESSAGE SENT, PUNCHOUT, PAINTED IT, STRUCK OUT THE SIDE, DIALED IN, TUNNEL VISION, PURE GAS, THE MACHINE, IMMACULATE, BUCKLED HIM, CAN OF CORN, CANNON, GUNNED DOWN, WEB GEM.
- **Not in practice, the Derby or the Gauntlet** for the game-total ones (those modes have their own).

## Families (149 in the table; see it for every name and requirement)

- **Firsts and hit types:** first hit, first homer, a double, a triple, the team cycle, oppo homer, first-pitch homer, grand slam, back to back, a hit on a moon hop, beating out an infield single.
- **Distance:** one of 450, 500, 550, 600, 650 ft; career feet of homers from 1,000 to 1,000,000.
- **One game:** three, five, seven and ten homers; ten, fifteen and twenty hits; ten to thirty runs; three, five, eight and twelve hits in a row; five, eight and ten-run innings; two hits in a row with one hitter.
- **The park:** off the scoreboard, the batter's eye, a foul pole, a light tower, the lava cove, into orbit, off the Moon, the satellite, the flying saucer, the Apollo site.
- **Juice and Overdrive:** a homer in Overdrive, off a Juice pitch, off a pitcher in Overdrive; two and all four Overdrive shows in one game.
- **Style and fights:** the bat flip, charging the mound, winning a brawl, getting hit by a pitch, knocking an infielder off his feet, knocking the pitcher out of the game.
- **Running:** winning a showdown at the bag, gold on the needle, a steal, running over the catcher.
- **Pitching and defense:** the set listed above.
- **Winning:** a win, a walk-off, a shutout, a laugher, a comeback, small ball, a nail-biter; a win on All-Star, Legend, Moonshot, Galactic and Intergalactic.
- **Perks:** a perk comes through; four in one game.
- **Modes:** batting practice, Derby homers, score, distance and targets; Gauntlet rounds and scores.
- **Career and profile:** games played, wins, career hits, homers and runs, levels 5 to 50, naming yourself, changing the batting order.
- **Daily challenge and streaks:** first daily, a win, three stars, the Saturday boss, 3 / 7 / 30 / 100-day streaks, earning a freeze.
- **Invites:** joined with a code; 1, 3, 5 and 10 friends joined (these need accounts: later).

## Future (not built)

- Nothing beyond the table is coded, and the owner has not listed specific future achievements. Ask him before inventing any.
- Suggestions from the web session only, not decisions: achievements for new modes as they are added, and Game Center achievements on iPhone that mirror this list.
- **For Unity:** keep the list as data (id, name, description, icon, where it is earned), one function to award, and the same queue rules. Anything that will ever feed a leaderboard or a reward must be checked on a server (`port/SECURITY_AND_LAUNCH.md`).
