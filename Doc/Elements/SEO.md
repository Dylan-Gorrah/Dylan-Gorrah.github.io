# SEO
**Location:** the top of `<head>` in `index.html` · Back to [[Portfolio Site]]

Everything here is invisible on the page. It tells Google, Bing and the AI assistants that read them (Copilot, Gemini) who you are.

## What's in place
| Tag | Purpose |
|---|---|
| `<title>` | The blue link text in search results. Name first, then role and city. |
| `meta description` | The grey snippet under the link (~155 characters). |
| `meta author`, `robots` | Says the page is yours and lets search engines show a large image preview. |
| `og:*`, `profile:*`, `twitter:card` | The preview card when the link is shared on WhatsApp, LinkedIn, Slack and so on. |
| JSON-LD `ProfilePage` → `Person` | A structured fact sheet: name, title, location, education, credentials, award, skills, languages, links. This is what search engines and AI assistants pull "facts about Dylan" from. |
| Photo `alt` + filename | `img/dylan-gorrah.jpg` with a descriptive alt, so it can show up in image search for your name. |
| Favicon `img/icons/icon-192.png` | The little icon beside the result in Google. Must be a real file (not a `data:` URL) sized in multiples of 48px. |
| Phone avatar `alt` | Google indexes the **phone** layout, where the big photo is hidden, so the corner avatar carries the same descriptive alt. |
| `sameAs` links | Ties this page to your GitHub and LinkedIn, so engines know they're the same person. |

The views' text (About, Projects…) is already in the HTML even though it's hidden until clicked, so search engines can read all of it.

## Rules
- **Never hide text just for search engines** (white-on-white, `display:none` keyword blocks). Google and Bing treat that as spam and can drop the page.
- The JSON-LD must only say things that are **also true on the visible page**. When you change a fact on the page, change it here too.
- Use hyphens in file names (`dylan-gorrah.jpg`), not spaces.

## Live address: https://dylan-gorrah.github.io/
Done:
- `og:image`, and the JSON-LD `image`, `url` and `@id`, use full URLs. There's also a `<link rel="canonical">` and `og:url`.
- `robots.txt` allows everything except `/Doc/` (this vault is in the repo but shouldn't show up in search) and points to the sitemap.
- `sitemap.xml` lists the page and your photo. Update `<lastmod>` when you make big changes.

Still for you to do:
- Submit `https://dylan-gorrah.github.io/sitemap.xml` in **Google Search Console** and **Bing Webmaster Tools** (Copilot answers come from Bing's index).
- Put the site link on GitHub (profile + README), LinkedIn (Contact info + Featured) and your client sites' footers.

## Check it
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema validator: https://validator.schema.org
- Preview cards: https://www.opengraph.xyz
