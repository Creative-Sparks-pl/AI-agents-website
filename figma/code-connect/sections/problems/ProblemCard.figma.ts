// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=47-21
// source=src/components/sections/problems/ProblemCard.astro
// component=ProblemCard
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show label')
const label = instance.getString('Label')
const title = instance.getString('Title')
const showDescription = instance.getBoolean('Show description')
const description = instance.getString('Description')
// State (Default / Hover) is the :hover look in code, not a prop.
// The icon is a Brand base component; icon takes its Material Symbols name (the part after "Icon/").
// description is required in code: a card without one passes an empty string.

export default {
  example: figma.code`<ProblemCard icon="…"${showLabel ? ` label="${label}"` : ''} title="${title}" description="${showDescription ? description : ''}" />`,
  imports: ['import ProblemCard from "../components/sections/problems/ProblemCard.astro"'],
  id: 'problem-card',
  metadata: { nestable: true },
}
