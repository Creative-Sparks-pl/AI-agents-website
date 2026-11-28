// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=93-846
// source=src/components/sections/kb/KBPatterns.astro
// component=KBPatterns
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// KBPatterns has no props: the categories and their patterns are its own COPY_PL / COPY_EN.

export default {
  example: figma.code`<KBPatterns />`,
  imports: ['import KBPatterns from "../components/sections/kb/KBPatterns.astro"'],
  id: 'kb-patterns',
}
