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
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TNamedToken } from '@core/types'
import { RgbColor } from '@hello-pangea/color-picker'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { darkTheme, lightTheme } from '../theme'
import { ShadowColorPicker } from './ShadowColorPicker'

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
  initialShadowVariant?: TNamedToken
  onUpdateShadowVariant: (newVariant: TNamedToken) => void
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
    TNamedToken,
    React.Dispatch<React.SetStateAction<TNamedToken>>
  ] = useState<TNamedToken>(
    initialShadowVariant ?? {
      name: '',
      token: {
        id: uuidv4(),
        value: '',
        type: 'boxShadow',
      },
    }
  )

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

    if (variant.token.value === '' || !variant.token.value) {
      setError('Please fill out all fields.')
      return
    }

    onUpdateShadowVariant(variant)
    onClose()
  }

  const [color, setColor] = useState(presetColor)
  const [inputColor, setInputColor] = useState(presetColor)
  const [hOffset, sethOffset] = useState(initialValues?.hOffset ?? 0)
  const [vOffset, setVOffset] = useState(initialValues?.vOffset ?? 0)
  const [blur, setBlur] = useState(initialValues?.blur ?? 0)
  const [spread, setSpread] = useState(initialValues?.spread ?? 0)

  const codeResult = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`

  const handleColor = (color: RgbColor) => {
    const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    setColor(rgba)
  }

  const formatColor = (input: string) => {
    if (
      /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0\.\d+|\d+(\.\d+)?))?\s*\)$/i.test(
        input
      )
    ) {
      const colors = input
        .split('rgba')[1]
        .replace('(', '')
        .replace(')', '')
        .split(',')
        .map((value) => Number(value))
      handleColor({
        r: colors[0],
        g: colors[1],
        b: colors[2],
        a: colors[3],
      })
      setError(null)
    } else {
      setError('Invalid color')
    }
    setInputColor(input)
  }

  useEffect(() => {
    setVariant({
      name: variant.name,
      token: {
        ...variant.token,
        value: codeResult,
      },
    })
  }, [codeResult])

  useEffect(() => {
    if (!isOpen) {
      setVariant(
        initialShadowVariant ?? {
          name: '',
          token: {
            id: uuidv4(),
            value: '',
            type: 'boxShadow',
          },
        }
      )
      setError(null)
    }
  }, [isOpen, initialShadowVariant])

  const backgroundColor = useColorModeValue(
    lightTheme.backgroundColors.secondary,
    darkTheme.backgroundColors.secondary
  )

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={backgroundColor}>
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
                <FormLabel css={{ fontSize: '0.75rem' }}>
                  Variant name
                </FormLabel>
                <Input
                  value={variant.name}
                  onChange={(e) =>
                    setVariant({ ...variant, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <Box css={{ display: 'flex', marginTop: '1rem' }}>
                  <Box css={{ width: '100%' }}>
                    <FormLabel css={{ fontSize: '0.75rem' }}>
                      Horizontal
                    </FormLabel>
                    <Input
                      value={hOffset}
                      onChange={(e) => sethOffset(Number(e.target.value))}
                    />
                  </Box>
                  <Box css={{ width: '100%' }}>
                    <FormLabel css={{ fontSize: '0.75rem' }}>
                      Vertical
                    </FormLabel>
                    <Input
                      value={vOffset}
                      onChange={(e) => setVOffset(Number(e.target.value))}
                    />
                  </Box>
                </Box>
                <Box css={{ display: 'flex', marginTop: '1rem' }}>
                  <Box css={{ width: '100%' }}>
                    <FormLabel css={{ fontSize: '0.75rem' }}>Blur</FormLabel>
                    <Input
                      value={blur}
                      onChange={(e) => setBlur(Number(e.target.value))}
                    />
                  </Box>
                  <Box css={{ width: '100%' }}>
                    <FormLabel css={{ fontSize: '0.75rem' }}>Spread</FormLabel>
                    <Input
                      value={spread}
                      onChange={(e) => setSpread(Number(e.target.value))}
                    />
                  </Box>
                </Box>
                <Box css={{ marginTop: '1rem' }}>
                  <FormLabel css={{ fontSize: '0.75rem' }}>RGBA</FormLabel>
                  <Input
                    value={inputColor}
                    onChange={(e) => formatColor(e.target.value)}
                  />
                </Box>
              </FormControl>
              <ShadowColorPicker
                blur={blur}
                spread={spread}
                hOffset={hOffset}
                vOffset={vOffset}
                setBlur={setBlur}
                setSpread={setSpread}
                sethOffset={sethOffset}
                setVOffset={setVOffset}
                codeResult={codeResult}
                handleColor={handleColor}
                color={color}
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
              colorScheme="green"
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
