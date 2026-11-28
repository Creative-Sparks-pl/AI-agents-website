// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=30-75
// source=src/components/ui/FullScreenDialog.astro
// component=FullScreenDialog
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const showIcon = instance.getBoolean('Show icon')
const showFooter = instance.getBoolean('Show footer')
const sheet = instance.getEnum('Sheet', {
  false: false,
  true: true,
})
const content = instance.getSlot('Content')
const footer = showFooter ? instance.getSlot('Footer') : undefined
// Breakpoint is the browser's width, not a prop. Open or closed is the browser's state: a page script opens the
// dialog with the full-screen-dialog:open event.
// Icon is a Brand base icon (not connected): icon takes its Material Symbols name, the part after "Icon/".
// id and closeLabel (the close button's accessible name) have no Figma property.

export default {
  example: figma.code`<FullScreenDialog id="…" title="${title}" closeLabel="…"${showIcon ? ' icon="…"' : ''}${sheet ? ' sheet' : ''}>
  ${content}${footer ? figma.code`
  <Fragment slot="footer">${footer}</Fragment>` : ''}
</FullScreenDialog>`,
  imports: ['import FullScreenDialog from "../components/ui/FullScreenDialog.astro"'],
  id: 'full-screen-dialog',
  metadata: { nestable: true },
}
