# Changelog

## 2026-06-30 — Experience order + brand-story closer (round 9)

### Changed
- **Experience:** Locations (store locator) is now the first content block, followed by Order Online, then Membership — with clean left/right image alternation.
- **Our Story:** closing photo replaced with the live "Aged_Rum_Hero" shot (Aged + Silver bottles on a wooden bar with a cocktail to the left), framed with padding and a subtle border rather than full-bleed.


## 2026-06-30 — Cocktails layout + Our Story tweaks (round 8)

### Changed
- **Cocktails (desktop flow):** replaced the stacked centered-text + photo-pair layout with an alternating image-and-recipe layout — each drink (On-the-Rocks, El Caribeño, Rum Sour, Daiquiri) now sits beside its own photo, sides alternating, reading far more cohesively. Stacks image-over-recipe on mobile.
- **Our Story:** enlarged the "Where It Started" rum-on-the-rocks photo (was too small).
- **Our Story:** replaced the closing photo (a too-zoomed single glass) with a bartender serving Progress Silver — "someone working" — framed so it is not cropped tight.


## 2026-06-30 — Migrate exact live photos + Our Rums sizing (round 7)

### Added (exact photos copied from the live WordPress site, optimized to WebP)
- Brand-story Where It Started: rum-on-the-rocks (ProgressRum_3) + Hialeah arch (Progress_Rum_7), in live order.
- Experience: gold US store-locator map (Progress_Map) in the middle (Locations) and beach rum-on-the-rocks (ProgressRum_4) in Membership — matching live. Order Online swapped to a bottles shot so the map is not duplicated.
- Cocktails: rebuilt to the live layout with the exact live photos in order — pair 1 (rocks + bartender-served), El Caribeño + Rum Sour, pair 2 (smoky rum sour + pineapple daiquiri), Daiquiri, then the three named cocktails (Lime & Rum Fusion / Spiced & Iced / Tropical Sunset).

### Changed
- **Our Rums:** floating bottles enlarged ~20%; the Extra Old (last) photo section is taller so much more of the pour shot shows (was cropped to about half).
- Fixed a CSS specificity bug so the 2-up and single recipe grids lay out correctly.


## 2026-06-30 — Our Story image fix (round 6)

### Changed
- **Our Story:** replaced the “Where It Started” bottles photo. The previous shot was portrait (0.75) and its tops were cropped by the square slot; swapped to the near-square bottles-and-glasses shot so it renders fully. Hialeah tribute photo and the rum-on-the-rocks closer left unchanged.


## 2026-06-30 — Cocktails page rework (round 5)

### Changed
- **Cocktails:** fixed vertically cut-off drink photos by matching display ratios to the source images — the serving photo went from 16:9 to 4:5 (it is a portrait shot), the rum-sour/daiquiri pair to 2:3, and all focal points re-centered so glasses show fully.
- **Cocktails:** added vertical height so the page no longer feels short — taller intro split, larger drink imagery, and more padding in the recipe cards.
- **Cocktails (mobile):** drink cards and the serving photo no longer crop to 16:9 on phones (now 4:5).


## 2026-06-30 — Brand-story closer photo (round 4)

### Changed
- **Our Story:** closing band above “From Our Family to Yours” changed to the rum-on-the-rocks shot (client-selected) — cleaner and more premium than the prior served-on-tray crop. The small “Where It Started” image was swapped to a two-bottles shelf shot so no photo repeats on the page.


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
