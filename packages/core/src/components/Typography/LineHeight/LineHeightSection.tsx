import { Box } from '@chakra-ui/react'
import { TTokenGroup } from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'

export function LineHeightSection({
  lineHeightData,
  onUpdateFontPropertyData,
}: {
  lineHeightData: TTokenGroup
  onUpdateFontPropertyData: (newLineHeightData: TTokenGroup) => void
}) {
  const headingText = 'Line Heights'
  const buttonText = 'Add New Line Height'

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
