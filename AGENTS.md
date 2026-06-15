# AGENTS.md — alarvork.com

This repository is the source for **alarvork.com**, a 5-page static marketing website for Alar Võrk ("Sales Architect", B2B sales consulting and the *Mechanics of the Sales Engine™* programme).

## Start here
1. Read **`BUILD_INSTRUCTIONS.md`** (repo root) — the complete build brief: stack, design system, milestones, and acceptance criteria.
2. Read the references in **`docs/`**:
   - `Alar_Vork_Website_Build_Spec_2026-06-15.md` — architecture, design system, and the final page-by-page copy.
   - `Alar_Vork_Website_Copy_Polished_2026-06-15.md` — source copy blocks.
   - `scheme3_reference.html` — the authoritative colour palette (Scheme 3).
3. Apply the persistent rules in **`.cursor/rules/project.mdc`**.

## Build it
Work through the milestones in `BUILD_INSTRUCTIONS.md` in order, satisfying each milestone's acceptance criteria and committing after each. Use the exact copy from `docs/`, the fixed Scheme 3 palette, and the Astro + Tailwind stack specified. Do not invent copy, change colours, show pricing, or add frameworks beyond what the brief allows.

## Things only the human owner provides
- The Satoshi variable font file (`public/fonts/Satoshi-Variable.woff2`).
- Account keys/links (Calendly URL, Web3Forms access key, GA4 ID) — use the placeholders in `src/consts.ts`.
- GoDaddy FTP secrets in GitHub (for the deploy workflow).
- Real photography to replace image placeholders.
