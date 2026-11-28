// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=28-19
// source=src/components/ui/StageCard.astro
// component=StageCard
import figma from 'figma'
const instance = figma.selectedInstance

// StageCard/Shape has no component of its own: it is the CSS class process-shape--<shape> that StageCard draws
// from its shape prop (the global styles in StageCard.astro). The StageCard template reads this variant.
const shape = instance.getEnum('Shape', {
  cube: 'cube',
  diamond: 'diamond',
  circle: 'circle',
  grid: 'grid',
  bars: 'bars',
  nested: 'nested',
})

export default {
  example: figma.code`<!-- No component of its own: StageCard draws the shape from its shape prop. -->
<StageCard shape="${shape}" title="…" description="…" />`,
  imports: ['import StageCard from "../components/ui/StageCard.astro"'],
  id: 'stage-card-shape',
  metadata: { nestable: true, props: { shape } },
}
