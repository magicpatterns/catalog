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
import { TShadowData } from '@core/types'
import { useEffect, useState } from 'react'

import { ColorPicker } from './ColorPicker'

export function EditShadowModal({
  isOpen,
  onClose,
  initialShadowVariant,
  onUpdateShadowVariant,
  onDeleteShadowVariant,
  initialRgbaValue,
  initialValues,
}: {
  isOpen: boolean
  onClose: () => void
  initialShadowVariant?: TShadowData
  onUpdateShadowVariant: (newVariant: TShadowData) => void
  onDeleteShadowVariant?: () => void
  initialRgbaValue?: { r: number; g: number; b: number; a: number }
  initialValues?:
    | {
        hOffset: number
        vOffset: number
        blur: number
        spread: number
      }
    | undefined
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant]: [
    TShadowData,
    React.Dispatch<React.SetStateAction<TShadowData>>
  ] = useState<TShadowData>(initialShadowVariant ?? { name: '', value: '' })

  const [error, setError] = useState<string | null>(null)

  const presetColor = initialRgbaValue
    ? // eslint-disable-next-line react/prop-types
      `rgba(${initialRgbaValue?.r}, ${initialRgbaValue?.g}, ${initialRgbaValue?.b}, ${initialRgbaValue?.a})`
    : 'rgba(1, 1, 1, 0.4)'

  const handleSave = () => {
    setError(null)
    if (variant.name === '') {
      setError('Please fill out all fields.')
      return
    }

    if (variant.value === '' || !variant.value) {
      setError('Please fill out all fields.')
      return
    }

    onUpdateShadowVariant(variant)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      setVariant(initialShadowVariant ?? { name: '', value: '' })
      setError(null)
    }
  }, [isOpen, initialShadowVariant])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {initialShadowVariant ? 'Edit' : 'Add'} Shadow Variant
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
                    setVariant({ ...variant, value: e.target.value })
                  }
                />
              </FormControl>
              <ColorPicker
                variant={variant}
                setVariant={setVariant}
                presetColor={presetColor}
                initialValues={initialValues}
              />

              <Box
                css={{
                  marginTop: '16px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              ></Box>
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
              colorScheme="blue"
            >
              Save
            </Button>
            {onDeleteShadowVariant && (
              <>
                <Button
                  onClick={() => onDeleteAlertDialogOpen()}
                  colorScheme="red"
                >
                  Delete
                </Button>
                <AlertDialogDelete
                  tokenName={variant.name}
                  isOpen={isAlertDialogOpen}
                  onClose={onDeleteAlertDialogClose}
                  onDelete={() => onDeleteShadowVariant()}
                />
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
