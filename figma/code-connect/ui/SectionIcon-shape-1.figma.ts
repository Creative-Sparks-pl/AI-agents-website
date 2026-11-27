// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=26-200
// source=src/components/ui/SectionWithIcon.astro
// component=SectionWithIcon
import figma from 'figma'

// SectionIcon/shape-1 has no component of its own: it is the SVG file src/assets/icons/shape-1.svg, which a section
// imports and passes to SectionWithIcon as icon (drawn as an <img>, from lg up). The SectionWithIcon template reads
// the file name from this template's props.

export default {
  example: figma.code`<!-- No component of its own: the SVG file, passed to SectionWithIcon as icon. -->
<SectionWithIcon icon={sectionIcon}>…</SectionWithIcon>`,
  imports: [
    'import SectionWithIcon from "../components/ui/SectionWithIcon.astro"',
    'import sectionIcon from "../assets/icons/shape-1.svg"',
  ],
  id: 'section-icon-shape-1',
  metadata: { nestable: true, props: { file: 'shape-1' } },
}
