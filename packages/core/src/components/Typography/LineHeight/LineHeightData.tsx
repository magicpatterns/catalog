import { Box, Text } from '@chakra-ui/react'
import { TNamedToken } from '@core/types'

export function LineHeightData({
  lineHeightData,
  placeholder,
}: {
  lineHeightData: TNamedToken
  placeholder: string
}) {
  return (
    <>
      <Box>
        <Text css={{ fontWeight: 'bold', width: 100 }} fontSize={18}>
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
