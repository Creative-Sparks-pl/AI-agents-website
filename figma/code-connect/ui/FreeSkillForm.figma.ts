// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=31-562
// source=src/components/ui/FreeSkillForm.astro
// component=FreeSkillForm
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Placeholder')
const successHeading = instance.getString('Success heading')
const size = instance.getEnum('Size', {
  md: 'md',
  lg: 'lg',
})
const fitContainer = instance.getEnum('Fit container', {
  false: false,
  true: true,
})
// The submit button is a nested Button instance drawn by the form itself; its label is the submitLabel prop.
let submitLabel = ''
const submit = instance.findInstance('Submit')
if (submit && submit.type === 'INSTANCE') submitLabel = submit.getString('Label')
// Error message: the error texts are the component's own copy (per locale), set by its script, not a prop.
// State (Default / Focus / Error / Success) is the browser's state (data-state, :focus), not a prop.
// Breakpoint is the browser's width, not a prop.
// surface (where the form sits, for analytics), skill ('audit' | 'planning') and block have no Figma property.

// Texts equal to the component's own default (PL or EN) are left out, as the pages do.
const DEFAULTS = {
  submitLabel: ['Odbierz darmowy skill', 'Get the free skill'],
  placeholder: ['adres email', 'email address'],
  successHeading: ['Gotowe. Sprawdź skrzynkę.', 'Done. Check your inbox.'],
}
const isCustom = (value, defaults) => value !== '' && !defaults.includes(value)

export default {
  example: figma.code`<FreeSkillForm
  surface="…"
  skill="…"${size === 'lg' ? `
  size="lg"` : ''}${fitContainer ? `
  fitContainer` : ''}${isCustom(submitLabel, DEFAULTS.submitLabel) ? `
  submitLabel="${submitLabel}"` : ''}${isCustom(placeholder, DEFAULTS.placeholder) ? `
  placeholder="${placeholder}"` : ''}${isCustom(successHeading, DEFAULTS.successHeading) ? `
  successHeading="${successHeading}"` : ''}
/>`,
  imports: ['import FreeSkillForm from "../components/ui/FreeSkillForm.astro"'],
  id: 'free-skill-form',
  metadata: { nestable: true },
}
