# Design System — WEB-Agents Website

## 1. Introduction

This design system documents the visual tokens, component primitives, section shells, and architectural conventions used in the WEB-Agents website (the Polish-language landing page at `/ux-designer/`). The site is built on Astro 6 and Tailwind 4, with content managed through Astro content collections. The system is designed to support a future English locale and a Keystatic CMS integration without requiring structural changes — those follow-up efforts become content edits, not architecture changes.

The decisions documented here cover three areas: the token vocabulary defined in the `@theme` block of `global.css`, the two promoted UI primitives (`ChecklistItem` and `SectionWithIcon`), and the decomposition and i18n conventions that govern how sections are built and how content is loaded. Anyone joining the project should be able to understand both the visual language and the component model from this document in a single read.

---

## 2. Tokens

All tokens are defined in the `@theme` block in `src/styles/global.css` and are available as Tailwind utility classes automatically via Tailwind 4's CSS-first configuration.

### 2.1 Colors

| Token | Hex | Tailwind utility | Role / intended usage |
|---|---|---|---|
| `--color-primary` | `#010DFF` | `bg-primary`, `text-primary`, `border-primary` | Main brand color. Used for CTA buttons, key interactive elements, links, and the checkmark icon in `ChecklistItem`. |
| `--color-primary-dark` | `#020DF6` | `bg-primary-dark`, `text-primary-dark` | Hover/active state of primary. Apply on `:hover` and `:focus-visible` variants of primary-colored elements. |
| `--color-on-primary` | `#ffffff` | `text-on-primary` | Text/icon color placed on top of a primary background. Ensures contrast on blue fills. |
| `--color-accent` | `#E5FA00` | `bg-accent`, `text-accent` | Highlight yellow. Used for the checklist bullet background, callout labels, and badge chips. |
| `--color-accent-dark` | `#DAEE04` | `bg-accent-dark` | Hover/active state of accent. Apply on `:hover` over accent-colored elements. |
| `--color-background` | `#ffffff` | `bg-background` | Page background. Default surface for all sections unless overridden. |
| `--color-foreground` | `#171717` | `text-foreground` | Default body text color. Near-black for maximum readability on white. |
| `--color-muted` | `#4C4C4C` | `text-muted` | Secondary / helper text. Use for supporting descriptions, meta labels, and captions where contrast with foreground is needed. |
| `--color-border` | `#CDCDCD` | `border-border` | Default border color for dividers, cards, and table rules. |
| `--color-surface` | `#FAFAFA` | `bg-surface` | Slightly off-white surface. Use as an alternative section background for visual rhythm between page bands. |
| `--color-surface-primary` | `#F1F2FE` | `bg-surface-primary` | Tinted blue surface. Use for pricing cards, comparison highlights, and other elements that need to echo the primary color without full saturation. |
| `--color-surface-accent` | `#FAFECC` | `bg-surface-accent` | Tinted yellow surface. Use for callout blocks, tip cards, or any element that needs a warm highlight without full accent saturation. |
| `--color-pattern` | `#EBEBEB` | `bg-pattern` | Decorative background pattern fill (e.g., dot grids, stripes). Not intended for text containers. |

Primary and accent are the two active brand colors. Use primary for interactive and structural elements; accent for emphasis, highlights, and calls-to-attention. The dark variants exist solely for state changes — do not use them as base colors. The surface palette (surface, surface-primary, surface-accent) provides three levels of section tinting that stay harmonious without needing custom one-off colors.

### 2.2 Typography

| Token | Font family | Weight(s) loaded | Role |
|---|---|---|---|
| `--font-headline` | `"Gilroy", sans-serif` | 400, 700 | Section headings, hero headings. The primary display typeface. |
| `--font-display` | `"Gilroy", sans-serif` | 400, 700 | Alias of headline. Use for large decorative numerals or oversized labels. |
| `--font-body` | `"Noto Sans", sans-serif` | Variable (system) | Body copy, descriptions, list items, and all running text. |
| `--font-sans` | `"Noto Sans", sans-serif` | Variable (system) | Alias of body. Tailwind's default `font-sans` override. |
| `--font-label` | `"Noto Sans Mono", monospace` | Variable (system) | Monospaced labels, badges, version tags, code snippets, and any UI chrome that benefits from tabular spacing. |
| `--font-mono` | `"Noto Sans Mono", monospace` | Variable (system) | Alias of label. Tailwind's default `font-mono` override. |

Gilroy is self-hosted (two OTF files loaded via `@font-face` in `global.css`). Noto Sans and Noto Sans Mono are expected to be loaded from Google Fonts or a similar CDN at the page level. Headline and display are effectively the same typeface — use `font-headline` for semantic clarity on section headings, and `font-display` when using Gilroy for a non-heading decorative purpose.

### 2.3 Spacing

| Token | Value | Role |
|---|---|---|
| `--spacing-section` | `80px` | Vertical padding between major page bands at mobile/tablet viewports. |
| `--spacing-section-lg` | `144px` | Vertical padding between major page bands at large viewport (`lg:` breakpoint and up). |
| `--spacing-grid` | `64px` | Internal gap inside a section — between the section header and its content grid, or between grid columns. |

Use `--spacing-section` and `--spacing-section-lg` together with responsive classes (`py-section lg:py-section-lg`) on every section shell to maintain consistent vertical rhythm across the page. Use `--spacing-grid` for gaps between section sub-elements, not between sections themselves.

### 2.4 Radii

| Token | Value | Role |
|---|---|---|
| `--radius-default` | `0px` | Default corner radius. All cards, buttons, and containers are sharp-cornered. |
| `--radius-lg` | `0px` | Large-variant radius. Also zero — maintains the architectural-precision aesthetic. |
| `--radius-xl` | `0px` | Extra-large radius. Also zero. |
| `--radius-full` | `9999px` | Pill / circle shape. Used for the checklist bullet (`ChecklistItem`) and any round badge or avatar. |

The design deliberately uses zero border-radius everywhere except circular elements. This is an intentional aesthetic choice ("architectural precision"). Do not introduce rounded corners on cards or buttons without an explicit design decision to change this convention.

---

## 3. Components (ui/ primitives)

### 3.1 ChecklistItem

**Purpose.** `ChecklistItem` renders a single checklist entry consisting of a circular accent-colored bullet with an embedded checkmark icon, a bold title line, and a body paragraph delivered via slot. It is used in the hero section's social-proof checklist and anywhere a checkmark-annotated feature point is needed.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | The headline text rendered in the title line (`text-xl`). |
| `class` | `string` | `undefined` | Additional Tailwind classes merged onto the root `<div>`. |
| `...rest` | `HTMLAttributes<'div'>` | — | Any other HTML div attributes (e.g., `id`, `data-*`) are spread onto the root element. |

The slot (`<slot />`) receives the body text rendered below the title at `text-base`. The bullet is always accent-colored with a primary-colored checkmark; these are not configurable via props. Use `ChecklistItem` when you need a styled checklist entry with a title and optional body. Do not use it as a generic list item — if you need a list without the checkmark bullet style, use plain `<li>` elements with Tailwind classes.

### 3.2 SectionWithIcon

**Purpose.** `SectionWithIcon` is a layout primitive that pairs a decorative section icon (hidden on mobile) with section content in one of two arrangements: a stacked layout where the icon sits in a row with the header above the body, or a side-by-side layout where the header column is sticky at `top-24` and the body column scrolls alongside it. It is used to give content-heavy sections (process steps, knowledge base, architecture overview) a consistent icon-anchored visual structure.

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ImageMetadata` | `undefined` | Astro image metadata for the decorative icon. Rendered as `<img aria-hidden="true">`. If omitted, the icon column is skipped and content fills the full width. |
| `layout` | `'stacked' \| 'side-by-side'` | `'stacked'` | Controls the arrangement. `stacked` places icon + header above body. `side-by-side` uses a 12-column grid with a sticky header column (5 cols) and a scrolling body column (7 cols). |
| `class` | `string` | `undefined` | Additional classes merged onto the root wrapper `<div>`. |
| `...rest` | `HTMLAttributes<'div'>` | — | Spread onto the root element. |

The component uses two named slots: `header` (for the section heading/badge area) and the default slot (for body content). Use `stacked` for sections with a single block of content below the heading; use `side-by-side` for sections with multiple items that benefit from keeping the heading in view while the user scrolls through the list. Do not use `SectionWithIcon` as a generic two-column layout — it is semantically tied to the "section with optional decorative icon" pattern.

---

## 4. Sections (layout shells)

All 16 sections live under `src/components/sections/`. Each section loads its content via `await getEntry('<collection>', getCurrentLocale())` and accepts an optional `content` prop override for use in the design system showcase.

| Section file | Collection | Purpose |
|---|---|---|
| `HeroSection.astro` | `hero` | Page hero: badge, headline, subheadline, checklist, CTA button. |
| `UseCasesSection.astro` | `use-cases` + `use-cases-examples` | Numbered use case cards with bullet lists, quotes, and demo links; 8 wireframe example links. |
| `ProblemsSection.astro` | `problems` | Icon-annotated list of pain points the product addresses. |
| `OriginSection.astro` | `origin` | Founder story / product origin with badge, heading, callout quote, and comparison items. |
| `ComparisonSection.astro` | `comparison` | Feature comparison table across columns (e.g., product vs. alternatives). |
| `ProcessSection.astro` | `process` | Numbered process steps each with an output link and decorative shape. |
| `PricingSection.astro` | `pricing` | Pricing tier cards with feature lists and optional highlight treatment. |
| `DemoSection.astro` | `demo` | Multi-stage demo walkthrough with badge, intro, stage labels, and optional CTA. |
| `PlatformSection.astro` | `platform` | Platform compatibility grid: integrations, content types, and requirements. |
| `KnowledgeBaseSection.astro` | `knowledge-base` | Taxonomy browser: page types, frameworks, and patterns the product understands. |
| `ArchitectureSection.astro` | `architecture` | Numbered architecture layers with icon, label, title, and description. |
| `FAQSection.astro` | `faqs` | Accordion FAQ list with optional per-item links. |
| `AuthorSection.astro` | `author` | Author bio card with badge, heading, name, role, email, and optional avatar. |
| `ChangelogSection.astro` | `changelog` | Versioned changelog entries with date, title, description, and change list. |
| `TopAppBar.astro` | `nav` | Top navigation bar with links and a CTA button. |
| `Footer.astro` | `footer` | Footer with link columns and optional legal line. |

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

**This project's adherence.** The two sections most likely to trigger T3 (repeated items ≥3) are `UseCasesSection` (use case cards), `ProblemsSection` (problem items), `ProcessSection` (step items), `ArchitectureSection` (layer items), `FAQSection` (FAQ items), and `PricingSection` (pricing tier cards). T9 fires on any section whose shell exceeds ~120 lines. In both cases, the extracted item subcomponent is colocated with the parent section.

Promotion to `ui/` is governed by **D-004 (strict T2)**: a colocated subcomponent is promoted to `src/components/ui/` only when it is actually imported from a second section or page. No preemptive promotion. The two existing `ui/` primitives (`ChecklistItem` and `SectionWithIcon`) both satisfy T2 — they are used across multiple sections.

---

## 6. i18n strategy

The project prepares for internationalisation at the content layer only. Every content collection entry uses a locale code as its entry ID (e.g., `pl.mdx`, `pl.yaml`). Every section loads content through a single `getCurrentLocale()` call (`src/lib/i18n.ts`), which is currently a stub returning the hardcoded default `'pl'`. No `/en/` routes, no language switcher, and no middleware are shipped in this project (D-006). When an English locale lands in a future project, the follow-up work is: add EN content entries, extend `getCurrentLocale()` to read from the request context, add routing, and add a switcher — the section code and content schemas require no changes.

---

## 7. Content collections

All collections are defined and Zod-validated in `src/content.config.ts`. The locale-as-entry-id pattern means the entry ID for Polish content is always `'pl'`.

| Collection name | Format | Content shape |
|---|---|---|
| `hero` | MDX singleton per locale | Badge, headline, optional emphasis fragment, subheadline, checklist array (title + description), CTA link, optional note |
| `use-cases` | MDX per item per locale | Order, number label, title, audience label, bullet list, optional quote, links array |
| `use-cases-examples` | YAML per locale | Array of example links (label, href, optional icon, optional sub-label) |
| `problems` | MDX per item per locale | Order, icon name, title; prose body in MDX slot |
| `origin` | MDX singleton per locale | Badge, heading, callout quote, comparisons array (label + description); prose body in MDX slot |
| `comparison` | YAML singleton per locale | Badge, heading, columns array (key, label, highlight flag), rows array (feature + per-column cell with status + text) |
| `process` | MDX per item per locale | Order, title, output label, output link, output icon, quote, shape identifier |
| `pricing` | MDX per tier per locale | Order, name, sub-label, old price, price, highlight flag, optional bg class, features array |
| `demo` | YAML singleton per locale | Badge, heading, intro, stages array (label + title + description), optional CTA link |
| `platform` | YAML singleton per locale | Badge, heading, optional intro, platforms array (icon + name + desc), contents array (label + desc), requirements array |
| `knowledge-base` | YAML singleton per locale | Badge, heading, optional intro, pageTypes / frameworks / patterns arrays (name + sub) |
| `architecture` | MDX per item per locale | Order, icon name, label, title, desc |
| `faqs` | MDX per item per locale | Order, question string, optional link; answer prose in MDX slot |
| `author` | MDX singleton per locale | Badge, heading, name, role, email, optional avatar path; bio in MDX slot |
| `changelog` | MDX per version per locale | Version string, date, title, description, changes array |
| `nav` | YAML singleton per locale | Links array, CTA link |
| `footer` | YAML singleton per locale | Columns array (heading + links array), optional legal string |
