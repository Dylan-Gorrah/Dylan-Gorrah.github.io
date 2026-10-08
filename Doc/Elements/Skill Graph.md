# Skill Graph
**Markup:** `.tech-card` (`#radar`, `#chart`, `#stats2`, `#read`) · **Script:** `js/radar.js` · **Data:** `skills` in [[Site Data]] · **Styles:** `.tech-card` … `.read` in `css/home.css` · Back to [[Home Screen]]

The dark "01 / Overall stats: Skill graph." card. It's a game-style radar chart of your self-rated skills, with matching bars on the side and a readout box that shows the tools behind the highlighted skill.

## Behaviour
- **Load:** the shape grows out from the centre and the bars fill in (~1.2s).
- **Auto-cycle:** every 2.4s it highlights the next axis. It pauses while you hover, for 5s after a tap, while the browser tab is hidden, and while any view is open.
- **Hover or tap** an axis label or a bar to highlight it. The readout shows `Name · score / 100` and its description.

## Readout box keeps a steady height
The readout (`#read`) used to grow from one line to two when a long description showed up (e.g. Testing), which pushed the bars and radar around. Now every description is also laid out **invisibly in the same spot** (`.rb > .ghost`, all sharing one grid cell), so the box is always as tall as the **longest** description at the current screen width. Only the visible `<b>` changes text, and nothing around it moves. It works automatically for new or longer descriptions; there's nothing to tune.

## Build
The script draws everything into the SVG from the data: 4 grid rings, the spokes, the filled area and the dots. Labels and bars are real `<button>`s, so they work with the keyboard. Axis count = number of skills.

## Edit
Change the `v` numbers (0–100), names `k` or tool text `d` in `skills` in `js/data.js`. Titles ("Skill graph.", the subtitle) are in `index.html`.

On phones the bars are hidden and only the radar and readout show. See [[Responsive Layout]].
