# Phase 1: Foundation & Deploy - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Get `index.html` live on GitHub Pages at `bolotbekbolotov.github.io`, HTTPS working and verified, with a proper HTML/CSS scaffold ready to receive content in Phase 2. No content authoring — deploy pipeline only.

</domain>

<decisions>
## Implementation Decisions

### Repo & URL
- **D-01:** GitHub username is `bolotbekbolotov` — repo MUST be named `bolotbekbolotov.github.io` for root-URL deployment (not a project repo)
- **D-02:** Repo does not yet exist on GitHub — must be created during Phase 1 execution
- **D-03:** GitHub Pages serves from `main` branch root — no `gh-pages` branch, no build step, no Actions workflow needed

### Scaffold
- **D-04:** Initial `index.html` should include semantic HTML skeleton with all section stubs (`<header>`, `#hero`, `#experience`, `#skills`, `#achievements`, `#contact`, `<footer>`) — Phase 2 fills content into existing structure, not a blank file
- **D-05:** `style.css` should include CSS custom properties (design tokens: colors, font stack, spacing scale) from the start — Inter font via Google Fonts, CSS reset, token layer — so Phase 2 has a real foundation

### Claude's Discretion
- Scaffold depth for section stubs: placeholder text vs commented-out structure — Claude decides what makes Phase 2 easiest
- Whether to include a `main.js` stub or skip until Phase 2 needs it

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — project goals, constraints, tech decisions
- `.planning/REQUIREMENTS.md` — v1 requirements including DEPLOY-01
- `.planning/ROADMAP.md` — phase boundaries and success criteria

### Research
- `.planning/research/STACK.md` — confirmed stack: HTML5, CSS Custom Properties, vanilla JS, Inter font, SVG icons, no framework
- `.planning/research/ARCHITECTURE.md` — file structure, GitHub Pages config specifics, CSS layer organization
- `.planning/research/PITFALLS.md` — GitHub Pages deployment traps (case-sensitivity, branch config, HTTPS timing)

No external specs beyond the above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None yet — Phase 1 establishes the patterns all subsequent phases follow

### Integration Points
- `cv-source.pdf` in repo root — CV content reference for Phase 2; not served as a web asset

</code_context>

<specifics>
## Specific Ideas

- Live URL must be: `https://bolotbekbolotov.github.io`
- Repo to create: `bolotbekbolotov/bolotbekbolotov.github.io` on GitHub
- No custom domain for v1 (deferred to v2 per requirements)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Foundation & Deploy*
*Context gathered: 2026-05-09*
