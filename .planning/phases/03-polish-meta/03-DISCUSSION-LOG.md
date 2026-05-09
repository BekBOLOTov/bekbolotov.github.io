# Phase 3: Polish & Meta - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-09
**Phase:** 3-Polish & Meta
**Areas discussed:** Scope routing, CV content (Breez Pro reframe, role detail, skills), Mobile breakpoints, Sticky nav at 375px, Print stylesheet (hides, URLs, page breaks), OG image, JSON-LD, Meta description

---

## Scope Routing — CV content updates raised mid-discussion

| Option | Description | Selected |
|--------|-------------|----------|
| Insert Phase 2.1 first | Create Phase 2.1 'CV content update' before Phase 3. Proper GSD workflow. | |
| Quick edit now via /gsd-quick | Skip phase machinery, edit inline now, return to Phase 3. | |
| Expand Phase 3 to include content | Widen Phase 3 scope to mobile + print + SEO + content. | ✓ |
| Defer CV update, proceed with Phase 3 | Note as deferred, continue with 4 polish gray areas. | |

**User's choice:** Expand Phase 3 to include content
**Notes:** User is the founder; called scope expansion. Trade-off: mixes domains in one phase, harder to verify atomically. ROADMAP and REQUIREMENTS.md need updating to reflect expanded scope.

---

## Breez Pro reframe

| Option | Description | Selected |
|--------|-------------|----------|
| Project-type bullets (no client names) | e.g. 'Built confectionery e-commerce app (500k+ downloads)' | ✓ |
| Single summary bullet + tech depth | One bullet summarizing scope + 2-3 bullets on technical contribution | |
| Skill / responsibility framing | Reframe as engineering activities | |

**User's choice:** Project-type bullets, no client names
**Notes:** Keeps scale numbers, drops client identifiers.

---

## Per-role detail type (multi-select)

| Option | Description | Selected |
|--------|-------------|----------|
| Tech stack inline per role | Add 'Stack: …' line per role | ✓ |
| Specific features / modules built | Expand bullets with concrete features | ✓ |
| Quantified impact numbers | Add metrics where missing | |
| Architecture / ownership scope | Note ownership level | |

**User's choice:** Tech stack inline + specific features
**Notes:** Plus user-added: "we can add more skills, skills are presented now not enough to show how good i am" — drove the Skills section expansion + tier collapse.

---

## MDigital detail gathering

| Option | Description | Selected |
|--------|-------------|----------|
| I'll dump details freely | User writes paragraph; Claude composes | ✓ (then changed) |
| Suggest a structure for me to fill | Fill-in-the-blank template | |
| Use Phase 2 content + add stack only | Keep current bullets, append stack | |

**User's choice:** Initially "dump freely", then asked Claude to "draft from what's already there".
**Notes:** Claude drafted all 5 roles from existing Phase 2 CONTEXT data + sane stack inference. User confirmed all role drafts in one batch.

---

## Skills extension

| Option | Description | Selected |
|--------|-------------|----------|
| Confirm as-is | Lock 4 Expert / 11 Proficient / 11 Familiar | |
| I'll add specific skills | User specifies items + tier | |
| You suggest more candidates by tier | Claude proposes pool, user picks | ✓ |

**User's choice:** Suggest more candidates
**Notes:** Claude proposed ~80 candidate skills across 10 categories. User picked: Hilt, Koin, GetIt, ViewModel, LiveData, Clean Architecture, MVVM, MVI, SharedPreferences, Drift, flutter_test, bloc_test, Fastlane, Material 3, Cupertino, animations, custom widgets, FCM push, deep linking, in-app purchases, Google Sign-In, GraphQL with Apollo.

---

## Skills tier model

| Option | Description | Selected |
|--------|-------------|----------|
| Lock 3-tier draft as-is | 4 Expert / 26 Proficient / 15 Familiar | |
| I'll move some items | User adjusts tiers | |
| Drop a few, keep cleaner list | Tighter list, fewer items | |

**User's choice:** Off-menu — "maybe we combine familiar and proficient?"
**Notes:** Followed up with tier-naming question. User picked Expert / Proficient labels. Phase 2 D-09 (3-tier model) is superseded.

---

## Tier naming (after merge decision)

| Option | Description | Selected |
|--------|-------------|----------|
| Expert / Proficient | Standard labels | ✓ |
| Core / Working knowledge | Softer second-tier label | |
| Primary / Used in production | Concrete, matches PITFALL-2 wording | |

**User's choice:** Expert / Proficient

---

## Mobile breakpoint strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Keep desktop-first, expand 600px block (Recommended) | Continue Phase 2 pattern, no rewrite | ✓ |
| Add 2nd breakpoint at 375px | Two blocks: 600px (tablet) + 375px (small phone) | |
| Switch to mobile-first (rewrite) | min-width-based, cleaner long-term, regression risk | |

**User's choice:** Keep desktop-first, expand existing block
**Notes:** Lowest-churn path, preserves Phase 2 token-based scaffold.

---

## Sticky nav at 375px

| Option | Description | Selected |
|--------|-------------|----------|
| Keep wrap, accept 2 rows | Phase 2 default behavior | |
| Horizontal scroll, single row (Recommended) | overflow-x: auto + flex-wrap: nowrap | ✓ |
| Hide nav on mobile | display: none at small viewport | |
| Hamburger toggle | JS toggle button + dropdown | |

**User's choice:** Horizontal scroll
**Notes:** Phase 2 D-15 `flex-wrap: wrap` is superseded for ≤ 600px breakpoint.

---

## Print stylesheet — hide what (multi-select)

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky nav (header) | Hide entirely on print | ✓ |
| Footer | Hide footer | ✓ |
| Section borders / dividers | Remove section border-top | ✓ |
| Background colors / accent color | Force black-on-white | ✓ |

**User's choice:** All four

---

## Print URL handling

| Option | Description | Selected |
|--------|-------------|----------|
| Append URL in parens after link text (Recommended) | a[href]:after { content: ' (' attr(href) ')' } | ✓ |
| Leave as plain text, no URL | URLs lost on paper | |
| URLs only for external profile links | Selective append | |

**User's choice:** Append URL for all links, with exceptions for mailto and internal anchors (Claude's discretion)

---

## Page-break behavior

| Option | Description | Selected |
|--------|-------------|----------|
| page-break-inside: avoid on .experience-entry (Recommended) | Each role stays on one page if it fits | ✓ |
| No constraint, browser default | Roles can split | |
| page-break-after on each role | Each role on its own page | |

**User's choice:** page-break-inside: avoid

---

## Open Graph image strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Skip og:image | No image to maintain, blank LinkedIn preview | |
| Static text card PNG (1200×630) (Recommended) | Generate one PNG, commit to assets/ | ✓ |
| Auto-generated SVG inline | Complex without build step | |

**User's choice:** Static PNG card

---

## JSON-LD Person schema

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, full Person schema (Recommended) | name + jobTitle + sameAs + email | ✓ |
| Skip JSON-LD | Title/meta only | |
| Minimal Person (name + jobTitle only) | Smaller schema | |

**User's choice:** Full Person schema

---

## Meta description rewrite

| Option | Description | Selected |
|--------|-------------|----------|
| Rewrite to include full name (Recommended) | Name + scale signal + IOI/ACM ICPC | ✓ |
| Keep current | Generic, no name | |
| Rewrite shorter, name + title only | Minimal | |

**User's choice:** Rewrite with full name + scale + competitive programming signal

---

## Claude's Discretion

- Exact OG card PNG composition (font weights, accent stripe placement, padding)
- Whether to add `theme-color` meta tag
- Whether to add `<link rel="canonical">`
- Scrollbar-hiding fallback for older browsers on horizontal-scroll nav
- `prefers-reduced-motion` guard around `scroll-behavior: smooth`
- Section-by-section `--space-*` adjustments at 375px
- Print URL appending exceptions for `mailto:` and `#anchor` hrefs

## Deferred Ideas

- Favicon (v2)
- Custom domain (v2)
- robots.txt + sitemap.xml
- Lighthouse audit gate (≥ 90 accessibility)
- Phone + Telegram in contact section
- Education section
- Self-hosted Inter font
