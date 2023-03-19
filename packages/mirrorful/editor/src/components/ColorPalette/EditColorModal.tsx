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
  Checkbox,
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
  const [base, setBase] = useState<string>(initialColorData?.baseColor ?? '')
  const [shouldGenerateVariants, setShouldGenerateVariants] = useState(false)

  const [colorPickerColor, setColorPickerColor] = useState<Color>(
    initialColorData?.baseColor ?? '#000000'
  )

  const [showBaseColorPicker, setShowBaseColorPicker] = useState<boolean>(true)

  const onBaseBlur = () => {
    const value = handleInvalidColor(base)
    setColorPickerColor(value)
    setBase(value)
  }

  const handleClose = () => {
    onBaseBlur()
    onClose({
      name,
      baseColor: base,
      variants: shouldGenerateVariants
        ? generateDefaultColorShades(base)
        : {
            '500': base,
          },
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
            </FormControl>
            <FormControl>
              <Checkbox
                checked={shouldGenerateVariants}
                onChange={() => setShouldGenerateVariants((prev) => !prev)}
                defaultChecked={shouldGenerateVariants}
              ></Checkbox>
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
