# Responsive Layout
**File:** `css/responsive.css` · Back to [[Portfolio Site]]

## What it does
Adapts the [[Home Screen]] to different screens. Home is meant to fit in **one screen with no scrolling**, so on smaller screens it hides less important bits rather than stacking everything.

| Breakpoint | Effect |
|---|---|
| ≤ 980px wide | Profile card stacks above the skill graph; graph subtitle hidden |
| touch tablets, upright / sideways | Profile photo shown large (2×, no hover): ~240–255px upright, ~200–215px sideways (~280px tall tablets); sideways on screens ≤ 820px tall the intro collapses to "…" to make room (see [[Profile Card]]) |
| 681–980px (tablet) | Page may scroll; tile subtitles and fact pills hidden; graph has a fixed height |
| ≤ 680px (phone) | Big photo swapped for a small avatar beside the name ([[Profile Popup]]); tiles become icon + label only; radar bars, identity and facts hidden; name on one line |
| ≤ 680px wide **and** ≤ 760px tall | Also hides the photo row and the graph title (the one-line intro stays; most phones in Safari fall in this range, e.g. iPhone 11 ≈ 715px) |
| ≤ 430px | Footer links hidden |
| > 980px but short (≤ 780 / ≤ 660px tall) | Hides facts/subtitles, then the intro |
| ≤ 380px | Tighter padding, smaller tile labels; tighter view header (that part lives at the end of `views.css` so it loads late enough to apply) |

Views have their own simple layout (max 760px wide, centred) in `css/views.css`. They mostly don't need breakpoints.

Notches and cut-outs are handled separately in [[Safe Areas]].

## ⚠ Load order matters
The CSS files load in this order: `base → home → responsive → views → sections/* → animations`. When two rules are equally specific, **the later file wins**. Rules that adjust view parts must therefore live in `views.css` or later, not in `responsive.css`. See [[Known Quirks]].
