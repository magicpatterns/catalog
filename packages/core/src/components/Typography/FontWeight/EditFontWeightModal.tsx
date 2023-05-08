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
import { TNamedToken } from '@core/types'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
  initialFontWeightVariant?: TNamedToken
  onUpdateFontWeightVariant: (newVariant: TNamedToken) => void
  onDeleteFontWeightVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TNamedToken>(
    initialFontWeightVariant ?? {
      name: '',
      token: {
        id: uuidv4(),
        value: '',
        type: 'fontWeight',
      },
    }
  )

  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    setError(null)
    if (variant.name === '') {
      setError('Please fill out all fields.')
      return
    }

    if (isNaN(Number(variant.token.value))) {
      setError('Please enter a valid number.')
      return
    }

    if (Number(variant.token.value) !== 0 && !Number(variant.token.value)) {
      setError('Please fill out all fields.')
      return
    }

    if (Number(variant.token.value) < 1 || Number(variant.token.value) > 1000) {
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
          token: {
            id: uuidv4(),
            value: '',
            type: 'fontWeight',
          },
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
                  value={variant.token.value}
                  onChange={(e) =>
                    setVariant({
                      name: variant.name,
                      token: { ...variant.token, value: e.target.value },
                    })
                  }
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
            <Button onClick={handleSave} css={{ marginLeft: '12px' }}>
              Save Variant
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
