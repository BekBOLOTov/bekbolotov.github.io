# Phase 3: Polish & Meta - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 3 ships rendering correctness across all access contexts (mobile screens at 375px, browser print/PDF, search engines, social link-preview cards) AND a CV content refresh (expanded role detail, inline tech stack per role, skills tier consolidation). Scope was widened from the ROADMAP definition (POLISH-01/02/03 only) to fold in CV content updates the user prioritized. After this phase, the page reads correctly on a phone, prints as a usable PDF, indexes well for the engineer's name, generates a real preview card on LinkedIn, and presents a deeper, more accurate CV.

</domain>

<decisions>
## Implementation Decisions

### Scope Expansion (logged for traceability)
- **D-01:** Phase 3 was expanded mid-discussion to include CV content updates. Original ROADMAP scope was mobile + print + SEO (POLISH-01/02/03). User chose to fold content edits into the same phase rather than insert Phase 2.1. ROADMAP and REQUIREMENTS.md should be updated to reflect this; downstream planner must verify both polish + content scope are addressed.

### CV Content — Experience Section
- **D-02:** All 5 roles get an inline `Stack: …` line in addition to the global Skills section. Stack listed below per role is the locked content.
- **D-03:** Breez Pro era removes all client app names (Kulikov, Osmon, Intersport, Globus). Reframed as project-type bullets that keep scale numbers.
- **D-04:** Final role text (locked, executor uses verbatim — adjust grammar but not facts):

```
MDigital — Sep 2024 – present | Flutter Developer
- Owned full delivery cycle of event-management app (calendar, in-app chat, credit-score tracking) — feature build → store publish
- Maintained classified-listings apps serving 1M+ users — feature work, bug fixes, release cadence
Stack: Flutter, Dart, Bloc, Dio, Firebase

Mancho — Jan 2024 – Sep 2024 | Flutter Developer
- Built e-payment system from zero to production launch (300 users at handoff)
- Implemented payment flow, onboarding, transaction history
Stack: Flutter, Dart, Bloc, REST

Breez Pro — Jun 2021 – Oct 2023 | Android Developer
- Built confectionery e-commerce app with online ordering + bonus program (500k+ downloads)
- Built cargo logistics app — employee data, cargo records, expense and salary calculation
- Built retail clothing app — online shopping + bonus management
- Maintained hypermarket app (1M+ downloads) — redesigned UI, extracted features from archived legacy code
Stack: Kotlin, Java, Coroutines, Retrofit, Room, Dagger 2

Ogogo — Mar 2021 – Jun 2021 | Android Developer
- Maintained taxi app — bug fixes, UI redesign
- Replaced raw socket layer with Socket IO library — improved connection reliability
Stack: Java, Socket IO, OkHttp

NurTelecom — Mar 2019 – Mar 2021 | Android Developer
- Built e-payment app for mobile telecom (300k users, 1M+ downloads)
- Implemented loyalty card storage, subscriber registration, payment-locations map, QR scanner, dark theme
Stack: Java, Kotlin, Retrofit, OkHttp, Room
```

- **D-05:** Inline stack rendering: render as a small muted line under the bullets, e.g. `<p class="experience-stack"><span>Stack:</span> …</p>`. Reuse `--color-text-muted` and `--font-size-sm` tokens. No new color tokens.

### CV Content — Skills Section
- **D-06:** Skills tier model collapses from 3 tiers (Expert / Proficient / Familiar — Phase 2 D-09) to 2 tiers (Expert / Proficient). Phase 2 D-09 is superseded.
- **D-07:** Final skills list (locked):

```
Expert (4):
  Kotlin, Dart, Flutter, Android SDK

Proficient (41):
  Java, Coroutines, Retrofit, Bloc, Room, Dagger 2, Dio, Firebase, REST APIs, Git,
  Hilt, Koin, GetIt, ViewModel, LiveData,
  Clean Architecture, MVVM, MVI,
  SharedPreferences, Drift,
  flutter_test, bloc_test,
  Material 3, Cupertino, custom widgets, FCM,
  C++, Socket IO, OkHttp, Hive,
  RxJava, Flow, Jetpack Compose, Material Design, Crashlytics,
  Fastlane, animations, deep linking, in-app purchases, Google Sign-In,
  GraphQL (Apollo)
```

- **D-08:** Existing CSS class `.skills-tier` and `.skills-tier-label` remain — only the count of `.skills-tier` blocks changes from 3 to 2. No new CSS needed; existing tag styling reused.

### Mobile Layout (POLISH-01)
- **D-09:** Continue Phase 2 desktop-first pattern. Expand the existing `@media (max-width: 600px)` block in `style.css` §12 (do not rewrite to mobile-first). Lowest churn, preserves existing token-based sections.
- **D-10:** Target viewport: 375px width minimum. Single column, no horizontal overflow, all tap targets ≥ 44×44px (per PITFALLS.md Pitfall 5).
- **D-11:** At ≤ 600px: stack `.experience-header` vertically (already done in Phase 2 — verify), reduce `.container` padding to `--space-4` (already done — verify), tighten `--space-12` section padding if needed for vertical density.

### Mobile Sticky Nav (POLISH-01)
- **D-12:** Sticky nav at ≤ 600px becomes single-row horizontal scroll: `nav { overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch }`. Hide scrollbar via `nav::-webkit-scrollbar { display: none }` and `scrollbar-width: none`.
- **D-13:** Phase 2 D-15 `flex-wrap: wrap` on `nav` is superseded for the ≤ 600px breakpoint only. Desktop behavior unchanged.

### Print Stylesheet (POLISH-02)
- **D-14:** Add new `@media print` block at the bottom of `style.css` §12. Hide on print: `header` (sticky nav), `footer`, all `section` `border-top` dividers.
- **D-15:** Force black-on-white on print: `body { color: #000; background: #fff }`. Strip accent color from links on print: `a { color: inherit }`. Underline links so they're still recognizable.
- **D-16:** Append URL after every link via `a[href]:after { content: " (" attr(href) ")"; font-size: 0.85em; color: #444 }`. Exceptions: skip `mailto:` (`a[href^="mailto:"]:after`) and skip internal anchors (`a[href^="#"]:after`) — both render as redundant text.
- **D-17:** Page-break behavior: `.experience-entry { page-break-inside: avoid; break-inside: avoid }`. Apply same rule to `.achievements-group` and `.skills-tier` (cheap, prevents awkward splits).
- **D-18:** Print font sizing: keep `rem`-based sizes; do NOT switch to `pt`. Modern browsers handle `rem` correctly in print and the design system already uses `rem` consistently.

### SEO Meta (POLISH-03)
- **D-19:** Rewrite `<meta name="description">` to include full name + scale signal. Locked text:

> `Bolot Bekbolotov — mobile developer with 7 years building Android and Flutter apps used by 1M+ users. IOI 2016/2017 finalist and ACM ICPC NEERC 2018 finalist.`

- **D-20:** `<title>` stays "Bolot Bekbolotov — Mobile Developer" (already correct from Phase 2).
- **D-21:** Add `<html lang="en">` — already present, verify on touch.

### Open Graph (POLISH-03)
- **D-22:** Create `assets/og-card.png` at 1200×630px. Content: name (large, Inter Bold), title "Mobile Developer" (smaller, muted), accent stripe in `#2563eb`. Plain layout — no photo. Generate once and commit; do not script generation.
- **D-23:** Add to `<head>`:

```html
<meta property="og:type" content="profile">
<meta property="og:title" content="Bolot Bekbolotov — Mobile Developer">
<meta property="og:description" content="Mobile developer with 7 years building Android and Flutter apps used by 1M+ users. IOI 2016/2017 finalist and ACM ICPC NEERC 2018 finalist.">
<meta property="og:url" content="https://bolotbekbolotov.github.io/">
<meta property="og:image" content="https://bolotbekbolotov.github.io/assets/og-card.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

### JSON-LD Person Schema (POLISH-03)
- **D-24:** Add `<script type="application/ld+json">` in `<head>` after OG block. Full Person schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Bolot Bekbolotov",
  "jobTitle": "Mobile Developer",
  "url": "https://bolotbekbolotov.github.io/",
  "email": "mailto:bekbolotov.bolot@gmail.com",
  "sameAs": [
    "https://github.com/BekBOLOTov",
    "https://www.linkedin.com/in/bolotbekbolotov/",
    "https://codeforces.com/profile/bekbolotov.bolot",
    "https://leetcode.com/bekbolotovBolot",
    "https://stats.ioinformatics.org/people/5946"
  ]
}
```

### Claude's Discretion
- Exact OG card PNG composition (font weight balance, accent stripe position, padding) — designer call within stated constraints
- Whether to add a `theme-color` meta tag for mobile browser chrome
- Whether to add `<link rel="canonical">` (probably yes — root URL only)
- Exact `nav` scrollbar-hiding pseudo-element compatibility fallback for older browsers
- Whether to add `prefers-reduced-motion` guard around `scroll-behavior: smooth` on `html`
- Section-by-section `--space-*` adjustments at 375px (judgment call, no token churn)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — single-page constraint, no frameworks, no build step, v2 deferrals (favicon, custom domain)
- `.planning/REQUIREMENTS.md` — POLISH-01/02/03 acceptance criteria
- `.planning/ROADMAP.md` — Phase 3 success criteria (note: scope expanded mid-discussion, see D-01)

### Prior Phases
- `.planning/phases/01-foundation-deploy/01-CONTEXT.md` — repo URL, scaffold structure, deploy specifics
- `.planning/phases/02-content-structure/02-CONTEXT.md` — design tokens (D-16, D-17), content provenance (D-18), nav structure (D-14, D-15 — D-15 superseded for mobile by current D-12), 3-tier skills model (D-09 — superseded by current D-06)

### Research
- `.planning/research/PITFALLS.md` — Pitfall 5 (mobile rendering), Pitfall 7 (SEO basics), Pitfall 11 (print stylesheet), Pitfall 12 (accessibility) — directly drive Phase 3 acceptance
- `.planning/research/STACK.md` §Meta/SEO — OG tags + JSON-LD Person schema + robots/sitemap guidance
- `.planning/research/ARCHITECTURE.md` — file structure, GitHub Pages config

### Existing Code (must read before editing)
- `index.html` — current `<head>`, hero links, all sections — Phase 3 modifies `<head>` and may add `experience-stack` markup
- `style.css` §12 (Media Queries) — existing mobile guard at `@media (max-width: 600px)`; Phase 3 expands this and adds `@media print`
- `script.js` — IntersectionObserver active nav (Phase 2 §11). Print stylesheet doesn't affect it; mobile nav scroll behavior may need a guard if active link goes off-screen.

### CV Source
- `cv-source.pdf` (repo root) — original CV reference; Phase 3 D-04 supersedes for the website rendering

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- 19 design tokens in `:root` (Phase 2): `--color-text`, `--color-text-muted`, `--color-accent`, `--color-bg`, `--color-border`, `--font-body`, `--font-size-{sm,base,lg,xl,2xl}`, `--line-height`, `--space-{1,2,3,4,6,8,12,16}`, `--max-width: 760px`. All Phase 3 styles MUST use these — no hardcoded colors or sizes.
- `assets/` directory exists with `.gitkeep`. Drop `og-card.png` here.
- `.experience-entry`, `.skills-tier`, `.achievements-group` classes are reusable for `page-break-inside: avoid`.
- `.hero-links a` already wrap with `flex-wrap: wrap` — mobile-friendly out of box.
- All external links already use `target="_blank" rel="noopener"` — fine for OG/print.

### Established Patterns
- HTML: semantic sections with `aria-labelledby` (Phase 1 + 2). Phase 3 adds `<head>` content + tweaks CSS only — does not restructure `<main>`.
- CSS: section comment banners (1–12) — Phase 3 adds rules to §12 (Media Queries) and inserts new `experience-stack` rule in §7 (Experience).
- JS: vanilla, IIFE pattern, `defer`-loaded (Phase 2 D-15 + script.js). No new JS needed in Phase 3.
- Lowercase hrefs/srcs only (PITFALL-6 case-sensitivity rule).

### Integration Points
- `<head>` of `index.html`: insert OG block + JSON-LD before existing `<link rel="stylesheet">`. Update `<meta name="description">` value.
- `<main>` of `index.html`: per role, add a `<p class="experience-stack">…</p>` after `<ul>` inside `.experience-entry` (D-05). Update Breez Pro `<ul>` to remove app-name `<strong>` markup (D-03).
- `#skills` of `index.html`: collapse 3 `.skills-tier` blocks to 2; redistribute `.skill-tag` items per D-07.
- `style.css` §7: add `.experience-stack` rule.
- `style.css` §8: no changes to skills CSS (existing styles handle 2 tiers identically).
- `style.css` §12: expand existing `@media (max-width: 600px)` block + append `@media print` block.

</code_context>

<specifics>
## Specific Ideas

### Live URL
`https://bolotbekbolotov.github.io/` — used in OG `og:url` and JSON-LD `url`.

### Profile / Contact (verbatim)
- Email: bekbolotov.bolot@gmail.com
- GitHub: https://github.com/BekBOLOTov
- LinkedIn: https://www.linkedin.com/in/bolotbekbolotov/
- IOI: https://stats.ioinformatics.org/people/5946
- ACMP: https://acmp.ru/index.asp?main=user&id=114567
- Codeforces: https://codeforces.com/profile/bekbolotov.bolot
- LeetCode: https://leetcode.com/bekbolotovBolot

### Locked meta description text
> `Bolot Bekbolotov — mobile developer with 7 years building Android and Flutter apps used by 1M+ users. IOI 2016/2017 finalist and ACM ICPC NEERC 2018 finalist.`

### Locked OG card content
- Top: "Bolot Bekbolotov" (large, Inter Bold ~96pt)
- Below: "Mobile Developer" (smaller, muted ~48pt)
- Accent: `#2563eb` stripe (top or left edge — designer choice within constraint)
- White background. No photo.

</specifics>

<deferred>
## Deferred Ideas

- **Favicon** — listed v2 in PROJECT.md / REQUIREMENTS.md. Skipped here despite being a natural fit with OG work. Add when v2 milestone opens.
- **Custom domain** (`firstname.dev` style) — v2 deferred. CNAME + DNS A records work tracked separately. Will require updating OG `og:url` and JSON-LD `url` fields.
- **`robots.txt` + `sitemap.xml`** — STACK.md §Meta/SEO calls these out but not required by POLISH-03. GitHub Pages serves them if present. Add as deferred polish.
- **Lighthouse audit gate** — PITFALLS.md Pitfall 12 calls for ≥ 90 accessibility score. Not in current acceptance criteria but should be a verify-step for the planner.
- **Phone (+996707020464) and Telegram (@bekbolotovBolot)** — Phase 2 deferred them; still not surfaced. Not raised in this discussion.
- **Education section** — Phase 2 deferred (no university info in source). Not raised.
- **Self-hosted Inter font** — PITFALLS.md Pitfall 10 mentions as alternative. Currently using Google Fonts CDN. Defer unless privacy/perf becomes a concern.

</deferred>

---

*Phase: 3-Polish & Meta*
*Context gathered: 2026-05-09*
