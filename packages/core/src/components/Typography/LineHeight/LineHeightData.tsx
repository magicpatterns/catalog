import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { darkTheme, lightTheme } from '@core/components/theme'
import { TNamedToken } from '@core/types'

export function LineHeightData({
  lineHeightData,
  placeholder,
}: {
  lineHeightData: TNamedToken
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
          {lineHeightData.token.value}
        </Text>
      </Box>
      <Box
        css={{
          fontSize: '1rem',
          fontWeight: 'normal',
          width: '100%',
          lineHeight: lineHeightData.token.value,
        }}
      >
        {placeholder.slice(0, placeholder.length / 2)}
        <br />
        {placeholder.slice(placeholder.length / 2, placeholder.length)}
      </Box>
    </>
  )
}
