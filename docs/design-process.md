# Design process

How new or changed UI is designed and built on this site. The owner set this as the standing process on 2026-11-26.

## Where design lives

- Figma file: https://www.figma.com/design/wqLetBg3T80mr4UkjK3RgZ (team Fuse Collective → Creative Sparks).
- Its colour variables use the site's CSS token names (e.g. `color/surface-primary` is `var(--color-surface-primary)`), and its shared components name the code they stand for in their descriptions (e.g. "Free sign-up" → `src/components/ui/FreeSkillForm.astro`).
- Fonts: until Gilroy and Noto Sans Mono are uploaded to Figma, the file uses Outfit and Roboto Mono in their place. Never copy those two fonts into code; use the site's `font-headline` and `font-label`.

## The steps

1. **Rebuild today's state in Figma first.** Measure the live page with Playwright at 1440 and 390 px and rebuild what is there with the file's shared components, colour variables and text styles.
2. **Explore directions side by side.** Put each option in its own frame inside one section, with a short note: what it does and its trade-off. Keep approved copy word for word and flag any new wording. No dates or prices that the project's decisions rule out.
3. **The owner picks and refines.** The owner chooses a direction and asks for changes; the final frame is marked "(approved)" in its name.
4. **Build in code only from the approved frame.** Read its values (the Figma connector's `get_design_context`), list what changes for the owner's OK, build it, compare screenshots with the frame at phone and desktop widths, and run the suites `docs/testing.md` lists for the change.
5. **After the release, bring Figma up to date.** Update the frames and components to match production and delete superseded versions, so design and code stay in step.
