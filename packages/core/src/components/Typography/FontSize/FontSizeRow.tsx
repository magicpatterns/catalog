import { Box, Text } from '@chakra-ui/react'
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
      <Box>
        <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
          {fontSizeData.token.value}
        </Text>
      </Box>
      <Box
        css={{
          fontSize: normalizeFontSize(fontSizeData),
          fontWeight: isFontSizeTooLarge(fontSizeData) ? 'bold' : 'normal',
          width: '100%',
        }}
      >
        {isFontSizeTooLarge(fontSizeData)
          ? `Font size ${fontSizeData.token.value} is too large to render.`
          : placeholder}
      </Box>
    </>
  )
}
