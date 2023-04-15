import { Button as ChakraButton, ChakraProps } from '@chakra-ui/react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { button, Variants } from './Button'

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
    'add-variant': {
      border: '1px solid',
      borderColor: 'gray.200',
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: 'gray.200',
      },
    },
    icon: {
      border: '1px solid',
      borderColor: 'gray.200',
      backgroundColor: 'transparent',
      _hover: {
        backgroundColor: 'gray.200',
      },
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3',
      fontWeight: 'semibold',
    },
  }
  return (
    <ChakraProviderWrapper>
      <ChakraButton
        color="gray.800"
        onClick={props.onClick}
        {...props}
        {...variantProps[props.variant ?? 'default']}
      >
        {props.icon ? props.icon : null}
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
