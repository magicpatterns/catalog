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
  Tooltip
} from '@chakra-ui/react'
import { useState } from 'react'

export function EditColorNameModal({
  isOpen,
  onClose,
  initialColorName,
  onUpdateColorName,
}: {
  isOpen: boolean
  onClose: () => void
  initialColorName: string
  onUpdateColorName: (newName: string) => void
}) {
  const [colorName, setColorName] = useState<string>(initialColorName)

  const handleSave = () => {
    onUpdateColorName(colorName)
    onClose()
  }

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
            padding: '0px 32px 32px 32px',
          }}
        >
          <FormControl>
            <FormLabel>Color Name</FormLabel>
            <Tooltip placement="left" closeDelay={500} hasArrow label={"Note: Variable names don't necessarily need a hyphen."}>
            <Input
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
            </Tooltip>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
