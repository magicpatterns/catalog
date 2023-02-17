import { Heading } from 'components/core/Heading'
import { ColorRow } from './ColorRow'

export function ColorPaletteSection() {
  return (
    <div>
      <Heading>Color Palette</Heading>
      <div>
        <ColorRow />
      </div>
    </div>
  )
}
