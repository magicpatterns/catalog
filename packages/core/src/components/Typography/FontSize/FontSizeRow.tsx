import { Box, Text } from '@chakra-ui/react'
import { TFontSizeVariant } from '@core/types'

// max font size in px or em/rem
const maxFontSizePx = 48
const maxFontSizeEmRem = maxFontSizePx / 16

// return boolean font size is too large for preview
function isFontSizeTooLarge(fontSizeData: TFontSizeVariant) {
  if (fontSizeData.unit === 'px') {
    return fontSizeData.value > maxFontSizePx
  }

  if (fontSizeData.unit === 'rem' || fontSizeData.unit === 'em') {
    return fontSizeData.value > maxFontSizeEmRem
  }

  return false
}

// return font size for preview default to 1rem if too large
function normalizeFontSize(fontSizeData: TFontSizeVariant) {
  if (fontSizeData.unit === 'px') {
    return isFontSizeTooLarge(fontSizeData) ? '1rem' : `${fontSizeData.value}px`
  }

  if (fontSizeData.unit === 'rem' || fontSizeData.unit === 'em') {
    return isFontSizeTooLarge(fontSizeData)
      ? '1rem'
      : `${fontSizeData.value}${fontSizeData.unit}`
  }

  return '1rem'
}

export function FontSizeRow({
  fontSizeData,
}: {
  fontSizeData: TFontSizeVariant
}) {
  return (
    <>
      <Box>
        <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
          {fontSizeData.value} {fontSizeData.unit}
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
          ? `Font size ${fontSizeData.value}${fontSizeData.unit} is too large to render.`
          : `Lorem ipsum dolor sit amet.`}
      </Box>
    </>
  )
}
