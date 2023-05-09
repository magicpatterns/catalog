import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { TNamedTokenGroup } from '@core/types'
import { useState } from 'react'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'
import { v4 as uuidv4 } from 'uuid'

import ColorPicker from './ColorPicker'
import {
  defaultColorShadesToTokens,
  generateDefaultColorShades,
  handleInvalidColor,
} from './utils'

const INITIAL_COLOR_PICKER_COLOR = '#008EC8'

export function AddColorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: (newColor?: TNamedTokenGroup) => void
}) {
  const [name, setName] = useState<string>('')

  const [error, setError] = useState<string | null>(null)

  const [colorPickerColor, setColorPickerColor] = useState<AnyColor>(
    INITIAL_COLOR_PICKER_COLOR
  )

  const handleClose = () => {
    if (!name) {
      setError('Please enter a color name.')
      return
    }

    const additionalVariants = defaultColorShadesToTokens(
      generateDefaultColorShades(colorPickerColor)
    )

    onClose({
      name,
      group: {
        DEFAULT: {
          id: uuidv4(),
          value: tinycolor(colorPickerColor).toHexString(),
          type: 'color',
        },
        ...additionalVariants,
      },
    })

    setName('')
    setColorPickerColor(INITIAL_COLOR_PICKER_COLOR)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Color</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          css={{
            flexDirection: 'row',
            display: 'flex',
            gap: 24,
          }}
        >
          <Flex flexDirection="column" flex="1" gap={4}>
            <FormControl>
              <Flex>
                <FormLabel>Color Name</FormLabel>
              </Flex>
              <Input
                placeholder="e.g. Sky Blue"
                size="md"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (error) setError(null)
                }}
              />
              {error && !name && (
                <Text
                  css={{ alignSelf: 'flex-start', marginTop: '8px' }}
                  color="red.400"
                  fontWeight="medium"
                >
                  {error}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <ColorPicker
                onChange={(colorPickerColor) => {
                  const color =
                    typeof colorPickerColor === 'string'
                      ? tinycolor(colorPickerColor).toHexString()
                      : tinycolor(colorPickerColor).toRgbString()

                  setColorPickerColor(color)
                }}
                colorPickerColor={colorPickerColor}
              />
              {error && name && (
                <Text
                  css={{ alignSelf: 'flex-start', marginTop: '8px' }}
                  color="red.400"
                  fontWeight="medium"
                >
                  {error}
                </Text>
              )}
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
