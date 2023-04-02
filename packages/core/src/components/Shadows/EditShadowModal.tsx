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
import { TShadowData } from '@core/types'
import { RgbColor } from '@hello-pangea/color-picker'
import { useEffect, useMemo, useState } from 'react'

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

  const [color, setColor] = useState(presetColor)

  const [hOffset, sethOffset] = useState(initialValues?.hOffset ?? 0)
  const [vOffset, setVOffset] = useState(initialValues?.vOffset ?? 0)
  const [blur, setBlur] = useState(initialValues?.blur ?? 0)
  const [spread, setSpread] = useState(initialValues?.spread ?? 0)

  const codeResult = useMemo(() => {
    return `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`
  }, [hOffset, vOffset, blur, spread, color])

  const handleColor = (color: RgbColor) => {
    const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    setColor(rgba)
  }

  useEffect(() => {
    setVariant({
      ...variant,
      value: codeResult,
    })
  }, [codeResult])

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
                presetColor={presetColor}
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
