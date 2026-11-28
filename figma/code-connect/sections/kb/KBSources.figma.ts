// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=94-640
// source=src/components/sections/kb/KBSources.astro
// component=KBSources
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// KBSources has no props: the experts and organizations are its own COPY_PL / COPY_EN.

export default {
  example: figma.code`<KBSources />`,
  imports: ['import KBSources from "../components/sections/kb/KBSources.astro"'],
  id: 'kb-sources',
}
