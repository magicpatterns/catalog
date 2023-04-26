import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@core/components/theme'
import { TNamedToken } from '@core/types'

export function FontWeightRow({
  fontWeightData,
  placeholder,
}: {
  fontWeightData: TNamedToken
  placeholder: string
}) {
  const fontTokenValueColor = useColorModeValue(
    lightTheme.text.colors.secondary,
    darkTheme.text.colors.secondary
  )
  return (
    <>
      <Box>
        <Text
          css={{ fontWeight: 'bold', width: 100, color: fontTokenValueColor }}
          fontSize={18}
        >
          {fontWeightData.token.value}
        </Text>
      </Box>
      <Box
        css={{
          fontSize: '1rem',
          fontWeight: fontWeightData.token.value,
          width: '100%',
        }}
      >
        {placeholder}
      </Box>
    </>
  )
}
