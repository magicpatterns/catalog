import { Box } from '@chakra-ui/react'
import { TFontSizeVariant, TFontWeightVariant } from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'

export function FontWeightSection({
  fontWeightData,
  onUpdateFontPropertyData,
}: {
  fontWeightData: TFontWeightVariant[]
  onUpdateFontPropertyData: (
    newFontWeightData: TFontSizeVariant[] | TFontWeightVariant[]
  ) => void
}) {
  const headingText = 'Font Weights'
  const buttonText = 'Add New Font Weight'

  fontWeightData.sort((fontWeightOne, fontWeightTwo) => {
    return fontWeightOne.weight - fontWeightTwo.weight
  })

  return (
    <Box>
      <DisplayFontProperty
        headingText={headingText}
        buttonText={buttonText}
        fontProperty="fontWeight"
        fontPropertyData={fontWeightData}
        onUpdateFontPropertyData={onUpdateFontPropertyData}
      />
    </Box>
  )
}
