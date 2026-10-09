# Known Quirks
Back to [[Portfolio Site]]

Surprising things in the code worth knowing before you change it.

## Still true (by design)
- **Browser Back always goes home from a view, not to the previous view.** Moving between views replaces the history entry on purpose, so visitors don't have to press Back eight times to leave. See [[View System]].
- **Phones and tablets skip three costly effects** (`@media(any-hover:none)`): the paper grain overlay (`css/base.css`), the blur behind the summary popup (`css/profile-pop.css`, a plain tint fades in instead) and the blur under the view header bar (`css/views.css`). Animating or scrolling over blurs stutters on many Android phones. Computers keep all three.
- **Some facts are repeated.** The CV link, contact details and headline numbers appear in more than one place (the views, the [[Profile Popup]], the SEO block). See [[Common Edits]] for where.
- **CSS load order matters.** Later files win ties, so a rule can be silently overridden by a file loaded after it. See [[Responsive Layout]].
- **iOS draws native switches even at `opacity: 0`.** Use `clip-path` to really hide one, and don't overlay switches on buttons. See [[Haptics]].

## Fixed in the cleanup
| Was | Fix |
|---|---|
| Tiny-phone (≤380px) view header tweaks never applied: they were in `responsive.css`, which loads *before* `views.css`, so the normal rules always won | Moved to a `@media(max-width:380px)` block at the **end of `css/views.css`**, so they now actually apply: tighter header padding, a smaller Back button and narrower prev/next buttons on very small phones |
| `.tech-foot` rules styled an element that doesn't exist | Removed from `responsive.css` |
| `spin` and `dash` keyframes were never used | Removed from `animations.css` |
| No URL per view: the browser Back button didn't close a view and you couldn't link to one | Each view now has an address (`#projects`), and Back/Forward work. See [[View System]] |
| WhatsApp contact row used class `main`, the same name as the home layout grid | Renamed to `row-main` (`.row.row-main` in `contact.css`); it looks exactly the same |

## Your call
- **`backup/`** still holds the original single-file version. Delete it whenever you're happy. Nothing uses it.
