---
phase: 03-polish-meta
plan: 01
subsystem: content
tags: [html, css, experience, skills]
requires:
  - phase: 02-content-structure
    provides: experience and skills section markup
provides:
  - Refreshed 5-role experience section with inline Stack lines (D-04, D-05)
  - Skills section collapsed from 3 tiers to 2 (Expert + Proficient, 41-item Proficient)
  - .experience-stack CSS rule in §7 of style.css
affects: [03-polish-meta]
tech-stack:
  added: []
  patterns:
    - "Inline Stack metadata under each .experience-entry as <p class=\"experience-stack\">"
    - "Two-tier skills model (Expert / Proficient) — no Familiar tier"
key-files:
  created: []
  modified:
    - index.html
    - style.css
key-decisions:
  - "D-03: Removed <strong> app-name markup in Breez Pro bullets — plain project-type sentences"
  - "D-06: Collapsed Familiar tier into Proficient — 41 items total"
patterns-established:
  - "Stack line: <p class=\"experience-stack\"><span>Stack:</span> tech, tech, ...</p> after </ul> inside each .experience-entry"
  - "CSS overrides global p margin via explicit margin: var(--space-1) 0 0 0"
requirements-completed:
  - POLISH-01
duration: 8min
completed: 2026-05-09
---

# Phase 3, Plan 01: Content refresh

**Updated CV experience and skills content to reflect locked D-04/D-07 text with inline tech stacks and 2-tier skills model.**

## Performance

- **Duration:** ~8 min
- **Tasks:** 2 completed
- **Files modified:** 2

## Accomplishments
- 5 experience entries rewritten with D-04 text and inline Stack lines
- Breez Pro bullets converted from `<strong>app-name</strong>` markup to plain project-type sentences
- Skills section reduced from 3 tiers to 2; Proficient tier expanded to 41 items
- New `.experience-stack` rule added to §7 using only design-system tokens

## Files Created/Modified
- `index.html` — experience section (5 .experience-entry blocks rewritten) and skills section (3 tiers → 2)
- `style.css` — added `.experience-stack` and `.experience-stack span` rules in §7

## Decisions Made
None — plan executed verbatim.

## Deviations from Plan
None — plan executed exactly as written.

## Verification

- `grep -c 'class="experience-stack"' index.html` → 5
- `grep -c '<strong>' index.html` → 0
- `grep -c 'class="skills-tier"' index.html` → 2
- `grep 'Familiar' index.html` → empty
- `GraphQL (Apollo)`, `Hilt`, `Jetpack Compose` present
- `.experience-stack {` rule present in style.css
- No hardcoded `#6b7280` outside `:root`
