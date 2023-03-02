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

export function EditVariantModal({
  isOpen,
  onClose,
  initialVariant,
  onUpdateVariant,
}: {
  isOpen: boolean
  onClose: () => void
  initialVariant: TColorVariant
  onUpdateVariant: (newVariant: TColorVariant) => void
}) {
  const [variant, setVariant] = useState<TColorVariant>(initialVariant)

  const handleSave = () => {
    onUpdateVariant(variant)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Variant</ModalHeader>
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
            <FormControl css={{ marginTop: '32px' }}>
              <Checkbox
                checked={variant.isBase}
                onChange={(event) => {
                  setVariant({ ...variant, isBase: event.target.checked })
                }}
                defaultChecked={variant.isBase}
              >
                Set as Base (i.e. default) variant for this color
              </Checkbox>
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
