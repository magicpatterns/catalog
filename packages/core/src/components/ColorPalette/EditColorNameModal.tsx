import { InfoIcon } from '@chakra-ui/icons'
import {
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
  Tooltip,
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
            <Flex>
              <FormLabel>Color Name</FormLabel>
              <Tooltip
                placement="right"
                closeDelay={500}
                hasArrow
                label={"Variable names don't need a hyphen."}
              >
                <InfoIcon css={{ marginTop: '5px', marginLeft: '-6px' }} />
              </Tooltip>
            </Flex>
            <Input
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
