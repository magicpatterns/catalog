import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

interface button extends ChakraProps {
  label: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function Button(props: button) {
  return (
    <ChakraProviderWrapper>
      <ChakraButton onClick={props.onClick} size={props.size}>
        {props.label}
      </ChakraButton>
    </ChakraProviderWrapper>
  )
}
