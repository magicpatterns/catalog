import { Text as ChakraText } from '@chakra-ui/react'
import { ChakraProviderWrapper } from '@ui/ChakraProviderWrapper'
import React from 'react'

export interface IText {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

export function Text(props: IText) {
  return (
    <ChakraProviderWrapper>
      <ChakraText onClick={props.onClick} {...props}>
        {props.icon ? props.icon : null}
        {props.label}
      </ChakraText>
    </ChakraProviderWrapper>
  )
}
