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
  InputRightElement,
  IconButton,
  InputGroup,
} from '@chakra-ui/react'
import { TColorData } from 'types'
import { useState, useRef } from 'react'
import { generateDefaultColorShades, handleInvalidColor } from './utils'
import { ColorPicker } from './ColorPicker'
import { Color } from '@hello-pangea/color-picker'
import tinycolor from 'tinycolor2'
import { FaMagic } from 'react-icons/fa'

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

  const shouldRecommendHover = !!base && !hover
  const shouldRecommendActive = !!base && !active
  const shades = generateDefaultColorShades(base)

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
      shades,
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
            gap: 24,
          }}
        >
          <Flex flexDirection="column" flex="1">
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
              <InputGroup>
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
                <InputRightElement>
                  {shouldRecommendHover && (
                    <IconButton
                      icon={<FaMagic />}
                      onClick={() => {
                        setColorPickerColor(shades['600'])
                        setHover(shades['600'])
                      }}
                      size="sm"
                      aria-label="Use recommended hover"
                    />
                  )}
                </InputRightElement>
              </InputGroup>
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
              <InputGroup>
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
                <InputRightElement>
                  {shouldRecommendActive && (
                    <IconButton
                      icon={<FaMagic />}
                      onClick={() => {
                        setColorPickerColor(shades['700'])
                        setActive(shades['700'])
                      }}
                      size="sm"
                      aria-label="Use recommended active"
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Flex>
          <Box flex="1">
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
