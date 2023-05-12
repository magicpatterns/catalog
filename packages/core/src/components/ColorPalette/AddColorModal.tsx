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
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { TNamedTokenGroup } from '@core/types'
import { useState } from 'react'
import { AnyColor } from 'react-colorful/dist/types'
import tinycolor from 'tinycolor2'
import { v4 as uuidv4 } from 'uuid'

import { nameThatColor } from '../Onboarding/utils'
import ColorPicker from './ColorPicker'
import { defaultColorShadesToTokens, generateDefaultColorShades } from './utils'
import { VariantRow } from './VariantRow'

const INITIAL_COLOR_PICKER_COLOR = '#008EC8'

export function AddColorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: (newColor?: TNamedTokenGroup) => void
}) {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [colorPickerColor, setColorPickerColor] = useState<AnyColor>(
    INITIAL_COLOR_PICKER_COLOR
  )

  const handleClose = () => {
    let finalName = name
    if (!name) {
      const generatedName = nameThatColor(tinycolor(colorPickerColor).toHsl())
      finalName = generatedName
    }

    const additionalVariants = defaultColorShadesToTokens(
      generateDefaultColorShades({ primary: colorPickerColor })
    )

    onClose({
      name: finalName,
      group: {
        DEFAULT: {
          id: uuidv4(),
          value: getColor(colorPickerColor),
          type: 'color',
        },
        ...additionalVariants,
      },
    })

    setName('')
    setColorPickerColor(INITIAL_COLOR_PICKER_COLOR)
  }

  const getColor = (color: AnyColor) => {
    return typeof color === 'string' && color.includes('#')
      ? tinycolor(color).toHexString()
      : tinycolor(color).toRgbString()
  }

  const namedToken = {
    name: 'DEFAULT',
    token: {
      id: uuidv4(),
      value: getColor(colorPickerColor),
      type: 'color' as const,
    },
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
                }}
              />
            </FormControl>
            <FormControl>
              <ColorPicker
                onChange={(colorPickerColor) => {
                  setError('')
                  if (tinycolor(colorPickerColor).isValid()) {
                    const color = getColor(colorPickerColor)
                    setColorPickerColor(color)
                  }
                }}
                colorPickerColor={colorPickerColor}
              />{' '}
              {error && (
                <Text
                  css={{ alignSelf: 'flex-start', marginTop: '8px' }}
                  color="red.500"
                  fontWeight="medium"
                >
                  {error}
                </Text>
              )}
              <Box mt={5} style={{ width: '100%' }}>
                <VariantRow
                  defaultNamedToken={namedToken}
                  variant={namedToken}
                  onUpdateVariant={() => {
                    return null
                  }}
                  hideIcons
                />
                <FormControl
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button mt={5} onClick={handleClose}>
                    Add
                  </Button>
                </FormControl>
              </Box>
            </FormControl>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
