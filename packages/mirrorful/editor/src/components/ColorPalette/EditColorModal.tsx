import {
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  FormControl,
  Input,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Box,
  Flex,
} from '@chakra-ui/react'
import { TColorData } from 'types'
import { useEffect, useState, useRef } from 'react'
import { generateDefaultColorShades } from './utils'
import { ColorPicker } from './ColorPicker'
import { Color } from '@hello-pangea/color-picker'

export function EditColorModal({
  isOpen,
  onClose,
  initialColorData,
}: {
  isOpen: boolean
  onClose: (newColorData?: TColorData) => void
  initialColorData?: TColorData
}) {
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
  const [isPrimary, setIsPrimary] = useState<boolean>(
    initialColorData?.isPrimary ?? false
  )
  const [isSecondary, setIsSecondary] = useState<boolean>(
    initialColorData?.isSecondary ?? false
  )

  const [colorPickerColor, setColorPickerColor] = useState<Color>(
    initialColorData?.base ?? '#000000'
  )

  const [showBaseColorPicker, setShowBaseColorPicker] = useState<boolean>(false)
  const [showHoverColorPicker, setShowHoverColorPicker] =
    useState<boolean>(false)
  const [showActiveColorPicker, setShowActiveColorPicker] =
    useState<boolean>(false)

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
              />
            </FormControl>
            <FormControl css={{ marginTop: 16 }}>
              <FormLabel>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  Base Color{' '}
                  <Box
                    css={{ height: '14px', width: '14px', marginLeft: '8px' }}
                    bgColor={base}
                  />
                </Box>
              </FormLabel>
              <Input
                ref={function (input) {
                  if (showBaseColorPicker && input) {
                    input.focus()
                  }
                }}
                placeholder="e.g. #D3AC3"
                size="md"
                value={base}
                onChange={(e) => {
                  setColorPickerColor(e.target.value)
                  setBase(e.target.value)
                }}
                onFocus={(e) => {
                  setShowHoverColorPicker(false)
                  setShowActiveColorPicker(false)

                  setColorPickerColor(e.target.value)
                  setShowBaseColorPicker(true)
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
                  />
                </Box>
              </FormLabel>
              <Input
                ref={function (input) {
                  if (showHoverColorPicker && input) {
                    input.focus()
                  }
                }}
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
              />
            </FormControl>
            <FormControl css={{ marginTop: 16 }}>
              <FormLabel>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  Active Color (Optional)
                  <Box
                    css={{ height: '14px', width: '14px', marginLeft: '8px' }}
                    bgColor={active}
                  />
                </Box>
              </FormLabel>
              <Input
                ref={function (input) {
                  if (showActiveColorPicker && input) {
                    input.focus()
                  }
                }}
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
              />
            </FormControl>
            {/* <FormControl css={{ marginTop: 16 }}>
            <Checkbox
              checked={!!isPrimary}
              onChange={(event) => {
                setIsPrimary(event.target.checked)
              }}
              defaultChecked={isPrimary}
            >
              This is the Primary
            </Checkbox>
          </FormControl> */}
          </Flex>
          {showBaseColorPicker && (
            <ColorPicker
              onChange={(colorPickerColor) => {
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
          <Button
            onClick={() => {
              onClose({
                name,
                base,
                hover,
                active,
                shades: generateDefaultColorShades(base),
                isPrimary,
                isSecondary,
              })
            }}
          >
            {initialColorData ? 'Save' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
