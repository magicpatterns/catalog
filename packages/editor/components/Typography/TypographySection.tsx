import { Box, Heading, Divider, Text } from '@chakra-ui/react'
import { TFontSizeVariant, TTypographyData } from 'types'
import { FontSizesSection } from './FontSizesSection'

export function TypographySection({
  typography,
  onUpdateTypography,
}: {
  typography: TTypographyData
  onUpdateTypography: (newTypography: TTypographyData) => void
}) {
  return (
    <Box>
      <Heading fontSize={'3rem'} fontWeight="black">
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
        onUpdateFontSizeData={(newFontSizeData: TFontSizeVariant[]) => {
          onUpdateTypography({
            ...typography,
            fontSizes: newFontSizeData,
          })
        }}
      />
    </Box>
  )
}
