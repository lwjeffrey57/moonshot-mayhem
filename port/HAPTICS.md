# Vibration (haptics): iPhone first

From the owner, 28 Nov. The web build could never do this: an iPhone's browser has no vibration at all, so every `buzz()` call in the prototype is silent on his phone and **none of it has ever been felt or tuned.** Treat this as new design work, with the prototype's `buzz()` calls only as a list of *which moments* deserve one. He wants the iPhone's good haptics used properly. Android comes later; keep it in mind.

## What the iPhone can do (use this, not a plain buzz)

- **Core Haptics** plays two kinds of event, each with an **intensity** (how strong) and a **sharpness** (dull thud to crisp tick): a **transient** (one tap) and a **continuous** (a rumble with a length that can swell or fade). They can be sequenced into patterns and synced to sound.
- The simple system taps (light / medium / heavy / rigid / soft impact, selection tick, success / warning / error) are fine for menus and buttons.
- Unity has no built-in access to this. It needs a small native iOS plugin (a thin Swift bridge is enough) or a free open-source haptics package. **Do not buy one; ask before adding any third-party package** (security rule).
- Works on iPhone 8 and later. Honors the phone's own "System Haptics" switch. Does nothing while the phone is recording audio. No effect on iPad.

## Design rules

1. **Haptics follow the same quality number as everything else.** One function, `Feel(event, q)`, called from the same place that fires the freeze, shake and sound, so they can never drift apart.
2. **Contact is the star.** A weak tip should be a faint tick; a barreled power swing should be the strongest, crispest hit in the game. Nothing else may be as strong as a perfect-perfect homer.
3. **Sharp for wood and leather, dull for bodies and ground.** Bat on ball and ball in mitt: high sharpness. A hit by pitch, a dive, a collision, a ball off the wall: low sharpness, more weight.
4. **Rumbles are rare and short:** the crowd swell on a no-doubter, the rocket, the brawl. Never a constant buzz.
5. **Inputs get a tick, results get a hit.** Every button press is a light tick so it is never in doubt the touch was taken; the outcome is what is felt strongly.
6. **Never punish the hands.** No haptic on a swing and miss beyond the swing's own light whoosh tick. Losing should feel empty, not buzzy.
7. **A setting:** Vibration Full / Light / Off, default Full. Off must be truly off. Reduce in low power mode.
8. **Measure on the phone.** Nothing here has been felt. Build a test screen that plays each one by name so the owner can tune them in one sitting.

## The first set (starting values, all to be tuned by the owner on the phone)

Intensity and sharpness are 0 to 1.

| Moment | Haptic |
|---|---|
| **Bat on ball** | Transient. Intensity `0.25 + 0.75 q`, sharpness `0.5 + 0.5 q`. Power swing +0.1 intensity. |
| Barreled (q > .85) | The contact hit, then a second softer one 60 ms later (the "ring" in the hands). |
| **PERFECT / no-doubter** | Contact hit at full, then a 0.4 s continuous swell at 0.5 fading out. |
| Tipped / foul tip | One faint tick (0.2, sharpness 0.9). |
| Jammed / off the end | Dull transient (0.5, sharpness 0.2): it should sting. |
| Swing and miss | A light whoosh tick at the swing (0.15), nothing after. |
| **Home run clears the wall** | Three rising transients, then a 0.6 s rumble with the horn. |
| Grand slam, flyover, rocket | A longer rumble (1 s), swelling. |
| Ball off the wall / batter's eye / a prop | One heavy dull transient at impact. |
| Ball in the catcher's mitt (taking a pitch) | A crisp light tick; heavier for a Juice pitch. |
| Called strike three against you | One dull medium thud. |
| **Hit by pitch** | Heavy dull transient, then two fading ones. |
| Brawl blows | A transient per blow, each harder; the knockout the hardest plus a short rumble. |
| Juice on / off | A light rigid tick. **Overdrive lights:** two quick rising taps. |
| Overdrive heartbeat (if kept) | A soft double tap in time with the sound, very light. |
| **Pitching: power set** | A tick whose strength is the power stopped at; MAX is a crisp double. |
| **Pitching: release** | Perfect: crisp strong transient plus a soft echo. Good: medium. Mistimed: one dull weak thud. |
| Strikeout thrown | Two crisp taps and a short swell. |
| **Event (QTE) arrows** | A light tick per correct arrow, rising in sharpness; a dull double for a wrong one. Won: crisp triple. Lost: one dull thud. |
| Needle stop / mash | Mash: a light tick per tap. Needle on gold: the success pattern, stronger. |
| GO / STAY offer appears | One light tick. |
| Achievement plate | The system "success" tap. |
| Menu buttons | The system selection tick. |

The prototype's own `buzz()` patterns (durations in ms, for reference on which moments it marked) are throughout `index.html`; 51 functions call it, including `tryContact`, `finishPlay`, `addRuns`, `pdThrow`, `qteKey`, `qteDone`, `brawlTick`, `hbpStart`, `lampSmash`, `bdgShow`.

## Android (later)

- Keep `Feel(event, q)` as the only entry point, with the iPhone patterns behind it. Android gets its own table: newer phones can vary strength (`VibrationEffect` with amplitudes, and richer "primitives" on some models); many cheap ones only buzz on and off. Design three tiers: rich, amplitude-only, on/off, and test on at least one cheap phone.
- Game controllers (PC, later): map the same events to controller rumble.

## What to build first

1. The native bridge and `Feel()` with the setting.
2. The test screen that plays each row by name.
3. Contact, mitt, homer and release wired in. Hand it to the owner to tune before wiring the rest.
