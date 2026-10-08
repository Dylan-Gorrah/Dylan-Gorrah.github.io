# Site Data
**File:** `js/data.js` · Back to [[Portfolio Site]]

The **content file** for everything the scripts generate. Editing this file shouldn't break the logic.

| Key | Feeds | Format |
|---|---|---|
| `ticker` | [[Ticker]] | `['Name']` or `['Name',1]` (the `1` = testing item, shown green) |
| `skills` | [[Skill Graph]] | `{k:'Axis', v:0-100, d:'tools shown on hover'}`. Add or remove items and the radar reshapes itself (works best with 5–8). |
| `stackGroups` | [[Stack]] filter buttons | `{k:'key', n:'Label'}`; keep `all` first |
| `stackTools` | [[Stack]] chips | `['groupKey','Tool name']`; `test` group is coloured copper |
| `stackUsed` | [[Stack]] "where I used it" box | `'Tool name':'text'`; the name must **exactly** match a chip |
| `viewOrder` | [[View System]] prev/next order + "01 / 08" labels | view ids |
| `viewNames` | browser tab title when a view is open | `id:'Title'` |

## Not in here
Paragraphs, project cards, clients, contact details and so on are written directly in `index.html`, inside their view's `<section>`. See the individual section notes.
