# Progress Rum — Live-vs-Build Audit

**Goal:** near-exact replica of `www.progressrum.com` (WordPress/Elementor) as a static Cloudflare Pages site, with clean fixes.
**Method:** captured all 6 live pages as ground truth, diffed against the repo (section order, copy, image placement, headings, links, SEO).
**Verdict:** the build is structurally close — section order and copy are largely faithful. The "looks off / wrong images / missing elements" feeling traces to a short list of concrete issues below, concentrated in **imagery** and **semantic structure**, not the overall layout.

Confidence is marked **[confirmed]** (verified in code/live HTML) or **[needs visual check]** (text fetch can't see Elementor background images or rendered layout — to be locked down with a live-vs-local screenshot pass).

---

## P1 — Most likely causes of "off / wrong images / missing"

1. **Brand-story founder portraits — verify they're real, not added.** `[needs visual check]`
   Live "Where It Started" shows two real photos (`ProgressRum_3.jpg`, `Progress_Rum_7.jpg`). The repo instead leads with a cocktail photo (`on-the-rocks`) and uses founder portraits (`anthony-costa…`, `jesus-costa…`) that do **not** appear as images in the live page HTML. Either they're real client photos pulled from elsewhere, or they were added — must confirm before launch (brand rule: no invented/stock people). The two genuine "Where It Started" photos appear to be **missing**.

2. **Homepage panel photos — confirm identity, not just plausibility.** `[needs visual check]`
   Live panels use `Progress_Rum10.jpg` (Journey), `1111-scaled.jpg` (Toast), `Progress_Rum5.jpg` (Taste). Repo uses three different renamed WebPs. Need to confirm each repo image is the *same* photo as live in the *same* slot — this is the classic "images in the wrong place" failure.

3. **Extra elements not visible on live.** `[needs visual check]`
   Repo adds: a full-bleed bar photo at the bottom of the homepage; a hero cocktail photo + bottom bar photo on brand-story; extra cocktail photos on the Cocktails page (`el-caribeno`, `rum-sour`) where live shows those recipes as text only. Confirm each against live; remove or keep deliberately.

4. **Age gate (21+) overlay is on all 6 pages but not on live.** `[confirmed]`
   Good practice for an alcohol brand, but it's a deviation from "exact replica" and it currently links "Terms" to a dead `#`. **Decision needed:** keep it (recommended for compliance) or remove for true parity.

---

## P2 — SEO & semantics (real fixes, low risk)

5. **Section subheadings aren't real headings.** `[confirmed]`
   Live uses multiple semantic `<h2>` per page. In the repo those are styled `<div>`s — the only `<h2>` on most pages is the age-gate question. One `<h1>` per page is correct. Recommend promoting section labels to `<h2>/<h3>` for SEO parity and accessibility.

6. **Canonicals/URLs use `.html`.** `[confirmed]`
   e.g. `canonical = …/experience.html`, but live (and likely the deployed clean URL) is `…/experience/`. Align canonicals, internal links, and `sitemap.xml` to the final Cloudflare URL scheme so they don't fight each other.

7. **Dead links introduced by the build.** `[confirmed]`
   Age-gate "Terms" → `#`. (Store Locator and Membership → `#` also exist but match live placeholders, so those are fine.)

---

## P3 — Content & consistency (quick confirms)

8. **Announce-bar typo:** live reads "LIQOUR" (misspelled); repo corrects to "LIQUOR." Fine under "replica + clean fixes" — just confirming it's intentional. `[confirmed]`
9. **Footer year:** live shows "© 2025"; repo footer is hardcoded "© 2025" though a prior commit mentioned a dynamic year. Confirm one approach. `[confirmed]`
10. **Contact page is solid:** H1, "Costa Distilling," Hialeah FL, `Hello@ProgressRum.com`, and the Google Maps embed are all present and match live. `[confirmed]`

---

## Recommended next step

A **visual side-by-side pass** (render live vs the local build per page via the browser tools and compare screenshots at desktop + mobile widths). That's the only way to definitively resolve every `[needs visual check]` item — exact image identity, the extra elements, and any spacing/layout that "looks off." I'll then fix in scoped commits with a changelog, P1 → P3.

**Open questions for you:**
- Keep the 21+ age gate, or remove it to match live exactly?
- Are the founder portraits on brand-story approved real photos of Anthony & Jesus? If so, where from — so I can confirm the two live "Where It Started" photos aren't missing.
- Final URL scheme on Cloudflare — clean URLs (`/experience/`) or `.html`? This sets canonicals, links, and sitemap.
