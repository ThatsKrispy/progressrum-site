# Changelog

## 2026-06-30 — Polish pass (round 3)

### Changed
- **Our Story:** the closing full-bleed above “From Our Family to Yours” is now the warm “served to you” shot (Silver poured onto a tray) instead of the bottles-and-glasses image.
- **Our Rums:** image-cell background set to #0d0d0d to exactly match the bottle photos’ background — removes the “double black” seam so the bottles truly float.
- **Cocktails:** every photo on the page is now unique (the duplicate `bartender-mixing` is gone). Card 1 uses the smoky cocktail shot; the full-bleed band uses the bottles-and-glasses shot.


## 2026-06-30 — Image placement + layout pass (round 2)

### Changed
- **Homepage panels** now use the correct live photos: panel 1 = two bottles on a wooden corner shelf; panel 2 = bottle at a poker table (poker chips); panel 3 = two bottles with two glasses on a wooden shelf.
- **Our Story:** founder photos (Anthony & Jesus) restored per client request; names promoted to `<h2>`. The tribute paragraph now shows the actual Hialeah “City of Progress” building (was a mislabeled bottle image). Bottom full-bleed swapped to bottles-and-glasses so Hialeah is not duplicated.
- **Our Rums:** Silver and Aged bottles now float on solid black (no visible box), matching the live floating-bottle treatment.
- **Cocktails:** removed the sticky left column; fixed drink photos being cut off (full glasses now show via 4:5 framing and centered focal points); fixed the full-bleed cocktail crop and a wrong alt text.

### Removed
- `images/hialeah-city-of-progress.webp` (mislabeled — content was a bottle, now unused).

### Notes
- Founder portraits are kept at the clients request. If higher-resolution or updated originals exist, send them and they will drop straight in.


## 2026-06-30 — Audit + compliance/accuracy pass

Reviewed all 6 pages against the live site (www.progressrum.com) and made scoped fixes. Full audit in `AUDIT.md`.

### Changed
- **Brand-story:** removed the two founder portrait images (`anthony-costa-…webp`, `jesus-costa-…webp`). They were generic studio/stock headshots, do not appear on the live site, and conflict with the brand rule against fabricated photos of real people. Founders are now clean, centered text blocks (name + bio + email), matching the live layout. New `.founder-block` styles added to `css/style.css`.
- **Brand-story:** social share images (`og:image`, `twitter:image`) repointed from the removed headshot to `progress-rum-silver-aged-bottles.webp`.
- **Canonicals:** changed `…/<page>.html` to live clean URLs (`https://www.progressrum.com/<page>/`) on brand-story, our-rums, experience, cocktails, contact, so they match the live/deployed URLs.
- **Age gate:** removed the dead "Terms" link (`href="#"`) on all 6 pages; replaced with a plain responsible-drinking line.
- **Contact:** removed a redundant "Costa Distilling / Costa Distilling" label; first field is now labelled "Distillery".

### Removed
- `images/anthony-costa-progress-rum-founder.webp`
- `images/jesus-costa-progress-rum-founder.webp`

### Still open (need your input / visual pass)
- **21+ age gate** is on the build but not on live — keep (recommended for an alcohol brand) or remove for exact parity?
- **Homepage panel photos** use bottle shots; live uses specific lifestyle photos (`Progress_Rum10`, `1111-scaled`, `Progress_Rum5`). Confirm whether to migrate the exact live images.
- **Section subheadings** are still styled `<div>`s in most places; live uses semantic `<h2>`. Recommend promoting for SEO (deferred to avoid layout risk without a visual check).
