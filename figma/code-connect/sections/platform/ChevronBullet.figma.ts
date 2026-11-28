// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=93-5
// source=src/components/sections/platform/PlatformSection.astro
// component=PlatformSection
import figma from 'figma'

// ChevronBullet has no component of its own: PlatformSection draws it as an inline SVG before each item
// of its contents list (ChangelogEntry draws the same mark before each change).

export default {
  example: figma.code`<!-- No component of its own: inline SVG in PlatformSection -->
<svg class="w-5 h-5 shrink-0 mt-0.5 text-primary" viewBox="0 0 19 22" fill="none"><path d="M14.32 12.84L10.24 17.66L8.75 16.77L12.11 12.67L8.75 8.57L10.24 7.7L14.32 12.53V12.84ZM9.54 12.84L5.49 17.66L4 16.77L7.36 12.67L4 8.57L5.49 7.7L9.54 12.53V12.84Z" fill="currentColor"/></svg>`,
  id: 'chevron-bullet',
  metadata: { nestable: true },
}
