import { ColorRow } from './ColorRow'
import { TColorData } from '../../types'
import { Button, Box, useDisclosure, Stack, Heading } from '@chakra-ui/react'
import { EditColorModal } from './EditColorModal'

export function ColorPaletteSection({
  colors,
  onUpdateColors,
}: {
  colors: TColorData[]
  onUpdateColors: (newColors: TColorData[]) => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Heading>Color Palette</Heading>
      <Box css={{ marginTop: '24px' }}>
        <Stack direction="column" alignItems="flex-start" spacing={12}>
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

                onUpdateColors(newColors)
              }}
              onDeleteColorData={() => {
                const newColors = colors.filter((c) => c.name !== color.name)

                onUpdateColors(newColors)
              }}
              onSetAsPrimary={() => {
                const newColors = [...colors]

                const colorIndex = newColors.findIndex(
                  (ec) => ec.name === color.name
                )

                newColors.forEach((color) => (color.isPrimary = false))
                newColors[colorIndex].isPrimary = true

                onUpdateColors(newColors)
              }}
              onSetAsSecondary={() => {
                const newColors = [...colors]

                const colorIndex = newColors.findIndex(
                  (ec) => ec.name === color.name
                )

                newColors.forEach((color) => (color.isSecondary = false))
                newColors[colorIndex].isSecondary = true

                onUpdateColors(newColors)
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

            onUpdateColors(newColors)
          }
          onClose()
        }}
      />
    </Box>
  )
}
