// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=45-153
// source=src/components/sections/top-app-bar/TopAppBar.astro
// component=TopAppBar
import figma from 'figma'
const instance = figma.selectedInstance

const links = [
  instance.getString('Link 1'),
  instance.getString('Link 2'),
  instance.getBoolean('Show link 3') ? instance.getString('Link 3') : null,
  instance.getBoolean('Show link 4') ? instance.getString('Link 4') : null,
  instance.getBoolean('Show link 5') ? instance.getString('Link 5') : null,
].filter((label) => typeof label === 'string')
const showCta = instance.getBoolean('Show CTA')
// Sale window is the date in code (isInSaleWindow swaps the CTA for the sale button), not a prop.
// Breakpoint is the browser's width in code, not a prop.
// The CTA label and link come from the nav content entry (ctaLabel / ctaHref override them per page).

// The nav content entry's links (PL, EN) are the default: a page passes navLinks only when it differs.
const DEFAULTS = [
  ['Cennik', 'Opinie', 'Darmowe skille', 'Baza wiedzy', 'Jak pracować'],
  ['Pricing', 'Reviews', 'Free skills', 'Knowledge base', 'User guide'],
]
const isDefault = DEFAULTS.some((list) => list.length === links.length && list.every((label, i) => label === links[i]))
const navLinks = isDefault
  ? ''
  : ` navLinks={[${links.map((label) => `{ label: ${JSON.stringify(label)}, href: "…" }`).join(', ')}]}`

export default {
  example: figma.code`<TopAppBar${navLinks}${showCta ? '' : ' showCta={false}'} />`,
  imports: ['import TopAppBar from "../components/sections/top-app-bar/TopAppBar.astro"'],
  id: 'top-app-bar',
}
