# alarvork.com — Website Build Brief

This is the authoritative brief for building **alarvork.com**. Build the site exactly as described here. Every decision is already made — do not choose between alternatives, introduce other libraries, change the colour palette, or rewrite the copy. Work through the milestones in order; satisfy each milestone's acceptance criteria before moving to the next; commit after each.

**References (in `docs/`):**
- `Alar_Vork_Website_Build_Spec_2026-06-15.md` — architecture, design system, and the final page-by-page copy. **All page text comes from here** (and the copy file below). Do not invent or paraphrase copy.
- `Alar_Vork_Website_Copy_Polished_2026-06-15.md` — source copy blocks.
- `scheme3_reference.html` — the authoritative colour palette (Scheme 3).

**Persistent rules:** `.cursor/rules/project.mdc` applies to every change.

---

## 1. What is being built

A 5-page static marketing website for Alar Võrk, a B2B sales consultant positioned as a **Sales Architect**, whose flagship offer is the *Mechanics of the Sales Engine™* programme (keynote + workshop), supported by consulting services. Audience: founders and SME leaders, plus heads of accelerators/incubators in Estonia, Finland and Sweden. Primary conversion goal sitewide: **book a free 30-minute call**.

Pages: Home (`/`), Mechanics of the Sales Engine (`/programme`), Consulting (`/consulting`), About (`/about`), Contact (`/contact`), plus a minimal `/thank-you` page.

Language: English (British spelling) only. Structure the project so an `/et/` Estonian version could be added later, but do not build it now.

---

## 2. Stack and environment

- **Astro 5+**, static output (the default — do **not** add an SSR adapter).
- **TypeScript**, strict.
- **Tailwind CSS**, installed via Astro's official integration (`npx astro add tailwind`, accept all prompts — this wires the correct setup for the installed versions automatically).
- **`@astrojs/sitemap`** for the sitemap.
- **No React/Vue or other UI frameworks.** All interactivity is vanilla JS/CSS.
- Node 20 LTS is assumed to be installed. Dev server runs at `http://localhost:4321`.

---

## 3. External inputs (provided by the site owner, not the builder)

These are placeholders in the build. Do not block on them; wire them through `src/consts.ts` with clearly-marked placeholder values:
- `public/fonts/Satoshi-Variable.woff2` — the Satoshi variable font file (owner supplies; reference it via `@font-face`).
- `CALENDLY_URL`, `WEB3FORMS_KEY`, `GA_ID` — Calendly event URL, Web3Forms access key, GA4 Measurement ID.
- Real photography to replace image placeholders.
- GoDaddy FTP credentials, stored as GitHub repo secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (used by the deploy workflow).

---

## 4. Milestones

### Milestone 1 — Scaffold
**Goal:** A running Astro + Tailwind + TypeScript project, committed to git.
**Build:**
- Scaffold Astro with the **minimal** template, TypeScript **strict**, dependencies installed, git initialised. Project lives in this repo root.
- Add Tailwind via `npx astro add tailwind`; add `@astrojs/sitemap` via `npx astro add sitemap`.
- Set `site: 'https://www.alarvork.com'` in `astro.config.mjs`. Keep static output (no adapter).
- Create the folder structure in **Appendix B** (the `docs/`, `.cursor/`, `public/fonts`, `public/images` folders already exist — do not overwrite them).
- Add no dependencies beyond the above.
**Acceptance:** `npm run dev` serves with no errors; a Tailwind utility class renders; `astro.config.mjs` has the correct `site`, Tailwind and sitemap integrations.

### Milestone 2 — Design system (tokens, fonts, base layout)
**Goal:** Brand tokens and fonts wired into Tailwind; a `BaseLayout` every page uses.
**Build:**
- Extend the Tailwind theme with the **exact tokens in Appendix C** (Scheme 3 colours + font families). Use no other palette.
- **Fonts:** install Nunito Sans variable as a dependency (`@fontsource-variable/nunito-sans`) and import it in `BaseLayout`. Add an `@font-face` for Satoshi pointing at `/fonts/Satoshi-Variable.woff2` (family `Satoshi`, `font-display: swap`, weight range 300–900). Set `fontFamily.sans` to the Nunito Sans stack and `fontFamily.display` to the Satoshi stack.
- `src/styles/global.css`: base resets, the `@font-face`, default body `bg-canvas text-charcoal font-sans`, headings `font-display text-navy`.
- `src/layouts/BaseLayout.astro`: `<html lang="en">`, a `<head>` accepting props `title`, `description`, `path` (canonical/OG), a slot for page content, and slots/usage for `Header`, `Footer`, and a `CtaBand` above the footer. (GA + consent are added in Milestone 8.)
- Apply the type scale and spacing from Build Spec §5.2.
**Acceptance:** headings render in Satoshi and body in Nunito Sans with no console font errors; Scheme 3 colours are available as Tailwind classes (`bg-navy`, `bg-amber`, `text-charcoal`, etc.); a test page using `BaseLayout` shows header + footer + CTA band.

### Milestone 3 — Shared components
**Goal:** All reusable components.
**Build:**
- `Header.astro`: sticky; wordmark "Alar Võrk — Sales Architect" (links home); nav links Programme / Consulting / About / Contact; an **amber Book a call** button linking to `CALENDLY_URL`. Accessible hamburger toggle below 768px (`aria-expanded`, keyboard-operable).
- `Footer.astro`: short bio line; nav repeat; `alar@alarvork.com`; `+372 511 7614`; LinkedIn (`https://www.linkedin.com/in/alarvork/`); Privacy Policy link; "© 2025 Abacto Consulting".
- `CtaBand.astro`: solid navy band; headline prop; amber **Book a free 30-minute call** button.
- `ProofStrip.astro`: the four stats (30+ years · 10+ markets · 90%+ tender win rate · 227% of target in a recession) + the accounts sub-line, content verbatim from Build Spec §6.1. Horizontal on desktop, stacked on mobile.
- `Button.astro`: variants `accent` (amber — the Book-a-call CTA), `primary` (navy), `secondary` (transparent with pewter/white outline). Props: `href`, `variant`, slot label.
- `Section.astro`: padded section wrapper with optional `tone` prop (`canvas` | `navy`).
- `src/consts.ts`: central constants — `CALENDLY_URL`, `WEB3FORMS_KEY`, `GA_ID`, `EMAIL`, `PHONE`, `LINKEDIN` — using the placeholder values in Appendix D.
**Acceptance:** header sticky and mobile hamburger keyboard-operable; footer/contact details correct; ProofStrip shows the exact stats and accounts line; buttons use only token colours.

### Milestone 4 — Home page (`/`)
**Goal:** `src/pages/index.astro` from Build Spec §6.1.
**Build:** hero (solid navy, H1 "Build the machine that sells.", sub-line, amber primary CTA + secondary "See the programme →"); ProofStrip; "A Sales Architect" intro; three "What I do" cards linking to `/consulting`; navy Programme teaser linking to `/programme`; condensed Assess/Design/Build; CtaBand. Use `BaseLayout` with the home title/description from Build Spec §7.
**Acceptance:** copy matches §6.1 verbatim; responsive; one `<h1>`.

### Milestone 5 — Mechanics of the Sales Engine (`/programme`)
**Goal:** The flagship page from Build Spec §6.2.
**Build:** hero; "The problem"; "The insight"; the **five modules** as stacked cards (title, one-line promise, keynote-vs-workshop note); "How it's delivered"; "Who it's for" three cards; ProofStrip; CtaBand with amber **Book a free 30-minute call** + a secondary "Request the programme overview (PDF)" linking to `#` for now. Route file `src/pages/programme.astro`.
**Acceptance:** all five modules present with correct copy; one `<h1>`; page validates.

### Milestone 6 — Consulting (`/consulting`) and About (`/about`)
**Goal:** Two pages from Build Spec §6.3 and §6.4.
**Build:**
- **Consulting:** hero; six service cards (title, one-line, bullets, deliverable) from §6.3; **no pricing anywhere**; "Why work with me"; CtaBand.
- **About:** hero; two-column story (portrait placeholder `/images/alar-portrait.jpg` with descriptive alt + text) from §6.4; "What I believe" three points; ProofStrip; CtaBand.
**Acceptance:** Consulting shows all six services and zero prices; About copy verbatim; placeholders have real alt text.

### Milestone 7 — Contact (`/contact`) with Web3Forms + Calendly
**Goal:** Working booking + form per Build Spec §6.5.
**Build:**
- **Calendly** inline embed using `CALENDLY_URL` (left column "Book a call").
- **Web3Forms** form (right column): fields First name*, Last name*, Position, Company, Email*, Message*; POST to `https://api.web3forms.com/submit` with a hidden `access_key` = `WEB3FORMS_KEY`, a hidden honeypot `botcheck` field, and `redirect` to a new minimal `/thank-you` page. Accessible labels; client-side required-field validation.
- Direct details block (email, phone, LinkedIn) and "What to expect" copy from §6.5.
**Acceptance:** with a real key, submitting emails `alar@alarvork.com` and lands on `/thank-you`; Calendly widget loads; form is keyboard-accessible.

### Milestone 8 — SEO, analytics, consent, structured data
**Goal:** Production-ready head and compliance.
**Build:**
- Unique `title` + `description` per page (from Build Spec §7), canonical URL, Open Graph + Twitter tags in `BaseLayout` (OG image `/images/og-default.jpg` placeholder).
- **GA4** via `GA_ID`, loaded **only after cookie consent**: a minimal, keyboard-accessible vanilla consent banner; on Accept set a `localStorage` flag and inject gtag; on Decline do not load GA.
- **JSON-LD**: `Person` (Alar Võrk) and `ProfessionalService` (name "Abacto Consulting", url, email, telephone) sitewide; a `Course`/`Service` block on `/programme`.
- Sitemap via `@astrojs/sitemap`; `public/robots.txt` allowing all and pointing to the sitemap.
- Every page `robots` meta = `index,follow` (the previous Wix site had `noindex` — this must not recur).
**Acceptance:** view-source shows unique titles/descriptions, canonical, OG, and JSON-LD; GA fires only after Accept; sitemap and robots reachable.

### Milestone 9 — Interactivity & motion (vanilla-first)
**Goal:** Restrained, purposeful motion that reinforces the "clarity and structure" brand. No React, no heavy/WebGL backgrounds.
**Hard rules:**
- Vanilla JS + CSS only. (React/ReactBits is out of scope here and may only be reconsidered later for a single effect that is genuinely impractical in vanilla.)
- Wrap every animation in `@media (prefers-reduced-motion: no-preference)`. With reduced motion enabled, all content renders fully in its final state, instantly, with no animation.
- Zero layout shift: reserve final space; animate only `opacity` and `transform`.
- All motion JS in one deferred file `src/scripts/motion.js`, imported once in `BaseLayout`, target < 3 KB; nothing here may delay LCP.
- Implement exactly the four effects below — no more.
**Build:**
1. **Scroll-reveal** — `[data-reveal]` elements start at `opacity:0; translateY(16px)` and transition in when they enter the viewport, via one shared `IntersectionObserver` (threshold ~0.15) that adds `.in-view` then unobserves. Apply to: each section heading, the three "What I do" cards, the five module cards, and the service cards. Stagger cards (~60ms × index) via `data-reveal-index`/inline `transition-delay`.
2. **Stat count-up (ProofStrip)** — each stat counts from 0 to target once, when the strip enters view. Drive formatting with data attributes: `data-countup`, `data-countup-to`, optional `data-countup-prefix`/`-suffix`. Values: `30` suffix `+ years`; `10` suffix `+ markets`; `90` suffix `%+ win rate`; `227` suffix `% of target`. ~1.2s ease-out via `requestAnimationFrame`. Reduced motion → final value immediately.
3. **Hero headline reveal** — CSS-only fade-up of the H1 and sub-line on load (~500ms, slight stagger), via `@keyframes` gated by the reduced-motion media query.
4. **Header on scroll** — vanilla: after `window.scrollY > 8`, add `.scrolled` to the sticky header (subtle bottom shadow + slightly tighter padding), throttled with `requestAnimationFrame`.
**Acceptance:** all four effects work and feel subtle (no bounce/parallax/large movement); OS "Reduce motion" disables animation and shows final states immediately; Lighthouse (mobile) Performance ≥ 90 and CLS ≈ 0 on every page; no new dependencies; no React.

### Milestone 10 — Deploy pipeline (GitHub Actions → GoDaddy FTP)
**Goal:** A push to `main` builds and deploys to GoDaddy automatically.
**Build:**
- `.github/workflows/deploy.yml`: on push to `main`, checkout → set up **Node 20** → `npm ci` → `npm run build` → deploy with **`SamKirkland/FTP-Deploy-Action@v4.3.5`**, `local-dir: ./dist/`, `server-dir: /public_html/`, using secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`. Use no other deploy method.
**Acceptance:** the workflow runs green on push and the built site appears in GoDaddy `public_html`. (At go-live the owner repoints DNS per Build Spec §3, preserving the Google Workspace MX/SPF/DKIM records — email stays on Google Workspace.)

### Milestone 11 — QA & go-live
**Goal:** Quality gate.
**Build/verify:**
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on every page.
- Keyboard-only pass through header, form, and consent banner; visible focus; correct heading order.
- Cross-browser: Chrome, Safari, Firefox, Edge + iOS Safari + Android Chrome.
- No dead links; `mailto:` , `tel:+3725117614`, LinkedIn, Calendly and the form all work.
- Fix any issues found without changing approved copy or design tokens. (Real photography replaces placeholders before public launch — owner action.)

---

## Appendix A — Persistent rules
See `.cursor/rules/project.mdc` (already in the repo). It is the short, always-on version of these constraints.

## Appendix B — Folder structure
```
alarvork-webapp/
├─ AGENTS.md
├─ BUILD_INSTRUCTIONS.md
├─ .cursor/rules/project.mdc        (exists)
├─ .github/workflows/deploy.yml
├─ docs/                            (exists — build spec, copy, scheme3 reference)
├─ public/
│  ├─ fonts/Satoshi-Variable.woff2  (owner supplies the file)
│  ├─ images/                       (alar-portrait.jpg, og-default.jpg, etc.)
│  └─ robots.txt
├─ src/
│  ├─ consts.ts
│  ├─ scripts/motion.js             (vanilla scroll-reveal, count-up, header-on-scroll)
│  ├─ styles/global.css
│  ├─ layouts/BaseLayout.astro
│  ├─ components/ Header.astro Footer.astro CtaBand.astro ProofStrip.astro Button.astro Section.astro ServiceCard.astro ModuleCard.astro
│  └─ pages/ index.astro programme.astro consulting.astro about.astro contact.astro thank-you.astro
├─ astro.config.mjs
├─ tailwind.config.* (or @theme in CSS, per the integration)
└─ package.json
```

## Appendix C — Design tokens (exact) — Scheme 3 "Creative Professional"
Authoritative source: `docs/scheme3_reference.html`. Use these and only these.
```
colors:
  navy:     { DEFAULT:'#1A1A2E', dark:'#0F0F1A' }   // Midnight Navy + hover
  amber:    { DEFAULT:'#F39C12', dark:'#E67E22' }   // Golden Amber + hover
  pewter:   '#7F8C8D'                                // secondary text / borders
  canvas:   '#FAFBFC'                                // page + card background
  charcoal: '#2C3E50'                                // body text
fontFamily:
  sans:    ['"Nunito Sans Variable"','"Nunito Sans"','-apple-system','Segoe UI','sans-serif']
  display: ['Satoshi','"Nunito Sans Variable"','sans-serif']
```
- Page defaults: `bg-canvas text-charcoal`; headings `text-navy`.
- Dark sections (hero, CtaBand, programme teaser): **solid** `bg-navy`, white text, amber accents — no gradient.
- Buttons: Book-a-call CTA = `bg-amber hover:bg-amber-dark text-white` (`accent`); other primary = `bg-navy hover:bg-navy-dark text-white` (`primary`); secondary = transparent + `border border-pewter text-pewter` on light / white border+text on navy.
- Amber is for buttons/large highlights only — never small body text on white. Body text is always `text-charcoal`.
- Type scale (desktop): H1 48 / H2 34 / H3 22 / body 17–18 / small 14; line-height 1.6 body, 1.2 headings; ~20% smaller on mobile.
- Cards: white surface with a 1px pewter-tint hairline border (`border border-pewter/20`).
- Contrast (verified): Midnight Navy on Canvas 15.8:1 (AAA); Amber on Navy 8.1:1 (AAA); Charcoal on Canvas 12.6:1 (AAA); Pewter on Canvas 4.8:1 (AA).

## Appendix D — `src/consts.ts` placeholder values
Set these placeholders; the owner replaces them later:
```
CALENDLY_URL = 'https://calendly.com/REPLACE_ME/30min'
WEB3FORMS_KEY = 'REPLACE_ME'
GA_ID = 'G-REPLACE_ME'
EMAIL = 'alar@alarvork.com'
PHONE = '+372 511 7614'
LINKEDIN = 'https://www.linkedin.com/in/alarvork/'
```
