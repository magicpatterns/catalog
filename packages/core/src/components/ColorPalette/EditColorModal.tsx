import { InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
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
import { assertToken, TNamedTokenGroup, TTokenGroup } from '@core/types'
import { Color } from '@hello-pangea/color-picker'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ColorPicker } from './ColorPicker'
import {
  defaultColorShadesToTokens,
  generateDefaultColorShades,
  handleInvalidColor,
} from './utils'

const INITIAL_COLOR_PICKER_COLOR = '#000000'

export function EditColorModal({
  isOpen,
  onClose,
  initialColorData,
}: {
  isOpen: boolean
  onClose: (newColor?: TNamedTokenGroup) => void
  initialColorData?: TNamedTokenGroup
}) {
  const baseRef = useRef<HTMLInputElement | null>(null)
  const hoverRef = useRef<HTMLInputElement | null>(null)

  const initialBaseValue = initialColorData?.group.base ?? {}

  const presetColors: string[] = []
  const [name, setName] = useState<string>(initialColorData?.name ?? '')
  const [base, setBase] = useState<string>(
    assertToken(initialBaseValue) ? initialBaseValue.value : ''
  )

  const [error, setError] = useState<string | null>(null)

  const [colorPickerColor, setColorPickerColor] = useState<Color>(
    `${initialColorData?.group.base?.value}` ?? INITIAL_COLOR_PICKER_COLOR
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialColorData ? 'Edit Color' : 'Add Color'}
        </ModalHeader>
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
                <Tooltip
                  placement="right"
                  closeDelay={500}
                  hasArrow
                  label={"Color names don't need a hyphen."}
                >
                  <InfoIcon css={{ marginTop: '5px', marginLeft: '-6px' }} />
                </Tooltip>
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
                  setBase(colorPickerColor.hex)
                }}
                colorPickerColor={colorPickerColor}
                presetColors={presetColors}
              />
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>
            {initialColorData ? 'Save' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
