# Projects (view 04)
**Markup:** `#v-projects > #pcs` · **Script:** `js/projects.js` · **Styles:** `css/sections/projects.css` · Back to [[Portfolio Site]]

An accordion of your builds. Tap a header to expand it; only one is open at a time, and opening one scrolls it into view. The `+` turns into `×`.

## Project card
```html
<article class="card pc spot">            ← add "open" to start expanded (Thuso does)
  <button class="ph" aria-expanded="false"><span><h3>Name</h3><small>type · year · headline numbers</small></span></button>
  <div class="pb"><div>
    <div class="pin"><p>…</p><ul class="tags">…</ul><ul class="pts">…</ul></div>
    <a class="go" href="github…">View on GitHub …</a>   ← or <div class="go off">Code not public</div>
  </div></div>
</article>
```
The opening animation uses a CSS grid trick (`grid-template-rows: 0fr → 1fr`), so cards of any height animate smoothly.

## Current projects
Thuso (open by default) · Sok · Monthly Claims System · Snokonoko · Weather Warning Assistant (code not public)

If you add or remove a project, also update the tile subtitle "Five builds".
