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
  Checkbox,
} from '@chakra-ui/react'
import { useState } from 'react'
import { TColorVariant } from 'types'

export function AddVariantModal({
  isOpen,
  onClose,
  onAddVariant,
}: {
  isOpen: boolean
  onClose: () => void
  onAddVariant: (newVariant: TColorVariant) => void
}) {
  const [variant, setVariant] = useState<TColorVariant>({
    name: '',
    color: '',
    isBase: false,
  })

  const handleSave = () => {
    onAddVariant(variant)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Variant</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          css={{
            padding: '0px 32px 32px 32px',
          }}
        >
          <Box css={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl>
              <FormLabel>Variant Name</FormLabel>
              <Input
                value={variant.name}
                onChange={(e) =>
                  setVariant({ ...variant, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl css={{ marginTop: '32px' }}>
              <FormLabel>Variant Color</FormLabel>
              <Input
                value={variant.color}
                onChange={(e) =>
                  setVariant({ ...variant, color: e.target.value })
                }
              />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
