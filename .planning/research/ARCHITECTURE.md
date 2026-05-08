# Architecture Patterns

**Domain:** Personal CV / landing page — plain HTML/CSS/JS, GitHub Pages
**Researched:** 2026-05-09

---

## Recommended Architecture

A single-file-first approach: one `index.html` with a companion `style.css` and an
optional thin `main.js`. No build step, no bundler, no framework. The entire site
deploys by pushing to the repo's default branch (or a `gh-pages` branch).

```
/ (repo root)
├── index.html          # All page content — single scrollable document
├── style.css           # All styles — organized by section (see below)
├── main.js             # Optional — smooth scroll, active-nav highlight only
├── assets/
│   └── avatar.jpg      # Profile photo if used (keep ≤ 150 KB)
├── favicon.ico         # 32×32 favicon
└── CNAME               # Only if using a custom domain (e.g. bolotbekov.dev)
```

No `src/`, `dist/`, `build/`, or `public/` directories. GitHub Pages serves the repo
root directly; adding layers adds confusion with zero benefit for a site this size.

---

## Component Boundaries

### HTML — Section Structure

Each CV section maps to a landmark element. This is the boundary model:

| Section | Element | Landmark Role | Notes |
|---------|---------|--------------|-------|
| Site header (name + nav) | `<header>` | `banner` | Sticky or static |
| Hero (title + summary) | `<section id="hero">` | — | First visible content |
| Experience | `<section id="experience">` | — | Ordered list of roles |
| Skills | `<section id="skills">` | — | Tag cloud or grouped list |
| Education | `<section id="education">` | — | Degrees + certifications |
| Contact / links | `<footer>` or `<section id="contact">` | `contentinfo` | Email, GitHub, LinkedIn |

Each `<section>` is self-contained: it owns its heading, its content, and its internal
layout. Sections do not share HTML structures across boundaries.

### CSS — Organization by Layer

Organize `style.css` in this exact order, using comment banners as boundaries:

```
/* 1. RESET & BASE
   Minimal reset (box-sizing, margin: 0, line-height). Do not use a full
   reset library — it is overkill for a single static page. */

/* 2. DESIGN TOKENS
   CSS custom properties for color, spacing scale, type scale.
   --color-text, --color-accent, --space-sm, --font-body, etc. */

/* 3. TYPOGRAPHY
   font-family, font-size, line-height, heading hierarchy. Set once here,
   inherit everywhere. No per-section overrides unless truly necessary. */

/* 4. LAYOUT
   Body max-width, centering, section vertical padding. Grid or flex on
   section internals. */

/* 5. HEADER & NAV
   Logo / name lockup, navigation links, sticky behavior if used. */

/* 6. HERO
   Name, title, summary paragraph. */

/* 7. EXPERIENCE
   Role cards or rows — company, title, dates, description. */

/* 8. SKILLS
   Tag list, grouped columns, or icon grid. */

/* 9. EDUCATION
   Degree rows. */

/* 10. CONTACT / FOOTER
    Links, email, social icons. */

/* 11. UTILITIES
    .sr-only (screen-reader only), .visually-hidden — accessibility helpers. */

/* 12. MEDIA QUERIES
    Mobile-first adjustments grouped at the bottom, not scattered inline. */
```

This layer order means: tokens defined before use, global typography before layout,
layout before component details, utilities and overrides last.

### JS — Thin Enhancement Only

`main.js` is optional. It should do exactly two things if it exists:

1. **Smooth scroll** for anchor nav links (CSS `scroll-behavior: smooth` covers most
   cases; JS is only needed for browsers that don't support it or for offset adjustment
   when a sticky header is present).
2. **Active nav highlight** — add an `active` class to the nav link matching the
   section currently in the viewport, using `IntersectionObserver`.

No external JS dependencies. No module bundler. One `<script defer src="main.js">`
tag at the end of `<body>`. If smooth scroll and active nav are not needed, delete the
file entirely — do not add JS for its own sake.

---

## GitHub Pages Deployment Configuration

### Repo Naming

| Goal | Repo name | Served URL |
|------|-----------|-----------|
| Username site (recommended) | `<username>.github.io` | `https://<username>.github.io` |
| Project site | Any other name | `https://<username>.github.io/<reponame>` |

Use `<username>.github.io` as the repo name. It serves from the root path with no
subdirectory prefix, which means all asset paths (`href="style.css"`, `src="main.js"`)
work identically locally and in production with no adjustment.

If a project repo is used instead, all root-relative paths must be prefixed with
`/<reponame>/` or use `<base href="/<reponame>/">` — unnecessary complexity to avoid.

### Branch Configuration

GitHub Pages serves from:
- The `main` branch root (default for user sites — `<username>.github.io` repos), or
- A `gh-pages` branch root, or
- A `/docs` subfolder of any branch.

Recommendation: serve from `main` root. No special branch needed. Configure in
`Settings → Pages → Source` if it is not already set.

### CNAME (Custom Domain)

If using a custom domain (e.g. `bolotbekov.dev`):

1. Create a `CNAME` file in the repo root containing the bare domain:
   ```
   bolotbekov.dev
   ```
2. Set the DNS A records at the domain registrar to point to GitHub's IP addresses
   (185.199.108.153 through 185.199.111.153).
3. Enable "Enforce HTTPS" in Settings → Pages after DNS propagates (can take up to 24h).

Without a custom domain, skip the `CNAME` file entirely. GitHub provides free HTTPS
on `<username>.github.io` automatically.

### No `.nojekyll` Needed

GitHub Pages runs Jekyll processing by default. This is only a problem if file or
directory names start with an underscore (e.g. `_assets/`). Since this repo uses plain
names (`assets/`, `style.css`), Jekyll processing is harmless and no `.nojekyll` file
is needed. Add one only if underscore-prefixed paths are introduced.

### robots.txt (Optional but Recommended)

```
User-agent: *
Allow: /
```

Place in repo root. Signals to search engines the site is fully crawlable.

---

## Suggested Build Order

There is no build in the traditional sense, but the implementation phases follow this
dependency order:

### Phase 1 — Skeleton and Deploy Pipeline

Set up the repo, push an `index.html` with correct document structure (doctype, meta
viewport, meta charset, title, linked stylesheet), an empty `style.css`, and deploy to
GitHub Pages. Verify the live URL works before writing any real content.

**Why first:** Eliminates deployment surprises early. Every subsequent change is
immediately verifiable at the live URL.

**Boundary check:** Does `https://<username>.github.io` load the page? Is HTTPS
working? Are stylesheet and JS references resolving (no 404s in DevTools)?

### Phase 2 — Design Tokens and Typography Base

Establish CSS custom properties and typography rules. No section content yet — just
the foundation that all sections will inherit.

**Why second:** Typography decisions propagate everywhere. Setting them before section
layout prevents constant retroactive adjustments.

**Boundary check:** A test `<h1>`, `<h2>`, `<p>`, and `<a>` in `index.html` render
with the intended font, scale, and color.

### Phase 3 — Layout Shell and Navigation

Add the `<header>` with name and nav links, and the outer layout container (max-width,
centering). Sections can be empty placeholders at this point.

**Why third:** Layout sets the containing context for all sections. Getting width and
centering right before filling in content prevents layout rework.

### Phase 4 — Content Sections (Hero → Experience → Skills → Education → Contact)

Fill each section in document order. This is the bulk of the work. Each section is
independently completable: HTML structure, then CSS for that section, then verify, then
move to the next.

**Why this order:** Hero is above the fold and sets first impression. Experience is the
most complex section (multiple roles, dates, descriptions) and deserves attention while
focus is fresh. Skills and Education are simpler. Contact is last because it is the
shortest and is naturally at the bottom.

### Phase 5 — Polish and Accessibility

- Mobile responsiveness (test at 375px, 768px, 1280px)
- Color contrast (WCAG AA minimum: 4.5:1 for body text)
- Semantic HTML audit (`<main>`, `<nav>`, `aria-label` on sections without headings)
- Meta tags: `og:title`, `og:description`, `og:image` for social sharing previews
- Favicon visible in browser tab
- JS enhancement (smooth scroll, active nav) — add only if missing

### Phase 6 — Custom Domain (Optional)

Add `CNAME`, configure DNS, wait for propagation, enable HTTPS in settings.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: CSS Framework (Bootstrap, Tailwind)
**What:** Adding a utility or component CSS framework to a simple static page.
**Why bad:** Adds a CDN dependency, increases CSS payload by 10-100x, introduces
framework-specific patterns that obscure the underlying structure. For a page with six
sections and no dynamic state, frameworks add weight without value.
**Instead:** Write ~200 lines of targeted CSS. The design is simple enough.

### Anti-Pattern 2: Subdirectory Repo for a Personal Site
**What:** Using a repo named something other than `<username>.github.io`.
**Why bad:** Served from a subpath, breaking root-relative asset references locally.
Requires `<base href>` workarounds or absolute paths, complicating local development.
**Instead:** Name the repo `<username>.github.io` from the start.

### Anti-Pattern 3: Multiple HTML Files for "Sections"
**What:** Splitting the CV into `experience.html`, `skills.html`, etc. with an
`<iframe>` or include mechanism.
**Why bad:** Iframes break scroll behavior and accessibility. There is no server-side
include in static HTML. This is a single-page CV — everything belongs in `index.html`.
**Instead:** One `index.html`, all sections as `<section>` elements.

### Anti-Pattern 4: JS-Rendered Content
**What:** Storing CV content in a JS array or JSON file and rendering it with JS.
**Why bad:** Content is invisible to search engines and screen readers until JS executes.
Adds fragility (JS error = no content). Recruiters use parsers and bots that may not
run JS.
**Instead:** All content hardcoded directly in HTML. Content is static — treat it as
static.

### Anti-Pattern 5: Inline Styles for Layout
**What:** Using `style=""` attributes for colors, spacing, or layout.
**Why bad:** Overrides are impossible without `!important`, design token changes require
hunting through HTML, and the page becomes unmaintainable quickly.
**Instead:** All visual styles in `style.css`, all semantic structure in `index.html`.

---

## Scalability Considerations

This is intentionally a small, bounded artifact. The relevant axis is maintenance over
time, not scale under load.

| Concern | Approach |
|---------|----------|
| Updating content | Edit `index.html` directly — content is co-located with structure |
| Adding a projects section (v2) | Add `<section id="projects">` and corresponding CSS block; no structural rework needed if sections are properly bounded |
| Changing visual style | CSS custom properties in the design tokens layer cascade everywhere; reskin without touching HTML |
| Custom domain | Drop in `CNAME` file and configure DNS — no code changes needed |
| Print stylesheet | Add `@media print {}` block at the bottom of `style.css` — no new file needed |

---

## Sources

- GitHub Pages official documentation (https://docs.github.com/en/pages) — HIGH confidence
- HTML living standard landmark roles (https://html.spec.whatwg.org) — HIGH confidence
- CSS cascade and custom properties (MDN) — HIGH confidence
- Architecture patterns derived from domain knowledge of static site conventions — MEDIUM confidence
