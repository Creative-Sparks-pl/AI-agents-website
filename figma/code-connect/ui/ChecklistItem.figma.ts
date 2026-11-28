// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=9-79
// source=src/components/ui/ChecklistItem.astro
// component=ChecklistItem
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
// The optional body line under the title is the default slot in code; the Figma component has no body layer.

export default {
  example: figma.code`<ChecklistItem title="${title}" />`,
  imports: ['import ChecklistItem from "../components/ui/ChecklistItem.astro"'],
  id: 'checklist-item',
  metadata: { nestable: true },
}
