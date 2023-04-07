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
  Select,
  Text,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TLineHeightVariant } from '@core/types'
import { useEffect, useState } from 'react'

import { fontUnits, lineHeightUnits } from '../TypographyConstants'

export function EditLineHeightModal({
  isOpen,
  isAdding,
  onClose,
  initialLineHeightVariant,
  onUpdateLineHeightVariant,
  onDeleteLineHeightVariant,
}: {
  isOpen: boolean
  isAdding: boolean
  onClose: () => void
  initialLineHeightVariant?: TLineHeightVariant
  onUpdateLineHeightVariant: (newVariant: TLineHeightVariant) => void
  onDeleteLineHeightVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TLineHeightVariant>(
    initialLineHeightVariant ?? {
      name: '',
      value: 1.2,
      unit: 'number',
      lengthUnit: 'rem',
    }
  )

  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    setError(null)
    if (variant.name === '') {
      setError('Please fill out all fields.')
      return
    }

    if (variant.value !== 0 && !variant.value) {
      setError('Please fill out all fields.')
      return
    }

    if (variant.value < 0) {
      setError('Minimum value of line height can be 0.')
      return
    }

    onUpdateLineHeightVariant(variant)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariant(
        initialLineHeightVariant ?? {
          name: '',
          value: 1.2,
          unit: 'number',
          lengthUnit: 'rem',
        }
      )
      setError(null)
    }
  }, [isOpen, initialLineHeightVariant])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isAdding ? 'Add' : 'Edit'} Line Height Variant
          </ModalHeader>
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
                <FormLabel>Variant Value</FormLabel>
                <Input
                  value={variant.value}
                  onChange={(e) =>
                    setVariant({ ...variant, value: Number(e.target.value) })
                  }
                  type="number"
                />
              </FormControl>
              <FormControl css={{ marginTop: '32px' }}>
                <FormLabel>Variant Unit</FormLabel>
                <Select
                  value={variant.unit}
                  onChange={(event) => {
                    setVariant({
                      ...variant,
                      unit: event.target.value as
                        | 'number'
                        | 'length'
                        | 'percent',
                    })
                  }}
                >
                  {lineHeightUnits.map((unit, index) => {
                    return (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              {variant.unit === 'length' ? (
                <FormControl css={{ marginTop: '32px' }}>
                  <FormLabel>Length Unit</FormLabel>
                  <Select
                    value={variant.lengthUnit}
                    onChange={(event) => {
                      setVariant({
                        ...variant,
                        lengthUnit: event.target.value as 'px' | 'rem' | 'em',
                      })
                    }}
                  >
                    {fontUnits.map((unit, index) => {
                      return (
                        <option key={index} value={unit}>
                          {unit}
                        </option>
                      )
                    })}
                  </Select>
                </FormControl>
              ) : null}
            </Box>
            {error && (
              <Text color="red.500" css={{ marginTop: 18 }}>
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
              Save Variant
            </Button>
            {onDeleteLineHeightVariant && (
              <>
                <Button
                  onClick={() => onDeleteAlertDialogOpen()}
                  colorScheme="red"
                >
                  Delete Variant
                </Button>
                <AlertDialogDelete
                  tokenName={variant.name}
                  isOpen={isAlertDialogOpen}
                  onClose={onDeleteAlertDialogClose}
                  onDelete={() => onDeleteLineHeightVariant()}
                />
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
