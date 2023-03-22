import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { TColorData } from '../../types'
import { AddColorSkeleton } from './AddColorSkeleton'
import { ColorDisplay } from './ColorDisplay'
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
      <Heading fontSize={'3rem'} fontWeight="black">
        Color Palette
      </Heading>
      <Text
        fontSize={'1.2rem'}
        fontWeight="medium"
        color="gray.600"
        css={{ marginTop: '12px' }}
      >
        {`Add and edit the colors in your theme. `}
      </Text>
      <Divider css={{ borderWidth: '2px', margin: '12px 0', width: '100%' }} />

      <Box>
        <Stack direction="column" spacing={12}>
          {colors.map((color) => (
            <ColorDisplay
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
            padding: '18px 0',
            marginTop: colors.length > 0 ? '32px' : '0',
          }}
          onClick={() => onOpen()}
        >
          <AddColorSkeleton numberOfMockVariants={4} />
        </Box>
      </Box>
      <EditColorModal
        isOpen={isOpen}
        onClose={(colorData?: TColorData) => {
          if (colorData) {
            const newColors = [...colors]
            const existingColorRegex = new RegExp(
              '(' + colorData.name + ')(?: ([0-9]+))?'
            )
            let finalName = ''
            let maxNum = 0

            newColors.map((col) => {
              // Do a regex check to find both the color name, and it's number
              const match: RegExpMatchArray | null =
                col.name.match(existingColorRegex)

              // If we have a match, construct the (incremented) final color name
              if (match) {
                // match[2] represents the number this iteration color has previously been incremented to.  If it's incremented value is bigger than the last iteration, assign it to maxNum
                maxNum =
                  parseInt(match[2]) + 1 > maxNum
                    ? parseInt(match[2]) + 1
                    : maxNum

                // If we have zero, it means the color name exists, but hasn't yet been incremented, so we assign 2.  Otherwise, assign the max number
                if (maxNum > 0) finalName = colorData.name + ' ' + maxNum
                else finalName = colorData.name + ' 2'
              }
            })
            // Lastly, construct the final string and assign it to the colorData.name if it's not blank
            colorData.name = finalName === '' ? colorData.name : finalName

            newColors.push(colorData)

            onUpdateColors(newColors)
          }
          onClose()
        }}
      />
    </Box>
  )
}
