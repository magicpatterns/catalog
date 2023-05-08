import {
  Box,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { TNamedToken, TTokenGroup } from '@core/types'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { nameThatColor } from '../Onboarding/utils'
import ColorPicker from './ColorPicker'
import { defaultColorShadesToTokens, generateDefaultColorShades } from './utils'
import { VariantRow } from './VariantRow'
import tinycolor from 'tinycolor2'

export function EditBaseColorModal({
  isOpen,
  onClose,
  baseColorToken,
  onUpdateBaseColor,
  colorName,
}: {
  isOpen: boolean
  onClose: () => void
  baseColorToken: TNamedToken
  colorName: string
  onUpdateBaseColor: (newTokenGroup: TTokenGroup, newName: string) => void
}) {
  const [variant, setVariant] = useState<TNamedToken>(baseColorToken)
  const [error, setError] = useState<string | null>(null)
  const [newColorName, setNewColorName] = useState<string>(colorName)

  // Right now, we don't let the user choose, but could down the road
  // const [shouldGenerateVariants, setShouldGenerateVariants] = useState(true)

  const handleSave = () => {
    // Check for blank / missing color
    if (!variant.token.value) {
      setError('Please enter a color.')
      return
    }

    // Remove error so it doesn't persist...
    setError(null)

    let additionalVariants: TTokenGroup = {}
    additionalVariants = defaultColorShadesToTokens(
      generateDefaultColorShades(variant.token.value)
    )

    try {
      const colorTokenGroup: TTokenGroup = {
        DEFAULT: {
          id: uuidv4(),
          value: variant.token.value,
          type: 'color',
        },
        ...additionalVariants,
      }
      onUpdateBaseColor(colorTokenGroup, newColorName)
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
      setNewColorName(colorName)
      setVariant(baseColorToken)
      setError(null)
    }
  }, [isOpen, baseColorToken, colorName])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Edit Base Color: ${newColorName}`}</ModalHeader>
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
                      const name = nameThatColor(
                        tinycolor(colorPickerColor).toHsl()
                      )
                      setNewColorName(name)

                      // TODO(Danilowicz): we should spread here, or there's going to be a big fat bug
                      setVariant({
                        name: variant.name,
                        token: {
                          id: variant.token.id,
                          value: tinycolor(colorPickerColor).toHex(),
                          type: 'color',
                        },
                      })
                    }}
                    colorPickerColor={`${variant.token.value}`}
                  />
                  <Box style={{ width: '100%' }}>
                    <VariantRow
                      defaultNamedToken={baseColorToken}
                      variant={variant}
                      onUpdateVariant={() => console.log('not needed')}
                      hideIcons
                    />
                  </Box>
                  <FormControl
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* <Checkbox
                      checked={shouldGenerateVariants}
                      onChange={() =>
                        setShouldGenerateVariants((prev) => !prev)
                      }
                      defaultChecked={shouldGenerateVariants}
                    >
                      Automatically generate new shades
                    </Checkbox> */}
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
    </>
  )
}
