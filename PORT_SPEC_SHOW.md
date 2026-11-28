# The show: crowd, home-run fireworks, horn, cameras, celebrations, taunts, gloves (port spec)

The owner asked for each of these by name on 28 Nov. This file is the map; the code and the detail files it points to are the numbers. Where they disagree, the code wins.

Detail files: `port/data/SOUNDS.md` (every sound call, by the moment it fires), `port/14-audio.md`, `port/code/14-audio.js`, `port/11-cameras.md`, `port/code/11-cameras.js`, `port/16-stadium-and-other.md`, `port/data/ASSETS.md` (every clip), `port/code/15-bat-swing-pitcher-sound.js` (`mkGlove`).

## 1. The crowd is alive and reacts to everything

There is a crowd bed that never switches off, and reactions laid over it. The park "reacts, it never just switches off."

| Moment | What the crowd does | In the code |
|---|---|---|
| Ball put in play | Rises with the quality of contact, for as long as the ball is in the air; a barreled power swing gets the big rise and a roar | `crowdRise(q, …)`, `roar` in `tryContact` |
| Out made on a ball in play | A hard-hit one gets a sharp, surprised "OHH!"; a routine one a small ripple | `crowdOut(q)` |
| Hit, run scored, homer | Cheer sized to the moment; the biggest for homers | `cheer(level, dur)`, `cheer_big`, `pop_max` |
| Strikeout of your hitter, a bad call against you | Drops, or boos | `crowdDrop()`, `boo()` |
| You are hit by a pitch, a brawl, the Krakens' pitcher taunts | Boos | `boo(.5 – .8)` |
| A big moment starting (event at a bag, steal, a catch to make) | Rises and holds in anticipation | `crowdRise(.7–.8, 2–3, true)`, `crowdHold` |
| You win an event / make a great play | Pumps | `crowdPump(1)` |
| A new Kraken hitter while you pitch | Hush, then a few boos | `crowdHush`, `boo(.3)` |
| Between pitches when quiet | The organ (charge, chords, clap-alongs, "let's go") and now and then a vendor calling; never over a roar | `organTick`, `vendorTick` |

- Fans also do things you can see: camera flashes in the stands during a homer, and the crowd excitement value (`crowdE`) drives how lively they are.
- Everything goes through one limiter so the roar, organ, crack and fireworks together do not blow out the speaker.
- Port every row. Use `SOUNDS.md` to find each call. Sound files are in the prototype repo's `sfx/` folder (placeholders, not cleared for release; fine for playtests).

## 2. What happens when a home run is hit

In order:
1. **At contact:** the crush sound; a no-doubter has its own extra crack (`nodoubt`).
2. **Just before it clears:** the call **OUTTA HERE!** and a boom.
3. **The instant it is over the wall, not a frame sooner: THE HORN.** Loud, on every Comets homer (`sfx('horn', 1.5)`). **Never for a homer the visitors hit**: no horn, no lasers, no rocket for them ("THAT'S GONE...").
4. **The flyover:** three interceptors over the park on about a quarter of homers and every grand slam (not twice within 30 s).
5. **Lift-off:** the Comets rocket beyond left field goes up on about three homers in ten and every grand slam.
6. **The lasers:** twelve pencil-thin beams in six colors from around the outfield, sweeping and blinking, while the house lights dim. On a no-doubter about 45% of the time, on other homers 12% (40% in Overdrive). They keep going while he rounds the bases, then fade. With "reduce flashing" on, no hard blink.
7. **Fireworks** burst over the bowl in five colors, each with a boom, and camera flashes sparkle in the stands.
8. **The scoreboard** shows HOME RUN and the distance; on some no-doubters it takes a "power surge" light show (almost never twice running).
9. **Special landings** have their own pay-offs: a light tower lamp smashing, the lava cove, a prop hit (the flight ends where it hits), a ball into orbit, the Moon shots. See `port/16-stadium-and-other.md`.
10. **The trot and celebration** (section 4).

Pace of play: in practice, the Derby and the Gauntlet there is no celebration; the ball lands and the next pitch comes. Everything is skippable.

## 3. Cameras (all of them)

Full list with the owner's rules in `port/11-cameras.md`; exact positions in `port/code/11-cameras.js`.

- **Batting (the player picks, C key or the button; STRIKE ZONE is the default):** CLASSIC, STRIKE ZONE, OFF-CENTER (from the open side, mirrored for a lefty), HIGH, FAR.
- **Ball in play:** the follow camera; long drives are followed the whole way (385 ft and up usually, 600 ft always); a ball into the cove is always followed in.
- **No-doubters:** the bat-flip "admire" shot, the "show" shot, and from right behind the ball.
- **From the air, five different shots, never the same twice running:** straight down over the mound, the blimp circling the bowl, from behind the rocket on its pad as it lifts off, a crane rising behind home plate, riding high above the ball. All stay above every roof, tower and ridge. **The show is timed to the shot:** lasers as the camera goes up, fireworks through it, the scoreboard surge near the end.
- **Overhead "blimp" view of a homer that stays in view:** small ball with a flame trail (the owner rejected a big ball: "looks like a popup").
- **The trot:** highlight cuts of him rounding the bases and his celebration at the plate; after the "loser" taunt it cuts to the pitcher wearing it.
- **Walk-up:** the hitter's entrance, with the call in the gap above his head. Close-ups never put text over a face.
- **Pitching:** behind and beside your pitcher (tight over the shoulder on an upright phone, mirrored for a lefty hitter); a ball in play is seen from the mound for half a second, then from behind the plate; after a strikeout, a cut to him celebrating, framed so the call sits above his head.
- **Events at a bag:** the runner coming seen from in front; then from behind the man with the ball for the inputs; then the bag for the catch and the call. The steal: the jump from up the line, then the throw down from behind the catcher.
- **The brawl, hit by pitch, the mound visit / new pitcher scene, the flyover camera, the cut to space for a ball into orbit.**

Rule from the owner: variety. Avoid "I've seen everything."

## 4. Celebrations and taunts: which, and when

All clips are in `ely_clips.min.json` (names and lengths in `port/data/ASSETS.md`). Prefix `w_` = walk-up routines, `p_` = pitcher's taunts and dances, `d_` = a beaten hitter's reactions, `c_` = small celebrations, `b_` = brawl, `f_` = fielding, `q_` = plays at a bag.

**Home-run celebrations (the hitter):**
- The pool (`WILD_CEL`): do-si-do, floating, joy jump, shuffle, wave dance, around town, chicken dance, boogie, cartwheel, salsa spin, salute, backflip, break dance, macarena, salsa, belly dance, flair, bat lift, push-ups, loser sign, twerk, funky chicken, running man, fist pump, clap, threat, shadow box, arrow, wave, hurricane kick.
- **Never the same one twice running.** The crowd-pleasers (`CEL_FAV`: do-si-do, floating, around town, shuffle, boogie, break dance, backflip, twerk, macarena, flair, salute, salsa spin) come up three times as often.
- **The joy jump is never the first celebration of a game.**
- **The player's SIGNATURE** (picked on the profile screen) is the first home-run celebration of every game.
- About one time in five he turns and gives the pitcher the **loser sign**, and the camera cuts to the pitcher wearing it.
- His own walk-up routine can be his celebration, except the walk-up-only ones (`w_milling`, `w_drive`, `w_golf`, `w_sad`, `w_drunk`).
- **Earned:** eight starters (flair, salute, fist pump, clap, arrow, bat lift, push-ups, shadow box); one more unlocks per level (`CEL_LADDER`, showiest last). In playtest everything is open.
- **Flavor first:** the first homer and first strikeout of every game get the full, ridiculous treatment (the first two of each in a player's first three games).

**When your hitter strikes out:** the Kraken pitcher taunts (any of his `p_` clips; on the "flavor first" strikeouts one of the wild ones: twerk, chicken, backflip, break dance, macarena, running man) while your hitter plays a beaten reaction (`d_` clips) and trudges off.

**When you pitch:** your pitcher celebrates a strikeout on the mound; the second of a half gets a "you're dealing" call; a new arm claps into his glove on his entrance.

**Brawl:** the winner pumps his fist over the loser. The lost-brawl call is now **LOST THE BRAWL!** (changed 28 Nov; the owner did not like the old wording).

**Walk-ups:** each hitter has his own routine (`WALK.by`).

These are stitched placeholders here. In Unity, blend them properly, but keep the rules above about which plays when.

## 5. Gloves: fit, and the correct hand

This was not worked on much in the prototype, so treat it as a requirement to get right rather than something to copy.

- **The glove goes on the non-throwing hand.** A right-handed thrower wears it on the left hand, a lefty on the right. The prototype finds the throwing hand by measuring which hand moves forward fastest in the throw clip and puts the glove on the other; fielders get it on the left hand; catchers wear a mitt on the left.
- **Two kinds:** a fielder's glove (palm, four finger stalls fanned, thumb, web between thumb and forefinger, heel pad, wrist strap, lacing) and a catcher's mitt (round, thick rim, deep dark pocket). Matte leather. Built in code in `mkGlove` (`port/code/15-bat-swing-pitcher-sound.js`); `glove.txt` is a model file too.
- **Fit rules for Unity:** the hand goes inside the glove, wrist at the strap, no fingers poking through the leather and no gap between wrist and glove; the pocket faces the ball when he reaches for it; scaled to the player's hand, not one size for every body; it stays seated through every clip (catch, dive, stretch, throw, celebration). Hide the bare hand's fingers under the glove if the mesh shows through.
- **A mirrored (left-handed) body must mirror the glove too.**
- **The ball goes into the pocket**, not the back of the hand or the wrist: on a catch, reach the glove hand to the ball (the prototype lerps the ball to the glove over the last moments; Unity should reach the hand with IK).
- **The throwing hand is bare and holds the ball** at the base of the fingers.
- Check it the same way as the bat: close-up screenshots of each body from the front, side and behind in the ready pose, the catch, the dive and the throw. Send them to the owner.

## 6. The trail cam and the tape measure (the distance counter)

Added 28 Nov at the owner's request. This is one of the signature moments: riding behind a home run while the feet run up.

**The camera**
- From 0.25 s after contact the camera rides **7 m behind the ball and 1.7 m above it, looking where the ball is going** (it reads the recorded flight a few points ahead, so it never lags or wobbles).
- **Which homers get it:** homers of 385 ft or more that are not given a bat-flip or show shot get it 82% of the time; **600 ft and up always**, the whole way out of the park and down onto the Moon; a ball bound for the lava cove is always followed in. About 45% of the under-600 ones are handed to one of the five aerial shots instead, and some 400–570 ft ones that stay in the building go to the blimp view. Never the same aerial kind twice running.
- **It lets go just before the ball hits the batter's eye**, so the carom is watched from the field.
- **The shot ends when the ball touches down and kicks up once** (0.75 s after it lands): no waiting for it to roll to a stop.
- A homer the visitors hit off you is followed the same way when it is 385 ft or more.

**The counter**
- Big numbers with a small "FT", **riding just above the ball** on screen (about 11% of the screen height above it, kept inside the screen edges and below the top bar).
- **It runs up live:** the number shown is the final distance × (how far the ball has traveled over the ground ÷ how far it will travel). So it climbs smoothly and arrives exactly at the final figure.
- **The instant it touches down it shows the final distance, exactly the number in the call.** The counter and the HOME RUN call must never disagree.
- **It heats up like a damage counter:** white to 350 ft, yellow by 410, orange by 470, red by 530, then darker through crimson to deep blood red by 1,134 ft. **From 530 ft it also grows and shakes with fire behind it**, more the further it goes.
- It appears 0.3 s into the flight and is hidden when paused.

**When the trail cam is not on:** a homer that lands in the seats or on the patio shows its distance for about 1.9 s **beside the spot where it came down** (fading over the last 0.4 s), only while the picture is still on the ball. Not on the Overdrive show shots, which have their own read-out. A small distance read-out also sits in the HUD during any tracked flight.

Code: `dftDom` (the counter), the `trailCam` branch of `updateCamera`, `hrFtShow` / `hrFtTick` (distance at the landing spot), and where `flight.trailCam` is set in `tryContact`. Pictures: the home-run camera strips in `port/look/`.

## 7. The hitter after a no-doubter: the finish, the bat flip, the show (added 28 Nov at the owner's request)

On the biggest homers the picture does not chase the ball straight away. **It stays on the hitter in the box** while he enjoys it. Code: where `flight.admire` is set in `tryContact`, the admire part of `updateClip` / `clipBat`, the admire branch of `updateCamera`.

**Two kinds, chosen at contact (the flight is already known):**
- **ADMIRE:** he **holds his follow-through**, **watches it go** (his head turns to follow the ball), and **drops or flips the bat**.
- **SHOW:** the same, and then **his own walk-up routine as a celebration**, right there at the plate (a salute, the flair, shadow boxing, whatever is his), or one from the celebration pool on the "flavor first" homers.

**When:**
- **The first homer of every game always gets the SHOW** (the first two in a player's first three games): "nobody plays a whole game without seeing what this game is."
- A **big one** (a Juice swing, or 500 ft and up): SHOW about a third of the time, ADMIRE about one in six, otherwise straight to a camera on the ball.
- **440 ft and up:** ADMIRE about three times in ten.
- **Never** on a ball bound for the Cove's lava, on 600 ft and up (those are always followed all the way), or in the modes with no celebrations.

**How it plays:**
- **How long the picture stays on him:** until 1.3 s before the ball comes down, but at least 1.2 s and at most 2.5 s (up to 3.9 s for a SHOW when there is no trot to follow). Then it cuts to the ball, one of the aerial shots, or the board, so the landing is still seen.
- **The swing does not snap back to the stance:** the follow-through is held and he flows from it into the flip or the routine.
- **The bat flip is seen before it is named:** the call PIMPED IT! waits one second, "you see the bat flip first, then the word". Other calls (NO DOUBTER!, SEE YA!, ABSOLUTE TANK!, LIFT OFF!, ADIOS PELOTA!, PLAKATA! and more, never the same one twice running) go up at once; three times in four the swing's own big word (TOMAHAWKED!, TURNED ON!, PERFECT!) is used instead when there is one.
- **Sound:** a no-doubter has its own crack laid over the bat sound, then the horn when it clears.
- **The SHOWBOAT achievement** drops 1.1 s in, after the flip has been seen.
- **The lasers** come on for about 45% of these, but never before the ball has cleared the wall.
- **The other side sags:** the outfielders slump as it goes over, and during the trot everyone on the field does.
- Then **the trot**, with the celebration at the plate (section 4); after the "loser" taunt the camera cuts to the pitcher wearing it.
- **A tap skips any of it**, and the homer still counts.

**In Unity:** these are the moments to polish: a real bat flip with the bat tumbling and landing, two or three different flips and finishes per hitter type (the one-handed finish, the bat drop, the slow walk out of the box), the head and eyes tracking the ball, and a clean blend from follow-through to celebration. Keep the rules about which plays when and never the same twice running.
