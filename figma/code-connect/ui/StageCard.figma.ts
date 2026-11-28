// url=https://www.figma.com/design/zDsBjCordPVukR38UY5GAS/Creative-Sparks-%E2%80%94-Web-library?node-id=29-76
// source=src/components/ui/StageCard.astro
// component=StageCard
import figma from 'figma'
const instance = figma.selectedInstance

const showShape = instance.getBoolean('Show shape')
const showIndex = instance.getBoolean('Show index')
const indexText = instance.getString('Index')
const title = instance.getString('Title')
const description = instance.getString('Description')
const showOutput = instance.getBoolean('Show output')
const output = instance.getString('Output')
const showQuote = instance.getBoolean('Show quote')
const quote = instance.getString('Quote')
// Breakpoint is the browser's width and State=Hover the :hover look (only when outputLink is set): not props.
// Output icon is a Brand base icon (not connected): outputIcon takes its Material Symbols name, default "description".
// outputLink (the sample the card opens), trackEvent and trackParams have no Figma property; ProcessSection passes
// them from its content entry's cards.

// The shape is a nested StageCard/Shape instance; its Shape variant is the shape prop.
let shape
if (showShape) {
  const shapeInstance = instance.findInstance('Shape')
  if (shapeInstance && shapeInstance.type === 'INSTANCE') {
    shape = shapeInstance.getEnum('Shape', {
      cube: 'cube',
      diamond: 'diamond',
      circle: 'circle',
      grid: 'grid',
      bars: 'bars',
      nested: 'nested',
    })
  }
}

// index is zero-based in code and drawn as two digits plus one: "01" is index={0}.
const indexNumber = parseInt(indexText, 10)
const index = Number.isNaN(indexNumber) ? '…' : String(indexNumber - 1)

export default {
  example: figma.code`<StageCard${showIndex ? `
  index={${index}}` : ''}
  title="${title}"
  description="${description}"${showOutput ? `
  output="${output}"` : ''}${showOutput && showQuote ? `
  quote="${quote}"` : ''}${shape ? `
  shape="${shape}"` : ''}
/>`,
  imports: ['import StageCard from "../components/ui/StageCard.astro"'],
  id: 'stage-card',
  metadata: { nestable: true },
}
