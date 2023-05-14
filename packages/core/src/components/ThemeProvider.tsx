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
    Modal: {
      baseStyle: {
        dialog: {
          backgroundColor: 'var(--background-color-secondary)',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'var(--color-input-border)',
            _hover: {
              borderColor: 'var(--color-input-border-hover)',
            },
            _focusVisible: {
              borderColor: 'var(--color-input-border-focus)',
              boxShadow: `none`,
            },
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
