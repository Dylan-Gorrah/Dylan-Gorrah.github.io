# Profile Card
**Markup:** `<section class="left">` in `index.html` · **Styles:** `.left` … `.identity` in `css/home.css` · Back to [[Home Screen]]

The big white card on the left of home. It's all plain text in `index.html`, with no script except the photo loader.

| Part | Class | Content |
|---|---|---|
| Eyebrow | `.role` | "Hello, I'm" / "Open to QA roles" |
| Photo | `.photo` | Circle placeholder, swapped for your photo. Hidden on phones, where the [[Profile Popup]] avatar beside the name replaces it |
| Name | `h1` | "Dylan Gorrah". Each word is in `.l` with `--i` so they slide up one after the other |
| Title | `.title` | "Software Developer / QA & Test Automation" (copper) |
| Intro | `.lead` | Short bio paragraph. On phones it collapses to one line, see below |
| Pills | `.facts-row` | 3 small tech pills |
| Footer | `.identity` | Location, diploma, "Graduating Nov 2026" |

## Intro on phones ("…" expander)
On phones (≤ 680px) the intro shows just **"Software developer moving into QA"** plus a small copper **…** pill. Tapping it smoothly grows the paragraph to the full text (with the site's easing, and the new text blurs in), and the pill becomes **less** to collapse it again. A light haptic tick plays (see [[Haptics]]).
- **Markup:** `.lead-short` (always shown) + `.lead-rest` (the rest, starting with ". I write…") + `button.lead-more`. Edit the text in those two spans; together they read as one sentence on desktop.
- **Code:** `js/lead.js` (toggle + height animation), the phone rules at the end of `css/home.css`, and `leadIn` in [[Animations]].
- Desktop and upright tablets show the full text with no button. Sideways touch tablets on screens ≤ 820px tall also use the "…" version, to make room for the big photo.
- It shows on **all** phone heights. Short phones used to hide the intro entirely, which made it vanish on an iPhone 11 in Safari (~715px tall with the browser bars); that rule was dropped because the collapsed intro is just one line (see [[Responsive Layout]]).

## Photo
**Click / tap → summary (all screens bigger than a phone).** Clicking the photo on a computer, or tapping it on a tablet, opens the [[Profile Popup]] summary, growing out of the photo and shrinking back into it. The script makes the photo a real button (`role=button`, focusable, Enter/Space opens it). Phones use the small corner avatar instead.

**Tablets (iPad, Galaxy Tab S7 / A9…):** there's no hover on a touch screen, so the photo is shown at **exactly the size it zooms to on hover with a mouse** (2× the normal size). Rules are at the end of `responsive.css`, all `pointer: coarse`:
| Tablet | Photo |
|---|---|
| Upright (681–980px) | `calc(2*clamp(112px,16vw,150px))`: ~240px iPad, ~250px Galaxy Tab |
| Sideways (≥ 981px) | `calc(2*clamp(84px,min(11vw,15vh),165px))`: ~200–215px, ~280px on tall tablets |

Sideways on shorter screens (≤ 820px tall), a photo that big pushed the name out of the card, so there the **intro collapses to one line + "…"** like on phones (`css/home.css`). That frees the ~70px needed; measured to fit at every tablet size.

**Hover zoom (computers):** on screens with a mouse or trackpad (wider than 680px), hovering the photo makes it grow to **2×** from its top-right corner with the site's easing (`cubic-bezier(.2,.7,.2,1)`), with a copper ring and a deeper shadow, then it shrinks back when the mouse leaves. The cursor is a pointer, because clicking opens the summary.
- **Where:** `css/home.css`, under the `.photo` rules. Change `scale:2` there to make it bigger or smaller.
- **How:** it uses the separate CSS `scale` property so it doesn't fight the floating `bob` animation, which uses `transform`.
- It only works once the real photo has loaded (`.photo.has`).

The photo is **`img/dylan-gorrah.jpg`**: a 600×600 square crop centred on the face, about 70 KB. The file is named after you so it ranks in image search; use hyphens, not spaces.
The `<img>` tag tries to load it: if it loads, the "PROFILE PHOTO" placeholder hides; if it's missing, the image removes itself and the grey silhouette stays.

**To change it:** replace `img/dylan-gorrah.jpg` with another **square** image, keeping the same name. The circle crops the corners, so leave some space around your head. Keep it small (~600px), because it's only shown at up to 165px.

## Also update
The `<head>` has a `<script type="application/ld+json">` block (info for search engines) and `<meta>` description tags that repeat your name, title, email and links. Keep them in sync if those change. See [[SEO]].
