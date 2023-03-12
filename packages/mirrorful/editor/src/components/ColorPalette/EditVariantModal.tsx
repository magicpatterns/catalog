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
import tinycolor from 'tinycolor2'
import { TColorVariant } from 'types'
import { ColorPicker } from './ColorPicker'
import { handleInvalidColor } from './utils'
import { AlertDialogDelete } from 'components/AlertDialogDelete'
import { useDisclosure } from '@chakra-ui/react'

export function EditVariantModal({
  isOpen,
  onClose,
  initialVariant,
  onUpdateVariant,
  onDeleteVariant,
}: {
  isOpen: boolean
  onClose: () => void
  initialVariant?: TColorVariant
  onUpdateVariant: (newVariant: TColorVariant) => void
  onDeleteVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TColorVariant>(
    initialVariant ?? { name: '', color: '', isBase: false }
  )
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    // Save the submitted color value
    const oldColor: string = variant.color

    // Check for blank name
    if (!variant.name) {
      setError('Please enter a variant name.')
      return
    }

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

  useEffect(() => {
    if (!isOpen) {
      setVariant(initialVariant ?? { name: '', color: '', isBase: false })
      setError(null)
    }
  }, [isOpen, initialVariant])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {initialVariant ? 'Edit Variant' : 'Add Variant'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            css={{
              padding: '0px 32px 32px 32px',
            }}
          >
            <Box
              css={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                css={{ display: 'flex', flexDirection: 'column', width: '50%' }}
              >
                <FormControl>
                  <FormLabel>Variant Name</FormLabel>
                  <Input
                    placeholder="e.g. Blue"
                    value={variant.name}
                    onChange={(e) =>
                      setVariant({ ...variant, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl css={{ marginTop: '32px' }}>
                  <FormLabel>
                    <Box css={{ display: 'flex', alignItems: 'center' }}>
                      Variant Color{' '}
                      <Box
                        css={{
                          height: '14px',
                          width: '14px',
                          marginLeft: '8px',
                        }}
                        bgColor={variant.color}
                        border={'1px solid black'}
                      />
                    </Box>
                  </FormLabel>
                  <Input
                    placeholder="e.g. #FFFFFF"
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
              <Box
                css={{
                  width: '40%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ColorPicker
                  onChange={(colorPickerColor, event) => {
                    setVariant({ ...variant, color: colorPickerColor.hex })
                  }}
                  colorPickerColor={variant.color}
                  presetColors={[]}
                />
              </Box>
            </Box>
            {error && (
              <Text
                css={{ alignSelf: 'flex-start', marginTop: '32px' }}
                color="red.400"
                fontWeight="medium"
              >
                {error}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSave}
              css={{ marginRight: '12px' }}
              colorScheme="green"
            >
              Save
            </Button>
            {onDeleteVariant && (
              <Button
                onClick={() => onDeleteAlertDialogOpen()}
                colorScheme="red"
              >
                Delete
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {onDeleteVariant && (
        <AlertDialogDelete
          isOpen={isAlertDialogOpen}
          onClose={onDeleteAlertDialogClose}
          onDelete={() => onDeleteVariant()}
        />
      )}
    </>
  )
}
