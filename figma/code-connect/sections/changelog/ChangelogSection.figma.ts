// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-1263
// source=src/components/sections/changelog/ChangelogSection.astro
// component=ChangelogSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// The frame shows the UX Design Skill entries with the default label "Changelog"; the free skills' pages
// pass their own product and label (e.g. product="homepage-ux-audit" label="Homepage UX Audit Skill").
// The entries come from src/content/changelog/<product>/<locale>/, the heading is the section's own text.

export default {
  example: figma.code`<ChangelogSection product="ux-design-skill" />`,
  imports: ['import ChangelogSection from "../components/sections/changelog/ChangelogSection.astro"'],
  id: 'changelog-section',
}
