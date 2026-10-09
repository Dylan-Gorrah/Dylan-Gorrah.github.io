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

## Phones: two swipeable slides
On phones (≤ 680px) the bars and the radar share one spot as two slides, with the readout box fixed underneath both:
- **Slide 1 = the bars** (shown first), **slide 2 = the radar**. Two dots at the top right of the card show which one is showing (the active one is a longer green pill), and tapping a dot switches.
- **Swipe** sideways to switch. The slides follow your finger, and anything past the last slide resists. Vertical swipes still scroll the page.
- **Auto-advance** every **4.5s** (`AUTO` in `js/radar.js`). After a swipe or dot tap it holds still for **9s** (`PAUSE`). It also pauses while the tab is hidden or a view is open, and never auto-advances for reduced-motion visitors.
- Each slide replays its grow animation as it comes in (bars fill, radar grows from the centre).
- **How:** `.side` is unwrapped (`display:contents`) so the bars and readout become cells of `.pg`. The bars and chart sit in the same cell and slide with `translate`; `.pg.s1` = radar showing. CSS is in `css/responsive.css`, and on short phones the bar rows are tightened so all 7 fit.

Tablets and computers show both side by side as before. See [[Responsive Layout]].
