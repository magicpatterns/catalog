import { Text as ChakraText } from '@chakra-ui/react'
import { ChakraProviderWrapper } from '@ui/ChakraProviderWrapper'
import React from 'react'

export function Text() {
  return (
    <ChakraProviderWrapper>
      <ChakraText></ChakraText>
    </ChakraProviderWrapper>
  )
}
