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
import { TToken } from '@core/types'
import { useEffect, useState } from 'react'
import { AnyColor } from 'react-colorful/dist/types'

import ColorPicker from '../../ColorPalette/ColorPicker'

const INITIAL_COLOR_PICKER_COLOR = '#008EC8'

interface UpdateColorModalProps {
  color: TToken | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (name: string, color: string) => void
  name: string | null
}

export function UpdateColorModal({ isOpen, color, onClose, name: defaultName, onUpdate }: UpdateColorModalProps){
  const [colorPickerColor, setColorPickerColor] = useState<AnyColor>(
    color?.value || INITIAL_COLOR_PICKER_COLOR
  )
  const [name, setName] = useState<string>(defaultName || '')

  useEffect(function () {
    setColorPickerColor(color?.value || INITIAL_COLOR_PICKER_COLOR)
  }, [color])

  useEffect(function () {
    setName(defaultName || '')
  }, [defaultName])

 return (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Color</ModalHeader>
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
                size="md"
                placeholder="e.g. Sky Blue"
                value={name}
                onChange={function (event) {
                  setName(event.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <ColorPicker
                shadow={false}
                onChange={function (newColor) {
                  setColorPickerColor(newColor)
                }}
                colorPickerColor={colorPickerColor}
              />
              {/* {errorw && (
                <Text
                  css={{ alignSelf: 'flex-start', marginTop: '8px' }}
                  color="red.500"
                  fontWeight="medium"
                >
                  {error}
                </Text>
              )} */}
              <Box mt={5} style={{ width: '100%' }}>
                {/* <VariantRow
                  variant={namedToken}
                  onUpdateVariant={() => {
                    return null
                  }}
                  hideIcons
                /> */}
                <FormControl
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button mt={5} onClick={function () {
                    onUpdate(name, colorPickerColor as string)
                  }}>
                    Update
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