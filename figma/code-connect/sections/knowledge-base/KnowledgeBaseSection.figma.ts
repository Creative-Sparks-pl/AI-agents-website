// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=86-675
// source=src/components/sections/knowledge-base/KnowledgeBaseSection.astro
// component=KnowledgeBaseSection
import figma from 'figma'

// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// The frame shows the section as the UX Design Skill page uses it, with its heading and mapLabel.
// Without them the heading comes from the `knowledge-base` collection and the link reads "Mapa wiedzy asystenta".
// The badge, the three columns and the intro come from the `knowledge-base` collection, not props.

export default {
  example: figma.code`<KnowledgeBaseSection
  id="baza-wiedzy"
  heading="Ten skill rozumie UX design dzięki wbudowanym procesom i bazie wiedzy UX."
  mapLabel="Mapa wiedzy skilla"
/>`,
  imports: ['import KnowledgeBaseSection from "../components/sections/knowledge-base/KnowledgeBaseSection.astro"'],
  id: 'knowledge-base-section',
}
