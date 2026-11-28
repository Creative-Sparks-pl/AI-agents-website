// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-432
// source=src/components/sections/kb/KBPageTypes.astro
// component=KBPageTypes
import figma from 'figma'
const instance = figma.selectedInstance

// KBListItem has no component of its own: KBPageTypes draws each { name, sub } of a page type's
// archetypes, patterns and discovery lists as this <li> (in KBDetailCard and KBListCard).
const name = instance.getString('Name')
const sub = instance.getString('Sub')

export default {
  example: figma.code`<!-- No component of its own: a list item written in KBPageTypes -->
<li>
  <span class="font-bold text-sm block mb-0.5">${name}</span>
  <p class="text-xs text-muted leading-relaxed">${sub}</p>
</li>`,
  id: 'kb-list-item',
  metadata: { nestable: true },
}
