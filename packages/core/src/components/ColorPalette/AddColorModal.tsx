import { InfoIcon } from '@chakra-ui/icons'
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
  Tooltip,
} from '@chakra-ui/react'
import { TNamedTokenGroup } from '@core/types'
import { Color } from '@hello-pangea/color-picker'
import { useRef, useState } from 'react'
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
  const baseRef = useRef<HTMLInputElement | null>(null)
  const hoverRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState<string>('')
  const [base, setBase] = useState<string>('')

  const [error, setError] = useState<string | null>(null)

  const [colorPickerColor, setColorPickerColor] = useState<AnyColor>(
    INITIAL_COLOR_PICKER_COLOR
  )

  const [showBaseColorPicker, setShowBaseColorPicker] = useState<boolean>(true)

  const onBaseBlur = () => {
    const value = handleInvalidColor(base)
    setColorPickerColor(value)
    setBase(value)
  }

  const handleClose = () => {
    if (!name) {
      setError('Please enter a color name.')
      return
    }
    if (!base) {
      setError('Please enter a base color.')
      return
    }
    onBaseBlur()
    const additionalVariants = defaultColorShadesToTokens(
      generateDefaultColorShades(base)
    )

    onClose({
      name,
      group: {
        DEFAULT: {
          id: uuidv4(),
          value: base,
          type: 'color',
        },
        ...additionalVariants,
      },
    })

    setName('')
    setBase('')
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
                onFocus={() => {
                  setShowBaseColorPicker(true)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && baseRef.current) {
                    baseRef.current.focus()
                  }
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
              <FormLabel>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  Base Color{' '}
                  <Box
                    css={{ height: '14px', width: '14px', marginLeft: '8px' }}
                    bgColor={base}
                    border={'1px solid black'}
                  />
                </Box>
              </FormLabel>
              <Input
                ref={baseRef}
                placeholder="e.g. #D3AC3B"
                size="md"
                value={base}
                onChange={(e) => {
                  setColorPickerColor(e.target.value)
                  setBase(e.target.value)
                  if (error) setError(null)
                }}
                onBlur={onBaseBlur}
                onFocus={(e) => {
                  setColorPickerColor(e.target.value)
                  setShowBaseColorPicker(true)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && hoverRef.current) {
                    hoverRef.current.focus()
                  }
                }}
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
          <Box flex="1">
            {showBaseColorPicker && (
              <ColorPicker
                onChange={(colorPickerColor) => {
                  setColorPickerColor(tinycolor(colorPickerColor).toHex())
                }}
                colorPickerColor={colorPickerColor}
              />
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
