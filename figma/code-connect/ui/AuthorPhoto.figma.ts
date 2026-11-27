// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=123-85
// source=src/components/sections/author/AuthorSection.astro
// component=Image
import figma from 'figma'

// AuthorPhoto has no component of its own: it is the image src/assets/author.webp, which AuthorSection draws with
// Astro's <Image>, object-cover in a 4:5 box. The alt text is the author's name from the author content entry.
const alt = 'alt={`${nameFirst} ${nameLast}`}'

export default {
  example: figma.code`<!-- No component of its own: the image asset, drawn by AuthorSection. -->
<Image src={authorPhoto} ${alt} class="w-full h-full object-cover" widths={[400, 600]} sizes="(max-width: 1024px) 100vw, 40vw" />`,
  imports: ['import { Image } from "astro:assets"', 'import authorPhoto from "../assets/author.webp"'],
  id: 'author-photo',
  metadata: { nestable: true },
}
