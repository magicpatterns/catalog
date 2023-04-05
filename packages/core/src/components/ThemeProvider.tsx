import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const theme = extendTheme({})

export function MirrorfulThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
