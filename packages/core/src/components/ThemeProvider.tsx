import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'red.500',
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'red.500',
      },
    },
  },
})
export function MirrorfulThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
