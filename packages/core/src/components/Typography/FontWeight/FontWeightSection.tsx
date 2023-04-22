import { Box } from '@chakra-ui/react'
import { TTokenGroup } from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'

export function FontWeightSection({
  fontWeightData,
  placeholder,
  onUpdateFontPropertyData,
}: {
  fontWeightData: TTokenGroup
  placeholder: string
  onUpdateFontPropertyData: (newFontWeightData: TTokenGroup) => void
}) {
  const headingText = 'Font Weights'
  const buttonText = 'Add New Font Weight'

  return (
    <Box>
      <DisplayFontProperty
        headingText={headingText}
        buttonText={buttonText}
        fontProperty="fontWeight"
        fontPropertyData={fontWeightData}
        placeholder={placeholder}
        onUpdateFontPropertyData={onUpdateFontPropertyData}
      />
    </Box>
  )
}
