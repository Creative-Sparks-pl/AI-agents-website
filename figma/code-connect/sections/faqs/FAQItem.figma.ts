// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=63-66
// source=src/components/sections/faqs/FAQItem.astro
// component=FAQItem
import figma from 'figma'
const instance = figma.selectedInstance

// The code prints index + 1, zero-padded: Figma's "01" is index={0}.
const number = parseInt(instance.getString('Index'), 10)
const index = Number.isFinite(number) ? number - 1 : 0
const question = instance.getString('Question')
const answer = instance.getString('Answer')
const showLink = instance.getBoolean('Show link')
// Open = true is the open prop (starts open); opening and closing later is the browser's <details>.
const open = instance.getEnum('Open', {
  false: false,
  true: true,
})
// Breakpoint is the browser's width in code, not a prop.

// The link is a nested LinkArrow; its label is link.label.
let linkLabel = '…'
if (showLink) {
  const link = instance.findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('LinkArrow'))[0]
  if (link && link.type === 'INSTANCE') linkLabel = link.getString('Label')
}

export default {
  example: figma.code`<FAQItem index={${index}} q="${question}"${showLink ? ` link={{ label: ${JSON.stringify(linkLabel)}, href: "…" }}` : ''}${open ? ' open' : ''}>
  ${answer}
</FAQItem>`,
  imports: ['import FAQItem from "../components/sections/faqs/FAQItem.astro"'],
  id: 'faq-item',
  metadata: { nestable: true },
}
