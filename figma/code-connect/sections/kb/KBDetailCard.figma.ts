// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-435
// source=src/components/sections/kb/KBPageTypes.astro
// component=KBPageTypes
import figma from 'figma'
const instance = figma.selectedInstance

// KBDetailCard has no component of its own: KBPageTypes writes three of these blocks in each page type's
// detail panel (lg and up): 01 archetypes, 02 patterns, 03 discovery. The icon is fixed in code by that place
// (category, layers, search), so the Icon swap is read through Index; Title is the section's copy for that list.
// The KBListItem rows are the page type's list, drawn with .map().
const index = instance.getString('Index')
const title = instance.getString('Title')
let icon = '…'
let list = ''
if (index === '01') { icon = 'category'; list = 'archetypes' }
else if (index === '02') { icon = 'layers'; list = 'patterns' }
else if (index === '03') { icon = 'search'; list = 'discovery' }
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
  example: figma.code`<!-- No component of its own: a detail block written in KBPageTypes -->
<div class="py-6 flex flex-col gap-4">
  <div class="flex items-start justify-between">
    <span class="material-symbols-outlined text-primary text-2xl">${icon}</span>
    <span class="font-label text-xs text-muted">${index}</span>
  </div>
  <h4 class="font-headline text-lg font-bold tracking-tight">${heading}</h4>
  <ul class="space-y-3">
    ${rows}
  </ul>
</div>`,
  id: 'kb-detail-card',
  metadata: { nestable: true },
}
