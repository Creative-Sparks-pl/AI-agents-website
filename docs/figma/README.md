# Figma map — agents.creativesparks.pl

What sits where in this site's Figma files, how things are named, the ids that matter, and the commands for the common tasks. The method behind it (how components are built from code, what each check proves, publishing, Code Connect, builders) is the **`figma-design-set` skill** at `C:/Users/Tomasz/.claude/skills/figma-design-set/` — load it before changing anything in Figma. The design steps for new UI are in `docs/design-process.md`.

Keys: `FIGMA_TOKEN` (REST reads, header `X-Figma-Token`) and `FIGMA_ACCESS_TOKEN` (Code Connect: File content Read + Code Connect Write; the line in `.env.local` carries a note after the token, so only its first word is used) are in this repo's `.env.local`. Never print them. The scripts below read them through `node --env-file=…`.

## The files

All in the Fuse Collective team's Creative Sparks project (`29837153`). Each file's first page, **Cover**, points to this map and to the skill.

| File | Key | Holds |
|---|---|---|
| **Creative Sparks — Brand base** · https://www.figma.com/design/bWv9rlPPYyIltNpCEAw0Yj | `bWv9rlPPYyIltNpCEAw0Yj` | Library. 42 variables: collection "Primitives" (39 colours, scopes empty so they appear in no picker, but published) and "Typography" (`font/headline` Gilroy, `font/body` Noto Sans, `font/label` Noto Sans Mono). 53 components: `Logo` (1:226) and 52 icons `Icon/<Material Symbols name>` (incl. `Icon/play_arrow-fill`). |
| **Creative Sparks — Web library** · https://www.figma.com/design/zDsBjCordPVukR38UY5GAS | `zDsBjCordPVukR38UY5GAS` | Library on the brand base. Collections Color (41), Type (26), Spacing (26), Radius (4), Layout (8); 88 text styles, 4 effect styles, 2 grid styles; 76 components (47 component sets + 29 single components): shared parts and every section the pages use, each with Desktop (1440) and Phone (390) variants. Brand base enabled in it (the team default "Fuse Collective Colors" is added too, unused). The plan's one active Code Connect library. |
| **Creative Sparks — Website** · https://www.figma.com/design/uSPmRV0KIyNTpOLO4TcYRU | `uSPmRV0KIyNTpOLO4TcYRU` | The nine live Polish pages at 1440 and 390, built only from web-library instances; no local component, variable or style. Web library enabled in it. |
| OLD REFERENCE — agents.creativesparks.pl hero (until 2026-11-27; now: Creative Sparks — Website) | `wqLetBg3T80mr4UkjK3RgZ` | The file used before 2026-11-27 (pages Hero 4:13, Components 4:14, Sign-up pop-up 28:454). Reference only: do not edit, do not build on it. |

### Pages

- **Brand base:** Cover 0:1 · Colours 1:46 · Type 1:47 · Logo 1:48 · Icons 1:49.
- **Web library:** Cover 0:1 · Foundations 3:78 (specimens of variables and styles) · `——— PARTS ———` 3:79 · Button 9:2 · ChecklistItem 9:78 · RatingStars 9:85 · LinkArrow 25:11 · Section icons 25:12 · SectionWithIcon 25:13 · StageCard 25:14 · FreeSkillForm 25:15 · FullScreenDialog 25:16 · `——— SECTIONS ———` 3:80 · then one page per section, named exactly after the component (ids in the sections table below).
- **Website:** Cover 0:1 and one page per site page (table below).

## Naming

### Colour roles (web library, collection "Color")

Each role is named like the CSS token in `src/styles/global.css` (`--color-surface-primary` → `color/surface-primary`), has WEB code syntax `var(--color-…)`, and is an alias of a brand-base primitive — never a raw value. Read back from the file on 2026-11-27:

| Role (CSS token) | Primitive | | Role (CSS token) | Primitive |
|---|---|---|---|---|
| `color/primary` | `blue/500` | | `color/foreground` | `neutral/900` |
| `color/primary-dark` | `blue/600` | | `color/muted` | `neutral/700` |
| `color/on-primary` | `white` | | `color/border` | `neutral/300` |
| `color/accent` | `yellow/400` | | `color/surface` | `neutral/50` |
| `color/accent-dark` | `yellow/500` | | `color/surface-primary` | `blue/50` |
| `color/background` | `white` | | `color/surface-accent` | `yellow/50` |
| `color/pattern` | `neutral/100` | | | |

- **Opacity modifiers** in the code (`border-border/20`) are roles named after the expression, aliasing an alpha primitive, code syntax `color-mix(in oklab, var(--color-border) 20%, transparent)`: `color/border-15|20|30|40` → `alpha/neutral-300-NN`; `color/white-20|50|60|70|80|90` → `alpha/white-NN`; `color/foreground-10|60|70|80` → `alpha/neutral-900-NN` (60 is also the dialog scrim); `color/muted-40|80` → `alpha/neutral-700-NN`; `color/accent-30` → `alpha/yellow-400-30`; `color/primary-5|20` → `alpha/blue-500-NN`.
- **Tailwind palette colours** used outside the tokens (the terminal mockup, one red): `color/tw/<name>` → `tailwind/<name>` (`zinc-300`, `zinc-400`, `zinc-800`, `zinc-900`, `emerald-400`, `amber-400`, `red-700`), plus `color/tw/white` → `white`, `color/tw/black` → `black`; code syntax `var(--color-zinc-300)` etc.
- **To look one up live:** in the web library, Local variables → Color → the role shows its alias; or paste the skill's `scripts/audit-library.js` as read-only `use_figma` code on `zDsBjCordPVukR38UY5GAS` (each variable comes back with its alias target). Base variable keys (for `importVariableByKeyAsync`): a read-only `use_figma` in the brand base returning `(await figma.variables.getLocalVariablesAsync()).map((v) => [v.name, v.key])`.

### Number variables

- **Type** (26): `text/xs … text/8xl` (FONT_SIZE, `var(--text-xl)`), `leading/<size>` (each size's default line height), one-offs `text/exception-10`, `text/exception-13` (`text-[10px]`, `text-[13px]` in code).
- **Spacing** (26): Tailwind steps the code uses, `space/0 0_5 1 1_5 2 2_5 3 4 4_5 5 6 7 8 10 12 14 16 20 24 28 112` (code syntax `calc(var(--spacing) * N)`; `_` stands for the period); the site's tokens `spacing/section` (80), `spacing/section-lg` (144), `spacing/grid` (64); one-offs `space/exception-152` (`[152px]`) and `space/exception-14` (the free-skill overlay's `gap-5` with `-mt-1.5`).
- **Radius** (4): `radius/default`, `radius/lg`, `radius/xl` (all 0 — the site is square), `radius/full`.
- **Layout** (8): `breakpoint/sm|md|lg|xl|2xl` (reference only, no scope), `frame/desktop` 1440, `frame/phone` 390, `container/max` 1536.
- Grid styles: desktop 12 columns, 64 gutter, 24 margin; phone 2 columns, 16 gutter, 24 margin. Effect styles include the hero's hard yellow offset shadow, bound to `color/accent`.

### Text styles (88)

Named after the Tailwind classes that produce them: role (from the family token: Headline = `font-headline` Gilroy, Body = `font-body` Noto Sans, Label = `font-label` Noto Sans Mono) / size / weight · leading · tracking, e.g. `Headline/5xl/bold · leading-[1.1] · tracking-tight`. The description holds the full class string. `· uppercase`, `· underline`, `· line-through` are separate styles because setting case or decoration on a node detaches its style.

- **Section headings** (`font-headline text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight`): `Headline/5xl/bold · leading-[1.1] · tracking-tight` on Desktop variants, `Headline/4xl/bold · leading-[1.1] · tracking-tight` on Phone variants.
- **Long text** (the terms page's own `.prose-custom` CSS): `Body/base/normal|bold|semibold · leading-[1.75]`, `Body/sm/normal · leading-[1.75]`, `Headline/2xl/bold · leading-normal`.
- **"extrabold" styles use the Bold face** (`Body/base/extrabold · tracking-tight`, `Body/xl/extrabold · tracking-tight`, the Gilroy extrabold headlines): the site loads Noto Sans 400–700 and Gilroy 400/700 only, so the browser draws `font-extrabold` with the 700 face (computed style still says 800).

### Components

- Named after their code file; the description's first line names it (`Code: src/components/ui/Button.astro — …`). Properties follow the real props; `Breakpoint=Desktop|Phone` on every section (Desktop is the top-left, default variant).
- Shared parts (`src/components/ui/`) have their own pages after `——— PARTS ———`; each section (`src/components/sections/<folder>/`) has its page after `——— SECTIONS ———`, and a part used by that section only sits on the same page (named after its code file, or after the markup it stands for when it has no file — the description then says "Part of <file> (no file of its own)").
- Figma-only parts, each describing the code that renders it: `StageCard/Shape` (a CSS shape in StageCard), `FreeSkillForm/Overlay` (markup inside FreeSkillForm), `ChevronBullet` (an inline SVG in PlatformSection and the text pages), `PricingFeature` (the `<li>` of PricingTier), `Speckles` and `SectionIcon/testimonials` (SVG assets of TestimonialsSection), `AuthorPhoto` (`src/assets/author.webp` as the component's own fill — an image inside slot content would not reach the Website file), `SectionIcon/shape-1…12` (the SVGs in `src/assets/icons/` passed to SectionWithIcon as `icon`).
- Icons: Brand-base instances, always 24 × 24 px — the size the live site renders (Google Fonts' `.material-symbols-outlined { font-size: 24px }` beats Tailwind's layered `text-sm`/`text-lg`), not the size the classes ask for (owner's decision, 2026-11-27). Button `sm` with an icon is therefore 52 px tall, as live. A fixed icon in code is a fixed instance; only icons the code takes as a prop are swap properties.

## The ids that matter

The full lists the checks run on are committed: **`figma/checks/sections.json`** (every section's Desktop and Phone variant ids in the web library, the sale state of PricingSection, the FreeSkillForm part, the accepted deviation) and **`figma/checks/pages.json`** (every Website page's 1440 and 390 frame ids, with the accepted sections).

### Sections (web library)

| Section | Code | Page · set | Desktop / Phone variant | Variant properties besides Breakpoint | Section-only parts |
|---|---|---|---|---|---|
| HeroSection | `src/components/sections/hero/HeroSection.astro` | 15:172 · 15:175 | 15:173 / 15:174 | Primary CTA (Buttons/Form), Show rating, Bullets (slot) | — |
| TopAppBar | `src/components/sections/top-app-bar/TopAppBar.astro` | 45:2 · 45:153 | 45:23 / 45:56 | Sale window, Show CTA, Show link 3/4/5 | — |
| Footer | `src/components/sections/footer/Footer.astro` | 46:88 · 46:145 | 46:89 / 46:117 | — | — |
| ProblemsSection | `src/components/sections/problems/ProblemsSection.astro` | 47:2 · 48:176 | 48:8 / 48:111 | Intro, Footer link | ProblemCard 47:21 |
| ProcessSection | `src/components/sections/process/ProcessSection.astro` | 49:2 · 49:265 | 49:3 / 49:152 | Columns (2/3) | — |
| ArchitectureSection | `src/components/sections/architecture/ArchitectureSection.astro` | 52:2 · 53:476 | 53:25 / 53:269 | CTA | DecisionCard 52:5 |
| DemoSection | `src/components/sections/demo/DemoSection.astro` | 60:2 · 60:127 | 60:3 / 60:84 | CTA (Button/Form), Note | — |
| FAQSection | `src/components/sections/faqs/FAQSection.astro` | 63:2 · 63:400 | 63:67 / 63:252 | — | FAQItem 63:66 |
| TestimonialsSection | `src/components/sections/testimonials/TestimonialsSection.astro` | 65:2 · 67:271 | 67:5 / 67:151 | — | Speckles 67:4, SectionIcon/testimonials 67:3 |
| AuthorSection | `src/components/sections/author/AuthorSection.astro` | 70:2 · 71:167 | 71:2 / 71:105 | — | AuthorPhoto 123:85 |
| UseCasesSection | `src/components/sections/use-cases/UseCasesSection.astro` | 78:2 · 79:187 | 79:15 / 79:119 | — | CaseCard 78:77 |
| TryFreeSection | `src/components/sections/try-free/TryFreeSection.astro` | 81:2 · 81:334 | 81:83 / 81:226 | — | TryFreeCard 81:82 |
| PricingSection | `src/components/sections/pricing/PricingSection.astro` | 87:545 · 88:1119 | 88:122 / 88:393 (sale: 88:626 / 88:886) | Sale window | PricingTier 87:810, PricingFeature 87:553, PreSaleCountdown 87:548 (`src/components/ui/PreSaleCountdown.astro`) |
| PlatformSection | `src/components/sections/platform/PlatformSection.astro` | 93:2 · 93:337 | 93:27 / 93:200 | — | PlatformCard 93:26, ChevronBullet 93:5 |
| LandscapeSection | `src/components/sections/landscape/LandscapeSection.astro` | 94:77 · 94:382 | 94:79 / 94:248 | — | — |
| KnowledgeBaseSection | `src/components/sections/knowledge-base/KnowledgeBaseSection.astro` | 79:190 · 86:675 | 86:11 / 86:361 | — | KnowledgeColumn 85:10, KnowledgeColumn/Item 85:9 |
| ComparisonSection | `src/components/sections/comparison/ComparisonSection.astro` | 79:191 · 90:1229 | 90:887 / 90:1070 | — | ComparisonRow 89:77, ComparisonRow/Cell 89:40 |
| ChangelogSection | `src/components/sections/changelog/ChangelogSection.astro` | 79:192 · 94:1263 | 94:641 / 94:964 | — | ChangelogEntry 94:54, ChangelogEntry/Change 94:3 |
| EmailAnswerSection | `src/components/sections/email-answer/EmailAnswerSection.astro` | 79:193 · 96:50 | 96:2 / 96:26 | Show LinkedIn | — |
| KBHero | `src/components/sections/kb/KBHero.astro` | 85:25 · 85:88 | 85:34 / 85:62 | — | KBStatCard 85:33 |
| KBPageTypes | `src/components/sections/kb/KBPageTypes.astro` | 87:429 · 88:1538 | 88:1174 / 88:1381 | — | KBPageTypeNavItem 87:479, KBPageTypeAccordion 87:535, KBListItem 87:432, KBListCard 87:457, KBDetailCard 87:435 |
| KBFrameworks | `src/components/sections/kb/KBFrameworks.astro` | 91:2 · 91:220 | 91:7 / 91:131 | — | KBFrameworkItem 91:3 |
| KBPatterns | `src/components/sections/kb/KBPatterns.astro` | 93:591 · 93:846 | 93:630 / 93:750 | — | KBPatternCategory 93:629, KBPatternRow 93:592 |
| KBSources | `src/components/sections/kb/KBSources.astro` | 94:385 · 94:640 | 94:402 / 94:533 | — | KBOrgRow 94:401, KBExpertCard 94:389 |

### Shared parts (web library)

| Part | Code | Page · node | Properties |
|---|---|---|---|
| Button | `src/components/ui/Button.astro` | 9:2 · set 9:77 | Label, Variant (primary/secondary/sale), Size (sm/md/lg), Show icon + Icon, State (Default/Hover) |
| ChecklistItem | `src/components/ui/ChecklistItem.astro` | 9:78 · 9:79 | Title |
| RatingStars | `src/components/ui/RatingStars.astro` | 9:85 · 9:86 | Text |
| LinkArrow | `src/components/ui/LinkArrow.astro` | 25:11 · set 26:14 | Label, Show icon + Icon, Show trailing icon + Trailing icon, State |
| SectionIcon/shape-1…12 | `src/assets/icons/shape-N.svg` | 25:12 · 26:200–26:211 | — |
| SectionWithIcon | `src/components/ui/SectionWithIcon.astro` | 25:13 · set 27:85 | Layout (stacked/side-by-side), Show icon + Icon, Header (slot), Content (slot) |
| StageCard | `src/components/ui/StageCard.astro` | 25:14 · set 29:76 | Index, Title, Description, Output + Output icon, Quote, Show shape/index/output/quote, State |
| StageCard/Shape | `src/components/ui/StageCard.astro` | 25:14 · set 28:19 | Shape (cube/diamond/circle/grid/bars/nested) |
| FreeSkillForm | `src/components/ui/FreeSkillForm.astro` | 25:15 · set 31:562 | Size (md/lg), Fit container, State (Default/Focus/Error/Success), Placeholder, Error message, Success heading |
| FreeSkillForm/Overlay | `src/components/ui/FreeSkillForm.astro` | 25:15 · set 32:271 | — (the success overlay) |
| FullScreenDialog | `src/components/ui/FullScreenDialog.astro` | 25:16 · set 30:75 | Sheet, Title, Show icon + Icon, Content (slot), Footer (slot), Show footer |

Most sections are built on a `SectionWithIcon` instance whose Header and Content slots hold the section's content; a page changes that content as slot overrides. Keys for `importComponentSetByKeyAsync`: REST `GET https://api.figma.com/v1/files/zDsBjCordPVukR38UY5GAS/component_sets` (and `/components` for single components) lists every published one with its key, page and description.

### Pages (Website file)

| Figma page | Page id | Frame 1440 | Frame 390 | Sections (live order) |
|---|---|---|---|---|
| UX Design Skill — /ux-design-skill/ | 14:2 | 14:2723 | 23:3330 | TopAppBar, HeroSection, ProcessSection, UseCasesSection, ProcessSection, KnowledgeBaseSection, LandscapeSection, ComparisonSection, ProblemsSection, TestimonialsSection, PricingSection, TryFreeSection, ArchitectureSection, PlatformSection, ProblemsSection, FAQSection, AuthorSection, DemoSection, Footer |
| Free Homepage UX Audit — /free-homepage-ux-audit-skill/ | 27:8617 | 27:8618 | 27:9891 | TopAppBar, HeroSection, ProcessSection, ArchitectureSection, TestimonialsSection, ProblemsSection ×2, FAQSection, AuthorSection, DemoSection, Footer |
| Free Website Planning — /free-website-planning-skill/ | 27:10986 | 27:10987 | 27:11918 | as the audit page, without AuthorSection |
| UX Design Skill changelog — /ux-design-skill/changelog/ | 33:6869 | 33:6870 | 33:7476 | TopAppBar, ChangelogSection, Footer |
| Knowledge base — /ux-design-skill/baza-wiedzy/ | 36:2 | 36:716 | 36:1649 | TopAppBar, KBHero, KBPageTypes, KBFrameworks, KBPatterns, KBSources, Footer |
| Answer — /answer/ | 37:2 | 37:245 | 37:383 | TopAppBar, EmailAnswerSection, Footer |
| Terms — /ux-design-skill/regulamin/ | 33:6725 | 33:6726 | 33:6786 | TopAppBar, frame `regulamin`, Footer |
| Free skills guide — /free-skills/guide/ | 33:8051 | 53:1144 | 55:1599 | TopAppBar, frame `guide`, Footer |
| How it works — /ux-design-skill/instrukcja/ | 33:8052 | 54:1985 | 55:3461 | TopAppBar, frame `instrukcja`, Footer |

Frames are named `<slug> — 1440` / `<slug> — 390` (vertical auto layout, no gap, hugging). The three text pages have no components of their own in code: their content is a captured, cleaned-up frame on library text styles and parts, named after the measured block. Page builders never create local components, variables or styles here; a missing variant or style is added to the web library, published, and accepted here.

## Code Connect

- Templates: `figma/code-connect/` — `Button.figma.ts` at the top, shared parts in `figma/code-connect/ui/`, each section with its section-only parts in `figma/code-connect/sections/<folder>/` (the folder name under `src/components/sections/`). 76 parserless `.figma.ts` templates, one per published component; config `figma.config.json` (label "Astro", language "html").
- CLI pinned at **`@figma/code-connect@2.1.0`**, run through npx (no dependency in `package.json`) by the skill's `scripts/code-connect.mjs`. Active Code Connect selection on the plan: library "Creative Sparks — Web library", framework "Astro".
- Not mapped: Brand-base icons (snippets write the Material Symbols name or `icon="…"`); text sections take from content collections (shown as "…"); Figma-only properties (Breakpoint, Hover, Open, Sale window — the sale state is the date, `src/lib/presale.ts`).
- `figma/` and `figma.config.json` have their own row in `docs/testing.md` (no tests) and are skipped by the doc and code graphs.

## Measurements

`figma/measurements/` — the live pages measured on the dev server (one JSON per page and width, plus `icon-keys.json`, `inventory.json`, `web-foundations.json`; the sale state in `figma/measurements/sale/`). Git-ignored by `figma/measurements/.gitignore` and regenerated by the skill's measure script; in a fresh clone measure first. The state: clock forced to 2 Dec 2026 (the Black Friday window, 23–30 Nov, is decided in the browser), data-sending hosts blocked, fonts and the Wistia player allowed (blocking Wistia collapses ProcessSection's video tile by 288 px), dev toolbar and cookie banner hidden.

Re-measure all nine pages (from this repo's root; starts `astro dev` on 4325 if nothing answers there; ~35 s), then it verifies 18 captures with no sale content:

```bash
node C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/measure-live.mjs \
  --pages '[{"slug":"ux-design-skill","path":"/ux-design-skill/"},{"slug":"free-homepage-ux-audit-skill","path":"/free-homepage-ux-audit-skill/"},{"slug":"free-website-planning-skill","path":"/free-website-planning-skill/"},{"slug":"ux-design-skill-changelog","path":"/ux-design-skill/changelog/"},{"slug":"free-skills-guide","path":"/free-skills/guide/"},{"slug":"ux-design-skill-instrukcja","path":"/ux-design-skill/instrukcja/"},{"slug":"ux-design-skill-baza-wiedzy","path":"/ux-design-skill/baza-wiedzy/"},{"slug":"ux-design-skill-regulamin","path":"/ux-design-skill/regulamin/"},{"slug":"answer","path":"/answer/"}]' \
  --base-url http://localhost:4325 --server "npx astro dev --port 4325" --out figma/measurements \
  --clock 2026-12-02T10:00:00+01:00 --block-third-party \
  --allow-host fonts.googleapis.com,fonts.gstatic.com,fast.wistia.net,fast.wistia.com,embed-ssl.wistia.com,embed.wistia.com \
  --block "dev-toolbar/" --hide "astro-dev-toolbar, #cc-main" \
  --forbid-text "black friday|promocja kończy|do końca promocji|sale ends" --forbid-part PreSaleCountdown
```

To re-measure only some pages, keep only their entries in `--pages`; once the folder holds measurements, `--pages figma/measurements` re-measures the pages already there. Check without measuring: the same command with `--verify` (no server needed). Measure from this repo only (the dev server, Playwright and the source paths are here).

The sale state (PricingSection's `Sale window=true` rows in `sections.json`): the same command with one page `[{"slug":"ux-design-skill-pricing-sale","path":"/ux-design-skill/"}]`, `--clock 2026-11-25T10:00:00+01:00`, `--out figma/measurements/sale`, without the two `--forbid-…` options. Not yet tried outside the sale window: check that the sale prices appear before trusting it (the PricingSection (sale) compare must pass).

## Common tasks

Run from this repo's root (`D:/Dev/Creative-Sparks/AI-Agents/WEB-Agents-website/`). From another repo — e.g. the marketing repo `D:/Dev/Creative-Sparks/AI-Agents/MKT-UX-Design-Skill/` — use the same scripts with this repo's paths: `--env-file=../WEB-Agents-website/.env.local` and `../WEB-Agents-website/figma/…` (both forms below were run on 2026-11-27).

**Compare one section with the live page** (FAQSection at 1440; use the Phone variant id with `-390.json`; `--nth 2` for a section's second use on a page):
```bash
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-figma.mjs zDsBjCordPVukR38UY5GAS 63:67 figma/measurements/ux-design-skill-1440.json FAQSection
# from the marketing repo:
node --env-file=../WEB-Agents-website/.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-figma.mjs zDsBjCordPVukR38UY5GAS 63:67 ../WEB-Agents-website/figma/measurements/ux-design-skill-1440.json FAQSection
```

**Compare every section, both widths** (~3 min; names after the options limit it, e.g. `FAQSection "PricingSection (sale)"`):
```bash
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-all.mjs --list figma/checks/sections.json
# from the marketing repo:
node --env-file=../WEB-Agents-website/.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-all.mjs --list ../WEB-Agents-website/figma/checks/sections.json
```
Expected: 51 PASS and `ACCEPT ChangelogSection 1440`.

**Check a page / every page** (sections in order, heights, stacking, frame height, every instance's texts):
```bash
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-pages.mjs --list figma/checks/pages.json [answer ux-design-skill …]
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-page.mjs uSPmRV0KIyNTpOLO4TcYRU 14:2723 figma/measurements/ux-design-skill-1440.json --accept HeroSection
# from the marketing repo:
node --env-file=../WEB-Agents-website/.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/compare-pages.mjs --list ../WEB-Agents-website/figma/checks/pages.json
```

**Side-by-side screenshots** (`live-<slug>-<w>.png` and `figma-<slug>-<w>.png` into the git-ignored `scratch/screenshots/`; dev server on 4325 running; leave out the slugs for all pages):
```bash
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/screens.mjs --list figma/checks/pages.json --measurements figma/measurements --base-url http://localhost:4325 --out scratch/screenshots --clock 2026-12-02T10:00:00+01:00 --block "dev-toolbar/" answer
```

**Check a library page's components** (read-only `use_figma` on `zDsBjCordPVukR38UY5GAS`, after loading the `figma:figma-use` skill): paste the skill's `scripts/check-parts.js` and `scripts/check-slots.js` with `__PAGE_IDS__` replaced, e.g. `["63:2"]`. Both must come back with no issues; descriptions must name the code file.

**Change a section end to end** (after the owner approved the design, see `docs/design-process.md`):
1. Change the code; re-measure the pages that use the section (command above, only those pages).
2. Update the component in the web library at both breakpoints (skill: `references/method.md`); `compare-all.mjs --list figma/checks/sections.json <Section>` until PASS; check-parts and check-slots on its page.
3. Update its template under `figma/code-connect/sections/<folder>/` if props changed; `node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/code-connect.mjs parse`.
4. Publish the web library in the browser (Assets → Libraries → Publish…; skill: `references/publishing.md`).
5. Publish Code Connect (below).
6. In the Website file: Assets → Updates → "Show updates for all pages" → Update all. If a text style changed, re-apply it to texts inside slot content (skill: publishing reference).
7. `compare-pages.mjs --list figma/checks/pages.json <slugs that use it>` until PASS; screenshots if the change is visible.
8. A new variant id goes into `figma/checks/sections.json`; a new section gets its row there (name, desktop, phone, page).

**Add a page:** measure it (add its slug and path to `--pages`); create a Figma page `<Title> — <path>` in the Website file with frames `<slug> — 1440` / `<slug> — 390` built from library instances (skill: method reference, "Pages in the pages file"); add `{ "slug", "d", "p" }` to `figma/checks/pages.json`; run `compare-pages.mjs` for it.

**Publish Code Connect** (from this repo only — `figma.config.json` is here):
```bash
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/code-connect.mjs parse
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/code-connect.mjs publish --dry-run
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/code-connect.mjs publish
```
Then check `get_design_context` on an instance in the Website file (it returns e.g. `<FAQSection />` with its import), and run `npm run build` once with the templates in the tree.

**Regenerate the icon keys** (Brand-base icon name → key, for build scripts):
```bash
node --env-file=.env.local C:/Users/Tomasz/.claude/skills/figma-design-set/scripts/icon-keys.mjs --file bWv9rlPPYyIltNpCEAw0Yj --out figma/measurements/icon-keys.json
```

## Accepted deviations

Owner's rule (2026-11-27): Figma's whole-pixel rounding is drift, accepted when recorded; geometry (order, section heights, stacking) is never waived or faked. The checks print these as ACCEPT.

| Where | What | Recorded in |
|---|---|---|
| ChangelogSection at 1440 | each entry 0.5 px taller in Figma (37.5 px title lines rounded), 12 px by entry 25; entries 1–9 within 4 px; phone exact | `sections.json` (`accepted`), `pages.json` (`accept`) |
| HeroSection on the three landing pages | the phone terminal mockup at 9–10 px: rounding on top of the 8 px monospace allowance | `pages.json` (`accept: HeroSection`) |
| Free skills guide and how-it-works at 1440 | +8 / +10 px by the last list item (37.5 px item titles); phone exact | `pages.json` (`accept: guide`, `accept: instrukcja`) |

Monospace lines (the terminal mockups) are always checked at 8 px instead of 4. Withdrawn: a −6 px right-aligned ArchitectureSection button label — it came from Figma using a real ExtraBold where the browser draws Bold; the styles were switched to Bold and it passes.

## Known differences and gaps

- **Testimonial quotes are upright in Figma**: the site loads no italic face, so the browser slants the upright one; Figma keeps the upright style so line breaks match.
- **StageCard**: the code's `flex-1` text block (pushing the output link to the card's foot) cannot be mirrored inside a filling card; in rows of uneven cards the link sits under the text.
- **ProcessSection's video tile** is not a library part: on the UX Design Skill page it is drawn in the instance's slot from library styles and the `play_arrow` icon, without the Wistia thumbnail.
- **Pricing cards**: Figma has no subgrid, so each PricingTier instance gets its row heights (76 / 196 / 481 / 60; sale 76 / 268 / 481 / 60). Comparison and KB sources tables have column widths fixed per breakpoint.
- **Knowledge base page at 390**: the three-line back button overhangs the 80 px top bar, as live (clipping off on that instance).
- **Guide and how-it-works**: closed `<details>` answers are clipped layers (hidden layers would drop out of slot content); inline `<code>` backgrounds are not drawn (Figma cannot draw a background behind a text range).
- Code quirks Figma follows (one-off sizes and spacings, faked weights and italics, icon sizes) are on the owner's list of possible site changes, kept with the project records under `projects/` (git-ignored); Figma mirrors the site as it is until the code changes.
