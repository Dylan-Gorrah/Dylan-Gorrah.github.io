# Fullscreen & App Mode
Back to [[Portfolio Site]]

Browsers **don't let a website force full screen**. A page can only go full screen right after a click or tap, so visitors can't get trapped. iPhone Safari doesn't allow it at all for web pages. So the site offers two things instead:

## 1. Full-screen toggle (desktop & Android)
**Markup:** `#fsBtn` at the end of the top bar's `.top-meta` · **Script:** `js/fullscreen.js` · **Styles:** `.fs-btn` in `css/home.css` · **Icons:** `#i-expand` / `#i-shrink` (see [[Icons]])

- A small square button at the top right of home. Click it to go full screen; click it again (or press Esc) to leave.
- The icon and label swap between "Full screen" and "Exit full screen" automatically, including when the visitor leaves with Esc.
- **Hidden** where it can't work (iPhone Safari) and when the site is already running as a home-screen app. It starts with the `hidden` attribute and the script only reveals it when full screen is possible.

## 2. App mode: "Add to Home Screen"
**Files:** `manifest.webmanifest` (root) · `img/icons/` · tags in `<head>`

When someone adds the site to their home screen, it gets the **DG app icon** and opens **full screen like an app**, with no browser bars.

| Piece | For | What it does |
|---|---|---|
| `manifest.webmanifest` | Android, desktop Chrome/Edge | Name "Dylan G", `display: fullscreen` (falls back to `standalone`), paper-coloured splash and theme, icons |
| `img/icons/icon-192.png`, `icon-512.png` | Android / desktop | Rounded dark "DG" icon with the copper dot |
| `img/icons/icon-maskable-512.png` | Android | Full-bleed version that Android crops into its own shape (circle, squircle…) |
| `img/icons/apple-touch-icon.png` + `apple-mobile-web-app-*` meta tags | iPhone / iPad | Home-screen icon, opens without Safari's bars, title "Dylan G" |

- **How visitors do it:** iPhone: Share → *Add to Home Screen*. Android Chrome: ⋮ → *Add to Home screen* / *Install app*. Desktop Chrome/Edge: the install icon in the address bar.
- On iPhone, "full screen" means *standalone*: the status bar (time, battery) stays visible. That's Apple's limit.
- All paths in the manifest are relative (`./`), so it works on GitHub Pages even inside a `/repo-name/` folder.
- ⚠ The manifest only loads from a real web address (GitHub Pages), **not** when `index.html` is opened from a folder. That's normal.
- In app mode there's no browser Back button. The site's own Back button and swipes still work (see [[View System]]).

## Notches in full screen
Full screen lets the page reach the very top of the screen, so [[Safe Areas]] adds room for the camera notch there.

## Changing the icon
The icons were generated from the same "DG" design as the browser-tab favicon. To use a different icon, replace the four PNGs in `img/icons/` with the same names and sizes (keep the maskable one with extra padding around the design).
