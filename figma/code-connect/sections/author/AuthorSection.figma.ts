// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=71-167
// source=src/components/sections/author/AuthorSection.astro
// component=AuthorSection
import figma from 'figma'

// Breakpoint is the browser's width in code, not a prop.
// Every text comes from the author content entry; the photo (AuthorPhoto) and the icon are files the section imports.

export default {
  example: figma.code`<AuthorSection />`,
  imports: ['import AuthorSection from "../components/sections/author/AuthorSection.astro"'],
  id: 'author-section',
}
