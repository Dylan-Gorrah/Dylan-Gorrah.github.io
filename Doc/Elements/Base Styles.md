# Base Styles
**File:** `css/base.css` (loaded first) · Back to [[Portfolio Site]]

## Responsibilities
- **Design tokens** on `:root`. Every colour and size the site reuses:
  | Variable | Value | Used for |
  |---|---|---|
  | `--paper` / `--paper-2` | `#E6E3DB` / `#F0EEE7` | page background / pill backgrounds |
  | `--card` | `#FBFAF6` | white cards |
  | `--ink` | `#141413` | main text, dark buttons |
  | `--muted` | `#6b6962` | secondary text |
  | `--line` | `#c9c6bd` | borders and dividers |
  | `--copper` | `#B0552F` | accent (highlights, icons, `<em>`) |
  | `--green` | `#b7d86b` | accent on dark cards (radar, ticks) |
  | `--dark` | `#151513` | dark cards |
  | `--shadow`, `--soft` | | big / small card shadows |
  | `--r` | `28px` | main card corner radius |
  | `--font`, `--mono` | Inter / monospace stack | body / label fonts |
- **Reset**: box-sizing, zero margins, no list bullets, `[hidden]` always hides.
- **Helpers**: `.mono` (monospace), `.eyebrow` (small uppercase label), `.ic` (18px line icon, see [[Icons]]).
- **`.grain`**: a fixed, almost invisible noise texture over everything, which gives the "paper" feel.
- **`.spot`**: the hover glow, see [[Spotlight Effect]].

## Tips
- Want a new accent colour? Change `--copper` and it updates everywhere. A few greys (`#55534d`, `#9b978e`, `#f1efe9`) are still hard-coded in other files.
- The page always uses the light theme (`color-scheme: light`); there's no dark mode.
