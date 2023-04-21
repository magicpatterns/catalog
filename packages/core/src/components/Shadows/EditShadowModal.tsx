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
import { sep } from 'path'
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
  initialRgbaValue,
  initialValues,
  tokenName,
  tokenValue,
}: {
  isOpen: boolean
  onClose: () => void
  initialShadowVariant?: TNamedToken
  onUpdateShadowVariant: (newVariant: TNamedToken) => void
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

  //console.log(shadowData)

  // New code for multiple shadows
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

  const x_initialRgbaValue = shadowObjects.map((shadowObject) => {
    return getRgba(shadowObject.value)
  })

  const x_initialValues = shadowObjects.map((shadowObject) => {
    return getValues(shadowObject.value)
  })

  /*
  We need to get the data and than separate the box shadows
  and than get the rgba values and than get the values




  */

  // const shadowObjects = separateBoxShadows(
  //   shadowData.token.value,
  //   shadowData.name
  // )
  // const initialRgbaValue = shadowObjects.map((shadowObject) => {
  //   return getRgba(shadowObject.value)
  // })

  // const initialValues = shadowObjects.map((shadowObject) => {
  //   return getValues(shadowObject.value)
  // })

  // New code for multiple shadows ^^^

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

    if (variant.token.value === '' || !variant.token.value) {
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

  function newCodeResult() {
    const result = []
    for (let i = 0; i < newInitialValues?.length; i++) {
      result.push(
        ` ${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
      )
    }
    return result.toString()
  }

  console.log(newCodeResult())

  const codeResult = function () {
    if (x_initialValues) {
      const result = []
      for (let i = 0; i < x_initialValues?.length; i++) {
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
  //console.log(isNaN(blur[0]))

  function handleInputValue(e) {
    const x = separateBoxShadows(e.target.value, 'shadow')
    const y = getValues(x[initialButton].value)

    console.log(y)

    const nextBlur = [...blur]
    console.log(nextBlur)
    nextBlur[initialButton] = isNaN(y.blur) ? 0 : y.blur
    setBlur(nextBlur)

    const nextSpread = [...spread]
    nextSpread[initialButton] = isNaN(y.spread) ? 0 : y.spread
    setSpread(nextSpread)
    setShadowInput(e.target.value)

    const nextHOffset = [...hOffset]
    nextHOffset[initialButton] = isNaN(y.hOffset) ? 0 : y.hOffset
    sethOffset(nextHOffset)

    const nextVOffset = [...vOffset]
    nextVOffset[initialButton] = isNaN(y.vOffset) ? 0 : y.vOffset
    setVOffset(nextVOffset)
  }

  const [shadowInput, setShadowInput] = useState(codeResult())

  useEffect(() => {
    setShadowInput(codeResult())

    setVariant({ ...variant, token: { ...variant.token, value: codeResult() } })
  }, [spread, blur, hOffset, vOffset, color])

  useEffect(() => {
    return setVariant({
      ...variant,
      token: { ...variant.token, value: shadowInput },
    })
  }, [shadowInput])

  useEffect(() => {
    return setVariant({
      ...variant,
      token: { ...variant.token, value: newColorRes },
    })
  }, [newColorRes])

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
                {/* <Input
                  onChange={(e) => setShadowInput(e.target.value)}
                  value={shadowInput}
                /> */}
                {newInitialValues?.map((_i: number, index: number) => (
                  <div key={index}>
                    {initialButton === index && (
                      <Input onChange={handleInputValue} value={shadowInput} />
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
