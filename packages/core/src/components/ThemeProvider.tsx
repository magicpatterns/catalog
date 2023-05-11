import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const theme = extendTheme({
  components: {
    Menu: {
      baseStyle: {
        list: {
          backgroundColor: 'var(--background-color-secondary)',
        },
        item: {
          backgroundColor: 'var(--background-color-secondary)',
          _hover: {
            backgroundColor: 'var(--background-color-primary)',
          },
        },
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
