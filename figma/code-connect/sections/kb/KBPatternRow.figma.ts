// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=93-592
// source=src/components/sections/kb/KBPatterns.astro
// component=KBPatterns
import figma from 'figma'
const instance = figma.selectedInstance

// KBPatternRow has no component of its own: KBPatterns draws each { name, variants } of a category's patterns
// as this row. The Variants text is {p.variants} {COPY.variantLabel(p.variants)} in code (e.g. "6 wariantów").
const name = instance.getString('Name')
const variants = instance.getString('Variants')

export default {
  example: figma.code`<!-- No component of its own: a pattern row written in KBPatterns -->
<div class="flex items-center justify-between py-2.5 border-b border-border/15 last:border-b-0">
  <span class="font-bold text-sm">${name}</span>
  <span class="font-label text-xs text-muted">${variants}</span>
</div>`,
  id: 'kb-pattern-row',
  metadata: { nestable: true },
}
