// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=88-1119
// source=src/components/sections/pricing/PricingSection.astro
// component=PricingSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// Sale window is the date, not a prop: PricingTier shows the sale or list prices from isInSaleWindow()
// (src/lib/presale.ts), and the PreSaleCountdown script inside the section swaps them in the browser.
// The cards (prices, features, checkout links) come from the `pricing` collection; the headings and notes
// are the section's own text.

export default {
  example: figma.code`<PricingSection />`,
  imports: ['import PricingSection from "../components/sections/pricing/PricingSection.astro"'],
  id: 'pricing-section',
}
