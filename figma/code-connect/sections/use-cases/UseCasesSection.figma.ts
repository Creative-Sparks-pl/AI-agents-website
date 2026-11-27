// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=79-187
// source=src/components/sections/use-cases/UseCasesSection.astro
// component=UseCasesSection
import figma from 'figma'
const instance = figma.selectedInstance

// Breakpoint is the browser's width in code, not a prop.
// The rows are CaseCards drawn from the cases the page passes (from a content entry), so the example shows cases.
// examples (the optional ExampleCard row) and groupName have no Figma property.

// The icon is the SectionIcon/shape-N in the nested SectionWithIcon; its template hands up the SVG file name.
let iconFile = null
const frame = instance.findInstance('SectionWithIcon')
if (frame && frame.type === 'INSTANCE' && frame.getBoolean('Show icon')) {
  iconFile = 'shape-…'
  const icon = frame.getInstanceSwap('Icon')
  if (icon && icon.type === 'INSTANCE') {
    const file = icon.executeTemplate().metadata?.props?.file
    if (typeof file === 'string') iconFile = file
  }
}

const imports = ['import UseCasesSection from "../components/sections/use-cases/UseCasesSection.astro"']
if (iconFile) imports.push(`import sectionIcon from "../assets/icons/${iconFile}.svg"`)

export default {
  example: figma.code`<UseCasesSection
  headingId="…"
  badge="…"
  heading="…"
  cases={…}${iconFile ? `
  icon={sectionIcon}` : ''}
/>`,
  imports,
  id: 'use-cases-section',
}
