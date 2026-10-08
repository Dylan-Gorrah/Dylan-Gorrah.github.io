# View System
**Script:** `js/views.js` · **Styles:** `css/views.css` · **Markup:** each `<section class="view" id="v-NAME" hidden>` in `index.html` · Back to [[Portfolio Site]]

Turns each section into a full-screen "app screen" that opens over home.

## Anatomy of a view
```html
<section class="view" id="v-about" hidden>
  <header class="vbar">  Back button · eyebrow ".pos" (01 / 08) + <h2>title · prev/next ".nb" </header>
  <div class="vbody"><div class="vin">
     …content (each direct child animates in, one after another)…
  </div></div>
</section>
```
The header is identical in every view. Only the `<h2>` changes, and the `01 / 08` label is filled in by the script.

## Behaviour
- **Open:** a circle grows out of the tile you clicked (clip-path animation, 0.56s). The tab title becomes "About · Dylan Gorrah", the content plays its rise-in animations, and any `data-count="N"` numbers count up from 0.
- **Close (Back / Esc):** the circle shrinks back into the tile, and focus returns to that tile.
- **Prev / Next / ← → keys / phone swipe:** move through `viewOrder` and wrap around at the ends. On a swipe, the new view grows in from the screen edge.
- **Browser Back/Forward work.** Each view has its own address (`#about`, `#projects`…):
  - Opening a view **from home** adds one history entry. Moving **between** views (prev/next, arrow keys, swipe) *replaces* it instead of stacking up.
  - So the browser **Back** button always returns **home**, and **Forward** reopens the last view you were on.
  - The on-screen Back button and Esc step the browser history back too, so the address bar and the screen never disagree.
- **Direct links:** `yoursite/#projects` opens Projects straight away, and Back from there goes home (not off the site), because the script slips a home entry in underneath.
- All history calls are wrapped in `try/catch`, so if a browser refuses (some do for local files), the site still works, just without history.
- The code is in the "Browser history" block plus the `popstate` listener in `js/views.js`. `go(id, from, viaHistory)` and `home(viaHistory)` take a flag so a history-driven change doesn't add another entry.
- Every open and close fires a `site:view` event, which the [[CV Button]] uses to know when you are on home.
- Opening [[Stack]] re-renders its chips so they pop in again.

## Haptics
On phones: a tap plus a tick when the circle finishes growing (open), one tick per prev/next/swipe, and a tap plus a tick as it shrinks home. See [[Haptics]].

## Shared view styles (`css/views.css`)
| Class | Use |
|---|---|
| `.big` (+ `<em>`) | huge headline; `<em>` words go copper |
| `.lead2` | intro paragraph |
| `.card` | white rounded card |
| `.btns` / `.btn` / `.btn.p` | button row / outline button / dark primary button |
| `.tags` | row of small mono pills (`<ul><li>`) |
| `.pts` | bullet list with copper dashes |

## Adding a view
See [[Common Edits#Add a new section]].
