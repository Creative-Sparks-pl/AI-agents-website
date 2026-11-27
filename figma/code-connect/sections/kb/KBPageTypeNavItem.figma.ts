// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=87-479
// source=src/components/sections/kb/KBPageTypes.astro
// component=KBPageTypes
import figma from 'figma'
const instance = figma.selectedInstance

// KBPageTypeNavItem has no component of its own: KBPageTypes writes one nav button per page type (lg and up).
// State=Selected is not a prop: the first button is selected at build time, then the section's script
// moves the selected classes to the clicked button.
const label = instance.getString('Label')
const selected = instance.getEnum('State', { Default: false, Selected: true })
const buttonClass = selected ? 'bg-primary text-on-primary font-bold hover:bg-primary' : 'bg-white text-foreground hover:bg-surface'
const chevronClass = selected ? 'text-white' : 'text-muted'

export default {
  example: figma.code`<!-- No component of its own: a nav button written in KBPageTypes -->
<button data-idx={i} class="kb-nav w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-150 cursor-pointer ${buttonClass}">
  <span class="text-sm">${label}</span>
  <span class="material-symbols-outlined text-base kb-chevron ${chevronClass}">chevron_right</span>
</button>`,
  id: 'kb-page-type-nav-item',
  metadata: { nestable: true },
}
