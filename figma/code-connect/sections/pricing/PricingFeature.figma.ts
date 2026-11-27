// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-553
// source=src/components/sections/pricing/PricingTier.astro
// component=PricingTier
import figma from 'figma'
const instance = figma.selectedInstance

// PricingFeature has no component of its own: PricingTier draws each string of its `features` prop
// as an <li> with a check icon (Icon/check is fixed in code, not a prop).
const text = instance.getString('Text')

export default {
  example: figma.code`<!-- No component of its own: one string of PricingTier's features prop -->
features={[${JSON.stringify(text)}]}`,
  imports: ['import PricingTier from "../components/sections/pricing/PricingTier.astro"'],
  id: 'pricing-feature',
  metadata: { nestable: true },
}
