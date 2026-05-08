# Technology Stack

**Project:** CV/Personal Landing Page
**Researched:** 2026-05-09
**Confidence:** HIGH for all decisions — this is a constrained, stable domain; stack is determined almost entirely by the explicit project constraint (plain HTML/CSS/JS, no build step).

---

## Recommended Stack

### Core Layer

| Technology | Version/Approach | Purpose | Why |
|------------|-----------------|---------|-----|
| HTML | HTML5 (semantic) | Document structure | Required by constraint. Use semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`) — they improve accessibility and give screen readers correct context with zero cost. |
| CSS | CSS3 + Custom Properties | All styling and layout | Required by constraint. Native CSS Custom Properties (variables) replace the only legitimate reason to reach for Sass on a project this size. CSS Grid and Flexbox handle all layout needs without a framework. |
| JavaScript | Vanilla ES2022+ (`<script defer>`) | Micro-interactions only | Required by constraint, and appropriate — the page is content, not an app. JS on this project is strictly optional progressive enhancement: smooth scroll, active-section highlighting in a sticky nav, maybe an email copy-to-clipboard. Nothing that would justify a framework. |

### Fonts

| Library | Delivery | Purpose | Why |
|---------|----------|---------|-----|
| Google Fonts — **Inter** (sans-serif) | `<link rel="preconnect">` + `<link>` in `<head>` | Body text, UI labels | Inter is the de facto standard for software-focused professional sites in 2025. Designed for screens, highly legible at small sizes, wide weight range (400–700 is sufficient), free. |
| Google Fonts — **Playfair Display** or system serif | Optional, headings only | Name / hero heading contrast | One serif accent for the name/title hero creates typographic hierarchy without needing a full design system. Skip entirely if the design goes all-sans. |
| System font stack (fallback) | None — CSS only | Fallback if fonts fail to load | Always specify a system stack: `Inter, system-ui, -apple-system, sans-serif`. Ensures the page is readable even if Google Fonts is blocked (corporate networks, China). |

### Icons

| Library | Version | Delivery | Purpose | Why |
|---------|---------|----------|---------|-----|
| **Lucide Icons** or **Heroicons** (SVG sprite or inline) | Latest stable | Self-hosted SVG file | GitHub/LinkedIn/email icons, section markers | Inline SVG or a single SVG sprite file has zero network requests beyond the sprite. No JS runtime. Scales at any resolution. Avoid Font Awesome — icon fonts are an anti-pattern (render blocking, accessibility issues) and the free tier requires a kit.js CDN call. |

### No CSS Framework

| Decision | Rationale |
|----------|-----------|
| No Tailwind, Bootstrap, Bulma, or any CSS framework | This is a single page with ~6 sections. A framework adds 10–200 kB for utility classes that will never be used on a static page this small. CSS Custom Properties + Grid + Flexbox cover 100% of layout needs. Writing raw CSS also means the developer controls every pixel — important when credibility of execution is the product. |

### Deployment

| Technology | Approach | Why |
|------------|----------|-----|
| GitHub Pages | `main` branch root (`/`) or `/docs` folder as source | Zero cost, automatic HTTPS via Let's Encrypt, CDN-backed, integrates with GitHub repo — no separate hosting account needed. The `main`-branch-root approach is the simplest: the repo root IS the site root. |
| Custom domain (optional) | `CNAME` file in repo root + DNS A records to GitHub IPs | GitHub Pages provides a `username.github.io` URL free. A custom domain (e.g. `firstname.dev`) adds credibility. Requires a `CNAME` file with the domain and four A-record entries in the DNS provider pointing to GitHub's IPs (185.199.108–111.153). HTTPS is automatic once DNS propagates. |
| No CI/CD pipeline | Push to `main` triggers GitHub Pages rebuild automatically | No Actions workflow needed. GitHub Pages detects the branch update and redeploys within ~30 seconds. A GitHub Actions workflow is only needed if a build step exists — this project explicitly has none. |

### Meta / SEO

| Concern | Approach | Why |
|---------|----------|-----|
| Open Graph tags | `<meta property="og:*">` in `<head>` | When the URL is shared on LinkedIn or Slack, the preview card uses OG tags. A photo, name, and title in the card drives click-through. Takes 5 minutes to add, disproportionate value. |
| Structured data (JSON-LD) | `<script type="application/ld+json">` with `Person` schema | Google can parse and display rich results (name, job title, social links) in search. Relevant since recruiters will search the engineer's name. |
| `robots.txt` + `sitemap.xml` | Minimal files in repo root | GitHub Pages serves them automatically. Signals to crawlers the page should be indexed. |

---

## What NOT to Use

| Category | Avoid | Why |
|----------|-------|-----|
| Static site generators | Jekyll, Hugo, Eleventy, Astro | All require a build step. Eleventy/Astro in particular are excellent choices for content sites — but the project explicitly rules out a build pipeline. Jekyll is GitHub Pages' native generator but adds Ruby dependency, frontmatter, liquid templates: overhead for one page of hardcoded content. |
| CSS frameworks | Bootstrap, Tailwind, Bulma, Foundation | Zero-build Tailwind CDN (CDN play mode) exists but generates all utilities at runtime via browser JS — poor performance and bad practice for production. Bootstrap adds ~30 kB CSS with a specificity war against custom styles. Neither is justified for 6 sections. |
| JavaScript frameworks | React, Vue, Svelte, Angular | A CV page has no dynamic state. These frameworks solve a problem that does not exist here and require a build step. Even lightweight alternatives (Alpine.js, Petite-Vue) are unnecessary — native JS event listeners handle the 2–3 interactions this page needs. |
| Icon fonts | Font Awesome, Material Icons font | Icon fonts are render-blocking, require a network request, have poor accessibility (empty alt text by default), and are heavier than SVG. Use inline SVG or an SVG sprite instead. |
| CSS preprocessors | Sass, Less, PostCSS | On a single page, nesting (native in CSS since 2023) and Custom Properties replace all Sass features. PostCSS requires a build step. |
| npm / package.json | Any package manager | Nothing to install. Introducing a `package.json` creates the expectation of a build step and `node_modules` in the repo. Keep the repo root clean: `index.html`, `style.css`, `script.js`, `assets/`. |
| Analytics with heavy SDKs | Google Analytics (gtag.js full) | If analytics are desired, use the lightweight `gtag.js` snippet (7 kB) or Plausible's 1 kB script. Full GA4 with GTM is overkill and slows LCP on a personal site. |

---

## File/Folder Structure

```
/                         ← repo root = site root
├── index.html            ← single page, all content
├── style.css             ← all CSS, organized by section
├── script.js             ← optional, progressive enhancement only
├── assets/
│   ├── icons.svg         ← SVG sprite (social icons, section icons)
│   ├── avatar.jpg        ← profile photo (WebP preferred, JPEG fallback)
│   └── og-image.png      ← 1200×630 Open Graph preview image
├── CNAME                 ← custom domain (optional)
├── robots.txt
└── sitemap.xml
```

This structure deploys directly from `main` branch root with no configuration.

---

## GitHub Pages Deployment Specifics

**Confidence: HIGH** (stable, well-documented platform behavior)

1. **Enable:** Repo Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / folder: `/ (root)`.
2. **Initial deploy time:** 1–3 minutes after first push. Subsequent deploys ~30 seconds.
3. **URL:** `https://username.github.io` (for a repo named `username.github.io`) or `https://username.github.io/repo-name` for other repo names. For a CV site, the repo should be named `username.github.io` to get the apex URL.
4. **HTTPS:** Enforced automatically. The "Enforce HTTPS" checkbox should be checked in Pages settings.
5. **Custom domain HTTPS:** GitHub provisions a Let's Encrypt certificate automatically after DNS verification. Takes up to 24 hours for initial cert; thereafter auto-renews.
6. **404 handling:** GitHub Pages serves a built-in 404 page for missing paths. A custom `404.html` in the repo root overrides it — not strictly needed for a single-page site.
7. **Cache headers:** GitHub Pages does not allow custom cache headers. All assets are served with a short cache TTL. This is acceptable — performance budget for a static HTML/CSS page is trivially met without cache tuning.
8. **Bandwidth limit:** 100 GB/month soft limit (GitHub guideline). A CV page with compressed assets will be well under 1 MB total; this limit is not a practical constraint.
9. **File size limit:** 100 MB per file, 1 GB total repo soft limit. Not relevant.

---

## Performance Targets (achievable with this stack)

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 1.5s | No render-blocking JS; fonts loaded with `font-display: swap`; hero image WebP + `loading="eager"` |
| CLS | < 0.05 | Reserve space for fonts with `font-display: swap` + explicit image dimensions |
| INP | < 100ms | Minimal JS, no framework overhead |
| Total page weight | < 200 kB (uncompressed) | No framework CSS/JS; SVG icons; compressed images |

All four are achievable without any build tooling.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Hosting | GitHub Pages | Netlify, Vercel, Cloudflare Pages | All are excellent — but introduce a separate account/service. GitHub Pages keeps everything in one place (code + hosting) with zero config. For a CV site, simplicity wins. |
| Fonts | Google Fonts (Inter) | Self-hosted variable font | Self-hosting avoids a Google DNS lookup and GDPR concerns. Worth considering if privacy is a priority. The tradeoff: manual font file management vs. a single `<link>` tag. Google Fonts is fine for a personal site. |
| Icons | SVG sprite | Phosphor Icons, Feather Icons | All SVG icon sets are equivalent. Lucide/Heroicons chosen for MIT license, active maintenance, and clean minimal style matching a professional CV aesthetic. |
| Analytics | None (default) | Plausible 1 kB script | If curious about visitor counts, Plausible is the only analytics tool worth adding — minimal weight, privacy-respecting, no cookie consent banner required. Entirely optional. |

---

## Sources

- GitHub Pages documentation (stable, authoritative): https://docs.github.com/en/pages
- CSS Nesting (native, no build step required): Baseline 2023, supported in all major browsers as of 2024
- Inter font: https://rsms.me/inter/ — Rasmus Andersson, open source
- Lucide Icons: https://lucide.dev — MIT license, active fork of Feather Icons
- Core Web Vitals thresholds: https://web.dev/vitals/ (Google, 2024)
- SVG sprite technique: https://css-tricks.com/svg-sprites-use-better-icon-fonts/
- Confidence: HIGH for all items — stack is constrained by project requirements; decisions in unconstrained areas (fonts, icons) reflect stable 2025 community consensus.
