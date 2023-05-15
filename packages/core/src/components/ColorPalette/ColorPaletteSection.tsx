import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { TNamedTokenGroup, TTokenGroup } from '../../types'
import { AddColorModal } from './AddColorModal'
import { AddColorSkeleton } from './AddColorSkeleton'
import { ColorDisplay } from './ColorDisplay'

export function ColorPaletteSection({
  colors,
  onUpdateColors,
}: {
  colors: TTokenGroup
  onUpdateColors: (newColors: TTokenGroup) => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  let totalVariants = 0
  Object.keys(colors).forEach((name) => {
    totalVariants += Object.keys(colors[name]).length
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Heading
        fontSize={'2.5rem'}
        fontWeight="black"
        color="var(--text-color-primary)"
      >
        Color Palette
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="var(--text-color-secondary)"
          css={{ marginTop: '12px' }}
        >
          {`Add and edit the colors in your theme. `}
        </Text>
        {totalVariants > 5 && (
          <>
            <Button width="160px" variant="outline" onClick={() => onOpen()}>
              Add New Color
            </Button>
          </>
        )}
      </Box>
      <Divider css={{ borderWidth: '2px', margin: '12px 0', width: '100%' }} />

      <Box>
        <Stack direction="column" spacing={12}>
          {Object.keys(colors).map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
              }}
            >
              <ColorDisplay
                colorName={name}
                colorData={colors[name] as TTokenGroup}
                onUpdateColorName={(newName: string) => {
                  // Rename the color while retaining the order of the keys
                  const newColors = Object.keys(colors).reduce((acc, key) => {
                    if (key !== name) acc[key] = colors[key]
                    else acc[newName] = colors[key]
                    return acc
                  }, {} as TTokenGroup)

                  onUpdateColors(newColors)
                }}
                isErrorOnUpdateColorName={(newName: string) => {
                  if (newName === '') return 'Color name cannot be empty.'
                  if (newName.toLowerCase() !== name.trim().toLowerCase()) {
                    const isNamePresent = Object.keys(colors).some(
                      (colorName) =>
                        colorName.trim().toLowerCase() === newName.toLowerCase()
                    )
                    if (isNamePresent) return 'Color name already exists.'
                  }
                  return null
                }}
                onUpdateColorData={(
                  updatedColorData: TTokenGroup,
                  newColorName?: string
                ) => {
                  if (newColorName) {
                    // Rename the color while retaining the order of the keys
                    const newColors = Object.keys(colors).reduce((acc, key) => {
                      if (key !== name) acc[key] = colors[key]
                      else acc[newColorName] = colors[key]
                      return acc
                    }, {} as TTokenGroup)
                    newColors[newColorName] = updatedColorData
                    onUpdateColors(newColors)
                  } else {
                    const newColors = { ...colors }
                    newColors[name] = updatedColorData
                    onUpdateColors(newColors)
                  }
                }}
                onDeleteColorData={() => {
                  const newColors = { ...colors }
                  delete newColors[name]
                  onUpdateColors(newColors)
                }}
              />
            </motion.div>
          ))}
        </Stack>
        <Box
          css={{
            padding: '18px 0',
            marginTop: Object.keys(colors).length > 0 ? '32px' : '0',
          }}
          onClick={() => onOpen()}
        >
          <AddColorSkeleton numberOfMockVariants={4} />
        </Box>
      </Box>
      <AddColorModal
        isOpen={isOpen}
        onClose={(newColor?: TNamedTokenGroup) => {
          if (newColor) {
            // ensure the new key is first
            const newColors = { [newColor.name]: newColor.group, ...colors }
            onUpdateColors(newColors)
          }
          onClose()
        }}
      />
    </motion.div>
  )
}
