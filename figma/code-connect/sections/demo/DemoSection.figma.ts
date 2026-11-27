// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=60-127
// source=src/components/sections/demo/DemoSection.astro
// component=DemoSection
import figma from 'figma'
const instance = figma.selectedInstance

const cta = instance.getEnum('CTA', {
  Button: 'button',
  Form: 'form',
})
const hasNote = instance.getEnum('Note', {
  false: false,
  true: true,
})
// Breakpoint is the browser's width in code, not a prop.
// CTA = Button: the cta prop (a Button). CTA = Form: the free pages pass a FreeSkillForm into the named slot cta.

// The FreeSkillForm sits in the nested SectionWithIcon's content.
let form
if (cta === 'form') {
  const found = instance.findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('FreeSkillForm'), {
    traverseInstances: true,
  })[0]
  if (found && found.type === 'INSTANCE') form = found.executeTemplate().example
}

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

const imports = ['import DemoSection from "../components/sections/demo/DemoSection.astro"']
if (iconFile) imports.push(`import sectionIcon from "../assets/icons/${iconFile}.svg"`)

const props = figma.code`
  heading="…"
  intro="…"${hasNote ? `
  note="…"` : ''}${cta === 'button' ? `
  cta={{ label: "…", href: "…" }}` : ''}${iconFile ? `
  icon={sectionIcon}` : ''}`

export default {
  example:
    cta === 'form'
      ? figma.code`<DemoSection${props}
>
  <Fragment slot="cta">${form ?? '…'}</Fragment>
</DemoSection>`
      : figma.code`<DemoSection${props}
/>`,
  imports,
  id: 'demo-section',
}
