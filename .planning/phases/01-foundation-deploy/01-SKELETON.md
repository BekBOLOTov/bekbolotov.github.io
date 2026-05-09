# Walking Skeleton — CV Landing Page

**Phase:** 01 Foundation & Deploy
**Created:** 2026-05-09
**Status:** Planned (execute Phase 1 to realize this skeleton)

---

## What the Walking Skeleton Proves

The skeleton validates one end-to-end path: a static file committed to a GitHub repository is publicly reachable in a browser over HTTPS, without a build step, without a server, and without any tooling beyond `git` and a GitHub account.

```
Developer workstation
  └── index.html, style.css, assets/.gitkeep
        │
        │  git push origin main
        ▼
github.com/bolotbekbolotov/bolotbekbolotov.github.io
  └── main branch (repo root = site root)
        │
        │  GitHub Pages serving (no Jekyll, no build step)
        ▼
GitHub CDN (edge nodes)
  └── Let's Encrypt TLS cert (auto-provisioned and auto-renewed)
        │
        │  HTTPS
        ▼
Visitor browser
  └── https://bolotbekbolotov.github.io
        └── index.html + style.css + Google Fonts (Inter via CDN)
```

Every subsequent phase adds files to the same repo and pushes to the same branch. No architecture change required.

---

## Skeleton Artifacts

| Artifact | Location | Role in the Skeleton |
|----------|----------|----------------------|
| `index.html` | Repo root | Entry point GitHub Pages serves. Must be named exactly `index.html`. Contains the semantic HTML structure all phases fill. |
| `style.css` | Repo root | All styles for the page. Linked from `index.html` via relative `href="style.css"`. Reset + design token layer established here. |
| `assets/` | Repo root | Empty directory (tracked via `.gitkeep`). Phase 2 populates with `icons.svg` and `avatar.jpg`. |
| `CNAME` | NOT present | Custom domain deferred to v2. `username.github.io` URL used. |
| `main.js` | NOT present | No JavaScript in Phase 1. Phase 2 adds only if needed. |
| `robots.txt` / `sitemap.xml` | NOT present | SEO files deferred to Phase 3. |

---

## Architectural Decisions (Fixed by This Skeleton)

These decisions are locked. Subsequent phases build on them without renegotiating.

### Hosting
- **Platform:** GitHub Pages (free, zero-config, HTTPS automatic)
- **Repo name:** `bolotbekbolotov.github.io` — this exact name is required for root-URL deployment. A different repo name would serve from a subpath (`/repo-name/`) and break all root-relative references.
- **Source:** main branch, `/` (root folder). No `gh-pages` branch. No `/docs` folder.
- **Build step:** None. GitHub Pages serves the repo root directly. No Jekyll config, no Actions workflow.

### URL
- **Live URL:** `https://bolotbekbolotov.github.io`
- **HTTPS:** Enforced via GitHub Pages "Enforce HTTPS" setting. Let's Encrypt cert, auto-renewed.
- **Custom domain:** Deferred to v2. Not blocked by skeleton architecture.

### File Structure (fixed by Phase 1)
```
/ (repo root = site root)
├── index.html       ← single entry point, GitHub Pages requires this exact name
├── style.css        ← all styles, single file
└── assets/          ← assets directory, NOT _assets/ (Jekyll excludes underscore dirs)
    └── .gitkeep
```

Phase 2 adds to this structure; it does not change it:
```
/ (after Phase 2)
├── index.html       ← content filled in, same file
├── style.css        ← sections 3–12 filled in, same file
└── assets/
    ├── .gitkeep
    ├── icons.svg    ← SVG sprite for GitHub/LinkedIn/email icons
    └── avatar.jpg   ← optional profile photo
```

### CSS Architecture (fixed by Phase 1)
- **No framework.** Raw CSS3 with native Custom Properties.
- **Token layer** defined in `:root` in `style.css` Section 2. All colors, typography, spacing, and layout constants live here. Phase 2 consumes them via `var(--token-name)`.
- **12-section file organization.** Section order is fixed: Reset → Tokens → Typography → Layout → Header → Hero → Experience → Skills → Achievements → Contact/Footer → Utilities → Media Queries. Phase 2 fills sections 3–12 by appending rules below each section banner comment.

### Fonts
- **Inter** (400, 600, 700) loaded from Google Fonts via `<link>` in `<head>`. `display=swap` parameter embedded in URL.
- Font family referenced in CSS as `var(--font-body)` which resolves to `'Inter', system-ui, -apple-system, sans-serif`. System font stack is the fallback — page remains readable if Google Fonts is blocked.

### JavaScript
- **None in Phase 1.** The page renders fully without JS.
- Phase 2 may add `main.js` for smooth scroll and active-section nav highlighting — progressive enhancement only. If added, it uses `<script defer src="main.js">` at bottom of `<body>`.

---

## What Is Explicitly NOT in the Skeleton

The following are intentionally absent. Their absence is a design decision, not an omission.

| Absent Item | Phase It Arrives | Why Absent from Skeleton |
|-------------|------------------|--------------------------|
| Actual CV content (name, summary, work history, skills) | Phase 2 | Skeleton proves the deploy path; content is Phase 2's responsibility |
| Visual design (typography rules, layout grid, section spacing) | Phase 2 | Design tokens defined; rules deferred until content structure is known |
| SVG icons (GitHub, LinkedIn, email) | Phase 2 | `assets/` directory reserved; icons ship with the contact section |
| Profile photo / avatar | Phase 2 | Optional; reserved space in `assets/` |
| `main.js` (smooth scroll, active nav) | Phase 2 (optional) | No JS needed until interactive features are designed |
| `robots.txt`, `sitemap.xml` | Phase 3 | SEO files deferred until content is live |
| Open Graph / structured data meta tags | Phase 3 | Deferred until final content is in place |
| `@media print` stylesheet | Phase 3 | Print layout deferred until visual design is complete |
| Custom domain (`CNAME`) | v2 | Deferred — `bolotbekbolotov.github.io` URL sufficient for v1 |
| Dark mode toggle | v2 | Out of scope for v1 |

---

## How Phase 2 Slots In

Phase 2 does not change any architectural decisions. It only fills content into the structure Phase 1 establishes:

1. **index.html** — Replace placeholder text in each section stub with real CV content (name, summary, work history, skills, achievements, contact links). Add nav links in `<header>`. Optionally add `<script defer src="main.js">` before `</body>`.

2. **style.css** — Append rules into sections 3–12 (typography, layout, header/nav, hero, experience, skills, achievements, contact/footer, utilities, media queries). All rules reference `var(--token-name)` from the Section 2 token layer.

3. **assets/** — Add `icons.svg` (SVG sprite) and optionally `avatar.jpg`.

4. **main.js** (optional) — Add smooth scroll and active-section nav highlighting. Zero impact on users without JS.

No new files required at the repo root. No build step introduced. Push to `main` continues to deploy automatically via GitHub Pages.

---

## Verification

The skeleton is realized when:

- [ ] `curl -s -o /dev/null -w "%{http_code}" https://bolotbekbolotov.github.io` returns `200`
- [ ] `curl -sI https://bolotbekbolotov.github.io | grep -i strict-transport-security` returns HSTS header
- [ ] Browser padlock icon is visible at https://bolotbekbolotov.github.io (no certificate warning)
- [ ] Page title reads "Bolotbek Bolotov — Software Engineer"
- [ ] GitHub Settings → Pages: source is main branch root, "Enforce HTTPS" is checked
