# Push notifications (a must before launch; nothing to build now)

From the owner, 28 Nov: not needed now, required before launch. This is the list of notifications the game could need and the rules for doing them properly. **Every item in the list is a proposal for the owner to approve, cut or reword; he has not chosen a set yet.** Wording should be in the game's voice (ballplayer talk, short).

## Two kinds, and which to use first

- **Local notifications** are scheduled by the app on the phone itself. No server, no account, no data leaves the device. Everything tied to the calendar or to the player's own last session can be local: the daily challenge, a streak about to end, "come back" nudges.
- **Remote (push) notifications** are sent from a server through Apple. They need accounts or at least a device token stored on a server, which brings the security and privacy duties in `port/SECURITY_AND_LAUNCH.md`. Needed only for things the phone cannot know by itself: a friend did something, a live event started, new content dropped.
- **Plan:** ship local notifications first. Add remote ones only when accounts and a server exist.

## The candidates

**Daily habit (local)**
| When | Example wording |
|---|---|
| A new daily challenge is up (once a day, at a time the player picks or his usual play time) | "Today's challenge is up: bases loaded, two out. Get out of it." |
| Streak about to end (evening, only if he has not played today and has a streak of 2+) | "Your 6-day streak ends at midnight. One at-bat keeps it alive." |
| A streak freeze was used for him | "A freeze saved your streak. Back at it today?" |
| Streak milestone tomorrow | "One more day for a full week and a streak freeze." |
| Saturday boss challenge | "Boss day. The toughest hitter they've got is waiting." |

**Come back (local, gentle)**
| When | Example wording |
|---|---|
| 3 days away | "The Comets miss you in the lineup." |
| 7 days away, then stop | "Batting practice is open whenever you are." |
| Left a game unfinished (if games can be resumed) | "You left it tied in the third. Finish it?" |

**Progress and rewards (local)**
| When | Example wording |
|---|---|
| Close to a level / a new celebration | "One good game from Level 8 and a new celebration." |
| A timed reward is ready (only if such rewards ever exist) | "Your daily reward is ready." |

**Social and competitive (remote; needs accounts)**
| When | Example wording |
|---|---|
| A friend joined with your invite code | "Sam joined with your code. SCOUT unlocked." |
| A friend beat your score / daily result | "Sam went three stars on today's challenge. Your move." |
| A challenge or a multiplayer invite | "Sam wants a showdown." |
| Your turn (if a turn-based mode is ever built) | "You're up." |
| Leaderboard: passed, or a season ending | "You've been bumped to #4. Two days left." |

**Live and content (remote)**
| When | Example wording |
|---|---|
| A limited-time event or cup starts / is about to end | "The Lunar Cup opens tonight." |
| New players, parks, modes or a big update | "A new arm just joined the bullpen." |
| Service notices (rare): maintenance, an issue fixed, an account or purchase matter | Plain wording, no marketing. |

**Never send:** anything that shames the player, fake urgency, "your team is losing without you" pressure aimed at kids, or anything about spending money presented as a game event.

## Model the streak on Duolingo (owner, 28 Nov)

The owner wants the streak and its reminders modelled on how Duolingo keeps people on theirs, wherever it fits a baseball game. What follows is the web session's reading of that system and how each piece maps to us. It is from general knowledge of the app, not a study of it: **look at the real app again when this is designed**, and treat the mapping as proposals for the owner.

**What we already have (keep):** a daily challenge; a streak that counts for **showing up**, win or lose; a **streak freeze** earned every 7 days, three held at most, spent by itself on a missed day; streak achievements at 3, 7, 30 and 100 days.

| What Duolingo does | Why it works | For Moonshot Mayhem |
|---|---|---|
| **The bar to keep a streak is tiny** (one short lesson) | Nobody breaks a streak because they were busy | One daily challenge attempt, about a minute. Consider letting any finished game or one at-bat in batting practice count too. |
| **The streak is on screen everywhere** (a flame and a number) | It becomes the thing you protect | Flame and day count on the title screen, the result screen and the daily screen. We already use fire for Juice, so the look is ours. |
| **A reminder at the time you usually play**, learned from your habits | It arrives when you are free | Schedule the daily reminder for the hour he most often plays (kept on the phone, no server). Fall back to early evening. |
| **A second, later "last chance" reminder** only if today is still not done | Loss aversion at the right moment | One more in the evening when a streak of 2+ is at risk: "Bottom of the ninth for your 12-day streak." Never after 9 pm. |
| **Streak freeze**, bought or earned, shown as equipped | Forgiveness keeps long streaks alive | We earn ours. Show how many are held, and say so the morning after one is used. |
| **Earn the streak back** after losing it (extra play within a few days) | A lost streak is where people quit for good | "Rain delay": miss a day with no freeze, and beating the next two dailies within 48 hours restores it. Earned by playing, never bought. |
| **A character with a voice** (the owl: funny, a little needy, never the same line twice) | Reminders read as a personality, not a system | Give ours to someone in the game: the Comets' skipper, or a player. Short ballplayer lines, a pool of many, never the same one twice running. Funny, not guilt. |
| **It backs off** when reminders are ignored for about a week, and says so | Respect; stops people turning notifications off entirely | After 5 to 7 ignored days send one last line ("We'll stop bugging you. The gate's open when you're ready.") and go quiet until he plays again. |
| **Milestones are celebrated** with a full-screen moment and a shareable card (7, 30, 100, 365) | Pride, and free word of mouth | A streak card with his signature Comet and the day count, made to be shared. Ties in with the achievements we have. |
| **A streak goal you commit to** (pick 7, 14, 30 days) | A stated goal raises follow-through | After day 2 or 3: "How long can you keep it going?" Pick a target; small reward when hit, then pick the next. |
| **A calendar of the days you played**, and "perfect weeks" | The chain is visible | A month view on the daily screen with a ball on each day played and a marker on freeze days. |
| **A home-screen widget** showing the streak, changing mood as the day runs out | A reminder with no notification at all | An iPhone widget: the flame and count, lit when today is done, flickering late in the day. Very strong, and needs no permission prompt. |
| **Friend streaks and friend nudges** | Social accountability | Later, with accounts: a shared streak with a friend, and "Sam kept his streak. Your turn." |
| **Weekly leagues** | A reason to play more than the minimum | Later: a weekly ladder on daily-challenge stars. Needs a server and anti-cheat. |
| **Rewards for streak length** | The streak pays | A celebration, a walk-up, a card frame or a bat skin at streak milestones. Cosmetic only. |

**Where we should not copy it**
- **No guilt or pressure aimed at children.** Duolingo's tone leans on feeling bad for the owl. Keep ours warm and funny. This also matters for the age rating.
- **Nothing about the streak can be bought.** No paid freezes, no paid repairs: the owner's rule is no loot boxes and no currency for money.
- **A streak must never be lost to a bug or a time zone.** Day boundaries are the player's local midnight; a trip across time zones or a clock change never breaks one; when in doubt, the player keeps it.
- **Streaks kept on the phone can be faked** by changing the clock. That is fine while they are personal. Anything that feeds a leaderboard or a reward others can see must be checked on a server.

**Order to build, when the time comes:** the streak shown everywhere, the two local reminders with the character's voice and the back-off; then the calendar, the milestone card and the widget; then the earn-back and the streak goal; friend streaks and leagues only after accounts.

## Rules

1. **Ask at the right moment.** Never on first launch. Ask after the player has finished a daily challenge or a first win, with a one-line screen first explaining what he will get ("Want a heads-up when tomorrow's challenge is up?"). iOS only lets the system prompt appear once; if he says no there, it can only be changed in Settings.
2. **Everything is opt-in and per category.** A settings screen with a switch for each group: Daily challenge, Streak, Friends, Events and news. Off must mean off.
3. **Frequency caps.** At most one notification a day in total by default, never more than two; nothing between 9 pm and 9 am local time; stop "come back" messages after the second one.
4. **Never send what is no longer true.** Cancel the streak warning the moment he plays; cancel the daily one if he already played today's; reschedule on every app open.
5. **Tapping a notification goes to the thing it is about** (the daily challenge screen, the friend's result), not just the title screen.
6. **Marketing needs its own consent.** Apple requires an explicit opt-in for promotional pushes; reminders about the player's own activity are fine under the normal permission.
7. **Children.** If the game is rated for or likely to be played by under-13s, be conservative: local reminders only, no social pressure, nothing about purchases. See the children's section in `port/SECURITY_AND_LAUNCH.md`.
8. **Privacy.** A push token is personal data once it is on a server: store the minimum, delete it with the account, list it in the privacy policy and Apple's privacy labels.
9. **Badges and sounds:** a red badge on the icon only for something waiting (today's challenge not played). Default sound; no custom alarm.
10. **Android later:** needs its own runtime permission (Android 13+) and notification channels that map to the same categories. Keep one notification list in data, with the platform code behind it.

## What to do now

Nothing to build. Keep the game's events easy to hook later: the daily challenge, streaks, levels and achievements should each raise a plain "this happened" signal in the core, so a notification scheduler can subscribe to them when the time comes.
