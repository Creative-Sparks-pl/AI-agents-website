// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=78-77
// source=src/components/sections/use-cases/CaseCard.astro
// component=CaseCard
import figma from 'figma'
const instance = figma.selectedInstance

const number = instance.getString('Number')
const title = instance.getString('Title')
const description = instance.getString('Description')
const showAudience = instance.getBoolean('Show audience')
const audience = instance.getString('Audience')
const showQuote = instance.getBoolean('Show quote')
const quote = instance.getString('Quote')
// Open is the browser's <details> state (CaseCard has no open prop). Breakpoint is the browser's width. Neither is a prop.
// bullets has no Figma property.

// The links are the nested LinkArrows of the open card (drawn only when Open = true); their labels are links[].label.
const linkLabels = instance
  .findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('LinkArrow'))
  .filter((node) => node.type === 'INSTANCE')
  .map((node) => node.getString('Label'))
const links = (linkLabels.length > 0 ? linkLabels : ['…'])
  .map((label) => `{ label: ${JSON.stringify(label)}, href: "…" }`)
  .join(', ')

export default {
  example: figma.code`<CaseCard
  number="${number}"${showAudience ? `
  audience="${audience}"` : ''}
  title="${title}"
  description="${description}"${showQuote ? `
  quote="${quote}"` : ''}
  links={[${links}]}
/>`,
  imports: ['import CaseCard from "../components/sections/use-cases/CaseCard.astro"'],
  id: 'case-card',
  metadata: { nestable: true },
}
