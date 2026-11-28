// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-382
// source=src/components/sections/landscape/LandscapeSection.astro
// component=LandscapeSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// The frame shows the `skill-lp` entry of the `landscape` collection, as the UX Design Skill page passes it;
// all text and cards come from that entry. Without entryId the section shows the locale's default entry.

export default {
  example: figma.code`<LandscapeSection id="darmowe-skille" entryId="skill-lp" />`,
  imports: ['import LandscapeSection from "../components/sections/landscape/LandscapeSection.astro"'],
  id: 'landscape-section',
}
