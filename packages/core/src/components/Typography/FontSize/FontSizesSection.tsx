import { Box } from '@chakra-ui/react'
import { TTokenGroup } from '@core/types'

import { DisplayFontProperty } from '../DisplayFontProperty'

export function FontSizesSection({
  fontSizeData,
  onUpdateFontPropertyData,
}: {
  fontSizeData: TTokenGroup
  onUpdateFontPropertyData: (newFontSizeData: TTokenGroup) => void
}) {
  const headingText = 'Font Sizes'
  const buttonText = 'Add New Font Size'

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
