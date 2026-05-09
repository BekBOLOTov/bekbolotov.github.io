# Phase 2: Content & Structure - Pattern Map

**Mapped:** 2026-05-09
**Files analyzed:** 3 (index.html, style.css, script.js)
**Analogs found:** 2 / 3

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `index.html` | document (fill existing stubs) | request-response (static) | `index.html` Phase 1 scaffold (same file — extend, not replace) | exact |
| `style.css` | stylesheet (fill sections 3–12) | request-response (static) | `style.css` Phase 1 scaffold (same file — extend sections 3–12) | exact |
| `script.js` | progressive-enhancement script | event-driven (IntersectionObserver) | None — no JS files exist yet | No analog |

---

## Pattern Assignments

### `index.html` (document, fill-stubs)

**Analog:** `/Users/bolotbekbolotov/Documents/newdoc/index.html` (Phase 1 scaffold — same file, extend in place)

**Existing document structure pattern** (lines 1–52 — the entire scaffold):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bolot Bekbolotov — Software Engineer</title>
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
      ...
    </section>
    <section id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      ...
    </section>
    ...
  </main>

  <footer>
    <p>Bolot Bekbolotov</p>
  </footer>
</body>
</html>
```

**Critical constraint (from Phase 1):** Do NOT restructure `<main>` section order. Fill stubs in place.

---

#### Nav pattern — fill `<nav>` stub (index.html line 16)

Copy the `aria-label="Primary navigation"` already on the `<nav>`. Add anchor links inside:

```html
<nav aria-label="Primary navigation">
  <a href="#experience">Experience</a>
  <a href="#skills">Skills</a>
  <a href="#achievements">Achievements</a>
  <a href="#contact">Contact</a>
</nav>
```

Source decision: D-14, D-15. No `<ul>` wrapper — the UI-SPEC nav CSS targets `nav a` directly.

---

#### Hero section pattern — fill `#hero` stub (index.html lines 21–25)

Replace the entire `<section id="hero">` content with:

```html
<section id="hero" aria-label="Introduction">
  <div class="container">
    <h1>Bolot Bekbolotov</h1>
    <p class="hero-title">Mobile Developer</p>
    <p class="hero-summary">Mobile developer with 7 years of Android and Flutter experience. Built apps used by over 1 million users across e-payment, retail, and logistics platforms. IOI 2016/2017 participant and ACM ICPC NEERC 2018 finalist.</p>
    <div class="hero-links">
      <a href="mailto:bekbolotov.bolot@gmail.com">bekbolotov.bolot@gmail.com</a>
      <a href="https://github.com/BekBOLOTov" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/bolotbekbolotov/" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
</section>
```

Source: D-02 (no photo), D-03 (email/GitHub/LinkedIn only), D-04 (hero copy), UI-SPEC § Section 6.
**Note:** Keep `aria-label="Introduction"` (not `aria-labelledby`) — hero has no `<h2>`, the `<h1>` is the page title, not a section heading.

---

#### `<title>` and `<meta name="description">` update (index.html lines 6–7)

```html
<title>Bolot Bekbolotov — Mobile Developer</title>
<meta name="description" content="Mobile developer with 7 years of Android and Flutter experience. CV and contact information.">
```

Source: D-01, UI-SPEC Copywriting Contract.

---

#### Experience section pattern — fill `#experience` stub (index.html lines 27–30)

Established section structure: `aria-labelledby` + matching `id` on `<h2>` is already in the scaffold. Preserve this. Add `.container` wrapper and real content:

```html
<section id="experience" aria-labelledby="experience-heading">
  <div class="container">
    <h2 id="experience-heading">Experience</h2>

    <div class="experience-entry">
      <div class="experience-header">
        <span class="experience-company">MDigital</span>
        <span class="experience-role">Flutter Developer</span>
        <span class="experience-dates">Sep 2024 – present</span>
      </div>
      <ul>
        <li>Developed event managing app with calendar, chat, and credit score tracking — full cycle to store publishing</li>
        <li>Participated in development and support of classified apps with 1M+ users</li>
      </ul>
    </div>

    <div class="experience-entry">
      <div class="experience-header">
        <span class="experience-company">Mancho</span>
        <span class="experience-role">Flutter Developer</span>
        <span class="experience-dates">Jan 2024 – Sep 2024</span>
      </div>
      <ul>
        <li>Participated in development of e-payment system and brought it to market</li>
      </ul>
    </div>

    <div class="experience-entry">
      <div class="experience-header">
        <span class="experience-company">Breez Pro</span>
        <span class="experience-role">Android Developer</span>
        <span class="experience-dates">Jun 2021 – Oct 2023</span>
      </div>
      <ul>
        <li><strong>Kulikov</strong> — confectionery store app, 500k+ downloads; online cake ordering and bonus collection</li>
        <li><strong>Osmon Moving &amp; Storage</strong> — cargo company app; employee data, cargo records, expenses, salary calculation</li>
        <li><strong>Intersport</strong> — clothing store app; online shopping and bonus management</li>
        <li><strong>Hypermarket Globus</strong> — major Russian hypermarket, 1M+ downloads; online ordering, redesign, extracted features from archived code</li>
      </ul>
    </div>

    <div class="experience-entry">
      <div class="experience-header">
        <span class="experience-company">Ogogo</span>
        <span class="experience-role">Android Developer</span>
        <span class="experience-dates">Mar 2021 – Jun 2021</span>
      </div>
      <ul>
        <li>Taxi app: bug fixes, redesign, replaced sockets with Socket IO library</li>
      </ul>
    </div>

    <div class="experience-entry">
      <div class="experience-header">
        <span class="experience-company">NurTelecom</span>
        <span class="experience-role">Android Developer</span>
        <span class="experience-dates">Mar 2019 – Mar 2021</span>
      </div>
      <ul>
        <li>E-payment system for mobile company — 300k users, 1M+ downloads</li>
        <li>Features: loyalty card storage, subscriber registration, payment locations map, QR scanner, dark theme</li>
      </ul>
    </div>

  </div>
</section>
```

Source: D-05 (compact list, no cards), D-06 (Breez Pro sub-projects as flat bullets with `<strong>` project name), D-07 (impact stats), D-08 (Ogogo brief).

---

#### Skills section pattern — fill `#skills` stub (index.html lines 32–35)

```html
<section id="skills" aria-labelledby="skills-heading">
  <div class="container">
    <h2 id="skills-heading">Skills</h2>

    <div class="skills-tier">
      <p class="skills-tier-label">Expert</p>
      <div class="skills-tags">
        <span class="skill-tag">Kotlin</span>
        <span class="skill-tag">Dart</span>
        <span class="skill-tag">Flutter</span>
        <span class="skill-tag">Android SDK</span>
      </div>
    </div>

    <div class="skills-tier">
      <p class="skills-tier-label">Proficient</p>
      <div class="skills-tags">
        <span class="skill-tag">Java</span>
        <span class="skill-tag">Coroutines</span>
        <span class="skill-tag">Retrofit</span>
        <span class="skill-tag">Bloc</span>
        <span class="skill-tag">Room</span>
      </div>
    </div>

    <div class="skills-tier">
      <p class="skills-tier-label">Familiar</p>
      <div class="skills-tags">
        <span class="skill-tag">C++</span>
        <span class="skill-tag">Dagger 2</span>
        <span class="skill-tag">Socket IO</span>
        <span class="skill-tag">OkHttp</span>
        <span class="skill-tag">Hive</span>
      </div>
    </div>

  </div>
</section>
```

Source: D-09, D-10. Tags are `<span>` — no interactivity. Tier labels use `<p class="skills-tier-label">`.

---

#### Achievements section pattern — fill `#achievements` stub (index.html lines 37–40)

```html
<section id="achievements" aria-labelledby="achievements-heading">
  <div class="container">
    <h2 id="achievements-heading">Achievements</h2>

    <div class="achievements-group">
      <p class="achievements-group-heading">Competitive Programming</p>
      <ul>
        <li>3rd place, Republic Olympiad in Informatics — 2016</li>
        <li>3rd place, Republic Olympiad in Informatics — 2017</li>
        <li>International Olympiad in Informatics (IOI) — 2016, 2017 <a href="https://stats.ioinformatics.org/people/5946" target="_blank" rel="noopener">stats</a></li>
        <li>ACM ICPC NEERC (Northern Eurasia Finals) — 2018</li>
      </ul>
    </div>

    <div class="achievements-group">
      <p class="achievements-group-heading">Problem-Solving Profiles</p>
      <ul>
        <li>ACMP — 300+ problems <a href="https://acmp.ru/index.asp?main=user&amp;id=114567" target="_blank" rel="noopener">profile</a></li>
        <li>Codeforces — 400+ problems <a href="https://codeforces.com/profile/bekbolotov.bolot" target="_blank" rel="noopener">profile</a></li>
        <li>LeetCode — 100+ problems <a href="https://leetcode.com/bekbolotovBolot" target="_blank" rel="noopener">profile</a></li>
      </ul>
    </div>

  </div>
</section>
```

Source: D-11, D-12, D-13. IOI URL changed from `http://` to `https://` (Phase 1 pitfall rule: no http:// links).

---

#### Contact section pattern — fill `#contact` stub (index.html lines 42–45)

```html
<section id="contact" aria-labelledby="contact-heading">
  <div class="container">
    <h2 id="contact-heading">Contact</h2>
    <ul class="contact-list">
      <li>
        <span class="contact-label">Email</span>
        <a href="mailto:bekbolotov.bolot@gmail.com">bekbolotov.bolot@gmail.com</a>
      </li>
      <li>
        <span class="contact-label">GitHub</span>
        <a href="https://github.com/BekBOLOTov" target="_blank" rel="noopener">github.com/BekBOLOTov</a>
      </li>
      <li>
        <span class="contact-label">LinkedIn</span>
        <a href="https://www.linkedin.com/in/bolotbekbolotov/" target="_blank" rel="noopener">linkedin.com/in/bolotbekbolotov</a>
      </li>
    </ul>
  </div>
</section>
```

Source: D-03 (email/GitHub/LinkedIn only in hero — same three in contact), UI-SPEC § Section 10.

---

#### `<script defer>` tag — add before `</body>` (index.html line 51)

```html
  <script defer src="script.js"></script>
</body>
```

Source: UI-SPEC § JavaScript Contract. `defer` ensures script runs after DOM parse. Lowercase filename `script.js` matches Phase 1 naming rules.

---

### `style.css` (stylesheet, fill sections 3–12)

**Analog:** `/Users/bolotbekbolotov/Documents/newdoc/style.css` (Phase 1 scaffold — same file, fill stub sections)

**Existing anchor pattern** (style.css lines 1–42 — sections 1 and 2, complete, DO NOT MODIFY):

The section banner comments are the stable fill-in anchors:
```css
/* 3. TYPOGRAPHY ------------------------------------------ */
/* Phase 2 fills this section */

/* 4. LAYOUT ---------------------------------------------- */
/* Phase 2 fills this section */
```

Replace each `/* Phase 2 fills this section */` comment with the CSS block below. The section banner comment itself is kept as-is.

**Token usage rule (from style.css lines 14–42):** Every value MUST reference an existing custom property. The full token set available:

```
--color-text, --color-text-muted, --color-accent, --color-bg, --color-border
--font-body, --font-size-base, --font-size-sm, --font-size-lg, --font-size-xl, --font-size-2xl, --line-height
--space-1, --space-2, --space-3, --space-4, --space-6, --space-8, --space-12, --space-16
--max-width
```

---

#### Section 3: TYPOGRAPHY (style.css line 44–45)

```css
/* 3. TYPOGRAPHY ------------------------------------------ */
body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: var(--line-height);
}

h1 {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 var(--space-2) 0;
}

h2 {
  font-size: var(--font-size-xl);
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 var(--space-6) 0;
}

h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 var(--space-2) 0;
}

p {
  margin: 0 0 var(--space-4) 0;
}

a {
  color: var(--color-accent);
  text-decoration: underline;
}

a:hover,
a:focus {
  text-decoration: none;
}

ul {
  margin: 0 0 var(--space-4) 0;
  padding-left: var(--space-6);
}

li {
  margin-bottom: var(--space-2);
}
```

Source: UI-SPEC § Section 3.

---

#### Section 4: LAYOUT (style.css line 47–48)

```css
/* 4. LAYOUT ---------------------------------------------- */
.container {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--space-6);
}

main {
  padding-top: var(--space-8);
}

section {
  padding-block: var(--space-12);
  border-top: 1px solid var(--color-border);
}

section:first-of-type {
  border-top: none;
}
```

Source: UI-SPEC § Section 4.

---

#### Section 5: HEADER & NAV (style.css line 50–51)

```css
/* 5. HEADER & NAV ---------------------------------------- */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

nav {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--space-6);
  padding-block: var(--space-2);
  display: flex;
  gap: var(--space-6);
  align-items: center;
}

nav a {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  padding-bottom: var(--space-1);
  border-bottom: 2px solid transparent;
  transition: border-color 0.15s ease, color 0.15s ease;
}

nav a:hover,
nav a:focus {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

nav a.active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}
```

Source: UI-SPEC § Section 5. The `.active` class is toggled by `script.js` IntersectionObserver.

---

#### Section 6: HERO (style.css line 53–54)

```css
/* 6. HERO ------------------------------------------------ */
#hero {
  padding-block: var(--space-16);
  border-top: none;
}

.hero-title {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  font-weight: 400;
  margin: 0 0 var(--space-4) 0;
}

.hero-summary {
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  max-width: 600px;
  margin: 0 0 var(--space-6) 0;
  color: var(--color-text);
}

.hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
}

.hero-links a {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
}

.hero-links a:hover,
.hero-links a:focus {
  text-decoration: underline;
}
```

Source: UI-SPEC § Section 6.

---

#### Section 7: EXPERIENCE (style.css line 56–57)

```css
/* 7. EXPERIENCE ------------------------------------------ */
.experience-entry {
  margin-bottom: var(--space-8);
}

.experience-entry:last-child {
  margin-bottom: 0;
}

.experience-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.experience-company {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.experience-role {
  font-size: var(--font-size-base);
  font-weight: 400;
  color: var(--color-text-muted);
}

.experience-dates {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.experience-entry ul {
  margin: 0;
  padding-left: var(--space-6);
}

.experience-entry li {
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  margin-bottom: var(--space-2);
  color: var(--color-text);
}
```

Source: UI-SPEC § Section 7.

---

#### Section 8: SKILLS (style.css line 59–60)

```css
/* 8. SKILLS ---------------------------------------------- */
.skills-tier {
  margin-bottom: var(--space-6);
}

.skills-tier:last-child {
  margin-bottom: 0;
}

.skills-tier-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skill-tag {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: var(--space-1) var(--space-2);
  line-height: 1.4;
}
```

Source: UI-SPEC § Section 8.

---

#### Section 9: ACHIEVEMENTS (style.css line 62–63)

```css
/* 9. ACHIEVEMENTS ---------------------------------------- */
.achievements-group {
  margin-bottom: var(--space-8);
}

.achievements-group:last-child {
  margin-bottom: 0;
}

.achievements-group-heading {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-4);
}

.achievements-group ul {
  margin: 0;
  padding-left: var(--space-6);
}

.achievements-group li {
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  margin-bottom: var(--space-2);
  color: var(--color-text);
}

.achievements-group a {
  color: var(--color-accent);
  text-decoration: underline;
}

.achievements-group a:hover,
.achievements-group a:focus {
  text-decoration: none;
}
```

Source: UI-SPEC § Section 9.

---

#### Section 10: CONTACT / FOOTER (style.css line 65–66)

```css
/* 10. CONTACT / FOOTER ----------------------------------- */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-12) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-size: var(--font-size-base);
}

.contact-label {
  font-weight: 600;
  color: var(--color-text);
  min-width: 80px;
}

.contact-list a {
  color: var(--color-accent);
  text-decoration: underline;
}

.contact-list a:hover,
.contact-list a:focus {
  text-decoration: none;
}

footer {
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-8);
  text-align: center;
}

footer p {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin: 0;
}
```

Source: UI-SPEC § Section 10.

---

#### Section 11: UTILITIES (style.css line 68–69)

```css
/* 11. UTILITIES ------------------------------------------ */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

html {
  scroll-behavior: smooth;
}
```

Source: UI-SPEC § Section 11.

---

#### Section 12: MEDIA QUERIES (style.css line 71–72)

```css
/* 12. MEDIA QUERIES -------------------------------------- */
/* Phase 2: overflow guard only. Full responsive layout in Phase 3. */
@media (max-width: 600px) {
  .container {
    padding-inline: var(--space-4);
  }

  .experience-header {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    gap: var(--space-4);
    flex-wrap: wrap;
  }
}
```

Source: UI-SPEC § Section 12.

---

### `script.js` (progressive-enhancement, event-driven)

**Analog:** None — no JavaScript files exist in the project. No analog found.

**Pattern source:** UI-SPEC § JavaScript Contract (vanilla `IntersectionObserver`, no library).

**Full file pattern to create** (`script.js` at repo root):

```javascript
(function () {
  'use strict';

  var sections = ['experience', 'skills', 'achievements', 'contact'];
  var navLinks = {};

  sections.forEach(function (id) {
    var link = document.querySelector('nav a[href="#' + id + '"]');
    if (link) navLinks[id] = link;
  });

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.id;
      if (navLinks[id]) {
        if (entry.isIntersecting) {
          Object.values(navLinks).forEach(function (l) { l.classList.remove('active'); });
          navLinks[id].classList.add('active');
        }
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}());
```

Key constraints:
- `defer` attribute on `<script>` tag in HTML — DOM is ready when script runs
- Wrapped in IIFE to avoid polluting global scope
- Feature-detects `IntersectionObserver` — if absent (old browsers), returns early; page is still functional
- `threshold: 0.2` — section fires `.active` when 20% visible (matches UI-SPEC)
- Removes `.active` from all nav links before adding to current — prevents multiple active states
- No ES6+ syntax (arrow functions, const/let) — widest browser compat with zero transpile step
- Filename: `script.js` (lowercase, matches href in `<script src="script.js">`)

---

## Shared Patterns

### `.container` wrapper — apply to every section

**Source:** `style.css` section 4 (UI-SPEC) and `index.html` Phase 1 scaffold
**Apply to:** All `<section>` and `<header>` inner content in `index.html`

Every section's content (including `<header><nav>`) must be inside a `<div class="container">` to apply the `--max-width: 760px` constraint. The `<section>` and `<header>` elements themselves are full-width; `.container` is the centering wrapper.

Exception: `<nav>` uses its own `max-width`/`margin-inline`/`padding-inline` rules in CSS section 5 — the `<nav>` itself acts as the container for the header; no extra `.container` div is needed in `<header>`.

---

### `aria-labelledby` accessibility pattern — apply to sections with headings

**Source:** `index.html` Phase 1 scaffold (lines 27, 32, 37, 42)
**Apply to:** `#experience`, `#skills`, `#achievements`, `#contact` — all sections with an `<h2>`

```html
<section id="experience" aria-labelledby="experience-heading">
  <h2 id="experience-heading">Experience</h2>
```

The `id` on `<h2>` must match the `aria-labelledby` value on `<section>`. Hero uses `aria-label="Introduction"` instead (no `<h2>` in hero).

---

### External link safety — apply to all outbound `<a>` tags

**Source:** Phase 1 PATTERNS.md § Naming and Path Safety Rules
**Apply to:** All `<a>` tags pointing to external URLs (`github.com`, `linkedin.com`, `codeforces.com`, `acmp.ru`, `leetcode.com`, `stats.ioinformatics.org`)

```html
<a href="https://..." target="_blank" rel="noopener">link text</a>
```

Rules:
- All URLs use `https://` — never `http://`
- `target="_blank"` + `rel="noopener"` on every external link
- `mailto:` links do NOT use `target="_blank"`

---

### CSS custom property usage — apply to all style.css sections 3–12

**Source:** `style.css` lines 14–42 (`:root` token block)
**Apply to:** Every CSS rule in sections 3–12

No hardcoded color, size, or spacing values. Every value must reference a `--variable`. Hardcoded exceptions: `z-index: 100`, `border-radius: 4px`, `letter-spacing: 0.05em`, `transition: ... 0.15s ease`, `line-height: 1.2/1.3/1.4` (these are unitless ratios, not design token candidates).

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `script.js` | progressive-enhancement script | event-driven (IntersectionObserver) | No JS files exist in the project. Pattern sourced from UI-SPEC § JavaScript Contract. |

---

## Metadata

**Analog search scope:** `/Users/bolotbekbolotov/Documents/newdoc` (all non-planning, non-git files)
**Files scanned:** 5 (`index.html`, `style.css`, `CLAUDE.md`, `cv-source.pdf`, `assets/.gitkeep`) — 2 are source analogs, 1 is project instructions, 2 are non-code
**Pattern extraction date:** 2026-05-09
**Pattern source:** index.html and style.css Phase 1 scaffolds (same files extended in Phase 2); UI-SPEC for all CSS section contracts; CONTEXT.md for all content decisions (D-01 through D-18)
