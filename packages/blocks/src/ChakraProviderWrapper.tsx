import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

export function ChakraProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChakraProvider>{children}</ChakraProvider>
}
