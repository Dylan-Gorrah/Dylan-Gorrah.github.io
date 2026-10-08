# Haptics
**Script:** `js/haptics.js` (`Site.haptics.play(name)`) · Back to [[Portfolio Site]]

Phone vibration "ticks" **timed to the animations**, so taps feel physical: the [[Profile Popup]] rolls out with a tick per row, and [[View System|views]] tick as they open and close.

## How each platform gets it
| Platform | Method | What you feel |
|---|---|---|
| **Android** (Chrome, Samsung…) | `navigator.vibrate([on, off, on…])` | The full rhythm |
| **iPhone, iOS 17.4 – 26.4** | Script flips a hidden `<input type="checkbox" switch>`. Flipping an iOS switch plays the system haptic tick | The full rhythm |
| **iPhone, iOS 26.5+** | Apple only allows the tick on a real finger tap on a switch, and the overlay trick for that was removed (see below) | Nothing |
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

## ⚠ Lesson: no switch overlays on iPhone
The iOS 26.5+ workaround puts invisible native switches over buttons, so a real tap hits a switch and ticks. **iOS draws native switches even at `opacity: 0`**: a slider showed up next to the name on an iPhone 11. So the overlays were **removed** (2026-10-08). iPhones on iOS 26.5+ get no haptics, and older iPhones still get the full rhythm through the hidden switch.

That hidden switch (created in `js/haptics.js`) is hidden with `clip-path: inset(50%)` as well as opacity, because clip-path is what actually stops iOS drawing it.

## Adding haptics somewhere new
Call `Site.haptics.play('tap')` (or a new pattern you add to `P`) in that click handler.

## Testing
Checked in Chrome with `navigator.vibrate` stubbed, so the exact patterns were confirmed. **Feel it on a real phone**: haptics can't be tested in a browser on a computer.

Research: [jhey: switch haptics hack](https://x.com/jh3yy/status/2028544698055299220), [web-haptics-polyfill](https://github.com/doublej/web-haptics-polyfill), [project-fathom (iOS 26.5 direct-tap method)](https://github.com/m1ckc3s/project-fathom), [haptics (iOS 26.5+ limits)](https://haptics.kushagragolash.dev/).
