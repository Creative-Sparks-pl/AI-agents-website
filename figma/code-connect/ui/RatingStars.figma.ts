// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=9-86
// source=src/components/ui/RatingStars.astro
// component=RatingStars
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')
// value (the average out of 5, which sets how much of the stars is blue) and label (the screen-reader sentence,
// starting with the visible text) have no Figma property; HeroSection passes them from its content entry's rating,
// with the optional href to the reviews.

export default {
  example: figma.code`<RatingStars value={…} text="${text}" label="…" />`,
  imports: ['import RatingStars from "../components/ui/RatingStars.astro"'],
  id: 'rating-stars',
  metadata: { nestable: true },
}
