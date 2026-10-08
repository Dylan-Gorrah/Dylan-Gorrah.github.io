# CV Button
**Markup:** `<a class="cv-btn" id="cvBtn">` in `index.html` (just after the home `</div>`) · **Styles:** `css/cv-button.css` · **Script:** `js/cv-button.js` · **File:** `CV/` · Back to [[Home Screen]]

A small, flat, frosted-glass **Download CV** button (square-ish corners, see-through blurred background, hairline white border, no shadow) that sits in the empty middle of the footer strip on the home screen. It's sized to fit inside the footer, so it never covers the tiles. It stays hidden until the visitor has been **idle on home for 5 seconds**, then fades up and stays.

## Behaviour
- Any mouse move, click, key, scroll or touch restarts the 5s countdown, so it only appears once someone stops to read.
- Once it's shown, it stays (moving the mouse doesn't hide it, so people can reach it).
- **Home only:** it hides as soon as a [[View System|view]] opens. Coming back home starts the 5s countdown again.
- It listens for the `site:view` event that `js/views.js` sends on every open and close.

## Look
| Part | Where | What |
|---|---|---|
| Button | `.cv-btn` | 28px tall (24px on phones), 7px corners, frosted glass (`backdrop-filter: blur(10px) saturate(170%)` over a light white tint), a little more opaque on hover |
| Icon | `.cv-ic` | copper file icon (`#i-file`, see [[Icons]]) |

## Edit
- **Which file:** change `href` (also in the [[Profile Popup]]'s CV button). Spaces become `%20`, so `CV/my cv.pdf` → `CV/my%20cv.pdf`.
- **Name it saves as:** the `download="Dylan-Gorrah-CV.pdf"` attribute.
- **Delay:** `IDLE` at the top of `js/cv-button.js` (milliseconds).
- **Position or size:** `.cv-btn` in `css/cv-button.css`. There's a phone-size block at the bottom. Keep its height under the footer's (`.bottom` in `css/home.css`, 34px / 26px on phones) or it will start overlapping the tiles again.

## Notes
- When the page is opened straight from a folder (`file://`), browsers ignore `download` and open the PDF in a new tab instead. Once the site is on GitHub Pages it downloads with the clean name.
