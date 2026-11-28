// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=46-145
// source=src/components/sections/footer/Footer.astro
// component=Footer
import figma from 'figma'

// Breakpoint is the browser's width in code, not a prop.
// Links and texts come from the footer content entry. changelogHref (a free skill's own release notes)
// has no Figma property.

export default {
  example: figma.code`<Footer />`,
  imports: ['import Footer from "../components/sections/footer/Footer.astro"'],
  id: 'footer',
}
