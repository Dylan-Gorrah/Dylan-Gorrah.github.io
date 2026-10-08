# Common Edits
Back to [[Portfolio Site]]

### Change bio / intro text
`index.html` → [[Profile Card]] (`.lead`) and [[About]] (`.lead2`, terminal lines, facts). Also update the `<meta name="description">` in `<head>`.

### Change a skill score
`js/data.js` → `skills` → change `v`. See [[Skill Graph]].

### Add a tool
- Ticker: `ticker` in `js/data.js`
- Stack chip: `stackTools` (pick a group), plus optionally a line in `stackUsed`. See [[Stack]].

### Add a project
Copy one `<article class="card pc spot">…</article>` inside `#pcs` in the Projects view, then edit the title, the `<small>` line, the paragraph, `.tags` and `.pts`. For no public code, use `<div class="go off">Code not public</div>` instead of the link. Update the tile subtitle "Five builds". See [[Projects]].

### Add a freelance client
Copy an `<article class="card frame spot">` in the Freelance view. See [[Freelance]].

### Add your photo
Replace `img/dylan-gorrah.jpg` with a square image of the same name. See [[Profile Card]].

### Update your CV
Replace the PDF in `CV/`. If the file name changes, update the `href` in **two** places in `index.html`: the [[CV Button]] and the CV button in the [[Profile Popup]]. Search for `CV/`.

### Change a colour
`css/base.css` → `:root`. See [[Base Styles]].

### Add a new section
1. In `index.html`, copy a whole `<section class="view" id="v-…">` block, change the id to `v-NEWID` and the `<h2>`, then replace the content inside `.vin`.
2. Add a tile in `nav.tiles` with `data-go="NEWID"` (copy one, then update `--n`, the number and the icon).
3. In `js/data.js`, add `'NEWID'` to `viewOrder` and `NEWID:'Title'` to `viewNames`.
4. If it needs its own styles, create `css/sections/newid.css` and add a `<link>` with the other section files.
5. Add a note in `Doc/Elements/Sections/` and link it from [[Portfolio Site]].

> The tile grid is 4 columns, so a 9th tile makes an unbalanced third row.

### Change contact details
They appear in several places: the [[Contact]] view, the [[About]] buttons, the home footer, the [[Profile Popup]], and the JSON-LD block in `<head>`. Search `index.html` for the old value.
