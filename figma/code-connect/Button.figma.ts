// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=9-77
// source=src/components/ui/Button.astro
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const variant = instance.getEnum('Variant', {
  primary: 'primary',
  secondary: 'secondary',
  sale: 'sale',
})
const size = instance.getEnum('Size', {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
})
const showIcon = instance.getBoolean('Show icon')
// State (Default / Hover) is the :hover look in code, not a prop.
// The icon is a Brand base component; trailingIcon takes its Material Symbols name (the part after "Icon/").

export default {
  example: figma.code`<Button href="…"${variant !== 'primary' ? ` variant="${variant}"` : ''}${size !== 'md' ? ` size="${size}"` : ''}${showIcon ? ' trailingIcon="arrow_forward"' : ''}>${label}</Button>`,
  imports: ['import Button from "../components/ui/Button.astro"'],
  id: 'button',
  metadata: { nestable: true },
}
