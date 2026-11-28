// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-3
// source=src/components/sections/changelog/ChangelogEntry.astro
// component=ChangelogEntry
import figma from 'figma'
const instance = figma.selectedInstance

// ChangelogEntry/Change has no component of its own: ChangelogEntry draws each string of its changes prop
// as an <li> after the chevron mark. The string is HTML (set:html); the parts Figma shows in bold are <strong>.
// The component has no properties: the text is the "Text" layer.
const text = instance.findText('Text')
const textCode = text.type === 'TEXT' ? JSON.stringify(text.textContent) : '"…"'

export default {
  example: figma.code`<!-- No component of its own: one string of ChangelogEntry's changes prop -->
changes={[${textCode}]}`,
  imports: ['import ChangelogEntry from "../components/sections/changelog/ChangelogEntry.astro"'],
  id: 'changelog-entry-change',
  metadata: { nestable: true },
}
