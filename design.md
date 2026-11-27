# Design System — WEB-Agents Website

## 1. Introduction

This design system documents the visual tokens, the shared parts, the page sections and the conventions of agents.creativesparks.pl, the Creative Sparks site for its AI skills. The site is built on Astro 7 and Tailwind 4, with text kept in Astro content collections, in Polish (at the root) and English (under `/en/`). Its pages:

- the UX Design Skill page `/ux-design-skill/` and its sub-pages: knowledge base (`baza-wiedzy/`, EN `knowledge-base/`), how it works (`instrukcja/`, EN `how-it-works/`), `changelog/`, terms (`regulamin/`, EN `terms/`) and privacy policy (`polityka-prywatnosci/`, EN `privacy-policy/`);
- the two free-skill pages, `/free-homepage-ux-audit-skill/` and `/free-website-planning-skill/`, each with its own `changelog/`;
- the free-skill guide `/free-skills/guide/` and the email answer page `/answer/` (reached only from email links, `noindex`).

`/` redirects to `/ux-design-skill/`. The retired `/ux-designer/` pages are kept in `src/pages/archive/ux-designer/` and their old URLs redirect to today's pages (`vercel.json`); this document does not describe them.

The decisions documented here cover the token vocabulary in the `@theme` block of `global.css`, the type scale, the parts in `src/components/ui/`, the sections in `src/components/sections/`, and the decomposition and i18n conventions that govern how sections are built and how content is loaded. Anyone joining the project should be able to understand both the visual language and the component model from this document in a single read.

**Where design lives.** New or changed UI is designed in Figma before it is built, in three files: Brand base (primitive colours, fonts, logo, icons), Web library (tokens, text styles, one component per code component) and Website (the live pages at 1440 and 390 px, built from library instances). Their keys are in `AGENTS.md` → Infrastructure → Figma. The process is in `docs/design-process.md`, the map of the three files in `docs/figma/README.md`. Every web-library component has the same name as its code component and is mapped to it with Code Connect (templates in `figma/code-connect/`, config in `figma.config.json`). This document describes the code, the record of today's design; Figma is brought up to date after each release (step 5 of the process).

---

## 2. Tokens

All tokens are defined in the `@theme` block in `src/styles/global.css` and are available as Tailwind utility classes automatically via Tailwind 4's CSS-first configuration. In the web library each colour is a variable named like its token (e.g. `color/surface-primary` is `var(--color-surface-primary)`).

### 2.1 Colors

| Token | Hex | Tailwind utility | Role / where it is used |
|---|---|---|---|
| `--color-primary` | `#010DFF` | `bg-primary`, `text-primary`, `border-primary` | Main brand color, the most used token. Filled and outlined buttons, links (`LinkArrow`), icons, the tick in `ChecklistItem`, the architecture file-tree panel, the hover fill of cards (`ProblemCard`, `PlatformCard`). |
| `--color-primary-dark` | `#020DF6` | `bg-primary-dark`, `text-primary-dark` | Defined but not used on the live pages (shown only on `/design-system/tokens/`). Hover states do not use it: `Button`'s primary variant hovers to black, the secondary one fills with primary. |
| `--color-on-primary` | `#ffffff` | `text-on-primary` | Text on a primary fill. Only the knowledge base's selected page-type button uses the token; elsewhere text on blue is written `text-white` (same value). |
| `--color-accent` | `#E5FA00` | `bg-accent`, `text-accent` | Highlight yellow. The `ChecklistItem` bullet, the hero badge and the hero mockup's offset shadow, the testimonials band, the highlighted pricing tier and landscape card, the architecture CTA box, icons on dark panels; with black in `Button`'s `sale` variant. |
| `--color-accent-dark` | `#DAEE04` | `bg-accent-dark`, `text-accent-dark` | One use: the verified icon in the knowledge base's sources (`KBSources`). |
| `--color-background` | `#ffffff` | `bg-background` | Page background (`<body>`). Many sections and cards write `bg-white` instead (same value). |
| `--color-foreground` | `#171717` | `text-foreground` | Default text color (`<body>`). Near-black for maximum readability on white. |
| `--color-muted` | `#4C4C4C` | `text-muted` | Secondary text: descriptions, captions, item numbers, footer links. |
| `--color-border` | `#CDCDCD` | `border-border` | Dividers, accordion and table rules, the empty stars of `RatingStars`. |
| `--color-surface` | `#FAFAFA` | `bg-surface` | Off-white band for rhythm between sections (`ProcessSection`, `LandscapeSection`, `PlatformSection`, `AuthorSection`, the "what it doesn't do" `ProblemsSection` via `!bg-surface`), the plain pricing tiers. |
| `--color-surface-primary` | `#F1F2FE` | `bg-surface-primary` | Tinted blue band and hover fill: section backgrounds (`UseCasesSection`, `ComparisonSection`, `TryFreeSection`, `FAQSection`, `DemoSection`, `ChangelogSection`, `EmailAnswerSection`, `KBPageTypes`), the `StageCard` hover, code and note boxes on the long-text pages. |
| `--color-surface-accent` | `#FAFECC` | `bg-surface-accent` | Tinted yellow: the `KnowledgeBaseSection` and `KBFrameworks` bands, `ProblemCard`, the offer box in `FreeSkillForm`. |
| `--color-pattern` | `#EBEBEB` | `bg-pattern` | One use: the `KBPatterns` band. Not intended for text containers. |

Primary and accent are the two active brand colors. Use primary for interactive and structural elements; accent for emphasis, highlights, and calls-to-attention. The surface palette (surface, surface-primary, surface-accent) provides three levels of section tinting that stay harmonious without needing custom one-off colors. Colours outside the tokens: white and black (`bg-white`, `text-white`, `Button`'s black hover and sale variant), and Tailwind's zinc, emerald and amber in the hero's terminal mockup.

### 2.2 Typography

| Token | Font family | Weight(s) loaded | Role |
|---|---|---|---|
| `--font-headline` | `"Gilroy", sans-serif` | 400, 700 | Section headings, hero headings, card titles. The primary display typeface. |
| `--font-display` | `"Gilroy", sans-serif` | 400, 700 | Alias of headline. Use for large decorative numerals or oversized labels. |
| `--font-body` | `"Noto Sans", sans-serif` | 400, 500, 600, 700 | Body copy, descriptions, list items, and all running text. |
| `--font-sans` | `"Noto Sans", sans-serif` | 400, 500, 600, 700 | Alias of body. Tailwind's default family, so text with no family class is set in Noto Sans. |
| `--font-label` | `"Noto Sans Mono", monospace` | 400, 500, 700 | Monospaced labels: badges above headings, links, navigation, footer, item numbers, small uppercase captions. |
| `--font-mono` | `"Noto Sans Mono", monospace` | 400, 500, 700 | Alias of label. Tailwind's default `font-mono` override. |

All three families are self-hosted. Gilroy is two woff2 files (Latin + Latin Extended-A subset) in `src/assets/fonts/`, declared with `@font-face` in `global.css`; Noto Sans and Noto Sans Mono come from the `@fontsource` packages imported at the top of `global.css`, normal style only (no italic files). Headline and display are effectively the same typeface — use `font-headline` for semantic clarity on section headings, and `font-display` when using Gilroy for a non-heading decorative purpose.

### 2.3 Type scale

The site has no named type ramp and no type-size tokens: text is set with Tailwind classes in each component. On the nine Polish pages drawn in the Figma Website file (the UX Design Skill page, both free-skill pages, the UX Design Skill changelog, the free-skill guide, how it works, the knowledge base, the terms and the email answer page) the rendered text comes to about 70 distinct combinations of family, size, weight, line height and tracking. They group by family:

| Group | Class | Font | Typical use |
|---|---|---|---|
| Headline | `font-headline` | Gilroy | h1–h3, card titles, large numbers |
| Body | `font-body`, or no family class | Noto Sans | Running text, taglines, buttons |
| Label | `font-label` | Noto Sans Mono | Badges, `LinkArrow`, navigation, footer, numbers, uppercase captions |

- **Sizes** are Tailwind's scale, `text-xs` to `text-8xl` (`text-8xl` only in the knowledge base hero), plus two sizes off the scale: `text-[10px]` (small uppercase captions, e.g. `DecisionCard`, the `KBHero` stat labels) and `text-[13px]` (`TopAppBar` links, `Button` size `sm`). `text-[28px]` also appears, but it sizes an icon (the offer icon in `FreeSkillForm` at `lg`), not text.
- **Weights**: `font-normal`, `font-medium`, `font-semibold`, `font-bold` (by far the most common) and `font-extrabold`.
- **Line heights**: Tailwind's named ones (`leading-none`, `-tight`, `-snug`, `-normal`, `-relaxed`, and `leading-5`, `leading-7`) plus four arbitrary values: `leading-[1.1]` (section h2s), `leading-[1.05]` (the hero h1), `leading-[0.95]` (the knowledge base h1) and `leading-[1.4]` (item numbers beside accordion rows). The long-text pages (terms, privacy policy) set 1.75 for paragraphs and list items in their own page-level `.prose-custom` style block.
- **Tracking**: `tracking-tight` on most headings, links and buttons; `tracking-wider` and `tracking-widest` on uppercase captions.

**Figma counterpart.** In the web library every combination is a text style named after the Tailwind classes that produce it, e.g. `Headline/5xl/bold · leading-[1.1] · tracking-tight`, with font family and size bound to variables (the family to the brand base's font variables, the size to the Tailwind scale). Reading a text's classes gives its style name; building text from a style means writing the classes in its name.

**Weights the site does not load.** Gilroy ships only 400 and 700, and Noto Sans has no 800 file, so `font-extrabold` (800) has no face of its own: the browser draws it with the 700 face, and it looks exactly like `font-bold`, although computed styles report 800. The same goes for `font-semibold` on Gilroy or Noto Sans Mono (no 600 face, drawn at 700). Extrabold is used on the hero h1 and the `FullScreenDialog` title (Gilroy) and on the `md`/`lg` buttons of `Button` and `FreeSkillForm` (Noto Sans). In Figma these texts use the Bold face. Italic is not loaded for any family either, so `italic` text is slanted by the browser.

### 2.4 Spacing

| Token | Value | Role |
|---|---|---|
| `--spacing-section` | `80px` | Defined for vertical padding of page bands at mobile/tablet viewports. |
| `--spacing-section-lg` | `144px` | Defined for vertical padding of page bands from the `lg:` breakpoint. |
| `--spacing-grid` | `64px` | Defined for the gap inside a section, between its header and its grid or between columns. |

None of the three is used by a page or component today (`py-section`, `py-section-lg` and `gap-grid` appear nowhere). Sections use Tailwind's scale instead: section shells are `py-20 md:py-28` (80 px, 112 px from 768 px; `EmailAnswerSection` uses `py-16 md:py-24`), content sits in `max-w-screen-2xl mx-auto px-6`, and gaps are mostly `gap-4`, with `gap-6`, `gap-12` and `gap-16` (64 px) between larger blocks. The web library's spacing variables follow the same Tailwind scale.

### 2.5 Radii

| Token | Value | Role |
|---|---|---|
| `--radius-default` | `0px` | Default corner radius. All cards, buttons, and containers are sharp-cornered. |
| `--radius-lg` | `0px` | Large-variant radius. Also zero — maintains the architectural-precision aesthetic. |
| `--radius-xl` | `0px` | Extra-large radius. Also zero, so the `rounded-xl` written on the guide and how-it-works pages' boxes draws square corners. |
| `--radius-full` | `9999px` | Pill / circle shape: `rounded-full` on the hero mockup's three window dots and the photo in `EmailAnswerSection`. |

The `ChecklistItem` bullet and the `circle` shape of `StageCard` are round through `border-radius: 50%` in their own styles. The design deliberately uses zero border-radius everywhere except circular elements. This is an intentional aesthetic choice ("architectural precision"). Do not introduce rounded corners on cards or buttons without an explicit design decision to change this convention.

---

## 3. Parts (ui/)

The ten shared parts live in `src/components/ui/<Name>.astro`. Every one except `CookieTable` has a web-library component of the same name.

| Part | What it is | Main props | Used by |
|---|---|---|---|
| `Button` | CTA button. Renders as `<a>` (with `href`) or `<button>`; optional trailing Material Symbols icon. | `href`, `size` (`sm`/`md`/`lg`), `variant` (`primary`, `secondary`, `sale` — black and yellow, shown only in the sale window), `trailingIcon`, `block`, `external` | HeroSection, TopAppBar, PricingTier, ArchitectureSection (CTA box), DemoSection, TestimonialsSection |
| `LinkArrow` | Text link in the label font with a trailing arrow (default `arrow_forward`); moves right on hover. | `href`, `icon`, `trailingIcon`, `external` | ArchitectureSection, DemoSection, ProblemsSection, PricingSection, TestimonialsSection, FAQItem, CaseCard, TryFreeCard |
| `ChecklistItem` | Yellow round bullet with a blue tick, a title and an optional slotted body. | `title` | HeroSection (its bullet list, titles only) |
| `SectionWithIcon` | Layout: the decorative section icon (from `lg`) beside the section header, the body below or beside it. | `icon`, `layout` (`stacked`/`side-by-side`) | Nearly every section, the guide and how-it-works pages |
| `StageCard` | White card: optional shape glyph (`cube`, `diamond`, `circle`, `grid`, `nested`, `bars`) and number, title, description, optional output link (new tab, tracked in Umami and Meta) and quote. | `title`, `description`, `index`, `shape`, `output`, `outputLink`, `outputIcon`, `quote`, `trackEvent`, `trackParams` | ProcessSection |
| `RatingStars` | Five stars filled to the average rating, the visible text beside them and a full sentence for screen readers; a link when `href` is set. | `value`, `text`, `label`, `href` | HeroSection (when its entry has a `rating`) |
| `FreeSkillForm` | The free-skill sign-up: email field, the 14-day offer box, button, consent line, error and success states, and the "check your inbox" sheet after sign-up. Text in PL and EN built in. | `skill` (`audit`/`planning`), `surface` (analytics label), `size` (`md`/`lg`), `submitLabel`, `placeholder`, `successHeading`, `successNote`, `block`, `fitContainer` | TryFreeCard; the free pages' HeroSection (`primary-cta` slot) and DemoSection (`cta` slot) |
| `FullScreenDialog` | Dialog on the native `<dialog>`: full screen, or with `sheet` a bottom sheet on phones and a centred 512 px panel from 640 px. Opened by a `full-screen-dialog:open` event; closes only on purpose. | `id`, `title`, `closeLabel`, `icon`, `sheet`; slots: default, `footer` | FreeSkillForm |
| `PreSaleCountdown` | The sale window's countdown text and the page-wide script that shows `[data-sale-only]` / `[data-list-only]` elements and swaps sale and list links at the window's edges (`src/lib/presale.ts`). | `showCountdown` (`false` = script only) | HeroSection (countdown), PricingSection and TopAppBar (script only) |
| `CookieTable` | The privacy policies' cookie list, one table per consent category, built from the same rows as the banner's preferences window. | `lang` | The two privacy-policy pages |

### 3.1 ChecklistItem

**Purpose.** `ChecklistItem` renders a single checklist entry consisting of a circular accent-colored bullet with an embedded checkmark, a title line, and an optional body paragraph delivered via slot. The hero uses it for its bullet list (title only).

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | The text rendered in the title line (`text-xl`, normal weight). |
| `class` | `string` | `undefined` | Additional Tailwind classes merged onto the root `<div>`. |
| `...rest` | `HTMLAttributes<'div'>` | — | Any other HTML div attributes (e.g., `id`, `data-*`) are spread onto the root element. |

The slot (`<slot />`) receives the body text rendered below the title at `text-base`; without it only the title shows. The bullet is a 24 px accent circle with a primary checkmark, drawn in the component's own styles; neither is configurable via props. Do not use it as a generic list item — if you need a list without the checkmark bullet style, use plain `<li>` elements with Tailwind classes.

### 3.2 SectionWithIcon

**Purpose.** `SectionWithIcon` is a layout primitive that pairs a decorative section icon (hidden below `lg`) with section content in one of two arrangements: a stacked layout where the icon sits in a row with the header and the body is indented under it, or a side-by-side layout where the header column is sticky at `top-24` and the body column scrolls alongside it. It gives content sections a consistent icon-anchored structure. The icons are `src/assets/icons/shape-1.svg` to `shape-12.svg`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ImageMetadata` | `undefined` | Astro image metadata for the decorative icon. Rendered as `<img aria-hidden="true">`. If omitted, the icon column is skipped and content fills the full width. |
| `layout` | `'stacked' \| 'side-by-side'` | `'stacked'` | Controls the arrangement. `stacked` places icon + header above body. `side-by-side` uses a 12-column grid with a sticky header column (5 cols) and a scrolling body column (7 cols). |
| `class` | `string` | `undefined` | Additional classes merged onto the root wrapper `<div>`. |
| `...rest` | `HTMLAttributes<'div'>` | — | Spread onto the root element. |

The component uses two named slots: `header` (for the section heading/badge area) and the default slot (for body content). Every live use is `stacked`; `side-by-side` appears only in the showcase (`/design-system/components/`). Do not use `SectionWithIcon` as a generic two-column layout — it is semantically tied to the "section with optional decorative icon" pattern.

---

## 4. Sections (layout shells)

Each section lives in a named subfolder: `src/components/sections/<kebab-name>/<SectionName>.astro`. Item subcomponents (CaseCard, FAQItem, etc.) are colocated in the same folder. Sections take the page's language from the URL (`localeFromPathname(Astro.url.pathname)`, see section 6) and get their content in one of three ways:

- **They load their own entry** for that language (`requireLocalizedEntry`, `getLocalizedCollection` from `src/lib/i18n.ts`), some with an `entryId` for a page variant: HeroSection, LandscapeSection, ComparisonSection, TestimonialsSection, PricingSection, TryFreeSection, PlatformSection, KnowledgeBaseSection, AuthorSection, ChangelogSection, EmailAnswerSection, TopAppBar, Footer; FAQSection and ArchitectureSection unless the page passes its own items.
- **They take everything as props**, which the page reads from a collection: ProcessSection, UseCasesSection, ProblemsSection, DemoSection. That is why one section serves several collections (ProblemsSection shows `boundaries` and `install`).
- **They carry their copy in the component** as `COPY_PL` / `COPY_EN`: the five `kb/` sections, and the default texts of ArchitectureSection and PricingSection.

Pages below: **UXDS** = `/ux-design-skill/`, **Audit** = `/free-homepage-ux-audit-skill/`, **Planning** = `/free-website-planning-skill/`; each also at `/en/…`.

| Section | Content | Colocated parts | What it is | Pages |
|---|---|---|---|---|
| `top-app-bar/TopAppBar.astro` | `nav` | — | Header: logo, nav links, CTA; sticky by default. In the sale window the default CTA becomes the black-and-yellow sale button. Props `navLinks`, `ctaLabel`, `ctaHref`, `showCta`, `sticky`. | Every page; the free pages and the guide pass their own links, no CTA, not sticky |
| `hero/HeroSection.astro` | `hero` (`entryId`) | — | Page hero: badge (the sale countdown on UXDS, the download count on the free pages), optional rating, h1 in three parts, tagline, bullets, CTAs; on the right a terminal mockup that opens the demo video (Wistia). Slot `primary-cta` replaces the buttons. Prop `entryId`. | UXDS, Audit, Planning (with `FreeSkillForm` in the slot) |
| `process/ProcessSection.astro` | props (`proof-gallery`, `process`) | — (cards are `ui/StageCard`) | Grid of StageCards in 2 or 3 columns, optional video tile, default slot below the grid. Props `headingId`, `badge`, `heading`, `lead`, `cards`, `videoTile`, `icon`, `columns`. | UXDS twice (proof gallery, the four-step process), Audit and Planning (proof gallery) |
| `use-cases/UseCasesSection.astro` | props (`value-props`) | `CaseCard`, `ExampleCard` | Numbered accordion cards (`CaseCard`, one open at a time per `groupName`); optional examples panel (`ExampleCard`). Props `headingId`, `badge`, `heading`, `cases`, `examples`, `icon`, `groupName`. | UXDS (value props) |
| `knowledge-base/KnowledgeBaseSection.astro` | `knowledge-base` | `KnowledgeColumn` | Three columns (page types, frameworks, section patterns) and a link to the knowledge base page. Props `heading`, `mapLabel`. | UXDS |
| `landscape/LandscapeSection.astro` | `landscape` (`entryId`) | — | Category map: header, a 2×2 grid of default cards with optional `sampleLabel`, a full-height accent highlight card, optional closing line. On UXDS: the free skills on GitHub. Props `entryId`, `headingId`. | UXDS |
| `comparison/ComparisonSection.astro` | `comparison` (`entryId`) | `ComparisonRow` | Feature table, one icon and text per column (yes / no / partial / n.a.), one column highlighted. Prop `entryId`. | UXDS |
| `problems/ProblemsSection.astro` | props (`boundaries`, `install`, or the page's own items) | `ProblemCard` | Icon cards in 2, 3 or 4 columns, optional intro and footer note with link. Props `headingId`, `badge`, `heading`, `intro`, `items`, `columns`, `footerNote`, `footerLink`, `icon`. | UXDS and Audit ("what it doesn't do", install), Planning (three steps, "what it doesn't do") |
| `testimonials/TestimonialsSection.astro` | `testimonials` | — | One-at-a-time slider on the accent background: quote, name, optional company (a link when it has an address), photo with speckle texture, previous/next buttons and a polite counter. No autoplay, no swipe; 300 ms fade, instant with reduced motion. Props `buttons` (default none), `headingId`. | UXDS, Audit, Planning |
| `pricing/PricingSection.astro` | `pricing` | `PricingTier` | Three package cards with list and sale prices and buy links (checkout links carry `lang` and `page`); `PreSaleCountdown` swaps them at the sale window's edges. No props. | UXDS |
| `try-free/TryFreeSection.astro` | `try-free` | `TryFreeCard` | Two free skills side by side, picked by situation. Each card has the sign-up form (`FreeSkillForm`) and a link to the skill's page. Prop `headingId`. | UXDS |
| `architecture/ArchitectureSection.astro` | `architecture` + copy in the component | `DecisionCard` | Badge, heading, lead, optional link; a blue file-tree panel (slot `tree` replaces it) beside the decision cards; optional accent CTA box with a `Button`. Props `badge`, `heading`, `lead`, `link`, `decisions`, `cta`. | UXDS (defaults), Audit and Planning (own decisions and CTA box; Planning also its own tree) |
| `platform/PlatformSection.astro` | `platform` | `PlatformCard` | Platform cards and the "what's in the package" list. | UXDS |
| `faqs/FAQSection.astro` | `faqs`, or the `entries` prop | `FAQItem` | Numbered accordion of questions. Props `heading`, `entries`. | UXDS (collection), Audit and Planning (the page's own entries) |
| `author/AuthorSection.astro` | `author` | — | Author bio card with photo, experience figure, email and LinkedIn. | UXDS, Audit |
| `demo/DemoSection.astro` | props (`final-cta`) | `DemoStage` | Closing call to action: heading, intro, CTA button and secondary links, or the `cta` slot. It also takes `stages` (`DemoStage` cards), `note` and `videoPopover`. Props `badge`, `heading`, `intro`, `stages`, `note`, `cta`, `secondaryLinks`, `videoPopover`, `icon`. | UXDS, Audit, Planning (last section; the free pages put `FreeSkillForm` in the slot) |
| `changelog/ChangelogSection.astro` | `changelog` | `ChangelogEntry` | Release notes of one product as accordion entries, newest first. Props `product` (required: `ux-design-skill`, `homepage-ux-audit`, `website-planning`), `label`. | The three changelog pages |
| `kb/KBHero.astro`, `kb/KBPageTypes.astro`, `kb/KBFrameworks.astro`, `kb/KBPatterns.astro`, `kb/KBSources.astro` | copy in each component | — | The knowledge base page's five sections: hero with stat cards; the 16 page types (a list of buttons that switches the detail panel on desktop, an accordion on phones); the 13 frameworks; section patterns by category; experts and organisations. No props. | Knowledge base page |
| `email-answer/EmailAnswerSection.astro` | `email-answers` + `author` | — | The thank-you note on the email answer page, its text picked by the link's `mail` and `odp` parameters, then the owner's photo and contact. | `/answer/` |
| `footer/Footer.astro` | `footer` | — | Logo + flat link list. Prop `changelogHref` (a free page points the Changelog link at its own). | Every page |

**Folders and parts that are not live.**

- `audience-filter/AudienceFilterSection.astro` — a props-only card grid (badge, heading, lead, cards). No page and no showcase imports it, and it has no Figma counterpart.
- `value-props/` and `proof-gallery/` — empty folders (only Google Drive's `desktop.ini`). The content collections of the same names are live; they render through UseCasesSection and ProcessSection.
- `DemoStage` and `ExampleCard` render only on `/design-system/sections/`: no live page passes `stages` to DemoSection or `examples` to UseCasesSection. Neither has a Figma counterpart.

The web library also holds a few smaller pieces that are written inline in a section's markup, not as components (e.g. `KBStatCard` in `KBHero`, `PricingFeature` in `PricingTier`); their Code Connect templates point at the section's file.

**Colocated subcomponents (12 total)** all sit at exactly 1 importer — none have been promoted to `ui/` per strict T2.

### 4.1 Pages and their sections

| Page (PL · EN) | Sections, top to bottom |
|---|---|
| UXDS · `/en/ux-design-skill/` | TopAppBar · HeroSection · ProcessSection (proof gallery) · UseCasesSection (value props) · ProcessSection (process) · KnowledgeBaseSection · LandscapeSection · ComparisonSection · ProblemsSection ("what it doesn't do") · TestimonialsSection · PricingSection · TryFreeSection · ArchitectureSection · PlatformSection · ProblemsSection (install) · FAQSection · AuthorSection · DemoSection (final CTA) · Footer |
| Audit · `/en/free-homepage-ux-audit-skill/` | TopAppBar · HeroSection + FreeSkillForm · ProcessSection (proof gallery) · ArchitectureSection · TestimonialsSection · ProblemsSection ("what it doesn't do") · ProblemsSection (install) · FAQSection · AuthorSection · DemoSection + FreeSkillForm · Footer |
| Planning · `/en/free-website-planning-skill/` | TopAppBar · HeroSection + FreeSkillForm · ProcessSection (proof gallery) · ArchitectureSection · TestimonialsSection · ProblemsSection (three steps) · ProblemsSection ("what it doesn't do") · FAQSection · DemoSection + FreeSkillForm · Footer |
| `/ux-design-skill/baza-wiedzy/` · `/en/ux-design-skill/knowledge-base/` | TopAppBar · KBHero · KBPageTypes · KBFrameworks · KBPatterns · KBSources · Footer |
| The three `changelog/` pages (+ EN) | TopAppBar · ChangelogSection · Footer |
| `/ux-design-skill/instrukcja/` · `/en/ux-design-skill/how-it-works/`; `/free-skills/guide/` · `/en/free-skills/guide/` | TopAppBar · long text written in the page, on SectionWithIcon · Footer |
| `/ux-design-skill/regulamin/` · `/en/ux-design-skill/terms/`; `/ux-design-skill/polityka-prywatnosci/` · `/en/ux-design-skill/privacy-policy/` | TopAppBar · long text styled by the page's own `.prose-custom` block · CookieTable (privacy policy only) · Footer |
| `/answer/` · `/en/answer/` | TopAppBar · EmailAnswerSection · Footer |

The long-text pages have no section components: their markup lives in the page file, and in Figma they are composed in the page frame from library text styles and parts.

---

## 5. Decomposition convention

The project follows the extraction triggers and colocation rule from `~/.claude/agents/web-developer/references/component-architecture.md`. The load-bearing triggers are:

| # | Trigger | Testable condition | Action |
|---|---|---|---|
| T1 | Interaction boundary | Needs client-side events, state, browser APIs | Extract to framework island with `client:*` |
| T2 | Cross-page reuse | Used in >=2 distinct files (pages/layouts/sections) | Extract to `ui/` |
| T3 | Within-section repetition | Same subtree repeated >=3 times | Extract ITEM colocated with parent section; keep grid wrapper inline. Promote to `ui/` only when imported from 2nd file. |
| T4 | Variant pressure | >=2 Figma variants, >=2 optional regions, or responsive layout flip | Extract to `ui/` (small) or `sections/` (wide) |
| T5 | Semantic independence | Describable with single noun phrase + single responsibility + clean inputs | Extract even if single-use |
| T6 | Accessibility contract | Stable a11y pattern (nav landmark, button semantics, form labeling) | Extract to `ui/` — centralizes semantics |
| T7 | Content passing complexity | Tempted to pass HTML through props or string-build markup | Extract + use slots (not `set:html`) |
| T8 | Attribute pass-through | Must allow arbitrary HTML attributes (id, data-*, aria-*, href) | Extract to `ui/` with `...rest` + class merge |
| T9 | Line count fallback | Chunk > ~120 lines without other triggers | Extract; colocate with parent if single-use |

**Colocation rule (from the same reference):** When a component is extracted due to length or semantic independence but has only one parent, colocate it next to the parent section file. Do not place single-use subcomponents in global `ui/`.

```
sections/use-cases/
  UseCasesSection.astro
  CaseCard.astro        ← colocated, not ui/CaseCard.astro
```

**This project's adherence.** Repeated items (T3) are extracted and colocated with their section: `CaseCard`, `ExampleCard`, `ProblemCard`, `DecisionCard`, `FAQItem`, `PricingTier`, `ComparisonRow`, `PlatformCard`, `KnowledgeColumn`, `ChangelogEntry`, `TryFreeCard`, `DemoStage`. The interactive pieces (the testimonials slider, the knowledge base's page-type tabs, the video popovers, the sign-up form, the sale-window script) are plain inline scripts in their Astro components; the site has no framework islands.

Promotion to `ui/` is governed by **strict T2**: a colocated subcomponent is promoted to `src/components/ui/` only when it is actually imported from a second section or page. No preemptive promotion. Four parts in `ui/` have a single importer today — `StageCard` (ProcessSection), `ChecklistItem` and `RatingStars` (HeroSection), `FullScreenDialog` (FreeSkillForm); the rule applies to new parts.

---

## 6. i18n strategy

Polish is the default locale and lives at the root; English lives under `/en/` (Astro's `i18n` in `astro.config.mjs`, `prefixDefaultLocale: false`). Each English page is its own file under `src/pages/en/`, with English slugs where the Polish ones differ (`knowledge-base/` for `baza-wiedzy/`). `BaseLayout` adds hreflang alternates for both languages; there is no visible language switcher.

Components take the language from the URL with `localeFromPathname(Astro.url.pathname)` (`src/lib/i18n.ts`) rather than `Astro.currentLocale`, which can be undefined in shared layouts. Content follows two id conventions:

- **Locale-keyed entries**: `pl.yaml` / `en.yaml` (or `.mdx`), or `pl/` and `en/` folders for collections with one file per item. Read with `requireLocalizedEntry()` and `getLocalizedCollection()`.
- **Page variants** at the collection's root: `skill-lp` (UXDS), `free-audit-skill`, `free-planning-skill`; the English twin adds `-en` (`localizedId()`). Read with `requireEntry()`, which takes a fallback id.

A missing English entry falls back to Polish. Copy that lives in components (the `kb/` sections, `FreeSkillForm`, ArchitectureSection's defaults, PricingSection, PricingTier) is written as `COPY_PL` / `COPY_EN` objects or `locale === 'en'` choices.

---

## 7. Content collections

All collections are defined and Zod-validated in `src/content.config.ts`, with their files under `src/content/<collection>/`.

| Collection | Format and entries | Content shape | Read by |
|---|---|---|---|
| `hero` | MDX, page variants (`skill-lp`, `free-audit-skill`, `free-planning-skill`, each + `-en`) and `pl` | Badge, badge icon and note, headline in three parts (lead, emphasis, tail), tagline, bullets, primary and optional secondary CTA, optional video label, optional `countdownTarget: sale`, optional rating | HeroSection |
| `proof-gallery` | YAML, page variants and `pl` | Badge, heading, lead, cards (title, description, optional shape, link) | The landing pages → ProcessSection |
| `value-props` | YAML, `skill-lp` (+ `-en`) and `pl` | Optional badge, heading, cards (title, description, optional quote, links) | UXDS → UseCasesSection |
| `process` | MDX per step, `pl/` and `en/` | Order, title, optional output label, link, icon, quote and shape; description in the body | UXDS → ProcessSection |
| `landscape` | YAML, `skill-lp` (+ `-en`) and `pl` | Badge, heading, optional lead, cards (`default` or `highlight`, title, description, optional bullets and `sampleLabel`), optional closing line | LandscapeSection |
| `comparison` | YAML, `skill-lp` (+ `-en`) and `pl` | Badge, heading, optional lead, columns (key, label, optional sub, highlight flag), rows (feature + per-column cell with status + text) | ComparisonSection |
| `boundaries` | YAML, `pl`/`en` and the free-page variants | Badge, heading, optional intro, items (icon, optional label, title, description) | The landing pages → ProblemsSection |
| `install` | YAML, `pl`/`en` | As `boundaries`, plus optional footer note and link | UXDS and Audit → ProblemsSection |
| `testimonials` | YAML, `pl`/`en` | Badge, heading, subheading, items (pullQuote, body, name, optional company as label + optional href, photo as an `image()` path into `src/assets/testimonials/`) | TestimonialsSection |
| `pricing` | MDX per package, `pl/` and `en/` (`founder`, `solo`, `studio`) | Order, name, group, value, list and sale price, list and sale checkout URL, highlight flag, optional bg, features | PricingSection |
| `try-free` | YAML, `pl`/`en` | Badge, heading, intro (may hold the download-count placeholder), button labels, cards (skill, analytics surface, question, name, text, page link) | TryFreeSection |
| `architecture` | MDX per decision, `pl/` and `en/` | Order, icon name, label, title, desc | ArchitectureSection (default decisions) |
| `platform` | YAML, `pl`/`en` | Badge, heading, optional intro, contents heading and note, platforms (icon, name, desc, optional note), contents (label, desc), requirements | PlatformSection |
| `knowledge-base` | YAML, `pl`/`en` | Badge, heading, optional intro, pageTypes / frameworks / patterns arrays (name + sub) | KnowledgeBaseSection |
| `faqs` | MDX per question, `pl/` and `en/` | Order, question, optional link; answer in the body | FAQSection |
| `author` | MDX, `pl`/`en` | Badge, heading, nameFirst, nameLast, role, bio, email, contactNote, optional linkedIn, experienceLabel, experienceValue | AuthorSection, EmailAnswerSection |
| `final-cta` | YAML, `pl`/`en` and the free-page variants | Heading, intro, CTA, optional note, optional secondary links | The landing pages → DemoSection |
| `changelog` | MDX per version, one folder per product with one subfolder per locale (`<product>/pl/`, `<product>/en/`) | Version string, date string (range allowed), title, description, changes array | ChangelogSection |
| `email-answers` | YAML, `pl`/`en` | Page title and description, fallback text, answers (`mail`, `odp`, heading, text) | The answer pages, EmailAnswerSection |
| `nav` | YAML, `pl`/`en` | Links array, CTA link | TopAppBar |
| `footer` | YAML, `pl`/`en` | Flat links array, optional legal string | Footer |
| `consent` | YAML, `pl`/`en` | Banner and preferences text, the cookie list (schema in `src/lib/consent-config.ts`) | BaseLayout (the banner), CookieTable — see section 9 |
| `use-cases`, `use-cases-examples`, `problems`, `demo`, `free-trial` | Polish only | Case studies, example links, pain points, demo stages, free-trial stages | Only the showcase (`/design-system/sections/`); `free-trial` also the archived page |

---

## 8. Design system showcase

A standalone showcase lives at `/design-system/` and is driven by `src/layouts/PreviewLayout.astro`. It has four routes:

- `/design-system/` — overview with 3-card grid linking to sub-pages
- `/design-system/tokens/` — every color, spacing token and radius rendered live, with a hand-picked list of type samples (not the full set in section 2.3)
- `/design-system/components/` — prop tables and live previews of four parts (`Button`, `LinkArrow`, `ChecklistItem`, `SectionWithIcon`), the note on colocated subcomponents, and the consent banner preview (`#consent-banner`, see section 9). The other six parts are not shown there.
- `/design-system/sections/` — the sections rendered live with their real content collection data, including the showcase-only collections; the `kb/` sections and `EmailAnswerSection` are not on it

The showcase is `noindex, nofollow` (set in `PreviewLayout.astro` head). It is not part of the main user-facing site but serves as the canary: if a section can't render cleanly in the showcase with its default content, decomposition isn't clean enough — fix it.

---

## 9. Consent banner

The cookie banner and its preferences window are not a component of ours: they are the own UI of CookieConsent v3 (`vanilla-cookieconsent` 3.3.0, pinned and bundled from this site). We keep the library's markup, keyboard handling and button logic, and restyle it only through its `--cc-*` CSS variables, mapped to the tokens in section 2 by `src/styles/cookieconsent-theme.css`. Two rules go beyond variables: the two titles use the headline font, and in the preferences window Accept all and Reject all share a two-column grid, so both take the longer label's width (phones keep the library's stacked, full-width buttons). Do not add hand-written colours or radii there — map a token instead.

| Token | `--cc-*` variables it feeds |
|---|---|
| `--color-primary` | `--cc-btn-primary-bg`, `--cc-btn-primary-border-color`, `--cc-btn-secondary-color`, `--cc-btn-secondary-border-color`, `--cc-btn-secondary-hover-bg`, `--cc-btn-secondary-hover-border-color`, `--cc-link-color`, `--cc-toggle-on-bg` |
| `--color-on-primary` | `--cc-btn-primary-color`, `--cc-btn-primary-hover-color`, `--cc-btn-secondary-hover-color` |
| `--color-foreground` | `--cc-primary-color` (text), `--cc-btn-primary-hover-bg`, `--cc-btn-primary-hover-border-color`, `--cc-overlay-bg` (at 65%) |
| `--color-muted` | `--cc-secondary-color`, `--cc-toggle-off-bg`, `--cc-footer-color`, `--cc-webkit-scrollbar-hover-bg` |
| `--color-background` | `--cc-bg`, `--cc-btn-secondary-bg`, `--cc-cookie-category-expanded-block-bg`, toggle knobs and toggle icons |
| `--color-border` | `--cc-separator-border-color`, `--cc-section-category-border`, `--cc-cookie-category-block-border`, `--cc-cookie-category-block-hover-border`, `--cc-toggle-readonly-bg`, `--cc-toggle-readonly-knob-icon-color`, `--cc-footer-border-color`, `--cc-webkit-scrollbar-bg` |
| `--color-surface` | `--cc-cookie-category-block-bg`, `--cc-footer-bg` |
| `--color-surface-primary` | `--cc-cookie-category-block-hover-bg`, `--cc-cookie-category-expanded-block-hover-bg` |
| `--font-body` | `--cc-font-family` |
| `--font-headline` | `.cm__title`, `.pm__title` (a `font-family` rule, not a variable) |
| `--radius-default` (0px) | `--cc-modal-border-radius`, `--cc-btn-border-radius` |
| `--radius-full` | `--cc-pm-toggle-border-radius` (the round toggles) |

**Layout** (set in `buildConsentConfig`): the banner is a box at the bottom right on desktop and spans the screen width on phones, less an 8px margin each side; it has no overlay, so the page stays usable while it is open. The preferences window is a box too — centred on desktop, full screen on phones — and dims the page behind it (`--cc-overlay-bg`).

**Equal weight.** Accept all and Reject all share the primary style and the same size (`equalWeightButtons: true`), so refusing is as easy as agreeing. Settings uses the secondary (outlined) style. Do not make Reject all look weaker than Accept all.

**Where it lives.**

- Text and cookie list: `src/content/consent/pl.yaml` and `en.yaml` (the `consent` collection). The same entries feed the privacy policies' cookie table (`CookieTable`).
- Config builder: `src/lib/consent-config.ts` — `buildConsentConfig(content, language)`; raise `CONSENT_REVISION` to ask everyone again.
- Theme: `src/styles/cookieconsent-theme.css`, imported right after `vanilla-cookieconsent/dist/cookieconsent.css`.
- Runner: `src/scripts/consent.ts`, on every `BaseLayout` page.
- Showcase: `/design-system/components/#consent-banner` opens the real banner and preferences window with the Polish text. It runs under its own `cc_preview` cookie with nothing automatic, so it never touches the viewer's real choice (`cc_cookie`).
