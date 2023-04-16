import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Weights =
  | 'hairline'
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
type Variants = `${Sizes}/${Weights}`

export interface IText {
  label: string
  variants: Variants
  icon?: React.ReactNode
  onClick?: () => void
}

export function Text(props: IText) {
  const [size, weight] = extractVariant(props.variants)
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
  function extractVariant(variants: string): [Sizes, Weights] {
    return variants.split('/') as [Sizes, Weights]
  }
}
