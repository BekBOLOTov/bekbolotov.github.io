# Roadmap: CV Landing Page

## Overview

Three phases take the project from an empty repo to a live, polished CV landing page. Phase 1 establishes the deployed shell so every subsequent change is immediately verifiable on the real URL. Phase 2 fills all content sections — hero through contact — delivering the core credibility value. Phase 3 locks in mobile rendering, print-to-PDF output, and SEO meta so the page performs correctly across every access context.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Deploy** - Repo scaffolded, site live on GitHub Pages with HTTPS verified
- [ ] **Phase 2: Content & Structure** - All CV sections authored and rendered with correct visual design
- [ ] **Phase 3: Polish & Meta** - Mobile layout, print stylesheet, and SEO meta complete

## Phase Details

### Phase 1: Foundation & Deploy
**Goal**: The site is publicly reachable on GitHub Pages and ready to receive content
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: DEPLOY-01
**Success Criteria** (what must be TRUE):
  1. Visiting `<username>.github.io` in a browser loads the page over HTTPS without errors
  2. The repository is named correctly (`<username>.github.io`) and Pages is configured to serve from the main branch root
  3. `index.html` and `style.css` exist in the repo root and are committed to main
**Plans**: 2 plans
Plans:
**Wave 1**
- [ ] 01-01-PLAN.md — Create HTML/CSS scaffold (index.html, style.css, assets/.gitkeep)

**Wave 2** *(blocked on Wave 1 completion)*
- [ ] 01-02-PLAN.md — Create remote repo, push, enable GitHub Pages, verify HTTPS
**UI hint**: yes

### Phase 2: Content & Structure
**Goal**: Every CV section is on the page with accurate, impact-framed content and a clean, readable visual design
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, EXP-01, EXP-02, EXP-03, SKILL-01, EDU-01, CONTACT-01
**Success Criteria** (what must be TRUE):
  1. Visitor sees name, job title, and a specific 2–3 sentence professional summary immediately on page load without scrolling
  2. At least one contact or profile link (email or GitHub) is visible above the fold without scrolling
  3. Work history is displayed in reverse chronological order with company, title, dates, at least one quantified impact bullet, and tech stack per role
  4. Skills are grouped by honest proficiency tier — not a flat keyword list
  5. Achievements section shows competitive programming honors (IOI, ACM ICPC NEERC) and DS&A profiles; contact section includes email, GitHub, and LinkedIn links
**Plans**: TBD
**UI hint**: yes

### Phase 3: Polish & Meta
**Goal**: The page renders correctly on mobile, produces a clean print/PDF output, and is discoverable via search and link previews
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: POLISH-01, POLISH-02, POLISH-03
**Success Criteria** (what must be TRUE):
  1. Page renders in a single-column, readable layout at 375px width with no horizontal overflow
  2. Browser "Print to PDF" produces a clean, paginated CV document with no cut-off sections or broken layout
  3. Page has a tuned `<title>` and `<meta description>` containing the engineer's name, and Open Graph tags generate a correct link preview when shared on LinkedIn or Slack
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Deploy | 0/2 | Not started | - |
| 2. Content & Structure | 0/TBD | Not started | - |
| 3. Polish & Meta | 0/TBD | Not started | - |
