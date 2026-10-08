# About (view 01)
**Markup:** `#v-about` in `index.html` · **Styles:** `css/sections/about.css` · Back to [[Portfolio Site]] · Part of [[View System]]

The "who I am" screen, framed as a developer moving into QA.

## Contents (top to bottom)
1. **Headline**: "Developer moving into *QA.*" (`.big`)
2. **Intro**: `.lead2` paragraph
3. **Terminal** (`.term`): a fake test run. Each `.ln` line types itself in, one after another (`--k` = order). `.ok` lines get a green ✓, and `.end` ("27 / 27 passing") gets a blinking cursor.
4. **Two mini stat cards** (`.minis`): "27 unit tests in CI" and "65 → 85% pass rate". Numbers in `data-count` count up when the view opens.
5. **Facts list** (`dl.facts`): Based, Studying, Main stack, Looking for
6. **Buttons**: "Message me" (WhatsApp) + GitHub

## Edit
All text is in `index.html`. To add a terminal line, copy a `<div class="ln ok" style="--k:N">` and bump the `--k` numbers after it.
