# Phase 1: Foundation & Deploy - Pattern Map

**Mapped:** 2026-05-09
**Files analyzed:** 3 (index.html, style.css, assets/.gitkeep)
**Analogs found:** 0 / 3 — greenfield project, no existing source files

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `index.html` | document | request-response (static) | None — greenfield | No analog |
| `style.css` | stylesheet | request-response (static) | None — greenfield | No analog |
| `assets/.gitkeep` | config/placeholder | none | None — greenfield | No analog |

---

## No Analog Found

This is a greenfield project. No source files exist at `/Users/bolotbekbolotov/Documents/newdoc` outside of `CLAUDE.md` and `cv-source.pdf`. All patterns below are sourced from `01-RESEARCH.md` (which cites official documentation and project research files).

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `index.html` | document | request-response (static) | No HTML files exist in the project yet |
| `style.css` | stylesheet | request-response (static) | No CSS files exist in the project yet |
| `assets/.gitkeep` | config/placeholder | none | Repo root is empty; no directory structure yet |

---

## Pattern Assignments

### `index.html` (document, request-response)

**Analog:** None — use RESEARCH.md Pattern 2 directly.

**Source:** `01-RESEARCH.md` § "Pattern 2: Semantic HTML Scaffold with Visible Section Stubs"

**Document structure pattern** (full file):

```html
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

**Key constraints for this file:**

- Entry point MUST be named exactly `index.html` (lowercase) — GitHub Pages requires it at the source root
- All `href` and `src` attribute values must be lowercase — Linux filesystem is case-sensitive in production
- No `<script>` tag in Phase 1 — `main.js` is deferred to Phase 2
- `<link rel="stylesheet" href="style.css">` uses a relative path, no leading slash
- Google Fonts URL uses `css2?family=` format (not the deprecated `css?family=` v1 format) and includes `display=swap` parameter in the URL — no separate `font-display` CSS declaration needed
- Both `<link rel="preconnect">` tags must appear before the Google Fonts stylesheet `<link>`
- Section stubs use visible placeholder text, not HTML comments — confirms each section renders correctly after deploy

---

### `style.css` (stylesheet, request-response)

**Analog:** None — use RESEARCH.md Pattern 1 directly.

**Source:** `01-RESEARCH.md` § "Pattern 1: CSS Layer Organization"

**Full file structure and token layer:**

```css
/* 1. RESET & BASE ---------------------------------------- */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* 2. DESIGN TOKENS --------------------------------------- */
:root {
  /* Colors */
  --color-text:       #1a1a1a;
  --color-text-muted: #6b7280;
  --color-accent:     #2563eb;
  --color-bg:         #ffffff;
  --color-border:     #e5e7eb;

  /* Typography */
  --font-body:      'Inter', system-ui, -apple-system, sans-serif;
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
/* Phase 2 fills this section */

/* 4. LAYOUT ---------------------------------------------- */
/* Phase 2 fills this section */

/* 5. HEADER & NAV ---------------------------------------- */
/* Phase 2 fills this section */

/* 6. HERO ------------------------------------------------ */
/* Phase 2 fills this section */

/* 7. EXPERIENCE ------------------------------------------ */
/* Phase 2 fills this section */

/* 8. SKILLS ---------------------------------------------- */
/* Phase 2 fills this section */

/* 9. ACHIEVEMENTS ---------------------------------------- */
/* Phase 2 fills this section */

/* 10. CONTACT / FOOTER ----------------------------------- */
/* Phase 2 fills this section */

/* 11. UTILITIES ------------------------------------------ */
/* Phase 2 fills this section */

/* 12. MEDIA QUERIES -------------------------------------- */
/* Phase 2 fills this section */
```

**Key constraints for this file:**

- Filename must be exactly `style.css` (all lowercase)
- Section order is fixed — token layer (section 2) must always precede all other sections so Custom Properties resolve correctly when cascade reaches sections 3–12
- No `@import` for fonts — fonts are loaded via `<link>` in HTML; `style.css` only references them via `var(--font-body)` in `font-family` declarations
- No CSS framework, no Sass, no PostCSS — pure CSS3 with native Custom Properties and native nesting (available baseline 2023)
- Reset is inline (3 rules) — do not import normalize.css or reset.css
- Phase 2 appends content into sections 3–12; the section banner comments act as stable anchors

---

### `assets/.gitkeep` (config/placeholder)

**Analog:** None — standard practice.

**Source:** `01-RESEARCH.md` § "Recommended Project Structure"

**Pattern:** An empty `.gitkeep` file (zero bytes) placed inside `assets/` so git tracks the empty directory.

```
assets/
└── .gitkeep   (empty file)
```

**Key constraints:**

- Directory must be named `assets/` — not `_assets/` (GitHub Pages Jekyll processing silently excludes underscore-prefixed directories)
- Phase 2 populates `assets/` with `icons.svg` and `avatar.jpg`; Phase 1 only reserves the directory

---

## Shared Patterns

### Google Fonts Loading
**Source:** `01-RESEARCH.md` § "Code Examples — Google Fonts Preconnect + Load"
**Apply to:** `index.html` `<head>` block

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

`display=swap` in the URL is sufficient — no separate `@font-face { font-display: swap }` block needed.

### Minimal CSS Reset
**Source:** `01-RESEARCH.md` § "Code Examples — Minimal CSS Reset"
**Apply to:** Top of `style.css` (section 1, before design tokens)

```css
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

### GitHub Pages Enablement (no gh CLI)
**Source:** `01-RESEARCH.md` § "Pattern 3: GitHub Pages Enablement via REST API"
**Apply to:** Deployment step after first push to main

Primary path (curl + token):
```bash
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/bolotbekbolotov/bolotbekbolotov.github.io/pages \
  -d '{"source":{"branch":"main","path":"/"}}'
```

Fallback path (GitHub web UI): Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / Folder: `/(root)` → Save.

### Repo Creation Sequence
**Source:** `01-RESEARCH.md` § "Code Examples — git + GitHub API Repo Creation Sequence"
**Apply to:** Deployment steps before Pages enablement

```bash
# 1. Initialize local repo and commit scaffold
git init
git add index.html style.css assets/.gitkeep
git commit -m "Initial scaffold"

# 2. Create remote repo via GitHub REST API
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/user/repos \
  -d '{"name":"bolotbekbolotov.github.io","private":false,"description":"Personal CV site"}'

# 3. Push to remote
git remote add origin https://github.com/bolotbekbolotov/bolotbekbolotov.github.io.git
git push -u origin main
```

If gh CLI is available:
```bash
gh repo create bolotbekbolotov.github.io --public --source=. --push \
  --description "Personal CV site"
```

### Naming and Path Safety Rules
**Source:** `01-RESEARCH.md` § "Anti-Patterns to Avoid" and "Pitfall 3"
**Apply to:** All files created in Phase 1

- All filenames: lowercase only (`index.html`, `style.css`, `assets/`)
- All `href`/`src` values: lowercase, relative paths
- Entry point: exactly `index.html` — not `home.html`, not `cv.html`
- No leading slash in relative asset references (e.g., `href="style.css"` not `href="/style.css"`)
- No `http://` URLs anywhere — all external references use `https://`

---

## Metadata

**Analog search scope:** `/Users/bolotbekbolotov/Documents/newdoc` (all non-planning, non-git files)
**Files scanned:** 2 (`CLAUDE.md`, `cv-source.pdf`) — neither is a source code analog
**Pattern extraction date:** 2026-05-09
**Pattern source:** All patterns derived from `01-RESEARCH.md` which cites official GitHub Pages docs, Google Fonts docs, and project research files (ARCHITECTURE.md, STACK.md, PITFALLS.md)
