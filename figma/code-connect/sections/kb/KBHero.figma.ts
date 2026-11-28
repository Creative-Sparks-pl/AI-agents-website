// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=85-88
// source=src/components/sections/kb/KBHero.astro
// component=KBHero
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// KBHero has no props: its text is its own COPY_PL / COPY_EN, the stat numbers are written in its markup.

export default {
  example: figma.code`<KBHero />`,
  imports: ['import KBHero from "../components/sections/kb/KBHero.astro"'],
  id: 'kb-hero',
}
