// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=67-271
// source=src/components/sections/testimonials/TestimonialsSection.astro
// component=TestimonialsSection
import figma from 'figma'

// Breakpoint is the browser's width in code, not a prop.
// Badge, heading, subheading and the reviews come from the testimonials content entry; the icon and the speckles
// are SVG files the section imports. buttons (optional, no page passes them) has no Figma property.

export default {
  example: figma.code`<TestimonialsSection />`,
  imports: ['import TestimonialsSection from "../components/sections/testimonials/TestimonialsSection.astro"'],
  id: 'testimonials-section',
}
