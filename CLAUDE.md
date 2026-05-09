<!-- GSD:project-start source:PROJECT.md -->
## Project

**CV Landing Page**

A personal CV landing page for a software engineer, hosted on GitHub Pages. Built with plain HTML/CSS/JS — no build step. Targets both recruiters and hiring managers who need to quickly assess experience and depth.

**Core Value:** Credibility on first read — a visitor should immediately trust the engineer's depth of experience and judgment.

### Constraints

- **Tech stack**: HTML/CSS/JS only — no frameworks, no build pipeline
- **Hosting**: GitHub Pages — static only, no server-side logic
- **Scope**: Single page — all content on one scrollable page
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
## File/Folder Structure
## GitHub Pages Deployment Specifics
## Performance Targets (achievable with this stack)
| Metric | Target | How |
|--------|--------|-----|
| LCP | < 1.5s | No render-blocking JS; fonts loaded with `font-display: swap`; hero image WebP + `loading="eager"` |
| CLS | < 0.05 | Reserve space for fonts with `font-display: swap` + explicit image dimensions |
| INP | < 100ms | Minimal JS, no framework overhead |
| Total page weight | < 200 kB (uncompressed) | No framework CSS/JS; SVG icons; compressed images |
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Hosting | GitHub Pages | Netlify, Vercel, Cloudflare Pages | All are excellent — but introduce a separate account/service. GitHub Pages keeps everything in one place (code + hosting) with zero config. For a CV site, simplicity wins. |
| Fonts | Google Fonts (Inter) | Self-hosted variable font | Self-hosting avoids a Google DNS lookup and GDPR concerns. Worth considering if privacy is a priority. The tradeoff: manual font file management vs. a single `<link>` tag. Google Fonts is fine for a personal site. |
| Icons | SVG sprite | Phosphor Icons, Feather Icons | All SVG icon sets are equivalent. Lucide/Heroicons chosen for MIT license, active maintenance, and clean minimal style matching a professional CV aesthetic. |
| Analytics | None (default) | Plausible 1 kB script | If curious about visitor counts, Plausible is the only analytics tool worth adding — minimal weight, privacy-respecting, no cookie consent banner required. Entirely optional. |
## Sources
- GitHub Pages documentation (stable, authoritative): https://docs.github.com/en/pages
- CSS Nesting (native, no build step required): Baseline 2023, supported in all major browsers as of 2024
- Inter font: https://rsms.me/inter/ — Rasmus Andersson, open source
- Lucide Icons: https://lucide.dev — MIT license, active fork of Feather Icons
- Core Web Vitals thresholds: https://web.dev/vitals/ (Google, 2024)
- SVG sprite technique: https://css-tricks.com/svg-sprites-use-better-icon-fonts/
- Confidence: HIGH for all items — stack is constrained by project requirements; decisions in unconstrained areas (fonts, icons) reflect stable 2025 community consensus.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
