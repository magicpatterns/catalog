import { Box, Flex, Text } from '@chakra-ui/react'
import { TNamedToken } from '@core/types'

export function FontWeightRow({
  fontWeightData,
  placeholder,
}: {
  fontWeightData: TNamedToken
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
            {fontWeightData.name}
          </Text>
        </Box>
        <Box>
          <Text
            css={{ fontWeight: 'bold', width: 100 }}
            fontSize={18}
            textAlign="center"
          >
            {fontWeightData.token.value}
          </Text>
        </Box>
      </Flex>
      <Box
        css={{
          fontSize: '1rem',
          fontWeight: fontWeightData.token.value,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text>{placeholder}</Text>
      </Box>
    </>
  )
}
