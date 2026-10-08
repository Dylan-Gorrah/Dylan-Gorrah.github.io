# Home Screen
**Markup:** `<div class="page" id="home">` in `index.html` · **Styles:** `css/home.css`, `css/responsive.css` · Back to [[Portfolio Site]]

## Layout
On desktop it's a full-screen grid with four rows:
```
┌──────────────── Ticker ────────────────┐
│ DYLAN / GORRAH          ● Available…   │  ← topbar
├───────────────┬────────────────────────┤
│ Profile card  │  Skill graph (dark)    │  ← .main (2 columns)
│               ├────────────────────────┤
│               │  8 tiles (4 × 2)       │
├───────────────┴────────────────────────┤
│ SOFTWARE / QA / WEB   GitHub Email In  │  ← footer
└────────────────────────────────────────┘
```
On phones the columns stack. See [[Responsive Layout]].

## Parts
- [[Ticker]]: `.ticker`
- **Topbar**: `.topbar`. Brand name on the left; pulsing "Available for software work / Bloemfontein" on the right, then the full-screen toggle ([[Fullscreen & App Mode]]). Edit the text directly.
- [[Profile Card]]: `section.left`
- [[Skill Graph]]: `.tech-card`
- [[Section Tiles]]: `nav.tiles`
- [[CV Button]]: `a.cv-btn`, floating over the footer centre after 5s idle
- **Footer**: `footer.bottom`. Tagline and GitHub / Email / LinkedIn links. Edit the text directly.
