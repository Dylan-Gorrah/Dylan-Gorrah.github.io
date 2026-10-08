# CV Button
**Markup:** `<a class="cv-btn" id="cvBtn">` + the `<svg class="lg-defs">` filter in `index.html` (just after the home `</div>`) · **Styles:** `css/cv-button.css` · **Script:** `js/cv-button.js` · **File:** `CV/` · Back to [[Home Screen]]

A floating Apple-style "liquid glass" **Download CV** pill at the bottom centre of the home screen. It stays hidden until the visitor has been **idle on home for 5 seconds**, then springs up and stays.

## Behaviour
- Any mouse move, click, key, scroll or touch restarts the 5s countdown, so it only appears once someone stops to read.
- Once it's shown, it stays (moving the mouse doesn't hide it, so people can reach it).
- **Home only:** it hides as soon as a [[View System|view]] opens. Coming back home starts the 5s countdown again.
- It listens for the `site:view` event that `js/views.js` sends on every open and close.
- While shown, it gently floats and the arrow nudges. Both are turned off for reduced-motion visitors (see [[Animations]]).

## The glass look (Apple-style liquid glass)
Built from the standard web technique for Apple's material: the pill acts as a **lens** that bends the page behind it at the rim and leaves the middle clear.

| Layer | Where | How |
|---|---|---|
| Lens | `.lg-glass` | `backdrop-filter: url(#lg-cv)` runs an SVG filter on whatever is behind the button |
| Refraction | `<filter id="lg-cv">` in `index.html` | `feDisplacementMap` shifts backdrop pixels using a **displacement map** (an image where red = sideways shift, blue = up/down, mid-grey = none) |
| Displacement map | `mapURL()` in `js/cv-button.js` | Drawn pixel by pixel to fit the button. Mid-grey in the middle; in the rim (`RIM` = 38% of the height) it ramps up, pointing out through the nearest edge, so the rim shows a squeezed view of what's just outside it |
| Rainbow fringe | the same filter | Three displacement passes, one per colour channel, at slightly different strengths (`scale` 22 / 19.5 / 17), screened back together |
| Rim light | `.lg-glass` box-shadow | bright top-left edge, softer bottom-right, an inner glow and a hairline outline, then the drop shadow |
| Specular | `.cv-btn::after` | a soft white spot that follows the pointer (`--lx` / `--ly`) |
| Icon | `.cv-ic` | dark bubble with a pink file icon (`#i-file`, see [[Icons]]) |

### Browser support
- **Chrome / Edge / Opera:** full refraction. The script detects Chromium and adds `.lg-refract`.
- **Safari / Firefox:** they draw *nothing* for `backdrop-filter: url()` (and `@supports` wrongly says they can), so they get a **frosted fallback** instead (blur + saturate). It still looks like glass, just without the bending.

### ⚠ Gotchas found while building it
- **No `mix-blend-mode` on anything inside the button.** A blended sibling stops Chrome feeding the backdrop to `.lg-glass`, which silently kills both the blur and the refraction.
- **The map is drawn on a canvas, not as an SVG.** Chrome ignores blend modes inside an SVG loaded by `feImage`, which warped the whole button.
- The script sets the filter region to exactly the button's size, so the map lines up. It's redrawn when the window resizes, because the button is smaller on phones.
- Glass needs something behind it to bend. That's why the pill sits a little over the bottom edge of the cards rather than on plain background.

### Tuning
- **More or less bend:** the three `scale` values in `index.html` (keep the gaps between them for the fringe).
- **Wider or thinner bending rim:** `RIM` in `js/cv-button.js`.
- **Frost:** the `blur()` in `.cv-btn.lg-refract .lg-glass` (`css/cv-button.css`).

Research sources: [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/), [WebTricks](https://webtricks.dev/blog/liquid-glass-css), [DEV: 6 ways](https://dev.to/devyatov/liquid-glass-on-the-web-6-ways-to-build-it-with-css-and-svg-3m07).

## Edit
- **Which file:** change `href` (also in the [[Profile Popup]]'s CV button). Spaces become `%20`, so `CV/my cv.pdf` → `CV/my%20cv.pdf`.
- **Name it saves as:** the `download="Dylan-Gorrah-CV.pdf"` attribute.
- **Delay:** `IDLE` at the top of `js/cv-button.js` (milliseconds).
- **Position or size:** `.cv-btn` in `css/cv-button.css`. There's a phone-size block at the bottom.

## Notes
- When the page is opened straight from a folder (`file://`), browsers ignore `download` and open the PDF in a new tab instead. Once the site is on GitHub Pages it downloads with the clean name.
- On phones it sits over the bottom edge of the second row of tiles. That's normal for a floating button, but move it in `css/cv-button.css` if it bothers you.
