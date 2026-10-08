# Haptics
**Script:** `js/haptics.js` (`Site.haptics.play(name)`) · **iPhone overlays:** `.hx-tap` inputs in `index.html` + styles at the end of `css/profile-pop.css` · Back to [[Portfolio Site]]

Phone vibration "ticks" **timed to the animations**, so taps feel physical: the [[Profile Popup]] rolls out with a tick per row, and [[View System|views]] tick as they open and close.

## How each platform gets it
| Platform | Method | What you feel |
|---|---|---|
| **Android** (Chrome, Samsung…) | `navigator.vibrate([on, off, on…])` | The full rhythm |
| **iPhone, iOS 17.4 – 26.4** | Script flips a hidden `<input type="checkbox" switch>`. Flipping an iOS switch plays the system haptic tick | The full rhythm |
| **iPhone, iOS 26.5+** | Apple only allows the tick on a **real finger tap** on a switch. Invisible native switches (`.hx-tap`) sit exactly on top of the avatar and the popup's ×, so the tap hits the switch (tick), and the script then opens or closes the popup | The tap tick only (later ticks are silently skipped) |
| Desktop | none | — |

## Patterns (`P` in `js/haptics.js`)
Times in ms after the tap; they're copied from the animation timings, so **if you change an animation's timing, update its pattern**.
| Name | When | Rhythm | Synced to |
|---|---|---|---|
| `popOpen` | tap avatar | tap, then 8 light ticks at 180, 235 … 565ms | `.me-card>*` rise: `animation-delay: i×55ms + 180ms` (`profile-pop.css`) |
| `popClose` | ×, background, Esc, Back | tap, then a firmer tick at 380ms | card shrinking into the avatar (380ms, `profile-pop.js`) |
| `viewOpen` | tile tap | tap, then a tick at 560ms | circle finishing its grow (560ms, `views.js`) |
| `viewStep` | prev/next/swipe | one tick | — |
| `viewClose` | Home / Esc / browser Back | tap, then a tick at 420ms | view shrinking into its tile (420ms) |

- **Reduced motion:** only the first tap tick plays (no animation to follow).
- **Deep links** (`#projects` on load) don't buzz.

## ⚠ iPhone overlay rules
- The overlays must stay **real native switches**. `opacity: 0` is fine, but `appearance: none` or other restyling stops the haptic.
- `opacity: 0 !important` is needed because the popup's row rise-in animation would otherwise fade the × overlay in.
- They only appear when the script detects iOS with switch support (it adds `ios-haptics` to `<html>`). Everywhere else they're `display: none`.
- They have `tabindex="-1"` and `aria-hidden`, so keyboard and screen-reader users use the real buttons underneath.
- The popup's stagger skips them: `.me-card > :not(.hx-tap)`.

## Adding haptics somewhere new
Call `Site.haptics.play('tap')` (or a new pattern you add to `P`) in that click handler. For iOS 26.5+ you'd also need an invisible switch overlay on that button, like `.hx-x`.

## Testing
Checked in Chrome with `navigator.vibrate` stubbed, so the exact patterns were confirmed, and with the overlays forced on, so their position over the avatar and × matched to the pixel. **Feel it on a real phone**: haptics can't be tested in a browser on a computer.

Research: [jhey: switch haptics hack](https://x.com/jh3yy/status/2028544698055299220), [web-haptics-polyfill](https://github.com/doublej/web-haptics-polyfill), [project-fathom (iOS 26.5 direct-tap method)](https://github.com/m1ckc3s/project-fathom), [haptics (iOS 26.5+ limits)](https://haptics.kushagragolash.dev/).
