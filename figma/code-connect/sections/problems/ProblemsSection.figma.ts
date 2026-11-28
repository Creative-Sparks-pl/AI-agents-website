// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=48-176
// source=src/components/sections/problems/ProblemsSection.astro
// component=ProblemsSection
import figma from 'figma'
const instance = figma.selectedInstance

const hasIntro = instance.getEnum('Intro', {
  false: false,
  true: true,
})
const hasFooterLink = instance.getEnum('Footer link', {
  false: false,
  true: true,
})
// Breakpoint is the browser's width in code, not a prop.
// The cards are ProblemCards drawn from the items the page passes (from a content entry), so the example shows items.
// columns has no Figma property (the grid follows the card count in the design).

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

const imports = ['import ProblemsSection from "../components/sections/problems/ProblemsSection.astro"']
if (iconFile) imports.push(`import sectionIcon from "../assets/icons/${iconFile}.svg"`)

export default {
  example: figma.code`<ProblemsSection
  headingId="…"
  badge="…"
  heading="…"${hasIntro ? `
  intro="…"` : ''}
  items={…}${hasFooterLink ? `
  footerLink={{ label: "…", href: "…" }}` : ''}${iconFile ? `
  icon={sectionIcon}` : ''}
/>`,
  imports,
  id: 'problems-section',
}
