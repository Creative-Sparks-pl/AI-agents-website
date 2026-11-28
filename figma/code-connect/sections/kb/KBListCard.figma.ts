// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-457
// source=src/components/sections/kb/KBPageTypes.astro
// component=KBPageTypes
import figma from 'figma'
const instance = figma.selectedInstance

// KBListCard has no component of its own: KBPageTypes writes three of these cards in each page type's
// accordion (phones): archetypes, patterns, discovery. Title is the section's copy for that list;
// the KBListItem rows are the page type's list, drawn with .map().
const title = instance.getString('Title')
let list = ''
if (title === 'Archetypy' || title === 'Archetypes') list = 'archetypes'
else if (title === 'Wzorce sekcji' || title === 'Section patterns') list = 'patterns'
else if (title === 'Discovery') list = 'discovery'
const heading = list ? '{copy.' + list + '}' : title
const rows = list
  ? '{type.' + list + `.map((item) => (
      <li>
        <span class="font-bold text-sm block mb-0.5">{item.name}</span>
        <p class="text-xs text-muted leading-relaxed">{item.sub}</p>
      </li>
    ))}`
  : '…'

export default {
  example: figma.code`<!-- No component of its own: a list card written in KBPageTypes -->
<div class="bg-surface-primary p-5 flex flex-col gap-4">
  <h4 class="font-headline text-lg font-bold tracking-tight">${heading}</h4>
  <ul class="space-y-3">
    ${rows}
  </ul>
</div>`,
  id: 'kb-list-card',
  metadata: { nestable: true },
}
