# Portfolio Site

Dylan Gorrah's personal portfolio. It's a single page that looks and behaves like a phone app on warm paper. Home shows a profile card, a skill graph and eight tiles, and each tile opens a full-screen "view" that grows out of it. It's plain HTML, CSS and JS with no build step or framework, so you can double-click `index.html` and it works.

> [!tip] Where to start
> - Change **text** (bio, projects, clients, contact): `index.html`
> - Change **lists and scores** (ticker, skill graph, stack chips): `js/data.js`
> - Change **looks**: the matching file in `css/`
> - Step-by-step recipes: [[Common Edits]]

---

## File structure

```
Profile/
├─ index.html            ← all page markup (home + 8 views)
├─ img/
│  ├─ dylan-gorrah.jpg   ← square photo shown in the profile circle (600×600)
│  └─ icons/             ← DG app icons for the home screen
├─ manifest.webmanifest ← "Add to Home Screen" app settings (name, icons, full screen)
├─ CV/                  ← the CV PDF the Download CV button serves
├─ css/
│  ├─ base.css           ← colours, fonts, reset, shared helpers
│  ├─ home.css           ← home screen layout
│  ├─ responsive.css     ← home screen at phone/tablet/short-screen sizes
│  ├─ views.css          ← full-screen view shell + shared view parts
│  ├─ sections/          ← one file per view (about, stack, freelance, …)
│  ├─ cv-button.css      ← floating glass Download CV button
│  ├─ profile-pop.css    ← phone avatar + quick-summary popup
│  └─ animations.css     ← every @keyframes + reduced-motion
├─ js/
│  ├─ utils.js           ← shared helpers (loaded first)
│  ├─ data.js            ← THE CONTENT FILE for lists and scores
│  ├─ ticker.js · radar.js · spotlight.js · stack.js · views.js · projects.js · cv-button.js · profile-pop.js · fullscreen.js
├─ backup/               ← the original single-file version, untouched
└─ Doc/                  ← this vault
```

---

## Foundations

**[[Base Styles]]**: `css/base.css`. Holds the colour palette, fonts and corner radius as CSS variables, plus the reset and small shared classes. Change a colour here and it changes everywhere.

**[[JavaScript Structure]]**: `js/`. Small plain scripts that share one global, `window.Site`, loaded in a fixed order at the bottom of `index.html`. Each file runs one feature.

**[[Site Data]]**: `js/data.js`. Holds every list the scripts build from: ticker words, skill scores, stack tools and the view order. Most "update my skills" edits only touch this file.

**[[Responsive Layout]]**: `css/responsive.css`. Rearranges and hides parts of home on phones, tablets and short screens. The order the CSS files load in matters, so read this note before moving files around.

**[[Animations]]**: `css/animations.css`. Every named animation lives here, and so does the switch that turns motion off for visitors who ask their OS to reduce it.

**[[Icons]]**: the hidden `<svg>` sprite at the top of `<body>`. Reusable line icons (arrow, mail, chat…) are referenced by id, so each one is drawn once and used many times.

**[[Spotlight Effect]]**: `js/spotlight.js` + `.spot` in `base.css`. A soft copper glow follows the mouse over any card with the `spot` class.

---

## Home screen
**[[Home Screen]]** is the overall grid: ticker → topbar → profile card | (skill graph + tiles) → footer. Styles live in `css/home.css`.

- **[[Ticker]]**: the scrolling dark strip of tech names at the very top. Testing items show in green. Words come from `data.js`.
- **[[Profile Card]]**: the big white card with your name, title, intro, photo and graduation status. It's all text in `index.html`.
- **[[Profile Popup]]**: phones only. A small photo beside your name opens a quick-summary card (photo, pitch, key facts, WhatsApp and CV buttons).
- **[[Skill Graph]]**: the dark "Overall stats" radar chart with bars and a readout. It's built by `js/radar.js` from the scores in `data.js` and cycles through the axes on its own.
- **[[Section Tiles]]**: the 8 app-style buttons. Each one's `data-go` names the view it opens.
- **[[CV Button]]**: a floating Apple-style liquid-glass "Download CV" pill that really bends the page behind it in Chrome and Edge, with a frosted look elsewhere. It appears after 5s idle on home only and serves the PDF in `CV/`.

---

## Views (the 8 sections)
**[[View System]]**: `js/views.js` + `css/views.css`. Opens a view with a circle that grows from the tile, and handles Back, prev/next, the arrow and Esc keys, phone swipes and the browser's Back/Forward buttons. Each view has its own link, e.g. `#projects`. Every view shares the same header.

| # | View | What it shows |
|---|------|---------------|
| 01 | [[About]] | Short bio, a fake terminal "test run", two stat cards and key facts |
| 02 | [[Stack]] | Filterable tool chips; tap one to see where you used it |
| 03 | [[Freelance]] | Client websites shown as browser-window cards |
| 04 | [[Projects]] | Accordion of five projects; one opens at a time |
| 05 | [[Tutoring]] | Java tutoring, the pass-rate meter (65 → 85%) and the award |
| 06 | [[Education]] | Timeline of the diploma and certificate |
| 07 | [[Languages]] | Animated Hello/Hallo, spoken languages, code languages |
| 08 | [[Contact]] | WhatsApp, email, GitHub and LinkedIn rows |

---

## Fullscreen & app mode
**[[Fullscreen & App Mode]]**: browsers can't be forced into full screen, so there's a full-screen toggle in the top bar (desktop and Android). Visitors can also "Add to Home Screen" to get a DG app icon that opens the site full-screen like an app.

---

## Maintenance
- **[[SEO]]**: the hidden `<head>` tags and the structured fact sheet that Google, Bing and Copilot read about you, plus what to do once the site has a domain.
- **[[Common Edits]]**: recipes for adding a project, changing a score, adding a view, and so on.
- **[[Known Quirks]]**: surprising things worth knowing before you change the code, plus a log of what the cleanup fixed.
