import { Text as ChakraText } from '@chakra-ui/react'
import React from 'react'

import { ChakraProviderWrapper } from '../ChakraProviderWrapper'
import { IText, Sizes, Weights } from './types'

export function Text(props: IText) {
  const [size, weight] = extractVariant(props.styles)

  return (
    <ChakraProviderWrapper>
      <ChakraText
        onClick={props.onClick}
        {...props}
        fontSize={size}
        fontWeight={weight}
        backgroundColor={props?.hover?.backgroundColor}
        color={props?.hover?.color}
        _hover={{
          backgroundColor: props?.hover?.color,
          color: props?.hover?.backgroundColor,
        }}
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
