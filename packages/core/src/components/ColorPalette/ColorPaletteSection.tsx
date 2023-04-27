import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { TNamedTokenGroup, TTokenGroup } from '../../types'
import { darkTheme, lightTheme } from '../theme'
import { AddColorSkeleton } from './AddColorSkeleton'
import { ColorDisplay } from './ColorDisplay'
import { EditColorModal } from './EditColorModal'

export function ColorPaletteSection({
  colors,
  onUpdateColors,
}: {
  colors: TTokenGroup
  onUpdateColors: (newColors: TTokenGroup) => void
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const headingColor = useColorModeValue(
    lightTheme.headings.colors.large,
    darkTheme.headings.colors.large
  )
  const buttonBackgroundColor = useColorModeValue(
    lightTheme.buttons.backgroundColors.default,
    darkTheme.buttons.large.backgroundColors.default
  )
  const buttonBackgroundColorOnHover = useColorModeValue(
    lightTheme.buttons.backgroundColors.hover,
    darkTheme.buttons.large.backgroundColors.hover
  )
  const buttonBorder = useColorModeValue('none', '3px solid transparent')
  const borderRadius = useColorModeValue(8, 30)
  const buttonBorderOnHover = useColorModeValue(
    'none',
    '3.5px solid transparent'
  )
  const buttonTextColor = useColorModeValue(
    lightTheme.buttons.textColors.primary,
    darkTheme.buttons.large.textColors
  )

  let totalVariants = 0
  Object.keys(colors).forEach((name) => {
    totalVariants += Object.keys(colors[name]).length
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Heading
        fontSize={'2.5rem'}
        fontWeight="black"
        css={{
          background: headingColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Color Palette
      </Heading>
      <Box display="flex" justifyContent="space-between">
        <Text
          fontSize={'1.2rem'}
          fontWeight="medium"
          color="gray.600"
          css={{ marginTop: '12px' }}
        >
          {`Add and edit the colors in your theme. `}
        </Text>
        {totalVariants > 5 && (
          <>
            <Button
              width="180px"
              css={{
                height: '50px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: buttonBackgroundColor,
                borderRadius: borderRadius,
                border: buttonBorder,
                color: buttonTextColor,
                transition: '.2s',
              }}
              _hover={{
                background: buttonBackgroundColorOnHover,
                border: buttonBorderOnHover,
              }}
              onClick={() => onOpen()}
            >
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
                onUpdateColorData={(updatedColorData: TTokenGroup) => {
                  const newColors = { ...colors }
                  newColors[name] = updatedColorData

                  onUpdateColors(newColors)
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
      <EditColorModal
        isOpen={isOpen}
        onClose={(newColor?: TNamedTokenGroup) => {
          if (newColor) {
            const newColors = { ...colors }

            newColors[newColor.name] = newColor.group

            onUpdateColors(newColors)
          }
          onClose()
        }}
      />
    </motion.div>
  )
}
