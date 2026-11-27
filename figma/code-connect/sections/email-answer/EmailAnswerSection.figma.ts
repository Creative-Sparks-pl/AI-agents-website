// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=96-50
// source=src/components/sections/email-answer/EmailAnswerSection.astro
// component=EmailAnswerSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// None of the Figma text properties is a prop:
// - Heading and Text: the `email-answers` collection's fallback; a script swaps in the answer that matches the link's mail and odp.
// - Name and Email: the `author` collection (nameFirst nameLast, email).
// - LinkedIn label: the section's own text; Show LinkedIn: whether the `author` entry has linkedIn.
// The class is the one the answer pages (/answer/, /en/answer/) pass.

export default {
  example: figma.code`<EmailAnswerSection class="flex-1 flex flex-col justify-center" />`,
  imports: ['import EmailAnswerSection from "../components/sections/email-answer/EmailAnswerSection.astro"'],
  id: 'email-answer-section',
}
