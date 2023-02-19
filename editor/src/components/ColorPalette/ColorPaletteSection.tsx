import { Heading } from 'components/core/Heading'
import { ColorRow } from './ColorRow'
import { useState } from 'react'
import { TColorData } from '../../types'

export function ColorPaletteSection() {
  const [colors, setColors] = useState<TColorData[]>([
    {
      name: 'Pink',
      hex: '#ED64A6',
    },
  ])

  const [isAddingNewColor, setIsAddingNewColor] = useState<boolean>(false)

  return (
    <div>
      <Heading>Color Palette</Heading>
      <div>
        {colors.map((color) => (
          <ColorRow key={color.name} colorData={color} />
        ))}
        <button
          className="mirrorful-button"
          onClick={() => setIsAddingNewColor(false)}
        >
          Add New Color
        </button>
      </div>
    </div>
  )
}
