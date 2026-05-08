# CV Landing Page

## What This Is

A personal CV landing page for a software engineer, hosted on GitHub Pages. Built with plain HTML/CSS/JS — no build step. Targets both recruiters and hiring managers who need to quickly assess experience and depth.

## Core Value

Credibility on first read — a visitor should immediately trust the engineer's depth of experience and judgment.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with name, title, and brief professional summary
- [ ] Work experience section with roles, companies, and descriptions
- [ ] Skills section showing tech stack and tools
- [ ] Education section with degrees and certifications
- [ ] Contact/links section with email, GitHub, and LinkedIn
- [ ] Clean, minimal visual design — typography-focused, professional
- [ ] Deployed and live on GitHub Pages

### Out of Scope

- Projects section — deferred to v2 (keep v1 focused)
- Blog or writing section — out of scope for now
- Dark mode / theme toggle — adds complexity without clear need
- Backend / CMS — static only, content hardcoded in HTML

## Context

- Platform: GitHub Pages (free static hosting via github.io)
- Tech: Plain HTML/CSS/JS — zero build step, direct deploy from repo
- Audience: Both recruiters (need quick scan) and hiring managers (want depth)
- Style: Clean/minimal, white space, typography-first

## Constraints

- **Tech stack**: HTML/CSS/JS only — no frameworks, no build pipeline
- **Hosting**: GitHub Pages — static only, no server-side logic
- **Scope**: Single page — all content on one scrollable page

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Plain HTML/CSS/JS over static generator | Zero build step, deploys directly to GH Pages, easiest to maintain | — Pending |
| Single page (no routing) | CV context — recruiters scroll, not navigate | — Pending |
| Skip projects section in v1 | Keep focus on credibility through experience, not side work | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-09 after initialization*
