// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=81-82
// source=src/components/sections/try-free/TryFreeCard.astro
// component=TryFreeCard
import figma from 'figma'
const instance = figma.selectedInstance

const question = instance.getString('Question')
const name = instance.getString('Name')
const text = instance.getString('Text')
// Breakpoint is the browser's width in code, not a prop.
// skill ('audit' | 'planning'), surface (for analytics) and pageHref have no Figma property.

// The card draws its own FreeSkillForm and LinkArrow: their labels are the submitLabel and pageLabel props.
let submitLabel = '…'
const form = instance.findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('FreeSkillForm'))[0]
if (form && form.type === 'INSTANCE') {
  const submit = form.findInstance('Submit')
  if (submit && submit.type === 'INSTANCE') submitLabel = submit.getString('Label')
}
let pageLabel = '…'
const link = instance.findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('LinkArrow'))[0]
if (link && link.type === 'INSTANCE') pageLabel = link.getString('Label')

export default {
  example: figma.code`<TryFreeCard
  skill="…"
  surface="…"
  question="${question}"
  name="${name}"
  text="${text}"
  pageHref="…"
  pageLabel="${pageLabel}"
  submitLabel="${submitLabel}"
/>`,
  imports: ['import TryFreeCard from "../components/sections/try-free/TryFreeCard.astro"'],
  id: 'try-free-card',
  metadata: { nestable: true },
}
