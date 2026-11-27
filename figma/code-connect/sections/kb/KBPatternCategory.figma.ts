// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=93-629
// source=src/components/sections/kb/KBPatterns.astro
// component=KBPatterns
import figma from 'figma'
const instance = figma.selectedInstance

// KBPatternCategory has no component of its own: KBPatterns writes one <details> per { name, count, patterns }
// of its COPY.categories; the KBPatternRow rows are the category's patterns, drawn with .map().
// Open is the browser's <details> state (one open at a time), not a prop.
const name = instance.getString('Name')
const count = instance.getString('Count')

export default {
  example: figma.code`<!-- No component of its own: a category accordion written in KBPatterns -->
<details class="group bg-white" name="patterns">
  <summary class="flex justify-between items-center p-5 cursor-pointer list-none hover:bg-surface transition-colors">
    <span class="font-headline font-bold text-lg text-foreground group-open:text-primary">${name}</span>
    <div class="flex items-center gap-3">
      <span class="text-xs font-label text-muted">${count}</span>
      <span class="material-symbols-outlined text-muted group-open:text-primary expand-icon transition-transform duration-300">keyboard_arrow_down</span>
    </div>
  </summary>
  <div class="px-5 pb-5">
    <div class="flex flex-col">
      {cat.patterns.map((p) => (
        <div class="flex items-center justify-between py-2.5 border-b border-border/15 last:border-b-0">
          <span class="font-bold text-sm">{p.name}</span>
          <span class="font-label text-xs text-muted">{p.variants} {COPY.variantLabel(p.variants)}</span>
        </div>
      ))}
    </div>
  </div>
</details>`,
  id: 'kb-pattern-category',
  metadata: { nestable: true },
}
