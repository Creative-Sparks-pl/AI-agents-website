// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-54
// source=src/components/sections/changelog/ChangelogEntry.astro
// component=ChangelogEntry
import figma from 'figma'
const instance = figma.selectedInstance

const version = instance.getString('Version')
const date = instance.getString('Date')
const title = instance.getString('Title')
const description = instance.getString('Description')
// Open is the browser's <details> state (one entry open at a time), not a prop.
// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.

// changes: the text of each ChangelogEntry/Change row in the Changes slot (Open=true variants only).
// In code each string is HTML (set:html); the parts Figma shows in bold are <strong> there.
const changes = []
for (const layer of instance.findLayers((n) => n.type === 'INSTANCE' && n.name === 'ChangelogEntry/Change')) {
  if (layer.type !== 'INSTANCE') continue
  const text = layer.findText('Text')
  if (text.type === 'TEXT') changes.push('\n    ' + JSON.stringify(text.textContent))
}
const changesCode = changes.length ? '[' + changes.join(',') + ',\n  ]' : '[…]'

export default {
  example: figma.code`<ChangelogEntry
  version="${version}"
  date="${date}"
  title="${title}"
  description="${description}"
  changes={${changesCode}}
/>`,
  imports: ['import ChangelogEntry from "../components/sections/changelog/ChangelogEntry.astro"'],
  id: 'changelog-entry',
  metadata: { nestable: true },
}
