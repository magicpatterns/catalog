'use client'

import './globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Tokens } from '../../.mirrorful/theme'

const theme = extendTheme({
  colors: {
    purple: {
      ...Tokens.purple.shades,
    },
    blue: {
      ...Tokens.blue.shades,
    },
    background: {
      ...Tokens.background.shades,
    },
    gray: {
      ...Tokens.gray.shades,
    },
  },
  styles: {
    global: {
      body: {
        backgroundColor: Tokens.background.base,
      },
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  )
}
