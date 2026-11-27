// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=52-5
// source=src/components/sections/architecture/DecisionCard.astro
// component=DecisionCard
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const title = instance.getString('Title')
const description = instance.getString('Description')
// The icon is a Brand base component; icon takes its Material Symbols name (the part after "Icon/").

export default {
  example: figma.code`<DecisionCard icon="…" label="${label}" title="${title}" desc="${description}" />`,
  imports: ['import DecisionCard from "../components/sections/architecture/DecisionCard.astro"'],
  id: 'decision-card',
  metadata: { nestable: true },
}
