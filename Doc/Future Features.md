# Future Features
Back to [[Portfolio Site]]

Ideas planned but not built yet. When one gets built, move it into its own element note and link it from the main note.

---

## Digital business card (via AirDrop / share)
**Status:** 💡 idea, noted 2026-10-08. The card design itself comes later.

**Goal:** when someone is on the site and shares it to a nearby phone (AirDrop on iPhone, Quick Share / Nearby Share on Android), the other person receives **Dylan's digital business card** instead of (or as well as) a plain link.

### What's possible (notes for when we build it)
- **A web page can't detect or intercept AirDrop.** When someone uses Safari's own Share → AirDrop, iOS sends the page **URL**, and the receiver sees the link preview (title, description and photo from the [[SEO]] tags).
- **What *can* be built:** a **"Share my card"** button on the site that opens the phone's share sheet (`navigator.share()`, the Web Share API). The share sheet includes **AirDrop**, Messages, WhatsApp and so on. It can share:
  - a **vCard file** (`.vcf`). The receiving iPhone or Android offers *Add to Contacts* with name, title, phone, email, website and photo. This is the closest thing to a "real" business card.
  - the site **URL** + a short message, as a fallback where file sharing isn't supported (`navigator.canShare({files})`).
- **Apple Wallet pass** (`.pkpass`): a card that lives in Wallet. Needs a paid Apple Developer account to sign it, so it's a later, optional upgrade.
- **QR code** on the card or site: lets someone scan it to save the contact, which helps with non-iPhone and desktop visitors.

### Open questions for later
- What the card looks like (likely matches the site: paper, ink, copper, the DG mark).
- Where the "Share my card" button lives: the [[Profile Popup]] next to Message me / CV feels natural, plus maybe the [[Contact]] view.
- Which details go on it: name, title, phone (WhatsApp), email, site, GitHub, LinkedIn, photo.
- Keep the vCard in sync with the contact details used elsewhere (see [[Common Edits]]).
