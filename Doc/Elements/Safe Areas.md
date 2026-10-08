# Safe Areas
**File:** `css/safe-area.css` (loads after the files it adjusts, before `animations.css`) · Back to [[Portfolio Site]]

Keeps content clear of phone **notches, camera cut-outs and rounded corners**.

> [!note] Seen only in the desktop mobile emulator
> The notch overlap was spotted in a PC browser's phone emulator. On a real iPhone 11 it was never a problem. The rules stay as a harmless safety net for Android phones that under-report the notch in full screen.

## The problem it fixes
Phones tell the page how big the notch is through `env(safe-area-inset-top)` etc. (the page opts in with `viewport-fit=cover` in the viewport meta tag). But in **full screen** (the [[Fullscreen & App Mode|toggle button]] or the home-screen app), many Android phones report **0**, even though the camera cut-out is still there. So the [[Ticker]] slid up under the notch.

## How it works
- One variable, `--safe-top`, is the space to leave at the top.
  - **Normally:** whatever the phone reports (usually 0 in a browser tab, because the browser bar is there).
  - **Phone in full screen, portrait:** at least **32px**, or more if the phone reports more (`max(env(...), 32px)`).
- "Full screen" is detected three ways: `:root:fullscreen` (toggle button), `:root:-webkit-full-screen` (older Safari / iPad), and `@media (display-mode: fullscreen)` (home-screen app).
- "Phone" means `pointer: coarse` (a touch screen), so desktop full screen isn't affected.
- These use `--safe-top`: the home page top padding (`.page`), the view header (`.vbar`) and the [[Profile Popup]] (`.me-pop`).
- **Landscape:** the notch moves to the side, so `.page`, `.vbar` and `.vin` use the left/right insets there.
- The bottom edge already used `env(safe-area-inset-bottom)` (page, views, [[CV Button]]), which phones report correctly.

## Tuning
If a phone's notch still clips the ticker in full screen, raise the `32px` floor (it's in three places in `css/safe-area.css`).

## Testing
Normal browsing is unchanged (checked pixel-for-pixel). Headless Chrome can't fake a phone in full screen, so the full-screen case was checked by switching the floor on directly: the ticker moved from 16px to 48px from the top. Confirm on a real phone.
