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
import { useCallback, useEffect, useState } from 'react'

import { TNamedTokenGroup, TTokenGroup } from '../../types'
import { LoginAlert } from '../LoginAlert'
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
  const [colorsData, setColorsData] = useState(colors)

  const { isOpen, onOpen, onClose } = useDisclosure()

  let totalVariants = 0
  Object.keys(colorsData).forEach((name) => {
    totalVariants += Object.keys(colorsData[name]).length
  })

  const onUpdateColorData = useCallback(
    (updatedColorData: TTokenGroup, name: string, newColorName?: string) => {
      let newColors: TTokenGroup = {}
      setColorsData((prev) => {
        if (newColorName) {
          // Rename the color while retaining the order of the keys
          newColors = Object.keys(prev).reduce((acc, key) => {
            if (key !== name) acc[key] = prev[key]
            else acc[newColorName] = prev[key]
            return acc
          }, {} as TTokenGroup)
          newColors[newColorName] = updatedColorData
          return newColors
        } else {
          newColors = structuredClone(prev)
          newColors[name] = updatedColorData
          return newColors
        }
      })
      onUpdateColors(newColors)
    },
    []
  )

  const onDeleteColorData = useCallback((name: string) => {
    let newColors: TTokenGroup = {}
    setColorsData((prev) => {
      newColors = { ...prev }
      delete newColors[name]
      return prev
    })
    onUpdateColors(newColors)
  }, [])

  useEffect(() => {
    setColorsData(() => colors)
  }, [colors])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LoginAlert />
      <Heading
        fontSize={{ base: '2.3rem', md: '2.5rem' }}
        fontWeight="black"
        color="var(--text-color-primary)"
      >
        Color Palette
      </Heading>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Text
          fontSize={{ base: '1rem', md: '1.2rem' }}
          fontWeight="medium"
          color="var(--text-color-secondary)"
          css={{ marginTop: '12px' }}
        >
          {`Add and edit the colors in your theme. `}
        </Text>
        {totalVariants > 5 && (
          <>
            <Button
              width="160px"
              variant="outline"
              onClick={() => onOpen()}
              marginTop={{ base: '12px', md: '0' }}
            >
              Add New Color
            </Button>
          </>
        )}
      </Box>
      <Divider css={{ borderWidth: '2px', margin: '12px 0', width: '100%' }} />

      <Box>
        <Stack direction="column" spacing={12}>
          {Object.keys(colorsData).map((name, index) => {
            return (
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
                  colorData={colorsData[name] as TTokenGroup}
                  onUpdateColorName={(newName: string) => {
                    // Rename the color while retaining the order of the keys
                    const newColors = Object.keys(colorsData).reduce(
                      (acc, key) => {
                        if (key !== name) acc[key] = colorsData[key]
                        else acc[newName] = colorsData[key]
                        return acc
                      },
                      {} as TTokenGroup
                    )

                    onUpdateColors(newColors)
                  }}
                  isErrorOnUpdateColorName={(newName: string) => {
                    if (newName === '') return 'Color name cannot be empty.'
                    if (newName.toLowerCase() !== name.trim().toLowerCase()) {
                      const isNamePresent = Object.keys(colorsData).some(
                        (colorName) =>
                          colorName.trim().toLowerCase() ===
                          newName.toLowerCase()
                      )
                      if (isNamePresent) return 'Color name already exists.'
                    }
                    return null
                  }}
                  onUpdateColorData={(
                    colorData: TTokenGroup,
                    newName?: string | undefined
                  ) => {
                    onUpdateColorData(colorData, name, newName)
                  }}
                  onDeleteColorData={() => {
                    onDeleteColorData(name)
                  }}
                />
              </motion.div>
            )
          })}
        </Stack>
        <Box
          css={{
            padding: '18px 0',
            marginTop: Object.keys(colorsData).length > 0 ? '32px' : '0',
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
            const newColors = { [newColor.name]: newColor.group, ...colorsData }
            onUpdateColors(newColors)
          }
          onClose()
        }}
      />
    </motion.div>
  )
}
