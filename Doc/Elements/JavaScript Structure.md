# JavaScript Structure
**Folder:** `js/` · Back to [[Portfolio Site]]

## How it fits together
These are plain `<script>` files, **not** ES modules. Browsers block modules on pages opened straight from a folder (`file://`), and the site has to keep working that way. To share things, every file reads from and writes to one global object, `window.Site`.

Load order (bottom of `index.html`). **Keep it this way:**
1. `utils.js`: creates `Site` and adds `Site.$` (find one element), `Site.$$` (find all, as an array) and `Site.rm` (true if the visitor prefers reduced motion) and **`Site.motion`** (durations and easing of the grow/shrink animations, shared with [[Haptics]]).
2. `data.js`: `Site.data`, all the lists. See [[Site Data]].
2b. `haptics.js`: `Site.haptics.play(name)`. See [[Haptics]].
3. `ticker.js`: [[Ticker]]
4. `radar.js`: [[Skill Graph]]
5. `spotlight.js`: [[Spotlight Effect]]
6. `stack.js`: [[Stack]] chips. Also publishes `Site.renderChips` for views.js.
7. `views.js`: [[View System]]
8. `projects.js`: [[Projects]] accordion
8b. `lead.js`: the phone intro "…" expander, see [[Profile Card]]
9. `cv-button.js`: [[CV Button]]. Listens for the `site:view` event.
10. `profile-pop.js`: [[Profile Popup]] (phone avatar → summary card)
11. `fullscreen.js`: full-screen toggle, see [[Fullscreen & App Mode]]

**Events:** `views.js` fires `site:view` on `document` whenever a view opens (`detail.id` = view id) or home returns (`detail.id` = null). Listen for it instead of editing views.js.

Each feature file is wrapped in `(function(S){ ... })(window.Site);`, so its own variables don't leak into other files.

## Adding a new script
Create `js/thing.js` using the same wrapper, then add `<script src="js/thing.js"></script>` after `data.js` in `index.html`.
