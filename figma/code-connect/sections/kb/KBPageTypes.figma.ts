// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=88-1538
// source=src/components/sections/kb/KBPageTypes.astro
// component=KBPageTypes
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// KBPageTypes has no props: the 16 page types are its own PAGE_TYPES_PL / PAGE_TYPES_EN (accordions on phones, nav + detail from lg up).

export default {
  example: figma.code`<KBPageTypes />`,
  imports: ['import KBPageTypes from "../components/sections/kb/KBPageTypes.astro"'],
  id: 'kb-page-types',
}
