// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-535
// source=src/components/sections/kb/KBPageTypes.astro
// component=KBPageTypes
import figma from 'figma'
const instance = figma.selectedInstance

// KBPageTypeAccordion has no component of its own: KBPageTypes writes one <details> per page type (phones),
// from the page type's name, badge and description.
// Open is the browser's <details> state (one open at a time), not a prop.
const name = instance.getString('Name')
const badge = instance.getString('Badge')
const description = instance.getString('Description')

// The three KBListCard blocks are written out one by one in code too (Open=true variant only).
const cards = []
for (const layer of instance.findLayers((n) => n.type === 'INSTANCE' && n.name === 'KBListCard')) {
  if (layer.type === 'INSTANCE') cards.push(layer.executeTemplate().example)
}
const card1 = cards[0] || '<!-- archetypes card (KBListCard) -->'
const card2 = cards[1] || '<!-- patterns card (KBListCard) -->'
const card3 = cards[2] || '<!-- discovery card (KBListCard) -->'

export default {
  example: figma.code`<!-- No component of its own: an accordion written in KBPageTypes -->
<details class="group bg-white" name="page-types">
  <summary class="flex justify-between items-center p-5 cursor-pointer list-none hover:bg-surface transition-colors">
    <div>
      <span class="font-headline font-bold text-lg text-foreground group-open:text-primary">${name}</span>
      <span class="ml-3 text-xs font-label text-muted">${badge}</span>
    </div>
    <span class="material-symbols-outlined text-muted group-open:text-primary transition-transform duration-300 group-open:rotate-180">keyboard_arrow_down</span>
  </summary>
  <div class="px-5 pb-5">
    <p class="text-muted text-sm leading-relaxed mb-6">${description}</p>
    <div class="flex flex-col gap-4">
      ${card1}
      ${card2}
      ${card3}
    </div>
  </div>
</details>`,
  id: 'kb-page-type-accordion',
  metadata: { nestable: true },
}
