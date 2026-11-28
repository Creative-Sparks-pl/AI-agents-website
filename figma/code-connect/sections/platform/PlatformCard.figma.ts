// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=93-26
// source=src/components/sections/platform/PlatformCard.astro
// component=PlatformCard
import figma from 'figma'
const instance = figma.selectedInstance

const name = instance.getString('Name')
const desc = instance.getString('Description')
// State=Hover is the card's :hover look (group-hover classes), not a prop.
// Icon swaps a Brand base icon (Icon/<name>); the icon prop takes that Material Symbols name, which the
// template cannot read from the swap, so it stays a placeholder.
// note (optional) has no Figma property; no card in the `platform` collection uses it.

export default {
  example: figma.code`<PlatformCard icon="…" name="${name}" desc="${desc}" />`,
  imports: ['import PlatformCard from "../components/sections/platform/PlatformCard.astro"'],
  id: 'platform-card',
  metadata: { nestable: true },
}
