// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-810
// source=src/components/sections/pricing/PricingTier.astro
// component=PricingTier
import figma from 'figma'
const instance = figma.selectedInstance

const name = instance.getString('Name')
const group = instance.getString('Group')
const value = instance.getString('Value')
const listPrice = instance.getString('Price')
const salePrice = instance.getString('Sale price')
const highlight = instance.getEnum('Highlight', {
  false: 'false',
  true: 'true',
})
// Struck price and Lowest price line are built from listPrice in code, not props.
// Sale window is the date (isInSaleWindow in src/lib/presale.ts), not a prop.
// The checkout links have no Figma property: they are the plan's listCheckoutUrl / saleCheckoutUrl in the `pricing` collection.

// features: the Text of each PricingFeature row, in order.
const features = []
for (const layer of instance.findLayers((n) => n.type === 'INSTANCE' && n.name.startsWith('PricingFeature'))) {
  if (layer.type === 'INSTANCE') features.push('\n    ' + JSON.stringify(layer.getString('Text')))
}
const featuresCode = features.length ? '[' + features.join(',') + ',\n  ]' : '[…]'

export default {
  example: figma.code`<PricingTier
  name="${name}"
  group="${group}"
  value="${value}"
  listPrice="${listPrice}"
  salePrice="${salePrice}"
  listCheckoutUrl="…"
  saleCheckoutUrl="…"
  highlight={${highlight}}
  features={${featuresCode}}
/>`,
  imports: ['import PricingTier from "../components/sections/pricing/PricingTier.astro"'],
  id: 'pricing-tier',
  metadata: { nestable: true },
}
