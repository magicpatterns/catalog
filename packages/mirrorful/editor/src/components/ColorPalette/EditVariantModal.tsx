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
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { TColorVariant } from 'types'
import { handleInvalidColor } from './utils'

export function EditVariantModal({
  isOpen,
  onClose,
  initialVariant,
  onUpdateVariant,
  onDeleteVariant,
}: {
  isOpen: boolean
  onClose: () => void
  initialVariant: TColorVariant
  onUpdateVariant: (newVariant: TColorVariant) => void
  onDeleteVariant: () => void
}) {
  const [variant, setVariant] = useState<TColorVariant>(initialVariant)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    // Save the submitted color value
    const oldColor: string = variant.color

    // Check for blank / missing color
    if (!variant.color) {
      setError('Please enter a color.')
      return
    }

    // If color is invalid, handleInvalidColor will reassign a value to the variant.color
    variant.color = handleInvalidColor(variant.color)
    // If there's a reassignment, they'll no longer match, so we can alert the user...
    if (variant.color !== oldColor) {
      setError('This is not a valid color')
      variant.color = oldColor
      return
    }
    // Remove error so it doesn't persist...
    setError(null)
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
                errorBorderColor="red.400"
                isInvalid={!!error}
              />
              {error && (
                <Text
                  css={{ alignSelf: 'flex-start', marginTop: '8px' }}
                  color="red.400"
                  fontWeight="medium"
                >
                  {error}
                </Text>
              )}
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
          <Button
            onClick={handleSave}
            css={{ marginRight: '12px' }}
            colorScheme="green"
          >
            Save
          </Button>
          <Button onClick={onDeleteVariant} colorScheme="red">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
