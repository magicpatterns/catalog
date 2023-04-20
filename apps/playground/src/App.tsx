import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Playground } from './components/Playground'
import viteLogo from '/vite.svg'
import { theme } from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Playground />
    </ChakraProvider>
  )
}

export default App
