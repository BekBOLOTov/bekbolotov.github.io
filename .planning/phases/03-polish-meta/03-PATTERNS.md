# Phase 3: Polish & Meta - Pattern Map

**Mapped:** 2026-05-09
**Files analyzed:** 3 (index.html, style.css, assets/og-card.png)
**Analogs found:** 3 / 3 (all from the same codebase — single-file project)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `index.html` (`<head>`) | markup / meta | request-response (crawler reads) | `index.html` lines 3–11 (existing `<head>` block) | exact |
| `index.html` (`#experience` — stack lines) | markup / content | static render | `index.html` lines 62–75 (existing `.experience-entry > .experience-header + ul`) | exact |
| `index.html` (`#skills` — tier collapse) | markup / content | static render | `index.html` lines 108–140 (existing `.skills-tier` blocks) | exact |
| `style.css` §7 — `.experience-stack` rule | utility class | transform (muted secondary line) | `style.css` lines 220–230 (`.experience-role`, `.experience-dates` — same muted/sm token combo) | exact |
| `style.css` §12 — expand `@media (max-width: 600px)` | responsive layout | request-response | `style.css` lines 381–395 (existing 600px block) | exact |
| `style.css` §12 — new `@media print` block | print stylesheet | transform (screen → print) | No pre-existing print block — no analog in codebase | none |
| `assets/og-card.png` | binary asset | static file I/O | No image assets exist yet | none |

---

## Pattern Assignments

### `index.html` — `<head>` block modifications

**Analog:** `index.html` lines 3–11 (current `<head>`)

**Existing head pattern** (lines 3–11):
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bolot Bekbolotov — Mobile Developer</title>
  <meta name="description" content="Mobile developer with 7 years of Android and Flutter experience. CV and contact information.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
```

**Insertion order rule (from RESEARCH.md Architecture Patterns §4):**
Insert new tags after the existing `<meta name="description">` line and before `<link rel="preconnect">`. The `<link rel="stylesheet" href="style.css">` must remain last. Order:
1. charset, viewport, title
2. `<meta name="description">` — update value in-place
3. `<link rel="canonical">` — new (discretion: recommended YES per RESEARCH.md)
4. `<meta name="theme-color">` — new (discretion: recommended YES per RESEARCH.md)
5. `<link rel="preconnect">` × 2 — existing, no change
6. Google Fonts `<link>` — existing, no change
7. OG block (`og:type` through `twitter:card`) — new, D-23
8. JSON-LD `<script type="application/ld+json">` — new, D-24
9. `<link rel="stylesheet" href="style.css">` — existing, keep last

**Key attribute patterns to preserve:**
- All `<meta>` tags use `content="..."` (not self-closing variant with `/`)
- All `<link>` hrefs are lowercase
- `crossorigin` attribute on the gstatic preconnect is an attribute-only form (no value)

**`<html>` lang attribute** (line 2):
```html
<html lang="en">
```
Already present — verify only, no edit.

---

### `index.html` — `#experience` section: add `.experience-stack` per role

**Analog:** `index.html` lines 41–51 (MDigital entry — the pattern block to copy and extend)

**Existing experience entry pattern** (lines 41–51):
```html
<div class="experience-entry">
  <div class="experience-header">
    <span class="experience-company">MDigital</span>
    <span class="experience-role">Flutter Developer</span>
    <span class="experience-dates">Sep 2024 – present</span>
  </div>
  <ul>
    <li>Developed event managing app with calendar, chat, and credit score tracking — full cycle to store publishing</li>
    <li>Participated in development and support of classified apps with 1M+ users</li>
  </ul>
</div>
```

**New pattern — add `<p class="experience-stack">` immediately after `</ul>`, before `</div>`:**
```html
<div class="experience-entry">
  <div class="experience-header">
    <span class="experience-company">MDigital</span>
    <span class="experience-role">Flutter Developer</span>
    <span class="experience-dates">Sep 2024 – present</span>
  </div>
  <ul>
    <li>…</li>
  </ul>
  <p class="experience-stack"><span>Stack:</span> Flutter, Dart, Bloc, Dio, Firebase</p>
</div>
```

**Breez Pro bullets — existing markup to replace** (lines 71–75):
```html
<li><strong>Kulikov</strong> — confectionery store app, 500k+ downloads; online cake ordering and bonus collection</li>
<li><strong>Osmon Moving &amp; Storage</strong> — cargo company app; employee data, cargo records, expenses, salary calculation</li>
<li><strong>Intersport</strong> — clothing store app; online shopping and bonus management</li>
<li><strong>Hypermarket Globus</strong> — major Russian hypermarket, 1M+ downloads; online ordering, redesign, extracted features from archived code</li>
```

**Replacement pattern (D-03 — remove `<strong>` app names, reframe as project-type bullets):**
```html
<li>Built confectionery e-commerce app with online ordering + bonus program (500k+ downloads)</li>
<li>Built cargo logistics app — employee data, cargo records, expense and salary calculation</li>
<li>Built retail clothing app — online shopping + bonus management</li>
<li>Maintained hypermarket app (1M+ downloads) — redesigned UI, extracted features from archived legacy code</li>
```

**HTML entity pattern:** `&amp;` is used for `&` in attribute values and text (see line 161 `&amp;id=114567`). Plain `&` is never used bare in HTML content.

**`aria-labelledby` pattern** (lines 37–39) — existing, do not change:
```html
<section id="experience" aria-labelledby="experience-heading">
  <div class="container">
    <h2 id="experience-heading">Experience</h2>
```

---

### `index.html` — `#skills` section: collapse 3 tiers to 2

**Analog:** `index.html` lines 108–140 (existing 3-tier `.skills-tier` blocks)

**Existing 3-tier pattern** (lines 108–140):
```html
<div class="skills-tier">
  <p class="skills-tier-label">Expert</p>
  <div class="skills-tags">
    <span class="skill-tag">Kotlin</span>
    <span class="skill-tag">Dart</span>
    <span class="skill-tag">Flutter</span>
    <span class="skill-tag">Android SDK</span>
  </div>
</div>

<div class="skills-tier">
  <p class="skills-tier-label">Proficient</p>
  <div class="skills-tags">
    <span class="skill-tag">Java</span>
    …
  </div>
</div>

<div class="skills-tier">
  <p class="skills-tier-label">Familiar</p>
  <div class="skills-tags">
    <span class="skill-tag">C++</span>
    …
  </div>
</div>
```

**New 2-tier pattern (D-06/D-07 — delete `Familiar` block entirely, redistribute items into `Proficient`):**
```html
<div class="skills-tier">
  <p class="skills-tier-label">Expert</p>
  <div class="skills-tags">
    <span class="skill-tag">Kotlin</span>
    <span class="skill-tag">Dart</span>
    <span class="skill-tag">Flutter</span>
    <span class="skill-tag">Android SDK</span>
  </div>
</div>

<div class="skills-tier">
  <p class="skills-tier-label">Proficient</p>
  <div class="skills-tags">
    <span class="skill-tag">Java</span>
    <span class="skill-tag">Coroutines</span>
    <span class="skill-tag">Retrofit</span>
    <span class="skill-tag">Bloc</span>
    <span class="skill-tag">Room</span>
    <span class="skill-tag">Dagger 2</span>
    <span class="skill-tag">Dio</span>
    <span class="skill-tag">Firebase</span>
    <span class="skill-tag">REST APIs</span>
    <span class="skill-tag">Git</span>
    <span class="skill-tag">Hilt</span>
    <span class="skill-tag">Koin</span>
    <span class="skill-tag">GetIt</span>
    <span class="skill-tag">ViewModel</span>
    <span class="skill-tag">LiveData</span>
    <span class="skill-tag">Clean Architecture</span>
    <span class="skill-tag">MVVM</span>
    <span class="skill-tag">MVI</span>
    <span class="skill-tag">SharedPreferences</span>
    <span class="skill-tag">Drift</span>
    <span class="skill-tag">flutter_test</span>
    <span class="skill-tag">bloc_test</span>
    <span class="skill-tag">Material 3</span>
    <span class="skill-tag">Cupertino</span>
    <span class="skill-tag">custom widgets</span>
    <span class="skill-tag">FCM</span>
    <span class="skill-tag">C++</span>
    <span class="skill-tag">Socket IO</span>
    <span class="skill-tag">OkHttp</span>
    <span class="skill-tag">Hive</span>
    <span class="skill-tag">RxJava</span>
    <span class="skill-tag">Flow</span>
    <span class="skill-tag">Jetpack Compose</span>
    <span class="skill-tag">Material Design</span>
    <span class="skill-tag">Crashlytics</span>
    <span class="skill-tag">Fastlane</span>
    <span class="skill-tag">animations</span>
    <span class="skill-tag">deep linking</span>
    <span class="skill-tag">in-app purchases</span>
    <span class="skill-tag">Google Sign-In</span>
    <span class="skill-tag">GraphQL (Apollo)</span>
  </div>
</div>
```

**CSS impact:** D-08 confirms no CSS changes needed. `.skills-tier:last-child { margin-bottom: 0 }` (line 251) applies automatically to whichever block is last — works correctly with 2 tiers.

---

### `style.css` §7 — new `.experience-stack` rule

**Analog:** `style.css` lines 220–230 (`.experience-role` and `.experience-dates` — same two-token combo: `--color-text-muted` + `--font-size-sm`)

**Closest existing rules** (lines 222–230):
```css
.experience-role {
  font-size: var(--font-size-base);
  font-weight: 400;
  color: var(--color-text-muted);
}

.experience-dates {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
}
```

**New rule to add after `.experience-entry li` block (after line 243), still inside §7):**
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

**Token usage pattern:** Every property references a CSS custom property from `:root`. No hardcoded colors or sizes. Margin shorthand `var(--space-1) 0 0 0` is acceptable — the other three sides are 0 which has no token equivalent.

**`p` default margin conflict:** The global `p { margin: 0 0 var(--space-4) 0 }` rule (line 75) would add 16px below `.experience-stack`. The explicit `margin: var(--space-1) 0 0 0` in the new rule overrides this — it sets bottom margin to 0. This is the correct approach, matching how `.skills-tier-label` (line 256) overrides paragraph defaults.

---

### `style.css` §12 — expand `@media (max-width: 600px)` block

**Analog:** `style.css` lines 381–395 (existing 600px block — the block to expand in-place)

**Current 600px block** (lines 381–395):
```css
@media (max-width: 600px) {
  .container {
    padding-inline: var(--space-4);
  }

  .experience-header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    gap: var(--space-4);
    flex-wrap: wrap;
  }
}
```

**What to modify:**
- The `nav` rule (lines 392–394) must be **replaced** — `flex-wrap: wrap` becomes `flex-wrap: nowrap` and three new properties are added. Do not append; replace the entire `nav { }` block within this media query.
- New rules for `nav a`, and optional `html` reduced-motion guard are appended after the existing rules.

**Replacement `nav` rule + new `nav a` rule (D-12, D-13 — RESEARCH.md Pattern 1):**
```css
  nav {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  nav::-webkit-scrollbar {
    display: none;
  }

  nav a {
    min-height: 44px;
    display: flex;
    align-items: center;
    padding-inline: var(--space-2);
  }
```

**Desktop nav rule remains unchanged** (lines 126–134) — the 600px block only overrides for mobile. No touching §5.

---

### `style.css` §12 — new `@media print` block

**Analog:** None in codebase. Write from scratch per RESEARCH.md Pattern 2.

**Insertion point:** Append after the closing `}` of the `@media (max-width: 600px)` block. `@media print` must be the last block in the file per CSS organization convention (RESEARCH.md Architecture Patterns).

**Full block to write (D-14 through D-18, RESEARCH.md Pattern 2):**
```css
@media print {
  header,
  footer {
    display: none;
  }

  section {
    border-top: none;
  }

  body {
    color: #000;
    background: #fff;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #444;
  }

  a[href^="mailto:"]:after,
  a[href^="#"]:after {
    content: none;
  }

  .experience-entry,
  .achievements-group,
  .skills-tier {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  @page {
    margin: 1in;
  }
}
```

**Hardcoded values are intentional here:** `#000`, `#fff`, `#444` are print-specific values — they override design tokens deliberately. `0.85em` is relative to the surrounding element's font size (correct for a footnote-style URL). `1in` is the `@page` margin standard. These do not belong in `:root` tokens which are screen-context values.

---

### `assets/og-card.png` — binary asset

**Analog:** No image assets exist. `assets/` directory has only `.gitkeep`.

**No code pattern applies.** This is a manually-generated binary file.

**Constraints for generation (D-22):**
- Canvas: 1200×630px
- Background: white (`#ffffff`)
- Accent stripe: `#2563eb` (matches `--color-accent` token)
- Text top: "Bolot Bekbolotov" — Inter Bold, ~96pt
- Text below: "Mobile Developer" — Inter Regular, ~48pt, color `#6b7280` (matches `--color-text-muted` token)
- No photo
- Export as PNG, target < 200KB
- Commit to `assets/og-card.png` (lowercase — PITFALL-6 case-sensitivity rule applies to file paths)

**Sequence constraint:** This PNG must be committed before the `<head>` OG block (`og:image` tag) goes live. Either commit as standalone Wave 0 step or bundle with the Wave 3 head-meta plan.

---

## Shared Patterns

### Design Token Usage (cross-cutting — all CSS rules)

**Source:** `style.css` lines 13–42 (`:root` block)
**Apply to:** Every new CSS rule in §7 and §12

All new CSS must use these tokens. Never hardcode colors or font sizes in screen-context rules:

```css
/* Colors */
--color-text:       #1a1a1a;
--color-text-muted: #6b7280;
--color-accent:     #2563eb;
--color-bg:         #ffffff;
--color-border:     #e5e7eb;

/* Font sizes */
--font-size-sm:   0.875rem;
--font-size-base: 1rem;

/* Spacing */
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-4:  1rem;
--space-6:  1.5rem;
```

Exception: `@media print` block uses hardcoded `#000`, `#fff`, `#444` — these are print overrides, not design-system values.

### Semantic HTML / `aria-labelledby` Pattern (cross-cutting — all sections)

**Source:** `index.html` lines 37–39 (experience section) and lines 104–106 (skills section)
**Apply to:** No new sections added in Phase 3 — existing sections already have correct `aria-labelledby`. Verify pattern is not broken during content edits.

```html
<section id="experience" aria-labelledby="experience-heading">
  <div class="container">
    <h2 id="experience-heading">Experience</h2>
```

Pattern: `section[id]` + `aria-labelledby` pointing to `h2[id]` where the h2 id = section id + "-heading".

### Lowercase Paths (cross-cutting — all asset references)

**Source:** PITFALL-6 (case-sensitivity on GitHub Pages servers)
**Apply to:** `assets/og-card.png` filename and `og:image` URL path

All `href`, `src`, and URL attribute values must be lowercase. The OG image path in `og:image` must exactly match the committed filename: `assets/og-card.png`.

### `target="_blank" rel="noopener"` Pattern (cross-cutting — external links)

**Source:** `index.html` lines 31–33 (hero links) and lines 152–163 (achievements links)
**Apply to:** No new external links are added by Phase 3 (D-04 role text adds no new `<a>` elements). Verify existing links are not disturbed during content edits.

```html
<a href="https://github.com/BekBOLOTov" target="_blank" rel="noopener">GitHub</a>
```

---

## Discretion Items (planner resolves)

The following CONTEXT.md "Claude's Discretion" items have recommendations from RESEARCH.md and should be resolved in the plan:

| Item | RESEARCH.md Recommendation | Source |
|---|---|---|
| `<link rel="canonical">` | YES — add `href="https://bolotbekbolotov.github.io/"` | RESEARCH.md §Canonical Tag |
| `<meta name="theme-color">` | YES — `content="#2563eb"` | RESEARCH.md §theme-color |
| `prefers-reduced-motion` guard on `scroll-behavior` | YES — wrap `html { scroll-behavior: smooth }` in `@media (prefers-reduced-motion: no-preference)` | RESEARCH.md Pattern 5 |
| Nav scrollbar-hiding compatibility fallback | Both `scrollbar-width: none` (Firefox) and `::-webkit-scrollbar { display: none }` (Chrome/Safari/Edge) — already included in D-12 pattern | RESEARCH.md Pattern 1 |
| Section-by-section `--space-*` at 375px | No additional token adjustments needed beyond `.container padding-inline: var(--space-4)` already in the 600px block | RESEARCH.md Summary |

**`prefers-reduced-motion` change location:** `style.css` §11 UTILITIES (line 375–377). The bare `html { scroll-behavior: smooth; }` rule moves inside a `@media (prefers-reduced-motion: no-preference)` wrapper. This is a §11 edit, not §12 — plan accordingly.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `style.css` §12 — `@media print` block | print stylesheet | transform | No print block exists in the codebase. Planner uses RESEARCH.md Pattern 2 verbatim. |
| `assets/og-card.png` | binary asset | file I/O | No image assets in codebase. Generated outside codebase per D-22. |

---

## Metadata

**Analog search scope:** `index.html` (195 lines), `style.css` (395 lines), `script.js` (30 lines), `.planning/phases/02-content-structure/02-CONTEXT.md`
**Files read:** 5
**Files with exact analog:** 5 (head block, experience entry, skills tier, experience-stack CSS analog, 600px block)
**Files with no analog:** 2 (print block, OG image)
**Pattern extraction date:** 2026-05-09
