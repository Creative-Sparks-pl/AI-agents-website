// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-401
// source=src/components/sections/kb/KBSources.astro
// component=KBSources
import figma from 'figma'
const instance = figma.selectedInstance

// KBOrgRow has no component of its own: KBSources draws each { name, domain } of its COPY.organizations
// as this table row. Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
const institution = instance.getString('Institution')
const domain = instance.getString('Domain')

export default {
  example: figma.code`<!-- No component of its own: a table row written in KBSources -->
<tr class="border-b border-border/20">
  <td class="py-4">${institution}</td>
  <td class="py-4 text-right text-muted">${domain}</td>
</tr>`,
  id: 'kb-org-row',
  metadata: { nestable: true },
}
