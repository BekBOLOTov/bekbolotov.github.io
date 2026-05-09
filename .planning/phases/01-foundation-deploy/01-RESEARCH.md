# Phase 1: Foundation & Deploy - Research

**Researched:** 2026-05-09
**Domain:** GitHub Pages deployment, HTML5/CSS3 scaffold, static site setup
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** GitHub username is `bolotbekbolotov` — repo MUST be named `bolotbekbolotov.github.io` for root-URL deployment (not a project repo)
- **D-02:** Repo does not yet exist on GitHub — must be created during Phase 1 execution
- **D-03:** GitHub Pages serves from `main` branch root — no `gh-pages` branch, no build step, no Actions workflow needed
- **D-04:** Initial `index.html` should include semantic HTML skeleton with all section stubs (`<header>`, `#hero`, `#experience`, `#skills`, `#achievements`, `#contact`, `<footer>`) — Phase 2 fills content into existing structure, not a blank file
- **D-05:** `style.css` should include CSS custom properties (design tokens: colors, font stack, spacing scale) from the start — Inter font via Google Fonts, CSS reset, token layer — so Phase 2 has a real foundation

### Claude's Discretion

- Scaffold depth for section stubs: placeholder text vs commented-out structure — Claude decides what makes Phase 2 easiest
- Whether to include a `main.js` stub or skip until Phase 2 needs it

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DEPLOY-01 | Site is live and publicly accessible on GitHub Pages (username.github.io) | Repo creation steps, Pages API enablement, HTTPS verification approach all documented below |
</phase_requirements>

---

## Summary

Phase 1 is a pure deployment pipeline phase — no content authoring. The deliverable is a publicly reachable `https://bolotbekbolotov.github.io` URL, HTTPS confirmed working, with a semantic HTML scaffold and CSS token layer that Phase 2 can fill without structural changes.

The execution path is well-understood and stable: create the repo named `bolotbekbolotov.github.io`, commit `index.html` and `style.css` to `main`, enable GitHub Pages via the REST API (since `gh` CLI is not installed), and verify HTTPS is live. Total elapsed time including GitHub's propagation delay is 3–10 minutes.

The only discretionary decision is scaffold depth and whether to include a `main.js` stub. Research supports: use visible placeholder text in stubs (not comments) so the deployed page confirms each section renders, and skip `main.js` entirely — Phase 2 adds it only if needed.

**Primary recommendation:** Create the repo, commit a content-stubbed `index.html` + token-layer `style.css`, enable Pages via `gh api`, wait for the green lock, then verify HTTPS in browser before declaring done.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page delivery | CDN / Static (GitHub Pages) | — | GitHub Pages serves static files directly; no backend tier exists |
| HTML structure / content | Browser / Client | — | Content is hardcoded in HTML; no server rendering |
| Styling / layout | Browser / Client | — | CSS parsed and applied client-side |
| Repo creation and Pages config | External service (GitHub API) | — | One-time setup operation, not a runtime architecture concern |
| HTTPS termination | CDN / Static (GitHub Pages infra) | — | Let's Encrypt cert provisioned automatically by GitHub |

---

## Standard Stack

### Core

| Technology | Version/Approach | Purpose | Why Standard |
|------------|-----------------|---------|--------------|
| HTML | HTML5 (semantic) | Document structure | Required by project constraint; semantic elements give accessibility and SEO at zero cost |
| CSS | CSS3 + Custom Properties | All styling | Required by constraint; Custom Properties replace Sass; Grid/Flex handle all layout |
| Google Fonts — Inter | 400, 600, 700 weights via `<link>` | Body text and UI labels | De facto standard for software-focused professional sites; legible at all sizes |

### Supporting

| Technology | Version/Approach | Purpose | When to Use |
|------------|-----------------|---------|-------------|
| `font-display: swap` | CSS descriptor | FOUT mitigation | Always — prevents invisible text while Inter loads |
| `<link rel="preconnect">` to fonts.googleapis.com | HTML | Reduce font load latency | Always include alongside Google Fonts `<link>` |
| `main.js` stub | Vanilla JS, deferred | Smooth scroll / active-nav (Phase 2) | Skip in Phase 1 — add only when Phase 2 requires it |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Google Fonts (Inter) | Self-hosted woff2 files | Self-hosting eliminates Google DNS dependency and any GDPR concerns; adds manual font file management. Acceptable alternative if privacy is a priority — not needed for a personal site. |
| Placeholder text in section stubs | HTML comments only | Comments make the deployed page look blank, losing the visual confirmation that each section renders correctly. Placeholder text is marginally more bytes but provides meaningful deploy verification. |

**Installation:** None — no npm, no package manager. All dependencies are `<link>` tags.

---

## Architecture Patterns

### System Architecture Diagram

```
Browser request
     |
     v
GitHub CDN (GitHub Pages)
     |  serves static files
     v
index.html  ──── <link> ───> style.css
     |
     └──── <link> ──────────> fonts.googleapis.com (Inter)
                                    |
                                    v
                              fonts.gstatic.com (woff2 files)
```

No server-side logic. No build step. GitHub Pages serves the repo root directly.

### Recommended Project Structure

```
/  (repo root = site root)
├── index.html          # All page content — single scrollable document
├── style.css           # All styles — organized by layer (see below)
└── assets/             # Created in Phase 1 as empty dir with .gitkeep
```

`main.js`, `assets/icons.svg`, `assets/avatar.jpg`, `robots.txt`, `sitemap.xml` — all deferred to Phase 2 or Phase 3. Phase 1 creates only what is needed to deploy.

### Pattern 1: CSS Layer Organization

**What:** Organize `style.css` with comment-banner sections in a fixed order so the token layer is always defined before use and utilities come last.

**When to use:** Always — establish this order in Phase 1 so Phase 2 appends sections without restructuring.

```css
/* Source: ARCHITECTURE.md — project research */

/* 1. RESET & BASE ---------------------------------------- */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }

/* 2. DESIGN TOKENS --------------------------------------- */
:root {
  /* Colors */
  --color-text:       #1a1a1a;
  --color-text-muted: #6b7280;
  --color-accent:     #2563eb;
  --color-bg:         #ffffff;
  --color-border:     #e5e7eb;

  /* Typography */
  --font-body:   'Inter', system-ui, -apple-system, sans-serif;
  --font-size-base: 1rem;       /* 16px */
  --font-size-sm:   0.875rem;   /* 14px */
  --font-size-lg:   1.125rem;   /* 18px */
  --font-size-xl:   1.5rem;     /* 24px */
  --font-size-2xl:  2rem;       /* 32px */
  --line-height:    1.6;

  /* Spacing scale (4px base) */
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */

  /* Layout */
  --max-width: 760px;
}

/* 3. TYPOGRAPHY ------------------------------------------ */
/* 4. LAYOUT ---------------------------------------------- */
/* 5. HEADER & NAV ---------------------------------------- */
/* 6. HERO ------------------------------------------------ */
/* 7. EXPERIENCE ------------------------------------------ */
/* 8. SKILLS ---------------------------------------------- */
/* 9. ACHIEVEMENTS ---------------------------------------- */
/* 10. CONTACT / FOOTER ----------------------------------- */
/* 11. UTILITIES ------------------------------------------ */
/* 12. MEDIA QUERIES -------------------------------------- */
```

### Pattern 2: Semantic HTML Scaffold with Visible Section Stubs

**What:** All six CV sections present as semantic elements with placeholder text — not comments. Phase 2 replaces placeholder text; it does not add new structural elements.

**When to use:** Phase 1 only — establishes the structural skeleton that all subsequent phases fill.

```html
<!-- Source: ARCHITECTURE.md and D-04 decision -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bolotbek Bolotov — Software Engineer</title>
  <meta name="description" content="Software engineer — CV and contact information.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav aria-label="Primary navigation">
      <!-- Phase 2: nav links -->
    </nav>
  </header>

  <main>
    <section id="hero" aria-label="Introduction">
      <h1>Bolotbek Bolotov</h1>
      <p class="hero-title">Software Engineer</p>
      <p class="hero-summary">Professional summary — Phase 2.</p>
    </section>

    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      <p>Work history — Phase 2.</p>
    </section>

    <section id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
      <p>Skills by proficiency tier — Phase 2.</p>
    </section>

    <section id="achievements" aria-labelledby="achievements-heading">
      <h2 id="achievements-heading">Achievements</h2>
      <p>Competitive programming honors — Phase 2.</p>
    </section>

    <section id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <p>Email, GitHub, LinkedIn — Phase 2.</p>
    </section>
  </main>

  <footer>
    <p>Bolotbek Bolotov</p>
  </footer>
</body>
</html>
```

### Pattern 3: GitHub Pages Enablement via REST API (no gh CLI)

**What:** `gh` CLI is not installed on this machine. Use `gh api` equivalent via `curl` with a GitHub personal access token, or install `gh` as part of Phase 1 execution.

**When to use:** After the initial commit is pushed to `main`.

```bash
# Source: https://docs.github.com/en/rest/pages/pages?apiVersion=2022-11-28
# Enable Pages from main branch root:
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/bolotbekbolotov/bolotbekbolotov.github.io/pages \
  -d '{"source":{"branch":"main","path":"/"}}'
```

Alternatively, if `gh` CLI is installed at execution time:
```bash
gh api -X POST /repos/bolotbekbolotov/bolotbekbolotov.github.io/pages \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

Manual fallback (always available): Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / Folder: `/(root)` → Save.

### Anti-Patterns to Avoid

- **Repo named anything other than `bolotbekbolotov.github.io`:** A project-name repo serves from a subpath (`/repo-name/`), breaking all root-relative asset references locally vs production.
- **Uppercase letters in filename or href/src path:** GitHub Pages runs on Linux (case-sensitive). `style.CSS` works on macOS locally, 404s in production. All filenames must be lowercase.
- **`gh-pages` branch or `/docs` folder source:** D-03 locks `main` branch root. Don't deviate.
- **Sharing the URL before HTTPS is confirmed green:** HTTP link shared to recruiters shows a browser security warning — damaging first impression. Wait for the padlock icon in GitHub Settings → Pages.
- **Entry point named anything other than `index.html`:** GitHub Pages requires exactly `index.html` at the source root. `home.html`, `cv.html` will 404.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font fallback stack | Custom font detection JS | CSS fallback stack in `font-family` declaration | CSS fallback is automatic, zero runtime cost |
| HTTPS | Manual cert management | GitHub Pages built-in Let's Encrypt | GitHub provisions and auto-renews the cert |
| Deploy pipeline | GitHub Actions workflow | None — direct push to main | No build step exists; Actions would add complexity with zero benefit |
| CSS reset | Full normalize.css or reset.css | 3-line inline reset (`box-sizing`, `margin: 0`, `line-height`) | Full resets are written for complex projects; 3 lines cover 100% of this page's needs |

**Key insight:** The project constraint (no build step, no npm) eliminates entire categories of hand-rolling temptation. When in doubt, the answer is "write it directly in HTML/CSS."

---

## Common Pitfalls

### Pitfall 1: GitHub Pages 404 After Push

**What goes wrong:** The URL `https://bolotbekbolotov.github.io` returns a 404 even after code is pushed.

**Why it happens:** Pages source not configured in settings, or branch/folder setting is wrong, or first deploy propagation is still in progress.

**How to avoid:** Enable Pages source before or immediately after first push. Allow 1–3 minutes for initial build. Check Settings → Pages for the live URL and green status.

**Warning signs:** Settings → Pages shows "Your site is ready to be published at..." but no green checkmark. Check the Actions tab for a `pages-build-deployment` workflow run.

### Pitfall 2: HTTPS Not Yet Active When Sharing

**What goes wrong:** URL loads over HTTP; browsers show "Not Secure" warning.

**Why it happens:** GitHub provisions the Let's Encrypt cert after Pages is enabled. On first deploy, this takes several minutes to several hours in edge cases.

**How to avoid:** In Settings → Pages, wait until the "Enforce HTTPS" checkbox is available AND checked. The green padlock icon next to your domain in settings confirms the cert is provisioned. Do not share the link until this is confirmed.

**Warning signs:** Visiting `https://bolotbekbolotov.github.io` shows a certificate error, or the browser redirects to `http://`.

### Pitfall 3: Case-Sensitive File Paths Break in Production

**What goes wrong:** `<link rel="stylesheet" href="Style.css">` works locally on macOS (case-insensitive filesystem) but returns a 404 on GitHub Pages (Linux, case-sensitive).

**Why it happens:** macOS HFS+ filesystem is case-insensitive by default.

**How to avoid:** All filenames lowercase. All `href` and `src` attribute values lowercase. Enforce at code review.

**Warning signs:** Page loads locally with styles, but deployed page is unstyled (CSS 404 in browser DevTools Network tab).

### Pitfall 4: Jekyll Processing Interfering

**What goes wrong:** GitHub Pages runs Jekyll by default. Files in directories prefixed with an underscore (`_assets/`) are excluded from output by Jekyll.

**Why it happens:** Jekyll treats `_` prefixed directories as private.

**How to avoid:** Use `assets/` not `_assets/`. If any underscore-prefixed paths are ever needed, add a `.nojekyll` file to the repo root. Phase 1 uses `assets/` so this is not a current concern.

**Warning signs:** Assets inside underscore directories return 404 in production but are present locally.

### Pitfall 5: Missing `<meta name="viewport">` Breaks Mobile

**What goes wrong:** Without the viewport meta tag, mobile browsers render the page at desktop width (980px) and scale it down, making text unreadable.

**Why it happens:** Viewport meta is easy to forget in a minimal HTML scaffold.

**How to avoid:** Include `<meta name="viewport" content="width=device-width, initial-scale=1.0">` in every HTML file. It belongs in the Phase 1 scaffold — not deferred to Phase 3.

**Warning signs:** On a real phone, page text is tiny and user must pinch-zoom to read anything.

---

## Code Examples

### Google Fonts Preconnect + Load (Verified Pattern)

```html
<!-- Source: https://fonts.google.com — standard recommended loading pattern -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

`display=swap` is embedded in the URL — no separate `font-display` declaration needed when loading from Google Fonts this way. [VERIFIED: Google Fonts documentation and URL parameter behavior]

### Minimal CSS Reset (Verified Pattern)

```css
/* Source: MDN, widely verified community consensus */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

This covers the three most common layout and rendering surprises without importing a heavy reset library.

### git + GitHub API Repo Creation Sequence (No gh CLI)

```bash
# 1. Initialize local repo and make first commit
cd /path/to/project
git init
git add index.html style.css
git commit -m "Initial scaffold"

# 2. Create remote repo (requires GitHub token in env or gh CLI)
#    Via GitHub REST API:
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/user/repos \
  -d '{"name":"bolotbekbolotov.github.io","private":false,"description":"Personal CV site"}'

# 3. Push to remote
git remote add origin https://github.com/bolotbekbolotov/bolotbekbolotov.github.io.git
git push -u origin main

# 4. Enable GitHub Pages from main root
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/bolotbekbolotov/bolotbekbolotov.github.io/pages \
  -d '{"source":{"branch":"main","path":"/"}}'
```

[VERIFIED: GitHub REST API docs — https://docs.github.com/en/rest/pages/pages]

### If gh CLI Is Available

```bash
# Create repo and push in one command
gh repo create bolotbekbolotov.github.io --public --source=. --push \
  --description "Personal CV site"

# Enable Pages
gh api -X POST /repos/bolotbekbolotov/bolotbekbolotov.github.io/pages \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

[CITED: https://cli.github.com/manual/gh_repo_create]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Jekyll-based GitHub Pages (auto-build) | Static file deploy from branch | ~2022 | No more Jekyll config needed for plain HTML sites |
| `font-display` in custom `@font-face` | `display=swap` parameter in Google Fonts URL | ~2019 | Simpler — no custom `@font-face` block needed |
| `gh-pages` branch for user sites | `main` branch root (default for `username.github.io` repos) | ~2020 | Simpler branch strategy; no separate branch to maintain |

**Deprecated/outdated:**

- **`<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter">`** (old v1 API): Use the `css2?family=` URL format instead — it supports weight ranges and the `display` parameter.
- **`gh-pages` npm package**: Only relevant when a build step produces an output directory. This project has no build step.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | GitHub Pages initial HTTPS cert provisioning completes within minutes to a few hours on a fresh `username.github.io` repo | Common Pitfalls — Pitfall 2 | If delayed beyond several hours, executor should check GitHub status page and verify Pages settings; no code change needed |
| A2 | The GitHub REST API `POST /repos/{owner}/{repo}/pages` with `source.branch=main, source.path=/` works for a newly created `username.github.io` repo without prior Pages configuration | Code Examples | If API returns an error, fall back to manual Settings → Pages UI — same outcome |
| A3 | Skipping `main.js` in Phase 1 does not cause any CSS or structural issues — it is safe to reference in HTML only when needed | Standard Stack | None — JS file is purely additive and optional |

---

## Open Questions

1. **GitHub token availability at execution time**
   - What we know: The executor will need a GitHub personal access token (classic or fine-grained with `repo` and `pages` scopes) to call the REST API programmatically.
   - What's unclear: Whether the executor will have a token pre-configured in their environment, or whether they'll use the GitHub web UI fallback.
   - Recommendation: Plan should include both paths — API command as primary, Settings UI as fallback. Executor chooses based on token availability.

2. **`Enforce HTTPS` checkbox timing**
   - What we know: The checkbox appears and becomes active only after the cert is provisioned. GitHub docs do not specify a maximum wait time for a fresh deploy.
   - What's unclear: Whether there's any scenario (new account, rate limit, etc.) that causes extended delay.
   - Recommendation: Verification step in the plan should poll Settings → Pages every 2 minutes, with a 20-minute timeout before flagging for human investigation.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `git` | Local repo init and push | Yes | 2.44.0 | — |
| `gh` CLI | Repo creation + Pages API | No | — | `curl` + GitHub token, or GitHub web UI |
| `node` | (Not required) | Yes | 25.2.1 | N/A |
| GitHub personal access token | REST API calls | Unknown | — | GitHub web UI (Settings → Pages) |
| Internet / github.com access | Repo push and Pages enable | Assumed | — | — |

**Missing dependencies with no fallback:**
- None that block execution — all `gh` CLI operations have a `curl` or web UI equivalent.

**Missing dependencies with fallback:**
- `gh` CLI: Not installed. Fallback is `curl` with a GitHub token OR manual web UI. Plan must provide both paths.

---

## Project Constraints (from CLAUDE.md)

The following directives from `./CLAUDE.md` are binding on all phase work:

| Directive | Source | Enforcement |
|-----------|--------|-------------|
| HTML/CSS/JS only — no frameworks, no build pipeline | CLAUDE.md §Constraints | No `package.json`, no npm, no preprocessors |
| GitHub Pages static hosting only — no server-side logic | CLAUDE.md §Constraints | No backend, no Actions build step |
| Single page — all content on one scrollable page | CLAUDE.md §Constraints | One `index.html` only |
| No Tailwind, Bootstrap, or any CSS framework | CLAUDE.md §Technology Stack | Raw CSS only |
| No React, Vue, Svelte, Angular, or lightweight JS frameworks | CLAUDE.md §Technology Stack | Vanilla ES2022+ only |
| No Font Awesome or icon fonts | CLAUDE.md §Technology Stack | SVG only (deferred to Phase 2) |
| No `npm` / `package.json` | CLAUDE.md §What NOT to Use | Keep repo root clean: `index.html`, `style.css`, `assets/` |
| Git commits: no AI attribution, human authorship only | ~/.claude/CLAUDE.md §Git | Never add "Co-Authored-By: Anthropic" lines |

---

## Security Domain

`security_enforcement: true`, ASVS Level 1 applies.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No authentication on a public static site |
| V3 Session Management | No | No sessions — stateless static page |
| V4 Access Control | No | Public read-only content; no ACL needed |
| V5 Input Validation | No | No user input accepted in Phase 1; Phase 2 contact links use `mailto:` (no form submission) |
| V6 Cryptography | No | HTTPS handled by GitHub Pages / Let's Encrypt — no hand-rolled crypto |
| V7 Error Handling | Minimal | No custom 404 in Phase 1; GitHub Pages default 404 is acceptable |
| V14 Configuration | Partial | `<meta name="referrer">` and `rel="noopener noreferrer"` on external links (Phase 2 concern, not Phase 1) |

**Phase 1 security posture:** The page is a public, read-only, static HTML document with no user input, no authentication, no cookies, and no JavaScript execution in Phase 1. ASVS Level 1 has no blocking requirements for this configuration. The only actionable item is ensuring HTTPS is enforced (covered by the "Enforce HTTPS" checkbox in GitHub Pages settings).

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| HTTP interception (no HTTPS) | Information Disclosure | Enable "Enforce HTTPS" in GitHub Pages settings — handles automatically |
| Mixed content (HTTP asset references) | Tampering / Info Disclosure | All `href`/`src` in HTML must use relative paths or `https://` — never `http://` |

---

## Sources

### Primary (HIGH confidence)
- GitHub Pages official docs — https://docs.github.com/en/pages — repo naming, branch config, deployment timing
- GitHub REST API Pages endpoint — https://docs.github.com/en/rest/pages/pages?apiVersion=2022-11-28 — API body format for source/branch/path
- GitHub CLI manual — https://cli.github.com/manual/gh_repo_create — `gh repo create` flags
- Project ARCHITECTURE.md — CSS layer organization, component boundaries, anti-patterns
- Project STACK.md — font loading pattern, performance targets, what not to use
- Project PITFALLS.md — GitHub Pages deployment traps (case sensitivity, HTTPS timing, branch config)

### Secondary (MEDIUM confidence)
- GitHub Community discussion #51268 — gh CLI Pages enablement workarounds — https://github.com/orgs/community/discussions/51268
- GitHub Pages HTTPS docs — https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https

### Tertiary (LOW confidence)
- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — constrained by project requirements; no discretion in core tech choices
- GitHub Pages deployment steps: HIGH — verified against official docs and REST API reference
- HTTPS timing: MEDIUM — official docs give qualitative guidance ("several minutes") without exact SLA; tagged as ASSUMED
- gh CLI fallback via curl: HIGH — REST API is official and stable
- Architecture patterns: HIGH — derived from existing project research files (ARCHITECTURE.md, STACK.md, PITFALLS.md) which are already HIGH confidence

**Research date:** 2026-05-09
**Valid until:** 2026-09-09 (GitHub Pages API is stable; 4-month window appropriate)
