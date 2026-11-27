// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=27-85
// source=src/components/ui/SectionWithIcon.astro
// component=SectionWithIcon
import figma from 'figma'
const instance = figma.selectedInstance

const showIcon = instance.getBoolean('Show icon')
const layout = instance.getEnum('Layout', {
  stacked: 'stacked',
  'side-by-side': 'side-by-side',
})
const header = instance.getSlot('Header')
const content = instance.getSlot('Content')
// Breakpoint is the browser's width in code (the icon shows from lg up), not a prop.

// The icon is a SectionIcon/*, an SVG file the section imports; its template hands up the file name (props.file),
// and the import path (props.src) when the file is not in src/assets/icons/.
let iconSrc = '../assets/icons/shape-….svg'
if (showIcon) {
  const icon = instance.getInstanceSwap('Icon')
  if (icon && icon.type === 'INSTANCE') {
    const props = icon.executeTemplate().metadata?.props
    if (typeof props?.src === 'string') iconSrc = props.src
    else if (typeof props?.file === 'string') iconSrc = `../assets/icons/${props.file}.svg`
  }
}

const imports = ['import SectionWithIcon from "../components/ui/SectionWithIcon.astro"']
if (showIcon) imports.push(`import sectionIcon from "${iconSrc}"`)

export default {
  example: figma.code`<SectionWithIcon${showIcon ? ' icon={sectionIcon}' : ''}${layout === 'side-by-side' ? ' layout="side-by-side"' : ''}>
  <Fragment slot="header">${header}</Fragment>
  ${content}
</SectionWithIcon>`,
  imports,
  id: 'section-with-icon',
  metadata: { nestable: true },
}
