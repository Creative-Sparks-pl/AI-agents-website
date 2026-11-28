// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=85-9
// source=src/components/sections/knowledge-base/KnowledgeColumn.astro
// component=KnowledgeColumn
import figma from 'figma'
const instance = figma.selectedInstance

// KnowledgeColumn/Item has no component of its own: KnowledgeColumn draws each entry of its items prop
// ({ name, sub }) as an <li>; Kind=Extra is the <li> of its optional extra prop, which shows only Name.
const name = instance.getString('Name')
const sub = instance.getString('Sub')
const kind = instance.getEnum('Kind', { Item: 'item', Extra: 'extra' })

export default {
  example: kind === 'extra'
    ? figma.code`<!-- No component of its own: the extra line of a KnowledgeColumn -->
extra="${name}"`
    : figma.code`<!-- No component of its own: one entry of KnowledgeColumn's items prop -->
items={[{ name: ${JSON.stringify(name)}, sub: ${JSON.stringify(sub)} }]}`,
  imports: ['import KnowledgeColumn from "../components/sections/knowledge-base/KnowledgeColumn.astro"'],
  id: 'knowledge-column-item',
  metadata: { nestable: true },
}
