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

## Look and feel: one theme (started 2026-11-23)
- Done: every painted surface in the park (scoreboard, wall distances, signs) now uses the same display face as the screen text (Russo One); screen text is Russo One for headlines and Saira Condensed for small labels.
- Next: one colour palette written down and applied (navy / chrome / volt yellow / heat red / ice blue / Overdrive blue / Juice orange); one button shape; one callout style (size tiers: shout, call, caption); same plate style for badges, batter card, walk-up banner, hit info; emoji icons replaced with drawn icons in the same style; a short style guide in the repo.

## Player cards and perks
- A card per player: portrait (his body), ratings (power / contact / speed), handedness, a signature walk-up and celebration, and one PERK.
- Perk ideas: CLUTCH (bigger rings with two strikes), JUICED (starts every at-bat with a bar), WHEELS (showdowns are a tier easier), BAD-BALL HITTER (less penalty for chasing), MOON LEGS (extra carry), ICE (the pitcher's Overdrive closes in slower), BRAWLER (wins brawls more often), GLASS BAT (huge power, tiny contact ring).
- Rarity tiers, earned from badges/wins or packs opened between games; build a nine from your collection (ties in with teams/rosters and the campaign mode).

## Loading screen
- Done 2026-11-23: animation file cut from 6.5 MB to 4 MB (finger motion only kept where a bat is held); the sky photo waits until the players are in; build number shown on the title screen.
- Ideas to keep people interested while it loads: recorded commentary / a PA announcer reading the lineup, a tappable baseball that pops into fireworks, the badge case teaser ("3 of 25"), lore cards for each hitter with his portrait, a "today's pitcher" scouting card, last game's line score, tips with little looping demos.

## Lore: the Lunar League (started 2026-11-23)
- Eight clubs, named for where on the Moon they play, each with a colour (on the halo board): Tranquility Comets (orange), Kepler Krakens (ice blue), Tycho Thunder (yellow), Apollo Aces (red-pink), Mare Mammoths (violet), Crater Kings (gold), Eclipse Outlaws (steel), Darkside Djinn (green).
- To do: logos, home parks, rosters built from the character bodies, rivalries, a league table.

## Rosters v1 (BUILD 513) — every player has his own body
**Tranquility Comets (home, you bat):** VASQUEZ (ely) · OKAFOR (exo red) · DELACROIX (olivia) · BRICKHOUSE (dreyar) · TANAKA (exo grey) · MONTOYA (parker) · ZEPHRA (jolleen, alien body; was Abernathy) · CRASH (dummy; was Jackson-Bell) · GORMAK (abe, alien body; was Kowalski). Ratings live in `LINEUP`.
**Kepler Krakens (field):** 1B R. ARCHER #47 (crypto) · 2B T. HOLLIS #7 (racer) · SS VREL #13 (alien) · 3B ZLORP #50 · LF DRA'AK #25 (drake) · CF XANDU #4 (jones) · RF M'NAR #30 (maynar). Range/jump ratings live in `KRAKENS`.
**Krakens arms:** J. MACDONALD #99 (van) · C. ROMERO #66 · L. HARGROVE #48 (L, astra) · BRAXX #40 (brady) · MALGOR #6 (L, demon).
Still shared/unused: catcher wears the house body; `david` body unused; Parker body is worn by Montoya only.

**Roster update (BUILD 548):** Comets order: R. VASQUEZ, O. DELACROIX, XENON (exo red; was Okafor), BRICKHOUSE, E. MONTOYA, VANTA (crypto; was Tanaka), ZEPHRA, CRASH, GORMAK. Krakens 1B is ARKON (exo grey; was Archer). Aliens, exo suits and the dummy go by one name.

## Shipping: minimum viable App Store build (freemium) — owner's note, keep in mind for every decision
Not being built yet; this is the target to steer by.
- **Free:** the current game (one park, Comets v Krakens, three innings), achievements, daily play.
- **Paid, cosmetic or content only (no pay-to-win):** extra teams/rosters, extra parks, walk-up and celebration packs, bat/trail/flame skins, a one-time "remove ads / supporter" unlock.
- **Retention before monetisation:** a reason to come back (daily challenge, season ladder or Derby mode), saved career totals (home-run feet tree already exists).
- **Hard blockers before any store submission:** replace ripped audio; confirm licences for every model, the moon maps, horn and claps; show the ESO sky credit; set TUT_EVERY_LAUNCH false; wrap the web build as a native app (Capacitor or similar) and test on real iPhones; privacy policy; age rating (cartoon violence: brawls, hit-by-pitch).
- **Design rule this implies now:** keep the game one self-contained file with assets loaded on demand, keep phone frame rate first, and keep names, sponsors and likenesses original (no real teams, parks or brands).

**Names (BUILD 550):** humans go by a simple first name: RAZOR (Ely body; was Vasquez), OSCAR (Delacroix), EDDIE (Montoya), BRICKHOUSE; Krakens TODD (Hollis), pitchers MAC, CARLOS, LEE.

**Roster (BUILD 553):** Comets: RAZOR (ely), VREL (alien body), XENON, BRICKHOUSE, DRAAK (drake body), VANTA, ZEPHRA, CRASH, GORMAK. Krakens field: ARKON, TODD, LIV (olivia body, SS), ZLORP, EDDIE (parker body, LF), XANDU, M'NAR.

## Asset sources to keep in mind
- **Mixamo** (current): characters and animation clips. Commercial terms still to be confirmed before shipping.
- **Tripo 3D** (owner's suggestion, from ads): AI text/image-to-3D model generation. Candidate when Mixamo runs out or for things Mixamo does not have: original characters (so no licence question over the look), stadium props (bullpen carts, mascots, vendors, the catcher's gear), ball/bat skins for the cosmetics shop.
  Before relying on it, check: (1) the licence on the plan used (commercial use and ownership of generated models), (2) whether its characters come rigged in a Mixamo-compatible skeleton or need auto-rigging (our clips are retargeted by bone name), (3) triangle counts and texture sizes, which must be cut down for phones (our bodies are ~1024 px textures, 512 on phones).

## Pitching (v1 shipped in BUILD 573)
The Krakens' half of the 2nd and 3rd is now played: the player pitches to three hitters (ZLORP, XANDU, M'NAR) from behind the mound.
- Delivery styles: TWO-TAP (default; tap THROW, tap again as the closing ring meets the target) and METER (tap to start, tap at the top for power, tap on the yellow line for accuracy). Flick-to-throw is still an idea, not built.
- Outcome model lives in `pdDecide` (swing/chase, contact, result) and reads location, release grade, pitch type, repeat/speed-change and the hitter's ratings in `KBAT`.
- Not in v1: Comets fielders making the plays (balls in play are a quick flight and a call), Juice/Overdrive for the pitcher, pitcher stamina, hit-by-pitch, steals, a tutorial, sound design, runner figures on the bases.
- The old dice roll (`cpuInning`) is still used when models are missing and in the automated tests.
- BUILD 574 added to pitching: a PITCH / SKIP choice before each half, hot and cold zones per hitter (on the pad) and a K zone at the plate with the catcher and umpire behind it, pitch ratings (velocity, control, break), pitcher stamina (carries between innings), Juice pitches (a quarter bar each; a strikeout earns a bar), and five pitching achievements.
- OPEN (owner): the current batting game is to become its own batter-only arcade mode; pitching stays in it only until modes are separated.
- OPEN (owner, unfinished note): "The higher the stamina and the ..." — sentence was cut off; ask what stamina should scale.

## Stadium art (owner is exploring outside help)
One excellent reusable ballpark before any others. If a stadium model is made elsewhere (Blender, a bought low-poly kit, Tripo), what the game needs:
- Format: a single .glb (preferred) or .fbx. NOT via Mixamo (Mixamo only handles humanoid characters).
- Scale and origin: metres; home plate at the origin, centre field toward -Z, ground at Y=0. Fence about 99 m down the lines, 122 m to centre, to match the game's physics (or tell me the numbers and I change the physics).
- Budget for phones: roughly 30-60k triangles for the whole park, one or two 2048 px texture atlases, lighting BAKED into the textures (the game uses no real-time lights on the park).
- Separate named pieces help: field, walls, stands, scoreboard, foul poles, so the game can still animate the board, the crowd wave and wall collisions.

- Defensive QTEs while pitching: when a CPU runner gets aggressive and stretches a hit (extra base, tag-up, going first to third), the player becomes the defender and gets a QTE to throw him out (mirror of the batting-side advance QTE).
- Pitching audio: perfect-release and good-release need proper sound feedback (the 8-bit beeps were removed; perfect currently has only the turbo "crush" sound and a crowd pop, good release is silent). Sound not chosen yet.
- Before release: set `PTUT_EVERY_GAME` to false (pitching guide currently runs every game for QC), same as `TUT_EVERY_LAUNCH`.
- Playtesting rule (standing): the most recently built animation/show is the first one a game triggers (`PLAY_NEWEST_FIRST`; currently the Apollo-site shot is the first well-hit Overdrive ball each game). Set false before release.
- Performance recorder (BUILD 644): each session writes a summary doc to the artifact database, collection `perf` (one doc per session id). Only signed-in players who own or are Contributors on the artifact can write; public-link visitors cannot. Read with ArtifactData list/query on `perf`; delete old docs when it grows.
- Defensive QTEs (BUILD 659): `dstretch2` / `dstretch3` in QTE_MOVES (`def:true`); triggered from `pdFinish` on a Kraken single/double with the next base open. Not yet done: plays at the plate, tag-ups, first-to-third on defence.
- BUILD 677: Vanguard removed (files deleted); `cfg.def` is Parker (stand-in fielder/catcher body). Fielders still swap to their own Kraken bodies later via `f.body`.
- BUILD 678 pitching balance (40-half sims, random locations, ~55% perfect releases): Krakens went from 0.05-0.10 to about 0.2-0.25 runs per three-batter half, average about .330, whiffs down from 52% to ~35-45% of swings. Levers: `pC` base in `pdDecide`, `qq` floor and the monster-shot gate in `pdResolve`, defence boost in `pdStart`.
- Not done: Comets-bodied fielders while the player pitches (would need a second rig per fielder; memory risk on phones).
- BUILD 679: defensive play at the plate (`dplate`): a run that scores on a single/double is sometimes contested; win and it comes off the board. Still not done on defence: tag-ups, first-to-third.
- BUILD 680: phones are LITE (no bloom pass), so the stutter test now compares the shadow map redrawn every frame vs every third frame (`window.__shLite`, verdict in localStorage `mm_shl`, reported under `ab`). Next suspects if that is not it: MSAA (`antialias:true`), then DOM compositing of the HUD.
- BUILD 681: Kraken hitters get a head shot on their walk-up card.
- BUILD 684 (performance): the Overdrive edge flames (#odv, #odp) and showdown glow (#duelv) ran ~13 infinite CSS animations all game at opacity 0; now paused (and the flame strips `display:none`) unless showing. Infinite animations running: batting 19 -> 7, pitching 20 -> 2. Prime suspect for the constant ~7% dropped frames on iPhone; confirm with the next perf reports. The A/B test now has three arms (base / shadow every 3rd frame / hud-lite) reported under `ab`.
- BUILD 687: download queue for model files (`DLQ`: 3 at a time, 4 attempts with back-off, `dlBoost` to prioritise; images retry too). Reason: phone reports showed `Load failed` on several bodies and sessions where no extra body ever loaded. Hitter-body wait before a Kraken walk-up cut to 2.5 s (first man) / 1.2 s (others) / 0 if its download failed.
- Stutter test results so far (iPhone, builds 684-686): base 7.3-8.7% slow frames, shadow-every-3rd 6.6-7.7%, hud-lite 7.3-8.5%: no arm clearly better, and pausing the hidden animations (BUILD 684) did not move it. Not shadows, not HUD animation, not triangles, not main thread. Remaining suspects: MSAA (`antialias:true`), the host app/iframe compositing, or 120 Hz display pacing (the histogram shows ~15% of frames under 12 ms paired with the long ones).
