import { Box, Divider, Heading, Text } from '@chakra-ui/react'
import {
  TFontSizeVariant,
  TFontWeightVariant,
  TTypographyData,
} from '@core/types'

import { FontSizesSection } from './FontSize/FontSizesSection'
import { FontWeightSection } from './FontWeight/FontWeightSection'

export function TypographySection({
  typography,
  onUpdateTypography,
}: {
  typography: TTypographyData
  onUpdateTypography: (newTypography: TTypographyData) => void
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
        onUpdateFontPropertyData={(
          newFontSizeData: TFontSizeVariant[] | TFontWeightVariant[]
        ) => {
          onUpdateTypography({
            ...typography,
            fontSizes: newFontSizeData as TFontSizeVariant[],
          })
        }}
      />
      <br />
      <br />
      <FontWeightSection
        fontWeightData={typography.fontWeights}
        onUpdateFontPropertyData={(
          newFontWeightData: TFontSizeVariant[] | TFontWeightVariant[]
        ) => {
          onUpdateTypography({
            ...typography,
            fontWeights: newFontWeightData as TFontWeightVariant[],
          })
        }}
      />
    </Box>
  )
}
