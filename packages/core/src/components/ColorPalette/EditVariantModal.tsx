import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TNamedToken, TTokenGroup } from '@core/types'
import { useEffect, useState } from 'react'

import { ColorPicker } from './ColorPicker'
import { defaultColorShadesToTokens, generateDefaultColorShades } from './utils'
import { VariantRow } from './VariantRow'

export function EditVariantModal({
  isOpen,
  onClose,
  color,
  onUpdateVariant,
  onDeleteVariant,
}: {
  isOpen: boolean
  onClose: () => void
  color: TNamedToken
  onUpdateVariant: (newVariant: TNamedToken) => void
  onDeleteVariant?: () => void
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
  } = useDisclosure()

  const [variant, setVariant] = useState<TNamedToken>(color)
  const [error, setError] = useState<string | null>(null)
  const [shouldGenerateVariants, setShouldGenerateVariants] = useState(true)

  const handleSave = () => {
    // Check for blank / missing color
    if (!variant.token.value) {
      setError('Please enter a color.')
      return
    }

    // Remove error so it doesn't persist...
    setError(null)

    // TODO(Danilowicz): need to add new variants to the colordata
    let additionalVariants: TTokenGroup = {}
    if (shouldGenerateVariants) {
      additionalVariants = defaultColorShadesToTokens(
        generateDefaultColorShades(variant.token.value)
      )
    }

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
      setVariant(color)
      setError(null)
    }
  }, [isOpen, color])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{color ? `Edit Base Color` : 'Add Variant'}</ModalHeader>
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
                    gap: 16,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <ColorPicker
                    onChange={(colorPickerColor) => {
                      // TODO(Danilowicz): we should spread here, or there's going to be a big fat bug
                      setVariant({
                        name: variant.name,
                        token: {
                          id: variant.token.id,
                          value: colorPickerColor.hex,
                          type: 'color',
                          metadata: variant.token.metadata,
                        },
                      })
                    }}
                    colorPickerColor={`${variant.token.value}`}
                    presetColors={[]}
                  />
                  <Box style={{ width: '100%' }}>
                    <VariantRow
                      variant={variant}
                      onUpdateVariant={() => alert('todo')}
                      hideIcons
                    />
                  </Box>
                  <FormControl
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Checkbox
                      checked={shouldGenerateVariants}
                      onChange={() =>
                        setShouldGenerateVariants((prev) => !prev)
                      }
                      defaultChecked={shouldGenerateVariants}
                    >
                      Automatically generate new shades
                    </Checkbox>
                    <Button type="submit">Save</Button>
                  </FormControl>
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
