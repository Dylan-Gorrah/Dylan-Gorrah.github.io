# Stack (view 02)
**Markup:** `#v-stack` (`#fil`, `#chips`, `#used`) · **Script:** `js/stack.js` · **Data:** `stackGroups`, `stackTools`, `stackUsed` in [[Site Data]] · **Styles:** `css/sections/stack.css` · Back to [[Portfolio Site]]

An interactive list of every tool you use.

## Parts
- **Filter row** (`.fil`): All / Testing / Code / Frameworks / Cloud and data / Workflow. Scrolls sideways on phones. Swipes that start here don't change view.
- **Chips** (`.chips`): one button per tool, popping in one after another. Testing tools are copper.
- **"Used" box** (`.used`): tap a chip and it shows where you used that tool (from `stackUsed`), or "Part of my everyday toolkit" if there's no entry.

## Edit
Everything is in `js/data.js`. Only the headline is in `index.html`.
