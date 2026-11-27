// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=53-476
// source=src/components/sections/architecture/ArchitectureSection.astro
// component=ArchitectureSection
import figma from 'figma'
const instance = figma.selectedInstance

const hasCta = instance.getEnum('CTA', {
  false: false,
  true: true,
})
// Breakpoint is the browser's width in code, not a prop.
// Badge, heading, lead and link default to the paid skill's copy; the decision cards come from the architecture
// collection. The free pages override badge / heading / lead / link and add cta, the box shown by CTA = true.

export default {
  example: hasCta
    ? figma.code`<ArchitectureSection
  cta={{ heading: "…", description: "…", button: { label: "…", href: "…" } }}
/>`
    : figma.code`<ArchitectureSection />`,
  imports: ['import ArchitectureSection from "../components/sections/architecture/ArchitectureSection.astro"'],
  id: 'architecture-section',
}
