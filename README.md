# MiniEngine-I

MiniEngine-I is a private Scratch-like game engine prototype built with Blockly and HTML5 canvas.

## Features

- Blockly visual coding
- Multi-sprite system with separate code workspaces
- Costume editor canvas
- Sound editor for generated tones and effects
- Scratch-like variable and sprite interactions
- Modular file organization so code can be split across multiple JS files without breaking access

## Run locally

```bash
python3 -m http.server 8000
```

Then open:

http://localhost:8000

## Project structure

- `index.html` — app shell
- `styles.css` — app styling
- `js/blocks.js` — custom Blockly blocks and toolbox
- `js/engine.js` — runtime engine and game logic
- `js/sprite.js` — sprite model and costume storage
- `js/app.js` — app UI, file wiring, and runtime behavior
