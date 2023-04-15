import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

type Variants = 'save' | 'delete' | 'add-token' | 'default'

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
    'add-token': {
      outline: '2px solid',
      outlineColor: 'blue.500',
      backgroundColor: 'transparent',
      color: 'blue.500',
      _hover: {
        outline: '2px solid',
        outlineColor: 'blue.600',
        color: 'blue.600',
      },
    },
  }
  return (
    <ChakraProviderWrapper>
      <ChakraButton
        onClick={props.onClick}
        {...props}
        {...variantProps[props.variant ?? 'default']}
      >
        {toCapitalize(props.label)}
      </ChakraButton>
    </ChakraProviderWrapper>
  )
}

function toCapitalize(str: string) {
  return str
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1)
    })
    .join(' ')
}
