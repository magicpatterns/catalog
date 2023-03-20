import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

export function MirrorfulThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChakraProvider>{children}</ChakraProvider>
}
