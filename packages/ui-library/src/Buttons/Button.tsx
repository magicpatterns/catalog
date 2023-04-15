import { Button as ChakraButton } from '@chakra-ui/react'
import { ChakraProviderWrapper } from '@ui/ChakraProviderWrapper'
import React from 'react'

interface Button extends Partial<HTMLButtonElement> {
  title: string
  size: 'sm' | 'md' | 'lg'
}
export function Button(props: Button): JSX.Element {
  return (
    <ChakraProviderWrapper>
      <ChakraButton size={props.size}>{props.title}</ChakraButton>
    </ChakraProviderWrapper>
  )
}
