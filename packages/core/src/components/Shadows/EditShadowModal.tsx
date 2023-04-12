/* eslint-disable @typescript-eslint/ban-types */
import {
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
  useDisclosure,
} from '@chakra-ui/react'
import { Badge, Box, Icon, Stack, Text } from '@chakra-ui/react'
import { AlertDialogDelete } from '@core/components/AlertDialogDelete'
import { TShadowData } from '@core/types'
import { RgbColor } from '@hello-pangea/color-picker'
import { useEffect, useMemo, useState } from 'react'
import {} from 'react-icons'
import {
  FiBookOpen,
  FiFolder,
  FiGithub,
  FiLayers,
  FiPlus,
  FiSettings,
  FiUnderline,
} from 'react-icons/fi'
import { TbInnerShadowBottomLeft } from 'react-icons/tb'

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
  initialRgbaValue?: any
  initialValues?: any
}) {
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onDeleteAlertDialogOpen,
    onClose: onDeleteAlertDialogClose,
    getDisclosureProps,
  } = useDisclosure()

  const [variant, setVariant]: [
    TShadowData,
    React.Dispatch<React.SetStateAction<TShadowData>>
  ] = useState<TShadowData>(initialShadowVariant ?? { name: '', value: '' })

  const [error, setError] = useState<string | null>(null)

  //console.log('initialRgbaValue ' + initialValues?.map((i: {}) => i.vOffset))
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

  //console.log(spread)
  // const presetColor = initialRgbaValue
  //   ? // eslint-disable-next-line react/prop-types
  //     `rgba(${initialRgbaValue?.map(
  //       (i: { r: any }) => i.r
  //     )}, ${initialRgbaValue?.map(
  //       (i: { g: any }) => i.g
  //     )}, ${initialRgbaValue?.map(
  //       (i: { b: any }) => i.b
  //     )}, ${initialRgbaValue?.map((i: { a: any }) => i.a)})`
  //   : 'rgba(1, 1, 1, 0.4)'

  // console.log(presetColor)
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
    if (newShadVar) {
      const newVariant = {
        name: variant.name,
        value: `0px 0px ${blur?.[0]}px 15px ${color?.[0]}`,
      }
      onUpdateShadowVariant(newVariant)
      onClose()
    } else {
      onUpdateShadowVariant(variant)
      onClose()
    }
  }
  const [newInitialValues, setNewInitialValues] = useState(initialValues)

  const [color, setColor] = useState(presetColor?.map((i: {}) => i))
  const [hOffset, sethOffset] = useState(
    newInitialValues?.map((i: any) => i.hOffset)
  )
  const [vOffset, setVOffset] = useState(
    initialValues?.map((i: any) => i.vOffset)
  )
  const [blur, setBlur] = useState(initialValues?.map((i: any) => i.blur))
  const [spread, setSpread] = useState(initialValues?.map((i: any) => i.spread))

  const [initialButton, setInitialButton] = useState(0)

  const [colorOutcome, setColorOutcome] = useState('')
  const [newShadVar, setNewShadVar] = useState(false)

  //console.log(blur))
  function test() {
    const newColorResult = []
    for (let i = 0; i < newInitialValues?.length; i++) {
      newColorResult.push(
        `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
      )
    }
    return newColorResult.toString()
  }

  const newColorRes = test()

  const [newColor, setNewColor] = useState(newColorRes)

  function handleBlur(e: number, i: number) {
    if (!blur) {
      setBlur([0])
    } else {
      const nextBlur = [...blur]
      nextBlur[i] = e
      setBlur(nextBlur)
    }
  }

  function handleSpread(e: number, i: number) {
    if (!spread) {
      setSpread([0])
    } else {
      const nextSpread = [...spread]
      nextSpread[i] = e
      setSpread(nextSpread)
    }
  }

  function handleHOffset(e: number, i: number) {
    if (!hOffset) {
      sethOffset([0])
    } else {
      const nextHOffset = [...hOffset]
      nextHOffset[i] = e
      sethOffset(nextHOffset)
    }
  }

  function handleVOffset(e: number, i: number) {
    if (!vOffset) {
      setVOffset([0])
    } else {
      const nextVOffset = [...vOffset]
      nextVOffset[i] = e
      setVOffset(nextVOffset)
    }
  }

  // useEffect(() => {
  //   const newColorResult = []
  //   for (let i = 0; i < initialValues?.length; i++) {
  //     newColorResult.push(
  //       `${hOffset[i]}px ${vOffset[i]}px ${blur[i]}px ${spread[i]}px ${color[i]}`
  //     )
  //   }
  //   setColorOutcome(newColorResult.toString())
  // }, [color, blur, spread, hOffset, vOffset])

  const codeResult = `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`

  const handleNewColor = (value: any, i: number) => {
    if (!color) {
      setColor(['rgba(1, 1, 1, 0.4)'])
    } else {
      const nextColor = [...color]
      nextColor[i] = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`

      setColor(nextColor)
    }
  }

  const tempValues = {
    hOffset: [0],
    vOffset: [0],
    blur: [0],
    spread: [0],
    color: ['rgba(1, 1, 1, 0.4)'],
  }

  // const formatColor = (input: string) => {
  //   if (
  //     /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0\.\d+|\d+(\.\d+)?))?\s*\)$/i.test(
  //       input
  //     )
  //   ) {
  //     const colors = input
  //       .split('rgba')[1]
  //       .replace('(', '')
  //       .replace(')', '')
  //       .split(',')
  //       .map((value, index) => Number(value))
  //     handleNewColor({
  //       r: colors[0],
  //       g: colors[1],
  //       b: colors[2],
  //       a: colors[3],
  //     })
  //     setError(null)
  //   } else {
  //     setError('Invalid color')
  //   }
  //   setInputColor(input)
  // }

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
            <Box css={{ display: 'flex', flexDirection: 'column' }}>
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
                      value: 'new value',
                    }),
                      setNewShadVar(true)
                  }}
                />
                {initialShadowVariant ? (
                  ''
                ) : (
                  <ShadowColorPicker
                    blur={!blur ? tempValues.blur[0] : blur?.[0]}
                    spread={!spread ? tempValues.spread[0] : spread?.[0]}
                    hOffset={!hOffset ? tempValues.hOffset[0] : hOffset?.[0]}
                    vOffset={!vOffset ? tempValues.vOffset[0] : vOffset?.[0]}
                    setBlur={setBlur}
                    setSpread={setSpread}
                    sethOffset={sethOffset}
                    setVOffset={setVOffset}
                    codeResult={codeResult}
                    handleNewColor={handleNewColor}
                    handleBlur={handleBlur}
                    handleSpread={handleSpread}
                    handleHOffset={handleHOffset}
                    handleVOffset={handleVOffset}
                    color={tempValues.color[0]}
                    setColor={setColor}
                    initialButton={initialButton}
                    index={0}
                    handleColor={handleNewColor}
                  />
                )}
              </FormControl>

              <Box css={{ display: 'flex', marginTop: '1rem' }}>
                {newInitialValues?.map((i: any, index: number) => (
                  <Button
                    key={index}
                    style={{
                      width: '100px',
                      margin: '0.5rem',
                      backgroundColor: index === initialButton ? '#9B9B9B' : '',
                    }}
                    onClick={() => setInitialButton(index)}
                  >
                    <Icon as={TbInnerShadowBottomLeft} />
                  </Button>
                ))}

                <Button
                  style={{ width: '100px', margin: '0.5rem' }}
                  onClick={() => {
                    sethOffset([...hOffset, 12])
                    setVOffset([...vOffset, 12])
                    setBlur([...blur, 12])
                    setSpread([...spread, 12])
                    const nextShadow = [...newInitialValues]
                    nextShadow.push('12px 12px 12px 12px rgba(0, 0, 0, 1)')
                    const nextColor = [...color]
                    nextColor.push('rgba(0, 0, 0, 1)')
                    setNewInitialValues(nextShadow)
                    setColor(nextColor)
                    setInitialButton(newInitialValues.length)
                  }}
                >
                  <Icon as={FiPlus} />
                </Button>
              </Box>
              <FormControl>
                <Box css={{ marginTop: '1rem' }}>
                  {newInitialValues?.map((i: any, index: number) => (
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
                            codeResult={codeResult}
                            handleNewColor={handleNewColor}
                            handleBlur={handleBlur}
                            handleSpread={handleSpread}
                            handleHOffset={handleHOffset}
                            handleVOffset={handleVOffset}
                            color={color[index]}
                            setColor={setColor}
                            initialButton={initialButton}
                            index={index}
                            handleColor={handleNewColor}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </Box>
              </FormControl>

              <Text>Preview</Text>
              <Box
                style={{
                  boxShadow: newColorRes,
                  width: '100%',
                  height: '100px',
                  backgroundColor: '#F3F3F3',
                  borderRadius: '5px',
                }}
              ></Box>
              <Box
                css={{
                  marginTop: '16px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Input
                  onChange={(e) => setNewColor(e.target.value)}
                  value={newColor}
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
