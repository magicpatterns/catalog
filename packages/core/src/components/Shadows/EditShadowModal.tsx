/* eslint-disable @typescript-eslint/ban-types */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
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
import { useEffect, useState } from 'react'
import { FiLayers, FiPlus } from 'react-icons/fi'

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
  initialRgbaValue?: [{ r: number; g: number; b: number; a: number }] | any
  initialValues?:
    | [
        {
          hOffset: number
          vOffset: number
          blur: number
          spread: number
          color: string
        }
      ]
    | any
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

  function newColors() {
    const newColorResult = []
    for (let i = 0; i < initialValues?.length; i++) {
      newColorResult.push(
        `rgba(${initialRgbaValue[i].r}, ${initialRgbaValue[i].g}, ${initialRgbaValue[i].b}, ${initialRgbaValue[i].a})`
      )
    }
    return newColorResult
  }

  const presetColor = newColors()

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

  const [newInitialValues, setNewInitialValues] = useState(
    initialValues
      ? initialValues
      : [
          {
            hOffset: 0,
            vOffset: 0,
            blur: 0,
            spread: 0,
            color: 'rgba(1, 1, 1, 0.4)',
          },
        ]
  )

  const [color, setColor] = useState(
    presetColor[0] ? presetColor?.map((i: string) => i) : ['rgba(1, 1, 1, 0.4)']
  )
  const [hOffset, sethOffset] = useState(
    newInitialValues
      ? newInitialValues?.map((i: { hOffset: number }) => i.hOffset)
      : [0]
  )
  const [vOffset, setVOffset] = useState(
    initialValues
      ? initialValues?.map((i: { vOffset: number }) => i.vOffset)
      : [0]
  )
  const [blur, setBlur] = useState(
    initialValues ? initialValues?.map((i: { blur: number }) => i.blur) : [0]
  )
  const [spread, setSpread] = useState(
    initialValues
      ? initialValues?.map((i: { spread: number }) => i.spread)
      : [0]
  )
  const [initialButton, setInitialButton] = useState(0)

  function newColor() {
    const result = []
    for (let i = 0; i < newInitialValues?.length; i++) {
      result.push(
        `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
      )
    }
    return result.toString()
  }

  const newColorRes = newColor()

  function handleBlur(e: string | number, i: number) {
    const nextBlur = [...blur]
    nextBlur[i] = e
    setBlur(nextBlur)
  }

  function handleSpread(e: string | number, i: number) {
    const nextSpread = [...spread]
    nextSpread[i] = e
    setSpread(nextSpread)
  }

  function handleHOffset(e: string | number, i: number) {
    const nextHOffset = [...hOffset]
    nextHOffset[i] = e
    sethOffset(nextHOffset)
  }

  function handleVOffset(e: string | number, i: number) {
    const nextVOffset = [...vOffset]
    nextVOffset[i] = e
    setVOffset(nextVOffset)
  }

  const handleNewColor = (
    value: { r: number; g: number; b: number; a?: number },
    i: number
  ) => {
    if (!color) {
      setColor(['rgba(1, 1, 1, 0.4)'])
    } else {
      const nextColor = [...color]
      nextColor[i] = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`

      setColor(nextColor)
    }
  }

  const codeResult = function () {
    if (newInitialValues) {
      const result = []
      for (let i = 0; i < newInitialValues?.length; i++) {
        result.push(
          ` ${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
        )
      }
      return result.toString()
    }
    return `${hOffset ? hOffset : '0'}px ${vOffset ? vOffset : '0'}px ${
      blur ? blur : '0'
    }px ${spread ? spread : '0'}px ${
      color[0] ? color[0] : 'rgba(1, 1, 1, 0.4)'
    }`
  }

  const [shadowInput, setShadowInput] = useState(codeResult())

  useEffect(() => {
    setShadowInput(codeResult())
  }, [spread, blur, hOffset, vOffset, color])

  useEffect(() => {
    setVariant({
      ...variant,
      value: shadowInput,
    })
  }, [shadowInput])

  useEffect(() => {
    setVariant({
      ...variant,
      value: newColorRes,
    })
  }, [newColorRes])

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
            <Box
              css={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormControl>
                <FormLabel css={{ fontSize: '0.75rem' }}>
                  Variant name
                </FormLabel>
                <Input
                  value={variant.name}
                  onChange={(e) => {
                    setVariant({
                      ...variant,
                      name: e.target.value,
                    })
                  }}
                />
              </FormControl>

              <Box
                css={{
                  display: 'flex',
                  marginTop: '1rem',
                  flexWrap: 'wrap',
                  margin: '0 auto',
                  width: '510px',
                }}
              >
                {newInitialValues?.map((_i: number, index: number) => (
                  <Button
                    key={index}
                    style={{
                      color: index === initialButton ? 'black' : 'gray',
                      width: '65px',
                      margin: '10px',
                    }}
                    onClick={() => setInitialButton(index)}
                  >
                    <Icon as={FiLayers} />
                  </Button>
                ))}

                <Button
                  style={{
                    width: '65px',
                    margin: '10px',
                    color: 'gray',
                  }}
                  onClick={() => {
                    sethOffset([...hOffset, 0])
                    setVOffset([...vOffset, 0])
                    setBlur([...blur, 0])
                    setSpread([...spread, 0])
                    const nextShadow = [...newInitialValues]
                    nextShadow.push('0px 0px 0px 0px')
                    const nextColor = [...color]
                    nextColor.push('rgba(0, 0, 0, 0.25)')
                    setNewInitialValues(nextShadow)
                    setColor(nextColor)
                    setInitialButton(newInitialValues.length)
                  }}
                >
                  <Icon as={FiPlus} />
                </Button>
              </Box>
              <FormControl>
                <Box>
                  {newInitialValues?.map((_i: number, index: number) => (
                    <div key={index}>
                      <div>
                        {initialButton === index && (
                          <ShadowColorPicker
                            blur={blur[index]}
                            spread={spread[index]}
                            hOffset={hOffset[index]}
                            vOffset={vOffset[index]}
                            setBlur={setBlur}
                            setSpread={setSpread}
                            sethOffset={sethOffset}
                            setVOffset={setVOffset}
                            codeResult={shadowInput}
                            handleNewColor={handleNewColor}
                            handleBlur={handleBlur}
                            handleSpread={handleSpread}
                            handleHOffset={handleHOffset}
                            handleVOffset={handleVOffset}
                            color={color[index]}
                            setColor={setColor}
                            initialButton={initialButton}
                            index={index}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </Box>
              </FormControl>

              <Box
                css={{
                  marginTop: '1em',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Text style={{ marginBottom: '.5em' }}>Value</Text>
                <Input
                  onChange={(e) => setShadowInput(e.target.value)}
                  value={shadowInput}
                />
              </Box>
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
