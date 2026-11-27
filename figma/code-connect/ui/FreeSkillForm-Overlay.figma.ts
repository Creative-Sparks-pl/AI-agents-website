// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=32-271
// source=src/components/ui/FreeSkillForm.astro
// component=FreeSkillForm
import figma from 'figma'

// FreeSkillForm/Overlay has no component of its own: it is the FullScreenDialog (sheet) inside FreeSkillForm.astro,
// opened by the form's script after a granted sign-up. Its texts are the form's own copy (per locale), not props.
// Breakpoint is the browser's width (a bottom sheet below 640 px, a centred panel above), not a prop.
const dialog = '<FullScreenDialog id={`free-skill-overlay-${surface}`} title={COPY.overlayTitle} closeLabel={COPY.overlayClose} sheet class="free-skill-form__overlay">'

export default {
  example: figma.code`<!-- No component of its own: FreeSkillForm renders this overlay and opens it after a granted sign-up:
  ${dialog} -->
<FreeSkillForm surface="…" skill="…" />`,
  imports: ['import FreeSkillForm from "../components/ui/FreeSkillForm.astro"'],
  id: 'free-skill-form-overlay',
  metadata: { nestable: true },
}
