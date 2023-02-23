import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../main.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
