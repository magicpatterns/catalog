import { Box } from '@chakra-ui/react'
import { TTokenGroup } from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'

export function LineHeightSection({
  lineHeightData,
  placeholder,
  onUpdateFontPropertyData,
}: {
  lineHeightData: TTokenGroup
  placeholder: string
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
        placeholder={placeholder}
        onUpdateFontPropertyData={onUpdateFontPropertyData}
      />
    </Box>
  )
}
