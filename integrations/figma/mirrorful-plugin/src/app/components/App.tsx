import '../styles/ui.css'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

import { TokenEditor } from './TokenEditor'

export function App() {
  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`)
      }
    }
  }, [])

  return (
    <ChakraProvider>
      <TokenEditor />
    </ChakraProvider>
  )
}
