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
import { TNamedToken } from '@core/types'
import { useEffect, useState } from 'react'
import { FiLayers, FiPlus } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

import { ShadowColorPicker } from './ShadowColorPicker'

export function EditShadowModal({
  isOpen,
  onClose,
  initialShadowVariant,
  onUpdateShadowVariant,
  onDeleteShadowVariant,
}: {
  isOpen: boolean
  onClose: () => void
  initialShadowVariant?: TNamedToken
  onUpdateShadowVariant: (newVariant: TNamedToken) => void
  onDeleteShadowVariant?: () => void
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
  const [nameError, setNameError] = useState<boolean>(false)

  function separateBoxShadows(input: string | [], name: string) {
    const result = []
    let current = ''
    let parenCount = 0

    for (let i = 0; i < input.length; i++) {
      const char = input[i]

      if (char === ',' && parenCount === 0) {
        result.push({ name: name, value: current.trim() })
        current = ''
      } else {
        current += char

        if (char === '(') {
          parenCount++
        } else if (char === ')') {
          parenCount--
        }
      }
    }

    result.push({ name: name, value: current.trim() })

    return result
  }

  function getValues(str: string) {
    const regex = /^(.+?)\s*rgba/
    const match = regex.exec(str)

    if (match) {
      const values = match[1].split(' ')
      const parsedValues = values.map((val) => parseInt(val))

      return {
        hOffset: parsedValues[0],
        vOffset: parsedValues[1],
        blur: parsedValues[2],
        spread: parsedValues[3],
      }
    }
    return { hOffset: 0, vOffset: 0, blur: 0, spread: 0 } // Return if no match is found
  }

  function getRgba(str: string) {
    const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
    const match = str.match(rgbaRegex)
    if (match) {
      const [, r, g, b, a] = match
      return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) }
    }
    return { r: 0, g: 0, b: 0, a: 0.5 } // Return if no match is found
  }

  const shadowObjects = separateBoxShadows(variant.token.value, variant.name)

  const initialRgbaValues = shadowObjects.map((shadowObject) => {
    return getRgba(shadowObject.value)
  })

  const initialValues = shadowObjects.map((shadowObject) => {
    return getValues(shadowObject.value)
  })

  const presetColor = initialRgbaValues.map((i) => {
    return `rgba(${i.r}, ${i.g}, ${i.b}, ${i.a})`
  })

  const [newInitialValues, setNewInitialValues] = useState<any>(
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
    initialValues
      ? initialValues?.map((i: { hOffset: number }) => i.hOffset)
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
  const [shadowIndex, setShadowIndex] = useState(0)

  const [shadowInputValidation, setShadowInputValidation] = useState(true)

  const [codeResult, setCodeResult] = useState<string[]>(initialCodeResult())

  function initialCodeResult() {
    const result = []
    for (let i = 0; i < initialValues?.length; i++) {
      result.push(
        `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
      )
    }
    return result
  }

  function handleBlur(e: number, i: number) {
    const nextBlur = [...blur]
    nextBlur[i] = e
    setBlur(nextBlur)

    const nextCodeRes = [...codeResult]
    nextCodeRes[
      i
    ] = `${hOffset[i]}px ${vOffset[i]}px ${nextBlur[i]}px ${spread[i]}px ${color[i]}`
    setCodeResult(nextCodeRes)
  }

  function handleSpread(e: number, i: number) {
    const nextSpread = [...spread]
    nextSpread[i] = e
    setSpread(nextSpread)

    const nextCodeRes = [...codeResult]
    nextCodeRes[
      i
    ] = `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${nextSpread[i]}px ${color[i]}`
    setCodeResult(nextCodeRes)
  }

  function handleHOffset(e: number, i: number) {
    const nextHOffset = [...hOffset]
    nextHOffset[i] = e
    sethOffset(nextHOffset)

    const nextCodeRes = [...codeResult]
    nextCodeRes[
      i
    ] = `${nextHOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
    setCodeResult(nextCodeRes)
  }

  function handleVOffset(e: number, i: number) {
    console.log(e)
    const nextVOffset = [...vOffset]
    nextVOffset[i] = e
    setVOffset(nextVOffset)

    const nextCodeRes = [...codeResult]
    nextCodeRes[
      i
    ] = `${hOffset[i]}px ${nextVOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
    setCodeResult(nextCodeRes)
  }

  const handleColor = (
    value: { r: number; g: number; b: number; a?: number },
    i: number
  ) => {
    const updatedColor = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`
    const nextColor = [...color]
    nextColor[i] = updatedColor
    setColor(nextColor)

    const nextCodeRes = [...codeResult]
    nextCodeRes[
      i
    ] = `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${updatedColor}`
    setCodeResult(nextCodeRes)
  }

  // Update values when input is changed
  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const x = separateBoxShadows(e.target.value, 'shadow')
    const y = getValues(x?.[0].value)
    const z = getRgba(x?.[0].value)

    const nextBlur = [...blur]

    nextBlur[shadowIndex] = y.blur
    setBlur(nextBlur)

    const nextSpread = [...spread]
    nextSpread[shadowIndex] = isNaN(y.spread) ? 0 : y.spread
    setSpread(nextSpread)

    const nextHOffset = [...hOffset]
    nextHOffset[shadowIndex] = isNaN(y.hOffset) ? 0 : y.hOffset
    sethOffset(nextHOffset)

    const nextVOffset = [...vOffset]
    nextVOffset[shadowIndex] = isNaN(y.vOffset) ? 0 : y.vOffset
    setVOffset(nextVOffset)

    const newColor = `rgba(${z?.r}, ${z?.g}, ${z?.b}, ${z?.a})`
    const nextColor = [...color]
    nextColor[shadowIndex] = newColor
    setColor(nextColor)

    const nextCodeRes = [...codeResult]
    nextCodeRes[shadowIndex] = e.target.value
    setCodeResult(nextCodeRes)
  }

  const handleSave = () => {
    setError(null)
    if (variant.name === '') {
      setNameError(true)
      setError('Please fill out all fields.')
      return
    }

    if (variant.token.value === '' || !variant.token.value) {
      setError('Please fill out all fields.')
      return
    }

    if (!shadowValidation()) {
      setShadowInputValidation(false)
      setError('Please fill out all fields.')
      return
    }
    onUpdateShadowVariant(variant)
    onClose()
  }

  console.log(nameError)
  //Input validation
  // useEffect(() => {
  //   const shadowRegex =
  //     /^(-?\d*\.?\d+(px)?\s){0,3}-?\d*\.?\d+(px)?\srgba\((\d{1,3},\s){2}\d{1,3},\s\d*\.?\d+\)$/

  //   if (
  //     codeResult?.[shadowIndex] &&
  //     codeResult?.[shadowIndex].match(shadowRegex)
  //   ) {
  //     setShadowInputValidation(true)
  //   } else {
  //     setShadowInputValidation(false)
  //   }
  // }, [spread, blur, hOffset, vOffset, color])

  function shadowValidation() {
    const shadowRegex =
      /^(-?\d*\.?\d+(px)?\s){0,3}-?\d*\.?\d+(px)?\srgba\((\d{1,3},\s){2}\d{1,3},\s\d*\.?\d+\)$/

    if (
      codeResult?.[shadowIndex] &&
      codeResult?.[shadowIndex].match(shadowRegex)
    ) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    return setVariant({
      ...variant,
      token: { ...variant.token, value: codeResult.toString() },
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
                {nameError && (
                  <Text color="red.500" css={{ marginTop: 18 }}>
                    {'nameError'}
                  </Text>
                )}
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
                      color: index === shadowIndex ? 'black' : 'gray',
                      width: '65px',
                      margin: '10px',
                    }}
                    onClick={() => setShadowIndex(index)}
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
                    setShadowIndex(newInitialValues.length)
                    const nextCodeRes = [...codeResult]
                    nextCodeRes.push('0px 0px 0px 0px rgba(0, 0, 0, 0.25)')
                    setCodeResult(nextCodeRes)
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
                        {shadowIndex === index && (
                          <ShadowColorPicker
                            blur={blur[index]}
                            spread={spread[index]}
                            hOffset={hOffset[index]}
                            vOffset={vOffset[index]}
                            setBlur={setBlur}
                            setSpread={setSpread}
                            sethOffset={sethOffset}
                            setVOffset={setVOffset}
                            handleColor={handleColor}
                            handleBlur={handleBlur}
                            handleSpread={handleSpread}
                            handleHOffset={handleHOffset}
                            handleVOffset={handleVOffset}
                            color={color[index]}
                            setColor={setColor}
                            shadowIndex={shadowIndex}
                            index={index}
                            codeResult={codeResult}
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
                <Text style={{ marginBottom: '.5em' }}>
                  Value{' '}
                  {shadowInputValidation ? (
                    ''
                  ) : (
                    <span style={{ color: 'red' }}>Invalid format</span>
                  )}
                </Text>

                {newInitialValues?.map((_i: number, index: number) => (
                  <div key={index}>
                    {shadowIndex === index && (
                      <Input
                        onChange={handleInputValue}
                        value={codeResult[shadowIndex]}
                      />
                    )}
                  </div>
                ))}
              </Box>
            </Box>
            {error && (
              <Text color="red.500" css={{ marginTop: 18 }}>
                {error}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
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
            <Button onClick={handleSave} css={{ marginLeft: '12px' }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
