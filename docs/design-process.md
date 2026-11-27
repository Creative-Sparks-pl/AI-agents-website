# Design process

How new or changed UI is designed and built on this site. The owner set this as the standing process on 2026-11-26.

## Where design lives

Three Figma files in the Fuse Collective team's Creative Sparks project, each published as a library or built from one:

- **Creative Sparks — Brand base** (https://www.figma.com/design/bWv9rlPPYyIltNpCEAw0Yj): the brand's primitive colours, the three font families, the logo and the Material Symbols icons the site uses. Nothing web-specific.
- **Creative Sparks — Web library** (https://www.figma.com/design/zDsBjCordPVukR38UY5GAS): the site's design system. Colour roles named like the CSS tokens (e.g. `color/surface-primary` is `var(--color-surface-primary)`, aliased to the brand base), spacing and radius variables on Tailwind's scale, text styles named after their Tailwind classes, one component per code component — parts (`src/components/ui/`) and sections (`src/components/sections/`), each with phone and desktop variants. Every component's description names its code file, and Code Connect maps it to its Astro component (`figma/code-connect/`).
- **Creative Sparks — Website** (https://www.figma.com/design/uSPmRV0KIyNTpOLO4TcYRU): the live pages at 1440 and 390 px, built only from web-library instances.

The map of what sits where in these files, and how to do the common tasks: `docs/figma/README.md`. The method itself (building from code, checking against the live page, publishing): the `figma-design-set` skill. The file used before 2026-11-27 is kept as an old reference only.

Fonts: Figma has the real fonts (Gilroy, Noto Sans, Noto Sans Mono). Icons are drawn at 24 px, the size the live site renders whatever the `text-*` class says.

## The steps

1. **Start from the library.** Today's pages are already in the Website file; check the page you change against the live site first (`docs/figma/README.md` says how) and bring it up to date if it has drifted. A new section or part is built in the web library from its code, then placed in the Website file.
2. **Explore directions side by side.** Put each option in its own frame inside one section, with a short note: what it does and its trade-off. Keep approved copy word for word and flag any new wording. No dates or prices that the project's decisions rule out.
3. **The owner picks and refines.** The owner chooses a direction and asks for changes; the final frame is marked "(approved)" in its name.
4. **Build in code only from the approved frame.** Read its values (the Figma connector's `get_design_context`, which returns the mapped Astro component where one exists), list what changes for the owner's OK, build it, compare screenshots with the frame at phone and desktop widths, and run the suites `docs/testing.md` lists for the change.
5. **After the release, bring Figma up to date.** Update the library component and its Code Connect template, publish the library, accept the update in the Website file, and delete superseded versions, so design and code stay in step.
