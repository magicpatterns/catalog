import { Box } from '@chakra-ui/react'
import {
  TFontSizeVariant,
  TFontWeightVariant,
  TLineHeightVariant,
} from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'
import { fontUnits, lineHeightUnits } from '../TypographyConstants'

export function LineHeightSection({
  lineHeightData,
  onUpdateFontPropertyData,
}: {
  lineHeightData: TLineHeightVariant[]
  onUpdateFontPropertyData: (
    newLineHeightData:
      | TFontSizeVariant[]
      | TFontWeightVariant[]
      | TLineHeightVariant[]
  ) => void
}) {
  const headingText = 'Line Heights'
  const buttonText = 'Add New Line Height'

  lineHeightData.sort((fontOne, fontTwo) => {
    if (fontOne.unit === fontTwo.unit) {
      if (fontOne.unit === 'length') {
        if (fontOne.lengthUnit === fontTwo.lengthUnit)
          return fontOne.value - fontTwo.value
        return (
          fontUnits.indexOf(fontOne.lengthUnit as string) -
          fontUnits.indexOf(fontTwo.lengthUnit as string)
        )
      }
      return fontOne.value - fontTwo.value
    }
    return (
      lineHeightUnits.indexOf(fontOne.unit) -
      lineHeightUnits.indexOf(fontTwo.unit)
    )
  })

  return (
    <Box>
      <DisplayFontProperty
        headingText={headingText}
        buttonText={buttonText}
        fontProperty="lineHeight"
        fontPropertyData={lineHeightData}
        onUpdateFontPropertyData={onUpdateFontPropertyData}
      />
    </Box>
  )
}
