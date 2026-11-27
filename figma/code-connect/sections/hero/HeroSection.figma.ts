// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=15-175
// source=src/components/sections/hero/HeroSection.astro
// component=HeroSection
import figma from 'figma'
const instance = figma.selectedInstance

const primaryCta = instance.getEnum('Primary CTA', {
  Buttons: 'buttons',
  Form: 'form',
})
const showRating = instance.getBoolean('Show rating')
// Breakpoint is the browser's width in code, not a prop.
// Bullets (slot) and every text come from the hero content entry (src/content/hero/), not from props;
// the page picks the entry with entryId. Show rating = the entry has a rating (only skill-lp has one).
// Primary CTA = Form: the free pages pass a FreeSkillForm into the named slot primary-cta
// (free-audit-skill here; free-planning-skill is the other free entry).
let form
if (primaryCta === 'form') {
  const found = instance.findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('FreeSkillForm'))[0]
  if (found && found.type === 'INSTANCE') form = found.executeTemplate().example
}

const entryId = primaryCta === 'form' ? 'free-audit-skill' : showRating ? 'skill-lp' : ''

export default {
  example:
    primaryCta === 'form'
      ? figma.code`<HeroSection entryId="${entryId}">
  <Fragment slot="primary-cta">${form ?? '…'}</Fragment>
</HeroSection>`
      : figma.code`<HeroSection${entryId ? ` entryId="${entryId}"` : ''} />`,
  imports: ['import HeroSection from "../components/sections/hero/HeroSection.astro"'],
  id: 'hero-section',
}
