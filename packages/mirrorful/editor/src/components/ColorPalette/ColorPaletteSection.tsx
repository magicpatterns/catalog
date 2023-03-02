import { ColorRow } from './ColorRow'
import { TColorData } from '../../types'
import {
  Button,
  Box,
  useDisclosure,
  Stack,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react'
import { EditColorModal } from './EditColorModal'
import { AddColorSkeleton } from './AddColorSkeleton'

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
      <Heading fontSize={36} fontWeight="black">
        Color Palette
      </Heading>
      <Text
        fontSize={18}
        fontWeight="medium"
        color="gray.600"
        css={{ marginTop: '12px' }}
      >
        {`Add and edit the colors in your theme. `}
      </Text>

      <Divider css={{ borderWidth: '2px', margin: '12px 0' }} />
      <Box css={{ marginTop: '24px' }}>
        <Stack direction="column" alignItems="flex-start" spacing={32}>
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
            />
          ))}
        </Stack>

        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '18px 0',
            marginTop: '32px',
          }}
        >
          <AddColorSkeleton backgroundColorString='#eee' />
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
