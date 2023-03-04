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
      <Heading fontSize={48} fontWeight="black">
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
          <Button
            onClick={() => onOpen()}
            css={{ height: '50px', fontSize: '18px', fontWeight: 'bold' }}
          >
            Add New Color
          </Button>
        </Box>
      </Box>
      <EditColorModal
        isOpen={isOpen}
        onClose={(colorData?: TColorData) => {
          if (colorData) {
            const newColors = [...colors]
            // Here, we are be checking if there are multiple instances of the colour, each having an incremented number...
            const existingColorRegex:RegExp = new RegExp("(" + colorData.name + ")(?: ([0-9]+))?")
            // The string that will be finally assigned as a color name:
            let finalName:string = ''
            // The maximum number that will be incremented to in the event of multiple colors of the same name
            let maxNum:number = 0

            // Iterate the color list:
            newColors.map((col) => {
                // Do a regex check to find both the color name, and it's number
                let match: RegExpMatchArray | null = col.name.match(existingColorRegex)

                // If we have a match, construct the (incremented) final color name
                if(match)
                {
                    // match[2] represents the number this iteration color has previously been incremented to.  If it's incremented value is bigger than the last iteration, assign it to maxNum
                    maxNum = parseInt(match[2])+1 > maxNum ? parseInt(match[2])+1 : maxNum
                    
                    // If we have zero, it means the color name exists, but hasn't yet been incremented, so we assign 2.  Otherwise, assign the max number
                    if (maxNum > 0)
                        finalName = colorData.name + ' ' + maxNum
                    else
                        finalName = colorData.name + ' 2'
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
