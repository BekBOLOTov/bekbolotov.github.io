# CV Landing Page

## What This Is

A personal CV landing page for a software engineer, hosted on GitHub Pages. Built with plain HTML/CSS/JS — no build step. Targets both recruiters and hiring managers who need to quickly assess experience and depth.

## Core Value

Credibility on first read — a visitor should immediately trust the engineer's depth of experience and judgment.

## Current State

**Shipped:** v1.0 — 2026-05-09
**Live URL:** https://bolotbekbolotov.github.io/

v1.0 delivered:
- Live site on GitHub Pages with HTTPS
- All CV sections rendered: hero, experience (5 roles + inline tech stacks), 2-tier skills, achievements (IOI/ICPC + DS&A profiles), contact
- Mobile-responsive at 375px (horizontal-scroll nav, 44px tap targets)
- Print-to-PDF clean output (URL expansion, page-break control)
- SEO: meta description + canonical + theme-color + OG block + JSON-LD Person schema + og-card.png

See [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md) for full milestone detail.

## Next Milestone Goals

_None defined yet. Run `/gsd-new-milestone` to scope v1.1 / v2.0._

Carried-forward candidates from v1.0 deferrals:
- Projects section
- Custom domain (CNAME + DNS)
- Dark mode toggle
- Favicon
- Blog / writing
- Certifications (if added)

## Context

- Platform: GitHub Pages (free static hosting via github.io)
- Tech: Plain HTML/CSS/JS — zero build step, direct deploy from `main` branch root
- Audience: Both recruiters (need quick scan) and hiring managers (want depth)
- Style: Clean/minimal, white space, typography-first
- Branching: `none` strategy — work directly on `main`, push = deploy

## Constraints

- **Tech stack**: HTML/CSS/JS only — no frameworks, no build pipeline
- **Hosting**: GitHub Pages — static only, no server-side logic
- **Scope**: Single page — all content on one scrollable page

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Plain HTML/CSS/JS over static generator | Zero build step, deploys directly to GH Pages, easiest to maintain | ✅ Validated v1.0 |
| Single page (no routing) | CV context — recruiters scroll, not navigate | ✅ Validated v1.0 |
| Skip projects section in v1 | Keep focus on credibility through experience, not side work | ✅ Validated v1.0 — deferred to future milestone |
| 2-tier skills (Expert + Proficient) | 3 tiers with sparse Familiar tier signaled less, not more | ✅ Validated v1.0 (Phase 3 D-06/D-07) |
| Inline `.experience-stack` per role | Stack signal stronger per-role than only in Skills section | ✅ Validated v1.0 (Phase 3 D-05) |
| No `print-color-adjust` in @media print | Let browser strip backgrounds per default | ✅ Validated v1.0 (Phase 3 D-15) |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Update Current State with shipped version
4. Update Next Milestone Goals

---
*Last updated: 2026-05-09 after v1.0 milestone completion*

<details>
<summary>Previous content (pre-v1.0 init format)</summary>

## Requirements (pre-v1.0)

### Validated
- Deployed and live on GitHub Pages (Phase 1: bekbolotov.github.io)

### Active (now archived under v1.0-REQUIREMENTS.md)
- Hero section with name, title, brief professional summary
- Work experience section
- Skills section
- Education / Achievements section
- Contact / links section
- Clean, minimal visual design
- Deployed live on GitHub Pages

### Out of Scope (still permanent)
- Backend / CMS
- Blog / writing
- Dark mode (re-evaluate next milestone)
- Backend rendering / SSR

</details>
