# Phase 2: Content & Structure - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Author all CV sections with real content and apply full visual design. After this phase, `bekbolotov.github.io` shows a complete, credible CV for Bolot Bekbolotov — a 7-year Android/Flutter developer. No new HTML structure beyond what the Phase 1 scaffold defines. Phase 3 handles mobile layout, print stylesheet, and SEO meta.

</domain>

<decisions>
## Implementation Decisions

### Identity & Title
- **D-01:** Job title on page = "Mobile Developer" (not "Software Engineer" — update `<title>` tag and `<h1>` subtitle)
- **D-02:** No profile photo — text-only hero
- **D-03:** Hero contact links above fold: Email + GitHub + LinkedIn only (not phone/Telegram in hero)
  - Email: bekbolotov.bolot@gmail.com
  - GitHub: https://github.com/BekBOLOTov
  - LinkedIn: https://www.linkedin.com/in/bolotbekbolotov/

### Hero Summary
- **D-04:** Claude writes the hero summary from the pasted CV content. Target: 2–3 sentences, specific — domain (mobile), scale (1M+ users), depth signal (IOI, competitive programming). Generic phrases like "great problem solver" are banned. Draft to use:
  > "Mobile developer with 7 years of Android and Flutter experience. Built apps used by over 1 million users across e-payment, retail, and logistics platforms. IOI 2016/2017 participant and ACM ICPC NEERC 2018 finalist."

### Experience Section
- **D-05:** Compact list layout — company + title + date range on header line, bullets below. No cards, no timeline.
- **D-06:** Breez Pro (Jun 2021–Oct 2023) has 4 sub-projects (Kulikov, Osmon Moving, Intersport, Globus). Display as flat bullets under the role — project name bolded inline, impact stat on same line. No sub-headings.
- **D-07:** Impact-frame bullets where possible. Notable stats to surface:
  - MDigital: 1M-user classified apps
  - Kulikov (Breez Pro): 500k+ downloads
  - Globus (Breez Pro): 1M+ downloads
  - NurTelecom: 300k users, 1M+ downloads
  - Mancho: brought e-payment to market (300 users — small, de-emphasize)
- **D-08:** Ogogo (3 months) — include but keep brief (2 bullets max)

### Skills Section
- **D-09:** Group by proficiency tier: Expert / Proficient / Familiar. Claude assigns tiers from usage patterns in the CV:
  - **Expert:** Kotlin, Dart, Flutter, Android SDK
  - **Proficient:** Java, Coroutines, Retrofit, Bloc, Room
  - **Familiar:** C++, Dagger 2, Socket IO, OkHttp, Hive
- **D-10:** Display as inline tag groups per tier — not a table, not a list. Scannable.

### Achievements Section
- **D-11:** Two sub-sections: Competitive Programming Honors and DS&A Profiles
- **D-12:** Honors list:
  - 3rd place, Republic Olympiad in Informatics — 2016
  - 3rd place, Republic Olympiad in Informatics — 2017
  - International Olympiad in Informatics (IOI) — 2016, 2017
  - ACM ICPC NEERC (Northern Eurasia Finals) — 2018
  - IOI stats link: http://stats.ioinformatics.org/people/5946
- **D-13:** DS&A profiles with problem counts:
  - ACMP: 300+ problems — https://acmp.ru/index.asp?main=user&id=114567
  - Codeforces: 400+ problems — https://codeforces.com/profile/bekbolotov.bolot
  - LeetCode: 100+ problems — https://leetcode.com/bekbolotovBolot

### Navigation
- **D-14:** Sticky header with smooth-scroll section links: Experience | Skills | Achievements | Contact
- **D-15:** Nav links anchor to: `#experience`, `#skills`, `#achievements`, `#contact`

### Visual Design
- **D-16:** Clean typographic aesthetic — white background, Inter font, thin dividers, generous whitespace. Accent color (#2563eb) used for links and section markers only, not heavy color blocks.
- **D-17:** Apply styles to all 12 CSS sections that are currently placeholder comments in style.css

### Content Provenance
- **D-18:** All content pasted by user on 2026-05-09 (see `<specifics>` section). Executor uses this directly — no content placeholder slots needed.

### Claude's Discretion
- Exact `<title>` tag wording (update to "Bolot Bekbolotov — Mobile Developer")
- Section divider style (thin `<hr>` or border-top on section heading)
- Exact spacing between experience entries
- Whether to add `aria-label` to nav links
- Footer content (keep "Bolot Bekbolotov" or add year/email)
- NEERC archive link placement (inline with achievement or footnote)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — project goals, single-page constraint, no JS frameworks
- `.planning/REQUIREMENTS.md` — HERO-01/02/03, EXP-01/02/03, SKILL-01, EDU-01, CONTACT-01
- `.planning/ROADMAP.md` — Phase 2 success criteria

### Phase 1 Foundation
- `.planning/phases/01-foundation-deploy/01-01-PLAN.md` — defines the HTML structure executor must fill (section IDs, CSS token names)
- `style.css` — existing design tokens to use: `--color-text`, `--color-accent`, `--color-bg`, `--color-border`, `--font-body`, `--space-*`, `--max-width: 760px`
- `index.html` — existing scaffold to update (not replace)

### Research
- `.planning/research/STACK.md` — confirmed stack constraints (no frameworks, no build step)
- `.planning/research/PITFALLS.md` — deployment pitfalls (avoid http:// links, no script in head)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `style.css`: 19 design tokens in `:root` — all section styles MUST use these variables, not hardcoded values
- `assets/` directory: ready for future images (Phase 1 created `.gitkeep`)

### Established Patterns
- HTML: semantic sections with `aria-labelledby` pattern (set in Phase 1 scaffold — follow it)
- CSS: section comment banners already in place (sections 3–12 are stubs awaiting content)
- No JavaScript in Phase 1 — smooth scroll via CSS `scroll-behavior: smooth` on `html`, or vanilla JS `<script defer>` if needed for sticky nav active state
- All `href`/`src` values must be lowercase and relative (absolute for external links only)

### Integration Points
- `index.html`: fill existing stubs — do NOT restructure the `<main>` section order
- `style.css`: fill sections 3–12 with real CSS — sections 1 and 2 (reset + tokens) are complete, do not modify
- Sticky nav fills the `<nav>` stub in `<header>` from Phase 1

</code_context>

<specifics>
## Specific Ideas

### Full CV Content (pasted by user 2026-05-09)

```
Name: Bolot Bekbolotov
Title: Mobile Developer
Email: bekbolotov.bolot@gmail.com
Phone: +996707020464
LinkedIn: https://www.linkedin.com/in/bolotbekbolotov/
GitHub: https://github.com/BekBOLOTov
Telegram: @bekbolotovBolot

Technologies:
  Languages: C++, Java, Kotlin, Dart
  Frameworks: OkHttp, Retrofit, Room, Dagger 2, Socket IO, Coroutines, Flutter, Bloc, Hive

Experience:

MDigital — Bishkek, Kyrgyzstan | Sep 2024 – present (18 months) | Flutter developer
- Developed event managing app with calendar, chat, credit score tracking — full cycle to store publishing
- Participated in development and support of classified apps with 1M+ users

Mancho — Bishkek, Kyrgyzstan | Jan 2024 – Sep 2024 (9 months) | Flutter developer
- Participated in development of e-payment system, brought to market (300 users)

Breez Pro — Bishkek, Kyrgyzstan | Jun 2021 – Oct 2023 (2y 5mo) | Android developer
- Kulikov: confectionery store app — 500k+ downloads; online cake ordering and bonus collection
- Osmon Moving&Storage: cargo company app — employee data, cargo records, expenses, salary calculation
- Intersport: clothing store app — online shopping and bonus management
- Hypermarket Globus: major Russian hypermarket — 1M+ downloads; online ordering, redesign, extracted features from archived code

Ogogo — Bishkek, Kyrgyzstan | Mar 2021 – Jun 2021 (3 months) | Android developer
- Taxi app: bug fixes, redesign, replaced sockets with Socket IO library

NurTelecom — Bishkek, Kyrgyzstan | Mar 2019 – Mar 2021 (2y) | Android developer
- E-payment system for mobile company — 300k users, 1M+ downloads
- Features: loyalty card storage, subscriber registration, payment locations map, QR scanner, dark theme

Achievements:
- 3rd place, Republic Olympiad in Informatics — 2016
- 3rd place, Republic Olympiad in Informatics — 2017
- International Olympiad in Informatics (IOI) — 2016, 2017
  Link: http://stats.ioinformatics.org/people/5946
- ACM ICPC NEERC (Northern Eurasia Finals) — 2018
  Archive: https://neerc.ifmo.ru/archive/2017/standings.html

DS&A Profiles:
- ACMP: 300+ problems — https://acmp.ru/index.asp?main=user&id=114567
- Codeforces: 400+ problems — https://codeforces.com/profile/bekbolotov.bolot
- LeetCode: 100+ problems — https://leetcode.com/bekbolotovBolot
```

</specifics>

<deferred>
## Deferred Ideas

- Phone number (+996707020464) and Telegram (@bekbolotovBolot) — not in hero, could appear in contact section footer if desired; not required by CONTACT-01
- Education section — not in pasted CV; no university info provided. Omit from Phase 2.
- NEERC archive URL (https://neerc.ifmo.ru/archive/2017/standings.html) — include as footnote link in achievements if space allows, not required

</deferred>

---

*Phase: 2-Content & Structure*
*Context gathered: 2026-05-09*
