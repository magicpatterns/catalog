import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { assertToken, TNamedToken, TTokenGroup } from '@core/types'
import { useEffect, useState } from 'react'

import { darkTheme, lightTheme } from '../theme'
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

  const shadowTokenColor = useColorModeValue(
    lightTheme.text.colors.secondary,
    darkTheme.text.colors.secondary
  )
  const backgroundColor = useColorModeValue(
    lightTheme.buttons.backgroundColors.default,
    darkTheme.buttons.small.backgroundColors.default
  )
  const backgroundColorOnHover = useColorModeValue(
    lightTheme.buttons.backgroundColors.hover,
    darkTheme.buttons.small.backgroundColors.hover
  )
  const color = useColorModeValue(
    lightTheme.buttons.textColors.secondary,
    darkTheme.buttons.small.textColors
  )
  const border = useColorModeValue('none', '2px solid transparent')
  const borderRadius = useColorModeValue(8, 30)

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

  const initialRgbaValue = getRgba(shadowData.token.value)
  const initialValues = getValues(shadowData.token.value)

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
              border: '1px dashed gray',
              borderRadius: 8,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              css={{
                fontWeight: 'bold',
                width: 50,
                textAlign: 'center',
                color: shadowTokenColor,
              }}
              noOfLines={1}
            >
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
                  color: shadowTokenColor,
                }}
                _hover={{
                  cursor: 'pointer',
                  backgroundColor: '#171717',
                  color: 'gray.400',
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
              // backgroundColor: '#F3F3F3',
              // border: '1px solid #D3D3D3',
              backgroundColor: '#121212',
              border: '1px solid #171717',
              boxShadow: shadowData.token.value,
              padding: '24px',
              borderRadius: 8,
            }}
          />
          <Box css={{ justifySelf: 'flex-end' }}>
            <Button
              css={{
                marginLeft: 32,
                color: color,
                background: backgroundColor,
                border: border,
                borderRadius: borderRadius,
              }}
              _hover={{
                background: backgroundColorOnHover,
              }}
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

  const headingColor = useColorModeValue(
    lightTheme.headings.colors.large,
    darkTheme.headings.colors.large
  )
  const buttonBackgroundColor = useColorModeValue(
    lightTheme.buttons.backgroundColors.default,
    darkTheme.buttons.large.backgroundColors.default
  )
  const buttonBackgroundColorOnHover = useColorModeValue(
    lightTheme.buttons.backgroundColors.hover,
    darkTheme.buttons.large.backgroundColors.hover
  )
  const buttonBorder = useColorModeValue('none', '3px solid transparent')
  const borderRadius = useColorModeValue(8, 30)
  const buttonBorderOnHover = useColorModeValue(
    'none',
    '3.5px solid transparent'
  )
  const buttonTextColor = useColorModeValue(
    lightTheme.buttons.textColors.primary,
    darkTheme.buttons.large.textColors
  )
  const textColor = useColorModeValue(
    lightTheme.text.colors.primary,
    darkTheme.text.colors.primary
  )
  const containerColor = useColorModeValue('transparent', '#1a1a1a')
  const padding = useColorModeValue('0px', '24px')

  return (
    <Box>
      <Heading
        fontSize={'2.5rem'}
        fontWeight="black"
        css={{
          background: headingColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
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
          <Stack
            css={{
              marginTop: '24px',
              backgroundColor: containerColor,
              padding: padding,
              borderRadius: 25,
              color: textColor,
            }}
            spacing={12}
          >
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
                  onUpdateShadowVariant={(
                    updatedShadowVariant: TNamedToken
                  ) => {
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
          </Stack>
          <Button
            css={{
              height: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              background: buttonBackgroundColor,
              borderRadius: borderRadius,
              border: buttonBorder,
              color: buttonTextColor,
              transition: '.2s',
            }}
            _hover={{
              background: buttonBackgroundColorOnHover,
              border: buttonBorderOnHover,
            }}
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
