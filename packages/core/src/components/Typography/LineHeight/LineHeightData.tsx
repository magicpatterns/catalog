import { Box, Flex, Text } from '@chakra-ui/react'
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
      <Flex justifyContent="left" alignItems="center">
        <Box
          css={{
            padding: '12px',
            border: '1px dashed black',
            borderRadius: 8,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            css={{
              fontWeight: 'bold',
              width: 50,
              textAlign: 'center',
            }}
            noOfLines={1}
          >
            {lineHeightData.name}
          </Text>
        </Box>
        <Box>
          <Text
            css={{ fontWeight: 'bold', width: 100 }}
            fontSize={18}
            textAlign="center"
          >
            {lineHeightData.token.value}
          </Text>
        </Box>
      </Flex>
      <Box
        css={{
          fontSize: '1rem',
          fontWeight: 'normal',
          width: '100%',
          lineHeight: lineHeightData.token.value,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text>
          {placeholder.slice(0, placeholder.length / 2)}
          <br />
          {placeholder.slice(placeholder.length / 2, placeholder.length)}
        </Text>
      </Box>
    </>
  )
}
