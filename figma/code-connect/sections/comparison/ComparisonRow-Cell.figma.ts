// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=89-40
// source=src/components/sections/comparison/ComparisonRow.astro
// component=ComparisonRow
import figma from 'figma'
const instance = figma.selectedInstance

// ComparisonRow/Cell has no component of its own: ComparisonRow draws one <td> per column from
// cells[column.key] ({ status, text }); Highlight is that column's highlight in the entry's columns.
// The status icon (check_circle / close / horizontal_rule) is picked by status in code, not swapped.
const text = instance.getString('Text')
const status = instance.getEnum('Status', {
  yes: 'yes',
  no: 'no',
  partial: 'partial',
  price: 'price',
})
const highlight = instance.getEnum('Highlight', {
  true: 'true',
  false: 'false',
})

export default {
  example: figma.code`<!-- No component of its own: one cell of ComparisonRow's cells prop; its column has highlight: ${highlight} -->
{ status: "${status}", text: ${JSON.stringify(text)} }`,
  imports: ['import ComparisonRow from "../components/sections/comparison/ComparisonRow.astro"'],
  id: 'comparison-row-cell',
  metadata: { nestable: true },
}
