# Domain Pitfalls: CV / Personal Site

**Domain:** Software engineer CV landing page (plain HTML/CSS/JS, GitHub Pages)
**Researched:** 2026-05-09
**Confidence:** HIGH — these are well-documented, repeatedly observed failure patterns

---

## Critical Pitfalls

Mistakes that undermine the core value (credibility) or require a full rewrite.

---

### Pitfall 1: Writing for the engineer, not the audience

**What goes wrong:** The page reads as a personal archive rather than a hiring signal. Descriptions focus on tasks performed ("worked on backend API") rather than outcomes and scope ("designed and owned the payments API serving 50k req/day"). Recruiters who spend 10–20 seconds scanning see nothing sticky. Hiring managers who read deeper find no evidence of judgment or impact.

**Why it happens:** Engineers default to listing what they did — it feels honest and modest. Impact framing requires deliberate effort and feels like bragging.

**Consequences:** Recruiters skip to the next candidate. Hiring managers can't tell seniority or scope from description alone. The core value (credibility on first read) fails immediately.

**Prevention:**
- Each role description must answer: what was the scale, what was your ownership scope, what changed because you were there
- Use the PAR format internally: Problem → Action → Result
- Treat every bullet as a signal, not a log entry

**Warning signs:**
- Bullet points start with "Worked on", "Helped with", "Participated in"
- No numbers, percentages, team sizes, or scale indicators anywhere
- Descriptions are the same length and shape regardless of seniority of role

**Phase:** Content authoring phase. Cannot be fixed by design or code changes later.

---

### Pitfall 2: Skills section as a keyword dump

**What goes wrong:** A flat list of 30+ technologies ("React, Vue, Angular, Django, Rails, Kubernetes, Terraform, ...") signals nothing. It looks like the engineer copied the job description. Hiring managers distrust it; recruiters cannot distinguish real depth from familiarity.

**Why it happens:** Engineers want to pass ATS filters and not exclude themselves from any job posting.

**Consequences:** The skills section actively damages credibility. A hiring manager who sees "expert in everything" trusts nothing else on the page.

**Prevention:**
- Group technologies by honest proficiency: primary stack vs. used in production vs. familiar with
- Limit primary stack to technologies you'd confidently be interviewed on today
- If you can't write a meaningful line of code in it without documentation, it's not a primary skill

**Warning signs:**
- More than 20 technologies listed at the same visual weight
- Technologies listed that haven't appeared in any role description
- Competing frameworks listed as equal (React AND Vue AND Angular as primaries)

**Phase:** Content authoring. Skills grouping and hierarchy is a content decision, not a design one.

---

### Pitfall 3: Hero section fails the 5-second test

**What goes wrong:** Name, title, and summary are present but don't communicate anything specific. "Experienced software engineer passionate about building great products" could apply to anyone. The first fold (what's visible without scrolling) is wasted.

**Why it happens:** Generic summaries feel safe. Specific claims feel risky. Engineers avoid specificity to avoid being ruled out.

**Consequences:** Visitors who bounce quickly (recruiters on mobile, hiring managers between meetings) leave with nothing memorable. First impression is forgettable rather than credible.

**Prevention:**
- The professional summary must contain at least one specific differentiator: domain, scale, stack, or type of work
- "Senior backend engineer with 7 years building distributed systems at fintech scale" is 10x more effective than a generic tagline
- Read it aloud: could this describe 1000 other engineers? If yes, rewrite it

**Warning signs:**
- Summary contains the word "passionate" without a concrete object
- No domain, scale, or specialization signal in the first 20 words
- Title is just "Software Engineer" with no qualifier

**Phase:** Content authoring, but the hero layout must leave space for a real summary (not just a one-liner). Layout phase should plan for 2–3 sentences.

---

### Pitfall 4: Design overwhelms content

**What goes wrong:** Elaborate animations, parallax scrolling, gradient meshes, or custom cursor effects draw attention to themselves rather than to the content. The page looks like a portfolio demo, not a professional document. Hiring managers are annoyed, not impressed.

**Why it happens:** CV sites are often used as a vehicle to show off CSS skills. This is correct for visual/frontend roles but wrong for backend or full-stack engineers targeting senior positions.

**Consequences:** Page feels junior or try-hard. Slow render due to JS-heavy effects damages first impression on mobile or slow connections. Accessibility breaks.

**Prevention:**
- Constraint: no animations beyond subtle transitions (link hover, section fade-in on scroll at most)
- Typography-first means the font choice and spacing ARE the design — don't fight them with decoration
- Test with a 30-second timer: if a recruiter can't identify your top skill and your most recent employer in 30 seconds, the design is getting in the way

**Warning signs:**
- Any element that moves when the user hasn't interacted with it
- CSS files larger than the HTML content
- Page requires JavaScript to be readable at all

**Phase:** Design/layout phase. Establish the constraint explicitly: design serves the content.

---

### Pitfall 5: Mobile rendering breaks the professional impression

**What goes wrong:** The page is designed and tested at 1440px. On mobile (where recruiters frequently do initial screening), text overflows, sections stack badly, font sizes are too small or too large, and the contact links are hard to tap.

**Why it happens:** Engineers test in their browser at their desk. Mobile testing requires deliberate extra steps.

**Consequences:** A large fraction of initial visits happen on mobile. A broken mobile layout signals "this engineer doesn't care about output quality" — the opposite of the credibility goal.

**Prevention:**
- Mobile-first CSS: start with a single-column layout and add complexity for wider viewports via `min-width` media queries
- Test on an actual phone (not just DevTools emulation) before considering any phase complete
- Minimum tap target: 44x44px for all links and contact buttons

**Warning signs:**
- CSS uses fixed pixel widths on layout containers (e.g., `width: 900px`)
- No `<meta name="viewport" content="width=device-width, initial-scale=1">` in `<head>`
- Media queries use `max-width` only (desktop-first) — harder to maintain

**Phase:** Layout/CSS phase. The viewport meta tag is a deploy-time gate; mobile layout must be validated before any phase is considered done.

---

### Pitfall 6: GitHub Pages deployment confusion and broken deploys

**What goes wrong:** Several subtle GitHub Pages behaviors catch engineers off guard:

1. **Branch confusion:** GitHub Pages serves from either `main`, a `gh-pages` branch, or a `/docs` folder. If the setting is wrong or the branch is missing, the site 404s silently.
2. **Case-sensitive paths:** GitHub Pages runs on Linux. `styles.CSS` is not the same as `styles.css`. Works locally on macOS (case-insensitive), breaks in production.
3. **Custom domain + CNAME file:** Adding a custom domain via GitHub UI creates a `CNAME` file. Pushing without it (e.g., after a force push or repo recreation) silently removes the custom domain.
4. **HTTPS enforcement delay:** After enabling "Enforce HTTPS", there is a propagation delay. Sharing the link too early serves HTTP and browsers show a security warning, damaging first impressions.
5. **Root `index.html` required:** GitHub Pages will not serve `home.html` or `cv.html` as the root. The entry point must be named `index.html` at the repo root (or `/docs/` root if using that setting).

**Why it happens:** Local development on macOS masks most of these. The GitHub UI gives little feedback when configuration is wrong.

**Consequences:** Site is live in GitHub settings but returns 404 or shows wrong content. HTTPS warnings scare recruiters. Custom domain breaks after a routine push.

**Prevention:**
- Set Pages source in repo settings before writing any code; verify the live URL loads before continuing
- Lowercase all filenames and all `href`/`src` references; enforce this as a code review rule
- Keep `CNAME` file in source control, committed alongside `index.html`
- Wait for the green lock icon in GitHub settings before sharing any link
- Name the entry file `index.html`, never anything else

**Warning signs:**
- 404 on the `github.io` URL despite a recent push
- Site loads locally but assets (CSS, fonts) 404 in production
- GitHub settings page shows "Your site is ready to be published" but no live URL

**Phase:** Deploy phase (first deploy). Validate the full URL, HTTPS status, and all asset loads before declaring phase complete.

---

## Moderate Pitfalls

### Pitfall 7: No canonical URL / SEO basics missing

**What goes wrong:** The page is technically live but invisible to search engines. Missing `<title>`, missing `<meta name="description">`, no `lang` attribute on `<html>`, no Open Graph tags. Google indexes it weakly or not at all. When someone Googles the engineer's name, the site may not appear.

**Prevention:**
- `<title>` must contain full name and professional title: "Bolotbek Bolotov — Senior Software Engineer"
- `<meta name="description">` should be 120–160 characters summarizing the engineer's specialty
- `<html lang="en">` is required
- Add minimal Open Graph tags (`og:title`, `og:description`, `og:url`) so LinkedIn shares render correctly — this matters when the engineer shares the link themselves
- Submit the URL to Google Search Console after deploy

**Warning signs:**
- Browser tab says "Untitled" or "index"
- Sharing the URL on LinkedIn produces no preview card
- `view-source:` shows no `<meta name="description">`

**Phase:** Final polish / deploy phase. These are 15 minutes of work and should not be deferred.

---

### Pitfall 8: Contact section makes reaching out hard

**What goes wrong:** Email is displayed as plain text only (not a `mailto:` link), or it's an image to avoid scraping. GitHub and LinkedIn links open in the same tab, losing the page context. On mobile, the email isn't tappable.

**Prevention:**
- Use `<a href="mailto:you@example.com">` for email — always clickable, even on mobile
- Open external links (GitHub, LinkedIn) in a new tab: `target="_blank" rel="noopener noreferrer"`
- If concerned about email scraping, use a simple obfuscation approach (CSS direction reversal or JS render) — but don't use an image, which breaks accessibility and mobile tapping

**Warning signs:**
- Email is displayed as static text with no link
- Clicking GitHub link navigates away from the CV page with no back
- No visible contact section "above" the point where most visitors stop scrolling

**Phase:** Content/layout phase. Contact links must be validated as functional (not just visible) before any phase sign-off.

---

### Pitfall 9: Hardcoded content is scattered and unmaintainable

**What goes wrong:** Because there is no CMS or build pipeline, content lives directly in HTML. When the engineer changes jobs or updates a skill, they must find and edit raw HTML in multiple places. If they're not careful with HTML structure, they break the layout while updating content.

**Why it happens:** Hardcoded HTML is the simplest starting point and correct for this project's constraints, but requires deliberate structure to remain maintainable.

**Prevention:**
- Use clear HTML comments to delimit content sections: `<!-- EXPERIENCE: Employer Name -->`
- Keep one "content" decision per section — do not split a role's description across multiple nested divs that obscure meaning
- Structure HTML so that adding a new job = copying a clearly defined block; no custom CSS required per entry

**Warning signs:**
- Role descriptions are formatted with inline styles
- Each section uses a different HTML structure for the same type of content
- Updating one section requires editing five separate HTML tags

**Phase:** Layout/structure phase. The HTML structure must be designed for content updates, not just for initial render.

---

## Minor Pitfalls

### Pitfall 10: Font loading causes layout shift or FOUT

**What goes wrong:** Google Fonts loaded via `<link>` in `<head>` can cause Flash of Unstyled Text (FOUT) or cumulative layout shift on slow connections. For a typography-first design, this is particularly damaging — the first impression is broken text.

**Prevention:**
- Use `font-display: swap` in any `@font-face` declaration
- Preconnect to Google Fonts origin: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Consider self-hosting font files (woff2 only) — eliminates third-party dependency and is straightforward for 1–2 font families
- Have a solid system font fallback stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` so the fallback looks acceptable, not jarring

**Warning signs:**
- Text jumps or reflowing visible on first load
- Lighthouse flags "Eliminate render-blocking resources" pointing to font stylesheet
- Page looks different on first load vs. subsequent (cached font) loads

**Phase:** Design/CSS phase.

---

### Pitfall 11: No print stylesheet means the PDF version is unusable

**What goes wrong:** Recruiters and hiring managers frequently print or "Save as PDF" from the browser for ATS upload or internal sharing. Without a print stylesheet, the result includes navigation chrome, background colors that waste ink, broken page breaks mid-role, and font sizes that don't translate to paper.

**Prevention:**
- Add `@media print` rules: hide non-essential elements, force black text on white, set font sizes in `pt`, control page breaks with `page-break-inside: avoid` on role blocks
- Test: Chrome → Print → Save as PDF → verify it looks like an actual CV

**Warning signs:**
- Printing produces multi-page output where page breaks fall in the middle of a job description
- Background colors appear on the printed version making it ink-heavy
- Navigation or hero imagery clutters the first printed page

**Phase:** Polish phase. Low effort, high value for recruiter workflows.

---

### Pitfall 12: Accessibility failures undermine the professional impression

**What goes wrong:** Missing `alt` attributes on any images, insufficient color contrast on body text, and non-semantic HTML (`<div>` instead of `<section>`, `<h1>` through `<h3>` used out of order) make the page fail basic accessibility audits. This matters because some hiring managers run Lighthouse as a quick quality signal, and a failing score is a credibility problem for an engineer.

**Prevention:**
- Run Lighthouse Accessibility audit before any phase sign-off; target 90+
- Color contrast: body text must meet WCAG AA (4.5:1 ratio minimum); check with a contrast checker
- Use semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` if links exist
- Heading hierarchy: one `<h1>` (name), `<h2>` per section, `<h3>` for sub-items within a section

**Warning signs:**
- Lighthouse Accessibility score below 90
- Body text is gray-on-white below 4.5:1 contrast ratio (common with trendy light gray text)
- Images present with no `alt` attribute

**Phase:** CSS/layout phase. Semantic HTML is a structural decision; fix it at structure time, not at polish time.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Content authoring | Generic summary, task-list bullets, skill dump | Apply PAR framing and proficiency grouping before writing any HTML |
| HTML structure | Unmaintainable layout, non-semantic elements | Design for content updates; use semantic sectioning elements |
| CSS / design | Animation creep, desktop-only testing, FOUT | Mobile-first; typography constraint enforced at design start |
| First deploy | GitHub Pages misconfiguration, case-sensitive paths, HTTPS delay | Checklist: source branch, root index.html, lowercase filenames, CNAME in repo |
| Polish | Missing SEO meta, no print stylesheet, accessibility failures | Lighthouse audit gate; 15-minute SEO pass required before marking complete |

---

## Sources

- Confidence: HIGH for GitHub Pages deployment behaviors (well-documented in official GitHub Pages docs and widely observed)
- Confidence: HIGH for content pitfalls (well-established in recruiting and engineering hiring communities; consistent across multiple sources)
- Confidence: HIGH for accessibility and SEO basics (WCAG, Google Search documentation, Lighthouse)
- WebSearch unavailable during this research session; findings are based on verified training knowledge of well-established patterns
