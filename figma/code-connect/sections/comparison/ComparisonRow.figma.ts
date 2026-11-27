// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=89-77
// source=src/components/sections/comparison/ComparisonRow.astro
// component=ComparisonRow
import figma from 'figma'
const instance = figma.selectedInstance

const feature = instance.getString('Feature')
// Breakpoint is the frame width in Figma (Desktop / Phone), not a prop.
// The cells (ComparisonRow/Cell) are not props of their own: ComparisonSection passes the entry's columns
// and the row's cells from the `comparison` collection.

export default {
  example: figma.code`<ComparisonRow feature="${feature}" columns={columns} cells={row.cells} />`,
  imports: ['import ComparisonRow from "../components/sections/comparison/ComparisonRow.astro"'],
  id: 'comparison-row',
  metadata: { nestable: true },
}
