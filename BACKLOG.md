# Moonshot Mayhem backlog

North star: a casual player picks it up and, by the end of the first nine outs, thinks they're pretty good at it. Then wants another game.

## Before going public
- Replace all ripped audio (crowd pops, boos, umpire calls, crushed-ball effect) with original or licensed sound.
- Set the tutorial back to showing once, not on every launch.

## Next up
- **Audio design (crucial).** Original sound set: bat cracks by contact quality, mitt pops, layered crowd, Juice/Overdrive stingers, menu sounds. Longer crowd bed, more cheer variations, chants.
- **Home vs away crowd dynamics**, audio first, then visual: the crowd reacts differently depending on who is at the plate and who is winning.
- **Overdrive look.** A clearly different feel when it is on (reference: the Gamebreaker moment in NFL Street), by changing the scene itself rather than the screen border.
- **Stadium design pass.** Decide what Moonshot Park is (dome or open sky, landmarks, where Earth sits, lighting mood) and build to it.
- **Frame rate.** Next candidates: merge the stadium's many small pieces, tune render resolution.
- **Real player models** instead of one shared character for everyone.

## Audio still needed
Recordings to find or make (the game currently fakes most of these by reshaping the few cheers it has):
- Crowd groan ("aww"), two or three versions.
- Rising "ohhh" as a ball climbs, 2-4 seconds, a couple of versions.
- A real surprised gasp for hard-hit balls that get caught.
- Medium cheers for singles and doubles, three or four different ones.
- Bat cracks in three tiers: weak, solid, crushed.
- Umpire "SAFE!" call (the out call exists; safe does not), for quick time events and close plays.
- Hit-by-pitch: a real ball-off-the-body thud and a grunt (the current one is synthesised), plus punch and kick impacts for the brawl.
- Juice pitch sounds, a different one per pitch (the crushed-contact effect, pitched down, is the placeholder for all of them).
- A pitch-release sound and a catcher's-mitt pop that cut through on a phone speaker.
- Electrical zap and power-down hum for the short circuit; an Overdrive activation sting.
- More organ riffs and a chant or two.

## Home-run show (the soul of the game)
North star for these: the over-the-top screen animations a bowling alley plays after a strike. Loud, silly, instantly readable, a
different one each time, and a reason to want the next one. Reserved for no-doubters and Overdrive homers so they stay a reward.
- Built so far: power surge / short circuit, ball leaves orbit, satellite knocked out, laser show, lights out (smashed light tower), walk-off.
- Ideas to pick from:
  - The scoreboard takes over with a full-screen cartoon: a ball smashing through the glass, a rocket launching, an alien abducting
    the outfielder, a slot machine landing on three baseballs.
  - A UFO drifts over the park and beams the ball up.
  - The Earth in the sky gets a ring of fireworks, or the ball visibly lands on it with a tiny puff.
  - The crater behind the wall erupts like a geyser; a moon buggy does a victory lap on the warning track.
  - The crowd does a card stunt that spells the hitter's name or number.
  - The mascot (to be designed) rides the rocket, or the rocket actually launches.
  - Low-gravity confetti that falls in slow motion across the whole field.
  - A giant foam-finger blimp, a marching band of astronauts, a disco-ball moon.
- Rules of thumb: under four seconds, skippable, never the same one twice in a row, and each one gets its own sound.

## Modes
- Home Run Derby (reuses everything; best value).
- Easy mode and exhibition (today's game plus a difficulty dial).
- Skill challenges.
- Mini season with roguelike upgrades.
- Challenges.

## Gameplay
- **More Juice pitch types.** BUILT: Freeze Frame, Double Trouble, Riser, Gear Shift, Boomerang, Knuckler, Sky Drop (thirteen in all).
  Still open: a sound for each, tuning how hard each is, checking every trail on a phone. Before: Meteor, Zig-Zag, Corkscrew, and the Overdrive-only Supernova, Ghost Ball and Black Hole. Each new one
  needs its own movement, colour, trail shape and (eventually) sound. Ideas to start from: a pitch that stops dead and restarts, one that
  splits into two balls with only one real, a riser that jumps late, one that changes speed mid-flight, a boomerang that swings wide
  and comes back, a knuckler that jitters, one that drops out of a high lob.
- Difficulty levels: hide the timing target, later ring, pitch-colour cues, smaller power core, tighter windows.
- Give CONTACT a real job (two-strike protection, contact builds Juice, and so on).
- Hit by pitch: done, including the brawl (charge, three exchanges, knockdown). Still open: benches clearing, ejections, a quick time event to decide it.
- Clips still unused: the flat-brim cap and pants models (need fitting to the characters), the goalkeeper dive if a second dive is wanted.
- Stealing bases (needs a one-tap control design first).
- Pitching, not only hitting (effectively a second game).
- Fielder alignment and depth, dives and jumping catches.
- **Quick time events.** BUILT (first version): arrow-code events at the plate, breaking up a double play, stretching a hit, tagging up.
  The GO button is offered on every eligible hit for now; once the mechanic is tuned, offer it only some of the time so it cannot be farmed.
  Still open: a real slide and tag animation, the catcher taking the throw, tuning the clock, more scenarios (robbed homer, brawl, duel).
  Original note: a short burst of input at a big moment, with something real riding on it.
  - Input idea: a sequence of direction presses that has to be entered in order before time runs out, the way stratagem codes work in
    Helldivers 2. Arrow keys on desktop; on a phone, an on-screen d-pad that appears only for the event (leading idea), in place of the aim
    stick so the left thumb is already there. Flicks of the stick or swipes are the fallback if the d-pad feels cramped.
  - Stakes: get it right and the play goes your way; miss it and it goes the other way. Longer or faster sequences for bigger moments.
  - First example: a play at the plate. The runner comes home, the throw beats him, and a correct sequence has him go in with a running
    scissor kick that knocks the ball loose from the catcher: safe. Miss it and he is out.
  - Other places it could fit: beating out an infield hit, breaking up a double play, a robbed homer at the wall, a brawl after a
    hit-by-pitch, the Overdrive duel.
  - Needs: plays at the plate (runners are never thrown out at home today), new animations (the kick, the catcher losing the ball),
    and a rule for how often it comes up so it stays an event.
- A short "last swing" breakdown.

## Presentation
- Announcers: two original characters, captions first, voice later.
- Identity homework: the shouts over the hitter's head after a homer (placeholders are in) and the call-out wording generally.
- Lore: why baseball is on the Moon, the Comets and Krakens, batter bios.
- More celebrations and batting stances (Mixamo clips).
- Pitching change: the outgoing pitcher walks off the mound dejected before the new arm comes in.
- New stadiums.
- Fielder ready-stance clip; the unused on-deck clip.

## Marketing (for later)
- **Share your game.** A one-tap share from the final screen: a ready-made post such as "I hit a 512 ft moonshot and beat the Krakens 14-9
  on Moonshot Mayhem", with the score, rating and best moment filled in, a link to the game, and ideally a generated image card.
  Also shareable single feats ("left orbit", "won an Overdrive duel", "walk-off homer").

- **TikTok and Instagram Reels.** Short vertical highlight clips as the main way people find the game.
  - What to post: the moments that need no explanation in three seconds. Satellite knocked out, ball leaving orbit, the short circuit on
    the scoreboard, an infielder getting drilled, a diving catch, an Overdrive duel, a walk-off, the wildest walk-ups and celebrations.
  - Format: 6 to 15 seconds, vertical, the big moment inside the first two seconds, the game's name and link on screen at the end.
    The phone layout is already vertical, so a screen recording is the right shape with no editing.
  - Series ideas: "moonshot of the day", longest homer of the week, "can you beat this score", a new walk-up or celebration each post.
  - Needs before posting: original audio in place (ripped crowd and umpire sounds will get clips muted or taken down), a clean way to
    record (see below), and the link going somewhere a new player can start in one tap.
  - Possible in-game help, later: a "save that clip" button that records the last few seconds of play, and a clean-HUD replay mode so
    clips are not covered in buttons. Pairs with the share button above.

## Motion capture (parked until we really need it)
- Mixamo cannot capture; it is only the library and the skeleton everything uses. Capture needs a video-to-animation tool, then an FBX on the Mixamo skeleton.
- First choice to try: Rokoko Vision free tier (30 s of video a month, FBX export); about $12 for one month of 600 s would cover a full batch.
- Check before shipping: commercial-use terms of the tier used, and that the export lands on the Mixamo skeleton.
- Best uses: baseball-specific moves the library lacks (bat flip, follow-through, slide, tag, pitcher's delivery, the owner's own celebrations).

## Known gaps in testing
- Audio has never been listened to by the developer side; all levels and mixes need a human ear.
- Real-phone frame rate and feel are only checked on the owner's iPhone XR.
- Many cutscenes and effects have only been checked as stills, not in motion.

## Quick time event audio
- Proper sound cues for getting it right: a ding per correct arrow (rising), a build-up for the mash meter, a tick/tension loop and a hit sound for the needle game. Synth tones are in as placeholders (made louder 2026-11-23); replace with recorded sounds.

## Badges (built 2026-11-23, first pass)
- 23 badges, gold toast on unlock, badge case on the title screen, kept per device.
- Ideas not built: tiers (bronze/silver/gold), a badge shown on the end-of-game screen, hitting for the cycle, a no-strikeout game, beating each pitcher, career counters (100 homers), sharing a badge card for TikTok/Reels.

## Bat ring (PCI) settings
- Built 2026-11-23: centre marker choice (none / dot / crosshair / ring), on the title screen and in the pause menu, saved per device.
- Ideas: marker colour and size, ring thickness, ring opacity, a colour-blind palette for the green/red zones, hide the fill and keep only outlines, a "pro" ring with no timing ring.

## Modes
- Story / roguelike campaign. Inspiration for the STRUCTURE only (nothing copied): the roguelike story campaign in a well-known sci-fi podracing game the owner likes: a run of events on a branching map, choices between stops, upgrades and crew picked up along the way, permanent unlocks between runs, a rival who keeps turning up. Ours: a barnstorming tour of Moon ballparks, drafting hitters (the different bodies), buying Juice/ring/speed perks between games, boss pitchers with their own Overdrive pitches, and badges as run goals.
- Home Run Derby.
- Teams and rosters: named clubs with their own lineups, bullpens, colours and home parks; pick your team; each body gets a name, number and ratings that fit it.

## Home-run distance
- Built 2026-11-23: a homer stopped by the scoreboard, batter's eye, seats or pole reads PROJECTED n FT (the number was always the projected carry).
- Ideas: a live distance counter that keeps climbing past the obstacle, a "longest ever" banner when the personal record falls, distance tiers that change the crowd and the call (400 / 450 / 500 / 550), a tape-measure graphic on the replay.
