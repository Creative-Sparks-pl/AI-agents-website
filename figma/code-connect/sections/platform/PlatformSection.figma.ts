// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=93-337
// source=src/components/sections/platform/PlatformSection.astro
// component=PlatformSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// All text, the platform cards and the contents list come from the `platform` collection, not props.

export default {
  example: figma.code`<PlatformSection />`,
  imports: ['import PlatformSection from "../components/sections/platform/PlatformSection.astro"'],
  id: 'platform-section',
}
