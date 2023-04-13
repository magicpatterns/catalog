import {
  Box,
  Button,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TNamedToken } from '@core/types'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { HexPicker } from './ColorPicker'
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
  initialVariant?: TNamedToken
  onUpdateVariant: (newVariant: TNamedToken) => void
  onDeleteVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TNamedToken>(
    initialVariant ?? {
      name: '',
      token: { id: uuidv4(), value: '', type: 'color' },
    }
  )
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    // Save the submitted color value
    const oldColor = `${variant.token.value}`

    // Check for blank name
    if (!variant.name) {
      setError('Please enter a variant name.')
      return
    }

    // Check for blank / missing color
    if (!variant.token.value) {
      setError('Please enter a color.')
      return
    }

    // If color is invalid, handleInvalidColor will reassign a value to the variant.color
    const newColor = handleInvalidColor(oldColor)
    // If there's a reassignment, they'll no longer match, so we can alert the user...
    if (newColor !== oldColor) {
      setError('This is not a valid color')
      return
    }
    // Remove error so it doesn't persist...
    setError(null)
    // catch any thrown errors on save
    try {
      onUpdateVariant(variant)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        return
      }
    }
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariant(
        initialVariant ?? {
          name: '',
          token: { id: uuidv4(), value: '', type: 'color' },
        }
      )
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
          >
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
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                  }}
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
                          bgColor={`${variant.token.value}`}
                          border={'1px solid black'}
                        />
                      </Box>
                    </FormLabel>
                    <Input
                      placeholder="e.g. #FFFFFF"
                      value={variant.token.value}
                      onChange={(e) =>
                        setVariant({
                          name: variant.name,
                          token: {
                            id: variant.token.id,
                            value: e.target.value.trim(),
                            type: 'color',
                          },
                        })
                      }
                    />
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
                  <HexPicker
                    onChange={(colorPickerColor) => {
                      setVariant({
                        name: variant.name,
                        token: {
                          id: variant.token.id,
                          value: colorPickerColor,
                          type: 'color',
                        },
                      })
                    }}
                    colorPickerColor={`${variant.token.value}`}
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
              <Button type="submit" css={{ marginRight: '12px' }}>
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
          </form>
        </ModalContent>
      </Modal>
      {onDeleteVariant && (
        <AlertDialogDelete
          tokenName={variant.name}
          isOpen={isAlertDialogOpen}
          onClose={onDeleteAlertDialogClose}
          onDelete={() => onDeleteVariant()}
        />
      )}
    </>
  )
}
