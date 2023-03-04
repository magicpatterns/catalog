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
import { useState, useEffect } from 'react'
import { TColorVariant } from 'types'
import { handleInvalidColor } from './utils'

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
    onAddVariant(variant)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariant({ name: '', color: '', isBase: false })
    }
  }, [isOpen])

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
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
