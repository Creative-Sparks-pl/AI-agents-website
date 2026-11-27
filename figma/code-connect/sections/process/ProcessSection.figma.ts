// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=49-265
// source=src/components/sections/process/ProcessSection.astro
// component=ProcessSection
import figma from 'figma'
const instance = figma.selectedInstance

const columns = instance.getEnum('Columns', {
  2: 2,
  3: 3,
})
// Breakpoint is the browser's width in code, not a prop.
// The cards are StageCards drawn from the cards the page passes (from a content entry), so the example shows cards.

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

const imports = ['import ProcessSection from "../components/sections/process/ProcessSection.astro"']
if (iconFile) imports.push(`import sectionIcon from "../assets/icons/${iconFile}.svg"`)

export default {
  example: figma.code`<ProcessSection
  headingId="…"
  badge="…"
  heading="…"
  cards={…}${columns === 3 ? `
  columns={3}` : ''}${iconFile ? `
  icon={sectionIcon}` : ''}
/>`,
  imports,
  id: 'process-section',
}
