import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Box,
  Flex,
} from '@chakra-ui/react'
import { TColorData } from 'types'
import { useState, useRef } from 'react'
import { generateDefaultColorShades } from './utils'
import { ColorPicker } from './ColorPicker'
import { Color } from '@hello-pangea/color-picker'
import { VALID_CSS_COLORS } from './validCssColors'
import tinycolor from 'tinycolor2'

export function EditColorModal({
  isOpen,
  onClose,
  initialColorData,
}: {
  isOpen: boolean
  onClose: (newColorData?: TColorData) => void
  initialColorData?: TColorData
}) {
  const baseRef = useRef<HTMLInputElement | null>(null)
  const hoverRef = useRef<HTMLInputElement | null>(null)
  const activeColorRef = useRef<HTMLInputElement | null>(null)

  const presetColors: string[] = []
  const [name, setName] = useState<string>(initialColorData?.name ?? '')
  const [base, setBase] = useState<string>(initialColorData?.base ?? '')

  // NOTE: hover and active should default to empty strings not undefined
  // to fix the controlled vs uncontrolled warning, but that requires
  // backend cleanup
  const [hover, setHover] = useState<string | undefined>(
    initialColorData?.hover
  )
  const [active, setActive] = useState<string | undefined>(
    initialColorData?.active
  )

  const isPrimary = initialColorData?.isPrimary ?? false
  const isSecondary = initialColorData?.isSecondary ?? false

  const [colorPickerColor, setColorPickerColor] = useState<Color>(
    initialColorData?.base ?? '#000000'
  )

  const [showBaseColorPicker, setShowBaseColorPicker] = useState<boolean>(false)
  const [showHoverColorPicker, setShowHoverColorPicker] =
    useState<boolean>(false)
  const [showActiveColorPicker, setShowActiveColorPicker] =
    useState<boolean>(false)

  const handleInvalidColor = (input: string) => {
    // Check if input is a valid hex code
    const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
    if (hexRegex.test(input)) {
      if (input.startsWith('#')) {
        return input
      } else {
        return `#${input}`
      }
    }

    // Check if input is a valid color name
    const lowerCaseInput = input.toLowerCase()
    if (VALID_CSS_COLORS.includes(lowerCaseInput)) {
      return lowerCaseInput
    }

    const validSubsetRegex = /^#?[0-9A-Fa-f]{0,6}$/ // regex to validate if input is a valid subset of a hexcode
    const randomHex = Math.floor(Math.random() * 16777215).toString(16) // generate a random valid hexcode

    if (validSubsetRegex.test(input)) {
      // check if input is a valid subset of a hexcode
      if (input.startsWith('#')) {
        return `${input}${randomHex.slice(input.length - 1)}` // use input as the first part and append random characters as necessary to make a valid hexcode
      } else {
        return `#${input}${randomHex.slice(input.length)}` // use input as the first part and append random characters as necessary to make a valid hexcode
      }
    } else {
      return `#${randomHex}` // generate a completely random valid hexcode
    }
  }

  const onBaseBlur = () => {
    const value = handleInvalidColor(base)
    setColorPickerColor(value)
    setBase(value)
  }

  const onHoverBlur = () => {
    if (hover) {
      const value = handleInvalidColor(hover)
      setColorPickerColor(value)
      setHover(value)
    }
  }

  const onActiveBlur = () => {
    if (active) {
      const value = handleInvalidColor(active)
      setColorPickerColor(value)
      setActive(value)
    }
  }

  const handleClose = () => {
    onActiveBlur()
    onBaseBlur()
    onHoverBlur()

    onClose({
      name,
      base,
      hover,
      active,
      shades: generateDefaultColorShades(base),
      isPrimary,
      isSecondary,
    })
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
          }}
        >
          <Flex flexDirection="column" mr="10">
            <FormControl>
              <FormLabel>Variable Name</FormLabel>
              <Input
                placeholder="e.g. Pepsi Blue"
                size="md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => {
                  setShowBaseColorPicker(true)
                  setShowHoverColorPicker(false)
                  setShowActiveColorPicker(false)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && baseRef.current) {
                    baseRef.current.focus()
                  }
                }}
              />
            </FormControl>
            <FormControl css={{ marginTop: 16 }}>
              <FormLabel>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  Base Color{' '}
                  <Box
                    css={{ height: '14px', width: '14px', marginLeft: '8px' }}
                    bgColor={base}
                    border={`0.5px solid ${
                      tinycolor(base).isDark() ? 'white' : 'black'
                    }`}
                  />
                </Box>
              </FormLabel>
              <Input
                ref={baseRef}
                placeholder="e.g. #D3AC3"
                size="md"
                value={base}
                onChange={(e) => {
                  setColorPickerColor(e.target.value)
                  setBase(e.target.value)
                }}
                onBlur={onBaseBlur}
                onFocus={(e) => {
                  setShowHoverColorPicker(false)
                  setShowActiveColorPicker(false)

                  setColorPickerColor(e.target.value)
                  setShowBaseColorPicker(true)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && hoverRef.current) {
                    hoverRef.current.focus()
                  }
                }}
              />
            </FormControl>
            <FormControl css={{ marginTop: 16 }}>
              <FormLabel>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  Hover Color (Optional)
                  <Box
                    css={{ height: '14px', width: '14px', marginLeft: '8px' }}
                    bgColor={hover}
                    border={`0.5px solid ${
                      tinycolor(hover).isDark() ? 'white' : 'black'
                    }`}
                  />{' '}
                </Box>
              </FormLabel>
              <Input
                ref={hoverRef}
                placeholder="e.g. #D3AC3"
                size="md"
                value={hover}
                onChange={(e) => setHover(e.target.value)}
                onFocus={(e) => {
                  setShowBaseColorPicker(false)
                  setShowActiveColorPicker(false)

                  setColorPickerColor(e.target.value)
                  setShowHoverColorPicker(true)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter' && activeColorRef.current) {
                    activeColorRef.current.focus()
                  }
                }}
                onBlur={onHoverBlur}
              />
            </FormControl>
            <FormControl css={{ marginTop: 16 }}>
              <FormLabel>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  Active Color (Optional)
                  <Box
                    css={{ height: '14px', width: '14px', marginLeft: '8px' }}
                    bgColor={active}
                    border={`0.5px solid ${
                      tinycolor(active).isDark() ? 'white' : 'black'
                    }`}
                  />
                </Box>
              </FormLabel>
              <Input
                ref={activeColorRef}
                placeholder="e.g. #D3AC3"
                size="md"
                value={active}
                onChange={(e) => setActive(e.target.value)}
                onFocus={(e) => {
                  setShowBaseColorPicker(false)
                  setShowHoverColorPicker(false)

                  setColorPickerColor(e.target.value)
                  setShowActiveColorPicker(true)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleClose()
                  }
                }}
                onBlur={onActiveBlur}
              />
            </FormControl>
          </Flex>
          {showBaseColorPicker && (
            <ColorPicker
              onChange={(colorPickerColor, event) => {
                setBase(colorPickerColor.hex)
              }}
              colorPickerColor={colorPickerColor}
              presetColors={presetColors}
            />
          )}
          {showHoverColorPicker && (
            <ColorPicker
              onChange={(colorPickerColor) => {
                setHover(colorPickerColor.hex)
              }}
              colorPickerColor={colorPickerColor}
              presetColors={presetColors}
            />
          )}
          {showActiveColorPicker && (
            <ColorPicker
              onChange={(colorPickerColor) => {
                setActive(colorPickerColor.hex)
              }}
              colorPickerColor={colorPickerColor}
              presetColors={presetColors}
            />
          )}
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
