import { Box, Divider, Heading, Text } from '@chakra-ui/react'
import { TPrimitivesTypography, TTokenGroup } from '@core/types'

import { FontSizesSection } from './FontSize/FontSizesSection'
import { FontWeightSection } from './FontWeight/FontWeightSection'
import { LineHeightSection } from './LineHeight/LineHeightSection'

export function TypographySection({
  typography,
  onUpdateTypography,
}: {
  typography: TPrimitivesTypography
  onUpdateTypography: (newTypography: TPrimitivesTypography) => void
}) {
  return (
    <Box>
      <Heading fontSize={'2.5rem'} fontWeight="black">
        Typography
      </Heading>
      <Text
        fontSize={'1.2rem'}
        fontWeight="medium"
        color="gray.600"
        css={{ marginTop: '12px' }}
      >
        {`Add and edit the fonts in your theme. `}
      </Text>

      <Divider css={{ borderWidth: '2px', margin: '12px 0' }} />
      <Box css={{ marginBottom: '48px' }} />
      <FontSizesSection
        fontSizeData={typography.fontSizes}
        onUpdateFontPropertyData={(newFontSizeData: TTokenGroup) => {
          onUpdateTypography({
            ...typography,
            fontSizes: newFontSizeData,
          })
        }}
      />
      <br />
      <br />
      <FontWeightSection
        fontWeightData={typography.fontWeights}
        onUpdateFontPropertyData={(newFontWeightData: TTokenGroup) => {
          onUpdateTypography({
            ...typography,
            fontWeights: newFontWeightData,
          })
        }}
      />
      <br />
      <br />
      <LineHeightSection
        lineHeightData={typography.lineHeights}
        onUpdateFontPropertyData={(newLineHeightData: TTokenGroup) => {
          onUpdateTypography({
            ...typography,
            lineHeights: newLineHeightData,
          })
        }}
      />
    </Box>
  )
}
