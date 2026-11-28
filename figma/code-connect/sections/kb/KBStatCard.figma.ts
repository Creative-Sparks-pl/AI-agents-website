// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=85-33
// source=src/components/sections/kb/KBHero.astro
// component=KBHero
import figma from 'figma'
const instance = figma.selectedInstance

// KBStatCard has no component of its own: KBHero writes each stat card inline, the number in its markup
// and the label from its COPY (the last card also has col-span-2).
// Breakpoint is the frame width in Figma (text-3xl / md:text-4xl in code), not a prop.
const value = instance.getString('Value')
const label = instance.getString('Label')

export default {
  example: figma.code`<!-- No component of its own: a stat card written inline in KBHero -->
<div class="bg-surface-primary p-6">
  <p class="text-3xl md:text-4xl font-headline font-bold text-primary">${value}</p>
  <p class="font-label text-[10px] uppercase text-muted tracking-widest mt-2">${label}</p>
</div>`,
  id: 'kb-stat-card',
  metadata: { nestable: true },
}
