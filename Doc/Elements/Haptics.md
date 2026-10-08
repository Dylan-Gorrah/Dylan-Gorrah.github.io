# Haptics
**Script:** `js/haptics.js` (`Site.haptics.play(name)`) · Back to [[Portfolio Site]]

Phone vibration "ticks" **timed to the animations**, so taps feel physical. Opening a [[View System|section]] or the [[Profile Popup]] spins like a wheel until the motion stops.

## How each platform gets it
| Platform | Method | What you feel |
|---|---|---|
| **Android** (Chrome, Samsung…) | `navigator.vibrate([on, off, on…])` | The full rhythm |
| **iPhone, iOS 17.4 – 26.4** | Script flips a hidden `<input type="checkbox" switch>`. Flipping an iOS switch plays the system haptic tick | The full rhythm |
| **iPhone, iOS 26.5+** | Apple only allows the tick on a real finger tap on a switch, and the overlay trick for that was removed (see below) | Nothing |
| Desktop | none | — |

## The wheel
Opening or closing a section should feel like **a wheel spinning through detents until the motion stops**.

- **Spacing follows the animation's speed.** The gap to the next tick comes from how fast the animation is moving at that moment, read from its own easing curve. Fast motion gives close ticks; slow motion gives wide ticks.
- **Opening** (fast, then settles): 45 → 51 → 96 → 130 → 130ms → *click*. It spins up quickly and winds down.
- **Closing** (slow, then quickens): 130 → 130 → 81 → 79ms → *click*. It winds in faster and faster, then shuts.
- **The final click** is a firmer 18ms pulse that lands **exactly when the animation stops** (the pauses add up to the animation's length).
- **Pulses ramp** from 9 to 13ms toward the snap. Android's guideline: ramp toward the target.
- **Never closer than 45ms** (`GAP`). The motor keeps ringing 20–50ms after each pulse, so closer ticks smear into a "buzz", and Android's guideline is *"buzzy or nothing → choose nothing"*.
- **Never wider than 130ms** (`MAXGAP`), so the wheel keeps turning right up to the stop with no dead air.
- **A slowing wheel never speeds up at the end:** if the final click would come too soon after the last tick, that tick is dropped.

| Pattern | When | Built from |
|---|---|---|
| `viewOpen` | tile → section | `Site.motion.viewOpen` (560ms, ease-out) |
| `viewStep` | prev / next / swipe | same motion, fewer notches (70–180ms gaps) because it's frequent |
| `viewClose` | section → home | `Site.motion.viewClose` (420ms, ease-in) |
| `popOpen` | avatar → profile card | `Site.motion.popOpen` (520ms) |
| `popClose` | card → avatar | `Site.motion.popClose` (380ms) |
| `tap` | small taps (intro "…") | one 12ms tick |

### One source of truth for timing
The durations and easing curves live in **`Site.motion` in `js/utils.js`**. `views.js` and `profile-pop.js` animate with those values, and `haptics.js` builds the wheels from the same numbers. **Change a timing there and the haptics follow automatically**, so they can't drift out of sync.

### Tuning the feel
In `js/haptics.js`: `GAP` (closest ticks), `MAXGAP` (widest), the `9+4*p` ramp and the `18` final click. `viewStep` has its own lighter spacing.

- **Reduced motion:** only the first tap tick plays (no animation to follow).
- **Deep links** (`#projects` on load) don't buzz.

## ⚠ Lesson: no switch overlays on iPhone
The iOS 26.5+ workaround puts invisible native switches over buttons, so a real tap hits a switch and ticks. **iOS draws native switches even at `opacity: 0`**: a slider showed up next to the name on an iPhone 11. So the overlays were **removed** (2026-10-08). iPhones on iOS 26.5+ get no haptics, and older iPhones still get the full rhythm through the hidden switch.

That hidden switch (created in `js/haptics.js`) is hidden with `clip-path: inset(50%)` as well as opacity, because clip-path is what actually stops iOS drawing it.

## Adding haptics somewhere new
Call `Site.haptics.play('tap')` (or a new pattern you add to `P`) in that click handler.

## Testing
Checked in Chrome with `navigator.vibrate` stubbed, so the exact patterns were confirmed. **Feel it on a real phone**: haptics can't be tested in a browser on a computer.

Haptic design research: [Android haptics design principles](https://developer.android.com/develop/ui/views/haptics/haptics-principles), [WWDC19 Introducing Core Haptics](https://developer.apple.com/videos/play/wwdc2019/520/), [WWDC21 Practice audio haptic design](https://developer.apple.com/videos/play/wwdc2021/10278/).

Switch-trick research: [jhey: switch haptics hack](https://x.com/jh3yy/status/2028544698055299220), [web-haptics-polyfill](https://github.com/doublej/web-haptics-polyfill), [project-fathom (iOS 26.5 direct-tap method)](https://github.com/m1ckc3s/project-fathom), [haptics (iOS 26.5+ limits)](https://haptics.kushagragolash.dev/).
