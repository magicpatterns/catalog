import { Box, Flex, Text } from '@chakra-ui/react'
import { TNamedToken } from '@core/types'
import { parseUnit } from '@core/utils/parseUnit'

// max font size in px or em/rem
const maxFontSizePx = 48
const maxFontSizeEmRem = maxFontSizePx / 16

// return boolean font size is too large for preview
function isFontSizeTooLarge(fontSizeData: TNamedToken) {
  const { rawValue, unit } = parseUnit(fontSizeData.token.value)

  if (unit === 'px') {
    return rawValue > maxFontSizePx
  }

  if (unit === 'rem' || unit === 'em') {
    return rawValue > maxFontSizeEmRem
  }

  return false
}

// return font size for preview default to 1rem if too large
function normalizeFontSize(fontSizeData: TNamedToken) {
  const { rawValue, unit } = parseUnit(fontSizeData.token.value)

  if (unit === 'px') {
    return isFontSizeTooLarge(fontSizeData) ? '1rem' : `${rawValue}px`
  }

  if (unit === 'rem' || unit === 'em') {
    return isFontSizeTooLarge(fontSizeData) ? '1rem' : `${rawValue}${unit}`
  }

  return '1rem'
}

export function FontSizeRow({
  fontSizeData,
  placeholder,
}: {
  fontSizeData: TNamedToken
  placeholder: string
}) {
  return (
    <>
      <Flex justifyContent="left" alignItems="center">
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
          <Text
            css={{
              fontWeight: 'bold',
              width: 50,
              textAlign: 'center',
            }}
            noOfLines={1}
          >
            {fontSizeData.name}
          </Text>
        </Box>
        <Box>
          <Text
            css={{ fontWeight: 'bold', width: 100 }}
            fontSize={18}
            textAlign="center"
          >
            {fontSizeData.token.value}
          </Text>
        </Box>
      </Flex>
      <Box
        css={{
          fontSize: normalizeFontSize(fontSizeData),
          fontWeight: isFontSizeTooLarge(fontSizeData) ? 'bold' : 'normal',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text>
          {isFontSizeTooLarge(fontSizeData)
            ? `Font size ${fontSizeData.token.value} is too large to render.`
            : placeholder}
        </Text>
      </Box>
    </>
  )
}
