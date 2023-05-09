import {
  Box,
  Button,
  CloseButton,
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
import { FiPlus } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'

import { ShadowColorPicker } from './ShadowColorPicker'
import { getRgba, getValues, separateBoxShadows } from './shadowUtils'

type ShadowValue =
  | {
      hOffset: number
      vOffset: number
      blur: number
      spread: number
      color?: string
    }
  | string

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

  const [variant, setVariant] = useState<TNamedToken>(
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

  const [newInitialValues, setNewInitialValues] = useState<ShadowValue[]>(
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

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
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
    setNameError(false)
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

  function shadowValidation() {
    const shadowRegex =
      /^(-?\d*\.?\d+(px)?\s){0,3}-?\d*\.?\d+(px)?\srgba\((\d{1,3},\s){2}\d{1,3},\s\d*\.?\d+\)$/

    return (
      codeResult?.[shadowIndex] && codeResult?.[shadowIndex].match(shadowRegex)
    )
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

  function handleDelete(indexToDelete: number) {
    return function (e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation()
      if (newInitialValues.length == 1) {
        return
      }

      const updatedInitialValues = newInitialValues.filter(
        (_, i) => i !== indexToDelete
      )
      const updatedColor = color.filter((_, i) => i !== indexToDelete)
      const updatedBlur = blur.filter((_, i) => i !== indexToDelete)
      const updatedVOffset = vOffset.filter((_, i) => i !== indexToDelete)
      const updatedHOffset = hOffset.filter((_, i) => i !== indexToDelete)
      const updatedSpread = spread.filter((_, i) => i !== indexToDelete)
      const updatedCodeResult = codeResult.filter((_, i) => i !== indexToDelete)
      setNewInitialValues(updatedInitialValues)
      setColor(updatedColor)
      sethOffset(updatedHOffset)
      setVOffset(updatedVOffset)
      setBlur(updatedBlur)
      setSpread(updatedSpread)
      setCodeResult(updatedCodeResult)
      setShadowIndex(indexToDelete - 1 > 0 ? indexToDelete - 1 : indexToDelete)
    }
  }

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
                <FormLabel>Variant Name</FormLabel>
                <Input
                  isInvalid={nameError ? true : false}
                  errorBorderColor="red.500"
                  value={variant.name}
                  onChange={(e) => {
                    setNameError(false)
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
                {newInitialValues?.map((_arg: ShadowValue, index: number) => (
                  <Button
                    key={index}
                    style={{
                      color: index === shadowIndex ? 'black' : 'gray',
                      width: '65px',
                      margin: '10px',
                      position: 'relative',
                    }}
                    onClick={() => setShadowIndex(index)}
                  >
                    {index + 1}
                    <Box position="absolute" top="-5px" right="-5px">
                      <CloseButton size="sm" onClick={handleDelete(index)} />
                    </Box>
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
                  {newInitialValues?.map((_arg: ShadowValue, index: number) => (
                    <>
                      {shadowIndex === index && (
                        <ShadowColorPicker
                          blur={blur[index]}
                          spread={spread[index]}
                          hOffset={hOffset[index]}
                          vOffset={vOffset[index]}
                          handleColor={handleColor}
                          handleBlur={handleBlur}
                          handleSpread={handleSpread}
                          handleHOffset={handleHOffset}
                          handleVOffset={handleVOffset}
                          color={color[index]}
                          index={index}
                          codeResult={codeResult}
                        />
                      )}
                    </>
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
                  <FormLabel>Value of Shadow {shadowIndex + 1}</FormLabel>
                  {shadowInputValidation ? (
                    ''
                  ) : (
                    <span style={{ color: 'var(--chakra-colors-red-500' }}>
                      {' '}
                      Invalid shadow format.
                    </span>
                  )}
                </Text>

                {newInitialValues?.map((_arg: ShadowValue, index: number) => (
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
            {nameError && (
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
