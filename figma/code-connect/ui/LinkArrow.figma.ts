// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=26-14
// source=src/components/ui/LinkArrow.astro
// component=LinkArrow
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const showIcon = instance.getBoolean('Show icon')
const showTrailingIcon = instance.getBoolean('Show trailing icon')
// State (Default / Hover) is the :hover nudge in code, not a prop.
// Icon and Trailing icon are Brand base icons (not connected): icon / trailingIcon take the Material Symbols name,
// the part after "Icon/" in the swapped icon's name. trailingIcon defaults to arrow_forward; trailingIcon="" hides it.

export default {
  example: figma.code`<LinkArrow href="…"${showIcon ? ' icon="…"' : ''}${showTrailingIcon ? '' : ' trailingIcon=""'}>${label}</LinkArrow>`,
  imports: ['import LinkArrow from "../components/ui/LinkArrow.astro"'],
  id: 'link-arrow',
  metadata: { nestable: true },
}
