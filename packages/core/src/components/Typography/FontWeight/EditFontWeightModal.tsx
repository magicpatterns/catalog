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
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TFontWeightVariant } from '@core/types'
import { useEffect, useState } from 'react'

export function EditFontWeightModal({
  isOpen,
  isAdding,
  onClose,
  initialFontWeightVariant,
  onUpdateFontWeightVariant,
  onDeleteFontWeightVariant,
}: {
  isOpen: boolean
  isAdding: boolean
  onClose: () => void
  initialFontWeightVariant?: TFontWeightVariant
  onUpdateFontWeightVariant: (newVariant: TFontWeightVariant) => void
  onDeleteFontWeightVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TFontWeightVariant>(
    initialFontWeightVariant ?? {
      name: '',
      weight: 400,
    }
  )

  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    setError(null)
    if (variant.name === '') {
      setError('Please fill out all fields.')
      return
    }

    if (variant.weight !== 0 && !variant.weight) {
      setError('Please fill out all fields.')
      return
    }

    if (variant.weight < 1 || variant.weight > 1000) {
      setError('Font weight must be between 1 and 1000.')
      return
    }

    onUpdateFontWeightVariant(variant)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariant(
        initialFontWeightVariant ?? {
          name: '',
          weight: 400,
        }
      )
      setError(null)
    }
  }, [isOpen, initialFontWeightVariant])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isAdding ? 'Add' : 'Edit'} Font Weight Variant
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
                <FormLabel>Variant Weight</FormLabel>
                <Input
                  value={variant.weight}
                  onChange={(e) =>
                    setVariant({ ...variant, weight: Number(e.target.value) })
                  }
                  type="number"
                />
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
            {onDeleteFontWeightVariant && (
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
                  onDelete={() => onDeleteFontWeightVariant()}
                />
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
