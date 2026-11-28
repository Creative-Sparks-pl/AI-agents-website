// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-389
// source=src/components/sections/kb/KBSources.astro
// component=KBSources
import figma from 'figma'
const instance = figma.selectedInstance

// KBExpertCard has no component of its own: KBSources draws each { name, domain } of its COPY.experts
// as this card (Icon/verified is fixed in code).
const name = instance.getString('Name')
const domain = instance.getString('Domain')

export default {
  example: figma.code`<!-- No component of its own: an expert card written in KBSources -->
<div class="flex items-center justify-between p-4 bg-surface">
  <div>
    <p class="font-bold text-lg">${name}</p>
    <p class="font-label text-xs uppercase text-muted tracking-wider">${domain}</p>
  </div>
  <span class="material-symbols-outlined text-accent-dark">verified</span>
</div>`,
  id: 'kb-expert-card',
  metadata: { nestable: true },
}
