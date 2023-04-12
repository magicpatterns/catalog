import { Box, Text } from '@chakra-ui/react'
import { TNamedToken } from '@core/types'

export function LineHeightData({
  lineHeightData,
}: {
  lineHeightData: TNamedToken
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
        Lorem ipsum dolor sit amet.
        <br />
        Illum omnis, sunt corrupti.
      </Box>
    </>
  )
}
