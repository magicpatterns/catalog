import { ColorRow } from './ColorRow'
import { useEffect, useState } from 'react'
import { TColorData } from '../../types'
import { Button, Box, useDisclosure, Stack, Heading } from '@chakra-ui/react'
import { generateDefaultColorShades } from './utils'
import { EditColorModal } from './EditColorModal'

export function ColorPaletteSection() {
  const [colors, setColors] = useState<TColorData[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isExporting, setIsExporting] = useState<boolean>(false)

  const handleExport = async () => {
    setIsExporting(true)

    await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        colorData: colors,
      }),
    })

    setIsExporting(false)
  }

  useEffect(() => {
    const fetchStoredData = async () => {
      const response = await fetch('/api/store')
      const data = await response.json()
      setColors(data.colorData)
    }

    fetchStoredData()
  }, [])

  return (
    <Box>
      <Heading>Color Palette</Heading>
      <Box css={{ marginTop: '16px' }}>
        <Stack direction="column" alignItems="flex-start" spacing={8}>
          {colors.map((color) => (
            <ColorRow
              key={color.name}
              colorData={color}
              onUpdateColorData={(updatedColorData: TColorData) => {
                const newColors = [...colors]
                const colorIndex = colors.findIndex(
                  (ec) => ec.name === color.name
                )
                newColors[colorIndex] = updatedColorData

                setColors(newColors)
              }}
              onDeleteColorData={() => {
                const newColors = colors.filter((c) => c.name !== color.name)

                setColors(newColors)
              }}
              onSetAsPrimary={() => {
                const newColors = [...colors]

                const colorIndex = newColors.findIndex(
                  (ec) => ec.name === color.name
                )

                newColors.forEach((color) => (color.isPrimary = false))
                newColors[colorIndex].isPrimary = true
                console.log(newColors)
                setColors(newColors)
              }}
              onSetAsSecondary={() => {
                const newColors = [...colors]

                const colorIndex = newColors.findIndex(
                  (ec) => ec.name === color.name
                )

                newColors.forEach((color) => (color.isSecondary = false))
                newColors[colorIndex].isSecondary = true

                setColors(newColors)
              }}
            />
          ))}
        </Stack>

        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '18px',
          }}
        >
          <Button onClick={() => onOpen()}>Add New Color</Button>
          <Button
            onClick={handleExport}
            css={{ marginTop: '16px' }}
            isLoading={isExporting}
          >
            Save and Config
          </Button>
        </Box>
      </Box>
      <EditColorModal
        isOpen={isOpen}
        onClose={(colorData?: TColorData) => {
          if (colorData) {
            const newColors = [...colors]
            if (newColors.find((c) => c.name === colorData.name)) {
              colorData.name = colorData.name += ' 2'
            }

            newColors.push(colorData)

            setColors(newColors)
          }
          onClose()
        }}
      />
    </Box>
  )
}
