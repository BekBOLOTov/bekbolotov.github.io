# Research Summary — CV Landing Page

## Executive Summary

This is a static, single-page CV site for a software engineer. The explicit project constraint — no build step, plain HTML/CSS/JS, GitHub Pages — is not a limitation to work around; it is the correct approach for the domain. The stack is almost entirely predetermined: semantic HTML5, CSS3 with Custom Properties, optional vanilla JS for micro-interactions, Inter for body text, SVG sprites for icons, GitHub Pages served from `main` branch root. No npm, no frameworks, no preprocessors.

The credibility of the page is determined almost entirely by how content is framed, not by the design. Impact-framed role descriptions (PAR: Problem, Action, Result), proficiency-grouped skills, and a specific hero summary are the highest-leverage elements. Design serves content; any animation or visual complexity that competes with reading is an anti-pattern for a recruiter and hiring manager audience.

The primary risks are content-quality risks, not technical ones. Three pitfalls — generic role descriptions, skill keyword dumps, and a forgettable hero summary — can undermine the entire purpose of the site regardless of code quality, and none of them can be fixed with design changes.

---

## Key Findings

**Stack:** HTML5 + CSS3 Custom Properties + vanilla JS. Inter (Google Fonts) for body text. Lucide/Heroicons SVG sprite for icons. GitHub Pages from `<username>.github.io` repo root. No framework justified for 6 sections and no dynamic state.

**Features:**
- Must have: name/title, specific hero summary, reverse-chronological experience with quantified impact bullets, skills grouped by proficiency, education, contact/links block, mobile-responsive layout, semantic HTML, sub-2s load time
- Should have: PAR-framed impact descriptions, print/PDF stylesheet, Open Graph tags, favicon, tuned `<title>`/`<meta description>`, visible contact CTA above fold
- Defer: projects section (v2), blog, dark mode toggle, anchor nav strip

**Architecture:** Single-file-first. `index.html` owns all content; `style.css` organized in 12 strict layers (reset → tokens → typography → layout → sections → utilities → media queries); `main.js` optional and handles only smooth scroll and active nav via `IntersectionObserver`. No `src/`, `dist/`, or `public/` directories. Each section is a self-contained landmark element.

**Top pitfalls:**
1. Task-list role descriptions instead of outcome/impact framing — unfixable by design changes alone
2. Generic hero summary that could describe 1,000 other engineers — must contain domain, scale, or specialization signal
3. Flat skills dump of 30+ technologies at equal weight — group by honest proficiency tier
4. GitHub Pages misconfiguration — case-sensitive filenames, wrong branch source, HTTPS propagation delay
5. Desktop-only testing — test on actual phone before each phase sign-off

---

## Roadmap Implications

**Suggested phase structure:**

1. **Content Authoring** — Write all copy before touching HTML; PAR-framed bullets, proficiency-grouped skills, specific hero summary. Content pitfalls cannot be fixed in later phases.
2. **Project Setup and Deploy Pipeline** — Repo named `<username>.github.io`, minimal `index.html` live on GitHub Pages with HTTPS verified. Find deployment surprises early.
3. **Design Tokens and Typography Foundation** — CSS Custom Properties and type scale defined before any section CSS.
4. **HTML Structure and Layout Shell** — Landmark elements with IDs, outer layout container, section placeholders.
5. **Section Content (Hero through Contact)** — Fill sections in document order with content from Phase 1.
6. **Mobile Responsiveness and Accessibility** — Single-column reflow at 375px, 44×44 px tap targets, WCAG AA contrast, Lighthouse 90+ gate.
7. **Polish — SEO, Print, and Meta** — `@media print`, Open Graph tags, `<title>`/`<meta description>`, favicon, `robots.txt`.
8. **Custom Domain (Optional)** — `CNAME` file committed, DNS A records configured, HTTPS enforced.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Constrained by project requirements; stable 2025 consensus |
| Features | MEDIUM-HIGH | Table stakes and anti-features HIGH; differentiator ranking MEDIUM |
| Architecture | HIGH | Static site patterns stable; GitHub Pages config authoritative |
| Pitfalls | HIGH | Deployment from official docs; content pitfalls specification-backed |

**Overall: HIGH**

**Gaps:**
- No real-time competitor portfolio analysis — review 3–5 examples before finalizing visual design
- Skills proficiency tier labels are a recommendation; engineer decides final groupings
