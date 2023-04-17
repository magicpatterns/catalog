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
import { assertToken, TNamedToken, TTokenGroup } from '@core/types'
import { useEffect, useState } from 'react'

import { EditShadowModal } from './EditShadowModal'

export function ShadowRow({
  shadowData,
  onUpdateShadowVariant,
  onDeleteShadowVariant,
}: {
  shadowData: TNamedToken
  onUpdateShadowVariant: (newVariant: TNamedToken) => void
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

  const shadowObjects = separateBoxShadows(
    shadowData.token.value,
    shadowData.name
  )
  const initialRgbaValue = shadowObjects.map((shadowObject) => {
    return getRgba(shadowObject.value)
  })

  const initialValues = shadowObjects.map((shadowObject) => {
    return getValues(shadowObject.value)
  })

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
                  navigator.clipboard.writeText(shadowData.token.value)
                  setHasCopiedShadowValue(true)
                }}
              >
                {shadowData.token.value}
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
              boxShadow: shadowData.token.value,
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
  shadows: TTokenGroup
  onUpdateShadowData: (newShadowData: TTokenGroup) => void
}) {
  const {
    isOpen: isAddVariantModalOpen,
    onOpen: onAddVariantModalOpen,
    onClose: onAddVariantModalClose,
  } = useDisclosure()

  console.log(shadows)

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
          {Object.keys(shadows)
            .map((key) => ({
              name: key,
              token: shadows[key],
            }))
            .filter((value): value is TNamedToken => assertToken(value.token))
            .map((data) => (
              <ShadowRow
                key={data.name}
                shadowData={data}
                onUpdateShadowVariant={(updatedShadowVariant: TNamedToken) => {
                  const newShadowData = { ...shadows }

                  if (data.name !== updatedShadowVariant.name) {
                    delete newShadowData[data.name]
                  }

                  newShadowData[updatedShadowVariant.name] =
                    updatedShadowVariant.token

                  onUpdateShadowData(newShadowData)
                }}
                onDeleteShadowVariant={() => {
                  const newShadowData = { ...shadows }
                  delete newShadowData[data.name]
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
        onUpdateShadowVariant={(newVariant: TNamedToken) => {
          const newShadowData = { ...shadows }
          newShadowData[newVariant.name] = newVariant.token

          onUpdateShadowData(newShadowData)
        }}
      />
    </Box>
  )
}
