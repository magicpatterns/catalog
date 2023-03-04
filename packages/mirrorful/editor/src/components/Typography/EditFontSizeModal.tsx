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
  Select,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TFontSizeVariant } from 'types'

export function EditFontSizeModal({
  isOpen,
  onClose,
  initialFontSizeVariant,
  onUpdateFontSizeVariant,
  onDeleteFontSizeVariant,
}: {
  isOpen: boolean
  onClose: () => void
  initialFontSizeVariant?: TFontSizeVariant
  onUpdateFontSizeVariant: (newVariant: TFontSizeVariant) => void
  onDeleteFontSizeVariant: () => void
}) {
  const [variant, setVariant] = useState<TFontSizeVariant>(
    initialFontSizeVariant ?? { name: '', value: 1, unit: 'rem' }
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
      setVariant({ name: '', value: 1, unit: 'rem' })
      setError(null)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Font Size Variant</ModalHeader>
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
                <option value="px">px</option>
                <option value="rem">rem</option>
                <option value="em">em</option>
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
          <Button onClick={onDeleteFontSizeVariant} colorScheme="red">
            Delete Variant
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
