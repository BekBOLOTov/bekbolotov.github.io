# Feature Landscape

**Domain:** Software engineer CV / personal landing page
**Researched:** 2026-05-09
**Confidence:** MEDIUM — Based on synthesis of well-established UX conventions,
recruiter workflow knowledge, and common patterns across engineer portfolios.
WebSearch was unavailable; no real-time trend verification was possible.

---

## Table Stakes

Features recruiters and hiring managers expect. Missing any one of these
causes immediate trust loss or abandonment.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full name and current title | First thing recruiters look for; sets identity in 1 second | Low | "Software Engineer" or specific specialization |
| Professional summary / tagline | Answers "who is this and why should I read on" before the fold | Low | 2–4 sentences max; should name seniority and domain |
| Work experience with dates | ATS-trained recruiters scan for role + company + tenure in under 10 s | Medium | Ordered reverse-chronological; include company name, role title, date range |
| Role descriptions with impact | Hiring managers skip bullet-free entries; they need signal on scope and judgment | Medium | Quantified results > responsibilities; 2–4 bullets per role |
| Skills / tech stack list | Allows keyword matching against job description; expected at a glance | Low | Group by category (Languages, Frameworks, Infra, etc.) |
| Education section | Required by many ATS filters; recruiters verify degree + graduation year | Low | Institution, degree, year; certifications optional here |
| Contact / links block | Recruiter must be able to reach you; GitHub is expected for SWEs | Low | Email, GitHub, LinkedIn at minimum |
| Mobile-responsive layout | 30–50% of recruiter visits happen on mobile; broken layout = distrust | Medium | Single-column reflow; tap-target sizes; no horizontal scroll |
| Readable typography at a glance | CV pages are scanned, not read; legibility drives credibility | Low | High contrast, minimum 16 px body, short line length |
| Page load under 2 s | Slow load on a static page signals poor craft; pure HTML/CSS should be instant | Low | Critical for plain-HTML stack — no excuse to be slow |
| Semantic HTML structure | Screen readers, browser reader modes, and ATS scrapers all depend on it | Low | `<main>`, `<section>`, `<h1>`–`<h3>` hierarchy matters |

---

## Differentiators

Features not universally expected, but which signal craft and judgment when
present. These are the features that push a "good" portfolio to "memorable."

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Role impact framed as outcomes, not tasks | "Reduced p95 latency 40%" reads as senior; "wrote backend services" reads as junior | Low (content) | No code change — just disciplined copywriting |
| Tenure and growth narrative | Shows progression within companies (promo, scope expansion), not just job hops | Low (content) | List role changes within same company as separate entries |
| Subtle visual hierarchy that reflects seniority | Bold company names, muted dates, de-emphasized edu if experience is senior | Medium (CSS) | Recruiters spend 7 s on first pass; hierarchy guides their eye |
| Anchor / jump links with smooth scroll | On a long single page, section anchors let power users navigate; also enables sharable deep links (e.g. `#experience`) | Low | One `<a href="#section-id">` nav strip; CSS `scroll-behavior: smooth` |
| Printable / PDF-friendly layout | Recruiters frequently print or export to PDF to share internally | Medium | Needs a `@media print` stylesheet; hide nav, adjust colors, page-break rules |
| Open Graph meta tags | When the URL is shared on LinkedIn/Slack, a rich preview with name + title looks professional vs a bare URL | Low | `og:title`, `og:description`, `og:image`; 30-min task |
| Favicon with initials or avatar | Tiny signal — missing favicon in browser tab looks unfinished for an engineer | Low | 32×32 SVG with initials is sufficient |
| `<title>` and `<meta description>` tuned for name search | If a recruiter Googles your name, the result should look clean | Low | `<title>Bolotbek Bolotov – Software Engineer</title>` |
| Skills grouped by domain, not alphabetically | Grouped skills (Languages / Infra / Tools) show systems thinking; flat alphabetical lists hide breadth | Low | CSS grid layout; no JS needed |
| Visible contact CTA above the fold | Hiring managers who want to act immediately shouldn't have to scroll; a mailto link near the hero closes the loop fast | Low | Single `<a href="mailto:...">` near name |

---

## Anti-Features

Features to deliberately not build for this project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Animated hero / typing effect / particle background | Adds JS weight, screams template, distracts from content — the opposite of "depth and judgment" | Static text with strong typography; let the content land |
| Dark mode toggle | Adds JS + CSS complexity; breaks print styles; the explicit out-of-scope decision is correct | Ship light mode only; OS-level dark mode via `prefers-color-scheme` is optional low-effort alternative |
| Contact form | Requires backend or third-party service (Formspree, etc.); static constraint makes it a mailto link anyway; forms on CVs look odd | `mailto:` link is the right call |
| Skills progress bars / percentage ratings | "90% Python" is meaningless and signals naivety; hiring managers actively distrust them | Plain skill list grouped by category |
| Visitor analytics / tracking pixel | Privacy concern, GDPR complexity, static constraint makes server-side analytics impossible | If needed later, add a minimal privacy-respecting script (Plausible) — not in v1 |
| Projects carousel / portfolio gallery | Deferred to v2 per PROJECT.md; adding in v1 risks half-baked implementation that undercuts credibility | Keep v1 focused on experience and credibility |
| Blog / writing section | Content debt risk — a blog with 1 post is worse than no blog | Defer; link to external Medium/Substack if writing already exists |
| Testimonials / endorsements | Common on marketing sites; feels out of place on a technical CV; recruiters don't trust them | LinkedIn recommendations serve this purpose via profile link |
| Social proof counters (GitHub stars, followers) | Gamified metrics are gamed; hiring managers care about contribution quality, not vanity numbers | Link to GitHub and let the work speak |
| Cookie consent banner | No cookies, no tracking, no banner needed — plain static HTML has no consent surface | Keep it out entirely |

---

## Feature Dependencies

```
Contact CTA above fold  →  requires  Hero section
Anchor/jump links       →  requires  Section IDs on each section
Print stylesheet        →  requires  Core layout finalized first (builds on top of base CSS)
Open Graph tags         →  requires  Professional headshot or fallback og:image
Favicon                 →  independent (can ship anytime)
Skills grouping         →  requires  Skills list content defined
Role impact framing     →  independent (content decision, no code dependency)
Semantic HTML           →  must be first (everything else builds on it)
```

---

## MVP Recommendation

Given the constraint (plain HTML/CSS/JS, single page, credibility-first):

**Build in v1:**
1. Semantic HTML structure with proper heading hierarchy (unlocks everything)
2. Hero with name, title, summary, and mailto CTA
3. Work experience in reverse-chronological order with impact-framed bullets
4. Skills grouped by domain category
5. Education section
6. Contact / links block (email, GitHub, LinkedIn)
7. Mobile-responsive layout (single-column reflow)
8. `@media print` stylesheet (low effort, high value for recruiter workflow)
9. Open Graph + `<title>` + `<meta description>` (30-min task, outsized sharing value)
10. Favicon with initials

**Defer from v1:**
- Anchor nav strip: useful but not critical for a page this length; add in v1.1 if content grows
- Projects section: explicitly deferred to v2 per PROJECT.md

---

## Confidence Notes

- Table stakes list reflects well-established recruiter workflow knowledge and
  widely consistent advice across hiring/recruiting communities. Confidence: HIGH.
- Differentiator list reflects observed patterns across strong engineer portfolios
  and UX principles applied to the scan-first reading context. Confidence: MEDIUM.
- Anti-features reflect explicit project constraints plus known patterns where
  engineers over-engineer CV sites to their detriment. Confidence: HIGH.
- No real-time competitor analysis was performed (WebSearch unavailable).
  Recommend a manual review of 3–5 well-regarded engineer portfolio examples
  before finalizing visual design decisions.

## Sources

- PROJECT.md constraints (direct): plain HTML/CSS/JS, GitHub Pages, single page,
  recruiter + hiring manager dual audience
- Nielsen Norman Group recruiter eye-tracking studies (training knowledge):
  7-second first scan, top-left name fixation, reverse-chronological experience
- General knowledge: ATS keyword matching behavior, Open Graph spec,
  `@media print` CSS patterns, semantic HTML accessibility requirements
