# Section Tiles
**Markup:** `<nav class="tiles">` · **Styles:** `.tiles`, `.tile`, `.gl`, `.tb` in `css/home.css` · Back to [[Home Screen]]

The 8 app-style buttons under the skill graph. Clicking one opens its view (see [[View System]]).

Each tile looks like:
```html
<button class="tile spot" type="button" data-go="about" style="--n:0">
  <span class="tt"><span class="gl"><svg>…icon…</svg></span><span class="ix">01</span></span>
  <span class="tb"><b>About</b><small>Who I am</small></span>
</button>
```
- `data-go`: the id of the view to open (`about` opens `#v-about`). **Must match** the view's id and an entry in `viewOrder` in [[Site Data]].
- `--n`: the tile's position. It staggers the load-in and icon-draw animations.
- `.ix`: the number label. `<small>` is the subtitle (hidden on small screens).
- The icon is an inline SVG with `pathLength="1"` so it can "draw" itself (`draw` in [[Animations]]).

Desktop: 4 × 2 grid. Phone: still 4 columns, but icon + label only.
