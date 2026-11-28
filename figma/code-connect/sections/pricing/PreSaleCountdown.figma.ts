// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-548
// source=src/components/ui/PreSaleCountdown.astro
// component=PreSaleCountdown
import figma from 'figma'

// Neither text is a prop: Prefix is SALE_PREFIX[locale] and Time left is counted down live to SALE_END_MS
// (both in src/lib/presale.ts).
// showCountdown defaults to true, the visible countdown (as in HeroSection); PricingSection and TopAppBar
// pass showCountdown={false} to get only the script that swaps prices and links at the sale window's edges.

export default {
  example: figma.code`<PreSaleCountdown />`,
  imports: ['import PreSaleCountdown from "../components/ui/PreSaleCountdown.astro"'],
  id: 'pre-sale-countdown',
  metadata: { nestable: true },
}
