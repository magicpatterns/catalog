import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

interface button extends ChakraProps {
  label: string
  onClick?: () => void
}

export function Button(props: button) {
  return (
    <ChakraProviderWrapper>
      <ChakraButton onClick={props.onClick} {...props}>
        {props.label}
      </ChakraButton>
    </ChakraProviderWrapper>
  )
}
