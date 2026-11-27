// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=67-4
// source=src/components/sections/testimonials/TestimonialsSection.astro
// component=img
import figma from 'figma'

// Speckles has no component of its own: it is the SVG file src/assets/testimonials/speckles.svg, which
// TestimonialsSection draws as a decorative <img> behind each reviewer's photo.

export default {
  example: figma.code`<!-- No component of its own: the SVG file, drawn by TestimonialsSection. -->
<img src={speckles.src} width={speckles.width} height={speckles.height} alt="" aria-hidden="true" loading="lazy" class="absolute left-0.5 top-46.5 w-50 h-auto max-w-none lg:-left-10 lg:top-40 lg:w-48 xl:-left-21 xl:top-44 xl:w-64" />`,
  imports: ['import speckles from "../assets/testimonials/speckles.svg"'],
  id: 'speckles',
  metadata: { nestable: true },
}
