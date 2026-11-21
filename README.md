# Moonshot Mayhem

An original over-the-top arcade batting game for the browser, built with three.js (r128). Three innings, timing-and-aim batting, turbo "Juice" swings, Overdrive streaks, special pitches, and motion-captured batter and pitcher.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole game: page markup, styles and game code. It is written as an artifact fragment (no `<html>`/`<body>` wrapper). |
| `body.txt` | The alternative "mannequin" player (a bare Mixamo body, FBX, textures removed, base64). Its uniform and helmet are painted on in code. Selectable on the title screen. |
| `ely.txt`, `ely_d/n/s/g.jpg` | The default player: Mixamo's "Ely" armoured character (FBX mesh, base64) with its own colour, normal, specular and glow textures. The pitcher's armour is recoloured in code. |
| `ely_clips.json` | Swing, stance, swing-and-miss and fly-ball catch clips made for Ely. They override the generic ones in `clips.json` when Ely is selected. |
| `bat.txt` | The bat model (FBX, base64-encoded). Re-oriented, scaled and coloured in code; a code-built bat is used if it is missing. |
| `clips.json` | Motion-capture clips as plain keyframe data: `hit` (swing), `idle` (batting stance), `strike` (swing and miss with reaction), `pitch`. |
| `tools/` | Scripts used to prepare the assets (see below). |

`index.html` loads `body.txt` and `clips.json` with relative `fetch()` calls, and loads three.js plus its FBX loader and post-processing passes from cdnjs / jsDelivr. If the model files are missing, the game falls back to simple code-built figures.

## Running it locally

`fetch()` does not work from `file://`, so serve the folder and wrap the fragment in a page. For example:

```bash
(echo '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}[hidden]{display:none!important}</style>'; cat index.html) > local.html
```

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/local.html`.

## Controls

- Mouse (or drag on touch): aim the bat ring
- Click / Z / Space: contact swing
- Right-click / X: power swing
- Shift (hold while swinging): spend a bar of Juice
- Esc / P: pause menu (resume, restart, main menu)

## Preparing assets

Mixamo downloads "with skin" embed four 4K textures and weigh about 35 MB. The game does not use those textures.

- `tools/fbxstrip.py in.fbx out.fbx` rewrites a binary FBX with the embedded images removed (35 MB becomes about 2 MB). Base64-encode the result to make `body.txt`.
- `tools/extract-clips.html` + `tools/extract-clips.js` load animation FBX files in headless Chromium (Playwright) and write each clip's keyframes to JSON. Track names are stored without the `mixamorig` prefix so a clip made for one Mixamo character can drive another.

## Asset credits

Character and animations are from Adobe Mixamo, used under Mixamo's terms for use inside a project.
