# Changelog

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
