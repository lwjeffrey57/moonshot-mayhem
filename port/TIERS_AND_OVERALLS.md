# Overalls and tiers: the medal / gem system

Asked for by the owner on 28 Nov: make sure it is understood, and put it on the player cards, placards and everywhere else a player is shown. Code: `TIERS`, `tierOf`, `ovrT`, `ovrBat`, `ovrK`, `ovrAce`, `staffOvr`, `squadOvr`, `walkTier`, and the `[data-tier=...]` rules in the style sheet (`port/ui/style.css`). Pictures: the squad screen and walk-up cards in `port/look/`, and the owner's phone screenshots.

## The idea

**Every player has one number, his OVERALL, and a TIER that the number falls in.** The tier is shown as a jewel-shaped badge with the number inside it, and it colors the card's border. One glance tells you how good a player is and how rare.

| Tier | Overall | Badge | Color (main / dark) |
|---|---|---|---|
| **Ruby** | 90 and up | a faceted red gem | `#ff4d6d` / `#8a0f2a` |
| **Diamond** | 85 to 89 | a cut diamond, pale blue | `#8fe8ff` / `#2b7fd6` |
| **Gold** | 80 to 84 | a gold shield | `#ffd23b` / `#b9770a` |
| **Silver** | 75 to 79 | a silver shield | `#d9dfee` / `#7c869e` |
| **Bronze** | under 75 | a bronze shield | `#dd9a5e` / `#7a4418` |

Each tier's badge is its own drawn shape (the five SVGs are in the style sheet as `--tb`): the top two are gems, the lower three are shields. The number sits in the middle in the italic display face, dark on the bright badge.

## How the overall is worked out

Ratings in this game run from about 0.85 (poor) to 1.17 (elite). Each is first put on a 0-to-1 scale: `t = clamp((rating − 0.85) / 0.32, 0, 1.1)`.

- **A hitter (a Comet):** `60 + 38 × (0.4 × power + 0.4 × contact + 0.2 × speed)`, rounded. **Power and contact count double speed.** A hitter who has won a brawl (his power reads a grade higher) gets +3.
- **A Kraken hitter:** `60 + 38 × (0.42 × power + 0.42 × contact + 0.16 × eye)`.
- **A pitcher:** the average over his pitches of `0.6 × (the better of that pitch's velocity or break) + 0.4 × its control`. "Each pitch is its best weapon and its control."
- **The team:** the average of the nine hitters' overalls, shown as "OVR 81" at the top of My Squad in its own tier color.
- The overall **moves with the player's ratings during a game**: a hitter fired up by a hit-by-pitch or a won brawl goes up; one shaken up goes down (those changes last the game).

## Where it is shown (add it everywhere a player appears)

- **The walk-up card** (yours and the Krakens'): the gem badge with his overall at the top right, the tier's name in small capitals beside it, and **the whole card's border in the tier color**.
- **The hitter's placard while batting** (the card by the scoreboard at the start of an at-bat): the badge beside his name.
- **When you pitch:** the hitter's slim bar shows his badge between his name and his grades; **THE DUEL** line compares the two overalls ("ACE 80 vs ZLORP 81 · DEAD EVEN"; three or more apart is YOUR EDGE or HIS EDGE).
- **My Squad:** every card on the field diagram has its badge at the top corner and its border and name plate in the tier color; the bullpen strip along the bottom is a row of badges; the team's overall is at the top.
- **The big player card** (tap a player in My Squad): tier-colored frame, badge, ratings, perks.
- **The bullpen list and a pitcher's entrance card:** his overall and badge.
- **The scoreboard's "man at the plate"** can carry it too.

## Rules

- **The badge, the border and the number always agree** and all come from the one overall. Never hand-set a tier.
- **Letter grades and the overall are different things:** grades (S to F with + and −) describe one rating; the overall and tier describe the whole player. Both show.
- **Readable at every size:** the badge never drops below about 24 points on a phone; the number is always legible on its tier color.
- **It is the hook for card art later:** the owner wants rarer cards to have backgrounds that match their jewel (`port/VISUALS_AND_FILES.md`, card art). Build the tier as data on the player so the art, the frame, the badge and any future rarity effects (a shimmer on Diamond, a glow on Ruby) all read from it.
- No tier is for sale and none is a loot-box odds table (the owner's rule: no loot boxes, no currency for money).

## In Unity

- One small `Overall` / `Tier` module in the shared core with the formulas above and tests against the prototype's numbers for all nine Comets, the six Krakens and the fifteen arms.
- One badge prefab (five sprites or one shader with a tier parameter) used by every card, so a change shows everywhere.
- A place to do better: real gem and metal materials (a facet sparkle on Ruby and Diamond, brushed metal on the shields), a small animation when a card appears, and tier-colored light on the card.
