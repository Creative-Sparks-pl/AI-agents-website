// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=91-220
// source=src/components/sections/kb/KBFrameworks.astro
// component=KBFrameworks
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// KBFrameworks has no props: the heading and the frameworks are its own COPY_PL / COPY_EN.

export default {
  example: figma.code`<KBFrameworks />`,
  imports: ['import KBFrameworks from "../components/sections/kb/KBFrameworks.astro"'],
  id: 'kb-frameworks',
}
