// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=91-3
// source=src/components/sections/kb/KBFrameworks.astro
// component=KBFrameworks
import figma from 'figma'
const instance = figma.selectedInstance

// KBFrameworkItem has no component of its own: KBFrameworks draws each { name, sub } of its COPY.frameworks
// as this row (the entries' description is not shown).
const name = instance.getString('Name')
const sub = instance.getString('Sub')

export default {
  example: figma.code`<!-- No component of its own: a framework row written in KBFrameworks -->
<div class="py-5 border-b border-border/20">
  <span class="text-foreground font-headline font-bold text-lg block">${name}</span>
  <span class="text-xs font-label text-muted">${sub}</span>
</div>`,
  id: 'kb-framework-item',
  metadata: { nestable: true },
}
