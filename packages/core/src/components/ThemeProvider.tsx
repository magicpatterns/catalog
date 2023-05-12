import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'var(--background-color-primary)',
      },
    },
  },
  components: {
    Modal: {
      dialog: {
        bg: 'var(--background-color-primary)',
      },
    },
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
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
    disableTransitionOnChange: false,
  },
})

export function MirrorfulThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
