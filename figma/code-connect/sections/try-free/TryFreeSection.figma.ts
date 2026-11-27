// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=81-334
// source=src/components/sections/try-free/TryFreeSection.astro
// component=TryFreeSection
import figma from 'figma'

// Breakpoint is the browser's width in code, not a prop.
// Badge, heading, intro and the two TryFreeCards come from the try-free content entry.

export default {
  example: figma.code`<TryFreeSection />`,
  imports: ['import TryFreeSection from "../components/sections/try-free/TryFreeSection.astro"'],
  id: 'try-free-section',
}
