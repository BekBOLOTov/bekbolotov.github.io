# Phase 3: Polish & Meta — Research

**Researched:** 2026-05-09
**Domain:** CSS responsive layout, print stylesheets, HTML meta/SEO, Open Graph, JSON-LD structured data
**Confidence:** HIGH overall — stable, well-documented domain with verified sources

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Phase 3 was expanded to include CV content updates (D-02 through D-08). ROADMAP and REQUIREMENTS.md should be updated to reflect the wider scope.
- **D-02:** All 5 roles get an inline `Stack: …` line. Stack content per role is locked verbatim.
- **D-03:** Breez Pro era removes all client app names (Kulikov, Osmon, Intersport, Globus). Reframed as project-type bullets.
- **D-04:** Final role text locked verbatim — see CONTEXT.md. Executor adjusts grammar only, not facts.
- **D-05:** Inline stack rendered as `<p class="experience-stack"><span>Stack:</span> …</p>`. Reuse `--color-text-muted` and `--font-size-sm`. No new tokens.
- **D-06:** Skills tier model collapses from 3 tiers to 2 (Expert / Proficient). Supersedes Phase 2 D-09.
- **D-07:** Final skills list locked (Expert: 4 items; Proficient: 41 items).
- **D-08:** Existing `.skills-tier` and `.skills-tier-label` classes remain — only count of blocks changes from 3 to 2.
- **D-09:** Continue Phase 2 desktop-first pattern. Expand existing `@media (max-width: 600px)` block. Do not rewrite to mobile-first.
- **D-10:** Target viewport: 375px minimum. Single column, no horizontal overflow, all tap targets >= 44x44px.
- **D-11:** At <= 600px: stack `.experience-header` vertically (verify it's done), reduce `.container` padding to `--space-4` (verify it's done), tighten `--space-12` section padding if needed.
- **D-12:** Sticky nav at <= 600px: `nav { overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch }`. Hide scrollbar via `nav::-webkit-scrollbar { display: none }` and `scrollbar-width: none`.
- **D-13:** Phase 2 `flex-wrap: wrap` on nav is superseded for <= 600px only. Desktop unchanged.
- **D-14:** Add `@media print` block. Hide on print: `header`, `footer`, all `section` `border-top` dividers.
- **D-15:** Force black-on-white on print: `body { color: #000; background: #fff }`. Strip accent from links: `a { color: inherit }`. Underline links.
- **D-16:** Append URL after every link: `a[href]:after { content: " (" attr(href) ")"; font-size: 0.85em; color: #444 }`. Exceptions: skip `mailto:` and skip internal anchors `#`.
- **D-17:** Page-break: `.experience-entry { page-break-inside: avoid; break-inside: avoid }`. Same for `.achievements-group` and `.skills-tier`.
- **D-18:** Print font sizing: keep `rem`-based sizes; do NOT switch to `pt`.
- **D-19:** Locked meta description: `Bolot Bekbolotov — mobile developer with 7 years building Android and Flutter apps used by 1M+ users. IOI 2016/2017 finalist and ACM ICPC NEERC 2018 finalist.`
- **D-20:** `<title>` stays "Bolot Bekbolotov — Mobile Developer".
- **D-21:** `<html lang="en">` — verify it's already present.
- **D-22:** Create `assets/og-card.png` at 1200x630px. Name, title, accent stripe `#2563eb`. No photo. Generate once and commit.
- **D-23:** Add locked OG meta block and `twitter:card` to `<head>`.
- **D-24:** Add locked JSON-LD Person schema to `<head>` after OG block.

### Claude's Discretion

- Exact OG card PNG composition (font weight balance, accent stripe position, padding)
- Whether to add `<meta name="theme-color">` for mobile browser chrome
- Whether to add `<link rel="canonical">` (probably yes — root URL only)
- Exact `nav` scrollbar-hiding pseudo-element compatibility fallback for older browsers
- Whether to add `prefers-reduced-motion` guard around `scroll-behavior: smooth`
- Section-by-section `--space-*` adjustments at 375px (judgment call, no token churn)

### Deferred Ideas (OUT OF SCOPE)

- Favicon — v2 deferred
- Custom domain — v2 deferred (will require updating OG `og:url` and JSON-LD `url` when done)
- `robots.txt` + `sitemap.xml` — not required by POLISH-03
- Lighthouse audit gate — not in acceptance criteria (verify-step suggestion only)
- Phone and Telegram — still deferred
- Education section — still deferred
- Self-hosted Inter font — deferred

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| POLISH-01 | Page renders correctly on mobile at 375px — single-column, readable, no overflow | Mobile CSS patterns (§ Mobile), tap-target analysis, nav scroll behavior |
| POLISH-02 | Browser Print to PDF produces a clean, readable CV document | `@media print` patterns (§ Print), page-break analysis, header hide fix |
| POLISH-03 | Open Graph meta tags and `<title>`/`<meta description>` tuned for name search and LinkedIn previews | OG minimum set (§ Open Graph), JSON-LD (§ JSON-LD), meta description length verification |

</phase_requirements>

---

## Summary

Phase 3 ships three independent delivery areas — CV content refresh, mobile responsiveness, and meta/SEO — that touch the same two files (`index.html` and `style.css`). Research confirms all three areas are well-understood, stable, and fully achievable within the no-framework, no-build constraint.

The CV content changes (D-02 to D-08) are pure HTML edits: adding `<p class="experience-stack">` paragraphs per role, rewriting Breez Pro bullets, and collapsing 3 skills tiers to 2. No CSS additions beyond one new `.experience-stack` rule in §7.

Mobile (POLISH-01) is mostly already scaffolded — `.container` padding and `.experience-header` stacking are in the existing `@media (max-width: 600px)` block. The primary work is replacing the Phase 2 `flex-wrap: wrap` nav rule with a horizontal-scroll nav and ensuring nav links have 44px-tall tap targets.

Print (POLISH-02) has no pre-existing `@media print` block — it needs to be written from scratch. The critical pitfall is the sticky `<header>`: `display: none` is the correct fix (not `position: static`), as the CV itself has no value in a printed header. The `a[href]:after` URL-expansion pattern has well-known `mailto:` and `#anchor` exclusions already specified in D-16.

SEO/OG (POLISH-03) is primarily an `<head>` addition. The locked D-19 meta description is 158 characters — within the 160-character desktop limit and the key credential signal ("1M+ users. IOI/ACM") falls inside the first 120 characters (mobile cutoff). The JSON-LD `email` field format with `mailto:` prefix is confirmed correct per schema.org. The OG card image at `assets/og-card.png` must be generated outside the codebase (Figma, Canva, or browser screenshot) and committed as a PNG binary.

**Primary recommendation:** Execute in wave order — content edits first (affects layout testing), then mobile CSS + print CSS in parallel (no overlap), then `<head>` meta additions last (purely additive).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CV content (role text, stack lines, skills) | Static HTML (`index.html`) | — | Content is hardcoded; no CMS, no JS render |
| Mobile layout (375px single column) | CSS (`style.css` §12) | — | Media query expansion, no JS needed |
| Mobile nav scroll | CSS (`style.css` §12) | JS (`script.js` — no change needed) | `overflow-x: auto` + scrollbar-hide is pure CSS; IntersectionObserver still fires correctly on hidden-scrollbar nav |
| Print stylesheet | CSS (`style.css` §12 — new `@media print` block) | — | Purely declarative; no JS needed for print |
| SEO meta tags | HTML `<head>` (`index.html`) | — | Static tags, no server-side rendering |
| Open Graph tags | HTML `<head>` (`index.html`) | — | Static OG block |
| OG card image | Binary asset (`assets/og-card.png`) | — | Generated outside codebase, committed as PNG |
| JSON-LD structured data | HTML `<head>` (`index.html`) | — | Inline `<script type="application/ld+json">` |

---

## Current State Audit (verified against actual files)

| Item | Current State | Phase 3 Action |
|------|--------------|----------------|
| `<html lang="en">` | Present [VERIFIED: read index.html] | D-21: verify only |
| `<meta name="viewport">` | Present [VERIFIED] | No change |
| `<meta name="description">` | 92-char generic text [VERIFIED] | D-19: replace with locked 158-char text |
| `<title>` | "Bolot Bekbolotov — Mobile Developer" [VERIFIED] | D-20: no change |
| `@media (max-width: 600px)` | Exists in §12, has `.container`, `.experience-header`, `nav` rules [VERIFIED] | D-09/D-12/D-13: expand + replace nav rule |
| `@media print` | ABSENT [VERIFIED] | D-14 to D-18: write from scratch |
| OG meta block | ABSENT [VERIFIED] | D-23: add |
| JSON-LD block | ABSENT [VERIFIED] | D-24: add |
| Skills tiers | 3 blocks: Expert, Proficient, Familiar [VERIFIED] | D-06/D-07: collapse to 2 |
| Breez Pro bullets | 4 bullets with `<strong>` app names [VERIFIED] | D-03: rewrite |
| `experience-stack` class | Not present [VERIFIED] | D-05: add §7 rule + HTML per role |
| `assets/` | Empty (.gitkeep only) [VERIFIED] | D-22: add og-card.png |
| `scroll-behavior: smooth` | On `html {}` selector, NOT guarded by prefers-reduced-motion [VERIFIED] | Discretion: add guard |
| External links `rel="noopener"` | All present on all `target="_blank"` links [VERIFIED] | No change needed |

---

## Standard Stack

### Core (all locked by project constraint — no alternatives)

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| HTML5 | Semantic | `<head>` meta additions, `<p class="experience-stack">`, skills collapse | Project constraint |
| CSS3 + Custom Properties | — | `@media (max-width: 600px)` expansion, `@media print` block, `.experience-stack` rule | Project constraint; existing 19 tokens must be reused |
| Vanilla JS (ES2022+) | — | No new JS needed in Phase 3 | IntersectionObserver nav still works with `overflow-x` nav |

### No New Libraries Required

Phase 3 is pure HTML/CSS edits plus one binary asset. No npm, no CDN additions, no new `<link>` or `<script>` tags (beyond the `<script type="application/ld+json">` inline block which is data, not a JS library).

---

## Architecture Patterns

### CSS Organization Pattern

Phase 3 adds to two locations in `style.css` — do not scatter rules:

```
style.css (existing sections 1–12)
├── §7 EXPERIENCE — add .experience-stack rule here
└── §12 MEDIA QUERIES — two new blocks appended:
    ├── expand existing @media (max-width: 600px) block
    └── new @media print block (always last in file)
```

### Pattern 1: Mobile Nav Horizontal Scroll (D-12)

**What:** Replace the Phase 2 `flex-wrap: wrap` rule inside the 600px block with a single-row horizontally-scrollable nav. Hide the scrollbar visually while preserving scroll functionality.

**When to use:** The nav has 4 links (Experience, Skills, Achievements, Contact). At 375px, even with `gap: --space-4` (16px), all 4 links likely fit in one row — but `overflow-x: auto` is the correct defensive pattern regardless.

**Full rule (supersedes Phase 2 `flex-wrap: wrap` for <= 600px only):**
```css
/* Source: MDN scrollbar-width, MDN ::-webkit-scrollbar */
@media (max-width: 600px) {
  nav {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch; /* iOS momentum scroll */
    scrollbar-width: none;            /* Firefox */
  }

  nav::-webkit-scrollbar {
    display: none;                    /* Chrome, Safari, Edge */
  }
}
```

**Tap-target fix for nav links:**

Current `nav a` has only `padding-bottom: var(--space-1)` (4px). At `--font-size-sm` (14px) and default line-height, the clickable area is ~18px tall — well below the 44px minimum. Add explicit minimum height inside the mobile breakpoint:

```css
@media (max-width: 600px) {
  nav a {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding-inline: var(--space-2); /* lateral breathing room on touch */
  }
}
```

This satisfies WCAG 2.5.5 (Level AAA: 44x44px) and Apple/Google HIG guidelines. [VERIFIED: WCAG 2.5.5 documentation, LogRocket accessibility guide]

**Note on `-webkit-overflow-scrolling: touch`:** This property is deprecated in the CSS standard but harmless to include. iOS Safari applies momentum scrolling by default for `overflow: auto` on iOS 13+; the `-webkit-` declaration is a no-op on modern iOS and a graceful enhancement on older. Including it is the safe choice. [ASSUMED based on MDN deprecation status]

### Pattern 2: Print Stylesheet (D-14 to D-18)

**What:** `@media print` block appended to the bottom of §12 in `style.css`. Transforms the screen layout into a clean CV document.

**Critical pitfall — sticky header space on print:** The sticky `<header>` must be `display: none`, not `position: static`. On Chrome's print engine, a `position: sticky` or `position: fixed` element set to `position: static` in print still causes overlap issues on page 2+. `display: none` removes it from the document flow entirely. [VERIFIED: Daniweb thread on unsticking sticky headers for print, OpenReplay CSS for print guide]

```css
/* Source: MDN @page, MDN page-break-inside, CSS-Tricks print-color-adjust */
@media print {
  /* Hide screen-only chrome */
  header,
  footer {
    display: none;
  }

  /* Strip section dividers (they're visual, not structural) */
  section {
    border-top: none;
  }

  /* Force black text on white */
  body {
    color: #000;
    background: #fff;
  }

  /* Links: readable but not blue */
  a {
    color: inherit;
    text-decoration: underline;
  }

  /* Append URL after every link */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #444;
  }

  /* Suppress redundant URL expansion */
  a[href^="mailto:"]:after,
  a[href^="#"]:after {
    content: none;
  }

  /* Page-break control — both properties for cross-browser */
  .experience-entry,
  .achievements-group,
  .skills-tier {
    page-break-inside: avoid; /* legacy alias — Safari, older Chrome */
    break-inside: avoid;      /* current standard — Chrome 50+, Firefox 65+, Safari 10+ */
  }

  /* Page margins */
  @page {
    margin: 1in;
  }
}
```

**`page-break-inside: avoid` vs `break-inside: avoid`:** Both should be declared. `break-inside: avoid` is the current standard (part of CSS Fragmentation Level 3); `page-break-inside: avoid` is the legacy alias that maps to the same behavior in all modern browsers. Declaring both costs nothing and handles edge cases in older Safari. [VERIFIED: MDN page-break-inside, CSS-Tricks page-break almanac]

**`print-color-adjust`:** Not needed here. D-15 strips all background colors and accent colors from the print output. `print-color-adjust: exact` is only needed when you want to *preserve* background colors in print — the opposite of what D-15 specifies. No need to add it. [VERIFIED: CSS-Tricks print-color-adjust almanac]

**`@page` margin values:** `1in` (25.4mm) on all sides is the cross-browser safe default. Chrome honors `@page` margins when the user selects "Default margins" in the print dialog. Firefox ignores `@page` in all cases and uses print dialog settings. Safari respects it partially. Conclusion: `1in` is the right value; actual output depends on user's print dialog. This is acceptable — the goal is clean content, not pixel-perfect PDF control. [VERIFIED: PDF4.dev CSS print guide, MDN @page]

**`rem` in print:** D-18 locks this — keep `rem`. Modern print engines (Chrome, Safari, Firefox) correctly resolve `rem` against the root font size at print time. No conversion to `pt` needed. [ASSUMED: MDN does not contradict this; D-18 is the locked decision]

### Pattern 3: Experience Stack Line (D-05)

**Rule to add in §7 EXPERIENCE:**
```css
.experience-stack {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: var(--space-1) 0 0 0;
}

.experience-stack span {
  font-weight: 600;
}
```

**HTML pattern per role (after `<ul>` closing tag):**
```html
<p class="experience-stack"><span>Stack:</span> Flutter, Dart, Bloc, Dio, Firebase</p>
```

### Pattern 4: SEO Meta Block Insertion

**Insertion order in `<head>`** (must preserve correct sequence):
```html
<!-- EXISTING: charset, viewport, title, meta description (update this) -->
<meta name="description" content="[D-19 text]">

<!-- ADD: canonical (discretion) -->
<link rel="canonical" href="https://bolotbekbolotov.github.io/">

<!-- ADD: theme-color (discretion) -->
<meta name="theme-color" content="#2563eb">

<!-- EXISTING: Google Fonts preconnect + stylesheet link -->

<!-- ADD: OG block (D-23) -->
<meta property="og:type" content="profile">
...

<!-- ADD: JSON-LD (D-24) -->
<script type="application/ld+json">
{ ... }
</script>

<!-- EXISTING: stylesheet link (keep last) -->
<link rel="stylesheet" href="style.css">
```

### Pattern 5: `prefers-reduced-motion` Guard (Claude's Discretion)

Current `html { scroll-behavior: smooth; }` in §11 is not guarded. WCAG recommends wrapping motion-inducing CSS in a `no-preference` query. This is a discretion item per CONTEXT.md but is a low-effort, high-accessibility win:

```css
/* In §11 UTILITIES — replace the bare html rule */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

[VERIFIED: MDN prefers-reduced-motion, W3C WCAG C39 technique, Smashing Magazine 2021]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| URL expansion after links in print | Custom JS or server-rendered links | `a[href]:after { content: attr(href) }` | Native CSS, no JS, zero dependencies |
| OG image generation | Automated script, build-step tool, Vercel/Netlify function | Hand-draw in Figma/Canva and export PNG once | Static site; one-time asset; no build step allowed |
| Scrollbar hiding | JS-based scroll UI | `scrollbar-width: none` + `::-webkit-scrollbar { display: none }` | CSS-native, two declarations, no JS |
| Schema.org structured data | Custom meta format, RDFa, Microdata | JSON-LD `<script type="application/ld+json">` | JSON-LD is Google's preferred format; cleanest separation from HTML |

---

## SEO Meta — Verified Details

### Meta Description (D-19)

**Locked text:** `Bolot Bekbolotov — mobile developer with 7 years building Android and Flutter apps used by 1M+ users. IOI 2016/2017 finalist and ACM ICPC NEERC 2018 finalist.`

**Character count:** 158 characters [VERIFIED: counted in session]
**Desktop limit:** 160 characters — within limit [VERIFIED: Google/SEO sources]
**Mobile cutoff (120 chars):** `Bolot Bekbolotov — mobile developer with 7 years building Android and Flutter apps used by 1M+ users. IOI 2016/2017 fina` — key credential ("1M+ users") is inside the mobile visible range. [VERIFIED: counted in session]
**SEO impact:** Meta description length is not a ranking factor; it affects snippet display only. [VERIFIED: Google Search Central community thread]

### Title (D-20)

"Bolot Bekbolotov — Mobile Developer" = 35 characters. Well within 60-character safe limit. No change needed. [VERIFIED: counted in session]

### Canonical Tag (Discretion — recommend YES)

Add `<link rel="canonical" href="https://bolotbekbolotov.github.io/">`. For a single-page site on GitHub Pages, the only URL variant is trailing-slash vs no trailing-slash (`/` vs nothing). GitHub Pages normalizes this, but adding a canonical tag makes the preferred URL explicit for Google. Zero cost, best practice. [CITED: developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls]

### `<meta name="robots">` (not needed)

Do not add `<meta name="robots" content="index, follow">`. The default behavior for any crawlable page is `index, follow`. Adding it explicitly is redundant. [ASSUMED: standard crawler behavior per Google documentation]

### `<meta name="theme-color">` (Discretion — recommend YES)

```html
<meta name="theme-color" content="#2563eb">
```

Colors the browser address bar / tab bar on Android Chrome and Safari iOS (Safari 15+) to match the accent color. `#2563eb` matches `--color-accent`. Supported in Chrome 39+, Safari 15+. No effect on Firefox or desktop. Zero cost. [VERIFIED: Chrome Developers blog, MDN meta name=theme-color]

---

## Open Graph — Verified Details

### Minimum Tag Set for Target Platforms

Research confirms `og:title`, `og:description`, `og:image`, and `og:url` are the four universally required tags. Behavior per platform: [VERIFIED: OGPreview.app Discord specs, LinkedIn/Slack OG research]

| Platform | Tags It Uses | `twitter:card` Needed? | Image Min Size |
|----------|-------------|----------------------|----------------|
| LinkedIn | `og:title`, `og:description`, `og:image`, `og:type` | No | 1200×627px, < 5 MB |
| Slack | `og:title`, `og:description`, `og:image`, `og:url` | No (ignored) | 200×200px min |
| Discord | `og:title`, `og:description`, `og:image` + `twitter:card` used for embed style | Yes — `summary_large_image` enhances embed | 1200×630 recommended |
| Twitter/X | `twitter:card` + OG tags as fallback | Yes | 1200×628px for `summary_large_image` |

D-23's tag set (8 tags total including `twitter:card`) covers all four platforms. No changes needed.

**`og:type: profile`:** Correct for a personal CV page. LinkedIn recognizes it; Google uses it for Knowledge Panel hints. [ASSUMED: schema.org og:type documentation; standard practice]

**OG image aspect ratio:** 1200×630 is the universal safe resolution (1.905:1 ≈ 1.91:1). LinkedIn minimum is 1200×627; 1200×630 meets this. Under 5 MB is trivially achievable for a simple text-on-white PNG. [VERIFIED: PreviewOG knowledge base, OG Meta Tag Checker guide]

### OG Image Generation Approach (D-22)

**Method — no build step:**
1. Use Figma, Canva, or similar tool with Inter font installed/embedded
2. Canvas: 1200×630px, white background, `#2563eb` stripe
3. Text: "Bolot Bekbolotov" (Inter Bold, ~96pt), "Mobile Developer" (Inter Regular, ~48pt, `#6b7280`)
4. Export as PNG
5. Verify file size < 200KB (target for performance budget)
6. Commit to `assets/og-card.png` [VERIFIED: CONTEXT.md D-22 locks this path]

**Critical path note:** The OG card is a binary asset created outside the codebase. It has no code dependencies but must exist in `assets/og-card.png` before the `<head>` OG block is deployed — otherwise the `og:image` tag points to a 404. Sequence: create PNG → commit → then deploy OG block.

**Inter font in exported PNG:** Canva has Inter in its font library. Figma supports Inter natively. Either tool embeds the font into the rasterized PNG at export time — no local font installation required. [ASSUMED: based on known Figma/Canva capabilities]

### LinkedIn Cache Flushing

LinkedIn caches OG metadata for ~7 days from first share. After deploying:
1. Visit `https://www.linkedin.com/post-inspector/`
2. Enter `https://bolotbekbolotov.github.io/`
3. Click "Inspect" — forces a re-fetch
[VERIFIED: LinkedIn Help article, Kinsta LinkedIn debugger guide]

### Cache-busting alternative (if re-deploying changes):
Append query string to URL when sharing: `https://bolotbekbolotov.github.io/?v=2`. LinkedIn treats it as a new URL. Not needed for initial deploy — only if updating the OG card after initial cache.

---

## JSON-LD — Verified Details

### `email` Field Format

Use `"email": "mailto:bekbolotov.bolot@gmail.com"` — the `mailto:` prefix is correct per schema.org and confirmed by Google Rich Results Tool examples. Raw email without prefix (`"bekbolotov.bolot@gmail.com"`) will not parse as a URI. [VERIFIED: schema.org/email property page, jsonld.com Person examples]

### `sameAs` Array

The `sameAs` property accepts any array of URLs pointing to profiles that represent the same entity. There is no whitelist of "approved" domains in the schema.org spec. Google's validator passes any valid URL. Codeforces, LeetCode, and stats.ioinformatics.org are valid URLs and will pass the validator — they simply may not generate rich search features for those specific sites, but they're not invalid. [VERIFIED: Rank Math sameAs guide, schema.org sameAs property docs]

### Validation Tools

| Tool | URL | Purpose |
|------|-----|---------|
| Google Rich Results Test | https://search.google.com/test/rich-results | Primary — checks Person schema eligibility |
| Schema.org Validator | https://validator.schema.org/ | Checks JSON-LD syntax + schema.org conformance |

### D-24 JSON-LD as Locked

The full JSON-LD block in D-24 is locked verbatim. The `email` field uses `"mailto:bekbolotov.bolot@gmail.com"` which matches the confirmed correct format. No changes needed.

---

## Common Pitfalls

### Pitfall 1: OG Image Path Mismatch Between STACK.md and CONTEXT.md

**What goes wrong:** STACK.md §File Structure lists `assets/og-image.png`. CONTEXT.md D-22 locks the filename as `assets/og-card.png`. If the executor uses the STACK.md name, the deployed `og:image` URL in D-23 will 404 (it references `og-card.png`).

**How to avoid:** Use `assets/og-card.png` — the D-22 locked decision overrides the earlier research recommendation. [VERIFIED: read both files in this session]

**Warning signs:** `og:image` returns 404 in the LinkedIn Post Inspector or `curl -I` check.

### Pitfall 2: Nav `flex-wrap: wrap` Left in 600px Block

**What goes wrong:** The current 600px block has `nav { gap: var(--space-4); flex-wrap: wrap; }`. If D-12's `flex-wrap: nowrap` replacement is not applied correctly, the nav will still wrap instead of scrolling on mobile.

**How to avoid:** The Phase 2 nav rule must be fully replaced in the 600px block — not just appended. `flex-wrap: nowrap` overrides `flex-wrap: wrap` only if specificity/order is correct within the same media query block. Simplest approach: delete the Phase 2 nav rule inside the 600px block and write the complete D-12 rule. [VERIFIED: read style.css §12 in this session]

### Pitfall 3: Sticky Header Still Consuming Space in Print

**What goes wrong:** Adding `position: static` to `<header>` in print removes the sticky behavior but leaves the header taking space on page 1. The printed page starts with nav links, then the CV content. More seriously, on Chrome, a sticky element switched to `position: static` can still overlay content on pages 2+.

**How to avoid:** Use `display: none` for `header` in `@media print`. The nav adds no value to a printed/PDF CV. [VERIFIED: Daniweb print header thread, OpenReplay CSS for print guide]

### Pitfall 4: URL-After-Link Renders `#anchor` Fragments on Internal Nav Links

**What goes wrong:** Without the `a[href^="#"]:after { content: none }` exception in D-16, the print CSS will append `(#experience)`, `(#skills)`, etc. after every nav link — useless in a printed document and visually cluttered.

**How to avoid:** Both exceptions from D-16 are required:
```css
a[href^="mailto:"]:after { content: none; }
a[href^="#"]:after { content: none; }
```
[VERIFIED: standard print CSS practice, CONTEXT.md D-16]

### Pitfall 5: `print-color-adjust: exact` Added When Not Needed

**What goes wrong:** Developers add `-webkit-print-color-adjust: exact; print-color-adjust: exact;` by default in print stylesheets. This forces the browser to print background colors and backgrounds — exactly what D-15 is trying to strip.

**How to avoid:** Do not add `print-color-adjust` to this stylesheet. The default behavior (browser may suppress backgrounds) is what we want. D-15 explicitly strips all background colors anyway. Only use `print-color-adjust: exact` if preserving a specific colored UI element in print. [VERIFIED: CSS-Tricks print-color-adjust almanac]

### Pitfall 6: OG Block Inserted After `<link rel="stylesheet">`

**What goes wrong:** Some parsers and crawlers (particularly older LinkedIn scrapers) stop reading `<head>` early. OG tags should appear before stylesheet links to ensure they're always parsed.

**How to avoid:** Insert OG block + JSON-LD before `<link rel="stylesheet" href="style.css">` — see the insertion order pattern in Architecture Patterns above. [ASSUMED: common web practice; confirmed by OG tag ordering guides]

### Pitfall 7: Nav Links Fail 44px Tap Target at Mobile

**What goes wrong:** Current `nav a` has `padding-bottom: 4px` only. Effective tap area is ~18px tall — less than half the 44px minimum. On a phone, recruiters will mis-tap.

**How to avoid:** Add `min-height: 44px; display: flex; align-items: center;` to `nav a` inside the 600px media query. [VERIFIED: WCAG 2.5.5 documentation, calculated from current CSS values in session]

### Pitfall 8: Proficient Tier Contains Too Many Items Without Visual Grouping

**What goes wrong:** D-07 puts 41 items in Proficient. At 375px, the flex-wrap tag cloud will produce many rows. No overflow issue — just dense visual output. No CSS change is needed (skills-tags is already `flex-wrap: wrap`), but the executor should be aware.

**How to avoid:** The existing `.skill-tag` wrapping behavior handles this correctly. No special CSS needed. This is informational only.

---

## Wave Dependency Map

Phase 3 has no external blockers. Internal dependencies:

```
Wave 1 (independent — no shared writes):
  Plan A: CV Content (index.html only — experience + skills sections)
  Plan B: style.css §7 — .experience-stack rule (style.css only — §7)

Wave 2 (blocked on Wave 1):
  Plan C: Mobile CSS (style.css §12 — expand 600px block)  ← needs content to test at 375px
  Plan D: Print CSS (style.css §12 — add @media print)     ← can run parallel with C

Wave 3 (blocked on Wave 2):
  Plan E: Head meta (index.html — <head> additions: OG + JSON-LD + description)
  (OG image asset must exist before this plan deploys)

Wave 0 (prerequisite, no code):
  OG card image: generate assets/og-card.png before Wave 3
```

**Why content before mobile CSS testing:** The D-04 experience text and D-07 41-item Proficient tier add vertical content. Testing mobile layout before content is in place gives a false picture of scroll depth and overflow.

**Why OG image before Wave 3:** The `<head>` plan commits the `og:image` URL pointing to `assets/og-card.png`. If the PNG is not committed, the deployed page has a broken `og:image`. Either commit the PNG in Wave 0 (standalone commit) or bundle it with the head meta plan.

---

## Verification Commands

All runnable in the local repo with tools confirmed available on this machine (node v25, npx v11, curl 8.7, python3 3.14, git 2.44).

### Mobile Rendering
1. Chrome DevTools: Responsive Design Mode → iPhone SE (375×667) or Galaxy S8+ (360×740)
2. Set viewport to 375px width, check for horizontal scrollbar
3. Verify nav scrolls horizontally (grab and drag)
4. Verify tap targets: inspect `nav a` in DevTools, confirm height >= 44px

### Print Preview
1. Chrome: `Ctrl+P` (or `Cmd+P` on macOS) → Save as PDF
2. Verify: no nav links on printed page, no footer
3. Verify: job entry URLs appear after links (except mailto: and # links)
4. Verify: no role entry split across page break
5. Check visual output at 100% zoom in PDF viewer

### OG Tag Verification (after deploy)
```bash
# Fetch with crawler user agent, grep for OG and twitter tags
curl -A "facebookexternalhit/1.1" https://bolotbekbolotov.github.io/ | grep -E 'og:|twitter:'

# Verify JSON-LD is present
curl https://bolotbekbolotov.github.io/ | grep -A 30 'application/ld+json'
```

### LinkedIn OG Preview
1. Visit https://www.linkedin.com/post-inspector/
2. Enter `https://bolotbekbolotov.github.io/`
3. Verify: preview card shows correct title, description, and OG image

### Facebook Sharing Debugger
- URL: https://developers.facebook.com/tools/debug/

### Google Rich Results Test
```bash
# One-off Lighthouse run (npx confirmed available, no commit needed)
npx lighthouse https://bolotbekbolotov.github.io/ --only-categories=accessibility,seo --output=json 2>/dev/null | python3 -c "
import json, sys
r = json.load(sys.stdin)
for cat in ['accessibility','seo']:
    print(f'{cat}: {r[\"categories\"][cat][\"score\"]*100:.0f}')
"
```

Or use Google Search Console: https://search.google.com/test/rich-results

### Schema Validation
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

### HTTP headers (verify content-type)
```bash
curl -I https://bolotbekbolotov.github.io/
curl -I https://bolotbekbolotov.github.io/assets/og-card.png
```

---

## Security Domain

`security_enforcement: true`, `security_asvs_level: 1` per config.json.

### ASVS Level 1 Applicability for This Phase

This is a static HTML/CSS page. There is no authentication, no server-side code, no user input, no forms, no cookies, no JavaScript that handles user data. ASVS L1 controls that apply:

| ASVS Category | Applies | Control | Status |
|---------------|---------|---------|--------|
| V1 Architecture | Partial | No secrets in source, no sensitive data in HTML | No secrets in any file — verified by read |
| V2 Authentication | No | No auth | N/A |
| V3 Session | No | No sessions | N/A |
| V4 Access Control | No | No ACL | N/A |
| V5 Input Validation | No | No user input | N/A |
| V6 Cryptography | No | No crypto | N/A |
| V7 Error Handling | No | No server | N/A |
| V13 API | No | No API | N/A |
| V14 Config | Partial | HTTP headers, HTTPS | GitHub Pages enforces HTTPS automatically |

### Relevant Security Items for Phase 3

1. **`rel="noopener"` on all `target="_blank"` links:** All 8 external links in current `index.html` already have `rel="noopener"`. D-04 adds new role text (no new external links). No action needed. [VERIFIED in session]

2. **`rel="noreferrer"` consideration:** Current links use `rel="noopener"` without `noreferrer`. `noreferrer` prevents the browser from sending a `Referer` header to the linked site. For a public CV page, this is a privacy preference, not a security requirement. Adding `noreferrer` is safe but not required. [ASSUMED: standard web practice]

3. **JSON-LD `email` field:** The email is already public on the page. Including it in JSON-LD does not expose new data. `mailto:` prefix is the correct URI scheme. [VERIFIED]

4. **OG image:** Static PNG. No XSS vector. No user data.

5. **No eval(), no innerHTML from user data, no dynamic script loading** — the page has no JS that handles user input. Script.js only reads DOM element IDs and adds/removes CSS classes. [VERIFIED by read of script.js]

**Security verdict:** Phase 3 introduces no new security risks. Existing `rel="noopener"` compliance is maintained.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `-webkit-overflow-scrolling: touch` is a no-op on iOS 13+ and harmless to include | Mobile Nav Pattern | No risk — at worst it's a no-op; at best it enables momentum scroll on iOS 12 |
| A2 | `rem` resolves correctly in print media in all modern browsers | Print Pattern | Low risk — D-18 is the locked decision; fallback is `pt` units if a browser renders rem as 0 in print |
| A3 | `og:type: profile` is recognized by LinkedIn for CV pages | Open Graph | Low risk — `og:type: website` is the universal fallback and works identically for preview generation |
| A4 | Inter font renders correctly in Figma/Canva exports without local font installation | OG Image Generation | Low risk — both tools have Inter available; if unavailable, system sans-serif is visually similar |
| A5 | `rel="noreferrer"` is not required (only `rel="noopener"`) for ASVS L1 compliance on a public CV page | Security | Low risk — public page, no sensitive referrer data |
| A6 | JSON-LD block should be inserted before `<link rel="stylesheet">` for crawler compatibility | SEO Meta Pattern | Low risk — Google's crawler reads the full `<head>` regardless of order; ordering matters mainly for old/limited parsers |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| node / npx | One-off Lighthouse audit (optional verify step) | Yes | node v25.2.1, npx v11.6.2 | Run Lighthouse in Chrome DevTools UI instead |
| curl | OG tag verification after deploy | Yes | 8.7.1 | Browser DevTools Network tab |
| python3 | One-off character count / JSON parse utilities | Yes | 3.14.4 | Manual count |
| git | Committing PNG binary + HTML/CSS edits | Yes | 2.44.0 | — |
| Figma / Canva | OG card image generation (outside codebase) | Unknown — not installed as CLI | — | Any image editor that can export 1200×630 PNG with Inter font (Canva web, Figma web, GIMP, Sketch) |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** OG card image requires a graphical design tool — Canva web (no install) is a zero-friction fallback.

---

## Open Questions

1. **OG image commit timing vs `<head>` meta plan**
   - What we know: `og:image` in D-23 points to `https://bolotbekbolotov.github.io/assets/og-card.png`
   - What's unclear: Should the PNG be committed as its own Wave 0 commit, or bundled in the same Wave 3 plan that edits `<head>`?
   - Recommendation: Commit the PNG binary as a standalone commit (or as part of Wave 0 prep) so the Wave 3 plan can be self-contained and immediately verifiable on deploy.

2. **Does the active nav link go off-screen in the horizontal-scrolling mobile nav?**
   - What we know: IntersectionObserver in `script.js` adds `.active` to the nav link for the section in view. With `overflow-x: auto` and 4 links, the active link could be outside the visible scroll window.
   - What's unclear: At 375px, do all 4 nav links fit without scrolling? If yes, there's no off-screen active link problem.
   - Recommendation: 4 links × ~80px each = ~320px + gaps (~48px) = ~368px total. At 375px viewport minus 32px padding = 343px content area. The 4 links likely do NOT all fit in one viewport width. A `scrollIntoView()` call on the newly-active link would be ideal, but it adds JS complexity. Given scope constraints, the CSS-only solution is acceptable as the nav is functional and scrollable; omit the `scrollIntoView()` enhancement unless explicitly requested.

---

## Sources

### Primary (HIGH confidence — verified against actual files in this session)
- `index.html` — read in session: current `<head>`, section structure, skills tier count (3), external link rel attributes
- `style.css` — read in session: all 12 sections, existing 600px media query, token list, nav a padding
- `script.js` — read in session: IntersectionObserver pattern
- `.planning/phases/03-polish-meta/03-CONTEXT.md` — all locked decisions D-01 through D-24

### Primary (HIGH confidence — official documentation)
- MDN Web Docs: page-break-inside, break-inside, @page, scrollbar-width, ::-webkit-scrollbar, prefers-reduced-motion, meta name=theme-color, print-color-adjust
- schema.org/email — email field format for Person schema
- Google Developers: consolidate-duplicate-urls (canonical), Rich Results Test
- WCAG 2.5.5 Target Size (Enhanced) — W3C WAI
- W3C WCAG C39 — prefers-reduced-motion technique

### Secondary (MEDIUM confidence — verified against multiple sources)
- OG meta description length: 160 desktop / 120 mobile — cross-referenced across Spotibo, Collaborada, Google Search Central community
- OG minimum tag set per platform — OGPreview.app Discord specs, PreviewOG knowledge base
- LinkedIn Post Inspector URL: `https://www.linkedin.com/post-inspector/` — LinkedIn Help + Kinsta
- `print-color-adjust` behavior — CSS-Tricks almanac + MDN
- `page-break-inside: avoid` + `break-inside: avoid` dual declaration — MDN + CSS-Tricks + dev.to

### Tertiary (LOW confidence — single source or assumed)
- `-webkit-overflow-scrolling: touch` deprecation status and iOS 13+ behavior (A1)
- `og:type: profile` recognition by LinkedIn (A3)
- JSON-LD `<head>` insertion order for crawler compatibility (A6)

---

## Metadata

**Confidence breakdown:**
- CV content edits (D-02 to D-08): HIGH — pure HTML text replacement, no logic
- Mobile CSS (POLISH-01): HIGH — well-documented patterns, current code verified
- Print CSS (POLISH-02): HIGH — well-documented domain; two minor assumptions (rem in print, A2)
- SEO/OG/JSON-LD (POLISH-03): HIGH — tag sets verified; OG image generation workflow has minor assumptions

**Research date:** 2026-05-09
**Valid until:** 2026-08-09 (stable domain — HTML/CSS/OG spec; 90-day estimate)
