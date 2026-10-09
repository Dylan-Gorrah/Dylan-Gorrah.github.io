# Intro Animation
**Switch:** the inline `<script>` in `<head>` of `index.html` · **Styles:** `css/intro.css` (+ `inkIn` in `css/animations.css`) · **Script:** `js/intro.js` · Back to [[Home Screen]]

A "blueprint plotter" loading animation on the home screen, about 1.5 seconds long:
1. The page starts as drafting paper: a faint dot grid with the blocks hidden.
2. A pencil-grey pen tip (a dot with a soft halo) traces each block's outline in sequence: ticker → top bar (a line under it) → profile card → skill graph → the 8 tiles one after another → footer (a line over it). Outlines follow each block's real rounded corners.
3. On the top edge of the two big cards, a small size tag (paper-backed, so it breaks the line like a dimension on a technical drawing) **measures** the card as the pen draws (`543 × 728`, counting up from 0 × 0).
4. When an outline is ~90% drawn, that block **inks in** (fades in while lifting 8px) and the outline fades away. Everything inside the block (name slide-up, tile icons drawing, ticker, radar growth) starts only then.
5. The dot grid fades out.

About 1.5s on a fast device (shorter on slow ones, see below).

## How it works
- The `<head>` script adds `html.intro` **before the first paint**, so nothing flashes. `css/intro.css` keeps the blocks hidden and pauses every animation inside them.
- `js/intro.js` measures each block, draws the outlines in a fixed full-screen SVG layer, and adds `.inked` to each block on cue. At the end it removes the layer and adds `html.intro-done`.
- **Alignment:** waiting blocks sit 8px low (the start of their lift), so the script subtracts that offset when measuring. Outlines are drawn where each block will *end up*. If you change the lift in `inkIn`, nothing else needs changing.
- `Site.introLag` (520ms, less when sped up) delays the [[Skill Graph]] growth so it happens after its card has inked in.

## Built to stay snappy on slow phones
- `js/intro.js` is loaded **right after the home markup**, before the other scripts, so it starts as soon as the page can be measured (it doesn't use `Site.$`, because `utils.js` hasn't run yet).
- **Speeds up when the page was slow:** if it gets to start after 1.1s, the whole sequence plays at ~0.55× the length; after 2.2s it's skipped and the page just shows. (`speed` near the top of the script.)
- **Cheap to draw:** no blur or glow filters. Blocks fade and lift (`opacity` + `translate`), the pen glow is a second faint circle, and the pen's route is measured once up front instead of every frame.
- On a throttled slow-4G phone test it starts at ~1.4s and is done by ~2.5s.

## Skipped when
- The visitor's OS asks for **reduced motion**.
- It has **already played in this browser tab** (`sessionStorage` key `introSeen`), so reloads and coming back are instant. A new tab plays it again.
- The page is opened on a direct view link like `#projects`.
- **Safety net:** if the scripts never run, the `<head>` timer adds `intro-done` after 5s and everything shows.

## Edit
- **Order and timing:** the `plan` list at the top of `js/intro.js`: `[selector, 'box' | 'under' | 'over', start ms, draw ms, size label?]`. Tiles are spaced 60ms apart (`i*60`).
- **Colour:** `--pencil` in `css/base.css` (graphite grey, separate from the `--copper` accent).
- **Thickness / glow:** `.ink-layer path` and `.ink-pen .halo` in `css/intro.css`.
- **Grid:** `html.intro body::before` in `css/intro.css`.
- **Turn it off:** delete the `<head>` script (the rest then does nothing).
- **Adding a new block to the home screen:** add its selector to the `:is(...)` lists in `css/intro.css` **and** to `plan`, or it won't take part (it will just show normally).
