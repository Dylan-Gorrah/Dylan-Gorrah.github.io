# Profile Popup
**Markup:** `.name-row` / `#meOpen` (avatar beside the name) and `#mePop` (the popup, after the CV button) in `index.html` · **Styles:** `css/profile-pop.css` · **Script:** `js/profile-pop.js` · Back to [[Profile Card]]

**Phones only (≤ 680px wide).** A round photo is pinned in the **top-right corner of the profile card** (`position:absolute; top:12px; right:12px` on `.avatar`, with `.left` as the anchor), sitting evenly 13px from the top and right edges.
- The name row has `padding-right:72px`, so the name never runs under the photo.
- On short phones the "Hello, I'm" row is hidden and the name sits beside the photo, so `.name-row` gets `min-height:68px`; the title line then always starts below the photo.
- Checked at 320, 360, 375, 414 and 430px wide: no overlap at any size. Tapping it grows a quick-summary card out of the photo, the same circle-reveal as the [[View System|views]].

**Tablets and computers:** clicking or tapping the big profile photo opens the same popup. It grows from whatever was clicked (`opener` in `js/profile-pop.js`) and returns focus there. See [[Profile Card]].

## Why it exists
On phones, short screens hide the photo row (see [[Responsive Layout]]), and most real phones count as short once the browser bars are showing. The avatar beside the name is always visible, so phones always see your face. The big `.photo` is hidden on phones so it isn't shown twice.

## The avatar
- `.name-row` wraps the avatar and the `<h1>`. On desktop and tablet it's `display: contents` (as if it isn't there) and the avatar is hidden, so the desktop layout is unchanged.
- 72px circle with a copper ring (was 48px; made 50% bigger). It pulses softly 3 times after load (`avatarHint` in [[Animations]]) as a "tap me" hint.
- If the photo is missing it shows the initials "DG".

## The popup
| Part | Class | Content |
|---|---|---|
| Close | `.me-x` | × button (top right) |
| Photo | `.me-photo` | 96px circle |
| Eyebrow, name, title | `.eyebrow`, `.me-name`, `.me-title` | "Open to QA roles", "Dylan Gorrah", "Software Developer / QA & Test Automation" |
| Summary | `.me-sum` | one-paragraph pitch |
| Facts | `.me-facts` | 4 small boxes: Based, Studying, Tests, Tutoring |
| Buttons | `.btns` | Message me (WhatsApp) + CV download |

## Behaviour
- **Open:** tap the avatar. Two things happen together:
  - the **page behind smoothly blurs out** (0 → 12px blur, with a light tint and a saturation lift, over 0.45s), and
  - the **card grows out of the avatar** as a circle, its contents rise in one by one, and focus moves to ×.
- **Close:** ×, a tap on the blurred background, Esc, or the **phone/browser Back button** (opening the card adds a history entry, which Back removes). The card shrinks back into the avatar while the **blur fades away** over 0.5s, so the page sharpens back into focus. Then focus returns to the avatar.
- The background blur is a CSS transition on `.me-pop.on .me-back` (`css/profile-pop.css`). The card's circle is a JS animation on `.me-card` (`cardClip()` in `js/profile-pop.js`). They're kept separate so the background never gets "cut" by the circle.
- While it's open, Tab stays inside the card (keyboard and screen-reader friendly).

## Haptics
On phones the popup **spins open like a wheel** (ticks close together, then spreading out until it stops) and winds back in as it docks into the avatar. iPhones on iOS 26.5+ get no haptics (see [[Haptics]]).

## ⚠ Keep in sync
The popup **repeats** facts shown elsewhere: the title, the pass rate, the test numbers, the diploma date, the WhatsApp number and the **CV link**. When any of those change, update the popup too. See [[Common Edits]].
