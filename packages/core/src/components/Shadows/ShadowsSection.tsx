import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { TShadowData } from '@core/types'
import { useEffect, useState } from 'react'

import { EditShadowModal } from './EditShadowModal'

export function ShadowRow({
  shadowData,
  onUpdateShadowVariant,
  onDeleteShadowVariant,
}: {
  shadowData: TShadowData
  onUpdateShadowVariant: (newVariant: TShadowData) => void
  onDeleteShadowVariant: () => void
}) {
  const {
    isOpen: isEditVariantModalOpen,
    onOpen: onEditVariantModalOpen,
    onClose: onEditVariantModalClose,
  } = useDisclosure()

  const [hasCopiedShadowValue, setHasCopiedShadowValue] = useState(false)

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout
    if (hasCopiedShadowValue) {
      copiedTimeout = setTimeout(() => {
        setHasCopiedShadowValue(false)
      }, 1500)
    }
    return () => clearTimeout(copiedTimeout)
  }, [hasCopiedShadowValue])

  function getRgba(str: string) {
    // console.log(typeof str)
    // const newStr = str.map((str) => ({str});
    const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
    const match = str.match(rgbaRegex)
    if (match) {
      const [, r, g, b, a] = match
      return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) }
    }
    return { r: 0, g: 0, b: 0, a: 0.5 } // Return if no match is found
  }

  function getValues(str: string) {
    const regex =
      /(-?\d*\.?\d+px)\s+(-?\d*\.?\d+px)\s+(-?\d*\.?\d+px)\s+(-?\d*\.?\d+px)\s+rgba/g
    const match = regex.exec(str)
    if (match) {
      const numbers = match.slice(1, 5).map((numStr) => parseFloat(numStr))

      return {
        hOffset: Number(numbers[0]),
        vOffset: Number(numbers[1]),
        blur: Number(numbers[2]),
        spread: Number(numbers[3]),
      }
    }
    return { hOffset: 0, vOffset: 0, blur: 0, spread: 0 } // Return if no match is found
  }

  function separateBoxShadows(input, name) {
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

  function getRgba2(str) {
    const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
    const match = str.match(rgbaRegex)
    if (match) {
      const [, r, g, b, a] = match
      return { r: Number(r), g: Number(g), b: Number(b), a: Number(a) }
    }
    return { r: 0, g: 0, b: 0, a: 0.5 } // Return if no match is found
  }

  const shadowObjects = separateBoxShadows(shadowData.value, shadowData.name)
  const newInitial = shadowObjects.map((shadowObject) => {
    return getRgba2(shadowObject.value)
  })
  //console.log(newInitial)

  //const initialRgbaValue = getRgba(shadowData.value)
  const initialRgbaValue = newInitial
  const initialValues = getValues(shadowData.value)

  console.log(initialRgbaValue)

  /*
  



  
  */

  return (
    <Box css={{ width: '60vw' }}>
      <Stack
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
        spacing={8}
        direction="row"
      >
        <Box css={{ display: 'flex', alignItems: 'center' }}>
          <Box
            css={{
              padding: '12px',
              border: '1px dashed black',
              borderRadius: 8,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text css={{ fontWeight: 'bold' }} noOfLines={1}>
              {shadowData.name}
            </Text>
          </Box>
          <Box>
            <Tooltip
              label="Copied Shadow to Clipboard"
              hasArrow
              isDisabled={!hasCopiedShadowValue}
              isOpen={hasCopiedShadowValue}
            >
              <Text
                css={{
                  fontWeight: 'bold',
                  paddingInline: 2,
                  fontSize: '1rem',
                  marginLeft: '12px',
                }}
                _hover={{
                  cursor: 'pointer',
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: 8,
                }}
                fontSize={18}
                onClick={() => {
                  navigator.clipboard.writeText(shadowData.value)
                  setHasCopiedShadowValue(true)
                }}
              >
                {shadowData.value}
              </Text>
            </Tooltip>
          </Box>
        </Box>

        <Box css={{ display: 'flex', alignItems: 'center' }}>
          <Box
            css={{
              width: 100,
              height: 50,
              backgroundColor: '#F3F3F3',
              border: '1px solid #D3D3D3',
              boxShadow: shadowData.value,
              padding: '24px',
              borderRadius: 8,
            }}
          />
          <Box css={{ justifySelf: 'flex-end' }}>
            <Button
              css={{ marginLeft: 32 }}
              onClick={() => onEditVariantModalOpen()}
            >
              Edit Variant
            </Button>
          </Box>
          <EditShadowModal
            isOpen={isEditVariantModalOpen}
            onClose={onEditVariantModalClose}
            initialShadowVariant={shadowData}
            onUpdateShadowVariant={onUpdateShadowVariant}
            onDeleteShadowVariant={onDeleteShadowVariant}
            initialRgbaValue={initialRgbaValue}
            initialValues={initialValues}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export function ShadowsSection({
  shadows,
  onUpdateShadowData,
}: {
  shadows: TShadowData[]
  onUpdateShadowData: (newShadowData: TShadowData[]) => void
}) {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  return (
    <Box>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Shadows
      </Heading>
      <Text
        fontSize={'1.2rem'}
        fontWeight="medium"
        color="gray.600"
        css={{ marginTop: '12px' }}
      >
        {`Add and edit the shadows in your theme. `}
      </Text>

      <Divider css={{ borderWidth: '2px', margin: '12px 0' }} />
      <Box css={{ marginBottom: '48px' }} />
      <Box>
        <Stack css={{ marginTop: '24px' }} spacing={12}>
          {shadows.map((shadowData, index) => (
            <ShadowRow
              key={shadowData.name}
              shadowData={shadowData}
              onUpdateShadowVariant={(updatedShadowVariant: TShadowData) => {
                const newShadowData = [...shadows]
                newShadowData[index] = updatedShadowVariant

                onUpdateShadowData(newShadowData)
              }}
              onDeleteShadowVariant={() => {
                const newShadowData = [...shadows]
                newShadowData.splice(index, 1)
                onUpdateShadowData(newShadowData)
              }}
            />
          ))}
          <Button
            css={{ height: '50px', fontSize: '18px', fontWeight: 'bold' }}
            onClick={() => onAddVariantModalOpen()}
          >
            Add New Shadow
          </Button>
        </Stack>
      </Box>
      <EditShadowModal
        isOpen={isAddVariantModalOpen}
        onClose={onAddVariantModalClose}
        onUpdateShadowVariant={(newVariant: TShadowData) => {
          onUpdateShadowData([...shadows, newVariant])
        }}
      />
    </Box>
  )
}
function stypeOf(str: string): any {
  throw new Error('Function not implemented.')
}
