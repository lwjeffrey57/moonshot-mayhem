# Assets and animations in the prototype

Everything the game loads, from the prototype repo. **Models are binary FBX files stored as base64 text.** `base64 -d ely.txt > ely.fbx` (same for every `*.txt` model) gives an FBX that Unity imports directly, skeleton and all. The animation clips are stored separately as JSON keyframe tracks (see below) and will need converting or re-capturing; textures are JPG (`_d` color, `_n` normal map, `_s`/`_g` extra maps).

## Animation clips

`ely_clips.min.json` is the main library: every walk-up, celebration, fielding, throwing, fighting and reaction clip, all on one skeleton. Names are the keys the code uses. Prefixes: `w_` walk-up routines, `p_` pitcher taunts and celebrations, `c_` celebrations and reactions at the plate, `d_` defeat reactions, `b_` brawl moves, `q_` slides and collisions at a base, `x_` dives and falls, `f_` fielding, `st_` batting stances, `sw_` swings, `a_`/`u_` misc.

| Clip | Seconds | Tracks |
|---|---|---|
| **from `ely_clips.min.json`** | | |
| `hit` | 2.97 | 53 |
| `idle` | 1.50 | 53 |
| `strike` | 6.93 | 53 |
| `catch` | 9.17 | 53 |
| `w_walkin` | 3.30 | 53 |
| `w_flair` | 1.00 | 53 |
| `w_boxing` | 1.73 | 53 |
| `w_ondeck` | 3.30 | 53 |
| `run` | 0.70 | 53 |
| `w_bdance` | 3.20 | 53 |
| `d_1` | 3.40 | 53 |
| `d_2` | 3.40 | 53 |
| `d_3` | 3.40 | 53 |
| `p_twerk` | 3.60 | 53 |
| `p_loser` | 3.25 | 53 |
| `p_chicken` | 3.60 | 53 |
| `w_arrow` | 3.60 | 53 |
| `w_salsa` | 3.60 | 53 |
| `w_sad` | 2.93 | 53 |
| `idle2` | 2.33 | 53 |
| `w_trip` | 3.20 | 53 |
| `w_macarena` | 3.60 | 53 |
| `p_macarena` | 3.60 | 53 |
| `c_fist` | 1.40 | 53 |
| `p_fist` | 1.40 | 53 |
| `w_golf` | 3.40 | 53 |
| `w_wave` | 0.53 | 53 |
| `w_pushup` | 1.53 | 53 |
| `w_fight` | 3.40 | 53 |
| `w_milling` | 3.40 | 53 |
| `w_drive` | 3.40 | 53 |
| `strafe` | 0.67 | 53 |
| `w_threat` | 3.40 | 53 |
| `p_threat` | 3.40 | 53 |
| `p_clap` | 2.47 | 53 |
| `w_bboy` | 2.27 | 53 |
| `p_bboy` | 2.27 | 53 |
| `w_backflip` | 3.40 | 53 |
| `p_backflip` | 3.40 | 53 |
| `jog` | 2.57 | 53 |
| `throw` | 1.80 | 53 |
| `w_lift` | 3.40 | 53 |
| `p_runman` | 3.50 | 53 |
| `turn` | 0.77 | 53 |
| `p_sadwalk` | 1.47 | 53 |
| `p_dying` | 3.40 | 53 |
| `c_hbpfall` | 3.00 | 53 |
| `c_hbpup` | 3.10 | 53 |
| `x_limp` | 0.63 | 53 |
| `x_dive` | 3.23 | 53 |
| `b_stance` | 2.37 | 53 |
| `b_jab` | 1.27 | 53 |
| `b_jabstep` | 1.73 | 53 |
| `b_quad` | 2.17 | 53 |
| `b_kickl` | 2.13 | 53 |
| `b_kickr` | 1.50 | 53 |
| `b_butt` | 2.10 | 53 |
| `b_block` | 3.43 | 53 |
| `b_hit1` | 3.40 | 53 |
| `b_hit2` | 1.60 | 53 |
| `b_gut` | 1.50 | 53 |
| `w_hurricane` | 1.83 | 53 |
| `q_flykick` | 1.50 | 53 |
| `q_slide` | 1.33 | 53 |
| `b_breath` | 0.83 | 53 |
| `c_moonwalk` | 1.03 | 53 |
| `w_salute` | 2.83 | 53 |
| `w_salsa2` | 2.43 | 53 |
| `u_strike` | 2.63 | 53 |
| `b_liver` | 2.80 | 53 |
| `b_gutp` | 1.17 | 53 |
| `b_knee` | 2.27 | 53 |
| `b_round` | 2.03 | 53 |
| `b_head` | 1.63 | 53 |
| `c_kipup` | 2.03 | 53 |
| `p_mound` | 1.63 | 53 |
| `x_dive2` | 3.47 | 53 |
| `w_cartwheel` | 3.53 | 53 |
| `p_step` | 1.00 | 53 |
| `w_stepup` | 3.33 | 53 |
| `x_wall` | 4.17 | 53 |
| `q_takeout` | 3.60 | 53 |
| `f_ready` | 4.63 | 53 |
| `p_boogie` | 3.60 | 53 |
| `p_joy` | 1.87 | 53 |
| `p_shuffle` | 3.80 | 53 |
| `p_wavy` | 4.00 | 53 |
| `p_town` | 3.83 | 53 |
| `p_chick2` | 3.80 | 53 |
| `p_outta` | 3.60 | 53 |
| `p_float` | 3.60 | 53 |
| `x_crawl` | 1.80 | 53 |
| `f_turn180` | 1.63 | 53 |
| `p_dosido` | 6.00 | 53 |
| `st_wide` | 4.00 | 53 |
| `st_norm2` | 4.00 | 53 |
| `x_duck` | 1.53 | 53 |
| `p_shrug` | 1.40 | 53 |
| `st_sword` | 0.67 | 53 |
| `a_look` | 4.77 | 53 |
| `f_jumpcatch` | 3.40 | 53 |
| `sw_golf` | 4.00 | 53 |
| `f_barehand` | 0.87 | 53 |
| `w_drunk` | 3.00 | 53 |
| `throw_cap` | 1.72 | 53 |
| `f_stretch` | 2.45 | 53 |
| **from `clips.json`** | | |
| `hit` | 1.97 | 53 |
| `idle` | 1.50 | 53 |
| `strike` | 6.93 | 53 |
| `pitch` | 2.60 | 53 |

## Files

| File | Size (KB) | What |
|---|---|---|
| `abe.txt` | 1869 | character body |
| `abe_d0.jpg` | 142 | texture |
| `abe_n0.jpg` | 194 | texture |
| `alien.txt` | 3045 | character body |
| `alien_d0.jpg` | 116 | texture |
| `alien_d1.jpg` | 113 | texture |
| `alien_n0.jpg` | 214 | texture |
| `alien_n1.jpg` | 213 | texture |
| `astra.txt` | 3568 | character body |
| `astra_d0.jpg` | 124 | texture |
| `astra_d1.jpg` | 141 | texture |
| `astra_n0.jpg` | 246 | texture |
| `astra_n1.jpg` | 180 | texture |
| `bat.txt` | 59 | bat |
| `brady.txt` | 3950 | character body |
| `brady_d0.jpg` | 151 | texture |
| `brady_d1.jpg` | 100 | texture |
| `brady_n0.jpg` | 172 | texture |
| `brady_n1.jpg` | 173 | texture |
| `clips.json` | 521 | animation data |
| `crypto.txt` | 1910 | character body |
| `crypto_d.jpg` | 154 | texture |
| `crypto_n.jpg` | 301 | texture |
| `david.txt` | 3388 | character body |
| `david_d0.jpg` | 79 | texture |
| `david_n0.jpg` | 154 | texture |
| `demon.txt` | 2048 | character body |
| `demon_d0.jpg` | 152 | texture |
| `demon_n0.jpg` | 178 | texture |
| `dish.txt` | 509 | satellite dish |
| `dome.txt` | 630 | habitat dome |
| `drake.txt` | 2664 | character body |
| `drake_d0.jpg` | 141 | texture |
| `drake_d1.jpg` | 109 | texture |
| `drake_n0.jpg` | 116 | texture |
| `drake_n1.jpg` | 96 | texture |
| `dreyar.txt` | 1957 | character body |
| `dreyar_d0.jpg` | 124 | texture |
| `dreyar_n0.jpg` | 167 | texture |
| `dugout.txt` | 424 | dugout |
| `dummy.txt` | 2687 | test body |
| `dummy_d0.jpg` | 92 | test body |
| `dummy_n0.jpg` | 152 | test body |
| `earth.png` | 555 | texture |
| `ely.txt` | 1107 | base player body (animation skeleton) |
| `ely_clips.json` | 12559 | base player body (animation skeleton) |
| `ely_clips.min.json` | 6439 | base player body (animation skeleton) |
| `ely_d.jpg` | 251 | base player body (animation skeleton) |
| `ely_g.jpg` | 28 | base player body (animation skeleton) |
| `ely_n.jpg` | 252 | base player body (animation skeleton) |
| `ely_s.jpg` | 311 | base player body (animation skeleton) |
| `exo.txt` | 3271 | armored exo-suit body |
| `exo_body.jpg` | 69 | armored exo-suit body |
| `exo_suit.jpg` | 53 | armored exo-suit body |
| `exored.txt` | 3275 | red exo-suit body |
| `exored_d0.jpg` | 284 | red exo-suit body |
| `exored_d1.jpg` | 218 | red exo-suit body |
| `exored_n0.jpg` | 160 | red exo-suit body |
| `exored_n1.jpg` | 171 | red exo-suit body |
| `fuel.txt` | 493 | fuel tank |
| `glove.txt` | 319 | glove |
| `jolleen.txt` | 2860 | character body |
| `jolleen_d0.jpg` | 123 | texture |
| `jolleen_n0.jpg` | 189 | texture |
| `jones.txt` | 3321 | character body |
| `jones_d0.jpg` | 235 | texture |
| `jones_n0.jpg` | 152 | texture |
| `lander.txt` | 670 | lunar lander prop |
| `maynar.txt` | 2574 | character body |
| `maynar_d0.jpg` | 187 | texture |
| `maynar_d1.jpg` | 170 | texture |
| `maynar_n0.jpg` | 163 | texture |
| `maynar_n1.jpg` | 152 | texture |
| `mc.txt` | 477 | mission-control module |
| `moon_d.jpg` | 66 | texture |
| `moon_n.jpg` | 313 | texture |
| `olivia.txt` | 3386 | character body |
| `olivia_d0.jpg` | 120 | texture |
| `olivia_d1.jpg` | 69 | texture |
| `olivia_n0.jpg` | 166 | texture |
| `olivia_n1.jpg` | 150 | texture |
| `parker.txt` | 1500 | character body |
| `parker_d0.jpg` | 113 | texture |
| `racer.txt` | 3242 | character body |
| `racer_d0.jpg` | 134 | texture |
| `racer_n0.jpg` | 148 | texture |
| `rocket.txt` | 709 | rocket |
| `romero.txt` | 3283 | character body |
| `romero_d0.jpg` | 151 | texture |
| `romero_d1.jpg` | 152 | texture |
| `romero_n0.jpg` | 243 | texture |
| `romero_n1.jpg` | 223 | texture |
| `sat.txt` | 535 | satellite |
| `sfx/ball.mp3` | 11 | sound |
| `sfx/ball2.mp3` | 9 | sound |
| `sfx/ball3.mp3` | 13 | sound |
| `sfx/ball4.mp3` | 21 | sound |
| `sfx/bed.mp3` | 513 | sound |
| `sfx/boo1.mp3` | 80 | sound |
| `sfx/boo2.mp3` | 94 | sound |
| `sfx/boo3.mp3` | 78 | sound |
| `sfx/catch2.mp3` | 7 | sound |
| `sfx/cheer.mp3` | 69 | sound |
| `sfx/cheer_big.mp3` | 63 | sound |
| `sfx/clap1.mp3` | 61 | sound |
| `sfx/clap2.mp3` | 89 | sound |
| `sfx/crush.mp3` | 5 | sound |
| `sfx/foul.mp3` | 14 | sound |
| `sfx/horn.mp3` | 99 | sound |
| `sfx/nodoubt.mp3` | 9 | sound |
| `sfx/org_charge.mp3` | 57 | sound |
| `sfx/org_chord.mp3` | 102 | sound |
| `sfx/org_clap.mp3` | 58 | sound |
| `sfx/org_letsgo.mp3` | 47 | sound |
| `sfx/org_lgo.mp3` | 118 | sound |
| `sfx/org_mariachi.mp3` | 35 | sound |
| `sfx/org_neenaa.mp3` | 40 | sound |
| `sfx/org_post.mp3` | 47 | sound |
| `sfx/org_rise.mp3` | 63 | sound |
| `sfx/out.mp3` | 10 | sound |
| `sfx/playball.mp3` | 13 | sound |
| `sfx/pop_max.mp3` | 137 | sound |
| `sfx/strike.mp3` | 14 | sound |
| `sfx/strike2.mp3` | 13 | sound |
| `sfx/swing1.mp3` | 8 | sound |
| `sfx/swing2.mp3` | 8 | sound |
| `sfx/swing3.mp3` | 7 | sound |
| `sfx/swing4.mp3` | 5 | sound |
| `sfx/ump_ball.mp3` | 14 | sound |
| `sfx/ump_k3.mp3` | 11 | sound |
| `sfx/ump_out.mp3` | 3 | sound |
| `sfx/ump_out2.mp3` | 13 | sound |
| `sfx/ump_safe.mp3` | 7 | sound |
| `sfx/ump_safe2.mp3` | 7 | sound |
| `sfx/ump_strike.mp3` | 18 | sound |
| `sfx/vendor.mp3` | 68 | sound |
| `sky.jpg` | 2065 | texture |
| `sky_m.jpg` | 426 | texture |
| `soda.txt` | 507 | giant soda can |
| `stars.jpg` | 614 | texture |
| `tower.txt` | 484 | light tower |
| `ufo.txt` | 321 | flying saucer |
| `vboard.txt` | 481 | video board |
| `zlorp.txt` | 2116 | character body |
| `zlorp_d0.jpg` | 161 | texture |
| `zlorp_d1.jpg` | 164 | texture |
| `zlorp_n1.jpg` | 144 | texture |

Sounds in `sfx/` are placeholders and are **not cleared for release**; the store version needs replacements. See `CREDITS.md` in the repo root for where assets came from.

