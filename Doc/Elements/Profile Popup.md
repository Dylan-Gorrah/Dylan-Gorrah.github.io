# Profile Popup
**Markup:** `.name-row` / `#meOpen` (avatar beside the name) and `#mePop` (the popup, after the CV button) in `index.html` · **Styles:** `css/profile-pop.css` · **Script:** `js/profile-pop.js` · Back to [[Profile Card]]

**Phones only (≤ 680px wide).** A small round photo sits on the **right** of your name (`.avatar{order:1}`, pushed right by `justify-content:space-between`). Tapping it grows a quick-summary card out of the photo, the same circle-reveal as the [[View System|views]].

## Why it exists
On phones, short screens hide the photo row (see [[Responsive Layout]]), and most real phones count as short once the browser bars are showing. The avatar beside the name is always visible, so phones always see your face. The big `.photo` is hidden on phones so it isn't shown twice.

## The avatar
- `.name-row` wraps the avatar and the `<h1>`. On desktop and tablet it's `display: contents` (as if it isn't there) and the avatar is hidden, so the desktop layout is unchanged.
- 48px circle with a copper ring. It pulses softly 3 times after load (`avatarHint` in [[Animations]]) as a "tap me" hint.
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
On phones the popup **rolls out with a tick per row** as it opens, and ticks again as it docks back into the avatar. On iPhone, invisible native switches over the avatar and × make the tap tick work on iOS 26.5+. See [[Haptics]].

## ⚠ Keep in sync
The popup **repeats** facts shown elsewhere: the title, the pass rate, the test numbers, the diploma date, the WhatsApp number and the **CV link**. When any of those change, update the popup too. See [[Common Edits]].
