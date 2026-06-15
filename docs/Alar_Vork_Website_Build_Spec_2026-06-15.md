# alarvork.com — Website Build Specification
**Date:** 2026-06-15 · **Owner:** Alar Võrk (Sales Architect) · **Prepared for:** web developer / builder
**Build type:** Custom-coded static site (HTML/CSS, minimal vanilla JS) · **Hosting:** GoDaddy · **Structure:** Multi-page (5)

This document is a complete handoff brief. It contains the architecture, design system, page-by-page layout and final copy, technical requirements, and the domain-migration plan. A developer should be able to build the site from this without further input. No code is included by design — implementation is the developer's.

---

## 1. Project summary

**What:** Replace the current Wix one-pager at alarvork.com with a custom-built, multi-page static website hosted on GoDaddy.

**Why:** The current site hides the core offer (the *Mechanics of the Sales Engine™* programme) and the strongest proof points. The new site must position Alar as a **Sales Architect**, present the programme as the front door of the funnel, and convert founders/SME leaders and accelerator/incubator leads into a booked call.

**Primary audience:** Founders and SME leaders (B2B), plus heads of accelerators/incubators in Estonia, Finland and Sweden who book keynotes and workshops.

**Primary conversion goal:** Book a free 30-minute call (single, repeated CTA sitewide).
**Secondary goals:** Download/request the programme overview; email or LinkedIn contact.

**Languages:** English (British spelling) at launch. Estonian is a likely phase 2 — build with a language structure that can extend to `/et/` later, but do not build ET now.

---

## 2. Technical approach & constraints

- **Stack:** Hand-coded semantic HTML5 + CSS (a single shared stylesheet) + small amounts of vanilla JS (mobile nav toggle, smooth scroll, form handling). No heavy framework needed. A lightweight static-site generator (e.g. Eleventy) is acceptable if the developer prefers templating for the shared header/footer — output must still be static HTML.
- **Hosting reality:** GoDaddy shared/Web hosting serves static files (and supports PHP). Two implications the developer must plan for:
  1. **Contact form** needs a server-side or third-party handler (a static file can't email on its own). Options, in order of preference: a third-party form service (Formspree, Web3Forms, Basin) → no server code; or a small PHP `mail()`/SMTP script if the GoDaddy plan supports PHP. Decide based on the plan.
  2. **No Wix Bookings** on the new site — replace with an embedded scheduler (Calendly free plan, or TidyCal) linked/embedded on the Contact page and behind every "Book a call" button.
- **Performance budget:** Largest Contentful Paint < 2.5s on 4G; total page weight target < 1 MB; images served as WebP with width-appropriate sizes; fonts self-hosted or via Google Fonts with `display=swap`.
- **Accessibility:** WCAG 2.1 AA — semantic headings, alt text on all images, 4.5:1 text contrast (note: Golden Amber `#F39C12` on white is **not** AA for small text — use amber only for buttons/large highlights, never small body text on white; body text is Deep Charcoal `#2C3E50`), visible focus states, keyboard-navigable menu and form.
- **Browser support:** Latest two versions of Chrome, Safari, Firefox, Edge; iOS Safari; Android Chrome.

---

## 3. Domain & hosting migration plan (Wix → GoDaddy)

**Critical: do not cancel Wix or change DNS until the new site is built, tested on a staging URL, and ready to go live. Preserve email throughout.**

1. **Confirm where the domain is registered** (Wix or GoDaddy). **Email stays on Google Workspace (Gsuite) — do not touch it.** When DNS moves to GoDaddy, the **Google Workspace MX records plus any SPF (TXT), DKIM (TXT/CNAME) and Google site-verification records must be re-created on the new DNS exactly**, before or at the moment of cutover, or email will break. Email mailboxes themselves don't move — only the DNS records that route mail must be preserved.
2. **Build and stage** the new site on a temporary GoDaddy URL or subdomain (e.g. `staging.alarvork.com`) and review on desktop + mobile.
3. **Record current DNS** (screenshot all records at the current DNS host) before changing anything — especially MX (email), TXT (SPF/DKIM/verification), and any CNAMEs.
4. **Point the domain to GoDaddy hosting**: update the A record (and `www` CNAME) to the GoDaddy hosting IP, OR move nameservers to GoDaddy. If moving nameservers, **re-create the MX/TXT email records first** so email keeps flowing.
5. **Enable HTTPS/SSL** on GoDaddy for the domain (Let's Encrypt or GoDaddy SSL). Force `https://` and redirect `www` ↔ apex consistently (pick one canonical host).
6. **301-redirect** the old Wix URLs to the closest new page so no inbound links/SEO equity is lost.
7. **Verify** email send/receive, all pages, forms, SSL padlock, and search-console indexing **before** cancelling the Wix subscription.
8. **Remove the `noindex`** that the Wix site carried — the new site must be indexable (correct `robots` meta + an XML sitemap submitted to Google Search Console).

---

## 4. Sitemap & navigation

```
Home  (/)
├── Mechanics of the Sales Engine  (/programme)   ← the flagship; URL can be /mechanics-of-the-sales-engine
├── Consulting  (/consulting)
├── About  (/about)
└── Contact  (/contact)
```

**Header (all pages):** wordmark "Alar Võrk — Sales Architect" (left) · nav links: Programme · Consulting · About · Contact (right) · plus an amber **Book a call** button. Sticky on scroll. Collapses to a hamburger on mobile.

**Footer (all pages):** short bio line · nav repeat · alar@alarvork.com · +372 511 7614 · LinkedIn · Privacy Policy · "© 2025 Abacto Consulting" (legal/billing entity — keep).

**Global CTA band** (reusable component) above the footer on every page: headline + **Book a free 30-minute call** button.

---

## 5. Design system

### 5.1 Colour palette  — Scheme 3 "Creative Professional" (authoritative; from `Images & Design Assets/scheme3_reference.html`)
| Token | Hex | Use |
|---|---|---|
| Midnight Navy | `#1A1A2E` | Headers, navigation, dark sections, headings, primary buttons |
| Navy (hover) | `#0F0F1A` | Navy button hover/active |
| Golden Amber | `#F39C12` | Primary CTA buttons, key highlights, hover accents |
| Amber (hover) | `#E67E22` | Amber button hover/active |
| Pewter Gray | `#7F8C8D` | Supporting/secondary text, subtle borders, secondary buttons |
| Pure Canvas | `#FAFBFC` | Page background, content areas, card backgrounds |
| Deep Charcoal | `#2C3E50` | Body text |
| White | `#FFFFFF` | Text on navy/amber, card surfaces |

**Section style:** dark sections (hero, CTA band, programme teaser) are **solid Midnight Navy `#1A1A2E`** with white text and amber accents — no gradient. Light sections use Pure Canvas; separate content with white cards and 1px Pewter-tint hairline borders.

**Contrast (verified in the reference):** Midnight Navy on Canvas 15.8:1 (AAA) · Golden Amber on Midnight Navy 8.1:1 (AAA) · Deep Charcoal on Canvas 12.6:1 (AAA) · Pewter on Canvas 4.8:1 (AA). Amber is for buttons/large highlights only — never small body text on white.

### 5.2 Typography
- **Headings:** Satoshi (Variable) — weights 500–700. **Body & UI:** Nunito Sans (400 regular, 600 semibold, 700 bold).
- **Sourcing:** both are free. **Satoshi** is from Fontshare (Indian Type Foundry) — self-host the `.woff2` variable file; do not hot-link. **Nunito Sans** is on Google Fonts — self-host or load via Google Fonts. Load both with `font-display: swap`. Fallback stack: `"Nunito Sans", -apple-system, "Segoe UI", sans-serif` for body and `"Satoshi", "Nunito Sans", sans-serif` for headings.
- **Scale (desktop):** H1 48px/600 · H2 34px/600 · H3 22px/600 · body 17–18px/400 · small 14px. Line-height 1.6 body, 1.2 headings. Reduce ~20% on mobile.
- **Case:** sentence case for headings (not Title Case). One headline accent per section maximum.

### 5.3 Buttons
- **Primary CTA (the sitewide "Book a free 30-minute call"):** Golden Amber `#F39C12` fill, white text, 8px radius, generous padding (16px × 28px), hover `#E67E22`. Label is always action + value.
- **Primary (other actions):** Midnight Navy `#1A1A2E` fill, white text, hover `#0F0F1A`.
- **Secondary:** transparent fill with Pewter `#7F8C8D` border + text on light backgrounds / white border + text on navy.

### 5.4 Components to build
- Sticky header + mobile hamburger nav
- Hero (solid Midnight Navy, headline + sub + primary CTA)
- **Proof strip** (horizontal band of stat + label items; stacks on mobile)
- Three-up card row (used for services, modules summary, "what I do")
- Numbered process steps (Assess / Design / Build)
- Module accordion or stacked cards (the five MSE modules)
- Quote/testimonial block (empty-state ready — populated after first workshops)
- Global CTA band
- Footer
- Contact form + embedded scheduler

### 5.5 Imagery direction
- Professional photography of Alar (navy/neutral wardrobe to match palette). One strong hero portrait; one secondary for About.
- Abstract "engine/structure/blueprint" motifs acceptable as section dividers — keep subtle, navy/line-art, never stocky or cliché handshake imagery.
- Existing AI-generated images in `Design Resources/` may serve as placeholders only; commission or shoot real photography before launch for credibility.

---

## 6. Page-by-page layout & copy

> Copy below is final and British English. `{{Book a call}}` denotes the primary CTA button. Stat figures are approved for publication.

### 6.1 Home (`/`)

**Hero** (solid Midnight Navy)
- H1: **Build the machine that sells.**
- Sub: *I'm Alar Võrk — a Sales Architect with 30+ years in B2B sales. I help founders and SME leaders turn scattered effort into a sales system that delivers consistent, profitable growth.*
- {{Book a free 30-minute call}}  ·  secondary: *See the programme →* (links to /programme)

**Proof strip** (band under hero)
- **30+ years** in B2B sales · **10+ markets** across Europe & Asia · **90%+ win rate** on international tenders · **227% of target** during a recession
- Sub-line: *Deals closed with IBM, Microsoft, Pfizer, Bayer, Roche, HP and Schneider Electric.*

**Intro — "A Sales Architect"**
- H2: Most advisers teach people to sell better. I help companies build the machine that sells.
- Body: *Sales is an engine — roles, processes, incentives, and rhythm. Miss one part and you drive with the handbrake on. My job isn't to replace your team; it's to give founders and business leaders the structure to turn ideas into traction and results.*

**What I do — three-up cards** (each links to /consulting)
1. **New Business Development** — Open new markets, find the right partners, and secure first wins — with a repeatable way to keep unlocking growth.
2. **Sales Operations** — Release the hidden potential in your existing team by redesigning roles, processes, and rhythm so effort turns into growth.
3. **Account Management** — Turn account management from reactive service into a proactive engine for long-term, profitable growth.

**Programme teaser** (navy band, links to /programme)
- H2: Mechanics of the Sales Engine™
- Body: *A five-module B2B sales programme — from a founder's first deal to international growth. Delivered as a keynote or a hands-on workshop. Take the full journey, or pick the stage you're at.*
- {{Explore the programme}}

**How it works — Assess · Design · Build** (3 numbered steps, condensed — full version on /consulting)

**Global CTA band** → {{Book a free 30-minute call}}

---

### 6.2 Mechanics of the Sales Engine™ (`/programme`) — flagship page

**Hero** (navy)
- H1: Mechanics of the Sales Engine™
- Sub: *Most sales training teaches salespeople to sell better. This programme teaches companies to build the machine that sells.*
- {{Bring it to your team}}

**The problem**
- H2: Companies don't fail because of their product. They fail because sales breaks down — at predictable points.
- Body: *The founder sells alone and hits a ceiling. The first hire goes wrong. The team looks busy but revenue stalls. Existing customers are serviced, not grown. Export becomes expensive experimentation. Each stage gets treated as a surprise. None of them are.*

**The insight**
- *Every growing company passes through the same five stages — and each stage has its own mechanics. Learn the mechanics, and growth stops being guesswork.*

**The five modules** (stacked cards or accordion — title, one-line promise, "keynote vs workshop" note)
1. **Founder Sales Playbook — the starting line.** Win your first deals with a clear story and a lightweight process (Identify → Outreach → Discovery → Demo → Proposal → Close). Leave with a starter cadence and your first 10 accounts mapped.
2. **Igniting the Sales Engine — from solo to team.** Build the first real sales system: split hunting from account care, set a weekly rhythm, and decide when and who to hire first — without drowning that hire in chaos.
3. **Sales Engine Performance Tuning — unlock hidden capacity.** Separate structure problems from people problems, reset roles, clean up incentives, and add capacity without simply adding headcount.
4. **From Service to Strategy — grow your accounts.** Move account management from answering the phone to deliberate growth: renewals, upsell, cross-sell, multi-threaded relationships, and the leadership rhythm to run it.
5. **Beyond Home Turf — first steps abroad.** Choose the right markets and go-to-market channel (direct, distributor, partner, agent), build lightweight local support, and handle the logistics that protect your reputation.

- Line under modules: *Take the journey, or pick the stage you're at — every module stands alone.*

**How it's delivered**
- *Hands-on and interactive — no lectures. Participants work on their own company in every exercise. Each module ships with a practical toolkit: worksheets, templates, checklists, and a 30/60/90 action plan. Delivered online or in person, half-day (3.5h) or full-day (7h).*
- *An original framework built by a practitioner who has founded companies and built sales organisations himself — this teaches what I've done, not what I've read.*

**Who it's for** (three short cards)
- **Incubators & accelerators** — give founders repeatable sales processes, not theory, at exactly the stage they're in.
- **Founders & SMEs** — a structured path from one-person sales to a tuned, growing engine, without expensive trial and error.
- **Entrepreneurship & export programmes** — a ready-made curriculum covering the full sales-growth path, ending in market entry.

**Proof strip** (repeat the stat band)

**CTA band** → {{Book a free 30-minute call}} · secondary: *Request the programme overview (PDF)*

---

### 6.3 Consulting (`/consulting`)

**Hero**
- H1: Hands-on consulting and advisory.
- Sub: *Not every challenge needs a workshop. Sometimes you need direct help with your sales setup, your processes, or your leadership. I meet you where you are and move you forward.*

**Services** (cards — title, one-line, 3–4 bullets, deliverable)
1. **Sales Performance Audit** — a structured diagnostic of why results stall. *Analyse structure, roles and workflows; find the bottlenecks; assess acquisition and account management. Deliverable: diagnostic report + action list.*
2. **Sales Process Optimisation Sprint** — redesign workflows for efficiency and conversion. *Map and fix acquisition and account flows; remove friction; build new process maps and playbook templates. Deliverable: optimised process + team briefing.*
3. **International Sales Preparation** — confident first steps abroad. *Select target regions; define the channel model; prepare logistics, compliance and customer expectations. Deliverable: market-entry roadmap + international sales playbook.*
4. **Fractional VP of Sales** — part-time senior leadership when you need it most. *Strategic direction, team coaching and cadence, hiring and process setup. Engagement: 1–2 days/week.*
5. **Strategic Account Growth Advisory** — turn account management into a growth driver. *Segment accounts by potential, map stakeholders, build upsell/cross-sell/renewal plans. Deliverable: account plans + leadership cadence.*
6. **Leadership Advisory Retainer** — senior advice without a full project. *Two advisory calls/month, feedback on plans and messaging, priority access. Month-to-month.*

> **Pricing decision for Alar:** your 90-day plan prices the Audit at €2,500 and the Sprint at €4,800+. Decide whether to show "from €X" publicly (builds qualification and anchors value) or keep pricing to the call. The spec leaves price out until you confirm.

**Why work with me**
- 30+ years of international B2B sales leadership · hands-on, from global deals to helping SMEs scale · you work directly with me, not a junior consultant · practical, structured, action-oriented.

**CTA band** → {{Book a free 30-minute call}}

---

### 6.4 About (`/about`)

**Hero** — H1: I've seen sales from every angle — founder, rep, leader, and adviser.

**Story** (two columns: portrait + text)
- *I'm Alar Võrk, a Sales Architect with 30+ years in B2B sales and business development. My career spans founder-led ventures and international projects across Europe and Asia.*
- *I've closed deals with global companies — IBM, Microsoft, HP, Bayer, Roche, Pfizer and Schneider Electric — and learned to navigate complex buying processes and earn trust with demanding customers. I've also founded and scaled ventures of my own, from media to technology and smart lighting, so I know the founder's reality, not just the adviser's.*
- *My journey started with a bold idea and no budget: I co-founded The Baltic Guide, a travel-media venture before "startup" was a word. We didn't raise funding — we tested, sold, and proved the concept in the market. That taught me the lesson that still drives my work: sales isn't talent or charisma. It's a system. It needs structure, rhythm, and execution.*

**What I believe** (three points)
- Clarity over complexity · Structure that enables growth, not bureaucracy · Action over theory.

**Proof strip** (repeat) · **CTA band** → {{Book a free 30-minute call}}

---

### 6.5 Contact (`/contact`)

**Hero** — H1: Let's talk about your sales. · Sub: *The first step is a simple conversation — no obligation, no long forms.*

**Two paths, side by side:**
- **Book a call** — embedded scheduler (Calendly/TidyCal) for a free 30-minute call.
- **Send a message** — form fields: First name*, Last name*, Position, Company, Email*, Message*. Button: **Send request**. On submit: thank-you state + auto-reply email.

**Direct details:** alar@alarvork.com · +372 511 7614 · [LinkedIn](https://www.linkedin.com/in/alarvork/)

**What to expect:** *A focused conversation on your situation. No obligation. If there's a fit, I'll outline workshop or consulting options tailored to your business.*

---

## 7. SEO & analytics requirements

- Unique `<title>` and meta description per page (no typos — the old "Devlopment" error must not recur). Suggested home title: *Alar Võrk — Sales Architect | B2B Sales Systems & Training*.
- Open Graph + Twitter card tags with a branded share image.
- One `<h1>` per page; logical heading order.
- `JSON-LD` structured data: `Person` (Alar Võrk) + `ProfessionalService` (Abacto Consulting), and `Course`/`Service` for the MSE programme.
- XML sitemap + `robots.txt` (allow indexing); submit to Google Search Console.
- 301 redirects from old Wix paths.
- Google Analytics 4 (or privacy-friendly Plausible) + cookie consent banner (GDPR — EU audience).
- Privacy Policy page retained/relinked.

---

## 8. Developer build checklist

- [ ] Confirm GoDaddy plan capabilities (PHP? SSL? staging?) and form-handler choice
- [ ] Set up staging URL; record all current DNS (esp. MX/TXT for email)
- [ ] Build shared header/footer/CTA-band components
- [ ] Build 5 pages per Section 6, mobile-first, to the design system in Section 5
- [ ] Wire contact form + embedded scheduler; test delivery to alar@alarvork.com
- [ ] Optimise images (WebP, sized); self-host Satoshi (Fontshare variable) + Nunito Sans (Google Fonts) with `font-display: swap` and fallback stack
- [ ] Add SEO tags, JSON-LD, sitemap, robots, GA4 + consent
- [ ] Accessibility pass (contrast, alt text, keyboard, focus)
- [ ] Cross-browser + mobile QA; Lighthouse ≥ 90 performance/SEO/accessibility
- [ ] Go-live: repoint DNS (preserve email), force HTTPS, set canonical host, 301s
- [ ] Verify email + indexing, then cancel Wix

## 9. Assets Alar needs to provide

- Professional photography (hero portrait + one secondary) — highest priority for credibility
- Final decision on public pricing display (Section 6.3)
- Programme overview PDF for the "Request the overview" CTA (can adapt the existing MSE pitch deck)
- Logo/wordmark files if a mark beyond the text wordmark is wanted
- Confirmation of domain registrar and email host before migration

---

*Source copy and positioning drawn from: `00_Strategy/MSE_Marketing_Plan_90_Days`, `01_Brand/Alar_Vork_Personal_Branding_Pack`, `02_Program_MSE/` pitch and module files, the live alarvork.com, and brand assets in `Design Resources/`. Companion file: `Alar_Vork_Website_Copy_Polished_2026-06-15.md`.*
