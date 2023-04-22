import { ChakraProvider } from '@chakra-ui/react'
import { Playground } from './components/Playground'
import { theme } from './theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Playground />
    </ChakraProvider>
  )
}

export default App
