// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=85-10
// source=src/components/sections/knowledge-base/KnowledgeColumn.astro
// component=KnowledgeColumn
import figma from 'figma'
const instance = figma.selectedInstance

const heading = instance.getString('Heading')

// The Items slot holds KnowledgeColumn/Item rows: Kind=Item rows are the items prop ({ name, sub }),
// a Kind=Extra row is the optional extra line. In KnowledgeBaseSection the items are the `knowledge-base`
// collection's pageTypes / frameworks / patterns.
const items = []
let extra = ''
for (const layer of instance.findLayers((n) => n.type === 'INSTANCE' && n.name === 'KnowledgeColumn/Item')) {
  if (layer.type !== 'INSTANCE') continue
  const kind = layer.getEnum('Kind', { Item: 'item', Extra: 'extra' })
  if (kind === 'extra') extra = layer.getString('Name')
  else items.push('\n    { name: ' + JSON.stringify(layer.getString('Name')) + ', sub: ' + JSON.stringify(layer.getString('Sub')) + ' }')
}
const itemsCode = items.length ? '[' + items.join(',') + ',\n  ]' : '…'

export default {
  example: figma.code`<KnowledgeColumn
  heading="${heading}"
  items={${itemsCode}}${extra ? `
  extra="${extra}"` : ''}
/>`,
  imports: ['import KnowledgeColumn from "../components/sections/knowledge-base/KnowledgeColumn.astro"'],
  id: 'knowledge-column',
  metadata: { nestable: true },
}
