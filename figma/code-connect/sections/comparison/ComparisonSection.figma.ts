// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=90-1229
// source=src/components/sections/comparison/ComparisonSection.astro
// component=ComparisonSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// The frame shows the `skill-lp` entry of the `comparison` collection, as the UX Design Skill page passes it;
// the text, columns and rows come from that entry. Without entryId the section shows the locale's default entry.

export default {
  example: figma.code`<ComparisonSection id="porownanie" entryId="skill-lp" />`,
  imports: ['import ComparisonSection from "../components/sections/comparison/ComparisonSection.astro"'],
  id: 'comparison-section',
}
