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
import { useEffect, useState } from 'react'
import { generateDefaultColorShades } from './utils'
import { ColorPicker } from './ColorPicker'

export function EditColorModal({
  isOpen,
  onClose,
  initialColorData,
}: {
  isOpen: boolean
  onClose: (newColorData?: TColorData) => void
  initialColorData?: TColorData
}) {
  const [name, setName] = useState<string>(initialColorData?.name ?? '')
  const [base, setBase] = useState<string>(initialColorData?.base ?? '')
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

  // const [showColorPicker, setShowColorPicker] = useState<boolean>(false)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Color</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          css={{
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <Flex flexDirection="column" mr="10">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="e.g. Acme, Inc. Sky Blue"
                size="md"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="e.g. #D3AC3"
                size="md"
                value={base}
                onChange={(e) => setBase(e.target.value)}
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
                placeholder="e.g. #D3AC3"
                size="md"
                value={hover}
                onChange={(e) => setHover(e.target.value)}
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
                placeholder="e.g. #D3AC3"
                size="md"
                value={active}
                onChange={(e) => setActive(e.target.value)}
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
          <ColorPicker />
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
            {initialColorData ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
