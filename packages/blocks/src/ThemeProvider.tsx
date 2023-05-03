import './index.css'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}
