# Spotlight Effect
**Files:** `js/spotlight.js` (tracks the mouse) + `.spot` rules in `css/base.css` (draws the glow) · Back to [[Portfolio Site]]

Any element with class `spot` gets a soft copper radial glow that follows the mouse while you hover it. The script writes the pointer position into the CSS variables `--mx` / `--my` on that element, and the CSS draws a gradient there. It's ignored on touch screens.

**To use it:** add `spot` to an element's class list. Used on tiles, cards, project cards, contact rows and more.

Because the glow is a `::before` layer, content inside sometimes needs `position:relative; z-index:1` to stay above it (see `.ph`, `.row .k` etc.).
