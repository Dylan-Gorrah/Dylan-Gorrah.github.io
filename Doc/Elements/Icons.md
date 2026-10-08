# Icons
**Location:** the hidden `<svg>` sprite at the top of `<body>` in `index.html` · Back to [[Portfolio Site]]

Each icon is a `<symbol id="i-NAME">`. To use one:
```html
<svg class="ic"><use href="#i-mail"/></svg>
```
The `.ic` class (in [[Base Styles]]) sizes it to 18px and draws it as a line in the current text colour.

| id | Icon | Used in |
|---|---|---|
| `i-right` | arrow → | view Back / prev / next (rotated for back and prev) |
| `i-arrow` | ↗ | external links ("Visit site", "View on GitHub") |
| `i-chat` | speech bubble | WhatsApp |
| `i-mail` | envelope | Email |
| `i-code` | `</>` | GitHub |
| `i-in` | LinkedIn | LinkedIn |
| `i-star` | star | Tutoring award |
| `i-file` | document | [[CV Button]] (copper) |
| `i-expand` / `i-shrink` | four corners out / in | full-screen toggle, see [[Fullscreen & App Mode]] |

The [[Section Tiles]] icons are drawn inline in each tile, not taken from the sprite, because they animate (`draw`).
