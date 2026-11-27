// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=63-400
// source=src/components/sections/faqs/FAQSection.astro
// component=FAQSection
import figma from 'figma'

// Breakpoint is the browser's width in code, not a prop.
// The questions are FAQItems drawn from the faqs collection (a page may pass its own entries); the heading has a
// per-locale default.

export default {
  example: figma.code`<FAQSection />`,
  imports: ['import FAQSection from "../components/sections/faqs/FAQSection.astro"'],
  id: 'faq-section',
}
