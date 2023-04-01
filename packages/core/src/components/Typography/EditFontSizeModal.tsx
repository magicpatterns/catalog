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
import { TFontSizeVariant } from '@core/types'
import { useEffect, useState } from 'react'

import { fontUnits, fontWeights } from './TypographyConstants'

export function EditFontSizeModal({
  isOpen,
  isAdding,
  onClose,
  initialFontSizeVariant,
  onUpdateFontSizeVariant,
  onDeleteFontSizeVariant,
}: {
  isOpen: boolean
  isAdding: boolean
  onClose: () => void
  initialFontSizeVariant?: TFontSizeVariant
  onUpdateFontSizeVariant: (newVariant: TFontSizeVariant) => void
  onDeleteFontSizeVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TFontSizeVariant>(
    initialFontSizeVariant ?? {
      name: '',
      value: 1,
      unit: 'rem',
      fontWeight: 400,
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

    onUpdateFontSizeVariant(variant)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariant(
        initialFontSizeVariant ?? {
          name: '',
          value: 1,
          unit: 'rem',
          fontWeight: 400,
        }
      )
      setError(null)
    }
  }, [isOpen, initialFontSizeVariant])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isAdding ? 'Add' : 'Edit'} Font Size Variant
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
                      unit: event.target.value as 'px' | 'rem' | 'em',
                    })
                  }}
                >
                  {fontUnits.map((unit) => {
                    return (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
              <FormControl css={{ marginTop: '32px' }}>
                <FormLabel>Font Weight</FormLabel>
                <Select
                  value={variant.fontWeight}
                  onChange={(event) => {
                    setVariant({
                      ...variant,
                      fontWeight: Number(event.target.value),
                    })
                  }}
                >
                  {fontWeights.map((weight) => {
                    return (
                      <option key={weight.value} value={weight.value}>
                        {weight.name}
                      </option>
                    )
                  })}
                </Select>
              </FormControl>
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
            {onDeleteFontSizeVariant && (
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
                  onDelete={() => onDeleteFontSizeVariant()}
                />
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
