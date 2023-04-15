import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

type Variants = 'save' | 'delete' | 'default'

interface button {
  label: string
  variant?: Variants
  onClick?: () => void
}

export function Button(props: button) {
  const variantProps: Record<Variants, ChakraProps> = {
    save: {
      bgColor: 'blue.500',
      _hover: { backgroundColor: 'blue.600' },
      color: 'white',
    },
    default: {
      bgColor: 'gray.200',
      _hover: { backgroundColor: 'gray.300' },
    },
    delete: {
      bgColor: 'red.500',
      _hover: { backgroundColor: 'red.600' },
      color: 'white',
    },
  }
  return (
    <ChakraProviderWrapper>
      <ChakraButton
        onClick={props.onClick}
        {...props}
        {...variantProps[props.variant ?? 'default']}
      >
        {props.variant === 'save' && 'Save'}
        {props.variant === 'delete' && 'Delete'}
        {' ' + props.label}
      </ChakraButton>
    </ChakraProviderWrapper>
  )
}
