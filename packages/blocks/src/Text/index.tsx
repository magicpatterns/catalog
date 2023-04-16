import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

export type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Weights =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
export type Styles = `${Sizes}/${Weights}`

export interface IText {
  label: string
  styles: Styles
  icon?: React.ReactNode
  onClick?: () => void
}

export function Text(props: IText) {
  const [size, weight] = extractVariant(props.styles)
  return (
    <ChakraProviderWrapper>
      <ChakraText
        onClick={props.onClick}
        {...props}
        fontSize={size}
        fontWeight={weight}
      >
        {props.icon ? props.icon : null}
        {props.label}
      </ChakraText>
    </ChakraProviderWrapper>
  )
  function extractVariant(styles: string): [Sizes, Weights] {
    return styles.split('/') as [Sizes, Weights]
  }
}
