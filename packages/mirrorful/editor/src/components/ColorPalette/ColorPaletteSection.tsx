import { Heading } from 'components/core/Heading'
import { ColorRow } from './ColorRow'
import { useState } from 'react'
import { TColorData } from '../../types'
import { Button, Box } from '@chakra-ui/react'
import { generateDefaultColorShades } from './utils'

export function ColorPaletteSection() {
  const [colors, setColors] = useState<TColorData[]>([
    {
      name: 'Pink',
      base: '#ED64A6',
      hover: '#ED66A6',
      active: '#ED61A6',
      shades: generateDefaultColorShades('#ED64A6'),
    },
  ])

  const [isAddingNewColor, setIsAddingNewColor] = useState<boolean>(false)
  const [isExporting, setIsExporting] = useState<boolean>(false)

  const handleExport = async () => {
    setIsExporting(true)

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        colorData: colors,
      }),
    })
  }

  return (
    <div>
      <Heading>Color Palette</Heading>
      <div>
        {colors.map((color) => (
          <ColorRow key={color.name} colorData={color} />
        ))}
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Button
            colorScheme="purple"
            onClick={() => setIsAddingNewColor(false)}
            css={{
              width: 'fit-content',
            }}
          >
            Add New Color
          </Button>
          <Button
            colorScheme="purple"
            onClick={handleExport}
            css={{
              width: 'fit-content',
            }}
          >
            Export Config
          </Button>
        </Box>
      </div>
    </div>
  )
}
