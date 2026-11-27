// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=67-3
// source=src/components/sections/testimonials/TestimonialsSection.astro
// component=SectionWithIcon
import figma from 'figma'

// SectionIcon/testimonials has no component of its own: it is the SVG file src/assets/testimonials/icon.svg, which
// TestimonialsSection imports and passes to SectionWithIcon as icon. Unlike SectionIcon/shape-N it is not in
// src/assets/icons/, so its props carry the full import path (src) next to the file name.

export default {
  example: figma.code`<!-- No component of its own: the SVG file, passed to SectionWithIcon as icon. -->
<SectionWithIcon icon={sectionIcon}>…</SectionWithIcon>`,
  imports: [
    'import SectionWithIcon from "../components/ui/SectionWithIcon.astro"',
    'import sectionIcon from "../assets/testimonials/icon.svg"',
  ],
  id: 'section-icon-testimonials',
  metadata: { nestable: true, props: { file: 'testimonials', src: '../assets/testimonials/icon.svg' } },
}
