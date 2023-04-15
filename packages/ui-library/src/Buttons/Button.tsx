import { Button as ChakraButton } from '@chakra-ui/react'
import React from 'react'

interface Button extends Partial<HTMLButtonElement> {
  title: string
  size: 'sm' | 'md' | 'lg'
}
export function Button(props: Button): JSX.Element {
  return <ChakraButton size={props.size}>{props.title}</ChakraButton>
}
