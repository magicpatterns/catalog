import { Box } from '@chakra-ui/react'
import {
  TFontSizeVariant,
  TFontWeightVariant,
  TLineHeightVariant,
} from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'
import { fontUnits } from '../TypographyConstants'

export function FontSizesSection({
  fontSizeData,
  onUpdateFontPropertyData,
}: {
  fontSizeData: TFontSizeVariant[]
  onUpdateFontPropertyData: (
    newFontSizeData:
      | TFontSizeVariant[]
      | TFontWeightVariant[]
      | TLineHeightVariant[]
  ) => void
}) {
  const headingText = 'Font Sizes'
  const buttonText = 'Add New Font Size'

  fontSizeData.sort((fontOne, fontTwo) => {
    if (fontOne.unit === fontTwo.unit) return fontOne.value - fontTwo.value
    return fontUnits.indexOf(fontOne.unit) - fontUnits.indexOf(fontTwo.unit)
  })

  return (
    <Box>
      <DisplayFontProperty
        headingText={headingText}
        buttonText={buttonText}
        fontProperty="fontSize"
        fontPropertyData={fontSizeData}
        onUpdateFontPropertyData={onUpdateFontPropertyData}
      />
    </Box>
  )
}
